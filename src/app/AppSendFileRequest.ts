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
 * Файл: AppSendFileRequest.ts                                                *
 * Файл изменен: 03.04.2019 23:44:56                                          *
 *                                                                            *
 ******************************************************************************/
import {IURLRequestOptions, URLRequestHeaderName, URLRequestMethod} from "../web/request/URLRequest";
import AppURLRequest from "./AppURLRequest";

/**
 * Опции {@link SendFileRequest}
 */
export interface ISendFileRequestOptions extends IURLRequestOptions {
    file: string;
}

/**
 * Оправка файла
 * @class AppSendFileRequest
 */
export default class AppSendFileRequest extends AppURLRequest {

    /**
     * @ignore
     */
    protected __file: string;

    /**
     * Конструктор
     * @param {ISendFileRequestOptions} options
     */
    public constructor(options: ISendFileRequestOptions) {
        super(options);
        this.__file = options.file;
    }

    /**
     * Отправляет файлы
     * @deprecated In progress
     */
    public async send(): Promise<string | any> {
        return new Promise<string | any>((resolve, reject) => {
            reject("Not working yet.");
        });
    }

    /**
     * Добавляет файлы
     * @param {string} file - файл
     * @return AppSendFileRequest
     */
    public setFile(file: string): AppSendFileRequest {
        this.__file = file;
        return this;
    }

    /**
     * Возвращает файл
     * @return {string}
     */
    public getFile(): string {
        return this.__file;
    }
}
