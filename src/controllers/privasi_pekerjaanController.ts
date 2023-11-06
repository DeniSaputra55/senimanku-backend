import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class PrivasiPekerjaan {
    private prisma: PrismaClient;

     constructor() {
        this.prisma = new PrismaClient();
     }

     index = async (_: Request, res: Response) => {
        try {
            const privasipekerjaans = await this.prisma.privasi_pekerjaan.findMany();
            res.json(privasipekerjaans);
        } catch (error: any) {
            res.status(500).json({error: error.message });
        }
     };

     add = async (req: Request, res: Response) => {
        const {jenis_pekerjaan} = req.body;
        try {
            const privasi_pekerjaan = await this.prisma.privasi_pekerjaan.create({
                data: {
                    jenis_pekerjaan
                },
            });
            res.json(privasi_pekerjaan);
        } catch (error: any ) {
            res.status(500).json({error: error.message })
        }
     };

     update = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const {jenis_pekerjaan} = req.body;
            const privasi_pekerjaan = await this.prisma.privasi_pekerjaan.update({
                where: {id},
                data: {
                    jenis_pekerjaan
                }
            });
            res.json(privasi_pekerjaan);
        } catch (error: any ){
            res.status(500).json({error: error.message });
        }
     }

     delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.prisma.privasi_pekerjaan.delete({
                where: {
                    id: id
                }
            });
            res.json({ message: "data berhasil di hapus"})
        } catch (error: any ) {
            res.status(500).json({error: error.message});
        }
     }
}

export default new PrivasiPekerjaan();