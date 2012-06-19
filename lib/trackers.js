var QuestionBuilder = QuestionBuilder || {};

QuestionBuilder.NullTracker = function() {
  this.registerAnswer = function() {}
};

QuestionBuilder.ParseTracker = function() {
  
  var initialised = false;
  
  this.track = function() {
    initialise();
    Parse.User.logIn(QuestionBuilder.ParseConfig.username, QuestionBuilder.ParseConfig.password, {});
  };
  
  var initialise = function() {
    if(!initialised) {
      Parse.initialize(QuestionBuilder.ParseConfig.applicationId, QuestionBuilder.ParseConfig.javascriptKey);
      initialised = true;
    }
  };
};