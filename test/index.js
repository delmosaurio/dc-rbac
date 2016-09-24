var assert = require('assert');
var DcRbac = require('../dist').default;

var dbSetup = false;

var _app, _user;

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

  describe('#users.register()', function() {
    var rb = new DcRbac({logging: false});
    var s = rb.security.radomSalt().substring(0, 10);

    _password = s;

    it('should be create a new user', function(done) {
      rb.users
        .register({
          username: s,
          email: s+'@gmail.com',
          password: s
        })
        .then(function(user){
          _user = user;
          assert.equal(true, (typeof user === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('should be crash when add a user with the same name/email', function(done) {
      rb.users
        .register({
          username: s,
          email: s+'@gmail.com',
          password: s
        })
        .then(function(){
          done(new Error('Unique contraint wrong'));
        })
        .catch(function(err) {
          assert.equal(true, err !== undefined);
          done();
        });
    });
  });

  describe('#users.getById()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a user by id', function(done) {
      rb.users
        .getById(_user.user_id)
        .then(function(res){
          assert.equal(true, res.user_id === _user.user_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#users.getByUsernameOrEmail({username})', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a user by username', function(done) {
      rb.users
        .getByUsernameOrEmail(_user.username)
        .then(function(res){
          assert.equal(true, res.user_id === _user.user_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#users.getByUsernameOrEmail({email})', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a user by email', function(done) {
      rb.users
        .getByUsernameOrEmail(_user.email)
        .then(function(res){
          assert.equal(true, res.user_id === _user.user_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#users.changePassword()', function() {
    var rb = new DcRbac();
    var s = rb.security.radomSalt().substring(0, 10);

    it('should be change the user password', function(done) {
      rb.users
        .changePassword(_user.user_id, 'topsecret')
        .then(function(u){
          assert.equal(true, (typeof u === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#users.disable()', function() {
    var rb = new DcRbac();
    var s = rb.security.radomSalt().substring(0, 10);

    it('should be disable a user', function(done) {
      rb.users
        .disable(_user.user_id)
        .then(function(u){
          assert.equal(true, (typeof u === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#users.enable()', function() {
    var rb = new DcRbac();
    var s = rb.security.radomSalt().substring(0, 10);

    it('should be enable a user', function(done) {
      rb.users
        .enable(_user.user_id)
        .then(function(u){
          assert.equal(true, (typeof u === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

});