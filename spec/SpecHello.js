require([
    'src/Hello',
    'dojo/promise/Promise',
    'StubModule'
],

function (
    Hello,
    Promise,
    StubModule
    ) {
    describe('src/Hello', function () {
        it("returns a Promise when it's not stubbed", function () {
            expect(Hello()).toEqual(jasmine.any(Promise));
        });
        it('stubs the xhr module', function () {
            var value = 'blah';
            var Hello_Stubbed = StubModule('src/Hello', {
                'dojo/request/xhr': jasmine.createSpy('xhrSpy').andReturn(value)
            });

            expect(Hello_Stubbed()).toEqual(value);
        });
        it("removes all aliases", function () {
            var originalLength = require.aliases.length;
            StubModule('src/Hello', {
                'dojo/request/xhr': 'blah'
            });

            expect(require.aliases.length).toBe(originalLength);
        });
    });
});