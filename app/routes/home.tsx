import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Check a Plant" }];
}

export default function Home() {
  return (
    <div>
      <Link className="text-2xl" to={"/garden"}>
        Go to Garden
      </Link>
    </div>
  );
}
