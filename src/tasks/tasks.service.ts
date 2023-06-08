import { Injectable } from '@nestjs/common';
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
        return this.tasks.find(task=>task.id===id);
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
        this.tasks = this.tasks.filter(task=>task.id!==id);
    }

    updateTaskStatusById(id:string,status:TaskStatus):Task{
        const task:Task = this.tasks.find(task=>task.id===id);
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
