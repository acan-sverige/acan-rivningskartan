import type { PropsWithChildren } from "react";

export const listItem = {
  bullet: ({ children }: PropsWithChildren) => (
    <li className="my-1 list-item list-inside list-disc">{children}</li>
  ),
  number: ({ children }: PropsWithChildren) => (
    <li className="my-1 list-item list-inside list-decimal">{children}</li>
  ),
};
