// Make sure we load this script only once per page
if(typeof PUBLITWEET_LOADED=='undefined') {

    /* map fix for IE -- see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map (Compatibility section) */
    if (!Array.prototype.map)
    {
	Array.prototype.map = function(fun /*, thisp */)
	{
	    "use strict";

	    if (this === void 0 || this === null)
		throw new TypeError();

	    var t = Object(this);
	    var len = t.length >>> 0;
	    if (typeof fun !== "function")
		throw new TypeError();

	    var res = new Array(len);
	    var thisp = arguments[1];
	    for (var i = 0; i < len; i++)
	    {
		if (i in t)
		    res[i] = fun.call(thisp, t[i], i, t);
	    }

	    return res;
	};
    }

//if (typeof jQuery == 'undefined')
//{
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);//}

$.noConflict();

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Copyright (c) 20010 Janis Skarnelis
 * Examples and documentation at: http://fancybox.net
 *
 * Version: 1.3.0 (02/02/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function(b){function H(){v.hide();r.onerror=r.onload=null;F&&F.abort();l.empty()}function Q(){b.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>',{scrolling:"no",padding:20,transitionIn:"none",transitionOut:"none"})}function B(){H();var a=q[s];e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));var d,f,o=a.title||b(a).title||e.title||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?
b(a).children("img:first"):b(a);if(o==""&&e.orig)o=e.orig.attr("alt");d=a.nodeName&&/^(?:javascript|#)/i.test(a.href)?e.href||null:e.href||a.href||null;if(e.type){f=e.type;if(!d)d=e.content}else if(e.content)f="html";else if(d)if(d.match(I))f="image";else if(d.match(T))f="swf";else if(b(a).hasClass("iframe"))f="iframe";else if(d.match(/#/)){a=d.substr(d.indexOf("#"));f=b(a).length>0?"inline":"ajax"}else f="ajax";else f="inline";e.type=f;e.href=d;e.title=o;if(e.autoDimensions&&e.type!=="iframe"&&e.type!==
"swf"){e.width="auto";e.height="auto"}if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=false;e.enableEscapeButton=false;e.showCloseButton=false}if(b.isFunction(e.onStart))if(e.onStart(q,s,e)===false){h=false;return}l.css("padding",t+e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(i.children())});switch(f){case "html":l.html(e.content);G();break;case "inline":b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",
function(){b(this).replaceWith(i.children())}).bind("fancybox-cancel",function(){b(this).replaceWith(l.children())});b(a).appendTo(l);G();break;case "image":h=false;b.fancybox.showActivity();r=new Image;r.onerror=function(){Q()};r.onload=function(){r.onerror=null;r.onload=null;U()};r.src=d;break;case "swf":var u="",w="";u+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+d+'"></param>';b.each(e.swf,function(p,R){u+=
'<param name="'+p+'" value="'+R+'"></param>';w+=" "+p+'="'+R+'"'});u+='<embed src="'+d+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+w+"></embed></object>";l.html(u);G();break;case "ajax":a=d.split("#",2);f=e.ajax.data||{};if(a.length>1){d=a[0];typeof f=="string"?(f+="&selector="+a[1]):(f.selector=a[1])}h=false;b.fancybox.showActivity();F=b.ajax(b.extend(e.ajax,{url:d,data:f,error:Q,success:function(p){if(F.status==200){l.html(p);G()}}}));break;case "iframe":b('<iframe id="fancybox-frame" name="fancybox-frame'+
(new Date).getTime()+'" frameborder="0" hspace="0" scrolling="'+e.scrolling+'" src="'+e.href+'"></iframe>').appendTo(l);J();break}}function U(){h=true;e.width=r.width;e.height=r.height;b("<img />").attr({id:"fancybox-img",src:r.src,alt:e.title}).appendTo(l);J()}function G(){l.width(e.width);l.height(e.height);if(e.width=="auto")e.width=l.width();if(e.height=="auto")e.height=l.height();J()}function J(){v.hide();if(g.is(":visible")&&b.isFunction(c.onCleanup))if(c.onCleanup(j,n,c)===false){b.event.trigger("fancybox-cancel");
h=false;return}j=q;n=s;c=e;i.get(0).scrollTop=0;i.get(0).scrollLeft=0;if(c.overlayShow){K&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});y.css({"background-color":c.overlayColor,opacity:c.overlayOpacity}).unbind().show()}m=V();W();if(g.is(":visible")){b(z.add(C).add(D)).hide();var a=g.position();k={top:a.top,left:a.left,width:g.width(),height:g.height()};
var d=k.width==m.width&&k.height==m.height;i.fadeOut(c.changeFade,function(){function f(){i.html(l.contents()).fadeIn(c.changeFade,L)}b.event.trigger("fancybox-change");i.css({top:c.padding,left:c.padding,width:Math.max(k.width-c.padding*2,1),height:Math.max(k.height-c.padding*2,1)}).empty().css("overflow","hidden");A.prop=0;b(A).animate({prop:1},{duration:d?0:c.changeSpeed,easing:c.easingChange,step:M,complete:f})})}else{g.css("opacity",1);if(c.transitionIn=="elastic"){k=S();i.css({top:c.padding,
left:c.padding,width:Math.max(k.width-c.padding*2,1),height:Math.max(k.height-c.padding*2,1)}).html(l.contents());g.css(k).show();if(c.opacity)m.opacity=0;A.prop=0;b(A).animate({prop:1},{duration:c.speedIn,easing:c.easingIn,step:M,complete:L})}else{i.css({top:c.padding,left:c.padding,width:Math.max(m.width-c.padding*2,1),height:Math.max(m.height-c.padding*2-x,1)}).html(l.contents());g.css(m).fadeIn(c.transitionIn=="none"?0:c.speedIn,L)}}}function M(a){var d=Math.round(k.width+(m.width-k.width)*a),
f=Math.round(k.height+(m.height-k.height)*a),o=Math.round(k.top+(m.top-k.top)*a),u=Math.round(k.left+(m.left-k.left)*a);g.css({width:d+"px",height:f+"px",top:o+"px",left:u+"px"});d=Math.max(d-c.padding*2,0);f=Math.max(f-(c.padding*2+x*a),0);i.css({width:d+"px",height:f+"px"});if(typeof m.opacity!=="undefined")g.css("opacity",a<0.5?0.5:a)}function L(){i.css("overflow",overflow=c.scrolling=="auto"?c.type=="image"||c.type=="iframe"||c.type=="swf"?"hidden":"auto":c.scrolling=="yes"?"auto":"visible");
if(!b.support.opacity){i.get(0).style.removeAttribute("filter");g.get(0).style.removeAttribute("filter")}b("#fancybox-title").show();c.hideOnContentClick&&i.one("click",b.fancybox.close);c.hideOnOverlayClick&&y.one("click",b.fancybox.close);c.showCloseButton&&z.show();X();b(window).bind("resize.fb",b.fancybox.center);c.centerOnScroll?b(window).bind("scroll.fb",b.fancybox.center):b(window).unbind("scroll.fb");b.isFunction(c.onComplete)&&c.onComplete(j,n,c);h=false;Y()}function V(){var a=N(),d={},f=
c.margin,o=c.autoScale,u=(t+f)*2,w=(t+f)*2,p=c.padding*2;if(c.width.toString().indexOf("%")>-1){d.width=a[0]*parseFloat(c.width)/100-t*2;o=false}else d.width=c.width+p;if(c.height.toString().indexOf("%")>-1){d.height=a[1]*parseFloat(c.height)/100-t*2;o=false}else d.height=c.height+p;if(o&&(d.width>a[0]-u||d.height>a[1]-w))if(e.type=="image"||e.type=="swf"){u+=p;w+=p;o=Math.min(Math.min(a[0]-u,c.width)/c.width,Math.min(a[1]-w,c.height)/c.height);d.width=Math.round(o*(d.width-p))+p;d.height=Math.round(o*
(d.height-p))+p}else{d.width=Math.min(d.width,a[0]-u);d.height=Math.min(d.height,a[1]-w)}d.top=a[3]+(a[1]-(d.height+t*2))*0.5;d.left=a[2]+(a[0]-(d.width+t*2))*0.5;if(c.autoScale==false){d.top=Math.max(a[3]+f,d.top);d.left=Math.max(a[2]+f,d.left)}return d}function S(){var a=e.orig?b(e.orig):false,d={};if(a&&a.length){a=Z(a);d={width:a.width+c.padding*2,height:a.height+c.padding*2,top:a.top-c.padding-t,left:a.left-c.padding-t}}else{a=N();d={width:1,height:1,top:a[3]+a[1]*0.5,left:a[2]+a[0]*0.5}}return d}
function X(){b(document).unbind("keydown.fb").bind("keydown.fb",function(a){if(a.keyCode==27&&c.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if(a.keyCode==37){a.preventDefault();b.fancybox.prev()}else if(a.keyCode==39){a.preventDefault();b.fancybox.next()}});if(b.fn.mousewheel){g.unbind("mousewheel.fb");j.length>1&&g.bind("mousewheel.fb",function(a,d){a.preventDefault();h||d==0||(d>0?b.fancybox.prev():b.fancybox.next())})}if(c.showNavArrows){if(c.cyclic&&j.length>1||n!=0)C.show();
if(c.cyclic&&j.length>1||n!=j.length-1)D.show()}}function Y(){if(j.length-1>n){var a=j[n+1].href;if(typeof a!=="undefined"&&a.match(I)){var d=new Image;d.src=a}}if(n>0){a=j[n-1].href;if(typeof a!=="undefined"&&a.match(I)){d=new Image;d.src=a}}}function $(){if(v.is(":visible")){b("div",v).css("top",O*-40+"px");O=(O+1)%12}else clearInterval(P)}function N(){return[b(window).width(),b(window).height(),b(document).scrollLeft(),b(document).scrollTop()]}function Z(a){var d=a.offset();d.top+=parseFloat(a.css("paddingTop"))||
0;d.left+=parseFloat(a.css("paddingLeft"))||0;d.top+=parseFloat(a.css("border-top-width"))||0;d.left+=parseFloat(a.css("border-left-width"))||0;d.width=a.width();d.height=a.height();return d}function W(){b("#fancybox-title").remove();x=0;if(c.titleShow!=false){var a=c.title;a=b.isFunction(c.titleFormat)?c.titleFormat(a,j,n,c):aa(a);if(!(!a||a=="")){var d=m.width-c.padding*2;b('<div id="fancybox-title" class="'+("fancybox-title-"+c.titlePosition)+'" />').css({width:d,paddingLeft:c.padding,paddingRight:c.padding}).html(a).appendTo("body");
switch(c.titlePosition){case "inside":x=b("#fancybox-title").outerHeight(true)-c.padding;m.height+=x;break;case "over":b("#fancybox-title").css("bottom",c.padding);break;default:b("#fancybox-title").css("bottom",b("#fancybox-title").outerHeight(true)*-1);break}b("#fancybox-title").appendTo(E).hide();K&&b("#fancybox-title span").fixPNG()}}}function aa(a){if(a&&a.length)switch(c.titlePosition){case "inside":return a;case "over":return'<span id="fancybox-title-over">'+a+"</span>";default:return'<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">'+
a+'</span><span id="fancybox-title-right"></span></span>'}return false}function ba(){if(!b("#fancybox-wrap").length){b("body").append(l=b('<div id="fancybox-tmp"></div>'),v=b('<div id="fancybox-loading"><div></div></div>'),y=b('<div id="fancybox-overlay"></div>'),g=b('<div id="fancybox-wrap"></div>'));E=b('<div id="fancybox-outer"></div>').append('<div class="fancy-bg" id="fancy-bg-n"></div><div class="fancy-bg" id="fancy-bg-ne"></div><div class="fancy-bg" id="fancy-bg-e"></div><div class="fancy-bg" id="fancy-bg-se"></div><div class="fancy-bg" id="fancy-bg-s"></div><div class="fancy-bg" id="fancy-bg-sw"></div><div class="fancy-bg" id="fancy-bg-w"></div><div class="fancy-bg" id="fancy-bg-nw"></div>').appendTo(g);
E.append(i=b('<div id="fancybox-inner"></div>'),z=b('<a id="fancybox-close"></a>'),C=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),D=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));z.click(b.fancybox.close);v.click(b.fancybox.cancel);C.click(function(a){a.preventDefault();b.fancybox.prev()});D.click(function(a){a.preventDefault();b.fancybox.next()});b.support.opacity||E.find(".fancy-bg").fixPNG();
if(K){b(z.add(".fancy-ico").add("div",v)).fixPNG();y.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");v.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");E.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>')}}}
var l,v,y,g,E,i,z,C,D,s=0,e={},q=[],n=0,c={},j=[],F=null,r=new Image,I=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,T=/[^\.]\.(swf)\s*$/i,P,O=1,k,m,h=false,t=20,A=b.extend(b("<div/>")[0],{prop:0}),x=0,K=!b.support.opacity&&!window.XMLHttpRequest;b.fn.fixPNG=function(){return this.each(function(){var a=b(this).css("backgroundImage");if(a.match(/^url\(["']?(.*\.png)["']?\)$/i)){a=RegExp.$1;b(this).css({backgroundImage:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod="+
(b(this).css("backgroundRepeat")=="no-repeat"?"crop":"scale")+", src='"+a+"')"}).each(function(){var d=b(this).css("position");d!="absolute"&&d!="relative"&&b(this).css("position","relative")}).css("zoom",1)}})};b.fn.fancybox=function(a){b(this).data("fancybox",b.extend({},a));b(this).unbind("click.fb").bind("click.fb",function(d){d.preventDefault();if(!h){h=true;b(this).blur();q=[];s=0;d=b(this).attr("rel")||"";if(!d||d==""||d==="nofollow")q.push(this);else{q=b("a[rel="+d+"], area[rel="+d+"]");s=
q.index(this)}B();return false}});return this};b.fancybox=function(a,d){if(!h){h=true;q=[];s=0;if(b.isArray(a)){for(var f=0,o=a.length;f<o;f++)if(typeof a[f]=="object")b(a[f]).data("fancybox",b.extend({},d,a[f]));else a[f]=b({}).data("fancybox",b.extend({content:a[f]},d));q=jQuery.merge(q,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},d,a));else a=b({}).data("fancybox",b.extend({content:a},d));q.push(a)}B()}};b.fancybox.showActivity=function(){clearInterval(P);v.show();P=setInterval($,
66)};b.fancybox.hideActivity=function(){v.hide()};b.fancybox.next=function(){return b.fancybox.pos(n+1)};b.fancybox.prev=function(){return b.fancybox.pos(n-1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a);if(a>-1&&j.length>a){s=a;B()}if(c.cyclic&&j.length>1&&a<0){s=j.length-1;B()}if(c.cyclic&&j.length>1&&a>=j.length){s=0;B()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");H();e&&b.isFunction(e.onCancel)&&e.onCancel(q,s,e);h=false}};b.fancybox.close=function(){function a(){y.fadeOut("fast");
g.hide();b.event.trigger("fancybox-cleanup");i.empty();b.isFunction(c.onClosed)&&c.onClosed(j,n,c);j=e=[];n=s=0;c=e={};h=false}if(!(h||g.is(":hidden"))){h=true;if(c&&b.isFunction(c.onCleanup))if(c.onCleanup(j,n,c)===false){h=false;return}H();b(z.add(C).add(D)).hide();b("#fancybox-title").remove();g.add(i).add(y).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");i.css("overflow","hidden");if(c.transitionOut=="elastic"){k=S();var d=g.position();m={top:d.top,left:d.left,
width:g.width(),height:g.height()};if(c.opacity)m.opacity=1;A.prop=1;b(A).animate({prop:0},{duration:c.speedOut,easing:c.easingOut,step:M,complete:a})}else g.fadeOut(c.transitionOut=="none"?0:c.speedOut,a)}};b.fancybox.resize=function(){if(!(h||g.is(":hidden"))){h=true;var a=i.wrapInner("<div style='overflow:auto'></div>").children(),d=a.height();g.css({height:d+c.padding*2+x});i.css({height:d});a.replaceWith(a.children());b.fancybox.center()}};b.fancybox.center=function(){h=true;var a=N(),d=c.margin,
f={};f.top=a[3]+(a[1]-(g.height()-x+t*2))*0.5;f.left=a[2]+(a[0]-(g.width()+t*2))*0.5;f.top=Math.max(a[3]+d,f.top);f.left=Math.max(a[2]+d,f.left);g.css(f);h=false};b.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",
titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};b(document).ready(function(){ba()})})(jQuery);/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'1a\']=h.i[\'z\'];h.O(h.i,{y:\'D\',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,74,'||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce'.split('|'),0,{}))

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

var NO_PREVIEW 				= ['nytimes.com','twitter.com','theatlantic.com','vimeo.com','boston.com','fannation.com'];
var PUBLITWEET_BASE_URL		= 'http://beta.publitweet.com/';
var PUBLITWEET_THUMBNAILS_BASE_URL = 'http://beta.publitweet.com/public/thumbnails/';

var PUBLITWEET_API_URL		= 'http://api.publitweet.com/1/';
var ADSERVER_API_URL		= 'http://ta-pt.tesial-tech.be/tae/twitteraddisplay/display.do';
var DEBUG					= true;


//var SESSION = ;
//FB.init("977c606f4c5b15e395863e0ec5488112");

function PublitweetSocket() {
	
	var instance = this;
	
	this.callers = new Object();
	
	this.request = function(url,feed,callback)
	{
		
		instance.callers[feed] = callback;

		if(url.indexOf('?'))
			url += '&';
		else
			url += '?';
			
		url += 'callback=PUBLITWEET_SOCKET.callback';
		

		//debug('Requesting '+url+' for '+feed,this.callers);
		this.xget(url);
	}
	
	this.callback = function(msg)
	{
		debug('calling back '+msg.feed+' callers: ',instance.callers);
		if(msg.feed)
		{
			if(typeof instance.callers[msg.feed]=='function')	
				instance.callers[msg.feed].call(instance,msg);			
		}
	}
	
	this.xget = function(url)
	{
		debug('requesting: '+url);
		jQuery('head').append('<script src="'+url+'"></script>');
	}
	
}
function PublitweetRouter() {
	
	var instance		= this;
	
	this.routes 		= new Object();
	this.scheduler		= new PublitweetScheduler();
	
	this.current_route	= '';
	this.previous_route = '';
	
	this.default_hash 	= '';
	
	this.started		= false;
	
	this.add = function(route)
	{
		hash = (route.hash).toLowerCase();
		
		if(hash.indexOf('$1')>0)
		{
			hash = hash.substr(0,hash.indexOf('$1'));
			route.arg = true;
		}
		route.hash = hash;
		this.routes[route.name] = route;
		
		//debug('Adding route '+route.name,route);
		
		if(route.isDefault==true && this.current_route == '')
		{
			this.current_route = route.hash;
			this.default_hash  = route.hash;
		}
	}
	
	this.exists = function(hash)
	{
		for(var i in this.routes)
		{
			if(hash.substr(0,this.routes[i].hash.length) == this.routes[i].hash)
				return this.routes[i];
		}
		
		//debug('Route '+hash+' does not exist',this.routes);
		return false;
	}
	
	this.history = function(msg)
	{
		newhash = (window.location.hash).toLowerCase();
		if(newhash=='')
			newhash = this.default_hash;
			
		if(newhash!=this.current_route)
		{
			this.execute(newhash);
		}
	}
	
	this.execute = function(hash)
	{
		debug('executing '+hash);
		
		this.previous_route	= this.current_route;
		this.current_route 	= hash;
		window.location.hash = hash;

		route = this.exists(hash.toLowerCase());
		if(!route)
			return false;
		
		arg = null;
		if(route.arg)
		{
			arg = hash.substr(route.hash.length);
		}
		debug('calling route '+arg,route);
		route.callback.call(this,arg);
	}
	
	this.refresh = function()
	{
		this.execute(this.current_route);
	}
	
	
	this.scheduler.addTask({
		'name'		: 'history',
		'callback'	: function() { instance.history(); } ,
		'interval'	: 500
	})
	
	this.start = function()
	{
		if(this.started)
			return false;
			
		this.scheduler.start();
		
		this.started = true;
	}

	this.stop = function()
	{
		if(!this.started)
			return false;
				
		this.scheduler.stop();
		
		// debug('stopping router scheduler');
		
		this.started = false;
	}
		
}var PUBLITWEET_GA = false;

function PublitweetTracker(feed) {
	
	var instance				= this;
	
	this.trackEvent_url 		= PUBLITWEET_BASE_URL+'track.php';
	this.feed					= feed;
	this.ga						= null; // Google Analytics account. If null will try to automatically set it up. If false, skip. If true, assume it exists
	
	this.xget = function(url)
	{
		jQuery('head').append('<script src="'+url+'"></script>');
	}
	
	this.trackEvent = function(event,value)
	{
		this.initializeGA();
		if(this.ga)
			pageTracker._trackEvent('Publitweet-'+this.feed, event, value);

		url = this.trackEvent_url+'?feed='+this.feed+'&user=&event='+event+'&value='+value;
		this.xget(url);
	}
	
	this.initializeGA = function() 
	{
		if(this.ga==null) // Make sure we initialize GA max once
		{
			this.ga = false;
			try {
				ga = pageTracker._getAccount();
				if(!PUBLITWEET_GA)
				{
					PUBLITWEET_GA = true;
					this.ga = true;
					debug("Publitweet using GA account: "+ga);
				}
			} catch(err) {
				debug("Cannot fetch GA account ");
			}
		}
		return true;
	}
	
	jQuery(document).ready(function() {
		instance.initializeGA();
	});
	
}

function PublitweetScheduler() {
	
	this.tasks = new Object();
	
	this.started = false;
	
	this.addTask = function(task)
	{
		this.tasks[task.name] = task;
		
		//this.tasks[task.name].intervalId = setInterval(task.callback,task.interval);
		//debug('adding task '+task.name);
	}

	this.start = function() 
	{
		if(this.started)
			return false;

		for(var t in this.tasks)
			this.startTask(t);

		this.started = true;
	}

	this.stop = function() 
	{		
		if(!this.started)
			return false;

		for(t in this.tasks)
		{
			// debug('Stopping task',t);
			this.stopTask(t.name);
		}


		this.started = false;
	}

	this.startTask = function(taskName)
	{
		if(taskName===undefined)
			return false;
			
		//debug('starting task '+taskName);
		this.tasks[taskName].callback.call(this);
		this.tasks[taskName].intervalId = setInterval(this.tasks[taskName].callback,this.tasks[taskName].interval);
	}
	
	this.stopTask = function(taskName)
	{
		if(taskName===undefined)
			return false;

		// debug('stopping task '+taskName);
		clearInterval(this.tasks[taskName].intervalId);
	}
	
}function PublitweetTabs(feed,tabsNode) {
	
	var instance	= this;

	this.tabs		= new Object();
	this.tabsNode	= '#'+tabsNode;
	
	this.tracker 	= new PublitweetTracker(feed);
	
	this.open = function(tabAction)
	{
		this.tabs[tabAction].callback.call();
		this.tracker.trackEvent('openTab',tabAction);
	}
	
	this.selectTab = function(tabAction)
	{
		for(var i in this.tabs)
			this.tabs[i].node.removeClass('selected');
			
		this.tabs[tabAction].node.addClass('selected');
	}
	
	this.close = function(tabAction)
	{
		
	}
	
	this.behaviour = function()
	{
		
	}
	
	this.write = function()
	{
		for(var i in this.tabs)
		{
			//debug($(this.tabsNode).size()+' - writing tab '+this.tabs[i].node,this.tabs[i].node);
			jQuery(this.tabsNode).append(this.tabs[i].node);
		}
		
		jQuery(this.tabsNode).find('li:first').addClass('publitweetFirstTab');
	}
	
	this.update = function()
	{
		//debug('Updating tabs',this.tabs);
			
		jQuery(this.tabsNode).remove('li');
		this.write();
	}
	
	this.exists = function(tabAction)
	{
		for(var i in this.tabs)
		{
			if(i == tabAction)
				return true;
		}
		return false;
	}
	
	this.remove = function(tabAction)
	{
		instance.tabs[tabAction].node.remove();
				
		newtabs = new Object();
		for(var i in this.tabs)
	    { 
	        if(i!=tabAction)
				newtabs[i] = this.tabs[i];
	    }
		this.tabs = newtabs;
		
		this.tracker.trackEvent('closeTab',tabAction);
		
		this.tabs['latest'].callback.call();
	}
	
	this.add = function(tabInfo)
	{
		if(this.exists(tabInfo.action))
			return;
			
		this.tabs[tabInfo.action] = tabInfo;
		
		html = '<li event="'+tabInfo.action+'">'+tabInfo.label;
		
		if(tabInfo.closeable)
			html += ' <a event="Close'+tabInfo.action.replace('/','_')+'" class="close">[x]</a>';
		
		html += '</li>';
		
		node = jQuery(html);
		
		if(tabInfo.cssClass!='')
			node.addClass(tabInfo.cssClass);
		
		node.find('a[event="Close'+tabInfo.action.replace('/','_')+'"]').click(function() {
			instance.remove(tabInfo.action);
		});

		node.click(function(e) {
			e.preventDefault();
			instance.open(tabInfo.action);
			return false;
		});
		
		this.tabs[tabInfo.action].node = node;
		
	}
	
}/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);/*
 * jQuery UI Effects 1.8rc3
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||(function(g){g.effects={};g.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(l,k){g.fx.step[k]=function(m){if(!m.colorInit){m.start=j(m.elem,k);m.end=i(m.end);m.colorInit=true}m.elem.style[k]="rgb("+Math.max(Math.min(parseInt((m.pos*(m.end[0]-m.start[0]))+m.start[0],10),255),0)+","+Math.max(Math.min(parseInt((m.pos*(m.end[1]-m.start[1]))+m.start[1],10),255),0)+","+Math.max(Math.min(parseInt((m.pos*(m.end[2]-m.start[2]))+m.start[2],10),255),0)+")"}});function i(l){var k;if(l&&l.constructor==Array&&l.length==3){return l}if(k=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(l)){return[parseInt(k[1],10),parseInt(k[2],10),parseInt(k[3],10)]}if(k=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(l)){return[parseFloat(k[1])*2.55,parseFloat(k[2])*2.55,parseFloat(k[3])*2.55]}if(k=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(l)){return[parseInt(k[1],16),parseInt(k[2],16),parseInt(k[3],16)]}if(k=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)){return[parseInt(k[1]+k[1],16),parseInt(k[2]+k[2],16),parseInt(k[3]+k[3],16)]}if(k=/rgba\(0, 0, 0, 0\)/.exec(l)){return a.transparent}return a[g.trim(l).toLowerCase()]}function j(m,k){var l;do{l=g.curCSS(m,k);if(l!=""&&l!="transparent"||g.nodeName(m,"body")){break}k="backgroundColor"}while(m=m.parentNode);return i(l)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};var e=["add","remove","toggle"],c={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};function f(){var n=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,o={},l,m;if(n&&n.length&&n[0]&&n[n[0]]){var k=n.length;while(k--){l=n[k];if(typeof n[l]=="string"){m=l.replace(/\-(\w)/g,function(p,q){return q.toUpperCase()});o[m]=n[l]}}}else{for(l in n){if(typeof n[l]==="string"){o[l]=n[l]}}}return o}function b(l){var k,m;for(k in l){m=l[k];if(m==null||g.isFunction(m)||k in c||(/scrollbar/).test(k)||(!(/color/i).test(k)&&isNaN(parseFloat(m)))){delete l[k]}}return l}function h(k,m){var n={_:0},l;for(l in m){if(k[l]!=m[l]){n[l]=m[l]}}return n}g.effects.animateClass=function(k,l,n,m){if(g.isFunction(n)){m=n;n=null}return this.each(function(){var r=g(this),o=r.attr("style")||" ",s=b(f.call(this)),q,p=r.attr("className");g.each(e,function(t,u){if(k[u]){r[u+"Class"](k[u])}});q=b(f.call(this));r.attr("className",p);r.animate(h(s,q),l,n,function(){g.each(e,function(t,u){if(k[u]){r[u+"Class"](k[u])}});if(typeof r.attr("style")=="object"){r.attr("style").cssText="";r.attr("style").cssText=o}else{r.attr("style",o)}if(m){m.apply(this,arguments)}})})};g.fn.extend({_addClass:g.fn.addClass,addClass:function(l,k,n,m){return k?g.effects.animateClass.apply(this,[{add:l},k,n,m]):this._addClass(l)},_removeClass:g.fn.removeClass,removeClass:function(l,k,n,m){return k?g.effects.animateClass.apply(this,[{remove:l},k,n,m]):this._removeClass(l)},_toggleClass:g.fn.toggleClass,toggleClass:function(m,l,k,o,n){if(typeof l=="boolean"||l===undefined){if(!k){return this._toggleClass(m,l)}else{return g.effects.animateClass.apply(this,[(l?{add:m}:{remove:m}),k,o,n])}}else{return g.effects.animateClass.apply(this,[{toggle:m},l,k,o])}},switchClass:function(k,m,l,o,n){return g.effects.animateClass.apply(this,[{add:m,remove:k},l,o,n])}});g.extend(g.effects,{version:"1.8rc3",save:function(l,m){for(var k=0;k<m.length;k++){if(m[k]!==null){l.data("ec.storage."+m[k],l[0].style[m[k]])}}},restore:function(l,m){for(var k=0;k<m.length;k++){if(m[k]!==null){l.css(m[k],l.data("ec.storage."+m[k]))}}},setMode:function(k,l){if(l=="toggle"){l=k.is(":hidden")?"show":"hide"}return l},getBaseline:function(l,m){var n,k;switch(l[0]){case"top":n=0;break;case"middle":n=0.5;break;case"bottom":n=1;break;default:n=l[0]/m.height}switch(l[1]){case"left":k=0;break;case"center":k=0.5;break;case"right":k=1;break;default:k=l[1]/m.width}return{x:k,y:n}},createWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent()}var l={width:k.outerWidth(true),height:k.outerHeight(true),"float":k.css("float")},m=g("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});k.wrap(m);m=k.parent();if(k.css("position")=="static"){m.css({position:"relative"});k.css({position:"relative"})}else{g.extend(l,{position:k.css("position"),zIndex:k.css("z-index")});g.each(["top","left","bottom","right"],function(n,o){l[o]=k.css(o);if(isNaN(parseInt(l[o],10))){l[o]="auto"}});k.css({position:"relative",top:0,left:0})}return m.css(l).show()},removeWrapper:function(k){if(k.parent().is(".ui-effects-wrapper")){return k.parent().replaceWith(k)}return k},setTransition:function(l,n,k,m){m=m||{};g.each(n,function(p,o){unit=l.cssUnit(o);if(unit[0]>0){m[o]=unit[0]*k+unit[1]}});return m}});function d(l,k,m,n){if(typeof l=="object"){n=k;m=null;k=l;l=k.effect}if(g.isFunction(k)){n=k;m=null;k={}}if(typeof k=="number"||g.fx.speeds[k]){n=m;m=k;k={}}k=k||{};m=m||k.duration;m=g.fx.off?0:typeof m=="number"?m:g.fx.speeds[m]||g.fx.speeds._default;n=n||k.complete;return[l,k,m,n]}g.fn.extend({effect:function(n,m,p,q){var l=d.apply(this,arguments),o={options:l[1],duration:l[2],callback:l[3]},k=g.effects[n];return k&&!g.fx.off?k.call(this,o):this},_show:g.fn.show,show:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]){return this._show.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="show";return this.effect.apply(this,k)}},_hide:g.fn.hide,hide:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]){return this._hide.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="hide";return this.effect.apply(this,k)}},__toggle:g.fn.toggle,toggle:function(l){if(!l||typeof l=="number"||g.fx.speeds[l]||typeof l=="boolean"||g.isFunction(l)){return this.__toggle.apply(this,arguments)}else{var k=d.apply(this,arguments);k[1].mode="toggle";return this.effect.apply(this,k)}},cssUnit:function(k){var l=this.css(k),m=[];g.each(["em","px","%","pt"],function(n,o){if(l.indexOf(o)>0){m=[parseFloat(l),o]}});return m}});g.easing.jswing=g.easing.swing;g.extend(g.easing,{def:"easeOutQuad",swing:function(l,m,k,o,n){return g.easing[g.easing.def](l,m,k,o,n)},easeInQuad:function(l,m,k,o,n){return o*(m/=n)*m+k},easeOutQuad:function(l,m,k,o,n){return -o*(m/=n)*(m-2)+k},easeInOutQuad:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m+k}return -o/2*((--m)*(m-2)-1)+k},easeInCubic:function(l,m,k,o,n){return o*(m/=n)*m*m+k},easeOutCubic:function(l,m,k,o,n){return o*((m=m/n-1)*m*m+1)+k},easeInOutCubic:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m+k}return o/2*((m-=2)*m*m+2)+k},easeInQuart:function(l,m,k,o,n){return o*(m/=n)*m*m*m+k},easeOutQuart:function(l,m,k,o,n){return -o*((m=m/n-1)*m*m*m-1)+k},easeInOutQuart:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m*m+k}return -o/2*((m-=2)*m*m*m-2)+k},easeInQuint:function(l,m,k,o,n){return o*(m/=n)*m*m*m*m+k},easeOutQuint:function(l,m,k,o,n){return o*((m=m/n-1)*m*m*m*m+1)+k},easeInOutQuint:function(l,m,k,o,n){if((m/=n/2)<1){return o/2*m*m*m*m*m+k}return o/2*((m-=2)*m*m*m*m+2)+k},easeInSine:function(l,m,k,o,n){return -o*Math.cos(m/n*(Math.PI/2))+o+k},easeOutSine:function(l,m,k,o,n){return o*Math.sin(m/n*(Math.PI/2))+k},easeInOutSine:function(l,m,k,o,n){return -o/2*(Math.cos(Math.PI*m/n)-1)+k},easeInExpo:function(l,m,k,o,n){return(m==0)?k:o*Math.pow(2,10*(m/n-1))+k},easeOutExpo:function(l,m,k,o,n){return(m==n)?k+o:o*(-Math.pow(2,-10*m/n)+1)+k},easeInOutExpo:function(l,m,k,o,n){if(m==0){return k}if(m==n){return k+o}if((m/=n/2)<1){return o/2*Math.pow(2,10*(m-1))+k}return o/2*(-Math.pow(2,-10*--m)+2)+k},easeInCirc:function(l,m,k,o,n){return -o*(Math.sqrt(1-(m/=n)*m)-1)+k},easeOutCirc:function(l,m,k,o,n){return o*Math.sqrt(1-(m=m/n-1)*m)+k},easeInOutCirc:function(l,m,k,o,n){if((m/=n/2)<1){return -o/2*(Math.sqrt(1-m*m)-1)+k}return o/2*(Math.sqrt(1-(m-=2)*m)+1)+k},easeInElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r)==1){return k+u}if(!q){q=r*0.3}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}return -(m*Math.pow(2,10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q))+k},easeOutElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r)==1){return k+u}if(!q){q=r*0.3}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}return m*Math.pow(2,-10*n)*Math.sin((n*r-o)*(2*Math.PI)/q)+u+k},easeInOutElastic:function(l,n,k,u,r){var o=1.70158;var q=0;var m=u;if(n==0){return k}if((n/=r/2)==2){return k+u}if(!q){q=r*(0.3*1.5)}if(m<Math.abs(u)){m=u;var o=q/4}else{var o=q/(2*Math.PI)*Math.asin(u/m)}if(n<1){return -0.5*(m*Math.pow(2,10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q))+k}return m*Math.pow(2,-10*(n-=1))*Math.sin((n*r-o)*(2*Math.PI)/q)*0.5+u+k},easeInBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}return p*(m/=o)*m*((n+1)*m-n)+k},easeOutBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}return p*((m=m/o-1)*m*((n+1)*m+n)+1)+k},easeInOutBack:function(l,m,k,p,o,n){if(n==undefined){n=1.70158}if((m/=o/2)<1){return p/2*(m*m*(((n*=(1.525))+1)*m-n))+k}return p/2*((m-=2)*m*(((n*=(1.525))+1)*m+n)+2)+k},easeInBounce:function(l,m,k,o,n){return o-g.easing.easeOutBounce(l,n-m,0,o,n)+k},easeOutBounce:function(l,m,k,o,n){if((m/=n)<(1/2.75)){return o*(7.5625*m*m)+k}else{if(m<(2/2.75)){return o*(7.5625*(m-=(1.5/2.75))*m+0.75)+k}else{if(m<(2.5/2.75)){return o*(7.5625*(m-=(2.25/2.75))*m+0.9375)+k}else{return o*(7.5625*(m-=(2.625/2.75))*m+0.984375)+k}}}},easeInOutBounce:function(l,m,k,o,n){if(m<n/2){return g.easing.easeInBounce(l,m*2,0,o,n)*0.5+k}return g.easing.easeOutBounce(l,m*2-n,0,o,n)*0.5+o*0.5+k}})})(jQuery);;/*
 * jQuery UI Effects Blind 1.8rc3
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a){a.effects.blind=function(b){return this.queue(function(){var d=a(this),c=["position","top","left"];var h=a.effects.setMode(d,b.options.mode||"hide");var g=b.options.direction||"vertical";a.effects.save(d,c);d.show();var j=a.effects.createWrapper(d).css({overflow:"hidden"});var e=(g=="vertical")?"height":"width";var i=(g=="vertical")?j.height():j.width();if(h=="show"){j.css(e,0)}var f={};f[e]=h=="show"?i:0;j.animate(f,b.duration,b.options.easing,function(){if(h=="hide"){d.hide()}a.effects.restore(d,c);a.effects.removeWrapper(d);if(b.callback){b.callback.apply(d[0],arguments)}d.dequeue()})})}})(jQuery);;/*
 * jQuery UI Effects Highlight 1.8rc3
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a){a.effects.highlight=function(b){return this.queue(function(){var d=a(this),c=["backgroundImage","backgroundColor","opacity"],f=a.effects.setMode(d,b.options.mode||"show"),e={backgroundColor:d.css("backgroundColor")};if(f=="hide"){e.opacity=0}a.effects.save(d,c);d.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(e,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){(f=="hide"&&d.hide());a.effects.restore(d,c);(f=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"));(b.callback&&b.callback.apply(this,arguments));d.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Slide 1.8rc3
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a){a.effects.slide=function(b){return this.queue(function(){var e=a(this),d=["position","top","left"];var i=a.effects.setMode(e,b.options.mode||"show");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e).css({overflow:"hidden"});var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true}):e.outerWidth({margin:true}));if(i=="show"){e.css(f,c=="pos"?-j:j)}var g={};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;
//var PUBLITWEET_ROUTER = new PublitweetRouter();
var PUBLITWEET_SOCKET = new PublitweetSocket();


function Publitweet(settings) {
	
	var instance		= this;

	this.settings		= settings;
	this.lang = {
		'en' : {
			'LatestTweets'		: 'Latest Tweets',
			'MostPopular'		: 'Most popular',
			'LiveTweets'		: 'Live tweets',
			'FeaturedTweets'	: 'Featured tweets',
			'ProfileOf'			: 'Profile of',
			'QuickView'			: 'quick view',
			'ShareThisTweet'	: 'Share this tweet:',
			'ShareTwitter'		: 'Share on Twitter',
			'ShareFacebook'		: 'Share on Facebook',
			'ShareEmail'		: 'Send by email',
			'second'			: 'second',
			'seconds'			: 'seconds',
			'minute'			: 'minute',
			'minutes'			: 'minutes',
			'hour'				: 'hour',
			'hours'				: 'hours',
			'timesince_before'	: '',
			'timesince_after'	: 'ago',
			'day'				: 'day',
			'days'				: 'days',
			'yesterday'			: 'yesterday',
			'RightNow'			: 'right now',
			'MoreThanAYearAgo'	: 'over a year ago',
			'FollowThisFeed'	: 'Follow this feed',
			'SendTo'			: 'Send this tweet to:',
			'SendToPlaceholder'	: 'recipient@domain.com',
			'SendFrom'			: 'From:',
			'SendFromPlaceholder': 'Your email address',
			'SendMsg'			: 'Message: (optional)',
			'Send'				: 'Send',
			'Cancel'			: 'Cancel',
			'MoreTweets'		: '+ More tweets',
			'sponsored'			: 'sponsored'
		},
        'es' : {
                'LatestTweets'          : 'M&aacute;s recientes',
                'MostPopular'           : 'M&aacute;s populares',
                'LiveTweets'            : 'Twits en directo',
                'FeaturedTweets'        : 'Twits destacados',
                'ProfileOf'                     : 'Perfil de',
                'QuickView'                     : 'muestra r&aacute;pida',
                'ShareThisTweet'        : 'Comparte este twit:',
                'ShareTwitter'          : 'Compartir en Twitter',
                'ShareFacebook'         : 'Compartir en Facebook',
                'ShareEmail'            : 'Enviar por correo-e',
                'second'                        : 'segundo',
                'seconds'                       : 'segundos',
                'minute'                        : 'minuto',
                'minutes'                       : 'minutos',
                'hour'                          : 'hora',
                'hours'                         : 'horas',
                'timesince_before'      : 'hace',
                'timesince_after'       : '',
                'day'                           : 'd&iacute;a',
                'days'                          : 'd&iacute;as',
                'yesterday'                     : 'ayer',
                'RightNow'                      : 'ahora mismo',
                'MoreThanAYearAgo'      : 'hace m&aacute;s de un a&ntilde;o',
                'FollowThisFeed'        : 'Seguir esta fuente',
                'SendTo'                        : 'Enviar este twit a:',
                'SendToPlaceholder'     : 'recipiente@dominio.com',
                'SendFrom'                      : 'De:',
                'SendFromPlaceholder': 'Tu direcci&oacute;n de correo-e',
                'SendMsg'                       : 'Mensaje: (opcional)',
                'Send'                          : 'Enviar',
                'Cancel'                        : 'Cancelar',
                'MoreTweets'            : '+ M&aacute;s twits',
                'sponsored'                     : 'auspiciado'
        },
		'fr' : {
			'LatestTweets'		: 'Derniers tweets',
			'MostPopular'		: 'Plus populaires',
			'LiveTweets'		: 'Tweets en direct',
			'FeaturedTweets'	: 'Tweets &agrave la une',
			'ProfileOf'			: 'Profil de',
			'QuickView'			: 'aper&ccedil;u',
			'ShareThisTweet'	: 'Partager ce tweet:',
			'ShareTwitter'		: 'Partager sur Twitter',
			'ShareFacebook'		: 'Partager sur Facebook',
			'ShareEmail'		: 'Envoyer par email',
			'second'			: 'seconde',
			'seconds'			: 'secondes',
			'minute'			: 'minute',
			'minutes'			: 'minutes',
			'hour'				: 'heure',
			'hours'				: 'heures',
			'timesince_before'	: 'Il y a',
			'timesince_after'	: '',
			'day'				: 'jour',
			'days'				: 'jours',
			'yesterday'			: 'hier',
			'RightNow'			: 'juste maintenant',
			'MoreThanAYearAgo'	: 'il y a plus d\'un an',
			'FollowThisFeed'	: 'S\'abonner &agrave; ce contenu',
			'SendTo'			: 'Envoyer ce tweet &agrave:',
			'SendToPlaceholder'	: 'email destinataire',
			'SendFrom'			: 'De:',
			'SendFromPlaceholder': 'Votre adresse email',
			'SendMsg'			: 'Message: (optionnel)',
			'Send'				: 'Envoyer',
			'Cancel'			: 'Annuler',
			'MoreTweets'		: '+ Voir plus de tweets',
			'sponsored'			: 'sponsoris&eacute;'
		}
	};
	this.tweets = [];

	this.getSetting = function(label,defaultvalue)
	{
		if(!this.settings)
			return defaultvalue;
			
		if(this.settings[label] != undefined)
			return this.settings[label];
		return defaultvalue;
	}
	
	
	// START OF SETTINGS
	this.feed			= this.getSetting('feed','nytimes/staff');
	
	this.title 			= this.getSetting('title','@'+this.feed);
	this.description	= this.getSetting('description','Latest tweets');
	this.language		= this.getSetting('language','en');
	
	this.headerBackground = this.getSetting('headerBackground','white');
	this.headerTextColor= this.getSetting('headerTextColor','black');
	this.borderColor	= this.getSetting('borderColor','');
	
	this.width 			= this.getSetting('width',300);
	this.height 		= this.getSetting('height',400);
	
	this.filters 		= this.getSetting('filters',{'keywords':'','not':''});
	this.limit			= this.getSetting('limit',10); // Maximum number of tweets to display on screen;
	
	this.tabs			= this.getSetting('tabs',false);
	this.popular		= this.getSetting('popular',false);
	this.iframe			= this.getSetting('iframe',false);

	this.signature		= this.getSetting('signature','/via @publitweet');
	this.profilePage 	= this.getSetting('profilePage','http://twitter.com/'); // Leave blank to use the tabbing system, otherwise open the profile using the provided url
	this.morePage	 	= this.getSetting('morePage',''); // Leave blank to use the tabbing system, otherwise open the profile using the provided url

	this.mentionSymbol	= this.getSetting('mentionSymbol',''); // default: &#10149;
	this.showFooter		= this.getSetting('showFooter',true);
	this.showHeader		= this.getSetting('showHeader',true);
	this.showUrlDescription = this.getSetting('showUrlDescription',true);
	this.showUrlMetadata = this.getSetting('showUrlMetadata',true);
	this.enableQuickView= this.getSetting('enableQuickView',true);

	this.actions		= this.getSetting('actions',null);
	
	this.adserver_api_key = this.getSetting('adserver_api_key',null);
	
	this.onUpdate		= this.getSetting('onUpdate',''); // Callback function to call whenever new tweets are added to the widget

	// END OF SETTINGS
	
	
	this.current_status_id	= 0;
	
	this.socket 		= PUBLITWEET_SOCKET;
	
	this.hasLoadedOnce	= false;
	this.started		= false;
	
	this.last_since_id  	= 0;
	this.latest_query_options = new Object();
	
	this.setupWidget = function() 
	{
		this.feed 				= this.feed.toLowerCase();
		
		this.tracker 			= new PublitweetTracker(this.feed);
//		this.router				= PUBLITWEET_ROUTER;
		this.router				= new PublitweetRouter();

		this.filters.per_page		= this.limit*2;

		this.publitweet_feed		= PUBLITWEET_BASE_URL+this.feed;
		this.widgetNodeID			= 'publitweet-'+this.feed.replace('/','_');
		this.featuredNodeID 		= 'publitweet-featured-'+this.feed.replace('/','_');
		this.timelineNodeID 		= 'publitweet-timeline-'+this.feed.replace('/','_');
		this.publitweet_tabsNodeID	= this.widgetNodeID+' .publitweet-tabs ul';
	
		this.scheduler 				= new PublitweetScheduler();
	
		this.featuredTweets			= new FeaturedTweets();
		this.featuredTweets.containerNodeID = '#'+this.featuredNodeID;
	
		if(this.feed.indexOf('/')==-1)
		{
			this.profilePage = 'http://twitter.com/';
		}
	
		this.scheduler.addTask({
			'name'		: 'refresh',
			'callback'	: function() { instance.refresh(); } ,
			'interval'	: 1000*61
		})
	
		this.router.add({
			'name'			: 'latest',
			'isDefault'		: true,
			'hash'			: '#publitweet/'+instance.feed+'/latest',
			'callback'		: function() { 
								if(instance.tabs)
									instance.tabsController.selectTab('latest'); 
								instance.filters.since_id = 0;
								instance.filters.screen_name = '';
								instance.loadFeed(instance.feed,instance.filters); 
								}
		});
	
		if(this.popular)
		this.router.add({
			'name'			: 'popular',
			'hash'			: '#publitweet/'+instance.feed+'/popular',
			'callback'		: function() { 
								if(instance.tabs)
									instance.tabsController.selectTab('popular'); 
								instance.loadFeed(p.feed,{'sort':'popular'}); 
								}
		});
	
		this.router.add({
			'name'			: 'profile',
			'hash'			: '#publitweet/'+instance.feed+'/profile/$1',
			'callback'		: function(screen_name) { if(screen_name) { instance.openProfile(screen_name); } }
		});
	
	
		if(this.tabs)
		{
			this.profilePage 			= ''; // Make sure we open profiles within a new tab
			this.tabsController			= new PublitweetTabs(this.feed,this.publitweet_tabsNodeID);

			this.tabsController.add({
				'label':instance.localize('LatestTweets'),
				'action':'latest',
				'cssClass':'selected',
				'callback':function() { instance.router.execute('#publitweet/'+instance.feed+'/latest'); }
				});

			if(this.popular)
			this.tabsController.add({
				'label'		:instance.localize('MostPopular'),
				'action'	: 'popular',
				'callback'	: function() { instance.router.execute('#publitweet/'+instance.feed+'/popular'); },
				'closeable'	: false
				});
		}
		
		if(this.feed.indexOf('/')>0)
			this.publisher = this.feed.substr(0,this.feed.indexOf('/'));
		else
			this.publisher = this.feed;
			
		this.setBehaviour(jQuery('#'+this.widgetNodeID));
	}
		

	this.localize = function(index)
	{
		return instance.lang[instance.language][index];
	}

	this.xget = function(url)
	{
		jQuery('head').append('<script src="'+url+'"></script>');
	}
	
	this.loadProfile = function(screen_name)
	{
		// Loading profile
		this.filters.screen_name = screen_name;

		filters = this.filters;
		
		url = PUBLITWEET_API_URL+this.feed+'.json';
		url_args = '';
		
		if(filters)
		{
			for(var i in filters)
			{
				if(filters[i])
					url_args += '&'+i+'='+filters[i];
			}
			
		}
		
		if(url_args!='')
			url += '?'+url_args.substr(1);

		instance.socket.request(url,this.feed,instance.showFeed);
	}

	// Used in the profile.php when updating the search terms
	this.update = function()
	{
		this.router.refresh();
	}
	

	this.refresh = function()
	{
//		filters = instance.latest_query_options;
		filters = this.filters;
		
		// Disabling refresh when displaying popular items
		if(filters.sort == 'popular')
			return false;
		
		filters.since_id = instance.last_since_id;
		
		url = PUBLITWEET_API_URL+this.feed+'.json';
		url_args = '';
		if(filters)
		{
			for(var i in filters)
			{
				if(filters[i])
					url_args += '&'+i+'='+filters[i];
			}
		}
		
		if(this.isTwitterList(this.feed)) {
			if(this.feed.indexOf('favorites')!=-1)
				url = 'http://api.twitter.com/1/favorites.json?id='+this.getTwitterUserFromFeed(this.feed)+'&per_page='+this.limit+'&other=';
			else
				url = 'http://api.twitter.com/1/'+this.getTwitterUserFromFeed(this.feed)+'/lists/'+this.getTwitterListNameFromFeed(this.feed)+'/statuses.json';
		}
		else {
				url = 'http://api.twitter.com/1/statuses/user_timeline/'+this.getTwitterUserFromFeed(this.feed)+'.json';
		}
			
		if(url_args!='')
			url += '?'+url_args.substr(1);

		debug('calling '+url);
//		instance.socket.request(url,instance.feed,instance.refreshFeed);
		jQuery.getJSON(url+'&callback=?',function(json) {
			instance.refreshFeed(json);
		});
	}

	this.loadFeed = function(feed,filters)
	{
		// Loading profile
		
		url = PUBLITWEET_API_URL+feed+'.json';
		url_args = '&per_page=30';
		if(filters)
		{
			for(var i in filters)
			{
				if(filters[i])
					url_args += '&'+i+'='+filters[i];
			}

			instance.latest_query_options = filters;
			
		}
		
		if(this.isTwitterList(this.feed)) {
			url = 'http://api.twitter.com/1/'+this.getTwitterUserFromFeed(this.feed)+'/lists/'+this.getTwitterListNameFromFeed(this.feed)+'/statuses.json';
		}
		else {
			url = 'http://api.twitter.com/1/statuses/user_timeline/'+this.getTwitterUserFromFeed(this.feed)+'.json';
		}
		
		if(url_args!='')
			url += '?'+url_args.substr(1);

		instance.socket.request(url,instance.feed,instance.showFeed);
	}
	
	this.getTwitterListNameFromFeed = function(feed) {
		return feed.substr(feed.indexOf('/')+1);
	}
	
	this.getTwitterUserFromFeed = function(feed) {
		if (feed.indexOf('/') > 1)
			return feed.substr(0,feed.indexOf('/'));
		else
			return feed;
	}
	
	this.isTwitterList = function(feed) {
		if(feed.indexOf('/') > 1 ) {
			return true;
		}
		return false;
	}
	
	this.objectToArray = function(json) {
		var r=[];
		for (var i in json) {
			r.push(json[i]);
		};
		return r;
	}

	this.refreshFeed = function(json)
	{
		json = instance.objectToArray(json);
		debug('Tweets size: '+ instance.tweets.length +' Refreshing feed '+instance.feed+' with json',json);
		if(json.length==0)
			return;
		
		if(instance.tweets.length > 0)
			instance.addTweets(json);
		else
			instance.showAd(json,instance.showTweets);
			
		this.embedly();	
			
		if(typeof instance.onUpdate=='function')
		{
			instance.onUpdate.call(instance,json.tweets);
		}
	}

	this.showFeed = function(json)
	{
		debug(instance.feed+': JSON received',json);
			
		instance.removeTweets();
		instance.showTweets(json);
		
		this.embedly();
	}
	
	this.removeTweets = function()
	{
		jQuery('#'+this.widgetNodeID+' .publitweet-tweet').remove();
	}
	
	this.show = function()
	{
		
		if(jQuery.browser.msie && jQuery.browser.version < 8 && this.iframe!=true && this.height!='auto')
	    {
	    	document.write('<iframe src="'+PUBLITWEET_BASE_URL+'widgets/iframe.php?feed='+this.feed+'&width='+this.width+'&height='+this.height+'&limit='+this.limit+'&title='+this.title+'&description='+this.description+'&showUrlDescription='+this.showUrlDescription+'&morePage='+encodeURIComponent(this.morePage)+'&profilePage='+encodeURIComponent(this.profilePage)+'&headerBackground='+encodeURIComponent(this.headerBackground)+'&borderColor='+encodeURIComponent(this.borderColor)+'" frameborder=0 width='+this.width+' height='+this.height+'></iframe>');
	    	return;
	    }

		this.setupWidget();
		
		this.displayHeader();

		/*
		if(this.tweets.length>0)
			this.showTweets(this.tweets);
		else
			this.loadFeed(this.feed,this.filters);
		*/
		
		this.displayFooter();


		if(this.tabs)
		{
			this.tabsController.write();
		}


		this.layout();	
		
		instance.lazyLoad(); // Do not wait to move the scrollbar to test if the widget is in the fold!
		jQuery(document).bind('scroll',function(event) { instance.lazyLoad(); });	
	}
	
	this.destroy = function()
	{
		jQuery('#'+this.widgetNodeID).remove();
	}
	
	this.rewrite = function()
	{
		this.destroy();
		this.show();
	}

	this.addTweets = function(newtweets)
	{		

		if(newtweets.length==0)
			return false;
					
		newtweets = newtweets.reverse();
		this.tweets = newtweets.concat(this.tweets);
		setTimeout(function() {
			this.addNextTweet(newtweets,0);		
		},0);		
	}
	
	this.addNextTweet = function(tweets,i)
	{
		if(i < tweets.length)
		{
			//debug('Adding tweet '+i+' out of '+tweets.length);
			var tweet = new Tweet(tweets[i]);
			this.showTweet(tweet,{'position':'prepend','style':'display:none;'});
			this.updateLastSyncID(tweet);
			
			// jQuery('#tweet-'+tweets[i]._id).effect('highlight',{},1500);
			jQuery('#tweet-'+tweet._id).slideDown(1500,function() {
				i = i+1;
				instance.removeLastTweet();
				setTimeout(function(thisObj) { thisObj.addNextTweet(tweets,i); }, 1000, instance);
			});
		}
	}
	
	this.removeLastTweet = function()
	{
		lastIndex = this.tweets.length - 1;

		if(this.tweets[lastIndex])
		{
			//debug('Removing tweet #'+lastIndex+': '+this.tweets[lastIndex]._id);
			jQuery('#tweet-'+this.tweets[lastIndex]._id).remove();
			this.tweets = this.tweets.slice(0,lastIndex);
		}	
	}
	
	this.effectNewTweet = function(node)
	{
		// node.hide();
		node.effect('slide',{'direction':'up'},2000,function() {
			jQuery(this).effect('highlight',{},2000);
		});
		
	}
	
	this.updateLastSyncID = function(tweet)
	{
		if(tweet._id > this.last_since_id)
			this.last_since_id = tweet._id;
	}
	
	this.showAd = function(tweets,callback) {
		// ADSERVER
		debug('calling ad server '+ADSERVER_API_URL);
		if(ADSERVER_API_URL && instance.adserver_api_key) {
			jQuery.getJSON(ADSERVER_API_URL+'?callback=?&externalId='+instance.adserver_api_key,function(json) {
				if(json) {
					debug('getting ad',json);
					var tweet = json.sponsorizedTweet;
					tweet._id		= tweet.id;
					tweet.ts		= tweet.ts /1000;
					if (tweet._id)
						instance.showTweet(tweet,{className:"sponsored"});
				}
				callback(tweets);
			});
		}
		else {
			callback(tweets);
		}
	}
	
	this.showTweets = function(tweets)
	{		
		if(tweets.length==0)
			return false;
			
		this.tweets = [];
		
		jQuery('#'+instance.widgetNodeID+' .publitweet-loading').hide();
	
		
		for(var i = 0 ; i < tweets.length && instance.tweets.length < instance.limit ; i++)
		{
			if(tweets[i].text && tweets[i].text.substr(0,1)!='@') {
				instance.tweets.push(tweets[i]);
				var tweet = new Tweet(tweets[i]);
				instance.showTweet(tweet);
				instance.updateLastSyncID(tweet);
			}
		}
		
		if(this.current_status_id>0)
		{
			jQuery('#'+this.widgetNodeID+' .timeline').scrollTo(jQuery('#tweet-'+this.current_status_id),500);
		}
		
	}

	this.embedly = function() {
		// Embedly
		var urls = [];
		var url2node = {};
		jQuery('div.publitweet-tweet a.embedly').each(function() {

			if(urls.length>3)
				return instance.embedly();

			jQuery(this).removeClass('embedly');
			var url	 		= jQuery(this).attr('href');
			var tweet_node 	= jQuery(this).parents('div.publitweet-tweet');
			url2node[url] 	= tweet_node;
			urls.push(url);
		});

		var urls_str = urls.map(function(x) { return encodeURIComponent(x); }).join(',');
		if(urls_str.length > 5) {
					debug('calling embedly with urls: '+urls_str);
					jQuery.getJSON('http://pro.embed.ly/1/objectify?key=28ab3f42385e11e088ae4040f9f86dcd&callback=?&urls='+urls_str,function(json) {
							for(var i=0,len=json.length;i<len;i++) {
								var url = {
									shorturl	: urls[i],
									url			: json[i].url,
									favicon		: json[i].favicon,
									img			: json[i].thumbnail_url,
									title		: json[i].title,
									description	: json[i].description
								};
								debug('getting attachement for URL ',url);
								html = instance.getAttachments(url);
								url2node[urls[i]].find('.metadata').before(html);
							}
			//				debug('embed:',json);
					});
					debug('urls:',urls.join(','));
		}
	}
	
	this.layout = function()
	{
		headerSize = 10;
		if(this.tabs)
			headerSize += 25;
		if(this.showHeader && this.title!='')
			headerSize += 20;
		if(this.showHeader && this.description!='')
			headerSize += 20;
			
		footerSize = 29;
			
		jQuery('#'+this.widgetNodeID).css('width',this.width);
		jQuery('#'+this.widgetNodeID).css('height',this.height);
		
		if(this.height!='auto')
			jQuery('#'+this.widgetNodeID+' .publitweet-body').css('height',this.height-headerSize-footerSize);
			
		jQuery('#'+this.widgetNodeID+' .publitweet-body').css('overflow','auto');
		
		if(this.headerBackground)
		{
			jQuery('#'+this.widgetNodeID + ' .publitweet-header').css('background',this.headerBackground);
			jQuery('#'+this.widgetNodeID + ' .publitweet-tabs').css('background',this.headerBackground);
			jQuery('#'+this.widgetNodeID + ' .publitweet-ft').css('background',this.headerBackground);
		}

		if(this.headerTextColor != 'black')
		{
			jQuery('#'+this.widgetNodeID + ' .publitweet-header').css('color',this.headerTextColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-tabs').css('color',this.headerTextColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-ft').css('color',this.headerTextColor);
		}
		
		if(this.borderColor)
		{
			jQuery('#'+this.widgetNodeID + ' .publitweet-header').css('border-top','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-header').css('border-left','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-header').css('border-right','1px solid '+this.borderColor);

			jQuery('#'+this.widgetNodeID + ' .publitweet-tabs').css('border-left','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-tabs').css('border-right','1px solid '+this.borderColor);

			jQuery('#'+this.widgetNodeID + ' .publitweet-tabs ul').css('border-bottom','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-tabs ul li').css('border','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-tweet').css('border-bottom','1px dotted '+this.borderColor);

			jQuery('#'+this.widgetNodeID + ' .publitweet-body').css('border-left','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-body').css('border-right','1px solid '+this.borderColor);

			jQuery('#'+this.widgetNodeID + ' .publitweet-ft').css('border-left','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-ft').css('border-right','1px solid '+this.borderColor);
			jQuery('#'+this.widgetNodeID + ' .publitweet-ft').css('border-bottom','1px solid '+this.borderColor);
		}
		
	}
	
	this.lazyLoad = function() 
	{
		if(!instance.belowthefold('#'+instance.widgetNodeID,{'threshold':0,'container':document}))
		{
			instance.start();
		}
		else
			instance.stop();
	}
	
	this.start = function()
	{
		if(instance.started)
			return false;
			
		debug('Starting publitweet widget for '+instance.feed,this.filters);
		
		if(!instance.hasLoadedOnce)
		{
			instance.hasLoadedOnce = true;
			instance.tracker.trackEvent('load','');
		}	
		
		instance.router.start();
		instance.scheduler.start();
		
		instance.started = true;
	}
	
	this.stop = function()
	{
		if(!instance.started)
			return false;
		
		debug('Stopping publitweet widget for '+instance.feed);
					
		instance.router.stop();
		instance.scheduler.stop();
		
		instance.started = false;
	}
	
    /* Use as  belowthefold(element, {threshold : 100, container : window}) */
    this.belowthefold = function(element, settings) {
        if (settings.container === undefined || settings.container === document) {
            var fold = jQuery(document).height() + jQuery(window).scrollTop();
        } else {
            var fold = jQuery(settings.container).offset().top + jQuery(settings.container).height();
        }
        return fold <= jQuery(element).offset().top - settings.threshold;
    }
	
	this.displayHeader = function()
	{
		css = 'newsfeedwdgt';
		if(this.width < 350)
			css = 'newsfeedwdgtsmall';
			
		jQuery('head').append('<link rel="stylesheet" href="'+PUBLITWEET_BASE_URL+'public/css/'+css+'.css?v=1.1" type="text/css" />');
		
		html = '<div id="'+this.widgetNodeID+'" class="publitweet">';
		
		if(this.showHeader)
		{
			html += '<div class="publitweet-header">							\n\
					<h3>'+this.title+'</h3>								\n\
					<h4>'+this.description+'</h4>						\n\
				</div>';
				
			/*
			html += '<div class="publitweet-header">							\n\
					<div class="publitweet-headerleft"> \n\
					<h3>'+this.title+'</h3>								\n\
					<h4>'+this.feed+'</h4>						\n\
					</div>\n\
					<div class="publitweet-headerright"> \n\
					Curated by '+this.curator.name+'<img src="'+this.curator.profile_image_url+'" border=0 />\n\
					</div>\n\
				</div>';
			*/

		} 
		
		if(this.tabs)
			html += '<div class="publitweet-tabs"><ul></ul></div>';

		html += '			<div class="publitweet-body">							\n\
								<div class="publitweet-loading">loading</div>		\n\
								<div class="featuredTweets">						\n\
								<h3 class="featuredTweets" style="display:none;">'+instance.localize('FeaturedTweets')+'</h3>	\n\
								<div class="timeline featured" id="'+this.featuredNodeID+'"> \n\
								\n\
								</div>												\n\
								</div>												\n\
								<div class="liveTweets">						\n\
								<h3 class="liveTweets" style="display:none;">'+instance.localize('LiveTweets')+'</h3>	\n\
								<div class="timeline" id="'+this.timelineNodeID+'">';
		
		document.write(html);
		
	}

	this.displayFooter = function() 
	{
		var html = '					</div>										\n\
									</div></div>';
		
		if(this.showFooter)
		{
			html += '<div class="publitweet-ft">							\n\
					<div class="publitweet-subscribe">			\n\
						';
			
			if(this.morePage!='')
			{
				html += '<a href="'+this.morePage+'" target="_parent pbtTrackEvent" event="MoreTweets">'+instance.localize('MoreTweets')+'</a>';
			}	
			else
			{
				html += '									\n\
							<span class="pbt-label">'+instance.localize('FollowThisFeed')+' </span>		\n\
																	\n\
							<a href="http://twitter.com/'+this.feed+'" target="_blank">		\n\
								 <img height="15" src="'+PUBLITWEET_BASE_URL+'public/img/twitter.png" alt="">\n\
							</a>';
			}
			html += '									\n\
					</div>										\n\
																\n\
					<span class="pbt-poweredby">										\n\
						<a href="http://publitweet.com" style="color: rgb(0, 0, 0);" target="_blank">\n\
							Publitweet				\n\
						</a>									\n\
					</span>										\n\
				</div>';
		}

		html += '</div>';

		document.write(html);
		
	}
	
	this.openProfile = function(screen_name)
	{
		if(screen_name.indexOf('/')>0)
		{
			status 		= screen_name.substr(screen_name.indexOf('/')+1);
			screen_name	= screen_name.substr(0,screen_name.indexOf('/'));
			
			this.current_status_id = status;
		}
		else
			this.current_status_id = null;
			
		if(this.tabs)
		{
			this.tabsController.add({
				'label' 	: instance.localize('ProfileOf')+' '+screen_name,
				'action'	: 'profile/'+screen_name,
				'callback'	: function() { instance.router.execute('#publitweet/'+instance.feed+'/profile/'+screen_name); },
				'closeable'	: true
			});

			this.tabsController.update();

			this.tabsController.selectTab('profile/'+screen_name);
		}
		
		this.loadProfile(screen_name);
	}
		
	this.slideSendEmail = function(node)
	{
		if(jQuery('#emailInput_window').size()==1)
		{
			return jQuery('#emailInput_window').slideUp('slow',function() {jQuery(this).remove()});
		}
		tweet_id = jQuery(node).attr('href');
		html = '<div id="emailInput_window" style="display:none;" tweet_id="'+tweet_id+'"> \n\
					<form id="form_sendEmail">\n\
					<div class="row"><label>'+instance.localize('SendTo')+'</label>	<input type="email" id="email_to" placeholder="'+instance.localize('SendToPlaceholder')+'" /></div>		\n\
					<div class="row"><label>'+instance.localize('SendFrom')+'</label>	<input type="email" id="email_from" placeholder="'+instance.localize('SendFromPlaceholder')+'" /></div> \n\
					<div class="row"><label>'+instance.localize('SendMsg')+'</label>	<textarea id="email_msg" cols=10 rows=4></textarea></div> \n\
					<div class="row clearleft"><input type="submit" value="'+instance.localize('Send')+'" id="submit_sendEmail" /> <input type="button" value="'+instance.localize('Cancel')+'" id="button_sendEmail_cancel"></div>	\n\
					</form>\n\
				</div>';
		n = jQuery(html);
		jQuery(node).parent().after(n);
		n.slideDown('slow');
		
		jQuery('#form_sendEmail').submit(function(e) {
			e.preventDefault();
			email_from 	= jQuery('#email_from').val();
			email_to	= jQuery('#email_to').val();
			msg			= jQuery('#email_msg').val();
			
			instance.tracker.trackEvent('SendEmail',email_from+':'+email_to);
			instance.xget(PUBLITWEET_BASE_URL+'sendemail.php?email_from='+email_from+'&email_to='+email_to+'&msg='+escape(msg)+'&feed='+instance.feed+'&tweet_id='+tweet_id);
			
			jQuery('#emailInput_window').slideUp('slow',function() {jQuery(this).remove()});
			return false;
		});
		
		jQuery('#button_sendEmail_cancel').click(function(e) {
			jQuery('#emailInput_window').slideUp('slow',function() {jQuery(this).remove()});
		});
	}
	
		this.setBehaviour = function(jNode)
		{
			jNode.find('a[event="ShareEmail"]').live('click',function(e) {
				e.preventDefault();
				instance.slideSendEmail(this);
				return false;
			});

			jNode.find('a[event="ShareFacebook"]').live('click',function(e) {
				e.preventDefault();
				t=(screen.height/2)-436;
				l=(screen.width/2)-626;
				url = jQuery(this).attr('href');
				window.open(url,'sharer','toolbar=0,status=0,width=626,height=436,top='+t+',left='+l);
				//instance.FBShare('Check this out!',{'name':'Test','href':url,'description':'This is the msg','media':[{'type':'image','src':'image.jpg','href':url}]},[{'text':'View the stream','href':PUBLITWEET_BASE_URL+instance.feed}]);
				return false;
			});

			if(!instance.iframe && instance.enableQuickView)
			{
				jNode.find('.iframe').live('mouseover',function() {
					jQuery(this).fancybox({
					'transitionIn'	: 'elastic',
					'transitionOut'	: 'elastic',
					'title'			: jQuery(this).attr('title'),
					'titlePosition'	: 'inside',	
					'width'			: 900,
					'height'		: 600
					});
				});

				jNode.find('.iframe.youtube').live('mouseover',function() {
					jQuery(this).fancybox({
							'padding'		: 0,
							'autoScale'		: false,
							'transitionIn'	: 'elastic',
							'transitionOut'	: 'elastic',
							'title'			: jQuery(this).attr('title'),
							'width'			: 680,
							'height'		: 495,
							'href'			: jQuery(this).attr('href').replace(new RegExp("watch\\?v=", "i"), 'v/'),
							'type'			: 'swf',
							'swf'			: {
							   	 'wmode'		: 'transparent',
								'allowfullscreen'	: 'true'
							}
						});
					});
			}

			jNode.find('a.pbtTrackEvent').live('click',function(e) {
				current_event = jQuery(this).attr('event');
				if(!current_event)
					current_event = 'link';

				instance.tracker.trackEvent(current_event,jQuery(this).attr('href'));
			});

			jNode.find('a[event="ShowProfile"]').live('click',function(e) {

				if(instance.profilePage!='')
				{
					//debug('Loading profile on twitter');
					return true;
				}

				e.preventDefault();
				screen_name = jQuery(this).attr('screen_name');
				instance.router.execute('#publitweet/'+instance.feed+'/profile/'+screen_name);
				return false;
			});

			if(this.actions)
			{
				jQuery.each(
					instance.actions,
					function(k,v) {
						jNode.find('a[event="'+k+'"]').live('click',function() {
							tweet_id = jQuery(this).attr('tweet_id');
							v.call(instance,instance.getTweet(tweet_id));
						})
					}
					);
			}

		}
	
	this.getTweet = function(tweet_id)
	{
		tweets = instance.tweets;
		for(var i = 0 ; i < tweets.length ; i ++)
		{
			if(tweets[i]._id == tweet_id)
				return tweets[i];
		}
		return false;
	}
	
	this.humanize = function(tweet)
	{
		tweet.human_content = tweet.content;
		tweet.human_content = tweet.human_content.replace(/#([a-z0-9]*)/ig,'<span class="hashtag">#$1</span>');
		tweet.human_content = tweet.human_content.replace(/(http:\/\/\S+)/g, "<a href='$1' target='_new' class='pbtTrackEvent embedly'>$1</a>");

		/*
		if(tweet.metadata.mentions)
		{
			tweet.human_content = tweet.human_content.replace(/RT @([a-z_]){1,15} ?:? ?/ig,'');
			
			sources = '';
			for(var i in tweet.metadata.sources)
			{
				if(tweet.metadata.sources[i])
					sources += ', ' + '<a href="http://twitter.com/'+i+'" event="ShowMention" target="_blank" class="pbtTrackEvent" title="'+tweet.metadata.sources[i].name+' ('+tweet.metadata.sources[i].location+'): \r\n'+tweet.metadata.sources[i].description+'">'+tweet.metadata.sources[i].name + '</a>';
			}
			
			// We remove the short URL	
			if(this.showUrlMetadata)
			{
				jQuery.each(
					tweet.metadata.urls,
					function(k,v) 
					{
						tweet.human_content = tweet.human_content.replace(k,'');
					}
					);
			}
			else
			{
				tweet.human_content = tweet.human_content.replace(/(http:\/\/\S+)/g, "<a href='$1' target='_new' class='pbtTrackEvent embedly'>$1</a>");
			}
			

			if(sources != '')
			{
				tweet.human_content += ' (source: '+sources.substr(2)+')';
			}
			
			jQuery.each(
				tweet.metadata.mentions,
				function(k,v) 
				{
					if(v)
						tweet.human_content = tweet.human_content.replace('@'+k,'<a class="pbtTrackEvent mention" event="ShowMention" target="_blank" title="'+v.name+' ('+v.location+'): \r\n'+v.description+'" href="http://twitter.com/'+k+'"> '+instance.mentionSymbol+v.name+'</a>');
				}
				);
			
	
		}
		*/
		return tweet;
	}
	
	this.previewAvailable = function(domain)
	{
		// If the widget is in an iframe, then we cannot use preview :-(
		if(instance.iframe || !instance.enableQuickView)
			return false;
			
		for ( var i = 0 ; i < NO_PREVIEW.length ; i ++ )
		{
			if ( NO_PREVIEW[i] == domain.substr(domain.length-NO_PREVIEW[i].length) )
				return false;
		}
		return true;
	}
	
	// Url {url,img,shorturl,title,description,favicon}
	this.getAttachments = function(url)
	{
		attachments = '';
		
		if(!this.showUrlMetadata)
			return '';
		

		domain = url.url.replace(/^(http:\/\/)(www\.)?/i,'');
		domain = domain.replace(/\/.*/g,'');
		
		preview = '';
		
		if(instance.previewAvailable(domain))
			preview = '<a href="'+url.shorturl+'" event="preview" class="pbtTrackEvent iframe" title="'+url.title+'">['+instance.localize('QuickView')+']</a>';
			
		attachments += '<div class="attachment '+url.type+'">';
								
		if(url.img)
		{
			attachments += '<div class="attachment_img"><a href="'+url.shorturl+'" class="pbtTrackEvent';
			if(url.type=='video')
				attachments += ' youtube';
			attachments += '" target="_blank"><img class="thumbnail" src="'+url.img+'" /></a></div>';
		}
		else if(url.favicon)	
			attachments += '<div class="attachment_img favicon"><a href="'+url.shorturl+'" class="pbtTrackEvent" target="_blank"><img class="favicon" src="'+url.favicon+'" /></a></div>';
		else
			attachments += '<div class="attachment_img favicon" style="background:url(\'http://'+domain+'/favicon.ico\') no-repeat top left;"></div>';

//			attachments += '<div class="attachment_img favicon" style="background:url(\'http://'+domain+'/favicon.ico\') no-repeat top left;"><a href="'+url.url+'" class="pbtTrackEvent" target="_blank"><img class="favicon" src="'+url.favicon+'" /></a></div>';
			
		attachments += '	<div class="description_block">\n\
							<h3>\n\
								<a class="pbtTrackEvent" href="'+url.shorturl+'" target="_blank">'+url.title+'</a>\n\
								<div class="domain">'+domain+'\n\
									'+preview+'\n\
								</div>\n\
							</h3>\n\
							';
								
		if(instance.showUrlDescription && url.description != '' && url.description!=null)
		{
			attachments += '<div class="description">'+url.description+'</div>';
		}
		
		attachments += '	</div></div>';

		
		if(attachments!='')
			return '<div class="attachments">'+attachments+'</div>';
		else
			return '';
	}
	
	this.getActions = function(tweet)
	{
		tweet.permalink = PUBLITWEET_BASE_URL+'facebookshare.php?feed='+this.feed+'&screen_name='+tweet.user.screen_name+'&tweet_id='+tweet._id;
		
		retweet_content = 'RT @'+tweet.user.screen_name+' '+tweet.content;		
		if((retweet_content+this.signature).length <= 139)
			retweet_content += ' '+this.signature;
		
		actions = '';
		actions += '<div class="publitweet-actions">';
		if(instance.actions)
		{
			actions += '<div class="custom_actions">';
			jQuery.each(
				instance.actions,
				function(k,v) {
					actions += '<a event="'+k+'" href="#" tweet_id="'+tweet._id+'" class="pbtTrackEvent publitweet-action">'+k+'</a> ';
				}
				);
			actions += '</div>';
		}
		actions += '<label>'+instance.localize('ShareThisTweet')+'</label> \n\
		<a event="ShareTwitter" href="http://twitter.com/?status='+escape(retweet_content)+'" class="pbtTrackEvent publitweet-action ShareTwitter" target="_blank" title="'+instance.localize('ShareTwitter')+'"> </a>';
		
//		<a event="ShareFacebook" href="http://facebook.com/sharer.php?u='+encodeURIComponent(tweet.permalink)+'&t='+encodeURIComponent(tweet.content)+'" class="ShareFacebook pbtTrackEvent publitweet-action" target="_blank" title="'+instance.localize('ShareFacebook')+'"> </a>';
		
//		actions += '<a event="ShareEmail" href="'+tweet._id+'" class="pbtTrackEvent publitweet-action ShareEmail" target="_blank" title="'+instance.localize('ShareEmail')+'"> </a>';
		actions += '</div>';
//			<a name="fb_share" type="icon" share_url="YOUR_URL"></a> 

		return actions;	
	}
	
	this.showTweet = function(tweet,options)
	{
//		attachments 	= this.getAttachments(tweet);
		attachments 	= '';
		tweet 			= this.humanize(tweet);
		actions			= this.getActions(tweet);
		
		tweet.controller = new Object();
		
		//tweet.controller.annotation = new Annotation(tweet);
		
		if(!options)
			options = {};
			
		//  style="background:url(\''+url.favicon+'\') no-repeat top left;"
		
		(tweet._id==this.current_status_id) ? highlight_class = 'highlight' : highlight_class = '';
		
		if(tweet.featured)
			highlight_class += ' featured';
		
		//debug('tweet',tweet);
		
		var html = '<div id="tweet-'+tweet._id+'" class="publitweet-tweet '+highlight_class+' '+options.className+'" style="opacity: 1;'+options.style+'"> \n\
						<div class="publitweet-tweet-wrap">';

		if(options.className=='sponsored') {
			html += '<div class="sponsoredLabel">'+instance.localize('sponsored')+'</div>';
		}
		if(this.feed.indexOf('/')>0)
		{
			html += '			<div class="publitweet-avatar">           \n\
									<div class="publitweet-img">			 \n\
										<a event="ShowProfile" screen_name="'+tweet.user.screen_name+'" href="'+this.profilePage+tweet.user.screen_name+'" class="" target="_top" title="'+tweet.user.name+' ('+tweet.user.location+'): \r\n'+tweet.user.description+'">	\n\
											<img src="'+tweet.user.avatar+'" alt="'+tweet.user.screen_name+' profile">	\n\
										</a>							\n\
									</div>								 \n\
								</div>';
			html += '       	<div class="publitweet-tweet-content">';
		}
		else
			html += '       	<div class="publitweet-tweet-content" style="margin-left:5px !important">';

		if(this.feed.indexOf('/')>0)
			html += '					<a class="publitweet-author" href="'+this.profilePage+tweet.user.screen_name+'" screen_name="'+tweet.user.screen_name+'" event="ShowProfile" target="_top" title="'+tweet.user.name+' ('+tweet.user.location+'): \r\n'+tweet.user.description+'">'+tweet.user.name+'</a>';
		html += '					'+tweet.human_content+'			           \n\
							</div>												  \n\
							'+attachments+'\n\
							<div class="metadata">		\n\
								<div class="timesince"> \n\
									<a href="http://twitter.com/'+tweet.user.screen_name+'/status/'+tweet._id+'" class="pbtTrackEvent publitweet-timestamp" target="_blank">\n\
									'+instance.timesince(tweet.ts)+'\n\
									</a> \n\
								</div> \n\
							</div> \n\
							'+actions+'\n\
				       </div>		\n\
					</div>';
		
		tweet.html = html;
		tweet.node = jQuery(tweet.html);

		if(tweet.featured)
		{
			instance.featuredTweets.add(tweet);
		}
		else
		{
			if(options.position=='prepend')
				jQuery('#'+this.timelineNodeID).prepend(tweet.node);
			else
				jQuery('#'+this.timelineNodeID).append(tweet.node);
		}
		
		//tweet.controller.annotation.show();	

		// We show the share actions here to make sure they don't mess up during the animation
		tweet.node.find('div.publitweet-actions').css('display','block');
	}
	
	
	this.timesince = function(h)
	{
			var j=new Date();
			var f=new Date(h*1000);

			//if(B.ie) { f = Date.parse(h.replace(/( \+)/," UTC$1")) }

			var i=j-f;
			var c=1000,d=c*60,e=d*60,g=e*24,b=g*7;

			if(isNaN(i)||i<0){return""}
			if(i<c*7){return instance.localize('RightNow'); }
			if(i<d){return instance.localize('timesince_before') + ' ' + Math.floor(i/c) + " " + instance.localize('seconds') + ' ' + instance.localize('timesince_after'); }
			if(i<d*2){return instance.localize('timesince_before') + " 1 " + instance.localize('minute') + " " + instance.localize('timesince_after')}
			if(i<e){return instance.localize('timesince_before') + ' ' +Math.floor(i/d)+" "+instance.localize('minutes')+" "+instance.localize('timesince_after')}
			if(i<e*2){return instance.localize('timesince_before') + " 1 "+instance.localize('hour')+" "+instance.localize('timesince_after')}
			if(i<g){return instance.localize('timesince_before') + ' '+Math.floor(i/e)+" "+instance.localize('hours')+" "+instance.localize('timesince_after')}
			if(i>g&&i<g*2){return instance.localize('yesterday')}
			if(i<g*365){return instance.localize('timesince_before') + ' '+Math.floor(i/g)+" "+instance.localize('days')+" "+instance.localize('timesince_after')}
			else{return instance.localize('timesince_before') + ' '+instance.localize('MoreThanAYear')}
	}
	
	this.createCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	this.readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	this.eraseCookie = function(name) {
		createCookie(name,"",-1);
	}
	
}

/*
function Annotation(tweet) {
	
	var instance = this;

	this.feed = '';
	
	this.tweet = tweet;
	this.node;
	this.editing = false;

	if(!tweet.annotation || !typeof tweet.annotation.content=='string')
		this.content = '';
	else
		this.content = tweet.content;
		
	html = '<div class="publitweet-annotation"> \n\
			'+this.content+'\n\
			</div>';

	this.node = jQuery(html);
	
	this.containerID = 'div.publitweet #tweet-'+tweet._id;
	
	this.edit = function() {
		html = '<div id="annotation_edit" style="display:none;"> \n\
				<form id="annotationSlide_form"> \n\
				<textarea id="annotation_text" cols=20 rows=2>'+this.content+'</textarea>\n\
				</form>\n\
				</div>';
				
		this.node.html(html);
		
		this.editing = true;
		
		this.behaviour();
	}
	
	this.behaviour = function() {
		
		if(this.editing)
		{
			this.node.find('textarea').blur(function() {
				content = jQuery(this).val();
				instance.save(content);
				return false;
			});
		}
		else 
		{
			this.node.click(function() {
				instance.edit(instance.tweet);
			});
		}
		
	}
	
	this.save = function(annotation_content) {
		this.content = annotation_content;
		jQuery.getJSON(PUBLITWEET_BASE_URL+'proxyapi.php?feed='+instance.feed+'&method=annotate&tweet_id='+tweet._id+'&text='+this.content);
		this.node.html(annotation_content);
	}
	
	this.show = function() {
		//debug('Prepending ',jQuery(this.containerID));
		jQuery('#'+this.containerID).prepend(instance.node);
		this.behaviour();
	}
	
}
*/

function FeaturedTweets() {
	
	var instance = this;
	
	this.tweets = new Array();
	
	this.limit = 2;
	this.containerNodeID;
	
	this.add = function(tweet) {
		tweet.featured=true;
		this.tweets.push(tweet);
	
		this.tweets.sort(function(a,b) {
			return (a._id < b._id);
		});
	
		tweet.node = jQuery(tweet.html);
	
		jQuery(this.containerNodeID).prepend(tweet.node);
		if(tweet.node.find('.publitweet-actions a[event="Feature"]').size()>0)
			tweet.node.find('.publitweet-actions a[event="Feature"]').html(tweet.node.find('.publitweet-actions a[event="Feature"]').html().replace(/Feature/g,'Unfeature'));
		tweet.node.addClass('featured');
		tweet.node.find('div.publitweet-actions').css('display','block');
	
		debug('Adding tweet to featuredTweets',tweet);
		this._showHeaders();
	}
	
	this.remove = function(tweet) {
		
		twts = new Array();
		for (var i = 0 ; i < instance.tweets.length ; i++)
		{
			if(instance.tweets[i]._id != tweet._id)
			{
				twts.push(tweet);
			}
		}
				
		tweet.featured=false;		
		tweet.node.fadeOut('slow');
		if(tweet.node.find('.publitweet-actions a[event="Feature"]').size()>0)
			tweet.node.find('.publitweet-actions a[event="Feature"]').html(tweet.node.find('.publitweet-actions a[event="Feature"]').html().replace(/Unfeature/g,'Feature'));
		tweet.node.removeClass('featured');
		tweet.node.remove();

		instance.tweets = twts;
		
		if(this.tweets.length==0)
			this._showHeaders();
	}
	
	this._showHeaders = function() {
		
		debug('_showHeaders',this.tweets.length);
		if(this.tweets.length>0)
		{
			jQuery('div.publitweet h3.featuredTweets').show();
			jQuery('div.publitweet h3.liveTweets').show();
		}
		else
		{
			jQuery('div.publitweet h3.featuredTweets').hide();
			jQuery('div.publitweet h3.liveTweets').hide();
		}
	}
	
	this.show = function() {

		this._showHeaders();

		limit = Math.min(instance.tweets.length,this.limit);

		for (var i = 0 ; i < limit ; i++)
		{
			this.add(instance.tweets[i]);
		}
	}
	
	this.update = function() {
		
	}
	
	this.next = function() {
		
	}
	
	this.previous = function() {
		
	}
	
}

function debug(msg,obj) {
	
	if(!DEBUG)
		return false;

	if(!obj)
		obj = '';

	if(window.console)
		console.info(msg,obj);
	
}

;(function() {
	
	Tweet = function(tweet) {
		
		if(!tweet.user)
		{
			tweet.user = {
				'screen_name' 		: tweet.from_user,
				'profile_image_url'	: tweet.profile_image_url
			};
		}
		
		this._id		= tweet.id;
		this.user		= tweet.user;
		this.user.avatar= tweet.user.profile_image_url;
		this.content	= tweet.text;
		this.source		= tweet.source;
		this.ts 		= (new Date(tweet.created_at)).getTime()/1000;
		this.type		= '';
		this.metadata 	= {};
		
		//debug('new tweet',this);
		
	}
	
})();

PUBLITWEET_LOADED = true;
} // end of if(!PUBLITWEET_LOADED)

