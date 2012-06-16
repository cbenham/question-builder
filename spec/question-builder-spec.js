describe("Lessons", function() {
    jasmine.getFixtures().fixturesPath = "spec/fixtures";
    
    beforeEach(function() {
        QuestionBuilder.builder.reset();
    });
    
    describe("resetting the question", function() {
        it("should remove all questions", function() {
            loadFixtures("question.html");

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
            loadFixtures("question.html");
            $("#question-container").question("What is 1 + 4?", {expected: 5, answer: 0});
            expect($("#question-container #question-0")).toHaveHtml("What is 1 + 4?<br>expected: 5<br>but got: 0");
        });
        
        it("should be styled with a red bar", function() {
            loadFixtures("question.html");
            $("#question-container").question("What is 1 + 4?", { expected: 5, answer: 0 });
            expect($("#question-0")).toHaveClass("incorrect-answer");
        });
    });
    
    describe("having correctly answered question", function() {
        it("should show only show the question and answer", function() {
            loadFixtures("question.html");
            $("#question-container").question("What is 3 + 5?", {expected: 8, answer: 8});
            expect($("#question-0").html()).toBe("What is 3 + 5?<br>Correctly answered: 8");
        });
        
        it("should be style with a green bar", function() {
            loadFixtures("question.html");
            $("#question-container").question("What is 3 + 5?", {expected: 8, answer: 8});
            expect($("#question-0")).toHaveClass("correct-answer");
        });
    });
});