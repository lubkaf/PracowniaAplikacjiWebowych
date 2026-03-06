import {BrowserRouter, Route, Routes} from "react-router";

import Home from "./routes/Homepage/home.jsx";
import Site_post from "./routes/Posts/site_post.jsx";
import Site_categories from "./routes/Categories/site_categories.jsx";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/wpis" element={<Site_post />} />
                <Route path="/kategorie" element={<Site_categories />} />
            </Routes>
        </BrowserRouter>
    )
}