# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [3.0.0](https://github.com/medikoo/date-from-timezone/compare/v2.2.0...v3.0.0) (2019-02-05)

### Features

-   convert to ES2015 ([cf21835](https://github.com/medikoo/date-from-timezone/commit/cf21835))
-   support one argument time value input ([eedb5c0](https://github.com/medikoo/date-from-timezone/commit/eedb5c0))
-   upgrade to ES2015 ([d7eb57e](https://github.com/medikoo/date-from-timezone/commit/d7eb57e))

### BREAKING CHANGES

-   Drop ES5 support

<a name="2.2.0"></a>

# [2.2.0](https://github.com/medikoo/date-from-timezone/compare/v2.1.1...v2.2.0) (2018-01-11)

### Features

-   introduce dateObject token ([e8a386a](https://github.com/medikoo/date-from-timezone/commit/e8a386a))

<a name="2.1.1"></a>

## [2.1.1](https://github.com/medikoo/date-from-timezone/compare/v2.1.0...v2.1.1) (2017-08-31)

<a name="2.1.0"></a>

# [2.1.0](https://github.com/medikoo/date-from-timezone/compare/v2.0.2...v2.1.0) (2017-08-29)

### Features

-   seclude getTokenize utility ([1865ee2](https://github.com/medikoo/date-from-timezone/commit/1865ee2))

<a name="2.0.2"></a>

## [2.0.2](https://github.com/medikoo/date-from-timezone/compare/v2.0.1...v2.0.2) (2017-06-05)

### Bug Fixes

-   recalculation didn't handle milliseconds as expected ([7ce8bd8](https://github.com/medikoo/date-from-timezone/commit/7ce8bd8))

<a name="2.0.1"></a>

## [2.0.1](https://github.com/medikoo/date-from-timezone/compare/v2.0.0...v2.0.1) (2017-06-02)

<a name="2.0.0"></a>

# [2.0.0](https://github.com/medikoo/date-from-timezone/compare/v1.0.1...v2.0.0) (2017-06-01)

### Features

-   simplify public interface ([f9b7974](https://github.com/medikoo/date-from-timezone/commit/f9b7974))

### BREAKING CHANGES

-   Public API changed.

Before:

var dateFromWarsaw = new DateFromTimezone("Europe/Warsaw");
dateFromWarsaw.getDate(year, month);

After:

var getWarsawDate = dateFromTimezone("Europe/Warsaw");
getWarsawDate(year, month);

<a name="1.0.1"></a>

## [1.0.1](https://github.com/medikoo/date-from-timezone/compare/v1.0.0...v1.0.1) (2017-06-01)

<a name="1.0.0"></a>

# 1.0.0 (2017-06-01)
