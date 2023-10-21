import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class LokasiController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    index = async (_: Request, res: Response) => {
        try {
            const lokasis = await this.prisma.lokasi.findMany();
            res.json(lokasis);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    add = async (req: Request, res: Response) => {
        const { alamat} = req.body;
        try {
            const lokasi = await this.prisma.lokasi.create({
                data: {
                    alamat,
                },
            });
            res.json(lokasi);
        } catch (error: any) {
            res.status(500).json({error: error.message })
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const {alamat} = req.body;
            const lokasi = await this.prisma.lokasi.update({
                where:{id},
                data: {
                    alamat,
                }
            });
            res.json(lokasi);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt (req.params.id );
            await this.prisma.lokasi.delete({
                where: {
                    id: id
                }
            });
            res.json({message: 'data berhasil di hapus'})
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }
}

export default new LokasiController();