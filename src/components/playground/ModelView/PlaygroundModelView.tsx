import cx from "classnames";

import { objectModelSizes } from "@/constants/constants";
import { ObjectModelApiType } from "@/types/common/api";

import { ModelView } from "./ModelView";
import { Piece } from "../Piece";

import styles from './ModelView.module.css';
import useStore from "@/stores";

type PlaygroundModelViewProps = {
  initialPos: { x: number; y: number };
  objectModel: ObjectModelApiType;
};

export const PlaygroundModelView: React.FC<PlaygroundModelViewProps> = ({
  initialPos,
  objectModel,
}) => {
  const { scale } = useStore(state => state.playground)
  return (
    <Piece initialPos={initialPos}>
      <div
        className="relative border-4 border-blue-700"
        style={{
          width: objectModelSizes[objectModel.size] * scale + 15,
          height: objectModelSizes[objectModel.size] * scale + 15,
        }}
      >
        <button className={cx(styles.linkButton, "-top-3 -left-3")}></button>
        <button className={cx(styles.linkButton, "-top-3 left-1/2 transform -translate-x-1/2")}></button>
        <button className={cx(styles.linkButton, "-top-3 -right-3")}></button>
        <button className={cx(styles.linkButton, "top-1/2 -left-3 transform -translate-y-1/2")}></button>
        <button className={cx(styles.linkButton, "top-1/2 -right-3 transform -translate-y-1/2")}></button>
        <button className={cx(styles.linkButton, "-bottom-3 -left-3")}></button>
        <button className={cx(styles.linkButton, "-bottom-3 left-1/2 transform -translate-x-1/2")}></button>
        <button className={cx(styles.linkButton, "-bottom-3 -right-3")}></button>

        <ModelView
          model={objectModel.model}
          disableControls
          width={objectModelSizes[objectModel.size] * scale}
          height={objectModelSizes[objectModel.size] * scale}
        />
      </div>
      {/* <LinkContainer
      >
      </LinkContainer> */}
    </Piece>
  );
};
