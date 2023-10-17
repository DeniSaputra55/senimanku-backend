import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

class TypeController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  index = async (_: Request, res: Response) => {
    try {
      const types = await this.prisma.type.findMany();
      res.json(types);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  store = async (req: Request, res: Response) => {
    const { deskripsi_type } = req.body;
    try {
      const type = await this.prisma.type.create({
        data: {
          deskripsi_type,
        },
      });
      res.json(type);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { deskripsi_type } = req.body;
      const type = await this.prisma.type.update({
        where: { id },
        data: {
          deskripsi_type,
        },
      });
      res.json(type);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this.prisma.type.delete({
        where: {
          id: id
        },
      });
      res.json({ message: "data berhasil di hapus" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new TypeController();
