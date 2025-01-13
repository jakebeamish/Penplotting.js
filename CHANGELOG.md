# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.0.2]

### Changed

- Paper objects now create new Paper instances when portrait or landscape is called.
- Improved testing for Paper class.

### Added

- Documentation for Paper objects.
- Path constructor typechecking input Vector array.
- Installed ESLint with eslint-prettier-config.

### Fixed

## [5.0.1]

### Fixed

- Bug where shapes were not properly using plot-wide defaults to set stroke and strokeWidth.

## [5.0.0]

### Changed

- Line-line intersection returns a Vector object rather than an array of vector components.

### Added

- Matrix class for 3D rendering.
- Point class that can be drawn as a tiny circle or tiny line.
- Get centroid and midpoints methods for Triangle class.
- Documentation for Triangle class.
- Documentation for Vector methods getMagnitudeSquared and distanceSquared.
- Improvements to documentation for Vector, AABB, Point, Matrix.
- Tags in changelog now link to GitHub.

### Fixed

- Incorrect Triangle class JSDoc annotation caused class methods to be hidden.
- Points are now cleared properly when the Plot is cleared.

## [4.2.0] - 2024-12-05

### Added

- This CHANGELOG.md file for documenting what has changed in new releases.
- Triangle class with lines method.

[Unreleased]: https://github.com/jakebeamish/Penplotting.js/compare/v5.0.2...HEAD
[5.0.2]: https://github.com/jakebeamish/Penplotting.js/compare/v5.0.1...v5.0.2
[5.0.1]: https://github.com/jakebeamish/Penplotting.js/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/jakebeamish/Penplotting.js/compare/v4.2.0...v5.0.0
[4.2.0]: https://github.com/jakebeamish/Penplotting.js/compare/v4.1.0...v4.2.0
