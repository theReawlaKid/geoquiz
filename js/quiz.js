
/*------------------------------------------------------------
 -------------------------------------------------------------
 ---------                UNIT                      ----------
 -------------------------------------------------------------
 -----------------------------------------------------------*/
// Unit: Constructor and Prototype
function Unit(num,title){
    this.uniNum = num;
    this.uniTitle = title;
    this.uniTopics = [
        [], // column 1 topics
        [], // column 2 topics
        []  // column 3 topics              
    ];
}

Unit.prototype.addQuiz = function(quiz){
    this.uniTopics[quiz.qzTopic].push(quiz);
}




/*------------------------------------------------------------
 -------------------------------------------------------------
 ---------                QUIZ                      ----------
 -------------------------------------------------------------
 -----------------------------------------------------------*/
// Quiz: Constructor and Prototype
function Quiz(qzQuestions,qzUnit,qzTopic,qzTitle,targets) {
    this.score = 0; // holds an integer
    this.questions = qzQuestions; // holds an array of Question objects
    this.currentQuestionIndex = 0; // holds an integer
    this.qzUnit = qzUnit; // holds an integer
    this.qzTopic = qzTopic; // holds an integer (corresponds to Unit.uniTopic)
    this.qzTitle = qzTitle; // holds a string
    this.targets = targets; // holds an array of 3 booleans (0=higher, 1=middle, 2=lower)
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

Quiz.prototype.showProgress = function() {
    $('#progress').text('Question ' + (this.currentQuestionIndex + 1) + ' out of ' + this.questions.length);
};



