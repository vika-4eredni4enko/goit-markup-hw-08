import webpack from "webpack-stream";

import concat from "gulp-concat";
import uglify from "gulp-uglify";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'main.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}

//  собираем библиотеки js(желательно min)
export const libsJs = () => {
    return app.gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'
    ])
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}