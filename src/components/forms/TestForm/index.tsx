import { Form, Formik } from 'formik';
import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button, Dialog } from '@/components/common';
import { CheckCircle, PencilSquare } from '@/components/icons';
import { Board } from '@/components/playground';
import { INITIAL_TEST_FORM } from '@/constants/initial-objects';
import { testSchema } from '@/constants/validation-schemas';
import useStore from '@/stores';
import type { TestType } from '@/types/common/test';

type TestFormProps = {
  initialTest?: TestType;
  shouldResetBoard?: boolean;
  disabled?: boolean;
  onSubmit: (values: TestType) => void;
  onSave?: () => void;
};

export const TestForm: React.FC<TestFormProps> = ({
  onSubmit,
  onSave,
  initialTest,
  shouldResetBoard,
  disabled,
}) => {
  const { open, setOpen } = useStore(useCallback((state) => state.dialog, []));
  const { loading, getObjectModels } = useStore(useCallback((state) => state.objectModel, []));
  const { addObjectInstance } = useStore(useCallback((state) => state.playground, []));

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    // TODO: Loading
    return <div>Loading ..</div>;
  }

  return (
    <div className="w-full">
      <Formik<TestType>
        initialValues={initialTest || INITIAL_TEST_FORM}
        validationSchema={testSchema}
        onSubmit={onSubmit}
      >
        <Form className="w-full">
          <div className="flex items-center px-3 pt-3">
            <Button
              icon={<PencilSquare />}
              theme="base"
              onClick={() => {
                setOpen('test-information');
              }}
              className="mr-4 !flex w-full items-center justify-center"
            >
              <p className="pl-2">Test information</p>
            </Button>
            {onSave ? (
              <Button
                icon={<CheckCircle />}
                theme="secondary"
                className="mr-4 !flex w-full items-center justify-center"
                onClick={onSave}
                disabled={disabled}
              >
                <p className="pl-2">
                  Save test (you can work on it afterwards)
                </p>
              </Button>
            ) : null}
            <Button
              icon={<CheckCircle />}
              type="submit"
              className="!flex w-full items-center justify-center"
              disabled={disabled}
            >
              <p className="pl-2">Submit test</p>
            </Button>
          </div>

          {open === 'test-information' && <Dialog.TestInformation />}
        </Form>
      </Formik>
      <Board
        onAddInstance={(id, position) => addObjectInstance(uuidv4(), id, position)}
        shouldResetBoard={shouldResetBoard}
        disabled={disabled}
      />
    </div>
  );
};
