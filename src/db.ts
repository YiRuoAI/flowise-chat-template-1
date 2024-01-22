// db.ts
import type { Table } from 'dexie'
import Dexie from 'dexie'

export interface User {
  id?: number
  chatflowId: string
  username: string
  password: string
}

export interface Conversation {
  id: string
  title: string
  chatflowid: string
  groupId: string
  thirdUserId: string
  createdAt: string
  updatedAt: string
}

export interface ChatInfo {
  chatflowid: string
  groupId: string
}

export type MessageType = 'apiMessage' | 'userMessage'

export enum ChatMessageStatus {
  Pending = 0,
  Success = 1,
  Failed = 2,
}

export interface ChatMessage {
  id: string
  userId: string
  role: MessageType
  chatflowid: string
  content: string
  sourceDocuments?: Array<{ pageContent: string, metadata: { page: number, paragraph: number } }>
  conversationId: string
  status: ChatMessageStatus
  createdAt: string
}

export class MySubClassedDexie extends Dexie {
  users!: Table<User>
  conversations!: Table<Conversation>
  chatMessages!: Table<ChatMessage>
  chatInfos!: Table<ChatInfo>

  constructor() {
    super('yiruoai-chat-flowise-tpl')
    this.version(1.2).stores({
      users: '++id, chatflowId, username, password',
      conversations: 'id, chatflowid, title, groupId, thirdUserId, createdAt, updatedAt',
      chatMessages: 'id, userId, role, chatflowid, content, sourceDocuments, conversationId, status, createdAt',
      chatInfos: '++id, groupId, chatflowid',
    })
  }
}

export const db = new MySubClassedDexie()
