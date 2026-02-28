# 📝 Sanity Studio - How to Set Up Test Articles with Different Authors

## 🎯 Goal
Create test articles with different authors to test the author linking feature and work on bio pages.

## 📋 Instructions for Sanity Studio

### 1. Access Sanity Studio
- Go to https://www.sanity.io/manage
- Select your New Dominion Health project
- Click "Open Sanity Studio" or go to your studio URL

### 2. Create/Update Test Articles

You need to create or update 3 test articles with these authors:

#### Article 1: By Will Chelberg
- **Title:** "Understanding Biblical Health: A Christ-Centered Approach"
- **Author:** Will Chelberg
- **Excerpt:** "Exploring how Scripture guides our approach to physical wellness and stewardship of our bodies."
- **Content:** Should include mentions of "Will Chelberg" in the text to test auto-linking
  - Example: "As Will Chelberg explains, our bodies are temples of the Holy Spirit..."
- **Category:** Faith & Health
- **Featured:** Yes
- **Published Date:** Recent date

#### Article 2: By Andon Chelberg
- **Title:** "Nutrition and Faith: Eating with Purpose"
- **Author:** Andon Chelberg
- **Excerpt:** "How biblical principles can transform our relationship with food and nutrition."
- **Content:** Should include mentions of "Andon Chelberg" in the text
  - Example: "Andon Chelberg shares practical insights on how to..."
- **Category:** Nutrition
- **Featured:** No
- **Published Date:** Recent date

#### Article 3: Co-authored by Connor Chelberg and Aidan Preston
- **Title:** "Movement as Worship: Exercise and Spiritual Discipline"
- **Author:** Connor Chelberg and Aidan Preston
- **Excerpt:** "Discovering how physical activity can be an act of worship and gratitude to our Creator."
- **Content:** Should include mentions of both "Connor Chelberg" and "Aidan Preston"
  - Example: "Connor Chelberg and Aidan Preston discuss how movement can be an expression of worship..."
  - Example: "According to Connor Chelberg, regular exercise is..."
  - Example: "Aidan Preston emphasizes the importance of..."
- **Category:** Fitness
- **Featured:** No
- **Published Date:** Recent date

### 3. Important Schema Notes

Make sure your Sanity schema includes:
- `title` (string)
- `slug` (slug, auto-generated from title)
- `author` (string) - Enter as plain text: "Will Chelberg" or "Connor Chelberg and Aidan Preston"
- `excerpt` (text)
- `content` (Portable Text or Rich Text)
- `featuredImage` (image)
- `category` (string or array of strings)
- `publishedAt` (datetime)
- `featured` (boolean)

### 4. Test the Author Auto-Linking

After creating the articles:
1. Navigate to each article on your website
2. Look for the author names in the article content
3. The author names should automatically be clickable links (styled in #64767C color)
4. Clicking an author name should navigate to their bio page

### 5. Work on Bio Pages

The bio pages are located at:
- `/pages/WillChelbergBioPage.tsx`
- `/pages/AndonChelbergBioPage.tsx`
- `/pages/ConnorChelbergBioPage.tsx`
- `/pages/AidanPrestonBioPage.tsx`

Update each bio page with:
- Professional photos
- Detailed biographies
- Credentials and background
- Personal mission statements

## 🔗 Author Linking Feature

The auto-linking works like RefTagger:
- Automatically detects author names in blog post content
- Converts them to clickable links
- Links point to individual bio pages
- Styled to match your brand (#64767C hover color)
- Works with co-authored posts (e.g., "Connor Chelberg and Aidan Preston")

## 📸 Next Steps

1. Create the 3 test articles in Sanity Studio with the authors specified
2. Update the bio pages with real content and photos
3. Test the author linking feature by clicking author names in articles
4. Update the About page content in the Admin Panel

---

**Note:** The blog posts are managed entirely in Sanity Studio. The admin panel in your app is only for managing the About page and author profiles (for the author database used in tagging).
