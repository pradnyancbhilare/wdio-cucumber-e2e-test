@streams_delete_duplicate_api
Feature: Streams Duplicate and Delete API Feature

Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams

Scenario: Create all sessions based Event with multiple languages
    Given Get all event templates for channel
    And Check new event name
    And Get all available tracks
    And Create new all sessions based event
    And Get new event by event uuid
    And Check url for the new event
    And Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid  

Scenario: Update the Passcode to this event
    When The shared passcode is updated to the event
    Then The shared passcode is verified as added to event
    And Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid 

Scenario: Change the Broadcast session streaming to RTMP
    When Update the session with new streaming type
    Then Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid 

Scenario: Duplicate and Delete an event
    And Duplicate the event
    And Delete the duplicated event