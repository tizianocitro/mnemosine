import { ResourceGroupInfo } from "./resource-group-info";

export class ResourceGroupInfoDTO {
    code: string;
    success: boolean;
    message: string;
    data: ResourceGroupInfo;
}