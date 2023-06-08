import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskById(id:string):Task{
        const found = this.tasks.find(task=>task.id===id);

        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    // deleteTaskById(id:string):number{
    //     let idx:number=-1;
    //     for(let i:number=0; i<=this.tasks.length; i++)
    //     {
    //         try{
    //             if(id==this.tasks[i].id)
    //             {
    //                 idx = i;
    //                 break;
    //             }
    //         }catch(e){
    //             idx=-1;
    //         }
    //     }

    //     if(idx>=0){
    //         this.tasks.splice(idx,1);
    //         return 1;
    //     }else{
    //         return 0;
    //     }
    // }

    deleteTaskById(id:string):void{
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task=>task.id!==found.id);
    }

    updateTaskStatusById(id:string,status:TaskStatus):Task{
        const task:Task = this.getTaskById(id);
        console.log('found task:', task);
        task.status = status;
        return task;
    }

    // createTask(title:string, description:string):Task{
    //     const task: Task={
    //         id: v1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    createTask(createTaskDto: CreateTaskDto):Task{
        const { title, description } = createTaskDto;

        const task: Task={
            id: v1(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }
}
