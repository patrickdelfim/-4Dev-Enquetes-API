import Jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  },
  async verify (): Promise<string> {
    return await new Promise(resolve => resolve('any_value'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign', () => {
    test('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(Jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toBeCalledWith({ id: 'any_id' }, 'secret')
    })

    test('should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('should throw if sign throws', async () => {
      const sut = makeSut()
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      jest.spyOn(Jwt, 'sign').mockImplementationOnce(async () => { throw new Error() })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify', () => {
    test('should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(Jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toBeCalledWith('any_token', 'secret')
    })
  })
})
