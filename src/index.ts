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
 * Файл изменен: 31.03.2019 00:02:04                                          *
 *                                                                            *
 ******************************************************************************/

import Guard from "./utils/Guard";

import Observable from "./observable/Observable";
import ObservableArray from "./observable/properties/ObservableArray";
import ObservableBoolean from "./observable/properties/ObservableBoolean";
import ObservableDictionary from "./observable/properties/ObservableDictionary";
import ObservableProperty from "./observable/properties/ObservableProperty";

import Time from "./time/Time";
import Timer from "./time/Timer";

import Color from "./color/Color";
import {ColorUtils} from "./color/ColorUtils";

import EFMath from "./utils/EFMath";

import SendFileRequest from "./web/request/SendFileRequest";
import SendJsonRequest from "./web/request/SendJsonRequest";
import URLRequest from "./web/request/URLRequest";

import LocalStorage from "./user/LocalStorage";

import Encrypt from "./secure/encrypt";
import DeviceDetector from "./utils/DeviceDetector";
import Utils from "./utils/Utils";
import XLogger from "./utils/XLogger";

import PointValue, {PointConstValue} from "./geometry/PointValue";
import Rect, {RectConst} from "./geometry/Rect";
import SizeValue, {SizeConstValue} from "./geometry/SizeValue";
import Sphere, {SphereConst} from "./geometry/Sphere";
import Geometry from "./geometry/utils/Geometry";

import HTMLView, {IHTMLViewOptions} from "./dom/HTMLView";

/**
 * Запросы
 */
const Requests = {
    SendFileRequest,
    SendJsonRequest,
    URLRequest,
};

/**
 * Пользователь
 */
const User = {
    LocalStorage,
};

/**
 * Запросы
 */
const Web = {
    Requests,
};

export {
    Color,
    ColorUtils,

    Time,
    Timer,

    Observable,
    ObservableArray,
    ObservableBoolean,
    ObservableDictionary,
    ObservableProperty,

    Guard,

    Geometry,
    Rect,
    RectConst,
    Sphere,
    SphereConst,
    PointValue,
    PointConstValue,
    SizeValue,
    SizeConstValue,

    DeviceDetector,
    Utils,
    XLogger,

    EFMath,

    Web,

    User,

    Encrypt,

    HTMLView,
    IHTMLViewOptions,
};
