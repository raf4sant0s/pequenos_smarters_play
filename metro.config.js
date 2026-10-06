// metro.config.js — ativa o suporte a SVG (react-native-svg-transformer)
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  // mantém os nomes de funções/classes na minificação (evita crash no APK)
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
    mangle: { keep_classnames: true, keep_fnames: true },
  },
};
config.resolver = {
  ...resolver,
  // tira 'svg' dos assets (vira componente) e garante 'mpeg' nos assets (áudios de voz)
  assetExts: [...resolver.assetExts.filter((ext) => ext !== 'svg'), 'mpeg'],
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
