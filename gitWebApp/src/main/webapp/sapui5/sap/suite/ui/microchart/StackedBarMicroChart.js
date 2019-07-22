/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/m/Size','sap/m/ValueColor','sap/ui/Device'],function(q,l,C,S,V,D){"use strict";var c=C.extend("sap.suite.ui.microchart.StackedBarMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{size:{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto"},maxValue:{type:"float",group:"Appearance",defaultValue:null},precision:{type:"int",group:"Appearance",defaultValue:1}},defaultAggregation:"bars",aggregations:{bars:{type:"sap.suite.ui.microchart.StackedBarMicroChartBar",multiple:true,bindable:"bindable"}},events:{press:{}}}});c.EDGE_CASE_HIDE_CHART=12;c.EDGE_CASE_HEIGHT_SHOW_VALUES=14;c.BAR_COLOR_PARAM_DEFAULT="sapUiChart";c.BAR_LABEL_CSSCLASS=".sapSuiteStackedMCBarLabel";c.BAR_CSSCLASS=".sapSuiteStackedMCBar";c.prototype.attachEvent=function(e,d,f,L){C.prototype.attachEvent.call(this,e,d,f,L);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer");}return this;};c.prototype.detachEvent=function(e,f,L){C.prototype.detachEvent.call(this,e,f,L);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer");}return this;};c.prototype.onclick=function(e){if(D.browser.msie||D.browser.edge){this.$().focus();}this.firePress();};c.prototype.onsapspace=c.prototype.onclick;c.prototype.onsapenter=c.prototype.onclick;c.prototype.setMaxValue=function(m){var M=q.isNumeric(m);this.setProperty("maxValue",M?m:null);return this;};c.prototype.setTooltip=function(t){this._title=null;this.setAggregation("tooltip",t,true);};c.prototype.getTooltip_AsString=function(){var a=this._calculateChartData();return this._getTooltip(a);};c.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","{AltText}",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};c.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};c.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};c.prototype.onBeforeRendering=function(){if(l._isInGenericTile(this)){l._removeStandardMargins(this);}this.$().unbind("mouseenter",this._addTitleAttribute);this.$().unbind("mouseleave",this._removeTitleAttribute);};c.prototype.onAfterRendering=function(){D.media.attachHandler(this._onResize,this);this._onResize();this.$().bind("mouseenter",this._addTitleAttribute.bind(this));this.$().bind("mouseleave",this._removeTitleAttribute.bind(this));};c.prototype._getLocalizedColorMeaning=function(a){return this._oRb.getText(("SEMANTIC_COLOR_"+a).toUpperCase());};c.prototype._calculateChartData=function(){var d=[];var e=this.getBars();var I=e.length;var f=12;var g=1;var p=this.getPrecision();var n=function(){if(f){if(g===f){g=1;}return c.BAR_COLOR_PARAM_DEFAULT+(g++);}};var t=0;var m=this.getMaxValue();for(var i=0;i<I;i++){if(!isNaN(e[i].getValue())){t=t+e[i].getValue();}}var T=Math.max(m,t);var v=m>=t;var P=0;var w=0;for(var i=0;i<I;i++){var o={};o.oBarData=e[i];o.color=e[i].getValueColor();if(!o.color){o.color=n();}var h=isNaN(e[i].getValue())?0:e[i].getValue();var j=T===0?0:h*100/T;o.value=this._roundFloat(j,p);o.width=this._roundFloat(j,2);P=P+o.value;w=w+o.width;if(v){o.displayValue=e[i].getDisplayValue()||String(h);}else{o.displayValue=e[i].getDisplayValue()||String(o.value+"%");}d.push(o);}P=this._roundFloat(P,p);w=this._roundFloat(w,2);if(w>100&&d.length>0){var M=d.slice(0).sort(function(a,b){return b.width-a.width;})[0];M.width=this._roundFloat(M.width-w+100,2);}if(m>t){var o={};o.value=this._roundFloat(100-P,p);o.width=this._roundFloat(100-w,2);d.push(o);}else if(d.length>0&&w<100){var M=d.slice(0).sort(function(a,b){return b.width-a.width;})[0];M.width=this._roundFloat(M.width-w+100,2);}return d;};c.prototype._roundFloat=function(n,p){return parseFloat(n.toFixed(p));};c.prototype._onResize=function(){var $=this.$();if(this.getSize()===S.Responsive){this._adjustToParent($);}this._resizeVertically($);this._resizeHorizontally($);};c.prototype._adjustToParent=function($){var p,P;var o=this.getParent();if(!o){return;}if(o instanceof sap.m.FlexBox){p=parseInt(o.$().height(),10);P=parseInt(o.$().width(),10);}else if(o instanceof sap.m.TileContent){p=parseInt(o.$().children().height(),10);P=parseInt(o.$().children().width(),10);}else if(q.isFunction(o.getRootNode)){p=Math.round(q(o.getRootNode()).height());P=Math.round(q(o.getRootNode()).width());}if(p>0){$.height(p);}if(P>0){$.width(P);}};c.prototype._resizeVertically=function($){var b=parseFloat($.find(c.BAR_CSSCLASS).height(),10);var i=parseFloat($.height(),10);if(i<c.EDGE_CASE_HIDE_CHART){$.hide();return;}if(i>b){$.height(b);}if(b<c.EDGE_CASE_HEIGHT_SHOW_VALUES){$.find(c.BAR_LABEL_CSSCLASS).hide();}else{$.find(c.BAR_LABEL_CSSCLASS).css("line-height",b+"px");}};c.prototype._resizeHorizontally=function($){var w=parseFloat($.width(),10);if(w<c.EDGE_CASE_HIDE_CHART){$.hide();}this._hideTruncatedLabel($,c.BAR_LABEL_CSSCLASS);};c.prototype._hideTruncatedLabel=function($,a){var L=$.find(a);for(var i=0;i<L.length;i++){if(L[i].offsetWidth<L[i].scrollWidth-1){$.find(L[i]).hide();}}};c.prototype._createTooltipText=function(a){var t="";if(this._isTooltipSuppressed()){return t;}for(var i=0;i<a.length;i++){var d=a[i];if(d.displayValue){t+=((i===0)?"":"\n")+d.displayValue;if(V[d.color]){t+=" "+this._getLocalizedColorMeaning(d.color);}}}return t;};c.prototype._getTooltip=function(a){if(this._isTooltipSuppressed()){return null;}var t=this.getTooltip();var T=this._createTooltipText(a);if(typeof t==="string"||t instanceof String){T=t.split("{AltText}").join(T).split("((AltText))").join(T);return T;}else if(this.isBound("tooltip")&&!t){return T;}return t;};c.prototype._isTooltipSuppressed=function(){var t=this.getTooltip();if(t&&q.trim(t).length===0){return true;}else{return false;}};c.prototype._addTitleAttribute=function(){if(this.$().attr("title")){return;}if(!this._title){var a=this._calculateChartData();this._title=this._getTooltip(a);}if(this._title){this.$().attr("title",this._title);}};c.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this._title=this.$().attr("title");this.$().removeAttr("title");}};return c;});
