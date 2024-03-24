!function(){"use strict";function e(e){switch(e){case"0":case"false":case!1:return!1;case"1":case"true":case!0:return!0;default:return Boolean(e)}}const t=window.matchMedia("(prefers-reduced-motion: reduce)");let o=!1;function r(){o="undefined"==typeof UxBuilder&&t.matches}r(),t.addEventListener?.("change",r);const s=".2";function n(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"boolean"==typeof t&&(t={processing:t});const{style:o="normal",position:r="",processing:n=!0}=t;let a;if("string"==typeof e?a=document.querySelector(e):e instanceof Element?a=e:e instanceof jQuery&&(a=e.get(0)),!a)return;if(!n){const e=a.querySelector(".ux-loader");return e&&e.remove(),void Array.from(a.children).forEach((e=>{e.style.opacity=""}))}"static"===window.getComputedStyle(a).position&&(a.style.position="relative");const i=function(e,t){const o=["ux-loader"];["normal","spotlight"].includes(e)&&o.push(`ux-loader--style-${e}`),["sticky"].includes(t)&&o.push(`ux-loader--position-${t}`);const r=document.createElement("div");r.className=o.join(" ");const s=document.createElement("div");s.className="ux-loader__inner";const n=document.createElement("div");return n.className="loading-spin centered",s.appendChild(n),r.appendChild(s),r}(o,r);a.insertAdjacentElement("afterbegin",i),Array.from(a.children).forEach((e=>{e!==i&&(e.style.opacity=s)}))}class a{constructor(){this.$body=jQuery(document.body),this.$body.hasClass("ux-pjax-js-attached")||(this.$archiveWooCommerce=jQuery(".archive.woocommerce"),this.ajaxXHR=null,this.params=this.getParams(),this.attach())}getParams(){const{selectors:t=[],elements:o=[],processing_elements:r={},scroll_to_top:s=!1,cache_bust:n=!1,timeout:a="5000"}=flatsomePjax||{};return{selectors:Array.isArray(t)?t:[],elements:Array.isArray(o)?o:[],processingConfigurations:this.normalizeObject({...r}),scrollToTop:e(s),cacheBust:e(n),timeout:parseInt(a,10)}}attach(){this.$body.on("price_slider_change",((e,t)=>this.onPriceSliderChange(e,t))),this.$body.on("click",this.params.selectors.join(", "),(e=>this.onClick(e))),this.$archiveWooCommerce.find(".woocommerce-ordering").off("change"),this.$archiveWooCommerce.on("change",".woocommerce-ordering",(e=>this.onOrderingChange(e))),this.$body.on("experimental-flatsome-pjax",((e,t,o)=>this.onFlatsomePjax(e,t,o))),this.$body.on("experimental-flatsome-pjax-before-replace-elements",((e,t,o)=>this.onBeforeElementsReplacement(e,t,o))),this.$body.on("experimental-flatsome-pjax-before-send-request",((e,t,o)=>this.onBeforeSendRequest(e,t,o))),this.$body.on("experimental-flatsome-pjax-request-done",((e,t,o)=>this.onRequestDone(e,t,o))),window.addEventListener("popstate",(e=>this.onPopstate(e))),this.$body.addClass("ux-pjax-js-attached")}onPriceSliderChange(e,t){if(!this.$body.hasClass("ux-shop-ajax-filters"))return;const o=jQuery(".price_slider").closest("form").get(0),r=jQuery(o),s=r.attr("action")+"?"+r.serialize();this.$body.trigger("experimental-flatsome-pjax",s,jQuery(e.target))}onClick(e){const t=jQuery(e.currentTarget);let o,r;t.is("li")?(r=t.find("a"),o=r.attr("href")):(r=t,o=t.attr("href")),o&&(e.preventDefault(),this.$body.trigger("experimental-flatsome-pjax",o,r))}onOrderingChange(e){const t=jQuery(e.currentTarget),o=t.find(".orderby"),r=new URL(window.location.href),s=r.searchParams;s.set("orderby",o.val()),r.search=s.toString(),this.$body.trigger("experimental-flatsome-pjax",r.toString(),t)}onFlatsomePjax(e,t,o){this.ajaxXHR&&this.ajaxXHR.abort(),"?"===t.slice(-1)&&(t=t.slice(0,-1)),t=t.replace(/%2C/g,","),window.history.pushState(null,null,t),this.params.cacheBust&&(t+=(/[?&]/.test(t)?"&":"?")+(new Date).getTime());const r=this.params.scrollToTop&&0!==jQuery(window).scrollTop()?function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new Promise((o=>{jQuery.scrollTo(e,{...t,onAfter:()=>{requestAnimationFrame((()=>{o()}))}})}))}(0):Promise.resolve();this.$body.trigger("experimental-flatsome-pjax-before-send-request",[t,o]),this.ajaxXHR=jQuery.ajax({url:t,dataType:"html",timeout:this.params.timeout}).done((e=>{const o=()=>{this.$body.trigger("experimental-flatsome-pjax-before-replace-elements",[e,t]);const o=(new DOMParser).parseFromString(e,"text/html");o.body.classList.forEach((e=>{e.endsWith("-no-js")&&o.body.classList.remove(e)})),document.title=o.title,document.body.setAttribute("class",o.body.classList),this.params.elements.map((e=>[e,document.querySelector(e)])).forEach((e=>{let[t,r]=e;if(!r?.isConnected)return;Flatsome.detach(r);const s=o.querySelector(t);s?jQuery(r).replaceWith(s.outerHTML):r.remove()})),this.$body.trigger("experimental-flatsome-pjax-request-done",[e,t])};jQuery.when(r).then((()=>{o()}))})).fail(((e,o,r)=>{"timeout"===o?(console.error("Flatsome: the request for "+t+" timed out."),window.location=t):console.error("Flatsome: "+r)})),this.$body.trigger("experimental-flatsome-pjax-after-send-request",[t,o])}onPopstate(e){window.location.reload()}onBeforeSendRequest(e,t,o){jQuery.fn.magnificPopup&&jQuery.magnificPopup.close();for(const[e,t]of Object.entries(this.params.processingConfigurations))n(e,{...t.style?{style:t.style}:{},...t.position?{position:t.position}:{}})}onBeforeElementsReplacement(e,t,o){}onRequestDone(e,t,o){if(this.params.elements.forEach((e=>{Flatsome.attach(jQuery(e))})),this.stagger(),jQuery(document.body).trigger("init_price_filter"),jQuery("div.widget_shopping_cart_content").length&&jQuery(document.body).trigger("wc_fragment_refresh"),window.ga&&ga.loaded&&"function"==typeof ga){const e=document.createElement("a");e.href=o,ga("set","page",e.pathname),ga("send","pageview")}}stagger(){o||jQuery(".shop-container .products:not(.has-packery)").addClass("ux-stagger")}normalizeObject(e){const t=Object.entries(e).map((e=>{let[t,o]=e;return isNaN(t)?[t,o]:[o,{}]}));return Object.fromEntries(t)}}jQuery((()=>new a))}();