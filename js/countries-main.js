jQuery(document).ready(function($){

	//for compatibility with older PMPro, make sure bcountry fields have ids
	jQuery("[name='bcountry']").attr('id', 'bcountry');
	jQuery("[name='scountry']").attr('id', 'scountry');	

	jQuery("[name='pmpro_bcountry']").attr('id', 'bcountry');
	jQuery("[name='pmpro_bstate']").attr('id', 'bstate');

	// //make sure we have a bcountry field to work with
	if(jQuery('#bcountry').length) {			

		//move #bcountry field and label above #bfirstname field and label
		var bcountryDiv = jQuery('label[for="bcountry"]').closest('div');
		bcountryDiv.insertBefore(jQuery('label[for="bfirstname"]').closest('div'));
		
		var selected_states = pmprosd_states[pmpro_state_dropdowns.bcountry];
		if( typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0 ) {
			if ( jQuery('#bstate').hasClass('pmpro_error') ) {
				jQuery("#bstate").replaceWith('<select id="bstate" name="bstate" class="pmpro_error"></select>');  //convert to dropdown so states can auto-populate
			} else {
				jQuery("#bstate").replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate
			}

			pmprosd_populate_dropdown( "[name='bstate']", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.bstate );
		} else {
			if ( jQuery('#bstate').hasClass('pmpro_error') ) {
				jQuery("#bstate").replaceWith('<input type="text" id="bstate" name="bstate" class="pmpro_error"/>');
			} else {
				jQuery("#bstate").replaceWith('<input type="text" id="bstate" name="bstate"/>');
			}
		}

	}
	
	jQuery('body').on('change', "[name='bcountry']",function(){
		var selected_country = jQuery(this).val();
		var selected_states = pmprosd_states[selected_country];
		if( typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0 ) {
			if ( jQuery("[name='bstate']").hasClass('pmpro_error') ) {
				jQuery("[name='bstate']").replaceWith('<select id="bstate" name="bstate" class="pmpro_error"></select>');  //convert to dropdown so states can auto-populate
			} else {
				jQuery("[name='bstate']").replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate
			}
			pmprosd_populate_dropdown( "[name='bstate']", selected_states, pmpro_state_labels.region, '' );
		} else {
			if ( jQuery("[name='bstate']").hasClass('pmpro_error') ) {
				jQuery("[name='bstate']").replaceWith('<input type="text" id="bstate" name="bstate" class="pmpro_error"/>');
			} else {
				jQuery("[name='bstate']").replaceWith('<input type="text" id="bstate" name="bstate"/>');
			}
		}
	});

	//pmpro-shipping support
	if(jQuery('#scountry').length) {

		//convert Shipping Country to dropdown.
		if (jQuery("[name='scountry']").hasClass('pmpro_error')) {
			jQuery('#scountry').replaceWith('<select id="scountry" name="scountry" class="pmpro_error"></select>');
		}
		
		pmprosd_populate_dropdown( "#scountry", pmprosd_countries, pmpro_state_labels.country, pmpro_state_dropdowns.scountry );

		//move #scountry field and label above #sfirstname field and label
		var scountryDiv = jQuery('label[for="scountry"]').closest('div');
		scountryDiv.insertBefore(jQuery('label[for="sfirstname"]').closest('div'));
		
		var selected_states = pmprosd_states[pmpro_state_dropdowns.scountry];
		if( typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0 ) {
			if ( jQuery("#sstate").hasClass('pmpro_error') ) {
				jQuery('#sstate').replaceWith('<select id="sstate" name="sstate" class="pmpro_error"></select>');  //convert to dropdown so states can auto-populate   
			} else {
				jQuery('#sstate').replaceWith('<select id="sstate" name="sstate" ></select>');  //convert to dropdown so states can auto-populate   
			}
			pmprosd_populate_dropdown( "#sstate", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.sstate );
		} else {
			if ( jQuery("#sstate").hasClass('pmpro_error') ) {
				jQuery("#sstate").replaceWith('<input type="text" id="sstate" name="sstate" class="pmpro_error"/>');
			} else {
				jQuery("#sstate").replaceWith('<input type="text" id="sstate" name="sstate">');
			}
		}

	}

	jQuery('body').on('change', "[name='scountry']",function(){
		var selected_country = jQuery(this).val();
		var selected_states = pmprosd_states[selected_country];
		if( typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0 ) {
			if ( jQuery("[name='sstate']").hasClass('pmpro_error') ) {
				jQuery("[name='sstate']").replaceWith('<select id="sstate" name="sstate" class="pmpro_error"></select>');  //convert to dropdown so states can auto-populate   
			} else {
				jQuery("[name='sstate']").replaceWith('<select id="sstate" name="sstate"></select>');  //convert to dropdown so states can auto-populate   
			}
			pmprosd_populate_dropdown( "[name='sstate']", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.sstate );
		} else {
			if ( jQuery("[name='sstate']").hasClass('pmpro_error') ) {
				jQuery("[name='sstate']").replaceWith('<input type="text" id="sstate" name="sstate" class="pmpro_error"/>');
			} else {
				jQuery("[name='sstate']").replaceWith('<input type="text" id="sstate" name="sstate"/>');
			}
		}
	});

	//PMPro orders page support
	if(jQuery('#billing_country').length){
		
		jQuery('#billing_country').replaceWith('<select id="billing_country" name="billing_country"></select>'); 

		pmprosd_populate_dropdown( "#billing_country", pmprosd_countries, pmpro_state_labels.country, pmpro_state_dropdowns.bcountry );
		var selected_states = pmprosd_states[pmpro_state_dropdowns.bcountry];

		if( typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0 ) {
			jQuery('#billing_state').replaceWith('<select id="billing_state" name="billing_state"></select>');
		} else {
			jQuery('#billing_state').replaceWith('<input type="text" id="billing_state" name="billing_state" />');
		}
		
		pmprosd_populate_dropdown( "#billing_state", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.bstate );
		
	}

	jQuery('body').on('change', "[name='billing_country']",function(){
		var selected_country = jQuery(this).val();
		
		var selected_states = pmprosd_states[selected_country];

		if( typeof selected_states !== 'undefined' && jQuery(selected_states).length > 0 ) {
			jQuery('#billing_state').replaceWith('<select id="billing_state" name="billing_state"></select>');
		} else {
			jQuery('#billing_state').replaceWith('<input type="text" id="billing_state" name="billing_state" />');
		}
		
		pmprosd_populate_dropdown( "#billing_state", selected_states, pmpro_state_labels.region, pmpro_state_dropdowns.bstate );
	});

	function pmprosd_populate_dropdown( id, states, first_label, selected ) {

		//Empty the dropdown first
		jQuery(id).html("");
		jQuery(id).append("<option value=''>"+first_label+"</select>");
		//Loop through the states and load them into the HTML dropdown
		if( typeof states !== 'undefined' ) {
			for (key in states ) {
				if( selected.length > 0 && selected == key ) {
					var selected_string = "selected='selected'";
				} else {
					var selected_string = "";
				}
				jQuery(id).append("<option value='"+key+"' "+selected_string+">"+states[key]+"</option>");
			}
		}
	}

});

