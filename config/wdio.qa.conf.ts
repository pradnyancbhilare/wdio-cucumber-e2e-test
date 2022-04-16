import {config as baseConfig} from "../wdio.conf"
export const config = Object.assign(baseConfig, {
    // All QA environment specific key value pairs
    Environment: "QA",
    Greenroom_Ui_Host: "https://greenroom.brandlive-qa.com",
    Greenroom_Api_Host: "https://greenroom-api.brandlive-qa.com",
    Streams_Ui_Host: "https://admin.brandlive-qa.com",
    Streams_Api_Host: "https://events-api.brandlive-qa.com",
    Username: "brandlive.automation1@gmail.com",
    Password: "Brandlive123!",
    ChannelName: "Brandlive QA Automation I"
})