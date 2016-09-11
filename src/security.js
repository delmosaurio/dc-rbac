'use strict';

import {MCrypt} from 'mcrypt';
import base58 from 'bs58';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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
   * Genera un nuevo password y salt
   * @param  {[type]} plainTextPassword [description]
   * @return {[type]}                   [description]
   */
  generatePassword(plainTextPassword){
    var salt = bcrypt.genSaltSync(this.saltRounds);
    var hash = bcrypt.hashSync(plainTextPassword, salt);

    return {
      salt: salt,
      hash: hash
    };
  }

  /**
   * Compara contraseñas passwords
   * 
   * @param  {String} plainTextPassword 
   * @param  {String} hash hashed              
   * @return {String}                   
   */
  comparePassword(plainTextPassword, hash){
    return bcrypt.compareSync(plainTextPassword, hash);
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