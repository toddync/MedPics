import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HoverBorderGradient } from "./HoverBorder";

function ModuleCard({ content, icon, click }) {
    return (
        <HoverBorderGradient
            duration={0.15}
            containerClassName="cursor-pointer hover:scale-105 focus:scale-105 transition group"
            className="w-full"
            tabIndex={0}>
            <Card
                className="w-full"
                onClick={click}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">
                        {content && content.title}
                    </CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        {content && content.description}
                    </p>
                </CardContent>
            </Card>
        </HoverBorderGradient>
    );
}

export default ModuleCard;
