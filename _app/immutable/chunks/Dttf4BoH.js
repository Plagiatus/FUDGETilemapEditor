import{e as p,g as D,H,f as I,h as m,j as c,k as R,l as L,m as u,n as O,o as V,p as b,q as Y,r as j,t as k,u as C,v as M,w as P,x as $,y as w,c as q,z}from"./Ce_LYVoD.js";import{a as W,r as N,h}from"./DT9xDJXp.js";import{a as B}from"./BRocQdD-.js";const F=["touchstart","touchmove"];function G(t){return F.includes(t)}function X(t,e){var r=e==null?"":typeof e=="object"?e+"":e;r!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=r,t.nodeValue=r+"")}function J(t,e){return A(t,e)}function Z(t,e){p(),e.intro=e.intro??!1;const r=e.target,_=w,l=u;try{for(var a=D(r);a&&(a.nodeType!==8||a.data!==H);)a=I(a);if(!a)throw m;c(!0),R(a),L();const d=A(t,{...e,anchor:a});if(u===null||u.nodeType!==8||u.data!==O)throw V(),m;return c(!1),d}catch(d){if(d===m)return e.recover===!1&&b(),p(),Y(r),c(!1),J(t,e);throw d}finally{c(_),R(l)}}const i=new Map;function A(t,{target:e,anchor:r,props:_={},events:l,context:a,intro:d=!0}){p();var v=new Set,y=o=>{for(var s=0;s<o.length;s++){var n=o[s];if(!v.has(n)){v.add(n);var f=G(n);e.addEventListener(n,h,{passive:f});var T=i.get(n);T===void 0?(document.addEventListener(n,h,{passive:f}),i.set(n,1)):i.set(n,T+1)}}};y(j(W)),N.add(y);var g=void 0,S=k(()=>{var o=r??e.appendChild(C());return M(()=>{if(a){P({});var s=$;s.c=a}l&&(_.$$events=l),w&&B(o,null),g=t(o,_)||{},w&&(q.nodes_end=u),a&&z()}),()=>{var f;for(var s of v){e.removeEventListener(s,h);var n=i.get(s);--n===0?(document.removeEventListener(s,h),i.delete(s)):i.set(s,n)}N.delete(y),o!==r&&((f=o.parentNode)==null||f.removeChild(o))}});return E.set(g,S),g}let E=new WeakMap;function x(t,e){const r=E.get(t);return r?(E.delete(t),r(e)):Promise.resolve()}export{Z as h,J as m,X as s,x as u};
