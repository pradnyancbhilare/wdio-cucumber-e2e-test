import request from "supertest"
import HomeRestApi from "../../../page-objects/greenroom/restApi/homeRestApi"
import fs from "fs"
import SGREventCreationPage from "../UI/Standalone/SGREventCreationPage"


class StandaloneRestApi {

	static getStandAloneChannelResponse: any
	static getStandAloneTotalEventsResponse: any
	static getCreateSGRResponse: any // This is response we get from creating sgr event 
	static getNewSGRMeetingId: any // This is a new meeting
	static getNewSGRSlugMeetingId: any // New meeting slug id
	static setNewSGREventName // New Meeting sgr name 
	static channelId: any

    constructor() {

    }

	async getStandAloneChannels(host: string): Promise<any> {
        let endpoint = `/v2/greenroom/profile/greenroom`;
        console.log(`The url is >> ${host}${endpoint}`)
        
        let response = await request(host)
                    .get(endpoint)
                    .set("content-type", "application/json")
                    .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken)
                    .accept("application/json")

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
		StandaloneRestApi.getStandAloneChannelResponse = JSON.parse(JSON.stringify(response.body))
        return StandaloneRestApi.getStandAloneChannelResponse
    }


	async getStandaloneEvents(host: string): Promise<any> {
        let endpoint = `/v2/greenroom/standalone/meetings`;
        console.log(`The url is >> ${host}${endpoint}`)
        
        let response = await request(host)
                    .get(endpoint)
                    .set("content-type", "application/json")
                    .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken)
                    .accept("application/json")

		StandaloneRestApi.getStandAloneTotalEventsResponse = JSON.parse(JSON.stringify(response.body))
        return StandaloneRestApi.getStandAloneTotalEventsResponse
    }


	async postStandaloneCreateEvent(host: string,payload: string): Promise<any> {
		
		let endpoint = `/v2/greenroom/create-or-update-meeting`
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)
		
		let response = await request(host)
						.post(endpoint)
						.set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken)
						.set("content-type", "application/json")
						.accept("application/json")
						.send(payload)
		StandaloneRestApi.getCreateSGRResponse = JSON.parse(JSON.stringify(response.body))
		console.log(`>> Response here : ${JSON.stringify(response.body)}`)
	return StandaloneRestApi.getCreateSGRResponse
		
	}

}

export default new StandaloneRestApi


