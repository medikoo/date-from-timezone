[![Build status][circleci-image]][circleci-url]
[![Build status][appveyor-image]][appveyor-url]
[![Tests coverage][codecov-image]][codecov-url]

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

// Signature of getXDate follows: Date(year, month[, date[, hour[, minutes[, seconds[, milliseconds]]]]])
var warsawNoon = getWarsawDate(2017, 6, 5, 12);
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
console.log(
	String(shanghaiTokenize(new Date(Date.UTC(2017, 6, 5, 4))).dateObject)
);
// In CEST Timezone it'll log:
// "Wed Jul 05 2017 12:00:00 GMT+0200 (CEST)"
```

### Installation

    $ npm install date-from-timezone

### Tests

    $ npm test

Project cross-browser compatibility supported by:

<a href="https://browserstack.com"><img src="https://bstacksupport.zendesk.com/attachments/token/Pj5uf2x5GU9BvWErqAr51Jh2R/?name=browserstack-logo-600x315.png" height="150" /></a>

[circleci-image]: https://img.shields.io/circleci/project/github/medikoo/date-from-timezone.svg
[circleci-url]: https://circleci.com/gh/medikoo/date-from-timezone
[appveyor-image]: https://img.shields.io/appveyor/ci/medikoo/date-from-timezone.svg
[appveyor-url]: https://ci.appveyor.com/project/medikoo/date-from-timezone
[codecov-image]: https://img.shields.io/codecov/c/github/medikoo/date-from-timezone.svg
[codecov-url]: https://codecov.io/gh/medikoo/date-from-timezone
