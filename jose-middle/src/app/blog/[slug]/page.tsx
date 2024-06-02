const getBlog = async (slug: any) => {
  const response = await fetch(`https://jsonplaceholder.org/users/${slug}`);

  if (!response.ok) {
    throw new Error("cannot fetch blog");
  }
  return response.json();
};

export default async function Page({ params }: any) {
  const blog = await getBlog(params.slug);
  return (
    <div>
      ID: {params.slug}
      <div>{blog.email}</div>
      <div>{blog.firstname}</div>
    </div>
  );
}
