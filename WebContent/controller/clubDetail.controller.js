sap.ui.define([
	"com/sap/controller/BaseController"
], function(BaseController) {
	"use strict";
	return BaseController.extend("com.sap.controller.clubDetail", {

		onInit: function() {
			// 			jQuery.each(this.byId("idCustomers").getItems(), function(iIndex, oItem) {
			// 				oItem.getCells()[1].setVisible(false);
			// 			});
			var that = this;
			var oTable = this.byId("idCustomers");
			oTable.bindItems({
				path: "SAPCLUB>/Club",
				factory: function(sId, oContext) {

					var oButton = new sap.m.Button({
						text: "JOIN"

					});

					var oColumnListItem = new sap.m.ColumnListItem({
						type: "Active",
						cells: [
							new sap.m.Text({
								text: oContext.getObject().Club_Name
							}),
							oButton
						]
					});
					oColumnListItem.attachPress(that.onItemSelected,that);
					
					return oColumnListItem;
				}
			});

		},

		onOpenDialog: function() {
			this.getOwnerComponent().launch.open(this.getView());
			
		},

		onItemSelected: function(oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext("SAPCLUB");
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.getView().byId("clubdetail");
			oProductDetailPanel.bindElement({
				path: sPath,
				model: "SAPCLUB"
			});
		}

	});
});