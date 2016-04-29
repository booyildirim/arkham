var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    less = require("gulp-less"),
    path = require("path"),
    url = require("url"),
    runSequence = require("run-sequence"),
    concat = require("gulp-concat");

var proxy = require("proxy-middleware");

gulp.task("default", ["watch"]);

/*
 "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
 "bower_components/angular-loading-bar/build/loading-bar.min.js"
*/
var libPathList = ["app/bower_components/jquery/dist/jquery.min.js",
    "app/bower_components/angular/angular.min.js",
    "app/bower_components/angular-ui-router/release/angular-ui-router.min.js"
];

var sourcePathList = [
    "app/app.js",
    "app/components/**/**.js",
    "app/pages/**/**.js",
    "app/utils/**/**.js"
];

/*
 "bower_components/bootstrap/dist/css/bootstrap.css",
 "bower_components/angular-loading-bar/build/loading-bar.min.css",
 */
var cssPathList = ["app/**/**.less"];

gulp.task("browser-sync", function () {
    var proxyOptions = url.parse("http://10.58.4.135:8080");

    proxyOptions.route = "/api";

    browserSync.init({
        "server": {
            "baseDir": "dist",
            "index": "/index.html",
            "middleware": proxy(proxyOptions)
        }
    });

});

gulp.task("less", function () {
    return gulp.src(cssPathList)
        .pipe(less({
            "paths": [path.join(__dirname, "less", "includes")]
        }))
        .pipe(concat("app.css"))
        .pipe(gulp.dest("dist/style/"));
});

gulp.task("build-style", function () {
    runSequence("less", "minify-css");
});

/*
gulp.task("webserver", function () {
    gulp.src("dist")
        .pipe(webserver({
            host: "0.0.0.0",
            port: process.env.PORT,
            //port: "3000",
            livereload: true,
            open: true
        }));
});*/

gulp.task("concat-scripts", function () {
    return gulp.src(libPathList.concat(["temp/app.js","temp/**/**.js"]))
        .pipe(concat("portfolio.js"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
    return gulp.src(libPathList.concat(sourcePathList))
        .pipe(concat("app.js"))
        .pipe(gulp.dest("dist/"));
});


gulp.task("build-scripts", function () {
    runSequence("concat-scripts");
});

gulp.task("copyAssets", function () {
    return gulp.src("app/assets/**")
        .pipe(gulp.dest("dist/assets/"));
});


gulp.task("copyTemplates", function () {
    return gulp.src("temp/templates/**/**.html")
        .pipe(gulp.dest("dist/templates/"));
});

gulp.task("copyTemplatesDev", function () {
    return gulp.src("app/**/**.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task("build-templates", function () {
    runSequence("minify-html", "copyTemplates");
});

gulp.task("copyIndex", function () {
    return gulp.src("app/index.html")
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean-temp", function () {
    del("temp/**");
});

gulp.task("build-dev", ["less", "copyAssets", "copyTemplatesDev", "scripts", "copyIndex"]);

gulp.task("build", function () {
    runSequence("build-style", "build-scripts", "build-templates", "copyAssets", "copyIndex", "clean-temp");
});

gulp.task("watch", function () {
    gulp.watch("/app/**/**.less", ["build-dev"]);
    gulp.watch(sourcePathList, ["build-dev"]);
});

gulp.task("dev-live", ["build-dev", "browser-sync", "watch"]);
