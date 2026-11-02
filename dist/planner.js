(() => {
  'use strict';

  const root = document.querySelector('#project-planner');
  if (!root) return;

  const steps = [
    {
      key: 'project',
      label: 'Your project',
      title: 'What brings you here?',
      intro: 'Choose the starting point that feels closest. You can change it later.',
      choices: [
        { value: 'repair', title: 'Get something working', description: 'A system issue, an unexpected noise, or comfort that has changed.' },
        { value: 'replacement', title: 'Plan a replacement', description: 'Explore a new system or a different approach to heating and cooling.' },
        { value: 'comfort', title: 'Improve everyday comfort', description: 'Focus on the rooms, airflow, or air quality in your home.' }
      ]
    },
    {
      key: 'priority',
      label: 'Your priority',
      title: 'What matters most right now?',
      intro: 'Pick one priority to give the conversation a useful starting point.',
      choices: [
        { value: 'working', title: 'A working system', description: 'Get help with heating or cooling that is not doing its job.' },
        { value: 'quiet', title: 'A quieter home', description: 'Talk about equipment noise and what you notice day to day.' },
        { value: 'even', title: 'More even temperatures', description: 'Discuss rooms that feel too warm, too cold, or hard to balance.' },
        { value: 'air', title: 'Better indoor air', description: 'Explore airflow, filtration, and other indoor comfort options.' }
      ]
    },
    {
      key: 'timing',
      label: 'Your timing',
      title: 'When would you like to start?',
      intro: 'This is a preference for the conversation, not a reserved appointment.',
      choices: [
        { value: 'soon', title: 'As soon as practical', description: 'I would like to discuss the next available option.' },
        { value: 'weeks', title: 'In the next few weeks', description: 'I have some flexibility and want to make a plan.' },
        { value: 'planning', title: 'I’m planning ahead', description: 'I am gathering information before making a decision.' }
      ]
    }
  ];

  const selections = { project: null, priority: null, timing: null };
  const initialProject = new URLSearchParams(window.location.search).get('project');
  if (steps[0].choices.some(choice => choice.value === initialProject)) {
    selections.project = initialProject;
  }
  let currentStep = 0;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function selectedChoice(step) {
    return step.choices.find(choice => choice.value === selections[step.key]);
  }

  function makeButton(text, classes, handler) {
    const button = el('button', classes, text);
    button.type = 'button';
    button.addEventListener('click', handler);
    return button;
  }

  function progress() {
    const list = el('ol', 'planner-progress');
    list.setAttribute('aria-label', 'Project planner progress');
    steps.forEach((step, index) => {
      const item = el('li', index < currentStep ? 'complete' : index === currentStep ? 'active' : '');
      if (index === currentStep) item.setAttribute('aria-current', 'step');
      item.append(el('span', 'planner-progress-number', String(index + 1).padStart(2, '0')));
      item.append(el('span', '', step.label));
      list.append(item);
    });
    return list;
  }

  function announceHeading(heading, shouldFocus) {
    heading.tabIndex = -1;
    if (shouldFocus) {
      root.scrollIntoView({ block: 'start', behavior: 'auto' });
      heading.focus({ preventScroll: true });
    }
  }

  function render(shouldFocus = true) {
    root.replaceChildren();
    root.dataset.plannerReady = 'true';
    root.append(progress());

    if (currentStep >= steps.length) {
      renderSummary(shouldFocus);
      return;
    }

    const step = steps[currentStep];
    const stage = el('div', 'planner-step');
    stage.append(el('p', 'planner-kicker', `STEP ${currentStep + 1} OF ${steps.length}`));
    const heading = el('h3', '', step.title);
    heading.id = 'planner-step-heading';
    stage.append(heading, el('p', 'planner-intro', step.intro));
    const choices = el('div', 'choice-grid');
    choices.setAttribute('role', 'group');
    choices.setAttribute('aria-labelledby', heading.id);

    const next = makeButton(currentStep === steps.length - 1 ? 'Review my project ↗' : 'Continue →', 'button', () => {
      if (!selectedChoice(step)) return;
      currentStep += 1;
      render();
    });
    next.disabled = !selectedChoice(step);

    step.choices.forEach((choice, index) => {
      const button = makeButton('', 'choice-card', () => {
        selections[step.key] = choice.value;
        choices.querySelectorAll('button').forEach(option => {
          const selected = option === button;
          option.setAttribute('aria-pressed', String(selected));
          option.classList.toggle('selected', selected);
        });
        next.disabled = false;
      });
      button.dataset.value = choice.value;
      const selected = selections[step.key] === choice.value;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('selected', selected);
      button.append(el('span', 'choice-index', String(index + 1).padStart(2, '0')));
      button.append(el('strong', 'choice-title', choice.title));
      button.append(el('span', 'choice-description', choice.description));
      const mark = el('span', 'choice-mark', '✓');
      mark.setAttribute('aria-hidden', 'true');
      button.append(mark);
      choices.append(button);
    });

    const actions = el('div', 'planner-actions');
    if (currentStep > 0) {
      actions.append(makeButton('← Back', 'button button-outline', () => {
        currentStep -= 1;
        render();
      }));
    } else {
      actions.append(el('p', 'planner-hint', 'Three quick choices. No contact details needed.'));
    }
    actions.append(next);
    stage.append(choices, actions);
    root.append(stage);
    announceHeading(heading, shouldFocus);
  }

  function renderSummary(shouldFocus) {
    const summary = el('div', 'planner-summary');
    summary.append(el('p', 'planner-kicker', 'YOUR STARTING POINT'));
    const heading = el('h3', '', 'Your project, at a glance.');
    summary.append(heading);
    summary.append(el('p', 'planner-intro', 'A useful brief for a real conversation. These choices describe your goals; they do not diagnose your system.'));

    const list = el('dl', 'planner-summary-list');
    steps.forEach((step, index) => {
      const item = el('div', 'planner-summary-item');
      const choice = selectedChoice(step);
      item.append(el('dt', '', step.label));
      item.append(el('dd', '', choice ? choice.title : 'Not selected'));
      const edit = makeButton('Edit', 'planner-edit', () => {
        currentStep = index;
        render();
      });
      edit.setAttribute('aria-label', `Edit ${step.label.toLowerCase()}`);
      item.append(edit);
      list.append(item);
    });
    summary.append(list);

    const query = new URLSearchParams();
    steps.forEach(step => query.set(step.key, selections[step.key]));
    const actions = el('div', 'planner-actions');
    const requestLink = el('a', 'button', 'Use this in my request ↗');
    requestLink.href = `request.html?${query.toString()}`;
    const downloadStatus = el('p', 'planner-download-status');
    downloadStatus.setAttribute('role', 'status');
    downloadStatus.setAttribute('aria-live', 'polite');
    const download = makeButton('Download my brief ↓', 'button button-outline', () => {
      const lines = [
        'VECTOR CLIMATE — PROJECT BRIEF',
        '',
        ...steps.map(step => `${step.label}: ${selectedChoice(step).title}`),
        '',
        'Questions to discuss:',
        '• What should be assessed in my home?',
        '• What options fit my priorities?',
        '• What is included in the proposed work?',
        '',
        'This fictional website concept provides a conversation starter, not a diagnosis, quote, or confirmed appointment.',
        'No contact information was requested, sent, or stored by the planner.'
      ];
      const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = el('a');
      link.href = url;
      link.download = 'vector-climate-project-brief.txt';
      link.hidden = true;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      downloadStatus.textContent = 'Your project brief is ready to download.';
    });
    actions.append(requestLink, download);
    summary.append(actions, downloadStatus);
    const restart = makeButton('Start over', 'planner-restart', () => {
      Object.keys(selections).forEach(key => { selections[key] = null; });
      currentStep = 0;
      render();
    });
    summary.append(restart);
    root.append(summary);
    announceHeading(heading, shouldFocus);
  }

  render(false);
})();
