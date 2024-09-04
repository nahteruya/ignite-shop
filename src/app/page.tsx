import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type TProduct = {
  id: "prod_QkxkNJIDbnr9cL";
  created: 1725012791;
  default_price: {
    id: "price_1PtRpLKellmspScc70zpf2PT";
    currency: "brl";
    unit_amount: 7490;
    unit_amount_decimal: "7490";
  };
  description: "Criada no Brasil e feita pro mundo, todos nossos produtos são feitos sob demanda para você usando tecnologia de ponta na estamparia.";
  images: [
    "https://files.stripe.com/links/MDB8YWNjdF8xSlFKT0xLZWxsbXNwU2NjfGZsX3Rlc3RfeDVNTFFXcUhBalZ1WmlQMWFUT3pMZnlM00ybPiJby5",
  ];
  name: "Camiseta Maratona Explorer 2.0";
};

export const fetchProducts = async () => {
  const response = await fetch(
    "https://api.stripe.com/v1/products?expand[]=data.default_price",
    {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
      next: { revalidate: 86400 },
    },
  );

  const data = await response.json();
  return data.data;
};

export default async function Home() {
  const products: TProduct[] = await fetchProducts();

  return (
    <main className="ml-auto flex w-full gap-12">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="h-full basis-1/3">
              <a className="group relative flex min-h-[328px] min-w-[348px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1EA483] to-[#7435D4] p-1">
                <Image
                  src={product.images[0]}
                  width={260}
                  height={240}
                  alt=""
                  className="object-cover"
                />
                <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-[rgba(0,0,0,0.6)] px-5 py-4 opacity-0 transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  <strong className="text-base font-bold text-gray300">
                    {product.name}
                  </strong>
                  <span className="text-lg font-bold text-green300">
                    {product.default_price.unit_amount !== null &&
                      `R$ ${product.default_price.unit_amount / 100}`}
                  </span>
                </footer>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
