import { groq } from 'next-sanity'

export const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  body,
  excerpt,
  mainImage,
  "slug": slug.current,
  "author": author->{name, image},
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(_updatedAt desc) {
    ${postFields}
  }`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  image?: any
}

export interface Post {
    _id: string
    title?: string
    _updatedAt?: string
    excerpt?: string
    author?: Author
    slug?: any
    mainImage: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    }
    body: any;
    _createdAt: string;
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}