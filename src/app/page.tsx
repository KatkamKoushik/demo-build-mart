import HeroSection from "@/components/hero/HeroSection";
import CollectionsSection from "@/components/sections/CollectionsSection";
import InspirationSection from "@/components/sections/InspirationSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24 md:pb-0">
      <HeroSection />
      <CollectionsSection />
      <InspirationSection />
    </main>
  );
}
