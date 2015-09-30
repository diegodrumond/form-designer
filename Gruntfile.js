module.exports = function(grunt) {

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("package.json"),

        // Banner definitions
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.license %>\n" +
                " */\n"
        },

        // Concat definitions
        concat: {
            options: {
                banner: "<%= meta.banner %>"
            },
            dist: {
                src: ["js/jquery.form-designer.js"],
                dest: "dist/jquery.form-designer.js"
            }
        },

        // Lint definitions
        jshint: {
            files: ["js/jquery.form-designer.js"],
            options: {
                jshintrc: "js/.jshintrc"
            }
        },

        // Minify definitions
        uglify: {
            my_target: {
                src: ["dist/jquery.form-designer.js"],
                dest: "dist/jquery.form-designer.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // Minify css
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/jquery.form-designer.min.css': ['css/jquery.form-designer.css']
                }
            }
        },

        // watch for changes to source
        // Better than calling grunt a million times
        // (call 'grunt watch')
        watch: {
            files: ["js/*", "css/*"],
            tasks: ["default"]
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        "http-server": {
            dev: {
                root: ".",
                port: 8282,
                host: "0.0.0.0",
                showDir: false,
                autoIndex: true,
                ext: "html",
                runInBackground: false
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask("build", ["jshint", "concat", "uglify", "cssmin"]);
    grunt.registerTask("default", ["build", "http-server"]);
    grunt.registerTask("travis", ["build"]);

};