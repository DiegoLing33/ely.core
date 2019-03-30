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
 * Файл: ContextImage.ts                                                      *
 * Файл изменен: 06.01.2019 05:29:15                                          *
 *                                                                            *
 ******************************************************************************/

import {RectConst} from "../../geometry/Rect";
import ContextElement from "./ContextElement";

/**
 * Изображение
 * @class ContextImage
 */
export default class ContextImage extends ContextElement {

    /**
     * Свойство: изображение
     * @ignore
     * @protected
     */
    protected __image: CanvasImageSource;

    /**
     * Свойство: координаты изображения в изображении
     * @ignore
     * @protected
     */
    protected __subImage: RectConst | null;

    /**
     * Конструктор
     * @param {{ rect: RectConst, image: CanvasImageSource, subImage?:
     * RectConst, angle?: number, filter?: string}} props - параметры
     */
    public constructor(props: {
        rect: RectConst,
        image: CanvasImageSource,
        angle?: number,
        filter?: string,
        subImage?: RectConst,
    }) {
        super(props);
        this.__image = props.image;
        this.__subImage = props.subImage || null;
    }

    /**
     * Возвращает изображение
     * @return {CanvasImageSource}
     */
    public image(): CanvasImageSource;

    /**
     * Устанавливает изображение
     * @param {CanvasImageSource} value - значение
     * @return {this}
     */
    public image(value: CanvasImageSource): ContextImage;

    /**
     * Возвращает и устанавливает изображение
     * @param {CanvasImageSource} [value] - значение
     * @returns {CanvasImageSource|this|null}
     */
    public image(value?: CanvasImageSource): CanvasImageSource | null | ContextImage {
        if (value === undefined) return this.__image;
        this.__image = value;
        return this;
    }

    /**
     * Возвращает координаты изображения в изображении
     * @return {RectConst}
     */
    public subImage(): RectConst;

    /**
     * Устанавливает координаты изображения в изображении
     * @param {RectConst} value - значение
     * @return {this}
     */
    public subImage(value: RectConst): ContextImage;

    /**
     * Возвращает и устанавливает координаты изображения в изображении
     * @param {RectConst} [value] - значение
     * @returns {RectConst|this|null}
     */
    public subImage(value?: RectConst): RectConst | null | ContextImage {
        if (value === undefined) return this.__subImage;
        this.__subImage = value;
        return this;
    }
}
