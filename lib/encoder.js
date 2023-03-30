import * as crypto from 'crypto'

const kuPublicKey = process.env.KU_PUBLIC_KEY.replace(/\n/gm, '\n');

export function encodeString(text) {

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    );
  };