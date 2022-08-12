@streams_OD_session_update_time
Feature: Streams Update OD session end time API Feature

Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams

Scenario: Create On Demand session based Event
    Given Get all event templates for channel
    And Check new event name
    And Get all available tracks
    And Create new "On Demand" session based event
    And Get new event by event uuid
    And Check url for the new event

Scenario: Upload existing video to on demand Session
    And Get session details by id
    And Add video to a session

Scenario: Update Registration Steps to Event
    And Update registration profile and avatar steps to event
    And Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid   

Scenario: Complete registration live and navigate to sessions
    And Load the landing page using API
    And Fill general info form using API
    And Get generated page session using API
    And Validate registration user session using API
    And Fill profile info form using API
    And Fill avatar form without ticket using API
    And Validate registration using API
    And Validate registration user session using API
    And Navigate to On Demand session using API
    And Enter chat at On Demand session using API
    And Get chat at On Demand session using API
    And Enter question at On Demand session using API
    And Get questions at On Demand session using API
    And Enter answer at On Demand session using API
    And Get answers by question id at On Demand session using API
    And Update end time for session
    And Update page session end time
