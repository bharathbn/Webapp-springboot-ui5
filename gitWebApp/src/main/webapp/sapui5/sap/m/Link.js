/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/InvisibleText','sap/ui/core/EnabledPropagator','sap/ui/core/LabelEnablement'],function(q,l,C,I,E,L){"use strict";var a=C.extend("sap.m.Link",{metadata:{interfaces:["sap.ui.core.IShrinkable"],library:"sap.m",properties:{text:{type:"string",group:"Data",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},target:{type:"string",group:"Behavior",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},subtle:{type:"boolean",group:"Behavior",defaultValue:false},emphasized:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{allowPreventDefault:true}}}});E.call(a.prototype);a.prototype.onBeforeRendering=function(){this.removeAssociation("ariaLabelledBy",this.getId(),true);if(this.getAriaLabelledBy().length>0||L.getReferencingLabels(this).length>0){this.addAssociation("ariaLabelledBy",this.getId(),true);}};a.prototype.onsapspace=function(e){this._handlePress(e);if(this.getHref()&&!e.isDefaultPrevented()){e.preventDefault();e.setMarked();var c=document.createEvent('MouseEvents');c.initEvent('click',false,true);this.getDomRef().dispatchEvent(c);}};a.prototype._handlePress=function(e){if(this.getEnabled()){e.setMarked();if(!this.firePress()||!this.getHref()){e.preventDefault();}}else{e.preventDefault();}};if(sap.ui.Device.support.touch){a.prototype.ontap=a.prototype._handlePress;}else{a.prototype.onclick=a.prototype._handlePress;}a.prototype.ontouchstart=function(e){if(this.getEnabled()){e.setMarked();}};a.prototype.setText=function(t){this.setProperty("text",t,true);t=this.getProperty("text");this.$().text(t);return this;};a.prototype.setHref=function(u){this.setProperty("href",u,true);if(this.getEnabled()){u=this.getProperty("href");this.$().attr("href",u);}return this;};a.prototype.setSubtle=function(s){this.setProperty("subtle",s,true);var $=this.$();if($.length){$.toggleClass("sapMLnkSubtle",s);if(s){a._addToDescribedBy($,this._sAriaLinkSubtleId);}else{a._removeFromDescribedBy($,this._sAriaLinkSubtleId);}}if(s&&!a.prototype._sAriaLinkSubtleId){a.prototype._sAriaLinkSubtleId=a._getARIAInvisibleTextId("LINK_SUBTLE");}return this;};a.prototype.setEmphasized=function(e){this.setProperty("emphasized",e,true);var $=this.$();if($.length){$.toggleClass("sapMLnkEmphasized",e);if(e){a._addToDescribedBy($,this._sAriaLinkEmphasizedId);}else{a._removeFromDescribedBy($,this._sAriaLinkEmphasizedId);}}if(e&&!a.prototype._sAriaLinkEmphasizedId){a.prototype._sAriaLinkEmphasizedId=a._getARIAInvisibleTextId("LINK_EMPHASIZED");}return this;};a.prototype.setWrapping=function(w){this.setProperty("wrapping",w,true);this.$().toggleClass("sapMLnkWrapping",w);return this;};a.prototype.setEnabled=function(e){if(e!==this.getProperty("enabled")){this.setProperty("enabled",e,true);var $=this.$();$.toggleClass("sapMLnkDsbl",!e);if(e){$.attr("disabled",false);$.attr("tabindex","0");$.removeAttr("aria-disabled");if(this.getHref()){$.attr("href",this.getHref());}}else{$.attr("disabled",true);$.attr("tabindex","-1");$.attr("aria-disabled",true);$.attr("href","#");}}return this;};a.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().toggleClass("sapMLnkMaxWidth",!w);this.$().css("width",w);return this;};a.prototype.setTarget=function(t){this.setProperty("target",t,true);if(!t){this.$().removeAttr("target");}else{this.$().attr("target",t);}return this;};a._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m");};a._getARIAInvisibleTextId=function(r){var R=a._getResourceBundle();return new I({text:R.getText(r)}).toStatic().getId();};a._addToDescribedBy=function($,i){var A=$.attr("aria-describedby");if(A){$.attr("aria-describedby",A+" "+i);}else{$.attr("aria-describedby",i);}};a._removeFromDescribedBy=function($,i){var A=$.attr("aria-describedby");if(A&&A.indexOf(i)!==-1){A=A.replace(i,'');if(A.length>1){$.attr("aria-describedby",A);}else{$.removeAttr("aria-describedby");}}};a.prototype.getAccessibilityInfo=function(){return{role:"link",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LINK"),description:this.getText()||this.getHref()||"",focusable:this.getEnabled(),enabled:this.getEnabled()};};return a;},true);