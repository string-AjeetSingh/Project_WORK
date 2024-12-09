


function Buttons({ children, onClick }) {
    return (
        <>
            <button className="m-1 font-serif text-[1rem] rounded-md
                    border-[2px] hover:bg-green-800 active:bg-green-900
                     text-blue-300
                      border-green-950 p-1"
            >{children}</button>
        </>
    );
}


function Footer({ children }) {
    return (
        <>
            <div className="flex flex-col justify-center items-center
        flex-wrap m-2">
                <div className="flex flex-row  flex-wrap ">
                    <Buttons>Terms</Buttons>
                    <Buttons>Privacy</Buttons>
                    <Buttons>Contribute</Buttons>
                    <Buttons>Be A Member</Buttons>
                </div>
                <img className="w-[50%] opacity-50 rotate-90 "
                    src="./stock/tree.png" alt="stock img">

                </img>
            </div>
        </>
    );
}


export { Footer };