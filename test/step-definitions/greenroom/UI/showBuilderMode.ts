import { Given, When, Then } from "@cucumber/cucumber";
import reporter from "../../../utils/reporter"
import mediaDrawer from "../../../page-objects/greenroom/UI/mediaDrawer";
import showBoard from "../../../page-objects/greenroom/UI/showBoard"

Given (/^Add 1B Layout between Intro and Outro shot$/, async function(){
    reporter.addStep("info", `Adding 1B Layout shot`)
	await showBoard.add1BLayout()
})

Given (/^Add 3B Layout between 1B and Outro Shot$/, async function(){
    reporter.addStep("info", `Adding 3B Layout shot`)
	await showBoard.add3BLayout()
})

Given (/^upload file "(.*)"$/, async function(fileName){
    reporter.addStep("info", `upload ${fileName} file...`)
    await mediaDrawer.uploadImageMedia(fileName)
})