import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript3";
import path from "path";
import nodeResolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";

export default [{
    input: "src/index.ts",
    output: {
        extend: true,
        file: "products/ely.core.single.js",
        format: "iife",
        name: "window",
        sourcemap: false,
    },
    plugins: [
        nodeResolve({
            browser: true,
            jsnext: true,
            main: true,
        }),
        cjs(),
        json(),
        typescript({tsConfigDirectory: path.resolve("./")}),
    ],
},
    {
        input: "src/index.ts",
        output: {
            file: "products/ely.core.js",
            format: "es",
            sourcemap: false,
        },
        plugins: [
            nodeResolve({
                browser: true,
                jsnext: true,
                main: true,
            }),
            cjs(),
            json(),
            typescript({tsConfigDirectory: path.resolve("./")}),
        ],
    }];
