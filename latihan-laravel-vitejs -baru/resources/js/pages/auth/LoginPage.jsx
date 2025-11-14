import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon, MailIcon, LockIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    // Ambil data dari controller Laravel
    const { success } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        post("/auth/login/post");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl lg:grid lg:grid-cols-2">
                <div className="hidden lg:block bg-primary text-white p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold">
                        Selamat Datang Kembali!
                    </h2>
                    <p className="mt-4 text-primary-foreground/80">
                        Masuk untuk melanjutkan produktivitas Anda dan kelola
                        semua tugas Anda di Mathsel.
                    </p>
                </div>
                <div className="bg-white p-8 sm:p-12">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="text-center lg:text-left px-0">
                            <CardTitle className="text-3xl font-bold">
                                Masuk
                            </CardTitle>
                            <CardDescription>
                                Masukkan detail akun Anda di bawah.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-0">
                            {success && (
                                <Alert variant="success" className="mb-4">
                                    <CheckCircle2Icon className="h-4 w-4" />
                                    <AlertTitle>
                                        Pendaftaran Berhasil!
                                    </AlertTitle>
                                    <AlertDescription>
                                        {success}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                        {processing ? "Memproses..." : "Masuk"}
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/auth/register">
                                            Belum punya akun? Daftar di sini
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
