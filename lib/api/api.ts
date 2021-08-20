import { api_config_type } from "@api_config_type";
import { meta_types } from "@global_types";
import axios from "axios";
import { domain_reducer } from "./domain_reducer";
import { endpoint_reducer } from "./endpoint_reducer";

export const h22_axios = axios.create({});
h22_axios.interceptors.response.use(
    (response: any): any => {
        var status_code = response.status;
        // var status_code = 701;

        var res: api_config_type.api_response;
        switch (status_code) {
            case 200: {
                res = { result: "SUCCESS", data: response.data };
                break;
            }
            case 201: {
                var location = response.headers.location;

                res = { result: "SUCCESS", data: location || "SUCCESS" };
                break;
            }
            case 204: {
                res = { result: "SUCCESS", data: "SUCCESS" };
                break;
            }
            default: {
                res = { result: "SUCCESS", data: "SUCCESS" };
                break;
            }
        }
        return res;
    },
    async (error: any) => {
        const customErrorCode = error.response?.data?.status;
        const error_msg: string = error.response?.data?.message;
        var res: api_config_type.api_response;

        switch (customErrorCode) {
            // BAD REQUESTS
            case 700: {
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            case 704: {
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            case 706: {
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            case 707: {
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            // FORBIDDEN
            case 701: {
                res = { result: "ERROR", msg: error_msg, config: error.config, statusCode: customErrorCode };
                break;
            }
            case 702: {
                // TOKEN 변조 감지
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            case 703: {
                // 권한 없음
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            // INTERNAL SERVER ERROR
            case 705: {
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            case 708: {
                res = { result: "ERROR", msg: error_msg, statusCode: customErrorCode };
                break;
            }
            default: {
                res = { result: "ERROR", msg: "서버와의 연결상태가 좋지 않습니다" };
                break;
            }
        }
        return res;
    }
);

type api_params = api_config_type.api_params;

const API_CALL = async (
    method: api_params["method"],
    domain: api_params["domain"],
    ep: api_params["ep"],
    url_query?: api_params["url_query"],
    data?: api_params["data"],
    extraHeader?: api_params["extraHeader"]
): Promise<api_config_type.api_response> => {
    var request_URL = `${domain_reducer(domain)}${endpoint_reducer(ep, url_query)}`;
    var axios_header = {
        ...extraHeader,
    };
    var axios_option = {
        method: method,
        url: request_URL,
        params: undefined,
        data: undefined,
        headers: axios_header,
    };
    if (data !== undefined) {
        method === "GET" || method === "DELETE" ? (axios_option.params = data) : (axios_option.data = data);
    }
    // @ts-ignore
    return h22_axios(axios_option);
};

const AxiosClient = {
    client: h22_axios,
    API_CALL: API_CALL,
    serverSideApi: API_CALL,
};

export default AxiosClient;
