[![Build Status](https://travis-ci.org/agrc/StubModule.svg?branch=master)](https://travis-ci.org/agrc/StubModule)
StubModule.js
=============

A method for mocking AMD dependencies when testing JavaScript modules that are loaded with the [Dojo AMD loader](http://dojotoolkit.org/reference-guide/loader).

Inspired by [this stackoverflow question](http://stackoverflow.com/questions/11439540/how-can-i-mock-dependencies-for-unit-testing-in-requirejs) and [testr](https://github.com/mattfysh/testr.js).

Open tests/spec/SpecHello.js for a demo.

Introduction
============

When testing AMD modules it is sometimes necessary to verify how it interacts with it's dependencies. For example, you might be writing a module that makes XHR requests using [`dojo/request`](http://dojotoolkit.org/reference-guide/dojo/request.html#dojo-request) and you want to make sure that it's passing the correct parameters. How would you test this? Creating a wrapper around the `request` method in your module and then spying on that method would work. You could also store the `request` method as a property of your module and spy on that in your tests. However, both of these solutions lead to messy code and there's something that feels wrong to me when adding code to production modules just for testing purposes.

You might think that it would be as easy as adding a [`map` config to the Dojo loader](http://dojotoolkit.org/reference-guide/loader/amd.html#id9) and pointing `dojo/request` to a mocked module. While this is a possible solution it means that you have to create a separate file for each mock that you use and it gets very messy if you want to mock the same module multiple times within a single test page (since modules are cached by the loader).

[StubModule.js](https://github.com/agrc/StubModule) provides a cleaner way to solve this problem. It allows you to stub modules with no dependencies on external files and no side effects to pollute your other tests. It does this by using the map config mentioned above as well as [`require.undef`](http://dojotoolkit.org/reference-guide/loader/amd.html#id12) which is a Dojo-specific method that removes a module from the cache.

Using this tool is fairly straight forward. `stub-module.js` returns a single method that accepts two parameters. The first is the module identifier (MID) of the module that you want to test. The second is an object with keys that are MID's of the dependencies that you want to mock and values that are the mocked returned values. The method returns a [promise](http://dojotoolkit.org/reference-guide/dojo/promise.html) that resolves with the stubbed module. For example (using [Jasmine](http://jasmine.github.io/)):

```js
it('this is a demo', function (done) {
    var stub = jasmine.createSpy('request');
    stubModule('test/Module', {'dojo/request': stub}).then(function (StubbedModule) {
        var testObject = new StubbedModule();
        testObject.makeRequest();

        expect(stub).toHaveBeenCalledWith('some/url');

        done();
    });
});
```

Other Notes
===========

Run `bower install` and `npm install` before running the tests. Run the tests by running `grunt travis`.

This code uses [require.undef](http://dojotoolkit.org/reference-guide/loader/amd.html#id12) which is not turned on by default in the Dojo loader. You can enable it by adding this has property to your dojo config:
```js
window.dojoConfig = {
    has: {
        'dojo-undef-api': true
    }
};
```

This will not work for the [ESRI JSAPI](http://help.arcgis.com/en/webapi/javascript/arcgis/) prior to version 3.4. However, at 3.4 they turned on the `dojo-undef-api` has tag and it works great!
