import { BulkEditShotsPayload } from './../../../page-objects/greenroom/restApi/detailsPageRestApi';

import { Given, When, Then } from "@cucumber/cucumber";
import chai, { use } from "chai";
import StandaloneHomeRestApi from "../../../page-objects/greenroom/restApi/standaloneHomeRestApi";
import shotsRestApi from "../../../page-objects/greenroom/restApi/shotsRestApi";
import editJsonFile from "edit-json-file";
import standaloneHomeRestApi from "../../../page-objects/greenroom/restApi/standaloneHomeRestApi";
import uploadGRRestApi from "../../../page-objects/greenroom/restApi/uploadGRRestApi";
import builderModeRestApi from "../../../page-objects/greenroom/restApi/builderModeRestApi"

class shotApi{
	constructor(){

	}

	public async getPayloadOfAddShot(payloadAddShot: string){ 
		let file = editJsonFile(payloadAddShot)	
		file.set("shot.meeting", Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId)
		file.set("meetingId", Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId)
		return  JSON.stringify(file.toObject())
	}

	public async getPayloadOfEditShot(payloadEditShot: string, editOperation: string,feed:string =""){ 
		let file = editJsonFile(payloadEditShot)
		let editPayload : string
		let selectShotPayload : any
		switch(editOperation){
			case 'duration' :
				editPayload = `{
					"shot": ${Object.getPrototypeOf(shotsRestApi).constructor.addShotResponseBody},
					"meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}
				  }`;
		
				  selectShotPayload = JSON.parse(editPayload);
		
				// Updating payload values
				selectShotPayload.shot.media = null
				selectShotPayload.shot.presenters = null
				selectShotPayload.shot.status =1
				selectShotPayload.shot.shot_data.order = 1
				selectShotPayload.shot.shot_data.shotDuration = 300
			break;

			case 'title' :
				 editPayload = `{
					"shot": ${Object.getPrototypeOf(shotsRestApi).constructor.addShotResponseBody},
					"meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}
				  }`;
		
				  selectShotPayload = JSON.parse(editPayload);
		
				// Updating payload values
				selectShotPayload.shot.media = null
				selectShotPayload.shot.presenters = null
				selectShotPayload.shot.status =1
				selectShotPayload.shot.shot_data.order = 1
				selectShotPayload.shot.shot_data.shotTitle = "New Shot 3"
			break;

			case 'drag and drop' :
		file.set("shot.shot_id", Object.getPrototypeOf(shotsRestApi).constructor.getShotId)
		file.set("shot.meeting", Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId)
		file.set("meetingId", Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId)
		file.unset("shot.shot_data.shotFeeds")
		if(feed = "one"){
		file.set("shot.shot_data.shotFeeds",[
			{
				"position": 0,
				"feedType": "media",
				"media": Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId1,
				"presenter": null,
				"email": null,
				"screenshare": null
			  },
			  {
				"media": null,
				"presenter": null,
				"email": null,
				"screenshare": null,
				"feedType": "empty",
				"position": 0
			  },
			  {
				"media": null,
				"presenter": null,
				"email": null,
				"screenshare": null,
				"feedType": "empty",
				"position": 0
			  }
		])
	}
	if(feed = "two"){
		file.set("shot.shot_data.shotFeeds",[
			{
				"position": 0,
				"feedType": "media",
				"media": Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId1,
				"presenter": null,
				"email": null,
				"screenshare": null
			  },
			  {
				"position": 1,
				"feedType": "media",
				"media": Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId2,
				"presenter": null,
				"email": null,
				"screenshare": null
			  },
			  {
				"media": null,
				"presenter": null,
				"email": null,
				"screenshare": null,
				"feedType": "empty",
				"position": 0
			  }
		])
	}
	if(feed = "three"){
		file.set("shot.shot_data.shotFeeds",[
			{
				"position": 0,
				"feedType": "media",
				"media": Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId1,
				"presenter": null,
				"email": null,
				"screenshare": null
			  },
			  {
				"position": 1,
				"feedType": "media",
				"media": Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId2,
				"presenter": null,
				"email": null,
				"screenshare": null
			  },
			  {
				"position": 2,
				"feedType": "media",
				"media": Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId3,
				"presenter": null,
				"email": null,
				"screenshare": null
			  }
		])
	}
			break;
		}
		console.log('shot is on edit method is ', Object.getPrototypeOf(shotsRestApi).constructor.getShotId)
		file.set("shot.shot_id", Object.getPrototypeOf(shotsRestApi).constructor.getShotId)
		file.set("shot.meeting", Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId)
		console.log(`media id in shot is ${Object.getPrototypeOf(uploadGRRestApi).constructor.getMediaId}`)
		file.set("meetingId", Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId)
		
		return  JSON.stringify(file.toObject())
	}

	public async getPayloadForEditingSelectedNewShot(editValue: string){
		let editPayload = `{
			"shot": ${Object.getPrototypeOf(shotsRestApi).constructor.addShotResponseBody},
			"meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}
		  }`;

		 let selectShotPayload = JSON.parse(editPayload);

		// Updating payload values
		selectShotPayload.shot.media = null
		selectShotPayload.shot.presenters = null
		selectShotPayload.shot.status =1
		selectShotPayload.shot.shot_data.order = 1

		if (editValue == "shotDuration"){
			selectShotPayload.shot.shot_data.shotDuration = 300
		}
		if (editValue == "shotTitle"){
			selectShotPayload.shot.shot_data.shotTitle = "New Shot 3"
		}
		return selectShotPayload
	}

	public async getPayloadOfBulkEditShots(jsonInput: string, editOperation: string){ 
		const parsedJsonInput = editJsonFile(jsonInput).toObject() as BulkEditShotsPayload;
		const uneditedPayload: string = `{
			"shots": ${Object.getPrototypeOf(shotsRestApi).constructor.postLoadShotResponseBody},
			"meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}
		}`;
		let editedPayload = JSON.parse(uneditedPayload);

		switch (editOperation) {
			case 'shot_style.queue':
				editedPayload.shots.forEach(shot => {
					return shot.shot_style.queue = parsedJsonInput.shots[0].shot_style.queue;
				});
				break;
			case 'shot_style.applied':
				editedPayload.shots.forEach(shot => {
					return shot.shot_style.applied = parsedJsonInput.shots[0].shot_style.applied;
				});
				break;
		}
		
		return JSON.stringify(editedPayload);
	}
}

export default new shotApi

	 Given (/^Post Load Shots$/, async function(){
		let payload = `{"meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}}`;
		   //@ts-ignore
		let response = await shotsRestApi.postLoadShots(browser.config.Greenroom_Api_Host,payload)
		let loadShotDetails = JSON.parse(JSON.stringify(response.body))
		for(let i = 0; i < loadShotDetails.length; i++) {
			let obj = loadShotDetails[i];
			console.log(`>>Load Shots : ${obj.shot_id}`)
		}
		chai.expect(response.status).to.equal(200)
	})

	Given (/^Add shot in builder mode$/, async function(){
		let setAddShot = "./data/jsonFiles/greenroom/payload_addShot.json"
		let file = await (new shotApi().getPayloadOfAddShot(setAddShot))
		let payload = file
	
		//@ts-ignore
		let response = await shotsRestApi.postAddShotInBuilderMode(browser.config.Greenroom_Api_Host , payload)
		chai.expect(response.status).to.equal(200)
	 })

	 Given (/^Post Bulk Edit Shots$/, async function(){

		let postBulkEditShotsPayload = `{
			"shots": ${Object.getPrototypeOf(shotsRestApi).constructor.postLoadShotResponseBody},
			"meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}
		  }`;

		  //@ts-ignore
		let response = await shotsRestApi.postBulkEditShots(browser.config.Greenroom_Api_Host , postBulkEditShotsPayload)
		chai.expect(response.status).to.equal(200)
	 })

	 Given (/^Delete shot in builder mode$/, async function(){
		let payloadstring = {
			"meetingId": Object.getPrototypeOf(standaloneHomeRestApi).constructor.getNewSGRMeetingId,
			"shotId": Object.getPrototypeOf(shotsRestApi).constructor.getShotId,
		}
	  
		let payload = JSON.stringify(payloadstring) 
		//@ts-ignore
		let response = await shotsRestApi.postDeleteShot(browser.config.Greenroom_Api_Host , payload)
		chai.expect(response.status).to.equal(200)
	 })

	 Given (/^Post edit (.*) for the shot$/, async function(editAction: string){
		let setEditShot = "./data/jsonFiles/greenroom/payload_editShot.json"
		let file = await (new shotApi().getPayloadOfEditShot(setEditShot,editAction))
		let payload = file
	
		//@ts-ignore
		let response = await shotsRestApi.editShotInBuilderMode(browser.config.Greenroom_Api_Host , payload)
		chai.expect(response.status).to.equal(200)
	 })

	 Given(/^Add (.*) of newly added shot$/,async function(editType: string) {
		let payload = await (new shotApi().getPayloadForEditingSelectedNewShot(editType))
		//@ts-ignore
		let response = await shotsRestApi.postEditNewlyAddedShot(browser.config.Greenroom_Api_Host , payload)
		chai.expect(response.status).to.equal(200)
	 })

Then(/^Bulk edit (.*)$/, async (editType: string) => {
	const bulkEditShotJson = "./data/jsonFiles/greenroom/payload_bulkEditShot.json";
	const payload = await (new shotApi().getPayloadOfBulkEditShots(bulkEditShotJson, editType));

	const config = browser.config as unknown as { [key: string]: any };
	const response = await shotsRestApi.postBulkEditShots(config.Greenroom_Api_Host, payload);
	
	chai.expect(response.status).to.equal(200);
});

Then(/^Load shots after bulk edit of (.*)$/, async (editType: string) => {
	const payload = `{ "meetingId": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId} }`;

	const config = browser.config as unknown as { [key: string]: any };
	const response = await shotsRestApi.postLoadShots(config.Greenroom_Api_Host, payload);
	
	if (editType.includes('shot_style')) {
		const bulkEditShotJson = "./data/jsonFiles/greenroom/payload_bulkEditShot.json";
		const parsedBulkEditShotStyle = (editJsonFile(bulkEditShotJson).toObject() as BulkEditShotsPayload).shots[0].shot_style;
		const loadShotDetails = JSON.parse(JSON.stringify(response.body));

		for(let i = 0; i < loadShotDetails.length; i++) {
			const obj = loadShotDetails[i];
			switch (editType) {
				case 'shot_style.queue':
					chai.expect(obj.shot_style.queue).to.deep.equal(parsedBulkEditShotStyle.queue);
					chai.expect(obj.shot_style.applied).to.not.deep.equal(parsedBulkEditShotStyle.applied);
					console.log(`>>Load Shots - Updated shot_style.queue: ${JSON.stringify(obj.shot_style.queue)}`);
					break;
				case 'shot_style.applied':
					chai.expect(obj.shot_style.queue).to.deep.equal(parsedBulkEditShotStyle.queue);
					chai.expect(obj.shot_style.applied).to.deep.equal(parsedBulkEditShotStyle.applied);
					console.log(`>>Load Shots - Updated shot_style.applied: ${JSON.stringify(obj.shot_style.applied)}`);
					break;
			}
		}
	}

	chai.expect(response.status).to.equal(200);
});

Then(/^Save new wallpaper in settings as defaultMeetingImage$/, async function() {
	const appliedShotStyle = JSON.parse(Object.getPrototypeOf(shotsRestApi).constructor.postLoadShotResponseBody)[0].shot_style.applied;
	let newSettings = JSON.parse(Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getDetailsByMeetingId.settings_json);
	newSettings.defaultMeetingImage = {
		image: appliedShotStyle.wallpaperImage,
		color: appliedShotStyle.wallpaperColor,
		scale: appliedShotStyle.wallpaperScale
	}

	let payload = `{
		"meeting": ${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId},
		"settings": ${JSON.stringify(JSON.stringify(newSettings))}
	}`;

	const config = browser.config as unknown as { [key: string]: any };
	let response = await builderModeRestApi.postSettings(config.Greenroom_Api_Host, payload);

    chai.expect(response.status).to.equal(200)
});

Given (/^Post edit (.*) for the shot on feed (.*)$/, async function(editAction: string,feed:string){
	let setEditShot = "./data/jsonFiles/greenroom/payload_editShot.json"
	let file = await (new shotApi().getPayloadOfEditShot(setEditShot,editAction))
	let payload = file
	console.log('payload for edit shot feed is ', payload)

	//@ts-ignore
	let response = await shotsRestApi.editShotInBuilderMode(browser.config.Greenroom_Api_Host , payload)
	chai.expect(response.status).to.equal(200)
 })