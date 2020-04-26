import request from '../utils/request';
import http from '../utils/axios';

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

export function getUsers() {
  return http.post('/users');
}

getUsers().then(res => {});
