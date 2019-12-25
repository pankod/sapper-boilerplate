import "@babel/polyfill";
import dotenv from 'dotenv';
import nock from 'nock';
import { cleanup } from '@testing-library/svelte'

dotenv.config({path: './.test.env'});

beforeEach(cleanup)

const baseUrl = process.env.API_URL;

nock(baseUrl)
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

nock(baseUrl)
	.get('/200')
	.reply(200, { success: true });

nock(baseUrl)
	.get('/404')
	.reply(404, { success: false });
