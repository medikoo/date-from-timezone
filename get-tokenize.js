"use strict";

var ensureDate   = require("es5-ext/date/valid-date")
  , assign       = require("es5-ext/object/assign")
  , ensureString = require("es5-ext/object/validate-stringifiable-value");

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

var getFormatter = function (timezone) {
	return new Intl.DateTimeFormat(refLocale, assign({ timeZone: timezone }, formatOptions));
};

var tokenizers = Object.create(null), yearZero = new Date(-1, 12, 2);

module.exports = function (timezone) {
	timezone = ensureString(timezone);
	if (tokenizers[timezone]) return tokenizers[timezone];

	var formatter = getFormatter(timezone);

	return tokenizers[timezone] = function (date) {
		ensureDate(date);
		if (date < yearZero) {
			throw new TypeError("Invalid arguments: No support for BC years");
		}
		var match = formatter.format(date).match(dateStrRe);
		return {
			year: Number(match[3]),
			month: Number(match[1]) - 1,
			date: Number(match[2]),
			hours: Number(match[4]),
			minutes: Number(match[5]),
			seconds: Number(match[6]),
			milliseconds: date.getMilliseconds()
		};
	};
};
