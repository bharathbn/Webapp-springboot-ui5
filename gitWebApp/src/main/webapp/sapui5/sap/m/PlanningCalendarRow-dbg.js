/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

//Provides control sap.ui.unified.PlanningCalendarRow.
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Element', './StandardListItem', './StandardListItemRenderer', 'sap/ui/core/Renderer', './library', 'sap/ui/unified/library'],
		function(jQuery, Element, StandardListItem, StandardListItemRenderer, Renderer, library, unifiedLibrary) {
	"use strict";

	/**
	 * Constructor for a new <code>PlanningCalendarRow</code>.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * Row in the <code>PlanningCalendar</code>.
	 *
	 * This element holds the data of one row in the <code>PlanningCalendar</code>. Once the header information (e.g. person information)
	 * is assigned, the appointments are assigned.
	 * @extends sap.ui.core.Element
	 * @version 1.44.4
	 *
	 * @constructor
	 * @public
	 * @since 1.34.0
	 * @alias sap.m.PlanningCalendarRow
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var PlanningCalendarRow = Element.extend("sap.m.PlanningCalendarRow", /** @lends sap.m.PlanningCalendarRow.prototype */ { metadata : {

		library : "sap.m",
		properties : {

			/**
			 * Title of the header (e.g. name of the person)
			 */
			title : {type : "string", group : "Data"},

			/**
			 * Text of the header (e.g. department of the person)
			 */
			text : {type : "string", group : "Data"},

			/**
			 * Icon of the header (e.g. picture of the person)
			 *
			 * URI of an image or an icon registered in sap.ui.core.IconPool.
			 */
			icon : {type : "sap.ui.core.URI", group : "Data", defaultValue : null},

			/**
			 * If set, the provided weekdays are displayed as non-working days.
			 * Valid values inside the array are 0 to 6. (other values will just be ignored.)
			 *
			 * If not set, the weekend defined in the locale settings is displayed as non-working days.
			 *
			 * <b>Note:</b> The non-working days are only visualized if <code>intervalType</code> is set to day.
			 */
			nonWorkingDays : {type : "int[]", group : "Misc", defaultValue : null},

			/**
			 * If set, the provided hours are displayed as non-working hours.
			 * Valid values inside the array are 0 to 23. (other values will just be ignored.)
			 *
			 * <b>Note:</b> The non-working hours are only visualized if <code>intervalType</code> is set to hour.
			 */
			nonWorkingHours : {type : "int[]", group : "Misc", defaultValue : null},

			/**
			 * Defines the selected state of the <code>PlanningCalendarRow</code>.
			 * <b>Note:</b> Binding the <code>selected</code> property in single selection modes may cause unwanted results if you have more than one selected row in your binding.
			 */
			selected : {type : "boolean", group : "Data", defaultValue : false},

			/**
			 * Can be used as an identifier of the row
			 */
			key : {type : "string", group : "Data", defaultValue : null}

		},
		aggregations : {

			/**
			 * Appointments to be displayed in the row. Appointments outside the visible time frame are not rendered.
			 *
			 * <b>Note:</b> For performance reasons only appointments in the visible time range or nearby should be assigned.
			 */
			appointments : {type : "sap.ui.unified.CalendarAppointment", multiple : true, singularName : "appointment"},

			/**
			 * Appointments to be displayed in the top of the intervals. The <code>intervalHeaders</code> are used to visualize
			 * public holidays and similar things.
			 *
			 * Appointments outside the visible time frame are not rendered.
			 *
			 * The <code>intervalHeaders</code> always fill whole intervals. If they are shorter than one interval they are not displayed.
			 *
			 * <b>Note:</b> For performance reasons only appointments in the visible time range or nearby should be assigned.
			 */
			intervalHeaders : {type : "sap.ui.unified.CalendarAppointment", multiple : true, singularName : "intervalHeader"}

		}
	}});

	var CalenderRowHeader = StandardListItem.extend("CalenderRowHeader", {

		metadata : {

			associations: {
				parentRow: { type: "sap.m.PlanningCalendarRow", multiple: false}
			}

		},

		setParentRow: function(sId) {

			this.setAssociation("parentRow", sId, true);

			if (!sId) {
				this._oRow = undefined;
			} else if (typeof sId == "string") {
				this._oRow = sap.ui.getCore().byId(sId);
			} else {
				this._oRow = sId;
			}

			return this;

		},

		renderer: Renderer.extend(StandardListItemRenderer)

	});

	/*global CalenderRowHeaderRenderer:true*/
	CalenderRowHeaderRenderer.openItemTag = function(oRm, oLI) {
		oRm.write("<div");
	};

	CalenderRowHeaderRenderer.closeItemTag = function(oRm, oLI) {
		oRm.write("</div>");
	};

	CalenderRowHeaderRenderer.renderTabIndex = function(oRm, oLI) {
	};

	PlanningCalendarRow.prototype.init = function(){

		var sId = this.getId();
		var oCalendarRowHeader = new CalenderRowHeader(sId + "-Head", {parentRow: this});
		var oCalendarRow = new sap.ui.unified.CalendarRow(sId + "-CalRow", {
			checkResize: false,
			updateCurrentTime: false,
			ariaLabelledBy: sId + "-Head"
		});
		oCalendarRow._oPlanningCalendarRow = this;

		oCalendarRow.getAppointments = function() {

			if (this._oPlanningCalendarRow) {
				return this._oPlanningCalendarRow.getAppointments();
			}else {
				return [];
			}

		};

		oCalendarRow.getIntervalHeaders = function() {

			if (this._oPlanningCalendarRow) {
				return this._oPlanningCalendarRow.getIntervalHeaders();
			}else {
				return [];
			}

		};

		this._oColumnListItem = new sap.m.ColumnListItem(this.getId() + "-CLI", {
			cells: [ oCalendarRowHeader,
			         oCalendarRow]
		});

	};

	PlanningCalendarRow.prototype.exit = function(){

		this._oColumnListItem.destroy();
		this._oColumnListItem = undefined;

	};

	PlanningCalendarRow.prototype.setTooltip = function(vTooltip){

		this.setAggregation("tooltip", vTooltip, true); // do not invalidate, only real rendered control must be invalidated
		this._oColumnListItem.getCells()[0].setTooltip(vTooltip);

		return this;

	};

	PlanningCalendarRow.prototype.setTitle = function(sTitle){

		this.setProperty("title", sTitle, true); // do not invalidate, only real rendered control must be invalidated
		this._oColumnListItem.getCells()[0].setTitle(sTitle);

		return this;

	};

	PlanningCalendarRow.prototype.setText = function(sText){

		this.setProperty("text", sText, true); // do not invalidate, only real rendered control must be invalidated
		this._oColumnListItem.getCells()[0].setDescription(sText);

		if (sText) {
			this._oColumnListItem.getCells()[1].addStyleClass("sapMPlanCalRowLarge");
		} else {
			this._oColumnListItem.getCells()[1].removeStyleClass("sapMPlanCalRowLarge");
		}

		return this;

	};

	PlanningCalendarRow.prototype.setIcon = function(sIcon){

		this.setProperty("icon", sIcon, true); // do not invalidate, only real rendered control must be invalidated
		this._oColumnListItem.getCells()[0].setIcon(sIcon);

		return this;

	};

	PlanningCalendarRow.prototype.setNonWorkingDays = function(aNonWorkingDays){

		this.setProperty("nonWorkingDays", aNonWorkingDays, true); // do not invalidate, only real rendered control must be invalidated
		this.getCalendarRow().setNonWorkingDays(aNonWorkingDays);

		return this;

	};

	PlanningCalendarRow.prototype.setNonWorkingHours = function(aNonWorkingHours){

		this.setProperty("nonWorkingHours", aNonWorkingHours, true); // do not invalidate, only real rendered control must be invalidated
		this.getCalendarRow().setNonWorkingHours(aNonWorkingHours);

		return this;

	};

	PlanningCalendarRow.prototype.invalidate = function(oOrigin) {

		if (!oOrigin || !(oOrigin instanceof sap.ui.unified.CalendarAppointment)) {
			Element.prototype.invalidate.apply(this, arguments);
		}else if (this._oColumnListItem) {
			// Appointment changed -> only invalidate internal CalendarRow (not if ColumnListItem is already destroyed)
			this.getCalendarRow().invalidate(oOrigin);
		}

	};

	// overwrite removing of appointments because invalidate don't get information about it
	PlanningCalendarRow.prototype.removeAppointment = function(vObject) {

		var oRemoved = this.removeAggregation("appointments", vObject, true);
		this.getCalendarRow().invalidate();
		return oRemoved;

	};

	PlanningCalendarRow.prototype.removeAllAppointments = function() {

		var aRemoved = this.removeAllAggregation("appointments", true);
		this.getCalendarRow().invalidate();
		return aRemoved;

	};

	PlanningCalendarRow.prototype.destroyAppointments = function() {

		var oDestroyed = this.destroyAggregation("appointments", true);
		this.getCalendarRow().invalidate();
		return oDestroyed;

	};

	PlanningCalendarRow.prototype.removeIntervalHeader = function(vObject) {

		var oRemoved = this.removeAggregation("intervalHeaders", vObject, true);
		this.getCalendarRow().invalidate();
		return oRemoved;

	};

	PlanningCalendarRow.prototype.removeAllIntervalHeaders = function() {

		var aRemoved = this.removeAllAggregation("intervalHeaders", true);
		this.getCalendarRow().invalidate();
		return aRemoved;

	};

	PlanningCalendarRow.prototype.destroyIntervalHeaders = function() {

		var oDestroyed = this.destroyAggregation("intervalHeaders", true);
		this.getCalendarRow().invalidate();
		return oDestroyed;

	};

	PlanningCalendarRow.prototype.setSelected = function(bSelected){

		this.setProperty("selected", bSelected, true);
		this._oColumnListItem.setSelected(bSelected);

		return this;

	};

	/**
	 * A <code>PlanningCalendarRow</code> is rendered inside a <code>sap.m.Table</code> as <code>sap.m.ColumnListItem</code>.
	 *
	 * @returns {sap.m.ColumnListItem} <code>sap.m.ColumnListItem</code> that represents <code>PlanningCalendarRow</code> in the table.
	 * @private
	 */
	PlanningCalendarRow.prototype.getColumnListItem = function(){

		return this._oColumnListItem;

	};

	/**
	 * The <code>PlanningCalendarRow</code> appointments are rendered in a <ode>CalendarRow</code> control.
	 *
	 * @returns {sap.ui.uinified.CalendarRow} <code>sap.ui.uinified.CalendarRow</code> that renders <code>PlanningCalendarRow</code> appointments.
	 * @private
	 */
	PlanningCalendarRow.prototype.getCalendarRow = function(){

		return this._oColumnListItem.getCells()[1];

	};

	PlanningCalendarRow.prototype.applyFocusInfo = function (oFocusInfo) {

		// forward to CalendarRow
		this.getCalendarRow().applyFocusInfo(oFocusInfo);

		return this;

	};

	return PlanningCalendarRow;

}, /* bExport= */ true);
