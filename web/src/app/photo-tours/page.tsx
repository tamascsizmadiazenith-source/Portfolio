import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tours = [
  {
    slug: "lienzer-dolomiten-2027",
    banner: "/workshop/2027070104/banner.jpg",
    title: "Lienzer Dolomiten 01-04.07.2027.",
  },
];

export default function PhotoToursPage() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Photo Tours</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            My Photo Hiking Tours
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/72">
            Join me on one of my public mountain adventures. I don&apos;t do workshops, I
            don&apos;t visit usually famous places, and I don&apos;t shoot 5 minutes distance from
            my car. If you come with me, you may explore places they are not very often in
            Instagram, but similar amazing, and you can hang your artwork on the wall at home. In
            the end you will watch your photos and think, how much you have worked for it, how
            difficult it was to reach the scenix spot, or how much you have fought with the
            weather, sleeping in public, hiking some intermediate elevation gain. I will never
            tell you what and how to shoot it, but I will always give hints about light, nature,
            composition and technique. If you need help, we&apos;ll always help each other taking
            off weight, setting your camera, lending you filter or tripod, like a big family.
          </p>

          <h2 className="mt-16 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            Upcoming Photo Hiking Tours:
          </h2>
        </div>

        <div className="mt-8 space-y-8">
          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/photo-tours/${tour.slug}`}
              className="group relative block aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]"
            >
              <Image
                src={tour.banner}
                alt={tour.title}
                fill
                priority
                sizes="100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/45" />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <h3 className="text-3xl font-bold uppercase tracking-[0.05em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-6xl">
                  {tour.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
