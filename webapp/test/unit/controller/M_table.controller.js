/*global QUnit*/

sap.ui.define([
	"m_table/m_table/controller/M_table.controller"
], function (Controller) {
	"use strict";

	QUnit.module("M_table Controller");

	QUnit.test("I should test the M_table controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
