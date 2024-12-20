

function Header({ children }) {
    return (
        <>
            <div className="flex flex-row flex-wrap  justify-between">

                <div className="flex flex-row  justify-between items-center ">
                    <div className="flex flex-row justify-center items-end   m-1 p-1">
                        <div className="text-green-800 text-4xl 
                        font-serif font-bold">W</div>
                        <div className="text-2xl font-serif mr-1">ORK</div>
                    </div>
                    <img className="size-9" src="./logo.png" alt="Logo" />
                </div>
                {/* Above fist side of the nav */}

                <div className="flex flex-row items-center">
                    <button className="m-1 font-serif text-[1rem] rounded-md
                    border-[2px] hover:bg-green-800 active:bg-green-900
                     text-blue-300
                      border-green-950 p-1">
                        Jobs
                    </button>
                    <div>
                            <input className="rounded-md font-serif bg-transparent 
                          bg-green-950 border-[2px] border-green-950
                        placeholder-blue-300 text-blue-300
                        text-[1rem] p-1 m-1  hover:bg-green-800
                         focus:bg-green-800" 
                        type="search" placeholder=" Search Jobs"></input>
                    </div>
                    <button className="size-9 border-none rounded-full 
                        bg-cyan-700 m-1 mr-1">
                     
                    </button>
                </div>


            </div>
        </>
    );
}

export { Header };