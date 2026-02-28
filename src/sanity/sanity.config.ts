import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemas } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'New Dominion Health',

  projectId: '5q95gqm1',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(), // For testing queries
  ],

  schema: {
    types: schemas,
  },
});