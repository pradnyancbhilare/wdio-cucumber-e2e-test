import request from "supertest"
import cloudflareParameters from "../../../utils/cloudflareParameters"
import HomeRestApi from "../../../page-objects/streams/restApi/homeRestApi"
import reporter from "../../../utils/reporter"

class UpdateEventApi {

    static putUpdateEventWithRegistrationStepsRes: any

    constructor() {

    }

    async putUpdateEventWithRegistrationSteps(host: string, payload: string): Promise<any> {

        let endpoint = `/v3/admin/event`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        await cloudflareParameters.generateCloudflareParameters(endpoint)
        let queryStr = `mac=${cloudflareParameters.mac}&expiry=${cloudflareParameters.expiry}`
        console.log(`The url with query is >> ${host}${endpoint}?${queryStr}`)
        
        let response = await request(host)
                    .put(endpoint)
                    .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.streamsToken)
                    .set("content-type", "application/json")
                    .accept("*/*")
                    .query(queryStr)
                    .send(payload)

        console.log(`>> Response: ${JSON.stringify(response)}`)
        UpdateEventApi.putUpdateEventWithRegistrationStepsRes = JSON.parse(JSON.stringify(response))
        return UpdateEventApi.putUpdateEventWithRegistrationStepsRes
    }

}

export default new UpdateEventApi