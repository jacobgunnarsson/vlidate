# vlidate

### What is this?

This is a small form validation jQuery plugin I wrote for use in one of my personal projects. It really is nothing special, I just wanted an as simple and lightweight approach as possible. Results of the validation along with the elements that passed/failed is the first argument passed to the callback, if no callback function is passed the form is submitted as usual. Customizable classes are appended to the validated form elements for styling.


### Usage

Add a data-validate tag to each element you want the plugin to validate. Possible default values (and included regex patterns) are name/email/password/cc/url/alpha/alphalower/alphaupper/alphanum/numeric/text (this is possible to extend by passing in more patterns in the options object). For elements without text input such as checkboxes or select menus you can use data-validate="require" to make them required.

Simply call .vlidate() on your form element, i.e.
```
$('form').vlidate(options, function(results) { ... });
```
Where options is an object, more under 'Options'. The callback is optional, if no callback is provided it is assumed you want the form to submit as usual, the first argument passed into the callback are the validation results.


### Options

```
preventFormSubmission, true/false, default: true
```
Prevents the form from being submitted in case validation passed if you want to handle data submission client side, in the callback. Set to false if you want the form to submit when validation passes.


```
highlight, true/false, default: true
```
Controls wether or not vlidate appends class-names to elements that pass/fail.


```
highlightClasses, default: { failed: 'vlidate-failed', passed: 'vlidate-passed' }
```
If you want to customize the appended class-names.


```
regex, i.e. { swedish-middle-name: /pattern/ }
```
This is how to add custom validation regex, simply pass in the name and pattern of the custom validation you want to add. Then use the name as the data-validate value to perform field validation based on the passed regex pattern.