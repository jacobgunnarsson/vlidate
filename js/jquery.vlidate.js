(function($) {

	$.fn.vlidate = function() {
		/* 
		* @desc array containing validation results 
		*/
		var validations = [];

		/* 
		* @desc object containing validation regex for supported inputs 
		*/
		var	regex = {
				name: /^[a-zA-Z ]+$/,
				email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				password: /(?=^.{6,}$)((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.*/,
				cc: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/,
				url: /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/,
				alpha: /^[a-zA-Z]+$/,
				alphalower: /^([a-z])*$/,
				alphaupper: /^([A-Z])*$/,
				alphanum: /^[a-zA-Z0-9]+$/,
				numeric: /^[0-9]+$/
			};

		/* 
		* @desc $ object containing inputs to validate
		*/
		var inputs = $('input, select, textarea', this);

		/*
		* @desc iterate over inputs and validate based on data-validate attr
		* @return bool
		*/
		inputs.each(function(v, k) {

		});

		/* @desc on submit event loop trough array containing validation results  
		 * @return bool
		 */
		this.on('submit', function() {
			for (var i = 0; i < validations.length; ++i) {
				if (!validations[i]) return false;
			}

			return true;
		});
	};

})(jQuery);