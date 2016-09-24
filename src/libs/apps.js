'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_apps from './apps.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class Apps extends Auto_apps{
  constructor(owner){
    super(owner.sequelize, owner.models);
    this.sequelize = sequelize;
    this.models = models;
  }
}