public class EventUtility {
    Public static String eventPriority(String eventStatus){
        
        String eventPri;
        
        If(String.isBlank(eventstatus) || eventstatus.length() > 2 ){
            return Null;
        }
        If(eventstatus == 'CA'){
            eventPri = 'High';            
        }else{
            eventPri = 'Medium';
        }
        return eventPri;
    }

}