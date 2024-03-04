import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainContent from "./components/MainContent";
import MainPage from "./components/MainPage";
import ImageDetail from "./components/ImageDetail";
import ImageManager from "./components/ImageManager";
import AddNewImage from "./components/AddNewImage";
import UpdateUserProfile from "./components/UpdateUserProfile";

function App() {
  return (
    <div className="App container mx-auto">
      <MainContent />
      <Login />
      <SignUp />
      <MainPage/>
      <ImageDetail/>
      <ImageManager/>
      <AddNewImage/>
      <UpdateUserProfile/>
    </div>
  );
}

export default App;
