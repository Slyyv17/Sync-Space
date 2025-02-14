import Link from "next/link"
import {
    ListFilter,
    CalendarDays,
    UserPlus
}
    from "lucide-react"

export default function Navigation() {
    return (
        <nav className="w-full h-fit bg-transparent shadow-shadow shadow-sm">
            <ul className="flex justify-start items-center p-4 gap-2">
                <li className="list-none">
                    <button className="py-2 px-2 bg-mainClr shadow-sm shadow-shadow rounded-full">
                        <Link href="">
                            <ListFilter size={24} />
                        </Link>
                    </button>
                </li>

                <li>
                    <button className="py-2 px-2 bg-mainClr shadow-sm shadow-shadow rounded-full">
                        <Link href="">
                            <CalendarDays size={24} />
                        </Link>
                    </button>
                </li>

                <li>
                    <button className="py-2 px-2 bg-mainClr shadow-sm shadow-shadow rounded-full">
                        <Link href="">
                            <UserPlus size={24} />
                        </Link>
                    </button>
                </li>
            </ul>
        </nav>
    )
}