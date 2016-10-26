'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_scopes from './scopes.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class Scopes extends Auto_scopes{
  constructor(owner){
    super(owner);
  }
}