(this["webpackJsonpvacation-tracker"]=this["webpackJsonpvacation-tracker"]||[]).push([[0],{10:function(e,a,c){},11:function(e,a,c){},13:function(e,a,c){"use strict";c.r(a);var n=c(0),t=c.n(n),s=c(5),l=c.n(s),r=c(2),i=(c(10),c(3)),p=(c(11),c.p+"static/media/logo-white.d7f37808.svg"),j=c(1);var o=function(){var e={name:"Loading..."},a={name:"Failed to retrieve data."},c=Object(n.useState)(null),t=Object(i.a)(c,2),s=t[0],l=t[1];Object(n.useEffect)((function(){}),[]);var o=function(e){return"".concat("https://user-data-vzzdzjkoiq-lm.a.run.app","?id_token=").concat(e)},d=function(){l(null)};return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("div",{className:"App-logo",children:Object(j.jsx)("img",{className:"App-logo",src:p,alt:"SiliconMint"})}),Object(j.jsx)("header",{className:"App-header",children:Object(j.jsx)("div",{children:s?Object(j.jsxs)(n.Fragment,{children:[Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"App-label",children:"Name:"}),Object(j.jsx)("span",{className:"App-value",children:s.name})]}),Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"App-label",children:"Email:"}),Object(j.jsx)("span",{className:"App-value",children:s.email})]}),Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"App-label",children:"Balance:"}),Object(j.jsx)("span",{className:"App-value",children:s.vacationBalance})]}),Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"App-label",children:"Sick Leaves Used Last Year:"}),Object(j.jsx)("span",{className:"App-value",children:s.sickDaysUsedLastYear})]}),Object(j.jsxs)("p",{children:[Object(j.jsx)("span",{className:"App-label",children:"Vac Used Last Year:"}),Object(j.jsx)("span",{className:"App-value",children:s.vacationUsedLastYear})]}),Object(j.jsx)("p",{children:Object(j.jsx)("a",{href:"https://forms.gle/Aa44PA9AWSCJraBZ6",target:"_blank",rel:"noreferrer",className:"App-button",children:"Submit New Request"})}),Object(j.jsx)("button",{className:"App-button App-button--reversed",onClick:d,children:"Log Out"})]}):Object(j.jsx)(r.a,{onSuccess:function(a){var c;l(e),c=a.credential,fetch(o(c)).then((function(e){return e.json()})).then((function(e){return l(e.personalBalance)}))},onFailure:function(e){console.log("failed",e),l(a),d()},useOneTap:!0})})})]})},d=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,14)).then((function(a){var c=a.getCLS,n=a.getFID,t=a.getFCP,s=a.getLCP,l=a.getTTFB;c(e),n(e),t(e),s(e),l(e)}))};l.a.render(Object(j.jsx)(t.a.StrictMode,{children:Object(j.jsx)(r.b,{clientId:"631285324391-vn4n61hnr0c429g8i11krudf4p5ko1oj.apps.googleusercontent.com",children:Object(j.jsx)(o,{})})}),document.getElementById("root")),d()}},[[13,1,2]]]);