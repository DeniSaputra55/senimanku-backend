import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class CategoryController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    index = async (_: Request, res: Response) => {
        try {
            const categorys = await this.prisma.category.findMany();
            res.json(categorys);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    };

    add = async (req: Request, res: Response) => {
        const { deskripsi_category } = req.body;
        try {
            const category = await this.prisma.category.create({
                data: {
                    deskripsi_category,
                },
            });
            res.json(category);
        } catch ( error: any ) {
            res.status(500).json({error: error.message })
        }
    }

    update = async ( req: Request, res: Response ) => {
        try {
            const id = parseInt(req.params.id);
            const {deskripsi_category} = req.body;
            const category = await this.prisma.category.update({
                where: {id},
                data: {
                    deskripsi_category,
                }
            });
            res.json(category);
        } catch (error: any ) {
            res.status(500).json({error: error.message });
        }
    }

    delete = async ( req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            await this.prisma.category.delete({
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

export default new CategoryController();