import { checkDatabaseConfig } from '../utils/middleware';

// 增加一个主机名校验函数
const checkDomain = async (context) => {
  const url = new URL(context.request.url);
  
  // 如果请求的主机名不是你的自定义域名，直接返回 403 拒绝
  if (url.hostname !== "img.yoly.top") {
    return new Response("Access Denied", { 
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
  
  // 校验通过，放行到下一个中间件
  return await context.next();
};

// 将 checkDomain 加入到中间件执行队列中（放在最前面优先拦截）
export const onRequest = [checkDomain, checkDatabaseConfig];
