import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'alternatives',
  title: 'Alternatives',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
        name: 'description',
        title: 'Page Description',
        type: 'text',
      }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 128,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: 'text',
          name: 'alt',
          title: 'Alternative Text',
        },
    ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
        name: 'agTitle',
        title: 'Attention Grabbing Title',
        type: 'string',
    }),
    defineField({
        name: 'agImage1',
        title: 'Attention grabbing image #1',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
                type: 'text',
                name: 'alt',
                title: 'Attention Grabbing Caption',
                validation: Rule => Rule.required(),
                options: {
                  isHighlighted: true,
                },
          },
      ]
    }),
    defineField({
      name: 'agLink1',
      title: 'Attention Grabbing - Link #1',
      type: 'text',
    }),  
    defineField({
      name: 'agImage2',
      title: 'Attention grabbing image #2',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
            type: 'text',
            name: 'alt',
            title: 'Attention Grabbing Caption',
            validation: Rule => Rule.required(),
            options: {
              isHighlighted: true,
            },
        },
    ]
    }),
    defineField({
      name: 'agLink2',
      title: 'Attention Grabbing - Link #2',
      type: 'text',
    }),
    defineField({
      name: 'agImage3',
      title: 'Attention grabbing image #3',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
            type: 'text',
            name: 'alt',
            title: 'Attention Grabbing Caption',
            validation: Rule => Rule.required(),
            options: {
              isHighlighted: true,
            },
        },
    ]
    }),
    defineField({
      name: 'agLink3',
      title: 'Attention Grabbing - Link #3',
      type: 'text',
    }),
    defineField({
      name: 'agImage4',
      title: 'Attention grabbing image #4',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
            type: 'text',
            name: 'alt',
            title: 'Attention Grabbing Caption',
            validation: Rule => Rule.required(),
            options: {
              isHighlighted: true,
            },
        },
    ]
    }),
    defineField({
      name: 'agLink4',
      title: 'Attention Grabbing - Link #4',
      type: 'text',
    }),
    defineField({
        name: 'slTitle',
        title: 'Superlative Title',
        type: 'string',
    }),
    defineField({
      name: 'slBody',
      title: 'Superlative Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    defineField({
        name: 'firstFeatureTitle',
        title: '1st Feature Title',
        type: 'string',
    }),
    defineField({
        name: 'firstFeatureBody',
        title: '1st Feature Body',
        type: 'text'
    }),
    defineField({
        name: 'featureImage1',
        title: 'Feature image #1',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'secondFeatureTitle',
        title: '2nd Feature Title',
        type: 'string',
    }),
    defineField({
        name: 'secondFeatureBody',
        title: '2nd Feature Body',
        type: 'text'
    }),
    defineField({
        name: 'featureImage2',
        title: 'Feature image #2',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'thirdFeatureTitle',
        title: '3rd Feature Title',
        type: 'string',
    }),
    defineField({
        name: 'thirdFeatureBody',
        title: '3rd Feature Body',
        type: 'text'
    }),
    defineField({
        name: 'featureImage3',
        title: 'Feature image #3',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'fourthFeatureTitle',
        title: '4th Feature Title',
        type: 'string',
    }),
    defineField({
        name: 'fourthFeatureBody',
        title: '4th Feature Body',
        type: 'text'
    }),
    defineField({
        name: 'featureImage4',
        title: 'Feature image #4',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'companyTestimonalTitle',
        title: 'Companies Testimonal Title',
        type: 'string',
    }),
    defineField({
        name: 'logoImage1',
        title: 'Logo image #1',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'logoImage2',
        title: 'Logo image #2',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'logoImage3',
        title: 'Logo image #3',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'logoImage4',
        title: 'Logo image #4',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'logoImage5',
        title: 'Logo image #5',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'personImage1',
        title: 'Person image #1',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'firstPersonTestimonal',
        title: '1st Individuals Testimonal',
        type: 'array',
        of: [
          {
            type: 'block',
          },
        ],
    }),
    defineField({
        name: 'firstPersonName',
        title: '1st Individuals Name',
        type: 'string',
    }),
    defineField({
        name: 'firstPersonPosition',
        title: '1st Individuals Position',
        type: 'string',
    }),
    defineField({
        name: 'personImage2',
        title: 'Person image #2',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'secondPersonTestimonal',
        title: '2nd Individuals Testimonal',
        type: 'array',
        of: [
          {
            type: 'block',
          },
        ],
    }),
    defineField({
        name: 'secondPersonName',
        title: '2nd Individuals Name',
        type: 'string',
    }),
    defineField({
        name: 'secondPersonPosition',
        title: '2nd Individuals Position',
        type: 'string',
    }),
    defineField({
        name: 'personImage3',
        title: 'Person image #3',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
              type: 'text',
              name: 'alt',
              title: 'Alternative text'
          },
      ]
    }),
    defineField({
        name: 'thirdPersonTestimonal',
        title: '3rd Individuals Testimonal',
        type: 'array',
        of: [
          {
            type: 'block',
          },
        ],
    }),
    defineField({
        name: 'thirdPersonName',
        title: '3rd Individuals Name',
        type: 'string',
    }),
    defineField({
        name: 'thirdPersonPosition',
        title: '3rd Individuals Position',
        type: 'string',
    }),
    defineField({
      name: 'bannerText',
      title: 'Banner CTA Text',
      type: 'text',
    }),
    defineField({
      name: 'bannerBtn',
      title: 'Banner CTA Button',
      type: 'string',
    }),
    defineField({
      name: 'bannerLink',
      title: 'Banner CTA Link',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
