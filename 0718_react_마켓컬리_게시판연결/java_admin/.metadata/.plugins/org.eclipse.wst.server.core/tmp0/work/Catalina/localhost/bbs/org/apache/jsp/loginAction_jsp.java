/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/9.0.73
 * Generated at: 2023-07-18 01:07:34 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import bbs.UserDAO;

public final class loginAction_jsp extends org.apache.jasper.runtime.HttpJspBase
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
    _jspx_imports_classes.add("bbs.UserDAO");
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
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");

	request.setCharacterEncoding("UTF-8");

      out.write(" \r\n");
      out.write("\r\n");
      bbs.UserDTO UserDTO = null;
      UserDTO = (bbs.UserDTO) _jspx_page_context.getAttribute("UserDTO", javax.servlet.jsp.PageContext.PAGE_SCOPE);
      if (UserDTO == null){
        UserDTO = new bbs.UserDTO();
        _jspx_page_context.setAttribute("UserDTO", UserDTO, javax.servlet.jsp.PageContext.PAGE_SCOPE);
      }
      out.write(' ');
      out.write('\r');
      out.write('\n');
      org.apache.jasper.runtime.JspRuntimeLibrary.introspecthelper(_jspx_page_context.findAttribute("UserDTO"), "userId", request.getParameter("userId"), request, "userId", false);
      out.write('\r');
      out.write('\n');
      org.apache.jasper.runtime.JspRuntimeLibrary.introspecthelper(_jspx_page_context.findAttribute("UserDTO"), "userPw", request.getParameter("userPw"), request, "userPw", false);
      out.write("\r\n");
      out.write("\r\n");
      out.write("    \r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta charset=\"UTF-8\">\r\n");
      out.write("<title>Insert title here</title>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\r\n");
      out.write("\r\n");

	if( UserDTO.getUserId()==null || UserDTO.getUserPw()==null ){

      out.write("\r\n");
      out.write("	<script>\r\n");
      out.write("		alert(\"빈값은 허용하지 않습니다. \\n 확인하고 다시 시도하세요\");\r\n");
      out.write("		history.go(-1);\r\n");
      out.write("	</script>\r\n");

	}
	else{
		
		UserDAO userDAO = new UserDAO();
		int result = userDAO.login(UserDTO.getUserId(), UserDTO.getUserPw());
		
		if(result==1){
			// 로그인 성공하면 세션(session)의 속성(Attribute 어트리뷰트)을 셀정(setter 세터)하기		
			// session.setAttribute("세션이름 키(아이디)", 세션값 키값(아이디)); //세션할당
			session.setAttribute("userId", UserDTO.getUserId());

      out.write("			\r\n");
      out.write("			<script>\r\n");
      out.write("				alert(\"로그인 되었습니다.\");\r\n");
      out.write("				location.href=\"./bbsListAction.jsp\";\r\n");
      out.write("			</script>	\r\n");
      out.write("					\r\n");
			
		}		
		else if(result==0){

      out.write("\r\n");
      out.write("\r\n");
      out.write("			<script>			\r\n");
      out.write("				alert(\"비밀번호가 틀렸습니다. 확인하고 다시시도하세요\");\r\n");
      out.write("				history.go(-1);\r\n");
      out.write("			</script>\r\n");
      out.write("			\r\n");
			
		}		
		else if(result==-1){

      out.write("		\r\n");
      out.write("	\r\n");
      out.write("			<script>\r\n");
      out.write("				alert(\"아이디가 틀렸습니다. 확인하고 다시시도하세요\");\r\n");
      out.write("				history.go(-1);\r\n");
      out.write("			</script>\r\n");
      out.write("						\r\n");
			
		}		
		else {

      out.write("		\r\n");
      out.write("\r\n");
      out.write("		<script>				\r\n");
      out.write("			alert(\"데이터베이스를 전체를 확인하고 다시시도하세요\");\r\n");
      out.write("			history.go(-1);\r\n");
      out.write("		</script>\r\n");
      out.write("		\r\n");
			
		}
		
		
	}

      out.write("\r\n");
      out.write("%>\r\n");
      out.write("\r\n");
      out.write("</body>\r\n");
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
