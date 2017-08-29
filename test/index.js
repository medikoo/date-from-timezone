"use strict";

var test             = require("tape")
  , dateFromTimezone = require("../");

test("Main", function (t) {
	t.equal(typeof dateFromTimezone, "function", "Supported");
	if (!dateFromTimezone) {
		t.end();
		return;
	}

	t.test("UTC", function (t) {
		var getDate = dateFromTimezone("UTC");

		t.deepEqual(getDate(2017, 1), new Date(Date.UTC(2017, 1)));
		t.end();
	});

	t.test("Europe/Warsaw", function (t) {
		var getDate = dateFromTimezone("Europe/Warsaw");

		t.deepEqual(getDate(2017, 1, 2, 18), new Date(Date.UTC(2017, 1, 2, 17)));
		t.deepEqual(getDate(2017, 7, 2, 18), new Date(Date.UTC(2017, 7, 2, 16)), "DST");
		t.end();
	});

	t.test("Asia/Shanghai", function (t) {
		var getDate = dateFromTimezone("Asia/Shanghai");

		t.deepEqual(getDate(2017, 1, 2, 18), new Date(Date.UTC(2017, 1, 2, 10)));
		t.end();
	});

	t.test("Milliseconds", function (t) {
		var getDate = dateFromTimezone("Europe/Warsaw");

		t.deepEqual(
			getDate(2017, 1, 2, 18, 14, 20, 123),
			new Date(Date.UTC(2017, 1, 2, 17, 14, 20, 123))
		);
		t.end();
	});

	t.test("Invalid usage", function (t) {
		t.throws(function () {
			dateFromTimezone("WRONG TIMEZONE");
		}, RangeError);

		var getDate = dateFromTimezone("Asia/Shanghai");

		t.throws(function () {
			getDate();
		}, /Invalid arguments: Expected/);
		t.throws(function () {
			getDate(2015);
		}, /Invalid arguments: Expected/);
		t.throws(function () {
			getDate(2014999999999, 99);
		}, /Invalid Date is not valid Date object/);
		t.throws(function () {
			getDate(-10, 1);
		}, /Invalid arguments: No support for BC years/);
		t.end();
	});
	t.end();
});
