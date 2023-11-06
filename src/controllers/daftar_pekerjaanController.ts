import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class DaftarPekerjaan {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    index = async (_: Request, res: Response) => {
        try {
            const daftarpekerjaans = await this.prisma.daftar_Pekerjaan.findMany();
            res.json(daftarpekerjaans);
        } catch (error: any) {
            res.status(500).json({error: error.message });
        }
    };

    add = async (req: Request, res: Response) => {
        const {judul_pekerjaan, deskripsi_pekerjaan, lokasi_pekerjaan_id} = req.body;
        try {
            const daftar_Pekerjaan = await this.prisma.daftar_Pekerjaan.create({
                data: {
                    judul_pekerjaan,
                    deskripsi_pekerjaan,
                    lokasi_pekerjaan_id
                },
            });
            res.json(daftar_Pekerjaan);
        } catch (error: any ) {
            res.status(500).json({error: error.message});
        }
    };

    update = async (req: Request, res: Response)=> {
        try {
            const id = parseInt(req.params.id);
            const {judul_pekerjaan, deskripsi_pekerjaan, lokasi_pekerjaan_id} = req.body;
            const daftar_Pekerjaan = await this.prisma.daftar_Pekerjaan.update({
                where:{id},
                data: {
                    judul_pekerjaan,
                    deskripsi_pekerjaan,
                    lokasi_pekerjaan_id
                }
            });
            res.json(daftar_Pekerjaan);
        } catch (error: any) {
            res.status(500).json({error: error.message})
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.prisma.daftar_Pekerjaan.delete({
                where: {
                    id: id
                }
            });
            res.json({message: "data berhasil di hapus"})
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}

export default new DaftarPekerjaan();