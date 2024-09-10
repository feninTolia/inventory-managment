import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getExpensesByCategory = async (req: Request, res: Response) => {
  try {
    const expensesByCategorySummaryRaw =
      await prisma.expenseByCategory.findMany({ orderBy: { date: 'desc' } });

    const expensesByCategory = expensesByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.json(expensesByCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses by category' });
  }
};
