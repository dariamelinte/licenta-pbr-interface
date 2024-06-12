import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Dialog, Loading, Table } from '@/components/common';
import { Button, ClipboardButton } from '@/components/common/Buttons';
import { groupStudentsColumns } from '@/components/common/Tables/columns/groupStudents';
import { AcademicCap, Phone, User } from '@/components/icons';
import { confirm } from '@/constants/confirm-dialog';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { CompleteGroupApiType } from '@/types/common/api';
import type { ProfileType } from '@/types/common/user';
import type { ConfirmDialogType } from '@/types/store/dialog';

const Index = () => {
  const router = useRouter();
  const [group, setGroup] = useState<CompleteGroupApiType | null>(null);

  const { token, credential, user } = useStore(useCallback((state) => state.auth, []));
  const { getGroupById, loading, updateGroup, groups, setGroups } = useStore(
    useCallback((state) => state.group, []),
  );
  const { open, setOpen, setOnConfirm } = useStore(useCallback((state) => state.dialog, []));

  const handleGroup = useCallback(async () => {
    const foundGroup = await getGroupById(
      token as string,
      router.query.id as string,
    );

    setGroup(foundGroup);
  }, [getGroupById, token, router.query.id, setGroup]);

  const handleRemoveStudent = async (id: string) => {
    const students =
      group?.students.filter((student) => student.credential !== id) || [];

    const filteredStudents = (students?.map((student) => student.credential) ||
      []) as string[];

    updateGroup(
      token as string,
      { _id: group?._id, students: filteredStudents },
      () => {
        if (user.role === 'student') {
          const filteredGroups = groups.filter(({ _id }) => _id !== group?._id);
          setGroups(filteredGroups);

          router.push('/app/groups');
        }

        setGroup((group) => ({
          ...(group as CompleteGroupApiType),
          students,
        }));
      },
    );
  };

  const columnProps = useMemo(() => {
    if (user.role === 'student') {
      return {};
    }

    return {
      onDelete: (id: string) => {
        setOpen('confirm-delete');
        setOnConfirm(() => handleRemoveStudent(id));
      },
    };
  }, [user.role, setOpen, setOnConfirm, handleRemoveStudent]);

  useEffect(() => {
    handleGroup();
  }, [handleGroup]);

  if (!group || loading) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage>
      <div className="w-full p-8">
        <div className="card">
          <div className="flex w-full items-center justify-between">
            <p className="title">Group {group?.name}</p>
            <ClipboardButton clipboardText={group?.code} />
          </div>
          <div className="w-full pt-4">
            <p className="pb-2 text-xl font-semibold text-blue-900">
              Professor
            </p>

            <p className="flex items-center">
              <User className="mr-3 h-5" />
              {group.professor.last_name} {group.professor.first_name}
            </p>
            <p className="flex items-center">
              <Phone className="mr-3 h-5" />
              {group.professor.phone_number}
            </p>
            <p className="flex items-center">
              <AcademicCap className="mr-3 h-5" />
              {group.professor.institution}
            </p>
          </div>
          {user.role === 'student' && (
            <div className="w-full pt-8">
              <Button
                theme="danger"
                onClick={() => {
                  setOpen('confirm-leave');
                  setOnConfirm(() => handleRemoveStudent(credential as string));
                }}
              >
                Leave group
              </Button>
            </div>
          )}
        </div>
        <Table.Table<ProfileType>
          className="mt-8"
          title="Students"
          data={group.students}
          columns={(columnHelper) =>
            groupStudentsColumns({
              columnHelper,
              ...columnProps,
            })
          }
        />
        {open === 'confirm-delete' && (
          <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
        )}
        {open === 'confirm-leave' && (
          <Dialog.Confirmation {...(confirm.leave as ConfirmDialogType)} />
        )}
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
