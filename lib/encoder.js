import * as crypto from 'crypto'


export function encodeString(text) {
    
    const kuPublicKey = process.env.KU_PUBLIC_KEY.replace(/\n/gm, '\n');
    // if (!kuPublicKey) { kuPublicKey = ''; }

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            passphrase: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    );
  };