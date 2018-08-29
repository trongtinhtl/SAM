(function ($) {
    $.fn.equalHeights = function (e) {
        $(this).each(function () {
            var t = 0;
            $(this).children().each(function (e) {
                if ($(this).height() > t) {
                    t = $(this).height()
                }
            });
            if (!e && Number.prototype.pxToEm) t = t.pxToEm();
            if ($.browser.msie && $.browser.version == 6) {
                $(this).children().css({
                    height: t
                })
            }
            $(this).children().css({
                "min-height": t
            })
        });
        return this
    };
    $.fn.equalWidths = function (e) {
        $(this).each(function () {
            var t = 0;
            $(this).children().each(function (e) {
                if ($(this).width() > t) {
                    t = $(this).width()
                }
            });
            if (!e && Number.prototype.pxToEm) t = t.pxToEm();
            if ($.browser.msie && $.browser.version == 6) {
                $(this).children().css({
                    width: t
                })
            }
            $(this).children().css({
                "min-width": t
            })
        });
        return this
    }
})(jQuery);;
/*!
 * jQuery Validation Plugin 1.12.0pre
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {

    $.extend($.fn, {
        // http://docs.jquery.com/Plugins/Validation/validate
        validate: function (options) {

            // if nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }

            // check if a validator for this form was already created
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr("novalidate", "novalidate");

            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);

            if (validator.settings.onsubmit) {

                this.validateDelegate(":submit", "click", function (event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target;
                    }
                    // allow suppressing validation by adding a cancel class to the submit button
                    if ($(event.target).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }

                    // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ($(event.target).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });

                // validate the form on submit
                this.submit(function (event) {
                    if (validator.settings.debug) {
                        // prevent form submit to be able to see console output
                        event.preventDefault();
                    }

                    function handle() {
                        var hidden;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                // insert a hidden input as a replacement for the missing submit button
                                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm);
                            }
                            validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            return false;
                        }
                        return true;
                    }

                    // prevent submit for invalid forms or custom submit handlers
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },
        // http://docs.jquery.com/Plugins/Validation/valid
        valid: function () {
            if ($(this[0]).is("form")) {
                return this.validate().form();
            } else {
                var valid = true;
                var validator = $(this[0].form).validate();
                this.each(function () {
                    valid = valid && validator.element(this);
                });
                return valid;
            }
        },
        // attributes: space seperated list of attributes to retrieve and remove
        removeAttrs: function (attributes) {
            var result = {},
                $element = this;
            $.each(attributes.split(/\s/), function (index, value) {
                result[value] = $element.attr(value);
                $element.removeAttr(value);
            });
            return result;
        },
        // http://docs.jquery.com/Plugins/Validation/rules
        rules: function (command, argument) {
            var element = this[0];

            if (command) {
                var settings = $.data(element.form, "validator").settings;
                var staticRules = settings.rules;
                var existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        var filtered = {};
                        $.each(argument.split(/\s/), function (index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                        });
                        return filtered;
                }
            }

            var data = $.validator.normalizeRules(
                $.extend({},
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.dataRules(element),
                    $.validator.staticRules(element)
                ), element);

            // make sure required is at front
            if (data.required) {
                var param = data.required;
                delete data.required;
                data = $.extend({
                    required: param
                }, data);
            }

            return data;
        }
    });

    // Custom selectors
    $.extend($.expr[":"], {
        // http://docs.jquery.com/Plugins/Validation/blank
        blank: function (a) {
            return !$.trim("" + $(a).val());
        },
        // http://docs.jquery.com/Plugins/Validation/filled
        filled: function (a) {
            return !!$.trim("" + $(a).val());
        },
        // http://docs.jquery.com/Plugins/Validation/unchecked
        unchecked: function (a) {
            return !$(a).prop("checked");
        }
    });

    // constructor for validator
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };

    $.validator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function (element, event) {
                this.lastActive = element;

                // hide error label and remove error class on focus if enabled
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.addWrapper(this.errorsFor(element)).hide();
                }
            },
            onfocusout: function (element, event) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function (element, event) {
                if (event.which === 9 && this.elementValue(element) === "") {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }
            },
            onclick: function (element, event) {
                // click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);
                }
                // or option elements, check parent select in that case
                else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
        setDefaults: function (settings) {
            $.extend($.validator.defaults, settings);
        },

        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function () {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = (this.groups = {});
                $.each(this.settings.groups, function (key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function (index, name) {
                        groups[name] = key;
                    });
                });
                var rules = this.settings.rules;
                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, "");
                    if (validator.settings[eventType]) {
                        validator.settings[eventType].call(validator, this[0], event);
                    }
                }
                $(this.currentForm)
                    .validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
                        "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                        "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], " +
                        "[type='range'], [type='color'] ",
                        "focusin focusout keyup", delegate)
                    .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                }
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/form
            form: function () {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function () {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/element
            element: function (element) {
                element = this.validationTargetFor(this.clean(element));
                this.lastElement = element;
                this.prepareElement(element);
                this.currentElements = $(element);
                var result = this.check(element) !== false;
                if (result) {
                    delete this.invalid[element.name];
                } else {
                    this.invalid[element.name] = true;
                }
                if (!this.numberOfInvalids()) {
                    // Hide error containers on last error
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/showErrors
            showErrors: function (errors) {
                if (errors) {
                    // add items to error list and map
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    // remove items from success list
                    this.successList = $.grep(this.successList, function (element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/resetForm
            resetForm: function () {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
            },

            numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            },

            objectLength: function (obj) {
                var count = 0;
                for (var i in obj) {
                    count++;
                }
                return count;
            },

            hideErrors: function () {
                this.addWrapper(this.toHide).hide();
            },

            valid: function () {
                return this.size() === 0;
            },

            size: function () {
                return this.errorList.length;
            },

            focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus()
                            // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                            .trigger("focusin");
                    } catch (e) {
                        // ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function () {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },

            elements: function () {
                var validator = this,
                    rulesCache = {};

                // select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                    .find("input, select, textarea")
                    .not(":submit, :reset, :image, [disabled]")
                    .not(this.settings.ignore)
                    .filter(function () {
                        if (!this.name && validator.settings.debug && window.console) {
                            console.error("%o has no name assigned", this);
                        }

                        // select only the first element for each name, and only those with rules specified
                        if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                            return false;
                        }

                        rulesCache[this.name] = true;
                        return true;
                    });
            },

            clean: function (selector) {
                return $(selector)[0];
            },

            errors: function () {
                var errorClass = this.settings.errorClass.replace(" ", ".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            reset: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },

            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },

            prepareElement: function (element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function (element) {
                var type = $(element).attr("type"),
                    val = $(element).val();

                if (type === "radio" || type === "checkbox") {
                    return $("input[name='" + $(element).attr("name") + "']:checked").val();
                }

                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function (element) {
                element = this.validationTargetFor(this.clean(element));

                var rules = $(element).rules();
                var dependencyMismatch = false;
                var val = this.elementValue(element);
                var result;

                for (var method in rules) {
                    var rule = {
                        method: method,
                        parameters: rules[method]
                    };
                    try {

                        result = $.validator.methods[method].call(this, val, element, rule.parameters);

                        // if a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if (result === "dependency-mismatch") {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }

                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },

            // return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            customDataMessage: function (element, method) {
                return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
            },

            // return the custom message for the given element name and validation method
            customMessage: function (name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },

            // return the first defined argument, allowing empty strings
            findDefined: function () {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            defaultMessage: function (element, method) {
                return this.findDefined(
                    this.customMessage(element.name, method),
                    this.customDataMessage(element, method),
                    // title is never undefined, so handle empty string as undefined
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Warning: No message defined for " + element.name + "</strong>"
                );
            },

            formatAndAdd: function (element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function (toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },

            defaultShowErrors: function () {
                var i, elements;
                for (i = 0; this.errorList[i]; i++) {
                    var error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },

            validElements: function () {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function () {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            },

            showLabel: function (element, message) {
                var label = this.errorsFor(element);
                if (label.length) {
                    // refresh error/success class
                    label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    // replace message on existing label
                    label.html(message);
                } else {
                    // create label
                    label = $("<" + this.settings.errorElement + ">")
                        .attr("for", this.idOrName(element))
                        .addClass(this.settings.errorClass)
                        .html(message || "");
                    if (this.settings.wrapper) {
                        // make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (!this.labelContainer.append(label).length) {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(label, $(element));
                        } else {
                            label.insertAfter(element);
                        }
                    }
                }
                if (!message && this.settings.success) {
                    label.text("");
                    if (typeof this.settings.success === "string") {
                        label.addClass(this.settings.success);
                    } else {
                        this.settings.success(label, element);
                    }
                }
                this.toShow = this.toShow.add(label);
            },

            errorsFor: function (element) {
                var name = this.idOrName(element);
                return this.errors().filter(function () {
                    return $(this).attr("for") === name;
                });
            },

            idOrName: function (element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function (element) {
                // if radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName(element.name).not(this.settings.ignore)[0];
                }
                return element;
            },

            checkable: function (element) {
                return (/radio|checkbox/i).test(element.type);
            },

            findByName: function (name) {
                return $(this.currentForm).find("[name='" + name + "']");
            },

            getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function (param, element) {
                    return param;
                },
                "string": function (param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function (param, element) {
                    return param(element);
                }
            },

            optional: function (element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function (element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function (element, valid) {
                this.pendingRequest--;
                // sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function (element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, "remote")
                });
            }

        },

        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },

        addClassRules: function (className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function (element) {
            var rules = {};
            var classes = $(element).attr("class");
            if (classes) {
                $.each(classes.split(" "), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        attributeRules: function (element) {
            var rules = {};
            var $element = $(element);

            for (var method in $.validator.methods) {
                var value;

                // support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = $element.get(0).getAttribute(method);
                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }
                    // force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                if (value) {
                    rules[method] = value;
                } else if ($element[0].getAttribute("type") === method) {
                    rules[method] = true;
                }
            }

            // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function (element) {
            var method, value,
                rules = {},
                $element = $(element);
            for (method in $.validator.methods) {
                value = $element.data("rule-" + method.toLowerCase());
                if (value !== undefined) {
                    rules[method] = value;
                }
            }
            return rules;
        },

        staticRules: function (element) {
            var rules = {};
            var validator = $.data(element.form, "validator");
            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function (rules, element) {
            // handle dependency check
            $.each(rules, function (prop, val) {
                // ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(['minlength', 'maxlength'], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(['rangelength'], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {
                // auto-create ranges
                if (rules.min && rules.max) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength && rules.maxlength) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function (data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/addMethod
        addMethod: function (name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        methods: {

            // http://docs.jquery.com/Plugins/Validation/Methods/required
            required: function (value, element, param) {
                // check if dependency is met
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    // could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return $.trim(value).length > 0;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/email
            email: function (value, element) {
                // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/url
            url: function (value, element) {
                // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/date
            date: function (value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/dateISO
            dateISO: function (value, element) {
                return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/number
            number: function (value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/digits
            digits: function (value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/creditcard
            // based on http://en.wikipedia.org/wiki/Luhn
            creditcard: function (value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                // accept only spaces, digits and dashes
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false;

                value = value.replace(/\D/g, "");

                for (var n = value.length - 1; n >= 0; n--) {
                    var cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return (nCheck % 10) === 0;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/minlength
            minlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/maxlength
            maxlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length <= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/rangelength
            rangelength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/min
            min: function (value, element, param) {
                return this.optional(element) || value >= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/max
            max: function (value, element, param) {
                return this.optional(element) || value <= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/range
            range: function (value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/equalTo
            equalTo: function (value, element, param) {
                // bind to the blur event of the target in order to revalidate whenever the target field is updated
                // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/remote
            remote: function (value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                var previous = this.previousValue(element);
                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param === "string" && {
                    url: param
                } || param;

                if (previous.old === value) {
                    return previous.valid;
                }

                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function (response) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var valid = response === true || response === "true";
                        if (valid) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            var errors = {};
                            var message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }

        }

    });

    // deprecated, use $.validator.format instead
    $.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function ($) {
    var pendingRequests = {};
    // Use a prefilter if available (1.5+)
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function (settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        // Proxy ajax
        var ajax = $.ajax;
        $.ajax = function (settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function ($) {
    $.extend($.fn, {
        validateDelegate: function (delegate, type, handler) {
            return this.bind(type, function (event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
}(jQuery));;
/* TinySort 1.5.2
 * Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function (e, c) {
    var h = !1,
        k = null,
        o = parseFloat,
        l = Math.min,
        m = /(-?\d+\.?\d*)$/g,
        g = /(\d+\.?\d*)$/g,
        i = [],
        f = [],
        b = function (p) {
            return typeof p == "string"
        },
        n = Array.prototype.indexOf || function (r) {
            var p = this.length,
                q = Number(arguments[1]) || 0;
            q = q < 0 ? Math.ceil(q) : Math.floor(q);
            if (q < 0) {
                q += p
            }
            for (; q < p; q++) {
                if (q in this && this[q] === r) {
                    return q
                }
            }
            return -1
        };
    e.tinysort = {
        id: "TinySort",
        version: "1.5.2",
        copyright: "Copyright (c) 2008-2013 Ron Valstar",
        uri: "http://tinysort.sjeiti.com/",
        licensed: {
            MIT: "http://www.opensource.org/licenses/mit-license.php",
            GPL: "http://www.gnu.org/licenses/gpl.html"
        },
        plugin: function (p, q) {
            i.push(p);
            f.push(q)
        },
        defaults: {
            order: "asc",
            attr: k,
            data: k,
            useVal: h,
            place: "start",
            returns: h,
            cases: h,
            forceStrings: h,
            ignoreDashes: h,
            sortFunction: k
        }
    };
    e.fn.extend({
        tinysort: function () {
            var I, F, K = this,
                t = [],
                r = [],
                L = [],
                N = [],
                x = 0,
                q, E = [],
                B = [],
                C = function (O) {
                    e.each(i, function (P, Q) {
                        Q.call(Q, O)
                    })
                },
                y = function (Z, X) {
                    var O = 0;
                    if (x !== 0) {
                        x = 0
                    }
                    while (O === 0 && x < q) {
                        var V = N[x],
                            S = V.oSettings,
                            W = S.ignoreDashes ? g : m;
                        C(S);
                        if (S.sortFunction) {
                            O = S.sortFunction(Z, X)
                        } else {
                            if (S.order == "rand") {
                                O = Math.random() < 0.5 ? 1 : -1
                            } else {
                                var Y = h,
                                    R = !S.cases ? a(Z.s[x]) : Z.s[x],
                                    Q = !S.cases ? a(X.s[x]) : X.s[x];
                                if (!u.forceStrings) {
                                    var P = b(R) ? R && R.match(W) : h,
                                        aa = b(Q) ? Q && Q.match(W) : h;
                                    if (P && aa) {
                                        var U = R.substr(0, R.length - P[0].length),
                                            T = Q.substr(0, Q.length - aa[0].length);
                                        if (U == T) {
                                            Y = !h;
                                            R = o(P[0]);
                                            Q = o(aa[0])
                                        }
                                    }
                                }
                                O = V.iAsc * (R < Q ? -1 : (R > Q ? 1 : 0))
                            }
                        }
                        e.each(f, function (ab, ac) {
                            O = ac.call(ac, Y, R, Q, O)
                        });
                        if (O === 0) {
                            x++
                        }
                    }
                    return O
                };
            for (I = 0, F = arguments.length; I < F; I++) {
                var D = arguments[I];
                if (b(D)) {
                    if (E.push(D) - 1 > B.length) {
                        B.length = E.length - 1
                    }
                } else {
                    if (B.push(D) > E.length) {
                        E.length = B.length
                    }
                }
            }
            if (E.length > B.length) {
                B.length = E.length
            }
            q = E.length;
            if (q === 0) {
                q = E.length = 1;
                B.push({})
            }
            for (I = 0, F = q; I < F; I++) {
                var J = E[I],
                    u = e.extend({}, e.tinysort.defaults, B[I]),
                    w = !(!J || J == ""),
                    p = w && J[0] == ":";
                N.push({
                    sFind: J,
                    oSettings: u,
                    bFind: w,
                    bAttr: !(u.attr === k || u.attr == ""),
                    bData: u.data !== k,
                    bFilter: p,
                    $Filter: p ? K.filter(J) : K,
                    fnSort: u.sortFunction,
                    iAsc: u.order == "asc" ? 1 : -1
                })
            }
            K.each(function (V, O) {
                var R = e(O),
                    P = R.parent().get(0),
                    Q, U = [];
                for (j = 0; j < q; j++) {
                    var W = N[j],
                        S = W.bFind ? (W.bFilter ? W.$Filter.filter(O) : R.find(W.sFind)) : R;
                    U.push(W.bData ? S.data(W.oSettings.data) : (W.bAttr ? S.attr(W.oSettings.attr) : (W.oSettings.useVal ? S.val() : S.text())));
                    if (Q === c) {
                        Q = S
                    }
                }
                var T = n.call(L, P);
                if (T < 0) {
                    T = L.push(P) - 1;
                    r[T] = {
                        s: [],
                        n: []
                    }
                }
                if (Q.length > 0) {
                    r[T].s.push({
                        s: U,
                        e: R,
                        n: V
                    })
                } else {
                    r[T].n.push({
                        e: R,
                        n: V
                    })
                }
            });
            for (j in r) {
                r[j].s.sort(y)
            }
            for (j in r) {
                var G = r[j],
                    s = G.s.length,
                    H = [],
                    M = s,
                    A = [0, 0];
                switch (u.place) {
                    case "first":
                        e.each(G.s, function (O, P) {
                            M = l(M, P.n)
                        });
                        break;
                    case "org":
                        e.each(G.s, function (O, P) {
                            H.push(P.n)
                        });
                        break;
                    case "end":
                        M = G.n.length;
                        break;
                    default:
                        M = 0
                }
                for (I = 0; I < s; I++) {
                    var v = d(H, I) ? !h : I >= M && I < M + G.s.length,
                        z = (v ? G.s : G.n)[A[v ? 0 : 1]].e;
                    z.parent().append(z);
                    if (v || !u.returns) {
                        t.push(z.get(0))
                    }
                    A[v ? 0 : 1]++
                }
            }
            K.length = 0;
            Array.prototype.push.apply(K, t);
            return K
        }
    });

    function a(p) {
        return p && p.toLowerCase ? p.toLowerCase() : p
    }

    function d(q, s) {
        for (var r = 0, p = q.length; r < p; r++) {
            if (q[r] == s) {
                return !h
            }
        }
        return h
    }
    e.fn.TinySort = e.fn.Tinysort = e.fn.tsort = e.fn.tinysort
})(jQuery);;
/* mousetrap v1.3 craig.is/killing/mice */
(function () {
    function s(a, c, b) {
        a.addEventListener ? a.addEventListener(c, b, !1) : a.attachEvent("on" + c, b)
    }

    function y(a) {
        return "keypress" == a.type ? String.fromCharCode(a.which) : h[a.which] ? h[a.which] : z[a.which] ? z[a.which] : String.fromCharCode(a.which).toLowerCase()
    }

    function t(a, c) {
        a = a || {};
        var b = !1,
            d;
        for (d in m) a[d] && m[d] > c ? b = !0 : m[d] = 0;
        b || (p = !1)
    }

    function A(a, c, b, d, g) {
        var f, e, h = [],
            j = b.type;
        if (!l[a]) return [];
        "keyup" == j && u(a) && (c = [a]);
        for (f = 0; f < l[a].length; ++f)
            if (e = l[a][f], !(e.seq && m[e.seq] != e.level) && j == e.action &&
                ("keypress" == j && !b.metaKey && !b.ctrlKey || c.sort().join(",") === e.modifiers.sort().join(","))) d && e.combo == g && l[a].splice(f, 1), h.push(e);
        return h
    }

    function v(a, c, b) {
        if (!k.stopCallback(c, c.target || c.srcElement, b) && !1 === a(c, b)) c.preventDefault && c.preventDefault(), c.stopPropagation && c.stopPropagation(), c.returnValue = !1, c.cancelBubble = !0
    }

    function w(a) {
        "number" !== typeof a.which && (a.which = a.keyCode);
        var c = y(a);
        if (c)
            if ("keyup" == a.type && x == c) x = !1;
            else {
                var b = [];
                a.shiftKey && b.push("shift");
                a.altKey && b.push("alt");
                a.ctrlKey && b.push("ctrl");
                a.metaKey && b.push("meta");
                var b = A(c, b, a),
                    d, g = {},
                    f = 0,
                    e = !1;
                for (d = 0; d < b.length; ++d) b[d].seq ? (e = !0, f = Math.max(f, b[d].level), g[b[d].seq] = 1, v(b[d].callback, a, b[d].combo)) : !e && !p && v(b[d].callback, a, b[d].combo);
                a.type == p && !u(c) && t(g, f)
            }
    }

    function u(a) {
        return "shift" == a || "ctrl" == a || "alt" == a || "meta" == a
    }

    function B(a, c, b) {
        if (!b) {
            if (!q) {
                q = {};
                for (var d in h) 95 < d && 112 > d || h.hasOwnProperty(d) && (q[h[d]] = d)
            }
            b = q[a] ? "keydown" : "keypress"
        }
        "keypress" == b && c.length && (b = "keydown");
        return b
    }

    function C(a,
        c, b, d, g) {
        r[a + ":" + b] = c;
        a = a.replace(/\s+/g, " ");
        var f = a.split(" "),
            e, h, j = [];
        if (1 < f.length) {
            var k = a,
                n = b;
            m[k] = 0;
            n || (n = B(f[0], []));
            a = function () {
                p = n;
                ++m[k];
                clearTimeout(D);
                D = setTimeout(t, 1E3)
            };
            b = function (a) {
                v(c, a, k);
                "keyup" !== n && (x = y(a));
                setTimeout(t, 10)
            };
            for (d = 0; d < f.length; ++d) C(f[d], d < f.length - 1 ? a : b, n, k, d)
        } else {
            h = "+" === a ? ["+"] : a.split("+");
            for (f = 0; f < h.length; ++f) e = h[f], E[e] && (e = E[e]), b && ("keypress" != b && F[e]) && (e = F[e], j.push("shift")), u(e) && j.push(e);
            b = B(e, j, b);
            l[e] || (l[e] = []);
            A(e, j, {
                type: b
            }, !d, a);
            l[e][d ?
                "unshift" : "push"
            ]({
                callback: c,
                modifiers: j,
                action: b,
                seq: d,
                level: g,
                combo: a
            })
        }
    }
    for (var h = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "ins",
        46: "del",
        91: "meta",
        93: "meta",
        224: "meta"
    }, z = {
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    }, F = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        $: "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        _: "-",
        "+": "=",
        ":": ";",
        '"': "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    }, E = {
        option: "alt",
        command: "meta",
        "return": "enter",
        escape: "esc"
    }, q, l = {}, r = {}, m = {}, D, x = !1, p = !1, g = 1; 20 > g; ++g) h[111 + g] = "f" + g;
    for (g = 0; 9 >= g; ++g) h[g + 96] = g;
    s(document, "keypress", w);
    s(document, "keydown", w);
    s(document, "keyup", w);
    var k = {
        bind: function (a, c, b) {
            a = a instanceof Array ? a : [a];
            for (var d = 0; d < a.length; ++d) C(a[d], c, b);
            return this
        },
        unbind: function (a, c) {
            return k.bind(a, function () { }, c)
        },
        trigger: function (a, c) {
            if (r[a +
                ":" + c]) r[a + ":" + c]();
            return this
        },
        reset: function () {
            l = {};
            r = {};
            return this
        },
        stopCallback: function (a, c) {
            return -1 < (" " + c.className + " ").indexOf(" mousetrap ") ? !1 : "INPUT" == c.tagName || "SELECT" == c.tagName || "TEXTAREA" == c.tagName || c.contentEditable && "true" == c.contentEditable
        }
    };
    window.Mousetrap = k;
    "function" === typeof define && define.amd && define(k)
})();;
(function ($) {
    /*
     * * jRespond.js (a simple way to globally manage javascript on responsive websites)
     * * version 0.8.3
     * * (c) 2012 Jeremy Fields [jeremy.fields@viget.com]
     * * released under the MIT license
     * */
    (function (b, a, c) {
        b.jRespond = function (l) {
            var e = [];
            var g = [];
            var o = l;
            var s = "";
            var n;
            var d = 0;
            var m = 100;
            var p = 500;
            var j = p;
            var i = function () {
                var t = 0;
                if (!window.innerWidth) {
                    if (!(document.documentElement.clientWidth === 0)) {
                        t = document.documentElement.clientWidth
                    } else {
                        t = document.body.clientWidth
                    }
                } else {
                    t = window.innerWidth
                }
                return t
            };
            var h = function (v) {
                var u = v.breakpoint;
                var t = v.enter || c;
                e.push(v);
                g.push(false);
                if (k(u)) {
                    if (t !== c) {
                        t.call()
                    }
                    g[(e.length - 1)] = true
                }
            };
            var q = function () {
                var A = [];
                var z = [];
                for (var y = 0; y < e.length; y++) {
                    var v = e[y]["breakpoint"];
                    var t = e[y]["enter"] || c;
                    var x = e[y]["exit"] || c;
                    if (v === "*") {
                        if (t !== c) {
                            A.push(t)
                        }
                        if (x !== c) {
                            z.push(x)
                        }
                    } else {
                        if (k(v)) {
                            if (t !== c && !g[y]) {
                                A.push(t)
                            }
                            g[y] = true
                        } else {
                            if (x !== c && g[y]) {
                                z.push(x)
                            }
                            g[y] = false
                        }
                    }
                }
                for (var w = 0; w < z.length; w++) {
                    z[w].call()
                }
                for (var u = 0; u < A.length; u++) {
                    A[u].call()
                }
            };
            var r = function (u) {
                var v = false;
                for (var t = 0; t < o.length; t++) {
                    if (u >= o[t]["enter"] && u <= o[t]["exit"]) {
                        v = true;
                        break
                    }
                }
                if (v && s !== o[t]["label"]) {
                    s = o[t]["label"];
                    q()
                } else {
                    if (!v && s !== "") {
                        s = "";
                        q()
                    }
                }
            };
            var k = function (t) {
                if (typeof t === "object") {
                    if (t.join().indexOf(s) >= 0) {
                        return true
                    }
                } else {
                    if (t === "*") {
                        return true
                    } else {
                        if (typeof t === "string") {
                            if (s === t) {
                                return true
                            }
                        }
                    }
                }
            };
            var f = function () {
                var t = i();
                if (t !== d) {
                    j = m;
                    r(t)
                } else {
                    j = p
                }
                d = t;
                setTimeout(f, j)
            };
            f();
            return {
                addFunc: function (t) {
                    h(t)
                },
                getBreakpoint: function () {
                    return s
                }
            }
        }
    }(this, this.document));

    // call jRespond and add breakpoints
    var jRes = jRespond([{
        label: 'mobile',
        enter: 0,
        exit: 768
    }, {
        label: 'tablet',
        enter: 769,
        exit: 1000
    }, {
        label: 'desktop',
        enter: 1001,
        exit: 10000
    }]);

    $(document).ready(function () {
        $.registry = jRes
    });

    // $(window).resize(function() {
    //     console.log(document.documentElement.clientWidth);
    // });
})(jQuery);;
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.4 (Thu, 17 Jan 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
    "use strict";

    var W = $(window),
        D = $(document),
        F = $.fancybox = function () {
            F.open.apply(this, arguments);
        },
        IE = navigator.userAgent.match(/msie/i),
        didUpdate = null,
        isTouch = document.createTouch !== undefined,

        isQuery = function (obj) {
            return obj && obj.hasOwnProperty && obj instanceof $;
        },
        isString = function (str) {
            return str && $.type(str) === "string";
        },
        isPercentage = function (str) {
            return isString(str) && str.indexOf('%') > 0;
        },
        isScrollable = function (el) {
            return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
        },
        getScalar = function (orig, dim) {
            var value = parseInt(orig, 10) || 0;

            if (dim && isPercentage(orig)) {
                value = F.getViewport()[dim] / 100 * value;
            }

            return Math.ceil(value);
        },
        getValue = function (value, dim) {
            return getScalar(value, dim) + 'px';
        };

    $.extend(F, {
        // The current version of fancyBox
        version: '2.1.4',

        defaults: {
            padding: 15,
            margin: 20,

            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,

            autoSize: true,
            autoHeight: false,
            autoWidth: false,

            autoResize: true,
            autoCenter: !isTouch,
            fitToView: true,
            aspectRatio: false,
            topRatio: 0.5,
            leftRatio: 0.5,

            scrolling: 'auto', // 'auto', 'yes' or 'no'
            wrapCSS: '',

            arrows: true,
            closeBtn: true,
            closeClick: false,
            nextClick: false,
            mouseWheel: true,
            autoPlay: false,
            playSpeed: 3000,
            preload: 3,
            modal: false,
            loop: true,

            ajax: {
                dataType: 'html',
                headers: {
                    'X-fancyBox': true
                }
            },
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            swf: {
                wmode: 'transparent',
                allowfullscreen: 'true',
                allowscriptaccess: 'always'
            },

            keys: {
                next: {
                    13: 'left', // enter
                    34: 'up', // page down
                    39: 'left', // right arrow
                    40: 'up' // down arrow
                },
                prev: {
                    8: 'right', // backspace
                    33: 'down', // page up
                    37: 'right', // left arrow
                    38: 'down' // up arrow
                },
                close: [27], // escape key
                play: [32], // space - start/stop slideshow
                toggle: [70] // letter "f" - toggle fullscreen
            },

            direction: {
                next: 'left',
                prev: 'right'
            },

            scrollOutside: true,

            // Override some properties
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,

            // HTML templates
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },

            // Properties for each animation type
            // Opening fancyBox
            openEffect: 'fade', // 'elastic', 'fade' or 'none'
            openSpeed: 250,
            openEasing: 'swing',
            openOpacity: true,
            openMethod: 'zoomIn',

            // Closing fancyBox
            closeEffect: 'fade', // 'elastic', 'fade' or 'none'
            closeSpeed: 250,
            closeEasing: 'swing',
            closeOpacity: true,
            closeMethod: 'zoomOut',

            // Changing next gallery item
            nextEffect: 'elastic', // 'elastic', 'fade' or 'none'
            nextSpeed: 250,
            nextEasing: 'swing',
            nextMethod: 'changeIn',

            // Changing previous gallery item
            prevEffect: 'elastic', // 'elastic', 'fade' or 'none'
            prevSpeed: 250,
            prevEasing: 'swing',
            prevMethod: 'changeOut',

            // Enable default helpers
            helpers: {
                overlay: true,
                title: true
            },

            // Callbacks
            onCancel: $.noop, // If canceling
            beforeLoad: $.noop, // Before loading
            afterLoad: $.noop, // After loading
            beforeShow: $.noop, // Before changing in current item
            afterShow: $.noop, // After opening
            beforeChange: $.noop, // Before changing gallery item
            beforeClose: $.noop, // Before closing
            afterClose: $.noop // After closing
        },

        //Current state
        group: {}, // Selected group
        opts: {}, // Group options
        previous: null, // Previous element
        coming: null, // Element being loaded
        current: null, // Currently loaded element
        isActive: false, // Is activated
        isOpen: false, // Is currently open
        isOpened: false, // Have been fully opened at least once

        wrap: null,
        skin: null,
        outer: null,
        inner: null,

        player: {
            timer: null,
            isActive: false
        },

        // Loaders
        ajaxLoad: null,
        imgPreload: null,

        // Some collections
        transitions: {},
        helpers: {},

        /*
         *	Static methods
         */

        open: function (group, opts) {
            if (!group) {
                return;
            }

            if (!$.isPlainObject(opts)) {
                opts = {};
            }

            // Close if already active
            if (false === F.close(true)) {
                return;
            }

            // Normalize group
            if (!$.isArray(group)) {
                group = isQuery(group) ? $(group).get() : [group];
            }

            // Recheck if the type of each element is `object` and set content type (image, ajax, etc)
            $.each(group, function (i, element) {
                var obj = {},
                    href,
                    title,
                    content,
                    type,
                    rez,
                    hrefParts,
                    selector;

                if ($.type(element) === "object") {
                    // Check if is DOM element
                    if (element.nodeType) {
                        element = $(element);
                    }

                    if (isQuery(element)) {
                        obj = {
                            href: element.data('fancybox-href') || element.attr('href'),
                            title: element.data('fancybox-title') || element.attr('title'),
                            isDom: true,
                            element: element
                        };

                        if ($.metadata) {
                            $.extend(true, obj, element.metadata());
                        }

                    } else {
                        obj = element;
                    }
                }

                href = opts.href || obj.href || (isString(element) ? element : null);
                title = opts.title !== undefined ? opts.title : obj.title || '';

                content = opts.content || obj.content;
                type = content ? 'html' : (opts.type || obj.type);

                if (!type && obj.isDom) {
                    type = element.data('fancybox-type');

                    if (!type) {
                        rez = element.prop('class').match(/fancybox\.(\w+)/);
                        type = rez ? rez[1] : null;
                    }
                }

                if (isString(href)) {
                    // Try to guess the content type
                    if (!type) {
                        if (F.isImage(href)) {
                            type = 'image';

                        } else if (F.isSWF(href)) {
                            type = 'swf';

                        } else if (href.charAt(0) === '#') {
                            type = 'inline';

                        } else if (isString(element)) {
                            type = 'html';
                            content = element;
                        }
                    }

                    // Split url into two pieces with source url and content selector, e.g,
                    // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
                    if (type === 'ajax') {
                        hrefParts = href.split(/\s+/, 2);
                        href = hrefParts.shift();
                        selector = hrefParts.shift();
                    }
                }

                if (!content) {
                    if (type === 'inline') {
                        if (href) {
                            content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href); //strip for ie7

                        } else if (obj.isDom) {
                            content = element;
                        }

                    } else if (type === 'html') {
                        content = href;

                    } else if (!type && !href && obj.isDom) {
                        type = 'inline';
                        content = element;
                    }
                }

                $.extend(obj, {
                    href: href,
                    type: type,
                    content: content,
                    title: title,
                    selector: selector
                });

                group[i] = obj;
            });

            // Extend the defaults
            F.opts = $.extend(true, {}, F.defaults, opts);

            // All options are merged recursive except keys
            if (opts.keys !== undefined) {
                F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
            }

            F.group = group;

            return F._start(F.opts.index);
        },

        // Cancel image loading or abort ajax request
        cancel: function () {
            var coming = F.coming;

            if (!coming || false === F.trigger('onCancel')) {
                return;
            }

            F.hideLoading();

            if (F.ajaxLoad) {
                F.ajaxLoad.abort();
            }

            F.ajaxLoad = null;

            if (F.imgPreload) {
                F.imgPreload.onload = F.imgPreload.onerror = null;
            }

            if (coming.wrap) {
                coming.wrap.stop(true, true).trigger('onReset').remove();
            }

            F.coming = null;

            // If the first item has been canceled, then clear everything
            if (!F.current) {
                F._afterZoomOut(coming);
            }
        },

        // Start closing animation if is open; remove immediately if opening/closing
        close: function (event) {
            F.cancel();

            if (false === F.trigger('beforeClose')) {
                return;
            }

            F.unbindEvents();

            if (!F.isActive) {
                return;
            }

            if (!F.isOpen || event === true) {
                $('.fancybox-wrap').stop(true).trigger('onReset').remove();

                F._afterZoomOut();

            } else {
                F.isOpen = F.isOpened = false;
                F.isClosing = true;

                $('.fancybox-item, .fancybox-nav').remove();

                F.wrap.stop(true, true).removeClass('fancybox-opened');

                F.transitions[F.current.closeMethod]();
            }
        },

        // Manage slideshow:
        //   $.fancybox.play(); - toggle slideshow
        //   $.fancybox.play( true ); - start
        //   $.fancybox.play( false ); - stop
        play: function (action) {
            var clear = function () {
                clearTimeout(F.player.timer);
            },
                set = function () {
                    clear();

                    if (F.current && F.player.isActive) {
                        F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }
                },
                stop = function () {
                    clear();

                    D.unbind('.player');

                    F.player.isActive = false;

                    F.trigger('onPlayEnd');
                },
                start = function () {
                    if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                        F.player.isActive = true;

                        D.bind({
                            'onCancel.player beforeClose.player': stop,
                            'onUpdate.player': set,
                            'beforeLoad.player': clear
                        });

                        set();

                        F.trigger('onPlayStart');
                    }
                };

            if (action === true || (!F.player.isActive && action !== false)) {
                start();
            } else {
                stop();
            }
        },

        // Navigate to next gallery item
        next: function (direction) {
            var current = F.current;

            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.next;
                }

                F.jumpto(current.index + 1, direction, 'next');
            }
        },

        // Navigate to previous gallery item
        prev: function (direction) {
            var current = F.current;

            if (current) {
                if (!isString(direction)) {
                    direction = current.direction.prev;
                }

                F.jumpto(current.index - 1, direction, 'prev');
            }
        },

        // Navigate to gallery item by index
        jumpto: function (index, direction, router) {
            var current = F.current;

            if (!current) {
                return;
            }

            index = getScalar(index);

            F.direction = direction || current.direction[(index >= current.index ? 'next' : 'prev')];
            F.router = router || 'jumpto';

            if (current.loop) {
                if (index < 0) {
                    index = current.group.length + (index % current.group.length);
                }

                index = index % current.group.length;
            }

            if (current.group[index] !== undefined) {
                F.cancel();

                F._start(index);
            }
        },

        // Center inside viewport and toggle position type to fixed or absolute if needed
        reposition: function (e, onlyAbsolute) {
            var current = F.current,
                wrap = current ? current.wrap : null,
                pos;

            if (wrap) {
                pos = F._getPosition(onlyAbsolute);

                if (e && e.type === 'scroll') {
                    delete pos.position;

                    wrap.stop(true, true).animate(pos, 200);

                } else {
                    wrap.css(pos);

                    current.pos = $.extend({}, current.dim, pos);
                }
            }
        },

        update: function (e) {
            var type = (e && e.type),
                anyway = !type || type === 'orientationchange';

            if (anyway) {
                clearTimeout(didUpdate);

                didUpdate = null;
            }

            if (!F.isOpen || didUpdate) {
                return;
            }

            didUpdate = setTimeout(function () {
                var current = F.current;

                if (!current || F.isClosing) {
                    return;
                }

                F.wrap.removeClass('fancybox-tmp');

                if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
                    F._setDimension();
                }

                if (!(type === 'scroll' && current.canShrink)) {
                    F.reposition(e);
                }

                F.trigger('onUpdate');

                didUpdate = null;

            }, (anyway && !isTouch ? 0 : 300));
        },

        // Shrink content to fit inside viewport or restore if resized
        toggle: function (action) {
            if (F.isOpen) {
                F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

                // Help browser to restore document dimensions
                if (isTouch) {
                    F.wrap.removeAttr('style').addClass('fancybox-tmp');

                    F.trigger('onUpdate');
                }

                F.update();
            }
        },

        hideLoading: function () {
            D.unbind('.loading');

            $('#fancybox-loading').remove();
        },

        showLoading: function () {
            var el, viewport;

            F.hideLoading();

            el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

            // If user will press the escape-button, the request will be canceled
            D.bind('keydown.loading', function (e) {
                if ((e.which || e.keyCode) === 27) {
                    e.preventDefault();

                    F.cancel();
                }
            });

            if (!F.defaults.fixed) {
                viewport = F.getViewport();

                el.css({
                    position: 'absolute',
                    top: (viewport.h * 0.5) + viewport.y,
                    left: (viewport.w * 0.5) + viewport.x
                });
            }
        },

        getViewport: function () {
            var locked = (F.current && F.current.locked) || false,
                rez = {
                    x: W.scrollLeft(),
                    y: W.scrollTop()
                };

            if (locked) {
                rez.w = locked[0].clientWidth;
                rez.h = locked[0].clientHeight;

            } else {
                // See http://bugs.jquery.com/ticket/6724
                rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
                rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
            }

            return rez;
        },

        // Unbind the keyboard / clicking actions
        unbindEvents: function () {
            if (F.wrap && isQuery(F.wrap)) {
                F.wrap.unbind('.fb');
            }

            D.unbind('.fb');
            W.unbind('.fb');
        },

        bindEvents: function () {
            var current = F.current,
                keys;

            if (!current) {
                return;
            }

            // Changing document height on iOS devices triggers a 'resize' event,
            // that can change document height... repeating infinitely
            W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

            keys = current.keys;

            if (keys) {
                D.bind('keydown.fb', function (e) {
                    var code = e.which || e.keyCode,
                        target = e.target || e.srcElement;

                    // Skip esc key if loading, because showLoading will cancel preloading
                    if (code === 27 && F.coming) {
                        return false;
                    }

                    // Ignore key combinations and key events within form elements
                    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
                        $.each(keys, function (i, val) {
                            if (current.group.length > 1 && val[code] !== undefined) {
                                F[i](val[code]);

                                e.preventDefault();
                                return false;
                            }

                            if ($.inArray(code, val) > -1) {
                                F[i]();

                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                });
            }

            if ($.fn.mousewheel && current.mouseWheel) {
                F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
                    var target = e.target || null,
                        parent = $(target),
                        canScroll = false;

                    while (parent.length) {
                        if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                            break;
                        }

                        canScroll = isScrollable(parent[0]);
                        parent = $(parent).parent();
                    }

                    if (delta !== 0 && !canScroll) {
                        if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) {
                                F.prev(deltaY > 0 ? 'down' : 'left');

                            } else if (deltaY < 0 || deltaX < 0) {
                                F.next(deltaY < 0 ? 'up' : 'right');
                            }

                            e.preventDefault();
                        }
                    }
                });
            }
        },

        trigger: function (event, o) {
            var ret, obj = o || F.coming || F.current;

            if (!obj) {
                return;
            }

            if ($.isFunction(obj[event])) {
                ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
            }

            if (ret === false) {
                return false;
            }

            if (obj.helpers) {
                $.each(obj.helpers, function (helper, opts) {
                    if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
                        opts = $.extend(true, {}, F.helpers[helper].defaults, opts);

                        F.helpers[helper][event](opts, obj);
                    }
                });
            }

            D.trigger(event);
        },

        isImage: function (str) {
            return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i);
        },

        isSWF: function (str) {
            return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
        },

        _start: function (index) {
            var coming = {},
                obj,
                href,
                type,
                margin,
                padding;

            index = getScalar(index);
            obj = F.group[index] || null;

            if (!obj) {
                return false;
            }

            coming = $.extend(true, {}, F.opts, obj);

            // Convert margin and padding properties to array - top, right, bottom, left
            margin = coming.margin;
            padding = coming.padding;

            if ($.type(margin) === 'number') {
                coming.margin = [margin, margin, margin, margin];
            }

            if ($.type(padding) === 'number') {
                coming.padding = [padding, padding, padding, padding];
            }

            // 'modal' propery is just a shortcut
            if (coming.modal) {
                $.extend(true, coming, {
                    closeBtn: false,
                    closeClick: false,
                    nextClick: false,
                    arrows: false,
                    mouseWheel: false,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: false
                        }
                    }
                });
            }

            // 'autoSize' property is a shortcut, too
            if (coming.autoSize) {
                coming.autoWidth = coming.autoHeight = true;
            }

            if (coming.width === 'auto') {
                coming.autoWidth = true;
            }

            if (coming.height === 'auto') {
                coming.autoHeight = true;
            }

            /*
             * Add reference to the group, so it`s possible to access from callbacks, example:
             * afterLoad : function() {
             *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
             * }
             */

            coming.group = F.group;
            coming.index = index;

            // Give a chance for callback or helpers to update coming item (type, title, etc)
            F.coming = coming;

            if (false === F.trigger('beforeLoad')) {
                F.coming = null;

                return;
            }

            type = coming.type;
            href = coming.href;

            if (!type) {
                F.coming = null;

                //If we can not determine content type then drop silently or display next/prev item if looping through gallery
                if (F.current && F.router && F.router !== 'jumpto') {
                    F.current.index = index;

                    return F[F.router](F.direction);
                }

                return false;
            }

            F.isActive = true;

            if (type === 'image' || type === 'swf') {
                coming.autoHeight = coming.autoWidth = false;
                coming.scrolling = 'visible';
            }

            if (type === 'image') {
                coming.aspectRatio = true;
            }

            if (type === 'iframe' && isTouch) {
                coming.scrolling = 'scroll';
            }

            // Build the neccessary markup
            coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');

            $.extend(coming, {
                skin: $('.fancybox-skin', coming.wrap),
                outer: $('.fancybox-outer', coming.wrap),
                inner: $('.fancybox-inner', coming.wrap)
            });

            $.each(["Top", "Right", "Bottom", "Left"], function (i, v) {
                coming.skin.css('padding' + v, getValue(coming.padding[i]));
            });

            F.trigger('onReady');

            // Check before try to load; 'inline' and 'html' types need content, others - href
            if (type === 'inline' || type === 'html') {
                if (!coming.content || !coming.content.length) {
                    return F._error('content');
                }

            } else if (!href) {
                return F._error('href');
            }

            if (type === 'image') {
                F._loadImage();

            } else if (type === 'ajax') {
                F._loadAjax();

            } else if (type === 'iframe') {
                F._loadIframe();

            } else {
                F._afterLoad();
            }
        },

        _error: function (type) {
            $.extend(F.coming, {
                type: 'html',
                autoWidth: true,
                autoHeight: true,
                minWidth: 0,
                minHeight: 0,
                scrolling: 'no',
                hasError: type,
                content: F.coming.tpl.error
            });

            F._afterLoad();
        },

        _loadImage: function () {
            // Reset preload image so it is later possible to check "complete" property
            var img = F.imgPreload = new Image();

            img.onload = function () {
                this.onload = this.onerror = null;

                F.coming.width = this.width;
                F.coming.height = this.height;

                F._afterLoad();
            };

            img.onerror = function () {
                this.onload = this.onerror = null;

                F._error('image');
            };

            img.src = F.coming.href;

            if (img.complete !== true) {
                F.showLoading();
            }
        },

        _loadAjax: function () {
            var coming = F.coming;

            F.showLoading();

            F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
                url: coming.href,
                error: function (jqXHR, textStatus) {
                    if (F.coming && textStatus !== 'abort') {
                        F._error('ajax', jqXHR);

                    } else {
                        F.hideLoading();
                    }
                },
                success: function (data, textStatus) {
                    if (textStatus === 'success') {
                        coming.content = data;

                        F._afterLoad();
                    }
                }
            }));
        },

        _loadIframe: function () {
            var coming = F.coming,
                iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
                    .attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
                    .attr('src', coming.href);

            // This helps IE
            $(coming.wrap).bind('onReset', function () {
                try {
                    $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
                } catch (e) { }
            });

            if (coming.iframe.preload) {
                F.showLoading();

                iframe.one('load', function () {
                    $(this).data('ready', 1);

                    // iOS will lose scrolling if we resize
                    if (!isTouch) {
                        $(this).bind('load.fb', F.update);
                    }

                    // Without this trick:
                    //   - iframe won't scroll on iOS devices
                    //   - IE7 sometimes displays empty iframe
                    $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

                    F._afterLoad();
                });
            }

            coming.content = iframe.appendTo(coming.inner);

            if (!coming.iframe.preload) {
                F._afterLoad();
            }
        },

        _preloadImages: function () {
            var group = F.group,
                current = F.current,
                len = group.length,
                cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
                item,
                i;

            for (i = 1; i <= cnt; i += 1) {
                item = group[(current.index + i) % len];

                if (item.type === 'image' && item.href) {
                    new Image().src = item.href;
                }
            }
        },

        _afterLoad: function () {
            var coming = F.coming,
                previous = F.current,
                placeholder = 'fancybox-placeholder',
                current,
                content,
                type,
                scrolling,
                href,
                embed;

            F.hideLoading();

            if (!coming || F.isActive === false) {
                return;
            }

            if (false === F.trigger('afterLoad', coming, previous)) {
                coming.wrap.stop(true).trigger('onReset').remove();

                F.coming = null;

                return;
            }

            if (previous) {
                F.trigger('beforeChange', previous);

                previous.wrap.stop(true).removeClass('fancybox-opened')
                    .find('.fancybox-item, .fancybox-nav')
                    .remove();
            }

            F.unbindEvents();

            current = coming;
            content = coming.content;
            type = coming.type;
            scrolling = coming.scrolling;

            $.extend(F, {
                wrap: current.wrap,
                skin: current.skin,
                outer: current.outer,
                inner: current.inner,
                current: current,
                previous: previous
            });

            href = current.href;

            switch (type) {
                case 'inline':
                case 'ajax':
                case 'html':
                    if (current.selector) {
                        content = $('<div>').html(content).find(current.selector);

                    } else if (isQuery(content)) {
                        if (!content.data(placeholder)) {
                            content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
                        }

                        content = content.show().detach();

                        current.wrap.bind('onReset', function () {
                            if ($(this).find(content).length) {
                                content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                            }
                        });
                    }
                    break;

                case 'image':
                    content = current.tpl.image.replace('{href}', href);
                    break;

                case 'swf':
                    content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                    embed = '';

                    $.each(current.swf, function (name, val) {
                        content += '<param name="' + name + '" value="' + val + '"></param>';
                        embed += ' ' + name + '="' + val + '"';
                    });

                    content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
                    break;
            }

            if (!(isQuery(content) && content.parent().is(current.inner))) {
                current.inner.append(content);
            }

            // Give a chance for helpers or callbacks to update elements
            F.trigger('beforeShow');

            // Set scrolling before calculating dimensions
            current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

            // Set initial dimensions and start position
            F._setDimension();

            F.reposition();

            F.isOpen = false;
            F.coming = null;

            F.bindEvents();

            if (!F.isOpened) {
                $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();

            } else if (previous.prevMethod) {
                F.transitions[previous.prevMethod]();
            }

            F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();

            F._preloadImages();
        },

        _setDimension: function () {
            var viewport = F.getViewport(),
                steps = 0,
                canShrink = false,
                canExpand = false,
                wrap = F.wrap,
                skin = F.skin,
                inner = F.inner,
                current = F.current,
                width = current.width,
                height = current.height,
                minWidth = current.minWidth,
                minHeight = current.minHeight,
                maxWidth = current.maxWidth,
                maxHeight = current.maxHeight,
                scrolling = current.scrolling,
                scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
                margin = current.margin,
                wMargin = getScalar(margin[1] + margin[3]),
                hMargin = getScalar(margin[0] + margin[2]),
                wPadding,
                hPadding,
                wSpace,
                hSpace,
                origWidth,
                origHeight,
                origMaxWidth,
                origMaxHeight,
                ratio,
                width_,
                height_,
                maxWidth_,
                maxHeight_,
                iframe,
                body;

            // Reset dimensions so we could re-check actual size
            wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

            wPadding = getScalar(skin.outerWidth(true) - skin.width());
            hPadding = getScalar(skin.outerHeight(true) - skin.height());

            // Any space between content and viewport (margin, padding, border, title)
            wSpace = wMargin + wPadding;
            hSpace = hMargin + hPadding;

            origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
            origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

            if (current.type === 'iframe') {
                iframe = current.content;

                if (current.autoHeight && iframe.data('ready') === 1) {
                    try {
                        if (iframe[0].contentWindow.document.location) {
                            inner.width(origWidth).height(9999);

                            body = iframe.contents().find('body');

                            if (scrollOut) {
                                body.css('overflow-x', 'hidden');
                            }

                            origHeight = body.height();
                        }

                    } catch (e) { }
                }

            } else if (current.autoWidth || current.autoHeight) {
                inner.addClass('fancybox-tmp');

                // Set width or height in case we need to calculate only one dimension
                if (!current.autoWidth) {
                    inner.width(origWidth);
                }

                if (!current.autoHeight) {
                    inner.height(origHeight);
                }

                if (current.autoWidth) {
                    origWidth = inner.width();
                }

                if (current.autoHeight) {
                    origHeight = inner.height();
                }

                inner.removeClass('fancybox-tmp');
            }

            width = getScalar(origWidth);
            height = getScalar(origHeight);

            ratio = origWidth / origHeight;

            // Calculations for the content
            minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
            maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

            minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
            maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

            // These will be used to determine if wrap can fit in the viewport
            origMaxWidth = maxWidth;
            origMaxHeight = maxHeight;

            if (current.fitToView) {
                maxWidth = Math.min(viewport.w - wSpace, maxWidth);
                maxHeight = Math.min(viewport.h - hSpace, maxHeight);
            }

            maxWidth_ = viewport.w - wMargin;
            maxHeight_ = viewport.h - hMargin;

            if (current.aspectRatio) {
                if (width > maxWidth) {
                    width = maxWidth;
                    height = getScalar(width / ratio);
                }

                if (height > maxHeight) {
                    height = maxHeight;
                    width = getScalar(height * ratio);
                }

                if (width < minWidth) {
                    width = minWidth;
                    height = getScalar(width / ratio);
                }

                if (height < minHeight) {
                    height = minHeight;
                    width = getScalar(height * ratio);
                }

            } else {
                width = Math.max(minWidth, Math.min(width, maxWidth));

                if (current.autoHeight && current.type !== 'iframe') {
                    inner.width(width);

                    height = inner.height();
                }

                height = Math.max(minHeight, Math.min(height, maxHeight));
            }

            // Try to fit inside viewport (including the title)
            if (current.fitToView) {
                inner.width(width).height(height);

                wrap.width(width + wPadding);

                // Real wrap dimensions
                width_ = wrap.width();
                height_ = wrap.height();

                if (current.aspectRatio) {
                    while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                        if (steps++ > 19) {
                            break;
                        }

                        height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                        width = getScalar(height * ratio);

                        if (width < minWidth) {
                            width = minWidth;
                            height = getScalar(width / ratio);
                        }

                        if (width > maxWidth) {
                            width = maxWidth;
                            height = getScalar(width / ratio);
                        }

                        inner.width(width).height(height);

                        wrap.width(width + wPadding);

                        width_ = wrap.width();
                        height_ = wrap.height();
                    }

                } else {
                    width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                    height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                }
            }

            if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
                width += scrollOut;
            }

            inner.width(width).height(height);

            wrap.width(width + wPadding);

            width_ = wrap.width();
            height_ = wrap.height();

            canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
            canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

            $.extend(current, {
                dim: {
                    width: getValue(width_),
                    height: getValue(height_)
                },
                origWidth: origWidth,
                origHeight: origHeight,
                canShrink: canShrink,
                canExpand: canExpand,
                wPadding: wPadding,
                hPadding: hPadding,
                wrapSpace: height_ - skin.outerHeight(true),
                skinSpace: skin.height() - height
            });

            if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
                inner.height('auto');
            }
        },

        _getPosition: function (onlyAbsolute) {
            var current = F.current,
                viewport = F.getViewport(),
                margin = current.margin,
                width = F.wrap.width() + margin[1] + margin[3],
                height = F.wrap.height() + margin[0] + margin[2],
                rez = {
                    position: 'absolute',
                    top: margin[0],
                    left: margin[3]
                };

            if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
                rez.position = 'fixed';

            } else if (!current.locked) {
                rez.top += viewport.y;
                rez.left += viewport.x;
            }

            rez.top = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
            rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * current.leftRatio)));

            return rez;
        },

        _afterZoomIn: function () {
            var current = F.current;

            if (!current) {
                return;
            }

            F.isOpen = F.isOpened = true;

            F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

            F.update();

            // Assign a click event
            if (current.closeClick || (current.nextClick && F.group.length > 1)) {
                F.inner.css('cursor', 'pointer').bind('click.fb', function (e) {
                    if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
                        e.preventDefault();

                        F[current.closeClick ? 'close' : 'next']();
                    }
                });
            }

            // Create a close button
            if (current.closeBtn) {
                $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function (e) {
                    e.preventDefault();

                    F.close();
                });
            }

            // Create navigation arrows
            if (current.arrows && F.group.length > 1) {
                if (current.loop || current.index > 0) {
                    $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
                }

                if (current.loop || current.index < F.group.length - 1) {
                    $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
                }
            }

            F.trigger('afterShow');

            // Stop the slideshow if this is the last item
            if (!current.loop && current.index === current.group.length - 1) {
                F.play(false);

            } else if (F.opts.autoPlay && !F.player.isActive) {
                F.opts.autoPlay = false;

                F.play();
            }
        },

        _afterZoomOut: function (obj) {
            obj = obj || F.current;

            $('.fancybox-wrap').trigger('onReset').remove();

            $.extend(F, {
                group: {},
                opts: {},
                router: false,
                current: null,
                isActive: false,
                isOpened: false,
                isOpen: false,
                isClosing: false,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });

            F.trigger('afterClose', obj);
        }
    });

    /*
     *	Default transitions
     */

    F.transitions = {
        getOrigPosition: function () {
            var current = F.current,
                element = current.element,
                orig = current.orig,
                pos = {},
                width = 50,
                height = 50,
                hPadding = current.hPadding,
                wPadding = current.wPadding,
                viewport = F.getViewport();

            if (!orig && current.isDom && element.is(':visible')) {
                orig = element.find('img:first');

                if (!orig.length) {
                    orig = element;
                }
            }

            if (isQuery(orig)) {
                pos = orig.offset();

                if (orig.is('img')) {
                    width = orig.outerWidth();
                    height = orig.outerHeight();
                }

            } else {
                pos.top = viewport.y + (viewport.h - height) * current.topRatio;
                pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
            }

            if (F.wrap.css('position') === 'fixed' || current.locked) {
                pos.top -= viewport.y;
                pos.left -= viewport.x;
            }

            pos = {
                top: getValue(pos.top - hPadding * current.topRatio),
                left: getValue(pos.left - wPadding * current.leftRatio),
                width: getValue(width + wPadding),
                height: getValue(height + hPadding)
            };

            return pos;
        },

        step: function (now, fx) {
            var ratio,
                padding,
                value,
                prop = fx.prop,
                current = F.current,
                wrapSpace = current.wrapSpace,
                skinSpace = current.skinSpace;

            if (prop === 'width' || prop === 'height') {
                ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

                if (F.isClosing) {
                    ratio = 1 - ratio;
                }

                padding = prop === 'width' ? current.wPadding : current.hPadding;
                value = now - padding;

                F.skin[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio)));
                F.inner[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio) - (skinSpace * ratio)));
            }
        },

        zoomIn: function () {
            var current = F.current,
                startPos = current.pos,
                effect = current.openEffect,
                elastic = effect === 'elastic',
                endPos = $.extend({
                    opacity: 1
                }, startPos);

            // Remove "position" property that breaks older IE
            delete endPos.position;

            if (elastic) {
                startPos = this.getOrigPosition();

                if (current.openOpacity) {
                    startPos.opacity = 0.1;
                }

            } else if (effect === 'fade') {
                startPos.opacity = 0.1;
            }

            F.wrap.css(startPos).animate(endPos, {
                duration: effect === 'none' ? 0 : current.openSpeed,
                easing: current.openEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomIn
            });
        },

        zoomOut: function () {
            var current = F.current,
                effect = current.closeEffect,
                elastic = effect === 'elastic',
                endPos = {
                    opacity: 0.1
                };

            if (elastic) {
                endPos = this.getOrigPosition();

                if (current.closeOpacity) {
                    endPos.opacity = 0.1;
                }
            }

            F.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : current.closeSpeed,
                easing: current.closeEasing,
                step: elastic ? this.step : null,
                complete: F._afterZoomOut
            });
        },

        changeIn: function () {
            var current = F.current,
                effect = current.nextEffect,
                startPos = current.pos,
                endPos = {
                    opacity: 1
                },
                direction = F.direction,
                distance = 200,
                field;

            startPos.opacity = 0.1;

            if (effect === 'elastic') {
                field = direction === 'down' || direction === 'up' ? 'top' : 'left';

                if (direction === 'down' || direction === 'right') {
                    startPos[field] = getValue(getScalar(startPos[field]) - distance);
                    endPos[field] = '+=' + distance + 'px';

                } else {
                    startPos[field] = getValue(getScalar(startPos[field]) + distance);
                    endPos[field] = '-=' + distance + 'px';
                }
            }

            // Workaround for http://bugs.jquery.com/ticket/12273
            if (effect === 'none') {
                F._afterZoomIn();

            } else {
                F.wrap.css(startPos).animate(endPos, {
                    duration: current.nextSpeed,
                    easing: current.nextEasing,
                    complete: F._afterZoomIn
                });
            }
        },

        changeOut: function () {
            var previous = F.previous,
                effect = previous.prevEffect,
                endPos = {
                    opacity: 0.1
                },
                direction = F.direction,
                distance = 200;

            if (effect === 'elastic') {
                endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
            }

            previous.wrap.animate(endPos, {
                duration: effect === 'none' ? 0 : previous.prevSpeed,
                easing: previous.prevEasing,
                complete: function () {
                    $(this).trigger('onReset').remove();
                }
            });
        }
    };

    /*
     *	Overlay helper
     */

    F.helpers.overlay = {
        defaults: {
            closeClick: true, // if true, fancyBox will be closed when user clicks on the overlay
            speedOut: 200, // duration of fadeOut animation
            showEarly: true, // indicates if should be opened immediately or wait until the content is ready
            css: {}, // custom CSS properties
            locked: !isTouch, // if true, the content will be locked into overlay
            fixed: true // if false, the overlay CSS position property will not be set to "fixed"
        },

        overlay: null, // current handle
        fixed: false, // indicates if the overlay has position "fixed"

        // Public methods
        create: function (opts) {
            opts = $.extend({}, this.defaults, opts);

            if (this.overlay) {
                this.close();
            }

            this.overlay = $('<div class="fancybox-overlay"></div>').appendTo('body');
            this.fixed = false;

            if (opts.fixed && F.defaults.fixed) {
                this.overlay.addClass('fancybox-overlay-fixed');

                this.fixed = true;
            }
        },

        open: function (opts) {
            var that = this;

            opts = $.extend({}, this.defaults, opts);

            if (this.overlay) {
                this.overlay.unbind('.overlay').width('auto').height('auto');

            } else {
                this.create(opts);
            }

            if (!this.fixed) {
                W.bind('resize.overlay', $.proxy(this.update, this));

                this.update();
            }

            if (opts.closeClick) {
                this.overlay.bind('click.overlay', function (e) {
                    if ($(e.target).hasClass('fancybox-overlay')) {
                        if (F.isActive) {
                            F.close();
                        } else {
                            that.close();
                        }
                    }
                });
            }

            this.overlay.css(opts.css).show();
        },

        close: function () {
            $('.fancybox-overlay').remove();

            W.unbind('resize.overlay');

            this.overlay = null;

            if (this.margin !== false) {
                $('body').css('margin-right', this.margin);

                this.margin = false;
            }

            if (this.el) {
                this.el.removeClass('fancybox-lock');
            }
        },

        // Private, callbacks

        update: function () {
            var width = '100%',
                offsetWidth;

            // Reset width/height so it will not mess
            this.overlay.width(width).height('100%');

            // jQuery does not return reliable result for IE
            if (IE) {
                offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

                if (D.width() > offsetWidth) {
                    width = D.width();
                }

            } else if (D.width() > W.width()) {
                width = D.width();
            }

            this.overlay.width(width).height(D.height());
        },

        // This is where we can manipulate DOM, because later it would cause iframes to reload
        onReady: function (opts, obj) {
            $('.fancybox-overlay').stop(true, true);

            if (!this.overlay) {
                this.margin = D.height() > W.height() || $('body').css('overflow-y') === 'scroll' ? $('body').css('margin-right') : false;
                this.el = document.all && !document.querySelector ? $('html') : $('body');

                this.create(opts);
            }

            if (opts.locked && this.fixed) {
                obj.locked = this.overlay.append(obj.wrap);
                obj.fixed = false;
            }

            if (opts.showEarly === true) {
                this.beforeShow.apply(this, arguments);
            }
        },

        beforeShow: function (opts, obj) {
            if (obj.locked) {
                this.el.addClass('fancybox-lock');

                if (this.margin !== false) {
                    $('body').css('margin-right', getScalar(this.margin) + obj.scrollbarWidth);
                }
            }

            this.open(opts);
        },

        onUpdate: function () {
            if (!this.fixed) {
                this.update();
            }
        },

        afterClose: function (opts) {
            // Remove overlay if exists and fancyBox is not opening
            // (e.g., it is not being open using afterClose callback)
            if (this.overlay && !F.isActive) {
                this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
            }
        }
    };

    /*
     *	Title helper
     */

    F.helpers.title = {
        defaults: {
            type: 'float', // 'float', 'inside', 'outside' or 'over',
            position: 'bottom' // 'top' or 'bottom'
        },

        beforeShow: function (opts) {
            var current = F.current,
                text = current.title,
                type = opts.type,
                title,
                target;

            if ($.isFunction(text)) {
                text = text.call(current.element, current);
            }

            if (!isString(text) || $.trim(text) === '') {
                return;
            }

            title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

            switch (type) {
                case 'inside':
                    target = F.skin;
                    break;

                case 'outside':
                    target = F.wrap;
                    break;

                case 'over':
                    target = F.inner;
                    break;

                default: // 'float'
                    target = F.skin;

                    title.appendTo('body');

                    if (IE) {
                        title.width(title.width());
                    }

                    title.wrapInner('<span class="child"></span>');

                    //Increase bottom margin so this title will also fit into viewport
                    F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
                    break;
            }

            title[(opts.position === 'top' ? 'prependTo' : 'appendTo')](target);
        }
    };

    // jQuery plugin initialization
    $.fn.fancybox = function (options) {
        var index,
            that = $(this),
            selector = this.selector || '',
            run = function (e) {
                var what = $(this).blur(),
                    idx = index,
                    relType, relVal;

                if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
                    relType = options.groupAttr || 'data-fancybox-group';
                    relVal = what.attr(relType);

                    if (!relVal) {
                        relType = 'rel';
                        relVal = what.get(0)[relType];
                    }

                    if (relVal && relVal !== '' && relVal !== 'nofollow') {
                        what = selector.length ? $(selector) : that;
                        what = what.filter('[' + relType + '="' + relVal + '"]');
                        idx = what.index(this);
                    }

                    options.index = idx;

                    // Stop an event from bubbling if everything is fine
                    if (F.open(what, options) !== false) {
                        e.preventDefault();
                    }
                }
            };

        options = options || {};
        index = options.index || 0;

        if (!selector || options.live === false) {
            that.unbind('click.fb-start').bind('click.fb-start', run);

        } else {
            D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
        }

        this.filter('[data-fancybox-start=1]').trigger('click');

        return this;
    };

    // Tests that need a body at doc ready
    D.ready(function () {
        if ($.scrollbarWidth === undefined) {
            // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
            $.scrollbarWidth = function () {
                var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
                    child = parent.children(),
                    width = child.innerWidth() - child.height(99).innerWidth();

                parent.remove();

                return width;
            };
        }

        if ($.support.fixedPosition === undefined) {
            $.support.fixedPosition = (function () {
                var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
                    fixed = (elem[0].offsetTop === 20 || elem[0].offsetTop === 15);

                elem.remove();

                return fixed;
            }());
        }

        $.extend(F.defaults, {
            scrollbarWidth: $.scrollbarWidth(),
            fixed: $.support.fixedPosition,
            parent: $('body')
        });
    });

}(window, document, jQuery));;
/*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
(function ($) {
    //Shortcut for fancyBox object
    var F = $.fancybox;

    //Add helper object
    F.helpers.buttons = {
        defaults: {
            skipSingle: false, // disables if gallery contains single image
            position: 'top', // 'top' or 'bottom'
            tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:jQuery.fancybox.close();"></a></li></ul></div>'
        },

        list: null,
        buttons: null,

        beforeLoad: function (opts, obj) {
            //Remove self if gallery do not have at least two items

            if (opts.skipSingle && obj.group.length < 2) {
                obj.helpers.buttons = false;
                obj.closeBtn = true;

                return;
            }

            //Increase top margin to give space for buttons
            obj.margin[opts.position === 'bottom' ? 2 : 0] += 30;
        },

        onPlayStart: function () {
            if (this.buttons) {
                this.buttons.play.attr('title', 'Pause slideshow').addClass('btnPlayOn');
            }
        },

        onPlayEnd: function () {
            if (this.buttons) {
                this.buttons.play.attr('title', 'Start slideshow').removeClass('btnPlayOn');
            }
        },

        afterShow: function (opts, obj) {
            var buttons = this.buttons;

            if (!buttons) {
                this.list = $(opts.tpl).addClass(opts.position).appendTo('body');

                buttons = {
                    prev: this.list.find('.btnPrev').click(F.prev),
                    next: this.list.find('.btnNext').click(F.next),
                    play: this.list.find('.btnPlay').click(F.play),
                    toggle: this.list.find('.btnToggle').click(F.toggle)
                }
            }

            //Prev
            if (obj.index > 0 || obj.loop) {
                buttons.prev.removeClass('btnDisabled');
            } else {
                buttons.prev.addClass('btnDisabled');
            }

            //Next / Play
            if (obj.loop || obj.index < obj.group.length - 1) {
                buttons.next.removeClass('btnDisabled');
                buttons.play.removeClass('btnDisabled');

            } else {
                buttons.next.addClass('btnDisabled');
                buttons.play.addClass('btnDisabled');
            }

            this.buttons = buttons;

            this.onUpdate(opts, obj);
        },

        onUpdate: function (opts, obj) {
            var toggle;

            if (!this.buttons) {
                return;
            }

            toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

            //Size toggle button
            if (obj.canShrink) {
                toggle.addClass('btnToggleOn');

            } else if (!obj.canExpand) {
                toggle.addClass('btnDisabled');
            }
        },

        beforeClose: function () {
            if (this.list) {
                this.list.remove();
            }

            this.list = null;
            this.buttons = null;
        }
    };

}(jQuery));;
/*!
 * Media helper for fancyBox
 * version: 1.0.5 (Tue, 23 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *	       helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
    "use strict";

    //Shortcut for fancyBox object
    var F = $.fancybox,
        format = function (url, rez, params) {
            params = params || '';

            if ($.type(params) === "object") {
                params = $.param(params, true);
            }

            $.each(rez, function (key, value) {
                url = url.replace('$' + key, value || '');
            });

            if (params.length) {
                url += (url.indexOf('?') > 0 ? '&' : '?') + params;
            }

            return url;
        };

    //Add helper object
    F.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: 'opaque',
                    enablejsapi: 1
                },
                type: 'iframe',
                url: '//www.youtube.com/embed/$3'
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: 'iframe',
                url: '//player.vimeo.com/video/$1'
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: 'yes'
                },
                type: 'swf',
                url: function (rez, params, obj) {
                    obj.swf.flashVars = 'playerVars=' + $.param(params, true);

                    return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: 'swf',
                url: '//www.dailymotion.com/swf/video/$1'
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: 'iframe',
                url: '//www.twitvid.com/embed.php?guid=$1'
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: 'image',
                url: '//twitpic.com/show/full/$1/'
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: 'image',
                url: '//$1/p/$2/media/'
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: 'iframe',
                url: function (rez) {
                    return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
                }
            }
        },

        beforeLoad: function (opts, obj) {
            var url = obj.href || '',
                type = false,
                what,
                item,
                rez,
                params;

            for (what in opts) {
                item = opts[what];
                rez = url.match(item.matcher);

                if (rez) {
                    type = item.type;
                    params = $.extend(true, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null));

                    url = $.type(item.url) === "function" ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);

                    break;
                }
            }

            if (type) {
                obj.href = url;
                obj.type = type;

                obj.autoHeight = false;
            }
        }
    };

}(jQuery));;
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;
(function ($) {
    var h = $.scrollTo = function (a, b, c) {
        $(window).scrollTo(a, b, c)
    };
    h.defaults = {
        axis: 'xy',
        duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
        limit: true
    };
    h.window = function (a) {
        return $(window)._scrollable()
    };
    $.fn._scrollable = function () {
        return this.map(function () {
            var a = this,
                isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!isWin) return a;
            var b = (a.contentWindow || a).document || a.ownerDocument || a;
            return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
        })
    };
    $.fn.scrollTo = function (e, f, g) {
        if (typeof f == 'object') {
            g = f;
            f = 0
        }
        if (typeof g == 'function') g = {
            onAfter: g
        };
        if (e == 'max') e = 9e9;
        g = $.extend({}, h.defaults, g);
        f = f || g.duration;
        g.queue = g.queue && g.axis.length > 1;
        if (g.queue) f /= 2;
        g.offset = both(g.offset);
        g.over = both(g.over);
        return this._scrollable().each(function () {
            if (e == null) return;
            var d = this,
                $elem = $(d),
                targ = e,
                toff, attr = {},
                win = $elem.is('html,body');
            switch (typeof targ) {
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        break
                    }
                    targ = $(targ, this);
                    if (!targ.length) return;
                case 'object':
                    if (targ.is || targ.style) toff = (targ = $(targ)).offset()
            }
            $.each(g.axis.split(''), function (i, a) {
                var b = a == 'x' ? 'Left' : 'Top',
                    pos = b.toLowerCase(),
                    key = 'scroll' + b,
                    old = d[key],
                    max = h.max(d, a);
                if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
                    if (g.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;
                        attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
                    }
                    attr[key] += g.offset[pos] || 0;
                    if (g.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * g.over[pos]
                } else {
                    var c = targ[pos];
                    attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c
                }
                if (g.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
                if (!i && g.queue) {
                    if (old != attr[key]) animate(g.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(g.onAfter);

            function animate(a) {
                $elem.animate(attr, f, g.easing, a && function () {
                    a.call(this, e, g)
                })
            }
        }).end()
    };
    h.max = function (a, b) {
        var c = b == 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + c;
        if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()]();
        var d = 'client' + c,
            html = a.ownerDocument.documentElement,
            body = a.ownerDocument.body;
        return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
    };

    function both(a) {
        return typeof a == 'object' ? a : {
            top: a,
            left: a
        }
    }
})(jQuery);;
(function ($) {
    /**
     * jQuery Masonry v2.1.08
     * A dynamic layout plugin for jQuery
     * The flip-side of CSS Floats
     * http://masonry.desandro.com
     *
     * Licensed under the MIT license.
     * Copyright 2012 David DeSandro
     */
    (function (e, t, n) {
        "use strict";
        var r = t.event,
            i;
        r.special.smartresize = {
            setup: function () {
                t(this).bind("resize", r.special.smartresize.handler)
            },
            teardown: function () {
                t(this).unbind("resize", r.special.smartresize.handler)
            },
            handler: function (e, t) {
                var n = this,
                    s = arguments;
                e.type = "smartresize", i && clearTimeout(i), i = setTimeout(function () {
                    r.dispatch.apply(n, s)
                }, t === "execAsap" ? 0 : 100)
            }
        }, t.fn.smartresize = function (e) {
            return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"])
        }, t.Mason = function (e, n) {
            this.element = t(n), this._create(e), this._init()
        }, t.Mason.settings = {
            isResizable: !0,
            isAnimated: !1,
            animationOptions: {
                queue: !1,
                duration: 500
            },
            gutterWidth: 0,
            isRTL: !1,
            isFitWidth: !1,
            containerStyle: {
                position: "relative"
            }
        }, t.Mason.prototype = {
            _filterFindBricks: function (e) {
                var t = this.options.itemSelector;
                return t ? e.filter(t).add(e.find(t)) : e
            },
            _getBricks: function (e) {
                var t = this._filterFindBricks(e).css({
                    position: "absolute"
                }).addClass("masonry-brick");
                return t
            },
            _create: function (n) {
                this.options = t.extend(!0, {}, t.Mason.settings, n), this.styleQueue = [];
                var r = this.element[0].style;
                this.originalStyle = {
                    height: r.height || ""
                };
                var i = this.options.containerStyle;
                for (var s in i) this.originalStyle[s] = r[s] || "";
                this.element.css(i), this.horizontalDirection = this.options.isRTL ? "right" : "left";
                var o = this.element.css("padding-" + this.horizontalDirection),
                    u = this.element.css("padding-top");
                this.offset = {
                    x: o ? parseInt(o, 10) : 0,
                    y: u ? parseInt(u, 10) : 0
                }, this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function";
                var a = this;
                setTimeout(function () {
                    a.element.addClass("masonry")
                }, 0), this.options.isResizable && t(e).bind("smartresize.masonry", function () {
                    a.resize()
                }), this.reloadItems()
            },
            _init: function (e) {
                this._getColumns(), this._reLayout(e)
            },
            option: function (e, n) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            },
            layout: function (e, t) {
                for (var n = 0, r = e.length; n < r; n++) this._placeBrick(e[n]);
                var i = {};
                i.height = Math.max.apply(Math, this.colYs);
                if (this.options.isFitWidth) {
                    var s = 0;
                    n = this.cols;
                    while (--n) {
                        if (this.colYs[n] !== 0) break;
                        s++
                    }
                    i.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth
                }
                this.styleQueue.push({
                    $el: this.element,
                    style: i
                });
                var o = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css",
                    u = this.options.animationOptions,
                    a;
                for (n = 0, r = this.styleQueue.length; n < r; n++) a = this.styleQueue[n], a.$el[o](a.style, u);
                this.styleQueue = [], t && t.call(e), this.isLaidOut = !0
            },
            _getColumns: function () {
                var e = this.options.isFitWidth ? this.element.parent() : this.element,
                    t = e.width();
                this.columnWidth = this.isFluid ? this.options.columnWidth(t) : this.options.columnWidth || this.$bricks.outerWidth(!0) || t, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((t + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1)
            },
            _placeBrick: function (e) {
                var n = t(e),
                    r, i, s, o, u;
                r = Math.ceil(n.outerWidth(!0) / this.columnWidth), r = Math.min(r, this.cols);
                if (r === 1) s = this.colYs;
                else {
                    i = this.cols + 1 - r, s = [];
                    for (u = 0; u < i; u++) o = this.colYs.slice(u, u + r), s[u] = Math.max.apply(Math, o)
                }
                var a = Math.min.apply(Math, s),
                    f = 0;
                for (var l = 0, c = s.length; l < c; l++)
                    if (s[l] === a) {
                        f = l;
                        break
                    }
                var h = {
                    top: a + this.offset.y
                };
                h[this.horizontalDirection] = this.columnWidth * f + this.offset.x, this.styleQueue.push({
                    $el: n,
                    style: h
                });
                var p = a + n.outerHeight(!0),
                    d = this.cols + 1 - c;
                for (l = 0; l < d; l++) this.colYs[f + l] = p
            },
            resize: function () {
                var e = this.cols;
                this._getColumns(), (this.isFluid || this.cols !== e) && this._reLayout()
            },
            _reLayout: function (e) {
                var t = this.cols;
                this.colYs = [];
                while (t--) this.colYs.push(0);
                this.layout(this.$bricks, e)
            },
            reloadItems: function () {
                this.$bricks = this._getBricks(this.element.children())
            },
            reload: function (e) {
                this.reloadItems(), this._init(e)
            },
            appended: function (e, t, n) {
                if (t) {
                    this._filterFindBricks(e).css({
                        top: this.element.height()
                    });
                    var r = this;
                    setTimeout(function () {
                        r._appended(e, n)
                    }, 1)
                } else this._appended(e, n)
            },
            _appended: function (e, t) {
                var n = this._getBricks(e);
                this.$bricks = this.$bricks.add(n), this.layout(n, t)
            },
            remove: function (e) {
                this.$bricks = this.$bricks.not(e), e.remove()
            },
            destroy: function () {
                this.$bricks.removeClass("masonry-brick").each(function () {
                    this.style.position = "", this.style.top = "", this.style.left = ""
                });
                var n = this.element[0].style;
                for (var r in this.originalStyle) n[r] = this.originalStyle[r];
                this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), t(e).unbind(".masonry")
            }
        }, t.fn.imagesLoaded = function (e) {
            function u() {
                e.call(n, r)
            }

            function a(e) {
                var n = e.target;
                n.src !== s && t.inArray(n, o) === -1 && (o.push(n), --i <= 0 && (setTimeout(u), r.unbind(".imagesLoaded", a)))
            }
            var n = this,
                r = n.find("img").add(n.filter("img")),
                i = r.length,
                s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
                o = [];
            return i || u(), r.bind("load.imagesLoaded error.imagesLoaded", a).each(function () {
                var e = this.src;
                this.src = s, this.src = e
            }), n
        };
        var s = function (t) {
            e.console && e.console.error(t)
        };
        t.fn.masonry = function (e) {
            if (typeof e == "string") {
                var n = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var r = t.data(this, "masonry");
                    if (!r) {
                        s("cannot call methods on masonry prior to initialization; attempted to call method '" + e + "'");
                        return
                    }
                    if (!t.isFunction(r[e]) || e.charAt(0) === "_") {
                        s("no such method '" + e + "' for masonry instance");
                        return
                    }
                    r[e].apply(r, n)
                })
            } else this.each(function () {
                var n = t.data(this, "masonry");
                n ? (n.option(e || {}), n._init()) : t.data(this, "masonry", new t.Mason(e, this))
            });
            return this
        }
    })(window, jQuery);

    // Masonry corner stamp modifications
    $.Mason.prototype.resize = function () {
        this._getColumns();
        this._reLayout();
    };

    $.Mason.prototype._reLayout = function (callback) {
        var freeCols = this.cols;
        if (this.options.cornerStampSelector && typeof $cornerStamp != 'undefined') {
            var $cornerStamp = this.element.find(this.options.cornerStampSelector),
                cornerStampX = $cornerStamp.offset().left -
                    (this.element.offset().left + this.offset.x + parseInt($cornerStamp.css('marginLeft')));
            freeCols = Math.floor(cornerStampX / this.columnWidth);
        }
        // reset columns
        var i = this.cols;
        this.colYs = [];
        while (i--) {
            this.colYs.push(this.offset.y);
        }

        for (i = freeCols; i < this.cols; i++) {
            this.colYs[i] = this.offset.y + $cornerStamp.outerHeight(true);
        }

        // apply layout logic to all bricks
        this.layout(this.$bricks, callback);
    };

    $(function () {

        $('#container').masonry({
            itemSelector: '.box',
            columnWidth: 100,
            cornerStampSelector: '.corner-stamp'
        });

    });
})(jQuery);;
(function (c, q) {
    var m = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    c.fn.imagesLoaded = function (f) {
        function n() {
            var b = c(j),
                a = c(h);
            d && (h.length ? d.reject(e, b, a) : d.resolve(e));
            c.isFunction(f) && f.call(g, e, b, a)
        }

        function p(b) {
            k(b.target, "error" === b.type)
        }

        function k(b, a) {
            b.src === m || -1 !== c.inArray(b, l) || (l.push(b), a ? h.push(b) : j.push(b), c.data(b, "imagesLoaded", {
                isBroken: a,
                src: b.src
            }), r && d.notifyWith(c(b), [a, e, c(j), c(h)]), e.length === l.length && (setTimeout(n), e.unbind(".imagesLoaded",
                p)))
        }
        var g = this,
            d = c.isFunction(c.Deferred) ? c.Deferred() : 0,
            r = c.isFunction(d.notify),
            e = g.find("img").add(g.filter("img")),
            l = [],
            j = [],
            h = [];
        c.isPlainObject(f) && c.each(f, function (b, a) {
            if ("callback" === b) f = a;
            else if (d) d[b](a)
        });
        e.length ? e.bind("load.imagesLoaded error.imagesLoaded", p).each(function (b, a) {
            var d = a.src,
                e = c.data(a, "imagesLoaded");
            if (e && e.src === d) k(a, e.isBroken);
            else if (a.complete && a.naturalWidth !== q) k(a, 0 === a.naturalWidth || 0 === a.naturalHeight);
            else if (a.readyState || a.complete) a.src = m, a.src = d
        }) :
            n();
        return d ? d.promise(g) : g
    }
})(jQuery);;
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, e, b) {
    var c = "hashchange",
        h = document,
        f, g = $.event.special,
        i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7);

    function a(j) {
        j = j || location.href;
        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
    }
    $.fn[c] = function (j) {
        return j ? this.bind(c, j) : this.trigger(c)
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], {
        setup: function () {
            if (d) {
                return false
            }
            $(f.start)
        },
        teardown: function () {
            if (d) {
                return false
            }
            $(f.stop)
        }
    });
    f = (function () {
        var j = {},
            p, m = a(),
            k = function (q) {
                return q
            },
            l = k,
            o = k;
        j.start = function () {
            p || n()
        };
        j.stop = function () {
            p && clearTimeout(p);
            p = b
        };

        function n() {
            var r = a(),
                q = o(m);
            if (r !== m) {
                l(m = r, q);
                $(e).trigger(c)
            } else {
                if (q !== m) {
                    location.href = location.href.replace(/#.*/, "") + q
                }
            }
            p = setTimeout(n, $.fn[c].delay)
        }
        $.browser.msie && !d && (function () {
            var q, r;
            j.start = function () {
                if (!q) {
                    r = $.fn[c].src;
                    r = r && r + a();
                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        r || l(a());
                        n()
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                    h.onpropertychange = function () {
                        try {
                            if (event.propertyName === "title") {
                                q.document.title = h.title
                            }
                        } catch (s) { }
                    }
                }
            };
            j.stop = k;
            o = function () {
                return a(q.location.href)
            };
            l = function (v, s) {
                var u = q.document,
                    t = $.fn[c].domain;
                if (v !== s) {
                    u.title = h.title;
                    u.open();
                    t && u.write('<script>document.domain="' + t + '"<\/script>');
                    u.close();
                    q.location.hash = v
                }
            }
        })();
        return j
    })()
})(jQuery, this);;
/**
 * Authors (i.e. Large Egos ;):
 *  - Your name
 */

(function ($) {
    "use strict";

    $(window).hashchange(function () {
        showTarget(document.URL)
    });

    function Application() { }
    Application.prototype = {
        init: function () {
            showAllContentWhenLoaded();
            if (!Modernizr.svg) { //abused as check for lte-IE8
                replaceSvg();
            }
            showExternalLinks();
            gotoTouch();
            showSubnav();
            setupFoldableBehaviour();
            toggleDrupalToolbar();
            showTarget(document.URL);
            checkForIE();
            if (!Modernizr.input.placeholder) {
                setPlaceholderText();
            }
            if ($('form').length) { //AFTER setPlaceholderText
                setupFormValidation();
            }
            setupTooltips();
            if ($('a.fancybox').length) {
                setupFancybox();
            }
            if ($('.carousel-list').length) {
                setupCarousel();
            }
            if ($('.theme-container').length) {
                setupThemeOverlay();
            }

            $.registry.addFunc({
                breakpoint: ['mobile'],
                enter: function () {
                    addMobileNavFunctionality();
                },
                exit: function () {
                    killAddMobileNavFunctionality();
                }
            });
            $.registry.addFunc({
                breakpoint: ['mobile'],
                enter: function () {
                    sidebarFirst();
                },
                exit: function () {
                    killSidebarFirst();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    setupLocationPopups();
                },
                exit: function () {
                    killsetupLocationPopups();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    fixLogoDepth();
                },
                exit: function () {
                    killfixLogoDepth();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet'],
                enter: function () {
                    setTopContent();
                },
                exit: function () {
                    killSetTopContent();
                }
            });
            $.registry.addFunc({
                breakpoint: ['desktop'],
                enter: function () {
                    setTopContent();
                },
                exit: function () {
                    killSetTopContent();
                }
            });
            $.registry.addFunc({
                breakpoint: ['mobile'],
                enter: function () {
                    drawContentHeaderBackgroundMobile();
                },
                exit: function () {
                    killDrawContentHeaderBackground();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet'],
                enter: function () {
                    drawContentHeaderBackground();
                },
                exit: function () {
                    killDrawContentHeaderBackground();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet'],
                enter: function () {
                    doEqualHeights();
                },
                exit: function () {
                    killDoEqualHeights;
                }
            });
            $.registry.addFunc({
                breakpoint: ['desktop'],
                enter: function () {
                    doEqualHeightsWide();
                },
                exit: function () {
                    killDoEqualHeightsWide();
                }
            });
            $.registry.addFunc({
                breakpoint: ['desktop'],
                enter: function () {
                    drawContentHeaderBackground();
                },
                exit: function () {
                    killDrawContentHeaderBackground();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    setupSorting();
                },
                exit: function () {
                    killSetupSorting();
                }
            });
            $.registry.addFunc({
                breakpoint: ['mobile'],
                enter: function () {
                    setupTabsMobile();
                },
                exit: function () {
                    killSetupTabsMobile();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    setupTabs();
                },
                exit: function () {
                    killSetupTabs();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    myImagesLoaded();
                },
                exit: function () {
                    killImagesLoaded();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    setFooterHeight();
                },
                exit: function () {
                    killSetFooterHeight();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet'],
                exit: function () {
                    killSetSidebarMasonry();
                }
            });
            $.registry.addFunc({
                breakpoint: ['tablet', 'desktop'],
                enter: function () {
                    setupSearch();
                },
                exit: function () {
                    killSetupSearch();
                }
            });
            $.registry.addFunc({
                breakpoint: ['mobile'],
                enter: function () {
                    setupSearchMobile();
                },
                exit: function () {
                    killSetupSearchMobile();
                }
            });

            var transform_prop = window.Modernizr.prefixed('transform'),
                transition_prop = window.Modernizr.prefixed('transition'),
                transition_end = (function () {
                    var props = {
                        'WebkitTransition': 'webkitTransitionEnd',
                        'MozTransition': 'transitionend',
                        'OTransition': 'oTransitionEnd otransitionend',
                        'msTransition': 'MSTransitionEnd',
                        'transition': 'transitionend'
                    };
                    return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
                })();

            var closeNavEnd = function (e) {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                }
                nav_open = false;
            };

            app.closeNav = function () {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.openNav = function () {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                nav_open = true;
            };

            app.toggleNav = function (e) {
                if (nav_open && hasClass(doc, nav_class)) {
                    app.closeNav();
                } else {
                    app.openNav();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            addClass(doc, 'js-ready');

        }
    };

    var menuDelayTimerId = 0,
        intendedNavItem = 0,
        inPageNavDelayTimerId = 0,
        scrollToTarget,
        imgList = [],
        counter = 0,
        currentImage,
        carInterval,

        setupThemeOverlay = function () {

            var t = 0; // the height of the highest element (after the function runs)
            $('.theme-container .theme').each(function () {
                var $this = $(this);
                var h = $this.find('h4').innerHeight();
                if (h > t) {
                    t = h;
                }
                $this.find('.overlay').css('height', t + 36);
            });

        },

        checkForIE = function () {
            if ($.browser.msie && parseFloat($.browser.version) == 10) {
                $("html").addClass("ie10");
            }
            var vie11 = !!navigator.userAgent.match(/Trident\/7\./);
            if (vie11) $('html').addClass('ie11');
        },

        setupSearch = function () {
            if ($('#micro-search').length) {
                var toggle = $('#micro-search');
                $(toggle).bind('click', function () {
                    if ($(this).hasClass('imploded')) {
                        $(this).removeClass('imploded');
                        $(this).find('form:first *:input[type!=hidden]:first').focus();
                    }
                });
            }
        },

        sidebarFirst = function () {
            if ($('.profile .network').length) {
                if ($('.profile >header').length) {
                    $('.profile .network').insertAfter('.profile >header');
                } else {
                    $('.profile').prepend($('.profile .network'));
                }

            }
        },

        killSidebarFirst = function () {
            //$('.profile .network').insertAfter('.profile >section');
            $('.profile').append($('.profile .network'));
        },

        killSetupSearch = function () {
            var t = $('#micro-search');
            $(t).removeClass('imploded');
            $(t).unbind();
        },

        setupSearchMobile = function () {
            setupSearch();
            if ($('#micro-search').length) {
                $('#nav-main-container').prepend($('#micro-search'))
            }
        },

        killSetupSearchMobile = function () {
            $('.search-nav-container').prepend($('#micro-search'))
        },

        setupCarousel = function () {
            $('.carousel-list .carousel-item').each(function () {
                var img = $('img', this).attr('src');
                var h1 = $('h1', this).text();
                var p = $('p', this).text();
                var cta = $('.cta a', this).text();
                var nav = $('.carousel-nav-item', this);
                imgList.push({
                    obj: $(this),
                    image: img,
                    h1: h1,
                    p: p,
                    cta: cta,
                    nav: nav
                })
                $(this).find('.carousel-nav-item').remove();
                $(this).hide();

            });

            setupCarouselNavigation();
            updateCarousel(0);
        },

        killSetupCarousel = function () {

        },

        setupCarouselNavigation = function () {
            var navItemList = $('.carousel-container .navitem-list');
            for (var i = 0; i < imgList.length; i++) {
                var navItem = '<li class="navitem"><a class="" href="' + $(imgList[i].nav).attr('href') + '">' + $(imgList[i].nav).text() + '</a></li>'
                $(navItem).appendTo(navItemList);
            };

            $('.carousel-container .navitem-list a').each(function (i) {
                $(this).bind('click', function (e) {

                    if (Modernizr.mq('(max-width: 600px)')) {

                    } else {
                        e.preventDefault();
                    }
                    carInterval = window.clearInterval(carInterval);
                    updateCarousel(i);
                })
            });

            carInterval = window.setInterval(updateCarousel, 6000);
        },

        updateCurrentImage = function () {
            currentImage = $(imgList[counter].obj);
        },

        updateCarousel = function (i) {
            if (i === undefined) {
                var i = counter + 1;
            }
            updateCurrentImage();
            counter = i;
            if (counter === imgList.length) {
                counter = 0;
            }
            currentImage.fadeOut('slow');
            $(imgList[counter].obj).fadeIn('slow');
            updateCarouselNavigation();
        },

        updateCarouselNavigation = function () {
            $('.navitem-list .navitem').each(function (i) {
                $(this).removeClass('active');
                if ($(this).index() === counter) {
                    $(this).addClass('active');
                }

            })
        },

        getTarget = function (name) {
            var pattern = /#[^ ]*/;
            var results = pattern.exec(name);
            if (results == null) {
                return "";
            } else {
                return results;
            }
        },

        showTarget = function (url) {
            var id = (getTarget(url));
            if (id.toString().length > 1) {
                var cid = $(id.toString());
                var container = $(cid).closest('.foldable');
                var fold = $(container).children('.fold');
                var h = 0;
                $(fold).find('>li').each(function () {
                    h += ($(this).innerHeight());
                });
                if ($(container).hasClass('folded')) {
                    $(container).removeClass('folded');
                    $(fold).css('max-height', h);
                };
                //$('body').delay(500).scrollTo(cid, 500);
                setInPageNavDelay(cid, 500);
            }
        },

        doDelayedInPageNav = function () {
            $('body').scrollTo(scrollToTarget, 500);
            killInPageNavDelay();
        },

        setFooterHeight = function () {
            //var fh = $('footer .extra').height();
            //$('footer .wrapper').css('minHeight',fh);
        },

        killSetFooterHeight = function () {

        },

        setFooterMasonry = function () {
            if ($('footer nav.main >ul').length) {
                $('footer nav.main >ul').masonry({
                    itemSelector: '.brick'
                });
            }
        },

        killSetFooterMasonry = function () {
            $('footer nav.main >ul >li').each(function () {
                $(this).removeAttr('style');
            })
        },

        killSetSidebarMasonry = function () {
            $('aside.notice >section').each(function () {
                $(this).removeAttr('style');
            })
        },

        doMasonry = function () {
            if ($('.story-container').length) {
                $('.story-container').masonry({
                    itemSelector: '.story',
                    cornerStampSelector: '.corner-stamp'
                });
            }
            if ($('.testimonials-container').length) {
                $('.testimonials-container').masonry({
                    itemSelector: '.testimonial-container'
                });
            }

        },

        myImagesLoaded = function () {
            if ($('.story-container').length) {
                var dfd = $('.story-container').imagesLoaded();
                dfd.always(function () {
                    doMasonry();
                });
            }
            if ($('.notice').length) {
                var dfd = $('.notice').imagesLoaded();
                dfd.always(function () {
                    doMasonry();
                });
            }

            if ($('.testimonials-container').length) {
                var dfd = $('.testimonials-container').imagesLoaded();
                dfd.always(function () {
                    doMasonry();
                });
            }
            if ($('.fact-list-container img').length) {
                var dfd = $('.fact-list-container').imagesLoaded();
                dfd.always(function () {
                    drawContentHeaderBackground();
                });
            } else if ($('article header img').length) {
                var dfd = $('article header').imagesLoaded();
                dfd.always(function () {
                    drawContentHeaderBackground();
                });
            }
        },

        killImagesLoaded = function () {

        },

        showExternalLinks = function () {

            if ($("#page-content >section li a").length) {
                $("#page-content >section li a").each(function () {
                    if (!($(this).closest('ul').hasClass('search-results'))) {
                        var attr = $(this).attr('href');
                        if (typeof attr != 'undefined' && attr.substring(0, 4) === 'http') {
                            $(this).addClass('external');
                        };
                    };
                });
            }
            if ($("#page-content >section p a").length) {
                $("#page-content >section p a").each(function () {
                    var attr = $(this).attr('href');
                    if (typeof attr != 'undefined' && attr.substring(0, 4) === 'http') {
                        $(this).addClass('external');
                    };
                });
            }
        },

        setupFancybox = function () {
            /*
             *  Button helper. Disable animations, hide close button, change title type and content
             */

            $('.fancybox').fancybox({
                //$.fancybox('.fancybox',{
                padding: 0,
                margin: 40,
                openEffect: 'fade',
                closeEffect: 'fade',

                prevEffect: 'fade',
                nextEffect: 'fade',

                closeBtn: true,

                helpers: {
                    title: {
                        type: 'over'
                    },
                    buttons: {}
                },

                afterLoad: function () {
                    var el = $(this.element);
                    var t = el.data('title');
                    var c = el.data('copyright');
                    if (t || c) {
                        this.title = t + '<span class="extra">(Copyright: ' + c + ')</span>';
                    }
                    $('body').addClass('showModal');

                    // $(".fancybox-opened").touchwipe({
                    //   wipeLeft: function() { alert("next"); },
                    //   wipeRight: function() { alert("prev"); },
                    //   min_move_x: 20,
                    //   min_move_y: 20,
                    //   preventDefaultEvents: true
                    // });
                },

                afterClose: function () {
                    $('body').removeClass('showModal');
                }

            });
        },

        setupFoldableBehaviour = function () {
            if (Modernizr.generatedcontent) {
                $('.foldable .toggle').each(function () {
                    addFoldableBehaviour($(this));
                });
            }
        },

        addFoldableBehaviour = function (el) {
            var foldable = $(el).closest('.foldable');
            var fold = $(foldable).children('.fold');
            var el = el;

            // css transition callback
            // content.on('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function(e){
            //     if(content.hasClass('open')){
            //         content.css('max-height', 9999); // try setting this to 'none'... I dare you!
            //     }
            // });

            var h = $(fold).height();
            if ($(foldable).hasClass('folded')) {
                $(fold).css('max-height', 0);
            } else {
                $(fold).css('max-height', h);
            }
            var toggle = function (e) {
                e.preventDefault();
                if ($(foldable).hasClass('folded')) {
                    $(foldable).removeClass('folded');
                    $(fold).css('max-height', h);
                } else {
                    $(foldable).addClass('folded');
                    $(fold).css('max-height', 0);
                }
            }

            $(el).bind('click', toggle);

        },

        showAllContentWhenLoaded = function () {
            //show content when javascript is executed
            //classname set in head.js
            $('html').removeClass('hidetilldocumentready');
        },

        setupTabs = function () {
            var tabbedContainer = $('.tabbed-container'),
                theTabs = $('.tab', tabbedContainer),
                allTabs = $('.tab-content', tabbedContainer);

            theTabs.each(function (i) {
                $(this).addClass('tab' + i);
            });
            allTabs.each(function (i) {
                $(this).addClass('hidden tabCont' + i);
            });
            setContentFirstTab(tabbedContainer, allTabs);
            // interaction
            $('.tab', tabbedContainer).each(function (i) {
                $(this).click(function (e) {
                    e.preventDefault();
                    allTabs.addClass('hidden');
                    $('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('.tabCont' + i, tabbedContainer).removeClass('hidden');
                });
            });
        },

        killSetupTabs = function () {
            var tabbedContainer = $('.tabbed-container'),
                theTabs = $('.tab', tabbedContainer),
                allTabs = $('.tab-content', tabbedContainer);

            theTabs.each(function (i) {
                $(this).removeClass('tab' + i);
            });
            allTabs.removeClass('hidden');
            $('.selected').removeClass('selected');

            $('.tab', tabbedContainer).each(function (i) {
                $(this).unbind();
            });

        },

        setContentFirstTab = function (tabbedContainer, allTabs) {
            $('.tabCont0', tabbedContainer).removeClass('hidden');
            $('.tab:first').addClass('selected');
        },

        setupTabsMobile = function () {
            var tabbedContainer = $('.tabbed-container'),
                theTabs = $('.tab', tabbedContainer),
                allTabs = $('.tab-content', tabbedContainer);

            theTabs.each(function (i) {
                $(this).addClass('tab' + i);
            });

            allTabs.each(function (i) {
                $(this).addClass('hidden tabCont' + i);
            });

            // interaction
            $('.tab', tabbedContainer).each(function (i) {
                $(this).find('a').click(function (e) {
                    e.preventDefault();
                    allTabs.addClass('hidden');
                    if ($(this).closest('.tab').hasClass('selected')) {
                        $('.selected').removeClass('selected');
                    } else {
                        $('.selected').removeClass('selected');
                        $(this).closest('.tab').addClass('selected');
                        $('.tabCont' + i, tabbedContainer).removeClass('hidden');
                        $('body').scrollTo($(this), 500);
                    }
                });
            });

            for (var j = 0; j < allTabs.length; j++) {
                var content = $('.tabCont' + j);
                var tab = $('.tab' + j);
                $(content).appendTo($(tab));
            };
        },

        killSetupTabsMobile = function () {
            var tabbedContainer = $('.tabbed-container'),
                theTabs = $('.tab', tabbedContainer),
                allTabs = $('.tab-content', tabbedContainer);

            theTabs.each(function (i) {
                $(this).removeClass('tab' + i);
            });

            allTabs.removeClass('hidden');
            $('.selected').removeClass('selected');

            $('.tab', tabbedContainer).each(function (i) {
                $(this).unbind();
            });

            for (var j = 0; j < allTabs.length; j++) {
                var content = $('.tabCont' + j);
                $(content).appendTo($('.tab-content-container'));
            };

        },

        setupSorting = function () {
            if ($('.sortable-container')) {
                $('.sort.end').click(function (e) {
                    if (!$(this).hasClass('selected')) {
                        toggleSortClass(this);
                        $('.sortable >li').tsort('span.end', {
                            attr: 'data-end'
                        });
                    }
                });

                $('.sort.start').click(function (e) {
                    if (!$(this).hasClass('selected')) {
                        toggleSortClass(this);
                        $('.sortable >li').tsort('span.start', {
                            attr: 'data-start'
                        });
                    }
                });

                $('.sort.char').click(function (e) {
                    if (!$(this).hasClass('selected')) {
                        toggleSortClass(this);
                        $('.sortable >li').tsort('span.subject a');
                    }
                });
            }
        },

        killSetupSorting = function () {
            //
        },

        toggleSortClass = function (target) {
            $(target).closest('.sortable-container').find('.sort').each(function () {
                $(this).removeClass('selected');
            });

            $(target).addClass('selected');
        },

        setupTooltips = function () {
            if ($(".tooltipcontent")) {
                $(document).mouseup(function (e) {
                    var container = $(".tooltipcontent");

                    if (container.has(e.target).length === 0) {
                        container.fadeOut();
                    }
                });
            }
            $(".tooltip .tooltiptrigger").on('click touchstart', showtooltip);
            $(".closebutton.icon").on('click touchstart', closeparent);
        },

        closeparent = function (e) {
            e.preventDefault();
            $(this).closest('.overview-block').css({
                'z-index': 'auto'
            });
            $(this).parent().fadeOut();
        },

        showtooltip = function (e) {
            e.preventDefault();
            $('.tooltipcontent').hide();
            $(this).closest('.overview-block-container').css({
                'z-index': '1000'
            }).find('.overview-block').css({
                'z-index': '1000'
            });
            $(this).closest('.overview-block-container').siblings().css({
                'z-index': '100'
            }).find('.overview-block').css({
                'z-index': '100'
            });
            $(this).siblings(".tooltipcontent").fadeIn();
            var $wrapperwidth = $(this).closest('.wrapper').width();
            if ($wrapperwidth > 0) {
                $(this).siblings('.tooltipcontent').css({
                    'width': $wrapperwidth - 40
                });
            } else {
                var $infowidth = $(this).closest('.info').width();
                var $trigger_x = Math.round($(this).closest('.type').position().left);
                var $index = $(this).parent().index() + 1;
                if ($index == 2) {
                    $(this).siblings('.tooltipcontent').addClass('second');
                } else if ($index == 3) {
                    $(this).siblings('.tooltipcontent').addClass('third');
                }
                $(this).siblings('.tooltipcontent').css({
                    'width': $infowidth - 40,
                    'margin-left': -$trigger_x
                });

            };

        },

        // location popups on world map
        setupLocationPopups = function () {

            $('.map-container .location').each(function () {
                var x_position = Math.round($(this).position().left);
                var container_width = Math.round($(this).parent().width());
                var location_popup_width = Math.round($(this).children('.location-popup').width())
                // add class right if popup shows outside container
                if (x_position + location_popup_width > container_width) {
                    $(this).children('.location-popup').addClass('right');
                    if (x_position - location_popup_width < 0) {
                        $(this).children('.location-popup').css({
                            'width': (container_width / 2) - 20
                        });
                    }
                }
                //link has to unfold the fold and show target ID
                $(this).find('a').bind('click', function (e) {
                    var t = $(this).attr('href');
                    if (t.substr(0, 1) === "#") {
                        showTarget(t);
                        e.preventDefault();
                    }
                })
            });

            $('.popup-trigger').on('click', showpopup);
            $('.location-popup .closebutton').on('click', closepopup);

        },

        killsetupLocationPopups = function () {

        },

        showpopup = function () {
            $('.location .location-popup').fadeOut();
            $('.location').removeClass('active');
            $(this).siblings('.location-popup').fadeIn();
            $(this).parent().parent().addClass('active');
            $('.map-container .location').each(function () {
                $(this).css({
                    'z-index': 1
                });
            });
            $(this).parent().css({
                'z-index': 100
            });
        },

        closepopup = function () {
            $(this).parent().fadeOut();
            $(this).closest('.location').removeClass('active');
            $('.map-container .location').each(function () {
                $(this).css({
                    'z-index': 1
                });
            });
        },

        addMobileNavFunctionality = function () {

            // open nav with main "nav" button
            //document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);
            $('#nav-open-btn').bind('click', function () {
                app.toggleNav(false);
            });

            // close nav with main "close" button
            //document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);

            // close nav by touching the partial off-screen content
            $(document).bind('click', function (e) {
                if (nav_open && !hasParent(e.target, 'nav-main-container')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
                true);
        },

        killAddMobileNavFunctionality = function () {
            $('#nav-open-btn').unbind();
        },

        replaceSvg = function () {
            $('img[src*="svg"]').attr('src', function () {
                return $(this).attr('src').replace('.svg', '.png');
            });
            $('img[src*="svgz"]').attr('src', function () {
                return $(this).attr('src').replace('.svgz', '.png');
            });
        },

        setWidths = function () {
            //set width to some absolute positioned items, based on their content
        },

        killSetWidths = function () { },

        setWidthsDesktop = function () {
            //set width to some absolute positioned items, based on their content
        },

        killSetWidthsDesktop = function () { },

        showSubnav = function () {
            $('#nav-main >li').each(
                function (index) {
                    if (!$(this).hasClass('home')) {
                        if (!Modernizr.touch) {
                            $(this).bind('mouseenter', function (e) {
                                setMenuDelay(this, 250); //don't show targeted submenu at once, use delay (more userfriendly)
                            });

                            $(this).bind('mouseleave', function (e) {
                                killMenuDelay(); //clear the delay
                            });
                        } else { //touch device
                            $(this).bind('click', function (e) {
                                if ($(this).hasClass('hover')) {
                                    killShowSubnav(); //close subnav
                                } else {
                                    setMenuDelay(this, 1);
                                }

                            });
                        }
                    }
                });

            if (!Modernizr.touch) {
                $('article').bind('mouseenter', function (e) {
                    $('#nav-main >li').each(function () {
                        $(this).removeClass('hover');
                    });
                    $('body').removeClass('hide-selected-subnav');
                });
            }
        },

        doDelayedShowSubnav = function () {
            $('#nav-main >li').each(function () {
                $(this).removeClass('hover');
            });

            intendedNavItem.addClass('hover');

            $('body').addClass('hide-selected-subnav');

            if (Modernizr.mq('(max-width: 740px)') && Modernizr.touch) {
                $('body').scrollTo(intendedNavItem, 500);
            }
        },

        gotoTouch = function () {
            if (Modernizr.touch) {
                $('#nav-main >li >a').each(
                    function (index) {
                        if (!$(this).parent().hasClass('home')) {
                            $(this).bind('click', function (e) {
                                e.preventDefault();
                            })
                        }
                    }
                );
            }
        },

        killMenuDelay = function () {
            clearTimeout(menuDelayTimerId);
        },

        killInPageNavDelay = function () {
            clearTimeout(inPageNavDelayTimerId);
        },

        setMenuDelay = function (tgt, delay) {
            var dl = delay != undefined ? delay : 250;
            intendedNavItem = $(tgt);
            menuDelayTimerId = setTimeout(function () {
                doDelayedShowSubnav();
            }, dl);
        },

        setInPageNavDelay = function (tgt, delay) {
            var dl = delay != undefined ? delay : 500;
            scrollToTarget = tgt;
            inPageNavDelayTimerId = setTimeout(function () {
                doDelayedInPageNav();
            }, dl);
        },

        killShowSubnav = function () {
            $('#nav-main >li').each(function () {
                $(this).removeClass('hover');
            });
            $('body').removeClass('hide-selected-subnav');
        },

        fixLogoDepth = function () {
            $('#logo').prependTo($('#nav-main-container >.wrapper'));
        },

        killfixLogoDepth = function () {
            $('#logo').appendTo($('#header-main .block'));
        },

        setTopContent = function () {
            var navmain = $('#nav-main'),
                navsub = $('#nav-main .selected .nav-sub-container'),
                navHeight,
                navTop;

            if ($('#nav-main .selected .nav-sub-container').length) {
                navTop = navsub.offset().top;
                navHeight = navsub.height();
            } else {
                navTop = navmain.offset().top;
                navHeight = navmain.height();
            };

            if ($('#page-content').hasClass('home')) {
                if (Modernizr.mq('(max-width: 768px)')) {
                    var mt = navHeight + navTop - 11;
                } else {
                    var mt = navHeight + navTop;
                }

            } else {
                var mt = navHeight + navTop + 51;

            }
            $('#page-content').css('padding-top', mt);
        },

        killSetTopContent = function () {
            $('#page-content').css('padding-top', 60);
        },

        drawContentHeaderBackground = function () {
            var navmain = $('#nav-main'),
                navsub = $('#nav-main .selected .nav-sub-container'),
                navHeight,
                navTop,
                header = $('article >header'),
                h = header.height();

            if ($('#nav-main .selected .nav-sub-container').length) {
                navTop = navsub.offset().top;
                navHeight = navsub.height();
            } else {
                navTop = navmain.offset().top;
                navHeight = navmain.height();
            };
            if ($('#page-content').hasClass('home')) {
                if (Modernizr.mq('(max-width: 768px)')) {
                    var mt = navHeight + navTop - 11;
                }
            } else {
                var mt = navHeight + navTop + 51;

            }

            var th = h + mt;
            if ($('#content-header-background').length === 0) {
                $('body').prepend("<div id=\"content-header-background\"></div>");
            }
            $('#content-header-background').css('height', th);
        },

        killDrawContentHeaderBackground = function () {
            if ($('#content-header-background')) {
                $('body').remove('#content-header-background');
                $('#content-header-background').remove();
            }
        },

        drawContentHeaderBackgroundMobile = function () {
            if (!$('#page-content').hasClass('home')) {
                var header = $('article >header'),
                    h = header.height();
                $('body').prepend("<div id=\"content-header-background\"></div>");
                $('#content-header-background').css('height', 108 + h);
            }
        },

        toggleDrupalToolbar = function () {
            $('#toolbar').hide();
            $('body').addClass('menu_hidden');
            Mousetrap.bind('ctrl+z+x', function () {
                $('#toolbar').slideToggle('fast');
                $('body').toggleClass('menu_hidden');
            });
        },

        setPlaceholderText = function () {
            /***
             * ##TEXTFIELDS in IE
             */
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function () {
                $(this).find('[placeholder]').each(function () {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                })
            });
        },

        setupFormValidation = function () {

            $('form').each(function () {
                if ($(this).hasClass('has-super-secret-file-uploads')) {

                    $(this).validate({
                        ignore: false,
                        errorPlacement: function (error, element) {
                            if (element.hasClass('throw-to-slot')) {
                                $('.error_slot.' + element.attr('name')).html(error);
                            } else if (element.hasClass('throw-group-to-slot')) {
                                $('.error_slot.' + element.data('group')).html(error);
                            } else {
                                error.insertAfter(element);
                            }
                        }
                        // I belive we should have rules here for the employer group.
                        // But now I used a rule change on checkbox change.
                    });
                } else {
                    $(this).validate();
                }
            });
        },

        doEqualHeights = function () {
            if ($('.overview-block-container').length) {
                $('.overview-block-container').equalHeights();
            }
            if ($('.testimonials-container-wide').length) {
                $('.testimonials-container-wide').equalHeights();
            }
        },

        killDoEqualHeights = function (container) {
            if ($('.overview-block-container').length) {
                $('.overview-block-container').css('min-height', '0');
                $('.overview-block-container .overview-block').each(
                    function () {
                        $(this).css('min-height', '0');
                    }
                )
            };
        },
        doEqualHeightsWide = function () {
            doEqualHeights();
            if ($('.leader-block').length && $('.fact-list-container').length) {
                $('.leader-block-container').equalHeights();
            }
        },
        killDoEqualHeightsWide = function () {
            doEqualHeightsWide();
            if ($('.leader-block').length && $('.fact-list-container').length) {
                $('.leader-block-container').css('min-height', '0');
                $('.leader-block-container .leader-block').each(
                    function () {
                        $(this).css('min-height', '0');
                    });
                $('.leader-block-container .fact-list-container').each(
                    function () {
                        $(this).css('min-height', '0');
                    });
            }
        },

        trim = function (str) {
            return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
        },

        hasClass = function (el, cn) {
            return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
        },

        addClass = function (el, cn) {
            if (!hasClass(el, cn)) {
                el.className = (el.className === '') ? cn : el.className + ' ' + cn;
            }
        },

        removeClass = function (el, cn) {
            el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
        },
        hasParent = function (el, id) {
            if (el) {
                do {
                    if (el.id === id) {
                        return true;
                    }
                    if (el.nodeType === 9) {
                        break;
                    }
                }
                while ((el = el.parentNode));
            }
            return false;
        },

        doc = document.documentElement,
        _init = false,
        app = {},
        inner = document.getElementById('inner-wrap'),
        nav_open = false,
        nav_class = 'js-nav',

        app = new Application();
    $(document).ready(function () {
        app.init();
        // if(Drupal.ajax) {
        //   Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
        //       var ajax = this;
        //       if($("form").validate().form()) {
        //           $("#edit-ajax-submit").hide();
        //           return true;
        //       }
        //       ajax.ajaxing = false;
        //       return false;
        //   }
        // }
    });

}(jQuery));;
/**
 * extra.js
 */
(function ($) {

    Drupal.behaviors.absLinksToBlank = {
        attach: function (context, settings) {
            //add a target '_blank' to all links other than local or within the domain
            $('a[href^="//"],a[href^="http"]').not('[href*="' + window.location.hostname + '"]').attr('target', '_blank');;
        }
    };

    Drupal.behaviors.gallery = {
        attach: function (context, settings) {
            var show_total = 4;
            var more = 'More';
            var less = 'Less';

            var moreless = more;
            var total = $('.gallery ul > li').length;
            if (total > show_total) {
                toggleGallery();
                $('.gallery').append('<div class="gallery-more">' + moreless + '</div>');
            }

            $('.gallery-more').click(function (e) {
                toggleGallery();
                e.preventDefault();
            });

            function toggleGallery() {
                var counter = 0;
                $('.gallery ul > li').each(function () {
                    counter++;
                    if (counter > show_total) {
                        $(this).slideToggle();
                    }
                });
                if ($('.gallery-more').html() != undefined) {
                    if ($('.gallery-more').html() == more) {
                        moreless = less;
                    } else {
                        moreless = more;
                    }
                    $('.gallery-more').html(moreless);
                }
            }
        }
    };

    Drupal.behaviors.heading = {
        attach: function (context, settings) {
            var factlistcontent = $(".fact-list-container").html();

            if (factlistcontent == "") {
                $("article header .leader-block-container .leader-block").addClass("full-width");
            }
        }
    };

})(jQuery);;

/*
 * This file is a copy of modules/user/user.js.
 *
 * Modifications:
 * - Append instead of prepend .password-confirm and .password-strength
 *   elements.
 * - Show / hide .password-confirm using .show() / .hide() instead of setting
 *   CSS visibility.
 */

(function ($) {

    /**
     * Attach handlers to evaluate the strength of any password fields and to check
     * that its confirmation is correct.
     */
    Drupal.behaviors.password = {
        attach: function (context, settings) {
            var translate = settings.password;
            $('input.password-field', context)
                // .removeAttr('disabled')
                .once('password', function () {
                    var passwordInput = $(this);
                    var innerWrapper = $(this).parent();
                    var outerWrapper = $(this).parent().parent();

                    // Add identifying class to password element parent.
                    innerWrapper.addClass('password-parent');

                    // Add the password confirmation layer.
                    $('input.password-confirm', outerWrapper)
                        // .removeAttr('disabled')
                        .parent()
                        .append('<div class="password-confirm">' + translate['confirmTitle'] + ' <span></span></div>')
                        .addClass('confirm-parent');
                    var confirmInput = $('input.password-confirm', outerWrapper);
                    var confirmResult = $('div.password-confirm', outerWrapper);
                    var confirmChild = $('span', confirmResult);

                    // Add the description box.
                    var passwordMeter = '<div class="password-strength"><div class="password-strength-text" aria-live="assertive"></div><div class="password-strength-title">' + translate['strengthTitle'] + '</div><div class="password-indicator"><div class="indicator"></div></div></div>';
                    $(confirmInput).parent().after('<div class="password-suggestions description"></div>');
                    $(innerWrapper).append(passwordMeter);
                    var passwordDescription = $('div.password-suggestions', outerWrapper).hide();

                    // Check the password strength.
                    var passwordCheck = function () {

                        // Evaluate the password strength.
                        var result = Drupal.evaluatePasswordStrength(passwordInput.val(), settings.password);

                        // Update the suggestions for how to improve the password.
                        if (passwordDescription.html() != result.message) {
                            passwordDescription.html(result.message);
                        }

                        // Only show the description box if there is a weakness in the password.
                        if (result.strength == 100) {
                            passwordDescription.hide();
                        } else {
                            passwordDescription.show();
                        }

                        // Adjust the length of the strength indicator.
                        $(innerWrapper).find('.indicator').css('width', result.strength + '%');

                        // Update the strength indication text.
                        $(innerWrapper).find('.password-strength-text').html(result.indicatorText);

                        passwordCheckMatch();
                    };

                    // Check that password and confirmation inputs match.
                    var passwordCheckMatch = function () {

                        if (confirmInput.val()) {
                            var success = passwordInput.val() === confirmInput.val();

                            // Show the confirm result.
                            confirmResult.show();

                            // Remove the previous styling if any exists.
                            if (this.confirmClass) {
                                confirmChild.removeClass(this.confirmClass);
                            }

                            // Fill in the success message and set the class accordingly.
                            var confirmClass = success ? 'ok' : 'error';
                            confirmChild.html(translate['confirm' + (success ? 'Success' : 'Failure')]).addClass(confirmClass);
                            this.confirmClass = confirmClass;
                        } else {
                            confirmResult.hide();
                        }
                    };

                    // Monitor keyup and blur events.
                    // Blur must be used because a mouse paste does not trigger keyup.
                    passwordInput.keyup(passwordCheck).focus(passwordCheck).blur(passwordCheck);
                    confirmInput.keyup(passwordCheckMatch).blur(passwordCheckMatch);
                });
        }
    };

    /**
     * Evaluate the strength of a user's password.
     *
     * Returns the estimated strength and the relevant output message.
     */
    Drupal.evaluatePasswordStrength = function (password, translate) {
        var weaknesses = 0,
            strength = 100,
            msg = [];

        var hasLowercase = /[a-z]+/.test(password);
        var hasUppercase = /[A-Z]+/.test(password);
        var hasNumbers = /[0-9]+/.test(password);
        var hasPunctuation = /[^a-zA-Z0-9]+/.test(password);

        // If there is a username edit box on the page, compare password to that, otherwise
        // use value from the database.
        var usernameBox = $('input.username');
        var username = (usernameBox.length > 0) ? usernameBox.val() : translate.username;

        // Lose 5 points for every character less than 6, plus a 30 point penalty.
        if (password.length < 6) {
            msg.push(translate.tooShort);
            strength -= ((6 - password.length) * 5) + 30;
        }

        // Count weaknesses.
        if (!hasLowercase) {
            msg.push(translate.addLowerCase);
            weaknesses++;
        }
        if (!hasUppercase) {
            msg.push(translate.addUpperCase);
            weaknesses++;
        }
        if (!hasNumbers) {
            msg.push(translate.addNumbers);
            weaknesses++;
        }
        if (!hasPunctuation) {
            msg.push(translate.addPunctuation);
            weaknesses++;
        }

        // Apply penalty for each weakness (balanced against length penalty).
        switch (weaknesses) {
            case 1:
                strength -= 12.5;
                break;

            case 2:
                strength -= 25;
                break;

            case 3:
                strength -= 40;
                break;

            case 4:
                strength -= 40;
                break;
        }

        // Check if password is the same as the username.
        if (password !== '' && password.toLowerCase() === username.toLowerCase()) {
            msg.push(translate.sameAsUsername);
            // Passwords the same as username are always very weak.
            strength = 5;
        }

        // Based on the strength, work out what text should be shown by the password strength meter.
        if (strength < 60) {
            indicatorText = translate.weak;
        } else if (strength < 70) {
            indicatorText = translate.fair;
        } else if (strength < 80) {
            indicatorText = translate.good;
        } else if (strength <= 100) {
            indicatorText = translate.strong;
        }

        // Assemble the final message.
        msg = translate.hasWeaknesses + '<ul><li>' + msg.join('</li><li>') + '</li></ul>';
        return {
            strength: strength,
            message: msg,
            indicatorText: indicatorText
        };

    };

    /**
     * Field instance settings screen: force the 'Display on registration form'
     * checkbox checked whenever 'Required' is checked.
     */
    Drupal.behaviors.fieldUserRegistration = {
        attach: function (context, settings) {
            var $checkbox = $('form#field-ui-field-edit-form input#edit-instance-settings-user-register-form');

            if ($checkbox.length) {
                $('input#edit-instance-required', context).once('user-register-form-checkbox', function () {
                    $(this).bind('change', function (e) {
                        if ($(this).attr('checked')) {
                            $checkbox.attr('checked', true);
                        }
                    });
                });

            }
        }
    };

})(jQuery);;
(function (g, f) {
    "function" === typeof define && define.amd ? define([], f) : "object" === typeof module && module.exports ? module.exports = f() : g.Rellax = f()
})(this, function () {
    var g = function (f, m) {
        var d = Object.create(g.prototype),
            k = 0,
            p = 0,
            l = 0,
            q = 0,
            e = [],
            t = !1,
            z = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (b) {
                setTimeout(b, 1E3 / 60)
            },
            A = window.transformProp || function () {
                var b = document.createElement("div");
                if (null === b.style.transform) {
                    var a = ["Webkit", "Moz", "ms"],
                        c;
                    for (c in a)
                        if (void 0 !== b.style[a[c] + "Transform"]) return a[c] + "Transform"
                }
                return "transform"
            }();
        d.options = {
            speed: -2,
            center: !1,
            round: !0,
            vertical: !0,
            horizontal: !1,
            callback: function () { }
        };
        m && Object.keys(m).forEach(function (b) {
            d.options[b] = m[b]
        });
        f || (f = ".rellax");
        var u = "string" === typeof f ? document.querySelectorAll(f) : [f];
        if (0 < u.length) d.elems = u;
        else throw Error("The elements you're trying to select don't exist.");
        var n = function () {
            for (var b = 0; b < e.length; b++) d.elems[b].style.cssText =
                e[b].style;
            e = [];
            p = window.innerHeight;
            q = window.innerWidth;
            v();
            for (b = 0; b < d.elems.length; b++) {
                var a = d.elems[b],
                    c = a.getAttribute("data-rellax-percentage"),
                    r = a.getAttribute("data-rellax-speed"),
                    f = a.getAttribute("data-rellax-zindex") || 0,
                    h = d.options.vertical ? c || d.options.center ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop : 0 : 0,
                    g = d.options.horizontal ? c || d.options.center ? window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0 : 0,
                    k = h + a.getBoundingClientRect().top,
                    l = a.clientHeight || a.offsetHeight || a.scrollHeight,
                    m = g + a.getBoundingClientRect().left,
                    n = a.clientWidth || a.offsetWidth || a.scrollWidth;
                h = c ? c : (h - k + p) / (l + p);
                c = c ? c : (g - m + q) / (n + q);
                d.options.center && (h = c = .5);
                r = r ? r : d.options.speed;
                h = w(c, h, r);
                a = a.style.cssText;
                c = "";
                0 <= a.indexOf("transform") && (c = a.indexOf("transform"), c = a.slice(c), c = (g = c.indexOf(";")) ? " " + c.slice(11, g).replace(/\s/g, "") : " " + c.slice(11).replace(/\s/g, ""));
                e.push({
                    baseX: h.x,
                    baseY: h.y,
                    top: k,
                    left: m,
                    height: l,
                    width: n,
                    speed: r,
                    style: a,
                    transform: c,
                    zindex: f
                })
            }
            x()
        },
            v = function () {
                var b = k,
                    a = l;
                k = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                l = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                return b != k && d.options.vertical || a != l && d.options.horizontal ? !0 : !1
            },
            w = function (b, a, c) {
                var e = {};
                b = 100 * c * (1 - b);
                a = 100 * c * (1 - a);
                e.x = d.options.round ? Math.round(b) : Math.round(100 * b) / 100;
                e.y = d.options.round ? Math.round(a) : Math.round(100 *
                    a) / 100;
                return e
            },
            y = function () {
                v() && !1 === t && x();
                z(y)
            },
            x = function () {
                for (var b, a = 0; a < d.elems.length; a++) {
                    b = w((l - e[a].left + q) / (e[a].width + q), (k - e[a].top + p) / (e[a].height + p), e[a].speed);
                    var c = b.y - e[a].baseY,
                        f = b.x - e[a].baseX;
                    d.elems[a].style[A] = "translate3d(" + (d.options.horizontal ? f : "0") + "px," + (d.options.vertical ? c : "0") + "px," + e[a].zindex + "px) " + e[a].transform
                }
                d.options.callback(b)
            };
        d.destroy = function () {
            for (var b = 0; b < d.elems.length; b++) d.elems[b].style.cssText = e[b].style;
            t = !0
        };
        n();
        window.addEventListener("resize",
            function () {
                n()
            });
        y();
        d.refresh = n;
        return d
    };
    return g
});;
(function ($) {
    Drupal.behaviors.paragraphs_js = {
        attach: function (context, settings) {
            if ($('.rellax').length > 0) {
                var rellax = new Rellax('.rellax', {
                    speed: -2,
                    center: false,
                    round: true,
                    vertical: true,
                    horizontal: false
                });
            }
        }
    }
})(jQuery);;
(function ($) {

    var instances = [];

    function NewsLetter(elm, options) {
        this.options = options;
        this.element = elm;
        this.init();
    }

    NewsLetter.prototype = {
        init: function () {
            var that = this;
            $(this.element).submit(function (e) {
                that.submit(e);
            });
            $(this.element).find('button').click(function (e) {
                that.submit(e);
            });
        },
        submit: function (e) {
            e.preventDefault();
            var that = this;
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            var email = $(that.element).find('.nieuwsbrief').val();
            if (pattern.test(email)) {
                $.post(that.options.url, $(that.element).serialize(), function (errorCode) {
                    if (errorCode == '') {
                        $(that.element).html(that.options.succes);
                        _gaq.push(["_trackEvent", "Newsletter", "signup"]);
                    } else if (errorCode == '-99') {
                        $(that.element).html(that.options.subscribed);
                    } else {
                        $(that.element).html(that.options.error);
                    }
                }).fail(function (x, e) {
                    $(that.element).html(that.options.error);
                });
            }
        }
    };

    $.fn.newsletter = function (options) {
        var settings = $.extend({}, options);
        this.each(function (i, o) {
            var instance = new NewsLetter(o, settings);
            instances.push(instance);
        });
    }

    $.fn.newsletter.defaults = {};

    $('form.mailing_form').newsletter({
        url: "/profiles/unesco/modules/custom/newsletter_subscription_block/subscribe.php",
        succes: '<p class="success">Thank you for your interest.</p><p>You received an email to confirm your subscription.</p>',
        fail: "<p>You already are subscribed to our news letter.</p>",
        error: '<p>Something went wrong during subscription, please contact the site administrator!</p>',
        subscribed: '<p>You are already subscribed</p>'
    });

})(jQuery);;
(function ($) {

    var themeBase = '../';
    var $_window = $(window);
    var $_document = $(document);
    var $_body = $('body');
    var $_html = $('html');

    Drupal.behaviors.new_layout = {

        attach: function (context, settings) {
            var animating;

            /**
             *
             * @returns {jQuery}
             */
            $.fn.goTo = function () {
                var offset = $(this).offset().top;
                $('html, body').animate({
                    scrollTop: offset + 'px'
                }, 'slow', function () {
                    $('body').removeClass('animating');
                });
                return this; // for chaining...
            }

            /**
             * Scroll to content
             */
            $('.arrow-down').click(function () {
                $('.start-content').goTo();
                return false;
            });

            /**
             * Toggle submit btn focus form top
             */
            $('#search-form input', context).on('focus', function () {
                $('#search-form .input-submit').css('display', 'block');
            });

            $('#search-form input', context).on('focusout', function () {
                var input = $(this).val();
                if (input == '') {
                    $('#search-form .input-submit').css('display', 'none');
                    $('#search-form .input-submit').removeClass('shown');
                    $(this).removeClass('filled-in');
                }
            });

            $('#search-form input').keypress(function () {
                $(this).addClass('filled-in');
                $('#search-form .input-submit').addClass('shown');
            });

            /**
             * Resize header image on scale
             * @param el
             */
            var resizeHeader = function (el, height) {
                var $windowWidth = $_window.width();
                var $windowHeight = $_window.height();

                if (el.length) {
                    var imgWidth = $('.full-image').width();

                    if (height == undefined) {
                        if ($windowWidth >= 640) {
                            el.css('height', $windowHeight * 1 + 'px');
                            //$('.cta').css('bottom', '');
                            $('.section-two').css('margin-top', $windowHeight * 0.68 + 'px');
                        }
                        if ($windowWidth < 639) {
                            var $titleHeight = $('h1.light.h1').height() + 100;

                            if ($titleHeight <= 340 && $titleHeight >= 250) {
                                $windowHeight = $windowHeight + 50;

                            } else if ($titleHeight <= 410 && $titleHeight > 340) {
                                $windowHeight = $windowHeight + 120;
                            }

                            if ($('a.btn.white').height() >= 90) {
                                $windowHeight = $windowHeight + 50;
                            }

                            el.css('height', $windowHeight * 0.80 + 'px');
                            $('.section-two').css('margin-top', $windowHeight * 0.68 + 'px');
                        }
                    }
                }
            };

            var onResize = function () {
                var $windowWidth = $_window.width();

                if ($('.hero-wrapper').length > 0) {

                    resizeHeader($('.hero-wrapper'));
                }
            };
            $(window).resize(onResize);
            var imgLoad = $('body').imagesLoaded();
            imgLoad.always(function () {
                onResize();
            });

            killDrawContentHeaderBackground = function () {
                if ($('#content-header-background')) {
                    $('body').remove('#content-header-background');
                    $('#content-header-background').remove();
                }
            }

            /**
             * Show content after all images are loaded
             */
            if ($('body').hasClass('new--frontpage')) {
                var imgLoad = $('body').imagesLoaded();
                imgLoad.always(function () {
                    $('html').removeClass('hidetilldocumentready');
                    killDrawContentHeaderBackground();
                    $('.new--layout').css('padding-top', '96px');

                    /* todo this overrides a lot of CSS media queries
                    if($('.case').length > 0) {
                      $('.case .content').each(function() {
                        $_height = $(this).height() + 40; //2x 20 padding
                        $(this).parent().parent().css('transform', 'translateY(' + $_height + 'px' + ')');
                      });
                    }
                    */
                });

                /**
                 * Fade header stuff
                 * @type {*}
                 */
                var header = $("[data-parallax]");
                var range = 100;
                $(window).on('scroll', function () {
                    var scrollTop = $(this).scrollTop();
                    var offset = header.offset().top;
                    var height = header.outerHeight();
                    offset = offset + height / 5;
                    //var calc = 1 - (scrollTop - offset + range) / range;
                    var calc = 1 - ($(window).scrollTop() / 250);
                    header.find('h1').css({
                        'opacity': calc
                    });
                    header.find('.btn').css({
                        'opacity': calc
                    });
                    header.find('.overlay').css({
                        'opacity': calc
                    });
                    header.find('.btn').css({
                        'transition': 'none'
                    });
                    if (calc > '1') {
                        header.find('h1').css({
                            'opacity': 1
                        });
                        header.find('.btn').css({
                            'opacity': 1
                        });
                        header.find('.overlay').css({
                            'opacity': 1
                        });
                    } else if (calc < '0') {
                        header.find('h1').css({
                            'opacity': 0
                        });
                        header.find('.btn').css({
                            'opacity': 0
                        });
                        header.find('.overlay').css({
                            'opacity': 0
                        });
                    }
                });
            }

            $('.show-more-text-btn').click(function (e) {
                if ($(this).data('toggled')) {
                    $(this)
                        .data('toggled', false)
                        .text('+ show more');
                } else {
                    $(this)
                        .data('toggled', true)
                        .text('- show less');
                }

                $(this).prev().toggle(400);

                return false;
            });

        }
    }
})(jQuery);;