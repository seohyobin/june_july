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
    // WrapComponent.use(
    //     "/asp",
    //     createProxyMiddleware({
    //         target:"http://localhost:8080",
    //         changeOrigin:true
    //     })
    // )
}