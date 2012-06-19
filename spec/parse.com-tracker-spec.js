var applicationId = "applicationId";
var javascriptKey = "javascriptKey";
var username = "foo";
var password = "bar";

QuestionBuilder.ParseConfig = {applicationId: applicationId, javascriptKey: javascriptKey, username: username, password: password};

describe("Parse.com tracker", function(){
  
  var tracker;
  
  beforeEach(function() {
     tracker = new QuestionBuilder.ParseTracker();
  });
  
  describe("initialise", function() {
    
    beforeEach(function() {
      spyOn(Parse.User, "logIn");
    });
    
    it("should occur when tracking", function() {
      spyOn(Parse, "initialize");

      tracker.track();
      
      expect(Parse.initialize).toHaveBeenCalledWith(applicationId, javascriptKey);
    });
    
    it("should only occur on first tracking attempt", function() {
      spyOn(Parse, "initialize");
      
      tracker.track();
      tracker.track();
      
      expect(Parse.initialize.calls.length).toEqual(1);
    });
  });
  
  describe("logging in", function() {
    it("should occur when there is no current user", function() {
      spyOn(Parse.User, "logIn");
      tracker.track();
      expect(Parse.User.logIn).toHaveBeenCalledWith(username, password, jasmine.any(Object));
    });
  });
});