public with sharing class OnlineQuiz {
    
    @AuraEnabled(cacheable=true) //For  different cmp.
    public static List<Question__c> onlineQuiz() {
        return[SELECT Id, Question__c, Type__c, OptionA__c, Option__c FROM Question__c ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Map<String, String>> quizList() {
        List<Survey__c> getQuizList = [SELECT Id, Name FROM Survey__c];
        List<Map<String, String>> result = new List<Map<String, String>>();

        for (Survey__c quiz : getQuizList) {
            result.add(new Map<String, String> {'value' => quiz.Id, 'label' => quiz.Name});
        }

        return result;
    }

    @AuraEnabled
    public static List<wrapperQuestions> selectedQuizQuestions(String quizId) {
    
        List<Survey_Question__c> questionList = [SELECT Id, Name, (SELECT Id, Name FROM Question_Options__r) 
                                                FROM Survey_Question__c 
                                                WHERE Survey__r.Id = :quizId];

        List<wrapperQuestions> objWrapperQuestion = new List<wrapperQuestions>();
        for (Survey_Question__c quizQuestions : questionList) {

            List<wrapperOptionList> quizQuestionsOptions = new List<wrapperOptionList>();
            for (Question_Option__c optionList : quizQuestions.Question_Options__r) {
                quizQuestionsOptions.add(new wrapperOptionList(optionList.Name, optionList.Id));
            }

            wrapperQuestions questionOption = new wrapperQuestions(quizId, quizQuestions.Id, quizQuestions.Name, quizQuestions.Question_Options__r, quizQuestionsOptions);
            objWrapperQuestion.add(questionOption);
        }
        system.debug('objWrapperQuestion--'+JSON.serializepretty(objWrapperQuestion));
        return objWrapperQuestion;
    }
    
    public class wrapperQuestions {

        @AuraEnabled public String quizId;
        @AuraEnabled public String questionId;
        @AuraEnabled public String questionsName;
        @AuraEnabled public List<Question_Option__c> options;
        @AuraEnabled public List<wrapperOptionList> optionsList;
        @AuraEnabled public String selectedAnswer;

        public wrapperQuestions(String quizId, String questionId, String questionsName, List<Question_Option__c> options, List<wrapperOptionList> optionsList) {

            this.quizId = quizId;
            this.questionId = questionId;
            this.questionsName = questionsName;
            this.options = options;
            this.optionsList = optionsList;
            this.selectedAnswer = '';
        }
    }

    public class wrapperOptionList {

        @AuraEnabled public String label;
        @AuraEnabled public String value;

        public wrapperOptionList(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }

    @AuraEnabled
    public static void submitQuiz(String listWrapperOptions, String quizId) {
        List<wrapperQuestions> wrapData = (List<wrapperQuestions>) JSON.deserialize(listWrapperOptions, List<wrapperQuestions>.class);
        Survey_User__c uName = new Survey_User__c();
        uName.Username__c = 'Test '+1;
        insert uName;
        System.debug('uName.id---'+uName.Id);
        Survey_Response__c surveyResponseObj = new Survey_Response__c(Survey__c = quizId, Quiz_User__c = uName.Id);
        insert surveyResponseObj;

        List<Survey_Answer__c> surveyAnswerList = new List<Survey_Answer__c>();
        for(wrapperQuestions receivedQuesAnsOpt : wrapData) {
            System.debug('receivedQuesAnsOpt-----' + Json.serializePretty(receivedQuesAnsOpt));
            Survey_Answer__c surveyAnswer = new Survey_Answer__c(Survey_Question__c = receivedQuesAnsOpt.questionId,
                                                                Survey__c = receivedQuesAnsOpt.quizId,
                                                                Question_Option_Selected__c = receivedQuesAnsOpt.selectedAnswer,
                                                                Survey_Response__c = surveyResponseObj.Id,
                                                                Survey_User__c = uName.Id);
            surveyAnswerList.add(surveyAnswer);
        }

        if(surveyAnswerList.size() > 0) {
            system.debug('surveyAnswerList----'+surveyAnswerList);
            insert surveyAnswerList;
        }
    }
}