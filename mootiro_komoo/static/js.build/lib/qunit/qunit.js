/**
 * QUnit v1.7.0pre - A JavaScript Unit Testing Framework
 *
 * http://docs.jquery.com/QUnit
 *
 * Copyright (c) 2012 John Resig, Jörn Zaefferer
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * or GPL (GPL-LICENSE.txt) licenses.
 */

/**
 * jsDump Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com |
 * http://flesler.blogspot.com Licensed under BSD
 * (http://www.opensource.org/licenses/bsd-license.php) Date: 5/15/2008
 *
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */

/*
 * Javascript Diff Algorithm
 *  By John Resig (http://ejohn.org/)
 *  Modified by Chu Alan "sprite"
 *
 * Released under the MIT license.
 *
 * More Info:
 *  http://ejohn.org/projects/javascript-diff-algorithm/
 *
 * Usage: QUnit.diff(expected, actual)
 *
 * QUnit.diff( "the quick brown fox jumped over", "the quick fox jumps over" ) == "the  quick <del>brown </del> fox <del>jumped </del><ins>jumps </ins> over"
 */

(function(e){function u(e,t,n,r,i){this.name=e,this.testName=t,this.expected=n,this.async=r,this.callback=i,this.assertions=[]}function a(){n.autorun=!0,n.currentModule&&S("moduleDone",t,{name:n.currentModule,failed:n.moduleStats.bad,passed:n.moduleStats.all-n.moduleStats.bad,total:n.moduleStats.all});var e,r,i=w("qunit-banner"),s=w("qunit-tests"),u=+(new Date)-n.started,a=n.stats.all-n.stats.bad,f=["Tests completed in ",u," milliseconds.<br/>","<span class='passed'>",a,"</span> tests of <span class='total'>",n.stats.all,"</span> passed, <span class='failed'>",n.stats.bad,"</span> failed."].join("");i&&(i.className=n.stats.bad?"qunit-fail":"qunit-pass"),s&&(w("qunit-testresult").innerHTML=f),n.altertitle&&typeof document!="undefined"&&document.title&&(document.title=[n.stats.bad?"✖":"✔",document.title.replace(/^[\u2714\u2716] /i,"")].join(" "));if(n.reorder&&o.sessionStorage&&n.stats.bad===0)for(e=0;e<sessionStorage.length;e++)r=sessionStorage.key(e++),r.indexOf("qunit-test-")===0&&sessionStorage.removeItem(r);S("done",t,{failed:n.stats.bad,passed:a,total:n.stats.all,runtime:u})}function f(e){var t,r=n.filter,i=!1;return r?(t=r.charAt(0)==="!",t&&(r=r.slice(1)),e.indexOf(r)!==-1?!t:(t&&(i=!0),i)):!0}function l(e,t){t=t||3;var n;if(e.stacktrace)return e.stacktrace.split("\n")[t+3];if(e.stack)return n=e.stack.split("\n"),/^error$/i.test(n[0])&&n.shift(),n[t];if(e.sourceURL){if(/qunit.js$/.test(e.sourceURL))return;return e.sourceURL+":"+e.line}}function c(e){try{throw new Error}catch(t){return l(t,e)}}function h(e){return e?(e+="",e.replace(/[\&<>]/g,function(e){switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";default:return e}})):""}function p(e,t){n.queue.push(e),n.autorun&&!n.blocking&&d(t)}function d(t){function r(){d(t)}var i=(new Date).getTime();n.depth=n.depth?n.depth+1:1;while(n.queue.length&&!n.blocking){if(!(!o.setTimeout||n.updateRate<=0||(new Date).getTime()-i<n.updateRate)){e.setTimeout(r,13);break}n.queue.shift()()}n.depth--,t&&!n.blocking&&!n.queue.length&&n.depth===0&&a()}function v(){n.pollution=[];if(n.noglobals)for(var t in e){if(!s.call(e,t)||/^qunit-test-output/.test(t))continue;n.pollution.push(t)}}function m(e){var r,i,s=n.pollution;v(),r=g(n.pollution,s),r.length>0&&t.pushFailure("Introduced global variable(s): "+r.join(", ")),i=g(s,n.pollution),i.length>0&&t.pushFailure("Deleted global variable(s): "+i.join(", "))}function g(e,t){var n,r,i=e.slice();for(n=0;n<i.length;n++)for(r=0;r<t.length;r++)if(i[n]===t[r]){i.splice(n,1),n--;break}return i}function y(t,n){for(var r in n)if(n[r]===undefined)delete t[r];else if(r!=="constructor"||t!==e)t[r]=n[r];return t}function b(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):n()}function w(e){return typeof document!="undefined"&&!!document&&!!document.getElementById&&document.getElementById(e)}function E(e){return function(t){n[e].push(t)}}function S(e,r,i){var s,o;if(t.hasOwnProperty(e))t[e].call(r,i);else{o=n[e];for(s=0;s<o.length;s++)o[s].call(r,i)}}function x(e){var t,n,r="";for(t=0;e[t];t++)n=e[t],n.nodeType===3||n.nodeType===4?r+=n.nodeValue:n.nodeType!==8&&(r+=x(n.childNodes));return r}function T(e,t){if(t.indexOf)return t.indexOf(e);for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1}var t,n,r=0,i=Object.prototype.toString,s=Object.prototype.hasOwnProperty,o={setTimeout:typeof e.setTimeout!="undefined",sessionStorage:function(){var e="qunit-test-string";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}()};u.prototype={init:function(){var e,n,i,s=w("qunit-tests");s&&(n=document.createElement("strong"),n.innerHTML=this.name,e=document.createElement("a"),e.innerHTML="Rerun",e.href=t.url({filter:x([n]).replace(/\([^)]+\)$/,"").replace(/(^\s*|\s*$)/g,"")}),i=document.createElement("li"),i.appendChild(n),i.appendChild(e),i.className="running",i.id=this.id="qunit-test-output"+r++,s.appendChild(i))},setup:function(){this.module!==n.previousModule?(n.previousModule&&S("moduleDone",t,{name:n.previousModule,failed:n.moduleStats.bad,passed:n.moduleStats.all-n.moduleStats.bad,total:n.moduleStats.all}),n.previousModule=this.module,n.moduleStats={all:0,bad:0},S("moduleStart",t,{name:this.module})):n.autorun&&S("moduleStart",t,{name:this.module}),n.current=this,this.testEnvironment=y({setup:function(){},teardown:function(){}},this.moduleTestEnvironment),S("testStart",t,{name:this.testName,module:this.module}),t.current_testEnvironment=this.testEnvironment,n.pollution||v();if(n.notrycatch){this.testEnvironment.setup.call(this.testEnvironment);return}try{this.testEnvironment.setup.call(this.testEnvironment)}catch(e){t.pushFailure("Setup failed on "+this.testName+": "+e.message,l(e,1))}},run:function(){n.current=this;var e=w("qunit-testresult");e&&(e.innerHTML="Running: <br/>"+this.name),this.async&&t.stop();if(n.notrycatch){this.callback.call(this.testEnvironment);return}try{this.callback.call(this.testEnvironment)}catch(r){t.pushFailure("Died on test #"+(this.assertions.length+1)+": "+r.message,l(r,1)),v(),n.blocking&&t.start()}},teardown:function(){n.current=this;if(n.notrycatch){this.testEnvironment.teardown.call(this.testEnvironment);return}try{this.testEnvironment.teardown.call(this.testEnvironment)}catch(e){t.pushFailure("Teardown failed on "+this.testName+": "+e.message,l(e,1))}m()},finish:function(){n.current=this,this.expected!=null&&this.expected!=this.assertions.length?t.pushFailure("Expected "+this.expected+" assertions, but "+this.assertions.length+" were run",this.stack):this.expected==null&&!this.assertions.length&&t.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack);var r,i,s,u,a,f,l=0,c=0,h=w("qunit-tests");n.stats.all+=this.assertions.length,n.moduleStats.all+=this.assertions.length;if(h){f=document.createElement("ol");for(u=0;u<this.assertions.length;u++)r=this.assertions[u],a=document.createElement("li"),a.className=r.result?"pass":"fail",a.innerHTML=r.message||(r.result?"okay":"failed"),f.appendChild(a),r.result?l++:(c++,n.stats.bad++,n.moduleStats.bad++);t.config.reorder&&o.sessionStorage&&(c?sessionStorage.setItem("qunit-test-"+this.module+"-"+this.testName,c):sessionStorage.removeItem("qunit-test-"+this.module+"-"+this.testName)),c===0&&(f.style.display="none"),s=document.createElement("strong"),s.innerHTML=this.name+" <b class='counts'>(<b class='failed'>"+c+"</b>, <b class='passed'>"+l+"</b>, "+this.assertions.length+")</b>",b(s,"click",function(){var e=s.nextSibling.nextSibling,t=e.style.display;e.style.display=t==="none"?"block":"none"}),b(s,"dblclick",function(n){var r=n&&n.target?n.target:e.event.srcElement;if(r.nodeName.toLowerCase()=="span"||r.nodeName.toLowerCase()=="b")r=r.parentNode;e.location&&r.nodeName.toLowerCase()==="strong"&&(e.location=t.url({filter:x([r]).replace(/\([^)]+\)$/,"").replace(/(^\s*|\s*$)/g,"")}))}),a=w(this.id),a.className=c?"fail":"pass",a.removeChild(a.firstChild),i=a.firstChild,a.appendChild(s),a.appendChild(i),a.appendChild(f)}else for(u=0;u<this.assertions.length;u++)this.assertions[u].result||(c++,n.stats.bad++,n.moduleStats.bad++);S("testDone",t,{name:this.testName,module:this.module,failed:c,passed:this.assertions.length-c,total:this.assertions.length}),t.reset()},queue:function(){function r(){p(function(){n.setup()}),p(function(){n.run()}),p(function(){n.teardown()}),p(function(){n.finish()})}var e,n=this;p(function(){n.init()}),e=t.config.reorder&&o.sessionStorage&&+sessionStorage.getItem("qunit-test-"+this.module+"-"+this.testName),e?r():p(r,!0)}},t={module:function(e,t){n.currentModule=e,n.currentModuleTestEnviroment=t},asyncTest:function(e,n,r){arguments.length===2&&(r=n,n=null),t.test(e,n,r,!0)},test:function(e,t,r,i){var s,o="<span class='test-name'>"+h(e)+"</span>";arguments.length===2&&(r=t,t=null),n.currentModule&&(o="<span class='module-name'>"+n.currentModule+"</span>: "+o);if(!f(n.currentModule+": "+e))return;s=new u(o,e,t,i,r),s.module=n.currentModule,s.moduleTestEnvironment=n.currentModuleTestEnviroment,s.stack=c(2),s.queue()},expect:function(e){n.current.expected=e},ok:function(e,r){if(!n.current)throw new Error("ok() assertion outside test context, was "+c(2));e=!!e;var i,s={result:e,message:r};r=h(r||(e?"okay":"failed")),r="<span class='test-message'>"+r+"</span>",e||(i=c(2),i&&(s.source=i,r+="<table><tr class='test-source'><th>Source: </th><td><pre>"+h(i)+"</pre></td></tr></table>")),S("log",t,s),n.current.assertions.push({result:e,message:r})},equal:function(e,n,r){t.push(n==e,e,n,r)},notEqual:function(e,n,r){t.push(n!=e,e,n,r)},deepEqual:function(e,n,r){t.push(t.equiv(e,n),e,n,r)},notDeepEqual:function(e,n,r){t.push(!t.equiv(e,n),e,n,r)},strictEqual:function(e,n,r){t.push(n===e,e,n,r)},notStrictEqual:function(e,n,r){t.push(n!==e,e,n,r)},raises:function(e,r,i){var s,o=!1;typeof r=="string"&&(i=r,r=null);try{e.call(n.current.testEnvironment)}catch(u){s=u}s&&(r?t.objectType(r)==="regexp"?o=r.test(s):s instanceof r?o=!0:r.call({},s)===!0&&(o=!0):o=!0),t.ok(o,i)},start:function(t){n.semaphore-=t||1;if(n.semaphore>0)return;n.semaphore<0&&(n.semaphore=0),o.setTimeout?e.setTimeout(function(){if(n.semaphore>0)return;n.timeout&&clearTimeout(n.timeout),n.blocking=!1,d(!0)},13):(n.blocking=!1,d(!0))},stop:function(r){n.semaphore+=r||1,n.blocking=!0,n.testTimeout&&o.setTimeout&&(clearTimeout(n.timeout),n.timeout=e.setTimeout(function(){t.ok(!1,"Test timed out"),n.semaphore=1,t.start()},n.testTimeout))}},function(){function e(){}e.prototype=t,t=new e,t.constructor=e}(),t.equals=function(){t.push(!1,!1,!1,"QUnit.equals has been deprecated since 2009 (e88049a0), use QUnit.equal instead")},t.same=function(){t.push(!1,!1,!1,"QUnit.same has been deprecated since 2009 (e88049a0), use QUnit.deepEqual instead")},n={queue:[],blocking:!0,hidepassed:!1,reorder:!0,altertitle:!0,urlConfig:["noglobals","notrycatch"],begin:[],done:[],log:[],testStart:[],testDone:[],moduleStart:[],moduleDone:[]},function(){var r,i=e.location||{search:"",protocol:"file:"},s=i.search.slice(1).split("&"),o=s.length,u={},a;if(s[0])for(r=0;r<o;r++)a=s[r].split("="),a[0]=decodeURIComponent(a[0]),a[1]=a[1]?decodeURIComponent(a[1]):!0,u[a[0]]=a[1];t.urlParams=u,n.filter=u.filter,t.isLocal=i.protocol==="file:"}(),typeof exports=="undefined"&&(y(e,t),e.QUnit=t),y(t,{config:n,init:function(){y(n,{stats:{all:0,bad:0},moduleStats:{all:0,bad:0},started:+(new Date),updateRate:1e3,blocking:!1,autostart:!0,autorun:!1,filter:"",queue:[],semaphore:0});var e,t,r,i=w("qunit");i&&(i.innerHTML="<h1 id='qunit-header'>"+h(document.title)+"</h1>"+"<h2 id='qunit-banner'></h2>"+"<div id='qunit-testrunner-toolbar'></div>"+"<h2 id='qunit-userAgent'></h2>"+"<ol id='qunit-tests'></ol>"),e=w("qunit-tests"),t=w("qunit-banner"),r=w("qunit-testresult"),e&&(e.innerHTML=""),t&&(t.className=""),r&&r.parentNode.removeChild(r),e&&(r=document.createElement("p"),r.id="qunit-testresult",r.className="result",e.parentNode.insertBefore(r,e),r.innerHTML="Running...<br/>&nbsp;")},reset:function(){var t;e.jQuery?jQuery("#qunit-fixture").html(n.fixture):(t=w("qunit-fixture"),t&&(t.innerHTML=n.fixture))},triggerEvent:function(e,t,n){document.createEvent?(n=document.createEvent("MouseEvents"),n.initMouseEvent(t,!0,!0,e.ownerDocument.defaultView,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(n)):e.fireEvent&&e.fireEvent("on"+t)},is:function(e,n){return t.objectType(n)==e},objectType:function(e){if(typeof e=="undefined")return"undefined";if(e===null)return"null";var t=i.call(e).match(/^\[object\s(.*)\]$/)[1]||"";switch(t){case"Number":if(isNaN(e))return"nan";return"number";case"String":case"Boolean":case"Array":case"Date":case"RegExp":case"Function":return t.toLowerCase()}return typeof e=="object"?"object":undefined},push:function(e,r,i,s){if(!n.current)throw new Error("assertion outside test context, was "+c());var o,u,a={result:e,message:s,actual:r,expected:i};s=h(s)||(e?"okay":"failed"),s="<span class='test-message'>"+s+"</span>",o=s,e||(i=h(t.jsDump.parse(i)),r=h(t.jsDump.parse(r)),o+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+i+"</pre></td></tr>",r!=i&&(o+="<tr class='test-actual'><th>Result: </th><td><pre>"+r+"</pre></td></tr>",o+="<tr class='test-diff'><th>Diff: </th><td><pre>"+t.diff(i,r)+"</pre></td></tr>"),u=c(),u&&(a.source=u,o+="<tr class='test-source'><th>Source: </th><td><pre>"+h(u)+"</pre></td></tr>"),o+="</table>"),S("log",t,a),n.current.assertions.push({result:!!e,message:o})},pushFailure:function(e,r){var i,s={result:!1,message:e};e=h(e)||"error",e="<span class='test-message'>"+e+"</span>",i=e,r&&(s.source=r,i+="<table><tr class='test-source'><th>Source: </th><td><pre>"+h(r)+"</pre></td></tr></table>"),S("log",t,s),n.current.assertions.push({result:!1,message:i})},url:function(n){n=y(y({},t.urlParams),n);var r,i="?";for(r in n){if(!s.call(n,r))continue;i+=encodeURIComponent(r)+"="+encodeURIComponent(n[r])+"&"}return e.location.pathname+i.slice(0,-1)},extend:y,id:w,addEvent:b}),y(t.constructor.prototype,{begin:E("begin"),done:E("done"),log:E("log"),testStart:E("testStart"),testDone:E("testDone"),moduleStart:E("moduleStart"),moduleDone:E("moduleDone")});if(typeof document=="undefined"||document.readyState==="complete")n.autorun=!0;t.load=function(){S("begin",t,{});var r,i,s,u,a,f,l,c,h,p,d="",v=y({},n);t.init(),y(n,v),n.blocking=!1,a=n.urlConfig.length;for(s=0;s<a;s++)p=n.urlConfig[s],n[p]=t.urlParams[p],d+="<label><input name='"+p+"' type='checkbox'"+(n[p]?" checked='checked'":"")+">"+p+"</label>";h=w("qunit-userAgent"),h&&(h.innerHTML=navigator.userAgent),r=w("qunit-header"),r&&(r.innerHTML="<a href='"+t.url({filter:undefined})+"'>"+r.innerHTML+"</a> "+d,b(r,"change",function(n){var r={};r[n.target.name]=n.target.checked?!0:undefined,e.location=t.url(r)})),c=w("qunit-testrunner-toolbar");if(c){i=document.createElement("input"),i.type="checkbox",i.id="qunit-filter-pass",b(i,"click",function(){var e,t=document.getElementById("qunit-tests");i.checked?t.className=t.className+" hidepass":(e=" "+t.className.replace(/[\n\t\r]/g," ")+" ",t.className=e.replace(/ hidepass /," ")),o.sessionStorage&&(i.checked?sessionStorage.setItem("qunit-filter-passed-tests","true"):sessionStorage.removeItem("qunit-filter-passed-tests"))});if(n.hidepassed||o.sessionStorage&&sessionStorage.getItem("qunit-filter-passed-tests"))i.checked=!0,l=document.getElementById("qunit-tests"),l.className=l.className+" hidepass";c.appendChild(i),u=document.createElement("label"),u.setAttribute("for","qunit-filter-pass"),u.innerHTML="Hide passed tests",c.appendChild(u)}f=w("qunit-fixture"),f&&(n.fixture=f.innerHTML),n.autostart&&t.start()},b(e,"load",t.load),e.onerror=function(e,n,r){t.config.current?t.pushFailure(e,n+":"+r):t.test("global failure",function(){t.pushFailure(e,n+":"+r)})},t.equiv=function(){function e(e,n,r){var i=t.objectType(e);if(i)return t.objectType(n[i])==="function"?n[i].apply(n,r):n[i]}var n,r=[],i=[],s=Object.getPrototypeOf||function(e){return e.__proto__},o=function(){function e(e,t){return e instanceof t.constructor||t instanceof e.constructor?t==e:t===e}return{string:e,"boolean":e,number:e,"null":e,"undefined":e,nan:function(e){return isNaN(e)},date:function(e,n){return t.objectType(e)==="date"&&n.valueOf()===e.valueOf()},regexp:function(e,n){return t.objectType(e)==="regexp"&&n.source===e.source&&n.global===e.global&&n.ignoreCase===e.ignoreCase&&n.multiline===e.multiline},"function":function(){var e=r[r.length-1];return e!==Object&&typeof e!="undefined"},array:function(e,r){var s,o,u,a;if(t.objectType(e)!=="array")return!1;u=r.length;if(u!==e.length)return!1;i.push(r);for(s=0;s<u;s++){a=!1;for(o=0;o<i.length;o++)i[o]===r[s]&&(a=!0);if(!a&&!n(r[s],e[s]))return i.pop(),!1}return i.pop(),!0},object:function(e,t){var o,u,a,f=!0,l=[],c=[];if(t.constructor===e.constructor||s(t)===null&&s(e)===Object.prototype||s(e)===null&&s(t)===Object.prototype){r.push(t.constructor),i.push(t);for(o in t){a=!1;for(u=0;u<i.length;u++)i[u]===t[o]&&(a=!0);l.push(o);if(!a&&!n(t[o],e[o])){f=!1;break}}r.pop(),i.pop();for(o in e)c.push(o);return f&&n(l.sort(),c.sort())}return!1}}}();return n=function(){var n=[].slice.apply(arguments);return n.length<2?!0:function(n,r){return n===r?!0:n===null||r===null||typeof n=="undefined"||typeof r=="undefined"||t.objectType(n)!==t.objectType(r)?!1:e(n,o,[r,n])}(n[0],n[1])&&arguments.callee.apply(this,n.splice(1,n.length-1))},n}(),t.jsDump=function(){function e(e){return'"'+e.toString().replace(/"/g,'\\"')+'"'}function n(e){return e+""}function r(e,t,n){var r=u.separator(),i=u.indent(),s=u.indent(1);return t.join&&(t=t.join(","+r+s)),t?[e,s+t,i+n].join(r):e+n}function s(e,t){var n=e.length,i=new Array(n);this.up();while(n--)i[n]=this.parse(e[n],undefined,t);return this.down(),r("[",i,"]")}var o=/^function (\w+)/,u={parse:function(e,t,n){n=n||[];var r,i,s=this.parsers[t||this.typeOf(e)];return t=typeof s,r=T(e,n),r!=-1?"recursion("+(r-n.length)+")":t=="function"?(n.push(e),i=s.call(this,e,n),n.pop(),i):t=="string"?s:this.parsers.error},typeOf:function(e){var n;return e===null?n="null":typeof e=="undefined"?n="undefined":t.is("RegExp",e)?n="regexp":t.is("Date",e)?n="date":t.is("Function",e)?n="function":typeof e.setInterval!==undefined&&typeof e.document!="undefined"&&typeof e.nodeType=="undefined"?n="window":e.nodeType===9?n="document":e.nodeType?n="node":i.call(e)==="[object Array]"||typeof e.length=="number"&&typeof e.item!="undefined"&&(e.length?e.item(0)===e[0]:e.item(0)===null&&typeof e[0]=="undefined")?n="array":n=typeof e,n},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&nbsp;":" "},indent:function(e){if(!this.multiline)return"";var t=this.indentChar;return this.HTML&&(t=t.replace(/\t/g,"   ").replace(/ /g,"&nbsp;")),(new Array(this._depth_+(e||0))).join(t)},up:function(e){this._depth_+=e||1},down:function(e){this._depth_-=e||1},setParser:function(e,t){this.parsers[e]=t},quote:e,literal:n,join:r,_depth_:1,parsers:{window:"[Window]",document:"[Document]",error:"[ERROR]",unknown:"[Unknown]","null":"null","undefined":"undefined","function":function(e){var n="function",i="name"in e?e.name:(o.exec(e)||[])[1];return i&&(n+=" "+i),n+="( ",n=[n,t.jsDump.parse(e,"functionArgs"),"){"].join(""),r(n,t.jsDump.parse(e,"functionCode"),"}")},array:s,nodelist:s,arguments:s,object:function(e,n){var i=[],s,o,u,a;t.jsDump.up();if(Object.keys)s=Object.keys(e);else{s=[];for(o in e)s.push(o)}s.sort();for(a=0;a<s.length;a++)o=s[a],u=e[o],i.push(t.jsDump.parse(o,"key")+": "+t.jsDump.parse(u,undefined,n));return t.jsDump.down(),r("{",i,"}")},node:function(e){var n,r,i=t.jsDump.HTML?"&lt;":"<",s=t.jsDump.HTML?"&gt;":">",o=e.nodeName.toLowerCase(),u=i+o;for(n in t.jsDump.DOMAttrs)r=e[t.jsDump.DOMAttrs[n]],r&&(u+=" "+n+"="+t.jsDump.parse(r,"attribute"));return u+s+i+"/"+o+s},functionArgs:function(e){var t,n=e.length;if(!n)return"";t=new Array(n);while(n--)t[n]=String.fromCharCode(97+n);return" "+t.join(", ")+" "},key:e,functionCode:"[code]",attribute:e,string:e,date:e,regexp:n,number:n,"boolean":n},DOMAttrs:{id:"id",name:"name","class":"className"},HTML:!1,indentChar:"  ",multiline:!0};return u}(),t.diff=function(){function e(e,t){var n,r={},i={};for(n=0;n<t.length;n++)r[t[n]]==null&&(r[t[n]]={rows:[],o:null}),r[t[n]].rows.push(n);for(n=0;n<e.length;n++)i[e[n]]==null&&(i[e[n]]={rows:[],n:null}),i[e[n]].rows.push(n);for(n in r){if(!s.call(r,n))continue;r[n].rows.length==1&&typeof i[n]!="undefined"&&i[n].rows.length==1&&(t[r[n].rows[0]]={text:t[r[n].rows[0]],row:i[n].rows[0]},e[i[n].rows[0]]={text:e[i[n].rows[0]],row:r[n].rows[0]})}for(n=0;n<t.length-1;n++)t[n].text!=null&&t[n+1].text==null&&t[n].row+1<e.length&&e[t[n].row+1].text==null&&t[n+1]==e[t[n].row+1]&&(t[n+1]={text:t[n+1],row:t[n].row+1},e[t[n].row+1]={text:e[t[n].row+1],row:n+1});for(n=t.length-1;n>0;n--)t[n].text!=null&&t[n-1].text==null&&t[n].row>0&&e[t[n].row-1].text==null&&t[n-1]==e[t[n].row-1]&&(t[n-1]={text:t[n-1],row:t[n].row-1},e[t[n].row-1]={text:e[t[n].row-1],row:n-1});return{o:e,n:t}}return function(t,n){t=t.replace(/\s+$/,""),n=n.replace(/\s+$/,"");var r,i,s="",o=e(t===""?[]:t.split(/\s+/),n===""?[]:n.split(/\s+/)),u=t.match(/\s+/g),a=n.match(/\s+/g);u==null?u=[" "]:u.push(" "),a==null?a=[" "]:a.push(" ");if(o.n.length===0)for(r=0;r<o.o.length;r++)s+="<del>"+o.o[r]+u[r]+"</del>";else{if(o.n[0].text==null)for(n=0;n<o.o.length&&o.o[n].text==null;n++)s+="<del>"+o.o[n]+u[n]+"</del>";for(r=0;r<o.n.length;r++)if(o.n[r].text==null)s+="<ins>"+o.n[r]+a[r]+"</ins>";else{i="";for(n=o.n[r].row+1;n<o.o.length&&o.o[n].text==null;n++)i+="<del>"+o.o[n]+u[n]+"</del>";s+=" "+o.n[r].text+a[r]+i}}return s}}(),typeof exports!="undefined"&&y(exports,t)})(function(){return this}.call());