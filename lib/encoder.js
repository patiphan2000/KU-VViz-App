import * as crypto from 'crypto'


export function encodeString(text) {

    console.log(Buffer.from(text, 'utf8'));
    
    const kuPublicKey = process.env.NEXT_PUBLIC_KU_PUBLIC_KEY.replace(/\n/gm, '\n').replace('"', '');
    // if (!kuPublicKey) { kuPublicKey = ''; }

    console.log("dio!!");
    console.log(kuPublicKey);
    console.log("--------------------------------");
    const publickKeyObject = crypto.createPublicKey(kuPublicKey);
    console.log(publickKeyObject);

    return crypto.publicEncrypt(
        {
            key: kuPublicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
        },
        Buffer.from(text, 'utf8')
    );
  };