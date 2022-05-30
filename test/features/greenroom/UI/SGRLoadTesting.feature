Feature: Load Testing Feature File

@dummy_user_1
Scenario: Login and join to newly created standalone room
    Given Login to standalone greenroom as producer using brandlive.loadautomation1@gmail.com
	And Pause the execution for 10 mins
  

@dummy_user_2
Scenario: Login and join to newly created standalone room
    Given Login to standalone greenroom as producer using brandlive.loadautomation2@gmail.com
	And Pause the execution for 10 mins

@dummy_user_3
Scenario: Login and join to newly created standalone room
    Given Login to standalone greenroom as producer using brandlive.loadautomation3@gmail.com
	And Refresh the room every 30 secs 


@dummy_user_4
Scenario: Login and join to newly created standalone room
    Given Login to standalone greenroom as producer using brandlive.loadautomation4@gmail.com
	And Pause the execution for 10 mins


@main_user
Scenario: Login and create event
	Given Login to greenroom app: Standalone as producer
    And Select the channel for automation
	And Create New SGR Event 

@main_user
Scenario: Search and Navigate to till Showbuilder Mode
	And Search and Navigate to Show Details Page 
	And Navigate to Live Mode
	And Navigate to Showbuilder Mode

@main_user
Scenario: Add Layout Shots in Showbuilder mode	
	And Expand Show board
	And Add 1B Layout between Intro and Outro shot
	And Add 3B Layout between 1B and Outro Shot

@main_user
Scenario: Upload media and add streaming destination	
	And Open Media Drawer
	And upload file "sample_image_1.jpg"
	And upload file "sample_pdf.pdf"
	And upload file "sample_video.mp4"
	And Navigate to Streaming Tab 
	And Add Streaming Destination


@load_test_user_1
 Scenario: Login and perform actions to newly created standalone room by brandlive.loadautomation1@gmail.com
  Given Login to standalone greenroom as producer using brandlive.loadautomation1@gmail.com
    And Select the channel for automation
	And Pause the execution for 2 mins
    And Search and Navigate to Show Details Page 
	And Navigate to Live Mode
	And Expand Show board
	And Play Intro Shot 
	And Clear Intro Shot
	And Resume Intro Shot
	And Click Next Shot
	And Pause the execution for 20 mins
	

 @load_test_user_2
 Scenario: Login and perform actions to newly created standalone room by brandlive.loadautomation2@gmail.com
  Given Login to standalone greenroom as producer using brandlive.loadautomation2@gmail.com
    And Select the channel for automation
	And Pause the execution for 5 mins
    And Search and Navigate to Show Details Page 
	And Navigate to Live Mode
	And Open Media Drawer
	And Drag and Drop "sample_video.mp4" to 1B Shot
	And Perform Video controls on shot
	And Navigate to overaly Tab
	And Drag and Drop "Brandlive 1" to the 1B Shot
	And Save overlay with animation settings
	And Click Next Shot
	And Pause the execution for 20 mins



 @load_test_user_3
 Scenario: Login and perform actions to newly created standalone room by brandlive.loadautomation3@gmail.com
  Given Login to standalone greenroom as producer using brandlive.loadautomation3@gmail.com
    And Select the channel for automation
    And Search and Navigate to Show Details Page 
	And Navigate to Live Mode
	And Pause the execution for 10 mins
	And Drag and Drop "sample_pdf.pdf" to 3B Shot
	And Drag and Drop "sample_video.mp4" to 3B second feed Shot 
	And Drag and Drop "sample_image_1.jpg" to 3B third feed Shot
	And Perform Pdf Pagination
	And Click Next Shot
	And Pause the execution for 20 mins



 @load_test_user_4
 Scenario: Login and perform actions to newly created standalone room by brandlive.loadautomation4@gmail.com
  Given Login to standalone greenroom as producer using brandlive.loadautomation4@gmail.com
    And Select the channel for automation
    And Search and Navigate to Show Details Page 
	And Navigate to Live Mode
	And Pause the execution for 15 mins
	And Open feeds Tab
	And Click Previous Shot
    And Mute all users
	And Unmute all users
	And Click Next Shot
	And Pause the execution for 20 mins
