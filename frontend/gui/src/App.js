import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ProjectList from './containers/ProjectListView';
import CustomLayout from './containers/Layout';
import BaseRouter from './routes'

function App() {
  return (
    <div className="App">
      <Router>
        <CustomLayout>
          <BaseRouter />
        </CustomLayout>
      </Router>

    </div>
  );
}

export default App;
