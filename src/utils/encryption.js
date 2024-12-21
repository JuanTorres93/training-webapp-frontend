import CryptoJS from 'crypto-js';

// Función para desencriptar datos sensibles
export function decryptFromBackend(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ProcessingInstruction.env.REACT_APP_SECRET_FOR_FRONTEND);
    return bytes.toString(CryptoJS.enc.Utf8);
};
