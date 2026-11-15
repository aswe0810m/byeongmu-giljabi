"use strict";(()=>{var Pm=Object.create;var Ms=Object.defineProperty;var Mm=Object.getOwnPropertyDescriptor;var Am=Object.getOwnPropertyNames;var Rm=Object.getPrototypeOf,Fm=Object.prototype.hasOwnProperty;var vt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Tm=(e,t,a,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Am(t))!Fm.call(e,o)&&o!==a&&Ms(e,o,{get:()=>t[o],enumerable:!(r=Mm(t,o))||r.enumerable});return e};var A=(e,t,a)=>(a=e!=null?Pm(Rm(e)):{},Tm(t||!e||!e.__esModule?Ms(a,"default",{value:e,enumerable:!0}):a,e));var Hs=vt(E=>{"use strict";/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kr=Symbol.for("react.element"),Em=Symbol.for("react.portal"),Dm=Symbol.for("react.fragment"),jm=Symbol.for("react.strict_mode"),Bm=Symbol.for("react.profiler"),Om=Symbol.for("react.provider"),Nm=Symbol.for("react.context"),Um=Symbol.for("react.forward_ref"),Hm=Symbol.for("react.suspense"),zm=Symbol.for("react.memo"),_m=Symbol.for("react.lazy"),As=Symbol.iterator;function qm(e){return e===null||typeof e!="object"?null:(e=As&&e[As]||e["@@iterator"],typeof e=="function"?e:null)}var Ts={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Es=Object.assign,Ds={};function Ba(e,t,a){this.props=e,this.context=t,this.refs=Ds,this.updater=a||Ts}Ba.prototype.isReactComponent={};Ba.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ba.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function js(){}js.prototype=Ba.prototype;function qn(e,t,a){this.props=e,this.context=t,this.refs=Ds,this.updater=a||Ts}var Gn=qn.prototype=new js;Gn.constructor=qn;Es(Gn,Ba.prototype);Gn.isPureReactComponent=!0;var Rs=Array.isArray,Bs=Object.prototype.hasOwnProperty,Vn={current:null},Os={key:!0,ref:!0,__self:!0,__source:!0};function Ns(e,t,a){var r,o={},l=null,n=null;if(t!=null)for(r in t.ref!==void 0&&(n=t.ref),t.key!==void 0&&(l=""+t.key),t)Bs.call(t,r)&&!Os.hasOwnProperty(r)&&(o[r]=t[r]);var u=arguments.length-2;if(u===1)o.children=a;else if(1<u){for(var i=Array(u),s=0;s<u;s++)i[s]=arguments[s+2];o.children=i}if(e&&e.defaultProps)for(r in u=e.defaultProps,u)o[r]===void 0&&(o[r]=u[r]);return{$$typeof:kr,type:e,key:l,ref:n,props:o,_owner:Vn.current}}function Gm(e,t){return{$$typeof:kr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Wn(e){return typeof e=="object"&&e!==null&&e.$$typeof===kr}function Vm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(a){return t[a]})}var Fs=/\/+/g;function _n(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Vm(""+e.key):t.toString(36)}function Xo(e,t,a,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var n=!1;if(e===null)n=!0;else switch(l){case"string":case"number":n=!0;break;case"object":switch(e.$$typeof){case kr:case Em:n=!0}}if(n)return n=e,o=o(n),e=r===""?"."+_n(n,0):r,Rs(o)?(a="",e!=null&&(a=e.replace(Fs,"$&/")+"/"),Xo(o,t,a,"",function(s){return s})):o!=null&&(Wn(o)&&(o=Gm(o,a+(!o.key||n&&n.key===o.key?"":(""+o.key).replace(Fs,"$&/")+"/")+e)),t.push(o)),1;if(n=0,r=r===""?".":r+":",Rs(e))for(var u=0;u<e.length;u++){l=e[u];var i=r+_n(l,u);n+=Xo(l,t,a,i,o)}else if(i=qm(e),typeof i=="function")for(e=i.call(e),u=0;!(l=e.next()).done;)l=l.value,i=r+_n(l,u++),n+=Xo(l,t,a,i,o);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return n}function $o(e,t,a){if(e==null)return e;var r=[],o=0;return Xo(e,r,"","",function(l){return t.call(a,l,o++)}),r}function Wm(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(a){(e._status===0||e._status===-1)&&(e._status=1,e._result=a)},function(a){(e._status===0||e._status===-1)&&(e._status=2,e._result=a)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var we={current:null},Ko={transition:null},$m={ReactCurrentDispatcher:we,ReactCurrentBatchConfig:Ko,ReactCurrentOwner:Vn};function Us(){throw Error("act(...) is not supported in production builds of React.")}E.Children={map:$o,forEach:function(e,t,a){$o(e,function(){t.apply(this,arguments)},a)},count:function(e){var t=0;return $o(e,function(){t++}),t},toArray:function(e){return $o(e,function(t){return t})||[]},only:function(e){if(!Wn(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};E.Component=Ba;E.Fragment=Dm;E.Profiler=Bm;E.PureComponent=qn;E.StrictMode=jm;E.Suspense=Hm;E.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$m;E.act=Us;E.cloneElement=function(e,t,a){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Es({},e.props),o=e.key,l=e.ref,n=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,n=Vn.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(i in t)Bs.call(t,i)&&!Os.hasOwnProperty(i)&&(r[i]=t[i]===void 0&&u!==void 0?u[i]:t[i])}var i=arguments.length-2;if(i===1)r.children=a;else if(1<i){u=Array(i);for(var s=0;s<i;s++)u[s]=arguments[s+2];r.children=u}return{$$typeof:kr,type:e.type,key:o,ref:l,props:r,_owner:n}};E.createContext=function(e){return e={$$typeof:Nm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Om,_context:e},e.Consumer=e};E.createElement=Ns;E.createFactory=function(e){var t=Ns.bind(null,e);return t.type=e,t};E.createRef=function(){return{current:null}};E.forwardRef=function(e){return{$$typeof:Um,render:e}};E.isValidElement=Wn;E.lazy=function(e){return{$$typeof:_m,_payload:{_status:-1,_result:e},_init:Wm}};E.memo=function(e,t){return{$$typeof:zm,type:e,compare:t===void 0?null:t}};E.startTransition=function(e){var t=Ko.transition;Ko.transition={};try{e()}finally{Ko.transition=t}};E.unstable_act=Us;E.useCallback=function(e,t){return we.current.useCallback(e,t)};E.useContext=function(e){return we.current.useContext(e)};E.useDebugValue=function(){};E.useDeferredValue=function(e){return we.current.useDeferredValue(e)};E.useEffect=function(e,t){return we.current.useEffect(e,t)};E.useId=function(){return we.current.useId()};E.useImperativeHandle=function(e,t,a){return we.current.useImperativeHandle(e,t,a)};E.useInsertionEffect=function(e,t){return we.current.useInsertionEffect(e,t)};E.useLayoutEffect=function(e,t){return we.current.useLayoutEffect(e,t)};E.useMemo=function(e,t){return we.current.useMemo(e,t)};E.useReducer=function(e,t,a){return we.current.useReducer(e,t,a)};E.useRef=function(e){return we.current.useRef(e)};E.useState=function(e){return we.current.useState(e)};E.useSyncExternalStore=function(e,t,a){return we.current.useSyncExternalStore(e,t,a)};E.useTransition=function(){return we.current.useTransition()};E.version="18.3.1"});var he=vt((sL,zs)=>{"use strict";zs.exports=Hs()});var Ys=vt($=>{"use strict";/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function Qn(e,t){var a=e.length;e.push(t);e:for(;0<a;){var r=a-1>>>1,o=e[r];if(0<Qo(o,t))e[r]=t,e[a]=o,a=r;else break e}}function Je(e){return e.length===0?null:e[0]}function Zo(e){if(e.length===0)return null;var t=e[0],a=e.pop();if(a!==t){e[0]=a;e:for(var r=0,o=e.length,l=o>>>1;r<l;){var n=2*(r+1)-1,u=e[n],i=n+1,s=e[i];if(0>Qo(u,a))i<o&&0>Qo(s,u)?(e[r]=s,e[i]=a,r=i):(e[r]=u,e[n]=a,r=n);else if(i<o&&0>Qo(s,a))e[r]=s,e[i]=a,r=i;else break e}}return t}function Qo(e,t){var a=e.sortIndex-t.sortIndex;return a!==0?a:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(_s=performance,$.unstable_now=function(){return _s.now()}):($n=Date,qs=$n.now(),$.unstable_now=function(){return $n.now()-qs});var _s,$n,qs,pt=[],Ut=[],Xm=1,Ge=null,xe=3,Jo=!1,ga=!1,Pr=!1,Ws=typeof setTimeout=="function"?setTimeout:null,$s=typeof clearTimeout=="function"?clearTimeout:null,Gs=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Yn(e){for(var t=Je(Ut);t!==null;){if(t.callback===null)Zo(Ut);else if(t.startTime<=e)Zo(Ut),t.sortIndex=t.expirationTime,Qn(pt,t);else break;t=Je(Ut)}}function Zn(e){if(Pr=!1,Yn(e),!ga)if(Je(pt)!==null)ga=!0,eu(Jn);else{var t=Je(Ut);t!==null&&tu(Zn,t.startTime-e)}}function Jn(e,t){ga=!1,Pr&&(Pr=!1,$s(Mr),Mr=-1),Jo=!0;var a=xe;try{for(Yn(t),Ge=Je(pt);Ge!==null&&(!(Ge.expirationTime>t)||e&&!Qs());){var r=Ge.callback;if(typeof r=="function"){Ge.callback=null,xe=Ge.priorityLevel;var o=r(Ge.expirationTime<=t);t=$.unstable_now(),typeof o=="function"?Ge.callback=o:Ge===Je(pt)&&Zo(pt),Yn(t)}else Zo(pt);Ge=Je(pt)}if(Ge!==null)var l=!0;else{var n=Je(Ut);n!==null&&tu(Zn,n.startTime-t),l=!1}return l}finally{Ge=null,xe=a,Jo=!1}}var el=!1,Yo=null,Mr=-1,Xs=5,Ks=-1;function Qs(){return!($.unstable_now()-Ks<Xs)}function Xn(){if(Yo!==null){var e=$.unstable_now();Ks=e;var t=!0;try{t=Yo(!0,e)}finally{t?br():(el=!1,Yo=null)}}else el=!1}var br;typeof Gs=="function"?br=function(){Gs(Xn)}:typeof MessageChannel<"u"?(Kn=new MessageChannel,Vs=Kn.port2,Kn.port1.onmessage=Xn,br=function(){Vs.postMessage(null)}):br=function(){Ws(Xn,0)};var Kn,Vs;function eu(e){Yo=e,el||(el=!0,br())}function tu(e,t){Mr=Ws(function(){e($.unstable_now())},t)}$.unstable_IdlePriority=5;$.unstable_ImmediatePriority=1;$.unstable_LowPriority=4;$.unstable_NormalPriority=3;$.unstable_Profiling=null;$.unstable_UserBlockingPriority=2;$.unstable_cancelCallback=function(e){e.callback=null};$.unstable_continueExecution=function(){ga||Jo||(ga=!0,eu(Jn))};$.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Xs=0<e?Math.floor(1e3/e):5};$.unstable_getCurrentPriorityLevel=function(){return xe};$.unstable_getFirstCallbackNode=function(){return Je(pt)};$.unstable_next=function(e){switch(xe){case 1:case 2:case 3:var t=3;break;default:t=xe}var a=xe;xe=t;try{return e()}finally{xe=a}};$.unstable_pauseExecution=function(){};$.unstable_requestPaint=function(){};$.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var a=xe;xe=e;try{return t()}finally{xe=a}};$.unstable_scheduleCallback=function(e,t,a){var r=$.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?r+a:r):a=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=a+o,e={id:Xm++,callback:t,priorityLevel:e,startTime:a,expirationTime:o,sortIndex:-1},a>r?(e.sortIndex=a,Qn(Ut,e),Je(pt)===null&&e===Je(Ut)&&(Pr?($s(Mr),Mr=-1):Pr=!0,tu(Zn,a-r))):(e.sortIndex=o,Qn(pt,e),ga||Jo||(ga=!0,eu(Jn))),e};$.unstable_shouldYield=Qs;$.unstable_wrapCallback=function(e){var t=xe;return function(){var a=xe;xe=t;try{return e.apply(this,arguments)}finally{xe=a}}}});var Js=vt((fL,Zs)=>{"use strict";Zs.exports=Ys()});var op=vt(Ue=>{"use strict";/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Km=he(),Oe=Js();function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,a=1;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var nf=new Set,Qr={};function Ma(e,t){rr(e,t),rr(e+"Capture",t)}function rr(e,t){for(Qr[e]=t,e=0;e<t.length;e++)nf.add(t[e])}var Mt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Su=Object.prototype.hasOwnProperty,Qm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ed={},td={};function Ym(e){return Su.call(td,e)?!0:Su.call(ed,e)?!1:Qm.test(e)?td[e]=!0:(ed[e]=!0,!1)}function Zm(e,t,a,r){if(a!==null&&a.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:a!==null?!a.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Jm(e,t,a,r){if(t===null||typeof t>"u"||Zm(e,t,a,r))return!0;if(r)return!1;if(a!==null)switch(a.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function be(e,t,a,r,o,l,n){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=a,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=n}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new be(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];pe[t]=new be(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new be(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new be(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new be(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new be(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){pe[e]=new be(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){pe[e]=new be(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){pe[e]=new be(e,5,!1,e.toLowerCase(),null,!1,!1)});var hi=/[\-:]([a-z])/g;function xi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(hi,xi);pe[t]=new be(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(hi,xi);pe[t]=new be(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(hi,xi);pe[t]=new be(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new be(e,1,!1,e.toLowerCase(),null,!1,!1)});pe.xlinkHref=new be("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){pe[e]=new be(e,1,!1,e.toLowerCase(),null,!0,!0)});function Li(e,t,a,r){var o=pe.hasOwnProperty(t)?pe[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Jm(t,a,o,r)&&(a=null),r||o===null?Ym(t)&&(a===null?e.removeAttribute(t):e.setAttribute(t,""+a)):o.mustUseProperty?e[o.propertyName]=a===null?o.type===3?!1:"":a:(t=o.attributeName,r=o.attributeNamespace,a===null?e.removeAttribute(t):(o=o.type,a=o===3||o===4&&a===!0?"":""+a,r?e.setAttributeNS(r,t,a):e.setAttribute(t,a))))}var Tt=Km.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,tl=Symbol.for("react.element"),Ua=Symbol.for("react.portal"),Ha=Symbol.for("react.fragment"),Ii=Symbol.for("react.strict_mode"),ku=Symbol.for("react.profiler"),uf=Symbol.for("react.provider"),sf=Symbol.for("react.context"),yi=Symbol.for("react.forward_ref"),bu=Symbol.for("react.suspense"),Pu=Symbol.for("react.suspense_list"),Ci=Symbol.for("react.memo"),zt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var df=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var ad=Symbol.iterator;function Ar(e){return e===null||typeof e!="object"?null:(e=ad&&e[ad]||e["@@iterator"],typeof e=="function"?e:null)}var ae=Object.assign,au;function Or(e){if(au===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);au=t&&t[1]||""}return`
`+au+e}var ru=!1;function ou(e,t){if(!e||ru)return"";ru=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(s){var r=s}Reflect.construct(e,[],t)}else{try{t.call()}catch(s){r=s}e.call(t.prototype)}else{try{throw Error()}catch(s){r=s}e()}}catch(s){if(s&&r&&typeof s.stack=="string"){for(var o=s.stack.split(`
`),l=r.stack.split(`
`),n=o.length-1,u=l.length-1;1<=n&&0<=u&&o[n]!==l[u];)u--;for(;1<=n&&0<=u;n--,u--)if(o[n]!==l[u]){if(n!==1||u!==1)do if(n--,u--,0>u||o[n]!==l[u]){var i=`
`+o[n].replace(" at new "," at ");return e.displayName&&i.includes("<anonymous>")&&(i=i.replace("<anonymous>",e.displayName)),i}while(1<=n&&0<=u);break}}}finally{ru=!1,Error.prepareStackTrace=a}return(e=e?e.displayName||e.name:"")?Or(e):""}function eg(e){switch(e.tag){case 5:return Or(e.type);case 16:return Or("Lazy");case 13:return Or("Suspense");case 19:return Or("SuspenseList");case 0:case 2:case 15:return e=ou(e.type,!1),e;case 11:return e=ou(e.type.render,!1),e;case 1:return e=ou(e.type,!0),e;default:return""}}function Mu(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ha:return"Fragment";case Ua:return"Portal";case ku:return"Profiler";case Ii:return"StrictMode";case bu:return"Suspense";case Pu:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case sf:return(e.displayName||"Context")+".Consumer";case uf:return(e._context.displayName||"Context")+".Provider";case yi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ci:return t=e.displayName||null,t!==null?t:Mu(e.type)||"Memo";case zt:t=e._payload,e=e._init;try{return Mu(e(t))}catch{}}return null}function tg(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Mu(t);case 8:return t===Ii?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ta(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ff(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function ag(e){var t=ff(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var o=a.get,l=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(n){r=""+n,l.call(this,n)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return r},setValue:function(n){r=""+n},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function al(e){e._valueTracker||(e._valueTracker=ag(e))}function cf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),r="";return e&&(r=ff(e)?e.checked?"true":"false":e.value),e=r,e!==a?(t.setValue(e),!0):!1}function Rl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Au(e,t){var a=t.checked;return ae({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??e._wrapperState.initialChecked})}function rd(e,t){var a=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;a=ta(t.value!=null?t.value:a),e._wrapperState={initialChecked:r,initialValue:a,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pf(e,t){t=t.checked,t!=null&&Li(e,"checked",t,!1)}function Ru(e,t){pf(e,t);var a=ta(t.value),r=t.type;if(a!=null)r==="number"?(a===0&&e.value===""||e.value!=a)&&(e.value=""+a):e.value!==""+a&&(e.value=""+a);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Fu(e,t.type,a):t.hasOwnProperty("defaultValue")&&Fu(e,t.type,ta(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function od(e,t,a){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,a||t===e.value||(e.value=t),e.defaultValue=t}a=e.name,a!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,a!==""&&(e.name=a)}function Fu(e,t,a){(t!=="number"||Rl(e.ownerDocument)!==e)&&(a==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+a&&(e.defaultValue=""+a))}var Nr=Array.isArray;function Ya(e,t,a,r){if(e=e.options,t){t={};for(var o=0;o<a.length;o++)t["$"+a[o]]=!0;for(a=0;a<e.length;a++)o=t.hasOwnProperty("$"+e[a].value),e[a].selected!==o&&(e[a].selected=o),o&&r&&(e[a].defaultSelected=!0)}else{for(a=""+ta(a),t=null,o=0;o<e.length;o++){if(e[o].value===a){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Tu(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(y(91));return ae({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ld(e,t){var a=t.value;if(a==null){if(a=t.children,t=t.defaultValue,a!=null){if(t!=null)throw Error(y(92));if(Nr(a)){if(1<a.length)throw Error(y(93));a=a[0]}t=a}t==null&&(t=""),a=t}e._wrapperState={initialValue:ta(a)}}function mf(e,t){var a=ta(t.value),r=ta(t.defaultValue);a!=null&&(a=""+a,a!==e.value&&(e.value=a),t.defaultValue==null&&e.defaultValue!==a&&(e.defaultValue=a)),r!=null&&(e.defaultValue=""+r)}function nd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function gf(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Eu(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?gf(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var rl,hf=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,a,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,a,r,o)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(rl=rl||document.createElement("div"),rl.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=rl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Yr(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var zr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rg=["Webkit","ms","Moz","O"];Object.keys(zr).forEach(function(e){rg.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),zr[t]=zr[e]})});function xf(e,t,a){return t==null||typeof t=="boolean"||t===""?"":a||typeof t!="number"||t===0||zr.hasOwnProperty(e)&&zr[e]?(""+t).trim():t+"px"}function Lf(e,t){e=e.style;for(var a in t)if(t.hasOwnProperty(a)){var r=a.indexOf("--")===0,o=xf(a,t[a],r);a==="float"&&(a="cssFloat"),r?e.setProperty(a,o):e[a]=o}}var og=ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Du(e,t){if(t){if(og[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(y(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(y(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(y(61))}if(t.style!=null&&typeof t.style!="object")throw Error(y(62))}}function ju(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Bu=null;function vi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ou=null,Za=null,Ja=null;function ud(e){if(e=ho(e)){if(typeof Ou!="function")throw Error(y(280));var t=e.stateNode;t&&(t=on(t),Ou(e.stateNode,e.type,t))}}function If(e){Za?Ja?Ja.push(e):Ja=[e]:Za=e}function yf(){if(Za){var e=Za,t=Ja;if(Ja=Za=null,ud(e),t)for(e=0;e<t.length;e++)ud(t[e])}}function Cf(e,t){return e(t)}function vf(){}var lu=!1;function wf(e,t,a){if(lu)return e(t,a);lu=!0;try{return Cf(e,t,a)}finally{lu=!1,(Za!==null||Ja!==null)&&(vf(),yf())}}function Zr(e,t){var a=e.stateNode;if(a===null)return null;var r=on(a);if(r===null)return null;a=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(y(231,t,typeof a));return a}var Nu=!1;if(Mt)try{Oa={},Object.defineProperty(Oa,"passive",{get:function(){Nu=!0}}),window.addEventListener("test",Oa,Oa),window.removeEventListener("test",Oa,Oa)}catch{Nu=!1}var Oa;function lg(e,t,a,r,o,l,n,u,i){var s=Array.prototype.slice.call(arguments,3);try{t.apply(a,s)}catch(p){this.onError(p)}}var _r=!1,Fl=null,Tl=!1,Uu=null,ng={onError:function(e){_r=!0,Fl=e}};function ug(e,t,a,r,o,l,n,u,i){_r=!1,Fl=null,lg.apply(ng,arguments)}function ig(e,t,a,r,o,l,n,u,i){if(ug.apply(this,arguments),_r){if(_r){var s=Fl;_r=!1,Fl=null}else throw Error(y(198));Tl||(Tl=!0,Uu=s)}}function Aa(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function Sf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function id(e){if(Aa(e)!==e)throw Error(y(188))}function sg(e){var t=e.alternate;if(!t){if(t=Aa(e),t===null)throw Error(y(188));return t!==e?null:e}for(var a=e,r=t;;){var o=a.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){a=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===a)return id(o),e;if(l===r)return id(o),t;l=l.sibling}throw Error(y(188))}if(a.return!==r.return)a=o,r=l;else{for(var n=!1,u=o.child;u;){if(u===a){n=!0,a=o,r=l;break}if(u===r){n=!0,r=o,a=l;break}u=u.sibling}if(!n){for(u=l.child;u;){if(u===a){n=!0,a=l,r=o;break}if(u===r){n=!0,r=l,a=o;break}u=u.sibling}if(!n)throw Error(y(189))}}if(a.alternate!==r)throw Error(y(190))}if(a.tag!==3)throw Error(y(188));return a.stateNode.current===a?e:t}function kf(e){return e=sg(e),e!==null?bf(e):null}function bf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=bf(e);if(t!==null)return t;e=e.sibling}return null}var Pf=Oe.unstable_scheduleCallback,sd=Oe.unstable_cancelCallback,dg=Oe.unstable_shouldYield,fg=Oe.unstable_requestPaint,oe=Oe.unstable_now,cg=Oe.unstable_getCurrentPriorityLevel,wi=Oe.unstable_ImmediatePriority,Mf=Oe.unstable_UserBlockingPriority,El=Oe.unstable_NormalPriority,pg=Oe.unstable_LowPriority,Af=Oe.unstable_IdlePriority,en=null,xt=null;function mg(e){if(xt&&typeof xt.onCommitFiberRoot=="function")try{xt.onCommitFiberRoot(en,e,void 0,(e.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:xg,gg=Math.log,hg=Math.LN2;function xg(e){return e>>>=0,e===0?32:31-(gg(e)/hg|0)|0}var ol=64,ll=4194304;function Ur(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Dl(e,t){var a=e.pendingLanes;if(a===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,n=a&268435455;if(n!==0){var u=n&~o;u!==0?r=Ur(u):(l&=n,l!==0&&(r=Ur(l)))}else n=a&~o,n!==0?r=Ur(n):l!==0&&(r=Ur(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=a&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)a=31-ot(t),o=1<<a,r|=e[a],t&=~o;return r}function Lg(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ig(e,t){for(var a=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var n=31-ot(l),u=1<<n,i=o[n];i===-1?((u&a)===0||(u&r)!==0)&&(o[n]=Lg(u,t)):i<=t&&(e.expiredLanes|=u),l&=~u}}function Hu(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Rf(){var e=ol;return ol<<=1,(ol&4194240)===0&&(ol=64),e}function nu(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function mo(e,t,a){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ot(t),e[t]=a}function yg(e,t){var a=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<a;){var o=31-ot(a),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,a&=~l}}function Si(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var r=31-ot(a),o=1<<r;o&t|e[r]&t&&(e[r]|=t),a&=~o}}var q=0;function Ff(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Tf,ki,Ef,Df,jf,zu=!1,nl=[],$t=null,Xt=null,Kt=null,Jr=new Map,eo=new Map,qt=[],Cg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dd(e,t){switch(e){case"focusin":case"focusout":$t=null;break;case"dragenter":case"dragleave":Xt=null;break;case"mouseover":case"mouseout":Kt=null;break;case"pointerover":case"pointerout":Jr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":eo.delete(t.pointerId)}}function Rr(e,t,a,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:a,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=ho(t),t!==null&&ki(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function vg(e,t,a,r,o){switch(t){case"focusin":return $t=Rr($t,e,t,a,r,o),!0;case"dragenter":return Xt=Rr(Xt,e,t,a,r,o),!0;case"mouseover":return Kt=Rr(Kt,e,t,a,r,o),!0;case"pointerover":var l=o.pointerId;return Jr.set(l,Rr(Jr.get(l)||null,e,t,a,r,o)),!0;case"gotpointercapture":return l=o.pointerId,eo.set(l,Rr(eo.get(l)||null,e,t,a,r,o)),!0}return!1}function Bf(e){var t=La(e.target);if(t!==null){var a=Aa(t);if(a!==null){if(t=a.tag,t===13){if(t=Sf(a),t!==null){e.blockedOn=t,jf(e.priority,function(){Ef(a)});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function yl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=_u(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);Bu=r,a.target.dispatchEvent(r),Bu=null}else return t=ho(a),t!==null&&ki(t),e.blockedOn=a,!1;t.shift()}return!0}function fd(e,t,a){yl(e)&&a.delete(t)}function wg(){zu=!1,$t!==null&&yl($t)&&($t=null),Xt!==null&&yl(Xt)&&(Xt=null),Kt!==null&&yl(Kt)&&(Kt=null),Jr.forEach(fd),eo.forEach(fd)}function Fr(e,t){e.blockedOn===t&&(e.blockedOn=null,zu||(zu=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,wg)))}function to(e){function t(o){return Fr(o,e)}if(0<nl.length){Fr(nl[0],e);for(var a=1;a<nl.length;a++){var r=nl[a];r.blockedOn===e&&(r.blockedOn=null)}}for($t!==null&&Fr($t,e),Xt!==null&&Fr(Xt,e),Kt!==null&&Fr(Kt,e),Jr.forEach(t),eo.forEach(t),a=0;a<qt.length;a++)r=qt[a],r.blockedOn===e&&(r.blockedOn=null);for(;0<qt.length&&(a=qt[0],a.blockedOn===null);)Bf(a),a.blockedOn===null&&qt.shift()}var er=Tt.ReactCurrentBatchConfig,jl=!0;function Sg(e,t,a,r){var o=q,l=er.transition;er.transition=null;try{q=1,bi(e,t,a,r)}finally{q=o,er.transition=l}}function kg(e,t,a,r){var o=q,l=er.transition;er.transition=null;try{q=4,bi(e,t,a,r)}finally{q=o,er.transition=l}}function bi(e,t,a,r){if(jl){var o=_u(e,t,a,r);if(o===null)pu(e,t,r,Bl,a),dd(e,r);else if(vg(o,e,t,a,r))r.stopPropagation();else if(dd(e,r),t&4&&-1<Cg.indexOf(e)){for(;o!==null;){var l=ho(o);if(l!==null&&Tf(l),l=_u(e,t,a,r),l===null&&pu(e,t,r,Bl,a),l===o)break;o=l}o!==null&&r.stopPropagation()}else pu(e,t,r,null,a)}}var Bl=null;function _u(e,t,a,r){if(Bl=null,e=vi(r),e=La(e),e!==null)if(t=Aa(e),t===null)e=null;else if(a=t.tag,a===13){if(e=Sf(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Bl=e,null}function Of(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(cg()){case wi:return 1;case Mf:return 4;case El:case pg:return 16;case Af:return 536870912;default:return 16}default:return 16}}var Vt=null,Pi=null,Cl=null;function Nf(){if(Cl)return Cl;var e,t=Pi,a=t.length,r,o="value"in Vt?Vt.value:Vt.textContent,l=o.length;for(e=0;e<a&&t[e]===o[e];e++);var n=a-e;for(r=1;r<=n&&t[a-r]===o[l-r];r++);return Cl=o.slice(e,1<r?1-r:void 0)}function vl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ul(){return!0}function cd(){return!1}function Ne(e){function t(a,r,o,l,n){this._reactName=a,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=n,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(a=e[u],this[u]=a?a(l):l[u]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?ul:cd,this.isPropagationStopped=cd,this}return ae(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ul)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ul)},persist:function(){},isPersistent:ul}),t}var dr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Mi=Ne(dr),go=ae({},dr,{view:0,detail:0}),bg=Ne(go),uu,iu,Tr,tn=ae({},go,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ai,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Tr&&(Tr&&e.type==="mousemove"?(uu=e.screenX-Tr.screenX,iu=e.screenY-Tr.screenY):iu=uu=0,Tr=e),uu)},movementY:function(e){return"movementY"in e?e.movementY:iu}}),pd=Ne(tn),Pg=ae({},tn,{dataTransfer:0}),Mg=Ne(Pg),Ag=ae({},go,{relatedTarget:0}),su=Ne(Ag),Rg=ae({},dr,{animationName:0,elapsedTime:0,pseudoElement:0}),Fg=Ne(Rg),Tg=ae({},dr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Eg=Ne(Tg),Dg=ae({},dr,{data:0}),md=Ne(Dg),jg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Og={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ng(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Og[e])?!!t[e]:!1}function Ai(){return Ng}var Ug=ae({},go,{key:function(e){if(e.key){var t=jg[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=vl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bg[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ai,charCode:function(e){return e.type==="keypress"?vl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?vl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Hg=Ne(Ug),zg=ae({},tn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gd=Ne(zg),_g=ae({},go,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ai}),qg=Ne(_g),Gg=ae({},dr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Vg=Ne(Gg),Wg=ae({},tn,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),$g=Ne(Wg),Xg=[9,13,27,32],Ri=Mt&&"CompositionEvent"in window,qr=null;Mt&&"documentMode"in document&&(qr=document.documentMode);var Kg=Mt&&"TextEvent"in window&&!qr,Uf=Mt&&(!Ri||qr&&8<qr&&11>=qr),hd=" ",xd=!1;function Hf(e,t){switch(e){case"keyup":return Xg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function zf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var za=!1;function Qg(e,t){switch(e){case"compositionend":return zf(t);case"keypress":return t.which!==32?null:(xd=!0,hd);case"textInput":return e=t.data,e===hd&&xd?null:e;default:return null}}function Yg(e,t){if(za)return e==="compositionend"||!Ri&&Hf(e,t)?(e=Nf(),Cl=Pi=Vt=null,za=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Uf&&t.locale!=="ko"?null:t.data;default:return null}}var Zg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ld(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Zg[e.type]:t==="textarea"}function _f(e,t,a,r){If(r),t=Ol(t,"onChange"),0<t.length&&(a=new Mi("onChange","change",null,a,r),e.push({event:a,listeners:t}))}var Gr=null,ao=null;function Jg(e){Jf(e,0)}function an(e){var t=Ga(e);if(cf(t))return e}function eh(e,t){if(e==="change")return t}var qf=!1;Mt&&(Mt?(sl="oninput"in document,sl||(du=document.createElement("div"),du.setAttribute("oninput","return;"),sl=typeof du.oninput=="function"),il=sl):il=!1,qf=il&&(!document.documentMode||9<document.documentMode));var il,sl,du;function Id(){Gr&&(Gr.detachEvent("onpropertychange",Gf),ao=Gr=null)}function Gf(e){if(e.propertyName==="value"&&an(ao)){var t=[];_f(t,ao,e,vi(e)),wf(Jg,t)}}function th(e,t,a){e==="focusin"?(Id(),Gr=t,ao=a,Gr.attachEvent("onpropertychange",Gf)):e==="focusout"&&Id()}function ah(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return an(ao)}function rh(e,t){if(e==="click")return an(t)}function oh(e,t){if(e==="input"||e==="change")return an(t)}function lh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var nt=typeof Object.is=="function"?Object.is:lh;function ro(e,t){if(nt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),r=Object.keys(t);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var o=a[r];if(!Su.call(t,o)||!nt(e[o],t[o]))return!1}return!0}function yd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Cd(e,t){var a=yd(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=t&&r>=t)return{node:a,offset:t-e};e=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=yd(a)}}function Vf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Wf(){for(var e=window,t=Rl();t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=Rl(e.document)}return t}function Fi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function nh(e){var t=Wf(),a=e.focusedElem,r=e.selectionRange;if(t!==a&&a&&a.ownerDocument&&Vf(a.ownerDocument.documentElement,a)){if(r!==null&&Fi(a)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in a)a.selectionStart=t,a.selectionEnd=Math.min(e,a.value.length);else if(e=(t=a.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=a.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Cd(a,l);var n=Cd(a,r);o&&n&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==n.node||e.focusOffset!==n.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(n.node,n.offset)):(t.setEnd(n.node,n.offset),e.addRange(t)))}}for(t=[],e=a;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<t.length;a++)e=t[a],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var uh=Mt&&"documentMode"in document&&11>=document.documentMode,_a=null,qu=null,Vr=null,Gu=!1;function vd(e,t,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Gu||_a==null||_a!==Rl(r)||(r=_a,"selectionStart"in r&&Fi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Vr&&ro(Vr,r)||(Vr=r,r=Ol(qu,"onSelect"),0<r.length&&(t=new Mi("onSelect","select",null,t,a),e.push({event:t,listeners:r}),t.target=_a)))}function dl(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var qa={animationend:dl("Animation","AnimationEnd"),animationiteration:dl("Animation","AnimationIteration"),animationstart:dl("Animation","AnimationStart"),transitionend:dl("Transition","TransitionEnd")},fu={},$f={};Mt&&($f=document.createElement("div").style,"AnimationEvent"in window||(delete qa.animationend.animation,delete qa.animationiteration.animation,delete qa.animationstart.animation),"TransitionEvent"in window||delete qa.transitionend.transition);function rn(e){if(fu[e])return fu[e];if(!qa[e])return e;var t=qa[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in $f)return fu[e]=t[a];return e}var Xf=rn("animationend"),Kf=rn("animationiteration"),Qf=rn("animationstart"),Yf=rn("transitionend"),Zf=new Map,wd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ra(e,t){Zf.set(e,t),Ma(t,[e])}for(fl=0;fl<wd.length;fl++)cl=wd[fl],Sd=cl.toLowerCase(),kd=cl[0].toUpperCase()+cl.slice(1),ra(Sd,"on"+kd);var cl,Sd,kd,fl;ra(Xf,"onAnimationEnd");ra(Kf,"onAnimationIteration");ra(Qf,"onAnimationStart");ra("dblclick","onDoubleClick");ra("focusin","onFocus");ra("focusout","onBlur");ra(Yf,"onTransitionEnd");rr("onMouseEnter",["mouseout","mouseover"]);rr("onMouseLeave",["mouseout","mouseover"]);rr("onPointerEnter",["pointerout","pointerover"]);rr("onPointerLeave",["pointerout","pointerover"]);Ma("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ma("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ma("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ma("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ma("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ma("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Hr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ih=new Set("cancel close invalid load scroll toggle".split(" ").concat(Hr));function bd(e,t,a){var r=e.type||"unknown-event";e.currentTarget=a,ig(r,t,void 0,e),e.currentTarget=null}function Jf(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var n=r.length-1;0<=n;n--){var u=r[n],i=u.instance,s=u.currentTarget;if(u=u.listener,i!==l&&o.isPropagationStopped())break e;bd(o,u,s),l=i}else for(n=0;n<r.length;n++){if(u=r[n],i=u.instance,s=u.currentTarget,u=u.listener,i!==l&&o.isPropagationStopped())break e;bd(o,u,s),l=i}}}if(Tl)throw e=Uu,Tl=!1,Uu=null,e}function K(e,t){var a=t[Ku];a===void 0&&(a=t[Ku]=new Set);var r=e+"__bubble";a.has(r)||(ec(t,e,2,!1),a.add(r))}function cu(e,t,a){var r=0;t&&(r|=4),ec(a,e,r,t)}var pl="_reactListening"+Math.random().toString(36).slice(2);function oo(e){if(!e[pl]){e[pl]=!0,nf.forEach(function(a){a!=="selectionchange"&&(ih.has(a)||cu(a,!1,e),cu(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[pl]||(t[pl]=!0,cu("selectionchange",!1,t))}}function ec(e,t,a,r){switch(Of(t)){case 1:var o=Sg;break;case 4:o=kg;break;default:o=bi}a=o.bind(null,t,a,e),o=void 0,!Nu||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,a,{capture:!0,passive:o}):e.addEventListener(t,a,!0):o!==void 0?e.addEventListener(t,a,{passive:o}):e.addEventListener(t,a,!1)}function pu(e,t,a,r,o){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var n=r.tag;if(n===3||n===4){var u=r.stateNode.containerInfo;if(u===o||u.nodeType===8&&u.parentNode===o)break;if(n===4)for(n=r.return;n!==null;){var i=n.tag;if((i===3||i===4)&&(i=n.stateNode.containerInfo,i===o||i.nodeType===8&&i.parentNode===o))return;n=n.return}for(;u!==null;){if(n=La(u),n===null)return;if(i=n.tag,i===5||i===6){r=l=n;continue e}u=u.parentNode}}r=r.return}wf(function(){var s=l,p=vi(a),m=[];e:{var g=Zf.get(e);if(g!==void 0){var h=Mi,C=e;switch(e){case"keypress":if(vl(a)===0)break e;case"keydown":case"keyup":h=Hg;break;case"focusin":C="focus",h=su;break;case"focusout":C="blur",h=su;break;case"beforeblur":case"afterblur":h=su;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=pd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Mg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=qg;break;case Xf:case Kf:case Qf:h=Fg;break;case Yf:h=Vg;break;case"scroll":h=bg;break;case"wheel":h=$g;break;case"copy":case"cut":case"paste":h=Eg;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=gd}var I=(t&4)!==0,D=!I&&e==="scroll",f=I?g!==null?g+"Capture":null:g;I=[];for(var d=s,c;d!==null;){c=d;var x=c.stateNode;if(c.tag===5&&x!==null&&(c=x,f!==null&&(x=Zr(d,f),x!=null&&I.push(lo(d,x,c)))),D)break;d=d.return}0<I.length&&(g=new h(g,C,null,a,p),m.push({event:g,listeners:I}))}}if((t&7)===0){e:{if(g=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",g&&a!==Bu&&(C=a.relatedTarget||a.fromElement)&&(La(C)||C[At]))break e;if((h||g)&&(g=p.window===p?p:(g=p.ownerDocument)?g.defaultView||g.parentWindow:window,h?(C=a.relatedTarget||a.toElement,h=s,C=C?La(C):null,C!==null&&(D=Aa(C),C!==D||C.tag!==5&&C.tag!==6)&&(C=null)):(h=null,C=s),h!==C)){if(I=pd,x="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(I=gd,x="onPointerLeave",f="onPointerEnter",d="pointer"),D=h==null?g:Ga(h),c=C==null?g:Ga(C),g=new I(x,d+"leave",h,a,p),g.target=D,g.relatedTarget=c,x=null,La(p)===s&&(I=new I(f,d+"enter",C,a,p),I.target=c,I.relatedTarget=D,x=I),D=x,h&&C)t:{for(I=h,f=C,d=0,c=I;c;c=Na(c))d++;for(c=0,x=f;x;x=Na(x))c++;for(;0<d-c;)I=Na(I),d--;for(;0<c-d;)f=Na(f),c--;for(;d--;){if(I===f||f!==null&&I===f.alternate)break t;I=Na(I),f=Na(f)}I=null}else I=null;h!==null&&Pd(m,g,h,I,!1),C!==null&&D!==null&&Pd(m,D,C,I,!0)}}e:{if(g=s?Ga(s):window,h=g.nodeName&&g.nodeName.toLowerCase(),h==="select"||h==="input"&&g.type==="file")var w=eh;else if(Ld(g))if(qf)w=oh;else{w=ah;var S=th}else(h=g.nodeName)&&h.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(w=rh);if(w&&(w=w(e,s))){_f(m,w,a,p);break e}S&&S(e,g,s),e==="focusout"&&(S=g._wrapperState)&&S.controlled&&g.type==="number"&&Fu(g,"number",g.value)}switch(S=s?Ga(s):window,e){case"focusin":(Ld(S)||S.contentEditable==="true")&&(_a=S,qu=s,Vr=null);break;case"focusout":Vr=qu=_a=null;break;case"mousedown":Gu=!0;break;case"contextmenu":case"mouseup":case"dragend":Gu=!1,vd(m,a,p);break;case"selectionchange":if(uh)break;case"keydown":case"keyup":vd(m,a,p)}var k;if(Ri)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else za?Hf(e,a)&&(P="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(P="onCompositionStart");P&&(Uf&&a.locale!=="ko"&&(za||P!=="onCompositionStart"?P==="onCompositionEnd"&&za&&(k=Nf()):(Vt=p,Pi="value"in Vt?Vt.value:Vt.textContent,za=!0)),S=Ol(s,P),0<S.length&&(P=new md(P,e,null,a,p),m.push({event:P,listeners:S}),k?P.data=k:(k=zf(a),k!==null&&(P.data=k)))),(k=Kg?Qg(e,a):Yg(e,a))&&(s=Ol(s,"onBeforeInput"),0<s.length&&(p=new md("onBeforeInput","beforeinput",null,a,p),m.push({event:p,listeners:s}),p.data=k))}Jf(m,t)})}function lo(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Ol(e,t){for(var a=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=Zr(e,a),l!=null&&r.unshift(lo(e,l,o)),l=Zr(e,t),l!=null&&r.push(lo(e,l,o))),e=e.return}return r}function Na(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Pd(e,t,a,r,o){for(var l=t._reactName,n=[];a!==null&&a!==r;){var u=a,i=u.alternate,s=u.stateNode;if(i!==null&&i===r)break;u.tag===5&&s!==null&&(u=s,o?(i=Zr(a,l),i!=null&&n.unshift(lo(a,i,u))):o||(i=Zr(a,l),i!=null&&n.push(lo(a,i,u)))),a=a.return}n.length!==0&&e.push({event:t,listeners:n})}var sh=/\r\n?/g,dh=/\u0000|\uFFFD/g;function Md(e){return(typeof e=="string"?e:""+e).replace(sh,`
`).replace(dh,"")}function ml(e,t,a){if(t=Md(t),Md(e)!==t&&a)throw Error(y(425))}function Nl(){}var Vu=null,Wu=null;function $u(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Xu=typeof setTimeout=="function"?setTimeout:void 0,fh=typeof clearTimeout=="function"?clearTimeout:void 0,Ad=typeof Promise=="function"?Promise:void 0,ch=typeof queueMicrotask=="function"?queueMicrotask:typeof Ad<"u"?function(e){return Ad.resolve(null).then(e).catch(ph)}:Xu;function ph(e){setTimeout(function(){throw e})}function mu(e,t){var a=t,r=0;do{var o=a.nextSibling;if(e.removeChild(a),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(r===0){e.removeChild(o),to(t);return}r--}else a!=="$"&&a!=="$?"&&a!=="$!"||r++;a=o}while(a);to(t)}function Qt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Rd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}var fr=Math.random().toString(36).slice(2),ht="__reactFiber$"+fr,no="__reactProps$"+fr,At="__reactContainer$"+fr,Ku="__reactEvents$"+fr,mh="__reactListeners$"+fr,gh="__reactHandles$"+fr;function La(e){var t=e[ht];if(t)return t;for(var a=e.parentNode;a;){if(t=a[At]||a[ht]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=Rd(e);e!==null;){if(a=e[ht])return a;e=Rd(e)}return t}e=a,a=e.parentNode}return null}function ho(e){return e=e[ht]||e[At],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ga(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(y(33))}function on(e){return e[no]||null}var Qu=[],Va=-1;function oa(e){return{current:e}}function Q(e){0>Va||(e.current=Qu[Va],Qu[Va]=null,Va--)}function X(e,t){Va++,Qu[Va]=e.current,e.current=t}var aa={},Ce=oa(aa),Ae=oa(!1),wa=aa;function or(e,t){var a=e.type.contextTypes;if(!a)return aa;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in a)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Re(e){return e=e.childContextTypes,e!=null}function Ul(){Q(Ae),Q(Ce)}function Fd(e,t,a){if(Ce.current!==aa)throw Error(y(168));X(Ce,t),X(Ae,a)}function tc(e,t,a){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return a;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(y(108,tg(e)||"Unknown",o));return ae({},a,r)}function Hl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||aa,wa=Ce.current,X(Ce,e),X(Ae,Ae.current),!0}function Td(e,t,a){var r=e.stateNode;if(!r)throw Error(y(169));a?(e=tc(e,t,wa),r.__reactInternalMemoizedMergedChildContext=e,Q(Ae),Q(Ce),X(Ce,e)):Q(Ae),X(Ae,a)}var St=null,ln=!1,gu=!1;function ac(e){St===null?St=[e]:St.push(e)}function hh(e){ln=!0,ac(e)}function la(){if(!gu&&St!==null){gu=!0;var e=0,t=q;try{var a=St;for(q=1;e<a.length;e++){var r=a[e];do r=r(!0);while(r!==null)}St=null,ln=!1}catch(o){throw St!==null&&(St=St.slice(e+1)),Pf(wi,la),o}finally{q=t,gu=!1}}return null}var Wa=[],$a=0,zl=null,_l=0,Ve=[],We=0,Sa=null,kt=1,bt="";function ha(e,t){Wa[$a++]=_l,Wa[$a++]=zl,zl=e,_l=t}function rc(e,t,a){Ve[We++]=kt,Ve[We++]=bt,Ve[We++]=Sa,Sa=e;var r=kt;e=bt;var o=32-ot(r)-1;r&=~(1<<o),a+=1;var l=32-ot(t)+o;if(30<l){var n=o-o%5;l=(r&(1<<n)-1).toString(32),r>>=n,o-=n,kt=1<<32-ot(t)+o|a<<o|r,bt=l+e}else kt=1<<l|a<<o|r,bt=e}function Ti(e){e.return!==null&&(ha(e,1),rc(e,1,0))}function Ei(e){for(;e===zl;)zl=Wa[--$a],Wa[$a]=null,_l=Wa[--$a],Wa[$a]=null;for(;e===Sa;)Sa=Ve[--We],Ve[We]=null,bt=Ve[--We],Ve[We]=null,kt=Ve[--We],Ve[We]=null}var Be=null,je=null,J=!1,rt=null;function oc(e,t){var a=$e(5,null,null,0);a.elementType="DELETED",a.stateNode=t,a.return=e,t=e.deletions,t===null?(e.deletions=[a],e.flags|=16):t.push(a)}function Ed(e,t){switch(e.tag){case 5:var a=e.type;return t=t.nodeType!==1||a.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Be=e,je=Qt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Be=e,je=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(a=Sa!==null?{id:kt,overflow:bt}:null,e.memoizedState={dehydrated:t,treeContext:a,retryLane:1073741824},a=$e(18,null,null,0),a.stateNode=t,a.return=e,e.child=a,Be=e,je=null,!0):!1;default:return!1}}function Yu(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Zu(e){if(J){var t=je;if(t){var a=t;if(!Ed(e,t)){if(Yu(e))throw Error(y(418));t=Qt(a.nextSibling);var r=Be;t&&Ed(e,t)?oc(r,a):(e.flags=e.flags&-4097|2,J=!1,Be=e)}}else{if(Yu(e))throw Error(y(418));e.flags=e.flags&-4097|2,J=!1,Be=e}}}function Dd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Be=e}function gl(e){if(e!==Be)return!1;if(!J)return Dd(e),J=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!$u(e.type,e.memoizedProps)),t&&(t=je)){if(Yu(e))throw lc(),Error(y(418));for(;t;)oc(e,t),t=Qt(t.nextSibling)}if(Dd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(y(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"){if(t===0){je=Qt(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++}e=e.nextSibling}je=null}}else je=Be?Qt(e.stateNode.nextSibling):null;return!0}function lc(){for(var e=je;e;)e=Qt(e.nextSibling)}function lr(){je=Be=null,J=!1}function Di(e){rt===null?rt=[e]:rt.push(e)}var xh=Tt.ReactCurrentBatchConfig;function Er(e,t,a){if(e=a.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(y(309));var r=a.stateNode}if(!r)throw Error(y(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(n){var u=o.refs;n===null?delete u[l]:u[l]=n},t._stringRef=l,t)}if(typeof e!="string")throw Error(y(284));if(!a._owner)throw Error(y(290,e))}return e}function hl(e,t){throw e=Object.prototype.toString.call(t),Error(y(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function jd(e){var t=e._init;return t(e._payload)}function nc(e){function t(f,d){if(e){var c=f.deletions;c===null?(f.deletions=[d],f.flags|=16):c.push(d)}}function a(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function r(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function o(f,d){return f=ea(f,d),f.index=0,f.sibling=null,f}function l(f,d,c){return f.index=c,e?(c=f.alternate,c!==null?(c=c.index,c<d?(f.flags|=2,d):c):(f.flags|=2,d)):(f.flags|=1048576,d)}function n(f){return e&&f.alternate===null&&(f.flags|=2),f}function u(f,d,c,x){return d===null||d.tag!==6?(d=vu(c,f.mode,x),d.return=f,d):(d=o(d,c),d.return=f,d)}function i(f,d,c,x){var w=c.type;return w===Ha?p(f,d,c.props.children,x,c.key):d!==null&&(d.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===zt&&jd(w)===d.type)?(x=o(d,c.props),x.ref=Er(f,d,c),x.return=f,x):(x=Al(c.type,c.key,c.props,null,f.mode,x),x.ref=Er(f,d,c),x.return=f,x)}function s(f,d,c,x){return d===null||d.tag!==4||d.stateNode.containerInfo!==c.containerInfo||d.stateNode.implementation!==c.implementation?(d=wu(c,f.mode,x),d.return=f,d):(d=o(d,c.children||[]),d.return=f,d)}function p(f,d,c,x,w){return d===null||d.tag!==7?(d=va(c,f.mode,x,w),d.return=f,d):(d=o(d,c),d.return=f,d)}function m(f,d,c){if(typeof d=="string"&&d!==""||typeof d=="number")return d=vu(""+d,f.mode,c),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case tl:return c=Al(d.type,d.key,d.props,null,f.mode,c),c.ref=Er(f,null,d),c.return=f,c;case Ua:return d=wu(d,f.mode,c),d.return=f,d;case zt:var x=d._init;return m(f,x(d._payload),c)}if(Nr(d)||Ar(d))return d=va(d,f.mode,c,null),d.return=f,d;hl(f,d)}return null}function g(f,d,c,x){var w=d!==null?d.key:null;if(typeof c=="string"&&c!==""||typeof c=="number")return w!==null?null:u(f,d,""+c,x);if(typeof c=="object"&&c!==null){switch(c.$$typeof){case tl:return c.key===w?i(f,d,c,x):null;case Ua:return c.key===w?s(f,d,c,x):null;case zt:return w=c._init,g(f,d,w(c._payload),x)}if(Nr(c)||Ar(c))return w!==null?null:p(f,d,c,x,null);hl(f,c)}return null}function h(f,d,c,x,w){if(typeof x=="string"&&x!==""||typeof x=="number")return f=f.get(c)||null,u(d,f,""+x,w);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case tl:return f=f.get(x.key===null?c:x.key)||null,i(d,f,x,w);case Ua:return f=f.get(x.key===null?c:x.key)||null,s(d,f,x,w);case zt:var S=x._init;return h(f,d,c,S(x._payload),w)}if(Nr(x)||Ar(x))return f=f.get(c)||null,p(d,f,x,w,null);hl(d,x)}return null}function C(f,d,c,x){for(var w=null,S=null,k=d,P=d=0,O=null;k!==null&&P<c.length;P++){k.index>P?(O=k,k=null):O=k.sibling;var R=g(f,k,c[P],x);if(R===null){k===null&&(k=O);break}e&&k&&R.alternate===null&&t(f,k),d=l(R,d,P),S===null?w=R:S.sibling=R,S=R,k=O}if(P===c.length)return a(f,k),J&&ha(f,P),w;if(k===null){for(;P<c.length;P++)k=m(f,c[P],x),k!==null&&(d=l(k,d,P),S===null?w=k:S.sibling=k,S=k);return J&&ha(f,P),w}for(k=r(f,k);P<c.length;P++)O=h(k,f,P,c[P],x),O!==null&&(e&&O.alternate!==null&&k.delete(O.key===null?P:O.key),d=l(O,d,P),S===null?w=O:S.sibling=O,S=O);return e&&k.forEach(function(ve){return t(f,ve)}),J&&ha(f,P),w}function I(f,d,c,x){var w=Ar(c);if(typeof w!="function")throw Error(y(150));if(c=w.call(c),c==null)throw Error(y(151));for(var S=w=null,k=d,P=d=0,O=null,R=c.next();k!==null&&!R.done;P++,R=c.next()){k.index>P?(O=k,k=null):O=k.sibling;var ve=g(f,k,R.value,x);if(ve===null){k===null&&(k=O);break}e&&k&&ve.alternate===null&&t(f,k),d=l(ve,d,P),S===null?w=ve:S.sibling=ve,S=ve,k=O}if(R.done)return a(f,k),J&&ha(f,P),w;if(k===null){for(;!R.done;P++,R=c.next())R=m(f,R.value,x),R!==null&&(d=l(R,d,P),S===null?w=R:S.sibling=R,S=R);return J&&ha(f,P),w}for(k=r(f,k);!R.done;P++,R=c.next())R=h(k,f,P,R.value,x),R!==null&&(e&&R.alternate!==null&&k.delete(R.key===null?P:R.key),d=l(R,d,P),S===null?w=R:S.sibling=R,S=R);return e&&k.forEach(function(Dt){return t(f,Dt)}),J&&ha(f,P),w}function D(f,d,c,x){if(typeof c=="object"&&c!==null&&c.type===Ha&&c.key===null&&(c=c.props.children),typeof c=="object"&&c!==null){switch(c.$$typeof){case tl:e:{for(var w=c.key,S=d;S!==null;){if(S.key===w){if(w=c.type,w===Ha){if(S.tag===7){a(f,S.sibling),d=o(S,c.props.children),d.return=f,f=d;break e}}else if(S.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===zt&&jd(w)===S.type){a(f,S.sibling),d=o(S,c.props),d.ref=Er(f,S,c),d.return=f,f=d;break e}a(f,S);break}else t(f,S);S=S.sibling}c.type===Ha?(d=va(c.props.children,f.mode,x,c.key),d.return=f,f=d):(x=Al(c.type,c.key,c.props,null,f.mode,x),x.ref=Er(f,d,c),x.return=f,f=x)}return n(f);case Ua:e:{for(S=c.key;d!==null;){if(d.key===S)if(d.tag===4&&d.stateNode.containerInfo===c.containerInfo&&d.stateNode.implementation===c.implementation){a(f,d.sibling),d=o(d,c.children||[]),d.return=f,f=d;break e}else{a(f,d);break}else t(f,d);d=d.sibling}d=wu(c,f.mode,x),d.return=f,f=d}return n(f);case zt:return S=c._init,D(f,d,S(c._payload),x)}if(Nr(c))return C(f,d,c,x);if(Ar(c))return I(f,d,c,x);hl(f,c)}return typeof c=="string"&&c!==""||typeof c=="number"?(c=""+c,d!==null&&d.tag===6?(a(f,d.sibling),d=o(d,c),d.return=f,f=d):(a(f,d),d=vu(c,f.mode,x),d.return=f,f=d),n(f)):a(f,d)}return D}var nr=nc(!0),uc=nc(!1),ql=oa(null),Gl=null,Xa=null,ji=null;function Bi(){ji=Xa=Gl=null}function Oi(e){var t=ql.current;Q(ql),e._currentValue=t}function Ju(e,t,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===a)break;e=e.return}}function tr(e,t){Gl=e,ji=Xa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Me=!0),e.firstContext=null)}function Ke(e){var t=e._currentValue;if(ji!==e)if(e={context:e,memoizedValue:t,next:null},Xa===null){if(Gl===null)throw Error(y(308));Xa=e,Gl.dependencies={lanes:0,firstContext:e}}else Xa=Xa.next=e;return t}var Ia=null;function Ni(e){Ia===null?Ia=[e]:Ia.push(e)}function ic(e,t,a,r){var o=t.interleaved;return o===null?(a.next=a,Ni(t)):(a.next=o.next,o.next=a),t.interleaved=a,Rt(e,r)}function Rt(e,t){e.lanes|=t;var a=e.alternate;for(a!==null&&(a.lanes|=t),a=e,e=e.return;e!==null;)e.childLanes|=t,a=e.alternate,a!==null&&(a.childLanes|=t),a=e,e=e.return;return a.tag===3?a.stateNode:null}var _t=!1;function Ui(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function sc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Pt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Yt(e,t,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(j&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Rt(e,a)}return o=r.interleaved,o===null?(t.next=t,Ni(r)):(t.next=o.next,o.next=t),r.interleaved=t,Rt(e,a)}function wl(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,a|=r,t.lanes=a,Si(e,a)}}function Bd(e,t){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var o=null,l=null;if(a=a.firstBaseUpdate,a!==null){do{var n={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};l===null?o=l=n:l=l.next=n,a=a.next}while(a!==null);l===null?o=l=t:l=l.next=t}else o=l=t;a={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}function Vl(e,t,a,r){var o=e.updateQueue;_t=!1;var l=o.firstBaseUpdate,n=o.lastBaseUpdate,u=o.shared.pending;if(u!==null){o.shared.pending=null;var i=u,s=i.next;i.next=null,n===null?l=s:n.next=s,n=i;var p=e.alternate;p!==null&&(p=p.updateQueue,u=p.lastBaseUpdate,u!==n&&(u===null?p.firstBaseUpdate=s:u.next=s,p.lastBaseUpdate=i))}if(l!==null){var m=o.baseState;n=0,p=s=i=null,u=l;do{var g=u.lane,h=u.eventTime;if((r&g)===g){p!==null&&(p=p.next={eventTime:h,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var C=e,I=u;switch(g=t,h=a,I.tag){case 1:if(C=I.payload,typeof C=="function"){m=C.call(h,m,g);break e}m=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=I.payload,g=typeof C=="function"?C.call(h,m,g):C,g==null)break e;m=ae({},m,g);break e;case 2:_t=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[u]:g.push(u))}else h={eventTime:h,lane:g,tag:u.tag,payload:u.payload,callback:u.callback,next:null},p===null?(s=p=h,i=m):p=p.next=h,n|=g;if(u=u.next,u===null){if(u=o.shared.pending,u===null)break;g=u,u=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(p===null&&(i=m),o.baseState=i,o.firstBaseUpdate=s,o.lastBaseUpdate=p,t=o.shared.interleaved,t!==null){o=t;do n|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);ba|=n,e.lanes=n,e.memoizedState=m}}function Od(e,t,a){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=a,typeof o!="function")throw Error(y(191,o));o.call(r)}}}var xo={},Lt=oa(xo),uo=oa(xo),io=oa(xo);function ya(e){if(e===xo)throw Error(y(174));return e}function Hi(e,t){switch(X(io,t),X(uo,e),X(Lt,xo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Eu(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Eu(t,e)}Q(Lt),X(Lt,t)}function ur(){Q(Lt),Q(uo),Q(io)}function dc(e){ya(io.current);var t=ya(Lt.current),a=Eu(t,e.type);t!==a&&(X(uo,e),X(Lt,a))}function zi(e){uo.current===e&&(Q(Lt),Q(uo))}var ee=oa(0);function Wl(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var hu=[];function _i(){for(var e=0;e<hu.length;e++)hu[e]._workInProgressVersionPrimary=null;hu.length=0}var Sl=Tt.ReactCurrentDispatcher,xu=Tt.ReactCurrentBatchConfig,ka=0,te=null,ne=null,se=null,$l=!1,Wr=!1,so=0,Lh=0;function Le(){throw Error(y(321))}function qi(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!nt(e[a],t[a]))return!1;return!0}function Gi(e,t,a,r,o,l){if(ka=l,te=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Sl.current=e===null||e.memoizedState===null?vh:wh,e=a(r,o),Wr){l=0;do{if(Wr=!1,so=0,25<=l)throw Error(y(301));l+=1,se=ne=null,t.updateQueue=null,Sl.current=Sh,e=a(r,o)}while(Wr)}if(Sl.current=Xl,t=ne!==null&&ne.next!==null,ka=0,se=ne=te=null,$l=!1,t)throw Error(y(300));return e}function Vi(){var e=so!==0;return so=0,e}function gt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?te.memoizedState=se=e:se=se.next=e,se}function Qe(){if(ne===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var t=se===null?te.memoizedState:se.next;if(t!==null)se=t,ne=e;else{if(e===null)throw Error(y(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},se===null?te.memoizedState=se=e:se=se.next=e}return se}function fo(e,t){return typeof t=="function"?t(e):t}function Lu(e){var t=Qe(),a=t.queue;if(a===null)throw Error(y(311));a.lastRenderedReducer=e;var r=ne,o=r.baseQueue,l=a.pending;if(l!==null){if(o!==null){var n=o.next;o.next=l.next,l.next=n}r.baseQueue=o=l,a.pending=null}if(o!==null){l=o.next,r=r.baseState;var u=n=null,i=null,s=l;do{var p=s.lane;if((ka&p)===p)i!==null&&(i=i.next={lane:0,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null}),r=s.hasEagerState?s.eagerState:e(r,s.action);else{var m={lane:p,action:s.action,hasEagerState:s.hasEagerState,eagerState:s.eagerState,next:null};i===null?(u=i=m,n=r):i=i.next=m,te.lanes|=p,ba|=p}s=s.next}while(s!==null&&s!==l);i===null?n=r:i.next=u,nt(r,t.memoizedState)||(Me=!0),t.memoizedState=r,t.baseState=n,t.baseQueue=i,a.lastRenderedState=r}if(e=a.interleaved,e!==null){o=e;do l=o.lane,te.lanes|=l,ba|=l,o=o.next;while(o!==e)}else o===null&&(a.lanes=0);return[t.memoizedState,a.dispatch]}function Iu(e){var t=Qe(),a=t.queue;if(a===null)throw Error(y(311));a.lastRenderedReducer=e;var r=a.dispatch,o=a.pending,l=t.memoizedState;if(o!==null){a.pending=null;var n=o=o.next;do l=e(l,n.action),n=n.next;while(n!==o);nt(l,t.memoizedState)||(Me=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),a.lastRenderedState=l}return[l,r]}function fc(){}function cc(e,t){var a=te,r=Qe(),o=t(),l=!nt(r.memoizedState,o);if(l&&(r.memoizedState=o,Me=!0),r=r.queue,Wi(gc.bind(null,a,r,e),[e]),r.getSnapshot!==t||l||se!==null&&se.memoizedState.tag&1){if(a.flags|=2048,co(9,mc.bind(null,a,r,o,t),void 0,null),de===null)throw Error(y(349));(ka&30)!==0||pc(a,t,o)}return o}function pc(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function mc(e,t,a,r){t.value=a,t.getSnapshot=r,hc(t)&&xc(e)}function gc(e,t,a){return a(function(){hc(t)&&xc(e)})}function hc(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!nt(e,a)}catch{return!0}}function xc(e){var t=Rt(e,1);t!==null&&lt(t,e,1,-1)}function Nd(e){var t=gt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:fo,lastRenderedState:e},t.queue=e,e=e.dispatch=Ch.bind(null,te,e),[t.memoizedState,e]}function co(e,t,a,r){return e={tag:e,create:t,destroy:a,deps:r,next:null},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.lastEffect=e.next=e):(a=t.lastEffect,a===null?t.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,t.lastEffect=e)),e}function Lc(){return Qe().memoizedState}function kl(e,t,a,r){var o=gt();te.flags|=e,o.memoizedState=co(1|t,a,void 0,r===void 0?null:r)}function nn(e,t,a,r){var o=Qe();r=r===void 0?null:r;var l=void 0;if(ne!==null){var n=ne.memoizedState;if(l=n.destroy,r!==null&&qi(r,n.deps)){o.memoizedState=co(t,a,l,r);return}}te.flags|=e,o.memoizedState=co(1|t,a,l,r)}function Ud(e,t){return kl(8390656,8,e,t)}function Wi(e,t){return nn(2048,8,e,t)}function Ic(e,t){return nn(4,2,e,t)}function yc(e,t){return nn(4,4,e,t)}function Cc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function vc(e,t,a){return a=a!=null?a.concat([e]):null,nn(4,4,Cc.bind(null,t,e),a)}function $i(){}function wc(e,t){var a=Qe();t=t===void 0?null:t;var r=a.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(a.memoizedState=[e,t],e)}function Sc(e,t){var a=Qe();t=t===void 0?null:t;var r=a.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(e=e(),a.memoizedState=[e,t],e)}function kc(e,t,a){return(ka&21)===0?(e.baseState&&(e.baseState=!1,Me=!0),e.memoizedState=a):(nt(a,t)||(a=Rf(),te.lanes|=a,ba|=a,e.baseState=!0),t)}function Ih(e,t){var a=q;q=a!==0&&4>a?a:4,e(!0);var r=xu.transition;xu.transition={};try{e(!1),t()}finally{q=a,xu.transition=r}}function bc(){return Qe().memoizedState}function yh(e,t,a){var r=Jt(e);if(a={lane:r,action:a,hasEagerState:!1,eagerState:null,next:null},Pc(e))Mc(t,a);else if(a=ic(e,t,a,r),a!==null){var o=ke();lt(a,e,r,o),Ac(a,t,r)}}function Ch(e,t,a){var r=Jt(e),o={lane:r,action:a,hasEagerState:!1,eagerState:null,next:null};if(Pc(e))Mc(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var n=t.lastRenderedState,u=l(n,a);if(o.hasEagerState=!0,o.eagerState=u,nt(u,n)){var i=t.interleaved;i===null?(o.next=o,Ni(t)):(o.next=i.next,i.next=o),t.interleaved=o;return}}catch{}finally{}a=ic(e,t,o,r),a!==null&&(o=ke(),lt(a,e,r,o),Ac(a,t,r))}}function Pc(e){var t=e.alternate;return e===te||t!==null&&t===te}function Mc(e,t){Wr=$l=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Ac(e,t,a){if((a&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,a|=r,t.lanes=a,Si(e,a)}}var Xl={readContext:Ke,useCallback:Le,useContext:Le,useEffect:Le,useImperativeHandle:Le,useInsertionEffect:Le,useLayoutEffect:Le,useMemo:Le,useReducer:Le,useRef:Le,useState:Le,useDebugValue:Le,useDeferredValue:Le,useTransition:Le,useMutableSource:Le,useSyncExternalStore:Le,useId:Le,unstable_isNewReconciler:!1},vh={readContext:Ke,useCallback:function(e,t){return gt().memoizedState=[e,t===void 0?null:t],e},useContext:Ke,useEffect:Ud,useImperativeHandle:function(e,t,a){return a=a!=null?a.concat([e]):null,kl(4194308,4,Cc.bind(null,t,e),a)},useLayoutEffect:function(e,t){return kl(4194308,4,e,t)},useInsertionEffect:function(e,t){return kl(4,2,e,t)},useMemo:function(e,t){var a=gt();return t=t===void 0?null:t,e=e(),a.memoizedState=[e,t],e},useReducer:function(e,t,a){var r=gt();return t=a!==void 0?a(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=yh.bind(null,te,e),[r.memoizedState,e]},useRef:function(e){var t=gt();return e={current:e},t.memoizedState=e},useState:Nd,useDebugValue:$i,useDeferredValue:function(e){return gt().memoizedState=e},useTransition:function(){var e=Nd(!1),t=e[0];return e=Ih.bind(null,e[1]),gt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,a){var r=te,o=gt();if(J){if(a===void 0)throw Error(y(407));a=a()}else{if(a=t(),de===null)throw Error(y(349));(ka&30)!==0||pc(r,t,a)}o.memoizedState=a;var l={value:a,getSnapshot:t};return o.queue=l,Ud(gc.bind(null,r,l,e),[e]),r.flags|=2048,co(9,mc.bind(null,r,l,a,t),void 0,null),a},useId:function(){var e=gt(),t=de.identifierPrefix;if(J){var a=bt,r=kt;a=(r&~(1<<32-ot(r)-1)).toString(32)+a,t=":"+t+"R"+a,a=so++,0<a&&(t+="H"+a.toString(32)),t+=":"}else a=Lh++,t=":"+t+"r"+a.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},wh={readContext:Ke,useCallback:wc,useContext:Ke,useEffect:Wi,useImperativeHandle:vc,useInsertionEffect:Ic,useLayoutEffect:yc,useMemo:Sc,useReducer:Lu,useRef:Lc,useState:function(){return Lu(fo)},useDebugValue:$i,useDeferredValue:function(e){var t=Qe();return kc(t,ne.memoizedState,e)},useTransition:function(){var e=Lu(fo)[0],t=Qe().memoizedState;return[e,t]},useMutableSource:fc,useSyncExternalStore:cc,useId:bc,unstable_isNewReconciler:!1},Sh={readContext:Ke,useCallback:wc,useContext:Ke,useEffect:Wi,useImperativeHandle:vc,useInsertionEffect:Ic,useLayoutEffect:yc,useMemo:Sc,useReducer:Iu,useRef:Lc,useState:function(){return Iu(fo)},useDebugValue:$i,useDeferredValue:function(e){var t=Qe();return ne===null?t.memoizedState=e:kc(t,ne.memoizedState,e)},useTransition:function(){var e=Iu(fo)[0],t=Qe().memoizedState;return[e,t]},useMutableSource:fc,useSyncExternalStore:cc,useId:bc,unstable_isNewReconciler:!1};function tt(e,t){if(e&&e.defaultProps){t=ae({},t),e=e.defaultProps;for(var a in e)t[a]===void 0&&(t[a]=e[a]);return t}return t}function ei(e,t,a,r){t=e.memoizedState,a=a(r,t),a=a==null?t:ae({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var un={isMounted:function(e){return(e=e._reactInternals)?Aa(e)===e:!1},enqueueSetState:function(e,t,a){e=e._reactInternals;var r=ke(),o=Jt(e),l=Pt(r,o);l.payload=t,a!=null&&(l.callback=a),t=Yt(e,l,o),t!==null&&(lt(t,e,o,r),wl(t,e,o))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var r=ke(),o=Jt(e),l=Pt(r,o);l.tag=1,l.payload=t,a!=null&&(l.callback=a),t=Yt(e,l,o),t!==null&&(lt(t,e,o,r),wl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=ke(),r=Jt(e),o=Pt(a,r);o.tag=2,t!=null&&(o.callback=t),t=Yt(e,o,r),t!==null&&(lt(t,e,r,a),wl(t,e,r))}};function Hd(e,t,a,r,o,l,n){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,n):t.prototype&&t.prototype.isPureReactComponent?!ro(a,r)||!ro(o,l):!0}function Rc(e,t,a){var r=!1,o=aa,l=t.contextType;return typeof l=="object"&&l!==null?l=Ke(l):(o=Re(t)?wa:Ce.current,r=t.contextTypes,l=(r=r!=null)?or(e,o):aa),t=new t(a,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=un,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function zd(e,t,a,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,r),t.state!==e&&un.enqueueReplaceState(t,t.state,null)}function ti(e,t,a,r){var o=e.stateNode;o.props=a,o.state=e.memoizedState,o.refs={},Ui(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=Ke(l):(l=Re(t)?wa:Ce.current,o.context=or(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(ei(e,t,l,a),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&un.enqueueReplaceState(o,o.state,null),Vl(e,a,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function ir(e,t){try{var a="",r=t;do a+=eg(r),r=r.return;while(r);var o=a}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function yu(e,t,a){return{value:e,source:null,stack:a??null,digest:t??null}}function ai(e,t){try{console.error(t.value)}catch(a){setTimeout(function(){throw a})}}var kh=typeof WeakMap=="function"?WeakMap:Map;function Fc(e,t,a){a=Pt(-1,a),a.tag=3,a.payload={element:null};var r=t.value;return a.callback=function(){Ql||(Ql=!0,ci=r),ai(e,t)},a}function Tc(e,t,a){a=Pt(-1,a),a.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;a.payload=function(){return r(o)},a.callback=function(){ai(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(a.callback=function(){ai(e,t),typeof r!="function"&&(Zt===null?Zt=new Set([this]):Zt.add(this));var n=t.stack;this.componentDidCatch(t.value,{componentStack:n!==null?n:""})}),a}function _d(e,t,a){var r=e.pingCache;if(r===null){r=e.pingCache=new kh;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(a)||(o.add(a),e=Uh.bind(null,e,t,a),t.then(e,e))}function qd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Gd(e,t,a,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(t=Pt(-1,1),t.tag=2,Yt(a,t,1))),a.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var bh=Tt.ReactCurrentOwner,Me=!1;function Se(e,t,a,r){t.child=e===null?uc(t,null,a,r):nr(t,e.child,a,r)}function Vd(e,t,a,r,o){a=a.render;var l=t.ref;return tr(t,o),r=Gi(e,t,a,r,l,o),a=Vi(),e!==null&&!Me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Ft(e,t,o)):(J&&a&&Ti(t),t.flags|=1,Se(e,t,r,o),t.child)}function Wd(e,t,a,r,o){if(e===null){var l=a.type;return typeof l=="function"&&!ts(l)&&l.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(t.tag=15,t.type=l,Ec(e,t,l,r,o)):(e=Al(a.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&o)===0){var n=l.memoizedProps;if(a=a.compare,a=a!==null?a:ro,a(n,r)&&e.ref===t.ref)return Ft(e,t,o)}return t.flags|=1,e=ea(l,r),e.ref=t.ref,e.return=t,t.child=e}function Ec(e,t,a,r,o){if(e!==null){var l=e.memoizedProps;if(ro(l,r)&&e.ref===t.ref)if(Me=!1,t.pendingProps=r=l,(e.lanes&o)!==0)(e.flags&131072)!==0&&(Me=!0);else return t.lanes=e.lanes,Ft(e,t,o)}return ri(e,t,a,r,o)}function Dc(e,t,a){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(Qa,De),De|=a;else{if((a&1073741824)===0)return e=l!==null?l.baseLanes|a:a,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(Qa,De),De|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:a,X(Qa,De),De|=r}else l!==null?(r=l.baseLanes|a,t.memoizedState=null):r=a,X(Qa,De),De|=r;return Se(e,t,o,a),t.child}function jc(e,t){var a=t.ref;(e===null&&a!==null||e!==null&&e.ref!==a)&&(t.flags|=512,t.flags|=2097152)}function ri(e,t,a,r,o){var l=Re(a)?wa:Ce.current;return l=or(t,l),tr(t,o),a=Gi(e,t,a,r,l,o),r=Vi(),e!==null&&!Me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Ft(e,t,o)):(J&&r&&Ti(t),t.flags|=1,Se(e,t,a,o),t.child)}function $d(e,t,a,r,o){if(Re(a)){var l=!0;Hl(t)}else l=!1;if(tr(t,o),t.stateNode===null)bl(e,t),Rc(t,a,r),ti(t,a,r,o),r=!0;else if(e===null){var n=t.stateNode,u=t.memoizedProps;n.props=u;var i=n.context,s=a.contextType;typeof s=="object"&&s!==null?s=Ke(s):(s=Re(a)?wa:Ce.current,s=or(t,s));var p=a.getDerivedStateFromProps,m=typeof p=="function"||typeof n.getSnapshotBeforeUpdate=="function";m||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(u!==r||i!==s)&&zd(t,n,r,s),_t=!1;var g=t.memoizedState;n.state=g,Vl(t,r,n,o),i=t.memoizedState,u!==r||g!==i||Ae.current||_t?(typeof p=="function"&&(ei(t,a,p,r),i=t.memoizedState),(u=_t||Hd(t,a,u,r,g,i,s))?(m||typeof n.UNSAFE_componentWillMount!="function"&&typeof n.componentWillMount!="function"||(typeof n.componentWillMount=="function"&&n.componentWillMount(),typeof n.UNSAFE_componentWillMount=="function"&&n.UNSAFE_componentWillMount()),typeof n.componentDidMount=="function"&&(t.flags|=4194308)):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=i),n.props=r,n.state=i,n.context=s,r=u):(typeof n.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{n=t.stateNode,sc(e,t),u=t.memoizedProps,s=t.type===t.elementType?u:tt(t.type,u),n.props=s,m=t.pendingProps,g=n.context,i=a.contextType,typeof i=="object"&&i!==null?i=Ke(i):(i=Re(a)?wa:Ce.current,i=or(t,i));var h=a.getDerivedStateFromProps;(p=typeof h=="function"||typeof n.getSnapshotBeforeUpdate=="function")||typeof n.UNSAFE_componentWillReceiveProps!="function"&&typeof n.componentWillReceiveProps!="function"||(u!==m||g!==i)&&zd(t,n,r,i),_t=!1,g=t.memoizedState,n.state=g,Vl(t,r,n,o);var C=t.memoizedState;u!==m||g!==C||Ae.current||_t?(typeof h=="function"&&(ei(t,a,h,r),C=t.memoizedState),(s=_t||Hd(t,a,s,r,g,C,i)||!1)?(p||typeof n.UNSAFE_componentWillUpdate!="function"&&typeof n.componentWillUpdate!="function"||(typeof n.componentWillUpdate=="function"&&n.componentWillUpdate(r,C,i),typeof n.UNSAFE_componentWillUpdate=="function"&&n.UNSAFE_componentWillUpdate(r,C,i)),typeof n.componentDidUpdate=="function"&&(t.flags|=4),typeof n.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof n.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=C),n.props=r,n.state=C,n.context=i,r=s):(typeof n.componentDidUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof n.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return oi(e,t,a,r,l,o)}function oi(e,t,a,r,o,l){jc(e,t);var n=(t.flags&128)!==0;if(!r&&!n)return o&&Td(t,a,!1),Ft(e,t,l);r=t.stateNode,bh.current=t;var u=n&&typeof a.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&n?(t.child=nr(t,e.child,null,l),t.child=nr(t,null,u,l)):Se(e,t,u,l),t.memoizedState=r.state,o&&Td(t,a,!0),t.child}function Bc(e){var t=e.stateNode;t.pendingContext?Fd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Fd(e,t.context,!1),Hi(e,t.containerInfo)}function Xd(e,t,a,r,o){return lr(),Di(o),t.flags|=256,Se(e,t,a,r),t.child}var li={dehydrated:null,treeContext:null,retryLane:0};function ni(e){return{baseLanes:e,cachePool:null,transitions:null}}function Oc(e,t,a){var r=t.pendingProps,o=ee.current,l=!1,n=(t.flags&128)!==0,u;if((u=n)||(u=e!==null&&e.memoizedState===null?!1:(o&2)!==0),u?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),X(ee,o&1),e===null)return Zu(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(n=r.children,e=r.fallback,l?(r=t.mode,l=t.child,n={mode:"hidden",children:n},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=n):l=fn(n,r,0,null),e=va(e,r,a,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=ni(a),t.memoizedState=li,e):Xi(t,n));if(o=e.memoizedState,o!==null&&(u=o.dehydrated,u!==null))return Ph(e,t,n,r,u,o,a);if(l){l=r.fallback,n=t.mode,o=e.child,u=o.sibling;var i={mode:"hidden",children:r.children};return(n&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=i,t.deletions=null):(r=ea(o,i),r.subtreeFlags=o.subtreeFlags&14680064),u!==null?l=ea(u,l):(l=va(l,n,a,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,n=e.child.memoizedState,n=n===null?ni(a):{baseLanes:n.baseLanes|a,cachePool:null,transitions:n.transitions},l.memoizedState=n,l.childLanes=e.childLanes&~a,t.memoizedState=li,r}return l=e.child,e=l.sibling,r=ea(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=a),r.return=t,r.sibling=null,e!==null&&(a=t.deletions,a===null?(t.deletions=[e],t.flags|=16):a.push(e)),t.child=r,t.memoizedState=null,r}function Xi(e,t){return t=fn({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function xl(e,t,a,r){return r!==null&&Di(r),nr(t,e.child,null,a),e=Xi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Ph(e,t,a,r,o,l,n){if(a)return t.flags&256?(t.flags&=-257,r=yu(Error(y(422))),xl(e,t,n,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=fn({mode:"visible",children:r.children},o,0,null),l=va(l,o,n,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&nr(t,e.child,null,n),t.child.memoizedState=ni(n),t.memoizedState=li,l);if((t.mode&1)===0)return xl(e,t,n,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var u=r.dgst;return r=u,l=Error(y(419)),r=yu(l,r,void 0),xl(e,t,n,r)}if(u=(n&e.childLanes)!==0,Me||u){if(r=de,r!==null){switch(n&-n){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|n))!==0?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,Rt(e,o),lt(r,e,o,-1))}return es(),r=yu(Error(y(421))),xl(e,t,n,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Hh.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,je=Qt(o.nextSibling),Be=t,J=!0,rt=null,e!==null&&(Ve[We++]=kt,Ve[We++]=bt,Ve[We++]=Sa,kt=e.id,bt=e.overflow,Sa=t),t=Xi(t,r.children),t.flags|=4096,t)}function Kd(e,t,a){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ju(e.return,t,a)}function Cu(e,t,a,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=a,l.tailMode=o)}function Nc(e,t,a){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(Se(e,t,r.children,a),r=ee.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Kd(e,a,t);else if(e.tag===19)Kd(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(ee,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(a=t.child,o=null;a!==null;)e=a.alternate,e!==null&&Wl(e)===null&&(o=a),a=a.sibling;a=o,a===null?(o=t.child,t.child=null):(o=a.sibling,a.sibling=null),Cu(t,!1,o,a,l);break;case"backwards":for(a=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Wl(e)===null){t.child=o;break}e=o.sibling,o.sibling=a,a=o,o=e}Cu(t,!0,a,null,l);break;case"together":Cu(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function bl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ft(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ba|=t.lanes,(a&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(y(153));if(t.child!==null){for(e=t.child,a=ea(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=ea(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function Mh(e,t,a){switch(t.tag){case 3:Bc(t),lr();break;case 5:dc(t);break;case 1:Re(t.type)&&Hl(t);break;case 4:Hi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;X(ql,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(ee,ee.current&1),t.flags|=128,null):(a&t.child.childLanes)!==0?Oc(e,t,a):(X(ee,ee.current&1),e=Ft(e,t,a),e!==null?e.sibling:null);X(ee,ee.current&1);break;case 19:if(r=(a&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Nc(e,t,a);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),X(ee,ee.current),r)break;return null;case 22:case 23:return t.lanes=0,Dc(e,t,a)}return Ft(e,t,a)}var Uc,ui,Hc,zc;Uc=function(e,t){for(var a=t.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break;for(;a.sibling===null;){if(a.return===null||a.return===t)return;a=a.return}a.sibling.return=a.return,a=a.sibling}};ui=function(){};Hc=function(e,t,a,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,ya(Lt.current);var l=null;switch(a){case"input":o=Au(e,o),r=Au(e,r),l=[];break;case"select":o=ae({},o,{value:void 0}),r=ae({},r,{value:void 0}),l=[];break;case"textarea":o=Tu(e,o),r=Tu(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Nl)}Du(a,r);var n;a=null;for(s in o)if(!r.hasOwnProperty(s)&&o.hasOwnProperty(s)&&o[s]!=null)if(s==="style"){var u=o[s];for(n in u)u.hasOwnProperty(n)&&(a||(a={}),a[n]="")}else s!=="dangerouslySetInnerHTML"&&s!=="children"&&s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Qr.hasOwnProperty(s)?l||(l=[]):(l=l||[]).push(s,null));for(s in r){var i=r[s];if(u=o?.[s],r.hasOwnProperty(s)&&i!==u&&(i!=null||u!=null))if(s==="style")if(u){for(n in u)!u.hasOwnProperty(n)||i&&i.hasOwnProperty(n)||(a||(a={}),a[n]="");for(n in i)i.hasOwnProperty(n)&&u[n]!==i[n]&&(a||(a={}),a[n]=i[n])}else a||(l||(l=[]),l.push(s,a)),a=i;else s==="dangerouslySetInnerHTML"?(i=i?i.__html:void 0,u=u?u.__html:void 0,i!=null&&u!==i&&(l=l||[]).push(s,i)):s==="children"?typeof i!="string"&&typeof i!="number"||(l=l||[]).push(s,""+i):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&(Qr.hasOwnProperty(s)?(i!=null&&s==="onScroll"&&K("scroll",e),l||u===i||(l=[])):(l=l||[]).push(s,i))}a&&(l=l||[]).push("style",a);var s=l;(t.updateQueue=s)&&(t.flags|=4)}};zc=function(e,t,a,r){a!==r&&(t.flags|=4)};function Dr(e,t){if(!J)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ie(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(t)for(var o=e.child;o!==null;)a|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)a|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=a,t}function Ah(e,t,a){var r=t.pendingProps;switch(Ei(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ie(t),null;case 1:return Re(t.type)&&Ul(),Ie(t),null;case 3:return r=t.stateNode,ur(),Q(Ae),Q(Ce),_i(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(gl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,rt!==null&&(gi(rt),rt=null))),ui(e,t),Ie(t),null;case 5:zi(t);var o=ya(io.current);if(a=t.type,e!==null&&t.stateNode!=null)Hc(e,t,a,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(y(166));return Ie(t),null}if(e=ya(Lt.current),gl(t)){r=t.stateNode,a=t.type;var l=t.memoizedProps;switch(r[ht]=t,r[no]=l,e=(t.mode&1)!==0,a){case"dialog":K("cancel",r),K("close",r);break;case"iframe":case"object":case"embed":K("load",r);break;case"video":case"audio":for(o=0;o<Hr.length;o++)K(Hr[o],r);break;case"source":K("error",r);break;case"img":case"image":case"link":K("error",r),K("load",r);break;case"details":K("toggle",r);break;case"input":rd(r,l),K("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},K("invalid",r);break;case"textarea":ld(r,l),K("invalid",r)}Du(a,l),o=null;for(var n in l)if(l.hasOwnProperty(n)){var u=l[n];n==="children"?typeof u=="string"?r.textContent!==u&&(l.suppressHydrationWarning!==!0&&ml(r.textContent,u,e),o=["children",u]):typeof u=="number"&&r.textContent!==""+u&&(l.suppressHydrationWarning!==!0&&ml(r.textContent,u,e),o=["children",""+u]):Qr.hasOwnProperty(n)&&u!=null&&n==="onScroll"&&K("scroll",r)}switch(a){case"input":al(r),od(r,l,!0);break;case"textarea":al(r),nd(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Nl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{n=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=gf(a)),e==="http://www.w3.org/1999/xhtml"?a==="script"?(e=n.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=n.createElement(a,{is:r.is}):(e=n.createElement(a),a==="select"&&(n=e,r.multiple?n.multiple=!0:r.size&&(n.size=r.size))):e=n.createElementNS(e,a),e[ht]=t,e[no]=r,Uc(e,t,!1,!1),t.stateNode=e;e:{switch(n=ju(a,r),a){case"dialog":K("cancel",e),K("close",e),o=r;break;case"iframe":case"object":case"embed":K("load",e),o=r;break;case"video":case"audio":for(o=0;o<Hr.length;o++)K(Hr[o],e);o=r;break;case"source":K("error",e),o=r;break;case"img":case"image":case"link":K("error",e),K("load",e),o=r;break;case"details":K("toggle",e),o=r;break;case"input":rd(e,r),o=Au(e,r),K("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=ae({},r,{value:void 0}),K("invalid",e);break;case"textarea":ld(e,r),o=Tu(e,r),K("invalid",e);break;default:o=r}Du(a,o),u=o;for(l in u)if(u.hasOwnProperty(l)){var i=u[l];l==="style"?Lf(e,i):l==="dangerouslySetInnerHTML"?(i=i?i.__html:void 0,i!=null&&hf(e,i)):l==="children"?typeof i=="string"?(a!=="textarea"||i!=="")&&Yr(e,i):typeof i=="number"&&Yr(e,""+i):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Qr.hasOwnProperty(l)?i!=null&&l==="onScroll"&&K("scroll",e):i!=null&&Li(e,l,i,n))}switch(a){case"input":al(e),od(e,r,!1);break;case"textarea":al(e),nd(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ta(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Ya(e,!!r.multiple,l,!1):r.defaultValue!=null&&Ya(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Nl)}switch(a){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ie(t),null;case 6:if(e&&t.stateNode!=null)zc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(y(166));if(a=ya(io.current),ya(Lt.current),gl(t)){if(r=t.stateNode,a=t.memoizedProps,r[ht]=t,(l=r.nodeValue!==a)&&(e=Be,e!==null))switch(e.tag){case 3:ml(r.nodeValue,a,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ml(r.nodeValue,a,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(a.nodeType===9?a:a.ownerDocument).createTextNode(r),r[ht]=t,t.stateNode=r}return Ie(t),null;case 13:if(Q(ee),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(J&&je!==null&&(t.mode&1)!==0&&(t.flags&128)===0)lc(),lr(),t.flags|=98560,l=!1;else if(l=gl(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(y(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(y(317));l[ht]=t}else lr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ie(t),l=!1}else rt!==null&&(gi(rt),rt=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=a,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(ee.current&1)!==0?ue===0&&(ue=3):es())),t.updateQueue!==null&&(t.flags|=4),Ie(t),null);case 4:return ur(),ui(e,t),e===null&&oo(t.stateNode.containerInfo),Ie(t),null;case 10:return Oi(t.type._context),Ie(t),null;case 17:return Re(t.type)&&Ul(),Ie(t),null;case 19:if(Q(ee),l=t.memoizedState,l===null)return Ie(t),null;if(r=(t.flags&128)!==0,n=l.rendering,n===null)if(r)Dr(l,!1);else{if(ue!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(n=Wl(e),n!==null){for(t.flags|=128,Dr(l,!1),r=n.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=a,a=t.child;a!==null;)l=a,e=r,l.flags&=14680066,n=l.alternate,n===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=n.childLanes,l.lanes=n.lanes,l.child=n.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=n.memoizedProps,l.memoizedState=n.memoizedState,l.updateQueue=n.updateQueue,l.type=n.type,e=n.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),a=a.sibling;return X(ee,ee.current&1|2),t.child}e=e.sibling}l.tail!==null&&oe()>sr&&(t.flags|=128,r=!0,Dr(l,!1),t.lanes=4194304)}else{if(!r)if(e=Wl(n),e!==null){if(t.flags|=128,r=!0,a=e.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),Dr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!n.alternate&&!J)return Ie(t),null}else 2*oe()-l.renderingStartTime>sr&&a!==1073741824&&(t.flags|=128,r=!0,Dr(l,!1),t.lanes=4194304);l.isBackwards?(n.sibling=t.child,t.child=n):(a=l.last,a!==null?a.sibling=n:t.child=n,l.last=n)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=oe(),t.sibling=null,a=ee.current,X(ee,r?a&1|2:a&1),t):(Ie(t),null);case 22:case 23:return Ji(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(De&1073741824)!==0&&(Ie(t),t.subtreeFlags&6&&(t.flags|=8192)):Ie(t),null;case 24:return null;case 25:return null}throw Error(y(156,t.tag))}function Rh(e,t){switch(Ei(t),t.tag){case 1:return Re(t.type)&&Ul(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ur(),Q(Ae),Q(Ce),_i(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return zi(t),null;case 13:if(Q(ee),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(y(340));lr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Q(ee),null;case 4:return ur(),null;case 10:return Oi(t.type._context),null;case 22:case 23:return Ji(),null;case 24:return null;default:return null}}var Ll=!1,ye=!1,Fh=typeof WeakSet=="function"?WeakSet:Set,b=null;function Ka(e,t){var a=e.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(r){re(e,t,r)}else a.current=null}function ii(e,t,a){try{a()}catch(r){re(e,t,r)}}var Qd=!1;function Th(e,t){if(Vu=jl,e=Wf(),Fi(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{a.nodeType,l.nodeType}catch{a=null;break e}var n=0,u=-1,i=-1,s=0,p=0,m=e,g=null;t:for(;;){for(var h;m!==a||o!==0&&m.nodeType!==3||(u=n+o),m!==l||r!==0&&m.nodeType!==3||(i=n+r),m.nodeType===3&&(n+=m.nodeValue.length),(h=m.firstChild)!==null;)g=m,m=h;for(;;){if(m===e)break t;if(g===a&&++s===o&&(u=n),g===l&&++p===r&&(i=n),(h=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=h}a=u===-1||i===-1?null:{start:u,end:i}}else a=null}a=a||{start:0,end:0}}else a=null;for(Wu={focusedElem:e,selectionRange:a},jl=!1,b=t;b!==null;)if(t=b,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,b=e;else for(;b!==null;){t=b;try{var C=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var I=C.memoizedProps,D=C.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?I:tt(t.type,I),D);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var c=t.stateNode.containerInfo;c.nodeType===1?c.textContent="":c.nodeType===9&&c.documentElement&&c.removeChild(c.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(y(163))}}catch(x){re(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,b=e;break}b=t.return}return C=Qd,Qd=!1,C}function $r(e,t,a){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&ii(t,a,l)}o=o.next}while(o!==r)}}function sn(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var a=t=t.next;do{if((a.tag&e)===e){var r=a.create;a.destroy=r()}a=a.next}while(a!==t)}}function si(e){var t=e.ref;if(t!==null){var a=e.stateNode;switch(e.tag){case 5:e=a;break;default:e=a}typeof t=="function"?t(e):t.current=e}}function _c(e){var t=e.alternate;t!==null&&(e.alternate=null,_c(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ht],delete t[no],delete t[Ku],delete t[mh],delete t[gh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function qc(e){return e.tag===5||e.tag===3||e.tag===4}function Yd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function di(e,t,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?a.nodeType===8?a.parentNode.insertBefore(e,t):a.insertBefore(e,t):(a.nodeType===8?(t=a.parentNode,t.insertBefore(e,a)):(t=a,t.appendChild(e)),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Nl));else if(r!==4&&(e=e.child,e!==null))for(di(e,t,a),e=e.sibling;e!==null;)di(e,t,a),e=e.sibling}function fi(e,t,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(fi(e,t,a),e=e.sibling;e!==null;)fi(e,t,a),e=e.sibling}var fe=null,at=!1;function Ht(e,t,a){for(a=a.child;a!==null;)Gc(e,t,a),a=a.sibling}function Gc(e,t,a){if(xt&&typeof xt.onCommitFiberUnmount=="function")try{xt.onCommitFiberUnmount(en,a)}catch{}switch(a.tag){case 5:ye||Ka(a,t);case 6:var r=fe,o=at;fe=null,Ht(e,t,a),fe=r,at=o,fe!==null&&(at?(e=fe,a=a.stateNode,e.nodeType===8?e.parentNode.removeChild(a):e.removeChild(a)):fe.removeChild(a.stateNode));break;case 18:fe!==null&&(at?(e=fe,a=a.stateNode,e.nodeType===8?mu(e.parentNode,a):e.nodeType===1&&mu(e,a),to(e)):mu(fe,a.stateNode));break;case 4:r=fe,o=at,fe=a.stateNode.containerInfo,at=!0,Ht(e,t,a),fe=r,at=o;break;case 0:case 11:case 14:case 15:if(!ye&&(r=a.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,n=l.destroy;l=l.tag,n!==void 0&&((l&2)!==0||(l&4)!==0)&&ii(a,t,n),o=o.next}while(o!==r)}Ht(e,t,a);break;case 1:if(!ye&&(Ka(a,t),r=a.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=a.memoizedProps,r.state=a.memoizedState,r.componentWillUnmount()}catch(u){re(a,t,u)}Ht(e,t,a);break;case 21:Ht(e,t,a);break;case 22:a.mode&1?(ye=(r=ye)||a.memoizedState!==null,Ht(e,t,a),ye=r):Ht(e,t,a);break;default:Ht(e,t,a)}}function Zd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var a=e.stateNode;a===null&&(a=e.stateNode=new Fh),t.forEach(function(r){var o=zh.bind(null,e,r);a.has(r)||(a.add(r),r.then(o,o))})}}function et(e,t){var a=t.deletions;if(a!==null)for(var r=0;r<a.length;r++){var o=a[r];try{var l=e,n=t,u=n;e:for(;u!==null;){switch(u.tag){case 5:fe=u.stateNode,at=!1;break e;case 3:fe=u.stateNode.containerInfo,at=!0;break e;case 4:fe=u.stateNode.containerInfo,at=!0;break e}u=u.return}if(fe===null)throw Error(y(160));Gc(l,n,o),fe=null,at=!1;var i=o.alternate;i!==null&&(i.return=null),o.return=null}catch(s){re(o,t,s)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Vc(t,e),t=t.sibling}function Vc(e,t){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(et(t,e),mt(e),r&4){try{$r(3,e,e.return),sn(3,e)}catch(I){re(e,e.return,I)}try{$r(5,e,e.return)}catch(I){re(e,e.return,I)}}break;case 1:et(t,e),mt(e),r&512&&a!==null&&Ka(a,a.return);break;case 5:if(et(t,e),mt(e),r&512&&a!==null&&Ka(a,a.return),e.flags&32){var o=e.stateNode;try{Yr(o,"")}catch(I){re(e,e.return,I)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,n=a!==null?a.memoizedProps:l,u=e.type,i=e.updateQueue;if(e.updateQueue=null,i!==null)try{u==="input"&&l.type==="radio"&&l.name!=null&&pf(o,l),ju(u,n);var s=ju(u,l);for(n=0;n<i.length;n+=2){var p=i[n],m=i[n+1];p==="style"?Lf(o,m):p==="dangerouslySetInnerHTML"?hf(o,m):p==="children"?Yr(o,m):Li(o,p,m,s)}switch(u){case"input":Ru(o,l);break;case"textarea":mf(o,l);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var h=l.value;h!=null?Ya(o,!!l.multiple,h,!1):g!==!!l.multiple&&(l.defaultValue!=null?Ya(o,!!l.multiple,l.defaultValue,!0):Ya(o,!!l.multiple,l.multiple?[]:"",!1))}o[no]=l}catch(I){re(e,e.return,I)}}break;case 6:if(et(t,e),mt(e),r&4){if(e.stateNode===null)throw Error(y(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(I){re(e,e.return,I)}}break;case 3:if(et(t,e),mt(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{to(t.containerInfo)}catch(I){re(e,e.return,I)}break;case 4:et(t,e),mt(e);break;case 13:et(t,e),mt(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(Yi=oe())),r&4&&Zd(e);break;case 22:if(p=a!==null&&a.memoizedState!==null,e.mode&1?(ye=(s=ye)||p,et(t,e),ye=s):et(t,e),mt(e),r&8192){if(s=e.memoizedState!==null,(e.stateNode.isHidden=s)&&!p&&(e.mode&1)!==0)for(b=e,p=e.child;p!==null;){for(m=b=p;b!==null;){switch(g=b,h=g.child,g.tag){case 0:case 11:case 14:case 15:$r(4,g,g.return);break;case 1:Ka(g,g.return);var C=g.stateNode;if(typeof C.componentWillUnmount=="function"){r=g,a=g.return;try{t=r,C.props=t.memoizedProps,C.state=t.memoizedState,C.componentWillUnmount()}catch(I){re(r,a,I)}}break;case 5:Ka(g,g.return);break;case 22:if(g.memoizedState!==null){ef(m);continue}}h!==null?(h.return=g,b=h):ef(m)}p=p.sibling}e:for(p=null,m=e;;){if(m.tag===5){if(p===null){p=m;try{o=m.stateNode,s?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(u=m.stateNode,i=m.memoizedProps.style,n=i!=null&&i.hasOwnProperty("display")?i.display:null,u.style.display=xf("display",n))}catch(I){re(e,e.return,I)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=s?"":m.memoizedProps}catch(I){re(e,e.return,I)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:et(t,e),mt(e),r&4&&Zd(e);break;case 21:break;default:et(t,e),mt(e)}}function mt(e){var t=e.flags;if(t&2){try{e:{for(var a=e.return;a!==null;){if(qc(a)){var r=a;break e}a=a.return}throw Error(y(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Yr(o,""),r.flags&=-33);var l=Yd(e);fi(e,l,o);break;case 3:case 4:var n=r.stateNode.containerInfo,u=Yd(e);di(e,u,n);break;default:throw Error(y(161))}}catch(i){re(e,e.return,i)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Eh(e,t,a){b=e,Wc(e,t,a)}function Wc(e,t,a){for(var r=(e.mode&1)!==0;b!==null;){var o=b,l=o.child;if(o.tag===22&&r){var n=o.memoizedState!==null||Ll;if(!n){var u=o.alternate,i=u!==null&&u.memoizedState!==null||ye;u=Ll;var s=ye;if(Ll=n,(ye=i)&&!s)for(b=o;b!==null;)n=b,i=n.child,n.tag===22&&n.memoizedState!==null?tf(o):i!==null?(i.return=n,b=i):tf(o);for(;l!==null;)b=l,Wc(l,t,a),l=l.sibling;b=o,Ll=u,ye=s}Jd(e,t,a)}else(o.subtreeFlags&8772)!==0&&l!==null?(l.return=o,b=l):Jd(e,t,a)}}function Jd(e){for(;b!==null;){var t=b;if((t.flags&8772)!==0){var a=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:ye||sn(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ye)if(a===null)r.componentDidMount();else{var o=t.elementType===t.type?a.memoizedProps:tt(t.type,a.memoizedProps);r.componentDidUpdate(o,a.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Od(t,l,r);break;case 3:var n=t.updateQueue;if(n!==null){if(a=null,t.child!==null)switch(t.child.tag){case 5:a=t.child.stateNode;break;case 1:a=t.child.stateNode}Od(t,n,a)}break;case 5:var u=t.stateNode;if(a===null&&t.flags&4){a=u;var i=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":i.autoFocus&&a.focus();break;case"img":i.src&&(a.src=i.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var s=t.alternate;if(s!==null){var p=s.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&to(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(y(163))}ye||t.flags&512&&si(t)}catch(g){re(t,t.return,g)}}if(t===e){b=null;break}if(a=t.sibling,a!==null){a.return=t.return,b=a;break}b=t.return}}function ef(e){for(;b!==null;){var t=b;if(t===e){b=null;break}var a=t.sibling;if(a!==null){a.return=t.return,b=a;break}b=t.return}}function tf(e){for(;b!==null;){var t=b;try{switch(t.tag){case 0:case 11:case 15:var a=t.return;try{sn(4,t)}catch(i){re(t,a,i)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(i){re(t,o,i)}}var l=t.return;try{si(t)}catch(i){re(t,l,i)}break;case 5:var n=t.return;try{si(t)}catch(i){re(t,n,i)}}}catch(i){re(t,t.return,i)}if(t===e){b=null;break}var u=t.sibling;if(u!==null){u.return=t.return,b=u;break}b=t.return}}var Dh=Math.ceil,Kl=Tt.ReactCurrentDispatcher,Ki=Tt.ReactCurrentOwner,Xe=Tt.ReactCurrentBatchConfig,j=0,de=null,le=null,ce=0,De=0,Qa=oa(0),ue=0,po=null,ba=0,dn=0,Qi=0,Xr=null,Pe=null,Yi=0,sr=1/0,wt=null,Ql=!1,ci=null,Zt=null,Il=!1,Wt=null,Yl=0,Kr=0,pi=null,Pl=-1,Ml=0;function ke(){return(j&6)!==0?oe():Pl!==-1?Pl:Pl=oe()}function Jt(e){return(e.mode&1)===0?1:(j&2)!==0&&ce!==0?ce&-ce:xh.transition!==null?(Ml===0&&(Ml=Rf()),Ml):(e=q,e!==0||(e=window.event,e=e===void 0?16:Of(e.type)),e)}function lt(e,t,a,r){if(50<Kr)throw Kr=0,pi=null,Error(y(185));mo(e,a,r),((j&2)===0||e!==de)&&(e===de&&((j&2)===0&&(dn|=a),ue===4&&Gt(e,ce)),Fe(e,r),a===1&&j===0&&(t.mode&1)===0&&(sr=oe()+500,ln&&la()))}function Fe(e,t){var a=e.callbackNode;Ig(e,t);var r=Dl(e,e===de?ce:0);if(r===0)a!==null&&sd(a),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(a!=null&&sd(a),t===1)e.tag===0?hh(af.bind(null,e)):ac(af.bind(null,e)),ch(function(){(j&6)===0&&la()}),a=null;else{switch(Ff(r)){case 1:a=wi;break;case 4:a=Mf;break;case 16:a=El;break;case 536870912:a=Af;break;default:a=El}a=ep(a,$c.bind(null,e))}e.callbackPriority=t,e.callbackNode=a}}function $c(e,t){if(Pl=-1,Ml=0,(j&6)!==0)throw Error(y(327));var a=e.callbackNode;if(ar()&&e.callbackNode!==a)return null;var r=Dl(e,e===de?ce:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Zl(e,r);else{t=r;var o=j;j|=2;var l=Kc();(de!==e||ce!==t)&&(wt=null,sr=oe()+500,Ca(e,t));do try{Oh();break}catch(u){Xc(e,u)}while(!0);Bi(),Kl.current=l,j=o,le!==null?t=0:(de=null,ce=0,t=ue)}if(t!==0){if(t===2&&(o=Hu(e),o!==0&&(r=o,t=mi(e,o))),t===1)throw a=po,Ca(e,0),Gt(e,r),Fe(e,oe()),a;if(t===6)Gt(e,r);else{if(o=e.current.alternate,(r&30)===0&&!jh(o)&&(t=Zl(e,r),t===2&&(l=Hu(e),l!==0&&(r=l,t=mi(e,l))),t===1))throw a=po,Ca(e,0),Gt(e,r),Fe(e,oe()),a;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(y(345));case 2:xa(e,Pe,wt);break;case 3:if(Gt(e,r),(r&130023424)===r&&(t=Yi+500-oe(),10<t)){if(Dl(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){ke(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Xu(xa.bind(null,e,Pe,wt),t);break}xa(e,Pe,wt);break;case 4:if(Gt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var n=31-ot(r);l=1<<n,n=t[n],n>o&&(o=n),r&=~l}if(r=o,r=oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Dh(r/1960))-r,10<r){e.timeoutHandle=Xu(xa.bind(null,e,Pe,wt),r);break}xa(e,Pe,wt);break;case 5:xa(e,Pe,wt);break;default:throw Error(y(329))}}}return Fe(e,oe()),e.callbackNode===a?$c.bind(null,e):null}function mi(e,t){var a=Xr;return e.current.memoizedState.isDehydrated&&(Ca(e,t).flags|=256),e=Zl(e,t),e!==2&&(t=Pe,Pe=a,t!==null&&gi(t)),e}function gi(e){Pe===null?Pe=e:Pe.push.apply(Pe,e)}function jh(e){for(var t=e;;){if(t.flags&16384){var a=t.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var r=0;r<a.length;r++){var o=a[r],l=o.getSnapshot;o=o.value;try{if(!nt(l(),o))return!1}catch{return!1}}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Gt(e,t){for(t&=~Qi,t&=~dn,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var a=31-ot(t),r=1<<a;e[a]=-1,t&=~r}}function af(e){if((j&6)!==0)throw Error(y(327));ar();var t=Dl(e,0);if((t&1)===0)return Fe(e,oe()),null;var a=Zl(e,t);if(e.tag!==0&&a===2){var r=Hu(e);r!==0&&(t=r,a=mi(e,r))}if(a===1)throw a=po,Ca(e,0),Gt(e,t),Fe(e,oe()),a;if(a===6)throw Error(y(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,xa(e,Pe,wt),Fe(e,oe()),null}function Zi(e,t){var a=j;j|=1;try{return e(t)}finally{j=a,j===0&&(sr=oe()+500,ln&&la())}}function Pa(e){Wt!==null&&Wt.tag===0&&(j&6)===0&&ar();var t=j;j|=1;var a=Xe.transition,r=q;try{if(Xe.transition=null,q=1,e)return e()}finally{q=r,Xe.transition=a,j=t,(j&6)===0&&la()}}function Ji(){De=Qa.current,Q(Qa)}function Ca(e,t){e.finishedWork=null,e.finishedLanes=0;var a=e.timeoutHandle;if(a!==-1&&(e.timeoutHandle=-1,fh(a)),le!==null)for(a=le.return;a!==null;){var r=a;switch(Ei(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ul();break;case 3:ur(),Q(Ae),Q(Ce),_i();break;case 5:zi(r);break;case 4:ur();break;case 13:Q(ee);break;case 19:Q(ee);break;case 10:Oi(r.type._context);break;case 22:case 23:Ji()}a=a.return}if(de=e,le=e=ea(e.current,null),ce=De=t,ue=0,po=null,Qi=dn=ba=0,Pe=Xr=null,Ia!==null){for(t=0;t<Ia.length;t++)if(a=Ia[t],r=a.interleaved,r!==null){a.interleaved=null;var o=r.next,l=a.pending;if(l!==null){var n=l.next;l.next=o,r.next=n}a.pending=r}Ia=null}return e}function Xc(e,t){do{var a=le;try{if(Bi(),Sl.current=Xl,$l){for(var r=te.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}$l=!1}if(ka=0,se=ne=te=null,Wr=!1,so=0,Ki.current=null,a===null||a.return===null){ue=1,po=t,le=null;break}e:{var l=e,n=a.return,u=a,i=t;if(t=ce,u.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){var s=i,p=u,m=p.tag;if((p.mode&1)===0&&(m===0||m===11||m===15)){var g=p.alternate;g?(p.updateQueue=g.updateQueue,p.memoizedState=g.memoizedState,p.lanes=g.lanes):(p.updateQueue=null,p.memoizedState=null)}var h=qd(n);if(h!==null){h.flags&=-257,Gd(h,n,u,l,t),h.mode&1&&_d(l,s,t),t=h,i=s;var C=t.updateQueue;if(C===null){var I=new Set;I.add(i),t.updateQueue=I}else C.add(i);break e}else{if((t&1)===0){_d(l,s,t),es();break e}i=Error(y(426))}}else if(J&&u.mode&1){var D=qd(n);if(D!==null){(D.flags&65536)===0&&(D.flags|=256),Gd(D,n,u,l,t),Di(ir(i,u));break e}}l=i=ir(i,u),ue!==4&&(ue=2),Xr===null?Xr=[l]:Xr.push(l),l=n;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=Fc(l,i,t);Bd(l,f);break e;case 1:u=i;var d=l.type,c=l.stateNode;if((l.flags&128)===0&&(typeof d.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Zt===null||!Zt.has(c)))){l.flags|=65536,t&=-t,l.lanes|=t;var x=Tc(l,u,t);Bd(l,x);break e}}l=l.return}while(l!==null)}Yc(a)}catch(w){t=w,le===a&&a!==null&&(le=a=a.return);continue}break}while(!0)}function Kc(){var e=Kl.current;return Kl.current=Xl,e===null?Xl:e}function es(){(ue===0||ue===3||ue===2)&&(ue=4),de===null||(ba&268435455)===0&&(dn&268435455)===0||Gt(de,ce)}function Zl(e,t){var a=j;j|=2;var r=Kc();(de!==e||ce!==t)&&(wt=null,Ca(e,t));do try{Bh();break}catch(o){Xc(e,o)}while(!0);if(Bi(),j=a,Kl.current=r,le!==null)throw Error(y(261));return de=null,ce=0,ue}function Bh(){for(;le!==null;)Qc(le)}function Oh(){for(;le!==null&&!dg();)Qc(le)}function Qc(e){var t=Jc(e.alternate,e,De);e.memoizedProps=e.pendingProps,t===null?Yc(e):le=t,Ki.current=null}function Yc(e){var t=e;do{var a=t.alternate;if(e=t.return,(t.flags&32768)===0){if(a=Ah(a,t,De),a!==null){le=a;return}}else{if(a=Rh(a,t),a!==null){a.flags&=32767,le=a;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ue=6,le=null;return}}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);ue===0&&(ue=5)}function xa(e,t,a){var r=q,o=Xe.transition;try{Xe.transition=null,q=1,Nh(e,t,a,r)}finally{Xe.transition=o,q=r}return null}function Nh(e,t,a,r){do ar();while(Wt!==null);if((j&6)!==0)throw Error(y(327));a=e.finishedWork;var o=e.finishedLanes;if(a===null)return null;if(e.finishedWork=null,e.finishedLanes=0,a===e.current)throw Error(y(177));e.callbackNode=null,e.callbackPriority=0;var l=a.lanes|a.childLanes;if(yg(e,l),e===de&&(le=de=null,ce=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Il||(Il=!0,ep(El,function(){return ar(),null})),l=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||l){l=Xe.transition,Xe.transition=null;var n=q;q=1;var u=j;j|=4,Ki.current=null,Th(e,a),Vc(a,e),nh(Wu),jl=!!Vu,Wu=Vu=null,e.current=a,Eh(a,e,o),fg(),j=u,q=n,Xe.transition=l}else e.current=a;if(Il&&(Il=!1,Wt=e,Yl=o),l=e.pendingLanes,l===0&&(Zt=null),mg(a.stateNode,r),Fe(e,oe()),t!==null)for(r=e.onRecoverableError,a=0;a<t.length;a++)o=t[a],r(o.value,{componentStack:o.stack,digest:o.digest});if(Ql)throw Ql=!1,e=ci,ci=null,e;return(Yl&1)!==0&&e.tag!==0&&ar(),l=e.pendingLanes,(l&1)!==0?e===pi?Kr++:(Kr=0,pi=e):Kr=0,la(),null}function ar(){if(Wt!==null){var e=Ff(Yl),t=Xe.transition,a=q;try{if(Xe.transition=null,q=16>e?16:e,Wt===null)var r=!1;else{if(e=Wt,Wt=null,Yl=0,(j&6)!==0)throw Error(y(331));var o=j;for(j|=4,b=e.current;b!==null;){var l=b,n=l.child;if((b.flags&16)!==0){var u=l.deletions;if(u!==null){for(var i=0;i<u.length;i++){var s=u[i];for(b=s;b!==null;){var p=b;switch(p.tag){case 0:case 11:case 15:$r(8,p,l)}var m=p.child;if(m!==null)m.return=p,b=m;else for(;b!==null;){p=b;var g=p.sibling,h=p.return;if(_c(p),p===s){b=null;break}if(g!==null){g.return=h,b=g;break}b=h}}}var C=l.alternate;if(C!==null){var I=C.child;if(I!==null){C.child=null;do{var D=I.sibling;I.sibling=null,I=D}while(I!==null)}}b=l}}if((l.subtreeFlags&2064)!==0&&n!==null)n.return=l,b=n;else e:for(;b!==null;){if(l=b,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:$r(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,b=f;break e}b=l.return}}var d=e.current;for(b=d;b!==null;){n=b;var c=n.child;if((n.subtreeFlags&2064)!==0&&c!==null)c.return=n,b=c;else e:for(n=d;b!==null;){if(u=b,(u.flags&2048)!==0)try{switch(u.tag){case 0:case 11:case 15:sn(9,u)}}catch(w){re(u,u.return,w)}if(u===n){b=null;break e}var x=u.sibling;if(x!==null){x.return=u.return,b=x;break e}b=u.return}}if(j=o,la(),xt&&typeof xt.onPostCommitFiberRoot=="function")try{xt.onPostCommitFiberRoot(en,e)}catch{}r=!0}return r}finally{q=a,Xe.transition=t}}return!1}function rf(e,t,a){t=ir(a,t),t=Fc(e,t,1),e=Yt(e,t,1),t=ke(),e!==null&&(mo(e,1,t),Fe(e,t))}function re(e,t,a){if(e.tag===3)rf(e,e,a);else for(;t!==null;){if(t.tag===3){rf(t,e,a);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Zt===null||!Zt.has(r))){e=ir(a,e),e=Tc(t,e,1),t=Yt(t,e,1),e=ke(),t!==null&&(mo(t,1,e),Fe(t,e));break}}t=t.return}}function Uh(e,t,a){var r=e.pingCache;r!==null&&r.delete(t),t=ke(),e.pingedLanes|=e.suspendedLanes&a,de===e&&(ce&a)===a&&(ue===4||ue===3&&(ce&130023424)===ce&&500>oe()-Yi?Ca(e,0):Qi|=a),Fe(e,t)}function Zc(e,t){t===0&&((e.mode&1)===0?t=1:(t=ll,ll<<=1,(ll&130023424)===0&&(ll=4194304)));var a=ke();e=Rt(e,t),e!==null&&(mo(e,t,a),Fe(e,a))}function Hh(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),Zc(e,a)}function zh(e,t){var a=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(a=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(y(314))}r!==null&&r.delete(t),Zc(e,a)}var Jc;Jc=function(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ae.current)Me=!0;else{if((e.lanes&a)===0&&(t.flags&128)===0)return Me=!1,Mh(e,t,a);Me=(e.flags&131072)!==0}else Me=!1,J&&(t.flags&1048576)!==0&&rc(t,_l,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;bl(e,t),e=t.pendingProps;var o=or(t,Ce.current);tr(t,a),o=Gi(null,t,r,e,o,a);var l=Vi();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Re(r)?(l=!0,Hl(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ui(t),o.updater=un,t.stateNode=o,o._reactInternals=t,ti(t,r,e,a),t=oi(null,t,r,!0,l,a)):(t.tag=0,J&&l&&Ti(t),Se(null,t,o,a),t=t.child),t;case 16:r=t.elementType;e:{switch(bl(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=qh(r),e=tt(r,e),o){case 0:t=ri(null,t,r,e,a);break e;case 1:t=$d(null,t,r,e,a);break e;case 11:t=Vd(null,t,r,e,a);break e;case 14:t=Wd(null,t,r,tt(r.type,e),a);break e}throw Error(y(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),ri(e,t,r,o,a);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),$d(e,t,r,o,a);case 3:e:{if(Bc(t),e===null)throw Error(y(387));r=t.pendingProps,l=t.memoizedState,o=l.element,sc(e,t),Vl(t,r,null,a);var n=t.memoizedState;if(r=n.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:n.cache,pendingSuspenseBoundaries:n.pendingSuspenseBoundaries,transitions:n.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=ir(Error(y(423)),t),t=Xd(e,t,r,a,o);break e}else if(r!==o){o=ir(Error(y(424)),t),t=Xd(e,t,r,a,o);break e}else for(je=Qt(t.stateNode.containerInfo.firstChild),Be=t,J=!0,rt=null,a=uc(t,null,r,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(lr(),r===o){t=Ft(e,t,a);break e}Se(e,t,r,a)}t=t.child}return t;case 5:return dc(t),e===null&&Zu(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,n=o.children,$u(r,o)?n=null:l!==null&&$u(r,l)&&(t.flags|=32),jc(e,t),Se(e,t,n,a),t.child;case 6:return e===null&&Zu(t),null;case 13:return Oc(e,t,a);case 4:return Hi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=nr(t,null,r,a):Se(e,t,r,a),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),Vd(e,t,r,o,a);case 7:return Se(e,t,t.pendingProps,a),t.child;case 8:return Se(e,t,t.pendingProps.children,a),t.child;case 12:return Se(e,t,t.pendingProps.children,a),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,n=o.value,X(ql,r._currentValue),r._currentValue=n,l!==null)if(nt(l.value,n)){if(l.children===o.children&&!Ae.current){t=Ft(e,t,a);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var u=l.dependencies;if(u!==null){n=l.child;for(var i=u.firstContext;i!==null;){if(i.context===r){if(l.tag===1){i=Pt(-1,a&-a),i.tag=2;var s=l.updateQueue;if(s!==null){s=s.shared;var p=s.pending;p===null?i.next=i:(i.next=p.next,p.next=i),s.pending=i}}l.lanes|=a,i=l.alternate,i!==null&&(i.lanes|=a),Ju(l.return,a,t),u.lanes|=a;break}i=i.next}}else if(l.tag===10)n=l.type===t.type?null:l.child;else if(l.tag===18){if(n=l.return,n===null)throw Error(y(341));n.lanes|=a,u=n.alternate,u!==null&&(u.lanes|=a),Ju(n,a,t),n=l.sibling}else n=l.child;if(n!==null)n.return=l;else for(n=l;n!==null;){if(n===t){n=null;break}if(l=n.sibling,l!==null){l.return=n.return,n=l;break}n=n.return}l=n}Se(e,t,o.children,a),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,tr(t,a),o=Ke(o),r=r(o),t.flags|=1,Se(e,t,r,a),t.child;case 14:return r=t.type,o=tt(r,t.pendingProps),o=tt(r.type,o),Wd(e,t,r,o,a);case 15:return Ec(e,t,t.type,t.pendingProps,a);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:tt(r,o),bl(e,t),t.tag=1,Re(r)?(e=!0,Hl(t)):e=!1,tr(t,a),Rc(t,r,o),ti(t,r,o,a),oi(null,t,r,!0,e,a);case 19:return Nc(e,t,a);case 22:return Dc(e,t,a)}throw Error(y(156,t.tag))};function ep(e,t){return Pf(e,t)}function _h(e,t,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $e(e,t,a,r){return new _h(e,t,a,r)}function ts(e){return e=e.prototype,!(!e||!e.isReactComponent)}function qh(e){if(typeof e=="function")return ts(e)?1:0;if(e!=null){if(e=e.$$typeof,e===yi)return 11;if(e===Ci)return 14}return 2}function ea(e,t){var a=e.alternate;return a===null?(a=$e(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&14680064,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a}function Al(e,t,a,r,o,l){var n=2;if(r=e,typeof e=="function")ts(e)&&(n=1);else if(typeof e=="string")n=5;else e:switch(e){case Ha:return va(a.children,o,l,t);case Ii:n=8,o|=8;break;case ku:return e=$e(12,a,t,o|2),e.elementType=ku,e.lanes=l,e;case bu:return e=$e(13,a,t,o),e.elementType=bu,e.lanes=l,e;case Pu:return e=$e(19,a,t,o),e.elementType=Pu,e.lanes=l,e;case df:return fn(a,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case uf:n=10;break e;case sf:n=9;break e;case yi:n=11;break e;case Ci:n=14;break e;case zt:n=16,r=null;break e}throw Error(y(130,e==null?e:typeof e,""))}return t=$e(n,a,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function va(e,t,a,r){return e=$e(7,e,r,t),e.lanes=a,e}function fn(e,t,a,r){return e=$e(22,e,r,t),e.elementType=df,e.lanes=a,e.stateNode={isHidden:!1},e}function vu(e,t,a){return e=$e(6,e,null,t),e.lanes=a,e}function wu(e,t,a){return t=$e(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Gh(e,t,a,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=nu(0),this.expirationTimes=nu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nu(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function as(e,t,a,r,o,l,n,u,i){return e=new Gh(e,t,a,u,i),t===1?(t=1,l===!0&&(t|=8)):t=0,l=$e(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ui(l),e}function Vh(e,t,a){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ua,key:r==null?null:""+r,children:e,containerInfo:t,implementation:a}}function tp(e){if(!e)return aa;e=e._reactInternals;e:{if(Aa(e)!==e||e.tag!==1)throw Error(y(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Re(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(y(171))}if(e.tag===1){var a=e.type;if(Re(a))return tc(e,a,t)}return t}function ap(e,t,a,r,o,l,n,u,i){return e=as(a,r,!0,e,o,l,n,u,i),e.context=tp(null),a=e.current,r=ke(),o=Jt(a),l=Pt(r,o),l.callback=t??null,Yt(a,l,o),e.current.lanes=o,mo(e,o,r),Fe(e,r),e}function cn(e,t,a,r){var o=t.current,l=ke(),n=Jt(o);return a=tp(a),t.context===null?t.context=a:t.pendingContext=a,t=Pt(l,n),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Yt(o,t,n),e!==null&&(lt(e,o,n,l),wl(e,o,n)),n}function Jl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function of(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function rs(e,t){of(e,t),(e=e.alternate)&&of(e,t)}function Wh(){return null}var rp=typeof reportError=="function"?reportError:function(e){console.error(e)};function os(e){this._internalRoot=e}pn.prototype.render=os.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(y(409));cn(e,t,null,null)};pn.prototype.unmount=os.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Pa(function(){cn(null,e,null,null)}),t[At]=null}};function pn(e){this._internalRoot=e}pn.prototype.unstable_scheduleHydration=function(e){if(e){var t=Df();e={blockedOn:null,target:e,priority:t};for(var a=0;a<qt.length&&t!==0&&t<qt[a].priority;a++);qt.splice(a,0,e),a===0&&Bf(e)}};function ls(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function mn(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function lf(){}function $h(e,t,a,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var s=Jl(n);l.call(s)}}var n=ap(t,r,e,0,null,!1,!1,"",lf);return e._reactRootContainer=n,e[At]=n.current,oo(e.nodeType===8?e.parentNode:e),Pa(),n}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var u=r;r=function(){var s=Jl(i);u.call(s)}}var i=as(e,0,!1,null,null,!1,!1,"",lf);return e._reactRootContainer=i,e[At]=i.current,oo(e.nodeType===8?e.parentNode:e),Pa(function(){cn(t,i,a,r)}),i}function gn(e,t,a,r,o){var l=a._reactRootContainer;if(l){var n=l;if(typeof o=="function"){var u=o;o=function(){var i=Jl(n);u.call(i)}}cn(t,n,e,o)}else n=$h(a,t,e,o,r);return Jl(n)}Tf=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var a=Ur(t.pendingLanes);a!==0&&(Si(t,a|1),Fe(t,oe()),(j&6)===0&&(sr=oe()+500,la()))}break;case 13:Pa(function(){var r=Rt(e,1);if(r!==null){var o=ke();lt(r,e,1,o)}}),rs(e,1)}};ki=function(e){if(e.tag===13){var t=Rt(e,134217728);if(t!==null){var a=ke();lt(t,e,134217728,a)}rs(e,134217728)}};Ef=function(e){if(e.tag===13){var t=Jt(e),a=Rt(e,t);if(a!==null){var r=ke();lt(a,e,t,r)}rs(e,t)}};Df=function(){return q};jf=function(e,t){var a=q;try{return q=e,t()}finally{q=a}};Ou=function(e,t,a){switch(t){case"input":if(Ru(e,a),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<a.length;t++){var r=a[t];if(r!==e&&r.form===e.form){var o=on(r);if(!o)throw Error(y(90));cf(r),Ru(r,o)}}}break;case"textarea":mf(e,a);break;case"select":t=a.value,t!=null&&Ya(e,!!a.multiple,t,!1)}};Cf=Zi;vf=Pa;var Xh={usingClientEntryPoint:!1,Events:[ho,Ga,on,If,yf,Zi]},jr={findFiberByHostInstance:La,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Kh={bundleType:jr.bundleType,version:jr.version,rendererPackageName:jr.rendererPackageName,rendererConfig:jr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Tt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=kf(e),e===null?null:e.stateNode},findFiberByHostInstance:jr.findFiberByHostInstance||Wh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Br=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Br.isDisabled&&Br.supportsFiber))try{en=Br.inject(Kh),xt=Br}catch{}var Br;Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xh;Ue.createPortal=function(e,t){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ls(t))throw Error(y(200));return Vh(e,t,null,a)};Ue.createRoot=function(e,t){if(!ls(e))throw Error(y(299));var a=!1,r="",o=rp;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=as(e,1,!1,null,null,a,!1,r,o),e[At]=t.current,oo(e.nodeType===8?e.parentNode:e),new os(t)};Ue.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(y(188)):(e=Object.keys(e).join(","),Error(y(268,e)));return e=kf(t),e=e===null?null:e.stateNode,e};Ue.flushSync=function(e){return Pa(e)};Ue.hydrate=function(e,t,a){if(!mn(t))throw Error(y(200));return gn(null,e,t,!0,a)};Ue.hydrateRoot=function(e,t,a){if(!ls(e))throw Error(y(405));var r=a!=null&&a.hydratedSources||null,o=!1,l="",n=rp;if(a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onRecoverableError!==void 0&&(n=a.onRecoverableError)),t=ap(t,null,e,1,a??null,o,!1,l,n),e[At]=t.current,oo(e),r)for(e=0;e<r.length;e++)a=r[e],o=a._getVersion,o=o(a._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[a,o]:t.mutableSourceEagerHydrationData.push(a,o);return new pn(t)};Ue.render=function(e,t,a){if(!mn(t))throw Error(y(200));return gn(null,e,t,!1,a)};Ue.unmountComponentAtNode=function(e){if(!mn(e))throw Error(y(40));return e._reactRootContainer?(Pa(function(){gn(null,null,e,!1,function(){e._reactRootContainer=null,e[At]=null})}),!0):!1};Ue.unstable_batchedUpdates=Zi;Ue.unstable_renderSubtreeIntoContainer=function(e,t,a,r){if(!mn(a))throw Error(y(200));if(e==null||e._reactInternals===void 0)throw Error(y(38));return gn(e,t,a,!1,r)};Ue.version="18.3.1-next-f1338f8080-20240426"});var up=vt((pL,np)=>{"use strict";function lp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lp)}catch(e){console.error(e)}}lp(),np.exports=op()});var sp=vt(ns=>{"use strict";var ip=up();ns.createRoot=ip.createRoot,ns.hydrateRoot=ip.hydrateRoot;var mL});var Rp=vt(Sn=>{"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ox=he(),lx=Symbol.for("react.element"),nx=Symbol.for("react.fragment"),ux=Object.prototype.hasOwnProperty,ix=ox.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,sx={key:!0,ref:!0,__self:!0,__source:!0};function Ap(e,t,a){var r,o={},l=null,n=null;a!==void 0&&(l=""+a),t.key!==void 0&&(l=""+t.key),t.ref!==void 0&&(n=t.ref);for(r in t)ux.call(t,r)&&!sx.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:lx,type:e,key:l,ref:n,props:o,_owner:ix.current}}Sn.Fragment=nx;Sn.jsx=Ap;Sn.jsxs=Ap});var B=vt((W0,Fp)=>{"use strict";Fp.exports=Rp()});var dm=A(he(),1),fm=A(sp(),1);var Lo="https://www.mma.go.kr",Te={A:"\uC785\uC601 \uC900\uBE44\xB7\uBCF5\uBB34 \uC911",B:"\uC804\uC5ED\xB7\uC608\uBE44\uAD70"};function Qh(e){return e.startsWith("/")?Lo+e:e}var Yh=[{id:"A-M01",title:"\uC548\uB0B4 \uBC0F \uC2E0\uCCAD(\uC9C0\uC6D0)",description:"\uD604\uC5ED\uBCD1\xB7\uBAA8\uC9D1\uBCD1\xB7\uC785\uC601\uC77C\uC790 \uBCF8\uC778\uC120\uD0DD \uC2E0\uCCAD \uC548\uB0B4\uB85C \uAC00\uC694.",icon:"book-open",tone:"sand",links:[{label:"\uC548\uB0B4 \uBC0F \uC2E0\uCCAD(\uC9C0\uC6D0)",href:"/contents.do?mc=mma0003746",newTab:!1}]},{id:"A-M02",title:"\uC9C0\uC6D0\uC11C \uC791\uC131/\uC218\uC815/\uCDE8\uC18C",description:"\uBBFC\uC6D0\uD3EC\uD138\uC5D0\uC11C \uBAA8\uC9D1\uBCD1 \uC9C0\uC6D0\uC11C\uB97C \uC791\uC131\xB7\uC218\uC815\xB7\uCDE8\uC18C\uD574\uC694.",icon:"file-pen",tone:"blue",links:[{label:"\uC9C0\uC6D0\uC11C \uC791\uC131/\uC218\uC815/\uCDE8\uC18C",href:"https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp?menuNo=22041",newTab:!0}]},{id:"A-M03",title:"\uAD70\uC9C0\uC6D0 \uC11C\uBE44\uC2A4(\uBBFC\uC6D0/\uC870\uD68C)",description:"\uBBFC\uC6D0\uD3EC\uD138\uC5D0\uC11C \uC9C0\uC6D0 \uACB0\uACFC \uB4F1\uC744 \uC870\uD68C\uD574\uC694.",icon:"search",tone:"mint",links:[{label:"\uAD70\uC9C0\uC6D0 \uC11C\uBE44\uC2A4(\uBBFC\uC6D0/\uC870\uD68C)",href:"https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp?menuNo=22037",newTab:!1}]},{id:"A-M04",title:"\uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D",description:"\uC721\xB7\uD574\xB7\uD574\uBCD1\xB7\uACF5\uAD70\uC758 \uC774\uBC88 \uB2EC \uBAA8\uC9D1\uACC4\uD68D\uC744 \uD655\uC778\uD574\uC694.",icon:"calendar",tone:"blue",links:[{label:"\uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D",href:"/contents.do?mc=mma0000743",newTab:!1}]},{id:"A-M05",title:"\uC548\uB0B4 \uBC0F \uC9C0\uC6D0\uC808\uCC28",description:"\uC9C0\uC6D0\uC790\uACA9, \uC811\uC218, \uC120\uBC1C\uC808\uCC28\uB97C \uD655\uC778\uD574\uC694.",icon:"shield-check",tone:"mint",links:[{label:"\uC548\uB0B4 \uBC0F \uC9C0\uC6D0\uC808\uCC28",href:"/contents.do?mc=mma0000386",newTab:!1}]},{id:"A-M06",title:"\uBAA8\uC9D1 \uACF5\uC9C0\uC0AC\uD56D",description:"\uBAA8\uC9D1 \uAD00\uB828 \uACF5\uC9C0\uB97C \uD655\uC778\uD574\uC694.",icon:"megaphone",tone:"solid",links:[{label:"\uBAA8\uC9D1 \uACF5\uC9C0\uC0AC\uD56D",href:"/board/boardList.do?mc=usr0000127&gesipan_id=69",newTab:!1}]},{id:"A-M07",title:"\uBCD1\uC5ED\uD310\uC815\uAC80\uC0AC",description:"\uAC80\uC0AC \uB300\uC0C1, \uAC80\uC0AC\uACFC\uC815\xB7\uC9C0\uCC38\uBB3C, \uC77C\uC790\uC5F0\uAE30\uB97C \uD655\uC778\uD574\uC694.",icon:"shield-check",tone:"mint",links:[{label:"\uBCD1\uC5ED\uD310\uC815\uAC80\uC0AC",href:"/contents.do?mc=usr0000167",newTab:!1}]},{id:"A-M08",title:"\uC785\uC601\uD310\uC815\uAC80\uC0AC",description:"\uC785\uC601\uD310\uC815\uAC80\uC0AC \uC548\uB0B4, \uC77C\uC790\xB7\uC7A5\uC18C \uBCC0\uACBD, \uC2E0\uCCAD \uBA54\uB274\uC608\uC694.",icon:"shield-check",tone:"blue",links:[{label:"\uC785\uC601\uD310\uC815\uAC80\uC0AC",href:"/contents.do?mc=mma0002909",newTab:!1}]},{id:"A-M09",title:"\uC7AC\uD559\uC0DD \uC785\uC601\uC5F0\uAE30",description:"\uC7AC\uD559\uC0DD \uC785\uC601\uC5F0\uAE30 \uB300\uC0C1\uACFC \uC808\uCC28\uB97C \uD655\uC778\uD574\uC694.",icon:"clock",tone:"blue",links:[{label:"\uC7AC\uD559\uC0DD \uC785\uC601\uC5F0\uAE30",href:"/contents.do?mc=usr0000174",newTab:!1}]},{id:"A-M10",title:"\uD604\uC5ED\uBCD1 \uC120\uBC1C\uCDE8\uC18C \uBC0F \uC785\uC601\uC77C\uC790 \uC5F0\uAE30\uC2E0\uCCAD",description:"\uC120\uBC1C\uCDE8\uC18C\uC640 \uC785\uC601\uC77C\uC790 \uC5F0\uAE30 \uC548\uB0B4\uB97C \uD655\uC778\uD574\uC694.",icon:"clock",tone:"sand",links:[{label:"\uD604\uC5ED\uBCD1 \uC120\uBC1C\uCDE8\uC18C \uBC0F \uC785\uC601\uC77C\uC790 \uC5F0\uAE30\uC2E0\uCCAD",href:"/contents.do?mc=usr0000295",newTab:!1}]},{id:"A-R01",title:"\uBCD1\uC5ED\uC774\uD589\uC77C\uC815\uC548\uB0B4",description:"\uC785\uB300\uC77C\uB85C \uC804\uC5ED\xB7\uC608\uBE44\uAD70 \uC77C\uC815\uAE4C\uC9C0 \uD655\uC778\uD574\uC694.",icon:"calendar",tone:"mint",links:[{label:"\uBCD1\uC5ED\uC774\uD589\uC77C\uC815\uC548\uB0B4",href:"/contents.do?mc=usr0000042",newTab:!1}]},{id:"A-R02",title:"\uBCD1\uBB34\uCCAD \uC9C0\uC815\uBCD1\uC6D0",description:"\uBCD1\uBB34\uC6A9\uC9C4\uB2E8\uC11C\uB97C \uBC1C\uAE09\uD558\uB294 \uBCD1\uC6D0\uC744 \uCC3E\uC544\uC694.",icon:"map-pin",tone:"blue",links:[{label:"\uBCD1\uBB34\uCCAD \uC9C0\uC815\uBCD1\uC6D0",href:"/contents.do?mc=usr0000147",newTab:!1}]},{id:"A-R03",title:"FAQ",description:"\uAC01 \uAD70 \uACF5\uD1B5\xB7\uAD70\uBCC4 \uBAA8\uC9D1 FAQ\uB97C \uBD10\uC694.",icon:"circle-help",tone:"sand",links:[{label:"FAQ",href:"/board/boardList.do?mc=mma0002306&gesipan_id=317",newTab:!1}]},{id:"A-R04",title:"\uACE0\uAC1D\uC13C\uD130\uC548\uB0B4",description:"\uC0C1\uB2F4 \uC804\uD654\uC640 \uC0C1\uB2F4 \uCC44\uB110\uC744 \uD655\uC778\uD574\uC694.",icon:"headset",tone:"mint",links:[{label:"\uACE0\uAC1D\uC13C\uD130\uC548\uB0B4",href:"/contents.do?mc=usr0000281",newTab:!1}]},{id:"A-R05",title:"\uC785\uC601\uC2DC \uC720\uC758\uC0AC\uD56D",description:"\uC785\uC601 \uC900\uBE44\uBB3C\uACFC \uC720\uC758\uC0AC\uD56D\uC744 \uD655\uC778\uD574\uC694.",icon:"book-open",tone:"sand",links:[{label:"\uC785\uC601\uC2DC \uC720\uC758\uC0AC\uD56D",href:"/contents.do?mc=usr0000294",newTab:!1}]},{id:"B-M01",title:"\uBCD1\uC801\uC99D\uBA85\uC11C \uB4F1 \uBC1C\uAE09\uC548\uB0B4",description:"\uBCD1\uC801\uC99D\uBA85\uC11C \uB4F1\uC758 \uBC1C\uAE09 \uB300\uC0C1\uACFC \uBC29\uBC95\uC744 \uD655\uC778\uD574\uC694.",icon:"file-text",tone:"solid",links:[{label:"\uBCD1\uC801\uC99D\uBA85\uC11C \uB4F1 \uBC1C\uAE09\uC548\uB0B4",href:"/contents.do?mc=usr0000146",newTab:!1}]},{id:"B-M02",title:"\uBCD1\uB825\uB3D9\uC6D0\uD6C8\uB828\uC18C\uC9D1",description:"\uB3D9\uC6D0\uD6C8\uB828 \uB300\uC0C1\uACFC \uD1B5\uC9C0, \uC5EC\uBE44 \uC548\uB0B4\uB97C \uD655\uC778\uD574\uC694.",icon:"shield-check",tone:"blue",links:[{label:"\uBCD1\uB825\uB3D9\uC6D0\uD6C8\uB828\uC18C\uC9D1",href:"/contents.do?mc=mma0002242",newTab:!1}]},{id:"B-M03",title:"\uC608\uBE44\uAD70 FAQ",description:"\uC608\uBE44\uAD70 \uD3B8\uC131\xB7\uB3D9\uC6D0 \uAD00\uB828 \uC9C8\uBB38\uC744 \uBD10\uC694.",icon:"circle-help",tone:"sand",links:[{label:"\uC608\uBE44\uAD70 FAQ",href:"/contents.do?mc=mma0003402",newTab:!1}]},{id:"B-M04",title:"\uC608\uBE44\uAD70 \uD648\uD398\uC774\uC9C0",description:"\uD6C8\uB828 \uC77C\uC815 \uD655\uC778\uACFC \uC2E0\uCCAD\uC740 \uC608\uBE44\uAD70 \uD648\uD398\uC774\uC9C0\uC5D0\uC11C \uD574\uC694.",icon:"book-open",tone:"sand",links:[{label:"\uC608\uBE44\uAD70 \uD648\uD398\uC774\uC9C0",href:"https://www.yebigun1.mil.kr",newTab:!0}]},{id:"B-M05",title:"\uBBFC\uC6D0\uC2E0\uCCAD / \uBBFC\uC6D0\uCC98\uB9AC\uACB0\uACFC\uC870\uD68C",description:"\uBBFC\uC6D0\uC744 \uC2E0\uCCAD\uD558\uAC70\uB098 \uCC98\uB9AC \uACB0\uACFC\uB97C \uC870\uD68C\uD574\uC694.",icon:"search",tone:"mint",links:[{label:"\uBBFC\uC6D0\uC2E0\uCCAD / \uBBFC\uC6D0\uCC98\uB9AC\uACB0\uACFC\uC870\uD68C",href:"https://mwpt.mma.go.kr",newTab:!0}]},{id:"B-R01",title:"\uC608\uBE44\uAD70 \uBCF4\uB958(\uD574\uC18C) \uC2E0\uCCAD",description:"\uC608\uBE44\uAD70 \uD648\uD398\uC774\uC9C0\uC5D0\uC11C \uBCF4\uB958\xB7\uD574\uC18C\uB97C \uC2E0\uCCAD\uD574\uC694.",icon:"file-pen",tone:"blue",links:[{label:"\uC608\uBE44\uAD70 \uBCF4\uB958(\uD574\uC18C) \uC2E0\uCCAD",href:"https://www.yebigun1.mil.kr",newTab:!0}]},{id:"B-R02",title:"\uAD70\uBC88\uCC3E\uAE30 \uC548\uB0B4",description:"\uAD70\uBC88\uC744 \uCC3E\uB294 \uBC29\uBC95\uC744 \uD655\uC778\uD574\uC694.",icon:"search",tone:"mint",links:[{label:"\uAD70\uBC88\uCC3E\uAE30 \uC548\uB0B4",href:"/contents.do?mc=mma0003365",newTab:!1}]},{id:"B-R03",title:"\uB3D9\uC6D0 \uD45C\uC900\uD6C8\uB828\uC7A5 \uAC00\uB294\uAE38",description:"\uD6C8\uB828\uC7A5 \uC8FC\uC18C\uC640 \uAD50\uD1B5\uD3B8\uC744 \uD655\uC778\uD574\uC694.",icon:"map-pin",tone:"blue",links:[{label:"\uB3D9\uC6D0 \uD45C\uC900\uD6C8\uB828\uC7A5 \uAC00\uB294\uAE38",href:"/contents.do?mc=mma0002096",newTab:!1}]},{id:"B-R04",title:"\uACE0\uAC1D\uC13C\uD130\uC548\uB0B4",description:"\uC0C1\uB2F4 \uC804\uD654\uC640 \uC0C1\uB2F4 \uCC44\uB110\uC744 \uD655\uC778\uD574\uC694.",icon:"headset",tone:"mint",links:[{label:"\uACE0\uAC1D\uC13C\uD130\uC548\uB0B4",href:"/contents.do?mc=usr0000281",newTab:!1}]},{id:"B-R05",title:"\uB098\uB77C\uC0AC\uB791 \uAC00\uAC8C",description:"\uB3D9\uC6D0\uD6C8\uB828 \uC774\uC218\uC790 \uD560\uC778 \uC81C\uB3C4\uC640 \uAC00\uAC8C\uB97C \uCC3E\uC544\uBD10\uC694.",icon:"store",tone:"sand",links:[{label:"\uB098\uB77C\uC0AC\uB791 \uAC00\uAC8C",href:"/contents.do?mc=mma0003356",newTab:!1}]}],us=Yh.map(e=>({...e,links:e.links.map(t=>({...t,href:Qh(t.href)}))})),hn={A:{main:["A-M01","A-M02","A-M03","A-M04","A-M05","A-M06","A-M07","A-M08","A-M09","A-M10"],more:["A-R01","A-R02","A-R03","A-R04","A-R05"]},B:{main:["B-M01","B-M02","B-M03","B-M04","B-M05"],more:["B-R01","B-R02","B-R03","B-R04","B-R05"]}},Zh=new Map(us.map(e=>[e.id,e]));function xn(e){let t=Zh.get(e);if(!t)throw new Error(`[bmgj] unknown card ${e}`);return t}var dp="https://mwpt.mma.go.kr";function cr(e){return`${dp}/caisBMHS/index_mwps.jsp?menuNo=${e}`}var xL=`${dp}/caisBMHS/index_mwps.jsp`,fp=cr("22399"),It=(e,t)=>({label:e,href:cr(t),newTab:!1});function N(e,t,a,r,o,l){return{id:e,title:t,description:a,icon:r,tone:o,links:typeof l=="string"?[It(t,l)]:l}}var is=[N("P-A-M01","\uBCD1\uC5ED\uD310\uC815\uAC80\uC0AC \uC77C\uC790 \uC120\uD0DD","\uAC80\uC0AC \uB0A0\uC9DC\xB7\uC7A5\uC18C\uB97C \uC9C1\uC811 \uACE8\uB77C\uC694.","calendar","mint",[It("\uC2E0\uCCAD","22017"),It("\uBCC0\uACBD","22018"),It("\uCDE8\uC18C","22019")]),N("P-A-M02","\uBCD1\uC5ED\uD310\uC815\uAC80\uC0AC \uC77C\uC790\uC5F0\uAE30","\uAC80\uC0AC\uC77C 5\uC77C \uC804\uAE4C\uC9C0 \uC2E0\uCCAD\uD574\uC694.","clock","blue","22021"),N("P-A-M03","\uC785\uC601\uD310\uC815\uAC80\uC0AC \uC2E0\uCCAD","\uC785\uC601 \uC9C1\uC804 \uAC80\uC0AC\uB97C \uC2E0\uCCAD\xB7\uCDE8\uC18C\uD574\uC694.","shield-check","sand",[It("\uC2E0\uCCAD","22365"),It("\uC2E0\uCCAD \uCDE8\uC18C","22366")]),N("P-A-M04","\uC62C\uD574 \uC785\uC601\uC77C\uC790 \uC120\uD0DD","\uC120\uCC29\uC21C\uC73C\uB85C \uBC14\uB85C \uACB0\uC815\uB3FC\uC694.","calendar","blue","22059"),N("P-A-M05","\uB2E4\uC74C\uC5F0\uB3C4 \uC811\uC218 \uC77C\uC815","\uB0B4 \uC811\uC218 \uD68C\uCC28\uC640 \uC77C\uC2DC\uB97C \uD655\uC778\uD574\uC694.","search","mint","22374"),N("P-A-M06","\uB0B4\uB144 \uC785\uC601\uC77C\uC790 \uC120\uD0DD","\uC785\uC601\uC77C 60\uC77C \uC804\uAE4C\uC9C0 1\uD68C \uBCC0\uACBD\uD574\uC694.","calendar","solid","22308"),N("P-A-M07","\uC785\uC601\uC77C\uC790\xB7\uBD80\uB300 \uC870\uD68C","\uACB0\uC815\uB41C \uC785\uC601\uC77C\uACFC \uBD80\uB300\uB97C \uD655\uC778\uD574\uC694.","map-pin","sand","22073"),N("P-A-M08","\uC785\uC601\uC77C\uC790 \uC5F0\uAE30","\uBD80\uB4DD\uC774\uD55C \uC0AC\uC720\uB85C \uC785\uC601\uC744 \uBBF8\uB904\uC694.","clock","sand","22062"),N("P-A-M09","\uC785\uC601\uD1B5\uC9C0\uC11C \uCD9C\uB825","\uC785\uC601 \uB2F9\uC77C \uAC00\uC838\uAC00\uC694.","printer","blue","22077"),N("P-A-M10","\uD1B5\uD569\uC9C0\uC6D0\uC11C \uC791\uC131","\uC721\xB7\uD574\xB7\uD574\uBCD1\xB7\uACF5\uAD70 \uBAA8\uC9D1\uBCD1 \uC9C0\uC6D0.","file-pen","mint","22041"),N("P-A-M11","\uC2E4\uC2DC\uAC04 \uC9C0\uC6D0\uD604\uD669","\uBD84\uC57C\uBCC4 \uC9C0\uC6D0 \uC778\uC6D0\uC744 \uBD10\uC694.","chart","blue","22039"),N("P-A-M12","\uC811\uC218\uACB0\uACFC\xB7\uD569\uACA9 \uC870\uD68C","\uC218\uD5D8\uD45C\uC640 \uD569\uACA9 \uC5EC\uBD80\uB97C \uD655\uC778\uD574\uC694.","search","sand",[It("\uC9C0\uC6D0\uC11C\uC811\uC218\uACB0\uACFC\xB7\uC218\uD5D8\uD45C\uC870\uD68C","22052"),It("\uD569\uACA9\uC5EC\uBD80\uC870\uD68C","22053")]),N("P-A-R01","\uAC80\uC0AC \uD76C\uB9DD\uC77C\uC815 \uC870\uD68C","\uB0A0\uC9DC\uBCC4 \uB0A8\uC740 \uC790\uB9AC\uB97C \uD655\uC778\uD574\uC694.","calendar","mint","22223"),N("P-A-R02","\uAC80\uC0AC \uC77C\uC790\xB7\uC7A5\uC18C \uC870\uD68C","\uD655\uC815\uB41C \uAC80\uC0AC \uC77C\uC815\uC744 \uD655\uC778\uD574\uC694.","search","blue","22025"),N("P-A-R03","\uAC80\uC0AC \uCD9C\uC11D\uD655\uC778\uC11C","\uD559\uAD50\xB7\uC9C1\uC7A5 \uC81C\uCD9C\uC6A9\uC73C\uB85C \uCD9C\uB825\uD574\uC694.","printer","sand","22257"),N("P-A-R04","\uC785\uC601\uD310\uC815\uAC80\uC0AC \uC77C\uC815 \uBCC0\uACBD","\uC77C\uC790\uC640 \uC7A5\uC18C\uB97C \uBC14\uAFD4\uC694.","calendar","blue","22364"),N("P-A-R05","\uC785\uC601\uC77C\uC790 \uC5F0\uAE30\uD3EC\uAE30","\uC5F0\uAE30\uB97C \uD3EC\uAE30\uD558\uACE0 \uC785\uC601\uD574\uC694.","clock","mint","22261"),N("P-A-R06","\uCDE8\uC5C5\uB9DE\uCDA4\uD2B9\uAE30\uBCD1 \uC9C0\uC6D0","\uCDE8\uC5C5\uB9DE\uCDA4\uD2B9\uAE30\uBCD1\uC5D0 \uC9C0\uC6D0\uD574\uC694.","file-pen","sand","22222"),N("P-A-R07","\uC9C0\uC6D0\uC11C \uC218\uC815","\uB0B4\uC6A9\uC774\uB098 \uD76C\uB9DD\uC21C\uC704\uB97C \uBC14\uAFD4\uC694.","file-pen","blue",[It("\uC9C0\uC6D0\uC11C\uC218\uC815","22043"),It("\uD76C\uB9DD\uC21C\uC704\uBCC0\uACBD","22044")]),N("P-A-R08","\uC9C0\uC6D0\uC11C \uC811\uC218\uCDE8\uC18C","\uCD5C\uC885 \uBC1C\uD45C 7\uC77C \uC804\uAE4C\uC9C0 \uAC00\uB2A5\uD574\uC694.","file-x","sand","22045"),N("P-A-R09","\uC721\uAD70 \uCD94\uAC00\uBAA8\uC9D1","\uC815\uADDC \uBAA8\uC9D1\uC744 \uB193\uCCE4\uB2E4\uBA74 \uC9C0\uC6D0\uD574\uC694.","megaphone","mint","22201"),N("P-A-R10","\uC11C\uB958\uC81C\uCD9C","1\uCC28 \uD569\uACA9 \uD6C4 \uC11C\uB958\uB97C \uB0B4\uC694.","file-text","blue","22380"),N("P-A-R11","\uC120\uBC1C\uCDE8\uC18C \uC2E0\uCCAD","\uBAA8\uC9D1\uBCD1 \uC120\uBC1C\uC744 \uCDE8\uC18C\uD574\uC694.","file-x","sand","22046"),N("P-B-M01","\uB3D9\uC6D0\uD6C8\uB828 \uC5F0\uAE30","\uC18C\uC9D1\uC77C 5\uC77C \uC804\uAE4C\uC9C0 \uC2E0\uCCAD\uD574\uC694.","clock","blue","22123"),N("P-B-M02","\uC18C\uC9D1\uD1B5\uC9C0\uC11C \uCD9C\uB825","\uBABB \uBC1B\uC740 \uD1B5\uC9C0\uC11C\uB97C \uCD9C\uB825\uD574\uC694.","printer","sand","22138"),N("P-B-M03","\uD6C8\uB828 \uC77C\uC790\xB7\uAD50\uD1B5\uD3B8 \uC870\uD68C","\uC18C\uC9D1\uC77C\uACFC \uC785\uC601\uBD80\uB300\uB97C \uD655\uC778\uD574\uC694.","calendar","solid","22132"),N("P-B-M04","\uBCD1\uC801\uC99D\uBA85\uC11C \uBC1C\uAE09","\uCDE8\uC5C5 \uB4F1\uC5D0 \uB0B4\uB294 \uC99D\uBA85\uC11C\uC608\uC694.","file-text","mint","22029"),N("P-B-R01","\uD1B5\uC9C0\uC11C \uC571\xB7\uBA54\uC77C \uC218\uB839","\uD1B5\uC9C0\uC11C\uB97C \uC571\xB7\uBA54\uC77C\uB85C \uBC1B\uC544\uC694.","file-text","mint","22275"),N("P-B-R02","\uD1B5\uC9C0\uC11C \uD76C\uB9DD \uC218\uB839\uC9C0","\uB2E4\uB978 \uACF3\uC5D0\uC11C \uD1B5\uC9C0\uC11C\uB97C \uBC1B\uC544\uC694.","map-pin","blue","22126"),N("P-B-R03","\uC785\uC601\uBC29\uBC95 \uBCC0\uACBD","\uAC1C\uBCC4\xB7\uCC28\uB7C9 \uC785\uC601\uC744 \uBC14\uAFD4\uC694.","bus","sand","22127"),N("P-B-R04","\uC0AC\uC804 \uC5EC\uBE44\uC9C0\uAE09 \uC2E0\uCCAD","\uD6C8\uB828 \uC5EC\uBE44\uB97C \uBBF8\uB9AC \uBC1B\uC544\uC694.","wallet","mint","22130")],Ln={A:{main:["P-A-M01","P-A-M02","P-A-M03","P-A-M04","P-A-M05","P-A-M06","P-A-M07","P-A-M08","P-A-M09","P-A-M10","P-A-M11","P-A-M12"],more:["P-A-R01","P-A-R02","P-A-R03","P-A-R04","P-A-R05","P-A-R06","P-A-R07","P-A-R08","P-A-R09","P-A-R10","P-A-R11"]},B:{main:["P-B-M01","P-B-M02","P-B-M03","P-B-M04"],more:["P-B-R01","P-B-R02","P-B-R03","P-B-R04"]}},cp={A:{main:12,more:11},B:{main:4,more:4}},Jh=new Map(is.map(e=>[e.id,e]));function Io(e){let t=Jh.get(e);if(!t)throw new Error(`[bmgj] unknown portal card ${e}`);return t}var ex={A:{main:10,more:5},B:{main:5,more:5}};function ss(e,t,a=ex){let r=[],o=new Set;for(let l of e){o.has(l.id)&&r.push(`\uCE74\uB4DC ID \uC911\uBCF5: ${l.id}`),o.add(l.id),l.links.length===0&&r.push(`\uB9C1\uD06C \uC5C6\uC74C: ${l.id}`);for(let n of l.links)n.href.startsWith("https:")||r.push(`https \uC544\uB2D8: ${l.id} ${n.href}`)}for(let l of Object.keys(a)){let n=t[l];if(!n){r.push(`\uB808\uC774\uC544\uC6C3 \uC5C6\uC74C: ${l}`);continue}let u=a[l];n.main.length!==u.main&&r.push(`${l} main \uAC1C\uC218 ${n.main.length} (\uAE30\uB300 ${u.main})`),n.more.length!==u.more&&r.push(`${l} more \uAC1C\uC218 ${n.more.length} (\uAE30\uB300 ${u.more})`);for(let i of[...n.main,...n.more])o.has(i)||r.push(`${l} \uB808\uC774\uC544\uC6C3\uC758 ID\uAC00 \uCE74\uB4DC \uBAA9\uB85D\uC5D0 \uC5C6\uC74C: ${i}`)}return{ok:r.length===0,errors:r}}var ds=e=>(e||"").replace(/\s+/g," ").trim();function pp(e){let t=(e.getAttribute("href")||"").trim(),a=ds(e.textContent);if(!a||!t||t==="#"||t.toLowerCase().startsWith("javascript:"))return null;let r;try{r=new URL(t,location.href)}catch{return null}return r.protocol!=="https:"&&r.protocol!=="http:"?null:{label:a,href:r.href,newTab:e.target==="_blank"}}function mp(){let e=document.getElementById("mobile-nav");if(!e)return[];let t=[];return e.querySelectorAll(".menu-wrap a.gnb-main-trigger").forEach((a,r)=>{let o=(a.getAttribute("href")||"").replace(/^#/,""),l=o?e.querySelector(`#${CSS.escape(o)}`):null;if(!l)return;let n=[];for(let u of l.querySelectorAll(":scope > ul > li")){let i=u.querySelector(":scope > a");if(!i)continue;let s=[...u.querySelectorAll(":scope ul a")].map(pp).filter(m=>m!==null),p=pp(i);!p&&s.length===0||n.push({label:ds(i.textContent),link:p,items:s})}n.length>0&&t.push({id:`bmgj-cat-${r}`,label:ds(a.textContent),sections:n})}),t}var tx=/^\d{4}-\d{2}-\d{2}$/;function ax(e){let t=e.querySelector("a[href]");if(!t)return null;let a=(t.getAttribute("title")||t.textContent||"").replace(/\s+/g," ").trim(),r=(e.querySelector("span")?.textContent||"").trim(),o;try{o=new URL(t.getAttribute("href")||"",location.href)}catch{return null}return!a||!tx.test(r)||o.origin!==Lo?null:{title:a,href:o.href,date:r}}function gp(e,t){let a=document.getElementById(e);if(!a)return null;let r=[];for(let o of a.querySelectorAll("li")){let l=ax(o);if(l&&r.push(l),r.length===t)break}return r.length>0?r:null}function hp(){return{notices:gp("tab2c1",2),policies:gp("tab2c3",1)}}var pr="bmgj.prefs",fs={schemaVersion:1,group:null,viewMode:"improved"};function xp(e){if(typeof e!="object"||e===null)return{...fs};let t=e,a=t.group==="A"||t.group==="B"||t.group===null,r=t.viewMode==="improved"||t.viewMode==="original";return t.schemaVersion!==1||!a||!r?{...fs}:{schemaVersion:1,group:t.group,viewMode:t.viewMode}}async function mr(){try{let e=await chrome.storage.local.get(pr);return xp(e[pr])}catch{return{...fs}}}async function Lp(e){try{let a={...await mr(),...e,schemaVersion:1};return await chrome.storage.local.set({[pr]:a}),!0}catch{return!1}}var na=e=>Lp({group:e}),ua=e=>Lp({viewMode:e});async function Ip(){try{return await chrome.storage.local.remove(pr),!0}catch{return!1}}function gr(e){let t=(a,r)=>{r!=="local"||!(pr in a)||e(xp(a[pr].newValue))};return chrome.storage.onChanged.addListener(t),()=>chrome.storage.onChanged.removeListener(t)}var H=A(he(),1);var ia="bmgj-root";function Cp(){let e=document.getElementById("secrion"),t=document.querySelector("#krds-header button.btn-navi.all"),a=document.getElementById("krds-header");return!e||!t||!a?null:{header:a,headerInner:a.querySelector(".header-in"),section:e,footer:document.getElementById("krds-footer"),allMenuButton:t}}var In=new Map;function yp(e){In.has(e)||In.set(e,{style:e.getAttribute("style"),hidden:e.hidden})}function vp(e){for(let t of[e.headerInner,e.section,e.footer])t&&(yp(t),t.style.setProperty("display","none","important"));yp(e.header),e.header.style.setProperty("margin-bottom","0","important")}function yn(){for(let[e,t]of In)t.style===null?e.removeAttribute("style"):e.setAttribute("style",t.style),e.hidden=t.hidden;In.clear()}function wp(e){let t=document.getElementById(ia);if(t)return t;let a=document.createElement("div");return a.id=ia,e.insertAdjacentElement("afterend",a),a}function Sp(){document.getElementById(ia)?.remove()}var vn=A(he());/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var kp=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Cn=(...e)=>e.filter((t,a,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===a).join(" ").trim();var yo=A(he());/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pp=(0,yo.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:r,className:o="",children:l,iconNode:n,...u},i)=>(0,yo.createElement)("svg",{ref:i,...bp,width:t,height:t,stroke:e,strokeWidth:r?Number(a)*24/Number(t):a,className:Cn("lucide",o),...u},[...n.map(([s,p])=>(0,yo.createElement)(s,p)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var T=(e,t)=>{let a=(0,vn.forwardRef)(({className:r,...o},l)=>(0,vn.createElement)(Pp,{ref:l,iconNode:t,className:Cn(`lucide-${kp(e)}`,r),...o}));return a.displayName=`${e}`,a};/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Co=T("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var vo=T("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var wo=T("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var So=T("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var sa=T("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ko=T("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var da=T("CircleHelp",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ra=T("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fa=T("FilePen",[["path",{d:"M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5",key:"1couwa"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",key:"1y4qbx"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var bo=T("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Po=T("FileX",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m14.5 12.5-5 5",key:"b62r18"}],["path",{d:"m9.5 12.5 5 5",key:"1rk7el"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Mo=T("Headset",[["path",{d:"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",key:"12oyoe"}],["path",{d:"M21 16v2a4 4 0 0 1-4 4h-5",key:"1x7m43"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ao=T("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ro=T("Megaphone",[["path",{d:"m3 11 18-5v12L3 14v-3z",key:"n962bs"}],["path",{d:"M11.6 16.8a3 3 0 1 1-5.8-1.6",key:"1yl0tm"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Fo=T("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Fa=T("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var To=T("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Eo=T("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",key:"6c3vgh"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Do=T("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var jo=T("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var hr=T("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ut=A(he(),1);function Bo(e){return e.slice(0,100).normalize("NFKC").replace(/\s+/g," ").trim().toLowerCase()}function Mp(e,t){let a=Bo(t);if(!a)return[];let r=[],o=new Set,l=(n,u)=>{let i=`${n.href}|${n.label}`;o.has(i)||(o.add(i),r.push({entry:n,path:u}))};for(let n of e)for(let u of n.sections){let i=Bo(u.label).includes(a);u.link&&i&&l(u.link,[n.label]);for(let s of u.items)(i||Bo(s.label).includes(a))&&l(s,[n.label,u.label])}return r}var cs=A(he(),1),rx='a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';function wn(e,t,a){(0,cs.useEffect)(()=>{(a?.current??e.current)?.focus()},[e,a]),(0,cs.useEffect)(()=>{let r=e.current;if(!r)return;let o=l=>{if(l.key==="Escape"){l.preventDefault(),l.stopPropagation(),t();return}if(l.key!=="Tab")return;let n=[...r.querySelectorAll(rx)];if(n.length===0)return;let u=r.getRootNode().activeElement,i=u?n.indexOf(u):-1,s=n[0],p=n[n.length-1];i===-1?(l.preventDefault(),(l.shiftKey?p:s).focus()):l.shiftKey&&i===0?(l.preventDefault(),p.focus()):!l.shiftKey&&i===n.length-1&&(l.preventDefault(),s.focus())};return document.addEventListener("keydown",o,!0),()=>document.removeEventListener("keydown",o,!0)},[e,t])}var F=A(B(),1);function ps(e){return e.newTab?{href:e.href,target:"_blank",rel:"noopener noreferrer"}:{href:e.href}}function ms({show:e}){return e?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)("span",{className:"bmgj-newtab","aria-hidden":"true",children:["\xA0","\u2197"]}),(0,F.jsx)("span",{className:"bmgj-sr-only",children:"(\uC0C8 \uD0ED)"})]}):null}function kn({menu:e,onClose:t}){let a=(0,ut.useRef)(null),r=(0,ut.useRef)(null),[o,l]=(0,ut.useState)(""),[n,u]=(0,ut.useState)(e[0]?.id??""),[i,s]=(0,ut.useState)("");wn(a,t,r);let p=Bo(o)!=="",m=(0,ut.useMemo)(()=>Mp(e,o),[e,o]),g=e.find(h=>h.id===n)??e[0];return(0,ut.useEffect)(()=>{if(!p)return;let h=window.setTimeout(()=>s(`\uC804\uCCB4 \uBA54\uB274 \uAC80\uC0C9 \uACB0\uACFC ${m.length}\uAC1C`),600);return()=>window.clearTimeout(h)},[p,m.length,o]),(0,F.jsx)("div",{className:"bmgj-overlay",onMouseDown:h=>{h.target===h.currentTarget&&(h.preventDefault(),t())},children:(0,F.jsxs)("div",{ref:a,className:"bmgj-dialog bmgj-allmenu",role:"dialog","aria-modal":"true","aria-labelledby":"bmgj-allmenu-title",tabIndex:-1,children:[(0,F.jsxs)("div",{className:"bmgj-info-head",children:[(0,F.jsx)("h2",{id:"bmgj-allmenu-title",className:"bmgj-dialog-title",children:"\uC804\uCCB4 \uBA54\uB274"}),(0,F.jsx)("button",{type:"button",className:"bmgj-icon-btn","aria-label":"\uB2EB\uAE30",onClick:t,children:(0,F.jsx)(hr,{size:22,strokeWidth:1.75,"aria-hidden":"true"})})]}),(0,F.jsxs)("div",{className:"bmgj-search bmgj-allmenu-search",role:"search",children:[(0,F.jsx)("input",{ref:r,className:"bmgj-search-input",type:"search",value:o,maxLength:100,placeholder:"\uC5B4\uB5A4 \uBA54\uB274\uB97C \uCC3E\uC73C\uC138\uC694?","aria-label":"\uC804\uCCB4 \uBA54\uB274 \uAC80\uC0C9",onChange:h=>l(h.target.value),onKeyDown:h=>{h.key==="Enter"&&h.preventDefault()}}),o&&(0,F.jsx)("button",{type:"button",className:"bmgj-search-clear","aria-label":"\uAC80\uC0C9\uC5B4 \uC9C0\uC6B0\uAE30",onClick:()=>{l(""),r.current?.focus()},children:(0,F.jsx)(hr,{size:18,strokeWidth:1.75,"aria-hidden":"true"})})]}),(0,F.jsx)("div",{className:"bmgj-sr-only","aria-live":"polite",children:i}),p?(0,F.jsxs)("div",{className:"bmgj-allmenu-scroll",children:[(0,F.jsxs)("p",{className:"bmgj-search-count",children:["\uC804\uCCB4 \uBA54\uB274 \uAC80\uC0C9 \uACB0\uACFC ",m.length,"\uAC1C"]}),m.length>0?(0,F.jsx)("ul",{className:"bmgj-allmenu-results",children:m.map(h=>(0,F.jsx)("li",{children:(0,F.jsxs)("a",{className:"bmgj-allmenu-result",...ps(h.entry),children:[(0,F.jsx)("span",{className:"bmgj-allmenu-path",children:h.path.join(" \u203A ")}),(0,F.jsxs)("span",{className:"bmgj-allmenu-label",children:[h.entry.label,(0,F.jsx)(ms,{show:h.entry.newTab})]})]})},`${h.entry.href}|${h.entry.label}`))}):(0,F.jsx)("p",{className:"bmgj-allmenu-empty",children:"\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uB978 \uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD574 \uBCF4\uC138\uC694."})]}):(0,F.jsxs)("div",{className:"bmgj-allmenu-body",children:[(0,F.jsx)("ul",{className:"bmgj-allmenu-cats","aria-label":"\uB300\uBD84\uB958",children:e.map(h=>(0,F.jsx)("li",{children:(0,F.jsx)("button",{type:"button",className:"bmgj-allmenu-cat","aria-pressed":h.id===g?.id,"aria-controls":"bmgj-allmenu-list",onClick:()=>u(h.id),children:h.label})},h.id))}),(0,F.jsx)("div",{id:"bmgj-allmenu-list",className:"bmgj-allmenu-list",children:g&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)("h3",{className:"bmgj-allmenu-cat-title",children:g.label}),g.sections.map(h=>(0,F.jsxs)("div",{className:"bmgj-allmenu-sec",children:[h.link?(0,F.jsxs)("a",{className:"bmgj-allmenu-sec-title",...ps(h.link),children:[h.label,(0,F.jsx)(ms,{show:h.link.newTab})]}):(0,F.jsx)("h4",{className:"bmgj-allmenu-sec-title",children:h.label}),h.items.length>0&&(0,F.jsx)("ul",{className:"bmgj-allmenu-items",children:h.items.map(C=>(0,F.jsx)("li",{children:(0,F.jsxs)("a",{className:"bmgj-allmenu-item",...ps(C),children:[C.label,(0,F.jsx)(ms,{show:C.newTab})]})},`${C.href}|${C.label}`))})]},h.label))]})})]})]})})}var xr=A(B(),1);function bn(){return(0,xr.jsxs)("footer",{className:"bmgj-footer",children:[(0,xr.jsx)("a",{className:"bmgj-footer-link",href:"https://www.mma.go.kr/contents.do?mc=usr0000276",children:"\uC9C0\uBC29\uCCAD \uC548\uB0B4"}),(0,xr.jsx)("span",{"aria-hidden":"true",children:"\xB7"}),(0,xr.jsx)("a",{className:"bmgj-footer-link",href:"https://www.mma.go.kr/contents.do?mc=usr0000281",children:"\uACE0\uAC1D\uC13C\uD130\uC548\uB0B4"})]})}var Pn=A(he(),1);var He=A(B(),1),fx=[{group:"A",description:"\uBAA8\uC9D1\uBCD1 \uC9C0\uC6D0, \uBCD1\uC5ED\uD310\uC815\uAC80\uC0AC, \uC785\uC601 \uC5F0\uAE30 \uB4F1"},{group:"B",description:"\uBCD1\uC801\uC99D\uBA85\uC11C \uBC1C\uAE09 \uC548\uB0B4, \uB3D9\uC6D0\uD6C8\uB828 \uC548\uB0B4 \uB4F1"}];function Mn({onSelect:e,onShowOriginal:t}){let a=(0,Pn.useRef)(null),r=(0,Pn.useCallback)(()=>t(),[t]);return wn(a,r),(0,He.jsx)("div",{className:"bmgj-overlay",onMouseDown:o=>{o.target===o.currentTarget&&o.preventDefault()},children:(0,He.jsxs)("div",{ref:a,className:"bmgj-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"bmgj-group-title","aria-describedby":"bmgj-group-desc",tabIndex:-1,children:[(0,He.jsx)("p",{className:"bmgj-dialog-label",children:"\uBCD1\uBB34\uAE38\uC7A1\uC774"}),(0,He.jsx)("h2",{id:"bmgj-group-title",className:"bmgj-dialog-title",children:"\uC9C0\uAE08 \uC5B4\uB5A4 \uC0C1\uD669\uC778\uAC00\uC694?"}),(0,He.jsx)("p",{id:"bmgj-group-desc",className:"bmgj-dialog-desc",children:"\uC120\uD0DD\uC5D0 \uB9DE\uCDB0 \uC790\uC8FC \uC4F0\uB294 \uBA54\uB274\uB97C \uC55E\uC5D0 \uBCF4\uC5EC \uB4DC\uB824\uC694. \uB098\uC911\uC5D0 \uC5B8\uC81C\uB4E0 \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694."}),(0,He.jsx)("div",{className:"bmgj-choices",children:fx.map(({group:o,description:l})=>(0,He.jsxs)("button",{type:"button",className:"bmgj-choice",onClick:()=>e(o),children:[(0,He.jsx)("span",{className:"bmgj-choice-title",children:Te[o]}),(0,He.jsx)("span",{className:"bmgj-choice-desc",children:l})]},o))}),(0,He.jsx)("p",{className:"bmgj-dialog-note",children:"\uC120\uD0DD\uD55C \uAC12\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5\uB418\uACE0 \uC678\uBD80\uB85C \uBCF4\uB0B4\uC9C0 \uC54A\uC544\uC694."}),(0,He.jsx)("button",{type:"button",className:"bmgj-link-btn",onClick:t,children:"\uC6D0\uB798 \uD654\uBA74\uC73C\uB85C \uBCF4\uAE30"})]})})}var Y=A(B(),1),Tp="https://www.mma.go.kr/images/syjy/common/ico_mma_logo.svg",cx="https://mwpt.mma.go.kr",px="https://mwpt.mma.go.kr/caisBMHS/index_mwps.jsp";function An({group:e,onOpenSearch:t,searchButtonRef:a,onGroupChange:r,onShowOriginal:o,originalButtonRef:l,site:n="main",session:u}){return(0,Y.jsxs)("header",{className:"bmgj-header",children:[(0,Y.jsxs)("div",{className:"bmgj-header-brand",children:[(0,Y.jsxs)("nav",{className:"bmgj-sites","aria-label":"\uC0AC\uC774\uD2B8",children:[(0,Y.jsx)("a",{className:"bmgj-site",href:`${Lo}/index.do`,"aria-current":n==="main"?"page":void 0,children:(0,Y.jsxs)("span",{className:"bmgj-logo",role:"img","aria-label":"\uBCD1\uBB34\uCCAD",children:[(0,Y.jsx)("span",{className:"bmgj-logo-mark",children:(0,Y.jsx)("img",{src:Tp,alt:""})}),(0,Y.jsx)("span",{className:"bmgj-logo-word",children:(0,Y.jsx)("img",{src:Tp,alt:""})})]})}),n==="portal"?(0,Y.jsx)("a",{className:"bmgj-site",href:px,"aria-current":"page",children:"\uBCD1\uBB34\uBBFC\uC6D0"}):(0,Y.jsxs)("a",{className:"bmgj-site",href:cx,target:"_blank",rel:"noopener noreferrer",children:["\uBCD1\uBB34\uBBFC\uC6D0",(0,Y.jsx)("span",{className:"bmgj-sr-only",children:"(\uC0C8 \uD0ED)"})]})]}),(0,Y.jsx)("span",{className:"bmgj-unofficial",children:"\uBE44\uACF5\uC2DD \uB3C4\uC6B0\uBBF8"})]}),(0,Y.jsx)("div",{className:"bmgj-search",children:(0,Y.jsxs)("button",{ref:a,type:"button",className:"bmgj-search-input bmgj-search-trigger","aria-haspopup":"dialog",onClick:t,children:[(0,Y.jsx)(Fa,{size:18,strokeWidth:1.75,"aria-hidden":"true"}),"\uC5B4\uB5A4 \uBA54\uB274\uB97C \uCC3E\uC73C\uC138\uC694?"]})}),(0,Y.jsxs)("div",{className:"bmgj-header-controls",children:[u,e&&(0,Y.jsxs)("div",{className:"bmgj-select-wrap",children:[(0,Y.jsxs)("select",{className:"bmgj-select","aria-label":"\uD654\uBA74 \uADF8\uB8F9",value:e,onChange:i=>r(i.target.value),children:[(0,Y.jsx)("option",{value:"A",children:Te.A}),(0,Y.jsx)("option",{value:"B",children:Te.B})]}),(0,Y.jsx)(ko,{className:"bmgj-select-icon",size:18,strokeWidth:1.75,"aria-hidden":"true"})]}),(0,Y.jsx)("button",{ref:l,type:"button",className:"bmgj-text-btn",onClick:o,children:"\uC6D0\uB798 \uD654\uBA74 \uBCF4\uAE30"})]})]})}var V=A(B(),1),mx="\uB098\uC758 \uBCD1\uC5ED \uC5EC\uC815, \uC870\uAE08 \uB354 \uAC00\uBCCD\uAC8C",gx={A:{title:"\uB9C9\uB9C9\uD588\uB358 \uC785\uC601 \uC900\uBE44, / \uC5EC\uAE30\uC11C \uCC28\uADFC\uCC28\uADFC.",description:"\uBAA8\uC9D1 \uC18C\uC2DD\uACFC \uC9C0\uC6D0 \uC870\uAC74, \uC785\uC601 \uC808\uCC28\uB97C \uC54C\uC544\uBCF4\uC138\uC694. \uC2E0\uCCAD\uACFC \uC870\uD68C\uB294 \uBCD1\uBB34\uBBFC\uC6D0\uC5D0\uC11C \uC9C4\uD589\uD574\uC694.",button:"\uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D \uBCF4\uB7EC \uAC00\uAE30",cardId:"A-M04"},B:{title:"\uBCF5\uBB34 \uC774\uD6C4\uC758 \uC77C\uC0C1\uB3C4, / \uD544\uC694\uD55C \uAC83\uB9CC \uAC04\uD3B8\uD558\uAC8C.",description:"\uC99D\uBA85\uC11C \uBC1C\uAE09 \uC548\uB0B4\uBD80\uD130 \uB3D9\uC6D0\uD6C8\uB828\uAE4C\uC9C0, \uD544\uC694\uD55C \uC815\uBCF4\uB97C \uBE60\uB974\uAC8C \uCC3E\uC544\uBCF4\uC138\uC694.",button:"\uBCD1\uC801\uC99D\uBA85\uC11C \uB4F1 \uBC1C\uAE09\uC548\uB0B4",cardId:"B-M01"}};function Rn({group:e,content:t=gx,resolveCard:a=xn}){let r=t[e],o=a(r.cardId).links[0],l=r.title.split("/").map(n=>n.trim());return(0,V.jsxs)("section",{className:"bmgj-hero","aria-labelledby":"bmgj-hero-title",tabIndex:-1,children:[(0,V.jsxs)("div",{className:"bmgj-hero-text",children:[(0,V.jsx)("p",{className:"bmgj-hero-eyebrow",children:r.eyebrow??mx}),(0,V.jsx)("h1",{id:"bmgj-hero-title",className:"bmgj-hero-title",children:l.map((n,u)=>(0,V.jsx)("span",{className:"bmgj-hero-line",children:n},u))}),(0,V.jsx)("p",{className:"bmgj-hero-desc",children:r.description}),(0,V.jsxs)("a",{className:"bmgj-hero-btn",href:o.href,...o.newTab?{target:"_blank",rel:"noopener noreferrer"}:{},children:[r.button,(0,V.jsx)(Co,{size:18,strokeWidth:1.75,"aria-hidden":"true"})]})]}),(0,V.jsx)(hx,{})]})}function hx(){return(0,V.jsxs)("svg",{className:"bmgj-hero-art",viewBox:"0 0 200 200","aria-hidden":"true",focusable:"false",children:[(0,V.jsx)("circle",{className:"art-orbit",cx:"112",cy:"100",r:"82"}),(0,V.jsx)("path",{className:"art-dash",d:"M 36 150 A 82 82 0 0 1 62 36"}),(0,V.jsxs)("g",{className:"art-plus",children:[(0,V.jsx)("line",{x1:"44",y1:"22",x2:"44",y2:"36"}),(0,V.jsx)("line",{x1:"37",y1:"29",x2:"51",y2:"29"})]}),(0,V.jsx)("circle",{className:"art-dot",cx:"182",cy:"44",r:"6"}),(0,V.jsxs)("g",{transform:"rotate(8 118 100)",children:[(0,V.jsx)("rect",{className:"art-paper",x:"74",y:"34",width:"90",height:"126",rx:"10"}),(0,V.jsx)("rect",{className:"art-line",x:"88",y:"54",width:"56",height:"5",rx:"2.5"}),(0,V.jsx)("rect",{className:"art-line",x:"88",y:"66",width:"62",height:"5",rx:"2.5"}),(0,V.jsx)("rect",{className:"art-line",x:"88",y:"78",width:"42",height:"5",rx:"2.5"}),(0,V.jsx)("circle",{className:"art-check-bg",cx:"119",cy:"122",r:"20"}),(0,V.jsx)("path",{className:"art-check",d:"M 110 122 l 6 6 l 12 -13"})]}),(0,V.jsx)("circle",{className:"art-check-bg",cx:"54",cy:"142",r:"16"}),(0,V.jsx)("path",{className:"art-check",d:"M 47 142 l 5 5 l 9 -10"})]})}var gs=A(he(),1);var Lr=A(B(),1);function Ep({onOpenAllMenu:e,linkRef:t}){return(0,Lr.jsxs)("div",{className:"bmgj-strip",children:[(0,Lr.jsx)("span",{children:"\uAE30\uD0C0 \uBA54\uB274\uB294 \uC804\uCCB4 \uBA54\uB274\uC5D0\uC11C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694"}),(0,Lr.jsxs)("button",{ref:t,type:"button",className:"bmgj-strip-link",onClick:e,children:["\uC804\uCCB4 \uBA54\uB274 \uBCF4\uAE30 ",(0,Lr.jsx)("span",{"aria-hidden":"true",children:"\u2192"})]})]})}var Z=A(B(),1),xx={megaphone:Ro,calendar:So,"book-open":vo,"shield-check":To,clock:Ra,"file-text":bo,"file-pen":fa,search:Fa,"map-pin":Ao,"circle-help":da,headset:Mo,store:Eo,printer:Fo,wallet:jo,bus:wo,chart:sa,"file-x":Po};function Dp(e){return e.newTab?{target:"_blank",rel:"noopener noreferrer"}:{}}function jp(){return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)("span",{className:"bmgj-newtab","aria-hidden":"true",children:["\xA0","\u2197"]}),(0,Z.jsx)("span",{className:"bmgj-sr-only",children:"(\uC0C8 \uD0ED)"})]})}function Bp({card:e,expanded:t,onToggle:a,tag:r}){let o=xx[e.icon],l=`bmgj-card${e.tone==="solid"?" bmgj-card--highlight":""}`,n=(0,Z.jsx)("span",{className:`bmgj-icon bmgj-icon--${e.tone}`,"aria-hidden":"true",children:(0,Z.jsx)(o,{size:20,strokeWidth:1.75})}),u=r?(0,Z.jsx)("span",{className:"bmgj-card-tag",children:r}):null;if(e.links.length===1){let s=e.links[0];return(0,Z.jsx)("div",{className:"bmgj-card-cell",children:(0,Z.jsxs)("a",{className:l,href:s.href,...Dp(s),children:[n,(0,Z.jsxs)("span",{className:"bmgj-card-title",children:[e.title,s.newTab&&(0,Z.jsx)(jp,{})]}),(0,Z.jsx)("span",{className:"bmgj-card-desc",children:e.description}),u]})})}let i=`bmgj-links-${e.id}`;return(0,Z.jsxs)("div",{className:"bmgj-card-cell",children:[(0,Z.jsxs)("button",{type:"button",className:l,"aria-expanded":t,"aria-controls":i,onClick:a,children:[n,(0,Z.jsx)("span",{className:"bmgj-card-title",children:e.title}),(0,Z.jsx)("span",{className:"bmgj-card-desc",children:e.description}),u,(0,Z.jsxs)("span",{className:"bmgj-card-more",children:["\uAD00\uB828 \uBA54\uB274 ",e.links.length,"\uAC1C ",(0,Z.jsx)("span",{"aria-hidden":"true",children:t?"\u25B4":"\u25BE"})]})]}),(0,Z.jsx)("ul",{id:i,className:"bmgj-sublinks",hidden:!t,children:e.links.map(s=>(0,Z.jsx)("li",{children:(0,Z.jsxs)("a",{className:"bmgj-sublink",href:s.href,...Dp(s),children:[s.label,s.newTab&&(0,Z.jsx)(jp,{})]})},s.href+s.label))})]})}var it=A(B(),1);function Op({count:e,expanded:t,controls:a,onToggle:r}){return(0,it.jsx)("div",{className:"bmgj-more-wrap",children:(0,it.jsx)("button",{type:"button",className:"bmgj-more","aria-expanded":t,"aria-controls":a,onClick:r,children:t?(0,it.jsxs)(it.Fragment,{children:["\uC811\uAE30 ",(0,it.jsx)("span",{"aria-hidden":"true",children:"\u25B4"})]}):(0,it.jsxs)(it.Fragment,{children:["\uB354\uBCF4\uAE30 (",e,"\uAC1C) ",(0,it.jsx)("span",{"aria-hidden":"true",children:"\u25BE"})]})})})}var ze=A(B(),1),Lx={A:{eyebrow:"INFORMATION",title:"\uC785\uC601 \uC900\uBE44 \uC815\uBCF4"},B:{eyebrow:"QUICK MENU",title:"\uC790\uC8FC \uCC3E\uB294 \uBA54\uB274"}},Np="bmgj-card-grid",Ix={head:Lx,layouts:hn,getCard:xn};function Fn({group:e,onOpenAllMenu:t,allMenuLinkRef:a,catalog:r=Ix}){let[o,l]=(0,gs.useState)(!1),[n,u]=(0,gs.useState)(new Set),i=r.layouts[e],s=o?[...i.main,...i.more]:i.main,p=m=>u(g=>{let h=new Set(g);return h.has(m)?h.delete(m):h.add(m),h});return(0,ze.jsxs)("section",{className:"bmgj-panel","aria-labelledby":"bmgj-menu-title",tabIndex:-1,children:[(0,ze.jsxs)("div",{className:"bmgj-panel-head",children:[(0,ze.jsxs)("div",{children:[(0,ze.jsx)("p",{className:"bmgj-eyebrow",children:r.head[e].eyebrow}),(0,ze.jsx)("h2",{id:"bmgj-menu-title",className:"bmgj-panel-title",children:r.head[e].title})]}),(0,ze.jsxs)("span",{className:"bmgj-group-badge",children:[(0,ze.jsx)("span",{className:"bmgj-group-dot","aria-hidden":"true",children:"\u25CF"}),Te[e]]})]}),(0,ze.jsx)("div",{id:Np,className:`bmgj-card-grid${r.columns===4?" bmgj-card-grid--4":""}`,children:s.map(m=>(0,ze.jsx)(Bp,{card:r.getCard(m),expanded:n.has(m),onToggle:()=>p(m)},m))}),(0,ze.jsx)(Op,{count:i.more.length,expanded:o,controls:Np,onToggle:()=>l(m=>!m)}),(0,ze.jsx)(Ep,{onOpenAllMenu:t,linkRef:a})]})}var ft=A(he(),1);var U=A(he(),1);var me="bmgj.personalProfile.v1",st="bmgj.personalProfileSync.v1",Tn="#bmgj-profile-sync",En="bmgj.desiredRole.v1",ca=[{key:"fullName",label:"\uC131\uBA85",type:"text",placeholder:"\uC131\uBA85\uC744 \uC785\uB825\uD558\uC138\uC694",autoComplete:"name",maxLength:60},{key:"birthDate",label:"\uC0DD\uB144\uC6D4\uC77C",type:"date",autoComplete:"bday"},{key:"contactPhone",label:"\uC804\uD654\uBC88\uD638 (\uBE44\uC0C1\uC5F0\uB77D\uCC98)",type:"tel",placeholder:"\uC22B\uC790\uB9CC \uB610\uB294 \uD558\uC774\uD508 \uD3EC\uD568",autoComplete:"tel-national",maxLength:24},{key:"mobilePhone",label:"\uD734\uB300\uC804\uD654",type:"tel",placeholder:"010-0000-0000",autoComplete:"tel",maxLength:24},{key:"militaryEmail",label:"\uC804\uC790\uC6B0\uD3B8 (\uB098\uB77C\uC0AC\uB791\uBA54\uC77C)",type:"email",placeholder:"example@narasarang.or.kr",autoComplete:"off",maxLength:120},{key:"registeredOffice",label:"\uBCD1\uC801\uC9C0\uCCAD",type:"text",placeholder:"\uC608: \uC11C\uC6B8\uC9C0\uBC29\uBCD1\uBB34\uCCAD",maxLength:80},{key:"personalEmail",label:"\uC804\uC790\uC6B0\uD3B8 (\uC77C\uBC18 \uC774\uBA54\uC77C)",type:"email",placeholder:"example@email.com",autoComplete:"email",maxLength:120},{key:"applicationOffice",label:"\uC751\uC2DC\uC9C0\uC5ED \uBCD1\uBB34\uCCAD",type:"text",placeholder:"\uC608: \uC11C\uC6B8\uC9C0\uBC29\uBCD1\uBB34\uCCAD",maxLength:80},{key:"address",label:"\uC8FC\uC18C",type:"textarea",placeholder:"\uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694",autoComplete:"street-address",maxLength:260}],Dn=()=>Object.fromEntries(ca.map(e=>[e.key,""]));function Ir(e){let t=Dn();if(e&&typeof e=="object")for(let a of ca){let r=e[a.key];typeof r=="string"&&(t[a.key]=r.slice(0,a.maxLength||120))}return t}function Up(e){if(!e||typeof e!="object"||typeof e.role!="string")return null;let t=e.role.trim().slice(0,60);return t?{role:t}:null}function Hp(e){let t=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}),a=Object.fromEntries(t.formatToParts(new Date).filter(i=>i.type!=="literal").map(i=>[i.type,Number(i.value)])),r=Date.UTC(a.year,a.month-1,a.day),[o,l,n]=e.split("-").map(Number),u=Math.round((Date.UTC(o,l-1,n)-r)/864e5);return{days:u,label:u>0?`D-${u}`:u===0?"D-DAY":`D+${Math.abs(u)}`}}var pa="bmgj.recruitmentSchedules.v1",No="https://www.mma.go.kr/contents.do?mc=mma0000743",yx="https://www.mma.go.kr/board/boardList.do?gesipan_id=93&mc=usr0000150";var Cx=/(?:[‘’'′]?\s*(\d{2}|\d{4})\s*(?:\.|년)\s*(\d{1,2})\s*(?:\.|월)\s*(\d{1,2})\s*(?:\.)?\s*(?:\([월화수목금토일]\))?\s*(\d{1,2}:\d{2})?)/g;function zp(e){let t=[],a=new RegExp(Cx.source,"g"),r;for(;(r=a.exec(e))!==null;){let o=Number(r[1]);o<100&&(o+=2e3);let l=Number(r[2]),n=Number(r[3]),u=r[4]||"00:00",[i,s]=u.split(":").map(Number);if(o<2024||o>2100||l<1||l>12||i>23||s>59)continue;let p=new Date(Date.UTC(o,l-1,n));if(p.getUTCMonth()!==l-1||p.getUTCDate()!==n)continue;let m=`${String(o).padStart(4,"0")}-${String(l).padStart(2,"0")}-${String(n).padStart(2,"0")}T${String(u).padStart(5,"0")}:00+09:00`,g=Date.parse(m);Number.isFinite(g)&&t.push({stamp:g,iso:m,text:r[0],index:r.index,endIndex:a.lastIndex})}return t}function jn(e){if(!e||e.length>2500)return null;let t=zp(e);if(t.length<2)return null;for(let a=0;a<t.length-1;a++){let r=t[a],o=t[a+1];if(r.stamp>=o.stamp||o.stamp-r.stamp>50*864e5)continue;let l=e.slice(r.endIndex,o.index);if(!(!/(?:~|～|∼|부터|에서|[-–—]|까지)/.test(l)||l.length>42))return{startsAt:r.iso,endsAt:o.iso}}return null}var yr=e=>(e?.textContent||"").replace(/\s+/g," ").trim(),Ta=e=>String(e||"").normalize("NFKC").replace(/[\s\-_.·/()[\]「」]/g,"").toLowerCase();function vx(e,t){let a=Ta(e);if(!a)return!1;let r=Ta([t.title,t.label,...t.specialties||[]].join(" "));return a==="\uAE30\uC220\uBCD1"?/기술행정병|전문기술병|기술병/.test(r):a==="\uC5B4\uD559\uBCD1"?r.includes("\uC5B4\uD559\uBCD1"):/(?:영어|중국어|일본어|러시아어|스페인어|프랑스어|독일어|아랍어)어학병/.test(a)?(t.specialties||[]).some(o=>Ta(o).includes(a))||Ta(t.label).includes(a):r.includes(a)}function _p(e){let t=["\uC601\uC5B4\uC5B4\uD559\uBCD1","\uC911\uAD6D\uC5B4\uC5B4\uD559\uBCD1","\uC77C\uBCF8\uC5B4\uC5B4\uD559\uBCD1","\uB7EC\uC2DC\uC544\uC5B4\uC5B4\uD559\uBCD1","\uC2A4\uD398\uC778\uC5B4\uC5B4\uD559\uBCD1","\uD504\uB791\uC2A4\uC5B4\uC5B4\uD559\uBCD1","\uB3C5\uC77C\uC5B4\uC5B4\uD559\uBCD1","\uC544\uB78D\uC5B4\uC5B4\uD559\uBCD1","\uAE30\uC220\uD589\uC815\uBCD1","\uC804\uBB38\uAE30\uC220\uBCD1","SW\uAC1C\uBC1C\uBCD1","\uC815\uBCF4\uBCF4\uD638\uBCD1"],a=Ta(e);return t.filter(r=>a.includes(Ta(r)))}function qp(e){let t=Date.parse(e.startsAt),a=Date.parse(e.endsAt);return!Number.isFinite(t)||!Number.isFinite(a)||t>=a||a-t>50*864e5||!/^https:\/\/www\.mma\.go\.kr\//.test(e.url)?null:{label:(e.label||"\uBAA8\uC9D1\uBCD1").slice(0,110),title:(e.title||"").slice(0,180),startsAt:e.startsAt,endsAt:e.endsAt,url:e.url,specialties:Array.isArray(e.specialties)?e.specialties.slice(0,35):[],source:e.source||"\uBCD1\uBB34\uCCAD",category:e.category||"\uBAA8\uC9D1\uACC4\uD68D"}}function wx(e){let t=[];for(let a of e.querySelectorAll("table")){let r=Array.from(a.querySelectorAll("tr"));if(!r.length||!/접수기간/.test(yr(r[0]))||!/모집분야/.test(yr(r[0])))continue;let o="";for(let l=1;l<r.length;l++){let n=Array.from(r[l].querySelectorAll("th,td"));if(n.length<2)continue;let u=n.map(yr),i=u.findIndex(h=>!!jn(h));if(i<0)continue;let s=jn(u[i]),m=u.slice(0,i).filter(h=>!/^\d+$/.test(h.replace(/,/g,""))&&!zp(h).length).join(" ").trim()||o;if(!m||!/(?:병|공군|해군|해병대)/.test(m))continue;o=m;let g=qp({...s,label:m,title:`${m} \xB7 \uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D`,url:No,specialties:_p(m),source:"\uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D"});g&&t.push(g)}}return t}function Sx(e){let t=[];for(let a of e.querySelectorAll("a")){let r=yr(a);if(!r||!/(?:모집|어학병|기술행정병|전문특기병|기술병)/.test(r))continue;let o=a.getAttribute("href")||"";if(!o.includes("boardView.do")){let i=(a.getAttribute("onclick")||"").match(/(?:gsgeul_no|goView|boardView)[^\d]*(\d{5,})/i);i&&(o=`/board/boardView.do?gesipan_id=93&gsgeul_no=${i[1]}&mc=usr0000150`)}let l;try{l=new URL(o,"https://www.mma.go.kr")}catch{continue}if(l.origin!=="https://www.mma.go.kr"||l.pathname!=="/board/boardView.do"||!l.searchParams.get("gsgeul_no"))continue;let n=l.searchParams.get("gsgeul_no");t.some(u=>u.id===n)||t.push({id:n,title:r,url:l.href})}return t}function kx(e,t){let a=(e.querySelector('meta[property="og:title"]')?.getAttribute("content")||t.title||"").split("|")[0].trim()||t.title,r=e.body?.textContent||"",o=r.lastIndexOf(a);o>=0&&(r=r.slice(o+a.length,o+23e3)),r=r.split("\uBCD1\uBB34\uBBFC\uC6D0\uC0C1\uB2F4")[0].split("\uCCA8\uBD80\uD30C\uC77C")[0].replace(/ /g," ");let l=[],n=p=>{p&&!l.some(m=>m.startsAt===p.startsAt&&m.endsAt===p.endsAt)&&l.push(p)};for(let p of r.matchAll(/(?:지원서\s*)?접수\s*(?:기간|일정)?\s*[:：]?/g)){let m=p.index??0;n(jn(r.slice(m,Math.min(r.length,m+250))))}for(let p of e.querySelectorAll("table")){let m=Array.from(p.querySelectorAll("tr"));if(m.slice(0,3).some(g=>/접수기간|지원서 접수/.test(yr(g))))for(let g of m)for(let h of Array.from(g.querySelectorAll("th,td")).map(yr))n(jn(h))}if(!l.length)return[];let u=r.slice(0,Math.min(r.indexOf("\uC811\uC218")>=0?r.indexOf("\uC811\uC218"):r.length,6e3)),i=_p(u),s=i.length===1?i[0]:a;return l.map((p,m)=>qp({...p,label:s,title:l.length>1?`${a} \xB7 \uC811\uC218 ${m+1}\uD68C\uCC28`:a,url:t.url,specialties:i,source:"\uC721\uAD70 \uBAA8\uC9D1\uACC4\uD68D \uACF5\uACE0"})).filter(p=>p!==null)}function bx(e){let t=new Set;return e.filter(a=>{let r=`${a.startsAt}|${a.endsAt}|${Ta(a.title||a.label)}`;return t.has(r)?!1:(t.add(r),!0)}).sort((a,r)=>Date.parse(a.endsAt)-Date.parse(r.endsAt))}async function hs(e){let t=new AbortController,a=window.setTimeout(()=>t.abort(),12e3);try{let r=await fetch(e,{method:"GET",credentials:"omit",signal:t.signal,cache:"no-store"});if(!r.ok)throw Error(`\uBCD1\uBB34\uCCAD ${r.status}`);let o=await r.text();if(!o.includes("\uBCD1\uBB34\uCCAD")||o.length<300)throw Error("\uC751\uB2F5 \uD615\uC2DD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC74C");return new DOMParser().parseFromString(o,"text/html")}finally{window.clearTimeout(a)}}var Oo=null;async function xs(e=!1){return location.hostname!=="www.mma.go.kr"?{updated:!1,reason:"site"}:Oo||(Oo=(async()=>{let t=(await chrome.storage.local.get(pa))[pa];if(!e&&t?.checkedAt&&Date.now()-t.checkedAt<216e5)return{updated:!1,reason:"fresh"};let a=[];a.push(...wx(await hs(No)));let r=Sx(await hs(yx)).slice(0,22);for(let n of[r.slice(0,8),r.slice(8,16),r.slice(16,22)])await Promise.all(n.map(async u=>{try{a.push(...kx(await hs(u.url),u))}catch{}}));let o=bx(a);if(o.length===0)throw Error("\uACF5\uC2DD \uC77C\uC815\uC5D0\uC11C \uC811\uC218\uAE30\uAC04\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");let l={checkedAt:Date.now(),records:o,source:"\uBCD1\uBB34\uCCAD \uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D \uBC0F \uC721\uAD70 \uBAA8\uC9D1\uACC4\uD68D"};return await chrome.storage.local.set({[pa]:l}),{updated:!0,count:o.length}})().finally(()=>{Oo=null}),Oo)}function Gp(e,t){return(Array.isArray(e?.records)?e.records:[]).filter(r=>vx(t,r)).filter(r=>Date.parse(r.endsAt)>Date.now()).sort((r,o)=>Date.parse(r.endsAt)-Date.parse(o.endsAt))}function Vp(e){return e?Date.now()<Date.parse(e.startsAt)?"\uC811\uC218 \uC608\uC815":"\uC811\uC218 \uC911":"\uBC1C\uD45C \uB300\uAE30"}function Bn(e){return e?`${e.slice(0,10).replace(/-/g,".")} ${e.slice(11,16)}`:""}function Ls(e){if(!e)return"";let t=e.startsAt.slice(0,7),a=e.endsAt.slice(0,7);return t===a?`${t.slice(0,4)}\uB144 ${Number(t.slice(5))}\uC6D4 \uC811\uC218`:`${t.slice(0,4)}\uB144 ${Number(t.slice(5))}\uC6D4 ~ ${a.slice(0,4)}\uB144 ${Number(a.slice(5))}\uC6D4 \uC811\uC218`}var L=A(B(),1),Ax=["A","B"],Rx=`${Io("P-A-M06").links[0].href}${Tn}`;function Wp({id:e,focusOnOpen:t,isMainPage:a,onClose:r}){let[o,l]=(0,U.useState)(null),[n,u]=(0,U.useState)(Dn),[i,s]=(0,U.useState)(!0),[p,m]=(0,U.useState)(!1),[g,h]=(0,U.useState)(!1),[C,I]=(0,U.useState)(""),[D,f]=(0,U.useState)(!1),[d,c]=(0,U.useState)(!1),[x,w]=(0,U.useState)(null),[S,k]=(0,U.useState)("\uC5B4\uD559\uBCD1"),[P,O]=(0,U.useState)(!1),[R,ve]=(0,U.useState)(!1),[Dt,jt]=(0,U.useState)(null),[Ye,ja]=(0,U.useState)(null),[yt,Bt]=(0,U.useState)(!1),[Ot,M]=(0,U.useState)(""),[,Nt]=(0,U.useState)(0),Ze=(0,U.useRef)(null),vr=(0,U.useRef)(null),ge=(0,U.useRef)(!0),ct=(0,U.useRef)(new Set);(0,U.useEffect)(()=>{let v=!0,ie=!1,qe=!1;ge.current=!0,mr().then(Ee=>{v&&l(Ee)});let Go=gr(l);chrome.storage.local.get([me,En,st,pa]).then(Ee=>{if(!v)return;let Vo=Ir(Ee[me]),Ct=Up(Ee[En]);ja(Ee[pa]||null),ie||(u(Vo),m(!ca.some(Sr=>Vo[Sr.key].trim()))),w(Ct),Ct&&k(Ct.role);let Wo=Ee[st];qe||jt(Wo?.updatedAt??null),s(!1)}).catch(()=>{v&&(I("\uC800\uC7A5\uB41C \uC815\uBCF4\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694."),m(!0),s(!1))});let wr=(Ee,Vo)=>{if(!(!v||Vo!=="local")){if(Ee[me]){ie=!0;let Ct=Ir(Ee[me].newValue),Wo=[...ct.current];u(Sr=>({...Ct,...Object.fromEntries(Wo.map(Ps=>[Ps,Sr[Ps]]))})),Wo.length||m(!ca.some(Sr=>Ct[Sr.key].trim()))}if(Ee[pa]&&(ja(Ee[pa].newValue||null),M("")),Ee[st]){qe=!0;let Ct=Ee[st].newValue;jt(Ct?.updatedAt??null),Ct?.updatedAt&&I("\uBCD1\uBB34\uBBFC\uC6D0 \uD654\uBA74\uC5D0\uC11C \uD655\uC778\uB41C \uC778\uC801\uC0AC\uD56D\uC744 \uC5C5\uB370\uC774\uD2B8\uD588\uC5B4\uC694.")}}};return chrome.storage.onChanged.addListener(wr),()=>{v=!1,ge.current=!1,Go(),chrome.storage.onChanged.removeListener(wr)}},[]),(0,U.useEffect)(()=>{if(t&&Ze.current){let v=Ze.current.getRootNode()?.activeElement;(!v||!Ze.current.contains(v))&&Ze.current.focus()}},[t]),(0,U.useEffect)(()=>{if(!C)return;let v=window.setTimeout(()=>{ge.current&&I("")},4800);return()=>window.clearTimeout(v)},[C]),(0,U.useEffect)(()=>{let v=window.setInterval(()=>Nt(ie=>ie+1),6e4);return()=>window.clearInterval(v)},[]),(0,U.useEffect)(()=>{if(location.hostname!=="www.mma.go.kr")return;let v=!0,ie=async()=>{v&&Bt(!0);try{await xs(!1)}catch{v&&M("\uACF5\uC2DD \uC77C\uC815 \uAC31\uC2E0\uC5D0 \uC2E4\uD328\uD588\uC5B4\uC694. \uC778\uD130\uB137 \uC5F0\uACB0 \uB610\uB294 \uBCD1\uBB34\uCCAD \uACF5\uC9C0\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.")}finally{v&&Bt(!1)}};ie();let qe=window.setInterval(ie,216e5);return()=>{v=!1,window.clearInterval(qe)}},[]);let pm=async()=>{if(location.hostname!=="www.mma.go.kr"){window.open(No,"_blank","noopener,noreferrer"),I("\uACF5\uC2DD \uC77C\uC815 \uD398\uC774\uC9C0\uC5D0\uC11C \uC5C5\uB370\uC774\uD2B8\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.");return}Bt(!0),M("");try{let v=await xs(!0);I(`\uACF5\uC2DD \uBAA8\uC9D1 \uC77C\uC815 ${v.count}\uAC1C\uB97C \uD655\uC778\uD588\uC5B4\uC694.`)}catch{M("\uACF5\uC2DD \uC77C\uC815\uC744 \uAC00\uC838\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC7A0\uC2DC \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uAC70\uB098 \uC6D0\uBB38\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694.")}finally{Bt(!1)}},ks=ca.some(v=>n[v.key].trim()),bs=(v,ie)=>{ct.current.add(v),u(qe=>({...qe,[v]:ie}))},mm=async v=>{if(v.preventDefault(),!g){h(!0),I("");try{let ie=await chrome.storage.local.get(me),qe=Ir(ie[me]);for(let wr of ct.current)qe[wr]=n[wr];let Go=Ir(qe);await chrome.storage.local.set({[me]:Go}),ge.current&&(ct.current.clear(),u(Go),m(!1),I("\uC778\uC801\uC0AC\uD56D\uC744 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC800\uC7A5\uD588\uC5B4\uC694."))}catch{ge.current&&I("\uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8 \uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.")}finally{ge.current&&h(!1)}}},gm=async v=>{if(v.preventDefault(),R)return;let ie=S.trim().slice(0,60);if(!ie){I("\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.");return}ve(!0);try{let qe={role:ie};await chrome.storage.local.set({[En]:qe}),ge.current&&(w(qe),O(!1),I("\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C\uB97C \uC800\uC7A5\uD588\uC5B4\uC694."))}catch{ge.current&&I("\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C\uB97C \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694.")}finally{ge.current&&ve(!1)}},hm=async()=>{if(!g){h(!0);try{await chrome.storage.local.remove([me,st]),ge.current&&(ct.current.clear(),u(Dn()),jt(null),m(!0),c(!1),I("\uC800\uC7A5\uB41C \uC778\uC801\uC0AC\uD56D\uC744 \uC0AD\uC81C\uD588\uC5B4\uC694."))}catch{ge.current&&I("\uC778\uC801\uC0AC\uD56D \uC0AD\uC81C\uC5D0 \uC2E4\uD328\uD588\uC5B4\uC694.")}finally{ge.current&&h(!1)}}},xm=async v=>{o&&(l({...o,group:v}),await na(v)||I("\uD654\uBA74 \uADF8\uB8F9 \uC124\uC815\uC744 \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694."))},Lm=async()=>{if(!o)return;let v=o.viewMode==="improved"?"original":"improved";l({...o,viewMode:v}),await ua(v)||I("\uD654\uBA74 \uC124\uC815\uC744 \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694."),a&&r()},Im=async()=>{o&&(f(!1),l({schemaVersion:1,group:null,viewMode:"improved"}),await Ip()||I("\uD654\uBA74 \uC124\uC815 \uCD08\uAE30\uD654\uC5D0 \uC2E4\uD328\uD588\uC5B4\uC694."),a&&r())},ym=()=>{ks?chrome.storage.local.get(me).then(v=>{ge.current&&(ct.current.clear(),u(Ir(v[me])),m(!1))}).catch(()=>I("\uC800\uC7A5\uB41C \uC815\uBCF4\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694.")):r()},Cm=v=>(0,L.jsxs)("label",{className:"bmgj-profile-field",children:[(0,L.jsx)("span",{className:"bmgj-profile-field-name",children:v.label}),v.type==="textarea"?(0,L.jsx)("textarea",{name:v.key,value:n[v.key],placeholder:v.placeholder,autoComplete:v.autoComplete,maxLength:v.maxLength,rows:3,disabled:g,onChange:ie=>bs(v.key,ie.target.value),className:"bmgj-profile-input"}):(0,L.jsx)("input",{ref:v.key==="fullName"?vr:null,name:v.key,value:n[v.key],type:v.type,placeholder:v.placeholder,autoComplete:v.autoComplete,maxLength:v.maxLength,disabled:g,onChange:ie=>bs(v.key,ie.target.value),className:"bmgj-profile-input"})]},v.key),vm=v=>(0,L.jsxs)("div",{className:"bmgj-profile-value",children:[(0,L.jsx)("dt",{children:v.label}),(0,L.jsx)("dd",{children:n[v.key].trim()||"\uBBF8\uC785\uB825"})]},v.key),_o=x?Gp(Ye,x.role):[],_e=_o[0]||null,qo=_e?Hp(_e.endsAt.slice(0,10)):null,wm=!!Ye?.checkedAt&&Date.now()-Ye.checkedAt>12096e5,Sm=_e?Vp(_e):"\uBAA8\uC9D1 \uACF5\uACE0 \uD655\uC778 \uC911",km=(0,L.jsxs)("form",{className:"bmgj-role-setup",onSubmit:gm,children:[(0,L.jsx)("p",{className:"bmgj-role-eyebrow",children:x?"\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C \uBCC0\uACBD":"\uCC98\uC74C \uC2DC\uC791\uD558\uAE30 \xB7 1\uB2E8\uACC4"}),(0,L.jsx)("h3",{children:x?"\uC5B4\uB5A4 \uBD84\uC57C\uB85C \uC9C0\uC6D0\uD560\uAE4C\uC694?":"\uC5B4\uB5A4 \uBCD1\uC73C\uB85C \uC9C0\uC6D0\uD558\uACE0 \uC2F6\uB098\uC694?"}),(0,L.jsx)("p",{className:"bmgj-role-help",children:"\uD76C\uB9DD \uBD84\uC57C\uB97C \uBA3C\uC800 \uC800\uC7A5\uD558\uBA74 \uB0B4 \uC815\uBCF4\uC5D0\uC11C \uC9C0\uC6D0 \uB9C8\uAC10\uC77C\uAE4C\uC9C0 \uB0A8\uC740 \uB0A0\uC9DC\uB97C \uBCFC \uC218 \uC788\uC5B4\uC694."}),(0,L.jsxs)("label",{className:"bmgj-profile-field",children:[(0,L.jsx)("span",{className:"bmgj-profile-field-name",children:"\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C"}),(0,L.jsx)("input",{className:"bmgj-profile-input",type:"text",name:"role",value:S,maxLength:60,placeholder:"\uC608: \uC5B4\uD559\uBCD1",required:!0,onChange:v=>k(v.target.value)})]}),(0,L.jsxs)("div",{className:"bmgj-role-hint",children:["\uC608\uC2DC: \uC5B4\uD559\uBCD1, \uC601\uC5B4\uC5B4\uD559\uBCD1, \uAE30\uC220\uD589\uC815\uBCD1, \uAE30\uC220\uBCD1, \uC815\uBCF4\uBCF4\uD638\uBCD1",(0,L.jsx)("span",{children:" \xB7 \uACF5\uC2DD \uBAA8\uC9D1 \uC77C\uC815\uC5D0\uC11C \uD0A4\uC6CC\uB4DC\uBCC4\uB85C \uAC80\uC0C9\uD569\uB2C8\uB2E4."})]}),(0,L.jsx)("button",{type:"submit",className:"bmgj-profile-primary",disabled:R,children:R?"\uC800\uC7A5\uD558\uB294 \uC911\u2026":x?"\uC9C0\uC6D0 \uBD84\uC57C \uBCC0\uACBD \uC800\uC7A5":"\uC774 \uBD84\uC57C\uB85C \uC2DC\uC791\uD558\uAE30"}),x&&(0,L.jsx)("button",{type:"button",className:"bmgj-profile-secondary",onClick:()=>{k(x.role),O(!1)},children:"\uCDE8\uC18C"})]}),bm=C||(i?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":x?P?"\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C\uB97C \uC218\uC815 \uC911\uC785\uB2C8\uB2E4.":p?"\uC785\uB825\uC744 \uB9C8\uCE5C \uB4A4 \uC800\uC7A5\uD558\uAE30\uB97C \uB20C\uB7EC\uC8FC\uC138\uC694.":"\uC9C0\uC6D0 \uC815\uBCF4\uAC00 \uC800\uC7A5\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.":"\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.");return(0,L.jsxs)("section",{id:e,ref:Ze,className:"bmgj-floating bmgj-profile-drawer",role:"dialog","aria-modal":"false","aria-labelledby":"bmgj-info-title",tabIndex:-1,onKeyDown:v=>{v.key==="Escape"&&!v.defaultPrevented&&(v.stopPropagation(),r())},children:[(0,L.jsxs)("div",{className:"bmgj-profile-header",children:[(0,L.jsxs)("div",{children:[(0,L.jsx)("p",{className:"bmgj-profile-eyebrow",children:"\uBCD1\uBB34\uAE38\uC7A1\uC774 \xB7 \uB0B4 \uC815\uBCF4"}),(0,L.jsx)("h2",{id:"bmgj-info-title",children:x?"\uB098\uC758 \uBCD1\uC5ED \uC9C0\uC6D0":"\uC9C0\uC6D0 \uBD84\uC57C \uC120\uD0DD"}),(0,L.jsx)("p",{className:"bmgj-profile-subtitle",children:x?"\uD76C\uB9DD \uBD84\uC57C\uC640 \uC778\uC801\uC0AC\uD56D\uC744 \uD55C\uACF3\uC5D0\uC11C \uAD00\uB9AC\uD569\uB2C8\uB2E4":"\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C\uB97C \uBA3C\uC800 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694"})]}),(0,L.jsx)("button",{type:"button",className:"bmgj-profile-close","aria-label":"\uB0B4 \uC815\uBCF4 \uB2EB\uAE30",onClick:r,children:"\xD7"})]}),(0,L.jsx)("div",{className:"bmgj-profile-scroller",children:i?(0,L.jsx)("p",{className:"bmgj-profile-loading",role:"status",children:"\uC800\uC7A5\uB41C \uC815\uBCF4\uB97C \uC77D\uB294 \uC911\u2026"}):!x||P?km:(0,L.jsxs)(U.Fragment,{children:[(0,L.jsxs)("div",{className:"bmgj-profile-deadline bmgj-role-deadline",children:[(0,L.jsxs)("div",{className:"bmgj-profile-section-heading",children:[(0,L.jsx)("h3",{children:"\uB098\uC758 \uC9C0\uC6D0 D-Day"}),(0,L.jsx)("span",{className:"bmgj-role-prototype-badge bmgj-recruit-official",children:"\uBCD1\uBB34\uCCAD \uACF5\uC2DD \uC77C\uC815"})]}),(0,L.jsxs)("div",{className:"bmgj-role-overview",children:[(0,L.jsxs)("div",{children:[(0,L.jsx)("span",{className:"bmgj-role-label",children:"\uC9C0\uC6D0 \uD76C\uB9DD \uBD84\uC57C \xB7 \uD0A4\uC6CC\uB4DC"}),(0,L.jsx)("strong",{className:"bmgj-role-name",children:x.role}),(0,L.jsx)("span",{className:"bmgj-role-date",children:_e?Ls(_e):"\uB2E4\uC74C \uC811\uC218 \uD68C\uCC28\uAC00 \uACF5\uC2DD \uBC1C\uD45C\uB418\uBA74 \uD45C\uC2DC\uD574\uC694"})]}),qo?(0,L.jsx)("strong",{className:"bmgj-role-days","aria-label":qo.days>0?`\uB9C8\uAC10\uAE4C\uC9C0 ${qo.days}\uC77C`:"\uC624\uB298 \uB9C8\uAC10",children:qo.label}):(0,L.jsx)("strong",{className:"bmgj-recruit-waiting",children:yt?"\uD655\uC778 \uC911\u2026":"\uC77C\uC815 \uB300\uAE30"})]}),_e?(0,L.jsxs)("div",{className:"bmgj-recruit-next",children:[(0,L.jsx)("span",{className:"bmgj-recruit-status",children:Sm}),(0,L.jsx)("strong",{children:_e.title||_e.label}),(0,L.jsx)("p",{children:`\uC811\uC218 \uC2DC\uC791  ${Bn(_e.startsAt)}`}),(0,L.jsx)("p",{children:`\uC811\uC218 \uB9C8\uAC10  ${Bn(_e.endsAt)}`}),(0,L.jsx)("a",{href:_e.url,target:"_blank",rel:"noopener noreferrer",children:"\uACF5\uC2DD \uBAA8\uC9D1 \uACF5\uACE0 \uD655\uC778 \u2197"})]}):(0,L.jsxs)("div",{className:"bmgj-recruit-empty",children:[(0,L.jsx)("strong",{children:yt?"\uBCD1\uBB34\uCCAD \uBAA8\uC9D1 \uC77C\uC815\uC744 \uC77D\uB294 \uC911\uC774\uC5D0\uC694":"\uD604\uC7AC \uD655\uC778\uB41C \uB2E4\uC74C \uC811\uC218 \uC77C\uC815\uC774 \uC5C6\uC5B4\uC694"}),(0,L.jsx)("p",{children:"\uB9C8\uAC10\uB41C \uBAA8\uC9D1\uC740 D-Day\uB85C \uD45C\uC2DC\uD558\uC9C0 \uC54A\uC544\uC694. \uC0C8 \uD68C\uCC28\uAC00 \uACF5\uC9C0\uB418\uBA74 \uB2E4\uC74C \uB9C8\uAC10\uC77C\uB85C \uC790\uB3D9 \uBCC0\uACBD\uB429\uB2C8\uB2E4."})]}),(0,L.jsxs)("div",{className:"bmgj-role-deadline-foot",children:[(0,L.jsx)("button",{type:"button",className:"bmgj-profile-text-button",onClick:()=>O(!0),children:"\uC9C0\uC6D0 \uBD84\uC57C \uBCC0\uACBD"}),(0,L.jsx)("button",{type:"button",className:"bmgj-profile-text-button",disabled:yt,onClick:pm,children:yt?"\uC0C8\uB85C\uACE0\uCE68 \uC911\u2026":"\uC77C\uC815 \uC0C8\uB85C\uACE0\uCE68"})]}),_o.length>1&&(0,L.jsxs)("div",{className:"bmgj-recruit-upcoming",children:[(0,L.jsx)("h4",{children:`\uB2E4\uC74C \uBAA8\uC9D1 \uD68C\uCC28 \xB7 ${Math.min(5,_o.length)}\uAC1C`}),_o.slice(0,5).map(v=>(0,L.jsxs)("a",{href:v.url,target:"_blank",rel:"noopener noreferrer",className:"bmgj-recruit-row",children:[(0,L.jsx)("span",{className:"bmgj-recruit-row-month",children:Ls(v)}),(0,L.jsx)("strong",{children:v.label}),(0,L.jsx)("small",{children:`${Bn(v.endsAt)} \uB9C8\uAC10`})]},v.url+v.endsAt+v.label))]}),Ye?.checkedAt?(0,L.jsx)("p",{className:"bmgj-recruit-checked",children:`\uB9C8\uC9C0\uB9C9 \uD655\uC778: ${new Date(Ye.checkedAt).toLocaleString("ko-KR")}${wm?" \xB7 \uC624\uB798\uB41C \uC815\uBCF4, \uCD5C\uC2E0 \uACF5\uACE0 \uD655\uC778 \uD544\uC694":""}`}):null,Ot&&(0,L.jsx)("p",{className:"bmgj-recruit-error",role:"status",children:Ot}),(0,L.jsx)("p",{className:"bmgj-role-disclaimer",children:"\u203B \uACF5\uAC1C\uB41C \uBCD1\uBB34\uCCAD \uACF5\uACE0\uC5D0\uC11C \uC811\uC218 \uC2DC\uC791\xB7\uB9C8\uAC10\uC77C\uC774 \uBAA8\uB450 \uD655\uC778\uB41C \uD68C\uCC28\uB9CC \uD45C\uC2DC\uD569\uB2C8\uB2E4. \uAC8C\uC2DC\uD310 \uAD6C\uC870 \uBCC0\uACBD\uC774\uB098 \uC9C0\uC5F0\uC73C\uB85C \uB204\uB77D\uB420 \uC218 \uC788\uC73C\uB2C8 \uC9C0\uC6D0 \uC804 \uC6D0\uBB38\uC744 \uD655\uC778\uD574 \uC8FC\uC138\uC694."}),(0,L.jsx)("a",{href:No,target:"_blank",rel:"noopener noreferrer",className:"bmgj-recruit-index-link",children:"\uBCD1\uBB34\uCCAD \uC774\uB2EC\uC758 \uBAA8\uC9D1\uACC4\uD68D \uBCF4\uAE30 \u2197"})]}),(0,L.jsxs)("div",{className:"bmgj-profile-login",children:[(0,L.jsxs)("div",{children:[(0,L.jsx)("strong",{children:"\uBCD1\uBB34\uCCAD \uACF5\uC2DD \uB85C\uADF8\uC778"}),(0,L.jsx)("p",{children:"\uBCD1\uBB34\uBBFC\uC6D0\uC5D0\uC11C \uBCF8\uC778\uC778\uC99D\uC744 \uB9C8\uCE58\uBA74 \uD1B5\uD569\uC9C0\uC6D0\uC11C \uC791\uC131 \uC548\uB0B4\uAC00 \uC790\uB3D9\uC73C\uB85C \uC5F4\uB824\uC694. \uC548\uB0B4\uC5D0\uC11C \u2018\uC608\u2019\uB97C \uB204\uB974\uBA74 \uC778\uC801\uC0AC\uD56D\uC774 \uC774 \uD328\uB110\uC5D0 \uC790\uB3D9\uC73C\uB85C \uBC18\uC601\uB3FC\uC694."})]}),(0,L.jsx)("a",{href:Rx,target:"_blank",rel:"noopener noreferrer",className:"bmgj-profile-login-button",children:"\uBCD1\uBB34\uBBFC\uC6D0 \uC811\uC18D\uD558\uAE30 \u2197"}),(0,L.jsx)("p",{className:"bmgj-profile-login-note",children:"\uBCD1\uBB34\uCCAD \uC548\uB0B4\uC640 \uC720\uC758\uC0AC\uD56D\uC744 \uD655\uC778\uD558\uBA74 \uC778\uC801\uC0AC\uD56D\uC744 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC800\uC7A5\uD574\uC694."}),Dt&&(0,L.jsx)("p",{className:"bmgj-profile-sync-note",role:"status",children:`\uCD5C\uADFC \uC778\uC801\uC0AC\uD56D \uC790\uB3D9 \uBC18\uC601: ${new Date(Dt).toLocaleString("ko-KR")}`})]}),p?(0,L.jsxs)("form",{id:"bmgj-profile-form",onSubmit:mm,className:"bmgj-profile-form",children:[(0,L.jsxs)("div",{className:"bmgj-profile-section-heading",children:[(0,L.jsx)("h3",{children:"\uC778\uC801\uC0AC\uD56D \uC785\uB825"}),(0,L.jsx)("span",{children:"\uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uC800\uC7A5"})]}),ca.map(Cm),(0,L.jsxs)("div",{className:"bmgj-profile-form-buttons",children:[(0,L.jsx)("button",{type:"submit",className:"bmgj-profile-primary",disabled:g,children:g?"\uC800\uC7A5 \uC911\u2026":"\uC778\uC801\uC0AC\uD56D \uC800\uC7A5\uD558\uAE30"}),ks&&(0,L.jsx)("button",{type:"button",className:"bmgj-profile-secondary",onClick:ym,disabled:g,children:"\uCDE8\uC18C"})]})]}):(0,L.jsxs)("div",{className:"bmgj-profile-summary",children:[(0,L.jsxs)("div",{className:"bmgj-profile-section-heading",children:[(0,L.jsx)("h3",{children:"\uC800\uC7A5\uB41C \uC778\uC801\uC0AC\uD56D"}),(0,L.jsx)("button",{type:"button",className:"bmgj-profile-text-button",onClick:()=>{m(!0),window.setTimeout(()=>vr.current?.focus(),0)},children:"\uC218\uC815\uD558\uAE30"})]}),(0,L.jsx)("dl",{className:"bmgj-profile-values",children:ca.map(vm)}),(0,L.jsx)("button",{type:"button",className:"bmgj-profile-secondary bmgj-profile-delete",onClick:()=>c(!d),children:"\uC800\uC7A5\uB41C \uC815\uBCF4 \uC0AD\uC81C"}),d&&(0,L.jsxs)("div",{className:"bmgj-profile-confirm",children:[(0,L.jsx)("p",{children:"\uC800\uC7A5\uB41C \uC778\uC801\uC0AC\uD56D\uC744 \uBAA8\uB450 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774 \uC791\uC5C5\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC5B4\uC694."}),(0,L.jsxs)("div",{children:[(0,L.jsx)("button",{type:"button",onClick:hm,disabled:g,children:"\uC0AD\uC81C"}),(0,L.jsx)("button",{type:"button",onClick:()=>c(!1),children:"\uCDE8\uC18C"})]})]})]}),(0,L.jsxs)("details",{className:"bmgj-profile-settings",children:[(0,L.jsx)("summary",{children:"\uD654\uBA74 \uC124\uC815"}),(0,L.jsx)("p",{children:`\uD604\uC7AC \uADF8\uB8F9: ${o?.group?Te[o.group]:"\uC120\uD0DD \uC548 \uD568"}`}),(0,L.jsx)("div",{className:"bmgj-profile-group-buttons",children:Ax.map(v=>(0,L.jsx)("button",{type:"button","aria-pressed":o?.group===v,onClick:()=>xm(v),children:Te[v]},v))}),(0,L.jsx)("button",{type:"button",className:"bmgj-profile-secondary",onClick:Lm,children:o?.viewMode==="original"?"\uBCD1\uBB34\uAE38\uC7A1\uC774 \uCF1C\uAE30":"\uC6D0\uB798 \uD654\uBA74 \uBCF4\uAE30"}),(0,L.jsx)("button",{type:"button",className:"bmgj-profile-text-button",onClick:()=>f(!D),children:"\uD654\uBA74 \uC124\uC815 \uCD08\uAE30\uD654"}),D&&(0,L.jsxs)("div",{className:"bmgj-profile-confirm",children:[(0,L.jsx)("p",{children:"\uADF8\uB8F9 \uC120\uD0DD\uACFC \uD654\uBA74 \uBAA8\uB4DC\uB9CC \uCD08\uAE30\uD654\uD560\uAE4C\uC694? \uC778\uC801\uC0AC\uD56D \uBC0F \uC9C0\uC6D0 \uBD84\uC57C\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4."}),(0,L.jsxs)("div",{children:[(0,L.jsx)("button",{type:"button",onClick:Im,children:"\uCD08\uAE30\uD654"}),(0,L.jsx)("button",{type:"button",onClick:()=>f(!1),children:"\uCDE8\uC18C"})]})]})]}),(0,L.jsx)("p",{className:"bmgj-profile-privacy",children:"\uC778\uC801\uC0AC\uD56D\uACFC \uD76C\uB9DD \uBD84\uC57C\uB294 Chrome \uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC758 \uB85C\uCEEC \uC800\uC7A5\uC18C\uC5D0 \uBCF4\uAD00\uB429\uB2C8\uB2E4. \uAC19\uC740 \uBE0C\uB77C\uC6B0\uC800 \uD504\uB85C\uD544\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uBA74 \uC720\uC9C0\uB418\uC9C0\uB9CC \uB2E4\uB978 \uCEF4\uD4E8\uD130\uC640 \uC790\uB3D9 \uB3D9\uAE30\uD654\uB418\uC9C0\uB294 \uC54A\uC2B5\uB2C8\uB2E4. \uBCD1\uBB34\uCCAD \uB85C\uADF8\uC778 \uC138\uC158 \uC790\uCCB4\uB294 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."})]})}),(0,L.jsx)("div",{className:"bmgj-profile-footer",children:(0,L.jsx)("span",{role:"status","aria-live":"polite",children:bm})})]})}var dt=A(B(),1),ys="bmgj.infoOpen",Is="bmgj-info-panel",Fx=320;function Tx(){try{return sessionStorage.getItem(ys)==="1"}catch{return!1}}function Ex(e){try{e?sessionStorage.setItem(ys,"1"):sessionStorage.removeItem(ys)}catch{}}function Cr({isMainPage:e}){let[t,a]=(0,ft.useState)(Tx),[r,o]=(0,ft.useState)(!1),[l,n]=(0,ft.useState)(!1),u=(0,ft.useRef)(null),i=(0,ft.useRef)(!1),s=(0,ft.useRef)(null),p=()=>{s.current!==null&&(window.clearTimeout(s.current),s.current=null)},m=()=>{p(),o(!0)},g=()=>{p(),s.current=window.setTimeout(()=>{o(!1),s.current=null},Fx)};(0,ft.useEffect)(()=>{Ex(t),!t&&i.current&&(i.current=!1,u.current?.focus())},[t]),(0,ft.useEffect)(()=>()=>p(),[]);let h=()=>{p(),o(!1),i.current=!0,a(!1)},C=()=>{if(t){h();return}p(),n(!0),a(!0)},I=f=>{let d=f.target;d&&typeof d.closest=="function"&&d.closest("input,textarea,select")&&(p(),o(!0),a(!0))},D=t||r;return(0,dt.jsxs)(dt.Fragment,{children:[(0,dt.jsx)("button",{type:"button",className:"bmgj-edge-trigger","aria-label":"\uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB824 \uB0B4 \uC815\uBCF4 \uC5F4\uAE30","aria-controls":Is,"aria-expanded":D,onMouseEnter:m,onMouseLeave:g,onFocus:m,onClick:C,children:(0,dt.jsx)("span",{className:"bmgj-edge-mark","aria-hidden":"true"})}),D&&(0,dt.jsx)("div",{className:"bmgj-drawer-wrap",onMouseEnter:m,onMouseLeave:g,onFocusCapture:I,onPointerDownCapture:I,children:(0,dt.jsx)(Wp,{id:Is,focusOnOpen:l&&t,isMainPage:e,onClose:h})}),(0,dt.jsxs)("button",{ref:u,type:"button",className:"bmgj-float","aria-expanded":D,"aria-controls":Is,onClick:C,children:[(0,dt.jsx)(Do,{size:18,strokeWidth:1.75,"aria-hidden":"true"}),"\uB0B4 \uC815\uBCF4"]})]})}var Ea=A(he(),1),G=A(B(),1),Dx="https://www.mma.go.kr/board/boardList.do?mc=usr0000379&gesipan_id=2",jx="https://www.mma.go.kr/board/boardList.do?mc=usr0000242&gesipan_id=125",Bx="\uC18C\uC2DD\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC5B4\uC694. \uC804\uCCB4 \uBCF4\uAE30\uC5D0\uC11C \uD655\uC778\uD574 \uC8FC\uC138\uC694.",Ox={notice:"\uACF5\uC9C0\uC0AC\uD56D",policy:"\uC81C\uB3C4 \uC548\uB0B4"};function $p({items:e,kind:t}){return e?(0,G.jsx)(G.Fragment,{children:e.map(a=>(0,G.jsx)("li",{children:(0,G.jsxs)("a",{className:"bmgj-news-row",href:a.href,children:[(0,G.jsx)("span",{className:`bmgj-news-badge bmgj-news-badge--${t}`,children:Ox[t]}),(0,G.jsx)("span",{className:"bmgj-news-title",children:a.title}),(0,G.jsx)("span",{className:"bmgj-news-date",children:a.date}),(0,G.jsx)("span",{className:"bmgj-news-arrow","aria-hidden":"true",children:"\u2192"})]})},a.href))}):(0,G.jsx)("li",{className:"bmgj-news-error",children:Bx})}function Xp({news:e}){let[t,a]=(0,Ea.useState)(!1),r=(0,Ea.useRef)(null),o=(0,Ea.useRef)(null);return(0,Ea.useEffect)(()=>{if(!t)return;let l=u=>{r.current&&!u.composedPath().includes(r.current)&&a(!1)},n=u=>{u.key==="Escape"&&(u.preventDefault(),a(!1),o.current?.focus())};return document.addEventListener("pointerdown",l,!0),document.addEventListener("keydown",n,!0),()=>{document.removeEventListener("pointerdown",l,!0),document.removeEventListener("keydown",n,!0)}},[t]),(0,G.jsxs)("section",{className:"bmgj-panel","aria-labelledby":"bmgj-news-title",children:[(0,G.jsxs)("div",{className:"bmgj-panel-head",children:[(0,G.jsxs)("div",{children:[(0,G.jsx)("p",{className:"bmgj-eyebrow",children:"NOTICE"}),(0,G.jsx)("h2",{id:"bmgj-news-title",className:"bmgj-panel-title",children:"\uC0C8\uB85C\uC6B4 \uC18C\uC2DD\uC744 \uD655\uC778\uD558\uC138\uC694"})]}),(0,G.jsxs)("div",{ref:r,className:"bmgj-popover-wrap",children:[(0,G.jsxs)("button",{ref:o,type:"button",className:"bmgj-head-link","aria-expanded":t,"aria-controls":"bmgj-news-all",onClick:()=>a(l=>!l),children:["\uC804\uCCB4 \uBCF4\uAE30 ",(0,G.jsx)("span",{"aria-hidden":"true",children:"\u2192"})]}),(0,G.jsxs)("ul",{id:"bmgj-news-all",className:"bmgj-popover",hidden:!t,children:[(0,G.jsx)("li",{children:(0,G.jsx)("a",{className:"bmgj-popover-link",href:Dx,children:"\uACF5\uC9C0\uC0AC\uD56D \uC804\uCCB4 \uBCF4\uAE30"})}),(0,G.jsx)("li",{children:(0,G.jsx)("a",{className:"bmgj-popover-link",href:jx,children:"\uB2EC\uB77C\uC9C0\uB294 \uC81C\uB3C4 \uC804\uCCB4 \uBCF4\uAE30"})})]})]})]}),(0,G.jsxs)("ul",{className:"bmgj-news-list",children:[(0,G.jsx)($p,{items:e.notices,kind:"notice"}),(0,G.jsx)($p,{items:e.policies,kind:"policy"})]})]})}var W=A(B(),1),Nx="\uC124\uC815\uC744 \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC74C \uBC29\uBB38\uC5D0\uB294 \uB2E4\uC2DC \uC120\uD0DD\uD574\uC57C \uD560 \uC218 \uC788\uC5B4\uC694.",Ux=4e3;function Kp({dom:e,initialPrefs:t,news:a,allMenu:r}){let[o,l]=(0,H.useState)(t.group),[n,u]=(0,H.useState)(t.viewMode),[i,s]=(0,H.useState)(null),[p,m]=(0,H.useState)(""),[g,h]=(0,H.useState)(!1),C=(0,H.useRef)(null),I=(0,H.useRef)(null),D=(0,H.useRef)(null),f=(0,H.useRef)(null),d=(0,H.useRef)(null),c=(0,H.useRef)(null),x=(0,H.useRef)(null),w=(0,H.useRef)(!1),S=(0,H.useRef)(null),k=n==="improved"&&o===null,P=k||g;(0,H.useLayoutEffect)(()=>{n==="improved"?vp(e):yn()},[n,e]),(0,H.useEffect)(()=>gr(M=>{l(M.group),u(M.viewMode)}),[]),(0,H.useEffect)(()=>{C.current?.toggleAttribute("inert",P)},[P]),(0,H.useEffect)(()=>{if(n!=="improved"||!o)return;let M={"#secrion":".bmgj-hero","#nav":".bmgj-panel"},Nt=Ze=>{let vr=Ze.target?.closest?.("a"),ge=vr?M[vr.getAttribute("href")??""]:void 0,ct=ge?C.current?.querySelector(ge):null;ct&&(Ze.preventDefault(),ct.scrollIntoView({block:"start"}),ct.focus({preventScroll:!0}))};return document.addEventListener("click",Nt,!0),()=>document.removeEventListener("click",Nt,!0)},[n,o]),(0,H.useEffect)(()=>{!g&&c.current&&(c.current.focus(),c.current=null)},[g]),(0,H.useEffect)(()=>{S.current==="toggle"&&I.current?.focus(),S.current==="original"&&!k&&D.current?.focus(),S.current=null},[n,k]),(0,H.useEffect)(()=>{!k&&w.current&&(w.current=!1,C.current?.querySelector(".bmgj-select")?.focus())},[k]),(0,H.useEffect)(()=>{if(!i)return;let M=window.setTimeout(()=>s(null),Ux);return()=>window.clearTimeout(M)},[i]);let O=(0,H.useCallback)(async M=>{await M||s(Nx)},[]),R=M=>{m(""),window.setTimeout(()=>m(M),50)},ve=M=>{M!==o&&(l(M),R(`${Te[M]} \uBA54\uB274\uB85C \uBC14\uB00C\uC5C8\uC5B4\uC694`),O(na(M)))},Dt=M=>{w.current=!0,l(M),O(na(M))},jt=(0,H.useCallback)(()=>{S.current="toggle",h(!1),u("original"),O(ua("original"))},[O]),Ye=M=>{if(r.length>0){c.current=M,h(!0);return}yt()},ja=(0,H.useCallback)(()=>h(!1),[]),yt=()=>{let M=e.allMenuButton.isConnected?e.allMenuButton:document.querySelector("#krds-header button.btn-navi.all");if(!M){S.current="toggle",u("original");return}let Nt=document.getElementById("close-nav");if(x.current&&(x.current.el.removeEventListener("click",x.current.fn),x.current=null),Nt){let Ze=()=>{x.current=null,window.setTimeout(()=>f.current?.focus(),0)};Nt.addEventListener("click",Ze,{once:!0}),x.current={el:Nt,fn:Ze}}M.click()},Bt=()=>{S.current="original",u("improved"),O(ua("improved"))},Ot=(0,W.jsx)("div",{className:"bmgj-toast-region",role:"status",children:i&&(0,W.jsx)("div",{className:"bmgj-toast",children:i})});return n==="original"?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)("button",{ref:I,type:"button",className:"bmgj-float",onClick:Bt,children:"\uBCD1\uBB34\uAE38\uC7A1\uC774 \uCF1C\uAE30"}),Ot]}):(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)("div",{ref:C,className:"bmgj-page",children:(0,W.jsxs)("div",{className:"bmgj-container",children:[(0,W.jsx)(An,{group:o,onOpenSearch:()=>Ye(d.current),searchButtonRef:d,onGroupChange:ve,onShowOriginal:jt,originalButtonRef:D}),o?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(Rn,{group:o}),(0,W.jsx)(Fn,{group:o,onOpenAllMenu:()=>Ye(f.current),allMenuLinkRef:f},o),(0,W.jsx)(Xp,{news:a}),(0,W.jsx)(bn,{})]}):(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)("div",{className:"bmgj-hero","aria-hidden":"true"}),(0,W.jsx)("div",{className:"bmgj-panel bmgj-panel--empty","aria-hidden":"true"})]})]})}),o&&(0,W.jsx)(Cr,{isMainPage:!0}),k&&(0,W.jsx)(Mn,{onSelect:Dt,onShowOriginal:jt}),g&&(0,W.jsx)(kn,{menu:r,onClose:ja}),(0,W.jsx)("div",{className:"bmgj-sr-only","aria-live":"polite",children:p}),Ot]})}var _=A(he(),1);var Hn=A(he(),1);var Hx="/mwgr/main/moveMWPoTeolMI_M.do";function Yp(){let e=document.getElementById("main");return e instanceof HTMLIFrameElement?e:null}function Zp(e){try{return e.contentDocument}catch{return null}}function Cs(e){let t=Zp(e);if(!t||t.readyState==="loading")return!1;try{return t.location.pathname.endsWith(Hx)}catch{return!1}}var Uo=null;function Jp(e){Uo||(Uo={frame:e,style:e.getAttribute("style")}),e.style.setProperty("display","none","important")}function Nn(){if(!Uo)return;let{frame:e,style:t}=Uo;t===null?e.removeAttribute("style"):e.setAttribute("style",t),Uo=null}function zx(e,t){let a=0,r=!1;for(let o=t;o<e.length;o++){let l=e[o];if(r){l==="\\"?o++:l==='"'&&(r=!1);continue}if(l==='"')r=!0;else if(l==="[")a++;else if(l==="]"&&--a===0)return e.slice(t,o+1)}return null}function _x(){for(let e of document.querySelectorAll("script:not([src])")){let t=e.textContent??"",a=/var\s+menu\s*=\s*\[/.exec(t);if(!a)continue;let r=zx(t,a.index+a[0].length-1);if(r)try{let o=JSON.parse(r);if(!Array.isArray(o))continue;return o.filter(l=>typeof l=="object"&&l!==null).map(l=>({menu_no:String(l.menu_no??""),swmenu_no:String(l.swmenu_no??""),menu_sn:String(l.menu_sn??""),menu_nm:String(l.menu_nm??""),lvl:String(l.lvl??""),filert_nm:typeof l.filert_nm=="string"&&l.filert_nm?l.filert_nm:null,sayong_yn:String(l.sayong_yn??"")}))}catch{continue}}return[]}var On=e=>e.replace(/\s+/g," ").replace(/^-\s*/,"").trim();function Qp(e){return{label:On(e.menu_nm),href:cr(e.menu_no),newTab:!1}}function em(){let e=_x().filter(o=>o.sayong_yn==="Y"&&/^\d+$/.test(o.menu_no)&&On(o.menu_nm)),t=(o,l)=>Number(o.menu_sn)-Number(l.menu_sn),a=(o,l)=>e.filter(n=>n.swmenu_no===o&&n.lvl===l).sort(t),r=[];return e.filter(o=>o.lvl==="1").sort(t).forEach((o,l)=>{let n=[];for(let u of a(o.menu_no,"2")){if(u.menu_nm.trim().startsWith("-"))continue;let i=a(u.menu_no,"3").filter(p=>p.filert_nm).map(Qp),s=u.filert_nm?Qp(u):null;!s&&i.length===0||n.push({label:On(u.menu_nm),link:s,items:i})}n.length>0&&r.push({id:`bmgj-pcat-${l}`,label:On(o.menu_nm),sections:n})}),r}var vs={remaining:null,canExtend:!1,canLogout:!1,canLogin:!1};function tm(e){let t=Zp(e)?.getElementById("util_layout2")??null;if(!t)return null;let a=[...t.querySelectorAll("a")];return{counter:t.querySelector("#counter"),extend:t.querySelector("#resetBtn"),logout:t.querySelector('a[onclick*="gf_moveLogout_ID"]'),login:a.find(r=>(r.textContent??"").replace(/\s+/g,"").includes("\uB85C\uADF8\uC778"))??null}}function Ho(e){let t=tm(e);if(!t)return vs;let a=(t.counter?.textContent??"").trim();return{remaining:/^\d{1,3}:\d{2}$/.test(a)?a:null,canExtend:!!t.extend,canLogout:!!t.logout,canLogin:!t.logout&&!!t.login}}function Un(e,t){let r=tm(e)?.[t];return r?(r.click(),!0):!1}var Et=A(B(),1),qx=1e3;function am(e,t){return e.remaining===t.remaining&&e.canExtend===t.canExtend&&e.canLogout===t.canLogout&&e.canLogin===t.canLogin}function rm({frame:e}){let[t,a]=(0,Hn.useState)(()=>Ho(e));return(0,Hn.useEffect)(()=>{let r=window.setInterval(()=>{let o=Ho(e);a(l=>am(l,o)?l:o)},qx);return()=>window.clearInterval(r)},[e]),am(t,vs)?null:(0,Et.jsxs)("div",{className:"bmgj-session",children:[t.remaining&&(0,Et.jsxs)("span",{className:"bmgj-session-time",children:[(0,Et.jsx)(Ra,{size:16,strokeWidth:1.75,"aria-hidden":"true"}),(0,Et.jsx)("span",{className:"bmgj-sr-only",children:"\uB85C\uADF8\uC778 \uB0A8\uC740 \uC2DC\uAC04"}),t.remaining]}),t.canExtend&&t.remaining&&(0,Et.jsx)("button",{type:"button",className:"bmgj-session-btn",onClick:()=>Un(e,"extend"),children:"\uC5F0\uC7A5"}),t.canLogout&&(0,Et.jsx)("button",{type:"button",className:"bmgj-text-btn",onClick:()=>Un(e,"logout"),children:"\uB098\uAC00\uAE30"}),t.canLogin&&(0,Et.jsx)("button",{type:"button",className:"bmgj-text-btn",onClick:()=>Un(e,"login"),children:"\uB85C\uADF8\uC778"})]})}var z=A(B(),1),Gx="https://mwpt.mma.go.kr/caisBMHS/images/inc/eg_logo.png",Vx="\uC124\uC815\uC744 \uC800\uC7A5\uD558\uC9C0 \uBABB\uD588\uC5B4\uC694. \uB2E4\uC74C \uBC29\uBB38\uC5D0\uB294 \uB2E4\uC2DC \uC120\uD0DD\uD574\uC57C \uD560 \uC218 \uC788\uC5B4\uC694.",Wx=4e3,$x={A:{eyebrow:"\uBCD1\uBB34\uBBFC\uC6D0, \uD544\uC694\uD55C \uAC83\uBD80\uD130 \uBA3C\uC800",title:"\uAC80\uC0AC \uC77C\uC815\uBD80\uD130 \uC785\uC601\uC77C\uC790\uAE4C\uC9C0, / \uC2E0\uCCAD\uC740 \uC5EC\uAE30\uC11C \uBC14\uB85C.",description:"\uBCD1\uC5ED\uD310\uC815\uAC80\uC0AC, \uC785\uC601\uC77C\uC790 \uBCF8\uC778\uC120\uD0DD, \uBAA8\uC9D1\uBCD1 \uC9C0\uC6D0\uCC98\uB7FC \uC790\uC8FC \uC4F0\uB294 \uBBFC\uC6D0\uC744 \uC55E\uC5D0 \uBAA8\uC558\uC5B4\uC694. \uC2E0\uCCAD\uACFC \uC870\uD68C\uB294 \uB85C\uADF8\uC778\uD55C \uB4A4 \uBCD1\uBB34\uBBFC\uC6D0 \uD654\uBA74\uC5D0\uC11C \uC774\uC5B4\uC838\uC694.",button:"\uB0B4\uB144 \uC785\uC601\uC77C\uC790 \uC2E0\uCCAD\uD558\uB7EC \uAC00\uAE30",cardId:"P-A-M06"},B:{eyebrow:"\uBCD1\uBB34\uBBFC\uC6D0, \uD544\uC694\uD55C \uAC83\uBD80\uD130 \uBA3C\uC800",title:"\uB3D9\uC6D0\uD6C8\uB828 \uC900\uBE44\uB3C4, / \uD544\uC694\uD55C \uBBFC\uC6D0\uB9CC \uAC04\uD3B8\uD558\uAC8C.",description:"\uD6C8\uB828 \uC77C\uC815 \uC870\uD68C\uBD80\uD130 \uC5F0\uAE30 \uC2E0\uCCAD, \uD1B5\uC9C0\uC11C \uCD9C\uB825\uAE4C\uC9C0 \uC608\uBE44\uAD70\uC5D0\uAC8C \uD544\uC694\uD55C \uBBFC\uC6D0\uC744 \uBAA8\uC558\uC5B4\uC694.",button:"\uB3D9\uC6D0\uD6C8\uB828 \uC77C\uC790 \uC870\uD68C\uD558\uB7EC \uAC00\uAE30",cardId:"P-B-M03"}},Xx={head:{A:{eyebrow:"CIVIL SERVICE",title:"\uC785\uC601 \uC900\uBE44 \uBBFC\uC6D0"},B:{eyebrow:"CIVIL SERVICE",title:"\uC608\uBE44\uAD70 \uBBFC\uC6D0"}},layouts:Ln,getCard:Io,columns:4};function om({frame:e,initialPrefs:t,menu:a}){let[r,o]=(0,_.useState)(t.group),[l,n]=(0,_.useState)(t.viewMode),[u,i]=(0,_.useState)(()=>Cs(e)),[s,p]=(0,_.useState)(null),[m,g]=(0,_.useState)(""),[h,C]=(0,_.useState)(!1),I=(0,_.useRef)(null),D=(0,_.useRef)(null),f=(0,_.useRef)(null),d=(0,_.useRef)(null),c=(0,_.useRef)(null),x=(0,_.useRef)(null),w=(0,_.useRef)(!1),S=(0,_.useRef)(null),k=l==="improved"&&u,P=k&&r===null,O=P||h;(0,_.useEffect)(()=>{let M=()=>i(Cs(e));return e.addEventListener("load",M),M(),()=>e.removeEventListener("load",M)},[e]),(0,_.useLayoutEffect)(()=>{k?(Jp(e),window.scrollTo(0,0)):Nn()},[k,e]),(0,_.useEffect)(()=>gr(M=>{o(M.group),n(M.viewMode)}),[]),(0,_.useEffect)(()=>{I.current?.toggleAttribute("inert",O)},[O]),(0,_.useEffect)(()=>{!h&&x.current&&(x.current.focus(),x.current=null)},[h]),(0,_.useEffect)(()=>{S.current==="toggle"&&D.current?.focus(),S.current==="original"&&!P&&f.current?.focus(),S.current=null},[l,P]),(0,_.useEffect)(()=>{!P&&w.current&&(w.current=!1,I.current?.querySelector(".bmgj-select")?.focus())},[P]),(0,_.useEffect)(()=>{if(!s)return;let M=window.setTimeout(()=>p(null),Wx);return()=>window.clearTimeout(M)},[s]);let R=(0,_.useCallback)(async M=>{await M||p(Vx)},[]),ve=M=>{g(""),window.setTimeout(()=>g(M),50)},Dt=M=>{M!==r&&(o(M),ve(`${Te[M]} \uBA54\uB274\uB85C \uBC14\uB00C\uC5C8\uC5B4\uC694`),R(na(M)))},jt=M=>{w.current=!0,o(M),R(na(M))},Ye=(0,_.useCallback)(()=>{S.current="toggle",C(!1),n("original"),R(ua("original"))},[R]),ja=()=>{S.current="original",n("improved"),R(ua("improved"))},yt=M=>{if(a.length===0){window.location.href=fp;return}x.current=M,C(!0)},Bt=(0,_.useCallback)(()=>C(!1),[]),Ot=(0,z.jsx)("div",{className:"bmgj-toast-region",role:"status",children:s&&(0,z.jsx)("div",{className:"bmgj-toast",children:s})});return u?l==="original"?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("button",{ref:D,type:"button",className:"bmgj-float",onClick:ja,children:"\uBCD1\uBB34\uAE38\uC7A1\uC774 \uCF1C\uAE30"}),Ot]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("div",{className:"bmgj-pmast",children:(0,z.jsxs)("div",{className:"bmgj-pmast-inner",children:[(0,z.jsx)("img",{src:Gx,alt:"",width:40,height:15})," \uC774 \uB204\uB9AC\uC9D1\uC740 \uB300\uD55C\uBBFC\uAD6D \uACF5\uC2DD \uC804\uC790\uC815\uBD80 \uB204\uB9AC\uC9D1\uC785\uB2C8\uB2E4."]})}),(0,z.jsx)("div",{ref:I,className:"bmgj-page bmgj-page--portal",children:(0,z.jsxs)("div",{className:"bmgj-container",children:[(0,z.jsx)(An,{site:"portal",session:(0,z.jsx)(rm,{frame:e}),group:r,onOpenSearch:()=>yt(c.current),searchButtonRef:c,onGroupChange:Dt,onShowOriginal:Ye,originalButtonRef:f}),r?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Rn,{group:r,content:$x,resolveCard:Io}),(0,z.jsx)(Fn,{group:r,catalog:Xx,onOpenAllMenu:()=>yt(d.current),allMenuLinkRef:d},r),(0,z.jsx)(bn,{})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("div",{className:"bmgj-hero","aria-hidden":"true"}),(0,z.jsx)("div",{className:"bmgj-panel bmgj-panel--empty","aria-hidden":"true"})]})]})}),r&&(0,z.jsx)(Cr,{isMainPage:!0}),P&&(0,z.jsx)(Mn,{onSelect:jt,onShowOriginal:Ye}),h&&(0,z.jsx)(kn,{menu:a,onClose:Bt}),(0,z.jsx)("div",{className:"bmgj-sr-only","aria-live":"polite",children:m}),Ot]}):null}var Kx="/caisBMHS/dmem/dmem/mwgr/gjwn/moveTHJWSJSGBJeongBoIR_M.do",lm="22041",ws="bmgj.pendingProfileLogin",Qx=900*1e3;function nm(e){let t=new URL(location.href),a=0;try{t.hash===Tn?(a=Date.now()+Qx,sessionStorage.setItem(ws,String(a)),t.hash="",history.replaceState(history.state,"",t)):a=Number(sessionStorage.getItem(ws))}catch{}if(!Number.isFinite(a)||a<=Date.now())return;let r=()=>{let l=a<=Date.now();if(!(!l&&!Ho(e).canLogout)){window.clearInterval(o),e.removeEventListener("load",r);try{sessionStorage.removeItem(ws)}catch{}!l&&t.searchParams.get("menuNo")!==lm&&location.assign(cr(lm))}},o=window.setInterval(r,750);e.addEventListener("load",r),r()}var Yx={fullName:60,birthDate:10,contactPhone:24,mobilePhone:24,militaryEmail:120,registeredOffice:80,personalEmail:120,applicationOffice:80,address:260},um=e=>String(e||"").replace(/[\s:*＊•·()（）[\]【】/]/g,"").trim(),zn=e=>{if(!e||!e.getClientRects().length)return!1;let t=getComputedStyle(e);return t.display!=="none"&&t.visibility==="visible"};function Zx(e){let t=um(e);return!t||t.length>36?null:/^(성명|이름|지원자성명)$/.test(t)?"fullName":/^(생년월일|출생일)$/.test(t)?"birthDate":/^(전화번호|비상연락처|비상전화번호|전화번호비상연락처|유선전화|연락전화번호)$/.test(t)?"contactPhone":/^(휴대전화|휴대폰|휴대전화번호|휴대폰번호|핸드폰번호)$/.test(t)?"mobilePhone":/나라사랑(메일|이메일|전자우편)?/.test(t)?"militaryEmail":/^(병적지청|병적지방병무청)$/.test(t)?"registeredOffice":/^(응시지역병무청|응시지역|응시지방병무청|응시지구)$/.test(t)?"applicationOffice":/^(전자우편|전자우편상용|전자우편일반|상용이메일|일반이메일|이메일|이메일주소)$/.test(t)?"personalEmail":/^(주소|현주소|거주지주소|도로명주소)$/.test(t)?"address":null}function Jx(e,t){if(!zn(e))return"";let a=[...e.querySelectorAll("input,textarea,select")];if(!a.length)return e.innerText??e.textContent??"";let r=a.filter(o=>{let l=o.getAttribute("type")?.toLowerCase()??"";return zn(o)&&!["hidden","password","file","checkbox","radio","submit","button"].includes(l)&&!/(password|passwd|jumin|rrn|token|csrf|session|auth|인증|비밀번호|주민등록)/i.test(`${o.name} ${o.id}`)}).map(o=>o.value.trim()?o instanceof HTMLSelectElement?(o.selectedOptions[0]?.textContent??"").trim():o.value.trim():"").filter(Boolean);return t==="address"?r.join(" "):r[0]??""}function eL(e,t){let a=String(t||"").replace(/\s+/g," ").trim();if(!a||a.length>(e==="birthDate"?32:Yx[e])||/(비밀번호|인증번호|예\)|예시|접속하기|선택하세요|선택해)/.test(a)||/(?:^|\D)\d{6}[-\s]?\d{7}(?:\D|$)/.test(a))return"";if(e==="fullName")return/^[가-힣a-zA-Z\s·-]{2,60}$/.test(a)?a:"";if(e==="birthDate"){let r=a.match(/^(\d{4})[./\-년\s]+(\d{1,2})[./\-월\s]+(\d{1,2})일?\.?$/);if(r||(r=a.match(/^(\d{4})(\d{2})(\d{2})$/)),!r)return"";let o=+r[1],l=+r[2],n=+r[3],u=new Date(Date.UTC(o,l-1,n));return u.getUTCFullYear()===o&&u.getUTCMonth()+1===l&&u.getUTCDate()===n?`${r[1]}-${String(l).padStart(2,"0")}-${String(n).padStart(2,"0")}`:""}return e==="contactPhone"||e==="mobilePhone"?/^[+\d()\s-]{7,24}$/.test(a)?a:"":e==="militaryEmail"||e==="personalEmail"?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)?a:"":e==="registeredOffice"||e==="applicationOffice"?/병무(지)?청|병무지청|서울|부산|대구|경북|광주|전남|대전|충남|경기|강원|충북|전북|경남|제주|인천|울산/.test(a)?a:"":e==="address"&&a.length>=5&&!/^\d{5,6}$/.test(a)?a:""}function im(){if(location.pathname!==Kx)return;let e,t=!1,a=!1,r="";async function o(){if(t){a=!0;return}let s=[...document.querySelectorAll("table")].find(g=>zn(g)&&um(g.caption?.textContent)==="\uC778\uC801\uC0AC\uD56D");if(!s)return;let p={};for(let g of s.querySelectorAll("th")){let h=Zx(g.textContent),C=g.nextElementSibling;if(!h||!zn(g)||!(C instanceof HTMLTableCellElement)||C.tagName!=="TD")continue;let I=eL(h,Jx(C,h));I&&!p[h]&&(p[h]=I)}if(!p.fullName||!p.birthDate)return;let m=JSON.stringify(p);if(m!==r){t=!0;try{let g=await chrome.storage.local.get([me,st]),h=g[me]&&typeof g[me]=="object"?g[me]:{},I=g[st]&&(h.fullName&&h.fullName!==p.fullName||h.birthDate&&h.birthDate!==p.birthDate)?p:{...h,...p};(!g[st]||JSON.stringify(I)!==JSON.stringify(h))&&await chrome.storage.local.set({[me]:I,[st]:{updatedAt:new Date().toISOString(),fields:Object.keys(p),source:"visible-application-form"}}),r=m}catch{}finally{t=!1,a&&(a=!1,l())}}}let l=()=>{e===void 0&&(e=window.setTimeout(()=>{e=void 0,o()},350))};l();let n=[1e3,2500,5e3].map(s=>window.setTimeout(l,s)),u=new MutationObserver(l);u.observe(document.documentElement,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["value","selected","hidden"]}),document.addEventListener("input",l,!0),document.addEventListener("change",l,!0),window.addEventListener("pageshow",l);let i=s=>{if(!s.persisted){u.disconnect(),window.clearTimeout(e);for(let p of n)window.clearTimeout(p);document.removeEventListener("input",l,!0),document.removeEventListener("change",l,!0),window.removeEventListener("pageshow",l),window.removeEventListener("pagehide",i)}};window.addEventListener("pagehide",i)}var sm=`/* \uBA85\uC138 5\uC808 \uAC12. \uC0C9\uC740 \uC774 \uBCC0\uC218\uB85C\uB9CC \uC4F4\uB2E4. */
:host {
  all: initial;
  display: block;

  --bg-page: #F6F7F5;
  --bg-surface: #FFFFFF;
  --bg-card: #FBFCFA;
  --border: #E3EAE5;
  --text: #1D3530;
  --text-sub: #5D7068;
  --text-muted: #65776F;
  --text-eyebrow: #4F6E5F;
  --text-link: #32654C;
  --brand-start: #174F43;
  --brand-end: #246654;
  --brand-solid: #266D54;
  --focus: #298773;
  --highlight-bg: #EEF6EE;
  --highlight-border: #B5D2BF;
  --select-bg: #EAF1EB;
  --hero-btn: #D8EDC9;
  --hero-desc: #E2F0E8;
  --hero-dot: #D8B873;
  --hero-check: #B9ECD4;
  --icon-mint-bg: #EDF2ED;
  --icon-mint-fg: #527567;
  --icon-blue-bg: #EDF0F7;
  --icon-blue-fg: #697A98;
  --icon-sand-bg: #F6F1E8;
  --icon-sand-fg: #9A865F;
  --badge-notice-bg: #EFF4EE;
  --badge-notice-fg: #567363;
  --badge-policy-bg: #F5F0E6;
  --badge-policy-fg: #76643F;
  --badge-group-bg: #F4F8F1;
  --badge-group-fg: #507158;
  --strip-bg: #F6F8F4;
  --choice-bg: #F8FAF6;
  --choice-bg-hover: #EFF5E9;
  --hero-title: #FFFFFF;
  --icon-solid-fg: #FFFFFF;
  --overlay: rgba(33, 58, 49, 0.62);
  --float-shadow: 0 4px 14px rgba(29, 53, 48, 0.12);
  --panel-shadow: 0 12px 32px rgba(29, 53, 48, 0.18);
  /* \uD5E4\uB354\uC758 \uC0AC\uC774\uD2B8 \uD45C\uC2DC(\uC9C0\uAE08 \uC788\uB294 \uC0AC\uC774\uD2B8 \uCE78\uC744 \uC9C4\uD558\uAC8C \uCC44\uC6C0) */
  --site-active-bg: var(--brand-solid);
  --site-active-fg: #FFFFFF;
  /* \uBCD1\uBB34\uBBFC\uC6D0\uD3EC\uD138 \uC6D0\uBCF8 \uC704\uCABD \uB760(#util_layout2) \uC0C9 */
  --portal-mast-bg: #6A747C;
  --portal-mast-fg: #FFFFFF;

  --content-max: 1184px;
  --gutter: 32px;
  --section-gap: 24px;

  /* \uBCD1\uBB34\uCCAD \uB204\uB9AC\uC9D1\uC774 \uC4F0\uB294 Pretendard GOV. \uBCD1\uBB34\uBBFC\uC6D0\uC5D0\uC11C\uB294 \uD655\uC7A5\uC774 \uAC19\uC740 \uAE00\uAF34 \uD30C\uC77C\uC744 \uB123\uC5B4 \uC900\uB2E4 */
  font-family: "Pretendard GOV", "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: var(--text);
  /* \uD55C\uAE00\uC774 \uB2E8\uC5B4 \uC911\uAC04\uC5D0\uC11C \uB04A\uAE30\uC9C0 \uC54A\uAC8C(7\uB2E8\uACC4 320px \uC810\uAC80\uC5D0\uC11C \uBC30\uB108 \uC81C\uBAA9 "\uC900 / \uBE44" \uB04A\uAE40 \uBC1C\uACAC) */
  word-break: keep-all;
  overflow-wrap: anywhere;
}

/* \uBCD1\uBB34\uBBFC\uC6D0 \uD654\uBA74 \uC0C9(\uC0AC\uC6A9\uC790 \uACB0\uC815 2026-11-12): \uBA54\uC778\uC758 \uCD08\uB85D \uB300\uC2E0 \uB0A8\uC0C9\xB7\uB77C\uBCA4\uB354 \uACC4\uC5F4.
   \uB300\uBE44\uB294 \uBA54\uC778\uACFC \uAC19\uC740 \uAE30\uC900(\uAE00\uC790 4.5:1 \uC774\uC0C1)\uC73C\uB85C \uD655\uC778\uD568 */
:host(.bmgj-theme-portal) {
  --bg-page: #F4F6FB;
  --bg-card: #FAFBFE;
  --border: #E2E7F1;
  --text: #1B2440;
  --text-sub: #555F77;
  --text-muted: #5F6880;
  --text-eyebrow: #45568A;
  --text-link: #3245A0;
  --brand-start: #1F2E6B;
  --brand-end: #3A4FB0;
  --brand-solid: #3448A8;
  --focus: #4C63D2;
  --highlight-bg: #EEF1FC;
  --highlight-border: #BAC5EE;
  --select-bg: #E9EDFA;
  --hero-btn: #DCE3FF;
  --hero-desc: #E6EBFF;
  --hero-dot: #F2C46B;
  --hero-check: #C3D0FF;
  --icon-mint-bg: #E8F3F3;
  --icon-mint-fg: #3F7479;
  --icon-blue-bg: #ECEFFA;
  --icon-blue-fg: #5262A3;
  --icon-sand-bg: #F4EEFA;
  --icon-sand-fg: #7D5C9E;
  --badge-group-bg: #EEF1FB;
  --badge-group-fg: #42528C;
  --strip-bg: #F5F7FC;
  --choice-bg: #F7F8FD;
  --choice-bg-hover: #ECEFFB;
  --overlay: rgba(27, 36, 64, 0.62);
  --float-shadow: 0 4px 14px rgba(27, 36, 64, 0.12);
  --panel-shadow: 0 12px 32px rgba(27, 36, 64, 0.18);
}

*, *::before, *::after { box-sizing: border-box; }

:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 3px;
}
/* \uAC74\uB108\uB6F0\uAE30 \uB9C1\uD06C\uB85C \uC62E\uACA8 \uC628 \uAD6C\uC5ED(tabindex=-1)\uC740 \uD14C\uB450\uB9AC \uC5C6\uC774 \uD3EC\uCEE4\uC2A4\uB9CC \uBC1B\uB294\uB2E4 */
[tabindex="-1"]:focus { outline: none; }

.bmgj-page {
  background: var(--bg-page);
  /* \uC544\uB798 96px: \uACE0\uC815\uB41C \uB0B4 \uC815\uBCF4 \uBC84\uD2BC\uC774 \uD478\uD130\uB97C \uAC00\uB9AC\uC9C0 \uC54A\uAC8C(3.6) */
  padding: var(--section-gap) 0 96px;
}

/* \u2500\u2500 \uBCD1\uBB34\uBBFC\uC6D0 \uD654\uBA74: \uC6D0\uBCF8 \uD3EC\uD138\uC758 \uC804\uC790\uC815\uBD80 \uB204\uB9AC\uC9D1 \uB760\uB97C \uADF8\uB300\uB85C \uC62E\uAE40(\uB192\uC774 40px, \uAC00\uC6B4\uB370 1000px) \u2500\u2500 */
.bmgj-pmast { height: 40px; background: var(--portal-mast-bg); }
.bmgj-pmast-inner {
  width: 1000px;
  max-width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  font-family: NanumGothic, sans-serif;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.7px;
  color: var(--portal-mast-fg);
}
.bmgj-pmast-inner img { vertical-align: top; }
/* \uBCD1\uBB34\uCCAD \uB760(31px)\uBCF4\uB2E4 9px \uB192\uC73C\uBBC0\uB85C, \uADF8\uB9CC\uD07C \uC704 \uC5EC\uBC31\uC744 \uC904\uC5EC \uD5E4\uB354 \uC704\uCE58\uB97C \uBA54\uC778\uACFC \uB9DE\uCD98\uB2E4 */
.bmgj-page--portal { padding-top: calc(var(--section-gap) - 9px); }

.bmgj-container {
  max-width: calc(var(--content-max) + var(--gutter) * 2);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.bmgj-text-btn {
  min-height: 44px;
  padding: 0 8px;
  border: 0;
  background: transparent;
  font: inherit;
  color: var(--text-sub); /* \uB300\uBE44 4.5:1 \uD655\uBCF4(7\uB2E8\uACC4, \uC0AC\uC6A9\uC790 \uACB0\uC815) */
  cursor: pointer;
}

/* \uB0B4 \uC815\uBCF4 / \uBCD1\uBB34\uAE38\uC7A1\uC774 \uCF1C\uAE30 \uBC84\uD2BC \uACF5\uD1B5 \uBAA8\uC591(5.1) */
.bmgj-float {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2147483000;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 44px;
  padding: 0 20px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-surface);
  box-shadow: var(--float-shadow);
  font: inherit;
  font-weight: 600;
  color: var(--text-link);
  cursor: pointer;
}


.bmgj-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

a { color: inherit; }

/* \u2500\u2500 \uD5E4\uB354(3.2) \u2500\u2500 */
.bmgj-header {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-areas: "brand search controls";
  align-items: center;
  gap: 12px 16px;
  min-height: 88px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.bmgj-header-brand { grid-area: brand; display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.bmgj-search { grid-area: search; position: relative; width: 280px; }
.bmgj-header-controls { grid-area: controls; display: flex; align-items: center; gap: 8px; }

/* \uC0AC\uC774\uD2B8 \uD45C\uC2DC(\uC0AC\uC6A9\uC790 \uACB0\uC815 2026-11-12): \uBCD1\uBB34\uCCAD | \uBCD1\uBB34\uBBFC\uC6D0 \uB450 \uCE78 \uC911 \uC9C0\uAE08 \uC788\uB294 \uCE78\uC744 \uC9C4\uD558\uAC8C \uCC44\uC6B4\uB2E4 */
.bmgj-sites {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg-surface);
}
.bmgj-site {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 700;
  color: var(--text-sub);
  text-decoration: none;
}
.bmgj-site:hover { background: var(--choice-bg-hover); }
.bmgj-site[aria-current="page"] { background: var(--site-active-bg); color: var(--site-active-fg); }

/* \uBCD1\uBB34\uCCAD \uB85C\uACE0(viewBox 152\xD748)\uB97C \uB192\uC774 28px\uB85C, \uC815\uBD80 \uB9C8\uD06C(x 0~48.55)\uC640 \uAE00\uC790(x 56~152)\uB85C \uC798\uB77C \uBCF4\uC5EC \uC900\uB2E4.
   \uC9C4\uD55C \uCE78\uC5D0\uC11C\uB294 \uAE00\uC790\uB9CC \uD770\uC0C9\uC73C\uB85C \uBC14\uAFB8\uACE0 \uC815\uBD80 \uB9C8\uD06C\uB294 \uC6D0\uB798 \uC0C9 \uADF8\uB300\uB85C. \uC804\uCCB4 \uB108\uBE44(88.67px)\uB294 \uC6D0\uBCF8\uACFC \uAC19\uB2E4. */
.bmgj-logo { display: inline-flex; align-items: center; height: 28px; }
.bmgj-logo-mark, .bmgj-logo-word { display: block; height: 28px; overflow: hidden; }
.bmgj-logo-mark { width: 28.4px; margin-right: 4.27px; }
.bmgj-logo-word { width: 56px; }
.bmgj-logo img { display: block; height: 28px; width: auto; max-width: none; }
.bmgj-logo-word img { margin-left: -32.67px; }
.bmgj-site[aria-current="page"] .bmgj-logo-word img { filter: brightness(0) invert(1); }
.bmgj-unofficial {
  padding: 2px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-sub); /* \uB300\uBE44 4.5:1 \uD655\uBCF4 */
}

/* \uBCD1\uBB34\uBBFC\uC6D0 \uD654\uBA74 \uD5E4\uB354\uC758 \uB85C\uADF8\uC778 \uC0C1\uD0DC(\uB0A8\uC740 \uC2DC\uAC04\xB7\uC5F0\uC7A5\xB7\uB098\uAC00\uAE30) */
.bmgj-session { display: flex; align-items: center; gap: 6px; }
.bmgj-session-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  color: var(--text-sub);
}
.bmgj-session-btn {
  position: relative;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-surface);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-link);
  cursor: pointer;
}
/* \uBCF4\uC774\uB294 \uB192\uC774 32px, \uB204\uB974\uB294 \uB192\uC774 44px(8\uC808) */
.bmgj-session-btn::after { content: ""; position: absolute; inset: -6px 0; }

.bmgj-search-input {
  width: 100%;
  height: 44px;
  padding: 0 44px 0 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-surface);
  font: inherit;
  color: var(--text);
}
.bmgj-search-input::placeholder { color: var(--text-muted); }
.bmgj-search-input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
.bmgj-search-input:focus-visible { outline: 2px solid var(--focus); outline-offset: 0; border-color: var(--focus); }
.bmgj-search-clear {
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}

.bmgj-select-wrap { position: relative; }
.bmgj-select {
  -webkit-appearance: none;
  appearance: none;
  height: 44px;
  padding: 0 40px 0 16px;
  border: 0;
  border-radius: 10px;
  background: var(--select-bg);
  font: inherit;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}
.bmgj-select:focus-visible { outline: 2px solid var(--focus); outline-offset: 0; }
.bmgj-select-icon { position: absolute; top: 13px; right: 14px; color: var(--text); pointer-events: none; }

/* \u2500\u2500 \uC18C\uAC1C \uBC30\uB108(3.3) \u2500\u2500 */
.bmgj-hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
  min-height: 272px;
  margin-top: var(--section-gap);
  padding: 40px;
  border-radius: 24px;
  background: linear-gradient(90deg, var(--brand-start), var(--brand-end));
}
.bmgj-hero-eyebrow { margin: 0; font-size: 13px; font-weight: 600; color: var(--hero-desc); }
.bmgj-hero-title { margin: 8px 0 12px; font-size: 38px; font-weight: 800; line-height: 1.3; color: var(--hero-title); }
.bmgj-hero-line { display: block; }
.bmgj-hero-desc { margin: 0; font-size: 15px; color: var(--hero-desc); }
.bmgj-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  margin-top: 24px;
  padding: 0 18px;
  border-radius: 8px;
  background: var(--hero-btn);
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}
.bmgj-hero-btn:focus-visible { outline-color: var(--hero-btn); }
.bmgj-hero-art { width: 200px; max-width: 200px; height: auto; }
.bmgj-hero-art .art-orbit,
.bmgj-hero-art .art-dash { fill: none; stroke: var(--hero-desc); stroke-width: 1; opacity: 0.3; }
.bmgj-hero-art .art-dash { stroke-dasharray: 3 5; opacity: 0.7; }
.bmgj-hero-art .art-plus line { stroke: var(--hero-desc); stroke-width: 2; stroke-linecap: round; }
.bmgj-hero-art .art-dot { fill: var(--hero-dot); }
.bmgj-hero-art .art-paper { fill: var(--bg-surface); }
.bmgj-hero-art .art-line { fill: var(--hero-check); opacity: 0.6; }
.bmgj-hero-art .art-check-bg { fill: var(--hero-check); }
.bmgj-hero-art .art-check { fill: none; stroke: var(--brand-solid); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }


/* \u2500\u2500 \uD328\uB110 \uACF5\uD1B5 \u2500\u2500 */
.bmgj-panel {
  margin-top: var(--section-gap);
  padding: 28px;
  border-radius: 24px;
  background: var(--bg-surface);
}
.bmgj-panel--empty { min-height: 320px; }
.bmgj-panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.bmgj-eyebrow { margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-eyebrow); }
.bmgj-panel-title { margin: 4px 0 0; font-size: 24px; font-weight: 700; line-height: 1.35; color: var(--text); }
.bmgj-group-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--badge-group-bg);
  font-size: 13px;
  font-weight: 600;
  color: var(--badge-group-fg);
}
.bmgj-group-dot { font-size: 8px; }

/* \u2500\u2500 \uBA54\uB274 \uCE74\uB4DC(3.4) \u2500\u2500 */
.bmgj-card-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  /* \uBAA8\uB4E0 \uCE78\uC744 \uAC19\uC740 \uD06C\uAE30\uB85C: \uC904\uB9C8\uB2E4 \uB192\uC774\uAC00 \uB2EC\uB77C\uC9C0\uC9C0 \uC54A\uAC8C \uAC00\uC7A5 \uD070 \uCE78\uC5D0 \uB9DE\uCD98\uB2E4(\uC0AC\uC6A9\uC790 \uACB0\uC815 2026-11-12) */
  grid-auto-rows: 1fr;
  align-items: stretch;
  gap: 12px;
  margin-top: 20px;
}
.bmgj-card-grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.bmgj-card-cell { position: relative; display: flex; flex-direction: column; min-width: 0; }
.bmgj-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 144px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg-card);
  font: inherit;
  text-align: left;
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
}
.bmgj-card:hover { border-color: var(--highlight-border); }
.bmgj-card--highlight { background: var(--highlight-bg); border-color: var(--highlight-border); }
.bmgj-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
}
.bmgj-icon--mint { background: var(--icon-mint-bg); color: var(--icon-mint-fg); }
.bmgj-icon--blue { background: var(--icon-blue-bg); color: var(--icon-blue-fg); }
.bmgj-icon--sand { background: var(--icon-sand-bg); color: var(--icon-sand-fg); }
.bmgj-icon--solid { background: var(--brand-solid); color: var(--icon-solid-fg); }
.bmgj-card-title {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.bmgj-card-desc {
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-sub);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.bmgj-card-more { margin-top: auto; padding-top: 12px; font-size: 13px; font-weight: 600; color: var(--text-link); }
.bmgj-card-tag {
  margin-top: 8px;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--badge-group-bg);
  font-size: 12px;
  color: var(--badge-group-fg);
}
.bmgj-newtab { font-weight: 400; color: var(--text-sub); }

.bmgj-sublinks {
  /* \uD3BC\uCE5C \uBAA9\uB85D\uC740 \uCE74\uB4DC \uC544\uB798\uC5D0 \uACB9\uCCD0 \uB744\uC6CC \uCE78 \uD06C\uAE30\uB97C \uBC14\uAFB8\uC9C0 \uC54A\uB294\uB2E4 */
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 10;
  box-shadow: var(--panel-shadow);
  margin: 0;
  padding: 4px 0;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-surface);
}
.bmgj-sublinks[hidden] { display: none; }
.bmgj-sublinks li + li { border-top: 1px solid var(--border); }
.bmgj-sublink {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 16px;
  font-size: 14px;
  text-decoration: none;
  color: var(--text);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.bmgj-sublink:hover { text-decoration: underline; }

/* \u2500\u2500 \uB354\uBCF4\uAE30(3.4) \u2500\u2500 */
.bmgj-more-wrap { display: flex; justify-content: center; margin-top: 24px; }
.bmgj-more {
  position: relative;
  height: 40px;
  padding: 0 24px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-surface);
  font: inherit;
  font-size: 14px;
  color: var(--text);
  cursor: pointer;
}
/* \uBCF4\uC774\uB294 \uB192\uC774\uB294 40px(5.1), \uB204\uB974\uB294 \uC601\uC5ED\uC740 44px \uC774\uC0C1(8\uC808) */
.bmgj-more::after { content: ""; position: absolute; inset: -2px 0; }

/* \u2500\u2500 \uC804\uCCB4 \uBA54\uB274 \uC548\uB0B4 \uB760(3.4) \u2500\u2500 */
.bmgj-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 12px;
  min-height: 44px;
  margin-top: 16px;
  padding: 0 16px;
  border-radius: 12px;
  background: var(--strip-bg);
  font-size: 13px;
  color: var(--text-sub); /* \uB300\uBE44 4.5:1 \uD655\uBCF4 */
}
.bmgj-strip-link {
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}


/* \u2500\u2500 \uC18C\uC2DD \uD328\uB110(3.5) \u2500\u2500 */
.bmgj-popover-wrap { position: relative; flex: none; }
.bmgj-head-link {
  min-height: 44px;
  padding: 0 4px;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 14px;
  color: var(--text-muted);
  cursor: pointer;
}
.bmgj-popover {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  min-width: 220px;
  margin: 4px 0 0;
  padding: 4px 0;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-surface);
  box-shadow: var(--float-shadow);
}
.bmgj-popover[hidden] { display: none; }
.bmgj-popover-link {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 16px;
  font-size: 14px;
  text-decoration: none;
  color: var(--text);
}
.bmgj-popover-link:hover { text-decoration: underline; }

.bmgj-news-list { margin: 20px 0 0; padding: 0; list-style: none; }
.bmgj-news-list > li { border-top: 1px solid var(--border); }
.bmgj-news-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 8px 0;
  text-decoration: none;
  color: var(--text);
}
.bmgj-news-row:hover .bmgj-news-title { text-decoration: underline; }
.bmgj-news-badge {
  flex: none;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
.bmgj-news-badge--notice { background: var(--badge-notice-bg); color: var(--badge-notice-fg); }
.bmgj-news-badge--policy { background: var(--badge-policy-bg); color: var(--badge-policy-fg); }
.bmgj-news-title {
  flex: 1;
  min-width: 0;
  font-size: 15px;
  font-weight: 500;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.bmgj-news-date { flex: none; font-size: 13px; color: var(--text-muted); }
.bmgj-news-arrow { flex: none; color: var(--text-muted); }
.bmgj-news-error {
  display: flex;
  align-items: center;
  min-height: 56px;
  font-size: 14px;
  color: var(--text-muted);
}


/* \u2500\u2500 \uAC80\uC0C9 \uACB0\uACFC(3.7) \u2500\u2500 */
.bmgj-search-count { margin: 20px 0 0; font-size: 14px; font-weight: 600; color: var(--text-sub); }
.bmgj-search-empty {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 12px;
  margin-top: 12px;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg-card);
  font-size: 14px;
  color: var(--text-sub);
}
.bmgj-search-empty p { margin: 0; }

/* \u2500\u2500 \uD478\uD130(3.6) \u2500\u2500 */
.bmgj-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0 8px;
  margin-top: var(--section-gap);
  font-size: 13px;
  color: var(--text-sub); /* \uB300\uBE44 4.5:1 \uD655\uBCF4 */
}
.bmgj-footer-link { display: inline-flex; align-items: center; min-height: 44px; text-decoration: none; color: var(--text-sub); }
.bmgj-footer-link:hover { text-decoration: underline; }

/* \u2500\u2500 \uB0B4 \uC815\uBCF4 \uB300\uD654\uC0C1\uC790(3.6) \u2500\u2500 */
.bmgj-info-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.bmgj-info-head .bmgj-dialog-title { margin-top: 0; }
.bmgj-icon-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 44px;
  margin: -6px -10px 0 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
}
.bmgj-info-current { display: flex; gap: 12px; margin: 24px 0 0; font-size: 15px; }
.bmgj-info-current dt { color: var(--text-sub); }
.bmgj-info-current dd { margin: 0; font-weight: 700; }
.bmgj-info-label { margin: 24px 0 8px; font-size: 15px; font-weight: 700; }
.bmgj-info-groups { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.bmgj-info-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }
.bmgj-btn {
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-surface);
  font: inherit;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}
.bmgj-btn:hover { background: var(--choice-bg); }
.bmgj-info-group[aria-pressed="true"] { background: var(--highlight-bg); border-color: var(--highlight-border); }
.bmgj-confirm { margin-top: 16px; padding: 16px; border-radius: 12px; background: var(--strip-bg); }
.bmgj-confirm-text { margin: 0 0 12px; font-size: 15px; }
.bmgj-confirm-actions { display: flex; gap: 8px; }


/* \u2500\u2500 \uC0C8 \uC804\uCCB4 \uBA54\uB274 \uCC3D(\uC0AC\uC6A9\uC790 \uACB0\uC815 2026-11-05) \u2500\u2500 */
.bmgj-search-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
  text-align: left;
  color: var(--text-muted);
  cursor: pointer;
}
.bmgj-allmenu {
  display: flex;
  flex-direction: column;
  height: min(720px, calc(100vh - 32px));
}
.bmgj-allmenu-search { width: 100%; margin-top: 16px; }
.bmgj-allmenu-scroll { flex: 1; min-height: 0; overflow-y: auto; margin-top: 8px; }
.bmgj-allmenu-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 176px 1fr;
  gap: 20px;
  margin-top: 20px;
}
.bmgj-allmenu-cats {
  margin: 0;
  padding: 0 4px 0 0;
  list-style: none;
  overflow-y: auto;
  border-right: 1px solid var(--border);
}
.bmgj-allmenu-cat {
  width: 100%;
  min-height: 44px;
  padding: 8px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  color: var(--text-sub);
  cursor: pointer;
  word-break: keep-all;
}
.bmgj-allmenu-cat:hover { background: var(--choice-bg); }
.bmgj-allmenu-cat[aria-pressed="true"] { background: var(--highlight-bg); color: var(--text); }
.bmgj-allmenu-list { min-height: 0; overflow-y: auto; padding: 0 4px 8px 0; }
.bmgj-allmenu-cat-title { margin: 4px 0 8px; font-size: 18px; font-weight: 700; }
.bmgj-allmenu-sec { padding: 8px 0; border-top: 1px solid var(--border); }
.bmgj-allmenu-sec-title {
  display: flex;
  align-items: center;
  min-height: 44px;
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: var(--text);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
a.bmgj-allmenu-sec-title:hover { text-decoration: underline; }
.bmgj-allmenu-items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 16px;
  margin: 0 0 4px;
  padding: 0;
  list-style: none;
}
.bmgj-allmenu-item {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 0 0 12px;
  font-size: 14px;
  text-decoration: none;
  color: var(--text-sub);
  word-break: keep-all;
  overflow-wrap: anywhere;
}
.bmgj-allmenu-item:hover { color: var(--text); text-decoration: underline; }
.bmgj-allmenu-results { margin: 8px 0 0; padding: 0; list-style: none; }
.bmgj-allmenu-results > li { border-top: 1px solid var(--border); }
.bmgj-allmenu-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  min-height: 56px;
  padding: 8px 4px;
  text-decoration: none;
  color: var(--text);
}
.bmgj-allmenu-result:hover .bmgj-allmenu-label { text-decoration: underline; }
.bmgj-allmenu-path { font-size: 12px; color: var(--text-muted); }
.bmgj-allmenu-label { font-size: 15px; font-weight: 600; word-break: keep-all; overflow-wrap: anywhere; }
.bmgj-allmenu-empty { margin: 16px 0 0; font-size: 14px; color: var(--text-sub); }

/* \u2500\u2500 \uB300\uD654\uC0C1\uC790\xB7\uC120\uD0DD\uCC3D(3.1) \u2500\u2500 */
.bmgj-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483600;
  display: grid;
  place-items: center;
  padding: 16px;
  overflow-y: auto;
  background: var(--overlay);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
.bmgj-dialog {
  width: 100%;
  max-width: 720px;
  padding: 40px;
  border-radius: 28px;
  background: var(--bg-surface);
  color: var(--text);
}
.bmgj-dialog:focus { outline: none; }
.bmgj-dialog-label { margin: 0; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-eyebrow); }
.bmgj-dialog-title { margin: 12px 0 8px; font-size: 32px; font-weight: 700; line-height: 1.3; }
.bmgj-dialog-desc { margin: 0; font-size: 15px; color: var(--text-sub); }
.bmgj-choices { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }
.bmgj-choice {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  min-height: 132px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--choice-bg);
  font: inherit;
  text-align: left;
  color: var(--text);
  cursor: pointer;
}
.bmgj-choice:hover,
.bmgj-choice:focus-visible { background: var(--choice-bg-hover); outline: 2px solid var(--focus); outline-offset: 3px; }
.bmgj-choice-title { font-size: 22px; font-weight: 700; }
.bmgj-choice-desc { font-size: 15px; color: var(--text-sub); }
.bmgj-dialog-note { margin: 24px 0 8px; font-size: 13px; color: var(--text-muted); }
.bmgj-link-btn {
  min-height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  color: var(--text-muted);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}


/* \u2500\u2500 \uB5A0 \uC788\uB294 \uB0B4 \uC815\uBCF4 \uCC3D(\uC0AC\uC6A9\uC790 \uACB0\uC815 2026-11-05) \u2500\u2500 */
.bmgj-floating {
  position: fixed;
  right: 24px;
  bottom: 80px;
  z-index: 2147483000;
  width: 360px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-surface);
  box-shadow: var(--panel-shadow);
  color: var(--text);
  animation: bmgj-float-in 0.15s ease-out;
}
.bmgj-floating .bmgj-dialog-title { font-size: 22px; margin: 0; }
.bmgj-floating .bmgj-info-current { margin-top: 16px; }
.bmgj-floating .bmgj-info-label { margin-top: 16px; }
.bmgj-floating .bmgj-info-actions { margin-top: 16px; padding-top: 16px; }
.bmgj-floating-msg { margin: 8px 0 0; font-size: 13px; color: var(--text-sub); }
.bmgj-floating-msg:empty { display: none; }
@keyframes bmgj-float-in { from { transform: translateY(8px); opacity: 0; } to { transform: none; opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .bmgj-floating { animation: none; } }

/* \u2500\u2500 \uC800\uC7A5 \uC2E4\uD328 \uC548\uB0B4(6\uC808) \u2500\u2500 */
.bmgj-toast-region {
  position: fixed;
  left: 50%;
  bottom: 84px;
  z-index: 2147483700;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100vw - 32px);
}
.bmgj-toast {
  padding: 12px 16px;
  border-radius: 10px;
  background: var(--text);
  font-size: 14px;
  color: var(--bg-surface);
}

/* \u2500\u2500 \uD070 \uD654\uBA74 1,200px \uBBF8\uB9CC: \uAC80\uC0C9\uCC3D\uC744 \uB458\uC9F8 \uC904\uB85C \u2500\u2500 */
@media (max-width: 1199px) {
  .bmgj-header {
    grid-template-columns: 1fr auto;
    grid-template-areas: "brand controls" "search search";
  }
  .bmgj-search { width: 100%; }
}

@media (max-width: 1279px) {
  .bmgj-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 1279px) {
  :host { --gutter: 24px; }
}

@media (max-width: 767px) {
  :host { --gutter: 16px; --section-gap: 20px; font-size: 16px; }
  .bmgj-float { right: 16px; bottom: 16px; }
  .bmgj-floating { right: 16px; left: 16px; bottom: 72px; width: auto; max-width: none; max-height: calc(100vh - 88px); }
  .bmgj-floating .bmgj-info-groups { grid-template-columns: 1fr; }

  .bmgj-header {
    grid-template-columns: 1fr;
    grid-template-areas: "brand" "controls" "search";
  }
  .bmgj-header-controls { flex-wrap: wrap; }

  .bmgj-hero { grid-template-columns: 1fr; padding: 24px; }
  .bmgj-hero-art { display: none; }
  .bmgj-hero-title { font-size: 28px; }
  .bmgj-hero-desc { font-size: 14px; }

  .bmgj-panel { padding: 24px; border-radius: 20px; }
  .bmgj-panel-head { flex-direction: column; }
  .bmgj-panel-title { font-size: 22px; }
  .bmgj-card-grid { grid-template-columns: 1fr; }
  .bmgj-card-title { font-size: 17px; }
  .bmgj-news-row { flex-wrap: wrap; row-gap: 4px; }
  .bmgj-news-title { flex-basis: calc(100% - 80px); }

  .bmgj-dialog { padding: 24px; border-radius: 22px; }
  .bmgj-dialog-title { font-size: 26px; }
  .bmgj-choices { grid-template-columns: 1fr; }
  .bmgj-choice-title { font-size: 20px; }
  .bmgj-info-groups { grid-template-columns: 1fr; }
  .bmgj-allmenu { height: calc(100vh - 32px); }
  .bmgj-allmenu-body { grid-template-columns: 1fr; grid-template-rows: auto 1fr; gap: 12px; }
  .bmgj-allmenu-cats { display: flex; gap: 4px; overflow-x: auto; overflow-y: visible; padding: 0 0 8px; border-right: 0; border-bottom: 1px solid var(--border); }
  .bmgj-allmenu-cat { width: auto; white-space: nowrap; }
  .bmgj-allmenu-items { grid-template-columns: 1fr; }
}

/* \u2500\u2500 \uB0B4 \uC815\uBCF4(0.4.8): \uD300 \uAD6C\uD604(bmgj-recruit-dday-update, v0.5.1)\uC758 \uC2A4\uD0C0\uC77C\uC744 \uADF8\uB300\uB85C \uC62E\uAE40 \u2500\u2500 */
.bmgj-edge-trigger {
  position: fixed !important;
  z-index: 2147482999 !important;
  top: 13vh !important;
  right: 0 !important;
  width: 18px !important;
  height: 70vh !important;
  min-height: 140px !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  pointer-events: auto !important;
}
.bmgj-edge-mark {
  display: block !important;
  width: 6px !important;
  height: 76px !important;
  border-radius: 18px 0 0 18px !important;
  background: #9bc6b3 !important;
  box-shadow: -3px 0 14px rgba(28, 88, 63, 0.16) !important;
  opacity: 0.75 !important;
  transition:
    width 0.22s ease,
    background 0.22s ease,
    opacity 0.22s ease !important;
}
.bmgj-edge-trigger:hover .bmgj-edge-mark,
.bmgj-edge-trigger:focus-visible .bmgj-edge-mark {
  width: 10px !important;
  background: #266d54 !important;
  opacity: 1 !important;
}
.bmgj-edge-trigger:focus-visible {
  outline: 3px solid #298773 !important;
  outline-offset: -3px !important;
}
.bmgj-drawer-wrap {
  position: relative;
  z-index: 2147483000;
}
.bmgj-floating {
  top: 24px !important;
  right: 18px !important;
  bottom: auto !important;
  width: 356px !important;
  max-width: calc(100vw - 36px) !important;
  max-height: calc(100vh - 102px) !important;
  padding: 26px !important;
  border-radius: 28px !important;
  border: 1px solid rgba(190, 214, 199, 0.85) !important;
  background: #fff !important;
  box-shadow:
    0 24px 75px rgba(18, 60, 44, 0.18),
    0 6px 20px rgba(18, 60, 44, 0.08) !important;
  animation: bmgj-rounded-drawer-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) both !important;
  scrollbar-width: thin;
}
.bmgj-floating .bmgj-dialog-title {
  font-size: 23px !important;
  letter-spacing: -0.5px;
}
.bmgj-floating .bmgj-info-head {
  align-items: center !important;
}
.bmgj-floating .bmgj-icon-btn {
  border-radius: 50% !important;
  background: #f0f6f1 !important;
  margin: 0 !important;
}
.bmgj-floating .bmgj-icon-btn:hover {
  background: #e2eee5 !important;
}
.bmgj-floating .bmgj-info-current {
  background: #f5f9f5 !important;
  padding: 15px 16px !important;
  border-radius: 18px !important;
  display: flex;
  flex-wrap: wrap;
}
.bmgj-floating .bmgj-info-groups {
  gap: 10px !important;
}
.bmgj-floating .bmgj-info-groups button,
.bmgj-floating .bmgj-info-actions button,
.bmgj-floating .bmgj-confirm-actions button {
  border-radius: 14px !important;
}
.bmgj-floating .bmgj-info-actions {
  border-color: #e3eee6 !important;
}
.bmgj-floating .bmgj-dialog-desc {
  line-height: 1.55 !important;
}
@keyframes bmgj-rounded-drawer-in {
  from {
    transform: translateX(28px) scale(0.985);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}
@media (max-width: 480px) {
  .bmgj-floating {
    top: 12px !important;
    right: 10px !important;
    width: calc(100vw - 20px) !important;
    max-width: calc(100vw - 20px) !important;
    max-height: calc(100vh - 86px) !important;
    padding: 20px !important;
    border-radius: 24px !important;
  }
}
@media (prefers-reduced-motion: reduce) {
  .bmgj-floating {
    animation: none !important;
  }
  .bmgj-edge-mark {
    transition: none !important;
  }
}
.bmgj-floating {
  top: 14px !important;
  right: 14px !important;
  bottom: 14px !important;
  width: 400px !important;
  max-width: calc(100vw - 28px) !important;
  height: calc(100vh - 28px) !important;
  height: calc(100dvh - 28px) !important;
  max-height: none !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  overflow-y: auto !important;
  overscroll-behavior: contain !important;
  padding: 30px 28px !important;
  border-radius: 30px !important;
}
.bmgj-floating .bmgj-info-actions {
  margin-top: auto !important;
  padding-top: 24px !important;
}
.bmgj-floating .bmgj-info-groups {
  margin-bottom: 20px !important;
}
.bmgj-floating .bmgj-confirm {
  flex-shrink: 0 !important;
}
.bmgj-floating .bmgj-info-head,
.bmgj-floating .bmgj-dialog-desc,
.bmgj-floating .bmgj-info-current,
.bmgj-floating .bmgj-info-label,
.bmgj-floating .bmgj-info-groups {
  flex-shrink: 0 !important;
}
@media (max-width: 480px) {
  .bmgj-floating {
    top: 8px !important;
    right: 8px !important;
    bottom: 8px !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    height: calc(100dvh - 16px) !important;
    max-height: none !important;
    padding: 24px 20px !important;
    border-radius: 25px !important;
  }
}
@media (max-height: 540px) {
  .bmgj-floating {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }
  .bmgj-floating .bmgj-info-actions {
    margin-top: 16px !important;
  }
}
.bmgj-floating.bmgj-profile-drawer {
  width: 448px !important;
  max-width: calc(100vw - 28px) !important;
  padding: 0 !important;
  overflow: hidden !important;
  border-radius: 30px !important;
  display: flex !important;
  flex-direction: column !important;
  color: #203d33 !important;
  font-family: inherit !important;
}
.bmgj-profile-header {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 26px 27px 20px;
  border-bottom: 1px solid #e7eee9;
  background: linear-gradient(120deg, #fff, #f7fbf8);
}
.bmgj-profile-eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 750;
  color: #528a70;
  letter-spacing: 0.05em;
}
.bmgj-profile-header h2 {
  margin: 0;
  font-size: 27px;
  line-height: 1.3;
  letter-spacing: -0.8px;
  color: #193a2f;
}
.bmgj-profile-subtitle {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: #687c73;
}
.bmgj-profile-close {
  flex-shrink: 0;
  border: 0;
  background: #eef5f0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font: inherit;
  font-size: 29px;
  line-height: 1;
  color: #23483b;
  cursor: pointer;
}
.bmgj-profile-close:hover {
  background: #dcebe1;
}
.bmgj-profile-scroller {
  flex: 1;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding: 24px 24px 30px;
  scrollbar-width: thin;
}
.bmgj-profile-login {
  padding: 18px 17px;
  border-radius: 20px;
  background: #edf7f0;
  border: 1px solid #cfe5d7;
}
.bmgj-profile-login strong {
  font-size: 16px;
  font-weight: 750;
  color: #184b36;
}
.bmgj-profile-login p {
  font-size: 13px;
  line-height: 1.55;
  margin: 7px 0 0;
  color: #4d6a5c;
}
.bmgj-profile-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 14px;
  background: #246e50;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  margin-top: 14px;
}
.bmgj-profile-login-button:hover {
  background: #175c40;
  color: #fff;
}
.bmgj-profile-login p.bmgj-profile-login-note {
  font-size: 12px;
  color: #5c7668;
  margin-top: 11px;
}
.bmgj-profile-loading {
  padding: 25px 0;
  color: #63796e;
}
.bmgj-profile-form,
.bmgj-profile-summary {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 26px;
}
.bmgj-profile-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0 0 2px;
}
.bmgj-profile-section-heading h3 {
  margin: 0;
  color: #203d33;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 750;
}
.bmgj-profile-section-heading span {
  font-size: 12px;
  color: #6b8273;
}
.bmgj-profile-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #2c4e41;
}
.bmgj-profile-field-name {
  font-size: 13px;
  font-weight: 700;
  color: #415f53;
}
.bmgj-profile-input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: none;
  min-height: 45px;
  border: 1px solid #d8e5dc !important;
  border-radius: 13px !important;
  background: #fff !important;
  box-shadow: none !important;
  color: #203d33 !important;
  padding: 11px 13px !important;
  font: inherit !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}
.bmgj-profile-input:focus {
  outline: 2px solid #79b496 !important;
  outline-offset: 1px !important;
}
textarea.bmgj-profile-input {
  min-height: 82px;
  resize: vertical;
}
.bmgj-profile-form-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin: 10px 0 0;
}
.bmgj-profile-primary,
.bmgj-profile-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 45px;
  border-radius: 13px !important;
  padding: 11px 16px;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
}
.bmgj-profile-primary {
  border: 1px solid #286c50;
  color: #fff;
  background: #286c50;
}
.bmgj-profile-primary:hover {
  background: #1a533c;
}
.bmgj-profile-primary:disabled,
.bmgj-profile-secondary:disabled {
  opacity: 0.65;
  cursor: wait;
}
.bmgj-profile-secondary {
  border: 1px solid #d6e3da;
  background: #fff;
  color: #2f5545;
}
.bmgj-profile-secondary:hover {
  background: #f0f7f2;
}
.bmgj-profile-values {
  margin: 0;
  display: grid;
  gap: 11px;
}
.bmgj-profile-value {
  padding: 13px 15px;
  border-radius: 15px;
  background: #f6f9f6;
  border: 1px solid #ecf1ec;
}
.bmgj-profile-value dt {
  font-size: 12px;
  margin-bottom: 6px;
  color: #697f72;
}
.bmgj-profile-value dd {
  margin: 0;
  font-size: 15px;
  color: #244637;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-weight: 650;
}
.bmgj-profile-text-button {
  min-height: 40px;
  border: 0;
  background: transparent;
  color: #286c50;
  text-decoration: underline;
  text-underline-offset: 3px;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.bmgj-profile-delete {
  margin-top: 4px;
}
.bmgj-profile-deadline {
  margin-top: 26px;
  border: 1px dashed #cdded3;
  background: #f8fbf8;
  border-radius: 18px;
  padding: 17px;
}
.bmgj-profile-deadline p {
  margin: 10px 0 0;
  color: #6b8174;
  font-size: 13px;
  line-height: 1.6;
}
.bmgj-profile-settings {
  margin-top: 22px;
  border-radius: 17px;
  border: 1px solid #e0e9e2;
  background: #fff;
  padding: 14px 16px;
}
.bmgj-profile-settings summary {
  cursor: pointer;
  font-weight: 750;
  font-size: 15px;
  color: #254737;
  padding: 4px 0;
}
.bmgj-profile-settings p {
  font-size: 13px;
  color: #607669;
}
.bmgj-profile-group-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin: 12px 0;
}
.bmgj-profile-group-buttons button {
  font: inherit;
  font-size: 12px;
  font-weight: 650;
  padding: 10px 6px;
  border-radius: 10px;
  border: 1px solid #dee8e0;
  background: #fff;
  color: #3d604f;
  cursor: pointer;
}
.bmgj-profile-group-buttons button[aria-pressed="true"] {
  background: #e4f4e9;
  border-color: #85bd9c;
}
.bmgj-profile-settings > .bmgj-profile-secondary {
  width: 100%;
  margin-top: 4px;
}
.bmgj-profile-settings > .bmgj-profile-text-button {
  display: block;
  margin-top: 5px;
}
.bmgj-profile-confirm {
  padding: 12px;
  border-radius: 12px;
  background: #f5f8f5;
  border: 1px solid #dce6dc;
  margin: 12px 0;
}
.bmgj-profile-confirm p {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 1.5;
}
.bmgj-profile-confirm > div {
  display: flex;
  gap: 8px;
}
.bmgj-profile-confirm button {
  min-height: 36px;
  border-radius: 10px;
  border: 1px solid #cdded3;
  background: #fff;
  color: #27523f;
  font: inherit;
  font-size: 13px;
  padding: 8px 13px;
  cursor: pointer;
}
.bmgj-profile-privacy {
  font-size: 12px;
  color: #748679;
  line-height: 1.65;
  margin: 20px 0 0;
}
.bmgj-profile-footer {
  display: flex;
  align-items: center;
  min-height: 55px;
  padding: 12px 25px;
  background: #fff;
  border-top: 1px solid #e5ede6;
  flex-shrink: 0;
  font-size: 12px;
  color: #527b61;
  line-height: 1.5;
}
.bmgj-profile-footer span {
  display: block;
}
.bmgj-profile-drawer button:focus-visible,
.bmgj-profile-drawer a:focus-visible,
.bmgj-profile-drawer summary:focus-visible {
  outline: 2px solid #4b9c71;
  outline-offset: 2px;
}
@media (max-width: 480px) {
  .bmgj-floating.bmgj-profile-drawer {
    top: 8px !important;
    right: 8px !important;
    bottom: 8px !important;
    width: calc(100vw - 16px) !important;
    height: calc(100dvh - 16px) !important;
    border-radius: 23px !important;
  }
  .bmgj-profile-header {
    padding: 20px 18px 16px;
  }
  .bmgj-profile-scroller {
    padding: 18px 16px 24px;
  }
  .bmgj-profile-header h2 {
    font-size: 24px;
  }
  .bmgj-profile-footer {
    padding: 10px 18px;
  }
}
.bmgj-role-setup {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px 20px;
  border-radius: 25px;
  background: linear-gradient(145deg, #f5fbf6 0%, #eaf7ee 100%);
  border: 1px solid #cde5d4;
  box-shadow: 0 10px 28px rgba(26, 84, 49, 0.07);
}
.bmgj-role-eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.05em;
  font-weight: 800;
  color: #27734b;
}
.bmgj-role-setup h3 {
  margin: 1px 0;
  font-size: 23px;
  line-height: 1.45;
  color: #193d2c;
  word-break: keep-all;
}
.bmgj-role-help {
  margin: 0 0 5px;
  font-size: 13px;
  line-height: 1.7;
  color: #587363;
}
.bmgj-role-setup .bmgj-profile-field {
  margin: 2px 0;
}
.bmgj-role-setup .bmgj-profile-input {
  border-radius: 15px;
  min-height: 48px;
}
.bmgj-role-setup .bmgj-profile-primary {
  border-radius: 15px;
  min-height: 47px;
  margin-top: 6px;
}
.bmgj-role-setup .bmgj-profile-secondary {
  border-radius: 15px;
}
.bmgj-role-hint {
  font-size: 12px;
  color: #547c62;
  line-height: 1.65;
}
.bmgj-role-hint span {
  display: inline;
}
.bmgj-role-deadline {
  margin: 0 0 20px;
  border-style: solid;
  border-color: #bfdfc7;
  border-radius: 23px;
  padding: 19px;
  background: linear-gradient(125deg, #f0faef 0%, #f8fcf6 58%, #fff 100%);
}
.bmgj-role-prototype-badge {
  display: inline-flex;
  align-items: center;
  border-radius: 99px;
  background: #f0eddf;
  color: #806e36;
  font-size: 11px;
  padding: 5px 9px;
  white-space: nowrap;
  font-weight: 700;
}
.bmgj-role-overview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 14px 0 8px;
}
.bmgj-role-overview > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.bmgj-role-label {
  font-size: 12px;
  color: #547360;
}
.bmgj-role-name {
  font-size: 23px;
  color: #1b5034;
  line-height: 1.25;
  word-break: keep-all;
}
.bmgj-role-date {
  font-size: 12px;
  color: #5f7b67;
}
.bmgj-role-days {
  font-weight: 850;
  font-size: 36px;
  color: #166b46;
  letter-spacing: -0.03em;
  white-space: nowrap;
}
.bmgj-role-deadline-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #4f755e;
}
.bmgj-role-deadline-foot .bmgj-profile-text-button {
  margin: 0;
  min-height: 34px;
  font-size: 12px;
}
.bmgj-role-disclaimer {
  color: #8b6a3a !important;
  font-size: 12px !important;
  margin-top: 8px !important;
}
.bmgj-profile-sync-note {
  border-radius: 11px;
  background: #edf7ef;
  color: #276847 !important;
  padding: 8px 10px;
  margin-top: 10px !important;
  font-size: 11px !important;
}

.bmgj-recruit-official {
  background: #e6f4e8 !important;
  color: #236b44 !important;
}
.bmgj-recruit-next {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 16px 0 10px;
  padding: 13px 15px;
  border-radius: 17px;
  background: #fff;
  border: 1px solid #d7e9d9;
}
.bmgj-recruit-next strong {
  font-size: 14px;
  line-height: 1.6;
  color: #294d36;
  overflow-wrap: anywhere;
}
.bmgj-recruit-next p {
  margin: 0;
  font-size: 12px;
  color: #527460;
}
.bmgj-recruit-next a,
.bmgj-recruit-index-link {
  font-size: 12px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: #206947;
  margin-top: 6px;
}
.bmgj-recruit-status {
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  background: #dbf1dc;
  color: #1c7447;
  padding: 4px 8px;
}
.bmgj-recruit-empty {
  margin: 12px 0;
  padding: 14px;
  border-radius: 15px;
  background: #fff;
  border: 1px solid #d9e9df;
}
.bmgj-recruit-empty strong {
  font-size: 13px;
  color: #315944;
}
.bmgj-recruit-empty p {
  font-size: 12px;
  color: #667a70;
  line-height: 1.6;
  margin: 8px 0 0;
}
.bmgj-recruit-waiting {
  font-size: 16px;
  color: #6d8377;
  white-space: nowrap;
}
.bmgj-recruit-upcoming {
  margin: 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.bmgj-recruit-upcoming h4 {
  margin: 0 0 4px;
  font-size: 13px;
  color: #244e36;
}
.bmgj-recruit-row {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 11px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #d8e9db;
  text-decoration: none;
  color: #315944;
}
.bmgj-recruit-row-month {
  font-size: 11px;
  color: #40855a;
}
.bmgj-recruit-row strong {
  font-size: 12px;
  overflow-wrap: anywhere;
}
.bmgj-recruit-row small {
  font-size: 11px;
  color: #667f70;
}
.bmgj-recruit-checked {
  margin: 9px 0 0;
  font-size: 11px;
  color: #678575;
}
.bmgj-recruit-error {
  font-size: 12px;
  color: #a24d27;
  margin: 8px 0;
}
.bmgj-recruit-index-link {
  display: inline-block;
  margin-top: 10px;
}
@media (max-width: 480px) {
  .bmgj-role-setup {
    padding: 18px;
  }
  .bmgj-role-setup h3 {
    font-size: 20px;
  }
  .bmgj-role-days {
    font-size: 30px;
  }
  .bmgj-role-deadline {
    padding: 15px;
  }
  .bmgj-role-overview {
    gap: 7px;
  }
}
`;var Da=A(B(),1);function aL(){return location.pathname==="/"||location.pathname==="/index.do"}function Ss(e){let t=e.shadowRoot??e.attachShadow({mode:"open"});t.replaceChildren();let a=document.createElement("style");a.textContent=sm;let r=document.createElement("div");return t.append(a,r),(0,fm.createRoot)(r)}function rL(){let e=document.getElementById(ia);e||(e=document.createElement("div"),e.id=ia,document.body.append(e)),ma=Ss(e),ma.render((0,Da.jsx)(zo,{children:(0,Da.jsx)(Cr,{isMainPage:!1})}))}var ma=null;function cm(e){console.error("[bmgj] render failed",e);try{ma?.unmount()}catch{}ma=null,Sp(),yn(),Nn()}var zo=class extends dm.Component{constructor(){super(...arguments);this.state={failed:!1}}static getDerivedStateFromError(){return{failed:!0}}componentDidCatch(a){queueMicrotask(()=>cm(a))}render(){return this.state.failed?null:this.props.children}};function oL(){if(document.getElementById("bmgj-font"))return;let e=document.createElement("style");e.id="bmgj-font";let t=chrome.runtime.getURL("fonts/PretendardGOV-Medium.subset.woff2");e.textContent=`@font-face{font-family:"Pretendard GOV";src:url("${t}") format("woff2");font-display:swap;}`,(document.head??document.documentElement).append(e)}async function lL(){let e=Yp();if(!e)return;nm(e);let t=ss(is,Ln,cp);if(!t.ok){console.error("[bmgj] portal catalog invalid",t.errors);return}oL();let a=em(),r=await mr(),o=document.getElementById(ia);o||(o=document.createElement("div"),o.id=ia,e.insertAdjacentElement("beforebegin",o)),o.classList.add("bmgj-theme-portal"),ma=Ss(o),ma.render((0,Da.jsx)(zo,{children:(0,Da.jsx)(om,{frame:e,initialPrefs:r,menu:a})}))}async function nL(){if(location.hostname==="mwpt.mma.go.kr"){if(im(),window.top!==window)return;await lL();return}if(window.top!==window)return;if(!aL()){rL();return}let e=ss(us,hn);if(!e.ok){console.error("[bmgj] catalog invalid",e.errors);return}let t=Cp();if(!t){console.error("[bmgj] DOM not found");return}let a=hp(),r=mp(),o=await mr();ma=Ss(wp(t.header)),ma.render((0,Da.jsx)(zo,{children:(0,Da.jsx)(Kp,{dom:t,initialPrefs:o,news:a,allMenu:r})}))}nL().catch(cm);})();
