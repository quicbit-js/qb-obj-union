# qb-obj-union

Union two objects together with callback to handle collisions (optional).

Both null and undefined values are treated as unset values (not propagated).

## Install

    npm install qb-obj-union
    
## Simple Usage

    var union = require('qb-obj-union')

union two objects - just one level

    union( { a:1 }, { b:2 } )
    
    > { a:1, b:2 }

    
Collisions favor right-side object (see callback usage to override this) 

    union( { a:1 }, { b:2, a:3 } )
    
    > { a:3, b:2 }
    
Null and undefined are ignored

    union ( { a:null },  { b:undefined } )    
       
    > {}
       
## Callback Usage

The callback handles collision values during the union.  The default callback
will simply return the right-most value.  Since null and undefined values are 
always ignored by union, an object null will never override another value, which is usually
desirable.  So, if you define the callback, you can be sure that two non-null
values were encountered for the same key.

Here are two simple collisions handlers - min and max (which happens to be what we use in the tests as well)

    var union = require('qb-obj-union')

    function max(a,b) { return Math.max(a,b) }
    function min(a,b) { return Math.min(a,b) }

With no callback (default) union returns right-most values:

    union( { q:1, r:9, s:12 }, { q:100, r:-4 } )

    > { q:100, r:-4, s:12 }
    
Using max:

    union( { q:1, r:9, s:12 }, { q:100, r:-4 }, max )

    > { q:100, r:9, s:12 }
    
Using min:

    union( { q:1, r:9, s:12 }, { q:100, r:-4 }, min )

    > { q:1, r:-4, s:12 }
    

Using min for q and max for everything else (r):


    function cb(a, b, key) {
        if (key === 'q') { return Math.min(a,b) }
        else { return Math.max(a,b) }
    }
    union( { q:1, r:9, s:12 }, { q:100, r:-4 }, cb )

    > { q:1, r:9, s:12 }
