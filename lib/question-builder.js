var QuestionBuilder = QuestionBuilder || {};

QuestionBuilder.tracker = new QuestionBuilder.NullTracker();

QuestionBuilder.Builder = function(questionTracker) {

  var QUESTION_ID = "question-";
  
  var questionCounter = 0;

  this.add = function(question, options) {
    var expected = options['expected'];
    var answer = options['answer'];

    var answerHtml = "";
    var answerClass = "correct-answer";

    if(expected === answer) {
        answerHtml += "Correctly answered: " + expected;
    } else {
        answerClass = "incorrect-answer";
        answerHtml += "My answer: " + expected + "<br>"+ "Your answer: " + answer + '</div>';
    }

    var html = '<div id="' + QUESTION_ID + questionCounter + '" class="question ' + answerClass + '">' + question + "<br>";
    $(this).append(html + answerHtml);

    questionCounter++;
    
    QuestionBuilder.tracker.registerAnswer(new QuestionBuilder.Answer(questionCounter, expected, answer));
  };

  this.reset = function() {
    for(var i = 0; i < questionCounter; i++) {
        $("#" + QUESTION_ID + i).remove();
    }
    questionCounter = 0;
  };
};

QuestionBuilder.builder = new QuestionBuilder.Builder();

(function($){
  $.fn.question = QuestionBuilder.builder.add;
})(jQuery);