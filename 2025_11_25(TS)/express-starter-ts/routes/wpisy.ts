import { Router } from 'express';
import { prisma } from '../lib/prisma.js'

const router  = Router();

router.get('/', async (req, res) => {
  const wpisy = await prisma.wpis.findMany({
    include:{ kategoria: true, komentarze:true }
  });
  res.json(wpisy);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const wpis = await prisma.wpis.findUnique({
    where: { id: Number(id) },
    include:{ kategoria: true, komentarze:true }
  });
  res.json(wpis);
});

router.post('/', async (req, res) => {
  const { tytul, kategoriaId } = req.body;
  const newWpis = await prisma.wpis.create({
    data: {tytul, kategoriaId}
  });
  res.json(newWpis);
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { tytul, kategoriaId } = req.body;
  const updatedWpis = await prisma.wpis.update({
    where: { id: Number(id) },
    data: { tytul, kategoriaId }
  });
  res.json(updatedWpis);
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.wpis.delete({ where: { id: Number(id) } });
  res.json({ message: 'Wpis usunięty' });
});

export default router;
