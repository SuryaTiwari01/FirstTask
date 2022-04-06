import { LightningElement, wire, track} from 'lwc';
import selectedQuizQuestions from '@salesforce/apex/OnlineQuiz.selectedQuizQuestions';
import quizList from '@salesforce/apex/OnlineQuiz.quizList';
import submitQuiz from '@salesforce/apex/OnlineQuiz.submitQuiz';

export default class quiztwo extends LightningElement {
    
    isDefaultPage = true;
    isQuestions = false;
    questions;
    questionsName;
    error;
    selectedQuiz;
    quizNameList;
    questionOptionList;
    currentQuestion;
    totalQuestionsSize;
    index = 0;
    currentQuestionId;
    lastPage = false;
    firstPage = true;
    viewSubmitButton = true;
    valueSelected;

    connectedCallback() {
        quizList()
        .then(result => {
            this.quizNameList = result;
        });
    }

    handleChange(event) {
        if(event.target.name === 'SubjectComboBox') {
            this.selectedQuiz = event.detail.value;
        } else if(event.target.name === 'radioGroup') {   
            this.valueSelected = event.target.value;
            this.currentQuestion.selectedAnswer = this.valueSelected;
            this.questionOptionList[this.index].selectedAnswer=event.target.value;
        }
    }

    proceedMethod() {
        selectedQuizQuestions({quizId:this.selectedQuiz})
        .then(result => {
            this.questionOptionList = result;
            this.totalQuestionsSize = this.questionOptionList.length;
            this.currentQuestion = this.questionOptionList[this.index];
            this.isQuestions = true;
            this.isDefaultPage = false;
            this.currentQuestionId = this.currentQuestion.questionId;
        });
    }

    previous() {
        this.index = this.index - 1;
        this.currentQuestion = this.questionOptionList[this.index];
        this.currentQuestionId = this.currentQuestion.QuestionId;
        
        if (this.index === (this.totalQuestionsSize - 1)) {
            this.lastPage = true;
            this.viewSubmitButton = false;
        } else if (this.index === 0) {
            this.firstPage = true;
        } else {
            this.viewSubmitButton = true;
            this.lastPage = false;
        }
    }

    next() {
        this.index = this.index + 1;
        this.currentQuestion = this.questionOptionList[this.index];
        this.currentQuestionId = this.currentQuestion.questionId;
        
        if (this.index === (this.totalQuestionsSize - 1)) {
            this.lastPage = true;
            this.viewSubmitButton = false;
        } else if (this.index === 0) {
            this.firstPage = true;
        } else {
            this.firstPage = false;
        }
    }

    submitMethod() {
        console.log('submit method calls----');
        console.log('this.questionOptionList---',JSON.stringify(this.questionOptionList));
        console.log('this.selectedQuiz---',this.selectedQuiz);

        submitQuiz({listWrapperOptions : JSON.stringify(this.questionOptionList), 
                    quizId : this.selectedQuiz})
        .then(result => {
            console.log('record has submitted--',result);
        })
        .catch(error => {
            this.error = error;
            console.log('error---',error);
        });
    }
}