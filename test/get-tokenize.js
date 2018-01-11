"use strict";

var test        = require("tape")
  , getTokenize = require("../get-tokenize");

test("Main", function (t) {
	t.equal(typeof getTokenize, "function", "Supported");
	if (!getTokenize) {
		t.end();
		return;
	}

	t.test("Memoize", function (t) {
		t.equal(getTokenize("UTC"), getTokenize("UTC"));
		t.end();
	});

	t.test("UTC", function (t) {
		var tokenize = getTokenize("UTC");

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

	t.test("Europe/Warsaw", function (t) {
		var tokenize = getTokenize("Europe/Warsaw");

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
			{
				year: 2017,
				month: 7,
				date: 2,
				hours: 18,
				minutes: 0,
				seconds: 0,
				milliseconds: 0
			},
			"DST"
		);
		t.end();
	});

	t.test("Asia/Shanghai", function (t) {
		var tokenize = getTokenize("Asia/Shanghai");

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

	t.test("Milliseconds", function (t) {
		var tokenize = getTokenize("Europe/Warsaw");

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

	t.test("Date object", function (t) {
		var tokenize = getTokenize("Europe/Warsaw")
		  , dateObject = tokenize(new Date(Date.UTC(2017, 1, 2, 17, 14, 20, 123))).dateObject;

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

	t.test("Invalid usage", function (t) {
		t.throws(function () {
			getTokenize("WRONG TIMEZONE");
		}, RangeError);

		var tokenize = getTokenize("Asia/Shanghai");

		t.throws(function () {
			tokenize(new Date(2014999999999, 99));
		}, /Invalid Date is not valid Date object/);
		t.throws(function () {
			tokenize(new Date(-10, 1));
		}, /Invalid arguments: No support for BC years/);
		t.end();
	});
	t.end();
});
