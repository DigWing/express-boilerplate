import { Router } from 'express'
import auth from './auth'
import users from './users'
import { sendError, sendSuccess } from '../middlewares'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    info: {
      title: 'Express boilerplate', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Express boilerplate',
      baseUri: '/api/v1'
    },
    basePath: '/api/v1',
    security: [
      { BearerAuth: [] },
      { MasterKeyAuth: [] }
    ],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      },
      MasterKeyAuth: {
        type: 'apiKey',
        in: 'query',
        name: 'access_token'
      }
    }
  },
  apis: ['src/routes/*/index.js'] // Path to the API docs
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options)

console.log(swaggerSpec)

const router = new Router()

router.use(sendError)
router.use(sendSuccess)
router.use('/auth', auth)
router.use('/users', users)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default router
