


function Buttons({ children, handleClick }) {
    return (
        <>
            <button onClick={handleClick} className="m-1 text-[1rem] rounded-md
                    border-[2px] hover:bg-green-800 active:bg-green-900
                     text-green-200
                      border-green-800 p-1"
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
                    <Buttons handleClick={() => {
                        alert("Web site is only for practise and project, not commercial yet. No Terms Provided");
                    }}>Terms</Buttons>
                    <Buttons handleClick={() => {
                        alert("Web site is only for practise and project, not commercial yet. No Privacy Provided");
                    }}>Privacy</Buttons>
                    <Buttons handleClick={() => {
                        alert("Web site is only for practise and project, not commercial yet. No Contribution Needed");
                    }}>Contribute</Buttons>
                    <Buttons handleClick={() => {
                        alert("Web site is only for practise and project, not commercial yet. Enable to make you member");
                    }}>Be A Member</Buttons>
                </div>
                <img className="w-[50%] opacity-50 rotate-90 "
                    src="/stock/tree.png" alt="stock img">

                </img>
            </div>
        </>
    );
}


export { Footer };