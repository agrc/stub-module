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
        var processedDependencies = [];

        var undefDependencies = function (mod) {
            console.log(mod);
            if (array.indexOf(processedDependencies, mod) !== -1) {
                return;
            }
            processedDependencies.push(mod);

            array.forEach(require.modules[modulePath].deps, function (dep) {
                undefDependencies(dep.mid);
            });
            require.undef(mod);
        };
        
        // require stubbed module just in case it hasn't been required
        // so that we can get it's dependencies
        require([modulePath], function () {
            undefDependencies(modulePath);

            // build maps
            var stubMap = {};
            stubMap['*'] = {};
            var resetMap = {};
            resetMap['*'] = {};
            for (var key in stubs) {
                if (stubs.hasOwnProperty(key)) {
                    // timestamp is to avoid a multiple define error when stubbing the same
                    // module twice. See 'can stub the same module more than once test'
                    stubname = 'STUB_' + key + Date.now();

                    stubMap['*'][key] = stubname;
                    resetMap['*'][key] = key;

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
        });

        return def.promise;
    };
});