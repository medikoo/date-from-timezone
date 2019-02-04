"use strict";

const test        = require("tape")
    , getTokenize = require("../../get-tokenize");

test("getTokenize - Date Object", t => {
	t.equal(typeof getTokenize, "function", "Supported");
	if (!getTokenize) {
		t.end();
		return;
	}

	const tokenize = getTokenize("Europe/Warsaw")
	    , { dateObject } = tokenize(new Date(Date.UTC(2017, 1, 2, 17, 14, 20, 123)));

	t.ok(dateObject instanceof Date);
	t.deepEqual(
		{
			year: dateObject.getFullYear(),
			month: dateObject.getMonth(),
			date: dateObject.getDate(),
			hours: dateObject.getHours(),
			minutes: dateObject.getMinutes(),
			seconds: dateObject.getSeconds(),
			milliseconds: dateObject.getMilliseconds()
		},
		{ year: 2017, month: 1, date: 2, hours: 18, minutes: 14, seconds: 20, milliseconds: 123 }
	);
	t.end();
});
