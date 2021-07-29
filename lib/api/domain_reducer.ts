import { api_config_type } from "@api_config_type";
export const MAIN_HOST = "http://localhost:5000";
export const MAIN_HOST_BASE_LOCATION = "/daedeok";

type api_params = api_config_type.api_params;

export const domain_reducer = (domain: api_params["domain"]) => {
    switch (domain) {
        case "MAIN": {
            return `${MAIN_HOST}/${MAIN_HOST_BASE_LOCATION}/`;
        }
        default:
            throw new Error("DOMAIN READUCER ERROR IN :: API.TSX");
    }
};
