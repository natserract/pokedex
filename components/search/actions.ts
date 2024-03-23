"use server";
import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const rawFormData = {
    query: formData.get("query"),
  };

  redirect(`/search?query=${encodeURIComponent(rawFormData.query as string)}`);
}
