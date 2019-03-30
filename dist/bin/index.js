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
 * Файл: index.ts                                                             *
 * Файл изменен: 27.03.2019 18:32:29                                          *
 *                                                                            *
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
const Guard = require("../utils/Guard");
exports.Guard = Guard;
const Observable_1 = require("../observable/Observable");
const ObservableArray_1 = require("../observable/properties/ObservableArray");
const ObservableBoolean_1 = require("../observable/properties/ObservableBoolean");
const ObservableDictionary_1 = require("../observable/properties/ObservableDictionary");
const ObservableProperty_1 = require("../observable/properties/ObservableProperty");
const Time_1 = require("../time/Time");
exports.Time = Time_1.default;
const Timer_1 = require("../time/Timer");
exports.Timer = Timer_1.default;
const Color_1 = require("../color/Color");
exports.Color = Color_1.default;
const ColorUtils_1 = require("../color/ColorUtils");
exports.ColorUtils = ColorUtils_1.ColorUtils;
const SizeValue_1 = require("../values/SizeValue");
const PointValue_1 = require("../values/PointValue");
const efMath_1 = require("../utils/efMath");
exports.EFMath = efMath_1.default;
const SendFileRequest_1 = require("../web/request/SendFileRequest");
const SendJsonRequest_1 = require("../web/request/SendJsonRequest");
const URLRequest_1 = require("../web/request/URLRequest");
const LocalStorage_1 = require("../user/LocalStorage");
const DeviceDetector_1 = require("../utils/DeviceDetector");
exports.DeviceDetector = DeviceDetector_1.default;
const Utils_1 = require("../utils/Utils");
exports.Utils = Utils_1.default;
const XLogger_1 = require("../utils/XLogger");
exports.XLogger = XLogger_1.default;
const encrypt_1 = require("../secure/encrypt");
exports.Encrypt = encrypt_1.default;
/**
 * Наблюдатели
 */
const Observers = {
    Observable: Observable_1.default,
    ObservableArray: ObservableArray_1.default,
    ObservableBoolean: ObservableBoolean_1.default,
    ObservableDictionary: ObservableDictionary_1.default,
    ObservableProperty: ObservableProperty_1.default,
};
exports.Observers = Observers;
/**
 * Значения
 */
const Values = {
    SizeValue: SizeValue_1.default,
    VectorValue: PointValue_1.default,
};
exports.Values = Values;
/**
 * Запросы
 */
const Requests = {
    SendFileRequest: SendFileRequest_1.default,
    SendJsonRequest: SendJsonRequest_1.default,
    URLRequest: URLRequest_1.default,
};
/**
 * Пользователь
 */
const User = {
    LocalStorage: LocalStorage_1.default,
};
exports.User = User;
/**
 * Запросы
 */
const Web = {
    Requests,
};
exports.Web = Web;
