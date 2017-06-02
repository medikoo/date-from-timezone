"use strict";

var copyDate     = require("es5-ext/date/#/copy")
  , assign       = require("es5-ext/object/assign")
  , ensureString = require("es5-ext/object/validate-stringifiable-value")
  , d            = require("d");

var refLocale = "en", dateStrRe = /^(\d{2})\/(\d{2})\/(\d{1,4}), (\d{2}):(\d{2}):(\d{2})$/;

var formatOptions = {
	hour12: false,
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit"
};

// Detect support
if (
	typeof Intl !== "object" ||
	!Intl ||
	typeof Intl.DateTimeFormat !== "function" ||
	typeof Intl.DateTimeFormat.supportedLocalesOf !== "function" ||
	Intl.DateTimeFormat.supportedLocalesOf(refLocale)[0] !== refLocale ||
	new Intl.DateTimeFormat(refLocale, assign({ timeZone: "Europe/Warsaw" }, formatOptions)).format(
		new Date(1496316716561)
	) !== "06/01/2017, 13:31:56" ||
	new Intl.DateTimeFormat(refLocale, assign({ timeZone: "Asia/Shanghai" }, formatOptions)).format(
		new Date(1496316716561)
	) !== "06/01/2017, 19:31:56"
) {
	module.exports = null;
	return;
}

// Localized date string tokenizer
var tokenizeDateStr = function (str) {
	var match = str.match(dateStrRe);

	return {
		year: Number(match[3]),
		month: Number(match[1]) - 1,
		date: Number(match[2]),
		hours: Number(match[4]),
		minutes: Number(match[5]),
		seconds: Number(match[6])
	};
};

var DateFromTimezone = function (timezone) {
	this.timezone = ensureString(timezone);
	this._formatter = new Intl.DateTimeFormat(
		refLocale,
		assign({ timeZone: this.timezone }, formatOptions)
	);
};

var yearZero = new Date(-1, 12, 2);

Object.defineProperties(DateFromTimezone.prototype, {
	getDate: d(function (year, month /*, date, hours, minutes, seconds, milliseconds*/) {
		if (isNaN(year) || isNaN(month)) {
			throw new TypeError(
				"Invalid getDate arguments: Expected: " +
					"year, month[, date[, hours[, minutes[, second[, milliseconds]]]]]"
			);
		}
		var refDate = new Date(
			year,
			month,
			arguments[2] || 1,
			arguments[3] || 0,
			arguments[4] || 0,
			arguments[5] || 0,
			arguments[6] || 0
		);

		if (isNaN(refDate)) {
			throw new TypeError("Invalid getDate arguments: Invalid date data");
		}
		if (refDate < yearZero) {
			throw new TypeError("Invalid getDate arguments: No support for BC years");
		}
		return this._resolveDate(refDate, copyDate.call(refDate));
	}),
	_resolveDate: d(function (refDate, resultDate) {
		var tokens = tokenizeDateStr(this._formatter.format(resultDate));
		var resolvedDate = new Date(
			tokens.year,
			tokens.month,
			tokens.date,
			tokens.hours,
			tokens.minutes,
			tokens.seconds
		);

		if (resolvedDate.getTime() === refDate.getTime()) return resultDate;
		resultDate.setTime(resultDate.getTime() + refDate.getTime() - resolvedDate.getTime());
		return this._resolveDate(refDate, resultDate);
	})
});

module.exports = function (timezone) {
	var dateGenerator = new DateFromTimezone(timezone), getDate = dateGenerator.getDate;

	// eslint-disable-next-line no-unused-vars
	return function (year, month /*, date, hours, minutes, seconds, milliseconds*/) {
		return getDate.apply(dateGenerator, arguments);
	};
};
