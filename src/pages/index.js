import Link from 'next/link';

export default function Home() {
    return (
        <main className="bg-slate-100 flex justify-center">
            <div className="w-3/6">
                <div className="flex justify-center mt-10 mb-6">
                    <h2 className="inline-block text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Rendering Modes
                    </h2>
                </div>
                <div>
                    <ul>
                        <Link href="/client-side">
                            <li className="bg-white rounded-md border border-slate-200/75 my-2 p-4 leading-normal">
                                Client-side rendering
                            </li>
                        </Link>
                        <Link href="/server-side">
                            <li className="bg-white rounded-md border border-slate-200/75 my-2 p-4 leading-normal">
                                Server-side rendering
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </main>
    );
}
