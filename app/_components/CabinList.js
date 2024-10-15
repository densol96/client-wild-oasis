import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;

  let cabinsForDisplay;

  if (filter === "all") cabinsForDisplay = cabins;
  else if (filter === "small")
    cabinsForDisplay = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  else if (filter === "medium")
    cabinsForDisplay = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8
    );
  else if (filter === "large")
    cabinsForDisplay = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabinsForDisplay.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
