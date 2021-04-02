/* 
 * rrhelper-vector.js
 * summary:
 * dependency: rrhelper-base.js
 */

RRHelper.Vector = function (mod, a_deg) {
    // overload:(a_cplx)
    this.mod = 0; this.arg = 0;
    if (a_deg != undefined) {
        this.mod = mod;
        this.arg = a_deg;
    }
    else {
        // a_cplx: 4+3j
    }
};

RRHelper.Vector.plus = function (va, vb) {
    var ja = va.mod * Math.sin(RRHelper.parseRad(va.arg));
    var ra = va.mod * Math.cos(RRHelper.parseRad(va.arg));

    var jb = vb.mod * Math.sin(RRHelper.parseRad(vb.arg));
    var rb = vb.mod * Math.cos(RRHelper.parseRad(vb.arg));

    var j = ja + jb;
    var r = ra + rb;

    var mod = Math.sqrt(r * r + j * j);
    var arg;
    if (r > 0) {
        arg = Math.atan(j / r) / Math.PI * 180; // r>0
    }
    else if (r < 0) {
        arg = Math.atan(j / r) / Math.PI * 180 + 180;
    }
    else {
        // r = 0, vector is on complex axis
        // j < 0, arg = -90,
        // j > 0, arg= 90
        if (j<0) {arg = -90;}
        else if(j>0){arg = 90;}
    }
    
    // value decroation
    if (Math.abs(mod)<1e-10){
        mod = 0;
    }
    if (Math.abs(arg)<1e-10){
        arg = 0;
    }
    if (Math.abs(Math.floor(arg) - arg)< 1e-8){
        arg = Math.floor(arg);
    }
    if (Math.abs(Math.ceil(arg) - arg)< 1e-8){
        arg = Math.ceil(arg);
    }
    // value decoration finish

    return new RRHelper.Vector(mod, arg);
};

// 矢量减法，数学模式
RRHelper.Vector.minus = function (va, vb) {
    var b = new RRHelper.Vector(vb.mod,vb.arg-180);
    
    return RRHelper.Vector.plus(va, b);
};