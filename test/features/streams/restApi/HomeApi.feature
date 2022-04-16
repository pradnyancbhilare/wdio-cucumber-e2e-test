Feature: Streams Home API Feature

@streams_home_api
Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams