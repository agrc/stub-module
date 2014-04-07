define([
    'dojo/request/xhr'
],

function (
    xhr
    ) {
    return {
        getData: function () {
            return xhr('blah');
        },
        xhr: xhr
    };
});