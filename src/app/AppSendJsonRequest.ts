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
 * Файл: AppSendJsonRequest.ts                                                *
 * Файл изменен: 03.04.2019 23:33:11                                          *
 *                                                                            *
 ******************************************************************************/

import * as http from "http";
import * as https from "https";
import Guard from "../utils/Guard";
import {ISendJsonRequestOptions} from "../web/request/SendJsonRequest";
import {URLRequestMethod} from "../web/request/URLRequest";
import AppURLRequest from "./AppURLRequest";

/**
 * Отправка данных JSON
 * @class AppSendJsonRequest
 */
export default class AppSendJsonRequest extends AppURLRequest {
    /**
     * @ignore
     */
    protected __object: any;

    /**
     * Конструктор
     * @param {ISendJsonRequestOptions} options
     */
    public constructor(options: ISendJsonRequestOptions) {
        super(options);
        this.__object = options.object;
    }

    /**
     * Устаналивает объект для передачи
     * @param {*} obj
     * @return {this}
     */
    public setObject(obj: any): AppSendJsonRequest {
        this.__object = obj;
        return this;
    }

    /**
     * Возвращает объект для передачи
     * @return {*}
     */
    public getObject(): any {
        return this.__object;
    }

    /**
     * Выполняет отправку данных
     * @return {Promise<string|any>}
     */
    public async send(): Promise<string | any> {
        const lib = this.isHttps() ? https : http;
        const opts: any = this.__headers;
        opts.method = URLRequestMethod.POST;
        return new Promise<string | any>((resolve, reject) => {
            const req = lib.request(this.url() + "?" + this.__getParametersString(), opts, res => {
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
            req.write(JSON.stringify(this.getObject()));
            req.end();
        });
    }
}
