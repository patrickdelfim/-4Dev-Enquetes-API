import { Express } from 'express'
import bodyParserErrorHandler from 'express-body-parser-error-handler'
import { bodyParser, contentType, cors } from '../middlewares'
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(bodyParserErrorHandler())
  app.use(cors)
  app.use(contentType)
}
