import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/ThemeContext";

export default function AppLayout({ children }) {
    const { props } = usePage();
    const auth = props?.auth || {};
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const onLogout = () => {
        router.get("/auth/logout");
    };

    return (
        <div className={`${theme} min-h-screen bg-background dark:bg-gray-900`}>
            {/* Navigation */}
            <nav className="border-b bg-card dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="text-lg font-bold dark:text-white">
                                Mathsel Application
                            </Link>

                            <Link 
                                href="/todos" 
                                className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                📝 Todos
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>
                            {/* User Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center space-x-3 bg-white p-2 rounded-lg hover:bg-gray-50 transition-colors border dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                                >
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                        {auth.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left hidden sm:block">
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {auth.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {auth.email}
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showProfileMenu && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowProfileMenu(false)}
                                        ></div>
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-20 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-3 border-b dark:border-gray-600">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{auth.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{auth.email}</div>
                                            </div>
                                            <div className="py-1">
                                                <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                                                    <div>Bergabung sejak:</div>
                                                    <div className="font-medium">{new Date(auth.created_at).toLocaleDateString('id-ID', { 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}</div>
                                                </div>
                                            </div>
                                            <div className="border-t dark:border-gray-600">
                                                <button
                                                    onClick={onLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors dark:hover:bg-red-500 dark:hover:text-white"
                                                >
                                                    🚪 Logout
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t bg-card dark:bg-gray-800 py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground dark:text-gray-400">
                    &copy; 2025 Delcom Labs. All rights reserved.
                </div>
            </footer>
        </div>
    );
}