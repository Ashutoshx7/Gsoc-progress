import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Calendar, CheckCircle2, CircleDashed, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import './WeekPage.css';

type WeekData = {
  title: string;
  date: string;
  description: string;
  blogUrl?: string;
  tasks: { text: string; done: boolean }[];
  feedback: { received: string; changed: string; tracking: string }[];
  architecture?: {
    intro: string;
    stages: { title: string; detail: string }[];
    loop: string;
  };
  systemPrompt?: {
    intro: string;
    image?: { src: string; alt: string };
    reviewPrompt: string;
    templatePrompts: { name: string; subtitle: string; prompt: string }[];
    blocks: { label: string; text: string; bullets: string[] }[];
  };
  media?: { type: 'youtube' | 'image'; src: string; alt?: string }[];
};

const WeekPage = () => {
  const { id } = useParams();
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);

  useEffect(() => {
    if (!isPromptExpanded) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPromptExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPromptExpanded]);

  const weekData: Record<string, WeekData> = {
    '1': {
      title: 'Frontend Architecture & Reviewable Prototype',
      date: 'May 26 - June 1, 2026',
      description: 'Built the complete GTK3 frontend first so Walter and Devin could review the full Activity on Demand flow before backend work began. The prototype covered Use, Modify, Create, the Prompt Screen, the Reflective Studio, code review, version history, and the learner-facing constructionist workflow.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-06-03-gsoc-26-ashutoshx7-week01',
      tasks: [
        { text: 'Built the Use, Modify, Create entry flow for the learner progression', done: true },
        { text: 'Implemented the Prompt Screen with suggestion chips, templates, planner, and policy controls', done: true },
        { text: 'Built the Reflective Studio with AI co-designer chat, preview, review, versions, and learning sidebar', done: true },
        { text: 'Shared a walkthrough-ready frontend so mentors could review the experience before backend integration', done: true }
      ],
      feedback: [
        {
          received: 'Walter emphasized the constructionist framing: this should not feel like a generic AI code generator. Learners should be able to use, inspect, modify, and understand what they create.',
          changed: 'I designed the Studio around challenges, reflections, annotations, code explanation, and version history instead of hiding the generated code behind a one-click output.',
          tracking: 'The progress can now be tracked through visible learner stages: Use -> Modify -> Create, then preview, review, and version comparison.'
        },
        {
          received: 'The frontend needed to be concrete enough for Walter and Devin to review before the backend was connected.',
          changed: 'I completed every major screen, panel, and button state first, then captured a walkthrough showing the intended flow from prompt to Studio.',
          tracking: 'Week 2 feedback came from this reviewable prototype, so the next changes can be traced directly back to mentor review.'
        }
      ],
      media: [
        { type: 'youtube', src: 'https://www.youtube.com/embed/ApgKoOP22is' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-prompt-screen.png', alt: 'Prompt Screen with suggestion chips, template selector, and planner controls' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-preview.png', alt: 'Reflective Studio with AI co-designer and learning sidebar' }
      ]
    },
    '2': {
      title: 'Generator, Mentor Feedback & Licensing',
      date: 'June 2 - June 8, 2026',
      description: 'Started building aodgenerator.py, the backend generator that turns a structured activity spec into a real Sugar Activity. This week also converted Walter\'s Week 1 review into concrete product changes: learner-centered template categories and a proper license selector.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-06-10-gsoc-26-ashutoshx7-week02',
      tasks: [
        { text: 'Scaffolded full Sugar Activity projects with activity/, activity.info, setup.py, activity.py, and README.md', done: true },
        { text: 'Added template-based code emission, metadata generation, and .xo bundle packaging', done: true },
        { text: 'Reworked templates from Auto, Starter, Game, Quiz into Logic & math, Tools/utilities, Games, and Creation', done: true },
        { text: 'Added license selection with LICENSE files, SPDX headers, and activity.info metadata', done: true }
      ],
      feedback: [
        {
          received: 'Walter pointed out that the Week 1 template labels were too tool-centric. Auto and Starter described the system internals, not what a learner wants to make.',
          changed: 'I replaced them with learner-centered categories: Logic & math, Tools/utilities, Games, and Creation. The generator now maps those learning goals back to internal template archetypes.',
          tracking: 'Reviewers can now track both sides of the decision: the child-facing category in the UI and the internal archetype selected by the generator.'
        },
        {
          received: 'Walter flagged that generated Sugar Activities need explicit licensing, and the Week 1 Prompt Screen did not let learners or teachers choose one.',
          changed: 'I added a license selector below the planner and policy controls, defaulted it to MIT, and included GPLv3+, Apache, AGPLv3, LGPLv3, MPL-2.0, and BSD-3 for teacher-controlled cases.',
          tracking: 'Every generated project now has a visible license decision that flows into LICENSE, SPDX headers, activity.info, and bundle metadata.'
        },
        {
          received: 'Seven license options could be too much for younger learners, but teachers still need the control.',
          changed: 'I kept MIT as the safe default and added short dynamic descriptions so the selected license explains itself without sending users to legal documents.',
          tracking: 'The default path stays simple for children, while reviewers can still verify open-source compliance from the generated files.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-templates-creation.png', alt: 'Prompt Screen with learner-centered template categories' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-license-bsd3.png', alt: 'Prompt Screen showing the new license selector' }
      ]
    },
    '3': {
      title: 'System Prompts & Three-Phase Testing',
      date: 'June 9 - June 15, 2026',
      description: 'Designed the modular system prompt, wired the LLM pipeline, and turned Walter\'s testing question into a three-phase validation strategy. The work moved Activity on Demand from a prototype generator toward something that can be trusted, reviewed, and measured.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-06-17-gsoc-26-ashutoshx7-week03',
      tasks: [
        { text: 'Designed a modular system prompt that tells the model to build Sugar Activities, not generic Python apps', done: true },
        { text: 'Wire up end-to-end LLM pipeline', done: true },
        { text: 'Define 3-phase testing strategy', done: true },
        { text: 'Test 10 prompts across 4 different LLMs', done: true }
      ],
      feedback: [
        {
          received: 'Walter asked the hard question: how will we test whether generated activities are actually good, installable, safe, and useful for learning?',
          changed: 'I designed a three-phase strategy: manual model comparison, small-group user testing, and automated validation for AST parsing, imports, bundle structure, licensing, and safety checks.',
          tracking: 'Progress is now measurable at each quality level: model output, generated code, and learner experience.'
        },
        {
          received: 'Early prompt attempts were too long, and models ignored important Sugar-specific constraints.',
          changed: 'I split the system prompt into modular blocks with critical constraints at the top and category-specific blocks injected only when relevant.',
          tracking: 'Each generated activity can now be traced back to the exact prompt blocks, template category, provider, and validation path used to create it.'
        }
      ],
      systemPrompt: {
        intro: 'The Week 3 system prompt is the control layer between a child\'s idea and a safe Sugar Activity bundle. It gives the model Sugar-specific context, constrains the output shape, and keeps the generated code aligned with constructionist learning instead of producing a generic desktop app.',
        image: {
          src: '/gsoc26-ashutoshx7/aod-templates-creation.png',
          alt: 'Prompt Screen controls showing Template, Planner, and Policy choices'
        },
        reviewPrompt: `You are the Sugar Activity on Demand planner.

Your job is to turn a learner's idea into a structured Sugar Activity specification, ready to be expanded into an installable Sugar Activity bundle.
Generate a Sugar Activity for Sugar OS / Sugar desktop, not a generic Python, GTK, or web app.

Runtime constraints:
- Use Python 3, PyGObject (GTK3), and the Sugar toolkit (sugar3).
- The main class must extend sugar3.activity.activity.Activity. Do not use Gtk.Application, Gtk.Window, or a bare Gtk widget as the app root.
- Build the toolbar with sugar3.graphics.toolbarbox.ToolbarBox, sugar3.activity.widgets.ActivityToolbarButton, and sugar3.activity.widgets.StopButton.
- Use sugar3.graphics.style for spacing, fonts, and zoom-aware sizing instead of hardcoded pixel values.
- Use sugar3.graphics.xocolor.XoColor (from the learner's profile when available) for icon and canvas colors.
- Respect Sugar bundle structure: activity/activity.py, activity/activity.info, setup.py, icons/, MANIFEST, and .xo packaging.
- Use Activity.read_file() and Activity.write_file() for Journal persistence; never write to arbitrary paths on disk.
- Treat collaboration (sugar3.presence, Telepathy) as optional: only include it if the learner's idea explicitly needs sharing or co-play, and the single-player path must work fully without it.

Learner context:
- The activity should support constructionist learning: Use, Modify, Create.
- The generated code should be simple enough for a learner to inspect and remix.
- Include learner-facing hints, reflection prompts, and safe modification points when useful.

Prompt Screen controls:
- Mode: Make, Play, or Share.
- Template: Logic & math, Tools/utilities, Games, or Creation.
- Planner: Default, RAG, or Validate.
- Policy: Standard, Local, or Strict.
- License: selected SPDX-compatible license.

Template behavior:
- If Template = Logic & math, inject the Logic & math template module.
- If Template = Tools/utilities, inject the Tools/utilities template module.
- If Template = Games, inject the Games template module.
- If Template = Creation, inject the Creation template module.

Template module: Logic & math
- Build puzzles, patterns, quizzes, number sense, geometry, sorting, sequencing, or reasoning activities.
- Include clear rules, immediate feedback, hints, and a visible explanation of why an answer is correct.
- Prefer simple state models: current_problem, attempts, score, level, and completed_rounds.
- Good Sugar widgets: Gtk.Grid, Gtk.Box, Gtk.Label, Gtk.Button, Gtk.Entry, simple canvas drawing when visual reasoning helps.
- Learning goal should focus on reasoning, not just getting a score.

Template module: Tools/utilities
- Build practical classroom helpers: timers, counters, checklists, organizers, flashcards, note helpers, or simple data trackers.
- Keep the interface calm, direct, and useful for repeated classroom use.
- Include save/load behavior when learner-created data should persist in the Journal.
- Prefer clear toolbar actions: New, Save, Reset, Export, or Share when appropriate.
- Learning goal should focus on making a useful tool and understanding how it works.

Template module: Games
- Build a replayable activity with a loop, goal, rules, feedback, and a satisfying end state.
- Include score, progress, level, round, or lives only when they support learning.
- Keep mechanics age-appropriate and avoid fast reflex-only gameplay unless requested.
- Prefer deterministic logic that is easy for a learner to inspect and modify.
- Learning goal should connect the game mechanic to a concept or skill.

Template module: Creation
- Build expressive activities for drawing, writing, storytelling, composing, building, or remixing.
- Include a blank canvas or starter object that invites modification.
- Prioritize learner ownership: title, colors, characters, labels, story text, or created artifacts.
- Include Journal persistence for saved creations when possible.
- Learning goal should focus on expression, reflection, and iteration.

Output contract:
Return a single ActivitySpec JSON object, with no extra prose, matching this shape:
- name (string): human-readable activity title.
- bundle_id (string): reverse-DNS bundle identifier, e.g. org.sugarlabs.LearnerIdeaActivity.
- summary (string): one to two sentences describing what the activity does.
- learner_goal (string): the constructionist learning goal (Use, Modify, Create framing).
- age_range (string): approximate target age range, e.g. "6-10".
- template_category (string): one of "Logic & math", "Tools/utilities", "Games", "Creation".
- files_to_generate (array of objects): each with path (string) and purpose (string), covering at minimum activity/activity.py, activity/activity.info, setup.py, and an icon under icons/.
- activity_info (object): name, bundle_id, exec, icon, activity_version, license fields for activity.info.
- required_assets (array of strings): icon files, fonts, sounds, or images the bundle needs.
- journal_behavior (string): how read_file()/write_file() are used, or "none" if the activity has no persistence.
- safe_edit_regions (array of strings): named places in the generated code a learner can safely change (e.g. colors, word lists, level data).
- reflection_prompts (array of strings): one to three questions that invite the learner to reflect on what they built or played.
- validation_notes (array of strings): anything the validator should pay special attention to for this activity.
- license (string): SPDX identifier matching the requested License control.
- warnings (array of strings): empty if the request is fully safe; otherwise explains what was changed or omitted and why.

Safety rules:
- Do not generate subprocess, os.system, eval, exec, or dynamic code execution of any kind.
- Do not generate filesystem access outside the activity's own bundle directory and the Journal API.
- Do not generate network calls (sockets, urllib, requests, http.client) unless Policy = Standard explicitly allows an online feature the learner asked for; never include network access under Policy = Local or Strict.
- Do not import modules outside the Sugar/GTK/Python standard library allowlist.
- Do not collect, store, or transmit personally identifiable information about the learner.
- If the learner request cannot be implemented safely within these constraints, return a warning describing the conflict and propose the closest safe alternative instead of silently dropping the unsafe part.

Validation expectations:
- Generated Python must parse with AST with no syntax errors.
- Imports must pass the Sugar allowlist check.
- activity/activity.info and setup.py must be present and internally consistent (matching bundle_id, exec, and icon).
- License metadata, SPDX headers in source files, and the LICENSE file must all match the selected license.
- Bundle output must be installable as a .xo activity on Sugar OS / Sugar desktop without manual edits.`,
        templatePrompts: [
          {
            name: 'Logic & math',
            subtitle: 'Puzzles, patterns, reasoning',
            prompt: `When Template = Logic & math:
Generate a Sugar Activity that helps a learner reason through puzzles, patterns, numbers, shapes, sorting, sequencing, or quiz-style thinking.
The activity should include clear rules, immediate feedback, hints, and an explanation path so the learner understands why an answer works.
Prefer inspectable state such as current_problem, attempts, score, level, and completed_rounds.
Use simple GTK3/Sugar widgets like Gtk.Grid, Gtk.Box, Gtk.Label, Gtk.Button, and Gtk.Entry. Use canvas drawing only when it makes the math idea clearer.
The learning goal must be reasoning-first, not score-first.`
          },
          {
            name: 'Tools/utilities',
            subtitle: 'Build helpful tools',
            prompt: `When Template = Tools/utilities:
Generate a practical Sugar Activity that helps a learner or classroom do something useful: timer, counter, checklist, flashcards, organizer, note helper, or data tracker.
Keep the UI calm, direct, and reusable. Prefer obvious toolbar actions such as New, Save, Reset, Export, or Share when they make sense.
If the learner creates data, include Journal persistence through read_file() and write_file().
The generated code should separate data state from UI rendering so learners can modify the tool safely.
The learning goal must explain both what the tool does and what the learner can change.`
          },
          {
            name: 'Games',
            subtitle: 'Play loops and score',
            prompt: `When Template = Games:
Generate a replayable Sugar Activity with a clear play loop, rules, feedback, and an end state.
Use score, level, round, timer, or lives only when they support the learning goal.
Avoid fast reflex-only mechanics unless the learner explicitly asks for them. Prefer deterministic logic that is easy to inspect and remix.
Include simple ways for the learner to modify difficulty, labels, prompts, colors, or rules.
The learning goal must connect the game mechanic to a concept or skill, not just entertainment.`
          },
          {
            name: 'Creation',
            subtitle: 'Make and express',
            prompt: `When Template = Creation:
Generate an expressive Sugar Activity for drawing, writing, storytelling, composing, building, or remixing.
Start from a blank canvas, starter object, or editable prompt that invites learner ownership.
Prioritize things the learner can personalize: title, colors, characters, labels, story text, shapes, sounds, or created artifacts.
Include Journal persistence when the learner's creation should be saved.
The learning goal must focus on expression, reflection, and iteration.`
          }
        ],
        blocks: [
          {
            label: 'Prompt screen inputs',
            text: 'These controls are the visible UI inputs that feed the system prompt before the model generates a Sugar Activity spec.',
            bullets: [
              'Mode: Make, Play, and Share define whether the learner is creating, trying, or preparing an XO bundle.',
              'Template: Logic & math, Tools/utilities, Games, and Creation inject learner-centered activity goals into the prompt.',
              'Planner: Default, RAG, and Validate decide whether to use a balanced plan, Sugar examples, or AST safety checks.',
              'Policy: Standard, Local, and Strict decide cloud/local provider behavior and kid-safe limits.'
            ]
          },
          {
            label: 'Model role',
            text: 'The model is instructed to behave like a Sugar Activity planner and code generator for Activity on Demand.',
            bullets: [
              'Generate Sugar Activities for learners and teachers.',
              'Prefer simple, readable Python that a learner can inspect and modify.',
              'Explain generated structure in child-friendly language when the Studio asks for review help.'
            ]
          },
          {
            label: 'Sugar runtime context',
            text: 'The prompt gives the model concrete Sugar OS / Sugar desktop constraints so it does not drift into generic GTK or web app patterns.',
            bullets: [
              'Use Python 3, PyGObject (GTK3), and the Sugar toolkit through sugar3.activity.activity.Activity.',
              'Do not use Gtk.Application, Gtk.Window, or a bare widget as the app root; generated classes must extend Activity.',
              'Build the toolbar with ToolbarBox, ActivityToolbarButton, and StopButton, and use sugar3.graphics.style and XoColor instead of hardcoded styling.',
              'Respect Sugar bundle structure: activity/activity.py, activity/activity.info, setup.py, icons/, MANIFEST, and .xo packaging.',
              'Support Journal behavior through Activity.read_file() and Activity.write_file() where the template needs persistence; collaboration via sugar3.presence stays optional.'
            ]
          },
          {
            label: 'Constructionist learning context',
            text: 'The prompt keeps the Use -> Modify -> Create learning path visible in the generated spec.',
            bullets: [
              'Generated activities should be things learners can play with, inspect, and remix.',
              'Template choices map to learner goals: Logic & math, Tools/utilities, Games, and Creation.',
              'The output should include places for challenges, reflections, annotations, and version history notes.'
            ]
          },
          {
            label: 'Output contract',
            text: 'The model is asked for a single structured ActivitySpec JSON object first, so the generator can create predictable files instead of accepting arbitrary code blobs.',
            bullets: [
              'Return name, bundle_id, summary, learner_goal, age_range, template_category, files_to_generate, activity_info, required_assets, journal_behavior, safe_edit_regions, reflection_prompts, validation_notes, and license.',
              'Separate planner reasoning from generated source files; files_to_generate must always include activity/activity.py, activity/activity.info, setup.py, and an icon.',
              'Always include a warnings field, populated when a request cannot be safely implemented inside Sugar constraints.'
            ]
          },
          {
            label: 'Validation and safety area',
            text: 'The prompt is paired with validation checks before anything becomes an installable .xo bundle.',
            bullets: [
              'Parse generated Python with AST before packaging; reject syntax errors outright.',
              'Reject forbidden imports, subprocess/eval/exec, filesystem access outside the bundle and Journal API, and any network calls under Local/Strict policy.',
              'Check activity.info, setup.py, bundle structure, SPDX headers, and LICENSE consistency against the requested license.',
              'Use retry-on-validation so the model fixes specific failures instead of silently shipping broken or unsafe code.'
            ]
          }
        ]
      }
    },
    '4': {
      title: 'Automated Validation & AST Parsing',
      date: 'June 16 - June 22, 2026',
      description: 'Finalized the Phase 1 model comparison (Claude won) and built the Automated Validation Pipeline. This pipeline acts as a safety bouncer, using Python\'s ast module to statically analyze the generated code for syntax errors, forbidden imports, and structure before bundling the .xo file.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-06-25-gsoc-26-ashutoshx7-week04',
      tasks: [
        { text: 'Concluded Phase 1 model comparison and selected Claude as the default LLM', done: true },
        { text: 'Built the Automated Validation Pipeline using Python\'s ast module', done: true },
        { text: 'Implemented import whitelisting and structure validation checks', done: true },
        { text: 'Generated 10 test prompts successfully end-to-end into installable .xo bundles', done: true },
        { text: 'Started integrating the RAG context layer with real Sugar Activity code', done: true }
      ],
      feedback: [
        {
          received: 'Walter stressed the importance of ensuring the LLM does not generate malicious or unsafe code (e.g. subprocess calls or file system traversal) for children.',
          changed: 'I implemented strict AST parsing to whitelist safe imports and reject any unsafe modules like os or subprocess. If caught, it triggers a self-healing regeneration loop.',
          tracking: 'The automated validation acts as a strict programmatic guardrail that is checked before any .xo bundle is even created.'
        },
        {
          received: 'The LLM sometimes forgot the precise GTK3 constraints for Sugar, despite the system prompt instructions.',
          changed: 'I introduced a lightweight RAG (Retrieval-Augmented Generation) layer that feeds real snippets of vetted Sugar Activities to the model right when it needs them.',
          tracking: 'The UI generation quality improved significantly because the model now has a perfect reference for complex API calls.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-validation-toggle.png', alt: 'Validation controls for checking generated Sugar activities before packaging' }
      ]
    },
    '5': {
      title: 'Provider Controls, Optional Validation & Flatpak',
      date: 'June 23 - June 29, 2026',
      description: 'Turned the working generation pipeline into something other people could configure and install. I added a provider panel, separated quick preview checks from mandatory bundle checks, packaged the studio as a Flatpak, and completed a stability pass before wider user testing.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-07-01-gsoc-26-ashutoshx7-week05',
      tasks: [
        { text: 'Added provider, API key, model, and local endpoint controls to the Prompt Screen', done: true },
        { text: 'Made complete preview validation optional without weakening mandatory bundle-time safety checks', done: true },
        { text: 'Created a Flatpak manifest and a testable installable bundle', done: true },
        { text: 'Normalized provider and malformed-response errors into useful messages', done: true },
        { text: 'Hardened worker-thread UI updates and persisted provider settings', done: true }
      ],
      feedback: [
        {
          received: 'When I considered removing slower checks, Walter pushed me to keep the safety and make the speed versus validation choice visible instead.',
          changed: 'I split validation into a skippable preview stage and a mandatory bundle stage. Fast preview never became a path around the final safety checks.',
          tracking: 'The interface states the selected validation mode, while every installable bundle still passes AST, import, structure, and license checks.'
        },
        {
          received: 'Mentors and testers needed a way to run the studio without recreating my complete Sugar development environment.',
          changed: 'I packaged the application as a Flatpak and resolved the Sugar toolkit and GTK dependencies inside its sandbox.',
          tracking: 'The project could now be handed to a tester as one installable bundle instead of a setup guide and a source checkout.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-validation-toggle.png', alt: 'Prompt Screen with provider settings and the optional preview validation control' }
      ]
    },
    '6': {
      title: 'User Testing, Prompt Enhancement & Standalone Move',
      date: 'June 30 - July 6, 2026',
      description: 'Started small-group testing and learned that real users often begin with only two or three words. I added visible prompt enhancement and local retrieval over installed Sugar activities, then moved Activity on Demand out of the Sugar shell fork into a standalone project.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-07-08-gsoc-26-ashutoshx7-week06',
      tasks: [
        { text: 'Ran the first Phase 2 sessions with Sugar contributors and a teacher', done: true },
        { text: 'Added explicit and automatic prompt enhancement for short ideas', done: true },
        { text: 'Kept the enhanced brief visible and editable before generation', done: true },
        { text: 'Added local retrieval over installed Sugar activities for real implementation patterns', done: true },
        { text: 'Extracted the studio into its own repository and added a test that forbids jarabe imports', done: true }
      ],
      feedback: [
        {
          received: 'Testers typed short ideas such as math game, typing practice, and a game about planets. My carefully written private prompts had hidden this normal behavior.',
          changed: 'I added an enhancement step that expands a thin prompt into a useful activity brief while showing every addition back to the learner.',
          tracking: 'Detailed prompts remain untouched, short prompts receive help, and the learner can edit or reject the enhanced brief before generation.'
        },
        {
          received: 'Walter advised me to stop narrating the test and watch what people naturally did.',
          changed: 'I treated observed behavior as product input and focused the week on the prompt experience rather than blaming weak results on the model.',
          tracking: 'Testing notes now connect each repeated point of confusion to a concrete change in enhancement, retrieval, or interface behavior.'
        },
        {
          received: 'The original shell-embedded version was difficult for anyone outside a Sugar development checkout to try or contribute to.',
          changed: 'I separated the project by domain into core, llm, generation, service, preview, exports, and ui modules.',
          tracking: 'A no-jarabe test protects the standalone boundary, while the Sugar toolkit remains the supported integration layer.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-prompt-screen.png', alt: 'Prompt Screen where a learner can enhance a short idea before generation' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-modify-create.png', alt: 'Activity on Demand running as a standalone studio with a Sugar-style home ring' }
      ]
    },
    '7': {
      title: 'Runtime Checks, Self-Repair & Behavior Critique',
      date: 'July 7 - July 13, 2026',
      description: 'Closed the gap between code that parses and an activity that actually works. I built an isolated GTK runtime gate, turned tracebacks into focused repair feedback, checked Journal persistence, and added a critic that reviews reachable behavior before packaging.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-07-15-gsoc-26-ashutoshx7-week07',
      tasks: [
        { text: 'Ran every candidate in a separate GTK subprocess with a hard timeout', done: true },
        { text: 'Pumped GTK events and tested a Journal write and read round-trip', done: true },
        { text: 'Converted runtime failures into structured feedback for a self-healing retry', done: true },
        { text: 'Added a behavior critic for handlers, win logic, and real saved state', done: true },
        { text: 'Required every critic patch to pass static and runtime checks again', done: true }
      ],
      feedback: [
        {
          received: 'A tester generated an activity that passed every static check and then crashed as soon as it opened.',
          changed: 'I stopped treating valid source as proof and added a runtime harness that actually starts the activity and exercises its first lifecycle steps.',
          tracking: 'Runtime status, tracebacks, Journal results, and critic outcomes are saved with the generation job.'
        },
        {
          received: 'Generated code is untrusted and a crash or infinite initialization loop must not freeze the studio itself.',
          changed: 'Candidates run outside the studio process with a minimal environment, a strict timeout, and clean handling for headless systems.',
          tracking: 'A failed process becomes a rejected gate with repair feedback, not a frozen interface or a broken accepted revision.'
        }
      ],
      architecture: {
        intro: 'The debugging layer asks a different question at each stage. A failure loops back as focused evidence, while a passing candidate moves forward to packaging.',
        stages: [
          { title: 'Learner idea', detail: 'Enhance the prompt, retrieve Sugar patterns, and build a plan.' },
          { title: 'Generate', detail: 'Create one complete activity candidate from the structured plan.' },
          { title: 'Static gate', detail: 'Check syntax, imports, bundle structure, safety, and request fidelity.' },
          { title: 'Runtime gate', detail: 'Start the activity in an isolated GTK process and test Journal persistence.' },
          { title: 'Behavior critic', detail: 'Review handlers, feedback, delayed state, and reachable game outcomes.' },
          { title: 'Accepted project', detail: 'Keep the source, metadata, diagnostics, and package-ready revision.' }
        ],
        loop: 'When a gate finds a focused problem, a transactional SEARCH/REPLACE repair is applied and the candidate starts the checks again. If the patch fails, the last working source is preserved.'
      }
    },
    '8': {
      title: 'Live Refinement, Packaging & First Release',
      date: 'July 14 - July 20, 2026',
      description: 'With the generation engine becoming dependable, I focused on what a learner touches. The studio gained click-to-refine, safe focused patches, full revision history, generated Sugar icons, an AppImage, and its first public release under Sugar Labs.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-07-22-gsoc-26-ashutoshx7-week08',
      tasks: [
        { text: 'Added click-to-refine so a learner can point at the preview and request a focused change', done: true },
        { text: 'Applied refinements as SEARCH/REPLACE patches instead of complete regeneration', done: true },
        { text: 'Saved every accepted change as a revision with source comparison', done: true },
        { text: 'Generated sanitized Sugar-style SVG icons with a deterministic fallback', done: true },
        { text: 'Built the portable AppImage and published v1.1.0 under Sugar Labs', done: true }
      ],
      feedback: [
        {
          received: 'A small requested change should not erase the parts of an activity that already work.',
          changed: 'Refinement now uses exact focused patches, rejects ambiguous replacements, and keeps the previous revision available.',
          tracking: 'The Versions screen records every accepted refinement and shows the precise source diff between revisions.'
        },
        {
          received: 'Testers needed the lowest-friction way possible to run the studio on a normal Linux desktop.',
          changed: 'I added a portable AppImage alongside source and Flatpak installation paths.',
          tracking: 'v1.1.0 provided a tagged public release and downloadable build that somebody could try without a development checkout.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-versions.png', alt: 'Versions view showing saved revisions and an exact source diff' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-preview.png', alt: 'Generated Sugar activity running in the live preview' }
      ]
    },
    '9': {
      title: 'Release Testing, Annotation & Activity Naming',
      date: 'July 21 - July 27, 2026',
      description: 'Put v1.1.0 in front of real users, including Walter, and watched them create and refine activities. Their feedback led to a visual annotation flow and exposed a simple but important omission: learners had no clear place to name what they made.',
      blogUrl: 'https://www.sugarlabs.org/news/all/2026-07-29-gsoc-26-ashutoshx7-week09',
      tasks: [
        { text: 'Tested the release with people creating real activities rather than prepared demos', done: true },
        { text: 'Observed Walter build and refine a Periodic Table Explorer', done: true },
        { text: 'Added annotations that carry a selected preview location into the refinement request', done: true },
        { text: 'Converted the missing activity-name control into a concrete follow-up task', done: true },
        { text: 'Kept the test, learn, patch, and retest loop moving through the release', done: true }
      ],
      feedback: [
        {
          received: 'Walter liked the generated activity but could not find a place to name it, so the chosen name felt random.',
          changed: 'I documented the complete naming flow needed before installation and export, which became the basis for the Week 11 community contribution.',
          tracking: 'The issue stayed connected to the exact testing session and was later closed by the merged naming pull request.'
        },
        {
          received: 'When people describe a desired change, they naturally point at the part of the screen they mean.',
          changed: 'I added an annotation flow that combines the selected preview region with the learner\'s written refinement.',
          tracking: 'Refinement requests now preserve both the instruction and the visual location that gave it meaning.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-preview.png', alt: 'A generated activity running during the v1.1.0 testing round' }
      ]
    },
    '10': {
      title: 'Multiple Learning Areas, Sugar-Native Icons & Images',
      date: 'July 28 - August 3, 2026',
      description: 'Expanded activity ideas beyond one category, redesigned all learning-area icons after Walter\'s feedback, cleaned up preview and version review, and let learners attach sketches, worksheets, photographs, or screenshots as visual references.',
      blogUrl: 'https://github.com/sugarlabs/www-v2/pull/1036',
      tasks: [
        { text: 'Carried multiple learning areas through storage, clarification, enhancement, planning, and generation', done: true },
        { text: 'Redesigned six learning-area icons using Sugar artwork conventions', done: true },
        { text: 'Simplified the common creation path and clarified preview and revision states', done: true },
        { text: 'Added visual-reference previews, provider capability checks, and safe fallbacks', done: true },
        { text: 'Published v1.2.0 and v1.3.0 with the completed improvements', done: true }
      ],
      feedback: [
        {
          received: 'Walter said the category icons communicated their meaning but still looked generic rather than native to Sugar.',
          changed: 'I rebuilt the set around Sugar\'s simple silhouettes, rounded strokes, and strong outlines, then added clear color variants for a desktop environment.',
          tracking: 'The final selector shows one consistent visual family across Logic and Math, Science, Language, Tools, Games, and Creation.'
        },
        {
          received: 'Learner choices looked important on screen but could lose their meaning later in the generation pipeline.',
          changed: 'I traced learning areas through every handoff and added coverage for saving, reopening, clarifying, enhancing, and generating.',
          tracking: 'Tests now verify that all selected learning areas reach the final activity specification and prompt.'
        },
        {
          received: 'A reference image could overpower the written request or fail unexpectedly on a text-only provider.',
          changed: 'I kept the learner\'s words primary, isolated provider-specific image handling, and added a fallback when vision is unavailable.',
          tracking: 'The studio reports image capability before generation and keeps the typed idea as the source of truth.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-sugar-native-learning-areas.png', alt: 'Sugar-native learning-area icons created after Walter feedback' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-versions.png', alt: 'Improved Versions view with saved revisions and source changes' }
      ]
    },
    '11': {
      title: 'Mockup to Activity, Branding & Community Review',
      date: 'August 4 - August 10, 2026',
      description: 'Tested the visual-reference workflow by turning a detailed symmetry-garden mockup into a running Sugar activity. I also reviewed the first larger outside contributions, giving the studio its own icon and closing the activity naming problem found during Week 9 testing.',
      blogUrl: 'https://github.com/sugarlabs/www-v2/pull/1037',
      tasks: [
        { text: 'Used the symmetry-garden mockup as an end-to-end visual-reference test', done: true },
        { text: 'Verified symmetry modes, drawing tools, colors, challenges, and requirement tracking in the generated result', done: true },
        { text: 'Reviewed and merged PR #13 for the Sugar Activity Studio icon and desktop identity', done: true },
        { text: 'Reviewed and merged PR #14 for naming before installation and export', done: true },
        { text: 'Tested Sugar and desktop SVG behavior, dialog order, theme styling, and the complete naming flow', done: true }
      ],
      feedback: [
        {
          received: 'Walter\'s Periodic Table Explorer test showed that activity naming had to be a learner decision, not a random generated detail.',
          changed: 'The final flow asks for the activity name first and handles licensing as a separate decision before installation or export.',
          tracking: 'Tests follow the selected name through the dialogs, project metadata, installation, and exported bundle.'
        },
        {
          received: 'Rakshit Yadav contributed both the studio identity and the naming feature, each of which needed several review rounds.',
          changed: 'I reviewed the whole user journey and explained the reason behind requested changes instead of reviewing only the changed lines.',
          tracking: 'PRs #13 and #14 merged with tests and consistent behavior across the Sugar shell and regular Linux desktop.'
        },
        {
          received: 'The generated symmetry activity was not a pixel copy of the mockup.',
          changed: 'I evaluated it by the intended interactions and used the revision tools for visual refinement instead of treating the first generation as final.',
          tracking: 'The mockup and running result remain together as a direct record of what the visual workflow understood and what still needed iteration.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-symmetry-garden-mockup.png', alt: 'Original wireframe mockup for the symmetry-garden activity' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-symmetry-garden-result.png', alt: 'Generated Sugar symmetry activity running a butterfly-wings challenge' },
        { type: 'image', src: '/gsoc26-ashutoshx7/sugar-aod-studio.svg', alt: 'Sugar Activity Studio icon contributed by Rakshit Yadav' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-license-bsd3.png', alt: 'License choice shown after the learner confirms the activity name' }
      ]
    },
    '12': {
      title: 'Final Reliability Pass, Reflection & v1.4.0',
      date: 'August 11 - August 20, 2026',
      description: 'Used the final week to close gaps across the complete learner journey. I strengthened request fidelity, tested delayed behavior, added deterministic Sugar API repairs, protected refinements, improved reflection prompts, reviewed community fixes, and released v1.4.0.',
      blogUrl: 'https://github.com/sugarlabs/www-v2/pull/1038',
      tasks: [
        { text: 'Kept the learner\'s original request and mechanics visible through clarification, retrieval, planning, and generation', done: true },
        { text: 'Extended the runtime harness to exercise delayed callbacks and later activity states', done: true },
        { text: 'Added deterministic repairs for known Sugar API mistakes with complete revalidation', done: true },
        { text: 'Preserved learner-approved refinements and stored diagnostics with every revision', done: true },
        { text: 'Redesigned Activity Tools around short and optional reflection prompts', done: true },
        { text: 'Reviewed community PRs #16, #17, and #19 and released v1.4.0', done: true }
      ],
      feedback: [
        {
          received: 'An activity can open successfully and still fail when a timer fires or a later game state is reached.',
          changed: 'I kept GTK events moving for longer and extended the runtime and critic checks to delayed callbacks and reachable states.',
          tracking: 'A candidate must now survive more than startup before it can be treated as a dependable activity.'
        },
        {
          received: 'A repair could solve a crash while accidentally removing the learner\'s newest refinement.',
          changed: 'I made the latest learner-approved revision the transaction base and kept revision-specific diagnostics and rollback.',
          tracking: 'Every repair either preserves the refined behavior and passes all gates or leaves the previous working revision untouched.'
        },
        {
          received: 'An empty refinement box expected learners to already know what kind of feedback to give.',
          changed: 'I added short reflection questions about what the learner notices, wants to change, or could make clearer and more fun.',
          tracking: 'The prompts remain optional and support learner decisions instead of turning reflection into another required form.'
        }
      ],
      media: [
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-review.png', alt: 'Review view with generated source and guided reflection prompts' },
        { type: 'image', src: '/gsoc26-ashutoshx7/aod-studio-versions.png', alt: 'Versions view preserving learner refinements and source differences' },
        { type: 'image', src: '/gsoc26-ashutoshx7/sugar-activity-studio-banner.png', alt: 'Sugar Activity Studio final create, preview, refine, and export workflow' }
      ]
    }
  };

  const data = weekData[id as string];

  if (!data) {
    return (
      <div className="week-page animate-in">
        <div className="content-section empty-section">
          <h2>Week not found</h2>
        </div>
      </div>
    );
  }

  const completedTasks = data.tasks.filter((task) => task.done).length;
  const feedbackCount = data.feedback.length;
  const status = completedTasks === data.tasks.length ? 'Complete' : 'In progress';
  const summary = [
    { value: `Week ${id}`, label: 'Sprint' },
    { value: status, label: 'Status' },
    { value: `${completedTasks}/${data.tasks.length}`, label: 'Deliverables' },
    { value: String(feedbackCount), label: 'Feedback items' },
  ];

  const expandedPromptReader =
    data.systemPrompt && isPromptExpanded && typeof document !== 'undefined'
      ? createPortal(
          <div className="prompt-reader-layer">
            <button
              aria-label="Close expanded system prompt"
              className="prompt-reader-backdrop"
              type="button"
              onClick={() => setIsPromptExpanded(false)}
            />
            <div
              aria-label="Expanded system prompt reader"
              aria-modal="true"
              className="review-prompt review-prompt-expanded"
              role="dialog"
            >
              <div className="review-prompt-header">
                <span>Reviewable System Prompt Draft</span>
                <button
                  aria-label="Shrink system prompt"
                  aria-pressed="true"
                  className="prompt-size-toggle"
                  title="Shrink prompt"
                  type="button"
                  onClick={() => setIsPromptExpanded(false)}
                >
                  <Minimize2 size={15} />
                </button>
              </div>
              <pre tabIndex={0}>{data.systemPrompt.reviewPrompt}</pre>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
    <article className="week-page animate-in">
      <header className="page-header" id="week-intro" data-index-title={`Week ${id}`}>
        <div className="page-heading">
          <div className="header-badge">Week {id}</div>
          <h1 className="page-title">{data.title}</h1>
          <div className="page-meta">
            <Calendar size={16} />
            <span>{data.date}</span>
          </div>
        </div>
      </header>

      <section
        className="summary-grid"
        id="week-summary"
        data-index-title="Summary"
        aria-label="Week summary"
      >
        {summary.map((item) => (
          <div className="summary-cell" key={item.label}>
            <p>{item.value}</p>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <div className="content-stack">
        <section className="content-section" id="week-overview" data-index-title="Overview">
          <h2>Overview</h2>
          <p className="description-text">{data.description}</p>
          {data.blogUrl && (
            <a
              className="week-blog-link"
              href={data.blogUrl}
              target="_blank"
              rel="noreferrer"
            >
              Read the original weekly blog
              <ExternalLink size={14} />
            </a>
          )}
        </section>

        {data.architecture && (
          <section
            className="content-section architecture-section"
            id="week-architecture"
            data-index-title="Architecture"
          >
            <h2>Architecture</h2>
            <p className="description-text">{data.architecture.intro}</p>
            <div className="architecture-flow" aria-label="Activity generation and validation flow">
              {data.architecture.stages.map((stage, index) => (
                <div className="architecture-step-wrap" key={stage.title}>
                  <article className="architecture-stage">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{stage.title}</h3>
                      <p>{stage.detail}</p>
                    </div>
                  </article>
                  {index < data.architecture!.stages.length - 1 && (
                    <div className="architecture-arrow" aria-hidden="true">↓</div>
                  )}
                </div>
              ))}
            </div>
            <p className="architecture-loop">{data.architecture.loop}</p>
          </section>
        )}

        {data.systemPrompt && (
          <section
            className="content-section system-prompt-section"
            id="week-system-prompt"
            data-index-title="System Prompt"
          >
            <h2>System Prompt</h2>
            <p className="description-text">{data.systemPrompt.intro}</p>
            <div className="review-prompt">
              <div className="review-prompt-header">
                <span>Reviewable System Prompt Draft</span>
                <button
                  aria-label="Expand system prompt"
                  aria-pressed="false"
                  className="prompt-size-toggle"
                  title="Expand prompt"
                  type="button"
                  onClick={() => setIsPromptExpanded(true)}
                >
                  <Maximize2 size={15} />
                </button>
              </div>
              <pre tabIndex={0}>{data.systemPrompt.reviewPrompt}</pre>
            </div>
            <div className="template-prompt-grid">
              {data.systemPrompt.templatePrompts.map((template) => (
                <article className="template-prompt" key={template.name}>
                  <span>{template.name}</span>
                  <p>{template.subtitle}</p>
                  <pre>{template.prompt}</pre>
                </article>
              ))}
            </div>
            {data.systemPrompt.image && (
              <figure className="prompt-figure">
                <img
                  src={data.systemPrompt.image.src}
                  alt={data.systemPrompt.image.alt}
                />
              </figure>
            )}
            <div className="prompt-block-grid">
              {data.systemPrompt.blocks.map((block) => (
                <article className="prompt-block" key={block.label}>
                  <span>{block.label}</span>
                  <p>{block.text}</p>
                  <ul>
                    {block.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        <section
          className="content-section"
          id="week-deliverables"
          data-index-title="Key Deliverables"
        >
          <h2>Key Deliverables</h2>
          <ul className="task-list">
            {data.tasks.map((task, idx) => (
              <li key={idx} className={`task-item ${task.done ? 'task-done' : ''}`}>
                {task.done ? (
                  <CheckCircle2 className="task-icon done" size={20} />
                ) : (
                  <CircleDashed className="task-icon pending" size={20} />
                )}
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="content-section feedback-section"
          id="week-feedback"
          data-index-title="Feedback Loop"
        >
          <h2>Feedback Loop</h2>
          <div className="feedback-list">
            {data.feedback.map((item, idx) => (
              <article className="feedback-item" key={idx}>
                <div>
                  <span>Received</span>
                  <p>{item.received}</p>
                </div>
                <div>
                  <span>Changed</span>
                  <p>{item.changed}</p>
                </div>
                <div>
                  <span>Tracking</span>
                  <p>{item.tracking}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      {data.media && data.media.length > 0 && (
        <section
          className="content-section media-section"
          id="week-media"
          data-index-title="Media & Screenshots"
        >
          <h2>Media & Screenshots</h2>
          <div className="media-grid">
            {data.media.map((m, idx) => (
              <div key={idx} className="media-item">
                {m.type === 'youtube' ? (
                  <iframe 
                    width="100%" 
                    height="400" 
                    src={m.src} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="media-iframe"
                  ></iframe>
                ) : (
                  <img src={m.src} alt={m.alt || 'Screenshot'} className="media-image" />
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
    {expandedPromptReader}
    </>
  );
};

export default WeekPage;
