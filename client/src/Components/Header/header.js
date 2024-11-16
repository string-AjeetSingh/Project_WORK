

function Header({ children }) {
    return (
        <>
            <div className="flex flex-row  justify-between">

                <div className="flex flex-row  justify-between items-center ">
                    <div className="flex flex-row justify-center items-end   m-1 p-1">
                        <div className="text-green-800 text-4xl font-serif">W</div>
                        <div className="text-2xl font-serif mr-1">ORK</div>
                    </div>
                    <img className="size-9" src="./logo.png" alt="Logo" />
                </div>
                {/* Above fist side of the nav */}

                <div className="flex flex-row items-center">
                    <div className="m-1 font-serif text-[1rem] rounded-md
                     border-[1px] bg-green-950 border-green-950 p-1">
                        Jobs
                    </div>
                    <div>
                        <input className="rounded-md font-serif bg-transparent 
                          bg-green-950
                        placeholder-slate-300 text-slate-300
                        text-[1rem] p-1 m-1" 
                        type="search" placeholder=" Search Jobs"></input>
                    </div>
                </div>


            </div>
        </>
    );
}

export { Header };