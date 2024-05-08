import { useEffect, useState } from 'react';

import { Dialog, Loading, Table } from '@/components/common';
import { groupColumns } from '@/components/common/Tables';
import { confirm } from '@/constants/confirm-dialog';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { GroupApiType } from '@/types/common/api';
import type { ConfirmDialogType } from '@/types/store/dialog';
import { GroupFormType } from '@/types/common/group';

const Index = () => {
  const [group, setGroup] = useState<GroupFormType | null>(null);

  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);
  const { token } = useStore((state) => state.auth)
  const {
    groups,
    loading,
    getGroups,
    deleteGroup,
    createGroup,
    updateGroup,
  } = useStore((state) => state.group);

  useEffect(() => {
    getGroups(token as string);
  }, [getGroups, token]);

  if (loading) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage>
      <Table.Table<GroupApiType>
        title="Groups"
        data={groups}
        columns={(columnHelper) =>
          groupColumns({
            columnHelper,
            onDelete: (id: string) => {
              setOpen('confirm-delete');
              setOnConfirm(() => deleteGroup(token as string, id));
            },
            onEdit: (gr) => {
              setGroup(gr);
              setOpen('group');
              setOnConfirm((groupp: GroupApiType) => {
                updateGroup(token as string, groupp);
                setGroup(null);
              });
            },
          })
        }
        onAddData={() => {
          setGroup(null);
          setOpen('group');
          setOnConfirm((values) => createGroup(token as string, values));
        }}
      />
      {open === 'confirm-delete' && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
      {open === 'group' && <Dialog.Group group={group} />}
    </VerticalMenuPage>
  );
};

export default Index;
