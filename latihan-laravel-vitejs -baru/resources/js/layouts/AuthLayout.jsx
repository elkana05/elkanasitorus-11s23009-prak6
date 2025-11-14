import React from "react";

export default function AuthLayout({ title, description, children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="container mx-auto px-4 py-8">
                <div className="w-full max-w-[420px] mx-auto">
                    <div className="text-center mb-8">
                        {title && (
                            <h1 className="text-2xl font-bold text-gray-900">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-gray-500 mt-2">{description}</p>
                        )}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
