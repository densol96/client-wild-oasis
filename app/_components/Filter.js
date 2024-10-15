"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Button({ children, filter }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") || "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default function Filter() {
  return (
    <div className="border-primary-800 border flex">
      <Button filter="all">All</Button>
      <Button filter="small">1&mdash;3</Button>
      <Button filter="medium">4&mdash;7</Button>
      <Button filter="large">8&mdash;12</Button>
    </div>
  );
}
