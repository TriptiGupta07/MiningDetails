sap.ui.define([
    "./BaseController",
    // "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (BaseController, MessageBox, Filter, FilterOperator, Sorter) => {
    "use strict";

    return BaseController.extend("com.mining.miningdetailsapp.controller.MiningDetails", {
        onInit() {
            this._getData();
        },
        
        onCreate:function(){
            var oRouter = this.getRouter();
                oRouter.navTo("RouteCreateview");
        },

        onDelete:function(oEvent){
            let oContext = oEvent.getSource().getBindingContext("MiningDetail").getObject()
            MessageBox.confirm("are you sure you want to delete",{
                onClose:(choice)=>{
                    if(choice==="OK"){
                        this._onDeleteCall(oContext)
                    }
                }
            })
        },

        _onDeleteCall:function(params){
            let key1 = params.LocationId;
            let key2 = params.MineralType;
            let key3 = params.DrillDate;
            let key3_new=key3.replace(/-/g,"")
            let key2_new=key2.replace(/ /g,"%20")

            let oModel = this.getModel();
            let entity = `/miningSet(LocationId='${key1}',MineralType='${key2_new}',DrillDate='${key3_new}')`;
            oModel.remove(entity, {
                success: (resp) => {
                    MessageBox.success("Record Deleted Successfully", {
                        onClose:function(){
                            this.onInit()
                        }.bind(this)
                    });
                },
                error:(err) => {
                    MessageBox.error("Deletion Failed");
                }
            });
        },

        _getData:function(){
            let oModel = this.getOwnerComponent().getModel()
            let entity = "/miningSet"
            oModel.read(entity,{
                success:(odata,resp)=>{
                    let JModel = this.getOwnerComponent().getModel("MiningDetail")
                    JModel.setData(odata.results)
                },
                error:(error)=>{
                    console.log(error)
                }
            })
        },

        onSearch:function(oEvent){
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
            var aFilters = [];

            if(sQuery){
                aFilters.push(new Filter({
                    filters:[
                        new Filter("LocationId", FilterOperator.Contains,sQuery),
                        new Filter("MineralType", FilterOperator.Contains,sQuery),
                        new Filter("LocationDesc", FilterOperator.Contains,sQuery)
                    ],
                    and:false
                }));
            }
            this.getView().byId("miningDetailsTable").getBinding("items").filter(aFilters);
        },

        onRowSelection:function(oEvent){
            let oItem = oEvent.getParameter("listItem")
            let oContext=oItem.getBindingContextPath("MiningDetail")
            let aItems=oContext.split("/")
            let index=aItems[aItems.length-1]
            let oRouter=this.getRouter()
            oRouter.navTo("Routedetailview",{
                indexdetail:index
            })    
        }

        // onSort:function() {
        //     if (!this._sortDialog) {
        //         this._sortDialog = sap.ui.xmlfragment("com.mining.miningDetailsApp.view.SortDialog",this);
        //         this.getView().addDependent(this._sortDialog);
        // }
        // this._sortDialog.open();
        // },

    // onSortDialogConfirm: function (oEvent) {
    //     var mParams = oEvent.getParameters();
    //     var sPath = mParams.sortItem.getKey();
    //     var bDescending = mParams.sortDescending;
        
    //     var aSorters = [];
    //     aSorters.push(new Sorter(sPath, bDescending));

    //     this.byId("miningDetailsTable").getBinding("items").sort(aSorters);
    // },
    // onFilter: function () {
        // Implementation for filtering
        // if (!this._filterDialog) {
        // this._filterDialog = sap.ui.xmlfragment(
        // "com.mining.miningDetailsApp.view.FilterDialog",
        // this
        // );
        // this.getView().addDependent(this._filterDialog);
        // }
        // this._filterDialog.open();
    // },
    // onFilterDialogConfirm: function (oEvent) {
    //     var mParams = oEvent.getParameters();
    //     var aFilters = [];

    //     mParams.filterItems.forEach(function(oItem) {
    //         var sPath = oItem.getKey();
    //         var sOperator = FilterOperator.EQ;
    //         var sValue1 = oItem.getText();
    //         var oFilter = new Filter(sPath, sOperator, sValue1);
    //         aFilters.push(oFilter);
    //         });
        
    //         this.byId("miningDetailsTable").getBinding("items").filter(aFilters);
    //     },
       
        // onItemPress: function (oEvent) {
        // var oItem = oEvent.getSource();
        // var oContext = oItem.getBindingContext();

        // this.getRouter().navTo("detail", {
        //     LOCATION_ID: oContext.getProperty("LOCATION_ID"),
        //     DRILL_DATE: new Date(oContext.getProperty("DRILL_DATE")).toISOString().slice(0, 10)
        //     });
        //     },
        
            // onCreatePress: function () {
            //     this.getRouter().navTo("create");
            //     }
    });
});