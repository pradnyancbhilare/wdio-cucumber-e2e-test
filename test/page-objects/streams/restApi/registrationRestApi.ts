import request from "supertest"
import cloudflareParameters from "../../../utils/cloudflareParameters"
import HomeRestApi from "../../../page-objects/streams/restApi/homeRestApi"
import reporter from "../../../utils/reporter"

class RegistrationRestApi {

    static putRegistrationStepsRes: any

    constructor() {

    }

    async putRegistrationSteps(host: string, payload: string): Promise<any> {

        let endpoint = `/v3/admin/events/registration-steps`;
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
        RegistrationRestApi.putRegistrationStepsRes = JSON.parse(JSON.stringify(response))
        return RegistrationRestApi.putRegistrationStepsRes
    }
}

export default new RegistrationRestApi