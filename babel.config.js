module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@themes': './src/themes',
          '@utils': './src/utils',
          '@zustand': './src/zustand',
          '@models': './src/models',
          '@services': './src/services',
          '@providers': './src/providers',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
