!function(t){var s={};function e(i){if(s[i])return s[i].exports;var a=s[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var a in t)e.d(i,a,function(s){return t[s]}.bind(null,a));return i},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s=0)}([function(t,s,e){"use strict";e.r(s);class i{constructor(t){const{parent:s,size:e}=t,i=document.createElement("canvas");s.appendChild(i),this.canvas=i;const a=i.getContext("2d");if(!a)throw"cant get canvas context";this.ctx=a,this.setSize(e)}setSize(t){this.size=t,this.canvas.width=t.width,this.canvas.height=t.height}clear(){this.ctx.clearRect(0,0,this.size.width,this.size.height)}}class a{constructor(t){this.canvas=t.canvas,this.ctx=t.canvas.ctx}render(){throw"IMPLEMENT ME"}}class r extends a{constructor(t){super(t);const{x:s,y:e,width:i,height:a,style:r}=t;this.params={x:s,y:e,width:i,height:a,style:r}}setParams(t){Object.assign(this.params,{...t})}getParams(){return{...this.params}}move({x:t,y:s}){let e=t;t<0?e=0:t>this.canvas.size.width-this.params.width&&(e=this.canvas.size.width-this.params.width);let i=s;s<0?i=0:s>this.canvas.size.height-this.params.height&&(i=this.canvas.size.height-this.params.height),this.setParams({x:e,y:i})}render(){this.ctx.fillStyle=this.params.style,this.ctx.fillRect(this.params.x,this.params.y,this.params.width,this.params.height)}}const h=3;class n extends r{constructor(t){super(t),this.params.margin=t.margin,this.diff=0,document.addEventListener("keydown",t=>{switch(t.key){case"ArrowRight":this.diff=h;break;case"ArrowLeft":this.diff=-h}}),document.addEventListener("keyup",t=>{switch(t.key){case"ArrowRight":this.diff===h&&(this.diff=0);break;case"ArrowLeft":this.diff===-h&&(this.diff=0)}})}moveXByDiff(t){let s=this.params.x+t;const e=this.params.margin,i=this.canvas.size.width-this.params.width-this.params.margin;s<e?s=e:s>i&&(s=i),this.setParams({x:s})}render(){this.moveXByDiff(this.diff),this.ctx.fillStyle=this.params.style,this.ctx.fillRect(this.params.x,this.params.y,this.params.width,this.params.height)}}class c extends a{constructor(t){super(t);const{x:s,y:e,radius:i,style:a}=t;this.params={x:s,y:e,radius:i,style:a}}setParams(t){Object.assign(this.params,{...t})}getParams(){return{...this.params}}move({x:t,y:s}){let e=t;t<this.params.radius?e=this.params.radius:t>this.canvas.size.width-this.params.radius&&(e=this.canvas.size.width-this.params.radius);let i=s;s<this.params.radius?i=this.params.radius:s>this.canvas.size.height-this.params.radius&&(i=this.canvas.size.height-this.params.radius),this.setParams({x:e,y:i})}moveRandom(){const t=this.params.x+(10*Math.random()-5),s=this.params.y+(10*Math.random()-5);this.move({x:t,y:s})}render(){this.moveRandom(),this.ctx.beginPath(),this.ctx.fillStyle=this.params.style,this.ctx.arc(this.params.x,this.params.y,this.params.radius,0,2*Math.PI),this.ctx.fill()}}const o=58;let d,m,l=0;!function(){const t=document.getElementById("root");t&&function({canvas:t}){const s=[];s.push(new n({canvas:t,x:(t.size.width-20)/2,y:t.size.height-20-3,width:20,height:20,margin:3,style:"red"}),new c({canvas:t,x:(t.size.width-40)/2,y:(t.size.height-40)/2,radius:40,style:"blue"})),d=setInterval(()=>{l+=1,t.clear(),s.forEach(t=>{t.render()})},1e3/o),m=setInterval(()=>{const t=l;console.log(`FPS: ${t}`),l=0},1e3)}({canvas:new i({parent:t,size:{width:640,height:400}})})}(),document.addEventListener("keydown",t=>{"Enter"===t.key&&(clearInterval(d),clearInterval(m))})}]);