jQuery(document).ready(function ($) {

	//for compatibility with older PMPro, make sure bcountry fields have ids
	jQuery("[name='bcountry']").attr('id', 'bcountry');
	jQuery("[name='scountry']").attr('id', 'scountry');

	jQuery("[name='pmpro_bcountry']").attr('id', 'bcountry');
	jQuery("[name='pmpro_bstate']").attr('id', 'bstate');

	// Populate the dropdown on page load.
	var selected_states = pmprosd_states[pmpro_state_dropdowns.bcountry];
	pmprosd_populate_dropdown("#bstate", selected_states, pmpro_state_labels.region, '');

	//make sure we have a bcountry field to work with
	if (jQuery('#bcountry').length) {

		// Move #bcountry field and label above #bcity field and label.
		var bcountryDiv = jQuery('label[for="bcountry"]').closest('div');
		bcountryDiv.insertBefore(jQuery('label[for="bcity"]').closest('div'));

		// Get the states for a specific country.
		var states_for_countries = pmprosd_states[pmpro_state_dropdowns.bcountry];
		if (typeof states_for_countries !== 'undefined' && jQuery(states_for_countries).length > 0) {
			if (jQuery('#bstate').hasClass('pmpro_error')) {
				jQuery("#bstate").replaceWith('<select id="bstate" name="bstate" class="pmpro_error pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate
			} else {
				jQuery("#bstate").replaceWith('<select id="bstate" name="bstate" class="pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate
			}

			pmprosd_populate_dropdown("#bstate", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.bstate);
		} else {
			var selected_state = (typeof pmpro_state_dropdowns.bstate !== 'undefined') ? pmpro_state_dropdowns.bstate : "";
			if (jQuery('#bstate').hasClass('pmpro_error')) {
				jQuery("#bstate").replaceWith('<input type="text" id="bstate" name="bstate" class="pmpro_error pmpro_form_input pmpro_form_input-text" value="' + selected_state + '"/>');
			} else {
				jQuery("#bstate").replaceWith('<input type="text" id="bstate" name="bstate" class="pmpro_form_input pmpro_form_input-text" value="' + selected_state + '"/>');
			}
		}

	}

	jQuery('body').on('change', "#bcountry", function () {
		var selected_country = jQuery(this).val();
		var selected_states = pmprosd_states[selected_country];
		if (typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0) {
			if (jQuery("#bstate").hasClass('pmpro_error')) {
				jQuery("#bstate").replaceWith('<select id="bstate" name="bstate" class="pmpro_error pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate
			} else {
				jQuery("#bstate").replaceWith('<select id="bstate" name="bstate" class="pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate
			}
			pmprosd_populate_dropdown("#bstate", selected_states, pmpro_state_labels.region, '');
		} else {
			var selected_state = (typeof pmpro_state_dropdowns.bstate !== 'undefined') ? pmpro_state_dropdowns.bstate : "";
			if (jQuery('#bstate').hasClass('pmpro_error')) {
				jQuery("#bstate").replaceWith('<input type="text" id="bstate" name="bstate" class="pmpro_error pmpro_form_input pmpro_form_input-text" value="' + selected_state + '"/>');
			} else {
				jQuery("#bstate").replaceWith('<input type="text" id="bstate" name="bstate" value="' + selected_state + '"/>');
			}
		}
	});

	//pmpro-shipping support
	if (jQuery('#pmpro_scountry').length) {

		// Move Shipping Country field above city for better UX.
		jQuery('#pmpro_scountry_div').insertBefore(jQuery('#pmpro_scity_div').closest('div'));

		pmprosd_populate_dropdown("#pmpro_scountry", pmprosd_countries, pmpro_state_labels.country, pmpro_state_dropdowns.scountry);

		var selected_states = pmprosd_states[pmpro_state_dropdowns.scountry];
		if (typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0) {
			if (jQuery("#pmpro_sstate").hasClass('pmpro_error')) {
				jQuery('#pmpro_sstate').replaceWith('<select id="pmpro_sstate" name="pmpro_sstate" class="pmpro_error pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate   
			} else {
				jQuery('#pmpro_sstate').replaceWith('<select id="pmpro_sstate" name="pmpro_sstate" class="pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate   
			}
			pmprosd_populate_dropdown("#pmpro_sstate", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.sstate);
		} else {
			var selected_state = (typeof pmpro_state_dropdowns.sstate !== 'undefined') ? pmpro_state_dropdowns.sstate : "";
			if (jQuery("#pmpro_sstate").hasClass('pmpro_error')) {
				jQuery("#pmpro_sstate").replaceWith('<input type="text" id="pmpro_sstate" name="pmpro_sstate" class="pmpro_error pmpro_form_input pmpro_form_input-text" value="' + selected_state + '" />');
			} else {
				jQuery("#pmpro_sstate").replaceWith('<input type="text" id="pmpro_sstate" name="pmpro_sstate" class="pmpro_form_input pmpro_form_input-text" value="' + selected_state + '" />');
			}
		}

	}

	jQuery('body').on('change', "#pmpro_scountry", function () {
		var selected_country = jQuery(this).val();
		var selected_states = pmprosd_states[selected_country];
		if (typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0) {
			if (jQuery("#pmpro_sstate").hasClass('pmpro_error')) {
				jQuery("#pmpro_sstate").replaceWith('<select id="pmpro_sstate" name="pmpro_sstate" class="pmpro_error pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate   
			} else {
				jQuery("#pmpro_sstate").replaceWith('<select id="pmpro_sstate" name="pmpro_sstate" class="pmpro_form_input pmpro_form_input-select"></select>');  //convert to dropdown so states can auto-populate   
			}
			pmprosd_populate_dropdown("#pmpro_sstate", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.sstate);
		} else {
			var selected_state = (typeof pmpro_state_dropdowns.sstate !== 'undefined') ? pmpro_state_dropdowns.sstate : "";
			if (jQuery("#pmpro_sstate").hasClass('pmpro_error')) {
				jQuery("#pmpro_sstate").replaceWith('<input type="text" id="pmpro_sstate" name="pmpro_sstate" class="pmpro_error" class="pmpro_form_input pmpro_form_input-text" value="' + selected_state + '" />');
			} else {
				jQuery("#pmpro_sstate").replaceWith('<input type="text" id="pmpro_sstate" name="pmpro_sstate" class="pmpro_form_input pmpro_form_input-text" value="' + selected_state + '" />');
			}
		}
	});

	// Add support for Same as billing and set the state to a text field.
	jQuery('#pmproship_same_billing_address').on('change', function () {
		if (jQuery(this).is(':checked')) {
			var selected_state = jQuery('#bstate').val();
			jQuery("#pmpro_sstate").replaceWith('<input type="text" id="pmpro_sstate" name="pmpro_sstate" class="pmpro_form_input pmpro_form_input-text" value="' + selected_state + '" />');
		}
	});


	//PMPro orders page support
	if (jQuery('#billing_country').length) {

		jQuery('#billing_country').replaceWith('<select id="billing_country" name="billing_country"></select>');

		pmprosd_populate_dropdown("#billing_country", pmprosd_countries, pmpro_state_labels.country, pmpro_state_dropdowns.bcountry);
		var selected_states = pmprosd_states[pmpro_state_dropdowns.bcountry];

		if (typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0) {
			jQuery('#billing_state').replaceWith('<select id="billing_state" name="billing_state" class="pmpro_form_input pmpro_form_input-select"></select>');
		} else {
			jQuery('#billing_state').replaceWith('<input type="text" id="billing_state" name="billing_state" class="pmpro_form_input pmpro_form_input-text" />');
		}

		pmprosd_populate_dropdown("#billing_state", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.bstate);

	}

	jQuery('body').on('change', "[name='billing_country']", function () {
		var selected_country = jQuery(this).val();

		var selected_states = pmprosd_states[selected_country];

		if (typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0) {
			jQuery('#billing_state').replaceWith('<select id="billing_state" name="billing_state" class="pmpro_form_input pmpro_form_input-select"></select>');
		} else {
			jQuery('#billing_state').replaceWith('<input type="text" id="billing_state" name="billing_state" class="pmpro_form_input pmpro_form_input-text" />');
		}

		pmprosd_populate_dropdown("#billing_state", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.bstate);
	});

	function pmprosd_populate_dropdown(id, states, first_label, selected) {

		//Empty the dropdown first
		jQuery(id).html("");
		jQuery(id).append("<option value=''>" + first_label + "</select>");
		//Loop through the states and load them into the HTML dropdown
		if (typeof states !== 'undefined') {
			for (key in states) {
				if (selected.length > 0 && selected == key) {
					var selected_string = "selected='selected'";
				} else {
					var selected_string = "";
				}
				jQuery(id).append("<option value='" + key + "' " + selected_string + ">" + states[key] + "</option>");
			}
		}
	}

});

