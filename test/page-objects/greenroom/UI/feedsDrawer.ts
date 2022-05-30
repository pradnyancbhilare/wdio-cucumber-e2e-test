
import Page from "../../page";

class FeedsDrawer extends Page {

	constructor(){
        super()
    }

    get feedsTab(){return $(`//div[@class='right-drawer-menu non-highlight-section']//div[1]//div[1]`)}
    get unmuteAll(){return $(`//button[@class='mute-button padding-medium background-lighter round text-white active']`)}
    get muteAll(){return $(`//button[@class='mute-button padding-medium background-lighter round text-white']`)}

    async openFeedsTab() {
        try {
            await this.click(await this.feedsTab)
            await browser.pause(6000)
        } catch (err) {
            err.message=`Error when selecting 2B Layout`
            throw err
        }
    }

    async unmuteAllUsers() {
        try {
            await this.click(await this.unmuteAll)
            await browser.pause(1000)
        } catch (err) {
            err.message=`Error when unmuting all users`
            throw err
        }
    }

    async muteAllUsers() {
        try {
            await this.click(await this.muteAll)
            await browser.pause(1000)
        } catch (err) {
            err.message=`Error when muting all users`
            throw err
        }
    }



}
export default new FeedsDrawer