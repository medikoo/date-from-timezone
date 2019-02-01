"use strict";

const ensureDate   = require("es5-ext/date/valid-date")
    , assign       = require("es5-ext/object/assign")
    , ensureString = require("es5-ext/object/validate-stringifiable-value")
    , d            = require("d")
    , lazy         = require("d/lazy");

const refLocale = "en"
    , dateStrRe = /^(\d{2})\/(\d{2})\/(\d{1,4}), (\d{2}):(\d{2}):(\d{2})$/;

const formatOptions = {
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
	new Intl.DateTimeFormat(
		refLocale, assign({ timeZone: "Europe/Warsaw" }, formatOptions)
	).format(new Date(1496316716561)) !== "06/01/2017, 13:31:56" ||
	new Intl.DateTimeFormat(
		refLocale, assign({ timeZone: "Asia/Shanghai" }, formatOptions)
	).format(new Date(1496316716561)) !== "06/01/2017, 19:31:56"
) {
	module.exports = null;
	return;
}

const getFormatter = function (timezone) {
	return new Intl.DateTimeFormat(
		refLocale, assign({ timeZone: timezone }, formatOptions)
	);
};

const tokenizers = Object.create(null), yearZero = new Date(-1, 12, 2);

const Tokens = function (date, formatter) {
	const match = formatter.format(date).match(dateStrRe);
	this.year = Number(match[3]);
	this.month = Number(match[1]) - 1;
	this.date = Number(match[2]);
	this.hours = Number(match[4]);
	this.minutes = Number(match[5]);
	this.seconds = Number(match[6]);
	this.milliseconds = date.getMilliseconds();
};
Object.defineProperties(
	Tokens.prototype,
	lazy({
		dateObject: d(function () {
			return new Date(
				this.year, this.month, this.date, this.hours, this.minutes,
				this.seconds, this.milliseconds
			);
		})
	})
);

module.exports = function (timezone) {
	timezone = ensureString(timezone);
	if (tokenizers[timezone]) return tokenizers[timezone];

	const formatter = getFormatter(timezone);

	return (tokenizers[timezone] = function (date) {
		ensureDate(date);
		if (date < yearZero) {
			throw new TypeError("Invalid arguments: No support for BC years");
		}
		return new Tokens(date, formatter);
	});
};
