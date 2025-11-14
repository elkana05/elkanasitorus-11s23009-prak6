import React, { useEffect, useState, useRef } from "react";
import AppLayout from "@/layouts/AppLayout";
import { usePage, router, Link } from "@inertiajs/react";
import Chart from "react-apexcharts";

export default function TodosPage({ todos: initialTodos, filters }) {
    const { props } = usePage();
    const todos = initialTodos;

    const [search, setSearch] = useState(filters?.search || "");
    const [isFinishedFilter, setIsFinishedFilter] = useState(
        filters?.is_finished ?? ""
    );

    const [form, setForm] = useState({
        title: "",
        description: "",
        cover: null,
        is_finished: false,
    });
    const [editingId, setEditingId] = useState(null);
    const [stats, setStats] = useState({ finished: 0, notFinished: 0 });
    const [chartKey, setChartKey] = useState(0); // Force re-render chart

    const fetchAndRenderStats = () => {
        fetch("/todos/stats")
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data) => {
                setStats(data);
                setChartKey((prev) => prev + 1); // Trigger re-render
            })
            .catch((err) => console.error("Error fetching stats:", err));
    };

    useEffect(() => {
        // fetch and render whenever todos change or on mount
        fetchAndRenderStats();
    }, [todos]);

    function submitSearch(e) {
        e.preventDefault();
        router.get(
            "/todos",
            { search, is_finished: isFinishedFilter },
            { preserveState: true }
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("is_finished", form.is_finished ? 1 : 0);
        if (form.cover) fd.append("cover", form.cover);

        if (editingId) {
            router.post(`/todos/${editingId}?_method=PUT`, fd, {
                onSuccess: (page) => {
                    setEditingId(null);
                    setForm({
                        title: "",
                        description: "",
                        cover: null,
                        is_finished: false,
                    });

                    if (window.Swal)
                        window.Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Todo diubah",
                        });
                },
                onError: () => {
                    if (window.Swal)
                        window.Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: "Gagal mengubah todo",
                        });
                },
            });
        } else {
            router.post("/todos", fd, {
                onSuccess: () => {
                    setForm({
                        title: "",
                        description: "",
                        cover: null,
                        is_finished: false,
                    });
                    if (window.Swal)
                        window.Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Todo ditambahkan",
                        });
                },
                onError: () => {
                    if (window.Swal)
                        window.Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: "Gagal menambah todo",
                        });
                },
            });
        }
    }

    function handleDelete(id) {
        if (window.Swal) {
            window.Swal.fire({
                title: "Hapus?",
                text: "Apakah Anda yakin ingin menghapus todo ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, hapus",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.delete(`/todos/${id}`, {
                        onSuccess: () => {
                            window.Swal.fire({
                                icon: "success",
                                title: "Terhapus",
                                text: "Todo berhasil dihapus",
                            });
                        },
                        onError: () => {
                            window.Swal.fire({
                                icon: "error",
                                title: "Gagal",
                                text: "Gagal menghapus todo",
                            });
                        },
                    });
                }
            });
        } else {
            if (!confirm("Hapus todo ini?")) return;
            router.delete(`/todos/${id}`);
        }
    }

    function startEdit(todo) {
        setEditingId(todo.id);
        setForm({
            title: todo.title || "",
            description: todo.description || "",
            cover: null,
            is_finished: !!todo.is_finished,
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setForm({
            title: "",
            description: "",
            cover: null,
            is_finished: false,
        });
    }

    return (
        <AppLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-10 text-center">
                            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                                Dasbor Rencana Anda
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Kelola semua rencana dan target Anda dengan
                                mudah.
                            </p>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                            {/* Stats Cards */}
                            <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></span>
                                    Statistik Rencana
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                                        <div className="text-4xl font-bold mb-1">
                                            {stats.finished + stats.notFinished}
                                        </div>
                                        <div className="text-sm text-blue-100">
                                            Total Rencana
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                                        <div className="text-4xl font-bold mb-1">
                                            {stats.finished}
                                        </div>
                                        <div className="text-sm text-emerald-100">
                                            Selesai
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                                        <div className="text-4xl font-bold mb-1">
                                            {stats.notFinished}
                                        </div>
                                        <div className="text-sm text-amber-100">
                                            Belum Selesai
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                                        <div className="text-4xl font-bold mb-1">
                                            {stats.finished +
                                                stats.notFinished >
                                            0
                                                ? `${Math.round(
                                                      (stats.finished /
                                                          (stats.finished +
                                                              stats.notFinished)) *
                                                          100
                                                  )}%`
                                                : "0%"}
                                        </div>
                                        <div className="text-sm text-violet-100">
                                            Penyelesaian
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart ApexCharts */}
                            <div className="w-full">
                                <div className="shadow-xl rounded-3xl bg-white p-8 border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-800 mb-6">
                                        📊 Diagram Batang Statistik
                                    </h3>
                                    {stats.finished + stats.notFinished > 0 ? (
                                        <div
                                            key={chartKey}
                                            className="flex flex-col gap-8"
                                        >
                                            {/* Bar Chart - Stacked */}
                                            <Chart
                                                type="bar"
                                                series={[
                                                    {
                                                        name: "Selesai",
                                                        data: [stats.finished],
                                                    },
                                                    {
                                                        name: "Belum Selesai",
                                                        data: [
                                                            stats.notFinished,
                                                        ],
                                                    },
                                                ]}
                                                options={{
                                                    chart: {
                                                        type: "bar",
                                                        stacked: true,
                                                        stackType: "100%",
                                                        toolbar: {
                                                            show: true,
                                                            tools: {
                                                                download: true,
                                                                selection: true,
                                                                zoom: true,
                                                                zoomin: true,
                                                                zoomout: true,
                                                                pan: true,
                                                                reset: true,
                                                            },
                                                        },
                                                    },
                                                    colors: [
                                                        "#10B981",
                                                        "#F59E0B",
                                                    ],
                                                    plotOptions: {
                                                        bar: {
                                                            horizontal: false,
                                                            columnWidth: "55%",
                                                            borderRadius: 4,
                                                            dataLabels: {
                                                                position: "top",
                                                            },
                                                        },
                                                    },
                                                    dataLabels: {
                                                        enabled: true,
                                                        formatter: (val) =>
                                                            `${Math.round(
                                                                val
                                                            )}%`,
                                                        offsetY: -25,
                                                        style: {
                                                            fontSize: "13px",
                                                            fontWeight: "bold",
                                                        },
                                                    },
                                                    xaxis: {
                                                        categories: [
                                                            "Status Rencana",
                                                        ],
                                                        labels: {
                                                            style: {
                                                                fontSize:
                                                                    "12px",
                                                                fontWeight:
                                                                    "600",
                                                            },
                                                        },
                                                    },
                                                    yaxis: {
                                                        labels: {
                                                            formatter: (val) =>
                                                                `${Math.round(
                                                                    val
                                                                )}%`,
                                                            style: {
                                                                fontSize:
                                                                    "12px",
                                                            },
                                                        },
                                                    },
                                                    tooltip: {
                                                        y: {
                                                            formatter: (val) =>
                                                                `${Math.round(
                                                                    val
                                                                )}%`,
                                                        },
                                                    },
                                                    legend: {
                                                        position: "top",
                                                        horizontalAlign: "left",
                                                        fontSize: "13px",
                                                        fontWeight: 600,
                                                    },
                                                }}
                                                height={350}
                                            />

                                            {/* Pie Chart */}
                                            <Chart
                                                type="pie"
                                                series={[
                                                    stats.finished,
                                                    stats.notFinished,
                                                ]}
                                                options={{
                                                    chart: {
                                                        type: "pie",
                                                        toolbar: {
                                                            show: true,
                                                        },
                                                    },
                                                    colors: [
                                                        "#10B981",
                                                        "#F59E0B",
                                                    ],
                                                    labels: [
                                                        `Selesai (${stats.finished})`,
                                                        `Belum Selesai (${stats.notFinished})`,
                                                    ],
                                                    dataLabels: {
                                                        enabled: true,
                                                        formatter: (val) =>
                                                            `${Math.round(
                                                                val
                                                            )}%`,
                                                        style: {
                                                            fontSize: "12px",
                                                            fontWeight: "bold",
                                                        },
                                                    },
                                                    legend: {
                                                        position: "bottom",
                                                        fontSize: "13px",
                                                        fontWeight: 600,
                                                    },
                                                    tooltip: {
                                                        y: {
                                                            formatter: (val) =>
                                                                `${val} items`,
                                                        },
                                                    },
                                                }}
                                                height={300}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p className="text-lg">
                                                📭 Belum ada data rencana
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></span>
                                Pencarian & Filter
                            </h3>
                            <form
                                onSubmit={submitSearch}
                                className="flex flex-col md:flex-row gap-4"
                            >
                                <div className="flex-1">
                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-base bg-gray-50 focus:bg-white"
                                        placeholder="🔍 Cari judul atau catatan..."
                                    />
                                </div>
                                <div className="w-full md:w-64">
                                    <select
                                        value={isFinishedFilter}
                                        onChange={(e) =>
                                            setIsFinishedFilter(e.target.value)
                                        }
                                        className="w-full h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-base bg-gray-50 focus:bg-white"
                                    >
                                        <option value="">
                                            📋 Semua Status
                                        </option>
                                        <option value="1">✅ Selesai</option>
                                        <option value="0">
                                            ⏳ Belum Selesai
                                        </option>
                                    </select>
                                </div>
                                <button className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 h-14 rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all font-semibold text-base shadow-lg hover:shadow-xl">
                                    Cari
                                </button>
                            </form>
                        </div>

                        {/* Create/Edit Form */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <span className="w-3 h-10 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-4"></span>
                                {editingId
                                    ? "✏️ Edit Rencana"
                                    : "✨ Tambah Rencana Baru"}
                            </h3>
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                className="space-y-6"
                            >
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Judul Rencana
                                        </label>
                                        <input
                                            placeholder="Masukkan judul rencana Anda..."
                                            value={form.title}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-base bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Catatan Detail
                                        </label>
                                        <textarea
                                            placeholder="Masukkan catatan detail rencana Anda..."
                                            value={form.description}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    description: e.target.value,
                                                })
                                            }
                                            rows={6}
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-base bg-gray-50 focus:bg-white resize-y"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Cover Image
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        cover: e.target
                                                            .files[0],
                                                    })
                                                }
                                                className="w-full h-14 px-6 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-6 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white file:font-semibold hover:file:from-indigo-700 hover:file:to-purple-700 file:transition-all cursor-pointer"
                                            />
                                            {form.cover && (
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                                                    ✓ File dipilih
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                                    <label className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-2xl cursor-pointer transition-all border-2 border-gray-200">
                                        <input
                                            type="checkbox"
                                            checked={form.is_finished}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    is_finished:
                                                        e.target.checked,
                                                })
                                            }
                                            className="w-6 h-6 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        />
                                        <span className="font-bold text-gray-700 text-base">
                                            ✅ Tandai sebagai selesai
                                        </span>
                                    </label>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all font-bold shadow-lg hover:shadow-xl text-base"
                                        >
                                            {editingId
                                                ? "💾 Simpan Perubahan"
                                                : "➕ Tambah Rencana"}
                                        </button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-all font-bold border-2 border-gray-200 text-base"
                                            >
                                                ❌ Batal
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Todos List */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="p-6 border-b-2 border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                    <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></span>
                                    Daftar Rencana
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                        <tr>
                                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                No
                                            </th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Judul
                                            </th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Catatan
                                            </th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Cover
                                            </th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {todos.data.map((t, idx) => {
                                            const perPage =
                                                (todos.meta &&
                                                    todos.meta.per_page) ||
                                                20;
                                            const currentPage =
                                                (todos.meta &&
                                                    todos.meta.current_page) ||
                                                1;
                                            const number =
                                                (currentPage - 1) * perPage +
                                                idx +
                                                1;

                                            return (
                                                <tr
                                                    key={t.id}
                                                    className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-5">
                                                        <div className="font-bold text-gray-900 text-base">
                                                            {number}
                                                        </div>
                                                    </td>

                                                    <td className="px-8 py-5">
                                                        <div className="font-bold text-gray-900 text-base">
                                                            {t.title}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="text-sm text-gray-600 whitespace-pre-wrap">
                                                            {t.description ||
                                                                "—"}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        {t.cover ? (
                                                            <img
                                                                src={
                                                                    t.cover_url
                                                                }
                                                                alt={`Cover untuk ${t.title}`}
                                                                className="h-24 w-24 object-cover rounded-2xl shadow-md border-2 border-gray-100"
                                                            />
                                                        ) : (
                                                            <div className="h-24 w-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-2xl">
                                                                🖼️
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span
                                                            className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                                                                t.is_finished
                                                                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                                                                    : "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                                                            }`}
                                                        >
                                                            {t.is_finished
                                                                ? "✓ Selesai"
                                                                : "⏳ Belum"}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() =>
                                                                    startEdit(t)
                                                                }
                                                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-all font-bold text-sm border-2 border-blue-200"
                                                            >
                                                                ✏️ Edit
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        t.id
                                                                    )
                                                                }
                                                                className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2.5 rounded-xl transition-all font-bold text-sm border-2 border-red-200"
                                                            >
                                                                🗑️ Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5 border-t-2 border-gray-100">
                                {todos.meta && (
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-bold text-gray-700">
                                            Halaman {todos.meta.current_page}{" "}
                                            dari {todos.meta.last_page}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {todos.meta.links.map(
                                                (link, idx) => {
                                                    const handleClick = () => {
                                                        if (!link.url) return;
                                                        // Convert absolute URL to relative path for router.get
                                                        const rel = new URL(
                                                            link.url,
                                                            window.location.origin
                                                        ).href.replace(
                                                            window
                                                                .location
                                                                .origin,
                                                            ""
                                                        );
                                                        router.get(rel);
                                                    };

                                                    return (
                                                        <button
                                                            key={idx}
                                                            disabled={!link.url}
                                                            onClick={
                                                                handleClick
                                                            }
                                                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                                                link.active
                                                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                                                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                                                            } ${
                                                                !link.url
                                                                    ? "opacity-40 cursor-not-allowed"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <span
                                                                dangerouslySetInnerHTML={{
                                                                    __html: link.label,
                                                                }}
                                                            />
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
