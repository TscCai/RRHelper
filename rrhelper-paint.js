/**
 * @file rrhelper-paint.js
 * @description Extension methods for CanvasRenderingContext2D (aka the Object canvas.getContext("2d") returns)
 * @requires rrhelper-base.js
 * @author Tsccai
 * @date 2021-11-26
 */

RRHelper.lengthUniformize = function (arr, maxLen) {
    if (maxLen == 0) {
        throw exception("Illegal argument, maxLen can't be 0.");
    }
    
    let tmp = [...arr];
    tmp.sort((a, b) => b - a);
    let maxValue = tmp[0];
    let factor = maxLen / maxValue;
    for (let i = 0; i < arr.length; i++) {
        arr[i] *= factor;
    }
    return arr;
}

RRHelper.LineToArgs = {
    "Polar": 1,
    "Rectangular": 2,
    "StartArrow": 4,
    "EndArrow": 8
};

/**
 * @description The extension method for CanvasRenderingContext2D.lineTo()
 * @date 2021-11-27
 * @param {number} sX Horizontal coordinate of the start point
 * @param {number} sY Vertical coordinate of the start point
 * @param {number} a Variable argument, if args contain RRHelper.LineToArgs.Polar, then a is the length of the line. 
 *                   Or args contain RRHelper.LineToArgs.Rectangular, then a is the horizontal coordinate of the end point.
 * @param {number} b Variable argument, if args contain RRHelper.LineToArgs.Polar, then a is the angle of the line with 0 degree (3 o'clock direction). 
 *                   Or args contain RRHelper.LineToArgs.Rectangular, then a is the vertical coordinate of the end point.
 * @param {RRHelper.LineToArgs} args The arguments when draw line, it should be set up with operator "|" to append multiple arguments.
 * @returns {Object} return an Object as: {x: number, y: number, direct: number}. 
 *                   @param {number} x: Horizontal coordinate of the end point.
 *                   @param {number} y: Vertical coordinate of the end point.
 *                   @param {number} direct: The direction that the line point to, in degree (0 degree is the 3 o'clock)
 */
CanvasRenderingContext2D.prototype.lineToEx = function (sX, sY, a, b, args) {
    var len, ang, eX, eY;
    if (args == undefined) {

    }
    else if ( (args & (RRHelper.LineToArgs.Rectangular | RRHelper.LineToArgs.Polar)) == (RRHelper.LineToArgs.Rectangular | RRHelper.LineToArgs.Polar)) {
        throw exception("Error argument of args, Rectangular and Polar can't be set at the same time.");
    }

    args = args == undefined ? RRHelper.LineToArgs.Rectangular : args;
    this.beginPath();

    this.moveTo(sX, sY);

    if (args & RRHelper.LineToArgs.Rectangular) {
        eX = a;
        eY = b;
    }
    else if (args & RRHelper.LineToArgs.Polar) {
        len = a;
        ang = b;

        eX = sX + len * Math.cos(RRHelper.parseRad(ang));
        eY = sY - len * Math.sin(RRHelper.parseRad(ang));
    }
    this.lineTo(eX, eY);
    var dx = Math.abs(eX - sX) < 10e-8 ? 0 : eX - sX;
    var dy = eY - sY;
    var k, direct;
    k = dx != 0 ? dy / dx : -1 * Math.sign(dy) * Infinity;
    direct = dx > 0 ? Math.atan(k) : Math.atan(k) + Math.PI;
    direct = RRHelper.parseDeg(direct);
    if (args & RRHelper.LineToArgs.EndArrow) {
        this.lineArrow(eX, eY, direct);
    }
    if (args & RRHelper.LineToArgs.StartArrow) {
        this.lineArrow(sX, sY, direct + 180);
    }
    this.stroke();
    return { x: eX, y: eY, direct: direct };
};

/**
 * @description The extension method to draw an arrow at the given point.
 * @author Tsccai
 * @date 2021-11-27
 * @param {number} sX The X-axis value of the head of the arrow.
 * @param {number} sY The Y-axis value of the head of the arrow.
 * @param {number} direct The direction the arrow point, in degree.
 * @param {number} len The length of the arrow.
 * @param {number} ang The filed angle of the arrow.
 */
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
    this.stroke();
};

