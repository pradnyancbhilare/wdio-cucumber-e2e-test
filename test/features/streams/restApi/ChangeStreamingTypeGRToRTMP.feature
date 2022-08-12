@streams_streaming_Type_Change_GR_To_RTMP
Feature: Streams with changing the streaming type of broadcast session from Greenroom to RTMP

Scenario: Test Streams Home Api
    Given Login to streams
    And Get streams channels by profile
    And Get all events for channel for streams

Scenario: Create Broadcast session based Event
     Given Get all event templates for channel
     And Check new event name
     And Get all available tracks
     And Create new "Broadcast" session based event
     And Get new event by event uuid
     And Check url for the new event
     And Get event publish status by event uuid
     And Publish event
     And Get event publish status by event uuid  

Scenario: Change streaming type of broadcast session from Greenroom to RTMP
     And Get products details by channel id
     And Get secondary video details by session id
     And Get speaker details by channel id for session
     And Get recorded video details by channel id for session
     And Get session details by id
     And Update the session with new streaming type