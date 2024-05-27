Feature: Create SVGs

  Scenario: Create an SVG
    Given I have a createSVG function
    When I create an SVG
    Then an SVG element is created

  Scenario: Create an SVG with default dimensions
    Given I do not specify width and height
    When I create an SVG
    Then the SVG should have a default width of 100 and height of 100

  Scenario: Create an SVG with specific dimensions
    Given a width of 150 and a height of 200
    When I create an SVG
    Then the SVG should have a width of 150 and a height of 200
