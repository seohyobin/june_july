const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports =(WrapComponent)=>{
    WrapComponent.use(  
        "/signup_db",
        createProxyMiddleware({
            "target":"http://luck1409.dothome.co.kr",
            changeOrigin:true
        })
    )
    WrapComponent.use(
        "/JSP",
        createProxyMiddleware({
            "target":"http://localhost:8080",
            changeOrigin:true
        })
    )
    WrapComponent.use(
        "/bbs",
        createProxyMiddleware({
            "target":"http://localhost:8080",
            changeOrigin:true
        })
    )

    WrapComponent.use(
        "/public",
        createProxyMiddleware({
            "target":"http://127.0.0.1:5500",
            changeOrigin:true
        })
    )

}