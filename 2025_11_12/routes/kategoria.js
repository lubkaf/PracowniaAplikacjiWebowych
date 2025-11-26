import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany({
        include: { wpisy: true }
    })
    res.json(kategorie)
})

router.get('/:id', async (req, res) => {
    const kategoria = await prisma.kategoria.findUnique({
        where: { id: Number(req.params.id) },
        include: { wpisy: true }
    })
    res.json(kategoria)
})

router.post('/', async (req, res) => {
    const { nazwa } = req.body
    const newKategoria = await prisma.kategoria.create({
        data: { nazwa }
    })
    res.json(newKategoria)
})

router.put('/:id', async (req, res) => {
    const { nazwa } = req.body
    const updated = await prisma.kategoria.update({
        where: { id: Number(req.params.id) },
        data: { nazwa }
    })
    res.json(updated)
})

router.delete('/:id', async (req, res) => {
    const removed = await prisma.kategoria.delete({
        where: { id: Number(req.params.id) }
    })
    res.json(removed)
})

export default router
