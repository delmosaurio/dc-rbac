'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_groupScopes from './groupScopes.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla.
 */
export default class GroupScopes extends Auto_groupScopes{
  constructor(owner){
    super(owner);
  }
}