@streams_smoketest1_api
Feature: This feature file is used for testing smoke test scenario 1

# Add Event with all types of session with English Language and registration
# Add passcode list (Email with Passcode)
# Registration Email Confirmation Required
# Add Profile Info and Avatar
# Publish and Go live
# Complete the registration flow successfully with registration email required
# Check the Home page and all session pages
# Make sure the uploaded video or linked video is played successfully
# Make sure the Breakout Room session is working as expected
# Make sure the Fireside session is working as expected
# Make sure the moderator functionality worked

Scenario: Login and test Streams Home Api
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

Scenario: Create, update a new passcode lists and add to event
    When A new passcode list of type email and passcode is created
    And An event is updated with the passcode list
    Then The passcode list will be verifed as added to event
    And Get new event by event uuid
    And Get event publish status by event uuid
    And Publish event
    And Get event publish status by event uuid  

Scenario: Update the event for email confirmation required
    And Get channel passcode lists
    And Get registration questions for event
    And Update event with email confirmation required
    And Publish event
    And Get event publish status by event uuid 

Scenario: Enable Profile Info and Avatar to Event and publish
    And Update registration profile and avatar steps to event
    And Publish event
    And Get event publish status by event uuid 

Scenario: Upload existing video to on demand Session
    And Get session details by id
    And Add video to a session
    And Start action
    And Milestone action
    And End action
    And Publish event
    And Get event publish status by event uuid 

Scenario: Go live and Complete registration live 
    Given Load the landing page using API
    When Fill general info form using API
    And Get generated page session using API
    And Validate registration user session using API
    And Fill profile info form using API
    And Fill avatar form without ticket using API
    Then Validate registration using API
    And Validate registration user session using API

Scenario: Navigate to Broadcast and On Demand session pages
    And Navigate to On Demand session using API
    And Enter chat at On Demand session using API
    And Get chat at On Demand session using API
    And Enter question at On Demand session using API
    And Get questions at On Demand session using API
    And Enter answer at On Demand session using API
    And Get answers by question id at On Demand session using API
    And Navigate to Broadcast session using API
    And Enter chat at Broadcast session using API
    And Get chat at Broadcast session using API
    And Enter question at Broadcast session using API
    And Get questions at Broadcast session using API
    And Enter answer at Broadcast session using API
    And Get answers by question id at Broadcast session using API

Scenario: Make sure the Breakout Room session is working as expected
    And Navigate to Breakout Room session using API
    And Get Breakout Room Ended using API
    And Get Breakout Room Usage using API
    And Get room opentok test for Breakout Room using API
    And Get opentok session by id for Breakout Room using API
    And Get to the breakout session by uuid using API
    And Get opentok token for Breakout Room by session id using API
    And Get opentok session by id for Breakout Room using API
    And Revalidate registration using API
    And Validate registration user session using API
    And Get Breakout Room Ended using API
    And Get Breakout Room Usage using API

Scenario: Make sure the Fireside session is working as expected
    And Navigate to Fireside session using API
    And Get room opentok test for Fireside using API
    And Get opentok session by id for Fireside using API
    And Get opentok token for Fireside by session id using API
    And Post broadcast for the Fireside using API
    And Access fireside live event using API
    And Check broadcast for fireside using API
    And Get opentok session by id for Fireside using API 
    And Enter chat at Fireside session using API
    And Get chat at Fireside session using API
    And Start broadcast for the Fireside using API
    And Check broadcast for fireside using API
    And Stop broadcast for the fireside using API
    And Check start action for Fireside using API
    And Check milestone action for Fireside using API
    And Check end action for Fireside using API

#Scenario: Make sure the moderator functionality worked
