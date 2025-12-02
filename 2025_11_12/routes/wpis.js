import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const wpisy = await prisma.wpis.findMany({
        include: { kategoria: true, komentarze: true }
    });

    await req.logService.addLog("READ", "wpis", wpisy);

    res.json(wpisy);
});

router.get('/:id', async (req, res) => {
    const wpis = await prisma.wpis.findUnique({
        where: { id: Number(req.params.id) },
        include: { kategoria: true, komentarze: true }
    });

    await req.logService.addLog("READ", "wpis", wpis);

    res.json(wpis);
});

router.post('/', async (req, res) => {
    const { tytul, kategoriaId } = req.body;

    const newWpis = await prisma.wpis.create({
        data: { tytul, kategoriaId }
    });

    await req.logService.addLog("CREATE", "wpis", newWpis);

    res.json(newWpis);
});

router.put('/:id', async (req, res) => {
    const { tytul, kategoriaId } = req.body;

    const updated = await prisma.wpis.update({
        where: { id: Number(req.params.id) },
        data: { tytul, kategoriaId }
    });

    await req.logService.addLog("UPDATE", "wpis", updated);

    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    const removed = await prisma.wpis.delete({
        where: { id: Number(req.params.id) }
    });

    await req.logService.addLog("DELETE", "wpis", removed);

    res.json(removed);
});

export default router;
