import { ContainerCreate } from "./container-create";

export class ContainerCreateDTO {
    code: string;
    success: boolean;
    message: string;
    data: ContainerCreate;
}