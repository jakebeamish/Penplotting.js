# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- PRNG method randomSample() for sampling without replacement.
- Added tests to cover all PRNGAlgorithm implementations.

### Changed

- Simplified tests for Triangle and PRNG by extracting setups to beforeEach.

## [5.4.0] - 2025-01-30

### Added

- Vector getMagnitude and static distance methods support z-axis for 3D vectors.
- Matrix instance methods add and scale return this for chaining.
- Documentation for Matrix and SVGBuilder.
- Edits and improvements to PRNG documentation.
- More tests for Plot add method.
- Improved example plot.generate() function contents in README.md

## [5.3.0] - 2025-01-22

### Added

- Vector distance squared static method.
- Circle from Vector static constructor method.
- Random Vector in AABB static method.
- Random Vector in Circle static method.

### Changed

- Refactor object instantiation in Circle tests.

## [5.2.0] - 2025-01-20

### Added

- AABB and Triangle lines() methods accept optional object for stroke and strokeWidth.

### Fixed

## [5.1.0] - 2025-01-16

### Added

- Random Gaussian method using Box-Muller transform.

### Fixed

- Refactored Line.toSVGElement method to not include unused line direction (angle) variable.
- Minor refactorings to tests for readability.

## [5.0.2] - 2025-01-13

### Changed

- Paper objects now create new Paper instances when portrait or landscape is called.
- Improved testing for Paper class.

### Added

- Documentation for Paper objects.
- Path constructor typechecking input Vector array.
- Installed ESLint with eslint-prettier-config.

### Fixed

## [5.0.1] - 2025-01-07

### Fixed

- Bug where shapes were not properly using plot-wide defaults to set stroke and strokeWidth.

## [5.0.0] - 2025-01-06

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

[Unreleased]: https://github.com/jakebeamish/Penplotting.js/compare/v5.5.0...HEAD
[5.5.0]: https://github.com/jakebeamish/Penplotting.js/compare/v5.4.0...v5.5.0
[5.4.0]: https://github.com/jakebeamish/Penplotting.js/compare/v5.3.0...v5.4.0
[5.3.0]: https://github.com/jakebeamish/Penplotting.js/compare/v5.2.0...v5.3.0
[5.2.0]: https://github.com/jakebeamish/Penplotting.js/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/jakebeamish/Penplotting.js/compare/v5.0.2...v5.1.0
[5.0.2]: https://github.com/jakebeamish/Penplotting.js/compare/v5.0.1...v5.0.2
[5.0.1]: https://github.com/jakebeamish/Penplotting.js/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/jakebeamish/Penplotting.js/compare/v4.2.0...v5.0.0
[4.2.0]: https://github.com/jakebeamish/Penplotting.js/compare/v4.1.0...v4.2.0
