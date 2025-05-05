"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MdfeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      <div className="border-b p-4">
        <Breadcrumb>
          {paths.map((path, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link href={`/${paths.slice(0, index + 1).join("/")}`}>
                  {path === "mdfe" ? "MDF-e/" : path}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
