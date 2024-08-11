import { ResourceGroupCreate } from "./resource-group-create";

export class ResourceGroupCreateDTO {
    code: string;
    success: boolean;
    message: string;
    data: ResourceGroupCreate;
}