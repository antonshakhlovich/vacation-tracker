(this["webpackJsonpvacation-tracker"]=this["webpackJsonpvacation-tracker"]||[]).push([[0],{100:function(e,a,c){"use strict";c.r(a);var s=c(3),t=c.n(s),n=c(11),l=c.n(n),r=c(25),i=(c(45),c(17)),o=(c(46),c(36)),j=c.n(o),d=(c(47),c.p+"static/media/logo-white.d7f37808.svg"),p=c(4);var b=function(){var e={name:"Loading..."},a={name:"Failed to retrieve data."},c="N/A",t=Object(s.useState)(null),n=Object(i.a)(t,2),l=n[0],o=n[1],b=Object(s.useState)(null),u=Object(i.a)(b,2),h=u[0],m=u[1],O=Object(s.useState)(c),v=Object(i.a)(O,2),x=v[0],N=v[1];Object(s.useEffect)((function(){}),[]);var f=function(e){var a=new URLSearchParams(window.location.search);null===a||void 0===a||a.get("local");return"".concat("https://user-data-vzzdzjkoiq-lm.a.run.app","?id_token=").concat(e)},g=function(){o(null),N(c)};return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("div",{className:"App-logo",children:Object(p.jsx)("img",{className:"App-logo",src:d,alt:"SiliconMint"})}),Object(p.jsx)("header",{className:"App-header",children:Object(p.jsx)("div",{children:l?Object(p.jsxs)(s.Fragment,{children:[Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("span",{className:"App-label",children:"Name:"}),Object(p.jsx)("span",{className:"App-value",children:l.name})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("span",{className:"App-label",children:"Email:"}),Object(p.jsx)("span",{className:"App-value",children:l.email})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("span",{className:"App-label",children:"Balance:"}),Object(p.jsx)("span",{className:"App-value",children:l.vacationBalance})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("span",{className:"App-label",children:"Balance On Date:"}),Object(p.jsx)(j.a,{selected:h,onChange:function(e){if(m(e),e<=new Date)N(c);else{var a=Math.round((new Date(e).getTime()-new Date(l.startDate).getTime())/864e5/365*20-l.vacationUsedTotal,0);N(a)}}}),Object(p.jsx)("span",{className:"App-value",children:x})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("span",{className:"App-label",children:"Sick Leaves Used Last Year:"}),Object(p.jsx)("span",{className:"App-value",children:l.sickDaysUsedLastYear})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("span",{className:"App-label",children:"Vac Used Last Year:"}),Object(p.jsx)("span",{className:"App-value",children:l.vacationUsedLastYear})]}),Object(p.jsx)("p",{children:Object(p.jsx)("a",{href:"https://forms.gle/Aa44PA9AWSCJraBZ6",target:"_blank",rel:"noreferrer",className:"App-button",children:"Submit New Request"})}),Object(p.jsx)("button",{className:"App-button App-button--reversed",onClick:g,children:"Log Out"})]}):Object(p.jsx)(r.a,{onSuccess:function(a){var c;o(e),c=a.credential,fetch(f(c)).then((function(e){return e.json()})).then((function(e){return o(e.personalBalance)}))},onFailure:function(e){console.log("failed",e),o(a),g()},useOneTap:!0})})})]})},u=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,105)).then((function(a){var c=a.getCLS,s=a.getFID,t=a.getFCP,n=a.getLCP,l=a.getTTFB;c(e),s(e),t(e),n(e),l(e)}))};l.a.render(Object(p.jsx)(t.a.StrictMode,{children:Object(p.jsx)(r.b,{clientId:"631285324391-vn4n61hnr0c429g8i11krudf4p5ko1oj.apps.googleusercontent.com",children:Object(p.jsx)(b,{})})}),document.getElementById("root")),u()},45:function(e,a,c){},46:function(e,a,c){}},[[100,1,2]]]);