import express from 'express'
import { prisma } from '../../../lib/prisma'
const wpisRouter = express.Router()

wpisRouter.use(express.json())
wpisRouter.use(express.urlencoded({ extended: true }))

wpisRouter.get('/', async (req, res) => {
  const allWpis = await prisma.wpis.findMany()
  res.status(200).json(allWpis);
})

wpisRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.wpis.findUnique({
    where: { id: parseInt(id) },
    include: {
      Komentarze: true,
      Kategoria: true
    }
  })
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.status(200).json(post)
})

/*wpisRouter.post('/post', async (req, res) => {
  const { txt, KatId, KomId } = req.body;

  try {
    const katExists = await prisma.kategoria.findUnique({where: {id: parseInt(KatId)}})

    const komIdExists = await prisma.komentarz.findUnique({where:{id: parseInt(KomId)}})

    if(!katExists || !komIdExists) {
      return res.status(404).json({"error": "invalid komId or KatId"})
    }

    const addKomentarz = await prisma.wpis.create({
      data: {
        Text: txt,
        KomentarzId: parseInt(KomId),
        KategoriaId: parseInt(KatId)
      }
    })

    res.status(200).json(addKomentarz);
  } catch (error) {
    return res.status(404).json({ error: error});
  }
})

wpisRouter.put('/put/:id', async (req, res) => {
  const { id } = req.params;
  const { txt, KatId, KomId } = req.body;

  try {
    const katExists = await prisma.kategoria.findUnique({where: {id: parseInt(KatId)}})

    const komIdExists = await prisma.komentarz.findUnique({where:{id: parseInt(KomId)}})

    if(!katExists || !komIdExists) {
      return res.status(404).json({"error": "invalid komId or KatId"})
    }

    const addKomentarz = await prisma.wpis.update({
      where: {
        id: parseInt(id),
      },
      data: {
        Text: txt,
        KomentarzId: parseInt(KomId),
        KategoriaId: parseInt(KatId)
      }
    })

    res.status(200).json(addKomentarz);
  } catch (error) {
    return res.status(404).json({ error: error});
  }
})*/

wpisRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  const exists = await prisma.wpis.findUnique({where:{id: parseInt(id)}})
  if (!exists) {
    return res.status(404).json({"error": "wrong id has been given"})
  }
  const delWpis = await prisma.wpis.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delWpis);
})

export { wpisRouter }