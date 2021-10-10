import { LightningElement, api} from 'lwc';
import getDataList from '@salesforce/apex/AccountHelper.getDataList';
import { NavigationMixin } from 'lightning/navigation';

const ACTIONS = [{label:'Delete', name:'delete'}]


export default class dataTableForAccountContactLead extends NavigationMixin(LightningElement) {
    
    selectedObject;    
    error;
    dataList;
    
    columns = [
        {label: 'Name', fieldName: 'name', type: 'text',  sortable: true},
        {label: 'Id', fieldName: 'dataId', type: 'text', sortable: true},
        {label: 'Phone', fieldName: 'phone', type: 'text', sortable: true}
    ];
 

    selectionChangeHandler(event) {
        var selectedObject = event.target.value;

        this.selectedObject = selectedObject;
        this.selectedObjectName = selectedObject;

        getDataList({ 
            selectedObject : this.selectedObject
        })

        .then(result => {
            this.dataList = result;
        })
 
        .catch(error => {
            this.error = error;
        });
    }

    
    navigateToNewRecordPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.selectedObject,
                actionName: 'new'
            }
        })
    } 


}