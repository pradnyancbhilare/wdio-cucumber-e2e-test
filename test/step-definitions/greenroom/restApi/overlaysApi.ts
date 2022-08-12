import { Then } from '@cucumber/cucumber';
import chai from 'chai';

import OverlaysRestApi, { GraphicInterface } from '../../../page-objects/greenroom/restApi/overlaysRestApi';
import StandaloneHomeRestApi from '../../../page-objects/greenroom/restApi/standaloneHomeRestApi';
import uploadRestApi from '../../../page-objects/greenroom/restApi/uploadGRRestApi';
import writeStateRestApi, {
    SyncActions,
    WriteStateRequest,
} from '../../../page-objects/greenroom/restApi/syncApiRest';
import HomeApi from '../../../step-definitions/greenroom/restApi/homeApi';

Then(/^Get all overlays$/, async () => {
    const config = browser.config as unknown as { [key: string]: any };
    const meetingId = Number(
        `${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}`,
    );
    const response = await OverlaysRestApi.requestGetOverlays(
        config.Greenroom_Api_Host,
        meetingId,
    );

    chai.expect(response.status).to.equal(200);

    /*
        Not testing for `chai.expect(response.body).to.have.length`, since there
        might not be any overlays if we delete them all.
    */
});

Then(/^Duplicate the overlay named (.*)$/, async (overlayName: string) => {
    const config = browser.config as unknown as { [key: string]: any };
    const meetingId = Number(
        `${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}`,
    );
    const selectedOverlay = OverlaysRestApi.getOverlayByName(overlayName);
    const selectedOverlayId = selectedOverlay?.id;

    chai.expect(selectedOverlay).to.exist;
    chai.expect(selectedOverlayId).to.exist;
    chai.expect(selectedOverlayId).to.be.above(0);

    if (selectedOverlay && selectedOverlayId) {
        // Using the same front end code to strip `id` from overlay / animation
        const setDuplicatedOverlay = {
            ...selectedOverlay,
            // We need a new animation
            animation: { name: 'none', id: 0 },
            animation_css: '',
            animation_direction: 'none',
            animation_duration: 0,
        };

        // And a new overlay
        delete setDuplicatedOverlay.id;

        const {
            body: duplicatedOverlay,
            status,
        } = await OverlaysRestApi.requestSetOverlay(
            config.Greenroom_Api_Host,
            meetingId,
            setDuplicatedOverlay,
        );

        chai.expect(status).to.equal(200);
        chai.expect(duplicatedOverlay).to.exist;
        chai.expect(duplicatedOverlay?.id).to.exist;
        chai.expect(duplicatedOverlay?.id).to.be.above(selectedOverlayId);
        chai.expect(duplicatedOverlay?.title).to.equal(`${overlayName} 1`);
    }
});

Then(/^Send write state with enabled graphics$/, async () => {
    const config = browser.config as unknown as { [key: string]: any };
    const meetingId = Number(
        `${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}`,
    );
    const sessionId = Object.getPrototypeOf(HomeApi).constructor.sessionId;
    const enabledGraphics = OverlaysRestApi.getEnabledGraphics();
    const objPayload: WriteStateRequest = {
        action: {
            payload: enabledGraphics,
            type: SyncActions.SetEnabledGraphics,
        },
        room: meetingId,
        session: sessionId,
        stateData: {
            conditional: false,
            reducer: 'graphicsReducer',
            resetOnEmpty: true,
            stateVar: 'enabledGraphics',
        },
        timestamp: Date.now(),
    };
    const writeStateResponse = await writeStateRestApi.writeState(
        config.Greenroom_Sync_Host,
        JSON.stringify(objPayload),
    );

    chai.expect(writeStateResponse.status).to.equal(200);
});

Then(/^Create overlay from jpg media item$/, async () => {
    const config = browser.config as unknown as { [key: string]: any };
    const meetingId = Number(
        `${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.getNewSGRMeetingId}`,
    );
    const channelId = Number(
        `${Object.getPrototypeOf(StandaloneHomeRestApi).constructor.channelId}`,
    );
    const imageUrl = String(
        `${Object.getPrototypeOf(uploadRestApi).constructor.postMediaCreateResponse.body[0].images}`,
    );
    let gr_user = await StandaloneHomeRestApi.getGrUserProfile(config.Username)

    const payload: GraphicInterface = {
        "animation": {
            "name": "none",
            "id": 0
        },
        "animation_css": "",
        "scale_x": 23.73046875,
        "scale_y": 75,
        "status": true,
        "animation_direction": "none",
        "animation_duration": 0,
        "canvas_scalar": 0,
        "channel": channelId,
        "created_by": gr_user,
        "edited_by": gr_user,
        "images": imageUrl,
        "meeting": meetingId,
        "original_name": "test.jpg",
        "pos_x": 5,
        "pos_y": 10,
        "rotate": 0,
        "title": "test.jpg",
        "z_index": 0,
        "loops": false,
        "play_audio": true,
        "is_global": false,
        "upload_id": null,
        "shots": [],
        "cloud_convert_id": "",
        "convert_status": ""
    };

    const response = await OverlaysRestApi.postCreateGraphic(config.Greenroom_Api_Host, meetingId, JSON.stringify(payload));
    chai.expect(response.status).to.equal(200);
});

Then(/^Delete jpg media item$/, async () => {
    const config = browser.config as unknown as { [key: string]: any };
    const mediaId = Number(
        `${Object.getPrototypeOf(uploadRestApi).constructor.postMediaCreateResponse.body[0].id}`,
    );
    const response = await OverlaysRestApi.deleteMediaItem(config.Greenroom_Api_Host, mediaId);
    chai.expect(response.status).to.equal(200);
});

