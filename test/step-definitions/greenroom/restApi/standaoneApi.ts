import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../../utils/reporter"
import StandaloneRestApi from "../../../page-objects/greenroom/restApi/standaloneRestApi"
import editJsonFile from "edit-json-file";
import SGREventCreationPage from "../../../page-objects/greenroom/UI/Standalone/SGREventCreationPage";

Given (/^Get all standalone GR channels$/, async function(){
	//@ts-ignore
	let response = await StandaloneRestApi.getStandAloneChannels(browser.config.Greenroom_Api_Host)
	let allStandAloneChannels = response.gr_channels
	let channelId: number
	for (let i = 0; i < allStandAloneChannels.length; i++) {
		if (allStandAloneChannels[i]['name'] == 'QA Test'){
			console.log(`Channel Name for Standalone is : ${allStandAloneChannels[i]['name']}`)
			console.log(`Channel Id is ${allStandAloneChannels[i]['channel']} for Standalone channel ${allStandAloneChannels[i]['name']}`)
			reporter.addStep("info", `Channel Id is ${allStandAloneChannels[i]['channel']} for Standalone channel ${allStandAloneChannels[i]['name']}`)
			channelId = allStandAloneChannels[i]['channel']
			Object.getPrototypeOf(StandaloneRestApi).constructor.channelId = channelId
			break
		}
	}
	if(!channelId) throw Error(`In-correct Channel Id!`)
})

Given (/^Get all standalone GR events$/, async function(){
	//@ts-ignore
	let response = await StandaloneRestApi.getStandaloneEvents(browser.config.Greenroom_Api_Host)
	chai.expect(response.length).to.greaterThanOrEqual(1)
    reporter.addStep("info", `Get all standalone GR events is success.`)
})

Given (/^Create new standalone GR Event$/, async function(){
	let currentTime = Date.now() 
    console.log(`>> Current Time is ${currentTime}`)
    let startTime = (new Date).getTime() + 15 * 60000
    let endTime = (new Date).getTime() + 30 * 60000
	const eventName =  await SGREventCreationPage.generateEventName()
	Object.getPrototypeOf(StandaloneRestApi).constructor.setNewSGREventName = eventName

	let channelId = Object.getPrototypeOf(StandaloneRestApi).constructor.channelId

	let payloadSgrCreateEvent = "./data/jsonFiles/payload_SGR_eventCreation.json"
	let file = editJsonFile(payloadSgrCreateEvent)
	file.set("channel", channelId)
	file.set("start_time", startTime)
	file.set("end_time", endTime)
	file.set("standalone_title", eventName)

	let payload = JSON.stringify(file.toObject())

	//@ts-ignore
	let response = await StandaloneRestApi.postStandaloneCreateEvent(browser.config.Greenroom_Api_Host , payload)
	Object.getPrototypeOf(StandaloneRestApi).constructor.getNewSGRMeetingId = response.meeting
	reporter.addStep("info", `Create event... is success.`)

  	chai.expect(response.meeting).to.be.not.null

})

Given (/^Verify newly created standalone GR Event$/, async function(){
	//@ts-ignore
	let response = await StandaloneRestApi.getStandaloneEvents(browser.config.Greenroom_Api_Host)
	const lastValue = Object.values(response).pop()
	const lastJsonString = JSON.stringify(lastValue)
	const lastJsonObj = JSON.parse(lastJsonString)

	Object.getPrototypeOf(StandaloneRestApi).constructor.getNewSGRSlugMeetingId = lastJsonObj.meeting_id

	let newMeetingId = Object.getPrototypeOf(StandaloneRestApi).constructor.getNewSGRMeetingId	
	let newSGREventName = Object.getPrototypeOf(StandaloneRestApi).constructor.setNewSGREventName

	chai.expect(newMeetingId).to.equal(lastJsonObj.meeting)
	chai.expect(newSGREventName).to.equal(lastJsonObj.title)

})


