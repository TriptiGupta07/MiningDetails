sap.ui.define([
    "./BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("com.mining.miningdetailsapp.controller.DetailView", {
        onInit() {
            let oRouter = this.getRouter()
            oRouter.attachRoutePatternMatched(this.onRouteMatched,this)   
        },
        onRouteMatched:function(oEvent){
            this.index = oEvent.getParameter("arguments").indexdetail 
            let sPath = "MiningDetail>/"+this.index
            let oView = this.getView()
            oView.bindElement(sPath)
        },

        onEdit:function(){
            let oRouter = this.getRouter()
            oRouter.navTo("RouteUpdateView", {
                indexupdate:this.index
            })
        }
    });
});        