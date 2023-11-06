import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class FlexibilityController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    index = async (_: Request, res: Response) => {
        try {
            const flexibilities = await this.prisma.flexibility.findMany();
            res.json(flexibilities);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    };

    add = async (req: Request, res: Response ) => {
        const { flexibility_tipe } = req.body;
        try {
            const flexibility = await this.prisma.flexibility.create({
                data: {
                    flexibility_tipe
                },
            });
            res.json(flexibility);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    update = async ( req: Request, res: Response ) => {
        try {
            const id = parseInt(req.params.id);
            const {flexibility_tipe} = req.body;
            const flexibility = await this.prisma.flexibility.update({
                where: {id},
                data: {
                   flexibility_tipe
                }
            });
            res.json(flexibility);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }

    delete = async (req: Request, res: Response ) => {
        try {
            const id = parseInt(req.params.id);
            await this.prisma.flexibility.delete({
                where: {
                    id: id
                }
            });
            res.json({ message: 'data flexibility berhasil dihapus'})
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }
}

export default new FlexibilityController();