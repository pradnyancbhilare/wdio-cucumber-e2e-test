import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai";
import HomeRestApi from "../../../page-objects/streams/restApi/homeRestApi"
import LandingPageRestApi from "../../../page-objects/streams/restApi/landingPageRestApi"
import UpdateSessionApi from "../../../page-objects/streams/restApi/updateSessionRestApi"
import reporter from "../../../utils/reporter";
import CreateEventRestApi from "../../../page-objects/streams/restApi/createEventRestApi"
import fs from "fs"
import editJsonFile from "edit-json-file";

class ChangeStreamingTypeGRToRTMPApi {

    static channelID: any
    constructor() {

    }

    public async getChannelId(channelName: string): Promise<number> {
        let allStreamsChannelsArr = Object.getPrototypeOf(HomeRestApi).constructor.getChannelsForProfileRes
        console.log(`Channels >>> ${JSON.stringify(allStreamsChannelsArr)}`)

        let channelId: number
        if (allStreamsChannelsArr.length >= 1) {
            for (let ele of allStreamsChannelsArr) {
                for (let key in ele) {
                    let keyVal = `${ele[key]}`
                    if (keyVal.match(channelName)) {
                        channelId = parseInt(`${ele['channel']}`)
                    }
                }
            }
        }
        if (!channelId) throw Error(`The channel id is ${channelId}`)

        console.log(`Channel id is: ${channelId}`)
        return channelId
    }

    async updateSessionJsonFile(response: any) {
        if (fs.existsSync("./data/jsonFiles/streams/payload_E3_session.json")) {
            fs.rmSync("./data/jsonFiles/streams/payload_E3_session.json", { recursive: true })
        }
        fs.writeFileSync("./data/jsonFiles/streams/payload_E3_session.json", JSON.stringify(response, null, 4))
    }
}
export default new ChangeStreamingTypeGRToRTMPApi

Given(/^Get products details by channel id$/, async function () {
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    ChangeStreamingTypeGRToRTMPApi.channelID = await (new ChangeStreamingTypeGRToRTMPApi()).getChannelId(channelName)
    console.log(`Channel id is: ${ChangeStreamingTypeGRToRTMPApi.channelID}`)

    //@ts-ignore
    let response = await LandingPageRestApi.getProductsDetails(browser.config.Streams_Api_Host, ChangeStreamingTypeGRToRTMPApi.channelID)
    chai.expect(response.body).to.not.null
    console.log(`>> Response products details: ${JSON.stringify(response)}`)
    reporter.addStep("info", `Product details... is success.`)
})

Given(/^Get secondary video details by session id$/, async function () {
    let newEventJson = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes
    console.log(`>> Response of events details: ${JSON.stringify(newEventJson)}`)
    let sessionID = newEventJson.sessions[0].session
    console.log(`>> Session details by session id: ${sessionID}`)

    //@ts-ignore
    let response = await LandingPageRestApi.getSecondaryVideoDetails(browser.config.Streams_Api_Host, sessionID)
    chai.expect(response.body).to.not.null
    console.log(`>> Response secondary video details: ${JSON.stringify(response)}`)
    reporter.addStep("info", `Response secondary video... is success.`)
})

Given(/^Get speaker details by channel id for session$/, async function () {
    //@ts-ignore
    let response = await LandingPageRestApi.getSpeakersDetails(browser.config.Streams_Api_Host, ChangeStreamingTypeGRToRTMPApi.channelID)
    chai.expect(response.body).to.not.null
    console.log(`>> Response of speakers details: ${JSON.stringify(response)}`)
    reporter.addStep("info", `Response secondary video... is success.`)
})

Given(/^Get recorded video details by channel id for session$/, async function () {
    //@ts-ignore
    let response = await LandingPageRestApi.getRecordedVideosDetails(browser.config.Streams_Api_Host, ChangeStreamingTypeGRToRTMPApi.channelID)
    chai.expect(response.body).to.not.null
    console.log(`>> Response of Recorded videos details: ${JSON.stringify(response)}`)
    reporter.addStep("info", `Response of Recorded video... is success.`)
})

Given(/^Update the session with new streaming type$/, async function () {
    let file = editJsonFile(`./data/jsonFiles/streams/payload_E3_session.json`)
    file.set("broadcast_type", "rtmps")

    let payload = `{"session":${JSON.stringify(file.toObject())}}`

    //@ts-ignore
    let response = await UpdateSessionApi.updateSessionWithStreamingTypeFromGRToRTMP(browser.config.Streams_Api_Host, payload)
    chai.expect(response.body).to.not.null
    console.log(`>> Response of update streaming type details: ${JSON.stringify(response)}`)
    reporter.addStep("info", `Response of upload streaming type... is success.`)
})