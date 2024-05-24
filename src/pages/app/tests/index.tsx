import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { Dialog, Loading, Table } from '@/components/common';
import { confirm } from '@/constants/confirm-dialog';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { TestApiType } from '@/types/common/api';
import type { ConfirmDialogType } from '@/types/store/dialog';
import { testColumns } from '@/components/common/Tables/columns/test';

const Index = () => {
  const router = useRouter();

  const { open, setOpen, setOnConfirm } = useStore((state) => state.dialog);
  const { token, user } = useStore((state) => state.auth);
  const {
    tests,
    loading,
    getTests,
    deleteTest,
    updateTest,
  } = useStore((state) => state.test);

  const columnProps = useMemo(() => {
    if (user.role === 'student') {
      return {
        onView: (id: string) => router.push(`/app/tests/${id}`),
      };
    }

    return {
      onDelete: (id: string) => {
        setOpen('confirm-delete');
        setOnConfirm(() => deleteTest(token as string, id));
      },
      onView: (id: string) => router.push(`/app/tests/${id}`),
    };
  }, [user.role, setOpen, setOnConfirm, updateTest, router]);

  useEffect(() => {
    getTests(token as string);
  }, [getTests, token]);

  if (loading) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage>
      <Table.Table<TestApiType>
        className="m-8"
        title="Tests"
        data={tests}
        columns={(columnHelper) =>
          testColumns({
            columnHelper,
            ...columnProps,
          })
        }
        onAddData={() => router.push(`/app/tests/create`)}
      />
      {open === 'confirm-delete' && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
    </VerticalMenuPage>
  );
};

export default Index;
