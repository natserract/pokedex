import { cn } from "~/utils/cn";
import { Logo as HeaderLogo } from "~/components/base/logo";
import {
  Action as HeaderAction,
  Props as HeaderActionProps,
} from "~/components/base/header/action";

interface Props extends HeaderActionProps {}

export function Header({ disableSort }: Props) {
  return (
    <nav className="bg-background sticky top-0 z-10 flex h-fit flex-col gap-2">
      <div className="mx-4 flex items-center gap-5 py-4 lg:mx-0 lg:px-8">
        <div
          className={cn("relative flex w-full items-center justify-between")}
        >
          <HeaderLogo />
          <HeaderAction disableSort={disableSort} />
        </div>
      </div>
    </nav>
  );
}
