# Season of Code Platform

This repository contains the codebase to the `Amrita Season of Code (AmSoC)` platform, an open source contribution challenge organised by the `Amrita ACM Student Chapter` to encourage participation in open source development. 

Two themes have been developed for the event so far - `Winter` and `Summer`. The theme can be switched via the `NEXT_PUBLIC_THEME` environment variable along with some minor code changes, like updating the subtext and swapping between `blue-400` and `yellow-400` here and there...

![summer](/public/summer-theme/summer-theme-screenshot.png)
![winter](/public/winter-theme/winter-theme-screenshot.png)

## Technical Stack
The application is written in **Next.js** on top of **TypeScript**. The framework was chosen as it happened to be the most comfortable one at the disposal of the developers at the time of writing.

## Getting Started

### Prerequisites
Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (version 16 or higher)
- **pnpm** (version 7 or higher)

### Setup
Follow these steps to set up the project locally after cloning the repository:

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create the `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

3. Configure the theme variable in `.env`:
   ```
   NEXT_PUBLIC_THEME=WINTER  # Allowed: SUMMER or WINTER
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

## Contribution Guidelines

- Write descriptive git commit messages.
- Write clear descriptions in Pull Requests (PRs) for quicker merging.
