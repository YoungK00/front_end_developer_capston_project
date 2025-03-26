import './App.css';
import Header from "./components/Header";
import Nav from "./components/Nav";
import BookingPage from "./components/BookingPage";
import Landing from "./components/Landing";


function App() {
  const colors = { bg_green: "rgb(3, 255, 87)", bg_yello: "rgb(255, 208, 0)", bg_white: "rgb(255, 255, 255)" };

  return (
    <div className="container">
      <Header colors={colors}  /> 
      <main>
        <Landing />
        <BookingPage/>
      </main>
      <Nav/>
      <footer></footer>
    </div>
  );
}

export default App;
