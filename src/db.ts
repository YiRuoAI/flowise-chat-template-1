// db.ts
import type { Table } from 'dexie'
import Dexie from 'dexie'

export interface User {
  id?: number
  chatflowId: string
  username: string
  password: string
}

export class MySubClassedDexie extends Dexie {
  users!: Table<User>

  constructor() {
    super('yiruoai-chat-flowise-tpl')
    this.version(1).stores({
      users: '++id, chatflowId, username, password',
    })
  }
}

export const db = new MySubClassedDexie()
