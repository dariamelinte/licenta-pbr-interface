import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

import { Dialog, Loading, Table } from '@/components/common';
import { testColumns } from '@/components/common/Tables/columns/test';
import { confirm } from '@/constants/confirm-dialog';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { TestApiType } from '@/types/common/api';
import type { ConfirmDialogType } from '@/types/store/dialog';

const Index = () => {
  const router = useRouter();

  const { open, setOpen, setOnConfirm } = useStore(
    useCallback((state) => state.dialog, []),
  );
  const { token, user } = useStore(useCallback((state) => state.auth, []));
  const { tests, loading, getTests, deleteTest } = useStore(
    useCallback((state) => state.test, []),
  );

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
      onViewMultiple: (id: string) => router.push(`/app/tests/${id}/results`),
    };
  }, [user.role, setOpen, setOnConfirm, router, deleteTest, token]);

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
        onAddData={
          user.role === 'student'
            ? undefined
            : () => router.push(`/app/tests/create`)
        }
      />
      {open === 'confirm-delete' && (
        <Dialog.Confirmation {...(confirm.delete as ConfirmDialogType)} />
      )}
    </VerticalMenuPage>
  );
};

export default Index;
