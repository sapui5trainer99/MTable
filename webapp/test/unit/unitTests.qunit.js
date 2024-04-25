/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"m_table/m_table/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
