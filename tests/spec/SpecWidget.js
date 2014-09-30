require([
    'dojo/dom-construct',

    'tests/Widget',

    'src/stub-module'
], function (
    domConstruct,

    Widget,

    stubmodule
    ) {
    describe('widgets', function () {
        it('mock widget dependency', function (done) {
            var widget = new Widget({}, domConstruct.create('div', {}, document.body));
            widget.test();
            widget.startup();

            stubmodule('tests/Widget', {
                'dojo/request': function () { return 'blah'; }
            }).then(function (StubbedModule) {
                var testWidget = new StubbedModule({}, domConstruct.create('div', {}, document.body));
                testWidget.startup();
                expect(testWidget.test()).toEqual('blah');
                testWidget.destroyRecursive();
                done();
            });

            widget.destroyRecursive();
        });
    });
});