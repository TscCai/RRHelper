/* 
 * rrhelper-vector.js
 * summary:
 * dependency: rrhelper-base.js
 */

RRHelper.Vector = function (a, a_deg) {
    // overload:(a_cplx)
    this.len = 0; this.ang = 0;
    if (a_deg != undefined) {
        this.len = a;
        this.ang = RRHelper.parseRad(a_deg);
    }
    else {
        // a_cplx: 4+3j
    }
};

RRHelper.Vector.plus = function (va, vb) {
    var ja = va.len * Math.sin(va.ang);
    var ra = va.len * Math.cos(va.ang);

    var jb = vb.len * Math.sin(vb.ang);
    var rb = vb.len * Math.cos(vb.ang);

    var j = ja + jb;
    var r = ra + rb;

    var len = Math.sqrt(r * r + j * j);
    var ang;
    if (r > 0) {
        ang = Math.atan(j / r) / Math.PI * 180; // r>0
    }
    else if (r < 0) {
        ang = Math.atan(j / r) / Math.PI * 180 + 180;
    }
    else {
        ang = Math.asin(j) / Math.PI * 180
    }

    return new RRHelper.Vector(len, ang);
};

// 矢量减法，数学模式
RRHelper.Vector.minus = function (va, vb) {
    vb.ang -= Math.PI;
    return RRHelper.Vector.plus(va, vb);
};