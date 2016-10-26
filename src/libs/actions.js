'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_actions from './actions.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class Actions extends Auto_actions{
  constructor(owner){
    super(owner);
  }
}