import { groupsDataRequested, groupsDataFailed, groupsDataSuccess } from "./groups-data"
import { GROUPS_DATA_REQUESTED, GROUPS_DATA_FAILED, GROUPS_DATA_SUCCESS } from "../../types/groups-data"
import { IGroupData } from "../../../models/group-data"

describe('groupsData actions', () => {

    it('should create a GROUPS_DATA_REQUESTED action', () => {

        const expectedResponse = { type: GROUPS_DATA_REQUESTED }

        expect(groupsDataRequested()).toEqual(expectedResponse)

    })

    it('should create a groupsDataSuccess action', () => {

        const fakeGroupsDatas: IGroupData[] = [
            {
                id: 1,
                groupName: 'groupName',
                welcomeMessage: 'welcomeMessage',
                groupImage: 'groupImage'
            }
        ]

        const fakeGroupsDataPayload = { data: fakeGroupsDatas }

        const expectedResponse = {
            type: GROUPS_DATA_SUCCESS,
            payload: fakeGroupsDatas
        }

        expect(groupsDataSuccess(fakeGroupsDataPayload)).toEqual(expectedResponse)

    })

    it('should create a groupsDataFailed action', () => {

        const someError = new Error('my err')

        const expectedResponse = {
            type: GROUPS_DATA_FAILED,
            payload: someError
        }

        expect(groupsDataFailed(someError)).toEqual(expectedResponse);

    })

})