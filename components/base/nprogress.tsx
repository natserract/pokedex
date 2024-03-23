"use client";
import { useEffect } from "react";
import NProgress from "nprogress";

type PushStateInput = [
  data: any,
  unused: string,
  url?: string | URL | null | undefined,
];

export default function Progress() {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll<HTMLAnchorElement>(
        "a:not([target=_blank])",
      );
      const anchorElementsButton: any = document.querySelectorAll(
        "button[data-route='true']",
      );

      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick),
      );

      anchorElementsButton.forEach((anchor: any) =>
        anchor.addEventListener("click", handleAnchorClick),
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });
  });

  return null;
}
