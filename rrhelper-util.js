/* 
 * rrhelper-util.js
 * summary:
 * dependency: rrhelper-vector.js
 */


/* Calculate Z.
 * @zr: Zr
 * @zx: Zx
 * @ratio: Zr/Zx
 * return: Z in complex form
 */
RRHelper.calcZ = function (zr, zx, ratio) {

    if (ratio != undefined && zx != 0) {
        zr = zx * ratio;
    }
    else if (ratio != undefined && zr != 0) {
        zx = zr / ratio;
    }
    var z = RRHelper.Vector.plus(new RRHelper.Vector(zr, 90 * (Math.sign(zr) - 1)), new RRHelper.Vector(zx, 90 * Math.sign(zx)));

    return z;
}

RRHelper.calcKz = function (kr, kx, ang) {
    ang = RRHelper.parseRad(ang);
    var kz = Math.sqrt(kr * kr * Math.cos(ang) * Math.cos(ang) + kx * kx * Math.sin(ang) * Math.sin(ang));
    return kz;
}

RRHelper.calcX = function(ang1, z){
    var x = (Math.sin(ang1) + Math.cos(ang1)/8 )* z;
    return x;
}