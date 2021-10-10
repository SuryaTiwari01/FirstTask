import { LightningElement ,api, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
import getContactList from '@salesforce/apex/AccountHelper.getContactList';
import getLeadList from '@salesforce/apex/AccountHelper.getLeadList';

import getContacts from '@salesforce/apex/contactListViewHelper.getContacts';
import searchContact from '@salesforce/apex/contactListViewHelper.searchContact';
import deleteContacts from '@salesforce/apex/contactListViewHelper.deleteContacts';

const ACTIONS = [{label:'Delete', name:'delete'}]

const COLS = [{label: 'Name', fieldName: 'link', type: 'url', typeAttributes:{label: {fieldName:'FullName'}}},
             {label:'Email', fieldName:'Email'},
             {label:'Account', fieldName: 'accountLink', type:'url', typeAttributes:{label:{fieldName:'AccountName'}}},
             {label:'Mailing Address', fieldName:'MailingAddress'},
             {fieldName:'actions', type:'action', typeAttributes:{rowActions: ACTIONS}}
]

export default class dataTableForAccountContactLead extends LightningElement {

    cols = COLS;
    contacts;
    wiredContacts;
    selectedContacts;
    
    accountSelected;
    contactSelected;
    leadSelected;
    error;
    dataList;

    columns1 = [
        {label: 'Account name', fieldName: 'Name', type: 'text', sortable: true},
        {label: 'Type', fieldName: 'Type', type: 'text', sortable: true},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'Currency', sortable: true},
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true},
    ];
    
    columns2 = [
        {label: 'Contact Name', fieldName: 'link', type: 'url', typeAttributes:{label: {fieldName:'FullName'}}, sortable: true},
        {label: 'Title', fieldName: 'Title', type: 'text', sortable: true},
        {label: 'Email', fieldName: 'Email', type: 'Email', sortable: true},
        {label:'Account', fieldName: 'accountLink', type:'url', typeAttributes:{label:{fieldName:'AccountName'}}},
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true},
        {label:'Mailing Address', fieldName:'MailingAddress'},
        {fieldName:'actions', type:'action', typeAttributes:{rowActions: ACTIONS}}
    ];
    
    columns3 = [
        {label: 'Lead name', fieldName: 'Name', type: 'text', sortable: true},
        {label: 'Company', fieldName: 'Company', type: 'Text', sortable: true},
        {label: 'Lead Status', fieldName: 'Status', type: 'Picklist', sortable: true},
        {label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true},
    ];    
    

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

    contactSelection(result){
        getContactList()
        .then(result =>{
            if(result.data){
            this.dataList = result.data.map((row) =>{
                return this.mapContacts(row);
            })
            this.baseData =this.dataList;
        }})
        if(result.error){
            console.error(result.error);
        }
    }

    /*
    accountSelection(selectedObject){
        this.accountSelected=true;
        this.contactSelected=false;
        this.leadSelected=false;
        console.log('Account--- selectedObject --- ', selectedObject );
        getAccountList()
        .then(result =>{
            this.dataList = result;
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
        {
            this.wiredContacts= result;
            if(result.data){
                this.dataList = result.data.map((row) =>{
                    return this.mapContacts(row);
                })
                this.baseData =this.dataList;
            }
            if(result.error){
                console.error(result.error);
            }
        }
    
    }

    

    leadSelection(selectedObject){
        this.leadSelected=true;
        console.log('Lead--- selectedObject --- ', selectedObject );
        this.accountSelected=false;
        this.contactSelected=false;

        console.log('Lead--- selectedObject --- ', selectedObject );
        getLeadList()
        .then(result =>{ this.dataList = result;
        })
        .catch(error =>{
            this.error = error;
        })
    }
*/

}