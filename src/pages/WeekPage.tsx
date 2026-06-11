import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import { Calendar, CheckCircle2, CircleDashed, Maximize2, Minimize2 } from 'lucide-react';
import './WeekPage.css';

type WeekData = {
  title: string;
  date: string;
  description: string;
  tasks: { text: string; done: boolean }[];
  feedback: { received: string; changed: string; tracking: string }[];
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
        { type: 'image', src: 'https://raw.githubusercontent.com/Ashutoshx7/www-v2/add-gsoc-week01-blog-ashutosh/public/assets/Images/gsoc26-ashutoshx7/aod-prompt-screen.png', alt: 'Prompt Screen with suggestion chips, template selector, and planner controls' },
        { type: 'image', src: 'https://raw.githubusercontent.com/Ashutoshx7/www-v2/add-gsoc-week01-blog-ashutosh/public/assets/Images/gsoc26-ashutoshx7/aod-studio-preview.png', alt: 'Reflective Studio with AI co-designer and learning sidebar' }
      ]
    },
    '2': {
      title: 'Generator, Mentor Feedback & Licensing',
      date: 'June 2 - June 8, 2026',
      description: 'Started building aodgenerator.py, the backend generator that turns a structured activity spec into a real Sugar Activity. This week also converted Walter\'s Week 1 review into concrete product changes: learner-centered template categories and a proper license selector.',
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
        { type: 'image', src: 'https://raw.githubusercontent.com/Ashutoshx7/www-v2/add-gsoc-week02-blog-ashutosh/public/assets/Images/gsoc26-ashutoshx7/aod-templates-creation.png', alt: 'Prompt Screen with learner-centered template categories' },
        { type: 'image', src: 'https://raw.githubusercontent.com/Ashutoshx7/www-v2/add-gsoc-week02-blog-ashutosh/public/assets/Images/gsoc26-ashutoshx7/aod-license-bsd3.png', alt: 'Prompt Screen showing the new license selector' }
      ]
    },
    '3': {
      title: 'System Prompts & Three-Phase Testing',
      date: 'June 9 - June 15, 2026',
      description: 'Designed the modular system prompt, wired the LLM pipeline, and turned Walter\'s testing question into a three-phase validation strategy. The work moved Activity on Demand from a prototype generator toward something that can be trusted, reviewed, and measured.',
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
        </section>

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
