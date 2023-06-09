import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusVlidationPipe implements PipeTransform{
    readonly allowedStatuses=[
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value:any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
    }
 
    private isStatusValid(status:any):any{
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }

}