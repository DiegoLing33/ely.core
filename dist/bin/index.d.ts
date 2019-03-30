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
import * as Guard from "../utils/Guard";
import Observable from "../observable/Observable";
import ObservableArray from "../observable/properties/ObservableArray";
import ObservableBoolean from "../observable/properties/ObservableBoolean";
import ObservableDictionary from "../observable/properties/ObservableDictionary";
import ObservableProperty from "../observable/properties/ObservableProperty";
import Time from "../time/Time";
import Timer from "../time/Timer";
import Color from "../color/Color";
import { ColorUtils } from "../color/ColorUtils";
import SizeValue from "../values/SizeValue";
import PointValue from "../values/PointValue";
import EFMath from "../utils/efMath";
import SendFileRequest from "../web/request/SendFileRequest";
import SendJsonRequest from "../web/request/SendJsonRequest";
import URLRequest from "../web/request/URLRequest";
import LocalStorage from "../user/LocalStorage";
import DeviceDetector from "../utils/DeviceDetector";
import Utils from "../utils/Utils";
import XLogger from "../utils/XLogger";
import Encrypt from "../secure/encrypt";
/**
 * Наблюдатели
 */
declare const Observers: {
    Observable: typeof Observable;
    ObservableArray: typeof ObservableArray;
    ObservableBoolean: typeof ObservableBoolean;
    ObservableDictionary: typeof ObservableDictionary;
    ObservableProperty: typeof ObservableProperty;
};
/**
 * Значения
 */
declare const Values: {
    SizeValue: typeof SizeValue;
    VectorValue: typeof PointValue;
};
/**
 * Пользователь
 */
declare const User: {
    LocalStorage: typeof LocalStorage;
};
/**
 * Запросы
 */
declare const Web: {
    Requests: {
        SendFileRequest: typeof SendFileRequest;
        SendJsonRequest: typeof SendJsonRequest;
        URLRequest: typeof URLRequest;
    };
};
export { Color, ColorUtils, Time, Timer, Observers, Guard, Values, DeviceDetector, Utils, XLogger, EFMath, Web, User, Encrypt, };
