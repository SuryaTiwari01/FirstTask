public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Type, Rating,
                Phone, Website, AnnualRevenue
            FROM Account];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Phone, Title, Email
            FROM Contact];
    }
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeadList() {
        return [SELECT Id, Name, Company, Status, Phone
            FROM Lead];
    }
}