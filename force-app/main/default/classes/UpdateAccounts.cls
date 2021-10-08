Public class UpdateAccounts {
    Public Static Void UpdateAccount(){
        List<Account> accToBeUpdated = new List<Account>();
        Set<Id> accIdSet = new Set<Id>();
        
        For(Contact con : [SELECT Id, Account.Id FROM Contact
                          WHERE Name Like '%Test%'
                           AND Account.Id!= null]){
                               If(!accIdSet.contains(con.Account.Id)){
                                   Account acc = new Account();
                                   acc.Id = con.Account.Id;
                                   acc.Active__c = 'Yes';
                                   acc.Rating = 'Hot';
                                   accToBeUpdated.add(acc);
                                   accIdSet.add(con.Account.Id);                                   
                               }
                           }
        If(!accToBeUpdated.isEmpty()){
            Update accToBeUpdated;
        }
    }

}