interface Step {
  title: string;
  body: string;
}

/**
 * A short process as points along a path: a row on wide screens, a column on
 * narrow ones. The connecting line is drawn in CSS, so it adds nothing for a
 * screen reader beyond the ordered list itself.
 */
export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="pathway-steps">
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="ruled-list__num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{step.title}</h3>
          <p className="muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
