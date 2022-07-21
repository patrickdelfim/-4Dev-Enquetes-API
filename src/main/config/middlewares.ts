import { bodyParser, contentType, cors } from '@/main/middlewares'
import bodyParserErrorHandler from 'express-body-parser-error-handler'
import { Express } from 'express'
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(bodyParserErrorHandler())
  app.use(cors)
  app.use(contentType)
}
