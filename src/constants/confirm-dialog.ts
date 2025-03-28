import type { ConfirmDialogType } from '@/types/store/dialog';

export const confirm: { [key: string]: ConfirmDialogType } = {
  delete: {
    title: 'Are you sure?',
    content:
      'Do you really want to delete this record and its nested elements? This action cannot be undone.',
    action: 'Delete',
  },
  empty: {
    title: 'Are you sure?',
    content:
      'Do you really want to empty this record? This will delete all its nested children',
    action: 'Empty',
  },
  leave: {
    title: 'Are you sure?',
    content: 'Do you really want to leave?',
    action: 'Leave',
  },
};
