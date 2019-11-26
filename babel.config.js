const presets = [
  [
    '@babel/env',
    {
      targets: {
        chrome: '76',
      },
    },
  ],
  '@babel/preset-typescript',
  // "@babel/preset-react",
];

module.exports = { presets };
