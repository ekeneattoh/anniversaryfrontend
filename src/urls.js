//holds all url needed by the app

let NCHETA_BACKEND_URL = process.env.REACT_APP_NCHETA_DEV_BACKEND_URL

if (process.env.NODE_ENV === 'production') {

    NCHETA_BACKEND_URL = process.env.REACT_APP_NCHETA_PRD_BACKEND_URL
}

export const ncheta_backend = NCHETA_BACKEND_URL;
