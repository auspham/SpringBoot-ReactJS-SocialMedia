[![Build Status](https://travis-ci.com/rockmanvnx6/SEPT2019.svg?token=PBNhG2eVeatqToEz8PCp&branch=master)](https://travis-ci.com/rockmanvnx6/SEPT2019)
# Your First Full Stack Application with React and Spring Boot


## Take your first steps towards becoming a Full Stack Developer with React and Spring Boot

React is a one of the most popular front end view frameworks
- Components
- JSX
- State
- Props

In combination with other libraries, React helps in doing a wide variety of front end features
- Forms Handling
- Routing System
- HTTP Requests

Spring Boot is an awesome framework to build RESTful API and Microservices.

In this course, lets combine these awesome frameworks to create your first full stack web application.

## References
- https://github.com/facebook/create-react-app
- https://facebook.github.io/create-react-app/docs/troubleshooting
- https://babeljs.io/repl

## Installation Guides

#### Required Tools

- Node v8+ for npm
- Visual Studio Code - Latest Version
- Java 8+
- Eclipse - Oxygen+ - (Embedded Maven From Eclipse)

#### Installing Node Js (npm) & Visual Studio Code 


- Steps
  - Step 01 - Installing NodeJs and NPM - Node Package Manager
  - Step 02 - Quick Introduction to NPM
  - Step 03 - Installing Visual Studio Code - Front End Java Script Editor

#### Installing Java, Eclipse & Embedded Maven

- Steps
  - 0 - Overview - Installation Java, Eclipse and Maven
  - 1 - Installing Java JDK
  - 2 - Installing Eclipse IDE
  - 3 - Using Embedded Maven in Eclipse
  - 4 - Troubleshooting Java, Eclipse and Maven

#### Troubleshooting Installations

- Node JS and NPM 
  - https://docs.npmjs.com/common-errors
  - https://docs.npmjs.com/getting-started/troubleshooting
- Visual Studio Code
  - https://code.visualstudio.com/docs/supporting/errors
  - https://code.visualstudio.com/docs/supporting/FAQ
- Eclipse and Embedded Maven
  - PDF : https://github.com/sept/Springsept/blob/master/InstallationGuide-JavaEclipseAndMaven_v2.pdf
  - GIT Repository For Installation : https://github.com/sept/getting-started-in-5-steps




### Introduction
Developing your first full stack application with React and Spring Boot is fun.

You will be using React (Frontend View Framework), React Create App(To create React project), Various JavaScript Libraries (Axios, Formik, React Router), Spring Boot (REST API Framework), Spring (Dependency Management),  Spring Security (Authentication and Authorization - Basic and JWT), BootStrap (Styling Pages), Maven (dependencies management), Node (npm), Visual Studio Code (JavaScript IDE), Eclipse (Java IDE) and Tomcat Embedded Web Server. We will help you set up each one of these.


```

## Code Snippets

### Core JWT Components

```properties
jwt.signing.key.secret=mySecret
jwt.get.token.uri=/authenticate
jwt.refresh.token.uri=/refresh
jwt.http.request.header=Authorization
jwt.token.expiration.in.seconds=604800
```

```java
package com.sept.todoservices.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "sept",
        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
  }

}


@Component
public class JwtTokenAuthorizationOncePerRequestFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        logger.debug("Authentication Request For '{}'", request.getRequestURL());

        final String requestTokenHeader = request.getHeader(this.tokenHeader);

        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                logger.error("JWT_TOKEN_UNABLE_TO_GET_USERNAME", e);
            } catch (ExpiredJwtException e) {
                logger.warn("JWT_TOKEN_EXPIRED", e);
            }
        } else {
            logger.warn("JWT_TOKEN_DOES_NOT_START_WITH_BEARER_STRING");
        }

        logger.debug("JWT_TOKEN_USERNAME_VALUE '{}'", username);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.jwtInMemoryUserDetailsService.loadUserByUsername(username);

            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response);
    }
}


@Component
public class JwtTokenUtil implements Serializable {

  static final String CLAIM_KEY_USERNAME = "sub";
  static final String CLAIM_KEY_CREATED = "iat";
  private static final long serialVersionUID = -3301605591108950415L;
  private Clock clock = DefaultClock.INSTANCE;

  @Value("${jwt.signing.key.secret}")
  private String secret;

  @Value("${jwt.token.expiration.in.seconds}")
  private Long expiration;

  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  public Date getIssuedAtDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getIssuedAt);
  }

  public Date getExpirationDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims);
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token) {
    final Date expiration = getExpirationDateFromToken(token);
    return expiration.before(clock.now());
  }

  private Boolean ignoreTokenExpiration(String token) {
    // here you specify tokens, for that the expiration is ignored
    return false;
  }

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    return doGenerateToken(claims, userDetails.getUsername());
  }

  private String doGenerateToken(Map<String, Object> claims, String subject) {
    final Date createdDate = clock.now();
    final Date expirationDate = calculateExpirationDate(createdDate);

    return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(createdDate)
        .setExpiration(expirationDate).signWith(SignatureAlgorithm.HS512, secret).compact();
  }

  public Boolean canTokenBeRefreshed(String token) {
    return (!isTokenExpired(token) || ignoreTokenExpiration(token));
  }

  public String refreshToken(String token) {
    final Date createdDate = clock.now();
    final Date expirationDate = calculateExpirationDate(createdDate);

    final Claims claims = getAllClaimsFromToken(token);
    claims.setIssuedAt(createdDate);
    claims.setExpiration(expirationDate);

    return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, secret).compact();
  }

  public Boolean validateToken(String token, UserDetails userDetails) {
    JwtUserDetails user = (JwtUserDetails) userDetails;
    final String username = getUsernameFromToken(token);
    return (username.equals(user.getUsername()) && !isTokenExpired(token));
  }

  private Date calculateExpirationDate(Date createdDate) {
    return new Date(createdDate.getTime() + expiration * 1000);
  }
}

@Component
public class JwtUnAuthorizedResponseAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

  private static final long serialVersionUID = -8970718410437077606L;

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException {
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
        "You would need to provide the Jwt Token to Access This resource");
  }
}


public class JwtUserDetails implements UserDetails {

  private static final long serialVersionUID = 5155720064139820502L;

  private final Long id;
  private final String username;
  private final String password;
  private final Collection<? extends GrantedAuthority> authorities;

  public JwtUserDetails(Long id, String username, String password, String role) {
    this.id = id;
    this.username = username;
    this.password = password;

    List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
    authorities.add(new SimpleGrantedAuthority(role));

    this.authorities = authorities;
  }

  @JsonIgnore
  public Long getId() {
    return id;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JWTWebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
    private JwtTokenAuthorizationOncePerRequestFilter jwtAuthenticationTokenFilter;

    @Value("${jwt.get.token.uri}")
    private String authenticationPath;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .userDetailsService(jwtInMemoryUserDetailsService)
            .passwordEncoder(passwordEncoderBean());
    }

    @Bean
    public PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf().disable()
            .exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeRequests()
            .anyRequest().authenticated();

       httpSecurity
            .addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        
        httpSecurity
            .headers()
            .frameOptions().sameOrigin()  //H2 Console Needs this setting
            .cacheControl(); //disable caching
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity
            .ignoring()
            .antMatchers(
                HttpMethod.POST,
                authenticationPath
            )
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .and()
            .ignoring()
            .antMatchers(
                HttpMethod.GET,
                "/" //Other Stuff You want to Ignore
            )
            .and()
            .ignoring()
            .antMatchers("/h2-console/**/**");//Should not be in Production!
    }
}

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class JwtAuthenticationRestController {

  @Value("${jwt.http.request.header}")
  private String tokenHeader;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private UserDetailsService jwtInMemoryUserDetailsService;

  @RequestMapping(value = "${jwt.get.token.uri}", method = RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest)
      throws AuthenticationException {

    authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

    final UserDetails userDetails = jwtInMemoryUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

    final String token = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new JwtTokenResponse(token));
  }

  @RequestMapping(value = "${jwt.refresh.token.uri}", method = RequestMethod.GET)
  public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);
    String username = jwtTokenUtil.getUsernameFromToken(token);
    JwtUserDetails user = (JwtUserDetails) jwtInMemoryUserDetailsService.loadUserByUsername(username);

    if (jwtTokenUtil.canTokenBeRefreshed(token)) {
      String refreshedToken = jwtTokenUtil.refreshToken(token);
      return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @ExceptionHandler({ AuthenticationException.class })
  public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }

  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new AuthenticationException("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new AuthenticationException("INVALID_CREDENTIALS", e);
    }
  }
}

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class  JwtTokenRequest implements Serializable {
  
  private static final long serialVersionUID = -5616176897013108345L;

  private String username;
    private String password;

    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

public class JwtTokenResponse implements Serializable {

  private static final long serialVersionUID = 8317676219297719109L;

  private final String token;

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
```
---


```

`
#Global
npm uninstall -g React-cli
npm cache verify
npm install -g @React/cli@7.0.3

#Inside the project - If you had an earlier version of React cli
rm -rf node_modules
npm uninstall --save-dev React-cli
npm install --save-dev @React/cli@latest
npm install
```
- Why Visual Studio Code?
  - https://trends.google.com/trends/explore?date=all&q=%2Fm%2F0k2kj45,%2Fm%2F0_x5x3g,%2Fm%2F0134xwrk,%2Fm%2F0b6h18n
- We use Light Theme
- Install
    - Auto Import - Automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX
    - Reload to Activate

## What You will Learn?

### Big Picture
- What is the High Level Architecture of our Full Stack Application?
- What is an SPA?
- What is React?

### TypeScript and JavaScript
- I'm new to TypeScript. Will I be able to adapt to it?
- How does a JavaScript Class compare to a Java Class?
  - Packages vs Modules
  - import statements
  - Decorator vs Annotation
- What is a JavaScript Module?
- How does JavaScript Syntax compare to Java Syntax?
  - Arrays - Filtering, Spread Operator and Functional Stuff
  - Custom Objects

### React Basics 
- What is React Component?
- What are the conventions for file extensions in React Projects?
- How do you build forms in React? How do you do Form Validation?
- What is Routing?
- How do you implement Routing in React?
- How do you call HTTP Services in React?

### Running React Applications
- What is Root Component? What are Bootstrap Components? How is the React Application Bootstrapped?  ```\src\index.html```, ```\src\main.ts```, ```AppModule```, ```AppComponent```
- Do Browsers understand JSX? How does JSX code get converted to JavaScript code? 

## Automated Tests and Code Quality
- What are unit tests? How are unit tests organized in React? How is different from Java?
- How can you run tests? ```\src\karma.conf.ts```
- What are coding standards? How can you check coding standards for React Cli Project? What is Lint? What is Linting? Is there a Standard Style Guide for React? ```\tslint.json```
- How can I run coding standards check for React Projects?

## Course Details


### Request URLs and Examples

#### Common Headers

```
Origin - http://localhost:4200
Content-Type - application/json
Authorization 
- Bearer *** or
- Basic *****
```


#### Retrieve all todos for a user 

- GET - http://localhost:8080/users/sept/todos

```
[
  {
    id: 1,
    username: "sept",
    description: "Learn to Dance 2",
    targetDate: "2018-11-09T12:05:18.647+0000",
   : false,
  },
  {
    id: 2,
    username: "sept",
    description: "Learn about Microservices 2",
    targetDate: "2018-11-09T12:05:18.647+0000",
   : false,
  },
  {
    id: 3,
    username: "sept",
    description: "Learn about React",
    targetDate: "2018-11-09T12:05:18.647+0000",
   : false,
  },
]
```

#### Retrieve a specific todo

- GET - http://localhost:8080/users/sept/todos/1

```
{
  id: 1,
  username: "sept",
  description: "Learn to Dance 2",
  targetDate: "2018-11-09T12:05:18.647+0000",
 : false,
}
```

#### Creating a new todo

- POST to http://localhost:8080/users/sept/todos with BODY of Request given below

```
{
  "username": "sept",
  "description": "Learn to Drive a Car",
  "targetDate": "2018-11-09T10:49:23.566+0000",
  "done": false
}
```

#### Updating a new todo

- http://localhost:8080/users/sept/todos/1 with BODY of Request given below

```
{
  "id": 1
  "username": "sept",
  "description": "Learn to Drive a Car",
  "targetDate": "2018-11-09T10:49:23.566+0000",
  "done": false
}
```

#### Delete todo

- DELETE to http://localhost:8080/users/sept/todos/1

### JWT Authenticate

- POST to http://localhost:8080/authenticate


```
{
  "username":"ranga",
  "password":"password@!23@#!"
}
```

Response

```
{
"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYW5nYSIsImV4cCI6MTU0MjQ3MjA3NCwiaWF0IjoxNTQxODY3Mjc0fQ.kD6UJQyxjSPMzAhoTJRr-Z5UL-FfgsyxbdseWQvk0fLi7eVXAKhBkWfj06SwH43sY_ZWBEeLuxaE09szTboefw"
}
```

Other URLS
- Refresh - http://localhost:8080/authenticate


  

## Connection to MySQL

```
create sequence hibernate_sequence start with 1 increment by 1

create table todo (
    id bigint not null, 
    description varchar(255), 
    is_done boolean not null, 
    target_date timestamp, 
    username varchar(255), 
    primary key (id))

```

## Diagrams

- Courtesy http://viz-js.com/

```

digraph architecture {
node[style=filled,color="#59C8DE",fontsize=20]
//node [style=filled,color="#D14D28", fontcolor=white];
edge [fontsize=6 ];

VIRTUALDOM[label=<Virtual DOM>];
DOM
REACTAPP[label=<App>];

{rank=same; DOM, REACTAPP};

VIRTUALDOM -> DOM [ label="diff & update" ];
REACTAPP -> VIRTUALDOM [ label="creates" ];
DOM -> REACTAPP [ label="events" ];

}

digraph architecture {
node[style=filled,color="#59C8DE",fontsize=20]
//node [style=filled,color="#D14D28", fontcolor=white];
edge [fontsize=9 ];
{rank=same; Actions, Reducers, Store};

Actions -> Reducers
View -> Actions [ label="dispatch" ];
Store -> View [label ="subscribe"]
Reducers -> Store

}


  
graph architecture {
node[style=filled,color="#59C8DE"]
//node [style=filled,color="#D14D28", fontcolor=white];
rankdir = TB;
node[shape=record]

FRONTEND[label=<React Application<BR />
   <FONT POINT-SIZE="9">Modern JavaScript - ES6</FONT>>];

REST[label=<RESTFUL API<BR />
   <FONT POINT-SIZE="9">Spring Boot on Java</FONT>>];

DB[label=<Database>];

FRONTEND -- REST -- DB
DB[shape=cylinder]
}

digraph architecture {
node[style=filled,color="#59C8DE"]
//node [style=filled,color="#D14D28", fontcolor=white];
rankdir = TB;
node[shape=record]

FRONTEND[label=<React Application<BR />
   <FONT POINT-SIZE="9">JavaScript</FONT>>];

MODULE0[label=<Components>];

MODULE1[label=<Libraries>];

COMPONENT01[label=<Login>];
COMPONENT02[label=<Logout>];
COMPONENT03[label=<ListTodo>];
COMPONENT04[label=<Todo>];
COMPONENT05[label=<Header>];
COMPONENT06[label=<Footer>];
COMPONENT07[label=<Menu>];

COMPONENT11[label=<Formik>];
COMPONENT12[label=<Axios>];
COMPONENT13[label=<ReactRouter>];

FRONTEND -> MODULE0
FRONTEND -> MODULE1

MODULE0 -> COMPONENT01
MODULE0 -> COMPONENT02
MODULE0 -> COMPONENT03
MODULE0 -> COMPONENT04
MODULE0 -> COMPONENT05
MODULE0 -> COMPONENT06
MODULE0 -> COMPONENT07

MODULE1 -> COMPONENT11
MODULE1 -> COMPONENT12
MODULE1 -> COMPONENT13

}


graph architecture {

node[style=filled,color="#59C8DE"]
//node [style=filled,color="#D14D28", fontcolor=white];
rankdir = TB;
node[shape=record]

COMPONENT[label=<Component>];

View[label=<View<BR />
   <FONT POINT-SIZE="9">JSX or Javascript</FONT>>];
Logic[label=<Logic<BR />
   <FONT POINT-SIZE="9">Javascript</FONT>>];
Styling[label=<Styling<BR />
   <FONT POINT-SIZE="9">CSS</FONT>>];
State[label=<State<BR />
   <FONT POINT-SIZE="9">Internal Data Store</FONT>>];
Props[label=<Props<BR />
   <FONT POINT-SIZE="9">Pass Data</FONT>>];

COMPONENT -- View
COMPONENT -- Logic
COMPONENT -- Styling
COMPONENT -- State
COMPONENT -- Props
}

graph architecture {

node[style=filled,color="#59C8DE"]
//node [style=filled,color="#D14D28", fontcolor=white];
rankdir = TB;
node[shape=record]

React -- Components
Components -- JSX
Components -- State
Components -- Props
React -- Features
Features -- Routing
Features -- Forms
Features -- RestAPICalls
Features -- Authentication

RestAPICalls[label=<Rest API Calls>]
Forms[label=<Forms and Validation>]

}


```

## Todo
- Debugging with Visual Studio Code
  - To debug the client side React code, we'll need to install the Debugger for Chrome extension - https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome
  - Open the Extensions view (⇧⌘X or Ctrl+Shift+X)
  - Type Debugger for Chrome
  - Install
  - Reload
  - Go to the Debug view (⇧⌘D or Ctrl+Shift+D)
  - Click on gear button to create launch.json
  - Choose Chrome from the Select Environment dropdown
  - Set URL to "url": "http://localhost:4200"
- Running Examples
  - Download the zip or clone the Git repository.
  - Unzip the zip file (if you downloaded one)
  - Open Command Prompt and Change directory (cd) to folder containing pom.xml
  - Open Eclipse 
     - File -> Import -> Existing Maven Project -> Navigate to the folder where you unzipped the zip
     - Select the right project
  - Choose the Spring Boot Application file (search for file with @SpringBootApplication)
  - Right Click on the file and Run as Java Application
  - You are all Set
  - For help : use our installation guide - A video will be uploaded for this soon

## Next Steps
- React
  - Why we need to bind event handlers in Class Components in React?
    - https://medium.freecodecamp.org/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb
  - class vs className - A discussion
    - https://stackoverflow.com/questions/46989454/class-vs-classname-in-react-16
  - 
- Modern JavaScript 
  - https://github.com/mbeaudru/modern-js-cheatsheet#tdz_sample
  - https://learnxinyminutes.com/docs/javascript/
  - https://github.com/mjavascript/mastering-modular-javascript/blob/master/chapters/ch01.asciidoc
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript
  - Modern Javascript Quickly - https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c
- React
  - https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html
  - class vs className - https://stackoverflow.com/questions/46989454/class-vs-classname-in-react-16
  - https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1
  - https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes