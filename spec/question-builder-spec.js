describe("Lessons", function() {
  jasmine.getFixtures().fixturesPath = "spec/fixtures";
  
  beforeEach(function() {
    QuestionBuilder.builder.reset();
    loadFixtures("question.html");
  });
  
  describe("resetting the question", function() {
      it("should remove all questions", function() {
        $("#question-container").question("Arbitrary question", {expected: "Irrelevant", answer: "Unimportant"});

        QuestionBuilder.builder.reset();
        
        expect($("#question-container")).toBeEmpty();
      });
      
      it("should reset the counter", function() {
        loadFixtures("question.html");
        $("#question-container").question("Arbitrary question", {expected: "Irrelevant", answer: "Unimportant"});
        
        QuestionBuilder.builder.reset();
        
        $("#question-container").question("Another question", {expected: "Irrelevant", answer: "Unimportant"});
        expect($("#question-0").size()).toEqual(1);
        expect($("#question-1").size()).toEqual(0);
      });
  });
  
  describe("having incorrectly answered questions", function() {
    it("should show the question, expected answer and actual answer", function() {
      $("#question-container").question("What is 1 + 4?", {expected: 5, answer: 0});
      expect($("#question-container #question-0")).toHaveHtml("What is 1 + 4?<br>My answer: 5<br>Your answer: 0");
    });
      
    it("should be styled with a red bar", function() {
      $("#question-container").question("What is 1 + 4?", { expected: 5, answer: 0 });
      expect($("#question-0")).toHaveClass("incorrect-answer");
    });
      
    it("should be styled as a question", function() {
      $("#question-container").question("What is 1 + 4?", { expected: 5, answer: 0 });
      expect($("#question-0")).toHaveClass("question");
    });
  });
  
  describe("having correctly answered question", function() {
    it("should show only show the question and answer", function() {
      $("#question-container").question("What is 3 + 5?", {expected: 8, answer: 8});
      expect($("#question-0").html()).toBe("What is 3 + 5?<br>Correctly answered: 8");
    });
    
    it("should be style with a green bar", function() {
      $("#question-container").question("What is 3 + 5?", {expected: 8, answer: 8});
      expect($("#question-0")).toHaveClass("correct-answer");
    });
    
    it("should be styled as a question", function() {
      $("#question-container").question("What is 1 + 4?", { expected: 5, answer: 5 });
      expect($("#question-0")).toHaveClass("question");
    });
  });
  
  describe("tracking store", function() {
    it("should be invoked once all questions have been assessed", function() {
      var tracker = {registerAnswer: {}};
      spyOn(tracker, "registerAnswer");
      QuestionBuilder.tracker = tracker;
      
      var expectedFirstAnswer = new QuestionBuilder.Answer(1, 3, 3);
      var expectedSecondAnswer = new QuestionBuilder.Answer(2, 4, 5)
      var expected = [expectedFirstAnswer, expectedSecondAnswer];
      
      $("#question-container").question("1 + 1?", {expected: 3, answer: 3});
      $("#question-container").question("2 + 2?", {expected: 4, answer: 5});

      expect(tracker.registerAnswer.calls.length).toEqual(2);
      var actualFirstAnswer = tracker.registerAnswer.calls[0].args[0];
      var actualSecondAnswer = tracker.registerAnswer.calls[1].args[0]
      
      expect(actualFirstAnswer).toEqual(expectedFirstAnswer);
      expect(actualSecondAnswer).toEqual(expectedSecondAnswer);
    });
  });
});