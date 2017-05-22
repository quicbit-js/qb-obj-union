var test = require('test-kit').tape()
var union = require('.')

test('union no cb', function (t) {
    t.table_assert([
        [ 'obj1',               'obj2',                     'exp' ],
        [ {},                   {},                         {} ],
        [ {a:null},             {b:undefined},              {} ],
        [ {a:1},                {},                         {a:1} ],
        [ {},                   {a:1},                      {a:1} ],
        [ {a:1},                {a:2},                      {a:2} ],
        [ {a:1},                {b:2},                      {a:1,b:2} ],
        [ {a:1, b:2, c:3},      {a:null, b:undefined, c:7}, {a:1, b:2, c:7} ],
    ], union)
})

function max(a,b) { return Math.max(a,b) }
function min(a,b) { return Math.min(a,b) }
test('union with cb', function (t) {
    t.table_assert([
        [ 'obj1',               'obj2',             'cb',       'exp' ],
        [ {a:7, b:2},           {a:1, b:6},         max,        {a:7, b:6} ],
        [ {a:7, b:2},           {a:1, b:6},         min,        {a:1, b:2} ],
    ], union)
})