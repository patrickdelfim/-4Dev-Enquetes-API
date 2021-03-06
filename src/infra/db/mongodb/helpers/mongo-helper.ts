import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.connection = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.connection.close()
  },

  async getCollection (name: string): Promise<Collection> {
    return this.connection.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...rest } = data
    return { id: _id.toHexString(), ...rest }
  },

  mapCollection (data: any[]): any[] {
    return data.map(item => MongoHelper.map(item))
  }

}
