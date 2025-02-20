import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import StarBackground from "@/slices/Integrations/StarBackground";
import background from "./background.jpg";
import Image from "next/image";
import {
  FaDigitalOcean,
  FaCloudflare,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from "react-icons/fa6";
import StylizedLogoMark from "./StylizedLogoMark";
import React from "react";
import clsx from "clsx";

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  const icons = {
    digitalocean: <FaDigitalOcean />,
    cloudflare: <FaCloudflare />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />
      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <h2 className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicText field={slice.primary.body} />
        </h2>
      </div>
      <div className="mt-20 flex flex-col items-center md:flex-row">
        {slice.primary.icons.map((item, index) => (
          <React.Fragment key={item.icons}>
            {index === Math.floor(slice.primary.icons.length / 2) && (
              <>
                <StylizedLogoMark />
                <div className="signal-line rotate-180 bg-gradient-to-t" />
              </>
            )}
            <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border-blue-50/30 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
              {item.icons && icons[item.icons]}
            </div>
            {index !== slice.primary.icons.length - 1 && (
              <div
                className={clsx(
                  "signal-line",
                  index >= Math.floor(slice.primary.icons.length / 2)
                    ? "rotate-180"
                    : "rotate-0",
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default Integrations;
