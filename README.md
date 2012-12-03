StubModule.js
=============

A method for mocking AMD dependencies when testing JavaScript modules using the [Jasmine test suite](http://pivotal.github.com/jasmine/) and the [Dojo AMD loader](http://dojotoolkit.org/reference-guide/loader).

Inspired by [this stackoverflow question](http://stackoverflow.com/questions/11439540/how-can-i-mock-dependencies-for-unit-testing-in-requirejs) and [testr](https://github.com/mattfysh/testr.js).

Open SpecRunner.html for a demo.

Setup
=====

`SpecRunner.js` can be loaded like any other AMD module.

When you want to stub a module:

    var StubbedModule = StubModule('path/to/module', {'dep': stubb});
    var testObject = new StubbedModule();

Other Notes
===========

This project loads `dojo` and `jasmine` as git submodules so make sure that you run:

    git submodule update --init --recursive

...after cloning the repository.