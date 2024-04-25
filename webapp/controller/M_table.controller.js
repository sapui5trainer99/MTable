sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("mtable.mtable.controller.M_table", {
            onInit:function(){
			
				//table binding
				var json1=new sap.ui.model.json.JSONModel("model/TableData.json");
				this.byId("ProductsTable").setModel(json1);
				var template=this.byId("tabcol").clone();
			//	this.byId("ProductsTable").bindAggregation("items","/results",template); // bindaggregation for table
				this.byId("ProductsTable").bindItems("/results",template);
				this.SelectAll="";
				
				
			},
		
			onSelectionChange:function(oEvent){
				
			var table=this.byId("ProductsTable");
				var enable=oEvent.getParameter('selected')? true : false;
				oEvent.getParameter('listItem').getCells()[7].setEditable(enable);
				var enableAll=oEvent.getParameter('selectAll')? true : false;
				if(enableAll){
					this.SelectAll=true;
					for(var i=0;i<table.getItems().length;i++){
						table.getItems()[i].getCells()[7].setEditable(true);
					}
				}else{
					if(this.SelectAll){
						this.SelectAll=false;
					for(var i=0;i<table.getItems().length;i++){
						table.getItems()[i].getCells()[7].setEditable(false);
					}
					}
				}
				
			
			},
			onCangeOrder:function(oEvent){
				
				var unitInStock=oEvent.getSource().getParent().getCells()[6].getNumber();
				var orderval=oEvent.getParameter('value');
				if(parseFloat(orderval) > parseFloat(unitInStock)){
					sap.m.MessageToast.show(orderval+" Products not available in stock");
					oEvent.getSource().setValueState("Error");
				}else{
					oEvent.getSource().setValueState("None");
				}
			},
			FormatStock:function(value1,value2){
			
				if(value1<20){
					return "Error";
				}else if(value1>20 && value1 <40){
					return "Warning";
				}else if(value1>40){
					return "Success";
				}
			},
		
				onSearchTable:function(oEvent){
						var value=oEvent.getParameter('newValue');
						var fil= [new sap.ui.model.Filter("ProductName","Contains",value),
								  new sap.ui.model.Filter("ProductID","EQ",value),
								  new sap.ui.model.Filter("SupplierID","EQ",value),
								  new sap.ui.model.Filter("CategoryID","EQ",value),
								  new sap.ui.model.Filter("QuantityPerUnit","Contains",value),
								  new sap.ui.model.Filter("UnitPrice","Contains",value),
								  new sap.ui.model.Filter("UnitsInStock","EQ",value)];
						this.getView().byId("ProductsTable").getBinding('items').filter( new sap.ui.model.Filter(fil , false));
				},
				onTableUpdate:function(oEvent){
				
					var count=oEvent.getParameter("total");
					this.byId("tableTitle").setText("Products ("+count+")");
				}
	});
});
