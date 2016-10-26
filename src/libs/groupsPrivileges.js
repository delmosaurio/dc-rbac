'use strict';

import Q from 'q';
import utils from '../utils';
import Auto_groupsPrivileges from './groupsPrivileges.auto.js';

/**
 * Contiene los metodos necesarios para trabajar
 * con la tabla apps.
 */
export default class GroupsPrivileges extends Auto_groupsPrivileges{
  constructor(owner){
    super(owner);
  }
}