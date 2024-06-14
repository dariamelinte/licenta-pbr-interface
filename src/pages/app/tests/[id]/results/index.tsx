import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { Loading, Table } from '@/components/common';
import { resultColumns } from '@/components/common/Tables';
import { ChartPie, Clock } from '@/components/icons';
import { VerticalMenuPage } from '@/layouts';
import useStore from '@/stores';
import type { TestApiType } from '@/types/common/api';
import type { UserResultType } from '@/types/common/result';
import { timestampToDate } from '@/utils/timestampToDate';

const Index = () => {
  const router = useRouter();
  const [test, setTest] = useState<TestApiType | null>(null);
  const [userResults, setUserResults] = useState<UserResultType[]>([]);

  const { token } = useStore(useCallback((state) => state.auth, []));
  const { loading: loadingT, getTestById } = useStore(useCallback((state) => state.test, []));
  const {
    results,
    loading: loadingR,
    getResultsByTest,
  } = useStore(useCallback((state) => state.result, []));;
  const { loading: loadingG, getGroupById } = useStore(useCallback((state) => state.group, []));

  const handleTest = useCallback(async () => {
    const res = await getTestById(token as string, router.query.id as string);
    if (res) setTest(res);
  }, [getTestById, token, setTest]);

  const handleUserResults = useCallback(async () => {
    const foundGroup = await getGroupById(
      token as string,
      test?.group as string,
    );

    if (!foundGroup) return;

    const foundUserResults: UserResultType[] = foundGroup.students.map(
      ({ first_name, last_name, phone_number, credential }) => {
        const result = results.find((result) => result.credential === credential);

        return {
          first_name,
          last_name,
          phone_number,
          score: result?.score || 0,
          result: result?._id,
          status: result?._id
        };
      },
    );

    setUserResults(foundUserResults);
  }, [getGroupById, token, test, results, setUserResults]);

  useEffect(() => {
    handleTest();
  }, [handleTest]);

  useEffect(() => {
    handleUserResults();
  }, [handleUserResults]);

  useEffect(() => {
    getResultsByTest(token as string, router.query.id as string);
  }, [getResultsByTest, router.query.id]);

  if (loadingT || loadingR || loadingG) {
    return (
      <VerticalMenuPage>
        <Loading size="large" />
      </VerticalMenuPage>
    );
  }

  return (
    <VerticalMenuPage>
      <div className="w-full p-8">
        <div className="card text-blue-900">
          <p className="title">{test?.name}</p>
          <div className="w-full pt-4">
            <p className="whitespace-pre-line py-4 text-lg text-blue-900">
              {test?.description}
            </p>
            <p className="pb-2 text-xl font-semibold text-blue-900">
              Test's information
            </p>

            <p className="flex items-center">
              <Clock className="mr-3 h-5" />
              <b className="mr-2">Due date:</b>
              {timestampToDate(Number(test?.due_date))}
            </p>
            <p className="flex items-center">
              <ChartPie className="mr-3 h-5" />
              <b className="mr-2">Min. score:</b>
              {test?.min_score};
              <span className="w-3" />
              <b className="mr-2">Max. score:</b>
              {test?.max_score}
            </p>
          </div>
        </div>

        <Table.Table<UserResultType>
          className="mt-8"
          title="Results"
          data={userResults}
          columns={(columnHelper) =>
            resultColumns({
              columnHelper,
              onView: (id) =>
                router.push(`/app/tests/${router.query.id}/results/${id}`),
            })
          }
        />
      </div>
    </VerticalMenuPage>
  );
};

export default Index;
