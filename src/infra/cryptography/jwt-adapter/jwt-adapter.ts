import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import { Decrypter } from '../../../data/protocols/cryptography/decrypter'
import Jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await Jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    await Jwt.verify(value, this.secret)
    return null
  }
}
