import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Restrict in production!
  },
})
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  @SubscribeMessage('createTask')
  async handleCreateTask(@MessageBody() data: CreateTaskDto): Promise<void> {
    const task = await this.taskService.create(data);
    this.server.emit('taskCreated', task);
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(
    @MessageBody() payload: { id: string; data: UpdateTaskDto },
  ): Promise<void> {
    const task = await this.taskService.update(payload.id, payload.data);
    this.server.emit('taskUpdated', task);
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(@MessageBody() id: string): Promise<void> {
    await this.taskService.remove(id);
    this.server.emit('taskDeleted', id);
  }

  @SubscribeMessage('getTasksByList')
  async handleGetTasksByList(
    @MessageBody() taskListId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const tasks = await this.taskService.findByTaskList(taskListId);
    client.emit('tasksFetched', tasks);
  }
}
