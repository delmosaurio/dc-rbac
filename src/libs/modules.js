'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_modules from './modules.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class Modules extends Auto_modules{
  constructor(owner){
    super(owner);
  }
}