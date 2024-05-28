Feature: Create Line

  Scenario: Create a Line
    Given coordinates of start and end points
    When I create a line
    Then a line exists with those start and end points