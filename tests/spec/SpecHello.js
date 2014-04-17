require([
    'tests/Hello',

    'dojo/promise/Promise',
    'dojo/promise/all',

    'src/stub-module'
],

function (
    hello,

    Promise,
    all,

    stubModule
    ) {
    describe('src/Hello', function () {
        it('returns a Promise when it\'s not stubbed', function () {
            expect(hello.getData()).toEqual(jasmine.any(Promise));
        });
        it('stubs the xhr module', function (done) {
            var value = 'blah';
            stubModule('tests/Hello', {
                'dojo/request/xhr': jasmine.createSpy('xhrSpy').and.returnValue(value)
            }).then(function (helloStubbed) {
                expect(helloStubbed.getData()).toEqual(value);
                done();
            });
        });
        it('can stub the same module more than once', function (done) {
            var test = function (value) {
                return stubModule('tests/Hello', {
                    'dojo/aspect': jasmine.createSpy('aspectSpy').and.returnValue(value)
                }).then(function (helloStubbed) {
                    expect(helloStubbed.testAspect()).toEqual(value);
                });
            };

            all([test(1), test(2)]).then(function () {
                done();
            });
        });
        it('removes all aliases', function (done) {
            require(['dojo/request/xhr'], function (xhr) {
                expect(xhr.name).toEqual('xhr');
                done();
            });
        });
    });
});