var assert = require('assert');
var DcRbac = require('../dist').default;

var dbSetup = false;

var _app;

var lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

describe('DcRbac', function() {

  describe('#constructor()', function() {
    it('should return new instance', function(done) {
      var rb = new DcRbac();
      assert.equal(true, (rb instanceof DcRbac));
      done();
    });
  });
  
  if (dbSetup){
    describe('#setup()', function() {
      it('should be setup the database without problems', function(done) {
        var rb = new DcRbac();
        rb
          .setup()
          .then(function(result){
            assert.equal(true, result === true);
            done();
          })
          .catch(function(err){
            done(err);
          });
      });
    });    
  }

  describe('#registerApp()', function() {
    var rb = new DcRbac();
    var s = rb.security.radomSalt().substring(0, 5);

    it('should be register a new application', function(done) {
      rb
        .registerApp({ app: s, app_caption: s, app_description: lorem })
        .then(function(o){
          _app = o;
          assert.equal(true, (typeof o === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('should be crash when add a application with the same name', function(done) {
      rb
        .registerApp({ app: s, app_caption: s, app_description: lorem })
        .then(function(err){
          done(new Error('Unique contraint wrong'));
        })
        .catch(function(err) {
          assert.equal(true, err !== undefined);
          done();
        });
    });
  });

});