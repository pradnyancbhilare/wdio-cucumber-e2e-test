import { Given, When, Then } from "@cucumber/cucumber";
import Avatar from "../../../page-objects/streams/UI/avatar";
import AvatarDetailsLive from "../../../page-objects/streams/UI/avatarDetailsLive";
import Directory from "../../../page-objects/streams/UI/directory";
import DirectoryLive from "../../../page-objects/streams/UI/directoryLive";
import EventHeader from "../../../page-objects/streams/UI/EventHeader";
import EventLandingPage from "../../../page-objects/streams/UI/EventLandingPage";
import GeneralInfo from "../../../page-objects/streams/UI/generalInfo";
import LeftNavigation from "../../../page-objects/streams/UI/leftNavigation";
import ProfileDetails from "../../../page-objects/streams/UI/ProfileDetails";
import ProfileInfo from "../../../page-objects/streams/UI/profileInfo";
import ProfileInfoLive from "../../../page-objects/streams/UI/profileInfoLive";
import reporter from "../../../utils/reporter"
import WindowActions from "../../../utils/WindowActions";

Given(/^Enable the Profile and Avatar for the event "3.0" registration$/, async function () {
    reporter.addStep("info", `Enabling the Profile Info and Avatar toggles from Registration...`)
    await LeftNavigation.clickOnRegistrationTab()
    await ProfileInfo.profileInfoToggleAction("ON")
    await Avatar.avatarToggleAction("ON")
    reporter.addStep("info", "Profile Info and Avatar toggles are enabled successfylly...")
})

Given(/^Enable the Directory toggle$/, async function () {
    reporter.addStep("info", `Enabling the Directory toggles...`)
    await LeftNavigation.clickOnSocialTab()
    await Directory.clickOnDirectoryCard()
    await Directory.directoryToggleAction("ON")
    await Avatar.socialAvatarToggleAction("ON")
    reporter.addStep("info", "Directory toggle is enabled successfylly...")
})

Given(/^Publish and Go live$/, async function () {
    reporter.addStep("info", `Publish and Go live...`)
    await EventHeader.publishEvent()
    await EventLandingPage.goLiveWithTheEvent()
    await browser.pause(4000)
    await WindowActions.switchToNextWindow(1)
    reporter.addStep("info", "Event is published and opened in the new tab...")
})

Given(/^Multiple attendees register for an event sequentially and the Directory tab is seen$/, async function (datatable) {
    reporter.addStep("info", `Multiple attendees registration...`)
    let regInfo = datatable.hashes()
    console.log(`Datatable first First Name: ${regInfo[0].FirstName}`)
    console.log(`Datatable first Last Name: ${regInfo[0].LastName}`)
    console.log(`Datatable first Email: ${regInfo[0].Email}`)
    console.log(`Datatable first Password: ${regInfo[0].Passcode}`)
    console.log(`Datatable first Company Name: ${regInfo[0].CompanyName}`)
    console.log(`Datatable first Bio: ${regInfo[0].Bio}`)
    console.log(`Datatable first Fun Fact: ${regInfo[0].FunFact}`)
    console.log(`Datatable first Media Name: ${regInfo[0].MediaName}`)
    console.log(`Datatable second First Name: ${regInfo[1].FirstName}`)
    console.log(`Datatable second Last Name: ${regInfo[1].LastName}`)
    console.log(`Datatable second Email: ${regInfo[1].Email}`)
    console.log(`Datatable second Password: ${regInfo[1].Passcode}`)
    console.log(`Datatable second Company Name: ${regInfo[1].CompanyName}`)
    console.log(`Datatable second Bio: ${regInfo[1].Bio}`)
    console.log(`Datatable second Fun Fact: ${regInfo[1].FunFact}`)
    console.log(`Datatable second Media Name: ${regInfo[1].MediaName}`)


    reporter.addStep("info", `First user Attendee registration...`)
    await EventLandingPage.clickOnRegistrationButton()
    await GeneralInfo.enterGeneralInfo(regInfo[0].FirstName, regInfo[0].LastName, regInfo[0].Email, regInfo[0].Passcode)
    await ProfileInfoLive.enterProfileInfo(regInfo[0].CompanyName, regInfo[0].Bio, regInfo[0].FunFact)
    await AvatarDetailsLive.uploadAvatarDetails(regInfo[0].MediaName)
    await DirectoryLive.verifyDirectoryTab()
    await EventLandingPage.logOutFromEvent()
    reporter.addStep("info", "Registration for first users is completed successfully...")

    reporter.addStep("info", `Second user Attendee registration...`)
    await browser.pause(3000)
    await WindowActions.switchToNextWindow(1)
    await GeneralInfo.enterGeneralInfo(regInfo[1].FirstName, regInfo[1].LastName, regInfo[1].Email, regInfo[1].Passcode)
    await ProfileInfoLive.enterProfileInfo(regInfo[1].CompanyName, regInfo[1].Bio, regInfo[1].FunFact)
    await AvatarDetailsLive.uploadAvatarDetails(regInfo[1].MediaName)
    await DirectoryLive.verifyDirectoryTab()
    reporter.addStep("info", "Registration for the second user is completed successfully...")
})

Given(/^Check multiple registered attendees list is displayed on the directory page$/, async function () {
    reporter.addStep("info", `Multiple attendees registered list...`)
    await DirectoryLive.clickOnTheDirectoryTab()
    await browser.pause(3000)
    await DirectoryLive.verifyAttendeesProfileCardsList()
    reporter.addStep("info", "Verified Multiple attendees registered list successfully...")
})

Given(/^Enable Bookmark attendees toggle$/, async function () {
    reporter.addStep("info", `Enable bookmark toggle...`)
    await WindowActions.switchToNextWindow(0)
    await Directory.bookmarkAttendeesToggleAction("ON")
    await EventHeader.publishEvent()
    reporter.addStep("info", "Enabled the bookmark attendees toggle...")
})

Given(/^Check bookmark icon is displayed on the attendees profile and functioning correctly$/, async function () {
    reporter.addStep("info", `Verify bookmark icon is displayed...`)
    await WindowActions.switchToNextWindow(1)
    await DirectoryLive.verifyBookMarkAttendeesIcon()
    reporter.addStep("info", "Verified bookmark icon...")
})

Given(/^Enable the Avatar toggles$/, async function () {
    reporter.addStep("info", `Enable Avatar toggle...`)
    await WindowActions.switchToNextWindow(0)
    await Avatar.socialAvatarToggleAction("ON")
    await EventHeader.publishEvent()
    reporter.addStep("info", "Enabled the Avatar toggle...")
})

Given(/^Avatar can be seen to the attendees on the directory page$/, async function () {
    reporter.addStep("info", `verify Avatar to profile...`)
    await WindowActions.switchToNextWindow(1)
    await DirectoryLive.verifyAvatarToAttendeesProfile()
    reporter.addStep("info", "Verified the Avatar to the attendees profile...")
})

Given(/^Enable the Profile details About and Topics toggles$/, async function () {
    reporter.addStep("info", `Enable Profile details toggles...`)
    await WindowActions.switchToNextWindow(0)
    await LeftNavigation.clickOnSocialTab()
    await ProfileDetails.clickOnProfileDetailsCard()
    await ProfileDetails.profileDetailsToggleAction("ON")
    await ProfileDetails.aboutToggleAction("ON")
    await ProfileDetails.topicsToggleAction("ON")
    await EventHeader.publishEvent()
    reporter.addStep("info", "Enabled profile details toggles...")
})

Given(/^Check user profile pop up is opened with all the registered details$/, async function () {
    reporter.addStep("info", `Verify registered details on the  Profile details pop up...`)
    await WindowActions.switchToNextWindow(1)
    await DirectoryLive.VerifyPopUPDetailsforAttendees()
    reporter.addStep("info", "Verified the profile pop up details...")
})

Given(/^Check profile details with In a Pop-up option and functioning correctly$/, async function () {
    reporter.addStep("info", `Verify profile details In a Pop up option...`)
    await WindowActions.switchToNextWindow(0)
    await ProfileDetails.clickOnSettingIcon()
    await ProfileDetails.clickOnArrowDownIcon()
    await ProfileDetails.selectProfileAppearance("In a Pop-up")
    await EventHeader.publishEvent()
    await WindowActions.switchToNextWindow(1)
    await DirectoryLive.verifyInPopUpView()
    reporter.addStep("info", "Verified profile details with In pop up option...")
})

Given(/^Check profile details with As a Page option and functioning correctly$/, async function () {
    reporter.addStep("info", `Verify profile details As a Page option...`)
    await WindowActions.switchToNextWindow(0)
    await ProfileDetails.clickOnArrowDownIcon()
    await ProfileDetails.selectProfileAppearance("As a Page")
    await EventHeader.publishEvent()
    await WindowActions.switchToNextWindow(1)
    await DirectoryLive.verifyAsPageView()
    reporter.addStep("info", "Verified profile details with As a Page option...")
})