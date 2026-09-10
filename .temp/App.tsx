import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
function App() {
    
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    async function greet() {
        const decryptedUrl = (await invoke("decrypt_command", { url })) as string;
        if (decryptedUrl.includes("Error")) return;
        navigate("/video?url=" + decryptedUrl);
    }
    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-24 rounded-full w-auto"
                    src="/guest_logo.jpg"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Ready to watch?
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    action="#"
                    onSubmit={(e) => {
                        e.preventDefault();
                        greet();
                    }}
                >
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                            Video Link
                        </label>
                        <div className="mt-2 flex gap-2">
                            <input
                                id="url"
                                name="url"
                                type="text"
                                autoComplete="url"
                                value={url}
                                onChange={(e) => setUrl(e.currentTarget.value)}
                                placeholder="Enter a link"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    navigator.clipboard.readText().then((text) => setUrl(text));
                                }}
                                className="rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            >
                                Paste
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                            Go
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
