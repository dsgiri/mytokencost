import { defineField, defineType } from 'sanity'

export const blueprintType = defineType({
  name: 'blueprint',
  title: 'Compliance Blueprint (SOP)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Blueprint Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'regulatoryBody',
      title: 'Regulatory Body',
      type: 'string',
      description: 'e.g. ERCOT, TCEQ, HHSC',
    }),
    defineField({
      name: 'penaltyRisk',
      title: 'Penalty Risk / Liability',
      type: 'string',
      description: 'e.g. $15,000 per violation day',
    }),
    defineField({
      name: 'steps',
      title: 'Audit Steps',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
