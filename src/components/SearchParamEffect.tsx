"use client";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";
import { Suspense, useEffect } from "react";

type Props = {
  name: string;
  onChange: (value: string | null) => void;
};

// Search params are only known in the browser, so read them in an isolated
// Suspense boundary to let the rest of the page be prerendered
export const SearchParamEffect: FC<Props> = (props) => (
  <Suspense fallback={null}>
    <SearchParamReader {...props} />
  </Suspense>
);

const SearchParamReader: FC<Props> = ({ name, onChange }) => {
  const value = useSearchParams().get(name);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return null;
};
