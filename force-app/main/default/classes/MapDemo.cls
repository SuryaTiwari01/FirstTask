public class MapDemo 
{
    Public Void MapMethod()
    {
       Map<Id,Account> IdAccMap = new Map<Id,Account>([SELECT Id, name From Account Limit 2]);
        
        System.debug('IdAccMap = ' +IdAccMap);
    }
    
    
}