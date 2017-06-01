jQuery(document).ready(function($){

	//jQuery("[name='bcountry']").find('option').remove().end(); //remove options from country field - don't actually need to do this.
	jQuery("[name='bcountry']").attr('id', 'bcountry');
	
    jQuery('#bstate').replaceWith('<select id="bstate" name="bstate"></select>');  //convert to dropdown so states can auto-populate   

    populateCountries("bcountry", "bstate");  

});

