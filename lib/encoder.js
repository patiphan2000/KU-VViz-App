import * as crypto from 'crypto'


export function encodeString(text) {
    
    const kuPublicKey = process.env.NEXT_PUBLIC_KU_PUBLIC_KEY.replace(/\n/gm, '\n');
    // if (!kuPublicKey) { kuPublicKey = ''; }

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    );
  };