/* 
 * rrhelper-vector.js
 * summary:
 * dependency: rrhelper-base.js
 */

RRHelper.Vector = function (mod, ang) {
    // overload:(a_cplx)
    this.mod = 0; this.ang = 0;
    if (ang != undefined) {
        this.mod = mod;
        this.ang = ang;
    }
    else {
        // a_cplx: 4+3j
    }
};

RRHelper.Vector.plus = function (va, vb) {
    var ja = va.mod * Math.sin(RRHelper.parseRad(va.ang));
    var ra = va.mod * Math.cos(RRHelper.parseRad(va.ang));

    var jb = vb.mod * Math.sin(RRHelper.parseRad(vb.ang));
    var rb = vb.mod * Math.cos(RRHelper.parseRad(vb.ang));

    var j = ja + jb;
    var r = ra + rb;

    var mod = Math.sqrt(r * r + j * j);
    var ang;
    if (r > 0) {
        ang = Math.atan(j / r) / Math.PI * 180; // r>0
    }
    else if (r < 0) {
        ang = Math.atan(j / r) / Math.PI * 180 + 180;
    }
    else {
        // r = 0, vector is on complex axis
        // j < 0, arg = -90,
        // j > 0, arg= 90
        if (j < 0) { ang = -90; }
        else if (j > 0) { arg = 90; }
    }

    // value decroation
    if (Math.abs(mod) < 1e-8) {
        mod = 0;
    }
    if (Math.abs(ang) < 1e-8) {
        ang = 0;
    }
    if (Math.abs(Math.floor(ang) - ang) < 1e-8) {
        ang = Math.floor(ang);
    }
    if (Math.abs(Math.ceil(ang) - ang) < 1e-8) {
        ang = Math.ceil(ang);
    }
    // value decoration finish

    return new RRHelper.Vector(mod, ang);
};

// 矢量减法，数学模式
RRHelper.Vector.minus = function (va, vb) {
    var b = new RRHelper.Vector(vb.mod, vb.ang - 180);

    return RRHelper.Vector.plus(va, b);
};



RRHelper.Vector.modUniformize = function (vectors, maxMod) {
    if (maxMod == 0) {
        throw exception("Illegal argument, maxLen can't be 0.");
    }
    if (vectors == undefined || vectors == null || vectors.length == 0) {
        return [];
    }

    let mods = []; let rst = [];
    for (let i = 0; i < vectors.length; i++) {
        mods.push(vectors[i].mod);
        rst[i] = new RRHelper.Vector(vectors[i].mod, vectors[i].ang);
    }
    mods.sort((a, b) => b - a);
    let maxValue = mods[0];
    let factor = maxMod / maxValue;
    for (let i = 0; i < rst.length; i++) {
        rst[i].mod *= factor;
    }
    return rst;
};
