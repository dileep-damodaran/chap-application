var gulp = require('gulp'),
    tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    nodemon = require('gulp-nodemon'),
    sourcemaps = require("gulp-sourcemaps"),
    del = require('del'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    log = require('fancy-log'),
    fs = require('fs');

const TYPE_SCRIPT_FILES = ["./**/*.ts"];

gulp.task('set-git-user', function(done) {
    git.exec({
        args: 'config user.name "BUILD_SERVICE"'
    }, function(err) {
        if (err) throw err;
    });

    git.exec({
        args: 'config user.email "dileepdamodaran01@gmail.com"'
    }, function(err) {
        if (err) throw err;
    });

    done();
});

gulp.task('clean:dist', function(done) {
    del.sync([
        'dist/**/*'
    ]);

    done();
});

gulp.task("copy-files", function(done) {

    gulp.src('package.json')
        .pipe(gulp.dest('./dist'));

    gulp.src('package-lock.json')
        .pipe(gulp.dest('./dist'));

    done();
});

gulp.task('compile-ts', function(done) {

    tsProject.src()
        .pipe(tsProject())
        .on('error', function(error) {
            console.log('Typescript compilation exited with ' + error);
            process.exit(1);
        })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"))

    done();
});

gulp.task('checkout-branch', function(done) {
    git.checkout('master', function(err) {
        if (err) throw err;

        done();
    });
});

gulp.task('bump-version', function(done) {
    return gulp.src(['./package.json'])
        .pipe(bump({
            type: "patch"
        }).on('error', log.error))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function(done) {
    let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit(() => `Release ${version}`));
});

gulp.task('push-changes', function(done) {
    git.push('origin', 'master', function(err) {
        if (err) throw err;

        done();
    });
});

gulp.task('checkout-new-branch-for-release', function(done) {
    let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    git.checkout('release/' + version, {
        args: '-b'
    }, function(err) {
        if (err) throw err;

        done();
    });
});

gulp.task('push-release-branch', function(done) {

    let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    git.push('origin', 'release/' + version, {
        args: " -u"
    }, function(err) {
        if (err) throw err;

        done();
    });
});

gulp.task('create-new-tag', function(done) {
    let version = JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
    git.tag(version, 'Created Tag for version: ' + version, function(error) {
        if (error) {
            return done(error);
        }
        git.push('origin', {
            args: version
        }, done);

        done();
    });
});


gulp.task('release', gulp.series(

    'clean:dist',
    'set-git-user',

    'checkout-branch',
    'bump-version',

    'commit-changes',
    'push-changes',

    'clean:dist',
    'compile-ts',

    'create-new-tag'
));

gulp.task('default', gulp.series(
    'clean:dist',
    'compile-ts',

    'copy-files'
));