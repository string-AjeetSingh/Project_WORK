import { Header } from "../Header/header";
import { Footer } from "../Footer/footer";

import { Section1, Section2, Section3} from "./subComponents";

function HomeWithoutLogin({ children }) {

    return (
        <>
            <header>
                <Header></Header>
            </header><hr className="border-[1px] 
     border-green-950"></hr>

            <main>

                <Section1></Section1>
                <Section2></Section2>
                <Section3></Section3>

            </main>

            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
}



export { HomeWithoutLogin };