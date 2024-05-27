import cx from "classnames";
import { Disclosure } from "@headlessui/react";

import { Form as CommonForm } from "@/components/common";
import { testStatuses } from "@/constants/constants";
import { ChevronDown, PencilSquare } from "@/components/icons";
import { testLabels } from "@/constants/labels";

import styles from "../Form.module.css";

type TestFormProps = {};

export const TestInformationForm: React.FC<TestFormProps> = () => {
  return (
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
                options={Object.entries(testStatuses).map(([key, value]) => ({
                  value: key,
                  name: value,
                }))}
                name="status"
                label={testLabels.status}
                placeholder={testLabels.status}
                className={cx(styles.field, "ml-3 md:0")}
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
                className={cx(styles.field, "ml-3 md:0")}
                type="number"
              />
            </div>

            <div className={styles.row}>
              <CommonForm.InputField
                name="start_date"
                label={testLabels.start_date}
                placeholder={testLabels.start_date}
                className={cx(styles.field, "mr-3 md:0")}
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
  );
};
