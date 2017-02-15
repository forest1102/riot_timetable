import riot from 'rollup-plugin-riot'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// import buble from 'rollup-plugin-buble'
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import postcss from 'postcss'
import postcssCssnext from 'postcss-cssnext'
import babel from 'rollup-plugin-babel'
// import path from 'path'
// import moment from 'moment';
// import inject from 'rollup-plugin-inject';
import replace from 'rollup-plugin-replace'

export default {
    entry: 'src/main.js',
    dest: 'dist/bundle.js',
    plugins: [
        builtins(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        riot({
            style: 'cssnext',
            parsers: {
                css: {
                    cssnext
                }
            }
        }),
        nodeResolve({
            jsnext: true
        }),
        commonjs({
            ignoreGlobal: true
        }),
        globals(),
        babel()
    ],
    format: 'iife'
}

/**
 * Transforms new CSS specs into more compatible CSS
 */
function cssnext(tagName, css) {
    // A small hack: it passes :scope as :root to PostCSS.
    // This make it easy to use css variables inside tags.
    css = css.replace(/:scope/g, ':root')
    css = postcss([postcssCssnext]).process(css).css
    css = css.replace(/:root/g, ':scope')
    return css
}