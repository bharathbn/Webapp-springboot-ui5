/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/model/odata/type/Int32"],function(I){"use strict";var a=I.extend("sap.ui.comp.smartfield.type.Int32",{constructor:function(f,c){I.apply(this,[f,c]);this.oFieldControl=null;}});a.prototype.parseValue=function(v,s){var r=I.prototype.parseValue.apply(this,[v,s]);this.oFieldControl(v,s);return r;};a.prototype.getName=function(){return"sap.ui.comp.smartfield.type.Int32";};return a;});
