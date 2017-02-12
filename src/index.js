"use strict";

import osprey from 'osprey';
import express from 'express';
import {join} from 'path';
import api from './api';
import security from './security';
import config from '../config.json';

let ramlPath = join(__dirname, 'assets', 'test.raml');
let app = express();

Promise.all([
    // load api spec
    osprey.loadFile(ramlPath, {security}),

    // do other async startup here

]).then(([ospreyMiddleware]) => {

    // simple health check
    app.get('/', (req, res) => {
        res.end('happy');
    });

	// api version 1
	app.use('/v1', ospreyMiddleware);

    app.use('/v1', api({config}));

    // Error handling
    app.use((err, req, res, next) => {
        if (err) {
            if (err.hasOwnProperty('authorizationErrors')) {
                console.warn(err);
                res.status(401).json({
                    version: config.version,
                    result: 'Unauthorized',
                    data: ''
                });
            }
            else {
                console.log(err);
            }
        }
        next();
    });

    let port = process.env.PORT || config.port;
	app.listen(port);

	console.log(`Started on port ${port}`);
}).catch((err) => {
	console.error('Error starting server', err);
});

export default app;
