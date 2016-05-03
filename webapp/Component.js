sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/demo/mr/controller/Launch",
	"sap/ui/model/json/JSONModel"
], function(UIComponent,Launch,JSONModel) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.mr.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

		 // create the views based on the url/hash
            this.getRouter().initialize();
            
        // set Launch
			this.launch = new Launch();
			
			var oRgisData = {
				
						name : "",
						email  : "",
						password : "",
						weixin : "",
						alipay : ""
						
					
				};
				var oRgisModel = new JSONModel(oRgisData);
				this.setModel(oRgisModel,"Regis_Info");
				
		  var oLogonData = {
		      
		      name : "",
		      password : ""
		  };
		  
		  var oLogonModel = new JSONModel(oLogonData);
		  this.setModel(oLogonModel,"Logon_Info");
				
	
		}
	});

});