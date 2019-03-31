import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript3";
import path from "path";
import nodeResolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";

//
//  Paths
//
const sourceDirPath = "src";
const productsDirPath = "products";

const mainSourceFilePath = `${sourceDirPath}/ely.core.ts`;
const appSourceFilePath = `${sourceDirPath}/app.ts`;

//
//  Const
//
const buildName = "ely.core";

/**
 * Applies plugins to build
 * @param build
 */
function applyPlugins(build) {
    build.plugins = [
        nodeResolve({
            browser: true,
            jsnext: true,
            main: true,
        }),
        cjs(),
        json(),
        typescript({tsConfigDirectory: path.resolve("./")}),
    ];
}

/**
 * Applies single version options to build
 * @param build
 */
function applySingleOptions(build) {
    build.output.extend = true;
    build.output.name = "window";
    build.output.format = "iife";
    build.output.sourcemap = false;
}

/**
 * Applies standard version options to build
 * @param build
 */
function applyStandardOptions(build) {
    build.output.format = "es";
    build.output.sourcemap = false;
}

/**
 * The products
 * @type {Array}
 */
const PRODUCTS = [];

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +                       WEB VERSION                        +
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const WEB_VERSION = {
    input: mainSourceFilePath,
    output: {
        file: `${productsDirPath}/${buildName}.js`,
    },
};
applyStandardOptions(WEB_VERSION);
applyPlugins(WEB_VERSION);
PRODUCTS.push(WEB_VERSION);

const WEB_SINGLE_VERSION = {
    input: mainSourceFilePath,
    output: {
        file: `${productsDirPath}/${buildName}.single.js`,
    },
};
applySingleOptions(WEB_SINGLE_VERSION);
applyPlugins(WEB_SINGLE_VERSION);
PRODUCTS.push(WEB_SINGLE_VERSION);

export default [...PRODUCTS];
