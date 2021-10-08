public class DemoObjects 
{
    Public void DemoMethod()
    { List<Account> accList= new List<Account>();
     Set<Id> accIds = new Set<Id>();
     accList =[SELECT ID, Name From Account Limit 3];
     Map<Id,Account> IdToAccountMap =new Map<id,Account>(accList);
     
     System.debug('List a/c=' +accList);
     
     If(!accList.isEmpty())
     {   For(Account acc: accList)
         { accIds.add(acc.id);
          }
     } system.debug('accids= '+accIds);
     
     if(!accIds.isempty())
     {
         for(id i:accids)
             if(idToAccountMap.containsKey(i))
         {System.debug('Map Value=> ' +i);}
     }
     
     /*Objects
Sobject obj;
obj = new Account(Name= 'Test', Phone='123456');
//acc.Name='Test';
//acc.Phone='123456';
system.debug('Name and Phone = ' +obj);

obj= new Student__c(Name='Test1', Phone__c='1234567');
//std.Name='Test1';
//std.Phone__c= '123456';

System.debug('customer object= '+obj);
*/
    }
    
}