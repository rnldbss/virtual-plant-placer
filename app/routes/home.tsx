import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Check a Plant" }];
}

export default function Home() {
  return (
    <div className="bg-level-0 h-screen w-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl text-secondary">Virtual Plant Placer</h1>
        <Link
          className="bg-accent px-3 py-1 text-level-0 rounded-md"
          to={"/garden"}
        >
          Test a plant
        </Link>
      </div>
    </div>
  );
}
