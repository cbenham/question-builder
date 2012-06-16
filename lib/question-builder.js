var QuestionBuilder = {};

QuestionBuilder.Builder = function() {
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
            answerHtml += "my answer: " + expected + "<br>"+ "your answer: " + answer + '</div>';
        }

        var html = '<div id="' + QUESTION_ID + questionCounter + '" class="question ' + answerClass + '">' + question + "<br>";
        $(this).append(html + answerHtml);

        questionCounter++;
    };

    this.reset = function() {
        var idsToRemove = [];
        for(var i = 0; i < questionCounter; i++) {
            idsToRemove.push("#" + QUESTION_ID + i);
        }
        $(idsToRemove.join(' ')).remove();
        questionCounter = 0;
    };
};

QuestionBuilder.builder = new QuestionBuilder.Builder();

(function($){
    $.fn.question = QuestionBuilder.builder.add;
})(jQuery);