import type { SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { blueprintType } from './blueprintType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, blueprintType],
}
