import { Outlet, ScrollRestoration } from "react-router-dom";
import Container from "./components/Container/Container";
import Nav from "./components/Nav/Nav";
import DisplayArea from "./components/DisplayArea/DisplayArea";

const App = () => {
  return (
    <div className="to flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-red-100">
      <Container>
        <Nav />
        <DisplayArea>
          <Outlet />
        </DisplayArea>
      </Container>

      <ScrollRestoration />
    </div>
  );
};

export default App;
