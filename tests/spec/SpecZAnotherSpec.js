require([
    'dojo/request/xhr'
], function (
    xhr
    ) {
    describe('another spec', function () {
        it('doesn\'t mess with mappings for other specs', function () {
            // console.dir(xhr);
            expect(xhr.name).toEqual('xhr');
        });
    });
});
