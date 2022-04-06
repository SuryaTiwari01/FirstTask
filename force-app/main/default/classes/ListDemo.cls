public class ListDemo 
{ 
    Public void ListMethod()
    {
        List<Account> accList = new List<Account>();
        
        accList = [SELECT ID, Name From Account Limit 3];
        
        System.debug('Accounts Name = ' +accList);        
        
    }
    
}