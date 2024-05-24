import { Disclosure, Transition } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";
import cx from "classnames";

import { Form, Loading } from "@/components/common";
import useStore from "@/stores";
import { ChevronDown } from "@/components/icons";
import { objectModelLabels } from "@/constants/labels";
import { AddModelView } from "@/components/playground";

import styles from "./ObjectModelMenu.module.css";

type ObjectModelMenuType = {
  disableClose?: boolean;
};

export const ObjectModelMenu: React.FC<ObjectModelMenuType> = ({
  disableClose,
}) => {
  const { objectModels, loading, getObjectModels, getObjectModelsByCategory } =
    useStore((state) => state.objectModel);
  const { categories, getCategories } = useStore((state) => state.category);

  const [models, setModels] = useState(objectModels);
  const [category, setCategory] = useState<string | undefined>();

  const optionsCategories = useMemo(
    () => [
      { value: undefined, name: objectModelLabels.category },
      ...categories.map(({ _id, name }) => ({ value: _id, name })),
    ],
    [categories]
  );

  useEffect(() => {
    getObjectModels();
  }, [getObjectModels]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  if (loading) {
    return <Loading size="large" />;
  }

  const disclosurePanelComponent = (
    <Disclosure.Panel className={styles.menuItems}>
      <div className={styles.searchContainer}>
        <Form.Select
          value={category}
          options={optionsCategories}
          className={cx(styles.field, styles.select)}
          onChange={async (e) => {
            setCategory(e.target.value);

            if (e.target.value) {
              const result = await getObjectModelsByCategory(e.target.value);

              setModels(result || objectModels);
            } else {
              getObjectModels();
            }
          }}
        />
      </div>
      <div className={styles.searchContent}>
        {models.length ? (
          models.map((objectModel) => (
            <div key={objectModel._id} className={styles.menuItem}>
              <AddModelView objectModel={objectModel} />
            </div>
          ))
        ) : (
          <div className="w-full text-center text-sm py-1">No results</div>
        )}
      </div>
    </Disclosure.Panel>
  );

  return (
    <Disclosure defaultOpen={disableClose}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={styles.menuButton}
            disabled={disableClose}
          >
            <div className={styles.menuButtonContent}>
              <p>3D Models</p>
              <ChevronDown
                className={cx(styles.chevron, {
                  "rotate-180 transform": open,
                })}
              />
            </div>
          </Disclosure.Button>
          {disableClose ? (
            disclosurePanelComponent
          ) : (
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {disclosurePanelComponent}
            </Transition>
          )}
        </>
      )}
    </Disclosure>
  );
};
