/**
 * Represents a post with its metadata and content.
 *
 * @interface Post
 *
 * @property {Object} metadata - The metadata of the post.
 * @property {string} metadata.title - The title of the post.
 * @property {string} metadata.date - The publication date of the post.
 * @property {Array<string>} metadata.tags - A list of tags associated with the post.
 * @property {Array<string>} metadata.categories - A list of categories the post belongs to.
 * @property {string} content - The main content of the post.
 */
export interface Post {
  metadata: {
    id: string;
    title: string;
    date: string;
    tags: Array<string>;
    categories: Array<string>;
  };
  content: string;
}
