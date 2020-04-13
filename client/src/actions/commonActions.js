import axios from "axios";
import {
    GET_ERRORS,
    ADD_RECORD,
    UPDATE_RECORD
} from "./types";

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
        axios({
            method: endpoint.method,
            url: endpoint.url,
            data: record
        })
        .then(res => {
            debugger;
            dispatch({
                type: UPDATE_RECORD,
                payload: res,
            })
        }
        ).catch(err => {
            debugger;

            dispatch({
                type: GET_ERRORS,
                payload: err && err.response && err.response.data
            })
        }
    );
};
