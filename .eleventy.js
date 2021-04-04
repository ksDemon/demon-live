module.exports = function(config) {
  config.addPassthroughCopy("src");
  return  {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};