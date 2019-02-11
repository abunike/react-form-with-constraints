// @ts-check

import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import { gzip as zopfli } from 'node-zopfli';
import gzip from 'rollup-plugin-gzip';
import filesize from 'rollup-plugin-filesize';
import strip from 'rollup-plugin-strip';

const __PROD__ = process.env.NODE_ENV === 'production';

function outputFileName() {
  let fileName = `react-form-with-constraints-tools.${process.env.NODE_ENV}`;
  fileName += __PROD__ ? '.min.js' : '.js';
  return fileName;
}

export default {
  input: './src/index.ts',
  output: {
    file: `dist/${outputFileName()}`,
    name: 'ReactFormWithConstraintsTools',
    format: 'umd',
    sourcemap: true,
    globals: {
      'react-form-with-constraints': 'ReactFormWithConstraints',
      react: 'React',
      'prop-types': 'PropTypes',
      'react-dom': 'ReactDOM'
    }
  },

  external: ['react-form-with-constraints', 'react', 'prop-types', 'react-dom'],

  plugins: [
    typescript({
      clean: true,
      tsconfig: 'tsconfig.lib-es5.json',
      tsconfigOverride: {compilerOptions: {module: 'esnext', inlineSources: false}}
    }),

    __PROD__ && uglify(),

    gzip({
      customCompression: content => zopfli(Buffer.from(content))
    }),

    filesize(),

    __PROD__ && strip({
      include: ['**/*.js', '**/*.ts', '**/*.tsx'] // See https://github.com/rollup/rollup-plugin-strip/pull/7
    })
  ]
};
