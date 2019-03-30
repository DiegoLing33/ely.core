"use strict";
/*
 *
 *  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 *   ,--. o                   |    o
 *   |   |.,---.,---.,---.    |    .,---.,---.
 *   |   |||---'|   ||   |    |    ||   ||   |
 *   `--' ``---'`---|`---'    `---'``   '`---|
 *              `---'                    `---'
 *
 * Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)
 * Mail: <diegoling33@gmail.com>
 *
 * Это программное обеспечение имеет лицензию, как это сказано в файле
 * COPYING, который Вы должны были получить в рамках распространения ПО.
 *
 * Использование, изменение, копирование, распространение, обмен/продажа
 * могут выполняться исключительно в согласии с условиями файла COPYING.
 *
 * Файл: ObservableBoolean
 * Файл создан: 28.11.2018 01:03:35
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ObservableProperty_1 = require("./ObservableProperty");
/**
 * Прослушиваемый булевый тип
 * @class ObservableBoolean
 * @augments {ObservableProperty<boolean>}
 */
class ObservableBoolean extends ObservableProperty_1.default {
    /**
     * Конструктор
     * @param {boolean} [defaultValue = false]
     */
    constructor(defaultValue = false) {
        super(defaultValue);
    }
    /**
     * Переключает значение
     * @return {ObservableBoolean}
     */
    toggle() {
        this.set(!this.value);
        return this;
    }
}
exports.default = ObservableBoolean;
