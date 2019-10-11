// function defaultTask(cb) {
//   // place code for your default task here
//   cb();

//   console.log('Running default task!!!')
// }

// exports.default = defaultTask

var less = require('gulp-less');
var path = require('path');
 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});