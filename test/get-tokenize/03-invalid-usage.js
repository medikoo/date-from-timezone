"use strict";

const test        = require("tape")
    , getTokenize = require("../../get-tokenize");

test("getTokenize - Invalid Usage", t => {
	t.equal(typeof getTokenize, "function", "Supported");
	if (!getTokenize) {
		t.end();
		return;
	}

	t.throws(() => { getTokenize("WRONG TIMEZONE"); }, RangeError);

	const tokenize = getTokenize("Asia/Shanghai");

	t.throws(() => {
		tokenize(new Date(2014999999999, 99));
	}, /Invalid Date is not valid Date object/u);
	t.throws(() => { tokenize(new Date(-10, 1)); }, /Invalid arguments: No support for BC years/u);
	t.end();
});
