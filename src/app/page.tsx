import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export default async function Home() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    };
  });

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
                  src={product.imageUrl}
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
                    {product.price !== null && `R$ ${product.price / 100}`}
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
