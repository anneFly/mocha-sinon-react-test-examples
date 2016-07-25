const gulp = require('gulp');
const Server = require('karma').Server;

gulp.task('test', function (done) {
    return new Server({
        configFile: `${__dirname}/karma.conf.js`,
    }, done).start();
});
