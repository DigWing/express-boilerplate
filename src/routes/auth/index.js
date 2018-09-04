import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { login, register } from './controllers'
import { master } from '../../services/passport'
import { schema } from '../../models/user'

const router = new Router()

const {
  email,
  password,
  name
} = schema.tree

/**
 * @swagger
 * definitions:
 *   UserDTO:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         example: test@test.com
 *       password:
 *         type: string
 *         example: qwerty
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - Authorization
 *     description: Authorize user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: UserDTO
 *         required: true
 *         in: body
 *         schema:
 *           $ref: '#/definitions/UserDTO'
 *     responses:
 *       200:
 *         description: Successfully created
 */

router.post('/login',
  body({ email, password }),
  login)

/**
 * @swagger
 * definitions:
 *   CreateUserDTO:
 *     allOf:
 *       - $ref: '#/definitions/UserDTO'
 *       - type: object
 *         properties:
 *           name:
 *             type: string
 *             example: Test Name
 *
 * /auth/register:
 *   post:
 *     tags:
 *       - Authorization
 *     description: Registration
 *     security:
 *       - MasterKeyAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: CreateUser
 *         required: true
 *         in: body
 *         description: Description for create user Data-Type Object
 *         schema:
 *           $ref: '#/definitions/CreateUserDTO'
 *     responses:
 *       200:
 *         description: Successfully created
 *       403:
 *         description: User is already registered
 *       400:
 *         description: Wrong input format
 */

router.post('/register',
  master(),
  body({ email, password, name }),
  register)

export default router
