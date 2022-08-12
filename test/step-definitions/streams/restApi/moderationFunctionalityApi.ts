import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../../utils/reporter"
import HomeRestApi from "../../../page-objects/streams/restApi/homeRestApi"
import { v4 as uuidv4 } from 'uuid'
import CreateEventRestApi from "../../../page-objects/streams/restApi/createEventRestApi"
import SessionRestApi from "../../../page-objects/streams/restApi/sessionRestApi"
import fs from "fs"
import ModerationRestApi from "../../../page-objects/streams/restApi/moderationRestApi";

class ModerationFunctionalityApi {

    static channelID: any
    static sessionUuid: any
    static chatID: any
    static sessionId: any
    static eventId: any

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
export default new ModerationFunctionalityApi

Given(/^Get registration count for event$/, async function () {
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    ModerationFunctionalityApi.channelID = await (new ModerationFunctionalityApi()).getChannelId(channelName)
    console.log(`Channel id is: ${ModerationFunctionalityApi.channelID}`)

    let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes
    let eventId = eventDetails.event

    //@ts-ignore
    let response = await ModerationRestApi.getRegistrationCount(browser.config.Streams_Api_Host, eventId, ModerationFunctionalityApi.channelID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get registration count details... is success.`)
})

Given(/^Get moderator window chat for session by session uuid$/, async function () {
    let sessionDetails = Object.getPrototypeOf(SessionRestApi).constructor.getSessionResponse
    console.log(`>> Response of session details: ${JSON.stringify(sessionDetails)}`)

    ModerationFunctionalityApi.sessionUuid = sessionDetails.uuid

    //@ts-ignore
    let response = await ModerationRestApi.getModeratorWindowChatForSession(browser.config.Streams_Api_Host, ModerationFunctionalityApi.sessionUuid)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get moderation window chat session details... is success.`)
})

Given(/^Get moderator window video for session by session uuid$/, async function () {
    //@ts-ignore
    let response = await ModerationRestApi.getModeratorWindowVideoForSession(browser.config.Streams_Api_Host, ModerationFunctionalityApi.sessionUuid)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get moderation window video details... is success.`)
})

Given(/^Get moderator window questions for session by session uuid$/, async function () {
    //@ts-ignore
    let response = await ModerationRestApi.getModeratorWindowQuestionForSession(browser.config.Streams_Api_Host, ModerationFunctionalityApi.sessionUuid)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get moderation window questions session details... is success.`)
})

Given(/^Get moderator window ivs-stream for session by session uuid$/, async function () {
    //@ts-ignore
    let response = await ModerationRestApi.getModeratorWindowIvsStreamForSession(browser.config.Streams_Api_Host, ModerationFunctionalityApi.sessionUuid)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get moderation window ivs stream session details... is success.`)
})

Given(/^Get moderator channel events details$/, async function () {
    let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes
    let eventUuid = eventDetails.uuid

    //@ts-ignore
    let response = await ModerationRestApi.getModeratorChannelEventsDetails(browser.config.Streams_Api_Host, eventUuid)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get moderation channel event details... is success.`)
})

Given(/^Create general info form filling for moderator$/, async function () {
    let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes
    let eventUuid = eventDetails.uuid

    //@ts-ignore
    let host = browser.config.Streams_Ui_Host
    console.log(`Host URl: ${host}`)

    let payload = `{"fields":{"1":null,"2":null,"3":"brandlive.automation1@gmail.com"},"lang":"en","source":"${host}/moderator/event/${eventUuid}/en/session","timezone":"America/Los_Angeles","isFinalStep":true,"isFinalNonTicketStep":true}`

    //@ts-ignore
    let response = await ModerationRestApi.createRegistrationGeneralInfoFormFilling(browser.config.Streams_Live_Api_Host, eventUuid, payload)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get create general from filling moderator details... is success.`)
})

Given(/^Load all event chats at moderator window$/, async function () {
    let eventDetails = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes
    let channelId = eventDetails.channel
    let eventId = eventDetails.event

    let sessionRes = Object.getPrototypeOf(SessionRestApi).constructor.getSessionResponse
    let moduleId = sessionRes.modules[0].id

    console.log(`Channel ID: ${channelId}`)
    console.log(`Event ID: ${eventId}`)
    console.log(`Module ID: ${moduleId}`)

    //@ts-ignore
    let response = await ModerationRestApi.loadAllEventchatsAtModeratorWindow(browser.config.Streams_Live_Api_Host, eventId, moduleId, channelId)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get load all event chant  details... is success.`)
})

Given(/^Send chat to presenter using session uuid and chat id$/, async function () {
    let moderatorChatdetailsRes = Object.getPrototypeOf(SessionRestApi).constructor.moderationWinChatDetailsRes
    console.log(`>> Response of moderator chat details: ${JSON.stringify(moderatorChatdetailsRes)}`)

    ModerationFunctionalityApi.chatID = moderatorChatdetailsRes.chat[0].id

    let payload = `{}`;

    //@ts-ignore
    let response = await ModerationRestApi.sendChatToPresenterUsingSessionUuid(browser.config.Streams_Live_Api_Host, payload, ModerationFunctionalityApi.sessionUuid, ModerationFunctionalityApi.chatID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get send chat to presenter details... is success.`)
})

Given(/^Remove chat from presenter using session uuid and chat id$/, async function () {
    let payload = `{}`;

    //@ts-ignore
    let response = await ModerationRestApi.removeChatFromPresenterUsingSessionUuid(browser.config.Streams_Live_Api_Host, payload, ModerationFunctionalityApi.sessionUuid, ModerationFunctionalityApi.chatID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get remove chat from presenter details... is success.`)
})

Given(/^Reject chat using session uuid and chat id$/, async function () {
    //@ts-ignore
    let host = browser.config.Streams_Live_Api_Host
    let bl_profile_id: number
    if (host.includes('qa')) {
        bl_profile_id = 50689
    } else {
        bl_profile_id = 50729
    }

    let newEventJson = Object.getPrototypeOf(CreateEventRestApi).constructor.getEventDetailsByUuidRes
    console.log(`>> Response of events details: ${JSON.stringify(newEventJson)}`)

    ModerationFunctionalityApi.sessionId = newEventJson.sessions[0].session
    ModerationFunctionalityApi.eventId = newEventJson.event

    console.log(`>>session id: ${ModerationFunctionalityApi.sessionId}`)
    console.log(`>> Event ID: ${ModerationFunctionalityApi.eventId}`)

    let payload = `{
        "id":${ModerationFunctionalityApi.chatID},
        "bl_profile":${bl_profile_id},
        "first_name":"Pradnyan",
        "last_name":"Bhilare",
        "email":"pradnyan.bhilare@brandlive.com",
        "created_at":"2022-06-23T17:12:42.087Z",
        "profile":{
           "${ModerationFunctionalityApi.channelID}":{
              "1":"Pradnyan",
              "2":"Bhilare",
              "3":"pradnyan.bhilare@brandlive.com",
              "4":"None",
              "6":"None",
              "9":"None",
              "verified":true
           }
        },
        "locations":null,
        "uuid":"${ModerationFunctionalityApi.sessionUuid}",
        "comment":"Hello World",
        "gif":null,
        "image":null,
        "reply_to_id":null,
        "reply_to":null,
        "session":${ModerationFunctionalityApi.sessionId},
        "event":${ModerationFunctionalityApi.eventId},
        "channel":${ModerationFunctionalityApi.channelID},
        "status":1,
        "blocked_reason":null,
        "blocked_severity":null,
        "blocked_by":null,
        "blocked_at":null,
        "deleted_at":null,
        "language":"en",
        "bl_profile_non_registered":null,
        "session_uuid":null,
        "registration_id":null,
        "user_session":null,
        "spam":0,
        "sent_to_presenter":false,
        "sent_to_presenter_at":null,
        "seen":false,
        "message_type":"chat",
        "live_chat":"session-${ModerationFunctionalityApi.sessionUuid}-en"
     }`;

    //@ts-ignore
    let response = await ModerationRestApi.rejectChatUsingSessionUuid(browser.config.Streams_Live_Api_Host, payload, ModerationFunctionalityApi.sessionUuid, ModerationFunctionalityApi.chatID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get reject chat details... is success.`)
})

Given(/^Approve chat using session uuid and chat id$/, async function () {
     //@ts-ignore
     let host = browser.config.Streams_Live_Api_Host
     let bl_profile_id: number
     if (host.includes('qa')) {
         bl_profile_id = 50689
     } else {
         bl_profile_id = 50729
     }

    let payload = `{
        "id":${ModerationFunctionalityApi.chatID},
        "bl_profile":${bl_profile_id},
        "first_name":"Pradnyan",
        "last_name":"Bhilare",
        "email":"pradnyan.bhilare@brandlive.com",
        "created_at":"2022-06-23T17:12:42.087Z",
        "profile":{
           "${ModerationFunctionalityApi.channelID}":{
              "1":"Pradnyan",
              "2":"Bhilare",
              "3":"pradnyan.bhilare@brandlive.com",
              "4":"None",
              "6":"None",
              "9":"None",
              "verified":true
           }
        },
        "locations":null,
        "uuid":"${ModerationFunctionalityApi.sessionUuid}",
        "comment":"Hello World",
        "gif":null,
        "image":null,
        "reply_to_id":null,
        "reply_to":null,
        "session":${ModerationFunctionalityApi.sessionId},
        "event":${ModerationFunctionalityApi.eventId},
        "channel":${ModerationFunctionalityApi.channelID},
        "status":5,
        "blocked_reason":null,
        "blocked_severity":null,
        "blocked_by":null,
        "blocked_at":null,
        "deleted_at":null,
        "language":"en",
        "bl_profile_non_registered":null,
        "session_uuid":null,
        "registration_id":null,
        "user_session":null,
        "spam":0,
        "sent_to_presenter":false,
        "sent_to_presenter_at":null,
        "seen":false,
        "message_type":"chat",
        "live_chat":"session-${ModerationFunctionalityApi.sessionUuid}-en"
     }`;
    
    //@ts-ignore
    let response = await ModerationRestApi.approveChatUsingSessionUuid(browser.config.Streams_Live_Api_Host, payload, ModerationFunctionalityApi.sessionUuid, ModerationFunctionalityApi.chatID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get approve chat details... is success.`)
})

Given(/^Delete chat using session uuid and chat id$/, async function () {
    let payload = `{}`;

    //@ts-ignore
    let response = await ModerationRestApi.deleteChatUsingSessionUuid(browser.config.Streams_Live_Api_Host, payload, ModerationFunctionalityApi.sessionUuid, ModerationFunctionalityApi.chatID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get Delete chat details... is success.`)
})

Given(/^Undelete chat using session uuid and chat id$/, async function () {
    let payload = `{}`;

    //@ts-ignore
    let response = await ModerationRestApi.undeleteChatUsingSessionUuid(browser.config.Streams_Live_Api_Host, payload, ModerationFunctionalityApi.sessionUuid, ModerationFunctionalityApi.chatID)
    chai.expect(response.length).to.not.null
    reporter.addStep("info", `Get undelete chat details... is success.`)
})