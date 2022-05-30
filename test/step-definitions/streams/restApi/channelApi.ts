import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai";
import reporter from "../../../utils/reporter"
import HomeRestApi from "../../../page-objects/streams/restApi/homeRestApi"
import ChannelRestApi from "../../../page-objects/streams/restApi/channelRestApi"

async function getPaidListUuid(): Promise<string> {
    let getPaidListUuid: string
    let responseJson = Object.getPrototypeOf(ChannelRestApi).constructor.getChannelPaidLists

    let keys = Object.keys(responseJson)
    console.log(`>> keys: ${keys}`)

    try{
        if(keys.length >= 1) {
            for(let i = 1; i < keys.length; i++) {
                console.log(`>> key: ${keys[i]}`)
                //console.log(`>> key's value: ${responseJson[keys[i]]}`)
                if(responseJson[keys[i]].members >= 1) {
                    getPaidListUuid = keys[i]
                    return getPaidListUuid
                }
            }
        }
    }catch(err){
        err.message = `Error finding the Paid List UUID: , ${err.message} `
        throw err
    }

    return getPaidListUuid
}

async function getPasscodeListId(): Promise<number> {
    let passcodelistId: number
    let allPasscodeListArr = Object.getPrototypeOf(ChannelRestApi).constructor.getChannelPasscodeLists
    console.log(`Passcode Lists >>> ${JSON.stringify(allPasscodeListArr)}`)

    if(allPasscodeListArr.length >= 1) {
        for(let ele of allPasscodeListArr) {
            for(let key in ele) {
                if(key.match(`member_count`)) {
                    let keyVal= ele[key]
                    if(keyVal >= 1) {
                        passcodelistId = ele['passcode_list']
                        return passcodelistId
                    }
                }
            }
        }
    }

    return passcodelistId
}

async function getChannelId(channelName: string): Promise<number> {
    let allStreamsChannelsArr = Object.getPrototypeOf(HomeRestApi).constructor.getChannelsForProfileRes
    console.log(`Channels >>> ${JSON.stringify(allStreamsChannelsArr)}`)

    let channelId: number
    if(allStreamsChannelsArr.length >= 1) {
        for(let ele of allStreamsChannelsArr) {
            for(let key in ele) {
                let keyVal = `${ele[key]}`
                if(keyVal.match(channelName)) {
                    channelId = parseInt(`${ele['channel']}`)
                }
            }
        }
    }
    if(!channelId) throw Error(`The channel id is ${channelId}`)

    console.log(`Channel id is: ${channelId}`)
    return channelId
}

async function getChannelUuid(channelName: string): Promise<number> {
    let allStreamsChannelsArr = Object.getPrototypeOf(HomeRestApi).constructor.getChannelsForProfileRes
    console.log(`Channels >>> ${JSON.stringify(allStreamsChannelsArr)}`)

    let channelUuid: number
    if(allStreamsChannelsArr.length >= 1) {
        for(let ele of allStreamsChannelsArr) {
            for(let key in ele) {
                let keyVal = `${ele[key]}`
                if(keyVal.match(channelName)) {
                    channelUuid = ele['uuid']
                }
            }
        }
    }
    if(!channelUuid) throw Error(`The channel id is ${channelUuid}`)

    console.log(`Channel uuid is: ${channelUuid}`)
    return channelUuid
}

Given (/^Get channel registrations$/, async function(){
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    let channelId = await getChannelId(channelName)
    console.log(`Channel id is: ${channelId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getChannelRegistrations(browser.config.Streams_Api_Host, channelId)
    chai.expect(response.length).to.greaterThan(0)
    reporter.addStep("info", `Get all registrations for channel for streams... is success.`)
})

Given (/^Get channel registrations count$/, async function(){
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    let channelId = await getChannelId(channelName)
    console.log(`Channel id is: ${channelId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getChannelRegistrationsCount(browser.config.Streams_Api_Host, channelId)
    chai.expect(response.count).to.greaterThan(0)
    reporter.addStep("info", `Get all registrations count for channel for streams... is success.`)
})

Given (/^Get channel passcode lists$/, async function(){
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    let channelId = await getChannelId(channelName)
    console.log(`Channel id is: ${channelId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getChannelPasscodeLists(browser.config.Streams_Api_Host, channelId)
    chai.expect(response.length).to.greaterThan(0)
    reporter.addStep("info", `Get all passcode lists for channel... is success.`)
})

Given (/^Get channel members for passcode list$/, async function(){

    let passcodeListId = await getPasscodeListId()
    console.log(`Passcode List id is: ${passcodeListId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getPasscodeListMembers(browser.config.Streams_Api_Host, passcodeListId)
    chai.expect(response.length).to.greaterThan(0)
    reporter.addStep("info", `Get all members of passcode list... is success.`)
})

Given (/^Get channel member count for passcode list$/, async function(){

    let passcodeListId = await getPasscodeListId()
    console.log(`Passcode List id is: ${passcodeListId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getPasscodeListMembersCount(browser.config.Streams_Api_Host, passcodeListId)
    chai.expect(response[0].member_count).to.greaterThan(0)
    reporter.addStep("info", `Get member count of passcode list... is success.`)
})

Given (/^Get channel paid lists$/, async function(){
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    let channelId = await getChannelId(channelName)
    console.log(`Channel id is: ${channelId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getChannelPaidLists(browser.config.Streams_Api_Host, channelId)
    chai.expect(Object.keys(response).length).to.greaterThan(0)
    reporter.addStep("info", `Get all paid lists for channel... is success.`)
})

Given (/^Get channel members for paid list$/, async function(){

    let paidListUuid = await getPaidListUuid()
    console.log(`Paid List Uuid is: ${paidListUuid}`)
    //@ts-ignore
    let response = await ChannelRestApi.getPaidListMembers(browser.config.Streams_Api_Host, paidListUuid)
    chai.expect(response.members.length).to.greaterThan(0)
    reporter.addStep("info", `Get all members of paid list... is success.`)
})

Given (/^Get stripe status$/, async function(){

    //@ts-ignore
    let response = await ChannelRestApi.getStripeStatus(browser.config.Streams_Api_Host)
    chai.expect(response.stripe_status).to.equal(`ready`)
    reporter.addStep("info", `Get Stripe status... is success.`)
})

Given (/^Get google analytics status$/, async function(){
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    let channelId = await getChannelId(channelName)
    console.log(`Channel id is: ${channelId}`)
    //@ts-ignore
    let response = await ChannelRestApi.getGoogleAnalyticsStatus(browser.config.Streams_Api_Host, channelId)
    chai.expect(response.not_found).to.be.true
    reporter.addStep("info", `Get google analytics status... is success.`)
})

Given (/^Check integration user details$/, async function(){
    //@ts-ignore
    let channelName = browser.config.ChannelName
    console.log(`Validating channel name: ${channelName}`)

    let channelId = await getChannelId(channelName)
    let channelUuid = await getChannelUuid(channelName)
    console.log(`Channel id is: ${channelId} and uuid is ${channelUuid}`)

    let payload = `{"channel":${channelId},"name":"${channelName}","uuid":"${channelUuid}"}`

    //@ts-ignore
    let response = await ChannelRestApi.postCheckIntegrationUser(browser.config.Streams_Api_Host, payload)
    chai.expect(response.user).to.not.null
    chai.expect(response.tray_id).to.not.null
    chai.expect(response.status).to.equal(1)
    reporter.addStep("info", `Check integration user details... is success.`)
})

Given (/^Get integration solutions$/, async function(){

    //@ts-ignore
    let response = await ChannelRestApi.getIntegrationSolutions(browser.config.Streams_Api_Host)
    chai.expect(response.length).to.greaterThan(0)
    reporter.addStep("info", `Get integation solutions... is success.`)
})

Given (/^Get settings auth admins$/, async function(){

    //@ts-ignore
    let response = await ChannelRestApi.getSettingsAuthAdmins(browser.config.Streams_Api_Host)
    chai.expect(response.length).to.greaterThan(0)
    reporter.addStep("info", `Get settings uth admins... is success.`)
})