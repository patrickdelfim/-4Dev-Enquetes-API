
import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'
export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = Object.assign({}, accountData, { password: hashedPassword })
    const savedAccount = await this.addAccountRepository.add(account)

    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    return savedAccount
  }
}
