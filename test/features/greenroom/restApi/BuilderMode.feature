@buildermode_gr_api

Feature: Builder Mode Actions Feature

Scenario: Create Standalone Event 
	Given Check producer app access
	And Login to greenroom with greenroom
	And Get all standalone GR channels
	And Get all standalone GR events
	And Create new standalone GR Event 

Scenario: Check Home Page navigation api
	And Get Standalone meetings by channel Id
	And Get Standalone meetings by event id

Scenario: Check navigation from home page to live mode api
	And Get active rooms
	And Get details using meeting id
	And Send inviations to presenter using meeting id
	And Get inviations using room id
	And Create log for a meeting message type producer_connected
	And Get broadcast check by meeting id
	And Get active rooms
	And Create log for a meeting message type load_meeting
	And Get Request State Sync
	And Post Load Shots
	And Get rooms media details
	And Get Graphics Details
	And Get Show Sessions
	And Get media all meeting background
	And Get presenter messages 
	And Create log for a meeting message type socket_connected
	And Get Join Request by meeting id
	And Post Tokbox token
	And Get Green Room Notification
	And Write State for SET_PRESENTED_MEDIA in Live mode
	And Get Direct Chat Messages
	And Get Room Chat Messages
    And Create an invitation for brandlive.loadautomation1@gmail.com
    And Create a notification for brandlive.loadautomation1@gmail.com

Scenario: Check navigation from live mode to Builder mode
	Given Get active rooms
	And Write State for SET_PRESENTED_MEDIA in Live mode
	And Write State for SET_CURRENT_SHOT_ID in Live mode
	And Post settings in builder mode

Scenario: Check Producer is able to Add Shot in Builder mode
    And Get active rooms
    And Add shot in builder mode
    And Post Load Shots
    And Post Bulk Edit Shots
    And Post Load Shots
	And Post edit duration for the shot
	And Post edit title for the shot
    And Create log for a meeting message type producer_connected
    And Create log for a meeting message type connected_users
    And Write State for SET_CURRENT_SHOT_ID in Live mode

	Scenario: Check Producer is able to upload MP4 file
    Then Upload a mp4 to GR Event
    Then Upload the mp4 to AWS
    Then Notify backend that upload has completed
    Then Create thumbnail for mp4
    Then Upload thumbnail to AWS
    Then Notify backend that upload has completed
    Then Tell the backend to create the mp4 media item
    And Request the newly created media item
	And Get active rooms
    And Post edit drag and drop for the shot on feed one
    And Write State for SET_CURRENT_SHOT_ID in Live mode
    And Post Load Shots
    And Post save item mp4 media to feed
	And Create log for a meeting message type producer_connected
	Then Create log for a meeting message type connected_users


Scenario: Check Producer is able to upload JPG file
    And Upload a jpg to GR Event
    And Upload the jpg to AWS
    And Notify backend that upload has completed
    And Create thumbnail for jpg
    And Upload thumbnail to AWS
    And Notify backend that upload has completed
    And Tell the backend to create the jpg media item
    And Request the newly created media item
	And Get active rooms
    And Post edit drag and drop for the shot on feed two
    And Write State for SET_CURRENT_SHOT_ID in Live mode
    And Post Load Shots
    And Post save item jpg media to feed
	And Create log for a meeting message type producer_connected
	Then Create log for a meeting message type connected_users

Scenario: Check Producer is able to upload PDF file
    And Create log for a meeting message type producer_connected
    And Create log for a meeting message type connected_users
    And Get active rooms
    Then Mock get CloudConvert job for the PDF
    Then Tell the backend to create the PDF
    Then Create log for a meeting message type producer_connected
    Then Create log for a meeting message type connected_users
    Then Get active rooms
    Then Get converted PDF ID
    And Request the newly created media item
	And Get active rooms
    And Post edit drag and drop for the shot on feed three
    And Write State for SET_CURRENT_SHOT_ID in Live mode
    And Post Load Shots
    And Post save item pdf media to feed
	And Create log for a meeting message type producer_connected
	Then Create log for a meeting message type connected_users

	# Scenario: Check Producer is able to Drag and drop PDF, mp4 and Jpg files on shot
	# Then Request the newly created media item
	#  And Get active rooms
    #  And Post edit drag and drop for the shot
    #  And Post Load Shots
    #  And Add mp4 to pdf media item
	#  And Create log for a meeting message type producer_connected
	#  Then Create log for a meeting message type connected_users


Scenario: Check Producer is able to delete shot in Builder mode
    And Create log for a meeting message type producer_connected
    And Create log for a meeting message type connected_users
    And Write State for SET_CURRENT_SHOT_ID in Live mode
    And Get active rooms
    And Delete shot in builder mode
    And Post Load Shots

Scenario: Check Producer is able to loop the uploaded Video (MP4) file in the builder mode
    And Get active rooms
    And Set media item to loop videos
    And Get Request State Sync
    And Create log for a meeting message type producer_connected
    Then Create log for a meeting message type connected_users


Scenario: Check Producer is able to to share a content with Presenter, change the name of the content and delete one of the page of PDF in the builder mode
    And Create log for a meeting message type producer_connected
    And Create log for a meeting message type connected_users
    And Get active rooms
    And Share controls with presenters
    And Change name of the content
    And Delete one of the page of PDF doc



