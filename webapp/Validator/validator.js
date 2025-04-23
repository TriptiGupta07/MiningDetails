sap.ui.define([
    "sap/m/MessageBox"
], (MessageBox) => {
    "use strict"; 
    return {
        validateCreate:function(fields){
            let invalidFields = [];
            fields.forEach((field)=>{
                if(!field.value){
                    invalidFields.push(field.id)
                }
            })
            if(invalidFields.length > 0) {
                MessageBox.error("Please fill all the fields.");
                return invalidFields;
            }
            return true;
            }
        }
    });  