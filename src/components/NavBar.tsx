"use client";

import React, { useState } from "react";
import WordMark from "@/components/WordMark";
import { asLink, Content } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import { MdClose, MdMenu } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  settings: Content.SettingsDocument;
};

const NavBar = ({ settings }: Props) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only">Prismic test</span>
          </Link>
          <button
            aria-expanded={open}
            onClick={() => {
              setOpen(true);
            }}
            className="block py-2 text-3xl text-white md:hidden"
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            aria-expanded={open}
            onClick={() => {
              setOpen(false);
            }}
            className="fixed right-4 top-4 mb-4 block py-2 text-3xl text-white md:hidden"
          >
            <MdClose />
            <span className="sr-only">Open Menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            {settings.data.navigation.map((nav) => {
              if (nav.cta_button) {
                return (
                  <ButtonLink
                    onClick={() => setOpen(false)}
                    key={nav.label}
                    field={nav.link}
                    aria-current={
                      pathName.includes(asLink(nav.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {nav.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  key={nav.label}
                  className="block px-3 text-3xl first:mt-8"
                  field={nav.link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathName.includes(asLink(nav.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {nav.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((nav) => {
            if (nav.cta_button) {
              return (
                <li key={nav.label}>
                  <ButtonLink
                    aria-current={
                      pathName.includes(asLink(nav.link) as string)
                        ? "page"
                        : undefined
                    }
                    key={nav.label}
                    field={nav.link}
                  >
                    {nav.label}
                  </ButtonLink>
                </li>
              );
            }
            return (
              <li key={nav.label}>
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={nav.link}
                  aria-current={
                    pathName.includes(asLink(nav.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {nav.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
