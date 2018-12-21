(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,a){},18:function(t,e,a){},27:function(t,e,a){t.exports=a(46)},46:function(t,e,a){"use strict";a.r(e);var n=a(8),o=a(3),r=a(4),c=a(6),s=a(5),i=a(7),l=a(2),u=a(0),p=a.n(u),h=a(11),d=a.n(h);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(18);var m=a(16),f=function(t){function e(t){return Object(o.a)(this,e),Object(c.a)(this,Object(s.a)(e).call(this,t))}return Object(i.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){var t=this;return p.a.createElement("tr",null,p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.name)),p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.uv,this.props.currencySymbol)),p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.quantity)),p.a.createElement("td",null,p.a.createElement("p",null,this.props.stock.tv,this.props.currencySymbol)),p.a.createElement("td",null,p.a.createElement("input",{onChange:function(e){t.props.setChecked(e,t.props.stock.id)},id:"check-"+this.props.stock.id,defaultChecked:this.props.stock.checked,type:"checkbox"})))}}]),e}(p.a.Component),b=function(t){function e(){return Object(o.a)(this,e),Object(c.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(i.a)(e,t),Object(r.a)(e,[{key:"render",value:function(){if(!this.props.show)return null;return p.a.createElement("div",{className:"backdrop",style:{backdropStyle:{position:"fixed",top:0,bottom:0,left:5,right:0,backgroundColor:"rgba(0,0,0,0.3)",padding:50}}},p.a.createElement("div",{className:"modal",style:{modalStyle:{backgroundColor:"#fff",borderRadius:5,maxWidth:500,minHeight:300,margin:"0 auto",padding:30}}},this.props.children,p.a.createElement("div",{className:"footer"},p.a.createElement("button",{onClick:this.props.onClose},"Close"))))}}]),e}(p.a.Component),v=a(9),k=a.n(v),y=a(12),S=a(21),O=a(23),E=a(15),g=a.n(E),j=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(c.a)(this,Object(s.a)(e).call(this,t))).closeModal=function(){a.setState({open:!1}),a.props.onCloseModal()},a.state={stocks:a.props.stocks,chartData:[],stockData:[],open:a.props.open},a.drawStockValueCurves=a.drawStockValueCurves.bind(Object(l.a)(Object(l.a)(a))),a.drawStockValueCurves(),a}return Object(i.a)(e,t),Object(r.a)(e,[{key:"fetchStockData",value:function(){var t=Object(y.a)(k.a.mark(function t(e){return k.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+e+"&apikey=XDNRE3YNSC6MJXBQ").then(function(t){return t.json()}).then(function(t){if("Note"!==Object.keys(t)[0]&&"Error Message"!==Object.keys(t)[0]){var e=t["Time Series (Daily)"],a=Object.keys(e).reverse(),n=[];return[n=a.map(function(t){return n.concat(e[t])[0]}),a]}alert("Only 5 request are allowed in one minute (by API)")});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"addListToSelectTag",value:function(t,e){for(var a=0;a<e.length;a++)for(var n=document.getElementById(e[a]),o=0;o<t.length;o++){var r=document.createElement("option");r.text=t[o],n.add(r)}}},{key:"drawStockValueCurves",value:function(){var t=Object(y.a)(k.a.mark(function t(){var e,a,o,r,c,s=this;return k.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.state.stocks,a=e.map(function(t){return t.name}),o=[],t.next=5,Promise.all(a.map(function(){var t=Object(y.a)(k.a.mark(function t(e){return k.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",s.fetchStockData(e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())).then(function(t){o=Object(n.a)(t),s.setState({stockData:Object.assign([],t)})});case 5:r=o[0][1][o[0][1].length-11],c=o[0][1][o[0][1].length-1],this.addListToSelectTag(o[0][1],["time1","time2"]),this.drawGraph(r,c);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"drawGraph",value:function(t,e){var a=Object.assign([],this.state.stockData),o=a[0][1].indexOf(t),r=a[0][1].indexOf(e);if(o<=r){var c=["Time"],s=Object(n.a)(this.state.stocks).map(function(t){return t.name});c=c.concat(s);var i=!1,l=[];l.push(c);try{for(var u=o;u<r+1;u++){var p=[];p=[a[0][1][u]];for(var h=0;h<a.length;h++)p=p.concat(parseFloat(Object.values(a[h][0][u])[0]));if(!Array.isArray(p)){i=!0;break}l.push(p)}}catch(d){}!1===i?this.setState({chartData:l}):alert("Only 5 request are allowed in one minute (by API)")}else alert("Time invalid")}},{key:"render",value:function(){var t=this;return p.a.createElement(O.a,{open:this.state.open,onClose:this.closeModal,center:!0,classNames:{overlay:g.a.customOverlay,modal:g.a.customModal}},p.a.createElement("div",null,p.a.createElement("h2",null,"Graph"),"Select by time",p.a.createElement("select",{id:"time1"},p.a.createElement("option",null,"Select starting time")),p.a.createElement("select",{id:"time2"},p.a.createElement("option",null,"Select ending time")),p.a.createElement("button",{onClick:function(e){t.drawGraph(document.getElementById("time1").value,document.getElementById("time2").value)}},"Search"),p.a.createElement(S.a,{chartType:"LineChart",width:"700px",height:"400px",data:this.state.chartData,options:{title:"Stock value",curveType:"function",legend:{position:"bottom"}}})))}}]),e}(p.a.Component),w=function(t){function e(t){var a;return Object(o.a)(this,e),(a=Object(c.a)(this,Object(s.a)(e).call(this,t))).popUpModal=function(){a.setState({isOpen:!a.state.isOpen})},a.saveStock=function(){if(a.state.newStock.name.length>1&&a.state.newStock.quantity>0){var t=Object(m.a)({},a.state.newStock),e=t.name.toUpperCase();a.state.stocks.length>=50?alert("Maximum number of portfolios is 50"):fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+e+"&apikey=XDNRE3YNSC6MJXBQ").then(function(t){return t.json()}).then(function(n){if("Note"===Object.keys(n)[0]||"Error Message"===Object.keys(n)[0])alert(Object.values(n)[0]);else{var o=n["Time Series (Daily)"],r=Object.keys(o)[0],c=Object.values(o[r])[0];t.name=e,t.uv=c,t.tv=(t.uv*t.quantity).toFixed(2),t.checked=!1;var s=a.state.stocks.length+1;t.id="stock"+a.state.id+s;var i=a.state.stocks.concat(t);a.setState({stocks:i,isOpen:!a.state.isOpen},function(){a.props.updatePortfolioState(a.state.id,a.state.stocks,a.state.name)})}})}},a.onOpenModal=function(t){t.stopPropagation(),a.setState({open:!0})},a.onCloseModal=function(){a.setState({open:!1})},a.state={stocks:a.props.stocks,totalValuOfStocks:a.props.totalValue,currency:"EUR",newName:"",name:a.props.name,id:a.props.id,isOpen:!1,open:!1,newStock:{name:"",uv:0,quantity:0,tv:0},chartData:[],stockData:[],currencySymbol:"\u20ac"},a.fetchCurrencyRate=a.fetchCurrencyRate.bind(Object(l.a)(Object(l.a)(a))),a.changeName=a.changeName.bind(Object(l.a)(Object(l.a)(a))),a.saveNameChange=a.saveNameChange.bind(Object(l.a)(Object(l.a)(a))),a.cancelNameChange=a.cancelNameChange.bind(Object(l.a)(Object(l.a)(a))),a.saveStock=a.saveStock.bind(Object(l.a)(Object(l.a)(a))),a.newStock=a.newStock.bind(Object(l.a)(Object(l.a)(a))),a.removeSelected=a.removeSelected.bind(Object(l.a)(Object(l.a)(a))),a.setChecked=a.setChecked.bind(Object(l.a)(Object(l.a)(a))),a.onOpenModal=a.onOpenModal.bind(Object(l.a)(Object(l.a)(a))),a}return Object(i.a)(e,t),Object(r.a)(e,[{key:"arraysEqual",value:function(t,e){if(t.length!==e.length)return!1;for(var a=t.length;a--;)if(t[a]!==e[a])return!1;return!0}},{key:"componentDidMount",value:function(){for(var t=this,e=Object(n.a)(this.props.stocks),a=0,o=0;o<e.length;o++){var r=e[o].uv*e[o].quantity;e[o].tv=r.toFixed(2),e[o].checked=!1,a+=r}a=a.toFixed(2),this.setState({stocks:e,totalValuOfStocks:a},function(){t.props.updatePortfolioState(t.state.id,t.state.stocks,t.state.name)})}},{key:"fetchCurrencyRate",value:function(t,e,a,o){var r=this;t.stopPropagation(),fetch("https://free.currencyconverterapi.com/api/v6/convert?q="+e+"_"+a).then(function(t){return t.json()}).then(function(t){if(a!==r.state.currency){var c=t.results[e+"_"+a].val,s=Object(n.a)(r.state.stocks);s.forEach(function(t){t.uv=(t.uv*c).toFixed(2),t.tv=(t.uv*t.quantity).toFixed(2)}),r.setState({stocks:s,currency:a,currencySymbol:o})}})}},{key:"hideTextShowInput",value:function(t){t.stopPropagation();var e=t.target,a=e.parentElement.firstChild;e.hasAttribute("hidden")?e.removeAttribute("hidden"):e.setAttribute("hidden",!0),a.removeAttribute("hidden")}},{key:"changeName",value:function(t){t.stopPropagation(),this.setState({newName:t.target.value})}},{key:"saveNameChange",value:function(t){var e=this;t.stopPropagation(),this.state.newName.trim().length>1?this.setState({name:this.state.newName.trim()},function(){e.props.updatePortfolioState(e.state.id,e.state.stocks,e.state.name)}):alert("Name too short");var a=t.target.parentElement,n=a.nextSibling;a.setAttribute("hidden",!0),n.removeAttribute("hidden")}},{key:"cancelNameChange",value:function(t){var e=t.target.parentElement,a=e.nextSibling;e.setAttribute("hidden",!0),a.removeAttribute("hidden")}},{key:"newStock",value:function(t){var e=this;t.stopPropagation();var a=t.target.id.split("-")[0],n=Object(m.a)({},this.state.newStock);n[a]=t.target.value,this.setState({newStock:n},function(){e.props.updatePortfolioState(e.state.id,e.state.stocks,e.state.name)})}},{key:"removeSelected",value:function(t){var e=this,a=Object(n.a)(this.state.stocks).filter(function(t){return!1===t.checked});this.setState({stocks:a},function(){e.props.updatePortfolioState(e.state.id,e.state.stocks,e.state.name)})}},{key:"setChecked",value:function(t,e){var a=this;t.stopPropagation();var n=Object.assign([],this.state.stocks),o=n.filter(function(t){return t.id===e})[0];o.checked?o.checked=!1:o.checked=!0,this.setState({stocks:n},function(){a.props.updatePortfolioState(a.state.id,a.state.stocks,a.state.name)})}},{key:"render",value:function(){var t=this,e=this.state.stocks.map(function(e,a){return p.a.createElement(f,{stock:e,key:a,setChecked:t.setChecked,currencySymbol:t.state.currencySymbol})}),a=!0===this.state.open?p.a.createElement(j,{stocks:this.state.stocks,onCloseModal:this.onCloseModal,open:this.state.open}):"";return p.a.createElement("div",{className:"card"},p.a.createElement("script",{type:"text/javascript",src:"https://www.gstatic.com/charts/loader.js"}),p.a.createElement("button",{onClick:function(e){t.props.closePortfolio(e,t.state.id)},className:"close"}),p.a.createElement("div",null,p.a.createElement("div",{hidden:!0},p.a.createElement("input",{onChange:this.changeName,id:this.props.name}),p.a.createElement("button",{onClick:this.saveNameChange},"Save"),p.a.createElement("button",{onClick:this.cancelNameChange},"Cancel")),p.a.createElement("p",{onClick:this.hideTextShowInput},this.state.name)),p.a.createElement("div",{className:"btngroup"},p.a.createElement("button",{onClick:function(e){t.fetchCurrencyRate(e,"USD","EUR","\u20ac")},className:"button",id:"desktop"},"Show in \u20ac"),p.a.createElement("button",{onClick:function(e){t.fetchCurrencyRate(e,"EUR","USD","$")},className:"button",id:"mobile"},"show in $")),p.a.createElement("div",{className:"table-wrapper"},p.a.createElement("table",{className:"blueTable"},p.a.createElement("tbody",null,p.a.createElement("tr",null,p.a.createElement("th",null,"Name"),p.a.createElement("th",null,"Value"),p.a.createElement("th",null,"Quantity"),p.a.createElement("th",null,"Total"),p.a.createElement("th",null,"Select")),e))),p.a.createElement("div",{className:"btngroup"},p.a.createElement("button",{onClick:this.popUpModal,className:"button",id:"desktop"},"Add in stock"),p.a.createElement("button",{onClick:this.onOpenModal,className:"button",id:"mobile"},"Perf graph"),p.a.createElement("button",{onClick:this.removeSelected,className:"button",id:"mobile"},"Remove selected"),p.a.createElement("div",null,"Total stock value: ",this.state.totalValuOfStocks,this.state.currencySymbol)),p.a.createElement(b,{show:this.state.isOpen,onClose:this.popUpModal},p.a.createElement("form",{onChange:this.newStock},"Name: ",p.a.createElement("input",{id:"name-"+this.state.id,type:"text"}),"Quantity:",p.a.createElement("input",{id:"quantity-"+this.state.id,type:"number"}),p.a.createElement("button",{onClick:this.saveStock,type:"button"},"Save"))),a)}}]),e}(p.a.Component),C=function(t){function e(){var t;Object(o.a)(this,e),(t=Object(c.a)(this,Object(s.a)(e).call(this))).onSetResult=function(e,a){localStorage.setItem(a,JSON.stringify(e)),t.setState({portfolio:e})};var a=localStorage.getItem("portfolio");return console.log(a),a=null!==a?JSON.parse(a):[],t.state={portfolio:a},t.addNewPortfolio=t.addNewPortfolio.bind(Object(l.a)(Object(l.a)(t))),t.closePortfolio=t.closePortfolio.bind(Object(l.a)(Object(l.a)(t))),t.updatePortfolioState=t.updatePortfolioState.bind(Object(l.a)(Object(l.a)(t))),t}return Object(i.a)(e,t),Object(r.a)(e,[{key:"updatePortfolioState",value:function(t,e,a){for(var n=Object.assign([],this.state.portfolio),o=0;o<n.length;o++)n[o].id===t&&(n[o].name=a,n[o].stocks=e);this.setState({portfolio:n}),this.onSetResult(n,"portfolio")}},{key:"addNewPortfolio",value:function(t){t.stopPropagation();var e=this.state.portfolio.length+1;if(e<=10){var a={name:"Portfolio "+e,id:e,stocks:[]};this.setState({portfolio:this.state.portfolio.concat([a])}),this.onSetResult(this.state.portfolio.concat([a]),"portfolio")}else alert("Too many portfolios. Max amount of portfolios is 10.")}},{key:"closePortfolio",value:function(t,e){t.stopPropagation();var a=Object(n.a)(this.state.portfolio).filter(function(t){return t.id!==e});this.setState({portfolio:a}),this.onSetResult(a,"portfolio")}},{key:"render",value:function(){var t=this,e=this.state.portfolio.map(function(e,a){return p.a.createElement(w,{name:e.name,totalValue:0,updatePortfolioState:t.updatePortfolioState,stocks:e.stocks,closePortfolio:t.closePortfolio,key:a,id:e.id})});return p.a.createElement("div",{className:"App"},p.a.createElement("header",null),p.a.createElement("body",null,p.a.createElement("div",{className:"addPortfolio"}," ",p.a.createElement("button",{onClick:this.addNewPortfolio},"Add portfolio")),p.a.createElement("div",{className:"row"},e)))}}]),e}(p.a.Component);d.a.render(p.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[27,2,1]]]);
//# sourceMappingURL=main.cecc269b.chunk.js.map