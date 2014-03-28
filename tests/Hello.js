define([
    'dojo/request/xhr'
],

function (
    xhr
    ) {
    return function getData() {
        return xhr('blah');
    };
});