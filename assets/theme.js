window.theme = window.theme || {},
window.theme = window.theme || {},
theme.Sections = function() {
    this.constructors = {},
    this.instances = [],
    $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}
,
theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(e, t) {
        var i = $(e)
          , s = i.attr("data-section-id")
          , a = i.attr("data-section-type");
        if (t = t || this.constructors[a],
        !_.isUndefined(t)) {
            var r = _.assignIn(new t(e), {
                id: s,
                type: a,
                container: e
            });
            this.instances.push(r)
        }
    },
    _onSectionLoad: function(e) {
        var t = $("[data-section-id]", e.target)[0];
        t && this._createInstance(t)
    },
    _onSectionUnload: function(e) {
        this.instances = _.filter(this.instances, (function(t) {
            var i = t.id === e.detail.sectionId;
            return i && _.isFunction(t.onUnload) && t.onUnload(e),
            !i
        }
        ))
    },
    _onSelect: function(e) {
        var t = _.find(this.instances, (function(t) {
            return t.id === e.detail.sectionId
        }
        ));
        !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e)
    },
    _onDeselect: function(e) {
        var t = _.find(this.instances, (function(t) {
            return t.id === e.detail.sectionId
        }
        ));
        !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e)
    },
    _onBlockSelect: function(e) {
        var t = _.find(this.instances, (function(t) {
            return t.id === e.detail.sectionId
        }
        ));
        !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e)
    },
    _onBlockDeselect: function(e) {
        var t = _.find(this.instances, (function(t) {
            return t.id === e.detail.sectionId
        }
        ));
        !_.isUndefined(t) && _.isFunction(t.onBlockDeselect) && t.onBlockDeselect(e)
    },
    register: function(e, t) {
        this.constructors[e] = t,
        $("[data-section-type=" + e + "]").each(function(e, i) {
            this._createInstance(i, t)
        }
        .bind(this))
    }
}),
window.slate = window.slate || {},
slate.utils = {
    getParameterByName: function(e, t) {
        t || (t = window.location.href),
        e = e.replace(/[[\]]/g, "\\$&");
        var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
        return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
    },
    resizeSelects: function(e) {
        e.each((function() {
            var e = $(this)
              , t = e.find("option:selected").text()
              , i = $("<span>").html(t);
            i.appendTo("body");
            var s = i.width();
            i.remove(),
            e.width(s + 10)
        }
        ))
    },
    keyboardKeys: {
        TAB: 9,
        ENTER: 13,
        ESCAPE: 27,
        LEFTARROW: 37,
        RIGHTARROW: 39
    }
},
window.slate = window.slate || {},
slate.rte = {
    wrapTable: function(e) {
        e.$tables.wrap('<div class="' + e.tableWrapperClass + '"></div>')
    },
    wrapIframe: function(e) {
        e.$iframes.each((function() {
            $(this).wrap('<div class="' + e.iframeWrapperClass + '"></div>'),
            this.src = this.src
        }
        ))
    }
},
window.slate = window.slate || {},
slate.a11y = {
    pageLinkFocus: function(e) {
        var t = "js-focus-hidden";
        e.first().attr("tabIndex", "-1").focus().addClass(t).one("blur", (function() {
            e.first().removeClass(t).removeAttr("tabindex")
        }
        ))
    },
    focusHash: function() {
        var e = window.location.hash;
        e && document.getElementById(e.slice(1)) && this.pageLinkFocus($(e))
    },
    bindInPageLinks: function() {
        $("a[href*=#]").on("click", function(e) {
            this.pageLinkFocus($(e.currentTarget.hash))
        }
        .bind(this))
    },
    trapFocus: function(e) {
        var t = {
            focusin: e.namespace ? "focusin." + e.namespace : "focusin",
            focusout: e.namespace ? "focusout." + e.namespace : "focusout",
            keydown: e.namespace ? "keydown." + e.namespace : "keydown.handleFocus"
        }
          , i = e.$container.find($('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible"))
          , s = i[0]
          , a = i[i.length - 1];
        e.$elementToFocus || (e.$elementToFocus = e.$container),
        e.$container.attr("tabindex", "-1"),
        e.$elementToFocus.focus(),
        $(document).off("focusin"),
        $(document).on(t.focusout, (function() {
            $(document).off(t.keydown)
        }
        )),
        $(document).on(t.focusin, (function(e) {
            e.target !== a && e.target !== s || $(document).on(t.keydown, (function(e) {
                !function(e) {
                    e.keyCode === slate.utils.keyboardKeys.TAB && (e.target !== a || e.shiftKey || (e.preventDefault(),
                    s.focus()),
                    e.target === s && e.shiftKey && (e.preventDefault(),
                    a.focus()))
                }(e)
            }
            ))
        }
        ))
    },
    removeTrapFocus: function(e) {
        var t = e.namespace ? "focusin." + e.namespace : "focusin";
        e.$container && e.$container.length && e.$container.removeAttr("tabindex"),
        $(document).off(t)
    },
    accessibleLinks: function(e) {
        var t = document.querySelector("body")
          , i = {
            newWindow: "a11y-new-window-message",
            external: "a11y-external-message",
            newWindowExternal: "a11y-new-window-external-message"
        };
        void 0 !== e.$links && e.$links.jquery || (e.$links = $("a[href]:not([aria-describedby])")),
        $.each(e.$links, (function() {
            var e = $(this)
              , t = e.attr("target")
              , s = e.attr("rel")
              , a = function(e) {
                var t = window.location.hostname;
                return e[0].hostname !== t
            }(e)
              , r = "_blank" === t;
            a && e.attr("aria-describedby", i.external),
            r && (void 0 !== s && -1 !== s.indexOf("noopener") || e.attr("rel", (function(e, t) {
                return (void 0 === t ? "" : t + " ") + "noopener"
            }
            )),
            e.attr("aria-describedby", i.newWindow)),
            a && r && e.attr("aria-describedby", i.newWindowExternal)
        }
        )),
        function(e) {
            "object" != typeof e && (e = {});
            var s = $.extend({
                newWindow: "Opens in a new window.",
                external: "Opens external website.",
                newWindowExternal: "Opens external website in a new window."
            }, e)
              , a = document.createElement("ul")
              , r = "";
            for (var n in s)
                r += "<li id=" + i[n] + ">" + s[n] + "</li>";
            a.setAttribute("hidden", !0),
            a.innerHTML = r,
            t.appendChild(a)
        }(e.messages)
    }
},
theme.Images = {
    preload: function(e, t) {
        "string" == typeof e && (e = [e]);
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            this.loadImage(this.getSizedImageUrl(s, t))
        }
    },
    loadImage: function(e) {
        (new Image).src = e
    },
    switchImage: function(e, t, i) {
        var s = this.imageSize(t.src)
          , a = this.getSizedImageUrl(e.src, s);
        i ? i(a, e, t) : t.src = a
    },
    imageSize: function(e) {
        var t = e.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/);
        return null !== t ? void 0 !== t[2] ? t[1] + t[2] : t[1] : null
    },
    getSizedImageUrl: function(e, t) {
        if (null === t)
            return e;
        if ("master" === t)
            return this.removeProtocol(e);
        var i = e.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
        if (null !== i) {
            var s = e.split(i[0])
              , a = i[0];
            return this.removeProtocol(s[0] + "_" + t + a)
        }
        return null
    },
    removeProtocol: function(e) {
        return e.replace(/http(s)?:/, "")
    }
},
theme.Currency = {
    formatMoney: function(e, t) {
        "string" == typeof e && (e = e.replace(".", ""));
        var i = ""
          , s = /\{\{\s*(\w+)\s*\}\}/
          , a = t || "${{amount}}";
        function r(e, t, i, s) {
            if (i = i || ",",
            s = s || ".",
            isNaN(e) || null === e)
                return 0;
            var a = (e = (e / 100).toFixed(t)).split(".");
            return a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) + (a[1] ? s + a[1] : "")
        }
        switch (a.match(s)[1]) {
        case "amount":
            i = r(e, 2);
            break;
        case "amount_no_decimals":
            i = r(e, 0);
            break;
        case "amount_with_comma_separator":
            i = r(e, 2, ".", ",");
            break;
        case "amount_no_decimals_with_comma_separator":
            i = r(e, 0, ".", ",");
            break;
        case "amount_no_decimals_with_space_separator":
            i = r(e, 0, " ");
            break;
        case "amount_with_apostrophe_separator":
            i = r(e, 2, "'")
        }
        return a.replace(s, i)
    }
},
slate.Variants = function() {
    function e(e) {
        this.$container = e.$container,
        this.product = e.product,
        this.singleOptionSelector = e.singleOptionSelector,
        this.originalSelectorId = e.originalSelectorId,
        this.enableHistoryState = e.enableHistoryState,
        this.currentVariant = this._getVariantFromOptions(),
        $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _getCurrentOptions: function() {
            var e = _.map($(this.singleOptionSelector, this.$container), (function(e) {
                var t = $(e)
                  , i = t.attr("type")
                  , s = {};
                return "radio" === i || "checkbox" === i ? !!t[0].checked && (s.value = t.val(),
                s.index = t.data("index"),
                s) : (s.value = t.val(),
                s.index = t.data("index"),
                s)
            }
            ));
            return e = _.compact(e)
        },
        _getVariantFromOptions: function() {
            var e = this._getCurrentOptions()
              , t = this.product.variants;
            return _.find(t, (function(t) {
                return e.every((function(e) {
                    return _.isEqual(t[e.index], e.value)
                }
                ))
            }
            ))
        },
        _onSelectChange: function() {
            var e = this._getVariantFromOptions();
            this.$container.trigger({
                type: "variantChange",
                variant: e
            }),
            e && (this._updateMasterSelect(e),
            this._updateImages(e),
            this._updatePrice(e),
            this._updateSKU(e),
            this.currentVariant = e,
            this.enableHistoryState && this._updateHistoryState(e))
        },
        _updateImages: function(e) {
            var t = e.featured_image || {}
              , i = this.currentVariant.featured_image || {};
            e.featured_image && t.src !== i.src && this.$container.trigger({
                type: "variantImageChange",
                variant: e
            })
        },
        _updatePrice: function(e) {
            e.price === this.currentVariant.price && e.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                type: "variantPriceChange",
                variant: e
            })
        },
        _updateSKU: function(e) {
            e.sku !== this.currentVariant.sku && this.$container.trigger({
                type: "variantSKUChange",
                variant: e
            })
        },
        _updateHistoryState: function(e) {
            if (history.replaceState && e) {
                var t = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + e.id;
                window.history.replaceState({
                    path: t
                }, "", t)
            }
        },
        _updateMasterSelect: function(e) {
            $(this.originalSelectorId, this.$container).val(e.id)
        }
    }),
    e
}(),
this.Shopify = this.Shopify || {},
this.Shopify.theme = this.Shopify.theme || {},
this.Shopify.theme.PredictiveSearch = function() {
    "use strict";
    function e() {
        var e = Error.call(this);
        return e.name = "Server error",
        e.message = "Something went wrong on the server",
        e.status = 500,
        e
    }
    function t(e) {
        var t = Error.call(this);
        return t.name = "Not found",
        t.message = "Not found",
        t.status = e,
        t
    }
    function i() {
        var e = Error.call(this);
        return e.name = "Server error",
        e.message = "Something went wrong on the server",
        e.status = 500,
        e
    }
    function s(e) {
        var t = Error.call(this);
        return t.name = "Content-Type error",
        t.message = "Content-Type was not provided or is of wrong type",
        t.status = e,
        t
    }
    function a(e) {
        var t = Error.call(this);
        return t.name = "JSON parse error",
        t.message = "JSON syntax error",
        t.status = e,
        t
    }
    function r(e, t, i, s) {
        var a = Error.call(this);
        return a.name = t,
        a.message = i,
        a.status = e,
        a.retryAfter = s,
        a
    }
    function n(e, t, i) {
        var s = Error.call(this);
        return s.name = t,
        s.message = i,
        s.status = e,
        s
    }
    function o(e, t, i) {
        var s = Error.call(this);
        return s.name = t,
        s.message = i,
        s.status = e,
        s
    }
    function c(e) {
        this._store = {},
        this._keys = [],
        e && e.bucketSize ? this.bucketSize = e.bucketSize : this.bucketSize = 20
    }
    function l() {
        this.events = {}
    }
    function d(e) {
        this.eventName = e,
        this.callbacks = []
    }
    function u(e, t) {
        var i = "";
        return t = t || null,
        Object.keys(e).forEach((function(s) {
            var a = s + "=";
            switch (t && (a = t + "[" + s + "]"),
            function(e) {
                return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
            }(e[s])) {
            case "object":
                i += u(e[s], t ? a : s);
                break;
            case "array":
                i += a + "=" + e[s].join(",") + "&";
                break;
            default:
                t && (a += "="),
                i += a + encodeURIComponent(e[s]) + "&"
            }
        }
        )),
        i
    }
    c.prototype.set = function(e, t) {
        if (this.count() >= this.bucketSize) {
            var i = this._keys.splice(0, 1);
            this.delete(i)
        }
        return this._keys.push(e),
        this._store[e] = t,
        this._store
    }
    ,
    c.prototype.get = function(e) {
        return this._store[e]
    }
    ,
    c.prototype.has = function(e) {
        return Boolean(this._store[e])
    }
    ,
    c.prototype.count = function() {
        return Object.keys(this._store).length
    }
    ,
    c.prototype.delete = function(e) {
        var t = Boolean(this._store[e]);
        return delete this._store[e],
        t && !this._store[e]
    }
    ,
    l.prototype.on = function(e, t) {
        var i = this.events[e];
        i || (i = new d(e),
        this.events[e] = i),
        i.registerCallback(t)
    }
    ,
    l.prototype.off = function(e, t) {
        var i = this.events[e];
        i && i.callbacks.indexOf(t) > -1 && (i.unregisterCallback(t),
        0 === i.callbacks.length && delete this.events[e])
    }
    ,
    l.prototype.dispatch = function(e, t) {
        var i = this.events[e];
        i && i.fire(t)
    }
    ,
    d.prototype.registerCallback = function(e) {
        this.callbacks.push(e)
    }
    ,
    d.prototype.unregisterCallback = function(e) {
        var t = this.callbacks.indexOf(e);
        t > -1 && this.callbacks.splice(t, 1)
    }
    ,
    d.prototype.fire = function(e) {
        this.callbacks.slice(0).forEach((function(t) {
            t(e)
        }
        ))
    }
    ;
    var h, p, m, f = (h = function(c, l, d, u) {
        var h = new XMLHttpRequest;
        h.onreadystatechange = function() {
            if (h.readyState === XMLHttpRequest.DONE) {
                var c = h.getResponseHeader("Content-Type");
                if (h.status >= 500)
                    u(new i);
                else if (404 !== h.status)
                    if ("string" == typeof c && null !== c.toLowerCase().match("application/json"))
                        if (417 !== h.status)
                            if (422 !== h.status)
                                if (429 !== h.status)
                                    if (200 !== h.status)
                                        try {
                                            var p = JSON.parse(h.responseText);
                                            u(new e(h.status,p.message,p.description))
                                        } catch (e) {
                                            u(new a(h.status))
                                        }
                                    else
                                        try {
                                            var m = JSON.parse(h.responseText);
                                            m.query = l,
                                            d(m)
                                        } catch (e) {
                                            u(new a(h.status))
                                        }
                                else
                                    try {
                                        var f = JSON.parse(h.responseText);
                                        u(new r(h.status,f.message,f.description,h.getResponseHeader("Retry-After")))
                                    } catch (e) {
                                        u(new a(h.status))
                                    }
                            else
                                try {
                                    var v = JSON.parse(h.responseText);
                                    u(new o(h.status,v.message,v.description))
                                } catch (e) {
                                    u(new a(h.status))
                                }
                        else
                            try {
                                var g = JSON.parse(h.responseText);
                                u(new n(h.status,g.message,g.description))
                            } catch (e) {
                                u(new a(h.status))
                            }
                    else
                        u(new s(h.status));
                else
                    u(new t(h.status))
            }
        }
        ,
        h.open("get", "/search/suggest.json?q=" + encodeURIComponent(l) + "&" + c),
        h.setRequestHeader("Content-Type", "application/json"),
        h.send()
    }
    ,
    p = 10,
    m = null,
    function() {
        var e = this
          , t = arguments;
        clearTimeout(m),
        m = setTimeout((function() {
            m = null,
            h.apply(e, t)
        }
        ), p || 0)
    }
    );
    function v(e) {
        if (!e)
            throw new TypeError("No config object was specified");
        this._retryAfter = null,
        this._currentQuery = null,
        this.dispatcher = new l,
        this.cache = new c({
            bucketSize: 40
        }),
        this.configParams = u(e)
    }
    function g(e) {
        return "string" != typeof e ? null : e.trim().replace(" ", "-").toLowerCase()
    }
    return v.TYPES = {
        PRODUCT: "product",
        PAGE: "page",
        ARTICLE: "article"
    },
    v.FIELDS = {
        AUTHOR: "author",
        BODY: "body",
        PRODUCT_TYPE: "product_type",
        TAG: "tag",
        TITLE: "title",
        VARIANTS_BARCODE: "variants.barcode",
        VARIANTS_SKU: "variants.sku",
        VARIANTS_TITLE: "variants.title",
        VENDOR: "vendor"
    },
    v.UNAVAILABLE_PRODUCTS = {
        SHOW: "show",
        HIDE: "hide",
        LAST: "last"
    },
    v.prototype.query = function(e) {
        try {
            !function(e) {
                var t;
                if (null == e)
                    throw (t = new TypeError("'query' is missing")).type = "argument",
                    t;
                if ("string" != typeof e)
                    throw (t = new TypeError("'query' is not a string")).type = "argument",
                    t
            }(e)
        } catch (e) {
            return void this.dispatcher.dispatch("error", e)
        }
        if ("" === e)
            return this;
        this._currentQuery = g(e);
        var t = this.cache.get(this._currentQuery);
        return t ? (this.dispatcher.dispatch("success", t),
        this) : (f(this.configParams, e, function(e) {
            this.cache.set(g(e.query), e),
            g(e.query) === this._currentQuery && (this._retryAfter = null,
            this.dispatcher.dispatch("success", e))
        }
        .bind(this), function(e) {
            e.retryAfter && (this._retryAfter = e.retryAfter),
            this.dispatcher.dispatch("error", e)
        }
        .bind(this)),
        this)
    }
    ,
    v.prototype.on = function(e, t) {
        return this.dispatcher.on(e, t),
        this
    }
    ,
    v.prototype.off = function(e, t) {
        return this.dispatcher.off(e, t),
        this
    }
    ,
    v
}(),
this.Shopify = this.Shopify || {},
this.Shopify.theme = this.Shopify.theme || {},
this.Shopify.theme.PredictiveSearchComponent = function(e) {
    "use strict";
    var t = {
        resources: {
            type: [(e = e && e.hasOwnProperty("default") ? e.default : e).TYPES.PRODUCT],
            options: {
                unavailable_products: e.UNAVAILABLE_PRODUCTS.LAST,
                fields: [e.FIELDS.TITLE, e.FIELDS.VENDOR, e.FIELDS.PRODUCT_TYPE, e.FIELDS.VARIANTS_TITLE]
            }
        }
    };
    function i(i) {
        if (!(i && i.selectors && i.selectors.input && a(i.selectors.input) && i.selectors.result && a(i.selectors.result) && i.resultTemplateFct && n(i.resultTemplateFct) && i.numberOfResultsTemplateFct && n(i.numberOfResultsTemplateFct) && i.loadingResultsMessageTemplateFct && n(i.loadingResultsMessageTemplateFct))) {
            var s = new TypeError("PredictiveSearchComponent config is not valid");
            throw s.type = "argument",
            s
        }
        var r;
        (this.nodes = function(e) {
            return {
                input: document.querySelector(e.input),
                reset: document.querySelector(e.reset),
                result: document.querySelector(e.result)
            }
        }(i.selectors),
        function(e) {
            if (!e || !e.input || !e.result || "INPUT" !== e.input.tagName)
                return !1;
            return !0
        }(this.nodes)) ? (this._searchKeyword = "",
        this.resultTemplateFct = i.resultTemplateFct,
        this.numberOfResultsTemplateFct = i.numberOfResultsTemplateFct,
        this.loadingResultsMessageTemplateFct = i.loadingResultsMessageTemplateFct,
        this.numberOfResults = i.numberOfResults || 4,
        this.classes = {
            visibleVariant: i.visibleVariant ? i.visibleVariant : "predictive-search-wrapper--visible",
            itemSelected: i.itemSelectedClass ? i.itemSelectedClass : "predictive-search-item--selected",
            clearButtonVisible: i.clearButtonVisibleClass ? i.clearButtonVisibleClass : "predictive-search__clear-button--visible"
        },
        this.selectors = {
            searchResult: i.searchResult ? i.searchResult : "[data-search-result]"
        },
        this.callbacks = function(e) {
            return {
                onBodyMousedown: e.onBodyMousedown,
                onBeforeOpen: e.onBeforeOpen,
                onOpen: e.onOpen,
                onBeforeClose: e.onBeforeClose,
                onClose: e.onClose,
                onInputFocus: e.onInputFocus,
                onInputKeyup: e.onInputKeyup,
                onInputBlur: e.onInputBlur,
                onInputReset: e.onInputReset,
                onBeforeDestroy: e.onBeforeDestroy,
                onDestroy: e.onDestroy
            }
        }(i),
        (r = this.nodes.input).setAttribute("autocorrect", "off"),
        r.setAttribute("autocomplete", "off"),
        r.setAttribute("autocapitalize", "off"),
        r.setAttribute("spellcheck", "false"),
        this._addInputEventListeners(),
        this._addBodyEventListener(),
        this._addAccessibilityAnnouncer(),
        this._toggleClearButtonVisibility(),
        this.predictiveSearch = new e(i.PredictiveSearchAPIConfig ? i.PredictiveSearchAPIConfig : t),
        this.predictiveSearch.on("success", this._handlePredictiveSearchSuccess.bind(this)),
        this.predictiveSearch.on("error", this._handlePredictiveSearchError.bind(this))) : console.warn("Could not find valid nodes")
    }
    function s(e) {
        return Object.prototype.toString.call(e)
    }
    function a(e) {
        return "[object String]" === s(e)
    }
    function r(e) {
        return "[object Boolean]" === s(e)
    }
    function n(e) {
        return "[object Function]" === s(e)
    }
    return i.prototype.isResultVisible = !1,
    i.prototype.results = {},
    i.prototype._latencyTimer = null,
    i.prototype._resultNodeClicked = !1,
    i.prototype._addInputEventListeners = function() {
        var e = this.nodes.input
          , t = this.nodes.reset;
        e && (this._handleInputFocus = this._handleInputFocus.bind(this),
        this._handleInputBlur = this._handleInputBlur.bind(this),
        this._handleInputKeyup = this._handleInputKeyup.bind(this),
        this._handleInputKeydown = this._handleInputKeydown.bind(this),
        e.addEventListener("focus", this._handleInputFocus),
        e.addEventListener("blur", this._handleInputBlur),
        e.addEventListener("keyup", this._handleInputKeyup),
        e.addEventListener("keydown", this._handleInputKeydown),
        t && (this._handleInputReset = this._handleInputReset.bind(this),
        t.addEventListener("click", this._handleInputReset)))
    }
    ,
    i.prototype._removeInputEventListeners = function() {
        var e = this.nodes.input;
        e.removeEventListener("focus", this._handleInputFocus),
        e.removeEventListener("blur", this._handleInputBlur),
        e.removeEventListener("keyup", this._handleInputKeyup),
        e.removeEventListener("keydown", this._handleInputKeydown)
    }
    ,
    i.prototype._addBodyEventListener = function() {
        this._handleBodyMousedown = this._handleBodyMousedown.bind(this),
        document.querySelector("body").addEventListener("mousedown", this._handleBodyMousedown)
    }
    ,
    i.prototype._removeBodyEventListener = function() {
        document.querySelector("body").removeEventListener("mousedown", this._handleBodyMousedown)
    }
    ,
    i.prototype._removeClearButtonEventListener = function() {
        var e = this.nodes.reset;
        e && e.removeEventListener("click", this._handleInputReset)
    }
    ,
    i.prototype._handleBodyMousedown = function(e) {
        if (this.isResultVisible && null !== this.nodes)
            if (e.target.isEqualNode(this.nodes.input) || this.nodes.input.contains(e.target) || e.target.isEqualNode(this.nodes.result) || this.nodes.result.contains(e.target))
                this._resultNodeClicked = !0;
            else if (n(this.callbacks.onBodyMousedown)) {
                var t = this.callbacks.onBodyMousedown(this.nodes);
                r(t) && t && this.close()
            } else
                this.close()
    }
    ,
    i.prototype._handleInputFocus = function(e) {
        if (n(this.callbacks.onInputFocus)) {
            var t = this.callbacks.onInputFocus(this.nodes);
            if (r(t) && !t)
                return !1
        }
        return e.target.value.length > 0 && this._search(),
        !0
    }
    ,
    i.prototype._handleInputBlur = function() {
        return setTimeout(function() {
            if (n(this.callbacks.onInputBlur)) {
                var e = this.callbacks.onInputBlur(this.nodes);
                if (r(e) && !e)
                    return !1
            }
            return !document.activeElement.isEqualNode(this.nodes.reset) && (this._resultNodeClicked ? (this._resultNodeClicked = !1,
            !1) : void this.close())
        }
        .bind(this)),
        !0
    }
    ,
    i.prototype._addAccessibilityAnnouncer = function() {
        this._accessibilityAnnouncerDiv = window.document.createElement("div"),
        this._accessibilityAnnouncerDiv.setAttribute("style", "position: absolute !important; overflow: hidden; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0;"),
        this._accessibilityAnnouncerDiv.setAttribute("data-search-announcer", ""),
        this._accessibilityAnnouncerDiv.setAttribute("aria-live", "polite"),
        this._accessibilityAnnouncerDiv.setAttribute("aria-atomic", "true"),
        this.nodes.result.parentElement.appendChild(this._accessibilityAnnouncerDiv)
    }
    ,
    i.prototype._removeAccessibilityAnnouncer = function() {
        this.nodes.result.parentElement.removeChild(this._accessibilityAnnouncerDiv)
    }
    ,
    i.prototype._updateAccessibilityAttributesAfterSelectingElement = function(e, t) {
        this.nodes.input.setAttribute("aria-activedescendant", t.id),
        e && e.removeAttribute("aria-selected"),
        t.setAttribute("aria-selected", !0)
    }
    ,
    i.prototype._clearAriaActiveDescendant = function() {
        this.nodes.input.setAttribute("aria-activedescendant", "")
    }
    ,
    i.prototype._announceNumberOfResultsFound = function(e) {
        var t = this._accessibilityAnnouncerDiv.innerHTML
          , i = this.numberOfResultsTemplateFct(e);
        t === i && (i += "&nbsp;"),
        this._accessibilityAnnouncerDiv.innerHTML = i
    }
    ,
    i.prototype._announceLoadingState = function() {
        this._accessibilityAnnouncerDiv.innerHTML = this.loadingResultsMessageTemplateFct()
    }
    ,
    i.prototype._handleInputKeyup = function(e) {
        if (n(this.callbacks.onInputKeyup)) {
            var t = this.callbacks.onInputKeyup(this.nodes);
            if (r(t) && !t)
                return !1
        }
        if (this._toggleClearButtonVisibility(),
        this.isResultVisible && null !== this.nodes) {
            if (38 === e.keyCode)
                return this._navigateOption(e, "UP"),
                !0;
            if (40 === e.keyCode)
                return this._navigateOption(e, "DOWN"),
                !0;
            if (13 === e.keyCode)
                return this._selectOption(),
                !0;
            27 === e.keyCode && this.close()
        }
        return e.target.value.length <= 0 ? (this.close(),
        this._setKeyword("")) : e.target.value.length > 0 && this._search(),
        !0
    }
    ,
    i.prototype._handleInputKeydown = function(e) {
        13 === e.keyCode && null !== this._getSelectedOption() && e.preventDefault(),
        38 !== e.keyCode && 40 !== e.keyCode || e.preventDefault()
    }
    ,
    i.prototype._handleInputReset = function(e) {
        if (e.preventDefault(),
        n(this.callbacks.onInputReset)) {
            var t = this.callbacks.onInputReset(this.nodes);
            if (r(t) && !t)
                return !1
        }
        return this.nodes.input.value = "",
        this.nodes.input.focus(),
        this._toggleClearButtonVisibility(),
        this.close(),
        !0
    }
    ,
    i.prototype._navigateOption = function(e, t) {
        var i = this._getSelectedOption();
        if (i)
            if ("DOWN" === t) {
                var s = i.nextElementSibling;
                s && (i.classList.remove(this.classes.itemSelected),
                s.classList.add(this.classes.itemSelected),
                this._updateAccessibilityAttributesAfterSelectingElement(i, s))
            } else {
                var a = i.previousElementSibling;
                a && (i.classList.remove(this.classes.itemSelected),
                a.classList.add(this.classes.itemSelected),
                this._updateAccessibilityAttributesAfterSelectingElement(i, a))
            }
        else {
            var r = this.nodes.result.querySelector(this.selectors.searchResult);
            r.classList.add(this.classes.itemSelected),
            this._updateAccessibilityAttributesAfterSelectingElement(null, r)
        }
    }
    ,
    i.prototype._getSelectedOption = function() {
        return this.nodes.result.querySelector("." + this.classes.itemSelected)
    }
    ,
    i.prototype._selectOption = function() {
        var e = this._getSelectedOption();
        e && e.querySelector("a, button").click()
    }
    ,
    i.prototype._search = function() {
        var e = this.nodes.input.value;
        this._searchKeyword !== e && (clearTimeout(this._latencyTimer),
        this._latencyTimer = setTimeout(function() {
            this.results.isLoading = !0,
            this._announceLoadingState(),
            this.nodes.result.classList.add(this.classes.visibleVariant),
            this.nodes.result.innerHTML = this.resultTemplateFct(this.results)
        }
        .bind(this), 500),
        this.predictiveSearch.query(e),
        this._setKeyword(e))
    }
    ,
    i.prototype._handlePredictiveSearchSuccess = function(e) {
        clearTimeout(this._latencyTimer),
        this.results = e.resources.results,
        this.results.isLoading = !1,
        this.results.products = this.results.products.slice(0, this.numberOfResults),
        this.results.canLoadMore = this.numberOfResults <= this.results.products.length,
        this.results.searchQuery = this.nodes.input.value,
        this.results.products.length > 0 || this.results.searchQuery ? (this.nodes.result.innerHTML = this.resultTemplateFct(this.results),
        this._announceNumberOfResultsFound(this.results),
        this.open()) : (this.nodes.result.innerHTML = "",
        this._closeOnNoResults())
    }
    ,
    i.prototype._handlePredictiveSearchError = function() {
        clearTimeout(this._latencyTimer),
        this.nodes.result.innerHTML = "",
        this._closeOnNoResults()
    }
    ,
    i.prototype._closeOnNoResults = function() {
        this.nodes && this.nodes.result.classList.remove(this.classes.visibleVariant),
        this.isResultVisible = !1
    }
    ,
    i.prototype._setKeyword = function(e) {
        this._searchKeyword = e
    }
    ,
    i.prototype._toggleClearButtonVisibility = function() {
        this.nodes.reset && (this.nodes.input.value.length > 0 ? this.nodes.reset.classList.add(this.classes.clearButtonVisible) : this.nodes.reset.classList.remove(this.classes.clearButtonVisible))
    }
    ,
    i.prototype.open = function() {
        if (!this.isResultVisible) {
            if (n(this.callbacks.onBeforeOpen)) {
                var e = this.callbacks.onBeforeOpen(this.nodes);
                if (r(e) && !e)
                    return !1
            }
            return this.nodes.result.classList.add(this.classes.visibleVariant),
            this.nodes.input.setAttribute("aria-expanded", !0),
            this.isResultVisible = !0,
            n(this.callbacks.onOpen) && this.callbacks.onOpen(this.nodes) || !0
        }
    }
    ,
    i.prototype.close = function() {
        if (!this.isResultVisible)
            return !0;
        if (n(this.callbacks.onBeforeClose)) {
            var e = this.callbacks.onBeforeClose(this.nodes);
            if (r(e) && !e)
                return !1
        }
        return this.nodes && this.nodes.result.classList.remove(this.classes.visibleVariant),
        this.nodes.input.setAttribute("aria-expanded", !1),
        this._clearAriaActiveDescendant(),
        this._setKeyword(""),
        n(this.callbacks.onClose) && this.callbacks.onClose(this.nodes),
        this.isResultVisible = !1,
        this.results = {},
        !0
    }
    ,
    i.prototype.destroy = function() {
        if (this.close(),
        n(this.callbacks.onBeforeDestroy)) {
            var e = this.callbacks.onBeforeDestroy(this.nodes);
            if (r(e) && !e)
                return !1
        }
        var t;
        return this.nodes.result.classList.remove(this.classes.visibleVariant),
        (t = this.nodes.input).removeAttribute("autocorrect", "off"),
        t.removeAttribute("autocomplete", "off"),
        t.removeAttribute("autocapitalize", "off"),
        t.removeAttribute("spellcheck", "false"),
        this._removeInputEventListeners(),
        this._removeBodyEventListener(),
        this._removeAccessibilityAnnouncer(),
        this._removeClearButtonEventListener(),
        n(this.callbacks.onDestroy) && this.callbacks.onDestroy(this.nodes),
        !0
    }
    ,
    i.prototype.clearAndClose = function() {
        this.nodes.input.value = "",
        this.close()
    }
    ,
    i
}(Shopify.theme.PredictiveSearch),
theme.Drawers = function() {
    function e(e, t, i) {
        var s = "js-drawer-open"
          , a = {
            selectors: {
                openVariant: ".js-drawer-open-" + t,
                close: ".js-drawer-close"
            },
            classes: {
                open: s,
                openVariant: "js-drawer-open-" + t
            },
            withPredictiveSearch: !1
        };
        if (this.nodes = {
            $parent: $("html").add("body"),
            $page: $("#PageContainer")
        },
        this.config = $.extend(a, i),
        this.position = t,
        this.$drawer = $("#" + e),
        !this.$drawer.length)
            return !1;
        this.drawerIsOpen = !1,
        this.init()
    }
    return e.prototype.init = function() {
        $(this.config.selectors.openVariant).on("click", $.proxy(this.open, this)),
        this.$drawer.on("click", this.config.selectors.close, $.proxy(this.close, this))
    }
    ,
    e.prototype.open = function(e) {
        var t = !1;
        if (e ? e.preventDefault() : t = !0,
        e && e.stopPropagation && (e.stopPropagation(),
        this.$activeSource = $(e.currentTarget)),
        this.drawerIsOpen && !t)
            return this.close();
        this.config.withPredictiveSearch || this.$drawer.prepareTransition(),
        this.nodes.$parent.addClass(this.config.classes.open + " " + this.config.classes.openVariant),
        this.drawerIsOpen = !0,
        this.config.onDrawerOpen && "function" == typeof this.config.onDrawerOpen && (t || this.config.onDrawerOpen()),
        this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true");
        var i = {
            $container: this.$drawer,
            namespace: "drawer_focus"
        };
        return this.config.$elementToFocusOnOpen && (i.$elementToFocus = this.config.$elementToFocusOnOpen),
        slate.a11y.trapFocus(i),
        this.bindEvents(),
        this
    }
    ,
    e.prototype.close = function() {
        this.drawerIsOpen && ($(document.activeElement).trigger("blur"),
        this.config.withPredictiveSearch || this.$drawer.prepareTransition(),
        this.nodes.$parent.removeClass(this.config.classes.open + " " + this.config.classes.openVariant),
        this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "false"),
        this.drawerIsOpen = !1,
        slate.a11y.removeTrapFocus({
            $container: this.$drawer,
            namespace: "drawer_focus"
        }),
        this.unbindEvents(),
        this.config.onDrawerClose && "function" == typeof this.config.onDrawerClose && this.config.onDrawerClose())
    }
    ,
    e.prototype.bindEvents = function() {
        this.nodes.$parent.on("keyup.drawer", $.proxy((function(e) {
            return 27 !== e.keyCode || (this.close(),
            !1)
        }
        ), this)),
        this.nodes.$page.on("touchmove.drawer", (function() {
            return !1
        }
        )),
        this.nodes.$page.on("click.drawer", $.proxy((function() {
            return this.close(),
            !1
        }
        ), this))
    }
    ,
    e.prototype.unbindEvents = function() {
        this.nodes.$page.off(".drawer"),
        this.nodes.$parent.off(".drawer")
    }
    ,
    e
}(),
theme.Helpers = function() {
    var e = !1;
    return {
        setTouch: function() {
            e = !0
        },
        isTouch: function() {
            return e
        }
    }
}(),
theme.LibraryLoader = function() {
    var e = "link"
      , t = "script"
      , i = "requested"
      , s = "loaded"
      , a = "https://cdn.shopify.com/shopifycloud/"
      , r = {
        youtubeSdk: {
            tagId: "youtube-sdk",
            src: "https://www.youtube.com/iframe_api",
            type: t
        },
        plyrShopifyStyles: {
            tagId: "plyr-shopify-styles",
            src: a + "shopify-plyr/v1.0/shopify-plyr.css",
            type: e
        },
        modelViewerUiStyles: {
            tagId: "shopify-model-viewer-ui-styles",
            src: a + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
            type: e
        }
    };
    return {
        load: function(a, n) {
            var o = r[a];
            if (o && o.status !== i)
                if (n = n || function() {}
                ,
                o.status !== s) {
                    var c;
                    switch (o.status = i,
                    o.type) {
                    case t:
                        c = function(e, t) {
                            var i = document.createElement("script");
                            return i.src = e.src,
                            i.addEventListener("load", (function() {
                                e.status = s,
                                t()
                            }
                            )),
                            i
                        }(o, n);
                        break;
                    case e:
                        c = function(e, t) {
                            var i = document.createElement("link");
                            return i.href = e.src,
                            i.rel = "stylesheet",
                            i.type = "text/css",
                            i.addEventListener("load", (function() {
                                e.status = s,
                                t()
                            }
                            )),
                            i
                        }(o, n)
                    }
                    c.id = o.tagId,
                    o.element = c;
                    var l = document.getElementsByTagName(o.type)[0];
                    l.parentNode.insertBefore(c, l)
                } else
                    n()
        }
    }
}(),
window.theme = window.theme || {},
theme.Header = function() {
    var e = "body"
      , t = "#AccessibleNav"
      , i = "[data-has-dropdowns]"
      , s = ".site-nav__child-link"
      , a = ".site-nav--active-dropdown"
      , r = ".site-nav--has-centered-dropdown"
      , n = ".site-nav__dropdown--centered"
      , o = ".site-nav__link--main"
      , c = ".site-nav__link--last"
      , l = ".site-nav__dropdown"
      , d = ".site-header"
      , u = "site-nav--active-dropdown"
      , h = "site-nav__child-link"
      , p = "site-nav__dropdown--right"
      , m = "site-nav__dropdown--left"
      , f = {};
    function v(t) {
        t.find(o).attr("aria-expanded", "false"),
        t.removeClass(u),
        f.$activeDropdown = $(a),
        $(e).off("click.siteNav"),
        $(window).off("keyup.siteNav")
    }
    function g(e) {
        e.each((function() {
            var e = $(this).find(l);
            e.length && (Math.ceil($(this).offset().left) > Math.floor(f.$siteHeader.outerWidth()) / 2 ? e.removeClass(m).addClass(p) : e.removeClass(p).addClass(m))
        }
        ))
    }
    function y() {
        $(r).each((function() {
            var e = $(this)
              , t = e.find(n)
              , i = e.position().top + 41;
            t.css("top", i)
        }
        ))
    }
    return {
        init: function() {
            f = {
                $nav: $(t),
                $topLevel: $(o),
                $parents: $(t).find(i),
                $subMenuLinks: $(s),
                $activeDropdown: $(a),
                $siteHeader: $(d)
            },
            g($(i)),
            y(),
            f.$parents.on("click.siteNav", (function() {
                var t = $(this);
                t.hasClass(u) ? v(t) : function(t) {
                    t.addClass(u),
                    f.$activeDropdown.length && v(f.$activeDropdown);
                    f.$activeDropdown = t,
                    t.find(o).attr("aria-expanded", "true"),
                    setTimeout((function() {
                        $(window).on("keyup.siteNav", (function(e) {
                            27 === e.keyCode && v(t)
                        }
                        )),
                        $(e).on("click.siteNav", (function() {
                            v(t)
                        }
                        ))
                    }
                    ), 250)
                }(t)
            }
            )),
            $(c).on("focusout.siteNav", (function() {
                setTimeout((function() {
                    !$(document.activeElement).hasClass(h) && f.$activeDropdown.length && v(f.$activeDropdown)
                }
                ))
            }
            )),
            f.$topLevel.on("focus.siteNav", (function() {
                f.$activeDropdown.length && v(f.$activeDropdown)
            }
            )),
            f.$subMenuLinks.on("click.siteNav", (function(e) {
                e.stopImmediatePropagation()
            }
            )),
            $(window).resize($.debounce(50, (function() {
                g($(i)),
                y()
            }
            )))
        },
        unload: function() {
            $(window).off(".siteNav"),
            f.$parents.off(".siteNav"),
            f.$subMenuLinks.off(".siteNav"),
            f.$topLevel.off(".siteNav"),
            $(c).off(".siteNav"),
            $(e).off(".siteNav")
        }
    }
}(),
window.theme = window.theme || {},
theme.MobileNav = function() {
    var e, t, i, s = "mobile-nav--open", a = "mobile-nav--close", r = "mobile-nav__return-btn", n = "is-active", o = "is-closing", c = "js-menu--is-open", l = "sub-nav--is-open", d = "third-nav--is-open", u = "js-toggle-submenu", h = {}, p = 1;
    function m() {
        var e;
        h.$mobileNavToggle.hasClass(a) ? f() : (e = h.$siteHeader.outerHeight(),
        h.$mobileNavContainer.prepareTransition().addClass(c),
        h.$mobileNavContainer.css({
            transform: "translateY(" + e + "px)"
        }),
        h.$pageContainer.css({
            transform: "translate3d(0, " + h.$mobileNavContainer[0].scrollHeight + "px, 0)"
        }),
        slate.a11y.trapFocus({
            $container: h.$sectionHeader,
            $elementToFocus: h.$mobileNavToggle,
            namespace: "navFocus"
        }),
        h.$mobileNavToggle.addClass(a).removeClass(s).attr("aria-expanded", !0),
        $(window).on("keyup.mobileNav", (function(e) {
            27 === e.which && f()
        }
        )))
    }
    function f() {
        h.$mobileNavContainer.prepareTransition().removeClass(c),
        h.$mobileNavContainer.css({
            transform: "translateY(-100%)"
        }),
        h.$pageContainer.removeAttr("style"),
        slate.a11y.trapFocus({
            $container: $("html"),
            $elementToFocus: $("body")
        }),
        h.$mobileNavContainer.one("TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle", (function() {
            slate.a11y.removeTrapFocus({
                $container: h.$mobileNav,
                namespace: "navFocus"
            })
        }
        )),
        h.$mobileNavToggle.addClass(s).removeClass(a).attr("aria-expanded", !1).focus(),
        $(window).off("keyup.mobileNav"),
        scrollTo(0, 0)
    }
    function v(s) {
        if (!e) {
            var a = $(s.currentTarget)
              , c = a.hasClass(r);
            e = !0,
            c ? ($("." + u + '[data-level="' + (p - 1) + '"]').removeClass(n),
            i && i.length && i.removeClass(n)) : a.addClass(n),
            i = a,
            function(i) {
                var s = i ? $('.mobile-nav__dropdown[data-parent="' + i + '"]') : h.$mobileNav;
                p = s.data("level") ? s.data("level") : 1,
                t && t.length && t.prepareTransition().addClass(o);
                t = s;
                var a = s.outerHeight()
                  , r = p > 2 ? d : l;
                h.$mobileNavContainer.css("height", a).removeClass(d).addClass(r),
                i || h.$mobileNavContainer.removeClass(d).removeClass(l);
                var n = 1 === p ? h.$sectionHeader : s
                  , c = s.find("[data-menu-title=" + p + "]")
                  , u = c || s;
                h.$mobileNavContainer.one("TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle", (function() {
                    slate.a11y.trapFocus({
                        $container: n,
                        $elementToFocus: u,
                        namespace: "subNavFocus"
                    }),
                    h.$mobileNavContainer.off(".subnavToggle"),
                    e = !1
                }
                )),
                h.$pageContainer.css({
                    transform: "translateY(" + a + "px)"
                }),
                t.removeClass(o)
            }(a.data("target"))
        }
    }
    return {
        init: function() {
            (h = {
                $pageContainer: $("#PageContainer"),
                $siteHeader: $(".site-header"),
                $mobileNavToggle: $(".js-mobile-nav-toggle"),
                $mobileNavContainer: $(".mobile-nav-wrapper"),
                $mobileNav: $("#MobileNav"),
                $sectionHeader: $("#shopify-section-header"),
                $subNavToggleBtn: $("." + u)
            }).$mobileNavToggle.on("click", m),
            h.$subNavToggleBtn.on("click.subNav", v),
            enquire.register("screen and (max-width: 749px)", {
                unmatch: function() {
                    h.$mobileNavContainer.hasClass(c) && f()
                }
            })
        },
        closeMobileNav: f
    }
}(jQuery),
function() {
    var e = $(".return-link");
    function t(e) {
        var t = document.createElement("a");
        return t.ref = e,
        t.hostname
    }
    document.referrer && e.length && window.history.length && e.one("click", (function(e) {
        e.preventDefault();
        var i = t(document.referrer);
        return t(window.location.href) === i && history.back(),
        !1
    }
    ))
}(),
theme.Slideshow = function() {
    this.$slideshow = null;
    var e = "slick-active-mobile"
      , t = "slideshow__controls--hover"
      , i = "is-paused"
      , s = ".shopify-section"
      , a = "#SlideshowWrapper-"
      , r = ".slideshow__slide"
      , n = ".slideshow__text-wrap--mobile"
      , o = ".slideshow__text-content--mobile"
      , c = ".slideshow__controls"
      , l = ".slideshow__pause"
      , d = ".slick-dots"
      , u = ".slideshow__arrows"
      , h = ".slideshow__arrows--mobile"
      , p = ".slideshow__arrow-left"
      , m = ".slideshow__arrow-right";
    function f(t, r) {
        var o = this.$slideshow = $(t);
        this.adaptHeight = this.$slideshow.data("adapt-height"),
        this.$wrapper = this.$slideshow.closest(a + r),
        this.$section = this.$wrapper.closest(s),
        this.$controls = this.$wrapper.find(c),
        this.$arrows = this.$section.find(u),
        this.$arrowsMobile = this.$section.find(h),
        this.$pause = this.$controls.find(l),
        this.$textWrapperMobile = this.$section.find(n),
        this.autorotate = this.$slideshow.data("autorotate");
        var d = this.$slideshow.data("speed")
          , f = this.$slideshow.data("slide-nav-a11y");
        this.settings = {
            accessibility: !0,
            arrows: !1,
            dots: !0,
            fade: !0,
            draggable: !0,
            touchThreshold: 20,
            autoplay: this.autorotate,
            autoplaySpeed: d,
            appendDots: this.$arrows,
            customPaging: function(e, t) {
                return '<a href="' + a + r + '" aria-label="' + f.replace("[slide_number]", t + 1) + '" data-slide-number="' + t + '"></a>'
            }
        },
        this.$slideshow.on("beforeChange", y.bind(this)),
        this.$slideshow.on("init", v.bind(this)),
        this.$slideshow.on("init", function() {
            this.$mobileDots.find("li:first-of-type").addClass(e),
            this.showMobileText(0)
        }
        .bind(this)),
        this.autorotate && $(document).scroll($.debounce(250, function() {
            this.$arrowsMobile.offset().top + this.$arrowsMobile.outerHeight() < window.pageYOffset ? o.slick("slickPause") : this.$pause.hasClass(i) || o.slick("slickPlay")
        }
        .bind(this))),
        this.adaptHeight && (this.setSlideshowHeight(),
        $(window).resize($.debounce(50, this.setSlideshowHeight.bind(this)))),
        this.$slideshow.slick(this.settings),
        g.bind(this)(),
        this.$arrows.find(p).on("click", (function() {
            o.slick("slickPrev")
        }
        )),
        this.$arrows.find(m).on("click", (function() {
            o.slick("slickNext")
        }
        )),
        this.$pause.on("click", this.togglePause.bind(this))
    }
    function v(e, t) {
        var i = t.$slider
          , s = t.$list;
        this.$dots = this.$section.find(d),
        this.$mobileDots = this.$dots.eq(1),
        s.removeAttr("aria-live"),
        this.$wrapper.on("keyup", _.bind(this)),
        this.$controls.on("keyup", _.bind(this)),
        this.$textWrapperMobile.on("keyup", _.bind(this)),
        this.$wrapper.on("focusin", function(e) {
            this.$wrapper.has(e.target).length && (s.attr("aria-live", "polite"),
            this.autorotate && i.slick("slickPause"))
        }
        .bind(this)).on("focusout", function(e) {
            this.$wrapper.has(e.target).length && (s.removeAttr("aria-live"),
            this.autorotate && (this.$pause.is(".is-paused") || i.slick("slickPlay")))
        }
        .bind(this)),
        this.$dots && this.$dots.find("a").each((function() {
            $(this).on("click keyup", (function(e) {
                if ("keyup" !== e.type || e.which === slate.utils.keyboardKeys.ENTER) {
                    e.preventDefault();
                    var t = $(e.target).data("slide-number");
                    i.attr("tabindex", -1).slick("slickGoTo", t),
                    "keyup" === e.type && i.focus()
                }
            }
            ))
        }
        )).eq(0).attr("aria-current", "true"),
        this.$controls.on("focusin", b.bind(this)).on("focusout", w.bind(this))
    }
    function g() {
        this.$slideshow.find(r).removeAttr("role").removeAttr("aria-labelledby"),
        this.$dots.removeAttr("role").find("li").removeAttr("role").removeAttr("aria-selected").each((function() {
            var e = $(this)
              , t = e.attr("aria-controls");
            e.removeAttr("aria-controls").find("a").attr("aria-controls", t)
        }
        ))
    }
    function y(t, i, s, a) {
        var r = this.$dots.find("a")
          , n = this.$mobileDots.find("li");
        r.removeAttr("aria-current").eq(a).attr("aria-current", "true"),
        n.removeClass(e).eq(a).addClass(e),
        this.showMobileText(a)
    }
    function _() {
        event.keyCode === slate.utils.keyboardKeys.LEFTARROW && this.$slideshow.slick("slickPrev"),
        event.keyCode === slate.utils.keyboardKeys.RIGHTARROW && this.$slideshow.slick("slickNext")
    }
    function b() {
        this.$controls.addClass(t)
    }
    function w() {
        this.$controls.removeClass(t)
    }
    return f.prototype.togglePause = function() {
        var e = "#Slideshow-" + this.$pause.data("id");
        this.$pause.hasClass(i) ? (this.$pause.removeClass(i).attr("aria-pressed", "false"),
        this.autorotate && $(e).slick("slickPlay")) : (this.$pause.addClass(i).attr("aria-pressed", "true"),
        this.autorotate && $(e).slick("slickPause"))
    }
    ,
    f.prototype.setSlideshowHeight = function() {
        var e = this.$slideshow.data("min-aspect-ratio");
        this.$slideshow.height($(document).width() / e)
    }
    ,
    f.prototype.showMobileText = function(e) {
        var t = this.$textWrapperMobile.find(o)
          , i = o + "-" + e
          , s = this.$textWrapperMobile.find(i);
        s.length || 1 !== this.$slideshow.find(r).length ? this.$textWrapperMobile.show() : this.$textWrapperMobile.hide(),
        t.hide(),
        s.show()
    }
    ,
    f
}(),
theme.Video = function() {
    var e = !1
      , t = !1
      , i = !1
      , s = !1
      , a = {}
      , r = []
      , n = {
        ratio: 16 / 9,
        scrollAnimationDuration: 400,
        playerVars: {
            iv_load_policy: 3,
            modestbranding: 1,
            autoplay: 0,
            controls: 0,
            wmode: "opaque",
            branding: 0,
            autohide: 0,
            rel: 0
        },
        events: {
            onReady: function(e) {
                e.target.setPlaybackQuality("hd1080");
                var t = k(e)
                  , i = e.target.getVideoData().title;
                b(),
                $("#" + t.id).attr("tabindex", "-1"),
                I(),
                M(t.$videoWrapper, i),
                "background" === t.type && (e.target.mute(),
                y(t.id));
                t.$videoWrapper.addClass(o.loaded)
            },
            onStateChange: function(t) {
                var i = k(t);
                "background" !== i.status || x() || e || t.data !== YT.PlayerState.PLAYING && t.data !== YT.PlayerState.BUFFERING || (_(!0),
                e = !0,
                i.$videoWrapper.removeClass(o.loading));
                switch (t.data) {
                case YT.PlayerState.ENDED:
                    !function(e) {
                        switch (e.type) {
                        case "background":
                            r[e.id].seekTo(0);
                            break;
                        case "image_with_play":
                            S(e.id),
                            T(e.id, !1)
                        }
                    }(i);
                    break;
                case YT.PlayerState.PAUSED:
                    setTimeout((function() {
                        t.target.getPlayerState() === YT.PlayerState.PAUSED && C(i)
                    }
                    ), 200)
                }
            }
        }
    }
      , o = {
        playing: "video-is-playing",
        paused: "video-is-paused",
        loading: "video-is-loading",
        loaded: "video-is-loaded",
        backgroundVideoWrapper: "video-background-wrapper",
        videoWithImage: "video--image_with_play",
        backgroundVideo: "video--background",
        userPaused: "is-paused",
        supportsAutoplay: "autoplay",
        supportsNoAutoplay: "no-autoplay",
        wrapperMinHeight: "video-section-wrapper--min-height"
    }
      , c = ".video-section"
      , l = ".video-section-wrapper"
      , d = ".video-control__play"
      , u = ".video-control__close-wrapper"
      , h = ".video__pause"
      , p = ".video__pause-stop"
      , m = ".video__pause-resume"
      , f = ".icon__fallback-text";
    function v(e) {
        (t || i) && e && "function" == typeof r[e].playVideo && y(e)
    }
    function g(e) {
        r[e] && "function" == typeof r[e].pauseVideo && r[e].pauseVideo()
    }
    function y(t, s) {
        var n = a[t]
          , c = r[t]
          , l = n.$videoWrapper;
        if (i)
            w(n);
        else {
            if (s || e)
                return l.removeClass(o.loading),
                w(n),
                void c.playVideo();
            c.playVideo()
        }
    }
    function _(t) {
        var s = t ? o.supportsAutoplay : o.supportsNoAutoplay;
        $(document.documentElement).removeClass(o.supportsAutoplay).removeClass(o.supportsNoAutoplay).addClass(s),
        t || (i = !0),
        e = !0
    }
    function b() {
        t || (x() && (i = !0),
        i && _(!1),
        t = !0)
    }
    function w(e) {
        var t = e.$videoWrapper
          , i = t.find(h);
        t.removeClass(o.loading),
        i.hasClass(o.userPaused) && i.removeClass(o.userPaused),
        "background" !== e.status && ($("#" + e.id).attr("tabindex", "0"),
        "image_with_play" === e.type && t.removeClass(o.paused).addClass(o.playing),
        setTimeout((function() {
            t.find(u).focus()
        }
        ), n.scrollAnimationDuration))
    }
    function C(e) {
        var t = e.$videoWrapper;
        "image_with_play" === e.type && ("closed" === e.status ? t.removeClass(o.paused) : t.addClass(o.paused)),
        t.removeClass(o.playing)
    }
    function S(e) {
        var t = a[e]
          , i = t.$videoWrapper
          , s = [o.paused, o.playing].join(" ");
        switch (x() && i.removeAttr("style"),
        $("#" + t.id).attr("tabindex", "-1"),
        t.status = "closed",
        t.type) {
        case "image_with_play":
            r[e].stopVideo(),
            C(t);
            break;
        case "background":
            r[e].mute(),
            function(e) {
                $("#" + e).removeClass(o.videoWithImage).addClass(o.backgroundVideo),
                a[e].$videoWrapper.addClass(o.backgroundVideoWrapper),
                a[e].status = "background",
                E($("#" + e))
            }(e)
        }
        i.removeClass(s)
    }
    function k(e) {
        return a[e.target.h.id]
    }
    function T(e, t) {
        var i = a[e]
          , s = i.$videoWrapper.offset().top
          , r = i.$videoWrapper.find(d)
          , c = 0
          , l = 0;
        x() && i.$videoWrapper.parent().toggleClass("page-width", !t),
        t ? (l = x() ? $(window).width() / n.ratio : i.$videoWrapper.width() / n.ratio,
        c = ($(window).height() - l) / 2,
        i.$videoWrapper.removeClass(o.wrapperMinHeight).animate({
            height: l
        }, 600),
        x() && Shopify.designMode || $("html, body").animate({
            scrollTop: s - c
        }, n.scrollAnimationDuration)) : (l = x() ? i.$videoWrapper.data("mobile-height") : i.$videoWrapper.data("desktop-height"),
        i.$videoWrapper.height(i.$videoWrapper.width() / n.ratio).animate({
            height: l
        }, 600),
        setTimeout((function() {
            i.$videoWrapper.addClass(o.wrapperMinHeight)
        }
        ), 600),
        r.focus())
    }
    function P(e) {
        var t = a[e];
        switch (t.$videoWrapper.addClass(o.loading),
        t.$videoWrapper.attr("style", "height: " + t.$videoWrapper.height() + "px"),
        t.status = "open",
        t.type) {
        case "image_with_play":
            y(e, !0);
            break;
        case "background":
            !function(e) {
                $("#" + e).removeClass(o.backgroundVideo).addClass(o.videoWithImage),
                setTimeout((function() {
                    $("#" + e).removeAttr("style")
                }
                ), 600),
                a[e].$videoWrapper.removeClass(o.backgroundVideoWrapper).addClass(o.playing),
                a[e].status = "open"
            }(e),
            r[e].unMute(),
            y(e, !0)
        }
        T(e, !0),
        $(document).on("keydown.videoPlayer", (function(e) {
            var t = $(document.activeElement).data("controls");
            e.keyCode === slate.utils.keyboardKeys.ESCAPE && t && (S(t),
            T(t, !1))
        }
        ))
    }
    function I() {
        $("." + o.backgroundVideo).each((function(e, t) {
            E($(t))
        }
        ))
    }
    function E(e) {
        if (s)
            if (x())
                e.removeAttr("style");
            else {
                var t = e.closest(l)
                  , i = t.width()
                  , a = e.width()
                  , r = t.data("desktop-height");
                i / n.ratio < r ? (a = Math.ceil(r * n.ratio),
                e.width(a).height(r).css({
                    left: (i - a) / 2,
                    top: 0
                })) : (r = Math.ceil(i / n.ratio),
                e.width(i).height(r).css({
                    left: 0,
                    top: (r - r) / 2
                })),
                e.prepareTransition(),
                t.addClass(o.loaded)
            }
    }
    function x() {
        return $(window).width() < 750 || window.mobileCheck()
    }
    function L() {
        $(document).on("click.videoPlayer", d, (function(e) {
            P($(e.currentTarget).data("controls"))
        }
        )),
        $(document).on("click.videoPlayer", u, (function(e) {
            var t = $(e.currentTarget).data("controls");
            $(e.currentTarget).blur(),
            S(t),
            T(t, !1)
        }
        )),
        $(document).on("click.videoPlayer", h, (function(e) {
            !function(e) {
                var t = a[e].$videoWrapper.find(h)
                  , i = t.hasClass(o.userPaused);
                i ? (t.removeClass(o.userPaused),
                v(e)) : (t.addClass(o.userPaused),
                g(e)),
                t.attr("aria-pressed", !i)
            }($(e.currentTarget).data("controls"))
        }
        )),
        $(window).on("resize.videoPlayer", $.debounce(200, (function() {
            if (s) {
                var e, t = window.innerHeight === screen.height;
                if (I(),
                x()) {
                    for (e in a)
                        a.hasOwnProperty(e) && (a[e].$videoWrapper.hasClass(o.playing) && (t || (g(e),
                        C(a[e]))),
                        a[e].$videoWrapper.height($(document).width() / n.ratio));
                    _(!1)
                } else
                    for (e in _(!0),
                    a)
                        a[e].$videoWrapper.find("." + o.videoWithImage).length || (r[e].playVideo(),
                        w(a[e]))
            }
        }
        ))),
        $(window).on("scroll.videoPlayer", $.debounce(50, (function() {
            if (s)
                for (var e in a)
                    if (a.hasOwnProperty(e)) {
                        var t = a[e].$videoWrapper;
                        t.hasClass(o.playing) && (t.offset().top + .75 * t.height() < $(window).scrollTop() || t.offset().top + .25 * t.height() > $(window).scrollTop() + $(window).height()) && (S(e),
                        T(e, !1))
                    }
        }
        )))
    }
    function A(e) {
        var t = $.extend({}, n, a[e]);
        t.playerVars.controls = t.controls,
        r[e] = new YT.Player(e,t)
    }
    function M(e, t) {
        var i = e.find(d)
          , s = e.find(u)
          , a = e.find(h)
          , r = s.find(f)
          , n = a.find(p).find(f)
          , o = a.find(m).find(f);
        i.each((function() {
            var e = $(this).find(f);
            e.text(e.text().replace("[video_title]", t))
        }
        )),
        r.text(r.text().replace("[video_title]", t)),
        n.text(n.text().replace("[video_title]", t)),
        o.text(o.text().replace("[video_title]", t))
    }
    return {
        init: function(e) {
            if (e.length) {
                if (a[e.attr("id")] = {
                    id: e.attr("id"),
                    videoId: e.data("id"),
                    type: e.data("type"),
                    status: "image_with_play" === e.data("type") ? "closed" : "background",
                    $video: e,
                    $videoWrapper: e.closest(l),
                    $section: e.closest(c),
                    controls: "background" === e.data("type") ? 0 : 1
                },
                !s) {
                    var t = document.createElement("script");
                    t.src = "https://www.youtube.com/iframe_api";
                    var i = document.getElementsByTagName("script")[0];
                    i.parentNode.insertBefore(t, i)
                }
                b()
            }
        },
        editorLoadVideo: function(e) {
            s && (A(e),
            L())
        },
        loadVideos: function() {
            for (var e in a)
                a.hasOwnProperty(e) && A(e);
            L(),
            s = !0
        },
        playVideo: v,
        pauseVideo: g,
        removeEvents: function() {
            $(document).off(".videoPlayer"),
            $(window).off(".videoPlayer")
        }
    }
}(),
theme.ProductVideo = function() {
    var e = {}
      , t = {
        html5: "html5",
        youtube: "youtube"
    }
      , i = "[data-product-single-media-wrapper]"
      , s = "enable-video-looping"
      , a = "video-id";
    function r(i) {
        i ? function() {
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var s = e[i];
                    if (s.nativeVideo)
                        continue;
                    s.host === t.html5 && (s.element.setAttribute("controls", "controls"),
                    s.nativeVideo = !0)
                }
        }() : c(t.html5)
    }
    function n() {
        window.YT.Player && c(t.youtube)
    }
    function o(e) {
        return "VIDEO" === e.tagName ? t.html5 : "IFRAME" === e.tagName && /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e.src) ? t.youtube : null
    }
    function c(t) {
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var s = e[i];
                s.host === t && s.ready()
            }
    }
    return {
        init: function(c, l) {
            if (c.length) {
                var d = c.find("iframe, video")[0]
                  , u = c.data("mediaId");
                if (d)
                    switch (e[u] = {
                        mediaId: u,
                        sectionId: l,
                        host: o(d),
                        container: c,
                        element: d,
                        ready: function() {
                            !function(e) {
                                if (e.player)
                                    return;
                                var r = e.container.closest(i)
                                  , n = r.data(s);
                                switch (e.host) {
                                case t.html5:
                                    e.player = new Shopify.Plyr(e.element,{
                                        loop: {
                                            active: n
                                        }
                                    });
                                    break;
                                case t.youtube:
                                    var o = r.data(a);
                                    e.player = new YT.Player(e.element,{
                                        videoId: o,
                                        events: {
                                            onStateChange: function(e) {
                                                0 === e.data && n && e.target.seekTo(0)
                                            }
                                        }
                                    })
                                }
                                r.on("mediaHidden xrLaunch", (function() {
                                    e.player && (e.host === t.html5 && e.player.pause(),
                                    e.host === t.youtube && e.player.pauseVideo && e.player.pauseVideo())
                                }
                                )),
                                r.on("mediaVisible", (function() {
                                    theme.Helpers.isTouch() || e.player && (e.host === t.html5 && e.player.play(),
                                    e.host === t.youtube && e.player.playVideo && e.player.playVideo())
                                }
                                ))
                            }(this)
                        }
                    },
                    e[u].host) {
                    case t.html5:
                        window.Shopify.loadFeatures([{
                            name: "video-ui",
                            version: "1.0",
                            onLoad: r
                        }]),
                        theme.LibraryLoader.load("plyrShopifyStyles");
                        break;
                    case t.youtube:
                        theme.LibraryLoader.load("youtubeSdk", n)
                    }
            }
        },
        hosts: t,
        loadVideos: c,
        removeSectionVideos: function(t) {
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var s = e[i];
                    s.sectionId === t && (s.player && s.player.destroy(),
                    delete e[i])
                }
        }
    }
}(),
theme.ProductModel = function() {
    var e = {}
      , t = {}
      , i = {}
      , s = "[data-product-single-media-group]"
      , a = "[data-shopify-xr]";
    function r(t) {
        if (!t)
            if (window.ShopifyXR) {
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var s = e[i];
                        if (s.loaded)
                            continue;
                        var a = $("#ModelJson-" + i);
                        window.ShopifyXR.addModels(JSON.parse(a.html())),
                        s.loaded = !0
                    }
                window.ShopifyXR.setupXRElements()
            } else
                document.addEventListener("shopify_xr_initialized", (function() {
                    r()
                }
                ))
    }
    function n(e) {
        if (!e)
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    var s = t[i];
                    s.modelViewerUi || (s.modelViewerUi = new Shopify.ModelViewerUI(s.$element)),
                    o(s)
                }
    }
    function o(e) {
        var t = i[e.sectionId];
        e.$container.on("mediaVisible", (function() {
            t.$element.attr("data-shopify-model3d-id", e.modelId),
            theme.Helpers.isTouch() || e.modelViewerUi.play()
        }
        )),
        e.$container.on("mediaHidden", (function() {
            t.$element.attr("data-shopify-model3d-id", t.defaultId),
            e.modelViewerUi.pause()
        }
        )).on("xrLaunch", (function() {
            e.modelViewerUi.pause()
        }
        ))
    }
    return {
        init: function(o, c) {
            e[c] = {
                loaded: !1
            },
            o.each((function(e) {
                var r = $(this)
                  , n = r.data("media-id")
                  , o = $(r.find("model-viewer")[0])
                  , l = o.data("model-id");
                if (0 === e) {
                    var d = r.closest(s).find(a);
                    i[c] = {
                        $element: d,
                        defaultId: l
                    }
                }
                t[n] = {
                    modelId: l,
                    sectionId: c,
                    $container: r,
                    $element: o
                }
            }
            )),
            window.Shopify.loadFeatures([{
                name: "shopify-xr",
                version: "1.0",
                onLoad: r
            }, {
                name: "model-viewer-ui",
                version: "1.0",
                onLoad: n
            }]),
            theme.LibraryLoader.load("modelViewerUiStyles")
        },
        removeSectionModels: function(i) {
            for (var s in t) {
                if (t.hasOwnProperty(s))
                    t[s].sectionId === i && (t[s].modelViewerUi.destroy(),
                    delete t[s])
            }
            delete e[i]
        }
    }
}(),
window.theme = window.theme || {},
theme.FormStatus = function() {
    var e = "[data-form-status]";
    function t() {
        this.$statusMessage.removeAttr("tabindex")
    }
    return {
        init: function() {
            this.$statusMessage = $(e),
            this.$statusMessage && (this.$statusMessage.attr("tabindex", -1).focus(),
            this.$statusMessage.on("blur", t.bind(this)))
        }
    }
}(),
theme.Hero = function() {
    var e = "index-section--flush"
      , t = ".hero-fixed-width__content"
      , i = ".hero-fixed-width__image";
    return function(s, a) {
        this.$hero = $(s),
        this.layout = this.$hero.data("layout");
        var r = $("#shopify-section-" + a)
          , n = r.find(t)
          , o = r.find(i);
        function c() {
            var e = n.height() + 50;
            e > o.height() && o.css("min-height", e)
        }
        "fixed_width" === this.layout && (r.removeClass(e),
        c(),
        $(window).resize($.debounce(50, (function() {
            c()
        }
        ))))
    }
}(),
window.theme = window.theme || {},
theme.SearchResultsTemplate = function() {
    function e(e, t) {
        return 0 === e.length ? "" : ['<div class="predictive-search-title">', '<h3 id="predictive-search" class="predictive-search-title__content">' + theme.strings.products + "</h3>", '<span class="predictive-search-title__loading-spinner">' + (t ? '<span class= "icon-predictive-search-spinner" ></span >' : "") + "</span>", "</div>"].join("")
    }
    function t(e) {
        return ['<button type="submit" class="predictive-search-view-all__button" tabindex="-1">', theme.strings.searchFor + '<span class="predictive-search-view-all__query"> &ldquo;' + (t = e,
        t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;") + "&rdquo;</span>"), "</button>"].join("");
        var t
    }
    function i(e, i) {
        var r = e.length;
        return ['<ul id="predictive-search-results" class="predictive-search__list" role="listbox" aria-labelledby="predictive-search">', e.map((function(e, t) {
            return function(e, t, i) {
                return ['<li id="search-result-' + t + '" class="predictive-search-item" role="option" data-search-result>', '<a class="predictive-search-item__link" href="' + e.url + '" tabindex="-1">', '<div class="predictive-search__column predictive-search__column--image" data-image-with-placeholder-wrapper>', s(e), "</div>", '<div class="predictive-search__column predictive-search__column--content ' + (h() ? "" : "predictive-search__column--center") + '">', '<span class="predictive-search-item__title">', '<span class="predictive-search-item__title-text">' + e.title + "</span>", "</span>" + (h() ? a(e) : ""), '<span class="visually-hidden">, </span>', '<span class="visually-hidden">' + p(t + 1, i) + "</span>", "</div>", "</a>", "</li>"].join("")
            }(function(e) {
                return {
                    url: (e.variants.length > 0 ? e.variants[0] : e).url,
                    image: c(e),
                    title: e.title,
                    vendor: e.vendor || "",
                    price: theme.Currency.formatMoney(e.price_min, theme.moneyFormat),
                    compareAtPrice: theme.Currency.formatMoney(e.compare_at_price_min, theme.moneyFormat),
                    available: e.available,
                    isOnSale: l(e),
                    isPriceVaries: d(e),
                    isCompareVaries: u(e)
                }
            }(e), t, r)
        }
        )).join(""), '<li id="search-all" class="predictive-search-view-all" role="option" data-search-result>' + t(i) + "</li>", "</ul>"].join("")
    }
    function s(e) {
        return null === e.image ? "" : ['<div class="placeholder-background placeholder-background--animation" data-image-placeholder aria-hidden="true"></div>', '<img class="predictive-search-item__image lazyload" src="' + e.image.url + '" data-src="' + e.image.url + '" data-image alt="' + e.image.alt + '" />'].join("")
    }
    function a(e) {
        return ['<dl class="predictive-search-item__details price' + (e.isOnSale ? " price--on-sale" : "") + (e.available ? "" : " price--sold-out") + (!e.isPriceVaries && e.isCompareVaries ? " price--compare-price-hidden" : "") + '">', '<div class="predictive-search-item__detail">', o(e), "</div>", '<div class="predictive-search-item__detail predictive-search-item__detail--inline">' + r(e), "</div>", "</dl>"].join("")
    }
    function r(e) {
        if (!theme.settings.predictiveSearchShowPrice)
            return "";
        var t = '<div class="price__regular">' + function(e) {
            return ["<dt>", '<span class="visually-hidden">' + theme.strings.regularPrice + "</span>", "</dt>", "<dd>", '<span class="predictive-search-item__price">' + (e.isPriceVaries ? theme.strings.fromLowestPrice.replace("[price]", e.price) : e.price) + "</span>", "</dd>"].join("")
        }(e) + "</div>"
          , i = '<div class="price__sale">' + function(e) {
            return ["<dt>", '<span class="visually-hidden">' + theme.strings.salePrice + "</span>", "</dt>", "<dd>", '<span class="predictive-search-item__price predictive-search-item__price--sale">' + (e.isPriceVaries ? theme.strings.fromLowestPrice.replace("[price]", e.price) : e.price) + "</span>", "</dd>", '<div class="price__compare">' + n(e) + "</div>"].join("")
        }(e) + "</div>";
        return '<span class="visually-hidden">, </span><div class="price__pricing-group">' + (e.isOnSale ? i : t) + "</div>"
    }
    function n(e) {
        return ["<dt>", '<span class="visually-hidden">' + theme.strings.regularPrice + "</span> ", "</dt>", "<dd>", '<span class="predictive-search-item__price predictive-search-item__price--compare">' + e.compareAtPrice + "</span>", "</dd>"].join("")
    }
    function o(e) {
        return theme.settings.predictiveSearchShowVendor && "" !== e.vendor ? ["<dt>", '<span class="visually-hidden">' + theme.strings.vendor + "</span>", "</dt>", '<dd class="predictive-search-item__vendor">' + e.vendor + "</dd>"].join("") : ""
    }
    function c(e) {
        var t, i;
        return e.variants.length > 0 && null !== e.variants[0].image ? i = e.variants[0].featured_image : e.image ? i = e.featured_image : t = null,
        null !== t && (t = {
            url: theme.Images.getSizedImageUrl(i.url, "100x"),
            alt: i.alt
        }),
        t
    }
    function l(e) {
        return null !== e.compare_at_price_min && parseInt(e.compare_at_price_min, 10) > parseInt(e.price_min, 10)
    }
    function d(e) {
        return e.price_max !== e.price_min
    }
    function u(e) {
        return e.compare_at_price_max !== e.compare_at_price_min
    }
    function h() {
        return [theme.settings.predictiveSearchShowPrice, theme.settings.predictiveSearchShowVendor].reduce((function(e, t) {
            return e + (t ? 1 : 0)
        }
        ), 0)
    }
    function p(e, t) {
        return theme.strings.number_of_results.replace("[result_number]", e).replace("[results_count]", t)
    }
    return function(t) {
        var s = t.products || []
          , a = t.isLoading
          , r = t.searchQuery || "";
        return a && 0 === s.length ? ['<div class="predictive-search">', '<div class="predictive-search-loading">', '<span class="visually-hidden">' + theme.strings.loading + "</span>", '<span class="predictive-search-loading__icon">', '<span class="icon-predictive-search-spinner"></span>', "</span>", "</div>", "</div>"].join("") : function(t, s, a) {
            return ['<div class="predictive-search">', e(t, s), i(t, a), "</div>"].join("")
        }(s, a, r)
    }
}(),
window.theme = window.theme || {},
function() {
    function e(e) {
        return 1 === e.products.length ? theme.strings.one_result_found : theme.strings.number_of_results_found.replace("[results_count]", e.products.length)
    }
    function t() {
        return theme.strings.loading
    }
    function i() {
        return JSON.parse($("#shopify-features").text()).predictiveSearch && window.theme.settings.predictiveSearchEnabled
    }
    function s(e, t) {
        t.addEventListener("click", a.bind(this, e))
    }
    function a(e, t) {
        0 === e.value.trim().length && (void 0 !== t && t.preventDefault(),
        e.focus())
    }
    var r, n, o, c, l, d, u;
    window.theme.SearchPage = (n = "[data-search-page-predictive-search-clear]",
    o = "[data-search-page-predictive-search-input]",
    c = "[data-search-page-predictive-search-submit]",
    l = '[data-predictive-search-mount="default"]',
    d = document.querySelector(o),
    u = document.querySelector(c),
    {
        init: function(i) {
            r = new window.Shopify.theme.PredictiveSearchComponent({
                selectors: {
                    input: o,
                    reset: n,
                    result: l
                },
                resultTemplateFct: window.theme.SearchResultsTemplate,
                numberOfResultsTemplateFct: e,
                loadingResultsMessageTemplateFct: t,
                onOpen: function(e) {
                    if (!i.isTabletAndUp) {
                        var t = $(o)[0].getBoundingClientRect()
                          , s = $("body").height() - t.bottom - 50;
                        $(e.result).css({
                            maxHeight: s
                        })
                    }
                },
                onBeforeDestroy: function(e) {
                    $(e.result).css({
                        maxHeight: ""
                    })
                }
            }),
            s(d, u)
        },
        unload: function() {
            r && (r.destroy(),
            r = null)
        }
    }),
    window.theme.SearchHeader = function() {
        var i, a = "[data-predictive-search-drawer-input]", r = '[data-predictive-search-mount="drawer"]', n = "[data-search-form-submit]", o = document.querySelector(a), c = document.querySelector(n);
        return {
            init: function(n) {
                i = new window.Shopify.theme.PredictiveSearchComponent({
                    selectors: {
                        input: a,
                        result: r
                    },
                    resultTemplateFct: window.theme.SearchResultsTemplate,
                    numberOfResultsTemplateFct: e,
                    numberOfResults: n.numberOfResults,
                    loadingResultsMessageTemplateFct: t,
                    onInputBlur: function() {
                        return !1
                    },
                    onOpen: function(e) {
                        var t = $(o)[0].getBoundingClientRect()
                          , i = window.innerHeight - t.bottom - (n.isTabletAndUp ? 20 : 0);
                        $(e.result).css({
                            top: n.isTabletAndUp ? "" : t.bottom,
                            maxHeight: i
                        })
                    },
                    onClose: function(e) {
                        $(e.result).css({
                            maxHeight: ""
                        })
                    },
                    onBeforeDestroy: function(e) {
                        $(e.result).css({
                            top: ""
                        })
                    }
                }),
                s(o, c)
            },
            unload: function() {
                i && (i.destroy(),
                i = null)
            },
            clearAndClose: function() {
                i && i.clearAndClose()
            }
        }
    }(),
    window.theme.Search = function() {
        var e = "template-search"
          , t = ".site-header"
          , s = {
            mobile: window.matchMedia("(max-width: 749px)"),
            tabletAndUp: window.matchMedia("(min-width: 750px)")
        };
        function a() {
            theme.SearchDrawer.close(),
            theme.SearchHeader.unload(),
            theme.SearchPage.unload(),
            s.mobile.matches ? (theme.SearchHeader.init({
                numberOfResults: 4,
                isTabletAndUp: !1
            }),
            r() && theme.SearchPage.init({
                isTabletAndUp: !1
            })) : (theme.SearchHeader.init({
                numberOfResults: 4,
                isTabletAndUp: !0
            }),
            r() && theme.SearchPage.init({
                isTabletAndUp: !0
            }))
        }
        function r() {
            return $("body").hasClass(e)
        }
        return {
            init: function() {
                $(t).length && i() && (Object.keys(s).forEach((function(e) {
                    s[e].addListener(a)
                }
                )),
                a())
            },
            unload: function() {
                theme.SearchHeader.unload(),
                theme.SearchPage.unload()
            }
        }
    }()
}(),
window.theme = window.theme || {},
theme.SearchDrawer = function() {
    var e, t = "[data-header-section]", i = "[data-predictive-search-drawer]", s = "[data-predictive-search-open-drawer]", a = "[data-predictive-search-drawer-input]", r = '[data-predictive-search-mount="drawer"]';
    return {
        init: function() {
            $(s).attr("aria-controls", "SearchDrawer").attr("aria-expanded", "false").attr("aria-haspopup", "dialog"),
            e = new theme.Drawers("SearchDrawer","top",{
                onDrawerOpen: function() {
                    $(i).css({
                        height: $(t).outerHeight()
                    }),
                    theme.MobileNav.closeMobileNav(),
                    window.bodyScrollLock.disableBodyScroll(document.querySelector(r), {
                        allowTouchMove: function(e) {
                            return 1 === $(e).parents(r).length
                        }
                    })
                },
                onDrawerClose: function() {
                    theme.SearchHeader.clearAndClose(),
                    $(s).focus(),
                    window.bodyScrollLock.clearAllBodyScrollLocks()
                },
                withPredictiveSearch: !0,
                $elementToFocusOnOpen: $(a)
            })
        },
        close: function() {
            e.close()
        }
    }
}(),
theme.Disclosure = function() {
    var e = "[data-disclosure-list]"
      , t = "[data-disclosure-toggle]"
      , i = "[data-disclosure-input]"
      , s = "[data-disclosure-option]"
      , a = "disclosure-list--visible";
    function r(e) {
        this.$container = e,
        this.cache = {},
        this._cacheSelectors(),
        this._connectOptions(),
        this._connectToggle(),
        this._onFocusOut()
    }
    return r.prototype = _.assignIn({}, r.prototype, {
        _cacheSelectors: function() {
            this.cache = {
                $disclosureList: this.$container.find(e),
                $disclosureToggle: this.$container.find(t),
                $disclosureInput: this.$container.find(i),
                $disclosureOptions: this.$container.find(s)
            }
        },
        _connectToggle: function() {
            this.cache.$disclosureToggle.on("click", function(e) {
                var t = "true" === $(e.currentTarget).attr("aria-expanded");
                $(e.currentTarget).attr("aria-expanded", !t),
                this.cache.$disclosureList.toggleClass(a)
            }
            .bind(this))
        },
        _connectOptions: function() {
            this.cache.$disclosureOptions.on("click", function(e) {
                this._submitForm($(e.currentTarget).data("value"))
            }
            .bind(this))
        },
        _onFocusOut: function() {
            this.cache.$disclosureToggle.on("focusout", function(e) {
                0 === this.$container.has(e.relatedTarget).length && this._hideList()
            }
            .bind(this)),
            this.cache.$disclosureList.on("focusout", function(e) {
                var t = $(e.currentTarget).has(e.relatedTarget).length > 0;
                this.cache.$disclosureList.hasClass(a) && !t && this._hideList()
            }
            .bind(this)),
            this.$container.on("keyup", function(e) {
                e.which === slate.utils.keyboardKeys.ESCAPE && (this._hideList(),
                this.cache.$disclosureToggle.focus())
            }
            .bind(this)),
            $("body").on("click", function(e) {
                var t = this.$container.has(e.target).length > 0;
                this.cache.$disclosureList.hasClass(a) && !t && this._hideList()
            }
            .bind(this))
        },
        _submitForm: function(e) {
            this.cache.$disclosureInput.val(e),
            this.$container.parents("form").submit()
        },
        _hideList: function() {
            this.cache.$disclosureList.removeClass(a),
            this.cache.$disclosureToggle.attr("aria-expanded", !1)
        },
        unload: function() {
            this.cache.$disclosureOptions.off(),
            this.cache.$disclosureToggle.off(),
            this.cache.$disclosureList.off(),
            this.$container.off()
        }
    }),
    r
}(),
function() {
    var e = $("#BlogTagFilter");
    e.length && (slate.utils.resizeSelects(e),
    e.on("change", (function() {
        location.href = $(this).val()
    }
    )))
}(),
window.theme = theme || {},
theme.customerTemplates = function() {
    var e = "#RecoverHeading"
      , t = "#RecoverEmail"
      , i = "#LoginHeading";
    function s() {
        this.$RecoverHeading = $(e),
        this.$RecoverEmail = $(t),
        this.$LoginHeading = $(i),
        $("#RecoverPassword").on("click", function(e) {
            e.preventDefault(),
            a(),
            this.$RecoverHeading.attr("tabindex", "-1").focus()
        }
        .bind(this)),
        $("#HideRecoverPasswordLink").on("click", function(e) {
            e.preventDefault(),
            $("#RecoverPasswordForm").addClass("hide"),
            $("#CustomerLoginForm").removeClass("hide"),
            this.$LoginHeading.attr("tabindex", "-1").focus()
        }
        .bind(this)),
        this.$RecoverHeading.on("blur", (function() {
            $(this).removeAttr("tabindex")
        }
        )),
        this.$LoginHeading.on("blur", (function() {
            $(this).removeAttr("tabindex")
        }
        ))
    }
    function a() {
        $("#RecoverPasswordForm").removeClass("hide"),
        $("#CustomerLoginForm").addClass("hide"),
        "true" === this.$RecoverEmail.attr("aria-invalid") && this.$RecoverEmail.focus()
    }
    return {
        init: function() {
            var e, t;
            s(),
            function() {
                "#recover" === window.location.hash && a.bind(this)()
            }(),
            $(".reset-password-success").length && $("#ResetSuccess").removeClass("hide").focus(),
            e = $("#AddressNewForm"),
            t = $("#AddressNewButton"),
            e.length && (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew","AddressProvinceNew",{
                hideElement: "AddressProvinceContainerNew"
            }),
            $(".address-country-option").each((function() {
                var e = $(this).data("form-id")
                  , t = "AddressCountry_" + e
                  , i = "AddressProvince_" + e
                  , s = "AddressProvinceContainer_" + e;
                new Shopify.CountryProvinceSelector(t,i,{
                    hideElement: s
                })
            }
            )),
            $(".address-new-toggle").on("click", (function() {
                var i = "true" === t.attr("aria-expanded");
                e.toggleClass("hide"),
                t.attr("aria-expanded", !i).focus()
            }
            )),
            $(".address-edit-toggle").on("click", (function() {
                var e = $(this).data("form-id")
                  , t = $("#EditFormButton_" + e)
                  , i = $("#EditAddress_" + e)
                  , s = "true" === t.attr("aria-expanded");
                i.toggleClass("hide"),
                t.attr("aria-expanded", !s).focus()
            }
            )),
            $(".address-delete").on("click", (function() {
                var e = $(this)
                  , t = e.data("target")
                  , i = e.data("confirm-message");
                confirm(i || "Are you sure you wish to delete this address?") && Shopify.postLink(t, {
                    parameters: {
                        _method: "delete"
                    }
                })
            }
            )))
        }
    }
}(),
window.theme = window.theme || {},
theme.Cart = function() {
    var e = "[data-cart-count]"
      , t = "[data-cart-count-bubble]"
      , i = "[data-cart-discount]"
      , s = "[data-cart-discount-title]"
      , a = "[data-cart-discount-amount]"
      , r = "[data-cart-discount-wrapper]"
      , n = "[data-cart-error-message]"
      , o = "[data-cart-error-message-wrapper]"
      , c = "[data-cart-item]"
      , l = "[data-cart-item-details]"
      , d = "[data-cart-item-discount]"
      , u = "[data-cart-item-discounted-price-group]"
      , h = "[data-cart-item-discount-title]"
      , p = "[data-cart-item-discount-amount]"
      , m = "[data-cart-item-discount-list]"
      , f = "[data-cart-item-final-price]"
      , v = "[data-cart-item-image]"
      , g = "[data-cart-item-line-price]"
      , y = "[data-cart-item-original-price]"
      , b = "[data-cart-item-price]"
      , w = "[data-cart-item-price-list]"
      , C = "[data-cart-item-property]"
      , S = "[data-cart-item-property-name]"
      , k = "[data-cart-item-property-value]"
      , T = "[data-cart-item-regular-price-group]"
      , P = "[data-cart-item-regular-price]"
      , I = "[data-cart-item-title]"
      , E = "[data-cart-item-option]"
      , x = "[data-cart-line-items]"
      , L = "[data-cart-notes]"
      , A = "[data-cart-quantity-error-message]"
      , M = "[data-cart-quantity-error-message-wrapper]"
      , O = "[data-cart-remove]"
      , D = "[data-cart-status]"
      , F = "[data-cart-subtotal]"
      , R = "[data-cart-table-cell]"
      , V = "[data-cart-wrapper]"
      , N = "[data-empty-page-content]"
      , B = "[data-quantity-input]"
      , W = "[data-quantity-input-mobile]"
      , q = "[data-quantity-input-desktop]"
      , H = "[data-quantity-label-mobile]"
      , U = "[data-quantity-label-desktop]"
      , j = "[data-quantity-input]"
      , Q = ".cart__image"
      , z = "[data-unit-price]"
      , K = "[data-unit-price-base-unit]"
      , Y = "[data-unit-price-group]"
      , J = "cart--no-cookies"
      , G = "cart__removed-product"
      , X = "hide"
      , Z = "input--error"
      , ee = "data-cart-item-index"
      , te = "data-cart-item-key"
      , ie = "data-cart-item-quantity"
      , se = "data-cart-item-title"
      , ae = "data-cart-item-url"
      , re = "data-quantity-item";
    theme.breakpoints = theme.breakpoints || {},
    (isNaN(theme.breakpoints.medium) || void 0 === theme.breakpoints.medium) && (theme.breakpoints.medium = 750);
    var ne = "(min-width: " + theme.breakpoints.medium + "px)";
    function oe(e) {
        this.$container = $(e),
        this.$thumbnails = $(Q, this.$container),
        this.ajaxEnabled = this.$container.data("ajax-enabled"),
        this.cookiesEnabled() || this.$container.addClass(J),
        this.$thumbnails.css("cursor", "pointer"),
        this.$container.on("click", Q, this._handleThumbnailClick),
        this.$container.on("change", j, $.debounce(500, this._handleInputQty.bind(this))),
        this.mql = window.matchMedia(ne),
        this.mql.addListener(this.setQuantityFormControllers.bind(this)),
        this.setQuantityFormControllers(),
        this.ajaxEnabled && (this.$container.on("change", L, this._onNoteChange.bind(this)),
        this.$container.on("click", O, this._onRemoveItem.bind(this)),
        this._setupCartTemplates())
    }
    return oe.prototype = _.assignIn({}, oe.prototype, {
        _setupCartTemplates: function() {
            this.$itemTemplate = $(c, this.$container).first().clone(),
            this.$itemDiscountTemplate = $(d, this.$itemTemplate).clone(),
            this.$itemOptionTemplate = $(E, this.$itemTemplate).clone(),
            this.$itemPropertyTemplate = $(C, this.$itemTemplate).clone(),
            this.$itemPriceListTemplate = $(w, this.$itemTemplate).clone(),
            this.$itemLinePriceTemplate = $(g, this.$itemTemplate).clone(),
            this.$cartDiscountTemplate = $(i, this.$container).clone()
        },
        _handleInputQty: function(e) {
            var t = $(e.target)
              , i = t.data("quantity-item")
              , s = t.closest(c)
              , a = $("[data-quantity-item=" + i + "]")
              , r = parseInt(t.val())
              , n = !(r < 0 || isNaN(r));
            a.val(r),
            this._hideCartError(),
            this._hideQuantityErrorMessage(),
            n ? n && this.ajaxEnabled && this._updateItemQuantity(i, s, a, r) : this._showQuantityErrorMessages(s)
        },
        _updateItemQuantity: function(e, t, i, s) {
            var a = t.attr(te)
              , r = t.attr(ee)
              , n = {
                url: "/cart/change.js",
                data: {
                    quantity: s,
                    line: r
                },
                dataType: "json"
            };
            $.post(n).done(function(e) {
                if (0 === e.item_count)
                    this._emptyCart();
                else if (this._createCart(e),
                0 === s)
                    this._showRemoveMessage(t.clone());
                else {
                    var i = $('[data-cart-item-key="' + a + '"]')
                      , r = this.getItem(a, e);
                    $(B, i).focus(),
                    this._updateLiveRegion(r)
                }
                this._setCartCountBubble(e.item_count)
            }
            .bind(this)).fail(function() {
                this._showCartError(i)
            }
            .bind(this))
        },
        getItem: function(e, t) {
            return t.items.find((function(t) {
                return t.key === e
            }
            ))
        },
        _liveRegionText: function(e) {
            var t = theme.strings.update + ": [QuantityLabel]: [Quantity], [Regular] [$$] [DiscountedPrice] [$]. [PriceInformation]";
            t = t.replace("[QuantityLabel]", theme.strings.quantity).replace("[Quantity]", e.quantity);
            var i = ""
              , s = theme.Currency.formatMoney(e.original_line_price, theme.moneyFormat)
              , a = ""
              , r = ""
              , n = "";
            return e.original_line_price > e.final_line_price && (i = theme.strings.regularTotal,
            a = theme.strings.discountedTotal,
            r = theme.Currency.formatMoney(e.final_line_price, theme.moneyFormat),
            n = theme.strings.priceColumn),
            t = t.replace("[Regular]", i).replace("[$$]", s).replace("[DiscountedPrice]", a).replace("[$]", r).replace("[PriceInformation]", n).trim()
        },
        _updateLiveRegion: function(e) {
            var t = $(D);
            t.html(this._liveRegionText(e)).attr("aria-hidden", !1),
            setTimeout((function() {
                t.attr("aria-hidden", !0)
            }
            ), 1e3)
        },
        _createCart: function(e) {
            var t = this._createCartDiscountList(e);
            $(x, this.$container).html(this._createLineItemList(e)),
            this.setQuantityFormControllers(),
            $(L, this.$container).val(e.note),
            0 === t.length ? $(r, this.$container).html("").addClass(X) : $(r, this.$container).html(t).removeClass(X),
            $(F, this.$container).html(theme.Currency.formatMoney(e.total_price, theme.moneyFormatWithCurrency))
        },
        _createCartDiscountList: function(e) {
            return $.map(e.cart_level_discount_applications, function(e) {
                var t = this.$cartDiscountTemplate.clone();
                return t.find(s).text(e.title),
                t.find(a).html(theme.Currency.formatMoney(e.total_allocated_amount, theme.moneyFormat)),
                t[0]
            }
            .bind(this))
        },
        _createLineItemList: function(e) {
            return $.map(e.items, function(e, t) {
                var i = this.$itemTemplate.clone()
                  , s = this.$itemPriceListTemplate.clone();
                this._setLineItemAttributes(i, e, t),
                this._setLineItemImage(i, e.featured_image),
                $(I, i).text(e.product_title).attr("href", e.url);
                var a = this._createProductDetailsList(e.product_has_only_default_variant, e.options_with_values, e.properties);
                this._setProductDetailsList(i, a),
                this._setItemRemove(i, e.title),
                s.html(this._createItemPrice(e.original_price, e.final_price, this.$itemPriceListTemplate)),
                e.unit_price_measurement && s.append(this._createUnitPrice(e.unit_price, e.unit_price_measurement, this.$itemPriceListTemplate)),
                this._setItemPrice(i, s);
                var r = this._createItemDiscountList(e);
                this._setItemDiscountList(i, r),
                this._setQuantityInputs(i, e, t);
                var n = this._createItemPrice(e.original_line_price, e.final_line_price, this.$itemLinePriceTemplate);
                return this._setItemLinePrice(i, n),
                i[0]
            }
            .bind(this))
        },
        _setLineItemAttributes: function(e, t, i) {
            e.attr(te, t.key).attr(ae, t.url).attr(se, t.title).attr(ee, i + 1).attr(ie, t.quantity)
        },
        _setLineItemImage: function(e, t) {
            var i = $(v, e)
              , s = null !== t.url ? theme.Images.getSizedImageUrl(t.url, "x190") : null;
            s ? i.attr("alt", t.alt).attr("src", s).removeClass(X) : i.remove()
        },
        _setProductDetailsList: function(e, t) {
            var i = $(l, e);
            0 === t.length ? i.addClass(X).text("") : i.removeClass(X).html(t)
        },
        _setItemPrice: function(e, t) {
            $(b, e).html(t)
        },
        _setItemDiscountList: function(e, t) {
            var i = $(m, e);
            0 === t.length ? i.html("").addClass(X) : i.html(t).removeClass(X)
        },
        _setItemRemove: function(e, t) {
            $(O, e).attr("aria-label", theme.strings.removeLabel.replace("[product]", t))
        },
        _setQuantityInputs: function(e, t, i) {
            $(W, e).attr("id", "updates_" + t.key).attr(re, i + 1).val(t.quantity),
            $(q, e).attr("id", "updates_large_" + t.key).attr(re, i + 1).val(t.quantity),
            $(H, e).attr("for", "updates_" + t.key),
            $(U, e).attr("for", "updates_large_" + t.key)
        },
        setQuantityFormControllers: function() {
            this.mql.matches ? ($(q).attr("name", "updates[]"),
            $(W).removeAttr("name")) : ($(W).attr("name", "updates[]"),
            $(q).removeAttr("name"))
        },
        _setItemLinePrice: function(e, t) {
            $(g, e).html(t)
        },
        _createProductDetailsList: function(e, t, i) {
            var s = [];
            return e || (s = s.concat(this._getOptionList(t))),
            null !== i && 0 !== Object.keys(i).length && (s = s.concat(this._getPropertyList(i))),
            s
        },
        _getOptionList: function(e) {
            return $.map(e, function(e) {
                var t = this.$itemOptionTemplate.clone();
                return t.text(e.name + ": " + e.value).removeClass(X),
                t[0]
            }
            .bind(this))
        },
        _getPropertyList: function(e) {
            var t = null !== e ? Object.entries(e) : [];
            return $.map(t, function(e) {
                var t = this.$itemPropertyTemplate.clone();
                if ("_" !== e[0].charAt(0) && 0 !== e[1].length)
                    return t.find(S).text(e[0]),
                    -1 === e[0].indexOf("/uploads/") ? t.find(k).text(": " + e[1]) : t.find(k).html(': <a href="' + e[1] + '"> ' + e[1].split("/").pop() + "</a>"),
                    t.removeClass(X),
                    t[0]
            }
            .bind(this))
        },
        _createItemPrice: function(e, t, i) {
            if (e !== t) {
                var s = $(u, i).clone();
                return $(y, s).html(theme.Currency.formatMoney(e, theme.moneyFormat)),
                $(f, s).html(theme.Currency.formatMoney(t, theme.moneyFormat)),
                s.removeClass(X),
                s[0]
            }
            var a = $(T, i).clone();
            return $(P, a).html(theme.Currency.formatMoney(e, theme.moneyFormat)),
            a.removeClass(X),
            a[0]
        },
        _createUnitPrice: function(e, t, i) {
            var s = $(Y, i).clone()
              , a = (1 !== t.reference_value ? t.reference_value : "") + t.reference_unit;
            return $(K, s).text(a),
            $(z, s).html(theme.Currency.formatMoney(e, theme.moneyFormat)),
            s.removeClass(X),
            s[0]
        },
        _createItemDiscountList: function(e) {
            return $.map(e.line_level_discount_allocations, function(e) {
                var t = this.$itemDiscountTemplate.clone();
                return t.find(h).text(e.discount_application.title),
                t.find(p).html(theme.Currency.formatMoney(e.amount, theme.moneyFormat)),
                t[0]
            }
            .bind(this))
        },
        _showQuantityErrorMessages: function(e) {
            $(A, e).text(theme.strings.quantityMinimumMessage),
            $(M, e).removeClass(X),
            $(j, e).addClass(Z).focus()
        },
        _hideQuantityErrorMessage: function() {
            var e = $(M).addClass(X);
            $(A, e).text(""),
            $(j, this.$container).removeClass(Z)
        },
        _handleThumbnailClick: function(e) {
            var t = $(e.target).closest(c).data("cart-item-url");
            window.location.href = t
        },
        _onNoteChange: function(e) {
            var t = e.currentTarget.value;
            this._hideCartError(),
            this._hideQuantityErrorMessage();
            var i = {
                url: "/cart/update.js",
                data: {
                    note: t
                },
                dataType: "json"
            };
            $.post(i).fail(function() {
                this._showCartError(e.currentTarget)
            }
            .bind(this))
        },
        _showCartError: function(e) {
            $(n).text(theme.strings.cartError),
            $(o).removeClass(X),
            e.focus()
        },
        _hideCartError: function() {
            $(o).addClass(X),
            $(n).text("")
        },
        _onRemoveItem: function(e) {
            e.preventDefault();
            var t = $(e.target).closest(c)
              , i = t.attr(ee);
            this._hideCartError();
            var s = {
                url: "/cart/change.js",
                data: {
                    quantity: 0,
                    line: i
                },
                dataType: "json"
            };
            $.post(s).done(function(e) {
                0 === e.item_count ? this._emptyCart() : (this._createCart(e),
                this._showRemoveMessage(t.clone())),
                this._setCartCountBubble(e.item_count)
            }
            .bind(this)).fail(function() {
                this._showCartError(null)
            }
            .bind(this))
        },
        _showRemoveMessage: function(e) {
            var t, i = e.data("cart-item-index"), s = this._getRemoveMessage(e);
            i - 1 == 0 ? (t = $('[data-cart-item-index="1"]', this.$container),
            $(s).insertBefore(t)) : (t = $('[data-cart-item-index="' + (i - 1) + '"]', this.$container),
            s.insertAfter(t)),
            s.focus()
        },
        _getRemoveMessage: function(e) {
            var t = this._formatRemoveMessage(e)
              , i = $(R, e).clone();
            return i.removeClass().addClass(G).attr("colspan", "4").html(t),
            e.attr("role", "alert").html(i).attr("tabindex", "-1"),
            e
        },
        _formatRemoveMessage: function(e) {
            var t = e.data("cart-item-quantity")
              , i = e.attr(ae)
              , s = e.attr(se);
            return theme.strings.removedItemMessage.replace("[quantity]", t).replace("[link]", '<a href="' + i + '" class="text-link text-link--accent">' + s + "</a>")
        },
        _setCartCountBubble: function(i) {
            this.$cartCountBubble = this.$cartCountBubble || $(t),
            this.$cartCount = this.$cartCount || $(e),
            i > 0 ? (this.$cartCountBubble.removeClass(X),
            this.$cartCount.html(i)) : (this.$cartCountBubble.addClass(X),
            this.$cartCount.html(""))
        },
        _emptyCart: function() {
            this.$emptyPageContent = this.$emptyPageContent || $(N, this.$container),
            this.$cartWrapper = this.$cartWrapper || $(V, this.$container),
            this.$emptyPageContent.removeClass(X),
            this.$cartWrapper.addClass(X)
        },
        cookiesEnabled: function() {
            var e = navigator.cookieEnabled;
            return e || (document.cookie = "testcookie",
            e = -1 !== document.cookie.indexOf("testcookie")),
            e
        }
    }),
    oe
}(),
window.theme = window.theme || {},
theme.Filters = function() {
    var e = "screen and (min-width: 750px)"
      , t = "#FilterTags"
      , i = "#SortBy"
      , s = "data-default-sortby";
    function a(e) {
        var s = this.$container = $(e);
        this.$filterSelect = $(t, s),
        this.$sortSelect = $(i, s),
        this.$selects = $(t, s).add($(i, s)),
        this.defaultSort = this._getDefaultSortValue(),
        this.$selects.removeClass("hidden"),
        this.$filterSelect.on("change", this._onFilterChange.bind(this)),
        this.$sortSelect.on("change", this._onSortChange.bind(this)),
        this._initBreakpoints(),
        this._initParams()
    }
    return a.prototype = _.assignIn({}, a.prototype, {
        _initBreakpoints: function() {
            var t = this;
            enquire.register(e, {
                match: function() {
                    slate.utils.resizeSelects(t.$selects)
                }
            })
        },
        _initParams: function() {
            if (self.queryParams = {},
            location.search.length)
                for (var e, t = location.search.substr(1).split("&"), i = 0; i < t.length; i++)
                    (e = t[i].split("=")).length > 1 && (self.queryParams[decodeURIComponent(e[0])] = decodeURIComponent(e[1]))
        },
        _onSortChange: function() {
            self.queryParams.sort_by = this._getSortValue(),
            self.queryParams.page && delete self.queryParams.page,
            window.location.search = decodeURIComponent($.param(self.queryParams))
        },
        _onFilterChange: function() {
            document.location.href = this._getFilterValue()
        },
        _getFilterValue: function() {
            return this.$filterSelect.val()
        },
        _getSortValue: function() {
            return this.$sortSelect.val() || this.defaultSort
        },
        _getDefaultSortValue: function() {
            return this.$sortSelect.attr(s)
        },
        onUnload: function() {
            this.$filterSelect.off("change", this._onFilterChange),
            this.$sortSelect.off("change", this._onSortChange)
        }
    }),
    a
}(),
window.theme = window.theme || {},
theme.HeaderSection = function() {
    function e() {
        theme.Header.init(),
        theme.MobileNav.init(),
        theme.SearchDrawer.init(),
        theme.Search.init()
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        onUnload: function() {
            theme.Header.unload(),
            theme.Search.unload()
        }
    }),
    e
}(),
theme.Maps = function() {
    var e = 14
      , t = null
      , i = []
      , s = {
        addressNoResults: theme.strings.addressNoResults,
        addressQueryLimit: theme.strings.addressQueryLimit,
        addressError: theme.strings.addressError,
        authError: theme.strings.authError
    }
      , a = '[data-section-type="map"]'
      , r = "[data-map]"
      , n = "[data-map-overlay]"
      , o = "map-section--load-error"
      , c = "map-section__error errors text-center";
    function l(e) {
        this.$container = $(e),
        this.$map = this.$container.find(r),
        this.key = this.$map.data("api-key"),
        void 0 !== this.key && ("loaded" === t ? this.createMap() : (i.push(this),
        "loading" !== t && (t = "loading",
        void 0 === window.google && $.getScript("https://maps.googleapis.com/maps/api/js?key=" + this.key).then((function() {
            t = "loaded",
            $.each(i, (function(e, t) {
                t.createMap()
            }
            ))
        }
        )))))
    }
    return window.gm_authFailure = function() {
        Shopify.designMode && ($(a).addClass(o),
        $(r).remove(),
        $(n).after('<div class="' + c + '">' + theme.strings.authError + "</div>"))
    }
    ,
    l.prototype = _.assignIn({}, l.prototype, {
        createMap: function() {
            var t = this.$map;
            return function(e) {
                var t = $.Deferred()
                  , i = new google.maps.Geocoder
                  , s = e.data("address-setting");
                return i.geocode({
                    address: s
                }, (function(e, i) {
                    i !== google.maps.GeocoderStatus.OK && t.reject(i),
                    t.resolve(e)
                }
                )),
                t
            }(t).then(function(i) {
                var s = {
                    zoom: e,
                    center: i[0].geometry.location,
                    draggable: !1,
                    clickableIcons: !1,
                    scrollwheel: !1,
                    disableDoubleClickZoom: !0,
                    disableDefaultUI: !0
                }
                  , a = this.map = new google.maps.Map(t[0],s)
                  , r = this.center = a.getCenter();
                new google.maps.Marker({
                    map: a,
                    position: a.getCenter()
                });
                google.maps.event.addDomListener(window, "resize", $.debounce(250, (function() {
                    google.maps.event.trigger(a, "resize"),
                    a.setCenter(r),
                    t.removeAttr("style")
                }
                )))
            }
            .bind(this)).fail((function() {
                var e;
                switch (status) {
                case "ZERO_RESULTS":
                    e = s.addressNoResults;
                    break;
                case "OVER_QUERY_LIMIT":
                    e = s.addressQueryLimit;
                    break;
                case "REQUEST_DENIED":
                    e = s.authError;
                    break;
                default:
                    e = s.addressError
                }
                Shopify.designMode && t.parent().addClass(o).html('<div class="' + c + '">' + e + "</div>")
            }
            ))
        },
        onUnload: function() {
            0 !== this.$map.length && google.maps.event.clearListeners(this.map, "resize")
        }
    }),
    l
}(),
theme.Product = function() {
    function e(e) {
        var t = this.$container = $(e)
          , i = t.attr("data-section-id");
        this.ajaxEnabled = t.data("ajax-enabled"),
        this.settings = {
            mediaQueryMediumUp: "screen and (min-width: 750px)",
            mediaQuerySmall: "screen and (max-width: 749px)",
            bpSmall: !1,
            enableHistoryState: t.data("enable-history-state") || !1,
            namespace: ".slideshow-" + i,
            sectionId: i,
            sliderActive: !1,
            zoomEnabled: !1
        },
        this.selectors = {
            addToCart: "[data-add-to-cart]",
            addToCartText: "[data-add-to-cart-text]",
            cartCount: "[data-cart-count]",
            cartCountBubble: "[data-cart-count-bubble]",
            cartPopup: "[data-cart-popup]",
            cartPopupCartQuantity: "[data-cart-popup-cart-quantity]",
            cartPopupClose: "[data-cart-popup-close]",
            cartPopupDismiss: "[data-cart-popup-dismiss]",
            cartPopupImage: "[data-cart-popup-image]",
            cartPopupImageWrapper: "[data-cart-popup-image-wrapper]",
            cartPopupImagePlaceholder: "[data-cart-popup-image-placeholder]",
            cartPopupPlaceholderSize: "[data-placeholder-size]",
            cartPopupProductDetails: "[data-cart-popup-product-details]",
            cartPopupQuantity: "[data-cart-popup-quantity]",
            cartPopupQuantityLabel: "[data-cart-popup-quantity-label]",
            cartPopupTitle: "[data-cart-popup-title]",
            cartPopupWrapper: "[data-cart-popup-wrapper]",
            loader: "[data-loader]",
            loaderStatus: "[data-loader-status]",
            quantity: "[data-quantity-input]",
            SKU: ".variant-sku",
            productStatus: "[data-product-status]",
            originalSelectorId: "#ProductSelect-" + i,
            productForm: "[data-product-form]",
            errorMessage: "[data-error-message]",
            errorMessageWrapper: "[data-error-message-wrapper]",
            imageZoomWrapper: "[data-image-zoom-wrapper]",
            productMediaWrapper: "[data-product-single-media-wrapper]",
            productThumbImages: ".product-single__thumbnail--" + i,
            productThumbs: ".product-single__thumbnails-" + i,
            productThumbListItem: ".product-single__thumbnails-item",
            productThumbsWrapper: ".thumbnails-wrapper",
            saleLabel: ".product-price__sale-label-" + i,
            singleOptionSelector: ".single-option-selector-" + i,
            shopifyPaymentButton: ".shopify-payment-button",
            productMediaTypeVideo: "[data-product-media-type-video]",
            productMediaTypeModel: "[data-product-media-type-model]",
            priceContainer: "[data-price]",
            regularPrice: "[data-regular-price]",
            salePrice: "[data-sale-price]",
            unitPrice: "[data-unit-price]",
            unitPriceBaseUnit: "[data-unit-price-base-unit]",
            productPolicies: "[data-product-policies]"
        },
        this.classes = {
            cartPopupWrapperHidden: "cart-popup-wrapper--hidden",
            hidden: "hide",
            visibilityHidden: "visibility-hidden",
            inputError: "input--error",
            jsZoomEnabled: "js-zoom-enabled",
            productOnSale: "price--on-sale",
            productUnitAvailable: "price--unit-available",
            productUnavailable: "price--unavailable",
            productSoldOut: "price--sold-out",
            cartImage: "cart-popup-item__image",
            productFormErrorMessageWrapperHidden: "product-form__error-message-wrapper--hidden",
            activeClass: "active-thumb",
            variantSoldOut: "product-form--variant-sold-out"
        },
        this.$quantityInput = $(this.selectors.quantity, t),
        this.$errorMessageWrapper = $(this.selectors.errorMessageWrapper, t),
        this.$addToCart = $(this.selectors.addToCart, t),
        this.$addToCartText = $(this.selectors.addToCartText, this.$addToCart),
        this.$shopifyPaymentButton = $(this.selectors.shopifyPaymentButton, t),
        this.$productPolicies = $(this.selectors.productPolicies, t),
        this.$loader = $(this.selectors.loader, this.$addToCart),
        this.$loaderStatus = $(this.selectors.loaderStatus, t),
        $("#ProductJson-" + i).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + i).innerHTML),
        this.settings.zoomEnabled = $(this.selectors.imageZoomWrapper).hasClass(this.classes.jsZoomEnabled),
        this._initBreakpoints(),
        this._stringOverrides(),
        this._initVariants(),
        this._initMediaSwitch(),
        this._initAddToCart(),
        this._setActiveThumbnail(),
        this._initProductVideo(),
        this._initModelViewerLibraries(),
        this._initShopifyXrLaunch())
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        _stringOverrides: function() {
            theme.productStrings = theme.productStrings || {},
            $.extend(theme.strings, theme.productStrings)
        },
        _initBreakpoints: function() {
            var e = this;
            enquire.register(this.settings.mediaQuerySmall, {
                match: function() {
                    $(e.selectors.productThumbImages).length > 4 && e._initThumbnailSlider(),
                    e.settings.zoomEnabled && $(e.selectors.imageZoomWrapper).each((function() {
                        $(this).trigger("zoom.destroy")
                    }
                    )),
                    e.settings.bpSmall = !0
                },
                unmatch: function() {
                    e.settings.sliderActive && e._destroyThumbnailSlider(),
                    e.settings.bpSmall = !1
                }
            }),
            enquire.register(this.settings.mediaQueryMediumUp, {
                match: function() {
                    e.settings.zoomEnabled && $(e.selectors.imageZoomWrapper).each((function() {
                        var e, t;
                        e = this,
                        t = $(e).data("zoom"),
                        $(e).zoom({
                            url: t
                        })
                    }
                    ))
                }
            })
        },
        _initVariants: function() {
            var e = {
                $container: this.$container,
                enableHistoryState: this.$container.data("enable-history-state") || !1,
                singleOptionSelector: this.selectors.singleOptionSelector,
                originalSelectorId: this.selectors.originalSelectorId,
                product: this.productSingleObject
            };
            this.variants = new slate.Variants(e),
            this.$container.on("variantChange" + this.settings.namespace, this._updateAvailability.bind(this)),
            this.$container.on("variantImageChange" + this.settings.namespace, this._updateMedia.bind(this)),
            this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)),
            this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this))
        },
        _initMediaSwitch: function() {
            if ($(this.selectors.productThumbImages).length) {
                var e = this;
                $(this.selectors.productThumbImages).on("click", (function(t) {
                    t.preventDefault();
                    var i = $(this).data("thumbnail-id");
                    e._switchMedia(i),
                    e._setActiveThumbnail(i)
                }
                )).on("keyup", e._handleMediaFocus.bind(e))
            }
        },
        _initAddToCart: function() {
            $(this.selectors.productForm, this.$container).on("submit", function(e) {
                if (this.$addToCart.is("[aria-disabled]"))
                    e.preventDefault();
                else if (this.ajaxEnabled) {
                    e.preventDefault(),
                    this.$previouslyFocusedElement = $(":focus");
                    var t = this.$quantityInput.val() <= 0;
                    if (t)
                        this._showErrorMessage(theme.strings.quantityMinimumMessage);
                    else if (t || !this.ajaxEnabled)
                        ;
                    else {
                        this._handleButtonLoadingState(!0);
                        var i = $(this.selectors.productForm, this.$container);
                        this._addItemToCart(i)
                    }
                }
            }
            .bind(this))
        },
        _initProductVideo: function() {
            var e = this.settings.sectionId;
            $(this.selectors.productMediaTypeVideo, this.$container).each((function() {
                var t = $(this);
                theme.ProductVideo.init(t, e)
            }
            ))
        },
        _initModelViewerLibraries: function() {
            var e = $(this.selectors.productMediaTypeModel, this.$container);
            e.length < 1 || theme.ProductModel.init(e, this.settings.sectionId)
        },
        _initShopifyXrLaunch: function() {
            var e = this;
            $(document).on("shopify_xr_launch", (function() {
                $(e.selectors.productMediaWrapper + ":not(." + e.classes.hidden + ")", e.$container).trigger("xrLaunch")
            }
            ))
        },
        _addItemToCart: function(e) {
            var t = {
                url: "/cart/add.js",
                data: $(e).serialize(),
                dataType: "json"
            };
            $.post(t).done(function(e) {
                this._hideErrorMessage(),
                this._setupCartPopup(e)
            }
            .bind(this)).fail(function(e) {
                this.$previouslyFocusedElement.focus();
                var t = e.responseJSON ? e.responseJSON.description : theme.strings.cartError;
                this._showErrorMessage(t),
                this._handleButtonLoadingState(!1)
            }
            .bind(this))
        },
        _handleButtonLoadingState: function(e) {
            e ? (this.$addToCart.attr("aria-disabled", !0),
            this.$addToCartText.addClass(this.classes.hidden),
            this.$loader.removeClass(this.classes.hidden),
            this.$shopifyPaymentButton.attr("disabled", !0),
            this.$loaderStatus.attr("aria-hidden", !1)) : (this.$addToCart.removeAttr("aria-disabled"),
            this.$addToCartText.removeClass(this.classes.hidden),
            this.$loader.addClass(this.classes.hidden),
            this.$shopifyPaymentButton.removeAttr("disabled"),
            this.$loaderStatus.attr("aria-hidden", !0))
        },
        _showErrorMessage: function(e) {
            $(this.selectors.errorMessage, this.$container).html(e),
            0 !== this.$quantityInput.length && this.$quantityInput.addClass(this.classes.inputError),
            this.$errorMessageWrapper.removeClass(this.classes.productFormErrorMessageWrapperHidden).attr("aria-hidden", !0).removeAttr("aria-hidden")
        },
        _hideErrorMessage: function() {
            this.$errorMessageWrapper.addClass(this.classes.productFormErrorMessageWrapperHidden),
            0 !== this.$quantityInput.length && this.$quantityInput.removeClass(this.classes.inputError)
        },
        _setupCartPopup: function(e) {
            this.$cartPopup = this.$cartPopup || $(this.selectors.cartPopup),
            this.$cartPopupWrapper = this.$cartPopupWrapper || $(this.selectors.cartPopupWrapper),
            this.$cartPopupTitle = this.$cartPopupTitle || $(this.selectors.cartPopupTitle),
            this.$cartPopupQuantity = this.$cartPopupQuantity || $(this.selectors.cartPopupQuantity),
            this.$cartPopupQuantityLabel = this.$cartPopupQuantityLabel || $(this.selectors.cartPopupQuantityLabel),
            this.$cartPopupClose = this.$cartPopupClose || $(this.selectors.cartPopupClose),
            this.$cartPopupDismiss = this.$cartPopupDismiss || $(this.selectors.cartPopupDismiss),
            this.$cartPopupImagePlaceholder = this.$cartPopupImagePlaceholder || $(this.selectors.cartPopupImagePlaceholder),
            this._setupCartPopupEventListeners(),
            this._updateCartPopupContent(e)
        },
        _updateCartPopupContent: function(e) {
            var t = this.$quantityInput.length ? this.$quantityInput.val() : 1;
            this.$cartPopupTitle.text(e.product_title),
            this.$cartPopupQuantity.text(t),
            this.$cartPopupQuantityLabel.text(theme.strings.quantityLabel.replace("[count]", t)),
            this._setCartPopupPlaceholder(e.featured_image.url, e.featured_image.aspect_ratio),
            this._setCartPopupImage(e.featured_image.url, e.featured_image.alt),
            this._setCartPopupProductDetails(e.product_has_only_default_variant, e.options_with_values, e.properties),
            $.getJSON("/cart.js").then(function(e) {
                this._setCartQuantity(e.item_count),
                this._setCartCountBubble(e.item_count),
                this._showCartPopup()
            }
            .bind(this))
        },
        _setupCartPopupEventListeners: function() {
            this.$cartPopupWrapper.on("keyup", function(e) {
                e.keyCode === slate.utils.keyboardKeys.ESCAPE && this._hideCartPopup(e)
            }
            .bind(this)),
            this.$cartPopupClose.on("click", this._hideCartPopup.bind(this)),
            this.$cartPopupDismiss.on("click", this._hideCartPopup.bind(this)),
            $("body").on("click", this._onBodyClick.bind(this))
        },
        _setCartPopupPlaceholder: function(e, t) {
            if (this.$cartPopupImageWrapper = this.$cartPopupImageWrapper || $(this.selectors.cartPopupImageWrapper),
            null !== e) {
                var i = $(this.selectors.cartPopupPlaceholderSize)
                  , s = 95 * t
                  , a = 100 / t;
                this.$cartPopupImagePlaceholder.css("max-width", s),
                i.css("padding-top", a + "%")
            } else
                this.$cartPopupImageWrapper.addClass(this.classes.hidden)
        },
        _setCartPopupImage: function(e, t) {
            if (null !== e) {
                this.$cartPopupImageWrapper.removeClass(this.classes.hidden);
                var i = theme.Images.getSizedImageUrl(e, "200x")
                  , s = document.createElement("img");
                s.src = i,
                s.alt = t,
                s.classList.add(this.classes.cartImage),
                s.dataset.cartPopupImage = "",
                s.onload = function() {
                    this.$cartPopupImagePlaceholder.addClass(this.classes.hidden),
                    this.$cartPopupImageWrapper.append(s)
                }
                .bind(this)
            }
        },
        _setCartPopupProductDetails: function(e, t, i) {
            this.$cartPopupProductDetails = this.$cartPopupProductDetails || $(this.selectors.cartPopupProductDetails);
            var s = "";
            e || (s += this._getVariantOptionList(t)),
            null !== i && 0 !== Object.keys(i).length && (s += this._getPropertyList(i)),
            0 === s.length ? (this.$cartPopupProductDetails.html(""),
            this.$cartPopupProductDetails.attr("hidden", "")) : (this.$cartPopupProductDetails.html(s),
            this.$cartPopupProductDetails.removeAttr("hidden"))
        },
        _getVariantOptionList: function(e) {
            var t = "";
            return e.forEach((function(e) {
                t = t + '<li class="product-details__item product-details__item--variant-option">' + e.name + ": " + e.value + "</li>"
            }
            )),
            t
        },
        _getPropertyList: function(e) {
            var t = "";
            return Object.entries(e).forEach((function(e) {
                "_" !== e[0].charAt(0) && 0 !== e[1].length && (t = t + '<li class="product-details__item product-details__item--property"><span class="product-details__property-label">' + e[0] + ": </span>" + e[1])
            }
            )),
            t
        },
        _setCartQuantity: function(e) {
            var t;
            this.$cartPopupCartQuantity = this.$cartPopupCartQuantity || $(this.selectors.cartPopupCartQuantity),
            1 === e ? t = theme.strings.oneCartCount : e > 1 && (t = theme.strings.otherCartCount.replace("[count]", e)),
            this.$cartPopupCartQuantity.text(e).attr("aria-label", t)
        },
        _setCartCountBubble: function(e) {
            this.$cartCountBubble = this.$cartCountBubble || $(this.selectors.cartCountBubble),
            this.$cartCount = this.$cartCount || $(this.selectors.cartCount),
            this.$cartCountBubble.removeClass(this.classes.hidden),
            this.$cartCount.text(e)
        },
        _showCartPopup: function() {
            this.$cartPopupWrapper.prepareTransition().removeClass(this.classes.cartPopupWrapperHidden),
            this._handleButtonLoadingState(!1),
            slate.a11y.trapFocus({
                $container: this.$cartPopupWrapper,
                $elementToFocus: this.$cartPopup,
                namespace: "cartPopupFocus"
            })
        },
        _hideCartPopup: function(e) {
            var t = 0 === e.detail;
            this.$cartPopupWrapper.prepareTransition().addClass(this.classes.cartPopupWrapperHidden),
            $(this.selectors.cartPopupImage).remove(),
            this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden),
            slate.a11y.removeTrapFocus({
                $container: this.$cartPopupWrapper,
                namespace: "cartPopupFocus"
            }),
            t && this.$previouslyFocusedElement[0].focus(),
            this.$cartPopupWrapper.off("keyup"),
            this.$cartPopupClose.off("click"),
            this.$cartPopupDismiss.off("click"),
            $("body").off("click")
        },
        _onBodyClick: function(e) {
            var t = $(e.target);
            t[0] === this.$cartPopupWrapper[0] || t.parents(this.selectors.cartPopup).length || this._hideCartPopup(e)
        },
        _setActiveThumbnail: function(e) {
            void 0 === e && (e = $(this.selectors.productMediaWrapper + ":not(.hide)", this.$container).data("media-id"));
            var t = $(this.selectors.productThumbListItem + ":not(.slick-cloned)", this.$container)
              , i = t.find(this.selectors.productThumbImages + "[data-thumbnail-id='" + e + "']");
            if ($(this.selectors.productThumbImages).removeClass(this.classes.activeClass).removeAttr("aria-current"),
            i.addClass(this.classes.activeClass),
            i.attr("aria-current", !0),
            t.hasClass("slick-slide")) {
                var s = i.parent().data("slick-index");
                $(this.selectors.productThumbs).slick("slickGoTo", s, !0)
            }
        },
        _switchMedia: function(e) {
            var t = $(this.selectors.productMediaWrapper + ":not(." + this.classes.hidden + ")", this.$container)
              , i = $(this.selectors.productMediaWrapper + "[data-media-id='" + e + "']", this.$container)
              , s = $(this.selectors.productMediaWrapper + ":not([data-media-id='" + e + "'])", this.$container);
            t.trigger("mediaHidden"),
            i.removeClass(this.classes.hidden).trigger("mediaVisible"),
            s.addClass(this.classes.hidden)
        },
        _handleMediaFocus: function(e) {
            if (e.keyCode === slate.utils.keyboardKeys.ENTER) {
                var t = $(e.currentTarget).data("thumbnail-id");
                $(this.selectors.productMediaWrapper + "[data-media-id='" + t + "']", this.$container).focus()
            }
        },
        _initThumbnailSlider: function() {
            var e = {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: !1,
                prevArrow: ".thumbnails-slider__prev--" + this.settings.sectionId,
                nextArrow: ".thumbnails-slider__next--" + this.settings.sectionId
            };
            $(this.selectors.productThumbs).slick(e),
            $(this.selectors.productThumbsWrapper, this.$container).find(".slick-list").removeAttr("aria-live"),
            $(this.selectors.productThumbsWrapper, this.$container).find(".slick-disabled").removeAttr("aria-disabled"),
            this.settings.sliderActive = !0
        },
        _destroyThumbnailSlider: function() {
            $(this.selectors.productThumbs).slick("unslick"),
            this.settings.sliderActive = !1,
            $(this.selectors.productThumbsWrapper, this.$container).find('[tabindex="-1"]').removeAttr("tabindex")
        },
        _liveRegionText: function(e) {
            var t = "[Availability] [Regular] [$$] [Sale] [$]. [UnitPrice] [$$$]";
            if (!e)
                return t = theme.strings.unavailable;
            var i = e.available ? "" : theme.strings.soldOut + ",";
            t = t.replace("[Availability]", i);
            var s = ""
              , a = theme.Currency.formatMoney(e.price, theme.moneyFormat)
              , r = ""
              , n = ""
              , o = ""
              , c = "";
            return e.compare_at_price > e.price && (s = theme.strings.regularPrice,
            a = theme.Currency.formatMoney(e.compare_at_price, theme.moneyFormat) + ",",
            r = theme.strings.sale,
            n = theme.Currency.formatMoney(e.price, theme.moneyFormat)),
            e.unit_price && (o = theme.strings.unitPrice,
            c = theme.Currency.formatMoney(e.unit_price, theme.moneyFormat) + " " + theme.strings.unitPriceSeparator + " " + this._getBaseUnit(e)),
            t = t.replace("[Regular]", s).replace("[$$]", a).replace("[Sale]", r).replace("[$]", n).replace("[UnitPrice]", o).replace("[$$$]", c).trim()
        },
        _updateLiveRegion: function(e) {
            var t = e.variant
              , i = this.container.querySelector(this.selectors.productStatus);
            i.innerHTML = this._liveRegionText(t),
            i.setAttribute("aria-hidden", !1),
            setTimeout((function() {
                i.setAttribute("aria-hidden", !0)
            }
            ), 1e3)
        },
        _updateAddToCart: function(e) {
            var t = e.variant;
            t ? t.available ? (this.$addToCart.removeAttr("aria-disabled").attr("aria-label", theme.strings.addToCart),
            $(this.selectors.addToCartText, this.$container).text(theme.strings.addToCart),
            $(this.selectors.productForm, this.container).removeClass(this.classes.variantSoldOut)) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.soldOut),
            $(this.selectors.addToCartText, this.$container).text(theme.strings.soldOut),
            $(this.selectors.productForm, this.container).addClass(this.classes.variantSoldOut)) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.unavailable),
            $(this.selectors.addToCartText, this.$container).text(theme.strings.unavailable),
            $(this.selectors.productForm, this.container).addClass(this.classes.variantSoldOut))
        },
        _updateAvailability: function(e) {
            this._hideErrorMessage(),
            this._updateAddToCart(e),
            this._updateLiveRegion(e),
            this._updatePrice(e)
        },
        _updateMedia: function(e) {
            var t = e.variant.featured_media.id
              , i = this.settings.sectionId + "-" + t;
            this._switchMedia(i),
            this._setActiveThumbnail(i)
        },
        _updatePrice: function(e) {
            var t = e.variant
              , i = $(this.selectors.priceContainer, this.$container)
              , s = $(this.selectors.regularPrice, i)
              , a = $(this.selectors.salePrice, i)
              , r = $(this.selectors.unitPrice, i)
              , n = $(this.selectors.unitPriceBaseUnit, i);
            if (i.removeClass(this.classes.productUnavailable).removeClass(this.classes.productOnSale).removeClass(this.classes.productUnitAvailable).removeClass(this.classes.productSoldOut).removeAttr("aria-hidden"),
            this.$productPolicies.removeClass(this.classes.visibilityHidden),
            !t)
                return i.addClass(this.classes.productUnavailable).attr("aria-hidden", !0),
                void this.$productPolicies.addClass(this.classes.visibilityHidden);
            t.available || i.addClass(this.classes.productSoldOut),
            t.compare_at_price > t.price ? (s.html(theme.Currency.formatMoney(t.compare_at_price, theme.moneyFormat)),
            a.html(theme.Currency.formatMoney(t.price, theme.moneyFormat)),
            i.addClass(this.classes.productOnSale)) : s.html(theme.Currency.formatMoney(t.price, theme.moneyFormat)),
            t.unit_price && (r.html(theme.Currency.formatMoney(t.unit_price, theme.moneyFormat)),
            n.html(this._getBaseUnit(t)),
            i.addClass(this.classes.productUnitAvailable))
        },
        _getBaseUnit: function(e) {
            return 1 === e.unit_price_measurement.reference_value ? e.unit_price_measurement.reference_unit : e.unit_price_measurement.reference_value + e.unit_price_measurement.reference_unit
        },
        _updateSKU: function(e) {
            var t = e.variant;
            $(this.selectors.SKU).html(t.sku)
        },
        onUnload: function() {
            this.$container.off(this.settings.namespace),
            theme.ProductVideo.removeSectionVideos(this.settings.sectionId),
            theme.ProductModel.removeSectionModels(this.settings.sectionId)
        }
    }),
    e
}(),
theme.ProductRecommendations = function(e) {
    this.$container = $(e);
    var t = this.$container.data("baseUrl") + "?section_id=product-recommendations&product_id=" + this.$container.data("productId") + "&limit=4";
    $.get(t).then(function(e) {
        var t = $(e).html();
        "" !== t.trim() && this.$container.html(t)
    }
    .bind(this))
}
,
theme.Quotes = function() {
    var e = {
        mediaQuerySmall: "screen and (max-width: 749px)",
        mediaQueryMediumUp: "screen and (min-width: 750px)",
        slideCount: 0
    }
      , t = {
        accessibility: !0,
        arrows: !1,
        dots: !0,
        autoplay: !1,
        touchThreshold: 20,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    function i(i) {
        var s = (this.$container = $(i)).attr("data-section-id")
          , a = this.wrapper = ".quotes-wrapper"
          , r = this.slider = "#Quotes-" + s
          , n = $(r, a)
          , o = !1
          , c = $.extend({}, t, {
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: !0
        });
        function l(e, t) {
            o && (e.slick("unslick"),
            o = !1),
            e.slick(t),
            o = !0
        }
        e.slideCount = n.data("count"),
        e.slideCount < t.slidesToShow && (t.slidesToShow = e.slideCount,
        t.slidesToScroll = e.slideCount),
        n.on("init", this.a11y.bind(this)),
        enquire.register(e.mediaQuerySmall, {
            match: function() {
                l(n, c)
            }
        }),
        enquire.register(e.mediaQueryMediumUp, {
            match: function() {
                l(n, t)
            }
        })
    }
    return i.prototype = _.assignIn({}, i.prototype, {
        onUnload: function() {
            enquire.unregister(e.mediaQuerySmall),
            enquire.unregister(e.mediaQueryMediumUp),
            $(this.slider, this.wrapper).slick("unslick")
        },
        onBlockSelect: function(e) {
            var t = $(".quotes-slide--" + e.detail.blockId + ":not(.slick-cloned)").data("slick-index");
            $(this.slider, this.wrapper).slick("slickGoTo", t)
        },
        a11y: function(e, t) {
            var i = t.$list
              , s = $(this.wrapper, this.$container);
            i.removeAttr("aria-live"),
            s.on("focusin", (function(e) {
                s.has(e.target).length && i.attr("aria-live", "polite")
            }
            )),
            s.on("focusout", (function(e) {
                s.has(e.target).length && i.removeAttr("aria-live")
            }
            ))
        }
    }),
    i
}(),
theme.slideshows = {},
theme.SlideshowSection = function(e) {
    var t = (this.$container = $(e)).attr("data-section-id")
      , i = this.slideshow = "#Slideshow-" + t;
    theme.slideshows[i] = new theme.Slideshow(i,t)
}
,
theme.SlideshowSection.prototype = _.assignIn({}, theme.SlideshowSection.prototype, {
    onUnload: function() {
        delete theme.slideshows[this.slideshow]
    },
    onBlockSelect: function(e) {
        var t = $(this.slideshow);
        t.data("adapt-height") && theme.slideshows[this.slideshow].setSlideshowHeight();
        var i = $(".slideshow__slide--" + e.detail.blockId + ":not(.slick-cloned)").data("slick-index");
        t.slick("slickGoTo", i).slick("slickPause")
    },
    onBlockDeselect: function() {
        $(this.slideshow).slick("slickPlay")
    }
}),
theme.slideshows = {},
theme.VideoSection = function(e) {
    var t = this.$container = $(e);
    $(".video", t).each((function() {
        var e = $(this);
        theme.Video.init(e),
        theme.Video.editorLoadVideo(e.attr("id"))
    }
    ))
}
,
theme.VideoSection.prototype = _.assignIn({}, theme.VideoSection.prototype, {
    onUnload: function() {
        theme.Video.removeEvents()
    }
}),
theme.heros = {},
theme.HeroSection = function(e) {
    var t = (this.$container = $(e)).attr("data-section-id")
      , i = "#Hero-" + t;
    theme.heros[i] = new theme.Hero(i,t)
}
,
window.theme = window.theme || {};
var selectors = {
    disclosureLocale: "[data-disclosure-locale]",
    disclosureCurrency: "[data-disclosure-currency]"
};
function onYouTubeIframeAPIReady() {
    theme.Video.loadVideos(),
    theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube)
}
theme.FooterSection = function() {
    function e(e) {
        this.$container = $(e),
        this.cache = {},
        this.cacheSelectors(),
        this.cache.$localeDisclosure.length && (this.localeDisclosure = new theme.Disclosure(this.cache.$localeDisclosure)),
        this.cache.$currencyDisclosure.length && (this.currencyDisclosure = new theme.Disclosure(this.cache.$currencyDisclosure))
    }
    return e.prototype = _.assignIn({}, e.prototype, {
        cacheSelectors: function() {
            this.cache = {
                $localeDisclosure: this.$container.find(selectors.disclosureLocale),
                $currencyDisclosure: this.$container.find(selectors.disclosureCurrency)
            }
        },
        onUnload: function() {
            this.cache.$localeDisclosure.length && this.localeDisclosure.unload(),
            this.cache.$currencyDisclosure.length && this.currencyDisclosure.unload()
        }
    }),
    e
}(),
$(document).ready((function() {
    var e = new theme.Sections;
    e.register("cart-template", theme.Cart),
    e.register("product", theme.Product),
    e.register("collection-template", theme.Filters),
    e.register("product-template", theme.Product),
    e.register("header-section", theme.HeaderSection),
    e.register("map", theme.Maps),
    e.register("slideshow-section", theme.SlideshowSection),
    e.register("video-section", theme.VideoSection),
    e.register("quotes", theme.Quotes),
    e.register("hero-section", theme.HeroSection),
    e.register("product-recommendations", theme.ProductRecommendations),
    e.register("footer-section", theme.FooterSection)
}
)),
theme.init = function() {
    theme.customerTemplates.init();
    slate.rte.wrapTable({
        $tables: $(".rte table,.custom__item-inner--html table"),
        tableWrapperClass: "scrollable-wrapper"
    });
    slate.rte.wrapIframe({
        $iframes: $('.rte iframe[src*="youtube.com/embed"],.rte iframe[src*="player.vimeo"],.custom__item-inner--html iframe[src*="youtube.com/embed"],.custom__item-inner--html iframe[src*="player.vimeo"]'),
        iframeWrapperClass: "video-wrapper"
    }),
    slate.a11y.pageLinkFocus($(window.location.hash)),
    $(".in-page-link").on("click", (function(e) {
        slate.a11y.pageLinkFocus($(e.currentTarget.hash))
    }
    )),
    $('a[href="#"]').on("click", (function(e) {
        e.preventDefault()
    }
    )),
    slate.a11y.accessibleLinks({
        messages: {
            newWindow: theme.strings.newWindow,
            external: theme.strings.external,
            newWindowExternal: theme.strings.newWindowExternal
        },
        $links: $("a[href]:not([aria-describedby], .product-single__thumbnail)")
    }),
    theme.FormStatus.init();
    var e = "[data-image]"
      , t = "[data-image-placeholder]"
      , i = "[data-image-with-placeholder-wrapper]"
      , s = ".lazyloaded"
      , a = "hide";
    $(document).on("lazyloaded", (function(r) {
        var n = $(r.target);
        if (n.data("bgset")) {
            var o = n.find(s);
            if (o.length) {
                var c = n.data("alt")
                  , l = o.data("src") ? o.data("src") : n.data("bg");
                o.attr("alt", c || ""),
                o.attr("src", l || "")
            }
        }
        n.is(e) && n.closest(i).find(t).addClass(a)
    }
    )),
    $(e + ".lazyloaded").closest(i).find(t).addClass(a),
    $(document).one("touchstart", (function() {
        theme.Helpers.setTouch()
    }
    ))
}
,
$(theme.init),
$(document).ready((function() {
    $("ul.tabs").each((function() {
        var e, t, i = $(this).find("a");
        e = i.first().addClass("active"),
        t = $(e.attr("href")),
        i.not(":first").each((function() {
            $($(this).attr("href")).hide()
        }
        )),
        $(this).find("a").click((function(i) {
            return e.removeClass("active"),
            t.hide(),
            e = $(this),
            t = $($(this).attr("href")),
            e.addClass("active"),
            t.show(),
            !1
        }
        ))
    }
    ))
}
));
