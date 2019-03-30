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
 * Файл: Geometry.ts                                                          *
 * Файл изменен: 30.03.2019 22:11:22                                          *
 *                                                                            *
 ******************************************************************************/

import {PointConstValue} from "../../values/PointValue";
import {RectConst} from "../Rect";
import {SphereConst} from "../Sphere";

/**
 * Утилиты прямоугольников
 * @class Geometry
 */
export default class Geometry {

    /**
     * Возвращает растояние от точки, до центра окружности
     * @param {PointConstValue} point
     * @param {SphereConst} sphere
     * @return {number}
     */
    public static getDistBetweenPointAndSphereCenter(point: PointConstValue, sphere: SphereConst): number {
        return Math.sqrt((point.x() - sphere.position().x()) * (point.x() - sphere.position().x()) +
            (point.y() - sphere.position().y()) * (point.y() - sphere.position().y()) +
            (point.z() - sphere.position().z()) * (point.z() - sphere.position().z()));
    }

    /**
     * Возвращает дистанцию между центрами окружностей
     * @param {SphereConst} a
     * @param {SphereConst} b
     * @return {number}
     */
    public static getDistBetweenSpheresCenters(a: SphereConst, b: SphereConst): number {
        return Math.sqrt(
            (a.position().x() - b.position().x()) * (a.position().x() - b.position().x()) +
            (a.position().y() - b.position().y()) * (a.position().y() - b.position().y()) +
            (a.position().z() - b.position().z()) * (a.position().z() - b.position().z()));
    }

    /**
     * Возвращает дистанцию между окружнастями
     * @param {SphereConst} a
     * @param {SphereConst} b
     * @return {number}
     */
    public static getDistBetweenSpheres(a: SphereConst, b: SphereConst): number {
        return Math.sqrt(
            (a.position().x() - b.position().x()) * (a.position().x() - b.position().x()) +
            (a.position().y() - b.position().y()) * (a.position().y() - b.position().y()) +
            (a.position().z() - b.position().z()) * (a.position().z() - b.position().z())) - (a.radius() + b.radius());
    }

    /**
     * Возвращает true, если точка находится в сфере
     * @param {PointConstValue} point
     * @param {SphereConst} sphere
     * @return {boolean}
     */
    public static isPointInSphere(point: PointConstValue, sphere: SphereConst): boolean {
        return Geometry.getDistBetweenPointAndSphereCenter(point, sphere) <= sphere.radius();
    }

    /**
     * Возвращает true, если точка находится в прямоугольнике
     * @param {PointConstValue} point
     * @param {RectConst} rect
     * @return {boolean}
     */
    public static isPointInRect(point: PointConstValue, rect: RectConst): boolean {
        const minA = rect.position();
        const maxA = rect.getSecondPosition();

        return (
            (point.x() >= minA.x() && point.x() <= maxA.x()) &&
            (point.y() >= minA.y() && point.y() <= maxA.y()) &&
            (point.z() >= minA.z() && point.z() <= maxA.z())
        );
    }

    /**
     * Возвращает true, если прямоугольник *a* в коллизии с прямоугольником *b*
     * @param {RectConst} a
     * @param {RectConst} b
     * @return {boolean}
     */
    public static isRectsCollide(a: RectConst, b: RectConst): boolean {
        const a1 = a.position();
        const a2 = a.getSecondPosition();
        const b1 = b.position();
        const b2 = b.getSecondPosition();

        return (
            (a1.x() <= b2.x() && a2.x() >= b1.x()) &&
            (a1.y() <= b2.y() && a2.y() >= b1.y()) &&
            (a1.z() <= b2.z() && a2.z() >= b1.z())
        );
    }

    /**
     * Возвращает true, если сферы находятся в коллизии
     * @param {SphereConst} a
     * @param {SphereConst} b
     * @return {boolean}
     */
    public static isSpheresCollide(a: SphereConst, b: SphereConst): boolean {
        return Geometry.getDistBetweenSpheresCenters(a, b) <= (a.radius() + b.radius());
    }

    /**
     * Возвращает true, если прямоугольник и сфера находятся в коллизии
     * @param {RectConst} rect
     * @param {SphereConst} sphere
     * @return {boolean}
     */
    public static isRectSphereCollide(rect: RectConst, sphere: SphereConst): boolean {
        const rectMin = rect.position();
        const rectMax = rect.getSecondPosition();

        const x = Math.max(rectMin.x(), Math.min(sphere.position().x(), rectMax.x()));
        const y = Math.max(rectMin.y(), Math.min(sphere.position().y(), rectMax.y()));
        const z = Math.max(rectMin.z(), Math.min(sphere.position().z(), rectMax.z()));

        return Geometry.getDistBetweenPointAndSphereCenter(new PointConstValue({x, y, z}), sphere) <= sphere.radius();
    }

}
