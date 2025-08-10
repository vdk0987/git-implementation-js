var fs = require("fs");
var nodePath = require("path"):

var gitimp = module.exports = {
  init: function (opts) {
    if(files.inRepo()) {return;}
    
    opts = opts || {};

    var gitStructure = {
      HEAD: "ref: refs/heads/master\n",

      config: config.objToStr({core:{"":{bare:opts.bare === true}}}),

      objects: {},
      refs: {
        heads: {},
      }
    };

    files.writeFilesFromTree(opts.bare ? gitStructure:{".gitimp":gitStructure}, process.cwd());
  },

  add: function (path, _) {
  files.assertInRepo();
    config.assertNotBare();

    var addedFiles = files.lsRecursive(path);

    if (addedFiles.length === 0){
      throw new Error(files.pathFromRepoRoot(path) + "did not match any files")
    } else {
      addedFiles.forEach(function(p) {gitimp.update_index(p, {add: true});});
    }
  },

}

