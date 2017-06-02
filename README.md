[![Build status][circleci-image]][circleci-url]
[![Build status][appveyor-image]][appveyor-url]
[![Test coverate][codecov-image]][codecov-url]

# date-from-timezone
## Construct dates with timezone context

Having __timezone__ and __date & time__ information resolve __regular date instance that reflects given time point__.

Light implementation which resolves needed data through natively available (in all modern engines, both browsers and Node.js) [Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/1.0/#sec-12.1).

_If loaded in environment which does not provide `Intl.DateTimeFormat` or of which support is incomplete, module resolves to `null`_

### Example

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
