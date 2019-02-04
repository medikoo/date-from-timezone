"use strict";

const test        = require("tape")
    , getTokenize = require("../../get-tokenize");

test("Main", t => {
	t.equal(typeof getTokenize, "function", "Supported");
	if (!getTokenize) {
		t.end();
		return;
	}

	t.test("Memoize", t => {
		t.equal(getTokenize("UTC"), getTokenize("UTC"));
		t.end();
	});

	t.test("UTC", t => {
		const tokenize = getTokenize("UTC");

		t.deepEqual(tokenize(new Date(Date.UTC(2017, 1))), {
			year: 2017,
			month: 1,
			date: 1,
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		});
		t.end();
	});

	t.test("Europe/Warsaw", t => {
		const tokenize = getTokenize("Europe/Warsaw");

		t.deepEqual(tokenize(new Date(Date.UTC(2017, 1, 2, 17))), {
			year: 2017,
			month: 1,
			date: 2,
			hours: 18,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		});
		t.deepEqual(
			tokenize(new Date(Date.UTC(2017, 7, 2, 16))),
			{ year: 2017, month: 7, date: 2, hours: 18, minutes: 0, seconds: 0, milliseconds: 0 },
			"DST"
		);
		t.end();
	});

	t.test("Asia/Shanghai", t => {
		const tokenize = getTokenize("Asia/Shanghai");

		t.deepEqual(tokenize(new Date(Date.UTC(2017, 1, 2, 10))), {
			year: 2017,
			month: 1,
			date: 2,
			hours: 18,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		});
		t.end();
	});

	t.test("Milliseconds", t => {
		const tokenize = getTokenize("Europe/Warsaw");

		t.deepEqual(tokenize(new Date(Date.UTC(2017, 1, 2, 17, 14, 20, 123))), {
			year: 2017,
			month: 1,
			date: 2,
			hours: 18,
			minutes: 14,
			seconds: 20,
			milliseconds: 123
		});
		t.end();
	});

	t.test("Date object", t => {
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
			{
				year: 2017,
				month: 1,
				date: 2,
				hours: 18,
				minutes: 14,
				seconds: 20,
				milliseconds: 123
			}
		);
		t.end();
	});

	t.test("Invalid usage", t => {
		t.throws(() => { getTokenize("WRONG TIMEZONE"); }, RangeError);

		const tokenize = getTokenize("Asia/Shanghai");

		t.throws(() => {
			tokenize(new Date(2014999999999, 99));
		}, /Invalid Date is not valid Date object/u);
		t.throws(() => {
			tokenize(new Date(-10, 1));
		}, /Invalid arguments: No support for BC years/u);
		t.end();
	});
	t.end();
});
