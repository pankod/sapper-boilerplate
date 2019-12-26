import "@babel/polyfill";
import dotenv from 'dotenv';
import nock from 'nock';
import { cleanup } from '@testing-library/svelte'

dotenv.config({path: './.test.env'});

beforeEach(cleanup);

nock("http://localhost:3000")
	.get('/api/link/')
	.reply(200, [
		{
			title: 'test',
			url: 'test'
		},
		{
			title: 'test2',
			url: 'test2'
		}
	]);

nock("http://localhost:3000")
	.get('/200')
	.reply(200, { success: true });

nock("http://localhost:3000")
	.get('/404')
    .reply(404, { success: false });
    
nock("http://localhost:3000")
    .get("/api/planetary/apod")
    .query({ api_key: "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo"})
    .reply(200, {
        copyright: "Pankod",
        date: "2019-05-23",
        explanation: "",
        hdurl: "",
        media_type: "",
        service_version: "",
        title: "",
        url: "",
    });
