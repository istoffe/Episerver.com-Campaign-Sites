function IsValidEmail(n) {
    return n.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) > -1 ? !0 : !1
}
function Block(n) {
    blockedElement = n,
    CreateLoadingIndicatorDiv(n),
    $(n).block({
        message: $("#loadingIndicator"),
        css: {
            top: ($(window).height() - 400) / 2 + "px",
            left: ($(window).width() - 400) / 2 + "px",
            width: "400px",
            border: 0
        },
        overlayCSS: {
            backgroundColor: "transparent"
        }
    })
}
function CreateLoadingIndicatorDiv(n) {
    $(n).append("<div id='loadingIndicator' />")
}
function Unblock() {
    $(blockedElement).unblock(),
    $("#loadingIndicator").remove()
}
function IsNullOrEmpty(n) {
    return n == null || n.length < 1 ? !0 : !1
}
function IsCharacter(n) {
    return n.keyCode > 47 && n.keyCode < 91 || n.keyCode > 47 && n.keyCode < 91 || n.keyCode == 32 || n.keyCode == 8 || n.keyCode == 46
}
function IsTab(n) {
    return n.keyCode === 9
}
function getCookie(n) {
    for (var r = n + "=", u = document.cookie.split(";"), t, i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " "; )
            t = t.substring(1);
        if (t.indexOf(r) == 0)
            return t.substring(r.length, t.length)
    }
    return ""
}
function setCookie(n, t, i) {
    var r = new Date, u;
    r.setTime(r.getTime() + i * 864e5),
    u = "expires=" + r.toUTCString(),
    document.cookie = n + "=" + t + "; " + u
}
function setSessionCookie(n, t) {
    var i = "expires=0";
    document.cookie = n + "=" + t + "; " + i + "; path=/"
}
function getCookieValue(n, t) {
    for (var f = n.split("%3b"), i, r = 0; r < f.length; r++) {
        for (i = f[r]; i.charAt(0) == " "; )
            i = i.substring(1);
        if (i.indexOf(t) == 0) {
            var u = i.substring(name.length, i.length)
              , e = u.indexOf("%3a") + 3
              , o = u.substring(e, u.length).replace(/\+/g, "%20");
            return decodeURIComponent(o)
        }
    }
    return ""
}
function getQueryVariable(n) {
    for (var u = window.location.search.substring(1), r = u.split("&"), i, t = 0; t < r.length; t++)
        if (i = r[t].split("="),
        i[0] == n)
            return i[1];
    return !1
}
function getParameterByName(n) {
    n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var i = new RegExp("[\\?&]" + n + "=([^&#]*)")
      , t = i.exec(location.search);
    return t === null ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
}
function ValidateDownloadForm() {
    var n = !0;
    return $(".leadGenerationArea .requiredfield").each(function() {
        ValidateWithEvents(this) || (n = !1)
    }),
    n
}
function InitToolTips() {
    $(".partnerPicture").each(function() {
        var n = $(this).parent().parent().parent()
          , t = $(this);
        n.qtip({
            overwrite: !0,
            content: {
                text: n.children(".jsPartnerData")
            },
            show: {
                effect: function() {
                    $(this).fadeIn(400)
                },
                target: t
            },
            hide: "mouseout",
            style: "pop-success",
            position: {
                my: "bottomMiddle",
                at: "topMiddle",
                target: $(n),
                effect: !1
            },
            tip: {
                position: "bottomMiddle"
            }
        })
    })
}
function Validate(n) {
    var i = GetElementText(n), t;
    return $(n).hasClass("jsTypeNumeric") ? t = !isNaN(i) : $(n).hasClass("jsTypeEmail") ? t = IsValidEmail(i) : $(n).hasClass("jsTypeCheckBox") ? t = $(n).attr("checked") : $(n).hasClass("jsTypeMinLength5") ? t = i.length > 4 : i && (t = i.length > 0),
    t ? SetValidated(n) : SetInvalidated(n),
    t
}
function ValidateWithEvents(n) {
    var i = GetElementText(n), t;
    return $(n).hasClass("jsTypeNumeric") ? t = !isNaN(i) : $(n).hasClass("jsTypeEmail") ? t = IsValidEmail(i) : $(n).hasClass("jsTypeCheckBox") ? t = $(n).attr("checked") : $(n).hasClass("jsTypeMinLength5") ? t = i.length > 4 : i && (t = i.length > 0),
    t ? SetValidated(n) : SetInvalidated(n),
    t
}
function GetElementText(n) {
    return $(n).is("input") || $(n).is("select") ? $(n).val() : ""
}
function SetInvalidated(n) {
    $(n).removeClass("success"),
    $(n).addClass("error")
}
function SetValidated(n) {
    $(n).addClass("success"),
    $(n).removeClass("error")
}
function ResizeImage(n) {
    Resize($(n), $(n).parent())
}
function Resize(n, t) {
    var i = t, h = t.width(), c = t.height(), r = n.width() / n.height(), u = h / c, f, e, o, s;
    r > u ? (f = i.width() * n.height() / n.width(),
    SetSize(n, i.width(), f)) : r < u ? (e = i.height() * n.width() / n.height(),
    SetSize(n, e, i.height())) : SetSize(n, i.width(), i.height()),
    o = ($(n).parent().height() - $(n).height()) / 2,
    s = ($(n).parent().width() - $(n).width()) / 2,
    $(n).css("margin-top", o + "px"),
    $(n).css("margin-left", s + "px")
}
function SetSize(n, t, i) {
    $(n).attr("width", t + "px"),
    $(n).attr("height", i + "px")
}
var agendaInit, blockedElement, Base64, storyHover, typedAnim, wistiaLoadCallback, JSON;
jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
function(n, t, i) {
    function r(i) {
        o[i] || (o[i] = !0,
        n.migrateWarnings.push(i),
        t.console && console.warn && !n.migrateMute && (console.warn("JQMIGRATE: " + i),
        n.migrateTrace && console.trace && console.trace()))
    }
    function e(t, u, f, e) {
        if (Object.defineProperty)
            try {
                return Object.defineProperty(t, u, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return r(e),
                        f
                    },
                    set: function(n) {
                        r(e),
                        f = n
                    }
                }),
                i
            } catch (o) {}
        n._definePropertyBroken = !0,
        t[u] = f
    }
    var o = {}, l, a, v;
    n.migrateWarnings = [],
    !n.migrateMute && t.console && console.log && console.log("JQMIGRATE: Logging is active"),
    n.migrateTrace === i && (n.migrateTrace = !0),
    n.migrateReset = function() {
        o = {},
        n.migrateWarnings.length = 0
    }
    ,
    "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
    var s = n("<input/>", {
        size: 1
    }).attr("size") && n.attrFn
      , h = n.attr
      , g = n.attrHooks.value && n.attrHooks.value.get || function() {
        return null
    }
      , nt = n.attrHooks.value && n.attrHooks.value.set || function() {
        return i
    }
      , tt = /^(?:input|button)$/i
      , it = /^[238]$/
      , rt = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
      , ut = /^(?:checked|selected)$/i;
    e(n, "attrFn", s || {}, "jQuery.attrFn is deprecated"),
    n.attr = function(t, u, f, e) {
        var o = u.toLowerCase()
          , c = t && t.nodeType;
        return e && (4 > h.length && r("jQuery.fn.attr( props, pass ) is deprecated"),
        t && !it.test(c) && (s ? u in s : n.isFunction(n.fn[u]))) ? n(t)[u](f) : ("type" === u && f !== i && tt.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"),
        !n.attrHooks[o] && rt.test(o) && (n.attrHooks[o] = {
            get: function(t, r) {
                var u, f = n.prop(t, r);
                return f === !0 || "boolean" != typeof f && (u = t.getAttributeNode(r)) && u.nodeValue !== !1 ? r.toLowerCase() : i
            },
            set: function(t, i, r) {
                var u;
                return i === !1 ? n.removeAttr(t, r) : (u = n.propFix[r] || r,
                u in t && (t[u] = !0),
                t.setAttribute(r, r.toLowerCase())),
                r
            }
        },
        ut.test(o) && r("jQuery.fn.attr('" + o + "') may use property instead of attribute")),
        h.call(n, t, u, f))
    }
    ,
    n.attrHooks.value = {
        get: function(n, t) {
            var i = (n.nodeName || "").toLowerCase();
            return "button" === i ? g.apply(this, arguments) : ("input" !== i && "option" !== i && r("jQuery.fn.attr('value') no longer gets properties"),
            t in n ? n.value : null)
        },
        set: function(n, t) {
            var u = (n.nodeName || "").toLowerCase();
            return "button" === u ? nt.apply(this, arguments) : ("input" !== u && "option" !== u && r("jQuery.fn.attr('value', val) no longer sets properties"),
            n.value = t,
            i)
        }
    };
    var f, u, c = n.fn.init, ft = n.parseJSON, et = /^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;
    n.fn.init = function(t, i, u) {
        var f;
        return t && "string" == typeof t && !n.isPlainObject(i) && (f = et.exec(t)) && f[1] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"),
        i && i.context && (i = i.context),
        n.parseHTML) ? c.call(this, n.parseHTML(n.trim(t), i, !0), i, u) : c.apply(this, arguments)
    }
    ,
    n.fn.init.prototype = n.fn,
    n.parseJSON = function(n) {
        return n || null === n ? ft.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"),
        null)
    }
    ,
    n.uaMatch = function(n) {
        n = n.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(n) || /(webkit)[ \/]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || 0 > n.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [];
        return {
            browser: t[1] || "",
            version: t[2] || "0"
        }
    }
    ,
    n.browser || (f = n.uaMatch(navigator.userAgent),
    u = {},
    f.browser && (u[f.browser] = !0,
    u.version = f.version),
    u.chrome ? u.webkit = !0 : u.webkit && (u.safari = !0),
    n.browser = u),
    e(n, "browser", n.browser, "jQuery.browser is deprecated"),
    n.sub = function() {
        function t(n, i) {
            return new t.fn.init(n,i)
        }
        n.extend(!0, t, this),
        t.superclass = this,
        t.fn = t.prototype = this(),
        t.fn.constructor = t,
        t.sub = this.sub,
        t.fn.init = function(r, u) {
            return u && u instanceof n && !(u instanceof t) && (u = t(u)),
            n.fn.init.call(this, r, u, i)
        }
        ,
        t.fn.init.prototype = t.fn;
        var i = t(document);
        return r("jQuery.sub() is deprecated"),
        t
    }
    ,
    n.ajaxSetup({
        converters: {
            "text json": n.parseJSON
        }
    }),
    l = n.fn.data,
    n.fn.data = function(t) {
        var f, u, e = this[0];
        return !e || "events" !== t || 1 !== arguments.length || (f = n.data(e, t),
        u = n._data(e, t),
        f !== i && f !== u || u === i) ? l.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"),
        u)
    }
    ,
    a = /\/(java|ecma)script/i,
    v = n.fn.andSelf || n.fn.addBack,
    n.fn.andSelf = function() {
        return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),
        v.apply(this, arguments)
    }
    ,
    n.clean || (n.clean = function(t, u, f, e) {
        u = u || document,
        u = !u.nodeType && u[0] || u,
        u = u.ownerDocument || u,
        r("jQuery.clean() is deprecated");
        var s, o, c, l, h = [];
        if (n.merge(h, n.buildFragment(t, u).childNodes),
        f)
            for (c = function(n) {
                return !n.type || a.test(n.type) ? e ? e.push(n.parentNode ? n.parentNode.removeChild(n) : n) : f.appendChild(n) : i
            }
            ,
            s = 0; null != (o = h[s]); s++)
                n.nodeName(o, "script") && c(o) || (f.appendChild(o),
                o.getElementsByTagName !== i && (l = n.grep(n.merge([], o.getElementsByTagName("script")), c),
                h.splice.apply(h, [s + 1, 0].concat(l)),
                s += l.length));
        return h
    }
    );
    var ot = n.event.add
      , st = n.event.remove
      , ht = n.event.trigger
      , ct = n.fn.toggle
      , y = n.fn.live
      , p = n.fn.die
      , w = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess"
      , b = RegExp("\\b(?:" + w + ")\\b")
      , k = /(?:^|\s)hover(\.\S+|)\b/
      , d = function(t) {
        return "string" != typeof t || n.event.special.hover ? t : (k.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),
        t && t.replace(k, "mouseenter$1 mouseleave$1"))
    };
    n.event.props && "attrChange" !== n.event.props[0] && n.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"),
    n.event.dispatch && e(n.event, "handle", n.event.dispatch, "jQuery.event.handle is undocumented and deprecated"),
    n.event.add = function(n, t, i, u, f) {
        n !== document && b.test(t) && r("AJAX events should be attached to document: " + t),
        ot.call(this, n, d(t || ""), i, u, f)
    }
    ,
    n.event.remove = function(n, t, i, r, u) {
        st.call(this, n, d(t) || "", i, r, u)
    }
    ,
    n.fn.error = function() {
        var n = Array.prototype.slice.call(arguments, 0);
        return r("jQuery.fn.error() is deprecated"),
        n.splice(0, 0, "error"),
        arguments.length ? this.bind.apply(this, n) : (this.triggerHandler.apply(this, n),
        this)
    }
    ,
    n.fn.toggle = function(t, i) {
        if (!n.isFunction(t) || !n.isFunction(i))
            return ct.apply(this, arguments);
        r("jQuery.fn.toggle(handler, handler...) is deprecated");
        var u = arguments
          , e = t.guid || n.guid++
          , f = 0
          , o = function(i) {
            var r = (n._data(this, "lastToggle" + t.guid) || 0) % f;
            return n._data(this, "lastToggle" + t.guid, r + 1),
            i.preventDefault(),
            u[r].apply(this, arguments) || !1
        };
        for (o.guid = e; u.length > f; )
            u[f++].guid = e;
        return this.click(o)
    }
    ,
    n.fn.live = function(t, i, u) {
        return r("jQuery.fn.live() is deprecated"),
        y ? y.apply(this, arguments) : (n(this.context).on(t, this.selector, i, u),
        this)
    }
    ,
    n.fn.die = function(t, i) {
        return r("jQuery.fn.die() is deprecated"),
        p ? p.apply(this, arguments) : (n(this.context).off(t, this.selector || "**", i),
        this)
    }
    ,
    n.event.trigger = function(n, t, i, u) {
        return i || b.test(n) || r("Global events are undocumented and deprecated"),
        ht.call(this, n, t, i || document, u)
    }
    ,
    n.each(w.split("|"), function(t, i) {
        n.event.special[i] = {
            setup: function() {
                var t = this;
                return t !== document && (n.event.add(document, i + "." + n.guid, function() {
                    n.event.trigger(i, null, t, !0)
                }),
                n._data(this, i, n.guid++)),
                !1
            },
            teardown: function() {
                return this !== document && n.event.remove(document, i + "." + n._data(this, i)),
                !1
            }
        }
    })
}(jQuery, window),
jQuery(function() {
    $("a[href*=\\#]:not([href=\\#]).scroll").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var n = $(this.hash);
            if (n = n.length ? n : $("[name=" + this.hash.slice(1) + "]"),
            n.length)
                return $("html, body, main, #homepage").animate({
                    scrollTop: n.offset().top - 10
                }, 1e3),
                !1
        }
    })
}),
function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length)
                return t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."),
                void 0;
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"),
            i = new n.validator(t,this[0]),
            n.data(this[0], "validator", i),
            i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target),
                n(t.target).hasClass("cancel") && (i.cancelSubmit = !0),
                void 0 !== n(t.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            }),
            this.submit(function(t) {
                function r() {
                    var r;
                    return i.settings.submitHandler ? (i.submitButton && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)),
                    i.settings.submitHandler.call(i, i.currentForm, t),
                    i.submitButton && r.remove(),
                    !1) : !0
                }
                return i.settings.debug && t.preventDefault(),
                i.cancelSubmit ? (i.cancelSubmit = !1,
                r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0,
                !1) : r() : (i.focusInvalid(),
                !1)
            })),
            i)
        },
        valid: function() {
            if (n(this[0]).is("form"))
                return this.validate().form();
            var t = !0
              , i = n(this[0].form).validate();
            return this.each(function() {
                t = t && i.element(this)
            }),
            t
        },
        removeAttrs: function(t) {
            var i = {}
              , r = this;
            return n.each(t.split(/\s/), function(n, t) {
                i[t] = r.attr(t),
                r.removeAttr(t)
            }),
            i
        },
        rules: function(t, i) {
            var r = this[0], o, u, h;
            if (t) {
                var e = n.data(r.form, "validator").settings
                  , s = e.rules
                  , f = n.validator.staticRules(r);
                switch (t) {
                case "add":
                    n.extend(f, n.validator.normalizeRule(i)),
                    delete f.messages,
                    s[r.name] = f,
                    i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                    break;
                case "remove":
                    return i ? (o = {},
                    n.each(i.split(/\s/), function(n, t) {
                        o[t] = f[t],
                        delete f[t]
                    }),
                    o) : (delete s[r.name],
                    f)
                }
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r),
            u.required && (h = u.required,
            delete u.required,
            u = n.extend({
                required: h
            }, u)),
            u
        }
    }),
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    }),
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t),
        this.currentForm = i,
        this.init()
    }
    ,
    n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t),
            n.validator.format.apply(this, i)
        }
        : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)),
        i.constructor !== Array && (i = [i]),
        n.each(i, function(n, i) {
            t = t.replace(RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }),
        t)
    }
    ,
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n,
                this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass),
                this.addWrapper(this.errorsFor(n)).hide())
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(n, t) {
                (9 !== t.which || "" !== this.elementValue(n)) && (n.name in this.submitted || n === this.lastElement) && this.element(n)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
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
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var i = n.data(this[0].form, "validator")
                      , r = "on" + t.type.replace(/^validate/, "");
                    i.settings[r] && i.settings[r].call(i, this[0], t)
                }
                var r, t;
                this.labelContainer = n(this.settings.errorLabelContainer),
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm),
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                this.submitted = {},
                this.valueCache = {},
                this.pendingRequest = 0,
                this.pending = {},
                this.invalid = {},
                this.reset(),
                r = this.groups = {},
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/)),
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                }),
                t = this.settings.rules,
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                }),
                n(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", i).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", i),
                this.settings.invalidHandler && n(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(),
                n.extend(this.submitted, this.errorMap),
                this.invalid = n.extend({}, this.errorMap),
                this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]),
                this.showErrors(),
                this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++)
                    this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                t = this.validationTargetFor(this.clean(t)),
                this.lastElement = t,
                this.prepareElement(t),
                this.currentElements = n(t);
                var i = this.check(t) !== !1;
                return i ? delete this.invalid[t.name] : this.invalid[t.name] = !0,
                this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                this.showErrors(),
                i
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t),
                    this.errorList = [];
                    for (var i in t)
                        this.errorList.push({
                            message: t[i],
                            element: this.findByName(i)[0]
                        });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm(),
                this.submitted = {},
                this.lastElement = null,
                this.prepareForm(),
                this.hideErrors(),
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var t = 0, i;
                for (i in n)
                    t++;
                return t
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this
                  , i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this),
                    this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0,
                    !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.replace(" ", ".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [],
                this.errorList = [],
                this.errorMap = {},
                this.toShow = n([]),
                this.toHide = n([]),
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset(),
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset(),
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var r = n(t).attr("type")
                  , i = n(t).val();
                return "radio" === r || "checkbox" === r ? n("input[name='" + n(t).attr("name") + "']:checked").val() : "string" == typeof i ? i.replace(/\r/g, "") : i
            },
            check: function(t) {
                var r, u;
                t = this.validationTargetFor(this.clean(t));
                var i, f = n(t).rules(), e = !1, o = this.elementValue(t);
                for (r in f) {
                    u = {
                        method: r,
                        parameters: f[r]
                    };
                    try {
                        if (i = n.validator.methods[r].call(this, o, t, u.parameters),
                        "dependency-mismatch" === i) {
                            e = !0;
                            continue
                        }
                        if (e = !1,
                        "pending" === i)
                            return this.toHide = this.toHide.not(this.errorsFor(t)),
                            void 0;
                        if (!i)
                            return this.formatAndAdd(t, u),
                            !1
                    } catch (s) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + u.method + "' method.", s),
                        s;
                    }
                }
                if (!e)
                    return this.objectLength(f) && this.successList.push(t),
                    !0
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg-" + i.toLowerCase()) || t.attributes && n(t).attr("data-msg-" + i.toLowerCase())
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; arguments.length > n; n++)
                    if (void 0 !== arguments[n])
                        return arguments[n];
                return void 0
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method)
                  , u = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters)),
                this.errorList.push({
                    message: r,
                    element: t
                }),
                this.errorMap[t.name] = r,
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))),
                n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++)
                    t = this.errorList[n],
                    this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass),
                    this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                this.settings.success)
                    for (n = 0; this.successList[n]; n++)
                        this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0,
                    i = this.validElements(); i[n]; n++)
                        this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow),
                this.hideErrors(),
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var r = this.errorsFor(t);
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("for", this.idOrName(t)).addClass(this.settings.errorClass).html(i || ""),
                this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, n(t)) : r.insertAfter(t))),
                !i && this.settings.success && (r.text(""),
                "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t)),
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var i = this.idOrName(t);
                return this.errors().filter(function() {
                    return n(this).attr("for") === i
                })
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(n) {
                return this.checkable(n) && (n = this.findByName(n.name).not(this.settings.ignore)[0]),
                n
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                case "select":
                    return n("option:selected", i).length;
                case "input":
                    if (this.checkable(i))
                        return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++,
                this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--,
                0 > this.pendingRequest && (this.pendingRequest = 0),
                delete this.pending[t.name],
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(),
                this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]),
                this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {}
              , r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }),
            i
        },
        attributeRules: function(t) {
            var u = {}, e = n(t), f = e[0].getAttribute("type"), r, i;
            for (r in n.validator.methods)
                "required" === r ? (i = e.get(0).getAttribute(r),
                "" === i && (i = !0),
                i = !!i) : i = e.attr(r),
                /min|max/.test(r) && (null === f || /number|range|text/.test(f)) && (i = Number(i)),
                i ? u[r] = i : f === r && "range" !== f && (u[r] = !0);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength,
            u
        },
        dataRules: function(t) {
            var i, r, u = {}, f = n(t);
            for (i in n.validator.methods)
                r = f.data("rule-" + i.toLowerCase()),
                void 0 !== r && (u[i] = r);
            return u
        },
        staticRules: function(t) {
            var i = {}
              , r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}),
            i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1)
                    return delete t[r],
                    void 0;
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                    case "string":
                        f = !!n(u.depends, i.form).length;
                        break;
                    case "function":
                        f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                }
            }),
            n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }),
            n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }),
            n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].split(/[\s,]+/),
                t[this] = [Number(i[0]), Number(i[1])]))
            }),
            n.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max],
            delete t.min,
            delete t.max),
            t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength],
            delete t.minlength,
            delete t.maxlength)),
            t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                }),
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i,
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t],
            3 > i.length && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i))
                    return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : n.trim(t).length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test("" + new Date(n))
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                var r, e;
                if (this.optional(t))
                    return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n))
                    return !1;
                var f = 0
                  , i = 0
                  , u = !1;
                for (n = n.replace(/\D/g, ""),
                r = n.length - 1; r >= 0; r--)
                    e = n.charAt(r),
                    i = parseInt(e, 10),
                    u && (i *= 2) > 9 && (i -= 9),
                    f += i,
                    u = !u;
                return 0 == f % 10
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || r >= u
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(n.trim(t), i);
                return this.optional(i) || u >= r[0] && r[1] >= u
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || i >= n
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && i[1] >= n
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    n(i).valid()
                }),
                t === u.val()
            },
            remote: function(t, i, r) {
                var f, u, e;
                return this.optional(i) ? "dependency-mismatch" : (f = this.previousValue(i),
                this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
                f.originalMessage = this.settings.messages[i.name].remote,
                this.settings.messages[i.name].remote = f.message,
                r = "string" == typeof r && {
                    url: r
                } || r,
                f.old === t) ? f.valid : (f.old = t,
                u = this,
                this.startRequest(i),
                e = {},
                e[i.name] = t,
                n.ajax(n.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    success: function(r) {
                        var e, h, s, o;
                        u.settings.messages[i.name].remote = f.originalMessage,
                        e = r === !0 || "true" === r,
                        e ? (h = u.formSubmitted,
                        u.prepareElement(i),
                        u.formSubmitted = h,
                        u.successList.push(i),
                        delete u.invalid[i.name],
                        u.showErrors()) : (s = {},
                        o = r || u.defaultMessage(i, "remote"),
                        s[i.name] = f.message = n.isFunction(o) ? o(t) : o,
                        u.invalid[i.name] = !0,
                        u.showErrors(s)),
                        f.valid = e,
                        u.stopRequest(i, e)
                    }
                }, r)),
                "pending")
            }
        }
    }),
    n.format = n.validator.format
}(jQuery),
function(n) {
    var t = {}, i;
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(),
        t[u] = r)
    }) : (i = n.ajax,
    n.ajax = function(r) {
        var f = ("mode"in r ? r : n.ajaxSettings).mode
          , u = ("port"in r ? r : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(),
        t[u] = i.apply(this, arguments),
        t[u]) : i.apply(this, arguments)
    }
    )
}(jQuery),
function(n) {
    n.extend(n.fn, {
        validateDelegate: function(t, i, r) {
            return this.bind(i, function(i) {
                var u = n(i.target);
                if (u.is(t))
                    return r.apply(u, arguments)
            })
        }
    })
}(jQuery),
function(n) {
    function i(n, t, i) {
        n.rules[t] = i,
        n.message && (n.messages[t] = n.message)
    }
    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }
    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }
    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }
    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)),
        n
    }
    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']")
          , u = r.attr("data-valmsg-replace")
          , e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error"),
        t.data("unobtrusiveContainer", r),
        e ? (r.empty(),
        t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }
    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]")
          , r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(),
        u.addClass("validation-summary-errors").removeClass("validation-summary-valid"),
        n.each(i.errorList, function() {
            n("<li />").html(this.message).appendTo(r)
        }))
    }
    function a(t) {
        var i = t.data("unobtrusiveContainer")
          , r = i.attr("data-valmsg-replace")
          , u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"),
        t.removeData("unobtrusiveContainer"),
        u && i.empty())
    }
    function v() {
        var t = n(this);
        t.data("validator").resetForm(),
        t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors"),
        t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
    }
    function s(t) {
        var i = n(t)
          , r = i.data(u)
          , f = n.proxy(v, t);
        return r || (r = {
            options: {
                errorClass: "input-validation-error",
                errorElement: "span",
                errorPlacement: n.proxy(c, t),
                invalidHandler: n.proxy(l, t),
                messages: {},
                rules: {},
                success: n.proxy(a, t)
            },
            attachValidation: function() {
                i.unbind("reset." + u, f).bind("reset." + u, f).validate(this.options)
            },
            validate: function() {
                return i.validate(),
                i.valid()
            }
        },
        i.data(u, r)),
        r
    }
    var r = n.validator, t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [],
        parseElement: function(t, i) {
            var u = n(t), f = u.parents("form")[0], r, e, o;
            f && (r = s(f),
            r.options.rules[t.name] = e = {},
            r.options.messages[t.name] = o = {},
            n.each(this.adapters, function() {
                var i = "data-val-" + this.name
                  , r = u.attr(i)
                  , s = {};
                r !== undefined && (i += "-",
                n.each(this.params, function() {
                    s[this] = u.attr(i + this)
                }),
                this.adapt({
                    element: t,
                    form: f,
                    message: r,
                    params: s,
                    rules: e,
                    messages: o
                }))
            }),
            n.extend(e, {
                __dummy__: !0
            }),
            i || r.attachValidation())
        },
        parse: function(t) {
            var i = n(t).parents("form").andSelf().add(n(t).find("form")).filter("form");
            n(t).find(":input[data-val=true]").each(function() {
                r.unobtrusive.parseElement(this, !0)
            }),
            i.each(function() {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    },
    t = r.unobtrusive.adapters,
    t.add = function(n, t, i) {
        return i || (i = t,
        t = []),
        this.push({
            name: n,
            params: t,
            adapt: i
        }),
        this
    }
    ,
    t.addBool = function(n, t) {
        return this.add(n, function(r) {
            i(r, t || n, !0)
        })
    }
    ,
    t.addMinMax = function(n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function(n) {
            var f = n.params.min
              , e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    }
    ,
    t.addSingleVal = function(n, t, r) {
        return this.add(n, [t || "val"], function(u) {
            i(u, r || n, u.params[t])
        })
    }
    ,
    r.addMethod("__dummy__", function() {
        return !0
    }),
    r.addMethod("regex", function(n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n),
        r && r.index === 0 && r[0].length === n.length)
    }),
    r.addMethod("nonalphamin", function(n, t, i) {
        var r;
        return i && (r = n.match(/\W/g),
        r = r && r.length >= i),
        r
    }),
    t.addSingleVal("accept", "exts").addSingleVal("regex", "pattern"),
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"),
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range"),
    t.add("equalto", ["other"], function(t) {
        var r = e(t.element.name)
          , u = t.params.other
          , s = o(u, r)
          , h = n(t.form).find(":input[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    }),
    t.add("required", function(n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    }),
    t.add("remote", ["url", "type", "additionalfields"], function(t) {
        var r = {
            url: t.params.url,
            type: t.params.type || "GET",
            data: {}
        }
          , u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function(i, e) {
            var s = o(e, u);
            r.data[s] = function() {
                return n(t.form).find(":input[name='" + f(s) + "']").val()
            }
        }),
        i(t, "remote", r)
    }),
    t.add("password", ["min", "nonalphamin", "regex"], function(n) {
        n.params.min && i(n, "minlength", n.params.min),
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin),
        n.params.regex && i(n, "regex", n.params.regex)
    }),
    n(function() {
        r.unobtrusive.parse(document)
    })
}(jQuery),
function(n) {
    "use strict";
    function i(n) {
        n.condition() || (typeof n.exit == "function" && n.exit(),
        n.is_active = !1)
    }
    function r(n) {
        n.condition() && (typeof n.first_enter == "function" && (n.first_enter(),
        delete n.first_enter),
        typeof n.enter == "function" && n.enter(),
        n.is_active = !0)
    }
    function u(n) {
        n.is_active ? i(n) : r(n)
    }
    function f() {
        var u = n.grep(t, function(n) {
            return n.is_active
        })
          , f = n.grep(t, function(n) {
            return !n.is_active
        });
        n.each(u, function(n, t) {
            i(t)
        }),
        n.each(f, function(n, t) {
            r(t)
        })
    }
    var t = [];
    n.breakpoint = function(i, r) {
        r = n.extend(!0, {}, n.breakpoint.defaults, r),
        t.push(i),
        t.length === 1 && n(window).on("resize orientationchange", function() {
            f()
        }),
        u(i)
    }
    ,
    n.breakpoint.breakpoints = t,
    n.breakpoint.defaults = {}
}(jQuery),
!function(n) {
    "use strict";
    var t = function(t, i) {
        this.el = n(t),
        this.options = n.extend({}, n.fn.typed.defaults, i),
        this.isInput = this.el.is("input"),
        this.attr = this.options.attr,
        this.showCursor = this.isInput ? !1 : this.options.showCursor,
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(),
        this.contentType = this.options.contentType,
        this.typeSpeed = this.options.typeSpeed,
        this.startDelay = this.options.startDelay,
        this.backSpeed = this.options.backSpeed,
        this.backDelay = this.options.backDelay,
        this.stringsElement = this.options.stringsElement,
        this.strings = this.options.strings,
        this.strPos = 0,
        this.arrayPos = 0,
        this.stopNum = 0,
        this.loop = this.options.loop,
        this.loopCount = this.options.loopCount,
        this.curLoop = 0,
        this.stop = !1,
        this.cursorChar = this.options.cursorChar,
        this.shuffle = this.options.shuffle,
        this.sequence = [],
        this.build()
    };
    t.prototype = {
        constructor: t,
        init: function() {
            var n = this;
            n.timeout = setTimeout(function() {
                for (var t = 0; t < n.strings.length; ++t)
                    n.sequence[t] = t;
                n.shuffle && (n.sequence = n.shuffleArray(n.sequence)),
                n.typewrite(n.strings[n.sequence[n.arrayPos]], n.strPos)
            }, n.startDelay)
        },
        build: function() {
            var t = this, i;
            (this.showCursor === !0 && (this.cursor = n('<span class="typed-cursor">' + this.cursorChar + "<\/span>"),
            this.el.after(this.cursor)),
            this.stringsElement) && (t.strings = [],
            this.stringsElement.hide(),
            i = this.stringsElement.find("p"),
            n.each(i, function(i, r) {
                t.strings.push(n(r).html())
            })),
            this.init()
        },
        typewrite: function(n, t) {
            if (this.stop !== !0) {
                var r = Math.round(70 * Math.random()) + this.typeSpeed
                  , i = this;
                i.timeout = setTimeout(function() {
                    var s = 0, r = n.substr(t), e, u, o, f;
                    if ("^" === r.charAt(0) && (e = 1,
                    /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0],
                    e += r.length,
                    s = parseInt(r)),
                    n = n.substring(0, t) + n.substring(t + e)),
                    "html" === i.contentType && (u = n.substr(t).charAt(0),
                    "<" === u || "&" === u)) {
                        for (o = "",
                        f = "",
                        f = "<" === u ? ">" : ";"; n.substr(t).charAt(0) !== f; )
                            o += n.substr(t).charAt(0),
                            t++;
                        t++,
                        o += f
                    }
                    i.timeout = setTimeout(function() {
                        if (t === n.length) {
                            if (i.options.onStringTyped(i.arrayPos),
                            i.arrayPos === i.strings.length - 1 && (i.options.callback(),
                            i.curLoop++,
                            i.loop === !1 || i.curLoop === i.loopCount))
                                return;
                            i.timeout = setTimeout(function() {
                                i.backspace(n, t)
                            }, i.backDelay)
                        } else {
                            0 === t && i.options.preStringTyped(i.arrayPos);
                            var r = n.substr(0, t + 1);
                            i.attr ? i.el.attr(i.attr, r) : i.isInput ? i.el.val(r) : "html" === i.contentType ? i.el.html(r) : i.el.text(r),
                            t++,
                            i.typewrite(n, t)
                        }
                    }, s)
                }, r)
            }
        },
        backspace: function(n, t) {
            if (this.stop !== !0) {
                var r = Math.round(70 * Math.random()) + this.backSpeed
                  , i = this;
                i.timeout = setTimeout(function() {
                    var u, r;
                    if ("html" === i.contentType && ">" === n.substr(t).charAt(0)) {
                        for (u = ""; "<" !== n.substr(t).charAt(0); )
                            u -= n.substr(t).charAt(0),
                            t--;
                        t--,
                        u += "<"
                    }
                    r = n.substr(0, t),
                    i.attr ? i.el.attr(i.attr, r) : i.isInput ? i.el.val(r) : "html" === i.contentType ? i.el.html(r) : i.el.text(r),
                    t > i.stopNum ? (t--,
                    i.backspace(n, t)) : t <= i.stopNum && (i.arrayPos++,
                    i.arrayPos === i.strings.length ? (i.arrayPos = 0,
                    i.shuffle && (i.sequence = i.shuffleArray(i.sequence)),
                    i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], t))
                }, r)
            }
        },
        shuffleArray: function(n) {
            var r, i, t = n.length;
            if (t)
                for (; --t; )
                    i = Math.floor(Math.random() * (t + 1)),
                    r = n[i],
                    n[i] = n[t],
                    n[t] = r;
            return n
        },
        reset: function() {
            var n = this, t;
            clearInterval(n.timeout),
            t = this.el.attr("id"),
            this.el.after('<span id="' + t + '"/>'),
            this.el.remove(),
            "undefined" != typeof this.cursor && this.cursor.remove(),
            n.options.resetCallback()
        }
    },
    n.fn.typed = function(i) {
        return this.each(function() {
            var u = n(this)
              , r = u.data("typed")
              , f = "object" == typeof i && i;
            r || u.data("typed", r = new t(this,f)),
            "string" == typeof i && r[i]()
        })
    }
    ,
    n.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery),
agendaInit = function() {
    function t(n, t) {
        if (window.matchMedia && window.matchMedia("only screen and (min-width: 768px)").matches || $(window).outerWidth() > 768) {
            var f = $("body")
              , r = $("<div>", {
                "class": "event-lightbox-backdrop",
                css: {
                    height: f.outerHeight()
                },
                click: function(n) {
                    $(n.target).is(r) && r.remove()
                }
            })
              , i = $("<div>", {
                "class": "event-lightbox"
            })
              , u = $("<div>", {
                "class": "event-lightbox-inner"
            })
              , e = $("<button>", {
                "class": "event-lightbox-close",
                html: "Close",
                click: function() {
                    r.remove()
                }
            })
              , o = $("<h2>", {
                html: n.find("h2").html(),
                "data-color": n.parents(".event-slot").data("color")
            })
              , s = $("<div>", {
                "class": "event-lightbox-content",
                html: t.html()
            });
            u.append(o, s, e),
            i.append(u),
            r.append(i),
            f.append(r),
            i.css("top", $(window).scrollTop() + ($(window).outerHeight() * .5 - i.outerHeight() * .5)),
            setTimeout(function() {
                parseInt(i.css("top"), 10) < $(window).scrollTop() + 40 && i.css("top", $(window).scrollTop() + 40)
            }, 450),
            setTimeout(function() {
                r.addClass("show"),
                setTimeout(function() {
                    i.addClass("show"),
                    setTimeout(function() {
                        u.addClass("show")
                    }, 400)
                }, 200)
            }, 50)
        } else
            t.slideToggle(200),
            n.find("button").toggleClass("active")
    }
    var n = $(".event-agenda");
    $(".event-slot").each(function() {
        var n = $(this), f = n.find(".event-slot-content"), i = n.find(".event-slot-info"), r = n.find("h2"), u;
        i.length && (i.hide(),
        u = $("<button>", {
            html: agendamoreinformation + " " + r.text(),
            click: function(n) {
                n.preventDefault(),
                t(f, i)
            }
        }),
        r.after(u))
    }),
    agendanotgrouped != "True" && $.breakpoint(function() {
        var n = $(".event-agenda");
        return {
            condition: function() {
                return $(window).outerWidth() < 768
            },
            first_enter: function() {
                var i = $(".faux-heading")
                  , r = $("<p>", {
                    "class": "track-navigation-label",
                    html: agendapicktrack + ":"
                })
                  , t = $("<ul>", {
                    "class": "track-navigation"
                });
                i.each(function() {
                    var r = $(this)
                      , u = $('.event-slot[data-track="' + r.text() + '"]')
                      , e = u.first().data("color")
                      , f = $("<li>")
                      , o = $("<a>", {
                        href: "#",
                        html: r.text(),
                        "data-color": e,
                        click: function(i) {
                            i.preventDefault(),
                            $(".event-slot[data-track]").parent().hide(),
                            u.parent().show(),
                            t.find("a").removeClass("active"),
                            $(this).addClass("active"),
                            n.addClass("blink"),
                            setTimeout(function() {
                                n.removeClass("blink")
                            }, 300)
                        }
                    });
                    o.appendTo(f),
                    f.appendTo(t)
                }),
                n.prepend(r, t)
            },
            enter: function() {
                $(".track-navigation a:first").click(),
                n.removeClass("blink")
            },
            exit: function() {
                $(".event-slot[data-track]").parent().show()
            }
        }
    }()),
    $.breakpoint(function() {
        return {
            condition: function() {
                return $(window).outerWidth() > 768
            },
            enter: function() {
                function t() {
                    n.find(" > .row").each(function() {
                        var t = $(this);
                        t.find(".event-slot").length > 1 && t.find(".event-slot").justify()
                    })
                }
                t();
                $(window).on("resize.justifyRow", t)
            },
            exit: function() {
                $(window).off("resize.justifyRow"),
                setTimeout(function() {
                    n.find(".event-slot").css("min-height", "0")
                }, 50)
            }
        }
    }()),
    $.breakpoint(function() {
        var n = $(".event-slot > img");
        return {
            condition: function() {
                return $(window).outerWidth() < 981
            },
            enter: function() {
                n.each(function() {
                    var n = $(this)
                      , t = n.parent().find(".event-slot-content");
                    n.insertAfter(t)
                })
            },
            exit: function() {
                n.each(function() {
                    var n = $(this)
                      , t = n.parent().find(".event-slot-content");
                    n.insertBefore(t)
                })
            }
        }
    }())
}
,
String.prototype.supplant = function(n) {
    return this.replace(/{([^{}]*)}/g, function(t, i) {
        var r = n[i];
        return typeof r == "string" ? r : t
    })
}
,
String.prototype.trim = function() {
    return this.replace(/^\s*/, "").replace(/\s*$/, "")
}
,
Array.prototype.unique = function() {
    for (var i = [], r = this.length, t, n = 0; n < r; n++) {
        for (t = n + 1; t < r; t++)
            this[n] === this[t] && (t = ++n);
        i.push(this[n])
    }
    return i
}
,
$(function() {
    jQuery(".languageselector li.dropdown").hover(function() {
        jQuery(this).find(".dropdown-menu").stop(!0, !0).delay(50).fadeIn()
    }, function() {
        jQuery(this).find(".dropdown-menu").stop(!0, !0).delay(50).fadeOut()
    }),
    $(".fancybox").fancybox(),
    $(document).ready(function() {
        $("a.iframe").livequery(function() {
            $(this).fancybox({
                transitionIn: "elastic",
                transitionOut: "elastic",
                speedIn: 400,
                speedOut: 200,
                overlayShow: !0,
                type: "iframe",
                autoSize: !0
            })
        })
    }),
    $.konami(function() {
        console.log("Hello? Yes, this is dog.")
    }, [67, 65, 76, 76, 68, 79, 71])
}),
Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(n) {
        var f = "", e, t, i, s, h, o, r, u = 0;
        for (n = Base64._utf8_encode(n); u < n.length; )
            e = n.charCodeAt(u++),
            t = n.charCodeAt(u++),
            i = n.charCodeAt(u++),
            s = e >> 2,
            h = (e & 3) << 4 | t >> 4,
            o = (t & 15) << 2 | i >> 6,
            r = i & 63,
            isNaN(t) ? o = r = 64 : isNaN(i) && (r = 64),
            f = f + this._keyStr.charAt(s) + this._keyStr.charAt(h) + this._keyStr.charAt(o) + this._keyStr.charAt(r);
        return f
    },
    decode: function(n) {
        var t = "", e, o, s, h, u, r, f, i = 0;
        for (n = n.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < n.length; )
            h = this._keyStr.indexOf(n.charAt(i++)),
            u = this._keyStr.indexOf(n.charAt(i++)),
            r = this._keyStr.indexOf(n.charAt(i++)),
            f = this._keyStr.indexOf(n.charAt(i++)),
            e = h << 2 | u >> 4,
            o = (u & 15) << 4 | r >> 2,
            s = (r & 3) << 6 | f,
            t = t + String.fromCharCode(e),
            r != 64 && (t = t + String.fromCharCode(o)),
            f != 64 && (t = t + String.fromCharCode(s));
        return t = Base64._utf8_decode(t)
    },
    _utf8_encode: function(n) {
        var i, r, t;
        for (n = n.replace(/\r\n/g, "\n"),
        i = "",
        r = 0; r < n.length; r++)
            t = n.charCodeAt(r),
            t < 128 ? i += String.fromCharCode(t) : t > 127 && t < 2048 ? (i += String.fromCharCode(t >> 6 | 192),
            i += String.fromCharCode(t & 63 | 128)) : (i += String.fromCharCode(t >> 12 | 224),
            i += String.fromCharCode(t >> 6 & 63 | 128),
            i += String.fromCharCode(t & 63 | 128));
        return i
    },
    _utf8_decode: function(n) {
        for (var r = "", t = 0, i = 0, e = 0, u = 0, f = 0; t < n.length; )
            i = n.charCodeAt(t),
            i < 128 ? (r += String.fromCharCode(i),
            t++) : i > 191 && i < 224 ? (u = n.charCodeAt(t + 1),
            r += String.fromCharCode((i & 31) << 6 | u & 63),
            t += 2) : (u = n.charCodeAt(t + 1),
            f = n.charCodeAt(t + 2),
            r += String.fromCharCode((i & 15) << 12 | (u & 63) << 6 | f & 63),
            t += 3);
        return r
    }
},
$(document).ready(function() {
    var n, t, f, i, r, u, e;
    getCookie("FT") || (n = "",
    t = document.referrer,
    t && (f = Base64.encode(t),
    n += "urlreferrer:" + f + ";"),
    i = getParameterByName("utm_source"),
    i && (n += "utmsource:" + i + ";"),
    r = getParameterByName("utm_medium"),
    r && (n += "utmmedium:" + r + ";"),
    u = getParameterByName("utm_campaign"),
    u && (n += "utmcampaign:" + u + ";"),
    e = encodeURIComponent(n),
    setSessionCookie("FT", e))
}),
jQuery(document).ready(function() {
    $("img").each(function() {
        var n = $(this).attr("alt");
        (n == "" || n == null) && $(this).attr("alt", "image")
    })
}),
function(n) {
    n.extend(n.fn, {
        getHighestHeight: function() {
            var t = 0;
            return this.each(function() {
                var r = n(this), i;
                r.css("min-height", 0),
                i = r.outerHeight(),
                i > t && (t = i)
            }),
            t
        },
        justify: function() {
            var t = this.getHighestHeight();
            return this.each(function() {
                var i = n(this);
                i.css("box-sizing") === "border-box" ? i.css("min-height", t) : i.css("min-height", i.height() + t - i.outerHeight())
            }),
            this
        }
    })
}(jQuery),
function(n) {
    var r = []
      , t = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
      , i = 0;
    n.extend({
        konami: function(n, i) {
            r.push(n),
            i && (t = i)
        }
    }),
    n(document).bind("keyup", function(u) {
        var f = u.keyCode;
        f == t[i] ? i++ : i = f == t[0] ? 1 : 0,
        i == t.length && r.length > 0 && n.each(r, function() {
            this()
        })
    })
}(jQuery),
$(document).ready(function() {
    var t = $(".dropdown-toggle")
      , n = t.siblings("ul");
    t.click(function() {
        n.css("display") == "none" ? n.css("display", "block") : n.css("display", "none")
    })
}),
jQuery(function() {
    $(".jsValidationRegion .requiredfield").each(function() {
        $(this).blur(function() {
            ValidateWithEvents(this)
        })
    })
}),
function() {
    "use strict";
    var n = $("#nav");
    n.addClass("contracted"),
    $(".nav-toggler").click(function() {
        n.toggleClass("expanded contracted");
        var t = n.hasClass("expanded");
        $(this).toggleClass("toggled"),
        $(this).attr("aria-expanded", t)
    }),
    $(".submenu-toggler").click(function() {
        var n = $(this), t = n.next(".submenu"), i;
        t.toggleClass("expanded"),
        i = t.hasClass("expanded"),
        n.toggleClass("toggled"),
        n.attr("aria-expanded", i),
        n.blur()
    }),
    $.breakpoint(function() {
        return {
            condition: function() {
                return $(window).innerWidth() < 980
            },
            enter: function() {
                $("#nav").prepend($(".form-search"))
            },
            exit: function() {
                $("#nav").after($(".form-search"))
            }
        }
    }())
}(),
function() {
    var p, s, l, n, y, h, c, u, f, w, r, a, i, b, t, k, e, o, d, g, v, nt, tt, it;
    t = document.querySelector.bind(document),
    k = document.querySelectorAll.bind(document),
    a = t(".navdrawer-container"),
    c = t(".indexdrawer-container"),
    o = t(".search-drawer"),
    f = t(".lang-drawer"),
    l = document.body,
    s = t(".app-bar"),
    r = t("#nav-menu-btn"),
    h = t("#index-menu-btn"),
    u = t("#lang-btn"),
    e = t("#search-btn"),
    d = t(".search-phrase"),
    v = k(".navdrawer-container>ul>li.sub-nav"),
    i = function(n) {
        return jQuery(l).addClass("drawer-open"),
        jQuery(s).addClass("drawer-open"),
        jQuery(n).addClass("drawer-open")
    }
    ,
    n = function() {
        var n, t, i;
        for (jQuery(l).removeClass("drawer-open"),
        jQuery(s).removeClass("drawer-open"),
        jQuery(a).removeClass("drawer-open"),
        jQuery(c).removeClass("drawer-open"),
        jQuery(o).removeClass("drawer-open"),
        jQuery(f).removeClass("drawer-open"),
        jQuery(r).removeClass("drawer-open"),
        jQuery(h).removeClass("drawer-open"),
        jQuery(e).removeClass("drawer-open"),
        jQuery(u).removeClass("drawer-open"),
        n = 0,
        t = v.length; n < t; n++)
            i = v[n],
            jQuery(i).find("ul").removeClass("drawer-open");
        return jQuery(r).find("i").removeClass("flaticon-cross"),
        jQuery(r).find("i").addClass("flaticon-menu")
    }
    ,
    tt = function(n) {
        return jQuery(l).toggleClass("drawer-open"),
        jQuery(s).toggleClass("drawer-open"),
        jQuery(n).toggleClass("drawer-open"),
        jQuery(n).addClass("opened")
    }
    ,
    it = function() {
        return jQuery(l).toggleClass("drawer-open"),
        jQuery(s).toggleClass("drawer-open"),
        jQuery(a).toggleClass("drawer-open"),
        jQuery(c).toggleClass("drawer-open"),
        jQuery(o).toggleClass("drawer-open"),
        jQuery(f).toggleClass("drawer-open")
    }
    ,
    nt = function() {
        return jQuery(s).toggleClass("drawer-open"),
        jQuery(c).toggleClass("drawer-open"),
        jQuery(h).find("i").toggleClass("flaticon-cross"),
        jQuery(h).find("i").toggleClass("flaticon-menu")
    }
    ;
    jQuery(r).on("click", function() {
        return jQuery(a).hasClass("drawer-open") ? n() : (n(),
        i(a),
        jQuery(r).addClass("drawer-open"),
        jQuery(r).find("i").addClass("flaticon-cross"),
        jQuery(r).find("i").removeClass("flaticon-menu"))
    });
    jQuery(u).on("click", function() {
        return jQuery(f).hasClass("drawer-open") ? n() : (n(),
        i(f),
        jQuery(u).addClass("drawer-open"))
    });
    jQuery(u).hover(function() {
        if (document.documentElement.clientWidth >= 1200)
            return n(),
            i(f),
            jQuery(u).addClass("drawer-open")
    }, function() {
        if (document.documentElement.clientWidth >= 1200)
            return n()
    });
    jQuery(e).on("click", function() {
        return jQuery(o).hasClass("drawer-open") ? n() : (n(),
        i(o),
        jQuery(".search-phrase").focus(),
        jQuery(e).addClass("drawer-open"))
    });
    jQuery(e).hover(function() {
        if (document.documentElement.clientWidth >= 1200)
            return n(),
            i(o),
            jQuery(".search-phrase").focus(),
            jQuery(e).addClass("drawer-open")
    }, function() {
        if (document.documentElement.clientWidth >= 1200)
            return n()
    });
    jQuery(h).on("click", function() {
        return jQuery(c).hasClass("drawer-open") ? n() : (n(),
        i(c),
        jQuery(h).addClass("drawer-open"))
    });
    for (jQuery(f).hover(function() {
        if (document.documentElement.clientWidth >= 1200)
            return i(this),
            jQuery(u).addClass("drawer-open")
    }, function() {
        if (document.documentElement.clientWidth >= 1200)
            return n()
    }),
    jQuery(o).hover(function() {
        if (document.documentElement.clientWidth >= 1200)
            return i(this),
            jQuery(".search-phrase").focus(),
            jQuery(e).addClass("drawer-open")
    }, function() {
        if (document.documentElement.clientWidth >= 1200 && jQuery(d).val() === "")
            return n()
    }),
    p = function(n) {
        var t;
        return t = n.querySelector(".drop-btn"),
        t != null ? t.addEventListener("click", function() {
            var r;
            return r = n.querySelector("ul"),
            jQuery(r).hasClass("drawer-open") ? (jQuery(t).removeClass("drawer-open"),
            jQuery(r).removeClass("drawer-open")) : (jQuery(t).addClass("drawer-open"),
            jQuery(r).addClass("drawer-open"))
        }) : void 0
    }
    ,
    y = 0,
    w = v.length; y < w; y++)
        g = v[y],
        p(g);
    return b = {
        closeMenus: n,
        openMenu: i,
        toggleIndexMenu: nt
    }
}(),
function() {
    "use strict";
    var n;
    if ($.breakpoint(function() {
        return {
            condition: function() {
                return $(window).innerWidth() > 767
            },
            enter: function() {
                function n() {
                    $(".client-teaser").justify(),
                    $(".m-image-teaser .m-c").justify(),
                    $(".product-teaser h3").justify(),
                    $(".product-teaser").justify(),
                    $(".contactusblock .gray_contact").justify(),
                    $(".tabs button").justify()
                }
                n();
                $(window).on("resize.justifyRow", n)
            },
            exit: function() {
                $(window).off("resize.justifyRow"),
                setTimeout(function() {
                    $(".client-teaser, .m-image-teaser .m-c, .product-teaser h3, .product-teaser, .contactusblock .gray_contact").css("min-height", "0")
                }, 50)
            }
        }
    }()),
    $(".dropdown-toggle").click(function(n) {
        n.stopPropagation();
        $("body").on("click.dropdown", function() {
            $("body").off("click.dropdown"),
            $(".dropdown-menu").hide()
        })
    }),
    $(".clickblock").each(function() {
        var n = $(this).find("a");
        n.length && $(this).addClass("clickable").click(function() {
            window.location.href = n.attr("href")
        })
    }),
    n = $(".pricingblock"),
    n.length) {
        n.addClass("tabs"),
        n.find(".row").hide();
        var r = n.find("h2")
          , i = $("ul.row")
          , t = $("<div>").addClass("row tabs").attr("aria-hidden", "true");
        r.each(function(n) {
            var f = $(this), r, u;
            f.addClass("structural"),
            r = $("<div>").addClass("span6 noBottomMargin"),
            u = $("<button>"),
            u.html(f.html()).click(function() {
                $(".tabs button").removeClass("active"),
                $(this).addClass("active").blur(),
                i.hide(),
                i.eq(n).toggle()
            }),
            r.append(u),
            t.append(r)
        }),
        t.find("button:first").click(),
        n.find(".container").prepend(t),
        $(".tabs button").justify()
    }
}(),
$(function() {
    return $(".seq-form-module").each(function(n, t) {
        var i, u, r;
        return i = $(t),
        r = 0,
        u = i.find("[data-seq-slide]"),
        u.each(function(n, t) {
            var i;
            return i = $(t).outerHeight(),
            i > r ? r = i : void 0
        }),
        i.css("height", r),
        u.each(function(n, t) {
            var u;
            return u = $(t),
            u.css({
                height: r
            }),
            u.data("seq-slide") === "start" && u.addClass("seq-current"),
            u.find('[data-seq-act="next"]').click(function() {
                return u.removeClass("seq-current"),
                u.next().addClass("seq-current")
            }),
            u.find('[data-seq-act="fail"]').click(function() {
                return u.removeClass("seq-current"),
                i.find('[data-seq-slide="failure"]').addClass("seq-current")
            }),
            u.find('[data-seq-act="succeed"]').click(function() {
                return u.removeClass("seq-current"),
                i.find('[data-seq-slide="success"]').addClass("seq-current")
            }),
            u.find('[data-seq-act="reset"]').click(function(n) {
                return n.preventDefault(),
                u.removeClass("seq-current"),
                i.find('[data-seq-slide="start"]').addClass("seq-current")
            })
        })
    })
}),
$(function() {
    return $(".slick").slick({
        nextArrow: '<button type="button" class="slick-next"><\/button>',
        prevArrow: '<button type="button" class="slick-prev"><\/button>',
        focusOnSelect: !1,
        pauseOnDotsHover: !0,
        dots: !0,
        autoplay: !0
    }),
    document.documentElement.clientWidth < 780 && $(".slick-arrow").hide(),
    !0
}),
storyHover = function(n) {
    return {
        activate: function() {
            n(".jsImage").each(function() {
                var t = n(this)
                  , i = t.data().imageMain
                  , r = t.data().imageHover;
                t.hasClass("selected") ? (t.children("img").attr("src", r),
                t.siblings("a").addClass("active")) : (t.children("img").attr("src", i),
                t.children("img").mouseenter(function() {
                    t.children("img").attr("src", r),
                    t.siblings("a").addClass("active")
                }),
                t.children("img").mouseleave(function() {
                    t.children("img").attr("src", i),
                    t.siblings("a").removeClass("active")
                }))
            }),
            n(".jsHoverLink").each(function() {
                var t = n(this)
                  , i = t.siblings(".jsImage").data().imageMain
                  , r = t.siblings(".jsImage").data().imageHover;
                t.siblings(".jsImage").hasClass("selected") || (t.mouseenter(function() {
                    t.siblings(".jsImage").children("img").attr("src", r),
                    t.addClass("active")
                }),
                t.mouseleave(function() {
                    t.siblings(".jsImage").children("img").attr("src", i),
                    t.removeClass("active")
                }))
            })
        }
    }
}(jQuery),
solutionHelpers = function(n) {
    var t = function() {
        n(".jsBottomAlignImage").each(function() {
            var t = n(this)
              , i = t.closest(".jsRoot")
              , r = i.position().top + i.height() - (t.height() + -30);
            t.css("top", r + "px")
        })
    };
    return {
        init: function() {
            storyHover.activate(),
            t(),
            n(window).resize(function() {
                t()
            })
        }
    }
}(jQuery),
typedAnim = function(n, t) {
    var i, u, r;
    return i = $(n),
    r = parseInt(i.css("line-height")),
    window.screen.width >= 768 ? i.parent().css("height", r + i.parent().height()) : i.parent().css("height", r * 2 + i.parent().height()),
    u = i.data("exch-id"),
    i.typed({
        stringsElement: $('.exchanger-texts[data-exch-id="' + u + '"]'),
        typeSpeed: 50,
        loop: t.loop,
        startDelay: t.startDelay,
        backDelay: t.backDelay
    })
}
,
$(function() {
    var u, n, t, i, f, e, r;
    for (n = $(".exchanger"),
    r = [],
    t = i = 0,
    f = n.length; i < f; t = ++i)
        u = n[t],
        e = {
            loop: !0,
            startDelay: 0,
            backDelay: 1e3
        },
        r.push(typedAnim(u, e));
    return r
}),
function() {
    "use strict";
    function it(n) {
        var r = ut, t, i, u;
        n: {
            for (t = r.className.split(/\s+/),
            i = 0,
            u = t.length; i < u; i += 1)
                if (t[i] === n) {
                    t = !0;
                    break n
                }
            t = !1
        }
        t || (r.className += ("" === r.className ? "" : " ") + n)
    }
    function o(n, t, i) {
        this.b = null != n ? n : null,
        this.c = null != t ? t : null,
        this.e = null != i ? i : null
    }
    function h(n, t) {
        return n.b > t.b || n.b === t.b && n.c > t.c || n.b === t.b && n.c === t.c && n.e > t.e ? 1 : n.b < t.b || n.b === t.b && n.c < t.c || n.b === t.b && n.c === t.c && n.e < t.e ? -1 : 0
    }
    function c(n, t) {
        return 0 === h(n, t) || 1 === h(n, t)
    }
    function i() {
        var n = ft.exec(t[1])
          , i = null
          , r = null
          , u = null;
        return n && (null !== n[1] && n[1] && (i = parseInt(n[1], 10)),
        null !== n[2] && n[2] && (r = parseInt(n[2], 10)),
        null !== n[3] && n[3] && (u = parseInt(n[3], 10))),
        new o(i,r,u)
    }
    function rt() {
        var t = n;
        return 3 === t.a || 7 === t.a || 6 === t.a || 9 === t.a || 8 === t.a || 5 === t.a ? "grayscale" : 1 === t.a && c(t.f, new o(6,2)) && 1 === t.d ? "grayscale" : "unknown"
    }
    var tt = window, ft = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/, n, r = tt.navigator.userAgent, u = 0, e = new o, f = 0, s = new o, t = null, l, a, v, ut, y, p, w, b, k, d, g, nt;
    (t = /(?:iPod|iPad|iPhone).*? OS ([\d_]+)/.exec(r)) ? (f = 3,
    s = i()) : (t = /(?:BB\d{2}|BlackBerry).*?Version\/([^\s]*)/.exec(r)) ? (f = 9,
    s = i()) : (t = /Android ([^;)]+)|Android/.exec(r)) ? (f = 5,
    s = i()) : (t = /Windows Phone(?: OS)? ([^;)]+)/.exec(r)) ? (f = 8,
    s = i()) : (t = /Linux ([^;)]+)|Linux/.exec(r)) ? (f = 4,
    s = i()) : (t = /OS X ([^;)]+)/.exec(r)) ? (f = 2,
    s = i()) : (t = /Windows NT ([^;)]+)/.exec(r)) ? (f = 1,
    s = i()) : (t = /CrOS ([^;)]+)/.exec(r)) && (f = 6,
    s = i()),
    (t = /MSIE ([\d\w\.]+)/.exec(r)) ? (u = 1,
    e = i()) : (t = /Trident.*rv:([\d\w\.]+)/.exec(r)) ? (u = 1,
    e = i()) : (t = /OPR\/([\d.]+)/.exec(r)) ? (u = 4,
    e = i()) : (t = /Opera Mini.*Version\/([\d\.]+)/.exec(r)) ? (u = 4,
    e = i()) : (t = /Opera(?: |.*Version\/|\/)([\d\.]+)/.exec(r)) ? (u = 4,
    e = i()) : (t = /Firefox\/([\d\w\.]+)|Firefox/.exec(r)) ? (u = 3,
    e = i()) : (t = /(?:Chrome|CrMo|CriOS)\/([\d\.]+)/.exec(r)) ? (u = 2,
    e = i()) : (t = /Silk\/([\d\._]+)/.exec(r)) ? (u = 7,
    e = i()) : 5 === f || 9 === f ? u = 6 : (t = /Version\/([\d\.\w]+).*Safari/.exec(r)) && (u = 5,
    e = i()),
    n = new function(n, t, i, r) {
        this.d = n,
        this.g = t,
        this.a = i,
        this.f = r
    }
    (u,e,f,s),
    l = rt(),
    v = rt(),
    a = "unknown" !== v ? v : 2 === n.a || 4 === n.a ? "subpixel" : 1 === n.a ? c(n.f, new o(6,0)) ? "subpixel" : 1 === n.d ? c(n.g, new o(7,0)) ? "subpixel" : "grayscale" : "subpixel" : "unknown",
    ut = tt.document.documentElement,
    1 === n.a ? ((w = 2 === n.d) || ((b = 4 === n.d) || (b = -1 === h(n.f, new o(6,0))),
    w = b),
    w ? p = "gdi" : (c(n.f, new o(6,0)) ? ((d = 1 === n.d) && (g = n.g,
    nt = new o(8,0),
    d = 0 === h(g, nt) || -1 === h(g, nt)),
    k = d ? "gdi" : "directwrite") : k = "unknown",
    p = k),
    y = p) : y = 8 === n.a ? "directwrite" : 2 === n.a || 3 === n.a ? "coretext" : 5 === n.a || 4 === n.a || 6 === n.a || 7 === n.a || 9 === n.a ? "freetype" : "unknown",
    it("tr-" + y),
    "unknown" === l && "unknown" !== a && (l += "-" + a),
    it("tr-aa-" + l)
}(),
wistiaLoadCallback = function(n) {
    var i, t, r;
    return i = $(".top-video-play-button"),
    t = $(".splash-content"),
    r = $("#case-top-video"),
    i.click(function() {
        return t.hide(),
        n.play()
    }),
    n.bind("end", function() {
        return t.show()
    }),
    n.bind("pause", function() {
        return t.show()
    }),
    n.bind("play", function() {
        return t.hide()
    })
}
,
$(function() {
    return window._wq = window._wq || [],
    _wq.push({
        "case-top-video": wistiaLoadCallback
    })
}),
$(document).ready(function() {
    $(".xformLabel").each(function() {
        $(this).prev().addClass("xformLabel"),
        $(this).removeClass("xformLabel")
    })
}),
function(n) {
    function r(i, r) {
        if (0 === i.indexOf("#"))
            n(i).clone(!0).appendTo(t.empty()).show();
        else {
            if (r) {
                var u = n("<iframe />").attr({
                    src: i,
                    frameborder: 0,
                    hspace: 0
                }).css({
                    width: "100%",
                    height: "100%"
                });
                t.html(u)
            } else
                t.load(i);
            t.data("localEl", !1)
        }
    }
    function u(n, r) {
        var u = t.outerWidth(!0)
          , e = {}
          , o = {};
        if (!t.is(":visible") && !i) {
            i = !0;
            switch (n) {
            case "left":
                t.css({
                    left: "auto",
                    right: "-" + u + "px"
                }),
                e["margin-left"] = "-=" + u,
                o.right = "+=" + u;
                break;
            default:
                t.css({
                    left: "-" + u + "px",
                    right: "auto"
                }),
                e["margin-left"] = "+=" + u,
                o.left = "+=" + u
            }
            f.animate(e, r),
            t.show().animate(o, r, function() {
                i = !1
            })
        }
    }
    var f = n("body"), t = n("#pageslide"), i = !1, e;
    0 == t.length && (t = n("<div />").attr("id", "pageslide").css("display", "none").appendTo(n("body"))),
    n.fn.pageslide = function(i) {
        this.click(function(r) {
            var u = n(this)
              , f = n.extend({
                href: u.attr("href")
            }, i);
            r.preventDefault(),
            r.stopPropagation(),
            t.is(":visible") && u[0] == e ? n.pageslide.close() : (n.pageslide(f),
            e = u[0])
        })
    }
    ,
    n.fn.pageslide.defaults = {
        speed: 200,
        direction: "right",
        modal: !1,
        iframe: !0,
        href: null
    },
    n.pageslide = function(i) {
        var f = n.extend({}, n.fn.pageslide.defaults, i);
        t.is(":visible") && t.data("direction") != f.direction ? n.pageslide.close(function() {
            r(f.href, f.iframe),
            u(f.direction, f.speed)
        }) : (r(f.href, f.iframe),
        t.is(":hidden") && u(f.direction, f.speed)),
        t.data(f)
    }
    ,
    n.pageslide.close = function(t) {
        var r = n("#pageslide")
          , u = r.outerWidth(!0)
          , s = r.data("speed")
          , e = {}
          , o = {};
        if (!r.is(":hidden") && !i) {
            i = !0;
            switch (r.data("direction")) {
            case "left":
                e["margin-left"] = "+=" + u,
                o.right = "-=" + u;
                break;
            default:
                e["margin-left"] = "-=" + u,
                o.left = "-=" + u
            }
            r.animate(o, s),
            f.animate(e, s, function() {
                r.hide(),
                i = !1,
                "undefined" != typeof t && t()
            })
        }
    }
    ,
    t.click(function(n) {
        n.stopPropagation()
    }),
    n(document).bind("click keyup", function(i) {
        "keyup" == i.type && 27 != i.keyCode || t.is(":visible") && !t.data("modal") && n.pageslide.close()
    })
}(jQuery),
function(n, t, i, r) {
    "use strict";
    var p = i("html")
      , e = i(n)
      , o = i(t)
      , u = i.fancybox = function() {
        u.open.apply(this, arguments)
    }
      , y = navigator.userAgent.match(/msie/i)
      , v = null
      , s = t.createTouch !== r
      , a = function(n) {
        return n && n.hasOwnProperty && n instanceof i
    }
      , c = function(n) {
        return n && i.type(n) === "string"
    }
      , l = function(n) {
        return c(n) && n.indexOf("%") > 0
    }
      , w = function(n) {
        return n && !(n.style.overflow && n.style.overflow === "hidden") && (n.clientWidth && n.scrollWidth > n.clientWidth || n.clientHeight && n.scrollHeight > n.clientHeight)
    }
      , f = function(n, t) {
        var i = parseInt(n, 10) || 0;
        return t && l(n) && (i = u.getViewport()[t] / 100 * i),
        Math.ceil(i)
    }
      , h = function(n, t) {
        return f(n, t) + "px"
    };
    i.extend(u, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !s,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"><\/div><\/div><\/div><\/div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (y ? ' allowtransparency="true"' : "") + "><\/iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.<\/p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><\/a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><\/span><\/a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><\/span><\/a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(n, t) {
            if (n)
                return (i.isPlainObject(t) || (t = {}),
                !1 === u.close(!0)) ? void 0 : (i.isArray(n) || (n = a(n) ? i(n).get() : [n]),
                i.each(n, function(f, e) {
                    var h = {}, s, p, l, o, v, y, w;
                    i.type(e) === "object" && (e.nodeType && (e = i(e)),
                    a(e) ? (h = {
                        href: e.data("fancybox-href") || e.attr("href"),
                        title: e.data("fancybox-title") || e.attr("title"),
                        isDom: !0,
                        element: e
                    },
                    i.metadata && i.extend(!0, h, e.metadata())) : h = e),
                    s = t.href || h.href || (c(e) ? e : null),
                    p = t.title !== r ? t.title : h.title || "",
                    l = t.content || h.content,
                    o = l ? "html" : t.type || h.type,
                    !o && h.isDom && (o = e.data("fancybox-type"),
                    o || (v = e.prop("class").match(/fancybox\.(\w+)/),
                    o = v ? v[1] : null)),
                    c(s) && (o || (u.isImage(s) ? o = "image" : u.isSWF(s) ? o = "swf" : s.charAt(0) === "#" ? o = "inline" : c(e) && (o = "html",
                    l = e)),
                    o === "ajax" && (y = s.split(/\s+/, 2),
                    s = y.shift(),
                    w = y.shift())),
                    l || (o === "inline" ? s ? l = i(c(s) ? s.replace(/.*(?=#[^\s]+$)/, "") : s) : h.isDom && (l = e) : o === "html" ? l = s : o || s || !h.isDom || (o = "inline",
                    l = e)),
                    i.extend(h, {
                        href: s,
                        type: o,
                        content: l,
                        title: p,
                        selector: w
                    }),
                    n[f] = h
                }),
                u.opts = i.extend(!0, {}, u.defaults, t),
                t.keys !== r && (u.opts.keys = t.keys ? i.extend({}, u.defaults.keys, t.keys) : !1),
                u.group = n,
                u._start(u.opts.index))
        },
        cancel: function() {
            var n = u.coming;
            n && !1 !== u.trigger("onCancel") && (u.hideLoading(),
            u.ajaxLoad && u.ajaxLoad.abort(),
            u.ajaxLoad = null,
            u.imgPreload && (u.imgPreload.onload = u.imgPreload.onerror = null),
            n.wrap && n.wrap.stop(!0, !0).trigger("onReset").remove(),
            u.coming = null,
            u.current || u._afterZoomOut(n))
        },
        close: function(n) {
            (u.cancel(),
            !1 !== u.trigger("beforeClose")) && (u.unbindEvents(),
            u.isActive) && (u.isOpen && n !== !0 ? (u.isOpen = u.isOpened = !1,
            u.isClosing = !0,
            i(".fancybox-item, .fancybox-nav").remove(),
            u.wrap.stop(!0, !0).removeClass("fancybox-opened"),
            u.transitions[u.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),
            u._afterZoomOut()))
        },
        play: function(n) {
            var t = function() {
                clearTimeout(u.player.timer)
            }
              , i = function() {
                t(),
                u.current && u.player.isActive && (u.player.timer = setTimeout(u.next, u.current.playSpeed))
            }
              , r = function() {
                t(),
                o.unbind(".player"),
                u.player.isActive = !1,
                u.trigger("onPlayEnd")
            }
              , f = function() {
                u.current && (u.current.loop || u.current.index < u.group.length - 1) && (u.player.isActive = !0,
                o.bind({
                    "onCancel.player beforeClose.player": r,
                    "onUpdate.player": i,
                    "beforeLoad.player": t
                }),
                i(),
                u.trigger("onPlayStart"))
            };
            n !== !0 && (u.player.isActive || n === !1) ? r() : f()
        },
        next: function(n) {
            var t = u.current;
            t && (c(n) || (n = t.direction.next),
            u.jumpto(t.index + 1, n, "next"))
        },
        prev: function(n) {
            var t = u.current;
            t && (c(n) || (n = t.direction.prev),
            u.jumpto(t.index - 1, n, "prev"))
        },
        jumpto: function(n, t, i) {
            var e = u.current;
            e && (n = f(n),
            u.direction = t || e.direction[n >= e.index ? "next" : "prev"],
            u.router = i || "jumpto",
            e.loop && (n < 0 && (n = e.group.length + n % e.group.length),
            n = n % e.group.length),
            e.group[n] !== r && (u.cancel(),
            u._start(n)))
        },
        reposition: function(n, t) {
            var f = u.current, e = f ? f.wrap : null, r;
            e && (r = u._getPosition(t),
            n && n.type === "scroll" ? (delete r.position,
            e.stop(!0, !0).animate(r, 200)) : (e.css(r),
            f.pos = i.extend({}, f.dim, r)))
        },
        update: function(n) {
            var t = n && n.type
              , i = !t || t === "orientationchange";
            (i && (clearTimeout(v),
            v = null),
            u.isOpen && !v) && (v = setTimeout(function() {
                var r = u.current;
                r && !u.isClosing && (u.wrap.removeClass("fancybox-tmp"),
                (i || t === "load" || t === "resize" && r.autoResize) && u._setDimension(),
                t === "scroll" && r.canShrink || u.reposition(n),
                u.trigger("onUpdate"),
                v = null)
            }, i && !s ? 0 : 300))
        },
        toggle: function(n) {
            u.isOpen && (u.current.fitToView = i.type(n) === "boolean" ? n : !u.current.fitToView,
            s && (u.wrap.removeAttr("style").addClass("fancybox-tmp"),
            u.trigger("onUpdate")),
            u.update())
        },
        hideLoading: function() {
            o.unbind(".loading"),
            i("#fancybox-loading").remove()
        },
        showLoading: function() {
            var t, n;
            u.hideLoading(),
            t = i('<div id="fancybox-loading"><div><\/div><\/div>').click(u.cancel).appendTo("body"),
            o.bind("keydown.loading", function(n) {
                (n.which || n.keyCode) === 27 && (n.preventDefault(),
                u.cancel())
            }),
            u.defaults.fixed || (n = u.getViewport(),
            t.css({
                position: "absolute",
                top: n.h * .5 + n.y,
                left: n.w * .5 + n.x
            }))
        },
        getViewport: function() {
            var i = u.current && u.current.locked || !1
              , t = {
                x: e.scrollLeft(),
                y: e.scrollTop()
            };
            return i ? (t.w = i[0].clientWidth,
            t.h = i[0].clientHeight) : (t.w = s && n.innerWidth ? n.innerWidth : e.width(),
            t.h = s && n.innerHeight ? n.innerHeight : e.height()),
            t
        },
        unbindEvents: function() {
            u.wrap && a(u.wrap) && u.wrap.unbind(".fb"),
            o.unbind(".fb"),
            e.unbind(".fb")
        },
        bindEvents: function() {
            var n = u.current, t;
            n && (e.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (n.autoCenter && !n.locked ? " scroll.fb" : ""), u.update),
            t = n.keys,
            t && o.bind("keydown.fb", function(f) {
                var e = f.which || f.keyCode
                  , o = f.target || f.srcElement;
                if (e === 27 && u.coming)
                    return !1;
                f.ctrlKey || f.altKey || f.shiftKey || f.metaKey || o && (o.type || i(o).is("[contenteditable]")) || i.each(t, function(t, o) {
                    return n.group.length > 1 && o[e] !== r ? (u[t](o[e]),
                    f.preventDefault(),
                    !1) : i.inArray(e, o) > -1 ? (u[t](),
                    f.preventDefault(),
                    !1) : void 0
                })
            }),
            i.fn.mousewheel && n.mouseWheel && u.wrap.bind("mousewheel.fb", function(t, r, f, e) {
                for (var h = t.target || null, o = i(h), s = !1; o.length; ) {
                    if (s || o.is(".fancybox-skin") || o.is(".fancybox-wrap"))
                        break;
                    s = w(o[0]),
                    o = i(o).parent()
                }
                r === 0 || s || u.group.length > 1 && !n.canShrink && (e > 0 || f > 0 ? u.prev(e > 0 ? "down" : "left") : (e < 0 || f < 0) && u.next(e < 0 ? "up" : "right"),
                t.preventDefault())
            }))
        },
        trigger: function(n, t) {
            var f, r = t || u.coming || u.current;
            if (r) {
                if (i.isFunction(r[n]) && (f = r[n].apply(r, Array.prototype.slice.call(arguments, 1))),
                f === !1)
                    return !1;
                r.helpers && i.each(r.helpers, function(t, f) {
                    f && u.helpers[t] && i.isFunction(u.helpers[t][n]) && u.helpers[t][n](i.extend(!0, {}, u.helpers[t].defaults, f), r)
                }),
                o.trigger(n)
            }
        },
        isImage: function(n) {
            return c(n) && n.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(n) {
            return c(n) && n.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(n) {
            var t = {}, c, l, r, e, o;
            if (n = f(n),
            c = u.group[n] || null,
            !c)
                return !1;
            if (t = i.extend(!0, {}, u.opts, c),
            e = t.margin,
            o = t.padding,
            i.type(e) === "number" && (t.margin = [e, e, e, e]),
            i.type(o) === "number" && (t.padding = [o, o, o, o]),
            t.modal && i.extend(!0, t, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            }),
            t.autoSize && (t.autoWidth = t.autoHeight = !0),
            t.width === "auto" && (t.autoWidth = !0),
            t.height === "auto" && (t.autoHeight = !0),
            t.group = u.group,
            t.index = n,
            u.coming = t,
            !1 === u.trigger("beforeLoad")) {
                u.coming = null;
                return
            }
            if (r = t.type,
            l = t.href,
            !r)
                return (u.coming = null,
                u.current && u.router && u.router !== "jumpto") ? (u.current.index = n,
                u[u.router](u.direction)) : !1;
            if (u.isActive = !0,
            (r === "image" || r === "swf") && (t.autoHeight = t.autoWidth = !1,
            t.scrolling = "visible"),
            r === "image" && (t.aspectRatio = !0),
            r === "iframe" && s && (t.scrolling = "scroll"),
            t.wrap = i(t.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + r + " fancybox-tmp " + t.wrapCSS).appendTo(t.parent || "body"),
            i.extend(t, {
                skin: i(".fancybox-skin", t.wrap),
                outer: i(".fancybox-outer", t.wrap),
                inner: i(".fancybox-inner", t.wrap)
            }),
            i.each(["Top", "Right", "Bottom", "Left"], function(n, i) {
                t.skin.css("padding" + i, h(t.padding[n]))
            }),
            u.trigger("onReady"),
            r === "inline" || r === "html") {
                if (!t.content || !t.content.length)
                    return u._error("content")
            } else if (!l)
                return u._error("href");
            r === "image" ? u._loadImage() : r === "ajax" ? u._loadAjax() : r === "iframe" ? u._loadIframe() : u._afterLoad()
        },
        _error: function(n) {
            i.extend(u.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: n,
                content: u.coming.tpl.error
            }),
            u._afterLoad()
        },
        _loadImage: function() {
            var n = u.imgPreload = new Image;
            n.onload = function() {
                this.onload = this.onerror = null,
                u.coming.width = this.width / u.opts.pixelRatio,
                u.coming.height = this.height / u.opts.pixelRatio,
                u._afterLoad()
            }
            ,
            n.onerror = function() {
                this.onload = this.onerror = null,
                u._error("image")
            }
            ,
            n.src = u.coming.href,
            n.complete !== !0 && u.showLoading()
        },
        _loadAjax: function() {
            var n = u.coming;
            u.showLoading(),
            u.ajaxLoad = i.ajax(i.extend({}, n.ajax, {
                url: n.href,
                error: function(n, t) {
                    u.coming && t !== "abort" ? u._error("ajax", n) : u.hideLoading()
                },
                success: function(t, i) {
                    i === "success" && (n.content = t,
                    u._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var n = u.coming
              , t = i(n.tpl.iframe.replace(/\{rnd\}/g, +new Date)).attr("scrolling", s ? "auto" : n.iframe.scrolling).attr("src", n.href);
            if (i(n.wrap).bind("onReset", function() {
                try {
                    i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (n) {}
            }),
            n.iframe.preload) {
                u.showLoading();
                t.one("load", function() {
                    i(this).data("ready", 1),
                    s || i(this).bind("load.fb", u.update),
                    i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),
                    u._afterLoad()
                })
            }
            n.content = t.appendTo(n.inner),
            n.iframe.preload || u._afterLoad()
        },
        _preloadImages: function() {
            for (var r = u.group, i = u.current, f = r.length, e = i.preload ? Math.min(i.preload, f - 1) : 0, n, t = 1; t <= e; t += 1)
                n = r[(i.index + t) % f],
                n.type === "image" && n.href && ((new Image).src = n.href)
        },
        _afterLoad: function() {
            var r = u.coming, f = u.current, e = "fancybox-placeholder", t, n, c, o, s, h;
            if (u.hideLoading(),
            r && u.isActive !== !1) {
                if (!1 === u.trigger("afterLoad", r, f)) {
                    r.wrap.stop(!0).trigger("onReset").remove(),
                    u.coming = null;
                    return
                }
                f && (u.trigger("beforeChange", f),
                f.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),
                u.unbindEvents(),
                t = r,
                n = r.content,
                c = r.type,
                o = r.scrolling,
                i.extend(u, {
                    wrap: t.wrap,
                    skin: t.skin,
                    outer: t.outer,
                    inner: t.inner,
                    current: t,
                    previous: f
                }),
                s = t.href;
                switch (c) {
                case "inline":
                case "ajax":
                case "html":
                    t.selector ? n = i("<div>").html(n).find(t.selector) : a(n) && (n.data(e) || n.data(e, i('<div class="' + e + '"><\/div>').insertAfter(n).hide()),
                    n = n.show().detach(),
                    t.wrap.bind("onReset", function() {
                        i(this).find(n).length && n.hide().replaceAll(n.data(e)).data(e, !1)
                    }));
                    break;
                case "image":
                    n = t.tpl.image.replace("{href}", s);
                    break;
                case "swf":
                    n = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + s + '"><\/param>',
                    h = "",
                    i.each(t.swf, function(t, i) {
                        n += '<param name="' + t + '" value="' + i + '"><\/param>',
                        h += " " + t + '="' + i + '"'
                    }),
                    n += '<embed src="' + s + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "><\/embed><\/object>"
                }
                a(n) && n.parent().is(t.inner) || t.inner.append(n),
                u.trigger("beforeShow"),
                t.inner.css("overflow", o === "yes" ? "scroll" : o === "no" ? "hidden" : o),
                u._setDimension(),
                u.reposition(),
                u.isOpen = !1,
                u.coming = null,
                u.bindEvents(),
                u.isOpened ? f.prevMethod && u.transitions[f.prevMethod]() : i(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(),
                u.transitions[u.isOpened ? t.nextMethod : t.openMethod](),
                u._preloadImages()
            }
        },
        _setDimension: function() {
            var nt = u.getViewport(), wt = 0, vt = !1, st = !1, v = u.wrap, k = u.skin, e = u.inner, r = u.current, n = r.width, t = r.height, o = r.minWidth, s = r.minHeight, c = r.maxWidth, a = r.maxHeight, bt = r.scrolling, ft = r.scrollOutside ? r.scrollbarWidth : 0, et = r.margin, yt = f(et[1] + et[3]), pt = f(et[0] + et[2]), d, ht, tt, it, p, y, ct, lt, w, g, b, rt, ot, ut, at;
            if (v.add(k).add(e).width("auto").height("auto").removeClass("fancybox-tmp"),
            d = f(k.outerWidth(!0) - k.width()),
            ht = f(k.outerHeight(!0) - k.height()),
            tt = yt + d,
            it = pt + ht,
            p = l(n) ? (nt.w - tt) * f(n) / 100 : n,
            y = l(t) ? (nt.h - it) * f(t) / 100 : t,
            r.type === "iframe") {
                if (ut = r.content,
                r.autoHeight && ut.data("ready") === 1)
                    try {
                        ut[0].contentWindow.document.location && (e.width(p).height(9999),
                        at = ut.contents().find("body"),
                        ft && at.css("overflow-x", "hidden"),
                        y = at.outerHeight(!0))
                    } catch (kt) {}
            } else
                (r.autoWidth || r.autoHeight) && (e.addClass("fancybox-tmp"),
                r.autoWidth || e.width(p),
                r.autoHeight || e.height(y),
                r.autoWidth && (p = e.width()),
                r.autoHeight && (y = e.height()),
                e.removeClass("fancybox-tmp"));
            if (n = f(p),
            t = f(y),
            w = p / y,
            o = f(l(o) ? f(o, "w") - tt : o),
            c = f(l(c) ? f(c, "w") - tt : c),
            s = f(l(s) ? f(s, "h") - it : s),
            a = f(l(a) ? f(a, "h") - it : a),
            ct = c,
            lt = a,
            r.fitToView && (c = Math.min(nt.w - tt, c),
            a = Math.min(nt.h - it, a)),
            rt = nt.w - yt,
            ot = nt.h - pt,
            r.aspectRatio ? (n > c && (n = c,
            t = f(n / w)),
            t > a && (t = a,
            n = f(t * w)),
            n < o && (n = o,
            t = f(n / w)),
            t < s && (t = s,
            n = f(t * w))) : (n = Math.max(o, Math.min(n, c)),
            r.autoHeight && r.type !== "iframe" && (e.width(n),
            t = e.height()),
            t = Math.max(s, Math.min(t, a))),
            r.fitToView)
                if (e.width(n).height(t),
                v.width(n + d),
                g = v.width(),
                b = v.height(),
                r.aspectRatio)
                    while ((g > rt || b > ot) && n > o && t > s) {
                        if (wt++ > 19)
                            break;
                        t = Math.max(s, Math.min(a, t - 10)),
                        n = f(t * w),
                        n < o && (n = o,
                        t = f(n / w)),
                        n > c && (n = c,
                        t = f(n / w)),
                        e.width(n).height(t),
                        v.width(n + d),
                        g = v.width(),
                        b = v.height()
                    }
                else
                    n = Math.max(o, Math.min(n, n - (g - rt))),
                    t = Math.max(s, Math.min(t, t - (b - ot)));
            ft && bt === "auto" && t < y && n + d + ft < rt && (n += ft),
            e.width(n).height(t),
            v.width(n + d),
            g = v.width(),
            b = v.height(),
            vt = (g > rt || b > ot) && n > o && t > s,
            st = r.aspectRatio ? n < ct && t < lt && n < p && t < y : (n < ct || t < lt) && (n < p || t < y),
            i.extend(r, {
                dim: {
                    width: h(g),
                    height: h(b)
                },
                origWidth: p,
                origHeight: y,
                canShrink: vt,
                canExpand: st,
                wPadding: d,
                hPadding: ht,
                wrapSpace: b - k.outerHeight(!0),
                skinSpace: k.height() - t
            }),
            !ut && r.autoHeight && t > s && t < a && !st && e.height("auto")
        },
        _getPosition: function(n) {
            var i = u.current
              , r = u.getViewport()
              , f = i.margin
              , e = u.wrap.width() + f[1] + f[3]
              , o = u.wrap.height() + f[0] + f[2]
              , t = {
                position: "absolute",
                top: f[0],
                left: f[3]
            };
            return i.autoCenter && i.fixed && !n && o <= r.h && e <= r.w ? t.position = "fixed" : i.locked || (t.top += r.y,
            t.left += r.x),
            t.top = h(Math.max(t.top, t.top + (r.h - o) * i.topRatio)),
            t.left = h(Math.max(t.left, t.left + (r.w - e) * i.leftRatio)),
            t
        },
        _afterZoomIn: function() {
            var n = u.current;
            n && (u.isOpen = u.isOpened = !0,
            u.wrap.css("overflow", "visible").addClass("fancybox-opened"),
            u.update(),
            (n.closeClick || n.nextClick && u.group.length > 1) && u.inner.css("cursor", "pointer").bind("click.fb", function(t) {
                i(t.target).is("a") || i(t.target).parent().is("a") || (t.preventDefault(),
                u[n.closeClick ? "close" : "next"]())
            }),
            n.closeBtn && i(n.tpl.closeBtn).appendTo(u.skin).bind("click.fb", function(n) {
                n.preventDefault(),
                u.close()
            }),
            n.arrows && u.group.length > 1 && ((n.loop || n.index > 0) && i(n.tpl.prev).appendTo(u.outer).bind("click.fb", u.prev),
            (n.loop || n.index < u.group.length - 1) && i(n.tpl.next).appendTo(u.outer).bind("click.fb", u.next)),
            u.trigger("afterShow"),
            n.loop || n.index !== n.group.length - 1 ? u.opts.autoPlay && !u.player.isActive && (u.opts.autoPlay = !1,
            u.play()) : u.play(!1))
        },
        _afterZoomOut: function(n) {
            n = n || u.current,
            i(".fancybox-wrap").trigger("onReset").remove(),
            i.extend(u, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }),
            u.trigger("afterClose", n)
        }
    }),
    u.transitions = {
        getOrigPosition: function() {
            var n = u.current
              , f = n.element
              , t = n.orig
              , i = {}
              , e = 50
              , o = 50
              , s = n.hPadding
              , c = n.wPadding
              , r = u.getViewport();
            return !t && n.isDom && f.is(":visible") && (t = f.find("img:first"),
            t.length || (t = f)),
            a(t) ? (i = t.offset(),
            t.is("img") && (e = t.outerWidth(),
            o = t.outerHeight())) : (i.top = r.y + (r.h - o) * n.topRatio,
            i.left = r.x + (r.w - e) * n.leftRatio),
            (u.wrap.css("position") === "fixed" || n.locked) && (i.top -= r.y,
            i.left -= r.x),
            i = {
                top: h(i.top - s * n.topRatio),
                left: h(i.left - c * n.leftRatio),
                width: h(e + c),
                height: h(o + s)
            }
        },
        step: function(n, t) {
            var r, s, e, i = t.prop, o = u.current, h = o.wrapSpace, c = o.skinSpace;
            (i === "width" || i === "height") && (r = t.end === t.start ? 1 : (n - t.start) / (t.end - t.start),
            u.isClosing && (r = 1 - r),
            s = i === "width" ? o.wPadding : o.hPadding,
            e = n - s,
            u.skin[i](f(i === "width" ? e : e - h * r)),
            u.inner[i](f(i === "width" ? e : e - h * r - c * r)))
        },
        zoomIn: function() {
            var n = u.current
              , t = n.pos
              , r = n.openEffect
              , f = r === "elastic"
              , e = i.extend({
                opacity: 1
            }, t);
            delete e.position,
            f ? (t = this.getOrigPosition(),
            n.openOpacity && (t.opacity = .1)) : r === "fade" && (t.opacity = .1),
            u.wrap.css(t).animate(e, {
                duration: r === "none" ? 0 : n.openSpeed,
                easing: n.openEasing,
                step: f ? this.step : null,
                complete: u._afterZoomIn
            })
        },
        zoomOut: function() {
            var n = u.current
              , i = n.closeEffect
              , r = i === "elastic"
              , t = {
                opacity: .1
            };
            r && (t = this.getOrigPosition(),
            n.closeOpacity && (t.opacity = .1)),
            u.wrap.animate(t, {
                duration: i === "none" ? 0 : n.closeSpeed,
                easing: n.closeEasing,
                step: r ? this.step : null,
                complete: u._afterZoomOut
            })
        },
        changeIn: function() {
            var i = u.current, s = i.nextEffect, t = i.pos, o = {
                opacity: 1
            }, r = u.direction, e = 200, n;
            t.opacity = .1,
            s === "elastic" && (n = r === "down" || r === "up" ? "top" : "left",
            r === "down" || r === "right" ? (t[n] = h(f(t[n]) - e),
            o[n] = "+=" + e + "px") : (t[n] = h(f(t[n]) + e),
            o[n] = "-=" + e + "px")),
            s === "none" ? u._afterZoomIn() : u.wrap.css(t).animate(o, {
                duration: i.nextSpeed,
                easing: i.nextEasing,
                complete: u._afterZoomIn
            })
        },
        changeOut: function() {
            var n = u.previous
              , r = n.prevEffect
              , f = {
                opacity: .1
            }
              , t = u.direction
              , e = 200;
            r === "elastic" && (f[t === "down" || t === "up" ? "top" : "left"] = (t === "up" || t === "left" ? "-" : "+") + "=" + e + "px"),
            n.wrap.animate(f, {
                duration: r === "none" ? 0 : n.prevSpeed,
                easing: n.prevEasing,
                complete: function() {
                    i(this).trigger("onReset").remove()
                }
            })
        }
    },
    u.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !s,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: i("html"),
        create: function(n) {
            n = i.extend({}, this.defaults, n),
            this.overlay && this.close(),
            this.overlay = i('<div class="fancybox-overlay"><\/div>').appendTo(u.coming ? u.coming.parent : n.parent),
            this.fixed = !1,
            n.fixed && u.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"),
            this.fixed = !0)
        },
        open: function(n) {
            var t = this;
            n = i.extend({}, this.defaults, n),
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(n),
            this.fixed || (e.bind("resize.overlay", i.proxy(this.update, this)),
            this.update()),
            n.closeClick && this.overlay.bind("click.overlay", function(n) {
                if (i(n.target).hasClass("fancybox-overlay"))
                    return u.isActive ? u.close() : t.close(),
                    !1
            }),
            this.overlay.css(n.css).show()
        },
        close: function() {
            var n, t;
            e.unbind("resize.overlay"),
            this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"),
            n = e.scrollTop(),
            t = e.scrollLeft(),
            this.el.removeClass("fancybox-lock"),
            e.scrollTop(n).scrollLeft(t)),
            i(".fancybox-overlay").remove().hide(),
            i.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var n = "100%", i;
            this.overlay.width(n).height("100%"),
            y ? (i = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth),
            o.width() > i && (n = o.width())) : o.width() > e.width() && (n = o.width()),
            this.overlay.width(n).height(o.height())
        },
        onReady: function(n, t) {
            var r = this.overlay;
            i(".fancybox-overlay").stop(!0, !0),
            r || this.create(n),
            n.locked && this.fixed && t.fixed && (r || (this.margin = o.height() > e.height() ? i("html").css("margin-right").replace("px", "") : !1),
            t.locked = this.overlay.append(t.wrap),
            t.fixed = !1),
            n.showEarly === !0 && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(n, t) {
            var r, u;
            t.locked && (this.margin !== !1 && (i("*").filter(function() {
                return i(this).css("position") === "fixed" && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"),
            this.el.addClass("fancybox-margin")),
            r = e.scrollTop(),
            u = e.scrollLeft(),
            this.el.addClass("fancybox-lock"),
            e.scrollTop(r).scrollLeft(u)),
            this.open(n)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(n) {
            this.overlay && !u.coming && this.overlay.fadeOut(n.speedOut, i.proxy(this.close, this))
        }
    },
    u.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(n) {
            var o = u.current, r = o.title, s = n.type, t, e;
            if (i.isFunction(r) && (r = r.call(o.element, o)),
            c(r) && i.trim(r) !== "") {
                t = i('<div class="fancybox-title fancybox-title-' + s + '-wrap">' + r + "<\/div>");
                switch (s) {
                case "inside":
                    e = u.skin;
                    break;
                case "outside":
                    e = u.wrap;
                    break;
                case "over":
                    e = u.inner;
                    break;
                default:
                    e = u.skin,
                    t.appendTo("body"),
                    y && t.width(t.width()),
                    t.wrapInner('<span class="child"><\/span>'),
                    u.current.margin[2] += Math.abs(f(t.css("margin-bottom")))
                }
                t[n.position === "top" ? "prependTo" : "appendTo"](e)
            }
        }
    },
    i.fn.fancybox = function(n) {
        var r, f = i(this), t = this.selector || "", e = function(e) {
            var o = i(this).blur(), c = r, h, s;
            e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || o.is(".fancybox-wrap") || (h = n.groupAttr || "data-fancybox-group",
            s = o.attr(h),
            s || (h = "rel",
            s = o.get(0)[h]),
            s && s !== "" && s !== "nofollow" && (o = t.length ? i(t) : f,
            o = o.filter("[" + h + '="' + s + '"]'),
            c = o.index(this)),
            n.index = c,
            u.open(o, n) !== !1 && e.preventDefault())
        };
        return n = n || {},
        r = n.index || 0,
        t && n.live !== !1 ? o.undelegate(t, "click.fb-start").delegate(t + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", e) : f.unbind("click.fb-start").bind("click.fb-start", e),
        this.filter("[data-fancybox-start=1]").trigger("click"),
        this
    }
    ,
    o.ready(function() {
        var t, f;
        i.scrollbarWidth === r && (i.scrollbarWidth = function() {
            var n = i('<div style="width:50px;height:50px;overflow:auto"><div/><\/div>').appendTo("body")
              , t = n.children()
              , r = t.innerWidth() - t.height(99).innerWidth();
            return n.remove(),
            r
        }
        ),
        i.support.fixedPosition === r && (i.support.fixedPosition = function() {
            var n = i('<div style="position:fixed;top:20px;"><\/div>').appendTo("body")
              , t = n[0].offsetTop === 20 || n[0].offsetTop === 15;
            return n.remove(),
            t
        }()),
        i.extend(u.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i("body")
        }),
        t = i(n).width(),
        p.addClass("fancybox-lock-test"),
        f = i(n).width(),
        p.removeClass("fancybox-lock-test"),
        i("<style type='text/css'>.fancybox-margin{margin-right:" + (f - t) + "px;}<\/style>").appendTo("head")
    })
}(window, document, jQuery),
function(n) {
    function i(t) {
        var i = t || window.event
          , e = [].slice.call(arguments, 1)
          , r = 0
          , f = 0
          , u = 0
          , t = n.event.fix(i);
        return t.type = "mousewheel",
        i.wheelDelta && (r = i.wheelDelta / 120),
        i.detail && (r = -i.detail / 3),
        u = r,
        i.axis !== void 0 && i.axis === i.HORIZONTAL_AXIS && (u = 0,
        f = -1 * r),
        i.wheelDeltaY !== void 0 && (u = i.wheelDeltaY / 120),
        i.wheelDeltaX !== void 0 && (f = i.wheelDeltaX / -120),
        e.unshift(t, r, f, u),
        (n.event.dispatch || n.event.handle).apply(this, e)
    }
    var t = ["DOMMouseScroll", "mousewheel"], r;
    if (n.event.fixHooks)
        for (r = t.length; r; )
            n.event.fixHooks[t[--r]] = n.event.mouseHooks;
    n.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var n = t.length; n; )
                    this.addEventListener(t[--n], i, !1);
            else
                this.onmousewheel = i
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var n = t.length; n; )
                    this.removeEventListener(t[--n], i, !1);
            else
                this.onmousewheel = null
        }
    },
    n.fn.extend({
        mousewheel: function(n) {
            return n ? this.bind("mousewheel", n) : this.trigger("mousewheel")
        },
        unmousewheel: function(n) {
            return this.unbind("mousewheel", n)
        }
    })
}(jQuery),
JSON || (JSON = {}),
function() {
    "use strict";
    function i(n) {
        return n < 10 ? "0" + n : n
    }
    function f(n) {
        return o.lastIndex = 0,
        o.test(n) ? '"' + n.replace(o, function(n) {
            var t = s[n];
            return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + n + '"'
    }
    function r(i, e) {
        var s, l, h, a, v = n, c, o = e[i];
        o && typeof o == "object" && typeof o.toJSON == "function" && (o = o.toJSON(i)),
        typeof t == "function" && (o = t.call(e, i, o));
        switch (typeof o) {
        case "string":
            return f(o);
        case "number":
            return isFinite(o) ? String(o) : "null";
        case "boolean":
        case "null":
            return String(o);
        case "object":
            if (!o)
                return "null";
            if (n += u,
            c = [],
            Object.prototype.toString.apply(o) === "[object Array]") {
                for (a = o.length,
                s = 0; s < a; s += 1)
                    c[s] = r(s, o) || "null";
                return h = c.length === 0 ? "[]" : n ? "[\n" + n + c.join(",\n" + n) + "\n" + v + "]" : "[" + c.join(",") + "]",
                n = v,
                h
            }
            if (t && typeof t == "object")
                for (a = t.length,
                s = 0; s < a; s += 1)
                    typeof t[s] == "string" && (l = t[s],
                    h = r(l, o),
                    h && c.push(f(l) + (n ? ": " : ":") + h));
            else
                for (l in o)
                    Object.prototype.hasOwnProperty.call(o, l) && (h = r(l, o),
                    h && c.push(f(l) + (n ? ": " : ":") + h));
            return h = c.length === 0 ? "{}" : n ? "{\n" + n + c.join(",\n" + n) + "\n" + v + "}" : "{" + c.join(",") + "}",
            n = v,
            h
        }
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    }
    );
    var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, o = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, n, u, s = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, t;
    typeof JSON.stringify != "function" && (JSON.stringify = function(i, f, e) {
        var o;
        if (n = "",
        u = "",
        typeof e == "number")
            for (o = 0; o < e; o += 1)
                u += " ";
        else
            typeof e == "string" && (u = e);
        if (t = f,
        f && typeof f != "function" && (typeof f != "object" || typeof f.length != "number"))
            throw new Error("JSON.stringify");
        return r("", {
            "": i
        })
    }
    ),
    typeof JSON.parse != "function" && (JSON.parse = function(n, t) {
        function r(n, i) {
            var f, e, u = n[i];
            if (u && typeof u == "object")
                for (f in u)
                    Object.prototype.hasOwnProperty.call(u, f) && (e = r(u, f),
                    e !== undefined ? u[f] = e : delete u[f]);
            return t.call(n, i, u)
        }
        var i;
        if (n = String(n),
        e.lastIndex = 0,
        e.test(n) && (n = n.replace(e, function(n) {
            return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
        })),
        /^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return i = eval("(" + n + ")"),
            typeof t == "function" ? r({
                "": i
            }, "") : i;
        throw new SyntaxError("JSON.parse");
    }
    )
}(),
function(n, t, i) {
    (function(n) {
        "use strict";
        typeof define == "function" && define.amd ? define(["jquery"], n) : jQuery && !jQuery.fn.qtip && n(jQuery)
    })(function(r) {
        function et(i) {
            b = {
                pageX: i.pageX,
                pageY: i.pageY,
                type: "mousemove",
                scrollX: n.pageXOffset || t.body.scrollLeft || t.documentElement.scrollLeft,
                scrollY: n.pageYOffset || t.body.scrollTop || t.documentElement.scrollTop
            }
        }
        function ut(n) {
            var t = function(n) {
                return n === s || "object" != typeof n
            }
              , i = function(n) {
                return !r.isFunction(n) && (!n && !n.attr || n.length < 1 || "object" == typeof n && !n.jquery && !n.then)
            };
            return !n || "object" != typeof n ? u : (t(n.metadata) && (n.metadata = {
                type: n.metadata
            }),
            "content"in n && ((t(n.content) || n.content.jquery) && (n.content = {
                text: n.content
            }),
            i(n.content.text || u) && (n.content.text = u),
            "title"in n.content && (t(n.content.title) && (n.content.title = {
                text: n.content.title
            }),
            i(n.content.title.text || u) && (n.content.title.text = u))),
            "position"in n && t(n.position) && (n.position = {
                my: n.position,
                at: n.position
            }),
            "show"in n && t(n.show) && (n.show = n.show.jquery ? {
                target: n.show
            } : {
                event: n.show
            }),
            "hide"in n && t(n.hide) && (n.hide = n.hide.jquery ? {
                target: n.hide
            } : {
                event: n.hide
            }),
            "style"in n && t(n.style) && (n.style = {
                classes: n.style
            }),
            r.each(e, function() {
                this.sanitize && this.sanitize(n)
            }),
            n)
        }
        function ht(v, w, d, g) {
            function ti(n) {
                for (var r = 0, u, t = w, i = n.split("."); t = t[i[r++]]; )
                    r < i.length && (u = t);
                return [u || w, i.pop()]
            }
            function pt(n) {
                return bt.concat("").join(n ? "-" + n + " " : " ")
            }
            function ii() {
                var n = w.style.widget
                  , t = rt.hasClass(at);
                rt.removeClass(at),
                at = n ? "ui-state-disabled" : "qtip-disabled",
                rt.toggleClass(at, t),
                rt.toggleClass("ui-helper-reset " + pt(), n).toggleClass(st, w.style.def && !n),
                ht.content && ht.content.toggleClass(pt("content"), n),
                ht.titlebar && ht.titlebar.toggleClass(pt("header"), n),
                ht.button && ht.button.toggleClass(a + "-icon", !n)
            }
            function dt(n) {
                ht.title && (ht.titlebar.remove(),
                ht.titlebar = ht.title = ht.button = s,
                n !== u && it.reposition())
            }
            function gt() {
                var n = w.content.title.button
                  , i = typeof n == "string"
                  , t = i ? n : "Close tooltip";
                ht.button && ht.button.remove(),
                ht.button = n.jquery ? n : r("<a />", {
                    "class": "qtip-close " + (w.style.widget ? "" : a + "-icon"),
                    title: t,
                    "aria-label": t
                }).prepend(r("<span />", {
                    "class": "ui-icon ui-icon-close",
                    html: "&times;"
                })),
                ht.button.appendTo(ht.titlebar || rt).attr("role", "button").click(function(n) {
                    return rt.hasClass(at) || it.hide(n),
                    u
                })
            }
            function ri() {
                var n = yt + "-title";
                ht.titlebar && dt(),
                ht.titlebar = r("<div />", {
                    "class": a + "-titlebar " + (w.style.widget ? pt("header") : "")
                }).append(ht.title = r("<div />", {
                    id: n,
                    "class": a + "-title",
                    "aria-atomic": f
                })).insertBefore(ht.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(n) {
                    r(this).toggleClass("ui-state-active ui-state-focus", n.type.substr(-4) === "down")
                }).delegate(".qtip-close", "mouseover mouseout", function(n) {
                    r(this).toggleClass("ui-state-hover", n.type === "mouseover")
                }),
                w.content.title.button && gt()
            }
            function si(n) {
                var t = ht.button;
                if (!it.rendered)
                    return u;
                n ? gt() : t.remove()
            }
            function ni(n, t) {
                var i = ht.title;
                if (!it.rendered || !n)
                    return u;
                if (r.isFunction(n) && (n = n.call(v, ct.event, it)),
                n === u || !n && n !== "")
                    return dt(u);
                n.jquery && n.length > 0 ? i.empty().append(n.css({
                    display: "block"
                })) : i.html(n),
                t !== u && it.rendered && rt[0].offsetWidth > 0 && it.reposition(ct.event)
            }
            function ui(n) {
                n && r.isFunction(n.done) && n.done(function(n) {
                    wt(n, null, u)
                })
            }
            function wt(n, t, f) {
                function o(n) {
                    function o(i) {
                        i && (delete f[i.src],
                        clearTimeout(it.timers.img[i.src]),
                        r(i).unbind(lt)),
                        r.isEmptyObject(f) && (t !== u && it.reposition(ct.event),
                        n())
                    }
                    var s, f = {};
                    if ((s = e.find("img[src]:not([height]):not([width])")).length === 0)
                        return o();
                    s.each(function(n, t) {
                        if (f[t.src] === i) {
                            var u = 0
                              , e = 3;
                            (function s() {
                                if (t.height || t.width || u > e)
                                    return o(t);
                                u += 1,
                                it.timers.img[t.src] = setTimeout(s, 700)
                            })(),
                            r(t).bind("error" + lt + " load" + lt, function() {
                                o(this)
                            }),
                            f[t.src] = t
                        }
                    })
                }
                var e = ht.content;
                return !it.rendered || !n ? u : (r.isFunction(n) && (n = n.call(v, ct.event, it) || ""),
                f !== u && ui(w.content.deferred),
                n.jquery && n.length > 0 ? e.empty().append(n.css({
                    display: "block"
                })) : e.html(n),
                it.rendered < 0 ? rt.queue("fx", o) : (oi = 0,
                o(r.noop)),
                it)
            }
            function fi() {
                function s(n) {
                    if (rt.hasClass(at))
                        return u;
                    clearTimeout(it.timers.show),
                    clearTimeout(it.timers.hide);
                    var t = function() {
                        it.toggle(f, n)
                    };
                    w.show.delay > 0 ? it.timers.show = setTimeout(t, w.show.delay) : t()
                }
                function h(n) {
                    if (rt.hasClass(at) || vt || oi)
                        return u;
                    var t = r(n.relatedTarget || n.target)
                      , f = t.closest(k)[0] === rt[0]
                      , o = t[0] === i.show[0];
                    if (clearTimeout(it.timers.show),
                    clearTimeout(it.timers.hide),
                    e.target === "mouse" && f || w.hide.fixed && /mouse(out|leave|move)/.test(n.type) && (f || o)) {
                        try {
                            n.preventDefault(),
                            n.stopImmediatePropagation()
                        } catch (s) {}
                        return
                    }
                    w.hide.delay > 0 ? it.timers.hide = setTimeout(function() {
                        it.hide(n)
                    }, w.hide.delay) : it.hide(n)
                }
                function l(n) {
                    if (rt.hasClass(at))
                        return u;
                    clearTimeout(it.timers.inactive),
                    it.timers.inactive = setTimeout(function() {
                        it.hide(n)
                    }, w.hide.inactive)
                }
                function a(n) {
                    it.rendered && rt[0].offsetWidth > 0 && it.reposition(n)
                }
                var e = w.position
                  , i = {
                    show: w.show.target,
                    hide: w.hide.target,
                    viewport: r(e.viewport),
                    document: r(t),
                    body: r(t.body),
                    window: r(n)
                }
                  , o = {
                    show: r.trim("" + w.show.event).split(" "),
                    hide: r.trim("" + w.hide.event).split(" ")
                }
                  , y = r.browser.msie && parseInt(r.browser.version, 10) === 6;
                rt.bind("mouseenter" + lt + " mouseleave" + lt, function(n) {
                    var t = n.type === "mouseenter";
                    t && it.focus(n),
                    rt.toggleClass(kt, t)
                }),
                /mouse(out|leave)/i.test(w.hide.event) && w.hide.leave === "window" && i.window.bind("mouseout" + lt + " blur" + lt, function(n) {
                    /select|option/.test(n.target.nodeName) || n.relatedTarget || it.hide(n)
                }),
                w.hide.fixed ? (i.hide = i.hide.add(rt),
                rt.bind("mouseover" + lt, function() {
                    rt.hasClass(at) || clearTimeout(it.timers.hide)
                })) : /mouse(over|enter)/i.test(w.show.event) && i.hide.bind("mouseleave" + lt, function() {
                    clearTimeout(it.timers.show)
                }),
                ("" + w.hide.event).indexOf("unfocus") > -1 && e.container.closest("html").bind("mousedown" + lt + " touchstart" + lt, function(n) {
                    var t = r(n.target)
                      , u = it.rendered && !rt.hasClass(at) && rt[0].offsetWidth > 0
                      , i = t.parents(k).filter(rt[0]).length > 0;
                    t[0] === v[0] || t[0] === rt[0] || i || v.has(t[0]).length || t.attr("disabled") || it.hide(n)
                }),
                "number" == typeof w.hide.inactive && (i.show.bind("qtip-" + d + "-inactive", l),
                r.each(c.inactiveEvents, function(n, t) {
                    i.hide.add(ht.tooltip).bind(t + lt + "-inactive", l)
                })),
                r.each(o.hide, function(n, t) {
                    var u = r.inArray(t, o.show)
                      , f = r(i.hide);
                    u > -1 && f.add(i.show).length === f.length || t === "unfocus" ? (i.show.bind(t + lt, function(n) {
                        rt[0].offsetWidth > 0 ? h(n) : s(n)
                    }),
                    delete o.show[u]) : i.hide.bind(t + lt, h)
                }),
                r.each(o.show, function(n, t) {
                    i.show.bind(t + lt, s)
                }),
                "number" == typeof w.hide.distance && i.show.add(rt).bind("mousemove" + lt, function(n) {
                    var t = ct.origin || {}
                      , i = w.hide.distance
                      , r = Math.abs;
                    (r(n.pageX - t.pageX) >= i || r(n.pageY - t.pageY) >= i) && it.hide(n)
                }),
                e.target === "mouse" && (i.show.bind("mousemove" + lt, et),
                e.adjust.mouse && (w.hide.event && (rt.bind("mouseleave" + lt, function(n) {
                    (n.relatedTarget || n.target) !== i.show[0] && it.hide(n)
                }),
                ht.target.bind("mouseenter" + lt + " mouseleave" + lt, function(n) {
                    ct.onTarget = n.type === "mouseenter"
                })),
                i.document.bind("mousemove" + lt, function(n) {
                    it.rendered && ct.onTarget && !rt.hasClass(at) && rt[0].offsetWidth > 0 && it.reposition(n || b)
                }))),
                (e.adjust.resize || i.viewport.length) && (r.event.special.resize ? i.viewport : i.window).bind("resize" + lt, a),
                i.window.bind("scroll" + lt, a)
            }
            function ei() {
                var i = [w.show.target[0], w.hide.target[0], it.rendered && ht.tooltip[0], w.position.container[0], w.position.viewport[0], w.position.container.closest("html")[0], n, t];
                it.rendered ? r([]).pushStack(r.grep(i, function(n) {
                    return typeof n == "object"
                })).unbind(lt) : w.show.target.unbind(lt + "-create")
            }
            var it = this, hi = t.body, yt = a + "-" + d, vt = 0, oi = 0, rt = r(), lt = ".qtip-" + d, at = "qtip-disabled", ht, ct;
            it.id = d,
            it.rendered = u,
            it.destroyed = u,
            it.elements = ht = {
                target: v
            },
            it.timers = {
                img: {}
            },
            it.options = w,
            it.checks = {},
            it.plugins = {},
            it.cache = ct = {
                event: {},
                target: r(),
                disabled: u,
                attr: g,
                onTarget: u,
                lastClass: ""
            },
            it.checks.builtin = {
                "^id$": function(n, t, i) {
                    var o = i === f ? c.nextid : i
                      , e = a + "-" + o;
                    o !== u && o.length > 0 && !r("#" + e).length && (rt[0].id = e,
                    ht.content[0].id = e + "-content",
                    ht.title[0].id = e + "-title")
                },
                "^content.text$": function() {
                    wt(w.content.text)
                },
                "^content.deferred$": function() {
                    ui(w.content.deferred)
                },
                "^content.title.text$": function(n, t, i) {
                    if (!i)
                        return dt();
                    !ht.title && i && ri(),
                    ni(i)
                },
                "^content.title.button$": function(n, t, i) {
                    si(i)
                },
                "^position.(my|at)$": function(n, t, i) {
                    "string" == typeof i && (n[t] = new e.Corner(i))
                },
                "^position.container$": function(n, t, i) {
                    it.rendered && rt.appendTo(i)
                },
                "^show.ready$": function() {
                    it.rendered ? it.toggle(f) : it.render(1)
                },
                "^style.classes$": function(n, t, i) {
                    rt.attr("class", a + " qtip " + i)
                },
                "^style.width|height": function(n, t, i) {
                    rt.css(t, i)
                },
                "^style.widget|content.title": ii,
                "^events.(render|show|move|hide|focus|blur)$": function(n, t, i) {
                    rt[(r.isFunction(i) ? "" : "un") + "bind"]("tooltip" + t, i)
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    var n = w.position;
                    rt.attr("tracking", n.target === "mouse" && n.adjust.mouse),
                    ei(),
                    fi()
                }
            },
            r.extend(it, {
                _triggerEvent: function(n, t, i) {
                    var u = r.Event("tooltip" + n);
                    return u.originalEvent = (i ? r.extend({}, i) : s) || ct.event || s,
                    rt.trigger(u, [it].concat(t || [])),
                    !u.isDefaultPrevented()
                },
                render: function(n) {
                    if (it.rendered)
                        return it;
                    var i = w.content.text
                      , t = w.content.title
                      , o = w.position;
                    return r.attr(v[0], "aria-describedby", yt),
                    rt = ht.tooltip = r("<div/>", {
                        id: yt,
                        "class": [a, st, w.style.classes, a + "-pos-" + w.position.my.abbrev()].join(" "),
                        width: w.style.width || "",
                        height: w.style.height || "",
                        tracking: o.target === "mouse" && o.adjust.mouse,
                        role: "alert",
                        "aria-live": "polite",
                        "aria-atomic": u,
                        "aria-describedby": yt + "-content",
                        "aria-hidden": f
                    }).toggleClass(at, ct.disabled).data("qtip", it).appendTo(w.position.container).append(ht.content = r("<div />", {
                        "class": a + "-content",
                        id: yt + "-content",
                        "aria-atomic": f
                    })),
                    it.rendered = -1,
                    vt = 1,
                    t.text ? (ri(),
                    r.isFunction(t.text) || ni(t.text, u)) : t.button && gt(),
                    (!r.isFunction(i) || i.then) && wt(i, u),
                    it.rendered = f,
                    ii(),
                    r.each(w.events, function(n, t) {
                        r.isFunction(t) && rt.bind(n === "toggle" ? "tooltipshow tooltiphide" : "tooltip" + n, t)
                    }),
                    r.each(e, function() {
                        this.initialize === "render" && this(it)
                    }),
                    fi(),
                    rt.queue("fx", function(t) {
                        it._triggerEvent("render"),
                        vt = 0,
                        (w.show.ready || n) && it.toggle(f, ct.event, u),
                        t()
                    }),
                    it
                },
                get: function(n) {
                    var t, i;
                    switch (n.toLowerCase()) {
                    case "dimensions":
                        t = {
                            height: rt.outerHeight(u),
                            width: rt.outerWidth(u)
                        };
                        break;
                    case "offset":
                        t = e.offset(rt, w.position.container);
                        break;
                    default:
                        i = ti(n.toLowerCase()),
                        t = i[0][i[1]],
                        t = t.precedance ? t.string() : t
                    }
                    return t
                },
                set: function(n, t) {
                    function h(n, t) {
                        var i, r, u;
                        for (i in e)
                            for (r in e[i])
                                (u = new RegExp(r,"i").exec(n)) && (t.push(u),
                                e[i][r].apply(it, t))
                    }
                    var c = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i, l = /^content\.(title|attr)|style/i, i = u, e = it.checks, o;
                    return "string" == typeof n ? (o = n,
                    n = {},
                    n[o] = t) : n = r.extend(f, {}, n),
                    r.each(n, function(t, u) {
                        var f = ti(t.toLowerCase()), e;
                        e = f[0][f[1]],
                        f[0][f[1]] = "object" == typeof u && u.nodeType ? r(u) : u,
                        n[t] = [f[0], f[1], u, e],
                        i = c.test(t) || i
                    }),
                    ut(w),
                    vt = 1,
                    r.each(n, h),
                    vt = 0,
                    it.rendered && rt[0].offsetWidth > 0 && i && it.reposition(w.position.target === "mouse" ? s : ct.event),
                    it
                },
                toggle: function(n, i) {
                    function s() {
                        n ? (r.browser.msie && rt[0].style.removeAttribute("filter"),
                        rt.css("overflow", ""),
                        "string" == typeof e.autofocus && r(e.autofocus, rt).focus(),
                        e.target.trigger("qtip-" + d + "-inactive")) : rt.css({
                            display: "",
                            visibility: "",
                            opacity: "",
                            left: "",
                            top: ""
                        }),
                        it._triggerEvent(n ? "visible" : "hidden")
                    }
                    if (i) {
                        if (/over|enter/.test(i.type) && /out|leave/.test(ct.event.type) && w.show.target.add(i.target).length === w.show.target.length && rt.has(i.relatedTarget).length)
                            return it;
                        ct.event = r.extend({}, i)
                    }
                    if (!it.rendered)
                        return n ? it.render(1) : it;
                    var h = n ? "show" : "hide", e = w[h], y = w[n ? "hide" : "show"], c = w.position, o = w.content, l = rt[0].offsetWidth > 0, a = n || e.target.length === 1, v = !i || e.target.length < 2 || ct.target[0] === i.target, p, g;
                    return (typeof n).search("boolean|number") && (n = !l),
                    !rt.is(":animated") && l === n && v ? it : it._triggerEvent(h, [90]) ? (r.attr(rt[0], "aria-hidden", !n),
                    n ? (ct.origin = r.extend({}, b),
                    it.focus(i),
                    r.isFunction(o.text) && wt(o.text, u),
                    r.isFunction(o.title.text) && ni(o.title.text, u),
                    !ft && c.target === "mouse" && c.adjust.mouse && (r(t).bind("mousemove.qtip", et),
                    ft = f),
                    it.reposition(i, arguments[2]),
                    !e.solo || r(k, e.solo).not(rt).qtip("hide", r.Event("tooltipsolo"))) : (clearTimeout(it.timers.show),
                    delete ct.origin,
                    ft && !r(k + '[tracking="true"]:visible', e.solo).not(rt).length && (r(t).unbind("mousemove.qtip"),
                    ft = u),
                    it.blur(i)),
                    e.effect === u || a === u ? (rt[h](),
                    s.call(rt)) : r.isFunction(e.effect) ? (rt.stop(1, 1),
                    e.effect.call(rt, it),
                    rt.queue("fx", function(n) {
                        s(),
                        n()
                    })) : rt.fadeTo(90, n ? 1 : 0, s),
                    n && e.target.trigger("qtip-" + d + "-inactive"),
                    it) : it
                },
                show: function(n) {
                    return it.toggle(f, n)
                },
                hide: function(n) {
                    return it.toggle(u, n)
                },
                focus: function(n) {
                    if (!it.rendered)
                        return it;
                    var t = r(k), u = parseInt(rt[0].style.zIndex, 10), i = c.zindex + t.length, f = r.extend({}, n), e;
                    return rt.hasClass(nt) || it._triggerEvent("focus", [i], f) && (u !== i && (t.each(function() {
                        this.style.zIndex > u && (this.style.zIndex = this.style.zIndex - 1)
                    }),
                    t.filter("." + nt).qtip("blur", f)),
                    rt.addClass(nt)[0].style.zIndex = i),
                    it
                },
                blur: function(n) {
                    return rt.removeClass(nt),
                    it._triggerEvent("blur", [rt.css("zIndex")], n),
                    it
                },
                reposition: function(i, f) {
                    if (!it.rendered || vt)
                        return it;
                    vt = 1;
                    var c = w.position.target, a = w.position, ut = a.my, v = a.at, d = a.adjust, lt = d.method.split(" "), ot = rt.outerWidth(u), st = rt.outerHeight(u), g = 0, nt = 0, at = rt.css("position"), ft = a.viewport, s = {
                        left: 0,
                        top: 0
                    }, yt = a.container, pt = rt[0].offsetWidth > 0, wt = i && i.type === "scroll", et = r(n), k, tt;
                    if (r.isArray(c) && c.length === 2)
                        v = {
                            x: l,
                            y: h
                        },
                        s = {
                            left: c[0],
                            top: c[1]
                        };
                    else if (c === "mouse" && (i && i.pageX || ct.event.pageX))
                        v = {
                            x: l,
                            y: h
                        },
                        i = b && b.pageX && (d.mouse || !i || !i.pageX) ? {
                            pageX: b.pageX,
                            pageY: b.pageY
                        } : (!i || i.type !== "resize" && i.type !== "scroll" ? i && i.pageX && i.type === "mousemove" ? i : !d.mouse && ct.origin && ct.origin.pageX && w.show.distance ? ct.origin : i : ct.event) || i || ct.event || b || {},
                        at !== "static" && (s = yt.offset()),
                        s = {
                            left: i.pageX - s.left,
                            top: i.pageY - s.top
                        },
                        d.mouse && wt && (s.left -= b.scrollX - et.scrollLeft(),
                        s.top -= b.scrollY - et.scrollTop());
                    else {
                        if (c === "event" && i && i.target && i.type !== "scroll" && i.type !== "resize" ? ct.target = r(i.target) : c !== "event" && (ct.target = r(c.jquery ? c : ht.target)),
                        c = ct.target,
                        c = r(c).eq(0),
                        c.length === 0)
                            return it;
                        c[0] === t || c[0] === n ? (g = e.iOS ? n.innerWidth : c.width(),
                        nt = e.iOS ? n.innerHeight : c.height(),
                        c[0] === n && (s = {
                            top: (ft || c).scrollTop(),
                            left: (ft || c).scrollLeft()
                        })) : e.imagemap && c.is("area") ? k = e.imagemap(it, c, v, e.viewport ? lt : u) : e.svg && c[0].ownerSVGElement ? k = e.svg(it, c, v, e.viewport ? lt : u) : (g = c.outerWidth(u),
                        nt = c.outerHeight(u),
                        s = e.offset(c, yt)),
                        k && (g = k.width,
                        nt = k.height,
                        tt = k.offset,
                        s = k.position),
                        (e.iOS > 3.1 && e.iOS < 4.1 || e.iOS >= 4.3 && e.iOS < 4.33 || !e.iOS && at === "fixed") && (s.left -= et.scrollLeft(),
                        s.top -= et.scrollTop()),
                        s.left += v.x === p ? g : v.x === o ? g / 2 : 0,
                        s.top += v.y === y ? nt : v.y === o ? nt / 2 : 0
                    }
                    return s.left += d.x + (ut.x === p ? -ot : ut.x === o ? -ot / 2 : 0),
                    s.top += d.y + (ut.y === y ? -st : ut.y === o ? -st / 2 : 0),
                    e.viewport ? (s.adjusted = e.viewport(it, s, a, g, nt, ot, st),
                    tt && s.adjusted.left && (s.left += tt.left),
                    tt && s.adjusted.top && (s.top += tt.top)) : s.adjusted = {
                        left: 0,
                        top: 0
                    },
                    it._triggerEvent("move", [s, ft.elem || ft], i) ? (delete s.adjusted,
                    f === u || !pt || isNaN(s.left) || isNaN(s.top) || c === "mouse" || !r.isFunction(a.effect) ? rt.css(s) : r.isFunction(a.effect) && (a.effect.call(rt, it, r.extend({}, s)),
                    rt.queue(function(n) {
                        r(this).css({
                            opacity: "",
                            height: ""
                        }),
                        r.browser.msie && this.style.removeAttribute("filter"),
                        n()
                    })),
                    vt = 0,
                    it) : it
                },
                disable: function(n) {
                    return "boolean" != typeof n && (n = !rt.hasClass(at) && !ct.disabled),
                    it.rendered ? (rt.toggleClass(at, n),
                    r.attr(rt[0], "aria-disabled", n)) : ct.disabled = !!n,
                    it
                },
                enable: function() {
                    return it.disable(u)
                },
                destroy: function() {
                    var n = v[0]
                      , t = r.attr(n, tt)
                      , i = v.data("qtip");
                    return it.destroyed = f,
                    it.rendered && (rt.stop(1, 0).remove(),
                    r.each(it.plugins, function() {
                        this.destroy && this.destroy()
                    })),
                    clearTimeout(it.timers.show),
                    clearTimeout(it.timers.hide),
                    ei(),
                    i && it !== i || (r.removeData(n, "qtip"),
                    w.suppress && t && (r.attr(n, "title", t),
                    v.removeAttr(tt)),
                    v.removeAttr("aria-describedby")),
                    v.unbind(".qtip-" + d),
                    delete ot[it.id],
                    v
                }
            })
        }
        function ct(n, i) {
            var v, h, y, o, b, l = r(this), k = r(t.body), p = this === t ? k : l, w = l.metadata ? l.metadata(i.metadata) : s, d = i.metadata.type === "html5" && w ? w[i.metadata.name] : s, a = l.data(i.metadata.name || "qtipopts");
            try {
                a = typeof a == "string" ? r.parseJSON(a) : a
            } catch (g) {}
            if (o = r.extend(f, {}, c.defaults, i, typeof a == "object" ? ut(a) : s, ut(d || w)),
            h = o.position,
            o.id = n,
            "boolean" == typeof o.content.text) {
                if (y = l.attr(o.content.attr),
                o.content.attr === u || !y)
                    return u;
                o.content.text = y
            }
            if (h.container.length || (h.container = k),
            h.target === u && (h.target = p),
            o.show.target === u && (o.show.target = p),
            o.show.solo === f && (o.show.solo = h.container.closest("body")),
            o.hide.target === u && (o.hide.target = p),
            o.position.viewport === f && (o.position.viewport = h.container),
            h.container = h.container.eq(0),
            h.at = new e.Corner(h.at),
            h.my = new e.Corner(h.my),
            r.data(this, "qtip"))
                if (o.overwrite)
                    l.qtip("destroy");
                else if (o.overwrite === u)
                    return u;
            return o.suppress && (b = r.attr(this, "title")) && r(this).removeAttr("title").attr(tt, b).attr("title", ""),
            v = new ht(l,o,n,!!y),
            r.data(this, "qtip", v),
            l.bind("remove.qtip-" + n + " removeqtip.qtip-" + n, function() {
                v.destroy()
            }),
            v
        }
        function lt(n) {
            var i = this, l = n.elements.tooltip, t = n.options.content.ajax, o = c.defaults.content.ajax, s = ".qtip-ajax", v = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, a = f, h = u, e;
            n.checks.ajax = {
                "^content.ajax": function(n, r, u) {
                    r === "ajax" && (t = u),
                    r === "once" ? i.init() : t && t.url ? i.load() : l.unbind(s)
                }
            },
            r.extend(i, {
                init: function() {
                    return t && t.url && l.unbind(s)[t.once ? "one" : "bind"]("tooltipshow" + s, i.load),
                    i
                },
                load: function(s) {
                    function w() {
                        var i;
                        n.destroyed || (a = u,
                        p && (h = f,
                        n.show(s.originalEvent)),
                        (i = o.complete || t.complete) && r.isFunction(i) && i.apply(t.context || n, arguments))
                    }
                    function b(i, u, f) {
                        var e;
                        n.destroyed || (y && "string" == typeof i && (i = r("<div/>").append(i.replace(v, "")).find(y)),
                        (e = o.success || t.success) && r.isFunction(e) ? e.call(t.context || n, i, u, f) : n.set("content.text", i))
                    }
                    function k(t, i, r) {
                        n.destroyed || t.status === 0 || n.set("content.text", i + ": " + r)
                    }
                    if (h) {
                        h = u;
                        return
                    }
                    var l = t.url.lastIndexOf(" "), c = t.url, y, p = !t.loading && a;
                    if (p)
                        try {
                            s.preventDefault()
                        } catch (d) {}
                    else if (s && s.isDefaultPrevented())
                        return i;
                    e && e.abort && e.abort(),
                    l > -1 && (y = c.substr(l),
                    c = c.substr(0, l)),
                    e = r.ajax(r.extend({
                        error: o.error || k,
                        context: n
                    }, t, {
                        url: c,
                        success: b,
                        complete: w
                    }))
                },
                destroy: function() {
                    e && e.abort && e.abort(),
                    n.destroyed = f
                }
            }),
            i.init()
        }
        function at(n, t, i) {
            var u = Math.ceil(t / 2)
              , f = Math.ceil(i / 2)
              , r = {
                bottomright: [[0, 0], [t, i], [t, 0]],
                bottomleft: [[0, 0], [t, 0], [0, i]],
                topright: [[0, i], [t, 0], [t, i]],
                topleft: [[0, 0], [0, i], [t, i]],
                topcenter: [[0, i], [u, 0], [t, i]],
                bottomcenter: [[0, 0], [t, 0], [u, i]],
                rightcenter: [[0, 0], [t, f], [0, i]],
                leftcenter: [[t, 0], [t, i], [0, f]]
            };
            return r.lefttop = r.bottomright,
            r.righttop = r.bottomleft,
            r.leftbottom = r.topright,
            r.rightbottom = r.topleft,
            r[n.string()]
        }
        function vt(n) {
            function et(n) {
                var t = tt.is(":visible");
                tt.show(),
                n(),
                tt.toggle(t)
            }
            function lt() {
                nt.width = k.height,
                nt.height = k.width
            }
            function vt() {
                nt.width = k.width,
                nt.height = k.height
            }
            function yt(t, r, e) {
                if (a.tip) {
                    var b = c.corner.clone(), tt = e.adjusted, st = n.options.position.adjust.method.split(" "), et = st[0], ot = st[1] || st[0], nt = {
                        left: u,
                        top: u,
                        x: 0,
                        y: 0
                    }, g, rt = {}, it;
                    c.corner.fixed !== f && (et === d && b.precedance === w && tt.left && b.y !== o ? b.precedance = b.precedance === w ? v : w : et !== d && tt.left && (b.x = b.x === o ? tt.left > 0 ? l : p : b.x === l ? p : l),
                    ot === d && b.precedance === v && tt.top && b.x !== o ? b.precedance = b.precedance === v ? w : v : ot !== d && tt.top && (b.y = b.y === o ? tt.top > 0 ? h : y : b.y === h ? y : h),
                    b.string() !== ut.corner.string() && (ut.top !== tt.top || ut.left !== tt.left) && c.update(b, u)),
                    g = c.position(b, tt),
                    g[b.x] += ft(b, b.x),
                    g[b.y] += ft(b, b.y),
                    g.right !== i && (g.left = -g.right),
                    g.bottom !== i && (g.top = -g.bottom),
                    g.user = Math.max(0, k.offset),
                    (nt.left = et === d && !!tt.left) && (b.x === o ? rt["margin-left"] = nt.x = g["margin-left"] : (it = g.right !== i ? [tt.left, -g.left] : [-tt.left, g.left],
                    (nt.x = Math.max(it[0], it[1])) > it[0] && (e.left -= tt.left,
                    nt.left = u),
                    rt[g.right !== i ? p : l] = nt.x)),
                    (nt.top = ot === d && !!tt.top) && (b.y === o ? rt["margin-top"] = nt.y = g["margin-top"] : (it = g.bottom !== i ? [tt.top, -g.top] : [-tt.top, g.top],
                    (nt.y = Math.max(it[0], it[1])) > it[0] && (e.top -= tt.top,
                    nt.top = u),
                    rt[g.bottom !== i ? y : h] = nt.y)),
                    a.tip.css(rt).toggle(!(nt.x && nt.y || b.x === o && nt.y || b.y === o && nt.x)),
                    e.left -= g.left.charAt ? g.user : et !== d || nt.top || !nt.left && !nt.top ? g.left : 0,
                    e.top -= g.top.charAt ? g.user : ot !== d || nt.left || !nt.left && !nt.top ? g.top : 0,
                    ut.left = tt.left,
                    ut.top = tt.top,
                    ut.corner = b.clone()
                }
            }
            function pt() {
                var t = k.corner
                  , i = n.options.position
                  , o = i.at
                  , r = i.my.string ? i.my.string() : i.my;
                return t === u || r === u && o === u ? u : (t === f ? c.corner = new e.Corner(r) : t.string || (c.corner = new e.Corner(t),
                c.corner.fixed = f),
                ut.corner = new e.Corner(c.corner.string()),
                c.corner.string() !== "centercenter")
            }
            function ft(n, t, i) {
                t = t ? t : n[n.precedance];
                var f = a.titlebar && n.y === h, e = f ? a.titlebar : tt, o = "border-" + t + "-width", r = function(n) {
                    return parseInt(n.css(o), 10)
                }, u;
                return et(function() {
                    u = (i ? r(i) : r(a.content) || r(e) || r(tt)) || 0
                }),
                u
            }
            function wt(n) {
                var o = a.titlebar && n.y === h, s = o ? a.titlebar : a.content, c = r.browser.mozilla, i = c ? "-moz-" : r.browser.webkit ? "-webkit-" : "", u = "border-radius-" + n.y + n.x, f = "border-" + n.y + "-" + n.x + "-radius", t = function(n) {
                    return parseInt(s.css(n), 10) || parseInt(tt.css(n), 10)
                }, e;
                return et(function() {
                    e = t(f) || t(i + f) || t(i + u) || t(u) || 0
                }),
                e
            }
            function bt(n) {
                function t(n, t, i) {
                    var r = n.css(t) || y;
                    return i && r === n.css(i) ? u : b.test(r) ? u : r
                }
                var g, it, ut, i = a.tip.css("cssText", ""), l = n || c.corner, b = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, s = "border-" + l[l.precedance] + "-color", e = "background-color", y = "transparent", p = " !important", v = a.titlebar, d = v && (l.y === h || l.y === o && i.position().top + nt.height / 2 + k.offset < v.outerHeight(f)), w = d ? v : a.content;
                et(function() {
                    rt.fill = t(i, e) || t(w, e) || t(a.content, e) || t(tt, e) || i.css(e),
                    rt.border = t(i, s, "color") || t(w, s, "color") || t(a.content, s, "color") || t(tt, s, "color") || tt.css(s),
                    r("*", i).add(i).css("cssText", e + ":" + y + p + ";border:0" + p + ";")
                })
            }
            function ht(n) {
                var r = n.precedance === v, h = nt[r ? g : it], f = nt[r ? it : g], c = n.string().indexOf(o) > -1, l = h * (c ? .5 : 1), i = Math.pow, a = Math.round, y, e, s, u = Math.sqrt(i(l, 2) + i(f, 2)), t = [b / l * u, b / f * u];
                return t[2] = Math.sqrt(i(t[0], 2) - i(b, 2)),
                t[3] = Math.sqrt(i(t[1], 2) - i(b, 2)),
                y = u + t[2] + t[3] + (c ? 0 : t[0]),
                e = y / u,
                s = [a(e * f), a(e * h)],
                {
                    height: s[r ? 0 : 1],
                    width: s[r ? 1 : 0]
                }
            }
            function ct(n, t, i) {
                return "<qvml:" + n + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (t || "") + ' style="behavior: url(#default#VML); ' + (i || "") + '" />'
            }
            var c = this, k = n.options.style.tip, a = n.elements, tt = a.tooltip, ut = {
                top: 0,
                left: 0
            }, nt = {
                width: k.width,
                height: k.height
            }, rt = {}, b = k.border || 0, ot = ".qtip-tip", st = !!(r("<canvas />")[0] || {}).getContext, kt;
            c.corner = s,
            c.mimic = s,
            c.border = b,
            c.offset = k.offset,
            c.size = nt,
            n.checks.tip = {
                "^position.my|style.tip.(corner|mimic|border)$": function() {
                    c.init() || c.destroy(),
                    n.reposition()
                },
                "^style.tip.(height|width)$": function() {
                    nt = {
                        width: k.width,
                        height: k.height
                    },
                    c.create(),
                    c.update(),
                    n.reposition()
                },
                "^content.title.text|style.(classes|widget)$": function() {
                    a.tip && a.tip.length && c.update()
                }
            },
            r.extend(c, {
                init: function() {
                    var n = pt() && (st || r.browser.msie);
                    return n && (c.create(),
                    c.update(),
                    tt.unbind(ot).bind("tooltipmove" + ot, yt)),
                    n
                },
                create: function() {
                    var t = nt.width, i = nt.height, n;
                    a.tip && a.tip.remove(),
                    a.tip = r("<div />", {
                        "class": "qtip-tip"
                    }).css({
                        width: t,
                        height: i
                    }).prependTo(tt),
                    st ? r("<canvas />").appendTo(a.tip)[0].getContext("2d").save() : (n = ct("shape", 'coordorigin="0,0"', "position:absolute;"),
                    a.tip.html(n + n),
                    r("*", a.tip).bind("click mousedown", function(n) {
                        n.stopPropagation()
                    }))
                },
                update: function(n, t) {
                    var kt = a.tip, wt = kt.children(), et = nt.width, ot = nt.height, i = k.mimic, pt = Math.round, dt, d, g, yt, it;
                    n || (n = ut.corner || c.corner),
                    i === u ? i = n : (i = new e.Corner(i),
                    i.precedance = n.precedance,
                    i.x === "inherit" ? i.x = n.x : i.y === "inherit" ? i.y = n.y : i.x === i.y && (i[n.precedance] = n[n.precedance])),
                    dt = i.precedance,
                    n.precedance === w ? lt() : vt(),
                    a.tip.css({
                        width: et = nt.width,
                        height: ot = nt.height
                    }),
                    bt(n),
                    rt.border !== "transparent" ? (b = ft(n, s),
                    k.border === 0 && b > 0 && (rt.fill = rt.border),
                    c.border = b = k.border !== f ? k.border : b) : c.border = b = 0,
                    g = at(i, et, ot),
                    c.size = it = ht(n),
                    kt.css(it).css("line-height", it.height + "px"),
                    yt = n.precedance === v ? [pt(i.x === l ? b : i.x === p ? it.width - et - b : (it.width - et) / 2), pt(i.y === h ? it.height - ot : 0)] : [pt(i.x === l ? it.width - et : 0), pt(i.y === h ? b : i.y === y ? it.height - ot - b : (it.height - ot) / 2)],
                    st ? (wt.attr(it),
                    d = wt[0].getContext("2d"),
                    d.restore(),
                    d.save(),
                    d.clearRect(0, 0, 3e3, 3e3),
                    d.fillStyle = rt.fill,
                    d.strokeStyle = rt.border,
                    d.lineWidth = b * 2,
                    d.lineJoin = "miter",
                    d.miterLimit = 100,
                    d.translate(yt[0], yt[1]),
                    d.beginPath(),
                    d.moveTo(g[0][0], g[0][1]),
                    d.lineTo(g[1][0], g[1][1]),
                    d.lineTo(g[2][0], g[2][1]),
                    d.closePath(),
                    b && (tt.css("background-clip") === "border-box" && (d.strokeStyle = rt.fill,
                    d.stroke()),
                    d.strokeStyle = rt.border,
                    d.stroke()),
                    d.fill()) : (g = "m" + g[0][0] + "," + g[0][1] + " l" + g[1][0] + "," + g[1][1] + " " + g[2][0] + "," + g[2][1] + " xe",
                    yt[2] = b && /^(r|b)/i.test(n.string()) ? parseFloat(r.browser.version, 10) === 8 ? 2 : 1 : 0,
                    wt.css({
                        coordsize: et + b + " " + (ot + b),
                        antialias: "" + (i.string().indexOf(o) > -1),
                        left: yt[0],
                        top: yt[1],
                        width: et + b,
                        height: ot + b
                    }).each(function(n) {
                        var t = r(this);
                        t[t.prop ? "prop" : "attr"]({
                            coordsize: et + b + " " + (ot + b),
                            path: g,
                            fillcolor: rt.fill,
                            filled: !!n,
                            stroked: !n
                        }).toggle(!!b || !!n),
                        n || t.html() !== "" || t.html(ct("stroke", 'weight="' + b * 2 + 'px" color="' + rt.border + '" miterlimit="1000" joinstyle="miter"'))
                    })),
                    t !== u && c.position(n)
                },
                position: function(n) {
                    var s = a.tip, t = {}, y = Math.max(0, k.offset), i, f, e;
                    return k.corner === u || !s ? u : (n = n || c.corner,
                    i = n.precedance,
                    f = ht(n),
                    e = [n.x, n.y],
                    i === w && e.reverse(),
                    r.each(e, function(r, u) {
                        var e, c, s;
                        u === o ? (e = i === v ? l : h,
                        t[e] = "50%",
                        t["margin-" + e] = -Math.round(f[i === v ? g : it] / 2) + y) : (e = ft(n, u),
                        c = ft(n, u, a.content),
                        s = wt(n),
                        t[u] = r ? c : y + (s > e ? s : -e))
                    }),
                    t[n[i]] -= f[i === w ? g : it],
                    s.css({
                        top: "",
                        bottom: "",
                        left: "",
                        right: "",
                        margin: ""
                    }).css(t),
                    t)
                },
                destroy: function() {
                    a.tip && a.tip.remove(),
                    a.tip = !1,
                    tt.unbind(ot)
                }
            }),
            c.init()
        }
        function yt(i) {
            function b() {
                w = r(it, s).not("[disabled]").map(function() {
                    return typeof this.focus == "function" ? this : null
                })
            }
            function d(n) {
                w.length < 1 && n.length ? n.not("body").blur() : w.first().focus()
            }
            function tt(n) {
                var t = r(n.target), i = t.closest(".qtip"), f;
                f = i.length < 1 ? u : parseInt(i[0].style.zIndex, 10) > parseInt(s[0].style.zIndex, 10),
                f || r(n.target).closest(k)[0] === s[0] || d(t)
            }
            var h = this, y = i.options.show.modal, a = i.elements, s = a.tooltip, g = "#qtip-overlay", c = ".qtipmodal", l = c + i.id, v = "is-modal-qtip", p = r(t.body), it = e.modal.focusable.join(","), w = {}, o;
            i.checks.modal = {
                "^show.modal.(on|blur)$": function() {
                    h.init(),
                    a.overlay.toggle(s.is(":visible"))
                },
                "^content.text$": function() {
                    b()
                }
            },
            r.extend(h, {
                init: function() {
                    return y.on ? (o = h.create(),
                    s.attr(v, f).css("z-index", e.modal.zindex + r(k + "[" + v + "]").length).unbind(c).unbind(l).bind("tooltipshow" + c + " tooltiphide" + c, function(n, t, i) {
                        var u = n.originalEvent;
                        if (n.target === s[0])
                            if (u && n.type === "tooltiphide" && /mouse(leave|enter)/.test(u.type) && r(u.relatedTarget).closest(o[0]).length)
                                try {
                                    n.preventDefault()
                                } catch (f) {}
                            else
                                u && (!u || u.solo) || h[n.type.replace("tooltip", "")](n, i)
                    }).bind("tooltipfocus" + c, function(n) {
                        if (!n.isDefaultPrevented() && n.target === s[0]) {
                            var t = r(k).filter("[" + v + "]")
                              , i = e.modal.zindex + t.length
                              , u = parseInt(s[0].style.zIndex, 10);
                            o[0].style.zIndex = i - 2,
                            t.each(function() {
                                this.style.zIndex > u && (this.style.zIndex -= 1)
                            }),
                            t.end().filter("." + nt).qtip("blur", n.originalEvent),
                            s.addClass(nt)[0].style.zIndex = i;
                            try {
                                n.preventDefault()
                            } catch (f) {}
                        }
                    }).bind("tooltiphide" + c, function(n) {
                        n.target === s[0] && r("[" + v + "]").filter(":visible").not(s).last().qtip("focus", n)
                    }),
                    y.escape && r(t).unbind(l).bind("keydown" + l, function(n) {
                        n.keyCode === 27 && s.hasClass(nt) && i.hide(n)
                    }),
                    y.blur && a.overlay.unbind(l).bind("click" + l, function(n) {
                        s.hasClass(nt) && i.hide(n)
                    }),
                    b(),
                    h) : h
                },
                create: function() {
                    function i() {
                        o.css({
                            height: t.height(),
                            width: t.width()
                        })
                    }
                    var f = r(g)
                      , t = r(n);
                    return f.length ? a.overlay = f.insertAfter(r(k).last()) : (o = a.overlay = r("<div />", {
                        id: g.substr(1),
                        html: "<div><\/div>",
                        mousedown: function() {
                            return u
                        }
                    }).hide().insertAfter(r(k).last()),
                    t.unbind(c).bind("resize" + c, i),
                    i(),
                    o)
                },
                toggle: function(n, t, i) {
                    if (n && n.isDefaultPrevented())
                        return h;
                    var e = y.effect, c = t ? "show" : "hide", a = o.is(":visible"), w = r("[" + v + "]").filter(":visible").not(s), b;
                    return o || (o = h.create()),
                    o.is(":animated") && a === t && o.data("toggleState") !== u || !t && w.length ? h : (t ? (o.css({
                        left: 0,
                        top: 0
                    }),
                    o.toggleClass("blurs", y.blur),
                    y.stealfocus !== u && (p.bind("focusin" + l, tt),
                    d(r("body :focus")))) : p.unbind("focusin" + l),
                    o.stop(f, u).data("toggleState", t),
                    r.isFunction(e) ? e.call(o, t) : e === u ? o[c]() : o.fadeTo(parseInt(i, 10) || 90, t ? 1 : 0, function() {
                        t || r(this).hide()
                    }),
                    t || o.queue(function(n) {
                        o.css({
                            left: "",
                            top: ""
                        }).removeData("toggleState"),
                        n()
                    }),
                    h)
                },
                show: function(n, t) {
                    return h.toggle(n, f, t)
                },
                hide: function(n, t) {
                    return h.toggle(n, u, t)
                },
                destroy: function() {
                    var n = o;
                    return n && (n = r("[" + v + "]").not(s).length < 1,
                    n ? (a.overlay.remove(),
                    r(t).unbind(c)) : a.overlay.unbind(c + i.id),
                    p.unbind("focusin" + l)),
                    s.removeAttr(v).unbind(c)
                }
            }),
            h.init()
        }
        function pt(i) {
            var s = this, o = i.elements, c = i.options, e = o.tooltip, l = ".ie6-" + i.id, a = r("select, object").length < 1, h = 0, v = u, y;
            i.checks.ie6 = {
                "^content|style$": function() {
                    redraw()
                }
            },
            r.extend(s, {
                init: function() {
                    var u = r(n), i;
                    a && (o.bgiframe = r('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"><\/iframe>'),
                    o.bgiframe.appendTo(e),
                    e.bind("tooltipmove" + l, s.adjustBGIFrame)),
                    y = r("<div/>", {
                        id: "qtip-rcontainer"
                    }).appendTo(t.body),
                    s.redraw(),
                    o.overlay && !v && (i = function() {
                        o.overlay[0].style.top = u.scrollTop() + "px"
                    }
                    ,
                    u.bind("scroll.qtip-ie6, resize.qtip-ie6", i),
                    i(),
                    o.overlay.addClass("qtipmodal-ie6fix"),
                    v = f)
                },
                adjustBGIFrame: function() {
                    var f = i.get("dimensions"), r = i.plugins.tip, u = o.tip, t, n;
                    n = parseInt(e.css("border-left-width"), 10) || 0,
                    n = {
                        left: -n,
                        top: -n
                    },
                    r && u && (t = r.corner.precedance === "x" ? ["width", "left"] : ["height", "top"],
                    n[t[1]] -= u[t[0]]()),
                    o.bgiframe.css(n).css(f)
                },
                redraw: function() {
                    if (i.rendered < 1 || h)
                        return s;
                    var u = c.style, o = c.position.container, f, n, t, r;
                    return h = 1,
                    u.height && e.css(it, u.height),
                    u.width ? e.css(g, u.width) : (e.css(g, "").appendTo(y),
                    n = e.width(),
                    n % 2 < 1 && (n += 1),
                    t = e.css("max-width") || "",
                    r = e.css("min-width") || "",
                    f = (t + r).indexOf("%") > -1 ? o.width() / 100 : 0,
                    t = (t.indexOf("%") > -1 ? f : 1) * parseInt(t, 10) || n,
                    r = (r.indexOf("%") > -1 ? f : 1) * parseInt(r, 10) || 0,
                    n = t + r ? Math.min(Math.max(n, r), t) : n,
                    e.css(g, Math.round(n)).appendTo(o)),
                    h = 0,
                    s
                },
                destroy: function() {
                    a && o.bgiframe.remove(),
                    e.unbind(l)
                }
            }),
            s.init()
        }
        var f = !0, u = !1, s = null, w = "x", v = "y", g = "width", it = "height", h = "top", l = "left", y = "bottom", p = "right", o = "center", dt = "flip", wt = "flipinvert", d = "shift", c, e, b, a = "qtip", ot = {}, bt = ["ui-widget", "ui-tooltip"], k = "div.qtip." + a, st = a + "-default", nt = a + "-focus", kt = a + "-hover", rt = "_replacedByqTip", tt = "oldtitle", ft;
        c = r.fn.qtip = function(n, t, e) {
            var o = ("" + n).toLowerCase()
              , a = s
              , v = r.makeArray(arguments).slice(1)
              , h = v[v.length - 1]
              , l = this[0] ? r.data(this[0], "qtip") : s;
            return !arguments.length && l || o === "api" ? l : "string" == typeof n ? (this.each(function() {
                var n = r.data(this, "qtip");
                if (!n)
                    return f;
                if (h && h.timeStamp && (n.cache.event = h),
                (o === "option" || o === "options") && t) {
                    if (!r.isPlainObject(t) && e === i)
                        return a = n.get(t),
                        u;
                    n.set(t, e)
                } else
                    n[o] && n[o].apply(n[o], v)
            }),
            a !== s ? a : this) : "object" == typeof n || !arguments.length ? (l = ut(r.extend(f, {}, n)),
            c.bind.call(this, l, h)) : void 0
        }
        ,
        c.bind = function(n, t) {
            return this.each(function(o) {
                function p(n) {
                    function t() {
                        s.render(typeof n == "object" || h.show.ready),
                        y.show.add(y.hide).unbind(v)
                    }
                    if (s.cache.disabled)
                        return u;
                    s.cache.event = r.extend({}, n),
                    s.cache.target = n ? r(n.target) : [i],
                    h.show.delay > 0 ? (clearTimeout(s.timers.show),
                    s.timers.show = setTimeout(t, h.show.delay),
                    a.show !== a.hide && y.hide.bind(a.hide, function() {
                        clearTimeout(s.timers.show)
                    })) : t()
                }
                var h, y, a, v, s, l;
                if (l = r.isArray(n.id) ? n.id[o] : n.id,
                l = !l || l === u || l.length < 1 || ot[l] ? c.nextid++ : ot[l] = l,
                v = ".qtip-" + l + "-create",
                s = ct.call(this, l, n),
                s === u)
                    return f;
                h = s.options,
                r.each(e, function() {
                    this.initialize === "initialize" && this(s)
                }),
                y = {
                    show: h.show.target,
                    hide: h.hide.target
                },
                a = {
                    show: r.trim("" + h.show.event).replace(/ /g, v + " ") + v,
                    hide: r.trim("" + h.hide.event).replace(/ /g, v + " ") + v
                },
                /mouse(over|enter)/i.test(a.show) && !/mouse(out|leave)/i.test(a.hide) && (a.hide += " mouseleave" + v),
                y.show.bind("mousemove" + v, function(n) {
                    et(n),
                    s.cache.onTarget = f
                }),
                y.show.bind(a.show, p),
                (h.show.ready || h.prerender) && p(t)
            }).attr("data-hasqtip", f)
        }
        ,
        e = c.plugins = {
            Corner: function(n) {
                n = ("" + n).replace(/([A-Z])/, " $1").replace(/middle/gi, o).toLowerCase(),
                this.x = (n.match(/left|right/i) || n.match(/center/) || ["inherit"])[0].toLowerCase(),
                this.y = (n.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
                var t = n.charAt(0);
                this.precedance = t === "t" || t === "b" ? v : w,
                this.string = function() {
                    return this.precedance === v ? this.y + this.x : this.x + this.y
                }
                ,
                this.abbrev = function() {
                    var n = this.x.substr(0, 1)
                      , t = this.y.substr(0, 1);
                    return n === t ? n : this.precedance === v ? t + n : n + t
                }
                ,
                this.invertx = function(n) {
                    this.x = this.x === l ? p : this.x === p ? l : n || this.x
                }
                ,
                this.inverty = function(n) {
                    this.y = this.y === h ? y : this.y === y ? h : n || this.y
                }
                ,
                this.clone = function() {
                    return {
                        x: this.x,
                        y: this.y,
                        precedance: this.precedance,
                        string: this.string,
                        abbrev: this.abbrev,
                        clone: this.clone,
                        invertx: this.invertx,
                        inverty: this.inverty
                    }
                }
            },
            offset: function(n, i) {
                function c(n, t) {
                    f.left += t * n.scrollLeft(),
                    f.top += t * n.scrollTop()
                }
                var f = n.offset(), s = n.closest("body"), l = r.browser.msie && t.compatMode !== "CSS1Compat", u = i, e, o, h;
                if (u) {
                    do
                        u.css("position") !== "static" && (o = u.position(),
                        f.left -= o.left + (parseInt(u.css("borderLeftWidth"), 10) || 0) + (parseInt(u.css("marginLeft"), 10) || 0),
                        f.top -= o.top + (parseInt(u.css("borderTopWidth"), 10) || 0) + (parseInt(u.css("marginTop"), 10) || 0),
                        !e && (h = u.css("overflow")) !== "hidden" && h !== "visible" && (e = u));
                    while ((u = r(u[0].offsetParent)).length);(e && e[0] !== s[0] || l) && c(e || s, 1)
                }
                return f
            },
            iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || u,
            fn: {
                attr: function(n, t) {
                    if (this.length) {
                        var u = this[0]
                          , f = "title"
                          , i = r.data(u, "qtip");
                        if (n === f && i && "object" == typeof i && i.options.suppress)
                            return arguments.length < 2 ? r.attr(u, tt) : (i && i.options.content.attr === f && i.cache.attr && i.set("content.text", t),
                            this.attr(tt, t))
                    }
                    return r.fn["attr" + rt].apply(this, arguments)
                },
                clone: function(n) {
                    var i = r([])
                      , u = "title"
                      , t = r.fn["clone" + rt].apply(this, arguments);
                    return n || t.filter("[" + tt + "]").attr("title", function() {
                        return r.attr(this, tt)
                    }).removeAttr(tt),
                    t
                }
            }
        },
        r.each(e.fn, function(n, t) {
            if (!t || r.fn[n + rt])
                return f;
            var i = r.fn[n + rt] = r.fn[n];
            r.fn[n] = function() {
                return t.apply(this, arguments) || i.apply(this, arguments)
            }
        }),
        r.ui || (r["cleanData" + rt] = r.cleanData,
        r.cleanData = function(n) {
            for (var t = 0, u; (u = n[t]) !== i; t++)
                try {
                    r(u).triggerHandler("removeqtip")
                } catch (f) {}
            r["cleanData" + rt](n)
        }
        ),
        c.version = "2.0.1",
        c.nextid = 0,
        c.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
        c.zindex = 15e3,
        c.defaults = {
            prerender: u,
            id: u,
            overwrite: f,
            suppress: f,
            content: {
                text: f,
                attr: "title",
                deferred: u,
                title: {
                    text: u,
                    button: u
                }
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: u,
                container: u,
                viewport: u,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: f,
                    resize: f,
                    method: "flipinvert flipinvert"
                },
                effect: function(n, t) {
                    r(this).animate(t, {
                        duration: 200,
                        queue: u
                    })
                }
            },
            show: {
                target: u,
                event: "mouseenter",
                effect: f,
                delay: 90,
                solo: u,
                ready: u,
                autofocus: u
            },
            hide: {
                target: u,
                event: "mouseleave",
                effect: f,
                delay: 0,
                fixed: u,
                inactive: u,
                leave: "window",
                distance: u
            },
            style: {
                classes: "",
                widget: u,
                width: u,
                height: u,
                def: f
            },
            events: {
                render: s,
                move: s,
                show: s,
                hide: s,
                toggle: s,
                visible: s,
                hidden: s,
                focus: s,
                blur: s
            }
        },
        e.svg = function(n, i) {
            for (var v = r(t), o = i[0], e = {
                width: 0,
                height: 0,
                position: {
                    top: 1e10,
                    left: 1e10
                }
            }, c, l, a, s, h; !o.getBBox; )
                o = o.parentNode;
            if (o.getBBox && o.parentNode) {
                if (c = o.getBBox(),
                l = o.getScreenCTM(),
                a = o.farthestViewportElement || o,
                !a.createSVGPoint)
                    return e;
                s = a.createSVGPoint(),
                s.x = c.x,
                s.y = c.y,
                h = s.matrixTransform(l),
                e.position.left = h.x,
                e.position.top = h.y,
                s.x += c.width,
                s.y += c.height,
                h = s.matrixTransform(l),
                e.width = h.x - e.position.left,
                e.height = h.y - e.position.top,
                e.position.left += v.scrollLeft(),
                e.position.top += v.scrollTop()
            }
            return e
        }
        ,
        e.ajax = function(n) {
            var t = n.plugins.ajax;
            return "object" == typeof t ? t : n.plugins.ajax = new lt(n)
        }
        ,
        e.ajax.initialize = "render",
        e.ajax.sanitize = function(n) {
            var i = n.content, t;
            i && "ajax"in i && (t = i.ajax,
            typeof t != "object" && (t = n.content.ajax = {
                url: t
            }),
            "boolean" != typeof t.once && t.once && (t.once = !!t.once))
        }
        ,
        r.extend(f, c.defaults, {
            content: {
                ajax: {
                    loading: f,
                    once: f
                }
            }
        }),
        e.tip = function(n) {
            var t = n.plugins.tip;
            return "object" == typeof t ? t : n.plugins.tip = new vt(n)
        }
        ,
        e.tip.initialize = "render",
        e.tip.sanitize = function(n) {
            var i = n.style, t;
            i && "tip"in i && (t = n.style.tip,
            typeof t != "object" && (n.style.tip = {
                corner: t
            }),
            /string|boolean/i.test(typeof t.corner) || (t.corner = f),
            typeof t.width != "number" && delete t.width,
            typeof t.height != "number" && delete t.height,
            typeof t.border != "number" && t.border !== f && delete t.border,
            typeof t.offset != "number" && delete t.offset)
        }
        ,
        r.extend(f, c.defaults, {
            style: {
                tip: {
                    corner: f,
                    mimic: u,
                    width: 6,
                    height: 6,
                    border: f,
                    offset: 0
                }
            }
        }),
        e.modal = function(n) {
            var t = n.plugins.modal;
            return "object" == typeof t ? t : n.plugins.modal = new yt(n)
        }
        ,
        e.modal.initialize = "render",
        e.modal.sanitize = function(n) {
            n.show && (typeof n.show.modal != "object" ? n.show.modal = {
                on: !!n.show.modal
            } : typeof n.show.modal.on == "undefined" && (n.show.modal.on = f))
        }
        ,
        e.modal.zindex = c.zindex - 200,
        e.modal.focusable = ["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"],
        r.extend(f, c.defaults, {
            show: {
                modal: {
                    on: u,
                    effect: f,
                    blur: f,
                    stealfocus: f,
                    escape: f
                }
            }
        }),
        e.viewport = function(i, r, u, f, e, s, c) {
            function ct(n, t, i, u, f, e, s, h, c) {
                var a = r[f]
                  , l = rt[n]
                  , g = yt[n]
                  , ut = i === d
                  , it = -nt.offset[f] + b.offset[f] + b["scroll" + f]
                  , ft = l === f ? c : l === e ? -c : -c / 2
                  , ot = g === f ? h : g === e ? -h : -h / 2
                  , et = k && k.size ? k.size[s] || 0 : 0
                  , y = k && k.corner && k.corner.precedance === n && !ut ? et : 0
                  , w = it - a + y
                  , p = a + c - b[s] - it + y
                  , v = ft - (rt.precedance === n || l === rt[t] ? ot : 0) - (g === o ? h / 2 : 0);
                return ut ? (y = k && k.corner && k.corner.precedance === t ? et : 0,
                v = (l === f ? 1 : -1) * ft - y,
                r[f] += w > 0 ? w : p > 0 ? -p : 0,
                r[f] = Math.max(-nt.offset[f] + b.offset[f] + (y && k.corner[n] === o ? k.offset : 0), a - v, Math.min(Math.max(-nt.offset[f] + b.offset[f] + b[s], a + v), r[f]))) : (u *= i === wt ? 2 : 0,
                w > 0 && (l !== f || p > 0) ? (r[f] -= v + u,
                tt["invert" + n](f)) : p > 0 && (l !== e || w > 0) && (r[f] -= (l === o ? -v : v) + u,
                tt["invert" + n](e)),
                r[f] < it && -r[f] > p && (r[f] = a,
                tt = rt.clone())),
                r[f] - a
            }
            var lt = u.target, at = i.elements.tooltip, rt = u.my, yt = u.at, ut = u.adjust, ft = ut.method.split(" "), et = ft[0], ot = ft[1] || ft[0], b = u.viewport, nt = u.container, pt = i.cache, k = i.plugins.tip, st = {
                left: 0,
                top: 0
            }, ht, tt, vt;
            return !b.jquery || lt[0] === n || lt[0] === t.body || ut.method === "none" ? st : (ht = at.css("position") === "fixed",
            b = {
                elem: b,
                height: b[(b[0] === n ? "h" : "outerH") + "eight"](),
                width: b[(b[0] === n ? "w" : "outerW") + "idth"](),
                scrollleft: ht ? 0 : b.scrollLeft(),
                scrolltop: ht ? 0 : b.scrollTop(),
                offset: b.offset() || {
                    left: 0,
                    top: 0
                }
            },
            nt = {
                elem: nt,
                scrollLeft: nt.scrollLeft(),
                scrollTop: nt.scrollTop(),
                offset: nt.offset() || {
                    left: 0,
                    top: 0
                }
            },
            (et !== "shift" || ot !== "shift") && (tt = rt.clone()),
            st = {
                left: et !== "none" ? ct(w, v, et, ut.x, l, p, g, f, s) : 0,
                top: ot !== "none" ? ct(v, w, ot, ut.y, h, y, it, e, c) : 0
            },
            tt && pt.lastClass !== (vt = a + "-pos-" + tt.abbrev()) && at.removeClass(i.cache.lastClass).addClass(i.cache.lastClass = vt),
            st)
        }
        ,
        e.imagemap = function(n, t, i, u) {
            function d(n, t, i) {
                for (var s = 0, r = 1, u = 1, c = 0, a = 0, f = n.width, e = n.height; f > 0 && e > 0 && r > 0 && u > 0; )
                    for (f = Math.floor(f / 2),
                    e = Math.floor(e / 2),
                    i.x === l ? r = f : i.x === p ? r = n.width - f : r += Math.floor(f / 2),
                    i.y === h ? u = e : i.y === y ? u = n.height - e : u += Math.floor(e / 2),
                    s = t.length; s--; ) {
                        if (t.length < 2)
                            break;
                        c = t[s][0] - n.position.left,
                        a = t[s][1] - n.position.top,
                        (i.x === l && c >= r || i.x === p && c <= r || i.x === o && (c < r || c > n.width - r) || i.y === h && a >= u || i.y === y && a <= u || i.y === o && (a < u || a > n.height - u)) && t.splice(s, 1)
                    }
                return {
                    left: t[0][0],
                    top: t[0][1]
                }
            }
            t.jquery || (t = r(t));
            var k = n.cache.areas = {}, g = (t[0].shape || t.attr("shape")).toLowerCase(), w = t[0].coords || t.attr("coords"), a = w.split(","), e = [], v = r('img[usemap="#' + t.parent("map").attr("name") + '"]'), b = v.offset(), f = {
                width: 0,
                height: 0,
                position: {
                    top: 1e10,
                    right: 0,
                    bottom: 0,
                    left: 1e10
                }
            }, c = 0, s = 0, nt;
            if (b.left += Math.ceil((v.outerWidth() - v.width()) / 2),
            b.top += Math.ceil((v.outerHeight() - v.height()) / 2),
            g === "poly")
                for (c = a.length; c--; )
                    s = [parseInt(a[--c], 10), parseInt(a[c + 1], 10)],
                    s[0] > f.position.right && (f.position.right = s[0]),
                    s[0] < f.position.left && (f.position.left = s[0]),
                    s[1] > f.position.bottom && (f.position.bottom = s[1]),
                    s[1] < f.position.top && (f.position.top = s[1]),
                    e.push(s);
            else
                for (c = -1; c++ < a.length; )
                    e.push(parseInt(a[c], 10));
            switch (g) {
            case "rect":
                f = {
                    width: Math.abs(e[2] - e[0]),
                    height: Math.abs(e[3] - e[1]),
                    position: {
                        left: Math.min(e[0], e[2]),
                        top: Math.min(e[1], e[3])
                    }
                };
                break;
            case "circle":
                f = {
                    width: e[2] + 2,
                    height: e[2] + 2,
                    position: {
                        left: e[0],
                        top: e[1]
                    }
                };
                break;
            case "poly":
                f.width = Math.abs(f.position.right - f.position.left),
                f.height = Math.abs(f.position.bottom - f.position.top),
                i.abbrev() === "c" ? f.position = {
                    left: f.position.left + f.width / 2,
                    top: f.position.top + f.height / 2
                } : (k[i + w] || (f.position = d(f, e.slice(), i),
                u && (u[0] === "flip" || u[1] === "flip") && (f.offset = d(f, e.slice(), {
                    x: i.x === l ? p : i.x === p ? l : o,
                    y: i.y === h ? y : i.y === y ? h : o
                }),
                f.offset.left -= f.position.left,
                f.offset.top -= f.position.top),
                k[i + w] = f),
                f = k[i + w]),
                f.width = f.height = 0
            }
            return f.position.left += b.left,
            f.position.top += b.top,
            f
        }
        ,
        e.ie6 = function(n) {
            var t = r.browser
              , i = n.plugins.ie6;
            return !t.msie || ("" + t.version).charAt(0) !== "6" ? u : "object" == typeof i ? i : n.plugins.ie6 = new pt(n)
        }
        ,
        e.ie6.initialize = "render"
    })
}(window, document),
function(n, t) {
    function r(n, t, i, r) {
        return n.selector == t.selector && n.context == t.context && (!i || i.$lqguid == t.fn.$lqguid) && (!r || r.$lqguid == t.fn2.$lqguid)
    }
    n.extend(n.fn, {
        livequery: function(t, u) {
            var e = this, f;
            return n.each(i.queries, function(n, i) {
                if (r(e, i, t, u))
                    return (f = i) && !1
            }),
            f = f || new i(e.selector,e.context,t,u),
            f.stopped = !1,
            f.run(),
            e
        },
        expire: function(t, u) {
            var f = this;
            return n.each(i.queries, function(n, e) {
                r(f, e, t, u) && !f.stopped && i.stop(e.id)
            }),
            f
        }
    });
    var i = n.livequery = function(t, r, u, f) {
        var e = this;
        return e.selector = t,
        e.context = r,
        e.fn = u,
        e.fn2 = f,
        e.elements = n([]),
        e.stopped = !1,
        e.id = i.queries.push(e) - 1,
        u.$lqguid = u.$lqguid || i.guid++,
        f && (f.$lqguid = f.$lqguid || i.guid++),
        e
    }
    ;
    i.prototype = {
        stop: function() {
            var t = this;
            t.stopped || (t.fn2 && t.elements.each(t.fn2),
            t.elements = n([]),
            t.stopped = !0)
        },
        run: function() {
            var t = this;
            if (!t.stopped) {
                var r = t.elements
                  , i = n(t.selector, t.context)
                  , u = i.not(r)
                  , f = r.not(i);
                t.elements = i,
                u.each(t.fn),
                t.fn2 && f.each(t.fn2)
            }
        }
    },
    n.extend(i, {
        guid: 0,
        queries: [],
        queue: [],
        running: !1,
        timeout: null,
        registered: [],
        checkQueue: function() {
            if (i.running && i.queue.length)
                for (var n = i.queue.length; n--; )
                    i.queries[i.queue.shift()].run()
        },
        pause: function() {
            i.running = !1
        },
        play: function() {
            i.running = !0,
            i.run()
        },
        registerPlugin: function() {
            n.each(arguments, function(t, r) {
                if (n.fn[r] && !(i.registered.indexOf(r) > 0)) {
                    var u = n.fn[r];
                    n.fn[r] = function() {
                        var n = u.apply(this, arguments);
                        return i.run(),
                        n
                    }
                    ,
                    i.registered.push(r)
                }
            })
        },
        run: function(r) {
            r != t ? n.inArray(r, i.queue) < 0 && i.queue.push(r) : n.each(i.queries, function(t) {
                n.inArray(t, i.queue) < 0 && i.queue.push(t)
            }),
            i.timeout && clearTimeout(i.timeout),
            i.timeout = setTimeout(i.checkQueue, 20)
        },
        stop: function(r) {
            r != t ? i.queries[r].stop() : n.each(i.queries, i.prototype.stop)
        }
    }),
    i.registerPlugin("append", "prepend", "after", "before", "wrap", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "empty", "remove", "html", "prop", "removeProp"),
    n(function() {
        i.play()
    })
}(jQuery),
function(n, t, i) {
    function u(n) {
        return n = n || location.href,
        "#" + n.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var r = "hashchange", f = document, e, s = n.event.special, h = f.documentMode, o = "on" + r in t && (h === i || h > 7);
    n.fn[r] = function(n) {
        return n ? this.bind(r, n) : this.trigger(r)
    }
    ,
    n.fn[r].delay = 50,
    s[r] = n.extend(s[r], {
        setup: function() {
            if (o)
                return !1;
            n(e.start)
        },
        teardown: function() {
            if (o)
                return !1;
            n(e.stop)
        }
    }),
    e = function() {
        function a() {
            var f = u()
              , i = v(h);
            f !== h ? (l(h = f, i),
            n(t).trigger(r)) : i !== h && (location.href = location.href.replace(/#.*/, "") + i),
            s = setTimeout(a, n.fn[r].delay)
        }
        var e = {}, s, h = u(), c = function(n) {
            return n
        }, l = c, v = c;
        return e.start = function() {
            s || a()
        }
        ,
        e.stop = function() {
            s && clearTimeout(s),
            s = i
        }
        ,
        n.browser.msie && !o && function() {
            var t, i;
            e.start = function() {
                t || (i = n.fn[r].src,
                i = i && i + u(),
                t = n('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    i || l(u()),
                    a()
                }).attr("src", i || "javascript:0").insertAfter("body")[0].contentWindow,
                f.onpropertychange = function() {
                    try {
                        event.propertyName === "title" && (t.document.title = f.title)
                    } catch (n) {}
                }
                )
            }
            ,
            e.stop = c,
            v = function() {
                return u(t.location.href)
            }
            ,
            l = function(i, u) {
                var e = t.document
                  , o = n.fn[r].domain;
                i !== u && (e.title = f.title,
                e.open(),
                o && e.write('<script>document.domain="' + o + '"<\/script>'),
                e.close(),
                t.location.hash = i)
            }
        }(),
        e
    }()
}(jQuery, this),
function(n) {
    function h(n) {
        return typeof n == "string"
    }
    function s(n) {
        var t = d.call(arguments, 1);
        return function() {
            return n.apply(this, t.concat(d.call(arguments)))
        }
    }
    function at(n) {
        return n.replace(a, "$2")
    }
    function vt(n) {
        return n.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }
    function st(t, u, e, s, c) {
        var w, y, p, b, d;
        return s !== i ? (p = e.match(t ? a : /^([^#?]*)\??([^#]*)(#?.*)/),
        d = p[3] || "",
        c === 2 && h(s) ? y = s.replace(t ? l : ft, "") : (b = r(p[2]),
        s = h(s) ? r[t ? f : o](s) : s,
        y = c === 2 ? s : c === 1 ? n.extend({}, s, b) : n.extend({}, b, s),
        y = g(y),
        t && (y = y.replace(et, v))),
        w = p[1] + (t ? k : y || !p[1] ? "?" : "") + y + d) : w = u(e !== i ? e : location.href),
        w
    }
    function ht(n, t, u) {
        return t === i || typeof t == "boolean" ? (u = t,
        t = e[n ? f : o]()) : t = h(t) ? t.replace(n ? l : ft, "") : t,
        r(t, u)
    }
    function ct(t, r, u, f) {
        return h(u) || typeof u == "object" || (f = u,
        u = r,
        r = i),
        this.each(function() {
            var o = n(this)
              , i = r || it()[(this.nodeName || "").toLowerCase()] || ""
              , s = i && o.attr(i) || "";
            o.attr(i, e[t](s, u, f))
        })
    }
    var i, d = Array.prototype.slice, v = decodeURIComponent, e = n.param, g, u, r, y, p = n.bbq = n.bbq || {}, nt, tt, it, rt = n.event.special, ut = "hashchange", o = "querystring", f = "fragment", w = "elemUrlAttr", b = "href", c = "src", ft = /^.*\?|#.*$/g, l, a, et, ot, k, lt = {};
    e[o] = s(st, 0, vt),
    e[f] = u = s(st, 1, at),
    e.sorted = g = function(t, i) {
        var u = []
          , r = {};
        return n.each(e(t, i).split("&"), function(n, t) {
            var i = t.replace(/(?:%5B|=).*$/, "")
              , f = r[i];
            f || (f = r[i] = [],
            u.push(i)),
            f.push(t)
        }),
        n.map(u.sort(), function(n) {
            return r[n]
        }).join("&")
    }
    ,
    u.noEscape = function(t) {
        t = t || "";
        var i = n.map(t.split(""), encodeURIComponent);
        et = new RegExp(i.join("|"),"g")
    }
    ,
    u.noEscape(",/"),
    u.ajaxCrawlable = function(n) {
        return n !== i && (n ? (l = /^.*(?:#!|#)/,
        a = /^([^#]*)(?:#!|#)?(.*)$/,
        k = "#!") : (l = /^.*#/,
        a = /^([^#]*)#?(.*)$/,
        k = "#"),
        ot = !!n),
        ot
    }
    ,
    u.ajaxCrawlable(0),
    n.deparam = r = function(t, r) {
        var u = {}
          , f = {
            "true": !0,
            "false": !1,
            "null": null
        };
        return n.each(t.replace(/\+/g, " ").split("&"), function(t, e) {
            var y = e.split("="), h = v(y[0]), o, a = u, l = 0, s = h.split("]["), c = s.length - 1;
            if (/\[/.test(s[0]) && /\]$/.test(s[c]) ? (s[c] = s[c].replace(/\]$/, ""),
            s = s.shift().split("[").concat(s),
            c = s.length - 1) : c = 0,
            y.length === 2)
                if (o = v(y[1]),
                r && (o = o && !isNaN(o) ? +o : o === "undefined" ? i : f[o] !== i ? f[o] : o),
                c)
                    for (; l <= c; l++)
                        h = s[l] === "" ? a.length : s[l],
                        a = a[h] = l < c ? a[h] || (s[l + 1] && isNaN(s[l + 1]) ? {} : []) : o;
                else
                    n.isArray(u[h]) ? u[h].push(o) : u[h] = u[h] !== i ? [u[h], o] : o;
            else
                h && (u[h] = r ? i : "")
        }),
        u
    }
    ,
    r[o] = s(ht, 0),
    r[f] = y = s(ht, 1),
    n[w] || (n[w] = function(t) {
        return n.extend(lt, t)
    }
    )({
        a: b,
        base: b,
        iframe: c,
        img: c,
        input: c,
        form: "action",
        link: b,
        script: c
    }),
    it = n[w],
    n.fn[o] = s(ct, o),
    n.fn[f] = s(ct, f),
    p.pushState = nt = function(n, t) {
        h(n) && /^#/.test(n) && t === i && (t = 2);
        var r = n !== i
          , f = u(location.href, r ? n : {}, r ? t : 2);
        location.href = f
    }
    ,
    p.getState = tt = function(n, t) {
        return n === i || typeof n == "boolean" ? y(n) : y(t)[n]
    }
    ,
    p.removeState = function(t) {
        var r = {};
        t !== i && (r = tt(),
        n.each(n.isArray(t) ? t : arguments, function(n, t) {
            delete r[t]
        })),
        nt(r, 2)
    }
    ,
    rt[ut] = n.extend(rt[ut], {
        add: function(t) {
            function o(n) {
                var t = n[f] = u();
                n.getState = function(n, u) {
                    return n === i || typeof n == "boolean" ? r(t, n) : r(t, u)[n]
                }
                ,
                e.apply(this, arguments)
            }
            var e;
            if (n.isFunction(t))
                return e = t,
                o;
            e = t.handler,
            t.handler = o
        }
    })
}(jQuery, this),
function(n, t, i) {
    function u(n) {
        return n = n || location.href,
        "#" + n.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var r = "hashchange", f = document, e, s = n.event.special, h = f.documentMode, o = "on" + r in t && (h === i || h > 7);
    n.fn[r] = function(n) {
        return n ? this.bind(r, n) : this.trigger(r)
    }
    ,
    n.fn[r].delay = 50,
    s[r] = n.extend(s[r], {
        setup: function() {
            if (o)
                return !1;
            n(e.start)
        },
        teardown: function() {
            if (o)
                return !1;
            n(e.stop)
        }
    }),
    e = function() {
        function a() {
            var f = u()
              , i = v(h);
            f !== h ? (l(h = f, i),
            n(t).trigger(r)) : i !== h && (location.href = location.href.replace(/#.*/, "") + i),
            s = setTimeout(a, n.fn[r].delay)
        }
        var e = {}, s, h = u(), c = function(n) {
            return n
        }, l = c, v = c;
        return e.start = function() {
            s || a()
        }
        ,
        e.stop = function() {
            s && clearTimeout(s),
            s = i
        }
        ,
        n.browser.msie && !o && function() {
            var t, i;
            e.start = function() {
                t || (i = n.fn[r].src,
                i = i && i + u(),
                t = n('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    i || l(u()),
                    a()
                }).attr("src", i || "javascript:0").insertAfter("body")[0].contentWindow,
                f.onpropertychange = function() {
                    try {
                        event.propertyName === "title" && (t.document.title = f.title)
                    } catch (n) {}
                }
                )
            }
            ,
            e.stop = c,
            v = function() {
                return u(t.location.href)
            }
            ,
            l = function(i, u) {
                var e = t.document
                  , o = n.fn[r].domain;
                i !== u && (e.title = f.title,
                e.open(),
                o && e.write('<script>document.domain="' + o + '"<\/script>'),
                e.close(),
                t.location.hash = i)
            }
        }(),
        e
    }()
}(jQuery, this),
function() {
    "use strict";
    function n(n) {
        function o(o, s) {
            var rt, ut, p = o == window, c = s && s.message !== undefined ? s.message : undefined, g, k, d, tt, nt, w, b, it, ft, et, ot;
            if (s = n.extend({}, n.blockUI.defaults, s || {}),
            !s.ignoreIfBlocked || !n(o).data("blockUI.isBlocked")) {
                if (s.overlayCSS = n.extend({}, n.blockUI.defaults.overlayCSS, s.overlayCSS || {}),
                rt = n.extend({}, n.blockUI.defaults.css, s.css || {}),
                s.onOverlayClick && (s.overlayCSS.cursor = "pointer"),
                ut = n.extend({}, n.blockUI.defaults.themedCSS, s.themedCSS || {}),
                c = c === undefined ? s.message : c,
                p && t && u(window, {
                    fadeOut: 0
                }),
                c && typeof c != "string" && (c.parentNode || c.jquery) && (g = c.jquery ? c[0] : c,
                k = {},
                n(o).data("blockUI.history", k),
                k.el = g,
                k.parent = g.parentNode,
                k.display = g.style.display,
                k.position = g.style.position,
                k.parent && k.parent.removeChild(g)),
                n(o).data("blockUI.onUnblock", s.onUnblock),
                d = s.baseZ,
                tt = e || s.forceIframe ? n('<iframe class="blockUI" style="z-index:' + d++ + ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + s.iframeSrc + '"><\/iframe>') : n('<div class="blockUI" style="display:none"><\/div>'),
                nt = s.theme ? n('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + d++ + ';display:none"><\/div>') : n('<div class="blockUI blockOverlay" style="z-index:' + d++ + ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"><\/div>'),
                s.theme && p ? (b = '<div class="blockUI ' + s.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (d + 10) + ';display:none;position:fixed">',
                s.title && (b += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (s.title || "&nbsp;") + "<\/div>"),
                b += '<div class="ui-widget-content ui-dialog-content"><\/div>',
                b += "<\/div>") : s.theme ? (b = '<div class="blockUI ' + s.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (d + 10) + ';display:none;position:absolute">',
                s.title && (b += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (s.title || "&nbsp;") + "<\/div>"),
                b += '<div class="ui-widget-content ui-dialog-content"><\/div>',
                b += "<\/div>") : b = p ? '<div class="blockUI ' + s.blockMsgClass + ' blockPage" style="z-index:' + (d + 10) + ';display:none;position:fixed"><\/div>' : '<div class="blockUI ' + s.blockMsgClass + ' blockElement" style="z-index:' + (d + 10) + ';display:none;position:absolute"><\/div>',
                w = n(b),
                c && (s.theme ? (w.css(ut),
                w.addClass("ui-widget-content")) : w.css(rt)),
                s.theme || nt.css(s.overlayCSS),
                nt.css("position", p ? "fixed" : "absolute"),
                (e || s.forceIframe) && tt.css("opacity", 0),
                it = [tt, nt, w],
                ft = p ? n("body") : n(o),
                n.each(it, function() {
                    this.appendTo(ft)
                }),
                s.theme && s.draggable && n.fn.draggable && w.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                }),
                et = y && (!n.support.boxModel || n("object,embed", p ? null : o).length > 0),
                a || et) {
                    if (p && s.allowBodyStretch && n.support.boxModel && n("html,body").css("height", "100%"),
                    (a || !n.support.boxModel) && !p)
                        var st = r(o, "borderTopWidth")
                          , ht = r(o, "borderLeftWidth")
                          , ct = st ? "(0 - " + st + ")" : 0
                          , lt = ht ? "(0 - " + ht + ")" : 0;
                    n.each(it, function(n, t) {
                        var i = t[0].style, r, u;
                        i.position = "absolute",
                        n < 2 ? (p ? i.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + s.quirksmodeOffsetHack + ') + "px"') : i.setExpression("height", 'this.parentNode.offsetHeight + "px"'),
                        p ? i.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : i.setExpression("width", 'this.parentNode.offsetWidth + "px"'),
                        lt && i.setExpression("left", lt),
                        ct && i.setExpression("top", ct)) : s.centerY ? (p && i.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),
                        i.marginTop = 0) : !s.centerY && p && (r = s.css && s.css.top ? parseInt(s.css.top, 10) : 0,
                        u = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + r + ') + "px"',
                        i.setExpression("top", u))
                    })
                }
                if (c && (s.theme ? w.find(".ui-widget-content").append(c) : w.append(c),
                (c.jquery || c.nodeType) && n(c).show()),
                (e || s.forceIframe) && s.showOverlay && tt.show(),
                s.fadeIn) {
                    var at = s.onBlock ? s.onBlock : f
                      , vt = s.showOverlay && !c ? at : f
                      , yt = c ? at : f;
                    s.showOverlay && nt._fadeIn(s.fadeIn, vt),
                    c && w._fadeIn(s.fadeIn, yt)
                } else
                    s.showOverlay && nt.show(),
                    c && w.show(),
                    s.onBlock && s.onBlock();
                h(1, o, s),
                p ? (t = w[0],
                i = n(s.focusableElements, t),
                s.focusInput && setTimeout(l, 20)) : v(w[0], s.centerX, s.centerY),
                s.timeout && (ot = setTimeout(function() {
                    p ? n.unblockUI(s) : n(o).unblock(s)
                }, s.timeout),
                n(o).data("blockUI.timeout", ot))
            }
        }
        function u(r, u) {
            var o, c = r == window, e = n(r), l = e.data("blockUI.history"), a = e.data("blockUI.timeout"), f;
            a && (clearTimeout(a),
            e.removeData("blockUI.timeout")),
            u = n.extend({}, n.blockUI.defaults, u || {}),
            h(0, r, u),
            u.onUnblock === null && (u.onUnblock = e.data("blockUI.onUnblock"),
            e.removeData("blockUI.onUnblock")),
            f = c ? n("body").children().filter(".blockUI").add("body > .blockUI") : e.find(">.blockUI"),
            u.cursorReset && (f.length > 1 && (f[1].style.cursor = u.cursorReset),
            f.length > 2 && (f[2].style.cursor = u.cursorReset)),
            c && (t = i = null),
            u.fadeOut ? (o = f.length,
            f.fadeOut(u.fadeOut, function() {
                --o == 0 && s(f, l, u, r)
            })) : s(f, l, u, r)
        }
        function s(t, i, r, u) {
            var e = n(u);
            if (t.each(function() {
                this.parentNode && this.parentNode.removeChild(this)
            }),
            i && i.el && (i.el.style.display = i.display,
            i.el.style.position = i.position,
            i.parent && i.parent.appendChild(i.el),
            e.removeData("blockUI.history")),
            e.data("blockUI.static") && e.css("position", "static"),
            typeof r.onUnblock == "function")
                r.onUnblock(u, r);
            var f = n(document.body)
              , o = f.width()
              , s = f[0].style.width;
            f.width(o - 1).width(o),
            f[0].style.width = s
        }
        function h(i, r, u) {
            var f = r == window, o = n(r), e;
            (i || (!f || t) && (f || o.data("blockUI.isBlocked"))) && (o.data("blockUI.isBlocked", i),
            f && u.bindEvents && (!i || u.showOverlay)) && (e = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove",
            i ? n(document).bind(e, u, c) : n(document).unbind(e, c))
        }
        function c(r) {
            var u, f;
            if (r.keyCode && r.keyCode == 9 && t && r.data.constrainTabKey) {
                var e = i
                  , s = !r.shiftKey && r.target === e[e.length - 1]
                  , o = r.shiftKey && r.target === e[0];
                if (s || o)
                    return setTimeout(function() {
                        l(o)
                    }, 10),
                    !1
            }
            return (u = r.data,
            f = n(r.target),
            f.hasClass("blockOverlay") && u.onOverlayClick && u.onOverlayClick(),
            f.parents("div." + u.blockMsgClass).length > 0) ? !0 : f.parents().children().filter("div.blockUI").length === 0
        }
        function l(n) {
            if (i) {
                var t = i[n === !0 ? i.length - 1 : 0];
                t && t.focus()
            }
        }
        function v(n, t, i) {
            var u = n.parentNode
              , f = n.style
              , e = (u.offsetWidth - n.offsetWidth) / 2 - r(u, "borderLeftWidth")
              , o = (u.offsetHeight - n.offsetHeight) / 2 - r(u, "borderTopWidth");
            t && (f.left = e > 0 ? e + "px" : "0"),
            i && (f.top = o > 0 ? o + "px" : "0")
        }
        function r(t, i) {
            return parseInt(n.css(t, i), 10) || 0
        }
        var t, i;
        n.fn._fadeIn = n.fn.fadeIn;
        var f = n.noop || function() {}
          , e = /MSIE/.test(navigator.userAgent)
          , a = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent)
          , p = document.documentMode || 0
          , y = n.isFunction(document.createElement("div").style.setExpression);
        n.blockUI = function(n) {
            o(window, n)
        }
        ,
        n.unblockUI = function(n) {
            u(window, n)
        }
        ,
        n.growlUI = function(t, i, r, u) {
            var f = n('<div class="growlUI"><\/div>');
            t && f.append("<h1>" + t + "<\/h1>"),
            i && f.append("<h2>" + i + "<\/h2>"),
            r === undefined && (r = 3e3),
            n.blockUI({
                message: f,
                fadeIn: 700,
                fadeOut: 1e3,
                centerY: !1,
                timeout: r,
                showOverlay: !1,
                onUnblock: u,
                css: n.blockUI.defaults.growlCSS
            })
        }
        ,
        n.fn.block = function(t) {
            if (this[0] === window)
                return n.blockUI(t),
                this;
            var i = n.extend({}, n.blockUI.defaults, t || {});
            return this.each(function() {
                var t = n(this);
                i.ignoreIfBlocked && t.data("blockUI.isBlocked") || t.unblock({
                    fadeOut: 0
                })
            }),
            this.each(function() {
                n.css(this, "position") == "static" && (this.style.position = "relative",
                n(this).data("blockUI.static", !0)),
                this.style.zoom = 1,
                o(this, t)
            })
        }
        ,
        n.fn.unblock = function(t) {
            return this[0] === window ? (n.unblockUI(t),
            this) : this.each(function() {
                u(this, t)
            })
        }
        ,
        n.blockUI.version = 2.6,
        n.blockUI.defaults = {
            message: "<h1>Please wait...<\/h1>",
            title: null,
            draggable: !0,
            theme: !1,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: .6,
                cursor: "wait"
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: .6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1e3,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: !1
        },
        t = null,
        i = []
    }
    typeof define == "function" && define.amd && define.amd.jQuery ? define(["jquery"], n) : n(jQuery)
}();
var CourseBookingModule = function(n) {
    function t() {
        n("#invoiceArea").find("input:text").attr("disabled", !0),
        n("#invoiceArea").find("input:text").val(""),
        n("#invoiceArea").find("input:text").removeClass("input-validation-error"),
        n("#invoiceArea").find(".field-validation-error").children().empty(),
        n("#InvoiceCountry").attr("disabled", !0),
        n("#InvoiceCountry").val("")
    }
    function i() {
        n("#invoiceArea").find("input:text, label").attr("disabled", !1),
        n("#InvoiceCountry").attr("disabled", !1),
        n("#InvoiceCountry").removeAttr("disabled")
    }
    return {
        initBooking: function() {
            n("#differentInvoiceAddress").removeAttr("checked"),
            n("#sameAsCompany").attr("checked", "checked"),
            n("#sameAsCompany").change(function() {
                n(this).is(":checked") && t()
            }),
            n("#differentInvoiceAddress").change(function() {
                n(this).is(":checked") && i()
            }),
            t()
        }
    }
}(jQuery)
  , ListConstants = function() {
    return {
        groupName: "data-filter-group",
        groupValue: "data-filter-value",
        readGroupName: "filter-group",
        readGroupValue: "filter-value",
        flagPath: "/Framework/Styles/Images/flags16x16/flag_{FlagName}.png",
        rowId: "#rowTemplate",
        rowHeaderId: "#headerTemplate",
        containerId: "#courseList",
        cityFiltersId: "#cityFilters",
        checkBoxId: "#cityCheckBoxTemplate"
    }
}
  , CourseListingModule = function(n) {
    var r = ""
      , t = new ListConstants
      , i = function() {
        return n("<div>")
    }
      , u = function(n, t) {
        return n.Month !== t.Month || n.Year !== t.Year
    }
      , f = function(n, i) {
        var r = t.flagPath.supplant(i)
          , u = n.find(".courseFlag");
        u.attr("src", r)
    };
    return {
        setGetPath: function(n) {
            r = n
        },
        initList: function(r) {
            var y = n(t.rowId).html(), p = n(t.rowHeaderId).html(), h = {
                Month: "",
                Year: ""
            }, a = n(t.containerId), c, e, l, v, s, o;
            for (a.empty(),
            c = 0; c < r.Occasions.length; c++)
                e = r.Occasions[c],
                u(h, e) && (h.Month = e.Month,
                h.Year = e.Year,
                a.append(p.supplant(h))),
                l = i(),
                n(l).html(y.supplant(e)),
                a.append(l),
                f(n(l), e);
            if (n(t.cityFiltersId).empty(),
            r.ShowCityFilters)
                for (v = n(t.checkBoxId).html(),
                s = 0; s < r.Cities.length; s++)
                    o = i(),
                    o.attr("id", r.Cities[s]),
                    o.html(v.supplant({
                        City: r.Cities[s]
                    })),
                    o.attr("checked", "checked"),
                    o.change(function() {
                        n(this).attr("checked") ? (n(this).attr("checked", null),
                        n('*[data-filterby-city="' + n(this).attr("id") + '"]').hide()) : (n(this).attr("checked", "checked"),
                        n('*[data-filterby-city="' + n(this).attr("id") + '"]').show())
                    }),
                    n("#cityFilters").append(o)
        },
        getOccasions: function(t, i) {
            n.get(r, {
                currentHash: window.location.hash,
                group: t,
                value: i
            }, function(t) {
                n("#courseSearch").empty(),
                CourseListingModule.initList(t),
                CourseListingModule.renderFilterBoxes(t),
                window.location.hash = t.UrlHash
            })
        },
        renderFilterBoxes: function(r) {
            var y = this, l = n("#courseSearch"), u, f, e, a, v, o;
            for (l.empty(),
            u = 0; u < r.FilterGroups.length; u++) {
                for (f = i(),
                e = r.FilterGroups[u],
                f.html(n("#filterGroupTemplate").html().supplant(e)),
                a = n("#filterCheckBoxTemplate").html(),
                v = n(f).find(".filterBoxes"),
                o = 0; o < e.Items.length; o++) {
                    var s = r.FilterGroups[u].Items[o]
                      , h = n(a.supplant(s))
                      , c = n(h).find(":checkbox");
                    c.attr(t.groupName, e.GroupInternalName),
                    c.attr(t.groupValue, s.Name),
                    s.Selected && c.attr("checked", "checked"),
                    n(h).find(":checkbox").change(function() {
                        var i = n(this).data(t.readGroupName)
                          , r = n(this).data(t.readGroupValue);
                        y.getOccasions(i, r)
                    }),
                    v.append(h)
                }
                l.append(f)
            }
        }
    }
}(jQuery);
!function(n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], n) : "undefined" != typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    "use strict";
    var t = window.Slick || {};
    t = function() {
        function t(t, r) {
            var f, u = this;
            u.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: n(t),
                appendDots: n(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous<\/button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next<\/button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(n, t) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (t + 1) + "<\/button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
            u.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            },
            n.extend(u, u.initials),
            u.activeBreakpoint = null,
            u.animType = null,
            u.animProp = null,
            u.breakpoints = [],
            u.breakpointSettings = [],
            u.cssTransitions = !1,
            u.hidden = "hidden",
            u.paused = !1,
            u.positionProp = null,
            u.respondTo = null,
            u.rowCount = 1,
            u.shouldClick = !0,
            u.$slider = n(t),
            u.$slidesCache = null,
            u.transformType = null,
            u.transitionType = null,
            u.visibilityChange = "visibilitychange",
            u.windowWidth = 0,
            u.windowTimer = null,
            f = n(t).data("slick") || {},
            u.options = n.extend({}, u.defaults, f, r),
            u.currentSlide = u.options.initialSlide,
            u.originalSettings = u.options,
            "undefined" != typeof document.mozHidden ? (u.hidden = "mozHidden",
            u.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (u.hidden = "webkitHidden",
            u.visibilityChange = "webkitvisibilitychange"),
            u.autoPlay = n.proxy(u.autoPlay, u),
            u.autoPlayClear = n.proxy(u.autoPlayClear, u),
            u.changeSlide = n.proxy(u.changeSlide, u),
            u.clickHandler = n.proxy(u.clickHandler, u),
            u.selectHandler = n.proxy(u.selectHandler, u),
            u.setPosition = n.proxy(u.setPosition, u),
            u.swipeHandler = n.proxy(u.swipeHandler, u),
            u.dragHandler = n.proxy(u.dragHandler, u),
            u.keyHandler = n.proxy(u.keyHandler, u),
            u.autoPlayIterator = n.proxy(u.autoPlayIterator, u),
            u.instanceUid = i++,
            u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
            u.registerBreakpoints(),
            u.init(!0),
            u.checkResponsive(!0)
        }
        var i = 0;
        return t
    }(),
    t.prototype.addSlide = t.prototype.slickAdd = function(t, i, r) {
        var u = this;
        if ("boolean" == typeof i)
            r = i,
            i = null;
        else if (0 > i || i >= u.slideCount)
            return !1;
        u.unload(),
        "number" == typeof i ? 0 === i && 0 === u.$slides.length ? n(t).appendTo(u.$slideTrack) : r ? n(t).insertBefore(u.$slides.eq(i)) : n(t).insertAfter(u.$slides.eq(i)) : r === !0 ? n(t).prependTo(u.$slideTrack) : n(t).appendTo(u.$slideTrack),
        u.$slides = u.$slideTrack.children(this.options.slide),
        u.$slideTrack.children(this.options.slide).detach(),
        u.$slideTrack.append(u.$slides),
        u.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t)
        }),
        u.$slidesCache = u.$slides,
        u.reinit()
    }
    ,
    t.prototype.animateHeight = function() {
        var n = this, t;
        1 === n.options.slidesToShow && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0),
        n.$list.animate({
            height: t
        }, n.options.speed))
    }
    ,
    t.prototype.animateSlide = function(t, i) {
        var u = {}
          , r = this;
        r.animateHeight(),
        r.options.rtl === !0 && r.options.vertical === !1 && (t = -t),
        r.transformsEnabled === !1 ? r.options.vertical === !1 ? r.$slideTrack.animate({
            left: t
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: t
        }, r.options.speed, r.options.easing, i) : r.cssTransitions === !1 ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft),
        n({
            animStart: r.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(n) {
                n = Math.ceil(n),
                r.options.vertical === !1 ? (u[r.animType] = "translate(" + n + "px, 0px)",
                r.$slideTrack.css(u)) : (u[r.animType] = "translate(0px," + n + "px)",
                r.$slideTrack.css(u))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(),
        t = Math.ceil(t),
        u[r.animType] = r.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)",
        r.$slideTrack.css(u),
        i && setTimeout(function() {
            r.disableTransition(),
            i.call()
        }, r.options.speed))
    }
    ,
    t.prototype.asNavFor = function(t) {
        var r = this
          , i = r.options.asNavFor;
        i && null !== i && (i = n(i).not(r.$slider)),
        null !== i && "object" == typeof i && i.each(function() {
            var i = n(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }
    ,
    t.prototype.applyTransition = function(n) {
        var t = this
          , i = {};
        i[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase,
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    }
    ,
    t.prototype.autoPlay = function() {
        var n = this;
        n.autoPlayTimer && clearInterval(n.autoPlayTimer),
        n.slideCount > n.options.slidesToShow && n.paused !== !0 && (n.autoPlayTimer = setInterval(n.autoPlayIterator, n.options.autoplaySpeed))
    }
    ,
    t.prototype.autoPlayClear = function() {
        var n = this;
        n.autoPlayTimer && clearInterval(n.autoPlayTimer)
    }
    ,
    t.prototype.autoPlayIterator = function() {
        var n = this;
        n.options.infinite === !1 ? 1 === n.direction ? (n.currentSlide + 1 === n.slideCount - 1 && (n.direction = 0),
        n.slideHandler(n.currentSlide + n.options.slidesToScroll)) : (0 == n.currentSlide - 1 && (n.direction = 1),
        n.slideHandler(n.currentSlide - n.options.slidesToScroll)) : n.slideHandler(n.currentSlide + n.options.slidesToScroll)
    }
    ,
    t.prototype.buildArrows = function() {
        var t = this;
        t.options.arrows === !0 && (t.$prevArrow = n(t.options.prevArrow).addClass("slick-arrow"),
        t.$nextArrow = n(t.options.nextArrow).addClass("slick-arrow"),
        t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
        t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
        t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
        t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }
    ,
    t.prototype.buildDots = function() {
        var i, r, t = this;
        if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
            for (r = '<ul class="' + t.options.dotsClass + '">',
            i = 0; i <= t.getDotCount(); i += 1)
                r += "<li>" + t.options.customPaging.call(this, t, i) + "<\/li>";
            r += "<\/ul>",
            t.$dots = n(r).appendTo(t.options.appendDots),
            t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }
    ,
    t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.$slides.each(function(t, i) {
            n(i).attr("data-slick-index", t).data("originalStyling", n(i).attr("style") || "")
        }),
        t.$slidesCache = t.$slides,
        t.$slider.addClass("slick-slider"),
        t.$slideTrack = 0 === t.slideCount ? n('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(),
        t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),
        t.$slideTrack.css("opacity", 0),
        (t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1),
        n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
        t.setupInfinite(),
        t.buildArrows(),
        t.buildDots(),
        t.updateDots(),
        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
        t.options.draggable === !0 && t.$list.addClass("draggable")
    }
    ,
    t.prototype.buildRows = function() {
        var t, i, r, f, c, u, e, n = this, o, s, h;
        if (f = document.createDocumentFragment(),
        u = n.$slider.children(),
        n.options.rows > 1) {
            for (e = n.options.slidesPerRow * n.options.rows,
            c = Math.ceil(u.length / e),
            t = 0; c > t; t++) {
                for (o = document.createElement("div"),
                i = 0; i < n.options.rows; i++) {
                    for (s = document.createElement("div"),
                    r = 0; r < n.options.slidesPerRow; r++)
                        h = t * e + (i * n.options.slidesPerRow + r),
                        u.get(h) && s.appendChild(u.get(h));
                    o.appendChild(s)
                }
                f.appendChild(o)
            }
            n.$slider.html(f),
            n.$slider.children().children().children().css({
                width: 100 / n.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }
    ,
    t.prototype.checkResponsive = function(t, i) {
        var f, u, e, r = this, o = !1, s = r.$slider.width(), h = window.innerWidth || n(window).width();
        if ("window" === r.respondTo ? e = h : "slider" === r.respondTo ? e = s : "min" === r.respondTo && (e = Math.min(h, s)),
        r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            u = null;
            for (f in r.breakpoints)
                r.breakpoints.hasOwnProperty(f) && (r.originalSettings.mobileFirst === !1 ? e < r.breakpoints[f] && (u = r.breakpoints[f]) : e > r.breakpoints[f] && (u = r.breakpoints[f]));
            null !== u ? null !== r.activeBreakpoint ? (u !== r.activeBreakpoint || i) && (r.activeBreakpoint = u,
            "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]),
            t === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(t)),
            o = u) : (r.activeBreakpoint = u,
            "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]),
            t === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(t)),
            o = u) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
            r.options = r.originalSettings,
            t === !0 && (r.currentSlide = r.options.initialSlide),
            r.refresh(t),
            o = u),
            t || o === !1 || r.$slider.trigger("breakpoint", [r, o])
        }
    }
    ,
    t.prototype.changeSlide = function(t, i) {
        var f, e, o, r = this, u = n(t.target), s;
        switch (u.is("a") && t.preventDefault(),
        u.is("li") || (u = u.closest("li")),
        o = 0 != r.slideCount % r.options.slidesToScroll,
        f = o ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
        t.data.message) {
        case "previous":
            e = 0 === f ? r.options.slidesToScroll : r.options.slidesToShow - f,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - e, !1, i);
            break;
        case "next":
            e = 0 === f ? r.options.slidesToScroll : f,
            r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + e, !1, i);
            break;
        case "index":
            s = 0 === t.data.index ? 0 : t.data.index || u.index() * r.options.slidesToScroll,
            r.slideHandler(r.checkNavigable(s), !1, i),
            u.children().trigger("focus");
            break;
        default:
            return
        }
    }
    ,
    t.prototype.checkNavigable = function(n) {
        var t, i, u = this, r;
        if (t = u.getNavigableIndexes(),
        i = 0,
        n > t[t.length - 1])
            n = t[t.length - 1];
        else
            for (r in t) {
                if (n < t[r]) {
                    n = i;
                    break
                }
                i = t[r]
            }
        return n
    }
    ,
    t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (n("li", t.$dots).off("click.slick", t.changeSlide),
        t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && n("li", t.$dots).off("mouseenter.slick", n.proxy(t.setPaused, t, !0)).off("mouseleave.slick", n.proxy(t.setPaused, t, !1))),
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide)),
        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
        t.$list.off("click.slick", t.clickHandler),
        n(document).off(t.visibilityChange, t.visibility),
        t.$list.off("mouseenter.slick", n.proxy(t.setPaused, t, !0)),
        t.$list.off("mouseleave.slick", n.proxy(t.setPaused, t, !1)),
        t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler),
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().off("click.slick", t.selectHandler),
        n(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
        n(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
        n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
        n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition),
        n(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    t.prototype.cleanUpRows = function() {
        var n, t = this;
        t.options.rows > 1 && (n = t.$slides.children().children(),
        n.removeAttr("style"),
        t.$slider.html(n))
    }
    ,
    t.prototype.clickHandler = function(n) {
        var t = this;
        t.shouldClick === !1 && (n.stopImmediatePropagation(),
        n.stopPropagation(),
        n.preventDefault())
    }
    ,
    t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(),
        i.touchObject = {},
        i.cleanUpEvents(),
        n(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.options.arrows === !0 && (i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
        i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove())),
        i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            n(this).attr("style", n(this).data("originalStyling"))
        }),
        i.$slideTrack.children(this.options.slide).detach(),
        i.$slideTrack.detach(),
        i.$list.detach(),
        i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.unslicked = !0,
        t || i.$slider.trigger("destroy", [i])
    }
    ,
    t.prototype.disableTransition = function(n) {
        var t = this
          , i = {};
        i[t.transitionType] = "",
        t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
    }
    ,
    t.prototype.fadeSlide = function(n, t) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(n).css({
            zIndex: i.options.zIndex
        }),
        i.$slides.eq(n).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(n),
        i.$slides.eq(n).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }),
        t && setTimeout(function() {
            i.disableTransition(n),
            t.call()
        }, i.options.speed))
    }
    ,
    t.prototype.fadeSlideOut = function(n) {
        var t = this;
        t.cssTransitions === !1 ? t.$slides.eq(n).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(n),
        t.$slides.eq(n).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }
    ,
    t.prototype.filterSlides = t.prototype.slickFilter = function(n) {
        var t = this;
        null !== n && (t.unload(),
        t.$slideTrack.children(this.options.slide).detach(),
        t.$slidesCache.filter(n).appendTo(t.$slideTrack),
        t.reinit())
    }
    ,
    t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        var n = this;
        return n.currentSlide
    }
    ,
    t.prototype.getDotCount = function() {
        var n = this
          , t = 0
          , i = 0
          , r = 0;
        if (n.options.infinite === !0)
            for (; t < n.slideCount; )
                ++r,
                t = i + n.options.slidesToShow,
                i += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        else if (n.options.centerMode === !0)
            r = n.slideCount;
        else
            for (; t < n.slideCount; )
                ++r,
                t = i + n.options.slidesToShow,
                i += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        return r - 1
    }
    ,
    t.prototype.getLeft = function(n) {
        var f, r, i, t = this, u = 0;
        return t.slideOffset = 0,
        r = t.$slides.first().outerHeight(!0),
        t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = -1 * t.slideWidth * t.options.slidesToShow,
        u = -1 * r * t.options.slidesToShow),
        0 != t.slideCount % t.options.slidesToScroll && n + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (n > t.slideCount ? (t.slideOffset = -1 * (t.options.slidesToShow - (n - t.slideCount)) * t.slideWidth,
        u = -1 * (t.options.slidesToShow - (n - t.slideCount)) * r) : (t.slideOffset = -1 * t.slideCount % t.options.slidesToScroll * t.slideWidth,
        u = -1 * t.slideCount % t.options.slidesToScroll * r))) : n + t.options.slidesToShow > t.slideCount && (t.slideOffset = (n + t.options.slidesToShow - t.slideCount) * t.slideWidth,
        u = (n + t.options.slidesToShow - t.slideCount) * r),
        t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0,
        u = 0),
        t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0,
        t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)),
        f = t.options.vertical === !1 ? -1 * n * t.slideWidth + t.slideOffset : -1 * n * r + u,
        t.options.variableWidth === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow),
        f = i[0] ? -1 * i[0].offsetLeft : 0,
        t.options.centerMode === !0 && (i = t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow + 1),
        f = i[0] ? -1 * i[0].offsetLeft : 0,
        f += (t.$list.width() - i.outerWidth()) / 2)),
        f
    }
    ,
    t.prototype.getOption = t.prototype.slickGetOption = function(n) {
        var t = this;
        return t.options[n]
    }
    ,
    t.prototype.getNavigableIndexes = function() {
        var i, n = this, t = 0, r = 0, u = [];
        for (n.options.infinite === !1 ? i = n.slideCount : (t = -1 * n.options.slidesToScroll,
        r = -1 * n.options.slidesToScroll,
        i = 2 * n.slideCount); i > t; )
            u.push(t),
            t = r + n.options.slidesToScroll,
            r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
        return u
    }
    ,
    t.prototype.getSlick = function() {
        return this
    }
    ,
    t.prototype.getSlideCount = function() {
        var u, i, r, t = this;
        return r = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0,
        t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function(u, f) {
            if (f.offsetLeft - r + n(f).outerWidth() / 2 > -1 * t.swipeLeft)
                return i = f,
                !1
        }),
        u = Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1) : t.options.slidesToScroll
    }
    ,
    t.prototype.goTo = t.prototype.slickGoTo = function(n, t) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(n)
            }
        }, t)
    }
    ,
    t.prototype.init = function(t) {
        var i = this;
        n(i.$slider).hasClass("slick-initialized") || (n(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots()),
        t && i.$slider.trigger("init", [i]),
        i.options.accessibility === !0 && i.initADA()
    }
    ,
    t.prototype.initArrowEvents = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.on("click.slick", {
            message: "previous"
        }, n.changeSlide),
        n.$nextArrow.on("click.slick", {
            message: "next"
        }, n.changeSlide))
    }
    ,
    t.prototype.initDotEvents = function() {
        var t = this;
        t.options.dots === !0 && t.slideCount > t.options.slidesToShow && n("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide),
        t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && t.options.autoplay === !0 && n("li", t.$dots).on("mouseenter.slick", n.proxy(t.setPaused, t, !0)).on("mouseleave.slick", n.proxy(t.setPaused, t, !1))
    }
    ,
    t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(),
        t.initDotEvents(),
        t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler),
        t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler),
        t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler),
        t.$list.on("click.slick", t.clickHandler),
        n(document).on(t.visibilityChange, n.proxy(t.visibility, t)),
        t.$list.on("mouseenter.slick", n.proxy(t.setPaused, t, !0)),
        t.$list.on("mouseleave.slick", n.proxy(t.setPaused, t, !1)),
        t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler),
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().on("click.slick", t.selectHandler),
        n(window).on("orientationchange.slick.slick-" + t.instanceUid, n.proxy(t.orientationChange, t)),
        n(window).on("resize.slick.slick-" + t.instanceUid, n.proxy(t.resize, t)),
        n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
        n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
        n(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
    }
    ,
    t.prototype.initUI = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.show(),
        n.$nextArrow.show()),
        n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.show(),
        n.options.autoplay === !0 && n.autoPlay()
    }
    ,
    t.prototype.keyHandler = function(n) {
        var t = this;
        n.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === n.keyCode && t.options.accessibility === !0 ? t.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === n.keyCode && t.options.accessibility === !0 && t.changeSlide({
            data: {
                message: "next"
            }
        }))
    }
    ,
    t.prototype.lazyLoad = function() {
        function f(t) {
            n("img[data-lazy]", t).each(function() {
                var t = n(this)
                  , i = n(this).attr("data-lazy")
                  , r = document.createElement("img");
                r.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        t.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }
                ,
                r.src = i
            })
        }
        var e, r, i, u, t = this;
        t.options.centerMode === !0 ? t.options.infinite === !0 ? (i = t.currentSlide + (t.options.slidesToShow / 2 + 1),
        u = i + t.options.slidesToShow + 2) : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)),
        u = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide,
        u = i + t.options.slidesToShow,
        t.options.fade === !0 && (i > 0 && i--,
        u <= t.slideCount && u++)),
        e = t.$slider.find(".slick-slide").slice(i, u),
        f(e),
        t.slideCount <= t.options.slidesToShow ? (r = t.$slider.find(".slick-slide"),
        f(r)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow),
        f(r)) : 0 === t.currentSlide && (r = t.$slider.find(".slick-cloned").slice(-1 * t.options.slidesToShow),
        f(r))
    }
    ,
    t.prototype.loadSlider = function() {
        var n = this;
        n.setPosition(),
        n.$slideTrack.css({
            opacity: 1
        }),
        n.$slider.removeClass("slick-loading"),
        n.initUI(),
        "progressive" === n.options.lazyLoad && n.progressiveLazyLoad()
    }
    ,
    t.prototype.next = t.prototype.slickNext = function() {
        var n = this;
        n.changeSlide({
            data: {
                message: "next"
            }
        })
    }
    ,
    t.prototype.orientationChange = function() {
        var n = this;
        n.checkResponsive(),
        n.setPosition()
    }
    ,
    t.prototype.pause = t.prototype.slickPause = function() {
        var n = this;
        n.autoPlayClear(),
        n.paused = !0
    }
    ,
    t.prototype.play = t.prototype.slickPlay = function() {
        var n = this;
        n.paused = !1,
        n.autoPlay()
    }
    ,
    t.prototype.postSlide = function(n) {
        var t = this;
        t.$slider.trigger("afterChange", [t, n]),
        t.animating = !1,
        t.setPosition(),
        t.swipeLeft = null,
        t.options.autoplay === !0 && t.paused === !1 && t.autoPlay(),
        t.options.accessibility === !0 && t.initADA()
    }
    ,
    t.prototype.prev = t.prototype.slickPrev = function() {
        var n = this;
        n.changeSlide({
            data: {
                message: "previous"
            }
        })
    }
    ,
    t.prototype.preventDefault = function(n) {
        n.preventDefault()
    }
    ,
    t.prototype.progressiveLazyLoad = function() {
        var r, i, t = this;
        r = n("img[data-lazy]", t.$slider).length,
        r > 0 && (i = n("img[data-lazy]", t.$slider).first(),
        i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function() {
            i.removeAttr("data-lazy"),
            t.progressiveLazyLoad(),
            t.options.adaptiveHeight === !0 && t.setPosition()
        }).error(function() {
            i.removeAttr("data-lazy"),
            t.progressiveLazyLoad()
        }))
    }
    ,
    t.prototype.refresh = function(t) {
        var i = this
          , r = i.currentSlide;
        i.destroy(!0),
        n.extend(i, i.initials, {
            currentSlide: r
        }),
        i.init(),
        t || i.changeSlide({
            data: {
                message: "index",
                index: r
            }
        }, !1)
    }
    ,
    t.prototype.registerBreakpoints = function() {
        var u, f, i, t = this, r = t.options.responsive || null;
        if ("array" === n.type(r) && r.length) {
            t.respondTo = t.options.respondTo || "window";
            for (u in r)
                if (i = t.breakpoints.length - 1,
                f = r[u].breakpoint,
                r.hasOwnProperty(u)) {
                    for (; i >= 0; )
                        t.breakpoints[i] && t.breakpoints[i] === f && t.breakpoints.splice(i, 1),
                        i--;
                    t.breakpoints.push(f),
                    t.breakpointSettings[f] = r[u].settings
                }
            t.breakpoints.sort(function(n, i) {
                return t.options.mobileFirst ? n - i : i - n
            })
        }
    }
    ,
    t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"),
        t.slideCount = t.$slides.length,
        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
        t.registerBreakpoints(),
        t.setProps(),
        t.setupInfinite(),
        t.buildArrows(),
        t.updateArrows(),
        t.initArrowEvents(),
        t.buildDots(),
        t.updateDots(),
        t.initDotEvents(),
        t.checkResponsive(!1, !0),
        t.options.focusOnSelect === !0 && n(t.$slideTrack).children().on("click.slick", t.selectHandler),
        t.setSlideClasses(0),
        t.setPosition(),
        t.$slider.trigger("reInit", [t]),
        t.options.autoplay === !0 && t.focusHandler()
    }
    ,
    t.prototype.resize = function() {
        var t = this;
        n(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay),
        t.windowDelay = window.setTimeout(function() {
            t.windowWidth = n(window).width(),
            t.checkResponsive(),
            t.unslicked || t.setPosition()
        }, 50))
    }
    ,
    t.prototype.removeSlide = t.prototype.slickRemove = function(n, t, i) {
        var r = this;
        return "boolean" == typeof n ? (t = n,
        n = t === !0 ? 0 : r.slideCount - 1) : n = t === !0 ? --n : n,
        r.slideCount < 1 || 0 > n || n > r.slideCount - 1 ? !1 : (r.unload(),
        i === !0 ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(n).remove(),
        r.$slides = r.$slideTrack.children(this.options.slide),
        r.$slideTrack.children(this.options.slide).detach(),
        r.$slideTrack.append(r.$slides),
        r.$slidesCache = r.$slides,
        void r.reinit())
    }
    ,
    t.prototype.setCSS = function(n) {
        var r, u, t = this, i = {};
        t.options.rtl === !0 && (n = -n),
        r = "left" == t.positionProp ? Math.ceil(n) + "px" : "0px",
        u = "top" == t.positionProp ? Math.ceil(n) + "px" : "0px",
        i[t.positionProp] = n,
        t.transformsEnabled === !1 ? t.$slideTrack.css(i) : (i = {},
        t.cssTransitions === !1 ? (i[t.animType] = "translate(" + r + ", " + u + ")",
        t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)",
        t.$slideTrack.css(i)))
    }
    ,
    t.prototype.setDimensions = function() {
        var n = this, t;
        n.options.vertical === !1 ? n.options.centerMode === !0 && n.$list.css({
            padding: "0px " + n.options.centerPadding
        }) : (n.$list.height(n.$slides.first().outerHeight(!0) * n.options.slidesToShow),
        n.options.centerMode === !0 && n.$list.css({
            padding: n.options.centerPadding + " 0px"
        })),
        n.listWidth = n.$list.width(),
        n.listHeight = n.$list.height(),
        n.options.vertical === !1 && n.options.variableWidth === !1 ? (n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow),
        n.$slideTrack.width(Math.ceil(n.slideWidth * n.$slideTrack.children(".slick-slide").length))) : n.options.variableWidth === !0 ? n.$slideTrack.width(5e3 * n.slideCount) : (n.slideWidth = Math.ceil(n.listWidth),
        n.$slideTrack.height(Math.ceil(n.$slides.first().outerHeight(!0) * n.$slideTrack.children(".slick-slide").length))),
        t = n.$slides.first().outerWidth(!0) - n.$slides.first().width(),
        n.options.variableWidth === !1 && n.$slideTrack.children(".slick-slide").width(n.slideWidth - t)
    }
    ,
    t.prototype.setFade = function() {
        var i, t = this;
        t.$slides.each(function(r, u) {
            i = -1 * t.slideWidth * r,
            t.options.rtl === !0 ? n(u).css({
                position: "relative",
                right: i,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : n(u).css({
                position: "relative",
                left: i,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }),
        t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }
    ,
    t.prototype.setHeight = function() {
        var n = this, t;
        1 === n.options.slidesToShow && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0),
        n.$list.css("height", t))
    }
    ,
    t.prototype.setOption = t.prototype.slickSetOption = function(t, i, r) {
        var f, e, u = this;
        if ("responsive" === t && "array" === n.type(i))
            for (e in i)
                if ("array" !== n.type(u.options.responsive))
                    u.options.responsive = [i[e]];
                else {
                    for (f = u.options.responsive.length - 1; f >= 0; )
                        u.options.responsive[f].breakpoint === i[e].breakpoint && u.options.responsive.splice(f, 1),
                        f--;
                    u.options.responsive.push(i[e])
                }
        else
            u.options[t] = i;
        r === !0 && (u.unload(),
        u.reinit())
    }
    ,
    t.prototype.setPosition = function() {
        var n = this;
        n.setDimensions(),
        n.setHeight(),
        n.options.fade === !1 ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade(),
        n.$slider.trigger("setPosition", [n])
    }
    ,
    t.prototype.setProps = function() {
        var n = this
          , t = document.body.style;
        n.positionProp = n.options.vertical === !0 ? "top" : "left",
        "top" === n.positionProp ? n.$slider.addClass("slick-vertical") : n.$slider.removeClass("slick-vertical"),
        (void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && n.options.useCSS === !0 && (n.cssTransitions = !0),
        n.options.fade && ("number" == typeof n.options.zIndex ? n.options.zIndex < 3 && (n.options.zIndex = 3) : n.options.zIndex = n.defaults.zIndex),
        void 0 !== t.OTransform && (n.animType = "OTransform",
        n.transformType = "-o-transform",
        n.transitionType = "OTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1)),
        void 0 !== t.MozTransform && (n.animType = "MozTransform",
        n.transformType = "-moz-transform",
        n.transitionType = "MozTransition",
        void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (n.animType = !1)),
        void 0 !== t.webkitTransform && (n.animType = "webkitTransform",
        n.transformType = "-webkit-transform",
        n.transitionType = "webkitTransition",
        void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1)),
        void 0 !== t.msTransform && (n.animType = "msTransform",
        n.transformType = "-ms-transform",
        n.transitionType = "msTransition",
        void 0 === t.msTransform && (n.animType = !1)),
        void 0 !== t.transform && n.animType !== !1 && (n.animType = "transform",
        n.transformType = "transform",
        n.transitionType = "transition"),
        n.transformsEnabled = null !== n.animType && n.animType !== !1
    }
    ,
    t.prototype.setSlideClasses = function(n) {
        var u, i, r, f, t = this;
        i = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
        t.$slides.eq(n).addClass("slick-current"),
        t.options.centerMode === !0 ? (u = Math.floor(t.options.slidesToShow / 2),
        t.options.infinite === !0 && (n >= u && n <= t.slideCount - 1 - u ? t.$slides.slice(n - u, n + u + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = t.options.slidesToShow + n,
        i.slice(r - u + 1, r + u + 2).addClass("slick-active").attr("aria-hidden", "false")),
        0 === n ? i.eq(i.length - 1 - t.options.slidesToShow).addClass("slick-center") : n === t.slideCount - 1 && i.eq(t.options.slidesToShow).addClass("slick-center")),
        t.$slides.eq(n).addClass("slick-center")) : n >= 0 && n <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(n, n + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= t.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (f = t.slideCount % t.options.slidesToShow,
        r = t.options.infinite === !0 ? t.options.slidesToShow + n : n,
        t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - n < t.options.slidesToShow ? i.slice(r - (t.options.slidesToShow - f), r + f).addClass("slick-active").attr("aria-hidden", "false") : i.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")),
        "ondemand" === t.options.lazyLoad && t.lazyLoad()
    }
    ,
    t.prototype.setupInfinite = function() {
        var i, r, u, t = this;
        if (t.options.fade === !0 && (t.options.centerMode = !1),
        t.options.infinite === !0 && t.options.fade === !1 && (r = null,
        t.slideCount > t.options.slidesToShow)) {
            for (u = t.options.centerMode === !0 ? t.options.slidesToShow + 1 : t.options.slidesToShow,
            i = t.slideCount; i > t.slideCount - u; i -= 1)
                r = i - 1,
                n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
            for (i = 0; u > i; i += 1)
                r = i,
                n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
            t.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                n(this).attr("id", "")
            })
        }
    }
    ,
    t.prototype.setPaused = function(n) {
        var t = this;
        t.options.autoplay === !0 && t.options.pauseOnHover === !0 && (t.paused = n,
        n ? t.autoPlayClear() : t.autoPlay())
    }
    ,
    t.prototype.selectHandler = function(t) {
        var i = this
          , u = n(t.target).is(".slick-slide") ? n(t.target) : n(t.target).parents(".slick-slide")
          , r = parseInt(u.attr("data-slick-index"));
        return r || (r = 0),
        i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(r),
        void i.asNavFor(r)) : void i.slideHandler(r)
    }
    ,
    t.prototype.slideHandler = function(n, t, i) {
        var u, f, o, e, s = null, r = this;
        return t = t || !1,
        r.animating === !0 && r.options.waitForAnimate === !0 || r.options.fade === !0 && r.currentSlide === n || r.slideCount <= r.options.slidesToShow ? void 0 : (t === !1 && r.asNavFor(n),
        u = n,
        s = r.getLeft(u),
        e = r.getLeft(r.currentSlide),
        r.currentLeft = null === r.swipeLeft ? e : r.swipeLeft,
        r.options.infinite === !1 && r.options.centerMode === !1 && (0 > n || n > r.getDotCount() * r.options.slidesToScroll) ? void (r.options.fade === !1 && (u = r.currentSlide,
        i !== !0 ? r.animateSlide(e, function() {
            r.postSlide(u)
        }) : r.postSlide(u))) : r.options.infinite === !1 && r.options.centerMode === !0 && (0 > n || n > r.slideCount - r.options.slidesToScroll) ? void (r.options.fade === !1 && (u = r.currentSlide,
        i !== !0 ? r.animateSlide(e, function() {
            r.postSlide(u)
        }) : r.postSlide(u))) : (r.options.autoplay === !0 && clearInterval(r.autoPlayTimer),
        f = 0 > u ? 0 != r.slideCount % r.options.slidesToScroll ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + u : u >= r.slideCount ? 0 != r.slideCount % r.options.slidesToScroll ? 0 : u - r.slideCount : u,
        r.animating = !0,
        r.$slider.trigger("beforeChange", [r, r.currentSlide, f]),
        o = r.currentSlide,
        r.currentSlide = f,
        r.setSlideClasses(r.currentSlide),
        r.updateDots(),
        r.updateArrows(),
        r.options.fade === !0 ? (i !== !0 ? (r.fadeSlideOut(o),
        r.fadeSlide(f, function() {
            r.postSlide(f)
        })) : r.postSlide(f),
        void r.animateHeight()) : void (i !== !0 ? r.animateSlide(s, function() {
            r.postSlide(f)
        }) : r.postSlide(f))))
    }
    ,
    t.prototype.startLoad = function() {
        var n = this;
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.hide(),
        n.$nextArrow.hide()),
        n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.hide(),
        n.$slider.addClass("slick-loading")
    }
    ,
    t.prototype.swipeDirection = function() {
        var i, r, u, n, t = this;
        return i = t.touchObject.startX - t.touchObject.curX,
        r = t.touchObject.startY - t.touchObject.curY,
        u = Math.atan2(r, i),
        n = Math.round(180 * u / Math.PI),
        0 > n && (n = 360 - Math.abs(n)),
        45 >= n && n >= 0 ? t.options.rtl === !1 ? "left" : "right" : 360 >= n && n >= 315 ? t.options.rtl === !1 ? "left" : "right" : n >= 135 && 225 >= n ? t.options.rtl === !1 ? "right" : "left" : t.options.verticalSwiping === !0 ? n >= 35 && 135 >= n ? "left" : "right" : "vertical"
    }
    ,
    t.prototype.swipeEnd = function() {
        var t, n = this;
        if (n.dragging = !1,
        n.shouldClick = n.touchObject.swipeLength > 10 ? !1 : !0,
        void 0 === n.touchObject.curX)
            return !1;
        if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]),
        n.touchObject.swipeLength >= n.touchObject.minSwipe)
            switch (n.swipeDirection()) {
            case "left":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(),
                n.slideHandler(t),
                n.currentDirection = 0,
                n.touchObject = {},
                n.$slider.trigger("swipe", [n, "left"]);
                break;
            case "right":
                t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(),
                n.slideHandler(t),
                n.currentDirection = 1,
                n.touchObject = {},
                n.$slider.trigger("swipe", [n, "right"])
            }
        else
            n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide),
            n.touchObject = {})
    }
    ,
    t.prototype.swipeHandler = function(n) {
        var t = this;
        if (!(t.options.swipe === !1 || "ontouchend"in document && t.options.swipe === !1 || t.options.draggable === !1 && -1 !== n.type.indexOf("mouse")))
            switch (t.touchObject.fingerCount = n.originalEvent && void 0 !== n.originalEvent.touches ? n.originalEvent.touches.length : 1,
            t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold,
            t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
            n.data.action) {
            case "start":
                t.swipeStart(n);
                break;
            case "move":
                t.swipeMove(n);
                break;
            case "end":
                t.swipeEnd(n)
            }
    }
    ,
    t.prototype.swipeMove = function(n) {
        var f, e, r, u, i, t = this;
        return i = void 0 !== n.originalEvent ? n.originalEvent.touches : null,
        !t.dragging || i && 1 !== i.length ? !1 : (f = t.getLeft(t.currentSlide),
        t.touchObject.curX = void 0 !== i ? i[0].pageX : n.clientX,
        t.touchObject.curY = void 0 !== i ? i[0].pageY : n.clientY,
        t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))),
        t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))),
        e = t.swipeDirection(),
        "vertical" !== e ? (void 0 !== n.originalEvent && t.touchObject.swipeLength > 4 && n.preventDefault(),
        u = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1),
        t.options.verticalSwiping === !0 && (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1),
        r = t.touchObject.swipeLength,
        t.touchObject.edgeHit = !1,
        t.options.infinite === !1 && (0 === t.currentSlide && "right" === e || t.currentSlide >= t.getDotCount() && "left" === e) && (r = t.touchObject.swipeLength * t.options.edgeFriction,
        t.touchObject.edgeHit = !0),
        t.swipeLeft = t.options.vertical === !1 ? f + r * u : f + r * (t.$list.height() / t.listWidth) * u,
        t.options.verticalSwiping === !0 && (t.swipeLeft = f + r * u),
        t.options.fade === !0 || t.options.touchMove === !1 ? !1 : t.animating === !0 ? (t.swipeLeft = null,
        !1) : void t.setCSS(t.swipeLeft)) : void 0)
    }
    ,
    t.prototype.swipeStart = function(n) {
        var i, t = this;
        return 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {},
        !1) : (void 0 !== n.originalEvent && void 0 !== n.originalEvent.touches && (i = n.originalEvent.touches[0]),
        t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : n.clientX,
        t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : n.clientY,
        void (t.dragging = !0))
    }
    ,
    t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var n = this;
        null !== n.$slidesCache && (n.unload(),
        n.$slideTrack.children(this.options.slide).detach(),
        n.$slidesCache.appendTo(n.$slideTrack),
        n.reinit())
    }
    ,
    t.prototype.unload = function() {
        var t = this;
        n(".slick-cloned", t.$slider).remove(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }
    ,
    t.prototype.unslick = function(n) {
        var t = this;
        t.$slider.trigger("unslick", [t, n]),
        t.destroy()
    }
    ,
    t.prototype.updateArrows = function() {
        var t, n = this;
        t = Math.floor(n.options.slidesToShow / 2),
        n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && !n.options.infinite && (n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
        0 === n.currentSlide ? (n.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - n.options.slidesToShow && n.options.centerMode === !1 ? (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - 1 && n.options.centerMode === !0 && (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
        n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }
    ,
    t.prototype.updateDots = function() {
        var n = this;
        null !== n.$dots && (n.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"),
        n.$dots.find("li").eq(Math.floor(n.currentSlide / n.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }
    ,
    t.prototype.visibility = function() {
        var n = this;
        document[n.hidden] ? (n.paused = !0,
        n.autoPlayClear()) : n.options.autoplay === !0 && (n.paused = !1,
        n.autoPlay())
    }
    ,
    t.prototype.initADA = function() {
        var t = this;
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }),
        t.$slideTrack.attr("role", "listbox"),
        t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            n(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + t.instanceUid + i
            })
        }),
        null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function(i) {
            n(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + t.instanceUid + i,
                id: "slick-slide" + t.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"),
        t.activateADA()
    }
    ,
    t.prototype.activateADA = function() {
        var n = this
          , t = n.$slider.find("*").is(":focus");
        n.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false",
            tabindex: "0"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        }),
        t && n.$slideTrack.find(".slick-active").focus()
    }
    ,
    t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var r = n(this);
            setTimeout(function() {
                t.isPlay && (r.is(":focus") ? (t.autoPlayClear(),
                t.paused = !0) : (t.paused = !1,
                t.autoPlay()))
            }, 0)
        })
    }
    ,
    n.fn.slick = function() {
        var u, i = this, r = arguments[0], f = Array.prototype.slice.call(arguments, 1), e = i.length, n = 0;
        for (n; e > n; n++)
            if ("object" == typeof r || "undefined" == typeof r ? i[n].slick = new t(i[n],r) : u = i[n].slick[r].apply(i[n].slick, f),
            "undefined" != typeof u)
                return u;
        return i
    }
});
var CourseBookingModule = function(n) {
    function t() {
        n("#invoiceArea").find("input:text").attr("disabled", !0),
        n("#invoiceArea").find("input:text").val(""),
        n("#invoiceArea").find("input:text").removeClass("input-validation-error"),
        n("#invoiceArea").find(".field-validation-error").children().empty(),
        n("#InvoiceCountry").attr("disabled", !0),
        n("#InvoiceCountry").val("")
    }
    function i() {
        n("#invoiceArea").find("input:text, label").attr("disabled", !1),
        n("#InvoiceCountry").attr("disabled", !1),
        n("#InvoiceCountry").removeAttr("disabled")
    }
    return {
        initBooking: function() {
            n("#differentInvoiceAddress").removeAttr("checked"),
            n("#sameAsCompany").attr("checked", "checked"),
            n("#sameAsCompany").change(function() {
                n(this).is(":checked") && t()
            }),
            n("#differentInvoiceAddress").change(function() {
                n(this).is(":checked") && i()
            }),
            t()
        }
    }
}(jQuery)
  , ListConstants = function() {
    return {
        groupName: "data-filter-group",
        groupValue: "data-filter-value",
        readGroupName: "filter-group",
        readGroupValue: "filter-value",
        flagPath: "/Framework/Styles/Images/flags16x16/flag_{FlagName}.png",
        rowId: "#rowTemplate",
        rowHeaderId: "#headerTemplate",
        containerId: "#courseList",
        cityFiltersId: "#cityFilters",
        checkBoxId: "#cityCheckBoxTemplate"
    }
}
  , CourseListingModule = function(n) {
    var r = ""
      , t = new ListConstants
      , i = function() {
        return n("<div>")
    }
      , u = function(n, t) {
        return n.Month !== t.Month || n.Year !== t.Year
    }
      , f = function(n, i) {
        var r = t.flagPath.supplant(i)
          , u = n.find(".courseFlag");
        u.attr("src", r)
    };
    return {
        setGetPath: function(n) {
            r = n
        },
        initList: function(r) {
            var y = n(t.rowId).html(), p = n(t.rowHeaderId).html(), h = {
                Month: "",
                Year: ""
            }, a = n(t.containerId), c, e, l, v, s, o;
            for (a.empty(),
            c = 0; c < r.Occasions.length; c++)
                e = r.Occasions[c],
                u(h, e) && (h.Month = e.Month,
                h.Year = e.Year,
                a.append(p.supplant(h))),
                l = i(),
                n(l).html(y.supplant(e)),
                a.append(l),
                f(n(l), e);
            if (n(t.cityFiltersId).empty(),
            r.ShowCityFilters)
                for (v = n(t.checkBoxId).html(),
                s = 0; s < r.Cities.length; s++)
                    o = i(),
                    o.attr("id", r.Cities[s]),
                    o.html(v.supplant({
                        City: r.Cities[s]
                    })),
                    o.attr("checked", "checked"),
                    o.change(function() {
                        n(this).attr("checked") ? (n(this).attr("checked", null),
                        n('*[data-filterby-city="' + n(this).attr("id") + '"]').hide()) : (n(this).attr("checked", "checked"),
                        n('*[data-filterby-city="' + n(this).attr("id") + '"]').show())
                    }),
                    n("#cityFilters").append(o)
        },
        getOccasions: function(t, i) {
            n.get(r, {
                currentHash: window.location.hash,
                group: t,
                value: i
            }, function(t) {
                n("#courseSearch").empty(),
                CourseListingModule.initList(t),
                CourseListingModule.renderFilterBoxes(t),
                window.location.hash = t.UrlHash
            })
        },
        renderFilterBoxes: function(r) {
            var y = this, l = n("#courseSearch"), u, f, e, a, v, o;
            for (l.empty(),
            u = 0; u < r.FilterGroups.length; u++) {
                for (f = i(),
                e = r.FilterGroups[u],
                f.html(n("#filterGroupTemplate").html().supplant(e)),
                a = n("#filterCheckBoxTemplate").html(),
                v = n(f).find(".filterBoxes"),
                o = 0; o < e.Items.length; o++) {
                    var s = r.FilterGroups[u].Items[o]
                      , h = n(a.supplant(s))
                      , c = n(h).find(":checkbox");
                    c.attr(t.groupName, e.GroupInternalName),
                    c.attr(t.groupValue, s.Name),
                    s.Selected && c.attr("checked", "checked"),
                    n(h).find(":checkbox").change(function() {
                        var i = n(this).data(t.readGroupName)
                          , r = n(this).data(t.readGroupValue);
                        y.getOccasions(i, r)
                    }),
                    v.append(h)
                }
                l.append(f)
            }
        }
    }
}(jQuery)
