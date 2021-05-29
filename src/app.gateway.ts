import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ transport: ['websocket'] })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WS Init');
  }

  handleDisconnect(client: Socket) {
    //console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    //console.log(`Client connected: ${client.id}`);
  }

  /* MISSION EVENTS */
  @SubscribeMessage('create::mission')
  handleMissionCreate(client: Socket, payload: string): void {
    //TODO: create mission
    this.server.emit('created::mission', payload);
  }

  @SubscribeMessage('edit::mission')
  handleMissionEdit(client: Socket, payload: string): void {
    //TODO: edit mission
    this.server.emit('edited::mission', payload);
  }

  @SubscribeMessage('delete::mission')
  handleMissionDelete(client: Socket, payload: string): void {
    //TODO: delete mission
    this.server.emit('deleted::mission', payload);
  }

  /* TEAM EVENTS */
  @SubscribeMessage('create::team')
  handleTeamCreate(client: Socket, payload: string): void {
    //TODO: add team
    this.server.emit('created::team', payload);
  }

  @SubscribeMessage('edit::team')
  handleTeamEdit(client: Socket, payload: string): void {
    //TODO: edit team
    this.server.emit('edited::team', payload);
  }

  @SubscribeMessage('delete::team')
  handleTeamDelete(client: Socket, payload: string): void {
    //TODO: delete team
    this.server.emit('deleted::team', payload);
  }

  /* ROLE EVENTS */
  @SubscribeMessage('create::role')
  handleRoleCreate(client: Socket, payload: string): void {
    //TODO: add role
    this.server.emit('created::role', payload);
  }

  @SubscribeMessage('edit::role')
  handleRoleEdit(client: Socket, payload: string): void {
    //TODO: edit role
    this.server.emit('edited::role', payload);
  }

  @SubscribeMessage('delete::role')
  handleRoleDelete(client: Socket, payload: string): void {
    //TODO: delete role
    this.server.emit('deleted::role', payload);
  }
}
