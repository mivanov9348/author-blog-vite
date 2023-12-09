import { useEffect, useState } from "react";
import Select from "../../ui/Select";
import PostElement from "./PostDetail";
import "./BlogPosts.css";

export default function Posts() {
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async function () {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        if (!response.ok) {
          throw new Error("No Fetch");
        }
        const data = await response.json();
        console.log(data);

        setSortedPosts(data);
      } catch (error) {
        console.log("Fetch Error:", error);
      }
    };
    fetchPosts();
  }, []);

  function handleSortChange(sortBy) {
    let sorted = [...posts];

    if (sortBy === "Date") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "Rating") {
      sorted.sort((a, b) => b.upvotes - a.upvotes);
    }
    setSortedPosts(sorted);
  }

  return (
    <div className="blogposts-container">
      <Select
        options={[
          { value: null, label: "SortBy" },
          { value: "Date", label: "Date" },
          { value: "Rating", label: "Rating" },
        ]}
        onChange={handleSortChange}
        className="selectBtn"
      />

      {sortedPosts.map((post, index) => (
        <PostElement post={post} index={index} key={post.id} />
      ))}
    </div>
  );
}
