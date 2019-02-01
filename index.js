"use strict";

const copyDate    = require("es5-ext/date/#/copy")
  , getTokenize = require("./get-tokenize");

if (!getTokenize) {
	module.exports = null;
	return;
}

var resolveDate = function (refDate, resultDate, tokenize) {
	const tokens = tokenize(resultDate);
	const resolvedDate = new Date(
		tokens.year,
		tokens.month,
		tokens.date,
		tokens.hours,
		tokens.minutes,
		tokens.seconds,
		tokens.milliseconds
	);

	if (resolvedDate.getTime() === refDate.getTime()) return resultDate;
	resultDate.setTime(resultDate.getTime() + refDate.getTime() - resolvedDate.getTime());
	return resolveDate(refDate, resultDate, tokenize);
};

module.exports = function (timezone) {
	const tokenize = getTokenize(timezone);

	// eslint-disable-next-line no-unused-vars
	return function (year, month /* , date, hours, minutes, seconds, milliseconds*/) {
		if (isNaN(year) || isNaN(month)) {
			throw new TypeError(
				"Invalid arguments: Expected: " +
					"year, month[, date[, hours[, minutes[, second[, milliseconds]]]]]"
			);
		}
		const date = new Date(
			year,
			month,
			arguments[2] || 1,
			arguments[3] || 0,
			arguments[4] || 0,
			arguments[5] || 0,
			arguments[6] || 0
		);
		return resolveDate(date, copyDate.call(date), tokenize);
	};
};
