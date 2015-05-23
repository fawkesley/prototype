module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    mustache_render: {
    all: {
      files: [{
        data: "data/govuk.json",
        template: "views/layouts/govuk.mustache",
        dest: "public/govuk.html"
      }]
    }
  },
    copy: {
           main: {
               files: [{
                   expand: true,
                   cwd: 'public/javascripts',
                   src: ['**'],
                   dest: 'dist/javascripts'
               },
               {
                   expand: true,
                   cwd: 'public/images',
                   src: ['**'],
                   dest: 'dist/images'
               }

               ]
           }
       },
		watch: {
			sass: {
				files: ['public/stylesheets/*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: {
					livereload: true
				}
			}
		},
		sass: {
			options: {
				sourceMap: false,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'dist/stylesheets/govuk-template.css': 'public/stylesheets/govuk-template.scss',
          'dist/stylesheets/govuk-template-ie6.css': 'public/stylesheets/govuk-template-ie6.scss',
          'dist/stylesheets/govuk-template-ie7.css': 'public/stylesheets/govuk-template-ie7.scss',
          'dist/stylesheets/govuk-template-ie8.css': 'public/stylesheets/govuk-template-ie8.scss',


				}
			}
		}
	});
	grunt.registerTask('default', ['copy','sass:dist', 'watch', 'mustache_render:all']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mustache-render');
};
