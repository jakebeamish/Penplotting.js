Feature: Add line to SVG

  Scenario: Add a line to an SVG element
    Given I have an empty SVG element
    When I add a line to the SVG
    Then the SVG element should contain the new line

  Scenario: Add a line with specific coordinates
    Given I have an empty SVG element
    When I add a line with startpoint of 0,0 and endpoint 1,1
    Then the SVG element should contain a line with startpoint 0,0 and endpoint 1,1