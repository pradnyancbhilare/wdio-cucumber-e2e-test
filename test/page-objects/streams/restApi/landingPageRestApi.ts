import request from "supertest"
import cloudflareParameters from "../../../utils/cloudflareParameters"
import HomeRestApi from "./homeRestApi"

class LandingPageRestApi {

    static getProductsDetailsRes: any
    static getSecondaryVideoDetailsRes: any
    static getSpeakersDetailsRes: any
    static getSponsorsDetailsRes: any
    static getRecordedVideoDetailsRes: any
    static getChannelResponse: any

    constructor() {

    }

    async getProductsDetails(host: string, channelID: string): Promise<any> {

        let endpoint = `/v3/admin/channel/products/${channelID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        LandingPageRestApi.getProductsDetailsRes = JSON.parse(JSON.stringify(response.body))
        return LandingPageRestApi.getProductsDetailsRes
    }

    async getSecondaryVideoDetails(host: string, sessionID: string): Promise<any> {

        let endpoint = `/v3/admin/events/session/secondaryVideo/${sessionID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        LandingPageRestApi.getSecondaryVideoDetailsRes = JSON.parse(JSON.stringify(response.body))
        return LandingPageRestApi.getSecondaryVideoDetailsRes
    }

    async getSpeakersDetails(host: string, channelID: string): Promise<any> {

        let endpoint = `/v3/admin/events/speakers/${channelID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        LandingPageRestApi.getSpeakersDetailsRes = JSON.parse(JSON.stringify(response.body))
        return LandingPageRestApi.getSpeakersDetailsRes
    }

    async getSponsorsDetails(host: string, channelID: string): Promise<any> {

        let endpoint = `/v3/admin/channel/sponsors/${channelID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        LandingPageRestApi.getSponsorsDetailsRes = JSON.parse(JSON.stringify(response.body))
        return LandingPageRestApi.getSponsorsDetailsRes
    }

    async getRecordedVideosDetails(host: string, channelID: string): Promise<any> {

        let endpoint = `/v3/admin/channel/videos/recorded/${channelID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        LandingPageRestApi.getRecordedVideoDetailsRes = JSON.parse(JSON.stringify(response.body))
        return LandingPageRestApi.getRecordedVideoDetailsRes
    }

    async getChannelVideos(host: string, channelID: string): Promise<any> {

        let endpoint = `/v3/admin/channel/videos/channel/${channelID}`;
        console.log(`The url is >> ${host}${endpoint}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .get(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        LandingPageRestApi.getChannelResponse = JSON.parse(JSON.stringify(response.body))
        return LandingPageRestApi.getChannelResponse
    }
}
export default new LandingPageRestApi