/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...index]]\page.jsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {media} from 'sanity-plugin-media'
import {dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'dropshit',
  projectId: projectId,
  dataset: dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: schemaTypes,
  },
  plugins: [
    deskTool(),
    visionTool(),
    media()
  ],
})
