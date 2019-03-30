import URLRequest, { IURLRequestOptions, TURLCallback } from "./URLRequest";
/**
 * Опции {@link SendFileRequest}
 */
export interface ISendFileRequestOptions extends IURLRequestOptions {
    files?: File[];
}
/**
 * Запрос отправки файла
 * @class SendFileRequest
 * @augments {URLRequest}
 */
export default class SendFileRequest extends URLRequest {
    /**
     * Выполняет отправку файлов
     *
     * @param {string} url - адрес
     * @param {*} files - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     * @return SendFileRequest
     */
    static send(url: string, files: File[], callback?: TURLCallback): void;
    /**
     * @ignore
     */
    protected readonly __files: File[];
    /**
     * Конструктор
     * @param {ISendFileRequestOptions} options
     */
    constructor(options: ISendFileRequestOptions);
    /**
     * Выполняет запрос
     *
     * @param {TURLCallback} callback
     */
    send(callback?: TURLCallback): void;
    /**
     * Добавляет файлы
     * @param {...File} files - файлы
     * @return SendFileRequest
     */
    addFiles(...files: File[]): SendFileRequest;
    /**
     * Возвращает файлы
     */
    getFiles(): File[];
}
/**
 * @typedef {Object} ISendFileRequestOptions
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {File[]} [files]
 */
