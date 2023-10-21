import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class AssetController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    index = async (_: Request, res: Response) => {
        try {
            const assets = await this.prisma.asset.findMany();
            res.json(assets);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    };

    add = async (req: Request, res: Response) => {
        const { asset_type, deskripsi_type, slug } = req.body;
        try {
            const asset = await this.prisma.asset.create({
                data: {
                    asset_type,
                    deskripsi_type,
                    slug
                },
            });
            res.json(asset);
        } catch ( error: any ) {
            res.status(500).json({error: error.message })
        }
    };

    update = async ( req: Request, res: Response ) => {
        try {
            const id = parseInt(req.params.id);
            const {asset_type, deskripsi_type, slug} = req.body;
            const asset = await this.prisma.asset.update({
                where: {id},
                data: {
                    asset_type,
                    deskripsi_type,
                    slug
                }
            });
            res.json(asset);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }

    delete = async ( req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.prisma.asset.delete({
                where: {
                    id: id
                }
            });
            res.json( { message: 'data berhasil di hapus'})
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }
}

export default new AssetController();