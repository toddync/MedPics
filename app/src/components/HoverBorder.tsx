"use client";
import React, { useState, useEffect, useCallback } from "react";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
    children,
    containerClassName,
    className,
    as: Tag = "span",
    duration = 1,
    clockwise = true,
    // color,
    ...props
}: React.PropsWithChildren<
    {
        as?: React.ElementType;
        containerClassName?: string;
        className?: string;
        duration?: number;
        clockwise?: boolean;
        color?: string;
    } & React.HTMLAttributes<HTMLElement>
>) {
    // const [hovered, setHovered] = useState<boolean>(false);
    const [direction, setDirection] = useState<Direction>("TOP");

    const rotateDirection = useCallback(
        (currentDirection: Direction): Direction => {
            const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
            const currentIndex = directions.indexOf(currentDirection);
            const nextIndex = clockwise
                ? (currentIndex - 1 + directions.length) % directions.length
                : (currentIndex + 1) % directions.length;
            return directions[nextIndex];
        },
        [clockwise]
    );

    const movingMap: Record<Direction, string> = {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    };

    // const highlight = `radial-gradient(75% 181.15942028985506% at 50% 50%, ${color} 0%, rgba(255, 255, 255, 0) 100%)`;

    useEffect(() => {
        // if (!hovered) {
        const interval = setInterval(() => {
            setDirection((prevState) => rotateDirection(prevState));
        }, duration * 1000);
        return () => clearInterval(interval);
        // }
    }, [duration, rotateDirection]);
    return (
        <Tag
            className={cn(
                "relative flex transition duration-500 overflow-visible group",
                containerClassName
            )}
            {...props}>
            <div className={cn("z-[1] bg-background text-left", className)}>
                {children}
            </div>
            <motion.div
                className={cn(
                    "inset-0 overflow-hidden absolute rounded-[inherit] invisible group-hover:visible"
                )}
                style={{
                    filter: "blur(2px)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                initial={{ background: movingMap[direction] }}
                animate={{
                    background:
                        // hovered
                        // ? movingMap[direction]
                        movingMap[direction],
                }}
                transition={{ ease: "linear", duration: duration ?? 1 }}
            />
            <div className="bg-background absolute inset-[2px] rounded-[inherit]" />
        </Tag>
    );
}
