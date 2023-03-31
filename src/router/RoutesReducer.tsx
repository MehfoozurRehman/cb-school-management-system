import Action from "./Action";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "./Loader";
import { lazy } from "react";

export default function RoutesReducer(
  eagers: Record<string, unknown>,
  lazys: Record<string, () => Promise<unknown>>
) {
  return Object.keys(eagers === null ? lazys : eagers).reduce((routes, key) => {
    const module = lazys[key];

    const route = {
      Component: eagers === null ? lazy(module) : eagers[key].default,
      loader: Loader(module),
      action: Action(module),
      ErrorBoundary: ErrorBoundary(module),
      preload: module,
    };

    const segments = key
      .replace(/\/src\/screens|\.jsx|\.tsx$/g, "")
      .replace(/\[\.{3}.+\]/, "*")
      .replace(/\[(.+)\]/, ":$1")
      .replace(/\.lazy/, "")
      .toLowerCase()
      .split("/")
      .filter((p) => !p.includes("_"))
      .filter(Boolean);

    segments.reduce((parent, segment, index) => {
      const path = segment.replace(/index|\./g, "");
      const root = index === 0;
      const leaf = index === segments?.length - 1 && segments?.length > 1;
      const node = !root && !leaf;
      const insert = /^\w|\//.test(path) ? "unshift" : "push";

      if (root) {
        const dynamic = path.startsWith("[") || path === "*";
        if (dynamic) return parent;
        const last = segments?.length === 1;
        if (last) {
          routes.push({ path, ...route });
          return parent;
        }
      }

      if (root || node) {
        const current = root ? routes : parent.children;
        const found = current?.find(
          (route: { path: string }) => route.path === path
        );
        found
          ? (found.children ??= [])
          : current?.[insert]({
              path: path,
              children: [],
            });
        return (
          found || current?.[insert === "unshift" ? 0 : current?.length - 1]
        );
      }

      if (leaf) {
        parent?.children?.[insert]({
          path: path.replace(/\/$/, ""),
          ...route,
        });
      }

      return parent;
    }, {});

    return routes;
  }, []);
}
