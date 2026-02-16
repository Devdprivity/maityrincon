import{c as u,j as a,H as h}from"./app-D5iGuCwC.js";import{c as s}from"./button-D7wWm94x.js";import{c as n}from"./createLucideIcon-CQZjpfd-.js";import{S as g,H as y}from"./layout-DXCKErYd.js";import{A as x}from"./app-layout-DCTR7Bxp.js";import{q as k}from"./index-hHY3XkoV.js";/* empty css            */import"./index-C64FNz03.js";import"./index-CLHYsOGy.js";import"./index-ByEcdYgQ.js";import"./x-HkmsM_Xv.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],f=n("Monitor",b);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],v=n("Moon",j);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],M=n("Sun",A);function N({className:e="",...i}){const{appearance:c,updateAppearance:l}=u(),d=[{value:"light",icon:M,label:"Light"},{value:"dark",icon:v,label:"Dark"},{value:"system",icon:f,label:"System"}];return a.jsx("div",{className:s("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",e),...i,children:d.map(({value:r,icon:m,label:p})=>a.jsxs("button",{onClick:()=>l(r),className:s("flex items-center rounded-md px-3.5 py-1.5 transition-colors",c===r?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[a.jsx(m,{className:"-ml-1 h-4 w-4"}),a.jsx("span",{className:"ml-1.5 text-sm",children:p})]},r))})}const t=e=>({url:t.url(e),method:"get"});t.definition={methods:["get","head"],url:"/settings/appearance"};t.url=e=>t.definition.url+k(e);t.get=e=>({url:t.url(e),method:"get"});t.head=e=>({url:t.url(e),method:"head"});const o=e=>({action:t.url(e),method:"get"});o.get=e=>({action:t.url(e),method:"get"});o.head=e=>({action:t.url({[e?.mergeQuery?"mergeQuery":"query"]:{_method:"HEAD",...e?.query??e?.mergeQuery??{}}}),method:"get"});t.form=o;Object.assign(t,t);const _=[{title:"Appearance settings",href:t().url}];function C(){return a.jsxs(x,{breadcrumbs:_,children:[a.jsx(h,{title:"Appearance settings"}),a.jsx(g,{children:a.jsxs("div",{className:"space-y-6",children:[a.jsx(y,{title:"Appearance settings",description:"Update your account's appearance settings"}),a.jsx(N,{})]})})]})}export{C as default};
