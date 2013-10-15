/// <reference path="../libs/chai.d.ts" />
/// <reference path="../libs/mocha.d.ts" />

describe('Login Page', function() {
  describe('When use logs in', function() {

    it('should return Hello World!', function() {
      
      var foobar = {
        sayHello: function() {
          return 'Hello World!';
        }
      };

      assert(foobar.sayHello() === 'Hello World!', 'Was expecting "Hello World!"');
    });

    it('should return Z', function() {
      
      var foobar = {
        sayHello: function() {
          return 'Hello Z!';
        }
      };

      assert(foobar.sayHello() === 'Hello Z!', 'Was expecting "Hello Z!"');
    });

    it('should return A', function() {
      
      var foobar = {
        sayHello: function() {
          return 'Hello A!';
        }
      };

      assert(foobar.sayHello() === 'Hello A!', 'Was expecting "Hello A!"');
    });

  })
});