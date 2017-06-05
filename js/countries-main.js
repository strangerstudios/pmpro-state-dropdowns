jQuery(document).ready(function($){

	//for compatibility with older PMPro, make sure bcountry & scountry fields have ids
	jQuery("[name='bcountry']").attr('id', 'bcountry');
	jQuery("[name='scountry']").attr('id', 'scountry');

	// //make sure we have a bcountry field to work with
	if(jQuery('#bcountry').length) {	
		jQuery('#bcountry').attr('class', 'crs-country').attr('data-region-id', 'bstate').attr('data-default-value', pmpro_state_dropdowns.bcountry);	
		jQuery('#bstate').replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate
		jQuery('#bstate').attr('data-default-value', pmpro_state_dropdowns.bstate );

}	

	//pmpro-shipping support
	if(jQuery('#scountry').length) {
		//convert Shipping Country to dropdown.
		jQuery('#scountry').replaceWith('<select id="scountry" name="scountry"></select>'); 
		jQuery('#scountry').attr('class', 'crs-country').attr('data-region-id', 'sstate').attr('data-default-value', pmpro_state_dropdowns.scountry);

		//change shipping state to select option and use JS to autofill the previously selected options.
		jQuery('#sstate').replaceWith('<select id="sstate" name="sstate"></select>');  //convert to dropdown so states can auto-populate   
		jQuery('#sstate').attr('data-default-value', pmpro_state_dropdowns.sstate );
	}
});

