import axios from 'axios'
import { ncheta_backend } from '../urls'

export const SAVE_ANNIVERSARY = "SAVEANNIVERSARY"
export const SAVE_ANNIVERSARY_ERR = "SAVEANNIVERSARYERROR"
export const CLEARANNIVERSARYMSG = 'CLEARCARMSG'


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
