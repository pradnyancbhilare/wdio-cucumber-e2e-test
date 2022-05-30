import {config as baseConfig} from "../wdio.conf"

const hostname = process.env.SELENIUM_GRID_HOST ?? 'localhost';
const port = process.env.SELENIUM_GRID_PORT ?? 80;
const path = process.env.SELENIUM_GRID_PATH ?? '/';
const server = process.env.GREENROOM_URL ?? 'https://greenroom.brandlive-qa.com';

export const config = Object.assign(baseConfig, {
	hostname,
	port: Number(port),
	path,
	Greenroom_Ui_Host: server,
	Password: "Brandlive123!",
});
