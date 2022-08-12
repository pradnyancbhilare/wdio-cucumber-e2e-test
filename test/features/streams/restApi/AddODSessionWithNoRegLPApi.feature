@streams_on_demand_session_No_Reg_LP
Feature: Streams with On Demand session without registration, Landing Page and Home Page

Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams

Scenario: Create On Demand session based Event without Reg, LP and Home page.
    Given Get all event templates for channel
    And Check new event name
    And Get all available tracks
    And Add Event with "On Demand" session and No registration and No LP
    And Get new event by event uuid
    And Check url for the new event
    And Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid 