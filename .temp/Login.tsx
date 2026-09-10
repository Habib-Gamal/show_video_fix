import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { appWindow } from "@tauri-apps/api/window";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = "https://km-editingschool.com/";
export default function Login() {
    
    appWindow.setContentProtected(true);
    const [data, setData] = React.useState({ email: "", password: "" });
    const navigate = useNavigate();
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get("/sanctum/csrf-cookie").then((_) => {
            axios.post<string>("/api/sanctum/token", data).then((res) => {
                // set Authorization Bearer token
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
                localStorage.setItem("token", res.data);
                navigate("/url");
            });
        });
    };

    useEffect(() => {
        document.oncontextmenu = (e) => {
            e.preventDefault();
        };
    }, []);
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto rounded-full" src="/guest_logo.jpg" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" onSubmit={submit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                value={data.email}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                value={data.password}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
