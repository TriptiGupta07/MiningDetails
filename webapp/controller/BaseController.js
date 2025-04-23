sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (Controller) => {
    "use strict";
  
    return Controller.extend("com.mining.miningdetailsapp.controller.BaseController", {
        onInit() {
        },
        getRouter:function(){
            return this.getOwnerComponent().getRouter()  
        },

        getModel:function(){
            return this.getOwnerComponent().getModel()
        }
    });
  });