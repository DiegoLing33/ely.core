import URLRequest, { IURLRequestOptions, TURLCallback } from "./URLRequest";
/**
 * Опции {@link SendJsonRequest}
 */
export interface ISendJsonRequestOptions extends IURLRequestOptions {
    object?: any;
}
/**
 * SendJsonRequest позволяет передавать JSON данные через POST запрос.
 *
 * JSON данные передаются в теле запроса. Отправка данных производится методом POST.
 *
 * Заголовки:
 * - Content-type: application/json; charset=utf-8
 *
 * @class SendJsonRequest
 * @augments {URLRequest}
 */
export default class SendJsonRequest extends URLRequest {
    /**
     * Выполняет отправку JSON данных
     *
     * @param {string} url - адрес
     * @param {*} object - объект для передачи
     * @param {TURLCallback} callback - обработчик результата
     */
    static send(url: string, object: any, callback?: TURLCallback): void;
    /**
     * @ignore
     */
    protected __object: any;
    /**
     * Конструктор
     * @param {ISendJsonRequestOptions} options
     */
    constructor(options: ISendJsonRequestOptions);
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     */
    send(callback?: TURLCallback): void;
    /**
     * Устаналивает объект для передачи
     * @param {*} obj
     * @return {this}
     */
    setObject(obj: any): SendJsonRequest;
    /**
     * Возвращает объект для передачи
     * @return {*}
     */
    getObject(): any;
}
/**
 * @typedef {Object} ISendJsonRequestOptions
 * @property {string} url
 * @property {boolean} [async]
 * @property {*} [data]
 * @property {*} [object]
 */
