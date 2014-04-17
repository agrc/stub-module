/*jshint unused:false, loopfunc:true*/
define([
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/Deferred'

], function (
    array,
    lang,
    Deferred
    ) {
    return function (modulePath, stubs) {
        var key;
        var stubname;
        var returnModule;
        var def = new Deferred();

        // clear any existing cache for this module
        require.undef(modulePath);

        // build maps
        var stubMap = {};
        stubMap[modulePath] = {};
        var resetMap = {};
        resetMap[modulePath] = {};
        for (key in stubs) {
            if (stubs.hasOwnProperty(key)) {
                // timestamp is to avoid a multiple define error when stubbing the same
                // module twice. See 'can stub the same module more than once test'
                stubname = 'STUB_' + key + Date.now();

                stubMap[modulePath][key] = stubname;
                resetMap[modulePath][key] = key;

                define(stubname, [], function () {
                    return stubs[key];
                });
            }
        }

        // get module with stubs
        require({
            map: stubMap
        }, [modulePath], function (Module) {
            // clear cache again
            require.undef(modulePath);

            // reset map
            require({map: resetMap});

            def.resolve(Module);
        });

        return def.promise;
    };
});