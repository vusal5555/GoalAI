import { Link } from "@inertiajs/react";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-1 py-3  lg:px-4">
      <img className="w-14" src="/logo2.png" alt="Logo" />

      <Link href="/" className="font-bold text-3xl hidden lg:block">
        GoalAI
      </Link>
    </div>
  );
};

export default Logo;
