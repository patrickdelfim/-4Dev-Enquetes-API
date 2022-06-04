import { adaptRoute } from '../../adapters/express/express-route-adapter'
import { RequestHandler, Router } from 'express'
import { makeSignUpController } from '../../factories/signup/signup'
import { makeLoginController } from '../../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()) as RequestHandler)
  router.post('/login', adaptRoute(makeLoginController()) as RequestHandler)
}
