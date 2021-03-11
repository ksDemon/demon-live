module.exports = function(config) {

  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("src/css");
  config.addPassthroughCopy("src/media");
  config.addPassthroughCopy("src/msc");
  return  {
    dir: {
      input: "src",
      output: "dist"
    }
  };

};
