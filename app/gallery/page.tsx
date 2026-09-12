import Block from "@/components/ui/Block";

export default function Gallery() {
    return (
        <body className="h-screen w-screen bg-ink">
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="grid grid-cols-7 grid-rows-8 h-140 w-250 gap-3">
                    <Block className="col-span-2 row-span-4 rounded-2xl "></Block>
                    <Block className="col-span-2 row-span-5  rounded-2xl "></Block>
                    <Block className="col-span-3 row-span-4  rounded-2xl "></Block>
                    <Block className="col-span-2 row-span-1 rounded-2xl "></Block>
                    <Block className="col-span-3 row-span-1 rounded-2xl "></Block>
                    
                    {/*bottom*/}
                    <Block className="col-span-2 row-span-3 rounded-2xl "></Block>
                    <Block className="col-span-2 row-span-3 rounded-2xl "></Block>
                    <Block className="col-span-3 row-span-3 rounded-2xl "></Block>
                </div>
            </div>
        </body>
    );
}
