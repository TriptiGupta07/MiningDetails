sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "../Validator/validator",
    "sap/ui/model/json/JSONModel"
], (BaseController, MessageBox,validator,JSONModel) => {
    "use strict";

    return BaseController.extend("com.mining.miningdetailsapp.controller.CreateView", {
        onInit() {
            let oView = this.getView();
            let fieldIDs = ["idLocation", "idLocDesc", "idMinResource", "idMinReport", 
                "idDCount", "idTotCost", "idcurrency", "idMinType", "idDrillD"];

                fieldIDs.forEach(fieldID => {
                    oView.byId(fieldID).attachChange(this.onSetNone, this);
                });
        },

        onToMining: function(){
            this._clearFields();
            var oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningDetails")
        },
        setNone:function(){
            var oRouter = this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteMiningDetails")
        },
        _clearFields:function(){
            let oView = this.getView();
            ["idLocation", "idLocDesc", "idMinResource", "idMinReport", 
                "idDCount", "idTotCost", "idcurrency", "idMinType", "idDrillD"].forEach(fieldID => {
            oView.byId(fieldID).setValue("");
            oView.byId(fieldID).setValueState("None");
                });
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

            let fields = [
                {id:"idLocation", value:sLocID},
                {id:"idLocDesc", value:sLocDesc},
                {id:"idMinResource", value:sMinRes},
                {id:"idMinReport", value:sMinReport},
                {id:"idDCount", value:sDrillC},
                {id:"idTotCost", value:sTotalC},
                {id:"idcurrency", value:sCurrency},
                {id:"idMinType", value:sMinType},
                {id:"idDrillD", value:sDrillD}
            ]

            let validationResult = validator.validateCreate(fields);
            if(validationResult !== true){
                validationResult.forEach(fieldID => {
                    this.getView().byId(fieldID).setValueState("Error");
                });
                return;
            }

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
                            this._clearFields();
                            var oRouter=that.getRouter()
            
            oRouter.navTo("RouteMiningDetails",{},true)
            // oLOCID.setValue("")
            // oLOCDESC.setValue("")
            // oMININGRES.setValue("")
            // oMINERALREPORT.setValue("")
            // oDRILLCOUNT.setValue("")
            // oTOTALCOST.setValue("")
            // oCURRENCY.setValue("")
            // oMINERALTYPE.setValue("")
            // oDRILLDATE.setValue("")
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