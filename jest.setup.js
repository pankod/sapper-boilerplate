import "@babel/polyfill";
import dotenv from 'dotenv';
import nock from 'nock';
import { cleanup } from '@testing-library/svelte'

dotenv.config({path: './.env.test'});

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
