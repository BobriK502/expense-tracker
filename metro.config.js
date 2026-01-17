const { getDefaultConfig, mergeConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.resolver.assetExts.push('wasm');

config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    middleware(req, res, next);
  };
};

// 3. Настраиваем SVG-трансформер ВРУЧНУЮ (без getSvgTransformerConfig)
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// 4. Добавляем .svg в расширения
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = withNativeWind(config, { input: './global.css' });