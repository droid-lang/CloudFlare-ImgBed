// 自定义适配器通过请求上下文声明平台；Pages 使用原生 Functions 入口。
// 覆盖同名环境变量，避免用户配置将 Pages/Workers 误判为 Node。
// 【本地定制】叠加域名防盗链：非 img.yoly.top 一律 403。
export async function onRequest(context) {
    const runtime = context.data?.serverRuntime;
    context.env.SERVER_RUNTIME = runtime === 'node' || runtime === 'worker' ? runtime : 'pages';

    // 单元测试构造的 context 不带 request，此时跳过域名校验，避免误伤测试。
    if (context.request && context.request.url) {
        const url = new URL(context.request.url);
        if (url.hostname !== 'img.yoly.top') {
            return new Response('Access Denied', {
                status: 403,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        }
    }

    return await context.next();
}
