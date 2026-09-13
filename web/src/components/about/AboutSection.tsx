import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#0A0C10] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="rounded-[36px] border border-white/10 bg-[#11131A] px-6 py-8 shadow-[0_30px_70px_rgba(0,0,0,0.32)] sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">
              About the Artist
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Passion for alpine light and adventure.
            </h2>
            <div className="mt-10 space-y-12 text-lg leading-8 text-white/72">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-6">
                  <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">Origins</div>
                  <p>
                    I’m <strong>Tamás Csizmadia</strong>, a professional photographer from Hungary, driven by a strong belief in <strong>quality over quantity</strong> and a constant pursuit of mastery in my craft.
                  </p>
                  <p>
                    My journey began in computer engineering, where I developed a deep understanding of image processing and digital editing. Photography became my passion in 2013, and after purchasing my first DSLR in 2014, I fully immersed myself in learning the art through books, hands-on practice, mistakes, and guidance from experienced professionals.
                  </p>
                </div>
                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0F1218] p-3 shadow-[0_25px_50px_rgba(0,0,0,0.24)]">
                  <div className="relative overflow-hidden rounded-[24px]">
                    <Image
                      src="/photos-web/about/TapovanTrek_25-09-23_2386.jpg"
                      alt="Artist portrait in the mountains"
                      width={3230}
                      height={4845}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <div className="order-2 space-y-6 lg:order-1">
                  <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">Mountain Practice</div>
                  <p>
                    My greatest passion lies in outdoor photography: chasing light in the mountains, capturing the raw beauty of landscapes, and telling stories through nature’s most spectacular moments. Alongside landscapes, I’m equally drawn to photographing people in extreme environments and action-driven sports such as skateboarding, climbing, bouldering, via ferrata, and glacier trekking.
                  </p>
                  <p>
                    To work more confidently and safely in alpine environments, I trained in basic mountaineering skills in 2022 in Grindelwald and later joined the Swiss Alpine Club.
                  </p>
                  <p>
                    My photography captures the quiet tension between heights and valleys, with a strong emphasis on light, texture, and hidden alpine landscapes.
                  </p>
                </div>
                <div className="order-1 overflow-hidden rounded-[30px] border border-white/10 bg-[#0F1218] p-3 shadow-[0_25px_50px_rgba(0,0,0,0.24)] lg:order-2 lg:mt-10">
                  <div className="relative overflow-hidden rounded-[24px]">
                    <Image
                      src="/photos-web/about/Spitzmeilen_18-08-25_1737-DxO_DeepPRIME XD2s aff.jpg"
                      alt="Artist portrait on alpine terrain"
                      width={4160}
                      height={6240}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 border-t border-white/10 pt-10">
                <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">Recognition</div>
                <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0F1218] p-3 shadow-[0_25px_50px_rgba(0,0,0,0.24)]">
                  <div className="relative overflow-hidden rounded-[24px]">
                    <Image
                      src="/photos-web/about/f1d00caca85e4b575f9e5bf8ef9b4b0a.JPEG"
                      alt="Alpine landscape from an award-winning shoot"
                      width={3071}
                      height={2048}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <p>
                  My work has been internationally recognized. In 2023, I was awarded the <strong>FIAP Gold Medal</strong> in the Open Color category at the 5th Sopianae International Photo Salon for my image <em>“The Guardian of the Stars”</em> — a Milky Way panorama captured at 2,800 meters above the Steingletscher glacier fields in the Swiss Alps. That same year, I fulfilled a lifelong dream by visiting the Himalayas for the first time and summiting my first Alpine peak, Piz Kesch.
                </p>
                <p>
                  In 2026, I earned the prestigious <strong>AFIAP</strong> distinction, officially becoming an Artist of the International Federation of Photographic Art. In the same year, I was ranked the <strong>3rd best photographer in Baden-Württemberg</strong> and won <strong>1st Prize</strong> in the DVF Abenteuer category at the 14th Fotogipfel Photo Festival with my photograph <em>“Towards into the Unknown”</em>, created during an alpine ridge traverse on Piz Medel.
                </p>
                <p className="text-white/64">
                  The work is curated for collectors, exhibitions, and fine art spaces that seek strong visual stories and timeless quality. For me, photography is more than creating images — it is about adventure, emotion, and the connection between human experience and the wild.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
