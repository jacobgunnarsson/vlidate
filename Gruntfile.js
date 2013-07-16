module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: 'gzip',
                banner: '/*!\n<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n\
                        \nAuthor: Jacob Gunnarsson\
                        \nContact: hello@jacobgunnarsson.com\
                        \n\nhttp://www.jacobgunnarsson.com/\
                        \nhttps://github.com/jacobgunnarsson\
                        \n*/\n\n'
            },
            dist: {
                files: {
                    'dist/jquery.vlidate.min.js': [ 'src/jquery.vlidate.js' ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);

};