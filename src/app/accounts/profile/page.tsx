"use client";

import Image from "next/image";
import { useState } from "react";

export default function Accounts({ src }: { src?: string }) {
    const [imageSrc, setImageSrc] = useState(src || "/profile-pic.jpg");
    const [error, setError] = useState(false); // Track image load errors

    return (
        <button className="w-fit h-fit border border-shadow shadow-sm rounded-full">
            {error ? (
                // ✅ Use <img> instead of <image>
                <img
                    src={imageSrc}
                    alt="User profile picture"
                    height={50}
                    width={50}
                    className="rounded"
                />
            ) : (
                <Image
                    src={imageSrc}
                    alt="User profile picture"
                    height={50}
                    width={50}
                    onError={() => setError(true)} // Switch to <img> on error
                    className="rounded"
                />
            )}
        </button>
    );
}
