// 'choose unit' and 'choose topic' functions
function addQuizToUnit(qzToAdd){
    var x = qzToAdd.qzUnit - 1;
    var y = qzToAdd.qzTopic;
    units[x].uniTopics[y].push(qzToAdd);
}

function setUnitTitles(unitNum){
    var title = 'Unit ' + unitNum + ' - ';
    var col1header;
    var col2header;
    var col3header;
    if (unitNum === 1) {
        title += 'Living with the Physical Environment';
        col1header = 'Natural Hazards';
        col2header = 'Living World';
        col3header = 'UK Landscapes';
    } else if (unitNum === 2) {
        title += 'Challenges in the Urban Environment';
        col1header = 'Urban Challenges';
        col2header = 'Economic challenges';
        col3header = 'Resource Management';
    } else if (unitNum === 3) {
        title += 'Geographical Applications';
        col1header = 'Linking topics';
        col2header = 'Issue Evaluation';
        col3header = 'Fieldwork';
    } else {
        title += 'Geographical Skills';
        col1header = 'Map Skills';
        col2header = 'Graphical Skills';
        col3header = 'Other';
    }
    $('#chooseQuizUnitTitle').html(title);
    $('#colTitle1').html(col1header);
    $('#colTitle2').html(col2header);
    $('#colTitle3').html(col3header);
}

function writeBtns(unitButs) {
    for (var i = 0; i < 3; i++){
        for (var j = 0; j < unitButs[i].length; j++){
            var btnHtml = '<button class="topicBtn" value="';
            btnHtml += unitButs[i][j][0];
            btnHtml += '">';
            btnHtml += unitButs[i][j][1];
            btnHtml += '</button>';
            if (i === 0){
                $('#topicCol1').append(btnHtml);
            } else if (i === 1){
                $('#topicCol2').append(btnHtml);
            } else {
                $('#topicCol3').append(btnHtml);
            }
        }
    }
    $(".topicBtn").click(quizPicked);
}

function setUnitButtons(unitNum){
    var whichUnit;
    if (unitNum === 1) {
        writeBtns(quizCodes.unit1);
    } else if (unitNum === 2) {
        writeBtns(quizCodes.unit2);
    } else if (unitNum === 3) {
        writeBtns(quizCodes.unit3);
    } else {
        writeBtns(quizCodes.unit4);
    }
}

function setUnit(unitNum){
    setUnitTitles(unitNum);
    setUnitButtons(unitNum)
    $('#startScreen').hide();
    $('#chooseQuiz').show();
}
// 'load question data' and 'reset quiz' functions
function createTextQuestion(qData){ 
   q = new Question(
        qData.qType,
        qData.qText,
        qData.qChoices,
        qData.qAnswer,
        qData.qHint
    );
   return q;
}

function createPicQuestion(qData){
q = new Qpic(
        qData.qType,
        qData.qText,
        qData.qChoices,
        qData.qAnswer,
        qData.qHint,
        qData.picSrc,
        qData.picAlt
    );
   return q;
}

function getQuestionObjects(allQuestionData){
    // empty the questions array
    if (currQuiz.questions.length > 0){
        for (var i = 0; i < currQuiz.questions.length; i++){
            currQuiz.questions.pop();
        }
    }
    // for each question in quiz,
    var l = allQuestionData.length;
    for (var i = 0; i < l; i++) {
        // if text question, create Question and add to quiz
        if(allQuestionData[i].qType === 'text'){
            currQuiz.questions.push(createTextQuestion(allQuestionData[i]));
        } else {
        // if picQuestion, create Qpic and add to quiz
            currQuiz.questions.push(createPicQuestion(allQuestionData[i]));
        }
    }
}

function resetQuizData(result){
    getQuestionObjects(result.questions);
    currQuiz.qzUnit = result.qzUnit;
    currQuiz.qzTopic = result.qzTopic;
    currQuiz.qzTitle = result.qzTitle;
    currQuiz.currentQuestionIndex = 0;
    currQuiz.score = 0;
    currQuiz.targets = result.targets;
}

// 'choose answer' btn handler
function checkGuess(btnVal){
    QuizUI.checkAnswer(btnVal);
}
// change answer panel backColors
function changeTextQuPnlBGcolGreen(whichPnl) {
    if (whichPnl === 0) {
        $('#ansText0').addClass('green');
        $('#guess0').addClass('tick').text("");
    } else if (whichPnl === 1) {
        $('#ansText1').addClass('green');
        $('#guess1').addClass('tick').text("");
    } else if (whichPnl === 2) {
        $('#ansText2').addClass('green');
        $('#guess2').addClass('tick').text("");
    } else {
        $('#ansText3').addClass('green');
        $('#guess3').addClass('tick').text("");
    }
}
function changeTextQuPnlBGcolRed(whichPnl) {
    if (whichPnl === 0) {
        $('#ansText0').addClass('red');
        $('#guess0').addClass('cross').text("");
    } else if (whichPnl === 1) {
        $('#ansText1').addClass('red');
        $('#guess1').addClass('cross').text("");
    } else if (whichPnl === 2) {
        $('#ansText2').addClass('red');
        $('#guess2').addClass('cross').text("");
    } else {
        $('#ansText3').addClass('red');
        $('#guess3').addClass('cross').text("");
    }
}



function resetChoicePnlsBtns(){
    $('#ansText0').removeClass('green red');
    $('#guess0').removeClass('tick cross').text('Select Answer');
    $('#ansText1').removeClass('green red');
    $('#guess1').removeClass('tick cross').text('Select Answer');
    $('#ansText2').removeClass('green red');
    $('#guess2').removeClass('tick cross').text('Select Answer');
    $('#ansText3').removeClass('green red');
    $('#guess3').removeClass('tick cross').text('Select Answer');
}

// 'next question' button - show
function showNextQuestBtn() {
    $('#progress').hide();
    $('#overlay').show();
    if (currQuiz.hasEnded()) {
        $('#nextQuestBtn').text('Show Stats');
        $('#nextQuestBtn').click(showQuizStats);
    }
}
// 'next question' button - click handler
function nextQuestionplease(){
    resetChoicePnlsBtns();
    $('#progress').show();
    $('#overlay').hide();
    QuizUI.displayNext();
}


// variables (functions)
//   (get quiz via ajax request)
var quizPicked = function(){
    //use value of button to set url string
    var qz = this.value;
    $.getJSON("../quizzes/qz" + qz + ".json", function(result){
        resetQuizData(result);
        QuizUI.displayNext();
    });
    $('#chooseQuiz').hide();
    $('#quiz').show();
}

var QuizUI = {
    displayNext: function () {
        if (currQuiz.hasEnded() === false) {
            var q = currQuiz.questions[currQuiz.currentQuestionIndex];
            if (q.qType === 'text'){
                q.askTextQuestion();
            } else {
                q.askPicQuestion();
            }
        }
    },
    checkAnswer: function(btnVal) {
        var q = currQuiz.questions[currQuiz.currentQuestionIndex];
        if (q.isCorrectAnswer(btnVal)) {
            // change bg color of answer panel to green
            changeTextQuPnlBGcolGreen(btnVal);
            currQuiz.currentQuestionIndex += 1;
            showNextQuestBtn();
        } else {
            // change bg color of answer panel to red
            changeTextQuPnlBGcolRed(btnVal);
        }
    },

};

var showQuizStats = function () {
    
}


// variables 
var units = [];
var unit1 = new Unit(1,'Living with the Physical Environment');
var unit2 = new Unit(2,'Challenges in the Urban Environment');
var unit3 = new Unit(3,'Geographical Applications');
var unit4 = new Unit(4,'Geographical Skills');
var currQuiz = new Quiz([],0,"","",[]);


// Game

units.push(unit1);
units.push(unit2);
units.push(unit3);
units.push(unit4);

$('#chooseQuiz').hide();
$('#quiz').hide();












