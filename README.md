[![Build Status](https://travis-ci.org/agrc/StubModule.svg?branch=master)](https://travis-ci.org/agrc/StubModule)
StubModule.js
=============

A method for mocking AMD dependencies when testing JavaScript modules using the [Jasmine test suite](http://pivotal.github.com/jasmine/) and the [Dojo AMD loader](http://dojotoolkit.org/reference-guide/loader).

Inspired by [this stackoverflow question](http://stackoverflow.com/questions/11439540/how-can-i-mock-dependencies-for-unit-testing-in-requirejs) and [testr](https://github.com/mattfysh/testr.js).

Open tests/spec/SpecHello.js for a demo.

Setup
=====

`StubModule.js` can be loaded like any other AMD module.

When you want to stub a module:

    it('this is a demo', function (done) {
        stubModule('path/to/module', {'dep': stub}).then(function (StubbedModule) {
            var testObject = new StubbedModule();
            // tests/assertions
            done();
        });
    });

Other Notes
===========

Run `bower install` and `npm install` before running the tests. Run the tests by running `grunt travis`.

This will not work for the [ESRI JSAPI](http://help.arcgis.com/en/webapi/javascript/arcgis/) prior to version 3.4. However, at 3.4 they turned on the `dojo-undef-api` has tag and it works great!
