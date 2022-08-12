@streams_registration_ticket_api
Feature: Streams Registration API Feature

Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams

Scenario: Create all sessions based Event
    Given Get all event templates for channel
    And Check new event name
    And Get all available tracks
    And Create new all sessions based event
    And Get new event by event uuid
    And Check url for the new event
    And Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid   

Scenario: Add the ticket to the Event    
    And Get confirmation from the Stripe
    And Get exhange rate information
    And Get all global currencies for event 
    And Get new event by event uuid
    And Update the event with the ticket info
    And Publish event
    And Get event publish status by event uuid  

Scenario: Update Registration Steps to Event
    And Update registration profile, avatar and ticket steps to event
    And Publish event
    And Get event publish status by event uuid 

Scenario: Complete registration live and navigate to sessions
    And Load the landing page using API
    And Fill general info form using API
    And Get generated page session using API
    And Validate registration user session using API
    And Fill profile info form using API
    And Fill avatar form with ticket using API
    And Make card payment using API
    And Validate registration using API
    And Validate registration user session using API

