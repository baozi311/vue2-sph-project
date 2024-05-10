import Mock from "mockjs";
import banner from './data/banner.json'
import floor from './data/floor.json'

// 发送请求到：'/mock/banner' 。 返回：{ code: 200, data: banner }
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })


