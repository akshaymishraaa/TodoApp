import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <Todo/>
    </div>
  );
}

export default App;
