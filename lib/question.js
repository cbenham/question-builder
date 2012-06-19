var QuestionBuilder = QuestionBuilder || {};

QuestionBuilder.Answer = function(questionIndex, correctAnswer, studentAnswer) {
  this.questionIndex = questionIndex;
  this.correctAnswer = correctAnswer;
  this.studentAnswer = studentAnswer;
};