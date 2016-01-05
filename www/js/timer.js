!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Timer=b()}(this,function(){"use strict";function a(){c.call(this),this._.status="stopped",b.call(this,"onend")}function b(a){var b=this._.options[a],c=[].slice.call(arguments,1);"function"==typeof b&&b.apply(this,c)}function c(a){clearTimeout(this._.timeout),clearInterval(this._.interval),a===!0&&(this._.duration=0)}var d={tick:1,onstart:null,ontick:null,onpause:null,onstop:null,onend:null},e=function(a){if(!(this instanceof e))return new e(a);this._={id:+new Date,options:{},duration:0,status:"initialized",start:0,measures:[]};for(var b in d)this._.options[b]=d[b];this.options(a)};return e.prototype.start=function(c){return+c||this._.duration?(c&&(c*=1e3),this._.timeout&&"started"===this._.status?this:(this._.duration=c||this._.duration,this._.timeout=setTimeout(a.bind(this),this._.duration),"function"==typeof this._.options.ontick&&(this._.interval=setInterval(function(){b.call(this,"ontick",this.getDuration())}.bind(this),1e3*+this._.options.tick)),this._.start=+new Date,this._.status="started",b.call(this,"onstart",this.getDuration()),this)):this},e.prototype.pause=function(){return"started"!==this._.status?this:(this._.duration-=+new Date-this._.start,c.call(this,!1),this._.status="paused",b.call(this,"onpause"),this)},e.prototype.stop=function(){return/started|paused/.test(this._.status)?(c.call(this,!0),this._.status="stopped",b.call(this,"onstop"),this):this},e.prototype.getDuration=function(){return"started"===this._.status?this._.duration-(+new Date-this._.start):"paused"===this._.status?this._.duration:0},e.prototype.getStatus=function(){return this._.status},e.prototype.options=function(a,b){if(a&&b&&(this._.options[a]=b),!b&&"object"==typeof a)for(var c in a)this._.options.hasOwnProperty(c)&&(this._.options[c]=a[c]);return this},e.prototype.on=function(a,b){return"string"!=typeof a||"function"!=typeof b?this:(/^on/.test(a)||(a="on"+a),this._.options.hasOwnProperty(a)&&(this._.options[a]=b),this)},e.prototype.off=function(a){return"string"!=typeof a?this:(a=a.toLowerCase(),"all"===a?(this._.options=d,this):(/^on/.test(a)||(a="on"+a),this._.options.hasOwnProperty(a)&&(this._.options[a]=d[a]),this))},e.prototype.measureStart=function(a){return this._.measures[a||""]=+new Date,this},e.prototype.measureStop=function(a){return+new Date-this._.measures[a||""]},e});
