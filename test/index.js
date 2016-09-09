var assert = require('assert');
var DcRbac = require('../dist').default;

describe('DcRbac', function() {

  var _user, _object, _role, _profile;

  describe('#constructor()', function() {
    it('should return new instance', function(done) {
      var rb = new DcRbac();
      assert.equal(true, (rb instanceof DcRbac))
      done();
    });
  });

  describe('#addProfile()', function() {
    var rb = new DcRbac();
    var s = rb.cipher.radomSalt().substring(0, 10);

    it('should be create a new profile', function(done) {
      rb
        .addProfile({ profile_name: s })
        .then(function(p){
          _profile = p;
          assert.equal(true, (typeof p === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('should be crash when add a profile with the same name', function(done) {
      rb
        .addProfile({ profile_name: s })
        .then(function(){
          done(new Error('Unique contraint wrong'));
        })
        .catch(function(err) {
          assert.equal(true, err !== undefined);
          done();
        });
    });
  });

  describe('#createUser()', function() {
    var rb = new DcRbac({logging: false});
    var s = rb.cipher.radomSalt().substring(0, 10);

    it('should be create a new user', function(done) {
      rb
        .createUser({
          profile_id_profiles: _profile.dataValues.profile_id,
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
      rb
        .createUser({
          profile_id_profiles: 1,
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

  describe('#addRole()', function() {
    var rb = new DcRbac();
    var s = rb.cipher.radomSalt().substring(0, 10);

    it('should be create a new role', function(done) {
      rb
        .addRole({ role_name: s })
        .then(function(r){
          _role = r;
          assert.equal(true, (typeof r === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('should be crash when add a role with the same name', function(done) {
      rb
        .addRole({ role_name: s })
        .then(function(){
          done(new Error('Unique contraint wrong'));
        })
        .catch(function(err) {
          assert.equal(true, err !== undefined);
          done();
        });
    });
  });

  describe('#addObject()', function() {
    var rb = new DcRbac();
    var s = rb.cipher.radomSalt().substring(0, 10);

    it('should be create a new object', function(done) {
      rb
        .addObject({ object_name: s })
        .then(function(o){
          _object = o;
          assert.equal(true, (typeof o === 'object'));
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('should be crash when add a object with the same name', function(done) {
      rb
        .addObject({ object_name: s })
        .then(function(){
          done(new Error('Unique contraint wrong'));
        })
        .catch(function(err) {
          assert.equal(true, err !== undefined);
          done();
        });
    });
  });

  describe('#revokeUserObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be revoke a object for a user', function(done) {
      rb
        .revokeUserObject(parseInt(_user.dataValues.user_id), parseInt(_object.dataValues.object_id), 8,0)
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#accessUserObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get object user access', function(done) {
      rb
        .accessUserObject(parseInt(_user.dataValues.user_id), parseInt(_object.dataValues.object_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#unlinkUserObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be unlink a object for a user', function(done) {
      rb
        .unlinkUserObject(parseInt(_user.dataValues.user_id), parseInt(_object.dataValues.object_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#revokeUserObject() // for other test', function() {
    var rb = new DcRbac({logging: false});

    it('should be revoke a object for a user', function(done) {
      rb
        .revokeUserObject(parseInt(_user.dataValues.user_id), parseInt(_object.dataValues.object_id), 8,0)
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#revokeRoleObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be revoke a object for a role', function(done) {
      rb
        .revokeRoleObject(parseInt(_role.dataValues.role_id), parseInt(_object.dataValues.object_id), 8,0)
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#accessRoleObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get object role access', function(done) {
      rb
        .accessRoleObject(parseInt(_role.dataValues.role_id), parseInt(_object.dataValues.object_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#unlinkRoleObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be unlink a object for a role', function(done) {
      rb
        .unlinkRoleObject(parseInt(_role.dataValues.role_id), parseInt(_object.dataValues.object_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#revokeRoleObject()', function() {
    var rb = new DcRbac({logging: false});

    it('should be revoke a object for a role', function(done) {
      rb
        .revokeRoleObject(parseInt(_role.dataValues.role_id), parseInt(_object.dataValues.object_id), 8,0)
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#addRoleProfile()', function() {
    var rb = new DcRbac({logging: false});

    it('should be add role to a profile', function(done) {
      rb
        .addRoleProfile(parseInt(_role.dataValues.role_id), parseInt(_profile.dataValues.profile_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#accessProfileObject()', function() {
    var rb = new DcRbac({logging: false});
  
    it('should be get object profile access', function(done) {
      rb
        .accessProfileObject(parseInt(_profile.dataValues.profile_id), parseInt(_object.dataValues.object_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getProfileById()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a profile by id', function(done) {
      rb
        .getProfileById(_profile.profile_id, true)
        .then(function(res){
          assert.equal(true, res.profile_id === _profile.profile_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getRolesForProfile()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a roles for a profile', function(done) {
      rb
        .getRolesForProfile(_profile.profile_id)
        .then(function(res){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#removeRoleProfile()', function() {
    var rb = new DcRbac({logging: false});

    it('should be remove role to a profile', function(done) {
      rb
        .removeRoleProfile(parseInt(_role.dataValues.role_id), parseInt(_profile.dataValues.profile_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#addRoleProfile()', function() {
    var rb = new DcRbac({logging: false});

    it('should be add role to a profile', function(done) {
      rb
        .addRoleProfile(parseInt(_role.dataValues.role_id), parseInt(_profile.dataValues.profile_id))
        .then(function(){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });  

  describe('#getUsers()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get list of users', function(done) {
      rb
        .getUsers()
        .then(function(res){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getUserById()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a user by id', function(done) {
      rb
        .getUserById(_user.user_id, true)
        .then(function(res){
          assert.equal(true, res.user_id === _user.user_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getUserByUsernameOrEmail()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a user by username', function(done) {
      rb
        .getUserByUsernameOrEmail(_user.username)
        .then(function(res){
          assert.equal(true, res.user_id === _user.user_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getUserByUsernameOrEmail()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get a user by email', function(done) {
      rb
        .getUserByUsernameOrEmail(_user.email)
        .then(function(res){
          assert.equal(true, res.user_id === _user.user_id);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getObjectsForUser()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get the objects for a user', function(done) {
      rb
        .getObjectsForUser(_user.dataValues.user_id)
        .then(function(res){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  describe('#getObjectsForRole()', function() {
    var rb = new DcRbac({logging: false});

    it('should be get the objects for a role', function(done) {
      rb
        .getObjectsForRole(_role.dataValues.role_id)
        .then(function(res){
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
  
});