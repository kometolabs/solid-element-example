const D = (e, t) => e === t, j = {
  equals: D
};
let J = z;
const y = 1, C = 2, K = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var p = null;
let x = null, Q = null, c = null, h = null, g = null, v = 0;
function W(e, t) {
  const s = c, r = p, n = e.length === 0, l = t === void 0 ? r : t, i = n ? K : {
    owned: null,
    cleanups: null,
    context: l ? l.context : null,
    owner: l
  }, o = n ? e : () => e(() => R(() => b(i)));
  p = i, c = null;
  try {
    return w(o, !0);
  } finally {
    c = s, p = r;
  }
}
function L(e, t) {
  t = t ? Object.assign({}, j, t) : j;
  const s = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (n) => (typeof n == "function" && (n = n(s.value)), U(s, n));
  return [X.bind(s), r];
}
function k(e, t, s) {
  const r = Y(e, t, !1, y);
  T(r);
}
function R(e) {
  if (c === null) return e();
  const t = c;
  c = null;
  try {
    return e();
  } finally {
    c = t;
  }
}
function X() {
  if (this.sources && this.state)
    if (this.state === y) T(this);
    else {
      const e = h;
      h = null, w(() => S(this), !1), h = e;
    }
  if (c) {
    const e = this.observers ? this.observers.length : 0;
    c.sources ? (c.sources.push(this), c.sourceSlots.push(e)) : (c.sources = [this], c.sourceSlots = [e]), this.observers ? (this.observers.push(c), this.observerSlots.push(c.sources.length - 1)) : (this.observers = [c], this.observerSlots = [c.sources.length - 1]);
  }
  return this.value;
}
function U(e, t, s) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && w(() => {
    for (let n = 0; n < e.observers.length; n += 1) {
      const l = e.observers[n], i = x && x.running;
      i && x.disposed.has(l), (i ? !l.tState : !l.state) && (l.pure ? h.push(l) : g.push(l), l.observers && F(l)), i || (l.state = y);
    }
    if (h.length > 1e6)
      throw h = [], new Error();
  }, !1)), t;
}
function T(e) {
  if (!e.fn) return;
  b(e);
  const t = v;
  Z(e, e.value, t);
}
function Z(e, t, s) {
  let r;
  const n = p, l = c;
  c = p = e;
  try {
    r = e.fn(t);
  } catch (i) {
    return e.pure && (e.state = y, e.owned && e.owned.forEach(b), e.owned = null), e.updatedAt = s + 1, I(i);
  } finally {
    c = l, p = n;
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? U(e, r) : e.value = r, e.updatedAt = s);
}
function Y(e, t, s, r = y, n) {
  const l = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: p,
    context: p ? p.context : null,
    pure: s
  };
  return p === null || p !== K && (p.owned ? p.owned.push(l) : p.owned = [l]), l;
}
function V(e) {
  if (e.state === 0) return;
  if (e.state === C) return S(e);
  if (e.suspense && R(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < v); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (e = t[s], e.state === y)
      T(e);
    else if (e.state === C) {
      const r = h;
      h = null, w(() => S(e, t[0]), !1), h = r;
    }
}
function w(e, t) {
  if (h) return e();
  let s = !1;
  t || (h = []), g ? s = !0 : g = [], v++;
  try {
    const r = e();
    return ee(s), r;
  } catch (r) {
    s || (g = null), h = null, I(r);
  }
}
function ee(e) {
  if (h && (z(h), h = null), e) return;
  const t = g;
  g = null, t.length && w(() => J(t), !1);
}
function z(e) {
  for (let t = 0; t < e.length; t++) V(e[t]);
}
function S(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const r = e.sources[s];
    if (r.sources) {
      const n = r.state;
      n === y ? r !== t && (!r.updatedAt || r.updatedAt < v) && V(r) : n === C && S(r, t);
    }
  }
}
function F(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state || (s.state = C, s.pure ? h.push(s) : g.push(s), s.observers && F(s));
  }
}
function b(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), r = e.sourceSlots.pop(), n = s.observers;
      if (n && n.length) {
        const l = n.pop(), i = s.observerSlots.pop();
        r < n.length && (l.sourceSlots[i] = r, n[r] = l, s.observerSlots[r] = i);
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) b(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) b(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function te(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function I(e, t = p) {
  throw te(e);
}
function se(e, t, s) {
  let r = s.length, n = t.length, l = r, i = 0, o = 0, u = t[n - 1].nextSibling, a = null;
  for (; i < n || o < l; ) {
    if (t[i] === s[o]) {
      i++, o++;
      continue;
    }
    for (; t[n - 1] === s[l - 1]; )
      n--, l--;
    if (n === i) {
      const f = l < r ? o ? s[o - 1].nextSibling : s[l - o] : u;
      for (; o < l; ) e.insertBefore(s[o++], f);
    } else if (l === o)
      for (; i < n; )
        (!a || !a.has(t[i])) && t[i].remove(), i++;
    else if (t[i] === s[l - 1] && s[o] === t[n - 1]) {
      const f = t[--n].nextSibling;
      e.insertBefore(s[o++], t[i++].nextSibling), e.insertBefore(s[--l], f), t[n] = s[l];
    } else {
      if (!a) {
        a = /* @__PURE__ */ new Map();
        let d = o;
        for (; d < l; ) a.set(s[d], d++);
      }
      const f = a.get(t[i]);
      if (f != null)
        if (o < f && f < l) {
          let d = i, E = 1, P;
          for (; ++d < n && d < l && !((P = a.get(t[d])) == null || P !== f + E); )
            E++;
          if (E > f - o) {
            const H = t[i];
            for (; o < f; ) e.insertBefore(s[o++], H);
          } else e.replaceChild(s[o++], t[i++]);
        } else i++;
      else t[i++].remove();
    }
  }
}
const m = "_$DX_DELEGATE";
function ne(e, t, s, r) {
  let n;
  const l = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, o.content.firstChild;
  }, i = () => (n || (n = l())).cloneNode(!0);
  return i.cloneNode = i, i;
}
function re(e, t = window.document) {
  const s = t[m] || (t[m] = /* @__PURE__ */ new Set());
  for (let r = 0, n = e.length; r < n; r++) {
    const l = e[r];
    s.has(l) || (s.add(l), t.addEventListener(l, le));
  }
}
function M(e, t, s, r) {
  if (typeof t != "function") return A(e, t, r, s);
  k((n) => A(e, t(), n, s), r);
}
function le(e) {
  let t = e.target;
  const s = `$$${e.type}`, r = e.target, n = e.currentTarget, l = (u) => Object.defineProperty(e, "target", {
    configurable: !0,
    value: u
  }), i = () => {
    const u = t[s];
    if (u && !t.disabled) {
      const a = t[`${s}Data`];
      if (a !== void 0 ? u.call(t, a, e) : u.call(t, e), e.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(e.target) && l(t.host), !0;
  }, o = () => {
    for (; i() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), e.composedPath) {
    const u = e.composedPath();
    l(u[0]);
    for (let a = 0; a < u.length - 2 && (t = u[a], !!i()); a++) {
      if (t._$host) {
        t = t._$host, o();
        break;
      }
      if (t.parentNode === n)
        break;
    }
  } else o();
  l(r);
}
function A(e, t, s, r, n) {
  for (; typeof s == "function"; ) s = s();
  if (t === s) return s;
  const l = typeof t;
  if (e = e, l === "string" || l === "number") {
    if (l === "number" && (t = t.toString(), t === s))
      return s;
    s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  } else if (t == null || l === "boolean")
    s = _(e, s, r);
  else {
    if (l === "function")
      return k(() => {
        let i = t();
        for (; typeof i == "function"; ) i = i();
        s = A(e, i, s, r);
      }), () => s;
    if (Array.isArray(t)) {
      const i = [], o = s && Array.isArray(s);
      if (O(i, t, s, n))
        return k(() => s = A(e, i, s, r, !0)), () => s;
      i.length === 0 ? s = _(e, s, r) : o ? s.length === 0 ? N(e, i, r) : se(e, s, i) : (s && _(e), N(e, i)), s = i;
    } else t.nodeType && (Array.isArray(s) ? _(e, s, null, t) : s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild), s = t);
  }
  return s;
}
function O(e, t, s, r) {
  let n = !1;
  for (let l = 0, i = t.length; l < i; l++) {
    let o = t[l], u = s && s[e.length], a;
    if (!(o == null || o === !0 || o === !1)) if ((a = typeof o) == "object" && o.nodeType)
      e.push(o);
    else if (Array.isArray(o))
      n = O(e, o, u) || n;
    else if (a === "function")
      if (r) {
        for (; typeof o == "function"; ) o = o();
        n = O(e, Array.isArray(o) ? o : [o], Array.isArray(u) ? u : [u]) || n;
      } else
        e.push(o), n = !0;
    else {
      const f = String(o);
      u && u.nodeType === 3 && u.data === f ? e.push(u) : e.push(document.createTextNode(f));
    }
  }
  return n;
}
function N(e, t, s = null) {
  for (let r = 0, n = t.length; r < n; r++) e.insertBefore(t[r], s);
}
function _(e, t, s, r) {
  if (s === void 0) return e.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const o = t[i];
      if (n !== o) {
        const u = o.parentNode === e;
        !l && !i ? u ? e.replaceChild(n, o) : e.insertBefore(n, s) : u && o.remove();
      } else l = !0;
    }
  } else e.insertBefore(n, s);
  return [n];
}
function ie(e) {
  return Object.keys(e).reduce((s, r) => {
    const n = e[r];
    return s[r] = Object.assign({}, n), G(n.value) && !fe(n.value) && !Array.isArray(n.value) && (s[r].value = Object.assign({}, n.value)), Array.isArray(n.value) && (s[r].value = n.value.slice(0)), s;
  }, {});
}
function oe(e) {
  return e ? Object.keys(e).reduce((s, r) => {
    const n = e[r];
    return s[r] = G(n) && "value" in n ? n : {
      value: n
    }, s[r].attribute || (s[r].attribute = ae(r)), s[r].parse = "parse" in s[r] ? s[r].parse : typeof s[r].value != "string", s;
  }, {}) : {};
}
function ue(e) {
  return Object.keys(e).reduce((s, r) => (s[r] = e[r].value, s), {});
}
function ce(e, t) {
  const s = ie(t);
  return Object.keys(t).forEach((n) => {
    const l = s[n], i = e.getAttribute(l.attribute), o = e[n];
    i != null && (l.value = l.parse ? q(i) : i), o != null && (l.value = Array.isArray(o) ? o.slice(0) : o), l.reflect && B(e, l.attribute, l.value, !!l.parse), Object.defineProperty(e, n, {
      get() {
        return l.value;
      },
      set(u) {
        const a = l.value;
        l.value = u, l.reflect && B(this, l.attribute, l.value, !!l.parse);
        for (let f = 0, d = this.__propertyChangedCallbacks.length; f < d; f++)
          this.__propertyChangedCallbacks[f](n, u, a);
      },
      enumerable: !0,
      configurable: !0
    });
  }), s;
}
function q(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function B(e, t, s, r) {
  if (s == null || s === !1) return e.removeAttribute(t);
  let n = r ? JSON.stringify(s) : s;
  e.__updating[t] = !0, n === "true" && (n = ""), e.setAttribute(t, n), Promise.resolve().then(() => delete e.__updating[t]);
}
function ae(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, s) => "-" + s.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function G(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function fe(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function he(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let $;
function pe(e, t) {
  const s = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return s.map((n) => t[n].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = ce(this, t);
      const n = ue(this.props), l = this.Component, i = $;
      try {
        $ = this, this.__initialized = !0, he(l) ? new l(n, {
          element: this
        }) : l(n, {
          element: this
        });
      } finally {
        $ = i;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let n = null;
      for (; n = this.__releaseCallbacks.pop(); ) n(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(n, l, i) {
      if (this.__initialized && !this.__updating[n] && (n = this.lookupProp(n), n in t)) {
        if (i == null && !this[n]) return;
        this[n] = t[n].parse ? q(i) : i;
      }
    }
    lookupProp(n) {
      if (t)
        return s.find((l) => n === l || n === t[l].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(n) {
      this.__releaseCallbacks.push(n);
    }
    addPropertyChangedCallback(n) {
      this.__propertyChangedCallbacks.push(n);
    }
  };
}
function de(e, t = {}, s = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: n,
    customElements: l = window.customElements
  } = s;
  return (i) => {
    let o = l.get(e);
    return o ? (o.prototype.Component = i, o) : (o = pe(r, oe(t)), o.prototype.Component = i, o.prototype.registeredTag = e, l.define(e, o, n), o);
  };
}
function ge(e) {
  const t = Object.keys(e), s = {};
  for (let r = 0; r < t.length; r++) {
    const [n, l] = L(e[t[r]]);
    Object.defineProperty(s, t[r], {
      get: n,
      set(i) {
        l(() => i);
      }
    });
  }
  return s;
}
function ye(e) {
  if (e.assignedSlot && e.assignedSlot._$owner) return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function be(e) {
  return (t, s) => {
    const { element: r } = s;
    return W((n) => {
      const l = ge(t);
      r.addPropertyChangedCallback((o, u) => l[o] = u), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", n();
      });
      const i = e(l, s);
      return M(r.renderRoot, i);
    }, ye(r));
  };
}
function we(e, t, s) {
  return arguments.length === 2 && (s = t, t = {}), de(e, t)(be(s));
}
var _e = /* @__PURE__ */ ne("<div><style></style><button>Click to Enlarge");
const Ce = (e) => `
:host button {
  background-color: light-dark(white, indigo);
  color: light-dark(indigo, white);
  border: 1px solid light-dark(indigo, white);
  border-radius: ${e * 0.5}px;
  cursor: pointer;
  padding: ${e}px ${e * 1.5}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e * 1.5}px;
}
`;
we("resizable-button", {
  defaultSize: 10
}, (e) => {
  const {
    defaultSize: t
  } = e, [s, r] = L(t), n = async () => {
    r((l) => ++l);
  };
  return (() => {
    var l = _e(), i = l.firstChild, o = i.nextSibling;
    return M(i, () => Ce(s())), o.$$click = n, l;
  })();
});
re(["click"]);
export {
  Ce as styles
};
