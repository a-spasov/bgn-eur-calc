(()=>{var E=(e,t)=>()=>(e&&(t=e(e=0)),t);var K=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var o,a,x=E(()=>{o={priceEur:document.getElementById("priceEur"),priceBgn:document.getElementById("priceBgn"),paidEur:document.getElementById("paidEur"),paidBgn:document.getElementById("paidBgn"),changeEur:document.getElementById("changeEur"),changeBgn:document.getElementById("changeBgn"),changeInputs:document.getElementById("changeInputs"),checklist:document.getElementById("inputsChecklist"),messageText:document.getElementById("messageText"),modePayment:document.getElementById("modePayment"),modeChange:document.getElementById("modeChange"),modeSlider:document.getElementById("modeSlider"),resetCalc:document.getElementById("resetCalc"),numpad:document.getElementById("numpad"),toggleNumpad:document.getElementById("toggleNumpad"),messageIcon:document.getElementById("messageIcon"),resultsLine:document.getElementById("resultsLine"),infoAside:document.getElementById("infoAside"),toggleAside:document.getElementById("toggleAside"),closeAside:document.getElementById("closeAside")},a={mode:"payment",rate:1.95583,keyboardVisible:!1,asideVisible:!1,inputs:{priceEur:null,priceBgn:null,paidEur:null,paidBgn:null,changeEur:null,changeBgn:null},activeInput:null,validation:{priceValid:!1,paidValid:!1,changeValid:!1}}});function N(e,t){let n=a.inputs[e],i=a.inputs[t],s=n?parseFloat(n.replace(",",".")):NaN,r=i?parseFloat(i.replace(",",".")):NaN;return isNaN(s)?isNaN(r)?null:r/a.rate:s}function O(){let e=parseFloat(a.inputs.paidEur),t=parseFloat(a.inputs.paidBgn);return isNaN(e)?isNaN(t)?"":`${t.toFixed(2)} \u043B\u0432.`:`${e.toFixed(2)} \u0435\u0432\u0440\u043E`}function A(){let e=N("priceEur","priceBgn"),t=N("paidEur","paidBgn");if(e===null||t===null)return null;let n=e-t,i=n*a.rate;return n<=0?{type:"warning",message:"\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0443\u043C\u0430 \u0437\u0430 \u043F\u043B\u0430\u0449\u0430\u043D\u0435 \u043F\u043E-\u043C\u0430\u043B\u043A\u0430 \u043E\u0442 \u043A\u0440\u0430\u0439\u043D\u0430\u0442\u0430 \u0446\u0435\u043D\u0430."}:{type:"result",priceEUR:e,priceBGN:e*a.rate,paidLabel:O(),remainingEUR:n,remainingBGN:i}}function v(){let e=N("priceEur","priceBgn");if(e===null)return null;let t=parseFloat(a.inputs.paidEur),n=parseFloat(a.inputs.paidBgn);if(isNaN(t)&&(t=null),isNaN(n)&&(n=null),t===null&&n===null)return null;let i=0;t!==null&&(i+=t),n!==null&&(i+=n/a.rate);let s=i-e,r=s*a.rate;return s<0?{type:"warning",message:"\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0435 \u043F\u043E-\u043C\u0430\u043B\u043A\u0430 \u043E\u0442 \u0446\u0435\u043D\u0430\u0442\u0430."}:{type:"change",priceEUR:e,priceBGN:e*a.rate,paidEur:t,paidBgn:n,totalChangeEUR:s,totalChangeBGN:r,showAsterisk:t!==null&&n!==null}}var C=E(()=>{x()});function j(e){e.addEventListener("focus",t=>{window.innerWidth<1024&&(t.preventDefault(),e.blur(),e.focus({preventScroll:!0}))})}function R(){Object.values(o).filter(e=>e?.tagName==="INPUT").forEach(j)}function T(){let{checklist:e,messageText:t}=o;if(!e||!t)return;e.innerHTML="";let n=a.mode==="payment";t.textContent=n?"\u0417\u0430 \u0434\u0430 \u0440\u0430\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043A\u043E\u043B\u043A\u043E \u0434\u0430 \u0434\u043E\u043F\u043B\u0430\u0442\u0438\u0442\u0435, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435:":"\u0417\u0430 \u0434\u0430 \u0440\u0430\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043A\u043E\u043B\u043A\u043E \u0434\u0430 \u0432\u044A\u0440\u043D\u0435\u0442\u0435, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435:",(n?["\u043E\u0431\u0449\u0430 \u0446\u0435\u043D\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432.","\u0447\u0430\u0441\u0442\u0438\u0447\u043D\u0430 \u043F\u043B\u0430\u0442\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432."]:["\u043E\u0431\u0449\u0430 \u0446\u0435\u043D\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432.","\u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438/\u0438\u043B\u0438 \u043B\u0432.","\u0447\u0430\u0441\u0442\u0438\u0447\u043D\u0430 \u0432\u044A\u0440\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0432 \u0435\u0432\u0440\u043E \u0438\u043B\u0438 \u043B\u0432. (\u0441\u0430\u043C\u043E \u0437\u0430 \u0441\u043C\u0435\u0441\u0435\u043D\u043E \u0440\u0435\u0441\u0442\u043E)"]).forEach((s,r)=>{let l=document.createElement("li");l.classList.add(`inputs-line-${r+1}`,"flex","items-center","justify-start","gap-2","my-1.5","leading-none");let c=document.createElement("span");c.className=`
            check-indicator inline-block
            size-3.5 rounded-full border border-current
            opacity-50
        `;let d=document.createElement("span");d.className="w-full max-w-13/14 sm:max-w-full",d.textContent=s,l.appendChild(c),l.appendChild(d),e.appendChild(l)})}function S(e){e.innerHTML="",e.className="check-indicator inline-block size-3.5 rounded-full border border-current opacity-50"}function q(e){e.className=`
        check-indicator inline-flex items-center justify-center 
        size-3.5 rounded-full bg-lime-600 text-white
    `,e.innerHTML='<i class="fa-solid fa-check text-[8px] leading-none"></i>'}function X(e){e.className=`
        check-indicator relative inline-flex items-center justify-center 
        size-3.5 rounded-full bg-red-600
    `,e.innerHTML=`
        <span class="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75"></span>
        <span class="relative block size-3.5 rounded-full bg-red-600"></span>
    `}function $(){if(window.innerWidth>=640)return;let e=document.getElementById("calcInputs");e&&e.scrollIntoView({behavior:"smooth",block:"start"})}function V(){document.addEventListener("show-notification",()=>{F(1,["priceEur","priceBgn"]),F(2,["paidEur","paidBgn"]),F(3,["changeEur","changeBgn"])})}function F(e,t){let n=document.querySelector(`.inputs-line-${e} .check-indicator`);if(!n)return;let[i,s]=t,r=a.inputs[i],l=a.inputs[s],c=a.validation[i]===!0,d=a.validation[s]===!0,u=!r,f=!l,g=!u&&!c,p=!f&&!d;if(u&&f){S(n);return}if(g||p){X(n);return}if(c&&(d||f)||d&&(c||u)){q(n);return}S(n)}function M(){let{modePayment:e,modeChange:t,modeSlider:n,changeInputs:i,numpad:s}=o,r=()=>window.innerWidth<640?"95%":"130px",l=["text-white","text-shadow-lg","cursor-default"],c=["text-slate-500","text-shadow-none","cursor-pointer"],d=p=>p.classList.add(...l)&p.classList.remove(...c),u=p=>p.classList.add(...c)&p.classList.remove(...l);function f(){a.mode="payment",L(),n.style.transform="translateX(0px)",d(e),u(t),i.classList.add("invisible","opacity-0","payment-mode"),s?.classList.contains("keyboard-on")&&setTimeout(()=>{let p=window.innerWidth;p<400?s.style.transform="translateY(-112px)":p>=400&&p<1536?s.style.transform="translateY(-88px)":p>=1536&&(s.style.transform="translateY(-92px)")},800),T()}function g(){a.mode="change",L(),n.style.transform=`translateX(${r()})`,d(t),u(e),s?.classList.contains("keyboard-on")?(s.style.transform="translateY(0)",setTimeout(()=>{i.classList.remove("invisible","opacity-0","payment-mode")},600)):i.classList.remove("invisible","opacity-0","payment-mode"),T()}e.addEventListener("click",f),t.addEventListener("click",g),f()}function U(){let{toggleNumpad:e,numpad:t}=o;window.innerWidth<1280&&(t.classList.add("keyboard-on"),t.classList.remove("xl:invisible","xl:opacity-0"),a.keyboardVisible=!0,a.mode==="payment"&&setTimeout(()=>{if(a.mode!=="payment"||!t.classList.contains("keyboard-on"))return;let n=window.innerWidth;n<400?t.style.transform="translateY(-112px)":n>=400&&n<1536?t.style.transform="translateY(-88px)":n>=1536&&(t.style.transform="translateY(-92px)")},0)),t.addEventListener("mousedown",n=>{n.target.closest("button")&&n.preventDefault()}),e.addEventListener("click",()=>{let n=a.mode==="payment";t.classList.contains("keyboard-on")?(t.classList.remove("keyboard-on"),t.classList.add("xl:invisible","xl:opacity-0"),t.style.transform="",a.keyboardVisible=!1):(t.classList.add("keyboard-on"),t.classList.remove("xl:invisible","xl:opacity-0"),a.keyboardVisible=!0,n&&setTimeout(()=>{if(a.mode!=="payment"||!t.classList.contains("keyboard-on"))return;let i=window.innerWidth;i<1536?t.style.transform="translateY(-88px)":i>=1536&&(t.style.transform="translateY(-92px)")},500))})}function P(){let{infoAside:e,toggleAside:t,closeAside:n}=o;if(!e||!t)return;let i=["shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]","dark:shadow-[0_0_0_9999px_rgba(255,255,255,0.05)]"],s="translate-x-full",r=()=>{a.asideVisible=!0,e.classList.remove(s),window.innerWidth<1280&&e.classList.add(...i)},l=()=>{a.asideVisible=!1,e.classList.add(s),e.classList.remove(...i)};document.addEventListener("click",c=>{if(window.innerWidth>=1280)return;let d=t.contains(c.target),u=n?.contains(c.target),f=e.contains(c.target);if(d){a.asideVisible?l():r();return}(u||a.asideVisible&&!f)&&l()}),window.addEventListener("resize",()=>{window.innerWidth>=1280?(a.asideVisible=!1,e.classList.remove(s,...i)):a.asideVisible||e.classList.add(s)})}function G(){let{resetCalc:e}=o;e&&e.addEventListener("click",()=>{if(L(),T(),window.history&&window.history.replaceState){let t=window.location.pathname;window.history.replaceState({},"",t)}})}function J(){o.priceEur.value="",o.priceBgn.value="",a.inputs.priceEur="",a.inputs.priceBgn="",a.validation.priceEur=!1,a.validation.priceBgn=!1,document.dispatchEvent(new CustomEvent("show-notification"))}function z(){let{numpad:e}=o;e&&e.addEventListener("click",t=>{let n=t.target.closest("button");if(!n||!a.activeInput)return;let i=a.activeInput,s=n.textContent.trim();if(n.querySelector(".fa-trash")?i.value=i.value.slice(0,-1):n.querySelector(".fa-rotate-left")?i.value="":i.value+=s,i.focus(),a.inputs[i.id]=i.value,(i.id==="priceEur"||i.id==="priceBgn")&&i.value===""){J();return}let r=y(i);i.dispatchEvent(new Event("input",{bubbles:!0}))})}function m(e){let t=document.getElementById("messageLine"),n=o.resultsLine;if(!t||!n)return;if(!e){t.classList.remove("opacity-0","pointer-events-none"),t.classList.add("opacity-100"),n.classList.remove("opacity-100"),n.classList.add("opacity-0","pointer-events-none"),n.innerHTML="";return}if(t.classList.remove("opacity-100"),t.classList.add("opacity-0","pointer-events-none"),n.classList.remove("opacity-0","pointer-events-none"),n.classList.add("opacity-100"),e.type==="warning"){n.innerHTML=`
        <div class="flex items-center gap-2 text-gray-500 dark:text-yellow-400 font-bold text-base">
            <span class="relative size-3.5 inline-flex items-center justify-center">
                <span class="absolute size-3.5 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span class="relative size-3.5 rounded-full bg-red-600"></span>
            </span>
            ${e.message}
        </div>`;return}if(e.type==="change"){let s=0;e.paidEur!==null&&(s+=e.paidEur),e.paidBgn!==null&&(s+=e.paidBgn/a.rate);let r=s*a.rate,l=`
        <div class="my-1">
        \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438:
        <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
            <span class="text-base">${s.toFixed(2)}</span> \u0435\u0432\u0440\u043E
        </span>
        <span class="ml-2">
            ( = <span class="font-bold text-orange-500 dark:text-orange-400"><span class="text-base">${r.toFixed(2)}</span> \u043B\u0432.</span> )
        </span>
        </div>
    `,c=`
        \u0426\u0435\u043D\u0430:
        <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
            <span class="text-base">${e.priceEUR.toFixed(2)}</span> \u0435\u0432\u0440\u043E
        </span>
        <span class="ml-2">
            ( = <span class="font-bold text-orange-500 dark:text-orange-400"><span class="text-base">${e.priceBGN.toFixed(2)}</span> \u043B\u0432.</span> )
        </span>
    `,d="";e.hasMixed?d=`
            <span class="absolute inset-0 bg-gray-200 dark:bg-slate-600 rounded-md z-0 -mx-2 -my-1 animate-pulse"></span>
            <span class="relative">
            \u0420\u0435\u0441\u0442\u043E: 
            <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${e.mixedEur.toFixed(2)}</span> \u0435\u0432\u0440\u043E
            </span>
            \u0438
            <span class="ml-1 font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${e.mixedBgn.toFixed(2)}</span> \u043B\u0432.
            </span>
            </span>
        `:d=`
            <span class="absolute inset-0 bg-gray-200 dark:bg-slate-600 rounded-md z-0 -mx-2 -my-1 animate-pulse"></span>
            <span class="relative">
            \u0420\u0435\u0441\u0442\u043E: 
            <span class="ml-2 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${Math.abs(e.totalChangeEUR).toFixed(2)}</span> \u0435\u0432\u0440\u043E
            </span>
            ( \u0438\u043B\u0438 
            <span class="font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${Math.abs(e.totalChangeBGN).toFixed(2)}</span> \u043B\u0432.
            </span>
            )
            </span>
        `,n.innerHTML=`
        <div class="text-sm">
            ${c}
        </div>

        <div class="text-sm">
            ${l}
        </div>

        <div class="text-sm relative w-full">
            ${d}
        </div>
    `;return}let i=e.paidLabel.includes("\u0435\u0432\u0440\u043E");n.innerHTML=`
        <div class="text-sm">
            \u0426\u0435\u043D\u0430:
            <span class="ml-2 mr-1 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${e.priceEUR.toFixed(2)}</span> \u0435\u0432\u0440\u043E
            </span>
            ( = 
            <span class="ml-1 font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${e.priceBGN.toFixed(2)}</span> \u043B\u0432.
            </span>
            )
        </div>

        <div class="text-sm my-1">
            \u041F\u043B\u0430\u0442\u0435\u043D\u0438 \u0434\u043E \u043C\u043E\u043C\u0435\u043D\u0442\u0430:
            <span class="ml-2 font-bold ${i?"text-sky-600 dark:text-blue-300":"text-orange-500 dark:text-orange-400"}">
                <span class="text-base">${e.paidLabel}</span>
            </span>
        </div>

        <div class="relative text-sm">
            <span class="absolute inset-0 bg-gray-200 dark:bg-slate-600 rounded-md z-0 -mx-2 -my-1 animate-pulse"></span>
            <span class="relative">
            \u041E\u0441\u0442\u0430\u0432\u0430\u0442 \u0437\u0430 \u0434\u043E\u043F\u043B\u0430\u0449\u0430\u043D\u0435:
            <span class="ml-2 mr-1 font-bold text-sky-600 dark:text-blue-300">
                <span class="text-base">${e.remainingEUR.toFixed(2)}</span> \u0435\u0432\u0440\u043E
            </span>
            \u0438\u043B\u0438
            <span class="ml-1 font-bold text-orange-500 dark:text-orange-400">
                <span class="text-base">${e.remainingBGN.toFixed(2)}</span> \u043B\u0432.
            </span>
            </span>
        </div>
    `}var w=E(()=>{x();k()});function Q(e,t){let n=parseFloat(t);if(isNaN(n)||(e==="priceEur"||e==="priceBgn")&&!o.priceEur.value&&!o.priceBgn.value)return;let{priceEur:i,priceBgn:s}=o;switch(e){case"priceEur":s.value=(n*a.rate).toFixed(2),I(s),s.disabled=!0,a.inputs.priceBgn=s.value,a.validation.priceBgn=!0;break;case"priceBgn":i.value=(n/a.rate).toFixed(2),I(i),i.disabled=!0,a.inputs.priceEur=i.value,a.validation.priceEur=!0;break;default:return}}function Z(e){if(e.value==="")return;let t=parseFloat(e.value.replace(",","."));isNaN(t)||(e.value=t.toFixed(2))}function W(e){if(!e)return;let t=e.id;if(a.validation[t]!==!0)return;let n=parseFloat(e.value.replace(",","."));isNaN(n)||(Z(e),a.inputs[t]=e.value)}function ee(e,t,n){let i=e.id,s=parseFloat(e.value.replace(",",".")),{changeEur:r,changeBgn:l}=o;return e.value?(i==="changeEur"&&(l.disabled=!0),i==="changeBgn"&&(r.disabled=!0),isNaN(s)?(B(e),{valid:!1}):i==="changeEur"&&s>t||i==="changeBgn"&&s>n?(B(e),{valid:!1,warning:"\u0412\u044A\u0432\u0435\u0434\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0435 \u043F\u043E-\u0433\u043E\u043B\u044F\u043C\u0430 \u043E\u0442 \u0434\u044A\u043B\u0436\u0438\u043C\u043E\u0442\u043E \u0440\u0435\u0441\u0442\u043E"}):(I(e),{valid:!0,mixed:!0})):(i==="changeEur"&&(l.disabled=!1),i==="changeBgn"&&(r.disabled=!1),h(r),h(l),{valid:!0,mixed:!1})}function I(e){e.classList.remove("border-red-600","border-gray-500"),e.classList.add("border-lime-600")}function B(e){e.classList.remove("border-lime-600","border-gray-500"),e.classList.add("border-red-600")}function h(e){e.classList.remove("border-lime-600","border-red-600"),e.classList.add("border-gray-500")}function y(e){let t=e.id,n=e.value,i=n.replace(",",".");return a.inputs[t]=n,/[^0-9.]/.test(n)?(B(e),a.validation[t]=!1,m({type:"warning",message:"\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0438 \u0441\u0438\u043C\u0432\u043E\u043B\u0438. \u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0441\u0430\u043C\u043E \u0447\u0438\u0441\u043B\u0430."}),!1):n===""?(h(e),a.validation[t]=!1,a.inputs[t]="",t==="priceEur"&&(o.priceBgn.value="",o.priceBgn.disabled=!1,h(o.priceBgn),a.inputs.priceBgn="",a.validation.priceBgn=!1),t==="priceBgn"&&(o.priceEur.value="",o.priceEur.disabled=!1,h(o.priceEur),a.inputs.priceEur="",a.validation.priceEur=!1),document.dispatchEvent(new CustomEvent("show-notification")),t==="changeEur"||t==="changeBgn"?"empty":!1):(i.match(/\./g)||[]).length>1?(B(e),a.validation[t]=!1,m({type:"warning",message:"\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0444\u043E\u0440\u043C\u0430\u0442. \u0418\u0437\u043F\u043E\u043B\u0437\u0432\u0430\u0439\u0442\u0435 \u0441\u0430\u043C\u043E \u0435\u0434\u043D\u0430 \u0434\u0435\u0441\u0435\u0442\u0438\u0447\u043D\u0430 \u0442\u043E\u0447\u043A\u0430."}),!1):(I(e),a.validation[t]=!0,Q(t,i),!0)}function b(e){e&&(e.value="",e.disabled=!1,h(e),a.inputs[e.id]="",a.validation[e.id]=!1)}function L(){let{priceEur:e,priceBgn:t,paidEur:n,paidBgn:i,changeEur:s,changeBgn:r,resultsLine:l}=o;b(e),b(t),b(n),b(i),b(s),b(r),l&&(l.classList.remove("opacity-100"),l.classList.add("opacity-0","pointer-events-none"),l.innerHTML="");let c=document.getElementById("messageLine");c&&(c.classList.remove("opacity-0","pointer-events-none"),c.classList.add("opacity-100"))}function D(){let e=document.getElementById("calcInputs");if(!e){console.warn("calcInputs wrapper not found");return}e.addEventListener("input",t=>{let n=t.target;if(!n.matches("input"))return;let i=y(n);if(i==="empty"){if(a.mode==="change"&&(n.id==="changeEur"||n.id==="changeBgn")){n.id==="changeEur"&&(o.changeBgn.disabled=!1),n.id==="changeBgn"&&(o.changeEur.disabled=!1);let r=v();m(r)}return}if(!i)return;let s=null;if(a.mode==="payment"?s=A():a.mode==="change"&&(s=v()),a.mode==="change"&&(n.id==="changeEur"||n.id==="changeBgn")){let r=v();if(!r||r.type!=="change"){m(r||null);return}let{maxEur:l,maxBgn:c}=r,d=ee(n,l,c);if(!d.valid){m({type:"warning",message:d.warning||"\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"});return}if(!n.value){m(r);return}if(d.mixed){let u=parseFloat(n.value.replace(",","."));if(n.id==="changeEur"&&u>r.totalChangeEUR||n.id==="changeBgn"&&u>r.totalChangeBGN){B(n),m({type:"warning",message:"\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435! \u0412\u044A\u0432\u0435\u0434\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u0437\u0430 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E \u0440\u0435\u0441\u0442\u043E \u0435 \u043F\u043E-\u0433\u043E\u043B\u044F\u043C\u0430 \u043E\u0442 \u0446\u044F\u043B\u0430\u0442\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u043D\u0430 \u0440\u0435\u0441\u0442\u043E\u0442\u043E."});return}let f,g;n.id==="changeEur"?(f=u,g=(r.totalChangeEUR-u)*a.rate):(g=u,f=(r.totalChangeBGN-u)/a.rate),r.hasMixed=!0,r.mixedEur=f,r.mixedBgn=g,m(r);return}m(r);return}m(s),document.dispatchEvent(new CustomEvent("show-notification",{detail:{type:i?"success":"error",fieldId:n.id}}))}),e.addEventListener("focusin",t=>{let n=t.target;n.matches("input")&&(a.activeInput&&a.activeInput!==n&&W(a.activeInput),a.activeInput=n,$())}),document.addEventListener("click",t=>{let n=a.activeInput;n&&(t.target===n||n.contains(t.target)||t.target.closest("#numpad")||W(n))})}var k=E(()=>{x();C();w()});function H(){localStorage.setItem("theme","dark"),document.documentElement.classList.add("dark"),document.getElementById("themeToggle").addEventListener("click",()=>{let e=document.documentElement;e.classList.contains("dark")?(localStorage.setItem("theme","light"),e.classList.remove("dark")):(localStorage.setItem("theme","dark"),e.classList.add("dark"))})}function _(){let e=new URLSearchParams(window.location.search);if(!e.has("price"))return;let t=e.get("price").toLowerCase().trim();t=t.replace(",",".");let n=parseFloat(t);if(isNaN(n))return;let i=t.endsWith("eur"),s=t.endsWith("bgn");if(!i&&!s)return;a.mode="change",document.getElementById("modeChange").click(),i&&(o.priceEur.value=n.toFixed(2),y(o.priceEur)),s&&(o.priceBgn.value=n.toFixed(2),y(o.priceBgn)),document.dispatchEvent(new CustomEvent("show-notification"));let r=v();m(r)}var Y=E(()=>{x();C();k();w()});var te=K(()=>{Y();w();k();document.addEventListener("DOMContentLoaded",()=>{H(),M(),V(),D(),U(),P(),G(),z(),R(),_()})});te();})();
