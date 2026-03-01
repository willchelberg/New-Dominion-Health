import { blogPost } from './src/sanity/schemas/blogPost';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'New Dominion Health Blog',
  
  projectId: '5q95gqm1', 
  dataset: 'production',
  
  plugins: [
    structureTool(),
  ],
  
  schema: {
    types: [blogPost],
  },
});