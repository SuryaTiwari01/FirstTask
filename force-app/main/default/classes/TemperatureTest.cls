@isTest
public class TemperatureTest {
    @isTest
    Private Static void warmtempTest(){
        Decimal res = Temperature.FtoC(70);
        System.assertEquals(21.11, res);
    }
    @isTest
    Private Static void ColdtempTest(){
        Decimal res = Temperature.FtoC(30);
        System.assertEquals(-1.11, res);
    }

}