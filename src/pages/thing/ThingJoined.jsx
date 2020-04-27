import React, { useEffect } from 'react';
import http from '../../utils/axios';

const ThingJoined = ({ match }) => {
  useEffect(() => {
    getThingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThingInfo = () => {
    http
      .post('/thing/joined/get', {
        id: match.params.id
      })
      .then(res => {
        if (res.data.code === 0) {
          console.log('res.data.data', res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return <div>thingjoined</div>;
};

export default ThingJoined;
