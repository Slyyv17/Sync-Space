import Image from "next/image";

export default function Navigation() {
    return (
        <div className="w-full h-fit p-2 flex justify-between items-center">
            <Image
                src="/sync-space logo.png"
                alt="SyncSpace Logo"
                height={50}
                width={50}
            >
            </Image>
        </div>
    )
}