@designTabBulkEditShot_gr_api

Feature: Design Tab Bulk Edit Shot

Scenario: Log in and create standalone Greenroom
	Given Login to greenroom with greenroom
	And Get all standalone GR channels
	And Create new standalone GR Event
	And Get details using meeting id

Scenario: As a producer, I should be able to add edit the style of all shots
	Then Post Load Shots
	Then Write State for SET_PRESENTED_MEDIA in Live mode
	Then Write State for SET_CURRENT_SHOT_ID in Live mode
	Then Bulk edit shot_style.queue
	Then Load shots after bulk edit of shot_style.queue
	Then Write State for SET_CURRENT_SHOT_ID in Live mode
	Then Bulk edit shot_style.applied
	Then Load shots after bulk edit of shot_style.applied
	Then Save new wallpaper in settings as defaultMeetingImage