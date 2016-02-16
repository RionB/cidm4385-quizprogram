var mainModule = angular.module("QuizzingProgram", ['ngAnimate']);

mainModule.controller('StudentController', function ($scope) {
    
    // <div ng-app="test" ng-init="student=[Sarmila Adhikari, Matthew Aldaco, Julian Biggers, Kris Billings, Bo Bonner, Rion Broome, Brandie Brown, Derriel Collins, Jordan Hodge, Jonathan Jones, Matthew Kavanaugh, Brandon Lewis, Maria Mata, Angel Morales, Lilane Ndagang, Juan Pina, Brett Ponder, Jodie Rohrer, Skyler Schmidt, Aric Sooter, Aaron Souvannasacd, Tony Vangvanh, Keona Williams, Devonte Wilson, Jordan Woodard]">
    // </div>
    
    var qp = this;
    var student=['Sarmila Adhikari', 'Matthew Aldaco', 'Julian Biggers', 'Kris Billings', 'Bo Bonner', 'Rion Broome', 'Brandie Brown', 'Derriel Collins', 'Jordan Hodge', 'Jonathan Jones', 'Matthew Kavanaugh', 'Brandon Lewis', 'Maria Mata', 'Angel Morales', 'Lilane Ndagang', 'Juan Pina', 'Brett Ponder', 'Jodie Rohrer', 'Skyler Schmidt', 'Aric Sooter', 'Aaron Souvannasacd', 'Tony Vangvanh', 'Keona Williams', 'Devonte Wilson', 'Jordan Woodard'];
    var question=['What is AngularJS?', 'How is AngularJS different from normal Javascript?', 'What use does the "this" keyword have?', 'What is $scope used for?', 'What are Controllers used for?'];

    
    qp.studentPicker = function studentPicker() {
        var studentPick = student[Math.floor(Math.random() * student.length)];
    };
    
    qp.questionPicker = function questionPicker() {
        var questionPick = question[Math.floor(Math.random() * question.length)];
    };
});