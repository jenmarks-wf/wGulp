var gulp = require('gulp');

// Override default options (such as path) here
var customizedOptions = {
    languages: ['javascript', 'jsx', 'typescript', 'coffeescript', 'livescript']
};

var wGulp = require('wGulp')(gulp, customizedOptions);

// Add your own tasks here
