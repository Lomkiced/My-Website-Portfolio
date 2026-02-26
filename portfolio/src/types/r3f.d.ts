/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@react-three/fiber" {
    export { Canvas } from "@react-three/fiber/dist/declarations/src/web/Canvas";
    export {
        useFrame,
        useThree,
    } from "@react-three/fiber/dist/declarations/src/core/hooks";
    export type { RootState } from "@react-three/fiber/dist/declarations/src/core/store";
}

declare module "@react-three/drei" {
    import { FC, ReactNode } from "react";
    import { MeshProps, MaterialProps } from "@react-three/fiber";

    export const Float: FC<{
        speed?: number;
        rotationIntensity?: number;
        floatIntensity?: number;
        floatingRange?: [number, number];
        children?: ReactNode;
    }>;

    export const MeshDistortMaterial: FC<
        any
    >;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mesh: any;
            ambientLight: any;
            pointLight: any;
            icosahedronGeometry: any;
            torusGeometry: any;
            octahedronGeometry: any;
            dodecahedronGeometry: any;
            primitive: any;
        }
    }
}
