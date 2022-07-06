import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { Decrypter } from '../../../data/protocols/cryptography/decrypter'
import Jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await Jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = await Jwt.verify(token, this.secret)
    return value
  }
}
