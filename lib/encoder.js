// import * as crypto from 'crypto'


export function encodeString(text) {

    const crypto = require('crypto');
    
    const kuPublicKey = process.env.NEXT_PUBLIC_KU_PUBLIC_KEY.replace(/\n/gm, '\n').replaceAll('"', '');
    // if (!kuPublicKey) { kuPublicKey = ''; }

    console.log("dio!!");
    console.log(kuPublicKey);
    console.log("--------------------------------");
    console.log(crypto);

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    );
  };