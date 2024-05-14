import { groq } from 'next-sanity'

export const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  body,
  excerpt,
  mainImage,
  bannerText,
  bannerBtn,
  bannerLink,
  "slug": slug.current,
  "author": author->{name, image},
`
export const toolFields = groq`
  _id,
  _createdAt,
  title,
  description,
  heroImage,
  thumbnailImage,
  subHeading,
  _type,
  _updatedAt,
  toolType,
  emailWaitlist,
  subImage1,
  subTitle1,
  subDescription1,
  subImage2,
  subTitle2,
  subDescription2,
  subImage3,
  subTitle3,
  subDescription3,
  featureImage1,
  featureTitle1,
  featureDescription1,
  featureImage2,
  featureTitle2,
  featureDescription2,
  faqTitle1,
  faqDescription1,
  faqTitle2,
  faqDescription2,
  faqTitle3,
  faqDescription3,
  faqTitle4,
  faqDescription4,
  faqTitle5,
  faqDescription5,
  btnTitle,
  CTALink,
  "slug": slug.current,
`

export const alternativeFields = groq`
  _id,
  _createdAt,
  title,
  description,
  heroImage,
  agTitle,
  agImage1,
  agLink1,
  agImage2,
  agLink2,
  agImage3,
  agLink3,
  agImage4,
  agLink4,
  slTitle,
  slBody,
  firstFeatureTitle,
  firstFeatureBody,
  featureImage1,
  secondFeatureTitle,
  secondFeatureBody,
  featureImage2,
  thirdFeatureTitle,
  thirdFeatureBody,
  featureImage3,
  fourthFeatureTitle,
  fourthFeatureBody,
  featureImage4,
  companyTestimonalTitle,
  logoImage1,
  logoImage2,
  logoImage3,
  logoImage4,
  logoImage5,
  firstPersonName,
  firstPersonPosition,
  firstPersonTestimonal,
  personImage1,
  secondPersonName,
  secondPersonPosition,
  secondPersonTestimonal,
  personImage2,
  thirdPersonName,
  thirdPersonPosition,
  thirdPersonTestimonal,
  personImage3,
  bannerText,
  bannerBtn,
  bannerLink,
  "slug": slug.current,
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
    bannerText?: string;
    bannerBtn?: string;
    bannerLink?: string;
}

export interface ToolPageType {
  _id: string,
  title?: string,
  slug?: any,
  _createdAt?: string,
  description?: string,
  heroImage?: any,
  thumbnailImage?: any,
  _type: string,
  emailWaitlist: boolean,
  toolType: string,
  subHeading?: string,
  subImage1?: any,
  subTitle1?: string,
  subDescription1?: string,
  subImage2?: any,
  subTitle2?: string,
  subDescription2?: string,
  subImage3?: any,
  subTitle3?: string,
  subDescription3?: string,
  featureImage1?: any,
  featureTitle1?: string,
  featureDescription1?: string,
  featureImage2?: any,
  featureTitle2?: string,
  featureDescription2?: string,
  faqTitle1?: string,
  faqDescription1?: string,
  faqTitle2?: string,
  faqDescription2?: string,
  faqTitle3?: string,
  faqDescription3?: string,
  faqTitle4?: string,
  faqDescription4?: string,
  faqTitle5?: string,
  faqDescription5?: string,
  btnTitle?: string,
  CTALink?: string
}

export interface AlternativesType {
  _id: string,
  title?: string,
  slug?: any,
  _createdAt?: string,
  description?: string,
  heroImage: any,
  agTitle?: string,
  agImage1?: any,
  agLink1?: string,
  agImage2?: any,
  agLink2?: string,
  agImage3?: any,
  agLink3?: string,
  agImage4?: any,
  agLink4?: string,
  slTitle?: string,
  slBody?: string,
  firstFeatureTitle?: string,
  firstFeatureBody?: string,
  featureImage1?: any,
  secondFeatureTitle?: string,
  secondFeatureBody?: string,
  featureImage2?: any,
  thirdFeatureTitle?: string,
  thirdFeatureBody?: string,
  featureImage3?: any,
  fourthFeatureTitle?: string,
  fourthFeatureBody?: string,
  featureImage4?: any,
  companyTestimonalTitle?: string,
  logoImage1?: any,
  logoImage2?: any,
  logoImage3?: any,
  logoImage4?: any,
  logoImage5?: any,
  firstPersonName?: string,
  firstPersonPosition?: string,
  firstPersonTestimonal?: string,
  personImage1?: any
  secondPersonName?: string,
  secondPersonPosition?: string,
  secondPersonTestimonal?: string,
  personImage2: any,
  thirdPersonName?: string,
  thirdPersonPosition?: string,
  thirdPersonTestimonal?: string,
  personImage3?: any,
  bannerText?: string,
  bannerBtn?: string,
  bannerLink?: string
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}