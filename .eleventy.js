module.exports = function(config) {

  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("src/css");
  config.addPassthroughCopy("src/msc");
  config.addPassthroughCopy("src");
  return  {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};