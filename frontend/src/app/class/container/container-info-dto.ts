import { ContainerInfo } from "./container-info";

export class ContainerInfoDTO {
    code: string;
    success: boolean;
    message: string;
    data: ContainerInfo;
}