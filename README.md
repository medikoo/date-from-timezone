# date-from-timezone
## Construct dates with timezone context

Having timezone and date/time information resolves regular date instance that reflects given time point.

Light implementation with resolution on widely supported in modern engines [Intl.DateTimeFormat](http://www.ecma-international.org/ecma-402/1.0/#sec-12.1) interface.

_If loaded in environment that do not provide `Intl.DateTimeFormat` or of which support is incomplete, module resolves to `null`_

### Example

```javascript
var DateFromTimezone = require("./");

var dateFromWarsaw = new DateFromTimezone("Europe/Warsaw");
var warsawNoon = dateFromWarsaw.getDate(2017, 6, 5, 12);
console.log(warsawNoon.toISOString()); // "2017-07-05T10:00:00.000Z" (12PM in Warsaw was at 10AM in UTC)

var dateFromShanghai = new DateFromTimezone("Asia/Shanghai");
var shanghaiNoon = dateFromShanghai.getDate(2017, 6, 5, 12);
console.log(shanghaiNoon.toISOString()); // "2017-07-05T04:00:00.000Z" (12PM in Shanghai was at 4AM in UTC)
```

### Installation

	$ npm install date-from-timezone

### Tests

Project cross-browser compatibility supported by:

<a href="https://browserstack.com"><img src="https://bstacksupport.zendesk.com/attachments/token/Pj5uf2x5GU9BvWErqAr51Jh2R/?name=browserstack-logo-600x315.png" height="150" /></a>
