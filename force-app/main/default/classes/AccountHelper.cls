public with sharing class AccountHelper {

    @AuraEnabled(cacheable=true)
    public static List<DataListWrapper> getDataList(String selectedObject) {
        List<DataListWrapper> dataList = new List<DataListWrapper>();

        if(selectedObject == 'Account') {
            for(Account a:[SELECT Id, Name, Phone  FROM Account]) {
                DataListWrapper dl = new DataListWrapper();
                dl.dataId = a.Id;
                dl.name = a.Name;
                dl.phone = a.Phone;
                dataList.add(dl);

            }

        }else if(selectedObject =='Contact') {
            for(Contact c:[SELECT Id, Name, Phone FROM Contact]) {
                DataListWrapper dl = new DataListWrapper();
                dl.dataId = c.Id;
                dl.name = c.Name;
                dl.phone = c.Phone;
                dataList.add(dl);
            }

        }else if(selectedObject =='Lead') {
            for(Lead l:[SELECT Id, Name, Phone FROM Lead]) {
                DataListWrapper dl = new DataListWrapper();
                dl.dataId = l.Id;
                dl.name = l.Name;
                dl.phone = l.Phone;
                dataList.add(dl);
            }

        }

        return dataList;
    }
    
    class DataListWrapper{
        @AuraEnabled public String name{get;set;}
        @AuraEnabled public String phone{get;set;}
        @AuraEnabled public String dataId{get;set;}
        
    }
}