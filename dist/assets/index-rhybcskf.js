(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const wh="modulepreload",xh=function(n){return"/"+n},vc={},Xr=function(e,t,a){let i=Promise.resolve();if(t&&t.length>0){let u=function(g){return Promise.all(g.map(x=>Promise.resolve(x).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var r=u;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");i=u(t.map(g=>{if(g=xh(g),g in vc)return;vc[g]=!0;const x=g.endsWith(".css"),v=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${v}`))return;const P=document.createElement("link");if(P.rel=x?"stylesheet":wh,x||(P.as="script"),P.crossOrigin="",P.href=g,c&&P.setAttribute("nonce",c),document.head.appendChild(P),x)return new Promise((N,O)=>{P.addEventListener("load",N),P.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${g}`)))})}))}function s(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return i.then(l=>{for(const c of l||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})},_h=()=>`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Admin Panel</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/admin/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/admin/companies" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-building"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/admin/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Usuários</span>
                </a>

                <div class="nav-section-label">Planos & Finanças</div>
                <a href="/admin/plans" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-layer-group"></i></span>
                    <span>Planos</span>
                </a>

                <div class="nav-section-label">Sistema</div>
                <a href="/admin/webhooks" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-server"></i></span>
                    <span>Config. Backend</span>
                </a>
                <a href="/admin/logs" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-terminal"></i></span>
                    <span>Logs</span>
                </a>
                <a href="/admin/migration" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clone"></i></span>
                    <span>Migração</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">AD</div>
                    <div class="user-info">
                        <span class="name">Administrador</span><br>
                        <span class="role">Super Admin</span>
                    </div>
                </div>
            </div>
        </div>
    `,Eh=()=>{};var bc={};const mu=function(n){const e=[];let t=0;for(let a=0;a<n.length;a++){let i=n.charCodeAt(a);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&a+1<n.length&&(n.charCodeAt(a+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++a)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ih=function(n){const e=[];let t=0,a=0;for(;t<n.length;){const i=n[t++];if(i<128)e[a++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[a++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],r=n[t++],l=n[t++],c=((i&7)<<18|(s&63)<<12|(r&63)<<6|l&63)-65536;e[a++]=String.fromCharCode(55296+(c>>10)),e[a++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],r=n[t++];e[a++]=String.fromCharCode((i&15)<<12|(s&63)<<6|r&63)}}return e.join("")},hu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,a=[];for(let i=0;i<n.length;i+=3){const s=n[i],r=i+1<n.length,l=r?n[i+1]:0,c=i+2<n.length,u=c?n[i+2]:0,g=s>>2,x=(s&3)<<4|l>>4;let v=(l&15)<<2|u>>6,P=u&63;c||(P=64,r||(v=64)),a.push(t[g],t[x],t[v],t[P])}return a.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(mu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ih(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,a=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],l=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const x=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||l==null||u==null||x==null)throw new kh;const v=s<<2|l>>4;if(a.push(v),u!==64){const P=l<<4&240|u>>2;if(a.push(P),x!==64){const N=u<<6&192|x;a.push(N)}}}return a},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class kh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Th=function(n){const e=mu(n);return hu.encodeByteArray(e,!0)},Ss=function(n){return Th(n).replace(/\./g,"")},fu=function(n){try{return hu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Ah(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const Ch=()=>Ah().__FIREBASE_DEFAULTS__,Sh=()=>{if(typeof process>"u"||typeof bc>"u")return;const n=bc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ph=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&fu(n[1]);return e&&JSON.parse(e)},Ys=()=>{try{return Eh()||Ch()||Sh()||Ph()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},gu=n=>Ys()?.emulatorHosts?.[n],yu=n=>{const e=gu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const a=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),a]:[e.substring(0,t),a]},vu=()=>Ys()?.config,bu=n=>Ys()?.[`_${n}`];class Rh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,a)=>{t?this.reject(t):this.resolve(a),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,a))}}}function Jn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ao(n){return(await fetch(n,{credentials:"include"})).ok}function wu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},a=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r={iss:`https://securetoken.google.com/${a}`,aud:a,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ss(JSON.stringify(t)),Ss(JSON.stringify(r)),""].join(".")}const Ii={};function Lh(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ii))Ii[e]?n.emulator.push(e):n.prod.push(e);return n}function $h(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let wc=!1;function Co(n,e){if(typeof window>"u"||typeof document>"u"||!Jn(window.location.host)||Ii[n]===e||Ii[n]||wc)return;Ii[n]=e;function t(v){return`__firebase__banner__${v}`}const a="__firebase__banner",s=Lh().prod.length>0;function r(){const v=document.getElementById(a);v&&v.remove()}function l(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function c(v,P){v.setAttribute("width","24"),v.setAttribute("id",P),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function u(){const v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{wc=!0,r()},v}function g(v,P){v.setAttribute("id",P),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function x(){const v=$h(a),P=t("text"),N=document.getElementById(P)||document.createElement("span"),O=t("learnmore"),E=document.getElementById(O)||document.createElement("a"),k=t("preprendIcon"),T=document.getElementById(k)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){const S=v.element;l(S),g(E,O);const _=u();c(T,k),S.append(T,N,E,_),document.body.appendChild(S)}s?(N.innerText="Preview backend disconnected.",T.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(T.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,N.innerText="Preview backend running in this workspace."),N.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",x):x()}function Et(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dh(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Et())}function Nh(){const n=Ys()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Mh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Oh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Vh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Bh(){const n=Et();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function zh(){return!Nh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fh(){try{return typeof indexedDB=="object"}catch{return!1}}function Uh(){return new Promise((n,e)=>{try{let t=!0;const a="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(a);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(a),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}const jh="FirebaseError";class ln extends Error{constructor(e,t,a){super(t),this.code=e,this.customData=a,this.name=jh,Object.setPrototypeOf(this,ln.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ui.prototype.create)}}class Ui{constructor(e,t,a){this.service=e,this.serviceName=t,this.errors=a}create(e,...t){const a=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],r=s?qh(s,a):"Error",l=`${this.serviceName}: ${r} (${i}).`;return new ln(i,l,a)}}function qh(n,e){return n.replace(Hh,(t,a)=>{const i=e[a];return i!=null?String(i):`<${a}?>`})}const Hh=/\{\$([^}]+)}/g;function Wh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ha(n,e){if(n===e)return!0;const t=Object.keys(n),a=Object.keys(e);for(const i of t){if(!a.includes(i))return!1;const s=n[i],r=e[i];if(xc(s)&&xc(r)){if(!ha(s,r))return!1}else if(s!==r)return!1}for(const i of a)if(!t.includes(i))return!1;return!0}function xc(n){return n!==null&&typeof n=="object"}function ji(n){const e=[];for(const[t,a]of Object.entries(n))Array.isArray(a)?a.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(a));return e.length?"&"+e.join("&"):""}function yi(n){const e={};return n.replace(/^\?/,"").split("&").forEach(a=>{if(a){const[i,s]=a.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function vi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Gh(n,e){const t=new Kh(n,e);return t.subscribe.bind(t)}class Kh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(a=>{this.error(a)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,a){let i;if(e===void 0&&t===void 0&&a===void 0)throw new Error("Missing Observer.");Qh(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:a},i.next===void 0&&(i.next=Dr),i.error===void 0&&(i.error=Dr),i.complete===void 0&&(i.complete=Dr);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(a){typeof console<"u"&&console.error&&console.error(a)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Qh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Dr(){}function Fe(n){return n&&n._delegate?n._delegate:n}class jn{constructor(e,t,a){this.name=e,this.instanceFactory=t,this.type=a,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const oa="[DEFAULT]";class Yh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const a=new Rh;if(this.instancesDeferred.set(t,a),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&a.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),a=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(a)return null;throw i}else{if(a)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xh(e))try{this.getOrInitializeService({instanceIdentifier:oa})}catch{}for(const[t,a]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});a.resolve(s)}catch{}}}}clearInstance(e=oa){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=oa){return this.instances.has(e)}getOptions(e=oa){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,a=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(a))throw Error(`${this.name}(${a}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:a,options:t});for(const[s,r]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);a===l&&r.resolve(i)}return i}onInit(e,t){const a=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(a)??new Set;i.add(e),this.onInitCallbacks.set(a,i);const s=this.instances.get(a);return s&&e(s,a),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const a=this.onInitCallbacks.get(t);if(a)for(const i of a)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let a=this.instances.get(e);if(!a&&this.component&&(a=this.component.instanceFactory(this.container,{instanceIdentifier:Jh(e),options:t}),this.instances.set(e,a),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(a,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,a)}catch{}return a||null}normalizeInstanceIdentifier(e=oa){return this.component?this.component.multipleInstances?e:oa:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Jh(n){return n===oa?void 0:n}function Xh(n){return n.instantiationMode==="EAGER"}class Zh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Yh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}var Ee;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Ee||(Ee={}));const ef={debug:Ee.DEBUG,verbose:Ee.VERBOSE,info:Ee.INFO,warn:Ee.WARN,error:Ee.ERROR,silent:Ee.SILENT},tf=Ee.INFO,nf={[Ee.DEBUG]:"log",[Ee.VERBOSE]:"log",[Ee.INFO]:"info",[Ee.WARN]:"warn",[Ee.ERROR]:"error"},af=(n,e,...t)=>{if(e<n.logLevel)return;const a=new Date().toISOString(),i=nf[e];if(i)console[i](`[${a}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class So{constructor(e){this.name=e,this._logLevel=tf,this._logHandler=af,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ee))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ef[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ee.DEBUG,...e),this._logHandler(this,Ee.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ee.VERBOSE,...e),this._logHandler(this,Ee.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ee.INFO,...e),this._logHandler(this,Ee.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ee.WARN,...e),this._logHandler(this,Ee.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ee.ERROR,...e),this._logHandler(this,Ee.ERROR,...e)}}const sf=(n,e)=>e.some(t=>n instanceof t);let _c,Ec;function rf(){return _c||(_c=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function of(){return Ec||(Ec=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xu=new WeakMap,Zr=new WeakMap,_u=new WeakMap,Nr=new WeakMap,Po=new WeakMap;function lf(n){const e=new Promise((t,a)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",r)},s=()=>{t(On(n.result)),i()},r=()=>{a(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",r)});return e.then(t=>{t instanceof IDBCursor&&xu.set(t,n)}).catch(()=>{}),Po.set(e,n),e}function cf(n){if(Zr.has(n))return;const e=new Promise((t,a)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",r),n.removeEventListener("abort",r)},s=()=>{t(),i()},r=()=>{a(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",r),n.addEventListener("abort",r)});Zr.set(n,e)}let eo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Zr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||_u.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return On(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function df(n){eo=n(eo)}function uf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const a=n.call(Mr(this),e,...t);return _u.set(a,e.sort?e.sort():[e]),On(a)}:of().includes(n)?function(...e){return n.apply(Mr(this),e),On(xu.get(this))}:function(...e){return On(n.apply(Mr(this),e))}}function pf(n){return typeof n=="function"?uf(n):(n instanceof IDBTransaction&&cf(n),sf(n,rf())?new Proxy(n,eo):n)}function On(n){if(n instanceof IDBRequest)return lf(n);if(Nr.has(n))return Nr.get(n);const e=pf(n);return e!==n&&(Nr.set(n,e),Po.set(e,n)),e}const Mr=n=>Po.get(n);function mf(n,e,{blocked:t,upgrade:a,blocking:i,terminated:s}={}){const r=indexedDB.open(n,e),l=On(r);return a&&r.addEventListener("upgradeneeded",c=>{a(On(r.result),c.oldVersion,c.newVersion,On(r.transaction),c)}),t&&r.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const hf=["get","getKey","getAll","getAllKeys","count"],ff=["put","add","delete","clear"],Or=new Map;function Ic(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Or.get(e))return Or.get(e);const t=e.replace(/FromIndex$/,""),a=e!==t,i=ff.includes(t);if(!(t in(a?IDBIndex:IDBObjectStore).prototype)||!(i||hf.includes(t)))return;const s=async function(r,...l){const c=this.transaction(r,i?"readwrite":"readonly");let u=c.store;return a&&(u=u.index(l.shift())),(await Promise.all([u[t](...l),i&&c.done]))[0]};return Or.set(e,s),s}df(n=>({...n,get:(e,t,a)=>Ic(e,t)||n.get(e,t,a),has:(e,t)=>!!Ic(e,t)||n.has(e,t)}));class gf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(yf(t)){const a=t.getImmediate();return`${a.library}/${a.version}`}else return null}).filter(t=>t).join(" ")}}function yf(n){return n.getComponent()?.type==="VERSION"}const to="@firebase/app",kc="0.14.8";const yn=new So("@firebase/app"),vf="@firebase/app-compat",bf="@firebase/analytics-compat",wf="@firebase/analytics",xf="@firebase/app-check-compat",_f="@firebase/app-check",Ef="@firebase/auth",If="@firebase/auth-compat",kf="@firebase/database",Tf="@firebase/data-connect",Af="@firebase/database-compat",Cf="@firebase/functions",Sf="@firebase/functions-compat",Pf="@firebase/installations",Rf="@firebase/installations-compat",Lf="@firebase/messaging",$f="@firebase/messaging-compat",Df="@firebase/performance",Nf="@firebase/performance-compat",Mf="@firebase/remote-config",Of="@firebase/remote-config-compat",Vf="@firebase/storage",Bf="@firebase/storage-compat",zf="@firebase/firestore",Ff="@firebase/ai",Uf="@firebase/firestore-compat",jf="firebase",qf="12.9.0";const no="[DEFAULT]",Hf={[to]:"fire-core",[vf]:"fire-core-compat",[wf]:"fire-analytics",[bf]:"fire-analytics-compat",[_f]:"fire-app-check",[xf]:"fire-app-check-compat",[Ef]:"fire-auth",[If]:"fire-auth-compat",[kf]:"fire-rtdb",[Tf]:"fire-data-connect",[Af]:"fire-rtdb-compat",[Cf]:"fire-fn",[Sf]:"fire-fn-compat",[Pf]:"fire-iid",[Rf]:"fire-iid-compat",[Lf]:"fire-fcm",[$f]:"fire-fcm-compat",[Df]:"fire-perf",[Nf]:"fire-perf-compat",[Mf]:"fire-rc",[Of]:"fire-rc-compat",[Vf]:"fire-gcs",[Bf]:"fire-gcs-compat",[zf]:"fire-fst",[Uf]:"fire-fst-compat",[Ff]:"fire-vertex","fire-js":"fire-js",[jf]:"fire-js-all"};const Ps=new Map,Wf=new Map,ao=new Map;function Tc(n,e){try{n.container.addComponent(e)}catch(t){yn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function fa(n){const e=n.name;if(ao.has(e))return yn.debug(`There were multiple attempts to register component ${e}.`),!1;ao.set(e,n);for(const t of Ps.values())Tc(t,n);for(const t of Wf.values())Tc(t,n);return!0}function Js(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Nt(n){return n==null?!1:n.settings!==void 0}const Gf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vn=new Ui("app","Firebase",Gf);class Kf{constructor(e,t,a){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=a,this.container.addComponent(new jn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vn.create("app-deleted",{appName:this._name})}}const Ia=qf;function Ro(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const a={name:no,automaticDataCollectionEnabled:!0,...e},i=a.name;if(typeof i!="string"||!i)throw Vn.create("bad-app-name",{appName:String(i)});if(t||(t=vu()),!t)throw Vn.create("no-options");const s=Ps.get(i);if(s){if(ha(t,s.options)&&ha(a,s.config))return s;throw Vn.create("duplicate-app",{appName:i})}const r=new Zh(i);for(const c of ao.values())r.addComponent(c);const l=new Kf(t,a,r);return Ps.set(i,l),l}function Lo(n=no){const e=Ps.get(n);if(!e&&n===no&&vu())return Ro();if(!e)throw Vn.create("no-app",{appName:n});return e}function en(n,e,t){let a=Hf[n]??n;t&&(a+=`-${t}`);const i=a.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const r=[`Unable to register library "${a}" with version "${e}":`];i&&r.push(`library name "${a}" contains illegal characters (whitespace or "/")`),i&&s&&r.push("and"),s&&r.push(`version name "${e}" contains illegal characters (whitespace or "/")`),yn.warn(r.join(" "));return}fa(new jn(`${a}-version`,()=>({library:a,version:e}),"VERSION"))}const Qf="firebase-heartbeat-database",Yf=1,Ri="firebase-heartbeat-store";let Vr=null;function Eu(){return Vr||(Vr=mf(Qf,Yf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ri)}catch(t){console.warn(t)}}}}).catch(n=>{throw Vn.create("idb-open",{originalErrorMessage:n.message})})),Vr}async function Jf(n){try{const t=(await Eu()).transaction(Ri),a=await t.objectStore(Ri).get(Iu(n));return await t.done,a}catch(e){if(e instanceof ln)yn.warn(e.message);else{const t=Vn.create("idb-get",{originalErrorMessage:e?.message});yn.warn(t.message)}}}async function Ac(n,e){try{const a=(await Eu()).transaction(Ri,"readwrite");await a.objectStore(Ri).put(e,Iu(n)),await a.done}catch(t){if(t instanceof ln)yn.warn(t.message);else{const a=Vn.create("idb-set",{originalErrorMessage:t?.message});yn.warn(a.message)}}}function Iu(n){return`${n.name}!${n.options.appId}`}const Xf=1024,Zf=30;class eg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ng(t),this._heartbeatsCachePromise=this._storage.read().then(a=>(this._heartbeatsCache=a,a))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Cc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(i=>i.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:t}),this._heartbeatsCache.heartbeats.length>Zf){const i=ag(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){yn.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Cc(),{heartbeatsToSend:t,unsentEntries:a}=tg(this._heartbeatsCache.heartbeats),i=Ss(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,a.length>0?(this._heartbeatsCache.heartbeats=a,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return yn.warn(e),""}}}function Cc(){return new Date().toISOString().substring(0,10)}function tg(n,e=Xf){const t=[];let a=n.slice();for(const i of n){const s=t.find(r=>r.agent===i.agent);if(s){if(s.dates.push(i.date),Sc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Sc(t)>e){t.pop();break}a=a.slice(1)}return{heartbeatsToSend:t,unsentEntries:a}}class ng{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fh()?Uh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Jf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const a=await this.read();return Ac(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??a.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const a=await this.read();return Ac(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??a.lastSentHeartbeatDate,heartbeats:[...a.heartbeats,...e.heartbeats]})}else return}}function Sc(n){return Ss(JSON.stringify({version:2,heartbeats:n})).length}function ag(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let a=1;a<n.length;a++)n[a].date<t&&(t=n[a].date,e=a);return e}function ig(n){fa(new jn("platform-logger",e=>new gf(e),"PRIVATE")),fa(new jn("heartbeat",e=>new eg(e),"PRIVATE")),en(to,kc,n),en(to,kc,"esm2020"),en("fire-js","")}ig("");function ku(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const sg=ku,Tu=new Ui("auth","Firebase",ku());const Rs=new So("@firebase/auth");function rg(n,...e){Rs.logLevel<=Ee.WARN&&Rs.warn(`Auth (${Ia}): ${n}`,...e)}function bs(n,...e){Rs.logLevel<=Ee.ERROR&&Rs.error(`Auth (${Ia}): ${n}`,...e)}function Gt(n,...e){throw $o(n,...e)}function tn(n,...e){return $o(n,...e)}function Au(n,e,t){const a={...sg(),[e]:t};return new Ui("auth","Firebase",a).create(e,{appName:n.name})}function mn(n){return Au(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $o(n,...e){if(typeof n!="string"){const t=e[0],a=[...e.slice(1)];return a[0]&&(a[0].appName=n.name),n._errorFactory.create(t,...a)}return Tu.create(n,...e)}function le(n,e,...t){if(!n)throw $o(e,...t)}function un(n){const e="INTERNAL ASSERTION FAILED: "+n;throw bs(e),new Error(e)}function vn(n,e){n||un(e)}function io(){return typeof self<"u"&&self.location?.href||""}function og(){return Pc()==="http:"||Pc()==="https:"}function Pc(){return typeof self<"u"&&self.location?.protocol||null}function lg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(og()||Oh()||"connection"in navigator)?navigator.onLine:!0}function cg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}class qi{constructor(e,t){this.shortDelay=e,this.longDelay=t,vn(t>e,"Short delay should be less than long delay!"),this.isMobile=Dh()||Vh()}get(){return lg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}function Do(n,e){vn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}class Cu{static initialize(e,t,a){this.fetchImpl=e,t&&(this.headersImpl=t),a&&(this.responseImpl=a)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;un("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;un("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;un("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const dg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};const ug=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],pg=new qi(3e4,6e4);function Xn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Zn(n,e,t,a,i={}){return Su(n,i,async()=>{let s={},r={};a&&(e==="GET"?r=a:s={body:JSON.stringify(a)});const l=ji({key:n.config.apiKey,...r}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:c,...s};return Mh()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Jn(n.emulatorConfig.host)&&(u.credentials="include"),Cu.fetch()(await Pu(n,n.config.apiHost,t,l),u)})}async function Su(n,e,t){n._canInitEmulator=!1;const a={...dg,...e};try{const i=new hg(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const r=await s.json();if("needConfirmation"in r)throw cs(n,"account-exists-with-different-credential",r);if(s.ok&&!("errorMessage"in r))return r;{const l=s.ok?r.errorMessage:r.error.message,[c,u]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw cs(n,"credential-already-in-use",r);if(c==="EMAIL_EXISTS")throw cs(n,"email-already-in-use",r);if(c==="USER_DISABLED")throw cs(n,"user-disabled",r);const g=a[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Au(n,g,u);Gt(n,g)}}catch(i){if(i instanceof ln)throw i;Gt(n,"network-request-failed",{message:String(i)})}}async function Hi(n,e,t,a,i={}){const s=await Zn(n,e,t,a,i);return"mfaPendingCredential"in s&&Gt(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Pu(n,e,t,a){const i=`${e}${t}?${a}`,s=n,r=s.config.emulator?Do(n.config,i):`${n.config.apiScheme}://${i}`;return ug.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(r).toString():r}function mg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class hg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,a)=>{this.timer=setTimeout(()=>a(tn(this.auth,"network-request-failed")),pg.get())})}}function cs(n,e,t){const a={appName:n.name};t.email&&(a.email=t.email),t.phoneNumber&&(a.phoneNumber=t.phoneNumber);const i=tn(n,e,a);return i.customData._tokenResponse=t,i}function Rc(n){return n!==void 0&&n.enterprise!==void 0}class fg{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return mg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function gg(n,e){return Zn(n,"GET","/v2/recaptchaConfig",Xn(n,e))}async function yg(n,e){return Zn(n,"POST","/v1/accounts:delete",e)}async function Ls(n,e){return Zn(n,"POST","/v1/accounts:lookup",e)}function ki(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function vg(n,e=!1){const t=Fe(n),a=await t.getIdToken(e),i=No(a);le(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,r=s?.sign_in_provider;return{claims:i,token:a,authTime:ki(Br(i.auth_time)),issuedAtTime:ki(Br(i.iat)),expirationTime:ki(Br(i.exp)),signInProvider:r||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Br(n){return Number(n)*1e3}function No(n){const[e,t,a]=n.split(".");if(e===void 0||t===void 0||a===void 0)return bs("JWT malformed, contained fewer than 3 sections"),null;try{const i=fu(t);return i?JSON.parse(i):(bs("Failed to decode base64 JWT payload"),null)}catch(i){return bs("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Lc(n){const e=No(n);return le(e,"internal-error"),le(typeof e.exp<"u","internal-error"),le(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Li(n,e,t=!1){if(t)return e;try{return await e}catch(a){throw a instanceof ln&&bg(a)&&n.auth.currentUser===n&&await n.auth.signOut(),a}}function bg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}class wg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const a=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,a)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}class so{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ki(this.lastLoginAt),this.creationTime=ki(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function $s(n){const e=n.auth,t=await n.getIdToken(),a=await Li(n,Ls(e,{idToken:t}));le(a?.users.length,e,"internal-error");const i=a.users[0];n._notifyReloadListener(i);const s=i.providerUserInfo?.length?Ru(i.providerUserInfo):[],r=_g(n.providerData,s),l=n.isAnonymous,c=!(n.email&&i.passwordHash)&&!r?.length,u=l?c:!1,g={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new so(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(n,g)}async function xg(n){const e=Fe(n);await $s(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _g(n,e){return[...n.filter(a=>!e.some(i=>i.providerId===a.providerId)),...e]}function Ru(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function Eg(n,e){const t=await Su(n,{},async()=>{const a=ji({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,r=await Pu(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:a};return n.emulatorConfig&&Jn(n.emulatorConfig.host)&&(c.credentials="include"),Cu.fetch()(r,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ig(n,e){return Zn(n,"POST","/v2/accounts:revokeToken",Xn(n,e))}class Oa{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){le(e.idToken,"internal-error"),le(typeof e.idToken<"u","internal-error"),le(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Lc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){le(e.length!==0,"internal-error");const t=Lc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(le(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:a,refreshToken:i,expiresIn:s}=await Eg(e,t);this.updateTokensAndExpiration(a,i,Number(s))}updateTokensAndExpiration(e,t,a){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+a*1e3}static fromJSON(e,t){const{refreshToken:a,accessToken:i,expirationTime:s}=t,r=new Oa;return a&&(le(typeof a=="string","internal-error",{appName:e}),r.refreshToken=a),i&&(le(typeof i=="string","internal-error",{appName:e}),r.accessToken=i),s&&(le(typeof s=="number","internal-error",{appName:e}),r.expirationTime=s),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Oa,this.toJSON())}_performRefresh(){return un("not implemented")}}function Pn(n,e){le(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ht{constructor({uid:e,auth:t,stsTokenManager:a,...i}){this.providerId="firebase",this.proactiveRefresh=new wg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=a,this.accessToken=a.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new so(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Li(this,this.stsTokenManager.getToken(this.auth,e));return le(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return vg(this,e)}reload(){return xg(this)}_assign(e){this!==e&&(le(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ht({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){le(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let a=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),a=!0),t&&await $s(this),await this.auth._persistUserIfCurrent(this),a&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Nt(this.auth.app))return Promise.reject(mn(this.auth));const e=await this.getIdToken();return await Li(this,yg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const a=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,r=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,u=t.createdAt??void 0,g=t.lastLoginAt??void 0,{uid:x,emailVerified:v,isAnonymous:P,providerData:N,stsTokenManager:O}=t;le(x&&O,e,"internal-error");const E=Oa.fromJSON(this.name,O);le(typeof x=="string",e,"internal-error"),Pn(a,e.name),Pn(i,e.name),le(typeof v=="boolean",e,"internal-error"),le(typeof P=="boolean",e,"internal-error"),Pn(s,e.name),Pn(r,e.name),Pn(l,e.name),Pn(c,e.name),Pn(u,e.name),Pn(g,e.name);const k=new Ht({uid:x,auth:e,email:i,emailVerified:v,displayName:a,isAnonymous:P,photoURL:r,phoneNumber:s,tenantId:l,stsTokenManager:E,createdAt:u,lastLoginAt:g});return N&&Array.isArray(N)&&(k.providerData=N.map(T=>({...T}))),c&&(k._redirectEventId=c),k}static async _fromIdTokenResponse(e,t,a=!1){const i=new Oa;i.updateFromServerResponse(t);const s=new Ht({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:a});return await $s(s),s}static async _fromGetAccountInfoResponse(e,t,a){const i=t.users[0];le(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Ru(i.providerUserInfo):[],r=!(i.email&&i.passwordHash)&&!s?.length,l=new Oa;l.updateFromIdToken(a);const c=new Ht({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:r}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new so(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,u),c}}const $c=new Map;function pn(n){vn(n instanceof Function,"Expected a class definition");let e=$c.get(n);return e?(vn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,$c.set(n,e),e)}class Lu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Lu.type="NONE";const Dc=Lu;function ws(n,e,t){return`firebase:${n}:${e}:${t}`}class Va{constructor(e,t,a){this.persistence=e,this.auth=t,this.userKey=a;const{config:i,name:s}=this.auth;this.fullUserKey=ws(this.userKey,i.apiKey,s),this.fullPersistenceKey=ws("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ls(this.auth,{idToken:e}).catch(()=>{});return t?Ht._fromGetAccountInfoResponse(this.auth,t,e):null}return Ht._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,a="authUser"){if(!t.length)return new Va(pn(Dc),e,a);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||pn(Dc);const r=ws(a,e.config.apiKey,e.name);let l=null;for(const u of t)try{const g=await u._get(r);if(g){let x;if(typeof g=="string"){const v=await Ls(e,{idToken:g}).catch(()=>{});if(!v)break;x=await Ht._fromGetAccountInfoResponse(e,v,g)}else x=Ht._fromJSON(e,g);u!==s&&(l=x),s=u;break}}catch{}const c=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Va(s,e,a):(s=c[0],l&&await s._set(r,l.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(r)}catch{}})),new Va(s,e,a))}}function Nc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if($u(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vu(e))return"Blackberry";if(Bu(e))return"Webos";if(Du(e))return"Safari";if((e.includes("chrome/")||Nu(e))&&!e.includes("edge/"))return"Chrome";if(Ou(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,a=n.match(t);if(a?.length===2)return a[1]}return"Other"}function $u(n=Et()){return/firefox\//i.test(n)}function Du(n=Et()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Nu(n=Et()){return/crios\//i.test(n)}function Mu(n=Et()){return/iemobile/i.test(n)}function Ou(n=Et()){return/android/i.test(n)}function Vu(n=Et()){return/blackberry/i.test(n)}function Bu(n=Et()){return/webos/i.test(n)}function Mo(n=Et()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function kg(n=Et()){return Mo(n)&&!!window.navigator?.standalone}function Tg(){return Bh()&&document.documentMode===10}function zu(n=Et()){return Mo(n)||Ou(n)||Bu(n)||Vu(n)||/windows phone/i.test(n)||Mu(n)}function Fu(n,e=[]){let t;switch(n){case"Browser":t=Nc(Et());break;case"Worker":t=`${Nc(Et())}-${n}`;break;default:t=n}const a=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ia}/${a}`}class Ag{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const a=s=>new Promise((r,l)=>{try{const c=e(s);r(c)}catch(c){l(c)}});a.onAbort=t,this.queue.push(a);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const a of this.queue)await a(e),a.onAbort&&t.push(a.onAbort)}catch(a){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:a?.message})}}}async function Cg(n,e={}){return Zn(n,"GET","/v2/passwordPolicy",Xn(n,e))}const Sg=6;class Pg{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Sg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const a=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;a&&(t.meetsMinPasswordLength=e.length>=a),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let a;for(let i=0;i<e.length;i++)a=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,a>="a"&&a<="z",a>="A"&&a<="Z",a>="0"&&a<="9",this.allowedNonAlphanumericCharacters.includes(a))}updatePasswordCharacterOptionsStatuses(e,t,a,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=a)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}class Rg{constructor(e,t,a,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=a,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Mc(this),this.idTokenSubscription=new Mc(this),this.beforeStateQueue=new Ag(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pn(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Va.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ls(this,{idToken:e}),a=await Ht._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(a)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Nt(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(r=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(r,r))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let a=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,r=a?._redirectEventId,l=await this.tryRedirectSignIn(e);(!s||s===r)&&l?.user&&(a=l.user,i=!0)}if(!a)return this.directlySetCurrentUser(null);if(!a._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(a)}catch(s){a=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return a?this.reloadAndSetCurrentUserOrClear(a):this.directlySetCurrentUser(null)}return le(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===a._redirectEventId?this.directlySetCurrentUser(a):this.reloadAndSetCurrentUserOrClear(a)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await $s(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Nt(this.app))return Promise.reject(mn(this));const t=e?Fe(e):null;return t&&le(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&le(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Nt(this.app)?Promise.reject(mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Nt(this.app)?Promise.reject(mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Cg(this),t=new Pg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ui("auth","Firebase",e())}onAuthStateChanged(e,t,a){return this.registerStateListener(this.authStateSubscription,e,t,a)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,a){return this.registerStateListener(this.idTokenSubscription,e,t,a)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const a=this.onAuthStateChanged(()=>{a(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),a={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(a.tenantId=this.tenantId),await Ig(this,a)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const a=await this.getOrInitRedirectPersistenceManager(t);return e===null?a.removeCurrentUser():a.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pn(e)||this._popupRedirectResolver;le(t,this,"argument-error"),this.redirectPersistenceManager=await Va.create(this,[pn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,a,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let r=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(le(l,this,"internal-error"),l.then(()=>{r||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,a,i);return()=>{r=!0,c()}}else{const c=e.addObserver(t);return()=>{r=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return le(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Fu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const a=await this._getAppCheckToken();return a&&(e["X-Firebase-AppCheck"]=a),e}async _getAppCheckToken(){if(Nt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&rg(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ka(n){return Fe(n)}class Mc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Gh(t=>this.observer=t)}get next(){return le(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let Xs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Lg(n){Xs=n}function Uu(n){return Xs.loadJS(n)}function $g(){return Xs.recaptchaEnterpriseScript}function Dg(){return Xs.gapiScript}function Ng(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Mg{constructor(){this.enterprise=new Og}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Og{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Vg="recaptcha-enterprise",ju="NO_RECAPTCHA";class Bg{constructor(e){this.type=Vg,this.auth=ka(e)}async verify(e="verify",t=!1){async function a(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(r,l)=>{gg(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const u=new fg(c);return s.tenantId==null?s._agentRecaptchaConfig=u:s._tenantRecaptchaConfigs[s.tenantId]=u,r(u.siteKey)}}).catch(c=>{l(c)})})}function i(s,r,l){const c=window.grecaptcha;Rc(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(u=>{r(u)}).catch(()=>{r(ju)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Mg().execute("siteKey",{action:"verify"}):new Promise((s,r)=>{a(this.auth).then(l=>{if(!t&&Rc(window.grecaptcha))i(l,s,r);else{if(typeof window>"u"){r(new Error("RecaptchaVerifier is only supported in browser"));return}let c=$g();c.length!==0&&(c+=l),Uu(c).then(()=>{i(l,s,r)}).catch(u=>{r(u)})}}).catch(l=>{r(l)})})}}async function Oc(n,e,t,a=!1,i=!1){const s=new Bg(n);let r;if(i)r=ju;else try{r=await s.verify(t)}catch{r=await s.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,u=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:u,captchaResponse:r,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:r,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return a?Object.assign(l,{captchaResp:r}):Object.assign(l,{captchaResponse:r}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function ro(n,e,t,a,i){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Oc(n,e,t,t==="getOobCode");return a(n,s)}else return a(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const r=await Oc(n,e,t,t==="getOobCode");return a(n,r)}else return Promise.reject(s)})}function zg(n,e){const t=Js(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(ha(s,e??{}))return i;Gt(i,"already-initialized")}return t.initialize({options:e})}function Fg(n,e){const t=e?.persistence||[],a=(Array.isArray(t)?t:[t]).map(pn);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(a,e?.popupRedirectResolver)}function Ug(n,e,t){const a=ka(n);le(/^https?:\/\//.test(e),a,"invalid-emulator-scheme");const i=!1,s=qu(e),{host:r,port:l}=jg(e),c=l===null?"":`:${l}`,u={url:`${s}//${r}${c}/`},g=Object.freeze({host:r,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!a._canInitEmulator){le(a.config.emulator&&a.emulatorConfig,a,"emulator-config-failed"),le(ha(u,a.config.emulator)&&ha(g,a.emulatorConfig),a,"emulator-config-failed");return}a.config.emulator=u,a.emulatorConfig=g,a.settings.appVerificationDisabledForTesting=!0,Jn(r)?(Ao(`${s}//${r}${c}`),Co("Auth",!0)):qg()}function qu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function jg(n){const e=qu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const a=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(a);if(i){const s=i[1];return{host:s,port:Vc(a.substr(s.length+1))}}else{const[s,r]=a.split(":");return{host:s,port:Vc(r)}}}function Vc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function qg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}class Oo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return un("not implemented")}_getIdTokenResponse(e){return un("not implemented")}_linkToIdToken(e,t){return un("not implemented")}_getReauthenticationResolver(e){return un("not implemented")}}async function Hg(n,e){return Zn(n,"POST","/v1/accounts:signUp",e)}async function Wg(n,e){return Hi(n,"POST","/v1/accounts:signInWithPassword",Xn(n,e))}async function Gg(n,e){return Hi(n,"POST","/v1/accounts:signInWithEmailLink",Xn(n,e))}async function Kg(n,e){return Hi(n,"POST","/v1/accounts:signInWithEmailLink",Xn(n,e))}class $i extends Oo{constructor(e,t,a,i=null){super("password",a),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new $i(e,t,"password")}static _fromEmailAndCode(e,t,a=null){return new $i(e,t,"emailLink",a)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ro(e,t,"signInWithPassword",Wg);case"emailLink":return Gg(e,{email:this._email,oobCode:this._password});default:Gt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const a={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return ro(e,a,"signUpPassword",Hg);case"emailLink":return Kg(e,{idToken:t,email:this._email,oobCode:this._password});default:Gt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}async function Ba(n,e){return Hi(n,"POST","/v1/accounts:signInWithIdp",Xn(n,e))}const Qg="http://localhost";class ga extends Oo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ga(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Gt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:a,signInMethod:i,...s}=t;if(!a||!i)return null;const r=new ga(a,i);return r.idToken=s.idToken||void 0,r.accessToken=s.accessToken||void 0,r.secret=s.secret,r.nonce=s.nonce,r.pendingToken=s.pendingToken||null,r}_getIdTokenResponse(e){const t=this.buildRequest();return Ba(e,t)}_linkToIdToken(e,t){const a=this.buildRequest();return a.idToken=t,Ba(e,a)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ba(e,t)}buildRequest(){const e={requestUri:Qg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ji(t)}return e}}function Yg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Jg(n){const e=yi(vi(n)).link,t=e?yi(vi(e)).deep_link_id:null,a=yi(vi(n)).deep_link_id;return(a?yi(vi(a)).link:null)||a||t||e||n}class Vo{constructor(e){const t=yi(vi(e)),a=t.apiKey??null,i=t.oobCode??null,s=Yg(t.mode??null);le(a&&i&&s,"argument-error"),this.apiKey=a,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Jg(e);try{return new Vo(t)}catch{return null}}}class Ka{constructor(){this.providerId=Ka.PROVIDER_ID}static credential(e,t){return $i._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const a=Vo.parseLink(t);return le(a,"argument-error"),$i._fromEmailAndCode(e,a.code,a.tenantId)}}Ka.PROVIDER_ID="password";Ka.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ka.EMAIL_LINK_SIGN_IN_METHOD="emailLink";class Hu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Wi extends Hu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Rn extends Wi{constructor(){super("facebook.com")}static credential(e){return ga._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rn.credential(e.oauthAccessToken)}catch{return null}}}Rn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rn.PROVIDER_ID="facebook.com";class Ln extends Wi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ga._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:a}=e;if(!t&&!a)return null;try{return Ln.credential(t,a)}catch{return null}}}Ln.GOOGLE_SIGN_IN_METHOD="google.com";Ln.PROVIDER_ID="google.com";class $n extends Wi{constructor(){super("github.com")}static credential(e){return ga._fromParams({providerId:$n.PROVIDER_ID,signInMethod:$n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $n.credentialFromTaggedObject(e)}static credentialFromError(e){return $n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $n.credential(e.oauthAccessToken)}catch{return null}}}$n.GITHUB_SIGN_IN_METHOD="github.com";$n.PROVIDER_ID="github.com";class Dn extends Wi{constructor(){super("twitter.com")}static credential(e,t){return ga._fromParams({providerId:Dn.PROVIDER_ID,signInMethod:Dn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dn.credentialFromTaggedObject(e)}static credentialFromError(e){return Dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:a}=e;if(!t||!a)return null;try{return Dn.credential(t,a)}catch{return null}}}Dn.TWITTER_SIGN_IN_METHOD="twitter.com";Dn.PROVIDER_ID="twitter.com";async function Xg(n,e){return Hi(n,"POST","/v1/accounts:signUp",Xn(n,e))}class ya{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,a,i=!1){const s=await Ht._fromIdTokenResponse(e,a,i),r=Bc(a);return new ya({user:s,providerId:r,_tokenResponse:a,operationType:t})}static async _forOperation(e,t,a){await e._updateTokensIfNecessary(a,!0);const i=Bc(a);return new ya({user:e,providerId:i,_tokenResponse:a,operationType:t})}}function Bc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}class Ds extends ln{constructor(e,t,a,i){super(t.code,t.message),this.operationType=a,this.user=i,Object.setPrototypeOf(this,Ds.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:a}}static _fromErrorAndOperation(e,t,a,i){return new Ds(e,t,a,i)}}function Wu(n,e,t,a){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ds._fromErrorAndOperation(n,s,e,a):s})}async function Zg(n,e,t=!1){const a=await Li(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ya._forOperation(n,"link",a)}async function ey(n,e,t=!1){const{auth:a}=n;if(Nt(a.app))return Promise.reject(mn(a));const i="reauthenticate";try{const s=await Li(n,Wu(a,i,e,n),t);le(s.idToken,a,"internal-error");const r=No(s.idToken);le(r,a,"internal-error");const{sub:l}=r;return le(n.uid===l,a,"user-mismatch"),ya._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Gt(a,"user-mismatch"),s}}async function Gu(n,e,t=!1){if(Nt(n.app))return Promise.reject(mn(n));const a="signIn",i=await Wu(n,a,e),s=await ya._fromIdTokenResponse(n,a,i);return t||await n._updateCurrentUser(s.user),s}async function ty(n,e){return Gu(ka(n),e)}async function Ku(n){const e=ka(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function ny(n,e,t){if(Nt(n.app))return Promise.reject(mn(n));const a=ka(n),r=await ro(a,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Xg).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Ku(n),c}),l=await ya._fromIdTokenResponse(a,"signIn",r);return await a._updateCurrentUser(l.user),l}function ay(n,e,t){return Nt(n.app)?Promise.reject(mn(n)):ty(Fe(n),Ka.credential(e,t)).catch(async a=>{throw a.code==="auth/password-does-not-meet-requirements"&&Ku(n),a})}function iy(n,e,t,a){return Fe(n).onIdTokenChanged(e,t,a)}function sy(n,e,t){return Fe(n).beforeAuthStateChanged(e,t)}function ry(n,e,t,a){return Fe(n).onAuthStateChanged(e,t,a)}function oy(n){return Fe(n).signOut()}const Ns="__sak";class Qu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ns,"1"),this.storage.removeItem(Ns),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}const ly=1e3,cy=10;class Yu extends Qu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const a=this.storage.getItem(t),i=this.localCache[t];a!==i&&e(t,i,a)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((r,l,c)=>{this.notifyListeners(r,c)});return}const a=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const r=this.storage.getItem(a);!t&&this.localCache[a]===r||this.notifyListeners(a,r)},s=this.storage.getItem(a);Tg()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,cy):i()}notifyListeners(e,t){this.localCache[e]=t;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,a)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:a}),!0)})},ly)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yu.type="LOCAL";const dy=Yu;class Ju extends Qu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ju.type="SESSION";const Xu=Ju;function uy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}class Zs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const a=new Zs(e);return this.receivers.push(a),a}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:a,eventType:i,data:s}=t.data,r=this.handlersMap[i];if(!r?.size)return;t.ports[0].postMessage({status:"ack",eventId:a,eventType:i});const l=Array.from(r).map(async u=>u(t.origin,s)),c=await uy(l);t.ports[0].postMessage({status:"done",eventId:a,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Zs.receivers=[];function Bo(n="",e=10){let t="";for(let a=0;a<e;a++)t+=Math.floor(Math.random()*10);return n+t}class py{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,a=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,r;return new Promise((l,c)=>{const u=Bo("",20);i.port1.start();const g=setTimeout(()=>{c(new Error("unsupported_event"))},a);r={messageChannel:i,onMessage(x){const v=x;if(v.data.eventId===u)switch(v.data.status){case"ack":clearTimeout(g),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(v.data.response);break;default:clearTimeout(g),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(r),i.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{r&&this.removeMessageHandler(r)})}}function nn(){return window}function my(n){nn().location.href=n}function Zu(){return typeof nn().WorkerGlobalScope<"u"&&typeof nn().importScripts=="function"}async function hy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fy(){return navigator?.serviceWorker?.controller||null}function gy(){return Zu()?self:null}const ep="firebaseLocalStorageDb",yy=1,Ms="firebaseLocalStorage",tp="fbase_key";class Gi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function er(n,e){return n.transaction([Ms],e?"readwrite":"readonly").objectStore(Ms)}function vy(){const n=indexedDB.deleteDatabase(ep);return new Gi(n).toPromise()}function oo(){const n=indexedDB.open(ep,yy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const a=n.result;try{a.createObjectStore(Ms,{keyPath:tp})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const a=n.result;a.objectStoreNames.contains(Ms)?e(a):(a.close(),await vy(),e(await oo()))})})}async function zc(n,e,t){const a=er(n,!0).put({[tp]:e,value:t});return new Gi(a).toPromise()}async function by(n,e){const t=er(n,!1).get(e),a=await new Gi(t).toPromise();return a===void 0?null:a.value}function Fc(n,e){const t=er(n,!0).delete(e);return new Gi(t).toPromise()}const wy=800,xy=3;class np{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await oo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const a=await this._openDb();return await e(a)}catch(a){if(t++>xy)throw a;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Zs._getInstance(gy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await hy(),!this.activeServiceWorker)return;this.sender=new py(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await oo();return await zc(e,Ns,"1"),await Fc(e,Ns),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(a=>zc(a,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(a=>by(a,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Fc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=er(i,!1).getAll();return new Gi(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],a=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)a.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!a.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const a=this.listeners[e];if(a)for(const i of Array.from(a))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),wy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}np.type="LOCAL";const _y=np;new qi(3e4,6e4);function Ey(n,e){return e?pn(e):(le(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}class zo extends Oo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ba(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ba(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ba(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Iy(n){return Gu(n.auth,new zo(n),n.bypassAuthState)}function ky(n){const{auth:e,user:t}=n;return le(t,e,"internal-error"),ey(t,new zo(n),n.bypassAuthState)}async function Ty(n){const{auth:e,user:t}=n;return le(t,e,"internal-error"),Zg(t,new zo(n),n.bypassAuthState)}class ap{constructor(e,t,a,i,s=!1){this.auth=e,this.resolver=a,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(a){this.reject(a)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:a,postBody:i,tenantId:s,error:r,type:l}=e;if(r){this.reject(r);return}const c={auth:this.auth,requestUri:t,sessionId:a,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Iy;case"linkViaPopup":case"linkViaRedirect":return Ty;case"reauthViaPopup":case"reauthViaRedirect":return ky;default:Gt(this.auth,"internal-error")}}resolve(e){vn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){vn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const Ay=new qi(2e3,1e4);class Ma extends ap{constructor(e,t,a,i,s){super(e,t,i,s),this.provider=a,this.authWindow=null,this.pollId=null,Ma.currentPopupAction&&Ma.currentPopupAction.cancel(),Ma.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return le(e,this.auth,"internal-error"),e}async onExecution(){vn(this.filter.length===1,"Popup operations only handle one event");const e=Bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(tn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(tn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ma.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(tn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ay.get())};e()}}Ma.currentPopupAction=null;const Cy="pendingRedirect",xs=new Map;class Sy extends ap{constructor(e,t,a=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,a),this.eventId=null}async execute(){let e=xs.get(this.auth._key());if(!e){try{const a=await Py(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(a)}catch(t){e=()=>Promise.reject(t)}xs.set(this.auth._key(),e)}return this.bypassAuthState||xs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Py(n,e){const t=$y(e),a=Ly(n);if(!await a._isAvailable())return!1;const i=await a._get(t)==="true";return await a._remove(t),i}function Ry(n,e){xs.set(n._key(),e)}function Ly(n){return pn(n._redirectPersistence)}function $y(n){return ws(Cy,n.config.apiKey,n.name)}async function Dy(n,e,t=!1){if(Nt(n.app))return Promise.reject(mn(n));const a=ka(n),i=Ey(a,e),r=await new Sy(a,i,t).execute();return r&&!t&&(delete r.user._redirectEventId,await a._persistUserIfCurrent(r.user),await a._setRedirectUser(null,e)),r}const Ny=600*1e3;class My{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(a=>{this.isEventForConsumer(e,a)&&(t=!0,this.sendToConsumer(e,a),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Oy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!ip(e)){const a=e.error.code?.split("auth/")[1]||"internal-error";t.onError(tn(this.auth,a))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const a=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&a}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ny&&this.cachedEventUids.clear(),this.cachedEventUids.has(Uc(e))}saveEventToCache(e){this.cachedEventUids.add(Uc(e)),this.lastProcessedEventTime=Date.now()}}function Uc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ip({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Oy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ip(n);default:return!1}}async function Vy(n,e={}){return Zn(n,"GET","/v1/projects",e)}const By=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,zy=/^https?/;async function Fy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Vy(n);for(const t of e)try{if(Uy(t))return}catch{}Gt(n,"unauthorized-domain")}function Uy(n){const e=io(),{protocol:t,hostname:a}=new URL(e);if(n.startsWith("chrome-extension://")){const r=new URL(n);return r.hostname===""&&a===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&r.hostname===a}if(!zy.test(t))return!1;if(By.test(n))return a===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(a)}const jy=new qi(3e4,6e4);function jc(){const n=nn().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function qy(n){return new Promise((e,t)=>{function a(){jc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jc(),t(tn(n,"network-request-failed"))},timeout:jy.get()})}if(nn().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(nn().gapi?.load)a();else{const i=Ng("iframefcb");return nn()[i]=()=>{gapi.load?a():t(tn(n,"network-request-failed"))},Uu(`${Dg()}?onload=${i}`).catch(s=>t(s))}}).catch(e=>{throw _s=null,e})}let _s=null;function Hy(n){return _s=_s||qy(n),_s}const Wy=new qi(5e3,15e3),Gy="__/auth/iframe",Ky="emulator/auth/iframe",Qy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Yy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Jy(n){const e=n.config;le(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Do(e,Ky):`https://${n.config.authDomain}/${Gy}`,a={apiKey:e.apiKey,appName:n.name,v:Ia},i=Yy.get(n.config.apiHost);i&&(a.eid=i);const s=n._getFrameworks();return s.length&&(a.fw=s.join(",")),`${t}?${ji(a).slice(1)}`}async function Xy(n){const e=await Hy(n),t=nn().gapi;return le(t,n,"internal-error"),e.open({where:document.body,url:Jy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Qy,dontclear:!0},a=>new Promise(async(i,s)=>{await a.restyle({setHideOnLeave:!1});const r=tn(n,"network-request-failed"),l=nn().setTimeout(()=>{s(r)},Wy.get());function c(){nn().clearTimeout(l),i(a)}a.ping(c).then(c,()=>{s(r)})}))}const Zy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ev=500,tv=600,nv="_blank",av="http://localhost";class qc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function iv(n,e,t,a=ev,i=tv){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),r=Math.max((window.screen.availWidth-a)/2,0).toString();let l="";const c={...Zy,width:a.toString(),height:i.toString(),top:s,left:r},u=Et().toLowerCase();t&&(l=Nu(u)?nv:t),$u(u)&&(e=e||av,c.scrollbars="yes");const g=Object.entries(c).reduce((v,[P,N])=>`${v}${P}=${N},`,"");if(kg(u)&&l!=="_self")return sv(e||"",l),new qc(null);const x=window.open(e||"",l,g);le(x,n,"popup-blocked");try{x.focus()}catch{}return new qc(x)}function sv(n,e){const t=document.createElement("a");t.href=n,t.target=e;const a=document.createEvent("MouseEvent");a.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(a)}const rv="__/auth/handler",ov="emulator/auth/handler",lv=encodeURIComponent("fac");async function Hc(n,e,t,a,i,s){le(n.config.authDomain,n,"auth-domain-config-required"),le(n.config.apiKey,n,"invalid-api-key");const r={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:a,v:Ia,eventId:i};if(e instanceof Hu){e.setDefaultLanguage(n.languageCode),r.providerId=e.providerId||"",Wh(e.getCustomParameters())||(r.customParameters=JSON.stringify(e.getCustomParameters()));for(const[g,x]of Object.entries({}))r[g]=x}if(e instanceof Wi){const g=e.getScopes().filter(x=>x!=="");g.length>0&&(r.scopes=g.join(","))}n.tenantId&&(r.tid=n.tenantId);const l=r;for(const g of Object.keys(l))l[g]===void 0&&delete l[g];const c=await n._getAppCheckToken(),u=c?`#${lv}=${encodeURIComponent(c)}`:"";return`${cv(n)}?${ji(l).slice(1)}${u}`}function cv({config:n}){return n.emulator?Do(n,ov):`https://${n.authDomain}/${rv}`}const zr="webStorageSupport";class dv{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Xu,this._completeRedirectFn=Dy,this._overrideRedirectResult=Ry}async _openPopup(e,t,a,i){vn(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Hc(e,t,a,io(),i);return iv(e,s,Bo())}async _openRedirect(e,t,a,i){await this._originValidation(e);const s=await Hc(e,t,a,io(),i);return my(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(vn(s,"If manager is not set, promise should be"),s)}const a=this.initAndGetManager(e);return this.eventManagers[t]={promise:a},a.catch(()=>{delete this.eventManagers[t]}),a}async initAndGetManager(e){const t=await Xy(e),a=new My(e);return t.register("authEvent",i=>(le(i?.authEvent,e,"invalid-auth-event"),{status:a.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:a},this.iframes[e._key()]=t,a}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(zr,{type:zr},i=>{const s=i?.[0]?.[zr];s!==void 0&&t(!!s),Gt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Fy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return zu()||Du()||Mo()}}const uv=dv;var Wc="@firebase/auth",Gc="1.12.0";class pv{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(a=>{e(a?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){le(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}function mv(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function hv(n){fa(new jn("auth",(e,{options:t})=>{const a=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:r,authDomain:l}=a.options;le(r&&!r.includes(":"),"invalid-api-key",{appName:a.name});const c={apiKey:r,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fu(n)},u=new Rg(a,i,s,c);return Fg(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,a)=>{e.getProvider("auth-internal").initialize()})),fa(new jn("auth-internal",e=>{const t=ka(e.getProvider("auth").getImmediate());return(a=>new pv(a))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),en(Wc,Gc,mv(n)),en(Wc,Gc,"esm2020")}const fv=300,gv=bu("authIdTokenMaxAge")||fv;let Kc=null;const yv=n=>async e=>{const t=e&&await e.getIdTokenResult(),a=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(a&&a>gv)return;const i=t?.token;Kc!==i&&(Kc=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Fo(n=Lo()){const e=Js(n,"auth");if(e.isInitialized())return e.getImmediate();const t=zg(n,{popupRedirectResolver:uv,persistence:[_y,dy,Xu]}),a=bu("authTokenSyncURL");if(a&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(a,location.origin);if(location.origin===s.origin){const r=yv(s.toString());sy(t,r,()=>r(t.currentUser)),iy(t,l=>r(l))}}const i=gu("auth");return i&&Ug(t,`http://${i}`),t}function vv(){return document.getElementsByTagName("head")?.[0]??document}Lg({loadJS(n){return new Promise((e,t)=>{const a=document.createElement("script");a.setAttribute("src",n),a.onload=e,a.onerror=i=>{const s=tn("internal-error");s.customData=i,t(s)},a.type="text/javascript",a.charset="UTF-8",vv().appendChild(a)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});hv("Browser");var bv="firebase",wv="12.9.0";en(bv,wv,"app");var Qc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var Bn,sp;(function(){var n;function e(p,m){function y(){}y.prototype=m.prototype,p.F=m.prototype,p.prototype=new y,p.prototype.constructor=p,p.D=function(b,w,C){for(var h=Array(arguments.length-2),z=2;z<arguments.length;z++)h[z-2]=arguments[z];return m.prototype[w].apply(b,h)}}function t(){this.blockSize=-1}function a(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(a,t),a.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(p,m,y){y||(y=0);const b=Array(16);if(typeof m=="string")for(var w=0;w<16;++w)b[w]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(w=0;w<16;++w)b[w]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=p.g[0],y=p.g[1],w=p.g[2];let C=p.g[3],h;h=m+(C^y&(w^C))+b[0]+3614090360&4294967295,m=y+(h<<7&4294967295|h>>>25),h=C+(w^m&(y^w))+b[1]+3905402710&4294967295,C=m+(h<<12&4294967295|h>>>20),h=w+(y^C&(m^y))+b[2]+606105819&4294967295,w=C+(h<<17&4294967295|h>>>15),h=y+(m^w&(C^m))+b[3]+3250441966&4294967295,y=w+(h<<22&4294967295|h>>>10),h=m+(C^y&(w^C))+b[4]+4118548399&4294967295,m=y+(h<<7&4294967295|h>>>25),h=C+(w^m&(y^w))+b[5]+1200080426&4294967295,C=m+(h<<12&4294967295|h>>>20),h=w+(y^C&(m^y))+b[6]+2821735955&4294967295,w=C+(h<<17&4294967295|h>>>15),h=y+(m^w&(C^m))+b[7]+4249261313&4294967295,y=w+(h<<22&4294967295|h>>>10),h=m+(C^y&(w^C))+b[8]+1770035416&4294967295,m=y+(h<<7&4294967295|h>>>25),h=C+(w^m&(y^w))+b[9]+2336552879&4294967295,C=m+(h<<12&4294967295|h>>>20),h=w+(y^C&(m^y))+b[10]+4294925233&4294967295,w=C+(h<<17&4294967295|h>>>15),h=y+(m^w&(C^m))+b[11]+2304563134&4294967295,y=w+(h<<22&4294967295|h>>>10),h=m+(C^y&(w^C))+b[12]+1804603682&4294967295,m=y+(h<<7&4294967295|h>>>25),h=C+(w^m&(y^w))+b[13]+4254626195&4294967295,C=m+(h<<12&4294967295|h>>>20),h=w+(y^C&(m^y))+b[14]+2792965006&4294967295,w=C+(h<<17&4294967295|h>>>15),h=y+(m^w&(C^m))+b[15]+1236535329&4294967295,y=w+(h<<22&4294967295|h>>>10),h=m+(w^C&(y^w))+b[1]+4129170786&4294967295,m=y+(h<<5&4294967295|h>>>27),h=C+(y^w&(m^y))+b[6]+3225465664&4294967295,C=m+(h<<9&4294967295|h>>>23),h=w+(m^y&(C^m))+b[11]+643717713&4294967295,w=C+(h<<14&4294967295|h>>>18),h=y+(C^m&(w^C))+b[0]+3921069994&4294967295,y=w+(h<<20&4294967295|h>>>12),h=m+(w^C&(y^w))+b[5]+3593408605&4294967295,m=y+(h<<5&4294967295|h>>>27),h=C+(y^w&(m^y))+b[10]+38016083&4294967295,C=m+(h<<9&4294967295|h>>>23),h=w+(m^y&(C^m))+b[15]+3634488961&4294967295,w=C+(h<<14&4294967295|h>>>18),h=y+(C^m&(w^C))+b[4]+3889429448&4294967295,y=w+(h<<20&4294967295|h>>>12),h=m+(w^C&(y^w))+b[9]+568446438&4294967295,m=y+(h<<5&4294967295|h>>>27),h=C+(y^w&(m^y))+b[14]+3275163606&4294967295,C=m+(h<<9&4294967295|h>>>23),h=w+(m^y&(C^m))+b[3]+4107603335&4294967295,w=C+(h<<14&4294967295|h>>>18),h=y+(C^m&(w^C))+b[8]+1163531501&4294967295,y=w+(h<<20&4294967295|h>>>12),h=m+(w^C&(y^w))+b[13]+2850285829&4294967295,m=y+(h<<5&4294967295|h>>>27),h=C+(y^w&(m^y))+b[2]+4243563512&4294967295,C=m+(h<<9&4294967295|h>>>23),h=w+(m^y&(C^m))+b[7]+1735328473&4294967295,w=C+(h<<14&4294967295|h>>>18),h=y+(C^m&(w^C))+b[12]+2368359562&4294967295,y=w+(h<<20&4294967295|h>>>12),h=m+(y^w^C)+b[5]+4294588738&4294967295,m=y+(h<<4&4294967295|h>>>28),h=C+(m^y^w)+b[8]+2272392833&4294967295,C=m+(h<<11&4294967295|h>>>21),h=w+(C^m^y)+b[11]+1839030562&4294967295,w=C+(h<<16&4294967295|h>>>16),h=y+(w^C^m)+b[14]+4259657740&4294967295,y=w+(h<<23&4294967295|h>>>9),h=m+(y^w^C)+b[1]+2763975236&4294967295,m=y+(h<<4&4294967295|h>>>28),h=C+(m^y^w)+b[4]+1272893353&4294967295,C=m+(h<<11&4294967295|h>>>21),h=w+(C^m^y)+b[7]+4139469664&4294967295,w=C+(h<<16&4294967295|h>>>16),h=y+(w^C^m)+b[10]+3200236656&4294967295,y=w+(h<<23&4294967295|h>>>9),h=m+(y^w^C)+b[13]+681279174&4294967295,m=y+(h<<4&4294967295|h>>>28),h=C+(m^y^w)+b[0]+3936430074&4294967295,C=m+(h<<11&4294967295|h>>>21),h=w+(C^m^y)+b[3]+3572445317&4294967295,w=C+(h<<16&4294967295|h>>>16),h=y+(w^C^m)+b[6]+76029189&4294967295,y=w+(h<<23&4294967295|h>>>9),h=m+(y^w^C)+b[9]+3654602809&4294967295,m=y+(h<<4&4294967295|h>>>28),h=C+(m^y^w)+b[12]+3873151461&4294967295,C=m+(h<<11&4294967295|h>>>21),h=w+(C^m^y)+b[15]+530742520&4294967295,w=C+(h<<16&4294967295|h>>>16),h=y+(w^C^m)+b[2]+3299628645&4294967295,y=w+(h<<23&4294967295|h>>>9),h=m+(w^(y|~C))+b[0]+4096336452&4294967295,m=y+(h<<6&4294967295|h>>>26),h=C+(y^(m|~w))+b[7]+1126891415&4294967295,C=m+(h<<10&4294967295|h>>>22),h=w+(m^(C|~y))+b[14]+2878612391&4294967295,w=C+(h<<15&4294967295|h>>>17),h=y+(C^(w|~m))+b[5]+4237533241&4294967295,y=w+(h<<21&4294967295|h>>>11),h=m+(w^(y|~C))+b[12]+1700485571&4294967295,m=y+(h<<6&4294967295|h>>>26),h=C+(y^(m|~w))+b[3]+2399980690&4294967295,C=m+(h<<10&4294967295|h>>>22),h=w+(m^(C|~y))+b[10]+4293915773&4294967295,w=C+(h<<15&4294967295|h>>>17),h=y+(C^(w|~m))+b[1]+2240044497&4294967295,y=w+(h<<21&4294967295|h>>>11),h=m+(w^(y|~C))+b[8]+1873313359&4294967295,m=y+(h<<6&4294967295|h>>>26),h=C+(y^(m|~w))+b[15]+4264355552&4294967295,C=m+(h<<10&4294967295|h>>>22),h=w+(m^(C|~y))+b[6]+2734768916&4294967295,w=C+(h<<15&4294967295|h>>>17),h=y+(C^(w|~m))+b[13]+1309151649&4294967295,y=w+(h<<21&4294967295|h>>>11),h=m+(w^(y|~C))+b[4]+4149444226&4294967295,m=y+(h<<6&4294967295|h>>>26),h=C+(y^(m|~w))+b[11]+3174756917&4294967295,C=m+(h<<10&4294967295|h>>>22),h=w+(m^(C|~y))+b[2]+718787259&4294967295,w=C+(h<<15&4294967295|h>>>17),h=y+(C^(w|~m))+b[9]+3951481745&4294967295,p.g[0]=p.g[0]+m&4294967295,p.g[1]=p.g[1]+(w+(h<<21&4294967295|h>>>11))&4294967295,p.g[2]=p.g[2]+w&4294967295,p.g[3]=p.g[3]+C&4294967295}a.prototype.v=function(p,m){m===void 0&&(m=p.length);const y=m-this.blockSize,b=this.C;let w=this.h,C=0;for(;C<m;){if(w==0)for(;C<=y;)i(this,p,C),C+=this.blockSize;if(typeof p=="string"){for(;C<m;)if(b[w++]=p.charCodeAt(C++),w==this.blockSize){i(this,b),w=0;break}}else for(;C<m;)if(b[w++]=p[C++],w==this.blockSize){i(this,b),w=0;break}}this.h=w,this.o+=m},a.prototype.A=function(){var p=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);p[0]=128;for(var m=1;m<p.length-8;++m)p[m]=0;m=this.o*8;for(var y=p.length-8;y<p.length;++y)p[y]=m&255,m/=256;for(this.v(p),p=Array(16),m=0,y=0;y<4;++y)for(let b=0;b<32;b+=8)p[m++]=this.g[y]>>>b&255;return p};function s(p,m){var y=l;return Object.prototype.hasOwnProperty.call(y,p)?y[p]:y[p]=m(p)}function r(p,m){this.h=m;const y=[];let b=!0;for(let w=p.length-1;w>=0;w--){const C=p[w]|0;b&&C==m||(y[w]=C,b=!1)}this.g=y}var l={};function c(p){return-128<=p&&p<128?s(p,function(m){return new r([m|0],m<0?-1:0)}):new r([p|0],p<0?-1:0)}function u(p){if(isNaN(p)||!isFinite(p))return x;if(p<0)return E(u(-p));const m=[];let y=1;for(let b=0;p>=y;b++)m[b]=p/y|0,y*=4294967296;return new r(m,0)}function g(p,m){if(p.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(p.charAt(0)=="-")return E(g(p.substring(1),m));if(p.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=u(Math.pow(m,8));let b=x;for(let C=0;C<p.length;C+=8){var w=Math.min(8,p.length-C);const h=parseInt(p.substring(C,C+w),m);w<8?(w=u(Math.pow(m,w)),b=b.j(w).add(u(h))):(b=b.j(y),b=b.add(u(h)))}return b}var x=c(0),v=c(1),P=c(16777216);n=r.prototype,n.m=function(){if(O(this))return-E(this).m();let p=0,m=1;for(let y=0;y<this.g.length;y++){const b=this.i(y);p+=(b>=0?b:4294967296+b)*m,m*=4294967296}return p},n.toString=function(p){if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(N(this))return"0";if(O(this))return"-"+E(this).toString(p);const m=u(Math.pow(p,6));var y=this;let b="";for(;;){const w=_(y,m).g;y=k(y,w.j(m));let C=((y.g.length>0?y.g[0]:y.h)>>>0).toString(p);if(y=w,N(y))return C+b;for(;C.length<6;)C="0"+C;b=C+b}},n.i=function(p){return p<0?0:p<this.g.length?this.g[p]:this.h};function N(p){if(p.h!=0)return!1;for(let m=0;m<p.g.length;m++)if(p.g[m]!=0)return!1;return!0}function O(p){return p.h==-1}n.l=function(p){return p=k(this,p),O(p)?-1:N(p)?0:1};function E(p){const m=p.g.length,y=[];for(let b=0;b<m;b++)y[b]=~p.g[b];return new r(y,~p.h).add(v)}n.abs=function(){return O(this)?E(this):this},n.add=function(p){const m=Math.max(this.g.length,p.g.length),y=[];let b=0;for(let w=0;w<=m;w++){let C=b+(this.i(w)&65535)+(p.i(w)&65535),h=(C>>>16)+(this.i(w)>>>16)+(p.i(w)>>>16);b=h>>>16,C&=65535,h&=65535,y[w]=h<<16|C}return new r(y,y[y.length-1]&-2147483648?-1:0)};function k(p,m){return p.add(E(m))}n.j=function(p){if(N(this)||N(p))return x;if(O(this))return O(p)?E(this).j(E(p)):E(E(this).j(p));if(O(p))return E(this.j(E(p)));if(this.l(P)<0&&p.l(P)<0)return u(this.m()*p.m());const m=this.g.length+p.g.length,y=[];for(var b=0;b<2*m;b++)y[b]=0;for(b=0;b<this.g.length;b++)for(let w=0;w<p.g.length;w++){const C=this.i(b)>>>16,h=this.i(b)&65535,z=p.i(w)>>>16,H=p.i(w)&65535;y[2*b+2*w]+=h*H,T(y,2*b+2*w),y[2*b+2*w+1]+=C*H,T(y,2*b+2*w+1),y[2*b+2*w+1]+=h*z,T(y,2*b+2*w+1),y[2*b+2*w+2]+=C*z,T(y,2*b+2*w+2)}for(p=0;p<m;p++)y[p]=y[2*p+1]<<16|y[2*p];for(p=m;p<2*m;p++)y[p]=0;return new r(y,0)};function T(p,m){for(;(p[m]&65535)!=p[m];)p[m+1]+=p[m]>>>16,p[m]&=65535,m++}function S(p,m){this.g=p,this.h=m}function _(p,m){if(N(m))throw Error("division by zero");if(N(p))return new S(x,x);if(O(p))return m=_(E(p),m),new S(E(m.g),E(m.h));if(O(m))return m=_(p,E(m)),new S(E(m.g),m.h);if(p.g.length>30){if(O(p)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var y=v,b=m;b.l(p)<=0;)y=R(y),b=R(b);var w=M(y,1),C=M(b,1);for(b=M(b,2),y=M(y,2);!N(b);){var h=C.add(b);h.l(p)<=0&&(w=w.add(y),C=h),b=M(b,1),y=M(y,1)}return m=k(p,w.j(m)),new S(w,m)}for(w=x;p.l(m)>=0;){for(y=Math.max(1,Math.floor(p.m()/m.m())),b=Math.ceil(Math.log(y)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),C=u(y),h=C.j(m);O(h)||h.l(p)>0;)y-=b,C=u(y),h=C.j(m);N(C)&&(C=v),w=w.add(C),p=k(p,h)}return new S(w,p)}n.B=function(p){return _(this,p).h},n.and=function(p){const m=Math.max(this.g.length,p.g.length),y=[];for(let b=0;b<m;b++)y[b]=this.i(b)&p.i(b);return new r(y,this.h&p.h)},n.or=function(p){const m=Math.max(this.g.length,p.g.length),y=[];for(let b=0;b<m;b++)y[b]=this.i(b)|p.i(b);return new r(y,this.h|p.h)},n.xor=function(p){const m=Math.max(this.g.length,p.g.length),y=[];for(let b=0;b<m;b++)y[b]=this.i(b)^p.i(b);return new r(y,this.h^p.h)};function R(p){const m=p.g.length+1,y=[];for(let b=0;b<m;b++)y[b]=p.i(b)<<1|p.i(b-1)>>>31;return new r(y,p.h)}function M(p,m){const y=m>>5;m%=32;const b=p.g.length-y,w=[];for(let C=0;C<b;C++)w[C]=m>0?p.i(C+y)>>>m|p.i(C+y+1)<<32-m:p.i(C+y);return new r(w,p.h)}a.prototype.digest=a.prototype.A,a.prototype.reset=a.prototype.u,a.prototype.update=a.prototype.v,sp=a,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=u,r.fromString=g,Bn=r}).apply(typeof Qc<"u"?Qc:typeof self<"u"?self:typeof window<"u"?window:{});var ds=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};var rp,bi,op,Es,lo,lp,cp,dp;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ds=="object"&&ds];for(var d=0;d<o.length;++d){var f=o[d];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var a=t(this);function i(o,d){if(d)e:{var f=a;o=o.split(".");for(var I=0;I<o.length-1;I++){var B=o[I];if(!(B in f))break e;f=f[B]}o=o[o.length-1],I=f[o],d=d(I),d!=I&&d!=null&&e(f,o,{configurable:!0,writable:!0,value:d})}}i("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(o){return o||function(d){var f=[],I;for(I in d)Object.prototype.hasOwnProperty.call(d,I)&&f.push([I,d[I]]);return f}});var s=s||{},r=this||self;function l(o){var d=typeof o;return d=="object"&&o!=null||d=="function"}function c(o,d,f){return o.call.apply(o.bind,arguments)}function u(o,d,f){return u=c,u.apply(null,arguments)}function g(o,d){var f=Array.prototype.slice.call(arguments,1);return function(){var I=f.slice();return I.push.apply(I,arguments),o.apply(this,I)}}function x(o,d){function f(){}f.prototype=d.prototype,o.Z=d.prototype,o.prototype=new f,o.prototype.constructor=o,o.Ob=function(I,B,j){for(var Z=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)Z[ge-2]=arguments[ge];return d.prototype[B].apply(I,Z)}}var v=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function P(o){const d=o.length;if(d>0){const f=Array(d);for(let I=0;I<d;I++)f[I]=o[I];return f}return[]}function N(o,d){for(let I=1;I<arguments.length;I++){const B=arguments[I];var f=typeof B;if(f=f!="object"?f:B?Array.isArray(B)?"array":f:"null",f=="array"||f=="object"&&typeof B.length=="number"){f=o.length||0;const j=B.length||0;o.length=f+j;for(let Z=0;Z<j;Z++)o[f+Z]=B[Z]}else o.push(B)}}class O{constructor(d,f){this.i=d,this.j=f,this.h=0,this.g=null}get(){let d;return this.h>0?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function E(o){r.setTimeout(()=>{throw o},0)}function k(){var o=p;let d=null;return o.g&&(d=o.g,o.g=o.g.next,o.g||(o.h=null),d.next=null),d}class T{constructor(){this.h=this.g=null}add(d,f){const I=S.get();I.set(d,f),this.h?this.h.next=I:this.g=I,this.h=I}}var S=new O(()=>new _,o=>o.reset());class _{constructor(){this.next=this.g=this.h=null}set(d,f){this.h=d,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let R,M=!1,p=new T,m=()=>{const o=Promise.resolve(void 0);R=()=>{o.then(y)}};function y(){for(var o;o=k();){try{o.h.call(o.g)}catch(f){E(f)}var d=S;d.j(o),d.h<100&&(d.h++,o.next=d.g,d.g=o)}M=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,d){this.type=o,this.g=this.target=d,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var C=(function(){if(!r.addEventListener||!Object.defineProperty)return!1;var o=!1,d=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const f=()=>{};r.addEventListener("test",f,d),r.removeEventListener("test",f,d)}catch{}return o})();function h(o){return/^[\s\xa0]*$/.test(o)}function z(o,d){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,d)}x(z,w),z.prototype.init=function(o,d){const f=this.type=o.type,I=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=d,d=o.relatedTarget,d||(f=="mouseover"?d=o.fromElement:f=="mouseout"&&(d=o.toElement)),this.relatedTarget=d,I?(this.clientX=I.clientX!==void 0?I.clientX:I.pageX,this.clientY=I.clientY!==void 0?I.clientY:I.pageY,this.screenX=I.screenX||0,this.screenY=I.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&z.Z.h.call(this)},z.prototype.h=function(){z.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var H="closure_listenable_"+(Math.random()*1e6|0),A=0;function L(o,d,f,I,B){this.listener=o,this.proxy=null,this.src=d,this.type=f,this.capture=!!I,this.ha=B,this.key=++A,this.da=this.fa=!1}function G(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function q(o,d,f){for(const I in o)d.call(f,o[I],I,o)}function J(o,d){for(const f in o)d.call(void 0,o[f],f,o)}function X(o){const d={};for(const f in o)d[f]=o[f];return d}const ae="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function de(o,d){let f,I;for(let B=1;B<arguments.length;B++){I=arguments[B];for(f in I)o[f]=I[f];for(let j=0;j<ae.length;j++)f=ae[j],Object.prototype.hasOwnProperty.call(I,f)&&(o[f]=I[f])}}function oe(o){this.src=o,this.g={},this.h=0}oe.prototype.add=function(o,d,f,I,B){const j=o.toString();o=this.g[j],o||(o=this.g[j]=[],this.h++);const Z=xe(o,d,I,B);return Z>-1?(d=o[Z],f||(d.fa=!1)):(d=new L(d,this.src,j,!!I,B),d.fa=f,o.push(d)),d};function fe(o,d){const f=d.type;if(f in o.g){var I=o.g[f],B=Array.prototype.indexOf.call(I,d,void 0),j;(j=B>=0)&&Array.prototype.splice.call(I,B,1),j&&(G(d),o.g[f].length==0&&(delete o.g[f],o.h--))}}function xe(o,d,f,I){for(let B=0;B<o.length;++B){const j=o[B];if(!j.da&&j.listener==d&&j.capture==!!f&&j.ha==I)return B}return-1}var Ce="closure_lm_"+(Math.random()*1e6|0),Se={};function Le(o,d,f,I,B){if(Array.isArray(d)){for(let j=0;j<d.length;j++)Le(o,d[j],f,I,B);return null}return f=ut(f),o&&o[H]?o.J(d,f,l(I)?!!I.capture:!1,B):qe(o,d,f,!1,I,B)}function qe(o,d,f,I,B,j){if(!d)throw Error("Invalid event type");const Z=l(B)?!!B.capture:!!B;let ge=Oe(o);if(ge||(o[Ce]=ge=new oe(o)),f=ge.add(d,f,I,Z,j),f.proxy)return f;if(I=Xe(),f.proxy=I,I.src=o,I.listener=f,o.addEventListener)C||(B=Z),B===void 0&&(B=!1),o.addEventListener(d.toString(),I,B);else if(o.attachEvent)o.attachEvent(se(d.toString()),I);else if(o.addListener&&o.removeListener)o.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");return f}function Xe(){function o(f){return d.call(o.src,o.listener,f)}const d=pe;return o}function st(o,d,f,I,B){if(Array.isArray(d))for(var j=0;j<d.length;j++)st(o,d[j],f,I,B);else I=l(I)?!!I.capture:!!I,f=ut(f),o&&o[H]?(o=o.i,j=String(d).toString(),j in o.g&&(d=o.g[j],f=xe(d,f,I,B),f>-1&&(G(d[f]),Array.prototype.splice.call(d,f,1),d.length==0&&(delete o.g[j],o.h--)))):o&&(o=Oe(o))&&(d=o.g[d.toString()],o=-1,d&&(o=xe(d,f,I,B)),(f=o>-1?d[o]:null)&&he(f))}function he(o){if(typeof o!="number"&&o&&!o.da){var d=o.src;if(d&&d[H])fe(d.i,o);else{var f=o.type,I=o.proxy;d.removeEventListener?d.removeEventListener(f,I,o.capture):d.detachEvent?d.detachEvent(se(f),I):d.addListener&&d.removeListener&&d.removeListener(I),(f=Oe(d))?(fe(f,o),f.h==0&&(f.src=null,d[Ce]=null)):G(o)}}}function se(o){return o in Se?Se[o]:Se[o]="on"+o}function pe(o,d){if(o.da)o=!0;else{d=new z(d,this);const f=o.listener,I=o.ha||o.src;o.fa&&he(o),o=f.call(I,d)}return o}function Oe(o){return o=o[Ce],o instanceof oe?o:null}var ve="__closure_events_fn_"+(Math.random()*1e9>>>0);function ut(o){return typeof o=="function"?o:(o[ve]||(o[ve]=function(d){return o.handleEvent(d)}),o[ve])}function be(){b.call(this),this.i=new oe(this),this.M=this,this.G=null}x(be,b),be.prototype[H]=!0,be.prototype.removeEventListener=function(o,d,f,I){st(this,o,d,f,I)};function _e(o,d){var f,I=o.G;if(I)for(f=[];I;I=I.G)f.push(I);if(o=o.M,I=d.type||d,typeof d=="string")d=new w(d,o);else if(d instanceof w)d.target=d.target||o;else{var B=d;d=new w(I,o),de(d,B)}B=!0;let j,Z;if(f)for(Z=f.length-1;Z>=0;Z--)j=d.g=f[Z],B=rt(j,I,!0,d)&&B;if(j=d.g=o,B=rt(j,I,!0,d)&&B,B=rt(j,I,!1,d)&&B,f)for(Z=0;Z<f.length;Z++)j=d.g=f[Z],B=rt(j,I,!1,d)&&B}be.prototype.N=function(){if(be.Z.N.call(this),this.i){var o=this.i;for(const d in o.g){const f=o.g[d];for(let I=0;I<f.length;I++)G(f[I]);delete o.g[d],o.h--}}this.G=null},be.prototype.J=function(o,d,f,I){return this.i.add(String(o),d,!1,f,I)},be.prototype.K=function(o,d,f,I){return this.i.add(String(o),d,!0,f,I)};function rt(o,d,f,I){if(d=o.i.g[String(d)],!d)return!0;d=d.concat();let B=!0;for(let j=0;j<d.length;++j){const Z=d[j];if(Z&&!Z.da&&Z.capture==f){const ge=Z.listener,lt=Z.ha||Z.src;Z.fa&&fe(o.i,Z),B=ge.call(lt,I)!==!1&&B}}return B&&!I.defaultPrevented}function He(o,d){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=u(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(d)>2147483647?-1:r.setTimeout(o,d||0)}function It(o){o.g=He(()=>{o.g=null,o.i&&(o.i=!1,It(o))},o.l);const d=o.h;o.h=null,o.m.apply(null,d)}class pt extends b{constructor(d,f){super(),this.m=d,this.l=f,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:It(this)}N(){super.N(),this.g&&(r.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function tt(o){b.call(this),this.h=o,this.g={}}x(tt,b);var Qt=[];function na(o){q(o.g,function(d,f){this.g.hasOwnProperty(f)&&he(d)},o),o.g={}}tt.prototype.N=function(){tt.Z.N.call(this),na(this)},tt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ei=r.JSON.stringify,F=r.JSON.parse,$=class{stringify(o){return r.JSON.stringify(o,void 0)}parse(o){return r.JSON.parse(o,void 0)}};function U(){}function Q(){}var W={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function te(){w.call(this,"d")}x(te,w);function ie(){w.call(this,"c")}x(ie,w);var we={},Ue=null;function We(){return Ue=Ue||new be}we.Ia="serverreachability";function At(o){w.call(this,we.Ia,o)}x(At,w);function mt(o){const d=We();_e(d,new At(d))}we.STAT_EVENT="statevent";function Vt(o,d){w.call(this,we.STAT_EVENT,o),this.stat=d}x(Vt,w);function Re(o){const d=We();_e(d,new Vt(d,o))}we.Ja="timingevent";function Lt(o,d){w.call(this,we.Ja,o),this.size=d}x(Lt,w);function kt(o,d){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return r.setTimeout(function(){o()},d)}function Ge(){this.g=!0}Ge.prototype.ua=function(){this.g=!1};function De(o,d,f,I,B,j){o.info(function(){if(o.g)if(j){var Z="",ge=j.split("&");for(let $e=0;$e<ge.length;$e++){var lt=ge[$e].split("=");if(lt.length>1){const ht=lt[0];lt=lt[1];const Jt=ht.split("_");Z=Jt.length>=2&&Jt[1]=="type"?Z+(ht+"="+lt+"&"):Z+(ht+"=redacted&")}}}else Z=null;else Z=j;return"XMLHTTP REQ ("+I+") [attempt "+B+"]: "+d+`
`+f+`
`+Z})}function Be(o,d,f,I,B,j,Z){o.info(function(){return"XMLHTTP RESP ("+I+") [ attempt "+B+"]: "+d+`
`+f+`
`+j+" "+Z})}function ze(o,d,f,I){o.info(function(){return"XMLHTTP TEXT ("+d+"): "+Ct(o,f)+(I?" "+I:"")})}function Bt(o,d){o.info(function(){return"TIMEOUT: "+d})}Ge.prototype.info=function(){};function Ct(o,d){if(!o.g)return d;if(!d)return null;try{const j=JSON.parse(d);if(j){for(o=0;o<j.length;o++)if(Array.isArray(j[o])){var f=j[o];if(!(f.length<2)){var I=f[1];if(Array.isArray(I)&&!(I.length<1)){var B=I[0];if(B!="noop"&&B!="stop"&&B!="close")for(let Z=1;Z<I.length;Z++)I[Z]=""}}}}return ei(j)}catch{return d}}var Ze={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ot={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},gt;function En(){}x(En,U),En.prototype.g=function(){return new XMLHttpRequest},gt=new En;function ti(o){return encodeURIComponent(String(o))}function nh(o){var d=1;o=o.split(":");const f=[];for(;d>0&&o.length;)f.push(o.shift()),d--;return o.length&&f.push(o.join(":")),f}function In(o,d,f,I){this.j=o,this.i=d,this.l=f,this.S=I||1,this.V=new tt(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Nl}function Nl(){this.i=null,this.g="",this.h=!1}var Ml={},xr={};function _r(o,d,f){o.M=1,o.A=ts(Yt(d)),o.u=f,o.R=!0,Ol(o,null)}function Ol(o,d){o.F=Date.now(),es(o),o.B=Yt(o.A);var f=o.B,I=o.S;Array.isArray(I)||(I=[String(I)]),Yl(f.i,"t",I),o.C=0,f=o.j.L,o.h=new Nl,o.g=hc(o.j,f?d:null,!o.u),o.P>0&&(o.O=new pt(u(o.Y,o,o.g),o.P)),d=o.V,f=o.g,I=o.ba;var B="readystatechange";Array.isArray(B)||(B&&(Qt[0]=B.toString()),B=Qt);for(let j=0;j<B.length;j++){const Z=Le(f,B[j],I||d.handleEvent,!1,d.h||d);if(!Z)break;d.g[Z.key]=Z}d=o.J?X(o.J):{},o.u?(o.v||(o.v="POST"),d["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,d)):(o.v="GET",o.g.ea(o.B,o.v,null,d)),mt(),De(o.i,o.v,o.B,o.l,o.S,o.u)}In.prototype.ba=function(o){o=o.target;const d=this.O;d&&An(o)==3?d.j():this.Y(o)},In.prototype.Y=function(o){try{if(o==this.g)e:{const ge=An(this.g),lt=this.g.ya(),$e=this.g.ca();if(!(ge<3)&&(ge!=3||this.g&&(this.h.h||this.g.la()||ac(this.g)))){this.K||ge!=4||lt==7||(lt==8||$e<=0?mt(3):mt(2)),Er(this);var d=this.g.ca();this.X=d;var f=ah(this);if(this.o=d==200,Be(this.i,this.v,this.B,this.l,this.S,ge,d),this.o){if(this.U&&!this.L){t:{if(this.g){var I,B=this.g;if((I=B.g?B.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!h(I)){var j=I;break t}}j=null}if(o=j)ze(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ir(this,o);else{this.o=!1,this.m=3,Re(12),aa(this),ni(this);break e}}if(this.R){o=!0;let ht;for(;!this.K&&this.C<f.length;)if(ht=ih(this,f),ht==xr){ge==4&&(this.m=4,Re(14),o=!1),ze(this.i,this.l,null,"[Incomplete Response]");break}else if(ht==Ml){this.m=4,Re(15),ze(this.i,this.l,f,"[Invalid Chunk]"),o=!1;break}else ze(this.i,this.l,ht,null),Ir(this,ht);if(Vl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ge!=4||f.length!=0||this.h.h||(this.m=1,Re(16),o=!1),this.o=this.o&&o,!o)ze(this.i,this.l,f,"[Invalid Chunked Response]"),aa(this),ni(this);else if(f.length>0&&!this.W){this.W=!0;var Z=this.j;Z.g==this&&Z.aa&&!Z.P&&(Z.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),Lr(Z),Z.P=!0,Re(11))}}else ze(this.i,this.l,f,null),Ir(this,f);ge==4&&aa(this),this.o&&!this.K&&(ge==4?dc(this.j,this):(this.o=!1,es(this)))}else vh(this.g),d==400&&f.indexOf("Unknown SID")>0?(this.m=3,Re(12)):(this.m=0,Re(13)),aa(this),ni(this)}}}catch{}};function ah(o){if(!Vl(o))return o.g.la();const d=ac(o.g);if(d==="")return"";let f="";const I=d.length,B=An(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return aa(o),ni(o),"";o.h.i=new r.TextDecoder}for(let j=0;j<I;j++)o.h.h=!0,f+=o.h.i.decode(d[j],{stream:!(B&&j==I-1)});return d.length=0,o.h.g+=f,o.C=0,o.h.g}function Vl(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function ih(o,d){var f=o.C,I=d.indexOf(`
`,f);return I==-1?xr:(f=Number(d.substring(f,I)),isNaN(f)?Ml:(I+=1,I+f>d.length?xr:(d=d.slice(I,I+f),o.C=I+f,d)))}In.prototype.cancel=function(){this.K=!0,aa(this)};function es(o){o.T=Date.now()+o.H,Bl(o,o.H)}function Bl(o,d){if(o.D!=null)throw Error("WatchDog timer not null");o.D=kt(u(o.aa,o),d)}function Er(o){o.D&&(r.clearTimeout(o.D),o.D=null)}In.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Bt(this.i,this.B),this.M!=2&&(mt(),Re(17)),aa(this),this.m=2,ni(this)):Bl(this,this.T-o)};function ni(o){o.j.I==0||o.K||dc(o.j,o)}function aa(o){Er(o);var d=o.O;d&&typeof d.dispose=="function"&&d.dispose(),o.O=null,na(o.V),o.g&&(d=o.g,o.g=null,d.abort(),d.dispose())}function Ir(o,d){try{var f=o.j;if(f.I!=0&&(f.g==o||kr(f.h,o))){if(!o.L&&kr(f.h,o)&&f.I==3){try{var I=f.Ba.g.parse(d)}catch{I=null}if(Array.isArray(I)&&I.length==3){var B=I;if(B[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<o.F)rs(f),is(f);else break e;Rr(f),Re(18)}}else f.xa=B[1],0<f.xa-f.K&&B[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=kt(u(f.Va,f),6e3));Ul(f.h)<=1&&f.ta&&(f.ta=void 0)}else sa(f,11)}else if((o.L||f.g==o)&&rs(f),!h(d))for(B=f.Ba.g.parse(d),d=0;d<B.length;d++){let $e=B[d];const ht=$e[0];if(!(ht<=f.K))if(f.K=ht,$e=$e[1],f.I==2)if($e[0]=="c"){f.M=$e[1],f.ba=$e[2];const Jt=$e[3];Jt!=null&&(f.ka=Jt,f.j.info("VER="+f.ka));const ra=$e[4];ra!=null&&(f.za=ra,f.j.info("SVER="+f.za));const Cn=$e[5];Cn!=null&&typeof Cn=="number"&&Cn>0&&(I=1.5*Cn,f.O=I,f.j.info("backChannelRequestTimeoutMs_="+I)),I=f;const Sn=o.g;if(Sn){const ls=Sn.g?Sn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ls){var j=I.h;j.g||ls.indexOf("spdy")==-1&&ls.indexOf("quic")==-1&&ls.indexOf("h2")==-1||(j.j=j.l,j.g=new Set,j.h&&(Tr(j,j.h),j.h=null))}if(I.G){const $r=Sn.g?Sn.g.getResponseHeader("X-HTTP-Session-Id"):null;$r&&(I.wa=$r,Ve(I.J,I.G,$r))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-o.F,f.j.info("Handshake RTT: "+f.T+"ms")),I=f;var Z=o;if(I.na=mc(I,I.L?I.ba:null,I.W),Z.L){jl(I.h,Z);var ge=Z,lt=I.O;lt&&(ge.H=lt),ge.D&&(Er(ge),es(ge)),I.g=Z}else lc(I);f.i.length>0&&ss(f)}else $e[0]!="stop"&&$e[0]!="close"||sa(f,7);else f.I==3&&($e[0]=="stop"||$e[0]=="close"?$e[0]=="stop"?sa(f,7):Pr(f):$e[0]!="noop"&&f.l&&f.l.qa($e),f.A=0)}}mt(4)}catch{}}var sh=class{constructor(o,d){this.g=o,this.map=d}};function zl(o){this.l=o||10,r.PerformanceNavigationTiming?(o=r.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(r.chrome&&r.chrome.loadTimes&&r.chrome.loadTimes()&&r.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Fl(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ul(o){return o.h?1:o.g?o.g.size:0}function kr(o,d){return o.h?o.h==d:o.g?o.g.has(d):!1}function Tr(o,d){o.g?o.g.add(d):o.h=d}function jl(o,d){o.h&&o.h==d?o.h=null:o.g&&o.g.has(d)&&o.g.delete(d)}zl.prototype.cancel=function(){if(this.i=ql(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ql(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let d=o.i;for(const f of o.g.values())d=d.concat(f.G);return d}return P(o.i)}var Hl=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function rh(o,d){if(o){o=o.split("&");for(let f=0;f<o.length;f++){const I=o[f].indexOf("=");let B,j=null;I>=0?(B=o[f].substring(0,I),j=o[f].substring(I+1)):B=o[f],d(B,j?decodeURIComponent(j.replace(/\+/g," ")):"")}}}function kn(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let d;o instanceof kn?(this.l=o.l,ai(this,o.j),this.o=o.o,this.g=o.g,ii(this,o.u),this.h=o.h,Ar(this,Jl(o.i)),this.m=o.m):o&&(d=String(o).match(Hl))?(this.l=!1,ai(this,d[1]||"",!0),this.o=si(d[2]||""),this.g=si(d[3]||"",!0),ii(this,d[4]),this.h=si(d[5]||"",!0),Ar(this,d[6]||"",!0),this.m=si(d[7]||"")):(this.l=!1,this.i=new oi(null,this.l))}kn.prototype.toString=function(){const o=[];var d=this.j;d&&o.push(ri(d,Wl,!0),":");var f=this.g;return(f||d=="file")&&(o.push("//"),(d=this.o)&&o.push(ri(d,Wl,!0),"@"),o.push(ti(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&o.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&o.push("/"),o.push(ri(f,f.charAt(0)=="/"?ch:lh,!0))),(f=this.i.toString())&&o.push("?",f),(f=this.m)&&o.push("#",ri(f,uh)),o.join("")},kn.prototype.resolve=function(o){const d=Yt(this);let f=!!o.j;f?ai(d,o.j):f=!!o.o,f?d.o=o.o:f=!!o.g,f?d.g=o.g:f=o.u!=null;var I=o.h;if(f)ii(d,o.u);else if(f=!!o.h){if(I.charAt(0)!="/")if(this.g&&!this.h)I="/"+I;else{var B=d.h.lastIndexOf("/");B!=-1&&(I=d.h.slice(0,B+1)+I)}if(B=I,B==".."||B==".")I="";else if(B.indexOf("./")!=-1||B.indexOf("/.")!=-1){I=B.lastIndexOf("/",0)==0,B=B.split("/");const j=[];for(let Z=0;Z<B.length;){const ge=B[Z++];ge=="."?I&&Z==B.length&&j.push(""):ge==".."?((j.length>1||j.length==1&&j[0]!="")&&j.pop(),I&&Z==B.length&&j.push("")):(j.push(ge),I=!0)}I=j.join("/")}else I=B}return f?d.h=I:f=o.i.toString()!=="",f?Ar(d,Jl(o.i)):f=!!o.m,f&&(d.m=o.m),d};function Yt(o){return new kn(o)}function ai(o,d,f){o.j=f?si(d,!0):d,o.j&&(o.j=o.j.replace(/:$/,""))}function ii(o,d){if(d){if(d=Number(d),isNaN(d)||d<0)throw Error("Bad port number "+d);o.u=d}else o.u=null}function Ar(o,d,f){d instanceof oi?(o.i=d,ph(o.i,o.l)):(f||(d=ri(d,dh)),o.i=new oi(d,o.l))}function Ve(o,d,f){o.i.set(d,f)}function ts(o){return Ve(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function si(o,d){return o?d?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ri(o,d,f){return typeof o=="string"?(o=encodeURI(o).replace(d,oh),f&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function oh(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Wl=/[#\/\?@]/g,lh=/[#\?:]/g,ch=/[#\?]/g,dh=/[#\?@]/g,uh=/#/g;function oi(o,d){this.h=this.g=null,this.i=o||null,this.j=!!d}function ia(o){o.g||(o.g=new Map,o.h=0,o.i&&rh(o.i,function(d,f){o.add(decodeURIComponent(d.replace(/\+/g," ")),f)}))}n=oi.prototype,n.add=function(o,d){ia(this),this.i=null,o=Ca(this,o);let f=this.g.get(o);return f||this.g.set(o,f=[]),f.push(d),this.h+=1,this};function Gl(o,d){ia(o),d=Ca(o,d),o.g.has(d)&&(o.i=null,o.h-=o.g.get(d).length,o.g.delete(d))}function Kl(o,d){return ia(o),d=Ca(o,d),o.g.has(d)}n.forEach=function(o,d){ia(this),this.g.forEach(function(f,I){f.forEach(function(B){o.call(d,B,I,this)},this)},this)};function Ql(o,d){ia(o);let f=[];if(typeof d=="string")Kl(o,d)&&(f=f.concat(o.g.get(Ca(o,d))));else for(o=Array.from(o.g.values()),d=0;d<o.length;d++)f=f.concat(o[d]);return f}n.set=function(o,d){return ia(this),this.i=null,o=Ca(this,o),Kl(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[d]),this.h+=1,this},n.get=function(o,d){return o?(o=Ql(this,o),o.length>0?String(o[0]):d):d};function Yl(o,d,f){Gl(o,d),f.length>0&&(o.i=null,o.g.set(Ca(o,d),P(f)),o.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],d=Array.from(this.g.keys());for(let I=0;I<d.length;I++){var f=d[I];const B=ti(f);f=Ql(this,f);for(let j=0;j<f.length;j++){let Z=B;f[j]!==""&&(Z+="="+ti(f[j])),o.push(Z)}}return this.i=o.join("&")};function Jl(o){const d=new oi;return d.i=o.i,o.g&&(d.g=new Map(o.g),d.h=o.h),d}function Ca(o,d){return d=String(d),o.j&&(d=d.toLowerCase()),d}function ph(o,d){d&&!o.j&&(ia(o),o.i=null,o.g.forEach(function(f,I){const B=I.toLowerCase();I!=B&&(Gl(this,I),Yl(this,B,f))},o)),o.j=d}function mh(o,d){const f=new Ge;if(r.Image){const I=new Image;I.onload=g(Tn,f,"TestLoadImage: loaded",!0,d,I),I.onerror=g(Tn,f,"TestLoadImage: error",!1,d,I),I.onabort=g(Tn,f,"TestLoadImage: abort",!1,d,I),I.ontimeout=g(Tn,f,"TestLoadImage: timeout",!1,d,I),r.setTimeout(function(){I.ontimeout&&I.ontimeout()},1e4),I.src=o}else d(!1)}function hh(o,d){const f=new Ge,I=new AbortController,B=setTimeout(()=>{I.abort(),Tn(f,"TestPingServer: timeout",!1,d)},1e4);fetch(o,{signal:I.signal}).then(j=>{clearTimeout(B),j.ok?Tn(f,"TestPingServer: ok",!0,d):Tn(f,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(B),Tn(f,"TestPingServer: error",!1,d)})}function Tn(o,d,f,I,B){try{B&&(B.onload=null,B.onerror=null,B.onabort=null,B.ontimeout=null),I(f)}catch{}}function fh(){this.g=new $}function Cr(o){this.i=o.Sb||null,this.h=o.ab||!1}x(Cr,U),Cr.prototype.g=function(){return new ns(this.i,this.h)};function ns(o,d){be.call(this),this.H=o,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}x(ns,be),n=ns.prototype,n.open=function(o,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=d,this.readyState=1,ci(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const d={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(d.body=o),(this.H||r).fetch(new Request(this.D,d)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,li(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ci(this)),this.g&&(this.readyState=3,ci(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof r.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Xl(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Xl(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var d=o.value?o.value:new Uint8Array(0);(d=this.B.decode(d,{stream:!o.done}))&&(this.response=this.responseText+=d)}o.done?li(this):ci(this),this.readyState==3&&Xl(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,li(this))},n.Na=function(o){this.g&&(this.response=o,li(this))},n.ga=function(){this.g&&li(this)};function li(o){o.readyState=4,o.l=null,o.j=null,o.B=null,ci(o)}n.setRequestHeader=function(o,d){this.A.append(o,d)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],d=this.h.entries();for(var f=d.next();!f.done;)f=f.value,o.push(f[0]+": "+f[1]),f=d.next();return o.join(`\r
`)};function ci(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ns.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Zl(o){let d="";return q(o,function(f,I){d+=I,d+=":",d+=f,d+=`\r
`}),d}function Sr(o,d,f){e:{for(I in f){var I=!1;break e}I=!0}I||(f=Zl(f),typeof o=="string"?f!=null&&ti(f):Ve(o,d,f))}function Ke(o){be.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}x(Ke,be);var gh=/^https?$/i,yh=["POST","PUT"];n=Ke.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,d,f,I){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);d=d?d.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():gt.g(),this.g.onreadystatechange=v(u(this.Ca,this));try{this.B=!0,this.g.open(d,String(o),!0),this.B=!1}catch(j){ec(this,j);return}if(o=f||"",f=new Map(this.headers),I)if(Object.getPrototypeOf(I)===Object.prototype)for(var B in I)f.set(B,I[B]);else if(typeof I.keys=="function"&&typeof I.get=="function")for(const j of I.keys())f.set(j,I.get(j));else throw Error("Unknown input type for opt_headers: "+String(I));I=Array.from(f.keys()).find(j=>j.toLowerCase()=="content-type"),B=r.FormData&&o instanceof r.FormData,!(Array.prototype.indexOf.call(yh,d,void 0)>=0)||I||B||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[j,Z]of f)this.g.setRequestHeader(j,Z);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(j){ec(this,j)}};function ec(o,d){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=d,o.o=5,tc(o),as(o)}function tc(o){o.A||(o.A=!0,_e(o,"complete"),_e(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,_e(this,"complete"),_e(this,"abort"),as(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),as(this,!0)),Ke.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?nc(this):this.Xa())},n.Xa=function(){nc(this)};function nc(o){if(o.h&&typeof s<"u"){if(o.v&&An(o)==4)setTimeout(o.Ca.bind(o),0);else if(_e(o,"readystatechange"),An(o)==4){o.h=!1;try{const j=o.ca();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var f;if(!(f=d)){var I;if(I=j===0){let Z=String(o.D).match(Hl)[1]||null;!Z&&r.self&&r.self.location&&(Z=r.self.location.protocol.slice(0,-1)),I=!gh.test(Z?Z.toLowerCase():"")}f=I}if(f)_e(o,"complete"),_e(o,"success");else{o.o=6;try{var B=An(o)>2?o.g.statusText:""}catch{B=""}o.l=B+" ["+o.ca()+"]",tc(o)}}finally{as(o)}}}}function as(o,d){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const f=o.g;o.g=null,d||_e(o,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function An(o){return o.g?o.g.readyState:0}n.ca=function(){try{return An(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var d=this.g.responseText;return o&&d.indexOf(o)==0&&(d=d.substring(o.length)),F(d)}};function ac(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function vh(o){const d={};o=(o.g&&An(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let I=0;I<o.length;I++){if(h(o[I]))continue;var f=nh(o[I]);const B=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const j=d[B]||[];d[B]=j,j.push(f)}J(d,function(I){return I.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function di(o,d,f){return f&&f.internalChannelParams&&f.internalChannelParams[o]||d}function ic(o){this.za=0,this.i=[],this.j=new Ge,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=di("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=di("baseRetryDelayMs",5e3,o),this.Za=di("retryDelaySeedMs",1e4,o),this.Ta=di("forwardChannelMaxRetries",2,o),this.va=di("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new zl(o&&o.concurrentRequestLimit),this.Ba=new fh,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=ic.prototype,n.ka=8,n.I=1,n.connect=function(o,d,f,I){Re(0),this.W=o,this.H=d||{},f&&I!==void 0&&(this.H.OSID=f,this.H.OAID=I),this.F=this.X,this.J=mc(this,null,this.W),ss(this)};function Pr(o){if(sc(o),o.I==3){var d=o.V++,f=Yt(o.J);if(Ve(f,"SID",o.M),Ve(f,"RID",d),Ve(f,"TYPE","terminate"),ui(o,f),d=new In(o,o.j,d),d.M=2,d.A=ts(Yt(f)),f=!1,r.navigator&&r.navigator.sendBeacon)try{f=r.navigator.sendBeacon(d.A.toString(),"")}catch{}!f&&r.Image&&(new Image().src=d.A,f=!0),f||(d.g=hc(d.j,null),d.g.ea(d.A)),d.F=Date.now(),es(d)}pc(o)}function is(o){o.g&&(Lr(o),o.g.cancel(),o.g=null)}function sc(o){is(o),o.v&&(r.clearTimeout(o.v),o.v=null),rs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&r.clearTimeout(o.m),o.m=null)}function ss(o){if(!Fl(o.h)&&!o.m){o.m=!0;var d=o.Ea;R||m(),M||(R(),M=!0),p.add(d,o),o.D=0}}function bh(o,d){return Ul(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=d.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=kt(u(o.Ea,o,d),uc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const B=new In(this,this.j,o);let j=this.o;if(this.U&&(j?(j=X(j),de(j,this.U)):j=this.U),this.u!==null||this.R||(B.J=j,j=null),this.S)e:{for(var d=0,f=0;f<this.i.length;f++){t:{var I=this.i[f];if("__data__"in I.map&&(I=I.map.__data__,typeof I=="string")){I=I.length;break t}I=void 0}if(I===void 0)break;if(d+=I,d>4096){d=f;break e}if(d===4096||f===this.i.length-1){d=f+1;break e}}d=1e3}else d=1e3;d=oc(this,B,d),f=Yt(this.J),Ve(f,"RID",o),Ve(f,"CVER",22),this.G&&Ve(f,"X-HTTP-Session-Id",this.G),ui(this,f),j&&(this.R?d="headers="+ti(Zl(j))+"&"+d:this.u&&Sr(f,this.u,j)),Tr(this.h,B),this.Ra&&Ve(f,"TYPE","init"),this.S?(Ve(f,"$req",d),Ve(f,"SID","null"),B.U=!0,_r(B,f,null)):_r(B,f,d),this.I=2}}else this.I==3&&(o?rc(this,o):this.i.length==0||Fl(this.h)||rc(this))};function rc(o,d){var f;d?f=d.l:f=o.V++;const I=Yt(o.J);Ve(I,"SID",o.M),Ve(I,"RID",f),Ve(I,"AID",o.K),ui(o,I),o.u&&o.o&&Sr(I,o.u,o.o),f=new In(o,o.j,f,o.D+1),o.u===null&&(f.J=o.o),d&&(o.i=d.G.concat(o.i)),d=oc(o,f,1e3),f.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Tr(o.h,f),_r(f,I,d)}function ui(o,d){o.H&&q(o.H,function(f,I){Ve(d,I,f)}),o.l&&q({},function(f,I){Ve(d,I,f)})}function oc(o,d,f){f=Math.min(o.i.length,f);const I=o.l?u(o.l.Ka,o.l,o):null;e:{var B=o.i;let ge=-1;for(;;){const lt=["count="+f];ge==-1?f>0?(ge=B[0].g,lt.push("ofs="+ge)):ge=0:lt.push("ofs="+ge);let $e=!0;for(let ht=0;ht<f;ht++){var j=B[ht].g;const Jt=B[ht].map;if(j-=ge,j<0)ge=Math.max(0,B[ht].g-100),$e=!1;else try{j="req"+j+"_"||"";try{var Z=Jt instanceof Map?Jt:Object.entries(Jt);for(const[ra,Cn]of Z){let Sn=Cn;l(Cn)&&(Sn=ei(Cn)),lt.push(j+ra+"="+encodeURIComponent(Sn))}}catch(ra){throw lt.push(j+"type="+encodeURIComponent("_badmap")),ra}}catch{I&&I(Jt)}}if($e){Z=lt.join("&");break e}}Z=void 0}return o=o.i.splice(0,f),d.G=o,Z}function lc(o){if(!o.g&&!o.v){o.Y=1;var d=o.Da;R||m(),M||(R(),M=!0),p.add(d,o),o.A=0}}function Rr(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=kt(u(o.Da,o),uc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,cc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=kt(u(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Re(10),is(this),cc(this))};function Lr(o){o.B!=null&&(r.clearTimeout(o.B),o.B=null)}function cc(o){o.g=new In(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var d=Yt(o.na);Ve(d,"RID","rpc"),Ve(d,"SID",o.M),Ve(d,"AID",o.K),Ve(d,"CI",o.F?"0":"1"),!o.F&&o.ia&&Ve(d,"TO",o.ia),Ve(d,"TYPE","xmlhttp"),ui(o,d),o.u&&o.o&&Sr(d,o.u,o.o),o.O&&(o.g.H=o.O);var f=o.g;o=o.ba,f.M=1,f.A=ts(Yt(d)),f.u=null,f.R=!0,Ol(f,o)}n.Va=function(){this.C!=null&&(this.C=null,is(this),Rr(this),Re(19))};function rs(o){o.C!=null&&(r.clearTimeout(o.C),o.C=null)}function dc(o,d){var f=null;if(o.g==d){rs(o),Lr(o),o.g=null;var I=2}else if(kr(o.h,d))f=d.G,jl(o.h,d),I=1;else return;if(o.I!=0){if(d.o)if(I==1){f=d.u?d.u.length:0,d=Date.now()-d.F;var B=o.D;I=We(),_e(I,new Lt(I,f)),ss(o)}else lc(o);else if(B=d.m,B==3||B==0&&d.X>0||!(I==1&&bh(o,d)||I==2&&Rr(o)))switch(f&&f.length>0&&(d=o.h,d.i=d.i.concat(f)),B){case 1:sa(o,5);break;case 4:sa(o,10);break;case 3:sa(o,6);break;default:sa(o,2)}}}function uc(o,d){let f=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(f*=2),f*d}function sa(o,d){if(o.j.info("Error code "+d),d==2){var f=u(o.bb,o),I=o.Ua;const B=!I;I=new kn(I||"//www.google.com/images/cleardot.gif"),r.location&&r.location.protocol=="http"||ai(I,"https"),ts(I),B?mh(I.toString(),f):hh(I.toString(),f)}else Re(2);o.I=0,o.l&&o.l.pa(d),pc(o),sc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function pc(o){if(o.I=0,o.ja=[],o.l){const d=ql(o.h);(d.length!=0||o.i.length!=0)&&(N(o.ja,d),N(o.ja,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.oa()}}function mc(o,d,f){var I=f instanceof kn?Yt(f):new kn(f);if(I.g!="")d&&(I.g=d+"."+I.g),ii(I,I.u);else{var B=r.location;I=B.protocol,d=d?d+"."+B.hostname:B.hostname,B=+B.port;const j=new kn(null);I&&ai(j,I),d&&(j.g=d),B&&ii(j,B),f&&(j.h=f),I=j}return f=o.G,d=o.wa,f&&d&&Ve(I,f,d),Ve(I,"VER",o.ka),ui(o,I),I}function hc(o,d,f){if(d&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return d=o.Aa&&!o.ma?new Ke(new Cr({ab:f})):new Ke(o.ma),d.Fa(o.L),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function fc(){}n=fc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function os(){}os.prototype.g=function(o,d){return new $t(o,d)};function $t(o,d){be.call(this),this.g=new ic(d),this.l=o,this.h=d&&d.messageUrlParams||null,o=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(o?o["X-WebChannel-Content-Type"]=d.messageContentType:o={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.sa&&(o?o["X-WebChannel-Client-Profile"]=d.sa:o={"X-WebChannel-Client-Profile":d.sa}),this.g.U=o,(o=d&&d.Qb)&&!h(o)&&(this.g.u=o),this.A=d&&d.supportsCrossDomainXhr||!1,this.v=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!h(d)&&(this.g.G=d,o=this.h,o!==null&&d in o&&(o=this.h,d in o&&delete o[d])),this.j=new Sa(this)}x($t,be),$t.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},$t.prototype.close=function(){Pr(this.g)},$t.prototype.o=function(o){var d=this.g;if(typeof o=="string"){var f={};f.__data__=o,o=f}else this.v&&(f={},f.__data__=ei(o),o=f);d.i.push(new sh(d.Ya++,o)),d.I==3&&ss(d)},$t.prototype.N=function(){this.g.l=null,delete this.j,Pr(this.g),delete this.g,$t.Z.N.call(this)};function gc(o){te.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var d=o.__sm__;if(d){e:{for(const f in d){o=f;break e}o=void 0}(this.i=o)&&(o=this.i,d=d!==null&&o in d?d[o]:void 0),this.data=d}else this.data=o}x(gc,te);function yc(){ie.call(this),this.status=1}x(yc,ie);function Sa(o){this.g=o}x(Sa,fc),Sa.prototype.ra=function(){_e(this.g,"a")},Sa.prototype.qa=function(o){_e(this.g,new gc(o))},Sa.prototype.pa=function(o){_e(this.g,new yc)},Sa.prototype.oa=function(){_e(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,$t.prototype.send=$t.prototype.o,$t.prototype.open=$t.prototype.m,$t.prototype.close=$t.prototype.close,dp=function(){return new os},cp=function(){return We()},lp=we,lo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ze.NO_ERROR=0,Ze.TIMEOUT=8,Ze.HTTP_ERROR=6,Es=Ze,ot.COMPLETE="complete",op=ot,Q.EventType=W,W.OPEN="a",W.CLOSE="b",W.ERROR="c",W.MESSAGE="d",be.prototype.listen=be.prototype.J,bi=Q,Ke.prototype.listenOnce=Ke.prototype.K,Ke.prototype.getLastError=Ke.prototype.Ha,Ke.prototype.getLastErrorCode=Ke.prototype.ya,Ke.prototype.getStatus=Ke.prototype.ca,Ke.prototype.getResponseJson=Ke.prototype.La,Ke.prototype.getResponseText=Ke.prototype.la,Ke.prototype.send=Ke.prototype.ea,Ke.prototype.setWithCredentials=Ke.prototype.Fa,rp=Ke}).apply(typeof ds<"u"?ds:typeof self<"u"?self:typeof window<"u"?window:{});class xt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}xt.UNAUTHENTICATED=new xt(null),xt.GOOGLE_CREDENTIALS=new xt("google-credentials-uid"),xt.FIRST_PARTY=new xt("first-party-uid"),xt.MOCK_USER=new xt("mock-user");let Qa="12.9.0";function xv(n){Qa=n}const va=new So("@firebase/firestore");function La(){return va.logLevel}function ne(n,...e){if(va.logLevel<=Ee.DEBUG){const t=e.map(Uo);va.debug(`Firestore (${Qa}): ${n}`,...t)}}function bn(n,...e){if(va.logLevel<=Ee.ERROR){const t=e.map(Uo);va.error(`Firestore (${Qa}): ${n}`,...t)}}function ba(n,...e){if(va.logLevel<=Ee.WARN){const t=e.map(Uo);va.warn(`Firestore (${Qa}): ${n}`,...t)}}function Uo(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}function ce(n,e,t){let a="Unexpected state";typeof e=="string"?a=e:t=e,up(n,a,t)}function up(n,e,t){let a=`FIRESTORE (${Qa}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{a+=" CONTEXT: "+JSON.stringify(t)}catch{a+=" CONTEXT: "+t}throw bn(a),new Error(a)}function Pe(n,e,t,a){let i="Unexpected state";typeof t=="string"?i=t:a=t,n||up(e,i,a)}function me(n,e){return n}const K={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ee extends ln{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}class hn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}class pp{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class _v{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(xt.UNAUTHENTICATED)))}shutdown(){}}class Ev{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Iv{constructor(e){this.t=e,this.currentUser=xt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Pe(this.o===void 0,42304);let a=this.i;const i=c=>this.i!==a?(a=this.i,t(c)):Promise.resolve();let s=new hn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new hn,e.enqueueRetryable((()=>i(this.currentUser)))};const r=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},l=c=>{ne("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),r())};this.t.onInit((c=>l(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(ne("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new hn)}}),0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((a=>this.i!==e?(ne("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):a?(Pe(typeof a.accessToken=="string",31837,{l:a}),new pp(a.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Pe(e===null||typeof e=="string",2055,{h:e}),new xt(e)}}class kv{constructor(e,t,a){this.P=e,this.T=t,this.I=a,this.type="FirstParty",this.user=xt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Tv{constructor(e,t,a){this.P=e,this.T=t,this.I=a}getToken(){return Promise.resolve(new kv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(xt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Yc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Av{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Nt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Pe(this.o===void 0,3512);const a=s=>{s.error!=null&&ne("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const r=s.token!==this.m;return this.m=s.token,ne("FirebaseAppCheckTokenProvider",`Received ${r?"new":"existing"} token.`),r?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>a(s)))};const i=s=>{ne("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):ne("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Yc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(Pe(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Yc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function Cv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let a=0;a<n;a++)t[a]=Math.floor(256*Math.random());return t}class jo{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let a="";for(;a.length<20;){const i=Cv(40);for(let s=0;s<i.length;++s)a.length<20&&i[s]<t&&(a+=e.charAt(i[s]%62))}return a}}function Ie(n,e){return n<e?-1:n>e?1:0}function co(n,e){const t=Math.min(n.length,e.length);for(let a=0;a<t;a++){const i=n.charAt(a),s=e.charAt(a);if(i!==s)return Fr(i)===Fr(s)?Ie(i,s):Fr(i)?1:-1}return Ie(n.length,e.length)}const Sv=55296,Pv=57343;function Fr(n){const e=n.charCodeAt(0);return e>=Sv&&e<=Pv}function ja(n,e,t){return n.length===e.length&&n.every(((a,i)=>t(a,e[i])))}const Jc="__name__";class Xt{constructor(e,t,a){t===void 0?t=0:t>e.length&&ce(637,{offset:t,range:e.length}),a===void 0?a=e.length-t:a>e.length-t&&ce(1746,{length:a,range:e.length-t}),this.segments=e,this.offset=t,this.len=a}get length(){return this.len}isEqual(e){return Xt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Xt?e.forEach((a=>{t.push(a)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,a=this.limit();t<a;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const a=Math.min(e.length,t.length);for(let i=0;i<a;i++){const s=Xt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return Ie(e.length,t.length)}static compareSegments(e,t){const a=Xt.isNumericId(e),i=Xt.isNumericId(t);return a&&!i?-1:!a&&i?1:a&&i?Xt.extractNumericId(e).compare(Xt.extractNumericId(t)):co(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bn.fromString(e.substring(4,e.length-2))}}class Me extends Xt{construct(e,t,a){return new Me(e,t,a)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const a of e){if(a.indexOf("//")>=0)throw new ee(K.INVALID_ARGUMENT,`Invalid segment (${a}). Paths must not contain // in them.`);t.push(...a.split("/").filter((i=>i.length>0)))}return new Me(t)}static emptyPath(){return new Me([])}}const Rv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class vt extends Xt{construct(e,t,a){return new vt(e,t,a)}static isValidIdentifier(e){return Rv.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),vt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Jc}static keyField(){return new vt([Jc])}static fromServerFormat(e){const t=[];let a="",i=0;const s=()=>{if(a.length===0)throw new ee(K.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(a),a=""};let r=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new ee(K.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new ee(K.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);a+=c,i+=2}else l==="`"?(r=!r,i++):l!=="."||r?(a+=l,i++):(s(),i++)}if(s(),r)throw new ee(K.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new vt(t)}static emptyPath(){return new vt([])}}class re{constructor(e){this.path=e}static fromPath(e){return new re(Me.fromString(e))}static fromName(e){return new re(Me.fromString(e).popFirst(5))}static empty(){return new re(Me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new re(new Me(e.slice()))}}function mp(n,e,t){if(!t)throw new ee(K.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Lv(n,e,t,a){if(e===!0&&a===!0)throw new ee(K.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Xc(n){if(!re.isDocumentKey(n))throw new ee(K.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Zc(n){if(re.isDocumentKey(n))throw new ee(K.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function hp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function tr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(a){return a.constructor?a.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ce(12329,{type:typeof n})}function Rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new ee(K.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=tr(n);throw new ee(K.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function it(n,e){const t={typeString:n};return e&&(t.value=e),t}function Ki(n,e){if(!hp(n))throw new ee(K.INVALID_ARGUMENT,"JSON must be an object");let t;for(const a in e)if(e[a]){const i=e[a].typeString,s="value"in e[a]?{value:e[a].value}:void 0;if(!(a in n)){t=`JSON missing required field: '${a}'`;break}const r=n[a];if(i&&typeof r!==i){t=`JSON field '${a}' must be a ${i}.`;break}if(s!==void 0&&r!==s.value){t=`Expected '${a}' field to equal '${s.value}'`;break}}if(t)throw new ee(K.INVALID_ARGUMENT,t);return!0}const ed=-62135596800,td=1e6;class ye{static now(){return ye.fromMillis(Date.now())}static fromDate(e){return ye.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),a=Math.floor((e-1e3*t)*td);return new ye(t,a)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new ee(K.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new ee(K.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ed)throw new ee(K.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ee(K.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/td}_compareTo(e){return this.seconds===e.seconds?Ie(this.nanoseconds,e.nanoseconds):Ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ye._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ki(e,ye._jsonSchema))return new ye(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ed;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ye._jsonSchemaVersion="firestore/timestamp/1.0",ye._jsonSchema={type:it("string",ye._jsonSchemaVersion),seconds:it("number"),nanoseconds:it("number")};class ue{static fromTimestamp(e){return new ue(e)}static min(){return new ue(new ye(0,0))}static max(){return new ue(new ye(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}const Di=-1;function $v(n,e){const t=n.toTimestamp().seconds,a=n.toTimestamp().nanoseconds+1,i=ue.fromTimestamp(a===1e9?new ye(t+1,0):new ye(t,a));return new qn(i,re.empty(),e)}function Dv(n){return new qn(n.readTime,n.key,Di)}class qn{constructor(e,t,a){this.readTime=e,this.documentKey=t,this.largestBatchId=a}static min(){return new qn(ue.min(),re.empty(),Di)}static max(){return new qn(ue.max(),re.empty(),Di)}}function Nv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=re.comparator(n.documentKey,e.documentKey),t!==0?t:Ie(n.largestBatchId,e.largestBatchId))}const Mv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ov{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}async function Ya(n){if(n.code!==K.FAILED_PRECONDITION||n.message!==Mv)throw n;ne("LocalStore","Unexpectedly lost primary lease")}class Y{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ce(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Y(((a,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(a,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(a,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof Y?t:Y.resolve(t)}catch(t){return Y.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):Y.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):Y.reject(t)}static resolve(e){return new Y(((t,a)=>{t(e)}))}static reject(e){return new Y(((t,a)=>{a(e)}))}static waitFor(e){return new Y(((t,a)=>{let i=0,s=0,r=!1;e.forEach((l=>{++i,l.next((()=>{++s,r&&s===i&&t()}),(c=>a(c)))})),r=!0,s===i&&t()}))}static or(e){let t=Y.resolve(!1);for(const a of e)t=t.next((i=>i?Y.resolve(i):a()));return t}static forEach(e,t){const a=[];return e.forEach(((i,s)=>{a.push(t.call(this,i,s))})),this.waitFor(a)}static mapArray(e,t){return new Y(((a,i)=>{const s=e.length,r=new Array(s);let l=0;for(let c=0;c<s;c++){const u=c;t(e[u]).next((g=>{r[u]=g,++l,l===s&&a(r)}),(g=>i(g)))}}))}static doWhile(e,t){return new Y(((a,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):a()};s()}))}}function Vv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ja(n){return n.name==="IndexedDbTransactionError"}class nr{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=a=>this.ae(a),this.ue=a=>t.writeSequenceNumber(a))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}nr.ce=-1;const qo=-1;function ar(n){return n==null}function Os(n){return n===0&&1/n==-1/0}function Bv(n){return typeof n=="number"&&Number.isInteger(n)&&!Os(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}const fp="";function zv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=nd(e)),e=Fv(n.get(t),e);return nd(e)}function Fv(n,e){let t=e;const a=n.length;for(let i=0;i<a;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case fp:t+="";break;default:t+=s}}return t}function nd(n){return n+fp+""}function ad(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function ea(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function gp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}class je{constructor(e,t){this.comparator=e,this.root=t||yt.EMPTY}insert(e,t){return new je(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,yt.BLACK,null,null))}remove(e){return new je(this.comparator,this.root.remove(e,this.comparator).copy(null,null,yt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const a=this.comparator(e,t.key);if(a===0)return t.value;a<0?t=t.left:a>0&&(t=t.right)}return null}indexOf(e){let t=0,a=this.root;for(;!a.isEmpty();){const i=this.comparator(e,a.key);if(i===0)return t+a.left.size;i<0?a=a.left:(t+=a.left.size+1,a=a.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,a)=>(e(t,a),!1)))}toString(){const e=[];return this.inorderTraversal(((t,a)=>(e.push(`${t}:${a}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new us(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new us(this.root,e,this.comparator,!1)}getReverseIterator(){return new us(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new us(this.root,e,this.comparator,!0)}}class us{constructor(e,t,a,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?a(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class yt{constructor(e,t,a,i,s){this.key=e,this.value=t,this.color=a??yt.RED,this.left=i??yt.EMPTY,this.right=s??yt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,a,i,s){return new yt(e??this.key,t??this.value,a??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,a){let i=this;const s=a(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,a),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,a)),i.fixUp()}removeMin(){if(this.left.isEmpty())return yt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let a,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return yt.EMPTY;a=i.right.min(),i=i.copy(a.key,a.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,yt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,yt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ce(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ce(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ce(27949);return e+(this.isRed()?0:1)}}yt.EMPTY=null,yt.RED=!0,yt.BLACK=!1;yt.EMPTY=new class{constructor(){this.size=0}get key(){throw ce(57766)}get value(){throw ce(16141)}get color(){throw ce(16727)}get left(){throw ce(29726)}get right(){throw ce(36894)}copy(e,t,a,i,s){return this}insert(e,t,a){return new yt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};class dt{constructor(e){this.comparator=e,this.data=new je(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,a)=>(e(t),!1)))}forEachInRange(e,t){const a=this.data.getIteratorFrom(e[0]);for(;a.hasNext();){const i=a.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let a;for(a=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();a.hasNext();)if(!e(a.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new id(this.data.getIterator())}getIteratorFrom(e){return new id(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((a=>{t=t.add(a)})),t}isEqual(e){if(!(e instanceof dt)||this.size!==e.size)return!1;const t=this.data.getIterator(),a=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=a.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new dt(this.comparator);return t.data=e,t}}class id{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}class Mt{constructor(e){this.fields=e,e.sort(vt.comparator)}static empty(){return new Mt([])}unionWith(e){let t=new dt(vt.comparator);for(const a of this.fields)t=t.add(a);for(const a of e)t=t.add(a);return new Mt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ja(this.fields,e.fields,((t,a)=>t.isEqual(a)))}}class yp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}class bt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new yp("Invalid base64 string: "+s):s}})(e);return new bt(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let r=0;r<i.length;++r)s+=String.fromCharCode(i[r]);return s})(e);return new bt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const a=new Uint8Array(t.length);for(let i=0;i<t.length;i++)a[i]=t.charCodeAt(i);return a})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}bt.EMPTY_BYTE_STRING=new bt("");const Uv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Hn(n){if(Pe(!!n,39018),typeof n=="string"){let e=0;const t=Uv.exec(n);if(Pe(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const a=new Date(n);return{seconds:Math.floor(a.getTime()/1e3),nanos:e}}return{seconds:et(n.seconds),nanos:et(n.nanos)}}function et(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Wn(n){return typeof n=="string"?bt.fromBase64String(n):bt.fromUint8Array(n)}const vp="server_timestamp",bp="__type__",wp="__previous_value__",xp="__local_write_time__";function Ho(n){return(n?.mapValue?.fields||{})[bp]?.stringValue===vp}function ir(n){const e=n.mapValue.fields[wp];return Ho(e)?ir(e):e}function Ni(n){const e=Hn(n.mapValue.fields[xp].timestampValue);return new ye(e.seconds,e.nanos)}class jv{constructor(e,t,a,i,s,r,l,c,u,g,x){this.databaseId=e,this.appId=t,this.persistenceKey=a,this.host=i,this.ssl=s,this.forceLongPolling=r,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=g,this.apiKey=x}}const Vs="(default)";class Mi{constructor(e,t){this.projectId=e,this.database=t||Vs}static empty(){return new Mi("","")}get isDefaultDatabase(){return this.database===Vs}isEqual(e){return e instanceof Mi&&e.projectId===this.projectId&&e.database===this.database}}function qv(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new ee(K.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Mi(n.options.projectId,e)}const _p="__type__",Hv="__max__",ps={mapValue:{}},Ep="__vector__",Bs="value";function Gn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ho(n)?4:Gv(n)?9007199254740991:Wv(n)?10:11:ce(28295,{value:n})}function on(n,e){if(n===e)return!0;const t=Gn(n);if(t!==Gn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ni(n).isEqual(Ni(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const r=Hn(i.timestampValue),l=Hn(s.timestampValue);return r.seconds===l.seconds&&r.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return Wn(i.bytesValue).isEqual(Wn(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return et(i.geoPointValue.latitude)===et(s.geoPointValue.latitude)&&et(i.geoPointValue.longitude)===et(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return et(i.integerValue)===et(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const r=et(i.doubleValue),l=et(s.doubleValue);return r===l?Os(r)===Os(l):isNaN(r)&&isNaN(l)}return!1})(n,e);case 9:return ja(n.arrayValue.values||[],e.arrayValue.values||[],on);case 10:case 11:return(function(i,s){const r=i.mapValue.fields||{},l=s.mapValue.fields||{};if(ad(r)!==ad(l))return!1;for(const c in r)if(r.hasOwnProperty(c)&&(l[c]===void 0||!on(r[c],l[c])))return!1;return!0})(n,e);default:return ce(52216,{left:n})}}function Oi(n,e){return(n.values||[]).find((t=>on(t,e)))!==void 0}function qa(n,e){if(n===e)return 0;const t=Gn(n),a=Gn(e);if(t!==a)return Ie(t,a);switch(t){case 0:case 9007199254740991:return 0;case 1:return Ie(n.booleanValue,e.booleanValue);case 2:return(function(s,r){const l=et(s.integerValue||s.doubleValue),c=et(r.integerValue||r.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1})(n,e);case 3:return sd(n.timestampValue,e.timestampValue);case 4:return sd(Ni(n),Ni(e));case 5:return co(n.stringValue,e.stringValue);case 6:return(function(s,r){const l=Wn(s),c=Wn(r);return l.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(s,r){const l=s.split("/"),c=r.split("/");for(let u=0;u<l.length&&u<c.length;u++){const g=Ie(l[u],c[u]);if(g!==0)return g}return Ie(l.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,r){const l=Ie(et(s.latitude),et(r.latitude));return l!==0?l:Ie(et(s.longitude),et(r.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return rd(n.arrayValue,e.arrayValue);case 10:return(function(s,r){const l=s.fields||{},c=r.fields||{},u=l[Bs]?.arrayValue,g=c[Bs]?.arrayValue,x=Ie(u?.values?.length||0,g?.values?.length||0);return x!==0?x:rd(u,g)})(n.mapValue,e.mapValue);case 11:return(function(s,r){if(s===ps.mapValue&&r===ps.mapValue)return 0;if(s===ps.mapValue)return 1;if(r===ps.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),u=r.fields||{},g=Object.keys(u);c.sort(),g.sort();for(let x=0;x<c.length&&x<g.length;++x){const v=co(c[x],g[x]);if(v!==0)return v;const P=qa(l[c[x]],u[g[x]]);if(P!==0)return P}return Ie(c.length,g.length)})(n.mapValue,e.mapValue);default:throw ce(23264,{he:t})}}function sd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Ie(n,e);const t=Hn(n),a=Hn(e),i=Ie(t.seconds,a.seconds);return i!==0?i:Ie(t.nanos,a.nanos)}function rd(n,e){const t=n.values||[],a=e.values||[];for(let i=0;i<t.length&&i<a.length;++i){const s=qa(t[i],a[i]);if(s)return s}return Ie(t.length,a.length)}function Ha(n){return uo(n)}function uo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const a=Hn(t);return`time(${a.seconds},${a.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Wn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return re.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let a="[",i=!0;for(const s of t.values||[])i?i=!1:a+=",",a+=uo(s);return a+"]"})(n.arrayValue):"mapValue"in n?(function(t){const a=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const r of a)s?s=!1:i+=",",i+=`${r}:${uo(t.fields[r])}`;return i+"}"})(n.mapValue):ce(61005,{value:n})}function Is(n){switch(Gn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ir(n);return e?16+Is(e):16;case 5:return 2*n.stringValue.length;case 6:return Wn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(a){return(a.values||[]).reduce(((i,s)=>i+Is(s)),0)})(n.arrayValue);case 10:case 11:return(function(a){let i=0;return ea(a.fields,((s,r)=>{i+=s.length+Is(r)})),i})(n.mapValue);default:throw ce(13486,{value:n})}}function od(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function po(n){return!!n&&"integerValue"in n}function Wo(n){return!!n&&"arrayValue"in n}function ld(n){return!!n&&"nullValue"in n}function cd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ks(n){return!!n&&"mapValue"in n}function Wv(n){return(n?.mapValue?.fields||{})[_p]?.stringValue===Ep}function Ti(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return ea(n.mapValue.fields,((t,a)=>e.mapValue.fields[t]=Ti(a))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ti(n.arrayValue.values[t]);return e}return{...n}}function Gv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Hv}class Pt{constructor(e){this.value=e}static empty(){return new Pt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let a=0;a<e.length-1;++a)if(t=(t.mapValue.fields||{})[e.get(a)],!ks(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ti(t)}setAll(e){let t=vt.emptyPath(),a={},i=[];e.forEach(((r,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,a,i),a={},i=[],t=l.popLast()}r?a[l.lastSegment()]=Ti(r):i.push(l.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,a,i)}delete(e){const t=this.field(e.popLast());ks(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return on(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let a=0;a<e.length;++a){let i=t.mapValue.fields[e.get(a)];ks(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(a)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,a){ea(t,((i,s)=>e[i]=s));for(const i of a)delete e[i]}clone(){return new Pt(Ti(this.value))}}function Ip(n){const e=[];return ea(n.fields,((t,a)=>{const i=new vt([t]);if(ks(a)){const s=Ip(a.mapValue).fields;if(s.length===0)e.push(i);else for(const r of s)e.push(i.child(r))}else e.push(i)})),new Mt(e)}class _t{constructor(e,t,a,i,s,r,l){this.key=e,this.documentType=t,this.version=a,this.readTime=i,this.createTime=s,this.data=r,this.documentState=l}static newInvalidDocument(e){return new _t(e,0,ue.min(),ue.min(),ue.min(),Pt.empty(),0)}static newFoundDocument(e,t,a,i){return new _t(e,1,t,ue.min(),a,i,0)}static newNoDocument(e,t){return new _t(e,2,t,ue.min(),ue.min(),Pt.empty(),0)}static newUnknownDocument(e,t){return new _t(e,3,t,ue.min(),ue.min(),Pt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ue.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ue.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof _t&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}class zs{constructor(e,t){this.position=e,this.inclusive=t}}function dd(n,e,t){let a=0;for(let i=0;i<n.position.length;i++){const s=e[i],r=n.position[i];if(s.field.isKeyField()?a=re.comparator(re.fromName(r.referenceValue),t.key):a=qa(r,t.data.field(s.field)),s.dir==="desc"&&(a*=-1),a!==0)break}return a}function ud(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!on(n.position[t],e.position[t]))return!1;return!0}class Vi{constructor(e,t="asc"){this.field=e,this.dir=t}}function Kv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}class kp{}class at extends kp{constructor(e,t,a){super(),this.field=e,this.op=t,this.value=a}static create(e,t,a){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,a):new Yv(e,t,a):t==="array-contains"?new Zv(e,a):t==="in"?new eb(e,a):t==="not-in"?new tb(e,a):t==="array-contains-any"?new nb(e,a):new at(e,t,a)}static createKeyFieldInFilter(e,t,a){return t==="in"?new Jv(e,a):new Xv(e,a)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(qa(t,this.value)):t!==null&&Gn(this.value)===Gn(t)&&this.matchesComparison(qa(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ce(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Kt extends kp{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Kt(e,t)}matches(e){return Tp(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Tp(n){return n.op==="and"}function Ap(n){return Qv(n)&&Tp(n)}function Qv(n){for(const e of n.filters)if(e instanceof Kt)return!1;return!0}function mo(n){if(n instanceof at)return n.field.canonicalString()+n.op.toString()+Ha(n.value);if(Ap(n))return n.filters.map((e=>mo(e))).join(",");{const e=n.filters.map((t=>mo(t))).join(",");return`${n.op}(${e})`}}function Cp(n,e){return n instanceof at?(function(a,i){return i instanceof at&&a.op===i.op&&a.field.isEqual(i.field)&&on(a.value,i.value)})(n,e):n instanceof Kt?(function(a,i){return i instanceof Kt&&a.op===i.op&&a.filters.length===i.filters.length?a.filters.reduce(((s,r,l)=>s&&Cp(r,i.filters[l])),!0):!1})(n,e):void ce(19439)}function Sp(n){return n instanceof at?(function(t){return`${t.field.canonicalString()} ${t.op} ${Ha(t.value)}`})(n):n instanceof Kt?(function(t){return t.op.toString()+" {"+t.getFilters().map(Sp).join(" ,")+"}"})(n):"Filter"}class Yv extends at{constructor(e,t,a){super(e,t,a),this.key=re.fromName(a.referenceValue)}matches(e){const t=re.comparator(e.key,this.key);return this.matchesComparison(t)}}class Jv extends at{constructor(e,t){super(e,"in",t),this.keys=Pp("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Xv extends at{constructor(e,t){super(e,"not-in",t),this.keys=Pp("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Pp(n,e){return(e.arrayValue?.values||[]).map((t=>re.fromName(t.referenceValue)))}class Zv extends at{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wo(t)&&Oi(t.arrayValue,this.value)}}class eb extends at{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Oi(this.value.arrayValue,t)}}class tb extends at{constructor(e,t){super(e,"not-in",t)}matches(e){if(Oi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Oi(this.value.arrayValue,t)}}class nb extends at{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((a=>Oi(this.value.arrayValue,a)))}}class ab{constructor(e,t=null,a=[],i=[],s=null,r=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=a,this.filters=i,this.limit=s,this.startAt=r,this.endAt=l,this.Te=null}}function pd(n,e=null,t=[],a=[],i=null,s=null,r=null){return new ab(n,e,t,a,i,s,r)}function Go(n){const e=me(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((a=>mo(a))).join(","),t+="|ob:",t+=e.orderBy.map((a=>(function(s){return s.field.canonicalString()+s.dir})(a))).join(","),ar(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((a=>Ha(a))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((a=>Ha(a))).join(",")),e.Te=t}return e.Te}function Ko(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Kv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Cp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ud(n.startAt,e.startAt)&&ud(n.endAt,e.endAt)}function ho(n){return re.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}class Xa{constructor(e,t=null,a=[],i=[],s=null,r="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=a,this.filters=i,this.limit=s,this.limitType=r,this.startAt=l,this.endAt=c,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function ib(n,e,t,a,i,s,r,l){return new Xa(n,e,t,a,i,s,r,l)}function sr(n){return new Xa(n)}function md(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function sb(n){return re.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Rp(n){return n.collectionGroup!==null}function Ai(n){const e=me(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const a=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(r){let l=new dt(vt.comparator);return r.filters.forEach((c=>{c.getFlattenedFilters().forEach((u=>{u.isInequality()&&(l=l.add(u.field))}))})),l})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Vi(s,a))})),t.has(vt.keyField().canonicalString())||e.Ie.push(new Vi(vt.keyField(),a))}return e.Ie}function an(n){const e=me(n);return e.Ee||(e.Ee=rb(e,Ai(n))),e.Ee}function rb(n,e){if(n.limitType==="F")return pd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new Vi(i.field,s)}));const t=n.endAt?new zs(n.endAt.position,n.endAt.inclusive):null,a=n.startAt?new zs(n.startAt.position,n.startAt.inclusive):null;return pd(n.path,n.collectionGroup,e,n.filters,n.limit,t,a)}}function fo(n,e){const t=n.filters.concat([e]);return new Xa(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ob(n,e){const t=n.explicitOrderBy.concat([e]);return new Xa(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Fs(n,e,t){return new Xa(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function rr(n,e){return Ko(an(n),an(e))&&n.limitType===e.limitType}function Lp(n){return`${Go(an(n))}|lt:${n.limitType}`}function $a(n){return`Query(target=${(function(t){let a=t.path.canonicalString();return t.collectionGroup!==null&&(a+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(a+=`, filters: [${t.filters.map((i=>Sp(i))).join(", ")}]`),ar(t.limit)||(a+=", limit: "+t.limit),t.orderBy.length>0&&(a+=`, orderBy: [${t.orderBy.map((i=>(function(r){return`${r.field.canonicalString()} (${r.dir})`})(i))).join(", ")}]`),t.startAt&&(a+=", startAt: ",a+=t.startAt.inclusive?"b:":"a:",a+=t.startAt.position.map((i=>Ha(i))).join(",")),t.endAt&&(a+=", endAt: ",a+=t.endAt.inclusive?"a:":"b:",a+=t.endAt.position.map((i=>Ha(i))).join(",")),`Target(${a})`})(an(n))}; limitType=${n.limitType})`}function or(n,e){return e.isFoundDocument()&&(function(a,i){const s=i.key.path;return a.collectionGroup!==null?i.key.hasCollectionId(a.collectionGroup)&&a.path.isPrefixOf(s):re.isDocumentKey(a.path)?a.path.isEqual(s):a.path.isImmediateParentOf(s)})(n,e)&&(function(a,i){for(const s of Ai(a))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(a,i){for(const s of a.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(a,i){return!(a.startAt&&!(function(r,l,c){const u=dd(r,l,c);return r.inclusive?u<=0:u<0})(a.startAt,Ai(a),i)||a.endAt&&!(function(r,l,c){const u=dd(r,l,c);return r.inclusive?u>=0:u>0})(a.endAt,Ai(a),i))})(n,e)}function lb(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function $p(n){return(e,t)=>{let a=!1;for(const i of Ai(n)){const s=cb(i,e,t);if(s!==0)return s;a=a||i.field.isKeyField()}return 0}}function cb(n,e,t){const a=n.field.isKeyField()?re.comparator(e.key,t.key):(function(s,r,l){const c=r.data.field(s),u=l.data.field(s);return c!==null&&u!==null?qa(c,u):ce(42886)})(n.field,e,t);switch(n.dir){case"asc":return a;case"desc":return-1*a;default:return ce(19790,{direction:n.dir})}}class Ta{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),a=this.inner[t];if(a!==void 0){for(const[i,s]of a)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const a=this.mapKeyFn(e),i=this.inner[a];if(i===void 0)return this.inner[a]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),a=this.inner[t];if(a===void 0)return!1;for(let i=0;i<a.length;i++)if(this.equalsFn(a[i][0],e))return a.length===1?delete this.inner[t]:a.splice(i,1),this.innerSize--,!0;return!1}forEach(e){ea(this.inner,((t,a)=>{for(const[i,s]of a)e(i,s)}))}isEmpty(){return gp(this.inner)}size(){return this.innerSize}}const db=new je(re.comparator);function wn(){return db}const Dp=new je(re.comparator);function wi(...n){let e=Dp;for(const t of n)e=e.insert(t.key,t);return e}function Np(n){let e=Dp;return n.forEach(((t,a)=>e=e.insert(t,a.overlayedDocument))),e}function la(){return Ci()}function Mp(){return Ci()}function Ci(){return new Ta((n=>n.toString()),((n,e)=>n.isEqual(e)))}const ub=new je(re.comparator),pb=new dt(re.comparator);function ke(...n){let e=pb;for(const t of n)e=e.add(t);return e}const mb=new dt(Ie);function hb(){return mb}function Qo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Os(e)?"-0":e}}function Op(n){return{integerValue:""+n}}function fb(n,e){return Bv(e)?Op(e):Qo(n,e)}class lr{constructor(){this._=void 0}}function gb(n,e,t){return n instanceof Us?(function(i,s){const r={fields:{[bp]:{stringValue:vp},[xp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ho(s)&&(s=ir(s)),s&&(r.fields[wp]=s),{mapValue:r}})(t,e):n instanceof Bi?Bp(n,e):n instanceof zi?zp(n,e):(function(i,s){const r=Vp(i,s),l=hd(r)+hd(i.Ae);return po(r)&&po(i.Ae)?Op(l):Qo(i.serializer,l)})(n,e)}function yb(n,e,t){return n instanceof Bi?Bp(n,e):n instanceof zi?zp(n,e):t}function Vp(n,e){return n instanceof js?(function(a){return po(a)||(function(s){return!!s&&"doubleValue"in s})(a)})(e)?e:{integerValue:0}:null}class Us extends lr{}class Bi extends lr{constructor(e){super(),this.elements=e}}function Bp(n,e){const t=Fp(e);for(const a of n.elements)t.some((i=>on(i,a)))||t.push(a);return{arrayValue:{values:t}}}class zi extends lr{constructor(e){super(),this.elements=e}}function zp(n,e){let t=Fp(e);for(const a of n.elements)t=t.filter((i=>!on(i,a)));return{arrayValue:{values:t}}}class js extends lr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function hd(n){return et(n.integerValue||n.doubleValue)}function Fp(n){return Wo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function vb(n,e){return n.field.isEqual(e.field)&&(function(a,i){return a instanceof Bi&&i instanceof Bi||a instanceof zi&&i instanceof zi?ja(a.elements,i.elements,on):a instanceof js&&i instanceof js?on(a.Ae,i.Ae):a instanceof Us&&i instanceof Us})(n.transform,e.transform)}class bb{constructor(e,t){this.version=e,this.transformResults=t}}class Ft{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ft}static exists(e){return new Ft(void 0,e)}static updateTime(e){return new Ft(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ts(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class cr{}function Up(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Yo(n.key,Ft.none()):new Qi(n.key,n.data,Ft.none());{const t=n.data,a=Pt.empty();let i=new dt(vt.comparator);for(let s of e.fields)if(!i.has(s)){let r=t.field(s);r===null&&s.length>1&&(s=s.popLast(),r=t.field(s)),r===null?a.delete(s):a.set(s,r),i=i.add(s)}return new ta(n.key,a,new Mt(i.toArray()),Ft.none())}}function wb(n,e,t){n instanceof Qi?(function(i,s,r){const l=i.value.clone(),c=gd(i.fieldTransforms,s,r.transformResults);l.setAll(c),s.convertToFoundDocument(r.version,l).setHasCommittedMutations()})(n,e,t):n instanceof ta?(function(i,s,r){if(!Ts(i.precondition,s))return void s.convertToUnknownDocument(r.version);const l=gd(i.fieldTransforms,s,r.transformResults),c=s.data;c.setAll(jp(i)),c.setAll(l),s.convertToFoundDocument(r.version,c).setHasCommittedMutations()})(n,e,t):(function(i,s,r){s.convertToNoDocument(r.version).setHasCommittedMutations()})(0,e,t)}function Si(n,e,t,a){return n instanceof Qi?(function(s,r,l,c){if(!Ts(s.precondition,r))return l;const u=s.value.clone(),g=yd(s.fieldTransforms,c,r);return u.setAll(g),r.convertToFoundDocument(r.version,u).setHasLocalMutations(),null})(n,e,t,a):n instanceof ta?(function(s,r,l,c){if(!Ts(s.precondition,r))return l;const u=yd(s.fieldTransforms,c,r),g=r.data;return g.setAll(jp(s)),g.setAll(u),r.convertToFoundDocument(r.version,g).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((x=>x.field)))})(n,e,t,a):(function(s,r,l){return Ts(s.precondition,r)?(r.convertToNoDocument(r.version).setHasLocalMutations(),null):l})(n,e,t)}function xb(n,e){let t=null;for(const a of n.fieldTransforms){const i=e.data.field(a.field),s=Vp(a.transform,i||null);s!=null&&(t===null&&(t=Pt.empty()),t.set(a.field,s))}return t||null}function fd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(a,i){return a===void 0&&i===void 0||!(!a||!i)&&ja(a,i,((s,r)=>vb(s,r)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Qi extends cr{constructor(e,t,a,i=[]){super(),this.key=e,this.value=t,this.precondition=a,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ta extends cr{constructor(e,t,a,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=a,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function jp(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const a=n.data.field(t);e.set(t,a)}})),e}function gd(n,e,t){const a=new Map;Pe(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],r=s.transform,l=e.data.field(s.field);a.set(s.field,yb(r,l,t[i]))}return a}function yd(n,e,t){const a=new Map;for(const i of n){const s=i.transform,r=t.data.field(i.field);a.set(i.field,gb(s,r,e))}return a}class Yo extends cr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class _b extends cr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}class Eb{constructor(e,t,a,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=a,this.mutations=i}applyToRemoteDocument(e,t){const a=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&wb(s,e,a[i])}}applyToLocalView(e,t){for(const a of this.baseMutations)a.key.isEqual(e.key)&&(t=Si(a,e,t,this.localWriteTime));for(const a of this.mutations)a.key.isEqual(e.key)&&(t=Si(a,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const a=Mp();return this.mutations.forEach((i=>{const s=e.get(i.key),r=s.overlayedDocument;let l=this.applyToLocalView(r,s.mutatedFields);l=t.has(i.key)?null:l;const c=Up(r,l);c!==null&&a.set(i.key,c),r.isValidDocument()||r.convertToNoDocument(ue.min())})),a}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ke())}isEqual(e){return this.batchId===e.batchId&&ja(this.mutations,e.mutations,((t,a)=>fd(t,a)))&&ja(this.baseMutations,e.baseMutations,((t,a)=>fd(t,a)))}}class Jo{constructor(e,t,a,i){this.batch=e,this.commitVersion=t,this.mutationResults=a,this.docVersions=i}static from(e,t,a){Pe(e.mutations.length===a.length,58842,{me:e.mutations.length,fe:a.length});let i=(function(){return ub})();const s=e.mutations;for(let r=0;r<s.length;r++)i=i.insert(s[r].key,a[r].version);return new Jo(e,t,a,i)}}class Ib{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}class kb{constructor(e,t){this.count=e,this.unchangedNames=t}}var nt,Te;function Tb(n){switch(n){case K.OK:return ce(64938);case K.CANCELLED:case K.UNKNOWN:case K.DEADLINE_EXCEEDED:case K.RESOURCE_EXHAUSTED:case K.INTERNAL:case K.UNAVAILABLE:case K.UNAUTHENTICATED:return!1;case K.INVALID_ARGUMENT:case K.NOT_FOUND:case K.ALREADY_EXISTS:case K.PERMISSION_DENIED:case K.FAILED_PRECONDITION:case K.ABORTED:case K.OUT_OF_RANGE:case K.UNIMPLEMENTED:case K.DATA_LOSS:return!0;default:return ce(15467,{code:n})}}function qp(n){if(n===void 0)return bn("GRPC error has no .code"),K.UNKNOWN;switch(n){case nt.OK:return K.OK;case nt.CANCELLED:return K.CANCELLED;case nt.UNKNOWN:return K.UNKNOWN;case nt.DEADLINE_EXCEEDED:return K.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return K.RESOURCE_EXHAUSTED;case nt.INTERNAL:return K.INTERNAL;case nt.UNAVAILABLE:return K.UNAVAILABLE;case nt.UNAUTHENTICATED:return K.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return K.INVALID_ARGUMENT;case nt.NOT_FOUND:return K.NOT_FOUND;case nt.ALREADY_EXISTS:return K.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return K.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return K.FAILED_PRECONDITION;case nt.ABORTED:return K.ABORTED;case nt.OUT_OF_RANGE:return K.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return K.UNIMPLEMENTED;case nt.DATA_LOSS:return K.DATA_LOSS;default:return ce(39323,{code:n})}}(Te=nt||(nt={}))[Te.OK=0]="OK",Te[Te.CANCELLED=1]="CANCELLED",Te[Te.UNKNOWN=2]="UNKNOWN",Te[Te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Te[Te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Te[Te.NOT_FOUND=5]="NOT_FOUND",Te[Te.ALREADY_EXISTS=6]="ALREADY_EXISTS",Te[Te.PERMISSION_DENIED=7]="PERMISSION_DENIED",Te[Te.UNAUTHENTICATED=16]="UNAUTHENTICATED",Te[Te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Te[Te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Te[Te.ABORTED=10]="ABORTED",Te[Te.OUT_OF_RANGE=11]="OUT_OF_RANGE",Te[Te.UNIMPLEMENTED=12]="UNIMPLEMENTED",Te[Te.INTERNAL=13]="INTERNAL",Te[Te.UNAVAILABLE=14]="UNAVAILABLE",Te[Te.DATA_LOSS=15]="DATA_LOSS";function Ab(){return new TextEncoder}const Cb=new Bn([4294967295,4294967295],0);function vd(n){const e=Ab().encode(n),t=new sp;return t.update(e),new Uint8Array(t.digest())}function bd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),a=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Bn([t,a],0),new Bn([i,s],0)]}class Xo{constructor(e,t,a){if(this.bitmap=e,this.padding=t,this.hashCount=a,t<0||t>=8)throw new xi(`Invalid padding: ${t}`);if(a<0)throw new xi(`Invalid hash count: ${a}`);if(e.length>0&&this.hashCount===0)throw new xi(`Invalid hash count: ${a}`);if(e.length===0&&t!==0)throw new xi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Bn.fromNumber(this.ge)}ye(e,t,a){let i=e.add(t.multiply(Bn.fromNumber(a)));return i.compare(Cb)===1&&(i=new Bn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=vd(e),[a,i]=bd(t);for(let s=0;s<this.hashCount;s++){const r=this.ye(a,i,s);if(!this.we(r))return!1}return!0}static create(e,t,a){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),r=new Xo(s,i,t);return a.forEach((l=>r.insert(l))),r}insert(e){if(this.ge===0)return;const t=vd(e),[a,i]=bd(t);for(let s=0;s<this.hashCount;s++){const r=this.ye(a,i,s);this.be(r)}}be(e){const t=Math.floor(e/8),a=e%8;this.bitmap[t]|=1<<a}}class xi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}class dr{constructor(e,t,a,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=a,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,a){const i=new Map;return i.set(e,Yi.createSynthesizedTargetChangeForCurrentChange(e,t,a)),new dr(ue.min(),i,new je(Ie),wn(),ke())}}class Yi{constructor(e,t,a,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=a,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,a){return new Yi(a,t,ke(),ke(),ke())}}class As{constructor(e,t,a,i){this.Se=e,this.removedTargetIds=t,this.key=a,this.De=i}}class Hp{constructor(e,t){this.targetId=e,this.Ce=t}}class Wp{constructor(e,t,a=bt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=a,this.cause=i}}class wd{constructor(){this.ve=0,this.Fe=xd(),this.Me=bt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ke(),t=ke(),a=ke();return this.Fe.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:a=a.add(i);break;default:ce(38017,{changeType:s})}})),new Yi(this.Me,this.xe,e,t,a)}Ke(){this.Oe=!1,this.Fe=xd()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,Pe(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Sb{constructor(e){this.Ge=e,this.ze=new Map,this.je=wn(),this.He=ms(),this.Je=ms(),this.Ze=new je(Ie)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const a=this.nt(t);switch(e.state){case 0:this.rt(t)&&a.Le(e.resumeToken);break;case 1:a.We(),a.Ne||a.Ke(),a.Le(e.resumeToken);break;case 2:a.We(),a.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(a.Qe(),a.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),a.Le(e.resumeToken));break;default:ce(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((a,i)=>{this.rt(i)&&t(i)}))}st(e){const t=e.targetId,a=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(ho(s))if(a===0){const r=new re(s.path);this.et(t,r,_t.newNoDocument(r,ue.min()))}else Pe(a===1,20013,{expectedCount:a});else{const r=this._t(t);if(r!==a){const l=this.ut(e),c=l?this.ct(l,e,r):1;if(c!==0){this.it(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:a="",padding:i=0},hashCount:s=0}=t;let r,l;try{r=Wn(a).toUint8Array()}catch(c){if(c instanceof yp)return ba("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Xo(r,i,s)}catch(c){return ba(c instanceof xi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.ge===0?null:l}ct(e,t,a){return t.Ce.count===a-this.Pt(e,t.targetId)?0:2}Pt(e,t){const a=this.Ge.getRemoteKeysForTarget(t);let i=0;return a.forEach((s=>{const r=this.Ge.ht(),l=`projects/${r.projectId}/databases/${r.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(t,s,null),i++)})),i}Tt(e){const t=new Map;this.ze.forEach(((s,r)=>{const l=this.ot(r);if(l){if(s.current&&ho(l.target)){const c=new re(l.target.path);this.It(c).has(r)||this.Et(r,c)||this.et(r,c,_t.newNoDocument(c,e))}s.Be&&(t.set(r,s.ke()),s.Ke())}}));let a=ke();this.Je.forEach(((s,r)=>{let l=!0;r.forEachWhile((c=>{const u=this.ot(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(a=a.add(s))})),this.je.forEach(((s,r)=>r.setReadTime(e)));const i=new dr(e,t,this.Ze,this.je,a);return this.je=wn(),this.He=ms(),this.Je=ms(),this.Ze=new je(Ie),i}Ye(e,t){if(!this.rt(e))return;const a=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,a),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,a){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),a&&(this.je=this.je.insert(t,a))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new wd,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new dt(Ie),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new dt(Ie),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||ne("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new wd),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ms(){return new je(re.comparator)}function xd(){return new je(re.comparator)}const Pb={asc:"ASCENDING",desc:"DESCENDING"},Rb={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Lb={and:"AND",or:"OR"};class $b{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function go(n,e){return n.useProto3Json||ar(e)?e:{value:e}}function qs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Db(n,e){return qs(n,e.toTimestamp())}function sn(n){return Pe(!!n,49232),ue.fromTimestamp((function(t){const a=Hn(t);return new ye(a.seconds,a.nanos)})(n))}function Zo(n,e){return yo(n,e).canonicalString()}function yo(n,e){const t=(function(i){return new Me(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Kp(n){const e=Me.fromString(n);return Pe(Zp(e),10190,{key:e.toString()}),e}function vo(n,e){return Zo(n.databaseId,e.path)}function Ur(n,e){const t=Kp(e);if(t.get(1)!==n.databaseId.projectId)throw new ee(K.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new ee(K.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new re(Yp(t))}function Qp(n,e){return Zo(n.databaseId,e)}function Nb(n){const e=Kp(n);return e.length===4?Me.emptyPath():Yp(e)}function bo(n){return new Me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Yp(n){return Pe(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function _d(n,e,t){return{name:vo(n,e),fields:t.value.mapValue.fields}}function Mb(n,e){let t;if("targetChange"in e){e.targetChange;const a=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ce(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(u,g){return u.useProto3Json?(Pe(g===void 0||typeof g=="string",58123),bt.fromBase64String(g||"")):(Pe(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),bt.fromUint8Array(g||new Uint8Array))})(n,e.targetChange.resumeToken),r=e.targetChange.cause,l=r&&(function(u){const g=u.code===void 0?K.UNKNOWN:qp(u.code);return new ee(g,u.message||"")})(r);t=new Wp(a,i,s,l||null)}else if("documentChange"in e){e.documentChange;const a=e.documentChange;a.document,a.document.name,a.document.updateTime;const i=Ur(n,a.document.name),s=sn(a.document.updateTime),r=a.document.createTime?sn(a.document.createTime):ue.min(),l=new Pt({mapValue:{fields:a.document.fields}}),c=_t.newFoundDocument(i,s,r,l),u=a.targetIds||[],g=a.removedTargetIds||[];t=new As(u,g,c.key,c)}else if("documentDelete"in e){e.documentDelete;const a=e.documentDelete;a.document;const i=Ur(n,a.document),s=a.readTime?sn(a.readTime):ue.min(),r=_t.newNoDocument(i,s),l=a.removedTargetIds||[];t=new As([],l,r.key,r)}else if("documentRemove"in e){e.documentRemove;const a=e.documentRemove;a.document;const i=Ur(n,a.document),s=a.removedTargetIds||[];t=new As([],s,i,null)}else{if(!("filter"in e))return ce(11601,{Vt:e});{e.filter;const a=e.filter;a.targetId;const{count:i=0,unchangedNames:s}=a,r=new kb(i,s),l=a.targetId;t=new Hp(l,r)}}return t}function Ob(n,e){let t;if(e instanceof Qi)t={update:_d(n,e.key,e.value)};else if(e instanceof Yo)t={delete:vo(n,e.key)};else if(e instanceof ta)t={update:_d(n,e.key,e.data),updateMask:Wb(e.fieldMask)};else{if(!(e instanceof _b))return ce(16599,{dt:e.type});t={verify:vo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((a=>(function(s,r){const l=r.transform;if(l instanceof Us)return{fieldPath:r.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Bi)return{fieldPath:r.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof zi)return{fieldPath:r.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof js)return{fieldPath:r.field.canonicalString(),increment:l.Ae};throw ce(20930,{transform:r.transform})})(0,a)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:Db(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:ce(27497)})(n,e.precondition)),t}function Vb(n,e){return n&&n.length>0?(Pe(e!==void 0,14353),n.map((t=>(function(i,s){let r=i.updateTime?sn(i.updateTime):sn(s);return r.isEqual(ue.min())&&(r=sn(s)),new bb(r,i.transformResults||[])})(t,e)))):[]}function Bb(n,e){return{documents:[Qp(n,e.path)]}}function zb(n,e){const t={structuredQuery:{}},a=e.path;let i;e.collectionGroup!==null?(i=a,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=a.popLast(),t.structuredQuery.from=[{collectionId:a.lastSegment()}]),t.parent=Qp(n,i);const s=(function(u){if(u.length!==0)return Xp(Kt.create(u,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const r=(function(u){if(u.length!==0)return u.map((g=>(function(v){return{field:Da(v.field),direction:jb(v.dir)}})(g)))})(e.orderBy);r&&(t.structuredQuery.orderBy=r);const l=go(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{ft:t,parent:i}}function Fb(n){let e=Nb(n.parent);const t=n.structuredQuery,a=t.from?t.from.length:0;let i=null;if(a>0){Pe(a===1,65062);const g=t.from[0];g.allDescendants?i=g.collectionId:e=e.child(g.collectionId)}let s=[];t.where&&(s=(function(x){const v=Jp(x);return v instanceof Kt&&Ap(v)?v.getFilters():[v]})(t.where));let r=[];t.orderBy&&(r=(function(x){return x.map((v=>(function(N){return new Vi(Na(N.field),(function(E){switch(E){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(v)))})(t.orderBy));let l=null;t.limit&&(l=(function(x){let v;return v=typeof x=="object"?x.value:x,ar(v)?null:v})(t.limit));let c=null;t.startAt&&(c=(function(x){const v=!!x.before,P=x.values||[];return new zs(P,v)})(t.startAt));let u=null;return t.endAt&&(u=(function(x){const v=!x.before,P=x.values||[];return new zs(P,v)})(t.endAt)),ib(e,i,r,s,l,"F",c,u)}function Ub(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ce(28987,{purpose:i})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Jp(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const a=Na(t.unaryFilter.field);return at.create(a,"==",{doubleValue:NaN});case"IS_NULL":const i=Na(t.unaryFilter.field);return at.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Na(t.unaryFilter.field);return at.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const r=Na(t.unaryFilter.field);return at.create(r,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ce(61313);default:return ce(60726)}})(n):n.fieldFilter!==void 0?(function(t){return at.create(Na(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ce(58110);default:return ce(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Kt.create(t.compositeFilter.filters.map((a=>Jp(a))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return ce(1026)}})(t.compositeFilter.op))})(n):ce(30097,{filter:n})}function jb(n){return Pb[n]}function qb(n){return Rb[n]}function Hb(n){return Lb[n]}function Da(n){return{fieldPath:n.canonicalString()}}function Na(n){return vt.fromServerFormat(n.fieldPath)}function Xp(n){return n instanceof at?(function(t){if(t.op==="=="){if(cd(t.value))return{unaryFilter:{field:Da(t.field),op:"IS_NAN"}};if(ld(t.value))return{unaryFilter:{field:Da(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(cd(t.value))return{unaryFilter:{field:Da(t.field),op:"IS_NOT_NAN"}};if(ld(t.value))return{unaryFilter:{field:Da(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Da(t.field),op:qb(t.op),value:t.value}}})(n):n instanceof Kt?(function(t){const a=t.getFilters().map((i=>Xp(i)));return a.length===1?a[0]:{compositeFilter:{op:Hb(t.op),filters:a}}})(n):ce(54877,{filter:n})}function Wb(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Zp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function em(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}class Mn{constructor(e,t,a,i,s=ue.min(),r=ue.min(),l=bt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=a,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Mn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Mn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Mn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Mn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}class Gb{constructor(e){this.yt=e}}function Kb(n){const e=Fb({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Fs(e,e.limit,"L"):e}class Qb{constructor(){this.Sn=new Yb}addToCollectionParentIndex(e,t){return this.Sn.add(t),Y.resolve()}getCollectionParents(e,t){return Y.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return Y.resolve()}deleteFieldIndex(e,t){return Y.resolve()}deleteAllFieldIndexes(e){return Y.resolve()}createTargetIndexes(e,t){return Y.resolve()}getDocumentsMatchingTarget(e,t){return Y.resolve(null)}getIndexType(e,t){return Y.resolve(0)}getFieldIndexes(e,t){return Y.resolve([])}getNextCollectionGroupToUpdate(e){return Y.resolve(null)}getMinOffset(e,t){return Y.resolve(qn.min())}getMinOffsetFromCollectionGroup(e,t){return Y.resolve(qn.min())}updateCollectionGroup(e,t,a){return Y.resolve()}updateIndexEntries(e,t){return Y.resolve()}}class Yb{constructor(){this.index={}}add(e){const t=e.lastSegment(),a=e.popLast(),i=this.index[t]||new dt(Me.comparator),s=!i.has(a);return this.index[t]=i.add(a),s}has(e){const t=e.lastSegment(),a=e.popLast(),i=this.index[t];return i&&i.has(a)}getEntries(e){return(this.index[e]||new dt(Me.comparator)).toArray()}}const Ed={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},tm=41943040;class St{static withCacheSize(e){return new St(e,St.DEFAULT_COLLECTION_PERCENTILE,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,a){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=a}}St.DEFAULT_COLLECTION_PERCENTILE=10,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,St.DEFAULT=new St(tm,St.DEFAULT_COLLECTION_PERCENTILE,St.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),St.DISABLED=new St(-1,0,0);class Wa{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Wa(0)}static ar(){return new Wa(-1)}}const Id="LruGarbageCollector",Jb=1048576;function kd([n,e],[t,a]){const i=Ie(n,t);return i===0?Ie(e,a):i}class Xb{constructor(e){this.Pr=e,this.buffer=new dt(kd),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const a=this.buffer.last();kd(t,a)<0&&(this.buffer=this.buffer.delete(a).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Zb{constructor(e,t,a){this.garbageCollector=e,this.asyncQueue=t,this.localStore=a,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){ne(Id,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ja(t)?ne(Id,"Ignoring IndexedDB error during garbage collection: ",t):await Ya(t)}await this.Ar(3e5)}))}}class e0{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((a=>Math.floor(t/100*a)))}nthSequenceNumber(e,t){if(t===0)return Y.resolve(nr.ce);const a=new Xb(t);return this.Vr.forEachTarget(e,(i=>a.Er(i.sequenceNumber))).next((()=>this.Vr.mr(e,(i=>a.Er(i))))).next((()=>a.maxValue))}removeTargets(e,t,a){return this.Vr.removeTargets(e,t,a)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(ne("LruGarbageCollector","Garbage collection skipped; disabled"),Y.resolve(Ed)):this.getCacheSize(e).next((a=>a<this.params.cacheSizeCollectionThreshold?(ne("LruGarbageCollector",`Garbage collection skipped; Cache size ${a} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ed):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let a,i,s,r,l,c,u;const g=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((x=>(x>this.params.maximumSequenceNumbersToCollect?(ne("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${x}`),i=this.params.maximumSequenceNumbersToCollect):i=x,r=Date.now(),this.nthSequenceNumber(e,i)))).next((x=>(a=x,l=Date.now(),this.removeTargets(e,a,t)))).next((x=>(s=x,c=Date.now(),this.removeOrphanedDocuments(e,a)))).next((x=>(u=Date.now(),La()<=Ee.DEBUG&&ne("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${r-g}ms
	Determined least recently used ${i} in `+(l-r)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${x} documents in `+(u-c)+`ms
Total Duration: ${u-g}ms`),Y.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:x}))))}}function t0(n,e){return new e0(n,e)}class n0{constructor(){this.changes=new Ta((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,_t.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const a=this.changes.get(t);return a!==void 0?Y.resolve(a):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}class a0{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}class i0{constructor(e,t,a,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=a,this.indexManager=i}getDocument(e,t){let a=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(a=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(a!==null&&Si(a.mutation,i,Mt.empty(),ye.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((a=>this.getLocalViewOfDocuments(e,a,ke()).next((()=>a))))}getLocalViewOfDocuments(e,t,a=ke()){const i=la();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,a).next((s=>{let r=wi();return s.forEach(((l,c)=>{r=r.insert(l,c.overlayedDocument)})),r}))))}getOverlayedDocuments(e,t){const a=la();return this.populateOverlays(e,a,t).next((()=>this.computeViews(e,t,a,ke())))}populateOverlays(e,t,a){const i=[];return a.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((r,l)=>{t.set(r,l)}))}))}computeViews(e,t,a,i){let s=wn();const r=Ci(),l=(function(){return Ci()})();return t.forEach(((c,u)=>{const g=a.get(u.key);i.has(u.key)&&(g===void 0||g.mutation instanceof ta)?s=s.insert(u.key,u):g!==void 0?(r.set(u.key,g.mutation.getFieldMask()),Si(g.mutation,u,g.mutation.getFieldMask(),ye.now())):r.set(u.key,Mt.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((u,g)=>r.set(u,g))),t.forEach(((u,g)=>l.set(u,new a0(g,r.get(u)??null)))),l)))}recalculateAndSaveOverlays(e,t){const a=Ci();let i=new je(((r,l)=>r-l)),s=ke();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((r=>{for(const l of r)l.keys().forEach((c=>{const u=t.get(c);if(u===null)return;let g=a.get(c)||Mt.empty();g=l.applyToLocalView(u,g),a.set(c,g);const x=(i.get(l.batchId)||ke()).add(c);i=i.insert(l.batchId,x)}))})).next((()=>{const r=[],l=i.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),u=c.key,g=c.value,x=Mp();g.forEach((v=>{if(!s.has(v)){const P=Up(t.get(v),a.get(v));P!==null&&x.set(v,P),s=s.add(v)}})),r.push(this.documentOverlayCache.saveOverlays(e,u,x))}return Y.waitFor(r)})).next((()=>a))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((a=>this.recalculateAndSaveOverlays(e,a)))}getDocumentsMatchingQuery(e,t,a,i){return sb(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Rp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,a,i):this.getDocumentsMatchingCollectionQuery(e,t,a,i)}getNextDocuments(e,t,a,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,a,i).next((s=>{const r=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,a.largestBatchId,i-s.size):Y.resolve(la());let l=Di,c=s;return r.next((u=>Y.forEach(u,((g,x)=>(l<x.largestBatchId&&(l=x.largestBatchId),s.get(g)?Y.resolve():this.remoteDocumentCache.getEntry(e,g).next((v=>{c=c.insert(g,v)}))))).next((()=>this.populateOverlays(e,u,s))).next((()=>this.computeViews(e,c,u,ke()))).next((g=>({batchId:l,changes:Np(g)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new re(t)).next((a=>{let i=wi();return a.isFoundDocument()&&(i=i.insert(a.key,a)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,a,i){const s=t.collectionGroup;let r=wi();return this.indexManager.getCollectionParents(e,s).next((l=>Y.forEach(l,(c=>{const u=(function(x,v){return new Xa(v,null,x.explicitOrderBy.slice(),x.filters.slice(),x.limit,x.limitType,x.startAt,x.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,a,i).next((g=>{g.forEach(((x,v)=>{r=r.insert(x,v)}))}))})).next((()=>r))))}getDocumentsMatchingCollectionQuery(e,t,a,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,a.largestBatchId).next((r=>(s=r,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,a,s,i)))).next((r=>{s.forEach(((c,u)=>{const g=u.getKey();r.get(g)===null&&(r=r.insert(g,_t.newInvalidDocument(g)))}));let l=wi();return r.forEach(((c,u)=>{const g=s.get(c);g!==void 0&&Si(g.mutation,u,Mt.empty(),ye.now()),or(t,u)&&(l=l.insert(c,u))})),l}))}}class s0{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return Y.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:sn(i.createTime)}})(t)),Y.resolve()}getNamedQuery(e,t){return Y.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(i){return{name:i.name,query:Kb(i.bundledQuery),readTime:sn(i.readTime)}})(t)),Y.resolve()}}class r0{constructor(){this.overlays=new je(re.comparator),this.Lr=new Map}getOverlay(e,t){return Y.resolve(this.overlays.get(t))}getOverlays(e,t){const a=la();return Y.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&a.set(i,s)})))).next((()=>a))}saveOverlays(e,t,a){return a.forEach(((i,s)=>{this.bt(e,t,s)})),Y.resolve()}removeOverlaysForBatchId(e,t,a){const i=this.Lr.get(a);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(a)),Y.resolve()}getOverlaysForCollection(e,t,a){const i=la(),s=t.length+1,r=new re(t.child("")),l=this.overlays.getIteratorFrom(r);for(;l.hasNext();){const c=l.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&c.largestBatchId>a&&i.set(c.getKey(),c)}return Y.resolve(i)}getOverlaysForCollectionGroup(e,t,a,i){let s=new je(((u,g)=>u-g));const r=this.overlays.getIterator();for(;r.hasNext();){const u=r.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>a){let g=s.get(u.largestBatchId);g===null&&(g=la(),s=s.insert(u.largestBatchId,g)),g.set(u.getKey(),u)}}const l=la(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((u,g)=>l.set(u,g))),!(l.size()>=i)););return Y.resolve(l)}bt(e,t,a){const i=this.overlays.get(a.key);if(i!==null){const r=this.Lr.get(i.largestBatchId).delete(a.key);this.Lr.set(i.largestBatchId,r)}this.overlays=this.overlays.insert(a.key,new Ib(t,a));let s=this.Lr.get(t);s===void 0&&(s=ke(),this.Lr.set(t,s)),this.Lr.set(t,s.add(a.key))}}class o0{constructor(){this.sessionToken=bt.EMPTY_BYTE_STRING}getSessionToken(e){return Y.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,Y.resolve()}}class el{constructor(){this.kr=new dt(ft.Kr),this.qr=new dt(ft.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const a=new ft(e,t);this.kr=this.kr.add(a),this.qr=this.qr.add(a)}$r(e,t){e.forEach((a=>this.addReference(a,t)))}removeReference(e,t){this.Wr(new ft(e,t))}Qr(e,t){e.forEach((a=>this.removeReference(a,t)))}Gr(e){const t=new re(new Me([])),a=new ft(t,e),i=new ft(t,e+1),s=[];return this.qr.forEachInRange([a,i],(r=>{this.Wr(r),s.push(r.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new re(new Me([])),a=new ft(t,e),i=new ft(t,e+1);let s=ke();return this.qr.forEachInRange([a,i],(r=>{s=s.add(r.key)})),s}containsKey(e){const t=new ft(e,0),a=this.kr.firstAfterOrEqual(t);return a!==null&&e.isEqual(a.key)}}class ft{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return re.comparator(e.key,t.key)||Ie(e.Hr,t.Hr)}static Ur(e,t){return Ie(e.Hr,t.Hr)||re.comparator(e.key,t.key)}}class l0{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new dt(ft.Kr)}checkEmpty(e){return Y.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,a,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new Eb(s,t,a,i);this.mutationQueue.push(r);for(const l of i)this.Jr=this.Jr.add(new ft(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return Y.resolve(r)}lookupMutationBatch(e,t){return Y.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const a=t+1,i=this.Xr(a),s=i<0?0:i;return Y.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return Y.resolve(this.mutationQueue.length===0?qo:this.Yn-1)}getAllMutationBatches(e){return Y.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const a=new ft(t,0),i=new ft(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([a,i],(r=>{const l=this.Zr(r.Hr);s.push(l)})),Y.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let a=new dt(Ie);return t.forEach((i=>{const s=new ft(i,0),r=new ft(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,r],(l=>{a=a.add(l.Hr)}))})),Y.resolve(this.Yr(a))}getAllMutationBatchesAffectingQuery(e,t){const a=t.path,i=a.length+1;let s=a;re.isDocumentKey(s)||(s=s.child(""));const r=new ft(new re(s),0);let l=new dt(Ie);return this.Jr.forEachWhile((c=>{const u=c.key.path;return!!a.isPrefixOf(u)&&(u.length===i&&(l=l.add(c.Hr)),!0)}),r),Y.resolve(this.Yr(l))}Yr(e){const t=[];return e.forEach((a=>{const i=this.Zr(a);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){Pe(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let a=this.Jr;return Y.forEach(t.mutations,(i=>{const s=new ft(i.key,t.batchId);return a=a.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Jr=a}))}nr(e){}containsKey(e,t){const a=new ft(t,0),i=this.Jr.firstAfterOrEqual(a);return Y.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,Y.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}class c0{constructor(e){this.ti=e,this.docs=(function(){return new je(re.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const a=t.key,i=this.docs.get(a),s=i?i.size:0,r=this.ti(t);return this.docs=this.docs.insert(a,{document:t.mutableCopy(),size:r}),this.size+=r-s,this.indexManager.addToCollectionParentIndex(e,a.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const a=this.docs.get(t);return Y.resolve(a?a.document.mutableCopy():_t.newInvalidDocument(t))}getEntries(e,t){let a=wn();return t.forEach((i=>{const s=this.docs.get(i);a=a.insert(i,s?s.document.mutableCopy():_t.newInvalidDocument(i))})),Y.resolve(a)}getDocumentsMatchingQuery(e,t,a,i){let s=wn();const r=t.path,l=new re(r.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:u,value:{document:g}}=c.getNext();if(!r.isPrefixOf(u.path))break;u.path.length>r.length+1||Nv(Dv(g),a)<=0||(i.has(g.key)||or(t,g))&&(s=s.insert(g.key,g.mutableCopy()))}return Y.resolve(s)}getAllFromCollectionGroup(e,t,a,i){ce(9500)}ni(e,t){return Y.forEach(this.docs,(a=>t(a)))}newChangeBuffer(e){return new d0(this)}getSize(e){return Y.resolve(this.size)}}class d0 extends n0{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((a,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(a)})),Y.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}class u0{constructor(e){this.persistence=e,this.ri=new Ta((t=>Go(t)),Ko),this.lastRemoteSnapshotVersion=ue.min(),this.highestTargetId=0,this.ii=0,this.si=new el,this.targetCount=0,this.oi=Wa._r()}forEachTarget(e,t){return this.ri.forEach(((a,i)=>t(i))),Y.resolve()}getLastRemoteSnapshotVersion(e){return Y.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Y.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),Y.resolve(this.highestTargetId)}setTargetsMetadata(e,t,a){return a&&(this.lastRemoteSnapshotVersion=a),t>this.ii&&(this.ii=t),Y.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Wa(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,Y.resolve()}updateTargetData(e,t){return this.lr(t),Y.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,Y.resolve()}removeTargets(e,t,a){let i=0;const s=[];return this.ri.forEach(((r,l)=>{l.sequenceNumber<=t&&a.get(l.targetId)===null&&(this.ri.delete(r),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)})),Y.waitFor(s).next((()=>i))}getTargetCount(e){return Y.resolve(this.targetCount)}getTargetData(e,t){const a=this.ri.get(t)||null;return Y.resolve(a)}addMatchingKeys(e,t,a){return this.si.$r(t,a),Y.resolve()}removeMatchingKeys(e,t,a){this.si.Qr(t,a);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((r=>{s.push(i.markPotentiallyOrphaned(e,r))})),Y.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),Y.resolve()}getMatchingKeysForTargetId(e,t){const a=this.si.jr(t);return Y.resolve(a)}containsKey(e,t){return Y.resolve(this.si.containsKey(t))}}class nm{constructor(e,t){this._i={},this.overlays={},this.ai=new nr(0),this.ui=!1,this.ui=!0,this.ci=new o0,this.referenceDelegate=e(this),this.li=new u0(this),this.indexManager=new Qb,this.remoteDocumentCache=(function(i){return new c0(i)})((a=>this.referenceDelegate.hi(a))),this.serializer=new Gb(t),this.Pi=new s0(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new r0,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let a=this._i[e.toKey()];return a||(a=new l0(t,this.referenceDelegate),this._i[e.toKey()]=a),a}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,a){ne("MemoryPersistence","Starting transaction:",e);const i=new p0(this.ai.next());return this.referenceDelegate.Ti(),a(i).next((s=>this.referenceDelegate.Ii(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Ei(e,t){return Y.or(Object.values(this._i).map((a=>()=>a.containsKey(e,t))))}}class p0 extends Ov{constructor(e){super(),this.currentSequenceNumber=e}}class tl{constructor(e){this.persistence=e,this.Ri=new el,this.Ai=null}static Vi(e){return new tl(e)}get di(){if(this.Ai)return this.Ai;throw ce(60996)}addReference(e,t,a){return this.Ri.addReference(a,t),this.di.delete(a.toString()),Y.resolve()}removeReference(e,t,a){return this.Ri.removeReference(a,t),this.di.add(a.toString()),Y.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),Y.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((i=>this.di.add(i.toString())));const a=this.persistence.getTargetCache();return a.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.di.add(s.toString())))})).next((()=>a.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Y.forEach(this.di,(a=>{const i=re.fromPath(a);return this.mi(e,i).next((s=>{s||t.removeEntry(i,ue.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((a=>{a?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return Y.or([()=>Y.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Hs{constructor(e,t){this.persistence=e,this.fi=new Ta((a=>zv(a.path)),((a,i)=>a.isEqual(i))),this.garbageCollector=t0(this,t)}static Vi(e,t){return new Hs(e,t)}Ti(){}Ii(e){return Y.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((a=>t.next((i=>a+i))))}pr(e){let t=0;return this.mr(e,(a=>{t++})).next((()=>t))}mr(e,t){return Y.forEach(this.fi,((a,i)=>this.wr(e,a,i).next((s=>s?Y.resolve():t(i)))))}removeTargets(e,t,a){return this.persistence.getTargetCache().removeTargets(e,t,a)}removeOrphanedDocuments(e,t){let a=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,(r=>this.wr(e,r,t).next((l=>{l||(a++,s.removeEntry(r,ue.min()))})))).next((()=>s.apply(e))).next((()=>a))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),Y.resolve()}removeTarget(e,t){const a=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,a)}addReference(e,t,a){return this.fi.set(a,e.currentSequenceNumber),Y.resolve()}removeReference(e,t,a){return this.fi.set(a,e.currentSequenceNumber),Y.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),Y.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Is(e.data.value)),t}wr(e,t,a){return Y.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return Y.resolve(i!==void 0&&i>a)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}class nl{constructor(e,t,a,i){this.targetId=e,this.fromCache=t,this.Ts=a,this.Is=i}static Es(e,t){let a=ke(),i=ke();for(const s of t.docChanges)switch(s.type){case 0:a=a.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new nl(e,t.fromCache,a,i)}}class m0{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}class h0{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return zh()?8:Vv(Et())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,a,i){const s={result:null};return this.gs(e,t).next((r=>{s.result=r})).next((()=>{if(!s.result)return this.ps(e,t,i,a).next((r=>{s.result=r}))})).next((()=>{if(s.result)return;const r=new m0;return this.ys(e,t,r).next((l=>{if(s.result=l,this.As)return this.ws(e,t,r,l.size)}))})).next((()=>s.result))}ws(e,t,a,i){return a.documentReadCount<this.Vs?(La()<=Ee.DEBUG&&ne("QueryEngine","SDK will not create cache indexes for query:",$a(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),Y.resolve()):(La()<=Ee.DEBUG&&ne("QueryEngine","Query:",$a(t),"scans",a.documentReadCount,"local documents and returns",i,"documents as results."),a.documentReadCount>this.ds*i?(La()<=Ee.DEBUG&&ne("QueryEngine","The SDK decides to create cache indexes for query:",$a(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,an(t))):Y.resolve())}gs(e,t){if(md(t))return Y.resolve(null);let a=an(t);return this.indexManager.getIndexType(e,a).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=Fs(t,null,"F"),a=an(t)),this.indexManager.getDocumentsMatchingTarget(e,a).next((s=>{const r=ke(...s);return this.fs.getDocuments(e,r).next((l=>this.indexManager.getMinOffset(e,a).next((c=>{const u=this.bs(t,l);return this.Ss(t,u,r,c.readTime)?this.gs(e,Fs(t,null,"F")):this.Ds(e,u,t,c)}))))})))))}ps(e,t,a,i){return md(t)||i.isEqual(ue.min())?Y.resolve(null):this.fs.getDocuments(e,a).next((s=>{const r=this.bs(t,s);return this.Ss(t,r,a,i)?Y.resolve(null):(La()<=Ee.DEBUG&&ne("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),$a(t)),this.Ds(e,r,t,$v(i,Di)).next((l=>l)))}))}bs(e,t){let a=new dt($p(e));return t.forEach(((i,s)=>{or(e,s)&&(a=a.add(s))})),a}Ss(e,t,a,i){if(e.limit===null)return!1;if(a.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,a){return La()<=Ee.DEBUG&&ne("QueryEngine","Using full collection scan to execute query:",$a(t)),this.fs.getDocumentsMatchingQuery(e,t,qn.min(),a)}Ds(e,t,a,i){return this.fs.getDocumentsMatchingQuery(e,a,i).next((s=>(t.forEach((r=>{s=s.insert(r.key,r)})),s)))}}const al="LocalStore",f0=3e8;class g0{constructor(e,t,a,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new je(Ie),this.Fs=new Ta((s=>Go(s)),Ko),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(a)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new i0(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function y0(n,e,t,a){return new g0(n,e,t,a)}async function am(n,e){const t=me(n);return await t.persistence.runTransaction("Handle user change","readonly",(a=>{let i;return t.mutationQueue.getAllMutationBatches(a).next((s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(a)))).next((s=>{const r=[],l=[];let c=ke();for(const u of i){r.push(u.batchId);for(const g of u.mutations)c=c.add(g.key)}for(const u of s){l.push(u.batchId);for(const g of u.mutations)c=c.add(g.key)}return t.localDocuments.getDocuments(a,c).next((u=>({Ns:u,removedBatchIds:r,addedBatchIds:l})))}))}))}function v0(n,e){const t=me(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(a=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return(function(l,c,u,g){const x=u.batch,v=x.keys();let P=Y.resolve();return v.forEach((N=>{P=P.next((()=>g.getEntry(c,N))).next((O=>{const E=u.docVersions.get(N);Pe(E!==null,48541),O.version.compareTo(E)<0&&(x.applyToRemoteDocument(O,u),O.isValidDocument()&&(O.setReadTime(u.commitVersion),g.addEntry(O)))}))})),P.next((()=>l.mutationQueue.removeMutationBatch(c,x)))})(t,a,e,s).next((()=>s.apply(a))).next((()=>t.mutationQueue.performConsistencyCheck(a))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(a,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(a,(function(l){let c=ke();for(let u=0;u<l.mutationResults.length;++u)l.mutationResults[u].transformResults.length>0&&(c=c.add(l.batch.mutations[u].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(a,i)))}))}function im(n){const e=me(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function b0(n,e){const t=me(n),a=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const r=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const l=[];e.targetChanges.forEach(((g,x)=>{const v=i.get(x);if(!v)return;l.push(t.li.removeMatchingKeys(s,g.removedDocuments,x).next((()=>t.li.addMatchingKeys(s,g.addedDocuments,x))));let P=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(x)!==null?P=P.withResumeToken(bt.EMPTY_BYTE_STRING,ue.min()).withLastLimboFreeSnapshotVersion(ue.min()):g.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(g.resumeToken,a)),i=i.insert(x,P),(function(O,E,k){return O.resumeToken.approximateByteSize()===0||E.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=f0?!0:k.addedDocuments.size+k.modifiedDocuments.size+k.removedDocuments.size>0})(v,P,g)&&l.push(t.li.updateTargetData(s,P))}));let c=wn(),u=ke();if(e.documentUpdates.forEach((g=>{e.resolvedLimboDocuments.has(g)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,g))})),l.push(w0(s,r,e.documentUpdates).next((g=>{c=g.Bs,u=g.Ls}))),!a.isEqual(ue.min())){const g=t.li.getLastRemoteSnapshotVersion(s).next((x=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,a)));l.push(g)}return Y.waitFor(l).next((()=>r.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,u))).next((()=>c))})).then((s=>(t.vs=i,s)))}function w0(n,e,t){let a=ke(),i=ke();return t.forEach((s=>a=a.add(s))),e.getEntries(n,a).next((s=>{let r=wn();return t.forEach(((l,c)=>{const u=s.get(l);c.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(l)),c.isNoDocument()&&c.version.isEqual(ue.min())?(e.removeEntry(l,c.readTime),r=r.insert(l,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),r=r.insert(l,c)):ne(al,"Ignoring outdated watch update for ",l,". Current version:",u.version," Watch version:",c.version)})),{Bs:r,Ls:i}}))}function x0(n,e){const t=me(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(a=>(e===void 0&&(e=qo),t.mutationQueue.getNextMutationBatchAfterBatchId(a,e))))}function _0(n,e){const t=me(n);return t.persistence.runTransaction("Allocate target","readwrite",(a=>{let i;return t.li.getTargetData(a,e).next((s=>s?(i=s,Y.resolve(i)):t.li.allocateTargetId(a).next((r=>(i=new Mn(e,r,"TargetPurposeListen",a.currentSequenceNumber),t.li.addTargetData(a,i).next((()=>i)))))))})).then((a=>{const i=t.vs.get(a.targetId);return(i===null||a.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(a.targetId,a),t.Fs.set(e,a.targetId)),a}))}async function wo(n,e,t){const a=me(n),i=a.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await a.persistence.runTransaction("Release target",s,(r=>a.persistence.referenceDelegate.removeTarget(r,i)))}catch(r){if(!Ja(r))throw r;ne(al,`Failed to update sequence numbers for target ${e}: ${r}`)}a.vs=a.vs.remove(e),a.Fs.delete(i.target)}function Td(n,e,t){const a=me(n);let i=ue.min(),s=ke();return a.persistence.runTransaction("Execute query","readwrite",(r=>(function(c,u,g){const x=me(c),v=x.Fs.get(g);return v!==void 0?Y.resolve(x.vs.get(v)):x.li.getTargetData(u,g)})(a,r,an(e)).next((l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,a.li.getMatchingKeysForTargetId(r,l.targetId).next((c=>{s=c}))})).next((()=>a.Cs.getDocumentsMatchingQuery(r,e,t?i:ue.min(),t?s:ke()))).next((l=>(E0(a,lb(e),l),{documents:l,ks:s})))))}function E0(n,e,t){let a=n.Ms.get(e)||ue.min();t.forEach(((i,s)=>{s.readTime.compareTo(a)>0&&(a=s.readTime)})),n.Ms.set(e,a)}class Ad{constructor(){this.activeTargetIds=hb()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class I0{constructor(){this.vo=new Ad,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,a){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,a){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Ad,Promise.resolve()}handleUserChange(e,t,a){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}class k0{Mo(e){}shutdown(){}}const Cd="ConnectivityMonitor";class Sd{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){ne(Cd,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){ne(Cd,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}let hs=null;function xo(){return hs===null?hs=(function(){return 268435456+Math.round(2147483648*Math.random())})():hs++,"0x"+hs.toString(16)}const jr="RestConnection",T0={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class A0{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",a=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${a}/databases/${i}`,this.$o=this.databaseId.database===Vs?`project_id=${a}`:`project_id=${a}&database_id=${i}`}Wo(e,t,a,i,s){const r=xo(),l=this.Qo(e,t.toUriEncodedString());ne(jr,`Sending RPC '${e}' ${r}:`,l,a);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(c,i,s);const{host:u}=new URL(l),g=Jn(u);return this.zo(e,l,c,a,g).then((x=>(ne(jr,`Received RPC '${e}' ${r}: `,x),x)),(x=>{throw ba(jr,`RPC '${e}' ${r} failed with error: `,x,"url: ",l,"request:",a),x}))}jo(e,t,a,i,s,r){return this.Wo(e,t,a,i,s)}Go(e,t,a){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Qa})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((i,s)=>e[s]=i)),a&&a.headers.forEach(((i,s)=>e[s]=i))}Qo(e,t){const a=T0[e];let i=`${this.qo}/v1/${t}:${a}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}class C0{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}const wt="WebChannelConnection",pi=(n,e,t)=>{n.listen(e,(a=>{try{t(a)}catch(i){setTimeout((()=>{throw i}),0)}}))};class za extends A0{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!za.c_){const e=cp();pi(e,lp.STAT_EVENT,(t=>{t.stat===lo.PROXY?ne(wt,"STAT_EVENT: detected buffering proxy"):t.stat===lo.NOPROXY&&ne(wt,"STAT_EVENT: detected no buffering proxy")})),za.c_=!0}}zo(e,t,a,i,s){const r=xo();return new Promise(((l,c)=>{const u=new rp;u.setWithCredentials(!0),u.listenOnce(op.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case Es.NO_ERROR:const x=u.getResponseJson();ne(wt,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(x)),l(x);break;case Es.TIMEOUT:ne(wt,`RPC '${e}' ${r} timed out`),c(new ee(K.DEADLINE_EXCEEDED,"Request time out"));break;case Es.HTTP_ERROR:const v=u.getStatus();if(ne(wt,`RPC '${e}' ${r} failed with status:`,v,"response text:",u.getResponseText()),v>0){let P=u.getResponseJson();Array.isArray(P)&&(P=P[0]);const N=P?.error;if(N&&N.status&&N.message){const O=(function(k){const T=k.toLowerCase().replace(/_/g,"-");return Object.values(K).indexOf(T)>=0?T:K.UNKNOWN})(N.status);c(new ee(O,N.message))}else c(new ee(K.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new ee(K.UNAVAILABLE,"Connection failed."));break;default:ce(9055,{l_:e,streamId:r,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{ne(wt,`RPC '${e}' ${r} completed.`)}}));const g=JSON.stringify(i);ne(wt,`RPC '${e}' ${r} sending request:`,i),u.send(t,"POST",g,a,15)}))}T_(e,t,a){const i=xo(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,t,a),l.encodeInitMessageHeaders=!0;const u=s.join("");ne(wt,`Creating RPC '${e}' stream ${i}: ${u}`,l);const g=r.createWebChannel(u,l);this.I_(g);let x=!1,v=!1;const P=new C0({Ho:N=>{v?ne(wt,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(x||(ne(wt,`Opening RPC '${e}' stream ${i} transport.`),g.open(),x=!0),ne(wt,`RPC '${e}' stream ${i} sending:`,N),g.send(N))},Jo:()=>g.close()});return pi(g,bi.EventType.OPEN,(()=>{v||(ne(wt,`RPC '${e}' stream ${i} transport opened.`),P.i_())})),pi(g,bi.EventType.CLOSE,(()=>{v||(v=!0,ne(wt,`RPC '${e}' stream ${i} transport closed`),P.o_(),this.E_(g))})),pi(g,bi.EventType.ERROR,(N=>{v||(v=!0,ba(wt,`RPC '${e}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),P.o_(new ee(K.UNAVAILABLE,"The operation could not be completed")))})),pi(g,bi.EventType.MESSAGE,(N=>{if(!v){const O=N.data[0];Pe(!!O,16349);const E=O,k=E?.error||E[0]?.error;if(k){ne(wt,`RPC '${e}' stream ${i} received error:`,k);const T=k.status;let S=(function(M){const p=nt[M];if(p!==void 0)return qp(p)})(T),_=k.message;T==="NOT_FOUND"&&_.includes("database")&&_.includes("does not exist")&&_.includes(this.databaseId.database)&&ba(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),S===void 0&&(S=K.INTERNAL,_="Unknown error status: "+T+" with message "+k.message),v=!0,P.o_(new ee(S,_)),g.close()}else ne(wt,`RPC '${e}' stream ${i} received:`,O),P.__(O)}})),za.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,a){super.Go(e,t,a),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return dp()}}function S0(n){return new za(n)}function qr(){return typeof document<"u"?document:null}function ur(n){return new $b(n,!0)}za.c_=!1;class sm{constructor(e,t,a=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=a,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),a=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-a);i>0&&ne("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${a} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}const Pd="PersistentStream";class rm{constructor(e,t,a,i,s,r,l,c){this.Ci=e,this.b_=a,this.S_=i,this.connection=s,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new sm(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,(()=>this.k_())))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===K.RESOURCE_EXHAUSTED?(bn(t.toString()),bn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===K.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([a,i])=>{this.D_===t&&this.G_(a,i)}),(a=>{e((()=>{const i=new ee(K.UNKNOWN,"Fetching auth token failed: "+a.message);return this.z_(i)}))}))}G_(e,t){const a=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{a((()=>this.listener.Zo()))})),this.stream.Yo((()=>{a((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{a((()=>this.z_(i)))})),this.stream.onMessage((i=>{a((()=>++this.F_==1?this.H_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return ne(Pd,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(ne(Pd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class P0 extends rm{constructor(e,t,a,i,s,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,a,i,r),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Mb(this.serializer,e),a=(function(s){if(!("targetChange"in s))return ue.min();const r=s.targetChange;return r.targetIds&&r.targetIds.length?ue.min():r.readTime?sn(r.readTime):ue.min()})(e);return this.listener.J_(t,a)}Z_(e){const t={};t.database=bo(this.serializer),t.addTarget=(function(s,r){let l;const c=r.target;if(l=ho(c)?{documents:Bb(s,c)}:{query:zb(s,c).ft},l.targetId=r.targetId,r.resumeToken.approximateByteSize()>0){l.resumeToken=Gp(s,r.resumeToken);const u=go(s,r.expectedCount);u!==null&&(l.expectedCount=u)}else if(r.snapshotVersion.compareTo(ue.min())>0){l.readTime=qs(s,r.snapshotVersion.toTimestamp());const u=go(s,r.expectedCount);u!==null&&(l.expectedCount=u)}return l})(this.serializer,e);const a=Ub(this.serializer,e);a&&(t.labels=a),this.K_(t)}X_(e){const t={};t.database=bo(this.serializer),t.removeTarget=e,this.K_(t)}}class R0 extends rm{constructor(e,t,a,i,s,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,a,i,r),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return Pe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Pe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Pe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Vb(e.writeResults,e.commitTime),a=sn(e.commitTime);return this.listener.na(a,t)}ra(){const e={};e.database=bo(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((a=>Ob(this.serializer,a)))};this.K_(t)}}class L0{}class $0 extends L0{constructor(e,t,a,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=a,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new ee(K.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,a,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,r])=>this.connection.Wo(e,yo(t,a),i,s,r))).catch((s=>{throw s.name==="FirebaseError"?(s.code===K.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new ee(K.UNKNOWN,s.toString())}))}jo(e,t,a,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,l])=>this.connection.jo(e,yo(t,a),i,r,l,s))).catch((r=>{throw r.name==="FirebaseError"?(r.code===K.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new ee(K.UNKNOWN,r.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function D0(n,e,t,a){return new $0(n,e,t,a)}class N0{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(bn(t),this.aa=!1):ne("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}const wa="RemoteStore";class M0{constructor(e,t,a,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=a,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((r=>{a.enqueueAndForget((async()=>{Aa(this)&&(ne(wa,"Restarting streams for network reachability change."),await(async function(c){const u=me(c);u.Ea.add(4),await Ji(u),u.Va.set("Unknown"),u.Ea.delete(4),await pr(u)})(this))}))})),this.Va=new N0(a,i)}}async function pr(n){if(Aa(n))for(const e of n.Ra)await e(!0)}async function Ji(n){for(const e of n.Ra)await e(!1)}function om(n,e){const t=me(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ol(t)?rl(t):Za(t).O_()&&sl(t,e))}function il(n,e){const t=me(n),a=Za(t);t.Ia.delete(e),a.O_()&&lm(t,e),t.Ia.size===0&&(a.O_()?a.L_():Aa(t)&&t.Va.set("Unknown"))}function sl(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ue.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Za(n).Z_(e)}function lm(n,e){n.da.$e(e),Za(n).X_(e)}function rl(n){n.da=new Sb({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Za(n).start(),n.Va.ua()}function ol(n){return Aa(n)&&!Za(n).x_()&&n.Ia.size>0}function Aa(n){return me(n).Ea.size===0}function cm(n){n.da=void 0}async function O0(n){n.Va.set("Online")}async function V0(n){n.Ia.forEach(((e,t)=>{sl(n,e)}))}async function B0(n,e){cm(n),ol(n)?(n.Va.ha(e),rl(n)):n.Va.set("Unknown")}async function z0(n,e,t){if(n.Va.set("Online"),e instanceof Wp&&e.state===2&&e.cause)try{await(async function(i,s){const r=s.cause;for(const l of s.targetIds)i.Ia.has(l)&&(await i.remoteSyncer.rejectListen(l,r),i.Ia.delete(l),i.da.removeTarget(l))})(n,e)}catch(a){ne(wa,"Failed to remove targets %s: %s ",e.targetIds.join(","),a),await Ws(n,a)}else if(e instanceof As?n.da.Xe(e):e instanceof Hp?n.da.st(e):n.da.tt(e),!t.isEqual(ue.min()))try{const a=await im(n.localStore);t.compareTo(a)>=0&&await(function(s,r){const l=s.da.Tt(r);return l.targetChanges.forEach(((c,u)=>{if(c.resumeToken.approximateByteSize()>0){const g=s.Ia.get(u);g&&s.Ia.set(u,g.withResumeToken(c.resumeToken,r))}})),l.targetMismatches.forEach(((c,u)=>{const g=s.Ia.get(c);if(!g)return;s.Ia.set(c,g.withResumeToken(bt.EMPTY_BYTE_STRING,g.snapshotVersion)),lm(s,c);const x=new Mn(g.target,c,u,g.sequenceNumber);sl(s,x)})),s.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(a){ne(wa,"Failed to raise snapshot:",a),await Ws(n,a)}}async function Ws(n,e,t){if(!Ja(e))throw e;n.Ea.add(1),await Ji(n),n.Va.set("Offline"),t||(t=()=>im(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{ne(wa,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await pr(n)}))}function dm(n,e){return e().catch((t=>Ws(n,t,e)))}async function mr(n){const e=me(n),t=Kn(e);let a=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:qo;for(;F0(e);)try{const i=await x0(e.localStore,a);if(i===null){e.Ta.length===0&&t.L_();break}a=i.batchId,U0(e,i)}catch(i){await Ws(e,i)}um(e)&&pm(e)}function F0(n){return Aa(n)&&n.Ta.length<10}function U0(n,e){n.Ta.push(e);const t=Kn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function um(n){return Aa(n)&&!Kn(n).x_()&&n.Ta.length>0}function pm(n){Kn(n).start()}async function j0(n){Kn(n).ra()}async function q0(n){const e=Kn(n);for(const t of n.Ta)e.ea(t.mutations)}async function H0(n,e,t){const a=n.Ta.shift(),i=Jo.from(a,e,t);await dm(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await mr(n)}async function W0(n,e){e&&Kn(n).Y_&&await(async function(a,i){if((function(r){return Tb(r)&&r!==K.ABORTED})(i.code)){const s=a.Ta.shift();Kn(a).B_(),await dm(a,(()=>a.remoteSyncer.rejectFailedWrite(s.batchId,i))),await mr(a)}})(n,e),um(n)&&pm(n)}async function Rd(n,e){const t=me(n);t.asyncQueue.verifyOperationInProgress(),ne(wa,"RemoteStore received new credentials");const a=Aa(t);t.Ea.add(3),await Ji(t),a&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await pr(t)}async function G0(n,e){const t=me(n);e?(t.Ea.delete(2),await pr(t)):e||(t.Ea.add(2),await Ji(t),t.Va.set("Unknown"))}function Za(n){return n.ma||(n.ma=(function(t,a,i){const s=me(t);return s.sa(),new P0(a,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:O0.bind(null,n),Yo:V0.bind(null,n),t_:B0.bind(null,n),J_:z0.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),ol(n)?rl(n):n.Va.set("Unknown")):(await n.ma.stop(),cm(n))}))),n.ma}function Kn(n){return n.fa||(n.fa=(function(t,a,i){const s=me(t);return s.sa(),new R0(a,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:j0.bind(null,n),t_:W0.bind(null,n),ta:q0.bind(null,n),na:H0.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await mr(n)):(await n.fa.stop(),n.Ta.length>0&&(ne(wa,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}class ll{constructor(e,t,a,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=a,this.op=i,this.removalCallback=s,this.deferred=new hn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((r=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,a,i,s){const r=Date.now()+a,l=new ll(e,t,r,i,s);return l.start(a),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ee(K.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function cl(n,e){if(bn("AsyncQueue",`${e}: ${n}`),Ja(n))return new ee(K.UNAVAILABLE,`${e}: ${n}`);throw n}class Fa{static emptySet(e){return new Fa(e.comparator)}constructor(e){this.comparator=e?(t,a)=>e(t,a)||re.comparator(t.key,a.key):(t,a)=>re.comparator(t.key,a.key),this.keyedMap=wi(),this.sortedSet=new je(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,a)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Fa)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),a=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=a.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const a=new Fa;return a.comparator=this.comparator,a.keyedMap=e,a.sortedSet=t,a}}class Ld{constructor(){this.ga=new je(re.comparator)}track(e){const t=e.doc.key,a=this.ga.get(t);a?e.type!==0&&a.type===3?this.ga=this.ga.insert(t,e):e.type===3&&a.type!==1?this.ga=this.ga.insert(t,{type:a.type,doc:e.doc}):e.type===2&&a.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&a.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&a.type===0?this.ga=this.ga.remove(t):e.type===1&&a.type===2?this.ga=this.ga.insert(t,{type:1,doc:a.doc}):e.type===0&&a.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):ce(63341,{Vt:e,pa:a}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,a)=>{e.push(a)})),e}}class Ga{constructor(e,t,a,i,s,r,l,c,u){this.query=e,this.docs=t,this.oldDocs=a,this.docChanges=i,this.mutatedKeys=s,this.fromCache=r,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,a,i,s){const r=[];return t.forEach((l=>{r.push({type:0,doc:l})})),new Ga(e,t,Fa.emptySet(t),r,a,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&rr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,a=e.docChanges;if(t.length!==a.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==a[i].type||!t[i].doc.isEqual(a[i].doc))return!1;return!0}}class K0{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some((e=>e.Da()))}}class Q0{constructor(){this.queries=$d(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,a){const i=me(t),s=i.queries;i.queries=$d(),s.forEach(((r,l)=>{for(const c of l.ba)c.onError(a)}))})(this,new ee(K.ABORTED,"Firestore shutting down"))}}function $d(){return new Ta((n=>Lp(n)),rr)}async function dl(n,e){const t=me(n);let a=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(a=2):(s=new K0,a=e.Da()?0:1);try{switch(a){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(r){const l=cl(r,`Initialization of query '${$a(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&pl(t)}async function ul(n,e){const t=me(n),a=e.query;let i=3;const s=t.queries.get(a);if(s){const r=s.ba.indexOf(e);r>=0&&(s.ba.splice(r,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(a),t.onUnlisten(a,!0);case 1:return t.queries.delete(a),t.onUnlisten(a,!1);case 2:return t.onLastRemoteStoreUnlisten(a);default:return}}function Y0(n,e){const t=me(n);let a=!1;for(const i of e){const s=i.query,r=t.queries.get(s);if(r){for(const l of r.ba)l.Fa(i)&&(a=!0);r.wa=i}}a&&pl(t)}function J0(n,e,t){const a=me(n),i=a.queries.get(e);if(i)for(const s of i.ba)s.onError(t);a.queries.delete(e)}function pl(n){n.Ca.forEach((e=>{e.next()}))}var _o,Dd;(Dd=_o||(_o={})).Ma="default",Dd.Cache="cache";class ml{constructor(e,t,a){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=a||{}}Fa(e){if(!this.options.includeMetadataChanges){const a=[];for(const i of e.docChanges)i.type!==3&&a.push(i);e=new Ga(e.query,e.docs,e.oldDocs,a,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const a=t!=="Offline";return(!this.options.Ka||!a)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Ga.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==_o.Cache}}class mm{constructor(e){this.key=e}}class hm{constructor(e){this.key=e}}class X0{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=ke(),this.mutatedKeys=ke(),this.eu=$p(e),this.tu=new Fa(this.eu)}get nu(){return this.Za}ru(e,t){const a=t?t.iu:new Ld,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,r=i,l=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((g,x)=>{const v=i.get(g),P=or(this.query,x)?x:null,N=!!v&&this.mutatedKeys.has(v.key),O=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let E=!1;v&&P?v.data.isEqual(P.data)?N!==O&&(a.track({type:3,doc:P}),E=!0):this.su(v,P)||(a.track({type:2,doc:P}),E=!0,(c&&this.eu(P,c)>0||u&&this.eu(P,u)<0)&&(l=!0)):!v&&P?(a.track({type:0,doc:P}),E=!0):v&&!P&&(a.track({type:1,doc:v}),E=!0,(c||u)&&(l=!0)),E&&(P?(r=r.add(P),s=O?s.add(g):s.delete(g)):(r=r.delete(g),s=s.delete(g)))})),this.query.limit!==null)for(;r.size>this.query.limit;){const g=this.query.limitType==="F"?r.last():r.first();r=r.delete(g.key),s=s.delete(g.key),a.track({type:1,doc:g})}return{tu:r,iu:a,Ss:l,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,a,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const r=e.iu.ya();r.sort(((g,x)=>(function(P,N){const O=E=>{switch(E){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ce(20277,{Vt:E})}};return O(P)-O(N)})(g.type,x.type)||this.eu(g.doc,x.doc))),this.ou(a),i=i??!1;const l=t&&!i?this._u():[],c=this.Ya.size===0&&this.current&&!i?1:0,u=c!==this.Xa;return this.Xa=c,r.length!==0||u?{snapshot:new Ga(this.query,e.tu,s,r,e.mutatedKeys,c===0,u,!1,!!a&&a.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ld,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=ke(),this.tu.forEach((a=>{this.uu(a.key)&&(this.Ya=this.Ya.add(a.key))}));const t=[];return e.forEach((a=>{this.Ya.has(a)||t.push(new hm(a))})),this.Ya.forEach((a=>{e.has(a)||t.push(new mm(a))})),t}cu(e){this.Za=e.ks,this.Ya=ke();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Ga.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const hl="SyncEngine";class Z0{constructor(e,t,a){this.query=e,this.targetId=t,this.view=a}}class ew{constructor(e){this.key=e,this.hu=!1}}class tw{constructor(e,t,a,i,s,r){this.localStore=e,this.remoteStore=t,this.eventManager=a,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=r,this.Pu={},this.Tu=new Ta((l=>Lp(l)),rr),this.Iu=new Map,this.Eu=new Set,this.Ru=new je(re.comparator),this.Au=new Map,this.Vu=new el,this.du={},this.mu=new Map,this.fu=Wa.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function nw(n,e,t=!0){const a=wm(n);let i;const s=a.Tu.get(e);return s?(a.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await fm(a,e,t,!0),i}async function aw(n,e){const t=wm(n);await fm(t,e,!0,!1)}async function fm(n,e,t,a){const i=await _0(n.localStore,an(e)),s=i.targetId,r=n.sharedClientState.addLocalQueryTarget(s,t);let l;return a&&(l=await iw(n,e,s,r==="current",i.resumeToken)),n.isPrimaryClient&&t&&om(n.remoteStore,i),l}async function iw(n,e,t,a,i){n.pu=(x,v,P)=>(async function(O,E,k,T){let S=E.view.ru(k);S.Ss&&(S=await Td(O.localStore,E.query,!1).then((({documents:p})=>E.view.ru(p,S))));const _=T&&T.targetChanges.get(E.targetId),R=T&&T.targetMismatches.get(E.targetId)!=null,M=E.view.applyChanges(S,O.isPrimaryClient,_,R);return Md(O,E.targetId,M.au),M.snapshot})(n,x,v,P);const s=await Td(n.localStore,e,!0),r=new X0(e,s.ks),l=r.ru(s.documents),c=Yi.createSynthesizedTargetChangeForCurrentChange(t,a&&n.onlineState!=="Offline",i),u=r.applyChanges(l,n.isPrimaryClient,c);Md(n,t,u.au);const g=new Z0(e,t,r);return n.Tu.set(e,g),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function sw(n,e,t){const a=me(n),i=a.Tu.get(e),s=a.Iu.get(i.targetId);if(s.length>1)return a.Iu.set(i.targetId,s.filter((r=>!rr(r,e)))),void a.Tu.delete(e);a.isPrimaryClient?(a.sharedClientState.removeLocalQueryTarget(i.targetId),a.sharedClientState.isActiveQueryTarget(i.targetId)||await wo(a.localStore,i.targetId,!1).then((()=>{a.sharedClientState.clearQueryState(i.targetId),t&&il(a.remoteStore,i.targetId),Eo(a,i.targetId)})).catch(Ya)):(Eo(a,i.targetId),await wo(a.localStore,i.targetId,!0))}async function rw(n,e){const t=me(n),a=t.Tu.get(e),i=t.Iu.get(a.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(a.targetId),il(t.remoteStore,a.targetId))}async function ow(n,e,t){const a=hw(n);try{const i=await(function(r,l){const c=me(r),u=ye.now(),g=l.reduce(((P,N)=>P.add(N.key)),ke());let x,v;return c.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let N=wn(),O=ke();return c.xs.getEntries(P,g).next((E=>{N=E,N.forEach(((k,T)=>{T.isValidDocument()||(O=O.add(k))}))})).next((()=>c.localDocuments.getOverlayedDocuments(P,N))).next((E=>{x=E;const k=[];for(const T of l){const S=xb(T,x.get(T.key).overlayedDocument);S!=null&&k.push(new ta(T.key,S,Ip(S.value.mapValue),Ft.exists(!0)))}return c.mutationQueue.addMutationBatch(P,u,k,l)})).next((E=>{v=E;const k=E.applyToLocalDocumentSet(x,O);return c.documentOverlayCache.saveOverlays(P,E.batchId,k)}))})).then((()=>({batchId:v.batchId,changes:Np(x)})))})(a.localStore,e);a.sharedClientState.addPendingMutation(i.batchId),(function(r,l,c){let u=r.du[r.currentUser.toKey()];u||(u=new je(Ie)),u=u.insert(l,c),r.du[r.currentUser.toKey()]=u})(a,i.batchId,t),await Xi(a,i.changes),await mr(a.remoteStore)}catch(i){const s=cl(i,"Failed to persist write");t.reject(s)}}async function gm(n,e){const t=me(n);try{const a=await b0(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const r=t.Au.get(s);r&&(Pe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?r.hu=!0:i.modifiedDocuments.size>0?Pe(r.hu,14607):i.removedDocuments.size>0&&(Pe(r.hu,42227),r.hu=!1))})),await Xi(t,a,e)}catch(a){await Ya(a)}}function Nd(n,e,t){const a=me(n);if(a.isPrimaryClient&&t===0||!a.isPrimaryClient&&t===1){const i=[];a.Tu.forEach(((s,r)=>{const l=r.view.va(e);l.snapshot&&i.push(l.snapshot)})),(function(r,l){const c=me(r);c.onlineState=l;let u=!1;c.queries.forEach(((g,x)=>{for(const v of x.ba)v.va(l)&&(u=!0)})),u&&pl(c)})(a.eventManager,e),i.length&&a.Pu.J_(i),a.onlineState=e,a.isPrimaryClient&&a.sharedClientState.setOnlineState(e)}}async function lw(n,e,t){const a=me(n);a.sharedClientState.updateQueryState(e,"rejected",t);const i=a.Au.get(e),s=i&&i.key;if(s){let r=new je(re.comparator);r=r.insert(s,_t.newNoDocument(s,ue.min()));const l=ke().add(s),c=new dr(ue.min(),new Map,new je(Ie),r,l);await gm(a,c),a.Ru=a.Ru.remove(s),a.Au.delete(e),fl(a)}else await wo(a.localStore,e,!1).then((()=>Eo(a,e,t))).catch(Ya)}async function cw(n,e){const t=me(n),a=e.batch.batchId;try{const i=await v0(t.localStore,e);vm(t,a,null),ym(t,a),t.sharedClientState.updateMutationState(a,"acknowledged"),await Xi(t,i)}catch(i){await Ya(i)}}async function dw(n,e,t){const a=me(n);try{const i=await(function(r,l){const c=me(r);return c.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let g;return c.mutationQueue.lookupMutationBatch(u,l).next((x=>(Pe(x!==null,37113),g=x.keys(),c.mutationQueue.removeMutationBatch(u,x)))).next((()=>c.mutationQueue.performConsistencyCheck(u))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(u,g,l))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,g))).next((()=>c.localDocuments.getDocuments(u,g)))}))})(a.localStore,e);vm(a,e,t),ym(a,e),a.sharedClientState.updateMutationState(e,"rejected",t),await Xi(a,i)}catch(i){await Ya(i)}}function ym(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function vm(n,e,t){const a=me(n);let i=a.du[a.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),a.du[a.currentUser.toKey()]=i}}function Eo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const a of n.Iu.get(e))n.Tu.delete(a),t&&n.Pu.yu(a,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((a=>{n.Vu.containsKey(a)||bm(n,a)}))}function bm(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(il(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),fl(n))}function Md(n,e,t){for(const a of t)a instanceof mm?(n.Vu.addReference(a.key,e),uw(n,a)):a instanceof hm?(ne(hl,"Document no longer in limbo: "+a.key),n.Vu.removeReference(a.key,e),n.Vu.containsKey(a.key)||bm(n,a.key)):ce(19791,{wu:a})}function uw(n,e){const t=e.key,a=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(a)||(ne(hl,"New document in limbo: "+t),n.Eu.add(a),fl(n))}function fl(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new re(Me.fromString(e)),a=n.fu.next();n.Au.set(a,new ew(t)),n.Ru=n.Ru.insert(t,a),om(n.remoteStore,new Mn(an(sr(t.path)),a,"TargetPurposeLimboResolution",nr.ce))}}async function Xi(n,e,t){const a=me(n),i=[],s=[],r=[];a.Tu.isEmpty()||(a.Tu.forEach(((l,c)=>{r.push(a.pu(c,e,t).then((u=>{if((u||t)&&a.isPrimaryClient){const g=u?!u.fromCache:t?.targetChanges.get(c.targetId)?.current;a.sharedClientState.updateQueryState(c.targetId,g?"current":"not-current")}if(u){i.push(u);const g=nl.Es(c.targetId,u);s.push(g)}})))})),await Promise.all(r),a.Pu.J_(i),await(async function(c,u){const g=me(c);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",(x=>Y.forEach(u,(v=>Y.forEach(v.Ts,(P=>g.persistence.referenceDelegate.addReference(x,v.targetId,P))).next((()=>Y.forEach(v.Is,(P=>g.persistence.referenceDelegate.removeReference(x,v.targetId,P)))))))))}catch(x){if(!Ja(x))throw x;ne(al,"Failed to update sequence numbers: "+x)}for(const x of u){const v=x.targetId;if(!x.fromCache){const P=g.vs.get(v),N=P.snapshotVersion,O=P.withLastLimboFreeSnapshotVersion(N);g.vs=g.vs.insert(v,O)}}})(a.localStore,s))}async function pw(n,e){const t=me(n);if(!t.currentUser.isEqual(e)){ne(hl,"User change. New user:",e.toKey());const a=await am(t.localStore,e);t.currentUser=e,(function(s,r){s.mu.forEach((l=>{l.forEach((c=>{c.reject(new ee(K.CANCELLED,r))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,a.removedBatchIds,a.addedBatchIds),await Xi(t,a.Ns)}}function mw(n,e){const t=me(n),a=t.Au.get(e);if(a&&a.hu)return ke().add(a.key);{let i=ke();const s=t.Iu.get(e);if(!s)return i;for(const r of s){const l=t.Tu.get(r);i=i.unionWith(l.view.nu)}return i}}function wm(n){const e=me(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=gm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=mw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=lw.bind(null,e),e.Pu.J_=Y0.bind(null,e.eventManager),e.Pu.yu=J0.bind(null,e.eventManager),e}function hw(n){const e=me(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=dw.bind(null,e),e}class Gs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ur(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return y0(this.persistence,new h0,e.initialUser,this.serializer)}Cu(e){return new nm(tl.Vi,this.serializer)}Du(e){return new I0}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Gs.provider={build:()=>new Gs};class fw extends Gs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Pe(this.persistence.referenceDelegate instanceof Hs,46915);const a=this.persistence.referenceDelegate.garbageCollector;return new Zb(a,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?St.withCacheSize(this.cacheSizeBytes):St.DEFAULT;return new nm((a=>Hs.Vi(a,t)),this.serializer)}}class Io{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=a=>Nd(this.syncEngine,a,1),this.remoteStore.remoteSyncer.handleCredentialChange=pw.bind(null,this.syncEngine),await G0(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Q0})()}createDatastore(e){const t=ur(e.databaseInfo.databaseId),a=S0(e.databaseInfo);return D0(e.authCredentials,e.appCheckCredentials,a,t)}createRemoteStore(e){return(function(a,i,s,r,l){return new M0(a,i,s,r,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Nd(this.syncEngine,t,0)),(function(){return Sd.v()?new Sd:new k0})())}createSyncEngine(e,t){return(function(i,s,r,l,c,u,g){const x=new tw(i,s,r,l,c,u);return g&&(x.gu=!0),x})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const a=me(t);ne(wa,"RemoteStore shutting down."),a.Ea.add(5),await Ji(a),a.Aa.shutdown(),a.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Io.provider={build:()=>new Io};class gl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):bn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}const Qn="FirestoreClient";class gw{constructor(e,t,a,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=a,this._databaseInfo=i,this.user=xt.UNAUTHENTICATED,this.clientId=jo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(a,(async r=>{ne(Qn,"Received user=",r.uid),await this.authCredentialListener(r),this.user=r})),this.appCheckCredentials.start(a,(r=>(ne(Qn,"Received new app check token=",r),this.appCheckCredentialListener(r,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new hn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const a=cl(t,"Failed to shutdown persistence");e.reject(a)}})),e.promise}}async function Hr(n,e){n.asyncQueue.verifyOperationInProgress(),ne(Qn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let a=t.initialUser;n.setCredentialChangeListener((async i=>{a.isEqual(i)||(await am(e.localStore,i),a=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Od(n,e){n.asyncQueue.verifyOperationInProgress();const t=await yw(n);ne(Qn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((a=>Rd(e.remoteStore,a))),n.setAppCheckTokenChangeListener(((a,i)=>Rd(e.remoteStore,i))),n._onlineComponents=e}async function yw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){ne(Qn,"Using user provided OfflineComponentProvider");try{await Hr(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===K.FAILED_PRECONDITION||i.code===K.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;ba("Error using user provided cache. Falling back to memory cache: "+t),await Hr(n,new Gs)}}else ne(Qn,"Using default OfflineComponentProvider"),await Hr(n,new fw(void 0));return n._offlineComponents}async function xm(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(ne(Qn,"Using user provided OnlineComponentProvider"),await Od(n,n._uninitializedComponentsProvider._online)):(ne(Qn,"Using default OnlineComponentProvider"),await Od(n,new Io))),n._onlineComponents}function vw(n){return xm(n).then((e=>e.syncEngine))}async function Ks(n){const e=await xm(n),t=e.eventManager;return t.onListen=nw.bind(null,e.syncEngine),t.onUnlisten=sw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=aw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=rw.bind(null,e.syncEngine),t}function bw(n,e,t,a){const i=new gl(a),s=new ml(e,i,t);return n.asyncQueue.enqueueAndForget((async()=>dl(await Ks(n),s))),()=>{i.Nu(),n.asyncQueue.enqueueAndForget((async()=>ul(await Ks(n),s)))}}function ww(n,e,t={}){const a=new hn;return n.asyncQueue.enqueueAndForget((async()=>(function(s,r,l,c,u){const g=new gl({next:v=>{g.Nu(),r.enqueueAndForget((()=>ul(s,x)));const P=v.docs.has(l);!P&&v.fromCache?u.reject(new ee(K.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&v.fromCache&&c&&c.source==="server"?u.reject(new ee(K.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(v)},error:v=>u.reject(v)}),x=new ml(sr(l.path),g,{includeMetadataChanges:!0,Ka:!0});return dl(s,x)})(await Ks(n),n.asyncQueue,e,t,a))),a.promise}function xw(n,e,t={}){const a=new hn;return n.asyncQueue.enqueueAndForget((async()=>(function(s,r,l,c,u){const g=new gl({next:v=>{g.Nu(),r.enqueueAndForget((()=>ul(s,x))),v.fromCache&&c.source==="server"?u.reject(new ee(K.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(v)},error:v=>u.reject(v)}),x=new ml(l,g,{includeMetadataChanges:!0,Ka:!0});return dl(s,x)})(await Ks(n),n.asyncQueue,e,t,a))),a.promise}function _w(n,e){const t=new hn;return n.asyncQueue.enqueueAndForget((async()=>ow(await vw(n),e,t))),t.promise}function _m(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}const Ew="ComponentProvider",Vd=new Map;function Iw(n,e,t,a,i){return new jv(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,_m(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,a)}const Em="firestore.googleapis.com",Bd=!0;class zd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new ee(K.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Em,this.ssl=Bd}else this.host=e.host,this.ssl=e.ssl??Bd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=tm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Jb)throw new ee(K.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Lv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_m(e.experimentalLongPollingOptions??{}),(function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new ee(K.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new ee(K.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new ee(K.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(a,i){return a.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class hr{constructor(e,t,a,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=a,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new zd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ee(K.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ee(K.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new zd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(a){if(!a)return new _v;switch(a.type){case"firstParty":return new Tv(a.sessionIndex||"0",a.iamToken||null,a.authTokenFactory||null);case"provider":return a.client;default:throw new ee(K.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const a=Vd.get(t);a&&(ne(Ew,"Removing Datastore"),Vd.delete(t),a.terminate())})(this),Promise.resolve()}}function kw(n,e,t,a={}){n=Rt(n,hr);const i=Jn(e),s=n._getSettings(),r={...s,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;i&&(Ao(`https://${l}`),Co("Firestore",!0)),s.host!==Em&&s.host!==l&&ba("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:l,ssl:i,emulatorOptions:a};if(!ha(c,r)&&(n._setSettings(c),a.mockUserToken)){let u,g;if(typeof a.mockUserToken=="string")u=a.mockUserToken,g=xt.MOCK_USER;else{u=wu(a.mockUserToken,n._app?.options.projectId);const x=a.mockUserToken.sub||a.mockUserToken.user_id;if(!x)throw new ee(K.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new xt(x)}n._authCredentials=new Ev(new pp(u,g))}}class _n{constructor(e,t,a){this.converter=t,this._query=a,this.type="query",this.firestore=e}withConverter(e){return new _n(this.firestore,e,this._query)}}class Qe{constructor(e,t,a){this.converter=t,this._key=a,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new zn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Qe(this.firestore,e,this._key)}toJSON(){return{type:Qe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,a){if(Ki(t,Qe._jsonSchema))return new Qe(e,a||null,new re(Me.fromString(t.referencePath)))}}Qe._jsonSchemaVersion="firestore/documentReference/1.0",Qe._jsonSchema={type:it("string",Qe._jsonSchemaVersion),referencePath:it("string")};class zn extends _n{constructor(e,t,a){super(e,t,sr(a)),this._path=a,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Qe(this.firestore,null,new re(e))}withConverter(e){return new zn(this.firestore,e,this._path)}}function xa(n,e,...t){if(n=Fe(n),mp("collection","path",e),n instanceof hr){const a=Me.fromString(e,...t);return Zc(a),new zn(n,null,a)}{if(!(n instanceof Qe||n instanceof zn))throw new ee(K.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const a=n._path.child(Me.fromString(e,...t));return Zc(a),new zn(n.firestore,null,a)}}function _i(n,e,...t){if(n=Fe(n),arguments.length===1&&(e=jo.newId()),mp("doc","path",e),n instanceof hr){const a=Me.fromString(e,...t);return Xc(a),new Qe(n,null,new re(a))}{if(!(n instanceof Qe||n instanceof zn))throw new ee(K.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const a=n._path.child(Me.fromString(e,...t));return Xc(a),new Qe(n.firestore,n instanceof zn?n.converter:null,new re(a))}}const Fd="AsyncQueue";class Ud{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new sm(this,"async_queue_retry"),this._c=()=>{const a=qr();a&&ne(Fd,"Visibility state changed to "+a.visibilityState),this.M_.w_()},this.ac=e;const t=qr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=qr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new hn;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Ja(e))throw e;ne(Fd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((a=>{throw this.nc=a,this.rc=!1,bn("INTERNAL UNHANDLED ERROR: ",jd(a)),a})).then((a=>(this.rc=!1,a))))));return this.ac=t,t}enqueueAfterDelay(e,t,a){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=ll.createAndSchedule(this,e,t,a,(s=>this.hc(s)));return this.tc.push(i),i}uc(){this.nc&&ce(47125,{Pc:jd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,a)=>t.targetTimeMs-a.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function jd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class xn extends hr{constructor(e,t,a,i){super(e,t,a,i),this.type="firestore",this._queue=new Ud,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ud(e),this._firestoreClient=void 0,await e}}}function Tw(n,e){const t=typeof n=="object"?n:Lo(),a=typeof n=="string"?n:Vs,i=Js(t,"firestore").getImmediate({identifier:a});if(!i._initialized){const s=yu("firestore");s&&kw(i,...s)}return i}function fr(n){if(n._terminated)throw new ee(K.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Aw(n),n._firestoreClient}function Aw(n){const e=n._freezeSettings(),t=Iw(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new gw(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(i){const s=i?._online.build();return{_offline:i?._offline.build(s),_online:s}})(n._componentsProvider))}class zt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new zt(bt.fromBase64String(e))}catch(t){throw new ee(K.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new zt(bt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:zt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ki(e,zt._jsonSchema))return zt.fromBase64String(e.bytes)}}zt._jsonSchemaVersion="firestore/bytes/1.0",zt._jsonSchema={type:it("string",zt._jsonSchemaVersion),bytes:it("string")};class yl{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new ee(K.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new vt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}class vl{constructor(e){this._methodName=e}}class rn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new ee(K.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new ee(K.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ie(this._lat,e._lat)||Ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:rn._jsonSchemaVersion}}static fromJSON(e){if(Ki(e,rn._jsonSchema))return new rn(e.latitude,e.longitude)}}rn._jsonSchemaVersion="firestore/geoPoint/1.0",rn._jsonSchema={type:it("string",rn._jsonSchemaVersion),latitude:it("number"),longitude:it("number")};class Wt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(a,i){if(a.length!==i.length)return!1;for(let s=0;s<a.length;++s)if(a[s]!==i[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Wt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ki(e,Wt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Wt(e.vectorValues);throw new ee(K.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Wt._jsonSchemaVersion="firestore/vectorValue/1.0",Wt._jsonSchema={type:it("string",Wt._jsonSchemaVersion),vectorValues:it("object")};const Cw=/^__.*__$/;class Sw{constructor(e,t,a){this.data=e,this.fieldMask=t,this.fieldTransforms=a}toMutation(e,t){return this.fieldMask!==null?new ta(e,this.data,this.fieldMask,t,this.fieldTransforms):new Qi(e,this.data,t,this.fieldTransforms)}}class Im{constructor(e,t,a){this.data=e,this.fieldMask=t,this.fieldTransforms=a}toMutation(e,t){return new ta(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function km(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ce(40011,{dataSource:n})}}class bl{constructor(e,t,a,i,s,r){this.settings=e,this.databaseId=t,this.serializer=a,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=r||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new bl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){const t=this.path?.child(e),a=this.contextWith({path:t,arrayElement:!1});return a.validatePathSegment(e),a}childContextForFieldPath(e){const t=this.path?.child(e),a=this.contextWith({path:t,arrayElement:!1});return a.validatePath(),a}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Qs(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(km(this.dataSource)&&Cw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Pw{constructor(e,t,a){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=a||ur(e)}createContext(e,t,a,i=!1){return new bl({dataSource:e,methodName:t,targetDoc:a,path:vt.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function gr(n){const e=n._freezeSettings(),t=ur(n._databaseId);return new Pw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Tm(n,e,t,a,i,s={}){const r=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);wl("Data must be an object, but it was:",r,a);const l=Am(a,r);let c,u;if(s.merge)c=new Mt(r.fieldMask),u=r.fieldTransforms;else if(s.mergeFields){const g=[];for(const x of s.mergeFields){const v=_a(e,x,t);if(!r.contains(v))throw new ee(K.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Pm(g,v)||g.push(v)}c=new Mt(g),u=r.fieldTransforms.filter((x=>c.covers(x.field)))}else c=null,u=r.fieldTransforms;return new Sw(new Pt(l),c,u)}class yr extends vl{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof yr}}function Rw(n,e,t,a){const i=n.createContext(1,e,t);wl("Data must be an object, but it was:",i,a);const s=[],r=Pt.empty();ea(a,((c,u)=>{const g=Sm(e,c,t);u=Fe(u);const x=i.childContextForFieldPath(g);if(u instanceof yr)s.push(g);else{const v=Zi(u,x);v!=null&&(s.push(g),r.set(g,v))}}));const l=new Mt(s);return new Im(r,l,i.fieldTransforms)}function Lw(n,e,t,a,i,s){const r=n.createContext(1,e,t),l=[_a(e,a,t)],c=[i];if(s.length%2!=0)throw new ee(K.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)l.push(_a(e,s[v])),c.push(s[v+1]);const u=[],g=Pt.empty();for(let v=l.length-1;v>=0;--v)if(!Pm(u,l[v])){const P=l[v];let N=c[v];N=Fe(N);const O=r.childContextForFieldPath(P);if(N instanceof yr)u.push(P);else{const E=Zi(N,O);E!=null&&(u.push(P),g.set(P,E))}}const x=new Mt(u);return new Im(g,x,r.fieldTransforms)}function $w(n,e,t,a=!1){return Zi(t,n.createContext(a?4:3,e))}function Zi(n,e){if(Cm(n=Fe(n)))return wl("Unsupported field value:",e,n),Am(n,e);if(n instanceof vl)return(function(a,i){if(!km(i.dataSource))throw i.createError(`${a._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${a._methodName}() is not currently supported inside arrays`);const s=a._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(a,i){const s=[];let r=0;for(const l of a){let c=Zi(l,i.childContextForArray(r));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),r++}return{arrayValue:{values:s}}})(n,e)}return(function(a,i){if((a=Fe(a))===null)return{nullValue:"NULL_VALUE"};if(typeof a=="number")return fb(i.serializer,a);if(typeof a=="boolean")return{booleanValue:a};if(typeof a=="string")return{stringValue:a};if(a instanceof Date){const s=ye.fromDate(a);return{timestampValue:qs(i.serializer,s)}}if(a instanceof ye){const s=new ye(a.seconds,1e3*Math.floor(a.nanoseconds/1e3));return{timestampValue:qs(i.serializer,s)}}if(a instanceof rn)return{geoPointValue:{latitude:a.latitude,longitude:a.longitude}};if(a instanceof zt)return{bytesValue:Gp(i.serializer,a._byteString)};if(a instanceof Qe){const s=i.databaseId,r=a.firestore._databaseId;if(!r.isEqual(s))throw i.createError(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Zo(a.firestore._databaseId||i.databaseId,a._key.path)}}if(a instanceof Wt)return(function(r,l){const c=r instanceof Wt?r.toArray():r;return{mapValue:{fields:{[_p]:{stringValue:Ep},[Bs]:{arrayValue:{values:c.map((g=>{if(typeof g!="number")throw l.createError("VectorValues must only contain numeric values.");return Qo(l.serializer,g)}))}}}}}})(a,i);if(em(a))return a._toProto(i.serializer);throw i.createError(`Unsupported field value: ${tr(a)}`)})(n,e)}function Am(n,e){const t={};return gp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ea(n,((a,i)=>{const s=Zi(i,e.childContextForField(a));s!=null&&(t[a]=s)})),{mapValue:{fields:t}}}function Cm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ye||n instanceof rn||n instanceof zt||n instanceof Qe||n instanceof vl||n instanceof Wt||em(n))}function wl(n,e,t){if(!Cm(t)||!hp(t)){const a=tr(t);throw a==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+a)}}function _a(n,e,t){if((e=Fe(e))instanceof yl)return e._internalPath;if(typeof e=="string")return Sm(n,e);throw Qs("Field path arguments must be of type string or ",n,!1,void 0,t)}const Dw=new RegExp("[~\\*/\\[\\]]");function Sm(n,e,t){if(e.search(Dw)>=0)throw Qs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new yl(...e.split("."))._internalPath}catch{throw Qs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Qs(n,e,t,a,i){const s=a&&!a.isEmpty(),r=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||r)&&(c+=" (found",s&&(c+=` in field ${a}`),r&&(c+=` in document ${i}`),c+=")"),new ee(K.INVALID_ARGUMENT,l+n+c)}function Pm(n,e){return n.some((t=>t.isEqual(e)))}class Nw{convertValue(e,t="none"){switch(Gn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return et(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Wn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ce(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const a={};return ea(e,((i,s)=>{a[i]=this.convertValue(s,t)})),a}convertVectorValue(e){const t=e.fields?.[Bs].arrayValue?.values?.map((a=>et(a.doubleValue)));return new Wt(t)}convertGeoPoint(e){return new rn(et(e.latitude),et(e.longitude))}convertArray(e,t){return(e.values||[]).map((a=>this.convertValue(a,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const a=ir(e);return a==null?null:this.convertValue(a,t);case"estimate":return this.convertTimestamp(Ni(e));default:return null}}convertTimestamp(e){const t=Hn(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){const a=Me.fromString(e);Pe(Zp(a),9688,{name:e});const i=new Mi(a.get(1),a.get(3)),s=new re(a.popFirst(5));return i.isEqual(t)||bn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}class xl extends Nw{constructor(e){super(),this.firestore=e}convertBytes(e){return new zt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Qe(this.firestore,null,t)}}const qd="@firebase/firestore",Hd="4.11.0";function Wd(n){return(function(t,a){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of a)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}class Rm{constructor(e,t,a,i,s){this._firestore=e,this._userDataWriter=t,this._key=a,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Qe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Mw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(_a("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Mw extends Rm{data(){return super.data()}}function Lm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new ee(K.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class _l{}class El extends _l{}function Fn(n,e,...t){let a=[];e instanceof _l&&a.push(e),a=a.concat(t),(function(s){const r=s.filter((c=>c instanceof Il)).length,l=s.filter((c=>c instanceof vr)).length;if(r>1||r>0&&l>0)throw new ee(K.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(a);for(const i of a)n=i._apply(n);return n}class vr extends El{constructor(e,t,a){super(),this._field=e,this._op=t,this._value=a,this.type="where"}static _create(e,t,a){return new vr(e,t,a)}_apply(e){const t=this._parse(e);return $m(e._query,t),new _n(e.firestore,e.converter,fo(e._query,t))}_parse(e){const t=gr(e.firestore);return(function(s,r,l,c,u,g,x){let v;if(u.isKeyField()){if(g==="array-contains"||g==="array-contains-any")throw new ee(K.INVALID_ARGUMENT,`Invalid Query. You can't perform '${g}' queries on documentId().`);if(g==="in"||g==="not-in"){Kd(x,g);const N=[];for(const O of x)N.push(Gd(c,s,O));v={arrayValue:{values:N}}}else v=Gd(c,s,x)}else g!=="in"&&g!=="not-in"&&g!=="array-contains-any"||Kd(x,g),v=$w(l,r,x,g==="in"||g==="not-in");return at.create(u,g,v)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Un(n,e,t){const a=e,i=_a("where",n);return vr._create(i,a,t)}class Il extends _l{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Il(e,t)}_parse(e){const t=this._queryConstraints.map((a=>a._parse(e))).filter((a=>a.getFilters().length>0));return t.length===1?t[0]:Kt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let r=i;const l=s.getFlattenedFilters();for(const c of l)$m(r,c),r=fo(r,c)})(e._query,t),new _n(e.firestore,e.converter,fo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class kl extends El{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new kl(e,t)}_apply(e){const t=(function(i,s,r){if(i.startAt!==null)throw new ee(K.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new ee(K.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Vi(s,r)})(e._query,this._field,this._direction);return new _n(e.firestore,e.converter,ob(e._query,t))}}function Ow(n,e="asc"){const t=e,a=_a("orderBy",n);return kl._create(a,t)}class Tl extends El{constructor(e,t,a){super(),this.type=e,this._limit=t,this._limitType=a}static _create(e,t,a){return new Tl(e,t,a)}_apply(e){return new _n(e.firestore,e.converter,Fs(e._query,this._limit,this._limitType))}}function Vw(n){return Tl._create("limit",n,"F")}function Gd(n,e,t){if(typeof(t=Fe(t))=="string"){if(t==="")throw new ee(K.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Rp(e)&&t.indexOf("/")!==-1)throw new ee(K.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const a=e.path.child(Me.fromString(t));if(!re.isDocumentKey(a))throw new ee(K.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${a}' is not because it has an odd number of segments (${a.length}).`);return od(n,new re(a))}if(t instanceof Qe)return od(n,t._key);throw new ee(K.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${tr(t)}.`)}function Kd(n,e){if(!Array.isArray(n)||n.length===0)throw new ee(K.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function $m(n,e){const t=(function(i,s){for(const r of i)for(const l of r.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new ee(K.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new ee(K.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Dm(n,e,t){let a;return a=n?n.toFirestore(e):e,a}class Ei{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class da extends Rm{constructor(e,t,a,i,s,r){super(e,t,a,i,r),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Cs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const a=this._document.data.field(_a("DocumentSnapshot.get",e));if(a!==null)return this._userDataWriter.convertValue(a,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new ee(K.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=da._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}da._jsonSchemaVersion="firestore/documentSnapshot/1.0",da._jsonSchema={type:it("string",da._jsonSchemaVersion),bundleSource:it("string","DocumentSnapshot"),bundleName:it("string"),bundle:it("string")};class Cs extends da{data(e={}){return super.data(e)}}class ua{constructor(e,t,a,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ei(i.hasPendingWrites,i.fromCache),this.query=a}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((a=>{e.call(t,new Cs(this._firestore,this._userDataWriter,a.key,a,new Ei(this._snapshot.mutatedKeys.has(a.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new ee(K.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let r=0;return i._snapshot.docChanges.map((l=>{const c=new Cs(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ei(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:r++}}))}{let r=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((l=>s||l.type!==3)).map((l=>{const c=new Cs(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ei(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,g=-1;return l.type!==0&&(u=r.indexOf(l.doc.key),r=r.delete(l.doc.key)),l.type!==1&&(r=r.add(l.doc),g=r.indexOf(l.doc.key)),{type:Bw(l.type),doc:c,oldIndex:u,newIndex:g}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new ee(K.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ua._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=jo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],a=[],i=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),a.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Bw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ce(61501,{type:n})}}ua._jsonSchemaVersion="firestore/querySnapshot/1.0",ua._jsonSchema={type:it("string",ua._jsonSchemaVersion),bundleSource:it("string","QuerySnapshot"),bundleName:it("string"),bundle:it("string")};function zw(n){n=Rt(n,Qe);const e=Rt(n.firestore,xn),t=fr(e);return ww(t,n._key).then((a=>Nm(e,n,a)))}function Fw(n){n=Rt(n,_n);const e=Rt(n.firestore,xn),t=fr(e),a=new xl(e);return Lm(n._query),xw(t,n._query).then((i=>new ua(e,a,n,i)))}function Uw(n,e,t){n=Rt(n,Qe);const a=Rt(n.firestore,xn),i=Dm(n.converter,e),s=gr(a);return br(a,[Tm(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ft.none())])}function jw(n,e,t,...a){n=Rt(n,Qe);const i=Rt(n.firestore,xn),s=gr(i);let r;return r=typeof(e=Fe(e))=="string"||e instanceof yl?Lw(s,"updateDoc",n._key,e,t,a):Rw(s,"updateDoc",n._key,e),br(i,[r.toMutation(n._key,Ft.exists(!0))])}function qw(n){return br(Rt(n.firestore,xn),[new Yo(n._key,Ft.none())])}function Hw(n,e){const t=Rt(n.firestore,xn),a=_i(n),i=Dm(n.converter,e),s=gr(n.firestore);return br(t,[Tm(s,"addDoc",a._key,i,n.converter!==null,{}).toMutation(a._key,Ft.exists(!1))]).then((()=>a))}function Fi(n,...e){n=Fe(n);let t={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Wd(e[a])||(t=e[a++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Wd(e[a])){const u=e[a];e[a]=u.next?.bind(u),e[a+1]=u.error?.bind(u),e[a+2]=u.complete?.bind(u)}let s,r,l;if(n instanceof Qe)r=Rt(n.firestore,xn),l=sr(n._key.path),s={next:u=>{e[a]&&e[a](Nm(r,n,u))},error:e[a+1],complete:e[a+2]};else{const u=Rt(n,_n);r=Rt(u.firestore,xn),l=u._query;const g=new xl(r);s={next:x=>{e[a]&&e[a](new ua(r,g,u,x))},error:e[a+1],complete:e[a+2]},Lm(n._query)}const c=fr(r);return bw(c,l,i,s)}function br(n,e){const t=fr(n);return _w(t,e)}function Nm(n,e,t){const a=t.docs.get(e._key),i=new xl(n);return new da(n,i,e._key,a,new Ei(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){xv(Ia),fa(new jn("firestore",((a,{instanceIdentifier:i,options:s})=>{const r=a.getProvider("app").getImmediate(),l=new xn(new Iv(a.getProvider("auth-internal")),new Av(r,a.getProvider("app-check-internal")),qv(r,i),r);return s={useFetchStreams:t,...s},l._setSettings(s),l}),"PUBLIC").setMultipleInstances(!0)),en(qd,Hd,e),en(qd,Hd,"esm2020")})();const Mm="firebasestorage.googleapis.com",Om="storageBucket",Ww=120*1e3,Gw=600*1e3;class Je extends ln{constructor(e,t,a=0){super(Wr(e),`Firebase Storage: ${t} (${Wr(e)})`),this.status_=a,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Je.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Wr(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ye;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ye||(Ye={}));function Wr(n){return"storage/"+n}function Al(){const n="An unknown error occurred, please check the error payload for server response.";return new Je(Ye.UNKNOWN,n)}function Kw(n){return new Je(Ye.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function Qw(n){return new Je(Ye.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Yw(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Je(Ye.UNAUTHENTICATED,n)}function Jw(){return new Je(Ye.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Xw(n){return new Je(Ye.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Zw(){return new Je(Ye.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ex(){return new Je(Ye.CANCELED,"User canceled the upload/download.")}function tx(n){return new Je(Ye.INVALID_URL,"Invalid URL '"+n+"'.")}function nx(n){return new Je(Ye.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function ax(){return new Je(Ye.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Om+"' property when initializing the app?")}function ix(){return new Je(Ye.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function sx(){return new Je(Ye.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function rx(n){return new Je(Ye.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ko(n){return new Je(Ye.INVALID_ARGUMENT,n)}function Vm(){return new Je(Ye.APP_DELETED,"The Firebase app was deleted.")}function ox(n){return new Je(Ye.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Pi(n,e){return new Je(Ye.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function mi(n){throw new Je(Ye.INTERNAL_ERROR,"Internal error: "+n)}class Ot{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let a;try{a=Ot.makeFromUrl(e,t)}catch{return new Ot(e,"")}if(a.path==="")return a;throw nx(e)}static makeFromUrl(e,t){let a=null;const i="([A-Za-z0-9.\\-_]+)";function s(_){_.path.charAt(_.path.length-1)==="/"&&(_.path_=_.path_.slice(0,-1))}const r="(/(.*))?$",l=new RegExp("^gs://"+i+r,"i"),c={bucket:1,path:3};function u(_){_.path_=decodeURIComponent(_.path)}const g="v[A-Za-z0-9_]+",x=t.replace(/[.]/g,"\\."),v="(/([^?#]*).*)?$",P=new RegExp(`^https?://${x}/${g}/b/${i}/o${v}`,"i"),N={bucket:1,path:3},O=t===Mm?"(?:storage.googleapis.com|storage.cloud.google.com)":t,E="([^?#]*)",k=new RegExp(`^https?://${O}/${i}/${E}`,"i"),S=[{regex:l,indices:c,postModify:s},{regex:P,indices:N,postModify:u},{regex:k,indices:{bucket:1,path:2},postModify:u}];for(let _=0;_<S.length;_++){const R=S[_],M=R.regex.exec(e);if(M){const p=M[R.indices.bucket];let m=M[R.indices.path];m||(m=""),a=new Ot(p,m),R.postModify(a);break}}if(a==null)throw tx(e);return a}}class lx{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function cx(n,e,t){let a=1,i=null,s=null,r=!1,l=0;function c(){return l===2}let u=!1;function g(...E){u||(u=!0,e.apply(null,E))}function x(E){i=setTimeout(()=>{i=null,n(P,c())},E)}function v(){s&&clearTimeout(s)}function P(E,...k){if(u){v();return}if(E){v(),g.call(null,E,...k);return}if(c()||r){v(),g.call(null,E,...k);return}a<64&&(a*=2);let S;l===1?(l=2,S=0):S=(a+Math.random())*1e3,x(S)}let N=!1;function O(E){N||(N=!0,v(),!u&&(i!==null?(E||(l=2),clearTimeout(i),x(0)):E||(l=1)))}return x(0),s=setTimeout(()=>{r=!0,O(!0)},t),O}function dx(n){n(!1)}function ux(n){return n!==void 0}function px(n){return typeof n=="object"&&!Array.isArray(n)}function Cl(n){return typeof n=="string"||n instanceof String}function Qd(n){return Sl()&&n instanceof Blob}function Sl(){return typeof Blob<"u"}function Yd(n,e,t,a){if(a<e)throw ko(`Invalid value for '${n}'. Expected ${e} or greater.`);if(a>t)throw ko(`Invalid value for '${n}'. Expected ${t} or less.`)}function wr(n,e,t){let a=e;return t==null&&(a=`https://${e}`),`${t}://${a}/v0${n}`}function Bm(n){const e=encodeURIComponent;let t="?";for(const a in n)if(n.hasOwnProperty(a)){const i=e(a)+"="+e(n[a]);t=t+i+"&"}return t=t.slice(0,-1),t}var pa;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(pa||(pa={}));function mx(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}class hx{constructor(e,t,a,i,s,r,l,c,u,g,x,v=!0,P=!1){this.url_=e,this.method_=t,this.headers_=a,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=r,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=g,this.connectionFactory_=x,this.retry=v,this.isUsingEmulator=P,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((N,O)=>{this.resolve_=N,this.reject_=O,this.start_()})}start_(){const e=(a,i)=>{if(i){a(!1,new fs(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const r=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&s.addUploadProgressListener(r),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(r),this.pendingConnection_=null;const l=s.getErrorCode()===pa.NO_ERROR,c=s.getStatus();if(!l||mx(c,this.additionalRetryCodes_)&&this.retry){const g=s.getErrorCode()===pa.ABORT;a(!1,new fs(!1,null,g));return}const u=this.successCodes_.indexOf(c)!==-1;a(!0,new fs(u,s))})},t=(a,i)=>{const s=this.resolve_,r=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());ux(c)?s(c):s()}catch(c){r(c)}else if(l!==null){const c=Al();c.serverResponse=l.getErrorText(),this.errorCallback_?r(this.errorCallback_(l,c)):r(c)}else if(i.canceled){const c=this.appDelete_?Vm():ex();r(c)}else{const c=Zw();r(c)}};this.canceled_?t(!1,new fs(!1,null,!0)):this.backoffId_=cx(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&dx(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class fs{constructor(e,t,a){this.wasSuccessCode=e,this.connection=t,this.canceled=!!a}}function fx(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function gx(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function yx(n,e){e&&(n["X-Firebase-GMPID"]=e)}function vx(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function bx(n,e,t,a,i,s,r=!0,l=!1){const c=Bm(n.urlParams),u=n.url+c,g=Object.assign({},n.headers);return yx(g,e),fx(g,t),gx(g,s),vx(g,a),new hx(u,n.method,g,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,r,l)}function wx(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function xx(...n){const e=wx();if(e!==void 0){const t=new e;for(let a=0;a<n.length;a++)t.append(n[a]);return t.getBlob()}else{if(Sl())return new Blob(n);throw new Je(Ye.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function _x(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}function Ex(n){if(typeof atob>"u")throw rx("base-64");return atob(n)}const Zt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Gr{constructor(e,t){this.data=e,this.contentType=t||null}}function Ix(n,e){switch(n){case Zt.RAW:return new Gr(zm(e));case Zt.BASE64:case Zt.BASE64URL:return new Gr(Fm(n,e));case Zt.DATA_URL:return new Gr(Tx(e),Ax(e))}throw Al()}function zm(n){const e=[];for(let t=0;t<n.length;t++){let a=n.charCodeAt(t);if(a<=127)e.push(a);else if(a<=2047)e.push(192|a>>6,128|a&63);else if((a&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=a,r=n.charCodeAt(++t);a=65536|(s&1023)<<10|r&1023,e.push(240|a>>18,128|a>>12&63,128|a>>6&63,128|a&63)}else(a&64512)===56320?e.push(239,191,189):e.push(224|a>>12,128|a>>6&63,128|a&63)}return new Uint8Array(e)}function kx(n){let e;try{e=decodeURIComponent(n)}catch{throw Pi(Zt.DATA_URL,"Malformed data URL.")}return zm(e)}function Fm(n,e){switch(n){case Zt.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Pi(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Zt.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Pi(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Ex(e)}catch(i){throw i.message.includes("polyfill")?i:Pi(n,"Invalid character found")}const a=new Uint8Array(t.length);for(let i=0;i<t.length;i++)a[i]=t.charCodeAt(i);return a}class Um{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Pi(Zt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const a=t[1]||null;a!=null&&(this.base64=Cx(a,";base64"),this.contentType=this.base64?a.substring(0,a.length-7):a),this.rest=e.substring(e.indexOf(",")+1)}}function Tx(n){const e=new Um(n);return e.base64?Fm(Zt.BASE64,e.rest):kx(e.rest)}function Ax(n){return new Um(n).contentType}function Cx(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}class Nn{constructor(e,t){let a=0,i="";Qd(e)?(this.data_=e,a=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),a=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),a=e.length),this.size_=a,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Qd(this.data_)){const a=this.data_,i=_x(a,e,t);return i===null?null:new Nn(i)}else{const a=new Uint8Array(this.data_.buffer,e,t-e);return new Nn(a,!0)}}static getBlob(...e){if(Sl()){const t=e.map(a=>a instanceof Nn?a.data_:a);return new Nn(xx.apply(null,t))}else{const t=e.map(r=>Cl(r)?Ix(Zt.RAW,r).data:r.data_);let a=0;t.forEach(r=>{a+=r.byteLength});const i=new Uint8Array(a);let s=0;return t.forEach(r=>{for(let l=0;l<r.length;l++)i[s++]=r[l]}),new Nn(i,!0)}}uploadData(){return this.data_}}function jm(n){let e;try{e=JSON.parse(n)}catch{return null}return px(e)?e:null}function Sx(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Px(n,e){const t=e.split("/").filter(a=>a.length>0).join("/");return n.length===0?t:n+"/"+t}function qm(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}function Rx(n,e){return e}class Tt{constructor(e,t,a,i){this.server=e,this.local=t||e,this.writable=!!a,this.xform=i||Rx}}let gs=null;function Lx(n){return!Cl(n)||n.length<2?n:qm(n)}function Hm(){if(gs)return gs;const n=[];n.push(new Tt("bucket")),n.push(new Tt("generation")),n.push(new Tt("metageneration")),n.push(new Tt("name","fullPath",!0));function e(s,r){return Lx(r)}const t=new Tt("name");t.xform=e,n.push(t);function a(s,r){return r!==void 0?Number(r):r}const i=new Tt("size");return i.xform=a,n.push(i),n.push(new Tt("timeCreated")),n.push(new Tt("updated")),n.push(new Tt("md5Hash",null,!0)),n.push(new Tt("cacheControl",null,!0)),n.push(new Tt("contentDisposition",null,!0)),n.push(new Tt("contentEncoding",null,!0)),n.push(new Tt("contentLanguage",null,!0)),n.push(new Tt("contentType",null,!0)),n.push(new Tt("metadata","customMetadata",!0)),gs=n,gs}function $x(n,e){function t(){const a=n.bucket,i=n.fullPath,s=new Ot(a,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function Dx(n,e,t){const a={};a.type="file";const i=t.length;for(let s=0;s<i;s++){const r=t[s];a[r.local]=r.xform(a,e[r.server])}return $x(a,n),a}function Wm(n,e,t){const a=jm(e);return a===null?null:Dx(n,a,t)}function Nx(n,e,t,a){const i=jm(e);if(i===null||!Cl(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const r=encodeURIComponent;return s.split(",").map(u=>{const g=n.bucket,x=n.fullPath,v="/b/"+r(g)+"/o/"+r(x),P=wr(v,t,a),N=Bm({alt:"media",token:u});return P+N})[0]}function Mx(n,e){const t={},a=e.length;for(let i=0;i<a;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class Pl{constructor(e,t,a,i){this.url=e,this.method=t,this.handler=a,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function Gm(n){if(!n)throw Al()}function Ox(n,e){function t(a,i){const s=Wm(n,i,e);return Gm(s!==null),s}return t}function Vx(n,e){function t(a,i){const s=Wm(n,i,e);return Gm(s!==null),Nx(s,i,n.host,n._protocol)}return t}function Km(n){function e(t,a){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=Jw():i=Yw():t.getStatus()===402?i=Qw(n.bucket):t.getStatus()===403?i=Xw(n.path):i=a,i.status=t.getStatus(),i.serverResponse=a.serverResponse,i}return e}function Qm(n){const e=Km(n);function t(a,i){let s=e(a,i);return a.getStatus()===404&&(s=Kw(n.path)),s.serverResponse=i.serverResponse,s}return t}function Bx(n,e,t){const a=e.fullServerUrl(),i=wr(a,n.host,n._protocol),s="GET",r=n.maxOperationRetryTime,l=new Pl(i,s,Vx(n,t),r);return l.errorHandler=Qm(e),l}function zx(n,e){const t=e.fullServerUrl(),a=wr(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function r(c,u){}const l=new Pl(a,i,r,s);return l.successCodes=[200,204],l.errorHandler=Qm(e),l}function Fx(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Ux(n,e,t){const a=Object.assign({},t);return a.fullPath=n.path,a.size=e.size(),a.contentType||(a.contentType=Fx(null,e)),a}function jx(n,e,t,a,i){const s=e.bucketOnlyServerUrl(),r={"X-Goog-Upload-Protocol":"multipart"};function l(){let S="";for(let _=0;_<2;_++)S=S+Math.random().toString().slice(2);return S}const c=l();r["Content-Type"]="multipart/related; boundary="+c;const u=Ux(e,a,i),g=Mx(u,t),x="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+g+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,v=`\r
--`+c+"--",P=Nn.getBlob(x,a,v);if(P===null)throw ix();const N={name:u.fullPath},O=wr(s,n.host,n._protocol),E="POST",k=n.maxUploadRetryTime,T=new Pl(O,E,Ox(n,t),k);return T.urlParams=N,T.headers=r,T.body=P.uploadData(),T.errorHandler=Km(e),T}class qx{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=pa.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=pa.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=pa.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,a,i,s){if(this.sent_)throw mi("cannot .send() more than once");if(Jn(e)&&a&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const r in s)s.hasOwnProperty(r)&&this.xhr_.setRequestHeader(r,s[r].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw mi("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw mi("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw mi("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw mi("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Hx extends qx{initXhr(){this.xhr_.responseType="text"}}function Rl(){return new Hx}class Ea{constructor(e,t){this._service=e,t instanceof Ot?this._location=t:this._location=Ot.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Ea(e,t)}get root(){const e=new Ot(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return qm(this._location.path)}get storage(){return this._service}get parent(){const e=Sx(this._location.path);if(e===null)return null;const t=new Ot(this._location.bucket,e);return new Ea(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw ox(e)}}function Wx(n,e,t){n._throwIfRoot("uploadBytes");const a=jx(n.storage,n._location,Hm(),new Nn(e,!0),t);return n.storage.makeRequestWithTokens(a,Rl).then(i=>({metadata:i,ref:n}))}function Gx(n){n._throwIfRoot("getDownloadURL");const e=Bx(n.storage,n._location,Hm());return n.storage.makeRequestWithTokens(e,Rl).then(t=>{if(t===null)throw sx();return t})}function Kx(n){n._throwIfRoot("deleteObject");const e=zx(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Rl)}function Qx(n,e){const t=Px(n._location.path,e),a=new Ot(n._location.bucket,t);return new Ea(n.storage,a)}function Yx(n){return/^[A-Za-z]+:\/\//.test(n)}function Jx(n,e){return new Ea(n,e)}function Ym(n,e){if(n instanceof Ll){const t=n;if(t._bucket==null)throw ax();const a=new Ea(t,t._bucket);return e!=null?Ym(a,e):a}else return e!==void 0?Qx(n,e):n}function Xx(n,e){if(e&&Yx(e)){if(n instanceof Ll)return Jx(n,e);throw ko("To use ref(service, url), the first argument must be a Storage instance.")}else return Ym(n,e)}function Jd(n,e){const t=e?.[Om];return t==null?null:Ot.makeFromBucketSpec(t,n)}function Zx(n,e,t,a={}){n.host=`${e}:${t}`;const i=Jn(e);i&&(Ao(`https://${n.host}/b`),Co("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:s}=a;s&&(n._overrideAuthToken=typeof s=="string"?s:wu(s,n.app.options.projectId))}class Ll{constructor(e,t,a,i,s,r=!1){this.app=e,this._authProvider=t,this._appCheckProvider=a,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=r,this._bucket=null,this._host=Mm,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ww,this._maxUploadRetryTime=Gw,this._requests=new Set,i!=null?this._bucket=Ot.makeFromBucketSpec(i,this._host):this._bucket=Jd(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ot.makeFromBucketSpec(this._url,e):this._bucket=Jd(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Yd("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Yd("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Nt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Ea(this,e)}_makeRequest(e,t,a,i,s=!0){if(this._deleted)return new lx(Vm());{const r=bx(e,this._appId,a,i,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(r),r.getPromise().then(()=>this._requests.delete(r),()=>this._requests.delete(r)),r}}async makeRequestWithTokens(e,t){const[a,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,a,i).getPromise()}}const Xd="@firebase/storage",Zd="0.14.0";const Jm="storage";function Ua(n,e,t){return n=Fe(n),Wx(n,e,t)}function ma(n){return n=Fe(n),Gx(n)}function e_(n){return n=Fe(n),Kx(n)}function fn(n,e){return n=Fe(n),Xx(n,e)}function t_(n=Lo(),e){n=Fe(n);const a=Js(n,Jm).getImmediate({identifier:e}),i=yu("storage");return i&&n_(a,...i),a}function n_(n,e,t,a={}){Zx(n,e,t,a)}function a_(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),a=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Ll(t,a,i,e,Ia)}function i_(){fa(new jn(Jm,a_,"PUBLIC").setMultipleInstances(!0)),en(Xd,Zd,""),en(Xd,Zd,"esm2020")}i_();const Xm={apiKey:"AIzaSyAOV2Dz0mrJAIT2DLQsrLCTC2bLO7lkzmI",authDomain:"conectacidade-5e46d.firebaseapp.com",projectId:"conectacidade-5e46d",storageBucket:"conectacidade-5e46d.firebasestorage.app",messagingSenderId:"740343372037",appId:"1:740343372037:web:a74dcf684844bc9167ff6c",measurementId:"G-GH3W7LBTWZ"},$l=Ro(Xm),Kr=Fo($l),qt=Tw($l),gn=t_($l),V={async create(n,e){const t=xa(qt,n);return(await Hw(t,{...e,createdAt:ye.now()})).id},async set(n,e,t){const a=_i(qt,n,e);await Uw(a,{...t,createdAt:ye.now()})},async getAll(n,e){const t=xa(qt,n);let a=Fn(t);if(e)if(Array.isArray(e)){const s=e.map(r=>Un(r.field,r.operator,r.value));a=Fn(t,...s)}else a=Fn(t,Un(e.field,e.operator,e.value));return(await Fw(a)).docs.map(s=>({id:s.id,...s.data()}))},async get(n,e){const t=_i(qt,n,e),a=await zw(t);return a.exists()?{id:a.id,...a.data()}:null},async update(n,e,t){const a=_i(qt,n,e);await jw(a,t)},async delete(n,e){const t=_i(qt,n,e);await qw(t)}},s_=Object.freeze(Object.defineProperty({__proto__:null,dbService:V},Symbol.toStringTag,{value:"Module"}));class r_{currentUser=null;listeners=[];constructor(){ry(Kr,async e=>{if(e)if(e.email==="ginannymoreira@gmail.com")this.currentUser={uid:e.uid,email:e.email,role:"admin"};else try{const t=await V.get("users",e.uid);if(t){const a=t;if(a.companyId){const s=await V.get("companies",a.companyId);if(s&&s.status==="inactive"){await this.logout();const{toast:r}=await Xr(async()=>{const{toast:l}=await Promise.resolve().then(()=>tu);return{toast:l}},void 0);r.error("Seu acesso de cliente foi desativado. Entre em contato com o administrador.");return}}this.currentUser={uid:e.uid,email:e.email,role:a.role,companyId:a.companyId,storeId:a.storeId,storeIds:a.storeIds}}else{console.warn("User authenticated but not found in DB",e.uid),await this.logout();const{toast:a}=await Xr(async()=>{const{toast:i}=await Promise.resolve().then(()=>tu);return{toast:i}},void 0);a.error("Sua conta não foi encontrada ou foi removida."),this.currentUser=null}}catch(t){console.error("Error fetching user profile:",t),this.currentUser=null}else this.currentUser=null;this.notifyListeners()})}async login(e,t){await ay(Kr,e,t)}async logout(){await oy(Kr)}async registerUser(e,t){const a=Ro(Xm,"Secondary"),i=Fo(a);return(await ny(i,e,t)).user.uid}getCurrentUser(){return this.currentUser}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notifyListeners(){this.listeners.forEach(e=>e(this.currentUser))}}const Ae=new r_,o_=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,a=!1,i=!1;if(n&&n.companyId)try{const l=(await V.get("companies",n.companyId))?.modulos_ativos||["venda"];l.includes("venda")&&(e=!0),l.includes("agendamento")&&(t=!0),l.includes("disparo")&&(a=!0),l.includes("catalogo")&&(i=!0)}catch(s){console.error("Error fetching company for sidebar:",s)}return i?`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel do Dono</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${a?`
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                `:""}

                <div class="nav-divider"></div>

                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>
                <a href="/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-user"></i></span>
                    <span>Equipe</span>
                </a>
                <a href="/instances" class="nav-item">
                    <span class="icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span>Instâncias</span>
                </a>
                <a href="/catalog-settings" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-sliders"></i></span>
                    <span>Configuração</span>
                </a>
                <a href="/mercado-pago" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span>Mercado Pago</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">DO</div>
                    <div class="user-info">
                        <span class="name">Dono da Empresa</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
        `:`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel do Dono</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                
                ${e?`
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                `:""}



                <a href="/stores" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-store"></i></span>
                    <span>Lojas</span>
                </a>

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>

                ${t?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule-clients" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                `:""}

                ${a?`
                <a href="/campaigns" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-bullhorn"></i></span>
                    <span>Campanhas</span>
                </a>
                `:""}
                
                <div class="nav-divider"></div>
                
                <a href="/users" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-user"></i></span>
                    <span>Equipe</span>
                </a>
                <a href="/instances" class="nav-item">
                    <span class="icon"><i class="fa-brands fa-whatsapp"></i></span>
                    <span>Instâncias</span>
                </a>
                <a href="/configuration" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-gear"></i></span>
                    <span>Configurações</span>
                </a>
                <a href="/mercado-pago" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-credit-card"></i></span>
                    <span>Mercado Pago</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">DO</div>
                    <div class="user-info">
                        <span class="name">Dono da Empresa</span><br>
                        <span class="role">Owner</span>
                    </div>
                </div>
            </div>
        </div>
    `},l_=async()=>{const n=Ae.getCurrentUser();let e=!1,t=!1,a=!1;if(n&&n.companyId)try{const r=(await V.get("companies",n.companyId))?.modulos_ativos||["venda"];r.includes("venda")&&(e=!0),r.includes("agendamento")&&(t=!0),r.includes("catalogo")&&(a=!0)}catch(i){console.error("Error fetching company for employee sidebar:",i)}return a?`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel Equipe</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-clipboard-list"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">EQ</div>
                    <div class="user-info">
                        <span class="name">Colaborador</span><br>
                        <span class="role">Staff</span>
                    </div>
                </div>
            </div>
        </div>
        `:`
        <div class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-icon"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                <span class="logo-text">Painel Equipe</span>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                    <span>Dashboard</span>
                </a>

                ${e?`
                <a href="/orders" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-cart-shopping"></i></span>
                    <span>Pedidos</span>
                    <span id="orders-count-badge" class="count-badge hidden">0</span>
                </a>
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-box"></i></span>
                    <span>Produtos</span>
                </a>
                `:""}

                ${t?`
                <a href="/products" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-list-check"></i></span>
                    <span>Serviços</span>
                </a>
                <a href="/schedule-clients" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-users"></i></span>
                    <span>Clientes</span>
                </a>
                <a href="/schedule" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-calendar-alt"></i></span>
                    <span>Agenda</span>
                </a>
                `:""}

                <a href="/leads" class="nav-item">
                    <span class="icon"><i class="fa-solid fa-people-group"></i></span>
                    <span>Leads</span>
                </a>
            </nav>
            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="avatar">EQ</div>
                    <div class="user-info">
                        <span class="name">Colaborador</span><br>
                        <span class="role">Staff</span>
                    </div>
                </div>
            </div>
        </div>
    `},c_=n=>`
        <div class="topbar glass">
            <div class="topbar-left">
                <h2 class="page-title">${n}</h2>
            </div>
            <div class="topbar-right">
                <div class="search-bar">
                    <span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Buscar...">
                </div>
                <button id="theme-toggle-btn" class="theme-toggle-btn" title="Alternar tema">
                    <i class="fa-solid fa-moon" id="theme-icon"></i>
                </button>
                <button id="logout-btn" class="logout-btn" title="Sair">
                    <span class="icon"><i style="color: #FFF; font-size: 1.0rem;" class="fa-solid fa-arrow-right-from-bracket"></i></span>
                </button>
            </div>
        </div>
    `;function d_(){const n=localStorage.getItem("aq-theme")||"dark";eu(n);const e=document.getElementById("theme-toggle-btn");e&&e.addEventListener("click",()=>{const a=(document.documentElement.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";eu(a),localStorage.setItem("aq-theme",a)})}function eu(n){document.documentElement.setAttribute("data-theme",n);const e=document.getElementById("theme-icon");e&&(e.className=n==="light"?"fa-solid fa-sun":"fa-solid fa-moon")}const Ut="https://evolution.vps.pequi.digital",jt="1120d381afc6900754fc87d8264ed6335aeab3223b4d24810a17145399c16e46",ct={async createInstance(n){try{const e=await fetch(`${Ut}/instance/create`,{method:"POST",headers:{"Content-Type":"application/json",apikey:jt},body:JSON.stringify({instanceName:n,qrcode:!0,integration:"WHATSAPP-BAILEYS"})});if(!e.ok){const t=await e.json();throw new Error(t.message||"Failed to create instance")}return await e.json()}catch(e){throw console.error("Evolution API - Create Instance Error:",e),e}},async setWebhook(n,e,t=!0){try{const a=await fetch(`${Ut}/webhook/set/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:jt},body:JSON.stringify({webhook:{enabled:t,url:e,byEvents:!1,base64:!0,events:["MESSAGES_UPSERT"]}})});return a.ok?!0:(console.error("Evolution API - Set Webhook Error:",await a.text()),!1)}catch(a){return console.error("Evolution API - Set Webhook Exception:",a),!1}},async getInstanceStatus(n){try{const e=await fetch(`${Ut}/instance/connectionState/${n}`,{method:"GET",headers:{apikey:jt}});if(!e.ok)throw new Error("Failed to get instance status");const t=await e.json();return{state:t.state||t.instance?.state||"close",connected:t.state==="open"||t.instance?.state==="open"}}catch(e){return console.error("Evolution API - Get Status Error:",e),{state:"close",connected:!1}}},async getQRCode(n){try{const e=await fetch(`${Ut}/instance/connect/${n}`,{method:"GET",headers:{apikey:jt}});if(!e.ok)throw new Error("Failed to get QR code");const t=await e.json();return t.qrcode?.base64?{base64:t.qrcode.base64}:t.base64?{base64:t.base64}:null}catch(e){return console.error("Evolution API - Get QR Code Error:",e),null}},async deleteInstance(n){try{return(await fetch(`${Ut}/instance/delete/${n}`,{method:"DELETE",headers:{apikey:jt}})).ok}catch(e){return console.error("Evolution API - Delete Instance Error:",e),!1}},async logoutInstance(n){try{return(await fetch(`${Ut}/instance/logout/${n}`,{method:"DELETE",headers:{apikey:jt}})).ok}catch(e){return console.error("Evolution API - Logout Instance Error:",e),!1}},async instanceExists(n){try{const e=await fetch(`${Ut}/instance/fetchInstances`,{method:"GET",headers:{apikey:jt}});if(!e.ok)return!1;const t=await e.json();return Array.isArray(t)&&t.some(a=>a.instance?.instanceName===n)}catch(e){return console.error("Evolution API - Check Instance Exists Error:",e),!1}},async sendText(n,e,t){try{let a=e.replace(/\D/g,"");a.length<=11&&!a.startsWith("55")&&(a="55"+a);const i=a,s=await fetch(`${Ut}/message/sendText/${n}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:jt},body:JSON.stringify({number:i,text:t,delay:1200,linkPreview:!0})});if(!s.ok){const r=await s.json();return console.error("Evolution API - Send Text Error:",r),!1}return!0}catch(a){return console.error("Evolution API - Send Text Exception:",a),!1}}};class u_{container=null;soundEnabled=!0;constructor(){this.init()}init(){typeof window>"u"||(this.container=document.createElement("div"),this.container.id="toast-container",this.container.className="toast-container",document.body.appendChild(this.container))}playSound(e){if(this.soundEnabled)try{const t=new Audio;switch(e){case"success":t.src="/sounds/success.mp3";break;case"error":t.src="/sounds/error.mp3";break;case"warning":t.src="/sounds/warning.mp3";break;default:return}t.volume=.3,t.play().catch(()=>{})}catch{}}show(e){const{message:t,type:a="info",duration:i=3e3,sound:s=!0}=e;if(this.container||this.init(),!this.container)return;const r=document.createElement("div");r.className=`toast toast-${a}`;const l={success:"✓",error:"✕",warning:"⚠",info:"ℹ"};r.innerHTML=`
            <div class="toast-icon">${l[a]}</div>
            <div class="toast-message">${t}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `,this.container.appendChild(r),s&&this.playSound(a),setTimeout(()=>{r.classList.add("toast-exit"),setTimeout(()=>r.remove(),300)},i)}success(e,t){this.show({message:e,type:"success",duration:t})}error(e,t){this.show({message:e,type:"error",duration:t})}warning(e,t){this.show({message:e,type:"warning",duration:t})}info(e,t){this.show({message:e,type:"info",duration:t})}setSoundEnabled(e){this.soundEnabled=e}}const D=new u_,tu=Object.freeze(Object.defineProperty({__proto__:null,toast:D},Symbol.toStringTag,{value:"Module"}));window.copyToClipboard=(n,e="Link copiado!")=>{navigator.clipboard.writeText(n).then(()=>{D.success(e)}).catch(t=>{console.error("Erro ao copiar link:",t),D.error("Erro ao copiar link.")})};window.toggleStoreActive=async(n,e,t)=>{try{const a=await V.get("companies",n);if(!a)return;const s=a.stores||[],r=s.findIndex(l=>l.id===e);r!==-1&&(s[r].active=t,await V.update("companies",n,{stores:s}),D.success(`Loja ${t?"ativada":"desativada"} com sucesso!`),setTimeout(()=>location.reload(),1e3))}catch(a){console.error("Error toggling store status:",a),D.error("Erro ao alterar status da loja.")}};const p_=async()=>{const n=Ae.getCurrentUser();if(!n)return"";let e={messages:0,payments:0,orders_pending:0,orders_paid:0,today:0,openai:{usage:0,credits:0,limit:0}},t=["venda"],a=null;if(n?.role==="admin"){t=["catalogo","venda","agendamento","disparo"];try{(await V.getAll("companies")).forEach(l=>{l.metrics&&(e.messages+=l.metrics.totalMessages||0,e.payments+=l.metrics.totalPayments||0)}),e.orders_pending=15,e.orders_paid=1200;const r=await V.get("settings","openai");r?e.openai={usage:r.usage||0,credits:r.credits||0,limit:r.limit||0}:e.openai={usage:0,credits:0,limit:0}}catch(s){console.error("Error fetching dashboard data:",s)}}else if(n?.companyId)try{if(t=(await V.get("companies",n.companyId))?.modulos_ativos||["venda"],t.includes("venda")||t.includes("agendamento")){const l=await V.getAll("messages",{field:"empresaId",operator:"==",value:n.companyId}),c=n.storeIds||(n.storeId?[n.storeId]:[]);e.messages=l.filter(u=>u.role!=="assistente"?!1:n.role==="owner"?!0:u.lojaId&&c.includes(u.lojaId)).length}if(t.includes("venda")||t.includes("catalogo")){const l=await V.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId}),c=n.storeIds||(n.storeId?[n.storeId]:[]),u=n.role==="owner"?l:l.filter(P=>P.lojaId&&c.includes(P.lojaId));e.orders_pending=u.filter(P=>{const N=(P.status||"em_montagem").toLowerCase(),O=N==="finalizado"||N==="cancelado";return P.arquivado?!1:!O}).length,e.orders_paid=u.filter(P=>P.status==="finalizado").length;let g=0,x=0;const v=new Date;if(v.setHours(0,0,0,0),u.forEach(P=>{P.status==="finalizado"&&(g+=P.value||P.total||0),(P.criadoEm?.toDate?P.criadoEm.toDate():new Date(P.criadoEm||0))>=v&&x++}),e.payments=g,e.today=x,t.includes("catalogo")){const N=(await V.getAll("products",{field:"companyId",operator:"==",value:n.companyId})).filter(_=>_.stock!=null&&_.stock<=5&&_.active!==!1).sort((_,R)=>(_.stock??0)-(R.stock??0)).slice(0,10),O=new Map;u.forEach(_=>{(Array.isArray(_.items)?_.items:Array.isArray(_.itens)?_.itens:[]).forEach(M=>{const p=M.name||M.item||"Produto",m=M.qty||M.quantidade||1,y=M.price||M.preco||0,b=O.get(p)||{name:p,qty:0,revenue:0};O.set(p,{name:p,qty:b.qty+m,revenue:b.revenue+m*y})})});const E=Array.from(O.values()).sort((_,R)=>R.qty-_.qty).slice(0,5),k=new Map;u.forEach(_=>{const M=(_.criadoEm?.toDate?_.criadoEm.toDate():new Date(_.criadoEm||0)).getHours();k.set(M,(k.get(M)||0)+1)});const T=Array.from(k.entries()).sort((_,R)=>R[1]-_[1]).slice(0,3),S=e.orders_paid>0?g/e.orders_paid:0;a={lowStockProducts:N,topProducts:E,bestHours:T,avgTicket:S,totalOrders:u.length}}}}catch(s){console.error("Error fetching dashboard data:",s)}return setTimeout(()=>{n?.companyId&&i(n.companyId,n)},100),`
        <div class="page-header">
            <h2 class="page-title">Visão Geral (${n?.role==="admin"?"Global":"Cliente"})</h2>
        </div>

        <div class="dashboard-grid">
            ${n.role==="admin"?`
                <div class="stats-card card" style="border: 1px solid rgba(16,185,129,0.3); background: rgba(16,185,129,0.02);">
                    <div class="stats-icon success"><i style="color: #ffffff8f;" class="fa-solid fa-coins"></i></div>
                    <div class="stats-info">
                        <span class="label">Créditos OpenAI</span><br>
                        <span class="value" style="color:var(--success);">$ ${e.openai.credits.toFixed(2)}</span>
                    </div>
                </div>
                <div class="stats-card card" style="border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.02);">
                    <div class="stats-icon danger"><i style="color: #ffffff8f;" class="fa-solid fa-file-invoice-dollar"></i></div>
                    <div class="stats-info">
                        <span class="label">Gasto OpenAI (Mês)</span><br>
                        <span class="value" style="color:var(--danger);">$ ${e.openai.usage.toFixed(2)}</span>
                    </div>
                </div>
            `:""}
            ${t.includes("venda")||t.includes("agendamento")?`
            <div class="stats-card card">
                <div class="stats-icon primary"><i style="color: #ffffff8f;" class="fa-solid fa-message"></i></div>
                <div class="stats-info">
                    <span class="label">Mensagens pela IA</span><br>
                    <span class="value">${e.messages}</span>
                </div>
            </div>`:""}
            ${t.includes("venda")||t.includes("catalogo")?`
            <div class="stats-card card">
                <div class="stats-icon success"><i style="color: #ffffff8f;" class="fa-solid fa-money-bill"></i></div>
                <div class="stats-info">
                    <span class="label">Total em Vendas</span><br>
                    <span class="value">R$ ${e.payments.toFixed(2)}</span>
                </div>
            </div>
            <div class="stats-card card">
                <div class="stats-icon warning"><i style="color: #ffffff8f;" class="fa-solid fa-hourglass-half"></i></div>
                <div class="stats-info">
                    <span class="label">Pedidos Pendentes</span><br>
                    <span class="value">${e.orders_pending}</span>
                </div>
            </div>
            <div class="stats-card card">
                <div class="stats-icon info"><i style="color: #ffffff8f;" class="fa-solid fa-box"></i></div>
                <div class="stats-info">
                    <span class="label">Pedidos Hoje</span><br>
                    <span class="value">${e.today||0}</span>
                </div>
            </div>
            ${a?`
            <div class="stats-card card">
                <div class="stats-icon primary"><i style="color: #ffffff8f;" class="fa-solid fa-receipt"></i></div>
                <div class="stats-info">
                    <span class="label">Ticket Médio</span><br>
                    <span class="value">R$ ${a.avgTicket.toFixed(2)}</span>
                </div>
            </div>
            `:""}
            `:""}
        </div>

        ${a?`
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin-top:1.5rem;">

            <!-- Low Stock Alert -->
            <div class="card" style="border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.03);">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> Estoque Baixo
                </h4>
                ${a.lowStockProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Todos os produtos estão com estoque adequado.</p>':a.lowStockProducts.map(s=>`
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:0.85rem;font-weight:500;">${s.name}</span>
                            <span class="badge ${s.stock===0?"danger":"warning"}">${s.stock===0?"Esgotado":s.stock+" un."}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Top Selling Products -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-trophy" style="color:#f59e0b;"></i> Top 5 Produtos
                </h4>
                ${a.topProducts.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido com itens ainda.</p>':a.topProducts.map((s,r)=>`
                        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                            <span style="font-size:1rem;font-weight:900;color:${r===0?"#f59e0b":r===1?"#94a3b8":r===2?"#b45309":"var(--text-dim)"};min-width:20px;">${r+1}</span>
                            <span style="flex:1;font-size:0.85rem;font-weight:500;">${s.name}</span>
                            <span style="font-size:0.8rem;color:var(--text-muted);">${s.qty} un.</span>
                            <span style="font-size:0.8rem;color:var(--success);">R$ ${s.revenue.toFixed(2)}</span>
                        </div>
                    `).join("")}
            </div>

            <!-- Best Sales Hours -->
            <div class="card">
                <h4 style="margin:0 0 1rem;display:flex;align-items:center;gap:8px;font-size:0.95rem;">
                    <i class="fa-solid fa-chart-bar" style="color:var(--primary);"></i> Melhores Horários
                </h4>
                ${a.bestHours.length===0?'<p style="color:var(--text-muted);font-size:0.85rem;">Nenhum pedido registrado ainda.</p>':a.bestHours.map(([s,r],l)=>{const c=a.bestHours[0][1],u=Math.round(r/c*100);return`
                            <div style="margin-bottom:10px;">
                                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                                    <span style="font-size:0.85rem;font-weight:600;">${String(s).padStart(2,"0")}h – ${String(s+1).padStart(2,"0")}h</span>
                                    <span style="font-size:0.8rem;color:var(--text-muted);">${r} pedido${r!==1?"s":""}</span>
                                </div>
                                <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
                                    <div style="width:${u}%;height:100%;background:${l===0?"var(--primary)":"rgba(99,102,241,0.4)"};border-radius:3px;"></div>
                                </div>
                            </div>
                        `}).join("")}
            </div>

        </div>
        `:""}

        <div id="store-statuses-container"></div>
    `;async function i(s,r){const l=document.getElementById("store-statuses-container");if(l)try{const u=await V.get("companies",s);let g=u?.stores||[];const v=await V.getAll("instancias",{field:"empresaId",operator:"==",value:s});if(r.role!=="owner"){const N=r.storeIds||(r.storeId?[r.storeId]:[]);g=g.filter(O=>N.includes(O.id))}if(g.length===0){l.innerHTML=`
                    <div class="card" style="margin-top: 1.5rem; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2);">
                        <h3 style="color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Sistema Inoperante</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Nenhuma loja encontrada ou associada a este usuário. O sistema não pode operar.</p>
                    </div>
                `;return}let P="";for(const N of g){let O="",E=!1;const k=(N.instancia_id?v.find(R=>R.id===N.instancia_id):null)||v.find(R=>R.lojaId===N.id),T=k?.nome;if(!k||N.active===!1)O=`
                        <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-circle-xmark"></i> Loja Inoperante</p>
                                    <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">${k?"Loja desativada":"Sem instância vinculada"}.</p>
                                </div>
                                <button class="btn-primary btn-sm" onclick="toggleStoreActive('${u.id}', '${N.id}', true)">
                                    <i class="fa-solid fa-play"></i> Ativar Loja
                                </button>
                            </div>
                        </div>
                    `;else try{const R=await ct.getInstanceStatus(T);if(["open","connected","CONNECTED","ON"].includes(R.state))E=!0,O=`
                                <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: #22c55e;"><i class="fa-solid fa-circle-check"></i> Instância Conectada</p>
                                            <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">A IA e o WhatsApp estão online (Instância: ${T}).</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${u.id}', '${N.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                </div>
                            `;else{const m=await ct.getQRCode(T);O=`
                                <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--danger); margin-bottom: 1rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                        <div>
                                            <p style="margin: 0; font-weight: 600; color: var(--danger);"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</p>
                                            <p style="margin: 0.25rem 0 0.5rem 0; font-size: 0.85rem; color: var(--text-muted);">Instância: <strong>${T}</strong>. Escaneie o QR Code.</p>
                                        </div>
                                        <button class="btn-danger btn-sm" onclick="toggleStoreActive('${u.id}', '${N.id}', false)" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                                            <i class="fa-solid fa-power-off"></i> Desativar
                                        </button>
                                    </div>
                                    ${m?.base64?`<img src="${m.base64}" alt="QR" style="width:150px;height:150px;display:block;margin:0 auto;border-radius:8px; background: white; padding: 5px;">`:'<p style="font-size:0.8rem;text-align:center; padding: 20px;">QR Code indisponível no momento. Tente atualizar a página.</p>'}
                                </div>
                            `}}catch(R){console.error("Error checking instance status in dashboard:",R),O=`
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--warning); margin-bottom: 1rem;">
                                <p style="margin: 0; font-weight: 600; color: var(--warning);"><i class="fa-solid fa-circle-exclamation"></i> Erro de Comunicação</p>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">Não foi possível verificar a instância: <strong>${T}</strong>. Verifique sua conexão.</p>
                            </div>
                        `}const S=N.frete_ativo!==!1,_=k&&N.active!==!1;P+=`
                    <div class="card" style="margin-top: 1.5rem; border: 1px solid ${E?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div>
                                <h3 style="margin-bottom: 0.25rem;"><i class="fa-solid fa-store"></i> ${N.name}</h3>
                                <div style="display:flex; gap: 0.5rem; flex-wrap: wrap;">
                                    <span class="badge ${_?"success":"danger"}">${_?"Operante":"Inoperante"}</span>
                                    <span class="badge ${E?"success":"warning"}">${E?"WhatsApp Online":"WhatsApp Offline"}</span>
                                    <span class="badge ${S?"success":"warning"}">${S?"Frete Ativo":"Retirada Apenas"}</span>
                                </div>
                            </div>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${T?`
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/qr/${T}', 'Link de conexão copiado!')" title="Link para conectar WhatsApp" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px; border-color: rgba(245, 158, 11, 0.3);">
                                    <i class="fa-solid fa-qrcode" style="font-size: 0.75rem; color: var(--warning);"></i> Link QR
                                </button>
                                `:""}
                                <a href="/catalog/${N.id}" target="_blank" class="btn-secondary btn-sm" style="text-decoration: none; display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-up-right-from-square" style="font-size: 0.75rem;"></i> Catálogo
                                </a>
                                <button class="btn-secondary btn-sm" onclick="copyToClipboard('${window.location.origin}/catalog/${N.id}', 'Link do catálogo copiado!')" title="Copiar link do catálogo" style="display: flex; align-items: center; gap: 6px; padding: 6px 10px; font-size: 0.75rem; border-radius: 6px;">
                                    <i class="fa-solid fa-copy" style="font-size: 0.75rem;"></i> Link
                                </button>
                            </div>
                        </div>
                        ${O}
                    </div>
                `}if(r.role==="owner"||r.role==="admin"){const N=g.map(T=>T.instancia_id).filter(T=>!!T),O=v.filter(T=>T.lojaId).map(T=>T.id),E=new Set([...N,...O]),k=v.filter(T=>!E.has(T.id));if(k.length>0){P+=`
                        <div class="card" style="margin-top: 2rem; border: 1px dashed rgba(255,255,255,0.2); background: rgba(255,255,255,0.02);">
                            <h4 style="margin-bottom: 1rem; color: var(--text-muted);"><i class="fa-solid fa-link-slash"></i> Instâncias não vinculadas a lojas</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
                    `;for(const T of k){let S=!1;try{S=(await ct.getInstanceStatus(T.nome)).connected}catch{}P+=`
                            <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <strong>${T.nome}</strong>
                                    <span class="badge ${S?"success":"warning"}">${S?"Online":"Offline"}</span>
                                </div>
                                <p style="font-size:0.75rem; color: var(--text-muted); margin-top: 0.5rem;">Vá em Configurações > Lojas para vincular esta instância a uma unidade.</p>
                            </div>
                        `}P+="</div></div>"}}l.innerHTML=P}catch(c){console.error("Error setting up Store statuses:",c),l.innerHTML=`
                <div class="card" style="margin-top: 1.5rem; background: var(--surface-hover);">
                    <p style="color: var(--danger);">Erro ao carregar os status integrados.</p>
                </div>
            `}}};class m_{show(e){return new Promise(t=>{const{title:a,message:i,confirmText:s="Confirmar",cancelText:r="Cancelar",type:l="warning"}=e,c=document.createElement("div");c.className="confirm-modal",c.innerHTML=`
                <div class="confirm-modal-content">
                    <div class="confirm-header ${l}">
                        <div class="confirm-icon">${l==="danger"?'<i class="fa fa-times"></i>':l==="warning"?'<i class="fa fa-exclamation-triangle"></i>':'<i class="fa fa-info-circle"></i>'}</div>
                        <h2>${a}</h2>
                    </div>
                    <div class="confirm-body">
                        <p>${i}</p>
                    </div>
                    <div class="confirm-actions">
                        <button class="btn-cancel" id="confirm-cancel">${r}</button>
                        <button class="btn-confirm ${l}" id="confirm-ok">${s}</button>
                    </div>
                </div>
            `,document.body.appendChild(c);const u=c.querySelector("#confirm-ok"),g=c.querySelector("#confirm-cancel"),x=v=>{c.remove(),t(v)};u?.addEventListener("click",()=>x(!0)),g?.addEventListener("click",()=>x(!1)),c.addEventListener("click",v=>{v.target===c&&x(!1)})})}async danger(e,t){return this.show({title:e,message:t,type:"danger",confirmText:"Sim, excluir"})}async warning(e,t){return this.show({title:e,message:t,type:"warning"})}}const Ne=new m_;function To(n,e){return n.replace(/\{\{(\w+)\}\}/g,(t,a)=>e[a]!==void 0?e[a]:t)}function h_(n){if(!n)return!1;const e=n.toDate?n.toDate():new Date(n),t=new Date;return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}function Zm(n,e){const i=(Array.isArray(n.itens)?n.itens:Array.isArray(n.items)?n.items:[]).map(s=>({item:s.item||s.name||"",quantidade:s.quantidade||s.qty||1,preco:s.preco||s.price||0})).map(s=>`${s.quantidade}x ${s.item}`).join(", ");return{nome_lead:e?.nome||e?.name||n.clientName||n.nome||"Cliente",telefone_lead:(e?.telefone||"").split("@")[0]||n.clientPhone||"",numero_pedido:n.id?.slice(-6).toUpperCase()||"",lista_produtos:i,valor_total:(Number(n.value||n.total)||0).toFixed(2),endereco_entrega:n.endereco||n.clientAddress||"Não informado",forma_pagamento:(()=>{const s=n.formaPagamento||n.paymentMethod||n.pagamento||"Não informado";if(s==="na_entrega"||s==="pagamento_na_entrega"){const r=n.paymentSubMethod==="dinheiro"?"Dinheiro":n.paymentSubMethod==="cartao"?"Cartão":"",l=n.troco?` (Troco para R$ ${parseFloat(n.troco).toFixed(2)})`:"";if(r)return`Na Entrega (${r}${l})`}return s})()}}const Qr={pedido_aceito_entrega_pago:"✅ Pedido aceito e em preparo! (Pagamento Adiantado)",pedido_aceito_entrega_pendente:"✅ Pedido aceito e em preparo! Pagamento na entrega.",pedido_aceito_retirada:"✅ Pedido confirmado para retirada! Já está sendo preparado.",pagamento_confirmado:"💳 Pagamento confirmado! Seu pedido já está sendo preparado.",pedido_pronto:"📦 Seu pedido já está pronto para retirada!",saiu_para_entrega:"🚚 Boa notícia! Seu pedido saiu para entrega.",pedido_entregue:"🏁 Seu pedido foi entregue e finalizado. Obrigado pela preferência!",pedido_cancelado:"❌ Seu pedido foi cancelado."};function f_(n){switch(n){case"aguardando_pagamento":return"pedido_aceito_entrega_pago";case"em_preparo":return"pagamento_confirmado";case"pedido_pronto":return"pedido_pronto";case"saiu_para_entrega":return"saiu_para_entrega";case"finalizado":return"pedido_entregue";case"cancelado":return"pedido_cancelado";default:return null}}async function eh(n,e){try{if(e){const a=await V.getAll("loja_config",[{field:"empresaId",operator:"==",value:n},{field:"lojaId",operator:"==",value:e}]);if(a&&a.length>0){const i=a[0];if(i.mensagens_automaticas)return i.mensagens_automaticas}}const t=await V.getAll("empresa_config",{field:"empresaId",operator:"==",value:n});if(t&&t.length>0)return t[0].mensagens_automaticas||{}}catch(t){console.error("Error fetching message config:",t)}return{}}async function g_(n,e){try{const t=n.storeId||n.lojaId;if(!t)return;let a=null,r=(await V.getAll("loja_config",[{field:"empresaId",operator:"==",value:e},{field:"lojaId",operator:"==",value:t}]))[0]?.instancia_id;if(r||(r=(await V.get("companies",e))?.stores?.find(O=>O.id===t)?.instancia_id),r&&(a=(await V.get("instancias",r))?.nome),!a)return;const c=(await eh(e,t)).pedido_recebido;if(!c)return;const u=n.leadId?await V.get("leads",n.leadId):null,g=Zm(n,u),x=To(c,g),v=n.clientPhone||n.telefone||u?.telefone;v&&x&&(await ct.sendText(a,v,x),n.leadId&&await V.create("messages",{conteudo:x,createdAt:ye.now(),empresaId:e,leadId:n.leadId,role:"assistente",tipo:"conversation"}))}catch(t){console.error("OrderService - Error in notifyNewOrder:",t)}}const ca={notifyNewOrder:g_,async updateOrderStatus(n,e,t,a,i){try{i&&Object.assign(n,i);let s=n.instancia||null;if(!s){const k=n.storeId||n.lojaId;if(k)try{let _=(await V.getAll("loja_config",[{field:"empresaId",operator:"==",value:e},{field:"lojaId",operator:"==",value:k}]))[0]?.instancia_id;const R=await V.get("companies",e);!_&&R?.stores&&(_=R.stores.find(p=>p.id===k)?.instancia_id),_&&(s=(await V.get("instancias",_))?.nome||null),!s&&R?.whatsappInstance?.instanceName&&(s=R.whatsappInstance.instanceName)}catch(T){console.error("Error fetching instance for store:",T)}}s||(s=(await V.get("companies",e))?.whatsappInstance?.instanceName||null);const r=n.leadId?await V.get("leads",n.leadId):null,l=r?.telefone||r?.whatsapp||(n.clientPhone?n.clientPhone.replace(/\D/g,""):null)||n.leadId||null,c=Zm(n,r),u=await eh(e,n.lojaId||n.storeId);let g="",x=f_(t);const v=n.entrega==="retirada"||n.deliveryType==="retirada",P=n.formaPagamento||n.paymentMethod||n.pagamento||"",N=P.includes("entrega")||P.includes("dinheiro")||P.includes("maquininha")||P==="na_entrega";if((t==="aguardando_pagamento"||t==="em_preparo")&&(N?x=v?"pedido_aceito_retirada":"pedido_aceito_entrega_pendente":(n.status==="em_montagem"||!n.status)&&(v?x="pedido_aceito_retirada":x="pedido_aceito_entrega_pago")),x)if(t==="cancelado"){const k=u[x]||Qr[x]||"",T=k?To(k,c):Qr[x];g=a?`${T} Motivo: ${a}`:T}else{const k=u[x]||Qr[x]||"";g=k?To(k,c):""}let O={status:t,updatedAt:ye.now()};a&&(O.rejectionReason=a),i&&(O={...O,...i}),await V.update("pedidos",n.id,O),t==="finalizado"&&n.leadId&&await V.update("leads",n.leadId,{statusAtendimento:"finalizado",updatedAt:ye.now()});let E=!1;return g&&s&&l&&(E=await ct.sendText(s,l,g),n.leadId&&await this.saveMessageLog(e,n.leadId,g)),E}catch(s){throw console.error("OrderService - Error updating status:",s),s}},async activateHumanSupport(n){await V.update("leads",n,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ye.now()})},async sendInterventionMessage(n,e,t,a,i){const s=await ct.sendText(t,a,i);return await V.create("messages",{conteudo:i,createdAt:ye.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"}),s},async saveMessageLog(n,e,t){try{await V.create("messages",{conteudo:t,createdAt:ye.now(),empresaId:n,leadId:e,role:"assistente",tipo:"conversation"})}catch(a){console.error("OrderService - Error logging message:",a)}},async getOrderDetails(n){return await V.get("pedidos",n)},async getOpenOrdersCount(n,e){try{return(await V.getAll("pedidos",{field:"empresaId",operator:"==",value:n})).filter(a=>{if(e&&e.length>0&&(!a.lojaId||!e.includes(a.lojaId))||a.arquivado)return!1;const i=(a.status||"em_montagem").toLowerCase(),s=i==="finalizado"||i==="cancelado";if(s){const r=a.criadoEm||a.createdAt;if(!h_(r))return!1}return!s}).length}catch{return 0}}},y_={em_montagem:{label:"Em Montagem",cls:"badge warning",icon:'<i class="fa-solid fa-cart-shopping"></i>'},aguardando_pagamento:{label:"Aguard. Pagamento",cls:"badge info",icon:'<i class="fa-solid fa-credit-card"></i>'},em_preparo:{label:"Em Preparo",cls:"badge primary",icon:'<i class="fa-solid fa-utensils"></i>'},pedido_pronto:{label:"Pronto p/ Retirada",cls:"badge success",icon:'<i class="fa-solid fa-box" style="color:#fff;"></i>'},saiu_para_entrega:{label:"Saiu p/ Entrega",cls:"badge success",icon:'<i class="fa-solid fa-truck" style="color:#fff;"></i>'},finalizado:{label:"Finalizado",cls:"badge success",icon:'<i class="fa-solid fa-check" style="color:#fff;"></i>'},cancelado:{label:"Cancelado",cls:"badge danger",icon:'<i class="fa-solid fa-xmark"></i>'}};function nu(n){const e=(n||"em_montagem").toLowerCase(),t=y_[e]||{label:n||"Pendente",cls:"badge secondary",icon:'<i class="fa-solid fa-question"></i>'};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function au(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}function v_(n){if(!n)return!1;const e=n.toDate?n.toDate():new Date(n),t=new Date;return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}function cn(n){if(n.arquivado)return!0;const e=(n.status||"em_montagem").toLowerCase(),t=e==="finalizado"||e==="cancelado",a=n.criadoEm||n.createdAt;return t&&!v_(a)}const iu=[{key:"todos",label:"Todos"},{key:"em_montagem",label:'<i class="fa-solid fa-cart-shopping"></i> Em Montagem'},{key:"aguardando_pagamento",label:'<i class="fa-solid fa-credit-card"></i> Pag. Pendente'},{key:"em_preparo",label:'<i class="fa-solid fa-utensils"></i> Em Preparo'},{key:"pedido_pronto",label:'<i class="fa-solid fa-box"></i> Prontos'},{key:"saiu_para_entrega",label:'<i class="fa-solid fa-truck"></i> Em Entrega'},{key:"finalizado",label:'<i class="fa-solid fa-check"></i> Finalizados'},{key:"arquivados",label:'<i class="fa-solid fa-box-archive"></i> Arquivados'}];function su(n){return n==="retirada"?'<span class="badge secondary" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-store" style="font-size: 0.6rem;"></i> Retirada</span>':'<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;"><i class="fa-solid fa-truck" style="font-size: 0.6rem;"></i> Entrega</span>'}function ru(n){const e=n.pagamento||n.formaPagamento||"";if(!e)return'<span class="badge secondary" style="opacity: 0.5; font-size: 0.7rem; padding: 0.2rem 0.5rem;">Pendente</span>';const t=e.toLowerCase().trim(),a=t.includes("link"),i=t.includes("pagamento_no_pix"),s=t.includes("entrega")||t.includes("dinheiro")||t.includes("maquininha");if(a)return`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-solid fa-link" style="font-size: 0.6rem;"></i> Link
        </span>`;if(i){let r=`<span class="badge info" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem;">
            <i class="fa-brands fa-pix" style="font-size: 0.6rem;"></i> PIX
        </span>`;const l=n.comprovanteUrl&&n.comprovanteUrl!=="tete"?n.comprovanteUrl:n.empresaId&&n.empresaId.startsWith("comprovantes/")?n.empresaId:null;return l&&(r+=`
                <button class="view-comprovante-btn" data-path="${l}" style="background: rgba(34, 197, 94, 0.13); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 4px; font-size: 0.65rem; padding: 0.2rem 0.5rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.4rem; transition: 0.2s;">
                    <i class="fa-solid fa-eye" style="font-size: 0.6rem;"></i> Comprovante
                </button>`),`<div style="display: flex; align-items: center;">${r}</div>`}if(s){const r=n.paymentSubMethod==="dinheiro"?"Dinheiro":n.paymentSubMethod==="cartao"?"Cartão":"",l=n.troco?` (Troco R$ ${parseFloat(n.troco).toFixed(2)})`:"";return`
            <div style="display:flex; flex-direction:column; gap:4px;">
                <span class="badge warning" style="background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); font-size: 0.7rem; padding: 0.2rem 0.5rem; display: inline-flex; align-items: center; gap: 0.3rem; width:fit-content;">
                    <i class="fa-solid fa-hand-holding-dollar" style="font-size: 0.6rem;"></i> Na Entrega
                </span>
                ${r?`<span style="font-size:0.75rem; color:var(--text-dim); font-weight:600; margin-left:4px;">${r}${l}</span>`:""}
            </div>`}return`<span class="badge secondary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;">${e}</span>`}const b_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await V.getAll("pedidos",{field:"empresaId",operator:"==",value:n.companyId});e.sort((p,m)=>{const y=(p.criadoEm?.toDate?.()||new Date(p.criadoEm||0)).getTime();return(m.criadoEm?.toDate?.()||new Date(m.criadoEm||0)).getTime()-y});let a=(await V.get("companies",n.companyId))?.stores||[];if(n.role!=="owner"){const p=n.storeIds||(n.storeId?[n.storeId]:[]);a=a.filter(m=>p.includes(m.id)),e=e.filter(m=>p.includes(m.lojaId))}const i=await V.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId}),s=await V.getAll("loja_config",{field:"empresaId",operator:"==",value:n.companyId}),r=p=>{const m=a.find(y=>y.id===p);return m?m.name:p||"-"},l=p=>{const m=a.find(b=>b.id===p);if(m&&m.active!==!1&&m.instancia_id)return!0;const y=s.find(b=>b.lojaId===p);return y?!!y.instancia_id:!1},c=(p,m)=>{if(m)return m;const y=i.find(b=>b.id===p);return y?y.nome||y.name||"Cliente":p||"Cliente"},u=p=>(i.find(y=>y.id===p)?.telefone||"").split("@")[0];let g="todos";const x=p=>{if(p==="arquivados")return e.filter(y=>cn(y));const m=e.filter(y=>!cn(y));return p==="todos"?m:m.filter(y=>(y.status||"em_montagem").toLowerCase()===p)},v=p=>p.length===0?'<tr><td colspan="8" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum pedido encontrado.</td></tr>':p.map(m=>{const y=(m.status||"em_montagem").toLowerCase();return`
            <tr data-order-id="${m.id}">
                <td><span style="font-family:monospace;font-weight:600;color:var(--primary);">#${m.id.slice(-6).toUpperCase()}</span></td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${r(m.lojaId)}</td>
                <td>
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                        <div class="lead-avatar" style="width:28px;height:28px;font-size:0.7rem;flex-shrink:0;">${(c(m.leadId,m.nome||m.leadName)[0]||"C").toUpperCase()}</div>
                        <div>
                            <div style="font-weight:500;">${c(m.leadId,m.nome||m.leadName)}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted);">${u(m.leadId)}</div>
                        </div>
                    </div>
                </td>
                <td style="font-weight:600;">R$ ${(m.value||m.total||0).toFixed(2)}</td>
                <td>${nu(y)}  ${su(m.entrega||"entrega")}  ${ru(m)}</td>
                <td style="color:var(--text-muted);font-size:0.82rem;">${au(m.criadoEm||m.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${m.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                        <button class="action-btn delete-order-btn" title="Excluir pedido" data-id="${m.id}" style="background:#ef444422;border-color:#ef444444;">
                            <i style="color:#ef4444;" class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),P=p=>{const m=p==="arquivados"?e.filter(y=>cn(y)).length:p==="todos"?e.filter(y=>!cn(y)).length:e.filter(y=>!cn(y)&&(y.status||"em_montagem").toLowerCase()===p).length;return`<span class="filter-count" id="count-${p}">${m}</span>`};return setTimeout(()=>N(),100),`
        <div class="leads-page-header">
            <div class="leads-filter-bar" id="orders-filter-bar">
                ${iu.map(p=>`
                    <button class="filter-btn${p.key==="todos"?" active":""}" data-filter="${p.key}">
                        ${p.label} ${p.key!=="arquivados"?P(p.key):'<span id="count-arquivados" style="display:none;"></span>'}
                    </button>
                `).join("")}
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="orders-table">
                    <thead>
                        <tr>
                            <th>TAG</th>
                            <th>Loja</th>
                            <th>Cliente</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Data/Hora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        ${v(e)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Order Detail Modal -->
        <div id="order-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="order-modal-inner"></div>
            </div>
        </div>
    `;function N(){const p=xa(qt,"pedidos"),m=Fn(p,Un("empresaId","==",n.companyId));window._ordersUnsubscribe&&window._ordersUnsubscribe();const y=Fi(m,C=>{if(e=C.docs.map(z=>({id:z.id,...z.data()})),n.role!=="owner"){const z=n.storeIds||(n.storeId?[n.storeId]:[]);e=e.filter(H=>z.includes(H.lojaId))}e.sort((z,H)=>{const A=(z.criadoEm?.toDate?.()||new Date(z.criadoEm||0)).getTime();return(H.criadoEm?.toDate?.()||new Date(H.criadoEm||0)).getTime()-A});const h=document.getElementById("orders-tbody");h&&(h.innerHTML=v(x(g)),O()),iu.forEach(z=>{const H=document.getElementById(`count-${z.key}`);if(H){const A=z.key==="arquivados"?e.filter(L=>cn(L)).length:z.key==="todos"?e.filter(L=>!cn(L)).length:e.filter(L=>!cn(L)&&(L.status||"em_montagem").toLowerCase()===z.key).length;H.textContent=A.toString()}})});window._ordersUnsubscribe=y,document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(C=>{C.addEventListener("click",()=>{document.querySelectorAll("#orders-filter-bar .filter-btn").forEach(z=>z.classList.remove("active")),C.classList.add("active"),g=C.dataset.filter||"todos";const h=document.getElementById("orders-tbody");h&&(h.innerHTML=v(x(g))),O()})}),O();const b=document.getElementById("order-detail-modal");b?.addEventListener("click",C=>{C.target===b&&b.classList.add("hidden")}),document.getElementById("orders-filter-bar")?.parentElement?.parentElement?.addEventListener("click",async C=>{const h=C.target.closest(".view-comprovante-btn");if(h){C.preventDefault(),C.stopPropagation();const z=h.dataset.path;if(!z)return;const H=h.innerHTML;h.disabled=!0,h.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{let A=z;if(!z.startsWith("http")){const L=fn(gn,z);A=await ma(L)}window.open(A,"_blank")}catch(A){console.error("Erro ao abrir comprovante:",A),D.error("Não foi possível carregar o comprovante do storage.")}finally{h.disabled=!1,h.innerHTML=H}}})}function O(){document.querySelectorAll(".action-btn.view").forEach(p=>{p.addEventListener("click",()=>{const m=p.dataset.id,y=e.find(b=>b.id===m);y&&k(y)})}),document.querySelectorAll(".delete-order-btn").forEach(p=>{p.addEventListener("click",async m=>{m.stopPropagation();const y=p.dataset.id,b=e.find(w=>w.id===y);b&&await E(b)})})}async function E(p){const m=c(p.leadId,p.nome||p.leadName),y=p.id.slice(-6).toUpperCase();if(await Ne.danger("Excluir Pedido",`Excluir o pedido #${y} de ${m}? Esta ação não pode ser desfeita.`))try{await V.delete("pedidos",p.id),e=e.filter(C=>C.id!==p.id),document.getElementById("order-detail-modal")?.classList.add("hidden");const w=document.getElementById("orders-tbody");w&&(w.innerHTML=v(x(g))),O(),D.success(`Pedido #${y} excluído.`)}catch{D.error("Erro ao excluir pedido.")}}async function k(p){const m=document.getElementById("order-detail-modal"),y=document.getElementById("order-modal-inner");if(!m||!y)return;!p.itens&&Array.isArray(p.items)&&(p.itens=p.items.map(ae=>({item:ae.item||ae.name||"",quantidade:ae.quantidade||ae.qty||1,preco:ae.preco||ae.price||0,observacao:ae.observacao||""}))),m.classList.remove("hidden"),y.innerHTML=`
            <div style="padding: 4rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
                <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary); margin-bottom: 1rem;"></i>
                <p style="color: var(--text-muted); font-size: 0.95rem;">Carregando detalhes do pedido...</p>
            </div>
        `;const b=p.clientPhone?p.clientPhone.replace(/\D/g,""):u(p.leadId)||p.leadId,w=p.source==="catalog"||!!p.taxaNome,C=p.empresaId||Ae.getCurrentUser()?.companyId;if(C&&Array.isArray(p.itens))try{const ae=await V.getAll("products",{field:"companyId",operator:"==",value:C});let de=!1;if(p.itens.forEach(oe=>{const fe=(oe.item||"").toLowerCase().trim(),xe=ae.find(Ce=>(Ce.name||"").toLowerCase().trim()===fe);if(xe){const Ce=xe.promotionalActive&&xe.promotionalPrice||xe.price;(!oe.preco||oe.preco===0)&&(oe.preco=Ce,de=!0)}}),de){let oe=0;p.itens.forEach(xe=>{const Ce=parseFloat(xe.preco)||0,Se=parseInt(xe.quantidade)||1;oe+=Se*Ce});const fe=parseFloat(p.taxaAplicada||p.taxaEntrega)||0;p.value=oe+fe}}catch(ae){console.error("Error syncing prices with catalog:",ae)}const h=(p.status||"em_montagem").toLowerCase(),z=h==="finalizado"||h==="cancelado",H=c(p.leadId,p.nome||p.leadName),A=l(p.lojaId),L=Array.isArray(p.itens)?p.itens.map((ae,de)=>`
                <div class="order-item-row" style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="flex: 1; padding-right: 15px;">
                        <span style="font-weight: 600; color: var(--text-main); display: block;">${ae.quantidade}x ${ae.item}</span>
                        ${ae.observacao?`<small style="color: var(--text-dim); display: block; margin-top: 2px;">Obs: ${ae.observacao}</small>`:""}
                    </div>
                    ${h==="em_montagem"&&!w?`
                        <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                            <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                            <input type="number" class="item-price-input" data-index="${de}" value="${ae.preco||0}"
                                step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                        </div>
                    `:`
                        <span style="color:var(--primary);font-weight:700; font-size: 1rem;">R$ ${(ae.preco||0).toFixed(2)}</span>
                    `}
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1.5rem; text-align: center;">Sem itens listados.</p>',G=h==="em_montagem"||p.taxaAplicada||p.taxaEntrega?`
            <div class="order-item-row" style="margin-top:0.5rem; border-top: 1px solid var(--border-color); padding: 1.25rem; ${h==="em_montagem"?"background: rgba(99, 102, 241, 0.03);":""}">
                <div style="flex: 1;">
                    <span class="lead-info-label" style="font-size:0.85rem; color: var(--text-main);">Taxa de Entrega</span>
                    ${h==="em_montagem"?'<small style="display:block; color: var(--text-dim); font-size: 0.75rem;">Frete / Entrega</small>':""}
                </div>
                ${h==="em_montagem"?`
                    <div style="display:flex;align-items:center;gap:0.75rem; flex-shrink: 0;">
                        <span style="color:var(--text-dim);font-size:0.8rem; font-weight: 600;">R$</span>
                        <input type="number" id="detail-taxa-entrega" value="${p.taxaAplicada||p.taxaEntrega||0}"
                            step="0.01" style="width:100px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.5rem 0.75rem;border-radius:8px;text-align:right;font-size:0.95rem; font-family: monospace; outline: none;">
                    </div>
                `:`
                    <span style="color:var(--primary);font-weight:700;">R$ ${(p.taxaAplicada||p.taxaEntrega||0).toFixed(2)}</span>
                `}
            </div>
        `:"",q="",J=T(p,h),X=z?"":w?`
                <a href="https://wa.me/${b.replace(/\D/g,"")}" target="_blank" class="btn-lead-action" 
                    style="background: rgba(37,211,102,0.15); border-color: rgba(37,211,102,0.4); color: #25d366; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> WhatsApp
                </a>`:`
                <button id="btn-intervir" class="btn-lead-action" style="background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #a78bfa;"
                    title="Enviar mensagem diretamente ao cliente sem alterar o status">
                    <i class="fa-solid fa-comment-dots"></i> Intervir
                </button>`;y.innerHTML=`
            <!-- Header -->
            <div class="lead-modal-header">
                <div class="lead-modal-avatar" style="background: linear-gradient(135deg, var(--primary), #7c3aed);">
                    ${H[0]?.toUpperCase()||"P"}
                </div>
                <div class="lead-modal-title">
                    <h2>Pedido #${p.id.slice(-6).toUpperCase()}</h2>
                    <span style="color:var(--text-muted);font-size:0.88rem;">${H} · ${b}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${z?"":`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="order-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="order-dropdown">
                            <button class="lead-dropdown-item" data-menu-action="atendimento_humano">
                                <i class="fa-solid fa-headset" style="color:var(--primary);"></i> Ativar Atendimento Humano
                            </button>
                            ${cn(p)?"":`
                            <button class="lead-dropdown-item" data-menu-action="arquivar">
                                <i class="fa-solid fa-box-archive" style="color:#fbbf24;"></i> Arquivar Pedido
                            </button>
                            `}
                            <button class="lead-dropdown-item danger" data-menu-action="excluir">
                                <i class="fa-solid fa-trash"></i> Excluir Pedido
                            </button>
                        </div>
                    </div>`}
                    <button class="action-btn" id="close-order-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

            <!-- Status badges -->
            <div class="lead-modal-badges">
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Pedido</span>
                    ${nu(h)}
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Loja</span>
                    <span class="badge secondary">${r(p.lojaId)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">Data</span>
                    <span class="badge secondary" style="font-size:0.78rem;">${au(p.criadoEm||p.createdAt)}</span>
                </div>
                <div class="lead-badge-group">
                    <span class="badge-label">${p.source==="catalog"?"Modo de Envio":"Tipo"}</span>
                    ${su(p.entrega||"entrega")}
                </div>
            </div>

            ${A?"":`
            <div class="lead-alert danger" style="margin: 1rem 1.5rem 0 1.5rem;">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <strong>Atenção:</strong> A loja deste pedido está inoperante (inativa ou sem instância vinculada). Mensagens automáticas podem falhar.
            </div>
            `}

            <!-- Body -->
            <div class="lead-modal-body">
                <!-- Client info -->
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Cliente</span>
                        <span class="lead-info-value">${H}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${b||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Pagamento</span>
                        <span class="lead-info-value">${ru(p)}</span>
                    </div>
                    ${w?p.entrega==="retirada"?`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Informação de Coleta</span>
                            <span class="lead-info-value" style="color:var(--primary);font-weight:600;"><i class="fa-solid fa-store"></i> Retirada na Loja</span>
                        </div>`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${p.endereco||"Não informado"}</span>
                        </div>
                        ${(()=>{const ae=p.bairro||(p.taxaNome?.includes("(")?p.taxaNome.split("(")[1].split(")")[0]:"");return ae?`
                        <div class="lead-info-item">
                            <span class="lead-info-label">Bairro</span>
                            <span class="lead-info-value" style="color:var(--primary); font-weight:600;">${ae}</span>
                        </div>`:""})()}
`:`
                        <div class="lead-info-item" style="grid-column:1/-1;">
                            <span class="lead-info-label">Endereço de Entrega</span>
                            <span class="lead-info-value">${p.endereco||"-"}</span>
                        </div>
                        ${(()=>{const ae=p.bairro||(p.taxaNome?.includes("(")?p.taxaNome.split("(")[1].split(")")[0]:"");return ae?`
                        <div class="lead-info-item">
                            <span class="lead-info-label">Bairro</span>
                            <span class="lead-info-value" style="color:var(--primary); font-weight:600;">${ae}</span>
                        </div>`:""})()}
                    `}
                </div>

                <!-- Items -->
                <div class="lead-section">
                    <h4 class="lead-section-title"><i class="fa-solid fa-basket-shopping"></i> Itens do Pedido</h4>
                    <div class="order-items-block">
                        ${L}
                        ${G}
                        ${q}
                        <div class="order-total-row">
                            <span>Total</span>
                            ${h==="em_montagem"?`
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;" id="detail-order-total">R$ ${(p.value||p.total||0).toFixed(2)}</span>
                            `:`
                                <span style="color:var(--primary);font-weight:700;font-size:1.1rem;">R$ ${(p.value||p.total||0).toFixed(2)}</span>
                            `}
                        </div>
                    </div>
                </div>

                ${p.rejectionReason?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <strong>Motivo do Cancelamento:</strong> ${p.rejectionReason}
                </div>`:""}

                <!-- Intervention area (hidden by default) - Only for non-catalog orders -->
                ${p.source!=="catalog"?`
                <div id="intervir-area" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title"><i class="fa-solid fa-comment-dots" style="color:#a78bfa;"></i> Enviar Mensagem ao Cliente</h4>
                        <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.75rem;">Esta mensagem será enviada diretamente ao cliente sem alterar o status do pedido ou o atendimento.</p>
                        <textarea id="intervir-text" placeholder="Digite sua mensagem..." rows="3"
                            style="width:100%;background:var(--surface-hover);border:1px solid rgba(139,92,246,0.4);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                        <div style="display:flex;gap:0.75rem;margin-top:0.75rem;">
                            <button id="btn-intervir-send" class="btn-lead-action" style="background:rgba(139,92,246,0.2);border-color:rgba(139,92,246,0.5);color:#a78bfa;flex:1;">
                                <i class="fa-solid fa-paper-plane"></i> Enviar Mensagem
                            </button>
                            <button id="btn-intervir-cancel" class="action-btn" style="padding:0.6rem 1rem;">
                                <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `:""}

                <!-- Cancelation reason (shown on cancel click) -->
                <div id="cancel-container" style="display:none;">
                    <div class="lead-section">
                        <h4 class="lead-section-title" style="color:var(--danger);"><i class="fa-solid fa-circle-exclamation"></i> Motivo do Cancelamento <span style="color:#ff4d4d">*</span></h4>
                        <textarea id="cancel-reason" placeholder="Informe o motivo para o cliente..." rows="3"
                            style="width:100%;background:rgba(239,68,68,0.05);border:1px solid var(--danger);border-radius:8px;color:white;padding:0.75rem;font-size:0.9rem;font-family:inherit;resize:vertical;box-sizing:border-box;"></textarea>
                    </div>
                </div>
            </div>

            <!-- Footer actions -->
            ${z?"":`
            <div class="lead-modal-footer" id="modal-footer">
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                    ${X}
                    ${J}
                </div>
            </div>`}
        `,S(m,p,h)}function T(p,m){const y=p.entrega==="retirada",b=(p.pagamento||p.formaPagamento||"").toLowerCase(),w=b.includes("entrega")||b.includes("dinheiro")||b.includes("maquininha"),C=b.includes("pix")||b.includes("pagamento_no_pix"),h=b.includes("link");switch(m){case"em_montagem":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="em_preparo">
                        <i class="fa-solid fa-check"></i> Aceitar Pedido
                    </button>
                    <button id="btn-cancel" class="btn-lead-action danger" data-stage="init">
                        <i class="fa-solid fa-xmark"></i> Cancelar Pedido
                    </button>`;case"aguardando_pagamento":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="em_preparo">
                        <i class="fa-solid fa-credit-card"></i> ${C?"Confirmar PIX":"Confirmar Pagamento"}
                    </button>
                    <button id="btn-cancel" class="btn-lead-action danger" data-stage="init">
                        <i class="fa-solid fa-xmark"></i> Cancelar Pedido
                    </button>`;case"em_preparo":return y?`
                        <button id="btn-main-action" class="btn-lead-action" data-target="pedido_pronto">
                            <i class="fa-solid fa-box"></i> ${w?"Pronto":"Pedido Pronto"}
                        </button>`:`
                    <button id="btn-main-action" class="btn-lead-action" data-target="saiu_para_entrega">
                        <i class="fa-solid fa-truck"></i> Saiu para Entrega
                    </button>`;case"pedido_pronto":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> ${w?"Finalizar":"Entregue"}
                    </button>`;case"saiu_para_entrega":return`
                    <button id="btn-main-action" class="btn-lead-action" data-target="finalizado">
                        <i class="fa-solid fa-flag-checkered"></i> Entregue
                    </button>`;default:return""}}function S(p,m,y){const b=y==="finalizado"||y==="cancelado",w=m.source==="catalog"||!!m.taxaNome;if(document.getElementById("close-order-modal")?.addEventListener("click",()=>{p.classList.add("hidden")}),y==="em_montagem"&&!w){const q=X=>{const ae=parseFloat(X);return isNaN(ae)?0:ae},J=()=>{let X=0;document.querySelectorAll(".item-price-input").forEach(fe=>{const xe=parseInt(fe.dataset.index),Ce=m.itens[xe]?.quantidade||1;X+=Ce*q(fe.value)});const ae=q(document.getElementById("detail-additional-value")?.value),de=q(document.getElementById("detail-taxa-entrega")?.value);X+=ae+de;const oe=document.getElementById("detail-order-total");oe&&(oe.innerText=`R$ ${X.toFixed(2)}`)};document.querySelectorAll(".item-price-input").forEach(X=>{X.addEventListener("input",J)}),document.getElementById("detail-additional-value")?.addEventListener("input",J),document.getElementById("detail-taxa-entrega")?.addEventListener("input",J),J()}if(b)return;const C=document.getElementById("order-menu-trigger"),h=document.getElementById("order-dropdown");C?.addEventListener("click",q=>{q.stopPropagation(),h?.classList.toggle("hidden")}),document.addEventListener("click",()=>h?.classList.add("hidden"),{once:!0}),h?.querySelectorAll(".lead-dropdown-item").forEach(q=>{q.addEventListener("click",async()=>{h.classList.add("hidden");const J=q.dataset.menuAction;J==="atendimento_humano"?await _(m):J==="arquivar"?await R(m,p):J==="excluir"&&await E(m)})});const z=document.getElementById("btn-intervir"),H=document.getElementById("intervir-area");z?.addEventListener("click",()=>{if(H){const q=H.style.display==="none";H.style.display=q?"block":"none",q&&document.getElementById("intervir-text")?.focus()}}),document.getElementById("btn-intervir-cancel")?.addEventListener("click",()=>{H&&(H.style.display="none");const q=document.getElementById("intervir-text");q&&(q.value="")}),document.getElementById("btn-intervir-send")?.addEventListener("click",async()=>{const q=document.getElementById("intervir-text"),J=q?.value.trim();if(!J){D.warning("Digite uma mensagem antes de enviar.");return}const X=document.getElementById("btn-intervir-send");X.disabled=!0,X.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';try{let ae=m.instancia;ae||(ae=(await V.get("companies",n.companyId))?.whatsappInstance?.instanceName||"");const de=u(m.leadId)||m.leadId;await ca.sendInterventionMessage(n.companyId,m.leadId,ae,de,J),D.success("Mensagem enviada com sucesso!"),q.value="",H&&(H.style.display="none")}catch{D.error("Erro ao enviar mensagem."),X.disabled=!1,X.innerHTML='<i class="fa-solid fa-paper-plane"></i> Enviar Mensagem'}});const A=document.getElementById("btn-main-action");A?.addEventListener("click",async()=>{const q=A.dataset.target;if(!q)return;let J="",X="";switch(q){case"aguardando_pagamento":J="Aceitar Pedido",X=`Deseja aceitar o pedido #${m.id.slice(-6).toUpperCase()}?`;break;case"em_preparo":J="Confirmar Pagamento",X="Confirmar que o pagamento foi recebido?";break;case"pedido_pronto":J="Pedido Pronto",X="Marcar pedido como pronto para retirada?";break;case"saiu_para_entrega":J="Saiu para Entrega",X="Marcar pedido como saiu para entrega?";break;case"finalizado":J="Pedido Entregue",X="Marcar pedido como entregue e finalizado?";break}if(await Ne.warning(J,X)){A.disabled=!0,A.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...';try{let de;if(y==="em_montagem"){const oe=qe=>{const Xe=parseFloat(qe);return isNaN(Xe)?0:Xe};let fe=0;const xe=Array.isArray(m.itens)?[...m.itens]:[],Ce=document.querySelectorAll(".item-price-input");Ce.length>0?Ce.forEach(qe=>{const Xe=parseInt(qe.dataset.index),st=xe[Xe]?.quantidade||1,he=oe(qe.value);xe[Xe]&&(xe[Xe].preco=he),fe+=st*he}):xe.forEach(qe=>{fe+=(qe.quantidade||1)*oe(qe.preco)});const Se=document.getElementById("detail-taxa-entrega"),Le=oe(Se?Se.value:m.taxaAplicada||m.taxaEntrega);fe+=Le,de={value:fe,total:fe,itens:xe,taxaAplicada:Le,taxaEntrega:Le}}q==="em_preparo"&&(de={...de,manuallyConfirmed:!0}),await ca.updateOrderStatus(m,n.companyId,q,void 0,de),m.status=q,M(m),D.success("Pedido atualizado com sucesso!"),k(m)}catch{D.error("Erro ao atualizar pedido."),A.disabled=!1}}});const L=document.getElementById("btn-cancel"),G=document.getElementById("cancel-container");L?.addEventListener("click",async()=>{if(L.dataset.stage==="confirm"){const q=document.getElementById("cancel-reason")?.value.trim();if(!q){D.warning("Informe o motivo do cancelamento.");return}if(!await Ne.danger("Cancelar Pedido","Tem certeza que deseja cancelar este pedido?"))return;L.disabled=!0,L.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Cancelando...';try{await ca.updateOrderStatus(m,n.companyId,"cancelado",q),m.status="cancelado",M(m),D.success("Pedido cancelado."),k(m)}catch{D.error("Erro ao cancelar pedido."),L.disabled=!1}}else L.dataset.stage="confirm",L.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Confirmar Cancelamento',G&&(G.style.display="block",document.getElementById("cancel-reason")?.focus())}),document.getElementById("btn-archive-manual")?.addEventListener("click",async()=>{if(!await Ne.warning("Arquivar Pedido","Deseja arquivar este pedido antigo? Ele sairá da lista principal e irá para Arquivados."))return;const J=document.getElementById("btn-archive-manual");J.disabled=!0,J.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Arquivando...';try{await V.update("pedidos",m.id,{arquivado:!0}),m.arquivado=!0,M(m),D.success("Pedido arquivado com sucesso!");const X=document.getElementById("order-detail-modal");X&&X.classList.add("hidden")}catch(X){console.error("Erro ao arquivar:",X),D.error("Erro ao arquivar pedido."),J.disabled=!1,J.innerHTML='<i class="fa-solid fa-box-archive"></i> Arquivar Pedido'}})}async function _(p){if(await Ne.warning("Ativar Atendimento Humano","Deseja ativar atendimento humano para o lead deste pedido ? O status do pedido não será alterado."))try{await ca.activateHumanSupport(p.leadId),D.success("Atendimento humano ativado para o lead!")}catch{D.error("Erro ao ativar atendimento humano.")}}async function R(p,m){if(await Ne.warning("Arquivar Pedido","Deseja arquivar este pedido? Ele sairá da lista principal e irá para Arquivados."))try{await V.update("pedidos",p.id,{arquivado:!0}),p.arquivado=!0,M(p),D.success("Pedido arquivado com sucesso!"),m.classList.add("hidden")}catch(b){console.error("Erro ao arquivar:",b),D.error("Erro ao arquivar pedido.")}}function M(p){const m=e.findIndex(b=>b.id===p.id);m>=0&&(e[m]={...e[m],...p});const y=document.getElementById("orders-tbody");y&&(y.innerHTML=v(x(g))),O()}},ys=n=>n.imageUrl?n.imageUrl:n.imagemPath&&n.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(n.imagemPath)}?alt=media&token=${n.downloadToken}`:null,w_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const t=await V.get("companies",n.companyId),a=t?.modulos_ativos||[],i=a.includes("venda")||a.includes("agendamento")||a.includes("catalogo"),s=a.includes("agendamento"),r=s?"Serviço":"Produto",l=s?"Serviços":"Produtos";let c=t?.stores||[];const u=n.role?.toLowerCase()==="owner",g=n.storeIds||(n.storeId?[n.storeId]:[]);u||(c=c.filter(A=>g.includes(A.id)));let x=u?"all":g.length===1?g[0]:"employee_all",v="",P="all",N=new Map,O=null;if(!i)return`
            <div class="card">
                <h2>Módulo Desativado</h2>
                <p>Sua configuração atual não utiliza catálogo de produtos ou serviços.</p>
                <p>Contate o administrador para ativar o módulo correspondente.</p>
            </div>
        `;let E=await V.getAll("products",{field:"companyId",operator:"==",value:n.companyId}),k=await V.getAll("categories",{field:"companyId",operator:"==",value:n.companyId});const T=A=>{const L=A.storeIds||(A.storeId?[A.storeId]:[]);return L.length===0?"Sem Loja":L.map(G=>{const q=c.find(J=>J.id===G);return q?q.name:"Desconhecida"}).join(", ")},S=()=>{let A=E;return x!=="all"&&x!=="employee_all"?A=E.filter(L=>L.storeIds&&L.storeIds.includes(x)||L.storeId===x):x==="employee_all"&&(A=E.filter(L=>L.storeIds&&L.storeIds.some(G=>g.includes(G))||L.storeId&&g.includes(L.storeId))),v&&(A=A.filter(L=>L.name.toLowerCase().includes(v))),P!=="all"&&(A=A.filter(L=>(L.categoryId||"uncategorized")===P)),A.length===0?`<tr><td colspan="7" style="text-align:center">Nenhum ${r.toLowerCase()} encontrado.</td></tr>`:A.map(L=>`
            <tr data-product-id="${L.id}" data-cat-id="${L.categoryId||"uncategorized"}">
                <td><input type="checkbox" class="product-checkbox" data-id="${L.id}" onchange="window.updateBulkBar()"></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        ${ys(L)?`<img src="${ys(L)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">`:'<div style="width: 40px; height: 40px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-box"></i></div>'}
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: 600;">${L.name}</span>
                            ${s&&L.observation?`<span style="font-size: 0.75rem; color: #94a3b8; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${L.observation}">${L.observation}</span>`:""}
                        </div>
                    </div>
                </td>
                <td><div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${T(L)}">${T(L)}</div></td>
                <td>R$ ${L.price?.toFixed(2)}</td>
                <td>
                    ${s?L.duration?`<span class="badge info">${L.duration} min</span>`:'<span class="badge" style="background:rgba(100,116,139,0.15);color:#94a3b8;">—</span>':L.stock===null||L.stock===void 0?'<span class="badge info" title="Sem controle">&#8734; Ilimitado</span>':L.stock>10?`<span class="badge success">${L.stock} un.</span>`:L.stock>0?`<span class="badge" style="background:rgba(234,179,8,0.15);color:#eab308;border:1px solid rgba(234,179,8,0.3);">${L.stock} un.</span>`:'<span class="badge danger">Esgotado</span>'}
                </td>
                <td><span class="badge ${L.active?"success":"danger"}">${L.active?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editProduct('${L.id}')" title="Editar"><i style="color: #FFF;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleProductStatus('${L.id}', ${L.active})" title="${L.active?"Desativar":"Ativar"}">${L.active?'<i style="color: #FFF;" class="fa-solid fa-ban"></i>':'<i style="color: #FFF;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteProduct('${L.id}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join("")};window.applyFilters=()=>{v=document.getElementById("product-search-input")?.value.toLowerCase()||"",P=document.getElementById("product-category-filter")?.value||"all",_()};const _=()=>{const A=document.querySelector(".data-table tbody");A&&(A.innerHTML=S(),R())},R=()=>{const A=document.querySelectorAll(".product-checkbox:checked"),L=document.getElementById("bulk-actions-container"),G=document.getElementById("bulk-count");L&&G&&(A.length>0?(L.classList.remove("hidden"),G.innerText=`${A.length} item(ns) selecionado(s)`):L.classList.add("hidden"))},M=()=>{const A='<option value="">Sem Categoria</option>'+k.map(L=>`<option value="${L.id}">${L.name}</option>`).join("");document.querySelectorAll(".item-category, #bulk-assign-cat").forEach(L=>{const G=L.value;L.innerHTML=A,L.value=G})},p=()=>{const A=document.getElementById("categories-list");if(A){if(k.length===0){A.innerHTML='<p style="text-align:center; color:var(--text-dim);">Nenhuma categoria criada.</p>';return}A.innerHTML=k.map(L=>`
            <div class="category-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="fa-solid ${L.icon}" style="color:var(--primary); width:20px; text-align:center;"></i>
                    <span id="cat-name-text-${L.id}">${L.name}</span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button class="action-btn" style="background:rgba(255,255,255,0.05); border:1px solid var(--border-color);" onclick="window.openEditCategoryModal('${L.id}', '${L.name.replace(/'/g,"\\'")}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:#ef4444;" onclick="window.deleteCategory('${L.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join("")}},m=A=>{const L=document.getElementById("catalog-link-container"),G=document.getElementById("catalog-url-display"),q=document.getElementById("btn-open-catalog");if(!(!L||!G||!q))if(A==="all"||A==="employee_all")L.classList.add("hidden");else{const J=`${window.location.origin}/catalog/${A}`;G.value=J,q.href=J,L.classList.remove("hidden")}},y=async(A,L)=>{const G=`img_${Date.now()}_${Math.random().toString(36).substr(2,5)}`,q=fn(gn,`products/${L}/${G}_${A.name}`);await Ua(q,A);const J=await ma(q),X=new URL(J);return{imagemPath:q.fullPath,downloadToken:X.searchParams.get("token")||""}},b=(A,L="",G="",q=null,J=!1,X="",ae="",de="",oe=null,fe=null,xe="")=>{const Ce=k.map(Se=>`<option value="${Se.id}" ${Se.id===de?"selected":""}>${Se.name}</option>`).join("");return`
            <div class="product-item-card" id="card-${A}">
                 <div class="item-visual">
                    <div class="image-preview-wrapper" id="preview-wrapper-${A}">
                        ${q?`<img src="${q}" class="preview-img">`:'<div class="preview-placeholder"><i class="fa-solid fa-image"></i></div>'}
                        <div class="upload-progress-overlay hidden" id="progress-${A}">
                            <div class="spinner-small"></div>
                        </div>
                    </div>
                    ${!q||A!=="edit-item"?`
                    <button type="button" class="btn-change-img" data-id="${A}">
                        <i class="fa-solid fa-camera"></i>
                    </button>
                    `:""}
                    <input type="file" id="file-${A}" accept="image/*" style="display: none;">
                 </div>
                 
                 <div class="item-details">
                    <div class="input-row">
                        <div class="field">
                            <label>Nome do ${r}</label>
                            <input type="text" name="name-${A}" value="${L}" class="item-name" placeholder="${s?"Ex: Corte de Cabelo":"Ex: Tênis Esportivo Nitro"}" required>
                        </div>
                        <div class="field price-field">
                            <label>Preço (R$)</label>
                            <input type="number" name="price-${A}" value="${G}" class="item-price" placeholder="0,00" step="0.01" required>
                        </div>
                    </div>

                    <div class="input-row" style="margin-top: 12px;">
                        <div class="field">
                            <label>Categoria</label>
                            <select name="category-${A}" class="item-category" style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;">
                                <option value="">Sem Categoria</option>
                                ${Ce}
                            </select>
                        </div>
                        <div class="field price-field">
                            ${s?`<label>Duração <span style="color:var(--text-dim);font-weight:400;">(minutos)</span></label>
                                   <input type="number" name="duration-${A}" value="${fe??""}" class="item-duration" placeholder="Ex: 30" min="5" step="5">`:`<label>Estoque <span style="color:var(--text-dim);font-weight:400;">(vazio = ilimitado)</span></label>
                                   <input type="number" name="stock-${A}" value="${oe??""}" class="item-stock" placeholder="Ilimitado" min="0" step="1">`}
                        </div>
                    </div>
                    
                    ${s?`
                    <div style="margin-top: 12px;">
                        <div class="field">
                            <label>Observação</label>
                            <textarea name="observation-${A}" class="item-observation" placeholder="Ex: Informações adicionais sobre o ${r.toLowerCase()}..." style="width: 100%; background: var(--bg-color); border: 1px solid var(--border-color); color: white; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem; min-height: 60px; resize: vertical;">${xe}</textarea>
                        </div>
                    </div>`:""}
                    
                    ${s?"":`
                    <div class="promotional-section" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed var(--border-color);">
                        <label class="promotional-toggle" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--primary); font-weight: 600; font-size: 0.85rem;">
                            <input type="checkbox" name="promotional-active-${A}" class="promotional-checkbox" ${J?"checked":""} style="width: 16px; height: 16px;">
                            <i class="fa-solid fa-tag"></i> Ativar Promoção
                        </label>
                        
                        <div class="promotional-fields ${J?"":"hidden"}" id="promotional-fields-${A}" style="margin-top: 10px; border-radius: 8px; background: rgba(99, 102, 241, 0.05); padding: 12px; border: 1px solid rgba(99, 102, 241, 0.2);">
                            <div class="input-row">
                                <div class="field">
                                    <label>Título da Promoção</label>
                                    <input type="text" name="promotional-name-${A}" value="${X}" placeholder="Ex: Oferta Relâmpago!" class="promotional-name-input">
                                </div>
                                <div class="field price-field">
                                    <label>Preço Promo (R$)</label>
                                    <input type="number" name="promotional-price-${A}" value="${ae}" placeholder="0,00" step="0.01" class="promotional-price-input">
                                </div>
                            </div>
                        </div>
                    </div>`}
                 </div>

                 <button type="button" class="btn-remove-item" onclick="window.removeProductItem('${A}')" title="Remover item">
                    <i class="fa-solid fa-times"></i>
                 </button>
            </div>
        `},w=A=>{const L=document.querySelector(`#card-${A} .btn-change-img`),G=document.getElementById(`file-${A}`);L&&G&&(L.addEventListener("click",()=>G.click()),G.addEventListener("change",()=>{if(G.files&&G.files[0]){const X=G.files[0];N.set(A,X);const ae=new FileReader;ae.onload=de=>{const oe=document.getElementById(`preview-wrapper-${A}`);oe&&(oe.innerHTML=`<img src="${de.target?.result}" class="preview-img">
                                                 <div class="upload-progress-overlay hidden" id="progress-${A}"><div class="spinner-small"></div></div>`)},ae.readAsDataURL(X)}}));const q=document.querySelector(`input[name="promotional-active-${A}"]`),J=document.getElementById(`promotional-fields-${A}`);q&&J&&q.addEventListener("change",()=>{q.checked?J.classList.remove("hidden"):J.classList.add("hidden")})},C=A=>{const L=document.getElementById("products-list-container"),G=document.getElementById("empty-list-msg");!L||!G||Array.from(A).forEach(q=>{const J=`prod_${Date.now()}_${Math.random().toString(36).substr(2,5)}`;N.set(J,q);const X=q.name.replace(/\.[^/.]+$/,"").replace(/-|_/g," "),ae=b(J,X,"");L.insertAdjacentHTML("beforeend",ae),G.style.display="none",w(J);const de=new FileReader;de.onload=oe=>{const fe=document.getElementById(`preview-wrapper-${J}`);fe&&(fe.innerHTML=`<img src="${oe.target?.result}" class="preview-img">
                                          <div class="upload-progress-overlay hidden" id="progress-${J}"><div class="spinner-small"></div></div>`)},de.readAsDataURL(q)})};window.editProduct=async A=>{const L=E.find(G=>G.id===A);if(L){O=A,N.clear(),document.getElementById("modal-title").innerText=`Editar ${r}`,document.getElementById("bulk-upload-section").style.display="none",u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(X=>{X.checked=(L.storeIds||[]).includes(X.value)});const G=document.getElementById("products-list-container"),q=document.getElementById("empty-list-msg");if(G&&q){G.innerHTML="",q.style.display="none";const J=ys(L);G.innerHTML=b("edit-item",L.name,L.price,J,L.promotionalActive,L.promotionalName,L.promotionalPrice,L.categoryId,L.stock,L.duration,L.observation),setTimeout(()=>w("edit-item"),0)}document.getElementById("product-modal").classList.remove("hidden")}},window.toggleProductStatus=async(A,L)=>{try{await V.update("products",A,{active:!L});const G=E.find(q=>q.id===A);G&&(G.active=!L),_(),D.success(`${r} ${L?"desativado":"ativado"} com sucesso!`)}catch(G){D.error("Erro ao atualizar status: "+G)}},window.deleteProduct=async A=>{if(await Ne.danger(`Excluir ${r}`,`Tem certeza que deseja EXCLUIR este ${r.toLowerCase()}? Esta ação não pode ser desfeita.`))try{const G=E.find(q=>q.id===A);if(G){const q=ys(G),J=G.imagemPath;if(q||J)try{const X=J?fn(gn,J):fn(gn,q);await e_(X)}catch(X){console.warn("Could not delete image from storage:",X)}}await V.delete("products",A),E=E.filter(q=>q.id!==A),_(),D.success(`${r} excluído com sucesso!`)}catch(G){D.error("Erro ao excluir: "+G)}},window.openProductModal=()=>{O=null,N.clear();const A=document.getElementById("modal-title"),L=document.getElementById("bulk-upload-section"),G=document.getElementById("products-list-container"),q=document.getElementById("empty-list-msg");A&&(A.innerText=`Adicionar ${l}`),L&&(L.style.display="block"),G&&(G.innerHTML=""),q&&(q.style.display="block"),u&&document.querySelectorAll('#multi-store-container input[type="checkbox"]').forEach(X=>X.checked=!1),document.getElementById("product-modal")?.classList.remove("hidden")},window.closeModals=()=>{document.getElementById("product-modal")?.classList.add("hidden"),document.getElementById("category-modal")?.classList.add("hidden"),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),document.getElementById("migration-modal")?.classList.add("hidden")},window.handleBulkFileSelection=A=>{A.files&&(C(A.files),A.value="")},window.addManualItem=()=>{const A=`manual_${Date.now()}`,L=document.getElementById("products-list-container"),G=document.getElementById("empty-list-msg");if(L&&G){const q=b(A);L.insertAdjacentHTML("beforeend",q),G.style.display="none",w(A)}},window.removeProductItem=A=>{const L=document.getElementById(`card-${A}`);L&&L.remove(),N.delete(A);const G=document.getElementById("products-list-container");if(G&&G.children.length===0){const q=document.getElementById("empty-list-msg");q&&(q.style.display="block")}},window.saveProducts=async()=>{const A=document.getElementById("btn-save-products-trigger");if(!A)return;A.disabled=!0;const L=A.innerHTML;A.innerHTML='<div class="spinner-small"></div> <span>Salvando...</span>';const q=document.getElementById("products-list-container")?.querySelectorAll(".product-item-card");if(!q||q.length===0){D.warning(`Adicione pelo menos um ${r.toLowerCase()}.`),A.disabled=!1,A.innerHTML=L;return}let J=[];if(u){const X=document.querySelectorAll('#multi-store-container input[name="store-ids"]:checked');J=Array.from(X).map(ae=>ae.value)}else n.storeId?J=[n.storeId]:n.storeIds&&n.storeIds.length>0&&(J=n.storeIds);if(J.length===0){D.warning("Selecione pelo menos uma loja para este(s) produto(s)."),A.disabled=!1,A.innerHTML=L;return}try{for(const X of Array.from(q)){const ae=X.id.replace("card-",""),de=X.querySelector(".item-name").value,oe=parseFloat(X.querySelector(".item-price").value),fe=X.querySelector(".item-category").value;let xe=!1,Ce="",Se=0,Le=null,qe=null;if(s){const pe=X.querySelector(".item-duration")?.value;qe=pe!==""&&pe!=null?parseInt(pe):null}else{xe=X.querySelector(".promotional-checkbox")?.checked||!1,Ce=X.querySelector(".promotional-name-input")?.value||"",Se=parseFloat(X.querySelector(".promotional-price-input")?.value)||0;const pe=X.querySelector(".item-stock")?.value;Le=pe!==""&&pe!=null?parseInt(pe):null}const Xe=X.querySelector(".item-observation")?.value||"",st=document.getElementById(`progress-${ae}`);st&&st.classList.remove("hidden");let he={};N.has(ae)&&(he=await y(N.get(ae),n.companyId));const se={name:de,price:oe||0,categoryId:fe,storeIds:J,companyId:n.companyId,active:!0,promotionalActive:xe,promotionalName:Ce,promotionalPrice:Se,stock:Le,duration:qe,observation:Xe,...he};if(O&&ae==="edit-item"){await V.update("products",O,se);const pe=E.findIndex(Oe=>Oe.id===O);pe!==-1&&(E[pe]={...E[pe],...se})}else{const pe=await V.create("products",se);E.push({id:pe,...se})}st&&st.classList.add("hidden")}D.success(`${l} salvo(s) com sucesso!`),window.closeModals(),_(),A.disabled=!1,A.innerHTML=L}catch(X){console.error("Error saving products:",X),D.error(`Erro ao salvar ${l.toLowerCase()}.`),A.disabled=!1,A.innerHTML=L}},window.saveCategory=async A=>{A.preventDefault();const L=document.getElementById("cat-name"),G=document.getElementById("cat-icon"),q=L.value.trim(),J=G.value;if(q)try{const X=await V.create("categories",{name:q,icon:J,companyId:n.companyId});k.push({id:X,name:q,icon:J,companyId:n.companyId}),L.value="",p(),M(),D.success("Categoria criada com sucesso!")}catch{D.error("Erro ao criar categoria.")}},window.deleteCategory=async A=>{if(await Ne.warning("Excluir Categoria",'Tem certeza? Produtos nesta categoria ficarão "Sem Categoria".'))try{await V.delete("categories",A),k=k.filter(L=>L.id!==A),p(),M(),E.forEach(L=>{L.categoryId===A&&(L.categoryId="")}),D.success("Categoria excluída.")}catch{D.error("Erro ao excluir categoria.")}},window.openEditCategoryModal=(A,L)=>{const G=document.getElementById("edit-cat-name-input");G&&(G.value=L,G.dataset.catId=A,document.getElementById("edit-cat-name-modal")?.classList.remove("hidden"))},window.updateCategoryName=async()=>{const A=document.getElementById("edit-cat-name-input"),L=A.dataset.catId,G=A.value.trim();if(L&&G)try{await V.update("categories",L,{name:G});const q=k.find(J=>J.id===L);q&&(q.name=G),p(),M(),document.getElementById("edit-cat-name-modal")?.classList.add("hidden"),D.success("Nome atualizado!")}catch{D.error("Erro ao atualizar nome.")}},window.openCategoryModal=()=>{p();const A=document.getElementById("icon-picker");A&&(A.innerHTML=h.map(L=>`
                <div class="icon-option ${L==="fa-tag"?"selected":""}" data-icon="${L}" onclick="window.selectCategoryIcon(this, '${L}')">
                    <i class="fa-solid ${L}"></i>
                </div>
            `).join("")),document.getElementById("category-modal")?.classList.remove("hidden")},window.selectCategoryIcon=(A,L)=>{const G=document.getElementById("icon-picker");G&&(G.querySelectorAll(".icon-option").forEach(q=>q.classList.remove("selected")),A.classList.add("selected"),document.getElementById("cat-icon").value=L)},window.setStoreFilter=(A,L)=>{document.querySelectorAll(".filter-pill").forEach(G=>G.classList.remove("active")),L.classList.add("active"),x=A,m(A),_()},window.toggleAllCheckboxes=A=>{const L=A.checked;document.querySelectorAll(".product-checkbox").forEach(G=>G.checked=L),R()},window.updateBulkBar=R,window.applyBulkCategory=async()=>{const A=document.getElementById("bulk-assign-cat").value;if(!A){D.warning("Selecione uma categoria.");return}const L=Array.from(document.querySelectorAll(".product-checkbox:checked")).map(q=>q.dataset.id),G=document.getElementById("btn-bulk-save");G&&(G.innerHTML='<div class="spinner-small"></div>');try{await Promise.all(L.map(q=>V.update("products",q,{categoryId:A}))),E.forEach(q=>{L.includes(q.id)&&(q.categoryId=A)}),D.success(`${L.length} produtos atualizados!`),window.cancelBulkActions(),_()}catch{D.error("Erro ao processar em massa.")}finally{G&&(G.innerText="Aplicar")}},window.cancelBulkActions=()=>{document.querySelectorAll(".product-checkbox").forEach(L=>L.checked=!1);const A=document.getElementById("select-all-products");A&&(A.checked=!1),R()};const h=["fa-utensils","fa-burger","fa-pizza-slice","fa-ice-cream","fa-coffee","fa-beer","fa-wine-glass","fa-apple-whole","fa-carrot","fa-bowl-food","fa-cake-candles","fa-candy-cane","fa-cookie","fa-glass-water","fa-mug-hot","fa-bag-shopping","fa-shirt","fa-shoe-prints","fa-glasses","fa-watch","fa-laptop","fa-mobile-screen","fa-gamepad","fa-headphones","fa-camera","fa-tv","fa-microchip","fa-car","fa-bicycle","fa-plane","fa-bus","fa-train","fa-ship","fa-anchor","fa-heart","fa-star","fa-bolt","fa-fire","fa-leaf","fa-tree","fa-sun","fa-moon","fa-droplet","fa-cloud","fa-music","fa-film","fa-book","fa-pencil","fa-palette","fa-briefcase","fa-home","fa-medkit","fa-dumbbell","fa-basketball","fa-soccer-ball","fa-baseball","fa-volleyball","fa-tag"];setTimeout(()=>{m(x);const A=document.getElementById("btn-copy-catalog");A&&(A.onclick=()=>{const J=document.getElementById("catalog-url-display")?.value;J&&navigator.clipboard.writeText(J).then(()=>D.success("Link do catálogo copiado!"))});const L=document.getElementById("btn-bulk-save"),G=document.getElementById("btn-bulk-cancel");L&&(L.onclick=()=>window.applyBulkCategory()),G&&(G.onclick=()=>window.cancelBulkActions());const q=document.getElementById("bulk-upload-section");q&&(q.addEventListener("dragover",J=>{J.preventDefault(),q.classList.add("drag-active")}),q.addEventListener("dragleave",()=>q.classList.remove("drag-active")),q.addEventListener("drop",J=>{J.preventDefault(),q.classList.remove("drag-active"),J.dataTransfer?.files&&C(J.dataTransfer.files)}))},100);const z=`
        <div id="category-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 500px;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <h2>Gerenciar Categorias</h2>
                <p class="text-muted">Crie categorias para organizar seus ${l.toLowerCase()}.</p>
                
                <form id="category-form" style="margin-top: 20px;" onsubmit="window.saveCategory(event)">
                    <div class="form-group">
                        <label>Nome da Categoria</label>
                        <input type="text" id="cat-name" placeholder="Ex: Bebidas, Sobremesas..." required>
                    </div>
                    <div class="form-group">
                        <label>Ícone (Selecione um)</label>
                        <div class="icon-picker-grid" id="icon-picker">
                            <!-- Icons will be injected here -->
                        </div>
                        <input type="hidden" id="cat-icon" value="fa-tag">
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Categoria</button>
                </form>

                <div id="categories-list" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                    <!-- Existing categories will be listed here -->
                </div>
            </div>
        </div>

        <div id="edit-cat-name-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 400px; padding: 30px;">
                 <span class="close-modal" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">&times;</span>
                 <h3>Editar Nome</h3>
                 <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 20px;">Altere o nome da categoria selecionada.</p>
                 <div class="form-group">
                    <input type="text" id="edit-cat-name-input" style="width: 100%;" required>
                 </div>
                 <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn-secondary full-width" onclick="document.getElementById('edit-cat-name-modal').classList.add('hidden')">Cancelar</button>
                    <button class="btn-primary full-width" onclick="window.updateCategoryName()">Salvar</button>
                 </div>
            </div>
        </div>
    `,H=`
        <div id="product-modal" class="modal hidden">
            <div class="modal-content glass big-modal" style="display: flex; flex-direction: column; max-height: 90vh;">
                <span class="close-modal" onclick="window.closeModals()">&times;</span>
                <div style="padding: 0 20px 20px 0;">
                    <h2 id="modal-title" style="margin-bottom: 5px;">Gerenciar ${l}</h2>
                    <p class="text-muted" style="font-size: 0.9rem;">Adicione ou edite ${l.toLowerCase()} do seu catálogo.</p>
                </div>
                
                <div style="overflow-y: auto; padding-right: 10px; flex: 1;">
                    ${u?`
                    <div class="form-group" id="store-select-group">
                        <label>Lojas de Destino (selecione uma ou mais)</label>
                        <div id="multi-store-container" class="multi-select-grid">
                            ${c.map(A=>`
                                <label class="store-checkbox-card">
                                    <input type="checkbox" name="store-ids" value="${A.id}">
                                    <span class="checkbox-label">${A.name}</span>
                                </label>
                            `).join("")}
                        </div>
                    </div>
                    `:""}

                    <div id="bulk-upload-section" class="bulk-dropzone" onclick="document.getElementById('bulk-file-input').click()">
                        <input type="file" id="bulk-file-input" multiple accept="image/*" style="display: none;" onchange="window.handleBulkFileSelection(this)">
                        <div class="dropzone-content">
                            <div class="dropzone-icon">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <h3>Importação por Imagem</h3>
                            <p>Arraste fotos dos seus ${l.toLowerCase()} aqui ou <span>clique para navegar</span></p>
                            <small>Formatos: JPG, PNG, WebP (máx 5MB/foto)</small>
                        </div>
                    </div>

                    <form id="create-product-form">
                        <div id="products-list-container" style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                            <!-- Items will be injected here -->
                        </div>

                        <div id="empty-list-msg" style="text-align: center; color: var(--text-dim); padding: 40px 20px; border: 1px dashed var(--border-color); border-radius: 12px; margin-top: 10px;">
                            <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                            Nenhum ${r.toLowerCase()} na lista de envio.
                        </div>
                    </form>
                </div>

                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                     <button type="button" class="btn-text" style="display: flex; align-items: center; gap: 8px;" onclick="window.addManualItem()">
                        <i class="fa-solid fa-plus-circle"></i> Item Manual
                     </button>
                     <div style="display: flex; gap: 12px;">
                        <button type="button" class="btn-secondary" onclick="window.closeModals()">Cancelar</button>
                        <button type="button" id="btn-save-products-trigger" class="btn-primary" style="min-width: 160px; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="window.saveProducts()">
                            <i class="fa-solid fa-save"></i> <span>Salvar ${l}</span>
                        </button>
                     </div>
                </div>
            </div>
        </div>
    `;return`
        <style>
            .bulk-dropzone {
                margin-top: 10px;
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(255, 255, 255, 0.02);
            }
            .bulk-dropzone:hover, .bulk-dropzone.drag-active {
                border-color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }
            .dropzone-icon { font-size: 2.5rem; color: var(--primary); margin-bottom: 12px; opacity: 0.8; }
            .dropzone-content h3 { margin-bottom: 4px; font-size: 1.1rem; }
            .dropzone-content p { color: var(--text-muted); font-size: 0.9rem; }
            .dropzone-content span { color: var(--primary); font-weight: 600; text-decoration: underline; }

            .product-item-card {
                display: flex;
                gap: 16px;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 16px;
                position: relative;
                transition: transform 0.2s, border-color 0.2s;
            }
            .product-item-card:hover { border-color: rgba(99, 102, 241, 0.3); }

            .item-visual { position: relative; width: 100px; }
            .image-preview-wrapper {
                width: 100px; height: 100px;
                background: rgba(0,0,0,0.3);
                border-radius: 8px; overflow: hidden;
                display: flex; align-items: center; justify-content: center;
                border: 1px solid var(--border-color);
            }
            .preview-img { width: 100%; height: 100%; object-fit: cover; }
            .preview-placeholder { font-size: 2rem; color: var(--text-dim); }

            .btn-change-img {
                position: absolute; bottom: -8px; right: -8px;
                width: 32px; height: 32px;
                background: var(--primary); color: white;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: 0.8rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                border: 2px solid var(--surface-hover);
            }

            .item-details { flex: 1; display: flex; flex-direction: column; justify-content: center; }
            .input-row { display: grid; grid-template-columns: 1fr 140px; gap: 12px; }
            .field label { font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 6px; display: block; }
            .field input {
                width: 100%; background: var(--bg-color);
                border: 1px solid var(--border-color); color: white;
                padding: 10px 12px; border-radius: 8px; font-size: 0.95rem;
            }
            .field input:focus { border-color: var(--primary); outline: none; }

            .btn-remove-item {
                position: absolute; top: 8px; right: 8px;
                width: 24px; height: 24px;
                color: var(--text-dim); font-size: 1rem; opacity: 0.5;
            }
            .btn-remove-item:hover { color: var(--danger); opacity: 1; }

            .upload-progress-overlay {
                position: absolute; inset: 0;
                background: rgba(0,0,0,0.6);
                display: flex; align-items: center; justify-content: center; z-index: 5;
            }
            .spinner-small {
                width: 20px; height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top-color: white;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin { to { transform: rotate(360deg); } }

            .btn-secondary { background: rgba(255,255,255,0.05); color: var(--text-main); padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 600; border: 1px solid var(--border-color); }
            .btn-secondary:hover { background: rgba(255,255,255,0.1); }

            .multi-select-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                gap: 8px; padding: 12px;
                background: var(--surface-hover); border-radius: 12px; border: 1px solid var(--border-color);
            }
            .store-checkbox-card {
                cursor: pointer; display: flex; align-items: center; gap: 8px;
                padding: 8px 12px; background: var(--bg-color);
                border: 1px solid var(--border-color); border-radius: 8px; transition: all 0.2s;
            }
            .store-checkbox-card:has(input:checked) { border-color: var(--primary); background: rgba(99,102,241,0.1); }
            .store-checkbox-card input { width: 16px; height: 16px; cursor: pointer; }
            .checkbox-label { font-size: 0.85rem; font-weight: 500; }

            .store-filter-container {
                display: flex; gap: 8px;
                background: var(--surface-hover); padding: 4px;
                border-radius: 12px; border: 1px solid var(--border-color);
                overflow-x: auto; max-width: calc(100vw - 400px);
            }
            .filter-pill {
                padding: 6px 16px; border-radius: 8px;
                font-size: 0.85rem; font-weight: 600;
                color: var(--text-muted); white-space: nowrap; transition: all 0.2s;
            }
            .filter-pill:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
            .filter-pill.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--primary-glow); }

            .icon-picker-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                gap: 8px; max-height: 200px; overflow-y: auto;
                background: rgba(0,0,0,0.2); padding: 10px;
                border-radius: 8px; border: 1px solid var(--border-color); margin-top: 5px;
            }
            .icon-option {
                width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                background: var(--surface-hover); border: 1px solid var(--border-color);
                border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1.2rem;
            }
            .icon-option:hover { border-color: var(--primary); }
            .icon-option.selected { background: var(--primary); border-color: var(--primary); color: white; }

            .category-item {
                display: flex; justify-content: space-between; align-items: center;
                padding: 12px; background: rgba(255,255,255,0.03);
                border-radius: 10px; margin-bottom: 10px;
                border: 1px solid var(--border-color);
            }
            #categories-list { max-height: 250px; overflow-y: auto; padding-right: 5px; }
            #categories-list::-webkit-scrollbar { width: 4px; }
            #categories-list::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }

            .btn-text { background: transparent; color: var(--primary); border: none; cursor: pointer; font-weight: 600; font-size: 0.9rem; }
            .btn-text:hover { text-decoration: underline; }

            .bulk-actions-bar {
                display: flex; align-items: center; gap: 15px;
                background: var(--primary); color: white;
                padding: 12px 20px; border-radius: 12px; margin-bottom: 20px;
                box-shadow: 0 10px 20px var(--primary-glow); animation: slideInUp 0.3s;
            }
            @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

            .bulk-select-cat {
                background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
                color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.9rem; outline: none;
            }
            .bulk-select-cat option { background: var(--surface); color: white; }
        </style>

        <div class="page-container">
            <div class="page-header" style="justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
                <div>
                     <h2 class="page-title" style="margin-bottom: 4px;">${s?"Catálogo de Serviços":"Catálogo de Produtos"}</h2>
                     <p style="color: var(--text-muted); font-size: 0.9rem;">${s?"Gerencie os serviços oferecidos pela sua empresa.":"Gerencie os produtos visíveis no cardápio das suas lojas."}</p>
                </div>
                
                <div id="catalog-link-container" class="hidden" style="flex: 1; min-width: 300px; max-width: 500px; background: rgba(99,102,241,0.1); border: 1px dashed var(--primary); border-radius: 12px; padding: 10px 15px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                    <div style="flex: 1; overflow: hidden;">
                        <span style="font-size: 0.7rem; color: var(--primary); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 2px;">Link do Catálogo</span>
                        <input type="text" id="catalog-url-display" readonly style="width: 100%; background: transparent; border: none; color: white; font-size: 0.85rem; text-overflow: ellipsis; outline: none;" value="">
                    </div>
                    <button id="btn-copy-catalog" class="btn-primary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-copy"></i> Copiar
                    </button>
                    <a id="btn-open-catalog" href="" target="_blank" class="btn-secondary" style="padding: 8px 12px; font-size: 0.8rem; flex-shrink: 0;">
                        <i class="fa-solid fa-external-link"></i>
                    </a>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button class="btn-secondary" onclick="window.openCategoryModal()"><i class="fa-solid fa-tags"></i> Categorias</button>
                    <button class="btn-primary" onclick="window.openProductModal()"><i style="color: #fff;" class="fa-solid fa-plus"></i> Novo ${r}</button>
                </div>
            </div>

            ${u?`
            <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 0.85rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Filtrar por Loja:</span>
                    <div class="store-filter-container" id="store-pills-filter">
                        <button class="filter-pill ${x==="all"?"active":""}" onclick="window.setStoreFilter('all', this)">Todas</button>
                        ${c.map(A=>`
                            <button class="filter-pill ${x===A.id?"active":""}" onclick="window.setStoreFilter('${A.id}', this)">${A.name}</button>
                        `).join("")}
                    </div>
                </div>

                <div style="display: flex; gap: 12px; flex: 1; min-width: 300px;">
                    <div style="flex: 2; position: relative;">
                        <i class="fa-solid fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                        <input type="text" id="product-search-input" placeholder="Pesquisar ${l.toLowerCase()}..." 
                            style="width: 100%; padding: 10px 10px 10px 35px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white;"
                            oninput="window.applyFilters()">
                    </div>
                    <div style="flex: 1;">
                        <select id="product-category-filter" onchange="window.applyFilters()"
                            style="width: 100%; padding: 10px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white; outline: none;">
                            <option value="all">Todas Categorias</option>
                            ${k.map(A=>`<option value="${A.id}">${A.name}</option>`).join("")}
                        </select>
                    </div>
                </div>
            </div>
            `:`
            <div style="margin-bottom: 2rem; display: flex; gap: 12px;">
                <div style="flex: 2; position: relative;">
                    <i class="fa-solid fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim);"></i>
                    <input type="text" id="product-search-input" placeholder="Pesquisar ${l.toLowerCase()}..." 
                        style="width: 100%; padding: 10px 10px 10px 35px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white;"
                        oninput="window.applyFilters()">
                </div>
                <div style="flex: 1;">
                    <select id="product-category-filter" onchange="window.applyFilters()"
                        style="width: 100%; padding: 10px; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 12px; color: white; outline: none;">
                        <option value="all">Todas Categorias</option>
                        ${k.map(A=>`<option value="${A.id}">${A.name}</option>`).join("")}
                    </select>
                </div>
            </div>
            `}
        </div>

        <div class="card">
            <div class="table-container">
                <div id="bulk-actions-container" class="hidden">
                    <div class="bulk-actions-bar">
                        <span id="bulk-count" style="font-weight: 700;">0 itens selecionados</span>
                        <div style="height: 20px; width: 1px; background: rgba(255,255,255,0.3);"></div>
                        <span>Mover para categoria:</span>
                        <select id="bulk-assign-cat" class="bulk-select-cat">
                            <option value="">Selecione...</option>
                            ${k.map(A=>`<option value="${A.id}">${A.name}</option>`).join("")}
                        </select>
                        <button id="btn-bulk-save" class="btn-primary" style="background: white; color: var(--primary); padding: 6px 15px; font-size: 0.85rem;">Aplicar</button>
                        <button id="btn-bulk-cancel" style="background:transparent; border:none; color:white; font-size: 0.85rem; cursor:pointer;">Cancelar</button>
                    </div>
                </div>

                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;"><input type="checkbox" id="select-all-products" onchange="window.toggleAllCheckboxes(this)"></th>
                            <th>${r}</th>
                            <th>Loja</th>
                            <th>Preço</th>
                            <th>${s?"Duração":"Estoque"}</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${S()}
                    </tbody>
                </table>
            </div>
        </div>
        ${H}
        ${z}
    `},x_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";let a=(await V.get("companies",n.companyId))?.stores||[];const i=n.role==="owner",s=()=>a.length===0?'<tr><td colspan="5" style="text-align:center">Nenhuma loja cadastrada.</td></tr>':a.map(l=>{const c=l.active&&l.instancia_id,u=l.frete_ativo!==!1;return`
            <tr data-store-id="${l.id}">
                <td>${l.name}</td>
                <td>${l.address}</td>
                <td><span class="badge ${c?"success":"danger"}">${c?"Operante":l.active?"Sem Instância":"Inativa"}</span></td>
                <td><span class="badge ${u?"success":"warning"}">${u?"Frete Ativo":"N/A: Retirada Apenas"}</span></td>
                <td>
                    <div class="actions">
                        ${i?`
                            <button class="action-btn" onclick="window.toggleStoreStatus('${l.id}', ${l.active})" title="${l.active?"Desativar Loja":"Ativar Loja"}">
                                ${l.active?'<i style="color: #FFF;" class="fa-solid fa-store-slash"></i>':'<i style="color: #FFF;" class="fa-solid fa-store"></i>'}
                            </button>
                            <button class="action-btn" onclick="window.toggleStoreFrete('${l.id}', ${u})" title="${u?"Desativar Frete":"Ativar Frete"}">
                                ${u?'<i style="color: #FFF;" class="fa-solid fa-truck-ramp-box"></i>':'<i style="color: #FFF;" class="fa-solid fa-truck"></i>'}
                            </button>
                        `:""}
                    </div>
                </td>
            </tr>
        `}).join(""),r=()=>{const l=document.querySelector(".data-table tbody");l&&(l.innerHTML=s())};return window.toggleStoreFrete=async(l,c)=>{try{const u=!c,g=a.map(x=>x.id===l?{...x,frete_ativo:u}:x);await V.update("companies",n.companyId,{stores:g}),a=g,r(),D.success(`Frete da loja atualizado para ${u?"ativo":"inativo"}.`)}catch(u){D.error("Erro ao atualizar frete: "+u)}},window.toggleStoreStatus=async(l,c)=>{const u=c?"desativar":"ativar";if(await Ne.warning(`${u.charAt(0).toUpperCase()+u.slice(1)} Loja`,`Deseja ${u} esta loja?`))try{const x=a.map(v=>v.id===l?{...v,active:!c}:v);await V.update("companies",n.companyId,{stores:x}),a=x,r(),D.success(`Loja ${c?"desativada":"ativada"} com sucesso!`)}catch(x){D.error("Erro ao atualizar status: "+x)}},`
        <div class="page-header">
            <h2 class="page-title">Minhas Lojas</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome da Loja</th>
                            <th>Endereço</th>
                            <th>Status Operacional</th>
                            <th>Status Frete</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s()}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card" style="margin-top: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;"><i class="fa-solid fa-info-circle"></i> Informação</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
                Apenas o administrador da plataforma pode criar, editar ou excluir lojas.<br>
                Como dono da empresa, você pode apenas ativar ou desativar lojas existentes.
            </p>
        </div>
    `},ou=async()=>{let n=await V.getAll("users");const e=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum usuário cadastrado.</td></tr>':n.map(s=>`
            <tr data-user-id="${s.id}">
                <td>${s.name||"-"}</td>
                <td>${s.email}</td>
                <td><span class="badge info">${s.role}</span></td>
                <td><span class="badge ${s.companyId?"warning":"success"}">${s.companyId?"Vinculado":"Global"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editAdminUser('${s.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),t=`
        <div id="admin-user-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2>Editar Usuário</h2>
                <form id="edit-user-form">
                    <input type="hidden" id="user-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="user-name" required>
                    </div>
                    <div class="form-group">
                        <label>Email (Apenas Leitura)</label>
                        <input type="email" id="user-email" disabled>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar Alterações</button>
                </form>
            </div>
        </div>
    `,a=()=>{const s=document.querySelector(".data-table tbody");s&&(s.innerHTML=e())};return window.editAdminUser=s=>{const r=n.find(l=>l.id===s||l.uid===s);r&&(document.getElementById("user-uid").value=r.id,document.getElementById("user-name").value=r.name||"",document.getElementById("user-email").value=r.email||"",document.getElementById("admin-user-modal").classList.remove("hidden"))},setTimeout(()=>{i()},100),`
        <div class="page-header">
            <h2 class="page-title">Usuários da Plataforma</h2>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Função</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e()}
                    </tbody>
                </table>
            </div>
        </div>
        ${t}
    `;function i(){const s=document.getElementById("admin-user-modal"),r=document.querySelector(".close-modal"),l=document.getElementById("edit-user-form");r&&s&&(r.onclick=()=>s.classList.add("hidden")),l&&(l.onsubmit=async c=>{c.preventDefault();const u=document.getElementById("user-uid").value,g=document.getElementById("user-name").value;try{await V.update("users",u,{name:g});const x=n.find(v=>v.id===u);x&&(x.name=g),a(),D.success("Usuário atualizado com sucesso!"),s&&s.classList.add("hidden")}catch(x){console.error(x),D.error("Erro ao atualizar: "+x)}})}};class th{container;inputWrapper;searchInput;dropdown;options;selectedValues;onChange;maxVisibleTags;placeholder;constructor(e,t,a=[],i=()=>{},s="Selecione...",r=10){this.options=t,this.selectedValues=new Set(a),this.onChange=i,this.maxVisibleTags=r,this.placeholder=s;const l=document.getElementById(e);if(!l)throw new Error(`Container #${e} not found`);this.container=l,this.container.className="multi-select-container",this.inputWrapper=this.createInputWrapper(),this.searchInput=this.createSearchInput(),this.dropdown=this.createDropdown(),this.inputWrapper.appendChild(this.searchInput),this.container.appendChild(this.inputWrapper),this.container.appendChild(this.dropdown),this.setupEventListeners(),this.render()}createInputWrapper(){const e=document.createElement("div");return e.className="multi-select-input",e}createSearchInput(){const e=document.createElement("input");return e.type="text",e.className="multi-select-search",e.placeholder=this.selectedValues.size===0?this.placeholder:"",e}createDropdown(){const e=document.createElement("div");return e.className="multi-select-dropdown",e}setupEventListeners(){this.inputWrapper.addEventListener("click",e=>{e.stopPropagation(),this.searchInput.focus(),this.openDropdown()}),this.searchInput.addEventListener("input",()=>{this.renderDropdown(),this.openDropdown()}),this.searchInput.addEventListener("keydown",e=>{if(e.key==="Backspace"&&this.searchInput.value===""&&this.selectedValues.size>0){const t=Array.from(this.selectedValues).pop();t&&this.toggleOption(t)}}),document.addEventListener("click",e=>{this.container.contains(e.target)||this.closeDropdown()})}openDropdown(){this.dropdown.classList.add("active"),this.inputWrapper.classList.add("active")}closeDropdown(){this.dropdown.classList.remove("active"),this.inputWrapper.classList.remove("active"),this.searchInput.value="",this.renderDropdown()}render(){this.renderTags(),this.renderDropdown()}renderTags(){this.inputWrapper.querySelectorAll(".multi-select-tag, .multi-select-more").forEach(i=>i.remove());const t=Array.from(this.selectedValues);if(t.slice(0,this.maxVisibleTags).forEach(i=>{const s=this.options.find(r=>r.value===i);if(s){const r=this.createTag(s);this.inputWrapper.insertBefore(r,this.searchInput)}}),t.length>this.maxVisibleTags){const i=document.createElement("span");i.className="multi-select-more",i.textContent=`+${t.length-this.maxVisibleTags}`,this.inputWrapper.insertBefore(i,this.searchInput)}this.searchInput.placeholder=this.selectedValues.size===0?this.placeholder:""}createTag(e){const t=document.createElement("div");t.className="multi-select-tag";const a=document.createElement("span");a.textContent=e.label;const i=document.createElement("button");return i.className="multi-select-tag-remove",i.innerHTML='<i class="fa-solid fa-xmark"></i>',i.onclick=s=>{s.stopPropagation(),this.toggleOption(e.value)},t.appendChild(a),t.appendChild(i),t}renderDropdown(){this.dropdown.innerHTML="";const e=this.searchInput.value.toLowerCase(),t=this.options.filter(a=>a.label.toLowerCase().includes(e)||a.meta&&a.meta.toLowerCase().includes(e));if(t.length===0){const a=document.createElement("div");a.className="multi-select-no-results",a.textContent="Nenhum resultado encontrado",this.dropdown.appendChild(a);return}t.forEach(a=>{const i=this.createOption(a);this.dropdown.appendChild(i)})}createOption(e){const t=document.createElement("div");t.className="multi-select-option",this.selectedValues.has(e.value)&&t.classList.add("selected");const a=document.createElement("div");a.className="multi-select-checkbox";const i=document.createElement("div");if(i.className="multi-select-option-label",i.textContent=e.label,t.appendChild(a),t.appendChild(i),e.meta){const s=document.createElement("div");s.className="multi-select-option-meta",s.textContent=e.meta,t.appendChild(s)}return t.addEventListener("click",s=>{s.stopPropagation(),this.toggleOption(e.value),this.searchInput.value="",this.searchInput.focus(),this.renderDropdown()}),t}toggleOption(e){this.selectedValues.has(e)?this.selectedValues.delete(e):this.selectedValues.add(e),this.renderTags(),this.renderDropdown(),this.onChange(Array.from(this.selectedValues))}getValues(){return Array.from(this.selectedValues)}setValues(e){this.selectedValues=new Set(e),this.render()}destroy(){this.container.innerHTML=""}}const __=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Erro: Usuário sem empresa associada.</p>";const a=(await V.get("companies",n.companyId))?.stores||[];let i=null,r=(await V.getAll("users",{field:"companyId",operator:"==",value:n.companyId})).filter(v=>v.role==="employee");const l=v=>{let P=[];return!v||(typeof v=="string"?P=v===""?[]:[v]:P=v,P.length===0)?"Todas":P.map(O=>{const E=a.find(k=>k.id===O);return E?E.name:O}).join(", ")},c=()=>r.length===0?'<tr><td colspan="6" style="text-align:center">Nenhum colaborador cadastrado.</td></tr>':r.map(v=>`
            <tr data-user-id="${v.id}">
                <td>${v.name||"Sem Nome"}</td>
                <td>${v.email}</td>
                <td><span class="badge primary">Atendente</span></td>
                <td>${l(v.storeIds||v.storeId)}</td>
                <td><span class="badge ${v.active!==!1?"success":"danger"}">${v.active!==!1?"Ativo":"Inativo"}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editEmployee('${v.id}')" title="Editar"><i style="color: #fff;" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleEmployeeStatus('${v.id}', ${v.active!==!1})" title="${v.active!==!1?"Desativar":"Ativar"}">${v.active!==!1?'<i style="color: #fff;" class="fa-solid fa-ban"></i>':'<i style="color: #fff;" class="fa-solid fa-check"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteEmployee('${v.id}')" title="Excluir"><i style="color: #fff;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),u=`
        <div id="employee-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal">&times;</span>
                <h2 id="modal-title">Novo Colaborador</h2>
                <form id="create-employee-form">
                    <input type="hidden" id="emp-uid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" id="emp-name" required>
                    </div>
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="emp-email" required>
                    </div>
                    <div class="form-group" id="pwd-group">
                        <label>Senha</label>
                        <input type="password" id="emp-password" required>
                        <small style="color: #999; font-size: 0.8em; display: none;" id="pwd-hint">Deixe em branco para manter a senha atual.</small>
                    </div>
                    <div class="form-group">
                         <label>Lojas de Atuação</label>
                         <div id="employee-stores-select"></div>
                    </div>
                    <button type="submit" class="btn-primary full-width">Salvar</button>
                </form>
            </div>
        </div>
    `,g=()=>{const v=document.querySelector(".data-table tbody");v&&(v.innerHTML=c())};return window.editEmployee=v=>{const P=r.find(N=>N.id===v||N.uid===v);if(P){if(document.getElementById("emp-uid").value=P.id,document.getElementById("emp-name").value=P.name,document.getElementById("emp-email").value=P.email,i){const N=P.storeIds||(P.storeId?[P.storeId]:[]);i.setValues(N)}document.getElementById("emp-password").required=!1,document.getElementById("pwd-hint").style.display="block",document.getElementById("emp-email").disabled=!0,document.getElementById("modal-title").innerText="Editar Colaborador",document.getElementById("employee-modal").classList.remove("hidden")}},window.toggleEmployeeStatus=async(v,P)=>{try{await V.update("users",v,{active:!P});const N=r.find(O=>O.id===v);N&&(N.active=!P),g(),D.success(`Colaborador ${P?"desativado":"ativado"} com sucesso!`)}catch(N){D.error("Erro ao atualizar status: "+N)}},window.deleteEmployee=async v=>{if(await Ne.danger("Excluir Colaborador","Tem certeza que deseja EXCLUIR este colaborador? Esta ação não pode ser desfeita."))try{await V.delete("users",v),r=r.filter(N=>N.id!==v),g(),D.success("Colaborador excluído com sucesso!")}catch(N){D.error("Erro ao excluir: "+N)}},setTimeout(()=>{x(n.companyId)},100),`
        <style>
            .checkbox-group { display: flex; flex-direction: column; gap: 0.5rem; }
            .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
            .checkbox-label input[type="checkbox"] { cursor: pointer; }
        </style>
        <div class="page-header">
            <h2 class="page-title">Minha Equipe</h2>
            <button id="btn-new-employee" class="btn-primary"><i style="color: #fff;" class="fa-solid fa-user-plus"></i> Novo Colaborador</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Lojas</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${c()}
                    </tbody>
                </table>
            </div>
        </div>
        ${u}
    `;function x(v){const P=document.getElementById("employee-modal"),N=document.getElementById("btn-new-employee"),O=document.querySelector(".close-modal"),E=document.getElementById("create-employee-form"),k=a.map(T=>({value:T.id,label:T.name}));i=new th("employee-stores-select",k,[],()=>{},"Selecione as lojas..."),N&&P&&(N.onclick=()=>{document.getElementById("emp-uid").value="",document.getElementById("create-employee-form").reset(),document.getElementById("emp-password").required=!0,document.getElementById("pwd-hint").style.display="none",document.getElementById("emp-email").disabled=!1,document.getElementById("modal-title").innerText="Novo Colaborador",i&&i.setValues([]),P.classList.remove("hidden")}),O&&P&&(O.onclick=()=>P.classList.add("hidden")),E&&(E.onsubmit=async T=>{T.preventDefault();const S=document.getElementById("emp-uid").value,_=document.getElementById("emp-name").value,R=document.getElementById("emp-email").value,M=document.getElementById("emp-password").value,p=i?i.getValues():[];try{if(S){const m={name:_,storeIds:p.length>0?p:[]};await V.update("users",S,m);const y=r.find(b=>b.id===S);y&&Object.assign(y,m),D.success("Colaborador atualizado com sucesso!")}else{const m=await Ae.registerUser(R,M),y={uid:m,name:_,email:R,role:"employee",companyId:v,storeIds:p.length>0?p:[],active:!0,permissions:["orders","products"]};await V.set("users",m,y),r.push({id:m,...y}),D.success("Colaborador adicionado com sucesso!")}P&&P.classList.add("hidden"),g()}catch(m){console.error(m),D.error("Erro: "+m)}})}},E_=()=>`
        <div class="config-container">
            <div class="card config-card">
                <div class="card-header">
                    <h3>Modo de Operação da IA</h3>
                </div>
                <div class="config-options">
                    <div class="config-option active">
                        <div class="option-header">
                            <input type="radio" name="ia-mode" checked>
                            <label>Modo 1 – IA baseada em produtos</label>
                        </div>
                        <p>A IA consulta os produtos cadastrados na dashboard e valida o estoque.</p>
                    </div>
                    <div class="config-option">
                        <div class="option-header">
                            <input type="radio" name="ia-mode">
                            <label>Modo 2 – IA em modo aberto</label>
                        </div>
                        <p>A IA conversa livremente. Todo pedido é enviado para aceite humano manual.</p>
                    </div>
                </div>
            </div>

            <div class="card config-card">
                <div class="card-header">
                    <h3>Prompt Personalizado</h3>
                </div>
                <div class="prompt-editor">
                    <textarea placeholder="Digite o prompt base para a IA desta empresa...">Você é um assistente virtual para a Loja Centro. Seu objetivo é ajudar o cliente a escolher produtos e fechar pedidos no WhatsApp de forma amigável e eficiente.</textarea>
                </div>
                <div class="config-footer">
                    <button class="btn-primary">Salvar Configurações</button>
                </div>
            </div>
        </div>
    `,I_=()=>`
        <div class="login-wrapper">
            <div class="login-card glass">
                <div class="login-header">
                    <div class="logo-icon large"><img style="width: 100%;" src="/logo.png" alt="Logo"></div>
                    <h1>AutoQui</h1>
                    <p>Entre com suas credenciais para acessar a plataforma.</p>
                </div>
                <form id="login-form" class="login-form">
                    <div class="form-group">
                        <label>E-mail</label>
                        <input type="email" id="email" placeholder="Seu e-mail" required>
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="password" placeholder="Sua senha" required>
                    </div>
                    <button type="submit" class="btn-primary full-width">Acessar Sistema</button>
                </form>
            </div>
        </div>
    `;async function k_(){const n=Fo().currentUser;if(!n)throw new Error("Usuário não autenticado");return n.getIdToken()}async function vs(n,e,t){const a=await k_(),i=await fetch(e,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:t!==void 0?JSON.stringify(t):void 0});if(!i.ok){const s=await i.json().catch(()=>({error:`HTTP ${i.status}`}));throw new Error(s.error||`Erro ${i.status}`)}return i.json()}const Yn={get:n=>vs("GET",n),post:(n,e)=>vs("POST",n,e),patch:(n,e)=>vs("PATCH",n,e),delete:n=>vs("DELETE",n)},T_=async()=>{let n=await V.getAll("companies"),e=null,t=["venda"];const a=[{value:"catalogo",label:"🛍️ Catálogo"},{value:"venda",label:"🤖 IA de Venda"},{value:"agendamento",label:"📅 IA de Agendamento"},{value:"disparo",label:"📣 Disparo em Massa"}],i=()=>n.length===0?'<tr><td colspan="5" style="text-align:center">Nenhum cliente cadastrado.</td></tr>':n.map(g=>`
            <tr data-company-id="${g.id}">
                <td>${g.name}</td>
                <td><span class="badge ${g.status==="active"?"success":"danger"}">${g.status==="active"?"Ativo":"Inativo"}</span></td>
                <td><div style="display:flex; gap:4px; flex-wrap:wrap;">${(g.modulos_ativos||[]).map(x=>`<span class="badge info" style="font-size:0.7rem;">${x}</span>`).join("")}</div></td>
                <td>${g.stores?g.stores.length:0}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="window.editCompany('${g.id}')" title="Editar"><i style="color: #fff" class="fa-solid fa-pen-to-square"></i></button>
                        <button class="action-btn" onclick="window.toggleCompanyStatus('${g.id}', '${g.status}')" title="${g.status==="active"?"Desativar":"Ativar"}">${g.status==="active"?'<i style="color: #ef4444;" class="fa-solid fa-toggle-off"></i>':'<i style="color: #22c55e;" class="fa-solid fa-toggle-on"></i>'}</button>
                        <button class="action-btn" onclick="window.deleteCompany('${g.id}', '${g.name.replace(/'/g,"\\'")}')" title="Excluir empresa"><i style="color: #ef4444;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),s=`
        <div id="company-modal" class="modal hidden">
            <div class="modal-content glass big-modal">
                <span class="close-modal">&times;</span>
                <h2 id="company-modal-title">Novo Cliente</h2>
                <form id="create-company-form">
                    <input type="hidden" id="company-id">
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Nome do Cliente</label>
                            <input type="text" id="company-name" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Limite de Instâncias</label>
                            <input type="number" id="company-instances-limit" min="1" value="1" required>
                        </div>
                    </div>

                    <div id="owner-section">
                        <h3>Dono do Cliente</h3>
                        <div class="form-row">
                            <div class="form-group half">
                                <label>Email</label>
                                <input type="email" id="owner-email">
                            </div>
                            <div class="form-group half">
                                <label>Senha</label>
                                <input type="password" id="owner-password">
                            </div>
                        </div>
                        <p style="font-size: 0.8em; color: #888; margin-top: -10px; margin-bottom: 10px;">Preencha apenas se for criar um novo usuário dono.</p>
                    </div>

                    <h3>Lojas / Unidades <span style="color: #ef4444;">*</span></h3>
                    <p style="font-size: 0.85em; color: #999; margin-top: -8px; margin-bottom: 12px;">Mínimo de 1 loja obrigatória</p>
                    <div class="stores-section">
                        <div id="stores-list">
                            <!-- Store inputs will be added here -->
                        </div>
                        <button type="button" id="btn-add-store" class="btn-secondary small"><i class="fa-solid fa-plus"></i> Adicionar Loja</button>
                    </div>

                    <h3>Módulos Ativos</h3>
                    <div class="form-row">
                        <div id="modules-select-container"></div>
                    </div>

                    <button type="submit" class="btn-primary full-width" style="margin-top:1rem;">Salvar Cliente</button>
                </form>
            </div>
        </div>
    `,r=()=>{const g=document.querySelector(".data-table tbody");g&&(g.innerHTML=i())};window.editCompany=g=>{const x=n.find(v=>v.id===g);if(x){if(document.getElementById("company-id").value=x.id,document.getElementById("company-name").value=x.name,document.getElementById("company-instances-limit").value=(x.limite_instancias||"1").toString(),e){const P=x.modulos_ativos||["venda"];e.setValues(P),t=P}document.getElementById("owner-section").style.display="none",document.getElementById("owner-email").required=!1,document.getElementById("owner-password").required=!1;const v=document.getElementById("stores-list");v.innerHTML="",x.stores&&x.stores.length>0?x.stores.forEach(P=>{l(P)}):l(),document.getElementById("company-modal-title").innerText="Editar Cliente",document.getElementById("company-modal").classList.remove("hidden")}},window.deleteCompany=async(g,x)=>{const v=document.createElement("div");v.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;",v.innerHTML=`
            <div style="background:#1e1e2e;border:1px solid #ef4444;border-radius:16px;padding:2rem;max-width:440px;width:90%;box-shadow:0 0 40px rgba(239,68,68,0.3);">
                <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem;">
                    <div style="width:44px;height:44px;background:rgba(239,68,68,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;font-size:1.2rem;"></i>
                    </div>
                    <h3 style="margin:0;color:#ef4444;font-size:1.1rem;">Excluir Empresa</h3>
                </div>
                <p style="color:#cbd5e1;margin-bottom:0.5rem;line-height:1.6;">
                    Esta ação é <strong style="color:white;">irreversível</strong>. Serão apagados permanentemente:
                </p>
                <ul style="color:#94a3b8;font-size:0.85rem;margin:0.5rem 0 1.25rem 1rem;line-height:2;">
                    <li>Todos os leads e mensagens</li>
                    <li>Todos os pedidos</li>
                    <li>Todos os produtos e categorias</li>
                    <li>Instâncias WhatsApp e configurações</li>
                    <li>Usuários, assinatura e histórico</li>
                </ul>
                <p style="color:#e2e8f0;margin-bottom:0.5rem;font-size:0.9rem;">
                    Digite <strong style="color:#ef4444;">${x}</strong> para confirmar:
                </p>
                <input id="delete-confirm-input" type="text" placeholder="Nome da empresa..."
                    style="width:100%;padding:0.75rem;background:#0f172a;border:1px solid #334155;border-radius:8px;color:white;font-size:0.95rem;margin-bottom:1rem;box-sizing:border-box;outline:none;">
                <div style="display:flex;gap:0.75rem;">
                    <button id="delete-cancel-btn" style="flex:1;padding:0.75rem;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid #334155;color:#94a3b8;cursor:pointer;font-size:0.9rem;">Cancelar</button>
                    <button id="delete-confirm-btn" disabled style="flex:1;padding:0.75rem;border-radius:8px;background:#ef4444;border:none;color:white;cursor:pointer;font-size:0.9rem;font-weight:700;opacity:0.4;transition:opacity 0.2s;">
                        <i class="fa-solid fa-trash" style="margin-right:6px;"></i>Excluir Tudo
                    </button>
                </div>
            </div>
        `,document.body.appendChild(v);const P=v.querySelector("#delete-confirm-input"),N=v.querySelector("#delete-confirm-btn"),O=v.querySelector("#delete-cancel-btn");P.addEventListener("input",()=>{const E=P.value.trim()===x;N.disabled=!E,N.style.opacity=E?"1":"0.4"}),O.addEventListener("click",()=>v.remove()),N.addEventListener("click",async()=>{N.disabled=!0,N.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Excluindo...';try{const E=await Yn.delete(`/admin/company/${g}`);v.remove(),n=n.filter(k=>k.id!==g),r(),D.success(`Empresa "${x}" excluída — ${E.total} registros removidos.`)}catch(E){v.remove(),D.error("Erro ao excluir: "+E.message)}}),setTimeout(()=>P.focus(),100)},window.toggleCompanyStatus=async(g,x)=>{const v=x==="active"?"inactive":"active",P=v==="inactive"?"desativar":"ativar";let N=`Deseja ${P} este cliente?`;if(v==="inactive"&&(N+=`

⚠️ ATENÇÃO: Todos os usuários (dono e funcionários) serão BLOQUEADOS de fazer login!`),await Ne.warning(`${P.charAt(0).toUpperCase()+P.slice(1)} Cliente`,N))try{await V.update("companies",g,{status:v});const E=n.find(k=>k.id===g);E&&(E.status=v),r(),D.success(`Cliente ${v==="inactive"?"desativado":"ativado"} com sucesso!`)}catch(E){D.error("Erro ao atualizar status: "+E)}};const l=(g=null)=>{const x=document.getElementById("stores-list");if(!x)return;const v=document.createElement("div");v.className="store-row",g&&(v.dataset.id=g.id,v.dataset.active=g.active!==void 0?g.active:"true",v.dataset.freteAtivo=g.frete_ativo!==void 0?g.frete_ativo:"true",v.dataset.instanciaId=g.instancia_id||""),v.innerHTML=`
            <input type="text" placeholder="Nome da Loja" class="store-name" value="${g?.name||""}" required>
            <input type="text" placeholder="Endereço Completo" class="store-address" value="${g?.address||""}" required>
            <button type="button" class="btn-remove-store" title="Remover">✕</button>
        `,v.querySelector(".btn-remove-store").addEventListener("click",()=>{v.remove()}),x.appendChild(v)},c=`
        <div class="page-header">
            <h2 class="page-title">Gestão de Clientes</h2>
            <button id="btn-new-company" class="btn-primary"><i class="fa-solid fa-plus"></i> Novo Cliente</button>
        </div>

        <div class="card">
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Módulos Ativos</th>
                            <th>Lojas</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${i()}
                    </tbody>
                </table>
            </div>
        </div>
        ${s}
    `;function u(g){const x=document.getElementById("company-modal"),v=document.getElementById("btn-new-company"),P=document.querySelector(".close-modal"),N=document.getElementById("create-company-form"),O=document.getElementById("btn-add-store"),E=document.getElementById("stores-list");e=new th("modules-select-container",a,["venda"],k=>{const T=k.find(S=>!t.includes(S));if(T==="venda"&&k.includes("agendamento")){const S=k.filter(_=>_!=="agendamento");e?.setValues(S),t=S,D.warning("IA de Venda e IA de Agendamento não podem ser usadas juntas.");return}if(T==="agendamento"&&k.includes("venda")){const S=k.filter(_=>_!=="venda");e?.setValues(S),t=S,D.warning("IA de Agendamento e IA de Venda não podem ser usadas juntas.");return}t=k},"Selecione os módulos..."),v&&x&&(v.onclick=()=>{document.getElementById("company-id").value="",document.getElementById("create-company-form").reset(),document.getElementById("owner-section").style.display="block",document.getElementById("owner-email").required=!0,document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",document.getElementById("owner-password").required=!0,document.getElementById("company-modal-title").innerText="Novo Cliente",e&&(e.setValues(["venda"]),t=["venda"]),E&&(E.innerHTML="",g()),x.classList.remove("hidden")}),P&&x&&(P.onclick=()=>x.classList.add("hidden")),O&&(O.onclick=()=>g()),N&&(N.onsubmit=async k=>{k.preventDefault();const T=document.getElementById("company-id").value,S=document.getElementById("company-name").value,_=document.getElementById("owner-email").value,R=document.getElementById("owner-password").value,M=parseInt(document.getElementById("company-instances-limit").value)||1,p=e?e.getValues():["venda"];if(p.includes("venda")&&p.includes("agendamento")){D.error("IA de Venda e IA de Agendamento não podem ser ativadas juntas no mesmo cliente.");return}if(!p.some(w=>["catalogo","venda","agendamento"].includes(w))){D.error("Selecione ao menos um módulo principal (Catálogo, IA de Venda ou IA de Agendamento).");return}const y=document.querySelectorAll(".store-row"),b=[];if(y.forEach((w,C)=>{const h=w.querySelector(".store-name").value,z=w.querySelector(".store-address").value;if(h&&z){const H=w.dataset.id,A=w.dataset.active!=="false",L=w.dataset.freteAtivo!=="false",G=w.dataset.instanciaId||null;b.push({id:H||`store_${Date.now()}_${C}`,name:h,address:z,active:A,frete_ativo:L,instancia_id:G})}}),b.length===0){D.warning("É necessário cadastrar pelo menos 1 loja!");return}try{if(T){await V.update("companies",T,{name:S,stores:b,limite_instancias:M,modulos_ativos:p});const w=n.find(C=>C.id===T);w&&(w.name=S,w.stores=b,w.modulos_ativos=p),D.success("Cliente atualizado com sucesso!")}else{const w=await Ae.registerUser(_,R),C=await V.create("companies",{name:S,stores:b,limite_instancias:M,status:"active",ownerId:w,modulos_ativos:p,metrics:{totalMessages:0,totalPayments:0}});await V.set("users",w,{uid:w,email:_,role:"owner",companyId:C}),n.push({id:C,name:S,stores:b,status:"active",ownerId:w,modulos_ativos:p,metrics:{totalMessages:0,totalPayments:0}}),D.success("Cliente criado com sucesso!")}x&&x.classList.add("hidden"),r()}catch(w){console.error(w),D.error("Erro: "+w)}})}return setTimeout(()=>{u(l)},100),c},A_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await V.get("companies",n.companyId),a=t.limite_instancias||1;let i=await V.getAll("instancias",{field:"empresaId",operator:"==",value:n.companyId});setTimeout(async()=>{let k=!1;for(const T of i)try{const _=(await ct.getInstanceStatus(T.nome)).connected?"conectado":"desconectado";_!==T.status&&(await V.update("instancias",T.id,{status:_}),T.status=_,k=!0)}catch(S){console.error("Error verifying status for",T.nome,S)}k&&v()},500);const r=()=>i.length===0?'<tr><td colspan="7" style="text-align:center">Nenhuma instância criada.</td></tr>':i.map(k=>`
            <tr>
                <td>${k.nome}</td>
                <td>${k.numero?k.numero.split("@")[0]:"-"}</td>
                <td>
                    <span class="badge ${l(k.status)}">
                        ${c(k.status)}
                    </span>
                </td>
                <td><span class="badge info">${t.stores?.find(T=>T.id===k.lojaId)?.name||"Global"}</span></td>
                <td>
                    <span class="badge ${u(k.funcao)}" style="cursor:pointer;" onclick="window.editInstance('${k.id}', '${k.funcao||""}', '${k.lojaId||""}')" title="Clique para editar">
                        ${g(k.funcao)} <i class="fa-solid fa-pen" style="font-size:0.6rem; opacity:0.7; margin-left:4px;"></i>
                    </span>
                </td>
                <td>${k.createdAt?.toDate?k.createdAt.toDate().toLocaleDateString():"N/A"}</td>
                <td>
                    <div class="actions">
                        ${k.status==="desconectado"?`<button class="action-btn" onclick="window.connectInstance('${k.nome}')" title="Conectar"><i style="color: #FFF;" class="fa-solid fa-qrcode"></i></button>`:""}
                        <button class="action-btn" onclick="window.shareQR('${k.nome}')" title="Compartilhar Link QR" style="background-color: #6366f1; border-color: #6366f1;"><i style="color: #FFF;" class="fa-solid fa-share-nodes"></i></button>
                        <button class="action-btn" onclick="window.editInstance('${k.id}', '${k.funcao||""}', '${k.lojaId||""}')" title="Configurar" style="background-color: #0ea5e9; border-color: #0ea5e9;"><i style="color: #FFF;" class="fa-solid fa-sliders"></i></button>
                        ${k.status==="conectado"?`<button class="action-btn" onclick="window.logoutInstance('${k.id}', '${k.nome}')" title="Desconectar" style="background-color: var(--warning); border-color: var(--warning);"><i style="color: #FFF;" class="fa-solid fa-right-from-bracket"></i></button>`:""}
                        <button class="action-btn" onclick="window.deleteInstance('${k.id}', '${k.nome}')" title="Excluir"><i style="color: #FFF;" class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join(""),l=k=>{switch(k){case"conectado":return"success";case"desconectado":return"danger";default:return"secondary"}},c=k=>{switch(k){case"conectado":return"Conectado";case"desconectado":return"Desconectado";default:return k}},u=k=>{switch(k){case"agendamento":return"primary";case"venda":return"success";case"catalogo":return"info";default:return"secondary"}},g=k=>{switch(k){case"agendamento":return"📅 Agendamento";case"venda":return"🛍️ Vendas";case"catalogo":return"🏪 Catálogo";default:return"Sem função"}},x=`
        <div id="new-instance-modal" class="modal hidden">
            <div class="modal-content glass">
                <span class="close-modal" id="close-new-modal">&times;</span>
                <h2>Nova Instância</h2>
                <form id="create-instance-form">
                    <div class="form-group">
                        <label>Identificador da Instância (Uso Interno)</label>
                        <input type="text" id="instance-name" required placeholder="Ex: Matriz 01, Vendas Norte...">
                    </div>
                    <button type="submit" class="btn-primary full-width" style="margin-top: 1rem;">Criar e Gerar QR Code</button>
                </form>
            </div>
        </div>

        <div id="qrcode-modal" class="modal hidden">
            <div class="modal-content glass" style="text-align: center;">
                <span class="close-modal" id="close-qr-modal">&times;</span>
                <h2>Conectar WhatsApp</h2>
                <p>Escaneie o QR Code abaixo com o seu WhatsApp.</p>
                <div id="qrcode-container" style="margin: 20px auto; width: 250px; height: 250px; background: #eee; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-spinner fa-spin fa-2x"></i>
                </div>
                <button id="btn-done-qrcode" class="btn-primary full-width">Concluir</button>
            </div>
        </div>

        <div id="edit-instance-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 420px;">
                <span class="close-modal" id="close-edit-modal">&times;</span>
                <h2><i class="fa-solid fa-sliders"></i> Configurar Instância</h2>
                <input type="hidden" id="edit-instance-id">
                <div class="form-group" style="margin-top: 1.2rem;">
                    <label>Função da IA</label>
                    <select id="edit-funcao" class="form-control">
                        <option value="">— Sem função —</option>
                        <option value="venda">🛍️ IA Vendas (WhatsApp)</option>
                        <option value="agendamento">📅 IA Agendamento</option>
                        <option value="catalogo">🏪 Catálogo</option>
                    </select>
                    <small style="color: var(--text-dim); margin-top: 0.4rem; display: block;">
                        Determina qual IA responde às mensagens desta instância.
                    </small>
                </div>
                <div class="form-group">
                    <label>Loja vinculada</label>
                    <select id="edit-loja" class="form-control">
                        <option value="">— Global (todas as lojas) —</option>
                        ${(t.stores||[]).map(k=>`<option value="${k.id}">${k.name}</option>`).join("")}
                    </select>
                </div>
                <button id="btn-save-instance-config" class="btn-primary full-width" style="margin-top: 1rem;">
                    <i class="fa-solid fa-floppy-disk"></i> Salvar Configuração
                </button>
            </div>
        </div>
    `,v=()=>{const k=document.querySelector(".data-table tbody");k&&(k.innerHTML=r())};let P=null,N=null;const O=()=>{P&&clearInterval(P),N&&clearInterval(N),P=null,N=null};window.refreshApp=()=>{window.location.reload()},window.shareQR=k=>{const T=`${window.location.origin}/qr/${k}`;navigator.clipboard.writeText(T),D.success("Link de conexão copiado para a área de transferência!")},window.editInstance=(k,T,S)=>{const _=document.getElementById("edit-instance-modal");if(!_)return;document.getElementById("edit-instance-id").value=k;const R=document.getElementById("edit-funcao");R.value=T||"";const M=document.getElementById("edit-loja");M.value=S||"",_.classList.remove("hidden")},window.deleteInstance=async(k,T)=>{if(await Ne.danger("Excluir Instância",`Tem certeza que deseja excluir a instância "${T}"? Isso irá desconectar o WhatsApp.`))try{await ct.deleteInstance(T),await V.delete("instancias",k),i=i.filter(_=>_.id!==k),v(),D.success("Instância excluída com sucesso.")}catch(_){D.error("Erro ao excluir instância: "+_)}},window.logoutInstance=async(k,T)=>{if(await Ne.warning("Desconectar WhatsApp",`Deseja realmente desconectar o WhatsApp da instância "${T}"?`))try{if(D.info("Desconectando..."),await ct.logoutInstance(T)){await V.update("instancias",k,{status:"desconectado"});const R=i.find(M=>M.id===k);R&&(R.status="desconectado"),v(),D.success("Desconectado com sucesso.")}else D.error("Não foi possível desconectar pela API. Verifique se a instância está ativa.")}catch(_){D.error("Erro ao desconectar: "+_)}},window.connectInstance=async k=>{const T=document.getElementById("qrcode-modal"),S=document.getElementById("qrcode-container");if(T&&S){T.classList.remove("hidden"),S.innerHTML='<i class="fa-solid fa-spinner fa-spin fa-2x"></i>';const _=async()=>{try{const p=await ct.getQRCode(k);p&&p.base64?S.innerHTML=`<img src="${p.base64}" style="width: 100%; height: 100%; object-fit: contain;">`:(await ct.getInstanceStatus(k)).connected?M():S.innerHTML="<p>Erro ao obter QR Code. Verifique se a instância está ativa.</p>"}catch(p){console.error("Error fetching QR:",p)}},R=async()=>{try{(await ct.getInstanceStatus(k)).connected&&M()}catch(p){console.error("Error checking status:",p)}},M=async()=>{O(),D.success("WhatsApp conectado com sucesso!"),T.classList.add("hidden");const p=i.find(m=>m.nome===k);p&&(await V.update("instancias",p.id,{status:"conectado"}),p.status="conectado",v())};await _(),P=setInterval(_,4e4),N=setInterval(R,3e3)}},setTimeout(()=>{E(t.id,a)},100);function E(k,T){const S=document.getElementById("btn-new-instance"),_=document.getElementById("new-instance-modal"),R=document.getElementById("close-new-modal"),M=document.getElementById("create-instance-form"),p=document.getElementById("qrcode-modal"),m=document.getElementById("close-qr-modal"),y=document.getElementById("btn-done-qrcode");S&&(S.onclick=()=>{if(i.length>=T){D.error("Limite de instâncias atingido.");return}_?.classList.remove("hidden")}),R&&_&&(R.onclick=()=>_.classList.add("hidden")),M&&(M.onsubmit=async h=>{h.preventDefault();let H=document.getElementById("instance-name").value.trim();H=H.replace(/[^a-zA-Z0-9]/g,"_").toLowerCase();const A=`${H}_${k.substring(0,5)}`;try{if(await ct.instanceExists(A)){D.warning("Já existe uma instância com esse nome. Tente outro.");return}D.info("Criando instância, aguarde..."),await ct.createInstance(A);const G={empresaId:k,lojaId:null,nome:A,numero:null,status:"desconectado",funcao:null,webhookUrl:null,upsert:!1},q=await V.create("instancias",G);i.push({id:q,...G,createdAt:{toDate:()=>new Date}}),D.success("Instância criada! Agora vincule-a a uma loja nas configurações."),_?.classList.add("hidden"),v(),window.connectInstance(A)}catch(L){D.error("Erro ao criar instância: "+L)}}),m&&p&&(m.onclick=()=>{O(),p.classList.add("hidden")}),y&&p&&(y.onclick=async()=>{O(),p.classList.add("hidden"),window.location.reload()});const b=document.getElementById("edit-instance-modal"),w=document.getElementById("close-edit-modal"),C=document.getElementById("btn-save-instance-config");w&&b&&(w.onclick=()=>b.classList.add("hidden")),C&&(C.onclick=async()=>{const h=document.getElementById("edit-instance-id").value,z=document.getElementById("edit-funcao").value,H=document.getElementById("edit-loja").value;if(!h)return;C.setAttribute("disabled","true");const A=C.innerHTML;C.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{await V.update("instancias",h,{funcao:z||null,lojaId:H||null});const L=i.find(G=>G.id===h);L&&(L.funcao=z,L.lojaId=H,v()),b?.classList.add("hidden"),D.success("Configuração salva com sucesso!")}catch(L){D.error("Erro ao salvar: "+L)}finally{C.removeAttribute("disabled"),C.innerHTML=A}})}return`
        <div class="page-header">
            <h2 class="page-title">Gerenciar Instâncias</h2>
            <button id="btn-new-instance" class="btn-primary" ${i.length>=a?'disabled style="opacity: 0.5; cursor: not-allowed;"':""}>
                <i class="fa-solid fa-plus"></i> Nova Instância
            </button>
        </div>
        
        <div class="card">
            <div class="stats-row" style="margin-bottom: 20px; display: flex; gap: 20px;">
                <div class="stat-item">
                    <strong>Limite:</strong> ${a}
                </div>
                <div class="stat-item">
                    <strong>Utilizadas:</strong> ${i.length}
                </div>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Identificador</th>
                            <th>Número</th>
                            <th>Status</th>
                            <th>Loja</th>
                            <th>Função</th>
                            <th>Criado Em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r()}
                    </tbody>
                </table>
            </div>
        </div>
        ${x}
    `},C_=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{telefone_lead}}",label:"Telefone",icon:"fa-phone"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],S_=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito para retirada e já está sendo preparado. 

💰 Valor: R$ {{valor_total}}

Aguardamos você!`},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! 💳 Pagamento confirmado! Seu pedido #{{numero_pedido}} está sendo preparado."},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! 📦 Seu pedido #{{numero_pedido}} já está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"🚚 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} saiu para entrega no endereço: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue",icon:"fa-flag-checkered",default:"🏁 Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi entregue. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."}],P_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,a=await V.getAll("instancias",{field:"empresaId",operator:"==",value:e}),s=await V.get("companies",e);let r=s?.stores||[];if(n.role!=="owner"){const _=n.storeIds||(n.storeId?[n.storeId]:[]);r=r.filter(R=>_.includes(R.id))}if(r.length===0)return'<p style="padding: 2rem;">Nenhuma loja encontrada para configuração.</p>';let l=r[0].id;const c=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom: 20px; overflow-x:auto;">
            ${r.map(_=>`
                <button class="btn-store-tab ${_.id===l?"active":""}" data-id="${_.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${_.id===l?"var(--primary)":"var(--surface-hover)"};
                    color: ${_.id===l?"#fff":"var(--text-main)"};
                    border: 1px solid ${_.id===l?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px;
                    cursor: pointer;
                    white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${_.name}
                </button>
            `).join("")}
        </div>
    `,u=()=>r.find(_=>_.id===l),g=await V.getAll("loja_config",{field:"empresaId",operator:"==",value:e}),x=_=>g.find(R=>R.lojaId===_)||null,v=()=>C_.map(_=>`
        <div class="var-chip" draggable="true" data-var="${_.key}" title="Arraste para o campo de mensagem">
            <i class="fa-solid ${_.icon}"></i>
            <span>${_.label}</span>
            <code>${_.key}</code>
        </div>
    `).join("");return setTimeout(()=>{P(),N()},100),`
        <style>
            .config-section-title {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-main);
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 1.25rem;
                padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%;
                padding: 0.8rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main);
                font-size: 0.95rem;
                appearance: none;
                cursor: pointer;
            }
            .config-select:focus { outline: none; border-color: var(--primary); }
            /* ── Variables ── */
            .vars-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px;
                font-size: 0.82rem;
                color: var(--primary);
                cursor: grab;
                user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            /* ── Message editors ── */
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden;
                margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex;
                align-items: center;
                gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600;
                font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                color: var(--text-main);
                font-size: 0.9rem;
                padding: 0.75rem;
                resize: vertical;
                box-sizing: border-box;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: var(--radius-sm);
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }

            /* ── Opening Hours (Horários) ── */
            .horarios-grid {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-top: 1rem;
            }
            .horario-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                color: white;
                padding: 0.4rem 0.6rem;
                border-radius: 6px;
                font-size: 0.85rem;
                outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            
            /* Switch Toggle */
            .switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 20px;
            }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333;
                transition: .4s;
                border-radius: 20px;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 14px; width: 14px;
                left: 3px; bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração por Loja</h2>
        </div>

        <div id="tabs-container">
            ${c()}
        </div>

        <div id="config-content-area"></div>
    `;function P(){const _=()=>{document.querySelectorAll(".btn-store-tab").forEach(R=>{R.addEventListener("click",()=>{l=R.dataset.id;const M=document.getElementById("tabs-container");M&&(M.innerHTML=c(),_()),N()})})};_()}function N(){const _=u();if(!_)return;const R=x(l),M=R?.mensagens_automaticas||{},p=R?.prompt_ia||_.prompt_ia||"",m=s.modulos_ativos||["venda"],y=m.includes("catalogo"),b=m.includes("venda"),w=m.includes("agendamento");m.includes("disparo");const C=b||y,h=document.getElementById("config-content-area");if(!h)return;const z=()=>'<option value="">Nenhuma</option>'+a.map(A=>{const L=_.instancia_id===A.id,G=r.some(q=>q.id!==l&&q.instancia_id===A.id);return`<option value="${A.id}" ${L?"selected":""} ${G?"disabled":""}>
                     ${A.nome} (${A.status}) ${G?"(Já vinculada a outra loja)":""}
                 </option>`}).join(""),H=()=>S_.map(A=>`
            <div class="msg-card" id="msg-card-${A.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${A.icon}" style="color:var(--primary);"></i>
                    <span>${A.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea
                        id="msg-${A.key}"
                        class="msg-textarea"
                        rows="4"
                        placeholder="${A.default}"
                        data-msg-key="${A.key}"
                    >${M[A.key]||""}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);"><i class="fa-solid fa-circle-info"></i> Arraste as variáveis abaixo para dentro do texto</span>
                        <button class="btn-save-msg" data-msg-key="${A.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join("");h.innerHTML=`
            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-plug" style="color:var(--primary);"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que responderá por esta loja. Se desconectada, a loja ficará inoperante.
                </p>
                <div style="display:flex; gap:10px; align-items:center;">
                    <select id="select-store-instance" class="config-select">
                        ${z()}
                    </select>
                </div>
                <div id="instance-status-indicator" style="margin-top: 10px;"></div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-robot" style="color:var(--primary);"></i> Prompt da IA da Loja
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Configure o comportamento personalizado da IA (ex: tom de voz, regras da loja) para o atendimento.
                </p>
                <textarea id="prompt-ia" class="msg-textarea" rows="4" placeholder="Ex: Você é o assistente virtual da Loja X...">${p}</textarea>
                <div style="text-align:right; margin-top:10px;">
                    <button class="btn-save-msg" id="btn-save-prompt">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Prompt
                    </button>
                </div>
            </div>

            <div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja está aberta para receber pedidos.
                </p>
                <div class="horarios-grid">
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(A=>{const L=R?.horarios?.[A.key]||{active:!1,open:"08:00",close:"18:00"};return`
                        <div class="horario-row ${L.active?"":"inactive"}" id="row-${A.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle" data-dia="${A.key}" ${L.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${A.label}</span>
                            </div>
                            <div class="horario-inputs ${L.active?"":"hidden"}" id="inputs-${A.key}">
                                <input type="time" class="time-input" id="open-${A.key}" value="${L.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-${A.key}" value="${L.close||"18:00"}">
                            </div>
                            <div class="status-label" id="status-${A.key}" style="font-size: 0.8rem; color: ${L.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${L.active?"Aberto":"Fechado"}
                            </div>
                        </div>
                    `}).join("")}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            ${C?`<div class="card" style="margin-bottom: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}].map(A=>{const L=R?.horarios_entrega?.[A.key]||{active:!1,open:"08:00",close:"22:00"};return`
                        <div class="horario-row ${L.active?"":"inactive"}" id="row-entrega-${A.key}">
                            <div class="horario-info">
                                <label class="switch">
                                    <input type="checkbox" class="dia-toggle-entrega" data-dia="${A.key}" ${L.active?"checked":""}>
                                    <span class="slider"></span>
                                </label>
                                <span class="horario-label">${A.label}</span>
                            </div>
                            <div class="horario-inputs ${L.active?"":"hidden"}" id="inputs-entrega-${A.key}">
                                <input type="time" class="time-input" id="open-entrega-${A.key}" value="${L.open||"08:00"}">
                                <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                                <input type="time" class="time-input" id="close-entrega-${A.key}" value="${L.close||"22:00"}">
                            </div>
                            <div class="status-label" id="status-entrega-${A.key}" style="font-size: 0.8rem; color: ${L.active?"var(--success)":"var(--text-dim)"}; min-width: 60px; text-align: right;">
                                ${L.active?"Disponível":"Indisponível"}
                            </div>
                        </div>
                    `}).join("")}
                </div>
                <div style="text-align:right; margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-horarios-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>`:""}

            ${C?`<div class="card">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas automaticamente ao cliente em cada etapa do pedido.
                </p>
                <div style="margin-bottom:1rem;">
                    <div class="vars-grid" id="vars-grid">
                        ${v()}
                    </div>
                </div>
                <div id="msg-editors">
                    ${H()}
                </div>
            </div>`:""}

            ${y?`<div class="card" style="margin-top: 1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i> Configurações do Catálogo
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize a aparência e os dados de contato do seu catálogo público.
                </p>
                
                <div class="field" style="margin-bottom: 20px;">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">WhatsApp de Atendimento (Com DDD)</label>
                    <input type="text" id="catalog-whatsapp" value="${R?.design?.whatsapp||""}" class="time-input" style="width:100%;" placeholder="Ex: 5511999999999">
                    <p style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">Este número será usado no botão flutuante do catálogo.</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div class="field">
                        <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Cor Primária</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="primary-color" value="${R?.design?.primaryColor||"#6366f1"}" style="width:50px; height:40px; border:none; background:none; cursor:pointer;">
                            <input type="text" id="primary-color-hex" value="${R?.design?.primaryColor||"#6366f1"}" class="time-input" style="flex:1;">
                        </div>
                    </div>
                    <div class="field">
                        <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Cor Secundária (Fundo)</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="secondary-color" value="${R?.design?.secondaryColor||"#0f172a"}" style="width:50px; height:40px; border:none; background:none; cursor:pointer;">
                            <input type="text" id="secondary-color-hex" value="${R?.design?.secondaryColor||"#0f172a"}" class="time-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div class="field" style="margin-bottom: 20px;">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-dim); text-transform:uppercase; margin-bottom:8px; display:block;">Logo do Catálogo</label>
                    <div style="display:flex; align-items:center; gap:20px;">
                        <div id="logo-preview" style="width:80px; height:80px; border-radius:12px; border:1px solid var(--border-color); display:flex; align-items:center; justify-content:center; background:var(--surface-hover); overflow:hidden;">
                            ${R?.design?.logoUrl?`<img src="${R.design.logoUrl}" style="width:100%; height:100%; object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
                        </div>
                        <div style="flex:1;">
                            <input type="file" id="logo-upload" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('logo-upload').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p style="font-size:0.75rem; color:var(--text-dim); margin-top:5px;">Tamanho recomendado: 200x200px (PNG ou SVG transparente)</p>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-design">
                         <i class="fa-solid fa-floppy-disk"></i> Salvar Configurações
                    </button>
                </div>
            </div>`:""}

            <!-- ── Integrações — apenas agendamento ──────────────────── -->
            ${w?`<div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title" style="display:flex;align-items:center;justify-content:space-between;">
                    <span><i class="fa-solid fa-puzzle-piece" style="color:var(--primary);"></i> Integrações</span>
                    <button id="btn-reload-integrations" class="btn-secondary" style="font-size:0.8rem;padding:4px 10px;">
                        <i class="fa-solid fa-rotate"></i> Recarregar
                    </button>
                </div>
                <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:1.25rem;">
                    Conecte serviços externos como Google Calendar e Trinks para sincronizar agendamentos automaticamente.
                </p>
                <div id="integrations-content">
                    <div style="display:flex;align-items:center;gap:8px;color:var(--text-dim);padding:0.5rem;">
                        <i class="fa-solid fa-circle-notch fa-spin"></i> Carregando integrações...
                    </div>
                </div>
            </div>`:""}
        `,setTimeout(()=>{O(),E(),S(),k(),document.getElementById("btn-reload-integrations")?.addEventListener("click",()=>{k()})},50)}async function O(){const _=document.getElementById("instance-status-indicator");if(!_)return;const R=u();if(!R||!R.instancia_id){_.innerHTML='<span class="badge danger"><i class="fa-solid fa-circle-xmark"></i> Nenhuma instância</span>';return}const M=a.find(p=>p.id===R.instancia_id);if(M)try{(await ct.getInstanceStatus(M.nome)).connected?_.innerHTML='<span class="badge success"><i class="fa-solid fa-circle-check"></i> Instância Online</span>':(_.innerHTML='<span class="badge danger"><i class="fa-solid fa-triangle-exclamation"></i> Instância Desconectada</span>',M.status==="conectado"&&(await V.update("instancias",M.id,{status:"desconectado"}),M.status="desconectado"))}catch{_.innerHTML='<span class="badge warning">Verificando...</span>'}}function E(){const _=document.getElementById("select-store-instance");_?.addEventListener("change",async()=>{const m=_.value,y=u()?.instancia_id,b=r.map(w=>w.id===l?{...w,instancia_id:m||null}:w);try{D.info("Salvando configuração..."),await V.update("companies",e,{stores:b}),r=b;const w=u();if(w&&(w.instancia_id=m),m){const C=a.find(h=>h.id===m);if(C){const h=s.modulos_ativos||["venda"];let z="venda";h.includes("venda")?z="venda":h.includes("agendamento")?z="agendamento":h.includes("catalogo")?z="catalogo":h.includes("disparo")&&(z="disparo");const A=((await V.get("settings","backend"))?.url||"").replace(/\/$/,""),L=A?`${A}/webhook/evolution/${C.nome}`:null;D.info(`Vinculando instância e configurando webhook (${z})...`),await V.update("instancias",C.id,{lojaId:l,funcao:z,webhookUrl:L||null}),L?await ct.setWebhook(C.nome,L)?D.success(`Webhook configurado: ${L}`):D.warning("Configuração salva, mas houve uma falha ao ativar o webhook na API."):D.warning("Backend URL não configurada. Acesse Configurações → Backend para definir a URL e sincronizar o webhook manualmente.")}}else if(y){const C=a.find(h=>h.id===y);C&&(D.info("Desvinculando instância e desativando webhook..."),await ct.setWebhook(C.nome,"",!1),await V.update("instancias",C.id,{lojaId:null,funcao:null,webhookUrl:null}))}O(),D.success("Vínculo de instância atualizado com sucesso!")}catch(w){D.error("Erro ao atualizar vínculo: "+w),N()}});const R=document.getElementById("btn-save-prompt");R?.addEventListener("click",async()=>{const m=document.getElementById("prompt-ia").value.trim();try{R&&(R.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...');const y=x(l);if(y)await V.update("loja_config",y.id,{prompt_ia:m}),y.prompt_ia=m;else{const w=await V.create("loja_config",{empresaId:e,lojaId:l,prompt_ia:m});g.push({id:w,empresaId:e,lojaId:l,prompt_ia:m})}const b=r.map(w=>w.id===l?{...w,prompt_ia:m}:w);await V.update("companies",e,{stores:b}),r=b,D.success("Prompt salvo com sucesso!"),R&&(R.innerHTML='<i class="fa-solid fa-check"></i> Salvo!'),setTimeout(()=>{R&&(R.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')},2e3)}catch{D.error("Erro ao salvar prompt."),R&&(R.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Prompt')}}),document.querySelectorAll(".dia-toggle").forEach(m=>{m.addEventListener("change",()=>{const y=m.dataset.dia,b=m.checked,w=document.getElementById(`row-${y}`),C=document.getElementById(`inputs-${y}`),h=document.getElementById(`status-${y}`);b?(w?.classList.remove("inactive"),C?.classList.remove("hidden"),h&&(h.innerText="Aberto",h.style.color="var(--success)")):(w?.classList.add("inactive"),C?.classList.add("hidden"),h&&(h.innerText="Fechado",h.style.color="var(--text-dim)"))})});const M=document.getElementById("btn-save-horarios");M?.addEventListener("click",async()=>{try{M.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const m={};["seg","ter","qua","qui","sex","sab","dom"].forEach(b=>{const w=document.querySelector(`.dia-toggle[data-dia="${b}"]`).checked,C=document.getElementById(`open-${b}`).value,h=document.getElementById(`close-${b}`).value;m[b]={active:w,open:C,close:h}});const y=x(l);if(y)await V.update("loja_config",y.id,{horarios:m}),y.horarios=m;else{const b=await V.create("loja_config",{empresaId:e,lojaId:l,horarios:m});g.push({id:b,empresaId:e,lojaId:l,horarios:m})}D.success("Horários de funcionamento salvos!"),M.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{M.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'},2e3)}catch{D.error("Erro ao salvar horários."),M.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.querySelectorAll(".dia-toggle-entrega").forEach(m=>{m.addEventListener("change",()=>{const y=m.dataset.dia,b=m.checked,w=document.getElementById(`row-entrega-${y}`),C=document.getElementById(`inputs-entrega-${y}`),h=document.getElementById(`status-entrega-${y}`);b?(w?.classList.remove("inactive"),C?.classList.remove("hidden"),h&&(h.innerText="Disponível",h.style.color="var(--success)")):(w?.classList.add("inactive"),C?.classList.add("hidden"),h&&(h.innerText="Indisponível",h.style.color="var(--text-dim)"))})});const p=document.getElementById("btn-save-horarios-entrega");p?.addEventListener("click",async()=>{try{p.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const m={};["seg","ter","qua","qui","sex","sab","dom"].forEach(b=>{const w=document.querySelector(`.dia-toggle-entrega[data-dia="${b}"]`).checked,C=document.getElementById(`open-entrega-${b}`).value,h=document.getElementById(`close-entrega-${b}`).value;m[b]={active:w,open:C,close:h}});const y=x(l);if(y)await V.update("loja_config",y.id,{horarios_entrega:m}),y.horarios_entrega=m;else{const b=await V.create("loja_config",{empresaId:e,lojaId:l,horarios_entrega:m});g.push({id:b,empresaId:e,lojaId:l,horarios_entrega:m})}D.success("Horários de entrega salvos!"),p.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{p.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'},2e3)}catch{D.error("Erro ao salvar horários de entrega."),p.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".var-chip").forEach(m=>{m.addEventListener("dragstart",y=>{y.dataTransfer.setData("text/plain",m.dataset.var||"")})}),document.querySelectorAll(".msg-textarea").forEach(m=>{m.addEventListener("dragover",y=>y.preventDefault()),m.addEventListener("drop",y=>{y.preventDefault();const b=y.dataTransfer.getData("text/plain");if(!b)return;const w=m.selectionStart??m.value.length,C=m.selectionEnd??m.value.length;m.value=m.value.slice(0,w)+b+m.value.slice(C)})}),document.querySelectorAll(".btn-save-msg").forEach(m=>{m.id!=="btn-save-prompt"&&m.addEventListener("click",async()=>{const y=m.dataset.msgKey,b=document.getElementById(`msg-${y}`).value.trim();m.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const w=x(l);if(w){const C={[`mensagens_automaticas.${y}`]:b||null};await V.update("loja_config",w.id,C),w.mensagens_automaticas||(w.mensagens_automaticas={}),w.mensagens_automaticas[y]=b||void 0}else{const C=await V.create("loja_config",{empresaId:e,lojaId:l,mensagens_automaticas:{[y]:b||null}});g.push({id:C,empresaId:e,lojaId:l,mensagens_automaticas:{[y]:b||void 0}})}D.success("Mensagem salva com sucesso!"),m.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{m.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'},2e3)}catch{D.error("Erro ao salvar mensagem."),m.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})})}async function k(){const _=document.getElementById("integrations-content");if(_){_.innerHTML='<div style="display:flex;align-items:center;gap:8px;color:var(--text-dim);padding:1rem;"><i class="fa-solid fa-circle-notch fa-spin"></i> Carregando...</div>';try{const[R,M]=await Promise.all([V.get("settings","backend"),V.get("companies",e)]),p=R?.url||"",m=M?.googleCalendar||{connected:!1},y=M?.trinks||{enabled:!1};_.innerHTML=`
            <!-- Google Calendar -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-brands fa-google" style="color:#4285f4;"></i> Google Calendar
                </div>
                <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:1.25rem;">
                    Quando conectado, os agendamentos criados pela IA são espelhados automaticamente no Google Calendar da empresa.
                </p>
                ${m.connected?`
                <div style="display:flex;align-items:center;gap:12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:10px;padding:0.9rem 1.1rem;margin-bottom:1rem;">
                    <i class="fa-solid fa-circle-check" style="color:#10b981;font-size:1.1rem;"></i>
                    <div style="flex:1;">
                        <div style="font-weight:700;color:#10b981;">Conectado</div>
                        <div style="font-size:0.8rem;color:var(--text-dim);">Agenda: ${m.calendarId||"primary"}</div>
                    </div>
                    <button id="btn-gcal-disconnect" class="btn-secondary" style="font-size:0.82rem;padding:6px 14px;border-color:rgba(239,68,68,0.3);color:#ef4444;">
                        <i class="fa-solid fa-unlink"></i> Desconectar
                    </button>
                </div>`:`
                <div style="display:flex;align-items:center;gap:12px;background:var(--surface-hover);border:1px solid var(--border-color);border-radius:10px;padding:0.9rem 1.1rem;margin-bottom:1rem;">
                    <i class="fa-solid fa-circle-xmark" style="color:var(--text-dim);font-size:1.1rem;"></i>
                    <div style="flex:1;font-size:0.88rem;color:var(--text-muted);">Não conectado</div>
                    <button id="btn-gcal-connect" class="btn-primary" style="font-size:0.82rem;padding:6px 14px;" ${p?"":'disabled title="Configure o backend primeiro"'}>
                        <i class="fa-brands fa-google"></i> Conectar Google Calendar
                    </button>
                </div>`}
                ${p?"":'<p style="font-size:0.8rem;color:#f59e0b;"><i class="fa-solid fa-triangle-exclamation"></i> Configure a URL do backend (Admin → Config. Backend) para ativar esta integração.</p>'}
            </div>

            <!-- Trinks -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-scissors" style="color:#6366f1;"></i> Trinks
                </div>
                <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:1.25rem;">
                    Quando ativado, o Trinks é a fonte primária para serviços, disponibilidade e agendamentos.
                    O WhatsApp bot consulta o Trinks diretamente — sem depender dos produtos cadastrados na plataforma.
                </p>
                <div style="display:flex;flex-direction:column;gap:1rem;">

                    <!-- Toggle principal -->
                    <div style="display:flex;align-items:center;gap:10px;">
                        <label class="switch">
                            <input type="checkbox" id="trinks-enabled" ${y.enabled?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                        <span style="font-size:0.9rem;color:var(--text-muted);">Ativar integração Trinks</span>
                    </div>

                    <div id="trinks-fields" style="${y.enabled?"":"opacity:0.5;pointer-events:none;"}">

                        <!-- Credenciais -->
                        <p style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-dim);margin:0 0 0.6rem;">
                            Credenciais
                        </p>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
                            <div class="form-group" style="margin:0;">
                                <label class="form-label">API Key</label>
                                <input type="text" id="trinks-api-key" class="form-input" placeholder="Sua API Key do Trinks"
                                    value="${y.apiKey||""}" style="font-family:monospace;font-size:0.85rem;">
                            </div>
                            <div class="form-group" style="margin:0;">
                                <label class="form-label">ID do Estabelecimento</label>
                                <input type="text" id="trinks-estab-id" class="form-input" placeholder="ID do seu estabelecimento"
                                    value="${y.estabelecimentoId||""}">
                            </div>
                        </div>

                        <!-- Profissional -->
                        <p style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-dim);margin:1rem 0 0.6rem;">
                            Profissional
                        </p>
                        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.75rem;">
                            <label class="switch" style="transform:scale(0.85);">
                                <input type="checkbox" id="trinks-escolher-prof" ${y.escolherProfissional?"checked":""}>
                                <span class="slider round"></span>
                            </label>
                            <div>
                                <span style="font-size:0.88rem;">Permitir escolha de profissional</span>
                                <p style="margin:0;font-size:0.78rem;color:var(--text-dim);">
                                    O bot pergunta ao cliente qual profissional prefere antes de mostrar horários.
                                </p>
                            </div>
                        </div>
                        <div class="form-group" style="margin:0;" id="trinks-prof-id-group">
                            <label class="form-label">
                                ID do profissional padrão
                                <span style="color:var(--text-dim);font-weight:400;">(usado quando escolha desativada)</span>
                            </label>
                            <input type="text" id="trinks-prof-id" class="form-input" placeholder="Deixe vazio para qualquer profissional disponível"
                                value="${y.defaultProfissionalId||""}">
                        </div>

                        <!-- Agendamento -->
                        <p style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-dim);margin:1rem 0 0.6rem;">
                            Agendamento
                        </p>
                        <div class="form-group" style="margin:0 0 0.75rem;">
                            <label class="form-label">Intervalo de horários (minutos)</label>
                            <select id="trinks-intervalos" class="form-control" style="max-width:180px;">
                                <option value="15"  ${(y.intervalos||30)==15?"selected":""}>15 minutos</option>
                                <option value="30"  ${(y.intervalos||30)==30?"selected":""}>30 minutos</option>
                                <option value="45"  ${(y.intervalos||30)==45?"selected":""}>45 minutos</option>
                                <option value="60"  ${(y.intervalos||30)==60?"selected":""}>60 minutos</option>
                            </select>
                            <small style="color:var(--text-dim);">Tamanho dos blocos de horário exibidos ao cliente.</small>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;">
                            <label class="switch" style="transform:scale(0.85);">
                                <input type="checkbox" id="trinks-confirmar-auto" ${y.confirmarAutomaticamente?"checked":""}>
                                <span class="slider round"></span>
                            </label>
                            <div>
                                <span style="font-size:0.88rem;">Confirmar agendamento automaticamente</span>
                                <p style="margin:0;font-size:0.78rem;color:var(--text-dim);">
                                    Cria o agendamento já como confirmado no Trinks, sem revisão manual.
                                </p>
                            </div>
                        </div>

                        <!-- Exibição -->
                        <p style="font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-dim);margin:1rem 0 0.6rem;">
                            Exibição
                        </p>
                        <div style="display:flex;flex-direction:column;gap:0.6rem;">
                            <div style="display:flex;align-items:center;gap:10px;">
                                <label class="switch" style="transform:scale(0.85);">
                                    <input type="checkbox" id="trinks-mostrar-precos" ${y.mostrarPrecos!==!1?"checked":""}>
                                    <span class="slider round"></span>
                                </label>
                                <span style="font-size:0.88rem;">Mostrar preços dos serviços no WhatsApp</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <label class="switch" style="transform:scale(0.85);">
                                    <input type="checkbox" id="trinks-mostrar-prof-confirmacao" ${y.mostrarProfissionalConfirmacao!==!1?"checked":""}>
                                    <span class="slider round"></span>
                                </label>
                                <span style="font-size:0.88rem;">Mostrar profissional na mensagem de confirmação</span>
                            </div>
                        </div>

                    </div><!-- /trinks-fields -->

                    <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:0.5rem;">
                        ${y.enabled&&y.apiKey?`
                        <button id="btn-test-trinks" class="btn-secondary" style="font-size:0.85rem;padding:6px 14px;">
                            <i class="fa-solid fa-plug"></i> Testar Conexão
                        </button>`:""}
                        <button id="btn-save-trinks" class="btn-primary" style="font-size:0.85rem;padding:6px 14px;">
                            <i class="fa-solid fa-save"></i> Salvar Trinks
                        </button>
                    </div>
                </div>
            </div>`,T(p,m,M)}catch{_.innerHTML='<p style="color:var(--text-dim);padding:1rem;">Erro ao carregar integrações.</p>'}}}function T(_,R,M){document.getElementById("btn-gcal-connect")?.addEventListener("click",async()=>{if(!_)return;const y=document.getElementById("btn-gcal-connect");y.disabled=!0,y.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Abrindo...';try{const b=await Yn.get(`/calendar/google/auth-url?companyId=${e}`);b.authUrl?(window.open(b.authUrl,"_blank","width=500,height=600"),D.info("Complete a autorização na janela aberta. Recarregue esta seção após autorizar.")):D.error(b.error||"Erro ao obter URL de autorização.")}catch{D.error("Não foi possível conectar ao backend.")}finally{y.disabled=!1,y.innerHTML='<i class="fa-brands fa-google"></i> Conectar Google Calendar'}}),document.getElementById("btn-gcal-disconnect")?.addEventListener("click",async()=>{if(confirm("Desconectar o Google Calendar? Os agendamentos existentes não serão afetados."))try{await V.update("companies",e,{googleCalendar:{connected:!1,calendarId:null}}),D.success("Google Calendar desconectado."),k()}catch{D.error("Erro ao desconectar.")}}),document.getElementById("trinks-enabled")?.addEventListener("change",y=>{const b=y.target.checked,w=document.getElementById("trinks-fields");w&&(w.style.cssText=b?"":"opacity:0.5;pointer-events:none;")}),document.getElementById("btn-test-trinks")?.addEventListener("click",async()=>{if(!_)return;const y=document.getElementById("btn-test-trinks");y.disabled=!0,y.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i>';try{const b=document.getElementById("trinks-api-key").value.trim(),w=document.getElementById("trinks-estab-id").value.trim(),C=await Yn.post("/calendar/trinks/test",{apiKey:b,estabelecimentoId:w});C.ok?D.success(`Conexão com Trinks OK! ${C.salonName||""}`):D.error(C.error||"Erro ao conectar ao Trinks.")}catch{D.error("Falha ao testar conexão.")}finally{y.disabled=!1,y.innerHTML='<i class="fa-solid fa-plug"></i> Testar Conexão'}}),document.getElementById("trinks-escolher-prof")?.addEventListener("change",y=>{const b=y.target.checked,w=document.getElementById("trinks-prof-id-group");w&&(w.style.opacity=b?"0.4":"1")});const p=document.getElementById("trinks-escolher-prof"),m=document.getElementById("trinks-prof-id-group");p?.checked&&m&&(m.style.opacity="0.4"),document.getElementById("btn-save-trinks")?.addEventListener("click",async()=>{const y=document.getElementById("trinks-enabled").checked,b=document.getElementById("trinks-api-key").value.trim(),w=document.getElementById("trinks-estab-id").value.trim(),C=document.getElementById("trinks-prof-id").value.trim(),h=document.getElementById("trinks-escolher-prof").checked,z=parseInt(document.getElementById("trinks-intervalos").value)||30,H=document.getElementById("trinks-confirmar-auto").checked,A=document.getElementById("trinks-mostrar-precos").checked,L=document.getElementById("trinks-mostrar-prof-confirmacao").checked;if(y&&(!b||!w)){D.warning("Preencha a API Key e o ID do estabelecimento para ativar o Trinks.");return}const G=document.getElementById("btn-save-trinks");G.disabled=!0,G.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';try{await V.update("companies",e,{trinks:{enabled:y,apiKey:b,estabelecimentoId:w,defaultProfissionalId:C||null,escolherProfissional:h,intervalos:z,confirmarAutomaticamente:H,mostrarPrecos:A,mostrarProfissionalConfirmacao:L}}),D.success("Configuração do Trinks salva!")}catch{D.error("Erro ao salvar Trinks.")}finally{G.disabled=!1,G.innerHTML='<i class="fa-solid fa-save"></i> Salvar Trinks'}})}function S(){const _=document.getElementById("primary-color"),R=document.getElementById("primary-color-hex"),M=document.getElementById("secondary-color"),p=document.getElementById("secondary-color-hex"),m=document.getElementById("logo-upload"),y=document.getElementById("btn-save-design");_?.addEventListener("input",()=>R.value=_.value),R?.addEventListener("change",()=>_.value=R.value),M?.addEventListener("input",()=>p.value=M.value),p?.addEventListener("change",()=>M.value=p.value);let b=null;m?.addEventListener("change",()=>{if(m.files&&m.files[0]){b=m.files[0];const w=new FileReader;w.onload=C=>{const h=document.getElementById("logo-preview");h&&(h.innerHTML=`<img src="${C.target?.result}" style="width:100%; height:100%; object-fit:contain;">`)},w.readAsDataURL(b)}}),y?.addEventListener("click",async()=>{try{y.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';let w=x(l)?.design?.logoUrl||"";if(b){const z=fn(gn,`logos/${e}/${l}_${Date.now()}`);await Ua(z,b),w=await ma(z)}const C={primaryColor:R.value,secondaryColor:p.value,logoUrl:w,whatsapp:document.getElementById("catalog-whatsapp").value.replace(/\D/g,"")},h=x(l);if(h)await V.update("loja_config",h.id,{design:C}),h.design=C;else{const z=await V.create("loja_config",{empresaId:e,lojaId:l,design:C});g.push({id:z,empresaId:e,lojaId:l,design:C})}D.success("Configurações do catálogo atualizadas!"),y.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',setTimeout(()=>{y.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Configurações'},2e3)}catch(w){console.error("Save design error:",w),D.error("Erro ao salvar design."),y.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Visual'}})}};class R_{newOrderSound;paymentSound;humanSupportSound;notifiedSupportIds=new Set;isInitialLoad=!0;isLeadsInitialLoad=!0;unsubscribe=null;unsubscribeLeads=null;constructor(){this.newOrderSound=new Audio("/sounds/new-order.mp3"),this.paymentSound=new Audio("/sounds/payment-confirmed.mp3"),this.humanSupportSound=new Audio("/sounds/success.mp3"),this.newOrderSound.volume=.5,this.paymentSound.volume=.5,this.humanSupportSound.volume=.6}formatCustomerName(e){const t=e.nome||e.leadName||e.customerName||"";if(t&&t.length>2)return t;const a=e.leadId||e.telefone||"";if(a){const i=a.split("@")[0];return/^\d+$/.test(i)&&i.length>=10?`Cliente (${i.slice(-8)})`:i||"Cliente"}return"Cliente"}showHumanSupportAlert(e){this.humanSupportSound.currentTime=0,this.humanSupportSound.play().catch(()=>{});const t=document.createElement("div");t.className="order-modal",t.id=`support-modal-${e.id}`;const a=this.formatCustomerName(e);t.innerHTML=`
            <div class="order-modal-content" style="border-top: 5px solid var(--warning);">
                <div class="order-header">
                    <div class="order-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--warning);">👤</div>
                    <h2>Atendimento Humano!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; margin-bottom: 1.5rem; color: var(--text-main);">
                        O lead <strong>${a}</strong> está aguardando contato humano.
                    </p>
                    <div class="order-field">
                        <label>Número do Lead:</label>
                        <span>${(e.telefone||e.leadId||"").split("@")[0]||"Não informado"}</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-support" style="background: var(--warning);">Entendido</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#close-support")?.addEventListener("click",()=>{t.remove()})}async showNewOrder(e){const t=e.source==="catalog"||!!e.taxaNome;Array.isArray(e.itens)||(Array.isArray(e.items)?e.itens=e.items.map(E=>({item:E.name||E.item||"",quantidade:E.qty||E.quantidade||1,preco:E.price||E.preco||0,subtotal:E.subtotal||0})):e.itens=[]);const a=e.empresaId||Ae.getCurrentUser()?.companyId;if(a&&Array.isArray(e.itens)&&!t)try{const E=await V.getAll("products",{field:"companyId",operator:"==",value:a});let k=!1;if(e.itens.forEach(T=>{const S=(T.item||"").toLowerCase().trim(),_=E.find(R=>(R.name||"").toLowerCase().trim()===S);if(_){const R=_.promotionalActive&&_.promotionalPrice||_.price;(!T.preco||T.preco===0)&&(T.preco=R,k=!0)}}),k){let T=0;e.itens.forEach(_=>{const R=parseFloat(_.preco)||0,M=parseInt(_.quantidade)||1;T+=M*R});const S=parseFloat(e.taxaAplicada||e.taxaEntrega||0);e.value=T+S}}catch(E){console.error("Error syncing prices with catalog:",E)}this.newOrderSound.play().catch(()=>{});const i=document.createElement("div");i.className="order-modal",i.id=`modal-${e.id}`;const s=Array.isArray(e.itens)&&e.itens.length>0?e.itens.map((E,k)=>`
                <div class="order-item-row" style="display:flex; justify-content:space-between; align-items:center; padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="flex:1; font-weight:500;">${E.quantidade}x ${E.item}</span>
                    <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                        <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                        ${t?`<span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem;">${Number(E.preco||0).toFixed(2)}</span>`:`<input type="number" class="notif-item-price-input" data-index="${k}" value="${E.preco||0}" step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">`}
                    </div>
                </div>
            `).join(""):'<p style="color:var(--text-muted); padding: 1rem; text-align:center;">Sem itens listados.</p>',r=e.taxaAplicada||e.taxaEntrega||0,c=`
            <div class="order-item-row" style="margin-top:0.5rem; padding: 0.8rem 0; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size:0.85rem; font-weight:600;">${e.entrega==="retirada"?"Taxa":"Taxa de Entrega"}</span>
                    <small style="font-size:0.7rem; color:var(--text-dim);">Entrega / Frete</small>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem; flex-shrink:0;">
                    <span style="color:var(--text-dim);font-size:0.75rem;">R$</span>
                    ${t?`
                        <span style="font-family:monospace;font-size:0.9rem;min-width:90px;text-align:right;padding:0.4rem 0.6rem; color: var(--primary); font-weight: 700;">${Number(r||0).toFixed(2)}</span>
                    `:`
                        <input type="number" id="notif-taxa-entrega" value="${r||0}"
                            step="0.01" style="width:90px;background:var(--bg-color);border:1px solid var(--border-color);color:white;padding:0.4rem 0.6rem;border-radius:6px;text-align:right;font-size:0.9rem; font-family: monospace; outline:none;">
                    `}
                </div>
            </div>
        `;i.innerHTML=`
            <div class="order-modal-content" style="max-width: 520px; padding: 1.5rem;">
                <div class="order-header" style="margin-bottom: 1.25rem;">
                    <div class="order-icon" style="width: 44px; height: 44px; font-size: 1.25rem; background: var(--primary-glow); color: var(--primary);">
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <h2 style="margin:0; font-size: 1.25rem;">Novo Pedido Recebido!</h2>
                        <p style="margin:0; font-size: 0.85rem; color: var(--text-dim);">#${e.id.slice(-6).toUpperCase()}</p>
                    </div>
                </div>
                
                <div class="order-body" style="gap: 1.25rem; display: flex; flex-direction: column;">
                    <!-- Customer and Delivery Info -->
                    ${t?`
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${e.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Modo de Envio</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">
                                ${e.entrega==="retirada"?'<i class="fa-solid fa-store"></i> Retirada':'<i class="fa-solid fa-truck"></i> Entrega'}
                            </span>
                        </div>
                        ${e.entrega!=="retirada"?`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Endereço</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${e.endereco||"Não informado"}</span>
                        </div>
                        ${(()=>{const E=e.bairro||(e.taxaNome?.includes("(")?e.taxaNome.split("(")[1].split(")")[0]:"");return E?`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Bairro</label>
                            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600; text-align: right;">${E}</span>
                        </div>`:""})()}
                        `:""}
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Pagamento</label>
                            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">
                                ${e.pagamento==="na_entrega"||e.paymentMethod==="na_entrega"?"🤝 Na Entrega":"⚡ PIX"}
                            </span>
                        </div>
                    </div>`:`
                    <div style="padding: 1rem; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Cliente</label>
                            <span style="font-weight: 600; color: var(--text-main);">${e.customerName}</span>
                        </div>
                        <div style="height: 1px; background: var(--border-color); width: 100%;"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <label style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase;">Entrega</label>
                            <span style="font-size: 0.85rem; color: var(--text-muted); text-align: right; max-width: 60%;">${e.endereco||"Retirada"}</span>
                        </div>
                    </div>`}
                    
                    <!-- Items Section -->
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <h4 style="font-size: 0.75rem; color: var(--text-dim); font-weight:700; text-transform: uppercase; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fa-solid fa-list-check" style="color: var(--primary); font-size: 0.9rem;"></i>
                            Conferência de Itens e Valores
                        </h4>
                        
                        <div style="background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid var(--border-color); overflow: hidden;">
                            <div style="max-height: 220px; overflow-y: auto; padding: 0 1rem;">
                                ${s}
                            </div>
                            
                            <!-- Total and Extras -->
                            <div style="background: rgba(255,255,255,0.03); border-top: 1px solid var(--border-color); padding: 1rem;">
                                ${c}
                                
                                <div style="display:flex; justify-content:space-between; margin-top:0.75rem; padding-top:0.75rem; border-top: 1px dashed var(--border-color); align-items: center;">
                                    <span style="font-weight:700; font-size: 1rem; color: var(--text-main);">Total do Pedido</span>
                                    <span id="notif-order-total" style="font-weight:800; color:var(--primary); font-size:1.4rem; letter-spacing: -0.02em;">R$ ${(e.value||e.total||0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="reject-reason-container" style="display: none; margin-top: 0.5rem; animation: slideDown 0.3s ease;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--danger); font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">Motivo da Recusa *</label>
                        <textarea id="reject-reason" placeholder="Descreva por que o pedido foi recusado..." 
                                  style="width: 100%; border-radius: 10px; border: 1px solid var(--danger); padding: 0.8rem; background: rgba(239, 68, 68, 0.05); color: white; resize: vertical; min-height: 80px; font-size: 0.9rem; outline: none;"></textarea>
                    </div>
                </div>
                
                <div class="order-actions" style="margin-top: 1.5rem; gap: 0.75rem;">
                    <button class="btn-reject" id="reject-order" style="flex:1; height: 48px; border-radius: 10px; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: var(--danger);">
                        <i class="fa fa-times"></i> Recusar
                    </button>
                    <button class="btn-reject hidden" id="confirm-reject" style="flex:1; height: 48px; border-radius: 10px; background: var(--danger); color: white;">
                        <i class="fa fa-check"></i> Confirmar Recusa
                    </button>
                    <button class="btn-accept" id="accept-order" style="flex:2; height: 48px; border-radius: 10px; background: var(--primary); color: white; font-weight: 700; box-shadow: 0 4px 15px var(--primary-glow);">
                        <i class="fa fa-check"></i> Aceitar Pedido
                    </button>
                </div>
            </div>
        `,document.body.appendChild(i);const u=E=>{const k=parseFloat(E);return isNaN(k)?0:k},g=()=>{let E=0;t?(e.itens||[]).forEach(S=>{E+=(S.quantidade||1)*(S.preco||0)}):document.querySelectorAll(".notif-item-price-input").forEach(S=>{const _=parseInt(S.dataset.index),R=(e.itens||[])[_]?.quantidade||1;E+=R*u(S.value)});const k=t?e.taxaAplicada||0:u(document.getElementById("notif-taxa-entrega")?.value);E+=k;const T=document.getElementById("notif-order-total");T&&(T.innerText=`R$ ${E.toFixed(2)}`)};document.querySelectorAll(".notif-item-price-input").forEach(E=>{E.addEventListener("input",g)}),document.getElementById("notif-taxa-entrega")?.addEventListener("input",g);const x=i.querySelector("#accept-order"),v=i.querySelector("#reject-order"),P=i.querySelector("#confirm-reject"),N=i.querySelector("#reject-reason-container"),O=i.querySelector("#reject-reason");x?.addEventListener("click",async()=>{const E=Ae.getCurrentUser(),k=e.empresaId||E?.companyId;if(!k){D.error("Empresa não identificada.");return}x.disabled=!0,x.textContent="⌛ Processando...";try{let T=0,S=Array.isArray(e.itens)?[...e.itens]:[];const _=w=>{const C=parseFloat(w);return isNaN(C)?0:C};t?S.forEach(w=>{T+=(w.quantidade||1)*(w.preco||0)}):document.querySelectorAll(".notif-item-price-input").forEach(w=>{const C=parseInt(w.dataset.index),h=S[C]?.quantidade||1,z=_(w.value);S[C]&&(S[C].preco=z),T+=h*z});const R=t?e.taxaAplicada||0:parseFloat(document.getElementById("notif-taxa-entrega")?.value)||0;T+=R;const M={value:T,total:T,itens:S,taxaAplicada:R,taxaEntrega:R},p=e.entrega==="retirada",m=e.pagamento||e.formaPagamento||e.paymentMethod||"",y=m.includes("entrega")||m.includes("dinheiro")||m.includes("maquininha")||m==="na_entrega";let b=p&&y?"em_preparo":"aguardando_pagamento";t&&y&&(b="em_preparo"),await ca.updateOrderStatus(e,k,b,void 0,M),D.success("Pedido aceito!"),i.remove()}catch(T){D.error("Erro ao aceitar pedido: "+T),x.disabled=!1,x.innerHTML='<i class="fa fa-check"></i> Aceitar'}}),v?.addEventListener("click",()=>{v.classList.add("hidden"),x.classList.add("hidden"),P.classList.remove("hidden"),N.style.display="block",O.focus()}),P?.addEventListener("click",async()=>{const E=O.value.trim();if(!E){D.warning("Informe o motivo da recusa."),O.style.borderColor="red";return}const k=Ae.getCurrentUser(),T=e.empresaId||k?.companyId;if(!T){D.error("Empresa não identificada.");return}P.disabled=!0,P.textContent="⌛ Processando...";try{await ca.updateOrderStatus(e,T,"cancelado",E),D.success("Pedido recusado e cliente notificado."),i.remove()}catch(S){D.error("Erro ao recusar pedido: "+S),P.disabled=!1,P.textContent="Confirmar Recusa"}})}showPaymentConfirmed(){this.paymentSound.play().catch(()=>{});const e=document.createElement("div");e.className="order-modal",e.innerHTML=`
            <div class="order-modal-content payment-confirmed">
                <div class="order-header">
                    <div class="order-icon success"><i class="fa fa-check"></i></div>
                    <h2>Pagamento Confirmado!</h2>
                </div>
                
                <div class="order-body">
                    <p style="text-align: center; color: var(--text-muted);">
                        O pagamento foi processado com sucesso.<br>
                        Pedido enviado para produção.
                    </p>
                </div>
                
                <div class="order-actions">
                    <button class="btn-accept full-width" id="close-payment">OK</button>
                </div>
            </div>
        `,document.body.appendChild(e),e.querySelector("#close-payment")?.addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},3e3)}orderStatusMap=new Map;setupLeadsListener(e){const t=xa(qt,"leads"),a=s=>{if(s.type!=="modified"&&s.type!=="added")return;const r=s.doc.data(),l=s.doc.id,c="lead_"+l,u=(r.statusAtendimento||"").toLowerCase(),g=(r.estado||"").toLowerCase(),x=u==="atendimento_humano"||u==="em_atendimento_humano"||g==="atendimento_humano";if(this.isLeadsInitialLoad){x&&this.notifiedSupportIds.add(c);return}if(x&&!this.notifiedSupportIds.has(c)){if(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))return;const v=Ae.getCurrentUser();if(v&&v.role!=="owner"&&v.role!=="admin"){const P=v.storeIds||(v.storeId?[v.storeId]:[]);if(console.log("OrderNotification - Checking Lead Store isolation:",{userStoreIds:P,leadLojaId:r.lojaId}),P.length>0&&r.lojaId&&!P.includes(r.lojaId))return}this.showHumanSupportAlert({...r,id:l,leadId:r.telefone||l,customerName:this.formatCustomerName(r)}),this.notifiedSupportIds.add(c)}else!x&&this.notifiedSupportIds.has(c)&&this.notifiedSupportIds.delete(c)},i=Fn(t,Un("empresaId","==",e),Un("statusAtendimento","in",["atendimento_humano","em_atendimento_humano"]));this.unsubscribeLeads=Fi(i,s=>{s.docChanges().forEach(a),this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)}),setTimeout(()=>{this.isLeadsInitialLoad&&(this.isLeadsInitialLoad=!1)},3e3)}startListening(){if(this.unsubscribe)return;const e=Ae.getCurrentUser();if(!e||!e.companyId)return;if(!["admin","owner","employee","staff"].includes(e.role||"")){console.log("OrderNotification - Unauthorized role for notifications:",e.role);return}const a=e.companyId,i=xa(qt,"pedidos"),s=Fn(i,Un("empresaId","==",a),Ow("criadoEm","desc"),Vw(50));this.unsubscribe=Fi(s,r=>{r.docChanges().forEach(l=>{const c=l.doc.data(),u=(c.status||"em_montagem").toLowerCase(),g=l.doc.id,x=this.orderStatusMap.get(g);if(this.isInitialLoad){this.orderStatusMap.set(g,u);return}if(this.orderStatusMap.set(g,u),!(c.empresaId&&c.empresaId!==a)&&!(window.location.pathname.includes("/catalog/")||window.location.pathname.includes("/qr/"))){if(e&&e.role!=="owner"&&e.role!=="admin"){const v=e.storeIds||(e.storeId?[e.storeId]:[]);if(console.log("OrderNotification - Checking Store isolation:",{userStoreIds:v,orderLojaId:c.lojaId}),v.length>0&&c.lojaId&&!v.includes(c.lojaId))return}if(u==="em_preparo"&&x==="aguardando_pagamento"&&(c.manuallyConfirmed||this.showPaymentConfirmed()),u==="atendimento_humano"){const v="pedido_"+g;this.notifiedSupportIds.has(v)||(this.showHumanSupportAlert({...c,id:g,customerName:this.formatCustomerName(c)}),this.notifiedSupportIds.add(v));return}if(l.type==="added"){if(["cancelado","finalizado"].includes(u))return;this.showNewOrder({id:l.doc.id,...c,customerName:this.formatCustomerName(c),endereco:c.endereco||"Endereço não informado",description:Array.isArray(c.itens)?c.itens.map(P=>`${P.quantidade}x ${P.item}`).join(", "):"Sem itens",value:c.value||c.total||0,leadId:c.leadId,empresaId:c.empresaId,instancia:c.instancia,itens:c.itens})}}}),this.isInitialLoad&&(this.isInitialLoad=!1)}),this.setupLeadsListener(a)}stopListening(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null,this.isInitialLoad=!0),this.unsubscribeLeads&&(this.unsubscribeLeads(),this.unsubscribeLeads=null,this.isLeadsInitialLoad=!0),this.notifiedSupportIds.clear(),this.orderStatusMap.clear()}}const lu=new R_,Dl={showPhoneError(){return new Promise(n=>{const e=document.createElement("div");e.className="phone-error-modal",e.id="phone-error-popup",e.innerHTML=`
                <div class="phone-error-card">
                    <div class="phone-error-icon-wrap">
                        <i class="fa-solid fa-phone-slash"></i>
                    </div>
                    <h3>Número Incorreto</h3>
                    <p>Para garantir que suas mensagens cheguem corretamente, informe o número no formato de <strong>DDD + 9 dígitos</strong>.</p>
                    
                    <div class="phone-example-box">
                        <span class="phone-example-label">Formato Correto</span>
                        <div class="phone-example-number">11988887777</div>
                        <p style="font-size:0.75rem;margin-bottom:0;margin-top:10px;color:var(--text-dim);">Informe apenas os 11 dígitos, sem espaços ou símbolos.</p>
                    </div>

                    <button class="phone-error-btn">Entendido, vou corrigir</button>
                </div>
            `,document.body.appendChild(e);const t=()=>{e.classList.add("toast-exit"),setTimeout(()=>{e.remove(),n()},300)};e.querySelector(".phone-error-btn")?.addEventListener("click",t),e.addEventListener("click",i=>{i.target===e&&t()})})}},L_={novo:{label:"Novo",cls:"badge info"},cliente_ativo:{label:"Cliente Ativo",cls:"badge success"},inativo:{label:"Inativo",cls:"badge secondary"},bloqueado:{label:"Bloqueado",cls:"badge danger"}},$_={bot:{label:"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"},em_atendimento_humano:{label:"Atendimento Humano",icon:'<i class="fa-solid fa-user"></i>',cls:"badge warning"},finalizado:{label:"Finalizado",icon:'<i class="fa-solid fa-check"></i>',cls:"badge success"},abandonado:{label:"Abandonado",icon:'<i class="fa-solid fa-warning"></i>',cls:"badge secondary"}};function cu(n){const e=(n||"novo").toLowerCase(),t=L_[e]||{label:n||"Novo",cls:"badge info"};return`<span class="${t.cls}">${t.label}</span>`}function du(n){const e=(n||"bot").toLowerCase(),t=$_[e]||{label:n||"Bot",icon:'<i class="fa-solid fa-robot"></i>',cls:"badge primary"};return`<span class="${t.cls}">${t.icon} ${t.label}</span>`}function Yr(n){return n?n.toDate?n.toDate().toLocaleString("pt-BR"):new Date(n).toLocaleString("pt-BR"):"-"}const D_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";let e=await V.getAll("leads",{field:"empresaId",operator:"==",value:n.companyId});const t=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(T=>T.lojaId&&t.includes(T.lojaId)));const i=(await V.get("companies",n.companyId))?.modulos_ativos||[],s=i.includes("catalogo")&&!i.includes("venda");let r="todos";const l=T=>T.length===0?`<tr><td colspan="${s?4:5}" style="text-align:center;padding:2.5rem;color:var(--text-muted);">Nenhum lead encontrado.</td></tr>`:T.map(S=>{const _=(S.statusLead||"novo").toLowerCase(),R=(S.statusAtendimento||"bot").toLowerCase(),M=R==="atendimento_humano"?"em_atendimento_humano":R,p=(S.telefone||"").split("@")[0];return`
            <tr data-lead-id="${S.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="lead-avatar">${(S.nome||S.telefone||"C")[0].toUpperCase()}</div>
                        <div>
                            <div style="font-weight:600;">${S.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${p}</div>
                        </div>
                    </div>
                </td>
                <td>${cu(_)}</td>
                ${s?"":`<td>${du(M)}</td>`}
                <td style="color:var(--text-muted);font-size:0.85rem;">${Yr(S.updatedAt||S.criadoEm||S.createdAt)}</td>
                <td>
                    <div class="actions">
                        <button class="action-btn view" title="Ver detalhes" data-id="${S.id}">
                            <i style="color:#fff;" class="fa-solid fa-eye"></i>
                        </button>
                        <button class="action-btn delete-lead-btn" title="Excluir lead e histórico" data-id="${S.id}" data-phone="${(S.telefone||"").split("@")[0]}" data-nome="${S.nome||S.telefone||""}" style="background:#ef444422;border-color:#ef444444;">
                            <i style="color:#ef4444;" class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),c=T=>T==="todos"?e:T==="humano"?e.filter(S=>{const _=(S.statusAtendimento||"").toLowerCase();return _==="em_atendimento_humano"||_==="atendimento_humano"}):T==="bloqueado"?e.filter(S=>(S.statusLead||"").toLowerCase()==="bloqueado"):T==="bot"?e.filter(S=>(S.statusAtendimento||"bot").toLowerCase()==="bot"):e;return setTimeout(()=>u(),100),`
        <style>
            .lead-modal-header-actions { display: flex; align-items: center; gap: 0.5rem; }
            .edit-form-group { margin-bottom: 1.25rem; }
            .edit-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.05em; }
            .edit-input { width: 100%; padding: 0.75rem 1rem; background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-main); font-size: 0.9rem; transition: border-color .2s; }
            .edit-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .edit-hint { font-size: 0.75rem; color: var(--text-dim); margin-top: 4px; }
        </style>
        <div class="leads-page-header">
            <div class="leads-filter-bar">
                <button class="filter-btn active" data-filter="todos">Todos <span class="filter-count" id="count-lead-todos">${e.length}</span></button>
                ${s?"":`
                <button class="filter-btn" data-filter="bot"><i class="fa-solid fa-robot"></i> Bot <span class="filter-count" id="count-lead-bot">${e.filter(T=>(T.statusAtendimento||"bot").toLowerCase()==="bot").length}</span></button>
                <button class="filter-btn" data-filter="humano"><i class="fa-solid fa-user"></i> Atendimento Humano <span class="filter-count" id="count-lead-humano">${e.filter(T=>{const S=(T.statusAtendimento||"").toLowerCase();return S==="em_atendimento_humano"||S==="atendimento_humano"}).length}</span></button>
                `}
                <button class="filter-btn" data-filter="bloqueado"><i class="fa-solid fa-ban"></i> Bloqueados <span class="filter-count" id="count-lead-bloqueado">${e.filter(T=>(T.statusLead||"").toLowerCase()==="bloqueado").length}</span></button>
            </div>
        </div>

        <div class="card leads-card">
            <div class="table-container">
                <table class="data-table" id="leads-table">
                    <thead>
                        <tr>
                            <th>Lead</th>
                            <th>Status do Lead</th>
                            ${s?"":"<th>Status do Atendimento</th>"}
                            <th>Última Atividade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="leads-tbody">
                        ${l(e)}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Lead Detail Modal -->
        <div id="lead-detail-modal" class="modal hidden">
            <div class="modal-content glass lead-modal-content">
                <div id="lead-modal-inner"></div>
            </div>
        </div>
    `;function u(){if(n){const S=xa(qt,"leads"),_=Fn(S,Un("empresaId","==",n.companyId));window._leadsUnsubscribe&&window._leadsUnsubscribe();const R=Fi(_,M=>{e=M.docs.map(b=>({id:b.id,...b.data()}));const p=n.storeIds||(n.storeId?[n.storeId]:[]);n.role!=="owner"&&(e=e.filter(b=>b.lojaId&&p.includes(b.lojaId)));const m=document.getElementById("leads-tbody");m&&(m.innerHTML=l(c(r)),g());const y={todos:e.length,bot:e.filter(b=>(b.statusAtendimento||"bot").toLowerCase()==="bot").length,humano:e.filter(b=>{const w=(b.statusAtendimento||"").toLowerCase();return w==="em_atendimento_humano"||w==="atendimento_humano"}).length,bloqueado:e.filter(b=>(b.statusLead||"").toLowerCase()==="bloqueado").length};Object.entries(y).forEach(([b,w])=>{const C=document.getElementById(`count-lead-${b}`);C&&(C.textContent=w.toString())})});window._leadsUnsubscribe=R}document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(S=>{S.addEventListener("click",()=>{document.querySelectorAll(".leads-filter-bar .filter-btn").forEach(R=>R.classList.remove("active")),S.classList.add("active"),r=S.dataset.filter||"todos";const _=document.getElementById("leads-tbody");_&&(_.innerHTML=l(c(r))),g()})}),g();const T=document.getElementById("lead-detail-modal");T?.addEventListener("click",S=>{S.target===T&&T.classList.add("hidden")})}function g(){document.querySelectorAll(".action-btn.view").forEach(T=>{T.addEventListener("click",async()=>{const S=T.dataset.id,_=e.find(R=>R.id===S);_&&v(_)})}),document.querySelectorAll(".delete-lead-btn").forEach(T=>{T.addEventListener("click",async S=>{S.stopPropagation();const _=T.dataset.id,R=e.find(M=>M.id===_);R&&await O(R)})})}function x(T){const S=document.getElementById("lead-detail-modal"),_=document.getElementById("lead-modal-inner");if(!S||!_)return;const R=(T.telefone||"").split("@")[0];_.innerHTML=`
            <div class="lead-modal-header">
                <div class="lead-modal-avatar"><i class="fa-solid fa-pen"></i></div>
                <div class="lead-modal-title">
                    <h2>Editar Lead</h2>
                    <p style="color:var(--text-muted);font-size:0.85rem;margin:0;">Alterando informações de contato</p>
                </div>
                <div class="lead-modal-header-actions">
                    <button class="action-btn" id="close-edit-modal" title="Cancelar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

            <div class="lead-modal-body">
                <div class="edit-form-group">
                    <label class="edit-label">Nome do Cliente</label>
                    <input type="text" id="edit-lead-nome" class="edit-input" value="${T.nome||""}" placeholder="Ex: João Silva">
                </div>
                <div class="edit-form-group">
                    <label class="edit-label">WhatsApp (DDD + 9 dígitos)</label>
                    <input type="text" id="edit-lead-phone" class="edit-input" value="${R||""}" placeholder="Ex: 11999999999" maxlength="11">
                    <p class="edit-hint">Apenas números, sem o 55.</p>
                </div>
                <div class="edit-form-group">
                    <label class="edit-label">Endereço</label>
                    <input type="text" id="edit-lead-address" class="edit-input" value="${T.endereco||""}" placeholder="Rua, número, bairro...">
                </div>
            </div>

            <div class="lead-modal-footer">
                <button id="lead-save-edit" class="btn-lead-action">
                    <i class="fa-solid fa-floppy-disk"></i> Salvar Alterações
                </button>
            </div>
        `,document.getElementById("close-edit-modal")?.addEventListener("click",()=>v(T)),document.getElementById("lead-save-edit")?.addEventListener("click",async function(){const M=this,p=document.getElementById("edit-lead-nome").value.trim(),m=document.getElementById("edit-lead-phone").value.trim(),y=document.getElementById("edit-lead-address").value.trim();let b=m.replace(/\D/g,"");if(b.length===13&&b.startsWith("55")&&(b=b.substring(2)),!p){D.error("O nome é obrigatório.");return}if(b&&b.length!==11){Dl.showPhoneError();return}M.disabled=!0,M.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const w={nome:p,telefone:b,whatsapp:b,endereco:y,updatedAt:ye.now()};await V.update("leads",T.id,w),Object.assign(T,w),D.success("Lead atualizado!"),k(T),v(T)}catch(w){console.error(w),D.error("Erro ao salvar alterações."),M.disabled=!1,M.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Alterações'}})}function v(T){const S=document.getElementById("lead-detail-modal"),_=document.getElementById("lead-modal-inner");if(!S||!_)return;const R=(T.statusLead||"novo").toLowerCase(),M=(T.statusAtendimento||"bot").toLowerCase(),p=M==="atendimento_humano"?"em_atendimento_humano":M,m=R==="bloqueado",y=(T.telefone||"").split("@")[0];let b="";!m&&!s&&(p==="bot"?b=`<button id="lead-action-primary" class="btn-lead-action" data-action="assumir">
                    <i class="fa-solid fa-user"></i> Assumir Atendimento
                </button>`:p==="em_atendimento_humano"?b=`<button id="lead-action-primary" class="btn-lead-action danger" data-action="finalizar">
                    <i class="fa-solid fa-user"></i> Finalizar Atendimento
                </button>`:b=`<button id="lead-action-primary" class="btn-lead-action" data-action="novo_atendimento">
                    <i class="fa-solid fa-user"></i> Iniciar Novo Atendimento
                </button>`);const w=P(R);_.innerHTML=`
            <div class="lead-modal-header">
                <div class="lead-modal-avatar">${(T.nome||T.telefone||"C")[0].toUpperCase()}</div>
                <div class="lead-modal-title">
                    <h2>${T.nome||"Sem nome"}</h2>
                    <span style="color:var(--text-muted);font-size:0.9rem;">${y}</span>
                </div>
                <div class="lead-modal-header-actions">
                    ${w.length>0?`
                    <div class="lead-menu-wrap">
                        <button class="action-btn lead-menu-btn" id="lead-menu-trigger" title="Mais ações">
                            <i class="fa-solid fa-ellipsis-vertical" style="color:#fff;"></i>
                        </button>
                        <div class="lead-dropdown hidden" id="lead-dropdown">
                            ${w.map(z=>`
                                <button class="lead-dropdown-item ${z.danger?"danger":""}" data-menu-action="${z.action}">
                                    ${z.icon} ${z.label}
                                </button>
                            `).join("")}
                        </div>
                    </div>`:""}
                    <button class="action-btn" id="close-lead-modal" title="Fechar">
                        <i class="fa-solid fa-xmark" style="color:#fff;"></i>
                    </button>
                </div>
            </div>

                <div class="lead-badge-group">
                    <span class="badge-label">Status do Lead</span>
                    ${cu(R)}
                </div>
                ${s?"":`
                <div class="lead-badge-group">
                    <span class="badge-label">Status do Atendimento</span>
                    ${du(p)}
                </div>`}
            </div>

            <div class="lead-modal-body">
                <div class="lead-info-grid">
                    <div class="lead-info-item">
                        <span class="lead-info-label">Telefone</span>
                        <span class="lead-info-value">${y||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Empresa ID</span>
                        <span class="lead-info-value" style="font-size:0.8rem;">${T.empresaId||"-"}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Criado em</span>
                        <span class="lead-info-value">${Yr(T.criadoEm||T.createdAt)}</span>
                    </div>
                    <div class="lead-info-item">
                        <span class="lead-info-label">Última atividade</span>
                        <span class="lead-info-value">${Yr(T.updatedAt)}</span>
                    </div>
                    ${T.endereco?`
                    <div class="lead-info-item" style="grid-column:1/-1;">
                        <span class="lead-info-label">Endereço</span>
                        <span class="lead-info-value">${T.endereco}</span>
                    </div>`:""}
                </div>

                ${T.ultimoPedido||T.lastOrder?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Último Pedido</h4>
                    <div class="lead-last-order">
                        <span>${T.ultimoPedido||T.lastOrder}</span>
                    </div>
                </div>`:""}

                ${T.historicoResumo?`
                <div class="lead-section">
                    <h4 class="lead-section-title">Histórico</h4>
                    <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">${T.historicoResumo}</p>
                </div>`:""}

                ${m?`
                <div class="lead-alert danger">
                    <i class="fa-solid fa-lock"></i> Este lead está bloqueado. Desbloqueie antes de iniciar atendimento.
                </div>`:""}
            </div>

            ${b?`
            <div class="lead-modal-footer">
                ${b}
            </div>`:""}
        `,S.classList.remove("hidden"),document.getElementById("close-lead-modal")?.addEventListener("click",()=>{S.classList.add("hidden")});const C=document.getElementById("lead-menu-trigger"),h=document.getElementById("lead-dropdown");C?.addEventListener("click",z=>{z.stopPropagation(),h?.classList.toggle("hidden")}),document.addEventListener("click",()=>h?.classList.add("hidden"),{once:!0}),h?.querySelectorAll(".lead-dropdown-item").forEach(z=>{z.addEventListener("click",async()=>{h.classList.add("hidden");const H=z.dataset.menuAction;await N(H,T)})}),document.getElementById("lead-action-primary")?.addEventListener("click",async function(){const z=this.dataset.action;await E(z,T)})}function P(T,S){const _=[],R=T==="bloqueado";return _.push({label:"Editar Lead",icon:'<i class="fa-solid fa-pen-to-square"></i>',action:"editar"}),R?_.push({label:"Desbloquear Lead",icon:'<i class="fa-solid fa-unlock"></i>',action:"desbloquear"}):_.push({label:"Bloquear Lead",icon:'<i class="fa-solid fa-lock"></i>',action:"bloquear",danger:!0}),_.push({label:"Resetar Conversa",icon:'<i class="fa-solid fa-rotate-left"></i>',action:"resetar_conversa",danger:!0}),_.push({label:"Excluir Lead",icon:'<i class="fa-solid fa-trash"></i>',action:"excluir_lead",danger:!0}),_}async function N(T,S){if(T==="editar"){x(S);return}if(T==="bloquear"){if(!await Ne.danger("Bloquear Lead",`Deseja bloquear o lead ${S.nome||S.telefone}? Ele não poderá receber atendimento enquanto bloqueado.`))return;try{await V.update("leads",S.id,{statusLead:"bloqueado",statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ye.now()}),S.statusLead="bloqueado",S.statusAtendimento="finalizado",S.estado="finalizado",D.success("Lead bloqueado e atendimento finalizado."),k(S),v(S)}catch{D.error("Erro ao bloquear lead.")}}if(T==="desbloquear"){if(!await Ne.warning("Desbloquear Lead",`Deseja desbloquear o lead ${S.nome||S.telefone}?`))return;try{await V.update("leads",S.id,{statusLead:"cliente_ativo",updatedAt:ye.now()}),S.statusLead="cliente_ativo",D.success("Lead desbloqueado com sucesso."),k(S),v(S)}catch{D.error("Erro ao desbloquear lead.")}}if(T==="resetar_conversa"){if(!await Ne.danger("Resetar Conversa",`Apagar todo o histórico de conversa de ${S.nome||S.telefone}? A IA começará do zero na próxima mensagem.`))return;try{const R=Ae.getCurrentUser(),M=(S.telefone||"").split("@")[0],p=`${R.companyId}_${M}`;await V.delete("conversations",p),D.success("Histórico apagado! O próximo atendimento começa do zero."),document.getElementById("lead-detail-modal")?.classList.add("hidden")}catch{D.error("Erro ao resetar conversa.")}}T==="excluir_lead"&&await O(S)}async function O(T){if(await Ne.danger("Excluir Lead",`Excluir ${T.nome||T.telefone} e todo o histórico? Esta ação não pode ser desfeita.`))try{const _=Ae.getCurrentUser(),R=(T.telefone||"").split("@")[0],M=`${_.companyId}_${R}`;await Promise.all([V.delete("leads",T.id),V.delete("conversations",M).catch(()=>{})]),e=e.filter(m=>m.id!==T.id),document.getElementById("lead-detail-modal")?.classList.add("hidden");const p=document.getElementById("leads-tbody");p&&(p.innerHTML=l(c(r))),g(),D.success(`Lead ${T.nome||T.telefone} excluído.`)}catch{D.error("Erro ao excluir lead.")}}async function E(T,S){const _=document.getElementById("lead-action-primary");if(T==="assumir"){if(!await Ne.warning("Assumir Atendimento",`Deseja assumir o atendimento humano do lead ${S.nome||S.telefone}?`))return;_.disabled=!0,_.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await V.update("leads",S.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ye.now()}),S.statusAtendimento="em_atendimento_humano",S.estado="atendimento_humano",D.success("Atendimento humano iniciado."),k(S),v(S)}catch{D.error("Erro ao assumir atendimento."),_.disabled=!1,_.textContent='<i class="fa-solid user"></i> Assumir Atendimento'}}if(T==="finalizar"){if(!await Ne.warning("Finalizar Atendimento",`Deseja finalizar o atendimento do lead ${S.nome||S.telefone}?`))return;_.disabled=!0,_.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await V.update("leads",S.id,{statusAtendimento:"finalizado",estado:"finalizado",updatedAt:ye.now()}),S.statusAtendimento="finalizado",S.estado="finalizado",D.success("Atendimento finalizado."),k(S),v(S)}catch{D.error("Erro ao finalizar atendimento."),_.disabled=!1,_.textContent='<i class="fa-solid check"></i> Finalizar Atendimento'}}if(T==="novo_atendimento"){if(!await Ne.warning("Iniciar Novo Atendimento",`Deseja iniciar um novo atendimento humano para ${S.nome||S.telefone}?`))return;_.disabled=!0,_.textContent='<i class="fa-solid hourglass"></i> Processando...';try{await V.update("leads",S.id,{statusAtendimento:"em_atendimento_humano",estado:"atendimento_humano",updatedAt:ye.now()}),S.statusAtendimento="em_atendimento_humano",S.estado="atendimento_humano",D.success("Novo atendimento humano iniciado."),k(S),v(S)}catch{D.error("Erro ao iniciar atendimento."),_.disabled=!1,_.textContent='<i class="fa-solid refresh"></i> Iniciar Novo Atendimento'}}}function k(T){const S=e.findIndex(R=>R.id===T.id);S>=0&&(e[S]={...e[S],...T});const _=document.getElementById("leads-tbody");_&&(_.innerHTML=l(c(r))),g()}};function N_(n){if(!n)return null;if(typeof n.toDate=="function")return n.toDate().getTime();if(n.seconds)return n.seconds*1e3;const e=new Date(n).getTime();return isNaN(e)?null:e}function M_(n){const e=N_(n);if(e===null)return{label:"Sem registro",color:"#6b7280"};const t=Date.now()-e,a=Math.floor(t/(1e3*60*60*24)),i=Math.floor(t/(1e3*60*60)),s=Math.floor(t/(1e3*60));let r;s<60?r=s<=1?"Agora há pouco":`há ${s} min`:i<24?r=`há ${i}h`:a===1?r="Ontem":r=`há ${a} dias`;const l=a<7?"#22c55e":a<30?"#f59e0b":"#ef4444";return{label:r,color:l}}const O_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId,[t,a,i]=await Promise.all([V.get("companies",e),V.getAll("instancias",{field:"empresaId",operator:"==",value:e}),V.getAll("leads",{field:"empresaId",operator:"==",value:e})]);let s=[],r="nova";const l=()=>a.length===0?'<option value="">Nenhuma instância cadastrada</option>':a.map(E=>{const k=E.status==="conectado"||E.status==="open",T=t?.stores?.find(_=>_.instancia_id===E.id),S=!!T;return`<option value="${E.id}" 
                        data-status="${E.status}" 
                        ${S?"disabled":""} 
                        style="${S?"color: var(--text-muted);":""}">
                ${E.nome} ${k?'<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>':'<i class="fa-solid fa-circle-xmark" style="color: var(--danger);"></i>'} ${T?`(EM USO: ${T.name})`:""}
            </option>`}).join(""),c=()=>s.length===0?'<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-muted);">Nenhuma campanha realizada ainda.</td></tr>':s.sort((E,k)=>{const T=E.data_agendamento?.seconds||E.data_inicio?.seconds||0;return(k.data_agendamento?.seconds||k.data_inicio?.seconds||0)-T}).map(E=>{const k=E.total_leads>0?Math.round((E.enviados+E.falhas)/E.total_leads*100):0,T=E.data_agendamento?new Date(E.data_agendamento.seconds*1e3).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"}):null;return`
                <tr>
                    <td>
                        <div style="font-weight: 700; color: var(--text-main);">${E.nome||"Campanha Sem Nome"}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${E.id.substring(0,8)}...</div>
                    </td>
                    <td><span class="badge secondary"><i class="fa-brands fa-whatsapp"></i> ${a.find(S=>S.id===E.instancia_id)?.nome||"N/A"}</span></td>
                    <td>
                        ${T?`<div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Agendado</span></div><div style="font-size:0.85rem;font-weight:600;color:var(--primary);">${T}</div>`:E.data_inicio?new Date(E.data_inicio.seconds*1e3).toLocaleDateString():"-"}
                    </td>
                    <td><strong>${E.total_leads||0}</strong></td>
                    <td>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
                                <span class="text-success">${E.enviados||0}</span>
                                <span class="text-danger">${E.falhas||0}</span>
                            </div>
                            <div style="width: 100%; height: 6px; background: var(--surface-hover); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${k}%; height: 100%; background: var(--primary); border-radius: 3px;"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${E.status==="finalizada"?"success":E.status==="em_andamento"||E.status==="agendada"&&E.agendamento_imediato?"warning":E.status==="agendada"?"primary":"secondary"}">
                            ${E.status==="em_andamento"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':E.status==="finalizado"?'<i class="fa-solid fa-check-circle"></i> Finalizada':E.status==="processando"?'<i class="fa-solid fa-spinner fa-spin"></i> Em andamento':E.status==="agendada"&&E.agendamento_imediato?'<i class="fa-solid fa-hourglass-end"></i> Aguardando envio':E.status==="agendada"?'<i class="fa-solid fa-calendar"></i> Agendada':"Cancelada"}
                        </span>
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px;">
                            <button class="action-btn view-details" data-id="${E.id}" title="Ver detalhes" style="background: var(--primary); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-eye" style="color:#fff;"></i>
                            </button>
                            ${["processando","em_andamento","agendada"].includes(E.status)?`
                            <button class="action-btn cancel-campaign" data-id="${E.id}" title="Cancelar campanha" style="background: var(--danger); border-radius: 8px; width: 32px; height: 32px; flex-shrink: 0;">
                                <i class="fa-solid fa-ban" style="color:#fff;"></i>
                            </button>
                            `:""}
                        </div>
                    </td>
                </tr>
            `}).join(""),u=`
        <style>
            .campaign-container { max-width: 1200px; margin: 0 auto; }
            .campaign-tabs { 
                display: flex; 
                gap: 0.5rem; 
                margin-bottom: 2rem; 
                padding: 4px;
                background: var(--surface-hover);
                border-radius: 12px;
                width: fit-content;
            }
            .tab-btn { 
                background: none; 
                border: none; 
                color: var(--text-muted); 
                font-weight: 600; 
                cursor: pointer; 
                padding: 0.6rem 1.5rem; 
                border-radius: 10px; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                font-size: 0.9rem;
            }
            .tab-btn:hover { color: var(--text-main); }
            .tab-btn.active { 
                color: white; 
                background: var(--primary); 
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            
            .step-card { 
                margin-bottom: 2rem; 
                border: 1px solid var(--border-color);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
            }
            .step-card:hover { transform: translateY(-2px); }
            .step-header { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                margin-bottom: 1.5rem; 
                font-size: 1.1rem;
                font-weight: 700; 
                color: var(--text-main); 
            }
            .step-number { 
                width: 28px; 
                height: 28px; 
                background: var(--primary); 
                color: white; 
                border-radius: 8px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                font-size: 0.9rem;
                box-shadow: 0 2px 5px rgba(99, 102, 241, 0.4);
            }
            
            /* Premium Inputs */
            .form-control {
                background: var(--surface-hover) !important;
                border: 1px solid var(--border-color) !important;
                color: var(--text-main) !important;
                border-radius: 10px !important;
                padding: 0.8rem 1rem !important;
                font-size: 0.95rem !important;
                transition: all 0.2s !important;
            }
            .form-control:focus {
                border-color: var(--primary) !important;
                box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
                outline: none !important;
            }
            select.form-control {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 1rem center;
                background-size: 1.25rem;
                padding-right: 2.5rem !important;
            }

            .var-grid { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }
            .var-chip { 
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 6px 14px; 
                background: rgba(99, 102, 241, 0.1); 
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 20px; 
                font-size: 0.8rem; 
                cursor: grab; 
                color: var(--primary);
                font-weight: 600;
                transition: all 0.2s;
                user-select: none;
            }
            .var-chip:hover { 
                border-color: var(--primary); 
                background: rgba(99, 102, 241, 0.15);
            }
            
            /* Lead Selection Table */
            .leads-selection-table-wrap {
                margin-top: 1.5rem;
                border: 1px solid var(--border-color);
                border-radius: 12px;
                background: var(--surface-light);
                overflow: hidden;
            }
            .leads-table-filters {
                padding: 1rem;
                background: var(--surface-hover);
                border-bottom: 1px solid var(--border-color);
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr;
                gap: 1rem;
            }
            @media (max-width: 900px) {
                .leads-table-filters {
                    grid-template-columns: 1fr 1fr;
                }
            }
            .leads-table-content {
                max-height: 400px;
                overflow-y: auto;
            }
            .leads-table {
                width: 100%;
                border-collapse: collapse;
            }
            .leads-table th {
                background: var(--surface-hover);
                padding: 10px 15px;
                text-align: left;
                font-size: 0.75rem;
                text-transform: uppercase;
                color: var(--text-muted);
                position: sticky;
                top: 0;
                z-index: 10;
            }
            .leads-table td {
                padding: 12px 15px;
                border-bottom: 1px solid var(--border-color);
                font-size: 0.9rem;
            }
            .leads-table tr:hover { background: rgba(255,255,255,0.02); }
            
            .leads-pagination {
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--surface-hover);
                border-top: 1px solid var(--border-color);
            }

            /* Multiple Messages */
            .message-block {
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: 12px;
                padding: 1.25rem;
                margin-bottom: 1rem;
                position: relative;
            }
            .message-block-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .btn-remove-msg {
                color: var(--danger);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
            }
            .btn-add-msg {
                width: 100%;
                padding: 0.75rem;
                background: var(--surface-hover);
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                color: var(--text-muted);
                cursor: pointer;
                font-weight: 600;
                margin-top: 1rem;
                transition: all 0.2s;
            }
            .btn-add-msg:hover {
                border-color: var(--primary);
                color: var(--primary);
                background: rgba(99, 102, 241, 0.05);
            }

            .leads-counter-card { 
                padding: 1.25rem; 
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0) 100%);
                border: 1px solid rgba(99, 102, 241, 0.2); 
                border-radius: 12px; 
                margin: 1.5rem 0; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                gap: 15px; 
            }
            .leads-count-info { display: flex; align-items: center; gap: 12px; }
            .leads-count-icon {
                width: 40px;
                height: 40px;
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            }
            
            .view-leads-btn {
                background: none;
                border: 1px solid var(--border-color);
                color: var(--text-main);
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .view-leads-btn:hover {
                border-color: var(--primary);
                color: var(--primary);
            }

            .delay-inputs { display: flex; gap: 1.5rem; align-items: center; }
            .delay-box { flex: 1; }
            .delay-box label { display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); }

            .schedule-toggle {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.55rem 1.2rem;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                background: var(--surface-hover);
                color: var(--text-muted);
                font-weight: 600;
                font-size: 0.88rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            .schedule-toggle:hover {
                border-color: var(--primary);
                color: var(--primary);
            }
            .schedule-toggle.active {
                background: var(--primary);
                border-color: var(--primary);
                color: #fff;
                box-shadow: 0 2px 8px rgba(99,102,241,0.35);
            }
            
            .instance-status-tag {
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                margin-left: 8px;
            }
            .status-online { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
            .status-offline { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

            .badge.em_uso { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

            /* Selected Leads List */
            #leads-list-container { margin-top: 1rem; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; display: none; }
            .leads-list-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            .leads-list-table th { background: var(--surface-light); text-align: left; padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table td { padding: 10px; border-bottom: 1px solid var(--border-color); }
            .leads-list-table tr:last-child td { border-bottom: none; }

            .filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
            @media (max-width: 768px) { .filter-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="campaign-container">
            <div class="page-header" style="flex-direction: column;">
                <div><h2 class="page-title">Disparo em Massa</h2></div>
                <div><p class="page-description">Envie mensagens personalizadas para seus leads de forma estratégica.</p></div>
            </div>

            <div class="campaign-tabs">
                <button class="tab-btn ${r==="nova"?"active":""}" id="tab-nova">
                    <i class="fa-solid fa-plus-circle" style="margin-right: 6px;"></i>Nova Campanha
                </button>
                <button class="tab-btn ${r==="historico"?"active":""}" id="tab-historico">
                    <i class="fa-solid fa-history" style="margin-right: 6px;"></i>Histórico
                </button>
            </div>

            <div id="campaign-view-container">
                <!-- Content dynamicly loaded -->
            </div>
        </div>

        <!-- Detail Modal -->
        <div id="campaign-detail-modal" class="modal hidden">
            <div class="modal-content glass" style="max-width: 850px; max-height: 90vh; display: flex; flex-direction: column;">
                <span class="close-modal" id="close-detail-modal">&times;</span>
                <div id="campaign-detail-content" style="overflow-y: auto; padding-right: 4px;"></div>
            </div>
        </div>
    `;return setTimeout(()=>v(),100),u;function g(){return`
            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">1</div> <span>Dados Campanha</span>
                </div>
                <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label style="display:block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">Nome da Campanha</label>
                    <input type="text" id="campaign-name" class="form-control" placeholder="Ex: Promoção de Fevereiro, Leads Inativos..." maxlength="80">
                </div>
                <div class="form-group">
                    <label>Selecione a instância de WhatsApp</label>
                    <select id="select-instance" class="form-control" style="font-size: 1rem; padding: 0.75rem;">
                        <option value="">Selecione uma instância disponível...</option>
                        ${l()}
                    </select>
                    <div style="margin-top: 0.75rem; display: flex; align-items: flex-start; gap: 8px; color: var(--text-muted); font-size: 0.85rem;">
                        <i class="fa-solid fa-circle-info" style="margin-top: 3px; color: var(--primary);"></i>
                        <span>Importante: Instâncias já vinculadas a uma loja estão protegidas e não podem ser usadas em disparos em massa para evitar bloqueios no número oficial.</span>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">2</div> <span>Público Alvo</span>
                </div>
                
                <div class="leads-selection-table-wrap">
                    <div class="leads-table-filters">
                        <input type="text" id="lead-search" class="form-control" placeholder="Buscar por nome ou telefone...">
                        <select id="lead-filter-store" class="form-control">
                            <option value="">Todas as Lojas</option>
                            ${t?.stores?.map(E=>`<option value="${E.id}">${E.name}</option>`).join("")}
                        </select>
                        <select id="lead-filter-status" class="form-control">
                            <option value="">Todos os Status</option>
                            <option value="novo">Novo</option>
                            <option value="cliente_ativo">Cliente Ativo</option>
                            <option value="lead_frio">Lead Frio</option>
                        </select>
                        <select id="lead-filter-activity" class="form-control">
                            <option value="">Qualquer atividade</option>
                            <option value="7">Últimos 7 dias</option>
                            <option value="15">Últimos 15 dias</option>
                            <option value="30">Últimos 30 dias</option>
                            <option value="90">Últimos 90 dias</option>
                        </select>
                    </div>
                    
                    <div class="leads-table-content">
                        <table class="leads-table">
                            <thead>
                                <tr>
                                    <th style="width: 40px;"><input type="checkbox" id="select-all-leads"></th>
                                    <th>Nome</th>
                                    <th>WhatsApp</th>
                                    <th>Loja</th>
                                    <th>Status</th>
                                    <th>Última Atividade</th>
                                </tr>
                            </thead>
                            <tbody id="leads-table-body">
                                <!-- Paginated list -->
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="leads-pagination">
                        <div style="font-size: 0.85rem; color: var(--text-muted);" id="pagination-info">Mostrando 0 de 0</div>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn-secondary" id="prev-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-left"></i></button>
                            <button class="btn-secondary" id="next-page" style="padding: 4px 10px;"><i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="leads-counter-card">
                    <div class="leads-count-info">
                        <div class="leads-count-icon">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">
                                <span id="selected-count-display">0</span> Leads Selecionados
                            </div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Estes contatos receberão suas mensagens.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">3</div> <span>Composição da Mensagem</span>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">VARIÁVEIS (Arraste para a mensagem):</span>
                    <div class="var-grid" id="var-chips-container">
                        <div class="var-chip" draggable="true" data-var="{{nome}}"><i class="fa-solid fa-user"></i> Nome</div>
                        <div class="var-chip" draggable="true" data-var="{{telefone}}"><i class="fa-solid fa-phone"></i> Telefone</div>
                        <div class="var-chip" draggable="true" data-var="{{endereco}}"><i class="fa-solid fa-location-dot"></i> Endereço</div>
                    </div>
                </div>

                <div id="messages-list">
                    <!-- Multiple messages -->
                </div>
                
                <button class="btn-add-msg" id="btn-add-message">
                    <i class="fa-solid fa-plus-circle"></i> Adicionar Alternativa de Mensagem
                </button>
            </div>

            <div class="card step-card">
                <div class="step-header">
                    <div class="step-number">4</div> <span>Configurações Inteligentes</span>
                </div>
                <div class="delay-inputs">
                    <div class="delay-box">
                        <label>Intervalo Mínimo (segundos)</label>
                        <input type="number" id="delay-min" class="form-control" value="20" min="5">
                    </div>
                    <div class="delay-box">
                        <label>Intervalo Máximo (segundos)</label>
                        <input type="number" id="delay-max" class="form-control" value="60" min="10">
                    </div>
                </div>
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(245, 158, 11, 0.05); border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="font-size: 0.85rem; color: #b45309; margin-bottom: 0;">
                        <i class="fa-solid fa-triangle-exclamation"></i> <strong>Dica Anti-Ban:</strong> Utilize intervalos maiores (ex: 30-90s) para disparos acima de 50 contatos.
                    </p>
                </div>

                <!-- Scheduling Section -->
                <div style="margin-top: 1.75rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                        <i class="fa-solid fa-clock"></i> Quando Enviar?
                    </div>
                    <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
                        <button id="btn-send-now" class="schedule-toggle active" data-mode="now">
                            <i class="fa-solid fa-bolt"></i> Agora
                        </button>
                        <button id="btn-send-scheduled" class="schedule-toggle" data-mode="scheduled">
                            <i class="fa-solid fa-calendar"></i> Agendar
                        </button>
                    </div>
                    <div id="schedule-datetime-wrap" style="display: none;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Data e Hora do Disparo</label>
                        <input type="datetime-local" id="schedule-datetime" class="form-control" style="max-width: 320px;">
                        <div id="schedule-error" style="display:none; margin-top: 0.5rem; font-size: 0.82rem; color: #ef4444;">
                            <i class="fa-solid fa-circle-exclamation"></i> Selecione uma data e hora no futuro.
                        </div>
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <button class="btn-primary full-width" id="btn-start-campaign" disabled style="padding: 1rem; font-size: 1.1rem; border-radius: 12px;">
                        <i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora
                    </button>
                </div>
            </div>
        `}function x(){return`
            <div class="card" style="padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Campanha</th>
                                <th>Instância</th>
                                <th>Data</th>
                                <th>Público</th>
                                <th style="width: 150px;">Progresso</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                            <tbody id="campaigns-tbody">
                                ${c()}
                            </tbody>
                    </table>
                </div>
            </div>
        `}function v(){const E=document.getElementById("campaign-view-container");if(!E)return;const k=xa(qt,"campanhas"),T=Fn(k,Un("cliente_id","==",e));window._campaignsUnsubscribe&&window._campaignsUnsubscribe();const S=Fi(T,p=>{if(s=p.docs.map(m=>({id:m.id,...m.data()})),r==="historico"){const m=document.getElementById("campaigns-tbody");m&&(m.innerHTML=c(),N())}});window._campaignsUnsubscribe=S;const _=()=>{r==="nova"?(E.innerHTML=g(),P()):(E.innerHTML=x(),N())},R=document.getElementById("tab-nova"),M=document.getElementById("tab-historico");R?.addEventListener("click",()=>{r="nova",R.classList.add("active"),M?.classList.remove("active"),_()}),M?.addEventListener("click",()=>{r="historico",M.classList.add("active"),R?.classList.remove("active"),_()}),_()}function P(){let E=1;const k=15;let T=new Set,S=i,_=[""];const R=document.getElementById("campaign-name"),M=document.getElementById("select-instance"),p=document.getElementById("btn-start-campaign"),m=document.getElementById("lead-search"),y=document.getElementById("lead-filter-store"),b=document.getElementById("lead-filter-status"),w=document.getElementById("lead-filter-activity"),C=document.getElementById("leads-table-body"),h=document.getElementById("select-all-leads"),z=document.getElementById("pagination-info"),H=document.getElementById("prev-page"),A=document.getElementById("next-page"),L=document.getElementById("selected-count-display"),G=document.getElementById("messages-list"),q=document.getElementById("btn-add-message"),J=()=>{const he=m.value.toLowerCase(),se=y.value,pe=b.value,Oe=w?parseInt(w.value||"0"):0,ve=Date.now(),ut=Oe>0?ve-Oe*24*60*60*1e3:null;S=i.filter(be=>{const _e=!he||(be.nome||"").toLowerCase().includes(he)||(be.telefone||"").includes(he),rt=!se||be.lojaId===se,He=!pe||(be.statusLead||"novo")===pe;let It=!0;if(ut!==null){const pt=be.updatedAt||be.criadoEm||be.createdAt;let tt=null;pt&&(typeof pt.toDate=="function"?tt=pt.toDate().getTime():pt.seconds?tt=pt.seconds*1e3:tt=new Date(pt).getTime()),It=tt!==null&&tt>=ut}return _e&&rt&&He&&It}),E=1,X()},X=()=>{if(!C||!z)return;const he=(E-1)*k,se=Math.min(he+k,S.length),pe=S.slice(he,se);C.innerHTML=pe.map(ve=>{const ut=T.has(ve.id),be=t?.stores?.find(rt=>rt.id===ve.lojaId)?.name||"N/A",_e=M_(ve.updatedAt||ve.criadoEm||ve.createdAt);return`
                    <tr>
                        <td><input type="checkbox" class="lead-checkbox" data-id="${ve.id}" ${ut?"checked":""}></td>
                        <td>${ve.nome||"Sem nome"}</td>
                        <td>${(ve.telefone||"").split("@")[0]}</td>
                        <td><span class="badge secondary" style="font-size: 0.7rem;">${be}</span></td>
                        <td><span class="badge ${ve.statusLead==="cliente_ativo"?"success":"secondary"}" style="font-size: 0.7rem;">${ve.statusLead||"novo"}</span></td>
                        <td>
                            <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--text-muted);">
                                <span style="width:7px;height:7px;border-radius:50%;background:${_e.color};flex-shrink:0;"></span>
                                <span style="color:${_e.color};font-weight:600;">${_e.label}</span>
                            </span>
                        </td>
                    </tr>
                `}).join(""),z.textContent=`Mostrando ${he+1}-${se} de ${S.length}`,L&&(L.textContent=T.size.toString());const Oe=pe.length>0&&pe.every(ve=>T.has(ve.id));h&&(h.checked=Oe),document.querySelectorAll(".lead-checkbox").forEach(ve=>{ve.addEventListener("change",ut=>{const be=ut.target.dataset.id;ut.target.checked?T.add(be):T.delete(be),L&&(L.textContent=T.size.toString()),de()})}),de()},ae=()=>{G&&(G.innerHTML=_.map((he,se)=>`
                <div class="message-block" data-index="${se}">
                    <div class="message-block-header">
                        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">MENSAGEM #${se+1}</span>
                        ${_.length>1?`<button class="btn-remove-msg" data-index="${se}"><i class="fa-solid fa-trash-can"></i> Remover</button>`:""}
                    </div>
                    <textarea class="form-control msg-textarea" rows="5" placeholder="Digite sua mensagem aqui..." data-index="${se}" style="width: 100%; box-sizing: border-box;">${he}</textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
                        <span class="char-count" style="font-size: 0.7rem; color: var(--text-muted);">${he.length} caracteres</span>
                    </div>
                </div>
            `).join(""),document.querySelectorAll(".btn-remove-msg").forEach(he=>{const se=he;se.addEventListener("click",()=>{const pe=parseInt(se.dataset.index||"0");_.splice(pe,1),ae(),de()})}),document.querySelectorAll(".msg-textarea").forEach(he=>{const se=he;se.addEventListener("input",()=>{const pe=parseInt(se.dataset.index||"0");_[pe]=se.value;const Oe=se.parentElement?.querySelector(".char-count");Oe&&(Oe.textContent=`${se.value.length} caracteres`),de()}),se.addEventListener("dragover",pe=>pe.preventDefault()),se.addEventListener("drop",pe=>{pe.preventDefault();const Oe=pe.dataTransfer.getData("text/plain");if(!Oe)return;const ve=se.selectionStart||se.value.length,ut=se.selectionEnd||se.value.length,be=se.value.slice(0,ve)+Oe+se.value.slice(ut);se.value=be;const _e=parseInt(se.dataset.index||"0");_[_e]=be,de()})}))},de=()=>{const he=!!M.value,se=T.size>0,pe=_.every(be=>be.trim().length>0),Oe=M.options[M.selectedIndex],ve=Oe?.dataset.status==="conectado"||Oe?.dataset.status==="open";let ut=!0;if(oe==="scheduled"){const be=Se?.value;(!be||new Date(be).getTime()<=Date.now())&&(ut=!1)}p.disabled=!(he&&ve&&se&&pe&&ut)};m?.addEventListener("input",J),y?.addEventListener("change",J),b?.addEventListener("change",J),w?.addEventListener("change",J),R?.addEventListener("input",de),H?.addEventListener("click",()=>{E>1&&(E--,X())}),A?.addEventListener("click",()=>{E<Math.ceil(S.length/k)&&(E++,X())}),h?.addEventListener("change",he=>{const se=(E-1)*k,pe=Math.min(se+k,S.length),Oe=S.slice(se,pe);he.target.checked?Oe.forEach(ve=>T.add(ve.id)):Oe.forEach(ve=>T.delete(ve.id)),X()}),q?.addEventListener("click",()=>{_.push(""),ae(),de()}),document.querySelectorAll(".var-chip").forEach(he=>{const se=he;se.addEventListener("dragstart",pe=>{pe.dataTransfer.setData("text/plain",se.dataset.var||"")})});let oe="now";M?.addEventListener("change",de);const fe=document.getElementById("btn-send-now"),xe=document.getElementById("btn-send-scheduled"),Ce=document.getElementById("schedule-datetime-wrap"),Se=document.getElementById("schedule-datetime"),Le=document.getElementById("schedule-error"),qe=()=>{oe==="scheduled"?p.innerHTML='<i class="fa-solid fa-calendar-clock" style="margin-right: 8px;"></i> Agendar Campanha':p.innerHTML='<i class="fa-solid fa-paper-plane" style="margin-right: 8px;"></i> Iniciar Campanha Agora'},Xe=he=>String(he).padStart(2,"0"),st=new Date;st.setMinutes(st.getMinutes()+5),Se.min=`${st.getFullYear()}-${Xe(st.getMonth()+1)}-${Xe(st.getDate())}T${Xe(st.getHours())}:${Xe(st.getMinutes())}`,fe?.addEventListener("click",()=>{oe="now",fe.classList.add("active"),xe?.classList.remove("active"),Ce&&(Ce.style.display="none"),Le&&(Le.style.display="none"),qe(),de()}),xe?.addEventListener("click",()=>{oe="scheduled",xe.classList.add("active"),fe?.classList.remove("active"),Ce&&(Ce.style.display="block"),qe(),de()}),Se?.addEventListener("change",()=>{Le&&(Le.style.display="none"),de()}),p?.addEventListener("click",async()=>{if(oe==="scheduled"){const ve=Se?.value;if(!ve||new Date(ve).getTime()<=Date.now()){Le&&(Le.style.display="block");return}}const he=oe==="scheduled",se=he?new Date(Se.value):new Date,pe=he?`Confirma o agendamento para ${se.toLocaleString("pt-BR")} com ${T.size} leads?`:`Deseja iniciar o disparo imediato para ${T.size} leads com ${_.length} variações de mensagem?`;if(await Ne.warning(he?"Agendar Campanha":"Iniciar Campanha",pe))try{p.disabled=!0,p.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';const ve={cliente_id:e,instancia_id:M.value,nome:R?.value?.trim()||`Campanha MB ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,mensagens:_,total_leads:T.size,lead_ids:Array.from(T),enviados:0,falhas:0,status:"agendada",agendamento_imediato:!he,data_agendamento:ye.fromDate(se),data_inicio:null,config:{delay_min:parseInt(document.getElementById("delay-min").value||"20"),delay_max:parseInt(document.getElementById("delay-max").value||"60")}};await V.create("campanhas",ve),D.success(he?"Campanha agendada com sucesso!":"Campanha criada! O disparo será iniciado em instantes."),window.location.reload()}catch(ve){D.error("Erro ao salvar campanha: "+ve),p.disabled=!1,qe()}}),X(),ae()}function N(){document.querySelectorAll(".view-details").forEach(T=>{T.addEventListener("click",()=>{const S=T.dataset.id,_=s.find(R=>R.id===S);_&&O(_)})}),document.querySelectorAll(".cancel-campaign").forEach(T=>{T.addEventListener("click",async()=>{const S=T.dataset.id;if(!s.find(M=>M.id===S))return;if(await Ne.danger("Cancelar Campanha","Você tem certeza que deseja cancelar esta campanha? Ela será interrompida e nenhum outro envio será feito."))try{const M=await V.get("campanhas",S);if(M?.status==="finalizada"){D.error("Esta campanha já foi concluída e não pode ser cancelada.");return}if(M?.status==="cancelada"){D.error("Esta campanha já está cancelada.");return}await V.update("campanhas",S,{status:"cancelada"}),D.success("Campanha cancelada com sucesso.")}catch(M){D.error("Erro ao cancelar a campanha."),console.error("Erro ao cancelar campanha:",M)}})});const E=document.getElementById("close-detail-modal"),k=document.getElementById("campaign-detail-modal");E?.addEventListener("click",()=>k?.classList.add("hidden"))}function O(E){const k=document.getElementById("campaign-detail-modal"),T=document.getElementById("campaign-detail-content");if(!k||!T)return;window.__campaignFalhasLog=E.falhas_log||[];const S=E.total_leads>0?Math.round((E.enviados+E.falhas)/E.total_leads*100):0;T.innerHTML=`
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 2rem;">
                <div style="width: 48px; height: 48px; background: var(--primary); color: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    <i class="fa-solid fa-bullhorn"></i>
                </div>
                <div>
                    <h3 style="margin: 0;">${E.nome||"Detalhes da Campanha"}</h3>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">
                        ${E.data_inicio?`Iniciada em ${new Date(E.data_inicio.seconds*1e3).toLocaleString()}`:E.data_agendamento?`Agendada para ${new Date(E.data_agendamento.seconds*1e3).toLocaleString()}`:"Aguardando disparo..."}
                        ${E.data_fim?` • Finalizada em ${new Date(E.data_fim.seconds*1e3).toLocaleString()}`:""}
                    </p>
                </div>
            </div>

            <div class="lead-info-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Público Total</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${E.total_leads}</div>
                </div>
                <div class="card" style="background: rgba(34, 197, 94, 0.05); border-color: rgba(34, 197, 94, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #22c55e; text-transform: uppercase; margin-bottom: 0.5rem;">Sucesso</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #22c55e;">${E.enviados}</div>
                </div>
                <div class="card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.2); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: #ef4444; text-transform: uppercase; margin-bottom: 0.5rem;">Falhas</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #ef4444;">${E.falhas}</div>
                </div>
                <div class="card" style="background: var(--surface-light); padding: 1rem; text-align: center;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Status</div>
                    <span class="badge ${E.status==="finalizada"?"success":"warning"}" style="font-size: 0.8rem;">${E.status.toUpperCase()}</span>
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                    <span>Progresso do Envio</span>
                    <span>${S}%</span>
                </div>
                <div style="width: 100%; height: 12px; background: var(--surface-hover); border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color);">
                    <div style="width: ${S}%; height: 100%; background: linear-gradient(90deg, var(--primary) 0%, #818cf8 100%); border-radius: 6px; transition: width 0.5s ease;"></div>
                </div>
            </div>

            <div class="card" style="background: var(--surface-hover); border: 1px solid var(--border-color); padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; color: var(--text-main); font-weight: 600;">
                    <i class="fa-solid fa-message text-primary"></i>
                    Variações de Mensagem
                    <span class="badge secondary" style="font-size: 0.75rem; margin-left: 4px;">${(E.mensagens||[E.mensagem]).filter(Boolean).length}</span>
                </div>
                ${(E.mensagens?.length?E.mensagens:E.mensagem?[E.mensagem]:["(sem mensagem)"]).map((_,R)=>`
                        <div style="
                            background: rgba(255,255,255,0.03);
                            border: 1px solid var(--border-color);
                            border-radius: 10px;
                            padding: 1rem 1.25rem;
                            margin-bottom: 0.75rem;
                            position: relative;
                        ">
                            <div style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
                                <i class="fa-solid fa-comment"></i> Mensagem #${R+1}
                            </div>
                            <div style="white-space: pre-wrap; font-size: 0.92rem; line-height: 1.65; color: var(--text-main); font-family: inherit;">${_}</div>
                        </div>
                    `).join("")}
            </div>

            ${(()=>{const _=Array.isArray(E.falhas_log),R=(E.falhas||0)>0;return!_&&R?`
            <div style="display: flex; align-items: flex-start; gap: 10px; padding: 1rem 1.25rem; background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.25); border-radius: 10px; margin-top: 1.5rem; color: #f59e0b; font-size: 0.88rem; line-height: 1.5;">
                <i class="fa-solid fa-circle-info" style="margin-top: 2px; flex-shrink: 0;"></i>
                <span>Esta campanha registrou <strong>${E.falhas} falha(s)</strong>, mas foi processada antes do relatório de erros ser ativado. Novas campanhas terão o detalhamento completo dos erros.</span>
            </div>`:""})()}
            ${E.falhas_log?.length>0?`
            <div class="card" style="background: rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.25); padding: 1.5rem; margin-top: 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                    <div style="display: flex; align-items: center; gap: 8px; color: #ef4444; font-weight: 600;">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        Relatório de Falhas
                        <span style="background: rgba(239,68,68,0.15); color: #ef4444; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 20px;">${E.falhas_log.length}</span>
                    </div>
                    <button id="btn-export-falhas" style="background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 6px 14px; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-download"></i> Exportar CSV
                    </button>
                </div>
                <div style="overflow-x: auto; border-radius: 8px; border: 1px solid rgba(239,68,68,0.15);">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                        <thead>
                            <tr style="background: rgba(239,68,68,0.08);">
                                <th style="padding: 10px 14px; text-align: left; color: var(--text-muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap;">Contato</th>
                                <th style="padding: 10px 14px; text-align: left; color: var(--text-muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap;">Telefone</th>
                                <th style="padding: 10px 14px; text-align: left; color: var(--text-muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em;">Motivo da Falha</th>
                                <th style="padding: 10px 14px; text-align: left; color: var(--text-muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap;">Horário</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${E.falhas_log.map((_,R)=>`
                                <tr style="border-top: 1px solid rgba(239,68,68,0.1); ${R%2===1?"background: rgba(239,68,68,0.03);":""}">
                                    <td style="padding: 10px 14px; color: var(--text-main); font-weight: 500;">${_.nome}</td>
                                    <td style="padding: 10px 14px; color: var(--text-muted); font-family: monospace; font-size: 0.82rem;">${_.telefone}</td>
                                    <td style="padding: 10px 14px; color: #fca5a5;">${_.motivo}</td>
                                    <td style="padding: 10px 14px; color: var(--text-muted); font-size: 0.8rem; white-space: nowrap;">${new Date(_.ts).toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
            `:E.status==="finalizada"&&(E.falhas||0)===0?`
            <div style="display: flex; align-items: center; gap: 10px; padding: 1rem 1.25rem; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.2); border-radius: 10px; margin-top: 1.5rem; color: #22c55e; font-size: 0.9rem;">
                <i class="fa-solid fa-circle-check"></i>
                <span>Todos os envios foram concluídos sem falhas.</span>
            </div>
            `:""}
        `,k.classList.remove("hidden"),document.getElementById("btn-export-falhas")?.addEventListener("click",()=>{const _=window.__campaignFalhasLog||[];if(!_.length)return;const R=`Nome,Telefone,Motivo,Horário
`+_.map(p=>`"${p.nome}","${p.telefone}","${p.motivo}","${new Date(p.ts).toLocaleString()}"`).join(`
`),M=document.createElement("a");M.href="data:text/csv;charset=utf-8,"+encodeURIComponent(R),M.download="falhas_campanha.csv",M.click()})}},Pa={agendado:{label:"Agendado",color:"#6366f1",icon:"fa-clock"},confirmado:{label:"Confirmado",color:"#10b981",icon:"fa-circle-check"},concluido:{label:"Concluído",color:"#64748b",icon:"fa-flag-checkered"},cancelado:{label:"Cancelado",color:"#ef4444",icon:"fa-ban"}},Dt=n=>String(n).padStart(2,"0"),hi=n=>{const[e,t,a]=n.split("-");return`${a}/${t}/${e}`},fi=n=>n?.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})??"R$ 0,00",gi=()=>{const n=new Date;return`${n.getFullYear()}-${Dt(n.getMonth()+1)}-${Dt(n.getDate())}`},V_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await V.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;const s=(await V.getAll("products",{field:"companyId",operator:"==",value:e})).filter(h=>h.active!==!1),r=await V.getAll("clientes",{field:"companyId",operator:"==",value:e});r.sort((h,z)=>(h.nome||"").localeCompare(z.nome||""));let c=(await V.getAll("agendamentos",{field:"companyId",operator:"==",value:e})).map(h=>{const z=r.find(H=>H.id===h.clienteId);return{...h,clientName:z?.nome||h.clientName||"Cliente não identificado",clientPhone:z?.telefone||h.clientPhone||"—"}}),u=gi(),g="day";const x=h=>{const z=new Date(h+"T12:00:00"),H=z.getDay(),A=new Date(z);return A.setDate(z.getDate()-((H===0?7:H)-1)),Array.from({length:7},(L,G)=>{const q=new Date(A);return q.setDate(A.getDate()+G),`${q.getFullYear()}-${Dt(q.getMonth()+1)}-${Dt(q.getDate())}`})},v=h=>c.filter(z=>z.date===h).sort((z,H)=>z.time.localeCompare(H.time)),P=h=>c.filter(z=>h.includes(z.date)).sort((z,H)=>z.date.localeCompare(H.date)||z.time.localeCompare(H.time)),N=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],O=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],E=h=>{const z=new Date(h+"T12:00:00");return N[z.getDay()]},k=h=>{const z=new Date(h+"T12:00:00");return`${O[z.getMonth()]} ${z.getFullYear()}`},T=h=>{const z=Pa[h]||Pa.agendado;return`<span class="sched-badge" style="background:${z.color}22;color:${z.color};border-color:${z.color}44;">
            <i class="fa-solid ${z.icon}"></i> ${z.label}
        </span>`},S=h=>{const z=Pa[h.status]||Pa.agendado;return`
        <div class="sched-card" data-id="${h.id}" style="border-left-color: ${z.color};">
            <div class="sched-card-time">
                <span class="sched-time">${h.time}</span>
                <span class="sched-duration">${h.duration||30}min</span>
            </div>
            <div class="sched-card-body">
                <div class="sched-client">
                    <i class="fa-solid fa-user"></i>
                    <strong>${h.clientName}</strong>
                    <span class="sched-phone"><i class="fa-brands fa-whatsapp"></i> ${h.clientPhone}</span>
                </div>
                <div class="sched-service">
                    <i class="fa-solid fa-list-check"></i>
                    <span>${h.serviceName}</span>
                    <span class="sched-price">${fi(h.servicePrice)}</span>
                </div>
                ${h.notes?`<div class="sched-notes"><i class="fa-solid fa-note-sticky"></i> ${h.notes}</div>`:""}
                ${T(h.status)}
            </div>
            <div class="sched-card-actions">
                ${h.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${h.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                ${h.status==="confirmado"?`<button class="sched-action-btn done" onclick="window.completeAppointment('${h.id}')" title="Concluir"><i class="fa-solid fa-flag-checkered"></i></button>`:""}
                <button class="sched-action-btn edit" onclick="window.editAppointment('${h.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${h.id}')" title="Cancelar/Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`},_=()=>{const h=v(u),z=h.reduce((H,A)=>H+(A.servicePrice||0),0);return`
        <div class="sched-day-header">
            <button class="sched-nav-btn" id="prev-day"><i class="fa-solid fa-chevron-left"></i></button>
            <div class="sched-day-info">
                <span class="sched-day-name">${E(u)}</span>
                <span class="sched-day-date">${hi(u)}</span>
                <span class="sched-day-month">${k(u)}</span>
            </div>
            <button class="sched-nav-btn" id="next-day"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-stats-row">
            <div class="sched-stat"><i class="fa-solid fa-calendar-check"></i> <strong>${h.length}</strong> agendamentos</div>
            <div class="sched-stat"><i class="fa-solid fa-dollar-sign"></i> <strong>${fi(z)}</strong> previsão</div>
            <div class="sched-stat"><i class="fa-solid fa-circle-check" style="color:#10b981"></i> <strong>${h.filter(H=>H.status==="confirmado").length}</strong> confirmados</div>
        </div>
        <div class="sched-appointments-list" id="appointments-list">
            ${h.length===0?`
            <div class="sched-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>Nenhum agendamento para este dia.</p>
                <button class="btn-primary" id="btn-add-for-day" style="margin-top:1rem;">
                    <i class="fa-solid fa-plus"></i> Novo Agendamento
                </button>
            </div>`:h.map(S).join("")}
        </div>`},R=()=>{const h=x(u),z=P(h);return`
        <div class="sched-week-header">
            <button class="sched-nav-btn" id="prev-week"><i class="fa-solid fa-chevron-left"></i></button>
            <span class="sched-week-label">Semana de ${hi(h[0])} a ${hi(h[6])}</span>
            <button class="sched-nav-btn" id="next-week"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="sched-week-grid">
            ${h.map(H=>{const A=z.filter(q=>q.date===H);return`
                <div class="sched-week-col ${H===gi()?"today":""} ${H===u?"selected":""}" data-date="${H}" onclick="window.selectWeekDay('${H}')">
                    <div class="sched-week-col-header">
                        <span class="sched-wday">${E(H)}</span>
                        <span class="sched-wdate">${H.split("-")[2]}</span>
                        ${A.length>0?`<span class="sched-wcount">${A.length}</span>`:""}
                    </div>
                    <div class="sched-week-appts">
                        ${A.map(q=>`<div class="sched-week-item" style="border-left-color:${(Pa[q.status]||Pa.agendado).color};" onclick="event.stopPropagation(); window.editAppointment('${q.id}')">
                                <span class="sched-wtime">${q.time}</span>
                                <span class="sched-wclient">${q.clientName}</span>
                            </div>`).join("")}
                    </div>
                </div>`}).join("")}
        </div>`},M=()=>{const h=[...c].sort((A,L)=>A.date.localeCompare(L.date)||A.time.localeCompare(L.time)),z=h.filter(A=>A.date>=gi()&&A.status!=="cancelado"),H=h.filter(A=>A.date<gi()||A.status==="cancelado");return`
        <div class="sched-list-section">
            <div class="sched-list-title"><i class="fa-solid fa-clock"></i> Próximos agendamentos (${z.length})</div>
            ${z.length===0?'<p style="color:var(--text-dim);padding:1rem;">Nenhum agendamento futuro.</p>':""}
            ${z.map(A=>`
                <div class="sched-list-row">
                    <div class="sched-list-date">
                        <span>${hi(A.date)}</span>
                        <span>${A.time}</span>
                    </div>
                    <div class="sched-list-info">
                        <strong>${A.clientName}</strong>
                        <span>${A.serviceName}</span>
                    </div>
                    <div>${fi(A.servicePrice)}</div>
                    <div>${T(A.status)}</div>
                    <div class="sched-list-actions">
                        ${A.status==="agendado"?`<button class="sched-action-btn confirm" onclick="window.confirmAppointment('${A.id}')" title="Confirmar"><i class="fa-solid fa-check"></i></button>`:""}
                        <button class="sched-action-btn edit" onclick="window.editAppointment('${A.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="sched-action-btn cancel" onclick="window.cancelAppointment('${A.id}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`).join("")}
        </div>
        ${H.length>0?`
        <div class="sched-list-section" style="margin-top:2rem; opacity:0.7;">
            <div class="sched-list-title"><i class="fa-solid fa-history"></i> Histórico (${H.length})</div>
            ${H.slice(0,10).map(A=>`
                <div class="sched-list-row">
                    <div class="sched-list-date"><span>${hi(A.date)}</span><span>${A.time}</span></div>
                    <div class="sched-list-info"><strong>${A.clientName}</strong><span>${A.serviceName}</span></div>
                    <div>${fi(A.servicePrice)}</div>
                    <div>${T(A.status)}</div>
                    <div style="width:60px;"></div>
                </div>`).join("")}
        </div>`:""}`},p=Array.from({length:28},(h,z)=>{const H=Math.floor(z/2)+8,A=z%2===0?"00":"30";return`${Dt(H)}:${A}`}),m=`
    <div id="sched-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:560px; width:95%;">
            <span class="close-modal" id="close-sched-modal">&times;</span>
            <h2 id="sched-modal-title" style="margin-bottom:0.25rem;">Novo Agendamento</h2>
            <p class="text-muted" style="font-size:0.9rem; margin-bottom:1.5rem;">Preencha os dados do agendamento.</p>

            <div style="display:grid; gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Cliente <span style="color:#ef4444;">*</span></label>
                    <select id="sched-client-select" class="form-input">
                        <option value="">Selecione um cliente...</option>
                        ${r.map(h=>`<option value="${h.id}" data-nome="${h.nome}" data-phone="${h.telefone||""}">${h.nome}${h.telefone?" — "+h.telefone:""}</option>`).join("")}
                    </select>
                    ${r.length===0?'<p style="font-size:0.8rem;color:#f59e0b;margin-top:4px;"><i class="fa-solid fa-triangle-exclamation"></i> Nenhum cliente cadastrado. <a href="/schedule-clients" style="color:#6366f1;">Cadastrar clientes</a></p>':""}
                </div>
                <div class="form-group">
                    <label class="form-label">Serviço</label>
                    <select id="sched-service" class="form-input">
                        <option value="">Selecione um serviço...</option>
                        ${s.map(h=>`<option value="${h.id}" data-price="${h.price}" data-duration="${h.duration||30}">${h.name} — ${fi(h.price)}</option>`).join("")}
                    </select>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" id="sched-date" class="form-input" value="${u}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Horário</label>
                        <select id="sched-time" class="form-input">
                            ${p.map(h=>`<option value="${h}">${h}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Duração (minutos)</label>
                    <input type="number" id="sched-duration" class="form-input" value="30" min="15" max="480" step="15">
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select id="sched-status" class="form-input">
                        <option value="agendado">⏰ Agendado</option>
                        <option value="confirmado">✅ Confirmado</option>
                        <option value="concluido">🏁 Concluído</option>
                        <option value="cancelado">❌ Cancelado</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sched-notes" class="form-input" rows="3" style="resize:vertical;" placeholder="Alguma informação extra..."></textarea>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="cancel-sched-modal">Cancelar</button>
                <button class="btn-primary" id="save-sched-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;setTimeout(()=>C(),100);const y=()=>{const h=document.getElementById("sched-view-content");h&&(g==="day"?h.innerHTML=_():g==="week"?h.innerHTML=R():h.innerHTML=M(),b())},b=()=>{document.getElementById("prev-day")?.addEventListener("click",()=>{const h=new Date(u+"T12:00:00");h.setDate(h.getDate()-1),u=`${h.getFullYear()}-${Dt(h.getMonth()+1)}-${Dt(h.getDate())}`,y()}),document.getElementById("next-day")?.addEventListener("click",()=>{const h=new Date(u+"T12:00:00");h.setDate(h.getDate()+1),u=`${h.getFullYear()}-${Dt(h.getMonth()+1)}-${Dt(h.getDate())}`,y()}),document.getElementById("prev-week")?.addEventListener("click",()=>{const h=new Date(u+"T12:00:00");h.setDate(h.getDate()-7),u=`${h.getFullYear()}-${Dt(h.getMonth()+1)}-${Dt(h.getDate())}`,y()}),document.getElementById("next-week")?.addEventListener("click",()=>{const h=new Date(u+"T12:00:00");h.setDate(h.getDate()+7),u=`${h.getFullYear()}-${Dt(h.getMonth()+1)}-${Dt(h.getDate())}`,y()}),document.getElementById("btn-add-for-day")?.addEventListener("click",()=>{w()})};function w(h){const z=document.getElementById("sched-modal");if(!z)return;const H=document.getElementById("sched-modal-title"),A=document.getElementById("sched-client-select"),L=document.getElementById("sched-service"),G=document.getElementById("sched-date"),q=document.getElementById("sched-time"),J=document.getElementById("sched-duration"),X=document.getElementById("sched-status"),ae=document.getElementById("sched-notes"),de=document.getElementById("save-sched-btn");if(h){H.innerText="Editar Agendamento";const oe=h.clienteId||"";if(A)if(oe)A.value=oe;else{const fe=Array.from(A.options).find(xe=>xe.dataset.nome===h.clientName);A.value=fe?fe.value:""}L.value=h.serviceId,G.value=h.date,q.value=h.time,J.value=String(h.duration||30),X.value=h.status,ae.value=h.notes||"",de.setAttribute("data-edit-id",h.id)}else H.innerText="Novo Agendamento",A&&(A.value=""),L.value="",G.value=u,q.value="09:00",J.value="30",X.value="agendado",ae.value="",de.removeAttribute("data-edit-id");z.classList.remove("hidden")}function C(){document.getElementById("btn-new-appointment")?.addEventListener("click",()=>w()),document.getElementById("close-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("cancel-sched-modal")?.addEventListener("click",()=>{document.getElementById("sched-modal")?.classList.add("hidden")}),document.getElementById("sched-service")?.addEventListener("change",h=>{const z=h.target,A=z.options[z.selectedIndex].dataset.duration;A&&(document.getElementById("sched-duration").value=A)}),document.getElementById("save-sched-btn")?.addEventListener("click",async()=>{const h=document.getElementById("sched-client-select"),z=document.getElementById("sched-service"),H=document.getElementById("sched-date"),A=document.getElementById("sched-time"),L=document.getElementById("sched-duration"),G=document.getElementById("sched-status"),q=document.getElementById("sched-notes"),J=document.getElementById("save-sched-btn");if(!h.value){D.warning("Selecione um cliente.");return}if(!z.value){D.warning("Selecione um serviço.");return}if(!H.value){D.warning("Informe a data.");return}const X=h.options[h.selectedIndex],ae=h.value,de=X.dataset.nome||X.text.split(" — ")[0],oe=X.dataset.phone||"",fe=z.options[z.selectedIndex],xe={serviceId:z.value,serviceName:fe.text.split(" — ")[0],servicePrice:parseFloat(fe.dataset.price||"0")},Ce={companyId:e,clienteId:ae,clientName:de,clientPhone:oe,...xe,date:H.value,time:A.value,duration:parseInt(L.value)||30,status:G.value,notes:q.value.trim()||void 0},Se=J.getAttribute("data-edit-id");J.disabled=!0,J.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(Se){await V.update("agendamentos",Se,Ce);const Le=c.findIndex(qe=>qe.id===Se);Le!==-1&&(c[Le]={id:Se,...Ce}),D.success("Agendamento atualizado!")}else{const Le=await V.create("agendamentos",Ce);c.push({id:Le,...Ce}),D.success("Agendamento criado com sucesso!")}document.getElementById("sched-modal")?.classList.add("hidden"),y()}catch(Le){D.error("Erro ao salvar agendamento: "+Le)}finally{J.disabled=!1,J.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),document.querySelectorAll(".sched-view-tab").forEach(h=>{h.addEventListener("click",()=>{document.querySelectorAll(".sched-view-tab").forEach(z=>z.classList.remove("active")),h.classList.add("active"),g=h.dataset.view,y()})}),document.getElementById("sched-date-jump")?.addEventListener("change",h=>{u=h.target.value,y()}),document.getElementById("btn-today")?.addEventListener("click",()=>{u=gi(),document.getElementById("sched-date-jump").value=u,y()}),window.editAppointment=h=>{const z=c.find(H=>H.id===h);z&&w(z)},window.confirmAppointment=async h=>{try{await V.update("agendamentos",h,{status:"confirmado"});const z=c.find(H=>H.id===h);z&&(z.status="confirmado"),y(),D.success("Agendamento confirmado!")}catch{D.error("Erro ao confirmar.")}},window.completeAppointment=async h=>{try{await V.update("agendamentos",h,{status:"concluido"});const z=c.find(H=>H.id===h);z&&(z.status="concluido"),y(),D.success("Agendamento concluído!")}catch{D.error("Erro ao concluir.")}},window.cancelAppointment=async h=>{if(await Ne.danger("Excluir Agendamento","Deseja excluir este agendamento? Esta ação não pode ser desfeita."))try{await V.delete("agendamentos",h),c=c.filter(H=>H.id!==h),y(),D.success("Agendamento excluído.")}catch{D.error("Erro ao excluir.")}},window.selectWeekDay=h=>{u=h,g="day",document.querySelectorAll(".sched-view-tab").forEach(z=>{z.classList.toggle("active",z.dataset.view==="day")}),document.getElementById("sched-date-jump").value=h,y()},y()}return`
    <style>
        /* ── Schedule page styles ── */
        .sched-toolbar {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
        }
        .sched-view-tabs {
            display: flex;
            background: var(--surface-hover);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 3px;
            gap: 2px;
        }
        .sched-view-tab {
            padding: 6px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .sched-view-tab:hover { color: var(--text-main); background: rgba(255,255,255,0.05); }
        .sched-view-tab.active { background: var(--primary); color: #fff; box-shadow: 0 2px 8px var(--primary-glow); }

        .sched-date-jump { background: var(--surface-hover); border: 1px solid var(--border-color); border-radius: 8px; padding: 6px 12px; color: var(--text-main); font-size:0.85rem; cursor:pointer; }

        .sched-nav-btn { width:36px; height:36px; border-radius:8px; background:var(--surface-hover); border:1px solid var(--border-color); color:var(--text-main); display:flex;align-items:center;justify-content:center; transition:all 0.2s; }
        .sched-nav-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

        /* Day view */
        .sched-day-header { display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; }
        .sched-day-info { text-align:center; flex:1; }
        .sched-day-name { display:block; font-size:0.8rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:1px; }
        .sched-day-date { display:block; font-size:2rem; font-weight:800; color:var(--text-main); line-height:1; margin: 2px 0; }
        .sched-day-month { display:block; font-size:0.9rem; color:var(--text-muted); }

        .sched-stats-row { display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap; }
        .sched-stat { display:flex; align-items:center; gap:8px; background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; padding:10px 16px; font-size:0.9rem; color:var(--text-muted); flex:1; min-width:140px; }
        .sched-stat strong { color:var(--text-main); }

        .sched-appointments-list { display:flex; flex-direction:column; gap:0.75rem; }
        .sched-empty { text-align:center; padding:4rem 2rem; color:var(--text-dim); }
        .sched-empty i { font-size:3rem; margin-bottom:1rem; display:block; opacity:0.4; }

        /* Appointment card */
        .sched-card { display:flex; gap:1rem; background:var(--surface-hover); border:1px solid var(--border-color); border-left:4px solid var(--primary); border-radius:12px; padding:1rem 1.25rem; transition:all 0.2s; align-items:flex-start; }
        .sched-card:hover { border-color: rgba(99,102,241,0.4); transform:translateX(2px); }
        .sched-card-time { display:flex; flex-direction:column; align-items:center; min-width:55px; }
        .sched-time { font-size:1.2rem; font-weight:800; color:var(--text-main); }
        .sched-duration { font-size:0.72rem; color:var(--text-dim); background:rgba(255,255,255,0.06); padding:2px 6px; border-radius:4px; margin-top:4px; }

        .sched-card-body { flex:1; display:flex; flex-direction:column; gap:6px; }
        .sched-client { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .sched-client strong { font-size:1rem; color:var(--text-main); }
        .sched-phone { font-size:0.8rem; color:var(--text-dim); display:flex; align-items:center; gap:4px; }
        .sched-service { display:flex; align-items:center; gap:8px; font-size:0.9rem; color:var(--text-muted); }
        .sched-price { font-weight:700; color:var(--text-main); margin-left:auto; }
        .sched-notes { font-size:0.82rem; color:var(--text-dim); background:rgba(255,255,255,0.03); padding:4px 8px; border-radius:6px; border:1px solid var(--border-color); }

        .sched-badge { display:inline-flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; padding:3px 10px; border-radius:20px; border:1px solid; width:fit-content; margin-top:4px; }

        .sched-card-actions { display:flex; flex-direction:column; gap:6px; }
        .sched-action-btn { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:0.85rem; transition:all 0.2s; border:1px solid var(--border-color); background:var(--surface-hover); color:var(--text-muted); }
        .sched-action-btn:hover { transform:scale(1.1); }
        .sched-action-btn.confirm:hover { background:#10b98122; color:#10b981; border-color:#10b981; }
        .sched-action-btn.done:hover { background:#6366f122; color:#6366f1; border-color:#6366f1; }
        .sched-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sched-action-btn.cancel:hover { background:#ef444422; color:#ef4444; border-color:#ef4444; }

        /* Week view */
        .sched-week-header { display:flex; align-items:center; gap:1rem; justify-content:space-between; margin-bottom:1.25rem; }
        .sched-week-label { font-size:0.95rem; font-weight:700; color:var(--text-main); }
        .sched-week-grid { display:grid; grid-template-columns:repeat(7, 1fr); gap:8px; }
        .sched-week-col { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:10px; overflow:hidden; cursor:pointer; transition:all 0.2s; min-height:160px; }
        .sched-week-col:hover { border-color:rgba(99,102,241,0.4); }
        .sched-week-col.today .sched-week-col-header { background:rgba(99,102,241,0.15); }
        .sched-week-col.selected { border-color:var(--primary); box-shadow:0 0 0 1px var(--primary); }
        .sched-week-col-header { padding:8px 10px; display:flex; flex-direction:column; align-items:center; border-bottom:1px solid var(--border-color); position:relative; }
        .sched-wday { font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--text-dim); letter-spacing:0.5px; }
        .sched-wdate { font-size:1.4rem; font-weight:800; color:var(--text-main); }
        .sched-wcount { position:absolute; top:6px; right:8px; background:var(--primary); color:#fff; border-radius:50%; width:18px; height:18px; font-size:0.7rem; font-weight:700; display:flex; align-items:center; justify-content:center; }
        .sched-week-appts { padding:6px; display:flex; flex-direction:column; gap:4px; }
        .sched-week-item { background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-left:3px solid; border-radius:6px; padding:4px 6px; font-size:0.75rem; cursor:pointer; transition:all 0.15s; }
        .sched-week-item:hover { background:rgba(99,102,241,0.2); }
        .sched-wtime { font-weight:700; color:var(--text-main); display:block; }
        .sched-wclient { color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block; }

        /* List view */
        .sched-list-section { background:var(--surface-hover); border:1px solid var(--border-color); border-radius:12px; overflow:hidden; }
        .sched-list-title { padding:1rem 1.25rem; font-weight:700; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-color); color:var(--text-main); background:rgba(255,255,255,0.02); }
        .sched-list-row { display:grid; grid-template-columns:100px 1fr auto auto auto; align-items:center; gap:1rem; padding:0.75rem 1.25rem; border-bottom:1px solid var(--border-color); transition:background 0.2s; }
        .sched-list-row:last-child { border-bottom:none; }
        .sched-list-row:hover { background:rgba(255,255,255,0.03); }
        .sched-list-date { display:flex; flex-direction:column; font-size:0.85rem; }
        .sched-list-date span:first-child { font-weight:700; color:var(--text-main); }
        .sched-list-date span:last-child { color:var(--text-dim); }
        .sched-list-info { display:flex; flex-direction:column; }
        .sched-list-info strong { color:var(--text-main); font-size:0.95rem; }
        .sched-list-info span { color:var(--text-muted); font-size:0.82rem; }
        .sched-list-actions { display:flex; gap:6px; }

        /* Spinner */
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-calendar-alt" style="color:var(--primary); margin-right:10px;"></i>Agenda
            </h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Gerencie os agendamentos dos seus clientes.</p>
        </div>
        <button id="btn-new-appointment" class="btn-primary">
            <i class="fa-solid fa-plus"></i> Novo Agendamento
        </button>
    </div>

    <div class="sched-toolbar">
        <div class="sched-view-tabs">
            <button class="sched-view-tab active" data-view="day"><i class="fa-solid fa-calendar-day"></i> Dia</button>
            <button class="sched-view-tab" data-view="week"><i class="fa-solid fa-calendar-week"></i> Semana</button>
            <button class="sched-view-tab" data-view="list"><i class="fa-solid fa-list"></i> Lista</button>
        </div>
        <input type="date" id="sched-date-jump" class="sched-date-jump" value="${u}" title="Ir para data">
        <button id="btn-today" class="btn-secondary" style="padding:6px 14px; font-size:0.85rem;">
            <i class="fa-solid fa-crosshairs"></i> Hoje
        </button>
    </div>

    <div class="card" style="padding:1.5rem;" id="sched-view-content">
        <!-- Dynamically rendered -->
    </div>

    ${m}`},B_=n=>{if(!n)return"—";try{return new Date(n).toLocaleDateString("pt-BR")}catch{return n}},z_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Usuário sem empresa.</p>";const e=n.companyId;if(!((await V.get("companies",e))?.modulos_ativos||[]).includes("agendamento"))return`
            <div class="card" style="text-align:center; padding: 3rem;">
                <i class="fa-solid fa-users-slash" style="font-size:3rem; color: var(--text-dim); margin-bottom:1rem; display:block;"></i>
                <h2>Módulo de Agendamento</h2>
                <p style="color:var(--text-muted);">O módulo de IA Agendamento não está ativo para esta conta.<br>Entre em contato com o administrador para ativá-lo.</p>
            </div>`;let i=await V.getAll("clientes",{field:"companyId",operator:"==",value:e});const s=await V.getAll("agendamentos",{field:"companyId",operator:"==",value:e}),r=new Map;s.forEach(E=>{const k=E.clienteId;if(!k)return;const T=r.get(k),S=E.date||"";T?r.set(k,{count:T.count+1,ultimo:S>T.ultimo?S:T.ultimo}):r.set(k,{count:1,ultimo:S})});let l="";const c=E=>E.length===0?`
            <tr>
                <td colspan="5" style="text-align:center;padding:2.5rem;color:var(--text-muted);">
                    <i class="fa-solid fa-users-slash" style="font-size:2rem;display:block;margin-bottom:0.75rem;opacity:0.4;"></i>
                    Nenhum cliente encontrado.
                </td>
            </tr>`:E.map(k=>{const T=r.get(k.id),S=T?.count??0,_=T?.ultimo?B_(T.ultimo):"—",R=(k.nome||k.telefone||"C")[0].toUpperCase();return`
            <tr data-client-id="${k.id}">
                <td>
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <div class="sc-avatar">${R}</div>
                        <div>
                            <div style="font-weight:600;">${k.nome||"Sem nome"}</div>
                            <div style="font-size:0.78rem;color:var(--text-muted);">${k.email||""}</div>
                        </div>
                    </div>
                </td>
                <td style="color:var(--text-muted);font-size:0.9rem;">${k.telefone||"—"}</td>
                <td style="text-align:center;">
                    <span class="sc-badge">${S}</span>
                </td>
                <td style="color:var(--text-muted);font-size:0.85rem;">${_}</td>
                <td>
                    <div style="display:flex;gap:8px;">
                        <button class="sc-action-btn edit" title="Editar" data-edit-id="${k.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="sc-action-btn del" title="Excluir" data-del-id="${k.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),u=()=>{if(!l)return i;const E=l.toLowerCase();return i.filter(k=>(k.nome||"").toLowerCase().includes(E)||(k.telefone||"").toLowerCase().includes(E)||(k.email||"").toLowerCase().includes(E))},g=`
    <div id="sc-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" id="sc-modal-close">&times;</span>
            <h2 id="sc-modal-title" style="margin-bottom:0.25rem;">Novo Cliente</h2>
            <p class="text-muted" style="font-size:0.9rem;margin-bottom:1.5rem;">Preencha os dados do cliente.</p>
            <div style="display:grid;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Nome <span style="color:#ef4444;">*</span></label>
                    <input type="text" id="sc-nome" class="form-input" placeholder="Nome completo do cliente">
                </div>
                <div class="form-group">
                    <label class="form-label">Telefone / WhatsApp <span style="color:#ef4444;">*</span></label>
                    <input type="tel" id="sc-telefone" class="form-input" placeholder="Ex: 11999999999">
                </div>
                <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input type="email" id="sc-email" class="form-input" placeholder="cliente@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">Observações</label>
                    <textarea id="sc-obs" class="form-input" rows="3" style="resize:vertical;" placeholder="Informações extras sobre o cliente..."></textarea>
                </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:0.75rem;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" id="sc-modal-cancel">Cancelar</button>
                <button class="btn-primary" id="sc-save-btn" style="min-width:140px;">
                    <i class="fa-solid fa-save"></i> Salvar
                </button>
            </div>
        </div>
    </div>`;setTimeout(()=>O(),100);function x(E){const k=document.getElementById("sc-modal");if(!k)return;const T=document.getElementById("sc-modal-title"),S=document.getElementById("sc-nome"),_=document.getElementById("sc-telefone"),R=document.getElementById("sc-email"),M=document.getElementById("sc-obs"),p=document.getElementById("sc-save-btn");E?(T.textContent="Editar Cliente",S.value=E.nome||"",_.value=E.telefone||"",R.value=E.email||"",M.value=E.observacoes||"",p.setAttribute("data-edit-id",E.id)):(T.textContent="Novo Cliente",S.value="",_.value="",R.value="",M.value="",p.removeAttribute("data-edit-id")),k.classList.remove("hidden"),S.focus()}function v(){document.getElementById("sc-modal")?.classList.add("hidden")}const P=()=>{const E=document.getElementById("sc-tbody");E&&(E.innerHTML=c(u())),N()};function N(){document.querySelectorAll(".sc-action-btn.edit").forEach(E=>{E.addEventListener("click",()=>{const k=E.dataset.editId,T=i.find(S=>S.id===k);T&&x(T)})}),document.querySelectorAll(".sc-action-btn.del").forEach(E=>{E.addEventListener("click",async()=>{const k=E.dataset.delId,T=i.find(_=>_.id===k);if(await Ne.danger("Excluir Cliente",`Deseja excluir o cliente "${T?.nome||k}"? Esta ação não pode ser desfeita.`))try{await V.delete("clientes",k),i=i.filter(_=>_.id!==k),P(),D.success("Cliente excluído.")}catch{D.error("Erro ao excluir cliente.")}})})}function O(){document.getElementById("btn-new-client")?.addEventListener("click",()=>x()),document.getElementById("sc-modal-close")?.addEventListener("click",v),document.getElementById("sc-modal-cancel")?.addEventListener("click",v),document.getElementById("sc-modal")?.addEventListener("click",E=>{E.target===document.getElementById("sc-modal")&&v()}),document.getElementById("sc-search")?.addEventListener("input",E=>{l=E.target.value,P()}),document.getElementById("sc-save-btn")?.addEventListener("click",async()=>{const E=document.getElementById("sc-nome"),k=document.getElementById("sc-telefone"),T=document.getElementById("sc-email"),S=document.getElementById("sc-obs"),_=document.getElementById("sc-save-btn"),R=E.value.trim(),M=k.value.trim().replace(/\D/g,"");if(!R){D.warning("Informe o nome do cliente.");return}if(!M){D.warning("Informe o telefone do cliente.");return}const p={companyId:e,nome:R,telefone:M,email:T.value.trim()||"",observacoes:S.value.trim()||"",criadoEm:new Date().toISOString()},m=_.getAttribute("data-edit-id");_.disabled=!0,_.innerHTML='<div class="spinner-small"></div> Salvando...';try{if(m){await V.update("clientes",m,p);const y=i.findIndex(b=>b.id===m);y!==-1&&(i[y]={id:m,...p}),D.success("Cliente atualizado!")}else{const y=await V.create("clientes",p);i.push({id:y,...p}),D.success("Cliente criado com sucesso!")}v(),P()}catch(y){D.error("Erro ao salvar cliente: "+y)}finally{_.disabled=!1,_.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),P()}return`
    <style>
        .sc-avatar {
            width: 38px; height: 38px; border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            color: #fff; font-weight: 800; font-size: 1rem;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
        }
        .sc-badge {
            display: inline-flex; align-items: center; justify-content: center;
            background: rgba(99,102,241,0.12); color: #6366f1;
            border: 1px solid rgba(99,102,241,0.25);
            border-radius: 20px; padding: 2px 10px;
            font-size: 0.8rem; font-weight: 700;
        }
        .sc-action-btn {
            width: 32px; height: 32px; border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.85rem; transition: all 0.2s;
            border: 1px solid var(--border-color);
            background: var(--surface-hover);
            color: var(--text-muted);
            cursor: pointer;
        }
        .sc-action-btn.edit:hover { background:#f59e0b22; color:#f59e0b; border-color:#f59e0b; }
        .sc-action-btn.del:hover  { background:#ef444422; color:#ef4444; border-color:#ef4444; }
        .sc-search-wrap {
            position: relative; flex: 1; min-width: 200px; max-width: 360px;
        }
        .sc-search-wrap i {
            position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
            color: var(--text-dim); font-size: 0.85rem;
        }
        .sc-search-input {
            width: 100%; padding: 8px 12px 8px 36px;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; color: var(--text-main); font-size: 0.9rem;
        }
        .sc-search-input:focus { outline: none; border-color: var(--primary); }
        .spinner-small { width:18px; height:18px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.8s linear infinite; display:inline-block; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-users" style="color:var(--primary);margin-right:10px;"></i>Clientes
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os clientes cadastrados para agendamento.</p>
        </div>
        <button id="btn-new-client" class="btn-primary">
            <i class="fa-solid fa-user-plus"></i> Novo Cliente
        </button>
    </div>

    <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
            <div class="sc-search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="sc-search" class="sc-search-input" placeholder="Buscar por nome, telefone ou e-mail...">
            </div>
            <span id="sc-count" style="color:var(--text-dim);font-size:0.85rem;margin-left:auto;">
                ${i.length} cliente${i.length!==1?"s":""}
            </span>
        </div>

        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th style="text-align:center;">Agendamentos</th>
                        <th>Último Agend.</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="sc-tbody">
                    <!-- preenchido via JS -->
                </tbody>
            </table>
        </div>
    </div>

    ${g}`},F_=async()=>{let n={url:""},e=[];try{const s=await V.get("settings","backend");s&&(n={...n,...s})}catch{}try{e=await V.getAll("instancias"),e.sort((s,r)=>(s.nome||"").localeCompare(r.nome||""))}catch{}const t=n.url||"",a={agendamento:{label:"IA Agendamento",color:"#6366f1",icon:"fa-calendar-alt"},venda:{label:"IA Vendas",color:"#10b981",icon:"fa-cart-shopping"},catalogo:{label:"Catálogo",color:"#8b5cf6",icon:"fa-store"},disparo:{label:"Disparo",color:"#64748b",icon:"fa-paper-plane"},atendimento:{label:"IA Atendimento",color:"#f59e0b",icon:"fa-comments"}},i=()=>e.length===0?`<div class="bk-empty">
                <i class="fa-solid fa-server"></i>
                <p>Nenhuma instância cadastrada ainda.</p>
            </div>`:e.map(s=>{const r=s.funcao||"",l=a[r]||{label:r||"—",color:"#64748b",icon:"fa-link"},c=t&&s.nome?`${t}/webhook/evolution/${s.nome}`:"",u=s.webhookUrl&&c&&s.webhookUrl===c;return`
            <div class="bk-instance-row" id="inst-row-${s.id}">
                <div class="bk-inst-info">
                    <div class="bk-inst-name">
                        <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i>
                        <strong>${s.nome}</strong>
                        ${s.numero?`<span class="bk-inst-num">${s.numero.replace("@s.whatsapp.net","")}</span>`:""}
                    </div>
                    <div class="bk-inst-meta">
                        ${r?`<span class="bk-badge" style="background:${l.color}22;color:${l.color};border-color:${l.color}44;">
                            <i class="fa-solid ${l.icon}"></i> ${l.label}
                        </span>`:`<span class="bk-badge" style="color:var(--text-dim);border-color:var(--border-color);">
                            <i class="fa-solid fa-circle-question"></i> Sem módulo
                        </span>`}
                        ${u?'<span class="bk-badge" style="background:#10b98122;color:#10b981;border-color:#10b98144;"><i class="fa-solid fa-circle-check"></i> Webhook configurado</span>':'<span class="bk-badge" style="background:#f59e0b22;color:#f59e0b;border-color:#f59e0b44;"><i class="fa-solid fa-triangle-exclamation"></i> Webhook pendente</span>'}
                    </div>
                    ${c?`<div class="bk-webhook-url" title="${c}">
                        <i class="fa-solid fa-link" style="font-size:0.75rem;opacity:0.5;"></i>
                        <code>${c}</code>
                    </div>`:""}
                </div>
                <div class="bk-inst-actions">
                    ${c&&r?`
                    <button class="bk-sync-btn" onclick="window.syncInstanceWebhook('${s.id}', '${s.nome}', '${c}')"
                        title="Configurar webhook na Evolution API">
                        <i class="fa-solid fa-rotate"></i> Sincronizar
                    </button>`:`
                    <span style="font-size:0.8rem;color:var(--text-dim);">Configure o módulo nas Instâncias</span>
                    `}
                </div>
            </div>`}).join("");return setTimeout(()=>U_(e,t),100),`
    <style>
        .bk-section { margin-bottom: 2rem; }
        .bk-section-title {
            font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
            letter-spacing: 1px; color: var(--text-dim); margin-bottom: 1rem;
            display: flex; align-items: center; gap: 8px;
        }
        .bk-url-row {
            display: flex; gap: 0.75rem; align-items: flex-end;
        }
        .bk-url-row .form-group { flex: 1; margin-bottom: 0; }
        .bk-url-row .form-input { font-family: monospace; font-size: 0.9rem; }

        .bk-status-bar {
            display: flex; align-items: center; gap: 0.75rem;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; padding: 0.75rem 1rem; margin-top: 1rem;
            font-size: 0.88rem;
        }
        .bk-status-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .bk-status-dot.online  { background: #10b981; box-shadow: 0 0 6px #10b98166; }
        .bk-status-dot.offline { background: #ef4444; box-shadow: 0 0 6px #ef444466; }
        .bk-status-dot.pending { background: #f59e0b; animation: bk-pulse 1.5s infinite; }
        @keyframes bk-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        .bk-instance-row {
            display: flex; align-items: center; gap: 1rem;
            background: var(--surface-hover); border: 1px solid var(--border-color);
            border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 0.5rem;
            transition: border-color 0.2s;
        }
        .bk-instance-row:hover { border-color: rgba(99,102,241,0.3); }
        .bk-inst-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .bk-inst-name { display: flex; align-items: center; gap: 8px; }
        .bk-inst-num { font-size: 0.82rem; color: var(--text-dim); background: rgba(255,255,255,0.05); padding: 1px 8px; border-radius: 20px; }
        .bk-inst-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .bk-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; font-weight: 600; padding: 2px 10px; border-radius: 20px; border: 1px solid; }
        .bk-webhook-url { display: flex; align-items: center; gap: 6px; }
        .bk-webhook-url code { font-size: 0.75rem; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 400px; }
        .bk-inst-actions { flex-shrink: 0; }
        .bk-sync-btn {
            display: flex; align-items: center; gap: 6px;
            background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3);
            color: var(--primary); border-radius: 8px; padding: 6px 14px;
            font-size: 0.85rem; font-weight: 600; transition: all 0.2s; cursor: pointer;
        }
        .bk-sync-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
        .bk-sync-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .bk-empty { text-align: center; padding: 2.5rem; color: var(--text-dim); }
        .bk-empty i { font-size: 2.5rem; opacity: 0.3; margin-bottom: 0.75rem; display: block; }

        .bk-info-box {
            background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.2);
            border-radius: 10px; padding: 1rem 1.25rem; font-size: 0.88rem;
            color: var(--text-muted); display: flex; gap: 10px; align-items: flex-start;
            margin-bottom: 1.5rem;
        }
        .bk-info-box i { color: var(--primary); margin-top: 2px; flex-shrink: 0; }
    </style>

    <div class="page-header" style="margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-server" style="color:var(--primary);margin-right:10px;"></i>Configuração do Backend
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Conecte o backend de IA e configure os webhooks de cada instância.</p>
        </div>
    </div>

    <div class="bk-info-box">
        <i class="fa-solid fa-circle-info"></i>
        <div>
            <strong>Como funciona:</strong> Configure a URL do backend abaixo e clique em <em>Sincronizar</em> em cada instância para registrar o webhook automaticamente na Evolution API.
            O backend roteia as mensagens para o módulo correto (Agendamento, Vendas, etc.) com base na configuração da instância.
        </div>
    </div>

    <!-- URL do Backend -->
    <div class="card" style="padding:1.5rem;margin-bottom:1.5rem;">
        <div class="bk-section-title"><i class="fa-solid fa-globe"></i> URL do Backend</div>
        <div class="bk-url-row">
            <div class="form-group">
                <label class="form-label">Endereço do servidor</label>
                <input type="url" id="backend-url" class="form-input bk-url-row .form-input"
                    placeholder="https://api.seudominio.com"
                    value="${t}"
                    style="font-family:monospace;">
            </div>
            <button id="btn-test-connection" class="btn-secondary" style="height:42px;padding:0 1.25rem;flex-shrink:0;">
                <i class="fa-solid fa-plug"></i> Testar
            </button>
            <button id="btn-save-backend" class="btn-primary" style="height:42px;padding:0 1.25rem;flex-shrink:0;">
                <i class="fa-solid fa-save"></i> Salvar
            </button>
        </div>
        <div id="connection-status" class="bk-status-bar" style="display:none;">
            <div class="bk-status-dot pending" id="status-dot"></div>
            <span id="status-text">Verificando conexão...</span>
        </div>
    </div>

    <!-- Instâncias -->
    <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
            <div class="bk-section-title" style="margin-bottom:0;"><i class="fa-solid fa-plug"></i> Instâncias (${e.length})</div>
            <button id="btn-sync-all" class="btn-secondary" style="font-size:0.85rem;padding:6px 14px;" ${t?"":"disabled"}>
                <i class="fa-solid fa-rotate"></i> Sincronizar Todas
            </button>
        </div>
        <div id="instances-list">
            ${i()}
        </div>
    </div>`};function U_(n,e){let t=e;document.getElementById("btn-save-backend")?.addEventListener("click",async()=>{const a=document.getElementById("backend-url").value.trim().replace(/\/$/,"");if(!a){D.warning("Informe a URL do backend.");return}const i=document.getElementById("btn-save-backend");i.disabled=!0,i.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i>';try{await V.set("settings","backend",{url:a,updatedAt:new Date}),t=a,D.success("URL do backend salva! Agora sincronize as instâncias.");const s=document.getElementById("btn-sync-all");s&&(s.disabled=!1)}catch{D.error("Erro ao salvar configurações.")}finally{i.disabled=!1,i.innerHTML='<i class="fa-solid fa-save"></i> Salvar'}}),document.getElementById("btn-test-connection")?.addEventListener("click",async()=>{const a=document.getElementById("backend-url").value.trim().replace(/\/$/,"");if(!a){D.warning("Informe a URL do backend primeiro.");return}const i=document.getElementById("connection-status"),s=document.getElementById("status-dot"),r=document.getElementById("status-text");i.style.display="flex",s.className="bk-status-dot pending",r.textContent="Verificando conexão...";try{const l=await fetch(`${a}/health`,{signal:AbortSignal.timeout(5e3)}),c=await l.json().catch(()=>({}));l.ok?(s.className="bk-status-dot online",r.innerHTML=`<strong style="color:#10b981;">Online</strong> — Backend respondendo normalmente. Uptime: ${Math.floor((c.uptime||0)/60)} min`):(s.className="bk-status-dot offline",r.innerHTML=`<strong style="color:#ef4444;">Erro ${l.status}</strong> — Backend retornou erro.`)}catch{s.className="bk-status-dot offline",r.innerHTML='<strong style="color:#ef4444;">Offline</strong> — Não foi possível conectar. Verifique se o backend está rodando.'}}),window.syncInstanceWebhook=async(a,i,s)=>{const r=document.querySelector(`#inst-row-${a} .bk-sync-btn`);r&&(r.disabled=!0,r.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Sincronizando...');try{await ct.setWebhook(i,s,!0)?(await V.update("instancias",a,{webhookUrl:s,updatedAt:new Date}),D.success(`Webhook de "${i}" configurado com sucesso!`),r&&(r.innerHTML='<i class="fa-solid fa-circle-check"></i> Sincronizado',r.style.cssText="background:#10b98122;border-color:#10b98144;color:#10b981;")):(D.error(`Falha ao configurar webhook de "${i}". Verifique se a instância existe na Evolution API.`),r&&(r.disabled=!1,r.innerHTML='<i class="fa-solid fa-rotate"></i> Sincronizar'))}catch(l){D.error("Erro: "+l.message),r&&(r.disabled=!1,r.innerHTML='<i class="fa-solid fa-rotate"></i> Sincronizar')}},document.getElementById("btn-sync-all")?.addEventListener("click",async()=>{const a=t||document.getElementById("backend-url")?.value.trim().replace(/\/$/,"");if(!a){D.warning("Salve a URL do backend primeiro.");return}const i=n.filter(l=>l.funcao&&l.nome);if(i.length===0){D.warning("Nenhuma instância com módulo configurado.");return}const s=document.getElementById("btn-sync-all");s.disabled=!0,s.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Sincronizando...';let r=0;for(const l of i){const c=`${a}/webhook/evolution/${l.nome}`;try{await ct.setWebhook(l.nome,c,!0)&&(await V.update("instancias",l.id,{webhookUrl:c}),r++)}catch{}}s.disabled=!1,s.innerHTML='<i class="fa-solid fa-rotate"></i> Sincronizar Todas',D.success(`${r}/${i.length} instâncias sincronizadas com sucesso!`)})}const j_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const t=await V.get("companies",n.companyId),a=t?.mercadoPagoToken||"",i=t?.userIdMercadoPago||"";return window.disconnectMercadoPago=async()=>{if(!await Ne.danger("Desativar Integração","Tem certeza que deseja desativar o Mercado Pago? Isso removerá seu token de acesso."))return;const r=document.getElementById("btn-disconnect-mp");r.disabled=!0,r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>';try{await V.update("companies",n.companyId,{mercadoPagoToken:null,userIdMercadoPago:null}),D.success("Integração desativada."),setTimeout(()=>window.location.reload(),1e3)}catch(l){D.error("Erro ao desativar: "+l.message),r.disabled=!1,r.innerHTML='<i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>'}},window.connectMercadoPago=async()=>{const s=document.getElementById("mp-token-input"),r=document.getElementById("btn-connect-mp"),l=s.value.trim();if(!l){D.warning("Por favor, insira o Access Token primeiro.");return}r.disabled=!0;const c=r.innerHTML;r.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> <span>Conectando...</span>';try{await V.update("companies",n.companyId,{mercadoPagoToken:l});const u=await Yn.post("/mp/connect",{accessToken:l,companyId:n.companyId});D.success(`MercadoPago conectado! Conta: ${u.email||u.nome||"OK"}`),setTimeout(()=>{window.location.reload()},1500)}catch(u){console.error(u),D.error("Erro na conexão: "+u.message)}finally{r.disabled=!1,r.innerHTML=c}},`
        <div class="page-header" style="flex-direction: column;">
            <div><h2 class="page-title">Configuração Mercado Pago</h2></div>
            <div><p style="color: var(--text-muted); font-size: 0.9rem;">Configure sua integração para recebimento de pagamentos.</p></div>
        </div>

        <div class="card glass" style="max-width: 600px; margin-top: 20px;">
            <div style="display: flex; align-items: center; gap: 18px; margin-bottom: 30px;">
                <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #009ee3 0%, #007bbd 100%); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.8rem; box-shadow: 0 8px 16px rgba(0, 158, 227, 0.2);">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 1.25rem;">Integração de Pagamentos</h3>
                    <p style="margin: 0; color: var(--text-dim); font-size: 0.85rem;">Conecte sua conta para aceitar cartões e Pix.</p>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">Access Token (Produção)</label>
                <div style="position: relative;">
                    <input type="password" id="mp-token-input" class="input-field" 
                           placeholder="APP_USR-0000..." 
                           value="${a}" 
                           style="width: 100%; padding: 14px 45px 14px 16px; background: var(--bg-color); border: 1px solid var(--border-color); color: white; border-radius: 10px; font-family: monospace;">
                    <button type="button" onclick="const input = document.getElementById('mp-token-input'); input.type = input.type === 'password' ? 'text' : 'password';" 
                            style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--text-dim); border: none; background: none; cursor: pointer; padding: 5px;">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 10px; font-weight: 600; color: var(--text-main);">User Id</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="mp-userid-input" class="input-field" 
                           placeholder="Clique em conectar para buscar o ID" 
                           value="${i}" 
                           disabled
                           style="flex: 1; padding: 14px 16px; background: rgba(0,0,0,0.1); border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 10px; font-family: monospace;">
                    
                    ${a?`
                        <button id="btn-disconnect-mp" class="btn-danger" onclick="window.disconnectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #ef4444; color: white; border: none; cursor: pointer;">
                            <i class="fa-solid fa-plug-circle-xmark"></i> <span>Desativar</span>
                        </button>
                    `:`
                        <button id="btn-connect-mp" class="btn-primary" onclick="window.connectMercadoPago()" style="display: flex; align-items: center; gap: 8px; padding: 0 25px; height: 48px; border-radius: 10px; font-weight: 600; background: #009ee3;">
                            <i class="fa-solid fa-plug"></i> <span>Conectar</span>
                        </button>
                    `}
                </div>
            </div>
            
            <div style="background: rgba(99, 102, 241, 0.05); border: 1px solid rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 15px; display: flex; gap: 12px;">
                <i class="fa-solid fa-circle-info" style="color: var(--primary); margin-top: 3px;"></i>
                <div style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted);">
                    Após inserir o <strong>Access Token</strong>, clique em <strong>Conectar</strong>. O sistema buscará seu <strong>User ID</strong> automaticamente para validar a integração.
                </div>
            </div>
        </div>

        <div class="card" style="max-width: 600px; margin-top: 20px; border-left: 4px solid var(--warning); background: rgba(245, 158, 11, 0.02);">
            <div style="display: flex; gap: 15px;">
                <i class="fa-solid fa-shield-halved" style="color: var(--warning); font-size: 1.2rem;"></i>
                <div>
                    <h4 style="margin: 0 0 5px 0;">Segurança dos Dados</h4>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                        Seu token é armazenado de forma criptografada e utilizado apenas para comunicação oficial com a API do Mercado Pago. Nunca compartilhe seu token com terceiros.
                    </p>
                </div>
            </div>
        </div>
    `},uu=async n=>{try{const e=await V.getAll("loja_config",{field:"lojaId",operator:"==",value:n});let t=e[0]?.empresaId,a=null,i=null;if(t&&(a=await V.get("companies",t),a&&(i=a.stores?.find(F=>F.id===n))),!i){const F=await V.getAll("companies");for(const $ of F){const U=$.stores?.find(Q=>Q.id===n);if(U){a=$,i=U;break}}}if(!a||!i)return`
                <div style="height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:white;font-family:sans-serif;">
                    <div style="text-align:center;padding:2.5rem;background:rgba(255,255,255,0.03);border-radius:24px;border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(20px);max-width:400px;">
                        <div style="font-size:4rem;margin-bottom:1rem;">🔎</div>
                        <h2 style="margin-bottom:0.5rem;font-weight:700;">Catálogo não encontrado</h2>
                        <p style="color:#94a3b8;line-height:1.5;">O link que você acessou pode estar incorreto ou a loja não está mais ativa.</p>
                    </div>
                </div>
            `;const s=a.modulos_ativos||[],r=s.includes("catalogo"),l=await V.getAll("products",{field:"companyId",operator:"==",value:a.id}),c=await V.getAll("categories",{field:"companyId",operator:"==",value:a.id}),u=e[0]||{},g=u.design||{},x=g.primaryColor||"#6366f1",v=g.secondaryColor||"#0f172a",P=g.textColor||"#ffffff",N=g.priceColor||"#ffffff",O=g.logoUrl||"",E=g.pixKey||"",k=(F,$,U)=>{if(typeof document>"u")return;if(document.title=F,[{name:"description",content:$},{property:"og:title",content:F},{property:"og:description",content:$},{property:"og:image",content:U},{property:"og:type",content:"website"},{property:"og:url",content:window.location.href},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:F},{name:"twitter:description",content:$},{name:"twitter:image",content:U}].forEach(W=>{const te=W.name?`meta[name="${W.name}"]`:`meta[property="${W.property}"]`;let ie=document.querySelector(te);ie||(ie=document.createElement("meta"),W.name&&ie.setAttribute("name",W.name),W.property&&ie.setAttribute("property",W.property),document.head.appendChild(ie)),ie.setAttribute("content",W.content)}),O){let W=document.querySelector("link[rel~='icon']");W||(W=document.createElement("link"),W.rel="icon",document.head.appendChild(W)),W.href=O}},T=i.name||"Catálogo",S=g.metaDescription||`Confira os produtos de ${T} em nosso catálogo digital.`,_=g.logoUrl||window.location.origin+"/logo.png";k(T,S,_),console.log(`[Catalog] Meta tags updated for: ${T}`);let R=g.whatsapp||"";if(!R)try{if(i.instancia_id){const F=await V.get("instancias",i.instancia_id);F?.numero&&(R=F.numero.replace(/\D/g,""))}}catch(F){console.warn("Could not fetch instance details:",F)}const M=!!a.mercadoPagoToken&&u.mercadoPagoActive!==!1,p=l.filter(F=>F.active!==!1&&(F.storeIds?.includes(n)||F.storeId===n)).sort((F,$)=>(F.name||"").localeCompare($.name||"")),m=p.filter(F=>F.promotionalActive),y=g.themeId||"classico",b=g.bannerUrl||"",w=g.bannerMobileUrl||"",C=c.map(F=>({...F,products:p.filter($=>$.categoryId===F.id)})).filter(F=>F.products.length>0).sort((F,$)=>(F.name||"").localeCompare($.name||"")),h=p.filter(F=>!F.categoryId||!c.find($=>$.id===F.categoryId)),z=F=>F.imageUrl?F.imageUrl:F.imagemPath&&F.downloadToken?`https://firebasestorage.googleapis.com/v0/b/conectacidade-5e46d.firebasestorage.app/o/${encodeURIComponent(F.imagemPath)}?alt=media&token=${F.downloadToken}`:"https://via.placeholder.com/300?text=Sem+Imagem";let H=new Map;try{const F=localStorage.getItem(`cat_cart_${n}`);F&&(H=new Map(JSON.parse(F)))}catch{}const A=u?.bairrosEntrega||[],L=[];A&&Array.isArray(A)&&(A.forEach(F=>{(F.bairros||"").split(",").map(U=>U.trim()).filter(Boolean).forEach(U=>L.push({nome:U,preco:parseFloat(F.preco)||0}))}),L.sort((F,$)=>F.nome.localeCompare($.nome)));const G=u?.cupons||[],q=`cat_user_${a.id}`,J=JSON.parse(localStorage.getItem(q)||"{}");let X=null;const ae=()=>{let F=0;return H.forEach(({product:$,qty:U})=>{const Q=$.promotionalActive&&$.promotionalPrice||$.price;F+=Q*U}),F},de=()=>window.catDeliveryType==="retirada"?0:window.catTaxaBairro||0,oe=()=>window.catDeliveryType==="retirada"?"Retirada":window.catSelectedBairro?`Entrega (${window.catSelectedBairro})`:"Taxa de Entrega",fe=F=>X?X.tipo==="percent"?F*X.desconto/100:X.desconto:0,xe=()=>{const F=ae();return F+de()-fe(F)},Ce=()=>{if(H.size===0)return'<p style="text-align:center;color:#94a3b8;padding:20px 0;">Seu carrinho está vazio.</p>';let F="";return H.forEach(({product:$,qty:U},Q)=>{const W=$.promotionalActive&&$.promotionalPrice||$.price;F+=`
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="flex:1;">
                        <p style="margin:0;font-weight:600;font-size:0.95rem;">${$.name}</p>
                        <p style="margin:4px 0 0;color:#94a3b8;font-size:0.8rem;">R$ ${W.toFixed(2)} cada</p>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <button onclick="window.catQtyChange('${Q}',-1)" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">-</button>
                        <span style="min-width:24px;text-align:center;font-weight:700;">${U}</span>
                        <button onclick="window.catQtyChange('${Q}',1)" style="width:28px;height:28px;border-radius:50%;background:#6366f1;color:white;border:none;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">+</button>
                        <button onclick="window.catRemoveItem('${Q}')" style="color:#ef4444;background:none;border:none;cursor:pointer;padding:4px;"><i class="fa-solid fa-trash" style="font-size:0.85rem;"></i></button>
                    </div>
                </div>`}),F},Se=()=>{const F=ae(),$=de(),U=fe(F),Q=F+$-U;let W="";return H.forEach(({product:te,qty:ie})=>{const we=te.promotionalActive&&te.promotionalPrice||te.price;W+=`<div style="display:flex;justify-content:space-between;font-size:0.88rem;padding:4px 0;"><span>${ie}x ${te.name}</span><span>R$ ${(we*ie).toFixed(2)}</span></div>`}),$>0&&(W+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#94a3b8;"><span><i class="fa-solid fa-truck" style="margin-right:4px;"></i>${oe()}</span><span>+ R$ ${$.toFixed(2)}</span></div>`),U>0&&X&&(W+=`<div style="display:flex;justify-content:space-between;font-size:0.85rem;padding:4px 0;color:#10b981;"><span><i class="fa-solid fa-tag" style="margin-right:4px;"></i>Cupom ${X.codigo}</span><span>- R$ ${U.toFixed(2)}</span></div>`),W+=`<div style="display:flex;justify-content:space-between;font-weight:800;font-size:1rem;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;"><span>Total</span><span style="color:#6366f1;">R$ ${Q.toFixed(2)}</span></div>`,W},Le={dom:"Domingo",seg:"Segunda-feira",ter:"Terça-feira",qua:"Quarta-feira",qui:"Quinta-feira",sex:"Sexta-feira",sab:"Sábado"},qe=()=>["dom","seg","ter","qua","qui","sex","sab"][new Date().getDay()],Xe=F=>{const $=u.horario_funcionamento?.[F]||i.horarios?.[F]||{};return{ativo:$.ativo??$.aberto??F!=="dom",inicio:$.inicio||$.abertura||"08:00",fim:$.fim||$.fechamento||"18:00"}},st=F=>{const $=u.horario_entrega?.[F]||i.horario_entrega?.[F]||{};return console.log($),{ativo:$.ativo??$.aberto??F!=="dom",inicio:$.inicio||$.abertura||"08:00",fim:$.fim||$.fechamento||"18:00"}},he=()=>{const F=qe(),$=st(F);if(!$.ativo)return!1;const U=new Date,Q=U.getHours()*60+U.getMinutes(),[W,te]=$.inicio.split(":").map(Number),[ie,we]=$.fim.split(":").map(Number);return Q>=W*60+te&&Q<=ie*60+we},se=he(),pe=()=>{const F=qe(),$=Xe(F);if(!$.ativo)return!1;const U=new Date,Q=U.getHours()*60+U.getMinutes(),[W,te]=$.inicio.split(":").map(Number),[ie,we]=$.fim.split(":").map(Number);return Q>=W*60+te&&Q<=ie*60+we},Oe=()=>{const F=["dom","seg","ter","qua","qui","sex","sab"],$=new Date().getDay(),U=new Date,Q=U.getHours()*60+U.getMinutes(),W=F[$],te=Xe(W);if(te.ativo){const[ie,we]=te.inicio.split(":").map(Number),Ue=ie*60+we;if(Q<Ue)return`Hoje às ${te.inicio}`}for(let ie=1;ie<=7;ie++){const we=($+ie)%7,Ue=F[we],We=Xe(Ue);if(We.ativo)return ie===1?`Amanhã às ${We.inicio}`:`${Le[Ue]} às ${We.inicio}`}return"em breve"},ve=pe(),ut=()=>{const F=qe(),$=Xe(F);if(!$.ativo)return'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>';const U=new Date,Q=U.getHours()*60+U.getMinutes(),[W,te]=$.inicio.split(":").map(Number),[ie,we]=$.fim.split(":").map(Number),Ue=W*60+te,We=ie*60+we;return Q>=Ue&&Q<=We?`<span style="color:#10b981;"><i class="fa-solid fa-door-open"></i> Aberto agora</span> <span style="opacity:0.6;margin-left:4px;">• Fecha às ${$.fim}</span>`:Q<Ue?`<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span> <span style="opacity:0.6;margin-left:4px;">• Abre às ${$.inicio}</span>`:'<span style="color:#ef4444;"><i class="fa-solid fa-door-closed"></i> Fechado no momento</span>'},be=()=>{let F="";return["dom","seg","ter","qua","qui","sex","sab"].forEach($=>{const U=Xe($);U.ativo?F+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${Le[$]}</span><span style="font-weight:600;">${U.inicio} às ${U.fim}</span></div>`:F+=`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted);">${Le[$]}</span><span style="color:#ef4444;font-size:0.8rem;font-weight:600;">Fechado</span></div>`}),F},_e=()=>{const F=document.getElementById("cart-badge"),$=document.getElementById("cart-total"),U=document.getElementById("cart-items"),Q=document.getElementById("cart-float-btn"),W=document.getElementById("cart-total-float"),te=document.getElementById("cart-badge-float");try{localStorage.setItem(`cat_cart_${n}`,JSON.stringify(Array.from(H.entries())))}catch{}let ie=0;H.forEach(({qty:we})=>ie+=we),F&&(F.textContent=ie.toString()),te&&(te.textContent=ie.toString()),Q&&(Q.style.display=ie>0?"flex":"none"),$&&($.textContent=`R$ ${xe().toFixed(2)}`),W&&(W.textContent=`R$ ${xe().toFixed(2).replace(".",",")}`),U&&(U.innerHTML=Ce())};window.openStoreInfo=()=>rt("store-info-modal"),window.closeStoreInfo=()=>He("store-info-modal"),window.catInit=()=>{const F=document.getElementById("checkout-name"),$=document.getElementById("checkout-phone"),U=document.getElementById("checkout-address");F&&J.name&&(F.value=J.name),$&&J.phone&&($.value=J.phone),U&&J.address&&(U.value=J.address),$&&($.addEventListener("input",Q=>{let W=Q.target.value.replace(/\D/g,"");W.length>11&&(W=W.slice(0,11)),Q.target.value=W}),$.setAttribute("placeholder","DDD + 9 dígitos"),$.setAttribute("maxlength","11"))},setTimeout(()=>window.catInit(),500);const rt=F=>{const $=document.getElementById(F);$&&($.style.display="flex")},He=F=>{const $=document.getElementById(F);$&&($.style.display="none")};if(r){window.showClosedAlert=$=>{const U=document.getElementById("closed-alert-title"),Q=document.getElementById("closed-alert-desc"),W=document.getElementById("closed-alert-time-section"),te=document.getElementById("next-open-time"),ie=document.getElementById("closed-alert-icon");$==="store"?(U&&(U.textContent="Loja Fechada"),Q&&(Q.textContent="No momento não estamos aceitando pedidos."),W&&(W.style.display="block"),te&&(te.textContent=Oe()),ie&&(ie.className="fa-solid fa-store-slash")):$==="delivery"&&(U&&(U.textContent="Entrega Desativada"),Q&&(Q.textContent="O serviço de entrega está desativado no momento. Por favor, escolha a opção de Retirada se disponível."),W&&(W.style.display="none"),ie&&(ie.className="fa-solid fa-motorcycle")),rt("closed-alert-modal")},window.catAddToCart=$=>{const U=p.find(ie=>ie.id===$);if(!U||U.stock===0)return;const Q=H.get($),W=U.stock??1/0;if((Q?.qty||0)>=W){alert(`Estoque máximo atingido (${U.stock} un.)`);return}H.set($,{product:U,qty:(Q?.qty||0)+1}),_e();const te=document.getElementById(`btn-add-${$}`);te&&(te.textContent="✓ Adicionado",setTimeout(()=>{te&&(te.textContent="+ Adicionar")},1e3))},window.catQtyChange=($,U)=>{const Q=H.get($);if(!Q)return;const W=Q.qty+U;W<=0?H.delete($):Q.qty=Math.min(W,Q.product.stock??1/0),_e()},window.catRemoveItem=$=>{H.delete($),_e()},window.openCart=()=>{_e(),rt("cart-modal")},window.closeCart=()=>He("cart-modal"),window.goToDelivery=async()=>{if(H.size===0)return;if(!ve){window.showClosedAlert("store");return}const $=document.getElementById("btn-go-delivery");$&&($.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Verificando...');let U=!1;for(const[Q,{product:W,qty:te}]of Array.from(H.entries()))try{const ie=await V.get("products",Q);if(!ie||ie.active===!1||ie.stock!=null&&ie.stock<te){U=!0,alert(`O produto "${W.name}" não possui quantidade suficiente em estoque ou está indisponível.`);break}}catch{}$&&($.innerHTML='<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido'),!U&&(He("cart-modal"),rt("delivery-modal"))},window.closeDelivery=()=>He("delivery-modal"),window.selectDelivery=$=>{window.catDeliveryType=$,document.querySelectorAll(".delivery-card").forEach(W=>{W.style.borderColor="rgba(255,255,255,0.1)",W.style.background="transparent"});const U=document.getElementById(`delivery-card-${$}`);U&&(U.style.borderColor="#6366f1",U.style.background="rgba(99,102,241,0.08)");const Q=document.getElementById("btn-go-customer");Q&&(Q.disabled=!1,Q.style.opacity="1",Q.style.cursor="pointer")},window.goToCustomer=()=>{const $=window.catDeliveryType;if(!$)return;if($==="entrega"&&!se){window.showClosedAlert("delivery");return}He("delivery-modal");const U=document.getElementById("address-group");U&&(U.style.display=$==="entrega"?"block":"none"),rt("customer-modal")},window.closeCustomer=()=>He("customer-modal"),window.catFilterBairros=$=>{const U=document.getElementById("checkout-bairro-dropdown");if(!U)return;const Q=$?L.filter(W=>W.nome.toLowerCase().includes($.toLowerCase())):L;Q.length===0?U.innerHTML='<div style="padding:12px;color:#ef4444;font-size:0.85rem;">Nenhum bairro encontrado</div>':U.innerHTML=Q.map(W=>`<div onclick="window.catSelectBairro('${W.nome.replace(/'/g,"\\'")}', ${W.preco})" style="padding:12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);color:white;font-size:0.9rem;">${W.nome} - R$ ${W.preco.toFixed(2)}</div>`).join(""),U.style.display="block"},window.catSelectBairro=($,U)=>{const Q=document.getElementById("checkout-bairro");Q&&(Q.value=$,Q.dataset.preco=U.toString());const W=document.getElementById("checkout-bairro-dropdown");W&&(W.style.display="none")},document.addEventListener("click",$=>{if(!$.target.closest("#bairro-input-wrapper")){const U=document.getElementById("checkout-bairro-dropdown");U&&(U.style.display="none")}}),window.goToPayment=()=>{const $=document.getElementById("checkout-name")?.value.trim(),U=document.getElementById("checkout-phone")?.value.trim(),Q=document.getElementById("checkout-address")?.value.trim(),W=window.catDeliveryType;let te="",ie=0;if(W==="entrega"&&L.length>0){const De=document.getElementById("checkout-bairro");if(!De||!De.value.trim()){alert("Selecione ou digite seu bairro para entrega.");return}te=De.value.trim();const Be=L.find(ze=>ze.nome.toLowerCase()===te.toLowerCase());if(!Be){alert("Bairro selecionado não encontrado na lista. Por favor, escolha uma opção listada.");return}te=Be.nome,ie=Be.preco}if(!$||!U){alert("Preencha nome e telefone.");return}let we=U.replace(/\D/g,"");if(we.length===13&&we.startsWith("55")&&(we=we.substring(2)),we.length!==11){Dl.showPhoneError();return}if(W==="entrega"&&!Q){alert("Preencha o endereço de entrega completo.");return}window.catSelectedBairro=te,window.catTaxaBairro=ie;const Ue={name:$,phone:U,address:Q||"",bairro:te};window.catCustomer=Ue,localStorage.setItem(q,JSON.stringify(Ue)),He("customer-modal");const We=document.getElementById("payment-order-summary");We&&(We.innerHTML=Se());const At=document.getElementById("cat-coupon-section");At&&(At.style.display=G.length>0?"block":"none");const mt=document.getElementById("btn-pay-delivery"),Vt=document.getElementById("btn-pay-pix-manual"),Re=document.getElementById("btn-pay-pix-mp"),Lt=document.getElementById("mandatory-pay-msg"),kt=u?.pagamentoObrigatorioRetirada===!0,Ge=u?.desativarPagamentoEntrega===!0;mt&&(W==="retirada"&&kt||W==="entrega"&&Ge?mt.style.display="none":mt.style.display="flex"),Lt&&(Lt.style.display=W==="retirada"&&kt?"block":"none"),Vt&&(Vt.style.display=E?"flex":"none"),Re&&(Re.style.display=M?"flex":"none"),rt("payment-modal")},window.closePayment=()=>He("payment-modal"),window.catToggleDeliveryOptions=()=>{const $=document.getElementById("delivery-payment-details");if($){const U=$.style.display==="flex";if($.style.display=U?"none":"flex",U){window.catDeliveryPaymentMethod=null,window.catTroco=null,document.querySelectorAll(".btn-sub-method").forEach(W=>W.style.background="rgba(255,255,255,0.05)");const Q=document.getElementById("troco-wrapper");Q&&(Q.style.display="none")}}},window.catSelectDeliverySubMethod=$=>{window.catDeliveryPaymentMethod=$,document.querySelectorAll(".btn-sub-method").forEach(te=>{te.style.background="rgba(255,255,255,0.05)",te.style.borderColor="rgba(255,255,255,0.1)"});const U=document.getElementById(`btn-sub-${$}`);U&&(U.style.background="rgba(99,102,241,0.2)",U.style.borderColor="#6366f1");const Q=document.getElementById("troco-wrapper");Q&&(Q.style.display=$==="dinheiro"?"block":"none");const W=document.getElementById("btn-confirm-delivery-sub");W&&(W.disabled=!1,W.style.opacity="1")},window.catApplyCoupon=()=>{const $=(document.getElementById("cat-coupon-input")?.value||"").trim().toUpperCase(),U=G.find(we=>we.codigo===$&&we.ativo!==!1),Q=ae(),W=document.getElementById("cat-coupon-msg");if(!U){W&&(W.textContent="Cupom inválido ou expirado.",W.style.color="#ef4444");return}if(U.valorMinimo>0&&Q<U.valorMinimo){W&&(W.textContent=`Gasto mínimo de R$ ${U.valorMinimo.toFixed(2)} necessário.`,W.style.color="#ef4444");return}X=U;const te=fe(Q);W&&(W.textContent=`✓ Cupom aplicado! Desconto: R$ ${te.toFixed(2)}`,W.style.color="#10b981");const ie=document.getElementById("payment-order-summary");ie&&(ie.innerHTML=Se())},window.catToggleCoupon=()=>{const $=document.getElementById("cat-coupon-input-wrapper"),U=document.getElementById("cat-coupon-toggle-label");if($){const Q=$.style.display==="block";$.style.display=Q?"none":"block",U&&(U.textContent=Q?"Tenho um cupom de desconto":"Ocultar cupom")}},window.catFilterClassic=$=>{document.querySelectorAll(".cat-selector-item").forEach(Q=>{const W=Q.getAttribute("onclick")||"";Q.classList.toggle("active",W.includes("'"+$+"'"))});const U=document.getElementById("classic-promo-section");$==="all"?(U&&(U.style.display=m.length>0?"block":"none"),document.querySelectorAll("[data-classic-cat]").forEach(Q=>Q.style.display="block")):$==="promo"?(U&&(U.style.display="block"),document.querySelectorAll("[data-classic-cat]").forEach(Q=>Q.style.display="none")):(U&&(U.style.display="none"),document.querySelectorAll("[data-classic-cat]").forEach(Q=>{Q.style.display=Q.dataset.classicCat===$?"block":"none"}))},window.catFilterCat=$=>{document.querySelectorAll(".cat-sidebar-link").forEach(W=>{W.classList.remove("active"),W.setAttribute("aria-pressed","false")});const U=document.querySelector(`.cat-sidebar-link[onclick*="'${$}'"]`);U&&(U.classList.add("active"),U.setAttribute("aria-pressed","true"));const Q=$==="all";document.querySelectorAll("[data-catgroup]").forEach(W=>{W.style.display=Q||W.dataset.catgroup===$?"":"none"})},window.catSearch=$=>{$=$.trim().toLowerCase(),document.querySelectorAll("[data-catgroup]").forEach(U=>{U.style.display=""}),$&&document.querySelectorAll(".product-card").forEach(U=>{const Q=(U.querySelector("h3")?.textContent||"").toLowerCase();U.style.display=Q.includes($)?"":"none"})};const F=async($,U)=>{let Q=U.replace(/\D/g,"");Q.length===13&&Q.startsWith("55")&&(Q=Q.substring(2));const W=Q;let te=await V.getAll("leads",[{field:"empresaId",operator:"==",value:a.id},{field:"whatsapp",operator:"==",value:W}]);te.length===0&&(te=await V.getAll("leads",[{field:"empresaId",operator:"==",value:a.id},{field:"whatsapp",operator:"==",value:"55"+W}]));let ie=te[0];return ie||(ie=(await V.getAll("leads",[{field:"empresaId",operator:"==",value:a.id},{field:"telefone",operator:"==",value:W}]))[0]),ie?(ie.statusLead!=="cliente_ativo"&&await V.update("leads",ie.id,{statusLead:"cliente_ativo"}),ie.id):await V.create("leads",{nome:$,telefone:W,whatsapp:W,empresaId:a.id,lojaId:n,origem:"catalogo",statusLead:"cliente_ativo",criadoEm:new Date().toISOString()})};window.confirmOrderDelivery=async()=>{const $=document.getElementById("btn-pay-delivery");$&&($.disabled=!0,$.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Processando...');try{if(!pe()){$&&($.disabled=!1,$.innerHTML="🤝 Pagar na Entrega / Retirada"),window.showClosedAlert("store");return}const U=window.catDeliveryType;if(U==="entrega"&&!he()){$&&($.disabled=!1,$.innerHTML="🤝 Pagar na Entrega / Retirada"),window.showClosedAlert("delivery");return}const Q=window.catCustomer;if(!Q||!Q.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),He("payment-modal"),He("pix-manual-modal"),rt("customer-modal");return}const{name:W,phone:te,address:ie}=Q,we=Array.from(H.entries()).map(([Ze,{product:ot,qty:gt}])=>{const En=ot.promotionalActive&&ot.promotionalPrice||ot.price;return{productId:Ze,name:ot.name,qty:gt,price:En,subtotal:En*gt}});for(const[Ze,{qty:ot}]of Array.from(H.entries())){const gt=p.find(En=>En.id===Ze);gt&&gt.stock!=null&&await V.update("products",Ze,{stock:Math.max(0,gt.stock-ot)})}const Ue=ae(),We=de(),At=fe(Ue),mt=Ue+We-At,Vt=await F(W,te),Re=window.catDeliveryPaymentMethod,Lt=document.getElementById("cat-troco-input")?.value,kt=Re==="dinheiro"&&Lt?parseFloat(Lt):null,Ge=window.AUTOQUI_BACKEND_URL||"",De=await fetch(`${Ge}/orders/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyId:a.id,storeId:n,leadId:Vt,clientName:W,clientPhone:te,address:ie,bairro:Q.bairro||"",deliveryType:U,items:we,total:mt,taxaEntrega:We,taxaNome:oe(),desconto:At,cupom:X?.codigo||null,paymentMethod:"na_entrega",paymentSubMethod:Re,troco:kt})});if(!De.ok){const Ze=await De.json().catch(()=>({}));throw new Error(Ze.error||`Erro ${De.status} ao criar pedido`)}const{orderId:Be}=await De.json();H.clear(),X=null,He("payment-modal"),_e();const ze=document.getElementById("confirmation-modal"),Bt=document.getElementById("order-id-display"),Ct=document.getElementById("pix-info-section");ze&&(ze.style.display="flex"),Bt&&(Bt.textContent=Be.slice(0,8).toUpperCase()),Ct&&(Ct.style.display="none"),_e()}catch(U){console.error("Confirm Order Delivery Error:",U),alert("Erro ao processar pedido: "+(U.message||"Erro desconhecido")+". Por favor, tente novamente ou fale com a loja."),$&&($.disabled=!1,$.innerHTML="🤝 Pagar na Entrega / Retirada")}},window.showPixManual=()=>{He("payment-modal");const $=document.getElementById("pix-manual-summary");$&&($.innerHTML=Se());const U=document.getElementById("pix-key-value");U&&(U.textContent=E),rt("pix-manual-modal")},window.closePixManual=()=>He("pix-manual-modal"),window.copyPixKey=()=>{navigator.clipboard.writeText(E).then(()=>{const $=document.getElementById("btn-copy-pix");$&&($.textContent="✓ Copiado!",setTimeout(()=>{$.textContent="Copiar"},2e3))})},window.confirmPixManual=async()=>{const $=document.getElementById("btn-confirm-pix-manual");$&&($.disabled=!0,$.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Confirmando...');try{if(!pe()){$&&($.disabled=!1,$.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX'),window.showClosedAlert("store");return}const U=window.catDeliveryType;if(U==="entrega"&&!he()){$&&($.disabled=!1,$.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX'),window.showClosedAlert("delivery");return}const Q=window.catCustomer;if(!Q||!Q.phone){alert("Seus dados de contato não foram salvos ou foram perdidos. Por favor, preencha novamente."),He("payment-modal"),He("pix-manual-modal"),rt("customer-modal");return}const{name:W,phone:te,address:ie}=Q,we=Array.from(H.entries()).map(([Ct,{product:Ze,qty:ot}])=>{const gt=Ze.promotionalActive&&Ze.promotionalPrice||Ze.price;return{productId:Ct,name:Ze.name,qty:ot,price:gt,subtotal:gt*ot}});let Ue="";const We=document.getElementById("pix-comprovante-input");if(We?.files?.[0]){const Ct=We.files[0],Ze=Date.now(),ot=`comprovantes/${a.id}/${Ze}_${Ct.name}`,gt=fn(gn,ot);await Ua(gt,Ct),Ue=await ma(gt)}for(const[Ct,{qty:Ze}]of Array.from(H.entries())){const ot=p.find(gt=>gt.id===Ct);ot&&ot.stock!=null&&await V.update("products",Ct,{stock:Math.max(0,ot.stock-Ze)})}const At=ae(),mt=de(),Vt=fe(At),Re=At+mt-Vt,Lt=await F(W,te),kt=window.AUTOQUI_BACKEND_URL||"",Ge=await fetch(`${kt}/orders/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyId:a.id,storeId:n,leadId:Lt,clientName:W,clientPhone:te,address:ie,bairro:Q.bairro||"",deliveryType:U,items:we,total:Re,taxaEntrega:mt,taxaNome:oe(),desconto:Vt,cupom:X?.codigo||null,paymentMethod:"pix_manual",comprovanteUrl:Ue||null})});if(!Ge.ok){const Ct=await Ge.json().catch(()=>({}));throw new Error(Ct.error||`Erro ${Ge.status} ao criar pedido`)}const{orderId:De}=await Ge.json();H.clear(),X=null,He("pix-manual-modal"),_e();const Be=document.getElementById("confirmation-modal"),ze=document.getElementById("order-id-display");Be&&(Be.style.display="flex"),ze&&(ze.textContent=De.slice(0,8).toUpperCase());const Bt=document.getElementById("pix-info-section");Bt&&(Bt.style.display="none"),_e()}catch(U){console.error("Confirm Pix Manual Error:",U),alert("Erro ao confirmar pedido: "+(U.message||"Erro de conexão/permissão")+". Tente novamente."),$&&($.disabled=!1,$.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}},window.confirmPixMercadoPago=async()=>{const $=document.getElementById("btn-pay-pix-mp");$&&($.disabled=!0,$.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Gerando PIX...');try{if(!pe()){$&&($.disabled=!1,$.innerHTML="⚡ Pagar via Mercado Pago (PIX)"),window.showClosedAlert("store");return}const U=window.catDeliveryType;if(U==="entrega"&&!he()){$&&($.disabled=!1,$.innerHTML="⚡ Pagar via Mercado Pago (PIX)"),window.showClosedAlert("delivery");return}const{name:Q,phone:W,address:te}=window.catCustomer,ie=Array.from(H.entries()).map(([De,{product:Be,qty:ze}])=>{const Bt=Be.promotionalActive&&Be.promotionalPrice||Be.price;return{productId:De,name:Be.name,qty:ze,price:Bt,subtotal:Bt*ze}}),we=ae(),Ue=de(),We=fe(we),At=we+Ue-We;for(const[De,{qty:Be}]of Array.from(H.entries())){const ze=p.find(Bt=>Bt.id===De);ze&&ze.stock!=null&&await V.update("products",De,{stock:Math.max(0,ze.stock-Be)})}const mt=window.AUTOQUI_BACKEND_URL||"",Vt=await F(Q,W),Re=await fetch(`${mt}/orders/create`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyId:a.id,storeId:n,leadId:Vt,clientName:Q,clientPhone:W,address:te,bairro:window.catCustomer?.bairro||"",deliveryType:U,items:ie,total:At,taxaEntrega:Ue,taxaNome:oe(),desconto:We,cupom:X?.codigo||null,paymentMethod:"pix_mercadopago"})});if(!Re.ok){const De=await Re.json().catch(()=>({}));throw new Error(De.error||`Erro ${Re.status} ao criar pedido`)}const{orderId:Lt}=await Re.json(),kt=await fetch(`${mt}/plans/pix-order`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:Lt,companyId:a.id,storeId:n,items:ie,total:At,clientName:Q})}),Ge=kt.ok?await kt.json():null;if(H.clear(),X=null,He("payment-modal"),_e(),Ge?.qrCodeBase64||Ge?.qrCodeText){const De=document.getElementById("mp-qr-img"),Be=document.getElementById("mp-qr-code"),ze=document.getElementById("mp-pix-summary");De&&Ge.qrCodeBase64&&(De.src=`data:image/png;base64,${Ge.qrCodeBase64}`,De.style.display="block"),Be&&Ge.qrCodeText&&(Be.textContent=Ge.qrCodeText,window._mpQrCodeText=Ge.qrCodeText),ze&&(ze.innerHTML=Se()),rt("mp-pix-modal")}else{const De=document.getElementById("confirmation-modal"),Be=document.getElementById("order-id-display");De&&(De.style.display="flex"),Be&&(Be.textContent=Lt.slice(0,8).toUpperCase())}_e()}catch(U){console.error("Confirm Pix MP Error:",U),alert("Erro ao gerar PIX Mercado Pago: "+(U.message||"Erro de resposta")+". Tente novamente."),$&&($.disabled=!1,$.innerHTML="⚡ Pagar via Mercado Pago (PIX)")}},window.closeMpPix=()=>He("mp-pix-modal"),window.copyMpQrCode=()=>{const $=window._mpQrCodeText||"";navigator.clipboard.writeText($).then(()=>{const U=document.getElementById("btn-copy-mp-qr");U&&(U.textContent="✓ Copiado!",setTimeout(()=>{U.textContent="Copiar código"},2e3))})},window.previewComprovante=$=>{const U=document.getElementById("comprovante-preview"),Q=document.getElementById("comprovante-label");if($.files?.[0]){const W=new FileReader;W.onload=te=>{U&&(U.src=te.target?.result,U.style.display="block"),Q&&(Q.textContent=$.files[0].name)},W.readAsDataURL($.files[0])}}}const It=(F,$=!1)=>{const U=$&&F.promotionalName||F.name,Q=$&&F.promotionalPrice||F.price,W=$?F.price:null,te=F.stock===0;return r?`
                <div class="product-card" style="${te?"opacity:0.6;":""}">
                    <div class="card-image">
                        <img src="${z(F)}" alt="${U}" loading="lazy">
                        ${$?'<div class="promo-tag">OFERTA</div>':""}
                        ${te?'<div class="promo-tag" style="background:#ef4444;left:15px;right:auto;">ESGOTADO</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${U}</h3>
                        ${s.includes("agendamento")&&F.observation?`<p style="font-size:0.8rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${F.observation}</p>`:""}
                        <div class="price-container">
                            <span class="price">R$ ${Q?.toFixed(2)}</span>
                            ${W?`<span class="original-price">R$ ${W.toFixed(2)}</span>`:""}
                        </div>
                        ${F.stock!=null&&!te&&F.stock<=10?`<p style="font-size:0.75rem;color:#eab308;margin:6px 0 0;">⚠️ Apenas ${F.stock} restante${F.stock!==1?"s":""}</p>`:""}
                        <button id="btn-add-${F.id}" onclick="window.catAddToCart('${F.id}')" ${te?"disabled":""}
                            style="margin-top:12px;width:100%;padding:10px;border-radius:10px;background:${te?"rgba(255,255,255,0.05)":"var(--primary-cat)"};color:${te?"#94a3b8":"white"};border:none;cursor:${te?"not-allowed":"pointer"};font-weight:700;font-size:0.9rem;transition:all 0.2s;">
                            ${te?"Esgotado":"+ Adicionar"}
                        </button>
                    </div>
                </div>`:`
                <div class="product-card">
                    <div class="card-image">
                        <img src="${z(F)}" alt="${U}" loading="lazy">
                        ${$?'<div class="promo-tag">OFERTA</div>':""}
                    </div>
                    <div class="card-info">
                        <h3>${U}</h3>
                        ${s.includes("agendamento")&&F.observation?`<p style="font-size:0.8rem;color:#94a3b8;margin:4px 0 8px;line-height:1.4;">${F.observation}</p>`:""}
                        <div class="price-container">
                            <span class="price">R$ ${Q?.toFixed(2)}</span>
                            ${W?`<span class="original-price">R$ ${W.toFixed(2)}</span>`:""}
                        </div>
                    </div>
                </div>`},pt="display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.75);align-items:center;justify-content:center;backdrop-filter:blur(4px);color:white;overflow-y:auto;padding:16px 0;",tt="background:#1e293b;border-radius:24px;width:92%;max-width:460px;padding:28px;max-height:90vh;overflow-y:auto;box-sizing:border-box;",Qt=(F,$)=>`
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:10px;">${F}</h3>
                <button onclick="${$}" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>`,na=(F,$,U,Q="")=>`<button id="${F}" onclick="${$}" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;font-size:1rem;${Q}">${U}</button>`,ei=r?`
            <!-- CART MODAL -->
            <div id="cart-modal" style="${pt}align-items:flex-end;padding:0;">
                <div style="background:#1e293b;border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:85vh;display:flex;flex-direction:column;padding:24px;overflow:hidden;">
                    ${Qt('<i class="fa-solid fa-cart-shopping"></i> Meu Carrinho',"window.closeCart()")}
                    <div id="cart-items" style="flex:1;overflow-y:auto;min-height:80px;"></div>
                    <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;margin-top:16px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                            <span style="font-weight:700;">Total</span>
                            <span id="cart-total" style="font-size:1.3rem;font-weight:800;color:#6366f1;">R$ 0,00</span>
                        </div>
                        ${na("btn-go-delivery","window.goToDelivery()",'<i class="fa-solid fa-arrow-right"></i> Finalizar Pedido')}
                    </div>
                </div>
            </div>

            <!-- DELIVERY MODAL -->
            <div id="delivery-modal" style="${pt}align-items:flex-start;">
                <div style="${tt}">
                    ${Qt('<i class="fa-solid fa-box"></i> Como deseja receber?',"window.closeDelivery()")}
                    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
                        <div id="delivery-card-entrega" class="delivery-card" ${se!==!1&&L.length>0?`onclick="window.selectDelivery('entrega')"`:""} style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);${se!==!1&&L.length>0?"cursor:pointer;":"opacity:0.5;cursor:not-allowed;"}display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-truck" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Entrega</p>
                                <p style="margin:4px 0 0;color:${se!==!1&&L.length>0?"#94a3b8":"#ef4444"};font-size:0.85rem;">${se!==!1&&L.length>0?"Receber no endereço informado":"Entrega indisponível no momento"}</p>
                            </div>
                        </div>
                        <div id="delivery-card-retirada" class="delivery-card" onclick="window.selectDelivery('retirada')" style="padding:18px;border-radius:16px;border:2px solid rgba(255,255,255,0.1);cursor:pointer;display:flex;align-items:center;gap:16px;transition:all 0.2s;">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fa-solid fa-store" style="font-size:1.3rem;color:#6366f1;"></i>
                            </div>
                            <div>
                                <p style="margin:0;font-weight:700;font-size:1rem;">Retirada na Loja</p>
                                <p style="margin:4px 0 0;color:#94a3b8;font-size:0.85rem;">Buscar pessoalmente no estabelecimento</p>
                            </div>
                        </div>
                    </div>
                    ${na("btn-go-customer","window.goToCustomer()",'<i class="fa-solid fa-arrow-right"></i> Continuar',"opacity:0.4;cursor:not-allowed;")}
                </div>
            </div>

            <!-- CUSTOMER MODAL -->
            <div id="customer-modal" style="${pt}align-items:flex-start;">
                <div style="${tt}">
                    ${Qt('<i class="fa-solid fa-user"></i> Seus Dados',"window.closeCustomer()")}
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Nome Completo</label>
                        <input id="checkout-name" type="text" placeholder="Seu nome" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">WhatsApp</label>
                        <input id="checkout-phone" type="tel" placeholder="(11) 99999-9999" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    <div id="address-group" style="display:none;margin-bottom:16px;">
                        ${L.length>0?`
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Bairro</label>
                        <div id="bairro-input-wrapper" style="position:relative;margin-bottom:12px;">
                            <input type="text" id="checkout-bairro" placeholder="Digite ou selecione seu bairro..." autocomplete="off" oninput="window.catFilterBairros(this.value)" onfocus="window.catFilterBairros(this.value)" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;outline:none;">
                            <div id="checkout-bairro-dropdown" style="display:none;position:absolute;top:100%;left:0;right:0;max-height:160px;overflow-y:auto;background:#1e293b;border:1px solid rgba(255,255,255,0.1);border-radius:10px;z-index:9999;box-shadow:0 4px 15px rgba(0,0,0,0.5);margin-top:4px;"></div>
                        </div>
                        `:""}
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:6px;">Endereço Completo</label>
                        <input id="checkout-address" type="text" placeholder="Rua, número, complemento" style="width:100%;padding:12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.95rem;box-sizing:border-box;">
                    </div>
                    ${na("btn-go-payment","window.goToPayment()","Escolher Pagamento →","margin-top:8px;")}
                </div>
            </div>

            <!-- PAYMENT MODAL -->
            <div id="payment-modal" style="${pt}align-items:flex-start;">
                <div style="${tt}">
                    ${Qt('<i class="fa-solid fa-credit-card"></i> Forma de Pagamento',"window.closePayment()")}
                    <div id="payment-order-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:14px;font-size:0.9rem;"></div>
                    
                    <div id="mandatory-pay-msg" style="display:none;padding:12px;background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.2);border-radius:12px;margin-bottom:14px;color:#fbbf24;font-size:0.85rem;line-height:1.4;">
                        <i class="fa-solid fa-circle-info"></i> Atenção: Para pedidos para retirada é obrigatório o pagamento adiantado pois o produto vai ser reservado.
                    </div>

                    <div id="cat-coupon-section" style="display:none;margin-bottom:16px;">
                        <button onclick="window.catToggleCoupon()" style="background:none;border:none;color:#6366f1;font-size:0.85rem;font-weight:600;cursor:pointer;padding:4px 0;display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                            <i class="fa-solid fa-tag" aria-hidden="true"></i>
                            <span id="cat-coupon-toggle-label">Tenho um cupom de desconto</span>
                        </button>
                        <div id="cat-coupon-input-wrapper" style="display:none;">
                            <div style="display:flex;gap:8px;">
                                <input id="cat-coupon-input" type="text" placeholder="Código do cupom" aria-label="Código do cupom" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:white;font-size:0.9rem;text-transform:uppercase;">
                                <button onclick="window.catApplyCoupon()" style="padding:10px 16px;background:rgba(99,102,241,0.2);color:#6366f1;border:1px solid rgba(99,102,241,0.3);border-radius:10px;cursor:pointer;font-weight:700;white-space:nowrap;" aria-label="Aplicar cupom"><i class="fa-solid fa-check" aria-hidden="true"></i> Aplicar</button>
                            </div>
                            <p id="cat-coupon-msg" style="font-size:0.8rem;margin:4px 0 0;min-height:16px;" aria-live="polite"></p>
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:12px;">
                        <button id="btn-pay-delivery" onclick="window.catToggleDeliveryOptions()"
                            style="padding:16px;border-radius:14px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;display:flex;align-items:center;gap:12px;">
                            <i class="fa-solid fa-handshake" style="font-size:1.2rem;"></i> <span>Pagar na Entrega / Retirada</span>
                        </button>
                        
                        <div id="delivery-payment-details" style="display:none;margin-top:-4px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;flex-direction:column;gap:12px;animation: fadeInDown 0.3s ease;">
                            <p style="margin:0;font-size:0.8rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Escolha como pagar:</p>
                            <div style="display:flex;gap:10px;">
                                <button onclick="window.catSelectDeliverySubMethod('dinheiro')" id="btn-sub-dinheiro" class="btn-sub-method" style="flex:1;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;">
                                    <i class="fa-solid fa-money-bill-1" style="margin-right:6px;"></i> Dinheiro
                                </button>
                                <button onclick="window.catSelectDeliverySubMethod('cartao')" id="btn-sub-cartao" class="btn-sub-method" style="flex:1;padding:12px;border-radius:10px;background:rgba(255,255,255,0.05);color:white;border:1px solid rgba(255,255,255,0.1);cursor:pointer;font-size:0.9rem;font-weight:600;transition:all 0.2s;">
                                    <i class="fa-solid fa-credit-card" style="margin-right:6px;"></i> Cartão
                                </button>
                            </div>
                            <div id="troco-wrapper" style="display:none;padding:12px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
                                <label style="display:block;font-size:0.75rem;color:#94a3b8;margin-bottom:8px;font-weight:600;">Precisa de troco para quanto?</label>
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span style="color:#94a3b8;font-weight:700;">R$</span>
                                    <input type="number" id="cat-troco-input" placeholder="Ex: 50,00" style="flex:1;padding:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:white;font-size:1rem;font-weight:700;outline:none;">
                                </div>
                            </div>
                            <button id="btn-confirm-delivery-sub" onclick="window.confirmOrderDelivery()" disabled style="opacity:0.5;margin-top:4px;padding:14px;border-radius:12px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:800;font-size:1rem;transition:all 0.2s;box-shadow:0 4px 12px rgba(99,102,241,0.3);">
                                <i class="fa-solid fa-check" style="margin-right:8px;"></i> Confirmar Pedido
                            </button>
                        </div>
                        <button id="btn-pay-pix-manual" onclick="window.showPixManual()"
                            style="display:${E?"flex":"none"};padding:16px;border-radius:14px;background:rgba(16,185,129,0.08);color:#10b981;border:1px solid rgba(16,185,129,0.2);cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-brands fa-pix" style="font-size:1.2rem;"></i> <span>PIX Manual</span>
                        </button>
                        <button id="btn-pay-pix-mp" onclick="window.confirmPixMercadoPago()"
                            style="display:${M?"flex":"none"};padding:16px;border-radius:14px;background:#009ee3;color:white;border:none;cursor:pointer;font-weight:700;font-size:0.95rem;text-align:left;align-items:center;gap:12px;">
                            <i class="fa-solid fa-credit-card" style="font-size:1.2rem;"></i> <span>Pagar via Mercado Pago (PIX)</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- PIX MANUAL MODAL -->
            <div id="pix-manual-modal" style="${pt}align-items:flex-start;">
                <div style="${tt}">
                    ${Qt('<i class="fa-brands fa-pix"></i> Pagamento via PIX',"window.closePixManual()")}
                    <div id="pix-manual-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:14px;padding:16px;margin-bottom:16px;">
                        <p style="margin:0 0 6px;font-weight:700;font-size:0.9rem;color:#10b981;"><i class="fa-brands fa-pix"></i> Chave PIX:</p>
                        <p id="pix-key-value" style="margin:0 0 12px;font-family:monospace;font-size:1rem;color:white;word-break:break-all;"></p>
                        <button id="btn-copy-pix" onclick="window.copyPixKey()" style="padding:8px 16px;border-radius:8px;background:rgba(16,185,129,0.2);color:#10b981;border:1px solid rgba(16,185,129,0.3);cursor:pointer;font-weight:700;font-size:0.85rem;">Copiar</button>
                    </div>
                    <div style="margin-bottom:16px;">
                        <label style="display:block;font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;margin-bottom:8px;"><i class="fa-solid fa-receipt"></i> Comprovante de Pagamento <span style="color:#94a3b8;font-weight:400;">(opcional)</span></label>
                        <div onclick="document.getElementById('pix-comprovante-input').click()" style="border:2px dashed rgba(255,255,255,0.15);border-radius:12px;padding:18px;text-align:center;cursor:pointer;transition:all 0.2s;" 
                             onmouseover="this.style.borderColor='#6366f1'" onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'">
                            <input type="file" id="pix-comprovante-input" accept="image/*,application/pdf" style="display:none;" onchange="window.previewComprovante(this)">
                            <img id="comprovante-preview" style="max-width:100%;max-height:140px;border-radius:8px;display:none;margin:0 auto 8px;">
                            <i class="fa-solid fa-cloud-arrow-up" style="font-size:1.5rem;color:#6366f1;display:block;margin-bottom:6px;"></i>
                            <p id="comprovante-label" style="margin:0;font-size:0.85rem;color:#94a3b8;">Clique para anexar o comprovante</p>
                        </div>
                    </div>
                    ${na("btn-confirm-pix-manual","window.confirmPixManual()",'<i class="fa-solid fa-check"></i> Confirmar Pagamento PIX')}
                </div>
            </div>

            <!-- MERCADO PAGO PIX MODAL -->
            <div id="mp-pix-modal" style="${pt}align-items:flex-start;">
                <div style="${tt}">
                    ${Qt('<i class="fa-solid fa-qrcode"></i> PIX — Mercado Pago',"window.closeMpPix()")}
                    <div id="mp-pix-summary" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;margin-bottom:16px;font-size:0.9rem;"></div>
                    <div style="text-align:center;margin-bottom:16px;">
                        <img id="mp-qr-img" style="width:180px;height:180px;border-radius:12px;background:white;padding:8px;display:none;margin:0 auto 12px;">
                        <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:12px;">Ou copie o código abaixo:</p>
                        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;margin-bottom:10px;">
                            <p id="mp-qr-code" style="margin:0;font-family:monospace;font-size:0.75rem;color:#94a3b8;word-break:break-all;max-height:80px;overflow-y:auto;"></p>
                        </div>
                        <button id="btn-copy-mp-qr" onclick="window.copyMpQrCode()" style="padding:10px 20px;border-radius:10px;background:rgba(0,158,227,0.15);color:#009ee3;border:1px solid rgba(0,158,227,0.3);cursor:pointer;font-weight:700;font-size:0.9rem;">Copiar código</button>
                    </div>
                    <p style="text-align:center;color:#94a3b8;font-size:0.8rem;">Após o pagamento, seu pedido será processado automaticamente.</p>
                </div>
            </div>

            <!-- CONFIRMATION MODAL -->
            <div id="confirmation-modal" style="${pt}">
                <div style="${tt}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(16,185,129,0.15);border:2px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-circle-check" style="font-size:2.5rem;color:#10b981;"></i>
                    </div>
                    <h2 style="margin:0 0 10px;font-size:1.4rem;font-weight:800;">Pedido Confirmado!</h2>
                    <p style="color:#94a3b8;margin-bottom:20px;">Seu pedido foi recebido com sucesso.</p>
                    <div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;">Número do Pedido</span>
                        <p id="order-id-display" style="margin:6px 0 0;font-size:1.5rem;font-weight:800;letter-spacing:3px;color:#6366f1;">#000000</p>
                    </div>
                    <div id="pix-info-section" style="display:none;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:16px;margin-bottom:20px;text-align:left;">
                        <p style="margin:0 0 8px;font-weight:700;">⚡ Chave PIX para pagamento:</p>
                        <p id="pix-key-display" style="margin:0;font-family:monospace;font-size:1rem;color:#10b981;word-break:break-all;"></p>
                    </div>
                    <button onclick="document.getElementById('confirmation-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:#6366f1;color:white;border:none;cursor:pointer;font-weight:700;">
                        Continuar Comprando
                    </button>
                </div>
            </div>

            <!-- INFO MODAL -->
            <div id="store-info-modal" style="${pt}">
                <div style="${tt}max-width:500px;">
                    ${Qt('<i class="fa-solid fa-circle-info"></i> Informações da Loja',"window.closeStoreInfo()")}
                    <div style="padding:10px 0;">
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-regular fa-clock"></i> Horário de Funcionamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:8px 16px;margin-bottom:20px;font-size:0.9rem;">
                            ${be()}
                        </div>
                        <h4 style="margin:0 0 10px;color:#6366f1;"><i class="fa-solid fa-credit-card"></i> Formas de Pagamento</h4>
                        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:12px;font-size:0.9rem;display:flex;flex-wrap:wrap;gap:8px;">
                            <span class="badge info" style="background:rgba(59,130,246,0.1);color:#60a5fa;border:1px solid rgba(59,130,246,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-money-bill"></i> Na Entrega/Retirada</span>
                            ${E?'<span class="badge success" style="background:rgba(16,185,129,0.1);color:#4ade80;border:1px solid rgba(16,185,129,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-brands fa-pix"></i> PIX</span>':""}
                            ${M?'<span class="badge primary" style="background:rgba(99,102,241,0.1);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:4px 8px;border-radius:6px;font-size:0.8rem;"><i class="fa-solid fa-credit-card"></i> Mercado Pago</span>':""}
                        </div>
                    </div>
                </div>
            </div>

            <!-- CLOSED ALERT MODAL -->
            <div id="closed-alert-modal" style="${pt}z-index:9999;">
                <div style="${tt}text-align:center;">
                    <div style="width:72px;height:72px;border-radius:50%;background:rgba(239,68,68,0.15);border:2px solid rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                        <i class="fa-solid fa-store-slash" id="closed-alert-icon" style="font-size:2.5rem;color:#ef4444;"></i>
                    </div>
                    <h2 id="closed-alert-title" style="margin:0 0 10px;font-size:1.4rem;font-weight:800;color:white;">Loja Fechada</h2>
                    <p id="closed-alert-desc" style="color:#94a3b8;margin-bottom:20px;">No momento não estamos aceitando pedidos.</p>
                    <div id="closed-alert-time-section" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;margin-bottom:20px;">
                        <span style="font-size:0.8rem;color:#94a3b8;text-transform:uppercase;font-weight:700;"><i class="fa-regular fa-clock"></i> Voltamos</span>
                        <p id="next-open-time" style="margin:6px 0 0;font-size:1.2rem;font-weight:800;color:#6366f1;"></p>
                    </div>
                    <button onclick="document.getElementById('closed-alert-modal').style.display='none'" style="width:100%;padding:14px;border-radius:14px;background:rgba(255,255,255,0.1);color:white;border:none;cursor:pointer;font-weight:700;transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        Entendi
                    </button>
                </div>
            </div>

            <!-- FLOATING CART BUTTON -->
            <button id="cart-float-btn" onclick="window.openCart()" style="display:none;" class="cart-float-btn">
                <div class="cart-float-left">
                    <i class="fa-solid fa-bag-shopping" style="font-size:1.2rem;"></i>
                    <span id="cart-badge-float" class="cart-badge-float">0</span>
                </div>
                <div class="cart-float-center">Ver sacola</div>
                <div class="cart-float-right" id="cart-total-float">R$ 0,00</div>
            </button>
        `:"";return setTimeout(()=>{H.size>0&&typeof _e=="function"&&_e()},100),`
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
                :root {
                    --primary-cat: ${x};
                    --primary-glow: ${x}4D;
                    --bg: ${v};
                    --card-bg: rgba(255,255,255,0.03);
                    --glass: rgba(255,255,255,0.05);
                    --text: ${P};
                    --text-muted: #94a3b8;
                    --price-cat: ${N};
                    --product-bg: ${g.productBgColor||"rgba(255,255,255,0.05)"};
                }
                @keyframes fadeInDown { from { opacity:0;transform:translateY(-30px); } to { opacity:1;transform:translateY(0); } }
                @keyframes pulse-soft { 0%{box-shadow:0 0 0 0 var(--primary-glow);} 70%{box-shadow:0 0 0 15px transparent;} 100%{box-shadow:0 0 0 0 transparent;} }
                .catalog-body { background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;min-height:100vh;margin:0;padding-bottom:80px;overflow-x:hidden; }
                .header { position:relative;padding:80px 20px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;animation:fadeInDown 0.8s cubic-bezier(0.2,0.8,0.2,1);overflow:hidden; }
                .header-glass { display:none; }
                .store-logo-wrapper { position:relative;z-index:1;padding:6px;background:linear-gradient(135deg,rgba(255,255,255,0.2),transparent);border-radius:50%;box-shadow:0 20px 40px rgba(0,0,0,0.3); }
                .store-logo { width:120px;height:120px;object-fit:cover;border-radius:50%;background:#fff;display:block;border:2px solid rgba(255,255,255,0.1); }
                .status-badge { z-index:1;display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:100px;color:#10b981;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;animation:pulse-soft 2s infinite; }
                .header h1 { z-index:1;font-size:2.4rem;font-weight:800;margin:0 0 8px;letter-spacing:-1px;color:var(--text); }
                .header-address { z-index:1;color:var(--text-muted);font-size:0.95rem;margin:0 0 12px;max-width:400px;line-height:1.4;opacity:0.9; }
                .store-info-btn { z-index:1;font-size:0.9rem;margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:6px;color:var(--primary-cat);cursor:pointer;font-weight:700;background:var(--primary-glow);padding:6px 16px;border-radius:100px;transition:0.2s; }
                .store-status-card { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:12px 20px;display:flex;flex-direction:column;gap:6px;font-size:0.9rem;color:var(--text);min-width:260px;backdrop-filter:blur(10px);z-index:1; }

                /* MODERNO THEME HDR */
                .cat-moderno-header { background: var(--bg); color: var(--text); border-bottom: 2px solid transparent; border-image: linear-gradient(to right, var(--primary-cat) 0%, transparent 100%) 1; }
                .cat-search-bar-top-container { padding: 16px 20px; background: rgba(0,0,0,0.02); }
                .cat-search-bar-wrap { display:flex; align-items:center; background:var(--bg); border-radius:12px; padding:0 16px; border:2px solid var(--primary-cat); max-width:1200px; margin:0 auto; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
                .cat-search-bar-wrap i { color:var(--primary-cat); font-size:1.1rem; }
                .cat-search-bar-wrap input { flex:1; border:none; background:transparent; padding:16px; font-size:1.05rem; outline:none; color:var(--text); font-family:'Outfit',sans-serif; }
                .cat-search-bar-wrap input::placeholder { color:var(--text-muted); }
                .cat-moderno-banner-hero { width: 100%; height: 220px; overflow: hidden; position: relative; }
                .cat-moderno-banner-hero img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-banner-hero .cat-banner-fallback { width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary-cat), rgba(0,0,0,0.2)); display:flex; align-items:center; justify-content:center; font-size:4rem; color:rgba(255,255,255,0.3); }
                .cat-moderno-info { max-width: 1200px; margin: 0 auto; padding: 0 20px 24px; position: relative; }
                .cat-moderno-logo-wrap { width: 110px; height: 110px; border-radius: 50%; border: 4px solid #ffffff; background: #ffffff; position: relative; margin-top: -55px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); overflow: hidden; }
                .cat-moderno-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
                .cat-moderno-logo-wrap .fallback-logo { width:100%; height:100%; background:var(--primary-glow); display:flex; align-items:center; justify-content:center; }
                .cat-moderno-info h1 { font-size: 2rem; font-weight: 800; margin: 0 0 8px; color: var(--text); }
                .cat-moderno-address { font-size: 0.95rem; color: var(--text-muted); margin: 0 0 12px; font-weight: 500; }
                .moderno-more-info { color: var(--primary-cat); font-weight: 700; cursor: pointer; text-decoration: none; opacity: 0.8; transition: 0.2s; }
                .moderno-more-info:hover { opacity: 1; }
                .cat-moderno-status-row { display: flex; align-items: center; gap: 4px; font-size: 0.95rem; flex-wrap: wrap; font-weight: 600; color: var(--text); }


                .section-container { position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:0 20px; }
                .section-title { display:flex;align-items:center;gap:15px;margin:60px 0 30px 0; }
                .section-title span { font-size:1.8rem;font-weight:700;letter-spacing:-0.5px;color:var(--text); }
                .section-title .line { flex:1;height:1px;background:linear-gradient(to right,var(--primary-cat),transparent);opacity:0.3; }
                .section-title i { width:48px;height:48px;background:var(--glass);border:1px solid rgba(255,255,255,0.08);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--primary-cat);font-size:1.2rem;box-shadow:0 10px 20px rgba(0,0,0,0.1); }
                .product-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:30px; }
                .product-card { background:var(--product-bg);border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover { transform:translateY(-8px) scale(1.01);border-color:var(--primary-cat);box-shadow:0 20px 40px -10px rgba(0,0,0,0.4),0 0 20px var(--primary-glow); }
                .card-image { position:relative;aspect-ratio:1/1;overflow:hidden; }
                .card-image img { width:100%;height:100%;object-fit:cover;transition:transform 0.6s cubic-bezier(0.2,0.8,0.2,1); }
                .product-card:hover .card-image img { transform:scale(1.1); }
                .promo-tag { position:absolute;top:15px;right:15px;background:var(--primary-cat);color:white;padding:6px 14px;border-radius:12px;font-size:0.75rem;font-weight:800;box-shadow:0 8px 20px var(--primary-glow); }
                .card-info { padding:20px; }
                .card-info h3 { margin:0 0 12px 0;font-size:1.1rem;font-weight:700;color:var(--text);line-height:1.3; }
                .price-container { display:flex;align-items:center;gap:12px; }
                .price { font-size:1.3rem;font-weight:800;color:var(--price-cat); }
                .original-price { font-size:0.9rem;color:var(--text-muted);text-decoration:line-through;opacity:0.6; }
                .whatsapp-float { position:fixed;bottom:30px;right:30px;background:#25d366;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;display:flex;align-items:center;gap:12px;font-weight:700;box-shadow:0 10px 25px rgba(37,211,102,0.4);z-index:7999;transition:all 0.3s;animation:fadeInDown 0.8s backwards 1s;white-space:nowrap;max-width:calc(100vw - 40px); }
                .whatsapp-float:hover { transform:scale(1.05) translateY(-5px); }
                .whatsapp-float i { font-size:1.5rem; }
                .delivery-card:hover { border-color: var(--primary-cat) !important; background: rgba(255,255,255,0.03); }
                /* Cat search/sidebar (Moderno theme) */
                .cart-float-btn { position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:var(--primary-cat);color:white;border:none;padding:14px 24px;border-radius:100px;font-weight:700;font-size:1rem;cursor:pointer;z-index:8000;align-items:center;justify-content:space-between;box-shadow:0 10px 30px rgba(0,0,0,0.3);width:fit-content;min-width:320px;display:none; transition:transform 0.2s; }
                .cart-float-btn:hover { transform:translateX(-50%) scale(1.02); }
                .cart-float-left { display:flex;align-items:center;gap:8px; }
                .cart-badge-float { background:white;color:var(--primary-cat);border-radius:100px;padding:2px 8px;font-size:0.75rem;font-weight:800; display:inline-block; line-height:1; }
                .cart-float-center { font-weight:700; }
                .cart-float-right { font-weight:700; }
                @media(max-width:600px) {
                    .cart-float-btn { bottom:0;left:0;transform:none;width:100%;border-radius:0;min-width:unset;padding:18px 24px;box-shadow:0 -5px 20px rgba(0,0,0,0.4); }
                    .cart-float-btn:hover { transform:none; }
                }
                .cat-search-bar { display:block;width:100%;padding:14px 18px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:100px;color:var(--text);font-size:1rem;font-family:'Outfit',sans-serif;box-sizing:border-box;outline:none;margin-bottom:24px;transition:border-color .2s; }
                .cat-search-bar:focus { border-color:var(--primary-cat); }
                .cat-search-bar::placeholder { color:#64748b; }
                .cat-sidebar { display:flex;flex-direction:column;gap:4px; }
                .cat-sidebar-link { display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;color:#94a3b8;cursor:pointer;font-size:0.92rem;font-weight:600;border:none;background:none;width:100%;text-align:left;transition:all .15s; }
                .cat-sidebar-link:hover,.cat-sidebar-link.active { background:rgba(99,102,241,.15);color:var(--text); }
                .cat-sidebar-link i { width:18px;text-align:center;color:var(--primary-cat); }
                .cat-modern-layout { display:grid;grid-template-columns:200px 1fr;gap:28px;max-width:1200px;margin:0 auto;padding:0 20px 80px; }
                /* Banner hero */
                .cat-banner-hero { width:100%;max-height:340px;overflow:hidden;position:relative; }
                .cat-banner-hero img { width:100%;height:100%;object-fit:cover;display:block; }
                .cat-banner-fallback { width:100%;height:180px;background:linear-gradient(135deg,var(--primary-cat),rgba(168,85,247,0.8));display:flex;align-items:center;justify-content:center; }
                /* Accessibility */
                *:focus-visible { outline:3px solid var(--primary-cat);outline-offset:2px; }
                @media(prefers-reduced-motion:reduce){ *,::before,::after { animation-duration:.01ms!important;transition-duration:.01ms!important; } }
                /* iFood Style Selector */
                .cat-selector-wrapper { margin: 24px 0 40px; }
                .cat-selector-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 12px; scrollbar-width: none; -ms-overflow-style: none; }
                .cat-selector-scroll::-webkit-scrollbar { display: none; }
                .cat-selector-item { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; border: none; background: none; padding: 0; outline: none; transition: transform 0.2s; }
                .cat-selector-item:hover { transform: translateY(-3px); }
                .cat-selector-icon-wrap { width: 64px; height: 64px; border-radius: 18px; background: var(--glass); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content:center; color: var(--primary-cat); font-size: 1.4rem; transition: all 0.3s; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
                .cat-selector-item.active .cat-selector-icon-wrap { background: var(--primary-cat); color: white; border-color: var(--primary-cat); box-shadow: 0 10px 20px var(--primary-glow); }
                .cat-selector-label { font-size: 0.82rem; font-weight: 600; color: var(--text); opacity: 0.8; transition: opacity 0.3s; white-space: nowrap; }
                .cat-selector-item.active .cat-selector-label { opacity: 1; color: var(--primary-cat); }
                .promo-highlight { color: #fbbf24 !important; text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
                .section-title.promo i { background: rgba(251, 191, 36, 0.15); border-color: rgba(251, 191, 36, 0.3); color: #fbbf24; }
                .section-container-cat { animation: fadeInDown 0.5s ease backwards; }
                @media(max-width:768px){ 
                    .cat-modern-layout { grid-template-columns:1fr; gap:16px; } 
                    .cat-sidebar-sticky { display:block; position:-webkit-sticky; position:sticky; top:0; height:auto; z-index:10; background:var(--bg); padding-top:10px; margin:-10px -20px 0; width:100vw; } 
                    .cat-sidebar { display:flex; flex-direction:row; flex-wrap:nowrap; overflow-x:auto; padding:0 20px 10px; scrollbar-width:none; -ms-overflow-style:none; gap:8px; width:100%; }
                    .cat-sidebar::-webkit-scrollbar { display:none; }
                    .cat-sidebar-link { flex:0 0 auto; white-space:nowrap; width:auto; padding:8px 16px; border:1px solid rgba(255,255,255,0.1); display:inline-flex; align-items:center; }
                    .cat-sidebar-sticky p { display:none; }
                }
                @media(max-width:600px){
                    .header{padding:60px 20px 30px;} .header h1{font-size:2rem;letter-spacing:-.5px;} 
                    .store-logo{width:80px;height:80px;} .product-grid{grid-template-columns:repeat(2,1fr);gap:12px;}
                    .section-container{padding:0 14px;} .section-title{margin:36px 0 16px;}
                    .section-title span{font-size:1.3rem;} .section-title i{width:36px;height:36px;font-size:0.9rem;}
                    .card-info{padding:12px;} .card-info h3{font-size:0.88rem;} .price{font-size:0.95rem;}
                    .whatsapp-float{bottom:16px;right:16px;padding:10px 14px;font-size:0.85rem;}
                    .cat-banner-hero{max-height:160px;}
                }
                @media(max-width:380px){ .whatsapp-float{padding:12px;border-radius:50%;right:12px;bottom:12px;} .whatsapp-float span{display:none;} }
            </style>

            <div class="catalog-body">
                ${y!=="moderno"?`
                <header class="header">
                    <div class="header-glass"></div>
                    <div class="status-badge"><i class="fa-solid fa-circle" style="font-size:6px;"></i> Loja Online</div>
                    ${O?`<div class="store-logo-wrapper"><img src="${O}" alt="${i.name}" class="store-logo"></div>`:'<div style="width:90px;height:90px;border-radius:50%;background:var(--primary-glow);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                    <h1>${i.name}</h1>
                    <p class="header-address"><i class="fa-solid fa-location-dot" style="margin-right:4px;opacity:0.7;"></i> ${i.address||"Endereço não cadastrado"}</p>
                    
                    <div class="store-info-btn" onclick="window.openStoreInfo()">
                        Mais informações <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;margin-left:4px;"></i>
                    </div>

                    <div class="store-status-card">
                        <div style="font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;">
                            ${ut()}
                        </div>
                        ${ve?`
                        <div style="height:1px;background:rgba(255,255,255,0.05);margin:2px 0;"></div>
                        <div style="color:var(--text-muted);display:flex;align-items:center;justify-content:center;gap:6px;">
                            <i class="fa-solid fa-motorcycle"></i> ${se!==!1?"Entrega e Retirada":"Apenas Retirada"}
                        </div>
                        `:""}
                    </div>
                </header>
                `:""}

                ${y==="banner"?`
                    <!-- Banner hero -->
                    ${b||w?`
                        <div class="cat-banner-hero" aria-label="Banner da loja">
                            <picture>
                                ${w?`<source media="(max-width:600px)" srcset="${w}">`:""}
                                <img src="${b||w}" alt="Banner ${i.name}">
                            </picture>
                        </div>`:`
                        <div class="cat-banner-fallback" aria-hidden="true">
                            <i class="fa-solid fa-store" style="font-size:3rem;color:rgba(255,255,255,0.3);"></i>
                        </div>`}
                    <main class="section-container" style="padding-top:20px;">
                        ${m.length>0?`<div class="section-title"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" role="list">${m.map(F=>It(F,!0)).join("")}</div>`:""}
                        ${C.map(F=>`<div class="section-title"><i class="fa-solid ${F.icon||"fa-tag"}" aria-hidden="true"></i><span>${F.name}</span><div class="line"></div></div><div class="product-grid" role="list">${F.products.map($=>It($,!1)).join("")}</div>`).join("")}
                        ${h.length>0?`<div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" role="list">${h.map(F=>It(F,!1)).join("")}</div>`:""}
                        ${p.length===0?'<div style="text-align:center;padding:80px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>

                `:y==="moderno"?`
                    <!-- Moderno layout: sidebar + search + new header -->
                    <div class="cat-moderno-header">
                        <div class="cat-search-bar-top-container">
                            <div class="cat-search-bar-wrap">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="search" id="cat-search-bar-top" placeholder="Buscar no catálogo" aria-label="Buscar produto" oninput="window.catSearch(this.value)">
                            </div>
                        </div>
                        
                        <div class="cat-moderno-banner-hero">
                            ${b||w?`
                            <picture>
                                ${w?`<source media="(max-width:600px)" srcset="${w}">`:""}
                                <img src="${b||w}" alt="Banner ${i.name}">
                            </picture>
                            `:`
                            <div class="cat-banner-fallback">
                                <i class="fa-solid fa-store"></i>
                            </div>
                            `}
                        </div>

                        <div class="cat-moderno-info">
                            <div class="cat-moderno-logo-wrap">
                                ${O?`<img src="${O}" alt="${i.name}">`:'<div class="fallback-logo"><i class="fa-solid fa-store" style="font-size:2rem;color:var(--primary-cat);"></i></div>'}
                            </div>
                            <h1>${i.name}</h1>
                            <p class="cat-moderno-address">
                                ${i.address||"Endereço não cadastrado"} <span style="margin:0 8px;">•</span> <span class="moderno-more-info" onclick="window.openStoreInfo()">Mais informações</span>
                            </p>
                            <div class="cat-moderno-status-row">
                                ${ut()} 
                                ${ve?`<span class="badge" style="background:rgba(148,163,184,0.1);color:#475569;border:1px solid rgba(148,163,184,0.2);margin-left:8px;font-size:0.8rem;padding:4px 10px;border-radius:6px;font-weight:700;">${se!==!1?"Entrega e Retirada":"Apenas Retirada"}</span>`:""}
                            </div>
                        </div>
                    </div>

                    <div class="cat-modern-layout" style="padding-top:20px;">
                        <aside class="cat-sidebar-sticky" style="position:sticky;top:20px;height:fit-content;" aria-label="Categorias">
                            <p style="font-size:0.7rem;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:700;margin:0 0 10px 14px;">Categorias</p>
                            <nav class="cat-sidebar">
                                <button class="cat-sidebar-link active" onclick="window.catFilterCat('all')" aria-pressed="true">
                                    <i class="fa-solid fa-th-large" aria-hidden="true"></i> Todos
                                </button>
                                ${m.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('promo')"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i> Ofertas</button>`:""}
                                ${C.map(F=>`<button class="cat-sidebar-link" onclick="window.catFilterCat('${F.id}')"><i class="fa-solid ${F.icon||"fa-tag"}" aria-hidden="true"></i> ${F.name}</button>`).join("")}
                                ${h.length>0?`<button class="cat-sidebar-link" onclick="window.catFilterCat('outros')"><i class="fa-solid fa-box" aria-hidden="true"></i> Outros</button>`:""}
                            </nav>
                        </aside>
                        <div>
                            <div id="cat-moderno-content">
                                ${m.length>0?`<div class="section-title" data-catgroup="promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span>Ofertas do Dia</span><div class="line"></div></div><div class="product-grid" data-catgroup="promo" role="list">${m.map(F=>It(F,!0)).join("")}</div>`:""}
                                ${C.map(F=>`<div class="section-title" data-catgroup="${F.id}"><i class="fa-solid ${F.icon||"fa-tag"}" aria-hidden="true"></i><span>${F.name}</span><div class="line"></div></div><div class="product-grid" data-catgroup="${F.id}" role="list">${F.products.map($=>It($,!1)).join("")}</div>`).join("")}
                                ${h.length>0?`<div class="section-title" data-catgroup="outros"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div><div class="product-grid" data-catgroup="outros" role="list">${h.map(F=>It(F,!1)).join("")}</div>`:""}
                                ${p.length===0?'<div style="text-align:center;padding:80px 20px;color:#64748b;"><i class="fa-solid fa-box-open" style="font-size:3rem;opacity:.3;display:block;margin-bottom:16px;"></i><p>Nenhum produto disponível.</p></div>':""}
                            </div>
                        </div>
                    </div>
                `:`
                    <!-- Clássico (default) -->
                    <main class="section-container">
                        <div style="margin-top:20px;">
                            <input type="search" class="cat-search-bar" placeholder="O que você procura hoje?" oninput="window.catSearch(this.value)">
                        </div>
                        <div class="cat-selector-wrapper">
                            <div class="cat-selector-scroll">
                                <button class="cat-selector-item active" onclick="window.catFilterClassic('all')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-th-large"></i></div>
                                    <span class="cat-selector-label">Todos</span>
                                </button>
                                ${m.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('promo')">
                                    <div class="cat-selector-icon-wrap" style="color:#fbbf24;"><i class="fa-solid fa-bolt-lightning"></i></div>
                                    <span class="cat-selector-label">Ofertas</span>
                                </button>`:""}
                                ${C.map(F=>`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('${F.id}')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid ${F.icon||"fa-tag"}"></i></div>
                                    <span class="cat-selector-label">${F.name}</span>
                                </button>`).join("")}
                                ${h.length>0?`
                                <button class="cat-selector-item" onclick="window.catFilterClassic('outros')">
                                    <div class="cat-selector-icon-wrap"><i class="fa-solid fa-box"></i></div>
                                    <span class="cat-selector-label">Outros</span>
                                </button>`:""}
                            </div>
                        </div>

                        <div id="classic-promo-section" style="${m.length>0?"":"display:none;"}">
                            <div class="section-title promo"><i class="fa-solid fa-bolt-lightning" aria-hidden="true"></i><span class="promo-highlight">Ofertas do Dia</span><div class="line" style="background:linear-gradient(to right,#fbbf24,transparent);"></div></div>
                            <div class="product-grid" role="list">${m.map(F=>It(F,!0)).join("")}</div>
                        </div>

                        <div id="classic-categories-container">
                            ${C.map(F=>`
                                <div class="section-container-cat" data-classic-cat="${F.id}">
                                    <div class="section-title"><i class="fa-solid ${F.icon||"fa-tag"}" aria-hidden="true"></i><span>${F.name}</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${F.products.map($=>It($,!1)).join("")}</div>
                                </div>
                            `).join("")}
                            ${h.length>0?`
                                <div class="section-container-cat" data-classic-cat="outros">
                                    <div class="section-title"><i class="fa-solid fa-box" aria-hidden="true"></i><span>Outros</span><div class="line"></div></div>
                                    <div class="product-grid" role="list">${h.map(F=>It(F,!1)).join("")}</div>
                                </div>
                            `:""}
                        </div>

                        ${p.length===0?'<div style="text-align:center;padding:100px 20px;color:var(--text-muted);"><i class="fa-solid fa-box-open" style="font-size:4rem;opacity:0.3;display:block;margin-bottom:20px;"></i><p>Nenhum produto disponível no momento.</p></div>':""}
                    </main>
                `}

                ${R?`
                    <a href="https://wa.me/${R}" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Falar conosco via WhatsApp">
                        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i><span>Falar conosco</span>
                    </a>`:""}

                ${ei}
            </div>
        `}catch(e){return console.error("Catalog Error:",e),"<p>Erro ao carregar catálogo.</p>"}},pu=async n=>(setTimeout(()=>{const e=document.getElementById("remote-qrcode"),t=document.getElementById("qr-content-active"),a=document.getElementById("qr-content-success");if(!e)return;let i=null,s=null;const r=()=>{i&&clearInterval(i),s&&clearInterval(s)},l=async()=>{try{const v=await(await fetch(`${Ut}/instance/connect/${n}`,{headers:{apikey:jt}})).json();if(v&&(v.base64||v.qrcode?.base64)){const P=v.base64||v.qrcode.base64;e.innerHTML=`<img src="${P}" style="width: 250px; height: 250px; display: block; border-radius: 8px;">`}else{const N=await(await fetch(`${Ut}/instance/connectionState/${n}`,{headers:{apikey:jt}})).json();(N.instance?.state==="open"||N.state==="open")&&u()}}catch(x){console.error("Error fetching QR:",x)}},c=async()=>{try{const v=await(await fetch(`${Ut}/instance/connectionState/${n}`,{headers:{apikey:jt}})).json();(v.instance?.state==="open"||v.state==="open")&&u()}catch(x){console.error("Error checking status:",x)}},u=()=>{r(),t&&(t.style.display="none"),a&&(a.style.display="flex")};l(),i=setInterval(l,4e4),s=setInterval(c,3e3);const g=setInterval(()=>{document.getElementById("remote-qrcode")||(r(),clearInterval(g))},1e3)},100),`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
            
            :root {
                --primary: #6366f1;
                --primary-glow: rgba(99, 102, 241, 0.3);
                --bg: #0f172a;
                --glass: rgba(255, 255, 255, 0.05);
                --text: #ffffff;
                --text-muted: #94a3b8;
            }

            .qr-body {
                background: var(--bg);
                color: var(--text);
                font-family: 'Outfit', sans-serif;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                background-image: 
                    radial-gradient(circle at 0% 0%, var(--primary-glow) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, var(--primary-glow) 0%, transparent 40%);
            }

            .qr-card {
                background: var(--glass);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 32px;
                padding: 3rem;
                width: 100%;
                max-width: 480px;
                text-align: center;
                box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                animation: scaleUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            }

            @keyframes scaleUp {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }

            .qr-icon {
                font-size: 3rem;
                margin-bottom: 1.5rem;
                color: var(--primary);
                display: inline-block;
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; letter-spacing: -1px; }
            p { color: var(--text-muted); margin-bottom: 2.5rem; line-height: 1.6; }

            .qrcode-container {
                background: white;
                padding: 20px;
                border-radius: 20px;
                display: inline-block;
                margin-bottom: 2.5rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                min-width: 250px;
                min-height: 250px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .status-indicator {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 0.9rem;
                font-weight: 600;
                color: var(--text-muted);
            }

            .pulse {
                width: 8px;
                height: 8px;
                background: var(--primary);
                border-radius: 50%;
                display: inline-block;
                box-shadow: 0 0 0 var(--primary-glow);
                animation: pulse-ring 1.5s infinite;
            }

            @keyframes pulse-ring {
                0% { transform: scale(0.95); box-shadow: 0 0 0 0 var(--primary-glow); }
                70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
                100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
            }

            .success-message {
                display: none;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .success-icon {
                width: 80px;
                height: 80px;
                background: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 2.5rem;
                margin-bottom: 1rem;
                box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
            }
        </style>

        <div class="qr-body">
            <div class="qr-card">
                <div id="qr-content-active">
                    <div class="qr-icon"><i class="fa-solid fa-qrcode"></i></div>
                    <h1>Conectar WhatsApp</h1>
                    <p>Escaneie o QR Code abaixo com o seu WhatsApp para ativar a integração.</p>
                    
                    <div class="qrcode-container" id="remote-qrcode">
                        <i class="fa-solid fa-spinner fa-spin fa-3x" style="color: var(--bg);"></i>
                    </div>

                    <div class="status-indicator">
                        <span class="pulse"></span>
                        Aguardando leitura do QR Code...
                    </div>
                </div>

                <div id="qr-content-success" class="success-message">
                    <div class="success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h1 style="color: #10b981;">Conectado!</h1>
                    <p>O WhatsApp foi vinculado com sucesso. Você já pode fechar esta página.</p>
                </div>
            </div>
        </div>
    `),q_=[{key:"pedido_aceito_entrega_pago",label:"Pedido aceito (Entrega pagamento adiantado)",icon:"fa-check-circle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado (Pagamento Adiantado). 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_entrega_pendente",label:"Pedido aceito (Entrega pagamento na entrega)",icon:"fa-motorcycle",default:`Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi aceito e já está sendo preparado. O pagamento será feito na entrega. 

📦 Itens: {{lista_produtos}}
💰 Total: R$ {{valor_total}}`},{key:"pedido_aceito_retirada",label:"Pedido Aceito (Retirada)",icon:"fa-store",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} aceito para retirada. Valor: R$ {{valor_total}}. Aguardamos você!"},{key:"pagamento_confirmado",label:"Pagamento Confirmado",icon:"fa-credit-card",default:"Olá {{nome_lead}}! Pagamento do pedido #{{numero_pedido}} confirmado. Já estamos preparando!"},{key:"pedido_pronto",label:"Pedido Pronto (Retirada)",icon:"fa-box",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} está pronto para retirada!"},{key:"saiu_para_entrega",label:"Saiu para Entrega",icon:"fa-truck",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} saiu para entrega: {{endereco_entrega}}"},{key:"pedido_entregue",label:"Pedido Entregue / Finalizado",icon:"fa-flag-checkered",default:"Olá {{nome_lead}}! Pedido #{{numero_pedido}} finalizado. Obrigado pela preferência!"},{key:"pedido_cancelado",label:"Pedido Cancelado",icon:"fa-xmark",default:"Olá {{nome_lead}}! Seu pedido #{{numero_pedido}} foi cancelado."},{key:"pedido_recebido",label:"Pedido Recebido (Aguardando Aprovação)",icon:"fa-clock",default:"Olá {{nome_lead}}! Recebemos seu pedido #{{numero_pedido}}. Estamos revisando e já te informamos o status! ⏳"}],H_=[{key:"{{nome_lead}}",label:"Nome do cliente",icon:"fa-user"},{key:"{{numero_pedido}}",label:"Nº do pedido",icon:"fa-hashtag"},{key:"{{lista_produtos}}",label:"Lista de produtos",icon:"fa-basket-shopping"},{key:"{{valor_total}}",label:"Valor total",icon:"fa-money-bill"},{key:"{{endereco_entrega}}",label:"Endereço de entrega",icon:"fa-location-dot"},{key:"{{forma_pagamento}}",label:"Forma de pagamento",icon:"fa-credit-card"}],Jr=[{key:"seg",label:"Segunda-feira"},{key:"ter",label:"Terça-feira"},{key:"qua",label:"Quarta-feira"},{key:"qui",label:"Quinta-feira"},{key:"sex",label:"Sexta-feira"},{key:"sab",label:"Sábado"},{key:"dom",label:"Domingo"}],W_=async()=>{const n=Ae.getCurrentUser();if(!n||!n.companyId)return"<p>Acesso negado.</p>";const e=n.companyId,t=await V.get("companies",e);let a=t?.stores||[];const i=!!t?.mercadoPagoToken;if(n.role!=="owner"){const O=n.storeIds||(n.storeId?[n.storeId]:[]);a=a.filter(E=>O.includes(E.id))}if(a.length===0)return'<p style="padding:2rem;">Nenhuma loja disponível para configuração.</p>';const s=await V.getAll("instancias",{field:"empresaId",operator:"==",value:e}),r=await V.getAll("loja_config",{field:"empresaId",operator:"==",value:e});let l=a[0].id;const c=O=>r.find(E=>E.lojaId===O)||null,u=()=>`
        <div class="store-tabs" style="display:flex; gap:10px; margin-bottom:20px; overflow-x:auto;">
            ${a.map(O=>`
                <button class="btn-store-tab ${O.id===l?"active":""}" data-id="${O.id}" style="
                    padding: 0.5rem 1rem;
                    background: ${O.id===l?"var(--primary)":"var(--surface-hover)"};
                    color: ${O.id===l?"#fff":"var(--text-main)"};
                    border: 1px solid ${O.id===l?"var(--primary)":"var(--border-color)"};
                    border-radius: 8px; cursor: pointer; white-space: nowrap;
                ">
                    <i class="fa-solid fa-store" style="margin-right:5px;"></i> ${O.name}
                </button>
            `).join("")}
        </div>`,g=()=>H_.map(O=>`
        <div class="var-chip" draggable="true" data-var="${O.key}" title="Clique para copiar">
            <i class="fa-solid ${O.icon}"></i>
            <span>${O.label}</span>
            <code>${O.key}</code>
        </div>
    `).join("");return setTimeout(()=>{x(),v()},100),`
        <style>
            .config-section-title {
                font-size: 1.1rem; font-weight: 700; color: var(--text-main);
                display: flex; align-items: center; gap: 10px;
                margin-bottom: 1.25rem; padding-bottom: 0.75rem;
                border-bottom: 1px solid var(--border-color);
            }
            .config-select {
                width: 100%; padding: 0.75rem 1rem;
                background-color: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                appearance: none; cursor: pointer;
                transition: border-color .2s;
            }
            .config-select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input {
                width: 100%; padding: 0.75rem 1rem;
                background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                color: var(--text-main); font-size: 0.9rem;
                box-sizing: border-box; transition: border-color .2s;
                height: 44px;
            }
            .config-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 2px rgba(99,102,241,.15); }
            .config-input::placeholder { color: var(--text-dim); }
            .config-label {
                display: block; font-size: 0.75rem; font-weight: 700;
                color: var(--text-dim); text-transform: uppercase;
                letter-spacing: 0.05em; margin-bottom: 6px;
            }
            .cat-field-hint {
                font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;
            }
            .cat-field { margin-bottom: 1.25rem; }
            .theme-card-grid {
                display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 1.25rem;
            }
            @media(max-width:600px) { .theme-card-grid { grid-template-columns: 1fr; } }
            .theme-card {
                border: 2px solid var(--border-color); border-radius: 12px;
                padding: 14px; cursor: pointer; transition: all .2s;
                background: rgba(255,255,255,0.02);
            }
            .theme-card:hover { border-color: rgba(99,102,241,.5); background: rgba(99,102,241,.04); }
            .theme-card.active { border-color: var(--primary); background: rgba(99,102,241,.08); }
            .theme-card-preview {
                height: 72px; border-radius: 8px; margin-bottom: 8px;
                overflow: hidden; background: var(--surface-hover);
                display: flex; flex-direction: column; gap: 4px; padding: 6px;
            }
            .theme-card-name { font-size: 0.85rem; font-weight: 700; text-align: center; }
            .theme-card-desc { font-size: 0.75rem; color: var(--text-dim); text-align: center; margin-top: 2px; }
            .vars-grid {
                display: flex; flex-wrap: wrap; gap: 0.5rem;
                margin-bottom: 1.5rem; padding: 1rem;
                background: rgba(99,102,241,0.04);
                border: 1px dashed rgba(99,102,241,0.25);
                border-radius: var(--radius-md);
            }
            .var-chip {
                display: inline-flex; align-items: center; gap: 0.4rem;
                padding: 0.35rem 0.75rem;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.3);
                border-radius: 6px; font-size: 0.82rem;
                color: var(--primary); cursor: grab; user-select: none;
            }
            .var-chip code { font-size: 0.72rem; color: rgba(167,139,250,0.8); font-family: monospace; }
            .msg-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                overflow: hidden; margin-bottom: 1rem;
            }
            .msg-card-header {
                display: flex; align-items: center; gap: 0.6rem;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.025);
                border-bottom: 1px solid var(--border-color);
                font-weight: 600; font-size: 0.9rem;
            }
            .msg-editor-wrap { padding: 1rem; }
            .msg-textarea {
                width: 100%; background: var(--surface-hover);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm); color: var(--text-main);
                font-size: 0.9rem; padding: 0.75rem; resize: vertical;
                box-sizing: border-box; font-family: inherit;
            }
            .msg-textarea:focus { outline: none; border-color: var(--primary); }
            .msg-save-row {
                display: flex; align-items: center;
                justify-content: space-between; margin-top: 0.75rem;
            }
            .btn-save-msg {
                padding: 0.45rem 1rem; background: var(--primary);
                color: white; border: none; border-radius: var(--radius-sm);
                font-size: 0.85rem; font-weight: 600; cursor: pointer;
            }
            .btn-save-msg:hover { background: var(--primary-hover); }
            .btn-save-msg.saved { background: var(--success); pointer-events: none; }
            .horarios-grid { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }
            .horario-row {
                display: flex; align-items: center; justify-content: space-between;
                padding: 0.75rem 1rem;
                background: rgba(255,255,255,0.02);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md); transition: 0.2s;
            }
            .horario-row.inactive { opacity: 0.6; background: transparent; }
            .horario-info { display: flex; align-items: center; gap: 1rem; flex: 1; }
            .horario-label { font-weight: 600; min-width: 120px; }
            .horario-inputs { display: flex; align-items: center; gap: 0.5rem; transition: 0.3s; }
            .horario-inputs.hidden { display: none; }
            .time-input {
                background: var(--bg-color); border: 1px solid var(--border-color);
                color: white; padding: 0.4rem 0.6rem;
                border-radius: 6px; font-size: 0.85rem; outline: none;
            }
            .time-input:focus { border-color: var(--primary); }
            .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider {
                position: absolute; cursor: pointer;
                top: 0; left: 0; right: 0; bottom: 0;
                background-color: #333; transition: .4s; border-radius: 20px;
            }
            .slider:before {
                position: absolute; content: "";
                height: 14px; width: 14px; left: 3px; bottom: 3px;
                background-color: white; transition: .4s; border-radius: 50%;
            }
            input:checked + .slider { background-color: var(--primary); }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>

        <div class="page-header">
            <h2 class="page-title">Configuração do Catálogo</h2>
        </div>

        <div id="cat-tabs-container">
            ${u()}
        </div>

        <div id="cat-config-content-area"></div>
    `;function x(){const O=()=>{document.querySelectorAll(".btn-store-tab").forEach(E=>{E.addEventListener("click",()=>{l=E.dataset.id;const k=document.getElementById("cat-tabs-container");k&&(k.innerHTML=u(),O()),v()})})};O()}function v(){const O=document.getElementById("cat-config-content-area");if(!O)return;const E=c(l),k=E?.design||{},T=E?.mensagens_automaticas||{},S=`${window.location.origin}/catalog/${l}`,_=E?.instancia_id||a.find(p=>p.id===l)?.instancia_id||"",R=(p,m)=>{const y=E?.[m]||{};return Jr.map(b=>{const w=y[b.key]||{},C=w.ativo??w.aberto??b.key!=="dom",h=w.inicio||w.abertura||"08:00",z=w.fim||w.fechamento||"18:00";return`
                <div class="horario-row ${C?"":"inactive"}" id="${p}-row-${b.key}">
                    <div class="horario-info">
                        <label class="switch">
                            <input type="checkbox" class="${p}-toggle" data-dia="${b.key}" ${C?"checked":""}>
                            <span class="slider"></span>
                        </label>
                        <span class="horario-label">${b.label}</span>
                    </div>
                    <div class="horario-inputs ${C?"":"hidden"}" id="${p}-inputs-${b.key}">
                        <input type="time" class="time-input" id="${p}-open-${b.key}" value="${h}">
                        <span style="color:var(--text-dim);font-size:0.8rem;">até</span>
                        <input type="time" class="time-input" id="${p}-close-${b.key}" value="${z}">
                    </div>
                    <div class="status-label" id="${p}-status-${b.key}" style="font-size:0.8rem;color:${C?"var(--success)":"var(--text-dim)"};min-width:70px;text-align:right;">
                        ${C?"Aberto":"Fechado"}
                    </div>
                </div>`}).join("")},M=q_.map(p=>`
            <div class="msg-card" id="msg-card-${p.key}">
                <div class="msg-card-header">
                    <i class="fa-solid ${p.icon}" style="color:var(--primary);"></i>
                    <span>${p.label}</span>
                </div>
                <div class="msg-editor-wrap">
                    <textarea id="cat-msg-${p.key}" class="msg-textarea" rows="3"
                        placeholder="${p.default}" data-msg-key="${p.key}"
                    >${T[p.key]||""}</textarea>
                    <div class="msg-save-row">
                        <span style="font-size:0.75rem;color:var(--text-dim);">
                            <i class="fa-solid fa-circle-info"></i> Arraste as variáveis acima para o texto
                        </span>
                        <button class="btn-save-msg cat-save-single-msg" data-msg-key="${p.key}">
                            <i class="fa-solid fa-floppy-disk"></i> Salvar
                        </button>
                    </div>
                </div>
            </div>
        `).join("");O.innerHTML=`

            <!-- ── Link do catálogo ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-link" style="color:var(--primary);"></i> Link do Catálogo
                </div>
                <div style="display:flex;gap:10px;align-items:center;background:rgba(99,102,241,0.06);border:1px dashed rgba(99,102,241,0.3);border-radius:var(--radius-md);padding:0.75rem 1rem;">
                    <i class="fa-solid fa-store" style="color:var(--primary);"></i>
                    <input type="text" id="cat-link-display" value="${S}" readonly style="flex:1;background:transparent;border:none;color:var(--text-main);font-size:0.9rem;outline:none;">
                    <button class="btn-save-msg" id="btn-copy-cat-link"><i class="fa-solid fa-copy"></i> Copiar</button>
                    <a href="${S}" target="_blank" class="btn-secondary" style="padding:0.4rem 0.75rem;font-size:0.85rem;">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>

            <!-- ── Instância ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-brands fa-whatsapp" style="color:#25d366;"></i> Vinculação da Instância
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Selecione a instância de WhatsApp que enviará mensagens automáticas para esta loja.
                </p>
                <select id="cat-instance-select" class="config-select">
                    <option value="">-- Nenhuma instância --</option>
                    ${s.map(p=>`
                        <option value="${p.id}" ${p.id===_?"selected":""}>
                            ${p.nome} (${p.status})
                        </option>
                    `).join("")}
                </select>
                <div id="cat-instance-indicator" style="margin-top:10px;"></div>
            </div>

            <!-- ── Aparência ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-palette" style="color:var(--primary);"></i> Aparência e Redes Sociais
                </div>

                <!-- Meta Description -->
                <div class="cat-field">
                    <label class="config-label">Descrição para Compartilhamento</label>
                    <input type="text" id="cat-meta-description" value="${k.metaDescription||""}" class="config-input" placeholder="Ex: Melhores lanches da região. Peça agora!">
                    <p class="cat-field-hint">Texto que aparece quando você compartilha o link no WhatsApp/FB/Insta.</p>
                </div>

                <!-- Logo -->
                <div class="cat-field">
                    <label class="config-label">Logo da Loja</label>
                    <div style="display:flex;align-items:center;gap:16px;">
                        <div id="cat-logo-preview-wrapper" style="width:80px;height:80px;border-radius:12px;border:1px solid var(--border-color);display:flex;align-items:center;justify-content:center;background:var(--surface-hover);overflow:hidden;flex-shrink:0;">
                            ${k.logoUrl?`<img src="${k.logoUrl}" style="width:100%;height:100%;object-fit:contain;">`:'<i class="fa-solid fa-image fa-2x" style="color:var(--text-dim);"></i>'}
                        </div>
                        <div>
                            <input type="file" id="cat-logo-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary" onclick="document.getElementById('cat-logo-file').click()">
                                <i class="fa-solid fa-upload"></i> Escolher Logo
                            </button>
                            <p class="cat-field-hint" style="margin-top:6px;">Recomendado: 200×200px PNG/SVG transparente</p>
                        </div>
                    </div>
                </div>

                <!-- Cores -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor Principal</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-primary-color" value="${k.primaryColor||"#6366f1"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-primary-color-hex" value="${k.primaryColor||"#6366f1"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor de Fundo</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-secondary-color" value="${k.secondaryColor||"#0f172a"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-secondary-color-hex" value="${k.secondaryColor||"#0f172a"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:1.25rem;">
                    <div>
                        <label class="config-label">Cor do Texto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-text-color" value="${k.textColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-text-color-hex" value="${k.textColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Cor do Preço</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-price-color" value="${k.priceColor||"#ffffff"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-price-color-hex" value="${k.priceColor||"#ffffff"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                    <div>
                        <label class="config-label">Fundo do Produto</label>
                        <div style="display:flex;gap:8px;align-items:center;">
                            <input type="color" id="cat-product-bg-color" value="${k.productBgColor||"#1e293b"}" style="width:44px;height:44px;border:none;background:none;cursor:pointer;border-radius:8px;padding:0;">
                            <input type="text" id="cat-product-bg-color-hex" value="${k.productBgColor||"#1e293b"}" class="config-input" style="flex:1;">
                        </div>
                    </div>
                </div>

                <!-- Tema do catálogo -->
                <div class="cat-field">
                    <label class="config-label">Layout do Catálogo</label>
                    <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">Escolha a apresentação visual dos seus produtos.</p>
                    <div class="theme-card-grid" id="cat-theme-grid">

                        <!-- Clássico -->
                        <div class="theme-card ${(k.themeId||"classico")==="classico"?"active":""}" onclick="window.catSelectTheme('classico')">
                            <div class="theme-card-preview">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;height:100%;">
                                    ${["","","",""].map(()=>'<div style="background:rgba(99,102,241,.2);border-radius:4px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-th-large" style="margin-right:5px;"></i>Clássico</div>
                            <div class="theme-card-desc">Grade de produtos simples e direta</div>
                        </div>

                        <!-- Moderno -->
                        <div class="theme-card ${k.themeId==="moderno"?"active":""}" onclick="window.catSelectTheme('moderno')">
                            <div class="theme-card-preview" style="flex-direction:row;padding:4px;gap:4px;">
                                <div style="width:30%;background:rgba(99,102,241,.15);border-radius:4px;"></div>
                                <div style="flex:1;display:flex;flex-direction:column;gap:3px;">
                                    <div style="height:10px;background:rgba(255,255,255,.15);border-radius:3px;"></div>
                                    ${["","",""].map(()=>'<div style="height:16px;background:rgba(99,102,241,.12);border-radius:3px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-search" style="margin-right:5px;"></i>Moderno</div>
                            <div class="theme-card-desc">Sidebar de categorias + busca</div>
                        </div>

                        <!-- Banner -->
                        <div class="theme-card ${k.themeId==="banner"?"active":""}" onclick="window.catSelectTheme('banner')">
                            <div class="theme-card-preview" style="flex-direction:column;padding:4px;gap:3px;">
                                <div style="height:28px;background:linear-gradient(135deg,rgba(99,102,241,.4),rgba(168,85,247,.3));border-radius:4px;"></div>
                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;flex:1;">
                                    ${["","",""].map(()=>'<div style="background:rgba(99,102,241,.15);border-radius:3px;"></div>').join("")}
                                </div>
                            </div>
                            <div class="theme-card-name"><i class="fa-solid fa-image" style="margin-right:5px;"></i>Banner</div>
                            <div class="theme-card-desc">Hero banner + grade de produtos</div>
                        </div>
                    </div>
                    <input type="hidden" id="cat-theme-id" value="${k.themeId||"classico"}">
                </div>

                <!-- Banners (utilizado em temas Banner e Moderno) -->
                <div id="cat-banner-section" style="border-top:1px solid var(--border-color);padding-top:1rem;margin-bottom:1rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-images" style="color:var(--primary);"></i> Banners do Catálogo
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                        <div>
                            <label class="config-label">Banner Desktop</label>
                            <div id="banner-desktop-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${k.bannerUrl?`<img src="${k.bannerUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-panorama" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-desktop-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-desktop-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Desktop (1200×400)
                            </button>
                        </div>
                        <div>
                            <label class="config-label">Banner Mobile</label>
                            <div id="banner-mobile-preview" style="height:80px;border-radius:8px;border:1px dashed var(--border-color);display:flex;align-items:center;justify-content:center;margin-bottom:8px;background:var(--surface-hover);overflow:hidden;">
                                ${k.bannerMobileUrl?`<img src="${k.bannerMobileUrl}" style="width:100%;height:100%;object-fit:cover;">`:'<i class="fa-solid fa-mobile-screen" style="color:var(--text-dim);font-size:1.5rem;"></i>'}
                            </div>
                            <input type="file" id="cat-banner-mobile-file" accept="image/*" style="display:none;">
                            <button class="btn-secondary btn-sm" onclick="document.getElementById('cat-banner-mobile-file').click()" style="width:100%;">
                                <i class="fa-solid fa-upload"></i> Upload Mobile (600×300)
                            </button>
                        </div>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-aparencia">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Aparência
                    </button>
                </div>
            </div>

            <!-- ── Horário de Funcionamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-clock" style="color:var(--primary);"></i> Horário de Funcionamento
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina os dias e horários em que a loja aceita pedidos.
                </p>
                <div class="horarios-grid">
                    ${R("func","horario_funcionamento")}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-func">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários
                    </button>
                </div>
            </div>

            <!-- ── Horário de Entrega ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Horário de Entrega
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem;">
                    Defina especificamente em quais horários a loja realiza entregas.
                </p>
                <div class="horarios-grid">
                    ${R("entrega","horario_entrega")}
                </div>
                <div style="text-align:right;margin-top:1.5rem;">
                    <button class="btn-save-msg" id="btn-save-cat-entrega">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega
                    </button>
                </div>
            </div>

            <!-- ── Mensagens Automáticas ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-message" style="color:var(--primary);"></i> Mensagens Automáticas
                </div>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.25rem;">
                    Personalize as mensagens enviadas ao cliente em cada etapa do pedido via WhatsApp.
                </p>
                <div class="vars-grid" id="cat-vars-grid">
                    ${g()}
                </div>
                <div id="cat-msg-editors">
                    ${M}
                </div>
            </div>

            <!-- ── Pagamento ── -->
            <div class="card" style="margin-bottom:1.5rem;">
                <div class="config-section-title">
                    <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Pagamento
                </div>

                <div class="cat-field">
                    <label class="config-label">WhatsApp de Atendimento (DDD + 9 dígitos)</label>
                    <input type="text" id="cat-whatsapp" value="${k.whatsapp||""}" class="config-input" placeholder="Ex: 11999999999" maxlength="11">
                    <p class="cat-field-hint">Informe apenas o DDD e os 9 dígitos do número (não inclua o 55).</p>
                </div>

                <div class="cat-field">
                    <label class="config-label">Chave PIX (Manual)</label>
                    <input type="text" id="cat-pix-key" value="${k.pixKey||""}" class="config-input" placeholder="CPF, e-mail, telefone ou chave aleatória">
                    <p class="cat-field-hint">Exibida ao cliente ao escolher pagar via PIX manual.</p>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.25rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-truck" style="color:var(--primary);"></i> Taxas de Entrega por Bairro
                    </p>
                    <p style="font-size:0.8rem;color:var(--text-dim);margin-bottom:12px;">Defina o preço da entrega para cada bairro. Para aplicar o mesmo valor a múltiplos bairros, separe-os por vírgula (Ex: Centro, Vila Nova).</p>
                    <div style="display:grid;grid-template-columns:1fr 100px;gap:16px;margin-bottom:16px;align-items:end;">
                        <div class="field">
                            <label class="config-label">Bairro(s)</label>
                            <input type="text" id="new-bairro-nomes" class="config-input" placeholder="Ex: Centro, Jardim Floral">
                        </div>
                        <div class="field">
                            <label class="config-label">Valor (R$)</label>
                            <input type="number" id="new-bairro-preco" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-bairro">
                            <i class="fa-solid fa-plus"></i> Adicionar Bairro
                        </button>
                    </div>
                    <div id="bairros-list">
                        ${(E?.bairrosEntrega||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum bairro com entrega configurado.</p>':(E?.bairrosEntrega||[]).map((p,m)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;flex:1;">
                                        <span style="font-weight:600;color:var(--text-main);">${p.bairros}</span>
                                        <span style="font-size:0.85rem;color:var(--primary);font-weight:700;">R$ ${Number(p.preco).toFixed(2)}</span>
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteBairro(${m})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-credit-card" style="color:var(--primary);"></i> Mercado Pago (PIX Automático)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Ativar ou desativar pagamentos via Mercado Pago.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="mp-active-toggle" ${E?.mercadoPagoActive!==!1?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-store" style="color:var(--primary);"></i> Pagamento Antecipado (Retirada)
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Obrigar pagamento adiantado para pedidos de retirada.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="cat-mandatory-pickup-pay" ${E?.pagamentoObrigatorioRetirada?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.9rem;font-weight:700;margin:0 0 0.4rem;display:flex;align-items:center;gap:8px;">
                                <i class="fa-solid fa-ban" style="color:var(--primary);"></i> Desativar Pagamento na Entrega
                            </p>
                            <p style="margin:0;font-size:0.8rem;color:var(--text-dim);">Remove a opção de pagar no momento da entrega.</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="cat-disable-delivery-pay" ${E?.desativarPagamentoEntrega?"checked":""}>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <!-- Cupons de Desconto -->
                <div style="border-top:1px solid var(--border-color);padding-top:1.25rem;margin-bottom:1.5rem;">
                    <p style="font-size:0.9rem;font-weight:700;margin:0 0 1rem;display:flex;align-items:center;gap:8px;">
                        <i class="fa-solid fa-tag" style="color:var(--primary);"></i> Cupons de Desconto
                    </p>
                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:16px;align-items:end;">
                        <div>
                            <label class="config-label">Código do Cupom</label>
                            <input type="text" id="new-cupom-code" class="config-input" style="text-transform:uppercase;" placeholder="EX: DESCONTO10">
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 100px;gap:8px;">
                            <div>
                                <label class="config-label">Desconto</label>
                                <input type="number" id="new-cupom-valor" class="config-input" placeholder="10" min="0" step="0.01">
                            </div>
                            <div>
                                <label class="config-label">Tipo</label>
                                <select id="new-cupom-tipo" class="config-select" style="height:44px;">
                                    <option value="percent">%</option>
                                    <option value="fixo">R$</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="config-label">Gasto Mínimo (R$)</label>
                            <input type="number" id="new-cupom-min" class="config-input" placeholder="0.00" min="0" step="0.01">
                        </div>
                    </div>
                    <div style="text-align:right;margin-bottom:12px;">
                        <button class="btn-save-msg" id="btn-add-cupom">
                            <i class="fa-solid fa-plus"></i> Adicionar Cupom
                        </button>
                    </div>
                    <div id="cupons-list">
                        ${(E?.cupons||[]).length===0?'<p style="font-size:0.85rem;color:var(--text-dim);">Nenhum cupom cadastrado ainda.</p>':(E?.cupons||[]).map((p,m)=>`
                                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border-color);border-radius:8px;margin-bottom:6px;">
                                    <div style="display:flex;align-items:center;gap:12px;">
                                        <span style="font-family:monospace;font-weight:700;color:var(--primary);">${p.codigo}</span>
                                        <span class="badge ${p.ativo!==!1?"success":"warning"}">${p.ativo!==!1?"Ativo":"Inativo"}</span>
                                        <span style="font-size:0.8rem;color:var(--text-muted);">${p.tipo==="percent"?p.desconto+"%":"R$ "+Number(p.desconto).toFixed(2)} de desconto</span>
                                        ${p.valorMinimo>0?`<span style="font-size:0.75rem;color:var(--text-dim);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px;">Min: R$ ${p.valorMinimo.toFixed(2)}</span>`:""}
                                    </div>
                                    <button class="btn-danger btn-sm" onclick="window.catDeleteCupom(${m})" style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:6px;padding:4px 10px;cursor:pointer;">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            `).join("")}
                    </div>
                </div>

                <div style="padding:14px;border-radius:var(--radius-md);background:${i?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)"};border:1px solid ${i?"rgba(16,185,129,0.2)":"rgba(239,68,68,0.2)"};display:flex;align-items:center;gap:12px;margin-bottom:1.5rem;">
                    <i class="fa-solid ${i?"fa-circle-check":"fa-circle-xmark"}" style="color:${i?"#10b981":"#ef4444"};font-size:1.2rem;"></i>
                    <div>
                        <p style="margin:0;font-weight:600;font-size:0.9rem;">Mercado Pago</p>
                        <p style="margin:0;font-size:0.8rem;color:var(--text-muted);">
                            ${i?"Integração ativa — PIX via Mercado Pago disponível no catálogo.":'Não configurado. <a href="/mercado-pago" style="color:var(--primary);">Configurar agora →</a>'}
                        </p>
                    </div>
                </div>

                <div style="text-align:right;">
                    <button class="btn-save-msg" id="btn-save-cat-pagamento">
                        <i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento
                    </button>
                </div>
            </div>
        `,setTimeout(()=>{P()},50)}function P(O){const E=a;document.getElementById("btn-copy-cat-link")?.addEventListener("click",()=>{const _=document.getElementById("cat-link-display");_?.value&&navigator.clipboard.writeText(_.value).then(()=>D.success("Link copiado!"))});const k=(_,R)=>{const M=document.getElementById(_),p=document.getElementById(R);M?.addEventListener("input",()=>{p&&(p.value=M.value)}),p?.addEventListener("input",()=>{M&&(M.value=p.value)})};k("cat-primary-color","cat-primary-color-hex"),k("cat-secondary-color","cat-secondary-color-hex"),k("cat-text-color","cat-text-color-hex"),k("cat-price-color","cat-price-color-hex"),k("cat-product-bg-color","cat-product-bg-color-hex"),document.getElementById("cat-logo-file")?.addEventListener("change",_=>{const R=_.target.files?.[0];if(R){const M=new FileReader;M.onload=p=>{const m=document.getElementById("cat-logo-preview-wrapper");m&&(m.innerHTML=`<img src="${p.target?.result}" style="width:100%;height:100%;object-fit:contain;">`)},M.readAsDataURL(R)}}),document.getElementById("cat-instance-select")?.addEventListener("change",async _=>{const R=_.target.value,M=E.map(p=>p.id===l?{...p,instancia_id:R||null}:p);try{D.info("Salvando instância..."),await V.update("companies",e,{stores:M});const p=E.find(b=>b.id===l);p&&(p.instancia_id=R);const m=c(l);if(m)await V.update("loja_config",m.id,{instancia_id:R||null}),m.instancia_id=R;else{const b=await V.create("loja_config",{empresaId:e,lojaId:l,instancia_id:R||null});r.push({id:b,empresaId:e,lojaId:l,instancia_id:R})}const y=await V.getAll("instancias",{field:"lojaId",operator:"==",value:l});for(const b of y)await V.update("instancias",b.id,{lojaId:null,funcao:null});R&&await V.update("instancias",R,{lojaId:l,funcao:"Catálogo Vendas"}),D.success("Instância vinculada com sucesso!")}catch(p){D.error("Erro ao salvar instância."),console.error(p)}}),window.catSelectTheme=_=>{const R=document.getElementById("cat-theme-id");R&&(R.value=_),document.querySelectorAll(".theme-card").forEach(p=>p.classList.remove("active")),document.querySelectorAll(".theme-card").forEach(p=>{p.getAttribute("onclick")?.includes(`'${_}'`)&&p.classList.add("active")})};const T=(_,R)=>{document.getElementById(_)?.addEventListener("change",M=>{const p=M.target.files?.[0];if(p){const m=new FileReader;m.onload=y=>{const b=document.getElementById(R);b&&(b.innerHTML=`<img src="${y.target?.result}" style="width:100%;height:100%;object-fit:cover;">`)},m.readAsDataURL(p)}})};T("cat-banner-desktop-file","banner-desktop-preview"),T("cat-banner-mobile-file","banner-mobile-preview"),document.getElementById("btn-save-cat-aparencia")?.addEventListener("click",async()=>{const _=document.getElementById("btn-save-cat-aparencia");_.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const R=document.getElementById("cat-primary-color-hex").value,M=document.getElementById("cat-secondary-color-hex").value,p=document.getElementById("cat-text-color-hex").value,m=document.getElementById("cat-price-color-hex").value,y=document.getElementById("cat-product-bg-color-hex").value,b=document.getElementById("cat-theme-id")?.value||"classico",w=document.getElementById("cat-meta-description").value,C=document.getElementById("cat-logo-file").files?.[0],h=document.getElementById("cat-banner-desktop-file")?.files?.[0],z=document.getElementById("cat-banner-mobile-file")?.files?.[0],H=c(l);let A=H?.design?.logoUrl||"",L=H?.design?.bannerUrl||"",G=H?.design?.bannerMobileUrl||"";if(C){const J=fn(gn,`logos/${e}/${l}_logo`);await Ua(J,C),A=await ma(J)}if(h){const J=fn(gn,`banners/${e}/${l}_desktop`);await Ua(J,h),L=await ma(J)}if(z){const J=fn(gn,`banners/${e}/${l}_mobile`);await Ua(J,z),G=await ma(J)}const q={...H?.design||{},primaryColor:R,secondaryColor:M,textColor:p,priceColor:m,productBgColor:y,logoUrl:A,themeId:b,bannerUrl:L,bannerMobileUrl:G,metaDescription:w};await N({design:q}),D.success("Aparência salva!"),_.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',_.classList.add("saved"),setTimeout(()=>{_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência',_.classList.remove("saved")},2e3)}catch{D.error("Erro ao salvar aparência."),_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Aparência'}}),document.getElementById("btn-save-cat-func")?.addEventListener("click",async()=>{const _=document.getElementById("btn-save-cat-func");_.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const R={};Jr.forEach(({key:M})=>{const p=document.querySelector(`.func-toggle[data-dia="${M}"]`)?.checked,m=document.getElementById(`func-open-${M}`)?.value||"08:00",y=document.getElementById(`func-close-${M}`)?.value||"18:00";R[M]={ativo:p,inicio:m,fim:y}}),await N({horario_funcionamento:R}),D.success("Horários de funcionamento salvos!"),_.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',_.classList.add("saved"),setTimeout(()=>{_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários',_.classList.remove("saved")},2e3)}catch{D.error("Erro ao salvar horários."),_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários'}}),document.getElementById("btn-save-cat-entrega")?.addEventListener("click",async()=>{const _=document.getElementById("btn-save-cat-entrega");_.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const R={};Jr.forEach(({key:M})=>{const p=document.querySelector(`.entrega-toggle[data-dia="${M}"]`)?.checked,m=document.getElementById(`entrega-open-${M}`)?.value||"08:00",y=document.getElementById(`entrega-close-${M}`)?.value||"18:00";R[M]={ativo:p,inicio:m,fim:y}}),await N({horario_entrega:R}),D.success("Horários de entrega salvos!"),_.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',_.classList.add("saved"),setTimeout(()=>{_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega',_.classList.remove("saved")},2e3)}catch{D.error("Erro ao salvar horários de entrega."),_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Horários de Entrega'}}),document.querySelectorAll(".cat-save-single-msg").forEach(_=>{_.addEventListener("click",async()=>{const R=_.dataset.msgKey,M=document.getElementById(`cat-msg-${R}`)?.value||"",y={...c(l)?.mensagens_automaticas||{},[R]:M};try{_.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>',await N({mensagens_automaticas:y}),D.success("Mensagem salva!"),_.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',_.classList.add("saved"),setTimeout(()=>{_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar',_.classList.remove("saved")},2e3)}catch{D.error("Erro ao salvar mensagem."),_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar'}})}),document.querySelectorAll(".var-chip").forEach(_=>{_.addEventListener("dragstart",R=>{R.dataTransfer?.setData("text/plain",_.dataset.var||"")}),_.addEventListener("click",()=>{navigator.clipboard.writeText(_.dataset.var||"").then(()=>D.info("Variável copiada!"))})}),document.querySelectorAll(".msg-textarea").forEach(_=>{_.addEventListener("dragover",R=>R.preventDefault()),_.addEventListener("drop",R=>{R.preventDefault();const M=R.dataTransfer?.getData("text/plain")||"",p=_,m=p.selectionStart,y=p.selectionEnd;p.value=p.value.substring(0,m)+M+p.value.substring(y),p.selectionStart=p.selectionEnd=m+M.length,p.focus()})}),document.getElementById("btn-save-cat-pagamento")?.addEventListener("click",async()=>{const _=document.getElementById("btn-save-cat-pagamento");_.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';try{const R=c(l);let M=document.getElementById("cat-whatsapp").value.replace(/\D/g,"");if(M.length===13&&M.startsWith("55")&&(M=M.substring(2)),M&&M.length!==11){Dl.showPhoneError(),_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento';return}const p=document.getElementById("cat-pix-key").value.trim(),m=document.getElementById("mp-active-toggle")?.checked,y=document.getElementById("cat-mandatory-pickup-pay")?.checked,b=document.getElementById("cat-disable-delivery-pay")?.checked,w={...R?.design||{},whatsapp:M,pixKey:p};delete w.taxaFixaNome,delete w.taxaFixaValor,delete w.taxaTipo,await N({design:w,mercadoPagoActive:m,pagamentoObrigatorioRetirada:y,desativarPagamentoEntrega:b}),D.success("Configurações de pagamento salvas!"),_.innerHTML='<i class="fa-solid fa-check"></i> Salvo!',_.classList.add("saved"),setTimeout(()=>{_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento',_.classList.remove("saved")},2e3)}catch{D.error("Erro ao salvar pagamento."),_.innerHTML='<i class="fa-solid fa-floppy-disk"></i> Salvar Pagamento'}}),document.getElementById("btn-add-cupom")?.addEventListener("click",async()=>{const _=(document.getElementById("new-cupom-code").value||"").trim().toUpperCase(),R=parseFloat(document.getElementById("new-cupom-valor").value||"0"),M=document.getElementById("new-cupom-tipo").value||"percent",p=parseFloat(document.getElementById("new-cupom-min").value||"0")||0;if(!_||!R){D.error("Preencha código e valor do cupom.");return}const y=[...c(l)?.cupons||[],{codigo:_,desconto:R,tipo:M,valorMinimo:p,ativo:!0}];await N({cupons:y}),D.success(`Cupom ${_} adicionado!`),v()}),window.catDeleteCupom=async _=>{const M=[...c(l)?.cupons||[]].filter((p,m)=>m!==_);await N({cupons:M}),D.success("Cupom removido."),v()},document.getElementById("btn-add-bairro")?.addEventListener("click",async()=>{const _=(document.getElementById("new-bairro-nomes").value||"").trim(),R=document.getElementById("new-bairro-preco").value,M=parseFloat(R||"0");if(!_){D.error("Preencha os bairros.");return}if(!R){D.error("Preencha o valor da taxa para estes bairros.");return}const m=[...c(l)?.bairrosEntrega||[],{bairros:_,preco:M}];await N({bairrosEntrega:m}),D.success("Bairro(s) adicionado(s)!"),v()}),window.catDeleteBairro=async _=>{const M=[...c(l)?.bairrosEntrega||[]].filter((p,m)=>m!==_);await N({bairrosEntrega:M}),D.success("Bairro(s) removido(s)."),v()};const S=(_,R,M,p)=>{document.querySelectorAll(`.${_}`).forEach(m=>{m.addEventListener("change",()=>{const y=m.dataset.dia,b=m.checked;document.getElementById(`${R}-row-${y}`)?.classList.toggle("inactive",!b),document.getElementById(`${R}-inputs-${y}`)?.classList.toggle("hidden",!b);const w=document.getElementById(`${R}-status-${y}`);w&&(w.innerText=b?M:p,w.style.color=b?"var(--success)":"var(--text-dim)")})})};S("func-toggle","func","Aberto","Fechado"),S("entrega-toggle","entrega","Disponível","Indisponível")}async function N(O){const E=c(l);if(E)await V.update("loja_config",E.id,O),Object.assign(E,O);else{const k=await V.create("loja_config",{empresaId:e,lojaId:l,...O});r.push({id:k,empresaId:e,lojaId:l,...O})}}},G_=()=>`
    <style>
        :root {
            --lp-bg: #030712;
            --lp-primary: #6366f1;
            --lp-secondary: #a855f7;
            --lp-text: #f9fafb;
            --lp-text-dim: #9ca3af;
            --lp-glass: rgba(255, 255, 255, 0.03);
            --lp-border: rgba(255, 255, 255, 0.08);
        }

        .lp-container {
            background-color: var(--lp-bg);
            color: var(--lp-text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            line-height: 1.6;
        }

        /* ── Glowing Background ── */
        .lp-glow {
            position: fixed;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
            filter: blur(100px);
            z-index: 0;
            pointer-events: none;
        }
        .lp-glow-1 { top: -300px; right: -300px; }
        .lp-glow-2 { bottom: -300px; left: -300px; }

        /* ── Navbar ── */
        .lp-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 10%;
            position: sticky;
            top: 0;
            background: rgba(3, 7, 18, 0.85);
            backdrop-filter: blur(16px);
            z-index: 100;
            border-bottom: 1px solid var(--lp-border);
        }
        .lp-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .lp-logo img {
            height: 32px;
            width: auto;
        }
        .lp-logo span {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .lp-nav-links {
            display: flex;
            gap: 2.5rem;
            align-items: center;
        }
        .lp-nav-link {
            text-decoration: none;
            color: var(--lp-text-dim);
            font-size: 0.95rem;
            font-weight: 500;
            transition: color 0.3s;
        }
        .lp-nav-link:hover { color: var(--lp-text); }
        .lp-btn-login {
            background: var(--lp-primary);
            color: white;
            padding: 0.7rem 1.8rem;
            border-radius: 99px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        .lp-btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* ── Hero Section ── */
        .lp-hero {
            padding: 120px 10% 80px;
            text-align: center;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        .lp-badge {
            display: inline-block;
            padding: 8px 18px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 99px;
            font-size: 0.85rem;
            color: #818cf8;
            margin-bottom: 2.5rem;
            backdrop-filter: blur(4px);
            letter-spacing: 0.5px;
            font-weight: 600;
        }
        .lp-hero h1 {
            font-size: 4.5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 2rem;
            letter-spacing: -2px;
        }
        .lp-hero h1 span {
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .lp-hero p {
            font-size: 1.35rem;
            color: var(--lp-text-dim);
            line-height: 1.7;
            margin-bottom: 3.5rem;
            max-width: 750px;
            margin-left: auto;
            margin-right: auto;
        }
        .lp-hero-btns {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
        }
        .lp-btn-primary {
            background: linear-gradient(135deg, var(--lp-primary), var(--lp-secondary));
            padding: 1.1rem 2.8rem;
            border-radius: 14px;
            color: white;
            font-weight: 700;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
        }
        .lp-btn-primary:hover { transform: translateY(-3px); filter: brightness(1.1); box-shadow: 0 15px 40px rgba(99, 102, 241, 0.3); }
        .lp-btn-secondary {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            padding: 1.1rem 2.8rem;
            border-radius: 14px;
            color: var(--lp-text);
            font-weight: 700;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s;
            backdrop-filter: blur(4px);
        }
        .lp-btn-secondary:hover { background: rgba(255,255,255,0.06); transform: translateY(-3px); }

        /* ── Feature Sections ── */
        .lp-section { padding: 120px 10%; position: relative; z-index: 1; }
        .lp-section.alt { background: rgba(255,255,255,0.015); }
        
        .lp-grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }
        .lp-grid-2.reverse { direction: rtl; }
        .lp-grid-2.reverse > * { direction: ltr; }

        .lp-feat-content h2 { font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; line-height: 1.2; }
        .lp-feat-content p { font-size: 1.15rem; color: var(--lp-text-dim); margin-bottom: 2rem; line-height: 1.8; }
        
        .lp-feat-list { list-style: none; padding: 0; margin-bottom: 2.5rem; }
        .lp-feat-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 1.2rem; font-size: 1.05rem; color: var(--lp-text); }
        .lp-feat-item i { color: var(--lp-primary); margin-top: 5px; font-size: 0.9rem; }

        .lp-feat-image {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            border-radius: 32px;
            padding: 2.5rem;
            box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5);
        }
        .lp-feat-image img { width: 100%; height: auto; border-radius: 16px; display: block; }

        /* ── Modules (Cards) ── */
        .lp-section-header { text-align: center; margin-bottom: 6rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .lp-section-header h2 { font-size: 3.5rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1px; }
        .lp-section-header p { color: var(--lp-text-dim); font-size: 1.25rem; }

        .lp-grid-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .lp-card {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            padding: 3rem;
            border-radius: 32px;
            transition: all 0.4s;
            backdrop-filter: blur(8px);
        }
        .lp-card:hover { transform: translateY(-12px); border-color: var(--lp-primary); background: rgba(99, 102, 241, 0.05); }
        .lp-card-icon {
            width: 70px;
            height: 70px;
            background: rgba(99, 102, 241, 0.1);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
            color: var(--lp-primary);
            font-size: 1.8rem;
        }
        .lp-card h3 { font-size: 1.75rem; font-weight: 700; margin-bottom: 1.2rem; }
        .lp-card p { color: var(--lp-text-dim); line-height: 1.8; margin-bottom: 2rem; font-size: 1.05rem; }
        .lp-card-link { color: var(--lp-primary); text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 1.1rem; }

        /* ── FAQ ── */
        .lp-faq { padding: 120px 10%; max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
        .lp-faq-item {
            background: var(--lp-glass);
            border: 1px solid var(--lp-border);
            border-radius: 20px;
            margin-bottom: 1.2rem;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s;
        }
        .lp-faq-item:hover { border-color: rgba(99,102,241,0.3); background: rgba(255,255,255,0.05); }
        .lp-faq-question { padding: 1.8rem; display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 1.15rem; }
        .lp-faq-answer { padding: 0 1.8rem 1.8rem; color: var(--lp-text-dim); line-height: 1.8; display: none; font-size: 1.05rem; }
        .lp-faq-item.active .lp-faq-answer { display: block; }
        .lp-faq-item.active .lp-faq-question i { transform: rotate(180deg); color: var(--lp-primary); }

        /* ── Footer ── */
        .lp-footer {
            padding: 120px 10% 60px;
            border-top: 1px solid var(--lp-border);
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 6rem;
            position: relative;
            z-index: 1;
        }
        .lp-footer-col h4 { font-weight: 800; margin-bottom: 2rem; font-size: 1.2rem; }
        .lp-footer-col ul { list-style: none; padding: 0; }
        .lp-footer-col li { margin-bottom: 1rem; }
        .lp-footer-col a { color: var(--lp-text-dim); text-decoration: none; transition: color 0.3s; font-size: 1rem; }
        .lp-footer-col a:hover { color: white; }

        /* ── Floating WhatsApp ── */
        .lp-wa-float {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 65px;
            height: 65px;
            background: #25d366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s;
            text-decoration: none;
            animation: pulse-wa 2s infinite;
        }
        .lp-wa-float:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 15px 40px rgba(37, 211, 102, 0.5); }
        
        @keyframes pulse-wa {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
            70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @media(max-width: 992px) {
            .lp-grid-2 { grid-template-columns: 1fr; gap: 60px; text-align: center; }
            .lp-feat-item { justify-content: center; }
            .lp-hero h1 { font-size: 3.5rem; }
            .lp-section-header h2 { font-size: 2.8rem; }
            .lp-footer { grid-template-columns: 1fr 1fr; gap: 4rem; }
        }
        @media(max-width: 768px) {
            .lp-hero h1 { font-size: 2.8rem; }
            .lp-navbar { padding: 1rem 5%; }
            .lp-nav-links { display: none; }
            .lp-footer { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
            .lp-logo { margin: 0 auto; }
            .lp-hero { padding-top: 80px; }
            .lp-wa-float { bottom: 25px; right: 25px; width: 55px; height: 55px; font-size: 28px; }
        }
    </style>

    <div class="lp-container">
        <div class="lp-glow lp-glow-1"></div>
        <div class="lp-glow lp-glow-2"></div>

        <nav class="lp-navbar">
            <div class="lp-logo">
                <img src="/logo.png" alt="AutoQui Logo">
                <span>AutoQui</span>
            </div>
            <div class="lp-nav-links">
                <a href="#features" class="lp-nav-link">Planos</a>
                <a href="#solucoes" class="lp-nav-link">Soluções</a>
                <a href="#faq" class="lp-nav-link">Suporte</a>
                <a href="/login" class="lp-btn-login">Entrar no Painel</a>
            </div>
        </nav>

        <section class="lp-hero">
            <div class="lp-badge">Tecnologia de Ponta para o seu Negócio</div>
            <h1>Aumente suas vendas com <span>Automação Inteligente</span></h1>
            <p>O AutoQui é a plataforma definitiva para quem deseja automatizar processos, gerenciar pedidos via catálogo e manter um relacionamento premium com clientes via WhatsApp.</p>
            <div class="lp-hero-btns">
                <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-primary">Falar com Consultor</a>
                <a href="#solucoes" class="lp-btn-secondary">Conhecer Módulos</a>
            </div>
        </section>

        <!-- Seção de Explicação 1: Automação -->
        <section id="solucoes" class="lp-section alt">
            <div class="lp-grid-2">
                <div class="lp-feat-content">
                    <div class="lp-badge" style="margin-bottom:1.5rem">Inteligência Artificial</div>
                    <h2>Atendimento Humano em Escala de Robô</h2>
                    <p>Nossa IA não apenas responde, ela entende o contexto. Transforme seu WhatsApp em uma máquina de vendas que nunca dorme.</p>
                    <ul class="lp-feat-list">
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Qualificação automática de leads</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Agendamentos sincronizados em tempo real</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Transição suave para atendente humano</li>
                    </ul>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-primary" style="padding: 0.9rem 2rem; font-size: 1rem;">Quero Automatizar</a>
                </div>
                <div class="lp-feat-image">
                    <img src="https://img.freepik.com/premium-photo/robot-operating-laptop-futuristic-office-generative-ai_124507-65715.jpg" alt="IA Atendimento">
                </div>
            </div>
        </section>

        <!-- Seção de Explicação 2: Catálogo -->
        <section class="lp-section">
            <div class="lp-grid-2 reverse">
                <div class="lp-feat-content">
                    <div class="lp-badge" style="margin-bottom:1.5rem">E-commerce de Próxima Geração</div>
                    <h2>Um Catálogo que é mais que uma Loja</h2>
                    <p>Ofereça aos seus clientes uma experiência de compra fluida, rápida e integrada. Nada de aplicativos pesados, tudo direto no navegador.</p>
                    <ul class="lp-feat-list">
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Checkout em menos de 30 segundos</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Integração nativa com Mercado Pago (PIX)</li>
                        <li class="lp-feat-item"><i class="fa-solid fa-circle-check"></i> Controle de estoque e gatilhos de escassez</li>
                    </ul>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-btn-secondary" style="padding: 0.9rem 2rem; font-size: 1rem;">Ver Demonstração</a>
                </div>
                <div class="lp-feat-image">
                    <img src="https://img.freepik.com/premium-psd/food-delivery-online-app-landing-page-template_444901-155.jpg" alt="Catálogo Digital">
                </div>
            </div>
        </section>

        <section id="features" class="lp-section alt">
            <div class="lp-section-header">
                <h2>Módulos Especializados</h2>
                <p>O AutoQui se adapta ao seu modelo de negócio, seja ele vendas diretas, serviços ou envios em massa.</p>
            </div>
            
            <div class="lp-grid-cards">
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-shop"></i></div>
                    <h3>Vendas Catálogo</h3>
                    <p>A vitrine definitiva para o seu delivery ou loja online. Sincronização total com WhatsApp e gestão de pedidos centralizada.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Solicitar Teste <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-calendar-check"></i></div>
                    <h3>Gestão de Serviços</h3>
                    <p>Para clínicas, barbearias ou consultorias. Agendamento inteligente que reduz faltas em até 70% com lembretes automáticos.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Saber mais <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="lp-card">
                    <div class="lp-card-icon"><i class="fa-solid fa-bullhorn"></i></div>
                    <h3>Campanhas Pro</h3>
                    <p>Envio em massa com inteligência de anti-banimento. Fale com toda a sua base de leads com apenas um clique.</p>
                    <a href="https://wa.me/5564996168691" target="_blank" class="lp-card-link">Explorar <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </section>

        <section id="faq" class="lp-faq">
            <div class="lp-section-header">
                <h2>Perguntas Frequentes</h2>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Como funciona a implementação do AutoQui? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">É instantâneo! Após criar sua conta, você vincula seu WhatsApp por QR Code e já pode configurar seus produtos e fluxos de atendimento em poucos minutos.</div>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Os dados dos meus clientes estão seguros? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">Com certeza. Utilizamos criptografia de ponta e servidores seguros para garantir que todas as transações e dados de leads sejam privados da sua empresa.</div>
            </div>
            <div class="lp-faq-item">
                <div class="lp-faq-question">Posso usar o meu número atual do WhatsApp? <i class="fa-solid fa-chevron-down"></i></div>
                <div class="lp-faq-answer">Sim! Você não precisa de um número novo. A integração é feita diretamente com o seu número de atendimento atual (Business ou Pessoal).</div>
            </div>
        </section>

        <footer class="lp-footer">
            <div class="lp-footer-col">
                <div class="lp-logo" style="margin-bottom: 2rem;">
                    <img src="/logo.png" alt="AutoQui Logo">
                    <span>AutoQui</span>
                </div>
                <p style="color: var(--lp-text-dim); line-height: 1.8;">A solução número #1 para empresas que buscam excelência no atendimento digital.</p>
            </div>
            <div class="lp-footer-col">
                <h4>Produto</h4>
                <ul>
                    <li><a href="#solucoes">Recursos</a></li>
                    <li><a href="#solucoes">Soluções</a></li>
                    <li><a href="#faq">Novidades</a></li>
                </ul>
            </div>
            <div class="lp-footer-col">
                <h4>Atendimento</h4>
                <ul>
                    <li><a href="https://wa.me/5564996168691">Falar com Consultor</a></li>
                    <li><a href="https://wa.me/5564996168691">Suporte Técnico</a></li>
                    <li><a href="https://wa.me/5564996168691">Comercial</a></li>
                </ul>
            </div>
            <div class="lp-footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="#">Privacidade</a></li>
                    <li><a href="#">Termos de Uso</a></li>
                </ul>
            </div>
        </footer>

        <!-- Floating WhatsApp Button -->
        <a href="https://wa.me/5564996168691" target="_blank" class="lp-wa-float">
            <i class="fa-brands fa-whatsapp"></i>
        </a>
    </div>

    <script>
        // FAQ Toggle
        document.querySelectorAll('.lp-faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.lp-faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });

        // Smooth scroll for anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    <\/script>
    `,K_=async()=>{const n=Ae.getCurrentUser(),e=n?.role?.toLowerCase()==="admin"||n?.email==="ginannymoreira@gmail.com";if(!n||!e)return"<p>Acesso negado.</p>";const i=(await V.getAll("companies")).flatMap(r=>(r.stores||[]).map(l=>({...l,companyName:r.name,companyId:r.id}))),s=()=>i.map(r=>`<option value="${r.id}" data-company-id="${r.companyId}">${r.name} (${r.companyName})</option>`).join("");return window.performMigration=async()=>{const r=document.getElementById("migration-source-store"),l=document.getElementById("migration-target-store"),c=r.value,u=r.selectedOptions[0]?.dataset.companyId,g=l.value,x=l.selectedOptions[0]?.dataset.companyId;if(!c||!g){D.warning("Selecione as lojas de origem e destino.");return}if(c===g){D.warning("A loja de origem e destino não podem ser a mesma.");return}if(!await Ne.warning("Confirmar Migração","Isso irá duplicar todos os produtos da loja de origem para a loja de destino. Continuar?"))return;const P=document.getElementById("btn-run-migration");P.disabled=!0,P.innerHTML='<div class="spinner-small"></div> Migrando...';try{const O=(await V.getAll("products",{field:"companyId",operator:"==",value:u})).filter(k=>k.storeIds&&k.storeIds.includes(c)||k.storeId===c);if(O.length===0){D.info("Nenhum produto encontrado na loja de origem."),P.disabled=!1,P.innerText="Iniciar Migração";return}let E=0;for(const k of O){const{id:T,...S}=k;S.companyId=x,S.storeIds=[g],delete S.lojaId,delete S.createdAt,await V.create("products",S),E++}D.success(`${E} produtos migrados com sucesso!`)}catch(N){console.error(N),D.error("Erro durante a migração: "+N)}finally{P.disabled=!1,P.innerText="Iniciar Migração"}},`
        <div class="page-header">
            <h2 class="page-title">Migração Administrativa de Produtos</h2>
        </div>

        <div class="card glass">
            <div class="card-header">
                <h3><i class="fa-solid fa-clone"></i> Duplicar Catálogo</h3>
                <p class="text-muted">Use esta ferramenta para copiar todos os produtos de uma unidade para outra.</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div class="form-group">
                    <label>Loja de ORIGEM (De onde virão os produtos)</label>
                    <select id="migration-source-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione a origem...</option>
                        ${s()}
                    </select>
                </div>

                <div class="form-group">
                    <label>Loja de DESTINO (Para onde serão copiados)</label>
                    <select id="migration-target-store" class="config-select" style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: white; border: 1px solid var(--border-color);">
                        <option value="">Selecione o destino...</option>
                        ${s()}
                    </select>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; border-radius: 12px; background: rgba(234, 179, 8, 0.05); border: 1px solid rgba(234, 179, 8, 0.2);">
                <p style="color: #eab308; font-size: 0.9rem; margin-bottom: 0;">
                    <i class="fa-solid fa-triangle-exclamation"></i> <strong>Atenção:</strong> Os produtos serão duplicados. Se você já migrou anteriormente, eles aparecerão repetidos no destino.
                </p>
            </div>

            <div style="margin-top: 25px; display: flex; justify-content: flex-end;">
                <button id="btn-run-migration" class="btn-primary" onclick="window.performMigration()" style="padding: 12px 30px;">
                    <i class="fa-solid fa-play"></i> Iniciar Migração
                </button>
            </div>
        </div>
    `},dn=[{id:"starter",name:"Starter",price:197,implFee:497,color:"#64748b",icon:"fa-rocket",description:"Catálogo digital com vitrine pública e recebimento de pedidos.",modules:["venda_catalogo"],maxInstances:1,maxStores:1,features:["Catálogo público","Pedidos pelo WhatsApp","1 instância","1 loja"]},{id:"pro",name:"Pro",price:397,implFee:797,color:"#6366f1",icon:"fa-star",description:"IA de atendimento e vendas completa via WhatsApp.",modules:["venda_catalogo","atendimento","venda"],maxInstances:3,maxStores:3,features:["Tudo do Starter","IA de Atendimento","IA de Vendas WPP","3 instâncias","3 lojas"],recommended:!0},{id:"business",name:"Business",price:697,implFee:1497,color:"#f59e0b",icon:"fa-building",description:"Plataforma completa com agendamento e disparos em massa.",modules:["venda_catalogo","atendimento","venda","agendamento","disparo"],maxInstances:10,maxStores:10,features:["Tudo do Pro","IA de Agendamento","Disparos em Massa","10 instâncias","10 lojas"]}],Ra=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),Q_=async()=>{let n=[];try{n=await V.getAll("companies"),n.sort((r,l)=>r.name.localeCompare(l.name))}catch{}const e=r=>r.subscription?.planId?dn.find(l=>l.id===r.subscription.planId):(r.modulos_ativos||[]).includes("agendamento")?dn[2]:(r.modulos_ativos||[]).includes("venda")||(r.modulos_ativos||[]).includes("atendimento")?dn[1]:dn[0],t=r=>{const l=r.subscription;if(!l)return{label:"Manual",color:"#64748b",icon:"fa-hand"};switch(l.status){case"active":return{label:"Ativa",color:"#10b981",icon:"fa-circle-check"};case"pending":return{label:"Pendente",color:"#f59e0b",icon:"fa-clock"};case"paused":return{label:"Pausada",color:"#f59e0b",icon:"fa-pause"};case"cancelled":return{label:"Cancelada",color:"#ef4444",icon:"fa-ban"};default:return{label:l.status,color:"#64748b",icon:"fa-circle"}}},a=()=>n.length===0?'<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-dim);">Nenhum cliente cadastrado.</td></tr>':n.map(r=>{const l=e(r),c=t(r),u=r.subscription?.nextBillingDate?new Date(r.subscription.nextBillingDate).toLocaleDateString("pt-BR"):"—",g=r.subscription?.implementationFeePaid;return`<tr>
                <td>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <div style="width:8px;height:8px;border-radius:50%;background:${r.status==="active"?"#10b981":"#ef4444"};flex-shrink:0;"></div>
                        <strong>${r.name}</strong>
                    </div>
                </td>
                <td>
                    ${l?`<span style="display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;font-weight:700;color:${l.color};">
                        <i class="fa-solid ${l.icon}"></i> ${l.name}
                    </span>`:"—"}
                </td>
                <td>
                    <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.8rem;font-weight:600;color:${c.color};">
                        <i class="fa-solid ${c.icon}"></i> ${c.label}
                    </span>
                </td>
                <td style="font-size:0.85rem;color:var(--text-muted);">${u}</td>
                <td>
                    ${g===!0?'<span style="font-size:0.8rem;color:#10b981;"><i class="fa-solid fa-check"></i> Paga</span>':g===!1?'<span style="font-size:0.8rem;color:#ef4444;"><i class="fa-solid fa-clock"></i> Pendente</span>':'<span style="font-size:0.8rem;color:var(--text-dim);">—</span>'}
                </td>
                <td>
                    <div style="display:flex;gap:6px;">
                        <button class="action-btn" onclick="window.openAssignPlan('${r.id}')" title="Atribuir Plano">
                            <i style="color:#6366f1;" class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="action-btn" onclick="window.openGenerateLink('${r.id}')" title="Gerar Link de Pagamento">
                            <i style="color:#10b981;" class="fa-solid fa-link"></i>
                        </button>
                    </div>
                </td>
            </tr>`}).join(""),i=`
    <div id="assign-plan-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:520px;width:95%;">
            <span class="close-modal" onclick="document.getElementById('assign-plan-modal').classList.add('hidden')">&times;</span>
            <h2 style="margin-bottom:0.25rem;">Atribuir Plano</h2>
            <p class="text-muted" style="font-size:0.88rem;margin-bottom:1.5rem;" id="assign-company-name">Selecione o plano para o cliente.</p>
            <input type="hidden" id="assign-company-id">

            <div id="plan-cards" style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem;">
                ${dn.map(r=>`
                <label class="plan-card-option" data-plan-id="${r.id}" style="cursor:pointer;">
                    <input type="radio" name="selected-plan" value="${r.id}" style="display:none;">
                    <div class="plan-card-inner" style="
                        background:var(--surface-hover); border:2px solid var(--border-color);
                        border-radius:12px; padding:1rem 1.25rem;
                        display:flex; align-items:center; gap:1rem; transition:all 0.2s;">
                        <div style="width:42px;height:42px;border-radius:10px;background:${r.color}22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="fa-solid ${r.icon}" style="color:${r.color};font-size:1.1rem;"></i>
                        </div>
                        <div style="flex:1;">
                            <div style="display:flex;align-items:center;gap:8px;">
                                <strong style="color:var(--text-main);">${r.name}</strong>
                                ${r.recommended?`<span style="font-size:0.7rem;font-weight:700;background:${r.color}22;color:${r.color};padding:1px 8px;border-radius:20px;border:1px solid ${r.color}44;">RECOMENDADO</span>`:""}
                            </div>
                            <div style="font-size:0.82rem;color:var(--text-muted);margin-top:2px;">${r.description}</div>
                        </div>
                        <div style="text-align:right;flex-shrink:0;">
                            <div style="font-size:1.1rem;font-weight:800;color:${r.color};">${Ra(r.price)}<span style="font-size:0.75rem;font-weight:400;color:var(--text-dim);">/mês</span></div>
                            <div style="font-size:0.78rem;color:var(--text-dim);">Impl: ${Ra(r.implFee)}</div>
                        </div>
                    </div>
                </label>`).join("")}
            </div>

            <div style="display:flex;gap:0.75rem;justify-content:flex-end;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" onclick="document.getElementById('assign-plan-modal').classList.add('hidden')">Cancelar</button>
                <button class="btn-primary" id="btn-confirm-plan" style="min-width:140px;">
                    <i class="fa-solid fa-check"></i> Confirmar Plano
                </button>
            </div>
        </div>
    </div>`,s=`
    <div id="link-modal" class="modal hidden">
        <div class="modal-content glass" style="max-width:480px;width:95%;">
            <span class="close-modal" onclick="document.getElementById('link-modal').classList.add('hidden')">&times;</span>
            <h2 style="margin-bottom:0.25rem;">Gerar Link de Pagamento</h2>
            <p class="text-muted" id="link-company-label" style="font-size:0.88rem;margin-bottom:1.5rem;"></p>
            <input type="hidden" id="link-company-id">

            <div style="display:flex;flex-direction:column;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Tipo de cobrança</label>
                    <select id="link-type" class="form-input">
                        <option value="implementation">Taxa de Implementação (pagamento único)</option>
                        <option value="subscription">Assinatura Mensal (recorrente)</option>
                        <option value="custom">Valor personalizado</option>
                    </select>
                </div>
                <div id="link-plan-row" class="form-group">
                    <label class="form-label">Plano</label>
                    <select id="link-plan" class="form-input">
                        ${dn.map(r=>`<option value="${r.id}">${r.name} — ${Ra(r.price)}/mês (impl: ${Ra(r.implFee)})</option>`).join("")}
                    </select>
                </div>
                <div id="link-custom-row" class="form-group" style="display:none;">
                    <label class="form-label">Valor (R$)</label>
                    <input type="number" id="link-custom-value" class="form-input" placeholder="500.00" min="1" step="0.01">
                    <input type="text" id="link-custom-desc" class="form-input" placeholder="Descrição do pagamento" style="margin-top:0.5rem;">
                </div>
            </div>

            <div id="link-result" style="display:none;margin-top:1rem;">
                <label class="form-label">Link gerado</label>
                <div style="display:flex;gap:0.5rem;">
                    <input type="text" id="link-result-url" class="form-input" readonly style="font-family:monospace;font-size:0.82rem;">
                    <button class="btn-secondary" onclick="navigator.clipboard.writeText(document.getElementById('link-result-url').value);window.toastSuccess('Link copiado!')" style="flex-shrink:0;padding:0 12px;">
                        <i class="fa-solid fa-copy"></i>
                    </button>
                </div>
            </div>

            <div style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
                <button class="btn-secondary" onclick="document.getElementById('link-modal').classList.add('hidden')">Fechar</button>
                <button class="btn-primary" id="btn-generate-link" style="min-width:160px;">
                    <i class="fa-solid fa-link"></i> Gerar Link
                </button>
            </div>
        </div>
    </div>`;return setTimeout(()=>Y_(n,dn),100),`
    <style>
        .plan-card-option input[type=radio]:checked + .plan-card-inner {
            border-color: var(--primary) !important;
            background: rgba(99,102,241,0.05) !important;
        }
        .plan-card-option:hover .plan-card-inner { border-color: rgba(99,102,241,0.4) !important; }
    </style>

    <div class="page-header" style="justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-layer-group" style="color:var(--primary);margin-right:10px;"></i>Planos e Assinaturas
            </h2>
            <p style="color:var(--text-muted);font-size:0.9rem;">Gerencie os planos e cobranças dos clientes.</p>
        </div>
    </div>

    <!-- Cards dos planos -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-bottom:2rem;">
        ${dn.map(r=>`
        <div class="card" style="padding:1.5rem;border-top:3px solid ${r.color};position:relative;">
            ${r.recommended?`<div style="position:absolute;top:1rem;right:1rem;font-size:0.7rem;font-weight:700;background:${r.color};color:#fff;padding:2px 10px;border-radius:20px;">RECOMENDADO</div>`:""}
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem;">
                <div style="width:40px;height:40px;border-radius:10px;background:${r.color}22;display:flex;align-items:center;justify-content:center;">
                    <i class="fa-solid ${r.icon}" style="color:${r.color};font-size:1.1rem;"></i>
                </div>
                <div>
                    <div style="font-weight:800;font-size:1rem;color:var(--text-main);">${r.name}</div>
                    <div style="font-size:0.78rem;color:var(--text-dim);">
                        ${n.filter(l=>dn.find(u=>u.id===(l.subscription?.planId||((l.modulos_ativos||[]).includes("agendamento")?"business":(l.modulos_ativos||[]).includes("venda")?"pro":"starter")))?.id===r.id).length} clientes
                    </div>
                </div>
            </div>
            <div style="font-size:1.8rem;font-weight:900;color:${r.color};line-height:1;">${Ra(r.price)}<span style="font-size:0.9rem;font-weight:400;color:var(--text-dim);">/mês</span></div>
            <div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:1rem;">Implementação: ${Ra(r.implFee)}</div>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:4px;">
                ${r.features.map(l=>`<li style="font-size:0.82rem;color:var(--text-muted);display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-check" style="color:${r.color};font-size:0.7rem;"></i>${l}</li>`).join("")}
            </ul>
        </div>`).join("")}
    </div>

    <!-- Tabela de clientes -->
    <div class="card">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border-color);display:flex;align-items:center;justify-content:space-between;">
            <span style="font-weight:700;">Clientes (${n.length})</span>
        </div>
        <div class="table-container">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Plano</th>
                        <th>Assinatura</th>
                        <th>Próx. Cobrança</th>
                        <th>Implementação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="plans-table-body">
                    ${a()}
                </tbody>
            </table>
        </div>
    </div>

    ${i}
    ${s}`};function Y_(n,e){window.openAssignPlan=t=>{const a=n.find(r=>r.id===t);if(!a)return;document.getElementById("assign-company-id").value=t,document.getElementById("assign-company-name").textContent=a.name;const i=a.subscription?.planId||"starter",s=document.querySelector(`input[name="selected-plan"][value="${i}"]`);s&&(s.checked=!0),document.getElementById("assign-plan-modal").classList.remove("hidden")},document.querySelectorAll(".plan-card-option").forEach(t=>{t.addEventListener("click",()=>{const a=t.querySelector("input[type=radio]");a&&(a.checked=!0)})}),document.getElementById("btn-confirm-plan")?.addEventListener("click",async()=>{const t=document.getElementById("assign-company-id").value,a=document.querySelector('input[name="selected-plan"]:checked');if(!a){D.warning("Selecione um plano.");return}const i=a.value,s=e.find(l=>l.id===i);if(!s)return;const r=document.getElementById("btn-confirm-plan");r.disabled=!0,r.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Salvando...';try{await V.update("companies",t,{modulos_ativos:s.modules,limite_instancias:s.maxInstances,plan:i});const l=await V.get("subscriptions",t);await V.set("subscriptions",t,{companyId:t,planId:i,status:l?.status||"pending",implementationFeePaid:l?.implementationFeePaid||!1,updatedAt:new Date,...l?{}:{createdAt:new Date}}),D.success(`Plano ${s.name} atribuído com sucesso!`),document.getElementById("assign-plan-modal").classList.add("hidden");const c=n.find(g=>g.id===t);c&&(c.modulos_ativos=s.modules,c.plan=i,c.subscription?c.subscription.planId=i:c.subscription={status:"pending",planId:i}),document.getElementById("plans-table-body")&&setTimeout(()=>window.dispatchEvent(new Event("render-app")),500)}catch(l){D.error("Erro: "+l.message)}finally{r.disabled=!1,r.innerHTML='<i class="fa-solid fa-check"></i> Confirmar Plano'}}),window.openGenerateLink=t=>{const a=n.find(i=>i.id===t);a&&(document.getElementById("link-company-id").value=t,document.getElementById("link-company-label").textContent=`Cliente: ${a.name}`,document.getElementById("link-result").style.display="none",document.getElementById("link-modal").classList.remove("hidden"))},document.getElementById("link-type")?.addEventListener("change",t=>{const a=t.target.value;document.getElementById("link-plan-row").style.display=a==="custom"?"none":"",document.getElementById("link-custom-row").style.display=a==="custom"?"":"none"}),document.getElementById("btn-generate-link")?.addEventListener("click",async()=>{const t=document.getElementById("link-company-id").value,a=document.getElementById("link-type").value,i=document.getElementById("link-plan").value,s=parseFloat(document.getElementById("link-custom-value").value||"0"),r=document.getElementById("link-custom-desc").value,l=document.getElementById("btn-generate-link");l.disabled=!0,l.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i> Gerando...';try{const c={companyId:t,type:a,planId:i};a==="custom"&&(c.amount=s,c.description=r);const u=await Yn.post("/plans/payment-link",c);u.checkoutUrl?(document.getElementById("link-result-url").value=u.checkoutUrl,document.getElementById("link-result").style.display="",D.success("Link gerado! Copie e envie para o cliente.")):D.error(u.error||"Erro ao gerar link.")}catch(c){D.error("Erro: "+c.message)}finally{l.disabled=!1,l.innerHTML='<i class="fa-solid fa-link"></i> Gerar Link'}}),window.toastSuccess=t=>D.success(t)}const J_=async()=>{let n=[];try{n=(await Yn.get("/admin/logs?lines=300")).logs||[]}catch(t){return`<div style="padding:2rem;color:var(--danger);">
            <i class="fa-solid fa-triangle-exclamation"></i>
            Erro ao carregar logs: ${t.message}
        </div>`}const e=t=>t.map(a=>{const i=new Date(a.ts).toLocaleTimeString("pt-BR",{hour12:!1}),s=a.level==="error"?"var(--danger)":a.level==="warn"?"#f59e0b":"var(--text-main)",r=a.text.replace(/← RECV/g,'<span style="color:#60a5fa;font-weight:700;">← RECV</span>').replace(/→ SEND/g,'<span style="color:#c084fc;font-weight:700;">→ SEND</span>').replace(/✓ OK/g,'<span style="color:#34d399;font-weight:700;">✓ OK</span>').replace(/✗/g,'<span style="color:var(--danger);font-weight:700;">✗</span>').replace(/⚠/g,'<span style="color:#f59e0b;">⚠</span>').replace(/🤖/g,"<span>🤖</span>").replace(/🔧/g,"<span>🔧</span>");return`<div class="log-line" style="color:${s};">
            <span class="log-ts">${i}</span>
            <span class="log-text">${r}</span>
        </div>`}).join("");return setTimeout(()=>X_(),100),`
    <style>
        .log-container {
            background: #0d1117; border-radius: 12px; border: 1px solid var(--border-color);
            font-family: 'Courier New', monospace; font-size: 0.78rem; line-height: 1.6;
            overflow: hidden; display: flex; flex-direction: column;
            height: calc(100vh - 220px); min-height: 400px;
        }
        .log-toolbar {
            display: flex; align-items: center; gap: 0.75rem;
            padding: 0.75rem 1rem; background: #161b22;
            border-bottom: 1px solid #30363d; flex-shrink: 0;
        }
        .log-toolbar input {
            flex: 1; background: #0d1117; border: 1px solid #30363d;
            border-radius: 6px; padding: 4px 10px; color: #e6edf3;
            font-family: monospace; font-size: 0.78rem;
        }
        .log-toolbar input:focus { outline: none; border-color: #58a6ff; }
        .log-body {
            flex: 1; overflow-y: auto; padding: 0.5rem 0;
            scroll-behavior: smooth;
        }
        .log-line {
            display: flex; gap: 0.75rem; padding: 1px 1rem;
            white-space: pre-wrap; word-break: break-all;
        }
        .log-line:hover { background: rgba(255,255,255,0.03); }
        .log-ts { color: #484f58; flex-shrink: 0; }
        .log-text { flex: 1; }
        .log-badge {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 0.7rem; font-weight: 700; padding: 2px 8px;
            border-radius: 4px; border: 1px solid;
        }
        .log-auto-badge {
            font-size: 0.72rem; color: #484f58;
        }
    </style>

    <div class="page-header" style="margin-bottom:1.25rem;">
        <div>
            <h2 class="page-title" style="margin-bottom:4px;">
                <i class="fa-solid fa-terminal" style="color:var(--primary);margin-right:10px;"></i>Logs do Servidor
            </h2>
            <p style="color:var(--text-muted);font-size:0.88rem;">Logs em tempo real do backend de IA.</p>
        </div>
        <div style="display:flex;gap:0.75rem;align-items:center;">
            <span id="log-auto-label" class="log-auto-badge">auto-refresh: <strong id="log-auto-state">ON</strong></span>
            <button id="btn-toggle-auto" class="btn-secondary" style="font-size:0.82rem;padding:6px 12px;">
                <i class="fa-solid fa-pause"></i> Pausar
            </button>
            <button id="btn-refresh-logs" class="btn-secondary" style="font-size:0.82rem;padding:6px 12px;">
                <i class="fa-solid fa-rotate"></i> Atualizar
            </button>
            <button id="btn-scroll-bottom" class="btn-primary" style="font-size:0.82rem;padding:6px 12px;">
                <i class="fa-solid fa-arrow-down"></i> Final
            </button>
        </div>
    </div>

    <div class="log-container">
        <div class="log-toolbar">
            <i class="fa-solid fa-magnifying-glass" style="color:#484f58;"></i>
            <input type="text" id="log-filter" placeholder="Filtrar logs... (ex: RECV, ERROR, phone number)">
            <span id="log-count" style="color:#484f58;font-size:0.72rem;flex-shrink:0;">${n.length} linhas</span>
        </div>
        <div class="log-body" id="log-body">
            ${e(n)}
        </div>
    </div>`};function X_(){const n=document.getElementById("log-body"),e=document.getElementById("log-filter"),t=document.getElementById("log-count"),a=document.getElementById("log-auto-state"),i=document.getElementById("btn-toggle-auto"),s=document.getElementById("btn-refresh-logs"),r=document.getElementById("btn-scroll-bottom");let l=[],c=!0,u;const g=()=>{n&&(n.scrollTop=n.scrollHeight)},x=E=>E.map(k=>{const T=new Date(k.ts).toLocaleTimeString("pt-BR",{hour12:!1}),S=k.level==="error"?"var(--danger)":k.level==="warn"?"#f59e0b":"#e6edf3",_=k.text.replace(/← RECV/g,'<span style="color:#60a5fa;font-weight:700;">← RECV</span>').replace(/→ SEND/g,'<span style="color:#c084fc;font-weight:700;">→ SEND</span>').replace(/✓ OK/g,'<span style="color:#34d399;font-weight:700;">✓ OK</span>').replace(/✗/g,'<span style="color:#f85149;font-weight:700;">✗</span>').replace(/⚠/g,'<span style="color:#f59e0b;">⚠</span>');return`<div class="log-line" style="color:${S};">
            <span class="log-ts">${T}</span>
            <span class="log-text">${_}</span>
        </div>`}).join(""),v=()=>{if(!n)return;const E=e?.value.toLowerCase()||"",k=E?l.filter(T=>T.text.toLowerCase().includes(E)):l;n.innerHTML=x(k),t&&(t.textContent=`${k.length}/${l.length} linhas`)},P=async()=>{try{l=(await Yn.get("/admin/logs?lines=300")).logs||[];const k=n?n.scrollHeight-n.scrollTop-n.clientHeight<60:!0;v(),k&&g()}catch{}},N=()=>{u=setInterval(P,5e3)},O=()=>clearInterval(u);Yn.get("/admin/logs?lines=300").then(E=>{l=E.logs||[],v(),g()}).catch(()=>{}),N(),g(),e?.addEventListener("input",v),s?.addEventListener("click",async()=>{s.innerHTML='<i class="fa-solid fa-circle-notch fa-spin"></i>',await P(),s.innerHTML='<i class="fa-solid fa-rotate"></i> Atualizar',D.info("Logs atualizados")}),r?.addEventListener("click",g),i?.addEventListener("click",()=>{c=!c,c?(N(),i.innerHTML='<i class="fa-solid fa-pause"></i> Pausar',a&&(a.textContent="ON")):(O(),i.innerHTML='<i class="fa-solid fa-play"></i> Retomar',a&&(a.textContent="OFF"))}),window.addEventListener("popstate",()=>clearInterval(u),{once:!0}),window.addEventListener("render-app",()=>clearInterval(u),{once:!0})}class Z_{appElement;constructor(){this.appElement=document.getElementById("app"),this.init()}init(){let e=null;Ae.subscribe(t=>{this.render(),t?t.uid!==e&&(e=t.uid,lu.startListening()):(e=null,lu.stopListening())}),this.handleRouting(),window.addEventListener("render-app",()=>this.render())}handleRouting(){window.addEventListener("popstate",()=>this.render()),document.addEventListener("click",e=>{const a=e.target.closest("a");if(a&&a.getAttribute("href")?.startsWith("/")){e.preventDefault();const i=a.getAttribute("href");window.location.pathname!==i&&(history.pushState(null,"",i),this.render())}}),document.addEventListener("submit",async e=>{if(e.target.id==="login-form"){e.preventDefault();const a=document.getElementById("email").value,i=document.getElementById("password").value;try{await Ae.login(a,i)}catch(s){D.error("Erro ao fazer login: "+s)}}}),document.addEventListener("click",async e=>{e.target.closest("#logout-btn")&&(history.replaceState(null,"","/"),await Ae.logout())})}async render(){const e=window.location.pathname,t=Ae.getCurrentUser();if(e==="/"){this.appElement.innerHTML=G_();const r=this.appElement.querySelector(".lp-btn-login")||this.appElement.querySelector(".lp-btn-primary");t&&r&&(r.textContent="Dashboard",r.setAttribute("href",t.role==="admin"?"/admin/dashboard":"/dashboard"));return}if(!t){if(e.startsWith("/catalog/")){const r=e.split("/").pop()||"";this.appElement.innerHTML=await uu(r);return}if(e.startsWith("/qr/")){const r=e.split("/").pop()||"";this.appElement.innerHTML=await pu(r);return}e!=="/login"&&history.replaceState(null,"","/login"),this.appElement.innerHTML=`<div id="page-content" class="login-page-container">${I_()}</div>`;return}if(e==="/login"){const r=t.role==="admin"?"/admin/dashboard":"/dashboard";history.replaceState(null,"",r),this.render();return}if(e.startsWith("/catalog/")){const r=e.split("/").pop()||"";this.appElement.innerHTML=await uu(r);return}if(e.startsWith("/qr/")){const r=e.split("/").pop()||"";this.appElement.innerHTML=await pu(r);return}if(!this.isRouteAllowed(e,t.role)){this.appElement.innerHTML="<h1>403 Forbidden</h1><p>Você não tem permissão para acessar esta página.</p>";return}const a=await this.getPageTitle(e);let i;t.role==="admin"?i=_h:t.role==="employee"?i=l_:i=o_;const s=await i();this.appElement.innerHTML=`
            <div class="app-container">
                ${s}
                <main class="main-content">
                    ${c_(a)}
                    <!-- initTheme é chamado abaixo via setTimeout -->
                    <div id="page-content" class="page-container">
                        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 50vh; flex-direction: column; gap: 1rem;">
                            <i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--primary);"></i>
                            <span style="color: var(--text-muted);">Carregando página...</span>
                        </div>
                    </div>
                </main>
            </div>
        `,setTimeout(()=>d_(),0);try{const r=await this.getPageContent(e),l=document.getElementById("page-content");l&&(l.innerHTML=r)}catch(r){console.error("Error loading page content:",r);const l=document.getElementById("page-content");l&&(l.innerHTML=`
                <div style="padding: 2rem; text-align: center;">
                    <i class="fa-solid fa-triangle-exclamation fa-2x" style="color: var(--danger);"></i>
                    <h3 style="margin-top: 1rem; color: var(--text-main);">Falha ao carregar</h3>
                    <p style="color: var(--text-muted); margin-top: 0.5rem;">Não foi possível carregar o conteúdo da página.</p>
                </div>
            `)}this.updateActiveLinks(),this.updateOrderCounter()}isRouteAllowed(e,t){return t==="admin"?e.startsWith("/admin"):!e.startsWith("/admin")}async getPageTitle(e){if(e==="/products"){const t=Ae.getCurrentUser();if(t?.companyId)try{const{dbService:a}=await Xr(async()=>{const{dbService:r}=await Promise.resolve().then(()=>s_);return{dbService:r}},void 0);if(((await a.get("companies",t.companyId))?.modulos_ativos||[]).includes("agendamento"))return"Serviços"}catch{}return"Produtos"}switch(e){case"/":case"/dashboard":case"/admin/dashboard":return"Dashboard";case"/orders":return"Pedidos";case"/stores":return"Lojas";case"/leads":return"Leads";case"/users":case"/admin/users":return"Usuários";case"/admin/ai-config":return"Configuração IA";case"/companies":case"/admin/companies":return"Gestão de Clientes";case"/instances":return"Instâncias";case"/configuration":return"Configurações";case"/campaigns":return"Campanhas";case"/schedule":return"Agenda";case"/schedule-clients":return"Clientes";case"/admin/webhooks":return"Configuração do Backend";case"/admin/plans":return"Planos e Assinaturas";case"/admin/logs":return"Logs do Servidor";case"/admin/migration":return"Migração de Produtos";case"/mercado-pago":return"Mercado Pago";case"/catalog-settings":return"Configuração";default:return"Página não encontrada"}}async getPageContent(e){switch(e){case"/":case"/dashboard":case"/admin/dashboard":return p_();case"/orders":return b_();case"/products":return await w_();case"/stores":return await x_();case"/leads":return await D_();case"/users":return Ae.getCurrentUser()?.role==="admin"?ou():__();case"/admin/users":return ou();case"/admin/ai-config":return E_();case"/companies":case"/admin/companies":return await T_();case"/instances":return A_();case"/configuration":return P_();case"/campaigns":return O_();case"/schedule":return V_();case"/schedule-clients":return z_();case"/admin/webhooks":return await F_();case"/admin/plans":return await Q_();case"/admin/logs":return await J_();case"/admin/migration":return await K_();case"/mercado-pago":return await j_();case"/catalog-settings":return await W_();default:return"<h1>404</h1><p>Página não encontrada.</p>"}}updateActiveLinks(){const e=window.location.pathname;document.querySelectorAll(".nav-item").forEach(a=>{a.getAttribute("href")===e?a.classList.add("active"):a.classList.remove("active")})}async updateOrderCounter(){const e=Ae.getCurrentUser();if(!(!e||!e.companyId||e.role==="admin"))try{const t=e.storeIds||(e.storeId?[e.storeId]:[]),a=await ca.getOpenOrdersCount(e.companyId,e.role==="owner"?[]:t),i=document.getElementById("orders-count-badge");i&&(i.textContent=a.toString(),a>0?i.classList.remove("hidden"):i.classList.add("hidden"))}catch(t){console.error("Error updating order counter:",t)}}}new Z_;
