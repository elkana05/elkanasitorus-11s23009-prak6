import React from "react";
import { useTheme } from "@/lib/ThemeContext";
import { Head } from "@inertiajs/react";

export default function MainLayout({ children }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            {/* Menambahkan font Poppins dari Google Fonts */}
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className={`${theme} font-['Poppins']`}>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
                        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <h1 className="text-4xl font-bold tracking-wider">
                                Mathsel Application
                            </h1>
                            <button
                                onClick={toggleTheme}
                                className="text-2xl p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                            >
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>
                        </div>
                    </header>
                    <main>{children}</main>
                    <footer className="bg-gradient-to-r from-purple-700 to-blue-600 text-white mt-8">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <p className="text-center text-sm font-light">
                                &copy; 2025 Mathsel Application. Dibuat dengan
                                ❤️ oleh Delcom Labs.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
