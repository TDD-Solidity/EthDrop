
export interface IGroup {
    name: string;
    id: string;
}

export class Group implements IGroup {
    public name: string = '?'
    public id: string = '?'
}
