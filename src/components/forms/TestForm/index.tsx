import { Form, Formik } from "formik";

import { testSchema } from "@/constants/validation-schemas";
import useStore from "@/stores";
import type { TestFormType } from "@/types/common/test";
import { Board } from "@/components/playground";

import { TestInformationForm } from "./TestInformationForm";
import { TestPlaygroundForm } from "./TestPlaygroundForm";

type TestFormProps = {};

export const TestForm: React.FC<TestFormProps> = () => {
  const { wipTest, setWipTest } = useStore((state) => state.test);

  return (
    <Formik<TestFormType>
      initialValues={wipTest}
      validationSchema={testSchema}
      onSubmit={(values) => {
        setWipTest(values);
        console.log({ values });
      }}
    >
      {({ setFieldValue, values }) => {
        console.log({ values });
        return (
          <Form className="w-full">
            <TestInformationForm />

            <div className="my-4 relative">
              <Board
                onAddInstance={(id) => {
                  setFieldValue(`instances`, [
                    ...values.instances,
                    { object_model: id, rotation: [0, 0, 0] },
                  ]);
                }}
              />
            </div>

          </Form>
        );
      }}
    </Formik>
  );
};
