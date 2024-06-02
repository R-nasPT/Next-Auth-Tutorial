//====== Server Component ======

import Link from "next/link";

const getBlogs = async () => {
  const response = await fetch("https://jsonplaceholder.org/users");

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }
  return response.json();
};

export default async function Page() {
  const blogs = await getBlogs();

  const delay = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  await delay(1000);

  return (
    <div>
      Blog List
      {blogs.map((item: any) => (
        <div key={item.id}>
          {item.id}. {item.email}
          <Link className="px-4 bg-blue-500" href={`/blog/${item.id}`}>Go to read blog..</Link>
        </div>
      ))}
    </div>
  );
}
