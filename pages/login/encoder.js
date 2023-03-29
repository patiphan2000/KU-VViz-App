import * as crypto from 'crypto'

const kuPublicKey = process.env.KU_PUBLIC_KEY;
// const kuPublicKey = process.env.KU_PUBLIC_KEY.replace(/\n/gm, '\n');

// const crypto = require('crypto');

export function encodeString(text) {

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    ).toString("base64")
  };