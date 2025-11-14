import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldGroup,
    FieldError,
} from "@/components/ui/field";
import { UserIcon, MailIcon, LockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useForm } from "@inertiajs/react";

export default function RegisterPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/register/post", {
            onSuccess: () => {
                // Redirect ke halaman login setelah pendaftaran berhasil
                reset("name", "email", "password", "password_confirmation");
            },
            onError: () => {
                // Reset field password jika ada error
                reset("password", "password_confirmation");
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl lg:grid lg:grid-cols-2">
                <div className="hidden lg:block bg-primary text-white p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">Satu Langkah Lagi...</h2>
                    <p className="mt-4 text-primary-foreground/80">
                        Buat akun untuk mulai mengorganisir tugas dan mencapai
                        tujuan Anda bersama Mathsel.
                    </p>
                </div>
                <div className="bg-white p-8 sm:p-12">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="text-center lg:text-left px-0">
                            <CardTitle className="text-3xl font-bold">
                                Buat Akun
                            </CardTitle>
                            <CardDescription>
                                Lengkapi data di bawah untuk memulai perjalanan
                                produktif Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-0">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        Nama Lengkap
                                    </FieldLabel>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Masukkan nama lengkap"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                    <FieldError>{errors.name}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <div className="relative">
                                        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="contoh@email.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                    <FieldError>{errors.email}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Kata Sandi
                                    </FieldLabel>
                                    <div className="relative">
                                        <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Masukkan kata sandi"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                    <FieldError>{errors.password}</FieldError>
                                </Field>
                                <div className="flex flex-col gap-4 pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        {processing ? "Memproses..." : "Daftar"}
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/auth/login">
                                            Sudah punya akun? Masuk di sini
                                        </Link>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
