sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController, MessageBox) => {
    "use strict";

    return BaseController.extend("com.mining.miningdetailsapp.controller.UpdateView", {
        onInit() {
            let oRouter = this.getRouter()
            oRouter.attachRoutePatternMatched(this._onMatched,this)
        },

        _onMatched:function(oEvent){
            let index = oEvent.getParameter("arguments").indexupdate
            let sPath = "MiningDetail>/"+index 
            let oView = this.getView()
            oView.bindElement(sPath)
        },

        onUpdate:function(){
            //Payload 
            let oLOCID = this.getView().byId("idLocid")
            let oLOCDESC = this.getView().byId("idLocdes")
            let oMININGRES = this.getView().byId("idMiRes")
            let oMINERALREPORT = this.getView().byId("idMiRep")
            let oDRILLCOUNT = this.getView().byId("idDC")
            let oTOTALCOST = this.getView().byId("idTotalC")
            let oCURRENCY = this.getView().byId("idCur")
            let oMINERALTYPE = this.getView().byId("idType")
            let oDRILLDATE = this.getView().byId("idDrillDat")
            

            let sLocID = oLOCID.getValue()
            let sLocDesc = oLOCDESC.getValue()
            let sMinRes = oMININGRES.getValue()
            let sMinReport = oMINERALREPORT.getValue()
            let sDrillC = oDRILLCOUNT.getValue()
            let sTotalC = oTOTALCOST.getValue()
            let sCurrency = oCURRENCY.getValue()
            var sMinType = oMINERALTYPE.getValue()
            var sDrillD = oDRILLDATE.getValue()
            let key2=sDrillD.replace(/-/g,"")
            let key3=sMinType.replace(/ /g,"%20")
        
            // let vDate = new Date()
            // if(sDrillD && sDrillD.includes("-")){
            //     sDrillD = sDrillD.replace(/-/g, "");
            // let vDate= new Date(sDrillD).getTime()
            //  // "Dateofjoin" : "\/Date(1744588800000)\/
            // let sDrillD= "\/Date("+ vDate + ")\/"

            let payload = {
                LocationDesc:sLocDesc,
                MiningResource:sMinRes,
                MineralReport:sMinReport,
                DrillCount:sDrillC,
                TotalCost:sTotalC,
                Currency:sCurrency
            }
            
            let oModel = this.getOwnerComponent().getModel()

            //Get entity 
            let entity = `/miningSet(LocationId='${sLocID}',MineralType='${key3}',DrillDate='${key2}')`;
            //let entity=`/BOOKING_DATASet(Carrid='${sCarId}',Connid='${sConId}',Fldate='${sFliDate}',Bookid='${sBooId}')`;

            //Method
            
            oModel.update(entity,payload,{
            success:(resp)=>{
                MessageBox.success("Record updated successfully", {
                    onClose:()=>{
                        var oRouter=this.getRouter()
            
                    oRouter.navTo("RouteMiningDetails")
                   
                    }
                })
                
            },
            error:function(){
                MessageBox.error("Updation of Record Failed")
            }
            })
        }
    });            
});    