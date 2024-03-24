import React, { PropsWithChildren } from "react";

import { Layout as BaseLayout } from "~/components/base/layout";

export default function Layout({ children }: PropsWithChildren) {
  return <BaseLayout disableSort>{children}</BaseLayout>;
}
