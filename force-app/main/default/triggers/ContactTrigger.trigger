trigger ContactTrigger on Contact (after insert, after update, after delete) {
    Set<String> accIds = new Set<String>();
    if(trigger.isInsert || trigger.isUpdate){
        for(Contact c : trigger.new){
            if(trigger.isafter && c.accountId != null){
                accIds.add(c.AccountId);
            }
        }
    }else{
        for(Contact c : trigger.old){
            if(trigger.isafter && c.accountId != null){
                accIds.add(c.AccountId);
            }
        }
    }
    
    
    if(accIds.size() > 0){
        List<Account> accList = new List<Account>();
        for(Account a : [Select id, Number_of_Contacts__c, (Select Id from Contacts) from Account where Id IN: accIds]){
            Account acc = new Account();
            acc.Id = a.Id;
            acc.Number_of_Contacts__c = a.contacts.size();
            system.debug('acc.Number_of_Contacts__c '+acc.Number_of_Contacts__c );
            accList.add(acc);
        }
        update accList;
    }
}