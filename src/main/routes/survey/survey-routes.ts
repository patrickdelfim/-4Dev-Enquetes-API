import { adaptRoute } from '../../adapters/express-route-adapter'
import { RequestHandler, Router } from 'express'
import { makeAddSurveyController } from '../../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth, auth } from '../../middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()) as RequestHandler)
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()) as RequestHandler)
}
