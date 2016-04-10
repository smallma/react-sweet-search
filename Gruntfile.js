module.exports = function(grunt, type) {
  require('load-grunt-tasks')(grunt);
  var isDev = process.argv[2] !== 'build';

  grunt.initConfig({
    env: {
      development: {
        NODE_ENV: 'development'
      },
      production: {
        NODE_ENV: 'production'
      }
    },

    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      sass: {
        files: "app/sass/*.sass",
        tasks: ['sass:dev']
      },
      react: {
        files: ['app/**/*.jsx', 'app/**/*.js'],
        tasks: ['browserify']
      }
    },
    sass: {
      dev: {
        files: {
          "./dist/css/main.css" : "./app/sass/main.sass"
        }
      }
    },

    browserify: {
      options: {
        browserifyOptions: {
          debug: isDev
        },
        // keepAlive: isDev,
        // watch: isDev,
        transform: [require("babelify").configure({
          presets: ["es2015", "react"],
          plugins: isDev ? [] : ["transform-react-constant-elements", "transform-react-inline-elements"]
        }), require("envify")]
      },
      app: {
        src: ['app/app.jsx'],
        dest: 'dist/js/app.js'
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "dist/css/*.css",
            "dist/*.html",
            "dist/js/app.js"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./dist"
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['env:development', 'browserSync', 'browserify', 'watch']);
};