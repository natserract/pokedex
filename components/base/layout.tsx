import { PropsWithChildren } from "react";

import { Header } from "~/components/base/header/header";
import { Props as HeaderActionProps } from "~/components/base/header/action";

interface Props extends HeaderActionProps {}

export function Layout({ disableSort, children }: PropsWithChildren<Props>) {
  return (
    <main className="bg-background text-foreground flex min-h-screen">
      <section className="relative mx-auto flex w-full max-w-screen-lg  flex-col">
        <Header disableSort={disableSort}/>

        <div className="p-4">{children}</div>
      </section>
    </main>
  );
}
