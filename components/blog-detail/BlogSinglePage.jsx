// ======================================================
// File: blog-detail/BlogSinglePage.jsx
// Description: Blog Single Page Component
// ======================================================

import BlogPostHero from "./BlogPostHero/BlogPostHero";
import BlogMetaBar from "./BlogMetaBar/BlogMetaBar";
import BlogPostLayout from "./BlogPostLayout/BlogPostLayout";
import BlogShareSection from "./BlogShareSection/BlogShareSection";
import TableOfContents from "./TableOfContents/TableOfContents";
import BlogPostContent from "./BlogPostContent/BlogPostContent";
import BlogTags from "./BlogTags/BlogTags";
import BlogAuthorCard from "./BlogAuthorCard/BlogAuthorCard";
import BlogPostNavigation from "./BlogPostNavigation/BlogPostNavigation";
import BlogDetailSidebar from "./BlogDetailSidebar/BlogDetailSidebar";
import RelatedPosts from "./RelatedPosts/RelatedPosts";
import BlogCommentSection from "../CommentSection";
import NewsletterCTA from "./NewsletterCTA/NewsletterCTA";

export default function BlogSinglePage({ blog, relatedPosts, comments }) {
  return (
    <>
      {/* HERO */}
      <BlogPostHero blog={blog} />

      {/* META */}
      <BlogMetaBar blog={blog} />

      {/* MAIN CONTENT */}
      <BlogPostLayout>
        {/* LEFT CONTENT */}
        <div>
          <BlogShareSection blog={blog} />

          <TableOfContents content={blog?.content} />

          <BlogPostContent blog={blog} />

          <BlogTags tags={blog?.tags} />

          <BlogAuthorCard author={blog?.author} />

          <BlogPostNavigation blog={blog} />
        </div>

        {/* SIDEBAR */}
        <BlogDetailSidebar />
      </BlogPostLayout>

      {/* RELATED POSTS */}
      <RelatedPosts posts={relatedPosts} />

      {/* COMMENTS */}
      <BlogCommentSection comments={comments} />

      {/* NEWSLETTER */}
      <NewsletterCTA />
    </>
  );
}
