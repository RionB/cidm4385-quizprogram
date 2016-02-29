var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController',
['$scope', 'studentListService', 'questionListService',
function($scope, studentListService, questionListService){
    
    var qpc = this;
    
    
    //qc.question=['What is AngularJS?', 'How is AngularJS different from normal Javascript?', 'What use does the "this" keyword have?', 'What is $scope used for?', 'What are Controllers used for?'];

    qpc.students = [];
    
    qpc.students_completed = [];
    
    qpc.questions = [];
    
    qpc.questions_completed = [];
    
    qpc.getNextQuestion = function(){
        
        if(qpc.questions.length > 0){
            var index = Math.floor(Math.random() * qpc.questions.length);
            qpc.selected_question = qpc.questions[index];
            qpc.questions_completed.push(qpc.selected_question);
            qpc.questions.splice(index, 1);            
        }
        else{
            qpc.questions = qpc.questions_completed;
            qpc.questions_completed = [];
        }

    }
    
    qpc.getNextStudent = function(){
        
        if(qpc.students.length > 0){
            var index = Math.floor(Math.random() * qpc.students.length);
            qpc.selected_student = qpc.students[index];
            qpc.students_completed.push(qpc.selected_student);
            qpc.students.splice(index, 1);
        }
        else{
            qpc.students = qpc.students_completed;
            qpc.students_completed = [];
        }
    }
    
    qpc.getNext = function(){
        qpc.getNextQuestion();
        qpc.getNextStudent();
    }
    
    qpc.doCorrect = function(){
        qpc.selected_student.correct++;
        qpc.getNext();
    }
    
    qpc.doIncorrect = function(){
        qpc.selected_student.incorrect++;
        qpc.getNext();        
    }
    
    qpc.getNext();
    
}]);

///// STUDENT LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('studentListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function(){
        return $http.get("students.json");
    };
    
    return studentListService;
}]);

///// QUESTION LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('questionListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get question list
    questionListService.getQuestionList = function(){
        return $http.get("questions.json");
    };
    
    return questionListService;
}]);