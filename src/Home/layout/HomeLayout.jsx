import { Footer, Navbar } from "../components"



export const HomeLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
