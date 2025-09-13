import {createtrnant, getnotes, getnotebyid, updatenote, deleteNote} from "../controller/Note.controller.js";
import express from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { tenantCheck } from "../middleware/Tenantcheck.middlware.js";


const NoteRouter = express.Router();

NoteRouter.post('/create',AuthMiddleware,tenantCheck,createtrnant )
NoteRouter.get('/get',AuthMiddleware,tenantCheck, getnotes)
NoteRouter.get('/get/:id',AuthMiddleware,tenantCheck, getnotebyid)
NoteRouter.put('/update/:id',AuthMiddleware,tenantCheck, updatenote)
NoteRouter.delete('/delete/:id',AuthMiddleware,tenantCheck, deleteNote)

export  {NoteRouter}