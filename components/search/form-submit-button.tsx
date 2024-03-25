"use client";
import React from "react";
import { useFormStatus } from "react-dom";

import Button from "~/components/base/button";

type SubmitButtonProps = {
  label: string;
  loading: React.ReactNode;
};

export const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      className="min-w-[100px]"
      data-testid="search-submit"
      disabled={pending}
    >
      {pending ? loading : label}
    </Button>
  );
};
