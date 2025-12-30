import React from "react";
import { usePosts } from "./hooks/usePosts";
import { FixedSizeList as List } from "react-window";

const ROW_HEIGHT = 48;

export default function Home() {
  const { posts, loading, error } = usePosts();

  if (loading) return <p className="p-4">Loading posts...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  // Each row renderer
  const Row = ({ index, style }) => {
    const post = posts[index];

    return (
      <div
        style={style}
        className="flex items-center border-b border-gray-200 px-3"
      >
        <div className="w-16 text-sm text-gray-600">{post.id}</div>
        <div className="flex-1 text-sm">{post.title}</div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Posts</h2>

      {/* Header */}
      <div className="flex border-b border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium">
        <div className="w-16">ID</div>
        <div className="flex-1">Title</div>
      </div>

      {/* Virtualized list */}
      <List
        height={ROW_HEIGHT * 10} // visible rows (~10)
        itemCount={posts.length} // total rows
        itemSize={ROW_HEIGHT} // row height
        width={100 + "%"} // full width
      >
        {Row}
      </List>
    </div>
  );
}
