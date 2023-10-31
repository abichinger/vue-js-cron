module.exports = {
  chainWebpack: (config) => {
    config.externals({
      __VUE_SSR_CONTEXT__: '__VUE_SSR_CONTEXT__',
    })
  },
}
