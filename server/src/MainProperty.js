//= ================= [START Import Modules] =================//
import { APP_CONFIG } from './AppConfig';
import path from 'path';
import fs from 'fs';

import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import http from 'http';

import moment from 'moment';
import lodash from 'lodash';

import LogProvider from './Providers/Log/LogProvider';
import DaterProvider from './Providers/Dater/DaterProvider';
import MasterGenProvider from './Providers/MasterGen/MasterGenProvider';
import RandomsProvider from './Providers/Randoms/RandomsProvider';
import UniqueIdProvider from './Providers/UniqueId/UniqueIdProvider';
import ValidationProvider from './Providers/Validation/ValidationProvider';
//= ================= [END Import Modules] =================//

//= ================= [ START Require Property ] ==========//
const ROOT_PATH = __dirname;
const PATH = path;
const FS = fs;

const EXPRESS = express;
const APP = EXPRESS();
//= ================= [ END Require Property ] ============//

//= ================= [START Server Setting ] =================//
APP.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
APP.use(bodyParser.json({ limit: '50mb' }));

const ROOT_URL = APP_CONFIG.APP_NAME + APP_CONFIG.APP_VERSION;

const ENDPOINT = (function () {
    if (APP_CONFIG.ENABLE_SSL === true) {
        return 'https://' + APP_CONFIG.DOMAIN + ':' + APP_CONFIG.PORT_HTTPS;
    } else {
        return 'http://' + APP_CONFIG.DOMAIN + ':' + APP_CONFIG.PORT_HTTP;
    }
})();

const API_PATH = (function () {
    return ENDPOINT + ROOT_URL;
})();

const SERVER = (function () {
    if (APP_CONFIG.ENABLE_SSL === true) {
        return https.createServer(
            {
                key: FS.readFileSync(PATH.join(ROOT_PATH, APP_CONFIG.APP_PRIVKEY), 'utf8'),
                cert: FS.readFileSync(PATH.join(ROOT_PATH, APP_CONFIG.APP_CERT), 'utf8'),
                ca: FS.readFileSync(PATH.join(ROOT_PATH, APP_CONFIG.APP_CHAIN), 'utf8'),
            },
            APP,
        );
    } else {
        return http.createServer(APP);
    }
})();

//= ================= [END Server Setting ] ==================//

//= ================= [ START Node Modules Option ] ===========//
const MOMENT = moment;
const LODASH = lodash;
//= ================= [ END Node Modules Option ] =============//

//= ================= [ START Provider ] =====================//
const LOG = new LogProvider();
const DATER = new DaterProvider();
const MASTER_GEN = new MasterGenProvider();
const RANDOMS = new RandomsProvider();
const UNIQUE_ID = new UniqueIdProvider();
const VALIDATION = new ValidationProvider();
//= ================= [ END Provider ] =======================//

const IMAGES_PATH = PATH.join(ROOT_PATH, '../images');

export {
    ROOT_PATH,
    PATH,
    FS,
    EXPRESS,
    APP,
    APP_CONFIG,
    ROOT_URL,
    ENDPOINT,
    API_PATH,
    SERVER,
    MOMENT,
    LODASH,
    LOG,
    DATER,
    MASTER_GEN,
    RANDOMS,
    UNIQUE_ID,
    VALIDATION,
    IMAGES_PATH,
};
