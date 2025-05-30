import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UserGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly userService: UserService) {}

  @SubscribeMessage('createUser')
  async handleCreateUser(
    @MessageBody() createUserDto: CreateUserDto,
  ): Promise<void> {
    const user = await this.userService.create(createUserDto);
    this.server.emit('userCreated', user);
  }

  @SubscribeMessage('updateUser')
  async handleUpdateUser(
    @MessageBody() payload: { id: string; data: UpdateUserDto },
  ): Promise<void> {
    const updatedUser = await this.userService.update(payload.id, payload.data);
    this.server.emit('userUpdated', updatedUser);
  }

  @SubscribeMessage('deleteUser')
  async handleDeleteUser(@MessageBody() id: string): Promise<void> {
    await this.userService.delete(id);
    this.server.emit('userDeleted', id);
  }

  @SubscribeMessage('getUsers')
  async handleGetUsers(): Promise<void> {
    const users = await this.userService.findAll();
    this.server.emit('usersFetched', users);
  }

  @SubscribeMessage('getUser')
  async handleGetUser(@MessageBody() id: string): Promise<void> {
    const user = await this.userService.findOne(id);
    this.server.emit('userFetched', user);
  }
}
