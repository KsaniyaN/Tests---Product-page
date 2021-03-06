module.exports = function (grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({
		uglify: {
			build: {
				src: ["js/script.js"],
				dest: "js/script.min.js"
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"css/styles.css": "less/styles.less"
				}
			}
		},
		watch: {
			scripts: {
				files: ['js/*.js'],
				tasks: ['uglify']
			},
			styles: {
				files: ['less/**/*.less'], // which files to watch
				tasks: ['less'],
				options: {
					nospawn: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.registerTask('default', ['uglify', 'less', 'watch']);
};
