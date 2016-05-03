sap.ui.define([
	"sap/ui/demo/mr/controller/BaseController",
		"sap/ui/model/Filter",
		 "sap/ui/model/FilterOperator",
		 "sap/m/MessageToast"
], function(BaseController,Filter,FilterOperator, MessageToast) {
	"use strict";
	return BaseController.extend("sap.ui.demo.mr.controller.ClubOverview", {

// 		onInit: function() {
// 						jQuery.each(this.byId("idCustomers").getItems(), function(iIndex, oItem) {
// 							oItem.getCells()[1].setVisible(false);
// 						});
// 			var that = this;
// 			var oTable = this.byId("idCustomers");
// 			oTable.bindItems({
// 				path: "Club>/Club",
// 				factory: function(sId, oContext) {

// 					var oButton = new sap.m.Button({
// 						text: "JOIN"

// 					});

// 					var oColumnListItem = new sap.m.ColumnListItem({
// 						type: "Active",
// 						cells: [
// 							new sap.m.Text({
// 								text: oContext.getObject().Club_Name
// 							}),
// 							oButton
// 						]
// 					});
// 					oColumnListItem.attachPress(that.onItemSelected,that);
					
// 					return oColumnListItem;
// 				}
// 			});

// 		},

		onOpenDialog: function() {
			this.getOwnerComponent().launch.open(this.getView());
		},
		
		onJoinClub: function() {
		    
		    var ClubName = this.byId("clubname").getValue();
		    var UserName = this.getView().getModel("Logon_Info").getData().name;
		    var odaModel = this.getView().getModel("Club");
		    var that = this;
		    	
		    var mParameters = {
						
						success : function(oData,oResponse){
						
							MessageToast.show("Join the Club Successful");
							 that.byId("join").setVisible(false);
							  that.byId("textin").setVisible(true);
							   that.byId("textnotin").setVisible(false);
							   that.byId("activitylist").setType("Active");
							
						
						},
						error : function(oError){
							MessageToast.show(oError);
						}
				};
				
		
		odaModel.create("/CLUB_MMB",{
           	    
           	"User_Name" : UserName,
            "Club_Name" : ClubName,
            "Is_Owner" : 0
         
           	
           	},mParameters);
           	
			},
		
		

		onItemSelected: function(oEvent) {
		    var that = this;
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("Club");
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.getView().byId("clubdetail");
			oProductDetailPanel.bindElement({
				path: sPath,
				model: "Club"
			});
			
			//Judge if the User in the Club 
			var name = this.getView().getModel("Logon_Info").getData().name;
			var oModel = this.getView().getModel("Club");
			var aFilter = [];
				aFilter.push(new Filter("User_Name", FilterOperator.EQ, name));
				
				var mParameters = {
						filters : aFilter,
						success : function(oData){
							if(oData.results.length === 1){
							
							//	view.getController().onNavMain();
							   that.byId("join").setVisible(false);
							   that.byId("textin").setVisible(true);
							   that.byId("textnotin").setVisible(false);
							   that.byId("idCustomerUser").setVisible(true);
							    that.byId("launch").setVisible(true);
							}else{
							//	MessageToast.show("Username or Password error!");
							that.byId("join").setVisible(true);
							  that.byId("textin").setVisible(false);
							   that.byId("textnotin").setVisible(true);
							 that.byId("idCustomerUser").setVisible(false);
							  that.byId("launch").setVisible(false);
							}
						},
						error : function(oError){
							MessageToast.show(oError);
						}
				};
				var path = sPath + "/ClubMembers";
					oModel.read(path, mParameters);
			
			
		},
		
		onActySelected: function(oEvent) {
		   var that = this;
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("Club");
			var sPath = oContext.getPath();
			
			
			//Judge if the User in the Activity
			var name = this.getView().getModel("Logon_Info").getData().name;
			var oModel = this.getView().getModel("Club");
			var aFilter = [];
				aFilter.push(new Filter("User_Name", FilterOperator.EQ, name));
				
				var mParameters = {
						filters : aFilter,
						success : function(oData){
							if(oData.results.length === 1){
							
							//	view.getController().onNavMain();
							  oSelectedItem.getCells()[1].setVisible(false);
							}else{
							//	MessageToast.show("Username or Password error!");
							  oSelectedItem.getCells()[1].setVisible(true);
							}
						},
						error : function(oError){
							MessageToast.show(oError);
						}
				};
				var path = sPath + "/ActivityParticipants";
					oModel.read(path, mParameters);
			
		
		}


	});
});