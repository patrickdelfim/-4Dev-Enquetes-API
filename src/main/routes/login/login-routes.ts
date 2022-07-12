import { adaptRoute } from '../../adapters/express-route-adapter'
import { RequestHandler, Router } from 'express'
import { makeSignUpController } from '../../factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../../factories/controllers/login/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()) as RequestHandler)
  router.post('/login', adaptRoute(makeLoginController()) as RequestHandler)
}
