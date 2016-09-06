'use strict';

import {MCrypt} from 'mcrypt';

export default class Cipher {
  constructor(ops){
    ops = ops || {};
    if (!ops.salt){
      throw new Error(`Unknown salt`);
    }
    this.key = ops.salt;
    
  }

  encrypt(text){
    return this.privateEncrypt(text, this.key);
  }

  privateEncrypt(text, key){
    let blowfish = new MCrypt('blowfish', 'cfb');
    //let iv = blowfish.generateIv();
    blowfish.validateKeySize(false);
    blowfish.open(key);
    
    var ciphertext = blowfish.encrypt(text);
    var res = ciphertext.toString('base64')

    return res.toString('base64');
  }

  radomSalt(){
    var theThing = new Date().valueOf().toString();
    theThing += Math.random().toString();
    return this.encrypt(theThing);
  }

  composePassword(plainTextPassword, salt){
    let hashedPassword = this.encrypt(plainTextPassword);
    let pwd = salt+hashedPassword;
    return this.encrypt(pwd);
  }
}