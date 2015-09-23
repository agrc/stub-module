/* jshint unused:false */
var dojoConfig = {
    async: true,
    baseUrl: './',
    packages: ['tests', 'src', {
        name: 'dojo',
        location: 'bower_components/dojo'
    }, {
        name: 'dijit',
        location: 'bower_components/dijit'
    }],
    has: {
        'dojo-undef-api': true
    }
};
