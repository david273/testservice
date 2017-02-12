"use strict";

import config from "../../config.json";

export default {
    basic: {
        validateUser: (user, password, done) => {
            if (config.security.user == user && config.security.password == password) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
    }
}

