import { InjectRepository } from '@nestjs/typeorm';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Mission } from './mission/mission.entity';
import { Role } from './role/role.entity';
import { Team } from './team/team.entity';

@WebSocketGateway({ transport: ['websocket'] })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @InjectRepository(Mission) private missionRepository: Repository<Mission>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

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
    const { user, mission } = JSON.parse(payload);
    //TODO: Auth
    this.missionRepository.create(mission);
    this.server.emit('created::mission', payload);
  }

  @SubscribeMessage('edit::mission')
  handleMissionEdit(client: Socket, payload: string): void {
    const { user, mission } = JSON.parse(payload);
    //TODO: Auth
    this.missionRepository.update(mission.id, mission);
    this.server.emit('edited::mission', payload);
  }

  @SubscribeMessage('delete::mission')
  handleMissionDelete(client: Socket, payload: string): void {
    const { user, mission } = JSON.parse(payload);
    //TODO: Auth
    this.missionRepository.delete(mission.id);
    this.server.emit('deleted::mission', payload);
  }

  /* TEAM EVENTS */
  @SubscribeMessage('create::team')
  handleTeamCreate(client: Socket, payload: string): void {
    const { user, team } = JSON.parse(payload);
    //TODO: Auth
    this.teamRepository.create(team);
    this.server.emit('created::team', payload);
  }

  @SubscribeMessage('edit::team')
  handleTeamEdit(client: Socket, payload: string): void {
    const { user, team } = JSON.parse(payload);
    //TODO: Auth
    this.teamRepository.update(team.id, team);
    this.server.emit('edited::team', payload);
  }

  @SubscribeMessage('delete::team')
  handleTeamDelete(client: Socket, payload: string): void {
    const { user, team } = JSON.parse(payload);
    //TODO: Auth
    this.teamRepository.delete(team.id);
    this.server.emit('deleted::team', payload);
  }

  /* ROLE EVENTS */
  @SubscribeMessage('create::role')
  handleRoleCreate(client: Socket, payload: string): void {
    const { user, role } = JSON.parse(payload);
    //TODO: Auth
    this.roleRepository.create(role);
    this.server.emit('created::role', payload);
  }

  @SubscribeMessage('edit::role')
  handleRoleEdit(client: Socket, payload: string): void {
    const { user, role } = JSON.parse(payload);
    //TODO: Auth
    this.roleRepository.update(role.id, role);
    this.server.emit('edited::role', payload);
  }

  @SubscribeMessage('delete::role')
  handleRoleDelete(client: Socket, payload: string): void {
    const { user, role } = JSON.parse(payload);
    //TODO: Auth
    this.roleRepository.delete(role.id);
    this.server.emit('deleted::role', payload);
  }
}
