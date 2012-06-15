(function($){
    var questionIndex = 1;
    $.fn.question = function(question, options) {
        var expected = options['expected'];
        var answer = options['answer'];
        
        var html = '<div id="question-' + questionIndex + '">' + question + "<br>";
        
        if(expected === answer) {
            html += "Correctly answered: " + expected;
        } else {
            html += "expected: " + expected + "<br>"+ "but got: " + answer + '</div>';
        }
        
        $(this).append(html);
        
        questionIndex++;
    };
    
    $.fn.reset = function() {
        questionIndex = 1;
        $(this).html("");
    };
})(jQuery);