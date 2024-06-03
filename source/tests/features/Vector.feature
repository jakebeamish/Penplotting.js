Feature: Vector

  Scenario: Create a Vector from an array
  Given an array of numbers [1, 5]
  When I create a Vector from that array
  Then I should recieve a Vector with x = 1 and y = 5

  Scenario: Calculate the magnitude of a Vector
  Given a vector with x = 3 and y = 4
  When I calculate the magnitude
  Then I should recieve a magnitude value of 5

  Scenario: Calculate the distance to another Vector from this Vector
  Given a vector (1, 1) and another (1, 6)
  When I calculate the distance between them
  Then I should recieve a result of 5

  Scenario: Add one vector to another
  Given two vectors 3,3 and 1,1
  When I add them together
  Then I should recieve a new vector 4,4

  Scenario: Subtract one vector from another
  Given two vectors 1,1 and 3,3
  When I subtract the first from the second
  Then the second vector should now be 2,2

  Scenario: Static addition of two vectors
  Given two vectors (1, 3) and (5, 4)
  When I add them together using Vector.add()
  Then a new vector (6, 7) should be returned

  Scenario: Static subtraction of two vectors
  Given two vectors (10, 10) and (5, 4)
  When I subtract them using Vector.subtract()
  Then a new vector (5, 6) should be returned