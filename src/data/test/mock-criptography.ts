import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new DecrypterStub()
}
export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}
export const mockHashComparer = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare (value: string, hash: string): Promise<Boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }
  return new HashCompareStub()
}
