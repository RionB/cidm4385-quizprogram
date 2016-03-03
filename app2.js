var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController',
['$scope','studentListService', 'questionListService', 'LocalStorageService',
function($scope, studentListService, questionListService, LocalStorageService){
    
    var qpc = this;
    
    qpc.students_completed = [];
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
        
       // console.log("length of students is: " + qpc.students.length);
       // console.log("length of students_completed is: " + qpc.students_completed.length);
        var wholeList = qpc.students.concat(qpc.students_completed);
        qpc.update(angular.toJson(wholeList));
        qpc.getNext();
    }
    
    qpc.doIncorrect = function(){
        qpc.selected_student.incorrect++;
       // console.log("length of students is: " + qpc.students.length);
      //  console.log("length of students_completed is: " + qpc.students_completed.length);        
        var wholeList = qpc.students.concat(qpc.students_completed);        
        qpc.update(angular.toJson(wholeList));
        qpc.getNext();        
    }
    
    qpc.fetch = function() {
        return LocalStorageService.getData();
    }
    qpc.update = function(val) {
        return LocalStorageService.setData(val);
    }

    qpc.getStudents = function(){
        var fromStorage = qpc.fetch();
        
       // console.log(fromStorage);
        
        if(fromStorage){
          //  console.log(fromStorage);
            qpc.students = fromStorage;
            qpc.getNextStudent();
        }else{
            studentListService.getStudentList()
                .then(
                    // if $http.get was successful, do this
                    function(response){
                      //  console.log(response);
                        qpc.students = response.data;
                        qpc.getNextStudent();
                    },
                    // if $http.get was unsuccessful, do this
                    function(response){
                       // console.log(response);
                        qpc.students = [];
                    }
            );
        }
        
    };
     qpc.getQuestions = function(){
        questionListService.getQuestionList()
        .then(
            // if $http.get was successful, do this
            function(response){
              //  console.log(response);
                qpc.questions = response.data;
                qpc.getNextQuestion();
            },
            // if $http.get was unsuccessful, do this
            function(response){
               // console.log(response);
                qpc.questions = [];
            }
        );
    };
    
     // qpc.getNext();
     qpc.getStudents();
     qpc.getQuestions();
     
     // mc.update(angular.toJson(mc.students));
     // qpc.students = LocalStorageService.getData();
     

    
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

////////////////////////// local storage factory //////////////////////////////////
quizModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event){
        if (event.key === 'my-storage7') {
            $rootScope.$apply();
        }
    });
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage7', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage7');
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});
