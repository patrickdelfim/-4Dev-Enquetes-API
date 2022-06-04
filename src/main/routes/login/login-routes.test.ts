import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo-helper'
import app from '../../config/app'

describe('Login Routes', () => {
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Post /signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Patrick',
          email: 'patrickdelfim@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('Post /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Patrick',
        email: 'patrickdelfim@gmail.com',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'patrickdelfim@gmail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
