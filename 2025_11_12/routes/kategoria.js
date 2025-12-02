import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany({
        include: { wpisy: true }
    });

    await req.logService.addLog("READ", "kategoria", kategorie);

    res.json(kategorie);
});

router.get('/:id', async (req, res) => {
    const kategoria = await prisma.kategoria.findUnique({
        where: { id: Number(req.params.id) },
        include: { wpisy: true }
    });

    await req.logService.addLog("READ", "kategoria", kategoria);

    res.json(kategoria);
});

router.post('/', async (req, res) => {
    const { nazwa } = req.body;

    const newKategoria = await prisma.kategoria.create({
        data: { nazwa }
    });

    await req.logService.addLog("CREATE", "kategoria", newKategoria);

    res.json(newKategoria);
});

router.put('/:id', async (req, res) => {
    const { nazwa } = req.body;

    const updated = await prisma.kategoria.update({
        where: { id: Number(req.params.id) },
        data: { nazwa }
    });

    await req.logService.addLog("UPDATE", "kategoria", updated);

    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    const removed = await prisma.kategoria.delete({
        where: { id: Number(req.params.id) }
    });

    await req.logService.addLog("DELETE", "kategoria", removed);

    res.json(removed);
});

export default router;
