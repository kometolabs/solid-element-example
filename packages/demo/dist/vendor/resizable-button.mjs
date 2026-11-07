// ../../node_modules/.pnpm/solid-js@1.9.18/node_modules/solid-js/dist/solid.js
var e = {
	context: void 0,
	registry: void 0,
	effects: void 0,
	done: !1,
	getContextId() {
		return t(this.context.count);
	},
	getNextContextId() {
		return t(this.context.count++);
	}
};
function t(t) {
	let n = String(t), r = n.length - 1;
	return e.context.id + (r ? String.fromCharCode(96 + r) : "") + n;
}
var n = { equals: (e, t) => e === t }, r = null, i = D, a = 1, o = 2, s = {
	owned: null,
	cleanups: null,
	context: null,
	owner: null
}, c = null, l = null, u = null, d = null, f = null, p = 0;
function ee(e, t) {
	let n = u, r = c, i = e.length === 0, a = t === void 0 ? r : t, o = i ? s : {
		owned: null,
		cleanups: null,
		context: a ? a.context : null,
		owner: a
	}, l = i ? e : () => e(m(o));
	c = o, u = null;
	try {
		return T(l, !0);
	} finally {
		u = n, c = r;
	}
}
function m(e) {
	return () => _(() => A(e));
}
function h(e, t) {
	t = t ? Object.assign({}, n, t) : n;
	let r = {
		value: e,
		observers: null,
		observerSlots: null,
		comparator: t.equals || void 0
	};
	return [y.bind(r), (e) => (typeof e == "function" && (e = l && l.running && l.sources.has(r) ? e(r.tValue) : e(r.value)), b(r, e))];
}
function g(e, t, n) {
	x(C(e, t, !1, a));
}
function _(e) {
	if (u === null) return e();
	let t = u;
	u = null;
	try {
		return e();
	} finally {
		u = t;
	}
}
var [te, v] = /*@__PURE__*/ h(!1);
function y() {
	let e = l && l.running;
	if (this.sources && (e ? this.tState : this.state)) {
		if ((e ? this.tState : this.state) === a) x(this);
		else {
			let e = d;
			d = null, T(() => O(this), !1), d = e;
		}
	}
	if (u) {
		let e = this.observers;
		if (!e || e[e.length - 1] !== u) {
			let t = e ? e.length : 0;
			u.sources ? (u.sources.push(this), u.sourceSlots.push(t)) : (u.sources = [this], u.sourceSlots = [t]), e ? (e.push(u), this.observerSlots.push(u.sources.length - 1)) : (this.observers = [u], this.observerSlots = [u.sources.length - 1]);
		}
	}
	return e && l.sources.has(this) ? this.tValue : this.value;
}
function b(e, t, n) {
	let r = l && l.running && l.sources.has(e) ? e.tValue : e.value;
	if (!e.comparator || !e.comparator(r, t)) {
		if (l) {
			let r = l.running;
			(r || !n && l.sources.has(e)) && (l.sources.add(e), e.tValue = t), r || (e.value = t);
		} else e.value = t;
		e.observers && e.observers.length && T(() => {
			for (let t = 0; t < e.observers.length; t += 1) {
				let n = e.observers[t], r = l && l.running;
				r && l.disposed.has(n) || ((r ? !n.tState : !n.state) && (n.pure ? d.push(n) : f.push(n), n.observers && k(n)), r ? n.tState = a : n.state = a);
			}
			if (d.length > 1e6) throw d = [], Error();
		}, !1);
	}
	return t;
}
function x(e) {
	if (!e.fn) return;
	A(e);
	let t = p;
	S(e, l && l.running && l.sources.has(e) ? e.tValue : e.value, t), l && !l.running && l.sources.has(e) && queueMicrotask(() => {
		T(() => {
			l && (l.running = !0), u = c = e, S(e, e.tValue, t), u = c = null;
		}, !1);
	});
}
function S(e, t, n) {
	let r, i = c, o = u;
	u = c = e;
	try {
		r = e.fn(t);
	} catch (t) {
		return e.pure && (l && l.running ? (e.tState = a, e.tOwned && e.tOwned.forEach(A), e.tOwned = void 0) : (e.state = a, e.owned && e.owned.forEach(A), e.owned = null)), e.updatedAt = n + 1, N(t);
	} finally {
		u = o, c = i;
	}
	(!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? b(e, r, !0) : l && l.running && e.pure ? (l.sources.has(e) || (e.value = r), l.sources.add(e), e.tValue = r) : e.value = r, e.updatedAt = n);
}
function C(e, t, n, r = a, i) {
	let o = {
		fn: e,
		state: r,
		updatedAt: null,
		owned: null,
		sources: null,
		sourceSlots: null,
		cleanups: null,
		value: t,
		owner: c,
		context: c ? c.context : null,
		pure: n
	};
	return l && l.running && (o.state = 0, o.tState = r), c === null || c !== s && (l && l.running && c.pure ? c.tOwned ? c.tOwned.push(o) : c.tOwned = [o] : c.owned ? c.owned.push(o) : c.owned = [o]), o;
}
function w(e) {
	let t = l && l.running;
	if ((t ? e.tState : e.state) === 0) return;
	if ((t ? e.tState : e.state) === o) return O(e);
	if (e.suspense && _(e.suspense.inFallback)) return e.suspense.effects.push(e);
	let n = [e];
	for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < p);) {
		if (t && l.disposed.has(e)) return;
		(t ? e.tState : e.state) && n.push(e);
	}
	for (let r = n.length - 1; r >= 0; r--) {
		if (e = n[r], t) {
			let t = e, i = n[r + 1];
			for (; (t = t.owner) && t !== i;) if (l.disposed.has(t)) return;
		}
		if ((t ? e.tState : e.state) === a) x(e);
		else if ((t ? e.tState : e.state) === o) {
			let t = d;
			d = null, T(() => O(e, n[0]), !1), d = t;
		}
	}
}
function T(e, t) {
	if (d) return e();
	let n = !1;
	t || (d = []), f ? n = !0 : f = [], p++;
	try {
		let t = e();
		return E(n), t;
	} catch (e) {
		n || (f = null), d = null, N(e);
	}
}
function E(e) {
	if (d &&= (D(d), null), e) return;
	let t;
	if (l) {
		if (!l.promises.size && !l.queue.size) {
			let e = l.sources, n = l.disposed;
			f.push.apply(f, l.effects), t = l.resolve;
			for (let e of f) "tState" in e && (e.state = e.tState), delete e.tState;
			l = null, T(() => {
				for (let e of n) A(e);
				for (let t of e) {
					if (t.value = t.tValue, t.owned) for (let e = 0, n = t.owned.length; e < n; e++) A(t.owned[e]);
					t.tOwned && (t.owned = t.tOwned), delete t.tValue, delete t.tOwned, t.tState = 0;
				}
				v(!1);
			}, !1);
		} else if (l.running) {
			l.running = !1, l.effects.push.apply(l.effects, f), f = null, v(!0);
			return;
		}
	}
	let n = f;
	f = null, n.length && T(() => i(n), !1), t && t();
}
function D(e) {
	for (let t = 0; t < e.length; t++) w(e[t]);
}
function O(e, t) {
	let n = l && l.running;
	n ? e.tState = 0 : e.state = 0;
	for (let r = 0; r < e.sources.length; r += 1) {
		let i = e.sources[r];
		if (i.sources) {
			let e = n ? i.tState : i.state;
			e === a ? i !== t && (!i.updatedAt || i.updatedAt < p) && w(i) : e === o && O(i, t);
		}
	}
}
function k(e) {
	let t = l && l.running;
	for (let n = 0; n < e.observers.length; n += 1) {
		let r = e.observers[n];
		(t ? !r.tState : !r.state) && (t ? r.tState = o : r.state = o, r.pure ? d.push(r) : f.push(r), r.observers && k(r));
	}
}
function A(e) {
	let t;
	if (e.sources) for (; e.sources.length;) {
		let t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
		if (r && r.length) {
			let e = r.pop(), i = t.observerSlots.pop();
			n < r.length && (e.sourceSlots[i] = n, r[n] = e, t.observerSlots[n] = i);
		}
	}
	if (e.tOwned) {
		for (t = e.tOwned.length - 1; t >= 0; t--) A(e.tOwned[t]);
		delete e.tOwned;
	}
	if (l && l.running && e.pure) j(e, !0);
	else if (e.owned) {
		for (t = e.owned.length - 1; t >= 0; t--) A(e.owned[t]);
		e.owned = null;
	}
	if (e.cleanups) {
		for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
		e.cleanups = null;
	}
	l && l.running ? e.tState = 0 : e.state = 0;
}
function j(e, t) {
	if (t || (e.tState = 0, l.disposed.add(e)), e.owned) for (let t = 0; t < e.owned.length; t++) j(e.owned[t]);
}
function ne(e) {
	return e instanceof Error ? e : Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function M(e, t, n) {
	try {
		for (let n of t) n(e);
	} catch (e) {
		N(e, n && n.owner || null);
	}
}
function N(e, t = c) {
	let n = r && t && t.context && t.context[r], i = ne(e);
	if (!n) throw i;
	f ? f.push({
		fn() {
			M(i, n, t);
		},
		state: a
	}) : M(i, n, t);
}
// ../../node_modules/.pnpm/solid-js@1.9.18/node_modules/solid-js/web/dist/web.js
function P(e, t, n) {
	let r = n.length, i = t.length, a = r, o = 0, s = 0, c = t[i - 1].nextSibling, l = null;
	for (; o < i || s < a;) if (t[o] === n[s]) o++, s++;
	else {
		for (; t[i - 1] === n[a - 1];) i--, a--;
		if (i === o) {
			let t = a < r ? s ? n[s - 1].nextSibling : n[a - s] : c;
			for (; s < a;) e.insertBefore(n[s++], t);
		} else if (a === s) for (; o < i;) l && l.has(t[o]) || t[o].remove(), o++;
		else if (t[o] === n[a - 1] && n[s] === t[i - 1]) {
			let r = t[--i].nextSibling;
			e.insertBefore(n[s++], t[o++].nextSibling), e.insertBefore(n[--a], r), t[i] = n[a];
		} else {
			if (!l) {
				l = /* @__PURE__ */ new Map();
				let e = s;
				for (; e < a;) l.set(n[e], e++);
			}
			let r = l.get(t[o]);
			if (r != null) {
				if (s < r && r < a) {
					let c = o, u = 1, d;
					for (; ++c < i && c < a && (d = l.get(t[c])) != null && d === r + u;) u++;
					if (u > r - s) {
						let i = t[o];
						for (; s < r;) e.insertBefore(n[s++], i);
					} else e.replaceChild(n[s++], t[o++]);
				} else o++;
			} else t[o++].remove();
		}
	}
}
var F = "_$DX_DELEGATE";
function I(e, t, n, r) {
	let i, a = () => {
		let t = r ? document.createElementNS("http://www.w3.org/1998/Math/MathML", "template") : document.createElement("template");
		return t.innerHTML = e, n ? t.content.firstChild.firstChild : r ? t.firstChild : t.content.firstChild;
	}, o = t ? () => _(() => document.importNode(i ||= a(), !0)) : () => (i ||= a()).cloneNode(!0);
	return o.cloneNode = o, o;
}
function L(e, t = window.document) {
	let n = t[F] || (t[F] = /* @__PURE__ */ new Set());
	for (let r = 0, i = e.length; r < i; r++) {
		let i = e[r];
		n.has(i) || (n.add(i), t.addEventListener(i, B));
	}
}
function R(e, t, n, r) {
	if (n !== void 0 && !r && (r = []), typeof t != "function") return V(e, t, r, n);
	g((r) => V(e, t(), r, n), r);
}
function z(t) {
	return !!e.context && !e.done && (!t || t.isConnected);
}
function B(t) {
	if (e.registry && e.events && e.events.find(([e, n]) => n === t)) return;
	let n = t.target, r = `$$${t.type}`, i = t.target, a = t.currentTarget, o = (e) => Object.defineProperty(t, "target", {
		configurable: !0,
		value: e
	}), s = () => {
		let e = n[r];
		if (e && !n.disabled) {
			let i = n[`${r}Data`];
			if (i === void 0 ? e.call(n, t) : e.call(n, i, t), t.cancelBubble) return;
		}
		return n.host && typeof n.host != "string" && !n.host._$host && n.contains(t.target) && o(n.host), !0;
	}, c = () => {
		for (; s() && (n = n._$host || n.parentNode || n.host););
	};
	Object.defineProperty(t, "currentTarget", {
		configurable: !0,
		get() {
			return n || document;
		}
	}), e.registry && !e.done && (e.done = _$HY.done = !0);
	try {
		if (t.composedPath) {
			let e = t.composedPath();
			o(e[0]);
			for (let t = 0; t < e.length - 2 && (n = e[t], s()); t++) {
				if (n._$host) {
					n = n._$host, c();
					break;
				}
				if (n.parentNode === a) break;
			}
		} else c();
		o(i);
	} finally {
		t = n = null;
	}
}
function V(e, t, n, r, i) {
	let a = z(e);
	if (a) {
		!n && (n = [...e.childNodes]);
		let t = [];
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			r.nodeType === 8 && r.data.slice(0, 2) === "!$" ? r.remove() : t.push(r);
		}
		n = t;
	}
	for (; typeof n == "function";) n = n();
	if (t === n) return n;
	let o = typeof t, s = r !== void 0;
	if (e = s && n[0] && n[0].parentNode || e, o === "string" || o === "number") {
		if (a || o === "number" && (t = t.toString(), t === n)) return n;
		if (s) {
			let i = n[0];
			i && i.nodeType === 3 ? i.data !== t && (i.data = t) : i = document.createTextNode(t), n = W(e, n, r, i);
		} else n = n !== "" && typeof n == "string" ? e.firstChild.data = t : e.textContent = t;
	} else if (t == null || o === "boolean") {
		if (a) return n;
		n = W(e, n, r);
	} else if (o === "function") return g(() => {
		let i = t();
		for (; typeof i == "function";) i = i();
		n = V(e, i, n, r);
	}), () => n;
	else if (Array.isArray(t)) {
		let o = [], c = n && Array.isArray(n);
		if (H(o, t, n, i)) return g(() => n = V(e, o, n, r, !0)), () => n;
		if (a) {
			if (!o.length) return n;
			if (r === void 0) return n = [...e.childNodes];
			let t = o[0];
			if (t.parentNode !== e) return n;
			let i = [t];
			for (; (t = t.nextSibling) !== r;) i.push(t);
			return n = i;
		}
		if (o.length === 0) {
			if (n = W(e, n, r), s) return n;
		} else c ? n.length === 0 ? U(e, o, r) : P(e, n, o) : (n && W(e), U(e, o));
		n = o;
	} else if (t.nodeType) {
		if (a && t.parentNode) return n = s ? [t] : t;
		if (Array.isArray(n)) {
			if (s) return n = W(e, n, r, t);
			W(e, n, null, t);
		} else n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
		n = t;
	}
	return n;
}
function H(e, t, n, r) {
	let i = !1;
	for (let a = 0, o = t.length; a < o; a++) {
		let o = t[a], s = n && n[e.length], c;
		if (o != null && o !== !0 && o !== !1) {
			if ((c = typeof o) == "object" && o.nodeType) e.push(o);
			else if (Array.isArray(o)) i = H(e, o, s) || i;
			else if (c === "function") {
				if (r) {
					for (; typeof o == "function";) o = o();
					i = H(e, Array.isArray(o) ? o : [o], Array.isArray(s) ? s : [s]) || i;
				} else e.push(o), i = !0;
			} else {
				let t = String(o);
				s && s.nodeType === 3 && s.data === t ? e.push(s) : e.push(document.createTextNode(t));
			}
		}
	}
	return i;
}
function U(e, t, n = null) {
	for (let r = 0, i = t.length; r < i; r++) e.insertBefore(t[r], n);
}
function W(e, t, n, r) {
	if (n === void 0) return e.textContent = "";
	let i = r || document.createTextNode("");
	if (t.length) {
		let r = !1;
		for (let a = t.length - 1; a >= 0; a--) {
			let o = t[a];
			if (i !== o) {
				let t = o.parentNode === e;
				!r && !a ? t ? e.replaceChild(i, o) : e.insertBefore(i, n) : t && o.remove();
			} else r = !0;
		}
	} else e.insertBefore(i, n);
	return [i];
}
// ../../node_modules/.pnpm/component-register@0.8.8/node_modules/component-register/dist/component-register.js
function G(e) {
	return Object.keys(e).reduce((t, n) => {
		let r = e[n];
		return t[n] = Object.assign({}, r), Q(r.value) && !re(r.value) && !Array.isArray(r.value) && (t[n].value = Object.assign({}, r.value)), Array.isArray(r.value) && (t[n].value = r.value.slice(0)), t;
	}, {});
}
function K(e) {
	return e ? Object.keys(e).reduce((t, n) => {
		let r = e[n];
		return t[n] = Q(r) && "value" in r ? r : { value: r }, t[n].attribute || (t[n].attribute = Z(n)), t[n].parse = "parse" in t[n] ? t[n].parse : typeof t[n].value != "string", t;
	}, {}) : {};
}
function q(e) {
	return Object.keys(e).reduce((t, n) => (t[n] = e[n].value, t), {});
}
function J(e, t) {
	let n = G(t);
	return Object.keys(t).forEach((t) => {
		let r = n[t], i = e.getAttribute(r.attribute), a = e[t];
		i != null && (r.value = r.parse ? Y(i) : i), a != null && (r.value = Array.isArray(a) ? a.slice(0) : a), r.reflect && X(e, r.attribute, r.value, !!r.parse), Object.defineProperty(e, t, {
			get() {
				return r.value;
			},
			set(e) {
				let n = r.value;
				r.value = e, r.reflect && X(this, r.attribute, r.value, !!r.parse);
				for (let r = 0, i = this.__propertyChangedCallbacks.length; r < i; r++) this.__propertyChangedCallbacks[r](t, e, n);
			},
			enumerable: !0,
			configurable: !0
		});
	}), n;
}
function Y(e) {
	if (e) try {
		return JSON.parse(e);
	} catch {
		return e;
	}
}
function X(e, t, n, r) {
	if (n == null || n === !1) return e.removeAttribute(t);
	let i = r ? JSON.stringify(n) : n;
	e.__updating[t] = !0, i === "true" && (i = ""), e.setAttribute(t, i), Promise.resolve().then(() => delete e.__updating[t]);
}
function Z(e) {
	return e.replace(/\.?([A-Z]+)/g, (e, t) => "-" + t.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Q(e) {
	return e != null && (typeof e == "object" || typeof e == "function");
}
function re(e) {
	return Object.prototype.toString.call(e) === "[object Function]";
}
function ie(e) {
	return typeof e == "function" && e.toString().indexOf("class") === 0;
}
var $;
function ae(e, t) {
	let n = Object.keys(t);
	return class extends e {
		static get observedAttributes() {
			return n.map((e) => t[e].attribute);
		}
		constructor() {
			super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
			for (let e of n) this[e] = void 0;
		}
		connectedCallback() {
			if (this.__initialized) return;
			this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = J(this, t);
			let e = q(this.props), n = this.Component, r = $;
			try {
				$ = this, this.__initialized = !0, ie(n) ? new n(e, { element: this }) : n(e, { element: this });
			} finally {
				$ = r;
			}
		}
		async disconnectedCallback() {
			if (await Promise.resolve(), this.isConnected) return;
			this.__propertyChangedCallbacks.length = 0;
			let e = null;
			for (; e = this.__releaseCallbacks.pop();) e(this);
			delete this.__initialized, this.__released = !0;
		}
		attributeChangedCallback(e, n, r) {
			if (this.__initialized && !this.__updating[e] && (e = this.lookupProp(e), e in t)) {
				if (r == null && !this[e]) return;
				this[e] = t[e].parse ? Y(r) : r;
			}
		}
		lookupProp(e) {
			if (t) return n.find((n) => e === n || e === t[n].attribute);
		}
		get renderRoot() {
			return this.shadowRoot || this.attachShadow({ mode: "open" });
		}
		addReleaseCallback(e) {
			this.__releaseCallbacks.push(e);
		}
		addPropertyChangedCallback(e) {
			this.__propertyChangedCallbacks.push(e);
		}
	};
}
function oe(e, t = {}, n = {}) {
	let { BaseElement: r = HTMLElement, extension: i, customElements: a = window.customElements } = n;
	return (n) => {
		if (!e) throw Error("tag is required to register a Component");
		let o = a.get(e);
		return o ? (o.prototype.Component = n, o) : (o = ae(r, K(t)), o.prototype.Component = n, o.prototype.registeredTag = e, a.define(e, o, i), o);
	};
}
// ../../node_modules/.pnpm/solid-element@1.9.2_solid-js@1.9.18/node_modules/solid-element/dist/index.js
function se(e) {
	let t = Object.keys(e), n = {};
	for (let r = 0; r < t.length; r++) {
		let [i, a] = h(e[t[r]]);
		Object.defineProperty(n, t[r], {
			get: i,
			set(e) {
				a(() => e);
			}
		});
	}
	return n;
}
function ce(e) {
	if (e.assignedSlot && e.assignedSlot._$owner) return e.assignedSlot._$owner;
	let t = e.parentNode;
	for (; t;) {
		if (t._$owner) return t._$owner;
		if (t.assignedSlot && t.assignedSlot._$owner) return t.assignedSlot._$owner;
		t = t.parentNode;
	}
	return e._$owner;
}
function le(e) {
	return (t, n) => {
		let { element: r } = n;
		return ee((i) => {
			let a = se(t);
			r.addPropertyChangedCallback((e, t) => a[e] = t), r.addReleaseCallback(() => {
				r.renderRoot.textContent = "", i();
			});
			let o = e(a, n);
			return R(r.renderRoot, o);
		}, ce(r));
	};
}
function ue(e, t, n) {
	return arguments.length === 2 && (n = t, t = {}), oe(e, t)(le(n));
}
// src/resizable-button.tsx
var de = /*#__PURE__*/ I("<div><style></style><button>Click to Enlarge"), fe = (e) => `
:host button {
  background-color: light-dark(indigo, white);
  color: light-dark(white, indigo);
  border: 1px solid light-dark(white, indigo);
  border-radius: ${e * .5}px;
  cursor: pointer;
  padding: ${e}px ${e * 1.5}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e * 1.5}px;
}
`;
ue("resizable-button", { defaultSize: 10 }, (e) => {
	let { defaultSize: t } = e, [n, r] = h(t), i = async () => {
		r((e) => ++e);
	};
	return (() => {
		var e = de(), t = e.firstChild, r = t.nextSibling;
		return R(t, () => fe(n())), r.$$click = i, e;
	})();
}), L(["click"]);
