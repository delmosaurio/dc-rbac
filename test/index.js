var assert = require('assert');
var DcRbac = require('../dist').default;

var dbSetup = false;

var _app, _user, _token;

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

  describe('$users', function() {

    describe('#register()', function() {
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

    describe('#getById()', function() {
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

    describe('#getByUsernameOrEmail({username})', function() {
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

    describe('#getByUsernameOrEmail({email})', function() {
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

    describe('#changePassword()', function() {
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

    describe('#disable()', function() {
      var rb = new DcRbac({logging: false});
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

    describe('#enable()', function() {
      var rb = new DcRbac({logging: false});
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

    describe('#authenticate()', function() {
      var rb = new DcRbac({logging: false});
      var s = rb.security.radomSalt().substring(0, 10);

      it('should be authenticate with the password', function(done) {

        rb
          .users
          .authenticate(_user.email, 'topsecret')
          .then(function(u){
            assert.equal(true, (typeof u === 'object'));
            done();
          })
          .catch(function(err) {
            done(err);
          });

      });

      it('should be error with the wrong password', function(done) {

        rb
          .users
          .authenticate(_user.email, 'wrongpassword')
          .then(function(u){
            throw new Error('Wrong password authentication?')
            done();
          })
          .catch(function(err) {
            assert.equal(true, err !== undefined);
            done();
          });

      });
    });
  });

  describe('$tokens', function() {

    describe('#activationToken()', function() {
      var rb = new DcRbac();
      var s = rb.security.radomSalt().substring(0, 10);

      it('should be create a token to activate a user', function(done) {
        rb.tokens
          .activationToken({ user_id_users: _user.user_id })
          .then(function(o){
            _token = o;
            assert.equal(true, (typeof o.token === 'object'));
            assert.equal(true, (o.token.type === 'activation'));
            assert.equal(true, (typeof o.code === 'string'));
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    describe('#passwordToken()', function() {
      var rb = new DcRbac();
      var s = rb.security.radomSalt().substring(0, 10);

      it('should be create a token to change user password', function(done) {
        rb.tokens
          .passwordToken({ user_id_users: _user.user_id })
          .then(function(o){
            assert.equal(true, (typeof o.token === 'object'));
            assert.equal(true, (o.token.type === 'password_change'));
            assert.equal(true, (typeof o.code === 'string'));
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    describe('#getByHash()', function() {
      var rb = new DcRbac();
      var s = rb.security.radomSalt().substring(0, 10);

      it('should be get a token by hash', function(done) {
        rb.tokens
          .getByHash(_token.token.token)
          .then(function(t){
            assert.equal(true, (typeof t === 'object'));
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('should be get a token by encrypting de code', function(done) {
        rb.tokens
          .getByHash(rb.security.encrypt(_token.code))
          .then(function(t){
            assert.equal(true, (typeof t === 'object'));
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });
  });

});