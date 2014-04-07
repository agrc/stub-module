require([
    'tests/Hello',
    'dojo/promise/Promise',
    'src/StubModule'
],

function (
    hello,
    Promise,
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
        it('removes all aliases', function (done) {
            require(['dojo/request/xhr'], function (xhr) {
                expect(xhr.name).toEqual('xhr');
                done();
            });
        });
    });
});