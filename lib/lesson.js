(function($){
    var questionIndex = 1;
    $.fn.question = function(question, options) {
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
        
        var html = '<div id="question-' + questionIndex + '" class="' + answerClass + '">' + question + "<br>";
        $(this).append(html + answerHtml);
        
        questionIndex++;
    };
    
    $.fn.reset = function() {
        questionIndex = 1;
        $(this).html("");
    };
})(jQuery);