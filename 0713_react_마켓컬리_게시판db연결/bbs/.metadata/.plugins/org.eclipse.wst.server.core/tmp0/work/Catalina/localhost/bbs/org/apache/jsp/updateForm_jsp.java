/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.73
 * Generated at: 2023-07-13 07:48:17 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import bbs.BbsDAO;
import bbs.BbsDTO;

public final class updateForm_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.HashSet<>();
    _jspx_imports_classes.add("bbs.BbsDAO");
    _jspx_imports_classes.add("bbs.BbsDTO");
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    if (!javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      final java.lang.String _jspx_method = request.getMethod();
      if ("OPTIONS".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        return;
      }
      if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method)) {
        response.setHeader("Allow","GET, HEAD, POST, OPTIONS");
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSP들은 오직 GET, POST 또는 HEAD 메소드만을 허용합니다. Jasper는 OPTIONS 메소드 또한 허용합니다.");
        return;
      }
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("    \r\n");
      out.write("\r\n");
      out.write("\r\n");

	request.setCharacterEncoding("UTF-8");

      out.write(" \r\n");
      out.write("    \r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"UTF-8\">\r\n");
      out.write("<title>Insert title here</title>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\r\n");

String userId = null;
if(session.getAttribute("userId")!=null){             // 세션값이 비어있지 않으면 세션아이디 변수에 저장
	userId = (String)session.getAttribute("userId");  // 세션정보가져오기
}

if(userId == null){ // 로그아웃상태

      out.write("	\r\n");
      out.write("	<script>\r\n");
      out.write("		alert(\"로그인하세요 \\n 회원만이 글을 쓸수 있습니다.\");\r\n");
      out.write("		location.href=\"./login.jsp\";\r\n");
      out.write("	</script>\r\n");

}
else{   // 1. 로그인 상태이면
	    // 2. 글번호 유효성	
		int bbsId = 0; // 2-1 현재는 수정할 글번호가 없는 셋팅
		if(request.getParameter("bbsId")!=null ){  // 업데이터이전상태 즉 글보기상태에서 던져준 글번호
			bbsId = Integer.parseInt(request.getParameter("bbsId")); // 글번호 가져오기
		}
		
		if(bbsId==0){ // 2-2 수정할 글번호가 없다.

      out.write("\r\n");
      out.write("			<script>	\r\n");
      out.write("				alert(\"수정할 글이 없습니다. 다시 확인하고 수정할 글을 선택하세요. \");\r\n");
      out.write("				location.href='./bbsListAction.jsp';\r\n");
      out.write("			</script>\r\n");
      out.write("		");
	
		}
		else{ // 2-3 수정할 글번호가 있다.
			  // 3. 글보기(글번호) 내용을 가져와서 화면 폼에 데이티를 바인딩하고 수정한다.
			  // 수정 컨트롤러인(DAO) 업데이트함수(update(매개변수 글번호, 제목, 내용, 작성일 전달하여))에게 
			  // 전송한다. 그러면 수정 완료 수정액션파일.jsp			   			  
			  BbsDTO bbsDTO = new BbsDAO().getView(bbsId);
			  if(bbsDTO==null){ // 3-1 null 이면 데이터가 없다면
		
      out.write("\r\n");
      out.write("					<script>\r\n");
      out.write("						alert(\"삭제할 데이터가 없습니다.\"); \r\n");
      out.write("						location.href='./bbsListAction.jsp';\r\n");
      out.write("					</script>\r\n");
      out.write("			");
	
			  }
			  else{ // 3-2 null 아니면 데이터가 있다면
				    // 4. 현재 데이터 글번호에 해당하는 아이디가 니가 쓴 글이냐
				  if(!userId.equals(bbsDTO.getUserId())){ // 로그인아이디와 해당글 아이디를 비교 다르면
			
      out.write("\r\n");
      out.write("						<script>\r\n");
      out.write("							alert(\"삭제할 권한이 없습니다.\"); // 작성자 본인만이 수정 가능하다.\r\n");
      out.write("							location.href='./bbsListAction.jsp';\r\n");
      out.write("						</script>\r\n");
      out.write("				  ");
	
				  }
				  else{
					  // HTML 뷰 탬플릿 폼에 수정내용을 바인딩한다.
				  
      out.write(" 	\r\n");
      out.write("						 <header id='header'>\r\n");
      out.write("							<div class='container'>\r\n");
      out.write("								<div class='left'>\r\n");
      out.write("									<h1>BBS Board</h1>\r\n");
      out.write("									<a href='./admin.jsp'>HOME</a>\r\n");
      out.write("									<a href='./bbsListAction.jsp'>게시판</a>\r\n");
      out.write("								</div>\r\n");
      out.write("								<div class='right'>\r\n");
      out.write("								");

									if(userId==null){
								
      out.write("\r\n");
      out.write("									<a href='./signup.jsp'>Signup</a>\r\n");
      out.write("									<a href='./login.jsp'>Login</a>\r\n");
      out.write("								");

									}
									else{
								
      out.write("\r\n");
      out.write("									<a href='./logoutAction.jsp'>Logout</a>\r\n");
      out.write("								");

									}
								
      out.write("	\r\n");
      out.write("								</div>\r\n");
      out.write("							</div>\r\n");
      out.write("						</header>\r\n");
      out.write("				  \r\n");
      out.write("				  \r\n");
      out.write("						<div id='update'>\r\n");
      out.write("							<div class='container'>\r\n");
      out.write("								<div class='title'>\r\n");
      out.write("									<h1>글수정</h1>\r\n");
      out.write("								</div>\r\n");
      out.write("								<div class='content'>\r\n");
      out.write("								    <form name=\"updateForm\" autocomplete=\"off\" id=\"updateForm\" method=\"post\" action=\"./updateAction.jsp?bbsId=");
      out.print(bbsId);
      out.write("\">\r\n");
      out.write("								        <ul>	           	           \r\n");
      out.write("								            <li>\r\n");
      out.write("								            	<input type=\"text\" maxlength=\"1000\" name=\"subject\" id=\"subject\" placeholder=\"제목을 입력하세요\" value=\"");
      out.print(bbsDTO.getSubject() );
      out.write("\">\r\n");
      out.write("								            </li>\r\n");
      out.write("								            <li>\r\n");
      out.write("								            	<textarea name=\"content\" id=\"content\" placeholder=\"내용을 입력하세요\">");
      out.print(bbsDTO.getContent() );
      out.write("</textarea>	\r\n");
      out.write("								            </li>\r\n");
      out.write("								        </ul>\r\n");
      out.write("								        <div class=\"button-box\" style=\"text-align:center\">\r\n");
      out.write("								            <button type=\"submit\"> 수정등록 </button>\r\n");
      out.write("								        </div>\r\n");
      out.write("								    </form>\r\n");
      out.write("								</div>\r\n");
      out.write("							</div>\r\n");
      out.write("						</div>\r\n");
      out.write("					\r\n");
	  
				  }
			  }
		}		
}

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("</body>\r\n");
      out.write("\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write("	* {margin:0; padding:0; vertical-align:center;box-sizing:border-box;}\r\n");
      out.write("	ul {list-style:none;}\r\n");
      out.write("	a {color:#333;text-decoration:none;}\r\n");
      out.write("	\r\n");
      out.write("	#header {width:100%;height:80px;background:#fff;border-bottom:1px solid #e6e6e6;}\r\n");
      out.write("	#header .container {\r\n");
      out.write("		width:100%;max-width:80%;margin:0 auto;\r\n");
      out.write("		height:100%;\r\n");
      out.write("		display:flex;\r\n");
      out.write("		align-items:center;		\r\n");
      out.write("		justify-content:space-between;\r\n");
      out.write("		font-weight:600;\r\n");
      out.write("	}	\r\n");
      out.write("	#header .container .left  {width:50%;}\r\n");
      out.write("	#header .container .left  h1 {font-size:24px;display:inline-block;color:#5f0080;margin:0 20px; 0 0;}\r\n");
      out.write("	#header .container .left  a  {foant-size:17px;color:#333;margin:0 10px;}\r\n");
      out.write("	#header .container .left  a:hover  {color:#5f0080;}\r\n");
      out.write("	#header .container .right {width:50%;text-align:right;}\r\n");
      out.write("	#header .container .right a  {foant-size:17px;color:#333;margin:0 10px;}\r\n");
      out.write("	#header .container .right a:hover  {color:#5f0080;}\r\n");
      out.write("	\r\n");
      out.write("	\r\n");
      out.write("	#update {width:100%;padding:60px 0 100px 0;}\r\n");
      out.write("	#update .container {width:100%;max-width:80%;margin:0 auto;padding:50px;background:#f3f3f3;}\r\n");
      out.write("	#update .container .title {text-align:left;padding:0 0 30px 0;}\r\n");
      out.write("	#update .container .title h1 {font-size:28px;font-weight:500;}\r\n");
      out.write("	\r\n");
      out.write("	#update .container .content {width:100%;height:auto;}\r\n");
      out.write("	#update .container .content form {width:100%;}\r\n");
      out.write("	#update .container .content form ul {width:100%;}\r\n");
      out.write("	#update .container .content form ul li {width:100%;padding:5px 0;}\r\n");
      out.write("	#update .container .content form ul li input {\r\n");
      out.write("		width:100%;height:60px;padding:0 15px;font-size:16px;border:1px solid #e6e6e6;\r\n");
      out.write("		outline-offset:-1px;outline:1px solid transparent;transition: all 0.3s;\r\n");
      out.write("	}\r\n");
      out.write("	#update .container .content form ul li textarea  {\r\n");
      out.write("		width:100%;height:400px;font-size:16px;border:1px solid #e6e6e6;\r\n");
      out.write("		outline-offset:-1px;outline:1px solid transparent;transition: all 0.3s;\r\n");
      out.write("		resize:none;padding:10px 15px;		\r\n");
      out.write("	}\r\n");
      out.write("	#update .container .content form .button-box {width:100%;padding: 50px 0 0 0; text-align:center;}\r\n");
      out.write("	#update .container .content form .button-box button {\r\n");
      out.write("		width:200px;height:50px;font-size:17px;color:#fff;border-radius:3px;border:0;\r\n");
      out.write("		background:#666;cursor:pointer;		\r\n");
      out.write("		transition: all 0.3s;\r\n");
      out.write("	}\r\n");
      out.write("	#update .container .content form .button-box button:hover {background:#111;}\r\n");
      out.write("	\r\n");
      out.write("</style>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
