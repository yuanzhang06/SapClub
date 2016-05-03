sap.ui.define([
		"sap/ui/demo/mr/controller/BaseController",
		"sap/m/MessageToast"
], function(BaseController,MessageToast) {
	"use strict";

	return BaseController.extend("sap.ui.demo.mr.controller.RegisterView", {
	    
	    
	    
	    onNavClub : function(){
	        
	        
			this.getRouter().navTo("ClubList");
		},
           
           onConfirm : function (oEvent){
           	
        
           	var oModel = this.getView().getModel("Regis_Info");
           	var odaModel = this.getView().getModel("Club");
           	var oData = oModel.getData();
           	
          
           	odaModel.create("/User",{
           	    
           	"Name" : oData.name,
            "E-Mail" : oData.email,
            "Weixin" : oData.weixin,
            "Alipay" : oData.alipay,
           	"Password" : oData.password
           	
           	},null);
		},
		
		
		
		   onCheck : function(oEvent)
		   {
		       var view = this.getView();
		       
		       var inputs = [view.byId("nameinput"),
		                     view.byId("emailinput"),
		                     view.byId("weixininput"),
		                     view.byId("alipayinput"),
		                     view.byId("pswinput")
		       ];
		       
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
			
			 	var oModel = this.getView().getModel("Regis_Info");
             	var odaModel = this.getView().getModel("Club");
              	var oRgisData = oModel.getData();
				

				var mParameters = {
						
						success : function(oData, oResponse){
						
								MessageToast.show("Welcome: " + oRgisData.name);
								view.getModel("Logon_Info").getData().name = oData.Name;
								view.getController().onNavClub();
						
						},
						error : function(oError){
							MessageToast.show(oError);
						}
				};
				
			odaModel.create("/User",{
           	    
           	"Name" : oRgisData.name,
            "E-Mail" : oRgisData.email,
            "Weixin" : oRgisData.weixin,
            "Alipay" : oRgisData.alipay,
           	"Password" : oRgisData.password
           	
           	},mParameters);
           	
			}
			
			
			
			
			
			
		   }

	});

});