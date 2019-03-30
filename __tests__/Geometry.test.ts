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
 * Файл: Geometry.test.ts                                                     *
 * Файл изменен: 30.03.2019 23:13:46                                          *
 *                                                                            *
 ******************************************************************************/
import Sphere from "../src/geometry/Sphere";
import Geometry from "../src/geometry/utils/Geometry";
import PointValue from "../src/values/PointValue";

describe("Geometry tests", () => {

    test("Point collision", () => {
        const sphereA = new Sphere({radius: 5, position: new PointValue({x: 0, y: 0})});
        const sphereB = new Sphere({radius: 2, position: new PointValue({x: 0, y: 0})});
        const sphereC = new Sphere({radius: 2, position: new PointValue({x: 8, y: 0})});
        const sphereD = new Sphere({radius: 2, position: new PointValue({x: 7, y: 0})});

        console.log("Dist A & B", Geometry.getDistBetweenSpheres(sphereA, sphereB));
        console.log("Dist A & C", Geometry.getDistBetweenSpheres(sphereA, sphereC));
        console.log("Dist A & D", Geometry.getDistBetweenSpheres(sphereA, sphereD));

        expect(Geometry.isSpheresCollide(sphereA, sphereB)).toBeTruthy();
        expect(Geometry.isSpheresCollide(sphereA, sphereC)).toBeFalsy();
        expect(Geometry.isSpheresCollide(sphereA, sphereD)).toBeTruthy();
    });
});
