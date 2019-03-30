/******************************************************************************
 *                                                                            *
 * ,--. o                   |    o                                            *
 * |   |.,---.,---.,---.    |    .,---.,---.                                  *
 * |   |||---'|   ||   |    |    ||   ||   |                                  *
 * `--' ``---'`---|`---'    `---'``   '`---|                                  *
 *            `---'                    `---'                                  *
 *                                                                            *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          *
 * Mail: <diegoling33@gmail.com>                                              *
 *                                                                            *
 * Это программное обеспечение имеет лицензию, как это сказано в файле        *
 * COPYING, который Вы должны были получить в рамках распространения ПО.      *
 *                                                                            *
 * Использование, изменение, копирование, распространение, обмен/продажа      *
 * могут выполняться исключительно в согласии с условиями файла COPYING.      *
 *                                                                            *
 * Проект: ely.core                                                           *
 *                                                                            *
 * Файл: URLRequest.ts                                                        *
 * Файл изменен: 27.02.2019 03:07:17                                          *
 *                                                                            *
 ******************************************************************************/
import Observable from "../../observable/Observable";
/**
 * Тип возвращаемого ответа
 */
export declare type TURLCallback = (response: any, result: boolean) => void;
/**
 * Прогресс выполнения запроса изменен
 */
export declare type TURLProgressChangedCallback = (loadedBytes: number, totalBytes: number) => void;
/**
 * Методы передачи параметров
 * @enum
 */
export declare enum URLRequestMethod {
    GET = "GET",
    POST = "POST"
}
/**
 * Названия заголовков запроса
 * @enum
 */
export declare enum URLRequestHeaderName {
    contentType = "Content-type"
}
/**
 * Данные запроса
 */
export interface ITRequestData {
    [name: string]: any;
}
/**
 * Опции {@link URLRequest}
 */
export interface IURLRequestOptions {
    url: string;
    method?: URLRequestMethod;
    async?: boolean;
    data?: ITRequestData;
}
/**
 * URL запрос
 * @class URLRequest
 * @augments {Observable}
 */
export default class URLRequest extends Observable {
    /**
     * Отправляет GET запрос
     *
     * @param {string} url
     * @param {* | TURLCallback} data
     * @param {TURLCallback} callback
     */
    static sendGET(url: string, data?: any | TURLCallback, callback?: TURLCallback): void;
    /**
     * @ignore
     */
    protected readonly __url: string;
    /**
     * @ignore
     */
    protected readonly __data: ITRequestData;
    /**
     * @ignore
     */
    protected readonly __xhr: XMLHttpRequest;
    /**
     * @ignore
     */
    protected __method: URLRequestMethod;
    /**
     * @ignore
     */
    protected __async: boolean;
    /**
     * Конструктор
     * @param options
     */
    constructor(options: IURLRequestOptions);
    /**
     * Возвращает URL запроса
     * @return {string}
     */
    getURL(): string;
    /**
     * Возвращает данные запроса
     * @return {*}
     */
    getData(): ITRequestData;
    /**
     * Возвращает true, если запрос асинхронный
     * @return {boolean}
     */
    isAsync(): boolean;
    /**
     * Возвращает метод
     * @return URLRequestMethod
     */
    getMethod(): URLRequestMethod;
    /**
     * Устанавливает данные
     * @param name
     * @param value
     */
    setData(name: string, value: any): URLRequest;
    /**
     * Выполняет запрос
     * @param {TURLCallback} callback
     * @return URLRequest
     */
    send(callback?: TURLCallback): void;
    /**
     * Устанавливает заголовок
     *
     * @param {string|URLRequestHeaderName} name - имя заголовка
     * @param {string} value - значение заголовка
     * @return {this}
     */
    setHeader(name: string | URLRequestHeaderName, value: string): URLRequest;
    /**
     * Возвращает ядро запроса
     * @return {XMLHttpRequest}
     */
    getXMLHttpRequest(): XMLHttpRequest;
    /**
     * Добавляет наблюдатель: изменение прогресса
     *
     * Имя обсервера: progressChanged
     *
     * @param o - наблюдатель
     */
    addProgressChangedObserver(o: TURLProgressChangedCallback): URLRequest;
    /**
     * Добавляет наблюдатель: завершения выполнения запроса
     *
     * Имя обсервера: ready
     *
     * @param o - наблюдатель
     */
    addReadyObserver(o: TURLCallback): URLRequest;
    /**
     * Возвращает строку параметров
     * @private
     */
    protected __getParametersString(): string;
    protected __prepareXMLHttpRequestCore(callback?: TURLCallback): void;
}
/**
 * @typedef {Object} IURLRequestOptions
 * @property {string} url
 * @property {URLRequestMethod} [method]
 * @property {boolean} [async]
 * @property {*} data
 */
/**
 * Прогресс изменен
 * @callback TURLProgressChangedCallback
 * @param {number} loadedBytes - отпарвлено
 * @param {number} totalBytes - необходимо отправить
 */
/**
 * Ответ запроса
 * @callback TURLCallback
 * @param {*} response - ответ
 * @param {boolean} status - статус ответа
 */
