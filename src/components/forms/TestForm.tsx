import { Form, Formik } from "formik";
import cx from "classnames";
import { Disclosure } from "@headlessui/react";

import { Form as CommonForm } from "@/components/common";
import { testStatuses } from "@/constants/constants";
import { ChevronDown, PencilSquare, PuzzlePiece } from "@/components/icons";
import { testLabels } from "@/constants/labels";
import { testSchema } from "@/constants/validation-schemas";
import useStore from "@/stores";
import type { TestFormType } from "@/types/common/test";

import styles from "./Form.module.css";
import { ObjectModelMenu } from "../playground";

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
      <Form className="w-full">
        <div className="flex  mb-3">
          <Disclosure defaultOpen>
            {({ open }) => (
              <div className="card w-full">
                <Disclosure.Button className={styles.disclosureButton}>
                  <div className="flex items-center w-full">
                    <PencilSquare className={cx(styles.icon, "mr-4")} />
                    <p className="font-bold text-lg">Test information</p>
                  </div>
                  <ChevronDown
                    className={cx(styles.icon, {
                      "rotate-180 transform": open,
                    })}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className={styles.disclosurePanel}>
                  <div className={styles.row}>
                    <CommonForm.InputField
                      name="name"
                      label={testLabels.name}
                      placeholder={testLabels.name}
                      className={styles.field}
                    />
                    <CommonForm.SelectField
                      options={Object.entries(testStatuses).map(
                        ([key, value]) => ({
                          value: key,
                          name: value,
                        })
                      )}
                      name="status"
                      label={testLabels.status}
                      placeholder={testLabels.status}
                      className={cx(styles.field, "ml-3")}
                    />
                  </div>

                  <div className={styles.row}>
                    <CommonForm.TextAreaField
                      name="description"
                      label={testLabels.description}
                      placeholder={testLabels.description}
                      className={styles.field}
                      rows={10}
                    />
                  </div>

                  <div className={styles.row}>
                    <CommonForm.InputField
                      name="min_score"
                      label={testLabels.min_score}
                      placeholder={testLabels.min_score}
                      className={styles.field}
                      type="number"
                    />
                    <CommonForm.InputField
                      name="max_score"
                      label={testLabels.max_score}
                      placeholder={testLabels.max_score}
                      className={cx(styles.field, "mx-3")}
                      type="number"
                    />
                    <CommonForm.InputField
                      name="start_date"
                      label={testLabels.start_date}
                      placeholder={testLabels.start_date}
                      className={cx(styles.field, "mr-3")}
                      type="date"
                    />
                    <CommonForm.InputField
                      name="due_date"
                      label={testLabels.due_date}
                      placeholder={testLabels.due_date}
                      className={styles.field}
                      type="date"
                    />
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
            <div className="ml-4">
          <ObjectModelMenu />
          </div>
        </div>
        
        <Disclosure defaultOpen>
          {({ open }) => (
            <div className="card">
              <Disclosure.Button className={styles.disclosureButton}>
                <div className="flex items-center w-full">
                  <PuzzlePiece className={cx(styles.icon, "mr-4")} />
                  <p className="font-bold text-lg">Test playground</p>
                </div>
                <ChevronDown
                  className={cx(styles.icon, {
                    "rotate-180 transform": open,
                  })}
                />
              </Disclosure.Button>
              <Disclosure.Panel className={styles.disclosurePannel}>
                
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </Form>
    </Formik>
  );
};
