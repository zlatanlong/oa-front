import React, { useEffect } from 'react';
import http from '../../utils/axios';

const Index = () => {
  useEffect(() => {
    http.get('/user/test').then(
      res => { console.log(res) }
    ).catch(err => { console.log(err) })
  }, []);


  return (
    <div>
      <h1>基本</h1>
    </div>
  );
}

export default Index;
