# 7 Essential Agent Skills for Vibe Coding
## Complete Guide with Download Instructions & Use Cases

**Author:** Based on Sean Kochel's research  
**Date:** February 2026  
**Video Source:** [7 Claude Skills For Vibe Coding Glory](https://youtu.be/maabARKJ94o)

---

## Table of Contents
1. [Brainstorming Skill](#1-brainstorming-skill)
2. [Git Worktrees Skill](#2-git-worktrees-skill)
3. [Systematic Debugging Skill](#3-systematic-debugging-skill)
4. [React Best Practices Skill](#4-react-best-practices-skill)
5. [Security Scanning Skills](#5-security-scanning-skills)
6. [Browser Automation Skill](#6-browser-automation-skill)
7. [Writing Skills Skill](#7-writing-skills-skill)
8. [Installation Guide](#installation-guide)
9. [Quick Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## 1. Brainstorming Skill

### Overview
The most important skill for vibe coding—helps you plan before building. Transforms you from "vibe coder bro" to "vibe engineer."

### What It Does
- Explores intent, requirements, and system design before implementation
- Asks clarifying questions to understand what you really want to build
- Creates implementation summaries that can be passed to other systems
- Prevents the "mindless coding" trap

### Best Use Cases
✅ **Starting new features** - Plan architecture before coding  
✅ **Complex system changes** - Understand implications of major refactors  
✅ **Unclear requirements** - Clarify what you actually want to build  
✅ **Team collaboration** - Document design decisions  
✅ **API design** - Think through endpoints before implementation  

### When NOT to Use
❌ Simple bug fixes  
❌ Minor text changes  
❌ Well-defined tasks with clear requirements  

### Example Prompt
```
Help me brainstorm changing this app into a three-panel layout. 
On the right third, I want a command-style window where users can 
load additional context (competitor videos, PDFs, viral threads).
From there, users can plan videos, see plans, and track todos.
```

### Download & Installation
**Repository:** https://github.com/obra/superpowers  
**Direct Link:** https://github.com/obra/superpowers/tree/main/skills/brainstorming

**Installation Steps:**
1. Clone the repository: `git clone https://github.com/obra/superpowers.git`
2. Navigate to skills folder: `cd superpowers/skills/brainstorming`
3. Copy the skill files to your AI tool's skills directory
4. For Claude Code: Place in `~/.config/claude/skills/` (Mac/Linux) or `%APPDATA%\Claude\skills\` (Windows)

---

## 2. Git Worktrees Skill

### Overview
Creates isolated work environments for parallel development. Used internally at Anthropic by the Claude Code team—the #1 productivity hack.

### What It Does
- Creates separate working directories from the same repository
- Allows multiple agents to work simultaneously without conflicts
- Prevents agents from overwriting each other's work
- Enables parallel feature development, bug fixes, and experiments

### Best Use Cases
✅ **Parallel feature development** - Multiple features at once  
✅ **Bug fixes while developing** - Don't interrupt feature work  
✅ **Experimental branches** - Test ideas without affecting main work  
✅ **Multi-agent workflows** - 3-5 agents working simultaneously  
✅ **Code review prep** - Keep main branch clean while testing  

### When NOT to Use
❌ Simple, single-task projects  
❌ Quick prototypes  
❌ When you're working sequentially on one thing  

### Example Prompt
```
Create a git worktree for the new-authentication-system branch 
so I can work on the auth feature while the main project continues 
on the dashboard improvements.
```

### Technical Details
- Worktrees share the same repository but have separate working directories
- Located in `.worktrees/` directory by default
- Each worktree has its own branch and can be on different commits
- Changes don't affect main project until merged

### Download & Installation
**Repository:** https://github.com/obra/superpowers  
**Direct Link:** https://github.com/obra/superpowers/tree/main/skills/using-git-worktrees

**Installation Steps:**
1. Clone: `git clone https://github.com/obra/superpowers.git`
2. Navigate: `cd superpowers/skills/using-git-worktrees`
3. Copy skill files to your AI tool's skills directory

**Prerequisites:**
- Git 2.5+ (worktrees introduced in Git 2.5)
- Check version: `git --version`

---

## 3. Systematic Debugging Skill

### Overview
The best method for fixing broken code decisively. Uses a multi-stage systematic process instead of random fixes.

### What It Does
**4-Stage Process:**
1. **Root Cause Analysis** - Understand what's actually broken
2. **Pattern Recognition** - Identify underlying patterns causing the issue
3. **Hypothesis Formation** - Develop testable theories about the problem
4. **Fix Implementation & Testing** - Apply and validate the solution

### Best Use Cases
✅ **Debugging death spirals** - When you've tried everything  
✅ **Complex bugs** - Multiple interacting systems  
✅ **Intermittent issues** - Problems that come and go  
✅ **Legacy code problems** - Unfamiliar codebases  
✅ **Performance issues** - Slow or hanging applications  
✅ **Integration bugs** - Issues between components  

### When NOT to Use
❌ Syntax errors (obvious fixes)  
❌ Simple typos  
❌ Well-understood bugs with clear solutions  

### Example Prompt
```
Use the systematic debugging skill to help me fix this problem: 
When I select an option from the ChatSelector component, it's not 
passing through the context properly to the agent. It should 
automatically include the selected item's data.
```

### Why It Works
- More thorough than "fix this bug"
- Prevents band-aid solutions
- Documents the debugging process
- Reduces back-and-forth iterations

### Download & Installation
**Repository:** https://github.com/obra/superpowers  
**Direct Link:** https://github.com/obra/superpowers/tree/main/skills/systematic-debugging

**Installation Steps:**
1. Clone: `git clone https://github.com/obra/superpowers.git`
2. Navigate: `cd superpowers/skills/systematic-debugging`
3. Copy to skills directory

---

## 4. React Best Practices Skill

### Overview
Official audit tool from Vercel (creators of Next.js). Scans your React/Next.js projects against industry best practices.

### What It Does
- Audits entire project against Vercel's engineering standards
- Identifies performance bottlenecks
- Checks for common anti-patterns
- Categorizes issues by severity (Critical, High, Medium, Low)
- Provides specific recommendations and fixes

### Best Use Cases
✅ **Pre-deployment audits** - Before going live  
✅ **Performance optimization** - Find slow code  
✅ **Code review preparation** - Clean up before PRs  
✅ **Learning best practices** - Educational tool  
✅ **Legacy code cleanup** - Modernize old projects  
✅ **Bundle size optimization** - Reduce load times  

### When NOT to Use
❌ Non-React projects (use framework-specific alternatives)  
❌ During active development (wait for feature completion)  
❌ Prototypes that won't go to production  

### Common Issues Found
- Improper image optimization
- Inefficient imports (importing entire libraries)
- Missing loading states
- Poor error handling
- Unoptimized fonts
- Client-side rendering when SSR would be better

### Example Prompt
```
Run the Vercel React best practices audit on my project and 
prioritize the top 5 issues I should fix before deployment.
```

### Alternative Tools
- **Vue.js:** Vue official style guide checker
- **Angular:** Angular ESLint rules
- **Svelte:** Svelte-check
- **General:** ESLint with recommended configs

### Download & Installation
**Repository:** https://github.com/vercel-labs/agent-skills  
**Direct Link:** https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices

**Installation Steps:**
1. Clone: `git clone https://github.com/vercel-labs/agent-skills.git`
2. Navigate: `cd agent-skills/skills/react-best-practices`
3. Copy to skills directory

**Requirements:**
- React 16.8+ or Next.js 12+
- Node.js 16+

---

## 5. Security Scanning Skills

### Overview
Collection of 5 security-focused skills in one plugin. Helps identify obvious security gaps before they become problems.

### What It Does
**Five Integrated Skills:**
1. **Static Code Analysis** - Scans for security vulnerabilities in code
2. **Dependency Scanning** - Checks npm/yarn packages for known CVEs
3. **Security Best Practices** - Audits against OWASP Top 10
4. **Rate Limiting Check** - Ensures API endpoints are protected
5. **Auth/Authorization Review** - Validates authentication patterns

### Best Use Cases
✅ **Pre-deployment security check** - Before going live  
✅ **Regular security audits** - Monthly or quarterly reviews  
✅ **After adding dependencies** - Check new packages  
✅ **API endpoint review** - Ensure proper protection  
✅ **Compliance requirements** - Meet security standards  
✅ **Open source projects** - Public code needs extra scrutiny  

### When NOT to Use
❌ Not a replacement for professional security audits  
❌ Won't catch sophisticated attacks  
❌ Can't test runtime vulnerabilities  

### Common Issues Found
- Missing rate limiting on endpoints
- Exposed API keys or secrets in code
- Vulnerable dependencies (outdated packages)
- Weak password policies
- Missing CSRF protection
- Improper input validation
- SQL injection vulnerabilities
- XSS attack vectors

### Example Prompt
```
Run a static security analysis on my codebase and give me 
a prioritized list of vulnerabilities to fix, starting with 
critical issues.
```

### Severity Levels
- **Critical:** Immediate fix required (exposed secrets, SQL injection)
- **High:** Fix within days (missing rate limiting, weak auth)
- **Medium:** Fix within weeks (outdated dependencies)
- **Low:** Fix when convenient (code quality improvements)

### Download & Installation
**Repository:** https://github.com/wshobson/agents  
**Direct Link:** https://github.com/wshobson/agents/tree/main/plugins/security-scanning/skills

**Installation Steps:**
1. Clone: `git clone https://github.com/wshobson/agents.git`
2. Navigate: `cd agents/plugins/security-scanning/skills`
3. Copy all skill files to your skills directory

**Additional Tools to Install:**
- `npm audit` (built into npm)
- `snyk` (optional): `npm install -g snyk`
- `eslint-plugin-security`: `npm install --save-dev eslint-plugin-security`

---

## 6. Browser Automation Skill

### Overview
Gives AI agents access to a real browser. Most powerful skill outside pure coding—applicable to many workflows beyond development.

### What It Does
- Launches headless Chrome/Firefox
- Navigates websites like a human
- Logs into accounts (with credentials)
- Fills forms and clicks buttons
- Takes screenshots for analysis
- Scrapes dynamic content
- Performs automated testing

### Best Use Cases
✅ **Automated UI testing** - Test user flows end-to-end  
✅ **Self-correcting UX/UI** - Screenshot → grade → fix loop  
✅ **Design system audits** - Compare against style guides  
✅ **Web scraping** - When APIs don't exist  
✅ **Form filling automation** - Repetitive data entry  
✅ **Competitor analysis** - Automated research  
✅ **Accessibility testing** - Check WCAG compliance  
✅ **Screenshot documentation** - Auto-generate docs  

### When NOT to Use
❌ Simple static website scraping (use crawler instead)  
❌ When APIs are available (APIs are faster/more reliable)  
❌ Violating terms of service  

### Example Prompts
```
Use the agent browser skill to analyze my app and critique 
the implementation against Material Design principles.
```

```
Navigate to my staging site, log in with test credentials, 
complete the checkout flow, and report any UI issues.
```

```
Take screenshots of the dashboard in mobile, tablet, and 
desktop views, then suggest improvements for responsive design.
```

### Advanced Workflows
1. **Self-Correcting UI:**
   - Take screenshot → AI grades design → Makes fixes → Repeat
   
2. **Automated Regression Testing:**
   - Browser runs through critical paths → Screenshots → Compare to baseline
   
3. **Competitive Analysis:**
   - Scrape competitor sites → Extract features → Generate comparison report

### Technical Capabilities
- JavaScript execution
- Cookie/session management
- File uploads/downloads
- Network request interception
- Performance profiling
- Multi-page navigation

### Download & Installation
**Repository:** https://github.com/vercel-labs/agent-browser  
**Direct Link:** https://github.com/vercel-labs/agent-browser/tree/main/skills/agent-browser

**Installation Steps:**
1. Clone: `git clone https://github.com/vercel-labs/agent-browser.git`
2. Navigate: `cd agent-browser/skills/agent-browser`
3. Install dependencies: `npm install`
4. Copy skill files to your skills directory

**Requirements:**
- Node.js 18+
- Playwright or Puppeteer
- Chromium/Chrome browser

**Setup Playwright:**
```bash
npm install -D @playwright/test
npx playwright install
```

---

## 7. Writing Skills Skill

### Overview
The most meta skill—uses test-driven development to create better skills. If you only use one skill, use this one.

### What It Does
**Test-Driven Skill Creation:**
1. **Baseline Test** - Measures AI performance WITHOUT the skill
2. **Skill Creation** - Builds the skill based on requirements
3. **Effectiveness Test** - Measures performance WITH the skill
4. **Gap Analysis** - Identifies where skill falls short
5. **Iterative Refinement** - Improves skill to close gaps

### Why It's Different
Most skill creators just format text into skill syntax. This one actually validates that skills accomplish their goals through empirical testing.

### Best Use Cases
✅ **Repetitive tasks** - Anything you do >3 times/week  
✅ **Opinionated workflows** - Your specific way of doing things  
✅ **Team standards** - Enforce coding conventions  
✅ **Complex processes** - Multi-step procedures  
✅ **Custom debugging** - Your troubleshooting approach  
✅ **Domain-specific tasks** - Industry-specific workflows  

### When NOT to Use
❌ One-off tasks  
❌ Tasks that change frequently  
❌ Very simple operations (not worth the overhead)  

### Example Prompts
```
Use the writing skills skill to create a custom skill for 
my API documentation workflow. I always: 1) Generate OpenAPI 
spec, 2) Create example requests, 3) Test all endpoints, 
4) Write usage guides, 5) Generate SDK code examples.
```

```
Build a skill for my code review process that checks for: 
proper error handling, consistent naming, test coverage, 
documentation, and performance considerations.
```

### The Bigger Picture
> "People who master agent loops will be powerhouse performers in the coming years—not just in vibe coding, but in everything."  
> — Sean Kochel

**Sean's Rule of Thumb:**
- Task repeated >3 times/week → Make it a skill
- Tasks benefiting from best practices → Make it a skill
- Opinionated workflows → Make it a skill

### Skills to Build
**For Developers:**
- Custom linting rules
- Component scaffolding
- API endpoint creation
- Database migration workflows
- Deployment checklists

**For Content Creators:**
- Blog post structure
- SEO optimization checklist
- Social media formatting
- Video script templates

**For Designers:**
- Design system compliance
- Asset export workflows
- Color palette generation
- Accessibility checks

### Download & Installation
**Repository:** https://github.com/obra/superpowers  
**Direct Link:** https://github.com/obra/superpowers/tree/main/skills/writing-skills

**Installation Steps:**
1. Clone: `git clone https://github.com/obra/superpowers.git`
2. Navigate: `cd superpowers/skills/writing-skills`
3. Copy to skills directory

---

## Installation Guide

### Universal Installation Process

#### Step 1: Clone Repositories
```bash
# Obra Superpowers (Skills 1, 2, 3, 7)
git clone https://github.com/obra/superpowers.git

# Vercel Agent Skills (Skill 4)
git clone https://github.com/vercel-labs/agent-skills.git

# Security Scanning (Skill 5)
git clone https://github.com/wshobson/agents.git

# Agent Browser (Skill 6)
git clone https://github.com/vercel-labs/agent-browser.git
```

#### Step 2: Locate Your AI Tool's Skills Directory

**Claude Code:**
- Mac/Linux: `~/.config/claude/skills/`
- Windows: `%APPDATA%\Claude\skills\`

**Cursor:**
- Mac/Linux: `~/.cursor/skills/`
- Windows: `%APPDATA%\Cursor\skills\`

**Generic/Custom Setup:**
- Check your AI tool's documentation
- Usually in config or settings directory

#### Step 3: Copy Skills
```bash
# Example for Claude Code on Mac
cp -r superpowers/skills/* ~/.config/claude/skills/
cp -r agent-skills/skills/* ~/.config/claude/skills/
cp -r agents/plugins/security-scanning/skills/* ~/.config/claude/skills/
cp -r agent-browser/skills/* ~/.config/claude/skills/
```

#### Step 4: Verify Installation
1. Restart your AI tool
2. Check skills list in settings
3. Test with a simple prompt: "List available skills"

### Troubleshooting

**Skills Not Showing Up:**
- Check file permissions: `chmod -R 755 ~/.config/claude/skills/`
- Ensure proper directory structure
- Restart AI tool completely

**Skills Not Working:**
- Check for missing dependencies (Node.js, Git, etc.)
- Review skill configuration files
- Check AI tool logs for errors

**Permission Errors:**
- Run with proper permissions
- Check file ownership: `chown -R $USER ~/.config/claude/skills/`

---

## Quick Reference Cheat Sheet

### By Development Phase

| Phase | Skill | Use When |
|-------|-------|----------|
| **Planning** | Brainstorming | Starting any new feature or major change |
| **Development** | Git Worktrees | Working on multiple things simultaneously |
| **Debugging** | Systematic Debugging | Stuck on complex bugs for >30 minutes |
| **Optimization** | React Best Practices | Before deployment or code review |
| **Security** | Security Scanning | Before deployment, after adding dependencies |
| **Testing** | Browser Automation | Need automated UI testing or audits |
| **Meta** | Writing Skills | Found yourself doing same task 3+ times |

### By Project Type

**Web Applications:**
- Brainstorming → Git Worktrees → React Best Practices → Security Scanning → Browser Automation

**APIs:**
- Brainstorming → Git Worktrees → Security Scanning → Systematic Debugging

**Open Source Projects:**
- All skills, especially Security Scanning and React Best Practices

**Prototypes:**
- Brainstorming → Systematic Debugging (skip optimization/security for now)

### By Team Size

**Solo Developer:**
- Priority: Brainstorming, Systematic Debugging, Writing Skills

**Small Team (2-5):**
- Add: Git Worktrees, React Best Practices

**Large Team (6+):**
- All skills, especially Browser Automation for QA

### Skill Combinations

**Power Combo #1: Complete Feature Development**
1. Brainstorming → Plan feature
2. Git Worktrees → Isolated development
3. React Best Practices → Optimize code
4. Security Scanning → Check vulnerabilities
5. Browser Automation → Test UI

**Power Combo #2: Debugging + Learning**
1. Systematic Debugging → Fix the bug
2. Writing Skills → Create skill to prevent similar bugs

**Power Combo #3: Automated QA Pipeline**
1. Browser Automation → Take screenshots + test flows
2. React Best Practices → Check code quality
3. Security Scanning → Verify security

---

## Additional Resources

### Official Documentation
- **Obra Superpowers:** https://github.com/obra/superpowers
- **Vercel Agent Skills:** https://github.com/vercel-labs/agent-skills
- **Security Scanning:** https://github.com/wshobson/agents
- **Agent Browser:** https://github.com/vercel-labs/agent-browser

### Video Tutorial
- **Original Video:** https://youtu.be/maabARKJ94o
- **Channel:** Sean Kochel (@iamseankochel)
- **Free Community:** https://www.skool.com/tech-snack

### Related Resources
- Claude Code Documentation
- Anthropic Agent Best Practices
- Test-Driven Development Guide
- Git Worktrees Official Docs: https://git-scm.com/docs/git-worktree

---

## License & Attribution

This guide is based on Sean Kochel's video "7 Claude Skills For Vibe Coding Glory"

All skills are open source with their own respective licenses:
- Obra Superpowers: Check repository for license
- Vercel Agent Skills: Check repository for license  
- Security Scanning: Check repository for license
- Agent Browser: Check repository for license

---

## Updates & Community

**Stay Updated:**
- Star the repositories on GitHub for updates
- Follow Sean Kochel on YouTube for new skills
- Join the free community for discussions

**Contributing:**
- Submit issues to respective GitHub repositories
- Contribute improvements via pull requests
- Share your custom skills with the community

---

**Last Updated:** February 2026  
**Version:** 1.0  
**Maintained by:** Genspark AI Assistant

---

## Final Thoughts

Remember Sean's key insight:

> "There's this misconception that vibe coding means you're just doing things mindlessly. That's simply not true. The brainstorming skill helps us obliterate that claim by helping us explore intent and requirements before implementation."

These seven skills transform you from a "vibe coder bro" into a "vibe engineer" who:
- **Plans** before coding (Brainstorming)
- **Scales** development (Git Worktrees)
- **Debugs** systematically (Systematic Debugging)
- **Optimizes** performance (React Best Practices)
- **Secures** applications (Security Scanning)
- **Automates** testing (Browser Automation)
- **Improves** continuously (Writing Skills)

Start with one skill, master it, then add the next. The compounding effect is tremendous.

**If you only use one:** Choose Writing Skills (#7)—it teaches you to build all the others tailored to your specific needs.

Happy vibe coding! 🚀
