"use client";

import Image from "next/image";
import {useState} from "react";

export default function Accounts({src, alt}: {src?: string, alt?: string}) {
    const [ImageSrc, setImageSrc] = useState(src || "/profile-pic.jpg")
    return (
        <button className="w-fit h-fit border border-shadow shadow-sm rounded-full">
            <Image
                src={ImageSrc}
                alt={alt || "Default placeholder image for account"}
                height={50}
                width={50}
                onError={() => setImageSrc("/profile-pic.jpg")}
                className="rounded"
            />
        </button>
    )
}