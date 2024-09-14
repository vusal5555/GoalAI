import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />

      <div className="flex items-center justify-center h-screen">
        <h1 className="font-bold text-4xl">This will be the landing page!</h1>
      </div>
    </>
  );
}
