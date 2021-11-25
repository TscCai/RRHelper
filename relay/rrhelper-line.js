/* 
 * rrhelper-line.js
 * summary: Calculation about line protection
 * dependency: rrhelper-vector.js
 */

RRHelper.Line = new Object();
RRHelper.Line.PHS_A = 0;
RRHelper.Line.PHS_B = -120;
RRHelper.Line.PHS_C = 120;

RRHelper.Line.singlePhaseDistance = function (i, z, kz, ang, u_phs) {
    var u = (1 + kz) * i * z;
    var result = u;
    if (ang != undefined && u_phs != undefined) {
        result = new Object();
        result.u = u;
        result.i_phs = u_phs - ang;
    }
    return result;
}

RRHelper.Line.doublePhaseDistance = function (i, z, ang, u_phs1, u_phs2) {
    var ue = 100 / Math.sqrt(3);
    var u_phs_sp = RRHelper.parseRad(0 - u_phs1 - u_phs2);
    var uu = 2 * i * z;
    var result = uu;
    if (ang != undefined && u_phs1 != undefined && u_phs2 != undefined) {
        // for direction vector temp
        var u1, u2;
        if (u_phs1 + u_phs2 == RRHelper.Line.PHS_A + RRHelper.Line.PHS_B) {
            u1 = new RRHelper.Vector(1, RRHelper.Line.PHS_A);
            u2 = new RRHelper.Vector(1, RRHelper.Line.PHS_B);
        }
        else if (u_phs1 + u_phs2 == RRHelper.Line.PHS_B + RRHelper.Line.PHS_C) {
            u1 = new RRHelper.Vector(1, RRHelper.Line.PHS_B);
            u2 = new RRHelper.Vector(1, RRHelper.Line.PHS_C);
        }
        else if (u_phs1 + u_phs2 == RRHelper.Line.PHS_C + RRHelper.Line.PHS_A) {
            u1 = new RRHelper.Vector(1, RRHelper.Line.PHS_C);
            u2 = new RRHelper.Vector(1, RRHelper.Line.PHS_A);
        }


        result = new Object();
        result.ul = uu;
        var up = Math.sqrt(ue * ue / 4 + result.ul * result.ul / 4);
        // 数学上的矢量减法：AB= B- A
        // 电力上的矢量减法：Uab = Ua - Ub
        var uu_phs = RRHelper.Vector.minus(u2, u1).ang;
        var ii_phs = RRHelper.parseDeg(uu_phs) - ang;

        // 数学矢量减法： i12 = i2 - i1
        // 电力矢量减法： i12 = i1-i2
        result.i2 = new RRHelper.Vector(i, ii_phs);
        result.i1 = new RRHelper.Vector(i, ii_phs - 180);

        u1.ang = u_phs_sp + Math.PI + Math.asin(result.ul / 2 / up);
        u2.ang = u_phs_sp + Math.PI - Math.asin(result.ul / 2 / up);
        u1.len = up;
        u2.len = up;

        result.u1 = u1;
        result.u2 = u2;


    }
    return result;
}