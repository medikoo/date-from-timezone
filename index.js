"use strict";

const copyDate    = require("es5-ext/date/#/copy")
    , getTokenize = require("./get-tokenize");

if (!getTokenize) {
	module.exports = null;
	return;
}

const resolveDate = function (refDate, resultDate, tokenize) {
	const resolvedDate = tokenize(resultDate).dateObject;

	if (resolvedDate.getTime() === refDate.getTime()) return resultDate;
	resultDate.setTime(resultDate.getTime() + refDate.getTime() - resolvedDate.getTime());
	return resolveDate(refDate, resultDate, tokenize);
};

module.exports = function (timezone) {
	const tokenize = getTokenize(timezone);

	return function (year, month, date = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
		if (isNaN(year) || isNaN(month)) {
			throw new TypeError(
				"Invalid arguments: Expected: " +
					"year, month[, date[, hours[, minutes[, second[, milliseconds]]]]]"
			);
		}
		const sampleDate = new Date(year, month, date, hours, minutes, seconds, milliseconds);
		return resolveDate(sampleDate, copyDate.call(sampleDate), tokenize);
	};
};
