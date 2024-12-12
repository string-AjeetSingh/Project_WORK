

function Section1({ children1, children2, theFooter }) {
    return (
        <>
            <section style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#033404 #054b06'
            }}
                className="flex flex-row flex-nowrap 
            justify-center  
             h-screen min-h-[500px]">
                <div className={`h-full border border-black 
                ${children2 ? 'w-[35%]' : 'w-full'} m-1 
                ml-0 border-l-0 overflow-y-auto
                rounded-tr-2xl rounded-br-2xl`}>
                    {children1}
                    {theFooter}
                </div>

                {children2 ? <div className="h-full w-[65%] border 
                border-black  m-1 mr-0 border-r-0
                overflow-y-auto 
                rounded-tl-2xl rounded-bl-2xl">
                    {children2}
                </div>

                    : null}

            </section>
        </>
    );
}




export { Section1 };