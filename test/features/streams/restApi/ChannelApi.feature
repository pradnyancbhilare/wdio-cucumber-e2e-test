@streams_channel_api
Feature: Streams Home API Feature

Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams

Scenario: Test Channel Level Api
    And Get channel registrations
    And Get channel registrations count
    And Get channel passcode lists
    And Get channel members for passcode list
    And Get channel member count for passcode list
    And Get channel paid lists
    And Get channel members for paid list
    And Get stripe status
    And Get google analytics status
    And Check integration user details
    And Get integration solutions
    And Get settings auth admins