var _t=Object.defineProperty;var Ze=s=>{throw TypeError(s)};var wt=(s,t,e)=>t in s?_t(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var L=(s,t,e)=>wt(s,typeof t!="symbol"?t+"":t,e),$e=(s,t,e)=>t.has(s)||Ze("Cannot "+e);var o=(s,t,e)=>($e(s,t,"read from private field"),e?e.call(s):t.get(s)),D=(s,t,e)=>t.has(s)?Ze("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),B=(s,t,e,i)=>($e(s,t,"write to private field"),i?i.call(s,e):t.set(s,e),e);import{t as _e,a as we}from"../chunks/CfyfeUdA.js";import{s as et,j as tt,m as bt,o as Ue,p as Tt,b as St,v as Ne,h as V,w as Et,z as zt,P as I,af as It,a6 as At,a7 as it,t as qe,f as Pe,A as kt,a8 as ot,d as dt,a9 as Ct,ar as Ve,F as ct,as as Lt,am as Mt,$ as st,k as Pt,at as Dt,au as Ot,D as Bt,av as Ft,e as Gt,aw as Rt,ax as Nt,r as qt,ay as Vt,az as Yt,a5 as Ht,aA as Ut,aB as Wt,a as vt,ab as ft,I as be,ap as ie,V as x,X as f,W as p,U as Je,a2 as K,J as Te,g as ht,R as Xt,u as Re,aC as Kt}from"../chunks/BnvAo4G9.js";import{d as je,s as at,a as Jt}from"../chunks/C8RjIbxM.js";import{p as Oe,b as U,a as Y,i as jt}from"../chunks/BonAO-cW.js";import{o as Qe}from"../chunks/BhwMF_Sa.js";let lt=!1;function ut(){lt||(lt=!0,document.addEventListener("reset",s=>{Promise.resolve().then(()=>{var t;if(!s.defaultPrevented)for(const e of s.target.elements)(t=e.__on_r)==null||t.call(e)})},{capture:!0}))}function Qt(s){var t=bt,e=Ue;et(null),tt(null);try{return s()}finally{et(t),tt(e)}}function yt(s,t,e,i=e){s.addEventListener(t,()=>Qt(e));const a=s.__on_r;a?s.__on_r=()=>{a(),i(!0)}:s.__on_r=()=>i(!0),ut()}function Zt(s,t){return t}function $t(s,t,e,i){for(var a=[],l=t.length,d=0;d<l;d++)Ot(t[d].e,a,!0);var u=l>0&&a.length===0&&e!==null;if(u){var m=e.parentNode;Bt(m),m.append(e),i.clear(),Z(s,t[0].prev,t[l-1].next)}Ft(a,()=>{for(var y=0;y<l;y++){var c=t[y];u||(i.delete(c.k),Z(s,c.prev,c.next)),Gt(c.e,!u)}})}function ei(s,t,e,i,a,l=null){var d=s,u={flags:t,items:new Map,first:null};{var m=s;d=V?Ne(Et(m)):m.appendChild(Tt())}V&&zt();var y=null,c=!1,h=It(()=>{var v=e();return Pt(v)?v:v==null?[]:ct(v)});St(()=>{var v=I(h),_=v.length;if(c&&_===0)return;c=_===0;let g=!1;if(V){var k=d.data===At;k!==(_===0)&&(d=it(),Ne(d),qe(!1),g=!0)}if(V){for(var O=null,b,S=0;S<_;S++){if(Pe.nodeType===8&&Pe.data===kt){d=Pe,g=!0,qe(!1);break}var R=v[S],z=i(R,S);b=gt(Pe,u,O,null,R,z,S,a,t,e),u.items.set(z,b),O=b}_>0&&Ne(it())}V||ti(v,u,d,a,t,i,e),l!==null&&(_===0?y?ot(y):y=dt(()=>l(d)):y!==null&&Ct(y,()=>{y=null})),g&&qe(!0),I(h)}),V&&(d=Pe)}function ti(s,t,e,i,a,l,d){var u=s.length,m=t.items,y=t.first,c=y,h,v=null,_=[],g=[],k,O,b,S;for(S=0;S<u;S+=1){if(k=s[S],O=l(k,S),b=m.get(O),b===void 0){var R=c?c.e.nodes_start:e;v=gt(R,t,v,v===null?t.first:v.next,k,O,S,i,a,d),m.set(O,v),_=[],g=[],c=v.next;continue}if(ii(b,k,S),b.e.f&Ve&&ot(b.e),b!==c){if(h!==void 0&&h.has(b)){if(_.length<g.length){var z=g[0],N;v=z.prev;var W=_[0],X=_[_.length-1];for(N=0;N<_.length;N+=1)nt(_[N],z,e);for(N=0;N<g.length;N+=1)h.delete(g[N]);Z(t,W.prev,X.next),Z(t,v,W),Z(t,X,z),c=z,v=X,S-=1,_=[],g=[]}else h.delete(b),nt(b,c,e),Z(t,b.prev,b.next),Z(t,b,v===null?t.first:v.next),Z(t,v,b),v=b;continue}for(_=[],g=[];c!==null&&c.k!==O;)c.e.f&Ve||(h??(h=new Set)).add(c),g.push(c),c=c.next;if(c===null)continue;b=c}_.push(b),v=b,c=b.next}if(c!==null||h!==void 0){for(var q=h===void 0?[]:ct(h);c!==null;)c.e.f&Ve||q.push(c),c=c.next;var Q=q.length;if(Q>0){var se=u===0?e:null;$t(t,q,se,m)}}Ue.first=t.first&&t.first.e,Ue.last=v&&v.e}function ii(s,t,e,i){Lt(s.v,t),s.i=e}function gt(s,t,e,i,a,l,d,u,m,y){var c=(m&Rt)!==0,h=(m&Nt)===0,v=c?h?Mt(a):st(a):a,_=m&Dt?st(d):d,g={i:_,v,k:l,a:null,e:null,prev:e,next:i};try{return g.e=dt(()=>u(s,v,_,y),V),g.e.prev=e&&e.e,g.e.next=i&&i.e,e===null?t.first=g:(e.next=g,e.e.next=g.e),i!==null&&(i.prev=g,i.e.prev=g.e),g}finally{}}function nt(s,t,e){for(var i=s.next?s.next.e.nodes_start:e,a=t?t.e.nodes_start:e,l=s.e.nodes_start;l!==i;){var d=qt(l);a.before(l),l=d}}function Z(s,t,e){t===null?s.first=e:(t.next=e,t.e.next=e&&e.e),e!==null&&(e.prev=t,e.e.prev=t&&t.e)}function F(s){if(V){var t=!1,e=()=>{if(!t){if(t=!0,s.hasAttribute("value")){var i=s.value;We(s,"value",null),s.value=i}if(s.hasAttribute("checked")){var a=s.checked;We(s,"checked",null),s.checked=a}}};s.__on_r=e,Vt(e),ut()}}function We(s,t,e,i){var a=s.__attributes??(s.__attributes={});V&&(a[t]=s.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&s.nodeName==="LINK")||a[t]!==(a[t]=e)&&(t==="style"&&"__styles"in s&&(s.__styles={}),t==="loading"&&(s[Yt]=e),e==null?s.removeAttribute(t):typeof e!="string"&&si(s).includes(t)?s[t]=e:s.setAttribute(t,e))}var rt=new Map;function si(s){var t=rt.get(s.nodeName);if(t)return t;rt.set(s.nodeName,t=[]);for(var e,i=s,a=Element.prototype;a!==i;){e=Ut(i);for(var l in e)e[l].set&&t.push(l);i=Ht(i)}return t}function Xe(s,t,e){if(e){if(s.classList.contains(t))return;s.classList.add(t)}else{if(!s.classList.contains(t))return;s.classList.remove(t)}}function H(s,t,e=t){var i=Wt();yt(s,"input",a=>{var l=a?s.defaultValue:s.value;if(l=Ye(s)?He(l):l,e(l),i&&l!==(l=t())){var d=s.selectionStart,u=s.selectionEnd;s.value=l??"",u!==null&&(s.selectionStart=d,s.selectionEnd=Math.min(u,s.value.length))}}),(V&&s.defaultValue!==s.value||vt(t)==null&&s.value)&&e(Ye(s)?He(s.value):s.value),ft(()=>{var a=t();Ye(s)&&a===He(s.value)||s.type==="date"&&!a&&!s.value||a!==s.value&&(s.value=a??"")})}function Ke(s,t,e=t){yt(s,"change",i=>{var a=i?s.defaultChecked:s.checked;e(a)}),(V&&s.defaultChecked!==s.checked||vt(t)==null)&&e(s.checked),ft(()=>{var i=t();s.checked=!!i})}function Ye(s){var t=s.type;return t==="number"||t==="range"}function He(s){return s===""?null:+s}var E,le,pe,Be,ne,J,$,xe;const De=class De{constructor(t,e={},i=t){D(this,E);D(this,le);D(this,pe);D(this,Be);D(this,ne);D(this,J,{x:0,y:0});D(this,$,{x:0,y:0});D(this,xe);if(De.existingIDs.has(i))throw Error("A Tile Atlas with this ID already exists.");B(this,pe,t),B(this,E,{startOffset:{x:0,y:0},tileGap:{x:0,y:0},tileSize:{x:16,y:16},...e}),B(this,le,i),this.loadImg()}async loadImg(){if(o(this,ne))return o(this,ne);const t=document.createElement("img");return B(this,ne,new Promise(e=>{t.addEventListener("load",()=>{B(this,J,{x:t.naturalWidth,y:t.naturalHeight}),e()})})),t.src=o(this,pe),B(this,Be,t),o(this,ne)}get img(){return o(this,Be)}get src(){return o(this,pe)}get id(){return o(this,le)}get dimensions(){return structuredClone(o(this,J))}get tileAmount(){return structuredClone(o(this,$))}get settings(){return o(this,E)}set settings(t){B(this,E,t)}getTile(t){}getTilePosition(t){let e=typeof t=="number"?t:t.indexInAtlas;return{x:o(this,E).startOffset.x+(o(this,E).tileSize.x+o(this,E).tileGap.x)*(e%o(this,$).x),y:o(this,E).startOffset.y+(this.settings.tileSize.y+this.settings.tileGap.y)*Math.floor(e/o(this,$).x),w:o(this,E).tileSize.x,h:o(this,E).tileSize.y}}createTiles(){if(o(this,E).tileSize.x<1||o(this,E).tileSize.y<1)return[];let t=0,e=0;const i=[];let a=0,l=0;for(let d=o(this,E).startOffset.y;d<o(this,J).y&&d+o(this,E).tileSize.y<=o(this,J).y;d+=o(this,E).tileSize.y+o(this,E).tileGap.y){a=0;for(let u=o(this,E).startOffset.x;u<o(this,J).x&&u+o(this,E).tileSize.x<=o(this,J).x;u+=o(this,E).tileSize.x+o(this,E).tileGap.x)i.push({type:"basic",id:t++,atlasId:o(this,le),indexInAtlas:e++,name:`${o(this,le)}_${e}`}),a++;l++}return o(this,$).x=a,o(this,$).y=l,B(this,xe,[...i]),i}getTiles(){return o(this,xe)||this.createTiles(),o(this,xe)}};E=new WeakMap,le=new WeakMap,pe=new WeakMap,Be=new WeakMap,ne=new WeakMap,J=new WeakMap,$=new WeakMap,xe=new WeakMap,L(De,"existingIDs",new Set),L(De,"selectedTiles",[]);let G=De;var re,oe,ee;class ai{constructor(t,e){D(this,re,[]);D(this,oe,{x:20,y:20});D(this,ee,{x:64,y:64});this.mapSize=t,this.tileSize=e}get mapSize(){return o(this,oe)}set mapSize(t){B(this,oe,t)}get tileSize(){return o(this,ee)}set tileSize(t){B(this,ee,t)}setTile(t,e){o(this,re)[e.y]||(o(this,re)[e.y]=[]),o(this,re)[e.y][e.x]=t}render(t){t.imageSmoothingEnabled=!1;for(let e=0;e<o(this,oe).y;e++)for(let i=0;i<o(this,oe).x;i++){const a=this.getTile({x:i,y:e});a&&j.drawTile(a,t,{x:o(this,ee).x*i,y:o(this,ee).y*e},o(this,ee))}}getTile(t){var e;return(e=o(this,re)[t.y])==null?void 0:e[t.x]}}re=new WeakMap,oe=new WeakMap,ee=new WeakMap;var te,de,me;class li{constructor(t,e,i){D(this,te);D(this,de);D(this,me);B(this,te,t),B(this,de,e),B(this,me,i.map(a=>typeof a=="number"?j.getTile(a):a))}render(t){t.imageSmoothingEnabled=!1;for(let e=0;e<o(this,te).x;e++)for(let i=0;i<o(this,te).y;i++){const a=this.getTile(e,i);a&&j.drawTile(a,t,{x:o(this,de).x*e,y:o(this,de).y*e},o(this,de))}}getTile(t,e){return o(this,me)[e*o(this,te).x+t]}setTile(t,e,i){o(this,me)[e*o(this,te).x+t]=i}}te=new WeakMap,de=new WeakMap,me=new WeakMap;const M=class M{constructor(){if(M.Instance)return M.Instance;M.renderMethod.set("basic",M.drawBasicTile),M.renderMethod.set("rule",M.drawRuleTile)}static setAtlantes(t){for(const e of t)this.atlantes.set(e.id,e);this.recalculateTileIds()}static recalculateTileIds(){let t=1;const e=new Map;for(let i of this.atlantes.values())i.getTiles().forEach(l=>{l.id=t++,e.set(l.id,l)});for(let i of this.tileIndex.values())i.type!=="basic"&&(i.id=e.size+1,e.set(i.id,i));this.tileIndex=e}static addTile(t){this.tileIndex.set(t.id,t)}static newTile(t,e=""){this.recalculateTileIds();let i=this.tileIndex.size;for(;this.tileIndex.has(i);)i++;let a={type:t,default:void 0,id:i,name:e,rules:[]};return this.addTile(a),a}static getTile(t){return this.tileIndex.get(t)}static drawTile(t,e,i,a){var l;if(typeof t=="number"&&(t=this.tileIndex.get(t)),!!t){if(!M.renderMethod.has(t.type))throw new Error(`Cannot draw tile type "${t.type}": No known renderer.`);(l=M.renderMethod.get(t.type))==null||l(t,e,i,a)}}static drawRuleTile(t,e,i,a){}};L(M,"renderMethod",new Map),L(M,"atlantes",new Map),L(M,"tileIndex",new Map),L(M,"drawBasicTile",(t,e,i,a)=>{const l=M.atlantes.get(t.atlasId);if(!l)throw new Error(`Atlas "${t.atlasId}" not found.`);let{x:d,y:u,w:m,h:y}=l.getTilePosition(t.indexInAtlas);e.drawImage(l.img,d,u,m,y,i.x,i.y,a.x,a.y)}),L(M,"Instance",new M);let j=M;class pt extends EventTarget{constructor(e){super();L(this,"canvas");L(this,"ctx");L(this,"translation",{x:0,y:0});L(this,"scale",1);L(this,"scaleSettings",{factor:2,min:1/16,max:16});L(this,"syncedCtx",new Set);L(this,"pointerdown",e=>{switch(e.button){}this.dispatchEventFromEvent(e),e.preventDefault()});L(this,"pointermove",e=>{e.preventDefault();const i=this.getButtonsFromEvent(e);i.includes(0),i.includes(1),i.includes(2)&&(this.translation.x+=e.movementX,this.translation.y+=e.movementY,this.draw()),this.dispatchEventFromEvent(e)});L(this,"pointerup",e=>{switch(this.dispatchEventFromEvent(e),e.button){}e.preventDefault()});L(this,"zoom",e=>{e.preventDefault();const i=this.canvasPosFromMousePos({x:e.clientX,y:e.clientY},!1),a=-Math.sign(e.deltaY),l=this.scale,d=Math.min(this.scaleSettings.max,Math.max(this.scaleSettings.min,this.scale*Math.pow(this.scaleSettings.factor,a))),u=d/l;this.translation.x=i.x+(this.translation.x-i.x)*u,this.translation.y=i.y+(this.translation.y-i.y)*u,this.scale=d,this.draw()});this.canvas=e,this.ctx=e.getContext("2d"),this.installListeners();const i=e.getBoundingClientRect();e.width=i.width,e.height=i.height,this.syncedCtx.add(this.ctx)}installListeners(){this.canvas.addEventListener("pointerdown",this.pointerdown),this.canvas.addEventListener("pointermove",this.pointermove),this.canvas.addEventListener("pointerup",this.pointerup),this.canvas.addEventListener("wheel",this.zoom),this.canvas.addEventListener("contextmenu",e=>e.preventDefault())}getButtonsFromEvent(e){const i=[];for(let a=0;a<5;a++)e.buttons&1<<a&&i.push(a);return i}dispatchEventFromEvent(e){const i=this.canvasPosFromMousePos({x:e.clientX,y:e.clientY},!0);this.dispatchEvent(new CustomEvent(e.type,{detail:{pos:i,event:e}}))}canvasPosFromMousePos(e,i){const a=this.canvas.getBoundingClientRect(),l={x:e.x-a.left,y:e.y-a.top};return i&&(l.x=(l.x-this.translation.x)/this.scale,l.y=(l.y-this.translation.y)/this.scale),l}draw(){for(let e of this.syncedCtx.values())e.clearRect(0,0,e.canvas.width,e.canvas.height),e.reset(),e.translate(this.translation.x,this.translation.y),e.scale(this.scale,this.scale);this.dispatchEvent(new CustomEvent("draw"))}reset(){this.scale=1,this.translation.x=0,this.translation.y=0,this.draw()}addCtxToSync(e){this.syncedCtx.add(e)}}var ni=_e('<fieldset class="atlas-display svelte-n7a098"><img class="img-preview svelte-n7a098" alt=""> <div class="canvas-wrapper svelte-n7a098"><canvas></canvas> <canvas class="canvas-overlay svelte-n7a098"></canvas></div> <div class="settings-wrapper svelte-n7a098"><fieldset class="svelte-n7a098"><legend>Tile Size</legend> <label>width <input type="number" min="0" class="svelte-n7a098"></label> <label>height <input type="number" min="0" class="svelte-n7a098"></label></fieldset> <fieldset class="svelte-n7a098"><legend>Tile Gap</legend> <label>width <input type="number" class="svelte-n7a098"></label> <label>height <input type="number" class="svelte-n7a098"></label></fieldset> <fieldset class="svelte-n7a098"><legend>Offset</legend> <label>width <input type="number" class="svelte-n7a098"></label> <label>height <input type="number" width="5" class="svelte-n7a098"></label></fieldset> <fieldset class="svelte-n7a098"><legend>Display Settings</legend> <label>show numbers <input type="checkbox"></label> <label>show lines <input type="checkbox"></label></fieldset></div></fieldset>');function ri(s,t){be(t,!0);let e=Oe(t,"atlas",15),i,a,l,d,u,m,y,c=[],h=new Set,v,_=ie(!1),g=ie(!0);Qe(()=>{d.addEventListener("click",()=>{t.activate(e()),k()}),y=new pt(l),y.addEventListener("draw",O),y.addEventListener("pointermove",b),y.addEventListener("pointerup",R),l.addEventListener("pointerleave",S),u=l.getContext("2d"),m=a.getContext("2d"),y.addCtxToSync(m);const n=i.getBoundingClientRect();a.width=n.width,a.height=n.height,l.width=n.width,l.height=n.height,y.draw()});function k(){if(h.size==0)return G.selectedTiles=[],y.draw();const n=e().tileAmount,T={x:1/0,y:1/0},P={x:-1/0,y:-1/0};h.forEach(C=>{const A={x:C.indexInAtlas%n.x,y:Math.floor(C.indexInAtlas/n.x)};T.x>A.x&&(T.x=A.x),T.y>A.y&&(T.y=A.y),P.x<A.x&&(P.x=A.x),P.y<A.y&&(P.y=A.y)}),G.selectedTiles=Array.from({length:P.y-T.y+1},()=>[]),h.forEach(C=>{const A={x:C.indexInAtlas%n.x-T.x,y:Math.floor(C.indexInAtlas/n.x)-T.y};G.selectedTiles[A.y][A.x]=C}),y.draw()}function O(){m.imageSmoothingEnabled=!1,m.drawImage(e().img,0,0),m.lineWidth=1,m.strokeStyle="rgba(0, 0, 0, 0.5)",m.textAlign="right",c=e().getTiles();for(let n of c){let{x:T,y:P,w:C,h:A}=e().getTilePosition(n);I(g)&&m.strokeRect(T,P,C,A),I(_)&&m.fillText(n.id.toString(),T+C-1,P+A-1,C)}z()}function b(n){const T=N(n.detail.pos.x,n.detail.pos.y);if(!T)return S();v=T,y.draw()}function S(){v=void 0,y.draw()}function R(n){if(n.detail.event.button!==0)return;const T=N(n.detail.pos.x,n.detail.pos.y);if(!T)return h.clear(),k();n.detail.event.ctrlKey?h.has(T)?h.delete(T):h.add(T):h.has(T)&&h.size===1?h.clear():(h.clear(),h.add(T)),k()}function z(){if(v){u.fillStyle="rgba(255, 255, 255, 0.5)";let{x:n,y:T,w:P,h:C}=e().getTilePosition(v);u.fillRect(n,T,P,C)}for(let n of h.values()){u.strokeStyle="rgba(255, 0, 0, 1)",u.fillStyle="rgba(255, 0, 0, 0.25)",u.lineWidth=1;let{x:T,y:P,w:C,h:A}=e().getTilePosition(n);u.fillRect(T,P,C,A),u.strokeRect(T,P,C,A)}}function N(n,T){for(let P of c){let{x:C,y:A,w:xt,h:mt}=e().getTilePosition(P);if(n>C&&n<C+xt&&T>A&&T<A+mt)return P}}var W=ni(),X=x(W),q=f(X,2),Q=x(q);U(Q,n=>a=n,()=>a);var se=f(Q,2);U(se,n=>l=n,()=>l),p(q),U(q,n=>i=n,()=>i);var Se=f(q,2),ce=x(Se),ve=f(x(ce),2),fe=f(x(ve));F(fe),p(ve);var he=f(ve,2),Ee=f(x(he));F(Ee),p(he),p(ce);var ue=f(ce,2),ye=f(x(ue),2),ze=f(x(ye));F(ze),p(ye);var ge=f(ye,2),Ie=f(x(ge));F(Ie),p(ge),p(ue);var Ae=f(ue,2),ae=f(x(Ae),2),ke=f(x(ae));F(ke),p(ae);var Fe=f(ae,2),Ce=f(x(Fe));F(Ce),p(Fe),p(Ae);var Le=f(Ae,2),Me=f(x(Le),2),Ge=f(x(Me));F(Ge),p(Me);var r=f(Me,2),w=f(x(r));F(w),p(r),p(Le),p(Se),p(W),U(W,n=>d=n,()=>d),Je(()=>{Xe(W,"active",t.active),We(X,"src",e().src)}),H(fe,()=>e().settings.tileSize.x,n=>e(e().settings.tileSize.x=n,!0)),H(Ee,()=>e().settings.tileSize.y,n=>e(e().settings.tileSize.y=n,!0)),H(ze,()=>e().settings.tileGap.x,n=>e(e().settings.tileGap.x=n,!0)),H(Ie,()=>e().settings.tileGap.y,n=>e(e().settings.tileGap.y=n,!0)),H(ke,()=>e().settings.startOffset.x,n=>e(e().settings.startOffset.x=n,!0)),H(Ce,()=>e().settings.startOffset.y,n=>e(e().settings.startOffset.y=n,!0)),Ke(Ge,()=>I(_),n=>K(_,n)),Ke(w,()=>I(g),n=>K(g,n)),we(s,W),Te()}var oi=_e('<input type="file" name="import" id="import" accept="image/png" multiple> <div id="atlantes-wrapper"></div>',1);function di(s,t){be(t,!0);let e,i=Oe(t,"atlantes",27,()=>Y([])),a=Oe(t,"activeAtlas",15);async function l(h){if(e.files)for(let v of e.files){let _=await d(v),g=Y({startOffset:{x:0,y:0},tileGap:{x:0,y:0},tileSize:{x:16,y:16}});const k=new G(_,g,v.name);await k.loadImg(),i().push(k),a(k)}}async function d(h){return new Promise(v=>{const _=new FileReader;_.onload=()=>v(_.result),_.readAsDataURL(h)})}function u(h){a(h)}var m=oi(),y=ht(m);y.__change=l,U(y,h=>e=h,()=>e);var c=f(y,2);ei(c,21,i,Zt,(h,v)=>{const _=Xt(()=>a()==I(v));ri(h,{get atlas(){return I(v)},activate:u,get active(){return I(_)}})}),p(c),we(s,m),Te()}je(["change"]);var ci=_e('<div class="tile-info svelte-1j7fr4h"><div class="tile-base-info svelte-1j7fr4h"><span class="tile-id svelte-1j7fr4h"> </span> <span class="tile-type svelte-1j7fr4h"> </span> <span class="tile-name svelte-1j7fr4h">name: <input type="text"></span> <div class="tile-preview svelte-1j7fr4h"><canvas width="64" height="64"></canvas></div></div></div>');function vi(s,t){be(t,!0);let e=Oe(t,"tile",15),i;Re(()=>{const g=i.getContext("2d");g.imageSmoothingEnabled=!1,g.clearRect(0,0,i.width,i.height),j.drawTile(e(),g,{x:0,y:0},{x:i.width,y:i.height})});var a=ci(),l=x(a),d=x(l),u=x(d);p(d);var m=f(d,2),y=x(m);p(m);var c=f(m,2),h=f(x(c));F(h),p(c);var v=f(c,2),_=x(v);U(_,g=>i=g,()=>i),p(v),p(l),p(a),Je(()=>{at(u,`id: ${e().id??""}`),at(y,`type: ${e().type??""}`)}),H(h,()=>e().name,g=>e(e().name=g,!0)),we(s,a),Te()}var fi=_e('<div id="sheet-wrapper" class="svelte-ffqdes"><fieldset class="svelte-ffqdes"><fieldset class="svelte-ffqdes"><legend>Tile Size</legend> <label>width<input type="number" min="0"></label> <label>height<input type="number" min="0"></label></fieldset> <fieldset class="svelte-ffqdes"><legend>Sheet Size</legend> <label>width<input type="number" min="0"></label> <label>height<input type="number" min="0"></label></fieldset> <fieldset class="svelte-ffqdes"><legend>Display Settings</legend> <label>show lines <input type="checkbox"></label> <button>reset view</button></fieldset></fieldset> <div id="sheet-canvas-wrapper" class="svelte-ffqdes"><canvas id="sheet-canvas" class="svelte-ffqdes"></canvas> <canvas id="overlay-canvas" class="svelte-ffqdes"></canvas></div> <div id="tile-info-wrapper" class="svelte-ffqdes"><div id="tile-info" class="svelte-ffqdes"><!></div></div></div>');function hi(s,t){be(t,!0);let e=Y({x:20,y:20}),i=Y({x:16,y:16}),a=Oe(t,"sheet",27,()=>Y(new ai(e,i))),l,d,u,m,y,c=ie(void 0),h=ie(!0),v=ie(Y({x:0,y:0})),_=!1,g=!1;Qe(()=>{y=new pt(l),y.addEventListener("draw",z),y.addEventListener("pointerdown",k),y.addEventListener("pointermove",O),y.addEventListener("pointerup",b),u=l.getContext("2d");let r=l.getBoundingClientRect();l.width=r.width,d.width=r.width,l.height=r.height,d.height=r.height,m=d.getContext("2d"),y.addCtxToSync(m),z()});function k(r){if(r.detail.event.button===0)_=!0;else if(r.detail.event.button===2){g=!0;const w=R(r.detail.pos);w&&a().setTile(void 0,w)}}function O(r){if(K(v,Y(r.detail.pos)),g){const w=R(r.detail.pos);w&&a().setTile(void 0,w)}_&&S(),y.draw()}function b(r){r.detail.event.button===0?(_=!1,S()):r.detail.event.button===2&&(g=!1)}function S(){const r=R(I(v));if(!r){K(c,void 0);return}if(G.selectedTiles.length>0)for(let w=0;w<G.selectedTiles.length;w++)for(let n=0;n<G.selectedTiles[w].length;n++)G.selectedTiles[w][n]&&(r.x+n>=a().mapSize.x||r.y+w>=a().mapSize.y||a().setTile(G.selectedTiles[w][n],{x:r.x+n,y:r.y+w}));else{let w=a().getTile(r);w||(w=j.newTile("rule"),a().setTile(w,r)),K(c,Y(w))}}function R(r){const w={x:Math.floor(r.x/i.x),y:Math.floor(r.y/i.y)};if(!(w.x<0||w.y<0)&&!(w.x>=a().mapSize.x||w.y>=a().mapSize.y))return w}function z(){a().render(u),u.strokeStyle="rgba(0, 0, 0, 1)",u.lineWidth=1;const r=new Path2D;for(let w=0;w<e.y;w++)for(let n=0;n<e.x;n++)r.moveTo(n*i.x,w*i.y+i.y),r.lineTo(n*i.x,w*i.y),r.lineTo(n*i.x+i.x,w*i.y);r.moveTo(0,e.y*i.y),r.lineTo(e.x*i.x,e.y*i.y),r.lineTo(e.x*i.x,0),I(h)&&u.stroke(r),N()}function N(){const r=R(I(v));if(r){m.imageSmoothingEnabled=!1;for(let w=0;w<G.selectedTiles.length;w++)for(let n=0;n<G.selectedTiles[w].length;n++){if(r.x+n>=a().mapSize.x||r.y+w>=a().mapSize.y)continue;const T={x:(r.x+n)*a().tileSize.x,y:(r.y+w)*a().tileSize.y};j.drawTile(G.selectedTiles[w][n],m,T,i)}}}function W(){y.reset()}var X=fi(),q=x(X),Q=x(q),se=f(x(Q),2),Se=f(x(se));F(Se),p(se);var ce=f(se,2),ve=f(x(ce));F(ve),p(ce),p(Q);var fe=f(Q,2),he=f(x(fe),2),Ee=f(x(he));F(Ee),p(he);var ue=f(he,2),ye=f(x(ue));F(ye),p(ue),p(fe);var ze=f(fe,2),ge=f(x(ze),2),Ie=f(x(ge));F(Ie),p(ge);var Ae=f(ge,2);Ae.__click=W,p(ze),p(q);var ae=f(q,2),ke=x(ae);U(ke,r=>l=r,()=>l);var Fe=f(ke,2);U(Fe,r=>d=r,()=>d),p(ae);var Ce=f(ae,2),Le=x(Ce),Me=x(Le);{var Ge=r=>{vi(r,{get tile(){return I(c)}})};jt(Me,r=>{I(c)&&r(Ge)})}p(Le),p(Ce),p(X),H(Se,()=>i.x,r=>i.x=r),H(ve,()=>i.y,r=>i.y=r),H(Ee,()=>e.x,r=>e.x=r),H(ye,()=>e.y,r=>e.y=r),Ke(Ie,()=>I(h),r=>K(h,r)),we(s,X),Te()}je(["click"]);var ui=_e('<button>update</button> <canvas width="500" height="500"></canvas>',1);function yi(s,t){be(t,!0);let e,i;Qe(()=>{i=e.getContext("2d")}),Re(()=>{t.map.render(i)});function a(){t.map.render(i)}var l=ui(),d=ht(l);d.__click=a;var u=f(d,2);U(u,m=>e=m,()=>e),we(s,l),Te()}je(["click"]);var gi=_e('<div id="outer-wrapper" class="svelte-1l3ymyz"><h1 class="svelte-1l3ymyz"><a href="https://github.com/hs-furtwangen/FUDGE" target="_blank" rel="noopener noreferrer">FUDGE</a> Tilemap Editor</h1> <div class="tabs svelte-1l3ymyz"><div class="tab svelte-1l3ymyz" id="tab-atlas"><h2 class="svelte-1l3ymyz">Tile Atlas</h2> <div class="tab-content svelte-1l3ymyz"><!></div></div> <div class="tab shown svelte-1l3ymyz" id="tab-sheet"><h2 class="svelte-1l3ymyz">Tile Sheet</h2> <div class="tab-content svelte-1l3ymyz"><!></div></div> <div class="tab svelte-1l3ymyz" id="tab-map"><h2 class="svelte-1l3ymyz">Tile Map</h2> <div class="tab-content svelte-1l3ymyz"><!></div></div></div></div>');function Ti(s,t){be(t,!0);let e=ie(Y([])),i,a=ie(!0),l,d=ie(void 0),u;Re(()=>{i.addEventListener("pointerup",()=>{K(a,!0)}),l.addEventListener("pointerup",()=>{K(a,!1)})});let m=new li({x:5,y:5},{x:64,y:64},[1,2,2,2,3,9,10,10,10,11,9,10,10,10,11,9,10,10,10,11,17,18,18,18,19]);Re(()=>{j.setAtlantes(I(e))});var y=gi();Jt(z=>{Kt.title="FUDGE Tilemap Editor"});var c=f(x(y),2),h=x(c),v=f(x(h),2),_=x(v);di(_,{get atlantes(){return I(e)},set atlantes(z){K(e,Y(z))},get activeAtlas(){return I(d)},set activeAtlas(z){K(d,Y(z))}}),p(v),p(h),U(h,z=>i=z,()=>i);var g=f(h,2),k=f(x(g),2),O=x(k);hi(O,{get sheet(){return u},get selectedAtlas(){return I(d)}}),p(k),p(g);var b=f(g,2),S=f(x(b),2),R=x(S);yi(R,{map:m}),p(S),p(b),U(b,z=>l=z,()=>l),p(c),p(y),Je(()=>{Xe(h,"shown",I(a)),Xe(b,"shown",!I(a))}),we(s,y),Te()}export{Ti as component};
