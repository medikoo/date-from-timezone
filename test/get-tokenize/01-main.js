"use strict";

const test        = require("tape")
    , getTokenize = require("../../get-tokenize");

const toPlainObject = value => JSON.parse(JSON.stringify(value));

test("getTokenize", t => {
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

		t.deepEqual(toPlainObject(tokenize(new Date(Date.UTC(2017, 1)))), {
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

		t.deepEqual(toPlainObject(tokenize(new Date(Date.UTC(2017, 1, 2, 17)))), {
			year: 2017,
			month: 1,
			date: 2,
			hours: 18,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		});
		t.deepEqual(
			toPlainObject(tokenize(new Date(Date.UTC(2017, 7, 2, 16)))),
			{ year: 2017, month: 7, date: 2, hours: 18, minutes: 0, seconds: 0, milliseconds: 0 },
			"DST"
		);
		t.end();
	});

	t.test("Asia/Shanghai", t => {
		const tokenize = getTokenize("Asia/Shanghai");

		t.deepEqual(toPlainObject(tokenize(new Date(Date.UTC(2017, 1, 2, 10)))), {
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

		t.deepEqual(toPlainObject(tokenize(new Date(Date.UTC(2017, 1, 2, 17, 14, 20, 123)))), {
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
	t.end();
});
