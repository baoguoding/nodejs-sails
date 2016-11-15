SphinxClient = require ("sphinxapi"),
util = require('util'),
assert = require('assert');

var cl = new SphinxClient();
cl.SetServer('localhost', 9312);
cl.Status(function(err, result) {
    assert.ifError(err);
    console.log(util.inspect(result, false, null, true));
})

cl.Query('nodejs|什么','question',function(err, result) {
    assert.ifError(err);
    console.log(util.inspect(result, false, null, true));

    console.log(result['matches']);

    //----------显示查到的id
    for(var key in result['matches']){
        console.log(key+':===:'+result['matches'][key].id);
    }


} );


