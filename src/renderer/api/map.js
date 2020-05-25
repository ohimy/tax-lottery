import request from '../utils/request'

export function fetchMapList(query) {
  return request({
    url: '/maps/tencent',
    method: 'get',
    params: query
  })
}
