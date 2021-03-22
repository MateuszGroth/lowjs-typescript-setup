(self.webpackChunkmsg=self.webpackChunkmsg||[]).push([[179],{746:()=>{"use strict";let e,t;const n=new WeakMap,r=new WeakMap,s=new WeakMap,o=new WeakMap,a=new WeakMap;let i={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return r.get(e);if("objectStoreNames"===t)return e.objectStoreNames||s.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return u(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function c(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(t||(t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(m(this),t),u(n.get(this))}:function(...t){return u(e.apply(m(this),t))}:function(t,...n){const r=e.call(m(this),t,...n);return s.set(r,t.sort?t.sort():[t]),u(r)}}function d(t){return"function"==typeof t?c(t):(t instanceof IDBTransaction&&function(e){if(r.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{t(),r()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)}));r.set(e,t)}(t),n=t,(e||(e=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>n instanceof e))?new Proxy(t,i):t);var n}function u(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{t(u(e.result)),r()},o=()=>{n(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&n.set(t,e)})).catch((()=>{})),a.set(t,e),t}(e);if(o.has(e))return o.get(e);const t=d(e);return t!==e&&(o.set(e,t),a.set(t,e)),t}const m=e=>a.get(e);const l=["get","getKey","getAll","getAllKeys","count"],f=["put","add","delete","clear"],g=new Map;function p(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(g.get(t))return g.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=f.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!l.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,s?"readwrite":"readonly");let a=o.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),s&&o.done]))[0]};return g.set(t,o),o}i=(e=>({...e,get:(t,n,r)=>p(t,n)||e.get(t,n,r),has:(t,n)=>!!p(t,n)||e.has(t,n)}))(i);const v="messages",y=document.getElementById("msgBtn"),I=document.getElementById("msgInp"),b=document.getElementById("msgCont");(async()=>{let e=[],t=[],n="";const r=async(e,t=!1)=>{b&&(t&&await a.add(v,{message:e,usr:n,date:new Date}),s(e,t))},s=(e,t)=>{if(!b)return;const n=document.createElement("p");n.className="msg"+(t?" msg--self":""),n.innerHTML=e,b.appendChild(n)},o=new WebSocket("ws://localhost:9000");o.addEventListener("message",(async a=>{const i=JSON.parse(a.data);if(i.id){n=i.id;for(const t of e)r(t,!0),o.send(JSON.stringify({message:t,command:"send-message",usr:n}));e=[];for(const e of t)s(e.message,n===e.usr);t=[]}else r(i.message,!1)})),o.addEventListener("open",(()=>{o.send(JSON.stringify({command:"get-id"}))}));const a=await function(e,t,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(e,t),i=u(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(u(a.result),e.oldVersion,e.newVersion,u(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),i.then((e=>{o&&e.addEventListener("close",(()=>o())),s&&e.addEventListener("versionchange",(()=>s()))})).catch((()=>{})),i}("msgDb",1,{upgrade(e){e.createObjectStore("messages",{keyPath:"id",autoIncrement:!0}).createIndex("by-date","date")}}),i=await a.getAllFromIndex(v,"by-date");i.some((e=>null===e.usr))?a.transaction(v,"readwrite").objectStore(v).index("by-date").openCursor(null,"prev").then((e=>e)).then((function e(t){t&&(t.delete(),t.continue().then(e))})):n?i.forEach((e=>s(e.message,e.usr===n))):t=[...i],y&&y.addEventListener("click",(async()=>{if(!I||!I.value)return;const t=I.value;if(I.value="",!n)return o.send(JSON.stringify({command:"get-id"})),void e.push(t);r(t,!0),o.send(JSON.stringify({command:"send-message",message:t,usr:n}))}))})()}},e=>{"use strict";var t;t=746,e(e.s=t)}]);