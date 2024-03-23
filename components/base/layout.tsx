import { PropsWithChildren } from "react";

import { Header } from "~/components/base/header/header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <main className="bg-background text-foreground flex min-h-screen">
      <section className="relative mx-auto flex w-full max-w-screen-lg  flex-col">
        <Header />

        <div className="flex flex-row">{children}</div>
      </section>
    </main>
  );
}
