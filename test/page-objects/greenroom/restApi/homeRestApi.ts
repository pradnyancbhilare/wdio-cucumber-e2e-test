import request from "supertest"

class HomeRestApi {

    static postCheckAppsForProducerRes: any
    static postLoginToGreenroomWithAppByProducerRes: any
    static greenroomToken: string
    static getChannelsForProfileRes: any
    static getSessionTypesRes: any
    static getEventsForChannelRes: any

    constructor() {

    }

    async postCheckAppsForProducer(host: string, payload: string): Promise<any> {

        let endpoint = `/v2/greenroom/check-apps-email-is-producer-for`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)
        
        let response = await request(host)
                    .post(endpoint)
                    .set("content-type", "application/json")
                    .accept("application/json")
                    .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        HomeRestApi.postCheckAppsForProducerRes = JSON.parse(JSON.stringify(response.body))
        return HomeRestApi.postCheckAppsForProducerRes
    }

    async postLoginToGreenroomWithAppByProducer(host: string, payload: string): Promise<any> {

        let endpoint = `/v2/greenroom/producer/login/`;
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)
        
        let response = await request(host)
                    .post(endpoint)
                    .set("content-type", "application/json")
                    .accept("application/json")
                    .send(payload)

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        HomeRestApi.postLoginToGreenroomWithAppByProducerRes = JSON.parse(JSON.stringify(response.body))
        HomeRestApi.greenroomToken = HomeRestApi.postLoginToGreenroomWithAppByProducerRes.token
        console.log(`The token is: ${HomeRestApi.greenroomToken}`)
        return HomeRestApi.postLoginToGreenroomWithAppByProducerRes
    }

    async getChannelsForProfile(host: string): Promise<any> {

        let endpoint = `/v2/greenroom/profile/events`;
        console.log(`The url is >> ${host}${endpoint}`)
        
        let response = await request(host)
                    .get(endpoint)
                    .set("content-type", "application/json")
                    .set("bl-token", HomeRestApi.greenroomToken)
                    .accept("application/json")

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        HomeRestApi.getChannelsForProfileRes = JSON.parse(JSON.stringify(response.body))
        return HomeRestApi.getChannelsForProfileRes
    }

    async getSessionTypes(host: string): Promise<any> {

        let endpoint = `/v2/greenroom/show-sessions/types`;
        console.log(`The url is >> ${host}${endpoint}`)
        
        let response = await request(host)
                    .get(endpoint)
                    .set("content-type", "application/json")
                    .set("bl-token", HomeRestApi.greenroomToken)
                    .accept("application/json")

        console.log(`>> Response: ${JSON.stringify(response.body)}`)
        HomeRestApi.getSessionTypesRes = JSON.parse(JSON.stringify(response.body))
        return HomeRestApi.getSessionTypesRes
    }

    async getEventsForChannel(host: string, channelId: number): Promise<any> {

        let endpoint = `/v2/greenroom/events/broadcast-sessions/${channelId}`;
        console.log(`The url is >> ${host}${endpoint}`)
        
        let response = await request(host)
                    .get(endpoint)
                    .set("content-type", "application/json")
                    .set("bl-token", HomeRestApi.greenroomToken)
                    .accept("application/json")

        //console.log(`>> Response: ${JSON.stringify(response.body)}`)
        HomeRestApi.getEventsForChannelRes = JSON.parse(JSON.stringify(response.body))
        return HomeRestApi.getEventsForChannelRes
    }

}

export default new HomeRestApi