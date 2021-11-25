/* 
 * rrhelper-paint.js
 * summary:
 * dependency: rrhelper-base.js
 */

RRHelper.LineToArgs = {
    "Polar": 1,
    "Rectangular": 2,
    "StartArrow": 4,
    "EndArrow": 8
};

CanvasRenderingContext2D.prototype.lineToEx = function (sX, sY, a, b, flag) {
    var len, ang, eX, eY;
    flag = flag == undefined ? RRHelper.LineToArgs.Rectangular : flag;
    this.beginPath();

    this.moveTo(sX, sY);

    if (flag & RRHelper.LineToArgs.Rectangular) {
        eX = a;
        eY = b;
    }
    else if (flag & RRHelper.LineToArgs.Polar) {
        len = a;
        ang = b;

        eX = sX + len * Math.cos(RRHelper.parseRad(ang));
        eY = sY - len * Math.sin(RRHelper.parseRad(ang));
    }
    this.lineTo(eX, eY);

    var dx = eX - sX;
    var dy = eY - sY;

    var k, direct;
    k = dx != 0 ? dy / dx : dy / (1 / Infinity);
    direct = dx > 0 ? Math.atan(k) : Math.atan(k) + Math.PI;
    direct = RRHelper.parseDeg(direct);
  

    if (flag & RRHelper.LineToArgs.EndArrow) {
        this.lineArrow(eX, eY, direct);
    }

    if (flag & RRHelper.LineToArgs.StartArrow) {
        this.lineArrow(sX, sY,  direct + 180);
    }

    return { x: eX, y: eY, direct: direct };
};


CanvasRenderingContext2D.prototype.lineArrow = function (sX, sY, direct, len, ang) {
    len = len == undefined ? 15 : len;
    ang = ang == undefined ? 20 : ang;  // in degree

    var rDirect = RRHelper.parseRad(direct);
    var tmpX = sX - len * Math.cos(rDirect);
    var tmpY = sY - len * Math.sin(rDirect);

    // Draw one side of the arrow.  
   

    var rAng = RRHelper.parseRad(ang);
    // Turn transfer coordinates: (Δx*cosθ- Δy * sinθ+ xB, Δy*cosθ + Δx * sinθ+ yB)
    var eX = (tmpX - sX) * Math.cos(rAng) - (tmpY - sY) * Math.sin(rAng) + sX;
    var eY = (tmpY - sY) * Math.cos(rAng) + (tmpX - sX) * Math.sin(rAng) + sY;
    this.moveTo(sX, sY);
    this.lineTo(eX, eY);

    // Draw the other side.
    rAng = RRHelper.parseRad(ang * -1);
    eX = (tmpX - sX) * Math.cos(rAng) - (tmpY - sY) * Math.sin(rAng) + sX;
    eY = (tmpY - sY) * Math.cos(rAng) + (tmpX - sX) * Math.sin(rAng) + sY;
    this.moveTo(sX, sY);
    this.lineTo(eX, eY);

};

