import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.id);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    id: `${cabin.id}`,
  }));
  return ids;
}

export const revalidate = 3600;

export default async function Page({ params }) {
  // LONG
  const cabin = await getCabin(params.id);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.id);

  // BETTER but even better to split between components and then stream them as they are ready
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.id),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.id),
  // ]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
