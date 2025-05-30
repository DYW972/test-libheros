import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksListService } from './tasks-list.service';
import { CreateTasksListDto, UpdateTaskListDto } from './taks-list.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Restrict in production!
  },
})
export class TasksListGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly tasksList: TasksListService) {}

  @SubscribeMessage('createTask')
  async handleCreateTaskList(
    @MessageBody() data: CreateTasksListDto,
  ): Promise<void> {
    const task = await this.tasksList.create(data);
    this.server.emit('taskListCreated', task);
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTaskList(
    @MessageBody() payload: { id: string; data: UpdateTaskListDto },
  ): Promise<void> {
    const task = await this.tasksList.update(payload.id, payload.data);
    this.server.emit('taskListUpdated', task);
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTaskList(@MessageBody() id: string): Promise<void> {
    await this.tasksList.delete(id);
    this.server.emit('taskListDeleted', id);
  }

  @SubscribeMessage('getTasksListByUser')
  async handleGetTasksListByUser(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const tasksList = await this.tasksList.findByUser(userId);
    client.emit('tasksListFetched', tasksList);
  }
}
