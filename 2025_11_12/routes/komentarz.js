import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const komentarze = await prisma.komentarz.findMany({
        include: { wpis: true }
    })
    res.json(komentarze)
})

router.get('/:id', async (req, res) => {
    const komentarz = await prisma.komentarz.findUnique({
        where: { id: Number(req.params.id) },
        include: { wpis: true }
    })
    res.json(komentarz)
})

router.post('/', async (req, res) => {
    const { comment, wpisId } = req.body
    const newKomentarz = await prisma.komentarz.create({
        data: { comment, wpisId }
    })
    res.json(newKomentarz)
})

router.put('/:id', async (req, res) => {
    const { comment } = req.body
    const updated = await prisma.komentarz.update({
        where: { id: Number(req.params.id) },
        data: { comment }
    })
    res.json(updated)
})

router.delete('/:id', async (req, res) => {
    const removed = await prisma.komentarz.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(removed)
})

export default router
