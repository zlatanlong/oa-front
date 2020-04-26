import React, { useEffect } from 'react';
import { connect } from 'dva';
import UserSearchResult from '../UserSearchResult';
import { Switch, Divider, Tag } from 'antd';
import style from './thing.css';

const ThingAddUsers = ({ addThing, saveThingChange, dispatch }) => {
  useEffect(() => {
    if (addThing.teams.length === 0) {
      handleGetTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetTags = () => {
    dispatch({ type: 'addThing/getTeams' });
  };

  const handleSwitch = checked => {
    saveThingChange(checked, 'userTeam');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span className={style.boldFont}>是否使用小组选人？</span>
        <Switch
          checked={addThing.userTeam}
          onChange={handleSwitch}
          style={{ margin: '0 4px' }}
        />
        <span style={{ color: 'red' }}>只能选择一种确定接受者的方式</span>
      </div>
      <Divider style={{ margin: '1rem 0' }} />
      {addThing.userTeam &&
        addThing.teams.length > 0 &&
        addThing.teams.map(team => {
          return (
            <Tag
              key={team.id}
              onClick={() => {
                saveThingChange(team.id, 'teamId');
                saveThingChange(team.teamName, 'teamName');
              }}
              color={team.id === addThing.teamId ? 'blue' : ''}
              style={{ margin: '1rem' }}>
              {team.teamName}
            </Tag>
          );
        })}
      {!addThing.userTeam && (
        <UserSearchResult
          getSelectIds={keys => {
            saveThingChange(keys, 'receiverIds');
          }}
          saveState={true}
        />
      )}
    </div>
  );
};

export default connect(({ addThing }) => ({ addThing }))(ThingAddUsers);
