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
 * Файл: AppURLRequest.ts                                                     *
 * Файл изменен: 03.04.2019 22:37:18                                          *
 *                                                                            *
 ******************************************************************************/
import * as http from "http";
import * as https from "https";
import Observable from "../observable/Observable";
import Guard from "../utils/Guard";
import {
    ITRequestData, TURLCallback,
    TURLProgressChangedCallback,
    URLRequestHeaderName,
    URLRequestMethod,
} from "../web/request/URLRequest";

/**
 * Опции запроса
 */
export interface IAppURLRequestOptions {
    url: string;
    method?: URLRequestMethod;
    https?: boolean;
    data?: ITRequestData;
    json?: boolean;
}

/**
 * Запрос
 * @class AppURLRequest
 */
export default class AppURLRequest extends Observable {

    /**
     * Данные последнего ответа
     */
    public lastResponseData: any = null;

    /**
     * @ignore
     */
    protected readonly __data: ITRequestData;

    /**
     * Свойство: URL адрес
     * @ignore
     * @protected
     */
    protected __url: string;

    /**
     * Свойство: метод запроса
     * @ignore
     * @protected
     */
    protected __method: URLRequestMethod;

    /**
     * Свойство: https протокол
     * @ignore
     * @protected
     */
    protected __isHttps: boolean;

    /**
     * Свойство: заголовки
     * @ignore
     * @protected
     */
    protected __headers: any = {};

    /**
     * JSON ответ
     * @ignore
     * @protected
     */
    protected __json: boolean = false;

    /**
     * Конструктор
     * @param options
     */
    public constructor(options: IAppURLRequestOptions) {
        super();
        this.__url = options.url;
        this.__method = options.method || URLRequestMethod.GET;
        this.__isHttps = options.https || false;
        this.__data = options.data || {};
        this.__json = options.json || false;
    }

    /**
     * Добавляет наблюдатель: изменение прогресса
     *
     * Имя обсервера: progressChanged
     *
     * @param o - наблюдатель
     */
    public addProgressChangedObserver(o: TURLProgressChangedCallback): AppURLRequest {
        this.addObserver("progressChanged", o);
        return this;
    }

    /**
     * Добавляет наблюдатель: завершения выполнения запроса
     *
     * Имя обсервера: ready
     *
     * @param {function(response: any, result: boolean)} o - наблюдатель
     */
    public addReadyObserver(o: TURLCallback): AppURLRequest {
        this.addObserver("ready", o);
        return this;
    }

    /**
     * Отправляет запрос
     * @return {Promise<string|*>}
     */
    public async send(): Promise<string | any> {
        const lib = this.isHttps() ? https : http;
        const opts: any = this.__headers;
        opts.method = this.method();

        return new Promise<string>((resolve, reject) => {
            if (this.method() === URLRequestMethod.GET) {
                const req = lib.get(this.url() + "?" + this.__getParametersString(), opts, res => {
                    this.lastResponseData = res;
                    let data = "";
                    res.on("data", chunk => data += chunk);
                    res.on("end", () => {
                        if (this.__json) data = Guard.safeJsonParse(data);
                        this.notify("ready", data, true);
                        resolve(data);
                    });
                    res.on("error", (e) => {
                        this.notify("ready", null, false);
                        reject("Error: " + e.message);
                    });
                });
            } else {
                const req = lib.request(this.url(), opts, res => {
                    this.lastResponseData = res;
                    let data = "";
                    res.on("data", chunk => data += chunk);
                    res.on("end", () => {
                        if (this.__json) data = Guard.safeJsonParse(data);
                        this.notify("ready", data, true);
                        resolve(data);
                    });
                    res.on("error", (e) => {
                        this.notify("ready", null, false);
                        reject("Error: " + e.message);
                    });
                });
                req.write(this.__getParametersString());
                req.end();
            }
        });
    }

    /**
     * Устанавливает заголовок
     *
     * @param {string|URLRequestHeaderName} name - имя заголовка
     * @param {string} value - значение заголовка
     * @return {this}
     */
    public setHeader(name: string | URLRequestHeaderName, value: string): AppURLRequest {
        this.__headers[name] = value;
        return this;
    }

    /**
     * Возвращает заголовки
     * @return {*}
     */
    public getHeaders(): { [name: string]: any } {
        return this.__headers;
    }

    /**
     * Возвращает URL адрес
     * @return {string}
     */
    public url(): string {
        return this.__url;
    }

    /**
     * Возвращает метод запроса
     * @return {URLRequestMethod}
     */
    public method(): URLRequestMethod {
        return this.__method;
    }

    /**
     * Возвращает https протокол
     * @return {boolean}
     */
    public isHttps(): boolean {
        return this.__isHttps || this.url().includes("https://");
    }

    /**
     * Возвращает данные запроса
     * @return {*}
     */
    public getData(): ITRequestData {
        return this.__data;
    }

    /**
     * Возвращает строку параметров
     * @private
     */
    protected __getParametersString(): string {
        return Object
            .keys(this.getData())
            .map((key) => {
                return key + "=" + encodeURIComponent(this.getData()[key]);
            })
            .join("&");
    }
}

/**
 * @typedef {Object} IAppURLRequestOptions
 * @property {string} [url]
 * @property {URLRequestMethod} [method = GET]
 * @property {boolean} [https = false]
 * @property {boolean} [json = false]
 */
