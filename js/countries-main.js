jQuery(document).ready(function ($) {

	//for compatibility with older PMPro, make sure bcountry fields have ids
	jQuery("[name='bcountry']").attr('id', 'bcountry');
	jQuery("[name='scountry']").attr('id', 'scountry');

	jQuery("[name='pmpro_bcountry']").attr('id', 'bcountry');
	jQuery("[name='pmpro_bstate']").attr('id', 'bstate');

	/**
	 * Build the state field for a country.
	 *
	 * There are three cases, and they must match the PHP side (which only stops requiring the
	 * field when the country is in our data with an explicitly empty list of states):
	 *
	 * 1. The country is not in our data at all (states is undefined). We don't know its
	 *    subdivisions, so fall back to a plain text input that stays visible and required.
	 * 2. The country is in our data with no states (empty list). Clear and hide the field so
	 *    it is neither shown nor required.
	 * 3. The country has states. Show the field and rebuild it as a populated dropdown.
	 *
	 * @param {string} id       The id (and name) of the state field, e.g. "bstate" or "pmpro_sstate".
	 * @param {string} wrapper  A selector for the field's wrapping element to show/hide.
	 * @param {Object} states   The states for the currently selected country, keyed by abbreviation, or undefined.
	 * @param {string} selected The value that should be selected/prefilled, if any.
	 */
	function pmprosd_update_state_field(id, wrapper, states, selected) {
		var $field = jQuery('#' + id);
		var $wrapper = jQuery(wrapper);
		var has_error = $field.hasClass('pmpro_form_input-error');
		var error_class = has_error ? 'pmpro_form_input-error ' : '';
		var value = (typeof selected !== 'undefined' && selected !== null) ? String(selected) : '';

		if (typeof states === 'undefined' || states === null) {
			// Case 1: no data for this country. Keep a visible, required text input.
			$wrapper.show();
			$field.replaceWith('<input type="text" id="' + id + '" name="' + id + '" class="' + error_class + 'pmpro_form_input pmpro_form_input-text" />');
			jQuery('#' + id).val(value);
			return;
		}

		if (Object.keys(states).length === 0) {
			// Case 2: the country has no states/provinces. Clear the value and hide the field.
			$field.val('');
			$wrapper.hide();
			return;
		}

		// Case 3: the country has states/provinces. Show the field and rebuild it as a dropdown.
		$wrapper.show();
		$field.replaceWith('<select id="' + id + '" name="' + id + '" class="' + error_class + 'pmpro_form_input pmpro_form_input-select"></select>');
		pmprosd_populate_dropdown('#' + id, states, pmpro_state_labels.region, value);
	}

	//make sure we have a bstate field to work with
	if (jQuery('#bstate').length) {
		var selected_states = pmprosd_states[pmpro_state_dropdowns.bcountry];
		pmprosd_update_state_field('bstate', '.pmpro_form_field-bstate', selected_states, pmpro_state_dropdowns.bstate);
	}

	//make sure we have a bcountry field to work with
	if (jQuery('#bcountry').length) {
		// Move #bcountry field and label above #bcity field and label.
		var bcountryDiv = jQuery('label[for="bcountry"]').closest('div');
		bcountryDiv.insertBefore(jQuery('label[for="bcity"]').closest('div'));
	}

	jQuery('body').on('change', "#bcountry", function () {
		var selected_country = jQuery(this).val();
		var selected_states = pmprosd_states[selected_country];
		pmprosd_update_state_field('bstate', '.pmpro_form_field-bstate', selected_states, '');
	});

	//pmpro-shipping support
	if (jQuery('#pmpro_scountry').length) {

		// Move Shipping Country field above city for better UX.
		jQuery('#pmpro_scountry_div').insertBefore(jQuery('#pmpro_scity_div').closest('div'));

		pmprosd_populate_dropdown("#pmpro_scountry", pmprosd_countries, pmpro_state_labels.country, pmpro_state_dropdowns.scountry);

		var selected_states = pmprosd_states[pmpro_state_dropdowns.scountry];
		pmprosd_update_state_field('pmpro_sstate', '#pmpro_sstate_div', selected_states, pmpro_state_dropdowns.sstate);
	}

	jQuery('body').on('change', "#pmpro_scountry", function () {
		var selected_country = jQuery(this).val();
		var selected_states = pmprosd_states[selected_country];
		pmprosd_update_state_field('pmpro_sstate', '#pmpro_sstate_div', selected_states, '');
	});

	// Add support for Same as billing: keep the shipping state field in sync with the billing state field/country.
	// PMPro Shipping's own handler shows every shipping field again when the box is unchecked, so re-evaluate
	// the shipping country in both directions to keep a stateless country's field hidden.
	jQuery('#pmproship_same_billing_address').on('change', function () {
		if (jQuery(this).is(':checked')) {
			var selected_state = jQuery('#bstate').val();
			var billing_states = pmprosd_states[jQuery('#bcountry').val()];
			pmprosd_update_state_field('pmpro_sstate', '#pmpro_sstate_div', billing_states, selected_state);
		} else {
			var shipping_states = pmprosd_states[jQuery('#pmpro_scountry').val()];
			pmprosd_update_state_field('pmpro_sstate', '#pmpro_sstate_div', shipping_states, '');
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
