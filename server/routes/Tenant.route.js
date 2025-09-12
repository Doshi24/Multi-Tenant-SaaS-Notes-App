import {create_tenant,update_tenant} from '../controller/Tenant.controller.js'
import express from 'express'
import { AuthMiddleware } from '../middleware/Auth.middleware.js'
import { checkadmin } from '../middleware/AdminCheck.middleware.js'

const TenantRoute = express.Router()

TenantRoute.post('/create-tenant',create_tenant)
TenantRoute.post('/:slugvalue/update',AuthMiddleware,checkadmin,update_tenant)

export { TenantRoute }