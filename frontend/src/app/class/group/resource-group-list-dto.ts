import { ResourceGroupList } from "./resource-group-list";

export class ResourceGroupListDTO {
    code: string;
    success: boolean;
    message: string;
    data: ResourceGroupList;
}
