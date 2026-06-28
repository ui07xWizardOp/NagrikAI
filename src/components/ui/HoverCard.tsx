import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { motion, HTMLMotionProps, Transition } from "motion/react"

import { cn } from "../../lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

type HoverCardContentProps = React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & 
  Omit<HTMLMotionProps<"div">, "asChild" | "forceMount" | "onDragStart" | "onDrag" | "onDragEnd"> & {
    transition?: Transition;
  };

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, transition, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    asChild
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={transition || { type: 'spring', stiffness: 300, damping: 25 }}
      className={cn(
        "z-50 w-64 rounded-md border border-border-default bg-surface-card p-4 text-text-primary shadow-md outline-none",
        className
      )}
      {...props as any}
    />
  </HoverCardPrimitive.Content>
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
