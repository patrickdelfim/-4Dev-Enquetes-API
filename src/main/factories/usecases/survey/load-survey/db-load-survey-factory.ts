import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { DbLoadSurveys } from '@/data/usecases/load-surveys/db-load-surveys'

export const makeLoadAddSurveys = (): LoadSurveys => {
  const accountMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(accountMongoRepository)
}
