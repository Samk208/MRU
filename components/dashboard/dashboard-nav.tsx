'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Menu, Package, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    {
        title: 'Home',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Products',
        href: '/dashboard/products',
        icon: Package,
    },
    {
        title: 'Orders',
        href: '/dashboard/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Profile',
        href: '/dashboard/profile',
        icon: User,
    },
]

export function DashboardNav() {
    const pathname = usePathname()

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r bg-card h-screen fixed left-0 top-0">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-primary">MRU</h2>
                    <p className="text-xs text-muted-foreground">Merchant OS</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            asChild
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className={cn(
                                'w-full justify-start',
                                pathname === item.href && 'bg-secondary'
                            )}
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    {/* User Profile Summary / Logout could go here */}
                    <div className="flex items-center gap-2 px-2 py-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">My Store</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50 pb-safe">
                <nav className="flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center justify-center w-full h-full space-y-1',
                                    isActive ? 'text-primary' : 'text-muted-foreground'
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
                                <span className="text-[10px] font-medium">{item.title}</span>
                            </Link>
                        )
                    })}
                    <Button variant="ghost" size="icon" className="flex flex-col h-full rounded-none">
                        <Menu className="h-5 w-5 text-muted-foreground" />
                        <span className="text-[10px] font-medium text-muted-foreground sr-only">More</span>
                    </Button>
                </nav>
            </div>
        </>
    )
}
