import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./layout/Layout";

// pages
import Home from "./pages/Home";
import Chairperson from "./pages/Chairperson";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <Layout>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/about" element={<Chairperson />} />
                    <Route element={<NotFound />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;