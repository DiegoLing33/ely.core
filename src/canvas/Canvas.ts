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
 * Файл: Canvass                                                          *
 * Файл изменен: 30.03.2019 00:19:27                                          *
 *                                                                            *
 ******************************************************************************/

import HTMLView from "../dom/HTMLView";
import SizeValue, {SizeConstValue} from "../geometry/SizeValue";
import ObservableArray from "../observable/properties/ObservableArray";
import CanvasLayer from "./CanvasLayer";

/**
 * Холст
 */
export default class Canvas extends HTMLView {

    /**
     * Размер холста
     */
    protected __size: SizeValue = SizeValue.zero();

    /**
     * Слои
     */
    protected readonly __layers: ObservableArray<CanvasLayer>
        = new ObservableArray<CanvasLayer>();

    /**
     * Конструктор
     * @param {{size: SizeConstValue, __layers?: CanvasLayer[]}} props
     */
    public constructor(props: { size: SizeConstValue, layers?: CanvasLayer[] }) {
        super();
        this.addClass("ef-cnv");

        this.size().width(props.size.width());
        this.size().height(props.size.height());

        this.__layers.change(() => {
            this.removeViewContent();
            this.forEachLayer((layer, index) => {
                this.getDocument().append(layer.getDocument());
                layer.getStyle().zIndex = String(index + 1);
                layer.getDocument().width = this.size().width();
                layer.getDocument().height = this.size().height();
            });
        });
    }

    /**
     * Создает новый слой холста
     * @return {CanvasLayer}
     */
    public createLayer(): CanvasLayer {
        return new CanvasLayer(this);
    }

    /**
     * Создает и добавляет новый слой
     * @return {CanvasLayer}
     */
    public addLayer(): CanvasLayer {
        const layer = this.createLayer();
        this.__layers.push(layer);
        return layer;
    }

    /**
     * Возвращает размер холста
     * @return {SizeValue}
     */
    public size(): SizeValue {
        return this.__size;
    }

    /**
     * Цикл по слоям
     * @param cb
     */
    public forEachLayer(cb: (layer: CanvasLayer, index: number) => void): Canvas {
        this.__layers.get().forEach((value, index) => {
            cb(value, index);
        });
        return this;
    }
}
