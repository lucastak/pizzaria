import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class SendOrderService {
  async excecute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: false,
      },
    });

    return order;
  }
}

export { SendOrderService };
