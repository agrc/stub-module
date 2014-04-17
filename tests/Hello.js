define([
    'dojo/request/xhr',
    'dojo/aspect'
],

function (
    xhr,
    aspect
    ) {
    return {
        getData: function () {
            return xhr('blah');
        },
        xhr: xhr,
        testAspect: function () {
            return aspect();
        }
    };
});