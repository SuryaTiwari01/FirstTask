@istest
Public class UpdateAccountsTest {
    @isTest
    Private Static void TestUpdateAccount(){
        Account acc = new Account();
        acc.Name = 'Test Account';
        acc.Active__c = 'No';
        acc.Rating = 'Cold';
        Insert acc;
        
        Contact con = new Contact();
        Con.FirstName = 'Test';
        con.LastName = 'Test';
        con.AccountId = acc.Id;
        insert con;
        
        UpdateAccounts.UpdateAccount();
        
        Account UpdatedAcc = [SELECT Id, Active__c, Rating From Account Where Id=: acc.Id];
        System.assertEquals('Hot', UpdatedAcc.Rating);
    }

}