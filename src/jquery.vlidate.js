;(function($, window, document, undefined) {

	$.fn.vlidate = function(options, callback) {
		var form = this;

        /*
        *   Default plugin settings and validation regex for supported inputs
        */
		var defaults = {

            preventFormSubmit: true,

            highlight: false,

            highlightClasses: {
                failed: 'vlidate-failed',
                passed: 'vlidate-passed'
            },

            regex: {
                name: /^[a-zA-Z ]+$/,
                email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                password: /^[a-zA-Z0-9 ]+$/,
                cc: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})$/,
                url: /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/,
                alpha: /^[a-zA-Z]+$/,
                alphalower: /^([a-z])*$/,
                alphaupper: /^([A-Z])*$/,
                alphanum: /^[a-zA-Z0-9]+$/,
                numeric: /^[0-9]+$/,
                text: /^[a-zA-Z0-9 ]+$/
            }

        };

        /*
        *   Extend defaults with options passed by the user
        */
        $.extend(true, defaults, options);

        /*
        *   If no callback is provided, assume user wants the form submitted as usual
        */
        if (typeof callback === 'undefined') defaults.preventFormSubmit = false;

		/*
		*	Inputs to validate, cache of regex patterns and the results object
		*/
		var inputs = $('input, select, textarea', form);

        var regex = defaults.regex;

        var results = {};

		/*
		*	Prevent native HTML5 form validation and bind event handler on form submit
		*/
        form.attr('novalidate', 'novalidate');

		form.on('submit', function(event) {

            /*
            *   See if user has overriden option to prevent form submission (to handle form submission in callback), if so, submit form as usual
            */
            if (typeof results.status !== 'undefined')
                if (!defaults.preventFormSubmit && results.status === 'passed') return true;

            if (defaults.preventFormSubmit || results.status !== 'passed') event.preventDefault();

            /*
            *   Reset results object for this submission
            */
            results = { status: '', failed: [], passed: [] };

            /*
            *   Iterate over inputs with data-validate attribute and pass it to the appropriate validation method based on tagName
            */
			inputs.each(function(v, el) {

                var $this       = $(el),
                    inputVal    = $this.val(),
                    validation  = $this.data('validate'),
                    isCheckbox  = ($this.attr('type') === 'checkbox'),
                    isSelect    = ($this.prop('tagName') === 'SELECT');

                if (validation) {

                    /*
                    *   Do a quick check to see if the requested validation passed in the data-validate tag exists as a regex pattern, if not, throw and error
                    */
                    if (typeof regex[validation] === 'undefined' && !isCheckbox && !isSelect) methods.error('Invalid data-validate attribute');

                    switch (el.tagName) {
                        case 'INPUT':
                            methods.validate.input($this, inputVal, isCheckbox, validation);
                            break;
                        case 'SELECT':
                            methods.validate.select($this, inputVal, validation);
                            break;
                        case 'TEXTAREA':
                            methods.validate.textarea($this, inputVal, validation);
                            break;
                    }

                }

			});

            /*
            *   Highlight results and handle form submission/callback
            */
            if (defaults.highlight) methods.highlight();

            methods.submit();

		});

        var methods = {

            /*
            *   Form element validation methods
            */
            validate: {

                input: function($this, inputVal, isCheckbox, validation) {

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
                    if (!isCheckbox && !regex[validation].test(inputVal)) {
                        results.failed.push($this);

                        return;
                    }

                    /*
                    *   Store form elements that passed validation
                    */
                    results.passed.push($this);

                },

                select: function($this, inputVal, validation) {
                    var defaultValue = $('option', $this).eq(0);

                    /*
                    *   Test for a required select
                    */
                    if (inputVal === '' || inputVal === defaultValue) {
                        results.failed.push($this);

                        return;
                    }

                    results.passed.push($this);

                },

                textarea: function($this, inputVal, validation) {

                    /*
                    *   Test for a required select
                    */
                    if (inputVal === '') {
                        results.failed.push($this);

                        return;
                    }

                    results.passed.push($this);
                }

            },

            highlight: function() {
                var failedClass = defaults.highlightClasses.failed,
                    passedClass = defaults.highlightClasses.passed;

                /*
                *   Hightlight elements that failed validation
                */
                for (var i = 0; i < results.failed.length; ++i)
                    results.failed[i].removeClass(passedClass).addClass(failedClass);

                /*
                *   Highlight elements that passed validation
                */
                for (var i = 0; i < results.passed.length; ++i)
                    results.passed[i].removeClass(failedClass).addClass(passedClass);

            },

            submit: function() {

                results.status = (results.failed.length) ? 'failed' : 'passed';

                /*
                *   Based on the set plugin options either submit the form or, the default behavior, pass the results objects to the callback
                */
                if (!defaults.preventFormSubmit && results.status === 'passed') {

                    form.submit();

                } else if (typeof callback === 'function' ) {

                    callback(results);

                } else { this.error('No callback provided or callback is not a function'); }

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