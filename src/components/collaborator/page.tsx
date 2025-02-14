import { Link } from "lucide-react"

export default function Collaborator() {
    return (
        <main>
            <h1> Add collaborator</h1>
            <div className="w-fit h-fit flex items-center justify-center gap-2">
                <input
                    type="text"
                    placeholder="Email or Name to add collaborator"
                    className="border border-gray-300 rounded-lg p-2"
                />
                <button className="bg-blue-400 text-white font-pryClr"> Invite </button>
            </div>
            <div>
                <button
                    className="bg-gray-500 border border-gray-400 text-white font-pryClr">
                    <Link size={18} />
                    Copy link
                </button>
            </div>

        </main>
    )
}