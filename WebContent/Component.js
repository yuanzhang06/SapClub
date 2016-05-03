sap.ui.define([
	"sap/ui/core/UIComponent",
	"com/sap/controller/Launch",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
], function(UIComponent, Launch,ODataModel,JSONModel) {
	"use strict";

	return UIComponent.extend("com.sap.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
		
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
		    //this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
			
			//set dialog
			this.launch = new Launch();
			
			 // set OData model
		    var serviceUrl = getServiceUrl("/com/sap/csc/club/csc_club.xsodata");
			function getServiceUrl(sServiceUrl) {
				// for local testing prefix with proxy
				// if you and your team use a special host name or IP like 127.0.0.1 for localhost please adapt the if statement below
				if (window.location.hostname == "localhost") {
					return "proxy" + sServiceUrl;
				} else {
					return sServiceUrl;
				}
			}
			var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true, null,null,{"Authorization": "Basic STMxNzA1OTpXZWxjb21lMQ=="});
			if (oModel){
				oModel.setUseBatch(false);
				this.setModel(oModel,"SAPCLUB");
			}
			
			var oInfo = {
					"name" : "",
					"pw" : ""
				};
				
				this.setModel(new JSONModel(oInfo),"INFO");
				
				
				var oactivity = {
						"Activity_Id" : "",
						"Club_Name" : "",
						"Start_Time" : "",
						"End_Time" : "",
						"Location" : "",
						"TotalAmount" : ""
					};
					
				this.setModel(new JSONModel(oactivity),"launch");
				
			
		}
	});

});