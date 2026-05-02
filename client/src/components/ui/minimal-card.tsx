import * as React from "react"

import { cn } from "../../lib/utils"

const MinimalCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[24px] bg-white/95 backdrop-blur-sm p-2 no-underline shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl border border-blue-100/50",
      "shadow-[0px_2px_8px_0px_rgba(59,130,246,0.08),0px_1px_3px_0px_rgba(59,130,246,0.1)]",
      "hover:shadow-[0px_8px_25px_0px_rgba(59,130,246,0.15),0px_3px_10px_0px_rgba(59,130,246,0.1)]",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
MinimalCard.displayName = "MinimalCard"

const MinimalCardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt: string }
>(({ className, alt, src, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative mb-6 h-[190px] w-full rounded-[20px]",
      "shadow-[0px_2px_4px_0px_rgba(59,130,246,0.1),0px_1px_2px_0px_rgba(59,130,246,0.06)]",
      className
    )}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      width={200}
      height={200}
      className="absolute inset-0 size-full rounded-[16px] object-cover"
    />
    <div className="absolute inset-0 rounded-[16px]">
      <div
        className={cn(
          "absolute inset-0 rounded-[16px]",
          "shadow-[0px_0px_0px_1px_rgba(59,130,246,0.1),0px_0px_0px_2px_rgba(255,255,255,0.8),0px_0px_0px_3px_rgba(59,130,246,0.05)]"
        )}
      />
    </div>
  </div>
))
MinimalCardImage.displayName = "MinimalCardImage"

const MinimalCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("mt-2 px-1 text-lg font-semibold leading-tight", className)}
    {...props}
  />
))
MinimalCardTitle.displayName = "MinimalCardTitle"

const MinimalCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("px-1 pb-2 text-sm text-neutral-500", className)}
    {...props}
  />
))
MinimalCardDescription.displayName = "MinimalCardDescription"

const MinimalCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
MinimalCardContent.displayName = "MinimalCardContent"

const MinimalCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
MinimalCardFooter.displayName = "MinimalCardFooter"

export {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
  MinimalCardFooter,
}
