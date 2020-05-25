import axios from "axios";
import {
    GET_ERRORS,
    ADD_RECORD,
    UPDATE_RECORD
} from "./types";
import { get } from "lodash";

export const addRecord = (record, history) => dispatch => {
    axios
        .post("/api/user-add", record)
        .then(res =>
            dispatch({
                type: ADD_RECORD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateRecord = (endpoint = {}, record ) => dispatch => {
    return axios({
            method: endpoint.method,
            url: endpoint.url,
            data: record
        })
        .then(res => {
           // debugger;
            dispatch({
                type: UPDATE_RECORD,
                payload: res.data,
            })
        }
        ).catch(err => {
           // debugger;

            dispatch({
                type: GET_ERRORS,
                payload: get(err,'response.data.errors',{'message': 'Something went wrong'})
            })
        }
    );
};
