/*global QUnit*/

sap.ui.define([
	"com/mining/miningdetailsapp/controller/MiningDetails.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MiningDetails Controller");

	QUnit.test("I should test the MiningDetails controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
