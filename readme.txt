=== Paid Memberships Pro - State Dropdowns ===
Contributors: strangerstudios
Tags: paid memberships pro, pmpro, states, counties, provences
Requires at least: 5.2
Tested up to: 6.6
Stable tag: 0.5
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Converts state fields on the checkout, edit profile and order pages to dropdowns autopopulated based on the selected country. 

== Description ==

Converts state fields on the checkout, edit profile and order pages to dropdowns autopopulated based on the selected country.

PMPro State Dropdown field integrates with the following areas in Paid Memberships Pro:

* Billing fields (Checkout, edit user and orders page)
* Shipping Address on Membership Checkout add-on: https://www.paidmembershipspro.com/add-ons/shipping-address-membership-checkout/

== Installation ==

1. Make sure you have the Paid Memberships Pro plugin installed and activated.
1. Upload the `pmpro-state-dropdowns` directory to the `/wp-content/plugins/` directory of your site.
1. Activate the plugin through the 'Plugins' menu in WordPress.

== Frequently Asked Questions ==

= I found a bug in the plugin. =

Please post it in the GitHub issue tracker here: https://github.com/strangerstudios/pmpro-state-dropdowns/issues

= I need help installing, configuring, or customizing the plugin. =

Please visit our premium support site at https://www.paidmembershipspro.com for more documentation and our support forums.

= The state fields are not showing correctly for pre-existing users =

Existing users that have entered their State/Province before using this add-on may be required to update their profile while PMPro State Dropdowns is activated. This is usually caused by incorrect spelling of the State/Province. (This only affects the front-end of your site and won't affect the previously saved user meta)

= Some States/Provinces are missing or incorrect from the State/Province dropdown =

Not all countries may be fully supported regarding the State/Province list. If you find a fault with your country's State/Province list, please post it in the GitHub issue tracker here: https://github.com/strangerstudios/pmpro-state-dropdowns/issues

== Changelog ==
= 0.5 - 2024-07-18 =
* ENHANCEMENT: Updated the frontend UI for compatibility with PMPro v3.1.
* ENHANCEMENT: Now moving the Country field before the City field for better UX.
* BUG FIX: Only using the `pmpro_longform_address` filter on pre-v3.1+ versions of PMPro (now the default behavior).

= 0.4.4 - 2024-01-05 =
 * ENHANCEMENT: Moved Kosovo out of state options for Serbia. (@andrewlimaza)
 * ENHANCEMENT: Added states for Singapore and United Kingdom. (@andrewlimaza, @ipokkel)
 * ENHANCEMENT: Adjusted how we detect we're on the checkout page to be more reliable. (@andrewlimaza)
 * REFACTOR: Moved away from using a PHP global for state options and moved to a helper function to get a list of all states for all countries `pmprosd_states()` (@andrewlimaza)
 * BUG FIX: Fixed an issue where the `pmpro_default_country` would not be set for the Shipping Add On. (@andrewlimaza)
 
= 0.4.3 - 2023-10-05 =
* BUG FIX: Fixed an issue where the states/provinces dropdown wouldn't populate on page load.

= 0.4.2 - 2023-10-02 =
* BUG FIX: Fixed an issue where the country field wasn't storing correctly and causing issues with some sites and checkouts. (@JarrydLong)

= 0.4.1 - 2023-08-18 =
* BUG FIX: Fixed an issue with the Shipping Address Add On showing the field was an error when it wasn't.

= 0.4 - 2023-08-18 =
* ENHANCEMENT: Reworked the state dropdown logic to be more efficient and easier to maintain. (@JarrydLong)
* ENHANCEMENT: Added improved error handling on the empty fields when required to highlight error fields. (@dparker1005)
* BUG FIX: Fixed incorrect text domain which would cause issues with translations. (@mircobabini)

= 0.3 - 2021-02-12 =
* BUG FIX: Fixed a warning where $order variable wasn't present in certain cases like the profile page.
* BUG FIX/ENHANCEMENT: Fixed Italy state codes from numeric to 2 Letter ISO codes. @mircobabini
* ENHANCEMENT: Added in localization and default .pot file.
* ENHANCEMENT: Sanitize values where possible.
* ENHANCEMENT: Updated Country Region Selection library to latest version.

= 0.2 - 2020-04-09 =
* BUG FIX: Fixed issue where state dropdown fields weren't showing/working on billing page.
* BUG FIX: Fixed issue where fields weren't being added to the correct location on the checkout page via JavaScript.

= .1 =
* Initial Release
