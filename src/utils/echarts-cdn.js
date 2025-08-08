// ECharts CDN 兼容层
// 当使用 CDN 时，echarts 是全局变量，需要做兼容处理

const echarts = window.echarts;

// 导出常用的 echarts 模块
export default echarts;
export { echarts };

// 模拟模块化的导出
export const use = echarts.use;
export const init = echarts.init;
export const connect = echarts.connect;
export const disconnect = echarts.disconnect;
export const dispose = echarts.dispose;
export const getInstanceByDom = echarts.getInstanceByDom;
export const registerTheme = echarts.registerTheme;
export const registerMap = echarts.registerMap;
