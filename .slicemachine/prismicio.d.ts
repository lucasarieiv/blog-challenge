// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for posts documents */
interface PostsDocumentData {
    /**
     * title field in *posts*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * subtitle field in *posts*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.subtitle
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    subtitle: prismicT.KeyTextField;
    /**
     * author field in *posts*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.author
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    author: prismicT.KeyTextField;
    /**
     * banner field in *posts*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.banner
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    banner: prismicT.ImageField<never>;
    /**
     * content field in *posts*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.content[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    content: prismicT.GroupField<Simplify<PostsDocumentDataContentItem>>;
    /**
     * Slice Zone field in *posts*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<PostsDocumentDataSlicesSlice>;
}
/**
 * Item in posts → content
 *
 */
export interface PostsDocumentDataContentItem {
    /**
     * heading field in *posts → content*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.content[].heading
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    heading: prismicT.KeyTextField;
    /**
     * body field in *posts → content*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: posts.content[].body
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    body: prismicT.RichTextField;
}
/**
 * Slice for *posts → Slice Zone*
 *
 */
type PostsDocumentDataSlicesSlice = BlogPostsSlice | BlogPost2Slice;
/**
 * posts document from Prismic
 *
 * - **API ID**: `posts`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PostsDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<PostsDocumentData>, "posts", Lang>;
/** Content for posts2 documents */
type Posts2DocumentData = Record<string, never>;
/**
 * posts2 document from Prismic
 *
 * - **API ID**: `posts2`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type Posts2Document<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<Posts2DocumentData>, "posts2", Lang>;
export type AllDocumentTypes = PostsDocument | Posts2Document;
/**
 * Default variation for BlogPost2 Slice
 *
 * - **API ID**: `default`
 * - **Description**: `BlogPost2`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BlogPost2SliceDefault = prismicT.SharedSliceVariation<"default", Record<string, never>, never>;
/**
 * Slice variation for *BlogPost2*
 *
 */
type BlogPost2SliceVariation = BlogPost2SliceDefault;
/**
 * BlogPost2 Shared Slice
 *
 * - **API ID**: `blog_post2`
 * - **Description**: `BlogPost2`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BlogPost2Slice = prismicT.SharedSlice<"blog_post2", BlogPost2SliceVariation>;
/**
 * Default variation for BlogPosts Slice
 *
 * - **API ID**: `default`
 * - **Description**: `BlogPosts`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BlogPostsSliceDefault = prismicT.SharedSliceVariation<"default", Record<string, never>, never>;
/**
 * Slice variation for *BlogPosts*
 *
 */
type BlogPostsSliceVariation = BlogPostsSliceDefault;
/**
 * BlogPosts Shared Slice
 *
 * - **API ID**: `blog_posts`
 * - **Description**: `BlogPosts`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BlogPostsSlice = prismicT.SharedSlice<"blog_posts", BlogPostsSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { PostsDocumentData, PostsDocumentDataContentItem, PostsDocumentDataSlicesSlice, PostsDocument, Posts2DocumentData, Posts2Document, AllDocumentTypes, BlogPost2SliceDefault, BlogPost2SliceVariation, BlogPost2Slice, BlogPostsSliceDefault, BlogPostsSliceVariation, BlogPostsSlice };
    }
}
