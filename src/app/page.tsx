import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import camiseta1 from "../assets/camiseta-1.png";
import camiseta2 from "../assets/camiseta-2.png";
import camiseta3 from "../assets/camiseta-3.png";
import camiseta4 from "../assets/camiseta-4.png";

export default function Home() {
  return (
    <main className="ml-auto flex w-full gap-12">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-full basis-1/3">
              <a className="group relative flex min-h-[328px] min-w-[348px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1EA483] to-[#7435D4] p-1">
                <Image
                  src={camiseta1}
                  width={260}
                  height={240}
                  alt=""
                  className="object-cover"
                />
                <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-[rgba(0,0,0,0.6)] px-5 py-4 opacity-0 transition-transform duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                  <strong className="text-base font-bold text-gray300">
                    Camiseta 1
                  </strong>
                  <span className="text-lg font-bold text-green300">
                    R$ 79,90
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
