import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(): Task[]{
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void{
        return this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(@Param('id') id:string, @Body('status') status:TaskStatus):Task{
        return this.taskService.updateTaskStatusById(id,status);
    }

    // @Post()
    // createTask(@Body() body){
    //     console.log('body:', body);
    // }

    // @Post()
    // createTask(
    //     @Body('title') title:string,
    //     @Body('description') description:string
    // ){
    //     console.log('title:', title);
    //     console.log('description:', description);
    // }

    // @Post()
    // createTask(
    //     @Body('title') title:string,
    //     @Body('description') description:string
    // ):Task{
    //     return this.taskService.createTask(title,description);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto):Task{
        return this.taskService.createTask(createTaskDto);
    }
}
