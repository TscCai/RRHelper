// Global shortcut to get element or dom
function $(id) {
    return document.getElementById(id);
}

var RRHelper = new Object();

/* Get a float from element <input/> by id.
 * @id: string, id of the element
 * return: value of the <input/>, return 0 if empty
 */
RRHelper.getFloat = function (id) {
    var txt = $(id).value;
    var val = parseFloat(txt == "" ? 0 : txt);
    return val;
}

/* Get a integer from element <input/> by id.
 * @id: string, id of the element
 * return: value of the <input/>, return 0 if empty
 */
RRHelper.getInt = function (id) {
    var txt = $(id).value;
    var val = parseInt(txt == "" ? 0 : txt);
    return val;
}

/* Parse an angle from deg to rad.
 * @deg: degree of the angle
 * return: the radian of the angle
 */
RRHelper.parseRad = function (deg) {
    return deg / 180 * Math.PI;
}

/* Parse an angle from rad to deg.
 * @rad: radian of the angle
 * return: the degree of the angle
 */
RRHelper.parseDeg = function (rad) {
    return rad / Math.PI * 180;
}



/* Generate a random number in given range.
 * @start: the low bound of the range
 * @end: the up bound of the range
 * @decimal: decimal digits count
 * return: the degree of the angle, return intger if @decimal is undefined or 0
 */
RRHelper.random = function (start, end, decimal) {
    // deal with undefined argument
    decimal = decimal == undefined ? 0 : decimal;

    if (end < start || decimal < 0) {
        throw "illegal arguments.";
    }
    var result = Math.round(((end - start) * Math.random() + start) * Math.pow(10, decimal)) / Math.pow(10, decimal);
    return result;
}

RRHelper.randomArray = function (start, end) {
    throw "unimplement method."
}