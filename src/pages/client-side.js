import ClientOnly from '@/components/ClientOnly';
import Properties from '@/components/Properties';

export default function ClientPage() {
    return (
        <main className="bg-slate-100 flex justify-center">
            <div className="w-3/6">
                <div className="flex justify-center mt-10 mb-6">
                    <h2 className="inline-block text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Rendered Client-Side
                    </h2>
                </div>
                <div>
                    <ClientOnly>
                        <Properties />
                    </ClientOnly>
                </div>
            </div>
        </main>
    );
}
