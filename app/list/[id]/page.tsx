// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

import { List } from "@/app/ui/containers/list";

//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
//   }

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const listId = (await params).id;

  return (
    <>
        <div className="container mx-auto">
      <List id={listId}></List>
      </div>
    </>
  );
}
