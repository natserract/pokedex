"use client";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

import Button from "~/components/base/button";

type Props = {
  type: "prev" | "next";
  offset: number;
  limit: number;
};

export function PaginationButton({ offset, limit, type }: Props) {
  const router = useRouter();

  const handleClick = () => {
    let params = `/?offset=${offset}&limit=${limit}`;

    if (type === "prev" && offset < limit) {
      params = "/";
    }

    NProgress.inc();
    router.push(params);
  };

  return (
    <Button
      variant="secondary"
      className="min-w-[100px] text-xs"
      onClick={handleClick}
    >
      {type == "next" ? "Next" : "Previous"}
    </Button>
  );
}
