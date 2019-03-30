"use strict";
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Файл: encrypt.ts                                                     +
 + Файл создан: 23.11.2018 23:03:37                                           +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
Object.defineProperty(exports, "__esModule", { value: true });
class Encrypt {
    /**
     * Кодирует строку ключем или общим ключем Encrypt.sharedKey
     *
     * @param str
     * @param decodeKey
     */
    static encodeString(str, decodeKey) {
        decodeKey = decodeKey || Encrypt.sharedKey;
        let enc = "";
        for (let i = 0; i < str.length; i++) {
            const a = str.charCodeAt(i);
            const b = a ^ decodeKey.charAt(i % decodeKey.length);
            enc = enc + String.fromCharCode(b);
        }
        return Encrypt.b64EncodeUnicode(enc);
    }
    /**
     * Декодирует строку ключем или общим ключем Encrypt.sharedKey
     *
     * @param str
     * @param decodeKey
     */
    static decodeString(str, decodeKey) {
        decodeKey = decodeKey || Encrypt.sharedKey;
        const decode = Encrypt.b64DecodeUnicode(str);
        if (decode === null)
            return null;
        str = decode;
        // str = Encrypt.b64DecodeUnicode(str);
        let dec = "";
        for (let i = 0; i < str.length; i++) {
            const a = str.charCodeAt(i);
            const b = a ^ decodeKey.charAt(i % decodeKey.length);
            dec = dec + String.fromCharCode(b);
        }
        return dec;
    }
    /**
     * Кодирует строку в base64
     * @param str
     */
    static b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            // @ts-ignore
            return String.fromCharCode("0x" + p1);
        }));
    }
    /**
     * Декодирует base64 строку или возвращает null при неудаче
     * @param str
     */
    static b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        try {
            return decodeURIComponent(atob(str).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
        }
        catch (e) {
            return null;
        }
    }
}
/**
 * Ключ шифрования общего назначения.
 *
 * Ключ используется как стандартное значение для Encrypt.encodeString
 */
Encrypt.sharedKey = "el292ySHa28r5edK5ey2XX2ToEn6cr22e4qyp5t";
exports.default = Encrypt;
