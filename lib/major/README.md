# Course Syllabus Translation Script

This script automatically translates Portuguese course syllabi to American English using the Vercel AI SDK and OpenAI's GPT-4 model.

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install ai @ai-sdk/openai tsx
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the project root with your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

Run the translation script using npm:

```bash
npm run translate-courses
```

Or directly with tsx:

```bash
npx tsx lib/major/translate.ts
```

## How it works

1. **Reads** the `data/major/courses.json` file
2. **Identifies** courses that have Portuguese syllabus (`syllabus.pt`) but missing English translation (`syllabus.en`)
3. **Translates** each Portuguese syllabus to American English using GPT-4
4. **Updates** the course data with the English translations
5. **Saves** the updated data back to the original file

## Features

- ✅ **Smart filtering**: Only translates courses that need translation
- ✅ **Error handling**: Continues processing even if individual translations fail
- ✅ **Rate limiting**: Includes delays to avoid API rate limits
- ✅ **Progress tracking**: Shows detailed progress and statistics
- ✅ **Professional translation**: Uses academic-focused prompts for accuracy

## Output

The script will:
- Show progress for each course being translated
- Display final statistics (translated count, skipped count)
- Update the `courses.json` file with English translations in the `syllabus.en` field

## Example

Before:
```json
{
  "syllabus": {
    "pt": "Representação e armazenamento de dados...",
    "en": ""
  }
}
```

After:
```json
{
  "syllabus": {
    "pt": "Representação e armazenamento de dados...",
    "en": "Data representation and storage..."
  }
}
```
