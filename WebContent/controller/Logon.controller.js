sap.ui.define([
	"com/sap/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator"
], function(BaseController, MessageToast, Filter, JSONModel, FilterOperator){
	"use strict";
	return BaseController.extend("com.sap.controller.Logon", {
		onInit : function(){
			// set model
		/*	var oInfo = {
				"name" : "",
				"pw" : ""
			};
			
			this.getView().setModel(new JSONModel(oInfo),"INFO");*/
			
			// attach handlers for validation errors
			sap.ui.getCore().attachValidationError(function (oEvent) {
				var control = oEvent.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("Error");
				}
			});
			sap.ui.getCore().attachValidationSuccess(function (oEvent) {
				var control = oEvent.getParameter("element");
				if (control && control.setValueState) {
					control.setValueState("None");
				}
			});
		},
		onNavMain : function(){
			this.getRouter().navTo("logonPage");
		},
		onLogon : function(oEvent){
			this.getView().getController().onCheck(oEvent);
		},
		onSuccess : function(oData){
			if(oData.results.length == 1){
				MessageToast.show("Welcome: " + oData.results[0].Name);
				this.getView().getController().onNavMain();
			}else{
				MessageToast.show("Username or Password error!");
			}
		},
		onCheck : function(oEvent){
			var view = this.getView();
			var inputs = [
				view.byId("nameInput"),
				view.byId("pwInput")
			];
			
			// check that inputs are not empty
			// this does not happen during data binding as this is only triggered by changes
			jQuery.each(inputs, function (i, input) {
				if (!input.getValue()) {
					input.setValueState("Error");
				}
			});
			
			// check states of inputs
			var canContinue = true;
			jQuery.each(inputs, function (i, input) {
				if ("Error" === input.getValueState()) {
					canContinue = false;
					return false;
				}
			});
			
			if(canContinue){
				var name = this.getView().byId("nameInput").getValue();
				var pw = this.getView().byId("pwInput").getValue();
				var that = this.onSuccess;
				var oModel = sap.ui.getCore().byId("clubCom").getComponentInstance().getModel("SAPCLUB");
				var aFilter = [];
				aFilter.push(new Filter("Name", FilterOperator.EQ, name));
				aFilter.push(new Filter("Password", FilterOperator.EQ, pw));
				var mParameters = {
						filters : aFilter,
						success : that.bind(this),
						error : function(oError){
							MessageToast.show(oError);
						}
				};
				
				oModel.read('/User', mParameters);
			}
		}
    
	});
});