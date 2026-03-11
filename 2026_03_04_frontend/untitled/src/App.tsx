import Header from './components/header'
import Footer from "./components/footer";
import {Route, Routes} from "react-router";
import Posts from "./scenes/posts";
import Post from "./scenes/post";
import Home from "./scenes/home";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router";
import "./index.scss"


export default function App() {
    return (
        <>
            <QueryClientProvider client={new QueryClient()}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/post/:id" element={<Post/>}/>
                        <Route path="/posts" element={<Posts/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}
