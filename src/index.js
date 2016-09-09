import Cipher from './cipher';
import Q from 'q';
import Models from './models/';
import Sequelize from 'sequelize';

/**
 * La clase DcRbac encapsula los metodos necesario
 * para poder trabajar con el modelo RBAC definido
 * en la base de datos.
 *  
 */
export default class DcRbac {
  /**
   * Crea una nueva instancia de DcRbac con opciones (ops).
   *
   * Opciones:
   *  dbConfig // db opciones
   *    port     // puerto de conexión
   *    database // nombre de la base de datos
   *    user     // nombre de usuario para conexión
   *    pwd      // contraseña de conexión
   *  logging  // habilita logs 
   *  
   * @param  {Object} ops Opciones
   * @return {Object}     Nueva instancia de la clase
   */
  constructor(ops){
    ops = ops || {};
    let db = ops.dbConfig || {};
    db.database = 'rbac';
    db.user = 'postgres';
    db.port = db.port || 5432;
    db.pwd = db.pwd || '';
    let logging = ops.logging || false;

    this.salt = ops.salt || '0198273498327465';

    this.cipher = new Cipher({ salt: this.salt});
    
    this.sequelize = new Sequelize(db.database, db.user, db.pwd, {
      dialect: "postgres",
      port:    db.port,
      timestamps: false,
      logging: logging
    });

    this.models = new Models(this.sequelize, Sequelize);
  }

  /**
   * Agrega un nuevo perfil.
   *
   * Veasé Modelo RBAC [profiles]
   * 
   * @param {Object} profile Objecto con información del perfil
   * @promise {Object}     Q.promise
   */
  addProfile(profile){
    var def = Q.defer();

    var profile_name = profile.profile_name;

    var dbProfile = {
      profile_name: profile_name
    };

    this.sequelize.transaction(t => {
      return this.models.profiles
        .create(dbProfile)
        .then(p => {
          def.resolve(p);
        })
        .catch(err => {
          def.reject(err);
        });
    });

    return def.promise;
  }

  /**
   * Agrega un nuevo role.
   *
   * Veasé Modelo RBAC [roles]
   * 
   * @param {Object} role Objecto con información del role
   * @promise {Object}     Q.promise
   */
  addRole(role){
    var def = Q.defer();

    var role_name = role.role_name;

    var dbRole = {
      role_name: role_name
    };

    this.sequelize.transaction(t => {
      return this.models.roles
        .create(dbRole)
        .then(p => {
          def.resolve(p);
        })
        .catch(err => {
          def.reject(err);
        });
    });

    return def.promise;
  }

  /**
   * Agrega un nuevo object de aplicación.
   *
   * Veasé Modelo RBAC [objects]
   * 
   * @param {Object} object Objecto con información del object
   * @promise {Object}     Q.promise
   */
  addObject(obj){
    var def = Q.defer();

    var object_name = obj.object_name;

    var dbObj = {
      object_name: object_name
    };

    this.sequelize.transaction(t => {
      return this.models.objects
        .create(dbObj)
        .then(o => {
          def.resolve(o);
        })
        .catch(err => {
          def.reject(err);
        });
    });

    return def.promise;
  }

  /**
   * Agrega un nuevo usuario.
   *
   * Veasé Modelo RBAC [users]
   * 
   * @param  {Object} user Objecto con información del user
   * @promise {Object}     Q.promise
   */
  createUser(user){
    var def = Q.defer();

    let pid = user.profile_id_profiles;
    let username = user.username;
    let email = user.email;
    let password = user.password;
    let signon_type = user.signon_type || 'local';
    let first_name = user.first_name || '';
    let last_name = user.last_name || '';
    let salt = this.cipher.radomSalt();
    let pwd = this.cipher.composePassword(user.password, salt);

    var dbUser = {
      //user_id
      profile_id_profiles: user.profile_id_profiles,
      first_name: first_name,
      last_name: last_name,
      username: user.username,
      email: user.email,
      password: pwd,
      signon_type: signon_type,
      salt: salt,
      user_state: 'verifying' // need to activate
    };

    this.sequelize.transaction(t => {
      return this.models.users
        .create(dbUser)
        .then(u => {
          def.resolve(u);
        })
        .catch(err => {
          def.reject(err);
        });
    });

    return def.promise;
  }

  /**
   * Actualiza el acceso para un usuario y un objecto.
   * 
   * @param  {Integer} user_id      
   * @param  {Integer} object_id    
   * @param  {Integer} access_grant 
   * @param  {Integer} access_deny  
   * @promise {Object} Q.promise
   */
  revokeUserObject(user_id,  object_id,  access_grant,  access_deny){
    return this.executeFn(
      'fn_revoke_user_object',
      { 
        user_id: user_id,
        object_id: object_id,
        access_grant: access_grant,
        access_deny: access_deny
      }
    );
  }

  /**
   * Elimina la relación entre un usuario dado y un objeto.
   * 
   * @param  {[type]} user_id   
   * @param  {[type]} object_id 
   * @promise {Object}     Q.promise
   */
  unlinkUserObject(user_id,  object_id){
    return this.executeFn(
      'fn_unlink_user_object',
      { 
        user_id: user_id,
        object_id: object_id
      }
    );
  }

  /**
   * Actualiza (insert/update) el acceso para un role y un objecto.
   * 
   * @param  {Integer} role_id      
   * @param  {Integer} object_id    
   * @param  {Integer} access_grant 
   * @param  {Integer} access_deny  
   * @promise {Object} Q.promise
   */
  revokeRoleObject(role_id,  object_id,  access_grant,  access_deny){
    return this.executeFn(
      'fn_revoke_role_object',
      { 
        role_id: role_id,
        object_id: object_id,
        access_grant: access_grant,
        access_deny: access_deny
      }
    );
  }

  /**
   * Elimina la relación entre un role dado y un objeto.
   * 
   * @param  {Integer} role_id   
   * @param  {Integer} object_id 
   * @promise {Object} Q.promise
   */
  unlinkRoleObject(role_id,  object_id){
    return this.executeFn(
      'fn_unlink_role_object',
      { 
        role_id: role_id,
        object_id: object_id
      }
    );
  }

  /**
   * Obtiene el tipo de acceso que posee un role para un objecto dado.
   * (OR access_grant) AND (OR access_deny)
   * 
   * @param  {Integer} role_id   
   * @param  {Integer} object_id 
   * @promise {Object} Q.promise
   */
  accessRoleObject(role_id,  object_id){
    return this.executeFn(
      'fn_access_role_object',
      { 
        role_id: role_id,
        object_id: object_id
      }
    );
  }

  /**
   * Obtiene el tipo de acceso que posee un usuario para un objecto dado.
   * 
   * @param  {Integer} user_id   
   * @param  {Integer} object_id 
   * @promise {Object} Q.promise
   */
  accessUserObject(user_id,  object_id){
    return this.executeFn(
      'fn_access_user_object',
      { 
        user_id: user_id,
        object_id: object_id
      }
    );
  }

  /**
   * Obtiene el tipo de acceso que posee un perfil para un objecto dado.
   * 
   * @param  {Integer} profile_id   
   * @param  {Integer} object_id 
   * @promise {Object} Q.promise
   */
  accessProfileObject(profile_id,  object_id){
    return this.executeFn(
      'fn_access_profile_object',
      { 
        profile_id: profile_id,
        object_id: object_id
      }
    );
  }

  /**
   * Relaciona un role a un perfile.
   * 
   * @param {Integer} role_id    
   * @param {Integer} profile_id 
   * @promise {Object} Q.promise
   */
  addRoleProfile(role_id, profile_id){
    return this.executeFn(
      'fn_add_role_profile',
      { 
        role_id: role_id,
        profile_id: profile_id
      }
    );
  }
  
   /**
   * Elimina la relación para role a un perfile.
   * 
   * @param {Integer} role_id    
   * @param {Integer} profile_id 
   * @promise {Object} Q.promise
   */
  removeRoleProfile(role_id, profile_id){
    return this.executeFn(
      'fn_remove_role_profile',
      { 
        role_id: role_id,
        profile_id: profile_id
      }
    );
  }

  /**
   * Obtiene lista de usuario.
   * 
   * @promise {Object} Q.promise
   */
  getUsers(){
    var query = 'SELECT * FROM public.v_users';
    var def = Q.defer();

    this
      .executeSelect(query)
      .then(res => {
        var result = res.map(u => {
          return this.mapUserPublic(u);
        });
        def.resolve(result);
      })
      .catch(err => {
        def.reject(err);
      });

    return def.promise;
  }

  /**
   * Obtiene un un usuario por id.
   * 
   * @param  {Integer} userId   
   * @param  {Boolean} populate Define si se debe obtener el perfil
   * @promise {Object} Q.promise
   */
  getUserById(userId, populate){
    var def = Q.defer();
    this
    .models.users
    .findOne({ where: {user_id: userId} })
    .then(res => {
      if (!res || !res.dataValues){
        def.resolve(null);
      }
      var u = this.mapUserPublic(res.dataValues);
      if (!populate){
        def.resolve(u);
      } else {
        this
          .getProfileById(u.profile_id_profiles)
          .then(p => {
            u.profile = p;
            def.resolve(u);
          })
          .catch(e => {
            def.reject(e);
          })
      }
    })
    .catch(err => {
      def.reject(err);
    });

    return def.promise;
  }

  /**
   * Obtiene un usuario por username o email
   * @param  {[type]} username username o email
   * @param  {Boolean} populate Define si se debe obtener el perfil
   * @promise {Object} Q.promise
   */
  getUserByUsernameOrEmail(username, populate){
    var def = Q.defer();
    this
    .models.users
    .findOne({ where: { $or:  [{username: username}, {email: username}] }})
    .then(res => {
      if (!res || !res.dataValues){
        def.resolve(null);
      }
      var u = this.mapUserPublic(res.dataValues);
      if (!populate){
        def.resolve(u);
      } else {
        this
          .getProfileById(u.profile_id_profiles)
          .then(p => {
            u.profile = p;
            def.resolve(u);
          })
          .catch(e => {
            def.reject(e);
          })
      }
    })
    .catch(err => {
      def.reject(err);
    });

    return def.promise;
  }

  /**
   * Obtiene un profile por id
   * 
   * @param  {Integer} profileId 
   * @param  {Boolean} populate Define si se debe obtener lso roles
   * @promise {Object} Q.promise
   */
  getProfileById(profileId, populate){
    var def = Q.defer();
    this
    .models.profiles
    .findOne({ where: {profile_id: profileId} })
    .then(res => {
      if (!res || !res.dataValues){
        def.resolve(null);
      }
      if (!populate){
        def.resolve(res.dataValues);
      } else {
        var p = res.dataValues;
        this
          .getRolesForProfile(profileId)
          .then(roles => {
            p.roles = roles;
            def.resolve(p);
          })
          .catch(e => {
            def.reject(e);
          })
      }
    })
    .catch(err => {
      def.reject(err);
    });

    return def.promise;
  }

  /**
   * Obtiene los roles para un perfil por id
   * 
   * @param  {Integer} profileId
   * @promise {Object} Q.promise
   */
  getRolesForProfile(profileId){
    var query = 'SELECT * FROM public.v_profiles_roles WHERE profile_id = :profile_id';
    var def = Q.defer();

    this
      .executeSelect(query, {profile_id: profileId})
      .then(res => {
        def.resolve(res);
      })
      .catch(err => {
        def.reject(err);
      });

    return def.promise;
  }

  /**
   * Obtiene todas la relaciones con objetos para un usuario
   * 
   * @param  {Integer} userId
   * @promise {Object} Q.promise
   */
  getObjectsForUser(userId){
    var query = 'SELECT * FROM public.v_user_objects WHERE user_id = :user_id';
    var def = Q.defer();

    this
      .executeSelect(query, {user_id: userId})
      .then(res => {
        def.resolve(res);
      })
      .catch(err => {
        def.reject(err);
      });

    return def.promise;
  }

  /**
   * Obtiene todas la relaciones con objetos para un role
   * 
   * @param  {Integer} roleId
   * @promise {Object} Q.promise
   */
  getObjectsForRole(roleId){
    var query = 'SELECT * FROM public.v_roles_objects WHERE role_id = :role_id';
    var def = Q.defer();

    this
      .executeSelect(query, {role_id: roleId})
      .then(res => {
        def.resolve(res);
      })
      .catch(err => {
        def.reject(err);
      });

    return def.promise;
  }

  //
  // PRIVATE
  // 
  
  /**
   * Mapea propiedades visibles de un usuario.
   * 
   * @param  {Object} u Usuario
   * @return {Object}   Usuario
   * @private
   */
  mapUserPublic(u){
    delete u.password;
    delete u.salt;
    u.profile = { profile_id: u.profile_id_profiles };
    return u;
  }

  /**
   * Ejecuta una función de la base de datos.
   * 
   * @param  {String} fn       Nombre de la función
   * @param  {Object}   params Parametros
   * @promise {Object} Q.promise
   * @private
   */
  executeFn(fn, params){
    var def = Q.defer();

    var replacements = Object.keys(params).map(p => {
      return `:${p}`;
    });
    var rstr = replacements.join(',');

    this.sequelize
      .query(`SELECT public.${fn}(${rstr}) as resul`,
        { 
          replacements: params,
          type: this.sequelize.QueryTypes.SELECT
        }
      )
      .then(function(res) {
        var result = null;
        if (res.length > 0){
          result = res[0].result;
        }
        def.resolve(result);
      })
      .catch(function(err){
        def.reject(err);
      });

    return def.promise;
  }

  /**
   * Ejecuta una query en forma de select en la base de datos.
   * 
   * @param  {String} query Query
   * @param  {Object} params Parametros
   * @promise {Object} Q.promise
   * @private
   */
  executeSelect(query, replacements){
    var def = Q.defer();

    this.sequelize
      .query(query,
        { 
          replacements: replacements,
          type: this.sequelize.QueryTypes.SELECT
        }
      )
      .then(res => {
        def.resolve(res);
      })
      .catch(function(err){
        def.reject(err);
      });

    return def.promise;
  }
}
