jQuery(document).ready(function($){

	console.log(pmpro_state_dropdowns);

	//for compatibility with older PMPro, make sure bcountry fields have ids
	jQuery("[name='bcountry']").attr('id', 'bcountry');
	jQuery("[name='scountry']").attr('id', 'scountry');	

	jQuery("[name='pmpro_bcountry']").attr('id', 'bcountry');
	jQuery("[name='pmpro_bstate']").attr('id', 'bstate');

	// //make sure we have a bcountry field to work with
	if(jQuery('#bcountry').length) {	
		jQuery('#bcountry').attr('class', 'crs-country').attr('data-region-id', 'bstate').attr('data-default-value', pmpro_state_dropdowns.bcountry);	
		jQuery('#bcountry').attr('data-value', 'shortcode');
		
		jQuery("#bstate").replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate
		jQuery('#bstate').attr('data-default-value', pmpro_state_dropdowns.bstate );
		jQuery('#bstate').attr('data-value', 'shortcode');

		//move #bcountry field and label above #bfirstname field and label
		var bcountryDiv = jQuery('label[for="bcountry"]').closest('div');
		bcountryDiv.insertBefore('label[for="bfirstname"]').closest('div');
	}	

	//pmpro-shipping support
	if(jQuery('#scountry').length) {
		//convert Shipping Country to dropdown.
		jQuery('#scountry').replaceWith('<select id="scountry" name="scountry"></select>'); 
		jQuery('#scountry').attr('class', 'crs-country').attr('data-region-id', 'sstate').attr('data-default-value', pmpro_state_dropdowns.scountry);
		jQuery('#scountry').attr('data-value', 'shortcode');
		
		//change shipping state to select option and use JS to autofill the previously selected options.
		jQuery('#sstate').replaceWith('<select id="sstate" name="sstate"></select>');  //convert to dropdown so states can auto-populate   
		jQuery('#sstate').attr('data-default-value', pmpro_state_dropdowns.sstate );
		jQuery("#sstate").attr('data-value', 'shortcode');

		//move #scountry field and label above #sfirstname field and label
		var scountryDiv = jQuery('label[for="scountry"]').closest('div');
		scountryDiv.insertBefore('label[for="sfirstname"]').closest('div');
	}

	//PMPro orders page support
	if(jQuery('#billing_country').length){
		jQuery('#billing_country').replaceWith('<select id="billing_country" name="billing_country"></select>'); 
		jQuery('#billing_country').attr('class', 'crs-country').attr('data-region-id', 'billing_state').attr('data-default-value', pmpro_state_dropdowns.bcountry);
		jQuery("#billing_country").attr('data-value', 'shortcode');

		jQuery('#billing_state').replaceWith('<select id="billing_state" name="billing_state"></select>');
		jQuery('#billing_state').attr('data-default-value', pmpro_state_dropdowns.bstate );
		jQuery("#billing_state").attr('data-value', 'shortcode');
	}

});

