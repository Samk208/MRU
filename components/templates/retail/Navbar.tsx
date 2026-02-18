"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavLink {
    href: string;
    label: string;
}

interface NavbarProps {
    storeName: string;
    links?: NavLink[];
}

export function Navbar({
    storeName,
    links = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ]
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo / Store Name */}
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-xl">
                        <ShoppingBag className="h-6 w-6" />
                        <span>{storeName}</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="transition-colors hover:text-foreground/80 text-foreground/60"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu & Logo */}
                <div className="flex md:hidden items-center gap-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="-ml-2 h-9 w-9 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <div className="px-7">
                                <Link
                                    href="/"
                                    className="flex items-center mb-8 font-bold text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    {storeName}
                                </Link>
                                <div className="flex flex-col gap-4">
                                    {links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    {/* Mobile Logo centered or left */}
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-lg">
                        <span>{storeName}</span>
                    </Link>
                </div>

                {/* Right Side Actions (Cart, Login, etc.) */}
                <div className="flex flex-1 items-center justify-end space-x-4">
                    {/* Placeholder for future cart count, search, etc. */}
                    <Button>Cart (0)</Button>
                </div>
            </div>
        </header>
    );
}
