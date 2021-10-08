/* Populate contact description when user creates contact.
*/

trigger ContactbeforeInsert on Contact (before insert) 
{
    For (Contact contact : Trigger.new)     //Trigger.new hold new version of contacts
    {
        contact.description = 'Contact created successfully by using ContactBeforeInsert trigger';
    }
    //No need to write DML statement, trigger.new will be take care.

}