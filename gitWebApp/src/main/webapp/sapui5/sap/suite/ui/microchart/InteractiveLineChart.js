/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/suite/ui/microchart/InteractiveLineChartPoint'],function(q,l,C,I){"use strict";var a=C.extend("sap.suite.ui.microchart.InteractiveLineChart",{metadata:{library:"sap.suite.ui.microchart",properties:{maxDisplayedPoints:{type:"int",group:"Appearance",defaultValue:6},selectionEnabled:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"points",aggregations:{points:{type:"sap.suite.ui.microchart.InteractiveLineChartPoint",multiple:true,bindable:"bindable"}},events:{selectionChanged:{parameters:{selectedPoints:{type:"sap.suite.ui.microchart.InteractiveLineChartPoint[]"},point:{type:"sap.suite.ui.microchart.InteractiveLineChartPoint"},selected:{type:"boolean"}}}},associations:{}}});a._MAX_SCALED_CANVAS_VALUE=99;a._MIN_SCALED_CANVAS_VALUE=1;a.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this._aNormalisedValues=[];this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};a.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};a.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};a.prototype.onBeforeRendering=function(){if(!this.data("_parentRenderingContext")&&q.isFunction(this.getParent)){this.data("_parentRenderingContext",this.getParent());}this._updateNormalizedValues();};a.prototype.onAfterRendering=function(){var c=this.$();this._adjustToParent(c);};a.prototype.onclick=function(e){var i=q(e.target).parent();var h,f=this.$().find(".sapSuiteILCInteractionArea");var b=this.$().find(".sapSuiteILCSection").index(i);if(b>=0){this._toggleSelected(b);h=f.index(this.$().find(".sapSuiteILCInteractionArea[tabindex='0']"));this._switchTabindex(h,b,f);}};a.prototype.onsapleft=function(e){var f=this.$().find(".sapSuiteILCInteractionArea");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i-1,f);}e.preventDefault();e.stopImmediatePropagation();};a.prototype.onsapright=function(e){var f=this.$().find(".sapSuiteILCInteractionArea");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i+1,f);}e.preventDefault();e.stopImmediatePropagation();};a.prototype.onsapup=a.prototype.onsapleft;a.prototype.onsapdown=a.prototype.onsapright;a.prototype.onsapenter=function(e){var i=this.$().find(".sapSuiteILCInteractionArea").index(e.target);if(i!==-1){this._toggleSelected(i);}e.preventDefault();e.stopImmediatePropagation();};a.prototype.onsapspace=a.prototype.onsapenter;a.prototype.onsaphome=function(e){var f=this.$().find(".sapSuiteILCInteractionArea");var i=f.index(e.target);if(i!==0&&f.length>0){this._switchTabindex(i,0,f);}e.preventDefault();e.stopImmediatePropagation();};a.prototype.onsapend=function(e){var f=this.$().find(".sapSuiteILCInteractionArea");var i=f.index(e.target),L=f.length;if(i!==L-1&&L>0){this._switchTabindex(i,L-1,f);}e.preventDefault();e.stopImmediatePropagation();};a.prototype._adjustToParent=function(c){if(this.data("_parentRenderingContext")&&this.data("_parentRenderingContext")instanceof sap.m.FlexBox){var p=this.data("_parentRenderingContext").$();var P=parseFloat(p.width())-2;var i=parseFloat(p.height())-2;c.outerWidth(P);c.outerHeight(i);}};a.prototype.getSelectedPoints=function(){var s=[],p=this.getAggregation("points");for(var i=0;i<p.length;i++){if(p[i].getSelected()){s.push(p[i]);}}return s;};a.prototype.setSelectedPoints=function(s){var p=this.getAggregation("points"),i,b;this._deselectAllSelectedPoints();if(!s){return this;}if(s instanceof I){s=[s];}if(q.isArray(s)){for(i=0;i<s.length;i++){var b=this.indexOfAggregation("points",s[i]);if(b>=0){p[b].setProperty("selected",true,true);}else{q.sap.log.warning("setSelectedPoints method called with invalid InteractiveLineChartPoint element");}}}this.invalidate();return this;};a.prototype._deselectAllSelectedPoints=function(){var p=this.getPoints();for(var i=0;i<p.length;i++){if(p[i].getSelected()){p[i].setProperty("selected",false,true);}}};a.prototype._switchTabindex=function(o,n,f){if(o>=0&&o<f.length&&n>=0&&n<f.length){f.eq(o).removeAttr("tabindex");f.eq(n).attr("tabindex","0");f.eq(n).focus();}};a.prototype._toggleSelected=function(i){if(i<0||i>=this.getPoints().length){return;}var p=this.getPoints()[i],s=this.$("point-area-"+i);if(p.getSelected()){s.removeClass("sapSuiteILCSelected");p.setProperty("selected",false,true);}else{s.addClass("sapSuiteILCSelected");p.setProperty("selected",true,true);}this.fireSelectionChanged({selectedPoints:this.getSelectedPoints(),point:p,selected:p.getSelected()});};a.prototype._updateNormalizedValues=function(){var n,b,c,d=this.getPoints().length;this._aNormalisedValues=[];for(var i=0;i<d;i++){if(!this.getPoints()[i]._bNullValue){if(isNaN(n)){n=this.getPoints()[i].getValue();}else{n=Math.max(n,this.getPoints()[i].getValue());}if(isNaN(b)){b=this.getPoints()[i].getValue();}else{b=Math.min(b,this.getPoints()[i].getValue());}}}var e=n-b;for(var i=0;i<d;i++){if(this.getPoints()[i]._bNullValue){this._aNormalisedValues.push(0);}else if(e){c=(this.getPoints()[i].getValue()-b)/e;c=a._MIN_SCALED_CANVAS_VALUE+c*(a._MAX_SCALED_CANVAS_VALUE-a._MIN_SCALED_CANVAS_VALUE);this._aNormalisedValues.push(c);}else{this._aNormalisedValues.push(50);}}};return a;});