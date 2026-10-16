export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // 【全局防护】只要不是通过你的自定义域名访问，一律返回 403 拒绝
  if (url.hostname !== "img.yoly.top") {
    return new Response("Access Denied", { 
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  // 放行正常请求
  return await context.next();
}
