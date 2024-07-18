Feature: Create SVG Paths

    Scenario: Add a Path to an SVG file
        Given I have an SVG element and a list of points
        When I create an SVG path from those points
        Then the SVG element contains that path
    