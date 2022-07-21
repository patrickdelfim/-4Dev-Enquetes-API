import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth, auth } from '@/main/middlewares'
import { RequestHandler, Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()) as RequestHandler)
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()) as RequestHandler)
}
