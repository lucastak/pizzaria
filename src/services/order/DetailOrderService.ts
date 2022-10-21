import prismaClient from "../../prisma";

interface DetailtRequest {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailtRequest) {
    const orders = await prismaClient.item.findMany({
      where: {
        order_id: order_id,
      },
      include: {
        product: true,
        order: true,
      },
    });

    return orders;
  }
}

export { DetailOrderService };
