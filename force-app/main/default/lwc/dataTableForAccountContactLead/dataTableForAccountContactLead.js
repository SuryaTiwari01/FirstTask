import { LightningElement ,api, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
import getContactList from '@salesforce/apex/AccountHelper.getContactList';
import getLeadList from '@salesforce/apex/AccountHelper.getLeadList';
export default class dataTableForAccountContactLead extends LightningElement {
    
    @track columns = [
        {label: 'Account name', fieldName: 'Name', type: 'text', sortable: true},
        {label: 'Type', fieldName: 'Type', type: 'text', sortable: true},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'Currency', sortable: true},
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true},
    ];
    
    @track columns1 = [
        {label: 'Contact Name', fieldName: 'Name', type: 'text', sortable: true},
        {label: 'Title', fieldName: 'Title', type: 'text(128)', sortable: true},
        {label: 'Email', fieldName: 'Email', type: 'Email', sortable: true},
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true}
    ];
    
    @track columns2 = [
        {label: 'Lead name', fieldName: 'Name', type: 'text', sortable: true},
        {label: 'Company', fieldName: 'Company', type: 'Text(255)', sortable: true},
        {label: 'Lead Status', fieldName: 'Status', type: 'Picklist', sortable: true},
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true},
    ];

    //@track selectedObjectName;
    
    @track accountSelected;
    @track contactSelected;
    @track leadSelected;
    @track error;
    //@track fieldLabelName="Select Object";
    @track accList;
    @track conList;
    @track ldList;
            /*@wire(getAccountList)
            wiredAccounts({
                error,
                data
            }) {
                if (data) {
                    this.accList = data;
                } else if (error) {
                    this.error = error;
                }
            }*/
    selectionChangeHandler(event) {
        console.log('Check function Call');
		var selectedObject = event.target.value;

        this.selectedObjectName=selectedObject;
        if(selectedObject== 'Account'){
            this.accountSelection(selectedObject);
            
        
        }else if(selectedObject == 'Contact'){
            this.contactSelection(selectedObject);
        
        }else if(selectedObject == 'Lead'){
            this.leadSelection(selectedObject);
        } else {
            this.accountSelected=false;
            this.contactSelected=false;
            this.leadSelected=false;
        }
	}
    leadSelection(selectedObject){
        this.leadSelected=true;
        console.log('Lead--- selectedObject --- ', selectedObject );
        this.accountSelected=false;
        this.contactSelected=false;

        console.log('Lead--- selectedObject --- ', selectedObject );
        getLeadList()
        .then(result =>{ this.ldList = result;
        })
        .catch(error =>{
            this.error = error;
        })
    }
    accountSelection(selectedObject){
        this.accountSelected=true;
        this.contactSelected=false;
        this.leadSelected=false;
        console.log('Account--- selectedObject --- ', selectedObject );
        getAccountList()
        .then(result =>{
            this.accList = result;
        })
        .catch(error =>{
            this.error = error;
        })
        
    }
    contactSelection(selectedObject){
        this.accountSelected=false;
        this.contactSelected=true;
        this.leadSelected=false;

        console.log('Contact--- selectedObject --- ', selectedObject );
        getContactList()
        .then(result =>{ this.conList = result;
        })
        .catch(error =>{
            this.error = error;
        })
    }

}