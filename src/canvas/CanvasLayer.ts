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
 * Файл: CanvasLayer.ts                                                   *
 * Файл изменен: 30.03.2019 00:18:40                                          *
 *                                                                            *
 ******************************************************************************/

import {PointConstValue, SizeConstValue} from "..";
import HTMLView from "../dom/HTMLView";
import Canvas from "./Canvas";
import ContextElement from "./context/ContextElement";
import ContextImage from "./context/ContextImage";
import ContextRect from "./context/ContextRect";
import ContextText from "./context/ContextText";

/**
 * Слой холста
 */
export default class CanvasLayer extends HTMLView {

    /**
     * Контекст
     * @ignore
     */
    protected readonly _ctx: CanvasRenderingContext2D;

    /**
     * Холст
     */
    protected readonly __canvas: Canvas;

    /**
     * Конструктор
     */
    public constructor(cnv: Canvas) {
        super({tag: "canvas"});
        this.__canvas = cnv;
        this.addClass("ef-cnv-layer");
        this._ctx = this.getDocument().getContext("2d")!;
    }

    /**
     * Возвращает объект холста, на котором находится слой
     * @return {Canvas}
     */
    public getRootCanvas() {
        return this.__canvas;
    }

    /**
     * Возвращает контекст
     * @return {CanvasRenderingContext2D}
     */
    public getContext(): CanvasRenderingContext2D {
        return this._ctx;
    }

    /**
     * Возвращает DOM объект
     */
    public getDocument(): HTMLCanvasElement {
        return super.getDocument() as HTMLCanvasElement;
    }

    /**
     * Отрисовывает объект {@link ContextElement}
     * @param {ContextElement|ContextRect|efContextImage} e
     */
    public draw(e: ContextElement): void {
        this.getContext().save();
        if (e.angle()) this.rotateCanvas({point: e.rect().position(), size: e.rect().size(), angle: e.angle()});
        if (e.filter()) this.getContext().filter = e.filter();
        if (e instanceof ContextRect) {
            if (e.fillColor()) {
                this.getContext().fillStyle = e.fillColor().getHexString();
                this.getContext().fillRect(
                    e.rect().position().x(),
                    e.rect().position().y(),
                    e.rect().size().width(),
                    e.rect().size().height(),
                );
            }
            if (e.strokeColor()) {
                this.getContext().strokeStyle = e.strokeColor().getHexString();
                this.getContext().lineWidth = e.strokeWidth();
                this.getContext().strokeRect(
                    e.rect().position().x(),
                    e.rect().position().y(),
                    e.rect().size().width(),
                    e.rect().size().height(),
                );
            }
        } else if (e instanceof ContextImage) {
            if (e.subImage()) {
                this.getContext().drawImage(
                    e.image(),
                    e.rect().position().x(),
                    e.rect().position().y(),
                    e.rect().size().width(),
                    e.rect().size().height(),
                    e.subImage().position().x(),
                    e.subImage().position().y(),
                    e.subImage().size().width(),
                    e.subImage().size().height(),
                );
            } else {
                this.getContext().drawImage(
                    e.image(),
                    e.rect().position().x(),
                    e.rect().position().y(),
                    e.rect().size().width(),
                    e.rect().size().height(),
                );
            }
        } else if (e instanceof ContextText) {
            if (e.font()) this.getContext().font = `${e.font().size()}px ${e.font().name()}`;
            if (e.alignCenter()) this.getContext().textAlign = "center";
            if (e.strokeWidth()) this.getContext().lineWidth = e.strokeWidth();
            const pieces = e.text().split("\n");
            let y = e.font().size();
            for (const str of pieces) {
                if (e.fillColor()) {
                    this.getContext().fillStyle = e.fillColor().getHexString();
                    this.getContext().fillText(str, e.rect().position().x(), e.rect().position().y() + y, e.maxWidth());
                }
                if (e.strokeColor()) {
                    this.getContext().strokeStyle = e.strokeColor().getHexString();
                    this.getContext().strokeText(str, e.rect().position().x(),
                        e.rect().position().y() + y, e.maxWidth());
                }
                y += (e.font().size() + e.lineSpacing());
            }

        }
        this.getContext().restore();
    }

    /**
     * Поворачивает холст относительно координаты и размера
     * @param {{ point: PointConstValue, size: SizeConstValue, angle: number }} props - параметры
     */
    public rotateCanvas(props: { point: PointConstValue, size: SizeConstValue, angle: number }): void {
        const pos = props.point;
        const size = props.size;
        const angle = props.angle;
        this.getContext().translate(pos.x() + (size.width() / 2), pos.y() + (size.height() / 2));
        this.getContext().rotate(angle * Math.PI / 180);
        this.getContext().translate(-(pos.x() + (size.width() / 2)), -(pos.y() + (size.height() / 2)));
    }

    /**
     * Очищает слой
     */
    public clear(): CanvasLayer {
        const size = this.getRootCanvas().size();
        this.getContext().clearRect(0, 0, size.width(), size.height());
        return this;
    }
}
