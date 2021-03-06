import { makeSignUpValidation } from './signup-validation-factory'
import { RequiredFieldValidation, CompareFieldsValidation, ValidationComposite, EmailValidation } from '@/validation/validators'
import { EmailValidator } from '@/validation/protocols/emailValidator'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('@/validation/validators/validationComposite/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidationFactory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
