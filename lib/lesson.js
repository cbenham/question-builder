var QuestionBuilder = {};

QuestionBuilder.Builder = function() {
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
            answerHtml += "expected: " + expected + "<br>"+ "but got: " + answer + '</div>';
        }

        var html = '<div id="question-' + questionCounter + '" class="' + answerClass + '">' + question + "<br>";
        $(this).append(html + answerHtml);

        questionCounter++;
    };

    this.reset = function() {
        questionCounter = 0;
        $(this).html("");
    };
};

QuestionBuilder.builder = new QuestionBuilder.Builder();

(function($){
    $.fn.question = QuestionBuilder.builder.add;
    $.fn.reset = QuestionBuilder.builder.reset;
})(jQuery);