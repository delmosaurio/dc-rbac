'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_globalScopes from './globalScopes.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla globalScopes.
 */
export default class GlobalScopes extends Auto_globalScopes{
  constructor(owner){
    super(owner);
  }
}