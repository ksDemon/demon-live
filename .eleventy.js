module.exports = function(config) {

  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("src/css");
  config.addPassthroughCopy("src/msc");
  return  {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};

module.exports = function(config) {

  config.addPassthroughCopy("src/media");
  return  {
    dir: {
      input: "src/media",
      output: "dist"
    }
  };
};

