import Logo from "@/Components/Logo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 px-4 lg:px-0">
      <div>
        <Link href="/">
          <Logo></Logo>
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-5 bg-transparent border shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
