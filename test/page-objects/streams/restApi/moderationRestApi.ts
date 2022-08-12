import request from "supertest"
import cloudflareParameters from "../../../utils/cloudflareParameters"
import HomeRestApi from "./homeRestApi"

class ModerationRestApi {

    static registrationCount: any
    static moderationWinChatDetailsRes: any
    static moderationWinVideoDetailsRes: any
    static moderationWinQuestionDetailsRes: any
    static moderationWinIvsStreamDetailsRes: any
    static moderatorChannelEventsDetailsres: any
    static createRegistrationGenInfoFormRes: any
    static sendChatToPresenterRes: any
    static removeChatFromPresenterRes: any
    static rejectChatRes: any
    static approveChatRes: any
    static deleteChatRes: any
    static undeleteChatRes: any

    constructor() {

    }

    async getRegistrationCount(host: string, eventID: number, channelID: number): Promise<any> {

        let endpoint = `/v3/admin/events/count-event-registrations/count/${eventID}/${channelID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.registrationCount = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.registrationCount
    }

    async getModeratorWindowChatForSession(host: string, sessionUuid: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/chat/${sessionUuid}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}&from_id=null&limit=0`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.moderationWinChatDetailsRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.moderationWinChatDetailsRes
    }

    async getModeratorWindowVideoForSession(host: string, sessionUuid: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/video/${sessionUuid}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.moderationWinVideoDetailsRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.moderationWinVideoDetailsRes
    }

    async getModeratorWindowQuestionForSession(host: string, sessionUuid: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/questions/${sessionUuid}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.moderationWinQuestionDetailsRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.moderationWinQuestionDetailsRes
    }

    async getModeratorWindowIvsStreamForSession(host: string, sessionUuid: number): Promise<any> {

        let endpoint = `/v3/admin/events/session/ivs-stream/${sessionUuid}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.moderationWinIvsStreamDetailsRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.moderationWinIvsStreamDetailsRes
    }

    async getModeratorChannelEventsDetails(host: string, eventUuid: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/channel-events/${eventUuid}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.moderatorChannelEventsDetailsres = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.moderatorChannelEventsDetailsres
    }

    async createRegistrationGeneralInfoFormFilling(host: string, eventUuid: string, payload: string): Promise<any> {

        let endpoint = `/e3-create-registration/${eventUuid}`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}&is_moderator=true`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.createRegistrationGenInfoFormRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.createRegistrationGenInfoFormRes
    }

    async loadAllEventchatsAtModeratorWindow(host: string, eventId: number, moduleId: number, channelId: number): Promise<any> {

        let endpoint = `/e3-load-all-event-chats/${eventId}/${moduleId}/${channelId}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.moderationWinIvsStreamDetailsRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.moderationWinIvsStreamDetailsRes
    }

    async sendChatToPresenterUsingSessionUuid(host: string, payload: String, sessionUuid: string, chatID: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/presenter/send/${sessionUuid}/en/${chatID}/chat`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.sendChatToPresenterRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.sendChatToPresenterRes
    }

    async removeChatFromPresenterUsingSessionUuid(host: string, payload: String, sessionUuid: string, messageID: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/presenter/remove/${sessionUuid}/en/${messageID}/chat`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.removeChatFromPresenterRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.removeChatFromPresenterRes
    }

    async rejectChatUsingSessionUuid(host: string, payload: String, sessionUuid: string, messageID: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/chat/unapprove/${sessionUuid}/en/${messageID}/chat`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.rejectChatRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.rejectChatRes
    }

    async approveChatUsingSessionUuid(host: string, payload: String, sessionUuid: string, messageID: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/chat/approve/${sessionUuid}/en/${messageID}/chat`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.approveChatRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.approveChatRes
    }

    async deleteChatUsingSessionUuid(host: string, payload: String, sessionUuid: string, messageID: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/chat/${sessionUuid}/en/${messageID}`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .delete(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.deleteChatRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.deleteChatRes
    }

    async undeleteChatUsingSessionUuid(host: string, payload: String, sessionUuid: string, messageID: number): Promise<any> {

        let endpoint = `/v3/admin/moderator/chat/undelete/${sessionUuid}/en/${messageID}`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .accept("application/json")
            .query(queryStr)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        ModerationRestApi.undeleteChatRes = JSON.parse(JSON.stringify(response.body))
        return ModerationRestApi.undeleteChatRes
    }
}
export default new ModerationRestApi