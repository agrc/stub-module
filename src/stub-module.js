/*jshint unused:false, loopfunc:true*/
define([
    'dojo/Deferred',
    'dojo/_base/lang'
], function (
    Deferred,
    lang
) {
    return function (modulePath, stubs) {
        var stubname;
        var returnModule;
        var def = new Deferred();

        require.undef(modulePath);

        var defineStub = function (sName, stub) {
            define(sName, [], function () {
                return stub;
            });
        };

        // build maps
        var stubMap = {};
        stubMap['*'] = {};
        var resetMap = {};
        resetMap['*'] = {};
        for (var key in stubs) {
            if (stubs.hasOwnProperty(key)) {
                require.undef(key);

                // timestamp is to avoid a multiple define error when stubbing the same
                // module twice. See 'can stub the same module more than once test'
                stubname = 'STUB_' + key + Date.now();

                stubMap['*'][key] = stubname;
                resetMap['*'][key] = key;

                defineStub(stubname, stubs[key]);
            }
        }
        require.cache();

        // get module with stubs
        require({
            map: stubMap
        }, [modulePath], function (StubbedModule) {
            // clear cache from stubs again
            for (var key in stubs) {
                if (stubs.hasOwnProperty(key)) {
                    require.undef(key);
                }
            }

            // reset map
            require({map: resetMap});

            // require original module again just to make sure
            // that all dependencies are cached again
            require([modulePath], function () {
                // but return subbed module
                def.resolve(StubbedModule);
            });
        });

        return def.promise;
    };
});
