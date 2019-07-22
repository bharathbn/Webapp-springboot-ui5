/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/dt/Plugin","sap/ui/model/json/JSONModel",'sap/ui/dt/ElementUtil','sap/ui/dt/OverlayRegistry','sap/ui/rta/Utils','sap/ui/core/StashedControlSupport','sap/ui/dt/ElementDesignTimeMetadata'],function(q,P,J,E,O,U,S,a){"use strict";function _(s,o){var p,r;if(s){p=o.getParentElementOverlay();r=o.getPublicParentElementOverlay();}else{p=o;if(o.isInHiddenTree()){r=o.getPublicParentElementOverlay();}else{r=o;}}return{publicParentOverlay:r,parentOverlay:p,publicParent:r.getElementInstance(),parent:p.getElementInstance()};}function b(p,C){return C.sParentAggregationName;}function c(o,s){var I=E.getAggregation(o,s).filter(function(o){return o.getVisible&&!o.getVisible();});var p=S.getStashedControls(o.getId());return I.concat(p);}function d(s,o){var p=_(s,o);var D;var r={};if(o.isInHiddenTree()){D=p.publicParentOverlay.getDesignTimeMetadata();var R=D.getAggregationAction("reveal",p.parent)[0];if(R){if(!R.getAggregationName){R.getAggregationName=b;}var G=R.getInvisibleElements||c;var I=G(p.publicParent,R.aggregation);r[R.aggregation]={reveal:{elements:I,types:I.reduce(function(w,x){w[x.getMetadata().getName()]={designTimeMetadata:D,action:R};return w;},{})}};}}else{var t=[p.parentOverlay];var u=j(p.parent,p.parentOverlay.getDesignTimeMetadata());if(u!==p.parent){t=E.findAllSiblingsInContainer(p.parent,u).map(function(w){return O.getOverlay(w);});}var v;if(s){v=[o.getElementInstance().sParentAggregationName];}v=p.parentOverlay.getAggregationOverlays().filter(function(w){return!w.getDesignTimeMetadata().isIgnored();}).map(function(w){return w.getAggregationName();});r=v.reduce(function(w,x){var I=t.reduce(function(y,z){return y.concat(c(z.getElementInstance(),x));},[]);var T=I.reduce(function(T,y){var z=y.getMetadata().getName();if(!T[z]){if(z==="sap.ui.core._StashedControl"){T[z]={designTimeMetadata:new a({data:{name:{singular:function(){return sap.uxap.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME");},plural:function(){return sap.uxap.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME_PLURAL");}},actions:{reveal:{changeType:"unstashControl",getAggregationName:b}}}}),action:{changeType:"unstashControl",getAggregationName:b}};}else{var o=O.getOverlay(y);if(o){var D=o.getDesignTimeMetadata();var R=D&&D.getAction("reveal",y);if(R){if(!R.getAggregationName){R.getAggregationName=b;}T[z]={designTimeMetadata:D,action:R};}}}}return T;},{});if(I.length>0&&Object.keys(T).length>0){w[x]={reveal:{elements:I,types:T}};}return w;},{});}return r;}function e(s,o){var p=_(s,o);var D=p.publicParentOverlay.getDesignTimeMetadata();var r=D.getAggregationAction("addODataProperty",p.parent);var t=r.reduce(function(u,v){u[v.aggregation]={addODataProperty:{designTimeMetadata:D,action:v}};return u;},{});return t;}function f(s,o){var r=d(s,o);var p=e(s,o);var t=q.extend(true,r,p);var u=Object.keys(t);if(u.length===0){return{};}else if(u.length>1){q.sap.log.error("reveal or addODataProperty action defined for more than 1 aggregation, that is not yet possible");}var v=u[0];t[v].aggregation=v;return t[v];}var g=true,h=false;function i(r,o,p,s){var N=[];var C;var t;if(o.addODataProperty){var u=o.aggregation;var D=o.addODataProperty.designTimeMetadata;C=D.getAggregationDescription(u,p);if(C){t=s?C.singular:C.plural;N.push(t);}}if(o.reveal){Object.keys(o.reveal.types).forEach(function(w){var x=o.reveal.types[w];C=x.designTimeMetadata.getName(p);if(C){t=s?C.singular:C.plural;N.push(t);}});}var v=N.reduce(function(w,x){if(w.indexOf(x)===-1){w.push(x);}return w;},[]);var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");if(v.length===1){t=v[0];}else{t=T.getText("MULTIPLE_CONTROL_NAME");}return T.getText(r,t);}function j(p,D){if(D.getData().getRelevantContainer){return D.getData().getRelevantContainer(p);}else{return p;}}var A=P.extend("sap.ui.rta.plugin.additionalElements.AdditionalElementsPlugin",{metadata:{library:"sap.ui.rta",properties:{analyzer:"object",dialog:"object",commandFactory:"object"},associations:{},events:{}},getContextMenuTitle:function(o,p){var r=_(o,p);var s=f(o,p);return i("CTX_ADD_ELEMENTS",s,r.parent,g);},isAvailable:function(o,p){var r=f(o,p);return r.reveal||r.addODataProperty;},isEnabled:function(o,p){if(o){if(!U.hasParentStableId(p)){return false;}}var r=f(o,p);if(r.reveal&&r.reveal.elements.length===0&&!r.addODataProperty){return false;}return U.isEditable(p);},showAvailableElements:function(o,p){var r=p[0];var s=_(o,r);var t=o&&r.getElementInstance();var u=[];var v=this;var w=f(o,r);if(w.reveal){u.push(this.getAnalyzer().enhanceInvisibleElements(s.publicParent,w.reveal));}if(w.addODataProperty){w.addODataProperty.relevantContainer=j(s.publicParent,w.addODataProperty.designTimeMetadata);u.push(this.getAnalyzer().getUnboundODataProperties(s.publicParent,w.addODataProperty));}if(w.aggregation){this._setDialogTitle(w,s.parent);}return Promise.resolve().then(function(){if(w.addODataProperty){return U.isServiceUpToDate();}}).then(function(){if(w.addODataProperty){return U.isCustomFieldAvailable(s.parent);}}).then(function(C){if(C){v._oCurrentFieldExtInfo=C;v.getDialog().setCustomFieldEnabled(true);v.getDialog().detachEvent('openCustomField',v._onOpenCustomField,v);v.getDialog().attachEvent('openCustomField',null,v._onOpenCustomField,v);}}).then(l.bind(null,u)).then(function(x){if(v.getDialog().getModel()){v.getDialog().getModel().setProperty("/elements",x);}else{v.getDialog().setModel(new J({elements:x}));}return v.getDialog().open().then(function(){v._createCommands(o,r,s,t,w.designTimeMetadata,w);}).catch(function(y){if(y instanceof Error){throw y;}});}).catch(function(x){if(x instanceof Error){throw x;}else{q.sap.log.info("Service not up to date, skipping add dialog","sap.ui.rta");}});},_setDialogTitle:function(o,p){var D=i("HEADER_ADDITIONAL_ELEMENTS",o,p,h);this.getDialog().setTitle(D);},_onOpenCustomField:function(o){var C=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService("CrossApplicationNavigation");var H=(C&&C.hrefForExternal({target:{semanticObject:"CustomField",action:"develop"},params:{businessContexts:this._oCurrentFieldExtInfo.BusinessContexts,serviceName:this._oCurrentFieldExtInfo.ServiceName,serviceVersion:this._oCurrentFieldExtInfo.ServiceVersion,entityType:this._oCurrentFieldExtInfo.EntityType}}));U.openNewWindow(H);},_createCommands:function(s,o,p,r,D,t){var u=this;var v=k(this.getDialog());if(v.length>0){var C=this.getCommandFactory().getCommandFor(p.parent,"composite");v.forEach(function(w){var x;switch(w.type){case"invisible":var R=w.element;var T=R.getMetadata().getName();var y=t.reveal.types[T];var D=y.designTimeMetadata;if(p.publicParent!=p.parent){var z=D.createAggregationDesignTimeMetadata(t.aggregation);x=u.getCommandFactory().getCommandFor(p.publicParent,"reveal",{revealedElementId:R.getId(),hiddenParent:p.parent},z);}else{x=u.getCommandFactory().getCommandFor(R,"reveal",{},D);}C.addCommand(x);var B=y.action.getAggregationName(p.parent,R);var F=m(R,p);var G=p.parent;var H=U.getIndex(p.parent,r,B);var I=U.getIndex(F,R,B)-1;H=n(F,G,I,H);if(H!==I||p.parent!==R.getParent()){var K=p.publicParentOverlay.getDesignTimeMetadata();x=u.getCommandFactory().getCommandFor(p.publicParent,"move",{movedElements:[{element:R,sourceIndex:I,targetIndex:H}],source:{publicParent:p.publicParent,publicAggregation:t.aggregation,parent:F,aggregation:B},target:{publicParent:p.publicParent,publicAggregation:t.aggregation,parent:G,aggregation:B}},K);if(x){C.addCommand(x);}else{q.sap.log.warning("No move action configured for "+p.publicParent.getMetadata().getName()+", aggregation: "+t.aggregation,"sap.ui.rta");}}break;case"odata":var L=t.addODataProperty.designTimeMetadata;var M=L.createAggregationDesignTimeMetadata(t.aggregation);var N=U.getIndex(p.parent,r,t.aggregation,M.getData().getIndex);x=u.getCommandFactory().getCommandFor(p.publicParent,"addODataProperty",{newControlId:U.createFieldLabelId(p.publicParent,w.entityType,w.bindingPath),index:N,label:w.label,bindingString:w.bindingPath},L);C.addCommand(x);break;}});this.fireElementModified({"command":C});}}});function k(D){return D.getModel().getObject("/elements").filter(function(o){return o.selected;});}function l(p){return Promise.all(p).then(function(o){var r=o[0]||[];if(r&&o[1]){r=r.concat(o[1]);}return r;});}function m(r,p){var o=r.getParent();if(!o&&r.sParentId){o=sap.ui.getCore().byId(r.sParentId);}else if(!o){o=p.parent;}return o;}function n(s,t,o,T){if(s===t&&o<T&&o>-1){return T-1;}return T;}A.hasRevealActionsOnChildren=function(o){var r=d(false,o);return!!r&&Object.keys(r).length>0;};return A;});
