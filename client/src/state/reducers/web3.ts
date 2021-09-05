import { GlobalDataFromContract, IInitializeWeb3Error, IInitializeWeb3Success } from '../../services/global-data';
import { INITIALIZE_WEB3_FAILED, INITIALIZE_WEB3_REQUESTED, INITIALIZE_WEB3_SUCCESS } from '../types/initWeb3';
import { HEAR_EVENT_APP_PAUSED, NEW_GROUP_CREATED } from '../types/global-data';

export interface IWeb3State {
    fetching: boolean,
    error: object | undefined,
    accounts: string[],
    etherBalance: string,
    networkId: number,
    ethDropCoreReadInstance: any,
    ethDropCoreSignerInstance: any,
    groupNames: string[],
    groupIds: number[],
    globalData: GlobalDataFromContract
}

export const initialState = {
    fetching: false,
    error: undefined,
    userId: undefined,
    accounts: [],
    etherBalance: '---',
    networkId: -1,
    ethDropCoreReadInstance: undefined,
    ethDropCoreSignerInstance: undefined,
    groupNames: [],
    groupIds: [],
    globalData: {
        amICEO: false,
        amICOO: false,
        amICFO: false,
        isPaused: false
    }
}

interface IAction {
    type?: string;
    // payload?: IInitializeWeb3Success & IInitializeWeb3Error 
    // & { isPaused: boolean } & { newGroupName: string]
        // groupIds: [...state.groupNames, payload.newGroupId };
    payload?: any
}

const reducer = (state: IWeb3State = initialState, action: IAction = {}): IWeb3State => {

    const { type, payload } = action;

    switch (type) {
        case INITIALIZE_WEB3_REQUESTED:

            return {
                ...state,
                fetching: true,
                error: undefined
            };

        case INITIALIZE_WEB3_SUCCESS:

            console.log('got ethdrop stuff: ', payload)
            return {
                ...state,
                fetching: false,
                error: undefined,
                accounts: payload.accounts,
                etherBalance: payload.etherBalance,
                networkId: payload.networkId,
                ethDropCoreReadInstance: payload.ethDropCoreReadInstance,
                ethDropCoreSignerInstance: payload.ethDropCoreSignerInstance,
                groupNames: payload.groupNames,
                groupIds: payload.groupIds,
                globalData: payload.globalData
            };

        case INITIALIZE_WEB3_FAILED:
            return {
                ...state,
                fetching: false,
                error: payload.error,
            };

        case HEAR_EVENT_APP_PAUSED:
            return {
                ...state,
                globalData: {
                    ...state.globalData,
                    isPaused: payload.isPaused
                }
            }

        case NEW_GROUP_CREATED:
            return {
                ...state,
                groupNames: [...state.groupNames, payload.newGroupName],
                groupIds: [...state.groupNames, payload.newGroupId]
            }

        default:
            return state;
    }
};

export default reducer;
