import Footer from "@/components/blocks/Footer"
import Header from "@/components/blocks/Header"

const HomeLayout = ({ children }) => {
    return (
        <>
            <Header/>
            <main className="w-full mt-5">
                { children }
            </main>
            <Footer/>
        </>
    )
}

export default HomeLayout