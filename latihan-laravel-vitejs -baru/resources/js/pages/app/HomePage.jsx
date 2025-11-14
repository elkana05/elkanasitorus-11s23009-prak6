import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Link, usePage } from "@inertiajs/react";

export default function HomePage() {
    const { auth } = usePage().props;

    const features = [
        {
            icon: "📝",
            title: "Buat Rencana",
            description: "Tulis dan kelola semua rencana harian Anda dengan mudah",
            color: "from-blue-500 to-cyan-600",
            bgColor: "from-blue-50 to-cyan-50",
        },
        {
            icon: "✅",
            title: "Track Progress",
            description: "Pantau kemajuan dan selesaikan target Anda tepat waktu",
            color: "from-green-500 to-emerald-600",
            bgColor: "from-green-50 to-emerald-50",
        },
        {
            icon: "📊",
            title: "Statistik Real-time",
            description: "Lihat visualisasi data rencana Anda secara langsung",
            color: "from-purple-500 to-pink-600",
            bgColor: "from-purple-50 to-pink-50",
        },
        {
            icon: "🎯",
            title: "Fokus & Produktif",
            description: "Tingkatkan produktivitas dengan sistem yang terorganisir",
            color: "from-orange-500 to-red-600",
            bgColor: "from-orange-50 to-red-50",
        },
        {
            icon: "🔔",
            title: "Reminder Pintar",
            description: "Jangan lewatkan rencana penting dengan sistem notifikasi",
            color: "from-indigo-500 to-purple-600",
            bgColor: "from-indigo-50 to-purple-50",
        },
        {
            icon: "📱",
            title: "Akses Dimana Saja",
            description: "Kelola rencana dari perangkat manapun, kapan saja",
            color: "from-teal-500 to-cyan-600",
            bgColor: "from-teal-50 to-cyan-50",
        },
    ];

    const quickActions = [
        {
            icon: "➕",
            title: "Rencana Baru",
            description: "Tambah rencana hari ini",
            link: "/todos",
            color: "from-indigo-600 to-purple-600",
        },
        {
            icon: "📋",
            title: "Lihat Semua",
            description: "Kelola semua rencana",
            link: "/todos",
            color: "from-blue-600 to-cyan-600",
        },
        {
            icon: "📈",
            title: "Statistik",
            description: "Lihat progress Anda",
            link: "/todos",
            color: "from-green-600 to-emerald-600",
        },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-7xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16 relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-10 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                            <div className="absolute -top-10 right-1/4 w-40 h-40 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                            
                            <div className="relative bg-white rounded-3xl shadow-2xl p-12 border-2 border-gray-100 overflow-hidden">
                                {/* Gradient Border Top */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                
                                <div className="inline-block text-7xl mb-6 animate-bounce">👋</div>
                                <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        {getGreeting()}, {auth.name}!
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                    Siap untuk mencapai target hari ini? Mari mulai dengan membuat rencana baru! 🚀
                                </p>
                                
                                {/* CTA Button */}
                                <Link 
                                    href="/todos"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                >
                                    <span className="text-2xl">✨</span>
                                    Buat Rencana Sekarang
                                    <span className="text-xl">→</span>
                                </Link>

                                {/* Stats Preview */}
                                <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
                                        <div className="text-sm text-gray-600 font-semibold">Total Rencana</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                                        <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                                        <div className="text-sm text-gray-600 font-semibold">Selesai</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
                                        <div className="text-4xl font-bold text-purple-600 mb-2">0%</div>
                                        <div className="text-sm text-gray-600 font-semibold">Progress</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-16">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
                                    <span className="w-2 h-10 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
                                    Quick Actions
                                    <span className="w-2 h-10 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></span>
                                </h2>
                                <p className="text-gray-600">Akses cepat ke fitur utama</p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                {quickActions.map((action, index) => (
                                    <Link
                                        key={index}
                                        href={action.link}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${action.color} text-white text-4xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                                {action.icon}
                                            </div>
                                            <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${action.color} bg-clip-text text-transparent`}>
                                                {action.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {action.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="mb-16">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
                                    <span className="w-2 h-10 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></span>
                                    Fitur Unggulan
                                    <span className="w-2 h-10 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></span>
                                </h2>
                                <p className="text-gray-600">Kenapa harus menggunakan aplikasi ini?</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgColor} text-4xl mb-5 group-hover:scale-110 transition-transform border-2 border-gray-100`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Motivational Quote */}
                        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-gray-100 text-center overflow-hidden relative">
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                            <div className="text-6xl mb-6">💡</div>
                            <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 italic">
                                "Rencana yang baik hari ini lebih baik daripada rencana sempurna besok"
                            </blockquote>
                            <p className="text-gray-600 text-lg">- George S. Patton</p>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-16 text-center">
                            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
                                <h3 className="text-3xl font-bold mb-4">Siap Memulai?</h3>
                                <p className="text-xl mb-8 opacity-90">Buat rencana pertama Anda dan mulai perjalanan produktivitas!</p>
                                <Link 
                                    href="/todos"
                                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                >
                                    <span className="text-2xl">🚀</span>
                                    Mulai Sekarang
                                    <span className="text-xl">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}