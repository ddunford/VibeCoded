# AI Development Tools

A collection of three powerful AI-powered tools showcasing different aspects of AI and coding capabilities.

## Tools Overview

1. AI Writing Assistant (like a stripped-down Notion AI)
   - Use case: Generate blog posts, emails, meeting notes
   - Stack: Ollama (LLaMA 3 / Mistral), React frontend with a markdown editor
   - Demo power: Show prompt tuning, streaming response, and role-based context (e.g. "Write like a CTO")
   - [Documentation](.cursor/rules/docs/01-ai-writer/)

2. Content Summarizer for URLs or PDFs
   - Use case: Paste a link or upload a doc, get a summary
   - Stack: Ollama + Puppeteer (for scraping) or PDF.js, plus a frontend file drop
   - Demo power: Shows text extraction + summarisation + chunked context management
   - [Documentation](.cursor/rules/docs/02-content-summarizer/)

3. Code Explainer
   - Use case: Paste code, get explanations or docstrings
   - Stack: Ollama with a coder-focused model (e.g. CodeLLaMA), syntax-highlighted editor UI
   - Demo power: Highlights how models handle technical context
   - [Documentation](.cursor/rules/docs/03-code-explainer/)

## Using Cursor to Generate Projects

### Prerequisites
1. Install [Cursor](https://cursor.sh/)
2. Install [Ollama](https://ollama.ai/)
3. Have Node.js (v16 or higher) installed

### Generating Projects with Cursor

1. **Project Initialization**
   ```bash
   # Create a new directory for your project
   mkdir ai-tools
   cd ai-tools
   
   # Initialize git repository
   git init
   ```

2. **Using Cursor's AI Features**
   - Open the project in Cursor
   - Use `/edit` command to create new files
   - Use `/chat` to discuss implementation details
   - Use `/search` to find relevant code patterns

3. **Project Generation Steps**
   ```bash
   # Example: Generate the AI Writer project
   mkdir 01-ai-writer
   cd 01-ai-writer
   
   # In Cursor, use these commands:
   /edit package.json    # Create package.json
   /edit vite.config.ts  # Create Vite config
   /edit tsconfig.json   # Create TypeScript config
   ```

4. **Cursor Commands for Development**
   - `/explain` - Get explanations of code
   - `/test` - Generate test cases
   - `/doc` - Generate documentation
   - `/refactor` - Suggest code improvements

### Best Practices with Cursor

1. **Project Structure**
   - Use clear directory organization
   - Keep related files together
   - Use consistent naming conventions

2. **Code Generation**
   - Break down complex features into smaller tasks
   - Use specific prompts for better results
   - Review generated code before committing

3. **Documentation**
   - Generate documentation as you code
   - Keep README files up to date
   - Document API endpoints and configurations

4. **Version Control**
   - Commit changes frequently
   - Use meaningful commit messages
   - Keep .gitignore updated

### Common Cursor Commands

```bash
# Generate new component
/edit src/components/NewComponent.tsx

# Create documentation
/doc src/components/NewComponent.tsx

# Generate tests
/test src/components/NewComponent.tsx

# Refactor code
/refactor src/components/NewComponent.tsx
```

### Troubleshooting

1. **Code Generation Issues**
   - Be specific in your prompts
   - Break down complex requests
   - Use examples when possible

2. **Performance Tips**
   - Keep files focused and modular
   - Use TypeScript for better type safety
   - Follow React best practices

3. **Common Problems**
   - If generation fails, try breaking down the request
   - For complex features, generate in smaller chunks
   - Use the chat feature for clarification

## Documentation Structure

Each tool has its own documentation directory with the following structure:
- `architecture.md`: System design and technical details
- `setup.md`: Installation and configuration guide
- `usage.md`: User guide and best practices

## Getting Started

1. Choose a tool from the list above
2. Navigate to its documentation directory
3. Follow the setup guide
4. Start using the tool!

## Common Requirements

All tools require:
- Node.js (v16 or higher)
- Ollama installed and running
- Git

## Contributing

Feel free to contribute to any of the tools by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## License

MIT License - See LICENSE file for details

