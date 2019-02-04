"use strict";

const test             = require("tape")
    , dateFromTimezone = require("../");

test("Main", t => {
	t.equal(typeof dateFromTimezone, "function", "Supported");
	if (!dateFromTimezone) {
		t.end();
		return;
	}

	t.test("UTC", t => {
		const getDate = dateFromTimezone("UTC");

		t.deepEqual(getDate(2017, 1), new Date(Date.UTC(2017, 1)));
		t.end();
	});

	t.test("Europe/Warsaw", t => {
		const getDate = dateFromTimezone("Europe/Warsaw");

		t.deepEqual(getDate(2017, 1, 2, 18), new Date(Date.UTC(2017, 1, 2, 17)));
		t.deepEqual(getDate(2017, 7, 2, 18), new Date(Date.UTC(2017, 7, 2, 16)), "DST");
		t.end();
	});

	t.test("Asia/Shanghai", t => {
		const getDate = dateFromTimezone("Asia/Shanghai");

		t.deepEqual(getDate(2017, 1, 2, 18), new Date(Date.UTC(2017, 1, 2, 10)));
		t.end();
	});

	t.test("Milliseconds", t => {
		const getDate = dateFromTimezone("Europe/Warsaw");

		t.deepEqual(
			getDate(2017, 1, 2, 18, 14, 20, 123), new Date(Date.UTC(2017, 1, 2, 17, 14, 20, 123))
		);
		t.end();
	});

	t.test("Invalid usage", t => {
		t.throws(() => { dateFromTimezone("WRONG TIMEZONE"); }, RangeError);

		const getDate = dateFromTimezone("Asia/Shanghai");

		t.throws(() => { getDate(); }, /Invalid arguments: Expected/u);
		t.throws(() => { getDate(2015); }, /Invalid arguments: Expected/u);
		t.throws(() => { getDate(2014999999999, 99); }, /Invalid Date is not valid Date object/u);
		t.throws(() => { getDate(-10, 1); }, /Invalid arguments: No support for BC years/u);
		t.end();
	});
	t.end();
});
