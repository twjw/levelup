var ot=Object.create;var Pe=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var ct=Object.getOwnPropertyNames;var ht=Object.getPrototypeOf,lt=Object.prototype.hasOwnProperty;var ft=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ct(t))!lt.call(e,n)&&n!==s&&Pe(e,n,{get:()=>t[n],enumerable:!(r=at(t,n))||r.enumerable});return e};var dt=(e,t,s)=>(s=e!=null?ot(ht(e)):{},ft(t||!e||!e.__esModule?Pe(s,"default",{value:e,enumerable:!0}):s,e));var Oe=require("http"),Ae=require("http2"),Te=require("stream"),Me=dt(require("crypto"),1),ut=global.Request,ce=class extends ut{constructor(e,t){typeof e=="object"&&I in e&&(e=e[I]()),t?.body instanceof ReadableStream&&(t.duplex="half"),super(e,t)}};Object.defineProperty(global,"Request",{value:ce});var pt=(e,t,s)=>{let r=[],n=s.rawHeaders;for(let o=0;o<n.length;o+=2){let{[o]:c,[o+1]:a}=n;c.charCodeAt(0)!==58&&r.push([c,a])}let i={method:e,headers:r};return e==="GET"||e==="HEAD"||(i.body=Te.Readable.toWeb(s)),new ce(t,i)},I=Symbol("getRequestCache"),mt=Symbol("requestCache"),oe=Symbol("incomingKey"),ae=Symbol("urlKey"),z={get method(){return this[oe].method||"GET"},get url(){return this[ae]},[I](){return this[mt]||=pt(this.method,this[ae],this[oe])}};["body","bodyUsed","cache","credentials","destination","headers","integrity","mode","redirect","referrer","referrerPolicy","signal"].forEach(e=>{Object.defineProperty(z,e,{get(){return this[I]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(z,e,{value:function(){return this[I]()[e]()}})});Object.setPrototypeOf(z,ce.prototype);var yt=e=>{let t=Object.create(z);return t[oe]=e,t[ae]=new URL(`http://${e instanceof Ae.Http2ServerRequest?e.authority:e.headers.host}${e.url}`).href,t};function Ce(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");if(t.destroyed){e.cancel();return}let s=e.getReader();return t.on("close",r),t.on("error",r),s.read().then(i,r),s.closed.finally(()=>{t.off("close",r),t.off("error",r)});function r(o){s.cancel(o).catch(()=>{}),o&&t.destroy(o)}function n(){s.read().then(i,r)}function i({done:o,value:c}){try{if(o)t.end();else if(!t.write(c))t.once("drain",n);else return s.read().then(i,r)}catch(a){r(a)}}}var ke=e=>{let t={},s=[];for(let[r,n]of e)r==="set-cookie"?s.push(n):t[r]=n;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??="text/plain;charset=UTF-8",t},He=Symbol("responseCache"),j=Symbol("cache"),he=global.Response,$=class Le{#t;#e;get cache(){return delete this[j],this[He]||=new he(this.#t,this.#e)}constructor(t,s){if(this.#t=t,s instanceof Le){let r=s[He];if(r){this.#e=r,this.cache;return}else this.#e=s.#e}else this.#e=s;if(typeof t=="string"||t instanceof ReadableStream){let r=s?.headers||{"content-type":"text/plain;charset=UTF-8"};r instanceof Headers&&(r=ke(r)),this[j]=[s?.status||200,t,r]}}};["body","bodyUsed","headers","ok","redirected","status","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty($.prototype,e,{get(){return this.cache[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty($.prototype,e,{value:function(){return this.cache[e]()}})});Object.setPrototypeOf($,he);Object.setPrototypeOf($.prototype,he.prototype);Object.defineProperty(global,"Response",{value:$});var vt=global.fetch;typeof global.crypto>"u"&&(global.crypto=Me.default);global.fetch=(e,t)=>(t={compress:!1,...t},vt(e,t));var wt=/^no$/i,Rt=/^(application\/json\b|text\/(?!event-stream\b))/i,De=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),K=(e,t)=>{let s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},Fe=(e,t)=>{let[s,r,n]=e[j];if(typeof r=="string")n["Content-Length"]=Buffer.byteLength(r),t.writeHead(s,n),t.end(r);else return t.writeHead(s,n),Ce(r,t)?.catch(i=>K(i,t))},gt=async(e,t,s={})=>{if(e instanceof Promise)if(s.errorHandler)try{e=await e}catch(n){let i=await s.errorHandler(n);if(!i)return;e=i}else e=await e.catch(De);try{if(j in e)return Fe(e,t)}catch(n){return K(n,t)}let r=ke(e.headers);if(e.body)try{let{"transfer-encoding":n,"content-encoding":i,"content-length":o,"x-accel-buffering":c,"content-type":a}=r;if(n||i||o||c&&wt.test(c)||!Rt.test(a))t.writeHead(e.status,r),await Ce(e.body,t);else{let h=await e.arrayBuffer();r["content-length"]=h.byteLength,t.writeHead(e.status,r),t.end(new Uint8Array(h))}}catch(n){K(n,t)}else t.writeHead(e.status,r),t.end()},Et=(e,t={})=>async(s,r)=>{let n,i=yt(s);try{if(n=e(i,{incoming:s,outgoing:r}),j in n)return Fe(n,r)}catch(o){if(n)return K(o,r);if(t.errorHandler){if(n=await t.errorHandler(o),!n)return}else n=De(o)}return gt(n,r,t)},xt=e=>{let t=e.fetch,s=Et(t);return(e.createServer||Oe.createServer)(e.serverOptions||{},s)},Be=(e,t)=>{let s=xt(e);return s.listen(e?.port??3e3,e.hostname??"0.0.0.0",()=>{let r=s.address();t&&t(r)}),s};var Ie={Stringify:1,BeforeStream:2,Stream:3},bt=(e,t)=>{let s=new String(e);return s.isEscaped=!0,s.callbacks=t,s};var le=async(e,t,s,r,n)=>{let i=e.callbacks;if(!i?.length)return Promise.resolve(e);n?n[0]+=e:n=[e];let o=Promise.all(i.map(c=>c({phase:t,buffer:n,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(a=>le(a,t,!1,r,n))).then(()=>n[0]));return s?bt(await o,i):o};var je=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)},f=(e,t,s)=>(je(e,t,"read from private field"),s?s.call(e):t.get(e)),C=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},w=(e,t,s,r)=>(je(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),_t="text/plain; charset=UTF-8",fe=(e,t={})=>(Object.entries(t).forEach(([s,r])=>e.set(s,r)),e),N,H,y,u,x,O,k=class{constructor(e,t){this.env={},this._var={},this.finalized=!1,this.error=void 0,C(this,N,200),C(this,H,void 0),C(this,y,void 0),C(this,u,void 0),C(this,x,void 0),C(this,O,!0),this.layout=void 0,this.renderer=s=>this.html(s),this.notFoundHandler=()=>new Response,this.render=(...s)=>this.renderer(...s),this.setLayout=s=>this.layout=s,this.getLayout=()=>this.layout,this.setRenderer=s=>{this.renderer=s},this.header=(s,r,n)=>{if(r===void 0){f(this,y)?f(this,y).delete(s):f(this,u)&&delete f(this,u)[s.toLocaleLowerCase()],this.finalized&&this.res.headers.delete(s);return}n?.append?(f(this,y)||(w(this,O,!1),w(this,y,new Headers(f(this,u))),w(this,u,{})),f(this,y).append(s,r)):f(this,y)?f(this,y).set(s,r):(f(this,u)??w(this,u,{}),f(this,u)[s.toLowerCase()]=r),this.finalized&&(n?.append?this.res.headers.append(s,r):this.res.headers.set(s,r))},this.status=s=>{w(this,O,!1),w(this,N,s)},this.set=(s,r)=>{this._var??(this._var={}),this._var[s]=r},this.get=s=>this._var?this._var[s]:void 0,this.newResponse=(s,r,n)=>{if(f(this,O)&&!n&&!r&&f(this,N)===200)return new Response(s,{headers:f(this,u)});if(r&&typeof r!="number"){let o=fe(new Headers(r.headers),f(this,u));return new Response(s,{headers:o,status:r.status})}let i=typeof r=="number"?r:f(this,N);f(this,u)??w(this,u,{}),f(this,y)??w(this,y,new Headers),fe(f(this,y),f(this,u)),f(this,x)&&(f(this,x).headers.forEach((o,c)=>{f(this,y)?.set(c,o)}),fe(f(this,y),f(this,u))),n??(n={});for(let[o,c]of Object.entries(n))if(typeof c=="string")f(this,y).set(o,c);else{f(this,y).delete(o);for(let a of c)f(this,y).append(o,a)}return new Response(s,{status:i,headers:f(this,y)})},this.body=(s,r,n)=>typeof r=="number"?this.newResponse(s,r,n):this.newResponse(s,r),this.text=(s,r,n)=>{if(!f(this,u)){if(f(this,O)&&!n&&!r)return new Response(s);w(this,u,{})}return f(this,u)["content-type"]=_t,typeof r=="number"?this.newResponse(s,r,n):this.newResponse(s,r)},this.json=(s,r,n)=>{let i=JSON.stringify(s);return f(this,u)??w(this,u,{}),f(this,u)["content-type"]="application/json; charset=UTF-8",typeof r=="number"?this.newResponse(i,r,n):this.newResponse(i,r)},this.html=(s,r,n)=>(f(this,u)??w(this,u,{}),f(this,u)["content-type"]="text/html; charset=UTF-8",typeof s=="object"&&(s instanceof Promise||(s=s.toString()),s instanceof Promise)?s.then(i=>le(i,Ie.Stringify,!1,{})).then(i=>typeof r=="number"?this.newResponse(i,r,n):this.newResponse(i,r)):typeof r=="number"?this.newResponse(s,r,n):this.newResponse(s,r)),this.redirect=(s,r=302)=>(f(this,y)??w(this,y,new Headers),f(this,y).set("Location",s),this.newResponse(null,r)),this.notFound=()=>this.notFoundHandler(this),this.req=e,t&&(w(this,H,t.executionCtx),this.env=t.env,t.notFoundHandler&&(this.notFoundHandler=t.notFoundHandler))}get event(){if(f(this,H)&&"respondWith"in f(this,H))return f(this,H);throw Error("This context has no FetchEvent")}get executionCtx(){if(f(this,H))return f(this,H);throw Error("This context has no ExecutionContext")}get res(){return w(this,O,!1),f(this,x)||w(this,x,new Response("404 Not Found",{status:404}))}set res(e){if(w(this,O,!1),f(this,x)&&e){f(this,x).headers.delete("content-type");for(let[t,s]of f(this,x).headers.entries())if(t==="set-cookie"){let r=f(this,x).headers.getSetCookie();e.headers.delete("set-cookie");for(let n of r)e.headers.append("set-cookie",n)}else e.headers.set(t,s)}w(this,x,e),this.finalized=!0}get var(){return{...this._var}}};N=new WeakMap;H=new WeakMap;y=new WeakMap;u=new WeakMap;x=new WeakMap;O=new WeakMap;var de=(e,t,s)=>(r,n)=>{let i=-1;return o(0);async function o(c){if(c<=i)throw new Error("next() called multiple times");i=c;let a,h=!1,l;if(e[c]?(l=e[c][0][0],r instanceof k&&(r.req.routeIndex=c)):l=c===e.length&&n||void 0,!l)r instanceof k&&r.finalized===!1&&s&&(a=await s(r));else try{a=await l(r,()=>o(c+1))}catch(d){if(d instanceof Error&&r instanceof k&&t)r.error=d,a=await t(d,r),h=!0;else throw d}return a&&(r.finalized===!1||h)&&(r.res=a),r}};var $e=class extends Error{constructor(e=500,t){super(t?.message),this.res=t?.res,this.status=e}getResponse(){return this.res?this.res:new Response(this.message,{status:this.status})}};var Ne=async(e,t={all:!1})=>{let r=(e instanceof V?e.raw.headers:e.headers).get("Content-Type");return St(r)?Pt(e,t):{}};function St(e){return e===null?!1:e.startsWith("multipart/form-data")||e.startsWith("application/x-www-form-urlencoded")}async function Pt(e,t){let s=await e.formData();return s?Ht(s,t):{}}function Ht(e,t){let s={};return e.forEach((r,n)=>{t.all||n.endsWith("[]")?Ot(s,n,r):s[n]=r}),s}var Ot=(e,t,s)=>{e[t]&&At(e[t])?Tt(e[t],s):e[t]?Ct(e,t,s):e[t]=s};function At(e){return Array.isArray(e)}var Tt=(e,t)=>{e.push(t)},Ct=(e,t,s)=>{e[t]=[e[t],s]};var pe=e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},qe=e=>{let{groups:t,path:s}=kt(e),r=pe(s);return Lt(r,t)},kt=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{let n=`@${r}`;return t.push([n,s]),n}),{groups:t,path:e}},Lt=(e,t)=>{for(let s=t.length-1;s>=0;s--){let[r]=t[s];for(let n=e.length-1;n>=0;n--)if(e[n].includes(r)){e[n]=e[n].replace(r,t[s][1]);break}}return e},Q={},me=e=>{if(e==="*")return"*";let t=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);return t?(Q[e]||(t[2]?Q[e]=[e,t[1],new RegExp("^"+t[2]+"$")]:Q[e]=[e,t[1],!0]),Q[e]):null},ye=e=>{let t=e.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);return t?t[1]:""},We=e=>{let t=e.indexOf("?",8);return t===-1?"":"?"+e.slice(t+1)},Ue=e=>{let t=ye(e);return t.length>1&&t[t.length-1]==="/"?t.slice(0,-1):t},L=(...e)=>{let t="",s=!1;for(let r of e)t[t.length-1]==="/"&&(t=t.slice(0,-1),s=!0),r[0]!=="/"&&(r=`/${r}`),r==="/"&&s?t=`${t}/`:r!=="/"&&(t=`${t}${r}`),r==="/"&&t===""&&(t="/");return t},Y=e=>{if(!e.match(/\:.+\?$/))return null;let t=e.split("/"),s=[],r="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))r+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){s.length===0&&r===""?s.push("/"):s.push(r);let i=n.replace("?","");r+="/"+i,s.push(r)}else r+="/"+n}),s.filter((n,i,o)=>o.indexOf(n)===i)},ue=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),/%/.test(e)?X(e):e):e,Ge=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let o=e.indexOf(`?${t}`,8);for(o===-1&&(o=e.indexOf(`&${t}`,8));o!==-1;){let c=e.charCodeAt(o+t.length+1);if(c===61){let a=o+t.length+2,h=e.indexOf("&",a);return ue(e.slice(a,h===-1?void 0:h))}else if(c==38||isNaN(c))return"";o=e.indexOf(`&${t}`,o+1)}if(r=/[%+]/.test(e),!r)return}let n={};r??(r=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){let o=e.indexOf("&",i+1),c=e.indexOf("=",i);c>o&&o!==-1&&(c=-1);let a=e.slice(i+1,c===-1?o===-1?void 0:o:c);if(r&&(a=ue(a)),i=o,a==="")continue;let h;c===-1?h="":(h=e.slice(c+1,o===-1?void 0:o),r&&(h=ue(h))),s?(n[a]&&Array.isArray(n[a])||(n[a]=[]),n[a].push(h)):n[a]??(n[a]=h)}return t?n[t]:n},Ke=Ge,ze=(e,t)=>Ge(e,t,!0),X=decodeURIComponent;var Ye=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)},S=(e,t,s)=>(Ye(e,t,"read from private field"),s?s.call(e):t.get(e)),Ve=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},Qe=(e,t,s,r)=>(Ye(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),q,b,V=class{constructor(e,t="/",s=[[]]){Ve(this,q,void 0),Ve(this,b,void 0),this.routeIndex=0,this.bodyCache={},this.cachedBody=r=>{let{bodyCache:n,raw:i}=this,o=n[r];return o||(n.arrayBuffer?(async()=>await new Response(n.arrayBuffer)[r]())():n[r]=i[r]())},this.raw=e,this.path=t,Qe(this,b,s),Qe(this,q,{})}param(e){return e?this.getDecodedParam(e):this.getAllDecodedParams()}getDecodedParam(e){let t=S(this,b)[0][this.routeIndex][1][e],s=this.getParamValue(t);return s?/\%/.test(s)?X(s):s:void 0}getAllDecodedParams(){let e={},t=Object.keys(S(this,b)[0][this.routeIndex][1]);for(let s of t){let r=this.getParamValue(S(this,b)[0][this.routeIndex][1][s]);r&&typeof r=="string"&&(e[s]=/\%/.test(r)?X(r):r)}return e}getParamValue(e){return S(this,b)[1]?S(this,b)[1][e]:e}query(e){return Ke(this.url,e)}queries(e){return ze(this.url,e)}header(e){if(e)return this.raw.headers.get(e.toLowerCase())??void 0;let t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){if(this.bodyCache.parsedBody)return this.bodyCache.parsedBody;let t=await Ne(this,e);return this.bodyCache.parsedBody=t,t}json(){return this.cachedBody("json")}text(){return this.cachedBody("text")}arrayBuffer(){return this.cachedBody("arrayBuffer")}blob(){return this.cachedBody("blob")}formData(){return this.cachedBody("formData")}addValidatedData(e,t){S(this,q)[e]=t}valid(e){return S(this,q)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get matchedRoutes(){return S(this,b)[0].map(([[,e]])=>e)}get routePath(){return S(this,b)[0].map(([[,e]])=>e)[this.routeIndex].path}};q=new WeakMap;b=new WeakMap;var p="ALL",Xe="all",J=["get","post","put","delete","options","patch"],Z="Can not add a route since the matcher is already built.",ee=class extends Error{};var Ze=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)},te=(e,t,s)=>(Ze(e,t,"read from private field"),s?s.call(e):t.get(e)),Mt=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},re=(e,t,s,r)=>(Ze(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),Dt=Symbol("composedHandler");function Ft(){return class{}}var Bt=e=>e.text("404 Not Found",404),Je=(e,t)=>e instanceof $e?e.getResponse():(console.error(e),t.text("Internal Server Error",500)),_,et=class extends Ft(){constructor(e={}){super(),this._basePath="/",Mt(this,_,"/"),this.routes=[],this.notFoundHandler=Bt,this.errorHandler=Je,this.onError=r=>(this.errorHandler=r,this),this.notFound=r=>(this.notFoundHandler=r,this),this.fetch=(r,n,i)=>this.dispatch(r,i,n,r.method),this.request=(r,n,i,o)=>{if(r instanceof Request)return n!==void 0&&(r=new Request(r,n)),this.fetch(r,i,o);r=r.toString();let c=/^https?:\/\//.test(r)?r:`http://localhost${L("/",r)}`,a=new Request(c,n);return this.fetch(a,i,o)},this.fire=()=>{addEventListener("fetch",r=>{r.respondWith(this.dispatch(r.request,r,void 0,r.request.method))})},[...J,Xe].map(r=>{this[r]=(n,...i)=>(typeof n=="string"?re(this,_,n):this.addRoute(r,te(this,_),n),i.map(o=>{typeof o!="string"&&this.addRoute(r,te(this,_),o)}),this)}),this.on=(r,n,...i)=>{if(!r)return this;for(let o of[n].flat()){re(this,_,o);for(let c of[r].flat())i.map(a=>{this.addRoute(c.toUpperCase(),te(this,_),a)})}return this},this.use=(r,...n)=>(typeof r=="string"?re(this,_,r):(re(this,_,"*"),n.unshift(r)),n.map(i=>{this.addRoute(p,te(this,_),i)}),this);let s=e.strict??!0;delete e.strict,Object.assign(this,e),this.getPath=s?e.getPath??ye:Ue}clone(){let e=new et({router:this.router,getPath:this.getPath});return e.routes=this.routes,e}route(e,t){let s=this.basePath(e);return t?(t.routes.map(r=>{let n;t.errorHandler===Je?n=r.handler:(n=async(i,o)=>(await de([],t.errorHandler)(i,()=>r.handler(i,o))).res,n[Dt]=r.handler),s.addRoute(r.method,r.path,n)}),this):s}basePath(e){let t=this.clone();return t._basePath=L(this._basePath,e),t}mount(e,t,s){let r=L(this._basePath,e),n=r==="/"?0:r.length,i=async(o,c)=>{let a;try{a=o.executionCtx}catch{}let h=s?s(o):[o.env,a],l=Array.isArray(h)?h:[h],d=We(o.req.url),m=await t(new Request(new URL((o.req.path.slice(n)||"/")+d,o.req.url),o.req.raw),...l);if(m)return m;await c()};return this.addRoute(p,L(e,"*"),i),this}addRoute(e,t,s){e=e.toUpperCase(),t=L(this._basePath,t);let r={path:t,method:e,handler:s};this.router.add(e,t,[s,r]),this.routes.push(r)}matchRoute(e,t){return this.router.match(e,t)}handleError(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}dispatch(e,t,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.dispatch(e,t,s,"GET")))();let n=this.getPath(e,{env:s}),i=this.matchRoute(r,n),o=new k(new V(e,n,i),{env:s,executionCtx:t,notFoundHandler:this.notFoundHandler});if(i[0].length===1){let a;try{if(a=i[0][0][0][0](o,async()=>{}),!a)return this.notFoundHandler(o)}catch(h){return this.handleError(h,o)}return a instanceof Promise?a.then(h=>h||(o.finalized?o.res:this.notFoundHandler(o))).catch(h=>this.handleError(h,o)):a}let c=de(i[0],this.errorHandler,this.notFoundHandler);return(async()=>{try{let a=await c(o);if(!a.finalized)throw new Error("Context is not finalized. You may forget returning Response object or `await next()`");return a.res}catch(a){return this.handleError(a,o)}})()}},tt=et;_=new WeakMap;var se="[^/]+",W=".*",U="(?:|/.*)",M=Symbol();function It(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===W||e===U?1:t===W||t===U?-1:e===se?1:t===se?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ne=class{constructor(){this.children={}}insert(e,t,s,r,n){if(e.length===0){if(this.index!==void 0)throw M;if(n)return;this.index=t;return}let[i,...o]=e,c=i==="*"?o.length===0?["","",W]:["","",se]:i==="/*"?["","",U]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),a;if(c){let h=c[1],l=c[2]||se;if(h&&c[2]&&(l=l.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(l)))throw M;if(a=this.children[l],!a){if(Object.keys(this.children).some(d=>d!==W&&d!==U))throw M;if(n)return;a=this.children[l]=new ne,h!==""&&(a.varIndex=r.varIndex++)}!n&&h!==""&&s.push([h,a.varIndex])}else if(a=this.children[i],!a){if(Object.keys(this.children).some(h=>h.length>1&&h!==W&&h!==U))throw M;if(n)return;a=this.children[i]=new ne}a.insert(o,t,s,r,n)}buildRegExpStr(){let t=Object.keys(this.children).sort(It).map(s=>{let r=this.children[s];return(typeof r.varIndex=="number"?`(${s})@${r.varIndex}`:s)+r.buildRegExpStr()});return typeof this.index=="number"&&t.unshift(`#${this.index}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}};var rt=class{constructor(){this.context={varIndex:0},this.root=new ne}insert(e,t,s){let r=[],n=[];for(let o=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,a=>{let h=`@\\${o}`;return n[o]=[h,a],o++,c=!0,h}),!c)break}let i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=n.length-1;o>=0;o--){let[c]=n[o];for(let a=i.length-1;a>=0;a--)if(i[a].indexOf(c)!==-1){i[a]=i[a].replace(c,n[o][1]);break}}return this.root.insert(i,t,r,this.context,s),r}buildRegExp(){let e=this.root.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,o)=>typeof i<"u"?(s[++t]=Number(i),"$()"):(typeof o<"u"&&(r[Number(o)]=++t),"")),[new RegExp(`^${e}`),s,r]}};var ve=[p,...J].map(e=>e.toUpperCase()),st=[],jt=[/^$/,[],{}],we={};function nt(e){return we[e]??(we[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*/,"(?:|/.*)")}$`))}function $t(){we={}}function Nt(e){let t=new rt,s=[];if(e.length===0)return jt;let r=e.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,l],[d,m])=>h?1:d?-1:l.length-m.length),n={};for(let h=0,l=-1,d=r.length;h<d;h++){let[m,g,v]=r[h];m?n[g]=[v.map(([E])=>[E,{}]),st]:l++;let R;try{R=t.insert(g,l,m)}catch(E){throw E===M?new ee(g):E}m||(s[l]=v.map(([E,A])=>{let F={};for(A-=1;A>=0;A--){let[P,G]=R[A];F[P]=G}return[E,F]}))}let[i,o,c]=t.buildRegExp();for(let h=0,l=s.length;h<l;h++)for(let d=0,m=s[h].length;d<m;d++){let g=s[h][d]?.[1];if(!g)continue;let v=Object.keys(g);for(let R=0,E=v.length;R<E;R++)g[v[R]]=c[g[v[R]]]}let a=[];for(let h in o)a[h]=s[o[h]];return[i,a,n]}function D(e,t){if(e){for(let s of Object.keys(e).sort((r,n)=>n.length-r.length))if(nt(s).test(t))return[...e[s]]}}var Re=class{constructor(){this.name="RegExpRouter",this.middleware={[p]:{}},this.routes={[p]:{}}}add(e,t,s){var r;let{middleware:n,routes:i}=this;if(!n||!i)throw new Error(Z);ve.indexOf(e)===-1&&ve.push(e),n[e]||[n,i].forEach(a=>{a[e]={},Object.keys(a[p]).forEach(h=>{a[e][h]=[...a[p][h]]})}),t==="/*"&&(t="*");let o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let a=nt(t);e===p?Object.keys(n).forEach(h=>{var l;(l=n[h])[t]||(l[t]=D(n[h],t)||D(n[p],t)||[])}):(r=n[e])[t]||(r[t]=D(n[e],t)||D(n[p],t)||[]),Object.keys(n).forEach(h=>{(e===p||e===h)&&Object.keys(n[h]).forEach(l=>{a.test(l)&&n[h][l].push([s,o])})}),Object.keys(i).forEach(h=>{(e===p||e===h)&&Object.keys(i[h]).forEach(l=>a.test(l)&&i[h][l].push([s,o]))});return}let c=Y(t)||[t];for(let a=0,h=c.length;a<h;a++){let l=c[a];Object.keys(i).forEach(d=>{var m;(e===p||e===d)&&((m=i[d])[l]||(m[l]=[...D(n[d],l)||D(n[p],l)||[]]),i[d][l].push([s,o-h+a+1]))})}}match(e,t){$t();let s=this.buildAllMatchers();return this.match=(r,n)=>{let i=s[r],o=i[2][n];if(o)return o;let c=n.match(i[0]);if(!c)return[[],st];let a=c.indexOf("",1);return[i[1][a],c]},this.match(e,t)}buildAllMatchers(){let e={};return ve.forEach(t=>{e[t]=this.buildMatcher(t)||e[p]}),this.middleware=this.routes=void 0,e}buildMatcher(e){let t=[],s=e===p;return[this.middleware,this.routes].forEach(r=>{let n=r[e]?Object.keys(r[e]).map(i=>[i,r[e][i]]):[];n.length!==0?(s||(s=!0),t.push(...n)):e!==p&&t.push(...Object.keys(r[p]).map(i=>[i,r[p][i]]))}),s?Nt(t):null}};var ge=class{constructor(e){this.name="SmartRouter",this.routers=[],this.routes=[],Object.assign(this,e)}add(e,t,s){if(!this.routes)throw new Error(Z);this.routes.push([e,t,s])}match(e,t){if(!this.routes)throw new Error("Fatal error");let{routers:s,routes:r}=this,n=s.length,i=0,o;for(;i<n;i++){let c=s[i];try{r.forEach(a=>{c.add(...a)}),o=c.match(e,t)}catch(a){if(a instanceof ee)continue;throw a}this.match=c.match.bind(c),this.routers=[c],this.routes=void 0;break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.routes||this.routers.length!==1)throw new Error("No active router has been determined yet.");return this.routers[0]}};var Ee=class{constructor(e,t,s){if(this.order=0,this.params={},this.children=s||{},this.methods=[],this.name="",e&&t){let r={};r[e]={handler:t,possibleKeys:[],score:0,name:this.name},this.methods=[r]}this.patterns=[]}insert(e,t,s){this.name=`${e} ${t}`,this.order=++this.order;let r=this,n=qe(t),i=[],o=[];for(let h=0,l=n.length;h<l;h++){let d=n[h];if(Object.keys(r.children).includes(d)){o.push(...r.patterns),r=r.children[d];let g=me(d);g&&i.push(g[1]);continue}r.children[d]=new Ee;let m=me(d);m&&(r.patterns.push(m),o.push(...r.patterns),i.push(m[1])),o.push(...r.patterns),r=r.children[d]}r.methods.length||(r.methods=[]);let c={},a={handler:s,possibleKeys:i.filter((h,l,d)=>d.indexOf(h)===l),name:this.name,score:this.order};return c[e]=a,r.methods.push(c),r}gHSets(e,t,s,r){let n=[];for(let i=0,o=e.methods.length;i<o;i++){let c=e.methods[i],a=c[t]||c[p],h={};a!==void 0&&(a.params={},a.possibleKeys.forEach(l=>{let d=h[a.name];a.params[l]=r[l]&&!d?r[l]:s[l]??r[l],h[a.name]=!0}),n.push(a))}return n}search(e,t){let s=[];this.params={};let n=[this],i=pe(t);for(let c=0,a=i.length;c<a;c++){let h=i[c],l=c===a-1,d=[];for(let m=0,g=n.length;m<g;m++){let v=n[m],R=v.children[h];R&&(R.params=v.params,l===!0?(R.children["*"]&&s.push(...this.gHSets(R.children["*"],e,v.params,{})),s.push(...this.gHSets(R,e,v.params,{}))):d.push(R));for(let E=0,A=v.patterns.length;E<A;E++){let F=v.patterns[E],P={...v.params};if(F==="*"){let ie=v.children["*"];ie&&(s.push(...this.gHSets(ie,e,v.params,{})),d.push(ie));continue}if(h==="")continue;let[G,_e,B]=F,T=v.children[G],Se=i.slice(c).join("/");if(B instanceof RegExp&&B.test(Se)){P[_e]=Se,s.push(...this.gHSets(T,e,v.params,P));continue}(B===!0||B instanceof RegExp&&B.test(h))&&typeof G=="string"&&(P[_e]=h,l===!0?(s.push(...this.gHSets(T,e,P,v.params)),T.children["*"]&&s.push(...this.gHSets(T.children["*"],e,P,v.params))):(T.params=P,d.push(T)))}}n=d}return[s.sort((c,a)=>c.score-a.score).map(({handler:c,params:a})=>[c,a])]}};var xe=class{constructor(){this.name="TrieRouter",this.node=new Ee}add(e,t,s){let r=Y(t);if(r){for(let n of r)this.node.insert(e,n,s);return}this.node.insert(e,t,s)}match(e,t){return this.node.search(e,t)}};var be=class extends tt{constructor(e={}){super(e),this.router=e.router??new ge({routers:[new Re,new xe]})}};var it=new be;it.get("/",e=>e.text("Hello Node.js!"));Be({fetch:it.fetch,port:8787});