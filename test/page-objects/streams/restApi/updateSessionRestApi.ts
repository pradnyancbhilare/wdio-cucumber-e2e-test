import request from "supertest"
import cloudflareParameters from "../../../utils/cloudflareParameters"
import HomeRestApi from "./homeRestApi"

class UpdateSessionRestApi {

    static updateStreamingTypeRes: any
    static getAddVideoResponse: any
    static getVideoActionResponse: any

    constructor() {

    }

    async updateSessionWithStreamingTypeFromGRToRTMP(host: string, payload: string): Promise<any> {

        let endpoint = `/v3/admin/event/session`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .put(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        UpdateSessionRestApi.updateStreamingTypeRes = JSON.parse(JSON.stringify(response.body))
        return UpdateSessionRestApi.updateStreamingTypeRes
    }

    async addVideoToSession(host: string, payload: string): Promise<any> {

        let endpoint = `/v3/admin/event/session`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .put(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)
            .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        UpdateSessionRestApi.getAddVideoResponse = JSON.parse(JSON.stringify(response.body))
        return UpdateSessionRestApi.getAddVideoResponse
    }

    async videoAction(host: string, payload: string): Promise<any> {

        let endpoint = `/actions`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)

        let response = await request(host)
            .post(endpoint)
            .set("content-type", "application/json")
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
            .accept("application/json")
            .query(queryStr)

        console.log(`>> Response: ${JSON.stringify(response)}`)
        UpdateSessionRestApi.getVideoActionResponse = JSON.parse(JSON.stringify(response))
        return UpdateSessionRestApi.getVideoActionResponse
    }
}
export default new UpdateSessionRestApi