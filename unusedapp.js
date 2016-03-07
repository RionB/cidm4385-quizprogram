var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController',['$scope', function($scope){
    var qpc = this;
    qpc.students = 
    [
        {
            name: "Sarmila",
            correct: 0,
            incorrect: 0
        },
        {
            name: "Matthew A.",
            correct: 0,
            incorrect: 0
        },
                {
            name: "Julian",
            correct: 0,
            incorrect: 0
        },
                {
            name: "Kris",
            correct: 0,
            incorrect: 0
        },
                {
            name: "Bo",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Rion",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Brandie",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Derriel",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Jordan H.",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Jonathan",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Matthew K.",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Brandon",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Maria",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Angel",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Lilane",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Juan",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Brett",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Skyler",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Aric",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Aaron",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Tony",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Keona",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Devonte",
            correct: 0,
            incorrect: 0
        },
              {
            name: "Jordan W.",
            correct: 0,
            incorrect: 0
        }
    ];
    qpc.students_completed = [];
    qpc.questions = 
    [
        {
            text: "AngularJS uses what programming language?", 
            answer: "JavaScript"
        },
        {
            text: "The scope is the ______ between the template and controller", 
            answer: "glue"
        },
                {
            text: "Angular uses _______ and _________ in the template", 
            answer: "directives and expressions"
        },
        {
            text: "You bootstrap your angular application with the ngApp directive", 
            answer: "true"
        },
        {
            text: "AngularJS is fun", 
            answer: "Yes"
        },
    ];
    
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