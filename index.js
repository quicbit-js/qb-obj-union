module.exports = function (obj1, obj2, cb) {
    cb = cb || function (v1, v2) { return v2 }    // give right-precedence
    var o1, o2, k1, k2
    var keys1 = Object.keys(obj1)
    var keys2 = Object.keys(obj2)
    // biggest object first
    if (keys2.length > keys1.length)    { o1 = obj2; k1 = keys2; o2 = obj1; k2 = keys1 }
    else                                { o1 = obj1; k1 = keys1; o2 = obj2; k2 = keys2 }
    var ret = {}
    var i, k
    for (i = 0; i < k1.length; i++) {
        k = k1[i]
        if (o1[k] != null) {
            ret[k] = o1[k]
        }
    }
    for (i = 0; i < k2.length; i++) {
        k = k2[i]
        if (o2[k] != null) {
            ret[k] = ret[k] == null ? o2[k] :
                cb(obj1[k], obj2[k], k) }
        }
    return ret
}
