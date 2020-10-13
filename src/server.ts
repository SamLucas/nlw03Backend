import express from 'express'
import 'express-async-errors'
import Route from './route'
import cors from 'cors'

import ErrorHandler from './errors/handler'

import './database/connection'
import { join } from 'path'

const app = express()

app.use(cors())
app.use(express.json())
app.use(Route)

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
app.use(ErrorHandler)

app.listen(3333) 