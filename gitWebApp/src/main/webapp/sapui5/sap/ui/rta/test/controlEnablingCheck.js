/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/core/ComponentContainer","sap/ui/core/mvc/XMLView","sap/ui/rta/command/CommandFactory","sap/ui/dt/ElementUtil","sap/ui/dt/ElementDesignTimeMetadata","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/ChangePersistence"],function(U,C,X,a,E,b,c,d){"use strict";var e=function(m,o){if(e._only&&(m.indexOf(e._only)<0)){return;}QUnit.module(m,{});QUnit.test("When using the 'controlEnablingCheck' function to test if your control is ready for UI adaptation at runtime",function(f){f.ok(o.afterAction,"then you implement a function to check if your action has been successful: See the afterAction parameter.");f.ok(o.afterUndo,"then you implement a function to check if the undo has been successful: See the afterUndo parameter.");f.ok(o.afterRedo,"then you implement a function to check if the redo has been successful: See the afterRedo parameter.");f.ok(o.xmlView,"then you provide an XML view to test on: See the.xmlView parameter.");var x=new DOMParser().parseFromString(o.xmlView,"application/xml").childNodes[0];f.ok(x.tagName.match("View$"),"then you use the sap.ui.core.mvc View tag as the first tag in your view");f.ok(o.action,"then you provide an action: See the action parameter.");f.ok(o.action.name,"then you provide an action name: See the action.name parameter.");f.ok(o.action.controlId,"then you provide the id of the control to operate the action on: See the action.controlId.");f.ok(o.action.parameter,"then you provide parameters for the action: See the action.parameter object.");});QUnit.module(m,{beforeEach:function(f){var t=this;var g=U.extend("sap.ui.rta.control.enabling.comp",{metadata:{manifest:{"sap.app":{"id":"sap.ui.rta.control.enabling.comp","type":"application"}}},createContent:function(){t.oView=sap.ui.xmlview({id:this.createId("view"),viewContent:o.xmlView});return t.oView;}});this.oUiComponent=new g("comp");this.oUiComponentContainer=new C({component:this.oUiComponent});this.oUiComponentContainer.placeAt(o.placeAt||"content");sap.ui.getCore().applyChanges();this.oControl=this.oView.byId(o.action.controlId);return E.loadDesignTimeMetadata(this.oControl).then(function(D){var h=new b({data:D});var p=o.action.parameter(t.oView);t.oCommand=a.getCommandFor(t.oControl,o.action.name,p,h);f.ok(t.oCommand,"then the underlying command is available");});},afterEach:function(){this.oUiComponentContainer.destroy();}});QUnit.test("When executing the underlying command on the control at runtime",function(f){this.oCommand.execute();sap.ui.getCore().applyChanges();o.afterAction(this.oUiComponent,this.oView,f);});QUnit.test("When executing and undoing the command",function(f){this.oCommand.execute();this.oCommand.undo();sap.ui.getCore().applyChanges();o.afterUndo(this.oUiComponent,this.oView,f);});QUnit.test("When executing, undoing and redoing the command",function(f){this.oCommand.execute();this.oCommand.undo();sap.ui.getCore().applyChanges();this.oCommand.execute();o.afterRedo(this.oUiComponent,this.oView,f);});};e.skip=function(){};e.only=function(m){e._only=m;};return e;},true);
