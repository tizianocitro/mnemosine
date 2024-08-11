import { ResourceGroupDelete } from "./resource-group-delete";

export class ResourceGroupDeleteDTO {
    code: string;
    success: boolean;
    message: string;
    data: ResourceGroupDelete;
}