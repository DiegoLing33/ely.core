export default class Encrypt {
    /**
     * Ключ шифрования общего назначения.
     *
     * Ключ используется как стандартное значение для Encrypt.encodeString
     */
    static sharedKey: string;
    /**
     * Кодирует строку ключем или общим ключем Encrypt.sharedKey
     *
     * @param str
     * @param decodeKey
     */
    static encodeString(str: string, decodeKey?: string): string;
    /**
     * Декодирует строку ключем или общим ключем Encrypt.sharedKey
     *
     * @param str
     * @param decodeKey
     */
    static decodeString(str: string, decodeKey?: string): string | null;
    /**
     * Кодирует строку в base64
     * @param str
     */
    static b64EncodeUnicode(str: string): string;
    /**
     * Декодирует base64 строку или возвращает null при неудаче
     * @param str
     */
    static b64DecodeUnicode(str: string): string | null;
}
