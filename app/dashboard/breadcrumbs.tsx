"use client";

import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

export default function Breadcrumbs() {
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    {pathNames.map((link, index) => {
                        let href = `/${pathNames
                            .slice(0, index + 1)
                            .join("/")}`;
                        let itemLink = link;
                        return (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <Link href={href}>{itemLink}</Link>
                                </BreadcrumbItem>

                                {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
