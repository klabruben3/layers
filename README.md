# iLayers

> **Status: Experimental / No longer actively developed**

**iLayers is an open-source experiment in discovering, sharing, and reusing interface implementations.**

The original idea was to create a developer platform where useful UI solutions could be published with their source code, visually previewed, discussed, improved, and reused in other projects.

Rather than every useful interaction disappearing inside an application's codebase, iLayers explored what it would look like if those implementations could become discoverable building blocks for other developers.

---

## The Idea

Developers constantly solve small but difficult interface problems.

A swipe interaction.

A particular text animation.

A pointer gesture.

A loading sequence.

A reveal mechanic.

A responsive navigation behavior.

A transition that took considerably longer to get right than its final implementation suggests.

The finished code may only be a few dozen lines.

The work required to arrive there often isn't.

iLayers started from the idea that those solutions are worth preserving.

> **If you solved something useful once, another developer should not necessarily have to solve it from zero.**

---

## More Than Components

The original concept was inspired by component libraries and platforms such as ReactBits, but iLayers was intended to extend beyond complete visual components.

A reusable implementation might instead be:

* A React hook
* An interaction pattern
* An animation primitive
* A gesture
* A utility
* A visual effect
* A behavioral component
* A layout technique
* A small but difficult piece of interface logic

For example, something like:

```ts
usePointerReveal({
  enabled,
  open,
  ref,
  triggerAxis,
  triggerOffset,
  onReveal,
  onClose,
});
```

may not look particularly significant from its API.

Internally, however, it solves several problems:

```text
pointer input
      │
      ├── capture
      ├── movement threshold
      ├── gesture direction
      ├── axis detection
      ├── touch behaviour
      ├── interactive-element exclusion
      └── event cleanup
```

That implementation is reusable knowledge.

iLayers was intended to give code like this somewhere to live.

---

## Original Vision

The initial product was imagined as something between a component library and a developer community.

Developers could publish solutions much like posts.

Each submission could contain its implementation alongside a visual representation of the result.

Conceptually:

```text
Developer
    │
    ▼
Create implementation
    │
    ├── Source code
    ├── Description
    ├── Dependencies
    ├── Preview
    └── Usage
    │
    ▼
Publish to iLayers
    │
    ▼
Discovery
    │
    ├── Search
    ├── Browse
    ├── Save
    ├── Discuss
    ├── Fork
    └── Reuse
```

The intention was to make reusable code discoverable through what it **does**, rather than requiring another developer to already know the implementation they were searching for.

---

## Visual Discovery

One of the larger ideas behind iLayers was that interface code should be discoverable visually.

Reading the title of an animation or interaction often does not communicate what it actually feels like.

The project therefore explored generating or attaching visual previews to submissions.

The original architecture considered environments such as CodeSandbox for executing submitted code and producing previews, with experiments around images, video, and Remotion-generated representations.

A developer could theoretically browse the result first and inspect the implementation only when something was useful.

```text
Preview → Understand → Inspect → Reuse
```

rather than:

```text
Read code → Imagine behavior → Run locally → Decide
```

---

## Community Layer

iLayers also explored a social model around reusable code.

An implementation could become more useful over time through:

```text
Original implementation
        │
        ├── discussion
        ├── improvements
        ├── forks
        ├── bug reports
        ├── usage examples
        └── alternative implementations
```

The goal was not social networking for its own sake.

The community layer existed to improve the quality and usefulness of shared implementations.

---

## What Was Built

The project progressed far enough to explore both the product interface and the underlying developer/content model.

The stack included:

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Motion**
* **Remotion**
* **Prisma**
* **PostgreSQL**
* **NextAuth**

The project also became one of my earlier experiments with modelling users, content, and community relationships in a database-backed application.

Several reusable UI and interaction experiments came out of the project itself, including patterns such as:

```text
usePointerReveal
SweepText
TypeFast
RingSpin
```

Some of those ideas and implementations survived beyond iLayers and were reused or influenced later projects.

---

## Why Development Stopped

iLayers was originally intended to become one of my larger projects.

Development eventually stopped for two reasons.

### The product question was not settled early enough

Too much effort went into interface implementation, responsiveness, and polish before the core product architecture and value proposition had been sufficiently validated.

The project became increasingly refined as an interface while the more important question remained unresolved:

> **Does this need to exist as an entire platform?**

### The developer-tooling landscape changed

AI made generating one-off components and implementation ideas dramatically easier.

At the same time, component libraries and reusable-code ecosystems became increasingly capable.

That reduced the value of building another broad platform whose primary proposition was simply:

> Find some code and copy it into your project.

The cost of safely executing arbitrary community code for automatic previews also introduced significant infrastructure and isolation complexity.

For the original product direction, the trade-off stopped making sense.

---

## What Still Seems Valuable

One part of the idea remains interesting.

AI is good at generating code.

That does not mean every generated implementation is:

```text
battle-tested
accessible
responsive
touch-aware
well-abstracted
performant
maintainable
or proven inside a real application
```

There is still value in implementations that came from solving actual engineering problems.

The potentially useful version of iLayers is therefore less:

> **A social network for UI components**

and more:

> **An archive of reusable interaction knowledge.**

That could include compact implementation patterns whose value comes from the edge cases already solved inside them.

---

## A Possible Future Direction

If iLayers were ever revisited, I would narrow its focus considerably.

Instead of competing with general-purpose component libraries, it could concentrate on **interaction primitives and implementation patterns**.

An entry could describe:

```text
Pointer Reveal
─────────────────────────────

What it solves
Swipe/pointer reveal behavior

Works with
Mouse · Touch · Pen

Handles
Direction
Thresholds
Pointer capture
Interactive children
Cleanup

Framework
React

Dependencies
None

Includes
Live demo
Source
Usage
Implementation notes
Known limitations
```

The interesting question would no longer be:

> What component do you want?

It would be:

> **What behavior are you trying to implement?**

That is a much more specific problem.

---

## Open Source

iLayers is public because the project may still contain useful ideas, patterns, components, and experiments even though the original product is no longer being actively developed.

Developers are welcome to:

* Study the implementation
* Extract individual components or hooks
* Fork the project
* Rework the architecture
* Continue the original platform
* Turn it into a code registry
* Build an interaction library from it
* Take the concept in an entirely different direction

There is no requirement to preserve the original vision.

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

Some parts of the project may require additional environment configuration for authentication, database access, or other services.

Because iLayers is an experimental project rather than an actively maintained product, expect incomplete functionality and architecture representing different stages of development.

---

## Repository Status

This repository is preserved as an engineering experiment.

It should not be interpreted as a finished or production-ready platform.

The project remains public because abandoned code does not necessarily mean useless code.

Some of the most valuable things inside an unfinished project may be a single component, hook, architecture idea, interaction, or lesson that someone else can reuse.

---

## Final Thought

iLayers started with a simple observation:

> **A lot of difficult frontend work becomes invisible once it works.**

A polished interaction may take hours of experimentation and eventually collapse into a surprisingly small amount of code.

The original iLayers platform may not have been the right product for distributing that work.

The underlying idea still matters:

> **Useful implementations should be easier to discover than they were to invent.**
