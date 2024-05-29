Feature: Sketch

  Scenario: Create a sketch
  Given I want to create a sketch object to contain an SVG element and stuff
  When when I create a sketch object
  Then a sketch object should exist

  Scenario: Read Lines from the lines array and add them to the SVG
  Given the sketch may have a line in it's lines array
  When I add that line to the SVG
  Then the SVG should contain that line

  Scenario: Add a sketch SVG to the document body
  Given I want to see the sketch
  When I append the SVG to the document
  Then the SVG should be contained in the document

  Scenario: Add lines to the SVG and then add the SVG to the document body
  Given I want to generate and see the sketch simply
  When I call sketch.draw()
  Then lines should be added and the SVG should be shown
  