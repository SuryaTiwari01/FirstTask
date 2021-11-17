import { LightningElement, api, wire } from "lwc";
// import { getRecord, getFieldValue } from "lightning/uiRecordApi";
// import ACCOUNT_NAME from "@salesforce/schema/Contact.Account.Name";
// import CONTACT_LANGUAGE from "@salesforce/schema/Contact.Language__c";
// import GRAND_PARENT_ACCOUNT from "@salesforce/schema/Contact.Account.Parent.Name";
// import CONTACT_NAME from "@salesforce/schema/Contact.Name";

export default class ShowParentFields extends LightningElement {
	@api recordId;

// 	@wire(getRecord, {
// 		recordId: "$recordId",
// 		fields: [CONTACT_NAME, ACCOUNT_NAME, GRAND_PARENT_ACCOUNT, LANGUAGE__c]
// 	})
// 	contactData;

// 	get contactName() {
// 		return getFieldValue(this.contactData.data, CONTACT_NAME);
// 	}

// 	get parentAccountName() {
// 		return getFieldValue(this.contactData.data, ACCOUNT_NAME);
// 	}

//     get contactLanguage() {
// 		return getFieldValue(this.contactData.data, CONTACT_LANGUAGE);
// 	}
    
//     get grandParentAccountName() {
// 		return getFieldValue(this.contactData.data, GRAND_PARENT_ACCOUNT);
// 	}
// }




// import { LightningElement, api} from 'lwc';
// import Contact from '@salesforce/schema/Contact';


// export default class Identity extends LightningElement {

//     @api recordId;
    
}

/*
import getContactData from '@salesforce/apex/contactListViewHelper.getContactData';
    @api recordId;
    data;
    error;
    firstName;

    connectedCallback(){
        console.log('check call back');
        getContactData({ 
            recordId : this.recordId
        })

        .then(result => {
            this.data = result[0];
            console.log("check ---- ", this.data);
            this.firstName= this.data.FirstName;
            console.log('firstname---', this.firstName);
        })
 
        .catch(error => {
            this.error = error;
        });
    }
*/