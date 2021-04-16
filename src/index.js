import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Tabs } from './components';
const telTtabs = [
  {
    title: <span>全部</span>,
    key: '',
    hot: true,
  },
  { title: <span>极重要</span>, key: '2', hot: false },
  { title: <span>重要</span>, key: '1', hot: false },
  { title: <span>普通</span>, key: '0', hot: false },
];
const App = () => {
  return (
    <div>
      <Tabs   tabs={telTtabs}>
      </Tabs>
    </div>
  )
}

ReactDOM.render(
  <App />
  ,
  document.getElementById('root')
);

