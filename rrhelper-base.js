/**
 * @file rrhelper-base.js
 * @description Extension methods for CanvasRenderingContext2D (aka the Object canvas.getContext("2d") returns)
 * @author Tsccai
 * @date 2021-11-26
 */



/**
 * @description Global shortcut to get element or DOM
 * @author Tsccai
 * @date 2021-11-27
 * @param {sting} sel - Selector of the DOM. It can receive id (add "#" as prefix ), className (add "." as prefix) and tagName (without prefix)
 * @returns {Element} The DOM(s) that selected.
 */
var $= function(sel) {
    if (sel.startsWith("#")) {
        return document.getElementById(sel.substring(1));
    }
    else if (sel.startsWith(".")) {
        return document.getElementsByClassName(sel.substring(1));
    }
    else {
        return document.getElementsByTagName(sel);
    }
}
var RRHelper = new Object();


    /**
     * @desc The RRHelper library object. (aka namespace)
     */
    // var RRHelper = new Object();

    /**
     * @description Get a float from element <input/> by id.
     * @author Tsccai
     * @date 2021-11-27
     * @param {string} id id of the element, should add "#" at the beginning.
     * @returns {number} value of the <input/>, return 0 if empty
     */
    RRHelper.getFloat = function (id) {
        var txt = $(id).value;
        var val = parseFloat(txt == "" ? 0 : txt);
        return val;
    }

    /**
     * @description  Get a integer from element <input/> by id.
     * @author Tsccai
     * @date 2021-11-27
     * @param {string} id id of the element, should add "#" at the beginning.
     * @returns {number}  value of the <input/>, return 0 if empty
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
        var arr = new Array(end - start + 1);
        var val = start;
        for (var i = 0; i < arr.length; i++) {
            arr[i] = val++;
        }


        for (var i = 0; i < arr.length; i++) {
            var idx_tail = arr.length - i - 1;
            for (var j = 0; j < idx_tail; j++) {
                var chs = this.random(0, idx_tail);
                var tmp = arr[idx_tail];
                arr[idx_tail] = arr[chs];
                arr[chs] = tmp;
            }
        }
        return arr;
    }


