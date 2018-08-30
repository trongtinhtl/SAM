/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function (a, b, c) {
        function d(c) {
            var d = b.console;
            f[c] || (f[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace()))
        }

        function e(b, c, e, f) {
            if (Object.defineProperty) try {
                return void Object.defineProperty(b, c, {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                        return d(f), e
                    },
                    set: function (a) {
                        d(f), e = a
                    }
                })
            } catch (g) { }
            a._definePropertyBroken = !0, b[c] = e
        }
        a.migrateVersion = "1.4.1";
        var f = {};
        a.migrateWarnings = [], b.console && b.console.log && b.console.log("JQMIGRATE: Migrate is installed" + (a.migrateMute ? "" : " with logging active") + ", version " + a.migrateVersion), a.migrateTrace === c && (a.migrateTrace = !0), a.migrateReset = function () {
            f = {}, a.migrateWarnings.length = 0
        }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
        var g = a("<input/>", {
            size: 1
        }).attr("size") && a.attrFn,
            h = a.attr,
            i = a.attrHooks.value && a.attrHooks.value.get || function () {
                return null
            },
            j = a.attrHooks.value && a.attrHooks.value.set || function () {
                return c
            },
            k = /^(?:input|button)$/i,
            l = /^[238]$/,
            m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            n = /^(?:checked|selected)$/i;
        e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"), a.attr = function (b, e, f, i) {
            var j = e.toLowerCase(),
                o = b && b.nodeType;
            return i && (h.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
                get: function (b, d) {
                    var e, f = a.prop(b, d);
                    return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c
                },
                set: function (b, c, d) {
                    var e;
                    return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())), d
                }
            }, n.test(j) && d("jQuery.fn.attr('" + j + "') might use property instead of attribute")), h.call(a, b, e, f))
        }, a.attrHooks.value = {
            get: function (a, b) {
                var c = (a.nodeName || "").toLowerCase();
                return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), b in a ? a.value : null)
            },
            set: function (a, b) {
                var c = (a.nodeName || "").toLowerCase();
                return "button" === c ? j.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value', val) no longer sets properties"), void (a.value = b))
            }
        };
        var o, p, q = a.fn.init,
            r = a.find,
            s = a.parseJSON,
            t = /^\s*</,
            u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        a.fn.init = function (b, e, f) {
            var g, h;
            return b && "string" == typeof b && !a.isPlainObject(e) && (g = w.exec(a.trim(b))) && g[0] && (t.test(b) || d("$(html) HTML strings must start with '<' character"), g[3] && d("$(html) HTML text after last tag is ignored"), "#" === g[0].charAt(0) && (d("HTML string cannot start with a '#' character"), a.error("JQMIGRATE: Invalid selector string (XSS)")), e && e.context && e.context.nodeType && (e = e.context), a.parseHTML) ? q.call(this, a.parseHTML(g[2], e && e.ownerDocument || e || document, !0), e, f) : (h = q.apply(this, arguments), b && b.selector !== c ? (h.selector = b.selector, h.context = b.context) : (h.selector = "string" == typeof b ? b : "", b && (h.context = b.nodeType ? b : e || document)), h)
        }, a.fn.init.prototype = a.fn, a.find = function (a) {
            var b = Array.prototype.slice.call(arguments);
            if ("string" == typeof a && u.test(a)) try {
                document.querySelector(a)
            } catch (c) {
                a = a.replace(v, function (a, b, c, d) {
                    return "[" + b + c + '"' + d + '"]'
                });
                try {
                    document.querySelector(a), d("Attribute selector with '#' must be quoted: " + b[0]), b[0] = a
                } catch (e) {
                    d("Attribute selector with '#' was not fixed: " + b[0])
                }
            }
            return r.apply(this, b)
        };
        var x;
        for (x in r) Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
        a.parseJSON = function (a) {
            return a ? s.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
        }, a.uaMatch = function (a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            }
        }, a.browser || (o = a.uaMatch(navigator.userAgent), p = {}, o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome ? p.webkit = !0 : p.webkit && (p.safari = !0), a.browser = p), e(a, "browser", a.browser, "jQuery.browser is deprecated"), a.boxModel = a.support.boxModel = "CSS1Compat" === document.compatMode, e(a, "boxModel", a.boxModel, "jQuery.boxModel is deprecated"), e(a.support, "boxModel", a.support.boxModel, "jQuery.support.boxModel is deprecated"), a.sub = function () {
            function b(a, c) {
                return new b.fn.init(a, c)
            }
            a.extend(!0, b, this), b.superclass = this, b.fn = b.prototype = this(), b.fn.constructor = b, b.sub = this.sub, b.fn.init = function (d, e) {
                var f = a.fn.init.call(this, d, e, c);
                return f instanceof b ? f : b(f)
            }, b.fn.init.prototype = b.fn;
            var c = b(document);
            return d("jQuery.sub() is deprecated"), b
        }, a.fn.size = function () {
            return d("jQuery.fn.size() is deprecated; use the .length property"), this.length
        };
        var y = !1;
        a.swap && a.each(["height", "width", "reliableMarginRight"], function (b, c) {
            var d = a.cssHooks[c] && a.cssHooks[c].get;
            d && (a.cssHooks[c].get = function () {
                var a;
                return y = !0, a = d.apply(this, arguments), y = !1, a
            })
        }), a.swap = function (a, b, c, e) {
            var f, g, h = {};
            y || d("jQuery.swap() is undocumented and deprecated");
            for (g in b) h[g] = a.style[g], a.style[g] = b[g];
            f = c.apply(a, e || []);
            for (g in b) a.style[g] = h[g];
            return f
        }, a.ajaxSetup({
            converters: {
                "text json": a.parseJSON
            }
        });
        var z = a.fn.data;
        a.fn.data = function (b) {
            var e, f, g = this[0];
            return !g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), e !== c && e !== f || f === c) ? z.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), f)
        };
        var A = /\/(java|ecma)script/i;
        a.clean || (a.clean = function (b, c, e, f) {
            c = c || document, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, d("jQuery.clean() is deprecated");
            var g, h, i, j, k = [];
            if (a.merge(k, a.buildFragment(b, c).childNodes), e)
                for (i = function (a) {
                    return !a.type || A.test(a.type) ? f ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a) : e.appendChild(a) : void 0
                }, g = 0; null != (h = k[g]); g++) a.nodeName(h, "script") && i(h) || (e.appendChild(h), "undefined" != typeof h.getElementsByTagName && (j = a.grep(a.merge([], h.getElementsByTagName("script")), i), k.splice.apply(k, [g + 1, 0].concat(j)), g += j.length));
            return k
        });
        var B = a.event.add,
            C = a.event.remove,
            D = a.event.trigger,
            E = a.fn.toggle,
            F = a.fn.live,
            G = a.fn.die,
            H = a.fn.load,
            I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            J = new RegExp("\\b(?:" + I + ")\\b"),
            K = /(?:^|\s)hover(\.\S+|)\b/,
            L = function (b) {
                return "string" != typeof b || a.event.special.hover ? b : (K.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), b && b.replace(K, "mouseenter$1 mouseleave$1"))
            };
        a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), a.event.add = function (a, b, c, e, f) {
            a !== document && J.test(b) && d("AJAX events should be attached to document: " + b), B.call(this, a, L(b || ""), c, e, f)
        }, a.event.remove = function (a, b, c, d, e) {
            C.call(this, a, L(b) || "", c, d, e)
        }, a.each(["load", "unload", "error"], function (b, c) {
            a.fn[c] = function () {
                var a = Array.prototype.slice.call(arguments, 0);
                return "load" === c && "string" == typeof a[0] ? H.apply(this, a) : (d("jQuery.fn." + c + "() is deprecated"), a.splice(0, 0, c), arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), this))
            }
        }), a.fn.toggle = function (b, c) {
            if (!a.isFunction(b) || !a.isFunction(c)) return E.apply(this, arguments);
            d("jQuery.fn.toggle(handler, handler...) is deprecated");
            var e = arguments,
                f = b.guid || a.guid++,
                g = 0,
                h = function (c) {
                    var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
                    return a._data(this, "lastToggle" + b.guid, d + 1), c.preventDefault(), e[d].apply(this, arguments) || !1
                };
            for (h.guid = f; g < e.length;) e[g++].guid = f;
            return this.click(h)
        }, a.fn.live = function (b, c, e) {
            return d("jQuery.fn.live() is deprecated"), F ? F.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), this)
        }, a.fn.die = function (b, c) {
            return d("jQuery.fn.die() is deprecated"), G ? G.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), this)
        }, a.event.trigger = function (a, b, c, e) {
            return c || J.test(a) || d("Global events are undocumented and deprecated"), D.call(this, a, b, c || document, e)
        }, a.each(I.split("|"), function (b, c) {
            a.event.special[c] = {
                setup: function () {
                    var b = this;
                    return b !== document && (a.event.add(document, c + "." + a.guid, function () {
                        a.event.trigger(c, Array.prototype.slice.call(arguments, 1), b, !0)
                    }), a._data(this, c, a.guid++)), !1
                },
                teardown: function () {
                    return this !== document && a.event.remove(document, c + "." + a._data(this, c)), !1
                }
            }
        }), a.event.special.ready = {
            setup: function () {
                this === document && d("'ready' event is deprecated")
            }
        };
        var M = a.fn.andSelf || a.fn.addBack,
            N = a.fn.find;
        if (a.fn.andSelf = function () {
            return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), M.apply(this, arguments)
        }, a.fn.find = function (a) {
            var b = N.apply(this, arguments);
            return b.context = this.context, b.selector = this.selector ? this.selector + " " + a : a, b
        }, a.Callbacks) {
            var O = a.Deferred,
                P = [
                    ["resolve", "done", a.Callbacks("once memory"), a.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", a.Callbacks("once memory"), a.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]
                ];
            a.Deferred = function (b) {
                var c = O(),
                    e = c.promise();
                return c.pipe = e.pipe = function () {
                    var b = arguments;
                    return d("deferred.pipe() is deprecated"), a.Deferred(function (d) {
                        a.each(P, function (f, g) {
                            var h = a.isFunction(b[f]) && b[f];
                            c[g[1]](function () {
                                var b = h && h.apply(this, arguments);
                                b && a.isFunction(b.promise) ? b.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[g[0] + "With"](this === e ? d.promise() : this, h ? [b] : arguments)
                            })
                        }), b = null
                    }).promise()
                }, c.isResolved = function () {
                    return d("deferred.isResolved is deprecated"), "resolved" === c.state()
                }, c.isRejected = function () {
                    return d("deferred.isRejected is deprecated"), "rejected" === c.state()
                }, b && b.call(c, c), c
            }
        }
    }(jQuery, window);;

/**
 * jQuery Once Plugin v1.2
 * http://plugins.jquery.com/project/once
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
    var cache = {},
        uuid = 0;

    /**
     * Filters elements by whether they have not yet been processed.
     *
     * @param id
     *   (Optional) If this is a string, then it will be used as the CSS class
     *   name that is applied to the elements for determining whether it has
     *   already been processed. The elements will get a class in the form of
     *   "id-processed".
     *
     *   If the id parameter is a function, it will be passed off to the fn
     *   parameter and the id will become a unique identifier, represented as a
     *   number.
     *
     *   When the id is neither a string or a function, it becomes a unique
     *   identifier, depicted as a number. The element's class will then be
     *   represented in the form of "jquery-once-#-processed".
     *
     *   Take note that the id must be valid for usage as an element's class name.
     * @param fn
     *   (Optional) If given, this function will be called for each element that
     *   has not yet been processed. The function's return value follows the same
     *   logic as $.each(). Returning true will continue to the next matched
     *   element in the set, while returning false will entirely break the
     *   iteration.
     */
    $.fn.once = function (id, fn) {
        if (typeof id != 'string') {
            // Generate a numeric ID if the id passed can't be used as a CSS class.
            if (!(id in cache)) {
                cache[id] = ++uuid;
            }
            // When the fn parameter is not passed, we interpret it from the id.
            if (!fn) {
                fn = id;
            }
            id = 'jquery-once-' + cache[id];
        }
        // Remove elements from the set that have already been processed.
        var name = id + '-processed';
        var elements = this.not('.' + name).addClass(name);

        return $.isFunction(fn) ? elements.each(fn) : elements;
    };

    /**
     * Filters elements that have been processed once already.
     *
     * @param id
     *   A required string representing the name of the class which should be used
     *   when filtering the elements. This only filters elements that have already
     *   been processed by the once function. The id should be the same id that
     *   was originally passed to the once() function.
     * @param fn
     *   (Optional) If given, this function will be called for each element that
     *   has not yet been processed. The function's return value follows the same
     *   logic as $.each(). Returning true will continue to the next matched
     *   element in the set, while returning false will entirely break the
     *   iteration.
     */
    $.fn.removeOnce = function (id, fn) {
        var name = id + '-processed';
        var elements = this.filter('.' + name).removeClass(name);

        return $.isFunction(fn) ? elements.each(fn) : elements;
    };
})(jQuery);;

var Drupal = Drupal || {
    'settings': {},
    'behaviors': {},
    'locale': {}
};

// Allow other JavaScript libraries to use $.
jQuery.noConflict();

(function ($) {

    /**
     * Override jQuery.fn.init to guard against XSS attacks.
     *
     * See http://bugs.jquery.com/ticket/9521
     */
    var jquery_init = $.fn.init;
    $.fn.init = function (selector, context, rootjQuery) {
        // If the string contains a "#" before a "<", treat it as invalid HTML.
        if (selector && typeof selector === 'string') {
            var hash_position = selector.indexOf('#');
            if (hash_position >= 0) {
                var bracket_position = selector.indexOf('<');
                if (bracket_position > hash_position) {
                    throw 'Syntax error, unrecognized expression: ' + selector;
                }
            }
        }
        return jquery_init.call(this, selector, context, rootjQuery);
    };
    $.fn.init.prototype = jquery_init.prototype;

    /**
     * Pre-filter Ajax requests to guard against XSS attacks.
     *
     * See https://github.com/jquery/jquery/issues/2432
     */
    if ($.ajaxPrefilter) {
        // For newer versions of jQuery, use an Ajax prefilter to prevent
        // auto-executing script tags from untrusted domains. This is similar to the
        // fix that is built in to jQuery 3.0 and higher.
        $.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
                s.contents.script = false;
            }
        });
    } else if ($.httpData) {
        // For the version of jQuery that ships with Drupal core, override
        // jQuery.httpData to prevent auto-detecting "script" data types from
        // untrusted domains.
        var jquery_httpData = $.httpData;
        $.httpData = function (xhr, type, s) {
            // @todo Consider backporting code from newer jQuery versions to check for
            //   a cross-domain request here, rather than using Drupal.urlIsLocal() to
            //   block scripts from all URLs that are not on the same site.
            if (!type && !Drupal.urlIsLocal(s.url)) {
                var content_type = xhr.getResponseHeader('content-type') || '';
                if (content_type.indexOf('javascript') >= 0) {
                    // Default to a safe data type.
                    type = 'text';
                }
            }
            return jquery_httpData.call(this, xhr, type, s);
        };
        $.httpData.prototype = jquery_httpData.prototype;
    }

    /**
     * Attach all registered behaviors to a page element.
     *
     * Behaviors are event-triggered actions that attach to page elements, enhancing
     * default non-JavaScript UIs. Behaviors are registered in the Drupal.behaviors
     * object using the method 'attach' and optionally also 'detach' as follows:
     * @code
     *    Drupal.behaviors.behaviorName = {
     *      attach: function (context, settings) {
     *        ...
     *      },
     *      detach: function (context, settings, trigger) {
     *        ...
     *      }
     *    };
     * @endcode
     *
     * Drupal.attachBehaviors is added below to the jQuery ready event and so
     * runs on initial page load. Developers implementing AHAH/Ajax in their
     * solutions should also call this function after new page content has been
     * loaded, feeding in an element to be processed, in order to attach all
     * behaviors to the new content.
     *
     * Behaviors should use
     * @code
     *   $(selector).once('behavior-name', function () {
     *     ...
     *   });
     * @endcode
     * to ensure the behavior is attached only once to a given element. (Doing so
     * enables the reprocessing of given elements, which may be needed on occasion
     * despite the ability to limit behavior attachment to a particular element.)
     *
     * @param context
     *   An element to attach behaviors to. If none is given, the document element
     *   is used.
     * @param settings
     *   An object containing settings for the current context. If none given, the
     *   global Drupal.settings object is used.
     */
    Drupal.attachBehaviors = function (context, settings) {
        context = context || document;
        settings = settings || Drupal.settings;
        // Execute all of them.
        $.each(Drupal.behaviors, function () {
            if ($.isFunction(this.attach)) {
                this.attach(context, settings);
            }
        });
    };

    /**
     * Detach registered behaviors from a page element.
     *
     * Developers implementing AHAH/Ajax in their solutions should call this
     * function before page content is about to be removed, feeding in an element
     * to be processed, in order to allow special behaviors to detach from the
     * content.
     *
     * Such implementations should look for the class name that was added in their
     * corresponding Drupal.behaviors.behaviorName.attach implementation, i.e.
     * behaviorName-processed, to ensure the behavior is detached only from
     * previously processed elements.
     *
     * @param context
     *   An element to detach behaviors from. If none is given, the document element
     *   is used.
     * @param settings
     *   An object containing settings for the current context. If none given, the
     *   global Drupal.settings object is used.
     * @param trigger
     *   A string containing what's causing the behaviors to be detached. The
     *   possible triggers are:
     *   - unload: (default) The context element is being removed from the DOM.
     *   - move: The element is about to be moved within the DOM (for example,
     *     during a tabledrag row swap). After the move is completed,
     *     Drupal.attachBehaviors() is called, so that the behavior can undo
     *     whatever it did in response to the move. Many behaviors won't need to
     *     do anything simply in response to the element being moved, but because
     *     IFRAME elements reload their "src" when being moved within the DOM,
     *     behaviors bound to IFRAME elements (like WYSIWYG editors) may need to
     *     take some action.
     *   - serialize: When an Ajax form is submitted, this is called with the
     *     form as the context. This provides every behavior within the form an
     *     opportunity to ensure that the field elements have correct content
     *     in them before the form is serialized. The canonical use-case is so
     *     that WYSIWYG editors can update the hidden textarea to which they are
     *     bound.
     *
     * @see Drupal.attachBehaviors
     */
    Drupal.detachBehaviors = function (context, settings, trigger) {
        context = context || document;
        settings = settings || Drupal.settings;
        trigger = trigger || 'unload';
        // Execute all of them.
        $.each(Drupal.behaviors, function () {
            if ($.isFunction(this.detach)) {
                this.detach(context, settings, trigger);
            }
        });
    };

    /**
     * Encode special characters in a plain-text string for display as HTML.
     *
     * @ingroup sanitization
     */
    Drupal.checkPlain = function (str) {
        var character, regex,
            replace = {
                '&': '&amp;',
                "'": '&#39;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;'
            };
        str = String(str);
        for (character in replace) {
            if (replace.hasOwnProperty(character)) {
                regex = new RegExp(character, 'g');
                str = str.replace(regex, replace[character]);
            }
        }
        return str;
    };

    /**
     * Replace placeholders with sanitized values in a string.
     *
     * @param str
     *   A string with placeholders.
     * @param args
     *   An object of replacements pairs to make. Incidences of any key in this
     *   array are replaced with the corresponding value. Based on the first
     *   character of the key, the value is escaped and/or themed:
     *    - !variable: inserted as is
     *    - @variable: escape plain text to HTML (Drupal.checkPlain)
     *    - %variable: escape text and theme as a placeholder for user-submitted
     *      content (checkPlain + Drupal.theme('placeholder'))
     *
     * @see Drupal.t()
     * @ingroup sanitization
     */
    Drupal.formatString = function (str, args) {
        // Transform arguments before inserting them.
        for (var key in args) {
            if (args.hasOwnProperty(key)) {
                switch (key.charAt(0)) {
                    // Escaped only.
                    case '@':
                        args[key] = Drupal.checkPlain(args[key]);
                        break;
                    // Pass-through.
                    case '!':
                        break;
                    // Escaped and placeholder.
                    default:
                        args[key] = Drupal.theme('placeholder', args[key]);
                        break;
                }
            }
        }

        return Drupal.stringReplace(str, args, null);
    };

    /**
     * Replace substring.
     *
     * The longest keys will be tried first. Once a substring has been replaced,
     * its new value will not be searched again.
     *
     * @param {String} str
     *   A string with placeholders.
     * @param {Object} args
     *   Key-value pairs.
     * @param {Array|null} keys
     *   Array of keys from the "args".  Internal use only.
     *
     * @return {String}
     *   Returns the replaced string.
     */
    Drupal.stringReplace = function (str, args, keys) {
        if (str.length === 0) {
            return str;
        }

        // If the array of keys is not passed then collect the keys from the args.
        if (!$.isArray(keys)) {
            keys = [];
            for (var k in args) {
                if (args.hasOwnProperty(k)) {
                    keys.push(k);
                }
            }

            // Order the keys by the character length. The shortest one is the first.
            keys.sort(function (a, b) {
                return a.length - b.length;
            });
        }

        if (keys.length === 0) {
            return str;
        }

        // Take next longest one from the end.
        var key = keys.pop();
        var fragments = str.split(key);

        if (keys.length) {
            for (var i = 0; i < fragments.length; i++) {
                // Process each fragment with a copy of remaining keys.
                fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
            }
        }

        return fragments.join(args[key]);
    };

    /**
     * Translate strings to the page language or a given language.
     *
     * See the documentation of the server-side t() function for further details.
     *
     * @param str
     *   A string containing the English string to translate.
     * @param args
     *   An object of replacements pairs to make after translation. Incidences
     *   of any key in this array are replaced with the corresponding value.
     *   See Drupal.formatString().
     *
     * @param options
     *   - 'context' (defaults to the empty context): The context the source string
     *     belongs to.
     *
     * @return
     *   The translated string.
     */
    Drupal.t = function (str, args, options) {
        options = options || {};
        options.context = options.context || '';

        // Fetch the localized version of the string.
        if (Drupal.locale.strings && Drupal.locale.strings[options.context] && Drupal.locale.strings[options.context][str]) {
            str = Drupal.locale.strings[options.context][str];
        }

        if (args) {
            str = Drupal.formatString(str, args);
        }
        return str;
    };

    /**
     * Format a string containing a count of items.
     *
     * This function ensures that the string is pluralized correctly. Since Drupal.t() is
     * called by this function, make sure not to pass already-localized strings to it.
     *
     * See the documentation of the server-side format_plural() function for further details.
     *
     * @param count
     *   The item count to display.
     * @param singular
     *   The string for the singular case. Please make sure it is clear this is
     *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
     *   Do not use @count in the singular string.
     * @param plural
     *   The string for the plural case. Please make sure it is clear this is plural,
     *   to ease translation. Use @count in place of the item count, as in "@count
     *   new comments".
     * @param args
     *   An object of replacements pairs to make after translation. Incidences
     *   of any key in this array are replaced with the corresponding value.
     *   See Drupal.formatString().
     *   Note that you do not need to include @count in this array.
     *   This replacement is done automatically for the plural case.
     * @param options
     *   The options to pass to the Drupal.t() function.
     * @return
     *   A translated string.
     */
    Drupal.formatPlural = function (count, singular, plural, args, options) {
        args = args || {};
        args['@count'] = count;
        // Determine the index of the plural form.
        var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);

        if (index == 0) {
            return Drupal.t(singular, args, options);
        } else if (index == 1) {
            return Drupal.t(plural, args, options);
        } else {
            args['@count[' + index + ']'] = args['@count'];
            delete args['@count'];
            return Drupal.t(plural.replace('@count', '@count[' + index + ']'), args, options);
        }
    };

    /**
     * Returns the passed in URL as an absolute URL.
     *
     * @param url
     *   The URL string to be normalized to an absolute URL.
     *
     * @return
     *   The normalized, absolute URL.
     *
     * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
     * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
     * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L53
     */
    Drupal.absoluteUrl = function (url) {
        var urlParsingNode = document.createElement('a');

        // Decode the URL first; this is required by IE <= 6. Decoding non-UTF-8
        // strings may throw an exception.
        try {
            url = decodeURIComponent(url);
        } catch (e) { }

        urlParsingNode.setAttribute('href', url);

        // IE <= 7 normalizes the URL when assigned to the anchor node similar to
        // the other browsers.
        return urlParsingNode.cloneNode(false).href;
    };

    /**
     * Returns true if the URL is within Drupal's base path.
     *
     * @param url
     *   The URL string to be tested.
     *
     * @return
     *   Boolean true if local.
     *
     * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
     */
    Drupal.urlIsLocal = function (url) {
        // Always use browser-derived absolute URLs in the comparison, to avoid
        // attempts to break out of the base path using directory traversal.
        var absoluteUrl = Drupal.absoluteUrl(url);
        var protocol = location.protocol;

        // Consider URLs that match this site's base URL but use HTTPS instead of HTTP
        // as local as well.
        if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
            protocol = 'https:';
        }
        var baseUrl = protocol + '//' + location.host + Drupal.settings.basePath.slice(0, -1);

        // Decoding non-UTF-8 strings may throw an exception.
        try {
            absoluteUrl = decodeURIComponent(absoluteUrl);
        } catch (e) { }
        try {
            baseUrl = decodeURIComponent(baseUrl);
        } catch (e) { }

        // The given URL matches the site's base URL, or has a path under the site's
        // base URL.
        return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0;
    };

    /**
     * Generate the themed representation of a Drupal object.
     *
     * All requests for themed output must go through this function. It examines
     * the request and routes it to the appropriate theme function. If the current
     * theme does not provide an override function, the generic theme function is
     * called.
     *
     * For example, to retrieve the HTML for text that should be emphasized and
     * displayed as a placeholder inside a sentence, call
     * Drupal.theme('placeholder', text).
     *
     * @param func
     *   The name of the theme function to call.
     * @param ...
     *   Additional arguments to pass along to the theme function.
     * @return
     *   Any data the theme function returns. This could be a plain HTML string,
     *   but also a complex object.
     */
    Drupal.theme = function (func) {
        var args = Array.prototype.slice.apply(arguments, [1]);

        return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args);
    };

    /**
     * Freeze the current body height (as minimum height). Used to prevent
     * unnecessary upwards scrolling when doing DOM manipulations.
     */
    Drupal.freezeHeight = function () {
        Drupal.unfreezeHeight();
        $('<div id="freeze-height"></div>').css({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '1px',
            height: $('body').css('height')
        }).appendTo('body');
    };

    /**
     * Unfreeze the body height.
     */
    Drupal.unfreezeHeight = function () {
        $('#freeze-height').remove();
    };

    /**
     * Encodes a Drupal path for use in a URL.
     *
     * For aesthetic reasons slashes are not escaped.
     */
    Drupal.encodePath = function (item, uri) {
        uri = uri || location.href;
        return encodeURIComponent(item).replace(/%2F/g, '/');
    };

    /**
     * Get the text selection in a textarea.
     */
    Drupal.getSelection = function (element) {
        if (typeof element.selectionStart != 'number' && document.selection) {
            // The current selection.
            var range1 = document.selection.createRange();
            var range2 = range1.duplicate();
            // Select all text.
            range2.moveToElementText(element);
            // Now move 'dummy' end point to end point of original range.
            range2.setEndPoint('EndToEnd', range1);
            // Now we can calculate start and end points.
            var start = range2.text.length - range1.text.length;
            var end = start + range1.text.length;
            return {
                'start': start,
                'end': end
            };
        }
        return {
            'start': element.selectionStart,
            'end': element.selectionEnd
        };
    };

    /**
     * Add a global variable which determines if the window is being unloaded.
     *
     * This is primarily used by Drupal.displayAjaxError().
     */
    Drupal.beforeUnloadCalled = false;
    $(window).bind('beforeunload pagehide', function () {
        Drupal.beforeUnloadCalled = true;
    });

    /**
     * Displays a JavaScript error from an Ajax response when appropriate to do so.
     */
    Drupal.displayAjaxError = function (message) {
        // Skip displaying the message if the user deliberately aborted (for example,
        // by reloading the page or navigating to a different page) while the Ajax
        // request was still ongoing. See, for example, the discussion at
        // http://stackoverflow.com/questions/699941/handle-ajax-error-when-a-user-clicks-refresh.
        if (!Drupal.beforeUnloadCalled) {
            alert(message);
        }
    };

    /**
     * Build an error message from an Ajax response.
     */
    Drupal.ajaxError = function (xmlhttp, uri, customMessage) {
        var statusCode, statusText, pathText, responseText, readyStateText, message;
        if (xmlhttp.status) {
            statusCode = "\n" + Drupal.t("An AJAX HTTP error occurred.") + "\n" + Drupal.t("HTTP Result Code: !status", {
                '!status': xmlhttp.status
            });
        } else {
            statusCode = "\n" + Drupal.t("An AJAX HTTP request terminated abnormally.");
        }
        statusCode += "\n" + Drupal.t("Debugging information follows.");
        pathText = "\n" + Drupal.t("Path: !uri", {
            '!uri': uri
        });
        statusText = '';
        // In some cases, when statusCode == 0, xmlhttp.statusText may not be defined.
        // Unfortunately, testing for it with typeof, etc, doesn't seem to catch that
        // and the test causes an exception. So we need to catch the exception here.
        try {
            statusText = "\n" + Drupal.t("StatusText: !statusText", {
                '!statusText': $.trim(xmlhttp.statusText)
            });
        } catch (e) { }

        responseText = '';
        // Again, we don't have a way to know for sure whether accessing
        // xmlhttp.responseText is going to throw an exception. So we'll catch it.
        try {
            responseText = "\n" + Drupal.t("ResponseText: !responseText", {
                '!responseText': $.trim(xmlhttp.responseText)
            });
        } catch (e) { }

        // Make the responseText more readable by stripping HTML tags and newlines.
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
        responseText = responseText.replace(/[\n]+\s+/g, "\n");

        // We don't need readyState except for status == 0.
        readyStateText = xmlhttp.status == 0 ? ("\n" + Drupal.t("ReadyState: !readyState", {
            '!readyState': xmlhttp.readyState
        })) : "";

        // Additional message beyond what the xmlhttp object provides.
        customMessage = customMessage ? ("\n" + Drupal.t("CustomMessage: !customMessage", {
            '!customMessage': customMessage
        })) : "";

        message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        return message;
    };

    // Class indicating that JS is enabled; used for styling purpose.
    $('html').addClass('js');

    // 'js enabled' cookie.
    document.cookie = 'has_js=1; path=/';

    /**
     * Additions to jQuery.support.
     */
    $(function () {
        /**
         * Boolean indicating whether or not position:fixed is supported.
         */
        if (jQuery.support.positionFixed === undefined) {
            var el = $('<div style="position:fixed; top:10px" />').appendTo(document.body);
            jQuery.support.positionFixed = el[0].offsetTop === 10;
            el.remove();
        }
    });

    //Attach all behaviors.
    $(function () {
        Drupal.attachBehaviors(document, Drupal.settings);
    });

    /**
     * The default themes.
     */
    Drupal.theme.prototype = {

        /**
         * Formats text for emphasized display in a placeholder inside a sentence.
         *
         * @param str
         *   The text to format (plain-text).
         * @return
         *   The formatted text (html).
         */
        placeholder: function (str) {
            return '<em class="placeholder">' + Drupal.checkPlain(str) + '</em>';
        }
    };

})(jQuery);;