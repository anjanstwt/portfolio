import ComponentsDisplay from "@/components/interactions/Display/ComponentsDisplay";
import Sidebar from "@/components/interactions/Sidebar/Sidebar";


export default function Interactions() {
    return (
        <div className="h-screen bg-ink flex p-4 gap-x-4 ">
            <Sidebar />
            <ComponentsDisplay />
        </div>
    )
}