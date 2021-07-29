import { api_config_type } from "@api_config_type";

const NOW_TESTING = true;

export const MAIN_HOST = NOW_TESTING ? "http://192.168.0.9:8080" : "http://localhost:5000";
export const MAIN_HOST_BASE_LOCATION = NOW_TESTING ? "daedeok" : "daedeok";

type api_params = api_config_type.api_params;

export const domain_reducer = (domain: api_params["domain"]) => {
    switch (domain) {
        case "MAIN": {
            return `${MAIN_HOST}/${MAIN_HOST_BASE_LOCATION}/`;
        }
        case "MAIN_NOBASE": {
            return `${MAIN_HOST}/`;
        }
        default:
            throw new Error("DOMAIN READUCER ERROR IN :: API.TSX");
    }
};
