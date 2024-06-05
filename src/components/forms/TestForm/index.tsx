import { Form, Formik } from "formik";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button, Dialog } from "@/components/common";
import { CheckCircle, PencilSquare } from "@/components/icons";
import { Board } from "@/components/playground";
import { INITIAL_TEST_FORM } from "@/constants/initial-objects";
import { testSchema } from "@/constants/validation-schemas";
import useStore from "@/stores";
import type { TestType } from "@/types/common/test";

type TestFormProps = {
  initialTest?: TestType;
  shouldResetBoard?: boolean;
  onSubmit: (values: TestType) => void;
  onSave?: () => void;
};

export const TestForm: React.FC<TestFormProps> = ({
  onSubmit,
  onSave,
  initialTest,
  shouldResetBoard,
}) => {
  const { open, setOpen } = useStore((state) => state.dialog);
  const { loading, getObjectModels } = useStore((state) => state.objectModel);
  const { addObjectInstance } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    // TODO: Loading
    return <div>Loading ..</div>;
  }

  return (
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
              setOpen("test-information");
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
            >
              <p className="pl-2">Save test (you can work on it afterwards)</p>
            </Button>
          ) : null}
          <Button
            icon={<CheckCircle />}
            type="submit"
            className="!flex w-full items-center justify-center"
          >
            <p className="pl-2">Submit test</p>
          </Button>
        </div>

        <Board
          onAddInstance={(id) => addObjectInstance(uuidv4(), id)}
          shouldResetBoard={shouldResetBoard}
        />

        {open === "test-information" && <Dialog.TestInformation />}
      </Form>
    </Formik>
  );
};
