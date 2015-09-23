/* jshint unused:false */
require.config({
    baseUrl: './',
    packages: ['tests', 'src', {
        name: 'dojo',
        location: 'bower_components/dojo'
    }, {
        name: 'dijit',
        location: 'bower_components/dijit'
    }]
});
