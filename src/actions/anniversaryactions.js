import axios from 'axios'
import { ncheta_backend } from '../urls'

export const SAVE_ANNIVERSARY = "SAVEANNIVERSARY"
export const SAVE_ANNIVERSARY_ERR = "SAVEANNIVERSARYERROR"
export const CLEARANNIVERSARYMSG = "CLEARCARMSG"
export const GET_ANNIVERSARY_DATA = "GETANNIVERSARYDATA"
export const GET_ANNIVERSARY_DATA_ERR = "GET_ANNIVERSARY_DATA_ERR"


export function clearAnniversaryMsg() {

    return {
        type: CLEARANNIVERSARYMSG
    }
}

export function saveAnniversary(data) {

    // console.log(ncheta_backend)

    return function (dispatch) {
        return axios({
            method: 'post',
            url: ncheta_backend + `/anniversary`,
            data: data

        }).then((response) => {

            dispatch({
                type: SAVE_ANNIVERSARY,
                payload: response
            })
        }).catch((error) => {

            dispatch({
                type: SAVE_ANNIVERSARY_ERR,
                payload: error
            })
        })
    }
}

export function getAnniversaryData(data) {

    // console.log(ncheta_backend)

    return function (dispatch) {
        return axios({
            method: 'get',
            url: ncheta_backend + `/anniversarymessage`,
            data: data

        }).then((response) => {

            dispatch({
                type: GET_ANNIVERSARY_DATA,
                payload: response
            })
        }).catch((error) => {

            dispatch({
                type: GET_ANNIVERSARY_DATA_ERR,
                payload: error
            })
        })
    }
}
