# shadcn/ui Documentation

## Introduction

shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. It works with various frameworks and AI models. Open Source. Open Code.

**This is not a component library. It is how you build your component library.**

## Core Principles

- **Open Code:** The top layer of your component code is open for modification.
- **Composition:** Every component uses a common, composable interface, making them predictable.
- **Distribution:** A flat-file schema and command-line tool make it easy to distribute components.
- **Beautiful Defaults:** Carefully chosen default styles, so you get great design out-of-the-box.
- **AI-Ready:** Open code for LLMs to read, understand, and improve.

## Installation

### For Next.js

```bash
npx shadcn-ui@latest init
```

When prompted, select your preferences:

- Style (Default/New York)
- Color (slate, gray, zinc, neutral, stone)
- CSS variables for colors? (yes/no)
- Global CSS (src/app/globals.css)
- CSS import (src/app/globals.css)
- Base color (slate)
- Include project tailwind.config.js? (yes/no)
- tailwind.config.js path (tailwind.config.js)
- components.json path (components.json)

### For Vite or other frameworks

```bash
npx shadcn-ui@latest init
```

Select the appropriate framework when prompted.

## Adding Components

After initialization, you can add components:

```bash
npx shadcn-ui@latest add button
```

This adds the button component to your project. You can then customize it to fit your needs.

Available components include:

- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Avatar
- Badge
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- and many more

## Usage Example

```tsx
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<div>
			<Button variant="outline">Click me</Button>
		</div>
	);
}
```

## Customization

You can customize any component by editing the code directly. Since the components are in your project, you have full control over them.

## Resources

- [Official Documentation](https://ui.shadcn.com/docs)
- [GitHub Repository](https://github.com/shadcn/ui)
