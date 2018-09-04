import { Router } from 'express'
import { putUser, getUser } from './controllers'
import { token } from '../../services/passport'
import { schema as userSchema } from '../../models/user'
import { middleware as body } from 'bodymen'

const router = new Router()

const {
  name,
  picture
} = userSchema.tree

/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *       - Users
 *     description: Get info about current user
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 */

router.get('/',
  token({ required: true }),
  getUser)

/**
 * @swagger
 * definitions:
 *   ChangeUserDTO:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Test Name (changed)
 *       picture:
 *         type: string
 *         example: https://topavatar.com/123.png
 *       oldPassword:
 *         type: string
 *         example: qwerty
 *       newPassword:
 *         type: string
 *         example: qwerty123
 *
 * /users/:
 *   put:
 *     tags:
 *       - Users
 *     description: Change user
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ChangeUserDTO
 *         required: true
 *         in: body
 *         schema:
 *           $ref: '#/definitions/ChangeUserDTO'
 *     responses:
 *       200:
 *         description: Success
 */

router.put('/',
  token({ required: true }),
  body({
    name,
    picture,
    oldPassword: {
      type: String
    },
    newPassword: {
      type: String,
      minlength: 6
    }
  }),
  putUser)

export default router
