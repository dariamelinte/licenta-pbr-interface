import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Dialog, Loading, Table } from '@/components/common';
import { groupColumns } from '@/components/common/Tables';
import { confirm } from '@/constants/confirm-dialog';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { GroupApiType } from '@/types/common/api';
import type { GroupFormType } from '@/types/common/group';
import type { ConfirmDialogType } from '@/types/store/dialog';

const Index = () => {
  const router = useRouter();
  const [group, setGroup] = useState<GroupFormType | null>(null);

  const { open, setOpen, setOnConfirm } = useStore(
    useCallback((state) => state.dialog, []),
  );
  const { token, user } = useStore(useCallback((state) => state.auth, []));
  const {
    groups,
    loading,
    getGroups,
    deleteGroup,
    createGroup,
    updateGroup,
    joinGroup,
  } = useStore(useCallback((state) => state.group, []));

  const columnProps = useMemo(() => {
    if (user.role === 'student') {
      return {
        onView: (id: string) => router.push(`/app/groups/${id}`),
      };
    }

    return {
      onDelete: (id: string) => {
        setOpen('confirm-delete');
        setOnConfirm(() => deleteGroup(token as string, id));
      },
      onEdit: (gr: GroupFormType) => {
        setGroup(gr);
        setOpen('add-group');
        setOnConfirm((groupp: GroupApiType) => {
          updateGroup(token as string, groupp);
          setGroup(null);
        });
      },
      onView: (id: string) => router.push(`/app/groups/${id}`),
    };
  }, [
    user.role,
    setOpen,
    setGroup,
    setOnConfirm,
    updateGroup,
    router,
    deleteGroup,
    token,
  ]);

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
        className="m-8"
        title="Groups"
        data={groups}
        columns={(columnHelper) =>
          groupColumns({
            columnHelper,
            ...columnProps,
          })
        }
        onAddData={() => {
          if (user.role === 'student') {
            setGroup(null);
            setOpen('join-group');
            setOnConfirm((values) => joinGroup(token as string, values));
          } else {
            setGroup(null);
            setOpen('add-group');
            setOnConfirm((values) => createGroup(token as string, values));
          }
        }}
      />
      {open === 'confirm-delete' && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
      {open === 'add-group' && <Dialog.Group group={group} />}
      {open === 'join-group' && <Dialog.JoinGroup />}
    </VerticalMenuPage>
  );
};

export default Index;
