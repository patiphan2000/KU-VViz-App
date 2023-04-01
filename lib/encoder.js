import * as crypto from 'crypto'


export function encodeString(text) {
    
    var kuPublicKey = process.env.KU_PUBLIC_KEY.replace(/\n/gm, '\n');
    if (!kuPublicKey) { kuPublicKey = ''; }

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    ).toString("base64");
  };