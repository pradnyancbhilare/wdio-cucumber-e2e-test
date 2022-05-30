import Page from "../../page"
import reporter from "../../../utils/reporter"

class DirectoryLive extends Page {

    constructor() {
        super()
    }

    // Directory Live tab details
    get directoryTab() { return $(`//*[name()='svg' and @id='icon-people-nav']`) }
    get profileCards() { return $$(`//li[contains(@class,'directory-profile-card')]`) }
    get bookmarkIcon() { return $(`//*[name()='svg' and @id='icon-bookmark']`) }
    get profileAvatar() { return $$(`//div[contains(@style,'background-image: url')]`) }
    get profileCardsHeaders() { return $$(`//div[@class='card-item-content']//h5`) }
    get profileCardsHeadersValue() { return $$(`//div[@class='card-item-content']//p`) }
    get closeProfileDetailsPopUP() { return $(`//*[name()='svg' and @id='icon-close']`) }
    get PopUpView() { return $(`//div[@class='modal medium event-preview']`) }
    get profile() { return $(`//li[contains(@class,'directory-profile-card')][1]`) }

    async verifyDirectoryTab() {
        try {
            if (await this.directoryTab.isDisplayed()) {
                reporter.addStep("info", "Verified the Directory tab.")
            }
        } catch (err) {
            err.message = `Error verifying the Directory tab: , ${err.message} `
            throw err
        }
    }

    async clickOnTheDirectoryTab() {
        try {
            await this.click(await this.directoryTab)
            reporter.addStep("info", "Clicked on the Directory tab.")
        } catch (err) {
            err.message = `Error clicking on the live Directory tab: , ${err.message} `
            throw err
        }
    }

    async verifyAttendeesProfileCardsList() {
        try {
            let profileCardsList: WebdriverIO.Element[]
            profileCardsList = await this.profileCards
            for (let i = 0; i < profileCardsList.length; i++) {
                if (await profileCardsList[i].isDisplayed()) {
                    reporter.addStep("info", `Profile card is displyed:  ${i}`);
                }
            }
        } catch (err) {
            err.message = `Error verifying the profile cards list under the Directory tab: , ${err.message} `
            throw err
        }
    }

    async verifyBookMarkAttendeesIcon() {
        try {
            if (await this.bookmarkIcon.isDisplayed()) {
                reporter.addStep("info", "Verified the Bookmark attendees icon.")
            }
        } catch (err) {
            err.message = `Error verifying bookmark attendees icon: , ${err.message} `
            throw err
        }
    }

    async verifyAvatarToAttendeesProfile() {
        try {
            let avatar: WebdriverIO.Element[]
            avatar = await this.profileAvatar
            for (let i = 0; i < avatar.length; i++) {
                if (await avatar[i].isDisplayed()) {
                    reporter.addStep("info", `Avatar is displayed to the attendees profile card:  ${i}`);
                }
            }
        } catch (err) {
            err.message = `Error verifying Avatar to attendees profile: , ${err.message} `
            throw err
        }
    }

    async VerifyPopUPDetailsforAttendees() {
        try {
            let profiles: WebdriverIO.Element[]
            profiles = await this.profileCards
            for (let i = 0; i < profiles.length; i++) {
                if (await profiles[i].isDisplayed()) {
                    await this.click(profiles[i])
                    await browser.pause(3000)
                    reporter.addStep("info", `Clicked on the ${i} profile:`)
                    this.popupDetails()
                    await this.click(await this.closeProfileDetailsPopUP)
                    reporter.addStep("info", `Closed the profile details pop up.`)
                }
            }
        } catch (err) {
            err.message = `Error Error veriying the profiles pop up details: , ${err.message} `
            throw err
        }
    }

    private async popupDetails() {
        try {
            let headers: WebdriverIO.Element[]
            headers = await this.profileCardsHeaders
            reporter.addStep("info", `Getting the profile pop up header details...`)
            for (let i = 0; i < headers.length; i++) {
                if (await headers[i].isDisplayed()) {
                    let headerName = await headers[i].getText()
                    reporter.addStep("info", `The Header name is: ${headerName}`)
                }
            }
            let headersValue: WebdriverIO.Element[]
            headersValue = await this.profileCardsHeadersValue
            reporter.addStep("info", `Getting the profile pop up header values...`)
            for (let i = 0; i < headersValue.length; i++) {
                if (await headersValue[i].isDisplayed()) {
                    let headerValue = await headersValue[i].getText()
                    reporter.addStep("info", `The Header value is: ${headerValue}`)
                }
            }
        } catch (err) {
            err.message = `Error getting the profiles pop up details: , ${err.message} `
            throw err
        }
    }

    async verifyInPopUpView() {
        try {
            await this.click(await this.profile)
            reporter.addStep("info", "Clicked on the profile card.")
            await browser.pause(2000)
            if (await this.PopUpView.isDisplayed()) {
                reporter.addStep("info", "Verified the Pop Up view.")
                await this.click(await this.closeProfileDetailsPopUP)
                reporter.addStep("info", "Closed the Profile pop up details.")
            }
        } catch (err) {
            err.message = `Error verifying the pop up view: , ${err.message} `
            throw err
        }
    }

    async verifyAsPageView() {
        try {
            await this.click(await this.profile)
            reporter.addStep("info", "Clicked on the profile card.")
            await browser.pause(2000)
            if (!await this.PopUpView.isDisplayed()) {
                reporter.addStep("info", "Verified the As a Page view.")
            }
        } catch (err) {
            err.message = `Error verifying the As a Page view: , ${err.message} `
            throw err
        }
    }
}
export default new DirectoryLive