;(function($, window, document, undefined) {

	$.fn.vlidate = function(options, callback) {
		var ENV = 'dev',
            form = this;

        /*
        *   The default settings and validation regex for supported inputs
        */
		var defaults = {

            regex: {
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
            }

        };

        /*
        *   Extend regex if user wants to add their own validation
        */
        $.extend(true, defaults, options);

		/*
		*	Our inputs to validate and regex to cache regex patterns
		*/
		var inputs = $('input, select, textarea', form);

        var regex = defaults.regex;

        var results;

		/*
		*	Prevent native HTML5 form validation and bind event handler on form submit
		*/
        form.attr('novalidate', 'novalidate');

		form.on('submit', function(event) {
            event.preventDefault();

            /*
            *   Results to store validation results
            */
            results = { failed: [], success: [] };

            /*
            *   Iterate over inputs with validate data-attribute and use validation method based on tagName
            */
			inputs.each(function(v, el) {

                if ($(el).data('validate')) {

                    switch (el.tagName) {
                        case 'INPUT':
                            methods.validate.input(el);
                            break;
                        case 'SELECT':
                            methods.validate.select(el);
                            break;
                        case 'TEXTAREA':
                            methods.validate.textarea(el);
                            break;
                    }

                }

			});

            /*
            *   Handle results, submit form and handle callback
            */
            methods.submit();

		});

        var methods = {

            /*
            *   Form element validation methods
            */
            validate: {

                input: function(el) {
                    var $this       = $(el),
                        inputVal    = $this.val(),
                        isCheckbox  = !!($this.attr('type') === 'checkbox'),
                        validation  = $this.data('validate');

                    /*
                    *   Test for empty value
                    */
                    if (!isCheckbox && inputVal === '') {
                        results.failed.push($this);

                        return;
                    }

                    /*
                    *   Test for a required checkbox
                    */
                    if (isCheckbox && !$this[0].checked) {
                        results.failed.push($this);

                        return;
                    }

                    /*
                    *   Test text input against regex
                    */
                    if (!isCheckbox && !inputVal.test(regex[validation])) {
                        results.failed.push($this);

                        return;
                    }

                    /*
                    *   Store form elements that passed validation
                    */
                    results.success.push($this);

                },

                select: function(el) {

                },

                textarea: function(el) {

                }

            },

            /*
            *   Return results with the callback provided
            */
            submit: function() {

                if (typeof callback === 'function') {

                    callback(results);

                } else { this.error('No callback provided'); }

            },

            error: function(error) {
                throw 'Vlidate error: ' + error;
            }

        };

		/*
		*	Return this to maintain jQuery chainability
		*/
		return this;
	};

})(jQuery, window, document);