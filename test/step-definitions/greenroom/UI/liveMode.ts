import { Given, When, Then } from "@cucumber/cucumber";
import reporter from "../../../utils/reporter"
import DetailsPage from "../../../page-objects/greenroom/UI/detailsPage";
import LiveMode from "../../../page-objects/greenroom/UI/liveMode";
import mediaDrawer from "../../../page-objects/greenroom/UI/mediaDrawer";
import showBoard from "../../../page-objects/greenroom/UI/showBoard"
import feedsDrawer from "../../../page-objects/greenroom/UI/feedsDrawer";

Given (/^Navigate to Live Mode$/, async function(){
    reporter.addStep("info", `Joining SGR Event show...`)
    await DetailsPage.navigateToLiveMode()
})

Given (/^Play Intro Shot$/, async function(){
    reporter.addStep("info", `Play Intro Shot...`)
    await showBoard.playIntroShot()
})

Given (/^Clear Intro Shot$/, async function(){
    reporter.addStep("info", `Clear Intro shot`)
	await showBoard.clearIntroShot()
})

Given (/^Resume Intro Shot$/, async function(){
    reporter.addStep("info", `Resume Intro Shot`)
	await showBoard.resumeIntroShot()
})

Given (/^Click Next Shot$/, async function(){
    reporter.addStep("info", `Click Next Shot...`)
    await showBoard.navigateToNextShot()
})

Given (/^Drag and Drop (.*) to 1B Shot$/, async function(fileName:string){
    reporter.addStep("info", `Drag and Drop ${fileName} to 1B Shot`)
    await mediaDrawer.dragNDropFileToFeed(fileName,1)
})

Given (/^Perform Video controls on shot$/, async function(){
    reporter.addStep("info", `Performing video controls`)
	await LiveMode.videoActions()
})

Given (/^Drag and Drop (.*) to 3B Shot$/, async function(fileName:string){
    reporter.addStep("info", `Drag and Drop ${fileName} to 1B Shot`)
    await mediaDrawer.dragNDropFileToFeed(fileName,1)
})

Given (/^Drag and Drop (.*) to 3B second feed Shot$/, async function(fileName:string){
    reporter.addStep("info", `Drag and Drop ${fileName} to 1B Shot`)
    await mediaDrawer.dragNDropFileToFeed(fileName,2)
})

Given (/^Drag and Drop (.*) to 3B third feed Shot$/, async function(fileName:string){
    reporter.addStep("info", `Drag and Drop ${fileName} to 1B Shot`)
    await mediaDrawer.dragNDropFileToFeed(fileName,3)
})

Given (/^Perform Pdf Pagination$/, async function(){
    reporter.addStep("info", `Perform Pdf Pagination`)
    await LiveMode.paginationControls()
})

Given (/^Open feeds Tab$/, async function(){
    reporter.addStep("info", `Open Feeds Tab`)
    await LiveMode.openFeedsTab()
})


Given (/^Click Previous Shot$/, async function(){
    reporter.addStep("info", `Click Previous Shot`)
    await LiveMode.previousShot()
})


Given (/^Mute all users$/, async function(){
    reporter.addStep("info", `Mute all users from feeds tab`)
    await feedsDrawer.muteAllUsers()
})

Given (/^Unmute all users$/, async function(){
    reporter.addStep("info", `Unmute All users from feeds tab`)
    await feedsDrawer.unmuteAllUsers()
})