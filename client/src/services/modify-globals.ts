import { Group } from '../models/group';
import { ILoginError } from './simple-login.service'

type NewGroupInputs = {

}

export async function createNewGroup(currentEthDropCoreSignerInstance, newGroupInputs: NewGroupInputs): Promise<void> {

    try {
        await currentEthDropCoreSignerInstance.createNewGroup(newGroupInputs);
    }
    catch(err) {
        console.log('err with the create new group');
    }

}