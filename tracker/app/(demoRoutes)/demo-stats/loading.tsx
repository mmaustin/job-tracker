import { DemoStatsLoadingCard } from "@/components/demoComponents/DemoStatsCard";

function loading() {
  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <DemoStatsLoadingCard />
      <DemoStatsLoadingCard />
      <DemoStatsLoadingCard />
    </div>
  );
}
export default loading;