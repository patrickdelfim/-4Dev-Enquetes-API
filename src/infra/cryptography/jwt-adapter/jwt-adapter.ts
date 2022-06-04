import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import Jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret) {}

  async encrypt (value: string): Promise<string> {
    await Jwt.sign({ id: value }, this.secret)
    return null
  }
}
