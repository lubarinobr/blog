# Automatic Language Detection

This site now automatically detects and redirects users to their preferred language version.

## How It Works

### 1. **First-Time Visitors**
When someone visits the site for the first time:
- The system detects their browser's language preference (`navigator.language`)
- If the browser language is supported (pt, en, or es), they're automatically redirected
- If not supported, they see the default Portuguese version
- Their preference is stored in `localStorage`

### 2. **Returning Visitors**
When someone returns to the site:
- The system checks their stored language preference
- They're automatically redirected to their preferred language
- No detection happens again unless they clear their browser data

### 3. **Manual Override**
Users can override automatic detection by:
- Using the language selector on the site
- Adding `?lang=xx` or `?locale=xx` to the URL
- This will update their stored preference

## Technical Implementation

### Language Detection Script
Located in: `src/layouts/BaseLayout.astro` (lines 156-234)

The script runs immediately on page load (before content renders) to prevent any "flash" of the wrong language.

**Priority Order:**
1. **URL Parameters** (`?lang=xx`) - Highest priority
2. **Stored Preference** (localStorage) - Second priority
3. **Browser Language** (navigator.language) - Fallback for first-time visitors
4. **Default** (Portuguese) - Final fallback

### Supported Locales
- `pt` - Portuguese (Brazil) - **Default**
- `en` - English (United States)
- `es` - Spanish (Spain)

### Storage
- **Key**: `preferred-locale`
- **Location**: Browser's `localStorage`
- **Value**: One of: `pt`, `en`, `es`

## SEO Configuration

### hreflang Tags
Each page includes proper hreflang tags for all language versions:

```html
<link rel="alternate" hreflang="pt-BR" href="https://sapiensit.com/..." />
<link rel="alternate" hreflang="en-US" href="https://sapiensit.com/en/..." />
<link rel="alternate" hreflang="es-ES" href="https://sapiensit.com/es/..." />
<link rel="alternate" hreflang="x-default" href="https://sapiensit.com/" />
```

### x-default
The `x-default` hreflang points to the root domain (`https://sapiensit.com/`), which:
- Tells search engines which version to show when the user's language is unknown
- Points to the Portuguese version (since it's the default locale)
- Helps with international SEO

**Note**: `x-default` does NOT automatically detect language - it's just a hint for search engines. The actual automatic detection is done by the JavaScript.

## Utility Functions

### For Components

```typescript
import { switchToLocale, clearLocalePreference } from '@/utils/i18n';

// Switch to a specific language
switchToLocale('en'); // Redirects to English version

// Clear stored preference (useful for testing)
clearLocalePreference();
```

### For Language Selectors

Use the `switchToLocale()` function in your language selector component:

```tsx
<button onClick={() => switchToLocale('en')}>
  English
</button>
```

## Testing

### Test Different Languages

1. **Clear your preference:**
   ```javascript
   localStorage.removeItem('preferred-locale');
   ```

2. **Change browser language:**
   - Chrome: Settings → Languages → Add languages
   - Firefox: Settings → Language → Choose language
   - Safari: System Preferences → Language & Region

3. **Use URL parameters:**
   ```
   https://sapiensit.com/?lang=en
   https://sapiensit.com/?locale=es
   ```

### Test Scenarios

- ✅ First visit with English browser → Redirects to `/en/`
- ✅ First visit with Spanish browser → Redirects to `/es/`
- ✅ First visit with French browser → Shows `/` (Portuguese default)
- ✅ Return visit → Uses stored preference
- ✅ Manual language switch → Updates preference
- ✅ URL with `?lang=en` → Overrides everything

## Browser Compatibility

The language detection works on all modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Graceful Degradation:**
- If JavaScript is disabled, users see the URL they requested
- If localStorage is unavailable, detection still works (just won't persist)

## Performance

- **No Flash**: Script runs inline in `<head>` before content renders
- **Instant Redirect**: Uses `window.location.replace()` for immediate navigation
- **Minimal Overhead**: ~2KB of inline JavaScript
- **No External Dependencies**: Pure vanilla JavaScript

## Future Enhancements

Potential improvements:
- [ ] Add more languages (fr, de, it, etc.)
- [ ] Detect region-specific variants (pt-PT vs pt-BR)
- [ ] A/B testing for default language
- [ ] Analytics tracking for language preferences
- [ ] Server-side detection (if migrating to SSR)
