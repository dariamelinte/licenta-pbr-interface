export type ObjectModelFlagType = "info" | "geometry";

export type ObjectModelInfoType = {
    name: string;
    description?: string;
    category_id: { $oid: string };
}

export type ObjectModelGeometryType = {
    location: number[];
    rotation_euler: number[];
    rotation_quaternion: number[];
    scale: number[];

    vertices: number[];
    edges: number[];
    faces: number[];
}

export type ObjectModelType = ObjectModelInfoType & ObjectModelGeometryType;