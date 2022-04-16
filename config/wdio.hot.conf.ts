import {config as baseConfig} from "../wdio.conf"
export const config = Object.assign(baseConfig, {
    // All HOT environment specific key value pairs
    Environment: "HOT",
    Greenroom_Ui_Host: "https://greenroom.brandlive-hot.com",
    Greenroom_Api_Host: "https://greenroom-api.brandlive-hot.com",
    Streams_Ui_Host: "https://admin.brandlive-hot.com",
    Streams_Api_Host: "https://events-api.brandlive-hot.com",
    Username: "brandlive.automation1@gmail.com",
    Password: "Brandlive123!",
    ChannelName: "Brandlive QA Automation I"
})