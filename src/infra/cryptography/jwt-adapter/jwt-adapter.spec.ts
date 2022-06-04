import Jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
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
