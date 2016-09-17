'use strict';

import Q from 'q';
import utils from '../utils';

export default (owner) => {
    /**
   * Registra una nueva aplicación.
   *
   * Veasé Modelo RBAC applications
   * 
   * @param {Object} object Objecto con información de la app
   * @promise {Object}     Q.promise
   */
  owner.registerApp = (obj) => {
    return utils.executeModel(
      owner.sequelize,
      owner.models.apps,
      'create',
      [obj]
    );
  }
}