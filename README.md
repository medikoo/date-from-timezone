[![Build status][build-image]][build-url]
[![Tests coverage][cov-image]][cov-url]
[![npm version][npm-image]][npm-url]

# date-from-timezone

## Construct date instances within timezone context or resolve date/time information for given timezone

Having **timezone** and **date & time information** resolve **regular date instance that reflects given time point**, or
having **timezone** and **date instance** resolve **date & time information for given timezone**.

Light implementation which resolves needed data through natively available (in all modern engines, both browsers and Node.js) [Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/1.0/#sec-12.1).

_If loaded in environment which does not provide `Intl.DateTimeFormat` or of which support is incomplete, module resolves to `null`_

### Examples

#### Construct date instances in specific timezone context

```javascript
var dateFromTimezone = require("date-from-timezone");

var getWarsawDate = dateFromTimezone("Europe/Warsaw");
var getShanghaiDate = dateFromTimezone("Asia/Shanghai");

// Signature of getXDate follows: Date(yearOrTimeValue[, month[, date[, hour[, minutes[, seconds[, milliseconds]]]]])
var warsawNoon = getWarsawDate(2017, 6, 5, 12);
// also e.g.
warsawNoon = getWarsawDate(Date.parse("7/5/2017 12:00:00 PM"));

var shanghaiNoon = getShanghaiDate(2017, 6, 5, 12);

console.log(warsawNoon.toISOString()); // "2017-07-05T10:00:00.000Z" (12PM in Warsaw was at 10AM UTC)
console.log(shanghaiNoon.toISOString()); // "2017-07-05T04:00:00.000Z" (12PM in Shanghai was at 4AM UTC)
```

#### Resolve date & time information for given timezone

```javascript
var getTokenize = require("date-from-timezone/get-tokenize");

var warsawTokenize = getTokenize("Europe/Warsaw");
var shanghaiTokenize = getTokenize("Asia/Shanghai");

console.log(warsawTokenize(new Date(Date.UTC(2017, 6, 5, 10))));
// { year: 2017, month 6, date: 5, hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }

console.log(shanghaiTokenize(new Date(Date.UTC(2017, 6, 5, 4))));
// { year: 2017, month 6, date: 5, hours: 12, minutes: 0, seconds: 0, milliseconds: 0 }

// We can also retrieve date object. It's important to understand that it won't reflect given time
// point (so should not be used for date timestamp comparisons) but can be used as interim value
// to be used to get formatted date string
console.log(String(shanghaiTokenize(new Date(Date.UTC(2017, 6, 5, 4))).dateObject));
// In CEST Timezone it'll log:
// "Wed Jul 05 2017 12:00:00 GMT+0200 (CEST)"
```

### Installation

    $ npm install date-from-timezone

### Tests

    $ npm test

[build-image]: https://github.com/medikoo/date-from-timezone/workflows/Integrate/badge.svg
[build-url]: https://github.com/medikoo/date-from-timezone/actions?query=workflow%3AIntegrate
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/date-from-timezone.svg
[cov-url]: https://codecov.io/gh/medikoo/date-from-timezone
[npm-image]: https://img.shields.io/npm/v/date-from-timezone.svg
[npm-url]: https://www.npmjs.com/package/date-from-timezone
