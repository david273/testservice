"use strict";

import config from "../../config.json";

export default {
    basic: {
        validateUser: (user, password, done) => {
            let expectedUser = process.env.API_USERNAME || config.security.user;
            let expectedPassword = process.env.API_PASSWORD || config.security.password;
            if (expectedUser == user && expectedPassword == password) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
    }
}

