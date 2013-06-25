/*jshint unused:false, loopfunc:true*/
define([
    'dojo/_base/array',
    'dojo/_base/lang'
],

function (
    array,
    lang
    ) {
    return function (modulePath, stubs, forcedRefreshModules) {
        // inspired by: http://stackoverflow.com/questions/11439540/how-can-i-mock-dependencies-for-unit-testing-in-requirejs
        // and https://github.com/mattfysh/testr.js
        var aliases = [],
            key,
            stubname,
            returnModule,
            clonedAliases;

        require.undef(modulePath);

        // clear out any modules that need to be forced (usually dependencies that use the stubs)
        array.forEach(forcedRefreshModules, function (mod) {
            require.undef(mod);
        });

        // add stubs as aliases
        for (key in stubs) {
            if (stubs.hasOwnProperty(key)) {
                // clear any previously cached object for this alias
                require.undef(key);

                stubname = 'STUB_' + key;

                aliases.push([key, stubname]);

                define(stubname, [], function () {
                    return stubs[key];
                });
            }
        }

        // clone array because passing it in the require config messes with the values
        clonedAliases = lang.clone(aliases);

        // get module with stubs
        require({aliases: clonedAliases}, [modulePath], function (Module) {
            returnModule = Module;
        });

        // remove stub aliases
        var removedIndexs = [];
        array.forEach(require.aliases, function (al, i) {
            if (array.some(clonedAliases, function (cAl) {
                return al[0].test(cAl[0]);
            })) {
                removedIndexs.unshift(i);
            }
        });

        array.forEach(removedIndexs, function(i) {
            require.aliases.splice(i,1);
        });

        // clear cache again
        require.undef(modulePath);
        array.forEach(aliases, function (a) {
            require.undef(a[0]);
            require.undef(a[1]);
        });

        return returnModule;
    };
});