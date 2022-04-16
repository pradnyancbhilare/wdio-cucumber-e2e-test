import {config as baseConfig} from "../wdio.conf"
export const config = Object.assign(baseConfig, {
    // All STAGE environment specific key value pairs
    Environment: "Stage",
    Greenroom_Ui_Host: "https://greenroom.brandlive-staging.com",
    Greenroom_Api_Host: "https://greenroom-api.brandlive-staging.com",
    Streams_Ui_Host: "https://admin.brandlive-staging.com",
    Streams_Api_Host: "https://events-api.brandlive-staging.com",
    Username: "brandlive.automation1@gmail.com",
    Password: "Brandlive123!",
    ChannelName: "Brandlive QA Automation I"
})