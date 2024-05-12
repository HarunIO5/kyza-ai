import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'toolPage',
  title: 'ToolPages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tool Title',
      type: 'string',
    }),
    defineField({
        name: 'description',
        title: 'Tool Description',
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
        name: 'emailWaitlist',
        title: 'Check to add email waitlist',
        type: 'boolean'
    }),
    defineField({
        name: 'toolType',
        title: 'Which tool are you creating the page for? (Must be all uppercase)',
        type: 'string',
        validation: Rule => Rule.required().min(4).max(100).uppercase()
    }),
    defineField({
        name: 'subHeading',
        title: 'Sub-heading (can be used for a how-to section or features, upto you)',
        type: 'string',
    }),
    defineField({
        name: 'subImage1',
        title: 'Sub Image #1',
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
        name: 'subTitle1',
        title: 'Sub-title (This will go underneath the Sub image #1)',
        type: 'string',
    }),
    defineField({
        name: 'subDescription1',
        title: 'Sub-description (This will go underneath the sub image #1 and title)',
        type: 'text',
    }),
    defineField({
        name: 'subImage2',
        title: 'Sub Image #2',
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
        name: 'subTitle2',
        title: 'Sub-title (This will go underneath the Sub image #2)',
        type: 'string',
    }),
    defineField({
        name: 'subDescription2',
        title: 'Sub-description (This will go underneath the sub image #2 and title)',
        type: 'text',
    }),
    defineField({
        name: 'subImage3',
        title: 'Sub Image #3',
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
        name: 'subTitle3',
        title: 'Sub-title (This will go underneath the Sub image #3)',
        type: 'string',
    }),
    defineField({
        name: 'subDescription3',
        title: 'Sub-description (This will go underneath the sub image #3 and title)',
        type: 'text',
    }),
    defineField({
        name: 'featureImage1',
        title: 'Feature Image #1 (This will be displayed on the left side)',
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
        name: 'featureTitle1',
        title: 'Feature title (This will go on the right of the feature image #1)',
        type: 'string',
    }),
    defineField({
        name: 'featureDescription1',
        title: 'feature description (This will on the right of the feature image #1)',
        type: 'text',
    }),
    defineField({
        name: 'featureImage2',
        title: 'Feature Image #2 (This will be displayed on the right side)',
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
        name: 'featureTitle2',
        title: 'Feature title (This will go on the left of the feature image #1)',
        type: 'string',
    }),
    defineField({
        name: 'featureDescription2',
        title: 'feature description (This will on the left of the feature image #1)',
        type: 'text',
    }),
    defineField({
        name: 'faqTitle1',
        title: 'FAQ title #1',
        type: 'string',
    }),
    defineField({
        name: 'faqDescription1',
        title: 'FAQ description #1',
        type: 'text',
    }),
    defineField({
        name: 'faqTitle2',
        title: 'FAQ title #2',
        type: 'string',
    }),
    defineField({
        name: 'faqDescription2',
        title: 'FAQ description #2',
        type: 'text',
    }),
    defineField({
        name: 'faqTitle3',
        title: 'FAQ title #3',
        type: 'string',
    }),
    defineField({
        name: 'faqDescription3',
        title: 'FAQ description #3',
        type: 'text',
    }),
    defineField({
        name: 'faqTitle4',
        title: 'FAQ title #4',
        type: 'string',
    }),
    defineField({
        name: 'faqDescription4',
        title: 'FAQ description #4',
        type: 'text',
    }),
    defineField({
        name: 'faqTitle5',
        title: 'FAQ title #5',
        type: 'string',
    }),
    defineField({
        name: 'faqDescription5',
        title: 'FAQ description #5',
        type: 'text',
    }),
    defineField({
        name: 'btnTitle',
        title: 'CTA Button Title',
        type: 'string',
    }),
    defineField({
      name: 'CTALink',
      title: 'CTA Link',
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
