sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController, MessageBox) => {
    "use strict";

    return BaseController.extend("com.mining.miningdetailsapp.controller.CreateView", {
        onInit() {
        },
        onSubmit:function(){
            //PayLoad
            let oLOCID = this.getView().byId("idLocation")
            let oLOCDESC = this.getView().byId("idLocDesc")
            let oMININGRES = this.getView().byId("idMinResource")
            let oMINERALREPORT = this.getView().byId("idMinReport")
            let oDRILLCOUNT = this.getView().byId("idDCount")
            let oTOTALCOST = this.getView().byId("idTotCost")
            let oCURRENCY = this.getView().byId("idcurrency")
            let oMINERALTYPE = this.getView().byId("idMinType")
            let oDRILLDATE = this.getView().byId("idDrillD")

            //Get Values
            let sLocID = oLOCID.getValue()
            let sLocDesc = oLOCDESC.getValue()
            let sMinRes = oMININGRES.getValue()
            let sMinReport = oMINERALREPORT.getValue()
            let sDrillC = oDRILLCOUNT.getValue()
            let sTotalC = oTOTALCOST.getValue()
            let sCurrency = oCURRENCY.getValue()
            let sMinType = oMINERALTYPE.getValue()
            let sDrillD = oDRILLDATE.getValue()

            // let fDate="\/Date("+vDate+")\/"
            let payload = {
                LocationId:sLocID,
                LocationDesc:sLocDesc,
                MiningResource:sMinRes,
                MineralReport:sMinReport,
                DrillCount:sDrillC,
                TotalCost:sTotalC,
                Currency:sCurrency,
                MineralType:sMinType,
                DrillDate:sDrillD
            }

            //Get the Model 
            let oModel = this.getOwnerComponent().getModel()

            //Get entity 
            let entity = "/miningSet"

            //Method
            let that = this 
            oModel.create(entity,payload,{
                success:function(){
                    MessageBox.success("Record created successfully", {
                        onClose:function(){
                            var oRouter=that.getRouter()
            
            oRouter.navTo("RouteMiningDetails")
                        }
                    })
                },
                error:function(){
                    MessageBox:error("Record Failed")
                }
            })
        }

    });
});    