// import * as crypto from 'crypto'
import EncryptRsa from 'encrypt-rsa';

export async function encodeString(text) {

    // const crypto = require('crypto');
    
    const kuPublicKey = process.env.NEXT_PUBLIC_KU_PUBLIC_KEY.replace(/\n/gm, '\n');
    // if (!kuPublicKey) { kuPublicKey = ''; }
    
    const encryptRsa = new EncryptRsa();
    var encryptedText;
    try {
        encryptedText = encryptRsa.encryptStringWithRsaPublicKey({ 
            text: text,   
            publicKey: kuPublicKey,
        });
    }
    catch(e) {
        console.log(e)
    }

    // console.log(encryptedText);
    // console.log("--------------------------")

    // const textEncrypt =  crypto.publicEncrypt(
    //     {
    //         key: kuPublicKey,
    //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    //     },
    //     Buffer.from(text, 'utf8')
    // ).toString("base64");

    // console.log(textEncrypt);
    // console.log(ciphertext == textEncrypt);

    return encryptedText;
  };