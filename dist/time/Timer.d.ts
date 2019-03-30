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
 * Файл: Timer.ts                                                             *
 * Файл изменен: 27.02.2019 05:10:21                                          *
 *                                                                            *
 ******************************************************************************/
import Observable from "../observable/Observable";
/**
 * Опции для {@link Timer}
 */
export interface ITimerOptions {
    /**
     * Продолжительность таймера
     */
    duration: number;
    /**
     * Цикличные повторы
     */
    loop?: boolean;
}
/**
 * Таймер
 *
 * ```ts
 *
 * const timer = new Timer({duration: 10 * 1000}); // Таймер на 10 сек
 *
 * // Добавляем наблюдатель начала работы таймера
 * timer.addStartObserver( () => {
 *    console.log( "Go!" );
 * });
 *
 * // Добавляем наблюдатель окончания работы таймера
 * timer.addEndObserver( () => {
 *    console.log( "Time is up!" );
 * });
 *
 * // Запускаем таймер
 * timer.start();
 * ```
 *
 * @class {Timer}
 * @augments {Observable}
 */
export default class Timer extends Observable {
    /**
     * Время таймера
     * @type {number}
     * @ignore
     * @protected
     */
    protected __duration: number;
    /**
     * Циклический таймер
     * @type {boolean}
     * @ignore
     * @protected
     */
    protected readonly __loop: boolean;
    /**
     * Поток
     * @ignore
     * @protected
     */
    protected __thread: any;
    /**
     * Конструктор
     * @param {{ duration: number, loop: boolean | undefined }} props - свойства
     */
    constructor(props: ITimerOptions);
    /**
     * Добавляет наблюдатель: окончание таймера
     *
     * Если таймер циклический, данный метод будет вызван каждый цикл
     *
     * Имя обсервера: addEndObserver
     *
     * @param {function} o - наблюдатель
     */
    addEndObserver(o: () => void): Timer;
    /**
     * Добавляет наблюдатель: запускт таймера
     *
     * Имя обсервера: startTimer
     *
     * @param {function} o - наблюдатель
     */
    addStartObserver(o: () => void): Timer;
    /**
     * Запускает таймер
     */
    start(): void;
    /**
     * Перезапускает таймер
     */
    restart(): void;
    /**
     * Останавливает таймер
     * @param {boolean} [notificate = true] - если установлено значение true,
     * после выполнения метода, будет вызвано событие `endTimer`.
     * {@link Timer.addEndObserver}
     */
    stop(notificate?: boolean): void;
}
