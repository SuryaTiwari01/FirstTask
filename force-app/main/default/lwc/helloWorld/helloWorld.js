import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track ChangingValue = 'World';
    
    nameChangeHandler(event){
        this.ChangingValue = event.target.value;
    }
}