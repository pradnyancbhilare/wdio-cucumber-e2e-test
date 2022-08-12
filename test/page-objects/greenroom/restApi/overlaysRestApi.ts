import request from 'supertest';
import HomeRestApi from './homeRestApi';

/*
    Manually importing interfaces from Greenroom:
    - `AnimationType`
    - `GraphicsShotsRelationalTableInfo`
    - `GraphicInterface`
*/

interface AnimationType {
    build_in?: number;
    build_out?: number;
    delay_in?: number;
    delay_out?: number;
    id?: number;
    in_animation?: number;
    in_direction?: number;
    in_duration?: number;
    name: string;
    out_animation?: number;
    out_direction?: number;
    out_duration?: number;
    show_for?: number;
}

interface GraphicsShotsRelationalTableInfo {
    graphic_id: number;
    id: number;
    layer_index: number;
    shot_id: number;
}

export interface GraphicInterface {
    animation_css: string;
    animation_direction: string;
    animation_duration: number;
    animation: AnimationType;
    canvas_scalar: number;
    channel: number;
    cloud_convert_id?: string;
    convert_status?: string;
    created_at?: string;
    created_by: number;
    edited_at?: string;
    edited_by: number;
    id?: number;
    images: string;
    is_global: number | boolean;
    loops: number | boolean;
    meeting: number;
    original_name: string;
    play_audio: number | boolean;
    pos_x: number;
    pos_y: number;
    rotate: number;
    scale_x: number;
    scale_y: number;
    shots: GraphicsShotsRelationalTableInfo[];
    status: boolean;
    title: string;
    upload_id: string | null;
    z_index: number;
}

interface APIResponseGetOverlays {
    body: GraphicInterface[];
    status: number;
}

interface APIResponseSetOverlays {
    body?: GraphicInterface;
    status: number;
}

class OverlaysRestApi {

    static enabledGraphics: number[];
    static responseGetOverlays: APIResponseGetOverlays;
    static responseSetOverlay: APIResponseSetOverlays;

    async postCreateGraphic(host: string, meetingId: number, payload: string): Promise<any> {
        let endpoint = `/v2/greenroom/graphics/${meetingId}`
        console.log(`The url is >> ${host}${endpoint}`)
        console.log(`The payload is >> ${payload}`)

        let response = await request(host)
            .post(endpoint)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken)
            .set("content-type", "application/json")
            .accept("application/json")
            .send(payload)

        console.log(`>> Response here : ${JSON.stringify(response.body)}`)
        return JSON.parse(JSON.stringify(response));

    }

    async deleteMediaItem(host: string, mediaId: number): Promise<any> {
        let endpoint = `/v2/greenroom/media/${mediaId}`
        console.log(`The url is >> ${host}${endpoint}`)

        let response = await request(host)
            .delete(endpoint)
            .set("bl-token", Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken)
            .set("content-type", "application/json")
            .accept("application/json")
            .send();

        console.log(`>> Response here : ${JSON.stringify(response.body)}`)
        return JSON.parse(JSON.stringify(response));

    }

    async requestGetOverlays(
        host: string,
        meetingId: number,
    ): Promise<APIResponseGetOverlays> {
        const endpoint = `/v2/greenroom/graphics/${meetingId}`;
        const token = Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken;

        console.log(`The url is >> ${host}${endpoint}`);
        console.log(`The mediaId is >> ${meetingId}`);

        const response = await request(host)
            .get(endpoint)
            .set('content-type', 'application/json')
            .set('bl-token', token)
            .accept('application/json')
            .send();

        console.log(`The response is >> ${JSON.stringify(response.body, null, 2)}`);

        /*
            Builds a number[] of `enabledGraphics` from all overlays.
            This works with a default room, but will need to be managed when we
            have manually animated graphics so we follow Greenroom business
            rules.
        */
        const buildEnabledGraphics: number[] = (
            response.body as GraphicInterface[]
        ).reduce<number[]>((idArray: number[], { id }: GraphicInterface) => {
            if (id) {
                return [...idArray, id];
            }

            return idArray;
        }, []);

        OverlaysRestApi.enabledGraphics = buildEnabledGraphics;
        OverlaysRestApi.responseGetOverlays = {
            body: response.body,
            status: response.status,
        };

        return OverlaysRestApi.responseGetOverlays;
    }

    async requestSetOverlay(
        host: string,
        meetingId: number,
        payload: GraphicInterface,
    ): Promise<APIResponseSetOverlays> {
        const endpoint = `/v2/greenroom/graphics/${meetingId}`;
        const token = Object.getPrototypeOf(HomeRestApi).constructor.greenroomToken;

        console.log(`The url is >> ${host}${endpoint}`);
        console.log(`The mediaId is >> ${meetingId}`);
        console.log(`The payload is >> ${JSON.stringify(payload, null, 2)}`);

        const response = await request(host)
            .post(endpoint)
            .set('content-type', 'application/json')
            .set('bl-token', token)
            .accept('application/json')
            .send(payload);

        console.log(`The response is >> ${JSON.stringify(response.body, null, 2)}`);

        /*
            As above, we are adding to `enabledGraphics`.
            This will also need to be managed so we follow Greenroom business
            rules.
        */
        const addedOrUpdatedGraphic = (response.body as GraphicInterface | undefined)?.id

        if (addedOrUpdatedGraphic) {
            // Adding unique overlay IDs to the `enabledGraphics` number[]
            OverlaysRestApi.enabledGraphics = Array.from(
                new Set([...OverlaysRestApi.enabledGraphics, addedOrUpdatedGraphic]),
            );
        }

        OverlaysRestApi.responseSetOverlay = {
            body: response.body,
            status: response.status,
        };

        return OverlaysRestApi.responseSetOverlay;
    }

    getEnabledGraphics() {
        return OverlaysRestApi.enabledGraphics;
    }

    getAllOverlays() {
        return OverlaysRestApi.responseGetOverlays;
    }

    /*
        This will find 0 - 1 overlay(s) with the `overlayName` parameter
        matching `title` or `original_name`.
        It is looking for an exact match.
        If desired, it could look for a case-insensitive or partial
        match, but for now it makes sense to have an exact match.
    */
    getOverlayByName(overlayName: string): GraphicInterface | null {
        const overlays = OverlaysRestApi.responseGetOverlays.body;

        if (overlays?.length) {
            // First, we perform a search for a matching title
            const findByTitle = overlays.find(
                ({ title }) => title === overlayName,
            );

            // If that is found, return the overlay
            if (findByTitle) {
                return findByTitle;
            }

            // If we haven't found anything so far, try matching the
            // `original_name` as a backup
            const findByOriginalName = overlays.find(
                ({ original_name }) => original_name === overlayName,
            );

            return findByOriginalName ?? null;
        }

        return null;
    }

}

export default new OverlaysRestApi;
