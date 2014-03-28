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
    return function (modulePath, stubs, forcedRefreshModules) {
        var aliases = [];
        var originalAliases = lang.clone(require.aliases);
        var key;
        var stubname;
        var returnModule;
        var clonedAliases;
        var def = new Deferred();

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
        require({
            aliases: clonedAliases
        }, [modulePath], function (Module) {
            // remove stub aliases
            require.aliases = originalAliases;

            // clear cache again
            require.undef(modulePath);
            array.forEach(aliases, function (a) {
                require.undef(a[0]);
                require.undef(a[1]);
            });

            def.resolve(Module);
        });

        return def.promise;
    };
});