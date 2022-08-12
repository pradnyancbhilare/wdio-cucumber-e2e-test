@overlays_gr_api

Feature: GR Overlays

Scenario: Log in and create standalone Greenroom
    Given Login to greenroom with greenroom
    And Get all standalone GR channels
    And Create new standalone GR Event

Scenario: Check Producer is able to duplicate the default overlay
    Then Get all overlays
    Then Duplicate the overlay named Brandlive
    Then Send write state with enabled graphics

Scenario: Check Producer is able to upload JPG file
    And Upload a jpg to GR Event
    And Upload the jpg to AWS
    And Notify backend that upload has completed
    And Create thumbnail for jpg
    And Upload thumbnail to AWS
    And Notify backend that upload has completed
    And Tell the backend to create the jpg media item
    And Request the newly created media item

Scenario: Check Producer is able to convert JPG file to overlay
    And Post Load Shots
    And Create overlay from jpg media item
    And Send write state with enabled graphics
    And Delete jpg media item
    And Post Bulk Edit Shots
    And Post Load Shots
  

