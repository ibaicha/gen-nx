import { Inject } from '@nestjs/common'
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!'
  }

  @WebSocketServer()
  @Inject('SERVER')
  private server!: Server
  // Événement de notification pour l'ajout
  notifyRecordAdded(data: any) {
    this.server.emit('recordAdded', data)
  }

  // Événement de notification pour la mise à jour
  notifyRecordUpdated(data: any) {
    this.server.emit('recordUpdated', data)
  }

  // Événement de notification pour la suppression
  notifyRecordDeleted(id: string) {
    this.server.emit('recordDeleted', id)
  }
}
