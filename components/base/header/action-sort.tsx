"use client";
import { ArrowUpDown } from "lucide-react";

import { cn } from "~/utils/cn";
import * as Dropdown from "~/components/base/dropdown";

export function SortAction() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button
          type="button"
          aria-label="Urutkan pokemon"
          className={cn(
            "text-foreground/50 hover:text-foreground transition-all duration-200",
          )}
        >
          <ArrowUpDown size={20} className="shrink-0 " />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item className="flex cursor-pointer items-center gap-2">
          Urut nama
        </Dropdown.Item>

        <Dropdown.Item className="flex cursor-pointer items-center gap-2">
          Urut tanggal ditambahkan
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
