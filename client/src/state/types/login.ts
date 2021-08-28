export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export interface LoginSuccessPayload {
    userId: {
        data: {
            id: number
        }
    }
}

export interface LoginFailureError {
    error: Error
}