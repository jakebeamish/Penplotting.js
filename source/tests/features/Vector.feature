Feature: Vector

  Scenario: Create a Vector from an array
  Given an array of numbers [1, 5]
  When I create a Vector from that array
  Then I should recieve a Vector with x = 1 and y = 5

  Scenario: Calculate the magnitude of a Vector
  Given a vector with x = 3 and y = 4
  When I calculate the magnitude
  Then I should recieve a magnitude value of 5