import { Form, Formik } from "formik";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { testSchema } from "@/constants/validation-schemas";
import useStore from "@/stores";
import type { TestFormType } from "@/types/common/test";
import { Board } from "@/components/playground";
import { CheckCircle, PencilSquare } from "@/components/icons";
import { Button, Dialog } from "@/components/common";

type TestFormProps = {};

export const TestForm: React.FC<TestFormProps> = () => {
  const { wipTest, setWipTest } = useStore((state) => state.test);
  const { open, setOpen } = useStore((state) => state.dialog);
  const { loading, getObjectModels } = useStore((state) => state.objectModel);
  const { addObjectInstance, objectInstances, linkages, scale } = useStore((state) => state.playground);

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  if (loading) {
    // TODO: Loading
    return <div>Loading ..</div>;
  }

  return (
    <Formik<TestFormType>
      initialValues={wipTest}
      validationSchema={testSchema}
      onSubmit={(values) => {
        // setWipTest(values);
        console.log({ values, objectInstances, linkages, scale });
      }}
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
            <p className="pl-2"> Complete test information</p>
          </Button>
          <Button
            icon={<CheckCircle />}
            type="submit"
            className="w-full !flex items-center justify-center"
          >
            <p className="pl-2"> Save test</p>
          </Button>
        </div>

        <Board onAddInstance={(id) => addObjectInstance(uuidv4(), id)} />

        {open === "test-information" && <Dialog.TestInformation />}
      </Form>
    </Formik>
  );
};
