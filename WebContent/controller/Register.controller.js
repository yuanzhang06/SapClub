sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";
	return Controller.extend("com.sap.controller.Register",{
	    
	    onOpenDialog : function () {
         this.getOwnerComponent().launch.open(this.getView());
      }
	});
});