import { Group } from '../models/group';
import { ILoginError } from './simple-login.service'

export interface IGroupsSuccess {
    data: {
        groups: Group[]
    }
}

export interface IGroupsError {
    error: any;
}

/*
 * This function is purely meant to serve as an imported async function.
 * See the "simple-login.service.ts" tests for an example of how it can be mocked.
 */
export const getGroups = (): Promise<IGroupsSuccess | ILoginError> => {

    return new Promise((resolve, reject) => {

        resolve({
            data: {
                groups: [],
            },
        });

    });

}