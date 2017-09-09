var gulp = require('gulp');
var gutil = require('gulp-util');
var typescriptCompiler = require('gulp-typescript');
var less = require('gulp-less');
var tslint = require('gulp-tslint');
var path = require('path');
var typescriptConfig = 'tsconfig.json';
var fs = require('fs');
var spawn = require('child_process').spawn;

function getWebpackConfig(configName) {
    return 'BuildAndConfig/webpack/' + configName;
}

/* TODO -
    Uglification
    Minification
    Source-mapping */

/**
* Non-task functions *
                    */
function lintFiles(filePaths) {
    return gulp
        .src(filePaths)
        .pipe(tslint({
            formatter: 'stylish'
        }))
        .pipe(tslint.report({
            reportLimit: 30,
            emitError: false
        }));
};


gulp.task('transpile-typescript', ['create-full-application-stub'], function () {
    return gulp
        .src(['Code/**/*.ts'])
        .pipe(typescriptCompiler.createProject(typescriptConfig)())
        .pipe(gulp.dest('Code'))
});

gulp.task('transpile-less', function () {
    return gulp.src('LessCss/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', function(error) {
            gutil.log(error);
            this.emit('end');
        }))
        .pipe(gulp.dest('LessCss'));
});


gulp.task('tslint-full', function() {
    return gulp
        .src(['Code/**/*.ts'])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            reportLimit: 500,
            summarizeFailureOutput: true,
            emitError: false
        }));
});

// This also updates and serves the index.html file
gulp.task('watch-typescript', function(callback) {
    var task = spawn('node', [
        'node_modules/webpack-dev-server/bin/webpack-dev-server',
        '--config',
        getWebpackConfig('webpack.dev')
    ], {
        stdio :'inherit'
    });
});

gulp.task('bundle-typescript', function(callback) {
    var task = spawn('node', [
        'node_modules/webpack/bin/webpack',
        '--config',
        getWebpackConfig('webpack.prod')
    ], {
        stdio :'inherit'
    });
    var exited = false;
    var exitCallback = function(eventName) {
        return function (code) {
            if (exited) {
                return;
            }
            console.log('bundle-typescript emitted ['+ eventName +'] with code ' + code);
            callback(code);
            exited = true;
            process.exit();
        };
    };
    task.on('close', exitCallback('close'));
    task.on('exit', exitCallback('exit'));
    task.on('error', exitCallback('error'));
});

// this stub is needed to make Edge work since it dies on 404
gulp.task('create-full-application-stub', function() {
    fs.closeSync(fs.openSync('Code/fullApplication.js', 'w'));
})

gulp.task('prepare-deployment', ['transpile-less', 'bundle-typescript']);

gulp.task('watch-less', ['transpile-less'], function() {
    gulp.watch('Less/**/*.less', ['transpile-less'])
});

gulp.task('watch-lint', ['tslint-full'], function() {
    const watcher = gulp.watch('Code/**/*.ts');
    watcher.on('change', function(file) {
        lintFiles(file.path);
    });
});

gulp.task('watch-all', ['watch-lint', 'watch-less', 'watch-typescript']);
