import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

import { Check, ClipboardDocument } from '@/components/icons';

import type { ButtonProps } from './Button';
import { Button } from './Button';

type ClipboardButtonProps = ButtonProps & {
  clipboardText: string;
};

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({
  clipboardText,
  ...rest
}) => {
  const [_, copy] = useCopyToClipboard();
  const [copied, setCopied] = React.useState(false);

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-100 px-4 py-1 shadow">
      <div className="flex items-center gap-x-4">
        <p className="font-semibold text-blue-900">{clipboardText}</p>
        <Button
          onMouseLeave={() => setCopied(false)}
          onClick={() => {
            copy(clipboardText);
            setCopied(true);
          }}
          icon={
            copied ? (
              <Check className="size-5 text-white" />
            ) : (
              <ClipboardDocument className="size-5 text-white" />
            )
          }
          {...rest}
        />
      </div>
    </div>
  );
};
