import React, { useState, useEffect } from 'react';
import http from '../../utils/axios';
import { connect } from 'dva';
import { Divider, Tree } from 'antd';

const ThingAddTag = ({ addThing, saveThingChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAvalibleTags();
  }, []);

  const getAvalibleTags = () => {
    http
      .post('/tag/tags')
      .then(res => {
        if (res.data.code === 0) {
          setTags(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleOnSelectTag = (selectedKeys, info) => {
    saveThingChange(selectedKeys[0], 'tagId');
  };

  return (
    <div>
      <h4>可选标签：</h4>
      {tags.length !== 0 && (
        <Tree
          defaultExpandAll
          treeData={tags}
          onSelect={handleOnSelectTag}
          selectedKeys={[addThing.tagId]}
        />
      )}
    </div>
  );
};

export default connect(({ addThing }) => ({ addThing }))(ThingAddTag);
