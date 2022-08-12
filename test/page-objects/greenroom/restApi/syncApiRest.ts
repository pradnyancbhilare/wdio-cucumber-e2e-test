import request from 'supertest';
import HomeRestApi from './homeRestApi';

/*
	The `write-state` payload is a string, but it is a string made from a
	`WriteStateRequest` shaped object. These types are intended to aid
	engineers in sending the correct `write-state` payload.
*/

export enum SyncActions {
	AddGraphics = 'ADD_GRAPHICS',
	AddOverlaysUploadData = 'ADD_OVERLAYS_UPLOAD_DATA',
	AppendGraphics = 'APPEND_GRAPHICS',
	BulkEditGraphics = 'BULK_EDIT_GRAPHICS',
	DeleteGraphics = 'DELETE_GRAPHICS',
	DeleteOverlaysUploadData = 'DELETE_OVERLAYS_UPLOAD_DATA',
	EditGraphics = 'EDIT_GRAPHICS',
	HideGraphicModal = 'HIDE_GRAPHIC_MODAL',
	LoadGraphics = 'LOAD_GRAPHICS',
	PlayingPreviewAnimation = 'PLAYING_PREVIEW_ANIMATION',
	PrependGraphics = 'PREPEND_GRAPHICS',
	RemoveGraphics = 'REMOVE_GRAPHICS',
	SetCurrentGraphicsId = 'SET_CURRENT_GRAPHICS_ID',
	SetEnabledGraphics = 'SET_ENABLED_GRAPHICS',
	SetPresentedMedia = 'SET_PRESENTED_MEDIA',
	SetPresentedMediaVideostate = 'SET_PRESENTED_MEDIA_VIDEOSTATE',
	SetShotModalGraphics = 'SET_SHOT_MODAL_GRAPHICS',
	ShowGraphicModal = 'SHOW_GRAPHIC_MODAL',
	SyncShotsReducerState = 'SYNC_SHOTS_REDUCER_STATE',
	UpdateGraphics = 'UPDATE_GRAPHICS',
}

interface StateData {
	conditional: boolean;
	reducer: string;
	resetOnEmpty: boolean;
	stateVar: string;
}

interface Action {
	payload: unknown;
	type: SyncActions;
}

export interface WriteStateRequest {
	action: Action;
	room: number;
	session: string;
	stateData: StateData;
	timestamp: number;
}

interface WriteStateResponse {
	status: number;
	text?: string;
}

class syncApiRest{

    constructor() {}

	async writeState(
		host: string,
		payload: string,
	): Promise<WriteStateResponse> {
		const endpoint = `/write-state`;
		const token = Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken;

		console.log(`The url is >> ${host}${endpoint}`);
		console.log(`The payload is >> ${payload}`);

		const response = await request(host)
			.post(endpoint)
			.set('content-type', 'application/json')
			.set('bl-token', token)
			.accept('application/json')
			.send(payload);

		console.log(`>> Response status : ${JSON.stringify(response.status)}`);

		return response;
	}

	// Pass through to allow below function name where it makes sense
	async writeSetPresenterMedia(
		host: string,
		payload: string,
	): Promise<WriteStateResponse> {
		const response = await this.writeState(host, payload);

		return response;
	}

}

export default new syncApiRest;
