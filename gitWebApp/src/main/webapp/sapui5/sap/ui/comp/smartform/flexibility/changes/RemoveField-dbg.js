/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */

sap.ui.define([
	'jquery.sap.global', 'sap/ui/fl/changeHandler/Base'
], function(jQuery, Base) {
	"use strict";

	/**
	 * Change handler for removing a smart form group element.
	 * @alias sap.ui.fl.changeHandler.RemoveField
	 * @author SAP SE
	 * @version 1.44.4
	 * @experimental Since 1.27.0
	 */
	var RemoveField = { };

	/**
	 * Removes a smart form group element.
	 *
	 * @param {sap.ui.fl.Change} oChange change wrapper object with instructions to be applied on the control map
	 * @param {sap.ui.comp.smartform.GroupElement} oField GroupElement control that matches the change selector for applying the change
	 * @param {object} mPropertyBag
	 * @param {object} mPropertyBag.modifier - modifier for the controls
	 * @public
	 */
	RemoveField.applyChange = function(oChange, oField, mPropertyBag) {
		var oModifier = mPropertyBag.modifier;
		var oView = mPropertyBag.view;
		var oGroup = oModifier.getParent(oField);
		if (oGroup) {
			oModifier.removeAggregation(oGroup, "groupElements", oField, oView);
		}

		return true;
	};

	/**
	 * Completes the change by adding change handler specific content
	 *
	 * @param {sap.ui.fl.Change} oChangeWrapper change wrapper object to be completed
	 * @param {object} oSpecificChangeInfo as an empty object since no additional attributes are required for this operation
	 * @public
	 */
	RemoveField.completeChangeContent = function(oChangeWrapper, oSpecificChangeInfo) {
		var oChange = oChangeWrapper.getDefinition();
		if (!oChange.content) {
			oChange.content = {};
		}
	};

	return RemoveField;
},
/* bExport= */true);
