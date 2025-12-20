"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Chip, type ChipProps } from "@heroui/react";
import { cn } from "@/lib/utils";

type SlideShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  background?: ReactNode;
  align?: "left" | "center";
  size?: "default" | "compact";
  chipColor?: ChipProps["color"];
  className?: string;
  contentClassName?: string;
};

export default function SlideShell({
  eyebrow,
  title,
  subtitle,
  children,
  background,
  align = "left",
  size = "default",
  chipColor = "default",
  className,
  contentClassName,
}: SlideShellProps) {
  return (
    <section
      className={cn(
        "h-full w-full pt-[clamp(72px,8vh,96px)] pb-[clamp(36px,6vh,56px)] px-6 md:px-8 flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {background}
      <div className="w-full max-w-6xl flex flex-col min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Chip
            variant="flat"
            color={chipColor}
            className="mb-4 uppercase tracking-[0.28em] text-[11px] px-4 py-2 backdrop-blur-md"
          >
            {eyebrow}
          </Chip>

          <h2
            className={cn(
              "font-bold text-white leading-tight tracking-tight",
              size === "compact"
                ? "text-3xl md:text-4xl"
                : "text-4xl md:text-5xl"
            )}
          >
            {title}
          </h2>

          {subtitle ? (
            <p
              className={cn(
                "mt-3 text-white/70 text-base md:text-lg leading-relaxed",
                align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        {children ? (
          <div className={cn("mt-8 w-full flex-1 min-h-0", contentClassName)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
