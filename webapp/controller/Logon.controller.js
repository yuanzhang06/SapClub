sap.ui.define([
	"sap/ui/demo/mr/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator"
], function(BaseController, MessageToast, Filter, JSONModel, FilterOperator){
	"use strict";
	return BaseController.extend("sap.ui.demo.mr.controller.Logon", {
	
		
		
		onNavMain : function(){
			this.getRouter().navTo("ClubList");
		},
			onRegister : function(){
			this.getRouter().navTo("Register");
		},
		
		onLogon : function(oEvent){
			this.getView().getController().onCheck(oEvent);
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
				else {
				    input.setValueState("Success");
				}
			});
			
			// check states of inputs
			var canContinue = true;
			jQuery.each(inputs, function (i, input) {
				if (input.getValueState() === "Error") {
					canContinue = false;
					return false;
				}
			});
			
			if(canContinue){
				var name = this.getView().byId("nameInput").getValue();
				var pw = this.getView().byId("pwInput").getValue();
			
				var oModel = this.getView().getModel("Club");
				var aFilter = [];
				aFilter.push(new Filter("Name", FilterOperator.EQ, name));
				aFilter.push(new Filter("Password", FilterOperator.EQ, pw));
				var mParameters = {
						filters : aFilter,
						success : function(oData){
							if(oData.results.length === 1){
								MessageToast.show("Welcome: " + oData.results[0].Name);
								view.getController().onNavMain();
							}else{
								MessageToast.show("Username or Password error!");
							}
						},
						error : function(oError){
							MessageToast.show(oError);
						}
				};
				
				oModel.read("/User", mParameters);
			}
		}
    
	});
});