module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file && file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
      unitPrecision: 2,
      selectorBlackList: ['.norem'],
      replace: true,
      mediaQuery: true,
      minPixelValue: 2,
    },
  },
};
