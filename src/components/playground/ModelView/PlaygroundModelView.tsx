import cx from "classnames";

import { objectModelSizes } from "@/constants/constants";
import { ObjectModelApiType } from "@/types/common/api";

import { ModelView } from "./ModelView";
import { Piece } from "../Piece";

type PlaygroundModelViewProps = {
  initialPos: { x: number; y: number };
  objectModel: ObjectModelApiType;
};

export const PlaygroundModelView: React.FC<PlaygroundModelViewProps> = ({
  initialPos,
  objectModel,
}) => {
  return (
    <Piece initialPos={initialPos}>
      <div
        className={cx("border-4 border-blue-900 rounded")}
        style={{
          width: objectModelSizes[objectModel.size],
          height: objectModelSizes[objectModel.size],
        }}
      >
        <ModelView
          model={objectModel.model}
          disableControls
          width={objectModelSizes[objectModel.size]}
          height={objectModelSizes[objectModel.size]}
        />
      </div>
    </Piece>
  );
};
