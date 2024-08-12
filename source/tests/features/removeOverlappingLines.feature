Feature: Remove overlapping lines
    Scenario: Remove an overlapping line
        Given a sketch with a long line
        When a shorter overlapping line is added
        Then the shorter line should not be added to the SVG

