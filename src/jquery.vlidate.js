;(function($, window, document, undefined) {

	$.fn.vlidate = function(options, callback) {
		var form = this;

        /*
        *   The default settings and validation regex for supported inputs
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
        *   Extend regex if user wants to add their own validation
        */
        $.extend(true, defaults, options);

		/*
		*	Our inputs to validate and regex to cache regex patterns
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
            *   Results to store validation results
            */
            results = { status: '', failed: [], passed: [] };

            /*
            *   Iterate over inputs with validate data-attribute and use validation method based on tagName
            */
			inputs.each(function(v, el) {
                var $this       = $(el),
                    inputVal    = $this.val(),
                    isCheckbox  = ($this.attr('type') === 'checkbox'),
                    isSelect    = ($this.prop('tagName') === 'SELECT'),
                    validation  = $this.data('validate');

                if (validation) {

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
            *   Highlight results, submit form and call callback
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

            /*
            *   Return results with the callback provided
            */
            submit: function() {

                results.status = (results.failed.length) ? 'failed' : 'passed';

                if (!defaults.preventFormSubmit && results.status === 'passed') {

                    form.submit();

                } else if (typeof callback === 'function' ) {

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