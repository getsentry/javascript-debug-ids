(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&d(t)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const p="modulepreload",y=function(u){return"/"+u},a={},g=function(i,c,d){let e=Promise.resolve();if(c&&c.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),o=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));e=Promise.allSettled(c.map(n=>{if(n=y(n),n in a)return;a[n]=!0;const l=n.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${f}`))return;const s=document.createElement("link");if(s.rel=l?"stylesheet":p,l||(s.as="script"),s.crossOrigin="",s.href=n,o&&s.setAttribute("nonce",o),document.head.appendChild(s),l)return new Promise((m,h)=>{s.addEventListener("load",m),s.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${n}`)))})}))}function r(t){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=t,window.dispatchEvent(o),!o.defaultPrevented)throw t}return e.then(t=>{for(const o of t||[])o.status==="rejected"&&r(o.reason);return i().catch(r)})};console.log("do nothing");g(()=>import("./another-CR7-3Cjc.js"),[]);
//# debugId=8a4b9b46-753c-432e-8cde-de2454981c55