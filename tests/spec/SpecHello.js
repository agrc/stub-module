require([
    'tests/Hello',
    'dojo/promise/Promise',
    'src/StubModule'
],

function (
    Hello,
    Promise,
    stubModule
    ) {
    describe('src/Hello', function () {
        it('returns a Promise when it\'s not stubbed', function () {
            expect(new Hello()).toEqual(jasmine.any(Promise));
        });
        it('stubs the xhr module', function () {
            var value = 'blah';
            var HelloStubbed = stubModule('test/Hello', {
                'dojo/request/xhr': jasmine.createSpy('xhrSpy').andReturn(value)
            });

            expect(new HelloStubbed()).toEqual(value);
        });
        it('removes all aliases', function () {
            var originalLength = require.aliases.length;
            stubModule('src/Hello', {
                'dojo/request/xhr': 'blah'
            });

            expect(require.aliases.length).toBe(originalLength);
        });
    });
});