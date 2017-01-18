(function() {
    function t(n) {
        if (Array.isArray(n)) {
            for (var t = 0, i = Array(n.length); t < n.length; t++)
                i[t] = n[t];
            return i
        }
        return Array.from(n)
    }
    var u, r, n, i;
    (function(t) {
        function e(n, t) {
            return k.call(n, t)
        }
        function l(n, t) {
            var o, s, u, e, h, y, c, b, i, l, w, k, r = t && t.split("/"), a = f.map, v = a && a["*"] || {};
            if (n) {
                for (n = n.split("/"),
                h = n.length - 1,
                f.nodeIdCompat && p.test(n[h]) && (n[h] = n[h].replace(p, "")),
                n[0].charAt(0) === "." && r && (k = r.slice(0, r.length - 1),
                n = k.concat(n)),
                i = 0; i < n.length; i++)
                    if (w = n[i],
                    w === ".")
                        n.splice(i, 1),
                        i -= 1;
                    else if (w === "..")
                        if (i === 0 || i === 1 && n[2] === ".." || n[i - 1] === "..")
                            continue;
                        else
                            i > 0 && (n.splice(i - 1, 2),
                            i -= 2);
                n = n.join("/")
            }
            if ((r || v) && a) {
                for (o = n.split("/"),
                i = o.length; i > 0; i -= 1) {
                    if (s = o.slice(0, i).join("/"),
                    r)
                        for (l = r.length; l > 0; l -= 1)
                            if (u = a[r.slice(0, l).join("/")],
                            u && (u = u[s],
                            u)) {
                                e = u,
                                y = i;
                                break
                            }
                    if (e)
                        break;
                    !c && v && v[s] && (c = v[s],
                    b = i)
                }
                !e && c && (e = c,
                y = b),
                e && (o.splice(0, y, e),
                n = o.join("/"))
            }
            return n
        }
        function w(n, i) {
            return function() {
                var r = d.call(arguments, 0);
                return typeof r[0] != "string" && r.length === 1 && r.push(null),
                o.apply(t, r.concat([n, i]))
            }
        }
        function g(n) {
            return function(t) {
                return l(t, n)
            }
        }
        function nt(n) {
            return function(t) {
                i[n] = t
            }
        }
        function a(n) {
            if (e(h, n)) {
                var r = h[n];
                delete h[n],
                y[n] = !0,
                c.apply(t, r)
            }
            if (!e(i, n) && !e(y, n))
                throw new Error("No " + n);
            return i[n]
        }
        function b(n) {
            var i, t = n ? n.indexOf("!") : -1;
            return t > -1 && (i = n.substring(0, t),
            n = n.substring(t + 1, n.length)),
            [i, n]
        }
        function tt(n) {
            return function() {
                return f && f.config && f.config[n] || {}
            }
        }
        var c, o, v, s, i = {}, h = {}, f = {}, y = {}, k = Object.prototype.hasOwnProperty, d = [].slice, p = /\.js$/;
        v = function(n, t) {
            var r, u = b(n), i = u[0];
            return n = u[1],
            i && (i = l(i, t),
            r = a(i)),
            i ? n = r && r.normalize ? r.normalize(n, g(t)) : l(n, t) : (n = l(n, t),
            u = b(n),
            i = u[0],
            n = u[1],
            i && (r = a(i))),
            {
                f: i ? i + "!" + n : n,
                n: n,
                pr: i,
                p: r
            }
        }
        ,
        s = {
            require: function(n) {
                return w(n)
            },
            exports: function(n) {
                var t = i[n];
                return typeof t != "undefined" ? t : i[n] = {}
            },
            module: function(n) {
                return {
                    id: n,
                    uri: "",
                    exports: i[n],
                    config: tt(n)
                }
            }
        },
        c = function(n, r, u, f) {
            var p, o, k, b, c, l = [], d = typeof u, g;
            if (f = f || n,
            d === "undefined" || d === "function") {
                for (r = !r.length && u.length ? ["require", "exports", "module"] : r,
                c = 0; c < r.length; c += 1)
                    if (b = v(r[c], f),
                    o = b.f,
                    o === "require")
                        l[c] = s.require(n);
                    else if (o === "exports")
                        l[c] = s.exports(n),
                        g = !0;
                    else if (o === "module")
                        p = l[c] = s.module(n);
                    else if (e(i, o) || e(h, o) || e(y, o))
                        l[c] = a(o);
                    else if (b.p)
                        b.p.load(b.n, w(f, !0), nt(o), {}),
                        l[c] = i[o];
                    else
                        throw new Error(n + " missing " + o);
                k = u ? u.apply(i[n], l) : undefined,
                n && (p && p.exports !== t && p.exports !== i[n] ? i[n] = p.exports : k === t && g || (i[n] = k))
            } else
                n && (i[n] = u)
        }
        ,
        u = r = o = function(n, i, r, u, e) {
            if (typeof n == "string")
                return s[n] ? s[n](i) : a(v(n, i).f);
            if (!n.splice) {
                if (f = n,
                f.deps && o(f.deps, f.callback),
                !i)
                    return;
                i.splice ? (n = i,
                i = r,
                r = null) : n = t
            }
            return i = i || function() {}
            ,
            typeof r == "function" && (r = u,
            u = e),
            u ? c(t, n, i, r) : setTimeout(function() {
                c(t, n, i, r)
            }, 4),
            o
        }
        ,
        o.config = function(n) {
            return o(n)
        }
        ,
        u._defined = i,
        n = function(n, t, r) {
            if (typeof n != "string")
                throw new Error("See almond README: incorrect module build, no module name");
            t.splice || (r = t,
            t = []),
            e(i, n) || e(h, n) || (h[n] = [n, t, r])
        }
        ,
        n.amd = {
            jQuery: !0
        }
    })(),
    n("vendor/almond/almond", function() {}),
    function(n, t) {
        typeof module == "object" && typeof module.exports == "object" ? module.exports = n.document ? t(n, !0) : function(n) {
            if (!n.document)
                throw new Error("jQuery requires a window with a document");
            return t(n)
        }
        : t(n)
    }(typeof window != "undefined" ? window : this, function(t, i) {
        function ri(n) {
            var t = !!n && "length"in n && n.length
              , i = r.type(n);
            return i === "function" || r.isWindow(n) ? !1 : i === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in n
        }
        function ui(n, t, i) {
            if (r.isFunction(t))
                return r.grep(n, function(n, r) {
                    return !!t.call(n, r, n) !== i
                });
            if (t.nodeType)
                return r.grep(n, function(n) {
                    return n === t !== i
                });
            if (typeof t == "string") {
                if (we.test(t))
                    return r.filter(t, n, i);
                t = r.filter(t, n)
            }
            return r.grep(n, function(n) {
                return r.inArray(n, t) > -1 !== i
            })
        }
        function dr(n, t) {
            do
                n = n[t];
            while (n && n.nodeType !== 1);return n
        }
        function be(n) {
            var t = {};
            return r.each(n.match(h) || [], function(n, i) {
                t[i] = !0
            }),
            t
        }
        function gr() {
            f.addEventListener ? (f.removeEventListener("DOMContentLoaded", y),
            t.removeEventListener("load", y)) : (f.detachEvent("onreadystatechange", y),
            t.detachEvent("onload", y))
        }
        function y() {
            (f.addEventListener || t.event.type === "load" || f.readyState === "complete") && (gr(),
            r.ready())
        }
        function tu(n, t, i) {
            if (i === undefined && n.nodeType === 1) {
                var u = "data-" + t.replace(de, "-$1").toLowerCase();
                if (i = n.getAttribute(u),
                typeof i == "string") {
                    try {
                        i = i === "true" ? !0 : i === "false" ? !1 : i === "null" ? null : +i + "" === i ? +i : ke.test(i) ? r.parseJSON(i) : i
                    } catch (f) {}
                    r.data(n, t, i)
                } else
                    i = undefined
            }
            return i
        }
        function ei(n) {
            var t;
            for (t in n)
                if ((t !== "data" || !r.isEmptyObject(n[t])) && t !== "toJSON")
                    return !1;
            return !0
        }
        function iu(n, t, i, u) {
            if (st(n)) {
                var s, e, h = r.expando, c = n.nodeType, o = c ? r.cache : n, f = c ? n[h] : n[h] && h;
                if (f && o[f] && (u || o[f].data) || i !== undefined || typeof t != "string")
                    return f || (f = c ? n[h] = l.pop() || r.guid++ : h),
                    o[f] || (o[f] = c ? {} : {
                        toJSON: r.noop
                    }),
                    (typeof t == "object" || typeof t == "function") && (u ? o[f] = r.extend(o[f], t) : o[f].data = r.extend(o[f].data, t)),
                    e = o[f],
                    u || (e.data || (e.data = {}),
                    e = e.data),
                    i !== undefined && (e[r.camelCase(t)] = i),
                    typeof t == "string" ? (s = e[t],
                    s == null && (s = e[r.camelCase(t)])) : s = e,
                    s
            }
        }
        function ru(n, t, i) {
            if (st(n)) {
                var e, s, h = n.nodeType, f = h ? r.cache : n, o = h ? n[r.expando] : r.expando;
                if (f[o]) {
                    if (t && (e = i ? f[o] : f[o].data,
                    e)) {
                        for (r.isArray(t) ? t = t.concat(r.map(t, r.camelCase)) : (t in e) ? t = [t] : (t = r.camelCase(t),
                        t = t in e ? [t] : t.split(" ")),
                        s = t.length; s--; )
                            delete e[t[s]];
                        if (i ? !ei(e) : !r.isEmptyObject(e))
                            return
                    }
                    (i || (delete f[o].data,
                    ei(f[o]))) && (h ? r.cleanData([n], !0) : u.deleteExpando || f != f.window ? delete f[o] : f[o] = undefined)
                }
            }
        }
        function uu(n, t, i, u) {
            var h, e = 1, l = 20, c = u ? function() {
                return u.cur()
            }
            : function() {
                return r.css(n, t, "")
            }
            , s = c(), o = i && i[3] || (r.cssNumber[t] ? "" : "px"), f = (r.cssNumber[t] || o !== "px" && +s) && si.exec(r.css(n, t));
            if (f && f[3] !== o) {
                o = o || f[3],
                i = i || [],
                f = +s || 1;
                do
                    e = e || ".5",
                    f = f / e,
                    r.style(n, t, f + o);
                while (e !== (e = c() / s) && e !== 1 && --l)
            }
            return i && (f = +f || +s || 0,
            h = i[1] ? f + (i[1] + 1) * i[2] : +i[2],
            u && (u.unit = o,
            u.start = f,
            u.end = h)),
            h
        }
        function su(n) {
            var i = ou.split("|")
              , t = n.createDocumentFragment();
            if (t.createElement)
                while (i.length)
                    t.createElement(i.pop());
            return t
        }
        function e(n, t) {
            var f, u, o = 0, i = typeof n.getElementsByTagName != "undefined" ? n.getElementsByTagName(t || "*") : typeof n.querySelectorAll != "undefined" ? n.querySelectorAll(t || "*") : undefined;
            if (!i)
                for (i = [],
                f = n.childNodes || n; (u = f[o]) != null; o++)
                    !t || r.nodeName(u, t) ? i.push(u) : r.merge(i, e(u, t));
            return t === undefined || t && r.nodeName(n, t) ? r.merge([n], i) : i
        }
        function li(n, t) {
            for (var u, i = 0; (u = n[i]) != null; i++)
                r._data(u, "globalEval", !t || r._data(t[i], "globalEval"))
        }
        function ge(n) {
            hi.test(n.type) && (n.defaultChecked = n.checked)
        }
        function cu(n, t, i, f, o) {
            for (var l, h, k, c, w, b, v, d = n.length, y = su(t), a = [], p = 0; p < d; p++)
                if (h = n[p],
                h || h === 0)
                    if (r.type(h) === "object")
                        r.merge(a, h.nodeType ? [h] : h);
                    else if (hu.test(h)) {
                        for (c = c || y.appendChild(t.createElement("div")),
                        w = (fu.exec(h) || ["", ""])[1].toLowerCase(),
                        v = s[w] || s._default,
                        c.innerHTML = v[1] + r.htmlPrefilter(h) + v[2],
                        l = v[0]; l--; )
                            c = c.lastChild;
                        if (!u.leadingWhitespace && ci.test(h) && a.push(t.createTextNode(ci.exec(h)[0])),
                        !u.tbody)
                            for (h = w === "table" && !ai.test(h) ? c.firstChild : v[1] === "<table>" && !ai.test(h) ? c : 0,
                            l = h && h.childNodes.length; l--; )
                                r.nodeName(b = h.childNodes[l], "tbody") && !b.childNodes.length && h.removeChild(b);
                        for (r.merge(a, c.childNodes),
                        c.textContent = ""; c.firstChild; )
                            c.removeChild(c.firstChild);
                        c = y.lastChild
                    } else
                        a.push(t.createTextNode(h));
            for (c && y.removeChild(c),
            u.appendChecked || r.grep(e(a, "input"), ge),
            p = 0; h = a[p++]; ) {
                if (f && r.inArray(h, f) > -1) {
                    o && o.push(h);
                    continue
                }
                if (k = r.contains(h.ownerDocument, h),
                c = e(y.appendChild(h), "script"),
                k && li(c),
                i)
                    for (l = 0; h = c[l++]; )
                        eu.test(h.type || "") && i.push(h)
            }
            return c = null,
            y
        }
        function yt() {
            return !0
        }
        function ut() {
            return !1
        }
        function vu() {
            try {
                return f.activeElement
            } catch (n) {}
        }
        function yi(n, t, i, u, f, e) {
            var o, s;
            if (typeof t == "object") {
                typeof i != "string" && (u = u || i,
                i = undefined);
                for (s in t)
                    yi(n, s, i, u, t[s], e);
                return n
            }
            if (u == null && f == null ? (f = i,
            u = i = undefined) : f == null && (typeof i == "string" ? (f = u,
            u = undefined) : (f = u,
            u = i,
            i = undefined)),
            f === !1)
                f = ut;
            else if (!f)
                return n;
            return e === 1 && (o = f,
            f = function(n) {
                return r().off(n),
                o.apply(this, arguments)
            }
            ,
            f.guid = o.guid || (o.guid = r.guid++)),
            n.each(function() {
                r.event.add(this, t, f, u, i)
            })
        }
        function pu(n, t) {
            return r.nodeName(n, "table") && r.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
        }
        function wu(n) {
            return n.type = (r.find.attr(n, "type") !== null) + "/" + n.type,
            n
        }
        function bu(n) {
            var t = eo.exec(n.type);
            return t ? n.type = t[1] : n.removeAttribute("type"),
            n
        }
        function ku(n, t) {
            if (t.nodeType === 1 && r.hasData(n)) {
                var u, f, o, s = r._data(n), i = r._data(t, s), e = s.events;
                if (e) {
                    delete i.handle,
                    i.events = {};
                    for (u in e)
                        for (f = 0,
                        o = e[u].length; f < o; f++)
                            r.event.add(t, u, e[u][f])
                }
                i.data && (i.data = r.extend({}, i.data))
            }
        }
        function ho(n, t) {
            var i, e, f;
            if (t.nodeType === 1) {
                if (i = t.nodeName.toLowerCase(),
                !u.noCloneEvent && t[r.expando]) {
                    f = r._data(t);
                    for (e in f.events)
                        r.removeEvent(t, e, f.handle);
                    t.removeAttribute(r.expando)
                }
                i === "script" && t.text !== n.text ? (wu(t).text = n.text,
                bu(t)) : i === "object" ? (t.parentNode && (t.outerHTML = n.outerHTML),
                u.html5Clone && n.innerHTML && !r.trim(t.innerHTML) && (t.innerHTML = n.innerHTML)) : i === "input" && hi.test(n.type) ? (t.defaultChecked = t.checked = n.checked,
                t.value !== n.value && (t.value = n.value)) : i === "option" ? t.defaultSelected = t.selected = n.defaultSelected : (i === "input" || i === "textarea") && (t.defaultValue = n.defaultValue)
            }
        }
        function d(n, t, i, f) {
            t = hr.apply([], t);
            var l, o, a, h, p, c, s = 0, v = n.length, b = v - 1, y = t[0], w = r.isFunction(y);
            if (w || v > 1 && typeof y == "string" && !u.checkClone && fo.test(y))
                return n.each(function(r) {
                    var u = n.eq(r);
                    w && (t[0] = y.call(this, r, u.html())),
                    d(u, t, i, f)
                });
            if (v && (c = cu(t, n[0].ownerDocument, !1, n, f),
            l = c.firstChild,
            c.childNodes.length === 1 && (c = l),
            l || f)) {
                for (h = r.map(e(c, "script"), wu),
                a = h.length; s < v; s++)
                    o = c,
                    s !== b && (o = r.clone(o, !0, !0),
                    a && r.merge(h, e(o, "script"))),
                    i.call(n[s], o, s);
                if (a)
                    for (p = h[h.length - 1].ownerDocument,
                    r.map(h, bu),
                    s = 0; s < a; s++)
                        o = h[s],
                        eu.test(o.type || "") && !r._data(o, "globalEval") && r.contains(p, o) && (o.src ? r._evalUrl && r._evalUrl(o.src) : r.globalEval((o.text || o.textContent || o.innerHTML || "").replace(oo, "")));
                c = l = null
            }
            return n
        }
        function du(n, t, i) {
            for (var u, o = t ? r.filter(t, n) : n, f = 0; (u = o[f]) != null; f++)
                i || u.nodeType !== 1 || r.cleanData(e(u)),
                u.parentNode && (i && r.contains(u.ownerDocument, u) && li(e(u, "script")),
                u.parentNode.removeChild(u));
            return n
        }
        function gu(n, t) {
            var i = r(t.createElement(n)).appendTo(t.body)
              , u = r.css(i[0], "display");
            return i.detach(),
            u
        }
        function pt(n) {
            var i = f
              , t = wi[n];
            return t || (t = gu(n, i),
            t !== "none" && t || (ct = (ct || r("<iframe frameborder='0' width='0' height='0'/>")).appendTo(i.documentElement),
            i = (ct[0].contentWindow || ct[0].contentDocument).document,
            i.write(),
            i.close(),
            t = gu(n, i),
            ct.detach()),
            wi[n] = t),
            t
        }
        function ki(n, t) {
            return {
                get: function() {
                    if (n()) {
                        delete this.get;
                        return
                    }
                    return (this.get = t).apply(this, arguments)
                }
            }
        }
        function of(n) {
            if (n in ef)
                return n;
            for (var i = n.charAt(0).toUpperCase() + n.slice(1), t = ff.length; t--; )
                if (n = ff[t] + i,
                n in ef)
                    return n
        }
        function sf(n, t) {
            for (var f, i, o, e = [], u = 0, s = n.length; u < s; u++)
                (i = n[u],
                i.style) && (e[u] = r._data(i, "olddisplay"),
                f = i.style.display,
                t ? (e[u] || f !== "none" || (i.style.display = ""),
                i.style.display === "" && ht(i) && (e[u] = r._data(i, "olddisplay", pt(i.nodeName)))) : (o = ht(i),
                (f && f !== "none" || !o) && r._data(i, "olddisplay", o ? f : r.css(i, "display"))));
            for (u = 0; u < s; u++)
                (i = n[u],
                i.style) && (t && i.style.display !== "none" && i.style.display !== "" || (i.style.display = t ? e[u] || "" : "none"));
            return n
        }
        function hf(n, t, i) {
            var r = ao.exec(t);
            return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
        }
        function cf(n, t, i, u, f) {
            for (var e = i === (u ? "border" : "content") ? 4 : t === "width" ? 1 : 0, o = 0; e < 4; e += 2)
                i === "margin" && (o += r.css(n, i + k[e], !0, f)),
                u ? (i === "content" && (o -= r.css(n, "padding" + k[e], !0, f)),
                i !== "margin" && (o -= r.css(n, "border" + k[e] + "Width", !0, f))) : (o += r.css(n, "padding" + k[e], !0, f),
                i !== "padding" && (o += r.css(n, "border" + k[e] + "Width", !0, f)));
            return o
        }
        function lf(n, t, i) {
            var o = !0
              , f = t === "width" ? n.offsetWidth : n.offsetHeight
              , e = g(n)
              , s = u.boxSizing && r.css(n, "boxSizing", !1, e) === "border-box";
            if (f <= 0 || f == null) {
                if (f = w(n, t, e),
                (f < 0 || f == null) && (f = n.style[t]),
                wt.test(f))
                    return f;
                o = s && (u.boxSizingReliable() || f === n.style[t]),
                f = parseFloat(f) || 0
            }
            return f + cf(n, t, i || (s ? "border" : "content"), o, e) + "px"
        }
        function o(n, t, i, r, u) {
            return new o.prototype.init(n,t,i,r,u)
        }
        function yf() {
            return t.setTimeout(function() {
                ft = undefined
            }),
            ft = r.now()
        }
        function kt(n, t) {
            var r, i = {
                height: n
            }, u = 0;
            for (t = t ? 1 : 0; u < 4; u += 2 - t)
                r = k[u],
                i["margin" + r] = i["padding" + r] = n;
            return t && (i.opacity = i.width = n),
            i
        }
        function pf(n, t, i) {
            for (var u, f = (c.tweeners[t] || []).concat(c.tweeners["*"]), r = 0, e = f.length; r < e; r++)
                if (u = f[r].call(i, t, n))
                    return u
        }
        function yo(n, t, i) {
            var f, a, p, v, s, w, h, b, l = this, y = {}, o = n.style, c = n.nodeType && ht(n), e = r._data(n, "fxshow");
            i.queue || (s = r._queueHooks(n, "fx"),
            s.unqueued == null && (s.unqueued = 0,
            w = s.empty.fire,
            s.empty.fire = function() {
                s.unqueued || w()
            }
            ),
            s.unqueued++,
            l.always(function() {
                l.always(function() {
                    s.unqueued--,
                    r.queue(n, "fx").length || s.empty.fire()
                })
            })),
            n.nodeType === 1 && ("height"in t || "width"in t) && (i.overflow = [o.overflow, o.overflowX, o.overflowY],
            h = r.css(n, "display"),
            b = h === "none" ? r._data(n, "olddisplay") || pt(n.nodeName) : h,
            b === "inline" && r.css(n, "float") === "none" && (u.inlineBlockNeedsLayout && pt(n.nodeName) !== "inline" ? o.zoom = 1 : o.display = "inline-block")),
            i.overflow && (o.overflow = "hidden",
            u.shrinkWrapBlocks() || l.always(function() {
                o.overflow = i.overflow[0],
                o.overflowX = i.overflow[1],
                o.overflowY = i.overflow[2]
            }));
            for (f in t)
                if (a = t[f],
                af.exec(a)) {
                    if (delete t[f],
                    p = p || a === "toggle",
                    a === (c ? "hide" : "show"))
                        if (a === "show" && e && e[f] !== undefined)
                            c = !0;
                        else
                            continue;
                    y[f] = e && e[f] || r.style(n, f)
                } else
                    h = undefined;
            if (r.isEmptyObject(y))
                (h === "none" ? pt(n.nodeName) : h) === "inline" && (o.display = h);
            else {
                e ? "hidden"in e && (c = e.hidden) : e = r._data(n, "fxshow", {}),
                p && (e.hidden = !c),
                c ? r(n).show() : l.done(function() {
                    r(n).hide()
                }),
                l.done(function() {
                    var t;
                    r._removeData(n, "fxshow");
                    for (t in y)
                        r.style(n, t, y[t])
                });
                for (f in y)
                    v = pf(c ? e[f] : 0, f, l),
                    f in e || (e[f] = v.start,
                    c && (v.end = v.start,
                    v.start = f === "width" || f === "height" ? 1 : 0))
            }
        }
        function po(n, t) {
            var i, f, e, u, o;
            for (i in n)
                if (f = r.camelCase(i),
                e = t[f],
                u = n[i],
                r.isArray(u) && (e = u[1],
                u = n[i] = u[0]),
                i !== f && (n[f] = u,
                delete n[i]),
                o = r.cssHooks[f],
                o && "expand"in o) {
                    u = o.expand(u),
                    delete n[f];
                    for (i in u)
                        i in n || (n[i] = u[i],
                        t[i] = e)
                } else
                    t[f] = e
        }
        function c(n, t, i) {
            var f, o, s = 0, a = c.prefilters.length, e = r.Deferred().always(function() {
                delete l.elem
            }), l = function() {
                if (o)
                    return !1;
                for (var s = ft || yf(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, f = u.tweens.length; r < f; r++)
                    u.tweens[r].run(i);
                return e.notifyWith(n, [u, i, t]),
                i < 1 && f ? t : (e.resolveWith(n, [u]),
                !1)
            }, u = e.promise({
                elem: n,
                props: r.extend({}, t),
                opts: r.extend(!0, {
                    specialEasing: {},
                    easing: r.easing._default
                }, i),
                originalProperties: t,
                originalOptions: i,
                startTime: ft || yf(),
                duration: i.duration,
                tweens: [],
                createTween: function(t, i) {
                    var f = r.Tween(n, u.opts, t, i, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(f),
                    f
                },
                stop: function(t) {
                    var i = 0
                      , r = t ? u.tweens.length : 0;
                    if (o)
                        return this;
                    for (o = !0; i < r; i++)
                        u.tweens[i].run(1);
                    return t ? (e.notifyWith(n, [u, 1, 0]),
                    e.resolveWith(n, [u, t])) : e.rejectWith(n, [u, t]),
                    this
                }
            }), h = u.props;
            for (po(h, u.opts.specialEasing); s < a; s++)
                if (f = c.prefilters[s].call(u, n, h, u.opts),
                f)
                    return r.isFunction(f.stop) && (r._queueHooks(u.elem, u.opts.queue).stop = r.proxy(f.stop, f)),
                    f;
            return r.map(h, pf, u),
            r.isFunction(u.opts.start) && u.opts.start.call(n, u),
            r.fx.timer(r.extend(l, {
                elem: n,
                anim: u,
                queue: u.opts.queue
            })),
            u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
        }
        function tt(n) {
            return r.attr(n, "class") || ""
        }
        function ue(n) {
            return function(t, i) {
                typeof t != "string" && (i = t,
                t = "*");
                var u, f = 0, e = t.toLowerCase().match(h) || [];
                if (r.isFunction(i))
                    while (u = e[f++])
                        u.charAt(0) === "+" ? (u = u.slice(1) || "*",
                        (n[u] = n[u] || []).unshift(i)) : (n[u] = n[u] || []).push(i)
            }
        }
        function fe(n, t, i, u) {
            function e(s) {
                var h;
                return f[s] = !0,
                r.each(n[s] || [], function(n, r) {
                    var s = r(t, i, u);
                    if (typeof s != "string" || o || f[s]) {
                        if (o)
                            return !(h = s)
                    } else
                        return t.dataTypes.unshift(s),
                        e(s),
                        !1
                }),
                h
            }
            var f = {}
              , o = n === ir;
            return e(t.dataTypes[0]) || !f["*"] && e("*")
        }
        function ur(n, t) {
            var u, i, f = r.ajaxSettings.flatOptions || {};
            for (i in t)
                t[i] !== undefined && ((f[i] ? n : u || (u = {}))[i] = t[i]);
            return u && r.extend(!0, n, u),
            n
        }
        function rs(n, t, i) {
            for (var o, e, u, f, s = n.contents, r = n.dataTypes; r[0] === "*"; )
                r.shift(),
                e === undefined && (e = n.mimeType || t.getResponseHeader("Content-Type"));
            if (e)
                for (f in s)
                    if (s[f] && s[f].test(e)) {
                        r.unshift(f);
                        break
                    }
            if (r[0]in i)
                u = r[0];
            else {
                for (f in i) {
                    if (!r[0] || n.converters[f + " " + r[0]]) {
                        u = f;
                        break
                    }
                    o || (o = f)
                }
                u = u || o
            }
            if (u)
                return u !== r[0] && r.unshift(u),
                i[u]
        }
        function us(n, t, i, r) {
            var h, u, f, s, e, o = {}, c = n.dataTypes.slice();
            if (c[1])
                for (f in n.converters)
                    o[f.toLowerCase()] = n.converters[f];
            for (u = c.shift(); u; )
                if (n.responseFields[u] && (i[n.responseFields[u]] = t),
                !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)),
                e = u,
                u = c.shift(),
                u)
                    if (u === "*")
                        u = e;
                    else if (e !== "*" && e !== u) {
                        if (f = o[e + " " + u] || o["* " + u],
                        !f)
                            for (h in o)
                                if (s = h.split(" "),
                                s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]],
                                f)) {
                                    f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0],
                                    c.unshift(s[1]));
                                    break
                                }
                        if (f !== !0)
                            if (f && n.throws)
                                t = f(t);
                            else
                                try {
                                    t = f(t)
                                } catch (l) {
                                    return {
                                        state: "parsererror",
                                        error: f ? l : "No conversion from " + e + " to " + u
                                    }
                                }
                    }
            return {
                state: "success",
                data: t
            }
        }
        function fs(n) {
            return n.style && n.style.display || r.css(n, "display")
        }
        function es(n) {
            if (!r.contains(n.ownerDocument || f, n))
                return !0;
            while (n && n.nodeType === 1) {
                if (fs(n) === "none" || n.type === "hidden")
                    return !0;
                n = n.parentNode
            }
            return !1
        }
        function fr(n, t, i, u) {
            var f;
            if (r.isArray(t))
                r.each(t, function(t, r) {
                    i || ss.test(n) ? u(n, r) : fr(n + "[" + (typeof r == "object" && r != null ? t : "") + "]", r, i, u)
                });
            else if (i || r.type(t) !== "object")
                u(n, t);
            else
                for (f in t)
                    fr(n + "[" + f + "]", t[f], i, u)
        }
        function er() {
            try {
                return new t.XMLHttpRequest
            } catch (n) {}
        }
        function oe() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (n) {}
        }
        function se(n) {
            return r.isWindow(n) ? n : n.nodeType === 9 ? n.defaultView || n.parentWindow : !1
        }
        var l = [], f = t.document, v = l.slice, hr = l.concat, ii = l.push, cr = l.indexOf, at = {}, le = at.toString, it = at.hasOwnProperty, u = {}, lr = "1.12.4", r = function(n, t) {
            return new r.fn.init(n,t)
        }, ae = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ve = /^-ms-/, ye = /-([\da-z])/gi, pe = function(n, t) {
            return t.toUpperCase()
        }, b, fi, pr, wr, br, kr, h, vt, nu, s, hu, ai, ct, wi, g, w, rf, ft, bt, af, vf, wf, bf, df, gf, gt, or, ti, sr, he, ce;
        r.fn = r.prototype = {
            jquery: lr,
            constructor: r,
            selector: "",
            length: 0,
            toArray: function() {
                return v.call(this)
            },
            get: function(n) {
                return n != null ? n < 0 ? this[n + this.length] : this[n] : v.call(this)
            },
            pushStack: function(n) {
                var t = r.merge(this.constructor(), n);
                return t.prevObject = this,
                t.context = this.context,
                t
            },
            each: function(n) {
                return r.each(this, n)
            },
            map: function(n) {
                return this.pushStack(r.map(this, function(t, i) {
                    return n.call(t, i, t)
                }))
            },
            slice: function() {
                return this.pushStack(v.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(n) {
                var i = this.length
                  , t = +n + (n < 0 ? i : 0);
                return this.pushStack(t >= 0 && t < i ? [this[t]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ii,
            sort: l.sort,
            splice: l.splice
        },
        r.extend = r.fn.extend = function() {
            var i, e, t, f, o, s, n = arguments[0] || {}, u = 1, c = arguments.length, h = !1;
            for (typeof n == "boolean" && (h = n,
            n = arguments[u] || {},
            u++),
            typeof n == "object" || r.isFunction(n) || (n = {}),
            u === c && (n = this,
            u--); u < c; u++)
                if ((o = arguments[u]) != null)
                    for (f in o)
                        (i = n[f],
                        t = o[f],
                        n !== t) && (h && t && (r.isPlainObject(t) || (e = r.isArray(t))) ? (e ? (e = !1,
                        s = i && r.isArray(i) ? i : []) : s = i && r.isPlainObject(i) ? i : {},
                        n[f] = r.extend(h, s, t)) : t !== undefined && (n[f] = t));
            return n
        }
        ,
        r.extend({
            expando: "jQuery" + (lr + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(n) {
                throw new Error(n);
            },
            noop: function() {},
            isFunction: function(n) {
                return r.type(n) === "function"
            },
            isArray: Array.isArray || function(n) {
                return r.type(n) === "array"
            }
            ,
            isWindow: function(n) {
                return n != null && n == n.window
            },
            isNumeric: function(n) {
                var t = n && n.toString();
                return !r.isArray(n) && t - parseFloat(t) + 1 >= 0
            },
            isEmptyObject: function(n) {
                var t;
                for (t in n)
                    return !1;
                return !0
            },
            isPlainObject: function(n) {
                var t;
                if (!n || r.type(n) !== "object" || n.nodeType || r.isWindow(n))
                    return !1;
                try {
                    if (n.constructor && !it.call(n, "constructor") && !it.call(n.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (i) {
                    return !1
                }
                if (!u.ownFirst)
                    for (t in n)
                        return it.call(n, t);
                for (t in n)
                    ;
                return t === undefined || it.call(n, t)
            },
            type: function(n) {
                return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? at[le.call(n)] || "object" : typeof n
            },
            globalEval: function(n) {
                n && r.trim(n) && (t.execScript || function(n) {
                    t.eval.call(t, n)
                }
                )(n)
            },
            camelCase: function(n) {
                return n.replace(ve, "ms-").replace(ye, pe)
            },
            nodeName: function(n, t) {
                return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(n, t) {
                var r, i = 0;
                if (ri(n)) {
                    for (r = n.length; i < r; i++)
                        if (t.call(n[i], i, n[i]) === !1)
                            break
                } else
                    for (i in n)
                        if (t.call(n[i], i, n[i]) === !1)
                            break;
                return n
            },
            trim: function(n) {
                return n == null ? "" : (n + "").replace(ae, "")
            },
            makeArray: function(n, t) {
                var i = t || [];
                return n != null && (ri(Object(n)) ? r.merge(i, typeof n == "string" ? [n] : n) : ii.call(i, n)),
                i
            },
            inArray: function(n, t, i) {
                var r;
                if (t) {
                    if (cr)
                        return cr.call(t, n, i);
                    for (r = t.length,
                    i = i ? i < 0 ? Math.max(0, r + i) : i : 0; i < r; i++)
                        if (i in t && t[i] === n)
                            return i
                }
                return -1
            },
            merge: function(n, t) {
                for (var r = +t.length, i = 0, u = n.length; i < r; )
                    n[u++] = t[i++];
                if (r !== r)
                    while (t[i] !== undefined)
                        n[u++] = t[i++];
                return n.length = u,
                n
            },
            grep: function(n, t, i) {
                for (var u, f = [], r = 0, e = n.length, o = !i; r < e; r++)
                    u = !t(n[r], r),
                    u !== o && f.push(n[r]);
                return f
            },
            map: function(n, t, i) {
                var e, u, r = 0, f = [];
                if (ri(n))
                    for (e = n.length; r < e; r++)
                        u = t(n[r], r, i),
                        u != null && f.push(u);
                else
                    for (r in n)
                        u = t(n[r], r, i),
                        u != null && f.push(u);
                return hr.apply([], f)
            },
            guid: 1,
            proxy: function(n, t) {
                var u, i, f;
                return (typeof t == "string" && (f = n[t],
                t = n,
                n = f),
                !r.isFunction(n)) ? undefined : (u = v.call(arguments, 2),
                i = function() {
                    return n.apply(t || this, u.concat(v.call(arguments)))
                }
                ,
                i.guid = n.guid = n.guid || r.guid++,
                i)
            },
            now: function() {
                return +new Date
            },
            support: u
        }),
        typeof Symbol == "function" && (r.fn[Symbol.iterator] = l[Symbol.iterator]),
        r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(n, t) {
            at["[object " + t + "]"] = t.toLowerCase()
        }),
        b = function(n) {
            function u(n, t, r, u) {
                var l, w, a, s, nt, d, y, g, p = t && t.ownerDocument, v = t ? t.nodeType : 9;
                if (r = r || [],
                typeof n != "string" || !n || v !== 1 && v !== 9 && v !== 11)
                    return r;
                if (!u && ((t ? t.ownerDocument || t : c) !== i && b(t),
                t = t || i,
                h)) {
                    if (v !== 11 && (d = sr.exec(n)))
                        if (l = d[1]) {
                            if (v === 9)
                                if (a = t.getElementById(l)) {
                                    if (a.id === l)
                                        return r.push(a),
                                        r
                                } else
                                    return r;
                            else if (p && (a = p.getElementById(l)) && et(t, a) && a.id === l)
                                return r.push(a),
                                r
                        } else {
                            if (d[2])
                                return k.apply(r, t.getElementsByTagName(n)),
                                r;
                            if ((l = d[3]) && f.getElementsByClassName && t.getElementsByClassName)
                                return k.apply(r, t.getElementsByClassName(l)),
                                r
                        }
                    if (f.qsa && !lt[n + " "] && (!o || !o.test(n))) {
                        if (v !== 1)
                            p = t,
                            g = n;
                        else if (t.nodeName.toLowerCase() !== "object") {
                            for ((s = t.getAttribute("id")) ? s = s.replace(hr, "\\$&") : t.setAttribute("id", s = e),
                            y = ft(n),
                            w = y.length,
                            nt = yi.test(s) ? "#" + s : "[id='" + s + "']"; w--; )
                                y[w] = nt + " " + yt(y[w]);
                            g = y.join(","),
                            p = gt.test(n) && ii(t.parentNode) || t
                        }
                        if (g)
                            try {
                                return k.apply(r, p.querySelectorAll(g)),
                                r
                            } catch (tt) {} finally {
                                s === e && t.removeAttribute("id")
                            }
                    }
                }
                return si(n.replace(at, "$1"), t, r, u)
            }
            function ni() {
                function n(r, u) {
                    return i.push(r + " ") > t.cacheLength && delete n[i.shift()],
                    n[r + " "] = u
                }
                var i = [];
                return n
            }
            function l(n) {
                return n[e] = !0,
                n
            }
            function a(n) {
                var t = i.createElement("div");
                try {
                    return !!n(t)
                } catch (r) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t),
                    t = null
                }
            }
            function ti(n, i) {
                for (var r = n.split("|"), u = r.length; u--; )
                    t.attrHandle[r[u]] = i
            }
            function wi(n, t) {
                var i = t && n
                  , r = i && n.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || li) - (~n.sourceIndex || li);
                if (r)
                    return r;
                if (i)
                    while (i = i.nextSibling)
                        if (i === t)
                            return -1;
                return n ? 1 : -1
            }
            function cr(n) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return i === "input" && t.type === n
                }
            }
            function lr(n) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return (i === "input" || i === "button") && t.type === n
                }
            }
            function it(n) {
                return l(function(t) {
                    return t = +t,
                    l(function(i, r) {
                        for (var u, f = n([], i.length, t), e = f.length; e--; )
                            i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                    })
                })
            }
            function ii(n) {
                return n && typeof n.getElementsByTagName != "undefined" && n
            }
            function bi() {}
            function yt(n) {
                for (var t = 0, r = n.length, i = ""; t < r; t++)
                    i += n[t].value;
                return i
            }
            function ri(n, t, i) {
                var r = t.dir
                  , u = i && r === "parentNode"
                  , f = ki++;
                return t.first ? function(t, i, f) {
                    while (t = t[r])
                        if (t.nodeType === 1 || u)
                            return n(t, i, f)
                }
                : function(t, i, o) {
                    var s, h, c, l = [v, f];
                    if (o) {
                        while (t = t[r])
                            if ((t.nodeType === 1 || u) && n(t, i, o))
                                return !0
                    } else
                        while (t = t[r])
                            if (t.nodeType === 1 || u) {
                                if (c = t[e] || (t[e] = {}),
                                h = c[t.uniqueID] || (c[t.uniqueID] = {}),
                                (s = h[r]) && s[0] === v && s[1] === f)
                                    return l[2] = s[2];
                                if (h[r] = l,
                                l[2] = n(t, i, o))
                                    return !0
                            }
                }
            }
            function ui(n) {
                return n.length > 1 ? function(t, i, r) {
                    for (var u = n.length; u--; )
                        if (!n[u](t, i, r))
                            return !1;
                    return !0
                }
                : n[0]
            }
            function ar(n, t, i) {
                for (var r = 0, f = t.length; r < f; r++)
                    u(n, t[r], i);
                return i
            }
            function pt(n, t, i, r, u) {
                for (var e, o = [], f = 0, s = n.length, h = t != null; f < s; f++)
                    (e = n[f]) && (!i || i(e, r, u)) && (o.push(e),
                    h && t.push(f));
                return o
            }
            function fi(n, t, i, r, u, f) {
                return r && !r[e] && (r = fi(r)),
                u && !u[e] && (u = fi(u, f)),
                l(function(f, e, o, s) {
                    var l, c, a, p = [], y = [], w = e.length, b = f || ar(t || "*", o.nodeType ? [o] : o, []), v = n && (f || !t) ? pt(b, p, n, o, s) : b, h = i ? u || (f ? n : w || r) ? [] : e : v;
                    if (i && i(v, h, o, s),
                    r)
                        for (l = pt(h, y),
                        r(l, [], o, s),
                        c = l.length; c--; )
                            (a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                    if (f) {
                        if (u || n) {
                            if (u) {
                                for (l = [],
                                c = h.length; c--; )
                                    (a = h[c]) && l.push(v[c] = a);
                                u(null, h = [], l, s)
                            }
                            for (c = h.length; c--; )
                                (a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                        }
                    } else
                        h = pt(h === e ? h.splice(w, h.length) : h),
                        u ? u(null, e, h, s) : k.apply(e, h)
                })
            }
            function ei(n) {
                for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = ri(function(n) {
                    return n === o
                }, c, !0), a = ri(function(n) {
                    return nt(o, n) > -1
                }, c, !0), f = [function(n, t, i) {
                    var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                    return o = null,
                    r
                }
                ]; i < s; i++)
                    if (u = t.relative[n[i].type])
                        f = [ri(ui(f), u)];
                    else {
                        if (u = t.filter[n[i].type].apply(null, n[i].matches),
                        u[e]) {
                            for (r = ++i; r < s; r++)
                                if (t.relative[n[r].type])
                                    break;
                            return fi(i > 1 && ui(f), i > 1 && yt(n.slice(0, i - 1).concat({
                                value: n[i - 2].type === " " ? "*" : ""
                            })).replace(at, "$1"), u, i < r && ei(n.slice(i, r)), r < s && ei(n = n.slice(r)), r < s && yt(n))
                        }
                        f.push(u)
                    }
                return ui(f)
            }
            function vr(n, r) {
                var f = r.length > 0
                  , e = n.length > 0
                  , o = function(o, s, c, l, a) {
                    var y, nt, d, g = 0, p = "0", tt = o && [], w = [], it = ht, rt = o || e && t.find.TAG("*", a), ut = v += it == null ? 1 : Math.random() || .1, ft = rt.length;
                    for (a && (ht = s === i || s || a); p !== ft && (y = rt[p]) != null; p++) {
                        if (e && y) {
                            for (nt = 0,
                            s || y.ownerDocument === i || (b(y),
                            c = !h); d = n[nt++]; )
                                if (d(y, s || i, c)) {
                                    l.push(y);
                                    break
                                }
                            a && (v = ut)
                        }
                        f && ((y = !d && y) && g--,
                        o && tt.push(y))
                    }
                    if (g += p,
                    f && p !== g) {
                        for (nt = 0; d = r[nt++]; )
                            d(tt, w, s, c);
                        if (o) {
                            if (g > 0)
                                while (p--)
                                    tt[p] || w[p] || (w[p] = gi.call(l));
                            w = pt(w)
                        }
                        k.apply(l, w),
                        a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l)
                    }
                    return a && (v = ut,
                    ht = it),
                    tt
                };
                return f ? l(o) : o
            }
            var rt, f, t, st, oi, ft, wt, si, ht, w, ut, b, i, s, h, o, d, ct, et, e = "sizzle" + 1 * new Date, c = n.document, v = 0, ki = 0, hi = ni(), ci = ni(), lt = ni(), bt = function(n, t) {
                return n === t && (ut = !0),
                0
            }, li = -2147483648, di = {}.hasOwnProperty, g = [], gi = g.pop, nr = g.push, k = g.push, ai = g.slice, nt = function(n, t) {
                for (var i = 0, r = n.length; i < r; i++)
                    if (n[i] === t)
                        return i;
                return -1
            }, kt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", r = "[\\x20\\t\\r\\n\\f]", tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", vi = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]", dt = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + vi + ")*)|.*)\\)|)", tr = new RegExp(r + "+","g"), at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$","g"), ir = new RegExp("^" + r + "*," + r + "*"), rr = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"), ur = new RegExp("=" + r + "*([^\\]'\"]*?)" + r + "*\\]","g"), fr = new RegExp(dt), yi = new RegExp("^" + tt + "$"), vt = {
                ID: new RegExp("^#(" + tt + ")"),
                CLASS: new RegExp("^\\.(" + tt + ")"),
                TAG: new RegExp("^(" + tt + "|[*])"),
                ATTR: new RegExp("^" + vi),
                PSEUDO: new RegExp("^" + dt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)","i"),
                bool: new RegExp("^(?:" + kt + ")$","i"),
                needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)","i")
            }, er = /^(?:input|select|textarea|button)$/i, or = /^h\d$/i, ot = /^[^{]+\{\s*\[native \w/, sr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, gt = /[+~]/, hr = /'|\\/g, y = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)","ig"), p = function(n, t, i) {
                var r = "0x" + t - 65536;
                return r !== r || i ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
            }, pi = function() {
                b()
            };
            try {
                k.apply(g = ai.call(c.childNodes), c.childNodes),
                g[c.childNodes.length].nodeType
            } catch (yr) {
                k = {
                    apply: g.length ? function(n, t) {
                        nr.apply(n, ai.call(t))
                    }
                    : function(n, t) {
                        for (var i = n.length, r = 0; n[i++] = t[r++]; )
                            ;
                        n.length = i - 1
                    }
                }
            }
            f = u.support = {},
            oi = u.isXML = function(n) {
                var t = n && (n.ownerDocument || n).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            }
            ,
            b = u.setDocument = function(n) {
                var v, u, l = n ? n.ownerDocument || n : c;
                return l === i || l.nodeType !== 9 || !l.documentElement ? i : (i = l,
                s = i.documentElement,
                h = !oi(i),
                (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", pi, !1) : u.attachEvent && u.attachEvent("onunload", pi)),
                f.attributes = a(function(n) {
                    return n.className = "i",
                    !n.getAttribute("className")
                }),
                f.getElementsByTagName = a(function(n) {
                    return n.appendChild(i.createComment("")),
                    !n.getElementsByTagName("*").length
                }),
                f.getElementsByClassName = ot.test(i.getElementsByClassName),
                f.getById = a(function(n) {
                    return s.appendChild(n).id = e,
                    !i.getElementsByName || !i.getElementsByName(e).length
                }),
                f.getById ? (t.find.ID = function(n, t) {
                    if (typeof t.getElementById != "undefined" && h) {
                        var i = t.getElementById(n);
                        return i ? [i] : []
                    }
                }
                ,
                t.filter.ID = function(n) {
                    var t = n.replace(y, p);
                    return function(n) {
                        return n.getAttribute("id") === t
                    }
                }
                ) : (delete t.find.ID,
                t.filter.ID = function(n) {
                    var t = n.replace(y, p);
                    return function(n) {
                        var i = typeof n.getAttributeNode != "undefined" && n.getAttributeNode("id");
                        return i && i.value === t
                    }
                }
                ),
                t.find.TAG = f.getElementsByTagName ? function(n, t) {
                    return typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName(n) : f.qsa ? t.querySelectorAll(n) : void 0
                }
                : function(n, t) {
                    var i, r = [], f = 0, u = t.getElementsByTagName(n);
                    if (n === "*") {
                        while (i = u[f++])
                            i.nodeType === 1 && r.push(i);
                        return r
                    }
                    return u
                }
                ,
                t.find.CLASS = f.getElementsByClassName && function(n, t) {
                    if (typeof t.getElementsByClassName != "undefined" && h)
                        return t.getElementsByClassName(n)
                }
                ,
                d = [],
                o = [],
                (f.qsa = ot.test(i.querySelectorAll)) && (a(function(n) {
                    s.appendChild(n).innerHTML = "<a id='" + e + "'><\/a><select id='" + e + "-\r\\' msallowcapture=''><option selected=''><\/option><\/select>",
                    n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")"),
                    n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + kt + ")"),
                    n.querySelectorAll("[id~=" + e + "-]").length || o.push("~="),
                    n.querySelectorAll(":checked").length || o.push(":checked"),
                    n.querySelectorAll("a#" + e + "+*").length || o.push(".#.+[+~]")
                }),
                a(function(n) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden"),
                    n.appendChild(t).setAttribute("name", "D"),
                    n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?="),
                    n.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled"),
                    n.querySelectorAll("*,:x"),
                    o.push(",.*:")
                })),
                (f.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && a(function(n) {
                    f.disconnectedMatch = ct.call(n, "div"),
                    ct.call(n, "[s!='']:x"),
                    d.push("!=", dt)
                }),
                o = o.length && new RegExp(o.join("|")),
                d = d.length && new RegExp(d.join("|")),
                v = ot.test(s.compareDocumentPosition),
                et = v || ot.test(s.contains) ? function(n, t) {
                    var r = n.nodeType === 9 ? n.documentElement : n
                      , i = t && t.parentNode;
                    return n === i || !!(i && i.nodeType === 1 && (r.contains ? r.contains(i) : n.compareDocumentPosition && n.compareDocumentPosition(i) & 16))
                }
                : function(n, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === n)
                                return !0;
                    return !1
                }
                ,
                bt = v ? function(n, t) {
                    if (n === t)
                        return ut = !0,
                        0;
                    var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
                    return r ? r : (r = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1,
                    r & 1 || !f.sortDetached && t.compareDocumentPosition(n) === r) ? n === i || n.ownerDocument === c && et(c, n) ? -1 : t === i || t.ownerDocument === c && et(c, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : r & 4 ? -1 : 1
                }
                : function(n, t) {
                    if (n === t)
                        return ut = !0,
                        0;
                    var r, u = 0, o = n.parentNode, s = t.parentNode, f = [n], e = [t];
                    if (o && s) {
                        if (o === s)
                            return wi(n, t)
                    } else
                        return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                    for (r = n; r = r.parentNode; )
                        f.unshift(r);
                    for (r = t; r = r.parentNode; )
                        e.unshift(r);
                    while (f[u] === e[u])
                        u++;
                    return u ? wi(f[u], e[u]) : f[u] === c ? -1 : e[u] === c ? 1 : 0
                }
                ,
                i)
            }
            ,
            u.matches = function(n, t) {
                return u(n, null, null, t)
            }
            ,
            u.matchesSelector = function(n, t) {
                if ((n.ownerDocument || n) !== i && b(n),
                t = t.replace(ur, "='$1']"),
                f.matchesSelector && h && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t)))
                    try {
                        var r = ct.call(n, t);
                        if (r || f.disconnectedMatch || n.document && n.document.nodeType !== 11)
                            return r
                    } catch (e) {}
                return u(t, i, null, [n]).length > 0
            }
            ,
            u.contains = function(n, t) {
                return (n.ownerDocument || n) !== i && b(n),
                et(n, t)
            }
            ,
            u.attr = function(n, r) {
                (n.ownerDocument || n) !== i && b(n);
                var e = t.attrHandle[r.toLowerCase()]
                  , u = e && di.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !h) : undefined;
                return u !== undefined ? u : f.attributes || !h ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null
            }
            ,
            u.error = function(n) {
                throw new Error("Syntax error, unrecognized expression: " + n);
            }
            ,
            u.uniqueSort = function(n) {
                var r, u = [], t = 0, i = 0;
                if (ut = !f.detectDuplicates,
                w = !f.sortStable && n.slice(0),
                n.sort(bt),
                ut) {
                    while (r = n[i++])
                        r === n[i] && (t = u.push(i));
                    while (t--)
                        n.splice(u[t], 1)
                }
                return w = null,
                n
            }
            ,
            st = u.getText = function(n) {
                var r, i = "", u = 0, t = n.nodeType;
                if (t) {
                    if (t === 1 || t === 9 || t === 11) {
                        if (typeof n.textContent == "string")
                            return n.textContent;
                        for (n = n.firstChild; n; n = n.nextSibling)
                            i += st(n)
                    } else if (t === 3 || t === 4)
                        return n.nodeValue
                } else
                    while (r = n[u++])
                        i += st(r);
                return i
            }
            ,
            t = u.selectors = {
                cacheLength: 50,
                createPseudo: l,
                match: vt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(n) {
                        return n[1] = n[1].replace(y, p),
                        n[3] = (n[3] || n[4] || n[5] || "").replace(y, p),
                        n[2] === "~=" && (n[3] = " " + n[3] + " "),
                        n.slice(0, 4)
                    },
                    CHILD: function(n) {
                        return n[1] = n[1].toLowerCase(),
                        n[1].slice(0, 3) === "nth" ? (n[3] || u.error(n[0]),
                        n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * (n[3] === "even" || n[3] === "odd")),
                        n[5] = +(n[7] + n[8] || n[3] === "odd")) : n[3] && u.error(n[0]),
                        n
                    },
                    PSEUDO: function(n) {
                        var i, t = !n[6] && n[2];
                        return vt.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && fr.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i),
                        n[2] = t.slice(0, i)),
                        n.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(n) {
                        var t = n.replace(y, p).toLowerCase();
                        return n === "*" ? function() {
                            return !0
                        }
                        : function(n) {
                            return n.nodeName && n.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(n) {
                        var t = hi[n + " "];
                        return t || (t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) && hi(n, function(n) {
                            return t.test(typeof n.className == "string" && n.className || typeof n.getAttribute != "undefined" && n.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, t, i) {
                        return function(r) {
                            var f = u.attr(r, n);
                            return f == null ? t === "!=" : t ? (f += "",
                            t === "=" ? f === i : t === "!=" ? f !== i : t === "^=" ? i && f.indexOf(i) === 0 : t === "*=" ? i && f.indexOf(i) > -1 : t === "$=" ? i && f.slice(-i.length) === i : t === "~=" ? (" " + f.replace(tr, " ") + " ").indexOf(i) > -1 : t === "|=" ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                        }
                    },
                    CHILD: function(n, t, i, r, u) {
                        var s = n.slice(0, 3) !== "nth"
                          , o = n.slice(-4) !== "last"
                          , f = t === "of-type";
                        return r === 1 && u === 0 ? function(n) {
                            return !!n.parentNode
                        }
                        : function(t, i, h) {
                            var p, w, y, c, a, b, k = s !== o ? "nextSibling" : "previousSibling", d = t.parentNode, nt = f && t.nodeName.toLowerCase(), g = !h && !f, l = !1;
                            if (d) {
                                if (s) {
                                    while (k) {
                                        for (c = t; c = c[k]; )
                                            if (f ? c.nodeName.toLowerCase() === nt : c.nodeType === 1)
                                                return !1;
                                        b = k = n === "only" && !b && "nextSibling"
                                    }
                                    return !0
                                }
                                if (b = [o ? d.firstChild : d.lastChild],
                                o && g) {
                                    for (c = d,
                                    y = c[e] || (c[e] = {}),
                                    w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                                    p = w[n] || [],
                                    a = p[0] === v && p[1],
                                    l = a && p[2],
                                    c = a && d.childNodes[a]; c = ++a && c && c[k] || (l = a = 0) || b.pop(); )
                                        if (c.nodeType === 1 && ++l && c === t) {
                                            w[n] = [v, a, l];
                                            break
                                        }
                                } else if (g && (c = t,
                                y = c[e] || (c[e] = {}),
                                w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                                p = w[n] || [],
                                a = p[0] === v && p[1],
                                l = a),
                                l === !1)
                                    while (c = ++a && c && c[k] || (l = a = 0) || b.pop())
                                        if ((f ? c.nodeName.toLowerCase() === nt : c.nodeType === 1) && ++l && (g && (y = c[e] || (c[e] = {}),
                                        w = y[c.uniqueID] || (y[c.uniqueID] = {}),
                                        w[n] = [v, l]),
                                        c === t))
                                            break;
                                return l -= u,
                                l === r || l % r == 0 && l / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(n, i) {
                        var f, r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
                        return r[e] ? r(i) : r.length > 1 ? (f = [n, n, "", i],
                        t.setFilters.hasOwnProperty(n.toLowerCase()) ? l(function(n, t) {
                            for (var u, f = r(n, i), e = f.length; e--; )
                                u = nt(n, f[e]),
                                n[u] = !(t[u] = f[e])
                        }) : function(n) {
                            return r(n, 0, f)
                        }
                        ) : r
                    }
                },
                pseudos: {
                    not: l(function(n) {
                        var t = []
                          , r = []
                          , i = wt(n.replace(at, "$1"));
                        return i[e] ? l(function(n, t, r, u) {
                            for (var e, o = i(n, null, u, []), f = n.length; f--; )
                                (e = o[f]) && (n[f] = !(t[f] = e))
                        }) : function(n, u, f) {
                            return t[0] = n,
                            i(t, null, f, r),
                            t[0] = null,
                            !r.pop()
                        }
                    }),
                    has: l(function(n) {
                        return function(t) {
                            return u(n, t).length > 0
                        }
                    }),
                    contains: l(function(n) {
                        return n = n.replace(y, p),
                        function(t) {
                            return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
                        }
                    }),
                    lang: l(function(n) {
                        return yi.test(n || "") || u.error("unsupported lang: " + n),
                        n = n.replace(y, p).toLowerCase(),
                        function(t) {
                            var i;
                            do
                                if (i = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                    return i = i.toLowerCase(),
                                    i === n || i.indexOf(n + "-") === 0;
                            while ((t = t.parentNode) && t.nodeType === 1);return !1
                        }
                    }),
                    target: function(t) {
                        var i = n.location && n.location.hash;
                        return i && i.slice(1) === t.id
                    },
                    root: function(n) {
                        return n === s
                    },
                    focus: function(n) {
                        return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                    },
                    enabled: function(n) {
                        return n.disabled === !1
                    },
                    disabled: function(n) {
                        return n.disabled === !0
                    },
                    checked: function(n) {
                        var t = n.nodeName.toLowerCase();
                        return t === "input" && !!n.checked || t === "option" && !!n.selected
                    },
                    selected: function(n) {
                        return n.parentNode && n.parentNode.selectedIndex,
                        n.selected === !0
                    },
                    empty: function(n) {
                        for (n = n.firstChild; n; n = n.nextSibling)
                            if (n.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(n) {
                        return !t.pseudos.empty(n)
                    },
                    header: function(n) {
                        return or.test(n.nodeName)
                    },
                    input: function(n) {
                        return er.test(n.nodeName)
                    },
                    button: function(n) {
                        var t = n.nodeName.toLowerCase();
                        return t === "input" && n.type === "button" || t === "button"
                    },
                    text: function(n) {
                        var t;
                        return n.nodeName.toLowerCase() === "input" && n.type === "text" && ((t = n.getAttribute("type")) == null || t.toLowerCase() === "text")
                    },
                    first: it(function() {
                        return [0]
                    }),
                    last: it(function(n, t) {
                        return [t - 1]
                    }),
                    eq: it(function(n, t, i) {
                        return [i < 0 ? i + t : i]
                    }),
                    even: it(function(n, t) {
                        for (var i = 0; i < t; i += 2)
                            n.push(i);
                        return n
                    }),
                    odd: it(function(n, t) {
                        for (var i = 1; i < t; i += 2)
                            n.push(i);
                        return n
                    }),
                    lt: it(function(n, t, i) {
                        for (var r = i < 0 ? i + t : i; --r >= 0; )
                            n.push(r);
                        return n
                    }),
                    gt: it(function(n, t, i) {
                        for (var r = i < 0 ? i + t : i; ++r < t; )
                            n.push(r);
                        return n
                    })
                }
            },
            t.pseudos.nth = t.pseudos.eq;
            for (rt in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                t.pseudos[rt] = cr(rt);
            for (rt in {
                submit: !0,
                reset: !0
            })
                t.pseudos[rt] = lr(rt);
            return bi.prototype = t.filters = t.pseudos,
            t.setFilters = new bi,
            ft = u.tokenize = function(n, i) {
                var e, f, s, o, r, h, c, l = ci[n + " "];
                if (l)
                    return i ? 0 : l.slice(0);
                for (r = n,
                h = [],
                c = t.preFilter; r; ) {
                    (!e || (f = ir.exec(r))) && (f && (r = r.slice(f[0].length) || r),
                    h.push(s = [])),
                    e = !1,
                    (f = rr.exec(r)) && (e = f.shift(),
                    s.push({
                        value: e,
                        type: f[0].replace(at, " ")
                    }),
                    r = r.slice(e.length));
                    for (o in t.filter)
                        (f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && (e = f.shift(),
                        s.push({
                            value: e,
                            type: o,
                            matches: f
                        }),
                        r = r.slice(e.length));
                    if (!e)
                        break
                }
                return i ? r.length : r ? u.error(n) : ci(n, h).slice(0)
            }
            ,
            wt = u.compile = function(n, t) {
                var r, u = [], f = [], i = lt[n + " "];
                if (!i) {
                    for (t || (t = ft(n)),
                    r = t.length; r--; )
                        i = ei(t[r]),
                        i[e] ? u.push(i) : f.push(i);
                    i = lt(n, vr(f, u)),
                    i.selector = n
                }
                return i
            }
            ,
            si = u.select = function(n, i, r, u) {
                var s, e, o, a, v, l = typeof n == "function" && n, c = !u && ft(n = l.selector || n);
                if (r = r || [],
                c.length === 1) {
                    if (e = c[0] = c[0].slice(0),
                    e.length > 2 && (o = e[0]).type === "ID" && f.getById && i.nodeType === 9 && h && t.relative[e[1].type]) {
                        if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0],
                        i)
                            l && (i = i.parentNode);
                        else
                            return r;
                        n = n.slice(e.shift().value.length)
                    }
                    for (s = vt.needsContext.test(n) ? 0 : e.length; s--; ) {
                        if (o = e[s],
                        t.relative[a = o.type])
                            break;
                        if ((v = t.find[a]) && (u = v(o.matches[0].replace(y, p), gt.test(e[0].type) && ii(i.parentNode) || i))) {
                            if (e.splice(s, 1),
                            n = u.length && yt(e),
                            !n)
                                return k.apply(r, u),
                                r;
                            break
                        }
                    }
                }
                return (l || wt(n, c))(u, i, !h, r, !i || gt.test(n) && ii(i.parentNode) || i),
                r
            }
            ,
            f.sortStable = e.split("").sort(bt).join("") === e,
            f.detectDuplicates = !!ut,
            b(),
            f.sortDetached = a(function(n) {
                return n.compareDocumentPosition(i.createElement("div")) & 1
            }),
            a(function(n) {
                return n.innerHTML = "<a href='#'><\/a>",
                n.firstChild.getAttribute("href") === "#"
            }) || ti("type|href|height|width", function(n, t, i) {
                if (!i)
                    return n.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
            }),
            f.attributes && a(function(n) {
                return n.innerHTML = "<input/>",
                n.firstChild.setAttribute("value", ""),
                n.firstChild.getAttribute("value") === ""
            }) || ti("value", function(n, t, i) {
                if (!i && n.nodeName.toLowerCase() === "input")
                    return n.defaultValue
            }),
            a(function(n) {
                return n.getAttribute("disabled") == null
            }) || ti(kt, function(n, t, i) {
                var r;
                if (!i)
                    return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
            }),
            u
        }(t),
        r.find = b,
        r.expr = b.selectors,
        r.expr[":"] = r.expr.pseudos,
        r.uniqueSort = r.unique = b.uniqueSort,
        r.text = b.getText,
        r.isXMLDoc = b.isXML,
        r.contains = b.contains;
        var rt = function(n, t, i) {
            for (var u = [], f = i !== undefined; (n = n[t]) && n.nodeType !== 9; )
                if (n.nodeType === 1) {
                    if (f && r(n).is(i))
                        break;
                    u.push(n)
                }
            return u
        }
          , ar = function(n, t) {
            for (var i = []; n; n = n.nextSibling)
                n.nodeType === 1 && n !== t && i.push(n);
            return i
        }
          , vr = r.expr.match.needsContext
          , yr = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
          , we = /^.[^:#\[\.,]*$/;
        r.filter = function(n, t, i) {
            var u = t[0];
            return i && (n = ":not(" + n + ")"),
            t.length === 1 && u.nodeType === 1 ? r.find.matchesSelector(u, n) ? [u] : [] : r.find.matches(n, r.grep(t, function(n) {
                return n.nodeType === 1
            }))
        }
        ,
        r.fn.extend({
            find: function(n) {
                var t, i = [], u = this, f = u.length;
                if (typeof n != "string")
                    return this.pushStack(r(n).filter(function() {
                        for (t = 0; t < f; t++)
                            if (r.contains(u[t], this))
                                return !0
                    }));
                for (t = 0; t < f; t++)
                    r.find(n, u[t], i);
                return i = this.pushStack(f > 1 ? r.unique(i) : i),
                i.selector = this.selector ? this.selector + " " + n : n,
                i
            },
            filter: function(n) {
                return this.pushStack(ui(this, n || [], !1))
            },
            not: function(n) {
                return this.pushStack(ui(this, n || [], !0))
            },
            is: function(n) {
                return !!ui(this, typeof n == "string" && vr.test(n) ? r(n) : n || [], !1).length
            }
        }),
        pr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        wr = r.fn.init = function(n, t, i) {
            var u, e;
            if (!n)
                return this;
            if (i = i || fi,
            typeof n == "string") {
                if (u = n.charAt(0) === "<" && n.charAt(n.length - 1) === ">" && n.length >= 3 ? [null, n, null] : pr.exec(n),
                u && (u[1] || !t)) {
                    if (u[1]) {
                        if (t = t instanceof r ? t[0] : t,
                        r.merge(this, r.parseHTML(u[1], t && t.nodeType ? t.ownerDocument || t : f, !0)),
                        yr.test(u[1]) && r.isPlainObject(t))
                            for (u in t)
                                r.isFunction(this[u]) ? this[u](t[u]) : this.attr(u, t[u]);
                        return this
                    }
                    if (e = f.getElementById(u[2]),
                    e && e.parentNode) {
                        if (e.id !== u[2])
                            return fi.find(n);
                        this.length = 1,
                        this[0] = e
                    }
                    return this.context = f,
                    this.selector = n,
                    this
                }
                return !t || t.jquery ? (t || i).find(n) : this.constructor(t).find(n)
            }
            return n.nodeType ? (this.context = this[0] = n,
            this.length = 1,
            this) : r.isFunction(n) ? typeof i.ready != "undefined" ? i.ready(n) : n(r) : (n.selector !== undefined && (this.selector = n.selector,
            this.context = n.context),
            r.makeArray(n, this))
        }
        ,
        wr.prototype = r.fn,
        fi = r(f),
        br = /^(?:parents|prev(?:Until|All))/,
        kr = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        },
        r.fn.extend({
            has: function(n) {
                var t, i = r(n, this), u = i.length;
                return this.filter(function() {
                    for (t = 0; t < u; t++)
                        if (r.contains(this, i[t]))
                            return !0
                })
            },
            closest: function(n, t) {
                for (var i, f = 0, o = this.length, u = [], e = vr.test(n) || typeof n != "string" ? r(n, t || this.context) : 0; f < o; f++)
                    for (i = this[f]; i && i !== t; i = i.parentNode)
                        if (i.nodeType < 11 && (e ? e.index(i) > -1 : i.nodeType === 1 && r.find.matchesSelector(i, n))) {
                            u.push(i);
                            break
                        }
                return this.pushStack(u.length > 1 ? r.uniqueSort(u) : u)
            },
            index: function(n) {
                return n ? typeof n == "string" ? r.inArray(this[0], r(n)) : r.inArray(n.jquery ? n[0] : n, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(n, t) {
                return this.pushStack(r.uniqueSort(r.merge(this.get(), r(n, t))))
            },
            addBack: function(n) {
                return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
            }
        }),
        r.each({
            parent: function(n) {
                var t = n.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function(n) {
                return rt(n, "parentNode")
            },
            parentsUntil: function(n, t, i) {
                return rt(n, "parentNode", i)
            },
            next: function(n) {
                return dr(n, "nextSibling")
            },
            prev: function(n) {
                return dr(n, "previousSibling")
            },
            nextAll: function(n) {
                return rt(n, "nextSibling")
            },
            prevAll: function(n) {
                return rt(n, "previousSibling")
            },
            nextUntil: function(n, t, i) {
                return rt(n, "nextSibling", i)
            },
            prevUntil: function(n, t, i) {
                return rt(n, "previousSibling", i)
            },
            siblings: function(n) {
                return ar((n.parentNode || {}).firstChild, n)
            },
            children: function(n) {
                return ar(n.firstChild)
            },
            contents: function(n) {
                return r.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : r.merge([], n.childNodes)
            }
        }, function(n, t) {
            r.fn[n] = function(i, u) {
                var f = r.map(this, t, i);
                return n.slice(-5) !== "Until" && (u = i),
                u && typeof u == "string" && (f = r.filter(u, f)),
                this.length > 1 && (kr[n] || (f = r.uniqueSort(f)),
                br.test(n) && (f = f.reverse())),
                this.pushStack(f)
            }
        }),
        h = /\S+/g,
        r.Callbacks = function(n) {
            n = typeof n == "string" ? be(n) : r.extend({}, n);
            var e, i, h, f, t = [], o = [], u = -1, c = function() {
                for (f = n.once,
                h = e = !0; o.length; u = -1)
                    for (i = o.shift(); ++u < t.length; )
                        t[u].apply(i[0], i[1]) === !1 && n.stopOnFalse && (u = t.length,
                        i = !1);
                n.memory || (i = !1),
                e = !1,
                f && (t = i ? [] : "")
            }, s = {
                add: function() {
                    return t && (i && !e && (u = t.length - 1,
                    o.push(i)),
                    function f(i) {
                        r.each(i, function(i, u) {
                            r.isFunction(u) ? n.unique && s.has(u) || t.push(u) : u && u.length && r.type(u) !== "string" && f(u)
                        })
                    }(arguments),
                    i && !e && c()),
                    this
                },
                remove: function() {
                    return r.each(arguments, function(n, i) {
                        for (var f; (f = r.inArray(i, t, f)) > -1; )
                            t.splice(f, 1),
                            f <= u && u--
                    }),
                    this
                },
                has: function(n) {
                    return n ? r.inArray(n, t) > -1 : t.length > 0
                },
                empty: function() {
                    return t && (t = []),
                    this
                },
                disable: function() {
                    return f = o = [],
                    t = i = "",
                    this
                },
                disabled: function() {
                    return !t
                },
                lock: function() {
                    return f = !0,
                    i || s.disable(),
                    this
                },
                locked: function() {
                    return !!f
                },
                fireWith: function(n, t) {
                    return f || (t = t || [],
                    t = [n, t.slice ? t.slice() : t],
                    o.push(t),
                    e || c()),
                    this
                },
                fire: function() {
                    return s.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!h
                }
            };
            return s
        }
        ,
        r.extend({
            Deferred: function(n) {
                var u = [["resolve", "done", r.Callbacks("once memory"), "resolved"], ["reject", "fail", r.Callbacks("once memory"), "rejected"], ["notify", "progress", r.Callbacks("memory")]]
                  , f = "pending"
                  , i = {
                    state: function() {
                        return f
                    },
                    always: function() {
                        return t.done(arguments).fail(arguments),
                        this
                    },
                    then: function() {
                        var n = arguments;
                        return r.Deferred(function(f) {
                            r.each(u, function(u, e) {
                                var o = r.isFunction(n[u]) && n[u];
                                t[e[1]](function() {
                                    var n = o && o.apply(this, arguments);
                                    n && r.isFunction(n.promise) ? n.promise().progress(f.notify).done(f.resolve).fail(f.reject) : f[e[0] + "With"](this === i ? f.promise() : this, o ? [n] : arguments)
                                })
                            }),
                            n = null
                        }).promise()
                    },
                    promise: function(n) {
                        return n != null ? r.extend(n, i) : i
                    }
                }
                  , t = {};
                return i.pipe = i.then,
                r.each(u, function(n, r) {
                    var e = r[2]
                      , o = r[3];
                    i[r[1]] = e.add,
                    o && e.add(function() {
                        f = o
                    }, u[n ^ 1][2].disable, u[2][2].lock),
                    t[r[0]] = function() {
                        return t[r[0] + "With"](this === t ? i : this, arguments),
                        this
                    }
                    ,
                    t[r[0] + "With"] = e.fireWith
                }),
                i.promise(t),
                n && n.call(t, t),
                t
            },
            when: function(n) {
                var t = 0, u = v.call(arguments), i = u.length, e = i !== 1 || n && r.isFunction(n.promise) ? i : 0, f = e === 1 ? n : r.Deferred(), h = function(n, t, i) {
                    return function(r) {
                        t[n] = this,
                        i[n] = arguments.length > 1 ? v.call(arguments) : r,
                        i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
                    }
                }, o, c, s;
                if (i > 1)
                    for (o = new Array(i),
                    c = new Array(i),
                    s = new Array(i); t < i; t++)
                        u[t] && r.isFunction(u[t].promise) ? u[t].promise().progress(h(t, c, o)).done(h(t, s, u)).fail(f.reject) : --e;
                return e || f.resolveWith(s, u),
                f.promise()
            }
        }),
        r.fn.ready = function(n) {
            return r.ready.promise().done(n),
            this
        }
        ,
        r.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(n) {
                n ? r.readyWait++ : r.ready(!0)
            },
            ready: function(n) {
                (n === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0,
                n !== !0 && --r.readyWait > 0) || (vt.resolveWith(f, [r]),
                r.fn.triggerHandler && (r(f).triggerHandler("ready"),
                r(f).off("ready")))
            }
        }),
        r.ready.promise = function(n) {
            if (!vt)
                if (vt = r.Deferred(),
                f.readyState !== "complete" && (f.readyState === "loading" || f.documentElement.doScroll))
                    if (f.addEventListener)
                        f.addEventListener("DOMContentLoaded", y),
                        t.addEventListener("load", y);
                    else {
                        f.attachEvent("onreadystatechange", y),
                        t.attachEvent("onload", y);
                        var i = !1;
                        try {
                            i = t.frameElement == null && f.documentElement
                        } catch (e) {}
                        i && i.doScroll && function u() {
                            if (!r.isReady) {
                                try {
                                    i.doScroll("left")
                                } catch (n) {
                                    return t.setTimeout(u, 50)
                                }
                                gr(),
                                r.ready()
                            }
                        }()
                    }
                else
                    t.setTimeout(r.ready);
            return vt.promise(n)
        }
        ,
        r.ready.promise();
        for (nu in r(u))
            break;
        u.ownFirst = nu === "0",
        u.inlineBlockNeedsLayout = !1,
        r(function() {
            var r, t, n, i;
            (n = f.getElementsByTagName("body")[0],
            n && n.style) && (t = f.createElement("div"),
            i = f.createElement("div"),
            i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            n.appendChild(i).appendChild(t),
            typeof t.style.zoom != "undefined" && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
            u.inlineBlockNeedsLayout = r = t.offsetWidth === 3,
            r && (n.style.zoom = 1)),
            n.removeChild(i))
        }),
        function() {
            var n = f.createElement("div");
            u.deleteExpando = !0;
            try {
                delete n.test
            } catch (t) {
                u.deleteExpando = !1
            }
            n = null
        }();
        var st = function(n) {
            var t = r.noData[(n.nodeName + " ").toLowerCase()]
              , i = +n.nodeType || 1;
            return i !== 1 && i !== 9 ? !1 : !t || t !== !0 && n.getAttribute("classid") === t
        }
          , ke = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
          , de = /([A-Z])/g;
        r.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(n) {
                return n = n.nodeType ? r.cache[n[r.expando]] : n[r.expando],
                !!n && !ei(n)
            },
            data: function(n, t, i) {
                return iu(n, t, i)
            },
            removeData: function(n, t) {
                return ru(n, t)
            },
            _data: function(n, t, i) {
                return iu(n, t, i, !0)
            },
            _removeData: function(n, t) {
                return ru(n, t, !0)
            }
        }),
        r.fn.extend({
            data: function(n, t) {
                var f, u, e, i = this[0], o = i && i.attributes;
                if (n === undefined) {
                    if (this.length && (e = r.data(i),
                    i.nodeType === 1 && !r._data(i, "parsedAttrs"))) {
                        for (f = o.length; f--; )
                            o[f] && (u = o[f].name,
                            u.indexOf("data-") === 0 && (u = r.camelCase(u.slice(5)),
                            tu(i, u, e[u])));
                        r._data(i, "parsedAttrs", !0)
                    }
                    return e
                }
                return typeof n == "object" ? this.each(function() {
                    r.data(this, n)
                }) : arguments.length > 1 ? this.each(function() {
                    r.data(this, n, t)
                }) : i ? tu(i, n, r.data(i, n)) : undefined
            },
            removeData: function(n) {
                return this.each(function() {
                    r.removeData(this, n)
                })
            }
        }),
        r.extend({
            queue: function(n, t, i) {
                var u;
                if (n)
                    return t = (t || "fx") + "queue",
                    u = r._data(n, t),
                    i && (!u || r.isArray(i) ? u = r._data(n, t, r.makeArray(i)) : u.push(i)),
                    u || []
            },
            dequeue: function(n, t) {
                t = t || "fx";
                var i = r.queue(n, t)
                  , e = i.length
                  , u = i.shift()
                  , f = r._queueHooks(n, t)
                  , o = function() {
                    r.dequeue(n, t)
                };
                u === "inprogress" && (u = i.shift(),
                e--),
                u && (t === "fx" && i.unshift("inprogress"),
                delete f.stop,
                u.call(n, o, f)),
                !e && f && f.empty.fire()
            },
            _queueHooks: function(n, t) {
                var i = t + "queueHooks";
                return r._data(n, i) || r._data(n, i, {
                    empty: r.Callbacks("once memory").add(function() {
                        r._removeData(n, t + "queue"),
                        r._removeData(n, i)
                    })
                })
            }
        }),
        r.fn.extend({
            queue: function(n, t) {
                var i = 2;
                return (typeof n != "string" && (t = n,
                n = "fx",
                i--),
                arguments.length < i) ? r.queue(this[0], n) : t === undefined ? this : this.each(function() {
                    var i = r.queue(this, n, t);
                    r._queueHooks(this, n),
                    n === "fx" && i[0] !== "inprogress" && r.dequeue(this, n)
                })
            },
            dequeue: function(n) {
                return this.each(function() {
                    r.dequeue(this, n)
                })
            },
            clearQueue: function(n) {
                return this.queue(n || "fx", [])
            },
            promise: function(n, t) {
                var i, f = 1, e = r.Deferred(), u = this, o = this.length, s = function() {
                    --f || e.resolveWith(u, [u])
                };
                for (typeof n != "string" && (t = n,
                n = undefined),
                n = n || "fx"; o--; )
                    i = r._data(u[o], n + "queueHooks"),
                    i && i.empty && (f++,
                    i.empty.add(s));
                return s(),
                e.promise(t)
            }
        }),
        function() {
            var n;
            u.shrinkWrapBlocks = function() {
                if (n != null)
                    return n;
                n = !1;
                var t, i, r;
                if (i = f.getElementsByTagName("body")[0],
                i && i.style)
                    return t = f.createElement("div"),
                    r = f.createElement("div"),
                    r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    i.appendChild(r).appendChild(t),
                    typeof t.style.zoom != "undefined" && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    t.appendChild(f.createElement("div")).style.width = "5px",
                    n = t.offsetWidth !== 3),
                    i.removeChild(r),
                    n
            }
        }();
        var oi = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
          , si = new RegExp("^(?:([+-])=|)(" + oi + ")([a-z%]*)$","i")
          , k = ["Top", "Right", "Bottom", "Left"]
          , ht = function(n, t) {
            return n = t || n,
            r.css(n, "display") === "none" || !r.contains(n.ownerDocument, n)
        };
        var p = function(n, t, i, u, f, e, o) {
            var s = 0
              , c = n.length
              , h = i == null;
            if (r.type(i) === "object") {
                f = !0;
                for (s in i)
                    p(n, t, s, i[s], !0, e, o)
            } else if (u !== undefined && (f = !0,
            r.isFunction(u) || (o = !0),
            h && (o ? (t.call(n, u),
            t = null) : (h = t,
            t = function(n, t, i) {
                return h.call(r(n), i)
            }
            )),
            t))
                for (; s < c; s++)
                    t(n[s], i, o ? u : u.call(n[s], s, t(n[s], i)));
            return f ? n : h ? t.call(n) : c ? t(n[0], i) : e
        }
          , hi = /^(?:checkbox|radio)$/i
          , fu = /<([\w:-]+)/
          , eu = /^$|\/(?:java|ecma)script/i
          , ci = /^\s+/
          , ou = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
        (function() {
            var n = f.createElement("div")
              , i = f.createDocumentFragment()
              , t = f.createElement("input");
            n.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>",
            u.leadingWhitespace = n.firstChild.nodeType === 3,
            u.tbody = !n.getElementsByTagName("tbody").length,
            u.htmlSerialize = !!n.getElementsByTagName("link").length,
            u.html5Clone = f.createElement("nav").cloneNode(!0).outerHTML !== "<:nav><\/:nav>",
            t.type = "checkbox",
            t.checked = !0,
            i.appendChild(t),
            u.appendChecked = t.checked,
            n.innerHTML = "<textarea>x<\/textarea>",
            u.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue,
            i.appendChild(n),
            t = f.createElement("input"),
            t.setAttribute("type", "radio"),
            t.setAttribute("checked", "checked"),
            t.setAttribute("name", "t"),
            n.appendChild(t),
            u.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked,
            u.noCloneEvent = !!n.addEventListener,
            n[r.expando] = 1,
            u.attributes = !n.getAttribute(r.expando)
        })(),
        s = {
            option: [1, "<select multiple='multiple'>", "<\/select>"],
            legend: [1, "<fieldset>", "<\/fieldset>"],
            area: [1, "<map>", "<\/map>"],
            param: [1, "<object>", "<\/object>"],
            thead: [1, "<table>", "<\/table>"],
            tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
            col: [2, "<table><tbody><\/tbody><colgroup>", "<\/colgroup><\/table>"],
            td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
            _default: u.htmlSerialize ? [0, "", ""] : [1, "X<div>", "<\/div>"]
        },
        s.optgroup = s.option,
        s.tbody = s.tfoot = s.colgroup = s.caption = s.thead,
        s.th = s.td,
        hu = /<|&#?\w+;/,
        ai = /<tbody/i,
        function() {
            var n, i, r = f.createElement("div");
            for (n in {
                submit: !0,
                change: !0,
                focusin: !0
            })
                i = "on" + n,
                (u[n] = i in t) || (r.setAttribute(i, "t"),
                u[n] = r.attributes[i].expando === !1);
            r = null
        }();
        var vi = /^(?:input|select|textarea)$/i
          , no = /^key/
          , to = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
          , lu = /^(?:focusinfocus|focusoutblur)$/
          , au = /^([^.]*)(?:\.(.+)|)/;
        r.event = {
            global: {},
            add: function(n, t, i, u, f) {
                var p, v, w, y, o, s, c, l, e, b, k, a = r._data(n);
                if (a) {
                    for (i.handler && (y = i,
                    i = y.handler,
                    f = y.selector),
                    i.guid || (i.guid = r.guid++),
                    (v = a.events) || (v = a.events = {}),
                    (s = a.handle) || (s = a.handle = function(n) {
                        return typeof r != "undefined" && (!n || r.event.triggered !== n.type) ? r.event.dispatch.apply(s.elem, arguments) : undefined
                    }
                    ,
                    s.elem = n),
                    t = (t || "").match(h) || [""],
                    w = t.length; w--; )
                        (p = au.exec(t[w]) || [],
                        e = k = p[1],
                        b = (p[2] || "").split(".").sort(),
                        e) && (o = r.event.special[e] || {},
                        e = (f ? o.delegateType : o.bindType) || e,
                        o = r.event.special[e] || {},
                        c = r.extend({
                            type: e,
                            origType: k,
                            data: u,
                            handler: i,
                            guid: i.guid,
                            selector: f,
                            needsContext: f && r.expr.match.needsContext.test(f),
                            namespace: b.join(".")
                        }, y),
                        (l = v[e]) || (l = v[e] = [],
                        l.delegateCount = 0,
                        o.setup && o.setup.call(n, u, b, s) !== !1 || (n.addEventListener ? n.addEventListener(e, s, !1) : n.attachEvent && n.attachEvent("on" + e, s))),
                        o.add && (o.add.call(n, c),
                        c.handler.guid || (c.handler.guid = i.guid)),
                        f ? l.splice(l.delegateCount++, 0, c) : l.push(c),
                        r.event.global[e] = !0);
                    n = null
                }
            },
            remove: function(n, t, i, u, f) {
                var y, o, s, b, p, a, c, l, e, w, k, v = r.hasData(n) && r._data(n);
                if (v && (a = v.events)) {
                    for (t = (t || "").match(h) || [""],
                    p = t.length; p--; ) {
                        if (s = au.exec(t[p]) || [],
                        e = k = s[1],
                        w = (s[2] || "").split(".").sort(),
                        !e) {
                            for (e in a)
                                r.event.remove(n, e + t[p], i, u, !0);
                            continue
                        }
                        for (c = r.event.special[e] || {},
                        e = (u ? c.delegateType : c.bindType) || e,
                        l = a[e] || [],
                        s = s[2] && new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        b = y = l.length; y--; )
                            o = l[y],
                            (f || k === o.origType) && (!i || i.guid === o.guid) && (!s || s.test(o.namespace)) && (!u || u === o.selector || u === "**" && o.selector) && (l.splice(y, 1),
                            o.selector && l.delegateCount--,
                            c.remove && c.remove.call(n, o));
                        b && !l.length && (c.teardown && c.teardown.call(n, w, v.handle) !== !1 || r.removeEvent(n, e, v.handle),
                        delete a[e])
                    }
                    r.isEmptyObject(a) && (delete v.handle,
                    r._removeData(n, "events"))
                }
            },
            trigger: function(n, i, u, e) {
                var l, a, o, p, c, h, w, y = [u || f], s = it.call(n, "type") ? n.type : n, v = it.call(n, "namespace") ? n.namespace.split(".") : [];
                if ((o = h = u = u || f,
                u.nodeType !== 3 && u.nodeType !== 8) && !lu.test(s + r.event.triggered) && (s.indexOf(".") > -1 && (v = s.split("."),
                s = v.shift(),
                v.sort()),
                a = s.indexOf(":") < 0 && "on" + s,
                n = n[r.expando] ? n : new r.Event(s,typeof n == "object" && n),
                n.isTrigger = e ? 2 : 3,
                n.namespace = v.join("."),
                n.rnamespace = n.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                n.result = undefined,
                n.target || (n.target = u),
                i = i == null ? [n] : r.makeArray(i, [n]),
                c = r.event.special[s] || {},
                e || !c.trigger || c.trigger.apply(u, i) !== !1)) {
                    if (!e && !c.noBubble && !r.isWindow(u)) {
                        for (p = c.delegateType || s,
                        lu.test(p + s) || (o = o.parentNode); o; o = o.parentNode)
                            y.push(o),
                            h = o;
                        h === (u.ownerDocument || f) && y.push(h.defaultView || h.parentWindow || t)
                    }
                    for (w = 0; (o = y[w++]) && !n.isPropagationStopped(); )
                        n.type = w > 1 ? p : c.bindType || s,
                        l = (r._data(o, "events") || {})[n.type] && r._data(o, "handle"),
                        l && l.apply(o, i),
                        l = a && o[a],
                        l && l.apply && st(o) && (n.result = l.apply(o, i),
                        n.result === !1 && n.preventDefault());
                    if (n.type = s,
                    !e && !n.isDefaultPrevented() && (!c._default || c._default.apply(y.pop(), i) === !1) && st(u) && a && u[s] && !r.isWindow(u)) {
                        h = u[a],
                        h && (u[a] = null),
                        r.event.triggered = s;
                        try {
                            u[s]()
                        } catch (b) {}
                        r.event.triggered = undefined,
                        h && (u[a] = h)
                    }
                    return n.result
                }
            },
            dispatch: function(n) {
                n = r.event.fix(n);
                var e, o, f, i, t, s = [], h = v.call(arguments), c = (r._data(this, "events") || {})[n.type] || [], u = r.event.special[n.type] || {};
                if (h[0] = n,
                n.delegateTarget = this,
                !u.preDispatch || u.preDispatch.call(this, n) !== !1) {
                    for (s = r.event.handlers.call(this, n, c),
                    e = 0; (i = s[e++]) && !n.isPropagationStopped(); )
                        for (n.currentTarget = i.elem,
                        o = 0; (t = i.handlers[o++]) && !n.isImmediatePropagationStopped(); )
                            (!n.rnamespace || n.rnamespace.test(t.namespace)) && (n.handleObj = t,
                            n.data = t.data,
                            f = ((r.event.special[t.origType] || {}).handle || t.handler).apply(i.elem, h),
                            f !== undefined && (n.result = f) === !1 && (n.preventDefault(),
                            n.stopPropagation()));
                    return u.postDispatch && u.postDispatch.call(this, n),
                    n.result
                }
            },
            handlers: function(n, t) {
                var e, u, f, o, h = [], s = t.delegateCount, i = n.target;
                if (s && i.nodeType && (n.type !== "click" || isNaN(n.button) || n.button < 1))
                    for (; i != this; i = i.parentNode || this)
                        if (i.nodeType === 1 && (i.disabled !== !0 || n.type !== "click")) {
                            for (u = [],
                            e = 0; e < s; e++)
                                o = t[e],
                                f = o.selector + " ",
                                u[f] === undefined && (u[f] = o.needsContext ? r(f, this).index(i) > -1 : r.find(f, this, null, [i]).length),
                                u[f] && u.push(o);
                            u.length && h.push({
                                elem: i,
                                handlers: u
                            })
                        }
                return s < t.length && h.push({
                    elem: this,
                    handlers: t.slice(s)
                }),
                h
            },
            fix: function(n) {
                if (n[r.expando])
                    return n;
                var e, o, s, i = n.type, u = n, t = this.fixHooks[i];
                for (t || (this.fixHooks[i] = t = to.test(i) ? this.mouseHooks : no.test(i) ? this.keyHooks : {}),
                s = t.props ? this.props.concat(t.props) : this.props,
                n = new r.Event(u),
                e = s.length; e--; )
                    o = s[e],
                    n[o] = u[o];
                return n.target || (n.target = u.srcElement || f),
                n.target.nodeType === 3 && (n.target = n.target.parentNode),
                n.metaKey = !!n.metaKey,
                t.filter ? t.filter(n, u) : n
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(n, t) {
                    return n.which == null && (n.which = t.charCode != null ? t.charCode : t.keyCode),
                    n
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(n, t) {
                    var i, e, r, u = t.button, o = t.fromElement;
                    return n.pageX == null && t.clientX != null && (e = n.target.ownerDocument || f,
                    r = e.documentElement,
                    i = e.body,
                    n.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0),
                    n.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)),
                    !n.relatedTarget && o && (n.relatedTarget = o === n.target ? t.toElement : o),
                    n.which || u === undefined || (n.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0),
                    n
                }
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== vu() && this.focus)
                            try {
                                return this.focus(),
                                !1
                            } catch (n) {}
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === vu() && this.blur)
                            return this.blur(),
                            !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (r.nodeName(this, "input") && this.type === "checkbox" && this.click)
                            return this.click(),
                            !1
                    },
                    _default: function(n) {
                        return r.nodeName(n.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(n) {
                        n.result !== undefined && n.originalEvent && (n.originalEvent.returnValue = n.result)
                    }
                }
            },
            simulate: function(n, t, i) {
                var u = r.extend(new r.Event, i, {
                    type: n,
                    isSimulated: !0
                });
                r.event.trigger(u, null, t),
                u.isDefaultPrevented() && i.preventDefault()
            }
        },
        r.removeEvent = f.removeEventListener ? function(n, t, i) {
            n.removeEventListener && n.removeEventListener(t, i)
        }
        : function(n, t, i) {
            var r = "on" + t;
            n.detachEvent && (typeof n[r] == "undefined" && (n[r] = null),
            n.detachEvent(r, i))
        }
        ,
        r.Event = function(n, t) {
            if (!(this instanceof r.Event))
                return new r.Event(n,t);
            n && n.type ? (this.originalEvent = n,
            this.type = n.type,
            this.isDefaultPrevented = n.defaultPrevented || n.defaultPrevented === undefined && n.returnValue === !1 ? yt : ut) : this.type = n,
            t && r.extend(this, t),
            this.timeStamp = n && n.timeStamp || r.now(),
            this[r.expando] = !0
        }
        ,
        r.Event.prototype = {
            constructor: r.Event,
            isDefaultPrevented: ut,
            isPropagationStopped: ut,
            isImmediatePropagationStopped: ut,
            preventDefault: function() {
                var n = this.originalEvent;
                (this.isDefaultPrevented = yt,
                n) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
            },
            stopPropagation: function() {
                var n = this.originalEvent;
                (this.isPropagationStopped = yt,
                n && !this.isSimulated) && (n.stopPropagation && n.stopPropagation(),
                n.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                var n = this.originalEvent;
                this.isImmediatePropagationStopped = yt,
                n && n.stopImmediatePropagation && n.stopImmediatePropagation(),
                this.stopPropagation()
            }
        },
        r.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(n, t) {
            r.event.special[n] = {
                delegateType: t,
                bindType: t,
                handle: function(n) {
                    var u, f = this, i = n.relatedTarget, e = n.handleObj;
                    return i && (i === f || r.contains(f, i)) || (n.type = e.origType,
                    u = e.handler.apply(this, arguments),
                    n.type = t),
                    u
                }
            }
        }),
        u.submit || (r.event.special.submit = {
            setup: function() {
                if (r.nodeName(this, "form"))
                    return !1;
                r.event.add(this, "click._submit keypress._submit", function(n) {
                    var i = n.target
                      , t = r.nodeName(i, "input") || r.nodeName(i, "button") ? r.prop(i, "form") : undefined;
                    t && !r._data(t, "submit") && (r.event.add(t, "submit._submit", function(n) {
                        n._submitBubble = !0
                    }),
                    r._data(t, "submit", !0))
                })
            },
            postDispatch: function(n) {
                n._submitBubble && (delete n._submitBubble,
                this.parentNode && !n.isTrigger && r.event.simulate("submit", this.parentNode, n))
            },
            teardown: function() {
                if (r.nodeName(this, "form"))
                    return !1;
                r.event.remove(this, "._submit")
            }
        }),
        u.change || (r.event.special.change = {
            setup: function() {
                if (vi.test(this.nodeName))
                    return (this.type === "checkbox" || this.type === "radio") && (r.event.add(this, "propertychange._change", function(n) {
                        n.originalEvent.propertyName === "checked" && (this._justChanged = !0)
                    }),
                    r.event.add(this, "click._change", function(n) {
                        this._justChanged && !n.isTrigger && (this._justChanged = !1),
                        r.event.simulate("change", this, n)
                    })),
                    !1;
                r.event.add(this, "beforeactivate._change", function(n) {
                    var t = n.target;
                    vi.test(t.nodeName) && !r._data(t, "change") && (r.event.add(t, "change._change", function(n) {
                        !this.parentNode || n.isSimulated || n.isTrigger || r.event.simulate("change", this.parentNode, n)
                    }),
                    r._data(t, "change", !0))
                })
            },
            handle: function(n) {
                var t = n.target;
                if (this !== t || n.isSimulated || n.isTrigger || t.type !== "radio" && t.type !== "checkbox")
                    return n.handleObj.handler.apply(this, arguments)
            },
            teardown: function() {
                return r.event.remove(this, "._change"),
                !vi.test(this.nodeName)
            }
        }),
        u.focusin || r.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, t) {
            var i = function(n) {
                r.event.simulate(t, n.target, r.event.fix(n))
            };
            r.event.special[t] = {
                setup: function() {
                    var u = this.ownerDocument || this
                      , f = r._data(u, t);
                    f || u.addEventListener(n, i, !0),
                    r._data(u, t, (f || 0) + 1)
                },
                teardown: function() {
                    var u = this.ownerDocument || this
                      , f = r._data(u, t) - 1;
                    f ? r._data(u, t, f) : (u.removeEventListener(n, i, !0),
                    r._removeData(u, t))
                }
            }
        }),
        r.fn.extend({
            on: function(n, t, i, r) {
                return yi(this, n, t, i, r)
            },
            one: function(n, t, i, r) {
                return yi(this, n, t, i, r, 1)
            },
            off: function(n, t, i) {
                var u, f;
                if (n && n.preventDefault && n.handleObj)
                    return u = n.handleObj,
                    r(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler),
                    this;
                if (typeof n == "object") {
                    for (f in n)
                        this.off(f, t, n[f]);
                    return this
                }
                return (t === !1 || typeof t == "function") && (i = t,
                t = undefined),
                i === !1 && (i = ut),
                this.each(function() {
                    r.event.remove(this, n, i, t)
                })
            },
            trigger: function(n, t) {
                return this.each(function() {
                    r.event.trigger(n, t, this)
                })
            },
            triggerHandler: function(n, t) {
                var i = this[0];
                if (i)
                    return r.event.trigger(n, t, i, !0)
            }
        });
        var io = / jQuery\d+="(?:null|\d+)"/g
          , yu = new RegExp("<(?:" + ou + ")[\\s/>]","i")
          , ro = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
          , uo = /<script|<style|<link/i
          , fo = /checked\s*(?:[^=]|=\s*.checked.)/i
          , eo = /^true\/(.*)/
          , oo = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
          , so = su(f)
          , pi = so.appendChild(f.createElement("div"));
        r.extend({
            htmlPrefilter: function(n) {
                return n.replace(ro, "<$1><\/$2>")
            },
            clone: function(n, t, i) {
                var f, c, s, o, h, l = r.contains(n.ownerDocument, n);
                if (u.html5Clone || r.isXMLDoc(n) || !yu.test("<" + n.nodeName + ">") ? s = n.cloneNode(!0) : (pi.innerHTML = n.outerHTML,
                pi.removeChild(s = pi.firstChild)),
                (!u.noCloneEvent || !u.noCloneChecked) && (n.nodeType === 1 || n.nodeType === 11) && !r.isXMLDoc(n))
                    for (f = e(s),
                    h = e(n),
                    o = 0; (c = h[o]) != null; ++o)
                        f[o] && ho(c, f[o]);
                if (t)
                    if (i)
                        for (h = h || e(n),
                        f = f || e(s),
                        o = 0; (c = h[o]) != null; o++)
                            ku(c, f[o]);
                    else
                        ku(n, s);
                return f = e(s, "script"),
                f.length > 0 && li(f, !l && e(n, "script")),
                f = h = c = null,
                s
            },
            cleanData: function(n, t) {
                for (var i, o, f, e, c = 0, s = r.expando, h = r.cache, a = u.attributes, v = r.event.special; (i = n[c]) != null; c++)
                    if ((t || st(i)) && (f = i[s],
                    e = f && h[f],
                    e)) {
                        if (e.events)
                            for (o in e.events)
                                v[o] ? r.event.remove(i, o) : r.removeEvent(i, o, e.handle);
                        h[f] && (delete h[f],
                        a || typeof i.removeAttribute == "undefined" ? i[s] = undefined : i.removeAttribute(s),
                        l.push(f))
                    }
            }
        }),
        r.fn.extend({
            domManip: d,
            detach: function(n) {
                return du(this, n, !0)
            },
            remove: function(n) {
                return du(this, n)
            },
            text: function(n) {
                return p(this, function(n) {
                    return n === undefined ? r.text(this) : this.empty().append((this[0] && this[0].ownerDocument || f).createTextNode(n))
                }, null, n, arguments.length)
            },
            append: function() {
                return d(this, arguments, function(n) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = pu(this, n);
                        t.appendChild(n)
                    }
                })
            },
            prepend: function() {
                return d(this, arguments, function(n) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var t = pu(this, n);
                        t.insertBefore(n, t.firstChild)
                    }
                })
            },
            before: function() {
                return d(this, arguments, function(n) {
                    this.parentNode && this.parentNode.insertBefore(n, this)
                })
            },
            after: function() {
                return d(this, arguments, function(n) {
                    this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
                })
            },
            empty: function() {
                for (var n, t = 0; (n = this[t]) != null; t++) {
                    for (n.nodeType === 1 && r.cleanData(e(n, !1)); n.firstChild; )
                        n.removeChild(n.firstChild);
                    n.options && r.nodeName(n, "select") && (n.options.length = 0)
                }
                return this
            },
            clone: function(n, t) {
                return n = n == null ? !1 : n,
                t = t == null ? n : t,
                this.map(function() {
                    return r.clone(this, n, t)
                })
            },
            html: function(n) {
                return p(this, function(n) {
                    var t = this[0] || {}
                      , i = 0
                      , f = this.length;
                    if (n === undefined)
                        return t.nodeType === 1 ? t.innerHTML.replace(io, "") : undefined;
                    if (typeof n == "string" && !uo.test(n) && (u.htmlSerialize || !yu.test(n)) && (u.leadingWhitespace || !ci.test(n)) && !s[(fu.exec(n) || ["", ""])[1].toLowerCase()]) {
                        n = r.htmlPrefilter(n);
                        try {
                            for (; i < f; i++)
                                t = this[i] || {},
                                t.nodeType === 1 && (r.cleanData(e(t, !1)),
                                t.innerHTML = n);
                            t = 0
                        } catch (o) {}
                    }
                    t && this.empty().append(n)
                }, null, n, arguments.length)
            },
            replaceWith: function() {
                var n = [];
                return d(this, arguments, function(t) {
                    var i = this.parentNode;
                    r.inArray(this, n) < 0 && (r.cleanData(e(this)),
                    i && i.replaceChild(t, this))
                }, n)
            }
        }),
        r.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(n, t) {
            r.fn[n] = function(n) {
                for (var u, i = 0, f = [], e = r(n), o = e.length - 1; i <= o; i++)
                    u = i === o ? this : this.clone(!0),
                    r(e[i])[t](u),
                    ii.apply(f, u.get());
                return this.pushStack(f)
            }
        }),
        wi = {
            HTML: "block",
            BODY: "block"
        };
        var nf = /^margin/
          , wt = new RegExp("^(" + oi + ")(?!px)[a-z%]+$","i")
          , bi = function(n, t, i, r) {
            var f, u, e = {};
            for (u in t)
                e[u] = n.style[u],
                n.style[u] = t[u];
            f = i.apply(n, r || []);
            for (u in t)
                n.style[u] = e[u];
            return f
        }
          , tf = f.documentElement;
        (function() {
            function o() {
                var r, u, o = f.documentElement;
                o.appendChild(s),
                n.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                i = c = a = !1,
                h = l = !0,
                t.getComputedStyle && (u = t.getComputedStyle(n),
                i = (u || {}).top !== "1%",
                a = (u || {}).marginLeft === "2px",
                c = (u || {
                    width: "4px"
                }).width === "4px",
                n.style.marginRight = "50%",
                h = (u || {
                    marginRight: "4px"
                }).marginRight === "4px",
                r = n.appendChild(f.createElement("div")),
                r.style.cssText = n.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                r.style.marginRight = r.style.width = "0",
                n.style.width = "1px",
                l = !parseFloat((t.getComputedStyle(r) || {}).marginRight),
                n.removeChild(r)),
                n.style.display = "none",
                e = n.getClientRects().length === 0,
                e && (n.style.display = "",
                n.innerHTML = "<table><tr><td><\/td><td>t<\/td><\/tr><\/table>",
                n.childNodes[0].style.borderCollapse = "separate",
                r = n.getElementsByTagName("td"),
                r[0].style.cssText = "margin:0;border:0;padding:0;display:none",
                e = r[0].offsetHeight === 0,
                e && (r[0].style.display = "",
                r[1].style.display = "none",
                e = r[0].offsetHeight === 0)),
                o.removeChild(s)
            }
            var i, h, c, e, l, a, s = f.createElement("div"), n = f.createElement("div");
            n.style && (n.style.cssText = "float:left;opacity:.5",
            u.opacity = n.style.opacity === "0.5",
            u.cssFloat = !!n.style.cssFloat,
            n.style.backgroundClip = "content-box",
            n.cloneNode(!0).style.backgroundClip = "",
            u.clearCloneStyle = n.style.backgroundClip === "content-box",
            s = f.createElement("div"),
            s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            n.innerHTML = "",
            s.appendChild(n),
            u.boxSizing = n.style.boxSizing === "" || n.style.MozBoxSizing === "" || n.style.WebkitBoxSizing === "",
            r.extend(u, {
                reliableHiddenOffsets: function() {
                    return i == null && o(),
                    e
                },
                boxSizingReliable: function() {
                    return i == null && o(),
                    c
                },
                pixelMarginRight: function() {
                    return i == null && o(),
                    h
                },
                pixelPosition: function() {
                    return i == null && o(),
                    i
                },
                reliableMarginRight: function() {
                    return i == null && o(),
                    l
                },
                reliableMarginLeft: function() {
                    return i == null && o(),
                    a
                }
            }))
        })(),
        rf = /^(top|right|bottom|left)$/,
        t.getComputedStyle ? (g = function(n) {
            var i = n.ownerDocument.defaultView;
            return i && i.opener || (i = t),
            i.getComputedStyle(n)
        }
        ,
        w = function(n, t, i) {
            var o, s, h, f, e = n.style;
            return i = i || g(n),
            f = i ? i.getPropertyValue(t) || i[t] : undefined,
            f !== "" && f !== undefined || r.contains(n.ownerDocument, n) || (f = r.style(n, t)),
            i && !u.pixelMarginRight() && wt.test(f) && nf.test(t) && (o = e.width,
            s = e.minWidth,
            h = e.maxWidth,
            e.minWidth = e.maxWidth = e.width = f,
            f = i.width,
            e.width = o,
            e.minWidth = s,
            e.maxWidth = h),
            f === undefined ? f : f + ""
        }
        ) : tf.currentStyle && (g = function(n) {
            return n.currentStyle
        }
        ,
        w = function(n, t, i) {
            var o, f, e, r, u = n.style;
            return i = i || g(n),
            r = i ? i[t] : undefined,
            r == null && u && u[t] && (r = u[t]),
            wt.test(r) && !rf.test(t) && (o = u.left,
            f = n.runtimeStyle,
            e = f && f.left,
            e && (f.left = n.currentStyle.left),
            u.left = t === "fontSize" ? "1em" : r,
            r = u.pixelLeft + "px",
            u.left = o,
            e && (f.left = e)),
            r === undefined ? r : r + "" || "auto"
        }
        );
        var di = /alpha\([^)]*\)/i
          , co = /opacity\s*=\s*([^)]*)/i
          , lo = /^(none|table(?!-c[ea]).+)/
          , ao = new RegExp("^(" + oi + ")(.*)$","i")
          , vo = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
          , uf = {
            letterSpacing: "0",
            fontWeight: "400"
        }
          , ff = ["Webkit", "O", "Moz", "ms"]
          , ef = f.createElement("div").style;
        r.extend({
            cssHooks: {
                opacity: {
                    get: function(n, t) {
                        if (t) {
                            var i = w(n, "opacity");
                            return i === "" ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: u.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(n, t, i, f) {
                if (n && n.nodeType !== 3 && n.nodeType !== 8 && n.style) {
                    var e, h, o, s = r.camelCase(t), c = n.style;
                    if (t = r.cssProps[s] || (r.cssProps[s] = of(s) || s),
                    o = r.cssHooks[t] || r.cssHooks[s],
                    i !== undefined) {
                        if (h = typeof i,
                        h === "string" && (e = si.exec(i)) && e[1] && (i = uu(n, t, e),
                        h = "number"),
                        i == null || i !== i)
                            return;
                        if (h === "number" && (i += e && e[3] || (r.cssNumber[s] ? "" : "px")),
                        u.clearCloneStyle || i !== "" || t.indexOf("background") !== 0 || (c[t] = "inherit"),
                        !o || !("set"in o) || (i = o.set(n, i, f)) !== undefined)
                            try {
                                c[t] = i
                            } catch (l) {}
                    } else
                        return o && "get"in o && (e = o.get(n, !1, f)) !== undefined ? e : c[t]
                }
            },
            css: function(n, t, i, u) {
                var s, f, o, e = r.camelCase(t);
                return (t = r.cssProps[e] || (r.cssProps[e] = of(e) || e),
                o = r.cssHooks[t] || r.cssHooks[e],
                o && "get"in o && (f = o.get(n, !0, i)),
                f === undefined && (f = w(n, t, u)),
                f === "normal" && t in uf && (f = uf[t]),
                i === "" || i) ? (s = parseFloat(f),
                i === !0 || isFinite(s) ? s || 0 : f) : f
            }
        }),
        r.each(["height", "width"], function(n, t) {
            r.cssHooks[t] = {
                get: function(n, i, u) {
                    if (i)
                        return lo.test(r.css(n, "display")) && n.offsetWidth === 0 ? bi(n, vo, function() {
                            return lf(n, t, u)
                        }) : lf(n, t, u)
                },
                set: function(n, i, f) {
                    var e = f && g(n);
                    return hf(n, i, f ? cf(n, t, f, u.boxSizing && r.css(n, "boxSizing", !1, e) === "border-box", e) : 0)
                }
            }
        }),
        u.opacity || (r.cssHooks.opacity = {
            get: function(n, t) {
                return co.test((t && n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function(n, t) {
                var i = n.style
                  , u = n.currentStyle
                  , e = r.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : ""
                  , f = u && u.filter || i.filter || "";
                (i.zoom = 1,
                (t >= 1 || t === "") && r.trim(f.replace(di, "")) === "" && i.removeAttribute && (i.removeAttribute("filter"),
                t === "" || u && !u.filter)) || (i.filter = di.test(f) ? f.replace(di, e) : f + " " + e)
            }
        }),
        r.cssHooks.marginRight = ki(u.reliableMarginRight, function(n, t) {
            if (t)
                return bi(n, {
                    display: "inline-block"
                }, w, [n, "marginRight"])
        }),
        r.cssHooks.marginLeft = ki(u.reliableMarginLeft, function(n, t) {
            if (t)
                return (parseFloat(w(n, "marginLeft")) || (r.contains(n.ownerDocument, n) ? n.getBoundingClientRect().left - bi(n, {
                    marginLeft: 0
                }, function() {
                    return n.getBoundingClientRect().left
                }) : 0)) + "px"
        }),
        r.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(n, t) {
            r.cssHooks[n + t] = {
                expand: function(i) {
                    for (var r = 0, f = {}, u = typeof i == "string" ? i.split(" ") : [i]; r < 4; r++)
                        f[n + k[r] + t] = u[r] || u[r - 2] || u[0];
                    return f
                }
            },
            nf.test(n) || (r.cssHooks[n + t].set = hf)
        }),
        r.fn.extend({
            css: function(n, t) {
                return p(this, function(n, t, i) {
                    var f, e, o = {}, u = 0;
                    if (r.isArray(t)) {
                        for (f = g(n),
                        e = t.length; u < e; u++)
                            o[t[u]] = r.css(n, t[u], !1, f);
                        return o
                    }
                    return i !== undefined ? r.style(n, t, i) : r.css(n, t)
                }, n, t, arguments.length > 1)
            },
            show: function() {
                return sf(this, !0)
            },
            hide: function() {
                return sf(this)
            },
            toggle: function(n) {
                return typeof n == "boolean" ? n ? this.show() : this.hide() : this.each(function() {
                    ht(this) ? r(this).show() : r(this).hide()
                })
            }
        }),
        r.Tween = o,
        o.prototype = {
            constructor: o,
            init: function(n, t, i, u, f, e) {
                this.elem = n,
                this.prop = i,
                this.easing = f || r.easing._default,
                this.options = t,
                this.start = this.now = this.cur(),
                this.end = u,
                this.unit = e || (r.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var n = o.propHooks[this.prop];
                return n && n.get ? n.get(this) : o.propHooks._default.get(this)
            },
            run: function(n) {
                var t, i = o.propHooks[this.prop];
                return this.pos = this.options.duration ? t = r.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n,
                this.now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                i && i.set ? i.set(this) : o.propHooks._default.set(this),
                this
            }
        },
        o.prototype.init.prototype = o.prototype,
        o.propHooks = {
            _default: {
                get: function(n) {
                    var t;
                    return n.elem.nodeType !== 1 || n.elem[n.prop] != null && n.elem.style[n.prop] == null ? n.elem[n.prop] : (t = r.css(n.elem, n.prop, ""),
                    !t || t === "auto" ? 0 : t)
                },
                set: function(n) {
                    r.fx.step[n.prop] ? r.fx.step[n.prop](n) : n.elem.nodeType === 1 && (n.elem.style[r.cssProps[n.prop]] != null || r.cssHooks[n.prop]) ? r.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
                }
            }
        },
        o.propHooks.scrollTop = o.propHooks.scrollLeft = {
            set: function(n) {
                n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
            }
        },
        r.easing = {
            linear: function(n) {
                return n
            },
            swing: function(n) {
                return .5 - Math.cos(n * Math.PI) / 2
            },
            _default: "swing"
        },
        r.fx = o.prototype.init,
        r.fx.step = {},
        af = /^(?:toggle|show|hide)$/,
        vf = /queueHooks$/,
        r.Animation = r.extend(c, {
            tweeners: {
                "*": [function(n, t) {
                    var i = this.createTween(n, t);
                    return uu(i.elem, n, si.exec(t), i),
                    i
                }
                ]
            },
            tweener: function(n, t) {
                r.isFunction(n) ? (t = n,
                n = ["*"]) : n = n.match(h);
                for (var i, u = 0, f = n.length; u < f; u++)
                    i = n[u],
                    c.tweeners[i] = c.tweeners[i] || [],
                    c.tweeners[i].unshift(t)
            },
            prefilters: [yo],
            prefilter: function(n, t) {
                t ? c.prefilters.unshift(n) : c.prefilters.push(n)
            }
        }),
        r.speed = function(n, t, i) {
            var u = n && typeof n == "object" ? r.extend({}, n) : {
                complete: i || !i && t || r.isFunction(n) && n,
                duration: n,
                easing: i && t || t && !r.isFunction(t) && t
            };
            return u.duration = r.fx.off ? 0 : typeof u.duration == "number" ? u.duration : u.duration in r.fx.speeds ? r.fx.speeds[u.duration] : r.fx.speeds._default,
            (u.queue == null || u.queue === !0) && (u.queue = "fx"),
            u.old = u.complete,
            u.complete = function() {
                r.isFunction(u.old) && u.old.call(this),
                u.queue && r.dequeue(this, u.queue)
            }
            ,
            u
        }
        ,
        r.fn.extend({
            fadeTo: function(n, t, i, r) {
                return this.filter(ht).css("opacity", 0).show().end().animate({
                    opacity: t
                }, n, i, r)
            },
            animate: function(n, t, i, u) {
                var o = r.isEmptyObject(n)
                  , e = r.speed(t, i, u)
                  , f = function() {
                    var t = c(this, r.extend({}, n), e);
                    (o || r._data(this, "finish")) && t.stop(!0)
                };
                return f.finish = f,
                o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f)
            },
            stop: function(n, t, i) {
                var u = function(n) {
                    var t = n.stop;
                    delete n.stop,
                    t(i)
                };
                return typeof n != "string" && (i = t,
                t = n,
                n = undefined),
                t && n !== !1 && this.queue(n || "fx", []),
                this.each(function() {
                    var o = !0
                      , t = n != null && n + "queueHooks"
                      , e = r.timers
                      , f = r._data(this);
                    if (t)
                        f[t] && f[t].stop && u(f[t]);
                    else
                        for (t in f)
                            f[t] && f[t].stop && vf.test(t) && u(f[t]);
                    for (t = e.length; t--; )
                        e[t].elem === this && (n == null || e[t].queue === n) && (e[t].anim.stop(i),
                        o = !1,
                        e.splice(t, 1));
                    (o || !i) && r.dequeue(this, n)
                })
            },
            finish: function(n) {
                return n !== !1 && (n = n || "fx"),
                this.each(function() {
                    var t, f = r._data(this), i = f[n + "queue"], e = f[n + "queueHooks"], u = r.timers, o = i ? i.length : 0;
                    for (f.finish = !0,
                    r.queue(this, n, []),
                    e && e.stop && e.stop.call(this, !0),
                    t = u.length; t--; )
                        u[t].elem === this && u[t].queue === n && (u[t].anim.stop(!0),
                        u.splice(t, 1));
                    for (t = 0; t < o; t++)
                        i[t] && i[t].finish && i[t].finish.call(this);
                    delete f.finish
                })
            }
        }),
        r.each(["toggle", "show", "hide"], function(n, t) {
            var i = r.fn[t];
            r.fn[t] = function(n, r, u) {
                return n == null || typeof n == "boolean" ? i.apply(this, arguments) : this.animate(kt(t, !0), n, r, u)
            }
        }),
        r.each({
            slideDown: kt("show"),
            slideUp: kt("hide"),
            slideToggle: kt("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(n, t) {
            r.fn[n] = function(n, i, r) {
                return this.animate(t, n, i, r)
            }
        }),
        r.timers = [],
        r.fx.tick = function() {
            var i, n = r.timers, t = 0;
            for (ft = r.now(); t < n.length; t++)
                i = n[t],
                i() || n[t] !== i || n.splice(t--, 1);
            n.length || r.fx.stop(),
            ft = undefined
        }
        ,
        r.fx.timer = function(n) {
            r.timers.push(n),
            n() ? r.fx.start() : r.timers.pop()
        }
        ,
        r.fx.interval = 13,
        r.fx.start = function() {
            bt || (bt = t.setInterval(r.fx.tick, r.fx.interval))
        }
        ,
        r.fx.stop = function() {
            t.clearInterval(bt),
            bt = null
        }
        ,
        r.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        r.fn.delay = function(n, i) {
            return n = r.fx ? r.fx.speeds[n] || n : n,
            i = i || "fx",
            this.queue(i, function(i, r) {
                var u = t.setTimeout(i, n);
                r.stop = function() {
                    t.clearTimeout(u)
                }
            })
        }
        ,
        function() {
            var i, n = f.createElement("input"), t = f.createElement("div"), r = f.createElement("select"), e = r.appendChild(f.createElement("option"));
            t = f.createElement("div"),
            t.setAttribute("className", "t"),
            t.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>",
            i = t.getElementsByTagName("a")[0],
            n.setAttribute("type", "checkbox"),
            t.appendChild(n),
            i = t.getElementsByTagName("a")[0],
            i.style.cssText = "top:1px",
            u.getSetAttribute = t.className !== "t",
            u.style = /top/.test(i.getAttribute("style")),
            u.hrefNormalized = i.getAttribute("href") === "/a",
            u.checkOn = !!n.value,
            u.optSelected = e.selected,
            u.enctype = !!f.createElement("form").enctype,
            r.disabled = !0,
            u.optDisabled = !e.disabled,
            n = f.createElement("input"),
            n.setAttribute("value", ""),
            u.input = n.getAttribute("value") === "",
            n.value = "t",
            n.setAttribute("type", "radio"),
            u.radioValue = n.value === "t"
        }(),
        wf = /\r/g,
        bf = /[\x20\t\r\n\f]+/g,
        r.fn.extend({
            val: function(n) {
                var t, i, f, u = this[0];
                return arguments.length ? (f = r.isFunction(n),
                this.each(function(i) {
                    var u;
                    this.nodeType === 1 && (u = f ? n.call(this, i, r(this).val()) : n,
                    u == null ? u = "" : typeof u == "number" ? u += "" : r.isArray(u) && (u = r.map(u, function(n) {
                        return n == null ? "" : n + ""
                    })),
                    t = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()],
                    t && "set"in t && t.set(this, u, "value") !== undefined || (this.value = u))
                })) : u ? (t = r.valHooks[u.type] || r.valHooks[u.nodeName.toLowerCase()],
                t && "get"in t && (i = t.get(u, "value")) !== undefined) ? i : (i = u.value,
                typeof i == "string" ? i.replace(wf, "") : i == null ? "" : i) : void 0
            }
        }),
        r.extend({
            valHooks: {
                option: {
                    get: function(n) {
                        var t = r.find.attr(n, "value");
                        return t != null ? t : r.trim(r.text(n)).replace(bf, " ")
                    }
                },
                select: {
                    get: function(n) {
                        for (var o, t, s = n.options, i = n.selectedIndex, f = n.type === "select-one" || i < 0, h = f ? null : [], c = f ? i + 1 : s.length, e = i < 0 ? c : f ? i : 0; e < c; e++)
                            if (t = s[e],
                            (t.selected || e === i) && (u.optDisabled ? !t.disabled : t.getAttribute("disabled") === null) && (!t.parentNode.disabled || !r.nodeName(t.parentNode, "optgroup"))) {
                                if (o = r(t).val(),
                                f)
                                    return o;
                                h.push(o)
                            }
                        return h
                    },
                    set: function(n, t) {
                        for (var f, i, u = n.options, o = r.makeArray(t), e = u.length; e--; )
                            if (i = u[e],
                            r.inArray(r.valHooks.option.get(i), o) > -1)
                                try {
                                    i.selected = f = !0
                                } catch (s) {
                                    i.scrollHeight
                                }
                            else
                                i.selected = !1;
                        return f || (n.selectedIndex = -1),
                        u
                    }
                }
            }
        }),
        r.each(["radio", "checkbox"], function() {
            r.valHooks[this] = {
                set: function(n, t) {
                    if (r.isArray(t))
                        return n.checked = r.inArray(r(n).val(), t) > -1
                }
            },
            u.checkOn || (r.valHooks[this].get = function(n) {
                return n.getAttribute("value") === null ? "on" : n.value
            }
            )
        });
        var et, kf, a = r.expr.attrHandle, gi = /^(?:checked|selected)$/i, nt = u.getSetAttribute, dt = u.input;
        r.fn.extend({
            attr: function(n, t) {
                return p(this, r.attr, n, t, arguments.length > 1)
            },
            removeAttr: function(n) {
                return this.each(function() {
                    r.removeAttr(this, n)
                })
            }
        }),
        r.extend({
            attr: function(n, t, i) {
                var u, f, e = n.nodeType;
                if (e !== 3 && e !== 8 && e !== 2) {
                    if (typeof n.getAttribute == "undefined")
                        return r.prop(n, t, i);
                    if (e === 1 && r.isXMLDoc(n) || (t = t.toLowerCase(),
                    f = r.attrHooks[t] || (r.expr.match.bool.test(t) ? kf : et)),
                    i !== undefined) {
                        if (i === null) {
                            r.removeAttr(n, t);
                            return
                        }
                        return f && "set"in f && (u = f.set(n, i, t)) !== undefined ? u : (n.setAttribute(t, i + ""),
                        i)
                    }
                    return f && "get"in f && (u = f.get(n, t)) !== null ? u : (u = r.find.attr(n, t),
                    u == null ? undefined : u)
                }
            },
            attrHooks: {
                type: {
                    set: function(n, t) {
                        if (!u.radioValue && t === "radio" && r.nodeName(n, "input")) {
                            var i = n.value;
                            return n.setAttribute("type", t),
                            i && (n.value = i),
                            t
                        }
                    }
                }
            },
            removeAttr: function(n, t) {
                var i, u, e = 0, f = t && t.match(h);
                if (f && n.nodeType === 1)
                    while (i = f[e++])
                        u = r.propFix[i] || i,
                        r.expr.match.bool.test(i) ? dt && nt || !gi.test(i) ? n[u] = !1 : n[r.camelCase("default-" + i)] = n[u] = !1 : r.attr(n, i, ""),
                        n.removeAttribute(nt ? i : u)
            }
        }),
        kf = {
            set: function(n, t, i) {
                return t === !1 ? r.removeAttr(n, i) : dt && nt || !gi.test(i) ? n.setAttribute(!nt && r.propFix[i] || i, i) : n[r.camelCase("default-" + i)] = n[i] = !0,
                i
            }
        },
        r.each(r.expr.match.bool.source.match(/\w+/g), function(n, t) {
            var i = a[t] || r.find.attr;
            a[t] = dt && nt || !gi.test(t) ? function(n, t, r) {
                var u, f;
                return r || (f = a[t],
                a[t] = u,
                u = i(n, t, r) != null ? t.toLowerCase() : null,
                a[t] = f),
                u
            }
            : function(n, t, i) {
                if (!i)
                    return n[r.camelCase("default-" + t)] ? t.toLowerCase() : null
            }
        }),
        dt && nt || (r.attrHooks.value = {
            set: function(n, t, i) {
                if (r.nodeName(n, "input"))
                    n.defaultValue = t;
                else
                    return et && et.set(n, t, i)
            }
        }),
        nt || (et = {
            set: function(n, t, i) {
                var r = n.getAttributeNode(i);
                return r || n.setAttributeNode(r = n.ownerDocument.createAttribute(i)),
                r.value = t += "",
                i === "value" || t === n.getAttribute(i) ? t : void 0
            }
        },
        a.id = a.name = a.coords = function(n, t, i) {
            var r;
            if (!i)
                return (r = n.getAttributeNode(t)) && r.value !== "" ? r.value : null
        }
        ,
        r.valHooks.button = {
            get: function(n, t) {
                var i = n.getAttributeNode(t);
                if (i && i.specified)
                    return i.value
            },
            set: et.set
        },
        r.attrHooks.contenteditable = {
            set: function(n, t, i) {
                et.set(n, t === "" ? !1 : t, i)
            }
        },
        r.each(["width", "height"], function(n, t) {
            r.attrHooks[t] = {
                set: function(n, i) {
                    if (i === "")
                        return n.setAttribute(t, "auto"),
                        i
                }
            }
        })),
        u.style || (r.attrHooks.style = {
            get: function(n) {
                return n.style.cssText || undefined
            },
            set: function(n, t) {
                return n.style.cssText = t + ""
            }
        }),
        df = /^(?:input|select|textarea|button|object)$/i,
        gf = /^(?:a|area)$/i,
        r.fn.extend({
            prop: function(n, t) {
                return p(this, r.prop, n, t, arguments.length > 1)
            },
            removeProp: function(n) {
                return n = r.propFix[n] || n,
                this.each(function() {
                    try {
                        this[n] = undefined,
                        delete this[n]
                    } catch (t) {}
                })
            }
        }),
        r.extend({
            prop: function(n, t, i) {
                var f, u, e = n.nodeType;
                if (e !== 3 && e !== 8 && e !== 2)
                    return (e === 1 && r.isXMLDoc(n) || (t = r.propFix[t] || t,
                    u = r.propHooks[t]),
                    i !== undefined) ? u && "set"in u && (f = u.set(n, i, t)) !== undefined ? f : n[t] = i : u && "get"in u && (f = u.get(n, t)) !== null ? f : n[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(n) {
                        var t = r.find.attr(n, "tabindex");
                        return t ? parseInt(t, 10) : df.test(n.nodeName) || gf.test(n.nodeName) && n.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }),
        u.hrefNormalized || r.each(["href", "src"], function(n, t) {
            r.propHooks[t] = {
                get: function(n) {
                    return n.getAttribute(t, 4)
                }
            }
        }),
        u.optSelected || (r.propHooks.selected = {
            get: function(n) {
                var t = n.parentNode;
                return t && (t.selectedIndex,
                t.parentNode && t.parentNode.selectedIndex),
                null
            },
            set: function(n) {
                var t = n.parentNode;
                t && (t.selectedIndex,
                t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            r.propFix[this.toLowerCase()] = this
        }),
        u.enctype || (r.propFix.enctype = "encoding"),
        gt = /[\t\r\n\f]/g,
        r.fn.extend({
            addClass: function(n) {
                var o, i, t, u, f, s, e, c = 0;
                if (r.isFunction(n))
                    return this.each(function(t) {
                        r(this).addClass(n.call(this, t, tt(this)))
                    });
                if (typeof n == "string" && n)
                    for (o = n.match(h) || []; i = this[c++]; )
                        if (u = tt(i),
                        t = i.nodeType === 1 && (" " + u + " ").replace(gt, " "),
                        t) {
                            for (s = 0; f = o[s++]; )
                                t.indexOf(" " + f + " ") < 0 && (t += f + " ");
                            e = r.trim(t),
                            u !== e && r.attr(i, "class", e)
                        }
                return this
            },
            removeClass: function(n) {
                var o, i, t, u, f, s, e, c = 0;
                if (r.isFunction(n))
                    return this.each(function(t) {
                        r(this).removeClass(n.call(this, t, tt(this)))
                    });
                if (!arguments.length)
                    return this.attr("class", "");
                if (typeof n == "string" && n)
                    for (o = n.match(h) || []; i = this[c++]; )
                        if (u = tt(i),
                        t = i.nodeType === 1 && (" " + u + " ").replace(gt, " "),
                        t) {
                            for (s = 0; f = o[s++]; )
                                while (t.indexOf(" " + f + " ") > -1)
                                    t = t.replace(" " + f + " ", " ");
                            e = r.trim(t),
                            u !== e && r.attr(i, "class", e)
                        }
                return this
            },
            toggleClass: function(n, t) {
                var i = typeof n;
                return typeof t == "boolean" && i === "string" ? t ? this.addClass(n) : this.removeClass(n) : r.isFunction(n) ? this.each(function(i) {
                    r(this).toggleClass(n.call(this, i, tt(this), t), t)
                }) : this.each(function() {
                    var t, f, u, e;
                    if (i === "string")
                        for (f = 0,
                        u = r(this),
                        e = n.match(h) || []; t = e[f++]; )
                            u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                    else
                        (n === undefined || i === "boolean") && (t = tt(this),
                        t && r._data(this, "__className__", t),
                        r.attr(this, "class", t || n === !1 ? "" : r._data(this, "__className__") || ""))
                })
            },
            hasClass: function(n) {
                for (var t, r = 0, i = " " + n + " "; t = this[r++]; )
                    if (t.nodeType === 1 && (" " + tt(t) + " ").replace(gt, " ").indexOf(i) > -1)
                        return !0;
                return !1
            }
        }),
        r.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, t) {
            r.fn[t] = function(n, i) {
                return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
            }
        }),
        r.fn.extend({
            hover: function(n, t) {
                return this.mouseenter(n).mouseleave(t || n)
            }
        });
        var wo = t.location
          , nr = r.now()
          , tr = /\?/
          , bo = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
        r.parseJSON = function(n) {
            if (t.JSON && t.JSON.parse)
                return t.JSON.parse(n + "");
            var f, i = null, u = r.trim(n + "");
            return u && !r.trim(u.replace(bo, function(n, t, r, u) {
                return (f && t && (i = 0),
                i === 0) ? n : (f = r || t,
                i += !u - !r,
                "")
            })) ? Function("return " + u)() : r.error("Invalid JSON: " + n)
        }
        ,
        r.parseXML = function(n) {
            var i, u;
            if (!n || typeof n != "string")
                return null;
            try {
                t.DOMParser ? (u = new t.DOMParser,
                i = u.parseFromString(n, "text/xml")) : (i = new t.ActiveXObject("Microsoft.XMLDOM"),
                i.async = "false",
                i.loadXML(n))
            } catch (f) {
                i = undefined
            }
            return i && i.documentElement && !i.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + n),
            i
        }
        ;
        var ko = /#.*$/
          , ne = /([?&])_=[^&]*/
          , go = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg
          , ns = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
          , ts = /^(?:GET|HEAD)$/
          , is = /^\/\//
          , te = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
          , ie = {}
          , ir = {}
          , re = "*/".concat("*")
          , rr = wo.href
          , ot = te.exec(rr.toLowerCase()) || [];
        r.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: rr,
                type: "GET",
                isLocal: ns.test(ot[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": re,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": r.parseJSON,
                    "text xml": r.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(n, t) {
                return t ? ur(ur(n, r.ajaxSettings), t) : ur(r.ajaxSettings, n)
            },
            ajaxPrefilter: ue(ie),
            ajaxTransport: ue(ir),
            ajax: function(n, i) {
                function w(n, i, h, c) {
                    var y, rt, it, w, tt, l = i;
                    o !== 2 && (o = 2,
                    k && t.clearTimeout(k),
                    a = undefined,
                    b = c || "",
                    f.readyState = n > 0 ? 4 : 0,
                    y = n >= 200 && n < 300 || n === 304,
                    h && (w = rs(u, f, h)),
                    w = us(u, w, f, y),
                    y ? (u.ifModified && (tt = f.getResponseHeader("Last-Modified"),
                    tt && (r.lastModified[e] = tt),
                    tt = f.getResponseHeader("etag"),
                    tt && (r.etag[e] = tt)),
                    n === 204 || u.type === "HEAD" ? l = "nocontent" : n === 304 ? l = "notmodified" : (l = w.state,
                    rt = w.data,
                    it = w.error,
                    y = !it)) : (it = l,
                    (n || !l) && (l = "error",
                    n < 0 && (n = 0))),
                    f.status = n,
                    f.statusText = (i || l) + "",
                    y ? g.resolveWith(s, [rt, l, f]) : g.rejectWith(s, [f, l, it]),
                    f.statusCode(p),
                    p = undefined,
                    v && d.trigger(y ? "ajaxSuccess" : "ajaxError", [f, u, y ? rt : it]),
                    nt.fireWith(s, [f, l]),
                    v && (d.trigger("ajaxComplete", [f, u]),
                    --r.active || r.event.trigger("ajaxStop")))
                }
                typeof n == "object" && (i = n,
                n = undefined),
                i = i || {};
                var c, l, e, b, k, v, a, y, u = r.ajaxSetup({}, i), s = u.context || u, d = u.context && (s.nodeType || s.jquery) ? r(s) : r.event, g = r.Deferred(), nt = r.Callbacks("once memory"), p = u.statusCode || {}, tt = {}, it = {}, o = 0, rt = "canceled", f = {
                    readyState: 0,
                    getResponseHeader: function(n) {
                        var t;
                        if (o === 2) {
                            if (!y)
                                for (y = {}; t = go.exec(b); )
                                    y[t[1].toLowerCase()] = t[2];
                            t = y[n.toLowerCase()]
                        }
                        return t == null ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return o === 2 ? b : null
                    },
                    setRequestHeader: function(n, t) {
                        var i = n.toLowerCase();
                        return o || (n = it[i] = it[i] || n,
                        tt[n] = t),
                        this
                    },
                    overrideMimeType: function(n) {
                        return o || (u.mimeType = n),
                        this
                    },
                    statusCode: function(n) {
                        var t;
                        if (n)
                            if (o < 2)
                                for (t in n)
                                    p[t] = [p[t], n[t]];
                            else
                                f.always(n[f.status]);
                        return this
                    },
                    abort: function(n) {
                        var t = n || rt;
                        return a && a.abort(t),
                        w(0, t),
                        this
                    }
                };
                if (g.promise(f).complete = nt.add,
                f.success = f.done,
                f.error = f.fail,
                u.url = ((n || u.url || rr) + "").replace(ko, "").replace(is, ot[1] + "//"),
                u.type = i.method || i.type || u.method || u.type,
                u.dataTypes = r.trim(u.dataType || "*").toLowerCase().match(h) || [""],
                u.crossDomain == null && (c = te.exec(u.url.toLowerCase()),
                u.crossDomain = !!(c && (c[1] !== ot[1] || c[2] !== ot[2] || (c[3] || (c[1] === "http:" ? "80" : "443")) !== (ot[3] || (ot[1] === "http:" ? "80" : "443"))))),
                u.data && u.processData && typeof u.data != "string" && (u.data = r.param(u.data, u.traditional)),
                fe(ie, u, i, f),
                o === 2)
                    return f;
                v = r.event && u.global,
                v && r.active++ == 0 && r.event.trigger("ajaxStart"),
                u.type = u.type.toUpperCase(),
                u.hasContent = !ts.test(u.type),
                e = u.url,
                u.hasContent || (u.data && (e = u.url += (tr.test(e) ? "&" : "?") + u.data,
                delete u.data),
                u.cache === !1 && (u.url = ne.test(e) ? e.replace(ne, "$1_=" + nr++) : e + (tr.test(e) ? "&" : "?") + "_=" + nr++)),
                u.ifModified && (r.lastModified[e] && f.setRequestHeader("If-Modified-Since", r.lastModified[e]),
                r.etag[e] && f.setRequestHeader("If-None-Match", r.etag[e])),
                (u.data && u.hasContent && u.contentType !== !1 || i.contentType) && f.setRequestHeader("Content-Type", u.contentType),
                f.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + (u.dataTypes[0] !== "*" ? ", " + re + "; q=0.01" : "") : u.accepts["*"]);
                for (l in u.headers)
                    f.setRequestHeader(l, u.headers[l]);
                if (u.beforeSend && (u.beforeSend.call(s, f, u) === !1 || o === 2))
                    return f.abort();
                rt = "abort";
                for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                })
                    f[l](u[l]);
                if (a = fe(ir, u, i, f),
                a) {
                    if (f.readyState = 1,
                    v && d.trigger("ajaxSend", [f, u]),
                    o === 2)
                        return f;
                    u.async && u.timeout > 0 && (k = t.setTimeout(function() {
                        f.abort("timeout")
                    }, u.timeout));
                    try {
                        o = 1,
                        a.send(tt, w)
                    } catch (ut) {
                        if (o < 2)
                            w(-1, ut);
                        else
                            throw ut;
                    }
                } else
                    w(-1, "No Transport");
                return f
            },
            getJSON: function(n, t, i) {
                return r.get(n, t, i, "json")
            },
            getScript: function(n, t) {
                return r.get(n, undefined, t, "script")
            }
        }),
        r.each(["get", "post"], function(n, t) {
            r[t] = function(n, i, u, f) {
                return r.isFunction(i) && (f = f || u,
                u = i,
                i = undefined),
                r.ajax(r.extend({
                    url: n,
                    type: t,
                    dataType: f,
                    data: i,
                    success: u
                }, r.isPlainObject(n) && n))
            }
        }),
        r._evalUrl = function(n) {
            return r.ajax({
                url: n,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }
        ,
        r.fn.extend({
            wrapAll: function(n) {
                if (r.isFunction(n))
                    return this.each(function(t) {
                        r(this).wrapAll(n.call(this, t))
                    });
                if (this[0]) {
                    var t = r(n, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                    t.map(function() {
                        for (var n = this; n.firstChild && n.firstChild.nodeType === 1; )
                            n = n.firstChild;
                        return n
                    }).append(this)
                }
                return this
            },
            wrapInner: function(n) {
                return r.isFunction(n) ? this.each(function(t) {
                    r(this).wrapInner(n.call(this, t))
                }) : this.each(function() {
                    var t = r(this)
                      , i = t.contents();
                    i.length ? i.wrapAll(n) : t.append(n)
                })
            },
            wrap: function(n) {
                var t = r.isFunction(n);
                return this.each(function(i) {
                    r(this).wrapAll(t ? n.call(this, i) : n)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    r.nodeName(this, "body") || r(this).replaceWith(this.childNodes)
                }).end()
            }
        }),
        r.expr.filters.hidden = function(n) {
            return u.reliableHiddenOffsets() ? n.offsetWidth <= 0 && n.offsetHeight <= 0 && !n.getClientRects().length : es(n)
        }
        ,
        r.expr.filters.visible = function(n) {
            return !r.expr.filters.hidden(n)
        }
        ;
        var os = /%20/g
          , ss = /\[\]$/
          , ee = /\r?\n/g
          , hs = /^(?:submit|button|image|reset|file)$/i
          , cs = /^(?:input|select|textarea|keygen)/i;
        r.param = function(n, t) {
            var i, u = [], f = function(n, t) {
                t = r.isFunction(t) ? t() : t == null ? "" : t,
                u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
            };
            if (t === undefined && (t = r.ajaxSettings && r.ajaxSettings.traditional),
            r.isArray(n) || n.jquery && !r.isPlainObject(n))
                r.each(n, function() {
                    f(this.name, this.value)
                });
            else
                for (i in n)
                    fr(i, n[i], t, f);
            return u.join("&").replace(os, "+")
        }
        ,
        r.fn.extend({
            serialize: function() {
                return r.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var n = r.prop(this, "elements");
                    return n ? r.makeArray(n) : this
                }).filter(function() {
                    var n = this.type;
                    return this.name && !r(this).is(":disabled") && cs.test(this.nodeName) && !hs.test(n) && (this.checked || !hi.test(n))
                }).map(function(n, t) {
                    var i = r(this).val();
                    return i == null ? null : r.isArray(i) ? r.map(i, function(n) {
                        return {
                            name: t.name,
                            value: n.replace(ee, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: i.replace(ee, "\r\n")
                    }
                }).get()
            }
        }),
        r.ajaxSettings.xhr = t.ActiveXObject !== undefined ? function() {
            return this.isLocal ? oe() : f.documentMode > 8 ? er() : /^(get|post|head|put|delete|options)$/i.test(this.type) && er() || oe()
        }
        : er;
        var ls = 0
          , ni = {}
          , lt = r.ajaxSettings.xhr();
        return t.attachEvent && t.attachEvent("onunload", function() {
            for (var n in ni)
                ni[n](undefined, !0)
        }),
        u.cors = !!lt && "withCredentials"in lt,
        lt = u.ajax = !!lt,
        lt && r.ajaxTransport(function(n) {
            if (!n.crossDomain || u.cors) {
                var i;
                return {
                    send: function(u, f) {
                        var o, e = n.xhr(), s = ++ls;
                        if (e.open(n.type, n.url, n.async, n.username, n.password),
                        n.xhrFields)
                            for (o in n.xhrFields)
                                e[o] = n.xhrFields[o];
                        n.mimeType && e.overrideMimeType && e.overrideMimeType(n.mimeType),
                        n.crossDomain || u["X-Requested-With"] || (u["X-Requested-With"] = "XMLHttpRequest");
                        for (o in u)
                            u[o] !== undefined && e.setRequestHeader(o, u[o] + "");
                        e.send(n.hasContent && n.data || null),
                        i = function(t, u) {
                            var o, c, h;
                            if (i && (u || e.readyState === 4))
                                if (delete ni[s],
                                i = undefined,
                                e.onreadystatechange = r.noop,
                                u)
                                    e.readyState !== 4 && e.abort();
                                else {
                                    h = {},
                                    o = e.status,
                                    typeof e.responseText == "string" && (h.text = e.responseText);
                                    try {
                                        c = e.statusText
                                    } catch (l) {
                                        c = ""
                                    }
                                    o || !n.isLocal || n.crossDomain ? o === 1223 && (o = 204) : o = h.text ? 200 : 404
                                }
                            h && f(o, c, h, e.getAllResponseHeaders())
                        }
                        ,
                        n.async ? e.readyState === 4 ? t.setTimeout(i) : e.onreadystatechange = ni[s] = i : i()
                    },
                    abort: function() {
                        i && i(undefined, !0)
                    }
                }
            }
        }),
        r.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(n) {
                    return r.globalEval(n),
                    n
                }
            }
        }),
        r.ajaxPrefilter("script", function(n) {
            n.cache === undefined && (n.cache = !1),
            n.crossDomain && (n.type = "GET",
            n.global = !1)
        }),
        r.ajaxTransport("script", function(n) {
            if (n.crossDomain) {
                var t, i = f.head || r("head")[0] || f.documentElement;
                return {
                    send: function(r, u) {
                        t = f.createElement("script"),
                        t.async = !0,
                        n.scriptCharset && (t.charset = n.scriptCharset),
                        t.src = n.url,
                        t.onload = t.onreadystatechange = function(n, i) {
                            (i || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null,
                            t.parentNode && t.parentNode.removeChild(t),
                            t = null,
                            i || u(200, "success"))
                        }
                        ,
                        i.insertBefore(t, i.firstChild)
                    },
                    abort: function() {
                        if (t)
                            t.onload(undefined, !0)
                    }
                }
            }
        }),
        or = [],
        ti = /(=)\?(?=&|$)|\?\?/,
        r.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var n = or.pop() || r.expando + "_" + nr++;
                return this[n] = !0,
                n
            }
        }),
        r.ajaxPrefilter("json jsonp", function(n, i, u) {
            var f, e, o, s = n.jsonp !== !1 && (ti.test(n.url) ? "url" : typeof n.data == "string" && (n.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && ti.test(n.data) && "data");
            if (s || n.dataTypes[0] === "jsonp")
                return f = n.jsonpCallback = r.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
                s ? n[s] = n[s].replace(ti, "$1" + f) : n.jsonp !== !1 && (n.url += (tr.test(n.url) ? "&" : "?") + n.jsonp + "=" + f),
                n.converters["script json"] = function() {
                    return o || r.error(f + " was not called"),
                    o[0]
                }
                ,
                n.dataTypes[0] = "json",
                e = t[f],
                t[f] = function() {
                    o = arguments
                }
                ,
                u.always(function() {
                    e === undefined ? r(t).removeProp(f) : t[f] = e,
                    n[f] && (n.jsonpCallback = i.jsonpCallback,
                    or.push(f)),
                    o && r.isFunction(e) && e(o[0]),
                    o = e = undefined
                }),
                "script"
        }),
        r.parseHTML = function(n, t, i) {
            if (!n || typeof n != "string")
                return null;
            typeof t == "boolean" && (i = t,
            t = !1),
            t = t || f;
            var u = yr.exec(n)
              , e = !i && [];
            return u ? [t.createElement(u[1])] : (u = cu([n], t, e),
            e && e.length && r(e).remove(),
            r.merge([], u.childNodes))
        }
        ,
        sr = r.fn.load,
        r.fn.load = function(n, t, i) {
            if (typeof n != "string" && sr)
                return sr.apply(this, arguments);
            var u, o, s, f = this, e = n.indexOf(" ");
            return e > -1 && (u = r.trim(n.slice(e, n.length)),
            n = n.slice(0, e)),
            r.isFunction(t) ? (i = t,
            t = undefined) : t && typeof t == "object" && (o = "POST"),
            f.length > 0 && r.ajax({
                url: n,
                type: o || "GET",
                dataType: "html",
                data: t
            }).done(function(n) {
                s = arguments,
                f.html(u ? r("<div>").append(r.parseHTML(n)).find(u) : n)
            }).always(i && function(n, t) {
                f.each(function() {
                    i.apply(this, s || [n.responseText, t, n])
                })
            }
            ),
            this
        }
        ,
        r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
            r.fn[t] = function(n) {
                return this.on(t, n)
            }
        }),
        r.expr.filters.animated = function(n) {
            return r.grep(r.timers, function(t) {
                return n === t.elem
            }).length
        }
        ,
        r.offset = {
            setOffset: function(n, t, i) {
                var e, o, s, h, u, c, v, l = r.css(n, "position"), a = r(n), f = {};
                l === "static" && (n.style.position = "relative"),
                u = a.offset(),
                s = r.css(n, "top"),
                c = r.css(n, "left"),
                v = (l === "absolute" || l === "fixed") && r.inArray("auto", [s, c]) > -1,
                v ? (e = a.position(),
                h = e.top,
                o = e.left) : (h = parseFloat(s) || 0,
                o = parseFloat(c) || 0),
                r.isFunction(t) && (t = t.call(n, i, r.extend({}, u))),
                t.top != null && (f.top = t.top - u.top + h),
                t.left != null && (f.left = t.left - u.left + o),
                "using"in t ? t.using.call(n, f) : a.css(f)
            }
        },
        r.fn.extend({
            offset: function(n) {
                if (arguments.length)
                    return n === undefined ? this : this.each(function(t) {
                        r.offset.setOffset(this, n, t)
                    });
                var t, f, u = {
                    top: 0,
                    left: 0
                }, i = this[0], e = i && i.ownerDocument;
                if (e)
                    return (t = e.documentElement,
                    !r.contains(t, i)) ? u : (typeof i.getBoundingClientRect != "undefined" && (u = i.getBoundingClientRect()),
                    f = se(e),
                    {
                        top: u.top + (f.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        left: u.left + (f.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                    })
            },
            position: function() {
                if (this[0]) {
                    var n, i, t = {
                        top: 0,
                        left: 0
                    }, u = this[0];
                    return r.css(u, "position") === "fixed" ? i = u.getBoundingClientRect() : (n = this.offsetParent(),
                    i = this.offset(),
                    r.nodeName(n[0], "html") || (t = n.offset()),
                    t.top += r.css(n[0], "borderTopWidth", !0),
                    t.left += r.css(n[0], "borderLeftWidth", !0)),
                    {
                        top: i.top - t.top - r.css(u, "marginTop", !0),
                        left: i.left - t.left - r.css(u, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var n = this.offsetParent; n && !r.nodeName(n, "html") && r.css(n, "position") === "static"; )
                        n = n.offsetParent;
                    return n || tf
                })
            }
        }),
        r.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(n, t) {
            var i = /Y/.test(t);
            r.fn[n] = function(u) {
                return p(this, function(n, u, f) {
                    var e = se(n);
                    if (f === undefined)
                        return e ? t in e ? e[t] : e.document.documentElement[u] : n[u];
                    e ? e.scrollTo(i ? r(e).scrollLeft() : f, i ? f : r(e).scrollTop()) : n[u] = f
                }, n, u, arguments.length, null)
            }
        }),
        r.each(["top", "left"], function(n, t) {
            r.cssHooks[t] = ki(u.pixelPosition, function(n, i) {
                if (i)
                    return i = w(n, t),
                    wt.test(i) ? r(n).position()[t] + "px" : i
            })
        }),
        r.each({
            Height: "height",
            Width: "width"
        }, function(n, t) {
            r.each({
                padding: "inner" + n,
                content: t,
                "": "outer" + n
            }, function(i, u) {
                r.fn[u] = function(u, f) {
                    var e = arguments.length && (i || typeof u != "boolean")
                      , o = i || (u === !0 || f === !0 ? "margin" : "border");
                    return p(this, function(t, i, u) {
                        var f;
                        return r.isWindow(t) ? t.document.documentElement["client" + n] : t.nodeType === 9 ? (f = t.documentElement,
                        Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n])) : u === undefined ? r.css(t, i, o) : r.style(t, i, u, o)
                    }, t, e ? u : undefined, e, null)
                }
            })
        }),
        r.fn.extend({
            bind: function(n, t, i) {
                return this.on(n, null, t, i)
            },
            unbind: function(n, t) {
                return this.off(n, null, t)
            },
            delegate: function(n, t, i, r) {
                return this.on(t, n, i, r)
            },
            undelegate: function(n, t, i) {
                return arguments.length === 1 ? this.off(n, "**") : this.off(t, n || "**", i)
            }
        }),
        r.fn.size = function() {
            return this.length
        }
        ,
        r.fn.andSelf = r.fn.addBack,
        typeof n == "function" && n.amd && n("jquery", [], function() {
            return r
        }),
        he = t.jQuery,
        ce = t.$,
        r.noConflict = function(n) {
            return t.$ === r && (t.$ = ce),
            n && t.jQuery === r && (t.jQuery = he),
            r
        }
        ,
        i || (t.jQuery = t.$ = r),
        r
    }),
    function() {
        function ft(n) {
            function i(t, i, r, u, f, e) {
                for (; f >= 0 && f < e; f += n) {
                    var o = u ? u[f] : f;
                    r = i(r, t[o], o, t)
                }
                return r
            }
            return function(u, f, e, s) {
                f = o(f, s, 4);
                var h = !r(u) && t.keys(u)
                  , l = (h || u).length
                  , c = n > 0 ? 0 : l - 1;
                return arguments.length < 3 && (e = u[h ? h[c] : c],
                c += n),
                i(u, f, e, h, c, l)
            }
        }
        function et(n) {
            return function(t, r, u) {
                r = i(r, u);
                for (var o = f(t), e = n > 0 ? 0 : o - 1; e >= 0 && e < o; e += n)
                    if (r(t[e], e, t))
                        return e;
                return -1
            }
        }
        function ot(n, i, r) {
            return function(e, o, s) {
                var c = 0
                  , h = f(e);
                if (typeof s == "number")
                    n > 0 ? c = s >= 0 ? s : Math.max(s + h, c) : h = s >= 0 ? Math.min(s + 1, h) : s + h + 1;
                else if (r && s && h)
                    return s = r(e, o),
                    e[s] === o ? s : -1;
                if (o !== o)
                    return s = i(u.call(e, c, h), t.isNaN),
                    s >= 0 ? s + c : -1;
                for (s = n > 0 ? c : h - 1; s >= 0 && s < h; s += n)
                    if (e[s] === o)
                        return s;
                return -1
            }
        }
        function st(n, i) {
            var u = g.length
              , f = n.constructor
              , e = t.isFunction(f) && f.prototype || y
              , r = "constructor";
            for (t.has(n, r) && !t.contains(i, r) && i.push(r); u--; )
                r = g[u],
                r in n && n[r] !== e[r] && !t.contains(i, r) && i.push(r)
        }
        var v = this, at = v._, h = Array.prototype, y = Object.prototype, vt = Function.prototype, yt = h.push, u = h.slice, s = y.toString, pt = y.hasOwnProperty, wt = Array.isArray, tt = Object.keys, p = vt.bind, it = Object.create, w = function() {}, t = function(n) {
            if (n instanceof t)
                return n;
            if (!(this instanceof t))
                return new t(n);
            this._wrapped = n
        }, o, i, c, e, k, d, g, l, lt, a;
        typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = t),
        exports._ = t) : v._ = t,
        t.VERSION = "1.8.3",
        o = function(n, t, i) {
            if (t === void 0)
                return n;
            switch (i == null ? 3 : i) {
            case 1:
                return function(i) {
                    return n.call(t, i)
                }
                ;
            case 2:
                return function(i, r) {
                    return n.call(t, i, r)
                }
                ;
            case 3:
                return function(i, r, u) {
                    return n.call(t, i, r, u)
                }
                ;
            case 4:
                return function(i, r, u, f) {
                    return n.call(t, i, r, u, f)
                }
            }
            return function() {
                return n.apply(t, arguments)
            }
        }
        ,
        i = function(n, i, r) {
            return n == null ? t.identity : t.isFunction(n) ? o(n, i, r) : t.isObject(n) ? t.matcher(n) : t.property(n)
        }
        ,
        t.iteratee = function(n, t) {
            return i(n, t, Infinity)
        }
        ;
        var b = function(n, t) {
            return function(i) {
                var e = arguments.length, r, u, f;
                if (e < 2 || i == null)
                    return i;
                for (r = 1; r < e; r++) {
                    var o = arguments[r]
                      , s = n(o)
                      , h = s.length;
                    for (u = 0; u < h; u++)
                        f = s[u],
                        t && i[f] !== void 0 || (i[f] = o[f])
                }
                return i
            }
        }
          , rt = function(n) {
            if (!t.isObject(n))
                return {};
            if (it)
                return it(n);
            w.prototype = n;
            var i = new w;
            return w.prototype = null,
            i
        }
          , ut = function(n) {
            return function(t) {
                if (t != null)
                    return t[n]
            }
        }
          , bt = Math.pow(2, 53) - 1
          , f = ut("length")
          , r = function(n) {
            var t = f(n);
            return typeof t == "number" && t >= 0 && t <= bt
        };
        t.each = t.forEach = function(n, i, u) {
            var f, e, s;
            if (i = o(i, u),
            r(n))
                for (f = 0,
                e = n.length; f < e; f++)
                    i(n[f], f, n);
            else
                for (s = t.keys(n),
                f = 0,
                e = s.length; f < e; f++)
                    i(n[s[f]], s[f], n);
            return n
        }
        ,
        t.map = t.collect = function(n, u, f) {
            var e, s;
            u = i(u, f);
            var o = !r(n) && t.keys(n)
              , h = (o || n).length
              , c = Array(h);
            for (e = 0; e < h; e++)
                s = o ? o[e] : e,
                c[e] = u(n[s], s, n);
            return c
        }
        ,
        t.reduce = t.foldl = t.inject = ft(1),
        t.reduceRight = t.foldr = ft(-1),
        t.find = t.detect = function(n, i, u) {
            var f;
            return f = r(n) ? t.findIndex(n, i, u) : t.findKey(n, i, u),
            f !== void 0 && f !== -1 ? n[f] : void 0
        }
        ,
        t.filter = t.select = function(n, r, u) {
            var f = [];
            return r = i(r, u),
            t.each(n, function(n, t, i) {
                r(n, t, i) && f.push(n)
            }),
            f
        }
        ,
        t.reject = function(n, r, u) {
            return t.filter(n, t.negate(i(r)), u)
        }
        ,
        t.every = t.all = function(n, u, f) {
            var o, h, e, s;
            for (u = i(u, f),
            o = !r(n) && t.keys(n),
            h = (o || n).length,
            e = 0; e < h; e++)
                if (s = o ? o[e] : e,
                !u(n[s], s, n))
                    return !1;
            return !0
        }
        ,
        t.some = t.any = function(n, u, f) {
            var o, h, e, s;
            for (u = i(u, f),
            o = !r(n) && t.keys(n),
            h = (o || n).length,
            e = 0; e < h; e++)
                if (s = o ? o[e] : e,
                u(n[s], s, n))
                    return !0;
            return !1
        }
        ,
        t.contains = t.includes = t.include = function(n, i, u, f) {
            return r(n) || (n = t.values(n)),
            (typeof u != "number" || f) && (u = 0),
            t.indexOf(n, i, u) >= 0
        }
        ,
        t.invoke = function(n, i) {
            var r = u.call(arguments, 2)
              , f = t.isFunction(i);
            return t.map(n, function(n) {
                var t = f ? i : n[i];
                return t == null ? t : t.apply(n, r)
            })
        }
        ,
        t.pluck = function(n, i) {
            return t.map(n, t.property(i))
        }
        ,
        t.where = function(n, i) {
            return t.filter(n, t.matcher(i))
        }
        ,
        t.findWhere = function(n, i) {
            return t.find(n, t.matcher(i))
        }
        ,
        t.max = function(n, u, f) {
            var e = -Infinity, c = -Infinity, h, o, s, l;
            if (u == null && n != null)
                for (n = r(n) ? n : t.values(n),
                s = 0,
                l = n.length; s < l; s++)
                    h = n[s],
                    h > e && (e = h);
            else
                u = i(u, f),
                t.each(n, function(n, t, i) {
                    o = u(n, t, i),
                    (o > c || o === -Infinity && e === -Infinity) && (e = n,
                    c = o)
                });
            return e
        }
        ,
        t.min = function(n, u, f) {
            var e = Infinity, c = Infinity, h, o, s, l;
            if (u == null && n != null)
                for (n = r(n) ? n : t.values(n),
                s = 0,
                l = n.length; s < l; s++)
                    h = n[s],
                    h < e && (e = h);
            else
                u = i(u, f),
                t.each(n, function(n, t, i) {
                    o = u(n, t, i),
                    (o < c || o === Infinity && e === Infinity) && (e = n,
                    c = o)
                });
            return e
        }
        ,
        t.shuffle = function(n) {
            for (var e = r(n) ? n : t.values(n), o = e.length, u = Array(o), f, i = 0; i < o; i++)
                f = t.random(0, i),
                f !== i && (u[i] = u[f]),
                u[f] = e[i];
            return u
        }
        ,
        t.sample = function(n, i, u) {
            return i == null || u ? (r(n) || (n = t.values(n)),
            n[t.random(n.length - 1)]) : t.shuffle(n).slice(0, Math.max(0, i))
        }
        ,
        t.sortBy = function(n, r, u) {
            return r = i(r, u),
            t.pluck(t.map(n, function(n, t, i) {
                return {
                    value: n,
                    index: t,
                    criteria: r(n, t, i)
                }
            }).sort(function(n, t) {
                var i = n.criteria
                  , r = t.criteria;
                if (i !== r) {
                    if (i > r || i === void 0)
                        return 1;
                    if (i < r || r === void 0)
                        return -1
                }
                return n.index - t.index
            }), "value")
        }
        ,
        c = function(n) {
            return function(r, u, f) {
                var e = {};
                return u = i(u, f),
                t.each(r, function(t, i) {
                    var f = u(t, i, r);
                    n(e, t, f)
                }),
                e
            }
        }
        ,
        t.groupBy = c(function(n, i, r) {
            t.has(n, r) ? n[r].push(i) : n[r] = [i]
        }),
        t.indexBy = c(function(n, t, i) {
            n[i] = t
        }),
        t.countBy = c(function(n, i, r) {
            t.has(n, r) ? n[r]++ : n[r] = 1
        }),
        t.toArray = function(n) {
            return n ? t.isArray(n) ? u.call(n) : r(n) ? t.map(n, t.identity) : t.values(n) : []
        }
        ,
        t.size = function(n) {
            return n == null ? 0 : r(n) ? n.length : t.keys(n).length
        }
        ,
        t.partition = function(n, r, u) {
            r = i(r, u);
            var f = []
              , e = [];
            return t.each(n, function(n, t, i) {
                (r(n, t, i) ? f : e).push(n)
            }),
            [f, e]
        }
        ,
        t.first = t.head = t.take = function(n, i, r) {
            if (n != null)
                return i == null || r ? n[0] : t.initial(n, n.length - i)
        }
        ,
        t.initial = function(n, t, i) {
            return u.call(n, 0, Math.max(0, n.length - (t == null || i ? 1 : t)))
        }
        ,
        t.last = function(n, i, r) {
            if (n != null)
                return i == null || r ? n[n.length - 1] : t.rest(n, Math.max(0, n.length - i))
        }
        ,
        t.rest = t.tail = t.drop = function(n, t, i) {
            return u.call(n, t == null || i ? 1 : t)
        }
        ,
        t.compact = function(n) {
            return t.filter(n, t.identity)
        }
        ,
        e = function(n, i, u, o) {
            for (var h = [], v = 0, s, l, a, c = o || 0, y = f(n); c < y; c++)
                if (s = n[c],
                r(s) && (t.isArray(s) || t.isArguments(s)))
                    for (i || (s = e(s, i, u)),
                    l = 0,
                    a = s.length,
                    h.length += a; l < a; )
                        h[v++] = s[l++];
                else
                    u || (h[v++] = s);
            return h
        }
        ,
        t.flatten = function(n, t) {
            return e(n, t, !1)
        }
        ,
        t.without = function(n) {
            return t.difference(n, u.call(arguments, 1))
        }
        ,
        t.uniq = t.unique = function(n, r, u, e) {
            var s, c, h, a, o, l;
            for (t.isBoolean(r) || (e = u,
            u = r,
            r = !1),
            u != null && (u = i(u, e)),
            s = [],
            c = [],
            h = 0,
            a = f(n); h < a; h++)
                o = n[h],
                l = u ? u(o, h, n) : o,
                r ? (h && c === l || s.push(o),
                c = l) : u ? t.contains(c, l) || (c.push(l),
                s.push(o)) : t.contains(s, o) || s.push(o);
            return s
        }
        ,
        t.union = function() {
            return t.uniq(e(arguments, !0, !0))
        }
        ,
        t.intersection = function(n) {
            for (var e = [], o = arguments.length, u, i, r = 0, s = f(n); r < s; r++)
                if (u = n[r],
                !t.contains(e, u)) {
                    for (i = 1; i < o; i++)
                        if (!t.contains(arguments[i], u))
                            break;
                    i === o && e.push(u)
                }
            return e
        }
        ,
        t.difference = function(n) {
            var i = e(arguments, !0, !0, 1);
            return t.filter(n, function(n) {
                return !t.contains(i, n)
            })
        }
        ,
        t.zip = function() {
            return t.unzip(arguments)
        }
        ,
        t.unzip = function(n) {
            for (var r = n && t.max(n, f).length || 0, u = Array(r), i = 0; i < r; i++)
                u[i] = t.pluck(n, i);
            return u
        }
        ,
        t.object = function(n, t) {
            for (var r = {}, i = 0, u = f(n); i < u; i++)
                t ? r[n[i]] = t[i] : r[n[i][0]] = n[i][1];
            return r
        }
        ,
        t.findIndex = et(1),
        t.findLastIndex = et(-1),
        t.sortedIndex = function(n, t, r, u) {
            var o;
            r = i(r, u, 1);
            for (var h = r(t), e = 0, s = f(n); e < s; )
                o = Math.floor((e + s) / 2),
                r(n[o]) < h ? e = o + 1 : s = o;
            return e
        }
        ,
        t.indexOf = ot(1, t.findIndex, t.sortedIndex),
        t.lastIndexOf = ot(-1, t.findLastIndex),
        t.range = function(n, t, i) {
            var u, f, r;
            for (t == null && (t = n || 0,
            n = 0),
            i = i || 1,
            u = Math.max(Math.ceil((t - n) / i), 0),
            f = Array(u),
            r = 0; r < u; r++,
            n += i)
                f[r] = n;
            return f
        }
        ,
        k = function(n, i, r, u, f) {
            if (!(u instanceof i))
                return n.apply(r, f);
            var e = rt(n.prototype)
              , o = n.apply(e, f);
            return t.isObject(o) ? o : e
        }
        ,
        t.bind = function(n, i) {
            if (p && n.bind === p)
                return p.apply(n, u.call(arguments, 1));
            if (!t.isFunction(n))
                throw new TypeError("Bind must be called on a function");
            var f = u.call(arguments, 2)
              , r = function() {
                return k(n, r, i, this, f.concat(u.call(arguments)))
            };
            return r
        }
        ,
        t.partial = function(n) {
            var i = u.call(arguments, 1)
              , r = function() {
                for (var f = 0, o = i.length, e = Array(o), u = 0; u < o; u++)
                    e[u] = i[u] === t ? arguments[f++] : i[u];
                while (f < arguments.length)
                    e.push(arguments[f++]);
                return k(n, r, this, this, e)
            };
            return r
        }
        ,
        t.bindAll = function(n) {
            var i, u = arguments.length, r;
            if (u <= 1)
                throw new Error("bindAll must be passed function names");
            for (i = 1; i < u; i++)
                r = arguments[i],
                n[r] = t.bind(n[r], n);
            return n
        }
        ,
        t.memoize = function(n, i) {
            var r = function(u) {
                var f = r.cache
                  , e = "" + (i ? i.apply(this, arguments) : u);
                return t.has(f, e) || (f[e] = n.apply(this, arguments)),
                f[e]
            };
            return r.cache = {},
            r
        }
        ,
        t.delay = function(n, t) {
            var i = u.call(arguments, 2);
            return setTimeout(function() {
                return n.apply(null, i)
            }, t)
        }
        ,
        t.defer = t.partial(t.delay, t, 1),
        t.throttle = function(n, i, r) {
            var f, e, s, u = null, o = 0, h;
            return r || (r = {}),
            h = function() {
                o = r.leading === !1 ? 0 : t.now(),
                u = null,
                s = n.apply(f, e),
                u || (f = e = null)
            }
            ,
            function() {
                var l = t.now(), c;
                return o || r.leading !== !1 || (o = l),
                c = i - (l - o),
                f = this,
                e = arguments,
                c <= 0 || c > i ? (u && (clearTimeout(u),
                u = null),
                o = l,
                s = n.apply(f, e),
                u || (f = e = null)) : u || r.trailing === !1 || (u = setTimeout(h, c)),
                s
            }
        }
        ,
        t.debounce = function(n, i, r) {
            var u, f, e, s, o, h = function() {
                var c = t.now() - s;
                c < i && c >= 0 ? u = setTimeout(h, i - c) : (u = null,
                r || (o = n.apply(e, f),
                u || (e = f = null)))
            };
            return function() {
                e = this,
                f = arguments,
                s = t.now();
                var c = r && !u;
                return u || (u = setTimeout(h, i)),
                c && (o = n.apply(e, f),
                e = f = null),
                o
            }
        }
        ,
        t.wrap = function(n, i) {
            return t.partial(i, n)
        }
        ,
        t.negate = function(n) {
            return function() {
                return !n.apply(this, arguments)
            }
        }
        ,
        t.compose = function() {
            var n = arguments
              , t = n.length - 1;
            return function() {
                for (var r = t, i = n[t].apply(this, arguments); r--; )
                    i = n[r].call(this, i);
                return i
            }
        }
        ,
        t.after = function(n, t) {
            return function() {
                if (--n < 1)
                    return t.apply(this, arguments)
            }
        }
        ,
        t.before = function(n, t) {
            var i;
            return function() {
                return --n > 0 && (i = t.apply(this, arguments)),
                n <= 1 && (t = null),
                i
            }
        }
        ,
        t.once = t.partial(t.before, 2),
        d = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        g = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
        t.keys = function(n) {
            var i, r;
            if (!t.isObject(n))
                return [];
            if (tt)
                return tt(n);
            i = [];
            for (r in n)
                t.has(n, r) && i.push(r);
            return d && st(n, i),
            i
        }
        ,
        t.allKeys = function(n) {
            var i, r;
            if (!t.isObject(n))
                return [];
            i = [];
            for (r in n)
                i.push(r);
            return d && st(n, i),
            i
        }
        ,
        t.values = function(n) {
            for (var r = t.keys(n), u = r.length, f = Array(u), i = 0; i < u; i++)
                f[i] = n[r[i]];
            return f
        }
        ,
        t.mapObject = function(n, r, u) {
            var e;
            r = i(r, u);
            var o = t.keys(n), h = o.length, s = {}, f;
            for (e = 0; e < h; e++)
                f = o[e],
                s[f] = r(n[f], f, n);
            return s
        }
        ,
        t.pairs = function(n) {
            for (var r = t.keys(n), u = r.length, f = Array(u), i = 0; i < u; i++)
                f[i] = [r[i], n[r[i]]];
            return f
        }
        ,
        t.invert = function(n) {
            for (var u = {}, r = t.keys(n), i = 0, f = r.length; i < f; i++)
                u[n[r[i]]] = r[i];
            return u
        }
        ,
        t.functions = t.methods = function(n) {
            var r = [], i;
            for (i in n)
                t.isFunction(n[i]) && r.push(i);
            return r.sort()
        }
        ,
        t.extend = b(t.allKeys),
        t.extendOwn = t.assign = b(t.keys),
        t.findKey = function(n, r, u) {
            var o, f, e, s;
            for (r = i(r, u),
            o = t.keys(n),
            e = 0,
            s = o.length; e < s; e++)
                if (f = o[e],
                r(n[f], f, n))
                    return f
        }
        ,
        t.pick = function(n, i, r) {
            var c = {}, u = n, l, f, s, v, h, a;
            if (u == null)
                return c;
            for (t.isFunction(i) ? (f = t.allKeys(u),
            l = o(i, r)) : (f = e(arguments, !1, !1, 1),
            l = function(n, t, i) {
                return t in i
            }
            ,
            u = Object(u)),
            s = 0,
            v = f.length; s < v; s++)
                h = f[s],
                a = u[h],
                l(a, h, u) && (c[h] = a);
            return c
        }
        ,
        t.omit = function(n, i, r) {
            if (t.isFunction(i))
                i = t.negate(i);
            else {
                var u = t.map(e(arguments, !1, !1, 1), String);
                i = function(n, i) {
                    return !t.contains(u, i)
                }
            }
            return t.pick(n, i, r)
        }
        ,
        t.defaults = b(t.allKeys, !0),
        t.create = function(n, i) {
            var r = rt(n);
            return i && t.extendOwn(r, i),
            r
        }
        ,
        t.clone = function(n) {
            return t.isObject(n) ? t.isArray(n) ? n.slice() : t.extend({}, n) : n
        }
        ,
        t.tap = function(n, t) {
            return t(n),
            n
        }
        ,
        t.isMatch = function(n, i) {
            var e = t.keys(i), o = e.length, f, r, u;
            if (n == null)
                return !o;
            for (f = Object(n),
            r = 0; r < o; r++)
                if (u = e[r],
                i[u] !== f[u] || !(u in f))
                    return !1;
            return !0
        }
        ,
        l = function(n, i, r, u) {
            var h, a, e, o, f, v, c;
            if (n === i)
                return n !== 0 || 1 / n == 1 / i;
            if (n == null || i == null)
                return n === i;
            if (n instanceof t && (n = n._wrapped),
            i instanceof t && (i = i._wrapped),
            h = s.call(n),
            h !== s.call(i))
                return !1;
            switch (h) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + i;
            case "[object Number]":
                return +n != +n ? +i != +i : +n == 0 ? 1 / +n == 1 / i : +n == +i;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +i
            }
            if (a = h === "[object Array]",
            !a && (typeof n != "object" || typeof i != "object" || (e = n.constructor,
            o = i.constructor,
            e !== o && !(t.isFunction(e) && e instanceof e && t.isFunction(o) && o instanceof o) && "constructor"in n && "constructor"in i)))
                return !1;
            for (r = r || [],
            u = u || [],
            f = r.length; f--; )
                if (r[f] === n)
                    return u[f] === i;
            if (r.push(n),
            u.push(i),
            a) {
                if (f = n.length,
                f !== i.length)
                    return !1;
                while (f--)
                    if (!l(n[f], i[f], r, u))
                        return !1
            } else {
                if (v = t.keys(n),
                f = v.length,
                t.keys(i).length !== f)
                    return !1;
                while (f--)
                    if (c = v[f],
                    !(t.has(i, c) && l(n[c], i[c], r, u)))
                        return !1
            }
            return r.pop(),
            u.pop(),
            !0
        }
        ,
        t.isEqual = function(n, t) {
            return l(n, t)
        }
        ,
        t.isEmpty = function(n) {
            return n == null ? !0 : r(n) && (t.isArray(n) || t.isString(n) || t.isArguments(n)) ? n.length === 0 : t.keys(n).length === 0
        }
        ,
        t.isElement = function(n) {
            return !!(n && n.nodeType === 1)
        }
        ,
        t.isArray = wt || function(n) {
            return s.call(n) === "[object Array]"
        }
        ,
        t.isObject = function(n) {
            var t = typeof n;
            return t === "function" || t === "object" && !!n
        }
        ,
        t.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
            t["is" + n] = function(t) {
                return s.call(t) === "[object " + n + "]"
            }
        }),
        t.isArguments(arguments) || (t.isArguments = function(n) {
            return t.has(n, "callee")
        }
        ),
        typeof /./ != "function" && typeof Int8Array != "object" && (t.isFunction = function(n) {
            return typeof n == "function" || !1
        }
        ),
        t.isFinite = function(n) {
            return isFinite(n) && !isNaN(parseFloat(n))
        }
        ,
        t.isNaN = function(n) {
            return t.isNumber(n) && n !== +n
        }
        ,
        t.isBoolean = function(n) {
            return n === !0 || n === !1 || s.call(n) === "[object Boolean]"
        }
        ,
        t.isNull = function(n) {
            return n === null
        }
        ,
        t.isUndefined = function(n) {
            return n === void 0
        }
        ,
        t.has = function(n, t) {
            return n != null && pt.call(n, t)
        }
        ,
        t.noConflict = function() {
            return v._ = at,
            this
        }
        ,
        t.identity = function(n) {
            return n
        }
        ,
        t.constant = function(n) {
            return function() {
                return n
            }
        }
        ,
        t.noop = function() {}
        ,
        t.property = ut,
        t.propertyOf = function(n) {
            return n == null ? function() {}
            : function(t) {
                return n[t]
            }
        }
        ,
        t.matcher = t.matches = function(n) {
            return n = t.extendOwn({}, n),
            function(i) {
                return t.isMatch(i, n)
            }
        }
        ,
        t.times = function(n, t, i) {
            var u = Array(Math.max(0, n)), r;
            for (t = o(t, i, 1),
            r = 0; r < n; r++)
                u[r] = t(r);
            return u
        }
        ,
        t.random = function(n, t) {
            return t == null && (t = n,
            n = 0),
            n + Math.floor(Math.random() * (t - n + 1))
        }
        ,
        t.now = Date.now || function() {
            return +new Date
        }
        ;
        var ht = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }
          , kt = t.invert(ht)
          , ct = function(n) {
            var r = function(t) {
                return n[t]
            }
              , i = "(?:" + t.keys(n).join("|") + ")"
              , u = RegExp(i)
              , f = RegExp(i, "g");
            return function(n) {
                return n = n == null ? "" : "" + n,
                u.test(n) ? n.replace(f, r) : n
            }
        };
        t.escape = ct(ht),
        t.unescape = ct(kt),
        t.result = function(n, i, r) {
            var u = n == null ? void 0 : n[i];
            return u === void 0 && (u = r),
            t.isFunction(u) ? u.call(n) : u
        }
        ,
        lt = 0,
        t.uniqueId = function(n) {
            var t = ++lt + "";
            return n ? n + t : t
        }
        ,
        t.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var nt = /(.)^/
          , dt = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , gt = /\\|'|\r|\n|\u2028|\u2029/g
          , ni = function(n) {
            return "\\" + dt[n]
        };
        t.template = function(n, i, r) {
            var o, f, s;
            !i && r && (i = r),
            i = t.defaults({}, i, t.templateSettings);
            var h = RegExp([(i.escape || nt).source, (i.interpolate || nt).source, (i.evaluate || nt).source].join("|") + "|$", "g")
              , e = 0
              , u = "__p+='";
            n.replace(h, function(t, i, r, f, o) {
                return u += n.slice(e, o).replace(gt, ni),
                e = o + t.length,
                i ? u += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : r ? u += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : f && (u += "';\n" + f + "\n__p+='"),
                t
            }),
            u += "';\n",
            i.variable || (u = "with(obj||{}){\n" + u + "}\n"),
            u = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + u + "return __p;\n";
            try {
                o = new Function(i.variable || "obj","_",u)
            } catch (c) {
                c.source = u;
                throw c;
            }
            return f = function(n) {
                return o.call(this, n, t)
            }
            ,
            s = i.variable || "obj",
            f.source = "function(" + s + "){\n" + u + "}",
            f
        }
        ,
        t.chain = function(n) {
            var i = t(n);
            return i._chain = !0,
            i
        }
        ,
        a = function(n, i) {
            return n._chain ? t(i).chain() : i
        }
        ,
        t.mixin = function(n) {
            t.each(t.functions(n), function(i) {
                var r = t[i] = n[i];
                t.prototype[i] = function() {
                    var n = [this._wrapped];
                    return yt.apply(n, arguments),
                    a(this, r.apply(t, n))
                }
            })
        }
        ,
        t.mixin(t),
        t.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
            var i = h[n];
            t.prototype[n] = function() {
                var t = this._wrapped;
                return i.apply(t, arguments),
                (n === "shift" || n === "splice") && t.length === 0 && delete t[0],
                a(this, t)
            }
        }),
        t.each(["concat", "join", "slice"], function(n) {
            var i = h[n];
            t.prototype[n] = function() {
                return a(this, i.apply(this._wrapped, arguments))
            }
        }),
        t.prototype.value = function() {
            return this._wrapped
        }
        ,
        t.prototype.valueOf = t.prototype.toJSON = t.prototype.value,
        t.prototype.toString = function() {
            return "" + this._wrapped
        }
        ,
        typeof n == "function" && n.amd && n("underscore", [], function() {
            return t
        })
    }
    .call(this),
    function(n) {
        var t = navigator.userAgent;
        n.HTMLPictureElement && /ecko/.test(t) && t.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", function() {
            var r, u = document.createElement("source"), e = function(n) {
                var i, r, t = n.parentNode;
                t.nodeName.toUpperCase() === "PICTURE" ? (i = u.cloneNode(),
                t.insertBefore(i, t.firstElementChild),
                setTimeout(function() {
                    t.removeChild(i)
                })) : (!n._pfLastSize || n.offsetWidth > n._pfLastSize) && (n._pfLastSize = n.offsetWidth,
                r = n.sizes,
                n.sizes += ",100vw",
                setTimeout(function() {
                    n.sizes = r
                }))
            }, o = function() {
                for (var t = document.querySelectorAll("picture > img, img[srcset][sizes]"), n = 0; n < t.length; n++)
                    e(t[n])
            }, t = function() {
                clearTimeout(r),
                r = setTimeout(o, 99)
            }, i = n.matchMedia && matchMedia("(orientation: landscape)"), f = function() {
                t(),
                i && i.addListener && i.addListener(t)
            };
            return u.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            /^[c|i]|d$/.test(document.readyState || "") ? f() : document.addEventListener("DOMContentLoaded", f),
            t
        }())
    }(window),
    function(t, i, r) {
        "use strict";
        function k(n) {
            return n === " " || n === "\t" || n === "\n" || n === "\f" || n === "\r"
        }
        function ei(n, i) {
            var r = new t.Image;
            return r.onerror = function() {
                s[n] = !1,
                e()
            }
            ,
            r.onload = function() {
                s[n] = r.width === 1,
                e()
            }
            ,
            r.src = i,
            "pending"
        }
        function oi() {
            w = !1,
            v = t.devicePixelRatio,
            c = {},
            b = {},
            u.DPR = v || 1,
            f.width = Math.max(t.innerWidth || 0, o.clientWidth),
            f.height = Math.max(t.innerHeight || 0, o.clientHeight),
            f.vw = f.width / 100,
            f.vh = f.height / 100,
            y = [f.height, f.width, v].join("-"),
            f.em = u.getEmValue(),
            f.rem = f.em
        }
        function si(n, t, i, r) {
            var f, o, e, u;
            return p.algorithm === "saveData" ? n > 2.7 ? u = i + 1 : (o = t - i,
            f = Math.pow(n - .6, 1.5),
            e = o * f,
            r && (e += .1 * f),
            u = n + e) : u = i > 1 ? Math.sqrt(n * t) : n,
            u > i
        }
        function hi(n) {
            var i, t = u.getSet(n), r = !1;
            t !== "pending" && (r = y,
            t && (i = u.setRes(t),
            u.applySetCandidate(i, n))),
            n[u.ns].evaled = r
        }
        function ci(n, t) {
            return n.res - t.res
        }
        function li(n, t, i) {
            var r;
            return !i && t && (i = n[u.ns].sets,
            i = i && i[i.length - 1]),
            r = wt(t, i),
            r && (t = u.makeUrl(t),
            n[u.ns].curSrc = t,
            n[u.ns].curCan = r,
            r.res || et(r, r.set.sizes)),
            r
        }
        function wt(n, t) {
            var i, f, r;
            if (n && t)
                for (r = u.parseSet(t),
                n = u.makeUrl(n),
                i = 0; i < r.length; i++)
                    if (n === u.makeUrl(r[i].url)) {
                        f = r[i];
                        break
                    }
            return f
        }
        function ai(n, t) {
            for (var i, f, e = n.getElementsByTagName("source"), r = 0, o = e.length; r < o; r++)
                i = e[r],
                i[u.ns] = !0,
                f = i.getAttribute("srcset"),
                f && t.push({
                    srcset: f,
                    media: i.getAttribute("media"),
                    type: i.getAttribute("type"),
                    sizes: i.getAttribute("sizes")
                })
        }
        function vi(n, t) {
            function h(t) {
                var i, r = t.exec(n.substring(e));
                if (r)
                    return i = r[0],
                    e += i.length,
                    i
            }
            function s() {
                for (var n = !1, u, r, e, i = {}, h, a, s, l, y, v = 0; v < f.length; v++)
                    h = f[v],
                    a = h[h.length - 1],
                    s = h.substring(0, h.length - 1),
                    l = parseInt(s, 10),
                    y = parseFloat(s),
                    vt.test(s) && a === "w" ? ((u || r) && (n = !0),
                    l === 0 ? n = !0 : u = l) : fi.test(s) && a === "x" ? ((u || r || e) && (n = !0),
                    y < 0 ? n = !0 : r = y) : vt.test(s) && a === "h" ? ((e || r) && (n = !0),
                    l === 0 ? n = !0 : e = l) : n = !0;
                n || (i.url = o,
                u && (i.w = u),
                r && (i.d = r),
                e && (i.h = e),
                e || r || u || (i.d = 1),
                i.d === 1 && (t.has1x = !0),
                i.set = t,
                c.push(i))
            }
            function a() {
                for (h(ti),
                i = "",
                u = "in descriptor"; ; ) {
                    if (r = n.charAt(e),
                    u === "in descriptor")
                        if (k(r))
                            i && (f.push(i),
                            i = "",
                            u = "after descriptor");
                        else {
                            if (r === ",") {
                                e += 1,
                                i && f.push(i),
                                s();
                                return
                            }
                            if (r === "(")
                                i = i + r,
                                u = "in parens";
                            else {
                                if (r === "") {
                                    i && f.push(i),
                                    s();
                                    return
                                }
                                i = i + r
                            }
                        }
                    else if (u === "in parens")
                        if (r === ")")
                            i = i + r,
                            u = "in descriptor";
                        else {
                            if (r === "") {
                                f.push(i),
                                s();
                                return
                            }
                            i = i + r
                        }
                    else if (u === "after descriptor" && !k(r)) {
                        if (r === "") {
                            s();
                            return
                        }
                        u = "in descriptor",
                        e -= 1
                    }
                    e += 1
                }
            }
            for (var l = n.length, o, f, i, u, r, e = 0, c = []; ; ) {
                if (h(ii),
                e >= l)
                    return c;
                o = h(ri),
                f = [],
                o.slice(-1) === "," ? (o = o.replace(ui, ""),
                s()) : a()
            }
        }
        function yi(n) {
            function c(n) {
                function f() {
                    r && (u.push(r),
                    r = "")
                }
                function h() {
                    u[0] && (s.push(u),
                    u = [])
                }
                for (var i, r = "", u = [], s = [], e = 0, t = 0, o = !1; ; ) {
                    if (i = n.charAt(t),
                    i === "")
                        return f(),
                        h(),
                        s;
                    if (o)
                        if (i === "*" && n[t + 1] === "/") {
                            o = !1,
                            t += 2,
                            f();
                            continue
                        } else {
                            t += 1;
                            continue
                        }
                    else if (k(i))
                        if (n.charAt(t - 1) && k(n.charAt(t - 1)) || !r) {
                            t += 1;
                            continue
                        } else if (e === 0) {
                            f(),
                            t += 1;
                            continue
                        } else
                            i = " ";
                    else if (i === "(")
                        e += 1;
                    else if (i === ")")
                        e -= 1;
                    else if (i === ",") {
                        f(),
                        h(),
                        t += 1;
                        continue
                    } else if (i === "/" && n.charAt(t + 1) === "*") {
                        o = !0,
                        t += 2;
                        continue
                    }
                    r = r + i,
                    t += 1
                }
            }
            function l(n) {
                return s.test(n) && parseFloat(n) >= 0 ? !0 : h.test(n) ? !0 : n === "0" || n === "-0" || n === "+0" ? !0 : !1
            }
            var s = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i, h = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i, i, r, o, t, f, e;
            for (r = c(n),
            o = r.length,
            i = 0; i < o; i++) {
                if (t = r[i],
                f = t[t.length - 1],
                l(f))
                    e = f,
                    t.pop();
                else
                    continue;
                if (t.length === 0)
                    return e;
                if (t = t.join(" "),
                u.matchesMedia(t))
                    return e
            }
            return "100vw"
        }
        i.createElement("picture");
        var bt, l, ot, y, u = {}, d = !1, a = function() {}, h = i.createElement("img"), g = h.getAttribute, st = h.setAttribute, ht = h.removeAttribute, o = i.documentElement, s = {}, p = {
            algorithm: ""
        }, nt = "data-pfsrc", ct = nt + "set", tt = navigator.userAgent, kt = /rident/.test(tt) || /ecko/.test(tt) && tt.match(/rv\:(\d+)/) && RegExp.$1 > 35, it = "currentSrc", dt = /\s+\+?\d+(e\d+)?w/, gt = /(\([^)]+\))?\s*(.+)/, rt = t.picturefillCFG, ni = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)", lt = "font-size:100%!important;", w = !0, c = {}, b = {}, v = t.devicePixelRatio, f = {
            px: 1,
            "in": 96
        }, at = i.createElement("a"), ut = !1, ti = /^[ \t\n\r\u000c]+/, ii = /^[, \t\n\r\u000c]+/, ri = /^[^ \t\n\r\u000c]+/, ui = /[,]+$/, vt = /^\d+$/, fi = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, yt = function(n, t, i, r) {
            n.addEventListener ? n.addEventListener(t, i, r || !1) : n.attachEvent && n.attachEvent("on" + t, i)
        }, ft = function(n) {
            var t = {};
            return function(i) {
                return i in t || (t[i] = n(i)),
                t[i]
            }
        };
        var pt = function() {
            var n = /^([\d\.]+)(em|vw|px)$/
              , t = function() {
                for (var n = arguments, t = 0, i = n[0]; ++t in n; )
                    i = i.replace(n[t], n[++t]);
                return i
            }
              , i = ft(function(n) {
                return "return " + t((n || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, "") + ";"
            });
            return function(t, r) {
                var u;
                if (!(t in c))
                    if (c[t] = !1,
                    r && (u = t.match(n)))
                        c[t] = u[1] * f[u[2]];
                    else
                        try {
                            c[t] = new Function("e",i(t))(f)
                        } catch (e) {}
                return c[t]
            }
        }()
          , et = function(n, t) {
            return n.w ? (n.cWidth = u.calcListLength(t || "100vw"),
            n.res = n.w / n.cWidth) : n.res = n.d,
            n
        }
          , e = function(n) {
            if (d) {
                var f, r, e, t = n || {};
                if (t.elements && t.elements.nodeType === 1 && (t.elements.nodeName.toUpperCase() === "IMG" ? t.elements = [t.elements] : (t.context = t.elements,
                t.elements = null)),
                f = t.elements || u.qsa(t.context || i, t.reevaluate || t.reselect ? u.sel : u.selShort),
                e = f.length) {
                    for (u.setupRun(t),
                    ut = !0,
                    r = 0; r < e; r++)
                        u.fillImg(f[r], t);
                    u.teardownRun(t)
                }
            }
        };
        for (bt = t.console && console.warn ? function(n) {
            console.warn(n)
        }
        : a,
        (it in h) || (it = "src"),
        s["image/jpeg"] = !0,
        s["image/gif"] = !0,
        s["image/png"] = !0,
        s["image/svg+xml"] = i.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"),
        u.ns = ("pf" + +new Date).substr(0, 9),
        u.supSrcset = ("srcset"in h),
        u.supSizes = ("sizes"in h),
        u.supPicture = !!t.HTMLPictureElement,
        u.supSrcset && u.supPicture && !u.supSizes && function(n) {
            h.srcset = "data:,a",
            n.src = "data:,a",
            u.supSrcset = h.complete === n.complete,
            u.supPicture = u.supSrcset && u.supPicture
        }(i.createElement("img")),
        u.supSrcset && !u.supSizes ? function() {
            var f = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw=="
              , t = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              , n = i.createElement("img")
              , r = function() {
                var t = n.width;
                t === 2 && (u.supSizes = !0),
                ot = u.supSrcset && !u.supSizes,
                d = !0,
                setTimeout(e)
            };
            n.onload = r,
            n.onerror = r,
            n.setAttribute("sizes", "9px"),
            n.srcset = t + " 1w," + f + " 9w",
            n.src = t
        }() : d = !0,
        u.selShort = "picture>img,img[srcset]",
        u.sel = u.selShort,
        u.cfg = p,
        u.DPR = v || 1,
        u.u = f,
        u.types = s,
        u.setSize = a,
        u.makeUrl = ft(function(n) {
            return at.href = n
        }),
        u.qsa = function(n, t) {
            return "querySelector"in n ? n.querySelectorAll(t) : []
        }
        ,
        u.matchesMedia = function() {
            return u.matchesMedia = t.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? function(n) {
                return !n || matchMedia(n).matches
            }
            : u.mMQ,
            u.matchesMedia.apply(this, arguments)
        }
        ,
        u.mMQ = function(n) {
            return n ? pt(n) : !0
        }
        ,
        u.calcLength = function(n) {
            var t = pt(n, !0) || !1;
            return t < 0 && (t = !1),
            t
        }
        ,
        u.supportsType = function(n) {
            return n ? s[n] : !0
        }
        ,
        u.parseSize = ft(function(n) {
            var t = (n || "").match(gt);
            return {
                media: t && t[1],
                length: t && t[2]
            }
        }),
        u.parseSet = function(n) {
            return n.cands || (n.cands = vi(n.srcset, n)),
            n.cands
        }
        ,
        u.getEmValue = function() {
            var n;
            if (!l && (n = i.body)) {
                var t = i.createElement("div")
                  , r = o.style.cssText
                  , u = n.style.cssText;
                t.style.cssText = ni,
                o.style.cssText = lt,
                n.style.cssText = lt,
                n.appendChild(t),
                l = t.offsetWidth,
                n.removeChild(t),
                l = parseFloat(l, 10),
                o.style.cssText = r,
                n.style.cssText = u
            }
            return l || 16
        }
        ,
        u.calcListLength = function(n) {
            if (!(n in b) || p.uT) {
                var t = u.calcLength(yi(n));
                b[n] = t ? t : f.width
            }
            return b[n]
        }
        ,
        u.setRes = function(n) {
            var t, i, r;
            if (n)
                for (t = u.parseSet(n),
                i = 0,
                r = t.length; i < r; i++)
                    et(t[i], n.sizes);
            return t
        }
        ,
        u.setRes.res = et,
        u.applySetCandidate = function(n, t) {
            if (n.length) {
                var f, e, o, l, i, s, r, a, v, h = t[u.ns], c = u.DPR;
                if (s = h.curSrc || t[it],
                r = h.curCan || li(t, s, n[0].set),
                r && r.set === n[0].set && (v = kt && !t.complete && r.res - .1 > c,
                v || (r.cached = !0,
                r.res >= c && (i = r))),
                !i)
                    for (n.sort(ci),
                    l = n.length,
                    i = n[l - 1],
                    e = 0; e < l; e++)
                        if (f = n[e],
                        f.res >= c) {
                            o = e - 1,
                            i = n[o] && (v || s !== u.makeUrl(f.url)) && si(n[o].res, f.res, c, n[o].cached) ? n[o] : f;
                            break
                        }
                i && (a = u.makeUrl(i.url),
                h.curSrc = a,
                h.curCan = i,
                a !== s && u.setSrc(t, i),
                u.setSize(t))
            }
        }
        ,
        u.setSrc = function(n, t) {
            var i;
            n.src = t.url,
            t.set.type === "image/svg+xml" && (i = n.style.width,
            n.style.width = n.offsetWidth + 1 + "px",
            n.offsetWidth + 1 && (n.style.width = i))
        }
        ,
        u.getSet = function(n) {
            for (var t, r, f = !1, e = n[u.ns].sets, i = 0; i < e.length && !f; i++)
                if (t = e[i],
                t.srcset && u.matchesMedia(t.media) && (r = u.supportsType(t.type))) {
                    r === "pending" && (t = r),
                    f = t;
                    break
                }
            return f
        }
        ,
        u.parseSets = function(n, t, i) {
            var o, e, s, h, c = t && t.nodeName.toUpperCase() === "PICTURE", f = n[u.ns];
            (f.src === r || i.src) && (f.src = g.call(n, "src"),
            f.src ? st.call(n, nt, f.src) : ht.call(n, nt)),
            (f.srcset === r || i.srcset || !u.supSrcset || n.srcset) && (o = g.call(n, "srcset"),
            f.srcset = o,
            h = !0),
            f.sets = [],
            c && (f.pic = !0,
            ai(t, f.sets)),
            f.srcset ? (e = {
                srcset: f.srcset,
                sizes: g.call(n, "sizes")
            },
            f.sets.push(e),
            s = (ot || f.src) && dt.test(f.srcset || ""),
            s || !f.src || wt(f.src, e) || e.has1x || (e.srcset += ", " + f.src,
            e.cands.push({
                url: f.src,
                d: 1,
                set: e
            }))) : f.src && f.sets.push({
                srcset: f.src,
                sizes: null
            }),
            f.curCan = null,
            f.curSrc = r,
            f.supported = !(c || e && !u.supSrcset || s && !u.supSizes),
            h && u.supSrcset && !f.supported && (o ? (st.call(n, ct, o),
            n.srcset = "") : ht.call(n, ct)),
            f.supported && !f.srcset && (!f.src && n.src || n.src !== u.makeUrl(f.src)) && (f.src === null ? n.removeAttribute("src") : n.src = f.src),
            f.parsed = !0
        }
        ,
        u.fillImg = function(n, t) {
            var i, r = t.reselect || t.reevaluate;
            (n[u.ns] || (n[u.ns] = {}),
            i = n[u.ns],
            r || i.evaled !== y) && ((!i.parsed || t.reevaluate) && u.parseSets(n, n.parentNode, t),
            i.supported ? i.evaled = y : hi(n))
        }
        ,
        u.setupRun = function() {
            (!ut || w || v !== t.devicePixelRatio) && oi()
        }
        ,
        u.supPicture ? (e = a,
        u.fillImg = a) : function() {
            var n, h = t.attachEvent ? /d$|^c/ : /d$|^c|^i/, r = function() {
                var t = i.readyState || "";
                e = setTimeout(r, t === "loading" ? 200 : 999),
                i.body && (u.fillImgs(),
                n = n || h.test(t),
                n && clearTimeout(e))
            }, e = setTimeout(r, i.body ? 9 : 99), c = function(n, t) {
                var i, r, u = function() {
                    var f = new Date - r;
                    f < t ? i = setTimeout(u, t - f) : (i = null,
                    n())
                };
                return function() {
                    r = new Date,
                    i || (i = setTimeout(u, t))
                }
            }, s = o.clientHeight, l = function() {
                w = Math.max(t.innerWidth || 0, o.clientWidth) !== f.width || o.clientHeight !== s,
                s = o.clientHeight,
                w && u.fillImgs()
            };
            yt(t, "resize", c(l, 99)),
            yt(i, "readystatechange", r)
        }(),
        u.picturefill = e,
        u.fillImgs = e,
        u.teardownRun = a,
        e._ = u,
        t.picturefillCFG = {
            pf: u,
            push: function(n) {
                var t = n.shift();
                typeof u[t] == "function" ? u[t].apply(u, n) : (p[t] = n[0],
                ut && u.fillImgs({
                    reselect: !0
                }))
            }
        }; rt && rt.length; )
            t.picturefillCFG.push(rt.shift());
        t.picturefill = e,
        typeof module == "object" && typeof module.exports == "object" ? module.exports = e : typeof n == "function" && n.amd && n("picturefill", [], function() {
            return e
        }),
        u.supPicture || (s["image/webp"] = ei("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
    }(window, document),
    !function() {
        function n(n, t, i) {
            "use strict";
            var r = window.document.createElement("link")
              , f = t || window.document.getElementsByTagName("script")[0]
              , u = window.document.styleSheets;
            return r.rel = "stylesheet",
            r.href = n,
            r.media = "only x",
            f.parentNode.insertBefore(r, f),
            r.onloadcssdefined = function(n) {
                for (var i, t = 0; t < u.length; t++)
                    u[t].href && u[t].href === r.href && (i = !0);
                i ? n() : setTimeout(function() {
                    r.onloadcssdefined(n)
                })
            }
            ,
            r.onloadcssdefined(function() {
                r.media = i || "all"
            }),
            r
        }
        function t(n, t) {
            n.onload = function() {
                n.onload = null,
                t && t.call(n)
            }
            ,
            "isApplicationInstalled"in navigator && "onloadcssdefined"in n && n.onloadcssdefined(t)
        }
        !function(i) {
            var r = function(u, f) {
                "use strict";
                if (u && 3 === u.length) {
                    var s = i.navigator
                      , o = i.document
                      , c = i.Image
                      , h = !(!o.createElementNS || !o.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect || !o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") || i.opera && -1 === s.userAgent.indexOf("Chrome") || -1 !== s.userAgent.indexOf("Series40"))
                      , e = new c;
                    e.onerror = function() {
                        r.method = "png",
                        r.href = u[2],
                        n(u[2])
                    }
                    ,
                    e.onload = function() {
                        var i = 1 === e.width && 1 === e.height
                          , o = u[i && h ? 0 : i ? 1 : 2];
                        r.method = i && h ? "svg" : i ? "datapng" : "png",
                        r.href = o,
                        t(n(o), f)
                    }
                    ,
                    e.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
                    o.documentElement.className += " grunticon"
                }
            };
            r.loadCSS = n,
            r.onloadCSS = t,
            i.grunticon = r
        }(this),
        function(n, t) {
            "use strict";
            var i = t.document
              , r = "grunticon:"
              , u = function(n) {
                if (i.attachEvent ? "complete" === i.readyState : "loading" !== i.readyState)
                    n();
                else {
                    var t = !1;
                    i.addEventListener("readystatechange", function() {
                        t || (t = !0,
                        n())
                    }, !1)
                }
            }
              , f = function(n) {
                return t.document.querySelector('link[href$="' + n + '"]')
            }
              , e = function(n) {
                var t, u, o, s, f, h, e = {}, i;
                if (t = n.sheet,
                !t)
                    return e;
                for (u = t.cssRules ? t.cssRules : t.rules,
                i = 0; i < u.length; i++)
                    o = u[i].cssText,
                    s = r + u[i].selectorText,
                    f = o.split(");")[0].match(/US\-ASCII\,([^"']+)/),
                    f && f[1] && (h = decodeURIComponent(f[1]),
                    e[s] = h);
                return e
            }
              , o = function(n) {
                var f, u, e, s, o, t;
                e = "data-grunticon-embed";
                for (o in n) {
                    s = o.slice(r.length);
                    try {
                        f = i.querySelectorAll(s)
                    } catch (h) {
                        continue
                    }
                    for (u = [],
                    t = 0; t < f.length; t++)
                        null !== f[t].getAttribute(e) && u.push(f[t]);
                    if (u.length)
                        for (t = 0; t < u.length; t++)
                            u[t].innerHTML = n[o],
                            u[t].style.backgroundImage = "none",
                            u[t].removeAttribute(e)
                }
                return u
            }
              , s = function(t) {
                "svg" === n.method && u(function() {
                    o(e(f(n.href))),
                    "function" == typeof t && t()
                })
            };
            n.embedIcons = o,
            n.getCSS = f,
            n.getIcons = e,
            n.ready = u,
            n.svgLoadedCallback = s,
            n.embedSVG = s
        }(grunticon, this)
    }(),
    n("grunticon", function() {}),
    n("animation", ["jquery"], function() {
        "use strict";
        return {
            settings: {
                timer: 300,
                animationClass: "is-animating",
                eventClass: "",
                animationType: "",
                animationTypeClass: ""
            },
            animateIn: function(n, t, i) {
                var r = this;
                r.settings.timer = i,
                r.settings.eventClass = "is-animating-in",
                r.settings.animationType = t,
                r.settings.animationTypeClass = "is-animating-" + t,
                r.doAnimation(n)
            },
            animateOut: function(n, t, i) {
                var r = this;
                r.settings.timer = i,
                r.settings.eventClass = "is-animating-out",
                r.settings.animationType = t,
                r.settings.animationTypeClass = "is-animating-" + t,
                r.doAnimation(n)
            },
            doAnimation: function(n) {
                var t = this;
                n.hasClass(t.settings.animationClass) && t.removeAnimationClasses(n),
                t.addAnimationClasses(n),
                t.settings.animationType === "collapse" && t.animateHeight(n),
                setTimeout(function() {
                    t.removeAnimationClasses(n)
                }, t.settings.timer)
            },
            addAnimationClasses: function(n) {
                var t = this;
                n.addClass(t.settings.animationClass + " " + t.settings.animationTypeClass + " " + t.settings.eventClass)
            },
            removeAnimationClasses: function(n) {
                var t = this;
                n.removeClass(t.settings.animationClass + " " + t.settings.animationTypeClass + " is-animating-in is-animating-out")
            },
            getElementHeight: function(n) {
                var t = 0;
                return n.is(":hidden") ? (n.css({
                    visibility: "hidden",
                    display: "block"
                }),
                t = n[0].scrollHeight,
                n.css({
                    visibility: "",
                    display: ""
                })) : t = n[0].scrollHeight,
                t
            },
            animateHeight: function(n) {
                var t = this;
                t.settings.eventClass === "is-animating-in" ? (n.css("height", "0px"),
                t.changeHeightTo(n, t.getElementHeight(n), 10)) : (n.css("height", t.getElementHeight(n)),
                t.changeHeightTo(n, "0px", 10)),
                t.changeHeightTo(n, "auto", t.settings.timer)
            },
            changeHeightTo: function(n, t, i) {
                setTimeout(function() {
                    n.css("height", t)
                }, i)
            }
        }
    }),
    n("domToggle", ["jquery", "animation"], function(n, t) {
        "use strict";
        return function() {
            var r = "data-dom-toggle"
              , i = "aria-expanded"
              , e = "is-collapsed"
              , o = "is-expanded"
              , s = "has-collapsed-target"
              , u = "has-expanded-target"
              , h = "data-dom-toggle-hide-others"
              , c = "data-dom-toggle-focus"
              , f = "";
            this.initialize = function() {
                var t = this;
                n("[" + r + "]").on("click.toggle", function(i) {
                    var r = n(this);
                    i.preventDefault(),
                    t.decideAction(r)
                })
            }
            ,
            this.decideAction = function(t) {
                var i = this
                  , e = t.attr("aria-controls")
                  , r = n("#" + e)
                  , o = t.attr("aria-expanded")
                  , s = t.attr(h)
                  , u = "show";
                f = i.getAnimationType(t),
                o === !0 || o === "true" ? (i.hide(r),
                u = "hide") : ((s === "" || s === !0) && i.hideAllOthers(r),
                i.show(r),
                i.setFocus(t),
                u = "show"),
                n(window).trigger({
                    type: "domToggle",
                    action: u,
                    target: e
                })
            }
            ,
            this.show = function(r) {
                var l = this
                  , h = r.attr("id")
                  , c = n("[aria-controls=" + h + "]");
                c.each(function() {
                    var t = n(this);
                    t.removeClass(s).addClass(u).attr(i, !0)
                }),
                r.removeClass(e).addClass(o).attr(i, !0),
                t.animateIn(r, f, 300)
            }
            ,
            this.hide = function(r) {
                var l = this
                  , h = r.attr("id")
                  , c = n("[aria-controls=" + h + "]");
                c.each(function() {
                    var t = n(this);
                    t.removeClass(u).addClass(s).attr(i, !1)
                }),
                r.removeClass(o).addClass(e).attr(i, !1),
                t.animateOut(r, f, 300)
            }
            ,
            this.hideAllOthers = function() {
                var i = this;
                n("[" + r + "]." + u).each(function() {
                    n(this).trigger("click")
                })
            }
            ,
            this.setFocus = function(t) {
                var i = t.attr(c);
                (typeof i != "undefined" || i !== "") && n("#" + i).focus()
            }
            ,
            this.getAnimationType = function(n) {
                var i = this
                  , t = n.attr(r);
                return typeof t == "undefined" ? "collapse" : t
            }
        }
    }),
    function(n, t, i, r) {
        var u = n(t);
        n.fn.lazyload = function(f) {
            function s() {
                var t = 0;
                o.each(function() {
                    var i = n(this);
                    if ((!e.skip_invisible || i.is(":visible")) && !n.abovethetop(this, e) && !n.leftofbegin(this, e))
                        if (n.belowthefold(this, e) || n.rightoffold(this, e)) {
                            if (++t > e.failure_limit)
                                return !1
                        } else
                            i.trigger("appear"),
                            t = 0
                })
            }
            var o = this, h, e = {
                threshold: 0,
                failure_limit: 0,
                event: "scroll",
                effect: "show",
                container: t,
                data_attribute: "original",
                skip_invisible: !1,
                appear: null,
                load: null,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
            };
            return f && (r !== f.failurelimit && (f.failure_limit = f.failurelimit,
            delete f.failurelimit),
            r !== f.effectspeed && (f.effect_speed = f.effectspeed,
            delete f.effectspeed),
            n.extend(e, f)),
            h = e.container === r || e.container === t ? u : n(e.container),
            0 === e.event.indexOf("scroll") && h.bind(e.event, function() {
                return s()
            }),
            this.each(function() {
                var i = this
                  , t = n(i);
                i.loaded = !1,
                (t.attr("src") === r || t.attr("src") === !1) && t.is("img") && t.attr("src", e.placeholder);
                t.one("appear", function() {
                    if (!this.loaded) {
                        if (e.appear) {
                            var r = o.length;
                            e.appear.call(i, r, e)
                        }
                        n("<img />").bind("load", function() {
                            var r = t.attr("data-" + e.data_attribute), u, f;
                            t.hide(),
                            t.is("img") ? t.attr("src", r) : t.css("background-image", "url('" + r + "')"),
                            t[e.effect](e.effect_speed),
                            i.loaded = !0,
                            u = n.grep(o, function(n) {
                                return !n.loaded
                            }),
                            o = n(u),
                            e.load && (f = o.length,
                            e.load.call(i, f, e))
                        }).attr("src", t.attr("data-" + e.data_attribute))
                    }
                });
                0 !== e.event.indexOf("scroll") && t.bind(e.event, function() {
                    i.loaded || t.trigger("appear")
                })
            }),
            u.bind("resize", function() {
                s()
            }),
            /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && u.bind("pageshow", function(t) {
                t.originalEvent && t.originalEvent.persisted && o.each(function() {
                    n(this).trigger("appear")
                })
            }),
            n(i).ready(function() {
                s()
            }),
            this
        }
        ,
        n.belowthefold = function(i, f) {
            var e;
            return e = f.container === r || f.container === t ? (t.innerHeight ? t.innerHeight : u.height()) + u.scrollTop() : n(f.container).offset().top + n(f.container).height(),
            e <= n(i).offset().top - f.threshold
        }
        ,
        n.rightoffold = function(i, f) {
            var e;
            return e = f.container === r || f.container === t ? u.width() + u.scrollLeft() : n(f.container).offset().left + n(f.container).width(),
            e <= n(i).offset().left - f.threshold
        }
        ,
        n.abovethetop = function(i, f) {
            var e;
            return e = f.container === r || f.container === t ? u.scrollTop() : n(f.container).offset().top,
            e >= n(i).offset().top + f.threshold + n(i).height()
        }
        ,
        n.leftofbegin = function(i, f) {
            var e;
            return e = f.container === r || f.container === t ? u.scrollLeft() : n(f.container).offset().left,
            e >= n(i).offset().left + f.threshold + n(i).width()
        }
        ,
        n.inviewport = function(t, i) {
            return !n.rightoffold(t, i) && !n.leftofbegin(t, i) && !n.belowthefold(t, i) && !n.abovethetop(t, i)
        }
        ,
        n.extend(n.expr[":"], {
            "below-the-fold": function(t) {
                return n.belowthefold(t, {
                    threshold: 0
                })
            },
            "above-the-top": function(t) {
                return !n.belowthefold(t, {
                    threshold: 0
                })
            },
            "right-of-screen": function(t) {
                return n.rightoffold(t, {
                    threshold: 0
                })
            },
            "left-of-screen": function(t) {
                return !n.rightoffold(t, {
                    threshold: 0
                })
            },
            "in-viewport": function(t) {
                return n.inviewport(t, {
                    threshold: 0
                })
            },
            "above-the-fold": function(t) {
                return !n.belowthefold(t, {
                    threshold: 0
                })
            },
            "right-of-fold": function(t) {
                return n.rightoffold(t, {
                    threshold: 0
                })
            },
            "left-of-fold": function(t) {
                return !n.rightoffold(t, {
                    threshold: 0
                })
            }
        })
    }(jQuery, window, document),
    n("lazyload", function() {}),
    n("imageCover", ["jquery", "lazyload"], function(n) {
        "use strict";
        return function() {
            function i(n) {
                var t = "block-background-mobile";
                n = parseInt(n, 10);
                switch (!0) {
                case n >= 1800:
                    t = "block-background-desktop-large";
                    break;
                case n >= 1200:
                    t = "block-background-desktop";
                    break;
                case n >= 768:
                    t = "block-background-tablet";
                    break;
                case n >= 568:
                    t = "block-background-tablet-small"
                }
                return t
            }
            function r() {
                n(".js-lazy-load").lazyload({
                    effect: "fadeIn",
                    threshold: 100
                })
            }
            function u() {
                t !== "" && n(".js-image-cover").each(f)
            }
            var t, f;
            this.initialize = function() {
                n(window).on("breakpoint", function(n) {
                    var f = i(n.breakpoint);
                    f !== t && (t = f,
                    u(),
                    setTimeout(function() {
                        r()
                    }, 1e3))
                });
                n(window).on("breakpointDefault", function(n) {
                    t = i(n.breakpoint),
                    u(),
                    r()
                })
            }
            ,
            f = function(i, r) {
                var u = n(r)
                  , f = u.attr("data-image");
                f !== undefined && (f += "?preset=" + t,
                u.attr({
                    "data-original": f
                }),
                u.hasClass("lazy-loaded") || u.addClass("lazy-loaded"))
            }
        }
    }),
    i = Array.prototype.slice,
    function(t, i) {
        typeof exports == "object" && typeof module != "undefined" ? module.exports = i(r("jquery")) : typeof n == "function" && n.amd ? n("parsley", ["jquery"], i) : t.parsley = i(t.jQuery)
    }(this, function(n) {
        "use strict";
        function ht(n, t) {
            return n.parsleyAdaptedCallback || (n.parsleyAdaptedCallback = function() {
                var i = Array.prototype.slice.call(arguments, 0);
                i.unshift(this),
                n.apply(t || st, i)
            }
            ),
            n.parsleyAdaptedCallback
        }
        function h(n) {
            return n.lastIndexOf(rt, 0) === 0 ? n.substr(rt.length) : n
        }
        function kt() {
            var t = this
              , i = window || global;
            n.extend(this, {
                isNativeEvent: function(n) {
                    return n.originalEvent && n.originalEvent.isTrusted !== !1
                },
                fakeInputEvent: function(i) {
                    t.isNativeEvent(i) && n(i.target).trigger("input")
                },
                misbehaves: function(i) {
                    if (t.isNativeEvent(i)) {
                        t.behavesOk(i);
                        n(document).on("change.inputevent", i.data.selector, t.fakeInputEvent);
                        t.fakeInputEvent(i)
                    }
                },
                behavesOk: function(i) {
                    t.isNativeEvent(i) && n(document).off("input.inputevent", i.data.selector, t.behavesOk).off("change.inputevent", i.data.selector, t.misbehaves)
                },
                install: function() {
                    var f, u, r;
                    if (!i.inputEventPatched)
                        for (i.inputEventPatched = "0.0.3",
                        f = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'],
                        u = 0; u < f.length; u++) {
                            r = f[u];
                            n(document).on("input.inputevent", r, {
                                selector: r
                            }, t.behavesOk).on("change.inputevent", r, {
                                selector: r
                            }, t.misbehaves)
                        }
                },
                uninstall: function() {
                    delete i.inputEventPatched,
                    n(document).off(".inputevent")
                }
            })
        }
        var at = 1, w = {}, vt = {
            attr: function(n, t, i) {
                var r, u, f, e = new RegExp("^" + t,"i");
                if ("undefined" == typeof i)
                    i = {};
                else
                    for (r in i)
                        i.hasOwnProperty(r) && delete i[r];
                if ("undefined" == typeof n || "undefined" == typeof n[0])
                    return i;
                for (f = n[0].attributes,
                r = f.length; r--; )
                    u = f[r],
                    u && u.specified && e.test(u.name) && (i[this.camelize(u.name.slice(t.length))] = this.deserializeValue(u.value));
                return i
            },
            checkAttr: function(n, t, i) {
                return n.is("[" + t + i + "]")
            },
            setAttr: function(n, t, i, r) {
                n[0].setAttribute(this.dasherize(t + i), String(r))
            },
            generateID: function() {
                return "" + at++
            },
            deserializeValue: function(t) {
                var i;
                try {
                    return t ? t == "true" || (t == "false" ? !1 : t == "null" ? null : isNaN(i = Number(t)) ? /^[\[\{]/.test(t) ? n.parseJSON(t) : t : i) : t
                } catch (r) {
                    return t
                }
            },
            camelize: function(n) {
                return n.replace(/-+(.)?/g, function(n, t) {
                    return t ? t.toUpperCase() : ""
                })
            },
            dasherize: function(n) {
                return n.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            },
            warn: function() {
                var n;
                window.console && "function" == typeof window.console.warn && (n = window.console).warn.apply(n, arguments)
            },
            warnOnce: function(n) {
                w[n] || (w[n] = !0,
                this.warn.apply(this, arguments))
            },
            _resetWarnings: function() {
                w = {}
            },
            trimString: function(n) {
                return n.replace(/^\s+|\s+$/g, "")
            },
            namespaceEvents: function(t, i) {
                return (t = this.trimString(t || "").split(/\s+/),
                !t[0]) ? "" : n.map(t, function(n) {
                    return n + "." + i
                }).join(" ")
            },
            difference: function(t, i) {
                var r = [];
                return n.each(t, function(n, t) {
                    i.indexOf(t) == -1 && r.push(t)
                }),
                r
            },
            all: function(i) {
                return n.when.apply(n, t(i).concat([42, 42]))
            },
            objectCreate: Object.create || function() {
                var n = function() {};
                return function(t) {
                    if (arguments.length > 1)
                        throw Error("Second argument not supported");
                    if (typeof t != "object")
                        throw TypeError("Argument must be an object");
                    n.prototype = t;
                    var i = {};
                    return n.prototype = null,
                    i
                }
            }(),
            _SubmitSelector: 'input[type="submit"], button:submit'
        }, r = vt, ut = {
            namespace: "data-parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
            priorityEnabled: !0,
            multiple: null,
            group: null,
            uiEnabled: !0,
            validationThreshold: 3,
            focus: "first",
            trigger: !1,
            triggerAfterFailure: "input",
            errorClass: "parsley-error",
            successClass: "parsley-success",
            classHandler: function() {},
            errorsContainer: function() {},
            errorsWrapper: '<ul class="parsley-errors-list"><\/ul>',
            errorTemplate: "<li><\/li>"
        }, f = function() {
            this.__id__ = r.generateID()
        }, k, v, y, c, d, e, g, nt, ft, tt, et, o, it, l, p, u, ot, st, s, rt, bt, ct, lt;
        f.prototype = {
            asyncSupport: !0,
            _pipeAccordingToValidationResult: function() {
                var i = this
                  , t = function() {
                    var r = n.Deferred();
                    return !0 !== i.validationResult && r.reject(),
                    r.resolve().promise()
                };
                return [t, t]
            },
            actualizeOptions: function() {
                return r.attr(this.$element, this.options.namespace, this.domOptions),
                this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(),
                this
            },
            _resetOptions: function(n) {
                this.domOptions = r.objectCreate(this.parent.options),
                this.options = r.objectCreate(this.domOptions);
                for (var t in n)
                    n.hasOwnProperty(t) && (this.options[t] = n[t]);
                this.actualizeOptions()
            },
            _listeners: null,
            on: function(n, t) {
                this._listeners = this._listeners || {};
                var i = this._listeners[n] = this._listeners[n] || [];
                return i.push(t),
                this
            },
            subscribe: function(t, i) {
                n.listenTo(this, t.toLowerCase(), i)
            },
            off: function(n, t) {
                var i = this._listeners && this._listeners[n], r;
                if (i)
                    if (t)
                        for (r = i.length; r--; )
                            i[r] === t && i.splice(r, 1);
                    else
                        delete this._listeners[n];
                return this
            },
            unsubscribe: function(t) {
                n.unsubscribeTo(this, t.toLowerCase())
            },
            trigger: function(n, t, i) {
                var r, u, e, f;
                if (t = t || this,
                r = this._listeners && this._listeners[n],
                r)
                    for (f = r.length; f--; )
                        if (u = r[f].call(t, t, i),
                        u === !1)
                            return u;
                return this.parent ? this.parent.trigger(n, t, i) : !0
            },
            reset: function() {
                if ("ParsleyForm" !== this.__class__)
                    return this._resetUI(),
                    this._trigger("reset");
                for (var n = 0; n < this.fields.length; n++)
                    this.fields[n].reset();
                this._trigger("reset")
            },
            destroy: function() {
                if (this._destroyUI(),
                "ParsleyForm" !== this.__class__) {
                    this.$element.removeData("Parsley"),
                    this.$element.removeData("ParsleyFieldMultiple"),
                    this._trigger("destroy");
                    return
                }
                for (var n = 0; n < this.fields.length; n++)
                    this.fields[n].destroy();
                this.$element.removeData("Parsley"),
                this._trigger("destroy")
            },
            asyncIsValid: function(n, t) {
                return r.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),
                this.whenValid({
                    group: n,
                    force: t
                })
            },
            _findRelated: function() {
                return this.options.multiple ? this.parent.$element.find("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]') : this.$element
            }
        };
        var yt = {
            string: function(n) {
                return n
            },
            integer: function(n) {
                if (isNaN(n))
                    throw 'Requirement is not an integer: "' + n + '"';
                return parseInt(n, 10)
            },
            number: function(n) {
                if (isNaN(n))
                    throw 'Requirement is not a number: "' + n + '"';
                return parseFloat(n)
            },
            reference: function(t) {
                var i = n(t);
                if (i.length === 0)
                    throw 'No such reference: "' + t + '"';
                return i
            },
            boolean: function(n) {
                return n !== "false"
            },
            object: function(n) {
                return r.deserializeValue(n)
            },
            regexp: function(n) {
                var t = "";
                return /^\/.*\/(?:[gimy]*)$/.test(n) ? (t = n.replace(/.*\/([gimy]*)$/, "$1"),
                n = n.replace(new RegExp("^/(.*?)/" + t + "$"), "$1")) : n = "^" + n + "$",
                new RegExp(n,t)
            }
        }
          , pt = function(n, t) {
            var u = n.match(/^\s*\[(.*)\]\s*$/), i;
            if (!u)
                throw 'Requirement is not an array: "' + n + '"';
            if (i = u[1].split(",").map(r.trimString),
            i.length !== t)
                throw "Requirement has " + i.length + " values when " + t + " are needed";
            return i
        }
          , a = function(n, t) {
            var i = yt[n || "string"];
            if (!i)
                throw 'Unknown requirement specification: "' + n + '"';
            return i(t)
        }
          , wt = function(n, t, i) {
            var f = null, e = {}, r, u;
            for (r in n)
                r ? (u = i(r),
                "string" == typeof u && (u = a(n[r], u)),
                e[r] = u) : f = a(n[r], t);
            return [f, e]
        }
          , b = function(t) {
            n.extend(!0, this, t)
        };
        if (b.prototype = {
            validate: function(t, i) {
                if (this.fn)
                    return arguments.length > 3 && (i = [].slice.call(arguments, 1, -1)),
                    this.fn.call(this, t, i);
                if (n.isArray(t)) {
                    if (!this.validateMultiple)
                        throw "Validator `" + this.name + "` does not handle multiple values";
                    return this.validateMultiple.apply(this, arguments)
                }
                if (this.validateNumber)
                    return isNaN(t) ? !1 : (arguments[0] = parseFloat(arguments[0]),
                    this.validateNumber.apply(this, arguments));
                if (this.validateString)
                    return this.validateString.apply(this, arguments);
                throw "Validator `" + this.name + "` only handles multiple values";
            },
            parseRequirements: function(t, i) {
                var r, f, u;
                if ("string" != typeof t)
                    return n.isArray(t) ? t : [t];
                if (r = this.requirementType,
                n.isArray(r)) {
                    for (f = pt(t, r.length),
                    u = 0; u < f.length; u++)
                        f[u] = a(r[u], f[u]);
                    return f
                }
                return n.isPlainObject(r) ? wt(r, t, i) : [a(r, t)]
            },
            requirementType: "string",
            priority: 2
        },
        k = function(n, t) {
            this.__class__ = "ParsleyValidatorRegistry",
            this.locale = "en",
            this.init(n || {}, t || {})
        }
        ,
        v = {
            email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
            integer: /^-?\d+$/,
            digits: /^\d+$/,
            alphanum: /^\w+$/i,
            url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$","i")
        },
        v.range = v.number,
        y = function(n) {
            var t = ("" + n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
        }
        ,
        k.prototype = {
            init: function(t, i) {
                this.catalog = i,
                this.validators = n.extend({}, this.validators);
                for (var r in t)
                    this.addValidator(r, t[r].fn, t[r].priority);
                window.Parsley.trigger("parsley:validator:init")
            },
            setLocale: function(n) {
                if ("undefined" == typeof this.catalog[n])
                    throw new Error(n + " is not available in the catalog");
                return this.locale = n,
                this
            },
            addCatalog: function(n, t, i) {
                return ("object" == typeof t && (this.catalog[n] = t),
                !0 === i) ? this.setLocale(n) : this
            },
            addMessage: function(n, t, i) {
                return "undefined" == typeof this.catalog[n] && (this.catalog[n] = {}),
                this.catalog[n][t] = i,
                this
            },
            addMessages: function(n, t) {
                for (var i in t)
                    this.addMessage(n, i, t[i]);
                return this
            },
            addValidator: function(n) {
                if (this.validators[n])
                    r.warn('Validator "' + n + '" is already defined.');
                else if (ut.hasOwnProperty(n)) {
                    r.warn('"' + n + '" is a restricted keyword and is not a valid validator name.');
                    return
                }
                return this._setValidator.apply(this, arguments)
            },
            updateValidator: function(n) {
                return this.validators[n] ? this._setValidator.apply(this, arguments) : (r.warn('Validator "' + n + '" is not already defined.'),
                this.addValidator.apply(this, arguments))
            },
            removeValidator: function(n) {
                return this.validators[n] || r.warn('Validator "' + n + '" is not defined.'),
                delete this.validators[n],
                this
            },
            _setValidator: function(n, t, i) {
                "object" != typeof t && (t = {
                    fn: t,
                    priority: i
                }),
                t.validate || (t = new b(t)),
                this.validators[n] = t;
                for (var r in t.messages || {})
                    this.addMessage(r, n, t.messages[r]);
                return this
            },
            getErrorMessage: function(n) {
                var t, i;
                return "type" === n.name ? (i = this.catalog[this.locale][n.name] || {},
                t = i[n.requirements]) : t = this.formatMessage(this.catalog[this.locale][n.name], n.requirements),
                t || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
            },
            formatMessage: function(n, t) {
                if ("object" == typeof t) {
                    for (var i in t)
                        n = this.formatMessage(n, t[i]);
                    return n
                }
                return "string" == typeof n ? n.replace(/%s/i, t) : ""
            },
            validators: {
                notblank: {
                    validateString: function(n) {
                        return /\S/.test(n)
                    },
                    priority: 2
                },
                required: {
                    validateMultiple: function(n) {
                        return n.length > 0
                    },
                    validateString: function(n) {
                        return /\S/.test(n)
                    },
                    priority: 512
                },
                type: {
                    validateString: function(n, t) {
                        var e = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2], o = e.step, r = o === undefined ? "any" : o, s = e.base, h = s === undefined ? 0 : s, c = v[t], u, f, i;
                        if (!c)
                            throw new Error("validator type `" + t + "` is not supported");
                        return c.test(n) ? "number" === t && !/^any$/i.test(r || "") && ((u = Number(n),
                        f = Math.max(y(r), y(h)),
                        y(u) > f) || (i = function(n) {
                            return Math.round(n * Math.pow(10, f))
                        }
                        ,
                        (i(u) - i(h)) % i(r) != 0)) ? !1 : !0 : !1
                    },
                    requirementType: {
                        "": "string",
                        step: "string",
                        base: "number"
                    },
                    priority: 256
                },
                pattern: {
                    validateString: function(n, t) {
                        return t.test(n)
                    },
                    requirementType: "regexp",
                    priority: 64
                },
                minlength: {
                    validateString: function(n, t) {
                        return n.length >= t
                    },
                    requirementType: "integer",
                    priority: 30
                },
                maxlength: {
                    validateString: function(n, t) {
                        return n.length <= t
                    },
                    requirementType: "integer",
                    priority: 30
                },
                length: {
                    validateString: function(n, t, i) {
                        return n.length >= t && n.length <= i
                    },
                    requirementType: ["integer", "integer"],
                    priority: 30
                },
                mincheck: {
                    validateMultiple: function(n, t) {
                        return n.length >= t
                    },
                    requirementType: "integer",
                    priority: 30
                },
                maxcheck: {
                    validateMultiple: function(n, t) {
                        return n.length <= t
                    },
                    requirementType: "integer",
                    priority: 30
                },
                check: {
                    validateMultiple: function(n, t, i) {
                        return n.length >= t && n.length <= i
                    },
                    requirementType: ["integer", "integer"],
                    priority: 30
                },
                min: {
                    validateNumber: function(n, t) {
                        return n >= t
                    },
                    requirementType: "number",
                    priority: 30
                },
                max: {
                    validateNumber: function(n, t) {
                        return n <= t
                    },
                    requirementType: "number",
                    priority: 30
                },
                range: {
                    validateNumber: function(n, t, i) {
                        return n >= t && n <= i
                    },
                    requirementType: ["number", "number"],
                    priority: 30
                },
                equalto: {
                    validateString: function(t, i) {
                        var r = n(i);
                        return r.length ? t === r.val() : t === i
                    },
                    priority: 256
                }
            }
        },
        c = {},
        d = function d(n, t, i) {
            for (var e = [], o = [], f, u, r = 0; r < n.length; r++) {
                for (f = !1,
                u = 0; u < t.length; u++)
                    if (n[r].assert.name === t[u].assert.name) {
                        f = !0;
                        break
                    }
                f ? o.push(n[r]) : e.push(n[r])
            }
            return {
                kept: o,
                added: e,
                removed: i ? [] : d(t, n, !0).added
            }
        }
        ,
        c.Form = {
            _actualizeTriggers: function() {
                var n = this;
                this.$element.on("submit.Parsley", function(t) {
                    n.onSubmitValidate(t)
                });
                this.$element.on("click.Parsley", r._SubmitSelector, function(t) {
                    n.onSubmitButton(t)
                });
                !1 !== this.options.uiEnabled && this.$element.attr("novalidate", "")
            },
            focus: function() {
                var t, n;
                if (this._focusedField = null,
                !0 === this.validationResult || "none" === this.options.focus)
                    return null;
                for (t = 0; t < this.fields.length; t++)
                    if (n = this.fields[t],
                    !0 !== n.validationResult && n.validationResult.length > 0 && "undefined" == typeof n.options.noFocus && (this._focusedField = n.$element,
                    "first" === this.options.focus))
                        break;
                return null === this._focusedField ? null : this._focusedField.focus()
            },
            _destroyUI: function() {
                this.$element.off(".Parsley")
            }
        },
        c.Field = {
            _reflowUI: function() {
                if (this._buildUI(),
                this._ui) {
                    var n = d(this.validationResult, this._ui.lastValidationResult);
                    this._ui.lastValidationResult = this.validationResult,
                    this._manageStatusClass(),
                    this._manageErrorsMessages(n),
                    this._actualizeTriggers(),
                    (n.kept.length || n.added.length) && !this._failedOnce && (this._failedOnce = !0,
                    this._actualizeTriggers())
                }
            },
            getErrorsMessages: function() {
                var t, n;
                if (!0 === this.validationResult)
                    return [];
                for (t = [],
                n = 0; n < this.validationResult.length; n++)
                    t.push(this.validationResult[n].errorMessage || this._getErrorMessage(this.validationResult[n].assert));
                return t
            },
            addError: function(n) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]
                  , r = t.message
                  , u = t.assert
                  , i = t.updateClass
                  , f = i === undefined ? !0 : i;
                this._buildUI(),
                this._addError(n, {
                    message: r,
                    assert: u
                }),
                f && this._errorClass()
            },
            updateError: function(n) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]
                  , r = t.message
                  , u = t.assert
                  , i = t.updateClass
                  , f = i === undefined ? !0 : i;
                this._buildUI(),
                this._updateError(n, {
                    message: r,
                    assert: u
                }),
                f && this._errorClass()
            },
            removeError: function(n) {
                var i = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]
                  , t = i.updateClass
                  , r = t === undefined ? !0 : t;
                this._buildUI(),
                this._removeError(n),
                r && this._manageStatusClass()
            },
            _manageStatusClass: function() {
                this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
            },
            _manageErrorsMessages: function(t) {
                if ("undefined" == typeof this.options.errorsMessagesDisabled) {
                    if ("undefined" != typeof this.options.errorMessage)
                        return t.added.length || t.kept.length ? (this._insertErrorWrapper(),
                        0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(n(this.options.errorTemplate).addClass("parsley-custom-error-message")),
                        this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                    for (var i = 0; i < t.removed.length; i++)
                        this._removeError(t.removed[i].assert.name);
                    for (i = 0; i < t.added.length; i++)
                        this._addError(t.added[i].assert.name, {
                            message: t.added[i].errorMessage,
                            assert: t.added[i].assert
                        });
                    for (i = 0; i < t.kept.length; i++)
                        this._updateError(t.kept[i].assert.name, {
                            message: t.kept[i].errorMessage,
                            assert: t.kept[i].assert
                        })
                }
            },
            _addError: function(t, i) {
                var r = i.message
                  , u = i.assert;
                this._insertErrorWrapper(),
                this._ui.$errorsWrapper.addClass("filled").append(n(this.options.errorTemplate).addClass("parsley-" + t).html(r || this._getErrorMessage(u)))
            },
            _updateError: function(n, t) {
                var i = t.message
                  , r = t.assert;
                this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + n).html(i || this._getErrorMessage(r))
            },
            _removeError: function(n) {
                this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + n).remove()
            },
            _getErrorMessage: function(n) {
                var t = n.name + "Message";
                return "undefined" != typeof this.options[t] ? window.Parsley.formatMessage(this.options[t], n.requirements) : window.Parsley.getErrorMessage(n)
            },
            _buildUI: function() {
                if (!this._ui && !1 !== this.options.uiEnabled) {
                    var t = {};
                    this.$element.attr(this.options.namespace + "id", this.__id__),
                    t.$errorClassHandler = this._manageClassHandler(),
                    t.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__),
                    t.$errorsWrapper = n(this.options.errorsWrapper).attr("id", t.errorsWrapperId),
                    t.lastValidationResult = [],
                    t.validationInformationVisible = !1,
                    this._ui = t
                }
            },
            _manageClassHandler: function() {
                if ("string" == typeof this.options.classHandler && n(this.options.classHandler).length)
                    return n(this.options.classHandler);
                var t = this.options.classHandler.call(this, this);
                return "undefined" != typeof t && t.length ? t : this._inputHolder()
            },
            _inputHolder: function() {
                return !this.options.multiple || this.$element.is("select") ? this.$element : this.$element.parent()
            },
            _insertErrorWrapper: function() {
                var t;
                if (0 !== this._ui.$errorsWrapper.parent().length)
                    return this._ui.$errorsWrapper.parent();
                if ("string" == typeof this.options.errorsContainer) {
                    if (n(this.options.errorsContainer).length)
                        return n(this.options.errorsContainer).append(this._ui.$errorsWrapper);
                    r.warn("The errors container `" + this.options.errorsContainer + "` does not exist in DOM")
                } else
                    "function" == typeof this.options.errorsContainer && (t = this.options.errorsContainer.call(this, this));
                return "undefined" != typeof t && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
            },
            _actualizeTriggers: function() {
                var t = this, n = this._findRelated(), i;
                if (n.off(".Parsley"),
                this._failedOnce)
                    n.on(r.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function() {
                        t._validateIfNeeded()
                    });
                else if (i = r.namespaceEvents(this.options.trigger, "Parsley"))
                    n.on(i, function(n) {
                        t._validateIfNeeded(n)
                    })
            },
            _validateIfNeeded: function(n) {
                var t = this;
                n && /key|input/.test(n.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced),
                this._debounced = window.setTimeout(function() {
                    return t.validate()
                }, this.options.debounce)) : this.validate())
            },
            _resetUI: function() {
                (this._failedOnce = !1,
                this._actualizeTriggers(),
                "undefined" != typeof this._ui) && (this._ui.$errorsWrapper.removeClass("filled").children().remove(),
                this._resetClass(),
                this._ui.lastValidationResult = [],
                this._ui.validationInformationVisible = !1)
            },
            _destroyUI: function() {
                this._resetUI(),
                "undefined" != typeof this._ui && this._ui.$errorsWrapper.remove(),
                delete this._ui
            },
            _successClass: function() {
                this._ui.validationInformationVisible = !0,
                this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
            },
            _errorClass: function() {
                this._ui.validationInformationVisible = !0,
                this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
            },
            _resetClass: function() {
                this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
            }
        },
        e = function(t, i, r) {
            this.__class__ = "ParsleyForm",
            this.$element = n(t),
            this.domOptions = i,
            this.options = r,
            this.parent = window.Parsley,
            this.fields = [],
            this.validationResult = null
        }
        ,
        g = {
            pending: null,
            resolved: !0,
            rejected: !1
        },
        e.prototype = {
            onSubmitValidate: function(n) {
                var u = this, i, t;
                !0 !== n.parsley && ((i = this._$submitSource || this.$element.find(r._SubmitSelector).first(),
                this._$submitSource = null,
                this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0),
                i.is("[formnovalidate]")) || (t = this.whenValidate({
                    event: n
                }),
                "resolved" === t.state() && !1 !== this._trigger("submit") || (n.stopImmediatePropagation(),
                n.preventDefault(),
                "pending" === t.state() && t.done(function() {
                    u._submit(i)
                }))))
            },
            onSubmitButton: function(t) {
                this._$submitSource = n(t.currentTarget)
            },
            _submit: function(t) {
                if (!1 !== this._trigger("submit")) {
                    if (t) {
                        var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
                        0 === i.length && (i = n('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),
                        i.attr({
                            name: t.attr("name"),
                            value: t.attr("value")
                        })
                    }
                    this.$element.trigger(n.extend(n.Event("submit"), {
                        parsley: !0
                    }))
                }
            },
            validate: function(t) {
                if (arguments.length >= 1 && !n.isPlainObject(t)) {
                    r.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
                    var u = i.call(arguments)
                      , f = u[0]
                      , e = u[1]
                      , o = u[2];
                    t = {
                        group: f,
                        force: e,
                        event: o
                    }
                }
                return g[this.whenValidate(t).state()]
            },
            whenValidate: function() {
                var e, i = this, u = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0], s = u.group, h = u.force, f = u.event, o;
                return this.submitEvent = f,
                f && (this.submitEvent = n.extend({}, f, {
                    preventDefault: function() {
                        r.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),
                        i.validationResult = !1
                    }
                })),
                this.validationResult = !0,
                this._trigger("validate"),
                this._refreshFields(),
                o = this._withoutReactualizingFormOptions(function() {
                    return n.map(i.fields, function(n) {
                        return n.whenValidate({
                            force: h,
                            group: s
                        })
                    })
                }),
                (e = r.all(o).done(function() {
                    i._trigger("success")
                }).fail(function() {
                    i.validationResult = !1,
                    i.focus(),
                    i._trigger("error")
                }).always(function() {
                    i._trigger("validated")
                })).pipe.apply(e, t(this._pipeAccordingToValidationResult()))
            },
            isValid: function(t) {
                if (arguments.length >= 1 && !n.isPlainObject(t)) {
                    r.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
                    var u = i.call(arguments)
                      , f = u[0]
                      , e = u[1];
                    t = {
                        group: f,
                        force: e
                    }
                }
                return g[this.whenValid(t).state()]
            },
            whenValid: function() {
                var u = this, t = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0], f = t.group, e = t.force, i;
                return this._refreshFields(),
                i = this._withoutReactualizingFormOptions(function() {
                    return n.map(u.fields, function(n) {
                        return n.whenValid({
                            group: f,
                            force: e
                        })
                    })
                }),
                r.all(i)
            },
            _refreshFields: function() {
                return this.actualizeOptions()._bindFields()
            },
            _bindFields: function() {
                var t = this
                  , i = this.fields;
                return this.fields = [],
                this.fieldsMappedById = {},
                this._withoutReactualizingFormOptions(function() {
                    t.$element.find(t.options.inputs).not(t.options.excluded).each(function(n, i) {
                        var r = new window.Parsley.Factory(i,{},t);
                        ("ParsleyField" === r.__class__ || "ParsleyFieldMultiple" === r.__class__) && !0 !== r.options.excluded && "undefined" == typeof t.fieldsMappedById[r.__class__ + "-" + r.__id__] && (t.fieldsMappedById[r.__class__ + "-" + r.__id__] = r,
                        t.fields.push(r))
                    }),
                    n.each(r.difference(i, t.fields), function(n, t) {
                        t._trigger("reset")
                    })
                }),
                this
            },
            _withoutReactualizingFormOptions: function(n) {
                var i = this.actualizeOptions, t;
                return this.actualizeOptions = function() {
                    return this
                }
                ,
                t = n(),
                this.actualizeOptions = i,
                t
            },
            _trigger: function(n) {
                return this.trigger("form:" + n)
            }
        },
        nt = function(t, i, r, u, f) {
            if (!/ParsleyField/.test(t.__class__))
                throw new Error("ParsleyField or ParsleyFieldMultiple instance expected");
            var o = window.Parsley._validatorRegistry.validators[i]
              , e = new b(o);
            n.extend(this, {
                validator: e,
                name: i,
                requirements: r,
                priority: u || t.options[i + "Priority"] || e.priority,
                isDomConstraint: !0 === f
            }),
            this._parseRequirements(t.options)
        }
        ,
        ft = function(n) {
            var t = n[0].toUpperCase();
            return t + n.slice(1)
        }
        ,
        nt.prototype = {
            validate: function(n, i) {
                var r;
                return (r = this.validator).validate.apply(r, [n].concat(t(this.requirementList), [i]))
            },
            _parseRequirements: function(n) {
                var t = this;
                this.requirementList = this.validator.parseRequirements(this.requirements, function(i) {
                    return n[t.name + ft(i)]
                })
            }
        },
        tt = function(t, i, r, u) {
            this.__class__ = "ParsleyField",
            this.$element = n(t),
            "undefined" != typeof u && (this.parent = u),
            this.options = r,
            this.domOptions = i,
            this.constraints = [],
            this.constraintsByName = {},
            this.validationResult = !0,
            this._bindConstraints()
        }
        ,
        et = {
            pending: null,
            resolved: !0,
            rejected: !1
        },
        tt.prototype = {
            validate: function(t) {
                arguments.length >= 1 && !n.isPlainObject(t) && (r.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),
                t = {
                    options: t
                });
                var i = this.whenValidate(t);
                if (!i)
                    return !0;
                switch (i.state()) {
                case "pending":
                    return null;
                case "resolved":
                    return !0;
                case "rejected":
                    return this.validationResult
                }
            },
            whenValidate: function() {
                var i, n = this, r = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0], f = r.force, u = r.group;
                if (this.refreshConstraints(),
                !u || this._isInGroup(u))
                    return this.value = this.getValue(),
                    this._trigger("validate"),
                    (i = this.whenValid({
                        force: f,
                        value: this.value,
                        _refreshed: !0
                    }).always(function() {
                        n._reflowUI()
                    }).done(function() {
                        n._trigger("success")
                    }).fail(function() {
                        n._trigger("error")
                    }).always(function() {
                        n._trigger("validated")
                    })).pipe.apply(i, t(this._pipeAccordingToValidationResult()))
            },
            hasConstraints: function() {
                return 0 !== this.constraints.length
            },
            needsValidation: function(n) {
                return ("undefined" == typeof n && (n = this.getValue()),
                !n.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty) ? !1 : !0
            },
            _isInGroup: function(t) {
                return n.isArray(this.options.group) ? -1 !== n.inArray(t, this.options.group) : this.options.group === t
            },
            isValid: function(t) {
                var u;
                if (arguments.length >= 1 && !n.isPlainObject(t)) {
                    r.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
                    var f = i.call(arguments)
                      , e = f[0]
                      , o = f[1];
                    t = {
                        force: e,
                        value: o
                    }
                }
                return (u = this.whenValid(t),
                !u) ? !0 : et[u.state()]
            },
            whenValid: function() {
                var s = this, i = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0], f = i.force, h = f === undefined ? !1 : f, t = i.value, e = i.group, c = i._refreshed, o, u;
                if (c || this.refreshConstraints(),
                !e || this._isInGroup(e))
                    return (this.validationResult = !0,
                    !this.hasConstraints()) ? n.when() : (("undefined" == typeof t || null === t) && (t = this.getValue()),
                    !this.needsValidation(t) && !0 !== h) ? n.when() : (o = this._getGroupedConstraints(),
                    u = [],
                    n.each(o, function(i, f) {
                        var e = r.all(n.map(f, function(n) {
                            return s._validateConstraint(t, n)
                        }));
                        return u.push(e),
                        e.state() === "rejected" ? !1 : void 0
                    }),
                    r.all(u))
            },
            _validateConstraint: function(t, i) {
                var u = this
                  , f = i.validate(t, this);
                return !1 === f && (f = n.Deferred().reject()),
                r.all([f]).fail(function(n) {
                    u.validationResult instanceof Array || (u.validationResult = []),
                    u.validationResult.push({
                        assert: i,
                        errorMessage: "string" == typeof n && n
                    })
                })
            },
            getValue: function() {
                var n;
                return (n = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(),
                "undefined" == typeof n || null === n) ? "" : this._handleWhitespace(n)
            },
            refreshConstraints: function() {
                return this.actualizeOptions()._bindConstraints()
            },
            addConstraint: function(n, t, i, r) {
                if (window.Parsley._validatorRegistry.validators[n]) {
                    var u = new nt(this,n,t,i,r);
                    "undefined" !== this.constraintsByName[u.name] && this.removeConstraint(u.name),
                    this.constraints.push(u),
                    this.constraintsByName[u.name] = u
                }
                return this
            },
            removeConstraint: function(n) {
                for (var t = 0; t < this.constraints.length; t++)
                    if (n === this.constraints[t].name) {
                        this.constraints.splice(t, 1);
                        break
                    }
                return delete this.constraintsByName[n],
                this
            },
            updateConstraint: function(n, t, i) {
                return this.removeConstraint(n).addConstraint(n, t, i)
            },
            _bindConstraints: function() {
                for (var i = [], r = {}, t, n = 0; n < this.constraints.length; n++)
                    !1 === this.constraints[n].isDomConstraint && (i.push(this.constraints[n]),
                    r[this.constraints[n].name] = this.constraints[n]);
                this.constraints = i,
                this.constraintsByName = r;
                for (t in this.options)
                    this.addConstraint(t, this.options[t], undefined, !0);
                return this._bindHtml5Constraints()
            },
            _bindHtml5Constraints: function() {
                this.$element.attr("required") && this.addConstraint("required", !0, undefined, !0),
                "string" == typeof this.$element.attr("pattern") && this.addConstraint("pattern", this.$element.attr("pattern"), undefined, !0),
                "undefined" != typeof this.$element.attr("min") && "undefined" != typeof this.$element.attr("max") ? this.addConstraint("range", [this.$element.attr("min"), this.$element.attr("max")], undefined, !0) : "undefined" != typeof this.$element.attr("min") ? this.addConstraint("min", this.$element.attr("min"), undefined, !0) : "undefined" != typeof this.$element.attr("max") && this.addConstraint("max", this.$element.attr("max"), undefined, !0),
                "undefined" != typeof this.$element.attr("minlength") && "undefined" != typeof this.$element.attr("maxlength") ? this.addConstraint("length", [this.$element.attr("minlength"), this.$element.attr("maxlength")], undefined, !0) : "undefined" != typeof this.$element.attr("minlength") ? this.addConstraint("minlength", this.$element.attr("minlength"), undefined, !0) : "undefined" != typeof this.$element.attr("maxlength") && this.addConstraint("maxlength", this.$element.attr("maxlength"), undefined, !0);
                var n = this.$element.attr("type");
                return "undefined" == typeof n ? this : "number" === n ? this.addConstraint("type", ["number", {
                    step: this.$element.attr("step") || "1",
                    base: this.$element.attr("min") || this.$element.attr("value")
                }], undefined, !0) : /^(email|url|range)$/i.test(n) ? this.addConstraint("type", n, undefined, !0) : this
            },
            _isRequired: function() {
                return "undefined" == typeof this.constraintsByName.required ? !1 : !1 !== this.constraintsByName.required.requirements
            },
            _trigger: function(n) {
                return this.trigger("field:" + n)
            },
            _handleWhitespace: function(n) {
                return !0 === this.options.trimValue && r.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),
                "squish" === this.options.whitespace && (n = n.replace(/\s{2,}/g, " ")),
                ("trim" === this.options.whitespace || "squish" === this.options.whitespace || !0 === this.options.trimValue) && (n = r.trimString(n)),
                n
            },
            _getGroupedConstraints: function() {
                var t, i, n, r;
                if (!1 === this.options.priorityEnabled)
                    return [this.constraints];
                for (t = [],
                i = {},
                n = 0; n < this.constraints.length; n++)
                    r = this.constraints[n].priority,
                    i[r] || t.push(i[r] = []),
                    i[r].push(this.constraints[n]);
                return t.sort(function(n, t) {
                    return t[0].priority - n[0].priority
                }),
                t
            }
        },
        o = tt,
        it = function() {
            this.__class__ = "ParsleyFieldMultiple"
        }
        ,
        it.prototype = {
            addElement: function(n) {
                return this.$elements.push(n),
                this
            },
            refreshConstraints: function() {
                var i, r, t;
                if (this.constraints = [],
                this.$element.is("select"))
                    return this.actualizeOptions()._bindConstraints(),
                    this;
                for (r = 0; r < this.$elements.length; r++) {
                    if (!n("html").has(this.$elements[r]).length) {
                        this.$elements.splice(r, 1);
                        continue
                    }
                    for (i = this.$elements[r].data("ParsleyFieldMultiple").refreshConstraints().constraints,
                    t = 0; t < i.length; t++)
                        this.addConstraint(i[t].name, i[t].requirements, i[t].priority, i[t].isDomConstraint)
                }
                return this
            },
            getValue: function() {
                if ("function" == typeof this.options.value)
                    return this.options.value(this);
                if ("undefined" != typeof this.options.value)
                    return this.options.value;
                if (this.$element.is("input[type=radio]"))
                    return this._findRelated().filter(":checked").val() || "";
                if (this.$element.is("input[type=checkbox]")) {
                    var t = [];
                    return this._findRelated().filter(":checked").each(function() {
                        t.push(n(this).val())
                    }),
                    t
                }
                return this.$element.is("select") && null === this.$element.val() ? [] : this.$element.val()
            },
            _init: function() {
                return this.$elements = [this.$element],
                this
            }
        },
        l = function(t, i, r) {
            this.$element = n(t);
            var u = this.$element.data("Parsley");
            if (u)
                return "undefined" != typeof r && u.parent === window.Parsley && (u.parent = r,
                u._resetOptions(u.options)),
                "object" == typeof i && n.extend(u.options, i),
                u;
            if (!this.$element.length)
                throw new Error("You must bind Parsley on an existing element.");
            if ("undefined" != typeof r && "ParsleyForm" !== r.__class__)
                throw new Error("Parent instance must be a ParsleyForm instance");
            return this.parent = r || window.Parsley,
            this.init(i)
        }
        ,
        l.prototype = {
            init: function(n) {
                return (this.__class__ = "Parsley",
                this.__version__ = "2.6.0",
                this.__id__ = r.generateID(),
                this._resetOptions(n),
                this.$element.is("form") || r.checkAttr(this.$element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs)) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
            },
            isMultiple: function() {
                return this.$element.is("input[type=radio], input[type=checkbox]") || this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple")
            },
            handleMultiple: function() {
                var e = this, u, o, t, f, i;
                if (this.options.multiple || ("undefined" != typeof this.$element.attr("name") && this.$element.attr("name").length ? this.options.multiple = u = this.$element.attr("name") : "undefined" != typeof this.$element.attr("id") && this.$element.attr("id").length && (this.options.multiple = this.$element.attr("id"))),
                this.$element.is("select") && "undefined" != typeof this.$element.attr("multiple"))
                    return this.options.multiple = this.options.multiple || this.__id__,
                    this.bind("parsleyFieldMultiple");
                if (!this.options.multiple)
                    return r.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element),
                    this;
                for (this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""),
                "undefined" != typeof u && n('input[name="' + u + '"]').each(function(t, i) {
                    n(i).is("input[type=radio], input[type=checkbox]") && n(i).attr(e.options.namespace + "multiple", e.options.multiple)
                }),
                f = this._findRelated(),
                i = 0; i < f.length; i++)
                    if (t = n(f.get(i)).data("Parsley"),
                    "undefined" != typeof t) {
                        this.$element.data("ParsleyFieldMultiple") || t.addElement(this.$element);
                        break
                    }
                return this.bind("parsleyField", !0),
                t || this.bind("parsleyFieldMultiple")
            },
            bind: function(t, i) {
                var u;
                switch (t) {
                case "parsleyForm":
                    u = n.extend(new e(this.$element,this.domOptions,this.options), new f, window.ParsleyExtend)._bindFields();
                    break;
                case "parsleyField":
                    u = n.extend(new o(this.$element,this.domOptions,this.options,this.parent), new f, window.ParsleyExtend);
                    break;
                case "parsleyFieldMultiple":
                    u = n.extend(new o(this.$element,this.domOptions,this.options,this.parent), new it, new f, window.ParsleyExtend)._init();
                    break;
                default:
                    throw new Error(t + "is not a supported Parsley type");
                }
                return (this.options.multiple && r.setAttr(this.$element, this.options.namespace, "multiple", this.options.multiple),
                "undefined" != typeof i) ? (this.$element.data("ParsleyFieldMultiple", u),
                u) : (this.$element.data("Parsley", u),
                u._actualizeTriggers(),
                u._trigger("init"),
                u)
            }
        },
        p = n.fn.jquery.split("."),
        parseInt(p[0]) <= 1 && parseInt(p[1]) < 8)
            throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
        p.forEach || r.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim"),
        u = n.extend(new f, {
            $element: n(document),
            actualizeOptions: null,
            _resetOptions: null,
            Factory: l,
            version: "2.6.0"
        }),
        n.extend(o.prototype, c.Field, f.prototype),
        n.extend(e.prototype, c.Form, f.prototype),
        n.extend(l.prototype, f.prototype),
        n.fn.parsley = n.fn.psly = function(t) {
            if (this.length > 1) {
                var i = [];
                return this.each(function() {
                    i.push(n(this).parsley(t))
                }),
                i
            }
            if (!n(this).length) {
                r.warn("You must bind Parsley on an existing element.");
                return
            }
            return new l(this,t)
        }
        ,
        "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}),
        u.options = n.extend(r.objectCreate(ut), window.ParsleyConfig),
        window.ParsleyConfig = u.options,
        window.Parsley = window.psly = u,
        window.ParsleyUtils = r,
        ot = window.Parsley._validatorRegistry = new k(window.ParsleyConfig.validators,window.ParsleyConfig.i18n),
        window.ParsleyValidator = {},
        n.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator".split(" "), function(t, i) {
            window.Parsley[i] = n.proxy(ot, i),
            window.ParsleyValidator[i] = function() {
                var n;
                return r.warnOnce("Accessing the method '" + i + "' through ParsleyValidator is deprecated. Simply call 'window.Parsley." + i + "(...)'"),
                (n = window.Parsley)[i].apply(n, arguments)
            }
        }),
        window.Parsley.UI = c,
        window.ParsleyUI = {
            removeError: function(n, t, i) {
                var u = !0 !== i;
                return r.warnOnce("Accessing ParsleyUI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),
                n.removeError(t, {
                    updateClass: u
                })
            },
            getErrorsMessages: function(n) {
                return r.warnOnce("Accessing ParsleyUI is deprecated. Call 'getErrorsMessages' on the instance directly."),
                n.getErrorsMessages()
            }
        },
        n.each("addError updateError".split(" "), function(n, t) {
            window.ParsleyUI[t] = function(n, i, u, f, e) {
                var o = !0 !== e;
                return r.warnOnce("Accessing ParsleyUI is deprecated. Call '" + t + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."),
                n[t](i, {
                    message: u,
                    assert: f,
                    updateClass: o
                })
            }
        }),
        !1 !== window.ParsleyConfig.autoBind && n(function() {
            n("[data-parsley-validate]").length && n("[data-parsley-validate]").parsley()
        }),
        st = n({}),
        s = function() {
            r.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
        }
        ,
        rt = "parsley:",
        n.listen = function(n, t) {
            var i;
            if (s(),
            "object" == typeof arguments[1] && "function" == typeof arguments[2] && (i = arguments[1],
            t = arguments[2]),
            "function" != typeof t)
                throw new Error("Wrong parameters");
            window.Parsley.on(h(n), ht(t, i))
        }
        ,
        n.listenTo = function(n, t, i) {
            if (s(),
            !(n instanceof o) && !(n instanceof e))
                throw new Error("Must give Parsley instance");
            if ("string" != typeof t || "function" != typeof i)
                throw new Error("Wrong parameters");
            n.on(h(t), ht(i))
        }
        ,
        n.unsubscribe = function(n, t) {
            if (s(),
            "string" != typeof n || "function" != typeof t)
                throw new Error("Wrong arguments");
            window.Parsley.off(h(n), t.parsleyAdaptedCallback)
        }
        ,
        n.unsubscribeTo = function(n, t) {
            if (s(),
            !(n instanceof o) && !(n instanceof e))
                throw new Error("Must give Parsley instance");
            n.off(h(t))
        }
        ,
        n.unsubscribeAll = function(t) {
            s(),
            window.Parsley.off(h(t)),
            n("form,input,textarea,select").each(function() {
                var i = n(this).data("Parsley");
                i && i.off(h(t))
            })
        }
        ,
        n.emit = function(n, i) {
            var f, r, u;
            s(),
            r = i instanceof o || i instanceof e,
            u = Array.prototype.slice.call(arguments, r ? 2 : 1),
            u.unshift(h(n)),
            r || (i = window.Parsley),
            (f = i).trigger.apply(f, t(u))
        }
        ,
        bt = {},
        n.extend(!0, u, {
            asyncValidators: {
                "default": {
                    fn: function(n) {
                        return n.status >= 200 && n.status < 300
                    },
                    url: !1
                },
                reverse: {
                    fn: function(n) {
                        return n.status < 200 || n.status >= 300
                    },
                    url: !1
                }
            },
            addAsyncValidator: function(n, t, i, r) {
                return u.asyncValidators[n] = {
                    fn: t,
                    url: i || !1,
                    options: r || {}
                },
                this
            }
        }),
        u.addValidator("remote", {
            requirementType: {
                "": "string",
                validator: "string",
                reverse: "boolean",
                options: "object"
            },
            validateString: function(t, i, r, f) {
                var l = {}, o, s, e = r.validator || (!0 === r.reverse ? "reverse" : "default"), a, h, c;
                if ("undefined" == typeof u.asyncValidators[e])
                    throw new Error("Calling an undefined async validator: `" + e + "`");
                return i = u.asyncValidators[e].url || i,
                i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(t)) : l[f.$element.attr("name") || f.$element.attr("id")] = t,
                a = n.extend(!0, r.options || {}, u.asyncValidators[e].options),
                o = n.extend(!0, {}, {
                    url: i,
                    data: l,
                    type: "GET"
                }, a),
                f.trigger("field:ajaxoptions", f, o),
                s = n.param(o),
                "undefined" == typeof u._remoteCache && (u._remoteCache = {}),
                h = u._remoteCache[s] = u._remoteCache[s] || n.ajax(o),
                c = function() {
                    var t = u.asyncValidators[e].fn.call(f, h, i, r);
                    return t || (t = n.Deferred().reject()),
                    n.when(t)
                }
                ,
                h.then(c, c)
            },
            priority: -1
        });
        u.on("form:submit", function() {
            u._remoteCache = {}
        });
        return window.ParsleyExtend.addAsyncValidator = function() {
            return ParsleyUtils.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),
            u.addAsyncValidator.apply(u, arguments)
        }
        ,
        u.addMessages("en", {
            defaultMessage: "This value seems to be invalid.",
            type: {
                email: "This value should be a valid email.",
                url: "This value should be a valid url.",
                number: "This value should be a valid number.",
                integer: "This value should be a valid integer.",
                digits: "This value should be digits.",
                alphanum: "This value should be alphanumeric."
            },
            notblank: "This value should not be blank.",
            required: "This value is required.",
            pattern: "This value seems to be invalid.",
            min: "This value should be greater than or equal to %s.",
            max: "This value should be lower than or equal to %s.",
            range: "This value should be between %s and %s.",
            minlength: "This value is too short. It should have %s characters or more.",
            maxlength: "This value is too long. It should have %s characters or fewer.",
            length: "This value length is invalid. It should be between %s and %s characters long.",
            mincheck: "You must select at least %s choices.",
            maxcheck: "You must select %s choices or fewer.",
            check: "You must select between %s and %s choices.",
            equalto: "This value should be the same."
        }),
        u.setLocale("en"),
        ct = new kt,
        ct.install(),
        lt = u
    }),
    n("app", ["jquery", "underscore"], function(n, t) {
        "use strict";
        var i = i || {};
        return i.defaultErrorHandler = function(i, r) {
            var u = n("body");
            r.status !== 0 && r.readyState !== 0 && (r.status === 401 ? location.reload() : t.isUndefined(r.responseJSON) || r.status === 500 && r.responseJSON.Type === "Unhandled")
        }
        ,
        i.handledError = function(n) {
            if (n.status === 0)
                return !1;
            n.status === 401 ? location.reload() : !t.isUndefined(n.responseJSON) && n.status === 500 && n.responseJSON.Type === "Handled"
        }
        ,
        i
    }),
    n("gtmTracking", ["jquery", "underscore"], function(n) {
        "use strict";
        return function() {
            var t = "data-gtm-trigger"
              , i = "[" + t + '="submit"]'
              , r = "[" + t + '="click"]'
              , u = "[" + t + '="change"]';
            this.initialize = function() {
                var n = this;
                n.eventListener()
            }
            ,
            this.eventListener = function() {
                var t = this
                  , f = n(document);
                f.on("submit.gtm", i, function() {
                    t.handleTracking(n(this))
                });
                f.on("click.gtm", r, function() {
                    t.handleTracking(n(this))
                });
                f.on("change.gtm", u, function() {
                    var r = n(this);
                    r.is(":radio") || r.is(":checkbox") ? r.is(":checked") && t.handleTracking(n(this)) : t.handleTracking(n(this))
                })
            }
            ,
            this.handleTracking = function(t) {
                var r = this
                  , i = n(t).data();
                i.gtmTracking && r.pushDataLayer(i.gtmTracking)
            }
            ,
            this.pushDataLayer = function(n) {
                dataLayer.push(n)
            }
        }
    }),
    function(t) {
        "use strict";
        typeof n == "function" && n.amd ? n("hoverIntent", ["jquery"], t) : jQuery && !jQuery.fn.hoverIntent && t(jQuery)
    }(function(n) {
        "use strict";
        var f = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        }, e = 0, t, i, r = function(n) {
            t = n.pageX,
            i = n.pageY
        }, u = function(n, f, e, o) {
            if (Math.sqrt((e.pX - t) * (e.pX - t) + (e.pY - i) * (e.pY - i)) < o.sensitivity)
                return f.off(e.event, r),
                delete e.timeoutId,
                e.isActive = !0,
                n.pageX = t,
                n.pageY = i,
                delete e.pX,
                delete e.pY,
                o.over.apply(f[0], [n]);
            e.pX = t,
            e.pY = i,
            e.timeoutId = setTimeout(function() {
                u(n, f, e, o)
            }, o.interval)
        }, o = function(n, t, i, r) {
            return delete t.data("hoverIntent")[i.id],
            r.apply(t[0], [n])
        };
        n.fn.hoverIntent = function(t, i, s) {
            var c = e++, h = n.extend({}, f), l;
            n.isPlainObject(t) ? (h = n.extend(h, t),
            n.isFunction(h.out) || (h.out = h.over)) : h = n.isFunction(i) ? n.extend(h, {
                over: t,
                out: i,
                selector: s
            }) : n.extend(h, {
                over: t,
                out: t,
                selector: i
            }),
            l = function(t) {
                var e = n.extend({}, t), f = n(this), s = f.data("hoverIntent"), i, l;
                if (s || f.data("hoverIntent", s = {}),
                i = s[c],
                i || (s[c] = i = {
                    id: c
                }),
                i.timeoutId && (i.timeoutId = clearTimeout(i.timeoutId)),
                l = i.event = "mousemove.hoverIntent.hoverIntent" + c,
                t.type === "mouseenter") {
                    if (i.isActive)
                        return;
                    i.pX = e.pageX,
                    i.pY = e.pageY;
                    f.off(l, r).on(l, r);
                    i.timeoutId = setTimeout(function() {
                        u(e, f, i, h)
                    }, h.interval)
                } else {
                    if (!i.isActive)
                        return;
                    f.off(l, r),
                    i.timeoutId = setTimeout(function() {
                        o(e, f, i, h.out)
                    }, h.timeout)
                }
            }
            ;
            return this.on({
                "mouseenter.hoverIntent": l,
                "mouseleave.hoverIntent": l
            }, h.selector)
        }
    }),
    n("menuMain", ["jquery", "hoverIntent", "animation"], function(n, t, i) {
        "use strict";
        return function() {
            var r = !1
              , u = ".menu-main"
              , t = ".menu-main__list"
              , f = 0;
            this.initialize = function() {
                var r = this;
                n(t).hoverIntent({
                    selector: "li",
                    over: function(t) {
                        var i = n(t.currentTarget);
                        i.addClass("hover"),
                        r.unFocusActiveMenuItem(i),
                        n(".menu-tool__toggle.has-expanded-target").trigger("click")
                    },
                    out: function(t) {
                        var i = n(t.currentTarget);
                        i.removeClass("hover"),
                        r.reFocusActiveMenuItem(i)
                    },
                    timeout: 300
                }),
                r.toggleActiveMobileMenu();
                n(window).on("scrolled.past-menu-limit", function() {
                    var f = n(u);
                    f.removeClass("is-above-limit").addClass("is-past-limit"),
                    r.isMobileMenu() || i.animateOut(f, "opacity", 200)
                });
                n(window).on("scrolled.above-menu-limit", function() {
                    var f = n(u);
                    f.removeClass("is-past-limit").addClass("is-above-limit"),
                    r.isMobileMenu() || i.animateIn(f, "opacity", 200)
                })
            }
            ,
            this.unFocusActiveMenuItem = function(n) {
                var t = this;
                clearTimeout(f),
                n.hasClass("is-active") ? n.removeClass("is-unfocused") : n.siblings(".is-active").addClass("is-unfocused")
            }
            ,
            this.reFocusActiveMenuItem = function() {
                var r = this;
                f = setTimeout(function() {
                    n(t).find(".hover").length === 0 && n(t).find(".is-unfocused").removeClass("is-unfocused")
                }, 150)
            }
            ,
            this.toggleActiveMobileMenu = function() {
                var t = this;
                n(".menu-main-toggler").on("click", function() {
                    t.openActiveItems(),
                    r || t.markDeepestLink()
                })
            }
            ,
            this.openActiveItems = function() {
                var u = this
                  , i = ".menu-main__toggle"
                  , r = ".has-expanded-target";
                n(t + " .has-child").each(function() {
                    var t = n(this);
                    t.hasClass("is-active") ? t.find("> " + i + ":not(" + r + ")").trigger("click") : t.find("> " + i + r).trigger("click")
                })
            }
            ,
            this.markDeepestLink = function() {
                var i = this;
                r = !0,
                n(t + " .is-active:not(.has-child) a").addClass("is-last")
            }
            ,
            this.isMobileMenu = function() {
                return n(".menu-main-toggler:visible").length > 0 ? !0 : !1
            }
        }
    }),
    n("submenuMain", ["jquery"], function(n) {
        "use strict";
        return function() {
            this.initialize = function() {
                var t = this;
                n(".submenu-main-toggler").on("click", function(i) {
                    i.preventDefault();
                    var r = n(this)
                      , u = r.data("labels");
                    r.hasClass("has-expanded-target") ? r.text(u.show) : (r.text(u.hide),
                    t.openActiveItems())
                })
            }
            ,
            this.openActiveItems = function() {
                var t = "submenu-main-list__child-toggle"
                  , i = "has-expanded-target";
                n(".submenu-main-list__item.has-child.is-active").each(function() {
                    var u = n(this)
                      , r = u.find("> ." + t);
                    r.hasClass(i) || r.trigger("click")
                })
            }
        }
    }),
    n("menuTools", ["jquery", "hoverIntent"], function(n) {
        "use strict";
        return function() {
            this.initialize = function() {
                var t = this;
                n(".menu-tools").hoverIntent({
                    selector: "li",
                    over: function(t) {
                        var i = n(t.currentTarget);
                        i.addClass("hover")
                    },
                    out: function(t) {
                        var i = n(t.currentTarget);
                        i.removeClass("hover")
                    },
                    timeout: 100
                }),
                t.handleMenuArrow();
                n(window).on("scrolled.past-middle", function() {
                    n(".menu-tool__toggle.dom-toggle--expanded").trigger("click")
                })
            }
            ,
            this.handleMenuArrow = function() {
                var t = ".menu-main__list";
                n(window).on("domToggle", function(i) {
                    (i.target === "header-search__container" || i.target === "lang-select__list") && (i.action === "show" ? (console.log("e", i),
                    n(t).find(".is-active").addClass("is-unfocused")) : n(t + ":hover").length === 0 && n(t).find(".is-active.is-unfocused").removeClass("is-unfocused"))
                })
            }
        }
    }),
    n("siteFooter", ["jquery"], function(n) {
        "use strict";
        return function() {
            this.initialize = function() {
                n(".site-footer__signupForm").submit(function(n) {
                    n.preventDefault();
                    var t = this;
                    setTimeout(function() {
                        t.submit()
                    }, 800),
                    dataLayer.push({
                        event: "goalEvent",
                        goalCat: "See",
                        goalType: "Subscribe to newsletter",
                        goalContent: "Marketing",
                        eventCallback: function() {
                            t.submit()
                        }
                    })
                })
            }
        }
    }),
    function(t) {
        typeof n == "function" && n.amd ? n("jquery-ui", ["jquery"], t) : t(jQuery)
    }(function(n) {
        function k(n) {
            for (var t = n.css("visibility"); t === "inherit"; )
                n = n.parent(),
                t = n.css("visibility");
            return t !== "hidden"
        }
        function tt(n) {
            for (var t, i; n.length && n[0] !== document; ) {
                if (t = n.css("position"),
                (t === "absolute" || t === "relative" || t === "fixed") && (i = parseInt(n.css("zIndex"), 10),
                !isNaN(i) && i !== 0))
                    return i;
                n = n.parent()
            }
            return 0
        }
        function a() {
            this._curInst = null,
            this._keyEvent = !1,
            this._disabledInputs = [],
            this._datepickerShowing = !1,
            this._inDialog = !1,
            this._mainDivId = "ui-datepicker-div",
            this._inlineClass = "ui-datepicker-inline",
            this._appendClass = "ui-datepicker-append",
            this._triggerClass = "ui-datepicker-trigger",
            this._dialogClass = "ui-datepicker-dialog",
            this._disableClass = "ui-datepicker-disabled",
            this._unselectableClass = "ui-datepicker-unselectable",
            this._currentClass = "ui-datepicker-current-day",
            this._dayOverClass = "ui-datepicker-days-cell-over",
            this.regional = [],
            this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            },
            this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            },
            n.extend(this._defaults, this.regional[""]),
            this.regional.en = n.extend(!0, {}, this.regional[""]),
            this.regional["en-US"] = n.extend(!0, {}, this.regional.en),
            this.dpDiv = v(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
        }
        function v(t) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t.on("mouseout", i, function() {
                n(this).removeClass("ui-state-hover"),
                this.className.indexOf("ui-datepicker-prev") !== -1 && n(this).removeClass("ui-datepicker-prev-hover"),
                this.className.indexOf("ui-datepicker-next") !== -1 && n(this).removeClass("ui-datepicker-next-hover")
            }).on("mouseover", i, y)
        }
        function y() {
            n.datepicker._isDisabledDatepicker(t.inline ? t.dpDiv.parent()[0] : t.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
            n(this).addClass("ui-state-hover"),
            this.className.indexOf("ui-datepicker-prev") !== -1 && n(this).addClass("ui-datepicker-prev-hover"),
            this.className.indexOf("ui-datepicker-next") !== -1 && n(this).addClass("ui-datepicker-next-hover"))
        }
        function u(t, i) {
            n.extend(t, i);
            for (var r in i)
                i[r] == null && (t[r] = i[r]);
            return t
        }
        function i(n) {
            return function() {
                var t = this.element.val();
                n.apply(this, arguments),
                this._refresh(),
                t !== this.element.val() && this._trigger("change")
            }
        }
        var w, b, g, nt, t, it, rt, ut, e, ft, et, ot;
        n.ui = n.ui || {};
        var st = n.ui.version = "1.12.1"
          , p = 0
          , h = Array.prototype.slice;
        n.cleanData = function(t) {
            return function(i) {
                for (var r, u, f = 0; (u = i[f]) != null; f++)
                    try {
                        r = n._data(u, "events"),
                        r && r.remove && n(u).triggerHandler("remove")
                    } catch (e) {}
                t(i)
            }
        }(n.cleanData),
        n.widget = function(t, i, r) {
            var f, u, o, h = {}, e = t.split(".")[0], s;
            return t = t.split(".")[1],
            s = e + "-" + t,
            r || (r = i,
            i = n.Widget),
            n.isArray(r) && (r = n.extend.apply(null, [{}].concat(r))),
            n.expr[":"][s.toLowerCase()] = function(t) {
                return !!n.data(t, s)
            }
            ,
            n[e] = n[e] || {},
            f = n[e][t],
            u = n[e][t] = function(n, t) {
                if (!this._createWidget)
                    return new u(n,t);
                arguments.length && this._createWidget(n, t)
            }
            ,
            n.extend(u, f, {
                version: r.version,
                _proto: n.extend({}, r),
                _childConstructors: []
            }),
            o = new i,
            o.options = n.widget.extend({}, o.options),
            n.each(r, function(t, r) {
                if (!n.isFunction(r)) {
                    h[t] = r;
                    return
                }
                h[t] = function() {
                    function n() {
                        return i.prototype[t].apply(this, arguments)
                    }
                    function u(n) {
                        return i.prototype[t].apply(this, n)
                    }
                    return function() {
                        var i = this._super, f = this._superApply, t;
                        return this._super = n,
                        this._superApply = u,
                        t = r.apply(this, arguments),
                        this._super = i,
                        this._superApply = f,
                        t
                    }
                }()
            }),
            u.prototype = n.widget.extend(o, {
                widgetEventPrefix: f ? o.widgetEventPrefix || t : t
            }, h, {
                constructor: u,
                namespace: e,
                widgetName: t,
                widgetFullName: s
            }),
            f ? (n.each(f._childConstructors, function(t, i) {
                var r = i.prototype;
                n.widget(r.namespace + "." + r.widgetName, u, i._proto)
            }),
            delete f._childConstructors) : i._childConstructors.push(u),
            n.widget.bridge(t, u),
            u
        }
        ,
        n.widget.extend = function(t) {
            for (var f = h.call(arguments, 1), u = 0, e = f.length, i, r; u < e; u++)
                for (i in f[u])
                    r = f[u][i],
                    f[u].hasOwnProperty(i) && r !== undefined && (t[i] = n.isPlainObject(r) ? n.isPlainObject(t[i]) ? n.widget.extend({}, t[i], r) : n.widget.extend({}, r) : r);
            return t
        }
        ,
        n.widget.bridge = function(t, i) {
            var r = i.prototype.widgetFullName || t;
            n.fn[t] = function(u) {
                var o = typeof u == "string"
                  , e = h.call(arguments, 1)
                  , f = this;
                return o ? this.length || u !== "instance" ? this.each(function() {
                    var i, o = n.data(this, r);
                    return u === "instance" ? (f = o,
                    !1) : o ? !n.isFunction(o[u]) || u.charAt(0) === "_" ? n.error("no such method '" + u + "' for " + t + " widget instance") : (i = o[u].apply(o, e),
                    i !== o && i !== undefined ? (f = i && i.jquery ? f.pushStack(i.get()) : i,
                    !1) : void 0) : n.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + u + "'")
                }) : f = undefined : (e.length && (u = n.widget.extend.apply(null, [u].concat(e))),
                this.each(function() {
                    var t = n.data(this, r);
                    t ? (t.option(u || {}),
                    t._init && t._init()) : n.data(this, r, new i(u,this))
                })),
                f
            }
        }
        ,
        n.Widget = function() {}
        ,
        n.Widget._childConstructors = [],
        n.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(t, i) {
                i = n(i || this.defaultElement || this)[0],
                this.element = n(i),
                this.uuid = p++,
                this.eventNamespace = "." + this.widgetName + this.uuid,
                this.bindings = n(),
                this.hoverable = n(),
                this.focusable = n(),
                this.classesElementLookup = {},
                i !== this && (n.data(i, this.widgetFullName, this),
                this._on(!0, this.element, {
                    remove: function(n) {
                        n.target === i && this.destroy()
                    }
                }),
                this.document = n(i.style ? i.ownerDocument : i.document || i),
                this.window = n(this.document[0].defaultView || this.document[0].parentWindow)),
                this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t),
                this._create(),
                this.options.disabled && this._setOptionDisabled(this.options.disabled),
                this._trigger("create", null, this._getCreateEventData()),
                this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: n.noop,
            _create: n.noop,
            _init: n.noop,
            destroy: function() {
                var t = this;
                this._destroy(),
                n.each(this.classesElementLookup, function(n, i) {
                    t._removeClass(i, n)
                }),
                this.element.off(this.eventNamespace).removeData(this.widgetFullName),
                this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
                this.bindings.off(this.eventNamespace)
            },
            _destroy: n.noop,
            widget: function() {
                return this.element
            },
            option: function(t, i) {
                var e = t, r, u, f;
                if (arguments.length === 0)
                    return n.widget.extend({}, this.options);
                if (typeof t == "string")
                    if (e = {},
                    r = t.split("."),
                    t = r.shift(),
                    r.length) {
                        for (u = e[t] = n.widget.extend({}, this.options[t]),
                        f = 0; f < r.length - 1; f++)
                            u[r[f]] = u[r[f]] || {},
                            u = u[r[f]];
                        if (t = r.pop(),
                        arguments.length === 1)
                            return u[t] === undefined ? null : u[t];
                        u[t] = i
                    } else {
                        if (arguments.length === 1)
                            return this.options[t] === undefined ? null : this.options[t];
                        e[t] = i
                    }
                return this._setOptions(e),
                this
            },
            _setOptions: function(n) {
                var t;
                for (t in n)
                    this._setOption(t, n[t]);
                return this
            },
            _setOption: function(n, t) {
                return n === "classes" && this._setOptionClasses(t),
                this.options[n] = t,
                n === "disabled" && this._setOptionDisabled(t),
                this
            },
            _setOptionClasses: function(t) {
                var i, u, r;
                for (i in t)
                    (r = this.classesElementLookup[i],
                    t[i] !== this.options.classes[i] && r && r.length) && (u = n(r.get()),
                    this._removeClass(r, i),
                    u.addClass(this._classes({
                        element: u,
                        keys: i,
                        classes: t,
                        add: !0
                    })))
            },
            _setOptionDisabled: function(n) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!n),
                n && (this._removeClass(this.hoverable, null, "ui-state-hover"),
                this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(t) {
                function u(u, f) {
                    for (var o, e = 0; e < u.length; e++)
                        o = r.classesElementLookup[u[e]] || n(),
                        o = t.add ? n(n.unique(o.get().concat(t.element.get()))) : n(o.not(t.element).get()),
                        r.classesElementLookup[u[e]] = o,
                        i.push(u[e]),
                        f && t.classes[u[e]] && i.push(t.classes[u[e]])
                }
                var i = []
                  , r = this;
                return t = n.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, t),
                this._on(t.element, {
                    remove: "_untrackClassesElement"
                }),
                t.keys && u(t.keys.match(/\S+/g) || [], !0),
                t.extra && u(t.extra.match(/\S+/g) || []),
                i.join(" ")
            },
            _untrackClassesElement: function(t) {
                var i = this;
                n.each(i.classesElementLookup, function(r, u) {
                    n.inArray(t.target, u) !== -1 && (i.classesElementLookup[r] = n(u.not(t.target).get()))
                })
            },
            _removeClass: function(n, t, i) {
                return this._toggleClass(n, t, i, !1)
            },
            _addClass: function(n, t, i) {
                return this._toggleClass(n, t, i, !0)
            },
            _toggleClass: function(n, t, i, r) {
                r = typeof r == "boolean" ? r : i;
                var u = typeof n == "string" || n === null
                  , f = {
                    extra: u ? t : i,
                    keys: u ? n : t,
                    element: u ? this.element : n,
                    add: r
                };
                return f.element.toggleClass(this._classes(f), r),
                this
            },
            _on: function(t, i, r) {
                var f, u = this;
                typeof t != "boolean" && (r = i,
                i = t,
                t = !1),
                r ? (i = f = n(i),
                this.bindings = this.bindings.add(i)) : (r = i,
                i = this.element,
                f = this.widget()),
                n.each(r, function(r, e) {
                    function o() {
                        if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled"))
                            return (typeof e == "string" ? u[e] : e).apply(u, arguments)
                    }
                    typeof e != "string" && (o.guid = e.guid = e.guid || o.guid || n.guid++);
                    var s = r.match(/^([\w:-]*)\s*(.*)$/)
                      , h = s[1] + u.eventNamespace
                      , c = s[2];
                    if (c)
                        f.on(h, c, o);
                    else
                        i.on(h, o)
                })
            },
            _off: function(t, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
                t.off(i).off(i),
                this.bindings = n(this.bindings.not(t).get()),
                this.focusable = n(this.focusable.not(t).get()),
                this.hoverable = n(this.hoverable.not(t).get())
            },
            _delay: function(n, t) {
                function r() {
                    return (typeof n == "string" ? i[n] : n).apply(i, arguments)
                }
                var i = this;
                return setTimeout(r, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t),
                this._on(t, {
                    mouseenter: function(t) {
                        this._addClass(n(t.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(t) {
                        this._removeClass(n(t.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t),
                this._on(t, {
                    focusin: function(t) {
                        this._addClass(n(t.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(t) {
                        this._removeClass(n(t.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(t, i, r) {
                var u, f, e = this.options[t];
                if (r = r || {},
                i = n.Event(i),
                i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
                i.target = this.element[0],
                f = i.originalEvent,
                f)
                    for (u in f)
                        u in i || (i[u] = f[u]);
                return this.element.trigger(i, r),
                !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
            }
        },
        n.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, i) {
            n.Widget.prototype["_" + t] = function(r, u, f) {
                typeof u == "string" && (u = {
                    effect: u
                });
                var o, e = u ? u === !0 || typeof u == "number" ? i : u.effect || i : t;
                u = u || {},
                typeof u == "number" && (u = {
                    duration: u
                }),
                o = !n.isEmptyObject(u),
                u.complete = f,
                u.delay && r.delay(u.delay),
                o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                    n(this)[t](),
                    f && f.call(r[0]),
                    i()
                })
            }
        }),
        w = n.widget,
        function() {
            function c(n, t, i) {
                return [parseFloat(n[0]) * (h.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (h.test(n[1]) ? i / 100 : 1)]
            }
            function r(t, i) {
                return parseInt(n.css(t, i), 10) || 0
            }
            function a(t) {
                var i = t[0];
                return i.nodeType === 9 ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : n.isWindow(i) ? {
                    width: t.width(),
                    height: t.height(),
                    offset: {
                        top: t.scrollTop(),
                        left: t.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset()
                }
            }
            var u, i = Math.max, t = Math.abs, f = /left|center|right/, e = /top|center|bottom/, o = /[\+\-]\d+(\.[\d]+)?%?/, s = /^\w+/, h = /%$/, l = n.fn.position;
            n.position = {
                scrollbarWidth: function() {
                    if (u !== undefined)
                        return u;
                    var r, i, t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"), f = t.children()[0];
                    return n("body").append(t),
                    r = f.offsetWidth,
                    t.css("overflow", "scroll"),
                    i = f.offsetWidth,
                    r === i && (i = t[0].clientWidth),
                    t.remove(),
                    u = r - i
                },
                getScrollInfo: function(t) {
                    var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x")
                      , r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y")
                      , u = i === "scroll" || i === "auto" && t.width < t.element[0].scrollWidth
                      , f = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
                    return {
                        width: f ? n.position.scrollbarWidth() : 0,
                        height: u ? n.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(t) {
                    var i = n(t || window)
                      , r = n.isWindow(i[0])
                      , u = !!i[0] && i[0].nodeType === 9
                      , f = !r && !u;
                    return {
                        element: i,
                        isWindow: r,
                        isDocument: u,
                        offset: f ? n(t).offset() : {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: i.outerWidth(),
                        height: i.outerHeight()
                    }
                }
            },
            n.fn.position = function(u) {
                if (!u || !u.of)
                    return l.apply(this, arguments);
                u = n.extend({}, u);
                var w, h, v, p, y, k, d = n(u.of), nt = n.position.getWithinInfo(u.within), tt = n.position.getScrollInfo(nt), b = (u.collision || "flip").split(" "), g = {};
                return k = a(d),
                d[0].preventDefault && (u.at = "left top"),
                h = k.width,
                v = k.height,
                p = k.offset,
                y = n.extend({}, p),
                n.each(["my", "at"], function() {
                    var n = (u[this] || "").split(" "), t, i;
                    n.length === 1 && (n = f.test(n[0]) ? n.concat(["center"]) : e.test(n[0]) ? ["center"].concat(n) : ["center", "center"]),
                    n[0] = f.test(n[0]) ? n[0] : "center",
                    n[1] = e.test(n[1]) ? n[1] : "center",
                    t = o.exec(n[0]),
                    i = o.exec(n[1]),
                    g[this] = [t ? t[0] : 0, i ? i[0] : 0],
                    u[this] = [s.exec(n[0])[0], s.exec(n[1])[0]]
                }),
                b.length === 1 && (b[1] = b[0]),
                u.at[0] === "right" ? y.left += h : u.at[0] === "center" && (y.left += h / 2),
                u.at[1] === "bottom" ? y.top += v : u.at[1] === "center" && (y.top += v / 2),
                w = c(g.at, h, v),
                y.left += w[0],
                y.top += w[1],
                this.each(function() {
                    var a, k, e = n(this), o = e.outerWidth(), s = e.outerHeight(), it = r(this, "marginLeft"), rt = r(this, "marginTop"), ut = o + it + r(this, "marginRight") + tt.width, ft = s + rt + r(this, "marginBottom") + tt.height, f = n.extend({}, y), l = c(g.my, e.outerWidth(), e.outerHeight());
                    u.my[0] === "right" ? f.left -= o : u.my[0] === "center" && (f.left -= o / 2),
                    u.my[1] === "bottom" ? f.top -= s : u.my[1] === "center" && (f.top -= s / 2),
                    f.left += l[0],
                    f.top += l[1],
                    a = {
                        marginLeft: it,
                        marginTop: rt
                    },
                    n.each(["left", "top"], function(t, i) {
                        n.ui.position[b[t]] && n.ui.position[b[t]][i](f, {
                            targetWidth: h,
                            targetHeight: v,
                            elemWidth: o,
                            elemHeight: s,
                            collisionPosition: a,
                            collisionWidth: ut,
                            collisionHeight: ft,
                            offset: [w[0] + l[0], w[1] + l[1]],
                            my: u.my,
                            at: u.at,
                            within: nt,
                            elem: e
                        })
                    }),
                    u.using && (k = function(n) {
                        var c = p.left - f.left
                          , a = c + h - o
                          , l = p.top - f.top
                          , y = l + v - s
                          , r = {
                            target: {
                                element: d,
                                left: p.left,
                                top: p.top,
                                width: h,
                                height: v
                            },
                            element: {
                                element: e,
                                left: f.left,
                                top: f.top,
                                width: o,
                                height: s
                            },
                            horizontal: a < 0 ? "left" : c > 0 ? "right" : "center",
                            vertical: y < 0 ? "top" : l > 0 ? "bottom" : "middle"
                        };
                        h < o && t(c + a) < h && (r.horizontal = "center"),
                        v < s && t(l + y) < v && (r.vertical = "middle"),
                        r.important = i(t(c), t(a)) > i(t(l), t(y)) ? "horizontal" : "vertical",
                        u.using.call(this, n, r)
                    }
                    ),
                    e.offset(n.extend(f, {
                        using: k
                    }))
                })
            }
            ,
            n.ui.position = {
                fit: {
                    left: function(n, t) {
                        var e = t.within, u = e.isWindow ? e.scrollLeft : e.offset.left, o = e.width, s = n.left - t.collisionPosition.marginLeft, r = u - s, f = s + t.collisionWidth - o - u, h;
                        t.collisionWidth > o ? r > 0 && f <= 0 ? (h = n.left + r + t.collisionWidth - o - u,
                        n.left += r - h) : n.left = f > 0 && r <= 0 ? u : r > f ? u + o - t.collisionWidth : u : r > 0 ? n.left += r : f > 0 ? n.left -= f : n.left = i(n.left - s, n.left)
                    },
                    top: function(n, t) {
                        var o = t.within, u = o.isWindow ? o.scrollTop : o.offset.top, e = t.within.height, s = n.top - t.collisionPosition.marginTop, r = u - s, f = s + t.collisionHeight - e - u, h;
                        t.collisionHeight > e ? r > 0 && f <= 0 ? (h = n.top + r + t.collisionHeight - e - u,
                        n.top += r - h) : n.top = f > 0 && r <= 0 ? u : r > f ? u + e - t.collisionHeight : u : r > 0 ? n.top += r : f > 0 ? n.top -= f : n.top = i(n.top - s, n.top)
                    }
                },
                flip: {
                    left: function(n, i) {
                        var r = i.within, y = r.offset.left + r.scrollLeft, c = r.width, o = r.isWindow ? r.scrollLeft : r.offset.left, l = n.left - i.collisionPosition.marginLeft, a = l - o, v = l + i.collisionWidth - c - o, u = i.my[0] === "left" ? -i.elemWidth : i.my[0] === "right" ? i.elemWidth : 0, f = i.at[0] === "left" ? i.targetWidth : i.at[0] === "right" ? -i.targetWidth : 0, e = -2 * i.offset[0], s, h;
                        a < 0 ? (s = n.left + u + f + e + i.collisionWidth - c - y,
                        (s < 0 || s < t(a)) && (n.left += u + f + e)) : v > 0 && (h = n.left - i.collisionPosition.marginLeft + u + f + e - o,
                        (h > 0 || t(h) < v) && (n.left += u + f + e))
                    },
                    top: function(n, i) {
                        var r = i.within, y = r.offset.top + r.scrollTop, c = r.height, o = r.isWindow ? r.scrollTop : r.offset.top, l = n.top - i.collisionPosition.marginTop, a = l - o, v = l + i.collisionHeight - c - o, p = i.my[1] === "top", u = p ? -i.elemHeight : i.my[1] === "bottom" ? i.elemHeight : 0, f = i.at[1] === "top" ? i.targetHeight : i.at[1] === "bottom" ? -i.targetHeight : 0, e = -2 * i.offset[1], s, h;
                        a < 0 ? (h = n.top + u + f + e + i.collisionHeight - c - y,
                        (h < 0 || h < t(a)) && (n.top += u + f + e)) : v > 0 && (s = n.top - i.collisionPosition.marginTop + u + f + e - o,
                        (s > 0 || t(s) < v) && (n.top += u + f + e))
                    }
                },
                flipfit: {
                    left: function() {
                        n.ui.position.flip.left.apply(this, arguments),
                        n.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        n.ui.position.flip.top.apply(this, arguments),
                        n.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }
        }();
        var ht = n.ui.position
          , ct = n.extend(n.expr[":"], {
            data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
                return function(i) {
                    return !!n.data(i, t)
                }
            }) : function(t, i, r) {
                return !!n.data(t, r[3])
            }
        })
          , lt = n.fn.extend({
            disableSelection: function() {
                var n = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
                return function() {
                    return this.on(n + ".ui-disableSelection", function(n) {
                        n.preventDefault()
                    })
                }
            }(),
            enableSelection: function() {
                return this.off(".ui-disableSelection")
            }
        })
          , r = "ui-effects-"
          , o = "ui-effects-style"
          , s = "ui-effects-animated"
          , c = n;
        n.effects = {
            effect: {}
        },
        function(n, t) {
            function e(n, t, i) {
                var r = s[t.type] || {};
                return n == null ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n),
                isNaN(n)) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : r.max < n ? r.max : n
            }
            function l(t) {
                var e = i()
                  , o = e._rgba = [];
                return (t = t.toLowerCase(),
                r(y, function(n, i) {
                    var r, s = i.re.exec(t), h = s && i.parse(s), f = i.space || "rgba";
                    if (h)
                        return r = e[f](h),
                        e[u[f].cache] = r[u[f].cache],
                        o = e._rgba = r._rgba,
                        !1
                }),
                o.length) ? (o.join() === "0,0,0,0" && n.extend(o, f.transparent),
                e) : f[t]
            }
            function o(n, t, i) {
                return (i = (i + 1) % 1,
                i * 6 < 1) ? n + (t - n) * i * 6 : i * 2 < 1 ? t : i * 3 < 2 ? n + (t - n) * (2 / 3 - i) * 6 : n
            }
            var a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", v = /^([\-+])=\s*(\d+\.?\d*)/, y = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(n) {
                    return [n[1], n[2], n[3], n[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function(n) {
                    return [n[1] * 2.55, n[2] * 2.55, n[3] * 2.55, n[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function(n) {
                    return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function(n) {
                    return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function(n) {
                    return [n[1], n[2] / 100, n[3] / 100, n[4]]
                }
            }], i = n.Color = function(t, i, r, u) {
                return new n.Color.fn.parse(t,i,r,u)
            }
            , u = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            }, s = {
                byte: {
                    floor: !0,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: !0
                }
            }, h = i.support = {}, c = n("<p>")[0], f, r = n.each;
            c.style.cssText = "background-color:rgba(1,1,1,.5)",
            h.rgba = c.style.backgroundColor.indexOf("rgba") > -1,
            r(u, function(n, t) {
                t.cache = "_" + n,
                t.props.alpha = {
                    idx: 3,
                    type: "percent",
                    def: 1
                }
            }),
            i.fn = n.extend(i.prototype, {
                parse: function(o, s, h, c) {
                    if (o === t)
                        return this._rgba = [null, null, null, null],
                        this;
                    (o.jquery || o.nodeType) && (o = n(o).css(s),
                    s = t);
                    var a = this
                      , v = n.type(o)
                      , y = this._rgba = [];
                    return (s !== t && (o = [o, s, h, c],
                    v = "array"),
                    v === "string") ? this.parse(l(o) || f._default) : v === "array" ? (r(u.rgba.props, function(n, t) {
                        y[t.idx] = e(o[t.idx], t)
                    }),
                    this) : v === "object" ? (o instanceof i ? r(u, function(n, t) {
                        o[t.cache] && (a[t.cache] = o[t.cache].slice())
                    }) : r(u, function(t, i) {
                        var u = i.cache;
                        r(i.props, function(n, t) {
                            if (!a[u] && i.to) {
                                if (n === "alpha" || o[n] == null)
                                    return;
                                a[u] = i.to(a._rgba)
                            }
                            a[u][t.idx] = e(o[n], t, !0)
                        }),
                        a[u] && n.inArray(null, a[u].slice(0, 3)) < 0 && (a[u][3] = 1,
                        i.from && (a._rgba = i.from(a[u])))
                    }),
                    this) : void 0
                },
                is: function(n) {
                    var e = i(n)
                      , t = !0
                      , f = this;
                    return r(u, function(n, i) {
                        var o, u = e[i.cache];
                        return u && (o = f[i.cache] || i.to && i.to(f._rgba) || [],
                        r(i.props, function(n, i) {
                            if (u[i.idx] != null)
                                return t = u[i.idx] === o[i.idx]
                        })),
                        t
                    }),
                    t
                },
                _space: function() {
                    var n = []
                      , t = this;
                    return r(u, function(i, r) {
                        t[r.cache] && n.push(i)
                    }),
                    n.pop()
                },
                transition: function(n, t) {
                    var f = i(n)
                      , c = f._space()
                      , o = u[c]
                      , l = this.alpha() === 0 ? i("transparent") : this
                      , a = l[o.cache] || o.to(l._rgba)
                      , h = a.slice();
                    return f = f[o.cache],
                    r(o.props, function(n, i) {
                        var c = i.idx
                          , r = a[c]
                          , u = f[c]
                          , o = s[i.type] || {};
                        u !== null && (r === null ? h[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)),
                        h[c] = e((u - r) * t + r, i)))
                    }),
                    this[c](h)
                },
                blend: function(t) {
                    if (this._rgba[3] === 1)
                        return this;
                    var r = this._rgba.slice()
                      , u = r.pop()
                      , f = i(t)._rgba;
                    return i(n.map(r, function(n, t) {
                        return (1 - u) * f[t] + u * n
                    }))
                },
                toRgbaString: function() {
                    var i = "rgba("
                      , t = n.map(this._rgba, function(n, t) {
                        return n == null ? t > 2 ? 1 : 0 : n
                    });
                    return t[3] === 1 && (t.pop(),
                    i = "rgb("),
                    i + t.join() + ")"
                },
                toHslaString: function() {
                    var i = "hsla("
                      , t = n.map(this.hsla(), function(n, t) {
                        return n == null && (n = t > 2 ? 1 : 0),
                        t && t < 3 && (n = Math.round(n * 100) + "%"),
                        n
                    });
                    return t[3] === 1 && (t.pop(),
                    i = "hsl("),
                    i + t.join() + ")"
                },
                toHexString: function(t) {
                    var i = this._rgba.slice()
                      , r = i.pop();
                    return t && i.push(~~(r * 255)),
                    "#" + n.map(i, function(n) {
                        return n = (n || 0).toString(16),
                        n.length === 1 ? "0" + n : n
                    }).join("")
                },
                toString: function() {
                    return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
                }
            }),
            i.fn.parse.prototype = i.fn,
            u.hsla.to = function(n) {
                if (n[0] == null || n[1] == null || n[2] == null)
                    return [null, null, null, n[3]];
                var i = n[0] / 255, r = n[1] / 255, e = n[2] / 255, c = n[3], u = Math.max(i, r, e), s = Math.min(i, r, e), t = u - s, h = u + s, l = h * .5, f, o;
                return f = s === u ? 0 : i === u ? 60 * (r - e) / t + 360 : r === u ? 60 * (e - i) / t + 120 : 60 * (i - r) / t + 240,
                o = t === 0 ? 0 : l <= .5 ? t / h : t / (2 - h),
                [Math.round(f) % 360, o, l, c == null ? 1 : c]
            }
            ,
            u.hsla.from = function(n) {
                if (n[0] == null || n[1] == null || n[2] == null)
                    return [null, null, null, n[3]];
                var r = n[0] / 360
                  , u = n[1]
                  , t = n[2]
                  , e = n[3]
                  , i = t <= .5 ? t * (1 + u) : t + u - t * u
                  , f = 2 * t - i;
                return [Math.round(o(f, i, r + 1 / 3) * 255), Math.round(o(f, i, r) * 255), Math.round(o(f, i, r - 1 / 3) * 255), e]
            }
            ,
            r(u, function(u, f) {
                var s = f.props
                  , o = f.cache
                  , h = f.to
                  , c = f.from;
                i.fn[u] = function(u) {
                    if (h && !this[o] && (this[o] = h(this._rgba)),
                    u === t)
                        return this[o].slice();
                    var l, a = n.type(u), v = a === "array" || a === "object" ? u : arguments, f = this[o].slice();
                    return r(s, function(n, t) {
                        var i = v[a === "object" ? n : t.idx];
                        i == null && (i = f[t.idx]),
                        f[t.idx] = e(i, t)
                    }),
                    c ? (l = i(c(f)),
                    l[o] = f,
                    l) : i(f)
                }
                ,
                r(s, function(t, r) {
                    i.fn[t] || (i.fn[t] = function(i) {
                        var f = n.type(i), h = t === "alpha" ? this._hsla ? "hsla" : "rgba" : u, o = this[h](), s = o[r.idx], e;
                        return f === "undefined" ? s : (f === "function" && (i = i.call(this, s),
                        f = n.type(i)),
                        i == null && r.empty) ? this : (f === "string" && (e = v.exec(i),
                        e && (i = s + parseFloat(e[2]) * (e[1] === "+" ? 1 : -1))),
                        o[r.idx] = i,
                        this[h](o))
                    }
                    )
                })
            }),
            i.hook = function(t) {
                var u = t.split(" ");
                r(u, function(t, r) {
                    n.cssHooks[r] = {
                        set: function(t, u) {
                            var o, f, e = "";
                            if (u !== "transparent" && (n.type(u) !== "string" || (o = l(u)))) {
                                if (u = i(o || u),
                                !h.rgba && u._rgba[3] !== 1) {
                                    for (f = r === "backgroundColor" ? t.parentNode : t; (e === "" || e === "transparent") && f && f.style; )
                                        try {
                                            e = n.css(f, "backgroundColor"),
                                            f = f.parentNode
                                        } catch (s) {}
                                    u = u.blend(e && e !== "transparent" ? e : "_default")
                                }
                                u = u.toRgbaString()
                            }
                            try {
                                t.style[r] = u
                            } catch (s) {}
                        }
                    },
                    n.fx.step[r] = function(t) {
                        t.colorInit || (t.start = i(t.elem, r),
                        t.end = i(t.end),
                        t.colorInit = !0),
                        n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
                    }
                })
            }
            ,
            i.hook(a),
            n.cssHooks.borderColor = {
                expand: function(n) {
                    var t = {};
                    return r(["Top", "Right", "Bottom", "Left"], function(i, r) {
                        t["border" + r + "Color"] = n
                    }),
                    t
                }
            },
            f = n.Color.names = {
                aqua: "#00ffff",
                black: "#000000",
                blue: "#0000ff",
                fuchsia: "#ff00ff",
                gray: "#808080",
                green: "#008000",
                lime: "#00ff00",
                maroon: "#800000",
                navy: "#000080",
                olive: "#808000",
                purple: "#800080",
                red: "#ff0000",
                silver: "#c0c0c0",
                teal: "#008080",
                white: "#ffffff",
                yellow: "#ffff00",
                transparent: [null, null, null, 0],
                _default: "#ffffff"
            }
        }(c),
        function() {
            function t(t) {
                var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, f = {};
                if (i && i.length && i[0] && i[i[0]])
                    for (u = i.length; u--; )
                        r = i[u],
                        typeof i[r] == "string" && (f[n.camelCase(r)] = i[r]);
                else
                    for (r in i)
                        typeof i[r] == "string" && (f[r] = i[r]);
                return f
            }
            function u(t, i) {
                var e = {}, u, f;
                for (u in i)
                    f = i[u],
                    t[u] !== f && (r[u] || (n.fx.step[u] || !isNaN(parseFloat(f))) && (e[u] = f));
                return e
            }
            var i = ["add", "remove", "toggle"]
              , r = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
            n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                n.fx.step[i] = function(n) {
                    (n.end === "none" || n.setAttr) && (n.pos !== 1 || n.setAttr) || (c.style(n.elem, i, n.end),
                    n.setAttr = !0)
                }
            }),
            n.fn.addBack || (n.fn.addBack = function(n) {
                return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
            }
            ),
            n.effects.animateClass = function(r, f, e, o) {
                var s = n.speed(f, e, o);
                return this.queue(function() {
                    var e = n(this), h = e.attr("class") || "", o, f = s.children ? e.find("*").addBack() : e;
                    f = f.map(function() {
                        var i = n(this);
                        return {
                            el: i,
                            start: t(this)
                        }
                    }),
                    o = function() {
                        n.each(i, function(n, t) {
                            r[t] && e[t + "Class"](r[t])
                        })
                    }
                    ,
                    o(),
                    f = f.map(function() {
                        return this.end = t(this.el[0]),
                        this.diff = u(this.start, this.end),
                        this
                    }),
                    e.attr("class", h),
                    f = f.map(function() {
                        var i = this
                          , t = n.Deferred()
                          , r = n.extend({}, s, {
                            queue: !1,
                            complete: function() {
                                t.resolve(i)
                            }
                        });
                        return this.el.animate(this.diff, r),
                        t.promise()
                    }),
                    n.when.apply(n, f.get()).done(function() {
                        o(),
                        n.each(arguments, function() {
                            var t = this.el;
                            n.each(this.diff, function(n) {
                                t.css(n, "")
                            })
                        }),
                        s.complete.call(e[0])
                    })
                })
            }
            ,
            n.fn.extend({
                addClass: function(t) {
                    return function(i, r, u, f) {
                        return r ? n.effects.animateClass.call(this, {
                            add: i
                        }, r, u, f) : t.apply(this, arguments)
                    }
                }(n.fn.addClass),
                removeClass: function(t) {
                    return function(i, r, u, f) {
                        return arguments.length > 1 ? n.effects.animateClass.call(this, {
                            remove: i
                        }, r, u, f) : t.apply(this, arguments)
                    }
                }(n.fn.removeClass),
                toggleClass: function(t) {
                    return function(i, r, u, f, e) {
                        return typeof r == "boolean" || r === undefined ? u ? n.effects.animateClass.call(this, r ? {
                            add: i
                        } : {
                            remove: i
                        }, u, f, e) : t.apply(this, arguments) : n.effects.animateClass.call(this, {
                            toggle: i
                        }, r, u, f)
                    }
                }(n.fn.toggleClass),
                switchClass: function(t, i, r, u, f) {
                    return n.effects.animateClass.call(this, {
                        add: i,
                        remove: t
                    }, r, u, f)
                }
            })
        }(),
        function() {
            function t(t, i, r, u) {
                return n.isPlainObject(t) && (i = t,
                t = t.effect),
                t = {
                    effect: t
                },
                i == null && (i = {}),
                n.isFunction(i) && (u = i,
                r = null,
                i = {}),
                (typeof i == "number" || n.fx.speeds[i]) && (u = r,
                r = i,
                i = {}),
                n.isFunction(r) && (u = r,
                r = null),
                i && n.extend(t, i),
                r = r || i.duration,
                t.duration = n.fx.off ? 0 : typeof r == "number" ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default,
                t.complete = u || i.complete,
                t
            }
            function i(t) {
                return !t || typeof t == "number" || n.fx.speeds[t] ? !0 : typeof t == "string" && !n.effects.effect[t] ? !0 : n.isFunction(t) ? !0 : typeof t == "object" && !t.effect ? !0 : !1
            }
            function u(n, t) {
                var r = t.outerWidth()
                  , u = t.outerHeight()
                  , f = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/
                  , i = f.exec(n) || ["", 0, r, u, 0];
                return {
                    top: parseFloat(i[1]) || 0,
                    right: i[2] === "auto" ? r : parseFloat(i[2]),
                    bottom: i[3] === "auto" ? u : parseFloat(i[3]),
                    left: parseFloat(i[4]) || 0
                }
            }
            n.expr && n.expr.filters && n.expr.filters.animated && (n.expr.filters.animated = function(t) {
                return function(i) {
                    return !!n(i).data(s) || t(i)
                }
            }(n.expr.filters.animated)),
            n.uiBackCompat !== !1 && n.extend(n.effects, {
                save: function(n, t) {
                    for (var i = 0, u = t.length; i < u; i++)
                        t[i] !== null && n.data(r + t[i], n[0].style[t[i]])
                },
                restore: function(n, t) {
                    for (var u, i = 0, f = t.length; i < f; i++)
                        t[i] !== null && (u = n.data(r + t[i]),
                        n.css(t[i], u))
                },
                setMode: function(n, t) {
                    return t === "toggle" && (t = n.is(":hidden") ? "show" : "hide"),
                    t
                },
                createWrapper: function(t) {
                    if (t.parent().is(".ui-effects-wrapper"))
                        return t.parent();
                    var i = {
                        width: t.outerWidth(!0),
                        height: t.outerHeight(!0),
                        float: t.css("float")
                    }
                      , u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    })
                      , f = {
                        width: t.width(),
                        height: t.height()
                    }
                      , r = document.activeElement;
                    try {
                        r.id
                    } catch (e) {
                        r = document.body
                    }
                    return t.wrap(u),
                    (t[0] === r || n.contains(t[0], r)) && n(r).trigger("focus"),
                    u = t.parent(),
                    t.css("position") === "static" ? (u.css({
                        position: "relative"
                    }),
                    t.css({
                        position: "relative"
                    })) : (n.extend(i, {
                        position: t.css("position"),
                        zIndex: t.css("z-index")
                    }),
                    n.each(["top", "left", "bottom", "right"], function(n, r) {
                        i[r] = t.css(r),
                        isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
                    }),
                    t.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })),
                    t.css(f),
                    u.css(i).show()
                },
                removeWrapper: function(t) {
                    var i = document.activeElement;
                    return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                    (t[0] === i || n.contains(t[0], i)) && n(i).trigger("focus")),
                    t
                }
            }),
            n.extend(n.effects, {
                version: "1.12.1",
                define: function(t, i, r) {
                    return r || (r = i,
                    i = "effect"),
                    n.effects.effect[t] = r,
                    n.effects.effect[t].mode = i,
                    r
                },
                scaledDimensions: function(n, t, i) {
                    if (t === 0)
                        return {
                            height: 0,
                            width: 0,
                            outerHeight: 0,
                            outerWidth: 0
                        };
                    var r = i !== "horizontal" ? (t || 100) / 100 : 1
                      , u = i !== "vertical" ? (t || 100) / 100 : 1;
                    return {
                        height: n.height() * u,
                        width: n.width() * r,
                        outerHeight: n.outerHeight() * u,
                        outerWidth: n.outerWidth() * r
                    }
                },
                clipToBox: function(n) {
                    return {
                        width: n.clip.right - n.clip.left,
                        height: n.clip.bottom - n.clip.top,
                        left: n.clip.left,
                        top: n.clip.top
                    }
                },
                unshift: function(n, t, i) {
                    var r = n.queue();
                    t > 1 && r.splice.apply(r, [1, 0].concat(r.splice(t, i))),
                    n.dequeue()
                },
                saveStyle: function(n) {
                    n.data(o, n[0].style.cssText)
                },
                restoreStyle: function(n) {
                    n[0].style.cssText = n.data(o) || "",
                    n.removeData(o)
                },
                mode: function(n, t) {
                    var i = n.is(":hidden");
                    return t === "toggle" && (t = i ? "show" : "hide"),
                    (i ? t === "hide" : t === "show") && (t = "none"),
                    t
                },
                getBaseline: function(n, t) {
                    var i, r;
                    switch (n[0]) {
                    case "top":
                        i = 0;
                        break;
                    case "middle":
                        i = .5;
                        break;
                    case "bottom":
                        i = 1;
                        break;
                    default:
                        i = n[0] / t.height
                    }
                    switch (n[1]) {
                    case "left":
                        r = 0;
                        break;
                    case "center":
                        r = .5;
                        break;
                    case "right":
                        r = 1;
                        break;
                    default:
                        r = n[1] / t.width
                    }
                    return {
                        x: r,
                        y: i
                    }
                },
                createPlaceholder: function(t) {
                    var i, u = t.css("position"), f = t.position();
                    return t.css({
                        marginTop: t.css("marginTop"),
                        marginBottom: t.css("marginBottom"),
                        marginLeft: t.css("marginLeft"),
                        marginRight: t.css("marginRight")
                    }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),
                    /^(static|relative)/.test(u) && (u = "absolute",
                    i = n("<" + t[0].nodeName + ">").insertAfter(t).css({
                        display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
                        visibility: "hidden",
                        marginTop: t.css("marginTop"),
                        marginBottom: t.css("marginBottom"),
                        marginLeft: t.css("marginLeft"),
                        marginRight: t.css("marginRight"),
                        float: t.css("float")
                    }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),
                    t.data(r + "placeholder", i)),
                    t.css({
                        position: u,
                        left: f.left,
                        top: f.top
                    }),
                    i
                },
                removePlaceholder: function(n) {
                    var t = r + "placeholder"
                      , i = n.data(t);
                    i && (i.remove(),
                    n.removeData(t))
                },
                cleanUp: function(t) {
                    n.effects.restoreStyle(t),
                    n.effects.removePlaceholder(t)
                },
                setTransition: function(t, i, r, u) {
                    return u = u || {},
                    n.each(i, function(n, i) {
                        var f = t.cssUnit(i);
                        f[0] > 0 && (u[i] = f[0] * r + f[1])
                    }),
                    u
                }
            }),
            n.fn.extend({
                effect: function() {
                    function a(t) {
                        function l() {
                            o.removeData(s),
                            n.effects.cleanUp(o),
                            i.mode === "hide" && o.hide(),
                            h()
                        }
                        function h() {
                            n.isFunction(f) && f.call(o[0]),
                            n.isFunction(t) && t()
                        }
                        var o = n(this);
                        i.mode = c.shift(),
                        n.uiBackCompat === !1 || u ? i.mode === "none" ? (o[r](),
                        h()) : e.call(o[0], i, l) : (o.is(":hidden") ? r === "hide" : r === "show") ? (o[r](),
                        h()) : e.call(o[0], i, h)
                    }
                    var i = t.apply(this, arguments)
                      , e = n.effects.effect[i.effect]
                      , u = e.mode
                      , o = i.queue
                      , h = o || "fx"
                      , f = i.complete
                      , r = i.mode
                      , c = []
                      , l = function(t) {
                        var f = n(this)
                          , i = n.effects.mode(f, r) || u;
                        f.data(s, !0),
                        c.push(i),
                        u && (i === "show" || i === u && i === "hide") && f.show(),
                        u && i === "none" || n.effects.saveStyle(f),
                        n.isFunction(t) && t()
                    };
                    return n.fx.off || !e ? r ? this[r](i.duration, f) : this.each(function() {
                        f && f.call(this)
                    }) : o === !1 ? this.each(l).each(a) : this.queue(h, l).queue(h, a)
                },
                show: function(n) {
                    return function(r) {
                        if (i(r))
                            return n.apply(this, arguments);
                        var u = t.apply(this, arguments);
                        return u.mode = "show",
                        this.effect.call(this, u)
                    }
                }(n.fn.show),
                hide: function(n) {
                    return function(r) {
                        if (i(r))
                            return n.apply(this, arguments);
                        var u = t.apply(this, arguments);
                        return u.mode = "hide",
                        this.effect.call(this, u)
                    }
                }(n.fn.hide),
                toggle: function(n) {
                    return function(r) {
                        if (i(r) || typeof r == "boolean")
                            return n.apply(this, arguments);
                        var u = t.apply(this, arguments);
                        return u.mode = "toggle",
                        this.effect.call(this, u)
                    }
                }(n.fn.toggle),
                cssUnit: function(t) {
                    var i = this.css(t)
                      , r = [];
                    return n.each(["em", "px", "%", "pt"], function(n, t) {
                        i.indexOf(t) > 0 && (r = [parseFloat(i), t])
                    }),
                    r
                },
                cssClip: function(n) {
                    return n ? this.css("clip", "rect(" + n.top + "px " + n.right + "px " + n.bottom + "px " + n.left + "px)") : u(this.css("clip"), this)
                },
                transfer: function(t, i) {
                    var u = n(this)
                      , r = n(t.to)
                      , f = r.css("position") === "fixed"
                      , e = n("body")
                      , o = f ? e.scrollTop() : 0
                      , s = f ? e.scrollLeft() : 0
                      , h = r.offset()
                      , l = {
                        top: h.top - o,
                        left: h.left - s,
                        height: r.innerHeight(),
                        width: r.innerWidth()
                    }
                      , c = u.offset()
                      , a = n("<div class='ui-effects-transfer'><\/div>").appendTo("body").addClass(t.className).css({
                        top: c.top - o,
                        left: c.left - s,
                        height: u.innerHeight(),
                        width: u.innerWidth(),
                        position: f ? "fixed" : "absolute"
                    }).animate(l, t.duration, t.easing, function() {
                        a.remove(),
                        n.isFunction(i) && i()
                    })
                }
            }),
            n.fx.step.clip = function(t) {
                t.clipInit || (t.start = n(t.elem).cssClip(),
                typeof t.end == "string" && (t.end = u(t.end, t.elem)),
                t.clipInit = !0),
                n(t.elem).cssClip({
                    top: t.pos * (t.end.top - t.start.top) + t.start.top,
                    right: t.pos * (t.end.right - t.start.right) + t.start.right,
                    bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
                    left: t.pos * (t.end.left - t.start.left) + t.start.left
                })
            }
        }(),
        function() {
            var t = {};
            n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
                t[i] = function(t) {
                    return Math.pow(t, n + 2)
                }
            }),
            n.extend(t, {
                Sine: function(n) {
                    return 1 - Math.cos(n * Math.PI / 2)
                },
                Circ: function(n) {
                    return 1 - Math.sqrt(1 - n * n)
                },
                Elastic: function(n) {
                    return n === 0 || n === 1 ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin(((n - 1) * 80 - 7.5) * Math.PI / 15)
                },
                Back: function(n) {
                    return n * n * (3 * n - 2)
                },
                Bounce: function(n) {
                    for (var t, i = 4; n < ((t = Math.pow(2, --i)) - 1) / 11; )
                        ;
                    return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((t * 3 - 2) / 22 - n, 2)
                }
            }),
            n.each(t, function(t, i) {
                n.easing["easeIn" + t] = i,
                n.easing["easeOut" + t] = function(n) {
                    return 1 - i(1 - n)
                }
                ,
                n.easing["easeInOut" + t] = function(n) {
                    return n < .5 ? i(n * 2) / 2 : 1 - i(n * -2 + 2) / 2
                }
            })
        }();
        var l = n.effects
          , at = n.effects.define("blind", "hide", function(t, i) {
            var e = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            }
              , u = n(this)
              , o = t.direction || "up"
              , s = u.cssClip()
              , r = {
                clip: n.extend({}, s)
            }
              , f = n.effects.createPlaceholder(u);
            r.clip[e[o][0]] = r.clip[e[o][1]],
            t.mode === "show" && (u.cssClip(r.clip),
            f && f.css(n.effects.clipToBox(r)),
            r.clip = s),
            f && f.animate(n.effects.clipToBox(r), t.duration, t.easing),
            u.animate(r, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        })
          , vt = n.effects.define("bounce", function(t, i) {
            var e, o, a, u = n(this), p = t.mode, s = p === "hide", w = p === "show", h = t.direction || "up", r = t.distance, v = t.times || 5, b = v * 2 + (w || s ? 1 : 0), c = t.duration / b, l = t.easing, f = h === "up" || h === "down" ? "top" : "left", y = h === "up" || h === "left", k = 0, d = u.queue().length;
            for (n.effects.createPlaceholder(u),
            a = u.css(f),
            r || (r = u[f === "top" ? "outerHeight" : "outerWidth"]() / 3),
            w && (o = {
                opacity: 1
            },
            o[f] = a,
            u.css("opacity", 0).css(f, y ? -r * 2 : r * 2).animate(o, c, l)),
            s && (r = r / Math.pow(2, v - 1)),
            o = {},
            o[f] = a; k < v; k++)
                e = {},
                e[f] = (y ? "-=" : "+=") + r,
                u.animate(e, c, l).animate(o, c, l),
                r = s ? r * 2 : r / 2;
            s && (e = {
                opacity: 0
            },
            e[f] = (y ? "-=" : "+=") + r,
            u.animate(e, c, l)),
            u.queue(i),
            n.effects.unshift(u, d, b + 1)
        })
          , yt = n.effects.define("clip", "hide", function(t, i) {
            var r, u = {}, f = n(this), e = t.direction || "vertical", o = e === "both", s = o || e === "horizontal", h = o || e === "vertical";
            r = f.cssClip(),
            u.clip = {
                top: h ? (r.bottom - r.top) / 2 : r.top,
                right: s ? (r.right - r.left) / 2 : r.right,
                bottom: h ? (r.bottom - r.top) / 2 : r.bottom,
                left: s ? (r.right - r.left) / 2 : r.left
            },
            n.effects.createPlaceholder(f),
            t.mode === "show" && (f.cssClip(u.clip),
            u.clip = r),
            f.animate(u, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        })
          , pt = n.effects.define("drop", "hide", function(t, i) {
            var e, u = n(this), h = t.mode, c = h === "show", f = t.direction || "left", o = f === "up" || f === "down" ? "top" : "left", s = f === "up" || f === "left" ? "-=" : "+=", l = s === "+=" ? "-=" : "+=", r = {
                opacity: 0
            };
            n.effects.createPlaceholder(u),
            e = t.distance || u[o === "top" ? "outerHeight" : "outerWidth"](!0) / 2,
            r[o] = s + e,
            c && (u.css(r),
            r[o] = l + e,
            r.opacity = 1),
            u.animate(r, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        })
          , wt = n.effects.define("explode", "hide", function(t, i) {
            function k() {
                p.push(this),
                p.length === e * c && d()
            }
            function d() {
                o.css({
                    visibility: "visible"
                }),
                n(p).remove(),
                i()
            }
            for (var r, l, a, v, y, e = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, c = e, o = n(this), b = t.mode, u = b === "show", w = o.show().css("visibility", "hidden").offset(), s = Math.ceil(o.outerWidth() / c), h = Math.ceil(o.outerHeight() / e), p = [], f = 0; f < e; f++)
                for (a = w.top + f * h,
                y = f - (e - 1) / 2,
                r = 0; r < c; r++)
                    l = w.left + r * s,
                    v = r - (c - 1) / 2,
                    o.clone().appendTo("body").wrap("<div><\/div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -r * s,
                        top: -f * h
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: s,
                        height: h,
                        left: l + (u ? v * s : 0),
                        top: a + (u ? y * h : 0),
                        opacity: u ? 0 : 1
                    }).animate({
                        left: l + (u ? 0 : v * s),
                        top: a + (u ? 0 : y * h),
                        opacity: u ? 1 : 0
                    }, t.duration || 500, t.easing, k)
        })
          , bt = n.effects.define("fade", "toggle", function(t, i) {
            var r = t.mode === "show";
            n(this).css("opacity", r ? 0 : 1).animate({
                opacity: r ? 1 : 0
            }, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        })
          , kt = n.effects.define("fold", "hide", function(t, i) {
            var u = n(this)
              , l = t.mode
              , v = l === "show"
              , y = l === "hide"
              , o = t.size || 15
              , a = /([0-9]+)%/.exec(o)
              , p = !!t.horizFirst
              , f = p ? ["right", "bottom"] : ["bottom", "right"]
              , s = t.duration / 2
              , h = n.effects.createPlaceholder(u)
              , e = u.cssClip()
              , c = {
                clip: n.extend({}, e)
            }
              , r = {
                clip: n.extend({}, e)
            }
              , w = [e[f[0]], e[f[1]]]
              , b = u.queue().length;
            a && (o = parseInt(a[1], 10) / 100 * w[y ? 0 : 1]),
            c.clip[f[0]] = o,
            r.clip[f[0]] = o,
            r.clip[f[1]] = 0,
            v && (u.cssClip(r.clip),
            h && h.css(n.effects.clipToBox(r)),
            r.clip = e),
            u.queue(function(i) {
                h && h.animate(n.effects.clipToBox(c), s, t.easing).animate(n.effects.clipToBox(r), s, t.easing),
                i()
            }).animate(c, s, t.easing).animate(r, s, t.easing).queue(i),
            n.effects.unshift(u, b, 4)
        })
          , dt = n.effects.define("highlight", "show", function(t, i) {
            var r = n(this)
              , u = {
                backgroundColor: r.css("backgroundColor")
            };
            t.mode === "hide" && (u.opacity = 0),
            n.effects.saveStyle(r),
            r.css({
                backgroundImage: "none",
                backgroundColor: t.color || "#ffff99"
            }).animate(u, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        })
          , gt = n.effects.define("size", function(t, i) {
            var l, r, p, u = n(this), v = ["fontSize"], s = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], w = t.mode, y = w !== "effect", c = t.scale || "both", b = t.origin || ["middle", "center"], k = u.css("position"), a = u.position(), o = n.effects.scaledDimensions(u), f = t.from || o, e = t.to || n.effects.scaledDimensions(u, 0);
            n.effects.createPlaceholder(u),
            w === "show" && (p = f,
            f = e,
            e = p),
            r = {
                from: {
                    y: f.height / o.height,
                    x: f.width / o.width
                },
                to: {
                    y: e.height / o.height,
                    x: e.width / o.width
                }
            },
            (c === "box" || c === "both") && (r.from.y !== r.to.y && (f = n.effects.setTransition(u, s, r.from.y, f),
            e = n.effects.setTransition(u, s, r.to.y, e)),
            r.from.x !== r.to.x && (f = n.effects.setTransition(u, h, r.from.x, f),
            e = n.effects.setTransition(u, h, r.to.x, e))),
            (c === "content" || c === "both") && r.from.y !== r.to.y && (f = n.effects.setTransition(u, v, r.from.y, f),
            e = n.effects.setTransition(u, v, r.to.y, e)),
            b && (l = n.effects.getBaseline(b, o),
            f.top = (o.outerHeight - f.outerHeight) * l.y + a.top,
            f.left = (o.outerWidth - f.outerWidth) * l.x + a.left,
            e.top = (o.outerHeight - e.outerHeight) * l.y + a.top,
            e.left = (o.outerWidth - e.outerWidth) * l.x + a.left),
            u.css(f),
            (c === "content" || c === "both") && (s = s.concat(["marginTop", "marginBottom"]).concat(v),
            h = h.concat(["marginLeft", "marginRight"]),
            u.find("*[width]").each(function() {
                var i = n(this)
                  , u = n.effects.scaledDimensions(i)
                  , f = {
                    height: u.height * r.from.y,
                    width: u.width * r.from.x,
                    outerHeight: u.outerHeight * r.from.y,
                    outerWidth: u.outerWidth * r.from.x
                }
                  , e = {
                    height: u.height * r.to.y,
                    width: u.width * r.to.x,
                    outerHeight: u.height * r.to.y,
                    outerWidth: u.width * r.to.x
                };
                r.from.y !== r.to.y && (f = n.effects.setTransition(i, s, r.from.y, f),
                e = n.effects.setTransition(i, s, r.to.y, e)),
                r.from.x !== r.to.x && (f = n.effects.setTransition(i, h, r.from.x, f),
                e = n.effects.setTransition(i, h, r.to.x, e)),
                y && n.effects.saveStyle(i),
                i.css(f),
                i.animate(e, t.duration, t.easing, function() {
                    y && n.effects.restoreStyle(i)
                })
            })),
            u.animate(e, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: function() {
                    var t = u.offset();
                    e.opacity === 0 && u.css("opacity", f.opacity),
                    y || (u.css("position", k === "static" ? "relative" : k).offset(t),
                    n.effects.saveStyle(u)),
                    i()
                }
            })
        })
          , ni = n.effects.define("scale", function(t, i) {
            var u = n(this)
              , f = t.mode
              , e = parseInt(t.percent, 10) || (parseInt(t.percent, 10) === 0 ? 0 : f !== "effect" ? 0 : 100)
              , r = n.extend(!0, {
                from: n.effects.scaledDimensions(u),
                to: n.effects.scaledDimensions(u, e, t.direction || "both"),
                origin: t.origin || ["middle", "center"]
            }, t);
            t.fade && (r.from.opacity = 1,
            r.to.opacity = 0),
            n.effects.effect.size.call(this, r, i)
        })
          , ti = n.effects.define("puff", "hide", function(t, i) {
            var r = n.extend(!0, {}, t, {
                fade: !0,
                percent: parseInt(t.percent, 10) || 150
            });
            n.effects.effect.scale.call(this, r, i)
        })
          , ii = n.effects.define("pulsate", "show", function(t, i) {
            var r = n(this)
              , e = t.mode
              , o = e === "show"
              , c = e === "hide"
              , l = o || c
              , f = (t.times || 5) * 2 + (l ? 1 : 0)
              , s = t.duration / f
              , u = 0
              , h = 1
              , a = r.queue().length;
            for ((o || !r.is(":visible")) && (r.css("opacity", 0).show(),
            u = 1); h < f; h++)
                r.animate({
                    opacity: u
                }, s, t.easing),
                u = 1 - u;
            r.animate({
                opacity: u
            }, s, t.easing),
            r.queue(i),
            n.effects.unshift(r, a, f + 1)
        })
          , ri = n.effects.define("shake", function(t, i) {
            var l = 1
              , r = n(this)
              , f = t.direction || "left"
              , e = t.distance || 20
              , a = t.times || 3
              , v = a * 2 + 1
              , u = Math.round(t.duration / v)
              , o = f === "up" || f === "down" ? "top" : "left"
              , s = f === "up" || f === "left"
              , h = {}
              , c = {}
              , y = {}
              , p = r.queue().length;
            for (n.effects.createPlaceholder(r),
            h[o] = (s ? "-=" : "+=") + e,
            c[o] = (s ? "+=" : "-=") + e * 2,
            y[o] = (s ? "-=" : "+=") + e * 2,
            r.animate(h, u, t.easing); l < a; l++)
                r.animate(c, u, t.easing).animate(y, u, t.easing);
            r.animate(c, u, t.easing).animate(h, u / 2, t.easing).queue(i),
            n.effects.unshift(r, p, v + 1)
        })
          , ui = n.effects.define("slide", "show", function(t, i) {
            var s, o, u = n(this), h = {
                up: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                right: ["left", "right"]
            }, c = t.mode, f = t.direction || "left", e = f === "up" || f === "down" ? "top" : "left", l = f === "up" || f === "left", a = t.distance || u[e === "top" ? "outerHeight" : "outerWidth"](!0), r = {};
            n.effects.createPlaceholder(u),
            s = u.cssClip(),
            o = u.position()[e],
            r[e] = (l ? -1 : 1) * a + o,
            r.clip = u.cssClip(),
            r.clip[h[f][1]] = r.clip[h[f][0]],
            c === "show" && (u.cssClip(r.clip),
            u.css(e, r[e]),
            r.clip = s,
            r[e] = o),
            u.animate(r, {
                queue: !1,
                duration: t.duration,
                easing: t.easing,
                complete: i
            })
        });
        n.uiBackCompat !== !1 && (l = n.effects.define("transfer", function(t, i) {
            n(this).transfer(t, i)
        })),
        b = l,
        n.ui.focusable = function(t, i) {
            var u, f, e, r, o, s = t.nodeName.toLowerCase();
            return "area" === s ? (u = t.parentNode,
            f = u.name,
            !t.href || !f || u.nodeName.toLowerCase() !== "map") ? !1 : (e = n("img[usemap='#" + f + "']"),
            e.length > 0 && e.is(":visible")) : (/^(input|select|textarea|button|object)$/.test(s) ? (r = !t.disabled,
            r && (o = n(t).closest("fieldset")[0],
            o && (r = !o.disabled))) : r = "a" === s ? t.href || i : i,
            r && n(t).is(":visible") && k(n(t)))
        }
        ,
        n.extend(n.expr[":"], {
            focusable: function(t) {
                return n.ui.focusable(t, n.attr(t, "tabindex") != null)
            }
        });
        var fi = n.ui.focusable
          , ei = n.fn.form = function() {
            return typeof this[0].form == "string" ? this.closest("form") : n(this[0].form)
        }
          , oi = n.ui.formResetMixin = {
            _formResetHandler: function() {
                var t = n(this);
                setTimeout(function() {
                    var i = t.data("ui-form-reset-instances");
                    n.each(i, function() {
                        this.refresh()
                    })
                })
            },
            _bindFormResetHandler: function() {
                if (this.form = this.element.form(),
                this.form.length) {
                    var n = this.form.data("ui-form-reset-instances") || [];
                    if (!n.length)
                        this.form.on("reset.ui-form-reset", this._formResetHandler);
                    n.push(this),
                    this.form.data("ui-form-reset-instances", n)
                }
            },
            _unbindFormResetHandler: function() {
                if (this.form.length) {
                    var t = this.form.data("ui-form-reset-instances");
                    t.splice(n.inArray(this, t), 1),
                    t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
                }
            }
        };
        n.fn.jquery.substring(0, 3) === "1.7" && (n.each(["Width", "Height"], function(t, i) {
            function f(t, i, r, u) {
                return n.each(e, function() {
                    i -= parseFloat(n.css(t, "padding" + this)) || 0,
                    r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0),
                    u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
                }),
                i
            }
            var e = i === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
              , r = i.toLowerCase()
              , u = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
            n.fn["inner" + i] = function(t) {
                return t === undefined ? u["inner" + i].call(this) : this.each(function() {
                    n(this).css(r, f(this, t) + "px")
                })
            }
            ,
            n.fn["outer" + i] = function(t, e) {
                return typeof t != "number" ? u["outer" + i].call(this, t) : this.each(function() {
                    n(this).css(r, f(this, t, !0, e) + "px")
                })
            }
        }),
        n.fn.addBack = function(n) {
            return this.add(n == null ? this.prevObject : this.prevObject.filter(n))
        }
        );
        var si = n.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
          , hi = n.ui.escapeSelector = function() {
            var n = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
            return function(t) {
                return t.replace(n, "\\$1")
            }
        }()
          , ci = n.fn.labels = function() {
            var t, r, u, i, f;
            return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (i = this.eq(0).parents("label"),
            u = this.attr("id"),
            u && (t = this.eq(0).parents().last(),
            f = t.add(t.length ? t.siblings() : this.siblings()),
            r = "label[for='" + n.ui.escapeSelector(u) + "']",
            i = i.add(f.find(r).addBack(r))),
            this.pushStack(i))
        }
          , li = n.fn.scrollParent = function(t) {
            var i = this.css("position")
              , u = i === "absolute"
              , f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/
              , r = this.parents().filter(function() {
                var t = n(this);
                return u && t.css("position") === "static" ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
            }).eq(0);
            return i === "fixed" || !r.length ? n(this[0].ownerDocument || document) : r
        }
          , ai = n.extend(n.expr[":"], {
            tabbable: function(t) {
                var i = n.attr(t, "tabindex")
                  , r = i != null;
                return (!r || i >= 0) && n.ui.focusable(t, r)
            }
        })
          , vi = n.fn.extend({
            uniqueId: function() {
                var n = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++n)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
                })
            }
        })
          , yi = n.widget("ui.accordion", {
            version: "1.12.1",
            options: {
                active: 0,
                animate: {},
                classes: {
                    "ui-accordion-header": "ui-corner-top",
                    "ui-accordion-header-collapsed": "ui-corner-all",
                    "ui-accordion-content": "ui-corner-bottom"
                },
                collapsible: !1,
                event: "click",
                header: "> li > :first-child, > :not(li):even",
                heightStyle: "auto",
                icons: {
                    activeHeader: "ui-icon-triangle-1-s",
                    header: "ui-icon-triangle-1-e"
                },
                activate: null,
                beforeActivate: null
            },
            hideProps: {
                borderTopWidth: "hide",
                borderBottomWidth: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                height: "hide"
            },
            showProps: {
                borderTopWidth: "show",
                borderBottomWidth: "show",
                paddingTop: "show",
                paddingBottom: "show",
                height: "show"
            },
            _create: function() {
                var t = this.options;
                this.prevShow = this.prevHide = n(),
                this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
                this.element.attr("role", "tablist"),
                t.collapsible || t.active !== !1 && t.active != null || (t.active = 0),
                this._processPanels(),
                t.active < 0 && (t.active += this.headers.length),
                this._refresh()
            },
            _getCreateEventData: function() {
                return {
                    header: this.active,
                    panel: this.active.length ? this.active.next() : n()
                }
            },
            _createIcons: function() {
                var i, r, t = this.options.icons;
                t && (i = n("<span>"),
                this._addClass(i, "ui-accordion-header-icon", "ui-icon " + t.header),
                i.prependTo(this.headers),
                r = this.active.children(".ui-accordion-header-icon"),
                this._removeClass(r, t.header)._addClass(r, null, t.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
            },
            _destroyIcons: function() {
                this._removeClass(this.headers, "ui-accordion-icons"),
                this.headers.children(".ui-accordion-header-icon").remove()
            },
            _destroy: function() {
                var n;
                this.element.removeAttr("role"),
                this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),
                this._destroyIcons(),
                n = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),
                this.options.heightStyle !== "content" && n.css("height", "")
            },
            _setOption: function(n, t) {
                if (n === "active") {
                    this._activate(t);
                    return
                }
                n === "event" && (this.options.event && this._off(this.headers, this.options.event),
                this._setupEvents(t)),
                this._super(n, t),
                n !== "collapsible" || t || this.options.active !== !1 || this._activate(0),
                n === "icons" && (this._destroyIcons(),
                t && this._createIcons())
            },
            _setOptionDisabled: function(n) {
                this._super(n),
                this.element.attr("aria-disabled", n),
                this._toggleClass(null, "ui-state-disabled", !!n),
                this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!n)
            },
            _keydown: function(t) {
                if (!t.altKey && !t.ctrlKey) {
                    var i = n.ui.keyCode
                      , u = this.headers.length
                      , f = this.headers.index(t.target)
                      , r = !1;
                    switch (t.keyCode) {
                    case i.RIGHT:
                    case i.DOWN:
                        r = this.headers[(f + 1) % u];
                        break;
                    case i.LEFT:
                    case i.UP:
                        r = this.headers[(f - 1 + u) % u];
                        break;
                    case i.SPACE:
                    case i.ENTER:
                        this._eventHandler(t);
                        break;
                    case i.HOME:
                        r = this.headers[0];
                        break;
                    case i.END:
                        r = this.headers[u - 1]
                    }
                    r && (n(t.target).attr("tabIndex", -1),
                    n(r).attr("tabIndex", 0),
                    n(r).trigger("focus"),
                    t.preventDefault())
                }
            },
            _panelKeyDown: function(t) {
                t.keyCode === n.ui.keyCode.UP && t.ctrlKey && n(t.currentTarget).prev().trigger("focus")
            },
            refresh: function() {
                var t = this.options;
                this._processPanels(),
                (t.active !== !1 || t.collapsible !== !0) && this.headers.length ? t.active === !1 ? this._activate(0) : this.active.length && !n.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1,
                this.active = n()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active) : (t.active = !1,
                this.active = n()),
                this._destroyIcons(),
                this._refresh()
            },
            _processPanels: function() {
                var t = this.headers
                  , n = this.panels;
                this.headers = this.element.find(this.options.header),
                this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"),
                this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),
                this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"),
                n && (this._off(t.not(this.headers)),
                this._off(n.not(this.panels)))
            },
            _refresh: function() {
                var t, i = this.options, r = i.heightStyle, u = this.element.parent();
                this.active = this._findActive(i.active),
                this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"),
                this._addClass(this.active.next(), "ui-accordion-content-active"),
                this.active.next().show(),
                this.headers.attr("role", "tab").each(function() {
                    var t = n(this)
                      , r = t.uniqueId().attr("id")
                      , i = t.next()
                      , u = i.uniqueId().attr("id");
                    t.attr("aria-controls", u),
                    i.attr("aria-labelledby", r)
                }).next().attr("role", "tabpanel"),
                this.headers.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }).next().attr({
                    "aria-hidden": "true"
                }).hide(),
                this.active.length ? this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }).next().attr({
                    "aria-hidden": "false"
                }) : this.headers.eq(0).attr("tabIndex", 0),
                this._createIcons(),
                this._setupEvents(i.event),
                r === "fill" ? (t = u.height(),
                this.element.siblings(":visible").each(function() {
                    var i = n(this)
                      , r = i.css("position");
                    r !== "absolute" && r !== "fixed" && (t -= i.outerHeight(!0))
                }),
                this.headers.each(function() {
                    t -= n(this).outerHeight(!0)
                }),
                this.headers.next().each(function() {
                    n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
                }).css("overflow", "auto")) : r === "auto" && (t = 0,
                this.headers.next().each(function() {
                    var i = n(this).is(":visible");
                    i || n(this).show(),
                    t = Math.max(t, n(this).css("height", "").height()),
                    i || n(this).hide()
                }).height(t))
            },
            _activate: function(t) {
                var i = this._findActive(t)[0];
                i !== this.active[0] && (i = i || this.active[0],
                this._eventHandler({
                    target: i,
                    currentTarget: i,
                    preventDefault: n.noop
                }))
            },
            _findActive: function(t) {
                return typeof t == "number" ? this.headers.eq(t) : n()
            },
            _setupEvents: function(t) {
                var i = {
                    keydown: "_keydown"
                };
                t && n.each(t.split(" "), function(n, t) {
                    i[t] = "_eventHandler"
                }),
                this._off(this.headers.add(this.headers.next())),
                this._on(this.headers, i),
                this._on(this.headers.next(), {
                    keydown: "_panelKeyDown"
                }),
                this._hoverable(this.headers),
                this._focusable(this.headers)
            },
            _eventHandler: function(t) {
                var e, o, i = this.options, u = this.active, r = n(t.currentTarget), f = r[0] === u[0], s = f && i.collapsible, c = s ? n() : r.next(), l = u.next(), h = {
                    oldHeader: u,
                    oldPanel: l,
                    newHeader: s ? n() : r,
                    newPanel: c
                };
                (t.preventDefault(),
                (!f || i.collapsible) && this._trigger("beforeActivate", t, h) !== !1) && (i.active = s ? !1 : this.headers.index(r),
                this.active = f ? n() : r,
                this._toggle(h),
                this._removeClass(u, "ui-accordion-header-active", "ui-state-active"),
                i.icons && (e = u.children(".ui-accordion-header-icon"),
                this._removeClass(e, null, i.icons.activeHeader)._addClass(e, null, i.icons.header)),
                f || (this._removeClass(r, "ui-accordion-header-collapsed")._addClass(r, "ui-accordion-header-active", "ui-state-active"),
                i.icons && (o = r.children(".ui-accordion-header-icon"),
                this._removeClass(o, null, i.icons.header)._addClass(o, null, i.icons.activeHeader)),
                this._addClass(r.next(), "ui-accordion-content-active")))
            },
            _toggle: function(t) {
                var r = t.newPanel
                  , i = this.prevShow.length ? this.prevShow : t.oldPanel;
                this.prevShow.add(this.prevHide).stop(!0, !0),
                this.prevShow = r,
                this.prevHide = i,
                this.options.animate ? this._animate(r, i, t) : (i.hide(),
                r.show(),
                this._toggleComplete(t)),
                i.attr({
                    "aria-hidden": "true"
                }),
                i.prev().attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }),
                r.length && i.length ? i.prev().attr({
                    tabIndex: -1,
                    "aria-expanded": "false"
                }) : r.length && this.headers.filter(function() {
                    return parseInt(n(this).attr("tabIndex"), 10) === 0
                }).attr("tabIndex", -1),
                r.attr("aria-hidden", "false").prev().attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _animate: function(n, t, i) {
                var h, r, u, c = this, o = 0, l = n.css("box-sizing"), a = n.length && (!t.length || n.index() < t.index()), e = this.options.animate || {}, f = a && e.down || e, s = function() {
                    c._toggleComplete(i)
                };
                if (typeof f == "number" && (u = f),
                typeof f == "string" && (r = f),
                r = r || f.easing || e.easing,
                u = u || f.duration || e.duration,
                !t.length)
                    return n.animate(this.showProps, u, r, s);
                if (!n.length)
                    return t.animate(this.hideProps, u, r, s);
                h = n.show().outerHeight(),
                t.animate(this.hideProps, {
                    duration: u,
                    easing: r,
                    step: function(n, t) {
                        t.now = Math.round(n)
                    }
                }),
                n.hide().animate(this.showProps, {
                    duration: u,
                    easing: r,
                    complete: s,
                    step: function(n, i) {
                        i.now = Math.round(n),
                        i.prop !== "height" ? l === "content-box" && (o += i.now) : c.options.heightStyle !== "content" && (i.now = Math.round(h - t.outerHeight() - o),
                        o = 0)
                    }
                })
            },
            _toggleComplete: function(n) {
                var t = n.oldPanel
                  , i = t.prev();
                this._removeClass(t, "ui-accordion-content-active"),
                this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"),
                t.length && (t.parent()[0].className = t.parent()[0].className),
                this._trigger("activate", null, n)
            }
        })
          , pi = n.ui.safeActiveElement = function(n) {
            var t;
            try {
                t = n.activeElement
            } catch (i) {
                t = n.body
            }
            return t || (t = n.body),
            t.nodeName || (t = n.body),
            t
        }
          , wi = n.widget("ui.menu", {
            version: "1.12.1",
            defaultElement: "<ul>",
            delay: 300,
            options: {
                icons: {
                    submenu: "ui-icon-caret-1-e"
                },
                items: "> *",
                menus: "ul",
                position: {
                    my: "left top",
                    at: "right top"
                },
                role: "menu",
                blur: null,
                focus: null,
                select: null
            },
            _create: function() {
                this.activeMenu = this.element,
                this.mouseHandled = !1,
                this.element.uniqueId().attr({
                    role: this.options.role,
                    tabIndex: 0
                }),
                this._addClass("ui-menu", "ui-widget ui-widget-content"),
                this._on({
                    "mousedown .ui-menu-item": function(n) {
                        n.preventDefault()
                    },
                    "click .ui-menu-item": function(t) {
                        var i = n(t.target)
                          , r = n(n.ui.safeActiveElement(this.document[0]));
                        !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t),
                        t.isPropagationStopped() || (this.mouseHandled = !0),
                        i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && r.closest(".ui-menu").length && (this.element.trigger("focus", [!0]),
                        this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
                    },
                    "mouseenter .ui-menu-item": function(t) {
                        if (!this.previousFilter) {
                            var r = n(t.target).closest(".ui-menu-item")
                              , i = n(t.currentTarget);
                            r[0] === i[0] && (this._removeClass(i.siblings().children(".ui-state-active"), null, "ui-state-active"),
                            this.focus(t, i))
                        }
                    },
                    mouseleave: "collapseAll",
                    "mouseleave .ui-menu": "collapseAll",
                    focus: function(n, t) {
                        var i = this.active || this.element.find(this.options.items).eq(0);
                        t || this.focus(n, i)
                    },
                    blur: function(t) {
                        this._delay(function() {
                            var i = !n.contains(this.element[0], n.ui.safeActiveElement(this.document[0]));
                            i && this.collapseAll(t)
                        })
                    },
                    keydown: "_keydown"
                }),
                this.refresh(),
                this._on(this.document, {
                    click: function(n) {
                        this._closeOnDocumentClick(n) && this.collapseAll(n),
                        this.mouseHandled = !1
                    }
                })
            },
            _destroy: function() {
                var t = this.element.find(".ui-menu-item").removeAttr("role aria-disabled")
                  , i = t.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
                this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),
                i.children().each(function() {
                    var t = n(this);
                    t.data("ui-menu-submenu-caret") && t.remove()
                })
            },
            _keydown: function(t) {
                var i, u, r, f, e = !0;
                switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    e = !1,
                    u = this.previousFilter || "",
                    f = !1,
                    r = t.keyCode >= 96 && t.keyCode <= 105 ? (t.keyCode - 96).toString() : String.fromCharCode(t.keyCode),
                    clearTimeout(this.filterTimer),
                    r === u ? f = !0 : r = u + r,
                    i = this._filterMenuItems(r),
                    i = f && i.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : i,
                    i.length || (r = String.fromCharCode(t.keyCode),
                    i = this._filterMenuItems(r)),
                    i.length ? (this.focus(t, i),
                    this.previousFilter = r,
                    this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter
                }
                e && t.preventDefault()
            },
            _activate: function(n) {
                this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
            },
            refresh: function() {
                var u, t, f, i, e, r = this, s = this.options.icons.submenu, o = this.element.find(this.options.menus);
                this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length),
                f = o.filter(":not(.ui-menu)").hide().attr({
                    role: this.options.role,
                    "aria-hidden": "true",
                    "aria-expanded": "false"
                }).each(function() {
                    var t = n(this)
                      , i = t.prev()
                      , u = n("<span>").data("ui-menu-submenu-caret", !0);
                    r._addClass(u, "ui-menu-icon", "ui-icon " + s),
                    i.attr("aria-haspopup", "true").prepend(u),
                    t.attr("aria-labelledby", i.attr("id"))
                }),
                this._addClass(f, "ui-menu", "ui-widget ui-widget-content ui-front"),
                u = o.add(this.element),
                t = u.find(this.options.items),
                t.not(".ui-menu-item").each(function() {
                    var t = n(this);
                    r._isDivider(t) && r._addClass(t, "ui-menu-divider", "ui-widget-content")
                }),
                i = t.not(".ui-menu-item, .ui-menu-divider"),
                e = i.children().not(".ui-menu").uniqueId().attr({
                    tabIndex: -1,
                    role: this._itemRole()
                }),
                this._addClass(i, "ui-menu-item")._addClass(e, "ui-menu-item-wrapper"),
                t.filter(".ui-state-disabled").attr("aria-disabled", "true"),
                this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
            },
            _itemRole: function() {
                return {
                    menu: "menuitem",
                    listbox: "option"
                }[this.options.role]
            },
            _setOption: function(n, t) {
                if (n === "icons") {
                    var i = this.element.find(".ui-menu-icon");
                    this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, t.submenu)
                }
                this._super(n, t)
            },
            _setOptionDisabled: function(n) {
                this._super(n),
                this.element.attr("aria-disabled", String(n)),
                this._toggleClass(null, "ui-state-disabled", !!n)
            },
            focus: function(n, t) {
                var i, r, u;
                this.blur(n, n && n.type === "focus"),
                this._scrollIntoView(t),
                this.active = t.first(),
                r = this.active.children(".ui-menu-item-wrapper"),
                this._addClass(r, null, "ui-state-active"),
                this.options.role && this.element.attr("aria-activedescendant", r.attr("id")),
                u = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),
                this._addClass(u, null, "ui-state-active"),
                n && n.type === "keydown" ? this._close() : this.timer = this._delay(function() {
                    this._close()
                }, this.delay),
                i = t.children(".ui-menu"),
                i.length && n && /^mouse/.test(n.type) && this._startOpening(i),
                this.activeMenu = t.parent(),
                this._trigger("focus", n, {
                    item: t
                })
            },
            _scrollIntoView: function(t) {
                var e, o, i, r, u, f;
                this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0,
                o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0,
                i = t.offset().top - this.activeMenu.offset().top - e - o,
                r = this.activeMenu.scrollTop(),
                u = this.activeMenu.height(),
                f = t.outerHeight(),
                i < 0 ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
            },
            blur: function(n, t) {
                (t || clearTimeout(this.timer),
                this.active) && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"),
                this._trigger("blur", n, {
                    item: this.active
                }),
                this.active = null)
            },
            _startOpening: function(n) {
                (clearTimeout(this.timer),
                n.attr("aria-hidden") === "true") && (this.timer = this._delay(function() {
                    this._close(),
                    this._open(n)
                }, this.delay))
            },
            _open: function(t) {
                var i = n.extend({
                    of: this.active
                }, this.options.position);
                clearTimeout(this.timer),
                this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
                t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
            },
            collapseAll: function(t, i) {
                clearTimeout(this.timer),
                this.timer = this._delay(function() {
                    var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                    r.length || (r = this.element),
                    this._close(r),
                    this.blur(t),
                    this._removeClass(r.find(".ui-state-active"), null, "ui-state-active"),
                    this.activeMenu = r
                }, this.delay)
            },
            _close: function(n) {
                n || (n = this.active ? this.active.parent() : this.element),
                n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
            },
            _closeOnDocumentClick: function(t) {
                return !n(t.target).closest(".ui-menu").length
            },
            _isDivider: function(n) {
                return !/[^\-\u2014\u2013\s]/.test(n.text())
            },
            collapse: function(n) {
                var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                t && t.length && (this._close(),
                this.focus(n, t))
            },
            expand: function(n) {
                var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                t && t.length && (this._open(t.parent()),
                this._delay(function() {
                    this.focus(n, t)
                }))
            },
            next: function(n) {
                this._move("next", "first", n)
            },
            previous: function(n) {
                this._move("prev", "last", n)
            },
            isFirstItem: function() {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            isLastItem: function() {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            _move: function(n, t, i) {
                var r;
                this.active && (r = n === "first" || n === "last" ? this.active[n === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0)),
                r && r.length && this.active || (r = this.activeMenu.find(this.options.items)[t]()),
                this.focus(i, r)
            },
            nextPage: function(t) {
                var i, r, u;
                if (!this.active) {
                    this.next(t);
                    return
                }
                this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top,
                u = this.element.height(),
                this.active.nextAll(".ui-menu-item").each(function() {
                    return i = n(this),
                    i.offset().top - r - u < 0
                }),
                this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))
            },
            previousPage: function(t) {
                var i, r, u;
                if (!this.active) {
                    this.next(t);
                    return
                }
                this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top,
                u = this.element.height(),
                this.active.prevAll(".ui-menu-item").each(function() {
                    return i = n(this),
                    i.offset().top - r + u > 0
                }),
                this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first()))
            },
            _hasScroll: function() {
                return this.element.outerHeight() < this.element.prop("scrollHeight")
            },
            select: function(t) {
                this.active = this.active || n(t.target).closest(".ui-menu-item");
                var i = {
                    item: this.active
                };
                this.active.has(".ui-menu").length || this.collapseAll(t, !0),
                this._trigger("select", t, i)
            },
            _filterMenuItems: function(t) {
                var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
                  , r = new RegExp("^" + i,"i");
                return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                    return r.test(n.trim(n(this).children(".ui-menu-item-wrapper").text()))
                })
            }
        });
        n.widget("ui.autocomplete", {
            version: "1.12.1",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var t, i, r, u = this.element[0].nodeName.toLowerCase(), f = u === "textarea", e = u === "input";
                this.isMultiLine = f || !e && this._isContentEditable(this.element),
                this.valueMethod = this.element[f || e ? "val" : "text"],
                this.isNewMenu = !0,
                this._addClass("ui-autocomplete-input"),
                this.element.attr("autocomplete", "off"),
                this._on(this.element, {
                    keydown: function(u) {
                        if (this.element.prop("readOnly")) {
                            t = !0,
                            r = !0,
                            i = !0;
                            return
                        }
                        t = !1,
                        r = !1,
                        i = !1;
                        var f = n.ui.keyCode;
                        switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0,
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0,
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0,
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0,
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                            this.menu.active && (t = !0,
                            u.preventDefault(),
                            this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term),
                            this.close(u),
                            u.preventDefault());
                            break;
                        default:
                            i = !0,
                            this._searchTimeout(u)
                        }
                    },
                    keypress: function(r) {
                        if (t) {
                            t = !1,
                            (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault();
                            return
                        }
                        if (!i) {
                            var u = n.ui.keyCode;
                            switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                            }
                        }
                    },
                    input: function(n) {
                        if (r) {
                            r = !1,
                            n.preventDefault();
                            return
                        }
                        this._searchTimeout(n)
                    },
                    focus: function() {
                        this.selectedItem = null,
                        this.previous = this._value()
                    },
                    blur: function(n) {
                        if (this.cancelBlur) {
                            delete this.cancelBlur;
                            return
                        }
                        clearTimeout(this.searching),
                        this.close(n),
                        this._change(n)
                    }
                }),
                this._initSource(),
                this.menu = n("<ul>").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().menu("instance"),
                this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
                this._on(this.menu.element, {
                    mousedown: function(t) {
                        t.preventDefault(),
                        this.cancelBlur = !0,
                        this._delay(function() {
                            delete this.cancelBlur,
                            this.element[0] !== n.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
                        })
                    },
                    menufocus: function(t, i) {
                        var r, u;
                        if (this.isNewMenu && (this.isNewMenu = !1,
                        t.originalEvent && /^mouse/.test(t.originalEvent.type))) {
                            this.menu.blur();
                            this.document.one("mousemove", function() {
                                n(t.target).trigger(t.originalEvent)
                            });
                            return
                        }
                        u = i.item.data("ui-autocomplete-item"),
                        !1 !== this._trigger("focus", t, {
                            item: u
                        }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(u.value),
                        r = i.item.attr("aria-label") || u.value,
                        r && n.trim(r).length && (this.liveRegion.children().hide(),
                        n("<div>").text(r).appendTo(this.liveRegion))
                    },
                    menuselect: function(t, i) {
                        var r = i.item.data("ui-autocomplete-item")
                          , u = this.previous;
                        this.element[0] !== n.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"),
                        this.previous = u,
                        this._delay(function() {
                            this.previous = u,
                            this.selectedItem = r
                        })),
                        !1 !== this._trigger("select", t, {
                            item: r
                        }) && this._value(r.value),
                        this.term = this._value(),
                        this.close(t),
                        this.selectedItem = r
                    }
                }),
                this.liveRegion = n("<div>", {
                    role: "status",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body),
                this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching),
                this.element.removeAttr("autocomplete"),
                this.menu.element.remove(),
                this.liveRegion.remove()
            },
            _setOption: function(n, t) {
                this._super(n, t),
                n === "source" && this._initSource(),
                n === "appendTo" && this.menu.element.appendTo(this._appendTo()),
                n === "disabled" && t && this.xhr && this.xhr.abort()
            },
            _isEventTargetInWidget: function(t) {
                var i = this.menu.element[0];
                return t.target === this.element[0] || t.target === i || n.contains(i, t.target)
            },
            _closeOnClickOutside: function(n) {
                this._isEventTargetInWidget(n) || this.close()
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)),
                t && t[0] || (t = this.element.closest(".ui-front, dialog")),
                t.length || (t = this.document[0].body),
                t
            },
            _initSource: function() {
                var i, r, t = this;
                n.isArray(this.options.source) ? (i = this.options.source,
                this.source = function(t, r) {
                    r(n.ui.autocomplete.filter(i, t.term))
                }
                ) : typeof this.options.source == "string" ? (r = this.options.source,
                this.source = function(i, u) {
                    t.xhr && t.xhr.abort(),
                    t.xhr = n.ajax({
                        url: r,
                        data: i,
                        dataType: "json",
                        success: function(n) {
                            u(n)
                        },
                        error: function() {
                            u([])
                        }
                    })
                }
                ) : this.source = this.options.source
            },
            _searchTimeout: function(n) {
                clearTimeout(this.searching),
                this.searching = this._delay(function() {
                    var t = this.term === this._value()
                      , i = this.menu.element.is(":visible")
                      , r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
                    t && (!t || i || r) || (this.selectedItem = null,
                    this.search(null, n))
                }, this.options.delay)
            },
            search: function(n, t) {
                return (n = n != null ? n : this._value(),
                this.term = this._value(),
                n.length < this.options.minLength) ? this.close(t) : this._trigger("search", t) === !1 ? void 0 : this._search(n)
            },
            _search: function(n) {
                this.pending++,
                this._addClass("ui-autocomplete-loading"),
                this.cancelSearch = !1,
                this.source({
                    term: n
                }, this._response())
            },
            _response: function() {
                var t = ++this.requestIndex;
                return n.proxy(function(n) {
                    t === this.requestIndex && this.__response(n),
                    this.pending--,
                    this.pending || this._removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function(n) {
                n && (n = this._normalize(n)),
                this._trigger("response", null, {
                    content: n
                }),
                !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n),
                this._trigger("open")) : this._close()
            },
            close: function(n) {
                this.cancelSearch = !0,
                this._close(n)
            },
            _close: function(n) {
                this._off(this.document, "mousedown"),
                this.menu.element.is(":visible") && (this.menu.element.hide(),
                this.menu.blur(),
                this.isNewMenu = !0,
                this._trigger("close", n))
            },
            _change: function(n) {
                this.previous !== this._value() && this._trigger("change", n, {
                    item: this.selectedItem
                })
            },
            _normalize: function(t) {
                return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                    return typeof t == "string" ? {
                        label: t,
                        value: t
                    } : n.extend({}, t, {
                        label: t.label || t.value,
                        value: t.value || t.label
                    })
                })
            },
            _suggest: function(t) {
                var i = this.menu.element.empty();
                this._renderMenu(i, t),
                this.isNewMenu = !0,
                this.menu.refresh(),
                i.show(),
                this._resizeMenu(),
                i.position(n.extend({
                    of: this.element
                }, this.options.position)),
                this.options.autoFocus && this.menu.next(),
                this._on(this.document, {
                    mousedown: "_closeOnClickOutside"
                })
            },
            _resizeMenu: function() {
                var n = this.menu.element;
                n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(t, i) {
                var r = this;
                n.each(i, function(n, i) {
                    r._renderItemData(t, i)
                })
            },
            _renderItemData: function(n, t) {
                return this._renderItem(n, t).data("ui-autocomplete-item", t)
            },
            _renderItem: function(t, i) {
                return n("<li>").append(n("<div>").text(i.label)).appendTo(t)
            },
            _move: function(n, t) {
                if (!this.menu.element.is(":visible")) {
                    this.search(null, t);
                    return
                }
                if (this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n)) {
                    this.isMultiLine || this._value(this.term),
                    this.menu.blur();
                    return
                }
                this.menu[n](t)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(n, t) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t),
                t.preventDefault())
            },
            _isContentEditable: function(n) {
                if (!n.length)
                    return !1;
                var t = n.prop("contentEditable");
                return t === "inherit" ? this._isContentEditable(n.parent()) : t === "true"
            }
        }),
        n.extend(n.ui.autocomplete, {
            escapeRegex: function(n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(t, i) {
                var r = new RegExp(n.ui.autocomplete.escapeRegex(i),"i");
                return n.grep(t, function(n) {
                    return r.test(n.label || n.value || n)
                })
            }
        }),
        n.widget("ui.autocomplete", n.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(n) {
                        return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(t) {
                var i;
                (this._superApply(arguments),
                this.options.disabled || this.cancelSearch) || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults,
                this.liveRegion.children().hide(),
                n("<div>").text(i).appendTo(this.liveRegion))
            }
        });
        var bi = n.ui.autocomplete
          , d = /ui-corner-([a-z]){2,6}/g
          , ki = n.widget("ui.controlgroup", {
            version: "1.12.1",
            defaultElement: "<div>",
            options: {
                direction: "horizontal",
                disabled: null,
                onlyVisible: !0,
                items: {
                    button: "input[type=button], input[type=submit], input[type=reset], button, a",
                    controlgroupLabel: ".ui-controlgroup-label",
                    checkboxradio: "input[type='checkbox'], input[type='radio']",
                    selectmenu: "select",
                    spinner: ".ui-spinner-input"
                }
            },
            _create: function() {
                this._enhance()
            },
            _enhance: function() {
                this.element.attr("role", "toolbar"),
                this.refresh()
            },
            _destroy: function() {
                this._callChildMethod("destroy"),
                this.childWidgets.removeData("ui-controlgroup-data"),
                this.element.removeAttr("role"),
                this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
            },
            _initWidgets: function() {
                var t = this
                  , i = [];
                n.each(this.options.items, function(r, u) {
                    var f, e = {};
                    if (u) {
                        if (r === "controlgroupLabel") {
                            f = t.element.find(u),
                            f.each(function() {
                                var t = n(this);
                                t.children(".ui-controlgroup-label-contents").length || t.contents().wrapAll("<span class='ui-controlgroup-label-contents'><\/span>")
                            }),
                            t._addClass(f, null, "ui-widget ui-widget-content ui-state-default"),
                            i = i.concat(f.get());
                            return
                        }
                        n.fn[r] && (e = t["_" + r + "Options"] ? t["_" + r + "Options"]("middle") : {
                            classes: {}
                        },
                        t.element.find(u).each(function() {
                            var u = n(this), f = u[r]("instance"), o = n.widget.extend({}, e), s;
                            r === "button" && u.parent(".ui-spinner").length || (f || (f = u[r]()[r]("instance")),
                            f && (o.classes = t._resolveClassesValues(o.classes, f)),
                            u[r](o),
                            s = u[r]("widget"),
                            n.data(s[0], "ui-controlgroup-data", f ? f : u[r]("instance")),
                            i.push(s[0]))
                        }))
                    }
                }),
                this.childWidgets = n(n.unique(i)),
                this._addClass(this.childWidgets, "ui-controlgroup-item")
            },
            _callChildMethod: function(t) {
                this.childWidgets.each(function() {
                    var r = n(this)
                      , i = r.data("ui-controlgroup-data");
                    i && i[t] && i[t]()
                })
            },
            _updateCornerClass: function(n, t) {
                var i = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
                  , r = this._buildSimpleOptions(t, "label").classes.label;
                this._removeClass(n, null, i),
                this._addClass(n, null, r)
            },
            _buildSimpleOptions: function(n, t) {
                var i = this.options.direction === "vertical"
                  , r = {
                    classes: {}
                };
                return r.classes[t] = {
                    middle: "",
                    first: "ui-corner-" + (i ? "top" : "left"),
                    last: "ui-corner-" + (i ? "bottom" : "right"),
                    only: "ui-corner-all"
                }[n],
                r
            },
            _spinnerOptions: function(n) {
                var t = this._buildSimpleOptions(n, "ui-spinner");
                return t.classes["ui-spinner-up"] = "",
                t.classes["ui-spinner-down"] = "",
                t
            },
            _buttonOptions: function(n) {
                return this._buildSimpleOptions(n, "ui-button")
            },
            _checkboxradioOptions: function(n) {
                return this._buildSimpleOptions(n, "ui-checkboxradio-label")
            },
            _selectmenuOptions: function(n) {
                var t = this.options.direction === "vertical";
                return {
                    width: t ? "auto" : !1,
                    classes: {
                        middle: {
                            "ui-selectmenu-button-open": "",
                            "ui-selectmenu-button-closed": ""
                        },
                        first: {
                            "ui-selectmenu-button-open": "ui-corner-" + (t ? "top" : "tl"),
                            "ui-selectmenu-button-closed": "ui-corner-" + (t ? "top" : "left")
                        },
                        last: {
                            "ui-selectmenu-button-open": t ? "" : "ui-corner-tr",
                            "ui-selectmenu-button-closed": "ui-corner-" + (t ? "bottom" : "right")
                        },
                        only: {
                            "ui-selectmenu-button-open": "ui-corner-top",
                            "ui-selectmenu-button-closed": "ui-corner-all"
                        }
                    }[n]
                }
            },
            _resolveClassesValues: function(t, i) {
                var r = {};
                return n.each(t, function(u) {
                    var f = i.options.classes[u] || "";
                    f = n.trim(f.replace(d, "")),
                    r[u] = (f + " " + t[u]).replace(/\s+/g, " ")
                }),
                r
            },
            _setOption: function(n, t) {
                if (n === "direction" && this._removeClass("ui-controlgroup-" + this.options.direction),
                this._super(n, t),
                n === "disabled") {
                    this._callChildMethod(t ? "disable" : "enable");
                    return
                }
                this.refresh()
            },
            refresh: function() {
                var t, i = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction),
                this.options.direction === "horizontal" && this._addClass(null, "ui-helper-clearfix"),
                this._initWidgets(),
                t = this.childWidgets,
                this.options.onlyVisible && (t = t.filter(":visible")),
                t.length && (n.each(["first", "last"], function(n, r) {
                    var u = t[r]().data("ui-controlgroup-data"), f;
                    u && i["_" + u.widgetName + "Options"] ? (f = i["_" + u.widgetName + "Options"](t.length === 1 ? "only" : r),
                    f.classes = i._resolveClassesValues(f.classes, u),
                    u.element[u.widgetName](f)) : i._updateCornerClass(t[r](), r)
                }),
                this._callChildMethod("refresh"))
            }
        });
        n.widget("ui.checkboxradio", [n.ui.formResetMixin, {
            version: "1.12.1",
            options: {
                disabled: null,
                label: null,
                icon: !0,
                classes: {
                    "ui-checkboxradio-label": "ui-corner-all",
                    "ui-checkboxradio-icon": "ui-corner-all"
                }
            },
            _getCreateOptions: function() {
                var t, i, u = this, r = this._super() || {};
                return this._readType(),
                i = this.element.labels(),
                this.label = n(i[i.length - 1]),
                this.label.length || n.error("No label found for checkboxradio widget"),
                this.originalLabel = "",
                this.label.contents().not(this.element[0]).each(function() {
                    u.originalLabel += this.nodeType === 3 ? n(this).text() : this.outerHTML
                }),
                this.originalLabel && (r.label = this.originalLabel),
                t = this.element[0].disabled,
                t != null && (r.disabled = t),
                r
            },
            _create: function() {
                var n = this.element[0].checked;
                this._bindFormResetHandler(),
                this.options.disabled == null && (this.options.disabled = this.element[0].disabled),
                this._setOption("disabled", this.options.disabled),
                this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
                this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"),
                this.type === "radio" && this._addClass(this.label, "ui-checkboxradio-radio-label"),
                this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel),
                this._enhance(),
                n && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"),
                this.icon && this._addClass(this.icon, null, "ui-state-hover")),
                this._on({
                    change: "_toggleClasses",
                    focus: function() {
                        this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                    },
                    blur: function() {
                        this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                    }
                })
            },
            _readType: function() {
                var t = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type,
                t === "input" && /radio|checkbox/.test(this.type) || n.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type)
            },
            _enhance: function() {
                this._updateIcon(this.element[0].checked)
            },
            widget: function() {
                return this.label
            },
            _getRadioGroup: function() {
                var t, i = this.element[0].name, r = "input[name='" + n.ui.escapeSelector(i) + "']";
                return i ? (t = this.form.length ? n(this.form[0].elements).filter(r) : n(r).filter(function() {
                    return n(this).form().length === 0
                }),
                t.not(this.element)) : n([])
            },
            _toggleClasses: function() {
                var t = this.element[0].checked;
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t),
                this.options.icon && this.type === "checkbox" && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t),
                this.type === "radio" && this._getRadioGroup().each(function() {
                    var t = n(this).checkboxradio("instance");
                    t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active")
                })
            },
            _destroy: function() {
                this._unbindFormResetHandler(),
                this.icon && (this.icon.remove(),
                this.iconSpace.remove())
            },
            _setOption: function(n, t) {
                if (n !== "label" || t) {
                    if (this._super(n, t),
                    n === "disabled") {
                        this._toggleClass(this.label, null, "ui-state-disabled", t),
                        this.element[0].disabled = t;
                        return
                    }
                    this.refresh()
                }
            },
            _updateIcon: function(t) {
                var i = "ui-icon ui-icon-background ";
                this.options.icon ? (this.icon || (this.icon = n("<span>"),
                this.iconSpace = n("<span> <\/span>"),
                this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
                this.type === "checkbox" ? (i += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank",
                this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank",
                this._addClass(this.icon, "ui-checkboxradio-icon", i),
                t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"),
                this.icon.prependTo(this.label).after(this.iconSpace)) : this.icon !== undefined && (this.icon.remove(),
                this.iconSpace.remove(),
                delete this.icon)
            },
            _updateLabel: function() {
                var n = this.label.contents().not(this.element[0]);
                this.icon && (n = n.not(this.icon[0])),
                this.iconSpace && (n = n.not(this.iconSpace[0])),
                n.remove(),
                this.label.append(this.options.label)
            },
            refresh: function() {
                var n = this.element[0].checked
                  , t = this.element[0].disabled;
                this._updateIcon(n),
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", n),
                this.options.label !== null && this._updateLabel(),
                t !== this.options.disabled && this._setOptions({
                    disabled: t
                })
            }
        }]),
        g = n.ui.checkboxradio,
        n.widget("ui.button", {
            version: "1.12.1",
            defaultElement: "<button>",
            options: {
                classes: {
                    "ui-button": "ui-corner-all"
                },
                disabled: null,
                icon: null,
                iconPosition: "beginning",
                label: null,
                showLabel: !0
            },
            _getCreateOptions: function() {
                var n, t = this._super() || {};
                return this.isInput = this.element.is("input"),
                n = this.element[0].disabled,
                n != null && (t.disabled = n),
                this.originalLabel = this.isInput ? this.element.val() : this.element.html(),
                this.originalLabel && (t.label = this.originalLabel),
                t
            },
            _create: function() {
                !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0),
                this.options.disabled == null && (this.options.disabled = this.element[0].disabled || !1),
                this.hasTitle = !!this.element.attr("title"),
                this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)),
                this._addClass("ui-button", "ui-widget"),
                this._setOption("disabled", this.options.disabled),
                this._enhance(),
                this.element.is("a") && this._on({
                    keyup: function(t) {
                        t.keyCode === n.ui.keyCode.SPACE && (t.preventDefault(),
                        this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                    }
                })
            },
            _enhance: function() {
                this.element.is("button") || this.element.attr("role", "button"),
                this.options.icon && (this._updateIcon("icon", this.options.icon),
                this._updateTooltip())
            },
            _updateTooltip: function() {
                this.title = this.element.attr("title"),
                this.options.showLabel || this.title || this.element.attr("title", this.options.label)
            },
            _updateIcon: function(t, i) {
                var u = t !== "iconPosition"
                  , r = u ? this.options.iconPosition : i
                  , f = r === "top" || r === "bottom";
                this.icon ? u && this._removeClass(this.icon, null, this.options.icon) : (this.icon = n("<span>"),
                this._addClass(this.icon, "ui-button-icon", "ui-icon"),
                this.options.showLabel || this._addClass("ui-button-icon-only")),
                u && this._addClass(this.icon, null, i),
                this._attachIcon(r),
                f ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
                this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = n("<span> <\/span>"),
                this._addClass(this.iconSpace, "ui-button-icon-space")),
                this._removeClass(this.icon, null, "ui-wiget-icon-block"),
                this._attachIconSpace(r))
            },
            _destroy: function() {
                this.element.removeAttr("role"),
                this.icon && this.icon.remove(),
                this.iconSpace && this.iconSpace.remove(),
                this.hasTitle || this.element.removeAttr("title")
            },
            _attachIconSpace: function(n) {
                this.icon[/^(?:end|bottom)/.test(n) ? "before" : "after"](this.iconSpace)
            },
            _attachIcon: function(n) {
                this.element[/^(?:end|bottom)/.test(n) ? "append" : "prepend"](this.icon)
            },
            _setOptions: function(n) {
                var t = n.showLabel === undefined ? this.options.showLabel : n.showLabel
                  , i = n.icon === undefined ? this.options.icon : n.icon;
                t || i || (n.showLabel = !0),
                this._super(n)
            },
            _setOption: function(n, t) {
                n === "icon" && (t ? this._updateIcon(n, t) : this.icon && (this.icon.remove(),
                this.iconSpace && this.iconSpace.remove())),
                n === "iconPosition" && this._updateIcon(n, t),
                n === "showLabel" && (this._toggleClass("ui-button-icon-only", null, !t),
                this._updateTooltip()),
                n === "label" && (this.isInput ? this.element.val(t) : (this.element.html(t),
                this.icon && (this._attachIcon(this.options.iconPosition),
                this._attachIconSpace(this.options.iconPosition)))),
                this._super(n, t),
                n === "disabled" && (this._toggleClass(null, "ui-state-disabled", t),
                this.element[0].disabled = t,
                t && this.element.blur())
            },
            refresh: function() {
                var n = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                n !== this.options.disabled && this._setOptions({
                    disabled: n
                }),
                this._updateTooltip()
            }
        }),
        n.uiBackCompat !== !1 && (n.widget("ui.button", n.ui.button, {
            options: {
                text: !0,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text),
                !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel),
                !this.options.icon && (this.options.icons.primary || this.options.icons.secondary) ? this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary,
                this.options.iconPosition = "end") : this.options.icon && (this.options.icons.primary = this.options.icon),
                this._super()
            },
            _setOption: function(n, t) {
                if (n === "text") {
                    this._super("showLabel", t);
                    return
                }
                n === "showLabel" && (this.options.text = t),
                n === "icon" && (this.options.icons.primary = t),
                n === "icons" && (t.primary ? (this._super("icon", t.primary),
                this._super("iconPosition", "beginning")) : t.secondary && (this._super("icon", t.secondary),
                this._super("iconPosition", "end"))),
                this._superApply(arguments)
            }
        }),
        n.fn.button = function(t) {
            return function() {
                return !this.length || this.length && this[0].tagName !== "INPUT" || this.length && this[0].tagName === "INPUT" && this.attr("type") !== "checkbox" && this.attr("type") !== "radio" ? t.apply(this, arguments) : (n.ui.checkboxradio || n.error("Checkboxradio widget missing"),
                arguments.length === 0) ? this.checkboxradio({
                    icon: !1
                }) : this.checkboxradio.apply(this, arguments)
            }
        }(n.fn.button),
        n.fn.buttonset = function() {
            return (n.ui.controlgroup || n.error("Controlgroup widget missing"),
            arguments[0] === "option" && arguments[1] === "items" && arguments[2]) ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : arguments[0] === "option" && arguments[1] === "items" ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : (typeof arguments[0] == "object" && arguments[0].items && (arguments[0].items = {
                button: arguments[0].items
            }),
            this.controlgroup.apply(this, arguments))
        }
        ),
        nt = n.ui.button,
        n.extend(n.ui, {
            datepicker: {
                version: "1.12.1"
            }
        }),
        n.extend(a.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(n) {
                return u(this._defaults, n || {}),
                this
            },
            _attachDatepicker: function(t, i) {
                var r, f, u;
                r = t.nodeName.toLowerCase(),
                f = r === "div" || r === "span",
                t.id || (this.uuid += 1,
                t.id = "dp" + this.uuid),
                u = this._newInst(n(t), f),
                u.settings = n.extend({}, i || {}),
                r === "input" ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
            },
            _newInst: function(t, i) {
                var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: r,
                    input: t,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? v(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(t, i) {
                var r = n(t);
                if (i.append = n([]),
                i.trigger = n([]),
                !r.hasClass(this.markerClassName)) {
                    this._attachments(r, i);
                    r.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
                    this._autoSize(i),
                    n.data(t, "datepicker", i),
                    i.settings.disabled && this._disableDatepicker(t)
                }
            },
            _attachments: function(t, i) {
                var u, r, f, e = this._get(i, "appendText"), o = this._get(i, "isRTL");
                if (i.append && i.append.remove(),
                e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"),
                t[o ? "before" : "after"](i.append)),
                t.off("focus", this._showDatepicker),
                i.trigger && i.trigger.remove(),
                u = this._get(i, "showOn"),
                u === "focus" || u === "both")
                    t.on("focus", this._showDatepicker);
                if (u === "button" || u === "both") {
                    r = this._get(i, "buttonText"),
                    f = this._get(i, "buttonImage"),
                    i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
                        src: f,
                        alt: r,
                        title: r
                    }) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
                        src: f,
                        alt: r,
                        title: r
                    }) : r)),
                    t[o ? "before" : "after"](i.trigger);
                    i.trigger.on("click", function() {
                        return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(),
                        n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]),
                        !1
                    })
                }
            },
            _autoSize: function(n) {
                if (this._get(n, "autoSize") && !n.inline) {
                    var r, u, f, t, i = new Date(2009,11,20), e = this._get(n, "dateFormat");
                    e.match(/[DM]/) && (r = function(n) {
                        for (u = 0,
                        f = 0,
                        t = 0; t < n.length; t++)
                            n[t].length > u && (u = n[t].length,
                            f = t);
                        return f
                    }
                    ,
                    i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))),
                    i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay())),
                    n.input.attr("size", this._formatDate(n, i).length)
                }
            },
            _inlineDatepicker: function(t, i) {
                var r = n(t);
                r.hasClass(this.markerClassName) || (r.addClass(this.markerClassName).append(i.dpDiv),
                n.data(t, "datepicker", i),
                this._setDate(i, this._getDefaultDate(i), !0),
                this._updateDatepicker(i),
                this._updateAlternate(i),
                i.settings.disabled && this._disableDatepicker(t),
                i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(t, i, r, f, e) {
                var s, h, c, l, a, o = this._dialogInst;
                if (!o) {
                    this.uuid += 1,
                    s = "dp" + this.uuid,
                    this._dialogInput = n("<input type='text' id='" + s + "' style='position: absolute; top: -100px; width: 0px;'/>");
                    this._dialogInput.on("keydown", this._doKeyDown);
                    n("body").append(this._dialogInput),
                    o = this._dialogInst = this._newInst(this._dialogInput, !1),
                    o.settings = {},
                    n.data(this._dialogInput[0], "datepicker", o)
                }
                return u(o.settings, f || {}),
                i = i && i.constructor === Date ? this._formatDate(o, i) : i,
                this._dialogInput.val(i),
                this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null,
                this._pos || (h = document.documentElement.clientWidth,
                c = document.documentElement.clientHeight,
                l = document.documentElement.scrollLeft || document.body.scrollLeft,
                a = document.documentElement.scrollTop || document.body.scrollTop,
                this._pos = [h / 2 - 100 + l, c / 2 - 150 + a]),
                this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                o.settings.onSelect = r,
                this._inDialog = !0,
                this.dpDiv.addClass(this._dialogClass),
                this._showDatepicker(this._dialogInput[0]),
                n.blockUI && n.blockUI(this.dpDiv),
                n.data(this._dialogInput[0], "datepicker", o),
                this
            },
            _destroyDatepicker: function(i) {
                var r, u = n(i), f = n.data(i, "datepicker");
                u.hasClass(this.markerClassName) && (r = i.nodeName.toLowerCase(),
                n.removeData(i, "datepicker"),
                r === "input" ? (f.append.remove(),
                f.trigger.remove(),
                u.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : (r === "div" || r === "span") && u.removeClass(this.markerClassName).empty(),
                t === f && (t = null))
            },
            _enableDatepicker: function(t) {
                var i, r, u = n(t), f = n.data(t, "datepicker");
                u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(),
                i === "input" ? (t.disabled = !1,
                f.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : (i === "div" || i === "span") && (r = u.children("." + this._inlineClass),
                r.children().removeClass("ui-state-disabled"),
                r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
                this._disabledInputs = n.map(this._disabledInputs, function(n) {
                    return n === t ? null : n
                }))
            },
            _disableDatepicker: function(t) {
                var i, r, u = n(t), f = n.data(t, "datepicker");
                u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(),
                i === "input" ? (t.disabled = !0,
                f.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : (i === "div" || i === "span") && (r = u.children("." + this._inlineClass),
                r.children().addClass("ui-state-disabled"),
                r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
                this._disabledInputs = n.map(this._disabledInputs, function(n) {
                    return n === t ? null : n
                }),
                this._disabledInputs[this._disabledInputs.length] = t)
            },
            _isDisabledDatepicker: function(n) {
                if (!n)
                    return !1;
                for (var t = 0; t < this._disabledInputs.length; t++)
                    if (this._disabledInputs[t] === n)
                        return !0;
                return !1
            },
            _getInst: function(t) {
                try {
                    return n.data(t, "datepicker")
                } catch (i) {
                    throw "Missing instance data for this datepicker";
                }
            },
            _optionDatepicker: function(t, i, r) {
                var e, h, o, s, f = this._getInst(t);
                if (arguments.length === 2 && typeof i == "string")
                    return i === "defaults" ? n.extend({}, n.datepicker._defaults) : f ? i === "all" ? n.extend({}, f.settings) : this._get(f, i) : null;
                e = i || {},
                typeof i == "string" && (e = {},
                e[i] = r),
                f && (this._curInst === f && this._hideDatepicker(),
                h = this._getDateDatepicker(t, !0),
                o = this._getMinMaxDate(f, "min"),
                s = this._getMinMaxDate(f, "max"),
                u(f.settings, e),
                o !== null && e.dateFormat !== undefined && e.minDate === undefined && (f.settings.minDate = this._formatDate(f, o)),
                s !== null && e.dateFormat !== undefined && e.maxDate === undefined && (f.settings.maxDate = this._formatDate(f, s)),
                "disabled"in e && (e.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)),
                this._attachments(n(t), f),
                this._autoSize(f),
                this._setDate(f, h),
                this._updateAlternate(f),
                this._updateDatepicker(f))
            },
            _changeDatepicker: function(n, t, i) {
                this._optionDatepicker(n, t, i)
            },
            _refreshDatepicker: function(n) {
                var t = this._getInst(n);
                t && this._updateDatepicker(t)
            },
            _setDateDatepicker: function(n, t) {
                var i = this._getInst(n);
                i && (this._setDate(i, t),
                this._updateDatepicker(i),
                this._updateAlternate(i))
            },
            _getDateDatepicker: function(n, t) {
                var i = this._getInst(n);
                return i && !i.inline && this._setDateFromField(i, t),
                i ? this._getDate(i) : null
            },
            _doKeyDown: function(t) {
                var u, e, f, i = n.datepicker._getInst(t.target), r = !0, o = i.dpDiv.is(".ui-datepicker-rtl");
                if (i._keyEvent = !0,
                n.datepicker._datepickerShowing)
                    switch (t.keyCode) {
                    case 9:
                        n.datepicker._hideDatepicker(),
                        r = !1;
                        break;
                    case 13:
                        return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv),
                        f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]),
                        u = n.datepicker._get(i, "onSelect"),
                        u ? (e = n.datepicker._formatDate(i),
                        u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(),
                        !1;
                    case 27:
                        n.datepicker._hideDatepicker();
                        break;
                    case 33:
                        n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 34:
                        n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 35:
                        (t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target),
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 36:
                        (t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target),
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 37:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D"),
                        r = t.ctrlKey || t.metaKey,
                        t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 38:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D"),
                        r = t.ctrlKey || t.metaKey;
                        break;
                    case 39:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D"),
                        r = t.ctrlKey || t.metaKey,
                        t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
                        break;
                    case 40:
                        (t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D"),
                        r = t.ctrlKey || t.metaKey;
                        break;
                    default:
                        r = !1
                    }
                else
                    t.keyCode === 36 && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
                r && (t.preventDefault(),
                t.stopPropagation())
            },
            _doKeyPress: function(t) {
                var i, r, u = n.datepicker._getInst(t.target);
                if (n.datepicker._get(u, "constrainInput"))
                    return i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")),
                    r = String.fromCharCode(t.charCode == null ? t.keyCode : t.charCode),
                    t.ctrlKey || t.metaKey || r < " " || !i || i.indexOf(r) > -1
            },
            _doKeyUp: function(t) {
                var r, i = n.datepicker._getInst(t.target);
                if (i.input.val() !== i.lastVal)
                    try {
                        r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i)),
                        r && (n.datepicker._setDateFromField(i),
                        n.datepicker._updateAlternate(i),
                        n.datepicker._updateDatepicker(i))
                    } catch (u) {}
                return !0
            },
            _showDatepicker: function(t) {
                if (t = t.target || t,
                t.nodeName.toLowerCase() !== "input" && (t = n("input", t.parentNode)[0]),
                !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
                    var i, o, s, r, f, e, h;
                    (i = n.datepicker._getInst(t),
                    n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0),
                    i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0])),
                    o = n.datepicker._get(i, "beforeShow"),
                    s = o ? o.apply(t, [t, i]) : {},
                    s !== !1) && (u(i.settings, s),
                    i.lastVal = null,
                    n.datepicker._lastInput = t,
                    n.datepicker._setDateFromField(i),
                    n.datepicker._inDialog && (t.value = ""),
                    n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t),
                    n.datepicker._pos[1] += t.offsetHeight),
                    r = !1,
                    n(t).parents().each(function() {
                        return r |= n(this).css("position") === "fixed",
                        !r
                    }),
                    f = {
                        left: n.datepicker._pos[0],
                        top: n.datepicker._pos[1]
                    },
                    n.datepicker._pos = null,
                    i.dpDiv.empty(),
                    i.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }),
                    n.datepicker._updateDatepicker(i),
                    f = n.datepicker._checkOffset(i, f, r),
                    i.dpDiv.css({
                        position: n.datepicker._inDialog && n.blockUI ? "static" : r ? "fixed" : "absolute",
                        display: "none",
                        left: f.left + "px",
                        top: f.top + "px"
                    }),
                    i.inline || (e = n.datepicker._get(i, "showAnim"),
                    h = n.datepicker._get(i, "duration"),
                    i.dpDiv.css("z-index", tt(n(t)) + 1),
                    n.datepicker._datepickerShowing = !0,
                    n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null),
                    n.datepicker._shouldFocusInput(i) && i.input.trigger("focus"),
                    n.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(i) {
                this.maxRows = 4,
                t = i,
                i.dpDiv.empty().append(this._generateHTML(i)),
                this._attachHandlers(i);
                var r, u = this._getNumberOfMonths(i), f = u[1], o = 17, e = i.dpDiv.find("." + this._dayOverClass + " a");
                e.length > 0 && y.apply(e.get(0)),
                i.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                f > 1 && i.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", o * f + "em"),
                i.dpDiv[(u[0] !== 1 || u[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                i.dpDiv[(this._get(i, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                i === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(i) && i.input.trigger("focus"),
                i.yearshtml && (r = i.yearshtml,
                setTimeout(function() {
                    r === i.yearshtml && i.yearshtml && i.dpDiv.find("select.ui-datepicker-year:first").replaceWith(i.yearshtml),
                    r = i.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(n) {
                return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
            },
            _checkOffset: function(t, i, r) {
                var u = t.dpDiv.outerWidth()
                  , f = t.dpDiv.outerHeight()
                  , h = t.input ? t.input.outerWidth() : 0
                  , o = t.input ? t.input.outerHeight() : 0
                  , e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft())
                  , s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
                return i.left -= this._get(t, "isRTL") ? u - h : 0,
                i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0,
                i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0,
                i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0),
                i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0),
                i
            },
            _findPos: function(t) {
                for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && (t.type === "hidden" || t.nodeType !== 1 || n.expr.filters.hidden(t)); )
                    t = t[u ? "previousSibling" : "nextSibling"];
                return i = n(t).offset(),
                [i.left, i.top]
            },
            _hideDatepicker: function(t) {
                var r, f, u, e, i = this._curInst;
                i && (!t || i === n.data(t, "datepicker")) && this._datepickerShowing && (r = this._get(i, "showAnim"),
                f = this._get(i, "duration"),
                u = function() {
                    n.datepicker._tidyDialog(i)
                }
                ,
                n.effects && (n.effects.effect[r] || n.effects[r]) ? i.dpDiv.hide(r, n.datepicker._get(i, "showOptions"), f, u) : i.dpDiv[r === "slideDown" ? "slideUp" : r === "fadeIn" ? "fadeOut" : "hide"](r ? f : null, u),
                r || u(),
                this._datepickerShowing = !1,
                e = this._get(i, "onClose"),
                e && e.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : "", i]),
                this._lastInput = null,
                this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }),
                n.blockUI && (n.unblockUI(),
                n("body").append(this.dpDiv))),
                this._inDialog = !1)
            },
            _tidyDialog: function(n) {
                n.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(t) {
                if (n.datepicker._curInst) {
                    var i = n(t.target)
                      , r = n.datepicker._getInst(i[0]);
                    (i[0].id === n.datepicker._mainDivId || i.parents("#" + n.datepicker._mainDivId).length !== 0 || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(t, i, r) {
                var f = n(t)
                  , u = this._getInst(f[0]);
                this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + (r === "M" ? this._get(u, "showCurrentAtPos") : 0), r),
                this._updateDatepicker(u))
            },
            _gotoToday: function(t) {
                var r, u = n(t), i = this._getInst(u[0]);
                this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay,
                i.drawMonth = i.selectedMonth = i.currentMonth,
                i.drawYear = i.selectedYear = i.currentYear) : (r = new Date,
                i.selectedDay = r.getDate(),
                i.drawMonth = i.selectedMonth = r.getMonth(),
                i.drawYear = i.selectedYear = r.getFullYear()),
                this._notifyChange(i),
                this._adjustDate(u)
            },
            _selectMonthYear: function(t, i, r) {
                var f = n(t)
                  , u = this._getInst(f[0]);
                u["selected" + (r === "M" ? "Month" : "Year")] = u["draw" + (r === "M" ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10),
                this._notifyChange(u),
                this._adjustDate(f)
            },
            _selectDay: function(t, i, r, u) {
                var f, e = n(t);
                n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]),
                f.selectedDay = f.currentDay = n("a", u).html(),
                f.selectedMonth = f.currentMonth = i,
                f.selectedYear = f.currentYear = r,
                this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
            },
            _clearDate: function(t) {
                var i = n(t);
                this._selectDate(i, "")
            },
            _selectDate: function(t, i) {
                var u, f = n(t), r = this._getInst(f[0]);
                i = i != null ? i : this._formatDate(r),
                r.input && r.input.val(i),
                this._updateAlternate(r),
                u = this._get(r, "onSelect"),
                u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change"),
                r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(),
                this._lastInput = r.input[0],
                typeof r.input[0] != "object" && r.input.trigger("focus"),
                this._lastInput = null)
            },
            _updateAlternate: function(t) {
                var i, r, u, f = this._get(t, "altField");
                f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"),
                r = this._getDate(t),
                u = this.formatDate(i, r, this._getFormatConfig(t)),
                n(f).val(u))
            },
            noWeekends: function(n) {
                var t = n.getDay();
                return [t > 0 && t < 6, ""]
            },
            iso8601Week: function(n) {
                var i, t = new Date(n.getTime());
                return t.setDate(t.getDate() + 4 - (t.getDay() || 7)),
                i = t.getTime(),
                t.setMonth(0),
                t.setDate(1),
                Math.floor(Math.round((i - t) / 864e5) / 7) + 1
            },
            parseDate: function(t, i, r) {
                if (t == null || i == null)
                    throw "Invalid arguments";
                if (i = typeof i == "object" ? i.toString() : i + "",
                i === "")
                    return null;
                for (var a, v, f = 0, y = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = typeof y != "string" ? y : (new Date).getFullYear() % 100 + parseInt(y, 10), g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, nt = (r ? r.dayNames : null) || this._defaults.dayNames, tt = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, it = (r ? r.monthNames : null) || this._defaults.monthNames, e = -1, o = -1, h = -1, p = -1, w = !1, u, l = function(n) {
                    var i = s + 1 < t.length && t.charAt(s + 1) === n;
                    return i && s++,
                    i
                }, c = function(n) {
                    var u = l(n)
                      , r = n === "@" ? 14 : n === "!" ? 20 : n === "y" && u ? 4 : n === "o" ? 3 : 2
                      , e = n === "y" ? r : 1
                      , o = new RegExp("^\\d{" + e + "," + r + "}")
                      , t = i.substring(f).match(o);
                    if (!t)
                        throw "Missing number at position " + f;
                    return f += t[0].length,
                    parseInt(t[0], 10)
                }, k = function(t, r, u) {
                    var e = -1
                      , o = n.map(l(t) ? u : r, function(n, t) {
                        return [[t, n]]
                    }).sort(function(n, t) {
                        return -(n[1].length - t[1].length)
                    });
                    if (n.each(o, function(n, t) {
                        var r = t[1];
                        if (i.substr(f, r.length).toLowerCase() === r.toLowerCase())
                            return e = t[0],
                            f += r.length,
                            !1
                    }),
                    e !== -1)
                        return e + 1;
                    throw "Unknown name at position " + f;
                }, b = function() {
                    if (i.charAt(f) !== t.charAt(s))
                        throw "Unexpected literal at position " + f;
                    f++
                }, s = 0; s < t.length; s++)
                    if (w)
                        t.charAt(s) !== "'" || l("'") ? b() : w = !1;
                    else
                        switch (t.charAt(s)) {
                        case "d":
                            h = c("d");
                            break;
                        case "D":
                            k("D", g, nt);
                            break;
                        case "o":
                            p = c("o");
                            break;
                        case "m":
                            o = c("m");
                            break;
                        case "M":
                            o = k("M", tt, it);
                            break;
                        case "y":
                            e = c("y");
                            break;
                        case "@":
                            u = new Date(c("@")),
                            e = u.getFullYear(),
                            o = u.getMonth() + 1,
                            h = u.getDate();
                            break;
                        case "!":
                            u = new Date((c("!") - this._ticksTo1970) / 1e4),
                            e = u.getFullYear(),
                            o = u.getMonth() + 1,
                            h = u.getDate();
                            break;
                        case "'":
                            l("'") ? b() : w = !0;
                            break;
                        default:
                            b()
                        }
                if (f < i.length && (v = i.substr(f),
                !/^\s+/.test(v)))
                    throw "Extra/unparsed characters found in date: " + v;
                if (e === -1 ? e = (new Date).getFullYear() : e < 100 && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (e <= d ? 0 : -100)),
                p > -1) {
                    o = 1,
                    h = p;
                    do {
                        if (a = this._getDaysInMonth(e, o - 1),
                        h <= a)
                            break;
                        o++,
                        h -= a
                    } while (1)
                }
                if (u = this._daylightSavingAdjust(new Date(e,o - 1,h)),
                u.getFullYear() !== e || u.getMonth() + 1 !== o || u.getDate() !== h)
                    throw "Invalid date";
                return u
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: (718685 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 864e9,
            formatDate: function(n, t, i) {
                if (!t)
                    return "";
                var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, c = (i ? i.dayNames : null) || this._defaults.dayNames, l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, a = (i ? i.monthNames : null) || this._defaults.monthNames, f = function(t) {
                    var i = u + 1 < n.length && n.charAt(u + 1) === t;
                    return i && u++,
                    i
                }, e = function(n, t, i) {
                    var r = "" + t;
                    if (f(n))
                        while (r.length < i)
                            r = "0" + r;
                    return r
                }, s = function(n, t, i, r) {
                    return f(n) ? r[t] : i[t]
                }, r = "", o = !1;
                if (t)
                    for (u = 0; u < n.length; u++)
                        if (o)
                            n.charAt(u) !== "'" || f("'") ? r += n.charAt(u) : o = !1;
                        else
                            switch (n.charAt(u)) {
                            case "d":
                                r += e("d", t.getDate(), 2);
                                break;
                            case "D":
                                r += s("D", t.getDay(), h, c);
                                break;
                            case "o":
                                r += e("o", Math.round((+new Date(t.getFullYear(),t.getMonth(),t.getDate()) - +new Date(t.getFullYear(),0,0)) / 864e5), 3);
                                break;
                            case "m":
                                r += e("m", t.getMonth() + 1, 2);
                                break;
                            case "M":
                                r += s("M", t.getMonth(), l, a);
                                break;
                            case "y":
                                r += f("y") ? t.getFullYear() : (t.getFullYear() % 100 < 10 ? "0" : "") + t.getFullYear() % 100;
                                break;
                            case "@":
                                r += t.getTime();
                                break;
                            case "!":
                                r += t.getTime() * 1e4 + this._ticksTo1970;
                                break;
                            case "'":
                                f("'") ? r += "'" : o = !0;
                                break;
                            default:
                                r += n.charAt(u)
                            }
                return r
            },
            _possibleChars: function(n) {
                for (var i = "", r = !1, u = function(i) {
                    var r = t + 1 < n.length && n.charAt(t + 1) === i;
                    return r && t++,
                    r
                }, t = 0; t < n.length; t++)
                    if (r)
                        n.charAt(t) !== "'" || u("'") ? i += n.charAt(t) : r = !1;
                    else
                        switch (n.charAt(t)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            u("'") ? i += "'" : r = !0;
                            break;
                        default:
                            i += n.charAt(t)
                        }
                return i
            },
            _get: function(n, t) {
                return n.settings[t] !== undefined ? n.settings[t] : this._defaults[t]
            },
            _setDateFromField: function(n, t) {
                if (n.input.val() !== n.lastVal) {
                    var f = this._get(n, "dateFormat")
                      , r = n.lastVal = n.input ? n.input.val() : null
                      , u = this._getDefaultDate(n)
                      , i = u
                      , e = this._getFormatConfig(n);
                    try {
                        i = this.parseDate(f, r, e) || u
                    } catch (o) {
                        r = t ? "" : r
                    }
                    n.selectedDay = i.getDate(),
                    n.drawMonth = n.selectedMonth = i.getMonth(),
                    n.drawYear = n.selectedYear = i.getFullYear(),
                    n.currentDay = r ? i.getDate() : 0,
                    n.currentMonth = r ? i.getMonth() : 0,
                    n.currentYear = r ? i.getFullYear() : 0,
                    this._adjustInstDate(n)
                }
            },
            _getDefaultDate: function(n) {
                return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
            },
            _determineDate: function(t, i, r) {
                var f = function(n) {
                    var t = new Date;
                    return t.setDate(t.getDate() + n),
                    t
                }
                  , e = function(i) {
                    try {
                        return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
                    } catch (h) {}
                    for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u; ) {
                        switch (u[2] || "d") {
                        case "d":
                        case "D":
                            r += parseInt(u[1], 10);
                            break;
                        case "w":
                        case "W":
                            r += parseInt(u[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            e += parseInt(u[1], 10),
                            r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
                            break;
                        case "y":
                        case "Y":
                            f += parseInt(u[1], 10),
                            r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
                        }
                        u = s.exec(i)
                    }
                    return new Date(f,e,r)
                }
                  , u = i == null || i === "" ? r : typeof i == "string" ? e(i) : typeof i == "number" ? isNaN(i) ? r : f(i) : new Date(i.getTime());
                return u = u && u.toString() === "Invalid Date" ? r : u,
                u && (u.setHours(0),
                u.setMinutes(0),
                u.setSeconds(0),
                u.setMilliseconds(0)),
                this._daylightSavingAdjust(u)
            },
            _daylightSavingAdjust: function(n) {
                return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0),
                n) : null
            },
            _setDate: function(n, t, i) {
                var u = !t
                  , f = n.selectedMonth
                  , e = n.selectedYear
                  , r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
                n.selectedDay = n.currentDay = r.getDate(),
                n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth(),
                n.drawYear = n.selectedYear = n.currentYear = r.getFullYear(),
                f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n),
                this._adjustInstDate(n),
                n.input && n.input.val(u ? "" : this._formatDate(n))
            },
            _getDate: function(n) {
                return !n.currentYear || n.input && n.input.val() === "" ? null : this._daylightSavingAdjust(new Date(n.currentYear,n.currentMonth,n.currentDay))
            },
            _attachHandlers: function(t) {
                var r = this._get(t, "stepMonths")
                  , i = "#" + t.id.replace(/\\\\/g, "\\");
                t.dpDiv.find("[data-handler]").map(function() {
                    var t = {
                        prev: function() {
                            n.datepicker._adjustDate(i, -r, "M")
                        },
                        next: function() {
                            n.datepicker._adjustDate(i, +r, "M")
                        },
                        hide: function() {
                            n.datepicker._hideDatepicker()
                        },
                        today: function() {
                            n.datepicker._gotoToday(i)
                        },
                        selectDay: function() {
                            return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                            !1
                        },
                        selectMonth: function() {
                            return n.datepicker._selectMonthYear(i, this, "M"),
                            !1
                        },
                        selectYear: function() {
                            return n.datepicker._selectMonthYear(i, this, "Y"),
                            !1
                        }
                    };
                    n(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(n) {
                var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date, gt = this._daylightSavingAdjust(new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())), f = this._get(n, "isRTL"), li = this._get(n, "showButtonPanel"), hi = this._get(n, "hideIfNoPrevNext"), ni = this._get(n, "navigationAsDateFormat"), e = this._getNumberOfMonths(n), ai = this._get(n, "showCurrentAtPos"), ci = this._get(n, "stepMonths"), ti = e[0] !== 1 || e[1] !== 1, ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear,n.currentMonth,n.currentDay) : new Date(9999,9,9)), w = this._getMinMaxDate(n, "min"), v = this._getMinMaxDate(n, "max"), t = n.drawMonth - ai, r = n.drawYear;
                if (t < 0 && (t += 12,
                r--),
                v)
                    for (b = this._daylightSavingAdjust(new Date(v.getFullYear(),v.getMonth() - e[0] * e[1] + 1,v.getDate())),
                    b = w && b < w ? w : b; this._daylightSavingAdjust(new Date(r,t,1)) > b; )
                        t--,
                        t < 0 && (t = 11,
                        r--);
                for (n.drawMonth = t,
                n.drawYear = r,
                s = this._get(n, "prevText"),
                s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r,t - ci,1)), this._getFormatConfig(n)) : s,
                rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>",
                h = this._get(n, "nextText"),
                h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r,t + ci,1)), this._getFormatConfig(n)) : h,
                ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>",
                k = this._get(n, "currentText"),
                ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt,
                k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k,
                et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>",
                ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "",
                c = parseInt(this._get(n, "firstDay"), 10),
                c = isNaN(c) ? 0 : c,
                ot = this._get(n, "showWeek"),
                ui = this._get(n, "dayNames"),
                fi = this._get(n, "dayNamesMin"),
                ei = this._get(n, "monthNames"),
                oi = this._get(n, "monthNamesShort"),
                st = this._get(n, "beforeShowDay"),
                g = this._get(n, "showOtherMonths"),
                si = this._get(n, "selectOtherMonths"),
                ht = this._getDefaultDate(n),
                nt = "",
                y = 0; y < e[0]; y++) {
                    for (ct = "",
                    this.maxRows = 4,
                    p = 0; p < e[1]; p++) {
                        if (lt = this._daylightSavingAdjust(new Date(r,t,n.selectedDay)),
                        l = " ui-corner-all",
                        u = "",
                        ti) {
                            if (u += "<div class='ui-datepicker-group",
                            e[1] > 1)
                                switch (p) {
                                case 0:
                                    u += " ui-datepicker-group-first",
                                    l = " ui-corner-" + (f ? "right" : "left");
                                    break;
                                case e[1] - 1:
                                    u += " ui-datepicker-group-last",
                                    l = " ui-corner-" + (f ? "left" : "right");
                                    break;
                                default:
                                    u += " ui-datepicker-group-middle",
                                    l = ""
                                }
                            u += "'>"
                        }
                        for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && y === 0 ? f ? ut : rt : "") + (/all|right/.test(l) && y === 0 ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>",
                        at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "",
                        o = 0; o < 7; o++)
                            vt = (o + c) % 7,
                            at += "<th scope='col'" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
                        for (u += at + "<\/tr><\/thead><tbody>",
                        yt = this._getDaysInMonth(r, t),
                        r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)),
                        pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7,
                        tt = Math.ceil((pt + yt) / 7),
                        wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt,
                        this.maxRows = wt,
                        i = this._daylightSavingAdjust(new Date(r,t,1 - pt)),
                        bt = 0; bt < wt; bt++) {
                            for (u += "<tr>",
                            kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "",
                            o = 0; o < 7; o++)
                                d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""],
                                a = i.getMonth() !== t,
                                it = a && !si || !d[0] || w && i < w || v && i > v,
                                kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!a || g) && d[2] ? " title='" + d[2].replace(/'/g, "&#39;") + "'" : "") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>",
                                i.setDate(i.getDate() + 1),
                                i = this._daylightSavingAdjust(i);
                            u += kt + "<\/tr>"
                        }
                        t++,
                        t > 11 && (t = 0,
                        r++),
                        u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : ""),
                        ct += u
                    }
                    nt += ct
                }
                return nt += ri,
                n._keyEvent = !1,
                nt
            },
            _generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
                var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"), b = this._get(n, "changeYear"), g = this._get(n, "showMonthAfterYear"), c = "<div class='ui-datepicker-title'>", l = "";
                if (f || !w)
                    l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
                else {
                    for (k = r && r.getFullYear() === i,
                    d = u && u.getFullYear() === i,
                    l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                    h = 0; h < 12; h++)
                        (!k || h >= r.getMonth()) && (!d || h <= u.getMonth()) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
                    l += "<\/select>"
                }
                if (g || (c += l + (f || !(w && b) ? "&#xa0;" : "")),
                !n.yearshtml)
                    if (n.yearshtml = "",
                    f || !b)
                        c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
                    else {
                        for (v = this._get(n, "yearRange").split(":"),
                        y = (new Date).getFullYear(),
                        p = function(n) {
                            var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
                            return isNaN(t) ? y : t
                        }
                        ,
                        s = p(v[0]),
                        a = Math.max(s, p(v[1] || "")),
                        s = r ? Math.max(s, r.getFullYear()) : s,
                        a = u ? Math.min(a, u.getFullYear()) : a,
                        n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; s <= a; s++)
                            n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
                        n.yearshtml += "<\/select>",
                        c += n.yearshtml,
                        n.yearshtml = null
                    }
                return c += this._get(n, "yearSuffix"),
                g && (c += (f || !(w && b) ? "&#xa0;" : "") + l),
                c += "<\/div>"
            },
            _adjustInstDate: function(n, t, i) {
                var u = n.selectedYear + (i === "Y" ? t : 0)
                  , f = n.selectedMonth + (i === "M" ? t : 0)
                  , e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + (i === "D" ? t : 0)
                  , r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u,f,e)));
                n.selectedDay = r.getDate(),
                n.drawMonth = n.selectedMonth = r.getMonth(),
                n.drawYear = n.selectedYear = r.getFullYear(),
                (i === "M" || i === "Y") && this._notifyChange(n)
            },
            _restrictMinMax: function(n, t) {
                var i = this._getMinMaxDate(n, "min")
                  , r = this._getMinMaxDate(n, "max")
                  , u = i && t < i ? i : t;
                return r && u > r ? r : u
            },
            _notifyChange: function(n) {
                var t = this._get(n, "onChangeMonthYear");
                t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
            },
            _getNumberOfMonths: function(n) {
                var t = this._get(n, "numberOfMonths");
                return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
            },
            _getMinMaxDate: function(n, t) {
                return this._determineDate(n, this._get(n, t + "Date"), null)
            },
            _getDaysInMonth: function(n, t) {
                return 32 - this._daylightSavingAdjust(new Date(n,t,32)).getDate()
            },
            _getFirstDayOfMonth: function(n, t) {
                return new Date(n,t,1).getDay()
            },
            _canAdjustMonth: function(n, t, i, r) {
                var f = this._getNumberOfMonths(n)
                  , u = this._daylightSavingAdjust(new Date(i,r + (t < 0 ? t : f[0] * f[1]),1));
                return t < 0 && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())),
                this._isInRange(n, u)
            },
            _isInRange: function(n, t) {
                var i, f, e = this._getMinMaxDate(n, "min"), o = this._getMinMaxDate(n, "max"), r = null, u = null, s = this._get(n, "yearRange");
                return s && (i = s.split(":"),
                f = (new Date).getFullYear(),
                r = parseInt(i[0], 10),
                u = parseInt(i[1], 10),
                i[0].match(/[+\-].*/) && (r += f),
                i[1].match(/[+\-].*/) && (u += f)),
                (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || t.getFullYear() <= u)
            },
            _getFormatConfig: function(n) {
                var t = this._get(n, "shortYearCutoff");
                return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10),
                {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(n, "dayNamesShort"),
                    dayNames: this._get(n, "dayNames"),
                    monthNamesShort: this._get(n, "monthNamesShort"),
                    monthNames: this._get(n, "monthNames")
                }
            },
            _formatDate: function(n, t, i, r) {
                t || (n.currentDay = n.selectedDay,
                n.currentMonth = n.selectedMonth,
                n.currentYear = n.selectedYear);
                var u = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r,i,t)) : this._daylightSavingAdjust(new Date(n.currentYear,n.currentMonth,n.currentDay));
                return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
            }
        }),
        n.fn.datepicker = function(t) {
            if (!this.length)
                return this;
            if (!n.datepicker.initialized) {
                n(document).on("mousedown", n.datepicker._checkExternalClick);
                n.datepicker.initialized = !0
            }
            n("#" + n.datepicker._mainDivId).length === 0 && n("body").append(n.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return typeof t == "string" && (t === "isDisabled" || t === "getDate" || t === "widget") ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : t === "option" && arguments.length === 2 && typeof arguments[1] == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function() {
                typeof t == "string" ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
            })
        }
        ,
        n.datepicker = new a,
        n.datepicker.initialized = !1,
        n.datepicker.uuid = +new Date,
        n.datepicker.version = "1.12.1";
        var di = n.datepicker
          , gi = n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())
          , f = !1;
        n(document).on("mouseup", function() {
            f = !1
        });
        var nr = n.widget("ui.mouse", {
            version: "1.12.1",
            options: {
                cancel: "input, textarea, button, select, option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var t = this;
                this.element.on("mousedown." + this.widgetName, function(n) {
                    return t._mouseDown(n)
                }).on("click." + this.widgetName, function(i) {
                    if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent"))
                        return n.removeData(i.target, t.widgetName + ".preventClickEvent"),
                        i.stopImmediatePropagation(),
                        !1
                });
                this.started = !1
            },
            _mouseDestroy: function() {
                this.element.off("." + this.widgetName),
                this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(t) {
                if (!f) {
                    this._mouseMoved = !1,
                    this._mouseStarted && this._mouseUp(t),
                    this._mouseDownEvent = t;
                    var i = this
                      , r = t.which === 1
                      , u = typeof this.options.cancel == "string" && t.target.nodeName ? n(t.target).closest(this.options.cancel).length : !1;
                    if (!r || u || !this._mouseCapture(t))
                        return !0;
                    if (this.mouseDelayMet = !this.options.delay,
                    this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        i.mouseDelayMet = !0
                    }, this.options.delay)),
                    this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1,
                    !this._mouseStarted))
                        return t.preventDefault(),
                        !0;
                    !0 === n.data(t.target, this.widgetName + ".preventClickEvent") && n.removeData(t.target, this.widgetName + ".preventClickEvent"),
                    this._mouseMoveDelegate = function(n) {
                        return i._mouseMove(n)
                    }
                    ,
                    this._mouseUpDelegate = function(n) {
                        return i._mouseUp(n)
                    }
                    ;
                    this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate);
                    return t.preventDefault(),
                    f = !0,
                    !0
                }
            },
            _mouseMove: function(t) {
                if (this._mouseMoved) {
                    if (n.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button)
                        return this._mouseUp(t);
                    if (!t.which)
                        if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey)
                            this.ignoreMissingWhich = !0;
                        else if (!this.ignoreMissingWhich)
                            return this._mouseUp(t)
                }
                return ((t.which || t.button) && (this._mouseMoved = !0),
                this._mouseStarted) ? (this._mouseDrag(t),
                t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1,
                this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
                !this._mouseStarted)
            },
            _mouseUp: function(t) {
                this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
                this._mouseStarted && (this._mouseStarted = !1,
                t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0),
                this._mouseStop(t)),
                this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer),
                delete this._mouseDelayTimer),
                this.ignoreMissingWhich = !1,
                f = !1,
                t.preventDefault()
            },
            _mouseDistanceMet: function(n) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
          , tr = n.ui.plugin = {
            add: function(t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r)
                    f.plugins[u] = f.plugins[u] || [],
                    f.plugins[u].push([i, r[u]])
            },
            call: function(n, t, i, r) {
                var u, f = n.plugins[t];
                if (f && (r || n.element[0].parentNode && n.element[0].parentNode.nodeType !== 11))
                    for (u = 0; u < f.length; u++)
                        n.options[f[u][0]] && f[u][1].apply(n.element, i)
            }
        }
          , ir = n.ui.safeBlur = function(t) {
            t && t.nodeName.toLowerCase() !== "body" && n(t).trigger("blur")
        }
        ;
        n.widget("ui.draggable", n.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function() {
                this.options.helper === "original" && this._setPositionRelative(),
                this.options.addClasses && this._addClass("ui-draggable"),
                this._setHandleClassName(),
                this._mouseInit()
            },
            _setOption: function(n, t) {
                this._super(n, t),
                n === "handle" && (this._removeHandleClassName(),
                this._setHandleClassName())
            },
            _destroy: function() {
                if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                    this.destroyOnClear = !0;
                    return
                }
                this._removeHandleClassName(),
                this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var i = this.options;
                return this.helper || i.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t),
                !this.handle) ? !1 : (this._blurActiveElement(t),
                this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix),
                !0)
            },
            _blockFrames: function(t) {
                this.iframeBlocks = this.document.find(t).map(function() {
                    var t = n(this);
                    return n("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(),
                delete this.iframeBlocks)
            },
            _blurActiveElement: function(t) {
                var i = n.ui.safeActiveElement(this.document[0])
                  , r = n(t.target);
                r.closest(i).length || n.ui.safeBlur(i)
            },
            _mouseStart: function(t) {
                var i = this.options;
                return (this.helper = this._createHelper(t),
                this._addClass(this.helper, "ui-draggable-dragging"),
                this._cacheHelperProportions(),
                n.ui.ddmanager && (n.ui.ddmanager.current = this),
                this._cacheMargins(),
                this.cssPosition = this.helper.css("position"),
                this.scrollParent = this.helper.scrollParent(!0),
                this.offsetParent = this.helper.offsetParent(),
                this.hasFixedAncestor = this.helper.parents().filter(function() {
                    return n(this).css("position") === "fixed"
                }).length > 0,
                this.positionAbs = this.element.offset(),
                this._refreshOffsets(t),
                this.originalPosition = this.position = this._generatePosition(t, !1),
                this.originalPageX = t.pageX,
                this.originalPageY = t.pageY,
                i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
                this._setContainment(),
                this._trigger("start", t) === !1) ? (this._clear(),
                !1) : (this._cacheHelperProportions(),
                n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t),
                this._mouseDrag(t, !0),
                n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t),
                !0)
            },
            _refreshOffsets: function(n) {
                this.offset = {
                    top: this.positionAbs.top - this.margins.top,
                    left: this.positionAbs.left - this.margins.left,
                    scroll: !1,
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                },
                this.offset.click = {
                    left: n.pageX - this.offset.left,
                    top: n.pageY - this.offset.top
                }
            },
            _mouseDrag: function(t, i) {
                if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()),
                this.position = this._generatePosition(t, !0),
                this.positionAbs = this._convertPositionTo("absolute"),
                !i) {
                    var r = this._uiHash();
                    if (this._trigger("drag", t, r) === !1)
                        return this._mouseUp(new n.Event("mouseup",t)),
                        !1;
                    this.position = r.position
                }
                return this.helper[0].style.left = this.position.left + "px",
                this.helper[0].style.top = this.position.top + "px",
                n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
                !1
            },
            _mouseStop: function(t) {
                var r = this
                  , i = !1;
                return n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)),
                this.dropped && (i = this.dropped,
                this.dropped = !1),
                this.options.revert === "invalid" && !i || this.options.revert === "valid" && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    r._trigger("stop", t) !== !1 && r._clear()
                }) : this._trigger("stop", t) !== !1 && this._clear(),
                !1
            },
            _mouseUp: function(t) {
                return this._unblockFrames(),
                n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t),
                this.handleElement.is(t.target) && this.element.trigger("focus"),
                n.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function() {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new n.Event("mouseup",{
                    target: this.element[0]
                })) : this._clear(),
                this
            },
            _getHandle: function(t) {
                return this.options.handle ? !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
            },
            _setHandleClassName: function() {
                this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
                this._addClass(this.handleElement, "ui-draggable-handle")
            },
            _removeHandleClassName: function() {
                this._removeClass(this.handleElement, "ui-draggable-handle")
            },
            _createHelper: function(t) {
                var r = this.options
                  , u = n.isFunction(r.helper)
                  , i = u ? n(r.helper.apply(this.element[0], [t])) : r.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;
                return i.parents("body").length || i.appendTo(r.appendTo === "parent" ? this.element[0].parentNode : r.appendTo),
                u && i[0] === this.element[0] && this._setPositionRelative(),
                i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"),
                i
            },
            _setPositionRelative: function() {
                /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
            },
            _adjustOffsetFromHelper: function(t) {
                typeof t == "string" && (t = t.split(" ")),
                n.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }),
                "left"in t && (this.offset.click.left = t.left + this.margins.left),
                "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
                "top"in t && (this.offset.click.top = t.top + this.margins.top),
                "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _isRootNode: function(n) {
                return /(html|body)/i.test(n.tagName) || n === this.document[0]
            },
            _getParentOffset: function() {
                var t = this.offsetParent.offset()
                  , i = this.document[0];
                return this.cssPosition === "absolute" && this.scrollParent[0] !== i && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
                t.top += this.scrollParent.scrollTop()),
                this._isRootNode(this.offsetParent[0]) && (t = {
                    top: 0,
                    left: 0
                }),
                {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if (this.cssPosition !== "relative")
                    return {
                        top: 0,
                        left: 0
                    };
                var n = this.element.position()
                  , t = this._isRootNode(this.scrollParent[0]);
                return {
                    top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                    left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var f, t, i, r = this.options, u = this.document[0];
                if (this.relativeContainer = null,
                !r.containment) {
                    this.containment = null;
                    return
                }
                if (r.containment === "window") {
                    this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                    return
                }
                if (r.containment === "document") {
                    this.containment = [0, 0, n(u).width() - this.helperProportions.width - this.margins.left, (n(u).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                    return
                }
                if (r.containment.constructor === Array) {
                    this.containment = r.containment;
                    return
                }
                (r.containment === "parent" && (r.containment = this.helper[0].parentNode),
                t = n(r.containment),
                i = t[0],
                i) && (f = /(scroll|auto)/.test(t.css("overflow")),
                this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (f ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                this.relativeContainer = t)
            },
            _convertPositionTo: function(n, t) {
                t || (t = this.position);
                var i = n === "absolute" ? 1 : -1
                  , r = this._isRootNode(this.scrollParent[0]);
                return {
                    top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - (this.cssPosition === "fixed" ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top) * i,
                    left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - (this.cssPosition === "fixed" ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) * i
                }
            },
            _generatePosition: function(n, t) {
                var i, s, u, f, r = this.options, h = this._isRootNode(this.scrollParent[0]), e = n.pageX, o = n.pageY;
                return h && this.offset.scroll || (this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }),
                t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(),
                i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
                n.pageX - this.offset.click.left < i[0] && (e = i[0] + this.offset.click.left),
                n.pageY - this.offset.click.top < i[1] && (o = i[1] + this.offset.click.top),
                n.pageX - this.offset.click.left > i[2] && (e = i[2] + this.offset.click.left),
                n.pageY - this.offset.click.top > i[3] && (o = i[3] + this.offset.click.top)),
                r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY,
                o = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u,
                f = r.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX,
                e = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f),
                r.axis === "y" && (e = this.originalPageX),
                r.axis === "x" && (o = this.originalPageY)),
                {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
                    left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
                }
            },
            _clear: function() {
                this._removeClass(this.helper, "ui-draggable-dragging"),
                this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
                this.helper = null,
                this.cancelHelperRemoval = !1,
                this.destroyOnClear && this.destroy()
            },
            _trigger: function(t, i, r) {
                return r = r || this._uiHash(),
                n.ui.plugin.call(this, t, [i, r, this], !0),
                /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"),
                r.offset = this.positionAbs),
                n.Widget.prototype._trigger.call(this, t, i, r)
            },
            plugins: {},
            _uiHash: function() {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }),
        n.ui.plugin.add("draggable", "connectToSortable", {
            start: function(t, i, r) {
                var u = n.extend({}, i, {
                    item: r.element
                });
                r.sortables = [],
                n(r.options.connectToSortable).each(function() {
                    var i = n(this).sortable("instance");
                    i && !i.options.disabled && (r.sortables.push(i),
                    i.refreshPositions(),
                    i._trigger("activate", t, u))
                })
            },
            stop: function(t, i, r) {
                var u = n.extend({}, i, {
                    item: r.element
                });
                r.cancelHelperRemoval = !1,
                n.each(r.sortables, function() {
                    var n = this;
                    n.isOver ? (n.isOver = 0,
                    r.cancelHelperRemoval = !0,
                    n.cancelHelperRemoval = !1,
                    n._storedCSS = {
                        position: n.placeholder.css("position"),
                        top: n.placeholder.css("top"),
                        left: n.placeholder.css("left")
                    },
                    n._mouseStop(t),
                    n.options.helper = n.options._helper) : (n.cancelHelperRemoval = !0,
                    n._trigger("deactivate", t, u))
                })
            },
            drag: function(t, i, r) {
                n.each(r.sortables, function() {
                    var f = !1
                      , u = this;
                    u.positionAbs = r.positionAbs,
                    u.helperProportions = r.helperProportions,
                    u.offset.click = r.offset.click,
                    u._intersectsWith(u.containerCache) && (f = !0,
                    n.each(r.sortables, function() {
                        return this.positionAbs = r.positionAbs,
                        this.helperProportions = r.helperProportions,
                        this.offset.click = r.offset.click,
                        this !== u && this._intersectsWith(this.containerCache) && n.contains(u.element[0], this.element[0]) && (f = !1),
                        f
                    })),
                    f ? (u.isOver || (u.isOver = 1,
                    r._parent = i.helper.parent(),
                    u.currentItem = i.helper.appendTo(u.element).data("ui-sortable-item", !0),
                    u.options._helper = u.options.helper,
                    u.options.helper = function() {
                        return i.helper[0]
                    }
                    ,
                    t.target = u.currentItem[0],
                    u._mouseCapture(t, !0),
                    u._mouseStart(t, !0, !0),
                    u.offset.click.top = r.offset.click.top,
                    u.offset.click.left = r.offset.click.left,
                    u.offset.parent.left -= r.offset.parent.left - u.offset.parent.left,
                    u.offset.parent.top -= r.offset.parent.top - u.offset.parent.top,
                    r._trigger("toSortable", t),
                    r.dropped = u.element,
                    n.each(r.sortables, function() {
                        this.refreshPositions()
                    }),
                    r.currentItem = r.element,
                    u.fromOutside = r),
                    u.currentItem && (u._mouseDrag(t),
                    i.position = u.position)) : u.isOver && (u.isOver = 0,
                    u.cancelHelperRemoval = !0,
                    u.options._revert = u.options.revert,
                    u.options.revert = !1,
                    u._trigger("out", t, u._uiHash(u)),
                    u._mouseStop(t, !0),
                    u.options.revert = u.options._revert,
                    u.options.helper = u.options._helper,
                    u.placeholder && u.placeholder.remove(),
                    i.helper.appendTo(r._parent),
                    r._refreshOffsets(t),
                    i.position = r._generatePosition(t, !0),
                    r._trigger("fromSortable", t),
                    r.dropped = !1,
                    n.each(r.sortables, function() {
                        this.refreshPositions()
                    }))
                })
            }
        }),
        n.ui.plugin.add("draggable", "cursor", {
            start: function(t, i, r) {
                var u = n("body")
                  , f = r.options;
                u.css("cursor") && (f._cursor = u.css("cursor")),
                u.css("cursor", f.cursor)
            },
            stop: function(t, i, r) {
                var u = r.options;
                u._cursor && n("body").css("cursor", u._cursor)
            }
        }),
        n.ui.plugin.add("draggable", "opacity", {
            start: function(t, i, r) {
                var u = n(i.helper)
                  , f = r.options;
                u.css("opacity") && (f._opacity = u.css("opacity")),
                u.css("opacity", f.opacity)
            },
            stop: function(t, i, r) {
                var u = r.options;
                u._opacity && n(i.helper).css("opacity", u._opacity)
            }
        }),
        n.ui.plugin.add("draggable", "scroll", {
            start: function(n, t, i) {
                i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
                i.scrollParentNotHidden[0] !== i.document[0] && i.scrollParentNotHidden[0].tagName !== "HTML" && (i.overflowOffset = i.scrollParentNotHidden.offset())
            },
            drag: function(t, i, r) {
                var u = r.options
                  , o = !1
                  , e = r.scrollParentNotHidden[0]
                  , f = r.document[0];
                e !== f && e.tagName !== "HTML" ? (u.axis && u.axis === "x" || (r.overflowOffset.top + e.offsetHeight - t.pageY < u.scrollSensitivity ? e.scrollTop = o = e.scrollTop + u.scrollSpeed : t.pageY - r.overflowOffset.top < u.scrollSensitivity && (e.scrollTop = o = e.scrollTop - u.scrollSpeed)),
                u.axis && u.axis === "y" || (r.overflowOffset.left + e.offsetWidth - t.pageX < u.scrollSensitivity ? e.scrollLeft = o = e.scrollLeft + u.scrollSpeed : t.pageX - r.overflowOffset.left < u.scrollSensitivity && (e.scrollLeft = o = e.scrollLeft - u.scrollSpeed))) : (u.axis && u.axis === "x" || (t.pageY - n(f).scrollTop() < u.scrollSensitivity ? o = n(f).scrollTop(n(f).scrollTop() - u.scrollSpeed) : n(window).height() - (t.pageY - n(f).scrollTop()) < u.scrollSensitivity && (o = n(f).scrollTop(n(f).scrollTop() + u.scrollSpeed))),
                u.axis && u.axis === "y" || (t.pageX - n(f).scrollLeft() < u.scrollSensitivity ? o = n(f).scrollLeft(n(f).scrollLeft() - u.scrollSpeed) : n(window).width() - (t.pageX - n(f).scrollLeft()) < u.scrollSensitivity && (o = n(f).scrollLeft(n(f).scrollLeft() + u.scrollSpeed)))),
                o !== !1 && n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
            }
        }),
        n.ui.plugin.add("draggable", "snap", {
            start: function(t, i, r) {
                var u = r.options;
                r.snapElements = [],
                n(u.snap.constructor !== String ? u.snap.items || ":data(ui-draggable)" : u.snap).each(function() {
                    var t = n(this)
                      , i = t.offset();
                    this !== r.element[0] && r.snapElements.push({
                        item: this,
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: i.top,
                        left: i.left
                    })
                })
            },
            drag: function(t, i, r) {
                for (var e, o, s, h, c, a, l, v, w, b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) {
                    if (c = r.snapElements[u].left - r.margins.left,
                    a = c + r.snapElements[u].width,
                    l = r.snapElements[u].top - r.margins.top,
                    v = l + r.snapElements[u].height,
                    k < c - f || y > a + f || d < l - f || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item)) {
                        r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
                            snapItem: r.snapElements[u].item
                        })),
                        r.snapElements[u].snapping = !1;
                        continue
                    }
                    b.snapMode !== "inner" && (e = Math.abs(l - d) <= f,
                    o = Math.abs(v - p) <= f,
                    s = Math.abs(c - k) <= f,
                    h = Math.abs(a - y) <= f,
                    e && (i.position.top = r._convertPositionTo("relative", {
                        top: l - r.helperProportions.height,
                        left: 0
                    }).top),
                    o && (i.position.top = r._convertPositionTo("relative", {
                        top: v,
                        left: 0
                    }).top),
                    s && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c - r.helperProportions.width
                    }).left),
                    h && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: a
                    }).left)),
                    w = e || o || s || h,
                    b.snapMode !== "outer" && (e = Math.abs(l - p) <= f,
                    o = Math.abs(v - d) <= f,
                    s = Math.abs(c - y) <= f,
                    h = Math.abs(a - k) <= f,
                    e && (i.position.top = r._convertPositionTo("relative", {
                        top: l,
                        left: 0
                    }).top),
                    o && (i.position.top = r._convertPositionTo("relative", {
                        top: v - r.helperProportions.height,
                        left: 0
                    }).top),
                    s && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: c
                    }).left),
                    h && (i.position.left = r._convertPositionTo("relative", {
                        top: 0,
                        left: a - r.helperProportions.width
                    }).left)),
                    !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
                        snapItem: r.snapElements[u].item
                    })),
                    r.snapElements[u].snapping = e || o || s || h || w
                }
            }
        }),
        n.ui.plugin.add("draggable", "stack", {
            start: function(t, i, r) {
                var f, e = r.options, u = n.makeArray(n(e.stack)).sort(function(t, i) {
                    return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
                });
                u.length && (f = parseInt(n(u[0]).css("zIndex"), 10) || 0,
                n(u).each(function(t) {
                    n(this).css("zIndex", f + t)
                }),
                this.css("zIndex", f + u.length))
            }
        }),
        n.ui.plugin.add("draggable", "zIndex", {
            start: function(t, i, r) {
                var u = n(i.helper)
                  , f = r.options;
                u.css("zIndex") && (f._zIndex = u.css("zIndex")),
                u.css("zIndex", f.zIndex)
            },
            stop: function(t, i, r) {
                var u = r.options;
                u._zIndex && n(i.helper).css("zIndex", u._zIndex)
            }
        }),
        it = n.ui.draggable,
        n.widget("ui.resizable", n.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                classes: {
                    "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
                },
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 90,
                resize: null,
                start: null,
                stop: null
            },
            _num: function(n) {
                return parseFloat(n) || 0
            },
            _isNumber: function(n) {
                return !isNaN(parseFloat(n))
            },
            _hasScroll: function(t, i) {
                if (n(t).css("overflow") === "hidden")
                    return !1;
                var r = i && i === "left" ? "scrollLeft" : "scrollTop"
                  , u = !1;
                return t[r] > 0 ? !0 : (t[r] = 1,
                u = t[r] > 0,
                t[r] = 0,
                u)
            },
            _create: function() {
                var r, t = this.options, i = this;
                if (this._addClass("ui-resizable"),
                n.extend(this, {
                    _aspectRatio: !!t.aspectRatio,
                    aspectRatio: t.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
                }),
                this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })),
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")),
                this.elementIsWrapper = !0,
                r = {
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom"),
                    marginLeft: this.originalElement.css("marginLeft")
                },
                this.element.css(r),
                this.originalElement.css("margin", 0),
                this.originalResizeStyle = this.originalElement.css("resize"),
                this.originalElement.css("resize", "none"),
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })),
                this.originalElement.css(r),
                this._proportionallyResize()),
                this._setupHandles(),
                t.autoHide)
                    n(this.element).on("mouseenter", function() {
                        t.disabled || (i._removeClass("ui-resizable-autohide"),
                        i._handles.show())
                    }).on("mouseleave", function() {
                        t.disabled || i.resizing || (i._addClass("ui-resizable-autohide"),
                        i._handles.hide())
                    });
                this._mouseInit()
            },
            _destroy: function() {
                this._mouseDestroy();
                var t, i = function(t) {
                    n(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
                };
                return this.elementIsWrapper && (i(this.element),
                t = this.element,
                this.originalElement.css({
                    position: t.css("position"),
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: t.css("top"),
                    left: t.css("left")
                }).insertAfter(t),
                t.remove()),
                this.originalElement.css("resize", this.originalResizeStyle),
                i(this.originalElement),
                this
            },
            _setOption: function(n, t) {
                this._super(n, t);
                switch (n) {
                case "handles":
                    this._removeHandles(),
                    this._setupHandles()
                }
            },
            _setupHandles: function() {
                var u = this.options, i, r, f, o, t, e = this;
                if (this.handles = u.handles || (n(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"),
                this._handles = n(),
                this.handles.constructor === String)
                    for (this.handles === "all" && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                    f = this.handles.split(","),
                    this.handles = {},
                    r = 0; r < f.length; r++)
                        i = n.trim(f[r]),
                        o = "ui-resizable-" + i,
                        t = n("<div>"),
                        this._addClass(t, "ui-resizable-handle " + o),
                        t.css({
                            zIndex: u.zIndex
                        }),
                        this.handles[i] = ".ui-resizable-" + i,
                        this.element.append(t);
                this._renderAxis = function(t) {
                    var i, r, u, f;
                    t = t || this.element;
                    for (i in this.handles)
                        this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = n(this.handles[i]),
                        this._on(this.handles[i], {
                            mousedown: e._mouseDown
                        })),
                        this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (r = n(this.handles[i], this.element),
                        f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(),
                        u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""),
                        t.css(u, f),
                        this._proportionallyResize()),
                        this._handles = this._handles.add(this.handles[i])
                }
                ,
                this._renderAxis(this.element),
                this._handles = this._handles.add(this.element.find(".ui-resizable-handle")),
                this._handles.disableSelection();
                this._handles.on("mouseover", function() {
                    e.resizing || (this.className && (t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                    e.axis = t && t[1] ? t[1] : "se")
                });
                u.autoHide && (this._handles.hide(),
                this._addClass("ui-resizable-autohide"))
            },
            _removeHandles: function() {
                this._handles.remove()
            },
            _mouseCapture: function(t) {
                var r, i, u = !1;
                for (r in this.handles)
                    i = n(this.handles[r])[0],
                    (i === t.target || n.contains(i, t.target)) && (u = !0);
                return !this.options.disabled && u
            },
            _mouseStart: function(t) {
                var u, f, e, r = this.options, i = this.element;
                return this.resizing = !0,
                this._renderProxy(),
                u = this._num(this.helper.css("left")),
                f = this._num(this.helper.css("top")),
                r.containment && (u += n(r.containment).scrollLeft() || 0,
                f += n(r.containment).scrollTop() || 0),
                this.offset = this.helper.offset(),
                this.position = {
                    left: u,
                    top: f
                },
                this.size = this._helper ? {
                    width: this.helper.width(),
                    height: this.helper.height()
                } : {
                    width: i.width(),
                    height: i.height()
                },
                this.originalSize = this._helper ? {
                    width: i.outerWidth(),
                    height: i.outerHeight()
                } : {
                    width: i.width(),
                    height: i.height()
                },
                this.sizeDiff = {
                    width: i.outerWidth() - i.width(),
                    height: i.outerHeight() - i.height()
                },
                this.originalPosition = {
                    left: u,
                    top: f
                },
                this.originalMousePosition = {
                    left: t.pageX,
                    top: t.pageY
                },
                this.aspectRatio = typeof r.aspectRatio == "number" ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
                e = n(".ui-resizable-" + this.axis).css("cursor"),
                n("body").css("cursor", e === "auto" ? this.axis + "-resize" : e),
                this._addClass("ui-resizable-resizing"),
                this._propagate("start", t),
                !0
            },
            _mouseDrag: function(t) {
                var i, r, u = this.originalMousePosition, e = this.axis, o = t.pageX - u.left || 0, s = t.pageY - u.top || 0, f = this._change[e];
                return (this._updatePrevProperties(),
                !f) ? !1 : (i = f.apply(this, [t, o, s]),
                this._updateVirtualBoundaries(t.shiftKey),
                (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)),
                i = this._respectSize(i, t),
                this._updateCache(i),
                this._propagate("resize", t),
                r = this._applyChanges(),
                !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
                n.isEmptyObject(r) || (this._updatePrevProperties(),
                this._trigger("resize", t, this.ui()),
                this._applyChanges()),
                !1)
            },
            _mouseStop: function(t) {
                this.resizing = !1;
                var r, u, f, e, o, s, h, c = this.options, i = this;
                return this._helper && (r = this._proportionallyResizeElements,
                u = r.length && /textarea/i.test(r[0].nodeName),
                f = u && this._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
                e = u ? 0 : i.sizeDiff.width,
                o = {
                    width: i.helper.width() - e,
                    height: i.helper.height() - f
                },
                s = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                h = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null,
                c.animate || this.element.css(n.extend(o, {
                    top: h,
                    left: s
                })),
                i.helper.height(i.size.height),
                i.helper.width(i.size.width),
                this._helper && !c.animate && this._proportionallyResize()),
                n("body").css("cursor", "auto"),
                this._removeClass("ui-resizable-resizing"),
                this._propagate("stop", t),
                this._helper && this.helper.remove(),
                !1
            },
            _updatePrevProperties: function() {
                this.prevPosition = {
                    top: this.position.top,
                    left: this.position.left
                },
                this.prevSize = {
                    width: this.size.width,
                    height: this.size.height
                }
            },
            _applyChanges: function() {
                var n = {};
                return this.position.top !== this.prevPosition.top && (n.top = this.position.top + "px"),
                this.position.left !== this.prevPosition.left && (n.left = this.position.left + "px"),
                this.size.width !== this.prevSize.width && (n.width = this.size.width + "px"),
                this.size.height !== this.prevSize.height && (n.height = this.size.height + "px"),
                this.helper.css(n),
                n
            },
            _updateVirtualBoundaries: function(n) {
                var r, u, f, e, t, i = this.options;
                t = {
                    minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
                    maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : Infinity,
                    minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
                    maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : Infinity
                },
                (this._aspectRatio || n) && (r = t.minHeight * this.aspectRatio,
                f = t.minWidth / this.aspectRatio,
                u = t.maxHeight * this.aspectRatio,
                e = t.maxWidth / this.aspectRatio,
                r > t.minWidth && (t.minWidth = r),
                f > t.minHeight && (t.minHeight = f),
                u < t.maxWidth && (t.maxWidth = u),
                e < t.maxHeight && (t.maxHeight = e)),
                this._vBoundaries = t
            },
            _updateCache: function(n) {
                this.offset = this.helper.offset(),
                this._isNumber(n.left) && (this.position.left = n.left),
                this._isNumber(n.top) && (this.position.top = n.top),
                this._isNumber(n.height) && (this.size.height = n.height),
                this._isNumber(n.width) && (this.size.width = n.width)
            },
            _updateRatio: function(n) {
                var t = this.position
                  , i = this.size
                  , r = this.axis;
                return this._isNumber(n.height) ? n.width = n.height * this.aspectRatio : this._isNumber(n.width) && (n.height = n.width / this.aspectRatio),
                r === "sw" && (n.left = t.left + (i.width - n.width),
                n.top = null),
                r === "nw" && (n.top = t.top + (i.height - n.height),
                n.left = t.left + (i.width - n.width)),
                n
            },
            _respectSize: function(n) {
                var t = this._vBoundaries
                  , i = this.axis
                  , r = this._isNumber(n.width) && t.maxWidth && t.maxWidth < n.width
                  , u = this._isNumber(n.height) && t.maxHeight && t.maxHeight < n.height
                  , f = this._isNumber(n.width) && t.minWidth && t.minWidth > n.width
                  , e = this._isNumber(n.height) && t.minHeight && t.minHeight > n.height
                  , o = this.originalPosition.left + this.originalSize.width
                  , s = this.originalPosition.top + this.originalSize.height
                  , h = /sw|nw|w/.test(i)
                  , c = /nw|ne|n/.test(i);
                return f && (n.width = t.minWidth),
                e && (n.height = t.minHeight),
                r && (n.width = t.maxWidth),
                u && (n.height = t.maxHeight),
                f && h && (n.left = o - t.minWidth),
                r && h && (n.left = o - t.maxWidth),
                e && c && (n.top = s - t.minHeight),
                u && c && (n.top = s - t.maxHeight),
                n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null,
                n
            },
            _getPaddingPlusBorderDimensions: function(n) {
                for (var t = 0, i = [], r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")]; t < 4; t++)
                    i[t] = parseFloat(r[t]) || 0,
                    i[t] += parseFloat(u[t]) || 0;
                return {
                    height: i[0] + i[2],
                    width: i[1] + i[3]
                }
            },
            _proportionallyResize: function() {
                if (this._proportionallyResizeElements.length)
                    for (var n, t = 0, i = this.helper || this.element; t < this._proportionallyResizeElements.length; t++)
                        n = this._proportionallyResizeElements[t],
                        this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(n)),
                        n.css({
                            height: i.height() - this.outerDimensions.height || 0,
                            width: i.width() - this.outerDimensions.width || 0
                        })
            },
            _renderProxy: function() {
                var t = this.element
                  , i = this.options;
                this.elementOffset = t.offset(),
                this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"),
                this._addClass(this.helper, this._helper),
                this.helper.css({
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++i.zIndex
                }),
                this.helper.appendTo("body").disableSelection()) : this.helper = this.element
            },
            _change: {
                e: function(n, t) {
                    return {
                        width: this.originalSize.width + t
                    }
                },
                w: function(n, t) {
                    var i = this.originalSize
                      , r = this.originalPosition;
                    return {
                        left: r.left + t,
                        width: i.width - t
                    }
                },
                n: function(n, t, i) {
                    var r = this.originalSize
                      , u = this.originalPosition;
                    return {
                        top: u.top + i,
                        height: r.height - i
                    }
                },
                s: function(n, t, i) {
                    return {
                        height: this.originalSize.height + i
                    }
                },
                se: function(t, i, r) {
                    return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
                },
                sw: function(t, i, r) {
                    return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
                },
                ne: function(t, i, r) {
                    return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
                },
                nw: function(t, i, r) {
                    return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
                }
            },
            _propagate: function(t, i) {
                n.ui.plugin.call(this, t, [i, this.ui()]),
                t !== "resize" && this._trigger(t, i, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }),
        n.ui.plugin.add("resizable", "animate", {
            stop: function(t) {
                var i = n(this).resizable("instance")
                  , u = i.options
                  , r = i._proportionallyResizeElements
                  , f = r.length && /textarea/i.test(r[0].nodeName)
                  , s = f && i._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height
                  , h = f ? 0 : i.sizeDiff.width
                  , c = {
                    width: i.size.width - h,
                    height: i.size.height - s
                }
                  , e = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null
                  , o = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
                i.element.animate(n.extend(c, o && e ? {
                    top: o,
                    left: e
                } : {}), {
                    duration: u.animateDuration,
                    easing: u.animateEasing,
                    step: function() {
                        var u = {
                            width: parseFloat(i.element.css("width")),
                            height: parseFloat(i.element.css("height")),
                            top: parseFloat(i.element.css("top")),
                            left: parseFloat(i.element.css("left"))
                        };
                        r && r.length && n(r[0]).css({
                            width: u.width,
                            height: u.height
                        }),
                        i._updateCache(u),
                        i._propagate("resize", t)
                    }
                })
            }
        }),
        n.ui.plugin.add("resizable", "containment", {
            start: function() {
                var r, f, e, o, s, h, c, t = n(this).resizable("instance"), l = t.options, a = t.element, u = l.containment, i = u instanceof n ? u.get(0) : /parent/.test(u) ? a.parent().get(0) : u;
                i && (t.containerElement = n(i),
                /document/.test(u) || u === document ? (t.containerOffset = {
                    left: 0,
                    top: 0
                },
                t.containerPosition = {
                    left: 0,
                    top: 0
                },
                t.parentData = {
                    element: n(document),
                    left: 0,
                    top: 0,
                    width: n(document).width(),
                    height: n(document).height() || document.body.parentNode.scrollHeight
                }) : (r = n(i),
                f = [],
                n(["Top", "Right", "Left", "Bottom"]).each(function(n, i) {
                    f[n] = t._num(r.css("padding" + i))
                }),
                t.containerOffset = r.offset(),
                t.containerPosition = r.position(),
                t.containerSize = {
                    height: r.innerHeight() - f[3],
                    width: r.innerWidth() - f[1]
                },
                e = t.containerOffset,
                o = t.containerSize.height,
                s = t.containerSize.width,
                h = t._hasScroll(i, "left") ? i.scrollWidth : s,
                c = t._hasScroll(i) ? i.scrollHeight : o,
                t.parentData = {
                    element: i,
                    left: e.left,
                    top: e.top,
                    width: h,
                    height: c
                }))
            },
            resize: function(t) {
                var o, s, h, c, i = n(this).resizable("instance"), v = i.options, r = i.containerOffset, l = i.position, f = i._aspectRatio || t.shiftKey, e = {
                    top: 0,
                    left: 0
                }, a = i.containerElement, u = !0;
                a[0] !== document && /static/.test(a.css("position")) && (e = r),
                l.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - e.left),
                f && (i.size.height = i.size.width / i.aspectRatio,
                u = !1),
                i.position.left = v.helper ? r.left : 0),
                l.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top),
                f && (i.size.width = i.size.height * i.aspectRatio,
                u = !1),
                i.position.top = i._helper ? r.top : 0),
                h = i.containerElement.get(0) === i.element.parent().get(0),
                c = /relative|absolute/.test(i.containerElement.css("position")),
                h && c ? (i.offset.left = i.parentData.left + i.position.left,
                i.offset.top = i.parentData.top + i.position.top) : (i.offset.left = i.element.offset().left,
                i.offset.top = i.element.offset().top),
                o = Math.abs(i.sizeDiff.width + (i._helper ? i.offset.left - e.left : i.offset.left - r.left)),
                s = Math.abs(i.sizeDiff.height + (i._helper ? i.offset.top - e.top : i.offset.top - r.top)),
                o + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - o,
                f && (i.size.height = i.size.width / i.aspectRatio,
                u = !1)),
                s + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - s,
                f && (i.size.width = i.size.height * i.aspectRatio,
                u = !1)),
                u || (i.position.left = i.prevPosition.left,
                i.position.top = i.prevPosition.top,
                i.size.width = i.prevSize.width,
                i.size.height = i.prevSize.height)
            },
            stop: function() {
                var t = n(this).resizable("instance")
                  , r = t.options
                  , u = t.containerOffset
                  , f = t.containerPosition
                  , e = t.containerElement
                  , i = n(t.helper)
                  , o = i.offset()
                  , s = i.outerWidth() - t.sizeDiff.width
                  , h = i.outerHeight() - t.sizeDiff.height;
                t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
                    left: o.left - f.left - u.left,
                    width: s,
                    height: h
                }),
                t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
                    left: o.left - f.left - u.left,
                    width: s,
                    height: h
                })
            }
        }),
        n.ui.plugin.add("resizable", "alsoResize", {
            start: function() {
                var t = n(this).resizable("instance")
                  , i = t.options;
                n(i.alsoResize).each(function() {
                    var t = n(this);
                    t.data("ui-resizable-alsoresize", {
                        width: parseFloat(t.width()),
                        height: parseFloat(t.height()),
                        left: parseFloat(t.css("left")),
                        top: parseFloat(t.css("top"))
                    })
                })
            },
            resize: function(t, i) {
                var r = n(this).resizable("instance")
                  , e = r.options
                  , u = r.originalSize
                  , f = r.originalPosition
                  , o = {
                    height: r.size.height - u.height || 0,
                    width: r.size.width - u.width || 0,
                    top: r.position.top - f.top || 0,
                    left: r.position.left - f.left || 0
                };
                n(e.alsoResize).each(function() {
                    var t = n(this)
                      , u = n(this).data("ui-resizable-alsoresize")
                      , r = {}
                      , f = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    n.each(f, function(n, t) {
                        var i = (u[t] || 0) + (o[t] || 0);
                        i && i >= 0 && (r[t] = i || null)
                    }),
                    t.css(r)
                })
            },
            stop: function() {
                n(this).removeData("ui-resizable-alsoresize")
            }
        }),
        n.ui.plugin.add("resizable", "ghost", {
            start: function() {
                var t = n(this).resizable("instance")
                  , i = t.size;
                t.ghost = t.originalElement.clone(),
                t.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: i.height,
                    width: i.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }),
                t._addClass(t.ghost, "ui-resizable-ghost"),
                n.uiBackCompat !== !1 && typeof t.options.ghost == "string" && t.ghost.addClass(this.options.ghost),
                t.ghost.appendTo(t.helper)
            },
            resize: function() {
                var t = n(this).resizable("instance");
                t.ghost && t.ghost.css({
                    position: "relative",
                    height: t.size.height,
                    width: t.size.width
                })
            },
            stop: function() {
                var t = n(this).resizable("instance");
                t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
            }
        }),
        n.ui.plugin.add("resizable", "grid", {
            resize: function() {
                var h, t = n(this).resizable("instance"), i = t.options, y = t.size, o = t.originalSize, s = t.originalPosition, c = t.axis, l = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid, f = l[0] || 1, e = l[1] || 1, a = Math.round((y.width - o.width) / f) * f, v = Math.round((y.height - o.height) / e) * e, r = o.width + a, u = o.height + v, p = i.maxWidth && i.maxWidth < r, w = i.maxHeight && i.maxHeight < u, b = i.minWidth && i.minWidth > r, k = i.minHeight && i.minHeight > u;
                i.grid = l,
                b && (r += f),
                k && (u += e),
                p && (r -= f),
                w && (u -= e),
                /^(se|s|e)$/.test(c) ? (t.size.width = r,
                t.size.height = u) : /^(ne)$/.test(c) ? (t.size.width = r,
                t.size.height = u,
                t.position.top = s.top - v) : /^(sw)$/.test(c) ? (t.size.width = r,
                t.size.height = u,
                t.position.left = s.left - a) : ((u - e <= 0 || r - f <= 0) && (h = t._getPaddingPlusBorderDimensions(this)),
                u - e > 0 ? (t.size.height = u,
                t.position.top = s.top - v) : (u = e - h.height,
                t.size.height = u,
                t.position.top = s.top + o.height - u),
                r - f > 0 ? (t.size.width = r,
                t.position.left = s.left - a) : (r = f - h.width,
                t.size.width = r,
                t.position.left = s.left + o.width - r))
            }
        }),
        rt = n.ui.resizable,
        n.widget("ui.dialog", {
            version: "1.12.1",
            options: {
                appendTo: "body",
                autoOpen: !0,
                buttons: [],
                classes: {
                    "ui-dialog": "ui-corner-all",
                    "ui-dialog-titlebar": "ui-corner-all"
                },
                closeOnEscape: !0,
                closeText: "Close",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: null,
                maxWidth: null,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    of: window,
                    collision: "fit",
                    using: function(t) {
                        var i = n(this).css(t).offset().top;
                        i < 0 && n(this).css("top", t.top - i)
                    }
                },
                resizable: !0,
                show: null,
                title: null,
                width: 300,
                beforeClose: null,
                close: null,
                drag: null,
                dragStart: null,
                dragStop: null,
                focus: null,
                open: null,
                resize: null,
                resizeStart: null,
                resizeStop: null
            },
            sizeRelatedOptions: {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            },
            resizableRelatedOptions: {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            },
            _create: function() {
                this.originalCss = {
                    display: this.element[0].style.display,
                    width: this.element[0].style.width,
                    minHeight: this.element[0].style.minHeight,
                    maxHeight: this.element[0].style.maxHeight,
                    height: this.element[0].style.height
                },
                this.originalPosition = {
                    parent: this.element.parent(),
                    index: this.element.parent().children().index(this.element)
                },
                this.originalTitle = this.element.attr("title"),
                this.options.title == null && this.originalTitle != null && (this.options.title = this.originalTitle),
                this.options.disabled && (this.options.disabled = !1),
                this._createWrapper(),
                this.element.show().removeAttr("title").appendTo(this.uiDialog),
                this._addClass("ui-dialog-content", "ui-widget-content"),
                this._createTitlebar(),
                this._createButtonPane(),
                this.options.draggable && n.fn.draggable && this._makeDraggable(),
                this.options.resizable && n.fn.resizable && this._makeResizable(),
                this._isOpen = !1,
                this._trackFocus()
            },
            _init: function() {
                this.options.autoOpen && this.open()
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
            },
            _destroy: function() {
                var n, t = this.originalPosition;
                this._untrackInstance(),
                this._destroyOverlay(),
                this.element.removeUniqueId().css(this.originalCss).detach(),
                this.uiDialog.remove(),
                this.originalTitle && this.element.attr("title", this.originalTitle),
                n = t.parent.children().eq(t.index),
                n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
            },
            widget: function() {
                return this.uiDialog
            },
            disable: n.noop,
            enable: n.noop,
            close: function(t) {
                var i = this;
                this._isOpen && this._trigger("beforeClose", t) !== !1 && (this._isOpen = !1,
                this._focusedElement = null,
                this._destroyOverlay(),
                this._untrackInstance(),
                this.opener.filter(":focusable").trigger("focus").length || n.ui.safeBlur(n.ui.safeActiveElement(this.document[0])),
                this._hide(this.uiDialog, this.options.hide, function() {
                    i._trigger("close", t)
                }))
            },
            isOpen: function() {
                return this._isOpen
            },
            moveToTop: function() {
                this._moveToTop()
            },
            _moveToTop: function(t, i) {
                var r = !1
                  , f = this.uiDialog.siblings(".ui-front:visible").map(function() {
                    return +n(this).css("z-index")
                }).get()
                  , u = Math.max.apply(null, f);
                return u >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", u + 1),
                r = !0),
                r && !i && this._trigger("focus", t),
                r
            },
            open: function() {
                var t = this;
                if (this._isOpen) {
                    this._moveToTop() && this._focusTabbable();
                    return
                }
                this._isOpen = !0,
                this.opener = n(n.ui.safeActiveElement(this.document[0])),
                this._size(),
                this._position(),
                this._createOverlay(),
                this._moveToTop(null, !0),
                this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
                this._show(this.uiDialog, this.options.show, function() {
                    t._focusTabbable(),
                    t._trigger("focus")
                }),
                this._makeFocusTarget(),
                this._trigger("open")
            },
            _focusTabbable: function() {
                var n = this._focusedElement;
                n || (n = this.element.find("[autofocus]")),
                n.length || (n = this.element.find(":tabbable")),
                n.length || (n = this.uiDialogButtonPane.find(":tabbable")),
                n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable")),
                n.length || (n = this.uiDialog),
                n.eq(0).trigger("focus")
            },
            _keepFocus: function(t) {
                function i() {
                    var t = n.ui.safeActiveElement(this.document[0])
                      , i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
                    i || this._focusTabbable()
                }
                t.preventDefault(),
                i.call(this),
                this._delay(i)
            },
            _createWrapper: function() {
                this.uiDialog = n("<div>").hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo()),
                this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"),
                this._on(this.uiDialog, {
                    keydown: function(t) {
                        if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE) {
                            t.preventDefault(),
                            this.close(t);
                            return
                        }
                        if (t.keyCode === n.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                            var i = this.uiDialog.find(":tabbable")
                              , r = i.filter(":first")
                              , u = i.filter(":last");
                            t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? (t.target === r[0] || t.target === this.uiDialog[0]) && t.shiftKey && (this._delay(function() {
                                u.trigger("focus")
                            }),
                            t.preventDefault()) : (this._delay(function() {
                                r.trigger("focus")
                            }),
                            t.preventDefault())
                        }
                    },
                    mousedown: function(n) {
                        this._moveToTop(n) && this._focusTabbable()
                    }
                }),
                this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                    "aria-describedby": this.element.uniqueId().attr("id")
                })
            },
            _createTitlebar: function() {
                var t;
                this.uiDialogTitlebar = n("<div>"),
                this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"),
                this._on(this.uiDialogTitlebar, {
                    mousedown: function(t) {
                        n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                    }
                }),
                this.uiDialogTitlebarClose = n("<button type='button'><\/button>").button({
                    label: n("<a>").text(this.options.closeText).html(),
                    icon: "ui-icon-closethick",
                    showLabel: !1
                }).appendTo(this.uiDialogTitlebar),
                this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"),
                this._on(this.uiDialogTitlebarClose, {
                    click: function(n) {
                        n.preventDefault(),
                        this.close(n)
                    }
                }),
                t = n("<span>").uniqueId().prependTo(this.uiDialogTitlebar),
                this._addClass(t, "ui-dialog-title"),
                this._title(t),
                this.uiDialogTitlebar.prependTo(this.uiDialog),
                this.uiDialog.attr({
                    "aria-labelledby": t.attr("id")
                })
            },
            _title: function(n) {
                this.options.title ? n.text(this.options.title) : n.html("&#160;")
            },
            _createButtonPane: function() {
                this.uiDialogButtonPane = n("<div>"),
                this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"),
                this.uiButtonSet = n("<div>").appendTo(this.uiDialogButtonPane),
                this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
                this._createButtons()
            },
            _createButtons: function() {
                var i = this
                  , t = this.options.buttons;
                if (this.uiDialogButtonPane.remove(),
                this.uiButtonSet.empty(),
                n.isEmptyObject(t) || n.isArray(t) && !t.length) {
                    this._removeClass(this.uiDialog, "ui-dialog-buttons");
                    return
                }
                n.each(t, function(t, r) {
                    var u, f;
                    r = n.isFunction(r) ? {
                        click: r,
                        text: t
                    } : r,
                    r = n.extend({
                        type: "button"
                    }, r),
                    u = r.click,
                    f = {
                        icon: r.icon,
                        iconPosition: r.iconPosition,
                        showLabel: r.showLabel,
                        icons: r.icons,
                        text: r.text
                    },
                    delete r.click,
                    delete r.icon,
                    delete r.iconPosition,
                    delete r.showLabel,
                    delete r.icons,
                    typeof r.text == "boolean" && delete r.text;
                    n("<button><\/button>", r).button(f).appendTo(i.uiButtonSet).on("click", function() {
                        u.apply(i.element[0], arguments)
                    })
                }),
                this._addClass(this.uiDialog, "ui-dialog-buttons"),
                this.uiDialogButtonPane.appendTo(this.uiDialog)
            },
            _makeDraggable: function() {
                function i(n) {
                    return {
                        position: n.position,
                        offset: n.offset
                    }
                }
                var t = this
                  , r = this.options;
                this.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function(r, u) {
                        t._addClass(n(this), "ui-dialog-dragging"),
                        t._blockFrames(),
                        t._trigger("dragStart", r, i(u))
                    },
                    drag: function(n, r) {
                        t._trigger("drag", n, i(r))
                    },
                    stop: function(u, f) {
                        var e = f.offset.left - t.document.scrollLeft()
                          , o = f.offset.top - t.document.scrollTop();
                        r.position = {
                            my: "left top",
                            at: "left" + (e >= 0 ? "+" : "") + e + " top" + (o >= 0 ? "+" : "") + o,
                            of: t.window
                        },
                        t._removeClass(n(this), "ui-dialog-dragging"),
                        t._unblockFrames(),
                        t._trigger("dragStop", u, i(f))
                    }
                })
            },
            _makeResizable: function() {
                function r(n) {
                    return {
                        originalPosition: n.originalPosition,
                        originalSize: n.originalSize,
                        position: n.position,
                        size: n.size
                    }
                }
                var t = this
                  , i = this.options
                  , u = i.resizable
                  , f = this.uiDialog.css("position")
                  , e = typeof u == "string" ? u : "n,e,s,w,se,sw,ne,nw";
                this.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: this.element,
                    maxWidth: i.maxWidth,
                    maxHeight: i.maxHeight,
                    minWidth: i.minWidth,
                    minHeight: this._minHeight(),
                    handles: e,
                    start: function(i, u) {
                        t._addClass(n(this), "ui-dialog-resizing"),
                        t._blockFrames(),
                        t._trigger("resizeStart", i, r(u))
                    },
                    resize: function(n, i) {
                        t._trigger("resize", n, r(i))
                    },
                    stop: function(u, f) {
                        var e = t.uiDialog.offset()
                          , o = e.left - t.document.scrollLeft()
                          , s = e.top - t.document.scrollTop();
                        i.height = t.uiDialog.height(),
                        i.width = t.uiDialog.width(),
                        i.position = {
                            my: "left top",
                            at: "left" + (o >= 0 ? "+" : "") + o + " top" + (s >= 0 ? "+" : "") + s,
                            of: t.window
                        },
                        t._removeClass(n(this), "ui-dialog-resizing"),
                        t._unblockFrames(),
                        t._trigger("resizeStop", u, r(f))
                    }
                }).css("position", f)
            },
            _trackFocus: function() {
                this._on(this.widget(), {
                    focusin: function(t) {
                        this._makeFocusTarget(),
                        this._focusedElement = n(t.target)
                    }
                })
            },
            _makeFocusTarget: function() {
                this._untrackInstance(),
                this._trackingInstances().unshift(this)
            },
            _untrackInstance: function() {
                var t = this._trackingInstances()
                  , i = n.inArray(this, t);
                i !== -1 && t.splice(i, 1)
            },
            _trackingInstances: function() {
                var n = this.document.data("ui-dialog-instances");
                return n || (n = [],
                this.document.data("ui-dialog-instances", n)),
                n
            },
            _minHeight: function() {
                var n = this.options;
                return n.height === "auto" ? n.minHeight : Math.min(n.minHeight, n.height)
            },
            _position: function() {
                var n = this.uiDialog.is(":visible");
                n || this.uiDialog.show(),
                this.uiDialog.position(this.options.position),
                n || this.uiDialog.hide()
            },
            _setOptions: function(t) {
                var i = this
                  , r = !1
                  , u = {};
                n.each(t, function(n, t) {
                    i._setOption(n, t),
                    n in i.sizeRelatedOptions && (r = !0),
                    n in i.resizableRelatedOptions && (u[n] = t)
                }),
                r && (this._size(),
                this._position()),
                this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", u)
            },
            _setOption: function(t, i) {
                var f, u, r = this.uiDialog;
                t !== "disabled" && (this._super(t, i),
                t === "appendTo" && this.uiDialog.appendTo(this._appendTo()),
                t === "buttons" && this._createButtons(),
                t === "closeText" && this.uiDialogTitlebarClose.button({
                    label: n("<a>").text("" + this.options.closeText).html()
                }),
                t === "draggable" && (f = r.is(":data(ui-draggable)"),
                f && !i && r.draggable("destroy"),
                !f && i && this._makeDraggable()),
                t === "position" && this._position(),
                t === "resizable" && (u = r.is(":data(ui-resizable)"),
                u && !i && r.resizable("destroy"),
                u && typeof i == "string" && r.resizable("option", "handles", i),
                u || i === !1 || this._makeResizable()),
                t === "title" && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
            },
            _size: function() {
                var t, i, r, n = this.options;
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    height: 0
                }),
                n.minWidth > n.width && (n.width = n.minWidth),
                t = this.uiDialog.css({
                    height: "auto",
                    width: n.width
                }).outerHeight(),
                i = Math.max(0, n.minHeight - t),
                r = typeof n.maxHeight == "number" ? Math.max(0, n.maxHeight - t) : "none",
                n.height === "auto" ? this.element.css({
                    minHeight: i,
                    maxHeight: r,
                    height: "auto"
                }) : this.element.height(Math.max(0, n.height - t)),
                this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            },
            _blockFrames: function() {
                this.iframeBlocks = this.document.find("iframe").map(function() {
                    var t = n(this);
                    return n("<div>").css({
                        position: "absolute",
                        width: t.outerWidth(),
                        height: t.outerHeight()
                    }).appendTo(t.parent()).offset(t.offset())[0]
                })
            },
            _unblockFrames: function() {
                this.iframeBlocks && (this.iframeBlocks.remove(),
                delete this.iframeBlocks)
            },
            _allowInteraction: function(t) {
                return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length
            },
            _createOverlay: function() {
                if (this.options.modal) {
                    var t = !0;
                    this._delay(function() {
                        t = !1
                    }),
                    this.document.data("ui-dialog-overlays") || this._on(this.document, {
                        focusin: function(n) {
                            t || this._allowInteraction(n) || (n.preventDefault(),
                            this._trackingInstances()[0]._focusTabbable())
                        }
                    }),
                    this.overlay = n("<div>").appendTo(this._appendTo()),
                    this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
                    this._on(this.overlay, {
                        mousedown: "_keepFocus"
                    }),
                    this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
                }
            },
            _destroyOverlay: function() {
                if (this.options.modal && this.overlay) {
                    var n = this.document.data("ui-dialog-overlays") - 1;
                    n ? this.document.data("ui-dialog-overlays", n) : (this._off(this.document, "focusin"),
                    this.document.removeData("ui-dialog-overlays")),
                    this.overlay.remove(),
                    this.overlay = null
                }
            }
        }),
        n.uiBackCompat !== !1 && n.widget("ui.dialog", n.ui.dialog, {
            options: {
                dialogClass: ""
            },
            _createWrapper: function() {
                this._super(),
                this.uiDialog.addClass(this.options.dialogClass)
            },
            _setOption: function(n, t) {
                n === "dialogClass" && this.uiDialog.removeClass(this.options.dialogClass).addClass(t),
                this._superApply(arguments)
            }
        }),
        ut = n.ui.dialog,
        n.widget("ui.droppable", {
            version: "1.12.1",
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                addClasses: !0,
                greedy: !1,
                scope: "default",
                tolerance: "intersect",
                activate: null,
                deactivate: null,
                drop: null,
                out: null,
                over: null
            },
            _create: function() {
                var t, i = this.options, r = i.accept;
                this.isover = !1,
                this.isout = !0,
                this.accept = n.isFunction(r) ? r : function(n) {
                    return n.is(r)
                }
                ,
                this.proportions = function() {
                    if (arguments.length)
                        t = arguments[0];
                    else
                        return t ? t : t = {
                            width: this.element[0].offsetWidth,
                            height: this.element[0].offsetHeight
                        }
                }
                ,
                this._addToManager(i.scope),
                i.addClasses && this._addClass("ui-droppable")
            },
            _addToManager: function(t) {
                n.ui.ddmanager.droppables[t] = n.ui.ddmanager.droppables[t] || [],
                n.ui.ddmanager.droppables[t].push(this)
            },
            _splice: function(n) {
                for (var t = 0; t < n.length; t++)
                    n[t] === this && n.splice(t, 1)
            },
            _destroy: function() {
                var t = n.ui.ddmanager.droppables[this.options.scope];
                this._splice(t)
            },
            _setOption: function(t, i) {
                if (t === "accept")
                    this.accept = n.isFunction(i) ? i : function(n) {
                        return n.is(i)
                    }
                    ;
                else if (t === "scope") {
                    var r = n.ui.ddmanager.droppables[this.options.scope];
                    this._splice(r),
                    this._addToManager(i)
                }
                this._super(t, i)
            },
            _activate: function(t) {
                var i = n.ui.ddmanager.current;
                this._addActiveClass(),
                i && this._trigger("activate", t, this.ui(i))
            },
            _deactivate: function(t) {
                var i = n.ui.ddmanager.current;
                this._removeActiveClass(),
                i && this._trigger("deactivate", t, this.ui(i))
            },
            _over: function(t) {
                var i = n.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(),
                this._trigger("over", t, this.ui(i)))
            },
            _out: function(t) {
                var i = n.ui.ddmanager.current;
                i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(),
                this._trigger("out", t, this.ui(i)))
            },
            _drop: function(t, i) {
                var r = i || n.ui.ddmanager.current
                  , u = !1;
                return !r || (r.currentItem || r.element)[0] === this.element[0] ? !1 : (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                    var i = n(this).droppable("instance");
                    if (i.options.greedy && !i.options.disabled && i.options.scope === r.options.scope && i.accept.call(i.element[0], r.currentItem || r.element) && e(r, n.extend(i, {
                        offset: i.element.offset()
                    }), i.options.tolerance, t))
                        return u = !0,
                        !1
                }),
                u) ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this._removeActiveClass(),
                this._removeHoverClass(),
                this._trigger("drop", t, this.ui(r)),
                this.element) : !1
            },
            ui: function(n) {
                return {
                    draggable: n.currentItem || n.element,
                    helper: n.helper,
                    position: n.position,
                    offset: n.positionAbs
                }
            },
            _addHoverClass: function() {
                this._addClass("ui-droppable-hover")
            },
            _removeHoverClass: function() {
                this._removeClass("ui-droppable-hover")
            },
            _addActiveClass: function() {
                this._addClass("ui-droppable-active")
            },
            _removeActiveClass: function() {
                this._removeClass("ui-droppable-active")
            }
        }),
        e = n.ui.intersect = function() {
            function n(n, t, i) {
                return n >= t && n < t + i
            }
            return function(t, i, r, u) {
                if (!i.offset)
                    return !1;
                var o = (t.positionAbs || t.position.absolute).left + t.margins.left
                  , s = (t.positionAbs || t.position.absolute).top + t.margins.top
                  , h = o + t.helperProportions.width
                  , c = s + t.helperProportions.height
                  , f = i.offset.left
                  , e = i.offset.top
                  , l = f + i.proportions().width
                  , a = e + i.proportions().height;
                switch (r) {
                case "fit":
                    return f <= o && h <= l && e <= s && c <= a;
                case "intersect":
                    return f < o + t.helperProportions.width / 2 && h - t.helperProportions.width / 2 < l && e < s + t.helperProportions.height / 2 && c - t.helperProportions.height / 2 < a;
                case "pointer":
                    return n(u.pageY, e, i.proportions().height) && n(u.pageX, f, i.proportions().width);
                case "touch":
                    return (s >= e && s <= a || c >= e && c <= a || s < e && c > a) && (o >= f && o <= l || h >= f && h <= l || o < f && h > l);
                default:
                    return !1
                }
            }
        }(),
        n.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function(t, i) {
                var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [], o = i ? i.type : null, e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                n: for (r = 0; r < u.length; r++)
                    if (!u[r].options.disabled && (!t || u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
                        for (f = 0; f < e.length; f++)
                            if (e[f] === u[r].element[0]) {
                                u[r].proportions().height = 0;
                                continue n
                            }
                        (u[r].visible = u[r].element.css("display") !== "none",
                        u[r].visible) && (o === "mousedown" && u[r]._activate.call(u[r], i),
                        u[r].offset = u[r].element.offset(),
                        u[r].proportions({
                            width: u[r].element[0].offsetWidth,
                            height: u[r].element[0].offsetHeight
                        }))
                    }
            },
            drop: function(t, i) {
                var r = !1;
                return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                    this.options && (!this.options.disabled && this.visible && e(t, this, this.options.tolerance, i) && (r = this._drop.call(this, i) || r),
                    !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0,
                    this.isover = !1,
                    this._deactivate.call(this, i)))
                }),
                r
            },
            dragStart: function(t, i) {
                t.element.parentsUntil("body").on("scroll.droppable", function() {
                    t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
                })
            },
            drag: function(t, i) {
                t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i),
                n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
                    if (!this.options.disabled && !this.greedyChild && this.visible) {
                        var r, o, f, s = e(t, this, this.options.tolerance, i), u = !s && this.isover ? "isout" : s && !this.isover ? "isover" : null;
                        u && (this.options.greedy && (o = this.options.scope,
                        f = this.element.parents(":data(ui-droppable)").filter(function() {
                            return n(this).droppable("instance").options.scope === o
                        }),
                        f.length && (r = n(f[0]).droppable("instance"),
                        r.greedyChild = u === "isover")),
                        r && u === "isover" && (r.isover = !1,
                        r.isout = !0,
                        r._out.call(r, i)),
                        this[u] = !0,
                        this[u === "isout" ? "isover" : "isout"] = !1,
                        this[u === "isover" ? "_over" : "_out"].call(this, i),
                        r && u === "isout" && (r.isout = !1,
                        r.isover = !0,
                        r._over.call(r, i)))
                    }
                })
            },
            dragStop: function(t, i) {
                t.element.parentsUntil("body").off("scroll.droppable"),
                t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
            }
        },
        n.uiBackCompat !== !1 && n.widget("ui.droppable", n.ui.droppable, {
            options: {
                hoverClass: !1,
                activeClass: !1
            },
            _addActiveClass: function() {
                this._super(),
                this.options.activeClass && this.element.addClass(this.options.activeClass)
            },
            _removeActiveClass: function() {
                this._super(),
                this.options.activeClass && this.element.removeClass(this.options.activeClass)
            },
            _addHoverClass: function() {
                this._super(),
                this.options.hoverClass && this.element.addClass(this.options.hoverClass)
            },
            _removeHoverClass: function() {
                this._super(),
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
            }
        });
        var rr = n.ui.droppable
          , ur = n.widget("ui.progressbar", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-progressbar": "ui-corner-all",
                    "ui-progressbar-value": "ui-corner-left",
                    "ui-progressbar-complete": "ui-corner-right"
                },
                max: 100,
                value: 0,
                change: null,
                complete: null
            },
            min: 0,
            _create: function() {
                this.oldValue = this.options.value = this._constrainedValue(),
                this.element.attr({
                    role: "progressbar",
                    "aria-valuemin": this.min
                }),
                this._addClass("ui-progressbar", "ui-widget ui-widget-content"),
                this.valueDiv = n("<div>").appendTo(this.element),
                this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"),
                this._refreshValue()
            },
            _destroy: function() {
                this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),
                this.valueDiv.remove()
            },
            value: function(n) {
                if (n === undefined)
                    return this.options.value;
                this.options.value = this._constrainedValue(n),
                this._refreshValue()
            },
            _constrainedValue: function(n) {
                return n === undefined && (n = this.options.value),
                this.indeterminate = n === !1,
                typeof n != "number" && (n = 0),
                this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, n))
            },
            _setOptions: function(n) {
                var t = n.value;
                delete n.value,
                this._super(n),
                this.options.value = this._constrainedValue(t),
                this._refreshValue()
            },
            _setOption: function(n, t) {
                n === "max" && (t = Math.max(this.min, t)),
                this._super(n, t)
            },
            _setOptionDisabled: function(n) {
                this._super(n),
                this.element.attr("aria-disabled", n),
                this._toggleClass(null, "ui-state-disabled", !!n)
            },
            _percentage: function() {
                return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
            },
            _refreshValue: function() {
                var t = this.options.value
                  , i = this._percentage();
                this.valueDiv.toggle(this.indeterminate || t > this.min).width(i.toFixed(0) + "%"),
                this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, t === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate),
                this.indeterminate ? (this.element.removeAttr("aria-valuenow"),
                this.overlayDiv || (this.overlayDiv = n("<div>").appendTo(this.valueDiv),
                this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": t
                }),
                this.overlayDiv && (this.overlayDiv.remove(),
                this.overlayDiv = null)),
                this.oldValue !== t && (this.oldValue = t,
                this._trigger("change")),
                t === this.options.max && this._trigger("complete")
            }
        })
          , fr = n.widget("ui.selectable", n.ui.mouse, {
            version: "1.12.1",
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch",
                selected: null,
                selecting: null,
                start: null,
                stop: null,
                unselected: null,
                unselecting: null
            },
            _create: function() {
                var t = this;
                this._addClass("ui-selectable"),
                this.dragged = !1,
                this.refresh = function() {
                    t.elementPos = n(t.element[0]).offset(),
                    t.selectees = n(t.options.filter, t.element[0]),
                    t._addClass(t.selectees, "ui-selectee"),
                    t.selectees.each(function() {
                        var i = n(this)
                          , u = i.offset()
                          , r = {
                            left: u.left - t.elementPos.left,
                            top: u.top - t.elementPos.top
                        };
                        n.data(this, "selectable-item", {
                            element: this,
                            $element: i,
                            left: r.left,
                            top: r.top,
                            right: r.left + i.outerWidth(),
                            bottom: r.top + i.outerHeight(),
                            startselected: !1,
                            selected: i.hasClass("ui-selected"),
                            selecting: i.hasClass("ui-selecting"),
                            unselecting: i.hasClass("ui-unselecting")
                        })
                    })
                }
                ,
                this.refresh(),
                this._mouseInit(),
                this.helper = n("<div>"),
                this._addClass(this.helper, "ui-selectable-helper")
            },
            _destroy: function() {
                this.selectees.removeData("selectable-item"),
                this._mouseDestroy()
            },
            _mouseStart: function(t) {
                var i = this
                  , r = this.options;
                (this.opos = [t.pageX, t.pageY],
                this.elementPos = n(this.element[0]).offset(),
                this.options.disabled) || (this.selectees = n(r.filter, this.element[0]),
                this._trigger("start", t),
                n(r.appendTo).append(this.helper),
                this.helper.css({
                    left: t.pageX,
                    top: t.pageY,
                    width: 0,
                    height: 0
                }),
                r.autoRefresh && this.refresh(),
                this.selectees.filter(".ui-selected").each(function() {
                    var r = n.data(this, "selectable-item");
                    r.startselected = !0,
                    t.metaKey || t.ctrlKey || (i._removeClass(r.$element, "ui-selected"),
                    r.selected = !1,
                    i._addClass(r.$element, "ui-unselecting"),
                    r.unselecting = !0,
                    i._trigger("unselecting", t, {
                        unselecting: r.element
                    }))
                }),
                n(t.target).parents().addBack().each(function() {
                    var u, r = n.data(this, "selectable-item");
                    if (r)
                        return u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"),
                        i._removeClass(r.$element, u ? "ui-unselecting" : "ui-selected")._addClass(r.$element, u ? "ui-selecting" : "ui-unselecting"),
                        r.unselecting = !u,
                        r.selecting = u,
                        r.selected = u,
                        u ? i._trigger("selecting", t, {
                            selecting: r.element
                        }) : i._trigger("unselecting", t, {
                            unselecting: r.element
                        }),
                        !1
                }))
            },
            _mouseDrag: function(t) {
                if (this.dragged = !0,
                !this.options.disabled) {
                    var o, i = this, s = this.options, r = this.opos[0], u = this.opos[1], f = t.pageX, e = t.pageY;
                    return r > f && (o = f,
                    f = r,
                    r = o),
                    u > e && (o = e,
                    e = u,
                    u = o),
                    this.helper.css({
                        left: r,
                        top: u,
                        width: f - r,
                        height: e - u
                    }),
                    this.selectees.each(function() {
                        var o = n.data(this, "selectable-item")
                          , c = !1
                          , h = {};
                        o && o.element !== i.element[0] && (h.left = o.left + i.elementPos.left,
                        h.right = o.right + i.elementPos.left,
                        h.top = o.top + i.elementPos.top,
                        h.bottom = o.bottom + i.elementPos.top,
                        s.tolerance === "touch" ? c = !(h.left > f || h.right < r || h.top > e || h.bottom < u) : s.tolerance === "fit" && (c = h.left > r && h.right < f && h.top > u && h.bottom < e),
                        c ? (o.selected && (i._removeClass(o.$element, "ui-selected"),
                        o.selected = !1),
                        o.unselecting && (i._removeClass(o.$element, "ui-unselecting"),
                        o.unselecting = !1),
                        o.selecting || (i._addClass(o.$element, "ui-selecting"),
                        o.selecting = !0,
                        i._trigger("selecting", t, {
                            selecting: o.element
                        }))) : (o.selecting && ((t.metaKey || t.ctrlKey) && o.startselected ? (i._removeClass(o.$element, "ui-selecting"),
                        o.selecting = !1,
                        i._addClass(o.$element, "ui-selected"),
                        o.selected = !0) : (i._removeClass(o.$element, "ui-selecting"),
                        o.selecting = !1,
                        o.startselected && (i._addClass(o.$element, "ui-unselecting"),
                        o.unselecting = !0),
                        i._trigger("unselecting", t, {
                            unselecting: o.element
                        }))),
                        o.selected && (t.metaKey || t.ctrlKey || o.startselected || (i._removeClass(o.$element, "ui-selected"),
                        o.selected = !1,
                        i._addClass(o.$element, "ui-unselecting"),
                        o.unselecting = !0,
                        i._trigger("unselecting", t, {
                            unselecting: o.element
                        })))))
                    }),
                    !1
                }
            },
            _mouseStop: function(t) {
                var i = this;
                return this.dragged = !1,
                n(".ui-unselecting", this.element[0]).each(function() {
                    var r = n.data(this, "selectable-item");
                    i._removeClass(r.$element, "ui-unselecting"),
                    r.unselecting = !1,
                    r.startselected = !1,
                    i._trigger("unselected", t, {
                        unselected: r.element
                    })
                }),
                n(".ui-selecting", this.element[0]).each(function() {
                    var r = n.data(this, "selectable-item");
                    i._removeClass(r.$element, "ui-selecting")._addClass(r.$element, "ui-selected"),
                    r.selecting = !1,
                    r.selected = !0,
                    r.startselected = !0,
                    i._trigger("selected", t, {
                        selected: r.element
                    })
                }),
                this._trigger("stop", t),
                this.helper.remove(),
                !1
            }
        })
          , er = n.widget("ui.selectmenu", [n.ui.formResetMixin, {
            version: "1.12.1",
            defaultElement: "<select>",
            options: {
                appendTo: null,
                classes: {
                    "ui-selectmenu-button-open": "ui-corner-top",
                    "ui-selectmenu-button-closed": "ui-corner-all"
                },
                disabled: null,
                icons: {
                    button: "ui-icon-triangle-1-s"
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                width: !1,
                change: null,
                close: null,
                focus: null,
                open: null,
                select: null
            },
            _create: function() {
                var t = this.element.uniqueId().attr("id");
                this.ids = {
                    element: t,
                    button: t + "-button",
                    menu: t + "-menu"
                },
                this._drawButton(),
                this._drawMenu(),
                this._bindFormResetHandler(),
                this._rendered = !1,
                this.menuItems = n()
            },
            _drawButton: function() {
                var t, i = this, r = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
                this.labels = this.element.labels().attr("for", this.ids.button),
                this._on(this.labels, {
                    click: function(n) {
                        this.button.focus(),
                        n.preventDefault()
                    }
                }),
                this.element.hide(),
                this.button = n("<span>", {
                    tabindex: this.options.disabled ? -1 : 0,
                    id: this.ids.button,
                    role: "combobox",
                    "aria-expanded": "false",
                    "aria-autocomplete": "list",
                    "aria-owns": this.ids.menu,
                    "aria-haspopup": "true",
                    title: this.element.attr("title")
                }).insertAfter(this.element),
                this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"),
                t = n("<span>").appendTo(this.button),
                this._addClass(t, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button),
                this.buttonItem = this._renderButtonItem(r).appendTo(this.button),
                this.options.width !== !1 && this._resizeButton(),
                this._on(this.button, this._buttonEvents);
                this.button.one("focusin", function() {
                    i._rendered || i._refreshMenu()
                })
            },
            _drawMenu: function() {
                var t = this;
                this.menu = n("<ul>", {
                    "aria-hidden": "true",
                    "aria-labelledby": this.ids.button,
                    id: this.ids.menu
                }),
                this.menuWrap = n("<div>").append(this.menu),
                this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
                this.menuWrap.appendTo(this._appendTo()),
                this.menuInstance = this.menu.menu({
                    classes: {
                        "ui-menu": "ui-corner-bottom"
                    },
                    role: "listbox",
                    select: function(n, i) {
                        n.preventDefault(),
                        t._setSelection(),
                        t._select(i.item.data("ui-selectmenu-item"), n)
                    },
                    focus: function(n, i) {
                        var r = i.item.data("ui-selectmenu-item");
                        t.focusIndex != null && r.index !== t.focusIndex && (t._trigger("focus", n, {
                            item: r
                        }),
                        t.isOpen || t._select(r, n)),
                        t.focusIndex = r.index,
                        t.button.attr("aria-activedescendant", t.menuItems.eq(r.index).attr("id"))
                    }
                }).menu("instance"),
                this.menuInstance._off(this.menu, "mouseleave"),
                this.menuInstance._closeOnDocumentClick = function() {
                    return !1
                }
                ,
                this.menuInstance._isDivider = function() {
                    return !1
                }
            },
            refresh: function() {
                this._refreshMenu(),
                this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})),
                this.options.width === null && this._resizeButton()
            },
            _refreshMenu: function() {
                var n, t = this.element.find("option");
                (this.menu.empty(),
                this._parseOptions(t),
                this._renderMenu(this.menu, this.items),
                this.menuInstance.refresh(),
                this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),
                this._rendered = !0,
                t.length) && (n = this._getSelectedItem(),
                this.menuInstance.focus(null, n),
                this._setAria(n.data("ui-selectmenu-item")),
                this._setOption("disabled", this.element.prop("disabled")))
            },
            open: function(n) {
                this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"),
                this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(),
                this.menuItems.length) && (this.isOpen = !0,
                this._toggleAttr(),
                this._resizeMenu(),
                this._position(),
                this._on(this.document, this._documentClick),
                this._trigger("open", n))
            },
            _position: function() {
                this.menuWrap.position(n.extend({
                    of: this.button
                }, this.options.position))
            },
            close: function(n) {
                this.isOpen && (this.isOpen = !1,
                this._toggleAttr(),
                this.range = null,
                this._off(this.document),
                this._trigger("close", n))
            },
            widget: function() {
                return this.button
            },
            menuWidget: function() {
                return this.menu
            },
            _renderButtonItem: function(t) {
                var i = n("<span>");
                return this._setText(i, t.label),
                this._addClass(i, "ui-selectmenu-text"),
                i
            },
            _renderMenu: function(t, i) {
                var r = this
                  , u = "";
                n.each(i, function(i, f) {
                    var e;
                    f.optgroup !== u && (e = n("<li>", {
                        text: f.optgroup
                    }),
                    r._addClass(e, "ui-selectmenu-optgroup", "ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")),
                    e.appendTo(t),
                    u = f.optgroup),
                    r._renderItemData(t, f)
                })
            },
            _renderItemData: function(n, t) {
                return this._renderItem(n, t).data("ui-selectmenu-item", t)
            },
            _renderItem: function(t, i) {
                var r = n("<li>")
                  , u = n("<div>", {
                    title: i.element.attr("title")
                });
                return i.disabled && this._addClass(r, null, "ui-state-disabled"),
                this._setText(u, i.label),
                r.append(u).appendTo(t)
            },
            _setText: function(n, t) {
                t ? n.text(t) : n.html("&#160;")
            },
            _move: function(n, t) {
                var i, r, u = ".ui-menu-item";
                this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"),
                u += ":not(.ui-state-disabled)"),
                r = n === "first" || n === "last" ? i[n === "first" ? "prevAll" : "nextAll"](u).eq(-1) : i[n + "All"](u).eq(0),
                r.length && this.menuInstance.focus(t, r)
            },
            _getSelectedItem: function() {
                return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
            },
            _toggle: function(n) {
                this[this.isOpen ? "close" : "open"](n)
            },
            _setSelection: function() {
                var n;
                this.range && (window.getSelection ? (n = window.getSelection(),
                n.removeAllRanges(),
                n.addRange(this.range)) : this.range.select(),
                this.button.focus())
            },
            _documentClick: {
                mousedown: function(t) {
                    this.isOpen && (n(t.target).closest(".ui-selectmenu-menu, #" + n.ui.escapeSelector(this.ids.button)).length || this.close(t))
                }
            },
            _buttonEvents: {
                mousedown: function() {
                    var n;
                    window.getSelection ? (n = window.getSelection(),
                    n.rangeCount && (this.range = n.getRangeAt(0))) : this.range = document.selection.createRange()
                },
                click: function(n) {
                    this._setSelection(),
                    this._toggle(n)
                },
                keydown: function(t) {
                    var i = !0;
                    switch (t.keyCode) {
                    case n.ui.keyCode.TAB:
                    case n.ui.keyCode.ESCAPE:
                        this.close(t),
                        i = !1;
                        break;
                    case n.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(t);
                        break;
                    case n.ui.keyCode.UP:
                        t.altKey ? this._toggle(t) : this._move("prev", t);
                        break;
                    case n.ui.keyCode.DOWN:
                        t.altKey ? this._toggle(t) : this._move("next", t);
                        break;
                    case n.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                        break;
                    case n.ui.keyCode.LEFT:
                        this._move("prev", t);
                        break;
                    case n.ui.keyCode.RIGHT:
                        this._move("next", t);
                        break;
                    case n.ui.keyCode.HOME:
                    case n.ui.keyCode.PAGE_UP:
                        this._move("first", t);
                        break;
                    case n.ui.keyCode.END:
                    case n.ui.keyCode.PAGE_DOWN:
                        this._move("last", t);
                        break;
                    default:
                        this.menu.trigger(t),
                        i = !1
                    }
                    i && t.preventDefault()
                }
            },
            _selectFocusedItem: function(n) {
                var t = this.menuItems.eq(this.focusIndex).parent("li");
                t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), n)
            },
            _select: function(n, t) {
                var i = this.element[0].selectedIndex;
                this.element[0].selectedIndex = n.index,
                this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(n)),
                this._setAria(n),
                this._trigger("select", t, {
                    item: n
                }),
                n.index !== i && this._trigger("change", t, {
                    item: n
                }),
                this.close(t)
            },
            _setAria: function(n) {
                var t = this.menuItems.eq(n.index).attr("id");
                this.button.attr({
                    "aria-labelledby": t,
                    "aria-activedescendant": t
                }),
                this.menu.attr("aria-activedescendant", t)
            },
            _setOption: function(n, t) {
                if (n === "icons") {
                    var i = this.button.find("span.ui-icon");
                    this._removeClass(i, null, this.options.icons.button)._addClass(i, null, t.button)
                }
                this._super(n, t),
                n === "appendTo" && this.menuWrap.appendTo(this._appendTo()),
                n === "width" && this._resizeButton()
            },
            _setOptionDisabled: function(n) {
                this._super(n),
                this.menuInstance.option("disabled", n),
                this.button.attr("aria-disabled", n),
                this._toggleClass(this.button, null, "ui-state-disabled", n),
                this.element.prop("disabled", n),
                n ? (this.button.attr("tabindex", -1),
                this.close()) : this.button.attr("tabindex", 0)
            },
            _appendTo: function() {
                var t = this.options.appendTo;
                return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)),
                t && t[0] || (t = this.element.closest(".ui-front, dialog")),
                t.length || (t = this.document[0].body),
                t
            },
            _toggleAttr: function() {
                this.button.attr("aria-expanded", this.isOpen),
                this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen),
                this.menu.attr("aria-hidden", !this.isOpen)
            },
            _resizeButton: function() {
                var n = this.options.width;
                if (n === !1) {
                    this.button.css("width", "");
                    return
                }
                n === null && (n = this.element.show().outerWidth(),
                this.element.hide()),
                this.button.outerWidth(n)
            },
            _resizeMenu: function() {
                this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
            },
            _getCreateOptions: function() {
                var n = this._super();
                return n.disabled = this.element.prop("disabled"),
                n
            },
            _parseOptions: function(t) {
                var r = this
                  , i = [];
                t.each(function(t, u) {
                    i.push(r._parseOption(n(u), t))
                }),
                this.items = i
            },
            _parseOption: function(n, t) {
                var i = n.parent("optgroup");
                return {
                    element: n,
                    index: t,
                    value: n.val(),
                    label: n.text(),
                    optgroup: i.attr("label") || "",
                    disabled: i.prop("disabled") || n.prop("disabled")
                }
            },
            _destroy: function() {
                this._unbindFormResetHandler(),
                this.menuWrap.remove(),
                this.button.remove(),
                this.element.show(),
                this.element.removeUniqueId(),
                this.labels.attr("for", this.ids.element)
            }
        }])
          , or = n.widget("ui.slider", n.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                classes: {
                    "ui-slider": "ui-corner-all",
                    "ui-slider-handle": "ui-corner-all",
                    "ui-slider-range": "ui-corner-all ui-widget-header"
                },
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null,
                change: null,
                slide: null,
                start: null,
                stop: null
            },
            numPages: 5,
            _create: function() {
                this._keySliding = !1,
                this._mouseSliding = !1,
                this._animateOff = !0,
                this._handleIndex = null,
                this._detectOrientation(),
                this._mouseInit(),
                this._calculateNewMax(),
                this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"),
                this._refresh(),
                this._animateOff = !1
            },
            _refresh: function() {
                this._createRange(),
                this._createHandles(),
                this._setupEvents(),
                this._refreshValue()
            },
            _createHandles: function() {
                var r, i, u = this.options, t = this.element.find(".ui-slider-handle"), e = "<span tabindex='0'><\/span>", f = [];
                for (i = u.values && u.values.length || 1,
                t.length > i && (t.slice(i).remove(),
                t = t.slice(0, i)),
                r = t.length; r < i; r++)
                    f.push(e);
                this.handles = t.add(n(f.join("")).appendTo(this.element)),
                this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
                this.handle = this.handles.eq(0),
                this.handles.each(function(t) {
                    n(this).data("ui-slider-handle-index", t).attr("tabIndex", 0)
                })
            },
            _createRange: function() {
                var t = this.options;
                t.range ? (t.range === !0 && (t.values ? t.values.length && t.values.length !== 2 ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]),
                this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"),
                this.range.css({
                    left: "",
                    bottom: ""
                })) : (this.range = n("<div>").appendTo(this.element),
                this._addClass(this.range, "ui-slider-range")),
                (t.range === "min" || t.range === "max") && this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(),
                this.range = null)
            },
            _setupEvents: function() {
                this._off(this.handles),
                this._on(this.handles, this._handleEvents),
                this._hoverable(this.handles),
                this._focusable(this.handles)
            },
            _destroy: function() {
                this.handles.remove(),
                this.range && this.range.remove(),
                this._mouseDestroy()
            },
            _mouseCapture: function(t) {
                var s, f, r, i, u, h, e, c, o = this, l = this.options;
                return l.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                },
                this.elementOffset = this.element.offset(),
                s = {
                    x: t.pageX,
                    y: t.pageY
                },
                f = this._normValueFromMouse(s),
                r = this._valueMax() - this._valueMin() + 1,
                this.handles.each(function(t) {
                    var e = Math.abs(f - o.values(t));
                    (r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e,
                    i = n(this),
                    u = t)
                }),
                h = this._start(t, u),
                h === !1) ? !1 : (this._mouseSliding = !0,
                this._handleIndex = u,
                this._addClass(i, null, "ui-state-active"),
                i.trigger("focus"),
                e = i.offset(),
                c = !n(t.target).parents().addBack().is(".ui-slider-handle"),
                this._clickOffset = c ? {
                    left: 0,
                    top: 0
                } : {
                    left: t.pageX - e.left - i.width() / 2,
                    top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
                },
                this.handles.hasClass("ui-state-hover") || this._slide(t, u, f),
                this._animateOff = !0,
                !0)
            },
            _mouseStart: function() {
                return !0
            },
            _mouseDrag: function(n) {
                var t = {
                    x: n.pageX,
                    y: n.pageY
                }
                  , i = this._normValueFromMouse(t);
                return this._slide(n, this._handleIndex, i),
                !1
            },
            _mouseStop: function(n) {
                return this._removeClass(this.handles, null, "ui-state-active"),
                this._mouseSliding = !1,
                this._stop(n, this._handleIndex),
                this._change(n, this._handleIndex),
                this._handleIndex = null,
                this._clickOffset = null,
                this._animateOff = !1,
                !1
            },
            _detectOrientation: function() {
                this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function(n) {
                var i, r, t, u, f;
                return this.orientation === "horizontal" ? (i = this.elementSize.width,
                r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height,
                r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)),
                t = r / i,
                t > 1 && (t = 1),
                t < 0 && (t = 0),
                this.orientation === "vertical" && (t = 1 - t),
                u = this._valueMax() - this._valueMin(),
                f = this._valueMin() + t * u,
                this._trimAlignValue(f)
            },
            _uiHash: function(n, t, i) {
                var r = {
                    handle: this.handles[n],
                    handleIndex: n,
                    value: t !== undefined ? t : this.value()
                };
                return this._hasMultipleValues() && (r.value = t !== undefined ? t : this.values(n),
                r.values = i || this.values()),
                r
            },
            _hasMultipleValues: function() {
                return this.options.values && this.options.values.length
            },
            _start: function(n, t) {
                return this._trigger("start", n, this._uiHash(t))
            },
            _slide: function(n, t, i) {
                var u, r, f = this.value(), e = this.values();
                (this._hasMultipleValues() && (r = this.values(t ? 0 : 1),
                f = this.values(t),
                this.options.values.length === 2 && this.options.range === !0 && (i = t === 0 ? Math.min(r, i) : Math.max(r, i)),
                e[t] = i),
                i !== f) && (u = this._trigger("slide", n, this._uiHash(t, i, e)),
                u !== !1) && (this._hasMultipleValues() ? this.values(t, i) : this.value(i))
            },
            _stop: function(n, t) {
                this._trigger("stop", n, this._uiHash(t))
            },
            _change: function(n, t) {
                this._keySliding || this._mouseSliding || (this._lastChangedValue = t,
                this._trigger("change", n, this._uiHash(t)))
            },
            value: function(n) {
                if (arguments.length) {
                    this.options.value = this._trimAlignValue(n),
                    this._refreshValue(),
                    this._change(null, 0);
                    return
                }
                return this._value()
            },
            values: function(t, i) {
                var u, f, r;
                if (arguments.length > 1) {
                    this.options.values[t] = this._trimAlignValue(i),
                    this._refreshValue(),
                    this._change(null, t);
                    return
                }
                if (arguments.length)
                    if (n.isArray(arguments[0])) {
                        for (u = this.options.values,
                        f = arguments[0],
                        r = 0; r < u.length; r += 1)
                            u[r] = this._trimAlignValue(f[r]),
                            this._change(null, r);
                        this._refreshValue()
                    } else
                        return this._hasMultipleValues() ? this._values(t) : this.value();
                else
                    return this._values()
            },
            _setOption: function(t, i) {
                var r, u = 0;
                t === "range" && this.options.range === !0 && (i === "min" ? (this.options.value = this._values(0),
                this.options.values = null) : i === "max" && (this.options.value = this._values(this.options.values.length - 1),
                this.options.values = null)),
                n.isArray(this.options.values) && (u = this.options.values.length),
                this._super(t, i);
                switch (t) {
                case "orientation":
                    this._detectOrientation(),
                    this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation),
                    this._refreshValue(),
                    this.options.range && this._refreshRange(i),
                    this.handles.css(i === "horizontal" ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0,
                    this._refreshValue(),
                    this._change(null, 0),
                    this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0,
                    this._refreshValue(),
                    r = u - 1; r >= 0; r--)
                        this._change(null, r);
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0,
                    this._calculateNewMax(),
                    this._refreshValue(),
                    this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0,
                    this._refresh(),
                    this._animateOff = !1
                }
            },
            _setOptionDisabled: function(n) {
                this._super(n),
                this._toggleClass(null, "ui-state-disabled", !!n)
            },
            _value: function() {
                var n = this.options.value;
                return n = this._trimAlignValue(n)
            },
            _values: function(n) {
                var r, t, i;
                if (arguments.length)
                    return r = this.options.values[n],
                    r = this._trimAlignValue(r);
                if (this._hasMultipleValues()) {
                    for (t = this.options.values.slice(),
                    i = 0; i < t.length; i += 1)
                        t[i] = this._trimAlignValue(t[i]);
                    return t
                }
                return []
            },
            _trimAlignValue: function(n) {
                if (n <= this._valueMin())
                    return this._valueMin();
                if (n >= this._valueMax())
                    return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1
                  , i = (n - this._valueMin()) % t
                  , r = n - i;
                return Math.abs(i) * 2 >= t && (r += i > 0 ? t : -t),
                parseFloat(r.toFixed(5))
            },
            _calculateNewMax: function() {
                var n = this.options.max
                  , i = this._valueMin()
                  , t = this.options.step
                  , r = Math.round((n - i) / t) * t;
                n = r + i,
                n > this.options.max && (n -= t),
                this.max = parseFloat(n.toFixed(this._precision()))
            },
            _precision: function() {
                var n = this._precisionOf(this.options.step);
                return this.options.min !== null && (n = Math.max(n, this._precisionOf(this.options.min))),
                n
            },
            _precisionOf: function(n) {
                var t = n.toString()
                  , i = t.indexOf(".");
                return i === -1 ? 0 : t.length - i - 1
            },
            _valueMin: function() {
                return this.options.min
            },
            _valueMax: function() {
                return this.max
            },
            _refreshRange: function(n) {
                n === "vertical" && this.range.css({
                    width: "",
                    left: ""
                }),
                n === "horizontal" && this.range.css({
                    height: "",
                    bottom: ""
                })
            },
            _refreshValue: function() {
                var s, t, c, f, h, e = this.options.range, i = this.options, r = this, u = this._animateOff ? !1 : i.animate, o = {};
                this._hasMultipleValues() ? this.handles.each(function(f) {
                    t = (r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100,
                    o[r.orientation === "horizontal" ? "left" : "bottom"] = t + "%",
                    n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate),
                    r.options.range === !0 && (r.orientation === "horizontal" ? (f === 0 && r.range.stop(1, 1)[u ? "animate" : "css"]({
                        left: t + "%"
                    }, i.animate),
                    f === 1 && r.range[u ? "animate" : "css"]({
                        width: t - s + "%"
                    }, {
                        queue: !1,
                        duration: i.animate
                    })) : (f === 0 && r.range.stop(1, 1)[u ? "animate" : "css"]({
                        bottom: t + "%"
                    }, i.animate),
                    f === 1 && r.range[u ? "animate" : "css"]({
                        height: t - s + "%"
                    }, {
                        queue: !1,
                        duration: i.animate
                    }))),
                    s = t
                }) : (c = this.value(),
                f = this._valueMin(),
                h = this._valueMax(),
                t = h !== f ? (c - f) / (h - f) * 100 : 0,
                o[this.orientation === "horizontal" ? "left" : "bottom"] = t + "%",
                this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate),
                e === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                    width: t + "%"
                }, i.animate),
                e === "max" && this.orientation === "horizontal" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                    width: 100 - t + "%"
                }, i.animate),
                e === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                    height: t + "%"
                }, i.animate),
                e === "max" && this.orientation === "vertical" && this.range.stop(1, 1)[u ? "animate" : "css"]({
                    height: 100 - t + "%"
                }, i.animate))
            },
            _handleEvents: {
                keydown: function(t) {
                    var e, r, i, u, f = n(t.target).data("ui-slider-handle-index");
                    switch (t.keyCode) {
                    case n.ui.keyCode.HOME:
                    case n.ui.keyCode.END:
                    case n.ui.keyCode.PAGE_UP:
                    case n.ui.keyCode.PAGE_DOWN:
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (t.preventDefault(),
                        !this._keySliding && (this._keySliding = !0,
                        this._addClass(n(t.target), null, "ui-state-active"),
                        e = this._start(t, f),
                        e === !1))
                            return
                    }
                    u = this.options.step,
                    r = this._hasMultipleValues() ? i = this.values(f) : i = this.value();
                    switch (t.keyCode) {
                    case n.ui.keyCode.HOME:
                        i = this._valueMin();
                        break;
                    case n.ui.keyCode.END:
                        i = this._valueMax();
                        break;
                    case n.ui.keyCode.PAGE_UP:
                        i = this._trimAlignValue(r + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case n.ui.keyCode.PAGE_DOWN:
                        i = this._trimAlignValue(r - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.RIGHT:
                        if (r === this._valueMax())
                            return;
                        i = this._trimAlignValue(r + u);
                        break;
                    case n.ui.keyCode.DOWN:
                    case n.ui.keyCode.LEFT:
                        if (r === this._valueMin())
                            return;
                        i = this._trimAlignValue(r - u)
                    }
                    this._slide(t, f, i)
                },
                keyup: function(t) {
                    var i = n(t.target).data("ui-slider-handle-index");
                    this._keySliding && (this._keySliding = !1,
                    this._stop(t, i),
                    this._change(t, i),
                    this._removeClass(n(t.target), null, "ui-state-active"))
                }
            }
        })
          , sr = n.widget("ui.sortable", n.ui.mouse, {
            version: "1.12.1",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _isOverAxis: function(n, t, i) {
                return n >= t && n < t + i
            },
            _isFloating: function(n) {
                return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
            },
            _create: function() {
                this.containerCache = {},
                this._addClass("ui-sortable"),
                this.refresh(),
                this.offset = this.element.offset(),
                this._mouseInit(),
                this._setHandleClassName(),
                this.ready = !0
            },
            _setOption: function(n, t) {
                this._super(n, t),
                n === "handle" && this._setHandleClassName()
            },
            _setHandleClassName: function() {
                var t = this;
                this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"),
                n.each(this.items, function() {
                    t._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
                })
            },
            _destroy: function() {
                this._mouseDestroy();
                for (var n = this.items.length - 1; n >= 0; n--)
                    this.items[n].item.removeData(this.widgetName + "-item");
                return this
            },
            _mouseCapture: function(t, i) {
                var r = null
                  , f = !1
                  , u = this;
                return this.reverting ? !1 : this.options.disabled || this.options.type === "static" ? !1 : (this._refreshItems(t),
                n(t.target).parents().each(function() {
                    if (n.data(this, u.widgetName + "-item") === u)
                        return r = n(this),
                        !1
                }),
                n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)),
                !r) ? !1 : this.options.handle && !i && (n(this.options.handle, r).find("*").addBack().each(function() {
                    this === t.target && (f = !0)
                }),
                !f) ? !1 : (this.currentItem = r,
                this._removeCurrentsFromItems(),
                !0)
            },
            _mouseStart: function(t, i, r) {
                var f, e, u = this.options;
                if (this.currentContainer = this,
                this.refreshPositions(),
                this.helper = this._createHelper(t),
                this._cacheHelperProportions(),
                this._cacheMargins(),
                this.scrollParent = this.helper.scrollParent(),
                this.offset = this.currentItem.offset(),
                this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                },
                n.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }),
                this.helper.css("position", "absolute"),
                this.cssPosition = this.helper.css("position"),
                this.originalPosition = this._generatePosition(t),
                this.originalPageX = t.pageX,
                this.originalPageY = t.pageY,
                u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt),
                this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                },
                this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
                this._createPlaceholder(),
                u.containment && this._setContainment(),
                u.cursor && u.cursor !== "auto" && (e = this.document.find("body"),
                this.storedCursor = e.css("cursor"),
                e.css("cursor", u.cursor),
                this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)),
                u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
                this.helper.css("opacity", u.opacity)),
                u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
                this.helper.css("zIndex", u.zIndex)),
                this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML" && (this.overflowOffset = this.scrollParent.offset()),
                this._trigger("start", t, this._uiHash()),
                this._preserveHelperProportions || this._cacheHelperProportions(),
                !r)
                    for (f = this.containers.length - 1; f >= 0; f--)
                        this.containers[f]._trigger("activate", t, this._uiHash(this));
                return n.ui.ddmanager && (n.ui.ddmanager.current = this),
                n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t),
                this.dragging = !0,
                this._addClass(this.helper, "ui-sortable-helper"),
                this._mouseDrag(t),
                !0
            },
            _mouseDrag: function(t) {
                var e, u, f, o, i = this.options, r = !1;
                for (this.position = this._generatePosition(t),
                this.positionAbs = this._convertPositionTo("absolute"),
                this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
                this.options.scroll && (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed),
                this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - this.document.scrollTop() < i.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - i.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < i.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + i.scrollSpeed)),
                t.pageX - this.document.scrollLeft() < i.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - i.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < i.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + i.scrollSpeed))),
                r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)),
                this.positionAbs = this._convertPositionTo("absolute"),
                this.options.axis && this.options.axis === "y" || (this.helper[0].style.left = this.position.left + "px"),
                this.options.axis && this.options.axis === "x" || (this.helper[0].style.top = this.position.top + "px"),
                e = this.items.length - 1; e >= 0; e--)
                    if ((u = this.items[e],
                    f = u.item[0],
                    o = this._intersectsWithPointer(u),
                    o) && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[o === 1 ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && (this.options.type === "semi-dynamic" ? !n.contains(this.element[0], f) : !0)) {
                        if (this.direction = o === 1 ? "down" : "up",
                        this.options.tolerance === "pointer" || this._intersectsWithSides(u))
                            this._rearrange(t, u);
                        else
                            break;
                        this._trigger("change", t, this._uiHash());
                        break
                    }
                return this._contactContainers(t),
                n.ui.ddmanager && n.ui.ddmanager.drag(this, t),
                this._trigger("sort", t, this._uiHash()),
                this.lastPositionAbs = this.positionAbs,
                !1
            },
            _mouseStop: function(t, i) {
                if (t) {
                    if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t),
                    this.options.revert) {
                        var e = this
                          , f = this.placeholder.offset()
                          , r = this.options.axis
                          , u = {};
                        r && r !== "x" || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                        r && r !== "y" || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                        this.reverting = !0,
                        n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function() {
                            e._clear(t)
                        })
                    } else
                        this._clear(t, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp(new n.Event("mouseup",{
                        target: null
                    })),
                    this.options.helper === "original" ? (this.currentItem.css(this._storedCSS),
                    this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                    for (var t = this.containers.length - 1; t >= 0; t--)
                        this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
                        this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)),
                        this.containers[t].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                this.options.helper !== "original" && this.helper && this.helper[0].parentNode && this.helper.remove(),
                n.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }),
                this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)),
                this
            },
            serialize: function(t) {
                var r = this._getItemsAsjQuery(t && t.connected)
                  , i = [];
                return t = t || {},
                n(r).each(function() {
                    var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                    r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
                }),
                !i.length && t.key && i.push(t.key + "="),
                i.join("&")
            },
            toArray: function(t) {
                var r = this._getItemsAsjQuery(t && t.connected)
                  , i = [];
                return t = t || {},
                r.each(function() {
                    i.push(n(t.item || this).attr(t.attribute || "id") || "")
                }),
                i
            },
            _intersectsWith: function(n) {
                var t = this.positionAbs.left
                  , h = t + this.helperProportions.width
                  , i = this.positionAbs.top
                  , c = i + this.helperProportions.height
                  , r = n.left
                  , f = r + n.width
                  , u = n.top
                  , e = u + n.height
                  , o = this.offset.click.top
                  , s = this.offset.click.left
                  , l = this.options.axis === "x" || i + o > u && i + o < e
                  , a = this.options.axis === "y" || t + s > r && t + s < f
                  , v = l && a;
                return this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : r < t + this.helperProportions.width / 2 && h - this.helperProportions.width / 2 < f && u < i + this.helperProportions.height / 2 && c - this.helperProportions.height / 2 < e
            },
            _intersectsWithPointer: function(n) {
                var t, i, r = this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top, n.height), u = this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left, n.width), f = r && u;
                return f ? (t = this._getDragVerticalDirection(),
                i = this._getDragHorizontalDirection(),
                this.floating ? i === "right" || t === "down" ? 2 : 1 : t && (t === "down" ? 2 : 1)) : !1
            },
            _intersectsWithSides: function(n) {
                var r = this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height)
                  , u = this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width)
                  , t = this._getDragVerticalDirection()
                  , i = this._getDragHorizontalDirection();
                return this.floating && i ? i === "right" && u || i === "left" && !u : t && (t === "down" && r || t === "up" && !r)
            },
            _getDragVerticalDirection: function() {
                var n = this.positionAbs.top - this.lastPositionAbs.top;
                return n !== 0 && (n > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var n = this.positionAbs.left - this.lastPositionAbs.left;
                return n !== 0 && (n > 0 ? "right" : "left")
            },
            refresh: function(n) {
                return this._refreshItems(n),
                this._setHandleClassName(),
                this.refreshPositions(),
                this
            },
            _connectWith: function() {
                var n = this.options;
                return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
            },
            _getItemsAsjQuery: function(t) {
                function h() {
                    s.push(this)
                }
                var r, u, e, i, s = [], f = [], o = this._connectWith();
                if (o && t)
                    for (r = o.length - 1; r >= 0; r--)
                        for (e = n(o[r], this.document[0]),
                        u = e.length - 1; u >= 0; u--)
                            i = n.data(e[u], this.widgetFullName),
                            i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
                for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
                r = f.length - 1; r >= 0; r--)
                    f[r][0].each(h);
                return n(s)
            },
            _removeCurrentsFromItems: function() {
                var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = n.grep(this.items, function(n) {
                    for (var i = 0; i < t.length; i++)
                        if (t[i] === n.item[0])
                            return !1;
                    return !0
                })
            },
            _refreshItems: function(t) {
                this.items = [],
                this.containers = [this];
                var r, u, e, i, o, s, h, l, a = this.items, f = [[n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                    item: this.currentItem
                }) : n(this.options.items, this.element), this]], c = this._connectWith();
                if (c && this.ready)
                    for (r = c.length - 1; r >= 0; r--)
                        for (e = n(c[r], this.document[0]),
                        u = e.length - 1; u >= 0; u--)
                            i = n.data(e[u], this.widgetFullName),
                            i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
                                item: this.currentItem
                            }) : n(i.options.items, i.element), i]),
                            this.containers.push(i));
                for (r = f.length - 1; r >= 0; r--)
                    for (o = f[r][1],
                    s = f[r][0],
                    u = 0,
                    l = s.length; u < l; u++)
                        h = n(s[u]),
                        h.data(this.widgetName + "-item", o),
                        a.push({
                            item: h,
                            instance: o,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        })
            },
            refreshPositions: function(t) {
                this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : !1,
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                for (var r, f, u, i = this.items.length - 1; i >= 0; i--)
                    (r = this.items[i],
                    r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0]) || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item,
                    t || (r.width = f.outerWidth(),
                    r.height = f.outerHeight()),
                    u = f.offset(),
                    r.left = u.left,
                    r.top = u.top);
                if (this.options.custom && this.options.custom.refreshContainers)
                    this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--)
                        u = this.containers[i].element.offset(),
                        this.containers[i].containerCache.left = u.left,
                        this.containers[i].containerCache.top = u.top,
                        this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                        this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(t) {
                t = t || this;
                var r, i = t.options;
                i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder,
                i.placeholder = {
                    element: function() {
                        var u = t.currentItem[0].nodeName.toLowerCase()
                          , i = n("<" + u + ">", t.document[0]);
                        return t._addClass(i, "ui-sortable-placeholder", r || t.currentItem[0].className)._removeClass(i, "ui-sortable-helper"),
                        u === "tbody" ? t._createTrPlaceholder(t.currentItem.find("tr").eq(0), n("<tr>", t.document[0]).appendTo(i)) : u === "tr" ? t._createTrPlaceholder(t.currentItem, i) : u === "img" && i.attr("src", t.currentItem.attr("src")),
                        r || i.css("visibility", "hidden"),
                        i
                    },
                    update: function(n, u) {
                        (!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)),
                        u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                    }
                }),
                t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem)),
                t.currentItem.after(t.placeholder),
                i.placeholder.update(t, t.placeholder)
            },
            _createTrPlaceholder: function(t, i) {
                var r = this;
                t.children().each(function() {
                    n("<td>&#160;<\/td>", r.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
                })
            },
            _contactContainers: function(t) {
                for (var u, c, f, a, v, o, l, s, h, e = null, i = null, r = this.containers.length - 1; r >= 0; r--)
                    if (!n.contains(this.currentItem[0], this.containers[r].element[0]))
                        if (this._intersectsWith(this.containers[r].containerCache)) {
                            if (e && n.contains(this.containers[r].element[0], e.element[0]))
                                continue;
                            e = this.containers[r],
                            i = r
                        } else
                            this.containers[r].containerCache.over && (this.containers[r]._trigger("out", t, this._uiHash(this)),
                            this.containers[r].containerCache.over = 0);
                if (e)
                    if (this.containers.length === 1)
                        this.containers[i].containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash(this)),
                        this.containers[i].containerCache.over = 1);
                    else {
                        for (c = 1e4,
                        f = null,
                        s = e.floating || this._isFloating(this.currentItem),
                        a = s ? "left" : "top",
                        v = s ? "width" : "height",
                        h = s ? "pageX" : "pageY",
                        u = this.items.length - 1; u >= 0; u--)
                            n.contains(this.containers[i].element[0], this.items[u].item[0]) && this.items[u].item[0] !== this.currentItem[0] && (o = this.items[u].item.offset()[a],
                            l = !1,
                            t[h] - o > this.items[u][v] / 2 && (l = !0),
                            Math.abs(t[h] - o) < c && (c = Math.abs(t[h] - o),
                            f = this.items[u],
                            this.direction = l ? "up" : "down"));
                        if (!f && !this.options.dropOnEmpty)
                            return;
                        if (this.currentContainer === this.containers[i]) {
                            this.currentContainer.containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash()),
                            this.currentContainer.containerCache.over = 1);
                            return
                        }
                        f ? this._rearrange(t, f, null, !0) : this._rearrange(t, null, this.containers[i].element, !0),
                        this._trigger("change", t, this._uiHash()),
                        this.containers[i]._trigger("change", t, this._uiHash(this)),
                        this.currentContainer = this.containers[i],
                        this.options.placeholder.update(this.currentContainer, this.placeholder),
                        this.containers[i]._trigger("over", t, this._uiHash(this)),
                        this.containers[i].containerCache.over = 1
                    }
            },
            _createHelper: function(t) {
                var r = this.options
                  , i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : r.helper === "clone" ? this.currentItem.clone() : this.currentItem;
                return i.parents("body").length || n(r.appendTo !== "parent" ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]),
                i[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }),
                (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()),
                (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()),
                i
            },
            _adjustOffsetFromHelper: function(t) {
                typeof t == "string" && (t = t.split(" ")),
                n.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }),
                "left"in t && (this.offset.click.left = t.left + this.margins.left),
                "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
                "top"in t && (this.offset.click.top = t.top + this.margins.top),
                "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                return this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
                t.top += this.scrollParent.scrollTop()),
                (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && n.ui.ie) && (t = {
                    top: 0,
                    left: 0
                }),
                {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if (this.cssPosition === "relative") {
                    var n = this.currentItem.position();
                    return {
                        top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var t, r, u, i = this.options;
                i.containment === "parent" && (i.containment = this.helper[0].parentNode),
                (i.containment === "document" || i.containment === "window") && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, i.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (i.containment === "document" ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
                /^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0],
                r = n(i.containment).offset(),
                u = n(t).css("overflow") !== "hidden",
                this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(t, i) {
                i || (i = this.position);
                var r = t === "absolute" ? 1 : -1
                  , u = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
                  , f = /(html|body)/i.test(u[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
                    left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
                }
            },
            _generatePosition: function(t) {
                var r, u, i = this.options, f = t.pageX, e = t.pageY, o = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, s = /(html|body)/i.test(o[0].tagName);
                return this.cssPosition !== "relative" || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
                this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left),
                t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top),
                t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left),
                t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)),
                i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1],
                e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r,
                u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0],
                f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)),
                {
                    top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
                    left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
                }
            },
            _rearrange: function(n, t, i, r) {
                i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? t.item[0] : t.item[0].nextSibling),
                this.counter = this.counter ? ++this.counter : 1;
                var u = this.counter;
                this._delay(function() {
                    u === this.counter && this.refreshPositions(!r)
                })
            },
            _clear: function(n, t) {
                function u(n, t, i) {
                    return function(r) {
                        i._trigger(n, r, t._uiHash(t))
                    }
                }
                this.reverting = !1;
                var i, r = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
                this._noFinalSort = null,
                this.helper[0] === this.currentItem[0]) {
                    for (i in this._storedCSS)
                        (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") && (this._storedCSS[i] = "");
                    this.currentItem.css(this._storedCSS),
                    this._removeClass(this.currentItem, "ui-sortable-helper")
                } else
                    this.currentItem.show();
                for (this.fromOutside && !t && r.push(function(n) {
                    this._trigger("receive", n, this._uiHash(this.fromOutside))
                }),
                (this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !t && r.push(function(n) {
                    this._trigger("update", n, this._uiHash())
                }),
                this !== this.currentContainer && (t || (r.push(function(n) {
                    this._trigger("remove", n, this._uiHash())
                }),
                r.push(function(n) {
                    return function(t) {
                        n._trigger("receive", t, this._uiHash(this))
                    }
                }
                .call(this, this.currentContainer)),
                r.push(function(n) {
                    return function(t) {
                        n._trigger("update", t, this._uiHash(this))
                    }
                }
                .call(this, this.currentContainer)))),
                i = this.containers.length - 1; i >= 0; i--)
                    t || r.push(u("deactivate", this, this.containers[i])),
                    this.containers[i].containerCache.over && (r.push(u("out", this, this.containers[i])),
                    this.containers[i].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
                this.storedStylesheet.remove()),
                this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
                this._storedZIndex && this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex),
                this.dragging = !1,
                t || this._trigger("beforeStop", n, this._uiHash()),
                this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
                this.helper = null),
                !t) {
                    for (i = 0; i < r.length; i++)
                        r[i].call(this, n);
                    this._trigger("stop", n, this._uiHash())
                }
                return this.fromOutside = !1,
                !this.cancelHelperRemoval
            },
            _trigger: function() {
                n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(t) {
                var i = t || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || n([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: t ? t.element : null
                }
            }
        });
        n.widget("ui.spinner", {
            version: "1.12.1",
            defaultElement: "<input>",
            widgetEventPrefix: "spin",
            options: {
                classes: {
                    "ui-spinner": "ui-corner-all",
                    "ui-spinner-down": "ui-corner-br",
                    "ui-spinner-up": "ui-corner-tr"
                },
                culture: null,
                icons: {
                    down: "ui-icon-triangle-1-s",
                    up: "ui-icon-triangle-1-n"
                },
                incremental: !0,
                max: null,
                min: null,
                numberFormat: null,
                page: 10,
                step: 1,
                change: null,
                spin: null,
                start: null,
                stop: null
            },
            _create: function() {
                this._setOption("max", this.options.max),
                this._setOption("min", this.options.min),
                this._setOption("step", this.options.step),
                this.value() !== "" && this._value(this.element.val(), !0),
                this._draw(),
                this._on(this._events),
                this._refresh(),
                this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _getCreateOptions: function() {
                var t = this._super()
                  , i = this.element;
                return n.each(["min", "max", "step"], function(n, r) {
                    var u = i.attr(r);
                    u != null && u.length && (t[r] = u)
                }),
                t
            },
            _events: {
                keydown: function(n) {
                    this._start(n) && this._keydown(n) && n.preventDefault()
                },
                keyup: "_stop",
                focus: function() {
                    this.previous = this.element.val()
                },
                blur: function(n) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    this._stop(),
                    this._refresh(),
                    this.previous !== this.element.val() && this._trigger("change", n)
                },
                mousewheel: function(n, t) {
                    if (t) {
                        if (!this.spinning && !this._start(n))
                            return !1;
                        this._spin((t > 0 ? 1 : -1) * this.options.step, n),
                        clearTimeout(this.mousewheelTimer),
                        this.mousewheelTimer = this._delay(function() {
                            this.spinning && this._stop(n)
                        }, 100),
                        n.preventDefault()
                    }
                },
                "mousedown .ui-spinner-button": function(t) {
                    function r() {
                        var t = this.element[0] === n.ui.safeActiveElement(this.document[0]);
                        t || (this.element.trigger("focus"),
                        this.previous = i,
                        this._delay(function() {
                            this.previous = i
                        }))
                    }
                    var i;
                    (i = this.element[0] === n.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(),
                    t.preventDefault(),
                    r.call(this),
                    this.cancelBlur = !0,
                    this._delay(function() {
                        delete this.cancelBlur,
                        r.call(this)
                    }),
                    this._start(t) !== !1) && this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
                },
                "mouseup .ui-spinner-button": "_stop",
                "mouseenter .ui-spinner-button": function(t) {
                    if (n(t.currentTarget).hasClass("ui-state-active")) {
                        if (this._start(t) === !1)
                            return !1;
                        this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
                    }
                },
                "mouseleave .ui-spinner-button": "_stop"
            },
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a><\/a><a><\/a>")
            },
            _draw: function() {
                this._enhance(),
                this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"),
                this._addClass("ui-spinner-input"),
                this.element.attr("role", "spinbutton"),
                this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                    classes: {
                        "ui-button": ""
                    }
                }),
                this._removeClass(this.buttons, "ui-corner-all"),
                this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"),
                this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"),
                this.buttons.first().button({
                    icon: this.options.icons.up,
                    showLabel: !1
                }),
                this.buttons.last().button({
                    icon: this.options.icons.down,
                    showLabel: !1
                }),
                this.buttons.height() > Math.ceil(this.uiSpinner.height() * .5) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
            },
            _keydown: function(t) {
                var r = this.options
                  , i = n.ui.keyCode;
                switch (t.keyCode) {
                case i.UP:
                    return this._repeat(null, 1, t),
                    !0;
                case i.DOWN:
                    return this._repeat(null, -1, t),
                    !0;
                case i.PAGE_UP:
                    return this._repeat(null, r.page, t),
                    !0;
                case i.PAGE_DOWN:
                    return this._repeat(null, -r.page, t),
                    !0
                }
                return !1
            },
            _start: function(n) {
                return !this.spinning && this._trigger("start", n) === !1 ? !1 : (this.counter || (this.counter = 1),
                this.spinning = !0,
                !0)
            },
            _repeat: function(n, t, i) {
                n = n || 500,
                clearTimeout(this.timer),
                this.timer = this._delay(function() {
                    this._repeat(40, t, i)
                }, n),
                this._spin(t * this.options.step, i)
            },
            _spin: function(n, t) {
                var i = this.value() || 0;
                this.counter || (this.counter = 1),
                i = this._adjustValue(i + n * this._increment(this.counter)),
                this.spinning && this._trigger("spin", t, {
                    value: i
                }) === !1 || (this._value(i),
                this.counter++)
            },
            _increment: function(t) {
                var i = this.options.incremental;
                return i ? n.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
            },
            _precision: function() {
                var n = this._precisionOf(this.options.step);
                return this.options.min !== null && (n = Math.max(n, this._precisionOf(this.options.min))),
                n
            },
            _precisionOf: function(n) {
                var t = n.toString()
                  , i = t.indexOf(".");
                return i === -1 ? 0 : t.length - i - 1
            },
            _adjustValue: function(n) {
                var r, i, t = this.options;
                return (r = t.min !== null ? t.min : 0,
                i = n - r,
                i = Math.round(i / t.step) * t.step,
                n = r + i,
                n = parseFloat(n.toFixed(this._precision())),
                t.max !== null && n > t.max) ? t.max : t.min !== null && n < t.min ? t.min : n
            },
            _stop: function(n) {
                this.spinning && (clearTimeout(this.timer),
                clearTimeout(this.mousewheelTimer),
                this.counter = 0,
                this.spinning = !1,
                this._trigger("stop", n))
            },
            _setOption: function(n, t) {
                var u, i, r;
                if (n === "culture" || n === "numberFormat") {
                    u = this._parse(this.element.val()),
                    this.options[n] = t,
                    this.element.val(this._format(u));
                    return
                }
                (n === "max" || n === "min" || n === "step") && typeof t == "string" && (t = this._parse(t)),
                n === "icons" && (i = this.buttons.first().find(".ui-icon"),
                this._removeClass(i, null, this.options.icons.up),
                this._addClass(i, null, t.up),
                r = this.buttons.last().find(".ui-icon"),
                this._removeClass(r, null, this.options.icons.down),
                this._addClass(r, null, t.down)),
                this._super(n, t)
            },
            _setOptionDisabled: function(n) {
                this._super(n),
                this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!n),
                this.element.prop("disabled", !!n),
                this.buttons.button(n ? "disable" : "enable")
            },
            _setOptions: i(function(n) {
                this._super(n)
            }),
            _parse: function(n) {
                return typeof n == "string" && n !== "" && (n = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(n, 10, this.options.culture) : +n),
                n === "" || isNaN(n) ? null : n
            },
            _format: function(n) {
                return n === "" ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(n, this.options.numberFormat, this.options.culture) : n
            },
            _refresh: function() {
                this.element.attr({
                    "aria-valuemin": this.options.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._parse(this.element.val())
                })
            },
            isValid: function() {
                var n = this.value();
                return n === null ? !1 : n === this._adjustValue(n)
            },
            _value: function(n, t) {
                var i;
                n !== "" && (i = this._parse(n),
                i !== null && (t || (i = this._adjustValue(i)),
                n = this._format(i))),
                this.element.val(n),
                this._refresh()
            },
            _destroy: function() {
                this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),
                this.uiSpinner.replaceWith(this.element)
            },
            stepUp: i(function(n) {
                this._stepUp(n)
            }),
            _stepUp: function(n) {
                this._start() && (this._spin((n || 1) * this.options.step),
                this._stop())
            },
            stepDown: i(function(n) {
                this._stepDown(n)
            }),
            _stepDown: function(n) {
                this._start() && (this._spin((n || 1) * -this.options.step),
                this._stop())
            },
            pageUp: i(function(n) {
                this._stepUp((n || 1) * this.options.page)
            }),
            pageDown: i(function(n) {
                this._stepDown((n || 1) * this.options.page)
            }),
            value: function(n) {
                if (!arguments.length)
                    return this._parse(this.element.val());
                i(this._value).call(this, n)
            },
            widget: function() {
                return this.uiSpinner
            }
        }),
        n.uiBackCompat !== !1 && n.widget("ui.spinner", n.ui.spinner, {
            _enhance: function() {
                this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
            },
            _uiSpinnerHtml: function() {
                return "<span>"
            },
            _buttonHtml: function() {
                return "<a><\/a><a><\/a>"
            }
        }),
        ft = n.ui.spinner,
        n.widget("ui.tabs", {
            version: "1.12.1",
            delay: 300,
            options: {
                active: null,
                classes: {
                    "ui-tabs": "ui-corner-all",
                    "ui-tabs-nav": "ui-corner-all",
                    "ui-tabs-panel": "ui-corner-bottom",
                    "ui-tabs-tab": "ui-corner-top"
                },
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function() {
                var n = /#.*$/;
                return function(t) {
                    var i, r;
                    i = t.href.replace(n, ""),
                    r = location.href.replace(n, "");
                    try {
                        i = decodeURIComponent(i)
                    } catch (u) {}
                    try {
                        r = decodeURIComponent(r)
                    } catch (u) {}
                    return t.hash.length > 1 && i === r
                }
            }(),
            _create: function() {
                var i = this
                  , t = this.options;
                this.running = !1,
                this._addClass("ui-tabs", "ui-widget ui-widget-content"),
                this._toggleClass("ui-tabs-collapsible", null, t.collapsible),
                this._processTabs(),
                t.active = this._initialActive(),
                n.isArray(t.disabled) && (t.disabled = n.unique(t.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
                    return i.tabs.index(n)
                }))).sort()),
                this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(t.active) : n(),
                this._refresh(),
                this.active.length && this.load(t.active)
            },
            _initialActive: function() {
                var t = this.options.active
                  , i = this.options.collapsible
                  , r = location.hash.substring(1);
                return t === null && (r && this.tabs.each(function(i, u) {
                    if (n(u).attr("aria-controls") === r)
                        return t = i,
                        !1
                }),
                t === null && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))),
                (t === null || t === -1) && (t = this.tabs.length ? 0 : !1)),
                t !== !1 && (t = this.tabs.index(this.tabs.eq(t)),
                t === -1 && (t = i ? !1 : 0)),
                !i && t === !1 && this.anchors.length && (t = 0),
                t
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : n()
                }
            },
            _tabKeydown: function(t) {
                var r = n(n.ui.safeActiveElement(this.document[0])).closest("li")
                  , i = this.tabs.index(r)
                  , u = !0;
                if (!this._handlePageNav(t)) {
                    switch (t.keyCode) {
                    case n.ui.keyCode.RIGHT:
                    case n.ui.keyCode.DOWN:
                        i++;
                        break;
                    case n.ui.keyCode.UP:
                    case n.ui.keyCode.LEFT:
                        u = !1,
                        i--;
                        break;
                    case n.ui.keyCode.END:
                        i = this.anchors.length - 1;
                        break;
                    case n.ui.keyCode.HOME:
                        i = 0;
                        break;
                    case n.ui.keyCode.SPACE:
                        t.preventDefault(),
                        clearTimeout(this.activating),
                        this._activate(i);
                        return;
                    case n.ui.keyCode.ENTER:
                        t.preventDefault(),
                        clearTimeout(this.activating),
                        this._activate(i === this.options.active ? !1 : i);
                        return;
                    default:
                        return
                    }
                    t.preventDefault(),
                    clearTimeout(this.activating),
                    i = this._focusNextTab(i, u),
                    t.ctrlKey || t.metaKey || (r.attr("aria-selected", "false"),
                    this.tabs.eq(i).attr("aria-selected", "true"),
                    this.activating = this._delay(function() {
                        this.option("active", i)
                    }, this.delay))
                }
            },
            _panelKeydown: function(t) {
                this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(),
                this.active.trigger("focus"))
            },
            _handlePageNav: function(t) {
                return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
                !0) : t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
                !0) : void 0
            },
            _findNextTab: function(t, i) {
                function u() {
                    return t > r && (t = 0),
                    t < 0 && (t = r),
                    t
                }
                for (var r = this.tabs.length - 1; n.inArray(u(), this.options.disabled) !== -1; )
                    t = i ? t + 1 : t - 1;
                return t
            },
            _focusNextTab: function(n, t) {
                return n = this._findNextTab(n, t),
                this.tabs.eq(n).trigger("focus"),
                n
            },
            _setOption: function(n, t) {
                if (n === "active") {
                    this._activate(t);
                    return
                }
                this._super(n, t),
                n === "collapsible" && (this._toggleClass("ui-tabs-collapsible", null, t),
                t || this.options.active !== !1 || this._activate(0)),
                n === "event" && this._setupEvents(t),
                n === "heightStyle" && this._setupHeightStyle(t)
            },
            _sanitizeSelector: function(n) {
                return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var t = this.options
                  , i = this.tablist.children(":has(a[href])");
                t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
                    return i.index(n)
                }),
                this._processTabs(),
                t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1,
                this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1,
                this.active = n()),
                this._refresh()
            },
            _refresh: function() {
                this._setOptionDisabled(this.options.disabled),
                this._setupEvents(this.options.event),
                this._setupHeightStyle(this.options.heightStyle),
                this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }),
                this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-hidden": "true"
                }),
                this.active.length ? (this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }),
                this._addClass(this.active, "ui-tabs-active", "ui-state-active"),
                this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var t = this
                  , i = this.tabs
                  , r = this.anchors
                  , u = this.panels;
                this.tablist = this._getList().attr("role", "tablist"),
                this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header");
                this.tablist.on("mousedown" + this.eventNamespace, "> li", function(t) {
                    n(this).is(".ui-state-disabled") && t.preventDefault()
                }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                    n(this).closest("li").is(".ui-state-disabled") && this.blur()
                });
                this.tabs = this.tablist.find("> li:has(a[href])").attr({
                    role: "tab",
                    tabIndex: -1
                }),
                this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
                this.anchors = this.tabs.map(function() {
                    return n("a", this)[0]
                }).attr({
                    role: "presentation",
                    tabIndex: -1
                }),
                this._addClass(this.anchors, "ui-tabs-anchor"),
                this.panels = n(),
                this.anchors.each(function(i, r) {
                    var f, u, e, s = n(r).uniqueId().attr("id"), o = n(r).closest("li"), h = o.attr("aria-controls");
                    t._isLocal(r) ? (f = r.hash,
                    e = f.substring(1),
                    u = t.element.find(t._sanitizeSelector(f))) : (e = o.attr("aria-controls") || n({}).uniqueId()[0].id,
                    f = "#" + e,
                    u = t.element.find(f),
                    u.length || (u = t._createPanel(e),
                    u.insertAfter(t.panels[i - 1] || t.tablist)),
                    u.attr("aria-live", "polite")),
                    u.length && (t.panels = t.panels.add(u)),
                    h && o.data("ui-tabs-aria-controls", h),
                    o.attr({
                        "aria-controls": e,
                        "aria-labelledby": s
                    }),
                    u.attr("aria-labelledby", s)
                }),
                this.panels.attr("role", "tabpanel"),
                this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
                i && (this._off(i.not(this.tabs)),
                this._off(r.not(this.anchors)),
                this._off(u.not(this.panels)))
            },
            _getList: function() {
                return this.tablist || this.element.find("ol, ul").eq(0)
            },
            _createPanel: function(t) {
                return n("<div>").attr("id", t).data("ui-tabs-destroy", !0)
            },
            _setOptionDisabled: function(t) {
                var i, u, r;
                for (n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1),
                r = 0; u = this.tabs[r]; r++)
                    i = n(u),
                    t === !0 || n.inArray(r, t) !== -1 ? (i.attr("aria-disabled", "true"),
                    this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"),
                    this._removeClass(i, null, "ui-state-disabled"));
                this.options.disabled = t,
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, t === !0)
            },
            _setupEvents: function(t) {
                var i = {};
                t && n.each(t.split(" "), function(n, t) {
                    i[t] = "_eventHandler"
                }),
                this._off(this.anchors.add(this.tabs).add(this.panels)),
                this._on(!0, this.anchors, {
                    click: function(n) {
                        n.preventDefault()
                    }
                }),
                this._on(this.anchors, i),
                this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }),
                this._on(this.panels, {
                    keydown: "_panelKeydown"
                }),
                this._focusable(this.tabs),
                this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(t) {
                var i, r = this.element.parent();
                t === "fill" ? (i = r.height(),
                i -= this.element.outerHeight() - this.element.height(),
                this.element.siblings(":visible").each(function() {
                    var t = n(this)
                      , r = t.css("position");
                    r !== "absolute" && r !== "fixed" && (i -= t.outerHeight(!0))
                }),
                this.element.children().not(this.panels).each(function() {
                    i -= n(this).outerHeight(!0)
                }),
                this.panels.each(function() {
                    n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
                }).css("overflow", "auto")) : t === "auto" && (i = 0,
                this.panels.each(function() {
                    i = Math.max(i, n(this).height("").height())
                }).height(i))
            },
            _eventHandler: function(t) {
                var u = this.options
                  , r = this.active
                  , c = n(t.currentTarget)
                  , i = c.closest("li")
                  , f = i[0] === r[0]
                  , e = f && u.collapsible
                  , o = e ? n() : this._getPanelForTab(i)
                  , s = r.length ? this._getPanelForTab(r) : n()
                  , h = {
                    oldTab: r,
                    oldPanel: s,
                    newTab: e ? n() : i,
                    newPanel: o
                };
                (t.preventDefault(),
                i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1) || (u.active = e ? !1 : this.tabs.index(i),
                this.active = f ? n() : i,
                this.xhr && this.xhr.abort(),
                s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."),
                o.length && this.load(this.tabs.index(i), t),
                this._toggle(t, h))
            },
            _toggle: function(t, i) {
                function e() {
                    r.running = !1,
                    r._trigger("activate", t, i)
                }
                function o() {
                    r._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                    u.length && r.options.show ? r._show(u, r.options.show, e) : (u.show(),
                    e())
                }
                var r = this
                  , u = i.newPanel
                  , f = i.oldPanel;
                this.running = !0,
                f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
                    r._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                    o()
                }) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                f.hide(),
                o()),
                f.attr("aria-hidden", "true"),
                i.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }),
                u.length && f.length ? i.oldTab.attr("tabIndex", -1) : u.length && this.tabs.filter(function() {
                    return n(this).attr("tabIndex") === 0
                }).attr("tabIndex", -1),
                u.attr("aria-hidden", "false"),
                i.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _activate: function(t) {
                var r, i = this._findActive(t);
                i[0] !== this.active[0] && (i.length || (i = this.active),
                r = i.find(".ui-tabs-anchor")[0],
                this._eventHandler({
                    target: r,
                    currentTarget: r,
                    preventDefault: n.noop
                }))
            },
            _findActive: function(t) {
                return t === !1 ? n() : this.tabs.eq(t)
            },
            _getIndex: function(t) {
                return typeof t == "string" && (t = this.anchors.index(this.anchors.filter("[href$='" + n.ui.escapeSelector(t) + "']"))),
                t
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(),
                this.tablist.removeAttr("role").off(this.eventNamespace),
                this.anchors.removeAttr("role tabIndex").removeUniqueId(),
                this.tabs.add(this.panels).each(function() {
                    n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
                }),
                this.tabs.each(function() {
                    var t = n(this)
                      , i = t.data("ui-tabs-aria-controls");
                    i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
                }),
                this.panels.show(),
                this.options.heightStyle !== "content" && this.panels.css("height", "")
            },
            enable: function(t) {
                var i = this.options.disabled;
                i !== !1 && (t === undefined ? i = !1 : (t = this._getIndex(t),
                i = n.isArray(i) ? n.map(i, function(n) {
                    return n !== t ? n : null
                }) : n.map(this.tabs, function(n, i) {
                    return i !== t ? i : null
                })),
                this._setOptionDisabled(i))
            },
            disable: function(t) {
                var i = this.options.disabled;
                if (i !== !0) {
                    if (t === undefined)
                        i = !0;
                    else {
                        if (t = this._getIndex(t),
                        n.inArray(t, i) !== -1)
                            return;
                        i = n.isArray(i) ? n.merge([t], i).sort() : [t]
                    }
                    this._setOptionDisabled(i)
                }
            },
            load: function(t, i) {
                t = this._getIndex(t);
                var r = this
                  , u = this.tabs.eq(t)
                  , e = u.find(".ui-tabs-anchor")
                  , f = this._getPanelForTab(u)
                  , o = {
                    tab: u,
                    panel: f
                }
                  , s = function(n, t) {
                    t === "abort" && r.panels.stop(!1, !0),
                    r._removeClass(u, "ui-tabs-loading"),
                    f.removeAttr("aria-busy"),
                    n === r.xhr && delete r.xhr
                };
                this._isLocal(e[0]) || (this.xhr = n.ajax(this._ajaxSettings(e, i, o)),
                this.xhr && this.xhr.statusText !== "canceled" && (this._addClass(u, "ui-tabs-loading"),
                f.attr("aria-busy", "true"),
                this.xhr.done(function(n, t, u) {
                    setTimeout(function() {
                        f.html(n),
                        r._trigger("load", i, o),
                        s(u, t)
                    }, 1)
                }).fail(function(n, t) {
                    setTimeout(function() {
                        s(n, t)
                    }, 1)
                })))
            },
            _ajaxSettings: function(t, i, r) {
                var u = this;
                return {
                    url: t.attr("href").replace(/#.*$/, ""),
                    beforeSend: function(t, f) {
                        return u._trigger("beforeLoad", i, n.extend({
                            jqXHR: t,
                            ajaxSettings: f
                        }, r))
                    }
                }
            },
            _getPanelForTab: function(t) {
                var i = n(t).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + i))
            }
        }),
        n.uiBackCompat !== !1 && n.widget("ui.tabs", n.ui.tabs, {
            _processTabs: function() {
                this._superApply(arguments),
                this._addClass(this.tabs, "ui-tab")
            }
        }),
        et = n.ui.tabs,
        n.widget("ui.tooltip", {
            version: "1.12.1",
            options: {
                classes: {
                    "ui-tooltip": "ui-corner-all ui-widget-shadow"
                },
                content: function() {
                    var t = n(this).attr("title") || "";
                    return n("<a>").text(t).html()
                },
                hide: !0,
                items: "[title]:not([disabled])",
                position: {
                    my: "left top+15",
                    at: "left bottom",
                    collision: "flipfit flip"
                },
                show: !0,
                track: !1,
                close: null,
                open: null
            },
            _addDescribedBy: function(t, i) {
                var r = (t.attr("aria-describedby") || "").split(/\s+/);
                r.push(i),
                t.data("ui-tooltip-id", i).attr("aria-describedby", n.trim(r.join(" ")))
            },
            _removeDescribedBy: function(t) {
                var u = t.data("ui-tooltip-id")
                  , i = (t.attr("aria-describedby") || "").split(/\s+/)
                  , r = n.inArray(u, i);
                r !== -1 && i.splice(r, 1),
                t.removeData("ui-tooltip-id"),
                i = n.trim(i.join(" ")),
                i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
            },
            _create: function() {
                this._on({
                    mouseover: "open",
                    focusin: "open"
                }),
                this.tooltips = {},
                this.parents = {},
                this.liveRegion = n("<div>").attr({
                    role: "log",
                    "aria-live": "assertive",
                    "aria-relevant": "additions"
                }).appendTo(this.document[0].body),
                this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
                this.disabledTitles = n([])
            },
            _setOption: function(t, i) {
                var r = this;
                this._super(t, i),
                t === "content" && n.each(this.tooltips, function(n, t) {
                    r._updateContent(t.element)
                })
            },
            _setOptionDisabled: function(n) {
                this[n ? "_disable" : "_enable"]()
            },
            _disable: function() {
                var t = this;
                n.each(this.tooltips, function(i, r) {
                    var u = n.Event("blur");
                    u.target = u.currentTarget = r.element[0],
                    t.close(u, !0)
                }),
                this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                    var t = n(this);
                    if (t.is("[title]"))
                        return t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
                }))
            },
            _enable: function() {
                this.disabledTitles.each(function() {
                    var t = n(this);
                    t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
                }),
                this.disabledTitles = n([])
            },
            open: function(t) {
                var r = this
                  , i = n(t ? t.target : this.element).closest(this.options.items);
                i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")),
                i.data("ui-tooltip-open", !0),
                t && t.type === "mouseover" && i.parents().each(function() {
                    var t = n(this), i;
                    t.data("ui-tooltip-open") && (i = n.Event("blur"),
                    i.target = i.currentTarget = this,
                    r.close(i, !0)),
                    t.attr("title") && (t.uniqueId(),
                    r.parents[this.id] = {
                        element: this,
                        title: t.attr("title")
                    },
                    t.attr("title", ""))
                }),
                this._registerCloseHandlers(t, i),
                this._updateContent(i, t))
            },
            _updateContent: function(n, t) {
                var r, i = this.options.content, u = this, f = t ? t.type : null;
                if (typeof i == "string" || i.nodeType || i.jquery)
                    return this._open(t, n, i);
                r = i.call(n[0], function(i) {
                    u._delay(function() {
                        n.data("ui-tooltip-open") && (t && (t.type = f),
                        this._open(t, n, i))
                    })
                }),
                r && this._open(t, n, r)
            },
            _open: function(t, i, r) {
                function s(n) {
                    (o.of = n,
                    u.is(":hidden")) || u.position(o)
                }
                var f, u, h, e, o = n.extend({}, this.options.position);
                if (r) {
                    if (f = this._find(i),
                    f) {
                        f.tooltip.find(".ui-tooltip-content").html(r);
                        return
                    }
                    i.is("[title]") && (t && t.type === "mouseover" ? i.attr("title", "") : i.removeAttr("title")),
                    f = this._tooltip(i),
                    u = f.tooltip,
                    this._addDescribedBy(i, u.attr("id")),
                    u.find(".ui-tooltip-content").html(r),
                    this.liveRegion.children().hide(),
                    e = n("<div>").html(u.find(".ui-tooltip-content").html()),
                    e.removeAttr("name").find("[name]").removeAttr("name"),
                    e.removeAttr("id").find("[id]").removeAttr("id"),
                    e.appendTo(this.liveRegion),
                    this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
                        mousemove: s
                    }),
                    s(t)) : u.position(n.extend({
                        of: i
                    }, this.options.position)),
                    u.hide(),
                    this._show(u, this.options.show),
                    this.options.track && this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
                        u.is(":visible") && (s(o.of),
                        clearInterval(h))
                    }, n.fx.interval)),
                    this._trigger("open", t, {
                        tooltip: u
                    })
                }
            },
            _registerCloseHandlers: function(t, i) {
                var r = {
                    keyup: function(t) {
                        if (t.keyCode === n.ui.keyCode.ESCAPE) {
                            var r = n.Event(t);
                            r.currentTarget = i[0],
                            this.close(r, !0)
                        }
                    }
                };
                i[0] !== this.element[0] && (r.remove = function() {
                    this._removeTooltip(this._find(i).tooltip)
                }
                ),
                t && t.type !== "mouseover" || (r.mouseleave = "close"),
                t && t.type !== "focusin" || (r.focusout = "close"),
                this._on(!0, i, r)
            },
            close: function(t) {
                var u, f = this, i = n(t ? t.currentTarget : this.element), r = this._find(i);
                if (!r) {
                    i.removeData("ui-tooltip-open");
                    return
                }
                (u = r.tooltip,
                r.closing) || (clearInterval(this.delayedShow),
                i.data("ui-tooltip-title") && !i.attr("title") && i.attr("title", i.data("ui-tooltip-title")),
                this._removeDescribedBy(i),
                r.hiding = !0,
                u.stop(!0),
                this._hide(u, this.options.hide, function() {
                    f._removeTooltip(n(this))
                }),
                i.removeData("ui-tooltip-open"),
                this._off(i, "mouseleave focusout keyup"),
                i[0] !== this.element[0] && this._off(i, "remove"),
                this._off(this.document, "mousemove"),
                t && t.type === "mouseleave" && n.each(this.parents, function(t, i) {
                    n(i.element).attr("title", i.title),
                    delete f.parents[t]
                }),
                r.closing = !0,
                this._trigger("close", t, {
                    tooltip: u
                }),
                r.hiding || (r.closing = !1))
            },
            _tooltip: function(t) {
                var i = n("<div>").attr("role", "tooltip")
                  , r = n("<div>").appendTo(i)
                  , u = i.uniqueId().attr("id");
                return this._addClass(r, "ui-tooltip-content"),
                this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"),
                i.appendTo(this._appendTo(t)),
                this.tooltips[u] = {
                    element: t,
                    tooltip: i
                }
            },
            _find: function(n) {
                var t = n.data("ui-tooltip-id");
                return t ? this.tooltips[t] : null
            },
            _removeTooltip: function(n) {
                n.remove(),
                delete this.tooltips[n.attr("id")]
            },
            _appendTo: function(n) {
                var t = n.closest(".ui-front, dialog");
                return t.length || (t = this.document[0].body),
                t
            },
            _destroy: function() {
                var t = this;
                n.each(this.tooltips, function(i, r) {
                    var f = n.Event("blur")
                      , u = r.element;
                    f.target = f.currentTarget = u[0],
                    t.close(f, !0),
                    n("#" + i).remove(),
                    u.data("ui-tooltip-title") && (u.attr("title") || u.attr("title", u.data("ui-tooltip-title")),
                    u.removeData("ui-tooltip-title"))
                }),
                this.liveRegion.remove()
            }
        }),
        n.uiBackCompat !== !1 && n.widget("ui.tooltip", n.ui.tooltip, {
            options: {
                tooltipClass: null
            },
            _tooltip: function() {
                var n = this._superApply(arguments);
                return this.options.tooltipClass && n.tooltip.addClass(this.options.tooltipClass),
                n
            }
        }),
        ot = n.ui.tooltip
    }),
    n("siteSearch", ["jquery", "jquery-ui"], function(n) {
        "use strict";
        return function() {
            this.initialize = function() {
                n("#header-search, #pagesearch").autocomplete({
                    source: function(t, i) {
                        n.ajax({
                            url: "/find_v2/_autocomplete",
                            dataType: "jsonp",
                            data: {
                                prefix: t.term,
                                size: 3
                            },
                            success: function(t) {
                                i(n.map(t.hits, function(n) {
                                    return {
                                        label: n.query,
                                        value: n.query
                                    }
                                }))
                            }
                        })
                    },
                    minLength: 2,
                    select: function(t, i) {
                        n(this).val(i.item.value),
                        n(this).closest("form").submit()
                    }
                })
            }
        }
    }),
    n("windowScroll", ["jquery", "underscore"], function(n, t) {
        "use strict";
        return function() {
            var u = 0
              , f = n("body").height()
              , e = 300
              , r = !1
              , i = null
              , o = 200;
            this.initialize = function() {
                var i = this;
                i.handleScroll();
                n(window).on("scroll", t.throttle(function() {
                    i.handleScroll()
                }, o))
            }
            ,
            this.handleScroll = function() {
                var t = this;
                u = n(window).scrollTop(),
                u > f / 2 ? t.pastMiddle() : t.aboveMiddle(),
                u > e ? t.menuPastTravelLimit() : t.menuAboveTravelLimit()
            }
            ,
            this.pastMiddle = function() {
                r === !1 && (r = !0,
                n(window).trigger("scrolled.past-middle"))
            }
            ,
            this.aboveMiddle = function() {
                r === !0 && (r = !1,
                n(window).trigger("scrolled.above-middle"))
            }
            ,
            this.menuPastTravelLimit = function() {
                (i === !1 || i === null) && (i = !0,
                n(window).trigger("scrolled.past-menu-limit"))
            }
            ,
            this.menuAboveTravelLimit = function() {
                (i || i === null) && (i = !1,
                n(window).trigger("scrolled.above-menu-limit"))
            }
        }
    }),
    n("lightbox", ["jquery"], function(n) {
        "use strict";
        return function() {
            this.initialize = function(n) {
                this.$lightBox = null,
                this.$trigger = n
            }
            ,
            this.createLightBox = function() {
                var t = n('<div class="overlay__content">')
                  , i = n("<button />", {
                    "class": "overlay__close icon-cross",
                    html: '<span class="visuallyhidden">Close video<\/span>'
                })
                  , r = n("<div />", {
                    "class": "l-container overlay__container",
                    html: [i, t]
                })
                  , u = n("<div />", {
                    "class": "overlay",
                    html: r
                });
                n("body").prepend(u),
                this.$lightBox = n(".overlay"),
                this.$closeBtn = this.$lightBox.find(".overlay__close"),
                this.showLightBox(),
                this.addLightBoxEvents()
            }
            ,
            this.addLightBoxEvents = function() {
                this.$closeBtn.on("click", n.proxy(this.hideLightBox, this));
                this.$lightBox.on("click", n.proxy(this.hideLightBox, this))
            }
            ,
            this.toggleLightBox = function() {
                this.$lightBox === null ? this.createLightBox() : this.showLightBox()
            }
            ,
            this.hideLightBox = function(n) {
                n && n.preventDefault(),
                this.$trigger.focus(),
                this.$lightBox.hide().removeClass("overlay--fade-in").find(".overlay__content").empty()
            }
            ,
            this.showLightBox = function() {
                var n = this;
                n.$lightBox.show(),
                n.$closeBtn.focus(),
                window.setTimeout(function() {
                    n.$lightBox.addClass("overlay--fade-in")
                }, 300)
            }
            ,
            this.insertIframe = function(t) {
                n(".overlay__content").append(t)
            }
        }
    }),
    n("video", ["jquery", "lightbox"], function(n, t) {
        "use strict";
        var i = function() {
            this.initialize = function() {
                var t = this, i, r;
                (t.$el = n(".c-media--video"),
                t.$heroVideoTriggers = n(".c-hero-block--video .js-video-trigger"),
                t.$el.length || t.$heroVideoTriggers.length) && (t.Lightboxes = [],
                t.$el.length && (i = t.$el.find(".c-media__link"),
                r = t.$el.find(".c-media__play-button"),
                t.initLightbox(i),
                t.initLightbox(r),
                t.addEvents(i),
                t.addEvents(r)),
                t.$heroVideoTriggers.length && t.$heroVideoTriggers.each(function() {
                    var i = n(this);
                    t.initLightbox(i),
                    t.addEvents(i)
                }))
            }
        };
        return i.prototype = {
            initLightbox: function(n) {
                var i = this;
                i.Lightboxes.push(new t),
                i.Lightboxes[i.Lightboxes.length - 1].initialize(n),
                n.attr("data-lightbox-index", i.Lightboxes.length - 1)
            },
            addEvents: function(t) {
                var i = this;
                t.on("click", n.proxy(i.clickTrigger, i))
            },
            clickTrigger: function(t) {
                t.preventDefault();
                var i = n(t.currentTarget)
                  , r = this
                  , f = i.attr("data-video-id")
                  , e = i.attr("data-video-type")
                  , u = i.attr("data-lightbox-index");
                r.Lightboxes[u].toggleLightBox(),
                r.insertVideo(f, e, u)
            },
            insertVideo: function(t, i, r) {
                var u = "//fast.wistia.net/embed/iframe/" + t + "?videoFoam=true&playerColor=FF553E&autoplay=true"
                  , f = n("<iframe />", {
                    "class": "overlay__iframe wistia_embed",
                    src: u,
                    allowfullscreen: !0
                });
                this.Lightboxes[r].insertIframe(f)
            }
        },
        i
    }),
    n("infoBlock", ["jquery"], function(n) {
        "use strict";
        return function() {
            var i = ".l-info-block__col"
              , t = ".c-info-block__image"
              , r = ".c-info-block__container-helper"
              , u = ".c-info-block__container-content"
              , f = ".l-info-block";
            this.initialize = function() {
                var i = this, r;
                n(t).length && (i.handleBlocks(),
                n(window).resize(function() {
                    clearTimeout(r),
                    r = setTimeout(function() {
                        i.handleBlocks()
                    }, 200)
                }).resize())
            }
            ,
            this.handleBlocks = function() {
                window.currentBreakpoint && (window.currentBreakpoint > 767 ? n(t).each(n.proxy(this.calcColHeight, this)) : this.removeStyle())
            }
            ,
            this.removeStyle = function() {
                n(t).parents(r).removeAttr("style"),
                n(u).parents(i).removeAttr("style")
            }
            ,
            this.calcColHeight = function(t, i) {
                var e = n(i)
                  , o = e.parents(f).find(u)
                  , l = e.parents(r)
                  , s = e.height()
                  , h = o.outerHeight()
                  , c = s;
                h > s && (c = h),
                this.setHeights(o, l, c)
            }
            ,
            this.setHeights = function(n, t, r) {
                n.parents(i).css("min-height", r),
                t.css("height", r)
            }
        }
    }),
    n("breakpoints", ["jquery", "underscore"], function(n, t) {
        "use strict";
        return function() {
            var r = 200, i;
            this.initialize = function() {
                var i = this;
                i.refreshBreakpoint();
                n(window).off("resize.breakpoints").on("resize.breakpoints", t.throttle(function() {
                    i.refreshBreakpoint()
                }, r))
            }
            ,
            this.refreshBreakpoint = function() {
                var t = this
                  , n = t.getBreakpoint();
                n !== "" && i !== n && (i = n,
                t.pullTrigger())
            }
            ,
            this.getBreakpoint = function() {
                return window.getComputedStyle(document.querySelector("body"), ":before").getPropertyValue("content").replace(/\"|'/g, "")
            }
            ,
            this.pullTrigger = function() {
                n(window).trigger({
                    type: "breakpoint",
                    breakpoint: i
                }),
                window.currentBreakpoint = i
            }
        }
    }),
    n("callToAction", ["jquery", "app"], function(n, t) {
        "use strict";
        return function() {
            var u, g, nt, i, at, e, tt, s, l, r, it, rt, h, a, ut, vt, ft, v, o, y, p, ct, f, c, w, b, et, ot, lt, k, d, st, ht;
            this.initialize = function() {
                var at = this;
                if (u = n(window),
                g = "/CallToActionBlock/Step1/Post",
                nt = "/CallToActionBlock/Post",
                i = n(".c-call-to-action"),
                i.length) {
                    e = n(".c-call-to-action__step1"),
                    tt = n(".button-call-to-action--step1"),
                    s = n(".c-call-to-action-form--step1"),
                    l = e.find(".button-toggle"),
                    r = n(".c-call-to-action__step2"),
                    it = n(".button-call-to-action--step2"),
                    rt = r.find(".c-call-to-action__close"),
                    h = r.find(".button-toggle"),
                    a = n("#CallToActionFormModel\\_Country"),
                    ut = n("#CallToActionFormModel\\_State"),
                    ft = n(".email-step-2"),
                    v = n(".c-call-to-action-form--step2"),
                    o = n(".c-call-to-action__step3"),
                    y = o.find(".c-call-to-action__close"),
                    f = o.data("seconds-to-show-message"),
                    f = f === 0 || f === undefined ? 4e3 : parseInt(f) * 1e3,
                    c = i,
                    w = [],
                    p = "",
                    ct = !1,
                    b = "step",
                    et = "2",
                    ot = "success",
                    lt = "4",
                    k = "block",
                    d = i.data("trackingId"),
                    st = "?" + k + "=" + d + "&" + b + "=" + et,
                    ht = "?" + k + "=" + d + "&" + b + "=" + ot;
                    s.on("submit", _.bind(this.onClickStep1button, this));
                    tt.on("click", _.bind(this.onClickStep1button, this));
                    it.on("click", _.bind(this.onClickStep2button, this));
                    rt.on("click", _.bind(this.onClickCloseStep2Button, this));
                    y.on("click", _.bind(this.onClickCloseStep3Button, this));
                    l.on("click", _.bind(this.onClickToggleButton, this));
                    h.on("click", _.bind(this.onClickToggleButton, this));
                    a.on("change.country", _.bind(this.onChangeCountry, this));
                    u.on("scroll.callToActionStep1", _.throttle(_.bind(this.onScrolling, this), 200));
                    u.on("scroll.gtmTracking", _.throttle(_.bind(this.onTrackingScrolling, this), 200));
                    a.each(function() {
                        var t = n(this);
                        at.checkUSA(t)
                    }),
                    at.fadeInIfInViewport(i)
                }
            }
            ,
            this.checkUSA = function(n) {
                var t = n.closest(v)
                  , i = t.find(ut)
                  , r = i.closest("label");
                t.data("validateUsaState", !1),
                r.hasClass("is-visible") && r.removeClass("is-visible"),
                n.val().toLowerCase() === "usa" ? (i.addClass("required"),
                r.addClass("is-visible"),
                t.data("validateUsaState", !0)) : i.val("")
            }
            ,
            this.onChangeCountry = function(t) {
                this.checkUSA(n(t.currentTarget))
            }
            ,
            this.onClickToggleButton = function(i) {
                i.preventDefault(),
                n(i.target).closest(".c-call-to-action__expand-button-container").toggleClass("is-expanded"),
                i && t.gtmTracking && n(i.target).attr("aria-expanded") === "true" && (t.gtmTracking.handleTracking(i.target),
                n("html, body").animate({
                    scrollTop: n(i.target).offset().top - 300
                }, 500))
            }
            ,
            this.onClickStep1button = function(u) {
                var a, v;
                u.preventDefault(),
                t.gtmTracking.handleTracking(u.target);
                var l = n(u.target)
                  , f = l.closest(i)
                  , o = l.closest(s)
                  , c = o.find(".c-call-to-action-input-email");
                if (c.removeClass("is-invalid"),
                o.removeData("gtm-tracking"),
                this.validateEmail(c.val()) === !1) {
                    c.addClass("is-invalid").focus(),
                    o.data("gtm-tracking", {
                        eventLabel: "Step 1 - Invalid fields: Email",
                        event: "formError"
                    }),
                    t.gtmTracking.handleTracking(s);
                    return
                }
                p = c.val(),
                f.find(r).find(ft).val(p),
                this.submitFormStep1(o),
                a = function() {
                    f.find(".l-call-to-action__col").removeClass("is-animating").addClass("is-visible"),
                    f.find(r).fadeIn(400, v)
                }
                ,
                v = function() {
                    var n = f.find(h);
                    n.attr("aria-expanded") === "true" && n.trigger("click")
                }
                ,
                this.updateStepIndicator(f),
                n.when(l.closest(e).fadeOut(300, a)).done(this.onStep2Visible(f))
            }
            ,
            this.updateStepIndicator = function(n) {
                var t = n.find(".c-call-to-action__steps")
                  , i = t.find(".c-call-to-action__steps-item");
                i.toggleClass("is-active")
            }
            ,
            this.submitFormStep1 = function(t) {
                var i = this;
                n.ajax({
                    type: "POST",
                    url: g,
                    data: t.serialize(),
                    success: function(n) {
                        console.log("success", n)
                    },
                    error: function(n) {
                        console.log("error", n)
                    }
                })
            }
            ,
            this.onStep2Visible = function(n) {
                this.changeUrl("", st),
                this.scrollToCtaBlock(n)
            }
            ,
            this.onClickStep2button = function(t) {
                var r = n(t.currentTarget)
                  , u = r.closest(i);
                t.preventDefault(),
                this.submitFormStep2(u)
            }
            ,
            this.submitFormStep2 = function(i) {
                var f = this
                  , u = i.find(v);
                n.ajax({
                    type: "POST",
                    url: nt,
                    data: u.serialize(),
                    success: function(n) {
                        if (_.contains(n, "error"))
                            f.validateStep2Form(n.model, u);
                        else {
                            var e = u.closest(r);
                            t.gtmTracking.handleTracking(e),
                            f.showStep3(i)
                        }
                    },
                    error: function(n) {
                        console.log("in error", n)
                    }
                })
            }
            ,
            this.validateStep2Form = function(i, r) {
                var e = this, u = [], f;
                _.map(i, function(n, t) {
                    var i = r.find("#CallToActionFormModel_" + t);
                    if ((i.closest("label").removeClass("is-invalid"),
                    i.off("change.invalid"),
                    r.data("validateUsaState") !== !1 || t !== "State") && n === null) {
                        i.closest("label").addClass("is-invalid");
                        i.on("change.invalid", e.onChangeInvalidField);
                        u.push(t)
                    }
                }),
                r.removeData("gtm-tracking"),
                u.length > 0 && (r.data("gtm-tracking", {
                    eventLabel: "Step 2 - Invalid fields: " + u.join(", "),
                    event: "formError"
                }),
                t.gtmTracking.handleTracking(r),
                f = r.find(".is-invalid").first(),
                n(f).find("input, select").focus())
            }
            ,
            this.onChangeInvalidField = function() {
                (this.value !== "" || this.value !== undefined) && (n(this).closest("label").removeClass("is-invalid"),
                n(this).off("change.invalid"))
            }
            ,
            this.showStep3 = function(n) {
                var t = n.find(h)
                  , i = n.find(r)
                  , u = n.find(o)
                  , e = n.find(y);
                this.scrollToCtaBlock(n),
                t.attr("aria-expanded") === "true" && t.trigger("click"),
                i.fadeOut(150, function() {
                    u.fadeIn(400),
                    self.closeStep3Timer = setTimeout(function() {
                        e.trigger("click")
                    }, f)
                }),
                this.changeUrl("", ht)
            }
            ,
            this.onClickCloseStep2Button = function(t) {
                var o = this
                  , u = n(t.currentTarget).closest(i)
                  , s = u.find(e)
                  , h = u.find(r)
                  , f = u.find(l);
                t.preventDefault(),
                h.fadeOut(150, function() {
                    o.updateStepIndicator(u),
                    s.fadeIn(250, function() {
                        f.attr("aria-expanded") === "true" && f.trigger("click")
                    })
                })
            }
            ,
            this.onClickCloseStep3Button = function(t) {
                var u = this
                  , r = n(t.currentTarget).closest(i)
                  , f = r.find(e)
                  , s = r.find(o);
                t.preventDefault(),
                r.addClass("has-signed-up"),
                s.fadeOut(150, function() {
                    u.updateStepIndicator(r),
                    f.fadeIn(250)
                }),
                clearTimeout(this.closeStep3Timer)
            }
            ,
            this.onTrackingScrolling = function() {
                var r = u.height();
                if (c.length < 1) {
                    u.off("scroll.gtmTracking");
                    return
                }
                c = _.filter(c, function(i) {
                    var u = n(i)
                      , f = u.attr("data-cta-block-id")
                      , e = u[0].getBoundingClientRect();
                    return e.top >= 0 && e.bottom <= r && (t.gtmTracking.handleTracking(u),
                    w.push(f)),
                    !_.contains(w, f)
                })
            }
            ,
            this.onScrolling = function() {
                if (!window.currentBreakpoint || window.currentBreakpoint < 568) {
                    u.off("scroll.callToActionStep1");
                    return
                }
                this.fadeInIfInViewport(i)
            }
            ,
            this.validateEmail = function(n) {
                var t = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return t.test(n)
            }
            ,
            this.changeUrl = function(n, t) {
                if (typeof history.replaceState != "undefined") {
                    var i = {
                        Page: n,
                        Url: t
                    };
                    history.replaceState(i, i.Page, i.Url)
                }
            }
            ,
            this.scrollToCtaBlock = function(t) {
                var i = n(".site-header").height();
                i === undefined && (i = 90),
                n("html, body").animate({
                    scrollTop: t.offset().top - i
                }, 500)
            }
            ,
            this.fadeInIfInViewport = function(t) {
                var i = u.height();
                t.each(function() {
                    var r = n(this)
                      , u = r.find(".l-call-to-action__col--text")
                      , f = r.find(".l-call-to-action__col--image")
                      , t = r[0].getBoundingClientRect();
                    t.top <= i - t.height * .4 && t.bottom >= t.height * .4 && (u.addClass("is-animating"),
                    f.addClass("is-animating"))
                })
            }
        }
    }),
    n("eventAgendaOverview", ["jquery", "app"], function(n) {
        "use strict";
        return function() {
            var t, i = function(n, t, i, r) {
                n.not(t).removeClass("is-active"),
                t.addClass("is-active"),
                i.not(r).addClass("is-closed"),
                r.removeClass("is-closed")
            };
            this.initialize = function() {
                t = this;
                var r = n(".c-event-agenda-overview");
                r.length && t.events.init(r)
            }
            ,
            this.events = {
                init: function() {
                    t.events.clickNavItem()
                },
                clickNavItem: function() {
                    var u = ".c-event-agenda-overview__navigation-link";
                    n("body").on("click", u, function(t) {
                        t.preventDefault();
                        var f = n(u)
                          , r = n(t.currentTarget)
                          , e = n(".c-event-agenda-overview__tab")
                          , o = n(r.attr("href"));
                        i(f, r, e, o)
                    })
                }
            }
        }
    }),
    r(["jquery", "underscore", "picturefill", "grunticon", "animation", "domToggle", "imageCover", "parsley", "app", "gtmTracking", "menuMain", "submenuMain", "menuTools", "siteFooter", "siteSearch", "windowScroll", "video", "infoBlock", "breakpoints", "callToAction", "eventAgendaOverview"], function(n, t, i, r, u, f, e, o, s, h, c, l, a, v, y, p, w, b, k, d, g) {
        "use strict";
        function tt(i) {
            t.each(i, function(t) {
                var i = n(t).data("module"), f = i.options || {}, r = nt[i.module], u;
                r && (u = new r,
                u.initialize(f))
            })
        }
        var nt = {};
        n(function() {
            var t, i, r, u, o, nt, it, rt, ut, ft, et, ot, st, ht;
            s.gtmTracking = new h,
            s.gtmTracking.initialize(),
            t = n("[data-module]"),
            tt(t),
            i = new c,
            i.initialize(),
            r = new w,
            r.initialize(),
            u = new l,
            u.initialize(),
            o = new a,
            o.initialize(),
            nt = new f,
            nt.initialize(),
            it = new e,
            it.initialize(),
            rt = new v,
            rt.initialize(),
            ut = new y,
            ut.initialize(),
            ft = new p,
            ft.initialize(),
            et = new b,
            et.initialize(),
            ot = new d,
            ot.initialize(),
            st = new g,
            st.initialize(),
            ht = new k,
            ht.initialize()
        })
    }),
    n("main", function() {})
})(),
window.Modernizr = function(n, t, i) {
    function p(n) {
        k.cssText = n
    }
    function u(n, t) {
        return typeof n === t
    }
    function tt(n, t) {
        return !!~("" + n).indexOf(t)
    }
    function w(n, t) {
        var u, r;
        for (u in n)
            if (r = n[u],
            !tt(r, "-") && k[r] !== i)
                return t == "pfx" ? r : !0;
        return !1
    }
    function it(n, t, r) {
        var e, f;
        for (e in n)
            if (f = t[n[e]],
            f !== i)
                return r === !1 ? n[e] : u(f, "function") ? f.bind(r || t) : f;
        return !1
    }
    function h(n, t, i) {
        var r = n.charAt(0).toUpperCase() + n.slice(1)
          , f = (n + " " + g.join(r + " ") + r).split(" ");
        return u(t, "string") || u(t, "undefined") ? w(f, t) : (f = (n + " " + nt.join(r + " ") + r).split(" "),
        it(f, t, i))
    }
    var rt = "2.8.3", r = {}, c = !0, l = t.documentElement, ut = "modernizr", b = t.createElement(ut), k = b.style, ft, ot = {}.toString, d = "Webkit Moz O ms", g = d.split(" "), nt = d.toLowerCase().split(" "), et = {
        svg: "http://www.w3.org/2000/svg"
    }, f = {}, st = {}, ht = {}, a = [], v = a.slice, e, y = {}.hasOwnProperty, o, s;
    o = !u(y, "undefined") && !u(y.call, "undefined") ? function(n, t) {
        return y.call(n, t)
    }
    : function(n, t) {
        return t in n && u(n.constructor.prototype[t], "undefined")
    }
    ,
    Function.prototype.bind || (Function.prototype.bind = function(n) {
        var t = this, i, r;
        if (typeof t != "function")
            throw new TypeError;
        return i = v.call(arguments, 1),
        r = function() {
            var f, e, u;
            return this instanceof r ? (f = function() {}
            ,
            f.prototype = t.prototype,
            e = new f,
            u = t.apply(e, i.concat(v.call(arguments))),
            Object(u) === u ? u : e) : t.apply(n, i.concat(v.call(arguments)))
        }
        ,
        r
    }
    ),
    f.cssanimations = function() {
        return h("animationName")
    }
    ,
    f.csstransforms = function() {
        return !!h("transform")
    }
    ,
    f.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(et.svg, "svg").createSVGRect
    }
    ;
    for (s in f)
        o(f, s) && (e = s.toLowerCase(),
        r[e] = f[s](),
        a.push((r[e] ? "" : "no-") + e));
    return r.addTest = function(n, t) {
        if (typeof n == "object")
            for (var u in n)
                o(n, u) && r.addTest(u, n[u]);
        else {
            if (n = n.toLowerCase(),
            r[n] !== i)
                return r;
            t = typeof t == "function" ? t() : t,
            typeof c != "undefined" && c && (l.className += " " + (t ? "" : "no-") + n),
            r[n] = t
        }
        return r
    }
    ,
    p(""),
    b = ft = null,
    r._version = rt,
    r._domPrefixes = nt,
    r._cssomPrefixes = g,
    r.testProp = function(n) {
        return w([n])
    }
    ,
    r.testAllProps = h,
    l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (c ? " js " + a.join(" ") : ""),
    r
}(this, this.document)
