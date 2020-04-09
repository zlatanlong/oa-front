import request from '../utils/request';

export function query() {
  return request('/api/users');
}


export function testCnode() {
  return request('https://cnodejs.org/api/v1/topics');
}

// 注册mock

export function testMock() {
  return request('/api/testMock');
}