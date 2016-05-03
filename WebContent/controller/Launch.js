sap.ui.define([
	"sap/ui/base/Object"
],function(Object){
	"use strict";
	return Object.extend("com.sap.controller.Launch", {
		_getDialog : function () {
			// create dialog lazily
			if (!this._oDialog) {
				// create dialog via fragment factory
				this._oDialog = sap.ui.xmlfragment("com.sap.view.Launch", this);
			}
			return this._oDialog;
		},
		open : function (oView) {
			var oDialog = this._getDialog();
			// connect dialog to view (models, lifecycle)
			oView.addDependent(oDialog);
			this.oView = oView;
			// open dialog
			oDialog.open();
		},
		datetime_to_stamp : function (datetime){
			var stringTime = datetime;
			var timestamp = Date.parse(new Date(stringTime));
			timestamp = timestamp / 1000;
			//2014-07-10 10:21:12的时间戳为：1404958872 
			return timestamp
		},
		onCloseDialog : function () {
		var oModel = sap.ui.getCore().byId("clubCom").getComponentInstance().getModel("SAPCLUB");
		var oView = this.oView;
		var oData = oView.getModel("launch").getData();
		var startTime = oData.Start_Time;		
		startTime = new Date(Date.parse(startTime.replace(/\//g, "/")));
		startTime = startTime.getTime();
		startTime = "/Date("+startTime+")/";
		var endTime = oData.End_Time;		
		endTime = new Date(Date.parse(endTime.replace(/\//g, "/")));
		endTime = endTime.getTime();
		endTime = "/Date("+endTime+")/";
		oModel.create("/Activity",{
			"Activity_Id" : oData.Activity_Id,
            "Club_Name" : oData.Club_Name,
            "Start_Time" : startTime,
            "End_Time" : endTime,
           	"Location" : oData.Location,
           	"TotalAmount" :oData.TotalAmount
	 	},null); 
		this._getDialog().close();
		}
	});
});