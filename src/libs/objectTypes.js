'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_objectTypes from './objectTypes.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla.
 */
export default class ObjectTypes extends Auto_objectTypes{
  constructor(owner){
    super(owner);
  }
}