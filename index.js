"use strict";

const copyDate     = require("es5-ext/date/#/copy")
    , isValue      = require("es5-ext/object/is-value")
    , ensureNumber = require("es5-ext/object/ensure-finite-number")
    , getTokenize  = require("./get-tokenize");

if (!getTokenize) {
	module.exports = null;
	return;
}

const resolveDate = function (refDate, resultDate, tokenize) {
	// refDate is a local time zone date that expresses the time we're after in the target timezone
	// resultDate is a potentially correct result
	const resolvedDate = tokenize(resultDate).dateObject;
	// resolvedDate shows in local time zone time that resultDate represents in the target timezone
	// If they are the same, we are done
	if (resolvedDate.getTime() === refDate.getTime()) return resultDate;
	resultDate.setTime(resultDate.getTime() + refDate.getTime() - resolvedDate.getTime());
	return resolveDate(refDate, resultDate, tokenize);
};

module.exports = function (timezone) {
	const tokenize = getTokenize(timezone);

	return function (
		yearOrTimeValue,
		month = null,
		date = 1,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0
	) {
		yearOrTimeValue = ensureNumber(yearOrTimeValue);
		let sampleDate;
		if (isValue(month)) {
			month = ensureNumber(month);
			sampleDate = new Date(
				yearOrTimeValue, month, date, hours, minutes, seconds, milliseconds
			);
		} else {
			sampleDate = new Date(yearOrTimeValue);
		}
		return resolveDate(sampleDate, copyDate.call(sampleDate), tokenize);
	};
};
