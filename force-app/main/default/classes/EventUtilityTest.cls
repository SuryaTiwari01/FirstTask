@isTest
public class EventUtilityTest {
    @isTest
    Private static void TestEventStatusLenght(){
        String res = EventUtility.eventPriority('IND');
        String res1 = EventUtility.eventPriority('CA');
        String res2 = EventUtility.eventPriority('NA');
        
        System.assertEquals(null, res);
        System.assertEquals('High', res1);
        System.assertEquals('Medium', res2);
    }

}