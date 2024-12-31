module.exports = function (api) {
  api.cache(true); 
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components", // Correctly map to your components folder
            "@app": "./app", // Correctly map to your app folder
          },
        },
      ],
    ],
  };
};

