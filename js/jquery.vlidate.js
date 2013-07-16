;(function($, window, document, undefined) {

	$.fn.vlidate = function(plugins, options, callback) {
		form = this;

		var defaults = {};

		/*
		*	Object containing validation regex for supported inputs
		*/
		var regex = {
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
		*	Our inputs to validate
		*/
		var inputs = $('input, select, textarea', this);

		var methods = {

			/*
			*	Init event handler
			*/
			init: function() {
				form.on('submit', function() {

					inputs.each(function(v, el) {

						switch (el.tagName) {
							case 'input':
								this.validate.input(el);
								break;
							case 'select':
								this.validate.select(el);
								break;
							case 'textarea':
								this.valdate.textarea(el);
								break;
						}
					});
				});
			},

			/*
			*	Iterate over inputs and validate based on data-validate attribute
			*/
			validate: {

				input: function(el) {
					var $this		= $(k),
						inputVal	= $this.val(),
						validation	= $this.data('validate');
				}

			},

			submit: function() {

				for (var i = 0; i < results.length; ++i)
					if (!results[i]) return false;

				return true;

			}
		};

		$.extend(defaults, options);

		methods.init();

		/*
		*	Return this to maintain jQuery chainability
		*/
		return this;
	};

})(jQuery, window, document);