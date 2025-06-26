<?php
/**
 * Plugin Name: Paid Memberships Pro - State Dropdowns
 * Plugin URI: https://www.paidmembershipspro.com/add-ons/state-dropdown/
 * Description: Creates an autopopulated field for countries and states/provinces for billing fields.
 * Version: 0.5.1
 * Author: Paid Memberships Pro
 * Author URI: https://www.paidmembershipspro.com
 * Text Domain: pmpro-state-dropdowns
 * Network: false
 */

defined( 'ABSPATH' ) or exit;

define( 'PMPROSD_VERSION', '0.5.1' );

require_once dirname( __FILE__ ) . '/includes/states.php';

class PMPro_State_Dropdowns {

	private static $_instance = null;

	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self;
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'init', array( $this, 'init' ) );
	}

	function init(){
		//add all hooks & filters here.
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles_scripts' ) );

		// Force the long address functionality to ensure that the country fields are always shown.
		add_filter( 'pmpro_international_addresses', '__return_true' );

		// Only add this in for Pre 3.1 versions of PMPro.
		if ( defined( 'PMPRO_VERSION' ) && version_compare( PMPRO_VERSION, '3.1', '<' ) ) {
			add_filter( 'pmpro_longform_address', '__return_true' );
		}	

		/**
		 * Load plugin's textdomain for translations
		 */
		load_plugin_textdomain( 'pmpro-state-dropdowns', false, basename( dirname( __FILE__ ) ) . '/languages' );
	}

	public static function enqueue_styles_scripts(){
		global $current_user, $user_id, $order_id, $pmpro_default_country, $pmpro_pages;

		if ( ! function_exists( 'pmpro_is_checkout' ) ) {
			return;
		}

		//fallback to current user on pages that don't support $user_id variable.
		if( empty( $user_id ) ){
			$user_id = $current_user->ID;
		}

		//we only want to enqueue this on certain pages
		 $script_name = basename( $_SERVER['SCRIPT_NAME'] );
		if( is_admin() && ( isset( $_REQUEST['page'] ) && $_REQUEST['page'] !== 'pmpro-paymentsettings' ) &&
			is_admin() &&  $script_name !== 'user-edit.php' &&
						   $script_name !== 'profile.php' && 
						  ( empty( $_REQUEST['page'] ) || $_REQUEST['page'] != 'pmpro-addmember' && $_REQUEST['page'] != 'pmpro-orders'  ) ){
			return;
		}


		// Check to see if we're on the front-end and not on these specific pages.
		if ( ! is_admin() && ( ! is_page( 'your-profile' ) && ! is_page( $pmpro_pages['billing'] ) && ! pmpro_is_checkout() ) ) {
			return;
		}

		/**
		 * Register our JS scripts
		 */		
		global $pmpro_countries;
		wp_register_script( 'pmpro-countries-main', plugins_url( '/js/countries-main.js', __FILE__ ), array('jquery'), PMPROSD_VERSION, array( 'in_footer' => true ) );
		wp_localize_script( 'pmpro-countries-main', 'pmpro_state_labels', array( 'country' => __( 'Select country', 'pmpro-state-dropdowns' ), 'region' => __( 'Select state', 'pmpro-state-dropdowns' ) ) 		);
		wp_localize_script( 'pmpro-countries-main', 'pmprosd_states', pmprosd_states() );
		wp_localize_script( 'pmpro-countries-main', 'pmprosd_countries', $pmpro_countries );
		/**
		 * Data for localize script, get user meta from the user and load it into fields using jquery from countries-main.js
		 * @internal: Add in a nonce for security reasons.
		 */
		$user_saved_countries = array();

		//check to see if user is  on the admin page.
		if ( is_admin() && isset($_REQUEST['page']) && $_REQUEST['page'] == 'pmpro-orders' && !empty($_GET['order']) ) {
			$morder = new MemberOrder($_GET['order']);
		}
		
		//if $morder is not empty (i.e. on the orders page try to get details from REQUEST or USER META )
		if( ! isset($morder) ){
			if( isset( $_REQUEST['bcountry'] ) ){
				$user_saved_countries['bcountry'] = sanitize_text_field( $_REQUEST['bcountry'] );
			}elseif ( empty( get_user_meta( $user_id, 'pmpro_bcountry', true ) ) ) {
				$user_saved_countries['bcountry'] = $pmpro_default_country;
			}else{
				$user_saved_countries['bcountry'] = get_user_meta( $user_id, 'pmpro_bcountry', true );
			}

			if( isset( $_REQUEST['bstate'] ) ){
				$user_saved_countries['bstate'] = sanitize_text_field( $_REQUEST['bstate'] );
			}else{
				$user_saved_countries['bstate'] = get_user_meta( $user_id, 'pmpro_bstate', true );
			}

			if( isset( $_REQUEST['pmpro_scountry'] ) ){
				$user_saved_countries['scountry'] = sanitize_text_field( $_REQUEST['pmpro_scountry'] );
			}elseif ( empty( get_user_meta( $user_id, 'pmpro_scountry', true ) ) ) {
				$user_saved_countries['scountry'] = $pmpro_default_country;
			}else{
				$user_saved_countries['scountry'] = get_user_meta( $user_id, 'pmpro_scountry', true );
			}

			if( isset( $_REQUEST['pmpro_sstate'] ) ){
				$user_saved_countries['sstate'] = sanitize_text_field( $_REQUEST['pmpro_sstate'] );
			}else{
				$user_saved_countries['sstate'] = get_user_meta( $user_id, 'pmpro_sstate', true );
			}
		}else{
			//by default PMPro Orders page only takes billing address and does not display shipping address. Only pass necessary information.
			$user_saved_countries['bcountry'] = $morder->billing->country;
			$user_saved_countries['bstate'] = $morder->billing->state;			
		}	

		wp_localize_script( 'pmpro-countries-main', 'pmpro_state_dropdowns', $user_saved_countries );
		
		/**
		 * Finally, enqueue the scripts
		 */
		wp_enqueue_script( 'pmpro-countries' );
		wp_enqueue_script( 'pmpro-countries-main' );
	}
}

PMPro_State_Dropdowns::instance();

/*
	Function to add links to the plugin row meta
*/
function pmpro_state_dropdowns_plugin_row_meta($links, $file) {
	if(strpos($file, 'pmpro-state-dropdowns.php') !== false)
	{
		$new_links = array(
			'<a href="' . esc_url('https://www.paidmembershipspro.com/add-ons/state-dropdown/')  . '" title="' . esc_attr( __( 'View Documentation', 'pmpro-state-dropdowns' ) ) . '">' . __( 'Docs', 'pmpro-state-dropdowns' ) . '</a>',
			'<a href="' . esc_url('https://www.paidmembershipspro.com/support/') . '" title="' . esc_attr( __( 'Visit Customer Support Forum', 'pmpro-state-dropdowns' ) ) . '">' . __( 'Support', 'pmpro-state-dropdowns' ) . '</a>',
		);
		$links = array_merge($links, $new_links);
	}
	return $links;
}
add_filter('plugin_row_meta', 'pmpro_state_dropdowns_plugin_row_meta', 10, 2);
