import { Form, Formik } from "formik";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { testSchema } from "@/constants/validation-schemas";
import useStore from "@/stores";
import type { TestInfoType } from "@/types/common/test";
import { Board } from "@/components/playground";
import { CheckCircle, PencilSquare } from "@/components/icons";
import { Button, Dialog } from "@/components/common";
import { INITIAL_TEST_FORM } from "@/constants/initial-objects";

type TestFormProps = {
  initialTest?: TestInfoType;
  onSubmit: (values: TestInfoType) => void;
};

export const TestForm: React.FC<TestFormProps> = ({ onSubmit, initialTest }) => {
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
    <Formik<TestInfoType>
      initialValues={initialTest || INITIAL_TEST_FORM}
      validationSchema={testSchema}
      onSubmit={onSubmit}
    >
      <Form className="w-full">
        <div className="px-3 pt-3 flex items-center">
          <Button
            icon={<PencilSquare />}
            theme="base"
            onClick={() => {
              setOpen("test-information");
            }}
            className="w-full !flex items-center justify-center mr-4"
          >
            <p className="pl-2">Test information</p>
          </Button>
          <Button
            icon={<CheckCircle />}
            type="submit"
            className="w-full !flex items-center justify-center"
          >
            <p className="pl-2">Submit test</p>
          </Button>
        </div>

        <Board onAddInstance={(id) => addObjectInstance(uuidv4(), id)} />

        {open === "test-information" && <Dialog.TestInformation />}
      </Form>
    </Formik>
  );
};
