'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_userScopes from './userScopes.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla.
 */
export default class UserScopes extends Auto_userScopes {
  constructor(owner){
    super(owner);
  }
}