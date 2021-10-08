import { LightningElement ,api, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
export default class dataTableForAccountContactLead extends LightningElement {
    @track columns = [{
            label: 'Account name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Type',
            fieldName: 'Type',
            type: 'text',
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'Currency',
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        /*{
            label: 'Website',
            fieldName: 'Website',
            type: 'url',
            sortable: true
        },*/
        {
            label: 'Rating',
            fieldName: 'Rating',
            type: 'test',
            sortable: true
        }
    ];
    //@track selectedObjectName;
    
    @track accountSelected;
    @track contactSelected;
    @track leadSelected;
    @track error;
    //@track fieldLabelName="Select Object";
    @track accList;
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
        }
        
	}
    accountSelection(selectedObject){
        this.accountSelected=true;
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
        console.log('Contact--- selectedObject --- ', selectedObject );
    }
    leadSelection(selectedObject){
        console.log('Lead--- selectedObject --- ', selectedObject );
    }

}