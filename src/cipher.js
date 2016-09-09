'use strict';

import {MCrypt} from 'mcrypt';

/**
 * Clase con utilidades de Criptografia
 *
 * Algoritmo utilizado [blowfish]
 */
export default class Cipher {
  /**
   * Crea una nueva instancia de Cipher con opciones:
   *   salt -- private salt
   *    
   * @param  {Object} ops Opciones
   * @return {[type]}     [description]
   */
  constructor(ops){
    ops = ops || {};
    if (!ops.salt){
      throw new Error(`Unknown salt`);
    }
    this.key = ops.salt;
    
  }

  /**
   * Encripta `text`
   * @param  {String} text Texto a encriptar
   * @return {String} text encriptado 
   */
  encrypt(text){
    return this.privateEncrypt(text, this.key);
  }

  /**
   * Encripta `text` utilizando una `key` privada
   * @param  {String} text Texto a encriptar
   * @param  {String} key  Key privada
   * @return {String}      text encriptado con key
   */
  privateEncrypt(text, key){
    let blowfish = new MCrypt('blowfish', 'cfb');
    //let iv = blowfish.generateIv();
    blowfish.validateKeySize(false);
    blowfish.open(key);
    
    var ciphertext = blowfish.encrypt(text);
    var res = ciphertext.toString('base64')

    return res.toString('base64');
  }

  /**
   * Devuelve un salt aleatorio
   * 
   * @return {String}
   */
  radomSalt(){
    var theThing = new Date().valueOf().toString();
    theThing += Math.random().toString();
    return this.encrypt(theThing);
  }

  /**
   * Compone una contraseña
   * 
   * @param  {String} plainTextPassword 
   * @param  {String} salt              
   * @return {String}                   
   */
  composePassword(plainTextPassword, salt){
    let hashedPassword = this.encrypt(plainTextPassword);
    let pwd = salt+hashedPassword;
    return this.encrypt(pwd);
  }
}