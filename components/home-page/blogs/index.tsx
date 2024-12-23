import React from "react";
import BlogsArticle from "../blogs-article";
import { getBlogs } from "@/utils/api-calls";
import { Blogs } from "@/utils/types/types";

const BlogsSection = async () => {
  const blogsData: Blogs[] = await getBlogs();

  return (
    <div>{blogsData?.length > 0 && <BlogsArticle blogsData={blogsData} />}</div>
  );
};

export default BlogsSection;
