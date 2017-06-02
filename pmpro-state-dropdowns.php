<?php
/**
 * Plugin Name: PMPro State Dropdowns
 * Description: Creates an autopopulated field for countries and states/provinces for billing fields.
 * Author: Stranger Studios
 * Author URI: https://strangerstuidos.com
 * Version: 0.1
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pmpro-state-dropdown
 * Domain Path: Domain Path
 * Network: false
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
	}

	public static function enqueue_styles_scripts(){
		wp_register_script( 'pmpro-countries-main', plugins_url( '/js/countries-main.js', __FILE__ ) );
		wp_enqueue_script( 'pmpro-countries', plugins_url( '/js/countries.js', __FILE__ ) );
		wp_enqueue_script( 'pmpro-countries-main' );

		/**
		 * Data for localize script, get user meta from the user and load it into fields using jquery from countries-main.js
		 * @internal: Add in a nonce for security reasons.
		 */
		global $current_user;

		$user_saved_countries = array(
			'country_selected'	=>	get_user_meta( $current_user->ID, 'pmpro_bcountry' ),
			'state_selected'	=>	get_user_meta( $current_user->ID, 'pmpro_bstate' )
			);
		wp_localize_script( 'pmpro-countries-main', 'test_object', $user_saved_countries );
	}



}

PMPro_State_Dropdowns::instance();
