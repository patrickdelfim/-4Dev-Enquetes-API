import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeLoadAddSurveys } from '../../../usecases/survey/load-survey/db-load-survey-factory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeLoadAddSurveys())
  return makeLogControllerDecorator(controller)
}