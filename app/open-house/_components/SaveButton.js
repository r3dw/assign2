'use client';
import { useSaved } from './SavedContext';

// Secondary, toggle-style control. aria-pressed carries the state; the label and check mark repeat it.
export default function SaveButton({ id, label, kind, name }) {
  const { isSaved, toggle } = useSaved();
  const on = isSaved(id);
  return (
    <button type="button" className="btn btn-sm" aria-pressed={on} onClick={() => toggle(id, label, kind)} aria-label={`${on ? 'Remove' : 'Save'} ${name || label}`}>
      <span aria-hidden="true">{on ? '✓ Saved' : '+ Save'}</span>
    </button>
  );
}
