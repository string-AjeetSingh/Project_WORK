import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";
import { commonContext } from "../../MyLib/commonContext";

import { Section1, Section2, Section3 } from "./subComponents";

function HomeWithoutLogin({ children, login, logout, user }) {

    return (
        <>
            <header>
                <commonContext.Provider value={{ user }}>
                    <Header login={login} logout={logout}></Header>
                </commonContext.Provider>
            </header><hr className="border-[1px] 
     border-green-950"></hr>

            <main>

                <Section1 login={login}></Section1>
                <Section2 login={login}></Section2>
                <Section3 login={login}></Section3>

            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
}



export { HomeWithoutLogin };