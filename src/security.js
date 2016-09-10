'use strict';

import {MCrypt} from 'mcrypt';
import base58 from 'bs58';
import crypto from 'crypto';

/**
 * Clase con utilidades de Criptografia
 *
 * Algoritmo utilizado [blowfish]
 */
export default class Security {
  /**
   * Crea una nueva instancia de Cipher con opciones:
   *   salt -- private salt
   *    
   * @param  {Object} ops Opciones
   * @return {[type]}     [description]
   */
  constructor(ops){
    ops = ops || {};
    if (!ops.secret){
      throw new Error(`Unknown secret`);
    }
    this.key = ops.secret;
    
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

  /**
   * Compone un token aleatoreo
   * 
   * @param  {Integer} randomBytes Cantidad de bytes
   * @return {String}              Token
   */
  randomToken(randomBytes) {
    randomBytes = randomBytes || 16;
    var buf = crypto.randomBytes(randomBytes);

    return base58.encode(buf);
  }

  /**
   * Compone un token de 6 bytes
   * 
   * @return {String}   Token
   */
  randomCode() {
    return this.randomToken(6);
  }
}