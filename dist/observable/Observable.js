"use strict";
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
 * Файл: Observable.ts                                                        *
 * Файл изменен: 27.02.2019 01:18:10                                          *
 *                                                                            *
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Прослушиваемый протокол
 * @class Observable
 */
class Observable {
    constructor() {
        /**
         * Слушатели
         * @protected
         * @ignore
         */
        this.observers = {};
    }
    /**
     * Добавляет наблюдатель
     * @param {String} event - событие
     * @param {Function} observer - наблюдатель
     */
    addObserver(event, observer) {
        if (!this.observers.hasOwnProperty(event))
            this.observers[event] = [];
        this.observers[event].push(observer);
        return this;
    }
    /**
     * Удаляет обработчик
     * @param {string} event - событие
     * @param {Function} observer - обработчик
     */
    removeObserver(event, observer) {
        if (this.observers.hasOwnProperty(event)) {
            this.observers[event].splice(this.observers[event].indexOf(observer), 1);
        }
        return this;
    }
    /**
     * Удаляет все обработчики события или событий
     * @param {String} [event] - Событие
     */
    removeAllObservers(event) {
        if (event !== undefined) {
            if (this.observers.hasOwnProperty(event)) {
                this.observers[event] = [];
            }
        }
        else {
            this.observers = {};
        }
        return this;
    }
    /**
     * Оповещает всех наблюдателей о совершении события
     *
     * @param {string} event - событие
     * @param {...*} args - аргументы события
     */
    notify(event, ...args) {
        if (event in this.observers)
            this.observers[event].forEach((func) => func.apply(this, args || []));
        return this;
    }
    /**
     * Сообщает о событие всем наблюдателям
     * @param {String} event - событие
     * @param {*[]} args - массив аргументов
     *
     * @deprecated {@link Observable.notify}
     */
    notificate(event, args) {
        if (this.observers.hasOwnProperty(event)) {
            for (const observer of this.observers[event])
                observer.apply(this, args);
        }
    }
}
exports.default = Observable;
