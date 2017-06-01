"use strict";

var test             = require("tape")
  , DateFromTimezone = require("../");

test("Main", function (t) {
	t.equal(typeof DateFromTimezone, "function", "Supported");
	if (!DateFromTimezone) {
		t.end();
		return;
	}

	t.test("UTC", function (t) {
		var fromTimezone = new DateFromTimezone("UTC");

		t.deepEqual(fromTimezone.getDate(2017, 1), new Date(Date.UTC(2017, 1)));
		t.end();
	});

	t.test("Europe/Warsaw", function (t) {
		var fromTimezone = new DateFromTimezone("Europe/Warsaw");

		t.deepEqual(fromTimezone.getDate(2017, 1, 2, 18), new Date(Date.UTC(2017, 1, 2, 17)));
		t.deepEqual(
			fromTimezone.getDate(2017, 7, 2, 18),
			new Date(Date.UTC(2017, 7, 2, 16)),
			"DST"
		);
		t.end();
	});

	t.test("Asia/Shanghai", function (t) {
		var fromTimezone = new DateFromTimezone("Asia/Shanghai");

		t.deepEqual(fromTimezone.getDate(2017, 1, 2, 18), new Date(Date.UTC(2017, 1, 2, 10)));
		t.end();
	});

	t.test("Invalid usage", function (t) {
		t.throws(function () {
			// eslint-disable-next-line new-cap
			DateFromTimezone("UTC");
		}, TypeError);
		t.throws(function () {
			// eslint-disable-next-line no-new
			new DateFromTimezone("WRONG TIMEZONE");
		}, RangeError);

		var fromTimezone = new DateFromTimezone("Asia/Shanghai");

		t.throws(function () {
			fromTimezone.getDate();
		}, /Invalid getDate arguments: Expected/);
		t.throws(function () {
			fromTimezone.getDate(2015);
		}, /Invalid getDate arguments: Expected/);
		t.throws(function () {
			fromTimezone.getDate(2014999999999, 99);
		}, /Invalid getDate arguments: Invalid date data/);
		t.throws(function () {
			fromTimezone.getDate(-10, 1);
		}, /Invalid getDate arguments: No support for BC years/);
		t.end();
	});
	t.end();
});
