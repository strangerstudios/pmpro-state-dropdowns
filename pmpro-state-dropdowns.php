<?php
/*
Plugin Name: Paid Memberships Pro - State Dropdowns Add On
Plugin URI: https://www.paidmembershipspro.com/add-ons/state-dropdown/
Description: Creates an autopopulated field for countries and states/provinces for billing fields.
Version: 0.1
Author: Paid Memberships Pro
Author URI: https://www.paidmembershipspro.com
License: GPL2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: pmpro-state-dropdown
Network: false
*/

defined( 'ABSPATH' ) or exit;

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
		add_filter( 'pmpro_longform_address', '__return_true' );
	}

	public static function enqueue_styles_scripts(){
		global $current_user, $user_id, $order_id, $pmpro_default_country, $pmpro_pages;

		//fallback to current user on pages that don't support $user_id variable.
		if( empty( $user_id ) ){
			$user_id = $current_user->ID;
		}

		//we only want to enqueue this on certain pages
		 $script_name = basename( $_SERVER['SCRIPT_NAME'] );
		if( is_admin() &&  $script_name !== 'user-edit.php' && 
						   $script_name !== 'profile.php' && 
						  ( empty( $_REQUEST['page'] ) || $_REQUEST['page'] != 'pmpro-addmember' && $_REQUEST['page'] != 'pmpro-orders'  ) ){
			return;
		}

		// Check to see if we're on the front-end and not on these specific pages.
		if ( ! is_admin() && ( ! is_page( 'your-profile' ) && ! is_page( $pmpro_pages['billing'] ) && ! is_page( $pmpro_pages['checkout'] ) ) ) {
			return;
		}

		/**
		 * Register our JS scripts
		 */		
		wp_register_script( 'pmpro-countries', plugins_url( '/js/crs.js', __FILE__ ), array('jquery') );
		wp_register_script( 'pmpro-countries-main', plugins_url( '/js/countries-main.js', __FILE__ ), array('jquery', 'pmpro-countries') );		
		
		/**
		 * Data for localize script, get user meta from the user and load it into fields using jquery from countries-main.js
		 * @internal: Add in a nonce for security reasons.
		 */
		$user_saved_countries = array();

		//check to see if user is  on the admin page.
		if( is_admin() && isset($_REQUEST['page']) && $_REQUEST['page'] == 'pmpro-orders' && !empty($_GET['order']) ){
			$morder = new MemberOrder($_GET['order']);
		}
		
		//if $morder is not empty (i.e. on the orders page try to get details from REQUEST or USER META )
		if( empty($morder) ){
			if( isset( $_REQUEST['bcountry'] ) ){
				$user_saved_countries['bcountry'] = $_REQUEST['bcountry'];
			}elseif ( empty( get_user_meta( $user_id, 'pmpro_bcountry', true ) ) ) {
				$user_saved_countries['bcountry'] = $pmpro_default_country;
			}else{
				$user_saved_countries['bcountry'] = get_user_meta( $user_id, 'pmpro_bcountry', true );
			}

			if( isset( $_REQUEST['bstate'] ) ){
				$user_saved_countries['bstate'] = $_REQUEST['bstate'];
			}else{
				$user_saved_countries['bstate'] = get_user_meta( $user_id, 'pmpro_bstate', true );
			}

			if( isset( $_REQUEST['scountry'] ) ){
				$user_saved_countries['scountry'] = $_REQUEST['scountry'];
			}else{
				$user_saved_countries['scountry'] = get_user_meta( $user_id, 'pmpro_scountry', true );
			}

			if( isset( $_REQUEST['sstate'] ) ){
				$user_saved_countries['sstate'] = $_REQUEST['sstate'];
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
			'<a href="' . esc_url('https://www.paidmembershipspro.com/add-ons/state-dropdown/')  . '" title="' . esc_attr( __( 'View Documentation', 'pmpro' ) ) . '">' . __( 'Docs', 'pmpro' ) . '</a>',
			'<a href="' . esc_url('http://paidmembershipspro.com/support/') . '" title="' . esc_attr( __( 'Visit Customer Support Forum', 'pmpro' ) ) . '">' . __( 'Support', 'pmpro' ) . '</a>',
		);
		$links = array_merge($links, $new_links);
	}
	return $links;
}
add_filter('plugin_row_meta', 'pmpro_state_dropdowns_plugin_row_meta', 10, 2);
