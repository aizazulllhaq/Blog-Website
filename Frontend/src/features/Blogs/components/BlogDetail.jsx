import BlogPost from "../../../Utils/BlogPost";
import authorImage from "../../../assets/user.png"


const BlogDetail = ({blog}) => {
  const content = `
  Creating a basic HTTP server in Node.js is simple. Here's how you can do it:
  
  **heading**Step 1: Install Node.js**heading**
  First, you need to install Node.js. You can download it from [the official Node.js website](https://nodejs.org/).
  
  **heading**Step 2: Write the Server Code**heading**
  Next, create a file called \`server.js\` and add the following code:
  
  **code**
  const http = require('http');
  
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\\n');
  });
  
  server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
  });
  **code**
  
  **heading**Step 3: Run the Server**heading**
  Finally, run the server using the following command:
  
  **code**
  node server.js
  **code**
  
  That's it! Your HTTP server is now running and will respond with "Hello, World!" to any requests.
  `;  

 

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-[1050px] mx-auto flex flex-col justify-center space-y-[40px] p-[30px]">
      {/* Blog Image */}
      <div className="flex justify-center items-center">
        <img src={blog.image} alt={blog.title} className="w-[800px] rounded-[10px]" />
      </div>
      <h1 className="text-4xl font-bold text-center">{blog.title}</h1>
      <div className="flex items-center space-x-4">
        <img src={authorImage} alt={blog.author.username} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{blog.author.username}</p>
          <p className="text-gray-600">{blog.uploadTime}</p>
        </div>
      </div>
      <BlogPost content={blog.content || content} />
    </section>
  );
};

export default BlogDetail;
