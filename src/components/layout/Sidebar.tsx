'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, PenTool, Users, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: '홈', href: '/dashboard', icon: Home },
    { name: '자서전 쓰기', href: '/biography', icon: PenTool },
    { name: '서재', href: '/library', icon: BookOpen },
    { name: '커뮤니티', href: '/community', icon: Users },
    { name: '설정', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full min-h-screen w-64 flex-col border-r border-secondary-200 bg-white">
            <div className="flex-1 overflow-y-auto py-6 px-4">
                <nav className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                                )}
                            >
                                <item.icon className={cn('h-6 w-6', isActive ? 'text-primary-500' : 'text-secondary-400')} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="border-t border-secondary-200 p-4">
                <button
                    onClick={() => console.log('logout')} // TODO: Implement logout
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-colors"
                >
                    <LogOut className="h-6 w-6 text-secondary-400" />
                    로그아웃
                </button>
            </div>
        </div>
    )
}
