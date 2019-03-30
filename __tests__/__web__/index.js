/*
 *
 * ,--. o                   |    o
 * |   |.,---.,---.,---.    |    .,---.,---.
 * |   |||---'|   ||   |    |    ||   ||   |
 * `--' ``---'`---|`---'    `---'``   '`---|
 *            `---'                    `---'
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
 * Проект: ely.core
 *
 * Файл: index.js
 * Файл изменен: 31.03.2019 00:48:08
 *
 */

window.onload = () => {

    const cnv = new Canvas({size: new SizeValue({width: 500, height: 500})});
    const layer = cnv.addLayer();

    console.log(cnv);

    document.body.append(cnv.getDocument());

    const text = new ContextText({
        fillColor: Color.red(),
        maxWidth: 100,
        text: "lol",
        vector: new PointValue({x: 0, y: 0}),
    });

    const rs = new Rect({vector: new PointValue({x: 20, y: 20}), size: new SizeValue({width: 50, height: 50})});
    const rect = new ContextRect({rect: rs, fillColor: Color.black()});

    let f = false;

    layer.getDocument().onclick = (e) => {
        if (Geometry.isPointInRect(new PointValue({x: e.pageX, y: e.pageY}), rect.rect())) {
            f = !f;
        }
    };

    layer.getDocument().onmousemove = (e) => {
        layer.clear();
        if (f) {
            rect.rect().position().x(e.pageX - (rect.rect().size().width() / 2));
            rect.rect().position().y(e.pageY - (rect.rect().size().height() / 2));
        }
        layer.draw(rect);
    };

    console.log(2);

};
