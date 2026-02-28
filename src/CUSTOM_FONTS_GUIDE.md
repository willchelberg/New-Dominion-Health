# Custom Fonts Setup Guide

Your site is now configured to use:
- **Chapman Medium Condensed** for all headings (h1, h2, h3, etc.)
- **Baskerville URW Medium** for all body text (paragraphs, buttons, etc.)

## Current Status

✅ Font fallbacks are already configured  
✅ Heading color set to #64767C (your custom blue)  
✅ Typography system ready  
⚠️ Commercial fonts need to be added (see below)

## How to Add Your Custom Font Files

Since Chapman and Baskerville URW are commercial fonts, you'll need to add the font files yourself.

### Step 1: Create a Fonts Folder

In your project, create:
```
/public/fonts/
```

### Step 2: Add Your Font Files

Place your font files in `/public/fonts/`:

```
/public/fonts/
  ├── chapman-medium-cond.woff2
  ├── chapman-medium-cond.woff
  ├── baskerville-urw-med.woff2
  └── baskerville-urw-med.woff
```

**Note:** `.woff2` is preferred for web (smaller file size). Include `.woff` as a fallback.

### Step 3: Update globals.css

Replace the custom fonts section in `/styles/globals.css` with:

```css
/* Custom Fonts */
@font-face {
  font-family: 'Chapman Medium Cond';
  src: url('/fonts/chapman-medium-cond.woff2') format('woff2'),
       url('/fonts/chapman-medium-cond.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Baskerville URW Med';
  src: url('/fonts/baskerville-urw-med.woff2') format('woff2'),
       url('/fonts/baskerville-urw-med.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Step 4: Remove the Google Fonts Import

Delete this line from `/styles/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap');
```

## Converting Font Files to Web Formats

If you have `.ttf` or `.otf` files, convert them to `.woff2`:

### Online Converters (Free):
1. **Font Squirrel** (recommended): https://www.fontsquirrel.com/tools/webfont-generator
   - Upload your font
   - Select "Optimal" preset
   - Download the web font kit

2. **CloudConvert**: https://cloudconvert.com/ttf-to-woff2
   - Simple drag & drop conversion

3. **Transfonter**: https://transfonter.org/
   - Upload fonts
   - Check "WOFF2" format
   - Download

## Current Fallback Fonts

If you don't add the custom fonts immediately, the site will use these fallbacks:

**For Headings (Chapman):**
- Arial Narrow
- Helvetica Condensed
- System sans-serif

**For Body Text (Baskerville URW):**
- Libre Baskerville (Google Font - already loaded)
- Baskerville
- Georgia
- System serif

## Checking Font Installation

### After Adding Fonts:

1. Open your site in browser
2. Right-click any heading → "Inspect"
3. In the "Computed" tab, look for "font-family"
4. You should see: `Chapman Medium Cond` or `Baskerville URW Med`

### Browser DevTools Check:

```javascript
// In browser console
window.getComputedStyle(document.querySelector('h1')).fontFamily
// Should return: "Chapman Medium Cond, Arial Narrow, ..."

window.getComputedStyle(document.querySelector('p')).fontFamily
// Should return: "Baskerville URW Med, Libre Baskerville, ..."
```

## File Size Optimization

### Recommended Font Formats:
- ✅ **WOFF2** (best compression, modern browsers)
- ✅ **WOFF** (fallback for older browsers)
- ❌ **TTF/OTF** (too large for web)

### Font Subset Recommendations:

If your fonts are large (>200KB), consider subsetting:
- Include only **Latin** characters if English-only
- Remove unnecessary glyphs
- Use Font Squirrel's "Expert" mode for subsetting

## License Reminder

⚠️ **Important:** Make sure you have a web license for:
- Chapman Medium Condensed
- Baskerville URW Medium

Most font licenses require separate web licensing for online use.

## Alternative: Similar Free Fonts

If you need free alternatives while waiting for font files:

### Instead of Chapman Medium Condensed:
- **Oswald** (Google Fonts)
- **Bebas Neue** (Google Fonts)
- **Roboto Condensed** (Google Fonts)

### Instead of Baskerville URW:
- **Libre Baskerville** (already loaded as fallback)
- **Crimson Text** (Google Fonts)
- **Spectral** (Google Fonts)

## Need Help?

If you run into issues:
1. Check browser console for font loading errors
2. Verify font file paths are correct
3. Ensure font files are in `/public/fonts/`
4. Clear browser cache after adding fonts

---

**Current State:** Your site is using fallback fonts but is ready to switch to custom fonts once you add the files!
