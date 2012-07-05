var fs = require('fs');
var _path = require('path');
var mustache = require('mustache');

/**
 * Template class
 *
 * @param template the template name to use
 * @param path the directory to write the given template
 * @param values the data to pass to templating engine
 */
var Template = function(template, path, values) {


	// PRIVATE METHODS
	
	/**
	 * Copies a directory to another location. Inspired by wrench.js
	 * @see https://github.com/ryanmcgrath/wrench-js/blob/master/lib/wrench.js#L166 
	 */
	var copyDirSyncRecursive = function(sourceDir, newDirLocation, opts) {

		if (!opts || !opts.preserve) {
			try {
				if (fs.statSync(newDirLocation).isDirectory())
					;//exports.rmdirSyncRecursive(newDirLocation);
			} catch(e) {
			}
		}

		/*  Create the directory where all our junk is moving to; read the mode of the source directory and mirror it */
		var checkDir = fs.statSync(sourceDir);
		try {
			fs.mkdirSync(newDirLocation, checkDir.mode);
		} catch (e) {
			//if the directory already exists, that's okay
			if (e.code !== 'EEXIST')
				throw e;
		}

		var files = fs.readdirSync(sourceDir);

		for (var i = 0; i < files.length; i++) {
			var currFile = fs.lstatSync(sourceDir + "/" + files[i]);

			if (currFile.isDirectory()) {
				/*  recursion this thing right on back. */
				copyDirSyncRecursive(sourceDir + "/" + files[i], newDirLocation + "/" + files[i], opts);
			} else if (currFile.isSymbolicLink()) {
				var symlinkFull = fs.readlinkSync(sourceDir + "/" + files[i]);
				fs.symlinkSync(symlinkFull, newDirLocation + "/" + files[i]);
			} else {
				/*  At this point, we've hit a file actually worth copying... so copy it on over. */
				var contents = fs.readFileSync(sourceDir + "/" + files[i], 'utf8');
				
				//Pass contents through mustache
				contents = mustache.to_html(contents, values);
				
				fs.writeFileSync(newDirLocation + "/" + files[i], contents);
			}
		}
	};

	// PUBLIC METHODS
	return {
		/**
		 * Writes the files
		 */
		write : function() {
			//console.log(template);
			if (!fs.existsSync(template)) console.log("Error: Template '%s' doesn't exist.",_path.basename(template));
			else copyDirSyncRecursive(template,path);
		}
	};
}

module.exports = Template; 