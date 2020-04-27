import React, { useEffect, useState } from 'react';
import { Tag, Card } from 'antd';
import moment from 'moment';
import http from '../../utils/axios';

const TeamJoined = () => {
  const [teams, setTeams] = useState([]);

  const getJoinedTeams = () => {
    http
      .post('/team/joinedList')
      .then(res => {
        if (res.data.code === 0) {
          setTeams(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getJoinedTeams();
  }, []);

  return (
    <Card title='我的小组'>
      {teams.map(team => (
        <Tag key={team.id} style={{ margin: '1rem' }}>{`组名: ${
          team.teamName
        } 创建时间: ${moment(team.createTime).format('YYYY年M月D日')}`}</Tag>
      ))}
    </Card>
  );
};

export default TeamJoined;
