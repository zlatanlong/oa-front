import React from 'react';
import BreadNav from '../../components/Frame/BreadNav';
import TagCreateCommon from './TagCreateCommon';

const TagEditPublic = () => {
  return (
    <div>
      <BreadNav navs={[{ url: '/tag/editpub', name: '创建公共标签' }]} />
      <TagCreateCommon isPublic={true} />
    </div>
  );
};

export default TagEditPublic;
