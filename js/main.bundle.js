!function(t){var s={};function e(i){if(s[i])return s[i].exports;var a=s[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var a in t)e.d(i,a,function(s){return t[s]}.bind(null,a));return i},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="",e(e.s=0)}([function(t,s,e){"use strict";e.r(s);class i{constructor(){this.keyPressedInfo={},document.addEventListener("keydown",t=>{this.keyPressedInfo[t.key]={isPressed:!0,time:Date.now()}}),document.addEventListener("keyup",t=>{this.keyPressedInfo[t.key]={isPressed:!1,time:0}})}getKeyPressedInfo(t){let s=this.keyPressedInfo[t];return void 0===s&&(s={isPressed:!1,time:0}),s}}class a{constructor(t){const{parent:s,size:e}=t,i=document.createElement("canvas");s.appendChild(i),this.canvas=i;const a=i.getContext("2d");if(!a)throw"cant get canvas context";this.ctx=a,this.setSize(e)}setSize(t){this.size=t,this.canvas.width=t.width,this.canvas.height=t.height}clear(){this.ctx.clearRect(0,0,this.size.width,this.size.height)}}class r{constructor(t){this.canvas=t.canvas,this.ctx=t.canvas.ctx}render(){throw"IMPLEMENT ME"}}class h extends r{constructor(t){super(t);const{x:s,y:e,width:i,height:a,style:r}=t;this.params={x:s,y:e,width:i,height:a,style:r}}setParams(t){Object.assign(this.params,{...t})}getParams(){return{...this.params}}move({x:t,y:s}){let e=t;t<0?e=0:t>this.canvas.size.width-this.params.width&&(e=this.canvas.size.width-this.params.width);let i=s;s<0?i=0:s>this.canvas.size.height-this.params.height&&(i=this.canvas.size.height-this.params.height),this.setParams({x:e,y:i})}render(){this.ctx.fillStyle=this.params.style,this.ctx.fillRect(this.params.x,this.params.y,this.params.width,this.params.height)}}const n=3;class c extends h{constructor(t){super(t),this.keyManager=t.keyManager,this.params.margin=t.margin}setParams(t){Object.assign(this.params,{...t})}moveByKeyPress(){const t=this.keyManager.getKeyPressedInfo("ArrowLeft"),s=this.keyManager.getKeyPressedInfo("ArrowRight");let{x:e}=this.params,i=0;if(!t.isPressed&&!s.isPressed)return;e+=i=t.isPressed?s.isPressed?t.time>s.time?-n:n:-n:n;const a=this.params.margin,r=this.canvas.size.width-this.params.width-this.params.margin;e<a?e=a:e>r&&(e=r),this.setParams({x:e})}render(){this.moveByKeyPress(),this.ctx.fillStyle=this.params.style,this.ctx.fillRect(this.params.x,this.canvas.size.height-this.params.y,this.params.width,this.params.height)}}class o extends r{constructor(t){super(t);const{x:s,y:e,radius:i,style:a}=t;this.params={x:s,y:e,radius:i,style:a}}setParams(t){Object.assign(this.params,{...t})}getParams(){return{...this.params}}move({x:t,y:s}){let e=t;t<this.params.radius?e=this.params.radius:t>this.canvas.size.width-this.params.radius&&(e=this.canvas.size.width-this.params.radius);let i=s;s<this.params.radius?i=this.params.radius:s>this.canvas.size.height-this.params.radius&&(i=this.canvas.size.height-this.params.radius),this.setParams({x:e,y:i})}moveRandom(){const t=this.params.x+(10*Math.random()-5),s=this.params.y+(10*Math.random()-5);this.move({x:t,y:s})}render(){this.moveRandom(),this.ctx.beginPath(),this.ctx.fillStyle=this.params.style,this.ctx.arc(this.params.x,this.params.y,this.params.radius,0,2*Math.PI),this.ctx.fill()}}const m={x:3,y:3},l=-.163;class d extends o{constructor(t){super(t),this.params.margin=t.margin,this.velocity=m}setParams(t){Object.assign(this.params,{...t})}getParams(){return{...this.params}}updateVelocity(){const{x:t,y:s}=this.velocity,e=s+l;this.velocity={x:t,y:e}}moveByVelocity(){let t=this.params.x+this.velocity.x,s=this.params.y+this.velocity.y;const e=this.params.radius+this.params.margin,i=this.canvas.size.width-this.params.radius-this.params.margin,a=this.params.radius+this.params.margin,r=this.canvas.size.height-this.params.radius-this.params.margin;t<e?(t=e,this.velocity.x*=-1):t>i&&(t=i,this.velocity.x*=-1),s<a?(s=a,this.velocity.y*=-1):s>r&&(s=r,this.velocity.y*=-1),this.setParams({x:t,y:s}),this.updateVelocity()}render(){this.moveByVelocity(),this.ctx.beginPath(),this.ctx.fillStyle=this.params.style,this.ctx.arc(this.params.x,this.canvas.size.height-this.params.y,this.params.radius,0,2*Math.PI),this.ctx.fill()}}const y=3,p="rgb(64, 64, 64)";class u extends h{quarter(t,s=!0){return((t+2)%4+(s?0:1))*(2*Math.PI)/4}render(){const{ctx:t}=this,{x:s,y:e,width:i,height:a,style:r}=this.params,h=this.quarter;t.fillStyle=r,t.strokeStyle=p,t.beginPath(),t.moveTo(s+y,e),t.lineTo(s+i-y,e),t.arc(s+i-y,e+y,y,h(1),h(1,!1)),t.lineTo(s+i,e+a-y),t.arc(s+i-y,e+a-y,y,h(2),h(2,!1)),t.lineTo(s+y,e+a),t.arc(s+y,e+a-y,y,h(3),h(3,!1)),t.lineTo(s,e+y),t.arc(s+y,e+y,y,h(4),h(4,!1)),t.closePath(),t.fill(),t.stroke()}}const g=58;let v,x,f=0;!function(){const t=document.getElementById("root");t&&function({canvas:t}){const s=[],e=new i;s.push(new u({canvas:t,x:(t.size.width-40)/2,y:(t.size.height-40)/2,width:40,height:40,style:"green"}),new c({canvas:t,keyManager:e,x:(t.size.width-20)/2,y:23,width:20,height:20,margin:3,style:"red"}),new d({canvas:t,x:(t.size.width-20)/2,y:(t.size.height-20)/2,radius:20,margin:3,style:"blue"})),v=setInterval(()=>{f+=1,t.clear(),s.forEach(t=>{t.render()})},1e3/g),x=setInterval(()=>{const t=f;console.log(`FPS: ${t}`),f=0},1e3)}({canvas:new a({parent:t,size:{width:640,height:400}})})}(),document.addEventListener("keydown",t=>{"Enter"===t.key&&(clearInterval(v),clearInterval(x))})}]);