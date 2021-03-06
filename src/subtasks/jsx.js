/*
 * Copyright 2014 Workiva, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function removeCwd(path){
    var cwd = process.cwd();
    var index = path.indexOf(cwd);
    if(index != -1){
        return path.substring(index + cwd.length);
    }
    return path;
}

module.exports = function(gulp, defaults){
    gulp.desc('jsx', 'Transpile JSX code with React to JS');

    return function(config) {
        if(!config) {
            config = {};
        }

        return function (cb) {
            var changed = require('gulp-changed');
            var gutil = require('gulp-util');
            var react = require('gulp-react');

            var stream;
            if(config.src)
                stream = gulp.src(config.src);
            else {
                stream = gulp.src(config.glob || defaults.glob.jsx, {
                    cwd: config.cwd || defaults.path.src
                });
            }

            if (!config.options) {
                config.options = {
                    stripTypes: true
                };
            }

            return stream.pipe(changed(config.dest || defaults.path.buildSrc))
                .pipe(react(config.options))
                .on('error', function(err){
                    console.log("Error parsing JSX file: ." + removeCwd(err.fileName));
                    cb(new gutil.PluginError('jsx', err));
                })
                .pipe(gulp.dest(config.dest || defaults.path.buildSrc));
        };
    };
};
