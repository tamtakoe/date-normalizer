(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.normalizeDate = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function setTimezoneOffset(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
}

function normalizeDateTime(date) {
    if (!date) {
        return new Date(date);
    }

    if (arguments.length > 1) {
        date = Array.prototype.slice.call(arguments);
    }

    if (Array.isArray(date)) {
        date = new (Function.prototype.bind.apply(Date, [null].concat(date)))();
    }

    var jsDate = new Date(date);

    if (date === Object(date)) {
        //Native or Moment.js date
        var momentBaseDate = date.creationData && date.creationData().input;

        if (!(momentBaseDate && (typeof momentBaseDate === 'number' || typeof momentBaseDate === 'string' && /:.+Z|GMT|[+-]\d\d:\d\d/.test(momentBaseDate)))) {
            setTimezoneOffset(jsDate); //Any data except moment.js date from timestamp or UTC string (UTC ISO format have to contains time)
        }

        return jsDate;
    }

    if (!isNaN(jsDate) && typeof date === 'string') {
        //ISO or RFC
        if (date.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/) && date.indexOf('GMT') === -1) {
            //RFC without GMT
            setTimezoneOffset(jsDate);
        }
    } else {
        //Timestamp (always in UTC)
        jsDate = new Date(Number(String(date).split('.').join('')));
    }

    return jsDate;
}

function normalizeDate(date, options) {
    date = normalizeDateTime(date);

    return (options || {}).noTime ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : date;
}

module.exports = normalizeDate;
},{}]},{},[1])(1)
});