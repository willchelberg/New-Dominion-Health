import { defineConfig } from 'sanity ;
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './sanity/schemas';

export default defineConfig({
  name: 'new-dominion-health',
  title: 'New Dominion Health',

  projectId: '5q95gqm1',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemas,
  },
});