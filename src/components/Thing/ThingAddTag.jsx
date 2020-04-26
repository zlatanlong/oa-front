import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Tree } from 'antd';

const ThingAddTag = ({ addThing, dispatch, saveThingChange }) => {
  const handleOnSelectTag = (selectedKeys, info) => {
    saveThingChange(selectedKeys[0], 'tagId');
    saveThingChange(info.node.title, 'tagName');
  };

  useEffect(() => {
    if (addThing.tags.length === 0) {
      handleGetTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetTags = () => {
    dispatch({ type: 'addThing/getTags' });
  };

  return (
    <div>
      <h4>可选标签：</h4>
      {addThing.tags.length !== 0 && (
        <Tree
          defaultExpandAll
          treeData={addThing.tags}
          onSelect={handleOnSelectTag}
          selectedKeys={[addThing.tagId]}
        />
      )}
    </div>
  );
};

export default connect(({ addThing }) => ({ addThing }))(ThingAddTag);
