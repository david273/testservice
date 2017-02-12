"use strict";

import { version  } from '../../package.json';
import { Router } from 'express';
import * as Results from './results.js';

function sendResponse(res, status, result, data) {
	res.status(status).json({
		version,
		result,
		data
	});
}

export default () => {
	let api = Router();

	api.get('/test', (req, res) => {
        sendResponse(res, 200, Results.SUCCESS, {});
	});

	return api;
}
