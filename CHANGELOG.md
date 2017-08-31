# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.1"></a>
## [2.1.1](https://github.com/medikoo/date-from-timezone/compare/v2.1.0...v2.1.1) (2017-08-31)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/medikoo/date-from-timezone/compare/v2.0.2...v2.1.0) (2017-08-29)


### Features

* seclude getTokenize utility ([1865ee2](https://github.com/medikoo/date-from-timezone/commit/1865ee2))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/medikoo/date-from-timezone/compare/v2.0.1...v2.0.2) (2017-06-05)


### Bug Fixes

* recalculation didn't handle milliseconds as expected ([7ce8bd8](https://github.com/medikoo/date-from-timezone/commit/7ce8bd8))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/medikoo/date-from-timezone/compare/v2.0.0...v2.0.1) (2017-06-02)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/medikoo/date-from-timezone/compare/v1.0.1...v2.0.0) (2017-06-01)


### Features

* simplify public interface ([f9b7974](https://github.com/medikoo/date-from-timezone/commit/f9b7974))


### BREAKING CHANGES

* Public API changed.

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
